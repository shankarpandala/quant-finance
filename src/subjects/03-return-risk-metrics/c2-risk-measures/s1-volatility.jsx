import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveVolatility() {
  const [window, setWindow] = useState(20)
  const [ewmaLambda, setEwmaLambda] = useState(0.94)
  const [annFactor, setAnnFactor] = useState(252)

  const sampleVol = 1.2
  const ewmaVol = sampleVol * (1 + (1 - ewmaLambda) * 0.3)
  const annualizedVol = sampleVol * Math.sqrt(annFactor)
  const halfLife = Math.log(2) / Math.log(1 / ewmaLambda)
  const effectiveObs = 1 / (1 - ewmaLambda)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Volatility Estimation Parameters
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Explore how window length, EWMA decay factor, and annualization affect volatility
        estimates for NSE stocks.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Rolling Window: {window} days</span>
          <input type="range" min="5" max="120" step="1" value={window}
            onChange={e => setWindow(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>EWMA Lambda: {ewmaLambda.toFixed(3)}</span>
          <input type="range" min="0.85" max="0.99" step="0.005" value={ewmaLambda}
            onChange={e => setEwmaLambda(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Trading Days/Year: {annFactor}</span>
          <input type="range" min="245" max="260" step="1" value={annFactor}
            onChange={e => setAnnFactor(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">Daily Vol</p>
          <p className="text-lg font-bold text-blue-800 dark:text-blue-200">{sampleVol.toFixed(2)}%</p>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
          <p className="text-xs font-semibold text-purple-700 dark:text-purple-300">Annualized</p>
          <p className="text-lg font-bold text-purple-800 dark:text-purple-200">{annualizedVol.toFixed(1)}%</p>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">EWMA Half-Life</p>
          <p className="text-lg font-bold text-amber-800 dark:text-amber-200">{halfLife.toFixed(1)} days</p>
        </div>
        <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/30">
          <p className="text-xs font-semibold text-green-700 dark:text-green-300">Effective Obs</p>
          <p className="text-lg font-bold text-green-800 dark:text-green-200">{effectiveObs.toFixed(0)}</p>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
        Rolling window uses {window} equal-weighted observations |
        EWMA effective window: <InlineMath math={`\\frac{1}{1-\\lambda} = ${effectiveObs.toFixed(0)}`} /> days
      </p>
    </div>
  )
}

export default function Volatility() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Volatility Estimation
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Volatility is the cornerstone of quantitative risk management. Whether sizing positions
        on Zerodha, pricing Bank Nifty options, or computing VaR for a SEBI-regulated portfolio,
        accurate volatility estimation is essential. We explore historical, EWMA, and realized
        volatility approaches calibrated to Indian market data.
      </p>

      <DefinitionBlock
        title="Historical (Realized) Volatility"
        label="Definition 2.1"
        definition="Historical volatility is the standard deviation of log returns over a lookback window. It is the simplest volatility estimator, treating all observations in the window equally. For NSE stocks, a 20-day window captures approximately one trading month."
        notation="\sigma_{\text{hist}} = \sqrt{\frac{1}{N-1}\sum_{i=1}^{N}(r_i - \bar{r})^2}"
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        To annualize daily volatility, we scale by <InlineMath math="\sqrt{252}" /> assuming
        independent daily returns:
      </p>

      <BlockMath math="\sigma_{\text{annual}} = \sigma_{\text{daily}} \times \sqrt{252}" />

      <NoteBlock title="Why Square Root of Time?" type="info">
        <p>
          If daily returns <InlineMath math="r_t" /> are i.i.d. with variance{' '}
          <InlineMath math="\sigma^2_d" />, then the variance of the <InlineMath math="T" />-day
          return is <InlineMath math="T \sigma^2_d" />, so the standard deviation scales as{' '}
          <InlineMath math="\sigma_T = \sigma_d \sqrt{T}" />. This breaks down when returns
          are autocorrelated (common in Indian mid-cap stocks) or when volatility itself is
          time-varying (volatility clustering).
        </p>
      </NoteBlock>

      <DefinitionBlock
        title="EWMA Volatility (RiskMetrics)"
        label="Definition 2.2"
        definition="Exponentially Weighted Moving Average volatility assigns geometrically declining weights to past observations. Recent returns receive more weight, making EWMA more responsive to regime changes. The RiskMetrics standard uses lambda = 0.94 for daily data."
        notation="\sigma^2_t = \lambda \, \sigma^2_{t-1} + (1 - \lambda) \, r^2_{t-1}, \quad \lambda \in (0, 1)"
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The EWMA has a single parameter <InlineMath math="\lambda" /> that controls the decay
        rate. The half-life (number of days for weight to halve) is:
      </p>

      <BlockMath math="h = \frac{\ln 2}{\ln(1/\lambda)} \approx \frac{0.693}{1 - \lambda} \quad \text{for } \lambda \text{ near 1}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For <InlineMath math="\lambda = 0.94" />, the half-life is approximately 11 days. For
        Indian markets, where volatility regimes shift around RBI policy announcements, budget
        day, and quarterly results season, <InlineMath math="\lambda = 0.94" /> provides a
        good balance between responsiveness and stability.
      </p>

      <TheoremBlock
        title="Parkinson Range-Based Volatility"
        label="Theorem 2.1"
        statement="The Parkinson (1980) estimator uses the high-low range to estimate volatility, which is theoretically 5.2 times more efficient than the close-to-close estimator under the assumption of continuous geometric Brownian motion."
        formula="\sigma^2_{\text{Park}} = \frac{1}{4N \ln 2} \sum_{i=1}^{N} \left[\ln\!\left(\frac{H_i}{L_i}\right)\right]^2"
        proof="For a geometric Brownian motion, the expected value of [\ln(H/L)]^2 over one period is 4 \ln 2 \cdot \sigma^2. The estimator follows by dividing the sum of squared log-ranges by 4N \ln 2. The efficiency gain comes from using intra-day price extremes rather than just closing prices. On NSE, where OHLC data is readily available, Parkinson is particularly useful for illiquid stocks where closing prices may be stale."
      />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Estimator</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Data Required</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Efficiency</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Indian Market Notes</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Close-to-Close</td>
              <td className="px-4 py-2">Close prices</td>
              <td className="px-4 py-2">1.0x (baseline)</td>
              <td className="px-4 py-2">Standard approach</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Parkinson</td>
              <td className="px-4 py-2">High, Low</td>
              <td className="px-4 py-2">5.2x</td>
              <td className="px-4 py-2">Good for illiquid BSE stocks</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Garman-Klass</td>
              <td className="px-4 py-2">OHLC</td>
              <td className="px-4 py-2">7.4x</td>
              <td className="px-4 py-2">Best for NSE blue chips</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">EWMA</td>
              <td className="px-4 py-2">Close prices</td>
              <td className="px-4 py-2">Adaptive</td>
              <td className="px-4 py-2">Fast regime detection</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Realized Vol</td>
              <td className="px-4 py-2">Tick data</td>
              <td className="px-4 py-2">Highest</td>
              <td className="px-4 py-2">Requires NSE tick feed</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveVolatility />

      <PythonCode
        title="volatility_estimators.py"
        runnable
        code={`import numpy as np
import pandas as pd

# Simulated Nifty 50 OHLC data (1 year)
np.random.seed(42)
n_days = 252
returns = np.random.normal(0.0004, 0.012, n_days)

# Generate OHLC prices
close = 18000 * np.exp(np.cumsum(returns))
close = np.insert(close, 0, 18000)
high = close[1:] * np.exp(np.abs(np.random.normal(0, 0.008, n_days)))
low = close[1:] * np.exp(-np.abs(np.random.normal(0, 0.008, n_days)))
open_p = close[:-1] * (1 + np.random.normal(0, 0.003, n_days))

df = pd.DataFrame({
    'Open': open_p, 'High': high, 'Low': low, 'Close': close[1:]
})
df['Log_Return'] = np.log(df['Close'] / df['Close'].shift(1))
df.dropna(inplace=True)

# --- 1. Close-to-Close Historical Volatility ---
window = 20
df['Vol_CC'] = df['Log_Return'].rolling(window).std() * np.sqrt(252)

# --- 2. EWMA Volatility (RiskMetrics) ---
lam = 0.94
ewma_var = np.zeros(len(df))
ewma_var[0] = df['Log_Return'].iloc[0]**2
for i in range(1, len(df)):
    ewma_var[i] = lam * ewma_var[i-1] + (1 - lam) * df['Log_Return'].iloc[i]**2
df['Vol_EWMA'] = np.sqrt(ewma_var) * np.sqrt(252)

# --- 3. Parkinson Estimator ---
log_hl = np.log(df['High'] / df['Low'])
df['Vol_Park'] = np.sqrt(
    log_hl.rolling(window).apply(lambda x: np.sum(x**2) / (4 * len(x) * np.log(2)))
) * np.sqrt(252)

# --- 4. Garman-Klass Estimator ---
def garman_klass(df_window):
    n = len(df_window)
    hl = np.log(df_window['High'] / df_window['Low'])
    co = np.log(df_window['Close'] / df_window['Open'])
    return np.sqrt((0.5 * np.mean(hl**2) - (2*np.log(2) - 1) * np.mean(co**2)) * 252)

df['Vol_GK'] = df.rolling(window).apply(
    lambda x: garman_klass(df.iloc[x.index[0]:x.index[-1]+1]) if len(x) == window else np.nan,
    raw=False
)['Close']  # placeholder column

# Manual GK computation
gk_vals = []
for i in range(len(df)):
    if i < window - 1:
        gk_vals.append(np.nan)
    else:
        w = df.iloc[i-window+1:i+1]
        hl = np.log(w['High'] / w['Low'])
        co = np.log(w['Close'] / w['Open'])
        gk_var = 0.5 * np.mean(hl**2) - (2*np.log(2)-1) * np.mean(co**2)
        gk_vals.append(np.sqrt(max(gk_var, 0) * 252))
df['Vol_GK'] = gk_vals

# --- Results ---
last = df.iloc[-1]
print("=== Nifty 50 Volatility Estimates (Last Day) ===")
print(f"Close-to-Close ({window}d): {last['Vol_CC']*100:.2f}%")
print(f"EWMA (lambda=0.94):       {last['Vol_EWMA']*100:.2f}%")
print(f"Parkinson ({window}d):      {last['Vol_Park']*100:.2f}%")
print(f"Garman-Klass ({window}d):   {last['Vol_GK']*100:.2f}%")
print(f"\\n--- Summary Statistics ---")
print(f"Mean annual vol (CC):   {df['Vol_CC'].mean()*100:.2f}%")
print(f"Vol of vol (CC):        {df['Vol_CC'].std()*100:.2f}%")
print(f"EWMA half-life:         {np.log(2)/np.log(1/lam):.1f} days")
print(f"Parkinson efficiency:   ~5.2x vs close-to-close")`}
      />

      <ExampleBlock
        title="Computing EWMA Volatility for TCS"
        difficulty="intermediate"
        problem="TCS had a daily log return of -2.1% yesterday and the previous EWMA variance estimate was 0.000144 (daily vol = 1.2%). Using lambda = 0.94, compute today's EWMA volatility and annualize it."
        solution={[
          {
            step: 'Apply EWMA recursion',
            formula: '\\sigma^2_t = 0.94 \\times 0.000144 + 0.06 \\times (-0.021)^2 = 0.0001354 + 0.00002646 = 0.0001618',
            explanation: 'The large negative return increases the variance estimate.',
          },
          {
            step: 'Compute daily volatility',
            formula: '\\sigma_t = \\sqrt{0.0001618} = 0.01272 = 1.272\\%',
            explanation: 'Daily vol rose from 1.2% to 1.27% due to the -2.1% move.',
          },
          {
            step: 'Annualize',
            formula: '\\sigma_{\\text{annual}} = 1.272\\% \\times \\sqrt{252} = 20.19\\%',
            explanation: 'Annualized volatility is approximately 20.2%, up from the previous 19.0%.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Use <strong>EWMA</strong> for dynamic risk management where recent volatility matters
          most (position sizing, margin calculations). Use <strong>Parkinson or Garman-Klass</strong>{' '}
          when OHLC data is available for more efficient estimates. For NSE stocks, the India VIX
          provides a market-implied forward-looking volatility for Nifty 50 options, complementing
          historical estimates. Always match the volatility horizon to your trading horizon.
        </p>
      </NoteBlock>
    </div>
  )
}
