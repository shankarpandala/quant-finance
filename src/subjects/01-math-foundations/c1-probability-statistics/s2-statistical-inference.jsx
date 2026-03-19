import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveHypothesisTest() {
  const [sampleMean, setSampleMean] = useState(0.15)
  const [sampleStd, setSampleStd] = useState(0.22)
  const [sampleSize, setSampleSize] = useState(60)
  const [alpha, setAlpha] = useState(0.05)

  const nullMean = 0
  const se = sampleStd / Math.sqrt(sampleSize)
  const tStat = (sampleMean - nullMean) / se
  const df = sampleSize - 1

  // Approximate p-value using normal approximation for large n
  const zAbs = Math.abs(tStat)
  const pValue = 2 * (1 - 0.5 * (1 + Math.min(1, (
    0.254829592 * (1 / (1 + 0.3275911 * zAbs / Math.sqrt(2))) -
    0.284496736 * Math.pow(1 / (1 + 0.3275911 * zAbs / Math.sqrt(2)), 2) +
    1.421413741 * Math.pow(1 / (1 + 0.3275911 * zAbs / Math.sqrt(2)), 3) -
    1.453152027 * Math.pow(1 / (1 + 0.3275911 * zAbs / Math.sqrt(2)), 4) +
    1.061405429 * Math.pow(1 / (1 + 0.3275911 * zAbs / Math.sqrt(2)), 5)
  ) * Math.exp(-zAbs * zAbs / 2))))

  const reject = pValue < alpha
  const ciLower = sampleMean - 1.96 * se
  const ciUpper = sampleMean + 1.96 * se

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Strategy Alpha Hypothesis Test
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Test whether a Nifty-based strategy's annualized excess return is significantly
        different from zero. Adjust the sample statistics and significance level.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Mean return = {(sampleMean * 100).toFixed(1)}%</span>
          <input type="range" min="-0.2" max="0.5" step="0.01" value={sampleMean}
            onChange={e => setSampleMean(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Std dev = {(sampleStd * 100).toFixed(1)}%</span>
          <input type="range" min="0.05" max="0.5" step="0.01" value={sampleStd}
            onChange={e => setSampleStd(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Months (n) = {sampleSize}</span>
          <input type="range" min="12" max="240" step="1" value={sampleSize}
            onChange={e => setSampleSize(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math="\alpha" /> = {alpha}</span>
          <input type="range" min="0.01" max="0.1" step="0.01" value={alpha}
            onChange={e => setAlpha(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-800">
          <div className="text-xs text-gray-500 dark:text-gray-400">t-statistic</div>
          <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{tStat.toFixed(3)}</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-800">
          <div className="text-xs text-gray-500 dark:text-gray-400">p-value</div>
          <div className={`text-lg font-bold ${pValue < alpha ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>
            {pValue < 0.001 ? '<0.001' : pValue.toFixed(4)}
          </div>
        </div>
        <div className="rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-800">
          <div className="text-xs text-gray-500 dark:text-gray-400">95% CI</div>
          <div className="text-sm font-bold text-gray-700 dark:text-gray-300">
            [{(ciLower * 100).toFixed(1)}%, {(ciUpper * 100).toFixed(1)}%]
          </div>
        </div>
        <div className="rounded-lg p-3 text-center" style={{ backgroundColor: reject ? '#dcfce7' : '#fef2f2' }}>
          <div className="text-xs text-gray-500">Decision</div>
          <div className={`text-sm font-bold ${reject ? 'text-green-700' : 'text-red-700'}`}>
            {reject ? 'Reject H₀: Alpha exists!' : 'Fail to reject H₀'}
          </div>
        </div>
      </div>

      <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
        <InlineMath math={`H_0: \\mu = 0 \\quad \\text{vs} \\quad H_1: \\mu \\neq 0`} />{' '}
        with <InlineMath math={`n = ${sampleSize}`} /> monthly observations.
        Standard error = <InlineMath math={`${(se * 100).toFixed(3)}\\%`} />.
      </p>
    </div>
  )
}

export default function StatisticalInference() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Statistical Inference for Strategy Research
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Statistical inference is the backbone of quantitative strategy validation. Before
        deploying a trading strategy on NSE, we must rigorously test whether observed alpha
        is genuine or merely a product of randomness. This section covers hypothesis testing,
        confidence intervals, and the critical issue of multiple testing bias in strategy research.
      </p>

      {/* --- Hypothesis Testing Framework --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Hypothesis Testing Framework
      </h3>

      <DefinitionBlock
        title="Null and Alternative Hypotheses"
        label="Definition 2.1"
        definition={<>
          In strategy research, the null hypothesis <InlineMath math="H_0" /> typically states
          that the strategy has zero expected excess return (no alpha):
          <InlineMath math="H_0: \mu_{\text{excess}} = 0" />. The alternative{' '}
          <InlineMath math="H_1: \mu_{\text{excess}} \neq 0" /> (two-sided) or{' '}
          <InlineMath math="H_1: \mu_{\text{excess}} > 0" /> (one-sided) posits that
          alpha exists.
        </>}
        notation={<>
          Type I error (<InlineMath math="\alpha" />): Rejecting <InlineMath math="H_0" /> when
          it is true (false discovery). Type II error (<InlineMath math="\beta" />): Failing to
          reject <InlineMath math="H_0" /> when <InlineMath math="H_1" /> is true (missed alpha).
        </>}
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The test statistic for a strategy's mean return is the t-statistic:
      </p>

      <BlockMath math="t = \frac{\bar{r} - \mu_0}{s / \sqrt{n}} = \frac{\bar{r}}{s / \sqrt{n}} \quad \text{(when } \mu_0 = 0\text{)}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\bar{r}" /> is the sample mean excess return,{' '}
        <InlineMath math="s" /> is the sample standard deviation, and{' '}
        <InlineMath math="n" /> is the number of observations. Under{' '}
        <InlineMath math="H_0" />, this follows a <InlineMath math="t_{n-1}" /> distribution.
      </p>

      <TheoremBlock
        title="Relationship Between t-statistic and Sharpe Ratio"
        label="Theorem 2.1"
        statement={<>
          The t-statistic of a strategy's excess return is directly related to its annualized
          Sharpe ratio:
          <BlockMath math="t = \text{SR}_{\text{ann}} \times \sqrt{\frac{n}{f}}" />
          where <InlineMath math="f" /> is the annualization factor (12 for monthly, 252 for
          daily data). This means that a strategy with an annualized Sharpe ratio of 1.0
          requires approximately <InlineMath math="n = 4f / t_{\text{crit}}^2" /> observations
          to achieve statistical significance at the 5% level.
        </>}
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For a Nifty-based monthly strategy with an annualized Sharpe ratio of 0.8, the number
        of months needed for significance at <InlineMath math="\alpha = 0.05" /> is:
      </p>

      <BlockMath math="n = \frac{t_{\text{crit}}^2 \times 12}{\text{SR}^2} = \frac{1.96^2 \times 12}{0.8^2} = \frac{46.1}{0.64} \approx 72 \text{ months (6 years)}" />

      {/* --- Confidence Intervals --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Confidence Intervals
      </h3>

      <DefinitionBlock
        title="Confidence Interval"
        label="Definition 2.2"
        definition={<>
          A <InlineMath math="(1 - \alpha) \times 100\%" /> confidence interval for the
          population mean return is:
          <BlockMath math="\bar{r} \pm t_{\alpha/2, n-1} \cdot \frac{s}{\sqrt{n}}" />
          This means that if we repeated the strategy evaluation many times, approximately{' '}
          <InlineMath math="(1 - \alpha) \times 100\%" /> of the resulting intervals would
          contain the true mean return.
        </>}
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For a Nifty long-short strategy tested over 120 months with mean monthly return 0.8%
        and standard deviation 3.2%, the 95% confidence interval is:
      </p>

      <BlockMath math="0.008 \pm 1.98 \times \frac{0.032}{\sqrt{120}} = 0.008 \pm 0.00578 = [-0.22\%, 1.38\%]" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Since the CI includes zero, we cannot conclude at the 5% level that this strategy
        generates significant alpha -- despite an apparently attractive 9.6% annualized return.
      </p>

      {/* --- Interactive Component --- */}
      <InteractiveHypothesisTest />

      {/* --- Multiple Testing / p-Hacking --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Multiple Testing Problem and p-Hacking
      </h3>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The single greatest threat to quantitative strategy research is <strong>multiple
        testing bias</strong>. When a quant researcher tests hundreds of strategy variations
        on NSE data, some will appear statistically significant purely by chance.
      </p>

      <BlockMath math="P(\text{at least one false discovery} \mid k \text{ tests}) = 1 - (1 - \alpha)^k" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        With <InlineMath math="k = 100" /> strategy variants tested at{' '}
        <InlineMath math="\alpha = 5\%" />, the probability of at least one false discovery is:
      </p>

      <BlockMath math="1 - (1 - 0.05)^{100} = 1 - 0.95^{100} \approx 99.4\%" />

      <NoteBlock title="p-Hacking in Indian Quant Research" type="warning">
        <p>
          Common forms of p-hacking in Indian market research include: (1) trying many lookback
          periods for momentum strategies, (2) testing multiple sector combinations for
          rotation strategies, (3) optimizing entry/exit thresholds on Bank Nifty options,
          (4) selecting the "best" start date that avoids the 2008 crash or 2020 COVID period.
          Each decision point multiplies the effective number of tests.
        </p>
      </NoteBlock>

      {/* --- Corrections for Multiple Testing --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Corrections for Multiple Comparisons
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Method</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Adjusted Threshold</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Controls</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Power</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">Bonferroni</td>
              <td className="px-4 py-2"><InlineMath math="\alpha / k" /></td>
              <td className="px-4 py-2">FWER</td>
              <td className="px-4 py-2">Low (conservative)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">Holm-Bonferroni</td>
              <td className="px-4 py-2"><InlineMath math="\alpha / (k - j + 1)" /></td>
              <td className="px-4 py-2">FWER</td>
              <td className="px-4 py-2">Moderate</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">Benjamini-Hochberg</td>
              <td className="px-4 py-2"><InlineMath math="(j/k) \cdot \alpha" /></td>
              <td className="px-4 py-2">FDR</td>
              <td className="px-4 py-2">Higher</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-medium">Harvey et al. (2016)</td>
              <td className="px-4 py-2"><InlineMath math="t > 3.0" /></td>
              <td className="px-4 py-2">Effective trials</td>
              <td className="px-4 py-2">Practical</td>
            </tr>
          </tbody>
        </table>
      </div>

      <TheoremBlock
        title="Benjamini-Hochberg Procedure"
        label="Theorem 2.2"
        statement={<>
          Given <InlineMath math="k" /> p-values <InlineMath math="p_{(1)} \leq p_{(2)} \leq \cdots \leq p_{(k)}" />,
          the BH procedure rejects all hypotheses <InlineMath math="H_{(j)}" /> for{' '}
          <InlineMath math="j \leq \hat{j}" />, where:
          <BlockMath math="\hat{j} = \max\!\left\{j : p_{(j)} \leq \frac{j}{k} \cdot q\right\}" />
          This controls the false discovery rate at level <InlineMath math="q" />. For
          strategy research, FDR control is often more appropriate than FWER control because
          we can tolerate a small proportion of false discoveries.
        </>}
      />

      {/* --- Bootstrapping --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Bootstrap Methods for Strategy Statistics
      </h3>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        When return distributions are non-normal (as they typically are in Indian markets),
        bootstrap methods provide distribution-free inference. The key idea is to resample
        from observed returns with replacement to build an empirical distribution of the
        test statistic.
      </p>

      <BlockMath math="\hat{\theta}^*_b = T(r^*_{b,1}, r^*_{b,2}, \ldots, r^*_{b,n}), \quad b = 1, 2, \ldots, B" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="r^*_{b,i}" /> are drawn with replacement from the original
        return series. The bootstrap 95% CI is given by the 2.5th and 97.5th percentiles
        of the <InlineMath math="B" /> bootstrap estimates.
      </p>

      {/* --- Python Code --- */}
      <PythonCode
        title="strategy_inference.py"
        runnable
        code={`import numpy as np
from scipy import stats

np.random.seed(42)

# Simulate a Nifty momentum strategy's monthly excess returns
# True alpha = 0.3% per month (3.6% annualized)
n_months = 120  # 10 years
true_alpha = 0.003
strategy_returns = np.random.normal(true_alpha, 0.035, n_months)

# --- t-test for alpha ---
mean_ret = np.mean(strategy_returns)
std_ret = np.std(strategy_returns, ddof=1)
se = std_ret / np.sqrt(n_months)
t_stat = mean_ret / se
p_value = 2 * (1 - stats.t.cdf(abs(t_stat), df=n_months-1))

print("=== Strategy Alpha Test (Nifty Momentum) ===")
print(f"Sample mean monthly return: {mean_ret*100:.3f}%")
print(f"Annualized return:          {mean_ret*12*100:.2f}%")
print(f"Monthly std:                {std_ret*100:.3f}%")
print(f"Annualized Sharpe ratio:    {(mean_ret/std_ret)*np.sqrt(12):.3f}")
print(f"t-statistic:                {t_stat:.3f}")
print(f"p-value (two-sided):        {p_value:.4f}")
print(f"Decision at 5%:             {'Reject H0' if p_value < 0.05 else 'Fail to reject H0'}")
print()

# --- 95% Confidence Interval ---
ci_low = mean_ret - stats.t.ppf(0.975, n_months-1) * se
ci_high = mean_ret + stats.t.ppf(0.975, n_months-1) * se
print(f"95% CI for monthly alpha:   [{ci_low*100:.3f}%, {ci_high*100:.3f}%]")
print(f"95% CI annualized:          [{ci_low*12*100:.2f}%, {ci_high*12*100:.2f}%]")
print()

# --- Bootstrap Sharpe Ratio CI ---
B = 10000
boot_sharpes = np.zeros(B)
for b in range(B):
    sample = np.random.choice(strategy_returns, size=n_months, replace=True)
    boot_sharpes[b] = (np.mean(sample) / np.std(sample, ddof=1)) * np.sqrt(12)

boot_ci = np.percentile(boot_sharpes, [2.5, 97.5])
print(f"Bootstrap Sharpe 95% CI:    [{boot_ci[0]:.3f}, {boot_ci[1]:.3f}]")
print()

# --- Multiple Testing Correction ---
# Simulate testing 50 strategy variants (most with no alpha)
k = 50
n_real = 3  # only 3 have real alpha
p_values = []
for i in range(k):
    if i < n_real:
        rets = np.random.normal(0.004, 0.035, n_months)  # real alpha
    else:
        rets = np.random.normal(0.0, 0.035, n_months)  # no alpha
    t = np.mean(rets) / (np.std(rets, ddof=1) / np.sqrt(n_months))
    p = 2 * (1 - stats.t.cdf(abs(t), n_months - 1))
    p_values.append(p)

p_values = np.array(p_values)
naive_sig = np.sum(p_values < 0.05)
print(f"=== Multiple Testing ({k} Strategy Variants) ===")
print(f"True alpha strategies:      {n_real}")
print(f"Naive discoveries (p<0.05): {naive_sig}")

# Bonferroni correction
bonf_sig = np.sum(p_values < 0.05 / k)
print(f"Bonferroni discoveries:     {bonf_sig}")

# Benjamini-Hochberg
sorted_p = np.sort(p_values)
bh_threshold = (np.arange(1, k+1) / k) * 0.05
bh_sig = np.sum(sorted_p <= bh_threshold)
print(f"BH (FDR=5%) discoveries:    {bh_sig}")
print(f"\\nLesson: Naive testing finds {naive_sig} strategies, but many may be false.")
print(f"Use BH correction for a more honest assessment of alpha.")`}
      />

      {/* --- Worked Example --- */}
      <ExampleBlock
        title="Is This Bank Nifty Strategy Real?"
        difficulty="intermediate"
        problem="A trader backtests a Bank Nifty options strategy over 36 months, achieving a mean monthly return of 1.8% with a standard deviation of 5.2%. However, they tested 20 parameter combinations. Is the alpha genuine?"
        solution={[
          {
            step: 'Compute the naive t-statistic',
            formula: 't = \\frac{0.018}{0.052 / \\sqrt{36}} = \\frac{0.018}{0.00867} = 2.08',
            explanation: 'The naive t-stat exceeds the critical value of 2.03 (df=35, alpha=0.05), so p < 0.05.',
          },
          {
            step: 'Apply Bonferroni correction for 20 tests',
            formula: '\\alpha_{\\text{adj}} = \\frac{0.05}{20} = 0.0025, \\quad t_{\\text{crit}} \\approx 3.19',
            explanation: 'After correction, we need t > 3.19. Our t = 2.08 fails this threshold.',
          },
          {
            step: 'Compute the minimum Sharpe for significance',
            formula: '\\text{SR}_{\\min} = \\frac{t_{\\text{crit}}}{\\sqrt{n/12}} = \\frac{3.19}{\\sqrt{3}} = 1.84',
            explanation: 'With only 36 months and 20 tests, the strategy needs an annualized Sharpe > 1.84 to be credible. The observed Sharpe of 1.20 is insufficient.',
          },
          {
            step: 'Conclusion',
            formula: '\\text{Fail to reject } H_0 \\text{ after multiple testing correction}',
            explanation: 'The strategy likely found a lucky parameter combination. Recommendation: collect more data (extend backtest) or use out-of-sample validation on separate NSE data.',
          },
        ]}
      />

      {/* --- Practical Guidelines --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Practical Guidelines for Indian Market Research
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Practice</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Recommendation</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Minimum backtest length</td>
              <td className="px-4 py-2">5+ years of NSE data (2+ market cycles)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">t-statistic threshold</td>
              <td className="px-4 py-2">t &gt; 3.0 after accounting for trials (Harvey et al.)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Out-of-sample testing</td>
              <td className="px-4 py-2">Hold out last 2 years of data; never touch until final test</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Walk-forward analysis</td>
              <td className="px-4 py-2">Re-estimate parameters monthly, test on next month</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Report all tests</td>
              <td className="px-4 py-2">Log every strategy variant tested for honest p-value adjustment</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- Key Takeaway --- */}
      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          A backtest that shows "alpha" is not proof of a profitable strategy. The t-statistic
          must survive multiple testing corrections, the Sharpe ratio confidence interval must
          exclude zero with sufficient margin, and out-of-sample results on unseen NSE data must
          confirm in-sample findings. The Harvey, Liu, and Zhu (2016) threshold of{' '}
          <InlineMath math="t > 3.0" /> is a good practical rule for Indian market researchers
          who test many strategy variants.
        </p>
      </NoteBlock>
    </div>
  )
}
