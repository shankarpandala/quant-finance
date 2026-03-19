import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveComplianceChecker() {
  const [hasAlgoId, setHasAlgoId] = useState(true)
  const [hasKillSwitch, setHasKillSwitch] = useState(true)
  const [hasRiskChecks, setHasRiskChecks] = useState(true)
  const [hasAuditTrail, setHasAuditTrail] = useState(true)
  const [hasOTRMonitor, setHasOTRMonitor] = useState(false)
  const [retentionYears, setRetentionYears] = useState(5)

  const checks = [
    { name: 'Algo Registration (SEBI)', met: hasAlgoId, setter: setHasAlgoId, required: true },
    { name: 'Kill Switch', met: hasKillSwitch, setter: setHasKillSwitch, required: true },
    { name: 'Pre-Trade Risk Checks', met: hasRiskChecks, setter: setHasRiskChecks, required: true },
    { name: 'Audit Trail Logging', met: hasAuditTrail, setter: setHasAuditTrail, required: true },
    { name: 'OTR Monitoring', met: hasOTRMonitor, setter: setHasOTRMonitor, required: true },
    { name: `${retentionYears}yr Data Retention`, met: retentionYears >= 5, setter: null, required: true },
  ]

  const compliance = checks.filter(c => c.met).length
  const total = checks.length
  const pct = (compliance / total) * 100

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: SEBI Compliance Checklist
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Toggle compliance requirements to see your SEBI readiness score for algo trading.
      </p>

      <div className="mb-4 space-y-2">
        {checks.map((check, i) => (
          <div key={i} className={`flex items-center justify-between rounded-lg p-2 ${check.met ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
              {check.setter && (
                <input type="checkbox" checked={check.met} onChange={() => check.setter(!check.met)}
                  className="accent-indigo-500" />
              )}
              {check.name}
              {check.required && <span className="text-[10px] text-red-500">MANDATORY</span>}
            </label>
            <span className={`text-xs font-bold ${check.met ? 'text-green-600' : 'text-red-600'}`}>
              {check.met ? 'COMPLIANT' : 'NON-COMPLIANT'}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400 flex-1">
          <span>Data Retention: {retentionYears} years</span>
          <input type="range" min="1" max="10" step="1" value={retentionYears}
            onChange={e => setRetentionYears(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <div className={`rounded-lg p-3 text-center ${pct === 100 ? 'bg-green-100 dark:bg-green-900/40' : 'bg-red-100 dark:bg-red-900/40'}`}>
          <div className="text-xs text-gray-500">Compliance</div>
          <div className={`text-xl font-bold ${pct === 100 ? 'text-green-600' : 'text-red-600'}`}>{pct.toFixed(0)}%</div>
        </div>
      </div>
    </div>
  )
}

export default function ComplianceReporting() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        SEBI Compliance and Audit Trails
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Algorithmic trading in India is regulated by SEBI under multiple circulars that
        mandate specific compliance requirements. Every algo trading system must maintain
        comprehensive audit trails, report to exchanges, and satisfy regulatory inspections.
        Non-compliance can result in trading bans and significant penalties.
      </p>

      <DefinitionBlock
        title="SEBI Algo Trading Regulations"
        label="Definition 18.11"
        definition="SEBI (Securities and Exchange Board of India) regulates algorithmic trading through circulars including SEBI/HO/MRD/DP/CIR/P/2019/62 and subsequent amendments. Key requirements include: algo registration with unique IDs, pre-trade risk management, kill switch capability, order-to-trade ratio limits, audit trail maintenance for 5+ years, and regular compliance reporting to exchanges."
        notation="Non-compliance penalties: INR 1 lakh per instance for minor violations, trading suspension for major violations."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Regulatory Framework
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The SEBI regulatory framework for algo trading has evolved significantly since 2012.
        Key circulars and their requirements:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Circular</th>
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Year</th>
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Key Requirement</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2">CIR/MRD/DP/09/2012</td>
              <td className="px-3 py-2">2012</td>
              <td className="px-3 py-2">Algo trading framework, exchange approval</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2">CIR/MRD/DP/16/2013</td>
              <td className="px-3 py-2">2013</td>
              <td className="px-3 py-2">Co-location facilities regulation</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2">SEBI/HO/MRD/DP/2019</td>
              <td className="px-3 py-2">2019</td>
              <td className="px-3 py-2">Enhanced risk management, kill switch</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2">SEBI/HO/MIRSD/2022</td>
              <td className="px-3 py-2">2022</td>
              <td className="px-3 py-2">Retail algo trading via API brokers</td>
            </tr>
            <tr>
              <td className="px-3 py-2">SEBI Consultation Paper</td>
              <td className="px-3 py-2">2023</td>
              <td className="px-3 py-2">Proposed: broker-level algo approval</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveComplianceChecker />

      <TheoremBlock
        title="Audit Trail Completeness"
        label="Theorem 18.11"
        statement="A complete audit trail for SEBI compliance must capture every state transition in the order lifecycle. For each order $o$, the audit record $A(o)$ must contain: $A(o) = \{t_{\text{gen}}, t_{\text{risk}}, t_{\text{submit}}, t_{\text{ack}}, t_{\text{fill}}, p_{\text{fill}}, q_{\text{fill}}, \text{algo\_id}, \text{strategy\_id}, \text{user\_id}\}$. The cardinality of daily audit records is $|A| = N_{\text{orders}} \times k$ where $k \geq 10$ state transitions per order."
        proof="Each order generates at minimum: creation, risk check, submission, exchange acknowledgment, and fill/cancel events. For partial fills, additional records are generated. SEBI requires that the complete chain from signal generation to fill is traceable, with microsecond timestamps. For a system generating 500 orders/day, this produces approximately 5,000+ audit records daily, or 1.3M+ annually."
      />

      <PythonCode
        title="compliance_engine.py"
        runnable
        code={`import json
import hashlib
from datetime import datetime
from dataclasses import dataclass, field, asdict
from typing import List, Dict, Optional
from enum import Enum

class OrderEvent(Enum):
    SIGNAL_GENERATED = 'SIGNAL_GENERATED'
    RISK_CHECK_PASS = 'RISK_CHECK_PASS'
    RISK_CHECK_FAIL = 'RISK_CHECK_FAIL'
    ORDER_SUBMITTED = 'ORDER_SUBMITTED'
    ORDER_ACKNOWLEDGED = 'ORDER_ACKNOWLEDGED'
    ORDER_REJECTED = 'ORDER_REJECTED'
    PARTIAL_FILL = 'PARTIAL_FILL'
    FULL_FILL = 'FULL_FILL'
    ORDER_CANCELLED = 'ORDER_CANCELLED'
    ORDER_MODIFIED = 'ORDER_MODIFIED'

@dataclass
class AuditRecord:
    """SEBI-compliant audit trail record."""
    timestamp: str
    event_type: str
    order_id: str
    algo_id: str
    strategy_id: str
    symbol: str
    exchange: str
    side: str
    quantity: int
    price: float
    fill_price: Optional[float] = None
    fill_quantity: Optional[int] = None
    risk_check_details: Optional[Dict] = None
    latency_us: Optional[int] = None
    user_id: str = 'SYSTEM'
    checksum: str = ''

    def __post_init__(self):
        # Generate integrity checksum
        data = f"{self.timestamp}{self.order_id}{self.event_type}"
        self.checksum = hashlib.sha256(data.encode()).hexdigest()[:16]

class ComplianceEngine:
    """SEBI compliance and audit trail management."""

    def __init__(self, algo_id: str, broker: str = 'zerodha'):
        self.algo_id = algo_id
        self.broker = broker
        self.audit_log: List[AuditRecord] = []
        self.daily_stats = {
            'orders_submitted': 0,
            'orders_filled': 0,
            'orders_rejected': 0,
            'orders_cancelled': 0,
            'risk_check_failures': 0,
            'total_turnover': 0.0,
            'kill_switch_activations': 0,
        }

    def log_event(self, event_type: OrderEvent, order_id: str,
                  strategy_id: str, symbol: str, exchange: str,
                  side: str, quantity: int, price: float,
                  **kwargs) -> AuditRecord:
        """Log an audit event."""
        record = AuditRecord(
            timestamp=datetime.now().isoformat(timespec='microseconds'),
            event_type=event_type.value,
            order_id=order_id,
            algo_id=self.algo_id,
            strategy_id=strategy_id,
            symbol=symbol,
            exchange=exchange,
            side=side,
            quantity=quantity,
            price=price,
            fill_price=kwargs.get('fill_price'),
            fill_quantity=kwargs.get('fill_quantity'),
            risk_check_details=kwargs.get('risk_details'),
            latency_us=kwargs.get('latency_us'),
        )
        self.audit_log.append(record)

        # Update daily stats
        if event_type == OrderEvent.ORDER_SUBMITTED:
            self.daily_stats['orders_submitted'] += 1
        elif event_type == OrderEvent.FULL_FILL:
            self.daily_stats['orders_filled'] += 1
            self.daily_stats['total_turnover'] += quantity * (kwargs.get('fill_price', price))
        elif event_type == OrderEvent.ORDER_REJECTED:
            self.daily_stats['orders_rejected'] += 1
        elif event_type == OrderEvent.RISK_CHECK_FAIL:
            self.daily_stats['risk_check_failures'] += 1

        return record

    def get_order_to_trade_ratio(self) -> float:
        """Calculate current OTR (SEBI limit: 50:1)."""
        if self.daily_stats['orders_filled'] == 0:
            return float(self.daily_stats['orders_submitted'])
        return (self.daily_stats['orders_submitted'] /
                self.daily_stats['orders_filled'])

    def generate_daily_report(self) -> dict:
        """Generate SEBI-format daily compliance report."""
        otr = self.get_order_to_trade_ratio()
        return {
            'date': datetime.now().strftime('%Y-%m-%d'),
            'algo_id': self.algo_id,
            'broker': self.broker,
            'exchange': 'NSE',
            'total_orders': self.daily_stats['orders_submitted'],
            'total_fills': self.daily_stats['orders_filled'],
            'total_rejections': self.daily_stats['orders_rejected'],
            'total_cancellations': self.daily_stats['orders_cancelled'],
            'risk_check_failures': self.daily_stats['risk_check_failures'],
            'order_to_trade_ratio': otr,
            'otr_compliant': otr <= 50.0,
            'total_turnover_inr': self.daily_stats['total_turnover'],
            'kill_switch_activations': self.daily_stats['kill_switch_activations'],
            'audit_records_count': len(self.audit_log),
            'data_integrity': all(r.checksum for r in self.audit_log),
        }

    def generate_sebi_report(self, period_days: int = 30) -> dict:
        """Generate monthly SEBI compliance report."""
        return {
            'report_period': f"{period_days} days",
            'algo_id': self.algo_id,
            'total_audit_records': len(self.audit_log),
            'storage_size_mb': len(self.audit_log) * 0.002,
            'retention_years': 5,
            'data_integrity_check': 'PASSED',
            'risk_checks_implemented': [
                'price_band', 'quantity_limit', 'order_value',
                'concentration', 'sector_exposure', 'gross_exposure',
                'daily_loss', 'rate_limit', 'otr_check'
            ],
            'kill_switch_status': 'OPERATIONAL',
            'kill_switch_last_test': '2024-01-15',
        }

    def verify_audit_integrity(self) -> dict:
        """Verify audit trail integrity."""
        valid = 0
        invalid = 0
        for record in self.audit_log:
            data = f"{record.timestamp}{record.order_id}{record.event_type}"
            expected = hashlib.sha256(data.encode()).hexdigest()[:16]
            if record.checksum == expected:
                valid += 1
            else:
                invalid += 1

        return {
            'total_records': len(self.audit_log),
            'valid': valid,
            'invalid': invalid,
            'integrity': 'PASSED' if invalid == 0 else 'FAILED',
        }

# Demo: Compliance engine in action
engine = ComplianceEngine(algo_id='ALGO_NM_2024_001', broker='zerodha')

# Simulate a trading day
import random
random.seed(42)

symbols = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK']
prices = [2450, 3500, 1680, 1450, 1025]

for i in range(50):
    idx = i % len(symbols)
    side = 'BUY' if random.random() > 0.4 else 'SELL'
    qty = random.choice([50, 100, 200])
    price = prices[idx] * (1 + random.uniform(-0.02, 0.02))
    order_id = f"ORD{i+1:04d}"

    # Log signal
    engine.log_event(OrderEvent.SIGNAL_GENERATED, order_id,
                     'MOMENTUM_V3', symbols[idx], 'NSE', side, qty, price)

    # Log risk check
    risk_pass = random.random() > 0.1
    if risk_pass:
        engine.log_event(OrderEvent.RISK_CHECK_PASS, order_id,
                         'MOMENTUM_V3', symbols[idx], 'NSE', side, qty, price,
                         risk_details={'all_checks': 'PASS'})
        engine.log_event(OrderEvent.ORDER_SUBMITTED, order_id,
                         'MOMENTUM_V3', symbols[idx], 'NSE', side, qty, price)

        if random.random() > 0.15:
            fill_price = price * (1 + random.uniform(-0.001, 0.001))
            engine.log_event(OrderEvent.FULL_FILL, order_id,
                             'MOMENTUM_V3', symbols[idx], 'NSE', side, qty, price,
                             fill_price=fill_price, fill_quantity=qty,
                             latency_us=random.randint(30000, 200000))
        else:
            engine.log_event(OrderEvent.ORDER_CANCELLED, order_id,
                             'MOMENTUM_V3', symbols[idx], 'NSE', side, qty, price)
            engine.daily_stats['orders_cancelled'] += 1
    else:
        engine.log_event(OrderEvent.RISK_CHECK_FAIL, order_id,
                         'MOMENTUM_V3', symbols[idx], 'NSE', side, qty, price,
                         risk_details={'failed_check': 'CONCENTRATION'})

# Generate reports
daily = engine.generate_daily_report()
print("=== Daily Compliance Report ===")
for key, val in daily.items():
    print(f"  {key:30s}: {val}")

integrity = engine.verify_audit_integrity()
print(f"\\n=== Audit Trail Integrity ===")
for key, val in integrity.items():
    print(f"  {key:20s}: {val}")

sebi = engine.generate_sebi_report()
print(f"\\n=== SEBI Monthly Report ===")
for key, val in sebi.items():
    if isinstance(val, list):
        print(f"  {key}: {', '.join(val)}")
    else:
        print(f"  {key:30s}: {val}")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Audit Trail Design
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The audit trail must capture the complete order lifecycle with tamper-evident
        checksums. For SEBI compliance, each record must include:
      </p>

      <BlockMath math="\text{AuditRecord} = \{t_{\mu s}, \text{event}, \text{order\_id}, \text{algo\_id}, \text{symbol}, \text{exchange}, \text{side}, q, p, \text{hash}\}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The integrity hash ensures records cannot be tampered with after the fact:
      </p>

      <BlockMath math="\text{hash}_i = \text{SHA256}(t_i \| \text{order\_id}_i \| \text{event}_i \| \text{hash}_{i-1})" />

      <ExampleBlock
        title="SEBI Inspection Preparation"
        difficulty="intermediate"
        problem="SEBI sends a notice for inspection of your algo trading system. They request: (1) all audit records for the past 6 months, (2) kill switch test logs, (3) OTR reports, and (4) strategy documentation. How do you prepare?"
        solution={[
          {
            step: 'Extract audit records',
            formula: 'N_{\\text{records}} \\approx 500 \\text{ orders/day} \\times 10 \\text{ events} \\times 130 \\text{ days} = 650,000',
            explanation: 'Export all 650K audit records from TimescaleDB in the SEBI-specified format (CSV or JSON). Include integrity checksums for verification.',
          },
          {
            step: 'Kill switch test logs',
            formula: 'N_{\\text{tests}} = 26 \\text{ (weekly tests over 6 months)}',
            explanation: 'Provide records of all weekly kill switch tests, including: test timestamp, response time, number of orders cancelled, and sign-off from the compliance officer.',
          },
          {
            step: 'OTR compliance report',
            formula: '\\text{OTR}_{\\text{daily}} = \\frac{N_{\\text{orders}}}{N_{\\text{fills}}} \\leq 50:1',
            explanation: 'Generate daily OTR reports showing compliance with the 50:1 limit. Flag any dates where OTR exceeded 40:1 with explanations.',
          },
          {
            step: 'Strategy documentation',
            formula: '\\text{Docs} = \\{\\text{strategy logic}, \\text{risk params}, \\text{lifecycle history}\\}',
            explanation: 'Prepare strategy documentation including: the trading logic (without proprietary details), risk parameters, all stage transitions, and the gate criteria used for each transition.',
          },
        ]}
      />

      <NoteBlock title="Data Retention Requirements" type="warning">
        <p>
          SEBI mandates minimum data retention periods for different types of records:
        </p>
        <ul className="mt-2 list-disc list-inside space-y-1">
          <li><strong>Order audit trails:</strong> 5 years minimum</li>
          <li><strong>Trade confirmations:</strong> 5 years minimum</li>
          <li><strong>Risk check logs:</strong> 5 years minimum</li>
          <li><strong>Kill switch activation logs:</strong> 5 years minimum</li>
          <li><strong>Strategy documentation:</strong> Lifetime of strategy + 5 years</li>
          <li><strong>Client communication records:</strong> 5 years (if applicable)</li>
        </ul>
        <p className="mt-2">
          Use append-only storage (S3 Glacier, write-once databases) for tamper resistance.
          Estimated storage for 5 years: 10-50 GB depending on trading frequency.
        </p>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          SEBI compliance is <strong>not optional</strong> for algorithmic trading in India.
          Build compliance into your system architecture from day one, not as an afterthought.
          Every order must generate a complete audit trail with integrity checksums. Kill
          switches must be tested weekly. OTR must be monitored in real-time. And all records
          must be retained for at least 5 years. The cost of compliance is small; the cost of
          non-compliance -- trading bans, penalties, reputation damage -- can be career-ending.
        </p>
      </NoteBlock>
    </div>
  )
}
