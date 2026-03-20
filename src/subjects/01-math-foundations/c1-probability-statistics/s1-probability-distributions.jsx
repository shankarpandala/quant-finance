import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveDistribution() {
  const [mu, setMu] = useState(0.12)
  const [sigma, setSigma] = useState(0.18)
  const [distType, setDistType] = useState('normal')

  const normalPDF = (x) => {
    const coeff = 1 / (sigma * Math.sqrt(2 * Math.PI))
    const exponent = -0.5 * Math.pow((x - mu) / sigma, 2)
    return coeff * Math.exp(exponent)
  }

  const lognormalPDF = (x) => {
    if (x <= 0) return 0
    const coeff = 1 / (x * sigma * Math.sqrt(2 * Math.PI))
    const exponent = -0.5 * Math.pow((Math.log(x) - mu) / sigma, 2)
    return coeff * Math.exp(exponent)
  }

  const points = 200
  const xMin = distType === 'normal' ? mu - 4 * sigma : 0.01
  const xMax = distType === 'normal' ? mu + 4 * sigma : Math.exp(mu + 3 * sigma)
  const step = (xMax - xMin) / points

  let maxY = 0
  const data = []
  for (let i = 0; i <= points; i++) {
    const x = xMin + i * step
    const y = distType === 'normal' ? normalPDF(x) : lognormalPDF(x)
    if (y > maxY) maxY = y
    data.push({ x, y })
  }

  const chartW = 500
  const chartH = 220
  const padL = 50
  const padR = 20
  const padT = 20
  const padB = 40
  const plotW = chartW - padL - padR
  const plotH = chartH - padT - padB

  const toSVGX = (x) => padL + ((x - xMin) / (xMax - xMin)) * plotW
  const toSVGY = (y) => padT + plotH - (y / (maxY * 1.1)) * plotH

  const pathD = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'}${toSVGX(d.x).toFixed(2)},${toSVGY(d.y).toFixed(2)}`)
    .join(' ')

  const prob1Sigma = distType === 'normal' ? 0.6827 : null
  const prob2Sigma = distType === 'normal' ? 0.9545 : null

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Probability Distributions for Nifty 50 Returns
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust the mean annual return <InlineMath math="\mu" /> and volatility{' '}
        <InlineMath math="\sigma" /> to model Nifty 50 return distributions. Toggle between
        Normal (log returns) and Log-Normal (price levels).
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math={`\\mu`} /> = {(mu * 100).toFixed(1)}%</span>
          <input
            type="range" min="-0.3" max="0.5" step="0.01" value={mu}
            onChange={e => setMu(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math={`\\sigma`} /> = {(sigma * 100).toFixed(1)}%</span>
          <input
            type="range" min="0.05" max="0.5" step="0.01" value={sigma}
            onChange={e => setSigma(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Distribution</span>
          <select
            value={distType}
            onChange={e => setDistType(e.target.value)}
            className="rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
          >
            <option value="normal">Normal (Log Returns)</option>
            <option value="lognormal">Log-Normal (Price Levels)</option>
          </select>
        </label>
      </div>

      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full max-w-xl mx-auto block">
        {/* Axes */}
        <line x1={padL} y1={padT + plotH} x2={padL + plotW} y2={padT + plotH} stroke="#9ca3af" strokeWidth="1" />
        <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke="#9ca3af" strokeWidth="1" />

        {/* PDF curve */}
        <path d={pathD} fill="none" stroke="#6366f1" strokeWidth="2.5" />

        {/* Fill area */}
        <path
          d={`${pathD} L${toSVGX(data[data.length - 1].x).toFixed(2)},${toSVGY(0).toFixed(2)} L${toSVGX(data[0].x).toFixed(2)},${toSVGY(0).toFixed(2)} Z`}
          fill="#6366f1" opacity="0.12"
        />

        {/* Mean line */}
        <line x1={toSVGX(mu)} y1={padT} x2={toSVGX(mu)} y2={padT + plotH} stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,3" />
        <text x={toSVGX(mu)} y={padT - 4} textAnchor="middle" className="text-[10px]" fill="#ef4444">mean</text>

        {/* X-axis label */}
        <text x={padL + plotW / 2} y={chartH - 4} textAnchor="middle" className="text-[10px]" fill="#6b7280">
          {distType === 'normal' ? 'Log Return' : 'Price Level'}
        </text>
        <text x={14} y={padT + plotH / 2} textAnchor="middle" className="text-[10px]" fill="#6b7280"
          transform={`rotate(-90, 14, ${padT + plotH / 2})`}>PDF</text>
      </svg>

      <div className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
        {distType === 'normal' ? (
          <p>
            <InlineMath math={`P(\\mu - \\sigma < r < \\mu + \\sigma) \\approx 68.3\\%`} />{' '}
            -- about two-thirds of annual Nifty returns fall within one standard deviation.
          </p>
        ) : (
          <p>
            The log-normal distribution is right-skewed: prices can rise without bound but
            cannot fall below zero. Mean price ={' '}
            <InlineMath math={`e^{\\mu + \\sigma^2/2} = ${Math.exp(mu + sigma * sigma / 2).toFixed(3)}`} />.
          </p>
        )}
      </div>
    </div>
  )
}

export default function ProbabilityDistributions() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Probability Distributions for Financial Returns
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Every quantitative trading strategy rests on assumptions about the statistical
        properties of financial returns. In the Indian equity market, understanding the
        distribution of Nifty 50 and Bank Nifty returns is essential for risk management,
        option pricing, and portfolio construction. This section builds the mathematical
        foundations from discrete to continuous distributions.
      </p>

      {/* --- Discrete Distributions --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Discrete Distributions in Finance
      </h3>

      <DefinitionBlock
        title="Bernoulli and Binomial Distributions"
        label="Definition 1.1"
        definition="A Bernoulli trial models a single binary outcome (e.g., a stock goes up or down). If X ~ Bernoulli(p), then P(X=1)=p and P(X=0)=1-p. The Binomial distribution B(n,p) counts successes in n independent Bernoulli trials."
        notation={<>
          <InlineMath math="P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}" /> for <InlineMath math="k = 0, 1, \ldots, n" />
        </>}
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Consider the daily up/down movement of Reliance Industries on the NSE. If we assume
        a 52% probability of an up day (a common empirical estimate for large-cap Indian stocks),
        the number of up days in a month (22 trading days) follows{' '}
        <InlineMath math="X \sim B(22, 0.52)" />.
      </p>

      <BlockMath math="E[X] = np = 22 \times 0.52 = 11.44, \quad \text{Var}(X) = np(1-p) = 22 \times 0.52 \times 0.48 = 5.49" />

      <DefinitionBlock
        title="Poisson Distribution"
        label="Definition 1.2"
        definition="The Poisson distribution models the count of rare events in a fixed interval. In finance, it is used for modeling the number of large moves (crashes/rallies), corporate actions, or trade arrivals."
        notation={<InlineMath math="P(X = k) = \frac{\lambda^k e^{-\lambda}}{k!}, \quad k = 0, 1, 2, \ldots" />}
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        On average, the Nifty 50 experiences about <InlineMath math="\lambda = 3.5" /> days per
        month with absolute returns exceeding 2%. We can model these extreme days as{' '}
        <InlineMath math="X \sim \text{Poisson}(3.5)" />, giving:
      </p>

      <BlockMath math="P(X = 0) = e^{-3.5} \approx 0.030, \quad P(X \geq 5) = 1 - \sum_{k=0}^{4} \frac{3.5^k e^{-3.5}}{k!} \approx 0.275" />

      {/* --- Continuous Distributions --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Continuous Distributions: The Normal Model
      </h3>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The cornerstone of quantitative finance is the assumption that log returns are
        approximately normally distributed. If the log return{' '}
        <InlineMath math="r_t = \ln(P_t / P_{t-1})" /> follows a normal distribution, then
        prices follow a log-normal distribution.
      </p>

      <TheoremBlock
        title="Central Limit Theorem (CLT)"
        label="Theorem 1.1"
        statement={<>
          Let <InlineMath math="X_1, X_2, \ldots, X_n" /> be i.i.d. random variables with
          mean <InlineMath math="\mu" /> and finite variance <InlineMath math="\sigma^2" />.
          Then the standardized sample mean converges in distribution to a standard normal:
          <BlockMath math="\frac{\bar{X}_n - \mu}{\sigma / \sqrt{n}} \xrightarrow{d} N(0, 1) \quad \text{as } n \to \infty" />
          This justifies using the normal distribution for aggregated returns over longer horizons,
          even if daily returns are non-normal.
        </>}
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The probability density function of the normal distribution is:
      </p>

      <BlockMath math="f(x; \mu, \sigma) = \frac{1}{\sigma\sqrt{2\pi}} \exp\!\left(-\frac{(x - \mu)^2}{2\sigma^2}\right)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For the Nifty 50, historical daily log returns from 2010--2024 show an annualized mean
        of approximately <InlineMath math="\mu \approx 12\%" /> and annualized volatility of{' '}
        <InlineMath math="\sigma \approx 18\%" />. The daily parameters are obtained by scaling:
      </p>

      <BlockMath math="\mu_{\text{daily}} = \frac{\mu}{252} \approx 0.048\%, \quad \sigma_{\text{daily}} = \frac{\sigma}{\sqrt{252}} \approx 1.13\%" />

      {/* --- Log-Normal Distribution --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Log-Normal Distribution for Prices
      </h3>

      <DefinitionBlock
        title="Log-Normal Distribution"
        label="Definition 1.3"
        definition={<>
          A random variable <InlineMath math="S" /> is log-normally distributed if{' '}
          <InlineMath math="\ln(S)" /> is normally distributed. If{' '}
          <InlineMath math="\ln(S) \sim N(\mu, \sigma^2)" />, then the stock price
          at time T is given by:
          <BlockMath math="S_T = S_0 \exp\!\left(\left(\mu - \frac{\sigma^2}{2}\right)T + \sigma W_T\right)" />
          where <InlineMath math="W_T" /> is a standard Brownian motion.
        </>}
        notation={<>
          Mean: <InlineMath math="E[S] = e^{\mu + \sigma^2/2}" />, Variance:{' '}
          <InlineMath math="\text{Var}(S) = (e^{\sigma^2} - 1)e^{2\mu + \sigma^2}" />
        </>}
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        This is the foundation of the Black-Scholes model used for pricing Nifty options on the
        NSE. The key insight is that while returns can be negative, prices remain strictly positive
        under the log-normal model -- matching real-world behavior.
      </p>

      {/* --- Other Important Distributions --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Other Key Distributions in Quant Finance
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Distribution</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">PDF / PMF</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Use in Indian Markets</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">Student-t</td>
              <td className="px-4 py-2"><InlineMath math="f(t) \propto (1 + t^2/\nu)^{-(\nu+1)/2}" /></td>
              <td className="px-4 py-2">Heavy-tailed return modeling, confidence intervals with small samples</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">Chi-squared</td>
              <td className="px-4 py-2"><InlineMath math="\chi^2_k" /></td>
              <td className="px-4 py-2">Variance estimation, goodness-of-fit for Nifty return models</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">Exponential</td>
              <td className="px-4 py-2"><InlineMath math="f(x) = \lambda e^{-\lambda x}" /></td>
              <td className="px-4 py-2">Inter-arrival times of trades on NSE</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">Uniform</td>
              <td className="px-4 py-2"><InlineMath math="f(x) = 1/(b-a)" /></td>
              <td className="px-4 py-2">Monte Carlo sampling, random portfolio generation</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-medium">Beta</td>
              <td className="px-4 py-2"><InlineMath math="f(x; \alpha, \beta) \propto x^{\alpha-1}(1-x)^{\beta-1}" /></td>
              <td className="px-4 py-2">Bayesian estimation of win rates in trading strategies</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- Interactive Visualization --- */}
      <InteractiveDistribution />

      {/* --- Moments and Shape --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Moments of Return Distributions
      </h3>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The first four moments characterize the shape of a return distribution:
      </p>

      <BlockMath math={`\\begin{aligned}
\\text{Mean (1st):} \\quad & \\mu = E[r] \\\\
\\text{Variance (2nd):} \\quad & \\sigma^2 = E[(r - \\mu)^2] \\\\
\\text{Skewness (3rd):} \\quad & S = E\\!\\left[\\left(\\frac{r - \\mu}{\\sigma}\\right)^3\\right] \\\\
\\text{Kurtosis (4th):} \\quad & K = E\\!\\left[\\left(\\frac{r - \\mu}{\\sigma}\\right)^4\\right]
\\end{aligned}`} />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For the normal distribution, <InlineMath math="S = 0" /> (symmetric) and{' '}
        <InlineMath math="K = 3" /> (mesokurtic). The <strong>excess kurtosis</strong> is{' '}
        <InlineMath math="K - 3" />. Indian equity returns typically show negative skewness
        (crash risk) and excess kurtosis of 2--5 (fat tails), meaning extreme moves are more
        common than the normal model predicts.
      </p>

      <NoteBlock title="Fat Tails in Indian Markets" type="warning">
        <p>
          The Nifty 50 daily returns exhibit excess kurtosis around 4--7, meaning a "3-sigma"
          event occurs roughly 3x more often than predicted by a normal distribution. This is
          critical for risk management: using normal VaR will systematically underestimate
          tail risk. The 2020 COVID crash saw Nifty fall 13% in a single day -- a roughly
          10-sigma event under normal assumptions, which should occur once in billions of years.
        </p>
      </NoteBlock>

      {/* --- Python Code --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Analyzing Nifty 50 Return Distributions in Python
      </h3>

      <PythonCode
        title="nifty_distributions.py"
        runnable
        code={`import numpy as np
from scipy import stats

# Simulated Nifty 50 daily returns (in practice, use yfinance)
np.random.seed(42)
# Mix of normal + occasional jumps to simulate fat tails
n_days = 252 * 5  # 5 years of daily data
normal_returns = np.random.normal(0.0005, 0.0113, n_days)
# Add occasional jumps (Poisson-driven)
jump_days = np.random.poisson(0.02, n_days)
jump_sizes = np.random.normal(-0.01, 0.03, n_days) * jump_days
daily_returns = normal_returns + jump_sizes

# Compute moments
mean_ret = np.mean(daily_returns)
std_ret = np.std(daily_returns, ddof=1)
skew_ret = stats.skew(daily_returns)
kurt_ret = stats.kurtosis(daily_returns)  # excess kurtosis

print("=== Nifty 50 Daily Return Distribution Analysis ===")
print(f"Number of observations: {len(daily_returns)}")
print(f"Mean daily return:      {mean_ret:.6f} ({mean_ret*252:.4f} annualized)")
print(f"Std deviation:          {std_ret:.6f} ({std_ret*np.sqrt(252):.4f} annualized)")
print(f"Skewness:               {skew_ret:.4f}")
print(f"Excess kurtosis:        {kurt_ret:.4f}")
print()

# Jarque-Bera test for normality
jb_stat, jb_pval = stats.jarque_bera(daily_returns)
print(f"Jarque-Bera statistic:  {jb_stat:.2f}")
print(f"Jarque-Bera p-value:    {jb_pval:.6f}")
print(f"Normal at 5% level?     {'Yes' if jb_pval > 0.05 else 'No -- reject normality'}")
print()

# Empirical vs Normal tail probabilities
thresholds = [2, 3, 4]
print("=== Tail Probability Comparison ===")
print(f"{'Threshold':>10} {'Empirical':>12} {'Normal':>12} {'Ratio':>8}")
for t in thresholds:
    emp_prob = np.mean(np.abs(daily_returns) > t * std_ret)
    norm_prob = 2 * (1 - stats.norm.cdf(t))
    ratio = emp_prob / norm_prob if norm_prob > 0 else float('inf')
    print(f"{t:>10}σ {emp_prob:>12.6f} {norm_prob:>12.6f} {ratio:>8.2f}x")

# Fit Student-t distribution (better for fat tails)
t_params = stats.t.fit(daily_returns)
print(f"\\nFitted Student-t degrees of freedom: {t_params[0]:.2f}")
print(f"(Lower ν = heavier tails; Normal = ν → ∞)")

# Annualized metrics for portfolio context
ann_return = mean_ret * 252
ann_vol = std_ret * np.sqrt(252)
risk_free = 0.065  # RBI repo rate ~ 6.5%
sharpe = (ann_return - risk_free) / ann_vol
print(f"\\n=== Portfolio Context (INR) ===")
print(f"Annualized return:  {ann_return*100:.2f}%")
print(f"Annualized vol:     {ann_vol*100:.2f}%")
print(f"Risk-free (RBI):    {risk_free*100:.2f}%")
print(f"Sharpe ratio:       {sharpe:.3f}")`}
      />

      {/* --- Worked Example --- */}
      <ExampleBlock
        title="Computing Return Distribution Parameters"
        difficulty="beginner"
        problem="TCS stock has daily log returns with mean 0.05% and standard deviation 1.2%. What is the probability of a daily loss exceeding 3% assuming normality?"
        solution={[
          {
            step: 'Standardize the threshold',
            formula: 'z = \\frac{-0.03 - 0.0005}{0.012} = \\frac{-0.0305}{0.012} = -2.542',
            explanation: 'Convert the -3% threshold to a z-score using the daily mean and standard deviation.',
          },
          {
            step: 'Look up the cumulative probability',
            formula: 'P(r < -3\\%) = \\Phi(-2.542) \\approx 0.0055',
            explanation: 'Using the standard normal CDF, we get approximately 0.55%.',
          },
          {
            step: 'Interpret the result',
            formula: '\\text{Expected frequency} \\approx 0.55\\% \\times 252 \\approx 1.4 \\text{ days/year}',
            explanation: 'Under normality, TCS would see a >3% daily loss about 1.4 days per year. In practice, due to fat tails, this likely occurs 2-4 times per year in the Indian market.',
          },
        ]}
      />

      {/* --- Mixture Models --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Beyond the Normal: Mixture Models
      </h3>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A popular approach to capturing fat tails in Indian equity returns is the{' '}
        <strong>Gaussian mixture model</strong>. We model returns as coming from two regimes:
        a "calm" regime and a "volatile" regime:
      </p>

      <BlockMath math="f(r) = w \cdot \mathcal{N}(\mu_1, \sigma_1^2) + (1-w) \cdot \mathcal{N}(\mu_2, \sigma_2^2)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For Nifty 50, a typical fit might be: 85% of the time returns come from{' '}
        <InlineMath math="\mathcal{N}(0.05\%, 0.9\%)" /> (calm markets) and 15% from{' '}
        <InlineMath math="\mathcal{N}(-0.1\%, 2.5\%)" /> (volatile/crisis periods). This
        naturally generates negative skewness and excess kurtosis without any ad-hoc
        adjustments.
      </p>

      {/* --- Copulas --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Joint Distributions and Copulas
      </h3>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        When building portfolios of Indian stocks, we need the <strong>joint distribution</strong>{' '}
        of returns. For two stocks (e.g., TCS and Infosys), the bivariate normal has density:
      </p>

      <BlockMath math={`f(r_1, r_2) = \\frac{1}{2\\pi\\sigma_1\\sigma_2\\sqrt{1-\\rho^2}} \\exp\\!\\left(-\\frac{1}{2(1-\\rho^2)}\\left[\\frac{(r_1-\\mu_1)^2}{\\sigma_1^2} - \\frac{2\\rho(r_1-\\mu_1)(r_2-\\mu_2)}{\\sigma_1\\sigma_2} + \\frac{(r_2-\\mu_2)^2}{\\sigma_2^2}\\right]\\right)`} />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        However, the multivariate normal assumption often fails because correlations between
        Indian stocks increase during market crashes (a phenomenon called <em>correlation
        breakdown</em>). Copulas provide a more flexible framework by separating marginal
        distributions from the dependence structure.
      </p>

      <DefinitionBlock
        title="Copula"
        label="Definition 1.4"
        definition={<>
          By Sklar's theorem, any joint CDF <InlineMath math="F(x_1, \ldots, x_n)" /> can be
          written as <InlineMath math="F(x_1, \ldots, x_n) = C(F_1(x_1), \ldots, F_n(x_n))" />{' '}
          where <InlineMath math="C" /> is the copula function and <InlineMath math="F_i" /> are
          marginal CDFs. The copula captures pure dependence, independent of marginal shapes.
        </>}
        notation={<>
          The Gaussian copula uses <InlineMath math="C(u_1, u_2) = \Phi_2(\Phi^{-1}(u_1), \Phi^{-1}(u_2); \rho)" />.
          The Clayton copula captures lower-tail dependence (crash co-movements).
        </>}
      />

      {/* --- Key Takeaway --- */}
      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          While the normal distribution is a useful starting point, Indian equity returns exhibit
          fat tails, negative skewness, and time-varying volatility. Effective quant strategies
          must account for these departures using Student-t distributions, mixture models, or
          copulas. Always test your distributional assumptions using the Jarque-Bera test,
          Q-Q plots, and tail probability comparisons before deploying a strategy on NSE.
        </p>
      </NoteBlock>
    </div>
  )
}
