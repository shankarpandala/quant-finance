import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractivePEAD() {
  const [surpriseThreshold, setSurpriseThreshold] = useState(5)
  const [holdingDays, setHoldingDays] = useState(30)

  const stocks = [
    { name: 'TCS', surprise: 8.2, drift: [0, 0.5, 1.2, 2.1, 3.0, 3.5, 4.2] },
    { name: 'Infosys', surprise: -6.5, drift: [0, -0.3, -1.0, -1.8, -2.5, -3.0, -3.2] },
    { name: 'HDFC Bank', surprise: 3.1, drift: [0, 0.2, 0.5, 0.8, 1.0, 1.2, 1.5] },
    { name: 'Reliance', surprise: -2.0, drift: [0, -0.1, -0.3, -0.5, -0.6, -0.7, -0.8] },
    { name: 'ITC', surprise: 12.5, drift: [0, 0.8, 1.8, 3.2, 4.5, 5.2, 6.0] },
    { name: 'SBI', surprise: -9.3, drift: [0, -0.5, -1.5, -2.8, -3.8, -4.5, -5.0] },
  ]

  const filtered = stocks.filter(s => Math.abs(s.surprise) >= surpriseThreshold)
  const chartW = 400
  const chartH = 150

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Post-Earnings Announcement Drift (PEAD)
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust the earnings surprise threshold and see which NSE stocks exhibit PEAD.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Min |Surprise|: {surpriseThreshold}%</span>
          <input type="range" min="1" max="15" step="1" value={surpriseThreshold}
            onChange={e => setSurpriseThreshold(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Holding Period: {holdingDays} days</span>
          <input type="range" min="5" max="60" step="5" value={holdingDays}
            onChange={e => setHoldingDays(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full max-w-lg mx-auto block">
        <line x1="0" y1={chartH / 2} x2={chartW} y2={chartH / 2} stroke="#e5e7eb" strokeWidth="1" />
        <text x="5" y={chartH / 2 - 5} className="text-[8px]" fill="#6b7280">0%</text>
        {filtered.map((stock, si) => {
          const color = stock.surprise > 0 ? '#22c55e' : '#ef4444'
          const path = stock.drift.map((d, i) => {
            const x = (i / (stock.drift.length - 1)) * chartW
            const y = chartH / 2 - (d / 8) * (chartH / 2)
            return `${i === 0 ? 'M' : 'L'}${x},${y}`
          }).join(' ')
          return (
            <g key={si}>
              <path d={path} fill="none" stroke={color} strokeWidth="1.5" opacity="0.7" />
              <text x={chartW - 5} y={chartH / 2 - (stock.drift[6] / 8) * (chartH / 2)}
                textAnchor="end" className="text-[8px]" fill={color}>{stock.name}</text>
            </g>
          )
        })}
      </svg>

      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        {filtered.length} stocks with |surprise| &ge; {surpriseThreshold}% showing post-earnings drift over 60 days
      </p>
    </div>
  )
}

export default function EarningsStrategies() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Post-Earnings Announcement Drift on Indian Quarterly Results
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Post-Earnings Announcement Drift (PEAD) is one of the most robust anomalies in financial
        markets. Stocks that report positive earnings surprises tend to drift upward for 30-60 days
        after the announcement, and vice versa. In the Indian market, where quarterly results are
        announced by all listed companies within 45 days of quarter-end per SEBI regulations, PEAD
        offers a systematic and well-documented alpha source.
      </p>

      <DefinitionBlock
        title="Post-Earnings Announcement Drift (PEAD)"
        label="Definition 5.10"
        definition="PEAD is the tendency for a stock's cumulative abnormal return to continue in the direction of the earnings surprise for 30-90 days following the earnings announcement. This anomaly contradicts the Efficient Market Hypothesis (semi-strong form) and is attributed to investor underreaction to earnings information."
        notation={<>Standardized Unexpected Earnings: <InlineMath math="\text{SUE}_i = \frac{E_i - \hat{E}_i}{\sigma(E_i - \hat{E}_i)}" /> where <InlineMath math="E_i" /> is actual EPS and <InlineMath math="\hat{E}_i" /> is the consensus estimate.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Earnings Surprise Measurement
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The earnings surprise for an Indian company can be computed using several methods:
      </p>

      <BlockMath math="\text{Surprise}_1 = \frac{\text{Actual EPS} - \text{Consensus EPS}}{\text{Consensus EPS}} \times 100\%" />

      <BlockMath math="\text{Surprise}_2 = \frac{\text{Actual PAT} - \text{Estimated PAT}}{\text{Market Cap}} \times 100\%" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For Indian stocks, analyst consensus is available from Bloomberg, Refinitiv, and domestic
        providers like Capitaline and Ace Equity. Revenue surprises, EBITDA margin surprises, and
        commentary-based surprises (guidance changes) also drive PEAD.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Indian Earnings Calendar
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Indian companies report quarterly results according to SEBI's Listing Obligations:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Quarter</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Period</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Reporting Deadline</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Peak Season</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Q1</td>
              <td className="px-5 py-2">Apr-Jun</td>
              <td className="px-5 py-2">Aug 14</td>
              <td className="px-5 py-2">Jul 15 - Aug 14</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Q2</td>
              <td className="px-5 py-2">Jul-Sep</td>
              <td className="px-5 py-2">Nov 14</td>
              <td className="px-5 py-2">Oct 15 - Nov 14</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Q3</td>
              <td className="px-5 py-2">Oct-Dec</td>
              <td className="px-5 py-2">Feb 14</td>
              <td className="px-5 py-2">Jan 15 - Feb 14</td>
            </tr>
            <tr>
              <td className="px-5 py-2">Q4</td>
              <td className="px-5 py-2">Jan-Mar</td>
              <td className="px-5 py-2">May 30</td>
              <td className="px-5 py-2">Apr 15 - May 30</td>
            </tr>
          </tbody>
        </table>
      </div>

      <TheoremBlock
        title="PEAD Under Gradual Information Diffusion"
        label="Theorem 5.10"
        statement={<>Under the gradual information diffusion model (Hong and Stein, 1999), PEAD arises because information about earnings quality spreads slowly through the investor population. Early informed traders (institutions) partially incorporate the earnings surprise, but the full information takes 30-60 days to diffuse to retail investors and index funds. The drift magnitude is proportional to: <BlockMath math="\text{CAR}_{[1,T]} = \alpha + \beta_1 \cdot \text{SUE} + \beta_2 \cdot \text{SUE} \times \text{Analyst Coverage}^{-1} + \epsilon" /> Stocks with lower analyst coverage exhibit stronger PEAD because information diffuses more slowly.</>}
      />

      <InteractivePEAD />

      <PythonCode
        title="pead_indian_stocks.py"
        runnable
        code={`import numpy as np
from scipy import stats

# PEAD Strategy on Indian Quarterly Results
np.random.seed(42)
n_quarters = 20   # 5 years of quarterly data
n_stocks = 50     # Universe of NSE stocks

# Simulate earnings surprises and post-announcement returns
# In practice, use actual data from BSE/NSE filings

# Generate realistic earnings surprises (% beat/miss)
surprises = np.random.randn(n_quarters, n_stocks) * 8  # Std dev ~8%

# PEAD effect: positive surprise -> positive drift
drift_coefficient = 0.04  # 4% of surprise translates to drift
noise = np.random.randn(n_quarters, n_stocks) * 5

# 60-day post-announcement CAR
car_60d = drift_coefficient * surprises + noise

# Sort into quintiles by surprise magnitude
print("=== PEAD Analysis: NSE Stock Universe ===\\n")
print(f"{'Quintile':<12} {'Avg Surprise':<16} {'Avg CAR(60d)':<16} {'t-stat':<10} {'Hit Rate':<10}")

for q in range(5):
    q_mask = np.zeros_like(surprises, dtype=bool)
    for t in range(n_quarters):
        pctiles = np.percentile(surprises[t], [20, 40, 60, 80])
        if q == 0:
            q_mask[t] = surprises[t] <= pctiles[0]
        elif q == 4:
            q_mask[t] = surprises[t] > pctiles[3]
        else:
            q_mask[t] = (surprises[t] > pctiles[q-1]) & (surprises[t] <= pctiles[q])

    avg_surprise = np.mean(surprises[q_mask])
    avg_car = np.mean(car_60d[q_mask])
    t_stat = avg_car / (np.std(car_60d[q_mask]) / np.sqrt(np.sum(q_mask)))
    hit_rate = np.mean(np.sign(car_60d[q_mask]) == np.sign(surprises[q_mask]))

    label = ['Big Miss', 'Miss', 'Meet', 'Beat', 'Big Beat'][q]
    print(f"{label:<12} {avg_surprise:>12.1f}%   {avg_car:>12.1f}%   {t_stat:>8.2f}   {hit_rate*100:>6.1f}%")

# Long-short strategy
long_mask = surprises > np.percentile(surprises, 80, axis=1, keepdims=True)
short_mask = surprises < np.percentile(surprises, 20, axis=1, keepdims=True)

ls_returns = []
for t in range(n_quarters):
    long_ret = np.mean(car_60d[t][long_mask[t]])
    short_ret = np.mean(car_60d[t][short_mask[t]])
    ls_returns.append(long_ret - short_ret)

ls_returns = np.array(ls_returns)

print(f"\\n=== PEAD Long-Short Strategy ===")
print(f"Mean quarterly return:  {np.mean(ls_returns):.2f}%")
print(f"Std quarterly return:   {np.std(ls_returns):.2f}%")
print(f"Sharpe (annualized):    {np.mean(ls_returns)/np.std(ls_returns)*2:.2f}")
print(f"Hit rate:               {np.mean(ls_returns > 0)*100:.0f}%")
print(f"Max return:             {np.max(ls_returns):.2f}%")
print(f"Min return:             {np.min(ls_returns):.2f}%")

# Sector-wise PEAD strength
sectors = ['IT', 'Banking', 'FMCG', 'Pharma', 'Auto',
           'Energy', 'Metals', 'Infra', 'Telecom', 'Chemicals']
print(f"\\n=== Sector-wise PEAD Strength ===")
for i, sector in enumerate(sectors[:5]):
    sector_stocks = range(i*10, (i+1)*10)
    sector_surprise = surprises[:, list(sector_stocks)]
    sector_car = car_60d[:, list(sector_stocks)]
    corr = np.corrcoef(sector_surprise.flatten(), sector_car.flatten())[0, 1]
    print(f"{sector:<12} Surprise-CAR correlation: {corr:.3f}")

# Event window analysis
print(f"\\n=== Event Window Returns (Result Day Anchored) ===")
windows = [(-5, -1), (0, 0), (1, 5), (1, 30), (1, 60)]
for start, end in windows:
    label = f"[{start:+d}, {end:+d}]"
    avg_ret = np.random.randn() * 2 + (end - start) * 0.05
    print(f"Window {label:<12}: Avg absolute return = {abs(avg_ret):.2f}%")

# Indian-specific considerations
print(f"\\n=== Indian Market Considerations ===")
print(f"- Results after market hours: Gap opening next day")
print(f"- Board meetings pre-announced: Options IV spikes pre-event")
print(f"- SEBI UPSI rules: No trading by insiders during quiet period")
print(f"- STT impact: Delivery trades (0.1%) vs Intraday (0.025%)")
print(f"- F&O availability: Only ~200 stocks have futures/options")`}
      />

      <ExampleBlock
        title="PEAD Trade on TCS Quarterly Results"
        difficulty="intermediate"
        problem="TCS reports Q3 results with EPS of INR 62 vs consensus of INR 58. Historical PEAD coefficient is 4% (i.e., 4% of surprise translates to 60-day drift). TCS is at INR 3,800. Calculate expected drift and position sizing for INR 20 lakh capital."
        solution={[
          {
            step: 'Compute earnings surprise',
            formula: '\\text{Surprise} = \\frac{62 - 58}{58} \\times 100 = 6.9\\%',
          },
          {
            step: 'Estimate expected 60-day drift',
            formula: '\\text{Expected CAR} = 0.04 \\times 6.9\\% = 0.276\\%',
            explanation: 'Based on historical PEAD coefficient of 4%.',
          },
          {
            step: 'Compute expected profit',
            formula: '\\text{Profit} = 20,00,000 \\times 0.276\\% = \\text{INR } 5,520',
            explanation: 'This is the expected profit from the PEAD drift. In practice, combine with other signals (revenue surprise, guidance) for higher conviction.',
          },
          {
            step: 'Position using futures',
            formula: '\\text{Lots} = \\frac{20,00,000}{175 \\times 3,800} = 3 \\text{ lots}',
            explanation: 'TCS futures lot size is 175 shares. Buy 3 lots and hold for 60 days.',
          },
        ]}
      />

      <NoteBlock title="SEBI Insider Trading Regulations" type="warning">
        <p>
          SEBI's Prohibition of Insider Trading (PIT) Regulations strictly prohibit trading
          based on Unpublished Price Sensitive Information (UPSI). Earnings data before public
          announcement is classified as UPSI. Designated persons of listed companies have a
          trading window closure period (typically from quarter-end until 48 hours after results
          are published). Quantitative PEAD strategies trade <em>after</em> public announcement,
          which is fully compliant with SEBI regulations.
        </p>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          PEAD is a well-documented anomaly in Indian equities driven by investor underreaction
          to earnings surprises. The strategy is simple: go long stocks with large positive
          surprises and short those with large negative surprises, holding for 30-60 days.
          Indian-specific considerations include the concentrated earnings season (45-day
          reporting window), after-hours announcement timing, and the subset of stocks with
          F&O availability for efficient execution.
        </p>
      </NoteBlock>
    </div>
  )
}
