import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveKalmanFilter() {
  const [processNoise, setProcessNoise] = useState(0.001)
  const [measurementNoise, setMeasurementNoise] = useState(0.1)
  const [nPoints] = useState(100)

  const trueHedgeRatio = 0.42
  const generateData = () => {
    const observations = []
    const kalmanEstimates = []
    let beta = trueHedgeRatio
    let P = 1.0
    let betaHat = 0.5

    for (let t = 0; t < nPoints; t++) {
      const drift = Math.sin(t / 20) * 0.05
      beta = trueHedgeRatio + drift + (Math.random() - 0.5) * 0.02
      const observed = beta + (Math.random() - 0.5) * measurementNoise * 2

      // Kalman predict
      P = P + processNoise
      // Kalman update
      const K = P / (P + measurementNoise)
      betaHat = betaHat + K * (observed - betaHat)
      P = (1 - K) * P

      observations.push(observed)
      kalmanEstimates.push(betaHat)
    }
    return { observations, kalmanEstimates }
  }

  const { observations, kalmanEstimates } = generateData()
  const minY = Math.min(...observations, ...kalmanEstimates) - 0.05
  const maxY = Math.max(...observations, ...kalmanEstimates) + 0.05
  const chartW = 500
  const chartH = 200

  const toX = (i) => (i / (nPoints - 1)) * chartW
  const toY = (v) => chartH - ((v - minY) / (maxY - minY)) * chartH

  const obsPath = observations.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(v)}`).join(' ')
  const kalPath = kalmanEstimates.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(v)}`).join(' ')

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Kalman Filter Hedge Ratio Estimation
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust process noise <InlineMath math="Q" /> and measurement noise <InlineMath math="R" /> to
        see how the Kalman filter tracks a time-varying hedge ratio for TCS-Infosys.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Process Noise Q: {processNoise.toFixed(4)}</span>
          <input type="range" min="0.0001" max="0.01" step="0.0001" value={processNoise}
            onChange={e => setProcessNoise(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Measurement Noise R: {measurementNoise.toFixed(3)}</span>
          <input type="range" min="0.01" max="0.5" step="0.01" value={measurementNoise}
            onChange={e => setMeasurementNoise(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full max-w-2xl mx-auto block">
        <path d={obsPath} fill="none" stroke="#94a3b8" strokeWidth="1" opacity="0.5" />
        <path d={kalPath} fill="none" stroke="#6366f1" strokeWidth="2" />
        <line x1="0" y1={toY(trueHedgeRatio)} x2={chartW} y2={toY(trueHedgeRatio)}
          stroke="#22c55e" strokeWidth="1" strokeDasharray="4" />
      </svg>

      <div className="mt-3 flex justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1"><span className="inline-block w-4 h-0.5 bg-gray-400" /> Observed</span>
        <span className="flex items-center gap-1"><span className="inline-block w-4 h-0.5 bg-indigo-500" /> Kalman Estimate</span>
        <span className="flex items-center gap-1"><span className="inline-block w-4 h-0.5 bg-green-500" style={{ borderTop: '1px dashed' }} /> True Mean</span>
      </div>

      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        Kalman gain adapts: high <InlineMath math="Q/R" /> ratio = faster tracking but more noise;
        low ratio = smoother but slower adaptation.
      </p>
    </div>
  )
}

export default function KalmanFilters() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Kalman Filters for Dynamic Hedge Ratios
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        In pairs trading and stat arb, the hedge ratio between two stocks is not constant -- it
        evolves over time as fundamentals change. The Kalman filter provides an optimal framework
        for dynamically estimating this time-varying relationship, adapting faster than rolling OLS
        while being more principled than ad-hoc exponential smoothing.
      </p>

      <DefinitionBlock
        title="Kalman Filter"
        label="Definition 5.3"
        definition="The Kalman filter is a recursive Bayesian estimator that provides the optimal (minimum mean-squared error) estimate of a linear dynamical system's state from noisy observations. It consists of two steps: predict (propagate the state forward using the system model) and update (correct the prediction using the new observation)."
        notation={<>The state at time <InlineMath math="t" /> is <InlineMath math="\mathbf{x}_t" />, observed through <InlineMath math="\mathbf{z}_t = H\mathbf{x}_t + \mathbf{v}_t" /> where <InlineMath math="\mathbf{v}_t \sim \mathcal{N}(0, R)" />.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        State-Space Model for Hedge Ratios
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For a pairs trade between stock A (e.g., TCS) and stock B (e.g., Infosys), we model the
        hedge ratio <InlineMath math="\beta_t" /> as a random walk with drift:
      </p>

      <BlockMath math="\text{State equation: } \beta_t = \beta_{t-1} + w_t, \quad w_t \sim \mathcal{N}(0, Q)" />
      <BlockMath math="\text{Observation equation: } P_t^A = \alpha_t + \beta_t \cdot P_t^B + v_t, \quad v_t \sim \mathcal{N}(0, R)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The state vector is <InlineMath math="\mathbf{x}_t = [\alpha_t, \beta_t]^\top" /> containing
        both the intercept and hedge ratio. The observation matrix is <InlineMath math="H_t = [1, P_t^B]" />.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Kalman Filter Equations
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The full Kalman recursion consists of:
      </p>

      <BlockMath math="\text{Predict: } \hat{\mathbf{x}}_{t|t-1} = F \hat{\mathbf{x}}_{t-1|t-1}" />
      <BlockMath math="P_{t|t-1} = F P_{t-1|t-1} F^\top + Q" />

      <BlockMath math="\text{Innovation: } y_t = z_t - H_t \hat{\mathbf{x}}_{t|t-1}" />
      <BlockMath math="S_t = H_t P_{t|t-1} H_t^\top + R" />

      <BlockMath math="\text{Update: } K_t = P_{t|t-1} H_t^\top S_t^{-1}" />
      <BlockMath math="\hat{\mathbf{x}}_{t|t} = \hat{\mathbf{x}}_{t|t-1} + K_t y_t" />
      <BlockMath math="P_{t|t} = (I - K_t H_t) P_{t|t-1}" />

      <TheoremBlock
        title="Optimality of the Kalman Filter"
        label="Theorem 5.3"
        statement={<>For a linear Gaussian state-space model, the Kalman filter provides the minimum mean-squared error (MMSE) estimate of the state. That is, for any other estimator <InlineMath math="\tilde{\mathbf{x}}_t" /> based on observations <InlineMath math="z_1, \ldots, z_t" />, we have <InlineMath math="\mathbb{E}[\|\mathbf{x}_t - \hat{\mathbf{x}}_{t|t}\|^2] \leq \mathbb{E}[\|\mathbf{x}_t - \tilde{\mathbf{x}}_t\|^2]" />.</>}
        proof={<>The proof follows from the orthogonality principle in Hilbert space. The Kalman estimate is the conditional expectation <InlineMath math="\hat{\mathbf{x}}_{t|t} = \mathbb{E}[\mathbf{x}_t | z_1, \ldots, z_t]" />, which is the orthogonal projection of <InlineMath math="\mathbf{x}_t" /> onto the space of linear functions of observations. For Gaussian systems, the conditional expectation is linear, so the Kalman filter achieves the global MMSE optimum, not just the linear MMSE.</>}
      />

      <InteractiveKalmanFilter />

      <PythonCode
        title="kalman_hedge_ratio.py"
        runnable
        code={`import numpy as np

# Kalman filter for dynamic hedge ratio: TCS vs Infosys on NSE
np.random.seed(42)
n_days = 252

# Simulate cointegrated prices with time-varying hedge ratio
true_beta = np.zeros(n_days)
infosys_price = np.zeros(n_days)
tcs_price = np.zeros(n_days)

infosys_price[0] = 1500
tcs_price[0] = 3500

for t in range(1, n_days):
    # Hedge ratio drifts slowly (structural change)
    true_beta[t] = 0.42 + 0.08 * np.sin(2 * np.pi * t / 252)
    infosys_price[t] = infosys_price[t-1] + np.random.randn() * 20
    tcs_price[t] = 800 + true_beta[t] * infosys_price[t] + np.random.randn() * 30

# Kalman Filter Implementation
# State: [alpha, beta]
x = np.array([0.0, 0.5])  # Initial state estimate
P = np.eye(2) * 1.0        # Initial covariance
Q = np.eye(2) * 0.0001     # Process noise (how fast beta changes)
R = 30.0 ** 2              # Measurement noise variance
F = np.eye(2)              # State transition (random walk)

kalman_beta = np.zeros(n_days)
kalman_alpha = np.zeros(n_days)
spread = np.zeros(n_days)
kalman_gain_history = np.zeros(n_days)

for t in range(n_days):
    # Observation model: TCS = alpha + beta * Infosys + noise
    H = np.array([[1.0, infosys_price[t]]])
    z = tcs_price[t]

    # Predict
    x_pred = F @ x
    P_pred = F @ P @ F.T + Q

    # Innovation
    y = z - H @ x_pred
    S = H @ P_pred @ H.T + R

    # Kalman gain
    K = P_pred @ H.T / S
    kalman_gain_history[t] = K[1, 0]

    # Update
    x = x_pred + K.flatten() * y
    P = (np.eye(2) - K @ H) @ P_pred

    kalman_alpha[t] = x[0]
    kalman_beta[t] = x[1]
    spread[t] = tcs_price[t] - x[0] - x[1] * infosys_price[t]

# Compare with rolling OLS (60-day window)
from scipy import stats as sp_stats
ols_beta = np.full(n_days, np.nan)
for t in range(60, n_days):
    slope, intercept, _, _, _ = sp_stats.linregress(
        infosys_price[t-60:t], tcs_price[t-60:t])
    ols_beta[t] = slope

# Performance metrics
kalman_error = np.mean((kalman_beta[60:] - true_beta[60:])**2)
ols_error = np.nanmean((ols_beta[60:] - true_beta[60:])**2)

print("=== Kalman Filter vs Rolling OLS: TCS-Infosys Hedge Ratio ===")
print(f"{'Metric':<25} {'Kalman':<15} {'OLS (60d)':<15}")
print(f"{'MSE vs true beta':<25} {kalman_error:<15.6f} {ols_error:<15.6f}")
print(f"{'Final beta estimate':<25} {kalman_beta[-1]:<15.4f} {ols_beta[-1]:<15.4f}")
print(f"{'True beta (final)':<25} {true_beta[-1]:<15.4f}")
print(f"{'Improvement':<25} {(1-kalman_error/ols_error)*100:<15.1f}%")

# Spread statistics for trading
print(f"\\n=== Kalman Spread Statistics ===")
print(f"Spread mean:   {np.mean(spread):.2f} INR")
print(f"Spread std:    {np.std(spread):.2f} INR")
print(f"Max deviation: {np.max(np.abs(spread)):.2f} INR")

# Z-score signals
z_scores = (spread - np.mean(spread)) / np.std(spread)
n_entries = np.sum(np.abs(z_scores) > 2.0)
print(f"\\nEntry signals (|z| > 2): {n_entries}")
print(f"Avg Kalman gain (beta):  {np.mean(kalman_gain_history):.6f}")
print(f"\\nNSE Implementation Note:")
print(f"  TCS lot size: 175, Infosys lot size: 300")
print(f"  For beta={kalman_beta[-1]:.2f}, trade 1 TCS lot vs")
print(f"  {175 * kalman_beta[-1] * 3800 / (300 * 1500):.1f} Infosys lots")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Kalman Filter vs Rolling OLS
      </h3>
      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Feature</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Kalman Filter</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Rolling OLS</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Adaptation speed</td>
              <td className="px-5 py-2">Controlled by Q/R ratio</td>
              <td className="px-5 py-2">Fixed by window length</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Optimality</td>
              <td className="px-5 py-2">MMSE optimal for linear Gaussian</td>
              <td className="px-5 py-2">No optimality guarantee</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Confidence intervals</td>
              <td className="px-5 py-2">Natural from covariance P</td>
              <td className="px-5 py-2">Requires separate calculation</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Memory</td>
              <td className="px-5 py-2">O(1) per update</td>
              <td className="px-5 py-2">O(window) stored</td>
            </tr>
            <tr>
              <td className="px-5 py-2">Hyperparameters</td>
              <td className="px-5 py-2">Q, R matrices</td>
              <td className="px-5 py-2">Window length</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Tuning Q and R for Indian Markets
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The process noise <InlineMath math="Q" /> controls how fast the hedge ratio can change.
        For stable Indian blue-chip pairs (TCS-Infosys), set <InlineMath math="Q" /> small
        (around <InlineMath math="10^{-4}" />). For more volatile pairs or during regime changes
        (like RBI policy shifts affecting bank stock correlations), increase <InlineMath math="Q" />.
        The measurement noise <InlineMath math="R" /> can be estimated from the variance of the
        OLS residuals over a training period.
      </p>

      <BlockMath math="\text{Kalman gain: } K_t = \frac{P_{t|t-1}}{P_{t|t-1} + R}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        When <InlineMath math="K_t \to 1" />, the filter trusts new observations heavily (fast tracking).
        When <InlineMath math="K_t \to 0" />, it relies on its prior estimate (smoothing). The
        steady-state Kalman gain converges to <InlineMath math="K^* = \frac{-R + \sqrt{R^2 + 4QR}}{2}" />.
      </p>

      <ExampleBlock
        title="Kalman Update Step"
        difficulty="intermediate"
        problem={<>The current Kalman estimate of the TCS-Infosys hedge ratio is <InlineMath math="\hat{\beta}_{t-1} = 0.40" /> with uncertainty <InlineMath math="P_{t-1} = 0.01" />. Process noise <InlineMath math="Q = 0.001" />, measurement noise <InlineMath math="R = 0.05" />. A new observation suggests <InlineMath math="\beta_{obs} = 0.48" />. Compute the updated estimate.</>}
        solution={[
          {
            step: 'Predict step',
            formula: '\\hat{\\beta}_{t|t-1} = 0.40, \\quad P_{t|t-1} = 0.01 + 0.001 = 0.011',
            explanation: 'State propagates unchanged (random walk), uncertainty grows by Q.',
          },
          {
            step: 'Compute Kalman gain',
            formula: 'K_t = \\frac{P_{t|t-1}}{P_{t|t-1} + R} = \\frac{0.011}{0.011 + 0.05} = 0.180',
            explanation: 'The gain is moderate -- the filter will partially trust the new observation.',
          },
          {
            step: 'Update estimate',
            formula: '\\hat{\\beta}_{t|t} = 0.40 + 0.180 \\times (0.48 - 0.40) = 0.4144',
            explanation: 'The estimate moves toward the observation but not all the way, dampening noise.',
          },
          {
            step: 'Update uncertainty',
            formula: 'P_{t|t} = (1 - 0.180) \\times 0.011 = 0.00902',
            explanation: 'Uncertainty decreases after incorporating the observation.',
          },
        ]}
      />

      <NoteBlock title="Extended Kalman Filter for Non-Linear Models" type="historical">
        <p>
          When the relationship between stocks is non-linear (e.g., during market stress, the
          TCS-Infosys correlation may change non-linearly), the Extended Kalman Filter (EKF)
          or Unscented Kalman Filter (UKF) can be used. The EKF linearizes the state transition
          and observation equations using first-order Taylor expansions. For Indian markets,
          this is particularly useful when modeling cross-asset relationships that shift during
          events like RBI policy announcements, budget sessions, or election results.
        </p>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          The Kalman filter provides an optimal, recursive framework for estimating time-varying
          hedge ratios in pairs trading. Unlike rolling OLS, it adapts its tracking speed based
          on the signal-to-noise ratio and provides natural confidence intervals. For NSE pairs
          trading, properly tuned Kalman filters reduce tracking error by 30-50% compared to
          fixed-window methods, especially during periods of structural change like RBI rate
          cycles or sectoral rotation.
        </p>
      </NoteBlock>
    </div>
  )
}
