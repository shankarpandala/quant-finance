import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveLifecycle() {
  const [stage, setStage] = useState(0)
  const stages = [
    { name: 'Research', color: '#3b82f6', desc: 'Hypothesis testing, backtesting', duration: '2-6 months', capital: '0%' },
    { name: 'Incubation', color: '#8b5cf6', desc: 'Paper trading, validation', duration: '3-6 months', capital: '0%' },
    { name: 'Pilot', color: '#f59e0b', desc: 'Live with minimal capital', duration: '1-3 months', capital: '5-10%' },
    { name: 'Ramp-Up', color: '#22c55e', desc: 'Gradual capital increase', duration: '3-6 months', capital: '10-50%' },
    { name: 'Production', color: '#10b981', desc: 'Full allocation', duration: 'Ongoing', capital: '50-100%' },
    { name: 'Monitoring', color: '#06b6d4', desc: 'Continuous surveillance', duration: 'Ongoing', capital: '100%' },
    { name: 'Decay', color: '#ef4444', desc: 'Performance declining', duration: '1-6 months', capital: 'Reducing' },
    { name: 'Retirement', color: '#6b7280', desc: 'Strategy decommissioned', duration: 'Final', capital: '0%' },
  ]

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Strategy Lifecycle Stages
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Click on each stage to see details about the strategy lifecycle for NSE trading.
      </p>

      <svg viewBox="0 0 640 100" className="w-full max-w-2xl mx-auto block mb-4" aria-label="Strategy lifecycle">
        {stages.map((s, i) => {
          const x = i * 78 + 10
          const isActive = i === stage
          return (
            <g key={i} onClick={() => setStage(i)} className="cursor-pointer">
              <rect x={x} y={isActive ? 10 : 20} width="70" height={isActive ? 50 : 40} rx="6"
                fill={s.color} opacity={isActive ? 0.9 : 0.4} stroke={isActive ? s.color : 'none'} strokeWidth="2" />
              <text x={x + 35} y={isActive ? 40 : 44} textAnchor="middle"
                className="text-[8px] font-bold" fill="white">{s.name}</text>
              {i < stages.length - 1 && (
                <line x1={x + 72} y1="40" x2={x + 78} y2="40" stroke="#94a3b8" strokeWidth="1.5" />
              )}
            </g>
          )
        })}
      </svg>

      <div className="rounded-lg p-4" style={{ backgroundColor: stages[stage].color + '15', borderLeft: `4px solid ${stages[stage].color}` }}>
        <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">{stages[stage].name}</h4>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{stages[stage].desc}</p>
        <div className="mt-2 flex gap-4 text-xs">
          <span className="text-gray-500">Duration: <strong>{stages[stage].duration}</strong></span>
          <span className="text-gray-500">Capital: <strong>{stages[stage].capital}</strong></span>
        </div>
      </div>
    </div>
  )
}

export default function StrategyLifecycle() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Strategy Lifecycle: Incubation to Retirement
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Every quantitative strategy has a natural lifecycle -- from initial research hypothesis
        through production deployment to eventual retirement. Managing this lifecycle
        systematically is critical for sustained profitability in Indian markets, where
        alpha decay can be rapid due to increasing competition from domestic quant firms.
      </p>

      <DefinitionBlock
        title="Strategy Lifecycle Management"
        label="Definition 18.10"
        definition="Strategy lifecycle management (SLM) is the systematic process of governing a trading strategy through its complete lifecycle: research, validation, deployment, monitoring, and retirement. Each stage has defined entry criteria, exit criteria, and governance requirements. For SEBI-regulated trading in India, each stage must also satisfy regulatory requirements for documentation and audit trails."
        notation="Typical lifecycle duration for an NSE equity strategy: 12--24 months from research to retirement."
      />

      <InteractiveLifecycle />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Stage Gates and Criteria
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Each transition between stages requires meeting specific quantitative criteria.
        These gate conditions prevent premature deployment and ensure strategies are
        properly validated before receiving capital.
      </p>

      <BlockMath math="\text{Gate Score} = w_1 \cdot \mathbb{1}[\text{Sharpe} > S_{\min}] + w_2 \cdot \mathbb{1}[\text{DD} < D_{\max}] + w_3 \cdot \mathbb{1}[\text{Decay} < \Delta_{\max}] + w_4 \cdot \mathbb{1}[\text{Tests pass}]" />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Transition</th>
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Sharpe Req</th>
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Max DD</th>
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Other Criteria</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2">Research to Incubation</td>
              <td className="px-3 py-2">&gt; 1.5 (backtest)</td>
              <td className="px-3 py-2">&lt; 15%</td>
              <td className="px-3 py-2">Pass multiple testing correction</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2">Incubation to Pilot</td>
              <td className="px-3 py-2">&gt; 1.0 (paper)</td>
              <td className="px-3 py-2">&lt; 10%</td>
              <td className="px-3 py-2">3 months paper, decay &lt; 30%</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2">Pilot to Ramp-Up</td>
              <td className="px-3 py-2">&gt; 0.8 (live)</td>
              <td className="px-3 py-2">&lt; 8%</td>
              <td className="px-3 py-2">1 month live, positive P&amp;L</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2">Ramp-Up to Production</td>
              <td className="px-3 py-2">&gt; 0.7 (live)</td>
              <td className="px-3 py-2">&lt; 10%</td>
              <td className="px-3 py-2">3 months live, stable metrics</td>
            </tr>
            <tr>
              <td className="px-3 py-2">Production to Decay</td>
              <td className="px-3 py-2">&lt; 0.5 (rolling)</td>
              <td className="px-3 py-2">&gt; 15%</td>
              <td className="px-3 py-2">CUSUM alarm, 2+ circuit breakers</td>
            </tr>
          </tbody>
        </table>
      </div>

      <TheoremBlock
        title="Optimal Capital Ramp-Up Schedule"
        label="Theorem 18.10"
        statement="For a strategy transitioning from pilot to full production, the optimal capital allocation at time $t$ follows: $C(t) = C_{\max} \cdot \left(1 - e^{-\lambda t}\right) \cdot \mathbb{1}[\text{Sharpe}_{20d}(t) > S_{\min}]$ where $\lambda = \ln(2) / t_{1/2}$ controls the ramp-up speed and $t_{1/2}$ is the half-life (time to reach 50% allocation). The indicator function ensures capital is only added when the strategy is performing above minimum threshold."
        proof="The exponential ramp-up balances the desire for early capital deployment (to capture alpha) against the risk of deploying too fast before sufficient live data is available. The half-life $t_{1/2}$ should be set to at least 20 trading days, ensuring 20+ live observations before reaching 50% allocation. The indicator function provides automatic de-risking if performance drops."
      />

      <PythonCode
        title="strategy_lifecycle.py"
        runnable
        code={`import numpy as np
from dataclasses import dataclass, field
from typing import List, Dict, Optional
from datetime import datetime
from enum import Enum

class LifecycleStage(Enum):
    RESEARCH = 'RESEARCH'
    INCUBATION = 'INCUBATION'
    PILOT = 'PILOT'
    RAMP_UP = 'RAMP_UP'
    PRODUCTION = 'PRODUCTION'
    DECAY = 'DECAY'
    RETIRED = 'RETIRED'

@dataclass
class StageGate:
    """Criteria for transitioning between stages."""
    min_sharpe: float
    max_drawdown: float
    min_duration_days: int
    additional_checks: List[str] = field(default_factory=list)

    def evaluate(self, sharpe: float, max_dd: float,
                 days_in_stage: int) -> tuple:
        checks = []
        checks.append(('sharpe', sharpe >= self.min_sharpe))
        checks.append(('drawdown', max_dd <= self.max_drawdown))
        checks.append(('duration', days_in_stage >= self.min_duration_days))
        all_pass = all(c[1] for c in checks)
        return all_pass, checks

class StrategyLifecycleManager:
    """Manage the complete lifecycle of a trading strategy."""

    # Stage transition gates
    GATES = {
        (LifecycleStage.RESEARCH, LifecycleStage.INCUBATION): StageGate(
            min_sharpe=1.5, max_drawdown=0.15, min_duration_days=60,
            additional_checks=['multiple_testing_correction', 'economic_rationale']
        ),
        (LifecycleStage.INCUBATION, LifecycleStage.PILOT): StageGate(
            min_sharpe=1.0, max_drawdown=0.10, min_duration_days=63,
            additional_checks=['paper_live_reconciliation', 'statistical_validation']
        ),
        (LifecycleStage.PILOT, LifecycleStage.RAMP_UP): StageGate(
            min_sharpe=0.8, max_drawdown=0.08, min_duration_days=22,
            additional_checks=['positive_pnl', 'fill_quality_check']
        ),
        (LifecycleStage.RAMP_UP, LifecycleStage.PRODUCTION): StageGate(
            min_sharpe=0.7, max_drawdown=0.10, min_duration_days=63,
            additional_checks=['stable_sharpe', 'capacity_test']
        ),
    }

    def __init__(self, strategy_name: str, max_capital: float):
        self.name = strategy_name
        self.max_capital = max_capital
        self.stage = LifecycleStage.RESEARCH
        self.stage_start = datetime.now()
        self.capital_allocated = 0.0
        self.history: List[dict] = []
        self.metrics: Dict[str, float] = {}

    def get_allocation_pct(self) -> float:
        """Get capital allocation for current stage."""
        allocations = {
            LifecycleStage.RESEARCH: 0.0,
            LifecycleStage.INCUBATION: 0.0,
            LifecycleStage.PILOT: 0.05,
            LifecycleStage.RAMP_UP: 0.30,
            LifecycleStage.PRODUCTION: 1.0,
            LifecycleStage.DECAY: 0.25,
            LifecycleStage.RETIRED: 0.0,
        }
        return allocations[self.stage]

    def evaluate_transition(self, target_stage: LifecycleStage,
                            sharpe: float, max_dd: float,
                            days: int) -> dict:
        """Evaluate if transition to target stage is allowed."""
        gate_key = (self.stage, target_stage)
        gate = self.GATES.get(gate_key)

        if gate is None:
            return {'allowed': False, 'reason': 'Invalid transition'}

        passed, checks = gate.evaluate(sharpe, max_dd, days)
        return {
            'allowed': passed,
            'checks': checks,
            'additional': gate.additional_checks,
            'current_stage': self.stage.value,
            'target_stage': target_stage.value,
        }

    def transition(self, target_stage: LifecycleStage,
                   sharpe: float, max_dd: float, days: int) -> dict:
        """Attempt to transition to a new stage."""
        result = self.evaluate_transition(
            target_stage, sharpe, max_dd, days
        )

        if result['allowed']:
            old_stage = self.stage
            self.stage = target_stage
            self.capital_allocated = self.get_allocation_pct() * self.max_capital
            self.history.append({
                'from': old_stage.value,
                'to': target_stage.value,
                'sharpe': sharpe,
                'max_dd': max_dd,
                'capital': self.capital_allocated,
                'timestamp': datetime.now().isoformat(),
            })
            result['capital_allocated'] = self.capital_allocated

        return result

    def check_decay(self, rolling_sharpe: float,
                    current_dd: float) -> Optional[str]:
        """Check if strategy should move to decay stage."""
        if self.stage != LifecycleStage.PRODUCTION:
            return None

        if rolling_sharpe < 0.3:
            return 'SHARPE_BELOW_THRESHOLD'
        if current_dd > 0.15:
            return 'DRAWDOWN_EXCEEDED'
        return None

    def generate_report(self) -> str:
        lines = [
            f"Strategy: {self.name}",
            f"Stage: {self.stage.value}",
            f"Capital: INR {self.capital_allocated:,.0f} "
            f"({self.get_allocation_pct()*100:.0f}%)",
            f"Max Capital: INR {self.max_capital:,.0f}",
            f"Transitions: {len(self.history)}",
        ]
        return "\\n".join(lines)

# Demo: Full lifecycle simulation
manager = StrategyLifecycleManager(
    strategy_name='Nifty50_Momentum_v3',
    max_capital=5_000_000
)

print("=== Strategy Lifecycle Simulation ===")
print(f"Strategy: {manager.name}\\n")

# Stage 1: Research -> Incubation
transitions = [
    (LifecycleStage.INCUBATION, 1.8, 0.12, 90,
     "Backtest shows strong Sharpe, within DD limits"),
    (LifecycleStage.PILOT, 1.2, 0.08, 70,
     "Paper trading validates backtest, 30% decay"),
    (LifecycleStage.RAMP_UP, 0.9, 0.06, 25,
     "1 month live with positive P&L"),
    (LifecycleStage.PRODUCTION, 0.85, 0.07, 65,
     "3 months stable live performance"),
]

for target, sharpe, dd, days, note in transitions:
    result = manager.transition(target, sharpe, dd, days)
    status = "APPROVED" if result['allowed'] else "REJECTED"
    print(f"[{status}] {manager.history[-1]['from'] if result['allowed'] else manager.stage.value}"
          f" -> {target.value}")
    print(f"  Sharpe: {sharpe}, MaxDD: {dd:.0%}, Days: {days}")
    print(f"  Note: {note}")
    if result['allowed']:
        print(f"  Capital: INR {result['capital_allocated']:,.0f}")
    print()

# Check for decay
print("=== Decay Detection ===")
for sharpe in [0.8, 0.5, 0.3, 0.2]:
    decay = manager.check_decay(sharpe, 0.08)
    if decay:
        print(f"Sharpe {sharpe}: DECAY DETECTED - {decay}")
    else:
        print(f"Sharpe {sharpe}: Normal")

print(f"\\n=== Final Report ===")
print(manager.generate_report())`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Capital Ramp-Up Schedules
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The transition from pilot to full production requires a carefully planned capital
        ramp-up. Too fast risks large losses on an unproven strategy; too slow misses
        alpha before it decays.
      </p>

      <BlockMath math="C(t) = C_{\max} \cdot \min\left(1, \frac{t}{T_{\text{ramp}}}\right) \cdot \prod_{i} \mathbb{1}[\text{check}_i(t)]" />

      <ExampleBlock
        title="Strategy Retirement Decision"
        difficulty="intermediate"
        problem="Your NSE momentum strategy has been in production for 18 months. The rolling 60-day Sharpe has declined from 1.2 to 0.3. Daily volume in your traded stocks has increased 3x (more competition). Should you retire the strategy?"
        solution={[
          {
            step: 'Evaluate performance decay',
            formula: '\\text{Sharpe decay} = \\frac{1.2 - 0.3}{1.2} = 75\\%',
            explanation: 'A 75% decline in Sharpe ratio is severe and exceeds the typical 50% decay threshold for retirement consideration.',
          },
          {
            step: 'Assess structural factors',
            formula: '\\text{Volume increase} = 3\\times \\Rightarrow \\text{crowding signal}',
            explanation: 'A 3x increase in volume on traded stocks suggests the alpha signal is being crowded by other quant traders, a structural change unlikely to reverse.',
          },
          {
            step: 'Run reversal probability analysis',
            formula: 'P(\\text{recovery}) = P(\\text{Sharpe} > 0.7 | \\text{current} = 0.3, \\text{crowd} = 3\\times)',
            explanation: 'With structural crowding, the probability of Sharpe recovering to viable levels (>0.7) is very low, estimated at <10% based on historical analysis of crowded strategies.',
          },
          {
            step: 'Retirement recommendation',
            formula: '\\text{Action: RETIRE with dignity}',
            explanation: 'Move to DECAY stage immediately, reduce capital to 25% over 1 week, then fully retire over the next month. Document learnings for future strategy development. Do not throw good capital after bad alpha.',
          },
        ]}
      />

      <NoteBlock title="Strategy Governance for SEBI Compliance" type="warning">
        <p>
          SEBI requires documentation and audit trails for all algorithmic trading strategies:
        </p>
        <ul className="mt-2 list-disc list-inside space-y-1">
          <li>Each strategy must be registered with a unique algo ID on NSE/BSE</li>
          <li>Strategy logic documentation must be available for SEBI inspection</li>
          <li>All stage transitions must be logged with timestamps and approval records</li>
          <li>Capital allocation changes require risk committee sign-off</li>
          <li>Strategy retirement must include a post-mortem analysis</li>
          <li>All records must be retained for 5+ years</li>
        </ul>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Strategy lifecycle management is the <strong>discipline that separates professional
          quant firms from hobbyist traders</strong>. Every strategy must progress through
          defined stages with quantitative gate criteria. Never skip stages -- a strategy that
          looks great in backtesting must still prove itself in paper trading and pilot before
          receiving significant capital. And know when to retire: the best traders let go of
          dying strategies quickly and redeploy capital to fresh opportunities.
        </p>
      </NoteBlock>
    </div>
  )
}
