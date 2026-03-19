import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveExecution() {
  const [totalShares, setTotalShares] = useState(10000)
  const [timeHorizon, setTimeHorizon] = useState(10)
  const [urgency, setUrgency] = useState(0.5)
  const [impactCoeff, setImpactCoeff] = useState(0.0001)

  const twapRate = totalShares / timeHorizon
  const slices = Array(timeHorizon).fill(null).map((_, i) => {
    const t = (i + 1) / timeHorizon
    const twap = twapRate
    const vwap = twapRate * (1 + 0.3 * Math.sin(Math.PI * t))
    const aggressive = twapRate * Math.exp(-urgency * (1 - t)) * (1 + urgency)
    const remaining = totalShares - (i + 1) * twapRate
    const impactCost = impactCoeff * twap * twap
    return { period: i + 1, twap, vwap: Math.round(vwap), aggressive: Math.round(aggressive), remaining: Math.max(0, remaining), impactCost }
  })

  const totalImpact = slices.reduce((sum, s) => sum + s.impactCost, 0)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Execution Strategy Comparison
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Compare TWAP, VWAP, and urgency-driven execution for a large NSE order.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Total shares: {totalShares.toLocaleString()}</span>
          <input type="range" min="1000" max="50000" step="1000" value={totalShares}
            onChange={e => setTotalShares(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Time slices: {timeHorizon}</span>
          <input type="range" min="5" max="30" step="1" value={timeHorizon}
            onChange={e => setTimeHorizon(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-green-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Urgency: {urgency.toFixed(2)}</span>
          <input type="range" min="0" max="2" step="0.1" value={urgency}
            onChange={e => setUrgency(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-amber-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Impact coeff: {(impactCoeff * 10000).toFixed(1)} bps</span>
          <input type="range" min="0.00001" max="0.001" step="0.00001" value={impactCoeff}
            onChange={e => setImpactCoeff(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-red-500" />
        </label>
      </div>

      <svg viewBox="0 0 420 160" className="w-full max-w-lg mx-auto block">
        {slices.map((s, i) => {
          const x = 30 + i * (380 / timeHorizon)
          const barW = (380 / timeHorizon) * 0.25
          const maxVal = totalShares / timeHorizon * 2.5
          const hTwap = (s.twap / maxVal) * 120
          const hVwap = (s.vwap / maxVal) * 120
          const hAgg = (s.aggressive / maxVal) * 120
          return (
            <g key={i}>
              <rect x={x} y={130 - hTwap} width={barW} height={hTwap} fill="#6366f1" opacity="0.7" />
              <rect x={x + barW} y={130 - hVwap} width={barW} height={hVwap} fill="#10b981" opacity="0.7" />
              <rect x={x + barW * 2} y={130 - hAgg} width={barW} height={hAgg} fill="#f59e0b" opacity="0.7" />
            </g>
          )
        })}
        <line x1="30" y1="130" x2="410" y2="130" stroke="#9ca3af" strokeWidth="1" />
        <text x="210" y="150" textAnchor="middle" className="text-[10px]" fill="#6b7280">Time slices</text>
        <text x="100" y="12" className="text-[9px]" fill="#6366f1">TWAP</text>
        <text x="170" y="12" className="text-[9px]" fill="#10b981">VWAP</text>
        <text x="240" y="12" className="text-[9px]" fill="#f59e0b">Aggressive</text>
      </svg>

      <div className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        Estimated market impact: <span className="font-bold text-red-600">
          ₹{(totalImpact * 2500).toFixed(0)}
        </span> ({(totalImpact / totalShares * 10000).toFixed(1)} bps)
      </div>
    </div>
  )
}

export default function OptimalExecutionRL() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        RL for Optimal Execution on NSE
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Optimal execution is the problem of trading a large order while minimizing market
        impact and timing risk. On NSE, where large-cap stocks like Reliance and TCS may
        have significant impact for institutional-sized orders, RL agents can learn adaptive
        execution policies that outperform traditional TWAP and VWAP benchmarks by
        responding to real-time order book conditions.
      </p>

      <DefinitionBlock
        title="Optimal Execution Problem"
        label="Definition 14.12"
        definition="Given a parent order to buy/sell Q shares of a stock within time horizon T, the optimal execution problem minimizes the expected implementation shortfall (IS): IS = (execution price - arrival price) × Q. The trade-off is between market impact (trading too fast) and timing risk (trading too slow)."
        notation="n_t is the number of shares traded at time t, with constraint Σn_t = Q."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Almgren-Chriss Framework
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The classical model assumes temporary and permanent impact:
      </p>

      <BlockMath math="P_t = P_{t-1} + \underbrace{\sigma \epsilon_t}_{\text{random walk}} - \underbrace{g(n_t)}_{\text{permanent impact}} - \underbrace{h(n_t)}_{\text{temporary impact}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        With linear impact functions:
      </p>

      <BlockMath math="g(n) = \gamma \cdot n, \qquad h(n) = \eta \cdot n + \epsilon \cdot \text{sgn}(n)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The optimal deterministic trajectory under mean-variance optimization:
      </p>

      <BlockMath math="n_t^* = Q \cdot \frac{\sinh(\kappa(T-t))}{\sinh(\kappa T)}, \quad \kappa = \sqrt{\frac{\lambda \sigma^2}{\eta}}" />

      <TheoremBlock
        title="Almgren-Chriss Optimal Trajectory"
        label="Theorem 14.10"
        statement="For linear temporary impact h(n) = ηn and quadratic permanent impact, the optimal execution schedule that minimizes E[IS] + λ·Var[IS] is: n_t = Q·sinh(κ(T-t))/sinh(κT), where κ = √(λσ²/η). As λ→0 (risk-neutral), this converges to TWAP; as λ→∞ (risk-averse), it front-loads execution."
        proof="The cost functional is: C = Σ[η·n_t² + γ·q_t·n_t] + λσ²Σq_t². Taking the Euler-Lagrange equations for the discrete variational problem: 2ηn_t = λσ²q_t - γn_t + Lagrange multiplier. The solution is a hyperbolic sine trajectory. The boundary conditions q_0 = Q and q_T = 0 pin the constants."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        RL Formulation for Execution
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The RL execution agent observes order book state and remaining inventory:
      </p>

      <BlockMath math="s_t = \left[q_t^{\text{remaining}}, \; \frac{t}{T}, \; \text{spread}_t, \; \text{depth}_t, \; \text{imbalance}_t, \; \text{volatility}_t\right]" />

      <BlockMath math="a_t = n_t \in [0, q_t^{\text{remaining}}] \quad \text{(shares to execute at time } t \text{)}" />

      <BlockMath math="R_t = -\left(\underbrace{p_t^{\text{exec}} - p_0^{\text{arrival}}}_{\text{slippage}} \cdot n_t + \underbrace{c \cdot n_t}_{\text{transaction cost}}\right)" />

      <InteractiveExecution />

      <NoteBlock title="NSE Execution Specifics" type="info">
        <p>
          NSE operates a continuous order matching system (9:15-15:30 IST) with a call auction
          at open (9:00-9:08) and close (15:30-15:40). Key considerations for execution algorithms:
          (1) The pre-open session sets the opening price via call auction, (2) tick size is ₹0.05
          for most stocks, (3) circuit limits halt trading at specific price bands, (4) large orders
          can be placed as icebergs (disclosed quantity) to hide true order size.
        </p>
      </NoteBlock>

      <PythonCode
        title="optimal_execution_rl.py"
        runnable
        code={`import numpy as np

class NSEExecutionEnv:
    """
    Execution environment for optimal order execution on NSE.
    Simulates market impact, spread, and order book dynamics.
    """
    def __init__(self, total_shares=10000, time_horizon=20,
                 base_price=2500, daily_volume=500000,
                 volatility=0.02, permanent_impact=1e-5,
                 temporary_impact=5e-4, spread=0.05):
        self.total_shares = total_shares
        self.T = time_horizon
        self.base_price = base_price
        self.daily_volume = daily_volume
        self.sigma = volatility
        self.gamma = permanent_impact    # Permanent impact
        self.eta = temporary_impact      # Temporary impact
        self.spread = spread             # Tick-level spread (INR)
        self.reset()

    def reset(self):
        self.remaining = self.total_shares
        self.current_step = 0
        self.price = self.base_price
        self.arrival_price = self.base_price
        self.total_cost = 0
        self.execution_prices = []
        self.trade_schedule = []
        return self._get_obs()

    def _get_obs(self):
        return np.array([
            self.remaining / self.total_shares,    # Fraction remaining
            self.current_step / self.T,            # Time progress
            self.spread / self.price,              # Relative spread
            np.random.uniform(0.5, 2.0),           # Volume ratio
            np.random.uniform(-1, 1),              # Order book imbalance
            self.sigma                             # Volatility
        ], dtype=np.float32)

    def step(self, n_shares):
        """Execute n_shares at current time step."""
        n_shares = min(max(0, int(n_shares)), self.remaining)

        # Market impact
        participation = n_shares / (self.daily_volume / self.T) if self.daily_volume > 0 else 0
        temp_impact = self.eta * n_shares / self.base_price * self.price
        perm_impact = self.gamma * n_shares * self.price

        # Execution price (including impact and half-spread)
        exec_price = self.price + temp_impact + self.spread / 2

        # Cost of this slice
        slice_cost = (exec_price - self.arrival_price) * n_shares
        self.total_cost += slice_cost

        # Update state
        self.remaining -= n_shares
        self.price += perm_impact + self.sigma * self.price * np.random.randn()
        self.current_step += 1
        self.execution_prices.append(exec_price)
        self.trade_schedule.append(n_shares)

        # Reward: negative implementation shortfall
        reward = -slice_cost / (self.total_shares * self.arrival_price)

        # Terminal penalty for unexecuted shares
        done = self.current_step >= self.T
        if done and self.remaining > 0:
            penalty_price = self.price + self.eta * self.remaining * 2
            penalty_cost = (penalty_price - self.arrival_price) * self.remaining
            self.total_cost += penalty_cost
            reward -= penalty_cost / (self.total_shares * self.arrival_price)
            self.remaining = 0

        obs = self._get_obs()
        info = {
            'remaining': self.remaining,
            'exec_price': exec_price,
            'slice_cost_bps': slice_cost / (n_shares * self.arrival_price) * 10000 if n_shares > 0 else 0,
            'total_is_bps': self.total_cost / (self.total_shares * self.arrival_price) * 10000,
            'participation': participation
        }
        return obs, reward, done, info


class ExecutionRLAgent:
    """Simple RL agent for execution."""
    def __init__(self, obs_dim=6):
        np.random.seed(42)
        self.W = np.random.randn(obs_dim) * 0.1

    def act(self, obs, remaining, time_left):
        """Decide how many shares to trade."""
        signal = np.dot(obs, self.W)
        # Base rate: remaining / time_left (TWAP baseline)
        base_rate = remaining / max(time_left, 1)
        # Adjust by RL signal
        adjustment = np.tanh(signal) * 0.5 + 1.0
        n_shares = int(base_rate * adjustment)
        return max(0, min(n_shares, remaining))


def compare_strategies():
    """Compare TWAP, VWAP, and RL execution on NSE."""
    np.random.seed(42)

    # Simulate executing 10,000 shares of Reliance on NSE
    config = {
        'total_shares': 10000,
        'time_horizon': 20,
        'base_price': 2500,
        'daily_volume': 500000,
        'volatility': 0.015,
        'temporary_impact': 5e-4,
        'permanent_impact': 1e-5
    }

    strategies = {
        'TWAP': lambda env, obs, i: env.total_shares // env.T,
        'Front-loaded': lambda env, obs, i: int(env.remaining * 0.3) if i < 5 else env.remaining // max(env.T - i, 1),
        'RL Agent': None  # Will use RL agent
    }

    rl_agent = ExecutionRLAgent()
    print("Optimal Execution on NSE - Strategy Comparison")
    print(f"Order: Buy {config['total_shares']:,} shares of RELIANCE @ ~INR {config['base_price']}")
    print(f"Time horizon: {config['time_horizon']} periods")
    print(f"{'='*65}")

    results = {}
    for name, strategy in strategies.items():
        env = NSEExecutionEnv(**config)
        obs = env.reset()

        for i in range(config['time_horizon']):
            if name == 'RL Agent':
                n = rl_agent.act(obs, env.remaining, env.T - i)
            else:
                n = strategy(env, obs, i)

            obs, reward, done, info = env.step(n)
            if done:
                break

        # Compute metrics
        avg_exec_price = np.mean(env.execution_prices) if env.execution_prices else config['base_price']
        is_bps = info['total_is_bps']
        is_inr = env.total_cost

        results[name] = {
            'is_bps': is_bps,
            'is_inr': is_inr,
            'avg_price': avg_exec_price,
            'schedule': env.trade_schedule
        }

        print(f"\\n{name}:")
        print(f"  Avg exec price: INR {avg_exec_price:,.2f}")
        print(f"  Implementation shortfall: {is_bps:.2f} bps (INR {is_inr:,.0f})")
        print(f"  Schedule: {env.trade_schedule[:10]}{'...' if len(env.trade_schedule) > 10 else ''}")

    print(f"\\n{'='*65}")
    best = min(results.items(), key=lambda x: x[1]['is_bps'])
    print(f"Best strategy: {best[0]} ({best[1]['is_bps']:.2f} bps)")

compare_strategies()`}
      />

      <ExampleBlock
        title="Almgren-Chriss Execution for Reliance"
        difficulty="advanced"
        problem="A mutual fund needs to buy 50,000 shares of Reliance Industries (price ₹2,500, ADV 2M shares). Time horizon: 1 trading day (20 intervals). Temporary impact η = 0.0005, volatility σ = 1.5%. Risk aversion λ = 10⁻⁶. Compute the optimal execution schedule."
        solution={[
          {
            step: 'Compute urgency parameter κ',
            formula: '\\kappa = \\sqrt{\\frac{\\lambda \\sigma^2}{\\eta}} = \\sqrt{\\frac{10^{-6} \\times 0.015^2}{0.0005}} = 0.0212',
            explanation: 'κ controls the trade-off between impact and risk. Low κ means nearly TWAP; high κ means front-loaded.',
          },
          {
            step: 'Optimal trajectory',
            formula: 'n_t = 50000 \\times \\frac{\\sinh(0.0212 \\times (20-t))}{\\sinh(0.0212 \\times 20)}',
            explanation: 'With low κ, this produces a nearly uniform schedule close to TWAP (2,500 shares per interval).',
          },
          {
            step: 'Expected cost',
            formula: 'E[\\text{IS}] = \\eta \\sum_t n_t^2 = 0.0005 \\times 20 \\times 2500^2 \\approx 62{,}500 \\text{ bps worth}',
            explanation: 'The expected implementation shortfall from temporary impact. This equals approximately ₹6.25 per share or ₹3.125 lakhs total.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          RL-based execution outperforms static strategies (TWAP/VWAP) because it adapts to
          real-time market conditions -- widening spreads, changing volatility, and order book
          imbalance on NSE. Key considerations for Indian markets: (1) NSE&apos;s tick size of
          ₹0.05 creates discrete price levels, (2) the pre-open auction (9:00-9:08) offers
          a low-impact execution window, (3) use iceberg orders (disclosed quantity feature)
          to minimize information leakage, and (4) account for NSE&apos;s closing auction for
          NAV-benchmarked orders. SEBI regulations require best execution for institutional
          orders.
        </p>
      </NoteBlock>
    </div>
  )
}
