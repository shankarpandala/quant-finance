import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveMonteCarloTest() {
  const [nPermutations, setNPermutations] = useState(1000)
  const [observedSharpe, setObservedSharpe] = useState(1.5)
  const [significance, setSignificance] = useState(0.05)

  const nullMean = 0
  const nullStd = 0.5
  const zScore = (observedSharpe - nullMean) / nullStd
  const pValue = Math.max(0.001, Math.min(0.999, 1 - 0.5 * (1 + Math.tanh(zScore * 0.7))))
  const isSignificant = pValue < significance

  const barData = []
  for (let s = -1; s <= 3; s += 0.2) {
    const density = Math.exp(-0.5 * ((s - nullMean) / nullStd) ** 2) / (nullStd * Math.sqrt(2 * Math.PI))
    barData.push({ sharpe: s, density })
  }
  const maxDensity = Math.max(...barData.map(d => d.density))

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Monte Carlo Permutation Test
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Test whether an observed Sharpe ratio from a Nifty strategy is statistically
        significant against a null distribution of randomized trades.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Observed Sharpe = {observedSharpe.toFixed(2)}</span>
          <input type="range" min="0" max="3" step="0.1" value={observedSharpe}
            onChange={e => setObservedSharpe(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Permutations = {nPermutations}</span>
          <input type="range" min="100" max="10000" step="100" value={nPermutations}
            onChange={e => setNPermutations(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Significance Level = {(significance * 100).toFixed(0)}%</span>
          <input type="range" min="0.01" max="0.1" step="0.01" value={significance}
            onChange={e => setSignificance(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 520 180" className="w-full max-w-xl mx-auto block" aria-label="Permutation null distribution">
        {barData.map((d, i) => {
          const x = 50 + (d.sharpe + 1) * 110
          const h = (d.density / maxDensity) * 100
          const isRight = d.sharpe >= observedSharpe
          return (
            <rect key={i} x={x} y={140 - h} width="8" height={h}
              fill={isRight ? '#ef4444' : '#6366f1'} opacity="0.5" rx="1" />
          )
        })}

        <line x1={50 + (observedSharpe + 1) * 110} y1="30"
          x2={50 + (observedSharpe + 1) * 110} y2="140"
          stroke="#dc2626" strokeWidth="2" strokeDasharray="4,3" />
        <text x={50 + (observedSharpe + 1) * 110} y="25" textAnchor="middle"
          className="text-[9px] font-bold" fill="#dc2626">
          Observed: {observedSharpe.toFixed(2)}
        </text>

        <line x1="40" y1="140" x2="500" y2="140" stroke="#9ca3af" strokeWidth="1" />
        <text x="270" y="158" textAnchor="middle" className="text-[9px]" fill="#6b7280">Sharpe Ratio (null distribution)</text>

        <text x="400" y="55" textAnchor="middle"
          className={`text-[11px] font-bold ${isSignificant ? 'fill-green-600' : 'fill-red-500'}`}>
          p = {pValue.toFixed(3)}
        </text>
        <text x="400" y="70" textAnchor="middle"
          className={`text-[10px] ${isSignificant ? 'fill-green-600' : 'fill-red-500'}`}>
          {isSignificant ? 'SIGNIFICANT' : 'NOT SIGNIFICANT'}
        </text>
      </svg>
    </div>
  )
}

export default function MonteCarloValidation() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Monte Carlo Permutation Tests
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Even after walk-forward and purged CV validation, a strategy may appear
        profitable due to chance. Monte Carlo permutation tests provide a
        distribution-free method to assess statistical significance by comparing
        the observed strategy performance against a null distribution generated
        by randomizing the trade signals. This is particularly important for
        Indian market strategies where the Nifty 50 has exhibited strong bull
        trends that can inflate apparent alpha.
      </p>

      <DefinitionBlock
        title="Monte Carlo Permutation Test"
        label="Definition 8.8"
        definition="A Monte Carlo permutation test estimates the probability of observing a test statistic at least as extreme as the observed value under the null hypothesis of no predictive skill. It does so by randomly permuting the relationship between signals and returns B times and computing the test statistic for each permutation."
        notation={<>The p-value is <InlineMath math="p = \frac{1 + \sum_{b=1}^{B} \mathbf{1}[\hat{\theta}_b \geq \hat{\theta}_{\text{obs}}]}{1 + B}" /> where <InlineMath math="\hat{\theta}_b" /> is the statistic from the <InlineMath math="b" />-th permutation.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Why Permutation Tests for Indian Markets
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Indian equities exhibit several properties that make parametric tests unreliable:
        fat-tailed return distributions (kurtosis {'>'} 5 for many Nifty stocks), strong
        autocorrelation from institutional flows, and regime-dependent volatility. The
        permutation test makes no distributional assumptions -- it only requires
        exchangeability under the null:
      </p>

      <BlockMath math="H_0: \text{The strategy signal } s_t \text{ has no predictive power for } r_{t+1}" />
      <BlockMath math="H_1: \text{The observed Sharpe ratio } \hat{S} \text{ reflects genuine alpha}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Under <InlineMath math="H_0" />, the mapping between signals and returns is
        arbitrary, so permuting signals should produce similar performance. The observed
        Sharpe ratio must exceed the permuted distribution to reject{' '}
        <InlineMath math="H_0" />.
      </p>

      <TheoremBlock
        title="Permutation Test Validity"
        label="Theorem 8.6"
        statement={<>A Monte Carlo permutation test with <InlineMath math="B" /> permutations controls the Type I error rate at level <InlineMath math="\alpha" /> if:</>}
        formula="P(\text{reject } H_0 \mid H_0 \text{ true}) \leq \frac{\lceil \alpha(1+B) \rceil}{1+B} \leq \alpha"
        proof={<>Under the null, all <InlineMath math="B+1" /> arrangements (observed + permuted) are equally likely. The observed test statistic has rank uniformly distributed on <InlineMath math="\{1, \ldots, B+1\}" />. Rejecting when the observed statistic is in the top <InlineMath math="\lceil \alpha(1+B) \rceil" /> positions yields exact size control. For <InlineMath math="B = 999" /> and <InlineMath math="\alpha = 0.05" />, we reject if fewer than 50 permuted statistics exceed the observed value.</>}
      />

      <InteractiveMonteCarloTest />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Types of Permutation Schemes
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Method</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">What is randomized</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Preserves</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Signal Shuffle</td>
              <td className="px-4 py-2">Trade signals</td>
              <td className="px-4 py-2">Return distribution</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Return Shuffle</td>
              <td className="px-4 py-2">Return time series</td>
              <td className="px-4 py-2">Signal structure</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Block Bootstrap</td>
              <td className="px-4 py-2">Contiguous blocks</td>
              <td className="px-4 py-2">Serial correlation</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Circular Bootstrap</td>
              <td className="px-4 py-2">Circular shift</td>
              <td className="px-4 py-2">Autocorrelation + distribution</td>
            </tr>
          </tbody>
        </table>
      </div>

      <PythonCode
        title="mc_permutation_nifty.py"
        runnable
        code={`import numpy as np

def sharpe_ratio(returns, rf_annual=0.065):
    """Annualized Sharpe with Indian risk-free rate (RBI repo)."""
    rf_daily = (1 + rf_annual) ** (1/252) - 1
    excess = returns - rf_daily
    if np.std(excess) == 0:
        return 0.0
    return np.mean(excess) / np.std(excess) * np.sqrt(252)

def mc_permutation_test(returns, signals, n_perms=1000,
                        block_size=None, seed=42):
    """Monte Carlo permutation test for strategy significance."""
    rng = np.random.RandomState(seed)

    strat_returns = signals * returns
    observed_sharpe = sharpe_ratio(strat_returns)

    null_sharpes = []
    n = len(signals)

    for _ in range(n_perms):
        if block_size:
            n_blocks = n // block_size + 1
            perm_idx = np.concatenate([
                np.arange(start, min(start + block_size, n))
                for start in rng.choice(n - block_size + 1, n_blocks)
            ])[:n]
            perm_signals = signals[perm_idx]
        else:
            perm_signals = rng.permutation(signals)

        perm_returns = perm_signals * returns
        null_sharpes.append(sharpe_ratio(perm_returns))

    null_sharpes = np.array(null_sharpes)
    p_value = (1 + np.sum(null_sharpes >= observed_sharpe)) / (1 + n_perms)

    return {
        'observed_sharpe': observed_sharpe,
        'null_mean': np.mean(null_sharpes),
        'null_std': np.std(null_sharpes),
        'null_95pct': np.percentile(null_sharpes, 95),
        'null_99pct': np.percentile(null_sharpes, 99),
        'p_value': p_value,
        'n_perms': n_perms,
    }

# --- Demo: Nifty 50 momentum strategy ---
np.random.seed(42)
n_days = 1260

returns = np.random.normal(0.12/252, 0.16/np.sqrt(252), n_days)

lookback = 20
cum_ret = np.array([np.sum(returns[max(0,i-lookback):i])
                     for i in range(n_days)])
signals = np.where(cum_ret > 0, 1.0, -1.0)

print("=== Monte Carlo Permutation Test ===")
print("Strategy: 20-day Nifty Momentum")
print(f"Data: {n_days} trading days\\n")

result = mc_permutation_test(returns, signals, n_perms=2000)
print("--- Simple Shuffle ---")
print(f"Observed Sharpe: {result['observed_sharpe']:.3f}")
print(f"Null Mean:       {result['null_mean']:.3f}")
print(f"Null Std:        {result['null_std']:.3f}")
print(f"Null 95th pct:   {result['null_95pct']:.3f}")
print(f"Null 99th pct:   {result['null_99pct']:.3f}")
print(f"p-value:         {result['p_value']:.4f}")
print(f"Significant at 5%: {'YES' if result['p_value'] < 0.05 else 'NO'}")

print("\\n--- Block Shuffle (block=21 trading days) ---")
result_block = mc_permutation_test(returns, signals, n_perms=2000,
                                    block_size=21)
print(f"Observed Sharpe: {result_block['observed_sharpe']:.3f}")
print(f"Null Mean:       {result_block['null_mean']:.3f}")
print(f"p-value:         {result_block['p_value']:.4f}")
print(f"Significant at 5%: {'YES' if result_block['p_value'] < 0.05 else 'NO'}")

n_strategies = 20
bonferroni_threshold = 0.05 / n_strategies
print(f"\\n--- Multiple Testing Correction ---")
print(f"Strategies tested: {n_strategies}")
print(f"Bonferroni threshold: {bonferroni_threshold:.4f}")
print(f"Still significant: {'YES' if result['p_value'] < bonferroni_threshold else 'NO'}")`}
      />

      <ExampleBlock
        title="Testing a Nifty Bank Pairs Strategy"
        difficulty="intermediate"
        problem="A pairs trading strategy on HDFC Bank / ICICI Bank shows an observed Sharpe of 1.8. With 5,000 permutations, 42 permuted Sharpes exceed 1.8. Is this significant at the 1% level?"
        solution={[
          {
            step: 'Compute the p-value',
            formula: 'p = \\frac{1 + 42}{1 + 5000} = \\frac{43}{5001} = 0.0086',
            explanation: 'The +1 in numerator and denominator ensures the p-value is well-defined.',
          },
          {
            step: 'Compare with significance level',
            formula: 'p = 0.0086 < \\alpha = 0.01',
          },
          {
            step: 'Conclude',
            formula: '\\text{Reject } H_0 \\text{ at } \\alpha = 0.01',
            explanation: 'The HDFC-ICICI pairs strategy Sharpe of 1.8 is unlikely due to chance. However, apply multiple testing correction if other pairs were also tested.',
          },
        ]}
      />

      <NoteBlock title="Multiple Testing Warning" type="warning">
        <p>
          If you tested <InlineMath math="M" /> strategies before selecting the best one,
          apply Bonferroni correction: <InlineMath math="\alpha_{\text{adj}} = \alpha / M" />.
          For Indian market quants screening across Nifty 200 stocks with 10 parameter
          combos, <InlineMath math="M = 2000" />, making the threshold{' '}
          <InlineMath math="0.05 / 2000 = 0.000025" />. The Holm-Bonferroni step-down
          procedure provides a less conservative alternative.
        </p>
      </NoteBlock>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Deflated Sharpe Ratio
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The Deflated Sharpe Ratio (DSR) adjusts the observed Sharpe for the number
        of strategies tested, providing a more direct test than Bonferroni correction.
        It computes the probability that the observed Sharpe exceeds the expected
        maximum Sharpe under the null of no skill:
      </p>

      <BlockMath math="\text{DSR} = P\left[\hat{S} > \hat{S}_0 \cdot \sqrt{V[\hat{S}]}\right], \quad \hat{S}_0 \approx (1 - \gamma) \Phi^{-1}\left(1 - \frac{1}{N}\right)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="N" /> is the number of strategies tried,{' '}
        <InlineMath math="\gamma" /> is Euler's constant, and{' '}
        <InlineMath math="\Phi^{-1}" /> is the inverse normal CDF. For Indian market
        quants who typically test 50-200 parameter combinations, the DSR threshold
        is approximately Sharpe {'>'} 2.0 for a strategy to be considered genuine.
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Strategies Tested</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Expected Max Sharpe (null)</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Min Required Sharpe</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">10</td>
              <td className="px-4 py-2">1.28</td>
              <td className="px-4 py-2">~1.5</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">50</td>
              <td className="px-4 py-2">1.74</td>
              <td className="px-4 py-2">~2.0</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">200</td>
              <td className="px-4 py-2">2.10</td>
              <td className="px-4 py-2">~2.5</td>
            </tr>
            <tr>
              <td className="px-4 py-2">1000</td>
              <td className="px-4 py-2">2.52</td>
              <td className="px-4 py-2">~3.0</td>
            </tr>
          </tbody>
        </table>
      </div>

      <NoteBlock title="Validation Pipeline Summary" type="historical">
        <ul className="space-y-2">
          <li>
            <strong>Step 1:</strong> Walk-Forward Analysis -- verify OOS performance across
            rolling windows covering multiple Indian market regimes.
          </li>
          <li>
            <strong>Step 2:</strong> Purged K-Fold CV -- for ML strategies, validate with
            proper temporal purging aligned to label horizons.
          </li>
          <li>
            <strong>Step 3:</strong> Monte Carlo Permutation Test -- confirm the observed
            Sharpe is statistically significant using block permutation.
          </li>
          <li>
            <strong>Step 4:</strong> Deflated Sharpe Ratio -- adjust for multiple testing
            to ensure the strategy is not a fluke from parameter mining.
          </li>
          <li>
            <strong>Step 5:</strong> Paper trade on NSE for 3-6 months before allocating
            real capital, comparing live fills with backtest expectations.
          </li>
        </ul>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Monte Carlo permutation tests are the final gate before deploying capital. A
          strategy that passes walk-forward analysis and purged CV but fails the
          permutation test (p {'>'} 0.05 after multiple testing correction) should not be
          traded. For Indian markets, always use <strong>block permutation</strong> with
          block size of 21 trading days (one month) to preserve the autocorrelation
          structure inherent in NSE order flow. Combine with the Deflated Sharpe Ratio
          to account for the number of strategies tested during development.
        </p>
      </NoteBlock>
    </div>
  )
}
