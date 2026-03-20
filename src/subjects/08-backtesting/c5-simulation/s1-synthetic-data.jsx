import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveSyntheticPaths() {
  const [mu, setMu] = useState(12)
  const [sigma, setSigma] = useState(18)
  const [nPaths, setNPaths] = useState(5)
  const [jumpIntensity, setJumpIntensity] = useState(0.02)

  const days = 60
  const dt = 1 / 252
  const paths = []
  for (let p = 0; p < Math.min(nPaths, 8); p++) {
    const path = [22000]
    let seed = (p + 1) * 7 + 13
    for (let d = 1; d < days; d++) {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff
      const z = ((seed / 0x7fffffff) - 0.5) * 3.4
      const drift = (mu / 100 - 0.5 * (sigma / 100) ** 2) * dt
      const diffusion = (sigma / 100) * Math.sqrt(dt) * z
      seed = (seed * 1103515245 + 12345) & 0x7fffffff
      const jumpProb = seed / 0x7fffffff
      const jump = jumpProb < jumpIntensity ? (z > 0 ? 0.03 : -0.04) : 0
      const newPrice = path[d - 1] * Math.exp(drift + diffusion + jump)
      path.push(newPrice)
    }
    paths.push(path)
  }

  const allPrices = paths.flat()
  const minP = Math.min(...allPrices)
  const maxP = Math.max(...allPrices)
  const range = maxP - minP || 1

  const colors = ['#6366f1', '#22c55e', '#ef4444', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899', '#14b8a6']

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Synthetic Nifty Price Paths
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Generate synthetic Nifty 50 paths using GBM with Merton jump diffusion.
        Adjust drift, volatility, and jump intensity to see different market regimes.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Drift <InlineMath math="\mu" /> = {mu}% annual</span>
          <input type="range" min="-10" max="30" step="1" value={mu}
            onChange={e => setMu(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Vol <InlineMath math="\sigma" /> = {sigma}% annual</span>
          <input type="range" min="5" max="50" step="1" value={sigma}
            onChange={e => setSigma(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Paths = {nPaths}</span>
          <input type="range" min="1" max="8" step="1" value={nPaths}
            onChange={e => setNPaths(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Jump Intensity = {(jumpIntensity * 100).toFixed(1)}%</span>
          <input type="range" min="0" max="0.1" step="0.005" value={jumpIntensity}
            onChange={e => setJumpIntensity(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 520 200" className="w-full max-w-xl mx-auto block" aria-label="Synthetic price paths">
        {[0, 0.25, 0.5, 0.75, 1].map(frac => {
          const y = 180 - frac * 160
          const price = (minP + frac * range).toFixed(0)
          return (
            <g key={frac}>
              <line x1="45" y1={y} x2="510" y2={y} stroke="#e5e7eb" strokeWidth="0.5" />
              <text x="42" y={y + 3} textAnchor="end" className="text-[7px]" fill="#9ca3af">{price}</text>
            </g>
          )
        })}

        {paths.map((path, pi) => {
          const points = path.map((p, i) => {
            const x = 50 + (i / (days - 1)) * 460
            const y = 180 - ((p - minP) / range) * 160
            return `${x},${y}`
          }).join(' ')
          return <polyline key={pi} points={points} fill="none" stroke={colors[pi]} strokeWidth="1.5" opacity="0.7" />
        })}

        <circle cx="50" cy={180 - ((22000 - minP) / range) * 160} r="3" fill="#6366f1" />
        <text x="50" y={180 - ((22000 - minP) / range) * 160 - 8} textAnchor="middle"
          className="text-[8px] font-bold" fill="#6366f1">22,000</text>
      </svg>
    </div>
  )
}

export default function SyntheticData() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Synthetic Indian Market Data Generation
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Historical data for Indian markets is limited -- NSE has only been fully
        electronic since 2000, and high-quality intraday data is scarce before 2015.
        Synthetic data generation allows us to create realistic simulated market data
        that preserves the statistical properties of Indian equities: fat tails,
        volatility clustering, mean reversion, and jump dynamics characteristic
        of emerging markets.
      </p>

      <DefinitionBlock
        title="Synthetic Financial Data"
        label="Definition 8.9"
        definition="Synthetic financial data is artificially generated time series that mimics the statistical properties (marginal distribution, autocorrelation structure, cross-correlations, and stylized facts) of real market data without being a direct copy. It is used for strategy stress testing, model validation, and augmenting limited historical datasets."
        notation={<>A synthetic path <InlineMath math="\tilde{S}_t" /> is calibrated to match moments of the real process: <InlineMath math="\mathbb{E}[\tilde{S}] \approx \mathbb{E}[S]" />, <InlineMath math="\text{Var}(\tilde{S}) \approx \text{Var}(S)" />, and higher moments.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        GBM with Merton Jump Diffusion
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The simplest model calibrated to Indian equities is Geometric Brownian Motion
        with Merton jump diffusion, which captures both continuous volatility and
        sudden jumps (common in Nifty during budget announcements, RBI policy decisions,
        or geopolitical events):
      </p>

      <BlockMath math="\frac{dS_t}{S_t} = (\mu - \lambda \bar{k})\,dt + \sigma\,dW_t + J_t\,dN_t" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\mu" /> is the drift (Nifty long-run CAGR ~12%),{' '}
        <InlineMath math="\sigma" /> is diffusion volatility (~15-18% for Nifty),{' '}
        <InlineMath math="N_t" /> is a Poisson process with intensity{' '}
        <InlineMath math="\lambda" />, and <InlineMath math="J_t \sim \mathcal{N}(\mu_J, \sigma_J^2)" />{' '}
        is the jump size. For simulation:
      </p>

      <BlockMath math="\ln S_{t+\Delta t} = \ln S_t + \left(\mu - \frac{\sigma^2}{2} - \lambda\bar{k}\right)\Delta t + \sigma\sqrt{\Delta t}\,Z + \sum_{i=1}^{N(\Delta t)} J_i" />

      <TheoremBlock
        title="Moment Matching for Indian Equities"
        label="Theorem 8.7"
        statement={<>For a Merton jump-diffusion model calibrated to Nifty 50 daily returns, the excess kurtosis <InlineMath math="\kappa" /> of the return distribution is:</>}
        formula="\kappa = \frac{3\lambda(\sigma_J^4 + 4\mu_J^2\sigma_J^2)}{\left(\sigma^2 + \lambda(\mu_J^2 + \sigma_J^2)\right)^2}"
        proof={<>The fourth central moment of the mixture of normals (continuous + jump component) can be computed via the law of total cumulance. The Nifty 50 exhibits excess kurtosis of approximately 4-6, requiring <InlineMath math="\lambda \approx 5\text{-}10" /> jumps per year with <InlineMath math="\sigma_J \approx 2\text{-}3\%" /> to match the observed tail behavior.</>}
      />

      <InteractiveSyntheticPaths />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Stylized Facts Checklist
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Stylized Fact</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Nifty 50 Value</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Model</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Fat tails (kurtosis)</td>
              <td className="px-4 py-2">~5.2</td>
              <td className="px-4 py-2">Jump diffusion</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Volatility clustering</td>
              <td className="px-4 py-2">GARCH(1,1) sig.</td>
              <td className="px-4 py-2">GARCH / SV</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Leverage effect</td>
              <td className="px-4 py-2">Negative correlation</td>
              <td className="px-4 py-2">EGARCH</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Mean reversion</td>
              <td className="px-4 py-2">HL ~25 days</td>
              <td className="px-4 py-2">OU process</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Cross-correlation</td>
              <td className="px-4 py-2">~0.4 avg pairwise</td>
              <td className="px-4 py-2">Factor model</td>
            </tr>
          </tbody>
        </table>
      </div>

      <PythonCode
        title="synthetic_nifty.py"
        runnable
        code={`import numpy as np

class IndianMarketSimulator:
    """Generate synthetic Indian equity market data.

    Supports GBM, Merton Jump Diffusion, and GARCH models
    calibrated to NSE/BSE characteristics.
    """

    def __init__(self, seed=42):
        self.rng = np.random.RandomState(seed)

    def gbm(self, S0, mu, sigma, n_days, n_paths=1):
        """Geometric Brownian Motion."""
        dt = 1 / 252
        Z = self.rng.standard_normal((n_days, n_paths))
        drift = (mu - 0.5 * sigma**2) * dt
        diffusion = sigma * np.sqrt(dt) * Z
        log_returns = drift + diffusion
        log_prices = np.cumsum(log_returns, axis=0)
        prices = S0 * np.exp(log_prices)
        return np.vstack([np.full(n_paths, S0), prices])

    def merton_jump_diffusion(self, S0, mu, sigma, lam, mu_j, sigma_j,
                                n_days, n_paths=1):
        """Merton Jump Diffusion for Indian equity simulation."""
        dt = 1 / 252
        k_bar = np.exp(mu_j + 0.5 * sigma_j**2) - 1

        prices = np.zeros((n_days + 1, n_paths))
        prices[0] = S0

        for t in range(n_days):
            Z = self.rng.standard_normal(n_paths)
            N = self.rng.poisson(lam * dt, n_paths)
            J = np.zeros(n_paths)
            for i in range(n_paths):
                if N[i] > 0:
                    J[i] = np.sum(self.rng.normal(mu_j, sigma_j, N[i]))

            drift = (mu - 0.5 * sigma**2 - lam * k_bar) * dt
            diffusion = sigma * np.sqrt(dt) * Z
            log_ret = drift + diffusion + J
            prices[t + 1] = prices[t] * np.exp(log_ret)

        return prices

    def garch_returns(self, mu, omega, alpha, beta, n_days):
        """GARCH(1,1) return simulation."""
        returns = np.zeros(n_days)
        sigma2 = np.zeros(n_days)
        sigma2[0] = omega / (1 - alpha - beta)

        for t in range(1, n_days):
            sigma2[t] = omega + alpha * returns[t-1]**2 + beta * sigma2[t-1]
            returns[t] = mu/252 + np.sqrt(sigma2[t]) * self.rng.standard_normal()

        return returns, np.sqrt(sigma2 * 252)

# --- Demo ---
sim = IndianMarketSimulator(seed=42)

nifty_gbm = sim.gbm(S0=22000, mu=0.12, sigma=0.16, n_days=252, n_paths=3)
print("=== Synthetic Nifty 50 Data ===\\n")
print("1. GBM Paths (3 scenarios)")
for i in range(3):
    ret = (nifty_gbm[-1, i] / nifty_gbm[0, i] - 1) * 100
    print(f"   Path {i+1}: {nifty_gbm[0,i]:.0f} -> {nifty_gbm[-1,i]:.0f} ({ret:+.1f}%)")

nifty_mjd = sim.merton_jump_diffusion(
    S0=22000, mu=0.12, sigma=0.15,
    lam=8, mu_j=-0.01, sigma_j=0.025,
    n_days=252, n_paths=5
)
print("\\n2. Merton Jump Diffusion (5 paths)")
daily_rets = np.diff(np.log(nifty_mjd), axis=0)
print(f"   Mean daily return: {np.mean(daily_rets)*252*100:.1f}% annualized")
print(f"   Daily vol:         {np.std(daily_rets)*np.sqrt(252)*100:.1f}% annualized")
print(f"   Kurtosis:          {float(np.mean([np.mean((daily_rets[:,i] - np.mean(daily_rets[:,i]))**4) / np.std(daily_rets[:,i])**4 for i in range(5)])):.2f}")

garch_ret, garch_vol = sim.garch_returns(
    mu=0.12, omega=0.00001, alpha=0.08, beta=0.88, n_days=252
)
print("\\n3. GARCH(1,1) Returns")
print(f"   Annualized return: {np.mean(garch_ret)*252*100:.1f}%")
print(f"   Vol range:         {np.min(garch_vol)*100:.1f}% - {np.max(garch_vol)*100:.1f}%")
print(f"   Vol persistence:   {0.08 + 0.88:.2f} (alpha + beta)")`}
      />

      <ExampleBlock
        title="Calibrating Jump Parameters for Nifty"
        difficulty="intermediate"
        problem="Nifty 50 daily returns from 2019-2024 show excess kurtosis of 5.1 and annualized volatility of 16%. Assuming diffusion vol of 14% and average jump size of -1%, what jump intensity and jump vol are needed?"
        solution={[
          {
            step: 'Set up the kurtosis equation',
            formula: '\\kappa = \\frac{3\\lambda(\\sigma_J^4 + 4\\mu_J^2\\sigma_J^2)}{(\\sigma^2 + \\lambda(\\mu_J^2 + \\sigma_J^2))^2} = 5.1',
          },
          {
            step: 'Use the total variance constraint',
            formula: '\\sigma_{\\text{total}}^2 = \\sigma^2 + \\lambda(\\mu_J^2 + \\sigma_J^2) = 0.16^2 = 0.0256',
            explanation: 'This gives lambda * (0.01^2 + sigma_J^2) = 0.0256 - 0.14^2 = 0.006.',
          },
          {
            step: 'Solve simultaneously',
            formula: '\\lambda \\approx 8, \\quad \\sigma_J \\approx 2.7\\%',
            explanation: 'Approximately 8 jumps per year with 2.7% jump volatility matches the observed excess kurtosis of 5.1.',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Advanced Synthetic Data Methods
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Beyond parametric models, modern machine learning methods can generate
        more realistic synthetic data that captures non-linear dependencies:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Method</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Strengths</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Complexity</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Best For</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">GBM</td>
              <td className="px-4 py-2">Simple, fast</td>
              <td className="px-4 py-2">Low</td>
              <td className="px-4 py-2">Quick sanity checks</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Merton Jump</td>
              <td className="px-4 py-2">Fat tails</td>
              <td className="px-4 py-2">Low</td>
              <td className="px-4 py-2">Tail risk scenarios</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">GARCH</td>
              <td className="px-4 py-2">Vol clustering</td>
              <td className="px-4 py-2">Medium</td>
              <td className="px-4 py-2">Vol-dependent strategies</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Block Bootstrap</td>
              <td className="px-4 py-2">Nonparametric</td>
              <td className="px-4 py-2">Low</td>
              <td className="px-4 py-2">Preserving all dependencies</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">TimeGAN</td>
              <td className="px-4 py-2">Learns from data</td>
              <td className="px-4 py-2">High</td>
              <td className="px-4 py-2">Multi-asset simulation</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Copula-Marginal</td>
              <td className="px-4 py-2">Separates marginals from dependence</td>
              <td className="px-4 py-2">Medium</td>
              <td className="px-4 py-2">Portfolio correlation stress</td>
            </tr>
          </tbody>
        </table>
      </div>

      <NoteBlock title="Multi-Asset Correlation" type="tip">
        <p>
          For portfolio-level testing on Nifty 50 constituents, single-asset simulation
          is insufficient. Use a <strong>factor-copula model</strong> to generate
          correlated returns: first simulate <InlineMath math="k" /> common factors
          (typically 3-5 for Indian equities: market, size, value), then generate
          idiosyncratic returns for each stock. The Nifty 50 average pairwise correlation
          of ~0.4 must be preserved in synthetic data. Gaussian copulas underestimate
          tail dependence -- use Student-t copula with 5-8 degrees of freedom for
          more realistic joint crash scenarios.
        </p>
      </NoteBlock>

      <NoteBlock title="Historical Context" type="historical">
        <ul className="space-y-2">
          <li>
            <strong>NSE History:</strong> NSE began operations in 1994 with electronic
            trading. High-quality daily data is available from 2000 onwards, but
            corporate action adjustments before 2005 may be unreliable.
          </li>
          <li>
            <strong>Regime Shifts:</strong> Major structural changes include: FII liberalization
            (2000-2003), algo trading permission (2008), co-location controversy (2015),
            and SEBI margin rules overhaul (2020-2021). Synthetic data helps bridge gaps
            where real data is sparse or non-representative.
          </li>
        </ul>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Synthetic data is essential for stress-testing Indian market strategies beyond
          the limited 20+ year NSE history. The Merton jump diffusion model with 6-10
          jumps per year, negative mean jump, and GARCH volatility dynamics provides a
          realistic synthetic generator for Nifty-class returns. Always validate synthetic
          data against real market moments and stylized facts before using it for strategy
          development.
        </p>
      </NoteBlock>
    </div>
  )
}
