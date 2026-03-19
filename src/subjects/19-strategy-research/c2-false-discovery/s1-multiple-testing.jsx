import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveMultipleTesting() {
  const [nTests, setNTests] = useState(20)
  const [alpha, setAlpha] = useState(0.05)
  const [method, setMethod] = useState('none')

  const familyWiseError = 1 - Math.pow(1 - alpha, nTests)
  const bonferroni = alpha / nTests
  const bhFDR = alpha * (nTests + 1) / (2 * nTests)

  const correctedAlpha = method === 'bonferroni' ? bonferroni : method === 'bh' ? bhFDR : alpha
  const correctedFWE = method === 'none' ? familyWiseError : method === 'bonferroni'
    ? 1 - Math.pow(1 - bonferroni, nTests) : 1 - Math.pow(1 - bhFDR, nTests)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Multiple Testing Correction
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        See how testing multiple strategies inflates false discovery risk and how corrections help.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Number of Tests: {nTests}</span>
          <input type="range" min="1" max="200" step="1" value={nTests}
            onChange={e => setNTests(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Base Alpha: {(alpha * 100).toFixed(1)}%</span>
          <input type="range" min="0.01" max="0.20" step="0.01" value={alpha}
            onChange={e => setAlpha(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Correction Method</span>
          <select value={method} onChange={e => setMethod(e.target.value)}
            className="rounded border p-1 text-xs dark:bg-gray-800 dark:border-gray-600">
            <option value="none">No Correction</option>
            <option value="bonferroni">Bonferroni</option>
            <option value="bh">Benjamini-Hochberg (FDR)</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className={`rounded-lg p-3 ${familyWiseError > 0.3 && method === 'none' ? 'bg-red-50 dark:bg-red-900/30' : 'bg-green-50 dark:bg-green-900/30'}`}>
          <div className="text-[10px] text-gray-500">Family-Wise Error</div>
          <div className={`text-lg font-bold ${method === 'none' && familyWiseError > 0.3 ? 'text-red-600' : 'text-green-600'}`}>
            {method === 'none' ? (familyWiseError * 100).toFixed(1) : (correctedFWE * 100).toFixed(2)}%
          </div>
        </div>
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
          <div className="text-[10px] text-gray-500">Corrected Alpha</div>
          <div className="text-lg font-bold text-blue-600">{(correctedAlpha * 100).toFixed(3)}%</div>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
          <div className="text-[10px] text-gray-500">Min t-stat Required</div>
          <div className="text-lg font-bold text-purple-600">{(2.326 + Math.log(nTests) * 0.3).toFixed(2)}</div>
        </div>
      </div>
    </div>
  )
}

export default function MultipleTesting() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Bonferroni and BH-FDR Correction
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The most dangerous trap in quantitative strategy research is the multiple testing
        problem. When you test many strategies, parameters, or signals on NSE data, some
        will appear statistically significant by chance alone. Proper correction methods
        are essential to avoid deploying strategies that are nothing more than noise.
      </p>

      <DefinitionBlock
        title="Multiple Testing Problem"
        label="Definition 19.4"
        definition="The multiple testing problem (also called the look-elsewhere effect or data snooping bias) occurs when multiple statistical hypotheses are tested simultaneously. With M independent tests at significance level alpha, the probability of at least one false positive (family-wise error rate, FWER) is 1 - (1 - alpha)^M. For M = 20 at alpha = 5%, FWER = 64%."
        notation="Key metrics: FWER (family-wise error rate), FDR (false discovery rate), FWER controls the probability of ANY false positive; FDR controls the PROPORTION of false positives among rejections."
      />

      <InteractiveMultipleTesting />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Bonferroni Correction
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The simplest and most conservative correction divides the significance level
        by the number of tests:
      </p>

      <BlockMath math="\alpha_{\text{Bonferroni}} = \frac{\alpha}{M}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For <InlineMath math="M = 50" /> strategies tested at <InlineMath math="\alpha = 5\%" />,
        each individual test must achieve <InlineMath math="p < 0.001" /> to be considered
        significant. This is extremely conservative and rejects many true signals.
      </p>

      <TheoremBlock
        title="Bonferroni Inequality"
        label="Theorem 19.4"
        statement="For $M$ hypothesis tests with individual p-values $p_1, \ldots, p_M$, the Bonferroni procedure rejects $H_{0,i}$ if $p_i \leq \alpha/M$. This controls the FWER at level $\alpha$: $\text{FWER} = P(\text{any false rejection}) \leq \sum_{i \in H_0} P(p_i \leq \alpha/M) \leq M_0 \cdot \alpha/M \leq \alpha$ where $M_0 \leq M$ is the number of true nulls."
        proof="By the union bound (Boole's inequality): $P(\bigcup_i \{p_i \leq \alpha/M\}) \leq \sum_i P(p_i \leq \alpha/M)$. Under $H_0$, each p-value is uniform on $[0,1]$, so $P(p_i \leq \alpha/M) = \alpha/M$. Summing over at most $M$ true nulls gives the bound."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Benjamini-Hochberg FDR Control
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The BH procedure controls the False Discovery Rate (FDR) -- the expected proportion
        of false positives among rejected hypotheses -- rather than the FWER. This is less
        conservative and more appropriate when testing many strategies:
      </p>

      <BlockMath math="\text{FDR} = \mathbb{E}\left[\frac{V}{R \vee 1}\right]" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="V" /> is the number of false discoveries and{' '}
        <InlineMath math="R" /> is the total number of rejections.
      </p>

      <BlockMath math="\text{BH procedure: Reject } H_{(i)} \text{ for } i \leq k^* = \max\left\{i : p_{(i)} \leq \frac{i}{M} \cdot \alpha\right\}" />

      <PythonCode
        title="multiple_testing_correction.py"
        runnable
        code={`import numpy as np
from scipy import stats

class MultipleTestingCorrector:
    """Multiple testing correction for strategy research."""

    def __init__(self, alpha: float = 0.05):
        self.alpha = alpha

    def bonferroni(self, p_values: np.ndarray) -> dict:
        """Bonferroni correction (FWER control)."""
        m = len(p_values)
        threshold = self.alpha / m
        rejected = p_values <= threshold
        return {
            'method': 'Bonferroni',
            'threshold': threshold,
            'rejected': rejected,
            'n_rejected': np.sum(rejected),
            'adjusted_pvalues': np.minimum(p_values * m, 1.0),
        }

    def holm(self, p_values: np.ndarray) -> dict:
        """Holm-Bonferroni step-down (FWER control)."""
        m = len(p_values)
        sorted_idx = np.argsort(p_values)
        sorted_p = p_values[sorted_idx]
        rejected = np.zeros(m, dtype=bool)

        for i, p in enumerate(sorted_p):
            if p <= self.alpha / (m - i):
                rejected[sorted_idx[i]] = True
            else:
                break

        return {
            'method': 'Holm',
            'rejected': rejected,
            'n_rejected': np.sum(rejected),
        }

    def benjamini_hochberg(self, p_values: np.ndarray) -> dict:
        """Benjamini-Hochberg procedure (FDR control)."""
        m = len(p_values)
        sorted_idx = np.argsort(p_values)
        sorted_p = p_values[sorted_idx]

        # Find largest k such that p_(k) <= k/m * alpha
        thresholds = np.arange(1, m + 1) / m * self.alpha
        k_star = 0
        for i in range(m):
            if sorted_p[i] <= thresholds[i]:
                k_star = i + 1

        rejected = np.zeros(m, dtype=bool)
        if k_star > 0:
            rejected[sorted_idx[:k_star]] = True

        # Adjusted p-values
        adjusted = np.zeros(m)
        for i in range(m):
            adjusted[sorted_idx[i]] = min(
                sorted_p[i] * m / (i + 1), 1.0
            )

        return {
            'method': 'Benjamini-Hochberg',
            'k_star': k_star,
            'rejected': rejected,
            'n_rejected': np.sum(rejected),
            'adjusted_pvalues': adjusted,
            'fdr_threshold': thresholds[k_star - 1] if k_star > 0 else 0,
        }

    def compare_methods(self, p_values: np.ndarray) -> dict:
        """Compare all correction methods."""
        return {
            'uncorrected': np.sum(p_values <= self.alpha),
            'bonferroni': self.bonferroni(p_values)['n_rejected'],
            'holm': self.holm(p_values)['n_rejected'],
            'bh_fdr': self.benjamini_hochberg(p_values)['n_rejected'],
        }

# Simulate: testing 50 momentum strategies on Nifty 50
np.random.seed(42)
n_strategies = 50

# Most are noise (null), a few have real signal
n_real = 5  # 5 strategies have real alpha
p_values = np.zeros(n_strategies)

# Null strategies (no alpha)
for i in range(n_strategies - n_real):
    # Generate random t-stat from null distribution
    t = np.random.standard_t(df=250)
    p_values[i] = 2 * stats.t.sf(abs(t), df=250)

# Real strategies (have alpha, small p-values)
for i in range(n_real):
    # Real signal: t-stat around 2.5-3.5
    t = np.random.uniform(2.5, 3.5)
    p_values[n_strategies - n_real + i] = 2 * stats.t.sf(t, df=250)

# Apply corrections
corrector = MultipleTestingCorrector(alpha=0.05)

print("=== Multiple Testing Correction Results ===")
print(f"Strategies tested: {n_strategies}")
print(f"True signals: {n_real}")
print(f"Significance level: {corrector.alpha}\\n")

comparison = corrector.compare_methods(p_values)
for method, n_rej in comparison.items():
    fp = max(0, n_rej - n_real) if n_rej > 0 else 0
    print(f"  {method:15s}: {n_rej} rejected "
          f"(true positives: {min(n_rej, n_real)}, "
          f"false positives: {fp})")

# Detailed BH results
bh = corrector.benjamini_hochberg(p_values)
print(f"\\n=== Benjamini-Hochberg Details ===")
print(f"  FDR threshold: {bh['fdr_threshold']:.6f}")
print(f"  k*: {bh['k_star']}")
print(f"\\n  Accepted strategies:")
for i, (rej, p) in enumerate(zip(bh['rejected'], p_values)):
    if rej:
        is_real = i >= n_strategies - n_real
        print(f"    Strategy {i+1}: p={p:.6f} "
              f"{'[REAL SIGNAL]' if is_real else '[FALSE POSITIVE!]'}")`}
      />

      <ExampleBlock
        title="Correcting for Data Snooping in NSE Research"
        difficulty="advanced"
        problem="You tested 30 different momentum lookback periods (1-30 months) on Nifty 500. The best performer (12-month lookback) has t-stat = 3.2. After Bonferroni correction, is this still significant?"
        solution={[
          {
            step: 'Raw p-value for t = 3.2',
            formula: 'p = 2 \\times \\Phi(-3.2) = 2 \\times 0.000687 = 0.00137',
            explanation: 'The uncorrected p-value is 0.137%, well below 5%.',
          },
          {
            step: 'Bonferroni correction',
            formula: '\\alpha_{\\text{Bonf}} = \\frac{0.05}{30} = 0.00167',
            explanation: 'With 30 tests, the corrected threshold is 0.167%.',
          },
          {
            step: 'Compare',
            formula: 'p = 0.00137 < \\alpha_{\\text{Bonf}} = 0.00167 \\; \\checkmark',
            explanation: 'The result survives Bonferroni correction. The t-stat of 3.2 is strong enough to withstand correction for 30 tests.',
          },
          {
            step: 'Harvey et al. (2016) threshold',
            formula: 't_{\\text{Harvey}} = 3.0 \\text{ (recommended for finance)}',
            explanation: 'Harvey, Liu, and Zhu (2016) recommend t > 3.0 as a universal threshold for new factors, accounting for the hundreds of factors tested across the literature. Your t = 3.2 passes this threshold.',
          },
        ]}
      />

      <NoteBlock title="The Harvey-Liu-Zhu t-Statistic Hurdle" type="warning">
        <p>
          Harvey, Liu, and Zhu (2016) famously argued that the traditional t &gt; 2 threshold
          is insufficient for new factor discovery because hundreds of factors have been tested
          across the finance literature. They recommend:
        </p>
        <ul className="mt-2 list-disc list-inside space-y-1">
          <li><strong>t &gt; 3.0</strong> for new single-sorted portfolios</li>
          <li><strong>t &gt; 3.5</strong> for double-sorted or conditional strategies</li>
          <li>For Indian market strategies, adjust based on the number of YOUR tests</li>
          <li>Always report the number of configurations tested alongside results</li>
        </ul>
      </NoteBlock>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Practical Application: Indian Factor Zoo
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The Indian factor zoo contains hundreds of proposed alpha signals for NSE. Without
        proper correction, most published results are likely false discoveries. Here is a
        framework for evaluating published Indian market factors:
      </p>

      <PythonCode
        title="indian_factor_evaluation.py"
        runnable
        code={`import numpy as np
from scipy import stats

def evaluate_indian_factor(factor_name, t_stat, n_tests_reported,
                           n_tests_estimated, sample_years,
                           universe='Nifty500'):
    """Evaluate an Indian market factor for false discovery risk."""

    # Raw p-value
    p_raw = 2 * stats.t.sf(abs(t_stat), df=sample_years * 252 - 2)

    # Bonferroni correction for reported tests
    p_bonf_reported = min(p_raw * n_tests_reported, 1.0)

    # Bonferroni for estimated total tests
    p_bonf_estimated = min(p_raw * n_tests_estimated, 1.0)

    # Harvey et al threshold
    harvey_pass = abs(t_stat) >= 3.0

    # Minimum Sharpe for significance
    min_sharpe = 1.96 / np.sqrt(sample_years * 252)
    observed_sharpe = t_stat / np.sqrt(sample_years * 252) * np.sqrt(252)

    return {
        'factor': factor_name,
        't_stat': t_stat,
        'p_raw': p_raw,
        'p_bonf_reported': p_bonf_reported,
        'p_bonf_estimated': p_bonf_estimated,
        'harvey_pass': harvey_pass,
        'observed_sharpe': observed_sharpe,
        'verdict': (
            'LIKELY GENUINE' if harvey_pass and p_bonf_estimated < 0.05
            else 'POSSIBLY GENUINE' if p_bonf_reported < 0.05
            else 'LIKELY FALSE DISCOVERY'
        )
    }

# Evaluate popular Indian market factors
factors = [
    ('12-1 Momentum (Nifty 500)', 3.8, 5, 50, 15),
    ('P/E Value Factor', 2.4, 3, 30, 20),
    ('FII Flow Signal', 2.9, 10, 100, 8),
    ('Promoter Holding Change', 2.1, 5, 40, 10),
    ('Quality (ROE)', 3.2, 4, 25, 15),
    ('Low Volatility', 2.7, 8, 60, 12),
    ('Earnings Revision', 3.5, 3, 20, 10),
    ('Smallcap Illiquidity', 2.0, 6, 80, 8),
]

print("=== Indian Factor Zoo Evaluation ===")
print(f"{'Factor':<30} {'t-stat':>6} {'p_raw':>8} {'p_Bonf':>8} "
      f"{'Harvey':>7} {'Verdict':<25}")
print("-" * 90)

for name, t, n_rep, n_est, years in factors:
    result = evaluate_indian_factor(name, t, n_rep, n_est, years)
    harvey = "PASS" if result['harvey_pass'] else "FAIL"
    print(f"{name:<30} {t:>6.1f} {result['p_raw']:>8.4f} "
          f"{result['p_bonf_estimated']:>8.4f} {harvey:>7} "
          f"{result['verdict']:<25}")

# How many factors survive correction?
genuine = sum(1 for name, t, n_rep, n_est, years in factors
              if evaluate_indian_factor(name, t, n_rep, n_est, years)['harvey_pass'])
print(f"\\nFactors passing Harvey threshold: {genuine}/{len(factors)}")
print(f"Expected false discoveries (uncorrected): "
      f"{sum(1 for _,t,_,_,_ in factors if abs(t) > 1.96) - genuine}")`}
      />

      <ExampleBlock
        title="The Deflated t-Statistic for Indian Markets"
        difficulty="advanced"
        problem="A researcher reports 15 different factor strategies for Nifty 500, with the best achieving t-stat of 2.8. Using the deflated t-statistic approach, what is the adjusted significance?"
        solution={[
          {
            step: 'Calculate the expected maximum t-stat under null',
            formula: 'E[\\max(t_1, \\ldots, t_{15})] \\approx \\sqrt{2 \\ln(15)} = \\sqrt{2 \\times 2.71} = 2.33',
            explanation: 'Under the null hypothesis where all strategies have zero alpha, the expected maximum t-statistic from 15 independent tests is approximately 2.33.',
          },
          {
            step: 'Compute the deflated t-statistic',
            formula: 't_{\\text{deflated}} = 2.8 - 2.33 = 0.47',
            explanation: 'Subtracting the expected maximum under the null gives a deflated t of only 0.47, which is not significant at any reasonable level.',
          },
          {
            step: 'Assess using Bonferroni',
            formula: 't_{\\text{Bonf}} = \\Phi^{-1}(1 - 0.05/(2 \\times 15)) = 3.16',
            explanation: 'The Bonferroni-corrected critical value for 15 tests at 5% is 3.16. The observed t = 2.8 fails this threshold.',
          },
          {
            step: 'Conclusion',
            formula: '\\text{The best strategy is NOT significant after correction}',
            explanation: 'Despite appearing significant at the 5% level individually (t = 2.8 > 1.96), after accounting for 15 tests, the result is likely a false discovery. The researcher needs either a stronger signal or fewer tests.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Multiple testing correction is <strong>non-negotiable</strong> in quantitative
          research. Use Bonferroni for conservative FWER control when you need certainty
          that no false positives slip through. Use Benjamini-Hochberg for FDR control when
          you can tolerate some false positives among a pool of discoveries. For Indian
          market research with typical test counts of 20--100, BH-FDR provides the best
          balance of power and false discovery control. Always report the number of tests
          alongside any significant result.
        </p>
      </NoteBlock>
    </div>
  )
}
