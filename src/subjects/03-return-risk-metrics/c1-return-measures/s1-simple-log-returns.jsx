import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveReturnComparison() {
  const [startPrice, setStartPrice] = useState(2500)
  const [endPrice, setEndPrice] = useState(2650)
  const [periods, setPeriods] = useState(5)

  const simpleReturn = (endPrice - startPrice) / startPrice
  const logReturn = Math.log(endPrice / startPrice)
  const diff = (simpleReturn - logReturn) * 10000
  const dailySimple = Math.pow(1 + simpleReturn, 1 / periods) - 1
  const dailyLog = logReturn / periods
  const annualizedSimple = Math.pow(1 + simpleReturn, 252 / periods) - 1
  const annualizedLog = logReturn * (252 / periods)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Simple vs. Log Returns
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Compare simple and logarithmic returns for a Nifty 50 stock. Adjust prices to see
        how the two measures diverge for larger moves.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Start Price: INR {startPrice}</span>
          <input type="range" min="500" max="5000" step="50" value={startPrice}
            onChange={e => setStartPrice(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>End Price: INR {endPrice}</span>
          <input type="range" min="500" max="5000" step="50" value={endPrice}
            onChange={e => setEndPrice(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Trading Days: {periods}</span>
          <input type="range" min="1" max="252" step="1" value={periods}
            onChange={e => setPeriods(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">Simple Return</p>
          <p className="text-lg font-bold text-blue-800 dark:text-blue-200">
            {(simpleReturn * 100).toFixed(3)}%
          </p>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
          <p className="text-xs font-semibold text-purple-700 dark:text-purple-300">Log Return</p>
          <p className="text-lg font-bold text-purple-800 dark:text-purple-200">
            {(logReturn * 100).toFixed(3)}%
          </p>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">Difference</p>
          <p className="text-lg font-bold text-amber-800 dark:text-amber-200">
            {diff.toFixed(1)} bps
          </p>
        </div>
        <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/30">
          <p className="text-xs font-semibold text-green-700 dark:text-green-300">Annualized (Log)</p>
          <p className="text-lg font-bold text-green-800 dark:text-green-200">
            {(annualizedLog * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
        Daily simple: <InlineMath math={`${(dailySimple * 100).toFixed(4)}\\%`} /> |
        Daily log: <InlineMath math={`${(dailyLog * 100).toFixed(4)}\\%`} />
        {Math.abs(diff) > 50
          ? <span className="ml-2 font-semibold text-red-500"> -- Large divergence! Use log returns for accuracy.</span>
          : <span className="ml-2 font-semibold text-green-600 dark:text-green-400"> -- Returns are approximately equal.</span>
        }
      </p>
    </div>
  )
}

export default function SimpleLogReturns() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Simple and Logarithmic Returns
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Returns are the fundamental building block of quantitative finance. Whether you are
        analyzing Nifty 50 performance, building a factor model on NSE data, or backtesting an
        algo-trading strategy via Zerodha, the choice between simple and logarithmic returns has
        profound implications for your analysis.
      </p>

      <DefinitionBlock
        title="Simple (Arithmetic) Return"
        label="Definition 1.1"
        definition="The simple return over a single period is the percentage change in price. For a stock with price P_t at time t and P_{t-1} at time t-1, the simple return is the ratio of the price change to the initial price."
        notation="R_t = \frac{P_t - P_{t-1}}{P_{t-1}} = \frac{P_t}{P_{t-1}} - 1"
      />

      <DefinitionBlock
        title="Logarithmic (Continuously Compounded) Return"
        label="Definition 1.2"
        definition="The logarithmic return is the natural logarithm of the gross return. Log returns are time-additive: the multi-period log return is the sum of single-period log returns, which makes them mathematically convenient for time-series analysis."
        notation="r_t = \ln\!\left(\frac{P_t}{P_{t-1}}\right) = \ln(1 + R_t)"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Relationship Between Simple and Log Returns
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The two return types are linked via the exponential function. For small returns (typical
        of daily equity moves on NSE), they are approximately equal. The divergence grows with
        the magnitude of the return:
      </p>

      <BlockMath math="r_t = \ln(1 + R_t) \approx R_t - \frac{R_t^2}{2} + \frac{R_t^3}{3} - \cdots" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For daily Nifty 50 returns (typically &lt; 2%), the approximation <InlineMath math="r_t \approx R_t" /> holds
        to within 2 basis points. However, during events like the 2020 COVID crash or
        budget-day moves, the difference can exceed 50 bps.
      </p>

      <TheoremBlock
        title="Time Additivity of Log Returns"
        label="Theorem 1.1"
        statement="The multi-period log return equals the sum of single-period log returns. This property does not hold for simple returns, which require geometric compounding."
        formula="r_{t:t+n} = \ln\!\left(\frac{P_{t+n}}{P_t}\right) = \sum_{k=1}^{n} r_{t+k}"
        proof="By the telescoping property of logarithms: \ln(P_{t+n}/P_t) = \ln(P_{t+n}/P_{t+n-1}) + \ln(P_{t+n-1}/P_{t+n-2}) + \cdots + \ln(P_{t+1}/P_t) = \sum_{k=1}^n r_{t+k}. This follows directly from the identity \ln(ab) = \ln a + \ln b. For simple returns, the multi-period return is (1+R_{t:t+n}) = \prod_{k=1}^n (1+R_{t+k}), which is multiplicative, not additive."
      />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Property</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Simple Return</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Log Return</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Formula</td>
              <td className="px-5 py-2"><InlineMath math="R_t = P_t/P_{t-1} - 1" /></td>
              <td className="px-5 py-2"><InlineMath math="r_t = \ln(P_t/P_{t-1})" /></td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Time aggregation</td>
              <td className="px-5 py-2">Multiplicative</td>
              <td className="px-5 py-2">Additive</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Cross-sectional aggregation</td>
              <td className="px-5 py-2">Weighted average</td>
              <td className="px-5 py-2">Not simple weighted avg</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Range</td>
              <td className="px-5 py-2"><InlineMath math="[-1, \infty)" /></td>
              <td className="px-5 py-2"><InlineMath math="(-\infty, \infty)" /></td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Symmetry</td>
              <td className="px-5 py-2">Asymmetric</td>
              <td className="px-5 py-2">Symmetric</td>
            </tr>
            <tr>
              <td className="px-5 py-2">Best for</td>
              <td className="px-5 py-2">Portfolio returns</td>
              <td className="px-5 py-2">Statistical modeling</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveReturnComparison />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Annualizing Returns
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        NSE operates approximately 252 trading days per year. To annualize returns, the method
        depends on the return type:
      </p>

      <BlockMath math="R_{\text{annual}}^{\text{simple}} = (1 + R_{\text{daily}})^{252} - 1" />
      <BlockMath math="r_{\text{annual}}^{\text{log}} = r_{\text{daily}} \times 252" />

      <NoteBlock title="SEBI Reporting Standards" type="info">
        <p>
          SEBI requires mutual funds to report returns using CAGR (Compound Annual Growth Rate)
          for periods exceeding one year, and absolute returns for shorter periods. CAGR is
          equivalent to annualized simple returns:
        </p>
        <BlockMath math="\text{CAGR} = \left(\frac{P_T}{P_0}\right)^{1/T} - 1" />
        <p>
          When analyzing Nifty 50 or Bank Nifty performance, always verify whether reported
          returns are simple or log, annualized or cumulative. Mixing conventions is a common
          source of errors in Indian quant research.
        </p>
      </NoteBlock>

      <PythonCode
        title="returns_nse.py"
        runnable
        code={`import numpy as np
import pandas as pd

# Simulated Nifty 50 daily closing prices (1 year)
np.random.seed(42)
n_days = 252
daily_log_returns = np.random.normal(0.0004, 0.012, n_days)  # ~10% annual, ~19% vol
prices = 18000 * np.exp(np.cumsum(daily_log_returns))
prices = np.insert(prices, 0, 18000)  # Include starting price

dates = pd.bdate_range('2025-04-01', periods=n_days + 1, freq='B')
df = pd.DataFrame({'Date': dates, 'Nifty50': prices})
df.set_index('Date', inplace=True)

# --- Compute Returns ---
df['Simple_Return'] = df['Nifty50'].pct_change()
df['Log_Return'] = np.log(df['Nifty50'] / df['Nifty50'].shift(1))
df.dropna(inplace=True)

# --- Verify Time-Additivity ---
cumulative_simple = (1 + df['Simple_Return']).prod() - 1
cumulative_log = df['Log_Return'].sum()
actual_return = (df['Nifty50'].iloc[-1] / df['Nifty50'].iloc[0]) - 1

print("=== Nifty 50 Return Analysis ===")
print(f"Start: INR {18000:.0f}  |  End: INR {prices[-1]:.0f}")
print(f"\\nCumulative simple return: {cumulative_simple*100:.3f}%")
print(f"Product of (1+R): matches actual? {np.isclose(cumulative_simple, actual_return)}")
print(f"\\nSum of log returns: {cumulative_log*100:.3f}%")
print(f"exp(sum_log) - 1: {(np.exp(cumulative_log)-1)*100:.3f}%  (should match simple)")
print(f"\\n--- Annualized Metrics ---")
ann_simple = (1 + df['Simple_Return'].mean())**252 - 1
ann_log = df['Log_Return'].mean() * 252
ann_vol = df['Log_Return'].std() * np.sqrt(252)
print(f"Annualized return (simple): {ann_simple*100:.2f}%")
print(f"Annualized return (log):    {ann_log*100:.2f}%")
print(f"Annualized volatility:      {ann_vol*100:.2f}%")
print(f"\\n--- Daily Statistics ---")
print(f"Mean daily simple: {df['Simple_Return'].mean()*10000:.2f} bps")
print(f"Mean daily log:    {df['Log_Return'].mean()*10000:.2f} bps")
print(f"Max daily return:  {df['Simple_Return'].max()*100:.2f}%")
print(f"Min daily return:  {df['Simple_Return'].min()*100:.2f}%")
print(f"Difference (simple - log) mean: {(df['Simple_Return'].mean()-df['Log_Return'].mean())*10000:.3f} bps")`}
      />

      <ExampleBlock
        title="Computing Returns for Reliance Industries"
        difficulty="beginner"
        problem="Reliance Industries closes at INR 2,450 on Monday and INR 2,510 on Tuesday on NSE. Compute both the simple and log returns, and verify the relationship between them."
        solution={[
          {
            step: 'Compute simple return',
            formula: 'R = \\frac{2510 - 2450}{2450} = \\frac{60}{2450} = 0.02449 = 2.449\\%',
            explanation: 'The stock gained INR 60, or about 2.45%.',
          },
          {
            step: 'Compute log return',
            formula: 'r = \\ln\\!\\left(\\frac{2510}{2450}\\right) = \\ln(1.02449) = 0.02420 = 2.420\\%',
            explanation: 'The log return is slightly smaller than the simple return.',
          },
          {
            step: 'Verify the relationship',
            formula: 'e^{r} - 1 = e^{0.02420} - 1 = 0.02449 = R \\; \\checkmark',
            explanation: 'The difference of 2.9 bps is typical for a 2.4% daily move. For smaller daily returns (< 1%), the two would be nearly identical.',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Portfolio Return Aggregation
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A critical distinction: simple returns aggregate linearly across assets in a
        portfolio, while log returns do not. For a portfolio with <InlineMath math="N" /> stocks:
      </p>

      <BlockMath math="R_p = \sum_{i=1}^{N} w_i R_i \quad \text{(simple returns)}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        However, for log returns, the portfolio return is:
      </p>

      <BlockMath math="r_p = \ln\!\left(\sum_{i=1}^{N} w_i e^{r_i}\right) \neq \sum_{i=1}^{N} w_i r_i" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        This is why simple returns are preferred for portfolio-level calculations on NSE,
        while log returns are preferred for individual stock analysis, statistical modeling,
        and risk metrics. The error from using the linear approximation for log returns
        in portfolios grows with volatility and dispersion across holdings.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Handling Corporate Actions on NSE
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        When computing returns for Indian stocks, corporate actions (splits, bonuses,
        dividends, rights issues) must be properly adjusted. NSE provides adjusted
        closing prices, but it is essential to verify:
      </p>

      <BlockMath math="P^{\text{adj}}_t = P_t \times \prod_{j: t_j \leq t} \text{AF}_j" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\text{AF}_j" /> is the adjustment factor for corporate
        action <InlineMath math="j" />. For a 1:1 bonus issue, <InlineMath math="\text{AF} = 0.5" />.
        For a dividend of INR <InlineMath math="D" /> per share,{' '}
        <InlineMath math="\text{AF} = (P - D) / P" />. Always use adjusted prices from
        NSE or Zerodha's Kite API when computing returns. Unadjusted prices create
        spurious large negative returns on ex-dates.
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Corporate Action</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Adjustment Factor</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Impact on Returns</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Stock Split (1:5)</td>
              <td className="px-4 py-2"><InlineMath math="AF = 1/5" /></td>
              <td className="px-4 py-2">Without adjustment: -80% return (spurious)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Bonus (1:1)</td>
              <td className="px-4 py-2"><InlineMath math="AF = 1/2" /></td>
              <td className="px-4 py-2">Without adjustment: -50% return (spurious)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Dividend (INR 20)</td>
              <td className="px-4 py-2"><InlineMath math="AF = (P-20)/P" /></td>
              <td className="px-4 py-2">Adds ~1% to total return</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Rights Issue (1:4)</td>
              <td className="px-4 py-2">TERP-based adjustment</td>
              <td className="px-4 py-2">Complex; use NSE adjusted data</td>
            </tr>
          </tbody>
        </table>
      </div>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Use <strong>log returns</strong> for statistical modeling, time-series analysis, and
          risk measurement -- they are additive over time and approximately normal. Use{' '}
          <strong>simple returns</strong> for portfolio aggregation (weighted sums across assets)
          and reporting to investors (SEBI conventions). For daily Nifty 50 returns, the two
          are virtually identical, but always be explicit about which convention you are using.
          Always use <strong>corporate-action-adjusted prices</strong> from NSE when computing
          returns to avoid spurious outliers from splits, bonuses, and dividends.
        </p>
      </NoteBlock>
    </div>
  )
}
