import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveViz() {
  const [driftScale, setDriftScale] = useState(0.1)
  const [diffusionScale, setDiffusionScale] = useState(0.2)
  const [nPaths, setNPaths] = useState(5)
  const paths = Array.from({length: nPaths}, (_, p) => {
    let price = 100; const path = [price]
    for (let t = 1; t <= 20; t++) {
      const drift = driftScale * (100 - price) * 0.01
      const diffusion = diffusionScale * Math.sin(p * 1.5 + t * 0.3) * 0.5
      price = price + drift + diffusion
      path.push(price)
    }
    return path
  })
  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">Interactive: Neural SDE Path Simulation</h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Adjust drift and diffusion networks to generate Nifty price paths.</p>
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400"><span>Drift Scale = {driftScale.toFixed(2)}</span><input type="range" min="0" max="0.5" step="0.05" value={driftScale} onChange={e => setDriftScale(parseFloat(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" /></label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400"><span>Diffusion Scale = {diffusionScale.toFixed(2)}</span><input type="range" min="0.05" max="0.5" step="0.05" value={diffusionScale} onChange={e => setDiffusionScale(parseFloat(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" /></label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400"><span>Paths = {nPaths}</span><input type="range" min="1" max="10" step="1" value={nPaths} onChange={e => setNPaths(parseInt(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" /></label>
      </div>
      <svg viewBox="0 0 400 120" className="w-full max-w-lg mx-auto block">
        {paths.map((path, p) => (
          <g key={p}>{path.map((price, t) => {
            const x = 20 + t * 18; const y = 110 - (price - 90) * 5
            return t > 0 ? (<line key={t} x1={20 + (t-1)*18} y1={110 - (path[t-1]-90)*5} x2={x} y2={y} stroke={`hsl(${p * 40 + 220}, 70%, 50%)`} strokeWidth="1.2" opacity="0.7" />) : null
          })}</g>
        ))}
        <line x1="20" y1={110 - (100-90)*5} x2="380" y2={110 - (100-90)*5} stroke="#d1d5db" strokeWidth="0.5" strokeDasharray="3" />
      </svg>
    </div>
  )
}

export default function NeuralSDE() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Neural Stochastic Differential Equations</h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Neural SDEs replace the parametric drift and diffusion functions of classical stochastic models with neural networks, enabling data-driven learning of asset dynamics. For Indian markets, neural SDEs learn the true dynamics of Nifty prices -- including stochastic volatility, jumps, and regime-dependent behavior -- directly from observed data.</p>

      <DefinitionBlock title="Neural Stochastic Differential Equation" label="Definition 13.14" definition="A Neural SDE parameterizes both the drift and diffusion functions of an Ito SDE using neural networks: dX_t = mu_theta(X_t, t)dt + sigma_phi(X_t, t)dW_t, where mu_theta and sigma_phi are learned from data. This generalizes classical models (GBM, Heston, etc.) by allowing arbitrary state-dependent dynamics." notation="dX_t = \mu_\theta(X_t, t)\,dt + \sigma_\phi(X_t, t)\,dW_t" />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Classical SDEs as Special Cases</h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">Neural SDEs subsume all classical financial models:</p>
      <BlockMath math="\text{GBM: } \mu(S,t) = \mu S, \quad \sigma(S,t) = \sigma S" />
      <BlockMath math="\text{Heston: } \mu(S,v,t) = \mu S, \quad \sigma(S,v,t) = \sqrt{v}\, S" />
      <BlockMath math="\text{Neural SDE: } \mu(S,t) = \text{NN}_\theta(S,t), \quad \sigma(S,t) = \text{NN}_\phi(S,t)" />

      <TheoremBlock title="Training via Adjoint Method" label="Theorem 13.14" statement="Neural SDEs can be trained efficiently using the continuous adjoint method, which computes gradients without storing intermediate states. The adjoint state a(t) = partial L / partial X_t evolves backward according to: da = -(partial mu/partial X)^T a dt - (partial sigma/partial X)^T a dW_t. Memory cost is O(1) regardless of the number of time steps." proof="By the chain rule through the SDE solver: dL/dtheta = integral_0^T a(t)^T (partial mu/partial theta) dt + a(t)^T (partial sigma/partial theta) dW_t. The adjoint a(t) satisfies a backward SDE that depends only on the current state, not the full forward trajectory. This reduces memory from O(NT) to O(N)." />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Latent Neural SDEs</h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">Latent neural SDEs model the unobserved state process driving asset prices:</p>
      <BlockMath math="dZ_t = \mu_\theta(Z_t)\,dt + \sigma_\phi(Z_t)\,dW_t \quad \text{(latent dynamics)}" />
      <BlockMath math="X_t = g_\psi(Z_t) \quad \text{(observation model)}" />
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">The latent state <InlineMath math="Z_t" /> captures unobserved market factors (investor sentiment, liquidity conditions) that drive Nifty dynamics.</p>

      <NoteBlock title="Neural SDEs for Indian Asset Pricing" type="tip">
        <ul className="space-y-1 text-sm">
          <li><strong>Nifty Dynamics:</strong> Learn state-dependent volatility that captures India VIX clustering</li>
          <li><strong>Jump Modeling:</strong> Neural drift naturally captures jump-like behavior around events (RBI, Budget)</li>
          <li><strong>Option Pricing:</strong> Neural SDE calibrated to Nifty option surface provides arbitrage-free pricing</li>
          <li><strong>Multi-factor:</strong> Joint neural SDE for Nifty + Bank Nifty preserving correlation structure</li>
        </ul>
      </NoteBlock>

      <InteractiveViz />

      <PythonCode title="neural_sde.py" runnable code={`import numpy as np

class NeuralSDE:
    """Neural SDE for learning Nifty price dynamics."""
    def __init__(self, state_dim=1, hidden=16):
        self.state_dim = state_dim
        # Drift network
        self.drift_W1 = np.random.randn(hidden, state_dim + 1) * 0.1
        self.drift_W2 = np.random.randn(state_dim, hidden) * 0.1
        # Diffusion network
        self.diff_W1 = np.random.randn(hidden, state_dim + 1) * 0.1
        self.diff_W2 = np.random.randn(state_dim, hidden) * 0.01

    def drift(self, x, t):
        inp = np.concatenate([x, [t]])
        h = np.tanh(self.drift_W1 @ inp)
        return self.drift_W2 @ h

    def diffusion(self, x, t):
        inp = np.concatenate([x, [t]])
        h = np.tanh(self.diff_W1 @ inp)
        return np.abs(self.diff_W2 @ h) + 0.01

    def simulate(self, x0, T, n_steps, n_paths):
        dt = T / n_steps
        paths = np.zeros((n_paths, n_steps + 1, self.state_dim))
        paths[:, 0] = x0

        for p in range(n_paths):
            x = x0.copy()
            for t in range(n_steps):
                t_val = t * dt / T
                mu = self.drift(x, t_val)
                sigma = self.diffusion(x, t_val)
                dW = np.random.randn(self.state_dim) * np.sqrt(dt)
                x = x + mu * dt + sigma * dW
                paths[p, t + 1] = x

        return paths

class ClassicalGBM:
    """GBM for comparison."""
    def __init__(self, mu=0.12, sigma=0.18):
        self.mu = mu; self.sigma = sigma

    def simulate(self, S0, T, n_steps, n_paths):
        dt = T / n_steps
        paths = np.zeros((n_paths, n_steps + 1))
        paths[:, 0] = S0
        for p in range(n_paths):
            for t in range(n_steps):
                dW = np.random.randn() * np.sqrt(dt)
                paths[p, t+1] = paths[p, t] * np.exp(
                    (self.mu - 0.5*self.sigma**2)*dt + self.sigma*dW)
        return paths

# Compare Neural SDE vs GBM for Nifty
np.random.seed(42)
S0 = 20000
T = 1.0  # 1 year
n_steps = 252
n_paths = 500

# Neural SDE (log-price space)
nsde = NeuralSDE(state_dim=1, hidden=16)
log_paths = nsde.simulate(np.array([np.log(S0)]), T, n_steps, n_paths)
nsde_prices = np.exp(log_paths[:, :, 0])

# GBM
gbm = ClassicalGBM(mu=0.12, sigma=0.18)
gbm_prices = gbm.simulate(S0, T, n_steps, n_paths)

print("=" * 60)
print("  Neural SDE vs GBM - Nifty 50 Simulation")
print("=" * 60)

for name, prices in [('GBM', gbm_prices), ('Neural SDE', nsde_prices)]:
    final = prices[:, -1]
    returns = np.diff(np.log(prices), axis=1)

    print(f"\\n{name}:")
    print(f"  Final price range: [{np.min(final):,.0f}, {np.max(final):,.0f}]")
    print(f"  Mean final:        {np.mean(final):,.0f}")
    print(f"  Median final:      {np.median(final):,.0f}")
    print(f"  Annual return:     {(np.mean(final)/S0 - 1)*100:+.1f}%")
    print(f"  Daily vol:         {np.std(returns)*100:.2f}%")
    print(f"  Annual vol:        {np.std(returns)*np.sqrt(252)*100:.1f}%")
    print(f"  Skewness:          {np.mean(((returns.flatten()-returns.mean())/returns.std())**3):.3f}")
    print(f"  Kurtosis:          {np.mean(((returns.flatten()-returns.mean())/returns.std())**4):.2f}")
    print(f"  VaR(5%):           {np.percentile(final/S0 - 1, 5)*100:+.1f}%")

print(f"\\nNeural SDE captures state-dependent dynamics that")
print(f"GBM misses. After training on real Nifty data, Neural SDE")
print(f"would produce realistic volatility clustering and jumps.")`} />

      <ExampleBlock title="Neural SDE vs Heston for Nifty Options" difficulty="intermediate"
        problem="Nifty 50 options show persistent volatility smile with steeper put skew. GBM cannot capture this. Compare how Heston and Neural SDE model the smile."
        solution={[
          { step: 'GBM limitation', formula: '\\sigma_{BS}(K) = \\text{constant} \\quad \\text{(flat smile)}', explanation: 'GBM produces flat implied volatility -- inconsistent with NSE Nifty option prices.' },
          { step: 'Heston improvement', formula: 'dv_t = \\kappa(\\theta - v_t)dt + \\xi\\sqrt{v_t}dW_t^v', explanation: 'Heston with mean-reverting vol captures some skew through vol-of-vol parameter xi. But the functional form is fixed.' },
          { step: 'Neural SDE advantage', formula: '\\sigma(S,v,t) = \\text{NN}_\\phi(S,v,t)', explanation: 'Neural SDE learns the exact form of state-dependent volatility from Nifty option prices. It can capture asymmetric skew, term structure effects, and regime-dependent behavior that no parametric model can match. Calibration is done by minimizing the distance between model-implied and market-observed option prices across strikes and maturities.' },
        ]} />

      <NoteBlock title="Key Takeaway" type="tip"><p>Neural SDEs represent the frontier of quantitative finance modeling, replacing rigid parametric assumptions with flexible neural networks that learn asset dynamics directly from data. For Indian markets, neural SDEs can capture the complex, state-dependent behavior of Nifty prices -- including volatility clustering, asymmetric jumps around events (RBI, elections), and regime-dependent correlations -- enabling more accurate option pricing, risk management, and scenario generation than any classical model.</p></NoteBlock>
    </div>
  )
}
