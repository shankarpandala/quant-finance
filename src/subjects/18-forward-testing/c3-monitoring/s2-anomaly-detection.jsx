import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveCircuitBreaker() {
  const [drawdownPct, setDrawdownPct] = useState(1.5)
  const [sharpeDecline, setSharpeDecline] = useState(20)
  const [fillRate, setFillRate] = useState(92)
  const [latencyP99, setLatencyP99] = useState(150)

  const yellowThresholds = { dd: 2, sharpe: 30, fill: 85, latency: 200 }
  const redThresholds = { dd: 5, sharpe: 50, fill: 70, latency: 500 }

  const getStatus = (val, yellow, red, invert = false) => {
    if (invert) {
      if (val < red) return 'RED'
      if (val < yellow) return 'YELLOW'
      return 'GREEN'
    }
    if (val > red) return 'RED'
    if (val > yellow) return 'YELLOW'
    return 'GREEN'
  }

  const ddStatus = getStatus(drawdownPct, yellowThresholds.dd, redThresholds.dd)
  const sharpeStatus = getStatus(sharpeDecline, yellowThresholds.sharpe, redThresholds.sharpe)
  const fillStatus = getStatus(fillRate, yellowThresholds.fill, redThresholds.fill, true)
  const latencyStatus = getStatus(latencyP99, yellowThresholds.latency, redThresholds.latency)

  const overallRed = [ddStatus, sharpeStatus, fillStatus, latencyStatus].filter(s => s === 'RED').length
  const overallAction = overallRed >= 2 ? 'HALT TRADING' : overallRed === 1 ? 'REDUCE SIZE' : 'NORMAL'

  const statusColor = { GREEN: 'text-green-600', YELLOW: 'text-yellow-600', RED: 'text-red-600' }
  const statusBg = { GREEN: 'bg-green-50 dark:bg-green-900/30', YELLOW: 'bg-yellow-50 dark:bg-yellow-900/30', RED: 'bg-red-50 dark:bg-red-900/30' }

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Strategy Circuit Breaker Dashboard
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust metrics to see when circuit breakers trigger. GREEN = normal, YELLOW = warning, RED = halt.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Drawdown (%): {drawdownPct.toFixed(1)}</span>
          <input type="range" min="0" max="10" step="0.1" value={drawdownPct}
            onChange={e => setDrawdownPct(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Sharpe Decline (%): {sharpeDecline}</span>
          <input type="range" min="0" max="100" step="1" value={sharpeDecline}
            onChange={e => setSharpeDecline(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Fill Rate (%): {fillRate}</span>
          <input type="range" min="50" max="100" step="1" value={fillRate}
            onChange={e => setFillRate(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Latency p99 (ms): {latencyP99}</span>
          <input type="range" min="10" max="1000" step="10" value={latencyP99}
            onChange={e => setLatencyP99(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-5 gap-2 text-center">
        {[
          { label: 'Drawdown', status: ddStatus, val: `${drawdownPct.toFixed(1)}%` },
          { label: 'Sharpe', status: sharpeStatus, val: `${sharpeDecline}%` },
          { label: 'Fill Rate', status: fillStatus, val: `${fillRate}%` },
          { label: 'Latency', status: latencyStatus, val: `${latencyP99}ms` },
          { label: 'ACTION', status: overallRed >= 2 ? 'RED' : overallRed === 1 ? 'YELLOW' : 'GREEN', val: overallAction },
        ].map((item, i) => (
          <div key={i} className={`rounded-lg p-2 ${statusBg[item.status]}`}>
            <div className="text-[10px] text-gray-500">{item.label}</div>
            <div className={`text-sm font-bold ${statusColor[item.status]}`}>{item.val}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AnomalyDetection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Strategy Degradation Detection and Circuit Breakers
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Strategies degrade over time as market regimes shift, alpha decays, and competition
        increases. Detecting degradation early is critical for protecting capital in Indian
        markets. This section covers statistical methods for detecting strategy decay and
        implementing automated circuit breakers.
      </p>

      <DefinitionBlock
        title="Strategy Degradation"
        label="Definition 18.8"
        definition="Strategy degradation is the systematic decline in a strategy's risk-adjusted returns over time. It manifests as declining Sharpe ratio, increasing drawdowns, or deteriorating fill quality. Causes include alpha decay (crowding), regime change, structural market changes (SEBI rule changes), or infrastructure issues."
        notation="Measured by rolling Sharpe ratio, CUSUM statistics, or Page's test for change-point detection."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        CUSUM Change-Point Detection
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The Cumulative Sum (CUSUM) chart is an effective tool for detecting shifts in
        strategy performance. It accumulates deviations from a target performance level:
      </p>

      <BlockMath math="S_n^+ = \max(0, S_{n-1}^+ + r_n - \mu_0 - k)" />
      <BlockMath math="S_n^- = \max(0, S_{n-1}^- - r_n + \mu_0 - k)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="r_n" /> is the strategy return, <InlineMath math="\mu_0" />{' '}
        is the target return (e.g., historical average), and <InlineMath math="k" /> is the
        allowance parameter (typically <InlineMath math="\sigma / 2" />). An alarm triggers
        when <InlineMath math="S_n^+" /> or <InlineMath math="S_n^-" /> exceeds threshold{' '}
        <InlineMath math="h" />.
      </p>

      <TheoremBlock
        title="CUSUM Average Run Length"
        label="Theorem 18.8"
        statement="For a CUSUM chart with allowance $k = \delta \sigma / 2$ and threshold $h$, the Average Run Length (ARL) under no change is approximately: $\text{ARL}_0 \approx \frac{\exp(2bh/\sigma^2) - 2bh/\sigma^2 - 1}{2(b/\sigma)^2}$ where $b = k$. For detecting a shift of $\delta$ standard deviations, the ARL under change is: $\text{ARL}_1 \approx \frac{h}{\delta\sigma - k}$."
        proof="These approximations follow from Wald's sequential analysis and are accurate for $h/\sigma > 3$. For an NSE strategy with daily returns, choosing $h = 4\sigma$ and $k = \sigma/2$ gives $\text{ARL}_0 \approx 168$ days (false alarm every 168 days) and $\text{ARL}_1 \approx 8$ days for detecting a 1-sigma shift."
      />

      <InteractiveCircuitBreaker />

      <PythonCode
        title="anomaly_detection.py"
        runnable
        code={`import numpy as np
from dataclasses import dataclass
from typing import List, Tuple, Optional

class CUSUMDetector:
    """CUSUM change-point detection for strategy monitoring."""

    def __init__(self, target_return: float, allowance_k: float,
                 threshold_h: float):
        self.mu0 = target_return
        self.k = allowance_k
        self.h = threshold_h
        self.s_plus = 0.0
        self.s_minus = 0.0
        self.n = 0
        self.alarm_history = []

    def update(self, return_val: float) -> Optional[str]:
        """Process new return observation."""
        self.n += 1
        self.s_plus = max(0, self.s_plus + return_val - self.mu0 - self.k)
        self.s_minus = max(0, self.s_minus - return_val + self.mu0 - self.k)

        alarm = None
        if self.s_plus > self.h:
            alarm = 'POSITIVE_SHIFT'
            self.alarm_history.append((self.n, alarm, self.s_plus))
            self.s_plus = 0  # Reset after alarm
        elif self.s_minus > self.h:
            alarm = 'NEGATIVE_SHIFT'
            self.alarm_history.append((self.n, alarm, self.s_minus))
            self.s_minus = 0  # Reset after alarm

        return alarm

class ExponentiallyWeightedDetector:
    """EWMA-based degradation detection."""

    def __init__(self, span: int = 20, n_sigma: float = 2.5):
        self.span = span
        self.n_sigma = n_sigma
        self.alpha = 2.0 / (span + 1)
        self.ewma = None
        self.ewma_var = None
        self.n = 0

    def update(self, value: float) -> dict:
        self.n += 1
        if self.ewma is None:
            self.ewma = value
            self.ewma_var = 0
            return {'status': 'INITIALIZING'}

        self.ewma = self.alpha * value + (1 - self.alpha) * self.ewma
        diff = value - self.ewma
        self.ewma_var = (self.alpha * diff**2
                         + (1 - self.alpha) * self.ewma_var)
        ewma_std = np.sqrt(self.ewma_var)

        z_score = diff / max(ewma_std, 1e-10)
        status = 'NORMAL'
        if abs(z_score) > self.n_sigma:
            status = 'ANOMALY'
        elif abs(z_score) > self.n_sigma * 0.7:
            status = 'WARNING'

        return {
            'status': status,
            'ewma': self.ewma,
            'z_score': z_score,
            'upper_band': self.ewma + self.n_sigma * ewma_std,
            'lower_band': self.ewma - self.n_sigma * ewma_std,
        }

class StrategyCircuitBreaker:
    """Multi-level circuit breaker for live trading."""

    def __init__(self, config: dict):
        self.config = config
        self.state = 'GREEN'  # GREEN, YELLOW, RED
        self.detectors = {
            'cusum': CUSUMDetector(
                target_return=config.get('target_return', 0.0005),
                allowance_k=config.get('cusum_k', 0.003),
                threshold_h=config.get('cusum_h', 0.015),
            ),
            'sharpe_ewma': ExponentiallyWeightedDetector(
                span=config.get('sharpe_span', 20),
                n_sigma=config.get('sharpe_n_sigma', 2.0),
            ),
        }
        self.daily_pnl = 0
        self.peak_equity = config.get('initial_capital', 5_000_000)
        self.current_equity = self.peak_equity
        self.alerts = []

    def update(self, daily_return: float, daily_sharpe: float,
               fill_rate: float, latency_p99: float) -> dict:
        """Update all circuit breaker checks."""
        self.current_equity *= (1 + daily_return)
        self.peak_equity = max(self.peak_equity, self.current_equity)
        drawdown = (self.peak_equity - self.current_equity) / self.peak_equity

        # CUSUM check
        cusum_alarm = self.detectors['cusum'].update(daily_return)

        # Sharpe EWMA check
        sharpe_result = self.detectors['sharpe_ewma'].update(daily_sharpe)

        # Determine state
        red_flags = 0
        yellow_flags = 0

        if drawdown > 0.05:
            red_flags += 1
        elif drawdown > 0.02:
            yellow_flags += 1

        if cusum_alarm == 'NEGATIVE_SHIFT':
            red_flags += 1

        if sharpe_result['status'] == 'ANOMALY':
            red_flags += 1
        elif sharpe_result['status'] == 'WARNING':
            yellow_flags += 1

        if fill_rate < 70:
            red_flags += 1
        elif fill_rate < 85:
            yellow_flags += 1

        if latency_p99 > 500:
            red_flags += 1
        elif latency_p99 > 200:
            yellow_flags += 1

        if red_flags >= 2:
            self.state = 'RED'
            action = 'HALT_ALL_TRADING'
        elif red_flags >= 1 or yellow_flags >= 3:
            self.state = 'YELLOW'
            action = 'REDUCE_POSITION_SIZE_50PCT'
        else:
            self.state = 'GREEN'
            action = 'NORMAL_OPERATION'

        return {
            'state': self.state,
            'action': action,
            'drawdown': drawdown,
            'cusum_alarm': cusum_alarm,
            'sharpe_status': sharpe_result['status'],
            'red_flags': red_flags,
            'yellow_flags': yellow_flags,
        }

# Demo: simulate strategy degradation
np.random.seed(42)
config = {
    'initial_capital': 5_000_000,
    'target_return': 0.0005,
    'cusum_k': 0.003,
    'cusum_h': 0.015,
}

cb = StrategyCircuitBreaker(config)

# Phase 1: Normal performance (60 days)
# Phase 2: Gradual degradation (30 days)
# Phase 3: Regime break (10 days)
returns = np.concatenate([
    np.random.normal(0.0005, 0.012, 60),   # Normal
    np.random.normal(0.0001, 0.015, 30),   # Degrading
    np.random.normal(-0.003, 0.020, 10),   # Broken
])

print("=== Strategy Circuit Breaker Simulation ===")
print(f"{'Day':>4} {'Return':>8} {'State':>8} {'Action':>30} {'DD':>7}")
print("-" * 65)

for day, ret in enumerate(returns):
    sharpe = ret / 0.013  # Approximate daily Sharpe
    fill_rate = 95 - max(0, day - 60) * 0.5  # Degrading fills
    latency = 100 + max(0, day - 75) * 20    # Rising latency

    result = cb.update(ret, sharpe, fill_rate, latency)

    if (day + 1) % 10 == 0 or result['state'] != 'GREEN':
        print(f"{day+1:4d} {ret:>8.4f} {result['state']:>8s} "
              f"{result['action']:>30s} {result['drawdown']:>6.2%}")

    if result['state'] == 'RED':
        print(f"\\n*** CIRCUIT BREAKER TRIGGERED on day {day+1} ***")
        print(f"Red flags: {result['red_flags']}, "
              f"Yellow flags: {result['yellow_flags']}")
        if result['cusum_alarm']:
            print(f"CUSUM alarm: {result['cusum_alarm']}")
        break`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Multi-Level Circuit Breaker Design
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A production circuit breaker for NSE trading should have three levels, mirroring
        NSE's own circuit breaker system:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Level</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Trigger</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Action</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Recovery</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-bold text-green-600">GREEN</td>
              <td className="px-4 py-2">All metrics normal</td>
              <td className="px-4 py-2">Full position sizing</td>
              <td className="px-4 py-2">N/A</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-bold text-yellow-600">YELLOW</td>
              <td className="px-4 py-2">1 red or 3+ yellow flags</td>
              <td className="px-4 py-2">Reduce size by 50%</td>
              <td className="px-4 py-2">5 consecutive green days</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-bold text-red-600">RED</td>
              <td className="px-4 py-2">2+ red flags</td>
              <td className="px-4 py-2">Halt trading, flatten</td>
              <td className="px-4 py-2">Manual review required</td>
            </tr>
          </tbody>
        </table>
      </div>

      <ExampleBlock
        title="Detecting Alpha Decay in a Bank Nifty Strategy"
        difficulty="advanced"
        problem="Your Bank Nifty mean-reversion strategy had a historical Sharpe of 1.8. Over the past 3 months, the rolling 20-day Sharpe has been: 1.6, 1.4, 1.1, 0.8, 0.6, 0.4. Is this alpha decay or normal variation? Use CUSUM to decide."
        solution={[
          {
            step: 'Calculate CUSUM statistics',
            formula: 'S_n^- = \\max(0, S_{n-1}^- - r_n + \\mu_0 - k)',
            explanation: 'Set target Sharpe mu_0 = 1.8/sqrt(252) as daily, with k = sigma/2. The consistently declining Sharpe suggests a downward shift.',
          },
          {
            step: 'Estimate the shift magnitude',
            formula: '\\delta = \\frac{1.8 - 0.4}{\\sigma_{\\text{Sharpe}}} \\approx \\frac{1.4}{0.5} = 2.8\\sigma',
            explanation: 'The Sharpe has declined by approximately 2.8 standard deviations of its typical variation, which is well beyond normal fluctuation.',
          },
          {
            step: 'CUSUM detection timing',
            formula: '\\text{ARL}_1 = \\frac{h}{\\delta\\sigma - k} \\approx \\frac{4 \\times 0.5}{1.4 - 0.25} = 1.7 \\text{ periods}',
            explanation: 'With a 2.8-sigma shift, CUSUM would have detected the degradation after approximately 2 rolling windows (40 trading days), which is the 2nd observation.',
          },
          {
            step: 'Verdict and action',
            formula: '\\text{Sharpe}_{\\text{current}} = 0.4 < 0.5 \\times 1.8 = 0.9',
            explanation: 'This is clearly alpha decay, not noise. The strategy fails the 50% haircut test. ACTION: Move strategy to YELLOW, reduce position size by 50%, and conduct a full review of market microstructure changes in Bank Nifty.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Anomaly detection and circuit breakers are your <strong>last line of defense</strong>{' '}
          against catastrophic losses. Use CUSUM for detecting gradual strategy degradation
          and EWMA for sudden regime changes. Implement multi-level circuit breakers that
          automatically reduce position sizes or halt trading when multiple warning signals
          trigger simultaneously. For Indian markets, also monitor NSE circuit breaker events,
          F&amp;O expiry days, and RBI policy announcements as external degradation catalysts.
        </p>
      </NoteBlock>
    </div>
  )
}
