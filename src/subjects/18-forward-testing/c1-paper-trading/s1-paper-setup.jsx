import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractivePaperTrader() {
  const [capital, setCapital] = useState(1000000)
  const [slippage, setSlippage] = useState(0.05)
  const [commission, setCommission] = useState(20)
  const [trades, setTrades] = useState(50)

  const avgTradeSize = capital * 0.02
  const slippageCost = avgTradeSize * (slippage / 100) * trades
  const commissionCost = commission * trades
  const totalCost = slippageCost + commissionCost
  const costPct = (totalCost / capital) * 100

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Paper Trading Cost Estimator
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Estimate the impact of slippage and commissions on your paper trading P&amp;L
        using typical Zerodha brokerage for NSE equity delivery.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Capital (INR): {(capital / 100000).toFixed(1)}L</span>
          <input type="range" min="100000" max="10000000" step="100000" value={capital}
            onChange={e => setCapital(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Slippage (%): {slippage.toFixed(2)}</span>
          <input type="range" min="0" max="0.5" step="0.01" value={slippage}
            onChange={e => setSlippage(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Commission/trade (INR): {commission}</span>
          <input type="range" min="0" max="100" step="1" value={commission}
            onChange={e => setCommission(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Monthly trades: {trades}</span>
          <input type="range" min="1" max="500" step="1" value={trades}
            onChange={e => setTrades(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
          <div className="text-xs text-gray-500 dark:text-gray-400">Slippage Cost</div>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
            INR {slippageCost.toFixed(0)}
          </div>
        </div>
        <div className="rounded-lg bg-orange-50 p-3 dark:bg-orange-900/30">
          <div className="text-xs text-gray-500 dark:text-gray-400">Commission Cost</div>
          <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
            INR {commissionCost.toFixed(0)}
          </div>
        </div>
        <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/30">
          <div className="text-xs text-gray-500 dark:text-gray-400">Total Cost (% of capital)</div>
          <div className={`text-lg font-bold ${costPct > 1 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
            {costPct.toFixed(3)}%
          </div>
        </div>
      </div>
    </div>
  )
}

function PaperTradingArchDiagram() {
  return (
    <div className="my-6 flex justify-center">
      <svg viewBox="0 0 640 300" className="w-full max-w-2xl" aria-label="Paper trading architecture diagram">
        <defs>
          <marker id="ptArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#6366f1" />
          </marker>
        </defs>

        {/* Strategy Engine */}
        <rect x="20" y="100" width="120" height="60" rx="8" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
        <text x="80" y="125" textAnchor="middle" className="text-xs font-bold" fill="#4338ca">Strategy</text>
        <text x="80" y="142" textAnchor="middle" className="text-[10px]" fill="#6366f1">Engine</text>

        {/* Arrow to OMS */}
        <line x1="140" y1="130" x2="190" y2="130" stroke="#6366f1" strokeWidth="2" markerEnd="url(#ptArrow)" />

        {/* Paper OMS */}
        <rect x="200" y="100" width="120" height="60" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <text x="260" y="125" textAnchor="middle" className="text-xs font-bold" fill="#b45309">Paper OMS</text>
        <text x="260" y="142" textAnchor="middle" className="text-[10px]" fill="#d97706">Order Mgmt</text>

        {/* Arrow to Fill Simulator */}
        <line x1="320" y1="130" x2="370" y2="130" stroke="#6366f1" strokeWidth="2" markerEnd="url(#ptArrow)" />

        {/* Fill Simulator */}
        <rect x="380" y="100" width="120" height="60" rx="8" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
        <text x="440" y="125" textAnchor="middle" className="text-xs font-bold" fill="#15803d">Fill Simulator</text>
        <text x="440" y="142" textAnchor="middle" className="text-[10px]" fill="#16a34a">Slippage Model</text>

        {/* Arrow to P&L */}
        <line x1="500" y1="130" x2="540" y2="130" stroke="#6366f1" strokeWidth="2" markerEnd="url(#ptArrow)" />

        {/* P&L Tracker */}
        <rect x="548" y="100" width="80" height="60" rx="8" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" />
        <text x="588" y="125" textAnchor="middle" className="text-xs font-bold" fill="#be185d">P&amp;L</text>
        <text x="588" y="142" textAnchor="middle" className="text-[10px]" fill="#ec4899">Tracker</text>

        {/* Market Data Feed */}
        <rect x="200" y="20" width="120" height="50" rx="8" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="2" />
        <text x="260" y="42" textAnchor="middle" className="text-xs font-bold" fill="#0369a1">NSE Live Feed</text>
        <text x="260" y="57" textAnchor="middle" className="text-[10px]" fill="#0ea5e9">Kite WebSocket</text>

        <line x1="260" y1="70" x2="260" y2="98" stroke="#0ea5e9" strokeWidth="2" markerEnd="url(#ptArrow)" />
        <line x1="260" y1="70" x2="80" y2="70" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="4" />
        <line x1="80" y1="70" x2="80" y2="98" stroke="#0ea5e9" strokeWidth="1.5" markerEnd="url(#ptArrow)" />

        {/* Risk Checks */}
        <rect x="200" y="200" width="120" height="50" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" />
        <text x="260" y="222" textAnchor="middle" className="text-xs font-bold" fill="#b91c1c">Risk Engine</text>
        <text x="260" y="237" textAnchor="middle" className="text-[10px]" fill="#ef4444">Position Limits</text>

        <line x1="260" y1="160" x2="260" y2="198" stroke="#ef4444" strokeWidth="2" markerEnd="url(#ptArrow)" />

        <text x="320" y="280" textAnchor="middle" className="text-[11px] font-medium" fill="#6b7280">
          Paper Trading Architecture for Indian Markets
        </text>
      </svg>
    </div>
  )
}

export default function PaperSetup() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Paper Trading Setup with Zerodha Kite API
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Before deploying capital in Indian markets, every quantitative strategy must pass through
        a rigorous paper trading phase. Paper trading simulates real market conditions using live
        NSE/BSE data without risking actual capital, allowing you to validate strategy logic,
        execution assumptions, and infrastructure before going live.
      </p>

      <DefinitionBlock
        title="Paper Trading (Forward Testing)"
        label="Definition 18.1"
        definition="Paper trading is the process of executing a trading strategy in a simulated environment using real-time market data from NSE/BSE without placing actual orders. The system tracks hypothetical P&L, slippage estimates, and fill assumptions to validate strategy performance before live deployment."
        notation="Also called forward testing, virtual trading, or simulation trading. Zerodha provides a dedicated sandbox environment for this purpose."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Why Paper Trading is Essential
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Backtests suffer from multiple biases -- lookahead bias, survivorship bias, and
        unrealistic fill assumptions. Paper trading addresses these by running your strategy
        on live market data with realistic execution constraints. For Indian markets, this
        is especially important due to:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Factor</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Backtest Assumption</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Live Reality</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Circuit breakers</td>
              <td className="px-5 py-2">Not modeled</td>
              <td className="px-5 py-2">NSE 5/10/20% limits halt trading</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Settlement</td>
              <td className="px-5 py-2">Instant</td>
              <td className="px-5 py-2">T+1 for equities on NSE</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">STT/GST</td>
              <td className="px-5 py-2">Often ignored</td>
              <td className="px-5 py-2">STT: 0.1% delivery, GST: 18% on brokerage</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Slippage</td>
              <td className="px-5 py-2">0 or fixed</td>
              <td className="px-5 py-2">Varies with Nifty 50 liquidity</td>
            </tr>
            <tr>
              <td className="px-5 py-2">Order types</td>
              <td className="px-5 py-2">Market orders</td>
              <td className="px-5 py-2">Limit/SL/SLM with partial fills</td>
            </tr>
          </tbody>
        </table>
      </div>

      <PaperTradingArchDiagram />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Slippage Modeling for NSE
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A realistic paper trading system must model slippage accurately. For NSE equities,
        slippage depends on order size relative to the available liquidity at the best
        bid/ask. A common model uses market impact:
      </p>

      <BlockMath math="S_{\text{slippage}} = \sigma \cdot \sqrt{\frac{V_{\text{order}}}{V_{\text{ADV}}}} \cdot \text{sign}(\text{side})" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\sigma" /> is the daily volatility of the instrument,{' '}
        <InlineMath math="V_{\text{order}}" /> is the order value, and{' '}
        <InlineMath math="V_{\text{ADV}}" /> is the average daily volume in INR.
      </p>

      <TheoremBlock
        title="Square Root Market Impact Law"
        label="Theorem 18.1"
        statement="The expected market impact of a trade is proportional to the square root of the participation rate. For an order of size Q shares executed over a period with total volume V, the expected impact is: $I = \eta \cdot \sigma \cdot \sqrt{Q / V}$ where $\eta$ is a market-specific constant (approximately 0.1--0.5 for NSE Nifty 50 stocks)."
        proof="This result derives from the Kyle (1985) lambda model and has been empirically validated across multiple markets including the Indian equity market. The square root arises from the information content assumption: the price impact per unit of trading is decreasing in order size, consistent with a permanent-transitory impact decomposition."
      />

      <InteractivePaperTrader />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Setting Up Zerodha Kite Paper Trading
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The Zerodha Kite Connect API provides WebSocket streaming for live tick data from NSE
        and BSE. We will build a paper trading engine that consumes this data, generates signals,
        and simulates fills with realistic slippage and transaction costs.
      </p>

      <PythonCode
        title="paper_trading_engine.py"
        runnable
        code={`import numpy as np
from datetime import datetime, time
from dataclasses import dataclass, field
from typing import Dict, List, Optional
import json

@dataclass
class PaperOrder:
    """Simulated order for paper trading on NSE."""
    symbol: str
    side: str  # 'BUY' or 'SELL'
    quantity: int
    order_type: str  # 'MARKET', 'LIMIT', 'SL'
    limit_price: Optional[float] = None
    sl_trigger: Optional[float] = None
    timestamp: datetime = field(default_factory=datetime.now)
    status: str = 'PENDING'
    fill_price: float = 0.0
    fill_time: Optional[datetime] = None

@dataclass
class Position:
    symbol: str
    quantity: int = 0
    avg_price: float = 0.0
    realized_pnl: float = 0.0
    unrealized_pnl: float = 0.0

class PaperTradingEngine:
    """Paper trading engine for Indian equity markets."""

    def __init__(self, initial_capital: float = 1_000_000,
                 slippage_bps: float = 5.0,
                 brokerage_per_order: float = 20.0):
        self.capital = initial_capital
        self.initial_capital = initial_capital
        self.slippage_bps = slippage_bps
        self.brokerage = brokerage_per_order
        self.positions: Dict[str, Position] = {}
        self.orders: List[PaperOrder] = []
        self.trade_log: List[dict] = []
        self.equity_curve: List[float] = [initial_capital]

        # Indian market transaction costs
        self.stt_rate = 0.001       # STT: 0.1% for delivery
        self.gst_rate = 0.18        # GST: 18% on brokerage
        self.stamp_duty = 0.00015   # 0.015% for buy side
        self.sebi_charges = 0.000001  # SEBI turnover fee

    def _is_market_open(self) -> bool:
        """Check if NSE market hours (9:15 AM - 3:30 PM IST)."""
        now = datetime.now().time()
        return time(9, 15) <= now <= time(15, 30)

    def _calculate_slippage(self, price: float, side: str,
                            volatility: float = 0.02) -> float:
        """Model realistic slippage for NSE stocks."""
        base_slippage = price * (self.slippage_bps / 10000)
        vol_slippage = price * volatility * np.random.uniform(0, 0.001)
        total = base_slippage + vol_slippage
        return total if side == 'BUY' else -total

    def _calculate_costs(self, price: float, quantity: int,
                         side: str) -> float:
        """Calculate total transaction costs for Indian markets."""
        turnover = price * quantity
        brokerage = min(self.brokerage, turnover * 0.0003)
        stt = turnover * self.stt_rate if side == 'SELL' else 0
        gst = brokerage * self.gst_rate
        stamp = turnover * self.stamp_duty if side == 'BUY' else 0
        sebi = turnover * self.sebi_charges
        return brokerage + stt + gst + stamp + sebi

    def submit_order(self, symbol: str, side: str,
                     quantity: int, order_type: str = 'MARKET',
                     limit_price: float = None) -> PaperOrder:
        """Submit a paper order."""
        order = PaperOrder(
            symbol=symbol, side=side, quantity=quantity,
            order_type=order_type, limit_price=limit_price
        )
        self.orders.append(order)
        return order

    def simulate_fill(self, order: PaperOrder,
                      market_price: float) -> bool:
        """Simulate order fill with slippage."""
        slippage = self._calculate_slippage(
            market_price, order.side
        )
        fill_price = market_price + slippage
        costs = self._calculate_costs(
            fill_price, order.quantity, order.side
        )

        order.fill_price = fill_price
        order.fill_time = datetime.now()
        order.status = 'FILLED'

        # Update position
        if order.symbol not in self.positions:
            self.positions[order.symbol] = Position(order.symbol)
        pos = self.positions[order.symbol]

        if order.side == 'BUY':
            total_cost = pos.avg_price * pos.quantity
            new_cost = fill_price * order.quantity
            pos.quantity += order.quantity
            pos.avg_price = (total_cost + new_cost) / pos.quantity
            self.capital -= (new_cost + costs)
        else:
            pnl = (fill_price - pos.avg_price) * order.quantity
            pos.realized_pnl += pnl
            pos.quantity -= order.quantity
            self.capital += (fill_price * order.quantity - costs)

        self.trade_log.append({
            'symbol': order.symbol, 'side': order.side,
            'qty': order.quantity, 'price': fill_price,
            'costs': costs, 'time': str(order.fill_time)
        })
        return True

    def get_portfolio_value(self, prices: Dict[str, float]) -> float:
        """Calculate total portfolio value."""
        cash = self.capital
        positions_value = sum(
            pos.quantity * prices.get(pos.symbol, pos.avg_price)
            for pos in self.positions.values()
        )
        return cash + positions_value

# Demo: simulate paper trading on RELIANCE
engine = PaperTradingEngine(initial_capital=1_000_000)

# Simulate a buy order
order = engine.submit_order('RELIANCE', 'BUY', 100, 'MARKET')
engine.simulate_fill(order, 2450.0)  # Current NSE price

print("=== Paper Trading Status ===")
print(f"Initial Capital: INR {engine.initial_capital:,.2f}")
print(f"Cash Remaining:  INR {engine.capital:,.2f}")
pos = engine.positions['RELIANCE']
print(f"Position: {pos.quantity} shares @ INR {pos.avg_price:.2f}")
print(f"Fill Price (with slippage): INR {order.fill_price:.2f}")
print(f"Transaction Costs: INR {engine.trade_log[0]['costs']:.2f}")
total_val = engine.get_portfolio_value({'RELIANCE': 2460.0})
print(f"Portfolio Value: INR {total_val:,.2f}")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Realistic Fill Simulation
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A critical component is the fill simulator. For NSE mid-cap stocks, partial fills
        are common and must be accounted for. The fill probability depends on the limit
        order distance from the current best bid/ask:
      </p>

      <BlockMath math="P(\text{fill}) = \exp\left(-\lambda \cdot \frac{|p_{\text{limit}} - p_{\text{mid}}|}{p_{\text{mid}} \cdot \sigma}\right)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\lambda" /> is the fill decay parameter (typically 2--5
        for NSE stocks), <InlineMath math="p_{\text{mid}}" /> is the mid-price, and{' '}
        <InlineMath math="\sigma" /> is the intraday volatility.
      </p>

      <ExampleBlock
        title="Paper Trade Reconciliation"
        difficulty="intermediate"
        problem="Your strategy bought 200 shares of TCS at INR 3,500 on paper with 5 bps slippage. The actual NSE fill would have been at INR 3,502 (based on order book). Calculate the paper P&L error."
        solution={[
          {
            step: 'Calculate paper fill price',
            formula: 'p_{\\text{paper}} = 3500 \\times (1 + 5/10000) = 3500 \\times 1.0005 = 3501.75',
            explanation: 'Paper trading assumes 5 basis points of slippage on top of the quoted price.',
          },
          {
            step: 'Calculate actual fill price',
            formula: 'p_{\\text{actual}} = 3502.00',
            explanation: 'The real order book would have filled at INR 3,502 due to market microstructure.',
          },
          {
            step: 'Compute fill price discrepancy',
            formula: '\\Delta p = |3502.00 - 3501.75| = 0.25 \\text{ INR per share}',
          },
          {
            step: 'Total P&L error',
            formula: '\\text{Error} = 200 \\times 0.25 = \\text{INR } 50',
            explanation: 'The paper trading overestimated the fill quality by INR 50 total. This is a 0.007% error relative to the trade size, which is acceptable for most strategies.',
          },
        ]}
      />

      <NoteBlock title="Zerodha Kite API Setup" type="tip">
        <p>
          To set up paper trading with Zerodha Kite Connect:
        </p>
        <ol className="mt-2 list-decimal list-inside space-y-1">
          <li>Register on <strong>Kite Connect developer portal</strong> and obtain your API key</li>
          <li>Install the Python SDK: <code>pip install kiteconnect</code></li>
          <li>Use the WebSocket API for real-time tick data from NSE/BSE</li>
          <li>Route all orders through your paper trading engine instead of the live API</li>
          <li>Log every simulated fill with timestamp, slippage, and transaction costs</li>
          <li>Run for at least <strong>3 months</strong> before considering live deployment</li>
        </ol>
      </NoteBlock>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Transaction Cost Model for Indian Markets
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Indian markets have a unique cost structure that must be accurately modeled.
        The total cost per trade on NSE includes multiple regulatory components:
      </p>

      <BlockMath math="C_{\text{total}} = C_{\text{brokerage}} + C_{\text{STT}} + C_{\text{GST}} + C_{\text{stamp}} + C_{\text{SEBI}} + C_{\text{exchange}}" />

      <PythonCode
        title="indian_transaction_costs.py"
        runnable
        code={`def calculate_nse_costs(price, quantity, side, segment='equity_delivery'):
    """
    Calculate all-in transaction costs for NSE trades.
    Updated for 2024 SEBI/NSE fee structure.
    """
    turnover = price * quantity
    costs = {}

    # Zerodha brokerage (flat fee model)
    if segment == 'equity_delivery':
        costs['brokerage'] = 0  # Zero brokerage for delivery
    elif segment == 'equity_intraday':
        costs['brokerage'] = min(20, turnover * 0.0003)
    elif segment == 'futures':
        costs['brokerage'] = min(20, turnover * 0.0003)
    elif segment == 'options':
        costs['brokerage'] = 20  # Flat INR 20 per order

    # Securities Transaction Tax (STT)
    if segment == 'equity_delivery':
        costs['stt'] = turnover * 0.001  # 0.1% both sides
    elif segment == 'equity_intraday':
        costs['stt'] = turnover * 0.00025 if side == 'SELL' else 0
    elif segment == 'futures':
        costs['stt'] = turnover * 0.000125 if side == 'SELL' else 0
    elif segment == 'options':
        costs['stt'] = turnover * 0.000625 if side == 'SELL' else 0

    # GST (18% on brokerage + transaction charges)
    exchange_txn = turnover * 0.0000345  # NSE transaction charge
    costs['exchange_txn'] = exchange_txn
    costs['gst'] = (costs['brokerage'] + exchange_txn) * 0.18

    # SEBI turnover fee
    costs['sebi'] = turnover * 0.000001

    # Stamp duty (buy side only)
    if side == 'BUY':
        stamp_rates = {
            'equity_delivery': 0.00015,
            'equity_intraday': 0.00003,
            'futures': 0.00002,
            'options': 0.00003,
        }
        costs['stamp_duty'] = turnover * stamp_rates[segment]
    else:
        costs['stamp_duty'] = 0

    costs['total'] = sum(costs.values())
    return costs

# Example: Buy 100 RELIANCE at INR 2,450
costs = calculate_nse_costs(2450, 100, 'BUY', 'equity_delivery')
print("=== NSE Transaction Costs (RELIANCE Buy) ===")
for key, value in costs.items():
    print(f"  {key:15s}: INR {value:>10.2f}")
print(f"  {'cost_bps':15s}: {costs['total'] / (2450 * 100) * 10000:>10.2f} bps")

# Compare across segments
print("\\n=== Cost Comparison Across Segments ===")
for seg in ['equity_delivery', 'equity_intraday', 'futures', 'options']:
    c = calculate_nse_costs(2450, 100, 'BUY', seg)
    print(f"  {seg:20s}: INR {c['total']:>8.2f} ({c['total']/(2450*100)*10000:.1f} bps)")`}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Paper trading is not a formality -- it is the <strong>most important validation
          step</strong> before deploying capital. A well-designed paper trading system for
          Indian markets must accurately model NSE/BSE microstructure, regulatory costs
          (STT, GST, stamp duty), circuit breakers, and realistic slippage. Run your strategy
          in paper mode for at least 3 months across different market regimes before considering
          live deployment with Zerodha or any other Indian broker.
        </p>
      </NoteBlock>
    </div>
  )
}
