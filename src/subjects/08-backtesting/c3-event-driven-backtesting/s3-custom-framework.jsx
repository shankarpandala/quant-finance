import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveEventLoop() {
  const [eventType, setEventType] = useState('market_data')
  const [queueDepth, setQueueDepth] = useState(5)
  const [latency, setLatency] = useState(50)

  const events = {
    market_data: { color: '#6366f1', label: 'Market Data', process: 'Update OHLCV bar' },
    signal: { color: '#f59e0b', label: 'Signal', process: 'Generate alpha signal' },
    order: { color: '#22c55e', label: 'Order', process: 'Submit to broker' },
    fill: { color: '#ef4444', label: 'Fill', process: 'Update portfolio' },
    risk: { color: '#8b5cf6', label: 'Risk Check', process: 'Validate exposure' },
  }

  const throughput = Math.floor(1000 / latency * queueDepth)
  const currentEvent = events[eventType]

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Custom Event Loop Simulator
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Explore how event type, queue depth, and processing latency affect backtester throughput.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Event Type</span>
          <select value={eventType} onChange={e => setEventType(e.target.value)}
            className="rounded border border-gray-300 bg-white p-1 text-xs dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
            {Object.entries(events).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Queue Depth = {queueDepth}</span>
          <input type="range" min="1" max="20" step="1" value={queueDepth}
            onChange={e => setQueueDepth(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Latency = {latency} ms</span>
          <input type="range" min="1" max="200" step="1" value={latency}
            onChange={e => setLatency(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 520 180" className="w-full max-w-xl mx-auto block" aria-label="Event loop diagram">
        {Array.from({ length: Math.min(queueDepth, 8) }).map((_, i) => (
          <g key={i}>
            <rect x={30 + i * 50} y="20" width="40" height="30" rx="4"
              fill={currentEvent.color} opacity={0.3 + (i / 10)} stroke={currentEvent.color} strokeWidth="1.5" />
            <text x={50 + i * 50} y="39" textAnchor="middle" className="text-[8px] font-mono" fill="#374151">
              E{i + 1}
            </text>
          </g>
        ))}
        <text x="250" y="12" textAnchor="middle" className="text-[10px] font-semibold" fill="#6b7280">
          Event Queue (depth: {queueDepth})
        </text>

        <line x1="250" y1="55" x2="250" y2="80" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#evtArrow)" />
        <defs>
          <marker id="evtArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#9ca3af" />
          </marker>
        </defs>

        <rect x="170" y="85" width="160" height="40" rx="8" fill={currentEvent.color} opacity="0.2"
          stroke={currentEvent.color} strokeWidth="2" />
        <text x="250" y="100" textAnchor="middle" className="text-[10px] font-bold" fill="#374151">
          {currentEvent.label} Handler
        </text>
        <text x="250" y="115" textAnchor="middle" className="text-[8px]" fill="#6b7280">
          {currentEvent.process}
        </text>

        <line x1="250" y1="130" x2="250" y2="155" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#evtArrow)" />
        <text x="250" y="172" textAnchor="middle" className="text-[10px] font-semibold" fill="#16a34a">
          Throughput: ~{throughput} events/sec
        </text>
      </svg>
    </div>
  )
}

export default function CustomFramework() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Building a Custom Event-Driven Backtester
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        While frameworks like Backtrader and Zipline provide ready-made solutions,
        building a custom event-driven backtester gives you full control over
        execution semantics, order routing, and Indian market-specific nuances like
        circuit limits, T+1 settlement, and SEBI margin requirements. This section
        walks through the architecture and key design patterns.
      </p>

      <DefinitionBlock
        title="Event-Driven Architecture (EDA)"
        label="Definition 8.5"
        definition="An event-driven architecture is a software design pattern in which the flow of the program is determined by events -- discrete state changes that are detected, processed, and dispatched through an event queue. In backtesting, events include market data ticks, signals, orders, and fills."
        notation={<>The event loop processes events from a priority queue <InlineMath math="\mathcal{Q}" /> such that <InlineMath math="e_i \prec e_j \iff t_i < t_j" /> (time-ordered processing).</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Core Event Types
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A well-designed backtester processes four fundamental event types in a strict
        sequence. The state machine can be formalized as:
      </p>

      <BlockMath math="\text{MarketEvent} \xrightarrow{\text{Strategy}} \text{SignalEvent} \xrightarrow{\text{Portfolio}} \text{OrderEvent} \xrightarrow{\text{Broker}} \text{FillEvent}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Each event carries a timestamp <InlineMath math="t" />, allowing the engine to
        simulate the temporal ordering that would occur in live trading. The fill event
        updates the portfolio state vector:
      </p>

      <BlockMath math="\mathbf{h}_{t+1} = \mathbf{h}_t + \Delta\mathbf{h}_t, \quad \text{cash}_{t+1} = \text{cash}_t - \Delta\mathbf{h}_t^\top \mathbf{p}_t - C(\Delta\mathbf{h}_t)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\mathbf{h}_t" /> is the holdings vector,{' '}
        <InlineMath math="\mathbf{p}_t" /> is the price vector, and{' '}
        <InlineMath math="C(\cdot)" /> is the Indian market cost function including
        STT, stamp duty, SEBI charges, and GST.
      </p>

      <TheoremBlock
        title="Consistency Guarantee"
        label="Theorem 8.3"
        statement={<>An event-driven backtester is <em>consistent</em> with forward time if and only if no event at time <InlineMath math="t" /> can access information from any event at time <InlineMath math="t' > t" />. Formally:</>}
        formula="\forall e_i \in \mathcal{Q}: \text{info}(e_i) \subseteq \mathcal{F}_{t_i}"
        proof={<>This follows directly from the filtration property of stochastic processes. The event queue enforces <InlineMath math="\mathcal{F}_s \subseteq \mathcal{F}_t" /> for <InlineMath math="s \le t" /> by processing events in chronological order and never allowing backward information flow. Any violation constitutes lookahead bias.</>}
      />

      <InteractiveEventLoop />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Indian Market Cost Function
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The cost function for NSE equity delivery trades is a sum of multiple
        regulatory and broker charges:
      </p>

      <BlockMath math="C(q, p) = \underbrace{B(q,p)}_{\text{brokerage}} + \underbrace{0.001 \cdot q \cdot p}_{\text{STT (delivery)}} + \underbrace{0.0001\% \cdot q \cdot p}_{\text{SEBI}} + \underbrace{s \cdot q \cdot p}_{\text{stamp}} + 0.18 \cdot B(q,p)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="q" /> is quantity, <InlineMath math="p" /> is price,{' '}
        <InlineMath math="B" /> is brokerage, and <InlineMath math="s" /> is the
        state-specific stamp duty rate.
      </p>

      <PythonCode
        title="custom_backtester.py"
        runnable
        code={`import numpy as np
from dataclasses import dataclass, field
from typing import List, Optional
from enum import Enum
from collections import deque

# --- Event Types ---
class EventType(Enum):
    MARKET = "MARKET"
    SIGNAL = "SIGNAL"
    ORDER  = "ORDER"
    FILL   = "FILL"

@dataclass
class Event:
    type: EventType
    timestamp: str
    data: dict = field(default_factory=dict)

# --- Indian Market Cost Calculator ---
class IndianCostModel:
    """Realistic NSE/BSE cost model."""
    def __init__(self, brokerage_pct=0.03, stamp_pct=0.003,
                 stt_delivery=0.1, stt_intraday=0.025):
        self.brokerage_pct = brokerage_pct / 100
        self.stamp_pct = stamp_pct / 100
        self.stt_delivery = stt_delivery / 100
        self.stt_intraday = stt_intraday / 100

    def calculate(self, quantity, price, side, is_intraday=False):
        turnover = quantity * price
        brokerage = min(turnover * self.brokerage_pct, 20)  # Zerodha cap
        stt_rate = self.stt_intraday if is_intraday else self.stt_delivery
        stt = turnover * stt_rate if side == 'SELL' else 0
        sebi = turnover * 0.000001
        stamp = turnover * self.stamp_pct if side == 'BUY' else 0
        gst = 0.18 * (brokerage + sebi)
        total = brokerage + stt + sebi + stamp + gst
        return {
            'brokerage': round(brokerage, 2),
            'stt': round(stt, 2),
            'sebi': round(sebi, 4),
            'stamp': round(stamp, 2),
            'gst': round(gst, 2),
            'total': round(total, 2),
        }

# --- Event Queue ---
class EventQueue:
    def __init__(self):
        self.queue = deque()

    def push(self, event: Event):
        self.queue.append(event)

    def pop(self) -> Optional[Event]:
        return self.queue.popleft() if self.queue else None

    @property
    def is_empty(self):
        return len(self.queue) == 0

# --- Demo: Run Event Loop ---
cost_model = IndianCostModel()
eq = EventQueue()

# Simulate Nifty 50 data events
nifty_prices = [22150, 22180, 22210, 22170, 22250]
for i, price in enumerate(nifty_prices):
    eq.push(Event(
        type=EventType.MARKET,
        timestamp=f"2024-01-{15+i:02d}",
        data={"symbol": "NIFTY50", "close": price}
    ))

print("=== Custom Event-Driven Backtester ===")
print(f"Events in queue: {len(eq.queue)}\\n")

# Process events
portfolio_value = 1_000_000  # INR 10 lakh
position = 0
entry_price = 0

while not eq.is_empty:
    event = eq.pop()
    price = event.data['close']
    print(f"[{event.timestamp}] {event.data['symbol']} @ {price}")

    # Simple momentum signal
    if position == 0 and price > 22200:
        qty = 50  # Nifty lot
        costs = cost_model.calculate(qty, price, 'BUY')
        portfolio_value -= qty * price + costs['total']
        position = qty
        entry_price = price
        print(f"  -> BUY {qty} @ {price}, cost={costs['total']:.2f} INR")
    elif position > 0 and price < entry_price * 0.998:
        costs = cost_model.calculate(position, price, 'SELL')
        portfolio_value += position * price - costs['total']
        pnl = (price - entry_price) * position - costs['total']
        print(f"  -> SELL {position} @ {price}, PnL={pnl:.2f} INR")
        position = 0

print(f"\\nFinal portfolio: INR {portfolio_value:,.2f}")
print(f"Open position: {position} units")

# Show cost breakdown for a sample trade
print("\\n=== Cost Breakdown (50 lots @ 22210) ===")
costs = cost_model.calculate(50, 22210, 'BUY')
for k, v in costs.items():
    print(f"  {k:>12}: INR {v:>8}")`}
      />

      <ExampleBlock
        title="NSE Circuit Limit Handling"
        difficulty="advanced"
        problem="During backtesting, HDFC Bank hits the 20% upper circuit at INR 1,800. Your strategy has a pending sell order at INR 1,750. How should the custom backtester handle this?"
        solution={[
          {
            step: 'Detect circuit condition',
            formula: '\\text{price\\_change} = \\frac{1800 - 1500}{1500} = 20\\% = \\text{circuit\\_limit}',
            explanation: 'The stock has hit the upper circuit. No further trading is allowed at this price level.',
          },
          {
            step: 'Apply NSE circuit rules',
            formula: '\\text{order\\_status} = \\text{CANCELLED}',
            explanation: 'When a stock is in circuit, only orders in the opposite direction (sell at upper circuit) are accepted, but with no guaranteed fill. The backtester should cancel unfilled buy orders and mark the bar as circuit-hit.',
          },
          {
            step: 'Record in event log',
            formula: '\\text{FillEvent}(\\text{status}=\\text{REJECTED}, \\text{reason}=\\text{CIRCUIT})',
            explanation: 'The backtester generates a rejected fill event, preserving audit trail for analysis.',
          },
        ]}
      />

      <NoteBlock title="Design Principles" type="tip">
        <p>
          When building a custom event-driven backtester for Indian markets, follow these
          principles: (1) <strong>Immutable events</strong> -- once created, events should
          never be modified; (2) <strong>Strict time ordering</strong> -- process the event
          queue chronologically; (3) <strong>Realistic fills</strong> -- model circuit limits,
          lot sizes, and T+1 settlement; (4) <strong>Auditable</strong> -- log every event
          for post-hoc analysis. The extra engineering effort pays off in strategy confidence.
        </p>
      </NoteBlock>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Performance Benchmarks
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A well-designed custom backtester should achieve these performance targets
        when processing NSE daily bar data across the Nifty 200 universe:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Metric</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Target</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Notes</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Daily bar throughput</td>
              <td className="px-4 py-2">{'>'} 100K bars/sec</td>
              <td className="px-4 py-2">200 stocks x 10 years in {'<'} 10s</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Memory usage</td>
              <td className="px-4 py-2">{'<'} 2 GB</td>
              <td className="px-4 py-2">Stream data, don't load all in RAM</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Order latency</td>
              <td className="px-4 py-2">{'<'} 1ms per order</td>
              <td className="px-4 py-2">Cost model + fill simulation</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Reproducibility</td>
              <td className="px-4 py-2">Bit-exact</td>
              <td className="px-4 py-2">Same seed = same results always</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The modular architecture should separate concerns clearly. The market data
        handler, strategy, portfolio manager, and broker simulator should communicate
        only through the event queue:
      </p>

      <BlockMath math="\text{Coupling} = \frac{|\{(A, B) : A \text{ directly calls } B\}|}{|\mathcal{M}|^2} \to 0" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="|\mathcal{M}|" /> is the number of modules. Low coupling
        enables testing each component independently and swapping implementations
        (e.g., replacing the Zerodha cost model with an Upstox model) without
        modifying strategy code.
      </p>

      <NoteBlock title="Historical Note" type="historical">
        <ul className="space-y-2">
          <li>
            <strong>2003:</strong> NSE introduced screen-based trading replacing open outcry,
            fundamentally changing how backtesting models should handle order execution.
          </li>
          <li>
            <strong>2020:</strong> SEBI mandated peak margin reporting, requiring backtesting
            frameworks to account for intraday margin snapshots.
          </li>
          <li>
            <strong>2023:</strong> NSE moved to T+1 settlement, reducing settlement risk but
            requiring backtester updates to handle the shorter cycle.
          </li>
        </ul>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Building a custom event-driven backtester is a significant engineering investment
          but provides the highest fidelity simulation for Indian markets. The critical
          components are: (1) a time-ordered event queue preventing lookahead,
          (2) a realistic Indian cost model covering all regulatory charges,
          (3) circuit limit and lot size handling specific to NSE, and
          (4) comprehensive event logging for audit and debugging.
        </p>
      </NoteBlock>
    </div>
  )
}
