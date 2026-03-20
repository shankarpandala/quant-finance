import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveFeatureImportance() {
  const [method, setMethod] = useState('mdi')

  const mdiScores = [
    { name: 'momentum_20d', score: 0.18 }, { name: 'fii_flow', score: 0.15 },
    { name: 'india_vix', score: 0.14 }, { name: 'vol_ratio', score: 0.12 },
    { name: 'rsi_14', score: 0.11 }, { name: 'delivery_pct', score: 0.10 },
    { name: 'sector_rotation', score: 0.09 }, { name: 'pcr', score: 0.06 },
    { name: 'earnings_surp', score: 0.03 }, { name: 'rollover', score: 0.02 },
  ]

  const mdaScores = [
    { name: 'fii_flow', score: 0.22 }, { name: 'india_vix', score: 0.18 },
    { name: 'momentum_20d', score: 0.12 }, { name: 'delivery_pct', score: 0.11 },
    { name: 'vol_ratio', score: 0.10 }, { name: 'rsi_14', score: 0.08 },
    { name: 'sector_rotation', score: 0.07 }, { name: 'pcr', score: 0.05 },
    { name: 'rollover', score: 0.04 }, { name: 'earnings_surp', score: 0.03 },
  ]

  const scores = method === 'mdi' ? mdiScores : mdaScores
  const maxScore = Math.max(...scores.map(s => s.score))

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: MDI vs MDA Feature Importance
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Compare feature importance methods for a Nifty 50 prediction model.
      </p>

      <div className="mb-4 flex gap-4">
        <button onClick={() => setMethod('mdi')}
          className={`px-3 py-1 rounded text-xs font-semibold ${method === 'mdi' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>
          MDI (Impurity)
        </button>
        <button onClick={() => setMethod('mda')}
          className={`px-3 py-1 rounded text-xs font-semibold ${method === 'mda' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>
          MDA (Permutation)
        </button>
      </div>

      <svg viewBox="0 0 400 220" className="w-full max-w-lg mx-auto block">
        {scores.map((s, i) => {
          const barWidth = (s.score / maxScore) * 250
          return (
            <g key={s.name}>
              <text x="100" y={18 + i * 21} textAnchor="end" className="text-[9px]" fill="#6b7280">
                {s.name}
              </text>
              <rect x="105" y={8 + i * 21} width={barWidth} height="14" rx="2"
                fill={i < 3 ? '#6366f1' : i < 6 ? '#818cf8' : '#c7d2fe'} />
              <text x={110 + barWidth} y={19 + i * 21} className="text-[8px] font-bold" fill="#4338ca">
                {(s.score * 100).toFixed(1)}%
              </text>
            </g>
          )
        })}
        <text x="200" y="215" textAnchor="middle" className="text-[9px] font-bold" fill="#6b7280">
          {method === 'mdi' ? 'Mean Decrease in Impurity' : 'Mean Decrease in Accuracy'}
        </text>
      </svg>

      <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
        {method === 'mdi'
          ? 'MDI measures how much each feature reduces node impurity across all trees'
          : 'MDA measures accuracy drop when each feature is randomly permuted'}
      </p>
    </div>
  )
}

export default function MDIMDA() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        MDI and MDA Feature Importance
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Understanding which features drive an ML model's predictions is critical for
        building robust trading strategies. Mean Decrease in Impurity (MDI) and Mean
        Decrease in Accuracy (MDA) are two complementary approaches to quantifying
        feature importance in tree-based models applied to Indian equity data.
      </p>

      <DefinitionBlock
        title="Mean Decrease in Impurity (MDI)"
        label="Definition 12.7"
        definition="MDI measures a feature's importance by the total reduction in node impurity (Gini or entropy for classification, variance for regression) across all splits using that feature, averaged over all trees in the ensemble. Features that produce larger impurity reductions at the top of trees receive higher MDI scores."
        notation="MDI_j = \frac{1}{M}\sum_{m=1}^{M}\sum_{t \in T_m : v(t)=j} p(t) \cdot \Delta I(t)"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        MDI Computation
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For each tree <InlineMath math="m" /> and each node <InlineMath math="t" /> that
        splits on feature <InlineMath math="j" />:
      </p>

      <BlockMath math="\Delta I(t) = I(t) - \frac{n_{left}}{n_t} I(t_{left}) - \frac{n_{right}}{n_t} I(t_{right})" />

      <BlockMath math="MDI_j = \frac{1}{M}\sum_{m=1}^{M}\sum_{t: v(t)=j} \frac{n_t}{N} \cdot \Delta I(t)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="n_t" /> is the number of samples reaching node{' '}
        <InlineMath math="t" /> and <InlineMath math="v(t)" /> is the feature used at node{' '}
        <InlineMath math="t" />.
      </p>

      <TheoremBlock
        title="MDI Bias Toward High-Cardinality Features"
        label="Theorem 12.7"
        statement="MDI is biased toward features with many unique values (high cardinality). A feature with c possible split points has a higher chance of being selected by chance alone. The probability of feature j being selected at a random node is proportional to its number of candidate splits, not its true predictive power."
        proof="In a random split selection, feature j with c_j unique values produces c_j - 1 candidate splits. The probability of j being selected is proportional to (c_j - 1) / sum_k(c_k - 1). Continuous features with many unique values (e.g., price returns) are favored over discrete features (e.g., sector dummy variables), even if the latter are more predictive."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Mean Decrease in Accuracy (MDA)
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        MDA (permutation importance) measures the drop in model performance when
        feature <InlineMath math="j" />'s values are randomly shuffled:
      </p>

      <BlockMath math="MDA_j = \text{Score}(X) - \text{Score}(X^{\pi_j})" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="X^{\pi_j}" /> is the data matrix with column{' '}
        <InlineMath math="j" /> randomly permuted. This breaks the relationship between
        feature <InlineMath math="j" /> and the target while preserving all other
        feature distributions.
      </p>

      <BlockMath math="MDA_j = \frac{1}{M}\sum_{m=1}^{M}\left[\text{OOB}^m_{score} - \text{OOB}^{m,\pi_j}_{score}\right]" />

      <NoteBlock title="MDI vs MDA for Indian Equity Features" type="tip">
        <ul className="space-y-1 text-sm">
          <li><strong>MDI bias:</strong> Continuous features (returns, volatility) are favored
            over categorical (sector). Use MDA to validate</li>
          <li><strong>MDA on OOB:</strong> Compute MDA on out-of-bag samples to avoid
            in-sample bias. Purge OOB for financial data</li>
          <li><strong>Substitution effect:</strong> If momentum_5d and momentum_10d are correlated,
            MDI may split importance between them. MDA may underestimate both due to redundancy</li>
          <li><strong>Clustered MDA:</strong> Group correlated features (e.g., all momentum features)
            and permute the group together</li>
        </ul>
      </NoteBlock>

      <InteractiveFeatureImportance />

      <PythonCode
        title="mdi_mda_importance.py"
        runnable
        code={`import numpy as np

class FeatureImportanceAnalyzer:
    """MDI and MDA feature importance for financial models."""

    def __init__(self, feature_names):
        self.feature_names = feature_names
        self.K = len(feature_names)

    def compute_mdi(self, tree_splits, tree_impurity_gains, n_trees):
        """Compute MDI from tree split information."""
        mdi = np.zeros(self.K)
        counts = np.zeros(self.K)
        for splits, gains in zip(tree_splits, tree_impurity_gains):
            for feat_idx, gain in zip(splits, gains):
                mdi[feat_idx] += gain
                counts[feat_idx] += 1

        if mdi.sum() > 0:
            mdi /= mdi.sum()
        return dict(zip(self.feature_names, mdi))

    def compute_mda(self, model_score_fn, X, y, n_repeats=10):
        """Compute MDA via permutation importance."""
        baseline = model_score_fn(X, y)
        mda = np.zeros(self.K)

        for j in range(self.K):
            drop_scores = []
            for _ in range(n_repeats):
                X_perm = X.copy()
                X_perm[:, j] = np.random.permutation(X_perm[:, j])
                perm_score = model_score_fn(X_perm, y)
                drop_scores.append(baseline - perm_score)
            mda[j] = np.mean(drop_scores)

        if mda.sum() > 0:
            mda_norm = mda / mda.sum()
        else:
            mda_norm = mda
        return dict(zip(self.feature_names, mda_norm)), dict(zip(self.feature_names, mda))

    def clustered_mda(self, model_score_fn, X, y, clusters):
        """MDA with feature clusters permuted together."""
        baseline = model_score_fn(X, y)
        results = {}

        for cluster_name, feat_indices in clusters.items():
            X_perm = X.copy()
            perm = np.random.permutation(len(X))
            for j in feat_indices:
                X_perm[:, j] = X[perm, j]
            drop = baseline - model_score_fn(X_perm, y)
            results[cluster_name] = drop

        return results

# Simulate a Random Forest-like model on Nifty features
np.random.seed(42)
features = ['momentum_20d', 'fii_flow', 'india_vix', 'vol_ratio',
            'rsi_14', 'delivery_pct', 'sector_rot', 'pcr',
            'earnings_surp', 'rollover']
analyzer = FeatureImportanceAnalyzer(features)

# Simulate tree splits
n_trees = 100
tree_splits = []
tree_gains = []
# Features 0,1,2 are most important
for _ in range(n_trees):
    n_splits = np.random.randint(5, 15)
    probs = [0.20, 0.18, 0.15, 0.12, 0.10, 0.08, 0.07, 0.05, 0.03, 0.02]
    splits = np.random.choice(10, size=n_splits, p=probs)
    gains = np.random.exponential(0.1, n_splits)
    tree_splits.append(splits)
    tree_gains.append(gains)

mdi = analyzer.compute_mdi(tree_splits, tree_gains, n_trees)

# Simulate MDA
n_samples = 500
X = np.random.randn(n_samples, 10)
y = (0.4 * X[:, 0] + 0.3 * X[:, 1] - 0.25 * X[:, 2] +
     0.1 * X[:, 3] + np.random.randn(n_samples) * 0.5)
y_class = (y > 0).astype(float)

def accuracy_fn(X_in, y_in):
    pred = (0.4 * X_in[:, 0] + 0.3 * X_in[:, 1] - 0.25 * X_in[:, 2] + 0.1 * X_in[:, 3]) > 0
    return np.mean(pred == y_in)

mda_norm, mda_raw = analyzer.compute_mda(accuracy_fn, X, y_class, n_repeats=20)

# Clustered MDA
clusters = {
    'Momentum': [0, 4],       # momentum + RSI
    'Flow/Sentiment': [1, 7, 9],  # FII + PCR + rollover
    'Volatility': [2, 3],     # VIX + vol_ratio
    'Micro': [5, 6, 8],       # delivery + sector + earnings
}
cluster_mda = analyzer.clustered_mda(accuracy_fn, X, y_class, clusters)

print("=" * 60)
print("  Feature Importance: MDI vs MDA - Nifty 50 Model")
print("=" * 60)
print(f"\\n{'Feature':<18} {'MDI':>8} {'MDA':>8} {'Rank MDI':>9} {'Rank MDA':>9}")
print("-" * 55)
mdi_sorted = sorted(mdi.items(), key=lambda x: -x[1])
mda_sorted = sorted(mda_norm.items(), key=lambda x: -x[1])
mdi_ranks = {name: i+1 for i, (name, _) in enumerate(mdi_sorted)}
mda_ranks = {name: i+1 for i, (name, _) in enumerate(mda_sorted)}

for name in features:
    print(f"{name:<18} {mdi[name]:>7.1%} {mda_norm[name]:>7.1%} "
          f"{mdi_ranks[name]:>9} {mda_ranks[name]:>9}")

print(f"\\nClustered MDA:")
for cluster, score in sorted(cluster_mda.items(), key=lambda x: -x[1]):
    print(f"  {cluster:<20} {score*100:>+.2f}% accuracy drop")`}
      />

      <ExampleBlock
        title="Interpreting MDI vs MDA Disagreement"
        difficulty="intermediate"
        problem="In your Nifty alpha model, momentum_20d has MDI rank 1 but MDA rank 3, while fii_flow has MDI rank 2 but MDA rank 1. What explains this?"
        solution={[
          {
            step: 'Analyze MDI bias',
            formula: '\\text{momentum\\_20d: continuous, many unique values}',
            explanation: 'MDI is biased toward continuous features with many possible split points. Momentum, being continuous, gets more split opportunities, inflating its MDI.',
          },
          {
            step: 'Analyze MDA ranking',
            formula: '\\text{MDA}_{fii} > \\text{MDA}_{momentum}',
            explanation: 'MDA measures actual prediction accuracy drop. FII flow being ranked 1 by MDA means permuting it causes the largest accuracy drop -- it carries the most unique predictive information.',
          },
          {
            step: 'Practical recommendation',
            formula: '\\text{Trust MDA ranking for feature selection}',
            explanation: 'MDA is more reliable for determining which features to include. However, use clustered MDA if momentum and FII flow are correlated, as standard MDA may underestimate both due to substitution effects.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          MDI and MDA provide complementary views of feature importance. MDI is fast
          and available during training but biased toward high-cardinality features.
          MDA is more reliable but computationally expensive and affected by feature
          correlation. For Indian equity models, always compute both and investigate
          discrepancies. Use clustered MDA to handle correlated feature groups
          (multiple momentum windows, correlated sentiment indicators). Feature
          importance analysis prevents overfitting to noise features and builds
          confidence that the model captures genuine market dynamics.
        </p>
      </NoteBlock>
    </div>
  )
}
