import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveStationarity() {
  const [phi, setPhi] = useState(0.85)
  const [showNonStationary, setShowNonStationary] = useState(false)
  const [seed, setSeed] = useState(42)

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

  const n = 200
  const rng = seededRandom(seed)
  const innovations = []
  for (let i = 0; i < n; i++) innovations.push(normalRandom(rng))

  // AR(1) stationary process
  const stationary = [0]
  for (let i = 1; i < n; i++) {
    stationary.push(phi * stationary[i - 1] + innovations[i])
  }

  // Random walk (non-stationary)
  const randomWalk = [0]
  for (let i = 1; i < n; i++) {
    randomWalk.push(randomWalk[i - 1] + innovations[i])
  }

  const data = showNonStationary ? randomWalk : stationary
  let minY = Infinity, maxY = -Infinity
  for (const v of data) {
    if (v < minY) minY = v
    if (v > maxY) maxY = v
  }
  minY -= 0.5
  maxY += 0.5

  const chartW = 500, chartH = 180
  const padL = 40, padR = 15, padT = 15, padB = 30
  const plotW = chartW - padL - padR, plotH = chartH - padT - padB

  const toX = (i) => padL + (i / (n - 1)) * plotW
  const toY = (v) => padT + plotH - ((v - minY) / (maxY - minY)) * plotH

  const pathD = data.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i).toFixed(1)},${toY(v).toFixed(1)}`).join(' ')
  const isStationary = Math.abs(phi) < 1 && !showNonStationary
  const unconditionalVar = isStationary ? 1 / (1 - phi * phi) : Infinity

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Stationary vs Non-Stationary Processes
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Compare an AR(1) process (stationary when <InlineMath math="|\phi| < 1" />) with a
        random walk (always non-stationary). Stationarity is key for time-series modeling of
        Indian stock returns.
      </p>

      <div className="mb-4 grid grid-cols-3 gap-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math="\phi" /> = {phi.toFixed(2)}</span>
          <input type="range" min="-0.99" max="0.99" step="0.01" value={phi}
            onChange={e => setPhi(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <input type="checkbox" checked={showNonStationary}
            onChange={e => setShowNonStationary(e.target.checked)}
            className="accent-indigo-500" />
          Show Random Walk instead
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
        {!showNonStationary && (
          <line x1={padL} y1={toY(0)} x2={padL + plotW} y2={toY(0)} stroke="#9ca3af" strokeWidth="0.5" strokeDasharray="3,3" />
        )}
        <path d={pathD} fill="none" stroke={isStationary ? '#6366f1' : '#ef4444'} strokeWidth="1.5" />
        <text x={padL + plotW / 2} y={chartH - 4} textAnchor="middle" className="text-[10px]" fill="#6b7280">Time</text>
      </svg>

      <div className="mt-2 grid grid-cols-3 gap-3 text-center text-xs">
        <div className="rounded bg-gray-50 p-2 dark:bg-gray-800">
          <div className="text-gray-500">Process</div>
          <div className="font-bold text-gray-700 dark:text-gray-300">
            {showNonStationary ? 'Random Walk' : `AR(1), φ=${phi.toFixed(2)}`}
          </div>
        </div>
        <div className={`rounded p-2 ${isStationary ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'}`}>
          <div className={isStationary ? 'text-green-600' : 'text-red-600'}>Stationary?</div>
          <div className={`font-bold ${isStationary ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
            {isStationary ? 'Yes' : 'No'}
          </div>
        </div>
        <div className="rounded bg-gray-50 p-2 dark:bg-gray-800">
          <div className="text-gray-500">Unconditional Var</div>
          <div className="font-bold text-gray-700 dark:text-gray-300">
            {isStationary ? unconditionalVar.toFixed(2) : '∞'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function StationarityErgodicity() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Stationarity and Ergodicity
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Stationarity is the most fundamental assumption in time-series analysis. Most
        statistical methods -- regression, ARMA, correlation analysis -- require the
        underlying process to be stationary. Understanding which financial series are
        stationary (returns) and which are not (prices, market cap) is essential for
        correctly modeling Indian market data.
      </p>

      <DefinitionBlock
        title="Strict Stationarity"
        label="Definition 1.1"
        definition={<>
          A stochastic process <InlineMath math="\{X_t\}" /> is <strong>strictly stationary</strong>{' '}
          if the joint distribution of <InlineMath math="(X_{t_1}, X_{t_2}, \ldots, X_{t_k})" />{' '}
          is identical to that of{' '}
          <InlineMath math="(X_{t_1+\tau}, X_{t_2+\tau}, \ldots, X_{t_k+\tau})" /> for all{' '}
          <InlineMath math="\tau" /> and all <InlineMath math="k" />. The statistical properties
          are completely invariant to time shifts.
        </>}
      />

      <DefinitionBlock
        title="Weak (Covariance) Stationarity"
        label="Definition 1.2"
        definition={<>
          A process <InlineMath math="\{X_t\}" /> is <strong>weakly stationary</strong>{' '}
          (second-order stationary) if:
          <ol className="mt-2 ml-4 list-decimal space-y-1">
            <li><InlineMath math="E[X_t] = \mu" /> is constant (does not depend on <InlineMath math="t" />)</li>
            <li><InlineMath math="\text{Var}(X_t) = \sigma^2 < \infty" /> is constant and finite</li>
            <li><InlineMath math="\text{Cov}(X_t, X_{t+h}) = \gamma(h)" /> depends only on the lag <InlineMath math="h" />, not on <InlineMath math="t" /></li>
          </ol>
        </>}
        notation={<>
          Autocovariance function: <InlineMath math="\gamma(h) = \text{Cov}(X_t, X_{t+h})" />.
          ACF: <InlineMath math="\rho(h) = \gamma(h) / \gamma(0)" />.
        </>}
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        In the Indian market context: Nifty 50 prices are non-stationary (they trend upward
        over time), but Nifty 50 log returns are approximately stationary. Similarly, the
        spread between TCS and Infosys prices may be stationary (cointegrated), even though
        individual prices are not.
      </p>

      {/* --- Unit Root Tests --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Testing for Stationarity: ADF and KPSS Tests
      </h3>

      <TheoremBlock
        title="Augmented Dickey-Fuller (ADF) Test"
        label="Theorem 1.1"
        statement={<>
          The ADF test examines the regression:
          <BlockMath math="\Delta y_t = \alpha + \beta t + \gamma y_{t-1} + \sum_{i=1}^{p} \delta_i \Delta y_{t-i} + \epsilon_t" />
          <InlineMath math="H_0: \gamma = 0" /> (unit root, non-stationary) vs.{' '}
          <InlineMath math="H_1: \gamma < 0" /> (stationary). The test statistic follows a
          non-standard Dickey-Fuller distribution. <strong>Rejecting</strong>{' '}
          <InlineMath math="H_0" /> indicates stationarity.
        </>}
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The KPSS test reverses the hypotheses: <InlineMath math="H_0" /> is stationarity
        and <InlineMath math="H_1" /> is non-stationarity. Using both tests together gives
        more robust conclusions:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">ADF Result</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">KPSS Result</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Conclusion</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Reject (stationary)</td>
              <td className="px-4 py-2">Fail to reject (stationary)</td>
              <td className="px-4 py-2 font-medium text-green-600">Stationary (consistent)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Fail to reject (unit root)</td>
              <td className="px-4 py-2">Reject (non-stationary)</td>
              <td className="px-4 py-2 font-medium text-red-600">Non-stationary (consistent)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Reject</td>
              <td className="px-4 py-2">Reject</td>
              <td className="px-4 py-2 font-medium text-yellow-600">Trend-stationary or structural break</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Fail to reject</td>
              <td className="px-4 py-2">Fail to reject</td>
              <td className="px-4 py-2 font-medium text-yellow-600">Inconclusive -- need more data</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- Interactive --- */}
      <InteractiveStationarity />

      {/* --- Ergodicity --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Ergodicity: When Time Averages Equal Ensemble Averages
      </h3>

      <DefinitionBlock
        title="Ergodicity"
        label="Definition 1.3"
        definition={<>
          A stationary process is <strong>ergodic</strong> if time averages converge to
          ensemble (population) averages:
          <BlockMath math="\frac{1}{T} \sum_{t=1}^{T} X_t \xrightarrow{a.s.} E[X_t] = \mu \quad \text{as } T \to \infty" />
          Ergodicity allows us to estimate population moments from a single time series of
          returns -- this is why backtesting works!
        </>}
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Without ergodicity, we could not estimate Nifty's expected return or volatility from
        historical data, because the time average would not converge to the true value. A
        sufficient condition for ergodicity is that the autocovariance function decays to zero:
      </p>

      <BlockMath math="\sum_{h=0}^{\infty} |\gamma(h)| < \infty \implies \text{ergodic for the mean}" />

      <NoteBlock title="When Ergodicity Breaks Down" type="warning">
        <p>
          Ergodicity can fail in Indian markets when: (1) structural breaks occur (e.g.,
          liberalization in 1991, demonetization in 2016), meaning the data-generating process
          changes; (2) the process has long memory (fractional integration), causing extremely
          slow convergence; (3) regime-switching models where the economy alternates between
          distinct states with different return distributions. In these cases, simple time
          averages are poor estimators and regime-aware methods are needed.
        </p>
      </NoteBlock>

      {/* --- Python Code --- */}
      <PythonCode
        title="stationarity_tests.py"
        runnable
        code={`import numpy as np
from scipy import stats

np.random.seed(42)

# --- Generate Financial Time Series ---
n = 1000  # ~4 years of daily data

# 1. Nifty log returns (approximately stationary)
nifty_returns = np.random.normal(0.0005, 0.012, n)

# 2. Nifty prices (non-stationary -- integrated of order 1)
nifty_prices = 20000 * np.exp(np.cumsum(nifty_returns))

# 3. Mean-reverting spread (stationary -- pairs trade TCS-Infosys)
phi = 0.95
spread = np.zeros(n)
for t in range(1, n):
    spread[t] = phi * spread[t-1] + np.random.normal(0, 5)

# --- Simple ADF Test Implementation ---
def adf_test_simple(y, max_lags=5):
    """Simplified ADF test (for demonstration)."""
    dy = np.diff(y)
    y_lag = y[:-1]
    n_obs = len(dy)

    # Regression: dy_t = alpha + gamma * y_{t-1} + eps
    X = np.column_stack([np.ones(n_obs), y_lag])
    beta = np.linalg.lstsq(X, dy, rcond=None)[0]
    gamma = beta[1]

    residuals = dy - X @ beta
    se_gamma = np.sqrt(np.var(residuals) * np.linalg.inv(X.T @ X)[1, 1])
    t_stat = gamma / se_gamma

    # Critical values (approximation for n=1000)
    cv_1 = -3.44
    cv_5 = -2.87
    cv_10 = -2.57

    return t_stat, cv_1, cv_5, cv_10

# --- KPSS Test (simplified) ---
def kpss_test_simple(y):
    """Simplified KPSS test."""
    n_obs = len(y)
    y_demean = y - np.mean(y)
    S = np.cumsum(y_demean)
    eta = np.sum(S**2) / (n_obs**2 * np.var(y, ddof=1))
    # Critical values: 10%=0.347, 5%=0.463, 1%=0.739
    return eta

print("=== Stationarity Tests on Indian Market Data ===\\n")

series_data = [
    ("Nifty Returns", nifty_returns),
    ("Nifty Prices", nifty_prices),
    ("TCS-Infosys Spread", spread),
]

for name, series in series_data:
    adf_stat, cv1, cv5, cv10 = adf_test_simple(series)
    kpss_stat = kpss_test_simple(series)

    adf_conclusion = "Stationary" if adf_stat < cv5 else "Non-stationary"
    kpss_conclusion = "Stationary" if kpss_stat < 0.463 else "Non-stationary"

    print(f"--- {name} ---")
    print(f"  Sample mean: {np.mean(series):.4f}, Std: {np.std(series):.4f}")
    print(f"  ADF t-stat: {adf_stat:.4f} (5% CV: {cv5})")
    print(f"  ADF Decision: {adf_conclusion}")
    print(f"  KPSS stat: {kpss_stat:.4f} (5% CV: 0.463)")
    print(f"  KPSS Decision: {kpss_conclusion}")
    print()

# --- Autocorrelation Analysis ---
print("=== Autocorrelation Function ===")
for name, series in series_data:
    acf_vals = []
    mean_s = np.mean(series)
    var_s = np.var(series)
    for lag in [1, 5, 10, 20]:
        if lag < len(series):
            acf = np.mean((series[lag:] - mean_s) * (series[:-lag] - mean_s)) / var_s
            acf_vals.append(f"ρ({lag})={acf:.3f}")
    print(f"  {name}: {', '.join(acf_vals)}")

# --- Ergodicity Check ---
print("\\n=== Ergodicity: Running Mean Convergence ===")
true_mean = 0.0005  # True daily mean for returns
windows = [50, 100, 252, 500, 1000]
print("Nifty returns - Running mean vs true mean (0.05%):")
for w in windows:
    if w <= n:
        running_mean = np.mean(nifty_returns[:w])
        err = abs(running_mean - true_mean)
        print(f"  T={w:4d}: mean={running_mean:.6f}, error={err:.6f}")
print("Convergence confirms ergodicity for returns.")`}
      />

      {/* --- Worked Example --- */}
      <ExampleBlock
        title="Is the Nifty-Bank Nifty Ratio Stationary?"
        difficulty="intermediate"
        problem="The ratio of Nifty 50 to Bank Nifty has been observed to fluctuate around 0.5 over the past 5 years. The ADF test gives t-stat = -3.12 (5% CV = -2.87) and the KPSS test gives stat = 0.32 (5% CV = 0.463). Is the ratio stationary?"
        solution={[
          {
            step: 'Interpret the ADF test',
            formula: 't_{\\text{ADF}} = -3.12 < -2.87 = \\text{CV}_{5\\%}',
            explanation: 'We reject the null of non-stationarity at 5%. The ADF test suggests the ratio is stationary.',
          },
          {
            step: 'Interpret the KPSS test',
            formula: '\\eta_{\\text{KPSS}} = 0.32 < 0.463 = \\text{CV}_{5\\%}',
            explanation: 'We fail to reject the null of stationarity. The KPSS test also supports stationarity.',
          },
          {
            step: 'Conclusion',
            formula: '\\text{Both tests agree: the ratio is stationary}',
            explanation: 'This confirms that the Nifty/Bank Nifty ratio mean-reverts, making it a candidate for a mean-reversion trading strategy. When the ratio deviates significantly from 0.5, it tends to return.',
          },
        ]}
      />

      {/* --- Key Takeaway --- */}
      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Always check stationarity before applying time-series methods to Indian market data.
          Prices are non-stationary (I(1)) while returns are typically stationary (I(0)). Use
          both ADF and KPSS tests for robust conclusions. Ergodicity ensures that historical
          backtests on NSE data are meaningful -- but beware of structural breaks (2008 crisis,
          2020 COVID) that can violate the stationarity assumption. When in doubt, use
          rolling-window analysis to detect non-stationarity.
        </p>
      </NoteBlock>
    </div>
  )
}
