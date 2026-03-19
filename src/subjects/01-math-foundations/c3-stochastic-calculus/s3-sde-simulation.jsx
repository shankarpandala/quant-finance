import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveSchemeComparison() {
  const [nSteps, setNSteps] = useState(50)
  const [volatility, setVolatility] = useState(0.3)
  const [scheme, setScheme] = useState('both')

  const seededRandom = (s) => {
    let state = s
    return () => {
      state = (state * 1664525 + 1013904223) & 0xffffffff
      return (state >>> 0) / 0xffffffff
    }
  }

  const normalRandom = (rng) => {
    const u1 = rng()
    const u2 = rng()
    return Math.sqrt(-2 * Math.log(u1 + 1e-10)) * Math.cos(2 * Math.PI * u2)
  }

  const T = 1
  const S0 = 20000
  const mu = 0.12
  const dt = T / nSteps
  const rng = seededRandom(42)

  const dWs = []
  for (let i = 0; i < nSteps; i++) {
    dWs.push(normalRandom(rng) * Math.sqrt(dt))
  }

  // Euler-Maruyama
  const euler = [S0]
  let Se = S0
  for (let i = 0; i < nSteps; i++) {
    Se = Se + mu * Se * dt + volatility * Se * dWs[i]
    euler.push(Math.max(Se, 0))
  }

  // Milstein
  const milstein = [S0]
  let Sm = S0
  for (let i = 0; i < nSteps; i++) {
    Sm = Sm + mu * Sm * dt + volatility * Sm * dWs[i] +
      0.5 * volatility * volatility * Sm * (dWs[i] * dWs[i] - dt)
    milstein.push(Math.max(Sm, 0))
  }

  // Exact GBM
  const exact = [S0]
  let W = 0
  for (let i = 0; i < nSteps; i++) {
    W += dWs[i]
    exact.push(S0 * Math.exp((mu - 0.5 * volatility * volatility) * (i + 1) * dt + volatility * W))
  }

  let minS = Infinity, maxS = -Infinity
  const allPaths = [exact, ...(scheme !== 'milstein' ? [euler] : []), ...(scheme !== 'euler' ? [milstein] : [])]
  for (const path of allPaths) {
    for (const s of path) {
      if (s < minS) minS = s
      if (s > maxS) maxS = s
    }
  }
  minS *= 0.95
  maxS *= 1.05

  const chartW = 500
  const chartH = 200
  const padL = 60
  const padR = 15
  const padT = 20
  const padB = 35
  const plotW = chartW - padL - padR
  const plotH = chartH - padT - padB

  const toX = (i) => padL + (i / nSteps) * plotW
  const toY = (s) => padT + plotH - ((s - minS) / (maxS - minS)) * plotH

  const makePath = (data) => data.map((s, i) => `${i === 0 ? 'M' : 'L'}${toX(i).toFixed(1)},${toY(s).toFixed(1)}`).join(' ')

  const eulerError = Math.abs(euler[nSteps] - exact[nSteps]) / exact[nSteps] * 100
  const milsteinError = Math.abs(milstein[nSteps] - exact[nSteps]) / exact[nSteps] * 100

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Euler-Maruyama vs. Milstein for Nifty GBM
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Compare numerical SDE schemes against the exact GBM solution. Increase volatility
        and decrease steps to see where Milstein outperforms Euler.
      </p>

      <div className="mb-4 grid grid-cols-3 gap-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Steps: {nSteps}</span>
          <input type="range" min="10" max="252" step="1" value={nSteps}
            onChange={e => setNSteps(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Vol: {(volatility * 100).toFixed(0)}%</span>
          <input type="range" min="0.1" max="0.6" step="0.02" value={volatility}
            onChange={e => setVolatility(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Scheme</span>
          <select value={scheme} onChange={e => setScheme(e.target.value)}
            className="rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
            <option value="both">Both</option>
            <option value="euler">Euler Only</option>
            <option value="milstein">Milstein Only</option>
          </select>
        </label>
      </div>

      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full max-w-xl mx-auto block">
        <line x1={padL} y1={padT + plotH} x2={padL + plotW} y2={padT + plotH} stroke="#9ca3af" strokeWidth="1" />
        <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke="#9ca3af" strokeWidth="1" />

        <path d={makePath(exact)} fill="none" stroke="#6b7280" strokeWidth="2" strokeDasharray="4,3" />
        {(scheme === 'both' || scheme === 'euler') && (
          <path d={makePath(euler)} fill="none" stroke="#ef4444" strokeWidth="1.5" />
        )}
        {(scheme === 'both' || scheme === 'milstein') && (
          <path d={makePath(milstein)} fill="none" stroke="#6366f1" strokeWidth="1.5" />
        )}

        {/* Legend */}
        <line x1={padL + 10} y1={padT + 8} x2={padL + 30} y2={padT + 8} stroke="#6b7280" strokeWidth="2" strokeDasharray="4,3" />
        <text x={padL + 35} y={padT + 11} className="text-[9px]" fill="#6b7280">Exact</text>
        {(scheme === 'both' || scheme === 'euler') && <>
          <line x1={padL + 80} y1={padT + 8} x2={padL + 100} y2={padT + 8} stroke="#ef4444" strokeWidth="1.5" />
          <text x={padL + 105} y={padT + 11} className="text-[9px]" fill="#ef4444">Euler</text>
        </>}
        {(scheme === 'both' || scheme === 'milstein') && <>
          <line x1={padL + 145} y1={padT + 8} x2={padL + 165} y2={padT + 8} stroke="#6366f1" strokeWidth="1.5" />
          <text x={padL + 170} y={padT + 11} className="text-[9px]" fill="#6366f1">Milstein</text>
        </>}
      </svg>

      <div className="mt-3 grid grid-cols-3 gap-3 text-center text-sm">
        <div className="rounded bg-gray-50 p-2 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Exact Terminal</div>
          <div className="font-bold text-gray-700 dark:text-gray-300">{exact[nSteps].toFixed(0)}</div>
        </div>
        <div className="rounded bg-red-50 p-2 dark:bg-red-900/30">
          <div className="text-xs text-red-500">Euler Error</div>
          <div className="font-bold text-red-700 dark:text-red-300">{eulerError.toFixed(2)}%</div>
        </div>
        <div className="rounded bg-indigo-50 p-2 dark:bg-indigo-900/30">
          <div className="text-xs text-indigo-500">Milstein Error</div>
          <div className="font-bold text-indigo-700 dark:text-indigo-300">{milsteinError.toFixed(2)}%</div>
        </div>
      </div>
    </div>
  )
}

export default function SDESimulation() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        SDE Numerical Simulation Schemes
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        While some SDEs (like GBM) have closed-form solutions, most models used in practice --
        stochastic volatility (Heston), jump-diffusion (Merton), and mean-reverting processes
        (Vasicek) -- require numerical simulation. This section covers the Euler-Maruyama and
        Milstein schemes with applications to pricing exotic derivatives on the NSE.
      </p>

      {/* --- Euler-Maruyama Scheme --- */}
      <DefinitionBlock
        title="Euler-Maruyama Scheme"
        label="Definition 3.1"
        definition={<>
          For the SDE <InlineMath math="dX_t = a(X_t, t) \, dt + b(X_t, t) \, dW_t" />,
          the Euler-Maruyama discretization over a time step <InlineMath math="\Delta t" /> is:
          <BlockMath math="X_{n+1} = X_n + a(X_n, t_n) \Delta t + b(X_n, t_n) \Delta W_n" />
          where <InlineMath math="\Delta W_n = W_{t_{n+1}} - W_{t_n} \sim N(0, \Delta t)" />.
          This has <strong>strong order 0.5</strong> and <strong>weak order 1.0</strong>.
        </>}
        notation={<>
          Strong convergence: <InlineMath math="E[|X_N - X(T)|] \leq C \cdot (\Delta t)^{0.5}" />.
          Weak convergence: <InlineMath math="|E[g(X_N)] - E[g(X(T))]| \leq C \cdot \Delta t" />.
        </>}
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For GBM with <InlineMath math="a(S) = \mu S" /> and <InlineMath math="b(S) = \sigma S" />:
      </p>

      <BlockMath math="S_{n+1} = S_n + \mu S_n \Delta t + \sigma S_n \Delta W_n = S_n(1 + \mu \Delta t + \sigma \Delta W_n)" />

      {/* --- Milstein Scheme --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Milstein Scheme: Higher-Order Accuracy
      </h3>

      <TheoremBlock
        title="Milstein Scheme"
        label="Theorem 3.1"
        statement={<>
          The Milstein scheme adds a correction term involving the derivative of the
          diffusion coefficient <InlineMath math="b'(x) = \partial b / \partial x" />:
          <BlockMath math="X_{n+1} = X_n + a(X_n) \Delta t + b(X_n) \Delta W_n + \frac{1}{2} b(X_n) b'(X_n) \left[(\Delta W_n)^2 - \Delta t\right]" />
          This achieves <strong>strong order 1.0</strong>, a significant improvement over
          Euler-Maruyama for pathwise accuracy.
        </>}
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For GBM, <InlineMath math="b(S) = \sigma S" /> so <InlineMath math="b'(S) = \sigma" />,
        giving:
      </p>

      <BlockMath math="S_{n+1} = S_n + \mu S_n \Delta t + \sigma S_n \Delta W_n + \frac{1}{2} \sigma^2 S_n \left[(\Delta W_n)^2 - \Delta t\right]" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The Milstein correction captures the curvature (convexity) of the diffusion, which
        is exactly the Ito correction term. For multiplicative noise (like GBM), this correction
        is crucial when <InlineMath math="\sigma" /> is large and <InlineMath math="\Delta t" />{' '}
        is not very small.
      </p>

      {/* --- Interactive comparison --- */}
      <InteractiveSchemeComparison />

      {/* --- Convergence Comparison --- */}
      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Scheme</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Strong Order</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Weak Order</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Cost per Step</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Best For</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">Euler-Maruyama</td>
              <td className="px-4 py-2">0.5</td>
              <td className="px-4 py-2">1.0</td>
              <td className="px-4 py-2">Low</td>
              <td className="px-4 py-2">Monte Carlo option pricing (weak convergence)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">Milstein</td>
              <td className="px-4 py-2">1.0</td>
              <td className="px-4 py-2">1.0</td>
              <td className="px-4 py-2">Low</td>
              <td className="px-4 py-2">Path-dependent options, barrier options</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">Runge-Kutta (SDE)</td>
              <td className="px-4 py-2">1.0</td>
              <td className="px-4 py-2">2.0</td>
              <td className="px-4 py-2">Medium</td>
              <td className="px-4 py-2">Higher accuracy for exotic payoffs</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-medium">Exact (log-Euler)</td>
              <td className="px-4 py-2">Exact</td>
              <td className="px-4 py-2">Exact</td>
              <td className="px-4 py-2">Low</td>
              <td className="px-4 py-2">GBM only (use when available)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <NoteBlock title="Practical Tip for NSE Option Pricing" type="info">
        <p>
          For pricing path-dependent Nifty options (Asian options, barrier options, lookback
          options), use the Milstein scheme with at least 252 steps per year (daily granularity).
          For vanilla European options priced via Monte Carlo, the Euler-Maruyama scheme with
          weak convergence is sufficient since we only care about the terminal distribution.
          For GBM specifically, always prefer the exact log-Euler scheme:{' '}
          <InlineMath math="S_{n+1} = S_n \exp[(\mu - \sigma^2/2)\Delta t + \sigma \Delta W_n]" />.
        </p>
      </NoteBlock>

      {/* --- Python Code --- */}
      <PythonCode
        title="sde_simulation.py"
        runnable
        code={`import numpy as np

np.random.seed(42)

# SDE parameters (Nifty 50 GBM)
S0 = 20000
mu = 0.12
sigma = 0.25
T = 1.0
n_paths = 50000

def euler_maruyama(S0, mu, sigma, T, n_steps, n_paths):
    """Euler-Maruyama scheme for GBM."""
    dt = T / n_steps
    S = np.full(n_paths, S0, dtype=float)
    for _ in range(n_steps):
        dW = np.random.normal(0, np.sqrt(dt), n_paths)
        S = S + mu * S * dt + sigma * S * dW
    return S

def milstein(S0, mu, sigma, T, n_steps, n_paths):
    """Milstein scheme for GBM."""
    dt = T / n_steps
    S = np.full(n_paths, S0, dtype=float)
    for _ in range(n_steps):
        dW = np.random.normal(0, np.sqrt(dt), n_paths)
        S = S + mu * S * dt + sigma * S * dW + \\
            0.5 * sigma**2 * S * (dW**2 - dt)
    return S

def exact_gbm(S0, mu, sigma, T, n_paths):
    """Exact GBM solution (no discretization error)."""
    Z = np.random.normal(0, 1, n_paths)
    return S0 * np.exp((mu - 0.5 * sigma**2) * T + sigma * np.sqrt(T) * Z)

# --- Convergence Study ---
print("=== SDE Scheme Convergence Study ===")
print(f"GBM: S0={S0}, mu={mu}, sigma={sigma}, T={T}")
print()

# Exact reference
exact_mean = S0 * np.exp(mu * T)
exact_var = S0**2 * np.exp(2 * mu * T) * (np.exp(sigma**2 * T) - 1)

step_sizes = [10, 25, 50, 100, 252, 1000]
print(f"{'Steps':>6} {'Euler Mean':>12} {'Milstein Mean':>14} {'Exact Mean':>12}")
print(f"{'':>6} {'Euler Err%':>12} {'Milstein Err%':>14}")

for n_steps in step_sizes:
    np.random.seed(42)
    S_euler = euler_maruyama(S0, mu, sigma, T, n_steps, n_paths)
    np.random.seed(42)
    S_milstein = milstein(S0, mu, sigma, T, n_steps, n_paths)

    e_err = abs(np.mean(S_euler) - exact_mean) / exact_mean * 100
    m_err = abs(np.mean(S_milstein) - exact_mean) / exact_mean * 100
    print(f"{n_steps:>6} {np.mean(S_euler):>12.1f} {np.mean(S_milstein):>14.1f} {exact_mean:>12.1f}")
    print(f"{'':>6} {e_err:>12.4f}% {m_err:>14.4f}%")

print()

# --- Monte Carlo Option Pricing (Nifty ATM Call) ---
K = 20000
r = 0.065
n_steps = 252

print("=== Monte Carlo: Nifty ATM Call Option ===")
np.random.seed(42)
# Use risk-neutral drift (r instead of mu)
S_terminal = exact_gbm(S0, r, sigma, T, n_paths)
payoffs = np.maximum(S_terminal - K, 0)
mc_price = np.exp(-r * T) * np.mean(payoffs)
mc_se = np.exp(-r * T) * np.std(payoffs) / np.sqrt(n_paths)

print(f"MC Price:     INR {mc_price:.2f}")
print(f"MC Std Error: INR {mc_se:.2f}")
print(f"95% CI:       [{mc_price - 1.96*mc_se:.2f}, {mc_price + 1.96*mc_se:.2f}]")
print()

# --- Heston Stochastic Volatility (Euler-Maruyama) ---
print("=== Heston Model Simulation ===")
v0 = 0.04        # Initial variance (20% vol)
kappa = 2.0      # Mean reversion speed
theta = 0.04     # Long-run variance
xi = 0.5         # Vol of vol
rho = -0.7       # Correlation (leverage effect)

n_steps_heston = 252
dt = T / n_steps_heston
S_h = np.full(n_paths, float(S0))
v = np.full(n_paths, v0)

for _ in range(n_steps_heston):
    Z1 = np.random.normal(0, 1, n_paths)
    Z2 = rho * Z1 + np.sqrt(1 - rho**2) * np.random.normal(0, 1, n_paths)
    v = np.maximum(v + kappa * (theta - v) * dt + xi * np.sqrt(np.maximum(v, 0)) * np.sqrt(dt) * Z2, 0)
    S_h = S_h * np.exp((r - 0.5 * v) * dt + np.sqrt(np.maximum(v, 0)) * np.sqrt(dt) * Z1)

heston_payoffs = np.maximum(S_h - K, 0)
heston_price = np.exp(-r * T) * np.mean(heston_payoffs)
heston_se = np.exp(-r * T) * np.std(heston_payoffs) / np.sqrt(n_paths)
print(f"Heston MC Price: INR {heston_price:.2f} (SE: {heston_se:.2f})")
print(f"vs GBM MC Price: INR {mc_price:.2f}")
print(f"Heston produces {'higher' if heston_price > mc_price else 'lower'} call prices due to vol smile")`}
      />

      {/* --- Worked Example --- */}
      <ExampleBlock
        title="Euler-Maruyama for Mean-Reverting Spread"
        difficulty="intermediate"
        problem={<>
          A pairs trade on TCS-Infosys has spread dynamics{' '}
          <InlineMath math="dX = 2(50 - X)dt + 15\,dW" /> (Ornstein-Uhlenbeck). Simulate
          one step from <InlineMath math="X_0 = 70" /> with <InlineMath math="\Delta t = 1/252" />{' '}
          and <InlineMath math="\Delta W = 0.05" />.
        </>}
        solution={[
          {
            step: 'Identify drift and diffusion',
            formula: 'a(X) = 2(50 - X) = 2(50 - 70) = -40, \\quad b(X) = 15',
          },
          {
            step: 'Apply Euler-Maruyama',
            formula: 'X_1 = X_0 + a(X_0)\\Delta t + b(X_0)\\Delta W = 70 + (-40)(1/252) + 15(0.05)',
          },
          {
            step: 'Compute',
            formula: 'X_1 = 70 - 0.159 + 0.75 = 70.591',
            explanation: 'The spread increased slightly. The mean-reversion force (-0.159) is pulling it back toward 50, but the random shock (+0.75) pushed it up. Over time, the spread will tend back to 50.',
          },
        ]}
      />

      {/* --- Key Takeaway --- */}
      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          The Euler-Maruyama scheme is the "hello world" of SDE simulation -- simple and
          effective for Monte Carlo pricing. The Milstein scheme adds one correction term
          for better pathwise accuracy, essential for barrier and path-dependent options.
          For GBM (Nifty pricing), always use the exact log-Euler scheme. For more complex
          models like Heston (stochastic volatility), Euler-Maruyama with full truncation
          (ensuring variance stays positive) is the standard approach. Monte Carlo with
          50,000+ paths typically gives option prices accurate to within INR 1--2 for Nifty
          options.
        </p>
      </NoteBlock>
    </div>
  )
}
