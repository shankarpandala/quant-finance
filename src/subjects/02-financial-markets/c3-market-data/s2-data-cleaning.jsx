import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveAdjustment() {
  const [showRaw, setShowRaw] = useState(true)
  const [showAdjusted, setShowAdjusted] = useState(true)
  const [splitRatio, setSplitRatio] = useState(2)

  // Simulated price data with a split event at day 100
  const n = 200
  const rawPrices = []
  const adjPrices = []
  let price = 3000
  for (let i = 0; i < n; i++) {
    price *= (1 + (Math.sin(i * 0.05) * 0.005 + 0.001 + (Math.random() - 0.5) * 0.02))
    if (i === 100) {
      rawPrices.push(price / splitRatio)
      adjPrices.push(price)
      price = price / splitRatio
    } else {
      rawPrices.push(price)
      adjPrices.push(i <= 100 ? price * splitRatio : price * splitRatio)
    }
  }

  // Normalize adjPrices so the last value matches
  const adjFactor = rawPrices[n - 1] / adjPrices[n - 1]
  const adjNorm = adjPrices.map(p => p * adjFactor)

  let minP = Infinity, maxP = -Infinity
  const allPts = [...(showRaw ? rawPrices : []), ...(showAdjusted ? adjNorm : [])]
  for (const p of allPts) { if (p < minP) minP = p; if (p > maxP) maxP = p }
  if (minP === maxP) { minP -= 1; maxP += 1 }
  minP *= 0.95; maxP *= 1.05

  const chartW = 500, chartH = 200
  const padL = 55, padR = 15, padT = 20, padB = 35
  const plotW = chartW - padL - padR, plotH = chartH - padT - padB
  const toX = (i) => padL + (i / (n - 1)) * plotW
  const toY = (p) => padT + plotH - ((p - minP) / (maxP - minP)) * plotH

  const mkPath = (data) => data.map((p, i) => `${i === 0 ? 'M' : 'L'}${toX(i).toFixed(1)},${toY(p).toFixed(1)}`).join(' ')

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Corporate Action Adjustment for Indian Stocks
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Compare raw vs adjusted prices around a stock split event. Splits create artificial
        price drops that must be corrected for accurate return calculations.
      </p>
      <div className="mb-4 grid grid-cols-3 gap-3">
        <label className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <input type="checkbox" checked={showRaw} onChange={e => setShowRaw(e.target.checked)} className="accent-red-500" />
          Raw Price (with split gap)
        </label>
        <label className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <input type="checkbox" checked={showAdjusted} onChange={e => setShowAdjusted(e.target.checked)} className="accent-indigo-500" />
          Adjusted Price (continuous)
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Split Ratio: 1:{splitRatio}</span>
          <input type="range" min="2" max="10" step="1" value={splitRatio}
            onChange={e => setSplitRatio(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>
      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full max-w-xl mx-auto block">
        <line x1={padL} y1={padT + plotH} x2={padL + plotW} y2={padT + plotH} stroke="#9ca3af" strokeWidth="1" />
        <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke="#9ca3af" strokeWidth="1" />
        <line x1={toX(100)} y1={padT} x2={toX(100)} y2={padT + plotH} stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,3" />
        <text x={toX(100)} y={padT - 4} textAnchor="middle" className="text-[9px]" fill="#f59e0b">Split Date</text>
        {showRaw && <path d={mkPath(rawPrices)} fill="none" stroke="#ef4444" strokeWidth="1.5" opacity="0.7" />}
        {showAdjusted && <path d={mkPath(adjNorm)} fill="none" stroke="#6366f1" strokeWidth="2" />}
        <text x={padL + plotW / 2} y={chartH - 4} textAnchor="middle" className="text-[10px]" fill="#6b7280">Trading Days</text>
      </svg>
      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        The raw price shows a {((1 - 1/splitRatio) * 100).toFixed(0)}% drop at the split, but the
        adjusted price is continuous. Always use adjusted prices for return calculations.
      </p>
    </div>
  )
}

export default function DataCleaning() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Data Cleaning for Indian Market Data
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Raw market data from NSE and BSE contains numerous artifacts that must be cleaned
        before use in quantitative research. Failure to properly handle corporate actions,
        survivorship bias, and data errors can lead to severely misleading backtest results.
      </p>

      <DefinitionBlock
        title="Corporate Action Adjustment"
        label="Definition 2.1"
        definition={<>
          Corporate actions (splits, bonuses, rights issues, dividends) change the number of
          shares or the price per share without changing the company's market capitalization.
          The adjustment factor for a 1:N bonus issue is:
          <BlockMath math="\text{Adj Factor} = \frac{1}{1 + N}, \quad P_{\text{adj}} = P_{\text{raw}} \times \text{Adj Factor}" />
          All historical prices before the ex-date must be multiplied by this factor.
        </>}
        notation={<>
          For a 1:1 bonus (like TCS June 2022): factor = 1/2. For a 5:1 split: factor = 1/5.
          Cumulative adjustment: multiply all factors for events after each date.
        </>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Common Data Quality Issues in Indian Markets
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Issue</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Description</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Impact on Backtest</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Fix</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">Splits/Bonuses</td>
              <td className="px-4 py-2">Price drops without value change</td>
              <td className="px-4 py-2">Huge false negative returns</td>
              <td className="px-4 py-2">Apply adjustment factors</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">Dividends</td>
              <td className="px-4 py-2">Price drops by dividend amount</td>
              <td className="px-4 py-2">Understated total returns</td>
              <td className="px-4 py-2">Use total return index or adjust</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">Survivorship Bias</td>
              <td className="px-4 py-2">Delisted stocks excluded</td>
              <td className="px-4 py-2">Overstated strategy returns</td>
              <td className="px-4 py-2">Include delisted stock data</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">Stale Prices</td>
              <td className="px-4 py-2">Illiquid stocks not traded</td>
              <td className="px-4 py-2">False zero volatility</td>
              <td className="px-4 py-2">Filter by minimum volume</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-medium">Circuit Limits</td>
              <td className="px-4 py-2">Prices frozen at limit</td>
              <td className="px-4 py-2">Understated volatility</td>
              <td className="px-4 py-2">Flag circuit-hit days</td>
            </tr>
          </tbody>
        </table>
      </div>

      <TheoremBlock
        title="Survivorship Bias Magnitude"
        label="Theorem 2.1"
        statement={<>
          Survivorship bias inflates annual returns by approximately 1--3% for Indian equity
          strategies. If the universe has an annual delisting rate of{' '}
          <InlineMath math="d" /> and delisted stocks underperform by{' '}
          <InlineMath math="\delta" /> on average:
          <BlockMath math="\text{Bias} \approx d \times \delta" />
          For NSE with ~3% annual delisting rate and ~15% average underperformance of
          delisted stocks: Bias <InlineMath math="\approx 0.03 \times 0.15 = 0.45\%" /> per year.
          Over a 10-year backtest, this compounds to ~4.6% of cumulative alpha.
        </>}
      />

      <InteractiveAdjustment />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Data Cleaning Pipeline
      </h3>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A robust data pipeline for Indian market data should follow these steps:
      </p>

      <ol className="ml-6 list-decimal space-y-2 text-sm text-gray-700 dark:text-gray-300">
        <li><strong>Download:</strong> Fetch raw OHLCV from NSE bhavcopy or yfinance</li>
        <li><strong>Corporate Actions:</strong> Apply split, bonus, and dividend adjustments</li>
        <li><strong>Validation:</strong> Check OHLC consistency (H &ge; max(O,C), L &le; min(O,C))</li>
        <li><strong>Outlier Detection:</strong> Flag returns &gt; 20% for manual review</li>
        <li><strong>Liquidity Filter:</strong> Remove stocks with daily volume &lt; INR 1 crore</li>
        <li><strong>Universe Definition:</strong> Point-in-time Nifty 50/500 membership</li>
        <li><strong>Return Calculation:</strong> Compute log returns from adjusted close</li>
      </ol>

      <NoteBlock title="Point-in-Time Universe" type="warning">
        <p>
          A critical but often overlooked bias is <strong>look-ahead bias in universe
          selection</strong>. Using today's Nifty 50 constituents for a 2015 backtest is wrong
          -- you must use the Nifty 50 composition as it was in 2015. NSE publishes historical
          index composition data. Stocks that were in the index in 2015 but were later removed
          (often due to poor performance) must be included.
        </p>
      </NoteBlock>

      <PythonCode
        title="data_cleaning_pipeline.py"
        runnable
        code={`import numpy as np

np.random.seed(42)

# --- Simulate Raw NSE Data with Issues ---
n = 500
dates = list(range(n))

# Generate price series with embedded issues
raw_close = [1000.0]
for i in range(1, n):
    ret = np.random.normal(0.0003, 0.015)
    raw_close.append(raw_close[-1] * (1 + ret))

# Inject data quality issues
# 1. Stock split at day 200 (1:2)
split_day = 200
split_ratio = 2
for i in range(split_day, n):
    raw_close[i] = raw_close[i] / split_ratio

# 2. Bonus issue at day 350 (1:1)
bonus_day = 350
for i in range(bonus_day, n):
    raw_close[i] = raw_close[i] / 2

# 3. Stale prices (zero returns for illiquid days)
stale_days = [50, 51, 52, 150, 151]
for d in stale_days:
    raw_close[d] = raw_close[d - 1]

raw_close = np.array(raw_close)

print("=== Data Quality Issues Detection ===")
raw_returns = np.diff(np.log(raw_close))

# Detect large moves (potential corporate actions)
large_moves = np.where(np.abs(raw_returns) > 0.15)[0]
print(f"\\nLarge moves (>15%):")
for d in large_moves:
    print(f"  Day {d+1}: {raw_returns[d]*100:.1f}% (raw close: {raw_close[d]:.2f} -> {raw_close[d+1]:.2f})")

# Detect stale prices
stale = np.where(np.abs(raw_returns) < 1e-10)[0]
print(f"\\nStale prices (0% return): {len(stale)} days at indices {stale[:10]}...")

# --- Apply Adjustments ---
adj_close = raw_close.copy()

# Reverse split adjustment (multiply pre-split prices by 1/split_ratio)
adj_close[:split_day] = adj_close[:split_day] / split_ratio

# Reverse bonus adjustment
adj_close[:bonus_day] = adj_close[:bonus_day] / 2

print(f"\\n=== Adjusted vs Raw Comparison ===")
print(f"{'Metric':<25} {'Raw':>12} {'Adjusted':>12}")
raw_ret_total = (raw_close[-1] / raw_close[0] - 1) * 100
adj_ret_total = (adj_close[-1] / adj_close[0] - 1) * 100
print(f"{'Total return':<25} {raw_ret_total:>11.2f}% {adj_ret_total:>11.2f}%")
print(f"{'Start price':<25} {raw_close[0]:>12.2f} {adj_close[0]:>12.2f}")
print(f"{'End price':<25} {raw_close[-1]:>12.2f} {adj_close[-1]:>12.2f}")

adj_returns = np.diff(np.log(adj_close))
adj_returns_clean = adj_returns[np.abs(adj_returns) > 1e-10]  # Remove stale

print(f"\\n=== Clean Return Statistics ===")
print(f"Mean daily return:  {np.mean(adj_returns_clean)*100:.4f}%")
print(f"Daily volatility:   {np.std(adj_returns_clean)*100:.4f}%")
print(f"Annualized return:  {np.mean(adj_returns_clean)*252*100:.2f}%")
print(f"Annualized vol:     {np.std(adj_returns_clean)*np.sqrt(252)*100:.2f}%")
print(f"Skewness:           {float(np.mean(((adj_returns_clean - np.mean(adj_returns_clean))/np.std(adj_returns_clean))**3)):.4f}")
print(f"Excess kurtosis:    {float(np.mean(((adj_returns_clean - np.mean(adj_returns_clean))/np.std(adj_returns_clean))**4) - 3):.4f}")

# --- Survivorship Bias Example ---
print("\\n=== Survivorship Bias Illustration ===")
n_stocks = 100
n_years = 10
alive = np.ones(n_stocks, dtype=bool)
cum_returns_survivor = []
cum_returns_all = []

for year in range(n_years):
    annual_rets = np.random.normal(0.10, 0.30, n_stocks)
    # Bottom 3% delist
    delist_threshold = np.percentile(annual_rets[alive], 3)
    delisted = (annual_rets < delist_threshold) & alive
    alive[delisted] = False

    survivor_ret = np.mean(annual_rets[alive])
    all_ret = np.mean(annual_rets)
    cum_returns_survivor.append(survivor_ret)
    cum_returns_all.append(all_ret)

surv_total = np.prod([1 + r for r in cum_returns_survivor]) - 1
all_total = np.prod([1 + r for r in cum_returns_all]) - 1
print(f"Survivors only (annualized): {np.mean(cum_returns_survivor)*100:.2f}%")
print(f"All stocks (annualized):     {np.mean(cum_returns_all)*100:.2f}%")
print(f"Survivorship bias:           {(np.mean(cum_returns_survivor) - np.mean(cum_returns_all))*100:.2f}% per year")
print(f"Cumulative bias over {n_years}Y:   {(surv_total - all_total)*100:.1f}%")`}
      />

      <ExampleBlock
        title="Adjusting for a Bonus Issue"
        difficulty="beginner"
        problem="TCS declares a 1:1 bonus with ex-date June 10. On June 9, TCS closed at INR 3,400. On June 10, it opened at INR 1,700. How do you adjust historical prices?"
        solution={[
          {
            step: 'Compute the adjustment factor',
            formula: '\\text{Factor} = \\frac{1}{1 + 1} = 0.5',
            explanation: 'For a 1:1 bonus, the number of shares doubles, so the price adjustment factor is 0.5.',
          },
          {
            step: 'Adjust all pre-bonus prices',
            formula: 'P_{\\text{adj}}(t) = P_{\\text{raw}}(t) \\times 0.5 \\quad \\forall \\, t < \\text{June 10}',
            explanation: 'Multiply all historical prices before June 10 by 0.5. This makes the time series continuous.',
          },
          {
            step: 'Verify continuity',
            formula: '\\text{June 9 adj}: 3400 \\times 0.5 = 1700, \\quad \\text{June 10}: 1700',
            explanation: 'The adjusted close on June 9 equals the open on June 10, confirming no artificial return.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Data cleaning is not glamorous but is arguably the most important step in quantitative
          research. For Indian markets: (1) always use adjusted prices for return calculations,
          (2) account for survivorship bias by including delisted stocks, (3) use point-in-time
          index membership, (4) filter illiquid stocks by volume, and (5) flag circuit-hit
          days. A clean data pipeline is the foundation of any credible backtest on NSE/BSE data.
        </p>
      </NoteBlock>
    </div>
  )
}
