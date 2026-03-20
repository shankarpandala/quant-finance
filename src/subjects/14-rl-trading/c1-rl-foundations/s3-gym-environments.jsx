import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveGymEnv() {
  const [envType, setEnvType] = useState('discrete')
  const [windowSize, setWindowSize] = useState(30)
  const [features, setFeatures] = useState(['price', 'volume', 'rsi'])
  const [rewardType, setRewardType] = useState('log_return')

  const obsShape = envType === 'discrete'
    ? `(${windowSize}, ${features.length})`
    : `(${windowSize}, ${features.length + 2})`
  const actionShape = envType === 'discrete' ? '3 (buy/hold/sell)' : 'Box([-1, 1])'

  const toggleFeature = (feat) => {
    if (features.includes(feat)) {
      if (features.length > 1) setFeatures(features.filter(f => f !== feat))
    } else {
      setFeatures([...features, feat])
    }
  }

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Gym Environment Configurator
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Configure an OpenAI Gym-compatible environment for NSE trading.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Action Space Type
          </label>
          <div className="flex gap-2">
            {['discrete', 'continuous'].map(t => (
              <button key={t} onClick={() => setEnvType(t)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                  envType === t
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                }`}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Window Size: {windowSize}
          </label>
          <input type="range" min="5" max="60" step="5" value={windowSize}
            onChange={e => setWindowSize(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
          Features (click to toggle)
        </label>
        <div className="flex flex-wrap gap-2">
          {['price', 'volume', 'rsi', 'macd', 'bb_width', 'delivery_pct', 'fii_flow'].map(feat => (
            <button key={feat} onClick={() => toggleFeature(feat)}
              className={`rounded-full px-3 py-1 text-xs ${
                features.includes(feat)
                  ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300'
                  : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500'
              }`}>
              {feat}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
          Reward Type
        </label>
        <div className="flex gap-2">
          {['log_return', 'sharpe', 'sortino', 'pnl'].map(r => (
            <button key={r} onClick={() => setRewardType(r)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                rewardType === r
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
              }`}>
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
        <h4 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Environment Summary</h4>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
          <div>Observation shape: <span className="font-mono font-bold">{obsShape}</span></div>
          <div>Action space: <span className="font-mono font-bold">{actionShape}</span></div>
          <div>Features: <span className="font-bold">{features.length}</span></div>
          <div>Reward: <span className="font-bold">{rewardType}</span></div>
          <div>Window: <span className="font-bold">{windowSize} bars</span></div>
          <div>State dim: <span className="font-bold">{windowSize * features.length}</span></div>
        </div>
      </div>
    </div>
  )
}

export default function GymEnvironments() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        OpenAI Gym Environments for NSE Trading
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        OpenAI Gym (now Gymnasium) provides a standardized interface for RL environments.
        Building a Gym-compatible NSE trading environment enables us to use any off-the-shelf
        RL algorithm. We will build environments that handle Indian market specifics: trading
        hours (9:15-15:30 IST), lot sizes, circuit breakers, and T+1 settlement.
      </p>

      <DefinitionBlock
        title="Gymnasium Environment Interface"
        label="Definition 14.4"
        definition="A Gymnasium environment implements the standard API: reset() returns the initial observation, step(action) returns (observation, reward, terminated, truncated, info), and exposes observation_space and action_space attributes. This interface ensures compatibility with all standard RL libraries."
        notation="env.reset() → obs, info; env.step(a) → obs, reward, terminated, truncated, info"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Environment Design Considerations for NSE
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Aspect</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">NSE Specifics</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Implementation</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Trading hours</td>
              <td className="px-5 py-2">9:15 AM - 3:30 PM IST</td>
              <td className="px-5 py-2">Filter data to market hours</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Circuit breakers</td>
              <td className="px-5 py-2">5%, 10%, 15%, 20% limits</td>
              <td className="px-5 py-2">Clamp actions at limits</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Settlement</td>
              <td className="px-5 py-2">T+1 for equities</td>
              <td className="px-5 py-2">Track settlement queue</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Lot sizes</td>
              <td className="px-5 py-2">F&O have fixed lot sizes</td>
              <td className="px-5 py-2">Discretize actions to lots</td>
            </tr>
            <tr>
              <td className="px-5 py-2">Holidays</td>
              <td className="px-5 py-2">NSE holiday calendar</td>
              <td className="px-5 py-2">Skip non-trading days</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Observation Space Design
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The observation space should capture sufficient market state for decision-making:
      </p>

      <BlockMath math="\text{obs}_t \in \mathbb{R}^{W \times F}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="W" /> is the lookback window and <InlineMath math="F" /> is
        the number of features. Common features for NSE:
      </p>

      <BlockMath math="F = \{\underbrace{\text{OHLCV}}_5, \underbrace{\text{RSI, MACD, BB}}_3, \underbrace{\text{delivery\%, FII/DII}}_2, \underbrace{\text{position, PnL}}_2\}" />

      <InteractiveGymEnv />

      <NoteBlock title="Data Sources for NSE Environments" type="info">
        <p>
          For building NSE trading environments, you can source data from: (1) NSE official
          bhavcopy (free daily OHLCV), (2) Zerodha Kite API for real-time data, (3) Yahoo
          Finance for historical data, (4) nsepy/jugaad-data Python packages for bulk downloads.
          Always normalize features and handle corporate actions (splits, bonuses) that are
          common on NSE.
        </p>
      </NoteBlock>

      <PythonCode
        title="nse_gym_env.py"
        runnable
        code={`import numpy as np
from typing import Optional, Tuple, Dict, Any

class NSETradingEnv:
    """
    OpenAI Gym-compatible trading environment for NSE stocks.
    Supports both discrete and continuous action spaces.

    Features:
    - Realistic NSE transaction costs (STT, GST, stamp duty)
    - Circuit breaker simulation
    - T+1 settlement awareness
    - India-specific technical indicators
    """

    def __init__(self, prices: np.ndarray, volumes: np.ndarray = None,
                 initial_capital: float = 10_00_000,
                 window_size: int = 30,
                 max_position: int = 100,
                 discrete_actions: bool = True,
                 reward_type: str = 'log_return'):
        self.prices = prices
        self.volumes = volumes if volumes is not None else np.ones_like(prices)
        self.initial_capital = initial_capital
        self.window_size = window_size
        self.max_position = max_position
        self.discrete_actions = discrete_actions
        self.reward_type = reward_type

        # Spaces (Gym-compatible shapes)
        n_features = 6  # price, volume, rsi, macd, position, pnl
        self.observation_shape = (window_size, n_features)
        self.n_actions = 3 if discrete_actions else 1

        self.reset()

    def _compute_features(self) -> np.ndarray:
        """Compute feature matrix for current window."""
        idx = self.current_step
        start = max(0, idx - self.window_size + 1)
        window_prices = self.prices[start:idx + 1]
        window_volumes = self.volumes[start:idx + 1]

        # Pad if needed
        if len(window_prices) < self.window_size:
            pad_len = self.window_size - len(window_prices)
            window_prices = np.pad(window_prices, (pad_len, 0), mode='edge')
            window_volumes = np.pad(window_volumes, (pad_len, 0), mode='edge')

        # Normalize price to returns
        norm_prices = np.diff(np.log(window_prices), prepend=np.log(window_prices[0]))

        # Normalize volume
        vol_mean = window_volumes.mean()
        norm_volumes = window_volumes / vol_mean if vol_mean > 0 else window_volumes

        # RSI (simplified)
        deltas = np.diff(window_prices, prepend=window_prices[0])
        gains = np.maximum(deltas, 0)
        losses = np.abs(np.minimum(deltas, 0))
        avg_gain = np.convolve(gains, np.ones(14)/14, mode='same')
        avg_loss = np.convolve(losses, np.ones(14)/14, mode='same')
        rs = np.where(avg_loss > 0, avg_gain / avg_loss, 100)
        rsi = 100 - 100 / (1 + rs)
        rsi_norm = rsi / 100.0

        # MACD (simplified)
        ema12 = np.convolve(window_prices, np.ones(12)/12, mode='same')
        ema26 = np.convolve(window_prices, np.ones(26)/26, mode='same')
        macd = (ema12 - ema26) / window_prices

        # Position and PnL features
        pos_feat = np.full(self.window_size, self.position / self.max_position)
        pnl_feat = np.full(self.window_size, self.unrealized_pnl / self.initial_capital)

        features = np.column_stack([
            norm_prices, norm_volumes, rsi_norm, macd, pos_feat, pnl_feat
        ])
        return features.astype(np.float32)

    @property
    def unrealized_pnl(self) -> float:
        if self.position == 0:
            return 0.0
        return self.position * (self.prices[self.current_step] - self.avg_entry_price)

    def reset(self, seed: Optional[int] = None) -> Tuple[np.ndarray, Dict]:
        """Reset environment to initial state."""
        if seed is not None:
            np.random.seed(seed)

        self.current_step = self.window_size
        self.position = 0
        self.cash = self.initial_capital
        self.avg_entry_price = 0.0
        self.trades = []
        self.portfolio_values = [self.initial_capital]
        self.peak_value = self.initial_capital

        obs = self._compute_features()
        return obs, {"portfolio_value": self.initial_capital}

    def _compute_transaction_cost(self, trade_value: float,
                                   is_sell: bool = False) -> float:
        """NSE transaction costs including STT, GST, stamp duty."""
        abs_val = abs(trade_value)
        brokerage = min(20, abs_val * 0.0003)  # Zerodha
        stt = abs_val * 0.001 if is_sell else abs_val * 0.001
        gst = brokerage * 0.18
        stamp = abs_val * 0.00015
        sebi_charges = abs_val * 0.000001
        exchange = abs_val * 0.0000345
        return brokerage + stt + gst + stamp + sebi_charges + exchange

    def step(self, action) -> Tuple[np.ndarray, float, bool, bool, Dict]:
        """Execute one step in the environment."""
        price = self.prices[self.current_step]
        prev_value = self.cash + self.position * price

        # Execute action
        trade_value = 0
        if self.discrete_actions:
            if action == 2 and self.position < self.max_position:  # Buy
                qty = min(10, self.max_position - self.position)
                cost = qty * price
                tc = self._compute_transaction_cost(cost)
                if cost + tc <= self.cash:
                    self.cash -= (cost + tc)
                    self.avg_entry_price = (
                        (self.avg_entry_price * self.position + cost)
                        / (self.position + qty)
                    ) if self.position + qty > 0 else price
                    self.position += qty
                    trade_value = cost
            elif action == 0 and self.position > 0:  # Sell
                qty = min(10, self.position)
                revenue = qty * price
                tc = self._compute_transaction_cost(revenue, is_sell=True)
                self.cash += (revenue - tc)
                self.position -= qty
                trade_value = revenue
        else:
            target = int(action * self.max_position)
            delta = target - self.position
            if delta != 0:
                trade_value = abs(delta) * price
                tc = self._compute_transaction_cost(trade_value, is_sell=(delta < 0))
                if delta > 0:
                    self.cash -= (trade_value + tc)
                else:
                    self.cash += (trade_value - tc)
                self.position = target

        # Advance
        self.current_step += 1
        terminated = self.current_step >= len(self.prices) - 1
        new_price = self.prices[self.current_step]
        new_value = self.cash + self.position * new_price
        self.portfolio_values.append(new_value)
        self.peak_value = max(self.peak_value, new_value)

        # Compute reward
        if self.reward_type == 'log_return':
            reward = float(np.log(new_value / prev_value)) if prev_value > 0 else 0.0
        elif self.reward_type == 'pnl':
            reward = float(new_value - prev_value)
        else:
            reward = float(np.log(new_value / prev_value)) if prev_value > 0 else 0.0

        # Drawdown check
        drawdown = (self.peak_value - new_value) / self.peak_value
        truncated = drawdown > 0.20  # Stop if drawdown > 20%

        obs = self._compute_features()
        info = {
            "portfolio_value": new_value,
            "position": self.position,
            "drawdown": drawdown,
            "trade_value": trade_value
        }
        return obs, reward, terminated, truncated, info


# Demo
np.random.seed(42)
n_days = 252
returns = np.random.normal(0.0005, 0.018, n_days)
prices = 2500 * np.cumprod(1 + returns)

env = NSETradingEnv(prices, initial_capital=5_00_000, window_size=20)
obs, info = env.reset()

print(f"Environment: NSETradingEnv")
print(f"Observation shape: {obs.shape}")
print(f"Action space: Discrete(3)")
print(f"Initial capital: INR {info['portfolio_value']:,.0f}")
print()

# Run random agent for 50 steps
total_reward = 0
for i in range(50):
    action = np.random.choice([0, 1, 2], p=[0.15, 0.70, 0.15])
    obs, reward, terminated, truncated, info = env.step(action)
    total_reward += reward
    if terminated or truncated:
        break

print(f"After 50 steps:")
print(f"Portfolio: INR {info['portfolio_value']:,.0f}")
print(f"Position: {info['position']} shares")
print(f"Drawdown: {info['drawdown']*100:.1f}%")
print(f"Cumulative reward: {total_reward:.4f}")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Multi-Asset NSE Environment
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For portfolio-level RL, we extend to multiple NSE stocks with a joint observation space:
      </p>

      <BlockMath math="\text{obs}_t \in \mathbb{R}^{N \times W \times F}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="N" /> is the number of assets (e.g., Nifty 50 constituents),
        and the action becomes a vector of portfolio weights:
      </p>

      <BlockMath math="a_t = [w_1, w_2, \ldots, w_N] \in \Delta^N, \quad \sum_{i=1}^N w_i \leq 1" />

      <TheoremBlock
        title="Environment Consistency"
        label="Theorem 14.3"
        statement="A well-defined trading environment must satisfy the accounting identity at every step: V_t = cash_t + Σᵢ positionᵢ × priceᵢ,t. Any violation indicates a bug in trade execution or cost computation logic."
        proof="By construction, each step either transfers value between cash and positions (trades) or changes position value due to price movement. Since trade execution is: cash_new = cash - qty × price - TC (buy) or cash + qty × price - TC (sell), and position_value changes by qty × Δprice, the accounting identity is preserved as long as TC > 0 reduces total portfolio value monotonically."
      />

      <ExampleBlock
        title="Setting Up an NSE Gym Environment"
        difficulty="intermediate"
        problem="Create a Gym environment for trading Reliance Industries on NSE with ₹5,00,000 capital, a 20-day lookback window, and log-return rewards. Run it for 10 steps with a simple RSI-based heuristic."
        solution={[
          {
            step: 'Initialize the environment',
            formula: '\\text{env} = \\text{NSETradingEnv}(\\text{prices}, W=20, V_0 = 5{,}00{,}000)',
            explanation: 'Create the environment with Reliance historical prices and 20-day lookback.',
          },
          {
            step: 'Define RSI-based heuristic',
            formula: '\\pi(s) = \\begin{cases} \\text{buy} & \\text{if RSI} < 30 \\\\ \\text{sell} & \\text{if RSI} > 70 \\\\ \\text{hold} & \\text{otherwise} \\end{cases}',
            explanation: 'A simple mean-reversion heuristic as a baseline policy.',
          },
          {
            step: 'Evaluate the heuristic',
            formula: 'G = \\sum_{t=0}^{T} \\gamma^t R_t',
            explanation: 'Run the environment for 10 steps, accumulate discounted rewards, and compare with buy-and-hold.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          A well-designed Gym environment is the foundation of RL-based trading research. For
          NSE-specific environments, pay attention to India&apos;s unique market microstructure:
          T+1 settlement, SEBI circuit breaker rules (upper/lower circuit limits), lot sizes
          for F&O trading, and the specific cost structure of brokers like Zerodha. Use the
          Gymnasium API (successor to OpenAI Gym) which returns 5-tuples from step() to
          ensure compatibility with modern RL libraries like Stable-Baselines3 and CleanRL.
        </p>
      </NoteBlock>
    </div>
  )
}
