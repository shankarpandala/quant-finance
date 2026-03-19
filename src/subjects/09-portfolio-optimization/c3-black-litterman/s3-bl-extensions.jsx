import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveEntropyPooling() {
  const [viewType, setViewType] = useState('mean')
  const [viewAsset, setViewAsset] = useState(0)
  const [viewValue, setViewValue] = useState(0.15)

  const assets = ['Nifty 50', 'G-Sec 10Y', 'Gold', 'Nifty IT']
  const priorMeans = [0.12, 0.07, 0.08, 0.14]
  const priorVols = [0.22, 0.06, 0.15, 0.22]

  const kl = viewType === 'mean'
    ? Math.pow(viewValue - priorMeans[viewAsset], 2) / (2 * Math.pow(priorVols[viewAsset], 2))
    : Math.abs(Math.log(viewValue / priorVols[viewAsset]))

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Entropy Pooling View Impact
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Explore how different view types affect the posterior distribution via entropy pooling.
      </p>

      <div className="mb-4 grid grid-cols-3 gap-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>View Type</span>
          <select value={viewType} onChange={e => setViewType(e.target.value)}
            className="rounded border px-2 py-1 text-xs dark:bg-gray-800 dark:border-gray-600">
            <option value="mean">Mean View</option>
            <option value="vol">Volatility View</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Asset: {assets[viewAsset]}</span>
          <input type="range" min="0" max="3" step="1" value={viewAsset}
            onChange={e => setViewAsset(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>View Value: {(viewValue * 100).toFixed(1)}%</span>
          <input type="range" min="0.02" max="0.30" step="0.01" value={viewValue}
            onChange={e => setViewValue(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center text-xs">
        <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30">
          <div className="text-gray-500">Prior {viewType === 'mean' ? 'Mean' : 'Vol'}</div>
          <div className="text-lg font-bold text-indigo-600">
            {((viewType === 'mean' ? priorMeans[viewAsset] : priorVols[viewAsset]) * 100).toFixed(1)}%
          </div>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30">
          <div className="text-gray-500">View {viewType === 'mean' ? 'Mean' : 'Vol'}</div>
          <div className="text-lg font-bold text-amber-600">{(viewValue * 100).toFixed(1)}%</div>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
          <div className="text-gray-500">KL Divergence</div>
          <div className="text-lg font-bold text-purple-600">{kl.toFixed(4)}</div>
        </div>
      </div>
    </div>
  )
}

export default function BLExtensions() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Augmented Black-Litterman and Entropy Pooling
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The classical Black-Litterman model assumes views on expected returns from a Gaussian
        distribution. Modern extensions relax these assumptions significantly. The Augmented
        Black-Litterman (ABL) model and Meucci&rsquo;s Entropy Pooling framework allow views on
        any distributional feature -- volatility, correlation, skewness, tail probabilities --
        making them powerful tools for Indian markets where non-normality is pervasive.
      </p>

      <DefinitionBlock
        title="Entropy Pooling"
        label="Definition 9.11"
        definition="Entropy Pooling (Meucci, 2008) finds the posterior distribution that is closest to the prior (in the Kullback-Leibler sense) while satisfying arbitrary view constraints. The posterior probabilities p* minimize: D_KL(p||p₀) = Σⱼ pⱼ ln(pⱼ/p₀ⱼ) subject to view constraints expressed as expectations under p."
        notation="p₀ = prior probabilities, p* = posterior, D_KL = KL divergence"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Limitations of Classical BL
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The classical BL model has several limitations when applied to Indian markets:
      </p>
      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4">
        <li>Only supports views on expected returns (not volatility, correlation, or tail risk)</li>
        <li>Assumes Gaussian distributions (Indian stock returns exhibit fat tails and skewness)</li>
        <li>Cannot express views like &ldquo;Nifty volatility will exceed 25%&rdquo;</li>
        <li>Cannot handle conditional views like &ldquo;if RBI cuts rates, banking outperforms&rdquo;</li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Entropy Pooling Framework
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Entropy pooling works with a discrete set of J scenarios, each with prior probability
        <InlineMath math="p_{0,j}" />. The posterior probabilities <InlineMath math="p^*" /> solve:
      </p>

      <BlockMath math="\min_{\mathbf{p}} \sum_{j=1}^{J} p_j \ln\frac{p_j}{p_{0,j}} \quad \text{s.t.} \quad \sum_j p_j = 1, \quad p_j \geq 0, \quad \sum_j p_j g_k(\mathbf{x}_j) = v_k \;\; \forall k" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="g_k(\mathbf{x}_j)" /> are arbitrary functions of the scenarios and
        <InlineMath math="v_k" /> are the view targets. This can express:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">View Type</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Constraint</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Indian Example</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Mean return</td>
              <td className="px-4 py-2"><InlineMath math="\sum p_j x_{ij} = \mu_i" /></td>
              <td className="px-4 py-2">Nifty IT return = 15%</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Volatility</td>
              <td className="px-4 py-2"><InlineMath math="\sum p_j (x_{ij} - \mu_i)^2 = \sigma_i^2" /></td>
              <td className="px-4 py-2">Nifty Bank vol = 28%</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Correlation</td>
              <td className="px-4 py-2"><InlineMath math="\sum p_j x_{ij} x_{kj} = \sigma_{ik}" /></td>
              <td className="px-4 py-2">Gold-Nifty corr = 0.1</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Tail probability</td>
              <td className="px-4 py-2"><InlineMath math="\sum p_j \mathbb{1}(x_{ij} < c) = \alpha" /></td>
              <td className="px-4 py-2">P(Nifty &lt; -10%) = 5%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <TheoremBlock
        title="Entropy Pooling Solution"
        label="Theorem 9.9"
        statement="The entropy pooling problem has a unique solution of exponential family form: p*ⱼ = p₀ⱼ exp(Σₖ λₖ gₖ(xⱼ)) / Z(λ), where λₖ are Lagrange multipliers and Z(λ) is the partition function ensuring Σ pⱼ = 1."
        proof="The KL minimization with linear constraints yields a convex dual problem. By the KKT conditions, the optimal probabilities take the exponential tilt form. Uniqueness follows from strict convexity of KL divergence."
      />

      <InteractiveEntropyPooling />

      <PythonCode
        title="entropy_pooling_nifty.py"
        runnable
        code={`import numpy as np
from scipy.optimize import minimize

np.random.seed(42)

# Generate J scenarios from prior distribution
J = 10000  # Number of scenarios
n = 4      # Assets: Nifty 50, G-Sec, Gold, Nifty IT

mu_prior = np.array([0.12, 0.07, 0.08, 0.14])
vols = np.array([0.22, 0.06, 0.15, 0.22])
corr = np.array([
    [1.0, -0.1, 0.1, 0.55],
    [-0.1, 1.0, 0.15, -0.05],
    [0.1, 0.15, 1.0, 0.10],
    [0.55, -0.05, 0.10, 1.0],
])
Sigma = np.outer(vols, vols) * corr

# Generate scenarios
X = np.random.multivariate_normal(mu_prior, Sigma, J)
p0 = np.ones(J) / J  # Uniform prior

# Views:
# 1. Nifty IT mean return = 16% (bullish on IT)
# 2. Gold volatility will be 18% (higher than prior 15%)

# Entropy pooling via dual optimization
def dual_objective(lam):
    """Dual of entropy pooling."""
    lam_mean = lam[0]
    lam_vol = lam[1]

    # View 1: E[X_IT] = 0.16
    g1 = X[:, 3]  # Nifty IT returns
    # View 2: E[(X_Gold - E[X_Gold])^2] = 0.18^2
    g2 = (X[:, 2] - np.mean(X[:, 2]))**2

    log_p = np.log(p0) + lam_mean * g1 + lam_vol * g2
    log_Z = np.max(log_p) + np.log(np.sum(np.exp(log_p - np.max(log_p))))

    # Dual = log(Z) - lambda * target
    dual = log_Z - lam_mean * 0.16 - lam_vol * 0.18**2
    return dual

result = minimize(dual_objective, [0.0, 0.0], method='Nelder-Mead',
                  options={'maxiter': 10000, 'xatol': 1e-10})
lam_opt = result.x

# Compute posterior probabilities
g1 = X[:, 3]
g2 = (X[:, 2] - np.mean(X[:, 2]))**2
log_p = np.log(p0) + lam_opt[0] * g1 + lam_opt[1] * g2
log_p -= np.max(log_p)
p_star = np.exp(log_p)
p_star /= p_star.sum()

# Compute posterior statistics
assets = ['Nifty 50', 'G-Sec 10Y', 'Gold', 'Nifty IT']
print("=== Entropy Pooling Results ===")
print(f"{'Asset':<12} {'Prior Mean':>10} {'Post Mean':>10} {'Prior Vol':>10} {'Post Vol':>10}")
print("-" * 57)
for i, a in enumerate(assets):
    prior_mean = np.sum(p0 * X[:, i])
    post_mean = np.sum(p_star * X[:, i])
    prior_vol = np.sqrt(np.sum(p0 * (X[:, i] - prior_mean)**2))
    post_vol = np.sqrt(np.sum(p_star * (X[:, i] - post_mean)**2))
    print(f"{a:<12} {prior_mean:>10.4f} {post_mean:>10.4f} {prior_vol:>10.4f} {post_vol:>10.4f}")

# Effective number of scenarios
eff_n = np.exp(-np.sum(p_star * np.log(p_star + 1e-15)))
print(f"\\nEffective scenarios: {eff_n:.0f} / {J} ({eff_n/J*100:.1f}%)")
print(f"KL divergence: {np.sum(p_star * np.log(p_star / p0 + 1e-15)):.4f}")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Augmented Black-Litterman (ABL)
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The ABL model extends BL by incorporating factor views and non-linear views.
        For Indian markets, we can express views on:
      </p>

      <BlockMath math="\text{Factor view: } \mathbf{w}_{\text{factor}}^\top \boldsymbol{\mu} = q_{\text{factor}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where factor weights can be momentum scores, value ratios, or macro exposures.
        The ABL posterior combines standard BL views with factor model constraints.
      </p>

      <PythonCode
        title="augmented_bl_india.py"
        runnable
        code={`import numpy as np

# Augmented BL with factor views for Indian stocks
tickers = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ITC', 'LT']
n = len(tickers)

# Equilibrium setup
vols = np.array([0.28, 0.22, 0.22, 0.24, 0.20, 0.28])
corr = np.eye(n) * 0.5 + 0.5
np.fill_diagonal(corr, 1.0)
corr[1, 3] = corr[3, 1] = 0.72
corr[2, 4] = corr[4, 2] = 0.35
Sigma = np.outer(vols, vols) * corr

w_mkt = np.array([0.20, 0.15, 0.15, 0.12, 0.10, 0.08])
w_mkt /= w_mkt.sum()
delta = 1.85
tau = 0.05
Pi = delta * Sigma @ w_mkt

# Standard BL views
P1 = np.zeros((2, n))
Q1 = np.zeros(2)
P1[0, 1] = 1; Q1[0] = 0.095  # TCS return view
P1[1, 5] = 1; Q1[1] = 0.115  # LT return view

# Factor views: momentum factor suggests IT > others
# Express as: 0.5*TCS + 0.5*INFY - 0.33*REL - 0.33*ITC - 0.33*LT = 0.02
P2 = np.zeros((1, n))
Q2 = np.zeros(1)
P2[0] = [-0.33, 0.50, 0.0, 0.50, -0.33, -0.33]
Q2[0] = 0.02

# Combined view matrix
P = np.vstack([P1, P2])
Q = np.concatenate([Q1, Q2])
K = len(Q)

Omega = np.diag(np.diag(P @ (tau * Sigma) @ P.T))

# BL posterior
tau_Sigma_inv = np.linalg.inv(tau * Sigma)
Omega_inv = np.linalg.inv(Omega)
M = np.linalg.inv(tau_Sigma_inv + P.T @ Omega_inv @ P)
mu_BL = M @ (tau_Sigma_inv @ Pi + P.T @ Omega_inv @ Q)
Sigma_BL = M + Sigma

# Optimal weights
w_BL = np.linalg.inv(delta * Sigma_BL) @ mu_BL
w_BL_norm = w_BL / w_BL.sum()

print("=== Augmented Black-Litterman (Factor + Standard Views) ===")
print(f"\\nViews incorporated:")
print(f"  1. TCS absolute return: 16% (confidence via He-Litterman)")
print(f"  2. L&T absolute return: 18%")
print(f"  3. IT momentum factor: IT outperforms by 2%")
print(f"\\n{'Ticker':<12} {'Equil':>8} {'ABL Post':>8} {'Mkt Wt':>8} {'ABL Wt':>8}")
print("-" * 50)
for t, pi, mu, wm, wb in zip(tickers, Pi, mu_BL, w_mkt, w_BL_norm):
    print(f"{t:<12} {pi:>8.4f} {mu:>8.4f} {wm:>8.4f} {wb:>8.4f}")`}
      />

      <ExampleBlock
        title="Entropy Pooling with Volatility View"
        difficulty="advanced"
        problem="You believe Nifty 50 realized volatility will rise to 28% (from current 22%) due to upcoming state elections. Express this as an entropy pooling constraint."
        solution={[
          {
            step: 'Define the variance constraint',
            formula: '\\sum_{j=1}^{J} p_j^* (x_j^{\\text{Nifty}} - \\bar{x}^{\\text{Nifty}})^2 = (0.28)^2 = 0.0784',
            explanation: 'The view constrains the second moment of Nifty returns under the posterior.',
          },
          {
            step: 'Solve the dual problem',
            formula: '\\min_{\\lambda} \\log Z(\\lambda) - \\lambda \\times 0.0784',
            explanation: 'The dual has a single Lagrange multiplier. The posterior probabilities tilt toward scenarios with higher Nifty volatility.',
          },
          {
            step: 'Effect on other assets',
            formula: '\\text{Posterior adjusts correlations and means consistently}',
            explanation: 'Unlike BL, entropy pooling propagates the vol view to all assets through the scenario weights, preserving the dependence structure.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Entropy pooling generalizes Black-Litterman to arbitrary views on any distributional
          feature. For Indian markets, this enables views on volatility regimes (elections,
          monetary policy), tail risk (monsoon failure, geopolitical tensions), and correlation
          changes (crisis-driven correlation spikes). The framework is non-parametric and preserves
          as much of the prior information as possible while exactly satisfying the views.
        </p>
      </NoteBlock>
    </div>
  )
}
