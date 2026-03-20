import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveMDP() {
  const [state, setState] = useState({ price: 100, position: 0, cash: 100000 })
  const [action, setAction] = useState('hold')
  const [history, setHistory] = useState([{ price: 100, position: 0, cash: 100000, reward: 0 }])
  const [step, setStep] = useState(0)

  const takeAction = (act) => {
    setAction(act)
    const priceChange = (Math.random() - 0.48) * 4
    const newPrice = Math.max(50, state.price + priceChange)
    let newPos = state.position
    let newCash = state.cash
    const qty = 10

    if (act === 'buy' && newCash >= state.price * qty) {
      newPos += qty
      newCash -= state.price * qty
    } else if (act === 'sell' && newPos >= qty) {
      newPos -= qty
      newCash += state.price * qty
    }

    const portfolioNow = newCash + newPos * newPrice
    const portfolioPrev = state.cash + state.position * state.price
    const reward = portfolioNow - portfolioPrev

    const newState = { price: parseFloat(newPrice.toFixed(2)), position: newPos, cash: parseFloat(newCash.toFixed(2)) }
    setState(newState)
    setStep(step + 1)
    setHistory([...history, { ...newState, reward: parseFloat(reward.toFixed(2)) }])
  }

  const totalValue = state.cash + state.position * state.price

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Trading MDP Simulator
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Simulate an MDP-based trading environment. Choose actions and observe state transitions and rewards.
        Stock mimics an NSE scrip trading around <InlineMath math="\text{INR }100" />.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
          <div className="text-xs text-blue-600 dark:text-blue-400">Price</div>
          <div className="text-lg font-bold text-blue-800 dark:text-blue-200">₹{state.price.toFixed(2)}</div>
        </div>
        <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/30">
          <div className="text-xs text-green-600 dark:text-green-400">Position</div>
          <div className="text-lg font-bold text-green-800 dark:text-green-200">{state.position} shares</div>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
          <div className="text-xs text-purple-600 dark:text-purple-400">Cash</div>
          <div className="text-lg font-bold text-purple-800 dark:text-purple-200">₹{state.cash.toFixed(0)}</div>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30">
          <div className="text-xs text-amber-600 dark:text-amber-400">Portfolio</div>
          <div className="text-lg font-bold text-amber-800 dark:text-amber-200">₹{totalValue.toFixed(0)}</div>
        </div>
      </div>

      <div className="mb-4 flex gap-3">
        <button onClick={() => takeAction('buy')}
          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">
          Buy 10
        </button>
        <button onClick={() => takeAction('hold')}
          className="rounded-lg bg-gray-600 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700">
          Hold
        </button>
        <button onClick={() => takeAction('sell')}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700">
          Sell 10
        </button>
      </div>

      <div className="max-h-40 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="w-full text-xs">
          <thead className="sticky top-0 bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-2 py-1 text-left">Step</th>
              <th className="px-2 py-1 text-left">Price</th>
              <th className="px-2 py-1 text-left">Position</th>
              <th className="px-2 py-1 text-left">Cash</th>
              <th className="px-2 py-1 text-left">Reward</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            {history.map((h, i) => (
              <tr key={i} className="border-t border-gray-100 dark:border-gray-800">
                <td className="px-2 py-1">{i}</td>
                <td className="px-2 py-1">₹{h.price}</td>
                <td className="px-2 py-1">{h.position}</td>
                <td className="px-2 py-1">₹{h.cash}</td>
                <td className={`px-2 py-1 font-mono ${h.reward >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {h.reward >= 0 ? '+' : ''}{h.reward}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
        Step {step} | Last action: <span className="font-semibold">{action}</span> |
        Portfolio value: <InlineMath math={`₹${totalValue.toFixed(0)}`} />
      </p>
    </div>
  )
}

export default function MDPFormulation() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Trading as a Markov Decision Process
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Reinforcement learning (RL) provides a powerful framework for sequential decision-making
        under uncertainty. In the context of trading on the National Stock Exchange (NSE), we can
        model the trading problem as a Markov Decision Process (MDP), where an agent learns to
        make buy, sell, or hold decisions to maximize cumulative returns.
      </p>

      <DefinitionBlock
        title="Markov Decision Process (MDP)"
        label="Definition 14.1"
        definition="An MDP is defined by a 5-tuple (S, A, P, R, γ) where S is the state space, A is the action space, P(s'|s,a) is the transition probability, R(s,a,s') is the reward function, and γ ∈ [0,1] is the discount factor. The Markov property states that the future depends only on the current state, not the history."
        notation="We write π(a|s) for the policy -- the probability of taking action a in state s."
      />

      <BlockMath math="\mathcal{M} = (\mathcal{S}, \mathcal{A}, P, R, \gamma)" />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        State Space for NSE Trading
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The state at time <InlineMath math="t" /> encodes all information the agent needs to make
        a decision. For an NSE trading agent, the state typically includes:
      </p>

      <BlockMath math="s_t = \left[\underbrace{p_t, v_t, \text{OHLCV}_t}_{\text{market data}},\; \underbrace{q_t, \text{PnL}_t, c_t}_{\text{portfolio state}},\; \underbrace{\text{RSI}_t, \text{MACD}_t, \text{BB}_t}_{\text{technical indicators}}\right]" />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">State Component</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Symbol</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">NSE Example</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Current price</td>
              <td className="px-5 py-2"><InlineMath math="p_t" /></td>
              <td className="px-5 py-2">Reliance at ₹2,450</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Volume</td>
              <td className="px-5 py-2"><InlineMath math="v_t" /></td>
              <td className="px-5 py-2">NSE delivery volume</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Current position</td>
              <td className="px-5 py-2"><InlineMath math="q_t" /></td>
              <td className="px-5 py-2">100 shares long</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Unrealized PnL</td>
              <td className="px-5 py-2"><InlineMath math="\text{PnL}_t" /></td>
              <td className="px-5 py-2">₹12,500 profit</td>
            </tr>
            <tr>
              <td className="px-5 py-2">Available capital</td>
              <td className="px-5 py-2"><InlineMath math="c_t" /></td>
              <td className="px-5 py-2">₹5,00,000 in Zerodha</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Action Space
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The action space can be discrete or continuous. For a simple discrete formulation on NSE:
      </p>

      <BlockMath math="\mathcal{A} = \{-1, 0, +1\} \quad \text{(sell, hold, buy)}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For continuous action spaces, we parameterize the portfolio weight:
      </p>

      <BlockMath math="a_t \in [-1, 1] \quad \text{where } a_t = \frac{\text{target position}}{\text{max position}}" />

      <DefinitionBlock
        title="Transition Dynamics in Trading"
        label="Definition 14.2"
        definition="The transition function P(s'|s,a) in a trading MDP is determined by the market dynamics (which are unknown to the agent) and the portfolio accounting (which is deterministic). Given action a_t in state s_t, the next price is determined by the market, while the portfolio state updates deterministically based on the executed trade."
        notation="In practice, we use model-free RL since P is unknown and non-stationary."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Bellman Equation for Trading
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The value function under policy <InlineMath math="\pi" /> satisfies the Bellman equation:
      </p>

      <BlockMath math="V^\pi(s) = \mathbb{E}_\pi\left[R_{t+1} + \gamma V^\pi(S_{t+1}) \mid S_t = s\right]" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The optimal action-value function satisfies the Bellman optimality equation:
      </p>

      <BlockMath math="Q^*(s, a) = \mathbb{E}\left[R_{t+1} + \gamma \max_{a'} Q^*(S_{t+1}, a') \mid S_t = s, A_t = a\right]" />

      <TheoremBlock
        title="Optimal Trading Policy"
        label="Theorem 14.1"
        statement="For a finite MDP with bounded rewards, there exists a deterministic optimal policy π* that achieves the maximum expected cumulative discounted reward. The optimal policy can be derived from Q* via: π*(s) = argmax_a Q*(s, a)."
        proof="This follows directly from the Bellman optimality principle. For any MDP with finite state and action spaces, the Bellman operator is a contraction mapping in the sup-norm. By the Banach fixed-point theorem, iteration of the Bellman operator converges to the unique fixed point Q*, from which the optimal policy π* can be extracted greedily."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Discount Factor in Trading
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The discount factor <InlineMath math="\gamma" /> is particularly meaningful in trading.
        For Indian markets, typical choices reflect time horizons:
      </p>

      <BlockMath math="G_t = \sum_{k=0}^{T-t} \gamma^k R_{t+k+1}" />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Trading Style</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400"><InlineMath math="\gamma" /></th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Effective Horizon</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Intraday (NSE 9:15-15:30)</td>
              <td className="px-5 py-2">0.99</td>
              <td className="px-5 py-2">~100 steps</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Swing (1-2 weeks)</td>
              <td className="px-5 py-2">0.995</td>
              <td className="px-5 py-2">~200 steps</td>
            </tr>
            <tr>
              <td className="px-5 py-2">Positional (1-3 months)</td>
              <td className="px-5 py-2">0.999</td>
              <td className="px-5 py-2">~1000 steps</td>
            </tr>
          </tbody>
        </table>
      </div>

      <NoteBlock title="Markov Property in Financial Markets" type="warning">
        <p>
          Financial markets do not strictly satisfy the Markov property -- past price patterns,
          order flow history, and regime changes all carry information. In practice, we engineer
          the state representation to include sufficient history (e.g., a window of past 30 candles,
          rolling statistics) so that the Markov assumption becomes a reasonable approximation.
          For NSE stocks, including features like delivery percentage and FII/DII activity from
          past sessions can significantly improve the state representation.
        </p>
      </NoteBlock>

      <InteractiveMDP />

      <PythonCode
        title="nse_trading_mdp.py"
        runnable
        code={`import numpy as np
from dataclasses import dataclass
from typing import Tuple

@dataclass
class TradingState:
    """State representation for NSE trading MDP."""
    price: float           # Current stock price (e.g., Reliance)
    position: int          # Number of shares held
    cash: float            # Available cash in INR
    rsi: float             # RSI indicator
    macd: float            # MACD signal
    volume_ratio: float    # Volume relative to 20-day average

class NSETradingMDP:
    """
    Trading environment modeled as an MDP for NSE stocks.
    Supports discrete actions: buy, hold, sell.
    """
    def __init__(self, initial_cash=1_000_000, max_position=100,
                 transaction_cost=0.001, lot_size=1):
        self.initial_cash = initial_cash
        self.max_position = max_position
        self.transaction_cost = transaction_cost  # Zerodha: ~0.1%
        self.lot_size = lot_size
        self.gamma = 0.995  # Discount factor for swing trading

    def reset(self, price_series: np.ndarray) -> TradingState:
        """Reset environment with historical price data."""
        self.prices = price_series
        self.current_step = 30  # Need history for indicators
        self.position = 0
        self.cash = self.initial_cash
        return self._get_state()

    def _compute_rsi(self, window=14) -> float:
        """Compute RSI from price history."""
        prices = self.prices[self.current_step-window:self.current_step+1]
        deltas = np.diff(prices)
        gains = np.maximum(deltas, 0).mean()
        losses = np.abs(np.minimum(deltas, 0)).mean()
        if losses == 0:
            return 100.0
        rs = gains / losses
        return 100 - (100 / (1 + rs))

    def _get_state(self) -> TradingState:
        """Construct current state."""
        price = self.prices[self.current_step]
        vol_window = self.prices[self.current_step-20:self.current_step]
        return TradingState(
            price=price,
            position=self.position,
            cash=self.cash,
            rsi=self._compute_rsi(),
            macd=0.0,  # Simplified
            volume_ratio=1.0
        )

    def step(self, action: int) -> Tuple[TradingState, float, bool]:
        """
        Execute action: 0=sell, 1=hold, 2=buy
        Returns: (next_state, reward, done)
        """
        price = self.prices[self.current_step]
        prev_portfolio = self.cash + self.position * price

        # Execute trade
        if action == 2 and self.position < self.max_position:
            qty = min(self.lot_size, self.max_position - self.position)
            cost = qty * price * (1 + self.transaction_cost)
            if cost <= self.cash:
                self.position += qty
                self.cash -= cost
        elif action == 0 and self.position > 0:
            qty = min(self.lot_size, self.position)
            revenue = qty * price * (1 - self.transaction_cost)
            self.position -= qty
            self.cash += revenue

        # Advance time
        self.current_step += 1
        done = self.current_step >= len(self.prices) - 1
        new_price = self.prices[self.current_step]
        new_portfolio = self.cash + self.position * new_price

        # Reward = change in portfolio value (log return)
        reward = np.log(new_portfolio / prev_portfolio) if prev_portfolio > 0 else 0

        return self._get_state(), reward, done

# Simulate Reliance-like price trajectory
np.random.seed(42)
n_days = 252  # One trading year on NSE
returns = np.random.normal(0.0005, 0.02, n_days)
prices = 2400 * np.cumprod(1 + returns)  # Starting around INR 2400

# Initialize MDP
env = NSETradingMDP(initial_cash=500_000, max_position=50)
state = env.reset(prices)

print(f"NSE Trading MDP Initialized")
print(f"Initial cash: INR {env.initial_cash:,.0f}")
print(f"Stock price: INR {state.price:,.2f}")
print(f"RSI: {state.rsi:.1f}")
print(f"Discount factor (gamma): {env.gamma}")
print(f"\\nState space dimensionality: 6")
print(f"Action space: {{sell=0, hold=1, buy=2}}")

# Run random policy for demonstration
total_reward = 0
for _ in range(50):
    action = np.random.choice([0, 1, 2], p=[0.2, 0.6, 0.2])
    state, reward, done = env.step(action)
    total_reward += reward
    if done:
        break

final_value = state.cash + state.position * state.price
print(f"\\nAfter 50 random steps:")
print(f"Portfolio value: INR {final_value:,.0f}")
print(f"Cumulative reward: {total_reward:.4f}")
print(f"Return: {(final_value/500_000 - 1)*100:.2f}%")`}
      />

      <ExampleBlock
        title="Q-Value Computation for Trading"
        difficulty="intermediate"
        problem="An RL agent trading HDFC Bank on NSE has learned Q-values. In state s (price=₹1,650, position=0, RSI=72), the Q-values are: Q(s,buy)=0.15, Q(s,hold)=0.08, Q(s,sell)=-0.02. What action does the greedy policy select? What does the high RSI suggest?"
        solution={[
          {
            step: 'Apply greedy policy',
            formula: '\\pi^*(s) = \\arg\\max_a Q(s, a) = \\arg\\max\\{0.15, 0.08, -0.02\\} = \\text{buy}',
            explanation: 'The greedy policy selects the action with highest Q-value, which is buy.',
          },
          {
            step: 'Analyze the RSI context',
            formula: '\\text{RSI} = 72 > 70 \\implies \\text{overbought zone}',
            explanation: 'RSI above 70 traditionally indicates overbought conditions, yet the learned Q-values favor buying. This may indicate the RL agent has learned momentum patterns specific to HDFC Bank on NSE.',
          },
          {
            step: 'Epsilon-greedy exploration',
            formula: 'a_t = \\begin{cases} \\arg\\max_a Q(s,a) & \\text{with prob } 1-\\epsilon \\\\ \\text{random} & \\text{with prob } \\epsilon \\end{cases}',
            explanation: 'During training, we use epsilon-greedy to ensure sufficient exploration of the state-action space.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Formulating trading as an MDP is the foundation of all RL-based trading systems.
          The key design choices -- state representation, action space, and reward function --
          determine the quality of learned policies. For NSE trading, include India-specific
          features like delivery percentage, FII/DII flows, and market-wide position limits
          imposed by SEBI. Remember that the MDP framework assumes the Markov property,
          which we enforce through careful state engineering rather than relying on raw prices.
        </p>
      </NoteBlock>
    </div>
  )
}
