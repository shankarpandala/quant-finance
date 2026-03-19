import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractivePutHedge() {
  const [putStrike, setPutStrike] = useState(95)
  const [premium, setPremium] = useState(2.5)
  const [hedgeRatio, setHedgeRatio] = useState(50)
  const [niftyReturn, setNiftyReturn] = useState(-15)

  const portfolioReturn = niftyReturn
  const putPayoff = Math.max(0, -(niftyReturn - (putStrike - 100))) * hedgeRatio / 100
  const hedgedReturn = portfolioReturn + putPayoff - premium * hedgeRatio / 100
  const unhedgedReturn = portfolioReturn

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Nifty Put Hedge Payoff
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Simulate hedging a Nifty portfolio with OTM put options.
      </p>
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Put Strike (% of spot): {putStrike}%</span>
          <input type="range" min="80" max="100" step="1" value={putStrike}
            onChange={e => setPutStrike(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Premium: {premium}%</span>
          <input type="range" min="0.5" max="8" step="0.5" value={premium}
            onChange={e => setPremium(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Hedge Ratio: {hedgeRatio}%</span>
          <input type="range" min="10" max="100" step="5" value={hedgeRatio}
            onChange={e => setHedgeRatio(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Nifty Return: {niftyReturn}%</span>
          <input type="range" min="-40" max="20" step="1" value={niftyReturn}
            onChange={e => setNiftyReturn(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>
      <div className="grid grid-cols-3 gap-3 text-center text-xs">
        <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/30">
          <div className="text-gray-500">Unhedged</div>
          <div className="text-lg font-bold text-red-600">{unhedgedReturn.toFixed(1)}%</div>
        </div>
        <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/30">
          <div className="text-gray-500">Hedged</div>
          <div className="text-lg font-bold text-green-600">{hedgedReturn.toFixed(1)}%</div>
        </div>
        <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30">
          <div className="text-gray-500">Protection Value</div>
          <div className="text-lg font-bold text-indigo-600">{(hedgedReturn - unhedgedReturn).toFixed(1)}%</div>
        </div>
      </div>
    </div>
  )
}

export default function TailHedging() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Tail Hedging with Nifty Puts
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Tail risk hedging protects portfolios against extreme market drawdowns using options. For Indian investors, Nifty 50 put options traded on NSE provide the most liquid hedging instrument. The challenge is balancing protection cost against portfolio drag -- buying puts is expensive insurance that reduces returns in normal markets.
      </p>

      <DefinitionBlock
        title="Tail Risk Hedge"
        label="Definition 10.7"
        definition="A tail risk hedge is a portfolio position designed to generate positive returns during extreme market drawdowns (typically > 2 standard deviations). Common instruments include OTM put options, VIX calls, and put spreads. The hedge provides convex payoff: limited cost in normal times but large payout during crashes."
        notation="OTM = Out-of-The-Money, typically 5-15% below current level"
      />

      <BlockMath math="\text{Hedged Return} = R_{\text{portfolio}} + \max(0, K - S_T) \cdot h - \text{Premium} \cdot h" />

      <BlockMath math="\text{Hedge Ratio} = h^* = -\frac{\text{Cov}(R_p, R_{\text{put}})}{\text{Var}(R_{\text{put}})}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Nifty 50 put options are the primary tail hedging instrument for Indian equity portfolios. They trade on NSE with monthly and weekly expiries, with strikes available in 50-point increments. The most liquid OTM puts are 5-10% below the current level.
      </p>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The cost of tail hedging, or the insurance premium, typically ranges from 2-4% annualized for 5% OTM puts. This drag reduces portfolio returns in normal markets but provides substantial protection during crashes like the 38% Nifty drawdown in March 2020.
      </p>

      <TheoremBlock
        title="Optimal Put Strike"
        label="Theorem 10.6"
        statement="For a portfolio with expected return mu and volatility sigma, the optimal OTM put strike K* that minimizes total portfolio variance (including hedge cost) satisfies: K* = S·exp(-sigma·sqrt(T)·Phi_inv(1-alpha) + (r-sigma^2/2)T), where alpha is the target protection level."
        proof="This follows from minimizing the variance of the hedged portfolio return. The optimal strike balances the cost of deeper OTM puts against their lower payoff probability."
      />

      <InteractivePutHedge />

      <PythonCode
        title="tail_hedging_nifty.py"
        runnable
        code={`import numpy as np

np.random.seed(42)

# Tail hedging simulation for Nifty 50 portfolio
T = 252 * 10  # 10 years
S0 = 20000  # Nifty starting level
mu = 0.12 / 252
sigma = 0.18 / np.sqrt(252)

# Simulate Nifty path with occasional crashes
returns = np.random.normal(mu, sigma, T)
# Add crash events
crash_days = np.random.choice(T, 5, replace=False)
for d in crash_days:
    crash_len = np.random.randint(5, 20)
    returns[d:d+crash_len] = np.random.normal(-0.03, 0.04, min(crash_len, T-d))

nifty = S0 * np.cumprod(1 + returns)

# Strategy: buy monthly 5% OTM puts
put_otm = 0.05
monthly_premium = 0.003  # 30 bps monthly = ~3.6% annual

unhedged = np.cumprod(1 + returns)
hedged_returns = returns.copy()

for month_start in range(0, T, 21):
    month_end = min(month_start + 21, T)
    strike = nifty[month_start] * (1 - put_otm)
    
    for t in range(month_start, month_end):
        hedged_returns[t] -= monthly_premium / 21  # Daily premium cost
        if nifty[t] < strike:
            payoff = (strike - nifty[t]) / nifty[month_start]
            hedged_returns[t] += payoff * 0.05  # Small daily payoff

hedged = np.cumprod(1 + hedged_returns)

# Metrics
def metrics(rets):
    cum = np.cumprod(1 + rets)
    ann_ret = (cum[-1] ** (252/T) - 1)
    ann_vol = np.std(rets) * np.sqrt(252)
    max_dd = np.min(cum / np.maximum.accumulate(cum) - 1)
    return ann_ret, ann_vol, max_dd

ur, uv, ud = metrics(returns)
hr, hv, hd = metrics(hedged_returns)

print("=== Tail Hedging Analysis (Nifty 50, 10 Years) ===")
print(f"{'Metric':<15} {'Unhedged':>12} {'Hedged':>12}")
print("-" * 42)
print(f"{'Ann Return':<15} {ur:>12.2%} {hr:>12.2%}")
print(f"{'Ann Vol':<15} {uv:>12.2%} {hv:>12.2%}")
print(f"{'Max Drawdown':<15} {ud:>12.2%} {hd:>12.2%}")
print(f"{'Sharpe':<15} {ur/uv:>12.3f} {hr/hv:>12.3f}")
print(f"\\nHedge cost (annual): ~{monthly_premium*12*100:.1f}%")
print(f"Drawdown reduction: {(1-hd/ud)*100:.1f}%")`}
      />

      <ExampleBlock
        title="Nifty Put Hedge Cost Analysis"
        difficulty="intermediate"
        problem="A portfolio manager holds INR 100 Cr in Nifty 50 stocks. She buys monthly 5% OTM Nifty puts at 1.5% premium. During a 20% crash, what is the net portfolio return?"
        solution={[
          {
            step: 'Put payoff',
            formula: '\text{Payoff} = \max(0, 0.95S - 0.80S) = 0.15S = 15\%',
            explanation: 'The 5% OTM put pays 15% when Nifty falls 20%.',
          },
          {
            step: 'Net hedged return',
            formula: 'R_{\text{hedged}} = -20\% + 15\% - 1.5\% = -6.5\%',
            explanation: 'The hedge reduces the 20% loss to 6.5%.',
          },
          {
            step: 'Protection value',
            formula: '\text{Value} = 20\% - 6.5\% = 13.5\% \text{ on INR 100 Cr} = \text{INR 13.5 Cr}',
            explanation: 'The put hedge saved INR 13.5 crore against a 1.5% annual cost.',
          }
        ]}
      />

      

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Tail hedging with Nifty puts provides convex protection against market crashes. The key trade-off is the annual premium cost (2-4%) versus the insurance value during crashes. For Indian portfolios, a systematic tail hedging program using 5% OTM monthly puts with 50% hedge ratio offers a good balance of cost and protection.
        </p>
      </NoteBlock>
    </div>
  )
}
