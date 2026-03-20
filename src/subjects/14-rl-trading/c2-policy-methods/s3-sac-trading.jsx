import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveSAC() {
  const [alpha, setAlpha] = useState(0.2)
  const [tau, setTau] = useState(0.005)
  const [batchSize, setBatchSize] = useState(256)
  const [bufferSize, setBufferSize] = useState(100000)

  const simActions = Array(20).fill(null).map((_, i) => {
    const mean = Math.sin(i * 0.3) * 0.5
    const std = alpha * 0.5
    return { mean, std, sampled: mean + (Math.random() - 0.5) * std * 2 }
  })

  const entropy = 0.5 * Math.log(2 * Math.PI * Math.E * alpha * alpha)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: SAC Temperature and Exploration
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust the temperature <InlineMath math="\alpha" /> to see how it affects exploration.
        Higher <InlineMath math="\alpha" /> encourages more diverse portfolio allocations.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Temperature <InlineMath math="\alpha" /> = {alpha.toFixed(3)}</span>
          <input type="range" min="0.01" max="1.0" step="0.01" value={alpha}
            onChange={e => setAlpha(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Soft update <InlineMath math="\tau" /> = {tau.toFixed(4)}</span>
          <input type="range" min="0.001" max="0.05" step="0.001" value={tau}
            onChange={e => setTau(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-green-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Batch size: {batchSize}</span>
          <input type="range" min="32" max="512" step="32" value={batchSize}
            onChange={e => setBatchSize(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-amber-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Buffer: {(bufferSize / 1000).toFixed(0)}K</span>
          <input type="range" min="10000" max="1000000" step="10000" value={bufferSize}
            onChange={e => setBufferSize(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-red-500" />
        </label>
      </div>

      <svg viewBox="0 0 400 150" className="w-full max-w-lg mx-auto block">
        {simActions.map((a, i) => (
          <g key={i}>
            <line x1={20 + i * 19} y1={75 - a.mean * 60} x2={20 + i * 19} y2={75 - a.sampled * 60}
              stroke="#c4b5fd" strokeWidth="2" opacity="0.5" />
            <circle cx={20 + i * 19} cy={75 - a.mean * 60} r="3" fill="#6366f1" />
            <circle cx={20 + i * 19} cy={75 - a.sampled * 60} r="2" fill="#ef4444" />
          </g>
        ))}
        <line x1="10" y1="75" x2="395" y2="75" stroke="#9ca3af" strokeWidth="0.5" />
        <text x="5" y="12" className="text-[9px]" fill="#6b7280">Blue=mean, Red=sampled</text>
        <text x="200" y="145" textAnchor="middle" className="text-[10px]" fill="#6b7280">
          Entropy: {entropy.toFixed(3)} | Exploration spread: {(alpha * 0.5).toFixed(3)}
        </text>
      </svg>
    </div>
  )
}

export default function SACTrading() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        SAC for Entropy-Regularized Trading
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Soft Actor-Critic (SAC) is a state-of-the-art off-policy algorithm that maximizes
        both expected return and entropy, encouraging exploration while learning. For
        continuous portfolio allocation on NSE -- where positions range from short to long
        across multiple assets -- SAC provides smooth, well-calibrated policies that avoid
        the brittleness of purely deterministic strategies.
      </p>

      <DefinitionBlock
        title="Soft Actor-Critic (SAC)"
        label="Definition 14.7"
        definition="SAC maximizes the maximum entropy objective: J(π) = Σ E[R(s,a) + α·H(π(·|s))], where α is the temperature parameter controlling the trade-off between reward maximization and entropy (exploration). SAC is off-policy, using a replay buffer and twin Q-networks for stable learning."
        notation="α is the temperature, H is entropy, Q_ψ are twin critics, π_θ is the actor."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Maximum Entropy Objective
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        SAC maximizes the entropy-augmented return:
      </p>

      <BlockMath math="J(\pi) = \sum_{t=0}^{T} \mathbb{E}_{(s_t, a_t) \sim \rho_\pi}\left[r(s_t, a_t) + \alpha \mathcal{H}(\pi(\cdot|s_t))\right]" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The soft value function satisfies:
      </p>

      <BlockMath math="V(s) = \mathbb{E}_{a \sim \pi}\left[Q(s, a) - \alpha \log \pi(a|s)\right]" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        And the soft Q-function follows the soft Bellman equation:
      </p>

      <BlockMath math="Q(s, a) = r(s, a) + \gamma \mathbb{E}_{s' \sim P}\left[V(s')\right]" />

      <TheoremBlock
        title="Soft Policy Improvement"
        label="Theorem 14.6"
        statement="For the maximum entropy objective, the optimal policy π* satisfies: π*(a|s) ∝ exp(Q*(s,a)/α). The soft policy improvement step, which projects this distribution onto the parametric policy class, monotonically improves the soft Q-function for all (s,a)."
        proof="Define the improved policy π_new(·|s) = argmin_π D_KL(π(·|s) || exp(Q^π_old(s,·)/α) / Z). By the KL divergence inequality, for all s: E_{a~π_new}[Q^π_old(s,a) - α log π_new(a|s)] ≥ E_{a~π_old}[Q^π_old(s,a) - α log π_old(a|s)] = V^π_old(s). This implies Q^π_new(s,a) ≥ Q^π_old(s,a) for all (s,a), proving monotonic improvement."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        SAC Architecture Components
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Component</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Role</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Update</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Actor <InlineMath math="\pi_\theta" /></td>
              <td className="px-5 py-2">Outputs Gaussian policy</td>
              <td className="px-5 py-2">Minimize KL divergence</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Twin critics <InlineMath math="Q_{\psi_1}, Q_{\psi_2}" /></td>
              <td className="px-5 py-2">Estimate soft Q-values</td>
              <td className="px-5 py-2">Soft Bellman residual</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Target critics <InlineMath math="\bar{Q}" /></td>
              <td className="px-5 py-2">Stabilize training</td>
              <td className="px-5 py-2">Polyak averaging</td>
            </tr>
            <tr>
              <td className="px-5 py-2">Temperature <InlineMath math="\alpha" /></td>
              <td className="px-5 py-2">Balance return vs entropy</td>
              <td className="px-5 py-2">Auto-tuned via dual gradient</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Automatic Temperature Tuning
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        SAC can automatically learn the temperature by solving a constrained optimization:
      </p>

      <BlockMath math="\alpha^* = \arg\min_\alpha \mathbb{E}_{a \sim \pi^*}\left[-\alpha \log \pi^*(a|s) - \alpha \bar{\mathcal{H}}\right]" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\bar{\mathcal{H}}" /> is the target entropy, typically set to{' '}
        <InlineMath math="-\dim(\mathcal{A})" /> for continuous action spaces.
      </p>

      <InteractiveSAC />

      <PythonCode
        title="sac_trading.py"
        runnable
        code={`import numpy as np
from collections import deque

class ReplayBuffer:
    """Experience replay buffer for off-policy learning."""
    def __init__(self, capacity=100_000):
        self.buffer = deque(maxlen=capacity)

    def push(self, state, action, reward, next_state, done):
        self.buffer.append((state, action, reward, next_state, done))

    def sample(self, batch_size):
        indices = np.random.choice(len(self.buffer), batch_size, replace=False)
        batch = [self.buffer[i] for i in indices]
        states = np.array([b[0] for b in batch])
        actions = np.array([b[1] for b in batch])
        rewards = np.array([b[2] for b in batch])
        next_states = np.array([b[3] for b in batch])
        dones = np.array([b[4] for b in batch])
        return states, actions, rewards, next_states, dones

    def __len__(self):
        return len(self.buffer)


class SACTrader:
    """
    Soft Actor-Critic for continuous portfolio allocation.
    Trades a basket of NSE stocks with entropy-regularized exploration.
    """
    def __init__(self, obs_dim=30, act_dim=5, alpha=0.2,
                 gamma=0.99, tau=0.005, lr=3e-4):
        self.obs_dim = obs_dim
        self.act_dim = act_dim
        self.alpha = alpha
        self.gamma = gamma
        self.tau = tau
        self.lr = lr

        np.random.seed(42)
        # Actor (outputs mean and log_std of Gaussian)
        self.actor_mean_w = np.random.randn(obs_dim, act_dim) * 0.01
        self.actor_logstd_w = np.random.randn(obs_dim, act_dim) * 0.01

        # Twin critics
        self.q1_w = np.random.randn(obs_dim + act_dim, 1) * 0.01
        self.q2_w = np.random.randn(obs_dim + act_dim, 1) * 0.01

        # Target critics
        self.q1_target_w = self.q1_w.copy()
        self.q2_target_w = self.q2_w.copy()

        # Auto temperature
        self.log_alpha = np.log(alpha)
        self.target_entropy = -act_dim

        self.buffer = ReplayBuffer(capacity=100_000)

    def get_action(self, obs, deterministic=False):
        """Sample action from squashed Gaussian policy."""
        mean = obs @ self.actor_mean_w
        log_std = np.clip(obs @ self.actor_logstd_w, -5, 2)
        std = np.exp(log_std)

        if deterministic:
            action = np.tanh(mean)
        else:
            noise = np.random.randn(*mean.shape)
            pre_tanh = mean + std * noise
            action = np.tanh(pre_tanh)

        # Log probability (with tanh squashing correction)
        log_prob = -0.5 * np.sum(noise**2 + 2*log_std + np.log(2*np.pi))
        log_prob -= np.sum(np.log(1 - action**2 + 1e-6))

        return action, log_prob

    def get_q_values(self, obs, action):
        """Compute twin Q-values."""
        sa = np.concatenate([obs, action])
        q1 = float(sa @ self.q1_w)
        q2 = float(sa @ self.q2_w)
        return q1, q2

    def soft_update_targets(self):
        """Polyak averaging for target networks."""
        self.q1_target_w = self.tau * self.q1_w + (1 - self.tau) * self.q1_target_w
        self.q2_target_w = self.tau * self.q2_w + (1 - self.tau) * self.q2_target_w

    def compute_losses(self, batch):
        """Compute SAC losses (simplified)."""
        states, actions, rewards, next_states, dones = batch
        batch_size = len(states)

        # Critic loss
        q1_losses = []
        q2_losses = []
        actor_losses = []

        for i in range(batch_size):
            # Next action from current policy
            next_action, next_log_prob = self.get_action(next_states[i])

            # Target Q-value
            sa_next = np.concatenate([next_states[i], next_action])
            target_q1 = float(sa_next @ self.q1_target_w)
            target_q2 = float(sa_next @ self.q2_target_w)
            target_q = min(target_q1, target_q2) - self.alpha * next_log_prob
            target = rewards[i] + self.gamma * (1 - dones[i]) * target_q

            # Current Q-values
            q1, q2 = self.get_q_values(states[i], actions[i])
            q1_losses.append((q1 - target)**2)
            q2_losses.append((q2 - target)**2)

            # Actor loss
            new_action, log_prob = self.get_action(states[i])
            sa_new = np.concatenate([states[i], new_action])
            q_new = min(float(sa_new @ self.q1_w), float(sa_new @ self.q2_w))
            actor_losses.append(self.alpha * log_prob - q_new)

        return {
            'q1_loss': np.mean(q1_losses),
            'q2_loss': np.mean(q2_losses),
            'actor_loss': np.mean(actor_losses),
            'alpha': self.alpha
        }


# Demo: SAC for NSE portfolio trading
np.random.seed(42)
assets = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK']
n_assets = len(assets)
obs_dim = 20

agent = SACTrader(obs_dim=obs_dim, act_dim=n_assets, alpha=0.2)

# Simulate trading
n_days = 200
mu = np.array([0.0005, 0.0004, 0.0003, 0.0006, 0.0004])
cov = np.eye(n_assets) * 0.0003 + 0.00005
returns_data = np.random.multivariate_normal(mu, cov, n_days)

portfolio_value = 10_00_000  # INR 10 lakhs
print(f"SAC Entropy-Regularized Trading")
print(f"Assets: {', '.join(assets)}")
print(f"Temperature (alpha): {agent.alpha}")
print(f"Target entropy: {agent.target_entropy}")
print(f"{'='*65}")

for day in range(n_days):
    obs = np.random.randn(obs_dim).astype(np.float32)
    action, log_prob = agent.get_action(obs)

    # Convert to portfolio weights (normalize)
    weights = (action + 1) / 2  # [0, 1]
    weights = weights / (weights.sum() + 1e-8)

    # Portfolio return
    port_return = np.dot(weights, returns_data[day])
    reward = np.log(1 + port_return) * 100

    prev_value = portfolio_value
    portfolio_value *= (1 + port_return)

    # Store in replay buffer
    next_obs = np.random.randn(obs_dim).astype(np.float32)
    agent.buffer.push(obs, action, reward, next_obs, day == n_days - 1)

    if day % 40 == 39:
        # Sample batch and compute losses
        if len(agent.buffer) >= 64:
            batch = agent.buffer.sample(min(64, len(agent.buffer)))
            losses = agent.compute_losses(batch)
            agent.soft_update_targets()

            print(f"Day {day+1:3d} | Value: INR {portfolio_value:>12,.0f} | "
                  f"Q1 Loss: {losses['q1_loss']:.4f} | "
                  f"Actor Loss: {losses['actor_loss']:.4f} | "
                  f"Alpha: {losses['alpha']:.3f}")

total_return = (portfolio_value / 10_00_000 - 1) * 100
print(f"\\nFinal portfolio: INR {portfolio_value:,.0f}")
print(f"Total return: {total_return:.2f}%")
print(f"Buffer size: {len(agent.buffer)} transitions")`}
      />

      <ExampleBlock
        title="SAC Temperature Selection for Indian Markets"
        difficulty="advanced"
        problem="An SAC agent trades 5 Nifty stocks with continuous portfolio weights in [-1, 1] (allowing short positions). The target entropy is -dim(A) = -5. How does the temperature α affect trading behavior?"
        solution={[
          {
            step: 'High temperature (α = 1.0)',
            formula: '\\pi^*(a|s) \\propto \\exp(Q(s,a) / 1.0)',
            explanation: 'High α produces near-uniform portfolio weights, maximizing exploration. The agent diversifies across all 5 stocks equally, which may be suitable during uncertain market regimes on NSE.',
          },
          {
            step: 'Low temperature (α = 0.01)',
            formula: '\\pi^*(a|s) \\propto \\exp(Q(s,a) / 0.01) \\approx \\text{greedy}',
            explanation: 'Low α produces concentrated positions in the highest-Q stock. This is aggressive and may lead to excessive concentration risk.',
          },
          {
            step: 'Optimal auto-tuned temperature',
            formula: '\\alpha^* : \\mathbb{E}[-\\log\\pi(a|s)] = -5',
            explanation: 'Auto-tuning finds the α that maintains target entropy -5, balancing exploration and exploitation adaptively as market conditions change.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          SAC is ideal for continuous portfolio allocation on Indian markets because: (1) the
          entropy regularization naturally encourages diversification across NSE stocks,
          (2) off-policy learning with replay buffers makes efficient use of limited market
          data, (3) automatic temperature tuning adapts exploration to market conditions,
          and (4) twin critics with clipped Q-values prevent overestimation that could
          lead to reckless trading. Always validate SAC policies with realistic NSE
          transaction costs (STT, brokerage) before deployment.
        </p>
      </NoteBlock>
    </div>
  )
}
