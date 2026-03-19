import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function GBMSimulator() {
  const [mu, setMu] = useState(0.12)
  const [sigma, setSigma] = useState(0.20)
  const [days, setDays] = useState(252)
  const [paths, setPaths] = useState(5)

  const dt = 1 / 252
  const simulatedPaths = []
  for (let p = 0; p < paths; p++) {
    const path = [100]
    for (let t = 1; t < days; t++) {
      const z = Array.from({ length: 1 }, () => {
        let u = 0, v = 0, s = 0
        do { u = Math.random() * 2 - 1; v = Math.random() * 2 - 1; s = u * u + v * v } while (s >= 1 || s === 0)
        return u * Math.sqrt(-2 * Math.log(s) / s)
      })[0]
      const prev = path[path.length - 1]
      const next = prev * Math.exp((mu - 0.5 * sigma * sigma) * dt + sigma * Math.sqrt(dt) * z)
      path.push(next)
    }
    simulatedPaths.push(path)
  }

  const colors = ['#6366f1', '#ec4899', '#22c55e', '#f97316', '#06b6d4']
  const maxVal = Math.max(...simulatedPaths.flat())
  const minVal = Math.min(...simulatedPaths.flat())
  const range = maxVal - minVal || 1

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Geometric Brownian Motion Simulator
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Simulate synthetic Nifty-like price paths with adjustable drift and volatility.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Drift <InlineMath math={`\\mu = ${mu.toFixed(2)}`} /></span>
          <input type="range" min="0" max="0.30" step="0.01" value={mu}
            onChange={e => setMu(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Volatility <InlineMath math={`\\sigma = ${sigma.toFixed(2)}`} /></span>
          <input type="range" min="0.05" max="0.50" step="0.01" value={sigma}
            onChange={e => setSigma(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Days: {days}</span>
          <input type="range" min="63" max="504" step="1" value={days}
            onChange={e => setDays(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Paths: {paths}</span>
          <input type="range" min="1" max="10" step="1" value={paths}
            onChange={e => setPaths(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 600 250" className="w-full rounded-lg bg-gray-50 dark:bg-gray-800/50">
        {simulatedPaths.map((path, pi) => (
          <polyline
            key={pi}
            fill="none"
            stroke={colors[pi % colors.length]}
            strokeWidth="1.5"
            opacity="0.7"
            points={path.map((v, i) => `${(i / (days - 1)) * 580 + 10},${240 - ((v - minVal) / range) * 220}`).join(' ')}
          />
        ))}
        <text x="300" y="248" textAnchor="middle" className="text-[10px]" fill="#9ca3af">Trading Days</text>
      </svg>
    </div>
  )
}

export default function SyntheticData() {
  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
        Synthetic Market Data Generation
      </h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Generating realistic synthetic financial data is critical for stress testing strategies,
        augmenting limited historical data, and validating backtesting frameworks. For Indian
        markets (NSE/BSE), synthetic data must capture key stylized facts: volatility clustering,
        fat tails, mean reversion of volatility, and realistic microstructure.
      </p>

      <DefinitionBlock
        title="Stylized Facts of Financial Returns"
        definition="Financial returns exhibit: (1) fat tails (excess kurtosis), (2) volatility clustering (GARCH effects), (3) leverage effects (negative correlation between returns and volatility), (4) autocorrelation in absolute returns, and (5) approximate uncorrelation in raw returns."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8">
        Geometric Brownian Motion
      </h3>

      <p className="text-gray-700 dark:text-gray-300">
        The simplest model for synthetic price paths is Geometric Brownian Motion (GBM),
        where prices follow a log-normal process:
      </p>

      <BlockMath math="dS_t = \mu S_t \, dt + \sigma S_t \, dW_t" />

      <p className="text-gray-700 dark:text-gray-300">
        The discrete-time solution for simulation is:
      </p>

      <BlockMath math="S_{t+\Delta t} = S_t \exp\left[\left(\mu - \frac{\sigma^2}{2}\right)\Delta t + \sigma \sqrt{\Delta t} \, Z\right]" />

      <p className="text-gray-700 dark:text-gray-300">
        where <InlineMath math="Z \sim \mathcal{N}(0,1)" />. While GBM captures the basic
        drift and diffusion, it fails to reproduce fat tails and volatility clustering observed
        in Nifty 50 returns.
      </p>

      <GBMSimulator />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8">
        GARCH-Based Simulation
      </h3>

      <p className="text-gray-700 dark:text-gray-300">
        To capture volatility clustering, we use GARCH(1,1) for the conditional variance:
      </p>

      <BlockMath math="\sigma_t^2 = \omega + \alpha \epsilon_{t-1}^2 + \beta \sigma_{t-1}^2" />

      <TheoremBlock
        title="GARCH Stationarity Condition"
        statement="The GARCH(1,1) process is covariance stationary if and only if $\alpha + \beta < 1$. The unconditional variance is $\bar{\sigma}^2 = \frac{\omega}{1 - \alpha - \beta}$."
      />

      <PythonCode
        title="Synthetic Nifty Data with GARCH"
        code={`import numpy as np
import pandas as pd
from arch import arch_model

def generate_garch_paths(n_paths=100, n_days=252, mu=0.12/252,
                          omega=1e-6, alpha=0.08, beta=0.90,
                          S0=22000):
    """Generate synthetic Nifty-like paths with GARCH(1,1) volatility."""
    dt = 1.0
    paths = np.zeros((n_days, n_paths))
    paths[0] = S0

    # Unconditional variance
    sigma2_uncond = omega / (1 - alpha - beta)
    sigma2 = np.full(n_paths, sigma2_uncond)

    for t in range(1, n_days):
        z = np.random.standard_normal(n_paths)
        epsilon = np.sqrt(sigma2) * z
        returns = mu + epsilon

        # Update conditional variance
        sigma2 = omega + alpha * epsilon**2 + beta * sigma2

        paths[t] = paths[t-1] * np.exp(returns)

    return paths

# Generate 1000 synthetic Nifty paths
synthetic_paths = generate_garch_paths(n_paths=1000, n_days=504)

# Compute statistics
final_prices = synthetic_paths[-1]
returns = np.diff(np.log(synthetic_paths), axis=0)
print(f"Mean annual return: {returns.mean() * 252:.2%}")
print(f"Annual volatility: {returns.std() * np.sqrt(252):.2%}")
print(f"Kurtosis: {pd.Series(returns.flatten()).kurtosis():.2f}")
print(f"Median final price: {np.median(final_prices):,.0f}")
print(f"5th percentile: {np.percentile(final_prices, 5):,.0f}")
print(f"95th percentile: {np.percentile(final_prices, 95):,.0f}")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8">
        Correlated Multi-Asset Simulation
      </h3>

      <p className="text-gray-700 dark:text-gray-300">
        For portfolio backtesting, we need correlated paths across multiple NSE stocks.
        Using the Cholesky decomposition of the correlation matrix:
      </p>

      <BlockMath math="\mathbf{Z}_{corr} = L \cdot \mathbf{Z}_{indep}" />

      <p className="text-gray-700 dark:text-gray-300">
        where <InlineMath math="L" /> is the lower triangular Cholesky factor of the
        correlation matrix <InlineMath math="\Sigma = LL^T" />.
      </p>

      <PythonCode
        title="Correlated Multi-Stock Simulation"
        code={`import numpy as np

# Historical correlation matrix for Nifty stocks
# TCS, Reliance, HDFC Bank, Infosys, ITC
corr_matrix = np.array([
    [1.00, 0.45, 0.38, 0.72, 0.25],
    [0.45, 1.00, 0.52, 0.40, 0.35],
    [0.38, 0.52, 1.00, 0.33, 0.30],
    [0.72, 0.40, 0.33, 1.00, 0.22],
    [0.25, 0.35, 0.30, 0.22, 1.00],
])

mus = np.array([0.15, 0.18, 0.14, 0.16, 0.10]) / 252
sigmas = np.array([0.22, 0.28, 0.24, 0.23, 0.20]) / np.sqrt(252)
S0 = np.array([3800, 2900, 1650, 1850, 440])

# Cholesky decomposition
L = np.linalg.cholesky(corr_matrix)

n_days, n_paths = 252, 500
prices = np.zeros((n_days, 5, n_paths))
prices[0] = S0[:, None]

for t in range(1, n_days):
    Z = np.random.standard_normal((5, n_paths))
    Z_corr = L @ Z
    returns = mus[:, None] + sigmas[:, None] * Z_corr
    prices[t] = prices[t-1] * np.exp(returns)

stocks = ['TCS', 'Reliance', 'HDFC Bank', 'Infosys', 'ITC']
for i, name in enumerate(stocks):
    median_final = np.median(prices[-1, i])
    print(f"{name}: Start={S0[i]:.0f}, Median Final={median_final:.0f}")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8">
        Regime-Switching Models
      </h3>

      <p className="text-gray-700 dark:text-gray-300">
        Indian markets exhibit distinct regimes — bull markets with low volatility,
        bear markets with high volatility (like the 2008 GFC or 2020 COVID crash).
        A Markov regime-switching model captures this:
      </p>

      <BlockMath math="r_t | S_t = k \sim \mathcal{N}(\mu_k, \sigma_k^2)" />

      <p className="text-gray-700 dark:text-gray-300">
        where <InlineMath math="S_t \in \{1, 2\}" /> follows a Markov chain with
        transition matrix:
      </p>

      <BlockMath math="P = \begin{pmatrix} p_{11} & 1-p_{11} \\ 1-p_{22} & p_{22} \end{pmatrix}" />

      <ExampleBlock
        title="Two-Regime Nifty Model"
        problem="Calibrate a 2-regime model where Regime 1 (bull) has mu=15%, sigma=14% and Regime 2 (bear) has mu=-10%, sigma=32%."
        solution={[
          { step: 'Regime 1 (Bull)', formula: '\\mu_1 = 0.15/252,\; \\sigma_1 = 0.14/\\sqrt{252}', explanation: 'Low-volatility trending regime' },
          { step: 'Regime 2 (Bear)', formula: '\\mu_2 = -0.10/252,\; \\sigma_2 = 0.32/\\sqrt{252}', explanation: 'High-volatility crash regime' },
          { step: 'Transition', formula: 'p_{11} = 0.98,\; p_{22} = 0.95', explanation: 'Bull persists longer; bear shorter but intense' },
        ]}
      />

      <PythonCode
        title="Regime-Switching Synthetic Data"
        code={`import numpy as np

def generate_regime_switching(n_days=504, S0=22000):
    """Generate Nifty path with regime switching."""
    # Regime parameters
    mu = [0.15/252, -0.10/252]    # Bull, Bear
    sigma = [0.14/np.sqrt(252), 0.32/np.sqrt(252)]
    P = [[0.98, 0.02], [0.05, 0.95]]  # Transition matrix

    prices = [S0]
    regimes = [0]  # Start in bull

    for t in range(1, n_days):
        # Transition
        current = regimes[-1]
        if np.random.random() > P[current][current]:
            current = 1 - current
        regimes.append(current)

        # Generate return
        r = mu[current] + sigma[current] * np.random.randn()
        prices.append(prices[-1] * np.exp(r))

    return np.array(prices), np.array(regimes)

prices, regimes = generate_regime_switching()
bull_pct = (regimes == 0).mean()
print(f"Bull regime: {bull_pct:.1%}, Bear regime: {1-bull_pct:.1%}")
print(f"Final price: {prices[-1]:,.0f}")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8">
        Validating Synthetic Data Quality
      </h3>

      <NoteBlock type="warning" title="Validation Checklist">
        <ul className="list-disc pl-4 space-y-1 text-sm">
          <li>Compare return distribution moments (mean, variance, skewness, kurtosis)</li>
          <li>Check autocorrelation structure of returns and absolute returns</li>
          <li>Verify volatility clustering via ARCH-LM test</li>
          <li>Validate cross-asset correlations match historical NSE data</li>
          <li>Test strategy performance on synthetic vs historical — should be similar</li>
        </ul>
      </NoteBlock>

      <NoteBlock type="tip" title="India-Specific Considerations">
        <p className="text-sm">
          When generating synthetic NSE data, account for: T+1 settlement cycles,
          circuit breaker limits (5%, 10%, 20%), trading hours (9:15-15:30 IST),
          derivative expiry effects (last Thursday), and budget/RBI policy event
          volatility spikes. The GARCH parameters should be calibrated to actual
          Nifty 50 or Bank Nifty historical data for realism.
        </p>
      </NoteBlock>
    </div>
  )
}
