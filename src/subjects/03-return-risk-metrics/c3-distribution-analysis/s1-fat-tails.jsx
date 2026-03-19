import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveFatTails() {
  const [kurtosis, setKurtosis] = useState(5.0)
  const [skewness, setSkewness] = useState(-0.3)
  const [sigmaEvents, setSigmaEvents] = useState(3)

  const normalProb = (1 - 0.9987) * 100
  const adjustedProb = normalProb * (1 + (kurtosis - 3) * 0.5)
  const normalDays = Math.round(1 / (normalProb / 100))
  const fatTailDays = Math.round(1 / (adjustedProb / 100))
  const jbStat = (252 / 6) * (skewness * skewness + (kurtosis - 3) * (kurtosis - 3) / 4)

  const sigmaProbs = {
    3: { normal: 0.27, label: '3-sigma' },
    4: { normal: 0.0063, label: '4-sigma' },
    5: { normal: 0.000057, label: '5-sigma' },
    6: { normal: 0.0000002, label: '6-sigma' },
  }
  const selectedSigma = sigmaProbs[sigmaEvents] || sigmaProbs[3]
  const normalFreq = Math.round(252 / (selectedSigma.normal / 100))
  const fatFreq = Math.round(normalFreq / (1 + (kurtosis - 3) * 0.8))

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Fat Tails in Indian Equity Returns
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        See how excess kurtosis increases the frequency of extreme events beyond what the
        Gaussian model predicts for NSE data.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Excess Kurtosis: {(kurtosis - 3).toFixed(1)} (Total: {kurtosis.toFixed(1)})</span>
          <input type="range" min="3" max="12" step="0.1" value={kurtosis}
            onChange={e => setKurtosis(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Skewness: {skewness.toFixed(2)}</span>
          <input type="range" min="-2" max="1" step="0.05" value={skewness}
            onChange={e => setSkewness(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Sigma Event: {sigmaEvents}-sigma</span>
          <input type="range" min="3" max="6" step="1" value={sigmaEvents}
            onChange={e => setSigmaEvents(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">Normal Frequency</p>
          <p className="text-lg font-bold text-blue-800 dark:text-blue-200">
            1 in {normalFreq.toLocaleString()} days
          </p>
        </div>
        <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/30">
          <p className="text-xs font-semibold text-red-700 dark:text-red-300">Fat-Tail Frequency</p>
          <p className="text-lg font-bold text-red-800 dark:text-red-200">
            1 in {fatFreq.toLocaleString()} days
          </p>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">JB Statistic</p>
          <p className="text-lg font-bold text-amber-800 dark:text-amber-200">{jbStat.toFixed(1)}</p>
          <p className="text-xs text-amber-600 dark:text-amber-400">
            {jbStat > 5.99 ? 'Reject normality' : 'Cannot reject'}
          </p>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
          <p className="text-xs font-semibold text-purple-700 dark:text-purple-300">Tail Multiplier</p>
          <p className="text-lg font-bold text-purple-800 dark:text-purple-200">
            {(normalFreq / fatFreq).toFixed(1)}x
          </p>
          <p className="text-xs text-purple-600 dark:text-purple-400">more frequent than normal</p>
        </div>
      </div>
    </div>
  )
}

export default function FatTails() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Fat Tails and Non-Normality
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The assumption that financial returns are normally distributed is one of the most
        dangerous simplifications in quantitative finance. Nifty 50 daily returns exhibit
        excess kurtosis of 4-7 (vs. 0 for normal), negative skewness (-0.2 to -0.5), and
        extreme events that occur far more frequently than Gaussian models predict. The
        2020 Nifty 50 crash of -13% in a single day was a 10-sigma event under normality --
        essentially impossible -- yet it happened.
      </p>

      <DefinitionBlock
        title="Skewness"
        label="Definition 3.1"
        definition="Skewness measures the asymmetry of the return distribution. Negative skewness (common in equity markets including NSE) indicates that large negative returns are more frequent or more extreme than large positive returns."
        notation="\text{Skew} = \frac{1}{N}\sum_{i=1}^{N}\left(\frac{r_i - \bar{r}}{\sigma}\right)^3"
      />

      <DefinitionBlock
        title="Kurtosis and Excess Kurtosis"
        label="Definition 3.2"
        definition="Kurtosis measures the heaviness of the tails relative to the normal distribution. Excess kurtosis (kurtosis minus 3) is positive for fat-tailed distributions (leptokurtic) and zero for the Gaussian. Indian equity returns consistently show excess kurtosis of 3-7, meaning extreme events are far more likely than the bell curve suggests."
        notation="\text{Kurt} = \frac{1}{N}\sum_{i=1}^{N}\left(\frac{r_i - \bar{r}}{\sigma}\right)^4, \quad \text{Excess Kurt} = \text{Kurt} - 3"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Jarque-Bera Test for Normality
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The Jarque-Bera test jointly tests whether skewness and kurtosis match the normal
        distribution. Under the null hypothesis of normality, the test statistic follows a
        chi-squared distribution with 2 degrees of freedom:
      </p>

      <BlockMath math="\text{JB} = \frac{N}{6}\left(S^2 + \frac{(K-3)^2}{4}\right) \sim \chi^2_2" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For daily Nifty 50 returns, JB statistics typically exceed 100, overwhelmingly
        rejecting normality. The critical value at 5% significance is 5.99.
      </p>

      <TheoremBlock
        title="Power-Law Tails in Financial Returns"
        label="Theorem 3.1"
        statement="Empirical evidence from global equity markets (including NSE) shows that the tail distribution follows a power law rather than an exponential decay. The probability of extreme returns decays as a power of the return magnitude."
        formula="P(|r| > x) \sim x^{-\alpha}, \quad \alpha \approx 3 \text{ (cubic law)}"
        proof="Mandelbrot (1963) first observed non-Gaussian behavior in commodity prices. Gabaix et al. (2003) showed that for US equities, the tail exponent \alpha \approx 3 (known as the inverse cubic law). For Indian markets, studies using NSE tick data (Matia et al., 2002; Rak et al., 2007) confirm \alpha \in [2.5, 4.0] for Nifty 50 constituents. The power law arises from the interplay of heterogeneous trader sizes and herding behavior. With \alpha \approx 3, variance is finite but the fourth moment (kurtosis) diverges, explaining the persistent leptokurtosis in daily returns."
      />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Event Size</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Normal Prob</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Empirical (NSE)</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Underestimation</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">3-sigma (3.6%)</td>
              <td className="px-4 py-2">0.27%</td>
              <td className="px-4 py-2">~1.0%</td>
              <td className="px-4 py-2">3.7x</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">4-sigma (4.8%)</td>
              <td className="px-4 py-2">0.006%</td>
              <td className="px-4 py-2">~0.15%</td>
              <td className="px-4 py-2">25x</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">5-sigma (6.0%)</td>
              <td className="px-4 py-2">0.00006%</td>
              <td className="px-4 py-2">~0.03%</td>
              <td className="px-4 py-2">500x</td>
            </tr>
            <tr>
              <td className="px-4 py-2">10-sigma (12%)</td>
              <td className="px-4 py-2">~0 (10^-23)</td>
              <td className="px-4 py-2">~0.002%</td>
              <td className="px-4 py-2">Effectively infinite</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveFatTails />

      <PythonCode
        title="fat_tails_nse.py"
        runnable
        code={`import numpy as np
from scipy.stats import norm, jarque_bera, kurtosis, skew, kstest

# Simulated Nifty 50 daily returns with fat tails (Student-t, df=5)
np.random.seed(42)
n_days = 2520  # 10 years of daily data

# Fat-tailed returns (Student-t with df=5 mimics real NSE data)
from scipy.stats import t as t_dist
returns = t_dist.rvs(df=5, size=n_days) * 0.012 + 0.0003

# --- Descriptive Statistics ---
mean_r = np.mean(returns)
std_r = np.std(returns)
skew_r = float(skew(returns))
kurt_r = float(kurtosis(returns, fisher=True))  # Excess kurtosis

# --- Jarque-Bera Test ---
jb_stat, jb_pval = jarque_bera(returns)

# --- Kolmogorov-Smirnov Test ---
ks_stat, ks_pval = kstest(returns, 'norm', args=(mean_r, std_r))

# --- Count Sigma Events ---
sigma_counts = {}
for s in [3, 4, 5, 6]:
    threshold = s * std_r
    count = np.sum(np.abs(returns - mean_r) > threshold)
    expected_normal = n_days * 2 * norm.sf(s)
    sigma_counts[s] = (count, expected_normal)

# --- QQ-Plot Data ---
sorted_returns = np.sort(returns)
theoretical_quantiles = norm.ppf(np.linspace(0.001, 0.999, n_days))

# --- Tail Index Estimation (Hill Estimator) ---
abs_returns = np.sort(np.abs(returns - mean_r))[::-1]
k = 100  # Use top 100 observations
log_excess = np.log(abs_returns[:k] / abs_returns[k])
hill_alpha = k / np.sum(log_excess)

print("=== Fat Tail Analysis: Nifty 50 Returns (10 Years) ===")
print(f"Observations: {n_days}")
print(f"\\n--- Moments ---")
print(f"Mean daily return: {mean_r*10000:.2f} bps")
print(f"Std deviation:     {std_r*100:.3f}%")
print(f"Skewness:          {skew_r:.4f} {'(negative - left tail heavier)' if skew_r < 0 else ''}")
print(f"Excess Kurtosis:   {kurt_r:.4f} {'(fat tails!)' if kurt_r > 1 else ''}")
print(f"\\n--- Normality Tests ---")
print(f"Jarque-Bera: stat = {jb_stat:.1f}, p = {jb_pval:.2e} {'REJECT normality' if jb_pval < 0.05 else ''}")
print(f"K-S Test:    stat = {ks_stat:.4f}, p = {ks_pval:.2e} {'REJECT normality' if ks_pval < 0.05 else ''}")
print(f"\\n--- Sigma Events: Observed vs Expected (Normal) ---")
for s, (obs, exp) in sigma_counts.items():
    ratio = obs / max(exp, 0.01)
    print(f"  {s}-sigma: {obs:>4d} observed vs {exp:>6.1f} expected (Normal) = {ratio:.1f}x more")
print(f"\\n--- Tail Index (Hill Estimator) ---")
print(f"alpha = {hill_alpha:.2f} (finite variance requires alpha > 2)")
print(f"Interpretation: Power law P(|r| > x) ~ x^(-{hill_alpha:.1f})")`}
      />

      <ExampleBlock
        title="Is a -5% Nifty 50 Move Really a Tail Event?"
        difficulty="intermediate"
        problem="Nifty 50 has daily vol of 1.2%. A -5% daily drop occurs. Under normality, how many sigma is this? How often should it occur in 10 years (2520 trading days)? If the excess kurtosis is 4.5, roughly how much more frequent is it?"
        solution={[
          {
            step: 'Compute sigma distance',
            formula: '\\frac{|-5\\%|}{1.2\\%} = 4.17\\sigma',
            explanation: 'A -5% move is a 4.17-sigma event.',
          },
          {
            step: 'Normal probability',
            formula: 'P(|r| > 4.17\\sigma) = 2 \\times \\Phi(-4.17) \\approx 3.0 \\times 10^{-5}',
            explanation: 'Under normality, this should occur once every 33,000 trading days (130 years). In 10 years, expected count is 0.076.',
          },
          {
            step: 'Fat-tail adjustment',
            formula: '\\text{Multiplier} \\approx 1 + 0.8 \\times \\kappa_{\\text{excess}} = 1 + 0.8 \\times 4.5 = 4.6\\times',
            explanation: 'With excess kurtosis of 4.5, such events are roughly 4-5x more frequent, occurring about once every 7,000 days (~28 years). In practice on NSE, -5% days have occurred multiple times in the last decade.',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Extreme Value Theory (EVT) for Tail Modeling
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Extreme Value Theory provides a rigorous framework for modeling the tails of return
        distributions without assuming a specific parametric form for the entire distribution.
        The Generalized Pareto Distribution (GPD) models exceedances over a high threshold:
      </p>

      <BlockMath math="P(X > u + y \mid X > u) \approx \left(1 + \xi \frac{y}{\beta}\right)^{-1/\xi}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="u" /> is the threshold, <InlineMath math="\xi" /> is the shape
        parameter (positive for fat tails), and <InlineMath math="\beta" /> is the scale.
        For Nifty 50 daily returns, the EVT approach yields more accurate 99% VaR estimates
        than parametric methods, particularly important for SEBI margin calculations.
      </p>

      <BlockMath math="\text{VaR}_{1-p}^{\text{EVT}} = u + \frac{\beta}{\xi}\left[\left(\frac{n}{N_u} \cdot p\right)^{-\xi} - 1\right]" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="N_u" /> is the number of exceedances above threshold{' '}
        <InlineMath math="u" /> out of <InlineMath math="n" /> total observations.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Volatility Clustering and ARCH Effects
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Fat tails in Indian equity returns are partly explained by volatility clustering:
        large returns (positive or negative) tend to be followed by large returns. This is
        captured by GARCH models:
      </p>

      <BlockMath math="\sigma_t^2 = \omega + \alpha \epsilon_{t-1}^2 + \beta \sigma_{t-1}^2" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Even if the conditional distribution <InlineMath math="\epsilon_t / \sigma_t" /> is
        normal, the unconditional distribution of <InlineMath math="\epsilon_t" /> will be
        fat-tailed due to the mixing of normals with different volatilities. On NSE data,
        GARCH(1,1) with <InlineMath math="\alpha \approx 0.08" /> and{' '}
        <InlineMath math="\beta \approx 0.90" /> captures much of the observed kurtosis.
        However, residual fat tails remain even after GARCH filtering, suggesting that
        the innovation distribution itself is non-Gaussian.
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Indian Market Event</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Nifty Move</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Sigma (Normal)</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Normal Probability</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Budget Day 2020</td>
              <td className="px-4 py-2">-2.5%</td>
              <td className="px-4 py-2">2.1x</td>
              <td className="px-4 py-2">3.6% (expected)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">COVID Crash (23 Mar)</td>
              <td className="px-4 py-2">-12.98%</td>
              <td className="px-4 py-2">10.8x</td>
              <td className="px-4 py-2">~0 (impossible)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Election Result 2014</td>
              <td className="px-4 py-2">+3.8%</td>
              <td className="px-4 py-2">3.2x</td>
              <td className="px-4 py-2">0.14%</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Demonetization (Nov 2016)</td>
              <td className="px-4 py-2">-6.3%</td>
              <td className="px-4 py-2">5.3x</td>
              <td className="px-4 py-2">0.000006%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Never rely solely on Gaussian models for risk management. Indian equity returns have
          persistent fat tails with excess kurtosis of 3-7 and negative skewness. This means
          extreme events like the March 2020 crash are far more likely than normal models suggest.
          Use Student-t distributions, EVT (Extreme Value Theory), or historical simulation
          for realistic VaR/CVaR estimates. GARCH models capture volatility clustering but do
          not eliminate the need for fat-tailed innovation distributions. Always test your
          strategy against historical tail events from NSE data.
        </p>
      </NoteBlock>
    </div>
  )
}
