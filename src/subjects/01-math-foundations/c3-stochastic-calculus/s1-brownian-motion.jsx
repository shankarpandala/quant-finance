import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveBrownianMotion() {
  const [nPaths, setNPaths] = useState(5)
  const [drift, setDrift] = useState(0.12)
  const [volatility, setVolatility] = useState(0.2)
  const [seed, setSeed] = useState(42)

  // Simple seeded RNG for reproducibility
  const seededRandom = (s) => {
    let state = s
    return () => {
      state = (state * 1664525 + 1013904223) & 0xffffffff
      return (state >>> 0) / 0xffffffff
    }
  }

  // Box-Muller transform
  const normalRandom = (rng) => {
    const u1 = rng()
    const u2 = rng()
    return Math.sqrt(-2 * Math.log(u1 + 1e-10)) * Math.cos(2 * Math.PI * u2)
  }

  const T = 1 // 1 year
  const nSteps = 252
  const dt = T / nSteps
  const S0 = 20000 // Nifty starting level

  const rng = seededRandom(seed)
  const paths = []
  for (let p = 0; p < nPaths; p++) {
    const path = [S0]
    let S = S0
    for (let t = 1; t <= nSteps; t++) {
      const dW = normalRandom(rng) * Math.sqrt(dt)
      S = S * Math.exp((drift - 0.5 * volatility * volatility) * dt + volatility * dW)
      path.push(S)
    }
    paths.push(path)
  }

  let minS = Infinity, maxS = -Infinity
  for (const path of paths) {
    for (const s of path) {
      if (s < minS) minS = s
      if (s > maxS) maxS = s
    }
  }
  minS *= 0.95
  maxS *= 1.05

  const chartW = 500
  const chartH = 220
  const padL = 60
  const padR = 15
  const padT = 20
  const padB = 35
  const plotW = chartW - padL - padR
  const plotH = chartH - padT - padB

  const toX = (i) => padL + (i / nSteps) * plotW
  const toY = (s) => padT + plotH - ((s - minS) / (maxS - minS)) * plotH

  const colors = ['#6366f1', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316']

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Geometric Brownian Motion Paths (Nifty 50)
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Simulate GBM paths for the Nifty 50 index starting at 20,000. Adjust drift{' '}
        <InlineMath math="\mu" /> and volatility <InlineMath math="\sigma" />.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Paths: {nPaths}</span>
          <input type="range" min="1" max="8" step="1" value={nPaths}
            onChange={e => setNPaths(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Drift <InlineMath math="\mu" /> = {(drift * 100).toFixed(0)}%</span>
          <input type="range" min="-0.2" max="0.4" step="0.02" value={drift}
            onChange={e => setDrift(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Vol <InlineMath math="\sigma" /> = {(volatility * 100).toFixed(0)}%</span>
          <input type="range" min="0.05" max="0.5" step="0.01" value={volatility}
            onChange={e => setVolatility(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Seed: {seed}</span>
          <input type="range" min="1" max="100" step="1" value={seed}
            onChange={e => setSeed(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full max-w-xl mx-auto block">
        <line x1={padL} y1={padT + plotH} x2={padL + plotW} y2={padT + plotH} stroke="#9ca3af" strokeWidth="1" />
        <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke="#9ca3af" strokeWidth="1" />

        {/* Starting level reference */}
        <line x1={padL} y1={toY(S0)} x2={padL + plotW} y2={toY(S0)} stroke="#9ca3af" strokeWidth="0.5" strokeDasharray="4,3" />
        <text x={padL - 5} y={toY(S0) + 3} textAnchor="end" className="text-[8px]" fill="#9ca3af">20k</text>

        {paths.map((path, p) => (
          <path key={p}
            d={path.map((s, i) => `${i === 0 ? 'M' : 'L'}${toX(i).toFixed(1)},${toY(s).toFixed(1)}`).join(' ')}
            fill="none" stroke={colors[p % colors.length]} strokeWidth="1.5" opacity="0.8" />
        ))}

        <text x={padL + plotW / 2} y={chartH - 4} textAnchor="middle" className="text-[10px]" fill="#6b7280">Trading Days (1 Year)</text>
        <text x={12} y={padT + plotH / 2} textAnchor="middle" className="text-[10px]" fill="#6b7280"
          transform={`rotate(-90,12,${padT + plotH / 2})`}>Nifty Level</text>
      </svg>

      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        Expected terminal value: <InlineMath math={`S_0 e^{\\mu T} = ${(S0 * Math.exp(drift * T)).toFixed(0)}`} />.
        Each path is equally likely under the GBM model.
      </p>
    </div>
  )
}

export default function BrownianMotion() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Brownian Motion and Random Walks
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Brownian motion (the Wiener process) is the mathematical foundation of continuous-time
        finance. It models the random fluctuations of stock prices and is the driving noise
        in the Black-Scholes model used to price Nifty and Bank Nifty options on the NSE.
      </p>

      {/* --- Random Walk --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        From Discrete Random Walks to Brownian Motion
      </h3>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Consider a symmetric random walk where a stock price moves up or down by{' '}
        <InlineMath math="\Delta x" /> at each time step <InlineMath math="\Delta t" />:
      </p>

      <BlockMath math="S_{n+1} = S_n + \Delta x \cdot \xi_n, \quad \xi_n \in \{+1, -1\} \text{ with equal probability}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        If we take the limit <InlineMath math="\Delta t \to 0" /> while setting{' '}
        <InlineMath math="\Delta x = \sigma \sqrt{\Delta t}" />, the random walk converges
        (by Donsker's theorem) to a continuous-time Brownian motion.
      </p>

      {/* --- Brownian Motion Definition --- */}
      <DefinitionBlock
        title="Standard Brownian Motion (Wiener Process)"
        label="Definition 1.1"
        definition={<>
          A standard Brownian motion <InlineMath math="\{W_t\}_{t \geq 0}" /> is a continuous-time
          stochastic process satisfying:
          <ol className="mt-2 ml-4 list-decimal space-y-1">
            <li><InlineMath math="W_0 = 0" /> (starts at zero)</li>
            <li><strong>Independent increments:</strong> <InlineMath math="W_t - W_s" /> is independent of{' '}
              <InlineMath math="\{W_u : u \leq s\}" /> for <InlineMath math="s < t" /></li>
            <li><strong>Gaussian increments:</strong> <InlineMath math="W_t - W_s \sim N(0, t - s)" /></li>
            <li><strong>Continuous paths:</strong> <InlineMath math="t \mapsto W_t" /> is continuous (a.s.)</li>
          </ol>
        </>}
        notation={<>
          Variance grows linearly: <InlineMath math="\text{Var}(W_t) = t" />.
          Standard deviation grows as <InlineMath math="\sqrt{t}" />.
        </>}
      />

      {/* --- Key Properties --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Key Properties of Brownian Motion
      </h3>

      <TheoremBlock
        title="Properties of Brownian Motion"
        label="Theorem 1.1"
        statement={<>
          A standard Brownian motion <InlineMath math="W_t" /> has the following properties:
          <BlockMath math={`\\begin{aligned}
E[W_t] &= 0 \\quad \\text{(zero drift)} \\\\
E[W_t^2] &= t \\quad \\text{(variance = time)} \\\\
\\text{Cov}(W_s, W_t) &= \\min(s, t) \\\\
E[(W_{t+\\Delta t} - W_t)^2] &= \\Delta t \\quad \\text{(quadratic variation)} \\\\
(dW_t)^2 &= dt \\quad \\text{(informally)}
\\end{aligned}`} />
          The last property is crucial for Ito's calculus: the "square" of the Brownian
          increment is deterministic, not random.
        </>}
      />

      <NoteBlock title="Nowhere Differentiable" type="warning">
        <p>
          Brownian motion paths are continuous but <strong>nowhere differentiable</strong> --
          they have infinite total variation on any interval. This is why we cannot use
          ordinary calculus (Newton-Leibniz) to analyze stochastic differential equations.
          We need Ito calculus instead, which accounts for the non-zero quadratic variation{' '}
          <InlineMath math="(dW)^2 = dt" />.
        </p>
      </NoteBlock>

      {/* --- Arithmetic vs Geometric BM --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Arithmetic vs. Geometric Brownian Motion
      </h3>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        <strong>Arithmetic Brownian Motion (ABM)</strong> models additive noise:
      </p>

      <BlockMath math="dS_t = \mu \, dt + \sigma \, dW_t \implies S_t = S_0 + \mu t + \sigma W_t" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Problem: ABM allows negative prices! For the Nifty 50, which cannot go below zero,
        we use <strong>Geometric Brownian Motion (GBM)</strong>:
      </p>

      <BlockMath math="dS_t = \mu S_t \, dt + \sigma S_t \, dW_t \implies \frac{dS_t}{S_t} = \mu \, dt + \sigma \, dW_t" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The solution (using Ito's lemma) is:
      </p>

      <BlockMath math="S_t = S_0 \exp\!\left[\left(\mu - \frac{\sigma^2}{2}\right)t + \sigma W_t\right]" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Note the <InlineMath math="-\sigma^2/2" /> correction term, which arises from Ito's
        lemma. This is why the expected log return differs from the expected arithmetic return:
      </p>

      <BlockMath math="E[\ln(S_T/S_0)] = \left(\mu - \frac{\sigma^2}{2}\right)T \quad \text{vs.} \quad E[S_T] = S_0 e^{\mu T}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For Nifty 50 with <InlineMath math="\mu = 12\%" /> and <InlineMath math="\sigma = 18\%" />,
        the expected log return is <InlineMath math="12\% - 0.5 \times 18\%^2 = 10.38\%" /> per year,
        while the expected price grows at 12%.
      </p>

      {/* --- Interactive GBM Paths --- */}
      <InteractiveBrownianMotion />

      {/* --- Brownian Bridge and Other Variants --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Variants of Brownian Motion
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Variant</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">SDE</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Use in Indian Markets</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">Brownian Bridge</td>
              <td className="px-4 py-2"><InlineMath math="W_t | W_T = b" /></td>
              <td className="px-4 py-2">VWAP execution, intray price modeling</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">Ornstein-Uhlenbeck</td>
              <td className="px-4 py-2"><InlineMath math="dX = \theta(\mu - X)dt + \sigma dW" /></td>
              <td className="px-4 py-2">Mean-reverting spreads (pairs trading on NSE)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">Jump-Diffusion (Merton)</td>
              <td className="px-4 py-2"><InlineMath math="dS/S = \mu dt + \sigma dW + J dN" /></td>
              <td className="px-4 py-2">Nifty crash modeling, option pricing with jumps</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-medium">Fractional BM</td>
              <td className="px-4 py-2"><InlineMath math="E[W^H_s W^H_t] \neq \min(s,t)" /></td>
              <td className="px-4 py-2">Long-memory in volatility, rough volatility</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- Python Code --- */}
      <PythonCode
        title="brownian_motion_sim.py"
        runnable
        code={`import numpy as np

np.random.seed(42)

# --- Simulate Brownian Motion Paths ---
T = 1.0       # 1 year
n_steps = 252  # daily
dt = T / n_steps
n_paths = 10000

# Standard Brownian Motion
dW = np.random.normal(0, np.sqrt(dt), (n_paths, n_steps))
W = np.cumsum(dW, axis=1)
W = np.column_stack([np.zeros(n_paths), W])

print("=== Standard Brownian Motion Properties ===")
print(f"E[W_T]:       {np.mean(W[:, -1]):.6f}  (theory: 0)")
print(f"Var(W_T):     {np.var(W[:, -1]):.6f}  (theory: {T})")
print(f"E[W_T^2]:     {np.mean(W[:, -1]**2):.6f}  (theory: {T})")

# Verify Cov(W_s, W_t) = min(s, t)
s_idx, t_idx = 100, 200
s_time, t_time = s_idx * dt, t_idx * dt
cov_emp = np.mean(W[:, s_idx] * W[:, t_idx])
print(f"Cov(W_{{s}}, W_{{t}}):  {cov_emp:.6f}  (theory: min({s_time:.3f},{t_time:.3f})={s_time:.3f})")
print()

# --- Geometric Brownian Motion for Nifty 50 ---
S0 = 20000     # Starting Nifty level
mu = 0.12      # 12% annual drift
sigma = 0.18   # 18% annual volatility

# Exact GBM solution
S = S0 * np.exp((mu - 0.5 * sigma**2) * np.arange(n_steps + 1) * dt
                + sigma * W)

print("=== GBM: Nifty 50 Simulation ===")
print(f"Start: {S0}, Drift: {mu*100}%, Vol: {sigma*100}%")
print(f"E[S_T]:    {np.mean(S[:, -1]):.0f}  (theory: {S0*np.exp(mu*T):.0f})")
print(f"Std(S_T):  {np.std(S[:, -1]):.0f}")
print(f"Median:    {np.median(S[:, -1]):.0f}  (theory: {S0*np.exp((mu-0.5*sigma**2)*T):.0f})")
print()

# Probability analysis
final_prices = S[:, -1]
print("=== Nifty Level Distribution After 1 Year ===")
percentiles = [5, 10, 25, 50, 75, 90, 95]
for p in percentiles:
    val = np.percentile(final_prices, p)
    ret = (val / S0 - 1) * 100
    print(f"  {p:3d}th percentile: {val:,.0f}  ({ret:+.1f}%)")

print(f"\\nP(Nifty > 22000): {np.mean(final_prices > 22000)*100:.1f}%")
print(f"P(Nifty < 18000): {np.mean(final_prices < 18000)*100:.1f}%")
print(f"P(Nifty < 16000): {np.mean(final_prices < 16000)*100:.1f}%")

# --- Quadratic Variation ---
qv_paths = np.sum(dW**2, axis=1)
print(f"\\n=== Quadratic Variation ===")
print(f"E[QV]:  {np.mean(qv_paths):.6f}  (theory: {T})")
print(f"Std[QV]: {np.std(qv_paths):.6f}  (converges to 0 as dt->0)")
print("This confirms (dW)^2 = dt in the limit.")`}
      />

      {/* --- Worked Example --- */}
      <ExampleBlock
        title="Nifty 50 One-Year Probability Bounds"
        difficulty="intermediate"
        problem="The Nifty 50 is at 20,000 with annual drift 12% and volatility 18%. Under GBM, what is the probability that Nifty falls below 16,000 within one year?"
        solution={[
          {
            step: 'The terminal log price is normal',
            formula: '\\ln(S_T/S_0) \\sim N\\!\\left((\\mu - \\sigma^2/2)T, \\, \\sigma^2 T\\right) = N(0.1038, 0.0324)',
          },
          {
            step: 'Compute the threshold log return',
            formula: '\\ln(16000/20000) = \\ln(0.8) = -0.2231',
          },
          {
            step: 'Standardize',
            formula: 'z = \\frac{-0.2231 - 0.1038}{0.18} = \\frac{-0.3269}{0.18} = -1.816',
          },
          {
            step: 'Look up the probability',
            formula: 'P(S_T < 16000) = \\Phi(-1.816) \\approx 3.5\\%',
            explanation: 'Under GBM, there is about a 3.5% chance Nifty ends below 16,000 after one year. Note: this is the terminal probability; the probability of touching 16,000 at any point during the year (first passage) is higher.',
          },
        ]}
      />

      {/* --- Key Takeaway --- */}
      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Brownian motion provides the mathematical language for modeling continuous-time
          uncertainty in stock prices. The GBM model, while imperfect (it assumes constant
          volatility and no jumps), is the baseline for all derivative pricing on the NSE.
          The key insight is that <InlineMath math="(dW)^2 = dt" /> -- the quadratic variation
          of Brownian motion is deterministic, which enables the powerful machinery of Ito
          calculus that we explore next.
        </p>
      </NoteBlock>
    </div>
  )
}
