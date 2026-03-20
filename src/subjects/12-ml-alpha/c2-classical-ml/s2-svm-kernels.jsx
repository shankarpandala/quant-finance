import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveSVM() {
  const [C, setC] = useState(1.0)
  const [gamma, setGamma] = useState(0.5)
  const [kernelType, setKernelType] = useState('rbf')

  const marginWidth = 2 / (C + 0.1)
  const complexity = kernelType === 'linear' ? 1 : kernelType === 'rbf' ? gamma * 3 : 2
  const nSupportVectors = Math.round(20 / C + 5 * complexity)
  const trainAcc = Math.min(0.99, 0.50 + 0.4 * complexity * Math.min(C, 3) / 3)
  const testAcc = Math.max(0.48, trainAcc - 0.15 * complexity * C / 5)

  const points = [
    { x: 80, y: 40, cls: 1 }, { x: 120, y: 60, cls: 1 }, { x: 90, y: 80, cls: 1 },
    { x: 140, y: 30, cls: 1 }, { x: 110, y: 50, cls: 1 }, { x: 70, y: 65, cls: 1 },
    { x: 250, y: 100, cls: -1 }, { x: 280, y: 80, cls: -1 }, { x: 260, y: 120, cls: -1 },
    { x: 300, y: 90, cls: -1 }, { x: 270, y: 60, cls: -1 }, { x: 240, y: 85, cls: -1 },
  ]

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: SVM Decision Boundary
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust SVM hyperparameters for classifying Nifty 50 up/down days.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>C (Regularization) = {C.toFixed(1)}</span>
          <input type="range" min="0.01" max="10" step="0.1" value={C}
            onChange={e => setC(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Gamma = {gamma.toFixed(2)}</span>
          <input type="range" min="0.01" max="5" step="0.05" value={gamma}
            onChange={e => setGamma(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Kernel: {kernelType.toUpperCase()}</span>
          <select value={kernelType} onChange={e => setKernelType(e.target.value)}
            className="rounded border border-gray-300 px-2 py-1 text-xs dark:border-gray-600 dark:bg-gray-800">
            <option value="linear">Linear</option>
            <option value="rbf">RBF (Gaussian)</option>
            <option value="poly">Polynomial</option>
          </select>
        </label>
      </div>

      <svg viewBox="0 0 380 160" className="w-full max-w-md mx-auto block">
        <rect x="0" y="0" width="190" height="160" fill="#dbeafe" opacity="0.3" />
        <rect x="190" y="0" width="190" height="160" fill="#fecaca" opacity="0.3" />
        <line x1="190" y1="0" x2="190" y2="160" stroke="#6366f1" strokeWidth="2" />
        <line x1={190 - marginWidth * 30} y1="0" x2={190 - marginWidth * 30} y2="160"
          stroke="#6366f1" strokeWidth="1" strokeDasharray="4" opacity="0.5" />
        <line x1={190 + marginWidth * 30} y1="0" x2={190 + marginWidth * 30} y2="160"
          stroke="#6366f1" strokeWidth="1" strokeDasharray="4" opacity="0.5" />
        <text x="190" y="155" textAnchor="middle" className="text-[8px]" fill="#6366f1">
          margin={marginWidth.toFixed(1)}
        </text>
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="6"
            fill={p.cls === 1 ? '#3b82f6' : '#ef4444'} stroke="white" strokeWidth="1" />
        ))}
      </svg>

      <div className="mt-3 grid grid-cols-4 gap-2 text-center text-xs">
        <div className="rounded bg-gray-100 p-2 dark:bg-gray-800">
          <span className="text-gray-500">Support Vectors</span>
          <p className="font-bold text-indigo-600">{nSupportVectors}</p>
        </div>
        <div className="rounded bg-gray-100 p-2 dark:bg-gray-800">
          <span className="text-gray-500">Train Acc</span>
          <p className="font-bold text-green-600">{(trainAcc * 100).toFixed(1)}%</p>
        </div>
        <div className="rounded bg-gray-100 p-2 dark:bg-gray-800">
          <span className="text-gray-500">Test Acc</span>
          <p className="font-bold text-blue-600">{(testAcc * 100).toFixed(1)}%</p>
        </div>
        <div className="rounded bg-gray-100 p-2 dark:bg-gray-800">
          <span className="text-gray-500">Margin</span>
          <p className="font-bold text-amber-600">{marginWidth.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}

export default function SVMKernels() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Support Vector Machines and Kernel Methods
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Support Vector Machines find the maximum-margin hyperplane that separates classes
        in feature space. Kernel methods extend SVMs to capture nonlinear patterns by
        implicitly mapping features into high-dimensional spaces. For Indian equity
        classification tasks (predicting Nifty direction, sector rotation signals),
        SVMs offer strong regularization and theoretical guarantees.
      </p>

      <DefinitionBlock
        title="Support Vector Machine"
        label="Definition 12.5"
        definition="An SVM finds the hyperplane w^T x + b = 0 that maximizes the margin 2/||w|| between two classes. Support vectors are the training points closest to the decision boundary. The soft-margin SVM allows misclassifications controlled by the regularization parameter C."
        notation="\min_{w,b} \frac{1}{2}||w||^2 + C\sum_{i=1}^{N} \xi_i \quad \text{s.t.} \quad y_i(w^T x_i + b) \geq 1 - \xi_i"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Kernel Trick
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The kernel function computes inner products in a high-dimensional feature space
        without explicit transformation:
      </p>

      <BlockMath math="K(x_i, x_j) = \phi(x_i)^T \phi(x_j)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Common kernels for financial applications:
      </p>

      <BlockMath math="\text{Linear: } K(x, x') = x^T x'" />
      <BlockMath math="\text{RBF: } K(x, x') = \exp\left(-\gamma ||x - x'||^2\right)" />
      <BlockMath math="\text{Polynomial: } K(x, x') = (x^T x' + r)^d" />

      <TheoremBlock
        title="Mercer's Theorem"
        label="Theorem 12.5"
        statement="A function K(x, x') is a valid kernel if and only if the Gram matrix K_{ij} = K(x_i, x_j) is positive semi-definite for any finite set of points. This ensures that K corresponds to an inner product in some (possibly infinite-dimensional) feature space."
        proof="If K is a valid kernel, then K_{ij} = \phi(x_i)^T\phi(x_j). The Gram matrix G = \Phi\Phi^T where \Phi is the feature matrix. For any vector v: v^TGv = v^T\Phi\Phi^Tv = ||\Phi^Tv||^2 \geq 0. Hence G is PSD."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Dual Formulation
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The SVM dual problem enables the kernel trick:
      </p>

      <BlockMath math="\max_\alpha \sum_{i=1}^{N} \alpha_i - \frac{1}{2}\sum_{i,j} \alpha_i \alpha_j y_i y_j K(x_i, x_j)" />

      <BlockMath math="\text{s.t.} \quad 0 \leq \alpha_i \leq C, \quad \sum_{i=1}^{N} \alpha_i y_i = 0" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Points with <InlineMath math="\alpha_i > 0" /> are support vectors. The decision
        function becomes:
      </p>

      <BlockMath math="f(x) = \text{sign}\left(\sum_{i \in SV} \alpha_i y_i K(x_i, x) + b\right)" />

      <NoteBlock title="SVMs for Indian Equity Trading" type="tip">
        <ul className="space-y-1 text-sm">
          <li><strong>Regime Classification:</strong> SVM to classify Nifty into bull/bear/sideways
            regimes using macro features</li>
          <li><strong>Sector Rotation:</strong> Multi-class SVM for predicting best-performing
            Nifty sector using inter-sector features</li>
          <li><strong>Scalability:</strong> SVMs are O(N^2) to O(N^3) in training -- consider
            linear SVMs (liblinear) for large NSE universes</li>
          <li><strong>Feature Scaling:</strong> SVMs require normalized features -- critical when
            mixing price data (INR thousands) with ratios (0-1 range)</li>
        </ul>
      </NoteBlock>

      <InteractiveSVM />

      <PythonCode
        title="svm_alpha.py"
        runnable
        code={`import numpy as np

class SimpleSVM:
    """Simplified SVM for financial classification."""

    def __init__(self, C=1.0, kernel='rbf', gamma=0.5, max_iter=100):
        self.C = C
        self.kernel_type = kernel
        self.gamma = gamma
        self.max_iter = max_iter

    def _kernel(self, X1, X2):
        if self.kernel_type == 'linear':
            return X1 @ X2.T
        elif self.kernel_type == 'rbf':
            sq_dist = (np.sum(X1**2, axis=1, keepdims=True) +
                      np.sum(X2**2, axis=1) - 2 * X1 @ X2.T)
            return np.exp(-self.gamma * sq_dist)
        elif self.kernel_type == 'poly':
            return (X1 @ X2.T + 1) ** 2
        return X1 @ X2.T

    def fit(self, X, y):
        self.X_train = X
        self.y_train = y
        n = len(y)
        K = self._kernel(X, X)

        # Simplified SMO-like optimization
        self.alphas = np.zeros(n)
        self.b = 0

        for iteration in range(self.max_iter):
            for i in range(n):
                Ei = np.sum(self.alphas * y * K[i]) + self.b - y[i]
                if (y[i] * Ei < -0.01 and self.alphas[i] < self.C) or \
                   (y[i] * Ei > 0.01 and self.alphas[i] > 0):
                    j = np.random.randint(n)
                    if j == i:
                        continue
                    Ej = np.sum(self.alphas * y * K[j]) + self.b - y[j]
                    eta = 2 * K[i, j] - K[i, i] - K[j, j]
                    if eta >= 0:
                        continue
                    alpha_j_new = self.alphas[j] - y[j] * (Ei - Ej) / eta
                    alpha_j_new = np.clip(alpha_j_new, 0, self.C)
                    self.alphas[j] = alpha_j_new

        self.support_idx = np.where(self.alphas > 1e-5)[0]
        return self

    def predict(self, X):
        K = self._kernel(X, self.X_train)
        scores = K @ (self.alphas * self.y_train) + self.b
        return np.sign(scores)

# Generate Nifty 50 up/down classification data
np.random.seed(42)
n = 500
features = np.random.randn(n, 6)  # 6 features
feature_names = ['momentum', 'volatility', 'fii_flow', 'rsi', 'vix', 'volume']

# Nonlinear classification boundary
y = np.sign(0.5 * features[:, 0] * features[:, 2] -  # momentum x FII
            0.3 * features[:, 1] +                      # volatility
            0.4 * (features[:, 4] < -0.5).astype(float) + # low VIX regime
            np.random.randn(n) * 0.3)
y[y == 0] = 1

# Time-series split
split = int(0.7 * n)
X_train, X_test = features[:split], features[split:]
y_train, y_test = y[:split], y[split:]

# Normalize features
mu, sigma = X_train.mean(axis=0), X_train.std(axis=0)
X_train_n = (X_train - mu) / sigma
X_test_n = (X_test - mu) / sigma

results = {}
for kernel in ['linear', 'rbf', 'poly']:
    svm = SimpleSVM(C=1.0, kernel=kernel, gamma=0.5, max_iter=50)
    svm.fit(X_train_n, y_train)

    train_pred = svm.predict(X_train_n)
    test_pred = svm.predict(X_test_n)

    train_acc = np.mean(train_pred == y_train)
    test_acc = np.mean(test_pred == y_test)
    n_sv = len(svm.support_idx)

    results[kernel] = {'train': train_acc, 'test': test_acc, 'sv': n_sv}

print("=" * 55)
print("  SVM Classification - Nifty 50 Direction")
print("=" * 55)
print(f"\\nSamples: {n} (train={split}, test={n-split})")
print(f"Features: {', '.join(feature_names)}")
print(f"\\n{'Kernel':<10} {'Train Acc':>10} {'Test Acc':>10} {'SVs':>6}")
print("-" * 40)
for kernel, r in results.items():
    print(f"{kernel:<10} {r['train']*100:>9.1f}% {r['test']*100:>9.1f}% {r['sv']:>6}")

best = max(results.items(), key=lambda x: x[1]['test'])
print(f"\\nBest kernel: {best[0]} (test acc = {best[1]['test']*100:.1f}%)")
print(f"\\nNote: RBF kernel captures nonlinear momentum x FII")
print(f"interaction, which linear SVM cannot model.")`}
      />

      <ExampleBlock
        title="Choosing SVM Kernel for Nifty Regime Classification"
        difficulty="intermediate"
        problem="You have 5 features (momentum, vol, FII flow, RSI, VIX) and want to classify Nifty regimes. Linear SVM gives 52% accuracy, RBF gives 55% with gamma=0.5. What does this tell you about the data?"
        solution={[
          {
            step: 'Interpret the accuracy gap',
            formula: 'Acc_{RBF} - Acc_{linear} = 55\\% - 52\\% = 3\\%',
            explanation: 'The RBF kernel outperforms, indicating nonlinear feature interactions exist.',
          },
          {
            step: 'Identify likely interactions',
            formula: 'K_{RBF}(x, x\') = \\exp(-0.5||x - x\'||^2)',
            explanation: 'RBF captures interactions like momentum working only in low-VIX regimes, or FII flows predicting returns only with volume confirmation.',
          },
          {
            step: 'Practical considerations',
            formula: '\\text{Gamma tuning: } \\gamma \\in \\{0.1, 0.5, 1.0, 2.0\\}',
            explanation: 'Higher gamma = more complex boundary (risk overfitting). Use purged CV to select optimal gamma. For Indian equity data with 252 trading days/year, overfitting is a major concern.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          SVMs with kernel methods are effective for classification tasks in Indian equity
          trading -- regime detection, direction prediction, and sector rotation. The
          kernel trick enables capturing nonlinear feature interactions without explicit
          feature engineering. However, SVMs do not scale well to very large datasets
          and require careful feature normalization. For NSE-wide stock selection,
          consider linear SVMs or kernel approximations. For concentrated strategies
          (Nifty 50, Bank Nifty), RBF kernels can capture valuable nonlinear patterns.
        </p>
      </NoteBlock>
    </div>
  )
}
