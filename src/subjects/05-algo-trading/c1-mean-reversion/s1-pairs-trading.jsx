import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractivePairsTrading() {
  const [entryZ, setEntryZ] = useState(2.0)
  const [exitZ, setExitZ] = useState(0.5)
  const [lookback, setLookback] = useState(60)

  const generateSpread = () => {
    const n = 120
    const data = []
    let spread = 0
    for (let i = 0; i < n; i++) {
      spread = spread * 0.92 + (Math.random() - 0.5) * 3
      data.push(spread)
    }
    return data
  }

  const [spreadData] = useState(generateSpread)
  const mean = spreadData.slice(0, lookback).reduce((a, b) => a + b, 0) / lookback
  const std = Math.sqrt(spreadData.slice(0, lookback).reduce((s, v) => s + (v - mean) ** 2, 0) / lookback)

  const signals = spreadData.map(s => {
    const z = (s - mean) / (std || 1)
    if (z > entryZ) return 'short'
    if (z < -entryZ) return 'long'
    if (Math.abs(z) < exitZ) return 'exit'
    return 'hold'
  })

  const maxSpread = Math.max(...spreadData.map(Math.abs), 5)
  const chartH = 200
  const chartW = 500

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Pairs Trading Z-Score Signals
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust entry/exit thresholds and lookback window to see how signals change on a simulated TCS-Infosys spread.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Entry Z-Score: {entryZ.toFixed(1)}</span>
          <input type="range" min="1.0" max="3.0" step="0.1" value={entryZ}
            onChange={e => setEntryZ(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Exit Z-Score: {exitZ.toFixed(1)}</span>
          <input type="range" min="0.0" max="1.5" step="0.1" value={exitZ}
            onChange={e => setExitZ(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Lookback: {lookback} days</span>
          <input type="range" min="20" max="120" step="5" value={lookback}
            onChange={e => setLookback(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full max-w-2xl mx-auto block">
        {/* Mean line */}
        <line x1="0" y1={chartH / 2} x2={chartW} y2={chartH / 2} stroke="#6b7280" strokeWidth="1" strokeDasharray="4" />
        {/* Entry bands */}
        <line x1="0" y1={chartH / 2 - (entryZ * std / maxSpread) * (chartH / 2)} x2={chartW} y2={chartH / 2 - (entryZ * std / maxSpread) * (chartH / 2)} stroke="#ef4444" strokeWidth="1" strokeDasharray="3" />
        <line x1="0" y1={chartH / 2 + (entryZ * std / maxSpread) * (chartH / 2)} x2={chartW} y2={chartH / 2 + (entryZ * std / maxSpread) * (chartH / 2)} stroke="#22c55e" strokeWidth="1" strokeDasharray="3" />

        {spreadData.map((s, i) => {
          const x = (i / (spreadData.length - 1)) * chartW
          const y = chartH / 2 - (s / maxSpread) * (chartH / 2)
          const color = signals[i] === 'short' ? '#ef4444' : signals[i] === 'long' ? '#22c55e' : '#6366f1'
          return <circle key={i} cx={x} cy={y} r="2" fill={color} opacity="0.8" />
        })}
      </svg>

      <div className="mt-3 flex justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full bg-green-500" /> Long spread</span>
        <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full bg-red-500" /> Short spread</span>
        <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full bg-indigo-500" /> Neutral</span>
      </div>
    </div>
  )
}

export default function PairsTrading() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Pairs Trading on NSE Stocks
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Pairs trading is one of the oldest and most well-studied mean-reversion strategies in
        quantitative finance. The idea is elegantly simple: find two stocks whose prices move
        together historically (such as TCS and Infosys, or HDFC Bank and ICICI Bank on the NSE),
        and trade the spread when it diverges from its historical norm.
      </p>

      <DefinitionBlock
        title="Pairs Trading"
        label="Definition 5.1"
        definition="Pairs trading is a market-neutral strategy that involves simultaneously going long one asset and short another related asset when the spread between them deviates significantly from its historical mean, with the expectation that the spread will revert to the mean."
        notation={<>The spread is typically defined as <InlineMath math="S_t = P_t^A - \beta \cdot P_t^B" /> where <InlineMath math="\beta" /> is the hedge ratio.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Why Pairs Trading Works in Indian Markets
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Indian IT sector stocks like TCS, Infosys, Wipro, and HCL Tech share common revenue drivers:
        US enterprise spending, USD/INR exchange rates, and visa regulations. Similarly, private
        banks like HDFC Bank and ICICI Bank respond to the same RBI policy rates, credit growth
        cycles, and NPA trends. These shared fundamentals create natural cointegration relationships
        that pairs traders exploit.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Mathematical Framework
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Given two stock price series <InlineMath math="P_t^A" /> and <InlineMath math="P_t^B" />,
        we first estimate the hedge ratio <InlineMath math="\beta" /> via OLS regression:
      </p>

      <BlockMath math="P_t^A = \alpha + \beta \cdot P_t^B + \epsilon_t" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The spread (residual) is:
      </p>

      <BlockMath math="S_t = P_t^A - \hat{\alpha} - \hat{\beta} \cdot P_t^B" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        We then compute the z-score of the spread to normalize it:
      </p>

      <BlockMath math="z_t = \frac{S_t - \mu_S}{\sigma_S}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\mu_S" /> and <InlineMath math="\sigma_S" /> are the rolling mean
        and standard deviation of the spread over a lookback window of <InlineMath math="L" /> days.
      </p>

      <TheoremBlock
        title="Cointegration (Engle-Granger)"
        label="Theorem 5.1"
        statement={<>Two non-stationary time series <InlineMath math="P_t^A" /> and <InlineMath math="P_t^B" /> are cointegrated of order CI(1,1) if there exists a linear combination <InlineMath math="S_t = P_t^A - \beta P_t^B" /> that is stationary (I(0)). This means while each price series individually follows a random walk, their spread is mean-reverting.</>}
        proof={<>We test cointegration using the Augmented Dickey-Fuller (ADF) test on the spread residuals. Under the null hypothesis of no cointegration, the spread has a unit root. If the ADF test statistic is below the critical value (more negative), we reject the null and conclude cointegration exists. The critical values differ from standard ADF tables because we test residuals from an estimated regression (Engle-Granger critical values).</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Trading Rules
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The standard z-score based trading rules are:
      </p>

      <BlockMath math={`\\text{Signal} = \\begin{cases} \\text{Long spread} & \\text{if } z_t < -z_{\\text{entry}} \\\\ \\text{Short spread} & \\text{if } z_t > z_{\\text{entry}} \\\\ \\text{Close position} & \\text{if } |z_t| < z_{\\text{exit}} \\\\ \\text{Stop loss} & \\text{if } |z_t| > z_{\\text{stop}} \\end{cases}`} />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        "Long spread" means buy stock A, sell <InlineMath math="\beta" /> units of stock B.
        "Short spread" means the reverse. On NSE, shorting requires borrowing via the Securities
        Lending and Borrowing (SLB) mechanism or using stock futures on the F&O segment.
      </p>

      <InteractivePairsTrading />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Implementation on NSE
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        In practice, pairs trading on the NSE involves several Indian-market-specific considerations:
        lot sizes in F&O, STT (Securities Transaction Tax) on delivery vs intraday, SEBI margin
        requirements, and settlement cycles. Using stock futures for the short leg avoids SLB
        complexities but introduces roll costs at monthly expiry.
      </p>

      <PythonCode
        title="pairs_trading_nse.py"
        runnable
        code={`import numpy as np
from scipy import stats

# Simulated daily prices for TCS and Infosys (in INR)
np.random.seed(42)
n_days = 252  # One trading year on NSE

# Generate cointegrated price series
common_factor = np.cumsum(np.random.randn(n_days) * 15)
tcs_prices = 3500 + common_factor + np.cumsum(np.random.randn(n_days) * 3)
infosys_prices = 1500 + 0.42 * common_factor + np.cumsum(np.random.randn(n_days) * 2)

# Step 1: Estimate hedge ratio via OLS regression
slope, intercept, r_value, p_value, std_err = stats.linregress(infosys_prices, tcs_prices)
print(f"Hedge Ratio (beta): {slope:.4f}")
print(f"Intercept (alpha):  {intercept:.2f} INR")
print(f"R-squared:          {r_value**2:.4f}")

# Step 2: Compute spread
spread = tcs_prices - slope * infosys_prices - intercept

# Step 3: ADF test for cointegration (simplified)
# Using Dickey-Fuller regression: delta_S = phi * S_{t-1} + e_t
delta_s = np.diff(spread)
s_lag = spread[:-1]
phi_slope, phi_intercept, _, _, phi_se = stats.linregress(s_lag, delta_s)
adf_stat = phi_slope / phi_se
print(f"\\nADF test statistic: {adf_stat:.4f}")
print(f"Critical value (5%): -2.86")
print(f"Cointegrated: {'Yes' if adf_stat < -2.86 else 'No'}")

# Step 4: Generate trading signals
lookback = 60
z_entry, z_exit, z_stop = 2.0, 0.5, 3.5
signals = []
pnl = []
position = 0  # 1=long spread, -1=short spread, 0=flat

for t in range(lookback, n_days):
    window = spread[t-lookback:t]
    mu = np.mean(window)
    sigma = np.std(window)
    z = (spread[t] - mu) / sigma if sigma > 0 else 0

    if position == 0:
        if z < -z_entry:
            position = 1   # Long spread: Buy TCS, Sell Infosys
            signals.append(('LONG', t))
        elif z > z_entry:
            position = -1  # Short spread: Sell TCS, Buy Infosys
            signals.append(('SHORT', t))
    elif abs(z) < z_exit or abs(z) > z_stop:
        signals.append(('EXIT', t))
        position = 0

# Step 5: Summary
print(f"\\n--- Pairs Trading Summary (TCS-Infosys) ---")
print(f"Total signals generated: {len(signals)}")
print(f"Spread mean: {np.mean(spread):.2f} INR")
print(f"Spread std:  {np.std(spread):.2f} INR")
print(f"Half-life:   {-np.log(2)/phi_slope:.1f} days")

# NSE-specific costs
lot_size_tcs = 175    # TCS futures lot size
lot_size_infy = 300   # Infosys futures lot size
stt_rate = 0.0001     # STT for futures (0.01%)
brokerage = 20        # Flat brokerage per order (Zerodha)

print(f"\\n--- NSE Trading Costs ---")
print(f"TCS lot size:     {lot_size_tcs} shares")
print(f"Infosys lot size: {lot_size_infy} shares")
print(f"STT per leg:      {stt_rate*100:.2f}%")
print(f"Brokerage:        INR {brokerage} per order (Zerodha)")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Popular NSE Pairs
      </h3>
      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Pair</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Sector</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Rationale</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">TCS - Infosys</td>
              <td className="px-5 py-2">IT Services</td>
              <td className="px-5 py-2">Same revenue drivers: US enterprise, USD/INR</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">HDFC Bank - ICICI Bank</td>
              <td className="px-5 py-2">Private Banking</td>
              <td className="px-5 py-2">RBI rates, credit growth, NPA cycles</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">SBI - Bank of Baroda</td>
              <td className="px-5 py-2">PSU Banking</td>
              <td className="px-5 py-2">Government policy, PSU reform cycle</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Reliance - ONGC</td>
              <td className="px-5 py-2">Energy</td>
              <td className="px-5 py-2">Crude oil prices, government fuel policy</td>
            </tr>
            <tr>
              <td className="px-5 py-2">HUL - ITC</td>
              <td className="px-5 py-2">FMCG</td>
              <td className="px-5 py-2">Rural demand, monsoon, commodity input costs</td>
            </tr>
          </tbody>
        </table>
      </div>

      <ExampleBlock
        title="TCS-Infosys Pairs Trade Calculation"
        difficulty="intermediate"
        problem="TCS trades at INR 3,800 and Infosys at INR 1,600. The hedge ratio is 0.42. The 60-day spread mean is 1,128 INR and standard deviation is 45 INR. Current spread is 1,038 INR. Determine the trading signal."
        solution={[
          {
            step: 'Compute the current spread',
            formula: 'S_t = P_t^{TCS} - \\beta \\cdot P_t^{INFY} = 3800 - 0.42 \\times 1600 = 3128',
            explanation: 'We use the hedge ratio to compute the price spread between TCS and Infosys.',
          },
          {
            step: 'Compute the z-score',
            formula: 'z_t = \\frac{S_t - \\mu}{\\sigma} = \\frac{1038 - 1128}{45} = -2.0',
            explanation: 'The z-score tells us how many standard deviations the spread is from its mean.',
          },
          {
            step: 'Apply trading rule',
            formula: 'z_t = -2.0 < -z_{entry} = -2.0 \\Rightarrow \\text{Long Spread}',
            explanation: 'Since z = -2.0 hits our entry threshold, we go long the spread: Buy TCS futures (1 lot = 175 shares) and Sell Infosys futures proportionally.',
          },
        ]}
      />

      <NoteBlock title="SEBI Regulatory Considerations" type="warning">
        <p>
          SEBI regulates short selling in India differently from US markets. Institutional investors
          must disclose short positions. Retail traders can short intraday in the cash segment but
          must use F&O or SLB for overnight short positions. The Securities Lending and Borrowing
          (SLB) framework on NSE allows borrowing shares for up to 12 months. For pairs trading,
          using stock futures is generally more practical, though it introduces basis risk and
          rollover costs at monthly expiry.
        </p>
      </NoteBlock>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Half-Life of Mean Reversion
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A critical parameter for pairs trading is the half-life of mean reversion, which tells us
        how quickly the spread reverts. We model the spread as an Ornstein-Uhlenbeck process:
      </p>

      <BlockMath math="dS_t = \theta(\mu - S_t)\,dt + \sigma\,dW_t" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The half-life is:
      </p>

      <BlockMath math="t_{1/2} = \frac{-\ln(2)}{\ln(1 + \theta)} \approx \frac{\ln(2)}{\theta}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For practical pairs trading on NSE, a half-life between 5 and 60 trading days is
        ideal. Shorter half-lives may be consumed by transaction costs (STT + brokerage),
        while longer ones tie up margin capital for too long.
      </p>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Pairs trading on the NSE works best with fundamentally related stocks within the same
          sector. The key steps are: (1) identify cointegrated pairs using the Engle-Granger test,
          (2) estimate the hedge ratio and compute the spread, (3) normalize with z-scores, and
          (4) trade mean reversion with appropriate entry/exit thresholds. Always account for
          NSE-specific costs: STT, lot sizes, margin requirements, and rollover at monthly expiry.
        </p>
      </NoteBlock>
    </div>
  )
}
