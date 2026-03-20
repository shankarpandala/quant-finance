import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveOrderBook() {
  const [orderType, setOrderType] = useState('limit')
  const [orderSide, setOrderSide] = useState('buy')
  const [limitPrice, setLimitPrice] = useState(3800)
  const [quantity, setQuantity] = useState(100)

  const midPrice = 3800
  const tick = 0.05

  const bids = [
    { price: 3799.95, qty: 320 }, { price: 3799.90, qty: 180 },
    { price: 3799.85, qty: 450 }, { price: 3799.80, qty: 200 },
    { price: 3799.75, qty: 600 }, { price: 3799.70, qty: 350 },
    { price: 3799.65, qty: 280 }, { price: 3799.60, qty: 520 },
  ]
  const asks = [
    { price: 3800.05, qty: 280 }, { price: 3800.10, qty: 350 },
    { price: 3800.15, qty: 200 }, { price: 3800.20, qty: 500 },
    { price: 3800.25, qty: 150 }, { price: 3800.30, qty: 420 },
    { price: 3800.35, qty: 300 }, { price: 3800.40, qty: 380 },
  ]

  let fillInfo = { filled: 0, avgPrice: 0, levels: 0 }
  if (orderType === 'market') {
    const book = orderSide === 'buy' ? asks : bids
    let remaining = quantity
    let totalCost = 0
    let levels = 0
    for (const level of book) {
      const fill = Math.min(remaining, level.qty)
      totalCost += fill * level.price
      remaining -= fill
      levels++
      if (remaining <= 0) break
    }
    fillInfo = { filled: quantity - remaining, avgPrice: totalCost / (quantity - remaining), levels }
  } else if (orderType === 'limit') {
    const book = orderSide === 'buy' ? asks : bids
    let remaining = quantity
    let totalCost = 0
    let levels = 0
    for (const level of book) {
      const canFill = orderSide === 'buy' ? level.price <= limitPrice : level.price >= limitPrice
      if (!canFill) break
      const fill = Math.min(remaining, level.qty)
      totalCost += fill * level.price
      remaining -= fill
      levels++
      if (remaining <= 0) break
    }
    fillInfo = { filled: quantity - remaining, avgPrice: quantity - remaining > 0 ? totalCost / (quantity - remaining) : 0, levels }
  }

  const slippage = fillInfo.filled > 0 ? Math.abs(fillInfo.avgPrice - midPrice) / midPrice * 10000 : 0

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Order Execution on NSE Order Book
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        See how different order types execute against the TCS order book. Compare market
        orders (immediate fill, potential slippage) vs limit orders (price control, partial fill risk).
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Order Type</span>
          <select value={orderType} onChange={e => setOrderType(e.target.value)}
            className="rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
            <option value="market">Market</option>
            <option value="limit">Limit</option>
            <option value="sl">Stop-Loss</option>
            <option value="amo">AMO (After Market)</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Side</span>
          <select value={orderSide} onChange={e => setOrderSide(e.target.value)}
            className="rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Limit Price: {limitPrice.toFixed(2)}</span>
          <input type="range" min="3799.50" max="3800.50" step="0.05" value={limitPrice}
            onChange={e => setLimitPrice(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500"
            disabled={orderType === 'market'} />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Quantity: {quantity}</span>
          <input type="range" min="10" max="2000" step="10" value={quantity}
            onChange={e => setQuantity(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      {/* Order Book Display */}
      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
        <div>
          <div className="text-center font-bold text-green-600 dark:text-green-400 mb-1">BID (Buyers)</div>
          {bids.map((b, i) => (
            <div key={i} className="flex justify-between px-2 py-0.5 hover:bg-green-50 dark:hover:bg-green-900/20">
              <span className="text-gray-500">{b.qty}</span>
              <span className="text-green-600 dark:text-green-400">{b.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div>
          <div className="text-center font-bold text-red-600 dark:text-red-400 mb-1">ASK (Sellers)</div>
          {asks.map((a, i) => (
            <div key={i} className="flex justify-between px-2 py-0.5 hover:bg-red-50 dark:hover:bg-red-900/20">
              <span className="text-red-600 dark:text-red-400">{a.price.toFixed(2)}</span>
              <span className="text-gray-500">{a.qty}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2 text-center text-xs">
        <div className="rounded bg-gray-50 p-2 dark:bg-gray-800">
          <div className="text-gray-500">Filled</div>
          <div className="font-bold text-gray-700 dark:text-gray-300">{fillInfo.filled}/{quantity}</div>
        </div>
        <div className="rounded bg-gray-50 p-2 dark:bg-gray-800">
          <div className="text-gray-500">Avg Price</div>
          <div className="font-bold text-gray-700 dark:text-gray-300">{fillInfo.avgPrice > 0 ? fillInfo.avgPrice.toFixed(2) : 'N/A'}</div>
        </div>
        <div className="rounded bg-gray-50 p-2 dark:bg-gray-800">
          <div className="text-gray-500">Slippage</div>
          <div className="font-bold text-gray-700 dark:text-gray-300">{slippage.toFixed(1)} bps</div>
        </div>
        <div className="rounded bg-gray-50 p-2 dark:bg-gray-800">
          <div className="text-gray-500">Levels Swept</div>
          <div className="font-bold text-gray-700 dark:text-gray-300">{fillInfo.levels}</div>
        </div>
      </div>
    </div>
  )
}

export default function OrderTypes() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Order Types on NSE
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Mastering order types is fundamental to execution quality in algorithmic trading.
        On the NSE, every order must specify type, price, quantity, and validity. The choice
        of order type directly impacts execution cost, fill probability, and strategy performance.
      </p>

      <DefinitionBlock
        title="Market Order"
        label="Definition 2.1"
        definition={<>
          A market order executes immediately at the best available price in the order book.
          It guarantees execution but not price. Market orders consume liquidity (they are
          "taker" orders) and pay the bid-ask spread.
        </>}
        notation={<>
          Expected slippage for a market buy of <InlineMath math="Q" /> shares:{' '}
          <InlineMath math="\text{Slippage} = \bar{p}_{\text{fill}} - p_{\text{mid}}" />,
          where <InlineMath math="\bar{p}_{\text{fill}}" /> is the volume-weighted average
          fill price.
        </>}
      />

      <DefinitionBlock
        title="Limit Order"
        label="Definition 2.2"
        definition={<>
          A limit order specifies the maximum price (for buys) or minimum price (for sells).
          It only executes at the limit price or better. Limit orders provide liquidity
          ("maker" orders) and may receive partial fills. On the NSE, the minimum tick size
          is INR 0.05 for equity.
        </>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Complete Order Type Reference for NSE
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Order Type</th>
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Price</th>
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Execution</th>
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Use Case</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2 font-medium">Market (MKT)</td>
              <td className="px-3 py-2">Best available</td>
              <td className="px-3 py-2">Immediate, full fill</td>
              <td className="px-3 py-2">Urgent execution, liquid stocks</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2 font-medium">Limit (LMT)</td>
              <td className="px-3 py-2">Specified</td>
              <td className="px-3 py-2">At limit or better</td>
              <td className="px-3 py-2">Price-sensitive, algo strategies</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2 font-medium">Stop-Loss (SL)</td>
              <td className="px-3 py-2">Trigger + limit</td>
              <td className="px-3 py-2">When trigger hit</td>
              <td className="px-3 py-2">Risk management, trend following</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2 font-medium">SL-Market (SL-M)</td>
              <td className="px-3 py-2">Trigger only</td>
              <td className="px-3 py-2">Market order on trigger</td>
              <td className="px-3 py-2">Guaranteed exit on stop</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2 font-medium">AMO</td>
              <td className="px-3 py-2">Specified</td>
              <td className="px-3 py-2">Queued for next day</td>
              <td className="px-3 py-2">Overnight strategy signals</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-medium">IOC</td>
              <td className="px-3 py-2">Specified</td>
              <td className="px-3 py-2">Immediate or cancel</td>
              <td className="px-3 py-2">Algo trading, sweeping book</td>
            </tr>
          </tbody>
        </table>
      </div>

      <TheoremBlock
        title="Optimal Order Placement"
        label="Theorem 2.1"
        statement={<>
          For a strategy with expected alpha <InlineMath math="\alpha" />, the optimal
          order type depends on the urgency parameter{' '}
          <InlineMath math="\kappa = \alpha / (\text{spread} + \text{market impact})" />:
          <BlockMath math="\text{Order choice} = \begin{cases} \text{Market order} & \text{if } \kappa > 1 \text{ (alpha exceeds cost)} \\ \text{Limit order} & \text{if } \kappa < 1 \text{ (patience pays)} \end{cases}" />
          For mean-reversion strategies on NSE with small alpha, limit orders are strongly
          preferred. For momentum strategies with decaying signals, market orders may be optimal.
        </>}
      />

      {/* --- Interactive --- */}
      <InteractiveOrderBook />

      {/* --- Python Code --- */}
      <PythonCode
        title="order_simulation.py"
        runnable
        code={`import numpy as np

np.random.seed(42)

# --- Simulate Order Book for Reliance on NSE ---
mid_price = 2500.00
tick_size = 0.05
n_levels = 20

def generate_order_book(mid, tick, levels):
    """Generate a realistic NSE order book."""
    bids, asks = [], []
    for i in range(levels):
        bid_price = mid - tick * (i + 1)
        ask_price = mid + tick * (i + 1)
        # Quantity increases with distance from mid (typical pattern)
        bid_qty = int(np.random.exponential(300) + 50 + i * 20)
        ask_qty = int(np.random.exponential(300) + 50 + i * 20)
        bids.append({'price': bid_price, 'qty': bid_qty})
        asks.append({'price': ask_price, 'qty': ask_qty})
    return bids, asks

bids, asks = generate_order_book(mid_price, tick_size, n_levels)

def execute_market_order(side, qty, bids, asks):
    """Simulate market order execution."""
    book = asks if side == 'buy' else bids
    remaining = qty
    total_cost = 0
    fills = []
    for level in book:
        fill = min(remaining, level['qty'])
        total_cost += fill * level['price']
        fills.append({'price': level['price'], 'qty': fill})
        remaining -= fill
        if remaining <= 0:
            break
    avg_price = total_cost / qty if remaining <= 0 else None
    return avg_price, fills, remaining

def execute_limit_order(side, qty, limit_price, bids, asks):
    """Simulate limit order execution (immediate fill portion)."""
    book = asks if side == 'buy' else bids
    remaining = qty
    total_cost = 0
    fills = []
    for level in book:
        can_fill = (side == 'buy' and level['price'] <= limit_price) or \\
                   (side == 'sell' and level['price'] >= limit_price)
        if not can_fill:
            break
        fill = min(remaining, level['qty'])
        total_cost += fill * level['price']
        fills.append({'price': level['price'], 'qty': fill})
        remaining -= fill
        if remaining <= 0:
            break
    filled = qty - remaining
    avg_price = total_cost / filled if filled > 0 else None
    return avg_price, fills, remaining

# --- Compare Order Types ---
print("=== Reliance Industries (NSE) Order Execution ===")
print(f"Mid price: INR {mid_price:.2f}")
print(f"Best bid: INR {bids[0]['price']:.2f} ({bids[0]['qty']} qty)")
print(f"Best ask: INR {asks[0]['price']:.2f} ({asks[0]['qty']} qty)")
print(f"Spread: INR {asks[0]['price'] - bids[0]['price']:.2f} "
      f"({(asks[0]['price'] - bids[0]['price'])/mid_price*10000:.1f} bps)")
print()

# Test different order sizes
order_sizes = [100, 500, 1000, 5000]
print(f"{'Size':>6} {'Market Avg':>12} {'Slippage':>10} {'Limit Fill%':>12} {'Limit Avg':>12}")

for size in order_sizes:
    # Market order
    mkt_avg, _, mkt_rem = execute_market_order('buy', size, bids, asks)

    # Limit at mid (aggressive limit)
    lmt_avg, _, lmt_rem = execute_limit_order('buy', size, mid_price, bids, asks)
    lmt_fill_pct = (size - lmt_rem) / size * 100

    # Limit at best ask (join the queue)
    slippage = (mkt_avg - mid_price) / mid_price * 10000 if mkt_avg else float('inf')
    lmt_avg_str = f"{lmt_avg:.2f}" if lmt_avg else "None"

    print(f"{size:>6} {mkt_avg:>12.2f} {slippage:>9.1f}bp {lmt_fill_pct:>11.0f}% {lmt_avg_str:>12}")

# --- Execution Cost Analysis ---
print("\\n=== Execution Cost Breakdown (Buy 1000 shares) ===")
size = 1000
mkt_avg, fills, _ = execute_market_order('buy', size, bids, asks)

print(f"Volume-weighted avg price: INR {mkt_avg:.2f}")
print(f"Slippage vs mid:           INR {mkt_avg - mid_price:.2f}")
print(f"Slippage (bps):            {(mkt_avg - mid_price)/mid_price * 10000:.2f}")
print(f"Notional value:            INR {mkt_avg * size:,.0f}")
print(f"Levels swept:              {len(fills)}")
for f in fills:
    print(f"  INR {f['price']:.2f} x {f['qty']} shares")

# --- AMO (After Market Order) Strategy ---
print("\\n=== AMO Strategy for Overnight Signals ===")
print("AMO orders are placed between 3:45 PM - 8:57 AM IST")
print("They execute at market open (9:15 AM) in the pre-open session")
print("Common use: signal generated after market close, execute at next open")
print("Risk: overnight gap risk (Nifty can gap 1-3% on global events)")`}
      />

      {/* --- Worked Example --- */}
      <ExampleBlock
        title="Stop-Loss Order for Risk Management"
        difficulty="beginner"
        problem="You are long 500 shares of Infosys at INR 1,450. You want a stop-loss at INR 1,420 with a limit of INR 1,415. How does this SL order work?"
        solution={[
          {
            step: 'Order parameters',
            formula: '\\text{SL Sell: Trigger} = 1420, \\text{ Limit} = 1415, \\text{ Qty} = 500',
            explanation: 'This is a Stop-Loss Limit order. It remains dormant until the trigger price is hit.',
          },
          {
            step: 'Trigger activation',
            formula: '\\text{When LTP} \\leq 1420: \\text{ order becomes active as a limit sell at } 1415',
            explanation: 'Once Infosys trades at or below INR 1,420, a limit sell order at INR 1,415 is placed.',
          },
          {
            step: 'Maximum loss calculation',
            formula: '\\text{Max loss} = 500 \\times (1450 - 1415) = \\text{INR } 17,500',
            explanation: 'If filled at the limit price. In fast markets, the order may not fill if the price gaps below INR 1,415. Using SL-M (stop-loss market) guarantees execution but not price.',
          },
        ]}
      />

      {/* --- Key Takeaway --- */}
      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Order type selection is a critical decision in algorithmic trading. For quant
          strategies on NSE: (1) use limit orders for mean-reversion strategies to capture
          the spread, (2) use market/IOC orders for momentum strategies where speed matters,
          (3) always use stop-loss orders for risk management, (4) consider AMO orders for
          overnight signal execution. The cost of crossing the spread (typically 1-3 bps
          for Nifty 50 stocks) must be factored into every backtest.
        </p>
      </NoteBlock>
    </div>
  )
}
