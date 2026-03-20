import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveEfficientFrontier() {
  const [riskAversion, setRiskAversion] = useState(2.0)
  const [niftyWeight, setNiftyWeight] = useState(0.6)

  const bankNiftyReturn = 0.14
  const niftyReturn = 0.12
  const niftyVol = 0.18
  const bankNiftyVol = 0.24
  const correlation = 0.82

  const portReturn = niftyWeight * niftyReturn + (1 - niftyWeight) * bankNiftyReturn
  const portVol = Math.sqrt(
    Math.pow(niftyWeight, 2) * Math.pow(niftyVol, 2) +
    Math.pow(1 - niftyWeight, 2) * Math.pow(bankNiftyVol, 2) +
    2 * niftyWeight * (1 - niftyWeight) * niftyVol * bankNiftyVol * correlation
  )
  const utility = portReturn - (riskAversion / 2) * Math.pow(portVol, 2)
  const sharpe = (portReturn - 0.065) / portVol

  const frontierPoints = []
  for (let w = 0; w <= 1.0; w += 0.02) {
    const r = w * niftyReturn + (1 - w) * bankNiftyReturn
    const v = Math.sqrt(
      w * w * niftyVol * niftyVol +
      (1 - w) * (1 - w) * bankNiftyVol * bankNiftyVol +
      2 * w * (1 - w) * niftyVol * bankNiftyVol * correlation
    )
    frontierPoints.push({ vol: v, ret: r, w })
  }

  const svgW = 500
  const svgH = 320
  const pad = 50
  const minVol = 0.15
  const maxVol = 0.26
  const minRet = 0.11
  const maxRet = 0.15

  const scaleX = (v) => pad + ((v - minVol) / (maxVol - minVol)) * (svgW - 2 * pad)
  const scaleY = (r) => svgH - pad - ((r - minRet) / (maxRet - minRet)) * (svgH - 2 * pad)

  const pathD = frontierPoints
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(p.vol).toFixed(1)} ${scaleY(p.ret).toFixed(1)}`)
    .join(' ')

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Two-Asset Efficient Frontier
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust Nifty 50 weight and risk aversion to explore the frontier between Nifty 50 and Bank Nifty.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Nifty 50 Weight: {(niftyWeight * 100).toFixed(0)}%</span>
          <input type="range" min="0" max="1" step="0.02" value={niftyWeight}
            onChange={e => setNiftyWeight(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Risk Aversion <InlineMath math={`\\lambda`} /> = {riskAversion.toFixed(1)}</span>
          <input type="range" min="0.5" max="6" step="0.1" value={riskAversion}
            onChange={e => setRiskAversion(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-xl mx-auto block">
        <line x1={pad} y1={svgH - pad} x2={svgW - pad} y2={svgH - pad} stroke="#9ca3af" strokeWidth="1" />
        <line x1={pad} y1={pad} x2={pad} y2={svgH - pad} stroke="#9ca3af" strokeWidth="1" />
        <text x={svgW / 2} y={svgH - 10} textAnchor="middle" className="text-[11px] fill-gray-500">Volatility (σ)</text>
        <text x={15} y={svgH / 2} textAnchor="middle" className="text-[11px] fill-gray-500" transform={`rotate(-90, 15, ${svgH / 2})`}>Return (μ)</text>

        <path d={pathD} fill="none" stroke="#6366f1" strokeWidth="2.5" />

        <circle cx={scaleX(portVol)} cy={scaleY(portReturn)} r="6" fill="#ef4444" stroke="#fff" strokeWidth="1.5" />
        <text x={scaleX(portVol) + 10} y={scaleY(portReturn) - 8} className="text-[10px] fill-red-500 font-semibold">Your Portfolio</text>

        <circle cx={scaleX(niftyVol)} cy={scaleY(niftyReturn)} r="4" fill="#22c55e" />
        <text x={scaleX(niftyVol) + 8} y={scaleY(niftyReturn) + 4} className="text-[9px] fill-green-600">Nifty 50</text>

        <circle cx={scaleX(bankNiftyVol)} cy={scaleY(bankNiftyReturn)} r="4" fill="#f59e0b" />
        <text x={scaleX(bankNiftyVol) + 8} y={scaleY(bankNiftyReturn) + 4} className="text-[9px] fill-amber-600">Bank Nifty</text>
      </svg>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 text-center text-xs text-gray-600 dark:text-gray-400">
        <div>Return: <span className="font-semibold text-indigo-600">{(portReturn * 100).toFixed(2)}%</span></div>
        <div>Volatility: <span className="font-semibold text-indigo-600">{(portVol * 100).toFixed(2)}%</span></div>
        <div>Sharpe: <span className="font-semibold text-indigo-600">{sharpe.toFixed(3)}</span></div>
        <div>Utility: <span className="font-semibold text-indigo-600">{utility.toFixed(4)}</span></div>
      </div>
    </div>
  )
}

export default function Markowitz() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Markowitz Mean-Variance Optimization
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Harry Markowitz&rsquo;s 1952 paper &ldquo;Portfolio Selection&rdquo; launched modern portfolio
        theory. The core insight is that investors should care about both expected return and risk
        (variance), and that diversification can reduce portfolio risk below that of any individual
        asset. We apply this framework to the Indian equity market, using stocks from the Nifty 50
        universe traded on the National Stock Exchange (NSE).
      </p>

      <DefinitionBlock
        title="Mean-Variance Portfolio"
        label="Definition 9.1"
        definition="A mean-variance portfolio is defined by a weight vector w ∈ ℝⁿ that allocates capital across n assets. The portfolio return is μₚ = w'μ and the portfolio variance is σₚ² = w'Σw, where μ is the vector of expected returns and Σ is the covariance matrix."
        notation="w = portfolio weights, μ = expected return vector, Σ = covariance matrix"
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The mean-variance optimization problem seeks the portfolio with minimum variance for a given
        target return <InlineMath math="\mu_{\text{target}}" />:
      </p>

      <BlockMath math="\min_{\mathbf{w}} \quad \mathbf{w}^\top \Sigma \mathbf{w} \quad \text{s.t.} \quad \mathbf{w}^\top \boldsymbol{\mu} = \mu_{\text{target}}, \quad \mathbf{w}^\top \mathbf{1} = 1" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        This is a quadratic program (QP) with linear equality constraints. By solving it for a range
        of target returns, we trace out the <strong>efficient frontier</strong> -- the set of
        portfolios offering maximum return for each level of risk.
      </p>

      <TheoremBlock
        title="Two-Fund Separation"
        label="Theorem 9.1"
        statement="In the mean-variance framework without a risk-free asset, every efficient portfolio is a linear combination of any two distinct efficient portfolios. Formally, if w₁ and w₂ are efficient, then w = αw₁ + (1-α)w₂ is efficient for all α ∈ ℝ."
        proof="By the first-order KKT conditions, efficient portfolios satisfy w = Σ⁻¹(λ₁μ + λ₂1) where λ₁, λ₂ are Lagrange multipliers. Since this is affine in (λ₁, λ₂), any convex combination of solutions is also a solution."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Analytical Solution
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        With equality constraints only, the efficient frontier has a closed-form solution using the
        Lagrangian method. Define the following scalars:
      </p>

      <BlockMath math="A = \mathbf{1}^\top \Sigma^{-1} \boldsymbol{\mu}, \quad B = \boldsymbol{\mu}^\top \Sigma^{-1} \boldsymbol{\mu}, \quad C = \mathbf{1}^\top \Sigma^{-1} \mathbf{1}, \quad D = BC - A^2" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The minimum-variance portfolio achieving target return <InlineMath math="\mu_p" /> has weights:
      </p>

      <BlockMath math="\mathbf{w}^* = \frac{1}{D}\left[(B - A\mu_p)\,\Sigma^{-1}\mathbf{1} + (C\mu_p - A)\,\Sigma^{-1}\boldsymbol{\mu}\right]" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The efficient frontier in <InlineMath math="(\sigma_p, \mu_p)" /> space is a hyperbola:
      </p>

      <BlockMath math="\sigma_p^2 = \frac{C\mu_p^2 - 2A\mu_p + B}{D}" />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Global Minimum Variance Portfolio
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The portfolio with the lowest possible variance regardless of return target is the
        Global Minimum Variance (GMV) portfolio:
      </p>

      <BlockMath math="\mathbf{w}_{\text{GMV}} = \frac{\Sigma^{-1}\mathbf{1}}{\mathbf{1}^\top \Sigma^{-1}\mathbf{1}}, \quad \mu_{\text{GMV}} = \frac{A}{C}, \quad \sigma^2_{\text{GMV}} = \frac{1}{C}" />

      <InteractiveEfficientFrontier />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Efficient Frontier with Nifty 50 Stocks
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Let us compute the efficient frontier using a selection of blue-chip Nifty 50 stocks.
        We use historical daily returns from NSE and solve the QP using <code>cvxpy</code>.
      </p>

      <PythonCode
        title="efficient_frontier_nifty50.py"
        runnable
        code={`import numpy as np
import cvxpy as cp

# Annualized expected returns for 8 Nifty 50 stocks
# (Reliance, TCS, HDFC Bank, Infosys, ITC, L&T, Axis Bank, HUL)
tickers = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ITC', 'LT', 'AXISBANK', 'HINDUNILVR']
mu = np.array([0.15, 0.13, 0.12, 0.14, 0.10, 0.16, 0.18, 0.11])

# Sample covariance matrix (annualized)
# In practice, estimate from daily returns via NSE data
np.random.seed(42)
raw = np.random.randn(8, 8) * 0.01
cov_matrix = raw @ raw.T + np.diag([0.04, 0.035, 0.03, 0.038, 0.025, 0.045, 0.055, 0.028])

n = len(mu)
w = cp.Variable(n)
ret = mu @ w
risk = cp.quad_form(w, cov_matrix)

# Trace efficient frontier
target_returns = np.linspace(0.10, 0.18, 30)
frontier_risk = []
frontier_weights = []

for target in target_returns:
    prob = cp.Problem(
        cp.Minimize(risk),
        [cp.sum(w) == 1, ret == target, w >= 0]  # long-only
    )
    prob.solve(solver=cp.SCS, verbose=False)
    if prob.status == 'optimal':
        frontier_risk.append(np.sqrt(risk.value))
        frontier_weights.append(w.value.copy())
    else:
        frontier_risk.append(None)
        frontier_weights.append(None)

# Global Minimum Variance Portfolio
prob_gmv = cp.Problem(cp.Minimize(risk), [cp.sum(w) == 1, w >= 0])
prob_gmv.solve(solver=cp.SCS)
gmv_ret = mu @ w.value
gmv_vol = np.sqrt(risk.value)

print("=== Efficient Frontier (Nifty 50 Stocks) ===")
print(f"Global Minimum Variance Portfolio:")
print(f"  Return: {gmv_ret:.4f}  Volatility: {gmv_vol:.4f}")
print(f"  Weights: {dict(zip(tickers, np.round(w.value, 4)))}")
print()
print("Frontier points (return -> volatility):")
for i, (t, r) in enumerate(zip(target_returns, frontier_risk)):
    if r is not None:
        print(f"  mu={t:.3f}  sigma={r:.4f}")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Capital Market Line
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        When a risk-free asset is available (e.g., Indian Government Securities yielding around
        6.5-7%), the efficient set becomes a straight line from the risk-free rate tangent to the
        frontier. This is the <strong>Capital Market Line</strong> (CML):
      </p>

      <BlockMath math="\mu_p = r_f + \frac{\mu_T - r_f}{\sigma_T}\,\sigma_p" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The tangency portfolio <InlineMath math="T" /> maximizes the Sharpe ratio:
      </p>

      <BlockMath math="\mathbf{w}_T = \frac{\Sigma^{-1}(\boldsymbol{\mu} - r_f \mathbf{1})}{\mathbf{1}^\top \Sigma^{-1}(\boldsymbol{\mu} - r_f \mathbf{1})}" />

      <ExampleBlock
        title="Tangency Portfolio for Indian Equities"
        difficulty="intermediate"
        problem="Given the risk-free rate $r_f = 0.065$ (Indian G-Sec yield), expected returns $\mu = [0.12, 0.15, 0.10]$ for HDFC Bank, Reliance, and ITC, and a covariance matrix, find the tangency portfolio weights."
        solution={[
          {
            step: 'Compute excess returns',
            formula: '\\mu^{\\text{excess}} = \\mu - r_f \\mathbf{1} = [0.055,\\; 0.085,\\; 0.035]',
            explanation: 'Subtract the risk-free rate from each expected return.',
          },
          {
            step: 'Compute Σ⁻¹(μ - rₓ1)',
            formula: '\\mathbf{z} = \\Sigma^{-1}(\\boldsymbol{\\mu} - r_f \\mathbf{1})',
            explanation: 'Multiply the inverse covariance matrix by the excess return vector.',
          },
          {
            step: 'Normalize to sum to 1',
            formula: '\\mathbf{w}_T = \\frac{\\mathbf{z}}{\\mathbf{1}^\\top \\mathbf{z}}',
            explanation: 'Divide each element by the sum to get portfolio weights.',
          },
        ]}
      />

      <NoteBlock title="Indian Market Context" type="tip">
        <p>
          When applying Markowitz optimization to Indian equities, consider these practical factors:
        </p>
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>The risk-free rate for Indian investors is the 10-year G-Sec yield (~7% as of 2024)</li>
          <li>NSE provides free historical data through its website for backtesting</li>
          <li>SEBI regulations limit mutual fund concentration -- max 10% in a single stock for diversified funds</li>
          <li>STT (Securities Transaction Tax) of 0.1% on equity delivery impacts short-horizon rebalancing</li>
          <li>High correlation within Nifty sectors (especially banking) reduces diversification benefit</li>
        </ul>
      </NoteBlock>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Maximum Sharpe Ratio Portfolio
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For practical allocation, we often seek the maximum Sharpe ratio portfolio. Using the
        Indian risk-free rate <InlineMath math="r_f \approx 6.5\%" />:
      </p>

      <BlockMath math="\max_{\mathbf{w}} \quad \frac{\mathbf{w}^\top \boldsymbol{\mu} - r_f}{\sqrt{\mathbf{w}^\top \Sigma \mathbf{w}}} \quad \text{s.t.} \quad \mathbf{w}^\top \mathbf{1} = 1, \quad w_i \geq 0" />

      <PythonCode
        title="max_sharpe_nifty.py"
        runnable
        code={`import numpy as np
import cvxpy as cp

tickers = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ITC', 'LT', 'AXISBANK', 'HINDUNILVR']
mu = np.array([0.15, 0.13, 0.12, 0.14, 0.10, 0.16, 0.18, 0.11])
rf = 0.065  # Indian G-Sec 10Y yield

np.random.seed(42)
raw = np.random.randn(8, 8) * 0.01
Sigma = raw @ raw.T + np.diag([0.04, 0.035, 0.03, 0.038, 0.025, 0.045, 0.055, 0.028])

# Reformulation: maximize Sharpe via Cornish trick
# Let y = w / (w'(mu - rf)) -- unnormalized
y = cp.Variable(8)
kappa = cp.Variable()  # scaling variable

prob = cp.Problem(
    cp.Minimize(cp.quad_form(y, Sigma)),
    [(mu - rf) @ y == 1, cp.sum(y) == kappa, y >= 0, kappa >= 0]
)
prob.solve(solver=cp.SCS)

w_star = y.value / kappa.value
port_ret = mu @ w_star
port_vol = np.sqrt(w_star @ Sigma @ w_star)
sharpe = (port_ret - rf) / port_vol

print("=== Maximum Sharpe Ratio Portfolio ===")
print(f"Risk-free rate: {rf:.1%} (Indian G-Sec)")
print(f"Expected Return: {port_ret:.4f} ({port_ret:.2%})")
print(f"Volatility:      {port_vol:.4f} ({port_vol:.2%})")
print(f"Sharpe Ratio:    {sharpe:.4f}")
print()
print("Optimal Weights:")
for t, wt in zip(tickers, w_star):
    if wt > 0.001:
        print(f"  {t:12s}: {wt:.4f} ({wt:.2%})")`}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          The Markowitz efficient frontier provides the theoretical foundation for portfolio
          construction. While the math is elegant, practical implementation for Indian markets
          requires addressing estimation error (next section), transaction costs (STT, brokerage),
          and SEBI-mandated constraints. Modern platforms like Zerodha and Kite allow systematic
          rebalancing that makes mean-variance optimization actionable for Indian retail investors.
        </p>
      </NoteBlock>
    </div>
  )
}
