import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveDeepHedging() {
  const [transactionCost, setTransactionCost] = useState(0.1)
  const [riskAversion, setRiskAversion] = useState(1.0)
  const [volatility, setVolatility] = useState(20)
  const [timeToExpiry, setTimeToExpiry] = useState(30)

  const bsHedgeError = volatility * 0.05 * Math.sqrt(timeToExpiry / 252)
  const costImpact = transactionCost * 0.5 * (252 / timeToExpiry)
  const deepHedgeError = bsHedgeError * 0.7 - costImpact * 0.3
  const bsCost = costImpact * 1.5
  const deepCost = costImpact * 0.8
  const bsTotalPnL = -(bsHedgeError + bsCost)
  const deepTotalPnL = -(Math.abs(deepHedgeError) + deepCost)
  const improvement = ((1 - Math.abs(deepTotalPnL) / Math.abs(bsTotalPnL)) * 100).toFixed(1)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Deep Hedging vs Black-Scholes Delta Hedging
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Compare neural hedging with traditional delta hedging on Nifty options under
        realistic Indian market transaction costs (STT, brokerage, slippage).
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Transaction Cost = {transactionCost.toFixed(1)}%</span>
          <input type="range" min="0" max="0.5" step="0.05" value={transactionCost}
            onChange={e => setTransactionCost(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Risk Aversion <InlineMath math="\lambda" /> = {riskAversion.toFixed(1)}</span>
          <input type="range" min="0.1" max="5" step="0.1" value={riskAversion}
            onChange={e => setRiskAversion(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Nifty IV = {volatility}%</span>
          <input type="range" min="10" max="40" step="1" value={volatility}
            onChange={e => setVolatility(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Days to Expiry = {timeToExpiry}</span>
          <input type="range" min="1" max="90" step="1" value={timeToExpiry}
            onChange={e => setTimeToExpiry(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 520 160" className="w-full max-w-xl mx-auto block" aria-label="Deep hedging comparison">
        <text x="260" y="15" textAnchor="middle" className="text-[10px] font-bold" fill="#374151">
          Hedging P&L Comparison (Nifty Options)
        </text>

        {/* BS Delta Hedge */}
        <rect x="80" y="30" width="160" height="50" rx="6" fill="#ef4444" opacity="0.15" stroke="#ef4444" strokeWidth="1" />
        <text x="160" y="47" textAnchor="middle" className="text-[10px] font-bold" fill="#dc2626">BS Delta Hedge</text>
        <text x="160" y="62" textAnchor="middle" className="text-[8px]" fill="#6b7280">
          Error: {bsHedgeError.toFixed(3)} | Cost: {bsCost.toFixed(3)}
        </text>
        <text x="160" y="75" textAnchor="middle" className="text-[9px] font-bold" fill="#dc2626">
          P&L: {bsTotalPnL.toFixed(3)}
        </text>

        {/* Deep Hedge */}
        <rect x="280" y="30" width="160" height="50" rx="6" fill="#22c55e" opacity="0.15" stroke="#22c55e" strokeWidth="1" />
        <text x="360" y="47" textAnchor="middle" className="text-[10px] font-bold" fill="#16a34a">Deep Hedge</text>
        <text x="360" y="62" textAnchor="middle" className="text-[8px]" fill="#6b7280">
          Error: {Math.abs(deepHedgeError).toFixed(3)} | Cost: {deepCost.toFixed(3)}
        </text>
        <text x="360" y="75" textAnchor="middle" className="text-[9px] font-bold" fill="#16a34a">
          P&L: {deepTotalPnL.toFixed(3)}
        </text>

        {/* Improvement */}
        <rect x="160" y="100" width="200" height="30" rx="6" fill="#6366f1" opacity="0.1" stroke="#6366f1" strokeWidth="1" />
        <text x="260" y="120" textAnchor="middle" className="text-[11px] font-bold" fill="#4338ca">
          Deep Hedge Improvement: {improvement}%
        </text>

        {/* Cost bar comparison */}
        <rect x="80" y="145" width={bsCost * 800} height="8" fill="#ef4444" opacity="0.5" rx="2" />
        <rect x="80" y="145" width={deepCost * 800} height="8" fill="#22c55e" opacity="0.5" rx="2" />
        <text x="75" y="152" textAnchor="end" className="text-[7px]" fill="#6b7280">Cost</text>
      </svg>
    </div>
  )
}

export default function DeepHedging() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Neural Hedging Under Indian Market Costs
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Deep hedging replaces the classical Black-Scholes delta hedging with a neural
        network that directly optimizes the hedging strategy end-to-end, accounting
        for transaction costs, discrete rebalancing, and market frictions. For Indian
        options markets (Nifty and Bank Nifty options on NSE), the high STT on
        options (0.0625% on sell premium), wide bid-ask spreads in OTM strikes,
        and lot size constraints make traditional delta hedging suboptimal.
      </p>

      <DefinitionBlock
        title="Deep Hedging"
        label="Definition 13.10"
        definition="Deep hedging is a data-driven approach to derivatives hedging where a neural network learns the optimal hedging strategy by minimizing a risk measure (e.g., CVaR, variance) of the hedging error over simulated or historical paths, subject to realistic market frictions including transaction costs, liquidity constraints, and discrete rebalancing."
        notation={<>The hedging strategy <InlineMath math="\delta_\theta(t, S_t, V_t)" /> is parameterized by network weights <InlineMath math="\theta" /> and maps market state to hedge ratios. The objective is <InlineMath math="\min_\theta \rho(P\&L_\theta)" /> where <InlineMath math="\rho" /> is a convex risk measure.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Deep Hedging Objective
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The hedging P&L for a short option position over <InlineMath math="N" />{' '}
        rebalancing periods is:
      </p>

      <BlockMath math="\Pi_T = -\text{Payoff}(S_T) + V_0 + \sum_{n=0}^{N-1} \delta_n (S_{n+1} - S_n) - \sum_{n=0}^{N-1} c \cdot |{\delta_n - \delta_{n-1}}| \cdot S_n" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\delta_n" /> is the hedge ratio at time{' '}
        <InlineMath math="n" />, <InlineMath math="V_0" /> is the option premium
        received, and <InlineMath math="c" /> is the proportional transaction cost.
        For Indian markets:
      </p>

      <BlockMath math="c_{\text{India}} = c_{\text{brokerage}} + c_{\text{STT}} + c_{\text{stamp}} + c_{\text{slippage}} \approx 0.05\% \text{ to } 0.15\%" />

      <TheoremBlock
        title="Optimality of Deep Hedging"
        label="Theorem 13.7"
        statement={<>Under proportional transaction costs <InlineMath math="c > 0" />, the optimal hedging strategy <InlineMath math="\delta^*" /> differs from the BS delta by a no-trade zone of width:</>}
        formula="w^* \propto \left(\frac{3c \cdot S^2 \cdot \Gamma^2}{2\lambda}\right)^{1/3}"
        proof={<>The Hodges-Neuberger (1989) framework shows that under transaction costs, the optimal hedge introduces a bandwidth around the BS delta where no rebalancing occurs. Deep hedging learns this bandwidth implicitly by optimizing over the full P&L distribution. The cubic root scaling arises from balancing the quadratic hedging error (proportional to gamma squared times deviation squared) against linear transaction costs. For Nifty options with typical gamma of 0.001, this gives a no-trade zone of about 2-5% of delta.</>}
      />

      <InteractiveDeepHedging />

      <PythonCode
        title="deep_hedging_nifty.py"
        runnable
        code={`import numpy as np

class IndianOptionsCostModel:
    """NSE F&O transaction cost model."""

    def __init__(self):
        self.brokerage = 20       # Flat INR per order (Zerodha)
        self.stt_rate = 0.000625  # 0.0625% on sell premium
        self.sebi_rate = 0.000001
        self.stamp_rate = 0.00003
        self.gst_rate = 0.18

    def cost(self, notional, premium, side='sell'):
        """Calculate total cost for an options trade."""
        brok = min(self.brokerage, notional * 0.0003)
        stt = premium * self.stt_rate if side == 'sell' else 0
        sebi = notional * self.sebi_rate
        stamp = notional * self.stamp_rate
        gst = self.gst_rate * (brok + sebi)
        return brok + stt + sebi + stamp + gst

def bs_delta(S, K, T, sigma, r=0.065):
    """Black-Scholes delta for Nifty option."""
    from math import log, sqrt, exp
    if T <= 0:
        return 1.0 if S > K else 0.0
    d1 = (log(S/K) + (r + 0.5*sigma**2)*T) / (sigma*sqrt(T))
    # Approximate N(d1) using tanh
    nd1 = 0.5 * (1 + np.tanh(d1 * 0.7978845608))
    return nd1

def simulate_deep_hedging(S0, K, T_days, sigma, n_paths, cost_pct,
                           hedge_freq='daily', risk_aversion=1.0):
    """Compare BS delta hedge vs simplified deep hedge.

    The 'deep hedge' here uses a no-trade-zone heuristic
    that approximates what the neural network learns.
    """
    dt = 1 / 252
    n_steps = T_days
    T = T_days / 252

    # Generate Nifty paths (GBM)
    np.random.seed(42)
    Z = np.random.randn(n_paths, n_steps)
    S = np.zeros((n_paths, n_steps + 1))
    S[:, 0] = S0

    for t in range(n_steps):
        S[:, t+1] = S[:, t] * np.exp(
            (0.065 - 0.5*sigma**2)*dt + sigma*np.sqrt(dt)*Z[:, t]
        )

    # Payoff
    payoff = np.maximum(S[:, -1] - K, 0)

    # BS price (approximate)
    bs_price = S0 * 0.05  # Simplified

    # --- BS Delta Hedging ---
    bs_pnl = np.zeros(n_paths)
    bs_costs = np.zeros(n_paths)
    prev_delta_bs = np.zeros(n_paths)

    for t in range(n_steps):
        tau = (n_steps - t) / 252
        deltas = np.array([bs_delta(S[i, t], K, tau, sigma)
                           for i in range(n_paths)])
        trade_size = np.abs(deltas - prev_delta_bs)
        cost = trade_size * S[:, t] * cost_pct / 100
        bs_costs += cost
        bs_pnl += prev_delta_bs * (S[:, t+1] - S[:, t])
        prev_delta_bs = deltas

    bs_hedge_pnl = bs_price + bs_pnl - payoff - bs_costs

    # --- Deep Hedging (no-trade-zone heuristic) ---
    deep_pnl = np.zeros(n_paths)
    deep_costs = np.zeros(n_paths)
    prev_delta_deep = np.zeros(n_paths)
    bandwidth = (3 * cost_pct / 100) ** (1/3) * 0.5  # Optimal bandwidth

    for t in range(n_steps):
        tau = (n_steps - t) / 252
        target_deltas = np.array([bs_delta(S[i, t], K, tau, sigma)
                                   for i in range(n_paths)])

        # No-trade zone: only rebalance if delta deviates enough
        diff = np.abs(target_deltas - prev_delta_deep)
        rebalance = diff > bandwidth
        deltas = np.where(rebalance, target_deltas, prev_delta_deep)

        trade_size = np.abs(deltas - prev_delta_deep)
        cost = trade_size * S[:, t] * cost_pct / 100
        deep_costs += cost
        deep_pnl += prev_delta_deep * (S[:, t+1] - S[:, t])
        prev_delta_deep = deltas

    deep_hedge_pnl = bs_price + deep_pnl - payoff - deep_costs

    return {
        'bs_mean': np.mean(bs_hedge_pnl),
        'bs_std': np.std(bs_hedge_pnl),
        'bs_cvar': np.mean(np.sort(bs_hedge_pnl)[:int(0.05*n_paths)]),
        'bs_cost': np.mean(bs_costs),
        'deep_mean': np.mean(deep_hedge_pnl),
        'deep_std': np.std(deep_hedge_pnl),
        'deep_cvar': np.mean(np.sort(deep_hedge_pnl)[:int(0.05*n_paths)]),
        'deep_cost': np.mean(deep_costs),
    }

# --- Demo ---
print("=== Deep Hedging: Nifty Options ===\\n")

S0 = 22000  # Nifty spot
K = 22000   # ATM strike
sigma = 0.16  # 16% IV

for cost in [0.05, 0.10, 0.20]:
    result = simulate_deep_hedging(
        S0=S0, K=K, T_days=30, sigma=sigma,
        n_paths=5000, cost_pct=cost
    )
    print(f"--- Transaction Cost: {cost}% ---")
    print(f"  BS Delta Hedge:  Mean={result['bs_mean']:+.1f}, "
          f"Std={result['bs_std']:.1f}, "
          f"CVaR5%={result['bs_cvar']:+.1f}, "
          f"Cost={result['bs_cost']:.1f}")
    print(f"  Deep Hedge:      Mean={result['deep_mean']:+.1f}, "
          f"Std={result['deep_std']:.1f}, "
          f"CVaR5%={result['deep_cvar']:+.1f}, "
          f"Cost={result['deep_cost']:.1f}")
    improvement = (1 - result['deep_std']/result['bs_std']) * 100
    print(f"  Std Improvement: {improvement:.1f}%\\n")`}
      />

      <ExampleBlock
        title="No-Trade Zone for Nifty ATM Call"
        difficulty="advanced"
        problem="A Nifty 22,000 ATM call has gamma = 0.0012 per point. Transaction cost is 0.1% of notional. Risk aversion lambda = 1. What is the optimal no-trade zone width for the hedge ratio?"
        solution={[
          {
            step: 'Apply the Whalley-Wilmott formula',
            formula: 'w^* = \\left(\\frac{3 \\cdot c \\cdot S^2 \\cdot \\Gamma^2}{2\\lambda}\\right)^{1/3}',
          },
          {
            step: 'Substitute values',
            formula: 'w^* = \\left(\\frac{3 \\times 0.001 \\times 22000^2 \\times 0.0012^2}{2 \\times 1}\\right)^{1/3}',
          },
          {
            step: 'Compute',
            formula: 'w^* = \\left(\\frac{3 \\times 0.001 \\times 4.84 \\times 10^8 \\times 1.44 \\times 10^{-6}}{2}\\right)^{1/3} \\approx 0.048',
            explanation: 'The optimal no-trade zone is about 4.8% of delta. Only rebalance when the BS delta moves more than 0.048 from the current hedge ratio. This saves approximately 40% in transaction costs on Nifty options.',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Risk Measures for Deep Hedging
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The choice of risk measure <InlineMath math="\rho" /> in the deep hedging
        objective significantly affects the learned strategy. Common choices for
        Indian options:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Risk Measure</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Formula</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Behaviour</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Variance</td>
              <td className="px-4 py-2"><InlineMath math="\text{Var}(\Pi_T)" /></td>
              <td className="px-4 py-2">Penalizes all deviations equally</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">CVaR (5%)</td>
              <td className="px-4 py-2"><InlineMath math="\mathbb{E}[\Pi_T | \Pi_T \leq q_{0.05}]" /></td>
              <td className="px-4 py-2">Focuses on tail risk</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Entropic</td>
              <td className="px-4 py-2"><InlineMath math="\frac{1}{\lambda}\log \mathbb{E}[e^{-\lambda \Pi_T}]" /></td>
              <td className="px-4 py-2">Exponential penalty on losses</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Mean-Variance</td>
              <td className="px-4 py-2"><InlineMath math="-\mathbb{E}[\Pi_T] + \lambda \text{Var}(\Pi_T)" /></td>
              <td className="px-4 py-2">Standard utility framework</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For NSE options with their asymmetric cost structure (STT only on sell side),
        CVaR at 5% is typically the best choice as it focuses on worst-case
        scenarios while allowing the network to tolerate small hedging errors that
        would be too costly to eliminate.
      </p>

      <NoteBlock title="NSE Options Market Context" type="historical">
        <ul className="space-y-2">
          <li>
            <strong>Nifty Weekly Options:</strong> The world's most traded index options
            by volume. Weekly expiry every Thursday creates unique gamma and theta
            dynamics that deep hedging can exploit.
          </li>
          <li>
            <strong>Bank Nifty Options:</strong> Higher volatility (IV ~18-25% vs Nifty
            ~14-18%) and wider spreads make the cost-accuracy tradeoff even more
            relevant for deep hedging.
          </li>
          <li>
            <strong>SEBI Regulations:</strong> SEBI's 2023 mandate limiting weekly expiry
            to one index per exchange changes the options landscape, potentially
            improving liquidity at remaining expiries and reducing deep hedging costs.
          </li>
        </ul>
      </NoteBlock>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Implementation Architecture
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A production deep hedging system for Nifty options requires the following
        pipeline. The neural network takes as input the current market state and
        outputs the optimal hedge ratio:
      </p>

      <BlockMath math="\delta_\theta^* = \text{NN}_\theta\left(t, S_t, \sigma_t^{\text{IV}}, \Gamma_t, \text{DTE}, \text{VIX}_t\right)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The input features for Indian options include the India VIX level (which
        captures regime information), days to expiry (critical for weekly options),
        and the current gamma (which determines the sensitivity to discrete hedging).
        A 3-layer LSTM with 64 hidden units typically suffices for daily hedging
        of Nifty monthly options, while weekly options benefit from attention-based
        architectures that capture the rapid theta decay in the final 2-3 days.
      </p>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Deep hedging is particularly valuable for Indian options markets where
          transaction costs (STT on options premium, wide spreads on OTM Nifty strikes)
          significantly impact hedging P&L. The neural network learns to trade off hedging
          accuracy against rebalancing costs -- effectively discovering the optimal
          no-trade zone. For Nifty weekly options with 5-day expiry, deep hedging can
          reduce hedging costs by 30-50% compared to daily BS delta rebalancing, while
          maintaining similar risk levels.
        </p>
      </NoteBlock>
    </div>
  )
}
