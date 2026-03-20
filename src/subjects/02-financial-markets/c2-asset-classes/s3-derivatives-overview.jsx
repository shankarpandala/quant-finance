import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveOptionsPayoff() {
  const [strikePrice, setStrikePrice] = useState(20000)
  const [premium, setPremium] = useState(200)
  const [optionType, setOptionType] = useState('call')
  const [position, setPosition] = useState('long')

  const spots = Array.from({ length: 41 }, (_, i) => strikePrice - 2000 + i * 100)
  const payoffs = spots.map(s => {
    let intrinsic = optionType === 'call' ? Math.max(s - strikePrice, 0) : Math.max(strikePrice - s, 0)
    let pnl = position === 'long' ? intrinsic - premium : premium - intrinsic
    return { spot: s, pnl }
  })

  const chartW = 500, chartH = 200
  const padL = 55, padR = 15, padT = 20, padB = 35
  const plotW = chartW - padL - padR, plotH = chartH - padT - padB
  const minPnl = Math.min(...payoffs.map(p => p.pnl))
  const maxPnl = Math.max(...payoffs.map(p => p.pnl))
  const range = Math.max(maxPnl - minPnl, 1)
  const toX = (s) => padL + ((s - spots[0]) / (spots[spots.length - 1] - spots[0])) * plotW
  const toY = (p) => padT + plotH - ((p - minPnl) / range) * plotH
  const pathD = payoffs.map((p, i) => `${i === 0 ? 'M' : 'L'}${toX(p.spot).toFixed(1)},${toY(p.pnl).toFixed(1)}`).join(' ')

  const maxProfit = position === 'long'
    ? (optionType === 'call' ? 'Unlimited' : `INR ${(strikePrice - premium).toFixed(0)}`)
    : `INR ${premium}`
  const maxLoss = position === 'long'
    ? `INR ${premium}`
    : (optionType === 'call' ? 'Unlimited' : `INR ${(strikePrice - premium).toFixed(0)}`)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Nifty Option Payoff Diagram
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Visualize P&L at expiry for Nifty options. Adjust strike, premium, type, and position.
      </p>
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Strike: {strikePrice}</span>
          <input type="range" min="18000" max="22000" step="100" value={strikePrice}
            onChange={e => setStrikePrice(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Premium: INR {premium}</span>
          <input type="range" min="50" max="800" step="10" value={premium}
            onChange={e => setPremium(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <select value={optionType} onChange={e => setOptionType(e.target.value)}
          className="rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
          <option value="call">Call</option>
          <option value="put">Put</option>
        </select>
        <select value={position} onChange={e => setPosition(e.target.value)}
          className="rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
          <option value="long">Long (Buy)</option>
          <option value="short">Short (Sell)</option>
        </select>
      </div>
      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full max-w-xl mx-auto block">
        <line x1={padL} y1={padT + plotH} x2={padL + plotW} y2={padT + plotH} stroke="#9ca3af" strokeWidth="1" />
        <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke="#9ca3af" strokeWidth="1" />
        <line x1={padL} y1={toY(0)} x2={padL + plotW} y2={toY(0)} stroke="#9ca3af" strokeWidth="0.5" strokeDasharray="4,3" />
        <path d={pathD} fill="none" stroke={position === 'long' ? '#22c55e' : '#ef4444'} strokeWidth="2.5" />
        <line x1={toX(strikePrice)} y1={padT} x2={toX(strikePrice)} y2={padT + plotH}
          stroke="#6366f1" strokeWidth="1" strokeDasharray="3,3" />
        <text x={padL + plotW / 2} y={chartH - 4} textAnchor="middle" className="text-[10px]" fill="#6b7280">Nifty at Expiry</text>
      </svg>
      <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded bg-green-50 p-2 dark:bg-green-900/30">
          <div className="text-green-600 dark:text-green-400">Max Profit</div>
          <div className="font-bold text-green-700 dark:text-green-300">{maxProfit}</div>
        </div>
        <div className="rounded bg-red-50 p-2 dark:bg-red-900/30">
          <div className="text-red-600 dark:text-red-400">Max Loss</div>
          <div className="font-bold text-red-700 dark:text-red-300">{maxLoss}</div>
        </div>
        <div className="rounded bg-gray-50 p-2 dark:bg-gray-800">
          <div className="text-gray-500">Breakeven</div>
          <div className="font-bold text-gray-700 dark:text-gray-300">
            {optionType === 'call' ? strikePrice + premium : strikePrice - premium}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DerivativesOverview() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Indian Derivatives: Nifty and Bank Nifty F&O
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        India has one of the world's most active derivatives markets. The NSE's F&O segment
        trades Nifty 50, Bank Nifty, Nifty Financial Services, and individual stock futures
        and options. Understanding lot sizes, margin requirements, and settlement mechanics
        is essential for quantitative derivatives strategies.
      </p>

      <DefinitionBlock
        title="Index Futures and Options on NSE"
        label="Definition 3.1"
        definition={<>
          A Nifty futures contract obligates the buyer to purchase the Nifty 50 index at a
          specified price on expiry. Nifty options give the right (not obligation) to buy
          (call) or sell (put) at the strike price. NSE offers weekly and monthly expiry
          contracts. The lot size for Nifty is 25 units (notional ~INR 5 lakh), and Bank
          Nifty is 15 units.
        </>}
        notation={<>
          Futures pricing: <InlineMath math="F = S \cdot e^{(r-q)T}" /> where{' '}
          <InlineMath math="r" /> is the risk-free rate (RBI repo) and{' '}
          <InlineMath math="q" /> is the dividend yield.
        </>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        F&O Contract Specifications
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Contract</th>
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Lot Size</th>
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Tick Size</th>
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Expiry</th>
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Margin (Approx)</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2 font-medium">Nifty Futures</td>
              <td className="px-3 py-2">25</td>
              <td className="px-3 py-2">INR 0.05</td>
              <td className="px-3 py-2">Monthly (last Thu)</td>
              <td className="px-3 py-2">~INR 1.2L</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2 font-medium">Nifty Options</td>
              <td className="px-3 py-2">25</td>
              <td className="px-3 py-2">INR 0.05</td>
              <td className="px-3 py-2">Weekly (Thu)</td>
              <td className="px-3 py-2">Premium</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2 font-medium">Bank Nifty Futures</td>
              <td className="px-3 py-2">15</td>
              <td className="px-3 py-2">INR 0.05</td>
              <td className="px-3 py-2">Monthly</td>
              <td className="px-3 py-2">~INR 1.5L</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2 font-medium">Bank Nifty Options</td>
              <td className="px-3 py-2">15</td>
              <td className="px-3 py-2">INR 0.05</td>
              <td className="px-3 py-2">Weekly (Wed)</td>
              <td className="px-3 py-2">Premium</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-medium">Stock Futures</td>
              <td className="px-3 py-2">Varies</td>
              <td className="px-3 py-2">INR 0.05</td>
              <td className="px-3 py-2">Monthly</td>
              <td className="px-3 py-2">~20-30% of notional</td>
            </tr>
          </tbody>
        </table>
      </div>

      <TheoremBlock
        title="Put-Call Parity for Nifty Options"
        label="Theorem 3.1"
        statement={<>
          For European-style Nifty options (cash-settled):
          <BlockMath math="C - P = S \cdot e^{-qT} - K \cdot e^{-rT}" />
          where <InlineMath math="C" /> and <InlineMath math="P" /> are call and put prices,{' '}
          <InlineMath math="S" /> is the Nifty spot, <InlineMath math="K" /> is the strike,{' '}
          <InlineMath math="r" /> is the RBI rate, <InlineMath math="q" /> is the dividend
          yield, and <InlineMath math="T" /> is time to expiry. Violations of put-call parity
          create arbitrage opportunities (box spreads).
        </>}
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The margin system on NSE uses SPAN (Standard Portfolio Analysis of Risk) plus an
        exposure margin. SPAN computes the worst-case portfolio loss across 16 scenario
        combinations of price moves and volatility changes:
      </p>

      <BlockMath math="\text{SPAN Margin} = \max_{i=1}^{16} \left(\sum_j \Delta V_j^{(i)}\right)" />

      <InteractiveOptionsPayoff />

      <NoteBlock title="Weekly Expiry Revolution" type="info">
        <p>
          The introduction of weekly Nifty options (2019) and Bank Nifty options transformed
          the Indian derivatives landscape. Weekly options now account for over 90% of total
          option volume on NSE. Popular quant strategies include: (1) short straddles/strangles
          on Thursday expiry, (2) iron condors with weekly hedges, (3) dispersion trading
          between index and stock options. SEBI has restricted weekly expiry contracts to
          one per exchange per index to curb excessive speculation.
        </p>
      </NoteBlock>

      <PythonCode
        title="nifty_fo_analysis.py"
        runnable
        code={`import numpy as np
from scipy.stats import norm

# --- Nifty F&O Contract Analysis ---
nifty_spot = 20000
lot_size = 25
rf = 0.065       # RBI repo rate
div_yield = 0.012  # Nifty dividend yield ~1.2%

# Futures fair value
T_monthly = 30 / 365
futures_fair = nifty_spot * np.exp((rf - div_yield) * T_monthly)
print("=== Nifty Futures Analysis ===")
print(f"Spot: {nifty_spot}")
print(f"Fair value (30-day): {futures_fair:.2f}")
print(f"Basis: {futures_fair - nifty_spot:.2f} points ({(futures_fair/nifty_spot - 1)*100:.3f}%)")
print(f"Notional per lot: INR {nifty_spot * lot_size:,}")
print()

# Options analysis
sigma = 0.14  # India VIX ~14%
K = 20000
T = 7 / 365  # Weekly expiry

d1 = (np.log(nifty_spot / K) + (rf - div_yield + 0.5 * sigma**2) * T) / (sigma * np.sqrt(T))
d2 = d1 - sigma * np.sqrt(T)
call = nifty_spot * np.exp(-div_yield * T) * norm.cdf(d1) - K * np.exp(-rf * T) * norm.cdf(d2)
put = K * np.exp(-rf * T) * norm.cdf(-d2) - nifty_spot * np.exp(-div_yield * T) * norm.cdf(-d1)

print("=== Weekly ATM Options (7 DTE) ===")
print(f"Call premium: INR {call:.2f} per unit (INR {call * lot_size:.0f} per lot)")
print(f"Put premium:  INR {put:.2f} per unit (INR {put * lot_size:.0f} per lot)")
print(f"Straddle:     INR {call + put:.2f} ({(call + put)/nifty_spot*100:.2f}%)")
print()

# Expected move from straddle
expected_move = (call + put) * 0.85  # empirical adjustment
print(f"Expected weekly move: +/- {expected_move:.0f} points ({expected_move/nifty_spot*100:.2f}%)")

# Option chain
print("\\n=== Nifty Option Chain (7 DTE) ===")
print(f"{'Strike':>8} {'Call':>8} {'Put':>8} {'IV':>6} {'Delta':>7}")
for k in range(19500, 20600, 100):
    d1_k = (np.log(nifty_spot / k) + (rf - div_yield + 0.5 * sigma**2) * T) / (sigma * np.sqrt(T))
    d2_k = d1_k - sigma * np.sqrt(T)
    c = nifty_spot * np.exp(-div_yield * T) * norm.cdf(d1_k) - k * np.exp(-rf * T) * norm.cdf(d2_k)
    p = k * np.exp(-rf * T) * norm.cdf(-d2_k) - nifty_spot * np.exp(-div_yield * T) * norm.cdf(-d1_k)
    delta = norm.cdf(d1_k)
    moneyness = 'ATM' if abs(k - nifty_spot) < 50 else ('ITM' if k < nifty_spot else 'OTM')
    print(f"{k:>8} {c:>8.2f} {p:>8.2f} {sigma*100:>5.1f}% {delta:>7.3f} {moneyness}")

# Transaction costs
print("\\n=== F&O Transaction Costs (per lot) ===")
brokerage = 20  # Zerodha flat fee
stt_options = call * lot_size * 0.000625  # STT on sell side
stamp = call * lot_size * 0.00003
sebi = call * lot_size * 0.000001
gst = brokerage * 0.18
total = brokerage + stt_options + stamp + sebi + gst
print(f"Brokerage:  INR {brokerage:.2f}")
print(f"STT:        INR {stt_options:.2f}")
print(f"GST:        INR {gst:.2f}")
print(f"Total:      INR {total:.2f} ({total/(call*lot_size)*100:.2f}% of premium)")`}
      />

      <ExampleBlock
        title="Computing Nifty Futures Basis"
        difficulty="beginner"
        problem="Nifty spot is at 20,000 with RBI repo rate 6.5% and dividend yield 1.2%. What should the 1-month Nifty futures trade at?"
        solution={[
          {
            step: 'Apply cost-of-carry model',
            formula: 'F = S \\cdot e^{(r-q)T} = 20000 \\times e^{(0.065 - 0.012) \\times 30/365}',
          },
          {
            step: 'Compute',
            formula: 'F = 20000 \\times e^{0.00436} = 20000 \\times 1.00437 = 20,087',
            explanation: 'The futures should trade approximately 87 points above spot. This 87-point basis represents the net cost of carry (interest minus dividends). If the actual futures trade higher, it signals bullish sentiment; if lower, bearish.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Indian derivatives, particularly Nifty and Bank Nifty options, offer exceptional
          liquidity and tight spreads for quantitative strategies. Key features: (1) weekly
          expiry enables short-term strategies, (2) SPAN margin system requires careful
          capital management, (3) STT on sell side of options adds friction, (4) European-style
          exercise simplifies pricing. The options market provides rich data for implied
          volatility analysis, skew trading, and dispersion strategies.
        </p>
      </NoteBlock>
    </div>
  )
}
