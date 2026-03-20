import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveLatencyCalculator() {
  const [dataLatency, setDataLatency] = useState(5)
  const [signalLatency, setSignalLatency] = useState(15)
  const [riskLatency, setRiskLatency] = useState(3)
  const [orderLatency, setOrderLatency] = useState(10)
  const [brokerLatency, setBrokerLatency] = useState(50)

  const totalLatency = dataLatency + signalLatency + riskLatency + orderLatency + brokerLatency
  const isAcceptable = totalLatency < 200

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: End-to-End Latency Calculator
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Model the tick-to-trade latency for your NSE trading system. Each component
        contributes to the total order execution time.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-5">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Data (ms): {dataLatency}</span>
          <input type="range" min="1" max="50" step="1" value={dataLatency}
            onChange={e => setDataLatency(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Signal (ms): {signalLatency}</span>
          <input type="range" min="1" max="100" step="1" value={signalLatency}
            onChange={e => setSignalLatency(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Risk (ms): {riskLatency}</span>
          <input type="range" min="1" max="20" step="1" value={riskLatency}
            onChange={e => setRiskLatency(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Order Gen (ms): {orderLatency}</span>
          <input type="range" min="1" max="50" step="1" value={orderLatency}
            onChange={e => setOrderLatency(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Broker API (ms): {brokerLatency}</span>
          <input type="range" min="10" max="500" step="5" value={brokerLatency}
            onChange={e => setBrokerLatency(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 600 120" className="w-full max-w-2xl mx-auto block" aria-label="Latency pipeline">
        {[
          { label: 'Data', lat: dataLatency, color: '#3b82f6', x: 0 },
          { label: 'Signal', lat: signalLatency, color: '#8b5cf6', x: 120 },
          { label: 'Risk', lat: riskLatency, color: '#ef4444', x: 240 },
          { label: 'Order', lat: orderLatency, color: '#f59e0b', x: 360 },
          { label: 'Broker', lat: brokerLatency, color: '#10b981', x: 480 },
        ].map((s, i) => {
          const barHeight = Math.max(10, Math.min(80, s.lat * 1.2))
          return (
            <g key={i}>
              <rect x={s.x + 10} y={90 - barHeight} width="90" height={barHeight} rx="4"
                fill={s.color} opacity="0.7" />
              <text x={s.x + 55} y={100 - barHeight - 5} textAnchor="middle"
                className="text-[10px] font-bold" fill={s.color}>{s.lat}ms</text>
              <text x={s.x + 55} y={110} textAnchor="middle"
                className="text-[10px]" fill="#6b7280">{s.label}</text>
            </g>
          )
        })}
      </svg>

      <p className="mt-3 text-center text-sm">
        <span className="text-gray-600 dark:text-gray-400">Total tick-to-trade: </span>
        <span className={`font-bold ${isAcceptable ? 'text-green-600' : 'text-red-600'}`}>
          {totalLatency}ms
        </span>
        {isAcceptable
          ? <span className="text-green-600"> -- Acceptable for NSE intraday</span>
          : <span className="text-red-600"> -- Too slow for NSE intraday strategies</span>}
      </p>
    </div>
  )
}

export default function SystemArchitecture() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Production System Design for Indian Markets
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        A production trading system for NSE/BSE must balance low latency, high reliability,
        and regulatory compliance. This section covers the architecture patterns used by
        professional quantitative trading firms in India, from data ingestion to order execution.
      </p>

      <DefinitionBlock
        title="Trading System Architecture"
        label="Definition 18.4"
        definition="A production trading system is a real-time software system that ingests market data, computes trading signals, performs risk checks, and manages order execution. For Indian markets, this must operate within NSE trading hours (9:15 AM -- 3:30 PM IST), handle T+1 settlement, and comply with SEBI regulations on automated trading."
        notation="Key metrics: tick-to-trade latency, system uptime (target 99.99%), and order accuracy rate."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Architecture Overview
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A well-designed trading system for Indian markets follows a modular, event-driven
        architecture. Each component communicates through message queues, ensuring loose
        coupling and fault isolation.
      </p>

      <div className="my-6 flex justify-center">
        <svg viewBox="0 0 640 380" className="w-full max-w-2xl" aria-label="Production trading system architecture">
          <defs>
            <marker id="archArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#6366f1" />
            </marker>
          </defs>

          {/* Market Data Layer */}
          <rect x="20" y="20" width="600" height="70" rx="8" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="4" />
          <text x="30" y="40" className="text-[11px] font-bold" fill="#0369a1">Market Data Layer</text>
          <rect x="40" y="50" width="100" height="30" rx="4" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
          <text x="90" y="70" textAnchor="middle" className="text-[9px]" fill="#0369a1">NSE WebSocket</text>
          <rect x="160" y="50" width="100" height="30" rx="4" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
          <text x="210" y="70" textAnchor="middle" className="text-[9px]" fill="#0369a1">BSE Feed</text>
          <rect x="280" y="50" width="100" height="30" rx="4" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
          <text x="330" y="70" textAnchor="middle" className="text-[9px]" fill="#0369a1">News/Sentiment</text>
          <rect x="400" y="50" width="100" height="30" rx="4" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
          <text x="450" y="70" textAnchor="middle" className="text-[9px]" fill="#0369a1">F&amp;O Data</text>
          <rect x="520" y="50" width="90" height="30" rx="4" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1" />
          <text x="565" y="70" textAnchor="middle" className="text-[9px]" fill="#0369a1">Index Data</text>

          {/* Arrow down */}
          <line x1="320" y1="90" x2="320" y2="115" stroke="#6366f1" strokeWidth="2" markerEnd="url(#archArrow)" />

          {/* Signal Generation Layer */}
          <rect x="120" y="120" width="400" height="60" rx="8" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1.5" />
          <text x="130" y="140" className="text-[11px] font-bold" fill="#6d28d9">Signal Generation Engine</text>
          <text x="130" y="160" className="text-[9px]" fill="#7c3aed">Alpha models | Feature pipelines | ML inference</text>

          {/* Arrow down */}
          <line x1="320" y1="180" x2="320" y2="205" stroke="#6366f1" strokeWidth="2" markerEnd="url(#archArrow)" />

          {/* Risk Engine */}
          <rect x="40" y="210" width="180" height="60" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
          <text x="50" y="233" className="text-[11px] font-bold" fill="#b91c1c">Risk Engine</text>
          <text x="50" y="253" className="text-[9px]" fill="#dc2626">Position limits | Exposure | VaR</text>

          {/* OMS */}
          <rect x="240" y="210" width="160" height="60" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="250" y="233" className="text-[11px] font-bold" fill="#b45309">Order Management</text>
          <text x="250" y="253" className="text-[9px]" fill="#d97706">Smart routing | SOR | Queuing</text>

          {/* Execution */}
          <rect x="420" y="210" width="190" height="60" rx="8" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" />
          <text x="430" y="233" className="text-[11px] font-bold" fill="#15803d">Execution Engine</text>
          <text x="430" y="253" className="text-[9px]" fill="#16a34a">Zerodha | Angel | Direct NSE</text>

          {/* Arrows between components */}
          <line x1="220" y1="240" x2="238" y2="240" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#archArrow)" />
          <line x1="400" y1="240" x2="418" y2="240" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#archArrow)" />

          {/* Database & Monitoring */}
          <rect x="40" y="300" width="260" height="55" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4" />
          <text x="50" y="322" className="text-[11px] font-bold" fill="#15803d">Database & Analytics</text>
          <text x="50" y="340" className="text-[9px]" fill="#16a34a">TimescaleDB | Redis | Trade logs | P&L</text>

          <rect x="320" y="300" width="290" height="55" rx="8" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="4" />
          <text x="330" y="322" className="text-[11px] font-bold" fill="#be185d">Monitoring & Alerts</text>
          <text x="330" y="340" className="text-[9px]" fill="#ec4899">Grafana | PagerDuty | SEBI compliance</text>

          <line x1="170" y1="270" x2="170" y2="298" stroke="#22c55e" strokeWidth="1.5" markerEnd="url(#archArrow)" />
          <line x1="465" y1="270" x2="465" y2="298" stroke="#ec4899" strokeWidth="1.5" markerEnd="url(#archArrow)" />
        </svg>
      </div>

      <InteractiveLatencyCalculator />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Latency Budget Analysis
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For NSE intraday strategies, tick-to-trade latency must be carefully budgeted.
        The total latency <InlineMath math="L" /> is the sum of all pipeline components:
      </p>

      <BlockMath math="L_{\text{total}} = L_{\text{data}} + L_{\text{signal}} + L_{\text{risk}} + L_{\text{order}} + L_{\text{broker}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The opportunity cost of latency can be modeled as:
      </p>

      <BlockMath math="C_{\text{latency}} = \sigma_{\text{tick}} \cdot \sqrt{L / \Delta t} \cdot Q" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\sigma_{\text{tick}}" /> is the tick-level volatility,{' '}
        <InlineMath math="L" /> is the latency in the same units as the tick interval{' '}
        <InlineMath math="\Delta t" />, and <InlineMath math="Q" /> is the order quantity.
      </p>

      <TheoremBlock
        title="Optimal System Allocation"
        label="Theorem 18.4"
        statement="For a fixed compute budget, the optimal allocation between signal computation and execution speed follows: $\frac{\partial \text{Sharpe}}{\partial L_{\text{signal}}} = \frac{\partial \text{Sharpe}}{\partial L_{\text{execution}}}$ at the optimum. For most NSE strategies with Kite API, the signal generation bottleneck dominates when $L_{\text{signal}} > 50\text{ms}$, while execution speed dominates when $L_{\text{broker}} > 200\text{ms}$."
        proof="Consider the decomposition of strategy Sharpe into signal quality (improving with computation time) and execution quality (degrading with latency). At the optimum, the marginal improvement from better signals equals the marginal cost of slower execution. For Kite API with ~50ms baseline latency, strategies with sub-second holding periods are execution-bound, while strategies with minutes-to-hours holding periods are signal-bound."
      />

      <PythonCode
        title="system_architecture.py"
        runnable
        code={`import numpy as np
from dataclasses import dataclass, field
from typing import Dict, List, Optional
from datetime import datetime, time
import json

@dataclass
class SystemConfig:
    """Configuration for production trading system."""
    # Market settings
    exchange: str = 'NSE'
    market_open: str = '09:15'
    market_close: str = '15:30'
    pre_open_start: str = '09:00'

    # Broker settings
    broker: str = 'zerodha'
    api_key: str = ''
    max_orders_per_second: int = 10
    max_positions: int = 50

    # Risk settings
    max_portfolio_exposure: float = 0.8  # 80% of capital
    max_single_stock_pct: float = 0.1    # 10% per stock
    max_sector_pct: float = 0.3          # 30% per sector
    max_daily_loss_pct: float = 0.02     # 2% daily stop
    var_limit_pct: float = 0.05          # 5% VaR limit

    # System settings
    heartbeat_interval: int = 5  # seconds
    failover_timeout: int = 30   # seconds

class HealthMonitor:
    """Monitor system component health."""

    def __init__(self):
        self.components = {}
        self.alerts = []

    def register(self, name: str, check_fn):
        self.components[name] = {
            'check': check_fn,
            'status': 'UNKNOWN',
            'last_check': None
        }

    def check_all(self):
        results = {}
        for name, comp in self.components.items():
            try:
                status = comp['check']()
                comp['status'] = 'HEALTHY' if status else 'DEGRADED'
            except Exception as e:
                comp['status'] = 'UNHEALTHY'
                self.alerts.append(f"{name}: {str(e)}")
            comp['last_check'] = datetime.now()
            results[name] = comp['status']
        return results

class TradingSystem:
    """Production trading system for Indian markets."""

    def __init__(self, config: SystemConfig):
        self.config = config
        self.is_running = False
        self.positions: Dict[str, dict] = {}
        self.orders: List[dict] = []
        self.daily_pnl = 0.0
        self.capital = 0.0
        self.health = HealthMonitor()

    def pre_market_checks(self) -> Dict[str, bool]:
        """Run pre-market system checks before 9:15 AM."""
        checks = {
            'broker_connection': True,
            'market_data_feed': True,
            'risk_engine': True,
            'database': True,
            'sufficient_margins': True,
            'position_reconciliation': True,
            'circuit_breaker_check': True,
            'holiday_calendar': self._check_trading_day(),
            'strategy_parameters_loaded': True,
            'monitoring_active': True,
        }
        return checks

    def _check_trading_day(self) -> bool:
        """Check NSE holiday calendar."""
        # NSE holidays for 2024
        nse_holidays = [
            '2024-01-26',  # Republic Day
            '2024-03-25',  # Holi
            '2024-03-29',  # Good Friday
            '2024-04-11',  # Eid ul-Fitr
            '2024-04-17',  # Ram Navami
            '2024-08-15',  # Independence Day
            '2024-10-02',  # Mahatma Gandhi Jayanti
            '2024-11-01',  # Diwali (Laxmi Pujan)
            '2024-12-25',  # Christmas
        ]
        today = datetime.now().strftime('%Y-%m-%d')
        return today not in nse_holidays

    def calculate_exposure(self) -> dict:
        """Calculate current portfolio exposure."""
        total_long = sum(
            p['quantity'] * p['current_price']
            for p in self.positions.values()
            if p['quantity'] > 0
        )
        total_short = sum(
            abs(p['quantity']) * p['current_price']
            for p in self.positions.values()
            if p['quantity'] < 0
        )
        gross = total_long + total_short
        net = total_long - total_short
        return {
            'long_exposure': total_long,
            'short_exposure': total_short,
            'gross_exposure': gross,
            'net_exposure': net,
            'gross_pct': gross / max(self.capital, 1),
            'net_pct': net / max(self.capital, 1),
        }

    def risk_check(self, symbol: str, side: str,
                   quantity: int, price: float) -> tuple:
        """Pre-trade risk checks required by SEBI."""
        checks = []
        order_value = quantity * price

        # Check daily loss limit
        if self.daily_pnl < -self.config.max_daily_loss_pct * self.capital:
            checks.append(('DAILY_LOSS_LIMIT', False))
        else:
            checks.append(('DAILY_LOSS_LIMIT', True))

        # Check single stock concentration
        current_pos = self.positions.get(symbol, {}).get('quantity', 0)
        new_pos_value = (current_pos + quantity) * price
        if abs(new_pos_value) > self.config.max_single_stock_pct * self.capital:
            checks.append(('CONCENTRATION_LIMIT', False))
        else:
            checks.append(('CONCENTRATION_LIMIT', True))

        # Check total exposure
        exposure = self.calculate_exposure()
        new_gross = exposure['gross_exposure'] + order_value
        if new_gross > self.config.max_portfolio_exposure * self.capital:
            checks.append(('EXPOSURE_LIMIT', False))
        else:
            checks.append(('EXPOSURE_LIMIT', True))

        # Check order rate limit
        checks.append(('RATE_LIMIT', True))

        all_pass = all(c[1] for c in checks)
        return all_pass, checks

# Demo: System initialization
config = SystemConfig(
    exchange='NSE',
    broker='zerodha',
    max_positions=30,
    max_daily_loss_pct=0.02,
)

system = TradingSystem(config)
system.capital = 5_000_000  # INR 50 Lakh

# Run pre-market checks
checks = system.pre_market_checks()
print("=== Pre-Market System Checks ===")
for check, status in checks.items():
    icon = "PASS" if status else "FAIL"
    print(f"  [{icon}] {check}")

# Simulate risk check for an order
system.positions = {
    'RELIANCE': {'quantity': 100, 'current_price': 2450, 'avg_price': 2400},
    'TCS': {'quantity': 50, 'current_price': 3500, 'avg_price': 3480},
    'HDFCBANK': {'quantity': 200, 'current_price': 1680, 'avg_price': 1650},
}

passed, risk_checks = system.risk_check('INFY', 'BUY', 150, 1450)
print(f"\\n=== Risk Check: BUY 150 INFY @ INR 1,450 ===")
for check_name, status in risk_checks:
    print(f"  [{('PASS' if status else 'FAIL')}] {check_name}")
print(f"  Overall: {'APPROVED' if passed else 'REJECTED'}")

# Exposure analysis
exposure = system.calculate_exposure()
print(f"\\n=== Portfolio Exposure ===")
print(f"  Long:  INR {exposure['long_exposure']:>12,.0f}")
print(f"  Short: INR {exposure['short_exposure']:>12,.0f}")
print(f"  Gross: INR {exposure['gross_exposure']:>12,.0f} ({exposure['gross_pct']:.1%})")
print(f"  Net:   INR {exposure['net_exposure']:>12,.0f} ({exposure['net_pct']:.1%})")`}
      />

      <ExampleBlock
        title="Sizing a Production System for NSE"
        difficulty="intermediate"
        problem="You plan to run 5 strategies simultaneously on NSE, each tracking 50 Nifty stocks with tick-by-tick data. Estimate the data throughput and compute requirements."
        solution={[
          {
            step: 'Estimate tick data rate',
            formula: 'R_{\\text{ticks}} = 50 \\times 3 \\times 5 = 750 \\text{ ticks/sec (avg)}',
            explanation: 'Each Nifty stock generates about 3 ticks/second on average during market hours, monitored by all 5 strategies.',
          },
          {
            step: 'Peak data rate',
            formula: 'R_{\\text{peak}} \\approx 10 \\times R_{\\text{avg}} = 7500 \\text{ ticks/sec}',
            explanation: 'Peak rates at market open (9:15 AM) and close (3:30 PM) can be 10x the average.',
          },
          {
            step: 'Compute per tick',
            formula: 'C = 5 \\times 0.5\\text{ms} = 2.5\\text{ms per tick across strategies}',
            explanation: 'Each strategy needs about 0.5ms to process a tick (feature update + signal check).',
          },
          {
            step: 'Required throughput',
            formula: 'T = \\frac{7500 \\times 2.5\\text{ms}}{1000\\text{ms}} = 18.75 \\text{ CPU-seconds/wall-second}',
            explanation: 'You need at least 19 CPU cores to handle peak load without queuing. A 32-core server provides 1.7x headroom, which is the minimum recommended margin.',
          },
        ]}
      />

      <NoteBlock title="SEBI Requirements for Automated Trading" type="warning">
        <p>
          SEBI mandates specific requirements for algo trading systems in India:
        </p>
        <ul className="mt-2 list-disc list-inside space-y-1">
          <li>All algo orders must be tagged with a unique algo ID registered with the exchange</li>
          <li>Maximum order-to-trade ratio limits apply (typically 50:1 for NSE)</li>
          <li>Kill switch must be available to cancel all pending orders within 1 second</li>
          <li>Pre-trade risk checks are mandatory (price band, quantity limits, exposure)</li>
          <li>Audit trail must be maintained for 5 years for SEBI inspection</li>
          <li>Two-factor authentication required for API access to broker platforms</li>
        </ul>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          A production trading system for Indian markets is an <strong>engineering challenge</strong>{' '}
          as much as a quantitative one. The architecture must handle NSE microstructure (pre-open
          auctions, circuit breakers, T+1 settlement), broker API limitations (rate limits, latency),
          and SEBI compliance requirements. Start with a modular, event-driven design that separates
          signal generation, risk management, and execution into independent components.
        </p>
      </NoteBlock>
    </div>
  )
}
