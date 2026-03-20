import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveTurnoverDecay() {
  const [halfLife, setHalfLife] = useState(21)
  const [rebalFreq, setRebalFreq] = useState(5)
  const [tcBps, setTcBps] = useState(30)
  const [grossAlpha, setGrossAlpha] = useState(15)

  const decayPerDay = Math.pow(0.5, 1 / halfLife)
  const icRetained = Math.pow(decayPerDay, rebalFreq)
  const annualTurnover = 252 / rebalFreq * 0.3
  const annualTC = annualTurnover * 2 * tcBps / 10000 * 100
  const netAlpha = grossAlpha * icRetained - annualTC
  const optimalRebal = Math.round(halfLife * 0.7)
  const breakeven = grossAlpha / (annualTurnover * 2 * tcBps / 10000 * 100 / grossAlpha)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Turnover vs. Signal Decay Tradeoff
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Find the optimal rebalancing frequency by balancing signal decay against transaction
        costs for an NSE equity strategy.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Signal Half-Life: {halfLife} days</span>
          <input type="range" min="1" max="120" step="1" value={halfLife}
            onChange={e => setHalfLife(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Rebal. Every: {rebalFreq} days</span>
          <input type="range" min="1" max="63" step="1" value={rebalFreq}
            onChange={e => setRebalFreq(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Transaction Cost: {tcBps} bps</span>
          <input type="range" min="5" max="100" step="5" value={tcBps}
            onChange={e => setTcBps(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Gross Alpha: {grossAlpha}% p.a.</span>
          <input type="range" min="2" max="40" step="1" value={grossAlpha}
            onChange={e => setGrossAlpha(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">IC Retained</p>
          <p className="text-lg font-bold text-blue-800 dark:text-blue-200">{(icRetained * 100).toFixed(0)}%</p>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
          <p className="text-xs font-semibold text-purple-700 dark:text-purple-300">Ann. Turnover</p>
          <p className="text-lg font-bold text-purple-800 dark:text-purple-200">{annualTurnover.toFixed(0)}%</p>
        </div>
        <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/30">
          <p className="text-xs font-semibold text-red-700 dark:text-red-300">Ann. TC Cost</p>
          <p className="text-lg font-bold text-red-800 dark:text-red-200">{annualTC.toFixed(1)}%</p>
        </div>
        <div className={`rounded-lg p-3 ${netAlpha > 0 ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'}`}>
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Net Alpha</p>
          <p className={`text-lg font-bold ${netAlpha > 0 ? 'text-green-800 dark:text-green-200' : 'text-red-600'}`}>
            {netAlpha.toFixed(1)}%
          </p>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">Optimal Rebal.</p>
          <p className="text-lg font-bold text-amber-800 dark:text-amber-200">{optimalRebal} days</p>
        </div>
      </div>
    </div>
  )
}

export default function TurnoverDecay() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Turnover and Alpha Decay
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Every alpha signal decays over time as the market incorporates the information. The
        challenge is rebalancing frequently enough to capture the signal before it decays,
        but not so frequently that transaction costs eat the alpha. For NSE strategies, where
        impact costs and STT (Securities Transaction Tax) are significant, this tradeoff
        determines strategy profitability.
      </p>

      <DefinitionBlock
        title="Alpha Decay (Signal Half-Life)"
        label="Definition 2.3"
        definition="Alpha decay is the rate at which a signal's predictive power diminishes over time. The half-life is the number of days until the IC drops to 50% of its initial value. Fast-decaying signals (half-life < 5 days) require frequent rebalancing; slow signals (half-life > 60 days) can be traded monthly."
        notation="IC(t) = IC(0) \cdot e^{-\lambda t}, \quad t_{1/2} = \frac{\ln 2}{\lambda}"
      />

      <DefinitionBlock
        title="Portfolio Turnover"
        label="Definition 2.4"
        definition="Portfolio turnover measures the fraction of the portfolio that changes at each rebalancing. One-sided turnover counts only buys (or only sells). Annual turnover of 100% means the entire portfolio is replaced once per year. High turnover strategies on NSE must account for STT, stamp duty, brokerage, and impact costs."
        notation="\text{Turnover}_t = \frac{1}{2}\sum_{i=1}^{N} |w_{i,t} - w_{i,t-1}^{+}|"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Turnover-Alpha Tradeoff
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Net alpha is the difference between gross alpha (which decays with less frequent
        rebalancing) and transaction costs (which increase with more frequent rebalancing):
      </p>

      <BlockMath math="\alpha_{\text{net}} = \alpha_{\text{gross}}(f) - c \cdot \text{TO}(f)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="f" /> is the rebalancing frequency,{' '}
        <InlineMath math="c" /> is the per-unit transaction cost, and{' '}
        <InlineMath math="\text{TO}(f)" /> is the annual turnover at frequency{' '}
        <InlineMath math="f" />. The optimal frequency maximizes net alpha.
      </p>

      <TheoremBlock
        title="Optimal Rebalancing Frequency"
        label="Theorem 2.3"
        statement="For a signal with exponential decay rate lambda and transaction cost c per unit of turnover, the optimal rebalancing period is approximately 70% of the signal half-life, balancing decay loss against transaction costs."
        formula="\Delta t^* \approx \sqrt{\frac{2c}{\lambda^2 \alpha_0}} \approx 0.7 \times t_{1/2}"
        proof="Model gross alpha as \alpha(f) = \alpha_0 \cdot (1 - e^{-\lambda/f}) / (\lambda/f) (average IC over rebalancing period) and turnover as TO \propto f. Net alpha is \alpha_{net}(f) = \alpha(f) - c \cdot f \cdot \tau, where \tau is per-rebalance turnover. Taking the derivative and setting to zero gives the optimal f. For exponential decay with \alpha_0 \cdot e^{-\lambda t}, the first-order approximation yields \Delta t^* \approx 0.7 \times t_{1/2} when costs are moderate relative to alpha."
      />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Signal Type</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Half-Life</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Optimal Rebal.</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Ann. Turnover</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">NSE Feasibility</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Intraday momentum</td>
              <td className="px-4 py-2">Minutes</td>
              <td className="px-4 py-2">Per-bar</td>
              <td className="px-4 py-2">&gt;5000%</td>
              <td className="px-4 py-2">Only via Zerodha API, co-lo</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Short-term reversal</td>
              <td className="px-4 py-2">3-5 days</td>
              <td className="px-4 py-2">Daily</td>
              <td className="px-4 py-2">800-1500%</td>
              <td className="px-4 py-2">High STT burden</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">12-1 Momentum</td>
              <td className="px-4 py-2">20-40 days</td>
              <td className="px-4 py-2">Weekly/Bi-weekly</td>
              <td className="px-4 py-2">200-400%</td>
              <td className="px-4 py-2">Sweet spot for NSE</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Value (P/B)</td>
              <td className="px-4 py-2">60-120 days</td>
              <td className="px-4 py-2">Monthly</td>
              <td className="px-4 py-2">50-150%</td>
              <td className="px-4 py-2">Low cost, patient capital</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveTurnoverDecay />

      <NoteBlock title="Indian Transaction Cost Structure" type="info">
        <ul className="space-y-2">
          <li><strong>STT (Delivery):</strong> 0.1% on buy and sell = 20 bps round trip</li>
          <li><strong>STT (Intraday):</strong> 0.025% on sell only = 2.5 bps</li>
          <li><strong>Zerodha Brokerage:</strong> INR 20 flat or 0.03% for intraday</li>
          <li><strong>Stamp Duty:</strong> 0.015% on buy side</li>
          <li><strong>GST:</strong> 18% on brokerage</li>
          <li><strong>Market Impact:</strong> 5-50 bps depending on stock liquidity and order size</li>
        </ul>
        <p className="mt-2">
          Total round-trip costs for delivery trades on NSE: approximately 25-40 bps for
          large-cap stocks, 50-100 bps for mid/small-cap.
        </p>
      </NoteBlock>

      <PythonCode
        title="turnover_decay_analysis.py"
        runnable
        code={`import numpy as np
import pandas as pd

# Signal decay and turnover optimization for NSE strategy
np.random.seed(42)

# Signal parameters
signal_half_lives = {'Momentum_12m': 30, 'Value_PB': 90, 'Quality_ROE': 60,
                     'Reversal_5d': 5, 'Earnings_Surprise': 15}

# NSE cost assumptions
stt_delivery = 0.001  # 0.1% each way
brokerage = 0.0003    # Zerodha intraday
stamp_duty = 0.00015  # Buy side
impact_cost = 0.003   # 30 bps for mid-cap
total_one_way = stt_delivery + brokerage + stamp_duty + impact_cost  # ~46 bps

print("=== Turnover and Alpha Decay Analysis (NSE) ===")
print(f"One-way transaction cost: {total_one_way*10000:.0f} bps")
print(f"Round-trip cost: {total_one_way*2*10000:.0f} bps\\n")

# Analyze each signal
rebal_frequencies = [1, 5, 10, 21, 42, 63, 126, 252]  # days

print(f"{'Signal':<20} {'Half-Life':>10} {'Opt.Rebal':>10} {'Gross Alpha':>12} {'Net Alpha':>10} {'Ann.TO':>8}")
print("-" * 75)

for signal_name, half_life in signal_half_lives.items():
    decay_rate = np.log(2) / half_life
    initial_ic = 0.06

    best_net = -999
    best_freq = 0

    for freq in rebal_frequencies:
        # Average IC over rebalancing period
        avg_ic = initial_ic * (1 - np.exp(-decay_rate * freq)) / (decay_rate * freq)

        # IC to alpha (simplified)
        gross_alpha = avg_ic * np.sqrt(500 * 252/freq) * 0.15 * 100  # % annual

        # Turnover (assume 30% per rebalance for portfolio)
        per_rebal_turnover = 0.30
        annual_turnover = (252 / freq) * per_rebal_turnover
        annual_tc = annual_turnover * 2 * total_one_way * 100  # % annual

        net_alpha = gross_alpha - annual_tc

        if net_alpha > best_net:
            best_net = net_alpha
            best_freq = freq
            best_gross = gross_alpha
            best_to = annual_turnover

    print(f"{signal_name:<20} {half_life:>8}d {best_freq:>8}d {best_gross:>11.1f}% {best_net:>9.1f}% {best_to:>7.0f}%")

# --- Detailed analysis for Momentum ---
print(f"\\n--- Detailed: Momentum 12-1 (Half-life = 30 days) ---")
print(f"{'Rebal (days)':>12} {'Avg IC':>8} {'Gross Alpha':>12} {'Ann. TC':>8} {'Net Alpha':>10}")
for freq in rebal_frequencies:
    hl = 30
    dr = np.log(2) / hl
    avg_ic = 0.06 * (1 - np.exp(-dr * freq)) / (dr * freq)
    gross = avg_ic * np.sqrt(500 * 252/freq) * 0.15 * 100
    annual_to = (252 / freq) * 0.30
    tc = annual_to * 2 * total_one_way * 100
    net = gross - tc
    marker = " <-- optimal" if freq == 21 else ""
    print(f"{freq:>12}d {avg_ic:>8.4f} {gross:>11.1f}% {tc:>7.1f}% {net:>9.1f}%{marker}")`}
      />

      <ExampleBlock
        title="Optimal Rebalancing for an NSE Momentum Strategy"
        difficulty="intermediate"
        problem="A 12-1 momentum signal on NSE 500 has IC = 0.06, half-life = 30 days, and round-trip costs of 50 bps (including STT, impact). If per-rebalance turnover is 30%, should you rebalance weekly (5 days) or monthly (21 days)?"
        solution={[
          {
            step: 'Weekly: compute net alpha',
            formula: '\\text{IC}_{\\text{avg}} = 0.06 \\times \\frac{1 - e^{-0.023 \\times 5}}{0.023 \\times 5} = 0.057',
            explanation: 'IC decay over 5 days is minimal (retaining 95% of signal strength).',
          },
          {
            step: 'Weekly costs',
            formula: '\\text{TC} = 52 \\times 0.30 \\times 2 \\times 0.005 = 15.6\\% \\text{ per year}',
            explanation: 'Weekly rebalancing generates very high turnover costs.',
          },
          {
            step: 'Monthly comparison',
            formula: '\\text{IC}_{\\text{avg}} \\approx 0.048, \\quad \\text{TC} = 12 \\times 0.30 \\times 0.01 = 3.6\\%',
            explanation: 'Monthly rebalancing loses ~20% of IC but saves 12% in costs. Net alpha is higher monthly. The optimal point is ~21 days (approximately 70% of the 30-day half-life).',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Turnover Reduction Techniques
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Several techniques reduce turnover without significantly sacrificing alpha:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Technique</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Mechanism</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">TO Reduction</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Alpha Impact</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Buffer bands</td>
              <td className="px-4 py-2">Only trade when signal changes by &gt; threshold</td>
              <td className="px-4 py-2">30-50%</td>
              <td className="px-4 py-2">Minimal (5-10% IC loss)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Signal smoothing</td>
              <td className="px-4 py-2">EWMA of signal over time</td>
              <td className="px-4 py-2">20-40%</td>
              <td className="px-4 py-2">Small (delays signal)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Partial rebalancing</td>
              <td className="px-4 py-2">Trade only fraction of target change</td>
              <td className="px-4 py-2">50-70%</td>
              <td className="px-4 py-2">Moderate (slower convergence)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">TC penalty in optimizer</td>
              <td className="px-4 py-2">Add turnover cost to objective</td>
              <td className="px-4 py-2">30-50%</td>
              <td className="px-4 py-2">Optimal (net-alpha aware)</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Staggered rebalancing</td>
              <td className="px-4 py-2">Rebalance 1/N of portfolio each period</td>
              <td className="px-4 py-2">N-fold reduction</td>
              <td className="px-4 py-2">Smoother execution</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Buffer bands are particularly effective for NSE strategies. Instead of rebalancing
        whenever the target weight changes, only trade when the current weight deviates
        from the target by more than a threshold:
      </p>

      <BlockMath math="\text{Trade if } |w_i^{\text{actual}} - w_i^{\text{target}}| > \delta, \quad \delta \approx \sqrt{\frac{2c}{h \cdot \text{IC}^2}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="c" /> is the one-way cost and <InlineMath math="h" /> is
        the holding period in days. For NSE delivery trades with 46 bps one-way cost and
        a 21-day momentum signal, the optimal buffer is approximately 2-3% weight deviation.
        This simple rule typically reduces turnover by 30-40% while preserving 90-95% of
        gross alpha.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Breakeven IC Analysis
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The breakeven IC is the minimum signal strength needed to cover transaction costs:
      </p>

      <BlockMath math="\text{IC}_{\text{breakeven}} = \frac{c \times \text{TO}_{\text{annual}}}{\sigma_{\text{active}} \times \sqrt{N \times f}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For a typical NSE strategy with 46 bps round-trip costs, 300% annual turnover,
        500 stocks, and monthly rebalancing, the breakeven IC is approximately 0.025-0.030.
        Any signal with IC below this threshold will lose money after costs, regardless of
        its statistical significance.
      </p>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Alpha decay and transaction costs are locked in a fundamental tension. For Indian
          markets with high STT and impact costs, the optimal rebalancing frequency is
          typically <strong>weekly to monthly</strong> for most equity signals. Use buffer
          bands and TC-aware optimization to reduce turnover by 30-50% while preserving most
          alpha. Always compute the <strong>breakeven IC</strong> -- the minimum IC needed for
          the signal to be profitable after all costs. For delivery-based NSE strategies,
          this is typically IC &gt; 0.025-0.030. Intraday signals require even higher IC to
          overcome NSE's cost structure.
        </p>
      </NoteBlock>
    </div>
  )
}
