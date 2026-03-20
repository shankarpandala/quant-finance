import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveEstimationError() {
  const [nSamples, setNSamples] = useState(252)
  const [nAssets, setNAssets] = useState(10)
  const [shrinkageAlpha, setShrinkageAlpha] = useState(0.5)
  const [nResample, setNResample] = useState(100)

  const ratio = nSamples / nAssets
  const conditionWarning = ratio < 2
  const eigenSpread = Math.max(0.1, 3.0 - ratio * 0.5).toFixed(2)
  const shrinkageVol = (0.22 * (1 - shrinkageAlpha) + 0.18 * shrinkageAlpha).toFixed(3)
  const resampleStd = (0.15 / Math.sqrt(nResample)).toFixed(4)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Estimation Error Diagnostics
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Explore how sample size, number of assets, and shrinkage affect estimation quality.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Sample Days (T): {nSamples}</span>
          <input type="range" min="50" max="1000" step="10" value={nSamples}
            onChange={e => setNSamples(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Assets (N): {nAssets}</span>
          <input type="range" min="2" max="50" step="1" value={nAssets}
            onChange={e => setNAssets(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Shrinkage <InlineMath math="\alpha" />: {shrinkageAlpha.toFixed(2)}</span>
          <input type="range" min="0" max="1" step="0.01" value={shrinkageAlpha}
            onChange={e => setShrinkageAlpha(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Resample Draws: {nResample}</span>
          <input type="range" min="10" max="500" step="10" value={nResample}
            onChange={e => setNResample(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 text-center text-xs">
        <div className={`rounded-lg p-3 ${conditionWarning ? 'bg-red-50 dark:bg-red-900/30' : 'bg-green-50 dark:bg-green-900/30'}`}>
          <div className="text-gray-500 dark:text-gray-400">T/N Ratio</div>
          <div className={`text-lg font-bold ${conditionWarning ? 'text-red-600' : 'text-green-600'}`}>{ratio.toFixed(1)}</div>
          <div className="text-[10px]">{conditionWarning ? 'Ill-conditioned!' : 'Acceptable'}</div>
        </div>
        <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30">
          <div className="text-gray-500 dark:text-gray-400">Eigenvalue Spread</div>
          <div className="text-lg font-bold text-indigo-600">{eigenSpread}</div>
          <div className="text-[10px]">Condition number proxy</div>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30">
          <div className="text-gray-500 dark:text-gray-400">Shrunk Vol</div>
          <div className="text-lg font-bold text-amber-600">{shrinkageVol}</div>
          <div className="text-[10px]">Blended estimate</div>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
          <div className="text-gray-500 dark:text-gray-400">Resample Std</div>
          <div className="text-lg font-bold text-purple-600">{resampleStd}</div>
          <div className="text-[10px]">Weight stability</div>
        </div>
      </div>
    </div>
  )
}

export default function EstimationError() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Estimation Error and Michaud Resampling
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The elegant mathematics of Markowitz optimization hides a critical practical problem:
        the inputs -- expected returns <InlineMath math="\boldsymbol{\mu}" /> and the covariance
        matrix <InlineMath math="\Sigma" /> -- must be estimated from historical data. Small
        estimation errors in these inputs can produce wildly different optimal portfolios. This
        is especially problematic for Indian markets, where regime changes (demonetization 2016,
        COVID 2020, IL&FS crisis 2018) cause structural breaks in return distributions.
      </p>

      <DefinitionBlock
        title="Estimation Error"
        label="Definition 9.2"
        definition="Estimation error in portfolio optimization refers to the deviation between sample estimates (μ̂, Σ̂) computed from T observations and the true population parameters (μ, Σ). The optimizer treats estimates as truth, amplifying errors by concentrating weights in assets with overestimated returns and underestimated risk."
        notation="μ̂ = sample mean return, Σ̂ = sample covariance, T = number of observations"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Why Markowitz is an &ldquo;Error Maximizer&rdquo;
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Michaud (1989) famously called mean-variance optimization an &ldquo;error maximizer.&rdquo;
        The optimizer systematically overweights assets with large positive estimation errors in
        expected returns and underweights those with negative errors. Consider the standard errors:
      </p>

      <BlockMath math="\text{SE}(\hat{\mu}_i) = \frac{\hat{\sigma}_i}{\sqrt{T}}, \quad \text{SE}(\hat{\sigma}_{ij}) = \frac{\hat{\sigma}_{ii}\hat{\sigma}_{jj} + \hat{\sigma}_{ij}^2}{T-1}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For a typical Nifty 50 stock with 20% annualized volatility and 5 years of daily data
        (<InlineMath math="T = 1260" />), the standard error of the mean return estimate is:
      </p>

      <BlockMath math="\text{SE}(\hat{\mu}) = \frac{0.20}{\sqrt{1260}} \approx 0.56\%" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        This means we cannot distinguish between a stock with 10% and 11% expected return even
        with 5 years of data. Yet the optimizer will aggressively tilt toward the 11% estimate.
      </p>

      <TheoremBlock
        title="Bound on Portfolio Weight Error"
        label="Theorem 9.2"
        statement="For the unconstrained Markowitz portfolio, the estimation error in optimal weights is bounded by: ||ŵ* - w*|| ≤ ||Σ⁻¹|| · (||Δμ|| + ||ΔΣ|| · ||w*||), where Δμ = μ̂ - μ and ΔΣ = Σ̂ - Σ."
        proof="This follows from perturbation analysis of the KKT conditions. The optimal weights w* = Σ⁻¹μ / (1'Σ⁻¹μ) are differentiable in (μ, Σ), and the sensitivity scales with the condition number of Σ."
      />

      <InteractiveEstimationError />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Shrinkage Estimators
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Ledoit and Wolf (2004) proposed shrinking the sample covariance toward a structured
        target to reduce estimation error. The shrinkage estimator is:
      </p>

      <BlockMath math="\hat{\Sigma}_{\text{shrunk}} = \alpha \mathbf{F} + (1 - \alpha) \hat{\Sigma}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\mathbf{F}" /> is the shrinkage target (e.g., constant correlation model
        or single-factor model) and <InlineMath math="\alpha \in [0,1]" /> is the optimal shrinkage
        intensity determined analytically:
      </p>

      <BlockMath math="\alpha^* = \frac{\sum_{i,j} \text{Var}(\hat{\sigma}_{ij})}{\sum_{i,j} (\hat{\sigma}_{ij} - f_{ij})^2 + \sum_{i,j} \text{Var}(\hat{\sigma}_{ij})}" />

      <PythonCode
        title="ledoit_wolf_nifty.py"
        runnable
        code={`import numpy as np
from sklearn.covariance import LedoitWolf

# Simulated daily returns for 10 Nifty 50 stocks (252 trading days)
np.random.seed(42)
n_assets = 10
n_days = 252
tickers = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ITC',
           'LT', 'AXISBANK', 'HINDUNILVR', 'SBIN', 'BHARTIARTL']

# Generate correlated returns
true_cov = np.eye(n_assets) * 0.04
for i in range(n_assets):
    for j in range(i+1, n_assets):
        true_cov[i, j] = true_cov[j, i] = 0.01 * np.random.uniform(0.3, 0.8)

returns = np.random.multivariate_normal(np.zeros(n_assets), true_cov / 252, n_days)

# Sample covariance
sample_cov = np.cov(returns.T) * 252

# Ledoit-Wolf shrinkage
lw = LedoitWolf().fit(returns)
lw_cov = lw.covariance_ * 252
shrinkage_intensity = lw.shrinkage_

print("=== Covariance Estimation for Nifty 50 Stocks ===")
print(f"Sample size: {n_days} days, Assets: {n_assets}")
print(f"T/N ratio: {n_days/n_assets:.1f}")
print(f"\\nShrinkage intensity (alpha): {shrinkage_intensity:.4f}")
print(f"\\nSample Cov condition number: {np.linalg.cond(sample_cov):.1f}")
print(f"Shrunk Cov condition number:  {np.linalg.cond(lw_cov):.1f}")
print(f"\\nSample Cov diagonal (annualized vols):")
for t, v in zip(tickers, np.sqrt(np.diag(sample_cov))):
    print(f"  {t:12s}: {v:.4f} ({v:.2%})")
print(f"\\nLW Shrunk Cov diagonal (annualized vols):")
for t, v in zip(tickers, np.sqrt(np.diag(lw_cov))):
    print(f"  {t:12s}: {v:.4f} ({v:.2%})")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Michaud Resampled Efficiency
      </h3>

      <DefinitionBlock
        title="Resampled Efficient Frontier"
        label="Definition 9.3"
        definition="The Michaud resampled efficient frontier generates multiple efficient frontiers from bootstrapped return samples, each drawn from the estimated distribution (μ̂, Σ̂). The final portfolio weights are the average of optimal weights across all resampled frontiers, producing more stable allocations that account for estimation uncertainty."
        notation="B = number of bootstrap draws, w̄ = (1/B)Σᵦ w*ᵦ"
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The resampling procedure is:
      </p>
      <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4">
        <li>Estimate <InlineMath math="\hat{\mu}" /> and <InlineMath math="\hat{\Sigma}" /> from historical data</li>
        <li>For <InlineMath math="b = 1, \ldots, B" />: draw <InlineMath math="\mu^{(b)} \sim \mathcal{N}(\hat{\mu}, \hat{\Sigma}/T)" /> and <InlineMath math="\Sigma^{(b)} \sim \text{Wishart}" /></li>
        <li>Solve Markowitz optimization with <InlineMath math="(\mu^{(b)}, \Sigma^{(b)})" /> to get <InlineMath math="w^{*(b)}" /></li>
        <li>Average: <InlineMath math="\bar{w} = \frac{1}{B}\sum_{b=1}^{B} w^{*(b)}" /></li>
      </ol>

      <PythonCode
        title="michaud_resampling_nse.py"
        runnable
        code={`import numpy as np
import cvxpy as cp

np.random.seed(42)
n_assets = 8
T = 252
B = 200  # number of bootstrap samples

tickers = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ITC', 'LT', 'AXISBANK', 'HINDUNILVR']
mu_hat = np.array([0.15, 0.13, 0.12, 0.14, 0.10, 0.16, 0.18, 0.11])

raw = np.random.randn(n_assets, n_assets) * 0.01
Sigma_hat = raw @ raw.T + np.diag([0.04, 0.035, 0.03, 0.038, 0.025, 0.045, 0.055, 0.028])

target_ret = 0.14
resampled_weights = []

for b in range(B):
    # Draw resampled parameters
    mu_b = np.random.multivariate_normal(mu_hat, Sigma_hat / T)
    # Use Wishart-like perturbation for covariance
    X_b = np.random.multivariate_normal(np.zeros(n_assets), Sigma_hat, T)
    Sigma_b = np.cov(X_b.T)

    # Solve MVO
    w = cp.Variable(n_assets)
    prob = cp.Problem(
        cp.Minimize(cp.quad_form(w, Sigma_b)),
        [cp.sum(w) == 1, mu_b @ w == target_ret, w >= 0]
    )
    try:
        prob.solve(solver=cp.SCS, verbose=False, max_iters=5000)
        if prob.status == 'optimal' and w.value is not None:
            resampled_weights.append(w.value)
    except:
        pass

resampled_weights = np.array(resampled_weights)
avg_weights = resampled_weights.mean(axis=0)
std_weights = resampled_weights.std(axis=0)

print("=== Michaud Resampled Portfolio (NSE Stocks) ===")
print(f"Bootstrap samples: {B}, Successful: {len(resampled_weights)}")
print(f"Target return: {target_ret:.2%}")
print(f"\\nResampled Weights (mean +/- std):")
for t, m, s in zip(tickers, avg_weights, std_weights):
    print(f"  {t:12s}: {m:.4f} +/- {s:.4f}")
print(f"\\nExpected return: {mu_hat @ avg_weights:.4f}")
print(f"Expected vol:    {np.sqrt(avg_weights @ Sigma_hat @ avg_weights):.4f}")`}
      />

      <ExampleBlock
        title="Impact of Estimation Error on an Indian Portfolio"
        difficulty="intermediate"
        problem="A fund manager uses 2 years of daily data (T=504) to optimize a portfolio of N=20 Nifty stocks. The sample mean return for HDFC Bank is $\\hat{\\mu} = 12\\%$ with volatility $\\hat{\\sigma} = 18\\%$. What is the 95% confidence interval for the true expected return?"
        solution={[
          {
            step: 'Compute the standard error of mean return',
            formula: '\\text{SE}(\\hat{\\mu}) = \\frac{\\hat{\\sigma}}{\\sqrt{T}} = \\frac{0.18}{\\sqrt{504}} = 0.00802',
            explanation: 'The standard error decreases with the square root of the sample size.',
          },
          {
            step: 'Compute 95% confidence interval',
            formula: '\\hat{\\mu} \\pm 1.96 \\times \\text{SE} = 0.12 \\pm 1.96 \\times 0.00802 = [0.1043, 0.1357]',
            explanation: 'The true return could be anywhere from 10.4% to 13.6%. The optimizer cannot meaningfully distinguish this from a stock with 11% or 13% expected return.',
          },
          {
            step: 'Assess T/N ratio',
            formula: 'T/N = 504/20 = 25.2',
            explanation: 'A ratio above 10 is generally acceptable, but the covariance matrix still has N(N+1)/2 = 210 parameters to estimate, making shrinkage advisable.',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        James-Stein Shrinkage for Returns
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        While Ledoit-Wolf addresses covariance estimation, we also need to shrink expected returns.
        The James-Stein estimator shrinks sample means toward a common value:
      </p>

      <BlockMath math="\hat{\mu}_{\text{JS}} = \left(1 - \frac{(N-2)\sigma^2/T}{\|\hat{\mu} - \bar{\mu}\mathbf{1}\|^2}\right)(\hat{\mu} - \bar{\mu}\mathbf{1}) + \bar{\mu}\mathbf{1}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\bar{\mu}" /> is the grand mean of all estimated returns. This
        estimator dominates the sample mean in terms of total squared error when <InlineMath math="N \geq 3" />.
      </p>

      <NoteBlock title="Practical Advice for Indian Markets" type="warning">
        <p>
          Estimation error is particularly severe in Indian mid-cap and small-cap stocks due to
          lower liquidity, thinner analyst coverage, and occasional circuit-breaker halts.
          Recommendations:
        </p>
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>Use at least 3-5 years of data for Nifty 50 stocks, 5-7 years for broader indices</li>
          <li>Always apply Ledoit-Wolf shrinkage when N/T &gt; 0.1</li>
          <li>Consider Michaud resampling with B &geq; 200 for robust weight estimates</li>
          <li>Bayesian approaches (Black-Litterman) are often preferable to pure sample-based MVO</li>
          <li>Validate out-of-sample using walk-forward analysis on NSE data</li>
        </ul>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Estimation error is the Achilles&rsquo; heel of mean-variance optimization. Shrinkage
          estimators and Michaud resampling provide practical remedies that are essential for
          deploying Markowitz in Indian equity portfolios. The next section addresses another
          important dimension: incorporating real-world constraints like SEBI regulations and
          transaction costs.
        </p>
      </NoteBlock>
    </div>
  )
}
