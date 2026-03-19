import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveBayesianUpdating() {
  const [priorMean, setPriorMean] = useState(0.12)
  const [priorStd, setPriorStd] = useState(0.08)
  const [obsMean, setObsMean] = useState(0.18)
  const [obsStd, setObsStd] = useState(0.2)
  const [nObs, setNObs] = useState(24)

  const priorPrec = 1 / (priorStd * priorStd)
  const likelihoodPrec = nObs / (obsStd * obsStd)
  const postPrec = priorPrec + likelihoodPrec
  const postMean = (priorPrec * priorMean + likelihoodPrec * obsMean) / postPrec
  const postStd = Math.sqrt(1 / postPrec)

  const normalPDF = (x, mu, sigma) => {
    return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2))
  }

  const xMin = -0.2
  const xMax = 0.5
  const nPts = 200
  const step = (xMax - xMin) / nPts

  let maxY = 0
  const priorData = []
  const likData = []
  const postData = []
  for (let i = 0; i <= nPts; i++) {
    const x = xMin + i * step
    const pY = normalPDF(x, priorMean, priorStd)
    const lY = normalPDF(x, obsMean, obsStd / Math.sqrt(nObs))
    const poY = normalPDF(x, postMean, postStd)
    if (pY > maxY) maxY = pY
    if (lY > maxY) maxY = lY
    if (poY > maxY) maxY = poY
    priorData.push({ x, y: pY })
    likData.push({ x, y: lY })
    postData.push({ x, y: poY })
  }

  const chartW = 500
  const chartH = 220
  const padL = 50
  const padR = 20
  const padT = 20
  const padB = 40
  const plotW = chartW - padL - padR
  const plotH = chartH - padT - padB

  const toX = (x) => padL + ((x - xMin) / (xMax - xMin)) * plotW
  const toY = (y) => padT + plotH - (y / (maxY * 1.15)) * plotH

  const makePath = (data) => data
    .map((d, i) => `${i === 0 ? 'M' : 'L'}${toX(d.x).toFixed(2)},${toY(d.y).toFixed(2)}`)
    .join(' ')

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Bayesian Updating of Nifty Expected Return
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Start with a prior belief about Nifty 50 annual return, then update with observed data.
        Watch how the posterior (green) combines prior information with data evidence.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Prior <InlineMath math="\mu_0" /> = {(priorMean * 100).toFixed(0)}%</span>
          <input type="range" min="-0.1" max="0.3" step="0.01" value={priorMean}
            onChange={e => setPriorMean(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-blue-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Prior <InlineMath math="\sigma_0" /> = {(priorStd * 100).toFixed(0)}%</span>
          <input type="range" min="0.02" max="0.2" step="0.01" value={priorStd}
            onChange={e => setPriorStd(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-blue-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Obs mean = {(obsMean * 100).toFixed(0)}%</span>
          <input type="range" min="-0.1" max="0.4" step="0.01" value={obsMean}
            onChange={e => setObsMean(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-red-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Obs <InlineMath math="\sigma" /> = {(obsStd * 100).toFixed(0)}%</span>
          <input type="range" min="0.1" max="0.4" step="0.01" value={obsStd}
            onChange={e => setObsStd(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-red-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>n = {nObs} months</span>
          <input type="range" min="3" max="120" step="1" value={nObs}
            onChange={e => setNObs(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-green-500" />
        </label>
      </div>

      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full max-w-xl mx-auto block">
        <line x1={padL} y1={padT + plotH} x2={padL + plotW} y2={padT + plotH} stroke="#9ca3af" strokeWidth="1" />
        <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke="#9ca3af" strokeWidth="1" />

        <path d={makePath(priorData)} fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6,3" />
        <path d={makePath(likData)} fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4" />
        <path d={makePath(postData)} fill="none" stroke="#22c55e" strokeWidth="2.5" />

        {/* Legend */}
        <line x1={padL + 10} y1={padT + 10} x2={padL + 30} y2={padT + 10} stroke="#3b82f6" strokeWidth="2" strokeDasharray="6,3" />
        <text x={padL + 35} y={padT + 14} className="text-[10px]" fill="#3b82f6">Prior</text>
        <line x1={padL + 80} y1={padT + 10} x2={padL + 100} y2={padT + 10} stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4" />
        <text x={padL + 105} y={padT + 14} className="text-[10px]" fill="#ef4444">Likelihood</text>
        <line x1={padL + 170} y1={padT + 10} x2={padL + 190} y2={padT + 10} stroke="#22c55e" strokeWidth="2.5" />
        <text x={padL + 195} y={padT + 14} className="text-[10px]" fill="#22c55e">Posterior</text>

        <text x={padL + plotW / 2} y={chartH - 4} textAnchor="middle" className="text-[10px]" fill="#6b7280">
          Expected Annual Return
        </text>
      </svg>

      <div className="mt-3 grid grid-cols-3 gap-3 text-center text-sm">
        <div className="rounded bg-blue-50 p-2 dark:bg-blue-900/30">
          <div className="text-xs text-blue-600 dark:text-blue-400">Prior</div>
          <div className="font-bold text-blue-700 dark:text-blue-300">{(priorMean * 100).toFixed(1)}% +/- {(priorStd * 100).toFixed(1)}%</div>
        </div>
        <div className="rounded bg-red-50 p-2 dark:bg-red-900/30">
          <div className="text-xs text-red-600 dark:text-red-400">Data Evidence</div>
          <div className="font-bold text-red-700 dark:text-red-300">{(obsMean * 100).toFixed(1)}% (n={nObs})</div>
        </div>
        <div className="rounded bg-green-50 p-2 dark:bg-green-900/30">
          <div className="text-xs text-green-600 dark:text-green-400">Posterior</div>
          <div className="font-bold text-green-700 dark:text-green-300">{(postMean * 100).toFixed(1)}% +/- {(postStd * 100).toFixed(1)}%</div>
        </div>
      </div>
    </div>
  )
}

export default function BayesianFoundations() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Bayesian Foundations for Return Estimation
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Bayesian methods provide a principled framework for combining prior knowledge
        (e.g., long-run equity premium estimates for India) with observed data (e.g.,
        recent Nifty 50 returns). Unlike frequentist approaches, Bayesian inference
        directly quantifies uncertainty about parameters through posterior distributions.
      </p>

      {/* --- Bayes Theorem --- */}
      <TheoremBlock
        title="Bayes' Theorem"
        label="Theorem 3.1"
        statement={<>
          For a parameter <InlineMath math="\theta" /> (e.g., expected return) and
          observed data <InlineMath math="D" /> (e.g., historical returns):
          <BlockMath math="p(\theta \mid D) = \frac{p(D \mid \theta) \cdot p(\theta)}{p(D)} \propto p(D \mid \theta) \cdot p(\theta)" />
          where <InlineMath math="p(\theta)" /> is the <strong>prior</strong> distribution
          encoding beliefs before seeing data, <InlineMath math="p(D \mid \theta)" /> is the{' '}
          <strong>likelihood</strong> of the data given the parameter, and{' '}
          <InlineMath math="p(\theta \mid D)" /> is the <strong>posterior</strong> distribution
          representing updated beliefs.
        </>}
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        In words: <em>Posterior</em> is proportional to <em>Likelihood</em> times{' '}
        <em>Prior</em>. The denominator <InlineMath math="p(D)" /> is a normalizing
        constant (the "evidence" or "marginal likelihood") that ensures the posterior
        integrates to 1.
      </p>

      {/* --- Conjugate Priors --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Conjugate Priors in Finance
      </h3>

      <DefinitionBlock
        title="Conjugate Prior"
        label="Definition 3.1"
        definition={<>
          A prior distribution <InlineMath math="p(\theta)" /> is said to be{' '}
          <strong>conjugate</strong> to a likelihood <InlineMath math="p(D \mid \theta)" />{' '}
          if the posterior <InlineMath math="p(\theta \mid D)" /> belongs to the same
          distributional family as the prior. Conjugate priors allow closed-form posterior
          computation without numerical integration or MCMC.
        </>}
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The most important conjugate pair for return estimation is the Normal-Normal model.
        If the prior on mean return <InlineMath math="\mu" /> is{' '}
        <InlineMath math="\mu \sim N(\mu_0, \sigma_0^2)" /> and the likelihood (data) is{' '}
        <InlineMath math="r_i \mid \mu \sim N(\mu, \sigma^2)" /> with known variance, then
        the posterior is:
      </p>

      <BlockMath math="\mu \mid \mathbf{r} \sim N\!\left(\frac{\sigma^{-2} n \bar{r} + \sigma_0^{-2} \mu_0}{\sigma^{-2} n + \sigma_0^{-2}}, \quad \frac{1}{\sigma^{-2} n + \sigma_0^{-2}}\right)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        This is a precision-weighted average of the prior mean and the data mean. The
        posterior mean is pulled toward whichever has higher precision (lower uncertainty).
        With more data (larger <InlineMath math="n" />), the data dominates and the
        posterior converges to the MLE.
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Likelihood</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Conjugate Prior</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Posterior</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Financial Use Case</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Normal (known <InlineMath math="\sigma" />)</td>
              <td className="px-4 py-2">Normal</td>
              <td className="px-4 py-2">Normal</td>
              <td className="px-4 py-2">Estimating Nifty expected return</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Normal (unknown <InlineMath math="\sigma" />)</td>
              <td className="px-4 py-2">Normal-Inv-Gamma</td>
              <td className="px-4 py-2">Normal-Inv-Gamma</td>
              <td className="px-4 py-2">Joint return-volatility estimation</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Bernoulli</td>
              <td className="px-4 py-2">Beta</td>
              <td className="px-4 py-2">Beta</td>
              <td className="px-4 py-2">Strategy win rate estimation</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Poisson</td>
              <td className="px-4 py-2">Gamma</td>
              <td className="px-4 py-2">Gamma</td>
              <td className="px-4 py-2">Counting extreme events on NSE</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- Interactive Bayesian Updating --- */}
      <InteractiveBayesianUpdating />

      {/* --- Black-Litterman Connection --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Black-Litterman: Bayesian Portfolio Construction
      </h3>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The Black-Litterman model is the most important application of Bayesian thinking in
        portfolio management. It starts with equilibrium expected returns (derived from
        market-cap weights of Nifty 50 stocks) as the prior, then incorporates the
        portfolio manager's views as data:
      </p>

      <BlockMath math="\boldsymbol{\mu}_{\text{BL}} = [(\tau \Sigma)^{-1} + P^\top \Omega^{-1} P]^{-1} [(\tau \Sigma)^{-1} \boldsymbol{\pi} + P^\top \Omega^{-1} \mathbf{q}]" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\boldsymbol{\pi}" /> is the vector of implied equilibrium
        returns (prior), <InlineMath math="P" /> is the view matrix, <InlineMath math="\mathbf{q}" />{' '}
        is the view vector, <InlineMath math="\Omega" /> captures view uncertainty, and{' '}
        <InlineMath math="\tau" /> scales the prior uncertainty.
      </p>

      <NoteBlock title="Indian Context: Equilibrium Returns" type="info">
        <p>
          For Nifty 50 stocks, the equilibrium returns <InlineMath math="\boldsymbol{\pi}" />{' '}
          are implied by reverse-optimizing the Markowitz model using current market-cap weights
          and an estimate of the covariance matrix. With the risk aversion parameter typically
          set to <InlineMath math="\lambda = 2.5" /> and the market excess return around 6--8%
          above the RBI T-bill rate, the implied return for Reliance is approximately 11--13%
          and for HDFC Bank approximately 10--12%.
        </p>
      </NoteBlock>

      {/* --- Bayesian Strategy Evaluation --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Bayesian Strategy Evaluation
      </h3>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Instead of simply asking "is alpha nonzero?" (a frequentist question), Bayesian
        analysis asks "what is the probability that alpha exceeds a meaningful threshold?"
        For a Nifty-based strategy, we might compute:
      </p>

      <BlockMath math="P(\alpha > 2\% \mid \text{data}) = \int_{0.02}^{\infty} p(\alpha \mid \mathbf{r}) \, d\alpha" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        This directly answers the practical question. With a Normal posterior{' '}
        <InlineMath math="\alpha \mid \mathbf{r} \sim N(\hat{\alpha}, \hat{\sigma}^2_\alpha)" />,
        this reduces to:
      </p>

      <BlockMath math="P(\alpha > 2\% \mid \text{data}) = 1 - \Phi\!\left(\frac{0.02 - \hat{\alpha}}{\hat{\sigma}_\alpha}\right)" />

      {/* --- Bayesian Win Rate --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Bayesian Win Rate Estimation
      </h3>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For an intraday strategy on Bank Nifty, the win rate (fraction of profitable trades)
        is a key metric. Rather than using the point estimate <InlineMath math="\hat{p} = k/n" />,
        we can compute the full posterior using the Beta-Binomial conjugate model:
      </p>

      <BlockMath math="p \mid k, n \sim \text{Beta}(\alpha_0 + k, \beta_0 + n - k)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        With a non-informative prior <InlineMath math="\text{Beta}(1, 1)" /> (uniform on [0,1])
        and <InlineMath math="k = 58" /> wins out of <InlineMath math="n = 100" /> trades:
      </p>

      <BlockMath math="p \mid \text{data} \sim \text{Beta}(59, 43)" />

      <BlockMath math="E[p] = \frac{59}{102} = 0.578, \quad \text{95\% CI} = [0.478, 0.674]" />

      {/* --- Python Code --- */}
      <PythonCode
        title="bayesian_returns.py"
        runnable
        code={`import numpy as np
from scipy import stats

np.random.seed(42)

# --- Bayesian Estimation of Nifty Expected Return ---
# Prior: Long-run Indian equity premium ~ 8% over risk-free
# Risk-free (RBI T-bill) ~ 6.5%, so expected return ~ 14.5%
prior_mean = 0.145     # 14.5% annual
prior_std = 0.06       # Uncertainty: +/- 6%

# Data: Observed Nifty 50 monthly returns (5 years)
n_months = 60
obs_annual_vol = 0.18
obs_monthly_vol = obs_annual_vol / np.sqrt(12)
# Simulated monthly returns (true mean = 12% annualized)
monthly_returns = np.random.normal(0.12/12, obs_monthly_vol, n_months)
obs_mean_monthly = np.mean(monthly_returns)
obs_mean_annual = obs_mean_monthly * 12

print("=== Bayesian Return Estimation for Nifty 50 ===")
print(f"Prior: N({prior_mean*100:.1f}%, {prior_std*100:.1f}%)")
print(f"Data:  {n_months} months, sample mean = {obs_mean_annual*100:.2f}% ann.")
print()

# Posterior (Normal-Normal conjugate)
prior_prec = 1 / prior_std**2
data_se = obs_annual_vol / np.sqrt(n_months / 12)  # SE of annual mean
data_prec = 1 / data_se**2
post_prec = prior_prec + data_prec
post_mean = (prior_prec * prior_mean + data_prec * obs_mean_annual) / post_prec
post_std = np.sqrt(1 / post_prec)

print(f"Posterior: N({post_mean*100:.2f}%, {post_std*100:.2f}%)")
print(f"Shrinkage toward prior: {(prior_prec/post_prec)*100:.1f}%")
print(f"Data weight:            {(data_prec/post_prec)*100:.1f}%")
print()

# Probability return exceeds risk-free rate
rf = 0.065
prob_positive_premium = 1 - stats.norm.cdf(rf, post_mean, post_std)
print(f"P(return > {rf*100}% RBI rate | data) = {prob_positive_premium:.4f}")

# Probability return exceeds 10%
prob_10 = 1 - stats.norm.cdf(0.10, post_mean, post_std)
print(f"P(return > 10% | data) = {prob_10:.4f}")
print()

# --- Bayesian Win Rate for Bank Nifty Scalping ---
print("=== Bayesian Win Rate (Bank Nifty Scalping) ===")
wins = 58
total = 100
alpha_post = 1 + wins      # Beta prior (1,1) + data
beta_post = 1 + total - wins

posterior_win = stats.beta(alpha_post, beta_post)
print(f"Trades: {total}, Wins: {wins}")
print(f"MLE win rate:       {wins/total:.3f}")
print(f"Posterior mean:     {posterior_win.mean():.3f}")
print(f"Posterior median:   {posterior_win.median():.3f}")
print(f"95% Credible Int:   [{posterior_win.ppf(0.025):.3f}, {posterior_win.ppf(0.975):.3f}]")
print(f"P(win rate > 55%):  {1 - posterior_win.cdf(0.55):.4f}")
print(f"P(win rate > 60%):  {1 - posterior_win.cdf(0.60):.4f}")
print()

# --- Bayesian Sharpe Ratio ---
print("=== Bayesian Sharpe Ratio (via posterior simulation) ===")
n_sim = 50000
# Draw from posterior of mu
mu_draws = np.random.normal(post_mean, post_std, n_sim)
# Assume sigma known at observed value
sharpe_draws = (mu_draws - rf) / obs_annual_vol
sharpe_ci = np.percentile(sharpe_draws, [2.5, 97.5])
print(f"Posterior mean Sharpe: {np.mean(sharpe_draws):.3f}")
print(f"95% Credible Interval: [{sharpe_ci[0]:.3f}, {sharpe_ci[1]:.3f}]")
print(f"P(Sharpe > 0.5):       {np.mean(sharpe_draws > 0.5):.4f}")
print(f"P(Sharpe > 1.0):       {np.mean(sharpe_draws > 1.0):.4f}")`}
      />

      {/* --- Worked Example --- */}
      <ExampleBlock
        title="Bayesian Estimation of Reliance Expected Return"
        difficulty="intermediate"
        problem="Your prior for Reliance Industries' annual return is N(13%, 5%). You observe 36 months of returns with a sample mean of 18% annualized and known volatility of 25%. Compute the posterior mean and 95% credible interval."
        solution={[
          {
            step: 'Compute precisions',
            formula: '\\tau_0 = 1/0.05^2 = 400, \\quad \\tau_{\\text{data}} = 1/(0.25/\\sqrt{3})^2 = 1/(0.1443)^2 = 48',
            explanation: 'Prior precision is 400 (very confident prior). Data precision for annual mean with 3 years of data: SE = 0.25/sqrt(3) = 0.1443.',
          },
          {
            step: 'Compute posterior parameters',
            formula: '\\mu_1 = \\frac{400 \\times 0.13 + 48 \\times 0.18}{400 + 48} = \\frac{52 + 8.64}{448} = 0.1353',
            explanation: 'The posterior mean (13.53%) is pulled slightly toward the prior (13%) because the prior is much more precise than the data.',
          },
          {
            step: 'Compute posterior standard deviation',
            formula: '\\sigma_1 = \\sqrt{1/448} = 0.0473 \\approx 4.7\\%',
          },
          {
            step: '95% credible interval',
            formula: '0.1353 \\pm 1.96 \\times 0.0473 = [4.2\\%, 22.8\\%]',
            explanation: 'With only 3 years of data, considerable uncertainty remains about the true expected return.',
          },
        ]}
      />

      {/* --- MCMC and Modern Methods --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Beyond Conjugacy: MCMC Methods
      </h3>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        When the model is not conjugate (e.g., regime-switching models for Indian markets,
        stochastic volatility models), we use Markov Chain Monte Carlo (MCMC) methods. The
        most common are:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Method</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Key Idea</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Python Library</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Metropolis-Hastings</td>
              <td className="px-4 py-2">Accept/reject proposals based on posterior ratio</td>
              <td className="px-4 py-2">PyMC, emcee</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Gibbs Sampling</td>
              <td className="px-4 py-2">Sample each parameter conditionally</td>
              <td className="px-4 py-2">PyMC</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Hamiltonian MC (HMC)</td>
              <td className="px-4 py-2">Use gradient information for efficient proposals</td>
              <td className="px-4 py-2">PyMC (NUTS), NumPyro</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Variational Inference</td>
              <td className="px-4 py-2">Approximate posterior with simpler distribution</td>
              <td className="px-4 py-2">PyMC, TensorFlow Probability</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For a regime-switching model of the Nifty 50 with two states (bull and bear), the
        parameters include transition probabilities, regime-specific means, and volatilities.
        MCMC draws from the joint posterior of all these parameters simultaneously, providing
        full uncertainty quantification.
      </p>

      {/* --- Key Takeaway --- */}
      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Bayesian methods are particularly valuable in Indian market research because (1) we
          have relatively short histories for many stocks and instruments, making priors
          important; (2) the equity premium is uncertain and worth shrinking toward economic
          priors; and (3) Bayesian credible intervals directly answer practical questions like
          "what is the probability my strategy's Sharpe exceeds 0.5?" The Black-Litterman
          framework is the gold standard for combining equilibrium views with active insights
          in Nifty 50 portfolio construction.
        </p>
      </NoteBlock>
    </div>
  )
}
