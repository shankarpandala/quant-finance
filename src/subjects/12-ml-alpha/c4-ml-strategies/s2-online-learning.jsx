import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveOnlineLearning() {
  const [learningRate, setLearningRate] = useState(0.01)
  const [forgetFactor, setForgetFactor] = useState(0.99)
  const [updateFreq, setUpdateFreq] = useState(1)

  const nSteps = 20
  const weights = [0.5]
  const errors = []
  for (let t = 1; t < nSteps; t++) {
    const trueSignal = Math.sin(t * 0.5) * 0.3
    const pred = weights[t - 1] * 0.8
    const error = trueSignal - pred
    errors.push(Math.abs(error))
    const newWeight = weights[t - 1] * forgetFactor + learningRate * error
    weights.push(newWeight)
  }

  const avgError = errors.reduce((s, e) => s + e, 0) / errors.length
  const recentError = errors.slice(-5).reduce((s, e) => s + e, 0) / 5

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Online Learning Convergence
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust learning rate and forgetting factor for adapting to Nifty regime changes.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Learning Rate = {learningRate.toFixed(3)}</span>
          <input type="range" min="0.001" max="0.1" step="0.001" value={learningRate}
            onChange={e => setLearningRate(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Forget Factor = {forgetFactor.toFixed(3)}</span>
          <input type="range" min="0.9" max="1" step="0.005" value={forgetFactor}
            onChange={e => setForgetFactor(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Update Frequency = every {updateFreq} day(s)</span>
          <input type="range" min="1" max="5" step="1" value={updateFreq}
            onChange={e => setUpdateFreq(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 400 100" className="w-full max-w-md mx-auto block">
        {errors.map((e, i) => {
          const x = 30 + i * (350 / errors.length)
          const y = 90 - e * 200
          if (i > 0) {
            const prevX = 30 + (i - 1) * (350 / errors.length)
            const prevY = 90 - errors[i - 1] * 200
            return (
              <g key={i}>
                <line x1={prevX} y1={prevY} x2={x} y2={y} stroke="#ef4444" strokeWidth="1.5" />
                <circle cx={x} cy={y} r="2" fill="#ef4444" />
              </g>
            )
          }
          return <circle key={i} cx={x} cy={y} r="2" fill="#ef4444" />
        })}
        <text x="200" y="12" textAnchor="middle" className="text-[9px]" fill="#6b7280">Prediction Error Over Time</text>
      </svg>

      <div className="mt-2 grid grid-cols-2 gap-2 text-center text-xs">
        <div className="rounded bg-gray-100 p-2 dark:bg-gray-800">
          <span className="text-gray-500">Avg Error</span>
          <p className="font-bold text-red-500">{avgError.toFixed(4)}</p>
        </div>
        <div className="rounded bg-gray-100 p-2 dark:bg-gray-800">
          <span className="text-gray-500">Recent Error</span>
          <p className={`font-bold ${recentError < avgError ? 'text-green-600' : 'text-red-500'}`}>
            {recentError.toFixed(4)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function OnlineLearning() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Online Learning for Adaptive Trading
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Financial markets are non-stationary -- the relationships between features and
        returns change over time. Online learning algorithms continuously update model
        parameters as new data arrives, adapting to regime changes in Indian equity
        markets. This section covers online gradient descent, exponential forgetting,
        and adaptive model updating for Nifty/BSE trading strategies.
      </p>

      <DefinitionBlock
        title="Online Learning"
        label="Definition 12.11"
        definition="Online learning updates model parameters incrementally with each new observation, rather than retraining on the entire dataset. At each time step t, the model receives observation (x_t, y_t), makes prediction hat{y}_t = f(x_t; theta_{t-1}), and updates parameters: theta_t = theta_{t-1} - eta * gradient(L(y_t, hat{y}_t))."
        notation="\theta_t = \theta_{t-1} - \eta_t \nabla L(y_t, \hat{y}_t; \theta_{t-1})"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Online Gradient Descent
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For a linear model <InlineMath math="\hat{y}_t = w_t^T x_t" />, the online
        update with squared loss is:
      </p>

      <BlockMath math="w_{t+1} = w_t + \eta_t (y_t - w_t^T x_t) x_t" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The learning rate <InlineMath math="\eta_t" /> controls the speed of adaptation.
        A decaying schedule <InlineMath math="\eta_t = \eta_0 / \sqrt{t}" /> ensures
        convergence, while a constant <InlineMath math="\eta" /> enables tracking
        non-stationary targets.
      </p>

      <TheoremBlock
        title="Regret Bound for Online Learning"
        label="Theorem 12.11"
        statement="For online gradient descent with learning rate \eta_t = \eta_0/\sqrt{t} and convex loss, the cumulative regret relative to the best fixed predictor is bounded: R_T = \sum_{t=1}^{T} L_t(\theta_t) - \min_\theta \sum_{t=1}^{T} L_t(\theta) = O(\sqrt{T}). The average regret R_T/T \to 0 as T \to \infty."
        proof="By the standard analysis of OGD: R_T \leq \frac{||theta^*||^2}{2\eta_T} + \frac{1}{2}\sum_{t=1}^{T}\eta_t||g_t||^2. Choosing \eta_t = \eta_0/\sqrt{t} and bounding ||g_t|| \leq G: R_T \leq \frac{||theta^*||^2\sqrt{T}}{2\eta_0} + \frac{\eta_0 G^2\sqrt{T}}{2} = O(\sqrt{T})."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Exponentially Weighted Updates
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For tracking non-stationary financial relationships, exponential forgetting
        discounts older observations:
      </p>

      <BlockMath math="w_t = \lambda w_{t-1} + (1-\lambda) \cdot \text{update}_t, \quad \lambda \in (0, 1)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The effective window size is <InlineMath math="N_{eff} = 1/(1-\lambda)" />.
        For daily Nifty data, <InlineMath math="\lambda = 0.99" /> gives{' '}
        <InlineMath math="N_{eff} = 100" /> days, suitable for capturing quarterly
        regime changes.
      </p>

      <NoteBlock title="Online Learning for NSE Trading" type="tip">
        <ul className="space-y-1 text-sm">
          <li><strong>Daily Retraining:</strong> Update model weights after each NSE trading session
            using that day's realized returns</li>
          <li><strong>Regime Detection:</strong> Monitor prediction error magnitude -- a spike
            signals a regime change requiring faster adaptation</li>
          <li><strong>Concept Drift:</strong> Track feature importance stability over time using
            rolling SHAP values</li>
          <li><strong>Zerodha API:</strong> Implement online updates in the post-market session
            (15:30-16:00 IST) using Kite Connect data</li>
        </ul>
      </NoteBlock>

      <InteractiveOnlineLearning />

      <PythonCode
        title="online_learning.py"
        runnable
        code={`import numpy as np

class OnlineLinearModel:
    """Online learning model for NSE equity prediction."""

    def __init__(self, n_features, learning_rate=0.01,
                 forget_factor=0.99):
        self.w = np.zeros(n_features)
        self.b = 0
        self.lr = learning_rate
        self.lam = forget_factor
        self.errors = []

    def predict(self, x):
        return np.dot(self.w, x) + self.b

    def update(self, x, y_true):
        y_pred = self.predict(x)
        error = y_true - y_pred
        self.errors.append(error)

        # Exponential forgetting + gradient update
        self.w = self.lam * self.w + self.lr * error * x
        self.b = self.lam * self.b + self.lr * error

        return y_pred, error

    def rolling_mse(self, window=20):
        if len(self.errors) < window:
            return np.mean(np.array(self.errors) ** 2)
        return np.mean(np.array(self.errors[-window:]) ** 2)

class AdaptiveOnlineModel:
    """Adaptive learning rate based on error tracking."""

    def __init__(self, n_features, base_lr=0.01):
        self.model = OnlineLinearModel(n_features, base_lr)
        self.base_lr = base_lr
        self.error_ema = 0

    def predict_and_update(self, x, y_true):
        # Adaptive learning rate
        if len(self.model.errors) > 20:
            recent_mse = self.model.rolling_mse(20)
            long_mse = self.model.rolling_mse(100)
            if long_mse > 0:
                regime_change = recent_mse / long_mse
                self.model.lr = self.base_lr * min(3, max(0.3, regime_change))

        return self.model.update(x, y_true)

# Simulate non-stationary Nifty returns
np.random.seed(42)
n_days = 504  # 2 years
n_features = 5
feature_names = ['momentum', 'fii_flow', 'vix', 'volume', 'rsi']

# Generate features
X = np.random.randn(n_days, n_features)

# Non-stationary relationship (regime change at day 252)
true_w_1 = np.array([0.3, 0.2, -0.15, 0.1, 0.05])  # Regime 1
true_w_2 = np.array([0.1, -0.1, 0.25, 0.15, -0.2])  # Regime 2

y = np.zeros(n_days)
for t in range(n_days):
    w = true_w_1 if t < 252 else true_w_2
    y[t] = np.dot(w, X[t]) + np.random.randn() * 0.1

# Train online model
online = OnlineLinearModel(n_features, learning_rate=0.01, forget_factor=0.995)
adaptive = AdaptiveOnlineModel(n_features, base_lr=0.01)

online_preds, adaptive_preds = [], []
for t in range(n_days):
    pred_o, _ = online.update(X[t], y[t])
    pred_a, _ = adaptive.predict_and_update(X[t], y[t])
    online_preds.append(pred_o)
    adaptive_preds.append(pred_a)

# Evaluate in windows
windows = [(0, 126, 'Regime 1 (H1)'), (126, 252, 'Regime 1 (H2)'),
           (252, 378, 'Regime 2 (H1)'), (378, 504, 'Regime 2 (H2)')]

print("=" * 60)
print("  Online Learning - Non-Stationary Nifty Signals")
print("=" * 60)
print(f"\\nRegime change at day 252 (true weight vector flips)")
print(f"\\n{'Period':<20} {'Online RMSE':>12} {'Adaptive RMSE':>14} {'Better':>8}")
print("-" * 58)
for start, end, name in windows:
    o_rmse = np.sqrt(np.mean((y[start:end] - np.array(online_preds[start:end]))**2))
    a_rmse = np.sqrt(np.mean((y[start:end] - np.array(adaptive_preds[start:end]))**2))
    better = 'Adaptive' if a_rmse < o_rmse else 'Online'
    print(f"{name:<20} {o_rmse:>12.4f} {a_rmse:>14.4f} {better:>8}")

print(f"\\nOnline model final weights:")
for name, w in zip(feature_names, online.w):
    print(f"  {name:<12} {w:>+.4f}")
print(f"\\nTrue regime 2 weights:")
for name, w in zip(feature_names, true_w_2):
    print(f"  {name:<12} {w:>+.4f}")`}
      />

      <ExampleBlock
        title="Detecting Regime Change in Nifty Model"
        difficulty="intermediate"
        problem="Your online model's 20-day rolling MSE was 0.0015. After RBI announces an unexpected rate cut, the 20-day MSE spikes to 0.0045. What is the regime change ratio, and how should the learning rate adapt?"
        solution={[
          {
            step: 'Compute regime change ratio',
            formula: '\\text{ratio} = \\frac{MSE_{recent}}{MSE_{baseline}} = \\frac{0.0045}{0.0015} = 3.0',
            explanation: 'The error has tripled, indicating a significant regime change.',
          },
          {
            step: 'Adapt learning rate',
            formula: '\\eta_{new} = \\eta_{base} \\times \\min(3, \\max(0.3, 3.0)) = 3 \\times \\eta_{base}',
            explanation: 'Triple the learning rate to adapt quickly to the new regime (post-rate cut market dynamics).',
          },
          {
            step: 'Monitor convergence',
            formula: '\\text{Watch for } MSE_{recent}/MSE_{baseline} \\to 1.0',
            explanation: 'Once the ratio returns near 1.0 (model has adapted), reduce the learning rate back to baseline. This typically takes 2-4 weeks for Nifty after a major RBI policy shift.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Online learning enables ML-based trading strategies to adapt to the
          non-stationary nature of Indian equity markets. The exponential forgetting
          factor controls the trade-off between stability (using more history) and
          adaptability (responding to regime changes). Adaptive learning rates that
          increase during detected regime changes (RBI policy shifts, election results,
          global crises) enable faster model adaptation while maintaining stability
          during normal market conditions.
        </p>
      </NoteBlock>
    </div>
  )
}
