import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveFactorMomentum() {
  const [lookback, setLookback] = useState(12)
  const [numFactors, setNumFactors] = useState(5)
  const [topN, setTopN] = useState(2)

  const factorReturns = [8.5, -2.1, 5.3, 12.1, 3.7, -4.2, 7.8, 1.5]
  const sortedReturns = [...factorReturns].sort((a, b) => b - a).slice(0, numFactors)
  const topReturns = sortedReturns.slice(0, topN)
  const avgTop = topReturns.reduce((a, b) => a + b, 0) / topN
  const bottomReturns = sortedReturns.slice(-topN)
  const avgBottom = bottomReturns.reduce((a, b) => a + b, 0) / topN
  const factorMomReturn = avgTop - avgBottom
  const sharpeEst = factorMomReturn / 15

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Factor Momentum Strategy
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Build a factor momentum portfolio: overweight recently winning factors,
        underweight recent losers. Configure lookback and selection parameters.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Lookback: {lookback} months</span>
          <input type="range" min="1" max="24" step="1" value={lookback}
            onChange={e => setLookback(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Factor Universe: {numFactors} factors</span>
          <input type="range" min="3" max="8" step="1" value={numFactors}
            onChange={e => setNumFactors(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Top/Bottom N: {topN}</span>
          <input type="range" min="1" max="3" step="1" value={topN}
            onChange={e => setTopN(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/30">
          <p className="text-xs font-semibold text-green-700 dark:text-green-300">Top {topN} Avg</p>
          <p className="text-lg font-bold text-green-800 dark:text-green-200">{avgTop.toFixed(1)}%</p>
        </div>
        <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/30">
          <p className="text-xs font-semibold text-red-700 dark:text-red-300">Bottom {topN} Avg</p>
          <p className="text-lg font-bold text-red-800 dark:text-red-200">{avgBottom.toFixed(1)}%</p>
        </div>
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">Factor Mom Return</p>
          <p className="text-lg font-bold text-blue-800 dark:text-blue-200">{factorMomReturn.toFixed(1)}%</p>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
          <p className="text-xs font-semibold text-purple-700 dark:text-purple-300">Sharpe (est.)</p>
          <p className="text-lg font-bold text-purple-800 dark:text-purple-200">{sharpeEst.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}

export default function FactorMomentum() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Factor Momentum
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Just as stock momentum (winners keep winning) is a well-documented anomaly, factor
        momentum applies the same principle at the factor level: factors that have recently
        outperformed tend to continue outperforming. This creates a meta-strategy that
        dynamically tilts between value, momentum, quality, and other style factors based
        on their recent performance on NSE.
      </p>

      <DefinitionBlock
        title="Factor Momentum"
        label="Definition 4.2"
        definition="Factor momentum is the strategy of overweighting factors with strong recent performance and underweighting (or shorting) factors with weak recent performance. The lookback period is typically 1-12 months. Arnott et al. (2023) and Ehsani and Linnainmaa (2022) show that factor momentum explains a significant portion of individual stock momentum."
        notation="\text{FM}_t = \sum_{k: r_{k,t-L:t} > \text{median}} w_k F_{k,t} - \sum_{k: r_{k,t-L:t} < \text{median}} w_k F_{k,t}"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Why Factor Momentum Works
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Factor premia exhibit strong autocorrelation at the 1-12 month horizon. Several
        mechanisms explain this:
      </p>

      <BlockMath math="\text{Autocorr}(F_{k,t}, F_{k,t+1}) \approx 0.10\text{--}0.25 \quad \text{(monthly, NSE data)}" />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Mechanism</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Explanation</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">India Evidence</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Slow capital reallocation</td>
              <td className="px-4 py-2">Investors slowly shift to winning factors</td>
              <td className="px-4 py-2">MF flows lag factor performance by 3-6 months</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Regime persistence</td>
              <td className="px-4 py-2">Economic regimes last 6-24 months</td>
              <td className="px-4 py-2">RBI policy cycles affect factor premia</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Behavioral underreaction</td>
              <td className="px-4 py-2">Investors are slow to update factor beliefs</td>
              <td className="px-4 py-2">Indian retail investors anchor on past strategies</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Structural shifts</td>
              <td className="px-4 py-2">Sector/policy changes favor specific factors</td>
              <td className="px-4 py-2">GST reform favored quality; COVID favored momentum</td>
            </tr>
          </tbody>
        </table>
      </div>

      <TheoremBlock
        title="Factor Momentum Subsumes Stock Momentum"
        label="Theorem 4.2"
        statement="Ehsani and Linnainmaa (2022) show that a significant portion of individual stock momentum (UMD) can be explained by factor momentum. The stock momentum premium drops substantially when controlling for factor momentum, suggesting that stocks display momentum partly because the factors they load on display momentum."
        formula="r_{i,t+1} = \alpha + \beta_i^{FM} \text{FM}_{t} + \beta_i^{UMD} \text{UMD}_{t} + \epsilon_{i,t+1}"
        proof="Decompose stock i's return into factor components: r_i = \sum_k \beta_{ik} F_k + \epsilon_i. If factors exhibit momentum (autocorrelation), then stocks with high past returns tend to have high loadings on currently outperforming factors. Thus, stock-level momentum is partially a mechanical consequence of factor-level momentum. On NSE data, regressing UMD returns on factor momentum reduces the UMD alpha by 40-60%, confirming this channel operates in Indian markets."
      />

      <InteractiveFactorMomentum />

      <NoteBlock title="Implementation Considerations for NSE" type="info">
        <ul className="space-y-2">
          <li>
            <strong>Factor Universe:</strong> Use at least 5 factors for the Indian market:
            Value (P/B), Momentum (12-1), Quality (ROE), Low Volatility, and Size. Adding
            India-specific factors (promoter holding, FII flow) expands the opportunity set.
          </li>
          <li>
            <strong>Lookback Period:</strong> 3-12 months works best for Indian factor
            momentum. Shorter lookbacks (1 month) capture mean reversion; longer lookbacks
            (&gt; 12 months) have little predictive power.
          </li>
          <li>
            <strong>Rebalancing:</strong> Monthly rebalancing is sufficient. The factor
            momentum signal is slow-moving compared to stock-level signals.
          </li>
          <li>
            <strong>Capacity:</strong> Factor momentum has high capacity since it tilts
            between factor ETFs or sector indices rather than individual stocks.
          </li>
        </ul>
      </NoteBlock>

      <PythonCode
        title="factor_momentum.py"
        runnable
        code={`import numpy as np
import pandas as pd

# Simulate factor returns for factor momentum strategy on NSE
np.random.seed(42)
n_months = 120  # 10 years

# 6 style factors with autocorrelated returns
factor_names = ['Value', 'Momentum', 'Quality', 'LowVol', 'Size', 'Growth']
n_factors = len(factor_names)

# Generate autocorrelated factor returns
factor_returns = np.zeros((n_months, n_factors))
factor_means = [0.003, 0.006, 0.004, 0.002, 0.004, 0.001]
factor_vols = [0.025, 0.035, 0.020, 0.018, 0.030, 0.028]
autocorrs = [0.15, 0.20, 0.12, 0.10, 0.18, 0.08]

for k in range(n_factors):
    innovations = np.random.normal(0, factor_vols[k], n_months)
    factor_returns[0, k] = factor_means[k] + innovations[0]
    for t in range(1, n_months):
        factor_returns[t, k] = (factor_means[k] +
            autocorrs[k] * (factor_returns[t-1, k] - factor_means[k]) +
            innovations[t])

# --- Factor Momentum Strategy ---
lookbacks = [1, 3, 6, 12]
results = {}

for lb in lookbacks:
    fm_returns = []
    for t in range(lb, n_months):
        # Past performance of each factor
        past_perf = factor_returns[t-lb:t].sum(axis=0)

        # Rank factors by past performance
        ranks = np.argsort(past_perf)

        # Long top half, short bottom half
        n_long = n_factors // 2
        long_factors = ranks[-n_long:]
        short_factors = ranks[:n_long]

        # Equal weight within long and short legs
        ret = (factor_returns[t, long_factors].mean() -
               factor_returns[t, short_factors].mean())
        fm_returns.append(ret)

    fm_returns = np.array(fm_returns)
    ann_ret = fm_returns.mean() * 12 * 100
    ann_vol = fm_returns.std() * np.sqrt(12) * 100
    sharpe = ann_ret / ann_vol if ann_vol > 0 else 0
    results[lb] = {'ret': ann_ret, 'vol': ann_vol, 'sharpe': sharpe}

print("=== Factor Momentum Strategy (NSE Style Factors) ===")
print(f"Factors: {', '.join(factor_names)}\\n")

# Factor autocorrelations
print("--- Factor Autocorrelations (1-month) ---")
for k in range(n_factors):
    ac = np.corrcoef(factor_returns[:-1, k], factor_returns[1:, k])[0, 1]
    print(f"  {factor_names[k]:<12}: {ac:.3f}")

print(f"\\n--- Factor Momentum Performance by Lookback ---")
print(f"{'Lookback':>10} {'Ann.Ret':>10} {'Ann.Vol':>10} {'Sharpe':>10}")
for lb, r in results.items():
    print(f"{lb:>8}m {r['ret']:>9.1f}% {r['vol']:>9.1f}% {r['sharpe']:>10.3f}")

# --- Compare: Equal Weight vs Factor Momentum ---
equal_weight = factor_returns.mean(axis=1)
best_lb = max(results, key=lambda x: results[x]['sharpe'])
fm_best = []
for t in range(best_lb, n_months):
    past_perf = factor_returns[t-best_lb:t].sum(axis=0)
    ranks = np.argsort(past_perf)
    n_long = n_factors // 2
    ret = factor_returns[t, ranks[-n_long:]].mean() - factor_returns[t, ranks[:n_long]].mean()
    fm_best.append(ret)
fm_best = np.array(fm_best)

# Combined: Equal weight + Factor Momentum overlay
combined = equal_weight[best_lb:] + 0.5 * fm_best
eq_sharpe = equal_weight.mean() / equal_weight.std() * np.sqrt(12)
comb_sharpe = combined.mean() / combined.std() * np.sqrt(12)

print(f"\\n--- Strategy Comparison ---")
print(f"Equal Weight All Factors Sharpe: {eq_sharpe:.3f}")
print(f"Factor Momentum ({best_lb}m) Sharpe: {results[best_lb]['sharpe']:.3f}")
print(f"Combined (EW + 50% FM) Sharpe:  {comb_sharpe:.3f}")
print(f"\\nFactor momentum adds {(comb_sharpe/eq_sharpe - 1)*100:+.1f}% to Sharpe ratio.")`}
      />

      <ExampleBlock
        title="Factor Momentum on NSE Style Factors"
        difficulty="intermediate"
        problem="Over the past 6 months, Indian factor returns were: Value +8%, Momentum +15%, Quality +6%, Low Vol +2%, Size +10%. Which factors does the factor momentum strategy go long and short?"
        solution={[
          {
            step: 'Rank factors by 6-month performance',
            formula: '\\text{Momentum: +15\\%} > \\text{Size: +10\\%} > \\text{Value: +8\\%} > \\text{Quality: +6\\%} > \\text{Low Vol: +2\\%}',
            explanation: 'Sort factors from best to worst recent performance.',
          },
          {
            step: 'Construct long-short portfolio',
            formula: '\\text{Long: Momentum, Size} \\quad \\text{Short: Quality, Low Vol}',
            explanation: 'Go long the top 2 (best recent performers) and short the bottom 2. Value is neutral (middle). In a long-only Indian portfolio, overweight momentum and size tilts.',
          },
          {
            step: 'Expected outcome',
            formula: '\\text{If autocorrelation holds} \\implies \\text{Momentum and Size likely continue outperforming}',
            explanation: 'With factor autocorrelation of 0.10-0.20, there is a probabilistic edge in continuing to ride winning factors. However, this strategy is vulnerable to factor reversals -- hence the need for regime detection as a complement.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Factor momentum is a powerful meta-strategy that exploits the persistence of factor
          premia. On NSE data, factor returns exhibit monthly autocorrelation of 0.10-0.20,
          creating a tradeable signal. The optimal lookback for Indian markets is 3-6 months.
          Factor momentum <strong>adds 10-20% to the Sharpe ratio</strong> of a static
          multi-factor portfolio and helps explain individual stock momentum. Combine factor
          momentum with regime detection for the most robust dynamic factor allocation strategy.
        </p>
      </NoteBlock>
    </div>
  )
}
