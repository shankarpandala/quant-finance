import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveEquilibriumReturns() {
  const [riskAversion, setRiskAversion] = useState(2.5)
  const [rfRate, setRfRate] = useState(6.5)

  const stocks = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ITC']
  const mcapWeights = [0.25, 0.20, 0.18, 0.15, 0.10]
  const remaining = 1 - mcapWeights.reduce((a, b) => a + b, 0)
  const vols = [0.28, 0.22, 0.20, 0.24, 0.18]

  const impliedReturns = mcapWeights.map((w, i) =>
    rfRate / 100 + riskAversion * w * vols[i] * vols[i]
  )

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Implied Equilibrium Returns
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust risk aversion and risk-free rate to see implied returns for top Nifty 50 constituents.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Risk Aversion <InlineMath math="\delta" />: {riskAversion.toFixed(1)}</span>
          <input type="range" min="0.5" max="6" step="0.1" value={riskAversion}
            onChange={e => setRiskAversion(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Risk-Free Rate: {rfRate.toFixed(1)}% (G-Sec)</span>
          <input type="range" min="4" max="9" step="0.1" value={rfRate}
            onChange={e => setRfRate(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="mx-auto text-xs border-collapse">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-600">
              <th className="px-3 py-1 text-left text-gray-600 dark:text-gray-400">Stock</th>
              <th className="px-3 py-1 text-right text-gray-600 dark:text-gray-400">Mcap Wt</th>
              <th className="px-3 py-1 text-right text-gray-600 dark:text-gray-400">Vol</th>
              <th className="px-3 py-1 text-right text-gray-600 dark:text-gray-400">Implied Return</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            {stocks.map((s, i) => (
              <tr key={i} className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-3 py-1 font-mono">{s}</td>
                <td className="px-3 py-1 text-right">{(mcapWeights[i] * 100).toFixed(1)}%</td>
                <td className="px-3 py-1 text-right">{(vols[i] * 100).toFixed(0)}%</td>
                <td className="px-3 py-1 text-right font-semibold text-indigo-600">
                  {(impliedReturns[i] * 100).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function EquilibriumReturns() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Market-Implied Equilibrium Returns
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The Black-Litterman model (1992) begins with a powerful observation: if the market portfolio
        is the equilibrium outcome of all investors optimizing, then we can reverse-engineer the
        expected returns implied by market capitalization weights. These &ldquo;implied&rdquo; returns
        serve as a neutral starting point, far more stable than historical sample means. For Indian
        markets, we extract implied returns from Nifty 50 market-cap weights.
      </p>

      <DefinitionBlock
        title="Market-Implied Equilibrium Returns"
        label="Definition 9.9"
        definition="The equilibrium expected return vector Π is the set of returns that, when plugged into a mean-variance optimizer, would produce the market-capitalization-weighted portfolio as the optimal solution. Formally: Π = δΣw_mkt, where δ is the risk aversion coefficient, Σ is the covariance matrix, and w_mkt is the market-cap weight vector."
        notation="Π = equilibrium returns, δ = risk aversion, w_mkt = market-cap weights"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Reverse Optimization
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The key insight is that in CAPM equilibrium, the market portfolio is mean-variance
        efficient. The first-order conditions of the Markowitz problem yield:
      </p>

      <BlockMath math="\boldsymbol{\Pi} = \delta \Sigma \mathbf{w}_{\text{mkt}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where the risk aversion parameter <InlineMath math="\delta" /> is calibrated from the
        market&rsquo;s expected excess return and variance:
      </p>

      <BlockMath math="\delta = \frac{E[R_m] - r_f}{\sigma_m^2}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For the Indian market, using the Nifty 50 with expected excess return of ~6% and
        volatility of ~18%:
      </p>

      <BlockMath math="\delta = \frac{0.06}{0.18^2} = \frac{0.06}{0.0324} \approx 1.85" />

      <TheoremBlock
        title="Equilibrium Returns and CAPM"
        label="Theorem 9.7"
        statement="The implied equilibrium returns Π are proportional to each asset's beta with respect to the market portfolio: Πᵢ = δ · βᵢ · σ²_m = δ · Cov(Rᵢ, R_m), where βᵢ = Cov(Rᵢ, R_m)/σ²_m. This is precisely the CAPM expected return."
        proof="By definition, Π = δΣw_mkt. The i-th element is Πᵢ = δ Σᵢ w_mkt = δ · Cov(Rᵢ, R_m) since Cov(Rᵢ, R_m) = Σᵢ w_mkt (the i-th row of the covariance matrix times the market weights). Dividing by σ²_m = w_mkt'Σw_mkt gives the CAPM beta relation."
      />

      <InteractiveEquilibriumReturns />

      <PythonCode
        title="implied_returns_nifty50.py"
        runnable
        code={`import numpy as np

# Top 15 Nifty 50 constituents by market cap (approximate weights)
tickers = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK',
           'HINDUNILVR', 'ITC', 'SBIN', 'BHARTIARTL', 'LT',
           'AXISBANK', 'KOTAKBANK', 'BAJFINANCE', 'WIPRO', 'MARUTI']

# Market-cap weights (approximate, sum < 1 for top 15)
w_mkt = np.array([0.112, 0.088, 0.072, 0.060, 0.055,
                   0.048, 0.045, 0.038, 0.035, 0.032,
                   0.028, 0.026, 0.024, 0.018, 0.016])
w_mkt = w_mkt / w_mkt.sum()  # Normalize to sum to 1

# Annualized volatilities (approximate)
vols = np.array([0.28, 0.22, 0.22, 0.24, 0.24,
                 0.18, 0.20, 0.30, 0.26, 0.28,
                 0.28, 0.24, 0.35, 0.24, 0.26])

# Correlation matrix (stylized for Nifty 50)
n = len(tickers)
np.random.seed(42)
corr = np.eye(n) * 0.4 + 0.6 * np.ones((n, n)) * 0.3
np.fill_diagonal(corr, 1.0)
# Sector correlations
for i, j in [(0,9), (1,3), (1,13), (3,13), (2,4), (2,10), (2,11), (4,10), (4,11), (10,11)]:
    corr[i,j] = corr[j,i] = 0.7
for i, j in [(5,6),]:
    corr[i,j] = corr[j,i] = 0.5

Sigma = np.outer(vols, vols) * corr

# Calibrate risk aversion from market
# Nifty 50 expected excess return ~6%, vol ~18%
market_excess_return = 0.06
market_vol = np.sqrt(w_mkt @ Sigma @ w_mkt)
delta = market_excess_return / market_vol**2

# Implied equilibrium returns
Pi = delta * Sigma @ w_mkt
rf = 0.065  # 10Y G-Sec yield

print("=== Market-Implied Equilibrium Returns (Nifty 50) ===")
print(f"Risk aversion (delta): {delta:.4f}")
print(f"Market volatility: {market_vol:.4f} ({market_vol:.2%})")
print(f"Risk-free rate: {rf:.1%} (10Y G-Sec)")
print(f"\\n{'Ticker':<12} {'Mcap Wt':>8} {'Vol':>8} {'Implied mu':>10} {'Total':>10}")
print("-" * 55)
for t, w, v, pi in zip(tickers, w_mkt, vols, Pi):
    print(f"{t:<12} {w:>8.4f} {v:>8.2%} {pi:>10.4f} {rf+pi:>10.2%}")

# Verify: optimizing with Pi should recover w_mkt
Sigma_inv = np.linalg.inv(Sigma)
w_check = Sigma_inv @ Pi / (np.ones(n) @ Sigma_inv @ Pi)
print(f"\\nVerification (max weight deviation): {np.max(np.abs(w_check - w_mkt)):.6f}")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Why Implied Returns Are Superior to Historical Means
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Implied returns offer several advantages over historical sample means for Indian portfolios:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Property</th>
              <th className="px-4 py-2 text-center text-gray-600 dark:text-gray-400">Historical Means</th>
              <th className="px-4 py-2 text-center text-gray-600 dark:text-gray-400">Implied Returns</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Stability</td>
              <td className="px-4 py-2 text-center">Volatile (SE ~ 1%/yr)</td>
              <td className="px-4 py-2 text-center">Stable (market-cap anchored)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Economic meaning</td>
              <td className="px-4 py-2 text-center">Backward-looking</td>
              <td className="px-4 py-2 text-center">Forward-looking equilibrium</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Regime sensitivity</td>
              <td className="px-4 py-2 text-center">Contaminated by past regimes</td>
              <td className="px-4 py-2 text-center">Reflects current market view</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Portfolio optimality</td>
              <td className="px-4 py-2 text-center">Produces extreme weights</td>
              <td className="px-4 py-2 text-center">Produces market portfolio</td>
            </tr>
          </tbody>
        </table>
      </div>

      <ExampleBlock
        title="Computing Implied Return for Reliance Industries"
        difficulty="intermediate"
        problem="Reliance has a Nifty 50 weight of 11.2%, volatility of 28%, and correlation with the market of 0.85. The market volatility is 18%. Compute the implied excess return with $\\delta = 1.85$."
        solution={[
          {
            step: 'Compute beta',
            formula: '\\beta_{\\text{REL}} = \\frac{\\rho \\cdot \\sigma_{\\text{REL}}}{\\sigma_m} = \\frac{0.85 \\times 0.28}{0.18} = 1.322',
          },
          {
            step: 'Compute implied excess return (CAPM)',
            formula: '\\Pi_{\\text{REL}} = \\delta \\cdot \\beta_{\\text{REL}} \\cdot \\sigma_m^2 = 1.85 \\times 1.322 \\times 0.0324 = 0.0793',
            explanation: 'The implied excess return is 7.93%, giving a total implied return of 7.93% + 6.5% = 14.43%.',
          },
          {
            step: 'Interpret',
            formula: 'E[R_{\\text{REL}}] = r_f + \\Pi_{\\text{REL}} = 6.5\\% + 7.93\\% = 14.43\\%',
            explanation: 'This is the return the market "believes" Reliance will earn, consistent with its weight in the Nifty 50.',
          },
        ]}
      />

      <NoteBlock title="Data Sources for Indian Markets" type="tip">
        <ul className="space-y-1 list-disc list-inside">
          <li><strong>Market-cap weights:</strong> NSE publishes Nifty 50 constituent weights monthly</li>
          <li><strong>Risk-free rate:</strong> RBI publishes G-Sec yields (use 10Y benchmark)</li>
          <li><strong>Covariance matrix:</strong> Compute from NSE daily adjusted close prices</li>
          <li><strong>Risk aversion:</strong> Calibrate from Nifty 50 excess return / variance</li>
          <li>The Nifty 50 free-float market-cap methodology aligns perfectly with BL assumptions</li>
        </ul>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Market-implied equilibrium returns are the foundation of the Black-Litterman model.
          By reverse-engineering returns from Nifty 50 market-cap weights, we obtain a stable,
          economically meaningful starting point. In the next section, we learn how to blend
          investor views with these equilibrium returns to produce tilted portfolios.
        </p>
      </NoteBlock>
    </div>
  )
}
