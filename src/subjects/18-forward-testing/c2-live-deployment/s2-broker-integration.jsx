import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveBrokerCompare() {
  const [monthlyOrders, setMonthlyOrders] = useState(200)
  const [avgOrderValue, setAvgOrderValue] = useState(50000)
  const [segment, setSegment] = useState('equity_intraday')

  const zerodha = {
    brokerage: segment === 'equity_delivery' ? 0 : Math.min(20, avgOrderValue * 0.0003) * monthlyOrders,
    stt: segment === 'equity_delivery' ? avgOrderValue * 0.001 * monthlyOrders : avgOrderValue * 0.00025 * monthlyOrders * 0.5,
    apiCost: 2000,
  }
  const angel = {
    brokerage: segment === 'equity_delivery' ? 0 : 20 * monthlyOrders,
    stt: zerodha.stt,
    apiCost: 0,
  }

  zerodha.total = zerodha.brokerage + zerodha.stt + zerodha.apiCost
  angel.total = angel.brokerage + angel.stt + angel.apiCost

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Broker Cost Comparison
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Compare monthly costs between Zerodha Kite and Angel One SmartAPI for your trading strategy.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Monthly Orders: {monthlyOrders}</span>
          <input type="range" min="10" max="2000" step="10" value={monthlyOrders}
            onChange={e => setMonthlyOrders(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Avg Order Value: INR {(avgOrderValue / 1000).toFixed(0)}K</span>
          <input type="range" min="5000" max="500000" step="5000" value={avgOrderValue}
            onChange={e => setAvgOrderValue(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Segment</span>
          <select value={segment} onChange={e => setSegment(e.target.value)}
            className="rounded border p-1 text-xs dark:bg-gray-800 dark:border-gray-600">
            <option value="equity_delivery">Equity Delivery</option>
            <option value="equity_intraday">Equity Intraday</option>
            <option value="futures">F&amp;O Futures</option>
            <option value="options">F&amp;O Options</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:bg-blue-900/20 dark:border-blue-800">
          <h4 className="text-sm font-bold text-blue-800 dark:text-blue-300">Zerodha Kite</h4>
          <div className="mt-2 space-y-1 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex justify-between"><span>Brokerage:</span><span>INR {zerodha.brokerage.toFixed(0)}</span></div>
            <div className="flex justify-between"><span>STT (est):</span><span>INR {zerodha.stt.toFixed(0)}</span></div>
            <div className="flex justify-between"><span>API Cost:</span><span>INR {zerodha.apiCost}</span></div>
            <div className="flex justify-between border-t pt-1 font-bold"><span>Total:</span><span>INR {zerodha.total.toFixed(0)}</span></div>
          </div>
        </div>
        <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 dark:bg-orange-900/20 dark:border-orange-800">
          <h4 className="text-sm font-bold text-orange-800 dark:text-orange-300">Angel One SmartAPI</h4>
          <div className="mt-2 space-y-1 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex justify-between"><span>Brokerage:</span><span>INR {angel.brokerage.toFixed(0)}</span></div>
            <div className="flex justify-between"><span>STT (est):</span><span>INR {angel.stt.toFixed(0)}</span></div>
            <div className="flex justify-between"><span>API Cost:</span><span>INR {angel.apiCost}</span></div>
            <div className="flex justify-between border-t pt-1 font-bold"><span>Total:</span><span>INR {angel.total.toFixed(0)}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BrokerIntegration() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Zerodha Kite and Angel One SmartAPI Integration
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Indian retail quant traders primarily use two broker APIs: Zerodha Kite Connect and
        Angel One SmartAPI. Both provide programmatic access to NSE and BSE for equity, F&amp;O,
        and commodity trading. This section covers integration patterns, error handling, and
        best practices for building robust broker connections.
      </p>

      <DefinitionBlock
        title="Broker API"
        label="Definition 18.5"
        definition="A Broker API is a programmatic interface provided by a stock broker that enables automated order placement, portfolio management, and market data access. In India, Zerodha Kite Connect and Angel One SmartAPI are the most widely used APIs for algorithmic trading on NSE/BSE."
        notation="Both APIs use REST for order management and WebSocket for real-time tick data streaming."
      />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Feature</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Zerodha Kite</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Angel One SmartAPI</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">API Cost</td>
              <td className="px-4 py-2">INR 2,000/month</td>
              <td className="px-4 py-2">Free</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Rate Limit</td>
              <td className="px-4 py-2">10 req/sec</td>
              <td className="px-4 py-2">10 req/sec</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">WebSocket Instruments</td>
              <td className="px-4 py-2">3000 per connection</td>
              <td className="px-4 py-2">1000 per connection</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Historical Data</td>
              <td className="px-4 py-2">Minute-level, 2000 days</td>
              <td className="px-4 py-2">Minute-level, 2000 days</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Order Types</td>
              <td className="px-4 py-2">MARKET, LIMIT, SL, SL-M</td>
              <td className="px-4 py-2">MARKET, LIMIT, SL, SL-M</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Python SDK</td>
              <td className="px-4 py-2">kiteconnect</td>
              <td className="px-4 py-2">smartapi-python</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveBrokerCompare />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Zerodha Kite Connect Integration
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Kite Connect is the most popular API for Indian quant trading. It provides REST
        endpoints for order management and a WebSocket for real-time tick streaming from NSE/BSE.
      </p>

      <PythonCode
        title="zerodha_kite_integration.py"
        runnable
        code={`import json
import time
from datetime import datetime, timedelta
from dataclasses import dataclass
from typing import Optional, Dict, List
from enum import Enum

class OrderType(Enum):
    MARKET = 'MARKET'
    LIMIT = 'LIMIT'
    SL = 'SL'         # Stop Loss
    SL_M = 'SL-M'     # Stop Loss Market

class Exchange(Enum):
    NSE = 'NSE'
    BSE = 'BSE'
    NFO = 'NFO'  # NSE F&O

class TransactionType(Enum):
    BUY = 'BUY'
    SELL = 'SELL'

@dataclass
class KiteOrder:
    """Represents an order in Kite Connect format."""
    tradingsymbol: str
    exchange: str
    transaction_type: str
    quantity: int
    order_type: str
    price: float = 0.0
    trigger_price: float = 0.0
    product: str = 'CNC'  # CNC=delivery, MIS=intraday
    validity: str = 'DAY'
    tag: str = ''
    order_id: Optional[str] = None

class KiteConnectWrapper:
    """Production wrapper for Zerodha Kite Connect API."""

    def __init__(self, api_key: str, access_token: str):
        self.api_key = api_key
        self.access_token = access_token
        self.rate_limit = 10  # requests per second
        self.last_request_time = 0
        self.order_count = 0
        self.max_daily_orders = 200  # Safety limit

    def _rate_limit_check(self):
        """Ensure we don't exceed API rate limits."""
        elapsed = time.time() - self.last_request_time
        if elapsed < 1.0 / self.rate_limit:
            wait = (1.0 / self.rate_limit) - elapsed
            time.sleep(wait)
        self.last_request_time = time.time()

    def _validate_order(self, order: KiteOrder) -> List[str]:
        """Pre-submission order validation."""
        errors = []

        # Check quantity
        if order.quantity <= 0:
            errors.append("Quantity must be positive")
        if order.quantity > 10000:
            errors.append("Quantity exceeds safety limit (10000)")

        # Check price for limit orders
        if order.order_type in ['LIMIT', 'SL']:
            if order.price <= 0:
                errors.append("Price required for LIMIT/SL orders")

        # Check trigger for SL orders
        if order.order_type in ['SL', 'SL-M']:
            if order.trigger_price <= 0:
                errors.append("Trigger price required for SL orders")
            if order.transaction_type == 'BUY':
                if order.trigger_price < order.price:
                    errors.append("Buy SL: trigger >= price")
            else:
                if order.trigger_price > order.price:
                    errors.append("Sell SL: trigger <= price")

        # Check exchange
        if order.exchange not in ['NSE', 'BSE', 'NFO', 'MCX']:
            errors.append(f"Invalid exchange: {order.exchange}")

        # Check daily order limit
        if self.order_count >= self.max_daily_orders:
            errors.append("Daily order limit reached")

        return errors

    def place_order(self, order: KiteOrder) -> dict:
        """Place order with validation and error handling."""
        # Validate
        errors = self._validate_order(order)
        if errors:
            return {'status': 'REJECTED', 'errors': errors}

        # Rate limit
        self._rate_limit_check()

        # Simulate API call
        self.order_count += 1
        order.order_id = f"KT{datetime.now().strftime('%Y%m%d')}{self.order_count:06d}"

        return {
            'status': 'PLACED',
            'order_id': order.order_id,
            'exchange': order.exchange,
            'symbol': order.tradingsymbol,
            'type': order.order_type,
            'quantity': order.quantity,
            'price': order.price,
            'timestamp': datetime.now().isoformat(),
        }

    def place_bracket_order(self, symbol: str, side: str,
                            qty: int, price: float,
                            stoploss: float, target: float,
                            trailing_sl: float = 0) -> dict:
        """Place a bracket order (entry + SL + target)."""
        self._rate_limit_check()
        self.order_count += 1
        order_id = f"BO{datetime.now().strftime('%Y%m%d')}{self.order_count:06d}"
        return {
            'status': 'PLACED',
            'order_id': order_id,
            'type': 'BRACKET',
            'entry_price': price,
            'stoploss': stoploss,
            'target': target,
            'trailing_sl': trailing_sl,
        }

    def get_positions(self) -> dict:
        """Get current positions."""
        return {
            'net': [
                {'symbol': 'RELIANCE', 'exchange': 'NSE',
                 'quantity': 100, 'avg_price': 2450,
                 'pnl': 1500, 'product': 'CNC'},
                {'symbol': 'TCS', 'exchange': 'NSE',
                 'quantity': 50, 'avg_price': 3500,
                 'pnl': -800, 'product': 'CNC'},
            ]
        }

# Demo: Kite Connect workflow
kite = KiteConnectWrapper(api_key='demo_key', access_token='demo_token')

# Place a limit order for INFY on NSE
order = KiteOrder(
    tradingsymbol='INFY',
    exchange='NSE',
    transaction_type='BUY',
    quantity=100,
    order_type='LIMIT',
    price=1450.0,
    product='CNC',
    tag='MOMENTUM_V2'
)

result = kite.place_order(order)
print("=== Zerodha Kite Order Placement ===")
for key, val in result.items():
    print(f"  {key}: {val}")

# Place a bracket order for Bank Nifty options
bo = kite.place_bracket_order(
    symbol='BANKNIFTY24MAR48000CE',
    side='BUY', qty=25, price=250.0,
    stoploss=50.0, target=100.0, trailing_sl=20.0
)
print(f"\\n=== Bracket Order ===")
for key, val in bo.items():
    print(f"  {key}: {val}")

# Test order validation
bad_order = KiteOrder(
    tradingsymbol='RELIANCE', exchange='NSE',
    transaction_type='BUY', quantity=-10,
    order_type='LIMIT', price=0
)
bad_result = kite.place_order(bad_order)
print(f"\\n=== Invalid Order ===")
print(f"  Status: {bad_result['status']}")
for err in bad_result.get('errors', []):
    print(f"  Error: {err}")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Angel One SmartAPI Integration
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Angel One SmartAPI offers free API access, making it popular for retail quant
        traders with lower trading volumes. The integration pattern is similar to Kite
        but with some key differences in authentication and data format.
      </p>

      <PythonCode
        title="angel_smartapi_integration.py"
        runnable
        code={`from datetime import datetime
from dataclasses import dataclass
from typing import Optional, List

@dataclass
class SmartAPIOrder:
    """Angel One SmartAPI order format."""
    variety: str = 'NORMAL'  # NORMAL, STOPLOSS, AMO
    tradingsymbol: str = ''
    symboltoken: str = ''
    transactiontype: str = 'BUY'
    exchange: str = 'NSE'
    ordertype: str = 'LIMIT'
    producttype: str = 'DELIVERY'  # DELIVERY, INTRADAY, CARRYFORWARD
    duration: str = 'DAY'
    price: float = 0.0
    squareoff: float = 0.0
    stoploss: float = 0.0
    quantity: int = 0

class SmartAPIWrapper:
    """Production wrapper for Angel One SmartAPI."""

    def __init__(self, api_key: str, client_id: str,
                 password: str, totp_secret: str):
        self.api_key = api_key
        self.client_id = client_id
        self.authenticated = False
        self.jwt_token = None
        self.refresh_token = None
        self.order_count = 0

    def authenticate(self) -> bool:
        """Two-factor authentication with TOTP."""
        # In production: generate TOTP, call login API
        self.authenticated = True
        self.jwt_token = 'simulated_jwt_token'
        self.refresh_token = 'simulated_refresh'
        return True

    def _validate_order(self, order: SmartAPIOrder) -> List[str]:
        """Validate order before submission."""
        errors = []
        if not self.authenticated:
            errors.append("Not authenticated")
        if order.quantity <= 0:
            errors.append("Invalid quantity")
        if order.ordertype == 'LIMIT' and order.price <= 0:
            errors.append("Price required for LIMIT")
        if not order.symboltoken:
            errors.append("Symbol token required")
        return errors

    def place_order(self, order: SmartAPIOrder) -> dict:
        """Place order via SmartAPI."""
        errors = self._validate_order(order)
        if errors:
            return {'status': 'rejected', 'errors': errors}

        self.order_count += 1
        return {
            'status': 'success',
            'orderid': f"AG{datetime.now().strftime('%Y%m%d')}{self.order_count:06d}",
            'symbol': order.tradingsymbol,
            'exchange': order.exchange,
            'type': order.ordertype,
            'quantity': order.quantity,
            'price': order.price,
        }

    def get_ltp(self, exchange: str, symbol: str,
                token: str) -> dict:
        """Get last traded price."""
        # Simulated prices for Nifty 50 stocks
        prices = {
            'RELIANCE': 2455.30, 'TCS': 3512.50,
            'HDFCBANK': 1685.20, 'INFY': 1448.75,
            'ICICIBANK': 1025.60, 'SBIN': 628.40,
        }
        return {
            'exchange': exchange,
            'tradingsymbol': symbol,
            'ltp': prices.get(symbol, 0),
        }

class UnifiedBrokerInterface:
    """Unified interface supporting multiple Indian brokers."""

    def __init__(self, broker: str, credentials: dict):
        self.broker = broker
        if broker == 'zerodha':
            self.client = KiteConnectWrapper(
                credentials.get('api_key', ''),
                credentials.get('access_token', '')
            )
        elif broker == 'angel':
            self.client = SmartAPIWrapper(
                credentials.get('api_key', ''),
                credentials.get('client_id', ''),
                credentials.get('password', ''),
                credentials.get('totp_secret', '')
            )

    def place_order(self, symbol: str, exchange: str,
                    side: str, qty: int, order_type: str,
                    price: float = 0, **kwargs) -> dict:
        """Unified order placement across brokers."""
        if self.broker == 'zerodha':
            order = KiteOrder(
                tradingsymbol=symbol, exchange=exchange,
                transaction_type=side, quantity=qty,
                order_type=order_type, price=price,
            )
            return self.client.place_order(order)
        elif self.broker == 'angel':
            order = SmartAPIOrder(
                tradingsymbol=symbol, exchange=exchange,
                transactiontype=side, quantity=qty,
                ordertype=order_type, price=price,
                symboltoken=kwargs.get('token', '2885'),
            )
            return self.client.place_order(order)

# Demo: Unified broker interface
print("=== Unified Broker Interface Demo ===\\n")

# Zerodha
zerodha = UnifiedBrokerInterface('zerodha', {
    'api_key': 'demo', 'access_token': 'demo'
})
z_result = zerodha.place_order(
    'SBIN', 'NSE', 'BUY', 200, 'LIMIT', price=625.0
)
print("Zerodha Order:")
for k, v in z_result.items():
    print(f"  {k}: {v}")

# Angel One
angel = UnifiedBrokerInterface('angel', {
    'api_key': 'demo', 'client_id': 'demo',
    'password': 'demo', 'totp_secret': 'demo'
})
angel.client.authenticate()
a_result = angel.place_order(
    'SBIN', 'NSE', 'BUY', 200, 'LIMIT',
    price=625.0, token='3045'
)
print("\\nAngel One Order:")
for k, v in a_result.items():
    print(f"  {k}: {v}")`}
      />

      <TheoremBlock
        title="Optimal Broker Selection Criterion"
        label="Theorem 18.5"
        statement="For a strategy with $N$ monthly orders of average size $V$, the optimal broker minimizes total cost: $C^* = \arg\min_{b \in \text{Brokers}} \left[ C_{\text{brokerage}}^b(N, V) + C_{\text{API}}^b + C_{\text{slippage}}^b(L_b) \right]$ where $L_b$ is the broker-specific latency. For most retail quant strategies on NSE with $N < 500$ and $V < \text{INR } 1\text{L}$, Angel One dominates due to zero API cost. For $N > 1000$ or latency-sensitive strategies, Zerodha Kite is preferred."
        proof="The proof follows from comparing the cost functions. Zerodha charges INR 2,000/month API fee but has lower average latency (50ms vs 80ms for Angel). The latency cost is $C_{\text{slippage}} \propto \sigma \sqrt{L}$, which becomes significant only for high-frequency strategies."
      />

      <ExampleBlock
        title="WebSocket Integration for Live Data"
        difficulty="intermediate"
        problem="You need to subscribe to real-time ticks for all Nifty 50 stocks using Zerodha Kite WebSocket. The pre-open session starts at 9:00 AM and main trading at 9:15 AM. Design the connection and reconnection logic."
        solution={[
          {
            step: 'Initialize WebSocket at 8:55 AM',
            formula: 't_{\\text{init}} = 09\\!:\\!00 - 5\\text{min buffer}',
            explanation: 'Start the WebSocket connection 5 minutes before pre-open to ensure data capture from the first tick.',
          },
          {
            step: 'Subscribe to instrument tokens',
            formula: 'N_{\\text{tokens}} = 50 \\text{ (Nifty 50 components)}',
            explanation: 'Each NSE instrument has a unique token. Subscribe in full mode for LTP, volume, bid/ask, and OHLC data.',
          },
          {
            step: 'Implement heartbeat and reconnection',
            formula: 't_{\\text{heartbeat}} = 5\\text{s}, \\; t_{\\text{reconnect}} = \\min(2^n, 60)\\text{s}',
            explanation: 'Send ping every 5 seconds. On disconnect, use exponential backoff starting at 1s up to 60s maximum.',
          },
          {
            step: 'Handle circuit breaker events',
            formula: '\\text{If } |\\Delta p| > 5\\% \\Rightarrow \\text{flag circuit breaker}',
            explanation: 'NSE pauses trading when a stock hits 5/10/20% circuit limits. Your handler must detect this from the tick stream and pause order generation.',
          },
        ]}
      />

      <NoteBlock title="Production Error Handling" type="warning">
        <p>
          Common failure modes when integrating with Indian broker APIs:
        </p>
        <ul className="mt-2 list-disc list-inside space-y-1">
          <li><strong>Token expiry:</strong> Kite access tokens expire daily at 6 AM; SmartAPI JWT tokens expire in 24 hours. Implement auto-refresh.</li>
          <li><strong>Rate limiting:</strong> Both APIs enforce 10 req/sec. Use a token bucket or leaky bucket rate limiter.</li>
          <li><strong>Network failures:</strong> Use exponential backoff with jitter for reconnection.</li>
          <li><strong>Order rejection:</strong> NSE rejects orders outside price bands. Always check tick data for current bands.</li>
          <li><strong>Margin shortfall:</strong> Orders rejected for insufficient margin. Implement pre-trade margin checks.</li>
          <li><strong>Market status:</strong> Handle pre-open, normal, closing, and post-market sessions differently.</li>
        </ul>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Broker integration is the critical interface between your strategy and the market.
          Build a <strong>unified broker abstraction</strong> that supports multiple Indian brokers
          (Zerodha, Angel One, Upstox) behind a common interface. This enables broker failover,
          cost optimization, and easy migration. Always implement comprehensive order validation,
          rate limiting, and error handling before going live on NSE/BSE.
        </p>
      </NoteBlock>
    </div>
  )
}
