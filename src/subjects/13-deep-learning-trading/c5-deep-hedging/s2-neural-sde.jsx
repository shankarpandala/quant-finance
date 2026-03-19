import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveNeuralSDE() {
  const [driftScale, setDriftScale] = useState(0.12)
  const [volScale, setVolScale] = useState(0.18)
  const [meanRevSpeed, setMeanRevSpeed] = useState(2.0)
  const [volOfVol, setVolOfVol] = useState(0.5)

  const days = 60
  const dt = 1 / 252
  const paths = []
  const volPaths = []
  for (let p = 0; p < 4; p++) {
    const pricePath = [22000]
    const vPath = [volScale]
    let seed = (p + 1) * 31 + 17
    for (let d = 1; d < days; d++) {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff
      const z1 = ((seed / 0x7fffffff) - 0.5) * 3.4
      seed = (seed * 1103515245 + 12345) & 0x7fffffff
      const z2 = ((seed / 0x7fffffff) - 0.5) * 3.4
      const prevVol = vPath[d - 1]
      const newVol = Math.max(0.05, prevVol + meanRevSpeed * (volScale - prevVol) * dt + volOfVol * prevVol * Math.sqrt(dt) * z2)
      vPath.push(newVol)
      const drift = (driftScale - 0.5 * newVol * newVol) * dt
      const diff = newVol * Math.sqrt(dt) * z1
      pricePath.push(pricePath[d - 1] * Math.exp(drift + diff))
    }
    paths.push(pricePath)
    volPaths.push(vPath)
  }

  const allPrices = paths.flat()
  const minP = Math.min(...allPrices)
  const maxP = Math.max(...allPrices)
  const priceRange = maxP - minP || 1

  const colors = ['#6366f1', '#22c55e', '#ef4444', '#f59e0b']

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Neural SDE Price Paths for Nifty Options
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Visualize Nifty paths under a neural SDE with learned stochastic volatility.
        The drift and diffusion functions are parameterized by neural networks.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Drift <InlineMath math="\mu_\theta" /> = {(driftScale * 100).toFixed(0)}%</span>
          <input type="range" min="-0.1" max="0.3" step="0.01" value={driftScale}
            onChange={e => setDriftScale(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Vol level <InlineMath math="\sigma_\theta" /> = {(volScale * 100).toFixed(0)}%</span>
          <input type="range" min="0.08" max="0.4" step="0.01" value={volScale}
            onChange={e => setVolScale(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Mean Rev <InlineMath math="\kappa" /> = {meanRevSpeed.toFixed(1)}</span>
          <input type="range" min="0.5" max="5" step="0.1" value={meanRevSpeed}
            onChange={e => setMeanRevSpeed(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Vol-of-Vol <InlineMath math="\xi" /> = {volOfVol.toFixed(1)}</span>
          <input type="range" min="0.1" max="2" step="0.1" value={volOfVol}
            onChange={e => setVolOfVol(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 520 180" className="w-full max-w-xl mx-auto block" aria-label="Neural SDE paths">
        {paths.map((path, pi) => {
          const points = path.map((p, i) => {
            const x = 50 + (i / (days - 1)) * 440
            const y = 160 - ((p - minP) / priceRange) * 130
            return `${x},${y}`
          }).join(' ')
          return <polyline key={pi} points={points} fill="none" stroke={colors[pi]} strokeWidth="1.5" opacity="0.7" />
        })}

        <line x1="50" y1="160" x2="490" y2="160" stroke="#d1d5db" strokeWidth="1" />
        <text x="270" y="176" textAnchor="middle" className="text-[9px]" fill="#6b7280">Trading Days</text>
        <text x="15" y="90" textAnchor="middle" className="text-[8px]" fill="#9ca3af" transform="rotate(-90, 15, 90)">Nifty Price</text>

        <text x="400" y="20" textAnchor="end" className="text-[8px]" fill="#6b7280">
          Vol: {(volPaths[0][volPaths[0].length - 1] * 100).toFixed(1)}% (path 1)
        </text>
      </svg>
    </div>
  )
}

export default function NeuralSDE() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Neural SDEs for Nifty Options Pricing
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Neural Stochastic Differential Equations (Neural SDEs) replace the parametric
        drift and diffusion functions in classical SDEs with neural networks. This
        allows the model to learn complex, state-dependent dynamics directly from
        Nifty options market data, capturing phenomena like the volatility smile,
        term structure dynamics, and jump behavior that parametric models (Heston,
        SABR) can only approximate.
      </p>

      <DefinitionBlock
        title="Neural Stochastic Differential Equation"
        label="Definition 13.11"
        definition="A Neural SDE is a continuous-time stochastic model where the drift and diffusion coefficients are parameterized by neural networks. The asset price evolves as dS_t = mu_theta(t, S_t) dt + sigma_phi(t, S_t) dW_t, where mu_theta and sigma_phi are learned functions."
        notation={<>The general form is <InlineMath math="dX_t = f_\theta(t, X_t)\,dt + g_\phi(t, X_t)\,dW_t" /> where <InlineMath math="f_\theta" /> and <InlineMath math="g_\phi" /> are neural networks with parameters <InlineMath math="\theta, \phi" />.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Neural SDE for Options Pricing
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For Nifty options pricing, we model the risk-neutral dynamics with a neural
        diffusion:
      </p>

      <BlockMath math="dS_t = r\, S_t\, dt + \sigma_\phi(t, S_t, v_t)\, S_t\, dW_t^S" />
      <BlockMath math="dv_t = \kappa_\theta(t, v_t)(\bar{v}_\theta(t) - v_t)\,dt + \xi_\psi(t, v_t)\,dW_t^v" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="r = 6.5\%" /> (RBI repo rate),{' '}
        <InlineMath math="\sigma_\phi" /> is the neural local volatility, and{' '}
        <InlineMath math="v_t" /> is a latent volatility factor. The model is
        trained by minimizing the pricing error across the Nifty options surface:
      </p>

      <BlockMath math="\mathcal{L}(\theta, \phi, \psi) = \sum_{K, T} \left(C_{\text{model}}(K, T; \theta, \phi, \psi) - C_{\text{market}}(K, T)\right)^2" />

      <TheoremBlock
        title="Universal Approximation for SDEs"
        label="Theorem 13.8"
        statement={<>A Neural SDE with sufficiently wide neural networks for drift <InlineMath math="f_\theta" /> and diffusion <InlineMath math="g_\phi" /> can approximate any Ito process with bounded coefficients to arbitrary accuracy:</>}
        formula="\sup_{t \in [0,T]} \mathbb{E}\left[\|X_t - X_t^{\theta,\phi}\|^2\right] < \epsilon \quad \text{for any } \epsilon > 0"
        proof={<>This follows from the universal approximation theorem for neural networks applied to the SDE coefficients. If the true drift and diffusion are continuous functions satisfying Lipschitz and linear growth conditions, then neural networks with ReLU activations can approximate them uniformly on compact sets. The SDE well-posedness theory (Ito existence theorem) then guarantees that the solution process inherits the approximation error. For Nifty options, this means the Neural SDE can fit any vol surface shape, including the steep put skew observed in Indian index options.</>}
      />

      <InteractiveNeuralSDE />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Training with Adjoint Methods
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Neural SDEs are trained using the adjoint sensitivity method, which computes
        gradients through the SDE solver without backpropagating through each
        discretization step. The adjoint state <InlineMath math="a_t = \partial \mathcal{L} / \partial X_t" />{' '}
        satisfies:
      </p>

      <BlockMath math="da_t = -a_t \frac{\partial f_\theta}{\partial X_t}\,dt - a_t \frac{\partial g_\phi}{\partial X_t}\,dW_t" />

      <PythonCode
        title="neural_sde_nifty.py"
        runnable
        code={`import numpy as np

class NeuralSDESimulator:
    """Simplified Neural SDE for Nifty options.

    Demonstrates the concept with parametric neural-inspired
    drift and diffusion. For full implementation, use torchsde.
    """

    def __init__(self, hidden_dim=32, seed=42):
        self.rng = np.random.RandomState(seed)
        self.hidden_dim = hidden_dim

        # Simulated learned parameters (would be neural network weights)
        self.W_drift = self.rng.randn(3, hidden_dim) * 0.1
        self.b_drift = self.rng.randn(hidden_dim) * 0.01
        self.W_drift_out = self.rng.randn(hidden_dim, 1) * 0.1

        self.W_vol = self.rng.randn(3, hidden_dim) * 0.1
        self.b_vol = self.rng.randn(hidden_dim) * 0.01
        self.W_vol_out = self.rng.randn(hidden_dim, 1) * 0.1

    def _relu(self, x):
        return np.maximum(0, x)

    def neural_drift(self, t, S, v):
        """Learned drift function."""
        x = np.array([t, np.log(S / 22000), v])
        h = self._relu(x @ self.W_drift + self.b_drift)
        mu = float(h @ self.W_vol_out) * 0.5
        return 0.065 + mu * 0.1  # Around risk-free rate

    def neural_diffusion(self, t, S, v):
        """Learned diffusion function."""
        x = np.array([t, np.log(S / 22000), v])
        h = self._relu(x @ self.W_vol + self.b_vol)
        sigma_raw = float(h @ self.W_vol_out)
        return max(0.08, 0.16 + sigma_raw * 0.05)  # Floor at 8%

    def simulate(self, S0, T, n_steps, n_paths):
        """Simulate paths using Euler-Maruyama."""
        dt = T / n_steps
        S = np.zeros((n_paths, n_steps + 1))
        vol = np.zeros((n_paths, n_steps + 1))
        S[:, 0] = S0
        vol[:, 0] = 0.16  # Initial vol

        for t_idx in range(n_steps):
            t = t_idx * dt
            Z_S = self.rng.randn(n_paths)
            Z_v = self.rng.randn(n_paths)

            for i in range(n_paths):
                mu = self.neural_drift(t, S[i, t_idx], vol[i, t_idx])
                sigma = self.neural_diffusion(t, S[i, t_idx], vol[i, t_idx])

                # Price dynamics
                S[i, t_idx + 1] = S[i, t_idx] * np.exp(
                    (mu - 0.5 * sigma**2) * dt +
                    sigma * np.sqrt(dt) * Z_S[i]
                )

                # Vol dynamics (mean-reverting)
                kappa = 2.0
                vol_bar = 0.16
                xi = 0.4
                vol[i, t_idx + 1] = max(0.05,
                    vol[i, t_idx] +
                    kappa * (vol_bar - vol[i, t_idx]) * dt +
                    xi * vol[i, t_idx] * np.sqrt(dt) * Z_v[i]
                )

        return S, vol

    def price_option(self, S0, K, T, n_paths=10000, n_steps=100):
        """Price option via Monte Carlo with Neural SDE."""
        S, vol = self.simulate(S0, T, n_steps, n_paths)
        payoff = np.maximum(S[:, -1] - K, 0)
        price = np.exp(-0.065 * T) * np.mean(payoff)
        std_err = np.exp(-0.065 * T) * np.std(payoff) / np.sqrt(n_paths)
        return price, std_err

# --- Demo ---
nsde = NeuralSDESimulator(seed=42)

print("=== Neural SDE for Nifty Options ===\\n")

# Simulate paths
S, vol = nsde.simulate(S0=22000, T=30/252, n_steps=30, n_paths=5)
print("--- Sample Paths (30 days) ---")
for i in range(5):
    ret = (S[i, -1] / S[i, 0] - 1) * 100
    final_vol = vol[i, -1] * 100
    print(f"  Path {i+1}: {S[i,0]:.0f} -> {S[i,-1]:.0f} "
          f"({ret:+.1f}%), vol={final_vol:.1f}%")

# Price Nifty options across strikes
print("\\n--- Nifty Option Prices (T=30 days) ---")
strikes = [21500, 21750, 22000, 22250, 22500]
for K in strikes:
    price, se = nsde.price_option(22000, K, 30/252, n_paths=5000)
    moneyness = (22000 - K) / 22000 * 100
    print(f"  K={K} ({moneyness:+.1f}% ITM): "
          f"Price={price:.1f} +/- {se:.1f} INR")

# Compare with Black-Scholes
print("\\n--- Neural SDE vs Parametric Models ---")
print("Advantages:")
print("  1. Learns vol surface shape from market data")
print("  2. Captures state-dependent dynamics")
print("  3. No need to specify functional form")
print("  4. Naturally handles Nifty skew and smile")
print("\\nCalibration target: Nifty weekly + monthly options")
print("Training data: 2 years of NSE option chain snapshots")`}
      />

      <ExampleBlock
        title="Calibrating Neural SDE to India VIX"
        difficulty="advanced"
        problem="India VIX trades at 14% with mean-reversion speed kappa = 3.0 and vol-of-vol xi = 0.6. A Neural SDE is trained on 2 years of daily India VIX data. What vol surface features can it capture that Heston cannot?"
        solution={[
          {
            step: 'Heston limitations',
            formula: '\\text{Heston: } dv_t = \\kappa(\\bar{v} - v_t)\\,dt + \\xi\\sqrt{v_t}\\,dW_t^v',
            explanation: 'Heston constrains the vol-of-vol to be proportional to sqrt(v_t), producing a fixed functional form for the smile.',
          },
          {
            step: 'Neural SDE flexibility',
            formula: 'dv_t = f_\\theta(t, v_t)\\,dt + g_\\phi(t, v_t)\\,dW_t^v',
            explanation: 'The Neural SDE can learn state-dependent mean-reversion and vol-of-vol, capturing features like vol-of-vol increasing during India VIX spikes (asymmetric behavior not possible in Heston).',
          },
          {
            step: 'Practical improvements',
            formula: '\\text{RMSE}_{\\text{Neural}} < \\text{RMSE}_{\\text{Heston}} \\text{ by 30-50\\%}',
            explanation: 'The Neural SDE typically reduces option pricing RMSE by 30-50% on the Nifty vol surface, particularly for short-dated OTM puts where the steep skew is hardest to fit parametrically.',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Neural SDE vs Parametric Models
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Model</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Parameters</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Smile Fit</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Nifty RMSE (bps)</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Black-Scholes</td>
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">Flat (no smile)</td>
              <td className="px-4 py-2">~150-300</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Heston</td>
              <td className="px-4 py-2">5</td>
              <td className="px-4 py-2">Moderate skew</td>
              <td className="px-4 py-2">~50-100</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">SABR</td>
              <td className="px-4 py-2">4</td>
              <td className="px-4 py-2">Good short-dated</td>
              <td className="px-4 py-2">~30-80</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Local Vol (Dupire)</td>
              <td className="px-4 py-2">Surface</td>
              <td className="px-4 py-2">Exact static fit</td>
              <td className="px-4 py-2">~0 (by construction)</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Neural SDE</td>
              <td className="px-4 py-2">~10K-100K</td>
              <td className="px-4 py-2">Learned from data</td>
              <td className="px-4 py-2">~10-30</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The key advantage of Neural SDEs over Dupire local volatility is that
        they capture dynamic smile behavior -- how the volatility surface moves
        over time -- rather than just fitting a static snapshot. This is crucial
        for hedging multi-day Nifty option positions where vol surface dynamics
        dominate P&L.
      </p>

      <NoteBlock title="Nifty Vol Surface Characteristics" type="historical">
        <ul className="space-y-2">
          <li>
            <strong>Put Skew:</strong> Nifty options exhibit steep put skew, with
            5% OTM puts trading at 3-5 vol points above ATM. Neural SDEs learn
            this asymmetry naturally from market data.
          </li>
          <li>
            <strong>Term Structure:</strong> The Nifty vol term structure is typically
            in contango (upward sloping) but inverts during stress events. Neural
            SDEs capture this state-dependent behaviour.
          </li>
          <li>
            <strong>Expiry Effects:</strong> Weekly options expiry on Thursday creates
            unique gamma dynamics. Neural SDEs trained on intraday data can learn
            the characteristic vol crush pattern heading into expiry.
          </li>
          <li>
            <strong>Correlation with India VIX:</strong> The neural diffusion function
            naturally learns the correlation between Nifty returns and India VIX
            movements, improving cross-Greek hedging accuracy.
          </li>
        </ul>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Neural SDEs combine the continuous-time framework of classical mathematical
          finance with the flexibility of deep learning. For Nifty options, they offer a
          way to build pricing and hedging models that automatically adapt to the
          market-observed volatility dynamics without pre-specifying a parametric form.
          The key implementation tools are <code>torchsde</code> for differentiable SDE
          simulation and adjoint-based gradient computation. Always validate against
          the live NSE option chain to ensure the model captures the steep put skew
          characteristic of Indian index options.
        </p>
      </NoteBlock>
    </div>
  )
}
