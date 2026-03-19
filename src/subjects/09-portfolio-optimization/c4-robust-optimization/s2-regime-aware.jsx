import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveRegimeDetection() {
  const [volThreshold, setVolThreshold] = useState(25)
  const [currentVol, setCurrentVol] = useState(18)
  const [dccAlpha, setDccAlpha] = useState(0.05)
  const [dccBeta, setDccBeta] = useState(0.90)

  const regime = currentVol > volThreshold ? 'Crisis' : 'Normal'
  const persistence = dccAlpha + dccBeta
  const halfLife = Math.log(0.5) / Math.log(dccBeta)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Regime Detection and DCC Parameters
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust volatility threshold and DCC-GARCH parameters for Indian market regime detection.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Vol Threshold: {volThreshold}%</span>
          <input type="range" min="15" max="40" step="1" value={volThreshold}
            onChange={e => setVolThreshold(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Current Nifty Vol: {currentVol}%</span>
          <input type="range" min="8" max="50" step="1" value={currentVol}
            onChange={e => setCurrentVol(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>DCC <InlineMath math="\alpha" />: {dccAlpha.toFixed(2)}</span>
          <input type="range" min="0.01" max="0.15" step="0.01" value={dccAlpha}
            onChange={e => setDccAlpha(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>DCC <InlineMath math="\beta" />: {dccBeta.toFixed(2)}</span>
          <input type="range" min="0.70" max="0.98" step="0.01" value={dccBeta}
            onChange={e => setDccBeta(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center text-xs">
        <div className={`rounded-lg p-3 ${regime === 'Crisis' ? 'bg-red-50 dark:bg-red-900/30' : 'bg-green-50 dark:bg-green-900/30'}`}>
          <div className="text-gray-500">Regime</div>
          <div className={`text-lg font-bold ${regime === 'Crisis' ? 'text-red-600' : 'text-green-600'}`}>{regime}</div>
        </div>
        <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30">
          <div className="text-gray-500">DCC Persistence</div>
          <div className="text-lg font-bold text-indigo-600">{persistence.toFixed(3)}</div>
          <div className="text-[10px]">{persistence > 0.99 ? 'Non-stationary!' : 'Stationary'}</div>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30">
          <div className="text-gray-500">Half-Life (days)</div>
          <div className="text-lg font-bold text-amber-600">{halfLife.toFixed(1)}</div>
        </div>
      </div>
    </div>
  )
}

export default function RegimeAware() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Regime-Conditioned Optimization and DCC-GARCH
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Indian financial markets exhibit distinct regimes: calm bull markets with low volatility,
        turbulent periods with spiking correlations, and transitional phases. Regime-conditioned
        portfolio optimization adapts the covariance matrix and expected returns to the current
        market state, using Hidden Markov Models (HMMs) for regime detection and DCC-GARCH for
        dynamic correlation estimation.
      </p>

      <DefinitionBlock
        title="DCC-GARCH Model"
        label="Definition 9.13"
        definition="The Dynamic Conditional Correlation (DCC) model of Engle (2002) models time-varying correlations. Each asset's variance follows a univariate GARCH(1,1): σ²ᵢ,ₜ = ωᵢ + αᵢε²ᵢ,ₜ₋₁ + βᵢσ²ᵢ,ₜ₋₁. The conditional correlation matrix evolves as: Qₜ = (1-a-b)Q̄ + a·zₜ₋₁z'ₜ₋₁ + b·Qₜ₋₁, where zₜ are standardized residuals and Q̄ is the unconditional correlation."
        notation="Qₜ = quasi-correlation matrix, Rₜ = diag(Qₜ)⁻¹/² Qₜ diag(Qₜ)⁻¹/²"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The DCC-GARCH Framework
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The full time-varying covariance matrix is:
      </p>

      <BlockMath math="\Sigma_t = D_t R_t D_t" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="D_t = \text{diag}(\sigma_{1,t}, \ldots, \sigma_{n,t})" /> contains
        the GARCH volatilities and <InlineMath math="R_t" /> is the DCC correlation matrix:
      </p>

      <BlockMath math="Q_t = (1 - a - b)\bar{Q} + a \mathbf{z}_{t-1}\mathbf{z}_{t-1}^\top + b Q_{t-1}" />
      <BlockMath math="R_t = \text{diag}(Q_t)^{-1/2} \, Q_t \, \text{diag}(Q_t)^{-1/2}" />

      <InteractiveRegimeDetection />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Hidden Markov Model for Regime Detection
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        An HMM with <InlineMath math="K" /> states models the Indian market as switching between
        regimes. Each regime has its own return distribution:
      </p>

      <BlockMath math="r_t | S_t = k \sim \mathcal{N}(\mu_k, \Sigma_k)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The transition probability matrix <InlineMath math="A" /> governs regime switching:
      </p>

      <BlockMath math="A_{ij} = P(S_t = j \mid S_{t-1} = i)" />

      <PythonCode
        title="dcc_garch_nifty.py"
        runnable
        code={`import numpy as np

np.random.seed(42)

# Simulate DCC-GARCH for Nifty 50 and Bank Nifty
T = 500  # Trading days
n = 2    # Assets

# GARCH(1,1) parameters
omega = np.array([0.00001, 0.000015])
alpha = np.array([0.08, 0.10])
beta = np.array([0.88, 0.85])

# DCC parameters
a_dcc = 0.05
b_dcc = 0.92
Q_bar = np.array([[1.0, 0.82], [0.82, 1.0]])  # Unconditional correlation

# Simulate
sigma2 = np.zeros((T, n))
sigma2[0] = [0.0003, 0.0004]  # Initial variance

Q = np.zeros((T, n, n))
R = np.zeros((T, n, n))
Q[0] = Q_bar.copy()
R[0] = Q_bar.copy()

returns = np.zeros((T, n))

for t in range(1, T):
    # GARCH volatilities
    for i in range(n):
        sigma2[t, i] = omega[i] + alpha[i] * returns[t-1, i]**2 + beta[i] * sigma2[t-1, i]

    D = np.diag(np.sqrt(sigma2[t]))

    # Standardized residuals
    if t > 1:
        z = returns[t-1] / np.sqrt(sigma2[t-1])
        Q[t] = (1 - a_dcc - b_dcc) * Q_bar + a_dcc * np.outer(z, z) + b_dcc * Q[t-1]
    else:
        Q[t] = Q_bar

    # Normalize to correlation
    Q_diag_inv = np.diag(1.0 / np.sqrt(np.diag(Q[t])))
    R[t] = Q_diag_inv @ Q[t] @ Q_diag_inv

    # Full covariance
    Sigma_t = D @ R[t] @ D

    # Generate returns
    returns[t] = np.random.multivariate_normal([0.0004, 0.0005], Sigma_t)

# Annualize
ann_vols = np.sqrt(sigma2 * 252)
ann_corrs = np.array([R[t, 0, 1] for t in range(T)])

# Print summary statistics
print("=== DCC-GARCH Results (Nifty 50 & Bank Nifty) ===")
print(f"\\nNifty 50 Volatility (annualized):")
print(f"  Mean: {np.mean(ann_vols[:, 0]):.2%}")
print(f"  Min:  {np.min(ann_vols[:, 0]):.2%}")
print(f"  Max:  {np.max(ann_vols[:, 0]):.2%}")
print(f"\\nBank Nifty Volatility (annualized):")
print(f"  Mean: {np.mean(ann_vols[:, 1]):.2%}")
print(f"  Min:  {np.min(ann_vols[:, 1]):.2%}")
print(f"  Max:  {np.max(ann_vols[:, 1]):.2%}")
print(f"\\nDynamic Correlation (Nifty-BankNifty):")
print(f"  Mean: {np.mean(ann_corrs):.4f}")
print(f"  Min:  {np.min(ann_corrs):.4f}")
print(f"  Max:  {np.max(ann_corrs):.4f}")
print(f"  Last: {ann_corrs[-1]:.4f}")
print(f"\\nDCC persistence (a+b): {a_dcc + b_dcc:.4f}")`}
      />

      <PythonCode
        title="hmm_regime_nifty.py"
        runnable
        code={`import numpy as np

np.random.seed(42)

# Simulate 2-regime HMM for Nifty 50
T = 1000

# Regime parameters (annualized, then daily)
mu_regimes = np.array([0.15, -0.10]) / 252  # Bull, Bear
sigma_regimes = np.array([0.15, 0.35]) / np.sqrt(252)

# Transition matrix
A = np.array([
    [0.98, 0.02],  # Bull -> Bull, Bull -> Bear
    [0.05, 0.95],  # Bear -> Bull, Bear -> Bear
])

# Simulate regimes
states = np.zeros(T, dtype=int)
states[0] = 0  # Start in bull
for t in range(1, T):
    states[t] = np.random.choice(2, p=A[states[t-1]])

# Simulate returns
returns = np.array([
    np.random.normal(mu_regimes[s], sigma_regimes[s])
    for s in states
])

# Simple regime detection: rolling volatility threshold
window = 63  # Quarterly
rolling_vol = np.array([
    np.std(returns[max(0, t-window):t]) * np.sqrt(252)
    for t in range(1, T+1)
])

# Detect regimes
vol_threshold = 0.25
detected_regime = (rolling_vol > vol_threshold).astype(int)
accuracy = np.mean(detected_regime[window:] == states[window:])

# Regime-conditioned portfolio
# In normal regime: 70% equity, 30% bonds
# In crisis regime: 30% equity, 70% bonds
equity_weight = np.where(detected_regime == 0, 0.70, 0.30)

print("=== HMM Regime Analysis for Nifty 50 ===")
print(f"Total days: {T}")
print(f"Bull regime days: {np.sum(states == 0)} ({np.mean(states == 0):.1%})")
print(f"Bear regime days: {np.sum(states == 1)} ({np.mean(states == 1):.1%})")
print(f"\\nDetection accuracy: {accuracy:.2%}")
print(f"\\nRegime statistics:")
for k, name in enumerate(['Bull', 'Bear']):
    mask = states == k
    r = returns[mask]
    print(f"  {name}: mean={np.mean(r)*252:.2%}, vol={np.std(r)*np.sqrt(252):.2%}, "
          f"n={np.sum(mask)}")
print(f"\\nRegime-conditioned equity allocation:")
print(f"  Average: {np.mean(equity_weight):.2%}")
print(f"  Current: {equity_weight[-1]:.2%}")`}
      />

      <TheoremBlock
        title="Expected Duration of Market Regimes"
        label="Theorem 9.11"
        statement="In a K-state Hidden Markov Model, the expected duration of regime k is 1/(1 - Aₖₖ), where Aₖₖ is the self-transition probability. For Indian markets, typical bull regime duration is ~50 trading days (1/0.02) and bear regime duration is ~20 trading days (1/0.05)."
        proof="The duration in state k is geometrically distributed with parameter (1-Aₖₖ). The expected value of a geometric random variable with success probability p is 1/p."
      />

      <ExampleBlock
        title="Regime-Conditioned Allocation during COVID Crash"
        difficulty="intermediate"
        problem="During March 2020, India VIX spiked to 84 (from typical 12-15), Nifty 50 fell 38% in 25 days. An HMM with $A_{22}=0.95$ (bear persistence) detected the crisis regime on day 5. How should the portfolio adjust?"
        solution={[
          {
            step: 'Detect crisis regime',
            formula: '\\text{VIX} = 84 \\gg \\text{threshold} = 25 \\Rightarrow \\text{Crisis regime}',
            explanation: 'Rolling volatility or VIX exceeds the threshold, triggering regime switch.',
          },
          {
            step: 'Switch to crisis covariance matrix',
            formula: '\\Sigma_{\\text{crisis}} \\approx 3\\times \\Sigma_{\\text{normal}}',
            explanation: 'Use the crisis-regime covariance matrix which has ~3x higher variances and elevated correlations.',
          },
          {
            step: 'Reoptimize portfolio',
            formula: 'w_{\\text{equity}} \\downarrow, \\quad w_{\\text{G-Sec}} \\uparrow, \\quad w_{\\text{Gold}} \\uparrow',
            explanation: 'The regime-conditioned optimizer reduces equity from ~60% to ~25%, increases G-Sec to ~50% and Gold to ~25%.',
          },
        ]}
      />

      <NoteBlock title="Indian Market Regime Indicators" type="tip">
        <ul className="space-y-1 list-disc list-inside">
          <li><strong>India VIX:</strong> Published by NSE, spikes above 25 signal crisis regime</li>
          <li><strong>FII outflows:</strong> NSDL publishes daily FII/FPI data; sustained outflows signal risk</li>
          <li><strong>INR/USD:</strong> Rapid depreciation (&gt;2% monthly) correlates with equity drawdowns</li>
          <li><strong>Credit spreads:</strong> 10Y AAA-G-Sec spread widening signals stress</li>
          <li><strong>RBI actions:</strong> Emergency rate changes or liquidity measures signal regime shift</li>
        </ul>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Regime-conditioned optimization uses DCC-GARCH for dynamic correlations and HMMs for
          regime detection. This allows portfolios to adapt to the current market state,
          reducing equity exposure during crises and increasing it during calm periods. For Indian
          markets, monitoring India VIX, FII flows, and RBI policy provides effective real-time
          regime signals.
        </p>
      </NoteBlock>
    </div>
  )
}
