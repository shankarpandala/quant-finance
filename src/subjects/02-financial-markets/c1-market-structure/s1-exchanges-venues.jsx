import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveMarketHours() {
  const [currentHour, setCurrentHour] = useState(10.5)
  const [selectedExchange, setSelectedExchange] = useState('all')

  const exchanges = [
    { name: 'NSE/BSE Equity', open: 9.25, close: 15.5, preOpen: 9.0, color: '#6366f1', segment: 'equity' },
    { name: 'NSE/BSE F&O', open: 9.25, close: 15.5, preOpen: 9.0, color: '#8b5cf6', segment: 'fo' },
    { name: 'MCX Commodity', open: 9.0, close: 23.5, preOpen: 8.75, color: '#f59e0b', segment: 'commodity' },
    { name: 'NSE Currency', open: 9.0, close: 17.0, preOpen: 8.75, color: '#22c55e', segment: 'currency' },
    { name: 'SGX Nifty', open: 6.5, close: 23.75, preOpen: 6.25, color: '#ef4444', segment: 'sgx' },
  ]

  const chartW = 520, chartH = 200
  const padL = 120, padR = 15, padT = 20, padB = 35
  const plotW = chartW - padL - padR, plotH = chartH - padT - padB
  const minHour = 6, maxHour = 24
  const toX = (h) => padL + ((h - minHour) / (maxHour - minHour)) * plotW

  const filtered = selectedExchange === 'all' ? exchanges : exchanges.filter(e => e.segment === selectedExchange)
  const rowH = plotH / filtered.length
  const barH = rowH * 0.6

  const isOpen = (exc) => currentHour >= exc.open && currentHour <= exc.close

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Indian Market Trading Hours (IST)
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Explore trading hours across Indian exchanges. Move the time slider to see which
        markets are open at any given time.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Time (IST): {Math.floor(currentHour)}:{String(Math.round((currentHour % 1) * 60)).padStart(2, '0')}</span>
          <input type="range" min="6" max="24" step="0.25" value={currentHour}
            onChange={e => setCurrentHour(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Filter</span>
          <select value={selectedExchange} onChange={e => setSelectedExchange(e.target.value)}
            className="rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
            <option value="all">All Exchanges</option>
            <option value="equity">Equity</option>
            <option value="fo">F&O</option>
            <option value="commodity">MCX</option>
            <option value="currency">Currency</option>
            <option value="sgx">SGX Nifty</option>
          </select>
        </label>
      </div>

      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full max-w-xl mx-auto block">
        {/* Time marker */}
        <line x1={toX(currentHour)} y1={padT - 5} x2={toX(currentHour)} y2={padT + plotH + 5}
          stroke="#ef4444" strokeWidth="2" strokeDasharray="4,2" />

        {/* Hour labels */}
        {[6, 8, 10, 12, 14, 16, 18, 20, 22, 24].map(h => (
          <text key={h} x={toX(h)} y={chartH - 8} textAnchor="middle" className="text-[8px]" fill="#6b7280">{h}:00</text>
        ))}

        {filtered.map((exc, i) => {
          const y = padT + i * rowH + rowH / 2
          const open = isOpen(exc)
          return (
            <g key={exc.name}>
              <text x={padL - 5} y={y + 3} textAnchor="end" className="text-[9px]" fill={open ? exc.color : '#9ca3af'}>
                {exc.name}
              </text>
              {/* Pre-open */}
              <rect x={toX(exc.preOpen)} y={y - barH / 2} width={toX(exc.open) - toX(exc.preOpen)} height={barH}
                fill={exc.color} opacity="0.2" rx="2" />
              {/* Main session */}
              <rect x={toX(exc.open)} y={y - barH / 2} width={toX(exc.close) - toX(exc.open)} height={barH}
                fill={exc.color} opacity={open ? 0.7 : 0.3} rx="2" />
              {open && <circle cx={toX(currentHour)} cy={y} r="4" fill={exc.color} />}
            </g>
          )
        })}
      </svg>

      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        At {Math.floor(currentHour)}:{String(Math.round((currentHour % 1) * 60)).padStart(2, '0')} IST,{' '}
        <strong>{exchanges.filter(e => isOpen(e)).length}</strong> of {exchanges.length} markets are open.
      </p>
    </div>
  )
}

export default function ExchangesVenues() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Indian Exchanges and Trading Venues
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        India's financial markets operate through a well-regulated exchange infrastructure
        overseen by SEBI (Securities and Exchange Board of India). Understanding the structure,
        rules, and mechanics of Indian exchanges is foundational for any quantitative trader.
      </p>

      {/* --- NSE --- */}
      <DefinitionBlock
        title="National Stock Exchange (NSE)"
        label="Definition 1.1"
        definition={<>
          The NSE is India's largest stock exchange by trading volume, established in 1992.
          It operates a fully electronic limit order book (CLOB) with the NEAT
          (National Exchange for Automated Trading) system. Key indices include the Nifty 50,
          Nifty Bank, and Nifty IT. The NSE handles approximately 85-90% of equity derivative
          trading in India.
        </>}
        notation={<>
          Trading hours: 9:15 AM -- 3:30 PM IST (equity). Pre-open session: 9:00 -- 9:15 AM.
          Settlement: T+1 for equities (since 2023).
        </>}
      />

      {/* --- BSE --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Bombay Stock Exchange (BSE)
      </h3>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The BSE, established in 1875, is Asia's oldest stock exchange. Its flagship index is
        the Sensex (S&P BSE 30). While the BSE lists more companies (5,000+), the NSE
        dominates in liquidity and derivative volumes. The BSE runs the BOLT (BSE Online
        Trading) system.
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Feature</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">NSE</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">BSE</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">MCX</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">Founded</td>
              <td className="px-4 py-2">1992</td>
              <td className="px-4 py-2">1875</td>
              <td className="px-4 py-2">2003</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">Key Index</td>
              <td className="px-4 py-2">Nifty 50</td>
              <td className="px-4 py-2">Sensex</td>
              <td className="px-4 py-2">MCX iCOMDEX</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">Segments</td>
              <td className="px-4 py-2">Equity, F&O, Currency, Debt</td>
              <td className="px-4 py-2">Equity, F&O, Currency, MF</td>
              <td className="px-4 py-2">Commodity futures/options</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">Trading System</td>
              <td className="px-4 py-2">NEAT</td>
              <td className="px-4 py-2">BOLT</td>
              <td className="px-4 py-2">Proprietary</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">Listed Companies</td>
              <td className="px-4 py-2">~2,100</td>
              <td className="px-4 py-2">~5,500</td>
              <td className="px-4 py-2">~50 commodities</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-medium">Settlement</td>
              <td className="px-4 py-2">T+1</td>
              <td className="px-4 py-2">T+1</td>
              <td className="px-4 py-2">T+1 to T+5</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- Market Microstructure --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Market Microstructure: How Indian Exchanges Work
      </h3>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Indian exchanges operate a <strong>Central Limit Order Book (CLOB)</strong> model.
        All orders are visible in the order book, and matching follows strict price-time
        priority. Unlike US markets with fragmented venues, Indian equity trading is
        concentrated on NSE and BSE, with no payment for order flow (PFOF), no dark pools
        for retail, and minimal fragmentation.
      </p>

      <BlockMath math="\text{Best Bid} \leq \text{Last Traded Price} \leq \text{Best Ask}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The bid-ask spread for Nifty 50 stocks is typically 1-3 basis points (bps) during
        regular hours, widening during the pre-open session and near close. The spread can
        be modeled as:
      </p>

      <BlockMath math="\text{Spread} = 2 \times (\text{Adverse Selection Cost} + \text{Inventory Cost} + \text{Order Processing Cost})" />

      <NoteBlock title="SEBI's Role in Market Structure" type="info">
        <p>
          SEBI regulates all Indian exchanges and enforces rules on: (1) circuit breakers
          (10%/15%/20% for individual stocks, market-wide halts), (2) position limits for
          F&O, (3) margin requirements (SPAN + exposure margin), (4) algo trading regulations
          (co-location, order-to-trade ratio), and (5) short selling rules (only permitted
          for institutional investors with stock borrowing). Since 2023, equity settlement
          moved to T+1 from T+2, one of the fastest globally.
        </p>
      </NoteBlock>

      {/* --- Interactive --- */}
      <InteractiveMarketHours />

      {/* --- Pre-open Session --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Pre-Open Session and Price Discovery
      </h3>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        NSE's pre-open session (9:00 -- 9:15 AM) uses a call auction mechanism to determine
        the opening price:
      </p>

      <ol className="ml-6 list-decimal space-y-1 text-sm text-gray-700 dark:text-gray-300">
        <li><strong>9:00 -- 9:08:</strong> Order entry, modification, cancellation allowed</li>
        <li><strong>9:08 -- 9:12:</strong> Order matching -- equilibrium price determined</li>
        <li><strong>9:12 -- 9:15:</strong> Buffer for transition to continuous trading</li>
      </ol>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The equilibrium price maximizes the total quantity traded:
      </p>

      <BlockMath math="p^* = \arg\max_p \min\!\left(\sum_{i: b_i \geq p} q_i^{\text{buy}}, \sum_{j: a_j \leq p} q_j^{\text{sell}}\right)" />

      {/* --- Python Code --- */}
      <PythonCode
        title="exchange_data_exploration.py"
        runnable
        code={`import numpy as np
from datetime import datetime, timedelta

# --- Indian Exchange Reference Data ---
exchanges = {
    'NSE': {
        'indices': ['Nifty 50', 'Nifty Bank', 'Nifty IT', 'Nifty Midcap 100'],
        'equity_hours': '9:15 AM - 3:30 PM IST',
        'fo_hours': '9:15 AM - 3:30 PM IST',
        'tick_size': 0.05,  # INR for equity
        'lot_sizes': {'NIFTY': 25, 'BANKNIFTY': 15, 'RELIANCE': 250, 'TCS': 150},
        'settlement': 'T+1',
    },
    'BSE': {
        'indices': ['Sensex', 'BSE 500', 'BSE Midcap', 'BSE Smallcap'],
        'equity_hours': '9:15 AM - 3:30 PM IST',
        'tick_size': 0.05,
        'settlement': 'T+1',
    },
    'MCX': {
        'commodities': ['Gold', 'Silver', 'Crude Oil', 'Natural Gas', 'Copper'],
        'trading_hours': '9:00 AM - 11:30 PM IST',
        'tick_sizes': {'GOLD': 1, 'SILVER': 1, 'CRUDEOIL': 1},
    }
}

print("=== Indian Exchange Overview ===\\n")
for name, info in exchanges.items():
    print(f"--- {name} ---")
    for key, val in info.items():
        print(f"  {key}: {val}")
    print()

# --- Simulate Order Book for TCS on NSE ---
np.random.seed(42)
mid_price = 3800.0  # TCS ~ INR 3800
tick = 0.05

# Generate bid and ask levels
n_levels = 10
bid_prices = [mid_price - tick * (i + 1) for i in range(n_levels)]
ask_prices = [mid_price + tick * (i + 1) for i in range(n_levels)]

# Quantities follow roughly power-law distribution
bid_qtys = np.random.exponential(500, n_levels).astype(int) + 50
ask_qtys = np.random.exponential(500, n_levels).astype(int) + 50

print("=== TCS Order Book (Simulated) ===")
print(f"{'Level':>6} {'Bid Qty':>8} {'Bid Price':>10} {'Ask Price':>10} {'Ask Qty':>8}")
for i in range(n_levels):
    print(f"{i+1:>6} {bid_qtys[i]:>8} {bid_prices[i]:>10.2f} {ask_prices[i]:>10.2f} {ask_qtys[i]:>8}")

spread = ask_prices[0] - bid_prices[0]
spread_bps = spread / mid_price * 10000
print(f"\\nBid-Ask Spread: INR {spread:.2f} ({spread_bps:.1f} bps)")
print(f"Mid Price: INR {mid_price:.2f}")
print(f"Total Bid Depth: {np.sum(bid_qtys)} shares (INR {np.sum(bid_qtys) * mid_price / 1e6:.1f}M)")
print(f"Total Ask Depth: {np.sum(ask_qtys)} shares (INR {np.sum(ask_qtys) * mid_price / 1e6:.1f}M)")

# --- Market Impact Estimation ---
print("\\n=== Market Impact Estimation ===")
order_sizes = [100, 500, 1000, 5000, 10000]
for size in order_sizes:
    remaining = size
    cost = 0
    for i in range(n_levels):
        fill = min(remaining, ask_qtys[i])
        cost += fill * ask_prices[i]
        remaining -= fill
        if remaining <= 0:
            break
    avg_price = cost / size if remaining <= 0 else float('inf')
    impact_bps = (avg_price - mid_price) / mid_price * 10000 if remaining <= 0 else float('inf')
    status = "Filled" if remaining <= 0 else f"Partial ({size - remaining}/{size})"
    print(f"  Buy {size:>5} shares: Avg price = INR {avg_price:.2f}, Impact = {impact_bps:.1f} bps [{status}]")

# --- Circuit Breaker Levels ---
print("\\n=== SEBI Circuit Breaker Levels ===")
nifty_close = 20000
for pct in [10, 15, 20]:
    lower = nifty_close * (1 - pct/100)
    upper = nifty_close * (1 + pct/100)
    print(f"  {pct}% circuit: [{lower:.0f}, {upper:.0f}]")

print("\\nNote: Market-wide circuit breaker halts trading for 15-45 min")
print("Individual stock circuit: 2%/5%/10%/20% (varies by category)")`}
      />

      {/* --- Worked Example --- */}
      <ExampleBlock
        title="Calculating Effective Spread"
        difficulty="beginner"
        problem="TCS is quoted at INR 3799.95 bid / INR 3800.05 ask on NSE. A trader buys 100 shares at the ask and sells at the bid. What is the effective round-trip cost?"
        solution={[
          {
            step: 'Calculate the quoted spread',
            formula: '\\text{Spread} = 3800.05 - 3799.95 = \\text{INR } 0.10',
          },
          {
            step: 'Calculate spread in basis points',
            formula: '\\text{Spread (bps)} = \\frac{0.10}{3800.00} \\times 10000 = 0.26 \\text{ bps}',
          },
          {
            step: 'Calculate round-trip cost',
            formula: '\\text{Cost} = 100 \\times 0.10 = \\text{INR } 10.00',
            explanation: 'This is extremely tight -- TCS is one of the most liquid stocks on NSE. For a mid-cap stock, the spread might be 5-20 bps, making round-trip costs much higher.',
          },
        ]}
      />

      {/* --- Key Takeaway --- */}
      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Indian equity markets are centralized on NSE and BSE with transparent order books,
          T+1 settlement, and strong SEBI regulation. This centralization simplifies
          quantitative trading compared to fragmented markets like the US. Key advantages for
          quants: (1) single venue for best execution (no smart order routing needed), (2)
          clean order book data from exchanges, (3) well-defined lot sizes for F&O. Key
          challenges: (1) lower liquidity in mid/small-caps, (2) circuit breakers can freeze
          positions, (3) algo trading requires exchange co-location approval.
        </p>
      </NoteBlock>
    </div>
  )
}
