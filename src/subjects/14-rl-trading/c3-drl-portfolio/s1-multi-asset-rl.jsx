import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractivePortfolio() {
  const [weights, setWeights] = useState([0.25, 0.20, 0.20, 0.15, 0.10, 0.10])
  const assets = ['RELIANCE', 'TCS', 'HDFCBANK', 'GOI 10Y', 'GOLD ETF', 'CASH']
  const returns = [0.15, 0.18, 0.12, 0.07, 0.08, 0.065]
  const volatilities = [0.28, 0.25, 0.22, 0.05, 0.12, 0.0]
  const assetTypes = ['equity', 'equity', 'equity', 'bond', 'commodity', 'cash']

  const portfolioReturn = weights.reduce((sum, w, i) => sum + w * returns[i], 0)
  const portfolioVol = Math.sqrt(
    weights.reduce((sum, w, i) => sum + (w * volatilities[i]) ** 2, 0)
  )
  const sharpe = portfolioVol > 0 ? (portfolioReturn - 0.065) / portfolioVol : 0

  const equityWeight = weights.slice(0, 3).reduce((a, b) => a + b, 0)
  const bondWeight = weights[3]
  const altWeight = weights[4]
  const cashWeight = weights[5]

  const updateWeight = (idx, val) => {
    const newWeights = [...weights]
    newWeights[idx] = val
    const total = newWeights.reduce((a, b) => a + b, 0)
    if (total > 0) {
      const normalized = newWeights.map(w => w / total)
      setWeights(normalized)
    }
  }

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Multi-Asset Portfolio Allocator
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust weights across Indian equities, bonds, gold, and cash. Weights auto-normalize.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {assets.map((asset, i) => (
          <label key={i} className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
            <span className={`font-semibold ${
              assetTypes[i] === 'equity' ? 'text-blue-600 dark:text-blue-400' :
              assetTypes[i] === 'bond' ? 'text-green-600 dark:text-green-400' :
              assetTypes[i] === 'commodity' ? 'text-amber-600 dark:text-amber-400' :
              'text-gray-600 dark:text-gray-400'
            }`}>
              {asset}: {(weights[i] * 100).toFixed(1)}%
            </span>
            <input type="range" min="0" max="1" step="0.01" value={weights[i]}
              onChange={e => updateWeight(i, parseFloat(e.target.value))}
              className="h-2 w-full cursor-pointer accent-indigo-500" />
          </label>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg bg-blue-50 p-3 text-center dark:bg-blue-900/30">
          <div className="text-xs text-blue-600 dark:text-blue-400">Expected Return</div>
          <div className="text-lg font-bold text-blue-800 dark:text-blue-200">
            {(portfolioReturn * 100).toFixed(1)}%
          </div>
        </div>
        <div className="rounded-lg bg-red-50 p-3 text-center dark:bg-red-900/30">
          <div className="text-xs text-red-600 dark:text-red-400">Volatility</div>
          <div className="text-lg font-bold text-red-800 dark:text-red-200">
            {(portfolioVol * 100).toFixed(1)}%
          </div>
        </div>
        <div className="rounded-lg bg-green-50 p-3 text-center dark:bg-green-900/30">
          <div className="text-xs text-green-600 dark:text-green-400">Sharpe Ratio</div>
          <div className="text-lg font-bold text-green-800 dark:text-green-200">
            {sharpe.toFixed(2)}
          </div>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 text-center dark:bg-purple-900/30">
          <div className="text-xs text-purple-600 dark:text-purple-400">Equity/Bond/Alt</div>
          <div className="text-sm font-bold text-purple-800 dark:text-purple-200">
            {(equityWeight * 100).toFixed(0)}/{(bondWeight * 100).toFixed(0)}/{(altWeight * 100).toFixed(0)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MultiAssetRL() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Multi-Asset RL with Indian Stocks and Bonds
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Real-world portfolio management involves allocating capital across multiple asset
        classes -- equities, government bonds, corporate bonds, gold, and cash equivalents.
        An RL agent managing an Indian portfolio must navigate the interplay between NSE
        equities, government securities (G-Secs), gold ETFs, and RBI repo-rate-linked
        instruments while respecting regulatory constraints.
      </p>

      <DefinitionBlock
        title="Multi-Asset Portfolio MDP"
        label="Definition 14.8"
        definition="A multi-asset portfolio MDP extends the single-asset framework to N assets with portfolio weight vector w_t ∈ ℝ^N subject to constraints. The state includes price histories for all assets, the current allocation, and macro indicators. The action is the target portfolio weight vector."
        notation="w_t = [w_1^t, w_2^t, ..., w_N^t] where Σw_i = 1 and w_i ≥ 0 (long-only) or w_i ∈ [-1,1] (long-short)."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Indian Multi-Asset Universe
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A comprehensive Indian multi-asset portfolio includes:
      </p>

      <BlockMath math="\mathcal{U} = \underbrace{\{N_{50}, N_{\text{Bank}}, N_{\text{IT}}, \ldots\}}_{\text{Nifty indices/ETFs}} \cup \underbrace{\{G_5, G_{10}, G_{30}\}}_{\text{GOI bonds}} \cup \underbrace{\{Au, Ag\}}_{\text{metals}} \cup \underbrace{\{T_{\text{bill}}\}}_{\text{cash}}" />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Asset Class</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Indian Instruments</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Avg Return</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Volatility</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Large Cap Equity</td>
              <td className="px-4 py-2">Nifty 50 ETF</td>
              <td className="px-4 py-2">~12-15%</td>
              <td className="px-4 py-2">~18-22%</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Mid Cap Equity</td>
              <td className="px-4 py-2">Nifty Midcap 150</td>
              <td className="px-4 py-2">~15-18%</td>
              <td className="px-4 py-2">~22-28%</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Government Bonds</td>
              <td className="px-4 py-2">GOI 10Y G-Sec</td>
              <td className="px-4 py-2">~6-8%</td>
              <td className="px-4 py-2">~4-6%</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Gold</td>
              <td className="px-4 py-2">SGB / Gold ETF</td>
              <td className="px-4 py-2">~8-10%</td>
              <td className="px-4 py-2">~12-15%</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Cash</td>
              <td className="px-4 py-2">Liquid funds / T-bills</td>
              <td className="px-4 py-2">~5-7%</td>
              <td className="px-4 py-2">~0.5%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Portfolio Return with Transaction Costs
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The portfolio return after rebalancing from <InlineMath math="w_{t-1}" /> to <InlineMath math="w_t" />:
      </p>

      <BlockMath math="R_t^p = \sum_{i=1}^N w_i^t \cdot r_i^t - \underbrace{c \cdot \|w_t - \hat{w}_{t-1}\|_1}_{\text{turnover cost}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\hat{w}_{t-1}" /> is the drift-adjusted weight before rebalancing:
      </p>

      <BlockMath math="\hat{w}_{i,t-1} = \frac{w_{i,t-1}(1 + r_i^t)}{\sum_j w_{j,t-1}(1 + r_j^t)}" />

      <TheoremBlock
        title="RL vs Mean-Variance in Multi-Asset Allocation"
        label="Theorem 14.7"
        statement="An RL agent with sufficient state information and training time can learn policies that dominate static mean-variance optimal allocations in non-stationary environments, because RL policies are adaptive to regime changes while MVO weights are fixed."
        proof="In a non-stationary environment with K regimes, the MVO solution optimizes for the average covariance matrix Σ̄ = (1/K)ΣΣ_k. An RL agent with regime-discriminating state features can learn conditional policies π*(a|s,k) that approximate the regime-specific MVO solution for each k. Since the conditional optimum dominates the unconditional average: max_w w'μ_k - λw'Σ_kw ≥ max_w w'μ̄ - λw'Σ̄w for each k, the RL agent achieves higher risk-adjusted returns."
      />

      <InteractivePortfolio />

      <PythonCode
        title="multi_asset_rl.py"
        runnable
        code={`import numpy as np

class MultiAssetEnv:
    """
    Multi-asset RL environment for Indian markets.
    Trades equities, bonds, gold, and cash.
    """
    def __init__(self, returns_data, asset_names, initial_capital=50_00_000,
                 transaction_cost=0.002, window=20):
        self.returns_data = returns_data
        self.asset_names = asset_names
        self.n_assets = len(asset_names)
        self.initial_capital = initial_capital
        self.tc = transaction_cost
        self.window = window
        self.reset()

    def reset(self):
        self.step_idx = self.window
        self.weights = np.ones(self.n_assets) / self.n_assets
        self.portfolio_value = self.initial_capital
        self.peak = self.initial_capital
        return self._get_obs()

    def _get_obs(self):
        """Get observation: windowed returns + current weights."""
        idx = self.step_idx
        ret_window = self.returns_data[idx-self.window:idx]
        # Flatten and append weights
        obs = np.concatenate([ret_window.flatten(), self.weights])
        return obs.astype(np.float32)

    def step(self, target_weights):
        """Rebalance to target weights and step forward."""
        # Normalize weights to sum to 1
        target_weights = np.clip(target_weights, 0, 1)
        target_weights = target_weights / (target_weights.sum() + 1e-8)

        # Compute turnover cost
        drift_weights = self.weights * (1 + self.returns_data[self.step_idx])
        drift_weights = drift_weights / (drift_weights.sum() + 1e-8)
        turnover = np.sum(np.abs(target_weights - drift_weights))
        tc_cost = self.tc * turnover

        # Update weights
        self.weights = target_weights

        # Portfolio return
        port_return = np.dot(self.weights, self.returns_data[self.step_idx]) - tc_cost
        self.portfolio_value *= (1 + port_return)
        self.peak = max(self.peak, self.portfolio_value)

        # Advance
        self.step_idx += 1
        done = self.step_idx >= len(self.returns_data) - 1

        # Reward: log return with drawdown penalty
        reward = np.log(1 + port_return)
        drawdown = (self.peak - self.portfolio_value) / self.peak
        if drawdown > 0.1:
            reward -= 0.5 * (drawdown - 0.1)

        obs = self._get_obs()
        info = {
            'portfolio_value': self.portfolio_value,
            'weights': self.weights.copy(),
            'turnover': turnover,
            'drawdown': drawdown
        }
        return obs, reward, done, info


class RLPortfolioAgent:
    """Simple policy gradient agent for multi-asset allocation."""
    def __init__(self, obs_dim, n_assets, lr=1e-3):
        np.random.seed(42)
        self.W = np.random.randn(obs_dim, n_assets) * 0.01
        self.lr = lr

    def act(self, obs, explore=True):
        logits = obs @ self.W
        # Softmax for portfolio weights
        exp_logits = np.exp(logits - logits.max())
        weights = exp_logits / exp_logits.sum()

        if explore:
            noise = np.random.dirichlet(np.ones(len(weights)) * 20)
            weights = 0.9 * weights + 0.1 * noise

        return weights


# Setup Indian multi-asset universe
np.random.seed(42)
n_days = 500
asset_names = ['Nifty50', 'NiftyBank', 'GOI_10Y', 'GoldETF', 'LiquidFund']
n_assets = len(asset_names)

# Generate correlated returns
means = np.array([0.0005, 0.0006, 0.00025, 0.00035, 0.00022])
vols = np.array([0.015, 0.018, 0.004, 0.010, 0.001])
corr = np.array([
    [1.0, 0.85, -0.2, -0.1, 0.0],
    [0.85, 1.0, -0.15, -0.05, 0.0],
    [-0.2, -0.15, 1.0, 0.3, 0.5],
    [-0.1, -0.05, 0.3, 1.0, 0.1],
    [0.0, 0.0, 0.5, 0.1, 1.0]
])
cov = np.outer(vols, vols) * corr
returns_data = np.random.multivariate_normal(means, cov, n_days)

# Create environment
env = MultiAssetEnv(returns_data, asset_names, initial_capital=50_00_000)
obs = env.reset()

obs_dim = len(obs)
agent = RLPortfolioAgent(obs_dim, n_assets)

# Training loop
print(f"Multi-Asset RL Portfolio (Indian Markets)")
print(f"Assets: {', '.join(asset_names)}")
print(f"Initial: INR {env.initial_capital:,.0f}")
print(f"{'='*70}")

total_reward = 0
for day in range(min(200, n_days - env.window - 1)):
    weights = agent.act(obs, explore=True)
    obs, reward, done, info = env.step(weights)
    total_reward += reward

    if day % 40 == 39:
        w_str = ' | '.join(f"{n}:{w:.1%}" for n, w in zip(asset_names, info['weights']))
        print(f"Day {day+1:3d} | INR {info['portfolio_value']:>12,.0f} | "
              f"DD: {info['drawdown']:.1%} | {w_str}")

    if done:
        break

# Compare with equal-weight benchmark
eq_returns = returns_data[env.window:env.window+200].mean(axis=1)
eq_portfolio = 50_00_000 * np.cumprod(1 + eq_returns)

print(f"\\n{'='*70}")
print(f"RL Portfolio:  INR {info['portfolio_value']:>12,.0f} ({(info['portfolio_value']/50_00_000-1)*100:+.1f}%)")
print(f"Equal Weight:  INR {eq_portfolio[-1]:>12,.0f} ({(eq_portfolio[-1]/50_00_000-1)*100:+.1f}%)")
print(f"Max Drawdown:  {info['drawdown']:.1%}")`}
      />

      <ExampleBlock
        title="Multi-Asset Allocation Constraints"
        difficulty="intermediate"
        problem="A SEBI-registered PMS (Portfolio Management Service) in India must maintain: (1) max 10% in any single stock, (2) min 20% in debt instruments, (3) max 15% in gold. Formulate these as constraints in the RL action space."
        solution={[
          {
            step: 'Single stock concentration limit',
            formula: 'w_i \\leq 0.10 \\quad \\forall i \\in \\text{equities}',
            explanation: 'SEBI PMS guidelines limit single-stock exposure. The RL agent output is clipped: w_i = min(w_i, 0.10).',
          },
          {
            step: 'Minimum debt allocation',
            formula: '\\sum_{j \\in \\text{debt}} w_j \\geq 0.20',
            explanation: 'If debt allocation falls below 20%, redistribute from overweight equity positions proportionally.',
          },
          {
            step: 'Gold exposure cap',
            formula: 'w_{\\text{gold}} \\leq 0.15',
            explanation: 'Cap gold allocation and redistribute excess to liquid funds (cash equivalent).',
          },
          {
            step: 'Implement in action post-processing',
            formula: 'w^{\\text{valid}} = \\text{project}(w^{\\text{raw}}, \\mathcal{C})',
            explanation: 'Project the raw RL output onto the feasible constraint set using iterative clipping and renormalization. This preserves the policy gradient while ensuring regulatory compliance.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Multi-asset RL for Indian portfolios must account for the distinct correlation
          structure between Indian equities (positively correlated), government bonds
          (negatively correlated with equities during risk-off), and gold (hedge against
          INR depreciation and global uncertainty). The RL agent should learn to increase
          bond/gold allocation during volatile periods and tilt toward equities during
          bull markets -- effectively learning a dynamic asset allocation strategy that
          adapts to the Indian macro cycle (RBI rate decisions, monsoon, fiscal policy).
        </p>
      </NoteBlock>
    </div>
  )
}
