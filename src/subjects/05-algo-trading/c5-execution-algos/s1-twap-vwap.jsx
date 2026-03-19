import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveTWAPVWAP() {
  const [totalShares, setTotalShares] = useState(10000)
  const [nSlices, setNSlices] = useState(10)
  const [algoType, setAlgoType] = useState('VWAP')

  const volumeProfile = [0.12, 0.08, 0.06, 0.05, 0.04, 0.04, 0.05, 0.06, 0.08, 0.10, 0.14, 0.18]
  const totalVol = volumeProfile.reduce((a, b) => a + b, 0)
  const normalizedVol = volumeProfile.map(v => v / totalVol)

  const slices = []
  for (let i = 0; i < nSlices; i++) {
    const bucketIdx = Math.floor(i * volumeProfile.length / nSlices)
    if (algoType === 'TWAP') {
      slices.push(totalShares / nSlices)
    } else {
      slices.push(totalShares * normalizedVol[bucketIdx])
    }
  }

  const chartW = 500
  const chartH = 150
  const maxSlice = Math.max(...slices)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: TWAP vs VWAP Order Scheduling
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Compare uniform (TWAP) vs volume-weighted (VWAP) order slicing on NSE.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Total Shares: {totalShares.toLocaleString()}</span>
          <input type="range" min="1000" max="50000" step="1000" value={totalShares}
            onChange={e => setTotalShares(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Number of Slices: {nSlices}</span>
          <input type="range" min="3" max="20" step="1" value={nSlices}
            onChange={e => setNSlices(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <div className="flex gap-2 items-end">
          <button onClick={() => setAlgoType('TWAP')}
            className={`px-3 py-1 text-xs rounded ${algoType === 'TWAP' ? 'bg-indigo-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
            TWAP
          </button>
          <button onClick={() => setAlgoType('VWAP')}
            className={`px-3 py-1 text-xs rounded ${algoType === 'VWAP' ? 'bg-indigo-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
            VWAP
          </button>
        </div>
      </div>

      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full max-w-2xl mx-auto block">
        {slices.map((s, i) => {
          const barW = (chartW / nSlices) * 0.7
          const x = (i / nSlices) * chartW + barW * 0.2
          const barH = (s / maxSlice) * (chartH - 20)
          const color = algoType === 'TWAP' ? '#6366f1' : '#22c55e'
          return (
            <g key={i}>
              <rect x={x} y={chartH - barH - 15} width={barW} height={barH} fill={color} opacity="0.7" rx="2" />
              <text x={x + barW / 2} y={chartH - 2} textAnchor="middle" className="text-[7px]" fill="#6b7280">
                {Math.round(s)}
              </text>
            </g>
          )
        })}
        <text x={chartW / 2} y="10" textAnchor="middle" className="text-[10px] font-bold" fill="#374151">
          {algoType} Schedule: {totalShares.toLocaleString()} shares in {nSlices} slices
        </text>
      </svg>

      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        {algoType === 'TWAP'
          ? 'TWAP: Equal shares per slice. Simple but ignores volume patterns.'
          : 'VWAP: More shares during high-volume periods (open/close). Reduces market impact.'}
      </p>
    </div>
  )
}

export default function TwapVwap() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        TWAP and VWAP Execution on NSE
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        When executing large orders on the NSE, market impact is the primary concern. A single
        market order for 50,000 shares of a Nifty stock can move the price by 0.5-2%, eating into
        strategy profits. TWAP (Time-Weighted Average Price) and VWAP (Volume-Weighted Average
        Price) algorithms slice large orders into smaller child orders, spreading execution over
        time to minimize impact and achieve a benchmark price.
      </p>

      <DefinitionBlock
        title="VWAP (Volume-Weighted Average Price)"
        label="Definition 5.12"
        definition="VWAP is the average price of a security weighted by the volume traded at each price level over a given period. It serves as both a benchmark for execution quality and a trading algorithm that aims to match or beat this benchmark by distributing child orders proportionally to the expected volume profile."
        notation={<>VWAP benchmark: <InlineMath math="\text{VWAP} = \frac{\sum_{t} P_t \cdot V_t}{\sum_{t} V_t}" /> where <InlineMath math="P_t" /> is price and <InlineMath math="V_t" /> is volume at time <InlineMath math="t" />.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        TWAP Algorithm
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        TWAP divides the total order equally across time intervals:
      </p>

      <BlockMath math="q_i = \frac{Q}{N}, \quad i = 1, 2, \ldots, N" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="Q" /> is total order quantity and <InlineMath math="N" /> is the
        number of time slices. Each slice is executed as a limit order near the best bid/ask,
        with optional aggression if the slice is not filled within the time window.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        VWAP Algorithm
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        VWAP distributes the order proportionally to the expected volume profile:
      </p>

      <BlockMath math="q_i = Q \cdot \frac{\hat{v}_i}{\sum_{j=1}^{N} \hat{v}_j}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\hat{v}_i" /> is the predicted volume for interval <InlineMath math="i" />.
        The volume profile is estimated from historical intraday volume data, typically using
        the past 20-30 trading days. On the NSE, the volume profile has a characteristic U-shape:
        high volume at open (9:15-10:00) and close (2:30-3:30), with lower volume during midday.
      </p>

      <TheoremBlock
        title="VWAP Tracking Error"
        label="Theorem 5.12"
        statement={<>The expected tracking error of a VWAP algorithm relative to the market VWAP benchmark is: <BlockMath math="TE = \mathbb{E}\left[\frac{\sum_i q_i P_i^{exec}}{\sum_i q_i} - \text{VWAP}_{market}\right] = \sum_i \frac{\hat{v}_i}{\sum_j \hat{v}_j} \cdot \mathbb{E}[\Delta P_i^{impact}]" /> where <InlineMath math="\Delta P_i^{impact}" /> is the price impact of the child order in interval <InlineMath math="i" />. Minimizing tracking error requires accurate volume prediction and minimizing per-slice impact. The tracking error is bounded by: <InlineMath math="|TE| \leq \frac{Q}{ADV} \cdot \sigma_{daily} \cdot \sqrt{\sum_i \hat{v}_i^2}" />.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        NSE Volume Profile
      </h3>
      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Time (IST)</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">% of Daily Volume</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Characteristics</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">9:15 - 10:00</td>
              <td className="px-5 py-2">~18%</td>
              <td className="px-5 py-2">Opening auction, overnight info processed</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">10:00 - 11:00</td>
              <td className="px-5 py-2">~12%</td>
              <td className="px-5 py-2">European market overlap</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">11:00 - 13:00</td>
              <td className="px-5 py-2">~15%</td>
              <td className="px-5 py-2">Midday lull</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">13:00 - 14:30</td>
              <td className="px-5 py-2">~18%</td>
              <td className="px-5 py-2">Afternoon pickup</td>
            </tr>
            <tr>
              <td className="px-5 py-2">14:30 - 15:30</td>
              <td className="px-5 py-2">~37%</td>
              <td className="px-5 py-2">Closing rush, F&O expiry effects</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveTWAPVWAP />

      <PythonCode
        title="twap_vwap_nse.py"
        runnable
        code={`import numpy as np

# TWAP and VWAP Execution Algorithms for NSE
np.random.seed(42)

# NSE trading parameters
trading_start = 9.25   # 9:15 AM IST
trading_end = 15.5     # 3:30 PM IST
trading_hours = trading_end - trading_start
n_intervals = 75       # 5-minute intervals in trading day

# Historical NSE volume profile (U-shaped)
def generate_volume_profile(n_intervals):
    """Generate typical NSE intraday volume profile."""
    x = np.linspace(0, 1, n_intervals)
    # U-shape: high at open and close, low at midday
    profile = 0.5 * np.exp(-10 * (x - 0.05)**2) + \\
              0.3 * np.exp(-10 * (x - 0.95)**2) + \\
              0.15 + 0.1 * np.random.rand(n_intervals)
    return profile / np.sum(profile)

volume_profile = generate_volume_profile(n_intervals)

# Stock parameters
stock = "HDFC Bank"
price = 1650  # INR
lot_size = 550  # F&O lot size
total_order = 25000  # Shares to buy
adv = 500000  # Average daily volume
participation_rate = total_order / adv

print(f"=== Execution Algorithm Comparison: {stock} ===")
print(f"Order size:        {total_order:,} shares")
print(f"Stock price:       INR {price}")
print(f"Order value:       INR {total_order * price:,.0f}")
print(f"ADV:               {adv:,} shares")
print(f"Participation:     {participation_rate*100:.1f}%")

# Simulate price path
prices = np.zeros(n_intervals)
prices[0] = price
for t in range(1, n_intervals):
    prices[t] = prices[t-1] * (1 + np.random.randn() * 0.002)

# Market volumes per interval
market_volumes = (adv * volume_profile * (1 + np.random.randn(n_intervals) * 0.2)).astype(int)
market_volumes = np.maximum(market_volumes, 100)

# True VWAP benchmark
true_vwap = np.sum(prices * market_volumes) / np.sum(market_volumes)

# TWAP Execution
twap_shares = np.ones(n_intervals) * total_order / n_intervals
twap_fills = np.minimum(twap_shares, market_volumes * 0.1)  # Max 10% participation
twap_remaining = total_order - np.sum(twap_fills)
twap_cost = np.sum(twap_fills * prices * (1 + twap_fills / market_volumes * 0.001))
twap_avg = twap_cost / np.sum(twap_fills)

# VWAP Execution
vwap_shares = total_order * volume_profile
vwap_fills = np.minimum(vwap_shares, market_volumes * 0.1)
vwap_remaining = total_order - np.sum(vwap_fills)
vwap_cost = np.sum(vwap_fills * prices * (1 + vwap_fills / market_volumes * 0.0005))
vwap_avg = vwap_cost / np.sum(vwap_fills)

print(f"\\n{'Metric':<25} {'TWAP':<18} {'VWAP':<18} {'Benchmark':<18}")
print(f"{'Avg exec price':<25} INR {twap_avg:>10.2f}   INR {vwap_avg:>10.2f}   INR {true_vwap:>10.2f}")
print(f"{'Slippage (bps)':<25} {(twap_avg/true_vwap-1)*10000:>10.1f}       {(vwap_avg/true_vwap-1)*10000:>10.1f}")
print(f"{'Shares filled':<25} {np.sum(twap_fills):>10,.0f}       {np.sum(vwap_fills):>10,.0f}")
print(f"{'Fill rate':<25} {np.sum(twap_fills)/total_order*100:>9.1f}%       {np.sum(vwap_fills)/total_order*100:>9.1f}%")
print(f"{'Max participation':<25} {np.max(twap_fills/market_volumes)*100:>9.1f}%       {np.max(vwap_fills/market_volumes)*100:>9.1f}%")

# Implementation shortfall
arrival_price = prices[0]
twap_is = (twap_avg - arrival_price) / arrival_price * 10000
vwap_is = (vwap_avg - arrival_price) / arrival_price * 10000
print(f"\\n{'Impl Shortfall (bps)':<25} {twap_is:>10.1f}       {vwap_is:>10.1f}")

# Cost analysis
print(f"\\n=== Transaction Cost Breakdown (per INR 1 Cr turnover) ===")
costs = {
    'Brokerage (Zerodha)':  0.03,   # 0.03% or INR 20 flat
    'STT (delivery)':       0.10,   # 0.1% buyer side
    'Exchange txn':         0.00345, # NSE charges
    'SEBI turnover fee':    0.0001,
    'GST (18% on brokerage)': 0.0054,
    'Stamp duty':           0.015,
}

total_cost = 0
for name, rate in costs.items():
    cost_inr = rate / 100 * 10000000
    total_cost += rate
    print(f"  {name:<30} {rate:>8.4f}%  INR {cost_inr:>8,.0f}")

print(f"  {'TOTAL':<30} {total_cost:>8.4f}%  INR {total_cost/100*10000000:>8,.0f}")

# Optimal number of slices
print(f"\\n=== Optimal Slicing Analysis ===")
for n in [5, 10, 20, 50, 75]:
    per_slice = total_order / n
    impact_per_slice = (per_slice / adv) * 100 * 0.5  # Simple impact model
    timing_risk = 0.012 * np.sqrt(trading_hours / n) * 100  # Volatility risk
    total_cost_est = impact_per_slice + timing_risk * 0.1
    print(f"N={n:>3}: Slice={per_slice:>6,.0f} shares, "
          f"Impact={impact_per_slice:.2f}bps, "
          f"Timing={timing_risk:.2f}%, "
          f"Total={total_cost_est:.2f}bps")`}
      />

      <ExampleBlock
        title="VWAP Execution Plan"
        difficulty="intermediate"
        problem="You need to buy 20,000 shares of ICICI Bank (price INR 1,050, ADV 400,000). The first hour of trading accounts for 25% of daily volume. How many shares should the VWAP algo execute in the first hour (of 6.25 total trading hours)?"
        solution={[
          {
            step: 'Compute VWAP target for first hour',
            formula: 'q_1 = Q \\times \\frac{v_1}{\\sum v_j} = 20000 \\times 0.25 = 5000 \\text{ shares}',
            explanation: '25% of volume in first hour means 25% of order should execute then.',
          },
          {
            step: 'Check participation rate',
            formula: '\\text{Participation} = \\frac{5000}{400000 \\times 0.25} = 5\\%',
            explanation: '5% participation rate is within acceptable limits (typically < 10%).',
          },
          {
            step: 'Compute expected impact',
            formula: '\\text{Impact} \\approx 0.5 \\times \\sqrt{\\frac{5000}{100000}} = 0.11\\%',
            explanation: 'Using square-root impact model, expected slippage is ~11 bps for this slice.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          TWAP and VWAP are the workhorses of institutional execution on the NSE. TWAP is simpler
          but ignores volume patterns; VWAP matches the market's natural rhythm, reducing impact.
          The NSE's U-shaped volume profile (heavy at open/close) makes VWAP particularly effective.
          For large orders (above 5% of ADV), multi-day VWAP or implementation shortfall algorithms
          are preferred. Always account for India-specific costs: STT, stamp duty, and exchange
          transaction charges.
        </p>
      </NoteBlock>
    </div>
  )
}
