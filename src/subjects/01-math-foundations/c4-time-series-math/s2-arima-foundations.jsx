import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveARMA() {
  const [phi1, setPhi1] = useState(0.7)
  const [theta1, setTheta1] = useState(-0.3)
  const [modelType, setModelType] = useState('arma')
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
  const eps = []
  for (let i = 0; i < n; i++) eps.push(normalRandom(rng) * 0.01)

  const series = [0, 0]
  for (let t = 2; t < n; t++) {
    let val = eps[t]
    if (modelType === 'ar' || modelType === 'arma') val += phi1 * series[t - 1]
    if (modelType === 'ma' || modelType === 'arma') val += theta1 * eps[t - 1]
    series.push(val)
  }

  // Compute sample ACF
  const mean = series.reduce((s, v) => s + v, 0) / n
  const variance = series.reduce((s, v) => s + (v - mean) ** 2, 0) / n
  const acf = []
  for (let h = 0; h <= 15; h++) {
    let sum = 0
    for (let t = h; t < n; t++) sum += (series[t] - mean) * (series[t - h] - mean)
    acf.push(sum / (n * variance))
  }

  let minY = Infinity, maxY = -Infinity
  for (const v of series) {
    if (v < minY) minY = v
    if (v > maxY) maxY = v
  }
  minY -= 0.005; maxY += 0.005

  const chartW = 500, chartH = 160
  const padL = 40, padR = 15, padT = 15, padB = 25
  const plotW = chartW - padL - padR, plotH = chartH - padT - padB

  const toX = (i) => padL + (i / (n - 1)) * plotW
  const toY = (v) => padT + plotH - ((v - minY) / (maxY - minY)) * plotH

  const pathD = series.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i).toFixed(1)},${toY(v).toFixed(1)}`).join(' ')

  // ACF bar chart
  const acfW = 500, acfH = 120
  const acfPadL = 40, acfPadB = 25, acfPadT = 10
  const acfPlotW = acfW - acfPadL - padR
  const acfPlotH = acfH - acfPadT - acfPadB
  const barGap = acfPlotW / 16
  const barWidth = barGap * 0.6
  const ciLine = 1.96 / Math.sqrt(n)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: AR/MA/ARMA Process and ACF
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Explore how AR and MA parameters shape the time series and its autocorrelation function.
        These processes model serial dependencies in Nifty 50 returns.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Model</span>
          <select value={modelType} onChange={e => setModelType(e.target.value)}
            className="rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
            <option value="ar">AR(1)</option>
            <option value="ma">MA(1)</option>
            <option value="arma">ARMA(1,1)</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math="\phi_1" /> = {phi1.toFixed(2)}</span>
          <input type="range" min="-0.95" max="0.95" step="0.05" value={phi1}
            onChange={e => setPhi1(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500"
            disabled={modelType === 'ma'} />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math="\theta_1" /> = {theta1.toFixed(2)}</span>
          <input type="range" min="-0.95" max="0.95" step="0.05" value={theta1}
            onChange={e => setTheta1(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500"
            disabled={modelType === 'ar'} />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Seed: {seed}</span>
          <input type="range" min="1" max="100" step="1" value={seed}
            onChange={e => setSeed(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      {/* Time series plot */}
      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full max-w-xl mx-auto block">
        <line x1={padL} y1={padT + plotH} x2={padL + plotW} y2={padT + plotH} stroke="#9ca3af" strokeWidth="1" />
        <path d={pathD} fill="none" stroke="#6366f1" strokeWidth="1.5" />
        <text x={padL + plotW / 2} y={chartH - 4} textAnchor="middle" className="text-[9px]" fill="#6b7280">Time</text>
      </svg>

      {/* ACF plot */}
      <svg viewBox={`0 0 ${acfW} ${acfH}`} className="w-full max-w-xl mx-auto block mt-2">
        <line x1={acfPadL} y1={acfPadT + acfPlotH / 2} x2={acfPadL + acfPlotW} y2={acfPadT + acfPlotH / 2} stroke="#9ca3af" strokeWidth="1" />
        {/* CI lines */}
        <line x1={acfPadL} y1={acfPadT + acfPlotH / 2 - ciLine * acfPlotH / 2} x2={acfPadL + acfPlotW}
          y2={acfPadT + acfPlotH / 2 - ciLine * acfPlotH / 2} stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="3,3" />
        <line x1={acfPadL} y1={acfPadT + acfPlotH / 2 + ciLine * acfPlotH / 2} x2={acfPadL + acfPlotW}
          y2={acfPadT + acfPlotH / 2 + ciLine * acfPlotH / 2} stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="3,3" />
        {acf.slice(1).map((v, i) => {
          const x = acfPadL + (i + 1) * barGap
          const barH = v * acfPlotH / 2
          return (
            <g key={i}>
              <rect x={x} y={barH >= 0 ? acfPadT + acfPlotH / 2 - barH : acfPadT + acfPlotH / 2}
                width={barWidth} height={Math.abs(barH)} fill={Math.abs(v) > ciLine ? '#6366f1' : '#c7d2fe'} />
              <text x={x + barWidth / 2} y={acfH - 5} textAnchor="middle" className="text-[7px]" fill="#6b7280">{i + 1}</text>
            </g>
          )
        })}
        <text x={acfPadL + acfPlotW / 2} y={acfH - 15} textAnchor="middle" className="text-[9px]" fill="#6b7280">Lag (ACF)</text>
      </svg>
    </div>
  )
}

export default function ARIMAFoundations() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        ARIMA Models: AR, MA, ARMA, and Box-Jenkins
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        ARIMA models are the classical workhorses of time-series forecasting. While their
        raw forecasting power for stock returns is limited (markets are nearly efficient),
        they are essential for modeling volatility, spreads, and economic indicators in the
        Indian financial system.
      </p>

      {/* --- AR Model --- */}
      <DefinitionBlock
        title="Autoregressive Model AR(p)"
        label="Definition 2.1"
        definition={<>
          An AR(p) model expresses the current value as a linear combination of past values:
          <BlockMath math="X_t = c + \phi_1 X_{t-1} + \phi_2 X_{t-2} + \cdots + \phi_p X_{t-p} + \epsilon_t" />
          where <InlineMath math="\epsilon_t \sim \text{WN}(0, \sigma^2)" /> is white noise.
          The model is stationary if all roots of the characteristic polynomial{' '}
          <InlineMath math="1 - \phi_1 z - \phi_2 z^2 - \cdots - \phi_p z^p = 0" /> lie
          outside the unit circle.
        </>}
        notation={<>
          Using the backshift operator <InlineMath math="B" />: <InlineMath math="\phi(B) X_t = c + \epsilon_t" />{' '}
          where <InlineMath math="\phi(B) = 1 - \phi_1 B - \cdots - \phi_p B^p" />.
        </>}
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For AR(1) with <InlineMath math="X_t = \phi X_{t-1} + \epsilon_t" /> and{' '}
        <InlineMath math="|\phi| < 1" />:
      </p>

      <BlockMath math={`\\begin{aligned}
E[X_t] &= 0, \\quad \\text{Var}(X_t) = \\frac{\\sigma^2}{1 - \\phi^2} \\\\
\\rho(h) &= \\phi^h \\quad \\text{(exponential decay)}
\\end{aligned}`} />

      {/* --- MA Model --- */}
      <DefinitionBlock
        title="Moving Average Model MA(q)"
        label="Definition 2.2"
        definition={<>
          An MA(q) model expresses the current value as a linear combination of past shocks:
          <BlockMath math="X_t = \mu + \epsilon_t + \theta_1 \epsilon_{t-1} + \theta_2 \epsilon_{t-2} + \cdots + \theta_q \epsilon_{t-q}" />
          MA models are always stationary (for finite <InlineMath math="q" />) and have
          ACF that cuts off after lag <InlineMath math="q" />.
        </>}
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The key identification property: AR models have slowly decaying ACF and sharply
        cutting PACF, while MA models have sharply cutting ACF and slowly decaying PACF.
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Model</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">ACF</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">PACF</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">AR(p)</td>
              <td className="px-4 py-2">Tails off (exponential/sinusoidal decay)</td>
              <td className="px-4 py-2">Cuts off after lag p</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">MA(q)</td>
              <td className="px-4 py-2">Cuts off after lag q</td>
              <td className="px-4 py-2">Tails off</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-medium">ARMA(p,q)</td>
              <td className="px-4 py-2">Tails off</td>
              <td className="px-4 py-2">Tails off</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- ARIMA --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        ARIMA(p, d, q): Integrating Non-Stationarity
      </h3>

      <TheoremBlock
        title="ARIMA Model"
        label="Theorem 2.1"
        statement={<>
          An ARIMA(p, d, q) model applies ARMA(p, q) to the d-th difference of the series:
          <BlockMath math="\phi(B)(1 - B)^d X_t = c + \theta(B) \epsilon_t" />
          where <InlineMath math="d" /> is the order of integration (number of differences
          needed for stationarity). For most financial series: prices are I(1) (need{' '}
          <InlineMath math="d=1" />), so ARIMA(p,1,q) on prices is equivalent to ARMA(p,q)
          on returns.
        </>}
      />

      {/* --- Interactive --- */}
      <InteractiveARMA />

      {/* --- Box-Jenkins Methodology --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Box-Jenkins Methodology
      </h3>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The Box-Jenkins approach is a systematic procedure for fitting ARIMA models:
      </p>

      <ol className="ml-6 list-decimal space-y-2 text-sm text-gray-700 dark:text-gray-300">
        <li><strong>Identification:</strong> Determine <InlineMath math="d" /> using ADF/KPSS tests. Choose <InlineMath math="p" /> and <InlineMath math="q" /> from ACF/PACF patterns.</li>
        <li><strong>Estimation:</strong> Fit the model using Maximum Likelihood or Conditional Least Squares.</li>
        <li><strong>Diagnostic Checking:</strong> Verify residuals are white noise (Ljung-Box test), check for remaining autocorrelation.</li>
        <li><strong>Forecasting:</strong> Use the fitted model for out-of-sample prediction.</li>
      </ol>

      <NoteBlock title="Information Criteria for Model Selection" type="info">
        <p>
          Rather than relying solely on ACF/PACF patterns, modern practice uses information
          criteria to select the best (p, d, q):
        </p>
        <BlockMath math="\text{AIC} = -2\ln(\hat{L}) + 2k, \quad \text{BIC} = -2\ln(\hat{L}) + k\ln(n)" />
        <p>
          where <InlineMath math="k = p + q + 1" /> (number of parameters) and{' '}
          <InlineMath math="n" /> is the sample size. BIC penalizes complexity more heavily
          and tends to select simpler models. For Nifty daily returns, typically ARMA(0,0)
          (white noise) wins, confirming near-efficiency.
        </p>
      </NoteBlock>

      {/* --- Python Code --- */}
      <PythonCode
        title="arima_nifty.py"
        runnable
        code={`import numpy as np
from scipy import stats
from scipy.optimize import minimize

np.random.seed(42)

# Simulate Nifty 50 daily returns with slight AR(1) structure
n = 1000
phi_true = 0.05  # Very small positive autocorrelation
sigma = 0.012
returns = np.zeros(n)
for t in range(1, n):
    returns[t] = phi_true * returns[t-1] + np.random.normal(0, sigma)

# --- Fit AR(1) Model ---
def fit_ar1(y):
    """Fit AR(1) by OLS."""
    X = y[:-1].reshape(-1, 1)
    X = np.column_stack([np.ones(len(X)), X])
    Y = y[1:]
    beta = np.linalg.lstsq(X, Y, rcond=None)[0]
    residuals = Y - X @ beta
    return beta[1], beta[0], np.std(residuals)

phi_hat, c_hat, sigma_hat = fit_ar1(returns)
print("=== AR(1) Fit on Nifty Daily Returns ===")
print(f"True phi:      {phi_true}")
print(f"Estimated phi: {phi_hat:.4f}")
print(f"Intercept:     {c_hat:.6f}")
print(f"Residual std:  {sigma_hat:.6f}")
print()

# --- Compute ACF and PACF ---
def acf(x, max_lag=20):
    """Compute autocorrelation function."""
    n = len(x)
    x_demean = x - np.mean(x)
    var = np.var(x)
    result = []
    for h in range(max_lag + 1):
        result.append(np.mean(x_demean[h:] * x_demean[:n-h]) / var if h > 0 else 1.0)
    return np.array(result)

acf_vals = acf(returns, 10)
print("=== ACF of Nifty Returns ===")
ci = 1.96 / np.sqrt(n)
for h in range(1, 11):
    sig = '*' if abs(acf_vals[h]) > ci else ' '
    bar = '█' * int(abs(acf_vals[h]) * 100)
    sign = '+' if acf_vals[h] >= 0 else '-'
    print(f"  lag {h:2d}: {acf_vals[h]:+.4f} {sig} {sign}{bar}")
print(f"  95% CI: +/-{ci:.4f}")
print()

# --- Ljung-Box Test ---
def ljung_box(x, lags=10):
    """Ljung-Box test for white noise."""
    n = len(x)
    acf_vals = acf(x, lags)
    Q = n * (n + 2) * sum(acf_vals[h]**2 / (n - h) for h in range(1, lags + 1))
    p_value = 1 - stats.chi2.cdf(Q, lags)
    return Q, p_value

Q, p_val = ljung_box(returns, 10)
print(f"=== Ljung-Box Test (10 lags) ===")
print(f"Q-stat:  {Q:.4f}")
print(f"p-value: {p_val:.4f}")
print(f"Decision: {'White noise (no autocorrelation)' if p_val > 0.05 else 'Significant autocorrelation'}")
print()

# --- Model Comparison using AIC ---
print("=== Model Selection (AIC) ===")
# AR(0) = white noise
n_eff = n - 1
sse_ar0 = np.sum(returns**2)
aic_ar0 = n_eff * np.log(sse_ar0 / n_eff) + 2 * 1
print(f"AR(0) [white noise]: AIC = {aic_ar0:.2f}")

# AR(1)
residuals_ar1 = returns[1:] - phi_hat * returns[:-1] - c_hat
sse_ar1 = np.sum(residuals_ar1**2)
aic_ar1 = (n_eff - 1) * np.log(sse_ar1 / (n_eff - 1)) + 2 * 3
print(f"AR(1):               AIC = {aic_ar1:.2f}")

# AR(2)
X2 = np.column_stack([np.ones(n-2), returns[1:-1], returns[:-2]])
Y2 = returns[2:]
beta2 = np.linalg.lstsq(X2, Y2, rcond=None)[0]
sse_ar2 = np.sum((Y2 - X2 @ beta2)**2)
aic_ar2 = (n-2) * np.log(sse_ar2 / (n-2)) + 2 * 4
print(f"AR(2):               AIC = {aic_ar2:.2f}")

best = min([('AR(0)', aic_ar0), ('AR(1)', aic_ar1), ('AR(2)', aic_ar2)], key=lambda x: x[1])
print(f"\\nBest model: {best[0]} (lowest AIC)")
print("For Nifty daily returns, white noise usually wins -- markets are nearly efficient!")`}
      />

      {/* --- Worked Example --- */}
      <ExampleBlock
        title="Identifying an ARMA Model from ACF/PACF"
        difficulty="intermediate"
        problem="The ACF of a Nifty spread series shows significant values at lags 1 and 2, then cuts off. The PACF shows exponential decay. What ARMA model should you fit?"
        solution={[
          {
            step: 'Identify the ACF pattern',
            formula: '\\text{ACF cuts off after lag 2} \\implies \\text{MA component with } q = 2',
          },
          {
            step: 'Identify the PACF pattern',
            formula: '\\text{PACF tails off (exponential decay)} \\implies \\text{consistent with MA model}',
          },
          {
            step: 'Conclusion',
            formula: '\\text{Fit an MA(2) model: } X_t = \\mu + \\epsilon_t + \\theta_1 \\epsilon_{t-1} + \\theta_2 \\epsilon_{t-2}',
            explanation: 'ACF cutting off after lag q is the signature of an MA(q) model. Also try ARMA(1,1) and compare AIC/BIC values to confirm.',
          },
        ]}
      />

      {/* --- Key Takeaway --- */}
      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          ARIMA models are foundational for understanding serial dependence in financial time
          series. For Nifty daily returns, the autocorrelation is typically negligible (near
          white noise), reflecting market efficiency. However, ARIMA is valuable for: (1)
          modeling mean-reverting spreads in pairs trading, (2) forecasting economic indicators
          (inflation, GDP) that affect the market, and (3) as a building block for GARCH models
          that capture time-varying volatility -- which is where the real action is in Indian
          market modeling.
        </p>
      </NoteBlock>
    </div>
  )
}
