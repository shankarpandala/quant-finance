import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveOrderFlow() {
  const [bucketSize, setBucketSize] = useState(50)
  const [vpinThreshold, setVpinThreshold] = useState(0.7)

  const generateTrades = () => {
    const trades = []
    let price = 22000
    for (let i = 0; i < 300; i++) {
      const informed = Math.random() < 0.15
      const direction = informed ? (Math.random() < 0.5 ? 1 : -1) : (Math.random() < 0.5 ? 1 : -1)
      const volume = informed ? Math.floor(Math.random() * 50 + 30) : Math.floor(Math.random() * 20 + 5)
      price += direction * (Math.random() * 5 + 0.5)
      trades.push({ price, volume, direction, informed })
    }
    return trades
  }

  const [trades] = useState(generateTrades)

  const nBuckets = Math.floor(trades.length / bucketSize)
  const vpinValues = []
  for (let b = 0; b < nBuckets; b++) {
    const bucket = trades.slice(b * bucketSize, (b + 1) * bucketSize)
    const buyVol = bucket.filter(t => t.direction > 0).reduce((s, t) => s + t.volume, 0)
    const sellVol = bucket.filter(t => t.direction < 0).reduce((s, t) => s + t.volume, 0)
    const totalVol = buyVol + sellVol
    const ofi = Math.abs(buyVol - sellVol) / (totalVol || 1)
    vpinValues.push(ofi)
  }

  const chartW = 500
  const chartH = 150

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: VPIN (Volume-Synchronized Probability of Informed Trading)
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust bucket size and alert threshold to monitor order flow toxicity on NSE.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Volume Bucket Size: {bucketSize} trades</span>
          <input type="range" min="20" max="100" step="5" value={bucketSize}
            onChange={e => setBucketSize(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>VPIN Alert Threshold: {vpinThreshold.toFixed(2)}</span>
          <input type="range" min="0.4" max="0.9" step="0.05" value={vpinThreshold}
            onChange={e => setVpinThreshold(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full max-w-2xl mx-auto block">
        <line x1="0" y1={chartH * (1 - vpinThreshold)} x2={chartW} y2={chartH * (1 - vpinThreshold)}
          stroke="#ef4444" strokeWidth="1" strokeDasharray="4" />
        {vpinValues.map((v, i) => {
          const x = (i / (vpinValues.length - 1)) * chartW
          const barW = chartW / vpinValues.length * 0.8
          const barH = v * chartH
          const color = v > vpinThreshold ? '#ef4444' : '#6366f1'
          return <rect key={i} x={x - barW / 2} y={chartH - barH} width={barW} height={barH}
            fill={color} opacity="0.7" rx="1" />
        })}
        <text x={chartW - 5} y={chartH * (1 - vpinThreshold) - 3} textAnchor="end"
          className="text-[9px]" fill="#ef4444">Threshold</text>
      </svg>

      <div className="mt-3 grid grid-cols-3 gap-4 text-center">
        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <p className="text-xs text-gray-500">Avg VPIN</p>
          <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{(vpinValues.reduce((a, b) => a + b, 0) / vpinValues.length).toFixed(3)}</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <p className="text-xs text-gray-500">Max VPIN</p>
          <p className="text-lg font-bold text-red-500">{Math.max(...vpinValues).toFixed(3)}</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <p className="text-xs text-gray-500">Alerts</p>
          <p className="text-lg font-bold text-amber-600">{vpinValues.filter(v => v > vpinThreshold).length}</p>
        </div>
      </div>
    </div>
  )
}

export default function OrderFlow() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Order Flow Imbalance on NSE and VPIN
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Order flow analysis reveals the hidden dynamics of market microstructure -- who is buying,
        who is selling, and whether informed traders are active. On the NSE, analyzing order flow
        imbalance in Nifty futures, Bank Nifty options, and liquid single-stock futures provides
        critical signals for market makers and short-term traders. VPIN (Volume-Synchronized
        Probability of Informed Trading) is a key metric that quantifies order flow toxicity.
      </p>

      <DefinitionBlock
        title="Order Flow Imbalance (OFI)"
        label="Definition 5.8"
        definition="Order flow imbalance measures the net directional pressure in the order book. It is computed as the difference between buy-initiated and sell-initiated volume, normalized by total volume. High OFI indicates one-sided trading pressure, often driven by informed participants."
        notation={<>OFI at time <InlineMath math="t" />: <InlineMath math="\text{OFI}_t = \frac{V_t^{buy} - V_t^{sell}}{V_t^{buy} + V_t^{sell}}" /> where <InlineMath math="V_t^{buy}" /> and <InlineMath math="V_t^{sell}" /> are buy- and sell-initiated volumes.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Trade Classification: The Lee-Ready Algorithm
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        To compute OFI, we must classify each trade as buyer- or seller-initiated. The Lee-Ready
        (1991) algorithm is the standard approach:
      </p>

      <BlockMath math="\text{Direction}_t = \begin{cases} +1 \text{ (buy)} & \text{if } P_t > M_t \text{ (above midpoint)} \\ -1 \text{ (sell)} & \text{if } P_t < M_t \text{ (below midpoint)} \\ \text{sign}(P_t - P_{t-1}) & \text{if } P_t = M_t \text{ (tick test)} \end{cases}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="M_t = (P_t^{bid} + P_t^{ask})/2" /> is the midpoint. For NSE
        tick data, we typically use the best bid and ask from the order book snapshot at the
        time of trade execution.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        VPIN: Volume-Synchronized Probability of Informed Trading
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        VPIN, developed by Easley, Lopez de Prado, and O'Hara (2012), is a flow toxicity metric
        that operates in volume time rather than clock time. This is crucial because informed
        traders cluster their activity in volume bursts.
      </p>

      <BlockMath math="\text{VPIN} = \frac{\sum_{\tau=1}^{n} |V_\tau^{buy} - V_\tau^{sell}|}{n \cdot V_{bucket}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="V_{bucket}" /> is the volume per bucket, <InlineMath math="n" /> is the
        number of buckets in the rolling window, and trade classification uses the bulk volume
        classification (BVC) method:
      </p>

      <BlockMath math="V_\tau^{buy} = V_\tau \cdot \Phi\left(\frac{\Delta P_\tau}{\sigma_{\Delta P}}\right)" />

      <TheoremBlock
        title="VPIN as a Leading Indicator"
        label="Theorem 5.8"
        statement={<>VPIN is a leading indicator of price volatility and market stress. Easley et al. showed that VPIN reached extreme levels before major market events, including the Flash Crash of May 6, 2010. Theoretically, when <InlineMath math="\text{VPIN} \to 1" />, all volume is informed (toxic), indicating maximum adverse selection risk for market makers. When <InlineMath math="\text{VPIN} \to 0" />, trading is balanced between buyers and sellers (non-toxic). A VPIN above the 95th percentile of its historical distribution signals elevated risk.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Kyle's Lambda: Price Impact
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Kyle's lambda measures the permanent price impact of order flow, reflecting the information
        content of trades:
      </p>

      <BlockMath math="\Delta P_t = \lambda \cdot \text{OFI}_t + \epsilon_t" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A higher <InlineMath math="\lambda" /> indicates more informed trading activity, making it
        costlier for market makers. On the NSE, <InlineMath math="\lambda" /> tends to spike around
        quarterly results announcements, RBI policy meetings, and SEBI regulatory changes.
      </p>

      <InteractiveOrderFlow />

      <PythonCode
        title="order_flow_nse.py"
        runnable
        code={`import numpy as np
from scipy.stats import norm

# Order Flow Analysis for NSE Nifty Futures
np.random.seed(42)
n_trades = 5000

# Simulate tick-by-tick trade data
prices = np.zeros(n_trades)
volumes = np.zeros(n_trades)
bid_prices = np.zeros(n_trades)
ask_prices = np.zeros(n_trades)

prices[0] = 22000
spread = 0.5  # Nifty futures tick spread

for t in range(1, n_trades):
    # Informed trading probability varies
    informed_prob = 0.10 + 0.15 * np.sin(2 * np.pi * t / 1000)  # Time-varying
    is_informed = np.random.rand() < informed_prob

    if is_informed:
        direction = 1 if np.random.rand() < 0.6 else -1  # Slight buy bias
        volume = np.random.randint(50, 200)  # Larger orders
    else:
        direction = 1 if np.random.rand() < 0.5 else -1
        volume = np.random.randint(5, 50)

    impact = direction * volume * 0.001  # Price impact
    prices[t] = prices[t-1] + impact + np.random.randn() * 0.5
    volumes[t] = volume
    bid_prices[t] = prices[t] - spread / 2
    ask_prices[t] = prices[t] + spread / 2

# Lee-Ready Trade Classification
midpoints = (bid_prices + ask_prices) / 2
directions = np.zeros(n_trades)

for t in range(1, n_trades):
    if prices[t] > midpoints[t]:
        directions[t] = 1   # Buy
    elif prices[t] < midpoints[t]:
        directions[t] = -1  # Sell
    else:
        directions[t] = np.sign(prices[t] - prices[t-1])  # Tick test

# VPIN Calculation
bucket_volume = 500  # Volume per bucket
n_buckets = 50       # Rolling window

# Fill volume buckets
buckets = []
current_buy = 0
current_sell = 0
current_vol = 0

for t in range(n_trades):
    vol = volumes[t]
    if directions[t] > 0:
        current_buy += vol
    else:
        current_sell += vol
    current_vol += vol

    if current_vol >= bucket_volume:
        buckets.append({
            'buy_vol': current_buy,
            'sell_vol': current_sell,
            'imbalance': abs(current_buy - current_sell),
            'total_vol': current_vol
        })
        current_buy = 0
        current_sell = 0
        current_vol = 0

# Compute rolling VPIN
vpin_values = []
for i in range(n_buckets, len(buckets)):
    window = buckets[i-n_buckets:i]
    vpin = sum(b['imbalance'] for b in window) / sum(b['total_vol'] for b in window)
    vpin_values.append(vpin)

vpin = np.array(vpin_values)

print("=== VPIN Analysis: Nifty 50 Futures ===")
print(f"Total trades analyzed:    {n_trades}")
print(f"Volume buckets created:   {len(buckets)}")
print(f"VPIN observations:        {len(vpin)}")
print(f"\\nVPIN Statistics:")
print(f"  Mean:     {np.mean(vpin):.4f}")
print(f"  Median:   {np.median(vpin):.4f}")
print(f"  Std:      {np.std(vpin):.4f}")
print(f"  P95:      {np.percentile(vpin, 95):.4f}")
print(f"  P99:      {np.percentile(vpin, 99):.4f}")
print(f"  Max:      {np.max(vpin):.4f}")

# Kyle's Lambda estimation
window = 100
ofi = np.zeros(n_trades - window)
price_changes = np.zeros(n_trades - window)

for t in range(window, n_trades):
    w_trades = directions[t-window:t] * volumes[t-window:t]
    ofi[t-window] = np.sum(w_trades)
    price_changes[t-window] = prices[t] - prices[t-window]

from scipy import stats
slope, intercept, r_value, p_value, std_err = stats.linregress(ofi, price_changes)

print(f"\\n=== Kyle's Lambda (Price Impact) ===")
print(f"Lambda:   {slope:.6f} INR per unit OFI")
print(f"R-squared: {r_value**2:.4f}")
print(f"p-value:   {p_value:.6f}")

# Order Flow Imbalance by time of day (simulated)
print(f"\\n=== OFI by Session (NSE Trading Hours) ===")
session_names = ['Opening (9:15-10:00)', 'Morning (10:00-12:00)',
                 'Afternoon (12:00-14:00)', 'Closing (14:00-15:30)']
session_ofi = [0.15, 0.08, 0.05, 0.12]  # Typical OFI magnitudes
for name, ofi_val in zip(session_names, session_ofi):
    print(f"  {name:<25} Avg |OFI|: {ofi_val:.2f}")

print(f"\\nNote: Opening and closing sessions show highest OFI")
print(f"due to overnight information and closing auction dynamics.")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Order Flow Signals on NSE
      </h3>
      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Signal</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Interpretation</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">High VPIN + Rising price</td>
              <td className="px-5 py-2">Strong informed buying</td>
              <td className="px-5 py-2">Widen ask, follow momentum</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">High VPIN + Falling price</td>
              <td className="px-5 py-2">Informed selling / liquidation</td>
              <td className="px-5 py-2">Widen bid, reduce long exposure</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Low VPIN</td>
              <td className="px-5 py-2">Balanced, uninformed flow</td>
              <td className="px-5 py-2">Tighten spreads, collect spread income</td>
            </tr>
            <tr>
              <td className="px-5 py-2">VPIN spike before event</td>
              <td className="px-5 py-2">Information leakage</td>
              <td className="px-5 py-2">Pull quotes, reduce exposure</td>
            </tr>
          </tbody>
        </table>
      </div>

      <ExampleBlock
        title="VPIN Calculation"
        difficulty="intermediate"
        problem="In 5 volume buckets of 1000 contracts each, the buy/sell classifications are: (600,400), (700,300), (450,550), (800,200), (500,500). Calculate VPIN."
        solution={[
          {
            step: 'Compute absolute imbalance per bucket',
            formula: '|V^B - V^S| = |200|, |400|, |100|, |600|, |0| = 200, 400, 100, 600, 0',
          },
          {
            step: 'Sum imbalances',
            formula: '\\sum |V^B_\\tau - V^S_\\tau| = 200 + 400 + 100 + 600 + 0 = 1300',
          },
          {
            step: 'Compute VPIN',
            formula: '\\text{VPIN} = \\frac{1300}{5 \\times 1000} = 0.26',
            explanation: 'VPIN of 0.26 indicates moderate flow toxicity. If P95 threshold is 0.40, this is within normal range.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Order flow analysis is essential for market makers and short-term traders on the NSE.
          VPIN quantifies the probability of informed trading in volume time, serving as an
          early warning system for market stress. Kyle's lambda measures price impact and helps
          set appropriate bid-ask spreads. On the NSE, order flow toxicity tends to spike during
          quarterly earnings, RBI announcements, and FII rebalancing days.
        </p>
      </NoteBlock>
    </div>
  )
}
