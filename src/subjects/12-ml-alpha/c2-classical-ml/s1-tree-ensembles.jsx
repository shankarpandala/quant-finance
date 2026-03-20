import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveTreeEnsemble() {
  const [nTrees, setNTrees] = useState(100)
  const [maxDepth, setMaxDepth] = useState(5)
  const [learningRate, setLearningRate] = useState(0.1)
  const [minSamples, setMinSamples] = useState(50)

  const biasReduction = 1 - Math.exp(-maxDepth * 0.3)
  const varianceReduction = 1 / Math.sqrt(nTrees)
  const overfitRisk = maxDepth / 10 * (1 - varianceReduction) * (50 / minSamples)
  const expectedAcc = 0.50 + 0.08 * biasReduction * (1 - overfitRisk * 0.5) * Math.min(learningRate * 5, 1)
  const trainAcc = expectedAcc + overfitRisk * 0.15
  const gap = trainAcc - expectedAcc

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Tree Ensemble Hyperparameter Tuning
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Tune gradient boosting parameters for predicting Nifty 50 next-day returns.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Trees = {nTrees}</span>
          <input type="range" min="10" max="500" step="10" value={nTrees}
            onChange={e => setNTrees(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Max Depth = {maxDepth}</span>
          <input type="range" min="1" max="10" step="1" value={maxDepth}
            onChange={e => setMaxDepth(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Learning Rate = {learningRate.toFixed(2)}</span>
          <input type="range" min="0.01" max="0.3" step="0.01" value={learningRate}
            onChange={e => setLearningRate(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Min Samples = {minSamples}</span>
          <input type="range" min="10" max="200" step="10" value={minSamples}
            onChange={e => setMinSamples(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        <div className="rounded-lg bg-green-50 p-2 dark:bg-green-900/30">
          <span className="text-gray-500">Train Accuracy</span>
          <p className="text-base font-bold text-green-600">{(trainAcc * 100).toFixed(1)}%</p>
        </div>
        <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-900/30">
          <span className="text-gray-500">Test Accuracy</span>
          <p className="text-base font-bold text-blue-600">{(expectedAcc * 100).toFixed(1)}%</p>
        </div>
        <div className="rounded-lg bg-amber-50 p-2 dark:bg-amber-900/30">
          <span className="text-gray-500">Overfit Gap</span>
          <p className={`text-base font-bold ${gap > 0.05 ? 'text-red-500' : 'text-amber-600'}`}>
            {(gap * 100).toFixed(1)}%
          </p>
        </div>
        <div className="rounded-lg bg-indigo-50 p-2 dark:bg-indigo-900/30">
          <span className="text-gray-500">Overfit Risk</span>
          <p className={`text-base font-bold ${overfitRisk > 0.5 ? 'text-red-500' : 'text-indigo-600'}`}>
            {overfitRisk > 0.5 ? 'HIGH' : overfitRisk > 0.25 ? 'MEDIUM' : 'LOW'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function TreeEnsembles() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Tree Ensembles for Alpha Generation
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Decision tree ensembles -- Random Forests and Gradient Boosting Machines (GBM) --
        are the workhorses of ML-based alpha generation. Their ability to capture nonlinear
        interactions between features makes them ideal for modeling complex relationships
        in Indian equity data, where factors like FII flows, sector rotation, and macro
        indicators interact in non-obvious ways.
      </p>

      <DefinitionBlock
        title="Gradient Boosting Machine (GBM)"
        label="Definition 12.4"
        definition="A Gradient Boosting Machine builds an ensemble of weak learners (shallow decision trees) sequentially, where each new tree fits the negative gradient (pseudo-residuals) of the loss function from the previous iteration. The final prediction is the sum of all trees' predictions, weighted by the learning rate."
        notation="\hat{y}_i^{(M)} = \sum_{m=1}^{M} \eta \cdot h_m(x_i)"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Random Forest vs. Gradient Boosting
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Random Forests build trees independently (bagging) while GBM builds them
        sequentially (boosting):
      </p>

      <BlockMath math="\text{RF: } \hat{y} = \frac{1}{M}\sum_{m=1}^{M} h_m(x) \quad \text{(parallel, variance reduction)}" />

      <BlockMath math="\text{GBM: } \hat{y}^{(m)} = \hat{y}^{(m-1)} + \eta \cdot h_m(x) \quad \text{(sequential, bias reduction)}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        In GBM, each tree <InlineMath math="h_m" /> is trained to predict the negative
        gradient of the loss function:
      </p>

      <BlockMath math="h_m = \arg\min_h \sum_{i=1}^{N} \left[-\frac{\partial L(y_i, \hat{y}_i^{(m-1)})}{\partial \hat{y}_i^{(m-1)}} - h(x_i)\right]^2" />

      <TheoremBlock
        title="Bias-Variance Decomposition of Ensembles"
        label="Theorem 12.4"
        statement="For a Random Forest with M trees of variance \sigma^2 and pairwise correlation \rho, the ensemble variance is: \text{Var}(\hat{y}_{RF}) = \rho\sigma^2 + \frac{1-\rho}{M}\sigma^2. As M \to \infty, the variance converges to \rho\sigma^2, not zero. Feature subsampling reduces \rho."
        proof="Each tree has variance \sigma^2. The variance of the average of M correlated random variables: \text{Var}(\bar{X}) = \frac{1}{M^2}[M\sigma^2 + M(M-1)\rho\sigma^2] = \frac{\sigma^2}{M} + \frac{M-1}{M}\rho\sigma^2 \xrightarrow{M\to\infty} \rho\sigma^2."
      />

      <NoteBlock title="Tree Ensembles for Indian Equity Alpha" type="historical">
        <ul className="space-y-1 text-sm">
          <li><strong>Feature Interactions:</strong> Trees naturally capture nonlinear interactions
            like FII flows x India VIX x sector momentum</li>
          <li><strong>Mixed Feature Types:</strong> Handle both continuous (returns, volatility)
            and categorical (sector, cap-size bucket) features</li>
          <li><strong>Missing Data:</strong> XGBoost/LightGBM handle missing values natively --
            important for Indian stocks with inconsistent fundamental data</li>
          <li><strong>Zerodha Kite Integration:</strong> Model predictions can be served via
            Zerodha's Kite Connect API for live trading</li>
        </ul>
      </NoteBlock>

      <InteractiveTreeEnsemble />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Purged Cross-Validation
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Standard k-fold CV is invalid for financial data due to information leakage.
        Purged k-fold CV removes observations from the training set that overlap with
        the test set's label span:
      </p>

      <BlockMath math="\text{Train}_k^{purged} = \text{Train}_k \setminus \{i : T_i \cap [\min(T_{test}), \max(T_{test})] \neq \emptyset\}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Additionally, an embargo period <InlineMath math="\delta" /> removes observations
        immediately after the test set to prevent serial correlation leakage.
      </p>

      <PythonCode
        title="tree_ensemble_alpha.py"
        runnable
        code={`import numpy as np

class SimpleGBM:
    """Simplified GBM for demonstrating alpha generation."""

    def __init__(self, n_trees=100, max_depth=3, learning_rate=0.1,
                 min_samples_leaf=50):
        self.n_trees = n_trees
        self.max_depth = max_depth
        self.lr = learning_rate
        self.min_samples = min_samples_leaf
        self.trees = []

    def _build_stump(self, X, residuals):
        """Build a single decision stump (depth-1 tree)."""
        best_feature, best_threshold, best_value = 0, 0, np.mean(residuals)
        best_mse = np.var(residuals)

        for j in range(X.shape[1]):
            thresholds = np.percentile(X[:, j], [25, 50, 75])
            for thresh in thresholds:
                left = residuals[X[:, j] <= thresh]
                right = residuals[X[:, j] > thresh]
                if len(left) < self.min_samples or len(right) < self.min_samples:
                    continue
                mse = (np.var(left) * len(left) + np.var(right) * len(right)) / len(residuals)
                if mse < best_mse:
                    best_mse = mse
                    best_feature = j
                    best_threshold = thresh
                    best_value = (np.mean(left), np.mean(right))

        return {'feature': best_feature, 'threshold': best_threshold, 'values': best_value}

    def fit(self, X, y):
        self.base_pred = np.mean(y)
        predictions = np.full(len(y), self.base_pred)

        for m in range(self.n_trees):
            residuals = y - predictions
            tree = self._build_stump(X, residuals)
            self.trees.append(tree)

            # Update predictions
            mask = X[:, tree['feature']] <= tree['threshold']
            if isinstance(tree['values'], tuple):
                predictions[mask] += self.lr * tree['values'][0]
                predictions[~mask] += self.lr * tree['values'][1]
            else:
                predictions += self.lr * tree['values']

        return self

    def predict(self, X):
        predictions = np.full(X.shape[0], self.base_pred)
        for tree in self.trees:
            mask = X[:, tree['feature']] <= tree['threshold']
            if isinstance(tree['values'], tuple):
                predictions[mask] += self.lr * tree['values'][0]
                predictions[~mask] += self.lr * tree['values'][1]
        return predictions

# Generate synthetic Nifty 50 alpha features
np.random.seed(42)
n_samples = 1000
n_features = 8

feature_names = ['momentum_20d', 'vol_ratio', 'rsi_14', 'fii_flow',
                 'india_vix', 'sector_rotation', 'earnings_surprise', 'delivery_pct']

X = np.random.randn(n_samples, n_features)
# Nonlinear target with interaction effects
y = (0.3 * X[:, 0] * (X[:, 4] < 0) +   # Momentum works in low-VIX
     0.2 * X[:, 3] * (X[:, 1] > 0) +     # FII flow with volume confirmation
     0.1 * X[:, 6] +                       # Earnings surprise
     np.random.randn(n_samples) * 0.5)     # Noise

# Train/test split (time-series)
split = int(0.7 * n_samples)
X_train, X_test = X[:split], X[split:]
y_train, y_test = y[:split], y[split:]

# Fit GBM
model = SimpleGBM(n_trees=150, max_depth=3, learning_rate=0.05, min_samples_leaf=30)
model.fit(X_train, y_train)

# Evaluate
train_pred = model.predict(X_train)
test_pred = model.predict(X_test)

train_corr = np.corrcoef(y_train, train_pred)[0, 1]
test_corr = np.corrcoef(y_test, test_pred)[0, 1]
train_mse = np.mean((y_train - train_pred) ** 2)
test_mse = np.mean((y_test - test_pred) ** 2)

# Signal-based returns
positions = np.sign(test_pred)
actual_rets = y_test
strategy_rets = positions * actual_rets
sharpe = np.mean(strategy_rets) / np.std(strategy_rets) * np.sqrt(252)

print("=" * 55)
print("  GBM Alpha Model - Nifty 50 Features")
print("=" * 55)
print(f"\\nModel: {model.n_trees} trees, depth={model.max_depth}, lr={model.lr}")
print(f"\\nTrain IC (correlation): {train_corr:.3f}")
print(f"Test IC (correlation):  {test_corr:.3f}")
print(f"Train MSE:              {train_mse:.4f}")
print(f"Test MSE:               {test_mse:.4f}")
print(f"\\nStrategy Metrics (test set):")
print(f"  Hit rate:   {np.mean(strategy_rets > 0)*100:.1f}%")
print(f"  Avg return: {np.mean(strategy_rets)*100:.3f}%")
print(f"  Sharpe:     {sharpe:.2f}")
print(f"\\nTop Features Used (by tree split count):")
feature_counts = np.zeros(n_features)
for tree in model.trees:
    feature_counts[tree['feature']] += 1
for idx in np.argsort(-feature_counts)[:5]:
    print(f"  {feature_names[idx]:<20} {feature_counts[idx]:.0f} splits")`}
      />

      <ExampleBlock
        title="GBM Hyperparameter Selection for Nifty Alpha"
        difficulty="intermediate"
        problem="You're building a GBM to predict Nifty 50 next-day returns. Training accuracy is 58% but test accuracy is 51%. What hyperparameter adjustments would you make?"
        solution={[
          {
            step: 'Diagnose overfitting',
            formula: '\\text{Gap} = 58\\% - 51\\% = 7\\% \\Rightarrow \\text{Overfitting}',
            explanation: 'The 7% train-test gap indicates the model has memorized training patterns that do not generalize.',
          },
          {
            step: 'Reduce model complexity',
            formula: '\\text{max\\_depth}: 5 \\to 3, \\quad \\text{min\\_samples\\_leaf}: 20 \\to 100',
            explanation: 'Shallower trees and larger leaf sizes reduce overfitting to noise.',
          },
          {
            step: 'Reduce learning rate and increase trees',
            formula: '\\eta: 0.1 \\to 0.03, \\quad M: 100 \\to 300',
            explanation: 'Lower learning rate with more trees produces smoother gradient descent in function space.',
          },
          {
            step: 'Add regularization',
            formula: '\\text{subsample}: 1.0 \\to 0.7, \\quad \\text{colsample}: 1.0 \\to 0.8',
            explanation: 'Row and column subsampling reduce correlation between trees, improving generalization. Target test accuracy of 53-55% for Nifty prediction, which is sufficient for profitable trading.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Tree ensembles excel at capturing nonlinear feature interactions in Indian equity
          data. For alpha generation, gradient boosting (XGBoost, LightGBM) typically
          outperforms Random Forests due to its sequential bias reduction. Critical
          implementation details include: purged cross-validation to prevent information
          leakage, sample weights for overlapping labels, and careful hyperparameter tuning
          to balance bias-variance for the low signal-to-noise ratio inherent in financial
          data. Even modest prediction accuracy (53-55%) translates to meaningful alpha
          when properly implemented with Nifty/Bank Nifty trading strategies.
        </p>
      </NoteBlock>
    </div>
  )
}
