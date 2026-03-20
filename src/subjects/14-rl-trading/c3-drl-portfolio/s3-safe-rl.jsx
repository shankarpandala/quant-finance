import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveCVaR() {
  const [alpha, setAlpha] = useState(0.05)
  const [constraintLevel, setConstraintLevel] = useState(0.10)
  const [nSamples] = useState(200)

  const returns = Array(nSamples).fill(null).map(() => {
    const u = Math.random()
    if (u < 0.05) return -0.08 + Math.random() * 0.03
    if (u < 0.15) return -0.05 + Math.random() * 0.03
    return (Math.random() - 0.4) * 0.04
  }).sort((a, b) => a - b)

  const varIdx = Math.floor(alpha * nSamples)
  const varValue = returns[varIdx]
  const cvarReturns = returns.slice(0, varIdx + 1)
  const cvar = cvarReturns.reduce((a, b) => a + b, 0) / cvarReturns.length

  const isViolation = Math.abs(cvar) > constraintLevel

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: CVaR Constraint Visualizer
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust the confidence level <InlineMath math="\alpha" /> and constraint threshold
        to see how CVaR-constrained RL limits tail risk in an NSE portfolio.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Tail probability <InlineMath math="\alpha" /> = {(alpha * 100).toFixed(0)}%</span>
          <input type="range" min="0.01" max="0.20" step="0.01" value={alpha}
            onChange={e => setAlpha(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>CVaR constraint: {(constraintLevel * 100).toFixed(1)}%</span>
          <input type="range" min="0.02" max="0.20" step="0.01" value={constraintLevel}
            onChange={e => setConstraintLevel(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-red-500" />
        </label>
      </div>

      <svg viewBox="0 0 420 160" className="w-full max-w-lg mx-auto block">
        {returns.map((r, i) => {
          const x = 10 + (i / nSamples) * 400
          const h = Math.abs(r) * 800
          const y = 120 - h
          const isTail = i <= varIdx
          return (
            <rect key={i} x={x} y={y} width={400 / nSamples - 0.5} height={h}
              fill={isTail ? '#ef4444' : '#6366f1'} opacity={isTail ? 0.8 : 0.4} />
          )
        })}
        <line x1={10 + (varIdx / nSamples) * 400} y1="10" x2={10 + (varIdx / nSamples) * 400} y2="130"
          stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />
        <text x={10 + (varIdx / nSamples) * 400} y="8" textAnchor="middle" className="text-[9px]" fill="#f59e0b">
          VaR_{alpha}
        </text>
        <text x="210" y="155" textAnchor="middle" className="text-[10px]" fill="#6b7280">
          Sorted returns (red = tail losses)
        </text>
      </svg>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded bg-amber-50 p-2 dark:bg-amber-900/30">
          <div className="text-amber-600 dark:text-amber-400">VaR ({(alpha * 100).toFixed(0)}%)</div>
          <div className="font-bold">{(varValue * 100).toFixed(2)}%</div>
        </div>
        <div className="rounded bg-red-50 p-2 dark:bg-red-900/30">
          <div className="text-red-600 dark:text-red-400">CVaR ({(alpha * 100).toFixed(0)}%)</div>
          <div className="font-bold">{(cvar * 100).toFixed(2)}%</div>
        </div>
        <div className={`rounded p-2 ${isViolation ? 'bg-red-100 dark:bg-red-900/40' : 'bg-green-50 dark:bg-green-900/30'}`}>
          <div className={isViolation ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}>
            Constraint
          </div>
          <div className="font-bold">
            {isViolation ? 'VIOLATED' : 'SATISFIED'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SafeRL() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Constrained RL and CVaR-Constrained Policies
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        In regulated financial markets like India, trading strategies must satisfy risk
        constraints imposed by SEBI, exchanges, and internal risk management. Safe RL
        formulates trading as a Constrained MDP (CMDP), where the policy must maximize
        returns while keeping risk metrics (drawdown, CVaR, leverage) within acceptable bounds.
      </p>

      <DefinitionBlock
        title="Constrained Markov Decision Process (CMDP)"
        label="Definition 14.10"
        definition="A CMDP extends the standard MDP with K constraint functions c_k(s,a) and limits d_k. The objective is: max_π J(π) subject to J_c_k(π) ≤ d_k for k = 1,...,K. The constraint costs J_c_k(π) = E[Σ γ^t c_k(s_t, a_t)] must not exceed the thresholds d_k."
        notation="The Lagrangian relaxation converts CMDP to: max_π min_λ≥0 J(π) - Σ λ_k(J_c_k(π) - d_k)."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Risk Constraints for Indian Markets
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Common constraints for SEBI-regulated strategies:
      </p>

      <BlockMath math="\begin{aligned}
        \text{CVaR}_\alpha(R_\pi) &\geq -d_{\text{CVaR}} & \text{(tail risk limit)} \\
        \text{MaxDD}(\pi) &\leq d_{\text{DD}} & \text{(drawdown limit)} \\
        \|w\|_\infty &\leq d_{\text{conc}} & \text{(concentration limit)} \\
        \sum |w_i - w_i^{\text{prev}}| &\leq d_{\text{turn}} & \text{(turnover limit)}
      \end{aligned}" />

      <DefinitionBlock
        title="Conditional Value-at-Risk (CVaR)"
        label="Definition 14.11"
        definition="CVaR_α (also called Expected Shortfall) is the expected loss in the worst α fraction of scenarios. It is a coherent risk measure: CVaR_α(X) = E[X | X ≤ VaR_α(X)]. For α = 5%, CVaR represents the average loss in the worst 5% of trading days."
        notation="CVaR_α is also denoted ES_α. VaR_α is the α-quantile of the loss distribution."
      />

      <BlockMath math="\text{CVaR}_\alpha(X) = \frac{1}{\alpha}\int_0^{\alpha} \text{VaR}_u(X)\, du = \mathbb{E}[X \mid X \leq \text{VaR}_\alpha(X)]" />

      <TheoremBlock
        title="Lagrangian Relaxation of CMDP"
        label="Theorem 14.9"
        statement="For a CMDP with convex constraint functions, the Lagrangian dual approach finds the optimal constrained policy by solving: max_π min_{λ≥0} L(π, λ) = J(π) - Σ_k λ_k(J_{c_k}(π) - d_k). Under Slater's condition, strong duality holds, and the optimal Lagrange multipliers λ* correspond to the shadow prices of the constraints."
        proof="The CMDP feasibility set is convex in the space of occupancy measures (Altman, 1999). The objective and constraints are linear in occupancy measures, making the optimization a linear program. By the LP duality theorem, strong duality holds when the feasible set is non-empty (Slater's condition). The dual variables λ* indicate how much the objective would improve if the constraint were relaxed by one unit."
      />

      <InteractiveCVaR />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Lagrangian PPO for Safe Trading
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        We augment PPO with Lagrangian multipliers for constraint satisfaction:
      </p>

      <BlockMath math="L(\theta, \lambda) = L^{\text{CLIP}}(\theta) - \sum_{k=1}^K \lambda_k \left(\hat{J}_{c_k}(\theta) - d_k\right)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The Lagrange multipliers are updated via dual gradient ascent:
      </p>

      <BlockMath math="\lambda_k \leftarrow \max\left(0, \; \lambda_k + \eta_\lambda (\hat{J}_{c_k}(\theta) - d_k)\right)" />

      <PythonCode
        title="safe_rl_trading.py"
        runnable
        code={`import numpy as np

class CVaRConstrainedAgent:
    """
    Safe RL agent with CVaR constraint for NSE trading.
    Uses Lagrangian relaxation to satisfy risk constraints.
    """
    def __init__(self, obs_dim=20, n_actions=3, cvar_alpha=0.05,
                 cvar_limit=0.05, max_drawdown=0.15, lr=3e-4,
                 lr_lambda=1e-3):
        np.random.seed(42)
        self.obs_dim = obs_dim
        self.n_actions = n_actions
        self.cvar_alpha = cvar_alpha
        self.cvar_limit = cvar_limit
        self.max_drawdown = max_drawdown
        self.lr = lr
        self.lr_lambda = lr_lambda

        # Policy parameters
        self.W = np.random.randn(obs_dim, n_actions) * 0.01

        # Lagrange multipliers
        self.lambda_cvar = 0.1
        self.lambda_dd = 0.1

        # Track returns for CVaR computation
        self.returns_history = []

    def get_action(self, obs, explore=True):
        logits = obs @ self.W
        probs = np.exp(logits - logits.max())
        probs = probs / probs.sum()

        if explore:
            action = np.random.choice(self.n_actions, p=probs)
        else:
            action = np.argmax(probs)

        return action, probs

    def compute_cvar(self, returns, alpha=None):
        """Compute CVaR (Expected Shortfall) from return samples."""
        if alpha is None:
            alpha = self.cvar_alpha
        if len(returns) == 0:
            return 0.0
        sorted_returns = np.sort(returns)
        n_tail = max(1, int(len(returns) * alpha))
        tail_returns = sorted_returns[:n_tail]
        return np.mean(tail_returns)

    def compute_var(self, returns, alpha=None):
        """Compute Value-at-Risk."""
        if alpha is None:
            alpha = self.cvar_alpha
        if len(returns) == 0:
            return 0.0
        sorted_returns = np.sort(returns)
        idx = max(0, int(len(returns) * alpha) - 1)
        return sorted_returns[idx]

    def compute_lagrangian_reward(self, reward, current_return,
                                    current_drawdown):
        """Compute reward with Lagrangian penalty terms."""
        # Store return for CVaR computation
        self.returns_history.append(current_return)

        # Compute constraint violations
        cvar_violation = 0
        if len(self.returns_history) >= 20:
            recent_cvar = self.compute_cvar(self.returns_history[-100:])
            cvar_violation = max(0, -recent_cvar - self.cvar_limit)

        dd_violation = max(0, current_drawdown - self.max_drawdown)

        # Lagrangian reward
        lagrangian_reward = (reward
                            - self.lambda_cvar * cvar_violation
                            - self.lambda_dd * dd_violation)

        return lagrangian_reward, {
            'cvar_violation': cvar_violation,
            'dd_violation': dd_violation
        }

    def update_lambdas(self, cvar_violation, dd_violation):
        """Update Lagrange multipliers via dual gradient ascent."""
        self.lambda_cvar = max(0, self.lambda_cvar
                               + self.lr_lambda * cvar_violation)
        self.lambda_dd = max(0, self.lambda_dd
                             + self.lr_lambda * dd_violation)


def simulate_safe_trading():
    """Simulate CVaR-constrained trading on NSE."""
    np.random.seed(42)

    # Generate realistic Nifty-like returns with fat tails
    n_days = 500
    normal_returns = np.random.normal(0.0005, 0.015, n_days)
    # Add occasional tail events (like 2020 COVID crash)
    crash_days = np.random.choice(n_days, 15, replace=False)
    normal_returns[crash_days] -= np.random.uniform(0.03, 0.08, 15)
    prices = 18000 * np.cumprod(1 + normal_returns)

    # Initialize constrained agent
    agent = CVaRConstrainedAgent(
        obs_dim=10,
        cvar_alpha=0.05,       # 5% tail
        cvar_limit=0.04,       # Max 4% CVaR loss
        max_drawdown=0.15      # Max 15% drawdown
    )

    portfolio = 50_00_000  # INR 50 lakhs
    peak = portfolio
    position = 0
    cash = portfolio

    print("Safe RL Trading with CVaR Constraint (NSE)")
    print(f"CVaR limit: {agent.cvar_limit:.1%} at alpha={agent.cvar_alpha:.0%}")
    print(f"Max drawdown: {agent.max_drawdown:.0%}")
    print(f"{'='*70}")

    for day in range(min(300, n_days - 1)):
        price = prices[day]
        obs = np.random.randn(10).astype(np.float32)

        action, probs = agent.get_action(obs)

        # Execute trade
        if action == 2 and cash >= price * 10:  # Buy
            position += 10
            cash -= price * 10
        elif action == 0 and position >= 10:  # Sell
            position -= 10
            cash += price * 10

        # New portfolio value
        new_price = prices[day + 1]
        new_portfolio = cash + position * new_price
        daily_return = (new_portfolio - portfolio) / portfolio
        portfolio = new_portfolio
        peak = max(peak, portfolio)
        drawdown = (peak - portfolio) / peak

        # Compute safe reward
        base_reward = np.log(1 + daily_return) if daily_return > -1 else -10
        safe_reward, violations = agent.compute_lagrangian_reward(
            base_reward, daily_return, drawdown
        )

        # Update Lagrange multipliers
        agent.update_lambdas(violations['cvar_violation'],
                            violations['dd_violation'])

        if day % 60 == 59:
            cvar = agent.compute_cvar(agent.returns_history[-100:]) if len(agent.returns_history) >= 20 else 0
            var = agent.compute_var(agent.returns_history[-100:]) if len(agent.returns_history) >= 20 else 0
            print(f"Day {day+1:3d} | INR {portfolio:>12,.0f} | "
                  f"DD: {drawdown:.1%} | VaR: {var:.2%} | CVaR: {cvar:.2%} | "
                  f"λ_CVaR: {agent.lambda_cvar:.3f} | λ_DD: {agent.lambda_dd:.3f}")

    # Final summary
    total_return = (portfolio / 50_00_000 - 1) * 100
    final_cvar = agent.compute_cvar(agent.returns_history)
    final_var = agent.compute_var(agent.returns_history)

    print(f"\\n{'='*70}")
    print(f"Final portfolio: INR {portfolio:,.0f} ({total_return:+.1f}%)")
    print(f"Max drawdown: {(peak - min(portfolio, peak))/peak:.1%}")
    print(f"5% VaR: {final_var:.2%}")
    print(f"5% CVaR: {final_cvar:.2%}")
    print(f"CVaR constraint ({'SATISFIED' if abs(final_cvar) <= agent.cvar_limit else 'VIOLATED'})")
    print(f"Final λ_CVaR: {agent.lambda_cvar:.4f}, λ_DD: {agent.lambda_dd:.4f}")

simulate_safe_trading()`}
      />

      <ExampleBlock
        title="Setting CVaR Constraints for Indian PMS"
        difficulty="advanced"
        problem="A SEBI-registered Portfolio Management Service (PMS) promises clients maximum monthly drawdown of 8% and 5% CVaR loss of no more than 6%. Formulate the CMDP constraints and explain how Lagrangian relaxation enforces them."
        solution={[
          {
            step: 'Define constraint functions',
            formula: 'c_1(\\pi) = \\mathbb{E}[\\max_{t} (V^{\\max}_{0:t} - V_t)/V^{\\max}_{0:t}], \\quad c_2(\\pi) = -\\text{CVaR}_{0.05}(R_\\pi)',
            explanation: 'c_1 measures expected maximum monthly drawdown, c_2 measures the CVaR of portfolio returns.',
          },
          {
            step: 'Set constraint thresholds',
            formula: 'c_1(\\pi) \\leq 0.08, \\quad c_2(\\pi) \\leq 0.06',
            explanation: 'The PMS must keep drawdown below 8% and CVaR below 6% to meet investor commitments.',
          },
          {
            step: 'Lagrangian relaxation',
            formula: 'L(\\theta, \\lambda_1, \\lambda_2) = J(\\pi_\\theta) - \\lambda_1(c_1 - 0.08) - \\lambda_2(c_2 - 0.06)',
            explanation: 'The Lagrange multipliers λ_1, λ_2 automatically increase when constraints are violated, penalizing the policy and encouraging it to become more conservative.',
          },
          {
            step: 'Dual update for constraint satisfaction',
            formula: '\\lambda_k \\leftarrow \\max(0, \\lambda_k + \\eta(c_k - d_k))',
            explanation: 'If drawdown exceeds 8%, λ_1 increases, causing the agent to reduce position sizes. The multiplier acts as an adaptive risk penalty.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Safe RL is essential for deploying trading strategies in India&apos;s regulated
          environment. SEBI-registered entities (PMS, AIFs, mutual funds) face strict risk
          limits. CVaR constraints are particularly important because they control tail risk
          -- the risk of catastrophic losses during events like the 2020 COVID crash, 2022
          Adani-Hindenburg episode, or flash crashes. The Lagrangian approach is practical
          because it converts hard constraints into soft penalty terms that can be optimized
          with standard policy gradient methods, while the dual variables adaptively calibrate
          the penalty strength.
        </p>
      </NoteBlock>
    </div>
  )
}
