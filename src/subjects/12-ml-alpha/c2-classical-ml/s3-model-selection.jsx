import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveModelSelection() {
  const [nFolds, setNFolds] = useState(5)
  const [embargoGap, setEmbargoGap] = useState(10)
  const [purgeWindow, setPurgeWindow] = useState(20)

  const totalDays = 252 * 3
  const testSize = Math.floor(totalDays / nFolds)
  const trainSize = totalDays - testSize - embargoGap - purgeWindow
  const trainRatio = trainSize / totalDays * 100
  const effectiveN = trainSize * (1 - purgeWindow / trainSize * 0.3)

  const folds = Array.from({ length: nFolds }, (_, i) => {
    const testStart = i * testSize
    const testEnd = testStart + testSize
    return { fold: i + 1, testStart, testEnd, trainSize: Math.max(0, trainSize) }
  })

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Purged K-Fold Cross-Validation
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Configure CV parameters for validating an ML model on 3 years of Nifty 50 data.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>K Folds = {nFolds}</span>
          <input type="range" min="3" max="10" step="1" value={nFolds}
            onChange={e => setNFolds(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Embargo Gap = {embargoGap} days</span>
          <input type="range" min="0" max="30" step="1" value={embargoGap}
            onChange={e => setEmbargoGap(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Purge Window = {purgeWindow} days</span>
          <input type="range" min="0" max="60" step="5" value={purgeWindow}
            onChange={e => setPurgeWindow(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 400 100" className="w-full max-w-lg mx-auto block">
        {folds.slice(0, Math.min(nFolds, 6)).map((f, i) => {
          const y = 10 + i * 15
          const scale = 380 / totalDays
          return (
            <g key={i}>
              <rect x="10" y={y} width={380} height="10" fill="#e5e7eb" rx="2" />
              <rect x={10 + f.testStart * scale} y={y}
                width={testSize * scale} height="10" fill="#ef4444" rx="2" opacity="0.6" />
              {embargoGap > 0 && (
                <rect x={10 + f.testEnd * scale} y={y}
                  width={embargoGap * scale} height="10" fill="#fbbf24" rx="2" opacity="0.5" />
              )}
              <text x="395" y={y + 8} className="text-[7px]" fill="#6b7280">F{f.fold}</text>
            </g>
          )
        })}
        <text x="10" y="98" className="text-[8px]" fill="#6b7280">
          Train (gray) | Test (red) | Embargo (yellow)
        </text>
      </svg>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded bg-gray-100 p-2 dark:bg-gray-800">
          <span className="text-gray-500">Train Size</span>
          <p className="font-bold text-indigo-600">{trainSize} days ({trainRatio.toFixed(0)}%)</p>
        </div>
        <div className="rounded bg-gray-100 p-2 dark:bg-gray-800">
          <span className="text-gray-500">Test Size</span>
          <p className="font-bold text-red-500">{testSize} days</p>
        </div>
        <div className="rounded bg-gray-100 p-2 dark:bg-gray-800">
          <span className="text-gray-500">Effective N</span>
          <p className="font-bold text-green-600">{effectiveN.toFixed(0)}</p>
        </div>
      </div>
    </div>
  )
}

export default function ModelSelection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Model Selection and Validation
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Model selection in financial ML requires specialized techniques that respect
        the temporal structure and overlapping nature of financial data. Standard
        cross-validation produces inflated performance estimates due to information
        leakage. This section covers purged cross-validation, combinatorial purged
        CV, and the deflated Sharpe ratio for selecting ML models in Indian equity
        trading strategies.
      </p>

      <DefinitionBlock
        title="Purged K-Fold Cross-Validation"
        label="Definition 12.6"
        definition="Purged k-fold CV modifies standard k-fold by (1) removing (purging) training observations whose labels overlap with test observations in time, and (2) adding an embargo period after each test fold to prevent serial correlation leakage. This ensures the test set is truly out-of-sample with respect to information content."
        notation="\text{Train}_k^{purged} = \text{Train}_k \setminus \{i : T_i \cap T_{test} \neq \emptyset\} \setminus \{i : t_i \in [t_{test}^{end}, t_{test}^{end} + \delta]\}"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Information Leakage in Financial CV
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Standard k-fold CV leaks information through two channels:
      </p>

      <BlockMath math="\text{Leakage}_1: \exists\; i \in \text{Train},\; j \in \text{Test} : T_i \cap T_j \neq \emptyset" />

      <BlockMath math="\text{Leakage}_2: \exists\; i \in \text{Train} : t_i^{start} \in [t_{test}^{end}, t_{test}^{end} + \delta]" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The first is addressed by purging, the second by the embargo gap. Without
        these corrections, test accuracy is systematically overestimated.
      </p>

      <TheoremBlock
        title="Deflated Sharpe Ratio"
        label="Theorem 12.6"
        statement="When selecting the best strategy from N backtests, the probability that the best Sharpe ratio exceeds some threshold due to chance increases with N. The deflated Sharpe ratio adjusts for this multiple testing bias: DSR = P\left[\hat{SR} > SR^* | \hat{SR}_0 = 0, N \text{ trials}\right] where SR^* = \sqrt{V[\hat{SR}]} \cdot [(1-\gamma)Z^{-1}(1-\frac{1}{N}) + \gamma Z^{-1}(1-\frac{1}{N}e^{-1})]."
        proof="Under the null hypothesis that all strategies have zero expected Sharpe, the maximum observed Sharpe from N trials follows a Gumbel distribution. The DSR applies the Bonferroni-like correction: the probability that at least one of N trials exceeds threshold t is approximately 1 - (1 - P[SR > t])^N. The deflated SR computes the p-value after this correction."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Combinatorial Purged CV (CPCV)
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        CPCV generates all possible train/test combinations from N groups, creating
        multiple backtest paths:
      </p>

      <BlockMath math="\text{CPCV}(N, k) = \binom{N}{k} \text{ combinations, each using } k \text{ groups as test}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Each combination produces a distinct backtest. The distribution of backtested
        Sharpe ratios across all combinations provides a robust estimate of out-of-sample
        performance distribution.
      </p>

      <NoteBlock title="Model Selection Pitfalls in Indian Markets" type="historical">
        <ul className="space-y-1 text-sm">
          <li><strong>Survivorship Bias:</strong> Using only current Nifty constituents ignores
            delisted/removed stocks, inflating backtested returns</li>
          <li><strong>Regime Change:</strong> India's market microstructure changed significantly:
            T+2 to T+1 settlement (2023), algorithm co-location (2014), COVID circuit breakers</li>
          <li><strong>Data Snooping:</strong> Testing many factor combinations on the same Nifty
            history leads to false discoveries. Apply Bonferroni/BH correction</li>
          <li><strong>Look-ahead in Fundamentals:</strong> Ind-AS financial data has reporting lag --
            use announcement dates, not period-end dates</li>
        </ul>
      </NoteBlock>

      <InteractiveModelSelection />

      <PythonCode
        title="model_selection.py"
        runnable
        code={`import numpy as np

class PurgedKFoldCV:
    """Purged K-Fold CV for financial ML."""

    def __init__(self, n_splits=5, purge_window=20, embargo=10):
        self.n_splits = n_splits
        self.purge_window = purge_window
        self.embargo = embargo

    def split(self, n_samples):
        fold_size = n_samples // self.n_splits
        splits = []

        for k in range(self.n_splits):
            test_start = k * fold_size
            test_end = min(test_start + fold_size, n_samples)

            # Build train set with purge and embargo
            train_mask = np.ones(n_samples, dtype=bool)
            # Remove test set
            train_mask[test_start:test_end] = False
            # Purge: remove window before test
            purge_start = max(0, test_start - self.purge_window)
            train_mask[purge_start:test_start] = False
            # Embargo: remove window after test
            embargo_end = min(n_samples, test_end + self.embargo)
            train_mask[test_end:embargo_end] = False

            train_idx = np.where(train_mask)[0]
            test_idx = np.arange(test_start, test_end)

            splits.append((train_idx, test_idx))

        return splits

def deflated_sharpe_ratio(observed_sr, n_trials, n_obs, skew=0, kurt=3):
    """Compute deflated Sharpe ratio for multiple testing."""
    sr_std = np.sqrt((1 + 0.5 * observed_sr**2 -
                      skew * observed_sr +
                      (kurt - 3) / 4 * observed_sr**2) / (n_obs - 1))

    # Expected max SR under null
    euler_mascheroni = 0.5772
    max_z = ((1 - euler_mascheroni) * _norm_ppf(1 - 1/n_trials) +
             euler_mascheroni * _norm_ppf(1 - 1/(n_trials * np.e)))
    sr_threshold = max_z * sr_std

    # P-value
    z_stat = (observed_sr - sr_threshold) / sr_std
    p_value = _norm_cdf(z_stat)

    return {'deflated_sr': observed_sr - sr_threshold,
            'p_value': p_value,
            'sr_threshold': sr_threshold,
            'significant': p_value > 0.95}

def _norm_ppf(p):
    """Approximate inverse normal CDF."""
    if p <= 0: return -5
    if p >= 1: return 5
    t = np.sqrt(-2 * np.log(min(p, 1-p)))
    c = [2.515517, 0.802853, 0.010328]
    d = [1.432788, 0.189269, 0.001308]
    x = t - (c[0] + c[1]*t + c[2]*t**2) / (1 + d[0]*t + d[1]*t**2 + d[2]*t**3)
    return x if p > 0.5 else -x

def _norm_cdf(x):
    """Approximate normal CDF."""
    return 0.5 * (1 + np.tanh(np.sqrt(2/np.pi) * (x + 0.044715 * x**3)))

# Demo: Purged K-Fold for Nifty 50 model
n_samples = 756  # 3 years
cv = PurgedKFoldCV(n_splits=5, purge_window=20, embargo=10)
splits = cv.split(n_samples)

print("=" * 60)
print("  Purged K-Fold CV - Nifty 50 Alpha Model")
print("=" * 60)
print(f"\\nTotal samples: {n_samples} (3 years daily)")
print(f"Purge window: {cv.purge_window} days")
print(f"Embargo: {cv.embargo} days")
print(f"\\n{'Fold':<6} {'Train':>6} {'Test':>6} {'Purged':>8} {'Total Lost':>11}")
print("-" * 40)
for k, (train_idx, test_idx) in enumerate(splits):
    lost = n_samples - len(train_idx) - len(test_idx)
    print(f"  {k+1:<4} {len(train_idx):>6} {len(test_idx):>6} "
          f"{lost:>8} {lost:>11}")

# Deflated Sharpe test
print(f"\\n{'='*60}")
print(f"  Deflated Sharpe Ratio Test")
print(f"{'='*60}")
np.random.seed(42)
n_strategies = 50
observed_srs = np.random.normal(0, 1, n_strategies)
best_sr = np.max(observed_srs)

result = deflated_sharpe_ratio(best_sr, n_strategies, 756)
print(f"\\nStrategies tested:  {n_strategies}")
print(f"Best observed SR:   {best_sr:.3f}")
print(f"SR threshold:       {result['sr_threshold']:.3f}")
print(f"Deflated SR:        {result['deflated_sr']:.3f}")
print(f"P-value:            {result['p_value']:.3f}")
print(f"Significant:        {result['significant']}")`}
      />

      <ExampleBlock
        title="Detecting Overfitting with CPCV"
        difficulty="intermediate"
        problem="You test a Nifty alpha model using 5-fold purged CV. Fold accuracies are: 54.2%, 51.8%, 55.1%, 49.5%, 53.8%. The standard (non-purged) CV gives 57.3% average. Is the purged estimate reliable?"
        solution={[
          {
            step: 'Compute purged CV statistics',
            formula: '\\bar{A}_{purged} = \\frac{54.2 + 51.8 + 55.1 + 49.5 + 53.8}{5} = 52.88\\%',
            explanation: 'Average purged CV accuracy is 52.88%.',
          },
          {
            step: 'Compare with standard CV',
            formula: '\\Delta = 57.3\\% - 52.88\\% = 4.42\\%',
            explanation: 'Standard CV overestimates by 4.42 percentage points due to information leakage.',
          },
          {
            step: 'Assess fold variance',
            formula: '\\sigma_{folds} = 2.1\\%,\\; \\text{CV of folds} = 2.1/52.88 = 4.0\\%',
            explanation: 'High fold variance (49.5% to 55.1%) suggests the model is sensitive to market regime. Fold 4 (49.5%) likely hit a different regime.',
          },
          {
            step: 'Conclusion',
            formula: '\\text{Reliable estimate} \\approx 52.9\\%,\\; \\text{not } 57.3\\%',
            explanation: 'The purged estimate (52.9%) is the trustworthy number. This is still above 50% and potentially profitable for Nifty trading, but expectations should be calibrated to this level, not the inflated 57.3%.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Model selection in financial ML demands rigorous validation that prevents
          information leakage and corrects for multiple testing. Purged k-fold CV with
          embargo is the minimum standard for any Nifty/BSE alpha model. The deflated
          Sharpe ratio corrects for the multiple testing bias that arises from trying
          many strategies on the same data. Always report purged CV results, not
          standard CV, and apply multiple testing corrections when comparing more than
          a handful of model configurations.
        </p>
      </NoteBlock>
    </div>
  )
}
