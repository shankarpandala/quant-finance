import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveSOR() {
  const [orderSize, setOrderSize] = useState(5000)
  const [urgency, setUrgency] = useState(0.5)

  const nseBid = 1648.50
  const nseAsk = 1649.00
  const nseDepth = [3000, 2500, 2000, 1500, 1000]
  const bseBid = 1648.30
  const bseAsk = 1649.20
  const bseDepth = [1000, 800, 600, 500, 400]

  const nseSpread = nseAsk - nseBid
  const bseSpread = bseAsk - bseBid

  const nseAvailAtBest = nseDepth[0]
  const bseAvailAtBest = bseDepth[0]

  let nseAllocation, bseAllocation, reason
  if (nseAsk < bseAsk && nseAvailAtBest >= orderSize) {
    nseAllocation = orderSize
    bseAllocation = 0
    reason = 'NSE has better ask price with sufficient depth'
  } else if (bseAsk < nseAsk && bseAvailAtBest >= orderSize) {
    bseAllocation = orderSize
    nseAllocation = 0
    reason = 'BSE has better ask price with sufficient depth'
  } else {
    nseAllocation = Math.min(orderSize, nseAvailAtBest)
    bseAllocation = Math.min(orderSize - nseAllocation, bseAvailAtBest)
    reason = 'Split across exchanges for best execution'
  }

  const nseCost = nseAllocation * nseAsk
  const bseCost = bseAllocation * bseAsk
  const totalCost = nseCost + bseCost
  const avgPrice = totalCost / (nseAllocation + bseAllocation || 1)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Smart Order Router (NSE vs BSE)
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        See how the SOR routes an order for HDFC Bank between NSE and BSE based on price and depth.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Order Size: {orderSize.toLocaleString()} shares</span>
          <input type="range" min="500" max="10000" step="500" value={orderSize}
            onChange={e => setOrderSize(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Urgency: {(urgency * 100).toFixed(0)}%</span>
          <input type="range" min="0" max="1" step="0.1" value={urgency}
            onChange={e => setUrgency(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-3 dark:border-indigo-700 dark:bg-indigo-900/30">
          <h4 className="text-sm font-bold text-indigo-700 dark:text-indigo-300">NSE</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">Bid: {nseBid.toFixed(2)} | Ask: {nseAsk.toFixed(2)}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Spread: {nseSpread.toFixed(2)}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Best depth: {nseAvailAtBest.toLocaleString()}</p>
          <p className="text-lg font-bold text-indigo-600 mt-1">{nseAllocation.toLocaleString()} shares</p>
        </div>
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-700 dark:bg-amber-900/30">
          <h4 className="text-sm font-bold text-amber-700 dark:text-amber-300">BSE</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">Bid: {bseBid.toFixed(2)} | Ask: {bseAsk.toFixed(2)}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Spread: {bseSpread.toFixed(2)}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Best depth: {bseAvailAtBest.toLocaleString()}</p>
          <p className="text-lg font-bold text-amber-600 mt-1">{bseAllocation.toLocaleString()} shares</p>
        </div>
      </div>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        <span className="font-semibold">Routing: </span>{reason}. Avg price: INR {avgPrice.toFixed(2)}
      </p>
    </div>
  )
}

export default function SmartOrderRouting() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Smart Order Routing: NSE vs BSE and Best Execution
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        India is unique among major markets in having two competing stock exchanges -- NSE and
        BSE -- where most liquid stocks are cross-listed. Smart Order Routing (SOR) automatically
        routes orders to the exchange offering the best price and liquidity, ensuring best
        execution as mandated by SEBI. While NSE dominates equity derivatives and cash market
        turnover (90%+), BSE can occasionally offer better prices, especially for less-liquid stocks.
      </p>

      <DefinitionBlock
        title="Smart Order Routing (SOR)"
        label="Definition 5.14"
        definition="Smart Order Routing is an automated order management system that evaluates available liquidity and prices across multiple execution venues (exchanges, dark pools) and routes orders to achieve best execution. In India, SOR primarily routes between NSE and BSE, considering price, depth, speed, and transaction costs."
        notation={<>Best execution: <InlineMath math="\text{Route}^* = \arg\min_{\text{route}} \left(P_{exec}(\text{route}) + C_{txn}(\text{route}) + C_{impact}(\text{route})\right)" />.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        NSE vs BSE: Market Structure
      </h3>
      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Feature</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">NSE</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">BSE</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Cash market share</td>
              <td className="px-5 py-2">~90%</td>
              <td className="px-5 py-2">~10%</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">F&O market share</td>
              <td className="px-5 py-2">~99%</td>
              <td className="px-5 py-2">~1%</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Listed companies</td>
              <td className="px-5 py-2">~2,000</td>
              <td className="px-5 py-2">~5,500</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Trading hours</td>
              <td className="px-5 py-2">9:15-15:30 IST</td>
              <td className="px-5 py-2">9:15-15:30 IST</td>
            </tr>
            <tr>
              <td className="px-5 py-2">Co-location</td>
              <td className="px-5 py-2">Mumbai DC</td>
              <td className="px-5 py-2">Mumbai DC</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        SOR Decision Framework
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The SOR evaluates multiple factors before routing:
      </p>

      <BlockMath math="\text{Score}_{venue} = w_1 \cdot \frac{1}{\text{Price}} + w_2 \cdot \text{Depth} + w_3 \cdot \frac{1}{\text{Spread}} - w_4 \cdot \text{Cost}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The routing decision considers:
      </p>

      <BlockMath math="\text{Total Cost}_{venue} = P_{exec} + \underbrace{\text{STT} + \text{Exchange} + \text{SEBI} + \text{Stamp} + \text{GST}}_{\text{Regulatory costs}} + \underbrace{\text{Impact}(Q, D)}_{\text{Market impact}}" />

      <TheoremBlock
        title="Best Execution Obligation (SEBI)"
        label="Theorem 5.14"
        statement={<>Under SEBI's best execution framework, brokers must ensure that client orders are executed at the best available price across connected venues. The best execution obligation requires: (1) price improvement over the National Best Bid/Offer (NBBO) when possible, (2) consideration of total execution costs including all regulatory charges, (3) reasonable speed of execution, and (4) documentation of routing decisions for audit purposes. The NBBO across NSE and BSE is defined as: <BlockMath math="\text{NBBO}_{bid} = \max(P_{NSE}^{bid}, P_{BSE}^{bid}), \quad \text{NBBO}_{ask} = \min(P_{NSE}^{ask}, P_{BSE}^{ask})" /></>}
      />

      <InteractiveSOR />

      <PythonCode
        title="smart_order_router.py"
        runnable
        code={`import numpy as np

# Smart Order Routing Engine: NSE vs BSE
np.random.seed(42)

class OrderBook:
    def __init__(self, exchange, bids, asks):
        self.exchange = exchange
        self.bids = bids  # [(price, qty), ...]
        self.asks = asks

    def best_bid(self):
        return self.bids[0][0] if self.bids else 0

    def best_ask(self):
        return self.asks[0][0] if self.asks else float('inf')

    def spread(self):
        return self.best_ask() - self.best_bid()

    def depth_at_levels(self, n=5):
        return sum(qty for _, qty in self.asks[:n])

    def simulate_fill(self, qty, side='buy'):
        """Simulate filling qty shares, return avg price."""
        remaining = qty
        total_cost = 0
        levels = self.asks if side == 'buy' else self.bids

        for price, available in levels:
            filled = min(remaining, available)
            total_cost += filled * price
            remaining -= filled
            if remaining <= 0:
                break

        filled_qty = qty - remaining
        avg_price = total_cost / filled_qty if filled_qty > 0 else 0
        return avg_price, filled_qty

# HDFC Bank order books
nse_book = OrderBook('NSE',
    bids=[(1648.50, 3000), (1648.40, 2500), (1648.30, 2000),
          (1648.20, 1500), (1648.10, 1000)],
    asks=[(1649.00, 3000), (1649.10, 2500), (1649.20, 2000),
          (1649.30, 1500), (1649.40, 1000)])

bse_book = OrderBook('BSE',
    bids=[(1648.30, 1000), (1648.20, 800), (1648.10, 600),
          (1648.00, 500), (1647.90, 400)],
    asks=[(1649.20, 1000), (1649.30, 800), (1649.40, 600),
          (1649.50, 500), (1649.60, 400)])

# SOR Decision Engine
class SmartOrderRouter:
    def __init__(self, books):
        self.books = books

    def transaction_costs(self, exchange, value, is_delivery=True):
        """Compute total transaction costs for Indian exchanges."""
        costs = {
            'NSE': {
                'stt_buy': 0.001 if is_delivery else 0.00025,
                'stt_sell': 0.001 if is_delivery else 0.00025,
                'exchange': 0.0000345,
                'sebi': 0.000001,
                'stamp': 0.00015,
            },
            'BSE': {
                'stt_buy': 0.001 if is_delivery else 0.00025,
                'stt_sell': 0.001 if is_delivery else 0.00025,
                'exchange': 0.0000300,
                'sebi': 0.000001,
                'stamp': 0.00015,
            }
        }
        c = costs[exchange]
        total = sum(c.values()) * value
        return total

    def route_order(self, qty, side='buy'):
        """Route order to best venue(s)."""
        results = []

        for book in self.books:
            avg_price, filled = book.simulate_fill(qty, side)
            if filled == 0:
                continue
            value = avg_price * filled
            txn_cost = self.transaction_costs(book.exchange, value)
            total_cost = value + txn_cost
            eff_price = total_cost / filled

            results.append({
                'exchange': book.exchange,
                'avg_price': avg_price,
                'filled': filled,
                'txn_cost': txn_cost,
                'total_cost': total_cost,
                'eff_price': eff_price,
                'spread': book.spread(),
                'depth': book.depth_at_levels()
            })

        # Sort by effective price (best first)
        results.sort(key=lambda x: x['eff_price'] if side == 'buy' else -x['eff_price'])
        return results

# Run SOR for different order sizes
sor = SmartOrderRouter([nse_book, bse_book])

print("=== Smart Order Router: HDFC Bank ===\\n")
print(f"{'Exchange':<8} {'Best Bid':<12} {'Best Ask':<12} {'Spread':<10} {'5L Depth':<10}")
for book in [nse_book, bse_book]:
    print(f"{book.exchange:<8} {book.best_bid():<12} {book.best_ask():<12} "
          f"{book.spread():<10.2f} {book.depth_at_levels():<10}")

# NBBO
nbbo_bid = max(nse_book.best_bid(), bse_book.best_bid())
nbbo_ask = min(nse_book.best_ask(), bse_book.best_ask())
print(f"\\nNBBO: Bid = {nbbo_bid}, Ask = {nbbo_ask}, Spread = {nbbo_ask - nbbo_bid:.2f}")

# Route orders of different sizes
print(f"\\n=== Routing Analysis ===")
order_sizes = [500, 1000, 3000, 5000, 8000]

for qty in order_sizes:
    results = sor.route_order(qty, 'buy')
    best = results[0]
    print(f"\\nOrder: {qty:>5} shares (BUY)")
    print(f"  Route to: {best['exchange']}")
    print(f"  Avg price: INR {best['avg_price']:.2f}")
    print(f"  Eff price: INR {best['eff_price']:.2f}")
    print(f"  Txn costs: INR {best['txn_cost']:.2f}")
    if len(results) > 1:
        alt = results[1]
        savings = (alt['eff_price'] - best['eff_price']) * qty
        print(f"  Savings vs {alt['exchange']}: INR {savings:.2f} "
              f"({(alt['eff_price']/best['eff_price']-1)*10000:.1f} bps)")

# Split order routing
print(f"\\n=== Split Order Routing (8000 shares) ===")
nse_fill_price, nse_filled = nse_book.simulate_fill(5000, 'buy')
bse_fill_price, bse_filled = bse_book.simulate_fill(3000, 'buy')
combined_price = (nse_fill_price * nse_filled + bse_fill_price * bse_filled) / (nse_filled + bse_filled)
nse_only_price, _ = nse_book.simulate_fill(8000, 'buy')

print(f"NSE only: {nse_only_price:.2f} (walking up the book)")
print(f"Split (NSE 5k + BSE 3k): {combined_price:.2f}")
print(f"Improvement: {(nse_only_price - combined_price) * 8000:.0f} INR "
      f"({(nse_only_price/combined_price - 1) * 10000:.1f} bps)")`}
      />

      <ExampleBlock
        title="SOR Routing Decision"
        difficulty="intermediate"
        problem="You want to buy 4,000 shares of ICICI Bank. NSE ask: 1,050.00 with 5,000 depth. BSE ask: 1,049.80 with 2,000 depth. NSE transaction costs: 0.15% of value. BSE transaction costs: 0.14% of value. Where should the SOR route?"
        solution={[
          {
            step: 'Compute effective price at NSE',
            formula: '\\text{NSE eff} = 1050.00 \\times (1 + 0.0015) = 1051.575',
            explanation: 'NSE has sufficient depth (5,000 > 4,000) to fill entirely at best ask.',
          },
          {
            step: 'Compute effective price at BSE (split needed)',
            formula: '\\text{BSE best} = 1049.80 \\times (1 + 0.0014) = 1051.27 \\text{ for 2,000 shares}',
            explanation: 'BSE has only 2,000 at best. Remaining 2,000 would go to next level.',
          },
          {
            step: 'Route decision',
            formula: '\\text{BSE eff (2k)} = 1051.27 < \\text{NSE eff} = 1051.58',
            explanation: 'SOR should route 2,000 to BSE (better price) and 2,000 to NSE. The blended effective price beats routing all to NSE.',
          },
        ]}
      />

      <NoteBlock title="SEBI Best Execution Framework" type="warning">
        <p>
          SEBI's circular on best execution (2019) requires brokers offering SOR to: (1) evaluate
          both NSE and BSE for every order, (2) route to the venue offering the best price after
          accounting for all costs, (3) maintain audit trails of all routing decisions, (4) report
          execution quality metrics quarterly, and (5) handle partial fills and re-routing
          transparently. Brokers like Zerodha automatically route to the best venue for market
          orders. For limit orders, the client can specify the exchange.
        </p>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Smart Order Routing between NSE and BSE is essential for best execution in Indian
          markets. While NSE dominates liquidity, BSE can offer better prices for specific stocks,
          especially SME and less-liquid names. The SOR must consider not just the quoted price
          but total costs (STT, exchange charges, stamp duty), available depth, and fill
          probability. SEBI mandates best execution, making SOR a regulatory requirement for
          brokers, not just a competitive advantage.
        </p>
      </NoteBlock>
    </div>
  )
}
