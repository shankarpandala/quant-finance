import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveMonteCarlo() {
  const [nPaths, setNPaths] = useState(1000)
  const [spot, setSpot] = useState(22000)
  const [strike, setStrike] = useState(22000)
  const [vol, setVol] = useState(0.18)

  const T = 30 / 365
  const r = 0.065

  // Simple pseudo-random simulation for display
  const seed = Math.floor(spot + strike + vol * 1000 + nPaths)
  const mulberry32 = (a) => {
    return () => {
      let t = a += 0x6D2B79F5
      t = Math.imul(t ^ t >>> 15, t | 1)
      t ^= t + Math.imul(t ^ t >>> 7, t | 61)
      return ((t ^ t >>> 14) >>> 0) / 4294967296
    }
  }
  const rng = mulberry32(seed)
  const boxMuller = () => {
    const u1 = rng(), u2 = rng()
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
  }

  const displayPaths = Math.min(nPaths, 50)
  const nSteps = 20
  const dt = T / nSteps
  const paths = []
  let payoffSum = 0
  let payoffSqSum = 0

  for (let p = 0; p < nPaths; p++) {
    let S = spot
    const path = [S]
    for (let t = 0; t < nSteps; t++) {
      const z = boxMuller()
      S = S * Math.exp((r - 0.5 * vol * vol) * dt + vol * Math.sqrt(dt) * z)
      if (p < displayPaths) path.push(S)
    }
    const payoff = Math.max(S - strike, 0)
    payoffSum += payoff
    payoffSqSum += payoff * payoff
    if (p < displayPaths) paths.push(path)
  }

  const price = Math.exp(-r * T) * payoffSum / nPaths
  const variance = payoffSqSum / nPaths - (payoffSum / nPaths) ** 2
  const stdErr = Math.exp(-r * T) * Math.sqrt(variance / nPaths)

  const chartW = 500
  const chartH = 180
  const padL = 50
  const allPrices = paths.flat()
  const maxP = Math.max(...allPrices) * 1.02
  const minP = Math.min(...allPrices) * 0.98

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Monte Carlo Simulation for Nifty 50 Call
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Simulate GBM paths and price a Nifty call option. Adjust path count to see convergence.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Paths = {nPaths}</span>
          <input type="range" min="100" max="10000" step="100" value={nPaths}
            onChange={e => setNPaths(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Spot = {spot}</span>
          <input type="range" min="18000" max="26000" step="100" value={spot}
            onChange={e => setSpot(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Strike = {strike}</span>
          <input type="range" min="18000" max="26000" step="100" value={strike}
            onChange={e => setStrike(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>IV = {(vol * 100).toFixed(0)}%</span>
          <input type="range" min="0.08" max="0.50" step="0.01" value={vol}
            onChange={e => setVol(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox={`0 0 ${chartW + padL + 20} ${chartH + 40}`}
        className="w-full max-w-2xl mx-auto block" aria-label="Monte Carlo paths">
        <line x1={padL} y1={5} x2={padL} y2={chartH + 5} stroke="#9ca3af" strokeWidth="1" />
        <line x1={padL} y1={chartH + 5} x2={chartW + padL} y2={chartH + 5} stroke="#9ca3af" strokeWidth="1" />

        {/* Strike line */}
        {(() => {
          const y = chartH + 5 - ((strike - minP) / (maxP - minP)) * chartH
          return (
            <g>
              <line x1={padL} y1={y} x2={chartW + padL} y2={y} stroke="#ef4444" strokeWidth="1" strokeDasharray="4" />
              <text x={padL - 3} y={y + 3} textAnchor="end" className="text-[8px]" fill="#ef4444">K</text>
            </g>
          )
        })()}

        {/* Paths */}
        {paths.map((path, pi) => (
          <polyline key={pi}
            points={path.map((p, ti) => {
              const x = padL + (ti / nSteps) * chartW
              const y = chartH + 5 - ((p - minP) / (maxP - minP)) * chartH
              return `${x},${y}`
            }).join(' ')}
            fill="none" stroke="#6366f1" strokeWidth="0.8" opacity="0.3" />
        ))}
      </svg>

      <div className="mt-3 grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">MC Price</div>
          <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{price.toFixed(2)}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Std Error</div>
          <div className="text-sm font-mono text-orange-600 dark:text-orange-400">{stdErr.toFixed(2)}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">95% CI</div>
          <div className="text-sm font-mono text-gray-700 dark:text-gray-300">
            [{(price - 1.96 * stdErr).toFixed(1)}, {(price + 1.96 * stdErr).toFixed(1)}]
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MonteCarloOptions() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Monte Carlo Methods for Options Pricing
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Monte Carlo simulation is the most flexible numerical method for options pricing. It can
        handle path-dependent payoffs, multiple underlyings, and complex stochastic processes that
        defy analytical solutions. For pricing exotic Nifty structures and multi-asset portfolios
        on Indian exchanges, Monte Carlo is often the only viable approach.
      </p>

      <DefinitionBlock
        title="Risk-Neutral Monte Carlo Pricing"
        label="Definition 6.21"
        definition="The Monte Carlo estimate of an option price is the sample average of discounted payoffs computed over simulated risk-neutral paths. Under the risk-neutral measure Q, the option price equals E^Q[e^{-rT} h(S_T)]."
        notation="\hat{C} = e^{-rT}\frac{1}{N}\sum_{i=1}^{N} h(S_T^{(i)}), \quad S_T^{(i)} = S_0 \exp\!\left[\left(r - \tfrac{\sigma^2}{2}\right)T + \sigma\sqrt{T}\,Z^{(i)}\right]"
      />

      <BlockMath math="S_T = S_0 \exp\!\left[\left(r - \frac{\sigma^2}{2}\right)T + \sigma\sqrt{T}\,Z\right], \quad Z \sim \mathcal{N}(0, 1)" />

      <TheoremBlock
        title="Monte Carlo Convergence"
        label="Theorem 6.9"
        statement="By the Central Limit Theorem, the Monte Carlo estimate \hat{C}_N converges to the true price C at rate O(1/\sqrt{N}). The standard error is \text{SE} = \sigma_h / \sqrt{N} where \sigma_h is the standard deviation of the discounted payoff. This rate is independent of dimension, making MC uniquely suited for high-dimensional problems."
        proof="Since the discounted payoffs h_i = e^{-rT}h(S_T^{(i)}) are i.i.d. with mean C and variance \sigma_h^2, the CLT gives \sqrt{N}(\hat{C}_N - C) \xrightarrow{d} \mathcal{N}(0, \sigma_h^2). Hence the standard error is \sigma_h/\sqrt{N}."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Variance Reduction Techniques
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The slow <InlineMath math="O(1/\sqrt{N})" /> convergence of naive Monte Carlo can be
        dramatically improved using variance reduction. The three most important techniques are:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Technique</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Idea</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Variance Reduction</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Antithetic variates</td>
              <td className="px-4 py-2">Pair each Z with -Z</td>
              <td className="px-4 py-2">2-4x typical</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Control variates</td>
              <td className="px-4 py-2">Subtract known-mean variate</td>
              <td className="px-4 py-2">10-100x possible</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Importance sampling</td>
              <td className="px-4 py-2">Sample from shifted distribution</td>
              <td className="px-4 py-2">Exponential for rare events</td>
            </tr>
          </tbody>
        </table>
      </div>

      <BlockMath math="\hat{C}_{\text{anti}} = \frac{e^{-rT}}{2N}\sum_{i=1}^{N}\left[h(S_T^{(Z_i)}) + h(S_T^{(-Z_i)})\right]" />

      <InteractiveMonteCarlo />

      <PythonCode
        title="monte_carlo_pricing.py"
        runnable
        code={`import numpy as np
from scipy.stats import norm

np.random.seed(42)

def bsm_call(S, K, T, r, sigma):
    d1 = (np.log(S/K) + (r + sigma**2/2)*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    return S*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)

def mc_european(S, K, T, r, sigma, N, option='call', antithetic=False, control=False):
    """Monte Carlo European option pricer with variance reduction."""
    Z = np.random.standard_normal(N)

    if antithetic:
        Z = np.concatenate([Z, -Z])
        N = 2 * N

    ST = S * np.exp((r - 0.5*sigma**2)*T + sigma*np.sqrt(T)*Z)

    if option == 'call':
        payoffs = np.maximum(ST - K, 0)
    else:
        payoffs = np.maximum(K - ST, 0)

    if control:
        # Use forward price as control variate
        cv = ST - S * np.exp(r * T)  # mean zero under Q
        cov_matrix = np.cov(payoffs, cv)
        beta = cov_matrix[0, 1] / cov_matrix[1, 1]
        payoffs = payoffs - beta * cv

    disc_payoffs = np.exp(-r * T) * payoffs
    price = np.mean(disc_payoffs)
    stderr = np.std(disc_payoffs) / np.sqrt(N)
    return price, stderr

# Nifty 50 22000 CE, 30 DTE
S, K, T, r, sigma = 22000, 22000, 30/365, 0.065, 0.18
bsm = bsm_call(S, K, T, r, sigma)

print("=== Monte Carlo Pricing: Nifty 50 22000 CE ===")
print(f"BSM Analytical Price: {bsm:.4f}")
print()

configs = [
    ('Naive MC',         {'antithetic': False, 'control': False}),
    ('Antithetic',       {'antithetic': True,  'control': False}),
    ('Control Variate',  {'antithetic': False, 'control': True}),
    ('Anti + Control',   {'antithetic': True,  'control': True}),
]

for label, kwargs in configs:
    prices, errors = [], []
    for _ in range(5):
        p, se = mc_european(S, K, T, r, sigma, 50000, **kwargs)
        prices.append(p)
        errors.append(se)
    avg_price = np.mean(prices)
    avg_se = np.mean(errors)
    print(f"{label:<18} Price: {avg_price:>8.2f}  SE: {avg_se:>6.2f}  "
          f"Error: {avg_price-bsm:>+6.2f}")

# Asian option (path-dependent -- MC shines here)
print("\\n=== Asian Call (Arithmetic Average) ===")
N_sims = 100000
N_steps = 30
dt = T / N_steps
Z = np.random.standard_normal((N_sims, N_steps))
paths = np.zeros((N_sims, N_steps + 1))
paths[:, 0] = S

for t in range(N_steps):
    paths[:, t+1] = paths[:, t] * np.exp(
        (r - 0.5*sigma**2)*dt + sigma*np.sqrt(dt)*Z[:, t])

avg_price_path = np.mean(paths[:, 1:], axis=1)
asian_payoffs = np.maximum(avg_price_path - K, 0)
asian_price = np.exp(-r * T) * np.mean(asian_payoffs)
asian_se = np.exp(-r * T) * np.std(asian_payoffs) / np.sqrt(N_sims)

print(f"Asian Call Price: {asian_price:.2f} (+/- {asian_se:.2f})")
print(f"European Call:    {bsm:.2f}")
print(f"Asian discount:   {(1 - asian_price/bsm)*100:.1f}%")`}
      />

      <ExampleBlock
        title="Antithetic Variates for Nifty Call"
        difficulty="intermediate"
        problem="Using 2 random draws Z_1 = 0.85 and Z_2 = -1.20, price a Nifty 22000 CE (30 DTE, sigma=18%, r=6.5%) with antithetic variates."
        solution={[
          {
            step: 'Generate 4 terminal prices (original + antithetic)',
            formula: 'S_T^{(i)} = 22000 \\cdot \\exp\\!\\left[(0.065 - 0.0162) \\cdot \\frac{30}{365} + 0.18\\sqrt{\\frac{30}{365}} \\cdot Z_i\\right]',
          },
          {
            step: 'Compute terminal prices',
            formula: 'S_T^{(0.85)} = 22506,\\; S_T^{(-0.85)} = 21503,\\; S_T^{(-1.20)} = 21228,\\; S_T^{(1.20)} = 22790',
          },
          {
            step: 'Compute payoffs and average',
            formula: '\\hat{C} = e^{-rT}\\frac{1}{4}[(506 + 0) + (0 + 790)] = e^{-0.0053} \\cdot 324 \\approx 322.3',
            explanation: 'Antithetic pairs ensure negative correlation, reducing variance compared to 4 independent draws.',
          },
        ]}
      />

      <NoteBlock title="When Monte Carlo Excels" type="tip">
        <p>
          Monte Carlo is the method of choice for: (1) path-dependent options like Asian options
          on Nifty, (2) multi-asset options on NSE index baskets, (3) options under stochastic
          volatility (Heston), and (4) computing Greeks via finite differences or pathwise
          derivatives. For vanilla European options, analytical formulas or trees are faster,
          but for complex structured products traded OTC by Indian banks, MC is irreplaceable.
        </p>
      </NoteBlock>

      <NoteBlock title="Quasi-Monte Carlo" type="warning">
        <p>
          Quasi-Monte Carlo (QMC) replaces pseudo-random numbers with low-discrepancy sequences
          (Sobol, Halton) that fill the sample space more uniformly. QMC achieves convergence
          rates of <InlineMath math="O((\log N)^d / N)" /> in d dimensions, far superior to the
          <InlineMath math="O(1/\sqrt{N})" /> of standard MC. For pricing Nifty basket options
          or computing portfolio-level CVA, QMC is the production standard at sophisticated
          Indian trading desks.
        </p>
      </NoteBlock>
    </div>
  )
}
