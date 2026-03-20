import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractivePCA() {
  const [nComponents, setNComponents] = useState(3)

  const eigenvalues = [3.2, 1.8, 1.1, 0.7, 0.5, 0.35, 0.2, 0.08, 0.05, 0.02]
  const total = eigenvalues.reduce((s, v) => s + v, 0)
  const cumulative = eigenvalues.reduce((acc, v) => {
    const prev = acc.length > 0 ? acc[acc.length - 1] : 0
    acc.push(prev + v / total * 100)
    return acc
  }, [])

  const selectedVariance = cumulative[nComponents - 1]

  const pcLabels = ['Market', 'Sector Rotation', 'Momentum', 'Value-Growth', 'Size',
    'Liquidity', 'Volatility', 'FII Flow', 'Earnings', 'Idiosyncratic']

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: PCA Scree Plot for Nifty 50 Features
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Select number of principal components to retain for dimensionality reduction.
      </p>

      <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400 mb-4">
        <span>Components to retain = {nComponents} ({selectedVariance.toFixed(1)}% variance explained)</span>
        <input type="range" min="1" max="10" step="1" value={nComponents}
          onChange={e => setNComponents(parseInt(e.target.value))}
          className="h-2 w-full cursor-pointer accent-indigo-500" />
      </label>

      <svg viewBox="0 0 420 160" className="w-full max-w-lg mx-auto block">
        {eigenvalues.map((ev, i) => {
          const x = 30 + i * 38
          const barHeight = (ev / eigenvalues[0]) * 90
          const selected = i < nComponents
          return (
            <g key={i}>
              <rect x={x} y={120 - barHeight} width="25" height={barHeight} rx="2"
                fill={selected ? '#6366f1' : '#d1d5db'} opacity={selected ? 0.8 : 0.4} />
              <text x={x + 12} y="135" textAnchor="middle" className="text-[7px]" fill="#6b7280">
                PC{i + 1}
              </text>
              <text x={x + 12} y={115 - barHeight} textAnchor="middle" className="text-[7px] font-bold"
                fill={selected ? '#4338ca' : '#9ca3af'}>
                {(ev / total * 100).toFixed(0)}%
              </text>
            </g>
          )
        })}
        <line x1="25" y1="120" x2="415" y2="120" stroke="#e5e7eb" strokeWidth="1" />

        {cumulative.map((cv, i) => {
          const x = 42 + i * 38
          const y = 120 - cv * 0.9
          if (i > 0) {
            const prevX = 42 + (i - 1) * 38
            const prevY = 120 - cumulative[i - 1] * 0.9
            return (
              <g key={`cum-${i}`}>
                <line x1={prevX} y1={prevY} x2={x} y2={y} stroke="#ef4444" strokeWidth="1.5" />
                <circle cx={x} cy={y} r="2" fill="#ef4444" />
              </g>
            )
          }
          return <circle key={`cum-${i}`} cx={x} cy={y} r="2" fill="#ef4444" />
        })}

        <text x="415" y="12" textAnchor="end" className="text-[8px]" fill="#ef4444">Cumulative %</text>
      </svg>

      <div className="mt-2 text-center text-xs text-gray-600 dark:text-gray-400">
        Top {nComponents} components: {eigenvalues.slice(0, nComponents).map((_, i) =>
          pcLabels[i]).join(', ')}
      </div>
    </div>
  )
}

export default function PCAClustering() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        PCA and Feature Clustering
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Financial features are highly correlated -- momentum at different lookbacks,
        various volatility measures, and related fundamental metrics share substantial
        information. PCA and clustering methods reduce dimensionality and identify
        the true independent sources of variation in Indian equity data. This is
        essential for building parsimonious ML models that generalize well.
      </p>

      <DefinitionBlock
        title="Principal Component Analysis (PCA)"
        label="Definition 12.9"
        definition="PCA finds orthogonal linear combinations of features (principal components) that maximize explained variance. The k-th principal component is the direction of maximum variance orthogonal to the first k-1 components. PCA eigenvectors of the covariance matrix provide the optimal linear dimensionality reduction."
        notation="Z = X W \quad \text{where } W = [w_1, ..., w_K] \text{ are eigenvectors of } \Sigma = X^TX/(N-1)"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        PCA for Financial Features
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The eigendecomposition of the feature covariance matrix reveals the principal
        sources of variation:
      </p>

      <BlockMath math="\Sigma = W \Lambda W^T \quad \text{where } \Lambda = \text{diag}(\lambda_1, ..., \lambda_K)" />

      <BlockMath math="\text{Variance explained by PC}_k = \frac{\lambda_k}{\sum_{j=1}^{K} \lambda_j}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For Nifty 50 stock returns, the first principal component typically explains
        40-50% of variance (the market factor), with sector rotation and size factors
        captured by subsequent components.
      </p>

      <TheoremBlock
        title="Optimal Dimensionality Selection"
        label="Theorem 12.9"
        statement="The optimal number of principal components k^* minimizes the out-of-sample prediction error. By the Marchenko-Pastur law, eigenvalues below the noise threshold \lambda_+ = \sigma^2(1 + \sqrt{N/T})^2 are attributable to random noise and should be discarded."
        proof="For a random matrix X of dimension T x N with i.i.d. entries of variance \sigma^2, the eigenvalues of X^TX/T follow the Marchenko-Pastur distribution with maximum eigenvalue \lambda_+ = \sigma^2(1 + \sqrt{N/T})^2. Eigenvalues above \lambda_+ carry genuine signal; those below are noise."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Feature Clustering
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Hierarchical clustering groups correlated features, enabling cluster-level
        feature selection. The distance between features is derived from their correlation:
      </p>

      <BlockMath math="d(f_i, f_j) = \sqrt{2(1 - |\rho_{ij}|)}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The optimal number of clusters can be determined using the silhouette score:
      </p>

      <BlockMath math="s(i) = \frac{b(i) - a(i)}{\max(a(i), b(i))}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="a(i)" /> is the mean intra-cluster distance and{' '}
        <InlineMath math="b(i)" /> is the mean nearest-cluster distance.
      </p>

      <NoteBlock title="PCA Interpretation for Nifty 50" type="historical">
        <ul className="space-y-1 text-sm">
          <li><strong>PC1 (40-50%):</strong> Market factor -- correlated with Nifty 50 index returns</li>
          <li><strong>PC2 (10-15%):</strong> Sector rotation -- IT vs Banking, Domestic vs Export</li>
          <li><strong>PC3 (5-8%):</strong> Size/momentum -- large vs small cap performance dispersion</li>
          <li><strong>PC4-5 (3-5%):</strong> Value-growth and volatility factors</li>
          <li><strong>Remaining:</strong> Idiosyncratic and noise components below M-P threshold</li>
        </ul>
      </NoteBlock>

      <InteractivePCA />

      <PythonCode
        title="pca_clustering.py"
        runnable
        code={`import numpy as np

class FinancialPCA:
    """PCA for financial feature reduction."""

    def __init__(self, n_components=None):
        self.n_components = n_components
        self.components_ = None
        self.explained_variance_ = None

    def fit(self, X):
        # Center data
        self.mean_ = X.mean(axis=0)
        X_centered = X - self.mean_

        # Covariance matrix
        cov = X_centered.T @ X_centered / (len(X) - 1)

        # Eigendecomposition
        eigenvalues, eigenvectors = np.linalg.eigh(cov)
        # Sort descending
        idx = np.argsort(-eigenvalues)
        eigenvalues = eigenvalues[idx]
        eigenvectors = eigenvectors[:, idx]

        total_var = eigenvalues.sum()
        self.explained_variance_ = eigenvalues / total_var
        self.eigenvalues_ = eigenvalues

        if self.n_components is None:
            self.n_components = len(eigenvalues)
        self.components_ = eigenvectors[:, :self.n_components]
        return self

    def transform(self, X):
        return (X - self.mean_) @ self.components_

    def marchenko_pastur_threshold(self, n_samples, n_features, noise_var=1.0):
        """Compute M-P upper bound for noise eigenvalues."""
        q = n_features / n_samples
        return noise_var * (1 + np.sqrt(q)) ** 2

class FeatureClusterer:
    """Correlation-based feature clustering."""

    def __init__(self, feature_names):
        self.feature_names = feature_names

    def correlation_distance(self, X):
        corr = np.corrcoef(X.T)
        return np.sqrt(2 * (1 - np.abs(corr)))

    def agglomerative_cluster(self, X, n_clusters):
        dist = self.correlation_distance(X)
        n = len(self.feature_names)
        labels = list(range(n))

        # Simple single-linkage
        for _ in range(n - n_clusters):
            min_dist = np.inf
            merge_i, merge_j = 0, 1
            for i in range(n):
                for j in range(i + 1, n):
                    if labels[i] != labels[j] and dist[i, j] < min_dist:
                        min_dist = dist[i, j]
                        merge_i, merge_j = labels[i], labels[j]

            for k in range(n):
                if labels[k] == merge_j:
                    labels[k] = merge_i

        # Renumber
        unique = sorted(set(labels))
        label_map = {old: new for new, old in enumerate(unique)}
        return [label_map[l] for l in labels]

# Generate correlated Nifty features
np.random.seed(42)
n_samples = 500
feature_names = ['mom_5d', 'mom_10d', 'mom_20d', 'vol_5d', 'vol_10d',
                 'fii_flow', 'dii_flow', 'rsi', 'macd', 'obv']

# Create correlated feature groups
market = np.random.randn(n_samples)
momentum = np.random.randn(n_samples)
vol_factor = np.random.randn(n_samples)
flow_factor = np.random.randn(n_samples)
noise = np.random.randn(n_samples, 10) * 0.3

X = np.column_stack([
    market + momentum + noise[:, 0],        # mom_5d
    market + 0.9*momentum + noise[:, 1],    # mom_10d
    market + 0.8*momentum + noise[:, 2],    # mom_20d
    vol_factor + noise[:, 3],                # vol_5d
    0.9*vol_factor + noise[:, 4],           # vol_10d
    flow_factor + noise[:, 5],               # fii_flow
    -0.7*flow_factor + noise[:, 6],         # dii_flow (inversely correlated)
    momentum + noise[:, 7],                  # rsi (momentum related)
    0.8*momentum + noise[:, 8],             # macd (momentum related)
    flow_factor * 0.5 + noise[:, 9],        # obv (flow related)
])

# PCA
pca = FinancialPCA(n_components=10)
pca.fit(X)

mp_threshold = pca.marchenko_pastur_threshold(n_samples, 10)

print("=" * 60)
print("  PCA Analysis - Nifty 50 Feature Matrix")
print("=" * 60)
print(f"\\nSamples: {n_samples}, Features: {len(feature_names)}")
print(f"M-P noise threshold: {mp_threshold:.3f}")
print(f"\\n{'PC':<5} {'Eigenvalue':>12} {'Var Explained':>14} {'Cumulative':>11} {'Signal?':>8}")
print("-" * 55)
cum = 0
for i in range(10):
    cum += pca.explained_variance_[i] * 100
    signal = pca.eigenvalues_[i] > mp_threshold
    print(f"PC{i+1:<3} {pca.eigenvalues_[i]:>12.3f} "
          f"{pca.explained_variance_[i]*100:>13.1f}% "
          f"{cum:>10.1f}% "
          f"{'YES' if signal else 'NO':>8}")

# Feature clustering
clusterer = FeatureClusterer(feature_names)
labels = clusterer.agglomerative_cluster(X, n_clusters=4)

print(f"\\nFeature Clusters (k=4):")
for c in range(4):
    members = [feature_names[i] for i in range(10) if labels[i] == c]
    print(f"  Cluster {c}: {', '.join(members)}")`}
      />

      <ExampleBlock
        title="Determining PCA Components for Nifty Feature Set"
        difficulty="intermediate"
        problem="You have 10 features for a Nifty alpha model with 500 daily observations. PCA eigenvalues are [3.2, 1.8, 1.1, 0.7, 0.5, 0.35, 0.2, 0.08, 0.05, 0.02]. The M-P threshold is 0.42. How many components should you retain?"
        solution={[
          {
            step: 'Identify signal components via M-P threshold',
            formula: '\\lambda_+ = \\sigma^2(1 + \\sqrt{10/500})^2 = 0.42',
            explanation: 'Eigenvalues above 0.42 contain genuine signal; below is noise.',
          },
          {
            step: 'Count signal components',
            formula: '\\lambda_1=3.2, \\lambda_2=1.8, \\lambda_3=1.1, \\lambda_4=0.7, \\lambda_5=0.5 > 0.42',
            explanation: 'First 5 components are above the M-P threshold. Components 6-10 are noise.',
          },
          {
            step: 'Compute variance explained',
            formula: '\\text{Cumulative} = (3.2+1.8+1.1+0.7+0.5)/7.98 = 91.2\\%',
            explanation: '5 components explain 91.2% of total variance. Retain k*=5 components, discarding the 5 noise dimensions. This reduces the feature space by 50% while preserving signal.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          PCA and feature clustering are essential preprocessing steps for financial ML.
          PCA reveals the true dimensionality of Indian equity feature space (typically
          3-5 independent factors explain most variation). Feature clustering identifies
          redundant feature groups, enabling representative feature selection. Use the
          Marchenko-Pastur threshold to objectively separate signal from noise eigenvalues,
          and correlation-based clustering to avoid feeding redundant features into ML
          models, which inflates overfitting risk and degrades out-of-sample performance.
        </p>
      </NoteBlock>
    </div>
  )
}
