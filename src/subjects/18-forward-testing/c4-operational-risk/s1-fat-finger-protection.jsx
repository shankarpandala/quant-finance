import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveRiskChecker() {
  const [orderValue, setOrderValue] = useState(200000)
  const [capital, setCapital] = useState(5000000)
  const [priceDeviation, setPriceDeviation] = useState(2)
  const [currentPositions, setCurrentPositions] = useState(8)

  const orderPct = (orderValue / capital) * 100
  const maxOrderPct = 10
  const maxDeviation = 5
  const maxPositions = 30

  const checks = [
    { name: 'Order Size', pass: orderPct <= maxOrderPct, value: `${orderPct.toFixed(1)}%`, limit: `${maxOrderPct}%` },
    { name: 'Price Band', pass: priceDeviation <= maxDeviation, value: `${priceDeviation}%`, limit: `${maxDeviation}%` },
    { name: 'Position Count', pass: currentPositions < maxPositions, value: `${currentPositions}`, limit: `${maxPositions}` },
    { name: 'Daily Exposure', pass: orderPct + (currentPositions * 5) < 80, value: `${(orderPct + currentPositions * 5).toFixed(0)}%`, limit: '80%' },
  ]

  const allPass = checks.every(c => c.pass)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Pre-Trade Risk Check Simulator
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Simulate SEBI-mandated pre-trade risk checks for an NSE order.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Order Value: INR {(orderValue / 100000).toFixed(1)}L</span>
          <input type="range" min="10000" max="2000000" step="10000" value={orderValue}
            onChange={e => setOrderValue(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Capital: INR {(capital / 100000).toFixed(0)}L</span>
          <input type="range" min="500000" max="50000000" step="500000" value={capital}
            onChange={e => setCapital(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Price Deviation (%): {priceDeviation}</span>
          <input type="range" min="0" max="15" step="0.5" value={priceDeviation}
            onChange={e => setPriceDeviation(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Current Positions: {currentPositions}</span>
          <input type="range" min="0" max="50" step="1" value={currentPositions}
            onChange={e => setCurrentPositions(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="space-y-2">
        {checks.map((check, i) => (
          <div key={i} className={`flex items-center justify-between rounded-lg p-2 ${check.pass ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{check.name}</span>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-gray-500">Value: {check.value}</span>
              <span className="text-gray-500">Limit: {check.limit}</span>
              <span className={`font-bold ${check.pass ? 'text-green-600' : 'text-red-600'}`}>
                {check.pass ? 'PASS' : 'FAIL'}
              </span>
            </div>
          </div>
        ))}
        <div className={`rounded-lg p-3 text-center font-bold ${allPass ? 'bg-green-100 text-green-700 dark:bg-green-900/40' : 'bg-red-100 text-red-700 dark:bg-red-900/40'}`}>
          Order {allPass ? 'APPROVED' : 'REJECTED'}
        </div>
      </div>
    </div>
  )
}

export default function FatFingerProtection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Pre-Trade Risk Checks and Position Limits
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Fat-finger errors and algorithmic glitches have caused spectacular losses in markets
        worldwide. In India, SEBI mandates specific pre-trade risk checks for all algorithmic
        trading systems. This section covers the design of a comprehensive pre-trade risk
        engine for NSE/BSE trading.
      </p>

      <DefinitionBlock
        title="Fat-Finger Error"
        label="Definition 18.9"
        definition="A fat-finger error is an erroneous trade caused by incorrect order parameters -- wrong quantity, wrong price, wrong symbol, or wrong side (buy instead of sell). In algorithmic trading, fat-finger errors can be amplified by automation, potentially submitting thousands of erroneous orders per second. SEBI requires all algo trading systems to implement pre-trade risk checks to prevent such errors."
        notation="Famous examples: the 2012 Knight Capital glitch ($440M loss in 45 minutes) and the 2014 NSE Emkay incident where a fat-finger trade crashed the Nifty by 900 points."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        SEBI-Mandated Pre-Trade Risk Checks
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        SEBI circular SEBI/HO/MRD/DP/CIR/P/2019/62 mandates the following pre-trade
        risk checks for all algo orders on NSE and BSE:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Check</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Description</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Typical Limit</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Price band check</td>
              <td className="px-4 py-2">Order price within NSE circuit limits</td>
              <td className="px-4 py-2">5/10/20% from previous close</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Quantity limit</td>
              <td className="px-4 py-2">Single order quantity cap</td>
              <td className="px-4 py-2">Exchange-defined lot limits</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Order value limit</td>
              <td className="px-4 py-2">Maximum INR value per order</td>
              <td className="px-4 py-2">10% of capital</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Order-to-trade ratio</td>
              <td className="px-4 py-2">Max pending/executed ratio</td>
              <td className="px-4 py-2">50:1 (NSE)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Cumulative exposure</td>
              <td className="px-4 py-2">Total portfolio exposure cap</td>
              <td className="px-4 py-2">80% of capital</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Kill switch</td>
              <td className="px-4 py-2">Ability to cancel all orders</td>
              <td className="px-4 py-2">Within 1 second</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveRiskChecker />

      <TheoremBlock
        title="Position Sizing with Risk Constraints"
        label="Theorem 18.9"
        statement="Given capital $C$, maximum position concentration $\gamma$, and a Kelly fraction $f^*$ for stock $i$, the constrained position size is: $q_i^* = \min\left(\frac{f^* \cdot C}{p_i}, \; \frac{\gamma \cdot C}{p_i}, \; Q_{\max,i}\right)$ where $Q_{\max,i}$ is the exchange-defined quantity limit and $p_i$ is the stock price. The Kelly fraction for Indian equities with STT is: $f^* = \frac{\mu_i - r_f - c_i}{\sigma_i^2}$ where $c_i$ includes STT, brokerage, and impact cost."
        proof="The Kelly criterion maximizes the expected log-wealth growth rate. The additional constraint from SEBI position limits ensures no single position can exceed the concentration limit. For NSE Nifty 50 stocks, the exchange quantity limit is typically large enough that the concentration constraint binds first."
      />

      <PythonCode
        title="pre_trade_risk_engine.py"
        runnable
        code={`import numpy as np
from dataclasses import dataclass, field
from typing import Dict, List, Tuple
from datetime import datetime, time

@dataclass
class RiskLimits:
    """Pre-trade risk limits for NSE trading."""
    max_order_value_pct: float = 0.10      # 10% of capital
    max_order_quantity: int = 10000         # Max shares per order
    max_price_deviation_pct: float = 0.05   # 5% from LTP
    max_position_pct: float = 0.15          # 15% concentration
    max_sector_pct: float = 0.30            # 30% sector
    max_gross_exposure_pct: float = 0.80    # 80% total
    max_daily_loss_pct: float = 0.02        # 2% daily stop
    max_orders_per_second: int = 10         # Rate limit
    max_daily_orders: int = 500             # Daily cap
    max_order_to_trade_ratio: float = 50.0  # SEBI mandate

@dataclass
class PreTradeCheck:
    name: str
    passed: bool
    value: float
    limit: float
    message: str

class PreTradeRiskEngine:
    """SEBI-compliant pre-trade risk engine for NSE."""

    def __init__(self, capital: float, limits: RiskLimits = None):
        self.capital = capital
        self.limits = limits or RiskLimits()
        self.positions: Dict[str, dict] = {}
        self.daily_pnl: float = 0.0
        self.daily_order_count: int = 0
        self.daily_fill_count: int = 0
        self.order_timestamps: List[float] = []
        self.rejected_orders: List[dict] = []

    def check_order(self, symbol: str, side: str,
                    quantity: int, price: float,
                    ltp: float, sector: str = '') -> Tuple[bool, List[PreTradeCheck]]:
        """Run all pre-trade risk checks."""
        checks = []
        order_value = quantity * price

        # 1. Order value check
        max_val = self.limits.max_order_value_pct * self.capital
        checks.append(PreTradeCheck(
            'ORDER_VALUE', order_value <= max_val,
            order_value, max_val,
            f'Order INR {order_value:,.0f} vs limit INR {max_val:,.0f}'
        ))

        # 2. Quantity check
        checks.append(PreTradeCheck(
            'QUANTITY', quantity <= self.limits.max_order_quantity,
            quantity, self.limits.max_order_quantity,
            f'Qty {quantity} vs limit {self.limits.max_order_quantity}'
        ))

        # 3. Price deviation check (fat-finger)
        if ltp > 0:
            dev = abs(price - ltp) / ltp
            max_dev = self.limits.max_price_deviation_pct
            checks.append(PreTradeCheck(
                'PRICE_DEVIATION', dev <= max_dev,
                dev * 100, max_dev * 100,
                f'Deviation {dev*100:.2f}% vs limit {max_dev*100}%'
            ))

        # 4. Position concentration check
        existing_value = 0
        if symbol in self.positions:
            pos = self.positions[symbol]
            existing_value = abs(pos['quantity'] * pos['price'])
        new_value = existing_value + order_value
        max_conc = self.limits.max_position_pct * self.capital
        checks.append(PreTradeCheck(
            'CONCENTRATION', new_value <= max_conc,
            new_value / self.capital * 100,
            self.limits.max_position_pct * 100,
            f'Position {new_value/self.capital*100:.1f}% vs limit'
        ))

        # 5. Sector exposure check
        sector_value = sum(
            abs(p['quantity'] * p['price'])
            for p in self.positions.values()
            if p.get('sector') == sector
        ) + order_value
        max_sector = self.limits.max_sector_pct * self.capital
        checks.append(PreTradeCheck(
            'SECTOR_EXPOSURE', sector_value <= max_sector,
            sector_value / self.capital * 100,
            self.limits.max_sector_pct * 100,
            f'Sector {sector_value/self.capital*100:.1f}% vs limit'
        ))

        # 6. Gross exposure check
        gross = sum(
            abs(p['quantity'] * p['price'])
            for p in self.positions.values()
        ) + order_value
        max_gross = self.limits.max_gross_exposure_pct * self.capital
        checks.append(PreTradeCheck(
            'GROSS_EXPOSURE', gross <= max_gross,
            gross / self.capital * 100,
            self.limits.max_gross_exposure_pct * 100,
            f'Gross {gross/self.capital*100:.1f}% vs limit'
        ))

        # 7. Daily loss check
        checks.append(PreTradeCheck(
            'DAILY_LOSS', self.daily_pnl > -self.limits.max_daily_loss_pct * self.capital,
            abs(min(0, self.daily_pnl)) / self.capital * 100,
            self.limits.max_daily_loss_pct * 100,
            f'Daily loss {abs(min(0, self.daily_pnl)):,.0f} vs limit'
        ))

        # 8. Rate limit check
        now = datetime.now().timestamp()
        recent = [t for t in self.order_timestamps
                  if now - t < 1.0]
        checks.append(PreTradeCheck(
            'RATE_LIMIT', len(recent) < self.limits.max_orders_per_second,
            len(recent), self.limits.max_orders_per_second,
            f'{len(recent)} orders in last second'
        ))

        # 9. Order-to-trade ratio
        if self.daily_fill_count > 0:
            otr = self.daily_order_count / self.daily_fill_count
        else:
            otr = self.daily_order_count
        checks.append(PreTradeCheck(
            'ORDER_TO_TRADE_RATIO',
            otr <= self.limits.max_order_to_trade_ratio,
            otr, self.limits.max_order_to_trade_ratio,
            f'OTR {otr:.1f} vs limit {self.limits.max_order_to_trade_ratio}'
        ))

        all_pass = all(c.passed for c in checks)
        if not all_pass:
            self.rejected_orders.append({
                'symbol': symbol, 'side': side,
                'quantity': quantity, 'price': price,
                'failures': [c.name for c in checks if not c.passed],
                'timestamp': datetime.now().isoformat(),
            })

        self.daily_order_count += 1
        self.order_timestamps.append(now)

        return all_pass, checks

    def kill_switch(self) -> dict:
        """Emergency: cancel all pending orders."""
        cancelled = self.daily_order_count
        self.daily_order_count = 0
        return {
            'status': 'KILL_SWITCH_ACTIVATED',
            'orders_cancelled': cancelled,
            'timestamp': datetime.now().isoformat(),
            'action': 'ALL_PENDING_ORDERS_CANCELLED',
        }

# Demo: Pre-trade risk engine
engine = PreTradeRiskEngine(capital=5_000_000)

# Add existing positions
engine.positions = {
    'RELIANCE': {'quantity': 100, 'price': 2450, 'sector': 'Energy'},
    'TCS': {'quantity': 50, 'price': 3500, 'sector': 'IT'},
    'HDFCBANK': {'quantity': 200, 'price': 1680, 'sector': 'Banking'},
}
engine.daily_fill_count = 15

# Test order 1: Normal order (should pass)
print("=== Test 1: Normal Order ===")
passed, checks = engine.check_order(
    'INFY', 'BUY', 100, 1450, ltp=1448, sector='IT'
)
for c in checks:
    status = "PASS" if c.passed else "FAIL"
    print(f"  [{status}] {c.name:25s}: {c.message}")
print(f"  Result: {'APPROVED' if passed else 'REJECTED'}\\n")

# Test order 2: Fat-finger price (should fail)
print("=== Test 2: Fat-Finger Price ===")
passed, checks = engine.check_order(
    'SBIN', 'BUY', 500, 750, ltp=625, sector='Banking'
)
for c in checks:
    if not c.passed:
        print(f"  [FAIL] {c.name:25s}: {c.message}")
print(f"  Result: {'APPROVED' if passed else 'REJECTED'}\\n")

# Test order 3: Excessive quantity (should fail)
print("=== Test 3: Excessive Order Size ===")
passed, checks = engine.check_order(
    'ITC', 'BUY', 15000, 440, ltp=440, sector='FMCG'
)
for c in checks:
    if not c.passed:
        print(f"  [FAIL] {c.name:25s}: {c.message}")
print(f"  Result: {'APPROVED' if passed else 'REJECTED'}")

# Kill switch demo
print(f"\\n=== Kill Switch ===")
result = engine.kill_switch()
for k, v in result.items():
    print(f"  {k}: {v}")`}
      />

      <ExampleBlock
        title="The 2012 NSE Fat-Finger Incident"
        difficulty="beginner"
        problem="In October 2012, an Emkay Global trader accidentally placed a sell order for Nifty futures worth INR 650 crore instead of INR 65 lakh. The Nifty crashed 900 points in seconds. What pre-trade checks would have prevented this?"
        solution={[
          {
            step: 'Order value check',
            formula: '\\text{Order value} = 6.5 \\times 10^9 \\gg 0.10 \\times \\text{Capital}',
            explanation: 'The order was 1000x the intended size. An order value limit of 10% of capital would have blocked it immediately.',
          },
          {
            step: 'Quantity sanity check',
            formula: 'Q_{\\text{order}} \\gg Q_{\\text{typical}} \\times 10',
            explanation: 'The quantity was orders of magnitude larger than the trader typical order. A check against historical order size (e.g., max 10x average) would flag this.',
          },
          {
            step: 'Gross exposure check',
            formula: '\\text{New exposure} \\gg 0.80 \\times \\text{Capital}',
            explanation: 'The single order would have exceeded the firm entire capital. A gross exposure limit would have prevented the order.',
          },
          {
            step: 'Lesson',
            formula: '\\text{Prevention cost} \\ll \\text{Loss of INR 650 Cr}',
            explanation: 'Implementing a pre-trade risk engine with these basic checks costs essentially nothing compared to the potential loss. This is why SEBI now mandates these checks for all algo trading systems.',
          },
        ]}
      />

      <NoteBlock title="Kill Switch Implementation" type="warning">
        <p>
          SEBI mandates that every algo trading system must have a <strong>kill switch</strong>{' '}
          capable of cancelling all pending orders within 1 second. Implementation requirements:
        </p>
        <ul className="mt-2 list-disc list-inside space-y-1">
          <li>Accessible via API call, dashboard button, and keyboard shortcut</li>
          <li>Must cancel all pending orders across all segments (equity, F&amp;O, commodity)</li>
          <li>Must work independently of the main trading system (separate process)</li>
          <li>Must log the activation with timestamp and reason</li>
          <li>Must notify all stakeholders (risk team, compliance, operations)</li>
          <li>Test the kill switch weekly during non-market hours</li>
        </ul>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Pre-trade risk checks are not just a regulatory requirement -- they are your{' '}
          <strong>first and most important line of defense</strong> against catastrophic
          trading errors. Every order submitted to NSE/BSE must pass through at least
          9 independent checks: order value, quantity, price band, concentration, sector
          exposure, gross exposure, daily loss, rate limit, and order-to-trade ratio.
          The cost of implementing these checks is negligible; the cost of not implementing
          them can be existential.
        </p>
      </NoteBlock>
    </div>
  )
}
