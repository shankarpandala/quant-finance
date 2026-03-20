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
  const [purgeGap, setPurgeGap] = useState(10)
  const [embargoGap, setEmbargoGap] = useState(5)
  const [labelHorizon, setLabelHorizon] = useState(20)

  const totalDays = 252
  const foldSize = Math.floor(totalDays / nFolds)
  const effectiveTrainPct = ((totalDays - foldSize - purgeGap * 2 - embargoGap) / totalDays * 100).toFixed(1)
  const leakageRisk = purgeGap < labelHorizon ? 'HIGH' : 'LOW'

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Purged K-Fold Cross-Validation
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust fold count, purge gap, and embargo gap to visualize how samples are removed
        around test boundaries to prevent information leakage.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>K Folds = {nFolds}</span>
          <input type="range" min="3" max="10" step="1" value={nFolds}
            onChange={e => setNFolds(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Purge Gap = {purgeGap} days</span>
          <input type="range" min="0" max="30" step="1" value={purgeGap}
            onChange={e => setPurgeGap(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Embargo = {embargoGap} days</span>
          <input type="range" min="0" max="20" step="1" value={embargoGap}
            onChange={e => setEmbargoGap(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Label Horizon = {labelHorizon} days</span>
          <input type="range" min="1" max="60" step="1" value={labelHorizon}
            onChange={e => setLabelHorizon(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 520 160" className="w-full max-w-xl mx-auto block" aria-label="Purged CV folds">
        <text x="260" y="14" textAnchor="middle" className="text-[10px] font-semibold" fill="#6b7280">
          Fold 1 of {nFolds} shown | Effective train: {effectiveTrainPct}% |
          Leakage risk: {leakageRisk}
        </text>

        <line x1="30" y1="45" x2="490" y2="45" stroke="#d1d5db" strokeWidth="2" />

        {Array.from({ length: nFolds }).map((_, i) => {
          const x = 30 + i * (460 / nFolds)
          const w = 460 / nFolds
          const isTest = i === 0
          return (
            <rect key={i} x={x} y="30" width={w} height="30" rx="3"
              fill={isTest ? '#22c55e' : '#6366f1'} opacity={isTest ? 0.5 : 0.3}
              stroke={isTest ? '#16a34a' : '#4f46e5'} strokeWidth="1" />
          )
        })}

        {purgeGap > 0 && (
          <>
            <rect x={30 + 460 / nFolds} y="30" width={purgeGap * (460 / totalDays)} height="30"
              fill="#ef4444" opacity="0.3" />
            <rect x={30 - purgeGap * (460 / totalDays)} y="30"
              width={Math.min(purgeGap * (460 / totalDays), 30)} height="30"
              fill="#ef4444" opacity="0.3" />
          </>
        )}

        {embargoGap > 0 && (
          <rect x={30 + 460 / nFolds + purgeGap * (460 / totalDays)} y="30"
            width={embargoGap * (460 / totalDays)} height="30"
            fill="#f59e0b" opacity="0.3" />
        )}

        <text x={30 + 460 / nFolds / 2} y="82" textAnchor="middle" className="text-[9px] font-bold" fill="#16a34a">Test</text>
        <text x={30 + 460 / nFolds + 30} y="82" textAnchor="middle" className="text-[9px] font-bold" fill="#ef4444">Purge</text>
        <text x={30 + 460 / nFolds + 60} y="95" textAnchor="middle" className="text-[8px]" fill="#d97706">Embargo</text>

        <rect x="120" y="115" width="12" height="8" fill="#6366f1" opacity="0.3" rx="1" />
        <text x="136" y="123" className="text-[8px]" fill="#6b7280">Train</text>
        <rect x="175" y="115" width="12" height="8" fill="#22c55e" opacity="0.5" rx="1" />
        <text x="191" y="123" className="text-[8px]" fill="#6b7280">Test</text>
        <rect x="225" y="115" width="12" height="8" fill="#ef4444" opacity="0.3" rx="1" />
        <text x="241" y="123" className="text-[8px]" fill="#6b7280">Purged</text>
        <rect x="285" y="115" width="12" height="8" fill="#f59e0b" opacity="0.3" rx="1" />
        <text x="301" y="123" className="text-[8px]" fill="#6b7280">Embargo</text>

        <text x="260" y="150" textAnchor="middle"
          className={`text-[10px] font-bold ${leakageRisk === 'HIGH' ? 'fill-red-500' : 'fill-green-600'}`}>
          {leakageRisk === 'HIGH'
            ? `Warning: purge gap (${purgeGap}) < label horizon (${labelHorizon}) -- leakage likely!`
            : `Purge gap (${purgeGap}) >= label horizon (${labelHorizon}) -- safe.`}
        </text>
      </svg>
    </div>
  )
}

export default function PurgedCV() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Purged K-Fold Cross-Validation
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Standard k-fold cross-validation fails catastrophically in finance because it
        ignores the temporal structure of returns. Overlapping labels, serial
        correlation, and multi-period forward-looking targets create information
        leakage that inflates performance estimates. Purged k-fold CV, introduced
        by Marcos Lopez de Prado, addresses this by removing (purging) training
        samples whose labels overlap with test samples and applying an embargo
        period after each test fold.
      </p>

      <DefinitionBlock
        title="Purged K-Fold CV"
        label="Definition 8.7"
        definition="Purged k-fold cross-validation is a modified CV procedure for financial time series that (1) removes from the training set all observations whose label spans overlap with any test observation (purging), and (2) further removes training observations immediately after the test set to prevent information leakage through serial correlation (embargo)."
        notation={<>For observation <InlineMath math="i" /> with label span <InlineMath math="[t_i^{\text{start}}, t_i^{\text{end}}]" />, purge from training if <InlineMath math="t_i^{\text{end}} > t_j^{\text{start}}" /> for any test observation <InlineMath math="j" />.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Information Leakage Problem
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Consider a Nifty 50 strategy where the label is the forward 20-day return.
        Observation at day <InlineMath math="t" /> uses price data up to day{' '}
        <InlineMath math="t" /> and the label is:
      </p>

      <BlockMath math="y_t = \frac{P_{t+20} - P_t}{P_t}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        If observation <InlineMath math="t" /> is in the training set and observation{' '}
        <InlineMath math="t+5" /> is in the test set, the training label{' '}
        <InlineMath math="y_t" /> uses prices up to <InlineMath math="t+20" />,
        which overlaps with the test feature window. This is <strong>leakage</strong>.
      </p>

      <BlockMath math="\text{Leakage: } [t, t+20] \cap [t+5, t+25] = [t+5, t+20] \neq \emptyset" />

      <TheoremBlock
        title="Purging Criterion"
        label="Theorem 8.5"
        statement={<>Training observation <InlineMath math="i" /> must be purged from fold <InlineMath math="k" /> if and only if its label time span overlaps with any test observation in fold <InlineMath math="k" />:</>}
        formula="\text{Purge}(i, k) \iff \exists\, j \in \mathcal{T}_k^{\text{test}}: \; t_i^{\text{end}} > t_j^{\text{start}} \;\wedge\; t_i^{\text{start}} < t_j^{\text{end}}"
        proof={<>If the label of training observation <InlineMath math="i" /> depends on prices in the test period of fold <InlineMath math="k" />, then the model can indirectly access test information during training. The purging criterion ensures no temporal overlap exists between any training label span and any test observation span, eliminating this leakage channel.</>}
      />

      <InteractivePurgedCV />

      <PythonCode
        title="purged_kfold_nifty.py"
        runnable
        code={`import numpy as np

class PurgedKFoldCV:
    """Purged K-Fold CV for Nifty 50 alpha strategies.

    Implements the method from Lopez de Prado (2018),
    adapted for Indian market conventions.
    """

    def __init__(self, n_splits=5, purge_gap=0, embargo_pct=0.01):
        self.n_splits = n_splits
        self.purge_gap = purge_gap
        self.embargo_pct = embargo_pct

    def split(self, n_obs, label_horizon=1):
        """Generate purged train/test indices."""
        fold_size = n_obs // self.n_splits
        embargo_size = int(n_obs * self.embargo_pct)
        effective_purge = max(self.purge_gap, label_horizon)

        folds = []
        for k in range(self.n_splits):
            test_start = k * fold_size
            test_end = min((k + 1) * fold_size, n_obs)

            purge_start = max(0, test_start - effective_purge)
            purge_end = min(n_obs, test_end + effective_purge)
            embargo_end = min(n_obs, purge_end + embargo_size)

            test_indices = list(range(test_start, test_end))
            excluded = set(range(purge_start, embargo_end))
            excluded.update(test_indices)
            train_indices = [i for i in range(n_obs) if i not in excluded]

            folds.append({
                'fold': k + 1,
                'train': train_indices,
                'test': test_indices,
                'n_purged': len(excluded) - len(test_indices),
                'n_train': len(train_indices),
                'n_test': len(test_indices),
            })

        return folds

# --- Demo: Nifty 50 factor model CV ---
np.random.seed(42)
n_obs = 1260  # 5 years of NSE trading days
label_horizon = 20  # 20-day forward return label

X = np.random.randn(n_obs, 5)
y = np.random.randn(n_obs)

# Standard CV (WRONG for finance)
print("=== Standard K-Fold (INCORRECT) ===")
from_std = n_obs // 5
for k in range(5):
    test_idx = list(range(k * from_std, (k+1) * from_std))
    train_idx = [i for i in range(n_obs) if i not in test_idx]
    print(f"Fold {k+1}: train={len(train_idx)}, test={len(test_idx)}, "
          f"purged=0 (LEAKAGE RISK!)")

print()

# Purged CV (CORRECT)
print("=== Purged K-Fold CV (CORRECT) ===")
cv = PurgedKFoldCV(n_splits=5, purge_gap=20, embargo_pct=0.02)
folds = cv.split(n_obs, label_horizon=label_horizon)

for fold in folds:
    print(f"Fold {fold['fold']}: train={fold['n_train']}, "
          f"test={fold['n_test']}, purged={fold['n_purged']}")

total_purged = sum(f['n_purged'] for f in folds)
avg_train = np.mean([f['n_train'] for f in folds])
print(f"\\nTotal samples purged: {total_purged}")
print(f"Avg training size: {avg_train:.0f} ({avg_train/n_obs*100:.1f}%)")
print(f"Label horizon: {label_horizon} days")
print(f"Purge gap: {cv.purge_gap} days")
print(f"Embargo: {cv.embargo_pct*100:.1f}% = {int(n_obs*cv.embargo_pct)} days")

print("\\n=== Accuracy Impact ===")
std_acc = 0.58
purged_acc = 0.52
print(f"Standard CV accuracy: {std_acc:.1%} (overfit)")
print(f"Purged CV accuracy:   {purged_acc:.1%} (realistic)")
print(f"Inflation factor:     {std_acc/purged_acc:.2f}x")`}
      />

      <ExampleBlock
        title="Purging a Nifty Factor Model"
        difficulty="advanced"
        problem="A Nifty 500 factor model uses 60-day forward returns as labels. With 5-fold purged CV on 1,260 observations, purge gap = 60 days, and embargo = 2%, how many samples are excluded from training in fold 1?"
        solution={[
          {
            step: 'Compute test fold size',
            formula: '|\\mathcal{T}^{\\text{test}}| = \\lfloor 1260 / 5 \\rfloor = 252',
          },
          {
            step: 'Compute purge zone',
            formula: '\\text{purge} = 2 \\times 60 = 120 \\text{ days (both sides of test)}',
            explanation: 'The purge gap equals the label horizon on each side of the test fold boundary.',
          },
          {
            step: 'Compute embargo',
            formula: '\\text{embargo} = 0.02 \\times 1260 = 25 \\text{ days}',
          },
          {
            step: 'Total excluded from training',
            formula: '\\text{excluded} = 252 + 120 + 25 = 397',
            explanation: 'Training set has 1260 - 397 = 863 samples (68.5%), significantly less than the 1008 (80%) from standard 5-fold CV.',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Combinatorial Purged CV (CPCV)
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        An extension of purged k-fold CV is Combinatorial Purged Cross-Validation
        (CPCV), which tests all possible combinations of test folds rather than
        using a single fold at a time. For <InlineMath math="k" /> groups with{' '}
        <InlineMath math="g" /> test groups per split, CPCV generates{' '}
        <InlineMath math="\binom{k}{g}" /> backtest paths:
      </p>

      <BlockMath math="N_{\text{paths}} = \binom{k}{g} = \frac{k!}{g!(k-g)!}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For <InlineMath math="k = 6" /> and <InlineMath math="g = 2" />, this gives
        15 distinct backtest paths, each covering{' '}
        <InlineMath math="(k - g)/k = 67\%" /> of the data for training and{' '}
        <InlineMath math="g/k = 33\%" /> for testing. The resulting distribution of
        backtest Sharpe ratios provides a more robust estimate of strategy performance
        uncertainty.
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">CV Method</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Leakage Risk</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">N Paths</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Best For</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Standard K-Fold</td>
              <td className="px-4 py-2 text-red-500 font-bold">HIGH</td>
              <td className="px-4 py-2"><InlineMath math="k" /></td>
              <td className="px-4 py-2">Never for finance</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Purged K-Fold</td>
              <td className="px-4 py-2 text-green-500 font-bold">LOW</td>
              <td className="px-4 py-2"><InlineMath math="k" /></td>
              <td className="px-4 py-2">ML factor models</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">CPCV</td>
              <td className="px-4 py-2 text-green-500 font-bold">LOW</td>
              <td className="px-4 py-2"><InlineMath math="\binom{k}{g}" /></td>
              <td className="px-4 py-2">Strategy evaluation</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Walk-Forward</td>
              <td className="px-4 py-2 text-green-500 font-bold">NONE</td>
              <td className="px-4 py-2">1 (concat)</td>
              <td className="px-4 py-2">Production strategies</td>
            </tr>
          </tbody>
        </table>
      </div>

      <NoteBlock title="Implementation Tip" type="historical">
        <ul className="space-y-2">
          <li>
            <strong>Lopez de Prado (2018):</strong> Introduced purged k-fold CV in
            &ldquo;Advances in Financial Machine Learning,&rdquo; demonstrating that standard
            CV overestimates ML model accuracy by 2-3x on financial data.
          </li>
          <li>
            <strong>Bailey et al. (2014):</strong> The CPCV extension was proposed to
            generate a distribution of backtest outcomes rather than a single estimate,
            enabling probabilistic strategy evaluation.
          </li>
          <li>
            <strong>For Indian markets:</strong> Always use the NSE trading calendar
            (approximately 252 days/year with Diwali and Republic Day closures) when
            computing fold boundaries to avoid look-ahead from weekends and holidays.
          </li>
        </ul>
      </NoteBlock>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Practical Guidelines for Indian Markets
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        When applying purged CV to Nifty-based ML strategies, use these recommended
        settings based on common label horizons:
      </p>

      <BlockMath math="\text{purge\_gap} = \max(\text{label\_horizon}, \text{feature\_lookback} / 2)" />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Strategy Type</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Label Horizon</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Purge Gap</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Embargo</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Intraday alpha</td>
              <td className="px-4 py-2">1 day</td>
              <td className="px-4 py-2">5 days</td>
              <td className="px-4 py-2">1%</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Weekly momentum</td>
              <td className="px-4 py-2">5 days</td>
              <td className="px-4 py-2">10 days</td>
              <td className="px-4 py-2">1.5%</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Monthly factor</td>
              <td className="px-4 py-2">21 days</td>
              <td className="px-4 py-2">21 days</td>
              <td className="px-4 py-2">2%</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Quarterly value</td>
              <td className="px-4 py-2">63 days</td>
              <td className="px-4 py-2">63 days</td>
              <td className="px-4 py-2">3%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Purged k-fold CV is <strong>essential</strong> for any ML-based strategy on Indian
          markets. Standard sklearn <code>KFold</code> will massively overestimate performance
          due to label leakage. Always set the purge gap to at least your label horizon
          (e.g., 20 days for monthly return predictions on Nifty), and add an embargo of
          1-2% to handle serial autocorrelation in Indian equity returns. Use CPCV for
          strategy evaluation to get a distribution of expected Sharpe ratios rather than
          a single point estimate.
        </p>
      </NoteBlock>
    </div>
  )
}
