import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractivePurgedCV() {
  const [nFolds, setNFolds] = useState(5)
  const [embargo, setEmbargo] = useState(10)
  const [holdingPeriod, setHoldingPeriod] = useState(20)
  const [totalDays, setTotalDays] = useState(1260)

  const foldSize = Math.floor(totalDays / nFolds)
  const effectiveTestSize = foldSize - embargo
  const purgedTrainSize = totalDays - foldSize - 2 * embargo
  const leakageWithout = Math.min(100, (holdingPeriod / foldSize * 100))
  const leakageWith = Math.max(0, ((holdingPeriod - embargo) / foldSize * 100))

  const chartW = 480, chartH = 80, padL = 40
  const scale = (chartW - padL) / totalDays

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Purged K-Fold Cross-Validation
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Visualize the embargo zones that prevent information leakage between train and test sets.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>K Folds = {nFolds}</span>
          <input type="range" min="3" max="10" step="1" value={nFolds}
            onChange={e => setNFolds(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Embargo = {embargo} days</span>
          <input type="range" min="0" max="60" step="5" value={embargo}
            onChange={e => setEmbargo(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Holding Period = {holdingPeriod} days</span>
          <input type="range" min="1" max="60" step="1" value={holdingPeriod}
            onChange={e => setHoldingPeriod(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Total Days = {totalDays}</span>
          <input type="range" min="252" max="5040" step="252" value={totalDays}
            onChange={e => setTotalDays(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox={`0 0 ${chartW + 20} ${chartH + 10}`}
        className="w-full max-w-2xl mx-auto block" aria-label="Purged CV visualization">
        {/* Show fold 2 as test (example) */}
        {Array.from({ length: nFolds }, (_, i) => {
          const start = i * foldSize
          const end = start + foldSize
          const isTest = i === 1
          const isEmbargo = (i === 0 && embargo > 0) || (i === 2 && embargo > 0)
          return (
            <g key={i}>
              <rect x={padL + start * scale} y={15} width={foldSize * scale} height={25}
                fill={isTest ? '#6366f1' : '#dbeafe'} stroke="#6366f1" strokeWidth="1" rx="3" />
              <text x={padL + (start + foldSize / 2) * scale} y={32} textAnchor="middle"
                className="text-[9px]" fill={isTest ? '#fff' : '#4338ca'}>
                {isTest ? 'TEST' : `Train ${i + 1}`}
              </text>
            </g>
          )
        })}
        {/* Embargo zones */}
        {embargo > 0 && (
          <>
            <rect x={padL + (foldSize - embargo) * scale} y={15} width={embargo * scale} height={25}
              fill="#fca5a5" opacity="0.7" rx="3" />
            <rect x={padL + (2 * foldSize) * scale} y={15} width={embargo * scale} height={25}
              fill="#fca5a5" opacity="0.7" rx="3" />
            <text x={padL + chartW / 2} y={60} textAnchor="middle" className="text-[9px]" fill="#ef4444">
              Red: embargo zones (excluded from training)
            </text>
          </>
        )}
      </svg>

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Leakage (no embargo)</div>
          <div className="text-sm font-bold text-red-600 dark:text-red-400">{leakageWithout.toFixed(1)}%</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Leakage (with embargo)</div>
          <div className="text-sm font-bold text-green-600 dark:text-green-400">{leakageWith.toFixed(1)}%</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Effective Train</div>
          <div className="text-sm font-bold text-blue-600 dark:text-blue-400">{purgedTrainSize} days</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Test Size</div>
          <div className="text-sm font-bold text-purple-600 dark:text-purple-400">{effectiveTestSize} days</div>
        </div>
      </div>
    </div>
  )
}

export default function PurgedCV() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Purged Cross-Validation
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Standard K-fold cross-validation fails for time series because it ignores temporal
        dependencies. Purged Cross-Validation, introduced by Marcos Lopez de Prado in "Advances
        in Financial Machine Learning," addresses this by removing (purging) training observations
        that overlap with the test set and adding embargo periods to prevent information leakage.
      </p>

      <DefinitionBlock
        title="Purged K-Fold Cross-Validation"
        label="Definition 8.11"
        definition="Purged K-fold CV modifies standard K-fold by: (1) removing from the training set any observation whose label period overlaps with the test set (purging), and (2) removing an additional embargo period of h observations from the training set immediately after the test set ends, where h is the expected holding period of the strategy."
        notation="\text{Train}_k' = \text{Train}_k \setminus \{i : [t_i, t_i + h] \cap \text{Test}_k \neq \emptyset\} \setminus \{i : t_i \in [\max(\text{Test}_k), \max(\text{Test}_k) + h]\}"
      />

      <TheoremBlock
        title="Information Leakage in Standard CV"
        label="Theorem 8.10"
        statement="For a strategy with holding period h and K-fold CV on T observations, the expected fraction of test-set information leaked into training is approximately min(1, Kh/T). With K=5, h=20, T=1260, this is 7.9% -- enough to significantly inflate performance estimates. Purging and embargo reduce leakage to zero when the embargo equals or exceeds h."
        proof="In standard K-fold, a test observation at time t has label information spanning [t, t+h]. The training set includes observations at times t-1, t-2, ..., which have labels spanning [t-1, t-1+h], [t-2, t-2+h], etc. Labels from times t-h+1 through t overlap with the test label at t. In each fold, the boundary region has ~2h potentially leaked observations. Over K folds, the total leaked fraction is approximately 2Kh/T. Purging removes these observations; embargo prevents any residual serial correlation."
      />

      <BlockMath math="\text{Leakage fraction} \approx \frac{2Kh}{T}, \quad \text{Purged leakage} = 0 \text{ if embargo} \geq h" />

      <InteractivePurgedCV />

      <PythonCode
        title="purged_cross_validation.py"
        runnable
        code={`import numpy as np
from scipy import stats

np.random.seed(42)

def purged_kfold_cv(returns, signal_func, param_range, n_folds=5, embargo=10):
    """Purged K-Fold Cross-Validation for trading strategies."""
    T = len(returns)
    fold_size = T // n_folds
    results = []

    for k in range(n_folds):
        test_start = k * fold_size
        test_end = test_start + fold_size

        # Define train indices with purging and embargo
        train_mask = np.ones(T, dtype=bool)
        # Remove test set
        train_mask[test_start:test_end] = False
        # Embargo after test set
        embargo_end = min(test_end + embargo, T)
        train_mask[test_end:embargo_end] = False
        # Embargo before test set (purging)
        embargo_start = max(test_start - embargo, 0)
        train_mask[embargo_start:test_start] = False

        train_returns = returns[train_mask]
        test_returns = returns[test_start:test_end]

        # Optimize on training set
        best_sharpe = -np.inf
        best_param = param_range[0]
        for param in param_range:
            signal = signal_func(train_returns, param)
            strat_ret = signal[:-1] * train_returns[1:]
            if len(strat_ret) > 0 and np.std(strat_ret) > 0:
                sr = np.mean(strat_ret) / np.std(strat_ret) * np.sqrt(252)
                if sr > best_sharpe:
                    best_sharpe = sr
                    best_param = param

        # Test
        test_signal = signal_func(test_returns, best_param)
        test_strat_ret = test_signal[:-1] * test_returns[1:]
        test_sr = (np.mean(test_strat_ret) / np.std(test_strat_ret) * np.sqrt(252)
                   if len(test_strat_ret) > 0 and np.std(test_strat_ret) > 0 else 0)

        results.append({
            'fold': k, 'best_param': best_param,
            'train_sharpe': best_sharpe, 'test_sharpe': test_sr,
            'train_size': train_mask.sum(),
            'purged_obs': T - train_mask.sum() - fold_size,
        })

    return results

def momentum_signal(returns, lookback):
    """Generate momentum signal from returns."""
    n = len(returns)
    signal = np.zeros(n)
    for i in range(lookback, n):
        cum_ret = np.sum(returns[i-lookback:i])
        signal[i] = 1 if cum_ret > 0 else -1
    return signal

# Generate Nifty-like returns
n_days = 1260
nifty_returns = np.random.normal(0.0004, 0.013, n_days)

# Compare standard vs purged CV
param_range = [5, 10, 15, 20, 30, 40, 60]

# Standard CV (no purging)
print("=== Standard K-Fold CV (NO purging) ===")
std_results = purged_kfold_cv(nifty_returns, momentum_signal,
                                param_range, n_folds=5, embargo=0)
print(f"{'Fold':>5} {'Param':>6} {'IS SR':>8} {'OOS SR':>8} {'Purged':>8}")
print("-" * 40)
for r in std_results:
    print(f"{r['fold']+1:>5} {r['best_param']:>6} {r['train_sharpe']:>8.2f} "
          f"{r['test_sharpe']:>8.2f} {r['purged_obs']:>8}")

avg_std_oos = np.mean([r['test_sharpe'] for r in std_results])

# Purged CV
print(f"\\n=== Purged K-Fold CV (embargo=20 days) ===")
purged_results = purged_kfold_cv(nifty_returns, momentum_signal,
                                   param_range, n_folds=5, embargo=20)
print(f"{'Fold':>5} {'Param':>6} {'IS SR':>8} {'OOS SR':>8} {'Purged':>8}")
print("-" * 40)
for r in purged_results:
    print(f"{r['fold']+1:>5} {r['best_param']:>6} {r['train_sharpe']:>8.2f} "
          f"{r['test_sharpe']:>8.2f} {r['purged_obs']:>8}")

avg_purged_oos = np.mean([r['test_sharpe'] for r in purged_results])

print(f"\\n=== Comparison ===")
print(f"Standard CV avg OOS Sharpe: {avg_std_oos:.2f}")
print(f"Purged CV avg OOS Sharpe:   {avg_purged_oos:.2f}")
print(f"Difference: {avg_std_oos - avg_purged_oos:+.2f}")
print(f"\\nStandard CV inflates OOS by: {(avg_std_oos/avg_purged_oos - 1)*100 if avg_purged_oos != 0 else 0:+.1f}%")
print(f"(Due to information leakage from overlapping labels)")`}
      />

      <ExampleBlock
        title="Setting Embargo for a Nifty Momentum Strategy"
        difficulty="intermediate"
        problem="Your Nifty momentum strategy uses a 20-day lookback and holds positions for an average of 15 trading days. You have 5 years of data (1260 days) and want to use 5-fold purged CV. How many observations are purged per fold?"
        solution={[
          {
            step: 'Fold size',
            formula: '\\text{Fold size} = 1260 / 5 = 252 \\text{ days}',
          },
          {
            step: 'Set embargo equal to holding period',
            formula: 'h = 15 \\text{ days (average holding period)}',
          },
          {
            step: 'Purged observations per fold',
            formula: '\\text{Purged} = 2 \\times h = 2 \\times 15 = 30 \\text{ days}',
            explanation: '15 days before test start (purging) + 15 days after test end (embargo). Total training size per fold: 1260 - 252 - 30 = 978 days.',
          },
          {
            step: 'Verify adequacy',
            formula: '\\text{Train/Test} = 978 / 252 = 3.88',
            explanation: 'A ratio of ~4:1 is acceptable. If embargo were set to the lookback (20 days), we would purge 40 days, leaving 968 training days -- still adequate.',
          },
        ]}
      />

      <NoteBlock title="CPCV: Combinatorial Purged CV" type="tip">
        <p>
          Combinatorial Purged Cross-Validation (CPCV) extends purged CV by testing all possible
          combinations of K folds, not just single-fold-out. For K=5, this generates C(5,2)=10
          train-test splits instead of 5. Each split uses 3 folds for training and 2 for testing,
          providing better coverage and more stable performance estimates. For Nifty strategies
          with limited data, CPCV extracts maximum information from available history.
        </p>
      </NoteBlock>

      <NoteBlock title="Embargo Size Selection" type="warning">
        <p>
          Set embargo to the maximum of: (1) the strategy's average holding period, (2) the
          lookback period of any indicator used, and (3) the autocorrelation decay length of
          the target variable. For Nifty momentum strategies using 20-60 day lookbacks, an
          embargo of 60 days is conservative but safe. Too small an embargo leaks information;
          too large wastes training data. When in doubt, err on the side of a larger embargo.
        </p>
      </NoteBlock>
    </div>
  )
}
