import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveArchitecture() {
  const [component, setComponent] = useState('data')
  const descriptions = {
    data: { title: 'Data Handler', desc: 'Loads NSE bhavcopy, tick data, or Kite API data. Handles corporate actions, lot size changes. Provides iterator interface for bar-by-bar or event-by-event access.', color: 'bg-blue-100 dark:bg-blue-900/30' },
    strategy: { title: 'Strategy Engine', desc: 'Receives market data events, computes indicators, generates trading signals. Maintains strategy state. Supports multiple strategies running simultaneously on the same data.', color: 'bg-green-100 dark:bg-green-900/30' },
    portfolio: { title: 'Portfolio Manager', desc: 'Tracks positions across Nifty, Bank Nifty, individual stocks. Computes portfolio-level Greeks, margin requirements (SPAN). Enforces SEBI position limits.', color: 'bg-purple-100 dark:bg-purple-900/30' },
    execution: { title: 'Execution Handler', desc: 'Simulates order routing to NSE. Models market/limit/stop orders. Handles partial fills, lot size constraints. Computes realistic slippage using volume profile.', color: 'bg-orange-100 dark:bg-orange-900/30' },
    risk: { title: 'Risk Manager', desc: 'Pre-trade risk checks: max position size, max drawdown circuit breaker, margin utilization limits. Post-trade: P&L attribution, Greek exposure monitoring.', color: 'bg-red-100 dark:bg-red-900/30' },
  }

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Custom Framework Architecture
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Click each component to explore its role in a production NSE backtesting system.
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {Object.entries(descriptions).map(([key, val]) => (
          <button key={key} onClick={() => setComponent(key)}
            className={`rounded-lg px-3 py-2 text-xs font-medium transition ${component === key
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200'}`}>
            {val.title}
          </button>
        ))}
      </div>

      <div className={`rounded-lg p-4 ${descriptions[component].color}`}>
        <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">
          {descriptions[component].title}
        </h4>
        <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
          {descriptions[component].desc}
        </p>
      </div>

      <svg viewBox="0 0 500 100" className="mt-4 w-full max-w-2xl mx-auto" aria-label="Architecture flow">
        {['Data', 'Strategy', 'Portfolio', 'Execution', 'Risk'].map((name, i) => (
          <g key={name}>
            <rect x={10 + i * 98} y={25} width={85} height={40} rx="6"
              fill={component === ['data', 'strategy', 'portfolio', 'execution', 'risk'][i] ? '#6366f1' : '#e5e7eb'}
              stroke="#6366f1" strokeWidth="1.5" />
            <text x={52 + i * 98} y={49} textAnchor="middle"
              className="text-[10px] font-semibold"
              fill={component === ['data', 'strategy', 'portfolio', 'execution', 'risk'][i] ? '#fff' : '#374151'}>
              {name}
            </text>
            {i < 4 && (
              <line x1={95 + i * 98} y1={45} x2={108 + i * 98} y2={45}
                stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowhead)" />
            )}
          </g>
        ))}
        <defs>
          <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
            <polygon points="0 0, 6 2, 0 4" fill="#6366f1" />
          </marker>
        </defs>
      </svg>
    </div>
  )
}

export default function CustomFramework() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Building a Custom Backtesting Framework
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        When off-the-shelf frameworks like Zipline and Backtrader do not meet your needs --
        particularly for options strategies, multi-asset portfolios, or Indian market
        specificities -- building a custom framework gives complete control. This section
        presents a modular architecture designed for production use on NSE.
      </p>

      <DefinitionBlock
        title="Modular Backtesting Architecture"
        label="Definition 8.9"
        definition="A modular backtesting framework separates concerns into independent components: data handling, strategy logic, portfolio management, execution simulation, and risk management. Each component communicates through well-defined interfaces (events/messages), enabling independent testing and replacement."
        notation="\text{Data} \\to \\text{Strategy} \\to \\text{Portfolio} \\to \\text{Execution} \\to \\text{Risk}"
      />

      <TheoremBlock
        title="Same-Code Principle"
        label="Theorem 8.8"
        statement="A well-designed backtesting framework should allow the same strategy code to run in backtest mode and live trading mode with zero changes. This is achieved by abstracting the data source and execution layer behind interfaces. Violations of this principle introduce 'backtest-live divergence' that can cause strategies to perform differently in production."
        proof="If the strategy function f(data, state) produces the same output regardless of whether data comes from historical files or live feeds, then the backtest accurately simulates live behavior. This requires that: (1) data format is identical, (2) execution feedback (fills) follows the same protocol, and (3) time handling is consistent. Any difference in these layers breaks the equivalence."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Design Principles for NSE
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Principle</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Description</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">NSE-Specific</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Lot-size aware</td>
              <td className="px-4 py-2">All orders in lot multiples</td>
              <td className="px-4 py-2">Nifty=75, BankNifty=15</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Multi-segment</td>
              <td className="px-4 py-2">Handle equity, F&O, currency</td>
              <td className="px-4 py-2">NSE segments have different rules</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">SEBI compliant</td>
              <td className="px-4 py-2">Margin rules, position limits</td>
              <td className="px-4 py-2">Peak margin, ban period</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Calendar aware</td>
              <td className="px-4 py-2">NSE trading holidays</td>
              <td className="px-4 py-2">Muhurat trading, early close</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveArchitecture />

      <PythonCode
        title="custom_framework.py"
        runnable
        code={`import numpy as np
from dataclasses import dataclass, field
from typing import Dict, List, Optional
from abc import ABC, abstractmethod

# === Core Abstractions ===

@dataclass
class MarketEvent:
    timestamp: int
    symbol: str
    open: float
    high: float
    low: float
    close: float
    volume: int

@dataclass
class Order:
    symbol: str
    quantity: int  # positive=buy, negative=sell
    order_type: str = 'MARKET'
    limit_price: Optional[float] = None

@dataclass
class Fill:
    symbol: str
    quantity: int
    price: float
    commission: float

@dataclass
class Position:
    symbol: str
    quantity: int = 0
    avg_price: float = 0.0
    unrealized_pnl: float = 0.0

class Strategy(ABC):
    @abstractmethod
    def on_bar(self, event: MarketEvent, portfolio: Dict) -> List[Order]:
        pass

# === NSE-Specific Components ===

class NSEExecutionEngine:
    def __init__(self, lot_sizes: Dict[str, int], slippage_bps=2):
        self.lot_sizes = lot_sizes
        self.slippage_bps = slippage_bps
        self.brokerage = 20  # INR per order

    def execute(self, order: Order, market: MarketEvent) -> Fill:
        lot_size = self.lot_sizes.get(order.symbol, 1)
        lots = abs(order.quantity)
        actual_qty = lots * lot_size * np.sign(order.quantity)

        slippage = market.close * self.slippage_bps / 10000 * np.sign(order.quantity)
        fill_price = market.close + slippage
        commission = self.brokerage + abs(actual_qty * fill_price * 0.00005)  # STT approx

        return Fill(order.symbol, int(actual_qty), fill_price, commission)

class PortfolioManager:
    def __init__(self, initial_cash=1000000):
        self.cash = initial_cash
        self.positions: Dict[str, Position] = {}
        self.equity_curve = [initial_cash]
        self.trade_log = []

    def update(self, fill: Fill):
        sym = fill.symbol
        if sym not in self.positions:
            self.positions[sym] = Position(sym)

        pos = self.positions[sym]
        self.cash -= fill.quantity * fill.price + fill.commission

        if pos.quantity == 0:
            pos.avg_price = fill.price
        elif np.sign(fill.quantity) == np.sign(pos.quantity):
            total = pos.quantity + fill.quantity
            pos.avg_price = (pos.avg_price * pos.quantity + fill.price * fill.quantity) / total

        pos.quantity += fill.quantity
        self.trade_log.append(fill)

    def mark_to_market(self, prices: Dict[str, float]):
        total = self.cash
        for sym, pos in self.positions.items():
            if sym in prices and pos.quantity != 0:
                pos.unrealized_pnl = (prices[sym] - pos.avg_price) * pos.quantity
                total += prices[sym] * pos.quantity
        self.equity_curve.append(total)
        return total

# === Example Strategy ===

class NiftyDualMomentum(Strategy):
    def __init__(self, fast=10, slow=30):
        self.fast = fast
        self.slow = slow
        self.prices = []

    def on_bar(self, event, portfolio):
        self.prices.append(event.close)
        orders = []

        if len(self.prices) < self.slow + 1:
            return orders

        fast_ma = np.mean(self.prices[-self.fast:])
        slow_ma = np.mean(self.prices[-self.slow:])

        current_pos = portfolio.get('NIFTY', Position('NIFTY')).quantity

        if fast_ma > slow_ma and current_pos <= 0:
            if current_pos < 0:
                orders.append(Order('NIFTY', 1))  # close short
            orders.append(Order('NIFTY', 1))      # go long
        elif fast_ma < slow_ma and current_pos >= 0:
            if current_pos > 0:
                orders.append(Order('NIFTY', -1))  # close long
            orders.append(Order('NIFTY', -1))      # go short

        return orders

# === Run Backtest ===

np.random.seed(42)
n_days = 1260
nifty = 20000 * np.exp(np.cumsum(np.random.normal(0.0004, 0.012, n_days)))

engine = NSEExecutionEngine({'NIFTY': 75})
portfolio = PortfolioManager(1000000)
strategy = NiftyDualMomentum(fast=10, slow=30)

for day in range(n_days):
    event = MarketEvent(
        timestamp=day, symbol='NIFTY',
        open=nifty[day], high=nifty[day]*1.005,
        low=nifty[day]*0.995, close=nifty[day],
        volume=int(np.random.uniform(1e6, 5e6))
    )

    orders = strategy.on_bar(event, portfolio.positions)
    for order in orders:
        fill = engine.execute(order, event)
        portfolio.update(fill)

    portfolio.mark_to_market({'NIFTY': nifty[day]})

# Results
eq = np.array(portfolio.equity_curve)
returns = np.diff(eq) / eq[:-1]
sharpe = np.mean(returns) / np.std(returns) * np.sqrt(252) if np.std(returns) > 0 else 0
max_dd = np.min(eq / np.maximum.accumulate(eq) - 1) * 100

print("=== Custom Framework: Nifty Dual Momentum ===")
print(f"Final Portfolio: INR {eq[-1]:,.0f}")
print(f"Total Return: {(eq[-1]/eq[0]-1)*100:+.1f}%")
print(f"Sharpe: {sharpe:.2f} | Max DD: {max_dd:.1f}%")
print(f"Trades: {len(portfolio.trade_log)}")
print(f"Commission paid: INR {sum(f.commission for f in portfolio.trade_log):,.0f}")`}
      />

      <ExampleBlock
        title="Designing the Order Interface"
        difficulty="advanced"
        problem="Design an Order class that supports Market, Limit, Stop-Loss, and Bracket orders for NSE F&O. The bracket order should include entry, stop-loss, and target as a single atomic unit."
        solution={[
          {
            step: 'Base Order fields',
            formula: '\\text{Order}(\\text{symbol, qty, type, limit\\_price, stop\\_price})',
          },
          {
            step: 'Bracket order composition',
            formula: '\\text{BracketOrder} = (\\text{Entry}, \\text{StopLoss}, \\text{Target})',
            explanation: 'A bracket order on NSE sends 3 legs: the entry order, and two child orders (SL and target) that are OCO (one-cancels-other).',
          },
          {
            step: 'NSE-specific constraints',
            formula: '\\text{qty} \\mod \\text{lot\\_size} = 0, \\quad \\text{price} \\mod \\text{tick\\_size} = 0',
            explanation: 'NSE requires quantities in lot multiples and prices in tick size increments (0.05 for Nifty options, 0.05 for futures). The Order class must validate these before submission.',
          },
        ]}
      />

      <NoteBlock title="Testing Your Framework" type="tip">
        <p>
          Before trusting results from a custom framework, validate against known outcomes: (1)
          backtest a buy-and-hold strategy and verify it matches Nifty total return, (2) test
          a strategy with known P&L (e.g., buy day 1, sell day 2) and check exact values, (3)
          verify commission calculations against Zerodha's brokerage calculator, (4) check that
          short selling correctly debits and credits, and (5) ensure lot size rounding does not
          create phantom positions.
        </p>
      </NoteBlock>

      <NoteBlock title="From Backtest to Live" type="warning">
        <p>
          When transitioning from backtest to live trading on NSE via Kite API or other brokers:
          (1) replace the data handler with a WebSocket feed, (2) replace the execution engine
          with actual API calls, (3) add order state management (pending, filled, rejected), (4)
          handle network failures and reconnection, and (5) add a kill switch for runaway
          algorithms. SEBI requires all algo trading to be pre-approved by the exchange, so
          ensure compliance before deploying.
        </p>
      </NoteBlock>
    </div>
  )
}
