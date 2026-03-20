import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveMatchingEngine() {
  const [orders, setOrders] = useState([
    { id: 1, side: 'buy', price: 100.0, qty: 200, time: 1 },
    { id: 2, side: 'buy', price: 100.05, qty: 150, time: 2 },
    { id: 3, side: 'sell', price: 100.10, qty: 300, time: 3 },
    { id: 4, side: 'buy', price: 100.10, qty: 100, time: 4 },
  ])
  const [newSide, setNewSide] = useState('buy')
  const [newPrice, setNewPrice] = useState(100.10)
  const [newQty, setNewQty] = useState(200)
  const [matchLog, setMatchLog] = useState([])

  const submitOrder = () => {
    const newOrder = { id: orders.length + 1, side: newSide, price: newPrice, qty: newQty, time: orders.length + 1 }
    const log = []
    let remaining = newQty
    const updatedOrders = [...orders]

    if (newSide === 'buy') {
      const matchable = updatedOrders
        .filter(o => o.side === 'sell' && o.price <= newPrice && o.qty > 0)
        .sort((a, b) => a.price - b.price || a.time - b.time)
      for (const match of matchable) {
        if (remaining <= 0) break
        const fill = Math.min(remaining, match.qty)
        log.push(`MATCH: Buy ${fill} @ ${match.price.toFixed(2)} (Order #${match.id})`)
        match.qty -= fill
        remaining -= fill
      }
    } else {
      const matchable = updatedOrders
        .filter(o => o.side === 'buy' && o.price >= newPrice && o.qty > 0)
        .sort((a, b) => b.price - a.price || a.time - b.time)
      for (const match of matchable) {
        if (remaining <= 0) break
        const fill = Math.min(remaining, match.qty)
        log.push(`MATCH: Sell ${fill} @ ${match.price.toFixed(2)} (Order #${match.id})`)
        match.qty -= fill
        remaining -= fill
      }
    }

    if (remaining > 0) {
      newOrder.qty = remaining
      updatedOrders.push(newOrder)
      log.push(`RESTING: ${newSide} ${remaining} @ ${newPrice.toFixed(2)} added to book`)
    }

    setOrders(updatedOrders.filter(o => o.qty > 0))
    setMatchLog(log)
  }

  const activeBids = orders.filter(o => o.side === 'buy' && o.qty > 0).sort((a, b) => b.price - a.price)
  const activeAsks = orders.filter(o => o.side === 'sell' && o.qty > 0).sort((a, b) => a.price - b.price)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: NSE NEAT Matching Engine Simulator
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Submit orders and watch how the price-time priority matching engine works. Orders
        are matched at the best available price, with time priority for orders at the same price.
      </p>

      <div className="mb-4 grid grid-cols-4 gap-2">
        <select value={newSide} onChange={e => setNewSide(e.target.value)}
          className="rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
        <label className="flex flex-col gap-0.5 text-xs text-gray-600 dark:text-gray-400">
          <span>Price: {newPrice.toFixed(2)}</span>
          <input type="range" min="99.80" max="100.30" step="0.05" value={newPrice}
            onChange={e => setNewPrice(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-0.5 text-xs text-gray-600 dark:text-gray-400">
          <span>Qty: {newQty}</span>
          <input type="range" min="50" max="500" step="50" value={newQty}
            onChange={e => setNewQty(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <button onClick={submitOrder}
          className="rounded bg-indigo-500 px-3 py-1 text-sm font-medium text-white hover:bg-indigo-600">
          Submit
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs font-mono">
        <div>
          <div className="text-center font-bold text-green-600 dark:text-green-400 mb-1">BIDS</div>
          {activeBids.length === 0 ? (
            <div className="text-center text-gray-400">Empty</div>
          ) : activeBids.map(o => (
            <div key={o.id} className="flex justify-between px-2 py-0.5 bg-green-50 dark:bg-green-900/20 rounded mb-0.5">
              <span>#{o.id} Qty:{o.qty}</span>
              <span className="text-green-600">{o.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div>
          <div className="text-center font-bold text-red-600 dark:text-red-400 mb-1">ASKS</div>
          {activeAsks.length === 0 ? (
            <div className="text-center text-gray-400">Empty</div>
          ) : activeAsks.map(o => (
            <div key={o.id} className="flex justify-between px-2 py-0.5 bg-red-50 dark:bg-red-900/20 rounded mb-0.5">
              <span className="text-red-600">{o.price.toFixed(2)}</span>
              <span>Qty:{o.qty} #{o.id}</span>
            </div>
          ))}
        </div>
      </div>

      {matchLog.length > 0 && (
        <div className="mt-3 rounded bg-gray-50 p-2 text-xs dark:bg-gray-800">
          <div className="font-bold text-gray-600 dark:text-gray-400">Match Log:</div>
          {matchLog.map((log, i) => (
            <div key={i} className={log.startsWith('MATCH') ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}>
              {log}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function MatchingEngines() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        NSE NEAT System and Price-Time Priority
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The NSE's NEAT (National Exchange for Automated Trading) system is a fully electronic
        order-driven matching engine that processes millions of orders per day. Understanding
        how the matching engine works is crucial for designing efficient execution algorithms
        and minimizing market impact.
      </p>

      <DefinitionBlock
        title="Price-Time Priority"
        label="Definition 3.1"
        definition={<>
          In a price-time priority system, orders are ranked first by price (best price has
          highest priority) and then by time of arrival (earlier orders have priority at the
          same price level). For buy orders, higher prices have priority. For sell orders,
          lower prices have priority. When a new order arrives, it is matched against the
          best available orders on the opposite side.
        </>}
        notation={<>
          Priority ranking for buys: <InlineMath math="p_1 > p_2 \implies \text{Order 1 first}" />.
          If <InlineMath math="p_1 = p_2" /> and <InlineMath math="t_1 < t_2" />, then Order 1 first.
        </>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        NEAT System Architecture
      </h3>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The NSE NEAT system processes orders through several stages:
      </p>

      <ol className="ml-6 list-decimal space-y-2 text-sm text-gray-700 dark:text-gray-300">
        <li><strong>Order Validation:</strong> Check price limits, circuit breakers, margin requirements, lot sizes</li>
        <li><strong>Matching:</strong> Price-time priority matching against the order book</li>
        <li><strong>Trade Confirmation:</strong> Generate trade records for both parties</li>
        <li><strong>Clearing:</strong> NSCCL (National Securities Clearing Corporation) handles settlement</li>
        <li><strong>Dissemination:</strong> Market data broadcast to all participants</li>
      </ol>

      <BlockMath math="\text{Matching condition (buy)}: \quad p_{\text{buy}} \geq p_{\text{best ask}} \implies \text{trade at } p_{\text{best ask}}" />
      <BlockMath math="\text{Matching condition (sell)}: \quad p_{\text{sell}} \leq p_{\text{best bid}} \implies \text{trade at } p_{\text{best bid}}" />

      <TheoremBlock
        title="Queue Position and Fill Probability"
        label="Theorem 3.1"
        statement={<>
          For a limit order at the best bid with queue position <InlineMath math="Q" /> (shares
          ahead) and total volume at that level <InlineMath math="V" />, the probability of
          getting filled before the price moves is approximately:
          <BlockMath math="P(\text{fill}) \approx 1 - \frac{Q}{V + \text{incoming sell volume}}" />
          For an NSE stock with high queue depth, improving queue position by 1 microsecond
          can mean the difference between getting filled and missing the trade. This is why
          co-location matters for high-frequency strategies.
        </>}
      />

      <NoteBlock title="NSE Co-location and Latency" type="info">
        <p>
          NSE offers co-location services at its data center in Mumbai. Co-located servers
          achieve round-trip latencies of 10--50 microseconds, compared to 1--5 milliseconds
          for remote connections. SEBI regulates co-location to ensure fair access: all
          co-located members receive market data simultaneously via multicast, and the exchange
          uses randomized order processing to prevent systematic latency advantages.
        </p>
      </NoteBlock>

      {/* --- Interactive --- */}
      <InteractiveMatchingEngine />

      {/* --- Pre-Open Auction --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Pre-Open Call Auction Algorithm
      </h3>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The pre-open session (9:00--9:08 AM) uses a call auction to determine the opening
        price. The algorithm finds the price that maximizes matched volume:
      </p>

      <BlockMath math="p^* = \arg\max_p \; Q_{\text{matched}}(p) = \arg\max_p \; \min\!\left(\sum_{b_i \geq p} q_i^B, \sum_{a_j \leq p} q_j^S\right)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        If multiple prices give the same maximum volume, the price closest to the previous
        close is chosen (minimizing price disruption). This mechanism reduces the impact
        of overnight information on opening prices.
      </p>

      {/* --- Python Code --- */}
      <PythonCode
        title="matching_engine.py"
        runnable
        code={`import numpy as np
from collections import deque

class Order:
    def __init__(self, order_id, side, price, qty, timestamp):
        self.id = order_id
        self.side = side   # 'buy' or 'sell'
        self.price = price
        self.qty = qty
        self.timestamp = timestamp
        self.filled = 0

    def remaining(self):
        return self.qty - self.filled

class MatchingEngine:
    """Simplified NSE NEAT price-time priority matching engine."""

    def __init__(self, tick_size=0.05):
        self.bids = {}   # price -> list of orders (sorted by time)
        self.asks = {}
        self.trades = []
        self.tick_size = tick_size
        self.order_count = 0

    def submit(self, side, price, qty):
        """Submit a new order and attempt matching."""
        self.order_count += 1
        order = Order(self.order_count, side, price, qty, self.order_count)
        matches = []

        if side == 'buy':
            # Match against asks (lowest first, then by time)
            ask_prices = sorted(self.asks.keys())
            for ap in ask_prices:
                if ap > price or order.remaining() <= 0:
                    break
                for ask_order in list(self.asks[ap]):
                    if order.remaining() <= 0:
                        break
                    fill = min(order.remaining(), ask_order.remaining())
                    order.filled += fill
                    ask_order.filled += fill
                    trade = {'buyer': order.id, 'seller': ask_order.id,
                             'price': ap, 'qty': fill}
                    self.trades.append(trade)
                    matches.append(trade)
                    if ask_order.remaining() == 0:
                        self.asks[ap].remove(ask_order)
                if not self.asks[ap]:
                    del self.asks[ap]

            # Add remaining to book
            if order.remaining() > 0:
                if price not in self.bids:
                    self.bids[price] = []
                self.bids[price].append(order)

        else:  # sell
            bid_prices = sorted(self.bids.keys(), reverse=True)
            for bp in bid_prices:
                if bp < price or order.remaining() <= 0:
                    break
                for bid_order in list(self.bids[bp]):
                    if order.remaining() <= 0:
                        break
                    fill = min(order.remaining(), bid_order.remaining())
                    order.filled += fill
                    bid_order.filled += fill
                    trade = {'buyer': bid_order.id, 'seller': order.id,
                             'price': bp, 'qty': fill}
                    self.trades.append(trade)
                    matches.append(trade)
                    if bid_order.remaining() == 0:
                        self.bids[bp].remove(bid_order)
                if not self.bids[bp]:
                    del self.bids[bp]

            if order.remaining() > 0:
                if price not in self.asks:
                    self.asks[price] = []
                self.asks[price].append(order)

        return matches

    def book_summary(self):
        bids = sorted(self.bids.keys(), reverse=True)[:5]
        asks = sorted(self.asks.keys())[:5]
        print("  BIDS                    ASKS")
        max_rows = max(len(bids), len(asks))
        for i in range(max_rows):
            bid_str = ""
            ask_str = ""
            if i < len(bids):
                qty = sum(o.remaining() for o in self.bids[bids[i]])
                bid_str = f"{qty:>6} @ {bids[i]:.2f}"
            if i < len(asks):
                qty = sum(o.remaining() for o in self.asks[asks[i]])
                ask_str = f"{asks[i]:.2f} @ {qty:<6}"
            print(f"  {bid_str:<20} {ask_str}")

# --- Simulate TCS Order Flow ---
engine = MatchingEngine(tick_size=0.05)

print("=== NSE NEAT Matching Engine Simulation (TCS) ===\\n")

# Build initial order book
initial_orders = [
    ('buy',  3799.90, 200), ('buy',  3799.95, 300), ('buy',  3799.85, 150),
    ('sell', 3800.05, 250), ('sell', 3800.10, 400), ('sell', 3800.15, 180),
]

print("Building order book...")
for side, price, qty in initial_orders:
    engine.submit(side, price, qty)

print("\\nInitial Order Book:")
engine.book_summary()

# Submit crossing orders
print("\\n--- Incoming Market Buy (500 shares) ---")
trades = engine.submit('buy', 9999.0, 500)  # high price = market order
for t in trades:
    print(f"  TRADE: {t['qty']} shares @ INR {t['price']:.2f}")
print(f"  Total filled: {sum(t['qty'] for t in trades)} shares")
if trades:
    vwap = sum(t['price'] * t['qty'] for t in trades) / sum(t['qty'] for t in trades)
    print(f"  VWAP: INR {vwap:.2f}")

print("\\nBook after market buy:")
engine.book_summary()

# --- Pre-Open Call Auction ---
print("\\n=== Pre-Open Call Auction Simulation ===")
buy_orders = [(3800, 500), (3799, 300), (3801, 200), (3798, 400)]
sell_orders = [(3799, 400), (3800, 350), (3801, 300), (3802, 200)]

prices = sorted(set([p for p,_ in buy_orders + sell_orders]))
print(f"\\nCandidate prices: {prices}")

best_price = None
best_volume = 0
for p in prices:
    buy_vol = sum(q for bp, q in buy_orders if bp >= p)
    sell_vol = sum(q for sp, q in sell_orders if sp <= p)
    matched = min(buy_vol, sell_vol)
    print(f"  Price {p}: Buy vol={buy_vol}, Sell vol={sell_vol}, Matched={matched}")
    if matched > best_volume:
        best_volume = matched
        best_price = p

print(f"\\nEquilibrium price: INR {best_price}")
print(f"Volume matched: {best_volume} shares")`}
      />

      {/* --- Worked Example --- */}
      <ExampleBlock
        title="Queue Position Calculation"
        difficulty="intermediate"
        problem="You place a limit buy at INR 3,800.00 on TCS. There are already 1,200 shares ahead of you at this price. The average sell volume at this level is 2,000 shares per minute. What is your expected wait time for a fill?"
        solution={[
          {
            step: 'Estimate fill probability per minute',
            formula: 'P(\\text{fill in 1 min}) \\approx \\frac{2000}{1200 + 2000} \\approx 0.625',
            explanation: 'This is a rough approximation assuming sell volume is consumed pro-rata.',
          },
          {
            step: 'Expected time to fill',
            formula: 'E[T] \\approx \\frac{1200}{2000} = 0.6 \\text{ minutes} = 36 \\text{ seconds}',
            explanation: 'Under the simplistic assumption that sell volume arrives uniformly.',
          },
          {
            step: 'Caveat',
            formula: '\\text{Actual fill depends on price movement}',
            explanation: 'If the price moves up before your order fills, you may not get filled at all. If it moves down, you get filled but with potential adverse selection (the stock was going down). This is the maker-taker dilemma.',
          },
        ]}
      />

      {/* --- Key Takeaway --- */}
      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          The NSE NEAT matching engine is transparent and deterministic: price-time priority
          governs all matches. For algorithmic trading, understanding queue position dynamics,
          fill probability, and the trade-off between aggressive (market) and passive (limit)
          orders is essential. The pre-open call auction provides an important price discovery
          mechanism. Co-location reduces latency but SEBI regulation ensures no unfair advantage
          in data dissemination.
        </p>
      </NoteBlock>
    </div>
  )
}
