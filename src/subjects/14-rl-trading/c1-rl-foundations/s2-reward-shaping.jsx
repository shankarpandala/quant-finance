import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveRewardShaping() {
  const [sharpeWeight, setSharpeWeight] = useState(1.0)
  const [drawdownPenalty, setDrawdownPenalty] = useState(0.5)
  const [turnoverPenalty, setTurnoverPenalty] = useState(0.1)
  const [riskFreeRate, setRiskFreeRate] = useState(6.5)

  const returns = [0.02, -0.01, 0.03, -0.005, 0.015, -0.02, 0.01, 0.025, -0.015, 0.008]
  const cumReturns = returns.reduce((acc, r) => {
    const last = acc[acc.length - 1]
    acc.push(last * (1 + r))
    return acc
  }, [1.0])

  const meanRet = returns.reduce((a, b) => a + b, 0) / returns.length
  const stdRet = Math.sqrt(returns.reduce((a, r) => a + (r - meanRet) ** 2, 0) / returns.length)
  const dailyRf = riskFreeRate / 100 / 252
  const sharpe = stdRet > 0 ? (meanRet - dailyRf) / stdRet * Math.sqrt(252) : 0

  const peak = Math.max(...cumReturns)
  const maxDrawdown = Math.max(...cumReturns.map(v => (peak - v) / peak))

  const turnover = 0.15
  const shapedReward = sharpeWeight * sharpe - drawdownPenalty * maxDrawdown - turnoverPenalty * turnover

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Reward Shaping Tuner
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust reward component weights and see how the shaped reward changes.
        Risk-free rate reflects India&apos;s T-bill rate.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Sharpe Weight: {sharpeWeight.toFixed(2)}</span>
          <input type="range" min="0" max="3" step="0.1" value={sharpeWeight}
            onChange={e => setSharpeWeight(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Drawdown Penalty: {drawdownPenalty.toFixed(2)}</span>
          <input type="range" min="0" max="3" step="0.1" value={drawdownPenalty}
            onChange={e => setDrawdownPenalty(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-red-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Turnover Penalty: {turnoverPenalty.toFixed(2)}</span>
          <input type="range" min="0" max="1" step="0.05" value={turnoverPenalty}
            onChange={e => setTurnoverPenalty(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-amber-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Risk-Free Rate: {riskFreeRate.toFixed(1)}%</span>
          <input type="range" min="4" max="10" step="0.5" value={riskFreeRate}
            onChange={e => setRiskFreeRate(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-green-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg bg-blue-50 p-3 text-center dark:bg-blue-900/30">
          <div className="text-xs text-blue-600 dark:text-blue-400">Sharpe Component</div>
          <div className="text-lg font-bold text-blue-800 dark:text-blue-200">
            {(sharpeWeight * sharpe).toFixed(3)}
          </div>
        </div>
        <div className="rounded-lg bg-red-50 p-3 text-center dark:bg-red-900/30">
          <div className="text-xs text-red-600 dark:text-red-400">Drawdown Penalty</div>
          <div className="text-lg font-bold text-red-800 dark:text-red-200">
            -{(drawdownPenalty * maxDrawdown).toFixed(3)}
          </div>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 text-center dark:bg-amber-900/30">
          <div className="text-xs text-amber-600 dark:text-amber-400">Turnover Penalty</div>
          <div className="text-lg font-bold text-amber-800 dark:text-amber-200">
            -{(turnoverPenalty * turnover).toFixed(3)}
          </div>
        </div>
        <div className={`rounded-lg p-3 text-center ${shapedReward >= 0 ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'}`}>
          <div className="text-xs text-gray-600 dark:text-gray-400">Shaped Reward</div>
          <div className={`text-lg font-bold ${shapedReward >= 0 ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
            {shapedReward.toFixed(4)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function RewardShaping() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Reward Shaping for Trading RL
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The reward function is arguably the most critical design choice in RL-based trading.
        A naive reward (raw PnL) leads to unstable, high-risk policies. Proper reward shaping
        encourages risk-adjusted returns, penalizes excessive drawdowns, and accounts for
        transaction costs -- all essential for deploying strategies on NSE via brokers like Zerodha.
      </p>

      <DefinitionBlock
        title="Reward Shaping"
        label="Definition 14.3"
        definition="Reward shaping augments the base reward R with an additional shaping function F(s, a, s') to guide learning without changing the optimal policy (under certain conditions). A potential-based shaping function F(s, a, s') = γΦ(s') - Φ(s), where Φ is a potential function, preserves the optimal policy."
        notation="The shaped reward is R'(s,a,s') = R(s,a,s') + F(s,a,s')."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Common Reward Functions for Trading
      </h3>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        <strong>1. Simple PnL Reward:</strong> The most basic reward is the change in portfolio value:
      </p>
      <BlockMath math="R_t^{\text{PnL}} = V_{t+1} - V_t = q_t(p_{t+1} - p_t) + c_t \cdot r_f" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        <strong>2. Log Return Reward:</strong> Using log returns ensures scale invariance:
      </p>
      <BlockMath math="R_t^{\log} = \ln\left(\frac{V_{t+1}}{V_t}\right)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        <strong>3. Differential Sharpe Ratio:</strong> Moody and Saffell (2001) proposed an
        online approximation to the Sharpe ratio that can be used as a step-wise reward:
      </p>
      <BlockMath math="D_t = \frac{B_{t-1} \Delta A_t - \frac{1}{2} A_{t-1} \Delta B_t}{(B_{t-1} - A_{t-1}^2)^{3/2}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="A_t" /> and <InlineMath math="B_t" /> are exponential moving
        averages of returns and squared returns:
      </p>
      <BlockMath math="A_t = A_{t-1} + \eta(R_t - A_{t-1}), \quad B_t = B_{t-1} + \eta(R_t^2 - B_{t-1})" />

      <TheoremBlock
        title="Policy Invariance under Potential-Based Shaping"
        label="Theorem 14.2 (Ng et al., 1999)"
        statement="If F(s,a,s') = γΦ(s') - Φ(s) for some potential function Φ: S → ℝ, then the optimal policy under the shaped reward R' = R + F is identical to the optimal policy under R."
        proof="Consider the shaped value function V'(s) = V(s) - Φ(s). The shaped Bellman equation becomes V'(s) = max_a E[R + γΦ(s') - Φ(s) + γV'(s')] = -Φ(s) + max_a E[R + γ(V'(s') + Φ(s'))]. Since V'(s) + Φ(s) = V(s), the argmax over actions is unchanged, preserving the optimal policy."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Drawdown-Penalized Reward
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For Indian market participants, SEBI mandates risk limits. We incorporate drawdown penalties:
      </p>

      <BlockMath math="R_t^{\text{shaped}} = R_t^{\log} - \lambda_{\text{dd}} \cdot \max\left(0, \frac{V^{\max}_{0:t} - V_t}{V^{\max}_{0:t}} - \text{DD}_{\text{threshold}}\right)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="V^{\max}_{0:t}" /> is the peak portfolio value and{' '}
        <InlineMath math="\text{DD}_{\text{threshold}}" /> is the acceptable drawdown level
        (e.g., 10% for a moderate-risk Nifty 50 strategy).
      </p>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Transaction Cost Penalty
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Indian market transaction costs include brokerage, STT, GST, SEBI charges, and stamp duty.
        For Zerodha (India&apos;s largest discount broker):
      </p>

      <BlockMath math="R_t^{\text{tc}} = -\left(\underbrace{c_{\text{brokerage}}}_{0.03\%} + \underbrace{c_{\text{STT}}}_{0.1\%} + \underbrace{c_{\text{GST}}}_{18\% \times \text{brokerage}} + \underbrace{c_{\text{stamp}}}_{0.015\%}\right) \cdot |a_t - a_{t-1}| \cdot V_t" />

      <NoteBlock title="Indian Market Cost Structure" type="warning">
        <p>
          Transaction costs on NSE are asymmetric: Securities Transaction Tax (STT) applies only on
          the sell side for intraday trades but on both sides for delivery. The total cost for a
          delivery trade round-trip on Zerodha is approximately 0.2-0.3% of trade value, while
          intraday is lower. Your reward function must account for this asymmetry to prevent the
          RL agent from learning overly aggressive strategies.
        </p>
      </NoteBlock>

      <InteractiveRewardShaping />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Composite Reward Function
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The final shaped reward combines multiple objectives:
      </p>

      <BlockMath math="R_t = \underbrace{\alpha \cdot D_t}_{\text{Sharpe}} - \underbrace{\beta \cdot \text{DD}_t}_{\text{drawdown}} - \underbrace{\gamma_c \cdot ||\Delta w_t||_1}_{\text{turnover}} - \underbrace{\delta \cdot \text{TC}_t}_{\text{costs}} + \underbrace{\epsilon \cdot \Phi_t}_{\text{potential}}" />

      <PythonCode
        title="reward_shaping.py"
        runnable
        code={`import numpy as np

class TradingRewardShaper:
    """
    Reward shaping for RL trading on NSE.
    Combines Sharpe-based rewards with drawdown and cost penalties.
    """
    def __init__(self, risk_free_rate=0.065, sharpe_weight=1.0,
                 drawdown_penalty=0.5, turnover_penalty=0.1,
                 dd_threshold=0.10, eta=0.01):
        self.rf_daily = risk_free_rate / 252
        self.sharpe_weight = sharpe_weight
        self.drawdown_penalty = drawdown_penalty
        self.turnover_penalty = turnover_penalty
        self.dd_threshold = dd_threshold
        self.eta = eta  # EMA decay for differential Sharpe

        # Running statistics for differential Sharpe
        self.A = 0.0  # EMA of returns
        self.B = 0.0  # EMA of squared returns
        self.peak_value = None

    def differential_sharpe(self, ret):
        """Compute differential Sharpe ratio (Moody & Saffell, 2001)."""
        delta_A = ret - self.A
        delta_B = ret**2 - self.B

        denom = (self.B - self.A**2) ** 1.5
        if abs(denom) < 1e-12:
            dsr = 0.0
        else:
            dsr = (self.B * delta_A - 0.5 * self.A * delta_B) / denom

        # Update EMAs
        self.A += self.eta * delta_A
        self.B += self.eta * delta_B

        return dsr

    def drawdown_penalty_fn(self, current_value):
        """Penalty for exceeding drawdown threshold."""
        if self.peak_value is None:
            self.peak_value = current_value
        self.peak_value = max(self.peak_value, current_value)

        dd = (self.peak_value - current_value) / self.peak_value
        excess_dd = max(0, dd - self.dd_threshold)
        return excess_dd

    def transaction_cost(self, trade_value, is_intraday=False):
        """
        Compute NSE transaction costs (Zerodha pricing).
        Includes brokerage, STT, GST, stamp duty, exchange charges.
        """
        abs_value = abs(trade_value)
        brokerage = min(20, abs_value * 0.0003)  # Zerodha flat fee
        stt = abs_value * 0.001 if not is_intraday else abs_value * 0.00025
        gst = brokerage * 0.18
        stamp = abs_value * 0.00015
        exchange_charges = abs_value * 0.0000345

        return brokerage + stt + gst + stamp + exchange_charges

    def compute_reward(self, portfolio_value, prev_value,
                       weight_change, trade_value=0):
        """Compute composite shaped reward."""
        # Log return
        log_ret = np.log(portfolio_value / prev_value) if prev_value > 0 else 0

        # Differential Sharpe ratio
        dsr = self.differential_sharpe(log_ret)

        # Drawdown penalty
        dd_pen = self.drawdown_penalty_fn(portfolio_value)

        # Turnover cost (L1 norm of weight changes)
        turnover = np.sum(np.abs(weight_change)) if hasattr(weight_change, '__len__') else abs(weight_change)

        # Transaction cost
        tc = self.transaction_cost(trade_value)
        tc_normalized = tc / prev_value if prev_value > 0 else 0

        # Composite reward
        reward = (self.sharpe_weight * dsr
                  - self.drawdown_penalty * dd_pen
                  - self.turnover_penalty * turnover
                  - tc_normalized)

        return reward, {
            'log_return': log_ret,
            'diff_sharpe': dsr,
            'drawdown_penalty': dd_pen,
            'turnover': turnover,
            'transaction_cost': tc
        }

    def reset(self):
        """Reset running statistics."""
        self.A = 0.0
        self.B = 0.0
        self.peak_value = None


# Demo: Simulate rewards for a Nifty 50 trading strategy
np.random.seed(42)
shaper = TradingRewardShaper(
    risk_free_rate=0.065,  # India T-bill rate ~6.5%
    sharpe_weight=1.0,
    drawdown_penalty=0.5,
    turnover_penalty=0.1,
    dd_threshold=0.10
)

# Simulate 20 trading days
portfolio = 10_00_000  # INR 10 lakhs
print("Day | Portfolio (INR) | Return  | Reward  | Components")
print("-" * 75)

for day in range(20):
    prev = portfolio
    daily_return = np.random.normal(0.0008, 0.015)
    portfolio *= (1 + daily_return)

    weight_change = np.random.uniform(0, 0.3)
    trade_value = abs(weight_change) * portfolio

    reward, components = shaper.compute_reward(
        portfolio, prev, weight_change, trade_value
    )

    print(f"{day+1:3d} | {portfolio:>14,.0f} | {daily_return:>+7.4f} | "
          f"{reward:>+7.4f} | DSR={components['diff_sharpe']:+.4f} "
          f"DD={components['drawdown_penalty']:.4f}")

final_return = (portfolio / 10_00_000 - 1) * 100
print(f"\\nFinal portfolio: INR {portfolio:,.0f}")
print(f"Total return: {final_return:.2f}%")
print(f"Annualized Sharpe estimate: {shaper.A / np.sqrt(shaper.B - shaper.A**2) * np.sqrt(252):.2f}" if shaper.B > shaper.A**2 else "N/A")`}
      />

      <ExampleBlock
        title="Designing Reward for Nifty Futures Trading"
        difficulty="advanced"
        problem="Design a reward function for an RL agent trading Nifty 50 futures on NSE. The agent trades 1 lot (50 units). The strategy targets Sharpe > 2.0 with max drawdown < 15%. Margin requirement is ₹1,00,000 per lot."
        solution={[
          {
            step: 'Define the log return component',
            formula: 'R_t^{\\log} = \\ln\\left(\\frac{V_t + 50 \\cdot \\Delta p_t}{V_t}\\right)',
            explanation: 'Log return captures the multiplicative nature of compounding in futures trading. Δp_t is the Nifty point change.',
          },
          {
            step: 'Add differential Sharpe ratio',
            formula: 'D_t = \\frac{B_{t-1}(R_t - A_{t-1}) - \\frac{1}{2}A_{t-1}(R_t^2 - B_{t-1})}{(B_{t-1} - A_{t-1}^2)^{3/2}}',
            explanation: 'The differential Sharpe provides a step-wise, online approximation of the portfolio Sharpe ratio.',
          },
          {
            step: 'Incorporate drawdown penalty',
            formula: 'P_t^{\\text{dd}} = \\lambda \\cdot \\max(0, \\text{DD}_t - 0.15)^2',
            explanation: 'Quadratic penalty beyond 15% drawdown creates a strong signal for risk management.',
          },
          {
            step: 'Final composite reward',
            formula: 'R_t = D_t - 0.5 \\cdot P_t^{\\text{dd}} - 0.001 \\cdot |\\Delta q_t|',
            explanation: 'Combine Sharpe signal, drawdown penalty, and a small turnover penalty to discourage excessive trading.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Reward shaping is the bridge between financial objectives and RL optimization. For
          Indian markets, always account for the specific cost structure (STT, GST, stamp duty),
          use risk-free rates reflecting RBI repo rate or T-bill yields (~6-7%), and include
          SEBI-mandated position limits as hard constraints. The differential Sharpe ratio
          remains one of the most effective reward signals for encouraging risk-adjusted
          performance in trading RL agents.
        </p>
      </NoteBlock>
    </div>
  )
}
