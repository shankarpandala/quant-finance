import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractivePPOClipping() {
  const [epsilon, setEpsilon] = useState(0.2)
  const [advantage, setAdvantage] = useState(0.5)
  const [ratio, setRatio] = useState(1.0)

  const unclipped = ratio * advantage
  const clippedRatio = Math.max(1 - epsilon, Math.min(1 + epsilon, ratio))
  const clipped = clippedRatio * advantage
  const ppoObjective = Math.min(unclipped, clipped)

  const points = []
  for (let r = 0.2; r <= 2.0; r += 0.02) {
    const uc = r * advantage
    const cr = Math.max(1 - epsilon, Math.min(1 + epsilon, r))
    const cl = cr * advantage
    points.push({ r, objective: Math.min(uc, cl) })
  }

  const svgW = 400
  const svgH = 200
  const margin = { top: 20, right: 20, bottom: 30, left: 40 }
  const plotW = svgW - margin.left - margin.right
  const plotH = svgH - margin.top - margin.bottom

  const xScale = (r) => margin.left + ((r - 0.2) / 1.8) * plotW
  const maxObj = Math.max(...points.map(p => Math.abs(p.objective)), 0.5)
  const yScale = (v) => margin.top + plotH / 2 - (v / maxObj) * (plotH / 2)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: PPO Clipping Objective
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust <InlineMath math="\epsilon" />, advantage <InlineMath math="\hat{A}" />,
        and probability ratio <InlineMath math="r(\theta)" /> to see the clipping effect.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math="\epsilon" /> = {epsilon.toFixed(2)}</span>
          <input type="range" min="0.05" max="0.5" step="0.05" value={epsilon}
            onChange={e => setEpsilon(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math="\hat{A}" /> = {advantage.toFixed(2)}</span>
          <input type="range" min="-1" max="1" step="0.05" value={advantage}
            onChange={e => setAdvantage(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-green-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math="r(\theta)" /> = {ratio.toFixed(2)}</span>
          <input type="range" min="0.3" max="1.8" step="0.05" value={ratio}
            onChange={e => setRatio(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-amber-500" />
        </label>
      </div>

      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-lg mx-auto block">
        <line x1={margin.left} y1={yScale(0)} x2={svgW - margin.right} y2={yScale(0)}
          stroke="#9ca3af" strokeWidth="1" />
        <line x1={xScale(1 - epsilon)} y1={margin.top} x2={xScale(1 - epsilon)} y2={svgH - margin.bottom}
          stroke="#ef4444" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
        <line x1={xScale(1 + epsilon)} y1={margin.top} x2={xScale(1 + epsilon)} y2={svgH - margin.bottom}
          stroke="#ef4444" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />

        <polyline
          points={points.map(p => `${xScale(p.r)},${yScale(p.objective)}`).join(' ')}
          fill="none" stroke="#6366f1" strokeWidth="2" />

        <circle cx={xScale(ratio)} cy={yScale(ppoObjective)} r="5" fill="#6366f1" />

        <text x={xScale(1)} y={svgH - 5} textAnchor="middle" className="text-[10px]" fill="#6b7280">r(θ)</text>
        <text x={xScale(1 - epsilon)} y={svgH - 5} textAnchor="middle" className="text-[9px]" fill="#ef4444">1-ε</text>
        <text x={xScale(1 + epsilon)} y={svgH - 5} textAnchor="middle" className="text-[9px]" fill="#ef4444">1+ε</text>
      </svg>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded bg-blue-50 p-2 dark:bg-blue-900/30">
          <div className="text-blue-600 dark:text-blue-400">Unclipped</div>
          <div className="font-bold">{unclipped.toFixed(4)}</div>
        </div>
        <div className="rounded bg-amber-50 p-2 dark:bg-amber-900/30">
          <div className="text-amber-600 dark:text-amber-400">Clipped</div>
          <div className="font-bold">{clipped.toFixed(4)}</div>
        </div>
        <div className="rounded bg-green-50 p-2 dark:bg-green-900/30">
          <div className="text-green-600 dark:text-green-400">PPO Objective</div>
          <div className="font-bold">{ppoObjective.toFixed(4)}</div>
        </div>
      </div>
    </div>
  )
}

export default function PPOTrading() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        PPO for Nifty Portfolio Allocation
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Proximal Policy Optimization (PPO) is the most popular policy gradient algorithm in
        modern RL, combining the stability of trust-region methods with the simplicity of
        first-order optimization. PPO is particularly well-suited for trading applications
        on NSE because it handles continuous action spaces (portfolio weights) and provides
        stable training without extensive hyperparameter tuning.
      </p>

      <DefinitionBlock
        title="Proximal Policy Optimization (PPO)"
        label="Definition 14.5"
        definition="PPO is a policy gradient method that constrains policy updates to stay within a trust region by clipping the probability ratio r(θ) = π_θ(a|s) / π_θ_old(a|s). The clipped objective prevents destructively large updates while allowing the policy to improve monotonically."
        notation="The clip parameter ε (typically 0.1-0.3) controls the size of the trust region."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        PPO Objective Function
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The PPO-Clip objective is:
      </p>

      <BlockMath math="L^{\text{CLIP}}(\theta) = \hat{\mathbb{E}}_t\left[\min\left(r_t(\theta)\hat{A}_t, \;\text{clip}(r_t(\theta), 1-\epsilon, 1+\epsilon)\hat{A}_t\right)\right]" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where the probability ratio and advantage are:
      </p>

      <BlockMath math="r_t(\theta) = \frac{\pi_\theta(a_t | s_t)}{\pi_{\theta_{\text{old}}}(a_t | s_t)}, \quad \hat{A}_t = \sum_{l=0}^{T-t} (\gamma\lambda)^l \delta_{t+l}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The GAE (Generalized Advantage Estimation) uses TD residuals:
      </p>

      <BlockMath math="\delta_t = R_{t+1} + \gamma V(S_{t+1}) - V(S_t)" />

      <TheoremBlock
        title="PPO Trust Region Guarantee"
        label="Theorem 14.4"
        statement="The clipped PPO objective provides a lower bound on the true policy improvement. For any ε > 0, the PPO update satisfies: J(π_new) ≥ L^CLIP(θ) - C·KL(π_old || π_new), where C depends on the MDP structure. This ensures monotonic improvement in expectation."
        proof="When r(θ) is within [1-ε, 1+ε], the objective equals the standard policy gradient. When r(θ) exceeds this range, clipping prevents the objective from increasing further, thus discouraging large policy changes. The min operator ensures the clipped version is a pessimistic bound. Combined with the GAE advantage estimator, this yields stable updates that approximate TRPO's constraint without solving a constrained optimization problem."
      />

      <InteractivePPOClipping />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        PPO Architecture for Nifty Trading
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For Nifty 50 portfolio allocation, we use a shared actor-critic network that outputs
        portfolio weights for all 50 constituents plus a cash allocation:
      </p>

      <BlockMath math="\pi_\theta(a | s) = \text{Dirichlet}(\alpha_1, \alpha_2, \ldots, \alpha_{51})" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The Dirichlet distribution ensures weights sum to 1 and are non-negative, satisfying
        the portfolio constraint. The concentration parameters{' '}
        <InlineMath math="\alpha_i = \text{softplus}(f_\theta^i(s))" /> are output by the
        policy network.
      </p>

      <PythonCode
        title="ppo_nifty_trading.py"
        runnable
        code={`import numpy as np
from collections import deque

class PPOBuffer:
    """Experience buffer for PPO training."""
    def __init__(self, obs_dim, act_dim, size=2048, gamma=0.99, lam=0.95):
        self.obs = np.zeros((size, obs_dim), dtype=np.float32)
        self.actions = np.zeros((size, act_dim), dtype=np.float32)
        self.rewards = np.zeros(size, dtype=np.float32)
        self.values = np.zeros(size, dtype=np.float32)
        self.log_probs = np.zeros(size, dtype=np.float32)
        self.advantages = np.zeros(size, dtype=np.float32)
        self.returns = np.zeros(size, dtype=np.float32)
        self.gamma = gamma
        self.lam = lam
        self.ptr = 0
        self.size = size

    def store(self, obs, action, reward, value, log_prob):
        idx = self.ptr % self.size
        self.obs[idx] = obs
        self.actions[idx] = action
        self.rewards[idx] = reward
        self.values[idx] = value
        self.log_probs[idx] = log_prob
        self.ptr += 1

    def compute_gae(self, last_value=0):
        """Compute GAE-Lambda advantages."""
        n = min(self.ptr, self.size)
        last_gae = 0
        for t in reversed(range(n)):
            if t == n - 1:
                next_value = last_value
            else:
                next_value = self.values[t + 1]
            delta = self.rewards[t] + self.gamma * next_value - self.values[t]
            last_gae = delta + self.gamma * self.lam * last_gae
            self.advantages[t] = last_gae
        self.returns[:n] = self.advantages[:n] + self.values[:n]

        # Normalize advantages
        adv = self.advantages[:n]
        self.advantages[:n] = (adv - adv.mean()) / (adv.std() + 1e-8)


class PPOAgent:
    """
    PPO agent for Nifty portfolio allocation.
    Simplified implementation for educational purposes.
    """
    def __init__(self, obs_dim=60, n_assets=5, lr=3e-4,
                 clip_epsilon=0.2, epochs=10, batch_size=64):
        self.obs_dim = obs_dim
        self.n_assets = n_assets
        self.clip_epsilon = clip_epsilon
        self.epochs = epochs
        self.batch_size = batch_size

        # Simplified policy parameters (normally a neural network)
        np.random.seed(42)
        self.policy_weights = np.random.randn(obs_dim, n_assets) * 0.01
        self.value_weights = np.random.randn(obs_dim, 1) * 0.01
        self.lr = lr

    def get_action(self, obs):
        """Sample action from policy (portfolio weights)."""
        logits = obs @ self.policy_weights
        # Softmax to get portfolio weights
        exp_logits = np.exp(logits - logits.max())
        weights = exp_logits / exp_logits.sum()

        # Add exploration noise
        noise = np.random.dirichlet(np.ones(self.n_assets) * 10)
        weights = 0.8 * weights + 0.2 * noise

        log_prob = np.sum(np.log(weights + 1e-8))
        return weights, log_prob

    def get_value(self, obs):
        """Estimate state value."""
        return float(obs @ self.value_weights)

    def compute_ppo_loss(self, old_log_probs, new_log_probs, advantages):
        """Compute clipped PPO objective."""
        ratio = np.exp(new_log_probs - old_log_probs)
        clipped_ratio = np.clip(ratio, 1 - self.clip_epsilon,
                                1 + self.clip_epsilon)
        loss = -np.minimum(ratio * advantages, clipped_ratio * advantages)
        return loss.mean(), ratio.mean()


# Demo: PPO for simplified Nifty allocation
np.random.seed(42)
n_assets = 5  # Top 5 Nifty stocks
asset_names = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK']

# Simulate 252 trading days
n_days = 252
returns = np.random.multivariate_normal(
    mean=[0.0005, 0.0004, 0.0003, 0.0006, 0.0004],
    cov=np.eye(n_assets) * 0.0004 + 0.0001,
    size=n_days
)

# Initialize PPO
obs_dim = 30  # Flattened observation
agent = PPOAgent(obs_dim=obs_dim, n_assets=n_assets,
                 clip_epsilon=0.2, lr=3e-4)
buffer = PPOBuffer(obs_dim=obs_dim, act_dim=n_assets,
                   size=2048, gamma=0.99, lam=0.95)

# Simple training loop
portfolio_value = 10_00_000  # INR 10 lakhs
portfolio_history = [portfolio_value]

print(f"PPO Trading Agent for Nifty Top 5")
print(f"Assets: {', '.join(asset_names)}")
print(f"Initial capital: INR {portfolio_value:,.0f}")
print(f"Clip epsilon: {agent.clip_epsilon}")
print(f"{'='*60}")

for day in range(min(100, n_days)):
    # Create observation (simplified)
    obs = np.random.randn(obs_dim).astype(np.float32)

    # Get action and value
    weights, log_prob = agent.get_action(obs)
    value = agent.get_value(obs)

    # Compute portfolio return
    port_return = np.dot(weights, returns[day])
    portfolio_value *= (1 + port_return)
    portfolio_history.append(portfolio_value)

    # Shaped reward (log return with drawdown penalty)
    reward = np.log(1 + port_return)

    # Store in buffer
    buffer.store(obs, weights, reward, value, log_prob)

    if day % 20 == 19:
        print(f"Day {day+1:3d} | Portfolio: INR {portfolio_value:>12,.0f} | "
              f"Weights: [{', '.join(f'{w:.2f}' for w in weights)}]")

# Compute GAE
buffer.compute_gae()

# Summary
total_return = (portfolio_value / 10_00_000 - 1) * 100
daily_returns = np.diff(np.log(portfolio_history))
sharpe = np.mean(daily_returns) / np.std(daily_returns) * np.sqrt(252)

print(f"\\n{'='*60}")
print(f"Final portfolio: INR {portfolio_value:,.0f}")
print(f"Total return: {total_return:.2f}%")
print(f"Annualized Sharpe: {sharpe:.2f}")
print(f"Max drawdown: {min(0, min(np.array(portfolio_history)/np.maximum.accumulate(portfolio_history) - 1))*100:.1f}%")`}
      />

      <ExampleBlock
        title="PPO Hyperparameter Selection for NSE"
        difficulty="advanced"
        problem="You are deploying a PPO agent for Nifty 50 futures trading. The environment has 252 trading days per year. Select appropriate hyperparameters for: (1) clip epsilon, (2) GAE lambda, (3) learning rate, (4) number of epochs per update."
        solution={[
          {
            step: 'Clip epsilon (ε = 0.1)',
            formula: '\\text{clip}(r_t(\\theta), 1-0.1, 1+0.1) = \\text{clip}(r_t, 0.9, 1.1)',
            explanation: 'For financial environments with non-stationary dynamics, a smaller ε = 0.1 provides more conservative updates than the default 0.2, preventing the policy from changing too rapidly.',
          },
          {
            step: 'GAE lambda (λ = 0.97)',
            formula: '\\hat{A}_t = \\sum_{l=0}^{T-t} (0.99 \\times 0.97)^l \\delta_{t+l}',
            explanation: 'Higher λ reduces bias in advantage estimation at the cost of higher variance. For trading, λ = 0.97 captures multi-day price trends.',
          },
          {
            step: 'Learning rate with schedule',
            formula: '\\eta_t = 3 \\times 10^{-4} \\cdot \\max(1 - t/T, 0.1)',
            explanation: 'Linear decay from 3e-4 with a floor of 3e-5 works well for trading. Financial environments are non-stationary, so decaying the LR helps convergence.',
          },
          {
            step: 'Epochs per update (K = 4)',
            formula: '\\theta \\leftarrow \\theta + \\eta \\nabla L^{\\text{CLIP}}(\\theta) \\quad (4 \\text{ passes})',
            explanation: 'Fewer epochs (4 vs typical 10) prevent overfitting to recent market data. Financial data has lower signal-to-noise ratio than game environments.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          PPO is the go-to RL algorithm for trading due to its stability and ease of
          implementation. For NSE-specific applications: (1) use Dirichlet policy for
          portfolio weight outputs, (2) reduce clip epsilon to 0.1 for more conservative
          updates in noisy financial environments, (3) implement proper reward shaping
          with Sharpe-based objectives, and (4) validate on out-of-sample NSE data across
          different market regimes (2008 crash, 2020 COVID crash, 2021 bull run).
        </p>
      </NoteBlock>
    </div>
  )
}
