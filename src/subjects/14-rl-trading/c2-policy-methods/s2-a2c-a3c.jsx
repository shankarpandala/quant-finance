import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveA2C() {
  const [nWorkers, setNWorkers] = useState(4)
  const [entropyCoeff, setEntropyCoeff] = useState(0.01)
  const [valueLossCoeff, setValueLossCoeff] = useState(0.5)
  const [nSteps, setNSteps] = useState(5)
  const [workerReturns, setWorkerReturns] = useState(
    Array(8).fill(null).map(() => (Math.random() * 20 - 5).toFixed(2))
  )

  const activeReturns = workerReturns.slice(0, nWorkers).map(Number)
  const avgReturn = activeReturns.reduce((a, b) => a + b, 0) / nWorkers
  const variance = activeReturns.reduce((a, r) => a + (r - avgReturn) ** 2, 0) / nWorkers

  const refreshReturns = () => {
    setWorkerReturns(Array(8).fill(null).map(() => (Math.random() * 20 - 5).toFixed(2)))
  }

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: A2C/A3C Worker Visualization
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Visualize how multiple workers explore different market scenarios simultaneously.
        Each worker trades a different NSE stock from the Nifty basket.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Workers: {nWorkers}</span>
          <input type="range" min="1" max="8" step="1" value={nWorkers}
            onChange={e => setNWorkers(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Entropy coeff: {entropyCoeff.toFixed(3)}</span>
          <input type="range" min="0" max="0.05" step="0.005" value={entropyCoeff}
            onChange={e => setEntropyCoeff(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-green-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Value loss coeff: {valueLossCoeff.toFixed(2)}</span>
          <input type="range" min="0.1" max="1.0" step="0.1" value={valueLossCoeff}
            onChange={e => setValueLossCoeff(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-amber-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>n-steps: {nSteps}</span>
          <input type="range" min="1" max="20" step="1" value={nSteps}
            onChange={e => setNSteps(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-red-500" />
        </label>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {Array(nWorkers).fill(null).map((_, i) => {
          const names = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK', 'KOTAKBANK', 'LT', 'WIPRO']
          const ret = activeReturns[i]
          return (
            <div key={i} className={`rounded-lg p-3 text-center ${ret >= 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
              <div className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                Worker {i + 1}: {names[i]}
              </div>
              <div className={`text-lg font-bold ${ret >= 0 ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                {ret >= 0 ? '+' : ''}{ret.toFixed(2)}%
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Avg return: <span className="font-bold">{avgReturn.toFixed(2)}%</span> |
          Variance: <span className="font-bold">{variance.toFixed(2)}</span> |
          Gradient variance reduction: <span className="font-bold text-green-600">~{(1 / Math.sqrt(nWorkers) * 100).toFixed(0)}%</span>
        </div>
        <button onClick={refreshReturns}
          className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700">
          Resample
        </button>
      </div>
    </div>
  )
}

export default function A2CA3C() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        A2C and A3C for Multi-Asset Indian Trading
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Advantage Actor-Critic (A2C) and its asynchronous variant (A3C) are foundational
        actor-critic methods that learn both a policy (actor) and a value function (critic)
        simultaneously. For multi-asset trading on Indian exchanges, these methods excel by
        using parallel workers to explore diverse market scenarios across different NSE stocks.
      </p>

      <DefinitionBlock
        title="Advantage Actor-Critic (A2C)"
        label="Definition 14.6"
        definition="A2C is a synchronous actor-critic method that uses n parallel environment workers to collect experience simultaneously. The advantage function A(s,a) = Q(s,a) - V(s) measures how much better action a is compared to the average action in state s. A2C updates the policy and value function using the mean gradient across all workers."
        notation="π_θ(a|s) is the actor (policy), V_φ(s) is the critic (value function), A(s,a) is the advantage."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        A2C Loss Function
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The A2C loss combines three components: policy loss, value loss, and entropy bonus:
      </p>

      <BlockMath math="L = L_{\text{policy}} + c_v \cdot L_{\text{value}} - c_e \cdot H[\pi_\theta]" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The policy gradient uses the advantage to reduce variance:
      </p>

      <BlockMath math="L_{\text{policy}} = -\mathbb{E}\left[\log \pi_\theta(a_t | s_t) \cdot \hat{A}_t\right]" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The value function is trained with MSE loss:
      </p>

      <BlockMath math="L_{\text{value}} = \mathbb{E}\left[(V_\phi(s_t) - G_t)^2\right]" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The entropy bonus encourages exploration, crucial in financial markets:
      </p>

      <BlockMath math="H[\pi_\theta] = -\sum_a \pi_\theta(a|s) \log \pi_\theta(a|s)" />

      <TheoremBlock
        title="Variance Reduction via Advantage"
        label="Theorem 14.5"
        statement="Using the advantage function A(s,a) = Q(s,a) - V(s) as the policy gradient weighting reduces the variance of gradient estimates compared to using returns G_t, without introducing bias: Var[∇ log π · A] ≤ Var[∇ log π · G_t]."
        proof="The baseline V(s) is independent of the action a, so subtracting it does not change the expected gradient: E[∇log π(a|s) · A(s,a)] = E[∇log π(a|s) · Q(s,a)] - E[∇log π(a|s)] · V(s) = E[∇log π(a|s) · Q(s,a)] since E[∇log π(a|s)] = 0. However, the variance decreases because we center the signal: Var[X - c] = Var[X] + c² - 2cE[X], which is minimized when c = E[X], approximated by V(s)."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        A3C: Asynchronous Advantage Actor-Critic
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A3C extends A2C with <strong>asynchronous</strong> gradient updates. Each worker independently
        interacts with its own copy of the trading environment (potentially different NSE stocks
        or time periods) and asynchronously updates the shared parameters:
      </p>

      <BlockMath math="\theta_{\text{global}} \leftarrow \theta_{\text{global}} + \alpha \sum_{i=1}^{N} \nabla_\theta L_i(\theta_i)" />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Feature</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">A2C (Synchronous)</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">A3C (Asynchronous)</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Update style</td>
              <td className="px-5 py-2">Batch, synchronized</td>
              <td className="px-5 py-2">Lock-free, async</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">GPU utilization</td>
              <td className="px-5 py-2">Efficient (batched)</td>
              <td className="px-5 py-2">Less efficient</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Exploration</td>
              <td className="px-5 py-2">Via entropy bonus</td>
              <td className="px-5 py-2">Via diverse workers</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Stability</td>
              <td className="px-5 py-2">More stable</td>
              <td className="px-5 py-2">Can be unstable</td>
            </tr>
            <tr>
              <td className="px-5 py-2">Best for</td>
              <td className="px-5 py-2">GPU training</td>
              <td className="px-5 py-2">CPU-only, multi-core</td>
            </tr>
          </tbody>
        </table>
      </div>

      <NoteBlock title="A2C vs A3C in Practice" type="info">
        <p>
          In modern practice, A2C (synchronous) is preferred over A3C because it is simpler,
          more reproducible, and better utilizes GPU batching. A2C with multiple vectorized
          environments achieves similar exploration benefits as A3C without the complexity
          of asynchronous gradient updates. For NSE trading, use A2C with each worker trading
          a different stock or time period from the Nifty 50 universe.
        </p>
      </NoteBlock>

      <InteractiveA2C />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Multi-Asset A2C for Indian Markets
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For multi-asset trading, each worker can specialize in different market segments:
      </p>

      <BlockMath math="\text{Worker}_i : \text{env}_i \sim \{\text{Nifty IT}, \text{Nifty Bank}, \text{Nifty Pharma}, \text{Nifty FMCG}, \ldots\}" />

      <PythonCode
        title="a2c_multi_asset.py"
        runnable
        code={`import numpy as np
from typing import List, Tuple

class ActorCriticNetwork:
    """Simple actor-critic for multi-asset Indian trading."""
    def __init__(self, obs_dim: int, n_actions: int, hidden: int = 64):
        self.obs_dim = obs_dim
        self.n_actions = n_actions
        np.random.seed(42)

        # Actor weights
        self.W_actor1 = np.random.randn(obs_dim, hidden) * 0.1
        self.W_actor2 = np.random.randn(hidden, n_actions) * 0.1

        # Critic weights
        self.W_critic1 = np.random.randn(obs_dim, hidden) * 0.1
        self.W_critic2 = np.random.randn(hidden, 1) * 0.1

    def forward(self, obs: np.ndarray) -> Tuple[np.ndarray, float]:
        """Compute policy logits and value."""
        # Actor
        h_a = np.tanh(obs @ self.W_actor1)
        logits = h_a @ self.W_actor2
        probs = np.exp(logits - logits.max())
        probs = probs / probs.sum()

        # Critic
        h_c = np.tanh(obs @ self.W_critic1)
        value = float(h_c @ self.W_critic2)

        return probs, value


class A2CTrader:
    """
    A2C agent for multi-asset Indian market trading.
    Uses vectorized environments for parallel data collection.
    """
    def __init__(self, n_workers: int = 4, n_assets: int = 5,
                 obs_dim: int = 30, n_steps: int = 5,
                 gamma: float = 0.99, entropy_coeff: float = 0.01,
                 value_coeff: float = 0.5, lr: float = 7e-4):
        self.n_workers = n_workers
        self.n_assets = n_assets
        self.n_steps = n_steps
        self.gamma = gamma
        self.entropy_coeff = entropy_coeff
        self.value_coeff = value_coeff
        self.lr = lr

        self.network = ActorCriticNetwork(obs_dim, 3)  # buy/hold/sell

    def collect_rollouts(self, prices_batch: np.ndarray,
                          step_idx: int) -> dict:
        """Collect n-step rollouts from all workers."""
        obs_dim = self.network.obs_dim
        rollout = {
            'obs': [], 'actions': [], 'rewards': [],
            'values': [], 'log_probs': []
        }

        for w in range(self.n_workers):
            for t in range(self.n_steps):
                obs = np.random.randn(obs_dim).astype(np.float32)
                probs, value = self.network.forward(obs)
                action = np.random.choice(3, p=probs)

                idx = min(step_idx + t, len(prices_batch[w]) - 2)
                ret = (prices_batch[w][idx+1] - prices_batch[w][idx]) / prices_batch[w][idx]

                if action == 2:  # Buy
                    reward = ret * 10
                elif action == 0:  # Sell
                    reward = -ret * 10
                else:
                    reward = 0.0

                rollout['obs'].append(obs)
                rollout['actions'].append(action)
                rollout['rewards'].append(reward)
                rollout['values'].append(value)
                rollout['log_probs'].append(np.log(probs[action] + 1e-8))

        return {k: np.array(v) for k, v in rollout.items()}

    def compute_advantages(self, rewards, values, last_value=0):
        """Compute n-step returns and advantages."""
        n = len(rewards)
        returns = np.zeros(n)
        advantages = np.zeros(n)

        R = last_value
        for t in reversed(range(n)):
            R = rewards[t] + self.gamma * R
            returns[t] = R
            advantages[t] = R - values[t]

        # Normalize
        if advantages.std() > 1e-8:
            advantages = (advantages - advantages.mean()) / (advantages.std() + 1e-8)

        return returns, advantages

    def compute_losses(self, rollout, advantages, returns):
        """Compute A2C losses."""
        log_probs = rollout['log_probs']
        values = rollout['values']

        # Policy loss
        policy_loss = -(log_probs * advantages).mean()

        # Value loss
        value_loss = ((values - returns) ** 2).mean()

        # Entropy (approximate)
        entropy = -(np.exp(log_probs) * log_probs).mean()

        total_loss = (policy_loss
                     + self.value_coeff * value_loss
                     - self.entropy_coeff * entropy)

        return {
            'total': total_loss,
            'policy': policy_loss,
            'value': value_loss,
            'entropy': entropy
        }


# Demo: A2C for Nifty sectoral trading
np.random.seed(42)
nifty_sectors = ['Nifty Bank', 'Nifty IT', 'Nifty Pharma', 'Nifty Auto']
n_workers = len(nifty_sectors)
n_days = 252

# Generate sectoral prices
sector_prices = []
for i, sector in enumerate(nifty_sectors):
    base = [20000, 35000, 15000, 18000][i]
    drift = [0.0004, 0.0006, 0.0003, 0.0005][i]
    vol = [0.015, 0.02, 0.012, 0.018][i]
    returns = np.random.normal(drift, vol, n_days)
    prices = base * np.cumprod(1 + returns)
    sector_prices.append(prices)

sector_prices = np.array(sector_prices)

# Train A2C
agent = A2CTrader(n_workers=n_workers, n_steps=5,
                   entropy_coeff=0.01, value_coeff=0.5)

print(f"A2C Multi-Asset Trading (NSE Sectoral)")
print(f"Workers: {n_workers} ({', '.join(nifty_sectors)})")
print(f"n-steps: {agent.n_steps}, gamma: {agent.gamma}")
print(f"Entropy coeff: {agent.entropy_coeff}")
print(f"{'='*60}")

total_episodes = 0
for epoch in range(10):
    step_idx = epoch * 20
    rollout = agent.collect_rollouts(sector_prices, step_idx)

    returns, advantages = agent.compute_advantages(
        rollout['rewards'], rollout['values']
    )

    losses = agent.compute_losses(rollout, advantages, returns)
    total_episodes += n_workers * agent.n_steps

    print(f"Epoch {epoch+1:2d} | Loss: {losses['total']:>8.4f} | "
          f"Policy: {losses['policy']:>7.4f} | Value: {losses['value']:>7.4f} | "
          f"Entropy: {losses['entropy']:>6.4f}")

print(f"\\nTotal transitions: {total_episodes}")
print(f"Gradient variance reduction: ~{1/np.sqrt(n_workers):.2f}x")`}
      />

      <ExampleBlock
        title="A2C Worker Design for Indian Markets"
        difficulty="intermediate"
        problem="Design a 4-worker A2C setup for Indian market trading. Each worker should explore a different market regime. Specify the observation space, action space, and how workers contribute to gradient diversity."
        solution={[
          {
            step: 'Assign workers to different stocks/sectors',
            formula: '\\text{Workers} = \\{\\text{RELIANCE}, \\text{TCS}, \\text{HDFCBANK}, \\text{SBIN}\\}',
            explanation: 'Each worker trades a different Nifty stock, ensuring diverse exploration of market dynamics (energy, IT, private banking, PSU banking).',
          },
          {
            step: 'Define shared observation space',
            formula: 's \\in \\mathbb{R}^{30 \\times 6} \\quad (\\text{30-day window} \\times \\text{6 features})',
            explanation: 'All workers share the same observation structure with normalized features (returns, volume ratio, RSI, MACD, position, unrealized PnL).',
          },
          {
            step: 'Compute mean gradient across workers',
            formula: 'g = \\frac{1}{N}\\sum_{i=1}^{4} \\nabla_\\theta L_i',
            explanation: 'Synchronous averaging of gradients from all 4 workers reduces variance by a factor of 1/√4 = 0.5 compared to single-worker training.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          A2C/A3C methods provide natural parallelism for exploring diverse market scenarios.
          For Indian market trading, use A2C (synchronous) with vectorized environments where
          each worker trades a different Nifty constituent or sector. The entropy bonus is
          crucial -- set it to 0.01-0.02 to prevent premature convergence to a deterministic
          policy. A2C serves as a strong baseline before moving to more complex algorithms
          like PPO or SAC.
        </p>
      </NoteBlock>
    </div>
  )
}
