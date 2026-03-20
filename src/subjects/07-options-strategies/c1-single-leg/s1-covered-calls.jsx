import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveCoveredCall() {
  const [spot, setSpot] = useState(2500)
  const [strike, setStrike] = useState(2600)
  const [premium, setPremium] = useState(45)
  const [buyPrice, setBuyPrice] = useState(2500)

  const expiryPrices = Array.from({ length: 41 }, (_, i) => 2200 + i * 20)
  const stockPnl = expiryPrices.map(s => s - buyPrice)
  const callPnl = expiryPrices.map(s => premium - Math.max(s - strike, 0))
  const totalPnl = expiryPrices.map((_, i) => stockPnl[i] + callPnl[i])

  const maxProfit = strike - buyPrice + premium
  const breakeven = buyPrice - premium

  const chartW = 480
  const chartH = 160
  const padL = 50
  const allPnl = [...stockPnl, ...totalPnl]
  const maxP = Math.max(...allPnl)
  const minP = Math.min(...allPnl)

  const toY = (v) => chartH + 5 - ((v - minP) / (maxP - minP)) * chartH
  const toX = (i) => padL + (i / (expiryPrices.length - 1)) * (chartW - padL)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Covered Call Payoff (Reliance Industries)
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust strike price and premium received. Stock bought at {buyPrice}.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Strike = {strike}</span>
          <input type="range" min="2400" max="2800" step="50" value={strike}
            onChange={e => setStrike(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Premium = INR {premium}</span>
          <input type="range" min="10" max="100" step="5" value={premium}
            onChange={e => setPremium(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Entry Price = {buyPrice}</span>
          <input type="range" min="2300" max="2700" step="10" value={buyPrice}
            onChange={e => setBuyPrice(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox={`0 0 ${chartW + 20} ${chartH + 40}`}
        className="w-full max-w-2xl mx-auto block" aria-label="Covered call payoff">
        <line x1={padL} y1={5} x2={padL} y2={chartH + 5} stroke="#9ca3af" strokeWidth="1" />
        <line x1={padL} y1={toY(0)} x2={chartW + 10} y2={toY(0)} stroke="#9ca3af" strokeWidth="1" strokeDasharray="3" />

        {/* Stock only */}
        <polyline points={stockPnl.map((p, i) => `${toX(i)},${toY(p)}`).join(' ')}
          fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4" />
        {/* Covered call */}
        <polyline points={totalPnl.map((p, i) => `${toX(i)},${toY(p)}`).join(' ')}
          fill="none" stroke="#6366f1" strokeWidth="2.5" />

        <text x={chartW - 20} y={toY(stockPnl[stockPnl.length - 1]) - 5} className="text-[9px]" fill="#94a3b8">Stock only</text>
        <text x={chartW - 30} y={toY(totalPnl[totalPnl.length - 1]) + 12} className="text-[9px]" fill="#6366f1">Covered call</text>
        <text x={padL + chartW / 2} y={chartH + 30} textAnchor="middle" className="text-[10px]" fill="#9ca3af">Expiry Price</text>
      </svg>

      <div className="mt-3 grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Max Profit</div>
          <div className="text-lg font-bold text-green-600 dark:text-green-400">INR {maxProfit}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Breakeven</div>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{breakeven}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Max Loss</div>
          <div className="text-lg font-bold text-red-600 dark:text-red-400">{breakeven} (to 0)</div>
        </div>
      </div>
    </div>
  )
}

export default function CoveredCalls() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Covered Calls
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        A covered call is the most fundamental options strategy: own the underlying stock and sell
        a call option against it. On NSE, this is widely used by retail investors holding blue-chip
        stocks like Reliance Industries, TCS, and HDFC Bank to generate additional income from
        their equity holdings. SEBI allows covered call writing in both cash and F&O segments.
      </p>

      <DefinitionBlock
        title="Covered Call"
        label="Definition 7.1"
        definition="A covered call consists of a long position in the underlying stock (or equivalent) combined with a short call option on the same stock. The stock 'covers' the obligation to deliver shares if the call is exercised. It is a mildly bullish to neutral strategy."
        notation="\text{P\&L} = (S_T - S_0) + [c - \max(S_T - K, 0)]"
      />

      <BlockMath math="\text{Covered Call P\&L} = \begin{cases} S_T - S_0 + c & \text{if } S_T \leq K \\ K - S_0 + c & \text{if } S_T > K \end{cases}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The strategy has a capped upside (at the strike price plus premium received) but provides
        downside cushion equal to the premium collected. The maximum profit occurs when the stock
        closes exactly at or above the strike price at expiry.
      </p>

      <BlockMath math="\text{Max Profit} = K - S_0 + c, \quad \text{Breakeven} = S_0 - c" />

      <TheoremBlock
        title="Covered Call as Short Put Equivalence"
        label="Theorem 7.1"
        statement="By put-call parity, a covered call (long stock + short call) is synthetically equivalent to a short put at the same strike plus a risk-free bond position: S - C = Ke^{-rT} - P. This means the risk profile of a covered call is identical to selling a cash-secured put."
        proof="From put-call parity C - P = S - Ke^{-rT}. Rearranging: S - C = Ke^{-rT} - P. The left side is the covered call position (long stock, short call). The right side is a short put plus bond. Thus both positions have identical terminal payoffs."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Strike Selection on NSE
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The choice of strike price determines the strategy's risk-return tradeoff:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Strike</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Premium</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Upside Cap</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Protection</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Best When</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Deep ITM</td>
              <td className="px-4 py-2">High</td>
              <td className="px-4 py-2">Very low</td>
              <td className="px-4 py-2">Maximum</td>
              <td className="px-4 py-2">Bearish / exiting</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">ATM</td>
              <td className="px-4 py-2">Medium</td>
              <td className="px-4 py-2">Moderate</td>
              <td className="px-4 py-2">Moderate</td>
              <td className="px-4 py-2">Neutral</td>
            </tr>
            <tr>
              <td className="px-4 py-2">OTM</td>
              <td className="px-4 py-2">Low</td>
              <td className="px-4 py-2">High</td>
              <td className="px-4 py-2">Minimal</td>
              <td className="px-4 py-2">Mildly bullish</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveCoveredCall />

      <PythonCode
        title="covered_call_analysis.py"
        runnable
        code={`import numpy as np

def covered_call_pnl(S_entry, strike, premium, S_exit):
    """Compute covered call P&L per share."""
    stock_pnl = S_exit - S_entry
    call_pnl = premium - np.maximum(S_exit - strike, 0)
    return stock_pnl + call_pnl

# Example: Reliance Industries covered call on NSE
S_entry = 2500     # Bought Reliance at 2500
lot_size = 250     # NSE F&O lot size for RELIANCE
strikes = [2550, 2600, 2650, 2700]
premiums = [68, 42, 25, 14]  # Approximate premiums

print("=== Reliance Industries Covered Call Analysis ===")
print(f"Entry Price: INR {S_entry} | Lot Size: {lot_size}")
print()

for K, c in zip(strikes, premiums):
    max_profit = (K - S_entry + c) * lot_size
    breakeven = S_entry - c
    yield_pct = c / S_entry * 100
    upside_cap = (K - S_entry) / S_entry * 100

    print(f"Strike {K} | Premium: INR {c}")
    print(f"  Max Profit/lot: INR {max_profit:,.0f}")
    print(f"  Breakeven: INR {breakeven:.0f}")
    print(f"  Premium Yield: {yield_pct:.1f}% (monthly)")
    print(f"  Annualized: {yield_pct * 12:.1f}%")
    print(f"  Upside Cap: {upside_cap:.1f}%")
    print()

# Monthly covered call income simulation
print("=== 12-Month Covered Call Simulation (Reliance) ===")
np.random.seed(42)
monthly_returns = np.random.normal(0.01, 0.06, 12)  # ~12% annual, 20% vol
S = S_entry
total_premium = 0
total_pnl = 0

for month, ret in enumerate(monthly_returns, 1):
    S_new = S * (1 + ret)
    K = S * 1.03  # 3% OTM call
    c = S * 0.015  # ~1.5% monthly premium
    pnl = covered_call_pnl(S, K, c, S_new)
    total_premium += c
    total_pnl += pnl

    assigned = S_new > K
    print(f"Month {month:>2}: S={S:.0f} -> {S_new:.0f} | "
          f"K={K:.0f} | Premium={c:.0f} | "
          f"P&L={pnl:.0f} | {'ASSIGNED' if assigned else 'expired'}")

    S = min(S_new, K) if assigned else S_new

print(f"\\nTotal Premium Collected: INR {total_premium:,.0f}")
print(f"Total P&L: INR {total_pnl:,.0f}")
print(f"Buy-Hold P&L: INR {S_entry*(np.prod(1+monthly_returns)-1):,.0f}")`}
      />

      <ExampleBlock
        title="Monthly Covered Call on HDFC Bank"
        difficulty="beginner"
        problem="You hold 550 shares of HDFC Bank (1 lot) bought at INR 1650. You sell the 1700 CE for INR 22 with 25 days to expiry. Calculate max profit, breakeven, and annualized yield."
        solution={[
          {
            step: 'Maximum profit per share',
            formula: '\\text{Max Profit} = K - S_0 + c = 1700 - 1650 + 22 = 72',
          },
          {
            step: 'Maximum profit per lot',
            formula: '72 \\times 550 = \\text{INR } 39,600',
          },
          {
            step: 'Breakeven',
            formula: '\\text{BE} = S_0 - c = 1650 - 22 = 1628',
          },
          {
            step: 'Annualized premium yield',
            formula: '\\text{Yield} = \\frac{22}{1650} \\times \\frac{365}{25} \\times 100 = 19.5\\%',
            explanation: 'This 19.5% annualized yield assumes consistent monthly covered call writing, which is aggressive for HDFC Bank.',
          },
        ]}
      />

      <NoteBlock title="Tax Implications in India" type="tip">
        <p>
          Under Indian tax law, covered call premium received is treated as business income (taxed
          at slab rate) if you are a frequent trader. If classified as a capital gain, short-term
          capital gains tax of 15% applies for F&O profits. The assignment of shares triggers
          capital gains on the stock sale. Consult a CA for the optimal classification. Zerodha
          provides a P&L report that separates F&O and equity segments for tax filing.
        </p>
      </NoteBlock>

      <NoteBlock title="Assignment Risk on NSE" type="warning">
        <p>
          Unlike US-style options, most NSE stock options are European-style (no early exercise).
          However, physical delivery applies to all stock F&O contracts on NSE since October 2019
          per SEBI mandate. If your short call expires ITM, you must deliver the shares. Ensure
          you have the shares in your demat account. Margin requirements increase in the last
          few days before expiry for physically settled contracts.
        </p>
      </NoteBlock>
    </div>
  )
}
