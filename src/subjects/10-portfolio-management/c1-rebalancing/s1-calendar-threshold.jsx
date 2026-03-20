import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveRebalancing() {
  const [threshold, setThreshold] = useState(5)
  const [calendarFreq, setCalendarFreq] = useState(21)
  const [driftRate, setDriftRate] = useState(0.5)

  const days = 252
  const calendarRebalances = Math.floor(days / calendarFreq)
  const expectedDrift = driftRate * Math.sqrt(calendarFreq / 252) * 100
  const thresholdRebalances = Math.round(days * driftRate * 0.01 / (threshold / 100))

  const calendarTC = calendarRebalances * 15
  const thresholdTC = thresholdRebalances * 15

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Calendar vs Threshold Rebalancing
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Compare rebalancing strategies for an Indian equity portfolio over one year.
      </p>

      <div className="mb-4 grid grid-cols-3 gap-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Threshold Band: +/-{threshold}%</span>
          <input type="range" min="1" max="15" step="1" value={threshold}
            onChange={e => setThreshold(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Calendar: Every {calendarFreq} days</span>
          <input type="range" min="5" max="63" step="1" value={calendarFreq}
            onChange={e => setCalendarFreq(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Drift Rate: {driftRate.toFixed(1)}</span>
          <input type="range" min="0.1" max="2.0" step="0.1" value={driftRate}
            onChange={e => setDriftRate(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center text-xs">
        <div className="rounded-lg bg-indigo-50 p-4 dark:bg-indigo-900/30">
          <div className="text-sm font-bold text-indigo-700 dark:text-indigo-300">Calendar</div>
          <div className="mt-1 text-gray-600 dark:text-gray-400">Rebalances: <span className="font-bold text-indigo-600">{calendarRebalances}</span></div>
          <div className="text-gray-600 dark:text-gray-400">Expected TC: <span className="font-bold text-indigo-600">{calendarTC} bps</span></div>
          <div className="text-gray-600 dark:text-gray-400">Max Drift: <span className="font-bold text-indigo-600">{expectedDrift.toFixed(1)}%</span></div>
        </div>
        <div className="rounded-lg bg-amber-50 p-4 dark:bg-amber-900/30">
          <div className="text-sm font-bold text-amber-700 dark:text-amber-300">Threshold</div>
          <div className="mt-1 text-gray-600 dark:text-gray-400">Rebalances: <span className="font-bold text-amber-600">~{thresholdRebalances}</span></div>
          <div className="text-gray-600 dark:text-gray-400">Expected TC: <span className="font-bold text-amber-600">{thresholdTC} bps</span></div>
          <div className="text-gray-600 dark:text-gray-400">Max Drift: <span className="font-bold text-amber-600">{threshold}%</span></div>
        </div>
      </div>
    </div>
  )
}

export default function CalendarThreshold() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Calendar vs Threshold Rebalancing
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Portfolio rebalancing is the process of realigning portfolio weights to target allocations
        after market movements cause drift. For Indian investors, the two primary approaches are
        calendar-based rebalancing (trading at fixed intervals) and threshold-based rebalancing
        (trading when drift exceeds a band). Each approach involves different trade-offs between
        tracking error, transaction costs, and tax efficiency under Indian tax law.
      </p>

      <DefinitionBlock
        title="Portfolio Drift"
        label="Definition 10.1"
        definition="Portfolio drift measures how far current weights have deviated from target weights due to differential asset returns. For asset i, drift is Δwᵢ = wᵢ,actual - wᵢ,target. Total portfolio drift is measured as ||Δw|| = Σᵢ|wᵢ,actual - wᵢ,target|."
        notation="Δw = drift vector, ||Δw||₁ = L1 norm (total absolute drift)"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Calendar Rebalancing
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Calendar rebalancing trades at fixed intervals regardless of drift magnitude.
        Common frequencies for Indian portfolios:
      </p>
      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4">
        <li><strong>Monthly:</strong> Best tracking but highest TC (~15 bps x 12 = 180 bps/year)</li>
        <li><strong>Quarterly:</strong> Good balance, aligns with MF NAV reporting</li>
        <li><strong>Semi-annually:</strong> Common for retail investors, lower TC</li>
        <li><strong>Annually:</strong> Tax-efficient (LTCG after 1 year), minimal TC</li>
      </ul>

      <BlockMath math="\text{Expected drift after } \Delta t \text{ days: } E[\|\Delta \mathbf{w}\|] \approx \sigma_w \sqrt{\Delta t / 252}" />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Threshold (Band) Rebalancing
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Threshold rebalancing triggers a trade only when any asset&rsquo;s weight drifts beyond
        a specified band around its target. This is more efficient as it only trades when needed:
      </p>

      <BlockMath math="\text{Rebalance if } |w_{i,\text{actual}} - w_{i,\text{target}}| > \delta_i \text{ for any } i" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The optimal threshold <InlineMath math="\delta^*" /> depends on the transaction cost
        rate <InlineMath math="c" />, volatility <InlineMath math="\sigma" />, and risk
        aversion <InlineMath math="\lambda" />:
      </p>

      <BlockMath math="\delta^* \approx \left(\frac{3c}{2\lambda\sigma^2}\right)^{1/3}" />

      <TheoremBlock
        title="No-Trade Region (Constant Proportional TC)"
        label="Theorem 10.1"
        statement="Under proportional transaction costs c, the optimal rebalancing policy has a no-trade region around each target weight. For asset i, no trade occurs when w_target,i - δ_i ≤ w_actual,i ≤ w_target,i + δ_i. When the weight exits the band, trade only enough to bring it to the edge of the band (not back to target)."
        proof="This follows from the Merton (1971) and Davis-Norman (1990) analysis of optimal consumption-investment with transaction costs. The no-trade region is characterized by the free boundary of the corresponding variational inequality."
      />

      <InteractiveRebalancing />

      <PythonCode
        title="rebalancing_backtest.py"
        runnable
        code={`import numpy as np

np.random.seed(42)

# Simulate 3-asset Indian portfolio: Nifty 50, G-Sec, Gold
assets = ['Nifty 50', 'G-Sec 10Y', 'Gold MCX']
target = np.array([0.60, 0.30, 0.10])
n = len(assets)

# Daily return parameters (annualized)
mu = np.array([0.12, 0.07, 0.08]) / 252
sigma = np.array([0.22, 0.06, 0.15]) / np.sqrt(252)
corr = np.array([[1.0, -0.1, 0.1], [-0.1, 1.0, 0.15], [0.1, 0.15, 1.0]])
cov = np.outer(sigma, sigma) * corr

T = 252 * 5  # 5 years
tc_rate = 0.0015  # 15 bps per trade

# Generate returns
returns = np.random.multivariate_normal(mu, cov, T)

def simulate_rebalancing(returns, target, strategy, param):
    n = len(target)
    T = len(returns)
    weights = target.copy()
    portfolio_value = 1.0
    total_tc = 0
    n_rebal = 0
    values = [1.0]

    for t in range(T):
        # Apply returns
        new_values = weights * (1 + returns[t])
        portfolio_value = np.sum(new_values)
        weights = new_values / portfolio_value

        # Check rebalancing condition
        rebalance = False
        if strategy == 'calendar' and (t + 1) % param == 0:
            rebalance = True
        elif strategy == 'threshold':
            drift = np.max(np.abs(weights - target))
            if drift > param:
                rebalance = True

        if rebalance:
            tc = tc_rate * np.sum(np.abs(weights - target)) * portfolio_value
            total_tc += tc
            portfolio_value -= tc
            weights = target.copy()
            n_rebal += 1

        values.append(portfolio_value)

    values = np.array(values)
    ann_ret = (values[-1] / values[0]) ** (252 / T) - 1
    ann_vol = np.std(np.diff(np.log(values))) * np.sqrt(252)
    max_dd = np.min(values / np.maximum.accumulate(values) - 1)

    return {
        'return': ann_ret, 'vol': ann_vol, 'maxdd': max_dd,
        'tc': total_tc, 'n_rebal': n_rebal, 'final': values[-1]
    }

# Compare strategies
strategies = [
    ('No Rebalancing', 'calendar', 999999),
    ('Monthly Calendar', 'calendar', 21),
    ('Quarterly Calendar', 'calendar', 63),
    ('Annual Calendar', 'calendar', 252),
    ('Threshold 3%', 'threshold', 0.03),
    ('Threshold 5%', 'threshold', 0.05),
    ('Threshold 10%', 'threshold', 0.10),
]

print("=== Rebalancing Strategy Comparison (5-Year Backtest) ===")
print(f"Portfolio: 60% Nifty 50, 30% G-Sec, 10% Gold")
print(f"TC rate: {tc_rate*10000:.0f} bps per rebalance")
print(f"\\n{'Strategy':<22} {'Ann Ret':>8} {'Vol':>8} {'MaxDD':>8} {'#Rebal':>8} {'TC(bps)':>8}")
print("-" * 65)

for name, strategy, param in strategies:
    result = simulate_rebalancing(returns, target, strategy, param)
    print(f"{name:<22} {result['return']:>8.2%} {result['vol']:>8.2%} "
          f"{result['maxdd']:>8.2%} {result['n_rebal']:>8} {result['tc']*10000:>8.1f}")`}
      />

      <ExampleBlock
        title="Optimal Threshold for a 60/30/10 Indian Portfolio"
        difficulty="intermediate"
        problem="A retail investor holds 60% Nifty 50 (vol=22%), 30% G-Sec (vol=6%), 10% Gold (vol=15%). Transaction cost is 15 bps. Risk aversion $\\lambda = 2$. Find the optimal rebalancing threshold."
        solution={[
          {
            step: 'Compute portfolio drift volatility',
            formula: '\\sigma_w \\approx \\sqrt{\\sum_i w_i^2 \\sigma_i^2} \\approx \\sqrt{0.36 \\times 0.0484 + 0.09 \\times 0.0036 + 0.01 \\times 0.0225} \\approx 0.138',
            explanation: 'The drift volatility measures how fast weights drift from targets.',
          },
          {
            step: 'Apply optimal threshold formula',
            formula: '\\delta^* = \\left(\\frac{3c}{2\\lambda\\sigma_w^2}\\right)^{1/3} = \\left(\\frac{3 \\times 0.0015}{2 \\times 2 \\times 0.019}\\right)^{1/3}',
          },
          {
            step: 'Compute',
            formula: '\\delta^* = (0.059)^{1/3} \\approx 0.039 = 3.9\\%',
            explanation: 'A ~4% threshold band is optimal, meaning rebalance when any asset drifts more than 4% from target.',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Hybrid Approaches
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Many Indian fund managers use hybrid strategies:
      </p>
      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4">
        <li><strong>Calendar + Threshold:</strong> Check monthly, rebalance only if drift &gt; 3%</li>
        <li><strong>Cash-flow rebalancing:</strong> Use SIP inflows to buy underweight assets</li>
        <li><strong>Partial rebalancing:</strong> Trade halfway back to target to reduce TC</li>
        <li><strong>Tax-aware timing:</strong> Wait for LTCG eligibility (1 year) before selling</li>
      </ul>

      <NoteBlock title="Practical Tips for Indian Investors" type="tip">
        <ul className="space-y-1 list-disc list-inside">
          <li>Use SIP date as natural rebalancing point -- redirect inflows to underweight assets</li>
          <li>Zerodha/Kite allows basket orders for systematic multi-asset rebalancing</li>
          <li>Annual rebalancing in March aligns with tax year for harvest LTCG exemption</li>
          <li>For large portfolios (&gt;INR 1 Cr), quarterly threshold (5%) is usually optimal</li>
          <li>Monitor LTCG vs STCG implications before each rebalance (15% STCG vs 10% LTCG)</li>
        </ul>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Calendar rebalancing is simpler but can be wasteful (trading when drift is small) or
          slow (missing large drifts). Threshold rebalancing is more efficient, with an optimal
          band of ~3-5% for typical Indian multi-asset portfolios. The best practical approach
          combines both: check monthly, rebalance only if drift exceeds 3-5%, and use SIP
          cash flows for opportunistic rebalancing.
        </p>
      </NoteBlock>
    </div>
  )
}
