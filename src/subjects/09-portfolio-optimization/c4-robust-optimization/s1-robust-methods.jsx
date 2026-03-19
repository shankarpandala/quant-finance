import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveUncertaintySet() {
  const [epsilon, setEpsilon] = useState(0.05)
  const [kappa, setKappa] = useState(0.10)
  const [method, setMethod] = useState('box')

  const nominalReturn = 0.12
  const worstReturn = method === 'box'
    ? nominalReturn - epsilon
    : nominalReturn - epsilon * Math.sqrt(1 + kappa)
  const bestReturn = method === 'box'
    ? nominalReturn + epsilon
    : nominalReturn + epsilon * Math.sqrt(1 + kappa)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Uncertainty Sets for Expected Returns
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Explore how uncertainty set size affects the worst-case return.
      </p>

      <div className="mb-4 grid grid-cols-3 gap-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Uncertainty Set</span>
          <select value={method} onChange={e => setMethod(e.target.value)}
            className="rounded border px-2 py-1 text-xs dark:bg-gray-800 dark:border-gray-600">
            <option value="box">Box (L∞)</option>
            <option value="ellipsoidal">Ellipsoidal (L2)</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math="\epsilon" /> = {epsilon.toFixed(3)}</span>
          <input type="range" min="0.01" max="0.15" step="0.005" value={epsilon}
            onChange={e => setEpsilon(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math="\kappa" /> = {kappa.toFixed(3)}</span>
          <input type="range" min="0.01" max="0.30" step="0.01" value={kappa}
            onChange={e => setKappa(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 400 80" className="w-full max-w-md mx-auto block">
        <line x1={30} y1={40} x2={370} y2={40} stroke="#d1d5db" strokeWidth="1" />
        {/* Uncertainty interval */}
        <rect x={30 + worstReturn * 2500} y={25} width={(bestReturn - worstReturn) * 2500} height={30}
          fill="#6366f1" opacity="0.15" rx="4" />
        <line x1={30 + worstReturn * 2500} y1={20} x2={30 + worstReturn * 2500} y2={60} stroke="#ef4444" strokeWidth="2" />
        <line x1={30 + bestReturn * 2500} y1={20} x2={30 + bestReturn * 2500} y2={60} stroke="#22c55e" strokeWidth="2" />
        <circle cx={30 + nominalReturn * 2500} cy={40} r="5" fill="#6366f1" />
        <text x={30 + worstReturn * 2500} y={72} textAnchor="middle" className="text-[9px] fill-red-500">{(worstReturn * 100).toFixed(1)}%</text>
        <text x={30 + nominalReturn * 2500} y={15} textAnchor="middle" className="text-[9px] fill-indigo-600 font-semibold">Nominal: {(nominalReturn * 100).toFixed(1)}%</text>
        <text x={30 + bestReturn * 2500} y={72} textAnchor="middle" className="text-[9px] fill-green-600">{(bestReturn * 100).toFixed(1)}%</text>
      </svg>
    </div>
  )
}

export default function RobustMethods() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Worst-Case and Robust Optimization
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Robust portfolio optimization addresses parameter uncertainty by optimizing for the
        worst case within an uncertainty set, rather than treating estimated parameters as exact.
        This minimax approach produces portfolios that perform well even when our estimates of
        expected returns and covariances are wrong -- a common scenario in volatile Indian markets
        subject to sudden policy changes, monsoon risks, and global contagion.
      </p>

      <DefinitionBlock
        title="Robust Portfolio Optimization"
        label="Definition 9.12"
        definition="Robust portfolio optimization solves a minimax problem: max_w min_{(μ,Σ) ∈ U} w'μ - λw'Σw, where U is an uncertainty set containing the plausible values of the true parameters. The solution is optimal for the worst-case parameter realization within U."
        notation="U = uncertainty set, (μ,Σ) = uncertain parameters"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Types of Uncertainty Sets
      </h3>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        <strong>Box uncertainty</strong> (Tutuncu and Koenig, 2004):
      </p>
      <BlockMath math="\mathcal{U}_{\text{box}} = \{\boldsymbol{\mu} : |\mu_i - \hat{\mu}_i| \leq \epsilon_i, \; \forall i\}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        <strong>Ellipsoidal uncertainty</strong> (Goldfarb and Iyengar, 2003):
      </p>
      <BlockMath math="\mathcal{U}_{\text{ellip}} = \{\boldsymbol{\mu} : (\boldsymbol{\mu} - \hat{\boldsymbol{\mu}})^\top \hat{\Sigma}^{-1} (\boldsymbol{\mu} - \hat{\boldsymbol{\mu}}) \leq \kappa^2\}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The parameter <InlineMath math="\kappa" /> can be calibrated from the chi-squared
        distribution: <InlineMath math="\kappa^2 = \chi^2_n(\alpha)" /> for confidence
        level <InlineMath math="1-\alpha" />.
      </p>

      <TheoremBlock
        title="Robust MVO with Ellipsoidal Uncertainty"
        label="Theorem 9.10"
        statement="When expected returns lie in an ellipsoidal uncertainty set U_ellip, the robust mean-variance problem max_w min_{μ∈U} w'μ - λw'Σw has the tractable reformulation: max_w w'μ̂ - κ√(w'Σw) - λw'Σw. This is a second-order cone program (SOCP)."
        proof="By duality, min_{μ∈U} w'μ = w'μ̂ - κ√(w'Σ̂w/T) since the worst case μ in the ellipsoid points opposite to w in the Σ̂-metric. The inner minimum is achieved at μ* = μ̂ - κΣ̂w/(√(w'Σ̂w)·√T)."
      />

      <InteractiveUncertaintySet />

      <PythonCode
        title="robust_mvo_nifty.py"
        runnable
        code={`import numpy as np
import cvxpy as cp

# Indian portfolio optimization
tickers = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ITC',
           'LT', 'AXISBANK', 'HINDUNILVR']
n = len(tickers)

mu_hat = np.array([0.15, 0.13, 0.12, 0.14, 0.10, 0.16, 0.18, 0.11])
vols = np.array([0.28, 0.22, 0.22, 0.24, 0.20, 0.28, 0.30, 0.18])
np.random.seed(42)
corr = np.eye(n) * 0.4 + 0.6 * np.full((n, n), 0.35)
np.fill_diagonal(corr, 1.0)
Sigma = np.outer(vols, vols) * corr

# Risk aversion
lam = 2.0
rf = 0.065

# === Standard MVO ===
w = cp.Variable(n)
prob_std = cp.Problem(
    cp.Maximize(mu_hat @ w - lam * cp.quad_form(w, Sigma)),
    [cp.sum(w) == 1, w >= 0]
)
prob_std.solve(solver=cp.SCS)
w_std = w.value

# === Robust MVO (Ellipsoidal) ===
T = 252  # 1 year of daily data
kappa = np.sqrt(n)  # ~chi-squared quantile
Sigma_mu = Sigma / T  # Uncertainty in mean estimate

w2 = cp.Variable(n)
# Worst-case return = mu_hat @ w - kappa * ||Sigma_mu^{1/2} w||
L = np.linalg.cholesky(Sigma_mu)
robust_return = mu_hat @ w2 - kappa * cp.norm(L.T @ w2)
prob_rob = cp.Problem(
    cp.Maximize(robust_return - lam * cp.quad_form(w2, Sigma)),
    [cp.sum(w2) == 1, w2 >= 0]
)
prob_rob.solve(solver=cp.SCS)
w_rob = w2.value

# === Box Robust ===
w3 = cp.Variable(n)
epsilon = vols / np.sqrt(T)  # Per-asset uncertainty
worst_return = (mu_hat - epsilon) @ w3  # Worst-case for long-only
prob_box = cp.Problem(
    cp.Maximize(worst_return - lam * cp.quad_form(w3, Sigma)),
    [cp.sum(w3) == 1, w3 >= 0]
)
prob_box.solve(solver=cp.SCS)
w_box = w3.value

print("=== Robust Optimization Comparison (NSE Stocks) ===")
print(f"\\n{'Ticker':<12} {'Std MVO':>8} {'Ellip Rob':>10} {'Box Rob':>8}")
print("-" * 42)
for t, ws, wr, wb in zip(tickers, w_std, w_rob, w_box):
    print(f"{t:<12} {ws:>8.4f} {wr:>10.4f} {wb:>8.4f}")

print(f"\\nPortfolio metrics:")
for name, ww in [('Standard', w_std), ('Ellipsoidal', w_rob), ('Box', w_box)]:
    ret = mu_hat @ ww
    vol = np.sqrt(ww @ Sigma @ ww)
    sr = (ret - rf) / vol
    print(f"  {name:12s}: ret={ret:.2%}, vol={vol:.2%}, SR={sr:.3f}")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Worst-Case CVaR Optimization
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        An alternative robust approach minimizes the worst-case Conditional Value-at-Risk (CVaR)
        over an ambiguity set of distributions:
      </p>

      <BlockMath math="\min_{\mathbf{w}} \max_{F \in \mathcal{F}} \text{CVaR}_\alpha^F(-\mathbf{w}^\top \mathbf{r})" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        This is particularly relevant for Indian markets where tail events (demonetization shock,
        COVID crash, IL&FS crisis) have shown that normal distribution assumptions severely
        underestimate downside risk.
      </p>

      <ExampleBlock
        title="Calibrating Uncertainty Set from NSE Data"
        difficulty="advanced"
        problem="Using 3 years of daily Nifty 50 data (T=756), compute the ellipsoidal uncertainty radius $\\kappa$ at 95% confidence for N=10 stocks. How does this affect the worst-case expected return?"
        solution={[
          {
            step: 'Compute chi-squared quantile',
            formula: '\\kappa^2 = \\chi^2_{10}(0.95) = 18.307',
            explanation: 'For 10 assets at 95% confidence, the chi-squared quantile determines the ellipsoid size.',
          },
          {
            step: 'Compute uncertainty radius',
            formula: '\\kappa = \\sqrt{18.307} = 4.279',
            explanation: 'The uncertainty radius scales the penalty on portfolio risk.',
          },
          {
            step: 'Worst-case return penalty',
            formula: '\\text{Penalty} = \\kappa \\sqrt{\\mathbf{w}^\\top (\\Sigma/T) \\mathbf{w}} \\approx 4.279 \\times \\frac{0.18}{\\sqrt{756}} \\approx 2.8\\%',
            explanation: 'For an equal-weight portfolio with 18% vol, the worst-case return is reduced by about 2.8% from the nominal estimate.',
          },
        ]}
      />

      <NoteBlock title="Robust Methods for Indian Market Practitioners" type="tip">
        <ul className="space-y-1 list-disc list-inside">
          <li>Robust optimization is most valuable during uncertain periods (elections, RBI policy shifts)</li>
          <li>Box uncertainty is simpler but may be too conservative for well-estimated stocks</li>
          <li>Ellipsoidal uncertainty accounts for estimation correlation across assets</li>
          <li>Combine with shrinkage estimators for double robustness</li>
          <li>Available in Python via <code>cvxpy</code> (SOCP and SDP solvers)</li>
        </ul>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Robust optimization produces portfolios that are resilient to parameter estimation error
          by optimizing for the worst case within an uncertainty set. For Indian markets, where
          regime changes and structural breaks are common, robust methods provide a valuable
          safety margin. The key trade-off is between robustness and performance: larger uncertainty
          sets produce more conservative portfolios with lower expected returns.
        </p>
      </NoteBlock>
    </div>
  )
}
