import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveOrderBook() {
  const [spreadBps, setSpreadBps] = useState(2)
  const [bidDepth, setBidDepth] = useState(500)
  const [askDepth, setAskDepth] = useState(450)
  const [midPrice, setMidPrice] = useState(2500)

  const spread = midPrice * spreadBps / 10000
  const bestBid = midPrice - spread / 2
  const bestAsk = midPrice + spread / 2
  const imbalance = (bidDepth - askDepth) / (bidDepth + askDepth)
  const microprice = bestBid * (askDepth / (bidDepth + askDepth)) + bestAsk * (bidDepth / (bidDepth + askDepth))

  const bidLevels = Array.from({ length: 5 }, (_, i) => ({
    price: (bestBid - i * 0.05).toFixed(2),
    qty: Math.round(bidDepth * (1 - i * 0.12) + Math.sin(i) * 30),
  }))

  const askLevels = Array.from({ length: 5 }, (_, i) => ({
    price: (bestAsk + i * 0.05).toFixed(2),
    qty: Math.round(askDepth * (1 - i * 0.1) + Math.cos(i) * 25),
  }))

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Limit Order Book (NSE)
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust spread, depth, and mid-price to explore order book dynamics for an
        NSE-listed stock.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Spread: {spreadBps} bps</span>
          <input type="range" min="1" max="20" step="1" value={spreadBps}
            onChange={e => setSpreadBps(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Bid Depth: {bidDepth}</span>
          <input type="range" min="100" max="2000" step="50" value={bidDepth}
            onChange={e => setBidDepth(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Ask Depth: {askDepth}</span>
          <input type="range" min="100" max="2000" step="50" value={askDepth}
            onChange={e => setAskDepth(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Mid: Rs {midPrice}</span>
          <input type="range" min="100" max="5000" step="50" value={midPrice}
            onChange={e => setMidPrice(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 500 220" className="w-full max-w-xl mx-auto block" aria-label="Order book visualization">
        {/* Bid side */}
        {bidLevels.map((level, i) => {
          const barWidth = Math.min(level.qty / 3, 180)
          const y = 30 + i * 30
          return (
            <g key={`bid-${i}`}>
              <rect x={230 - barWidth} y={y} width={barWidth} height="22" fill="#4ade80" opacity={0.8 - i * 0.1} rx="3" />
              <text x={225 - barWidth} y={y + 15} className="text-[9px] font-mono" fill="#16a34a">{level.qty}</text>
              <text x="237" y={y + 15} className="text-[9px] font-mono" fill="#374151">{level.price}</text>
            </g>
          )
        })}

        {/* Ask side */}
        {askLevels.map((level, i) => {
          const barWidth = Math.min(level.qty / 3, 180)
          const y = 30 + i * 30
          return (
            <g key={`ask-${i}`}>
              <rect x="270" y={y} width={barWidth} height="22" fill="#f87171" opacity={0.8 - i * 0.1} rx="3" />
              <text x={278 + barWidth} y={y + 15} className="text-[9px] font-mono" fill="#dc2626">{level.qty}</text>
              <text x="255" y={y + 15} className="text-[9px] font-mono" fill="#374151">{level.price}</text>
            </g>
          )
        })}

        {/* Labels */}
        <text x="150" y="20" textAnchor="middle" className="text-[11px] font-bold" fill="#16a34a">BID</text>
        <text x="350" y="20" textAnchor="middle" className="text-[11px] font-bold" fill="#dc2626">ASK</text>

        {/* Metrics */}
        <text x="250" y="195" textAnchor="middle" className="text-[9px]" fill="#6b7280">
          Spread: Rs {spread.toFixed(2)} ({spreadBps} bps) | Imbalance: {(imbalance * 100).toFixed(1)}%
        </text>
        <text x="250" y="210" textAnchor="middle" className="text-[9px]" fill="#6366f1">
          Microprice: Rs {microprice.toFixed(2)} (vs Mid: Rs {midPrice.toFixed(2)})
        </text>
      </svg>
    </div>
  )
}

export default function LOBData() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Limit Order Book Data
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The Limit Order Book (LOB) is the central data structure of modern electronic
        exchanges like NSE. It records all outstanding buy (bid) and sell (ask) limit
        orders organized by price-time priority. LOB data provides the most granular
        view of market supply and demand, making it essential for high-frequency
        trading and microstructure research.
      </p>

      <DefinitionBlock
        title="Limit Order Book (LOB)"
        label="Definition 1.1"
        definition="A limit order book is an organized record of all unexecuted limit orders for a financial instrument, sorted by price level. The bid side lists buy orders in descending price order, while the ask side lists sell orders in ascending price order. At each price level, orders are prioritized by arrival time (FIFO). The best bid and best ask define the inside quote."
        notation={<>The LOB state at time <InlineMath math="t" /> is <InlineMath math="\mathcal{L}_t = \{(p_i, q_i, s_i)\}_{i}" /> where <InlineMath math="p_i" /> is price, <InlineMath math="q_i" /> is quantity, and <InlineMath math="s_i \in \{\text{bid}, \text{ask}\}" />. Best bid <InlineMath math="b_t = \max\{p_i : s_i = \text{bid}\}" />, best ask <InlineMath math="a_t = \min\{p_i : s_i = \text{ask}\}" />.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        LOB Metrics
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Key metrics derived from the order book provide real-time market quality indicators:
      </p>

      <BlockMath math="\text{Mid Price: } m_t = \frac{a_t + b_t}{2}, \quad \text{Spread: } s_t = a_t - b_t" />

      <BlockMath math="\text{Microprice: } \tilde{m}_t = \frac{q_t^a \cdot b_t + q_t^b \cdot a_t}{q_t^a + q_t^b}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The microprice is a quantity-weighted midpoint that accounts for order book
        imbalance. When bid depth exceeds ask depth, the microprice is pulled toward
        the ask, reflecting likely upward pressure.
      </p>

      <TheoremBlock
        title="Order Book Imbalance as a Short-Term Predictor"
        label="Theorem 1.1"
        statement={<>The order book imbalance at the top <InlineMath math="k" /> levels is a significant predictor of short-term price direction: <BlockMath math="\text{OBI}_k = \frac{\sum_{i=1}^{k} q_i^b - \sum_{i=1}^{k} q_i^a}{\sum_{i=1}^{k} q_i^b + \sum_{i=1}^{k} q_i^a}" /> For NIFTY 50 stocks on NSE, <InlineMath math="\text{OBI}_5" /> has a correlation of <InlineMath math="\rho \approx 0.15\text{--}0.25" /> with the sign of the next 50ms--500ms price change, which is economically significant at HFT horizons.</>}
        proof={<>The imbalance signal derives from market-clearing considerations: excess bid depth reflects buying pressure that will be absorbed by incoming market sell orders or aggressive limit orders. Conditional on <InlineMath math="\text{OBI}_5 > 0.3" />, the probability of a positive tick within 100ms is approximately 58--62% for liquid NSE stocks, significantly above the unconditional 50%.</>}
      />

      <InteractiveOrderBook />

      <PythonCode
        title="lob_analysis.py"
        runnable
        code={`import numpy as np
from collections import defaultdict

class LimitOrderBook:
    """Simplified L3 limit order book for analysis."""

    def __init__(self, tick_size=0.05):
        self.tick_size = tick_size
        self.bids = defaultdict(float)  # price -> total qty
        self.asks = defaultdict(float)

    def add_order(self, side, price, qty):
        """Add a limit order."""
        price = round(price / self.tick_size) * self.tick_size
        if side == 'bid':
            self.bids[price] += qty
        else:
            self.asks[price] += qty

    def best_bid(self):
        return max(self.bids.keys()) if self.bids else 0

    def best_ask(self):
        return min(self.asks.keys()) if self.asks else float('inf')

    def midprice(self):
        return (self.best_bid() + self.best_ask()) / 2

    def spread(self):
        return self.best_ask() - self.best_bid()

    def microprice(self):
        bb, ba = self.best_bid(), self.best_ask()
        qb, qa = self.bids[bb], self.asks[ba]
        if qb + qa == 0:
            return self.midprice()
        return (qa * bb + qb * ba) / (qb + qa)

    def imbalance(self, levels=5):
        """Compute order book imbalance at top-k levels."""
        sorted_bids = sorted(self.bids.keys(), reverse=True)[:levels]
        sorted_asks = sorted(self.asks.keys())[:levels]
        bid_vol = sum(self.bids[p] for p in sorted_bids)
        ask_vol = sum(self.asks[p] for p in sorted_asks)
        total = bid_vol + ask_vol
        return (bid_vol - ask_vol) / total if total > 0 else 0

    def depth_profile(self, levels=5):
        """Get depth at each level."""
        sorted_bids = sorted(self.bids.keys(), reverse=True)[:levels]
        sorted_asks = sorted(self.asks.keys())[:levels]
        return {
            'bids': [(p, self.bids[p]) for p in sorted_bids],
            'asks': [(p, self.asks[p]) for p in sorted_asks],
        }

    def vwap_to_fill(self, side, qty):
        """Compute VWAP for filling a market order of given size."""
        if side == 'buy':
            levels = sorted(self.asks.keys())
            book = self.asks
        else:
            levels = sorted(self.bids.keys(), reverse=True)
            book = self.bids

        filled = 0
        cost = 0
        for price in levels:
            available = book[price]
            fill = min(qty - filled, available)
            cost += fill * price
            filled += fill
            if filled >= qty:
                break
        return cost / filled if filled > 0 else 0

# Build a realistic NSE order book for RELIANCE
np.random.seed(42)
lob = LimitOrderBook(tick_size=0.05)
base_price = 2500.0

# Add bid levels
for i in range(10):
    price = base_price - (i + 1) * 0.05
    qty = np.random.poisson(200) + 50
    lob.add_order('bid', price, qty)

# Add ask levels
for i in range(10):
    price = base_price + i * 0.05
    qty = np.random.poisson(180) + 40
    lob.add_order('ask', price, qty)

print("=" * 55)
print("LIMIT ORDER BOOK: RELIANCE (NSE)")
print("=" * 55)

print(f"\\nBest Bid:   Rs {lob.best_bid():.2f}")
print(f"Best Ask:   Rs {lob.best_ask():.2f}")
print(f"Mid Price:  Rs {lob.midprice():.2f}")
print(f"Microprice: Rs {lob.microprice():.2f}")
print(f"Spread:     Rs {lob.spread():.2f} ({lob.spread()/lob.midprice()*10000:.1f} bps)")
print(f"Imbalance:  {lob.imbalance(5):+.3f}")

profile = lob.depth_profile(5)
print(f"\\n{'BID':>30s}  |  {'ASK':<30s}")
print("-" * 65)
for i in range(5):
    bp, bq = profile['bids'][i] if i < len(profile['bids']) else (0, 0)
    ap, aq = profile['asks'][i] if i < len(profile['asks']) else (0, 0)
    print(f"  {bq:>6.0f} @ Rs {bp:>8.2f}  |  Rs {ap:<8.2f} @ {aq:<6.0f}")

# Market order impact
for size in [100, 500, 1000]:
    vwap = lob.vwap_to_fill('buy', size)
    impact = (vwap - lob.best_ask()) / lob.best_ask() * 10000
    print(f"\\nBuy {size:>5d} shares: VWAP=Rs {vwap:.2f}, Impact={impact:.1f} bps")`}
      />

      <ExampleBlock
        title="Computing Microprice for HDFC Bank"
        difficulty="beginner"
        problem="HDFC Bank on NSE has best bid at Rs 1,648.50 with 350 shares, and best ask at Rs 1,649.00 with 200 shares. Compute the midprice, microprice, and the imbalance at level 1."
        solution={[
          {
            step: 'Midprice',
            formula: 'm = \\frac{1648.50 + 1649.00}{2} = \\text{Rs } 1648.75',
          },
          {
            step: 'Microprice',
            formula: '\\tilde{m} = \\frac{200 \\times 1648.50 + 350 \\times 1649.00}{200 + 350} = \\frac{329700 + 577150}{550} = \\text{Rs } 1648.82',
            explanation: 'The microprice is above the midprice because bid depth (350) exceeds ask depth (200), suggesting upward pressure.',
          },
          {
            step: 'Level-1 imbalance',
            formula: '\\text{OBI}_1 = \\frac{350 - 200}{350 + 200} = \\frac{150}{550} = +0.273',
            explanation: 'A positive imbalance of 27.3% suggests buying pressure at the top of book.',
          },
        ]}
      />

      <NoteBlock title="NSE Data Access" type="tip">
        <p>
          NSE provides LOB data through several channels: Level-1 (best bid/ask) through
          the regular market data feed, Level-2 (top 5 or 20 levels) through the NSE
          co-location data feed, and full Level-3 (every order) through the NSE tick-by-tick
          data available to co-location subscribers. For research purposes, NSE archives
          are available through CMIE ProwessIQ and the NSE's own data portal. SEBI requires
          all algorithmic orders to be throttled and tagged, which provides additional
          order-level information for analysis.
        </p>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          The limit order book is the fundamental data structure for microstructure
          analysis on NSE. Key derived metrics -- midprice, microprice, spread, depth,
          and imbalance -- provide a comprehensive picture of supply-demand dynamics.
          The microprice is a superior estimator of the efficient price compared to the
          simple midpoint, particularly for stocks with asymmetric order book depth.
        </p>
      </NoteBlock>
    </div>
  )
}
