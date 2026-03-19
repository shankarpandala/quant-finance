import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveRiskContribution() {
  const [w1, setW1] = useState(0.40)
  const [w2, setW2] = useState(0.35)

  const w3 = Math.max(0, 1 - w1 - w2)
  const weights = [w1, w2, w3]
  const vols = [0.22, 0.18, 0.12]
  const corrs = [[1, 0.6, 0.3], [0.6, 1, 0.2], [0.3, 0.2, 1]]
  const labels = ['Nifty 50', 'Govt Bonds', 'Gold']

  const cov = vols.map((vi, i) => vols.map((vj, j) => vi * vj * corrs[i][j]))
  const portVar = weights.reduce((s, wi, i) =>
    s + weights.reduce((s2, wj, j) => s2 + wi * wj * cov[i][j], 0), 0)
  const portVol = Math.sqrt(portVar)

  const mrc = weights.map((_, i) =>
    weights.reduce((s, wj, j) => s + wj * cov[i][j], 0) / portVol
  )
  const rc = weights.map((wi, i) => wi * mrc[i])
  const rcPct = rc.map(r => (r / portVol) * 100)

  const maxBarH = 180
  const barW = 60

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Risk Contribution Decomposition
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust weights for Indian asset classes and observe how risk contribution changes.
        Assets: Nifty 50, Govt Bonds (G-Sec), Gold (MCX).
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Nifty 50 Weight: {(w1 * 100).toFixed(0)}%</span>
          <input type="range" min="0" max="0.9" step="0.01" value={w1}
            onChange={e => setW1(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Govt Bonds Weight: {(w2 * 100).toFixed(0)}%</span>
          <input type="range" min="0" max="0.9" step="0.01" value={w2}
            onChange={e => setW2(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="text-center text-xs text-gray-500 mb-2">
        Gold Weight: {(w3 * 100).toFixed(0)}% | Portfolio Vol: {(portVol * 100).toFixed(2)}%
      </div>

      <svg viewBox="0 0 400 240" className="w-full max-w-md mx-auto block">
        {labels.map((label, i) => {
          const x = 60 + i * 110
          const barH = Math.max(2, (rcPct[i] / 100) * maxBarH)
          const color = ['#6366f1', '#22c55e', '#f59e0b'][i]
          return (
            <g key={i}>
              <rect x={x} y={220 - barH} width={barW} height={barH} fill={color} opacity="0.7" rx="3" />
              <text x={x + barW / 2} y={215 - barH} textAnchor="middle" className="text-[10px] font-bold" fill={color}>
                {rcPct[i].toFixed(1)}%
              </text>
              <text x={x + barW / 2} y={235} textAnchor="middle" className="text-[9px] fill-gray-500">{label}</text>
            </g>
          )
        })}
        <text x={200} y={15} textAnchor="middle" className="text-[11px] font-semibold fill-gray-600">Risk Contribution (%)</text>
      </svg>
    </div>
  )
}

export default function EqualRiskContribution() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Equal Risk Contribution (ERC) Portfolios
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Risk parity is a portfolio construction approach that allocates risk, rather than capital,
        equally across assets or risk factors. Unlike mean-variance optimization, risk parity does
        not require expected return estimates -- a significant advantage given the estimation error
        problems we explored earlier. In the Indian context, risk parity naturally leads to
        higher allocations to bonds and gold relative to equities, producing portfolios that are
        more resilient to crashes like those in 2008 and 2020.
      </p>

      <DefinitionBlock
        title="Risk Contribution"
        label="Definition 9.5"
        definition="For a portfolio with weights w and covariance matrix Σ, the risk contribution of asset i is RC_i = w_i × (Σw)_i / σ_p, where σ_p = √(w'Σw) is the portfolio volatility. The sum of all risk contributions equals the portfolio volatility: Σ_i RC_i = σ_p."
        notation="RC_i = risk contribution of asset i, MRC_i = (Σw)_i / σ_p = marginal risk contribution"
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The marginal risk contribution (MRC) of asset <InlineMath math="i" /> is the partial
        derivative of portfolio volatility with respect to weight <InlineMath math="w_i" />:
      </p>

      <BlockMath math="\text{MRC}_i = \frac{\partial \sigma_p}{\partial w_i} = \frac{(\Sigma \mathbf{w})_i}{\sigma_p}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The risk contribution is the product of weight and marginal risk:
      </p>

      <BlockMath math="\text{RC}_i = w_i \cdot \text{MRC}_i = \frac{w_i (\Sigma \mathbf{w})_i}{\sigma_p}" />

      <TheoremBlock
        title="Euler Decomposition of Portfolio Risk"
        label="Theorem 9.4"
        statement="Portfolio volatility decomposes exactly into the sum of individual risk contributions: σ_p = Σᵢ RCᵢ = Σᵢ wᵢ × MRCᵢ. This follows from Euler's theorem for homogeneous functions, since σ_p is homogeneous of degree 1 in w."
        proof="By Euler's theorem, for any function f homogeneous of degree k: Σᵢ xᵢ (∂f/∂xᵢ) = k·f(x). Since σ_p(w) = √(w'Σw) is homogeneous of degree 1 in w, we have Σᵢ wᵢ (∂σ_p/∂wᵢ) = σ_p, which gives Σᵢ RCᵢ = σ_p."
      />

      <InteractiveRiskContribution />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The ERC Portfolio
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The Equal Risk Contribution (ERC) portfolio, also known as the risk parity portfolio,
        equalizes risk contributions across all assets:
      </p>

      <BlockMath math="\text{RC}_i = \text{RC}_j \quad \forall \, i, j \quad \Leftrightarrow \quad w_i (\Sigma \mathbf{w})_i = w_j (\Sigma \mathbf{w})_j \quad \forall \, i, j" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        This is equivalent to each asset contributing <InlineMath math="1/n" /> of total portfolio risk.
        There is no closed-form solution in general; we solve it numerically via optimization:
      </p>

      <BlockMath math="\min_{\mathbf{w}} \sum_{i=1}^{n} \sum_{j=1}^{n} \left(w_i (\Sigma \mathbf{w})_i - w_j (\Sigma \mathbf{w})_j\right)^2 \quad \text{s.t.} \quad \mathbf{w}^\top \mathbf{1} = 1, \quad \mathbf{w} \geq 0" />

      <PythonCode
        title="erc_indian_assets.py"
        runnable
        code={`import numpy as np
from scipy.optimize import minimize

# Indian multi-asset universe
assets = ['Nifty 50', 'Nifty MidCap', 'G-Sec 10Y', 'Corp Bonds', 'Gold (MCX)', 'REIT']
n = len(assets)

# Annualized expected volatilities
vols = np.array([0.22, 0.28, 0.06, 0.04, 0.15, 0.12])

# Correlation matrix
corr = np.array([
    [1.00, 0.85, -0.10, 0.05, 0.10, 0.40],
    [0.85, 1.00, -0.15, 0.00, 0.12, 0.35],
    [-0.10, -0.15, 1.00, 0.80, 0.15, 0.10],
    [0.05, 0.00, 0.80, 1.00, 0.10, 0.15],
    [0.10, 0.12, 0.15, 0.10, 1.00, 0.05],
    [0.40, 0.35, 0.10, 0.15, 0.05, 1.00],
])

# Covariance matrix
Sigma = np.outer(vols, vols) * corr

def portfolio_risk(w):
    return np.sqrt(w @ Sigma @ w)

def risk_contributions(w):
    sigma_p = portfolio_risk(w)
    mrc = Sigma @ w / sigma_p
    rc = w * mrc
    return rc

def erc_objective(w):
    rc = risk_contributions(w)
    # Sum of squared differences in risk contributions
    n = len(w)
    obj = 0
    for i in range(n):
        for j in range(i+1, n):
            obj += (rc[i] - rc[j])**2
    return obj

# Optimize
w0 = np.ones(n) / n
bounds = [(0.01, 0.80)] * n
constraints = [{'type': 'eq', 'fun': lambda w: np.sum(w) - 1}]

result = minimize(erc_objective, w0, method='SLSQP',
                  bounds=bounds, constraints=constraints,
                  options={'maxiter': 1000, 'ftol': 1e-15})

w_erc = result.x
rc = risk_contributions(w_erc)
sigma_p = portfolio_risk(w_erc)

print("=== Equal Risk Contribution Portfolio (Indian Assets) ===")
print(f"Portfolio volatility: {sigma_p:.4f} ({sigma_p:.2%})")
print(f"\\n{'Asset':<15} {'Weight':>8} {'RC':>10} {'RC %':>8}")
print("-" * 45)
for a, w, r in zip(assets, w_erc, rc):
    print(f"{a:<15} {w:>8.4f} {r:>10.6f} {r/sigma_p*100:>7.2f}%")
print(f"\\nSum of RC: {sum(rc):.6f} (= portfolio vol: {sigma_p:.6f})")
print(f"Max RC deviation: {(max(rc) - min(rc))/sigma_p*100:.4f}%")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Spinu&rsquo;s Convex Reformulation
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Spinu (2013) showed that the ERC problem can be reformulated as a convex optimization.
        By substituting <InlineMath math="y = w / \sigma_p" /> and working in the unnormalized space:
      </p>

      <BlockMath math="\min_{\mathbf{y} \geq 0} \quad \frac{1}{2} \mathbf{y}^\top \Sigma \mathbf{y} - \frac{1}{n} \sum_{i=1}^{n} \ln y_i" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The solution <InlineMath math="\mathbf{y}^*" /> is then normalized:
        <InlineMath math="\mathbf{w}^* = \mathbf{y}^* / (\mathbf{1}^\top \mathbf{y}^*)" />.
        The log barrier ensures all weights remain positive and creates equal risk contributions
        at the optimum.
      </p>

      <PythonCode
        title="erc_convex_spinu.py"
        runnable
        code={`import numpy as np
import cvxpy as cp

assets = ['Nifty 50', 'Nifty MidCap', 'G-Sec 10Y', 'Corp Bonds', 'Gold (MCX)', 'REIT']
vols = np.array([0.22, 0.28, 0.06, 0.04, 0.15, 0.12])
corr = np.array([
    [1.00, 0.85, -0.10, 0.05, 0.10, 0.40],
    [0.85, 1.00, -0.15, 0.00, 0.12, 0.35],
    [-0.10, -0.15, 1.00, 0.80, 0.15, 0.10],
    [0.05, 0.00, 0.80, 1.00, 0.10, 0.15],
    [0.10, 0.12, 0.15, 0.10, 1.00, 0.05],
    [0.40, 0.35, 0.10, 0.15, 0.05, 1.00],
])
Sigma = np.outer(vols, vols) * corr
n = len(assets)

# Spinu's convex formulation
y = cp.Variable(n, pos=True)
objective = 0.5 * cp.quad_form(y, Sigma) - (1.0/n) * cp.sum(cp.log(y))
prob = cp.Problem(cp.Minimize(objective))
prob.solve(solver=cp.SCS)

w_erc = y.value / np.sum(y.value)
sigma_p = np.sqrt(w_erc @ Sigma @ w_erc)
rc = w_erc * (Sigma @ w_erc) / sigma_p

print("=== ERC via Spinu Convex Formulation ===")
print(f"Portfolio volatility: {sigma_p:.4f} ({sigma_p:.2%})")
print(f"\\n{'Asset':<15} {'Weight':>8} {'RC %':>8}")
print("-" * 35)
for a, w, r in zip(assets, w_erc, rc):
    print(f"{a:<15} {w:>8.4f} {r/sigma_p*100:>7.2f}%")
print(f"\\nTarget RC per asset: {100/n:.2f}%")`}
      />

      <ExampleBlock
        title="Two-Asset ERC"
        difficulty="beginner"
        problem="Compute the ERC portfolio for Nifty 50 ($\\sigma_1 = 22\\%$) and Indian G-Sec ($\\sigma_2 = 6\\%$) with correlation $\\rho = -0.1$."
        solution={[
          {
            step: 'Set up the equal risk contribution condition',
            formula: 'w_1 \\cdot (\\Sigma \\mathbf{w})_1 = w_2 \\cdot (\\Sigma \\mathbf{w})_2',
            explanation: 'Each asset must contribute equally to portfolio risk.',
          },
          {
            step: 'Expand using covariance terms',
            formula: 'w_1(w_1 \\sigma_1^2 + w_2 \\rho \\sigma_1 \\sigma_2) = w_2(w_2 \\sigma_2^2 + w_1 \\rho \\sigma_1 \\sigma_2)',
            explanation: 'Substitute the covariance matrix entries.',
          },
          {
            step: 'Simplify with w₂ = 1 - w₁',
            formula: 'w_1^2 \\sigma_1^2 = (1-w_1)^2 \\sigma_2^2',
            explanation: 'When correlation is low, the cross terms approximately cancel. The approximate ERC weight is w₁ ≈ σ₂/(σ₁+σ₂) = 0.06/0.28 = 21.4% for Nifty 50 and 78.6% for G-Sec.',
          },
        ]}
      />

      <NoteBlock title="Risk Parity in Indian Markets" type="tip">
        <p>
          Risk parity naturally allocates heavily to Indian G-Secs and gold due to their lower
          volatility. This produces a portfolio that:
        </p>
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>Had drawdowns of ~8% vs ~55% for equity-only during 2008 crisis</li>
          <li>Benefits from India&rsquo;s structural decline in interest rates (G-Sec appreciation)</li>
          <li>Often requires leverage to match equity-like returns (target ~12% CAGR)</li>
          <li>Is offered by Indian AMCs like DSP and Edelweiss as &ldquo;balanced advantage&rdquo; funds</li>
        </ul>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          The ERC portfolio equalizes risk contributions, producing allocations that are robust
          to return estimation errors. For Indian multi-asset portfolios, ERC typically allocates
          20-25% to equities, 50-60% to bonds, and 15-20% to gold -- a defensive allocation that
          has historically delivered superior risk-adjusted returns compared to the typical
          Indian retail portfolio of 60%+ equity.
        </p>
      </NoteBlock>
    </div>
  )
}
