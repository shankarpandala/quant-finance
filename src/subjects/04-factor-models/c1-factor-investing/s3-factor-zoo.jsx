import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveFactorZoo() {
  const [numFactors, setNumFactors] = useState(50)
  const [significance, setSignificance] = useState(5)
  const [numTests, setNumTests] = useState(200)

  const singleTestProb = significance / 100
  const falseDiscoveries = numTests * singleTestProb
  const bonferroni = significance / numTests
  const byCritical = 1.96 + 0.4 * Math.log(numTests / 10)
  const genuineFactors = Math.max(3, Math.round(numFactors * 0.15))
  const spuriousFactors = numFactors - genuineFactors
  const fdr = spuriousFactors / numFactors * 100

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Multiple Testing and the Factor Zoo
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        See how testing many factors inflates false discoveries. Adjust parameters to
        understand the p-hacking risk in Indian equity factor research.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Candidate Factors: {numFactors}</span>
          <input type="range" min="10" max="400" step="10" value={numFactors}
            onChange={e => setNumFactors(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Significance Level: {significance}%</span>
          <input type="range" min="1" max="10" step="0.5" value={significance}
            onChange={e => setSignificance(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Tests Conducted: {numTests}</span>
          <input type="range" min="10" max="1000" step="10" value={numTests}
            onChange={e => setNumTests(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/30">
          <p className="text-xs font-semibold text-red-700 dark:text-red-300">Expected False Discoveries</p>
          <p className="text-lg font-bold text-red-800 dark:text-red-200">{falseDiscoveries.toFixed(0)}</p>
        </div>
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">Bonferroni Threshold</p>
          <p className="text-lg font-bold text-blue-800 dark:text-blue-200">{(bonferroni * 100).toFixed(3)}%</p>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
          <p className="text-xs font-semibold text-purple-700 dark:text-purple-300">Adj. t-stat Threshold</p>
          <p className="text-lg font-bold text-purple-800 dark:text-purple-200">{byCritical.toFixed(2)}</p>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">Est. Genuine Factors</p>
          <p className="text-lg font-bold text-amber-800 dark:text-amber-200">{genuineFactors}</p>
          <p className="text-xs text-amber-600 dark:text-amber-400">of {numFactors} candidates</p>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
        {falseDiscoveries > 10
          ? <span className="font-semibold text-red-500">High risk of spurious factors! Use stricter thresholds (t &gt; 3.0).</span>
          : <span className="font-semibold text-green-600 dark:text-green-400">Multiple testing is manageable at this scale.</span>
        }
      </p>
    </div>
  )
}

export default function FactorZoo() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        The Factor Zoo: Taming Hundreds of Signals
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Academic finance has discovered over 400 factors that supposedly predict stock returns.
        Harvey, Liu, and Zhu (2016) famously declared: "most claimed research findings in
        financial economics are likely false." This section examines the factor proliferation
        problem, multiple testing corrections, and practical strategies for separating
        genuine signals from noise in Indian equity markets.
      </p>

      <DefinitionBlock
        title="The Factor Zoo Problem"
        label="Definition 1.5"
        definition="The 'factor zoo' refers to the proliferation of published factors that predict cross-sectional stock returns. With over 400 factors published by 2020, many are likely spurious -- artifacts of data mining, p-hacking, or overfitting to specific sample periods. The challenge is to identify the small number of genuine factors from this zoo."
        notation="P(\text{false discovery}) = 1 - (1-p)^N \approx Np \text{ for small } p \text{ and large } N"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Multiple Testing Problem
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        If you test 200 factor candidates at the 5% significance level, you expect to find
        10 "significant" factors purely by chance, even if none are genuinely predictive:
      </p>

      <BlockMath math="E[\text{false positives}] = N \times \alpha = 200 \times 0.05 = 10" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Harvey et al. (2016) propose a much stricter threshold. Instead of the traditional
        t-statistic cutoff of 1.96, they recommend:
      </p>

      <BlockMath math="|t| > 3.0 \quad \text{(Harvey-Liu-Zhu criterion for new factors)}" />

      <TheoremBlock
        title="Benjamini-Hochberg False Discovery Rate"
        label="Theorem 1.3"
        statement="The Benjamini-Hochberg (BH) procedure controls the expected proportion of false discoveries among rejected hypotheses. Order the p-values p_(1) <= p_(2) <= ... <= p_(N) and find the largest k such that p_(k) <= k*alpha/N."
        formula="\text{Reject } H_0^{(i)} \text{ for all } i \leq k^*, \quad k^* = \max\left\{k : p_{(k)} \leq \frac{k \cdot \alpha}{N}\right\}"
        proof="The BH procedure guarantees that the False Discovery Rate FDR = E[V/R] \leq \alpha, where V is the number of false rejections and R is the total number of rejections. The proof (Benjamini and Hochberg, 1995) shows this holds when test statistics are independent or positively dependent. For factor research on NSE, where factors are often correlated (e.g., value and quality overlap significantly for Indian stocks), the BH procedure remains valid under PRDS (positive regression dependency on subsets)."
      />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Factor Category</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Published Count</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Likely Genuine</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">India Evidence</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Value (P/B, P/E, etc.)</td>
              <td className="px-4 py-2">~50</td>
              <td className="px-4 py-2">5-8</td>
              <td className="px-4 py-2">P/B, earnings yield strong</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Momentum</td>
              <td className="px-4 py-2">~40</td>
              <td className="px-4 py-2">3-5</td>
              <td className="px-4 py-2">12-1 month momentum works</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Quality/Profitability</td>
              <td className="px-4 py-2">~60</td>
              <td className="px-4 py-2">4-6</td>
              <td className="px-4 py-2">ROE, gross margin effective</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Low Volatility</td>
              <td className="px-4 py-2">~20</td>
              <td className="px-4 py-2">2-3</td>
              <td className="px-4 py-2">Strong on NSE (beta anomaly)</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Technical/Micro</td>
              <td className="px-4 py-2">~230</td>
              <td className="px-4 py-2">5-10</td>
              <td className="px-4 py-2">Mixed results on NSE</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveFactorZoo />

      <NoteBlock title="India-Specific Factor Survival" type="info">
        <ul className="space-y-2">
          <li>
            <strong>Robust in India:</strong> Momentum (12-1), Value (P/B), Quality (ROE),
            Low Volatility, Size (small-cap premium) -- these survive multiple testing
            corrections on NSE data from 2000-2024.
          </li>
          <li>
            <strong>Weak in India:</strong> Many US-discovered micro-structure signals (short
            interest, options implied vol) fail on NSE due to lower derivative liquidity and
            different market structure.
          </li>
          <li>
            <strong>India-Unique:</strong> Promoter holding changes (SEBI disclosed), domestic
            institutional flows, and festive season effects may be India-specific factors not
            captured in US-based factor zoos.
          </li>
        </ul>
      </NoteBlock>

      <PythonCode
        title="factor_zoo_testing.py"
        runnable
        code={`import numpy as np
from scipy.stats import norm

np.random.seed(42)

# Simulate factor research: testing many candidates on NSE data
n_stocks = 500   # NSE 500 universe
n_months = 120   # 10 years
n_factors = 200  # Candidate factors tested
n_genuine = 10   # Truly predictive factors

# Generate stock returns (cross-sectional, each month)
# Most factors are noise; a few are genuine
factor_t_stats = np.zeros(n_factors)
factor_names = [f"Factor_{i+1}" for i in range(n_factors)]

for i in range(n_factors):
    if i < n_genuine:
        # Genuine factor with true IC ~0.05
        true_ic = 0.05 + np.random.uniform(-0.02, 0.03)
        t_stat = true_ic * np.sqrt(n_months * n_stocks) / np.sqrt(1 - true_ic**2)
        # Scale to reasonable range
        factor_t_stats[i] = np.random.normal(true_ic * np.sqrt(n_months) * 2, 0.5)
    else:
        # Spurious factor (noise)
        factor_t_stats[i] = np.random.normal(0, 1)

# Add some data-mined "significant" noise factors
for i in range(n_genuine, n_genuine + 15):
    factor_t_stats[i] = np.random.uniform(2.0, 3.5)  # Look significant but spurious

# --- Traditional Testing (|t| > 1.96) ---
significant_traditional = np.sum(np.abs(factor_t_stats) > 1.96)
false_discoveries_trad = np.sum(np.abs(factor_t_stats[n_genuine:]) > 1.96)

# --- Harvey-Liu-Zhu (|t| > 3.0) ---
significant_hlz = np.sum(np.abs(factor_t_stats) > 3.0)
false_discoveries_hlz = np.sum(np.abs(factor_t_stats[n_genuine:]) > 3.0)

# --- Bonferroni Correction ---
bonferroni_threshold = norm.ppf(1 - 0.05 / (2 * n_factors))
significant_bonf = np.sum(np.abs(factor_t_stats) > bonferroni_threshold)

# --- BH Procedure ---
p_values = 2 * norm.sf(np.abs(factor_t_stats))
sorted_indices = np.argsort(p_values)
sorted_p = p_values[sorted_indices]
bh_threshold = 0.05 * np.arange(1, n_factors + 1) / n_factors
k_star = 0
for k in range(n_factors):
    if sorted_p[k] <= bh_threshold[k]:
        k_star = k + 1
significant_bh = k_star
genuine_in_bh = sum(1 for idx in sorted_indices[:k_star] if idx < n_genuine)
fdr_bh = 1 - genuine_in_bh / max(significant_bh, 1)

print("=== Factor Zoo Analysis: Multiple Testing Corrections ===")
print(f"Total factors tested: {n_factors}")
print(f"Truly genuine factors: {n_genuine}")
print(f"\\n{'Method':<25} {'Significant':>12} {'Genuine':>10} {'False Disc':>12} {'FDR':>8}")
print("-" * 70)
print(f"{'Traditional (t>1.96)':<25} {significant_traditional:>12} {np.sum(np.abs(factor_t_stats[:n_genuine]) > 1.96):>10} {false_discoveries_trad:>12} {false_discoveries_trad/max(significant_traditional,1)*100:>7.0f}%")
print(f"{'HLZ (t>3.0)':<25} {significant_hlz:>12} {np.sum(np.abs(factor_t_stats[:n_genuine]) > 3.0):>10} {false_discoveries_hlz:>12} {false_discoveries_hlz/max(significant_hlz,1)*100:>7.0f}%")
print(f"{'Bonferroni':<25} {significant_bonf:>12} {np.sum(np.abs(factor_t_stats[:n_genuine]) > bonferroni_threshold):>10}")
print(f"{'Benjamini-Hochberg':<25} {significant_bh:>12} {genuine_in_bh:>10} {significant_bh-genuine_in_bh:>12} {fdr_bh*100:>7.0f}%")
print(f"\\nBonferroni t-threshold: {bonferroni_threshold:.2f}")
print(f"\\nConclusion: Traditional testing finds {significant_traditional} 'significant' factors,")
print(f"but {false_discoveries_trad} are false discoveries ({false_discoveries_trad/max(significant_traditional,1)*100:.0f}% FDR).")
print(f"The HLZ criterion (t>3.0) dramatically reduces false discoveries.")`}
      />

      <ExampleBlock
        title="Should You Trust a New Indian Factor?"
        difficulty="intermediate"
        problem="A researcher claims to have found a new factor on NSE: 'festive season momentum' with t-stat = 2.3. They tested 150 factor candidates. Should you trust this result?"
        solution={[
          {
            step: 'Apply multiple testing lens',
            formula: 'E[\\text{false positives}] = 150 \\times 0.05 = 7.5',
            explanation: 'Testing 150 factors at 5% significance, we expect ~7-8 false positives purely by chance.',
          },
          {
            step: 'HLZ criterion',
            formula: '|t| = 2.3 < 3.0',
            explanation: 'The t-statistic fails the Harvey-Liu-Zhu threshold of 3.0 for new factors.',
          },
          {
            step: 'Verdict',
            formula: '\\text{Insufficient evidence to claim genuine factor}',
            explanation: 'With 150 tests conducted, a t-stat of 2.3 is consistent with data mining. To be convincing, the factor needs: (a) out-of-sample validation on a hold-out period, (b) economic rationale, (c) t-stat > 3.0, and (d) robustness across BSE vs NSE, different time periods, and various construction methodologies.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          The factor zoo is a cautionary tale about data mining. Of 400+ published factors,
          perhaps 10-20 are genuinely priced risks. For Indian quant strategies, focus on
          the "big five" that survive rigorous testing: <strong>Market, Size, Value, Momentum,
          and Quality</strong>. Use the HLZ threshold (t &gt; 3.0) for any new factor claims
          and always demand out-of-sample validation, especially on Indian data which has a
          shorter history than US markets.
        </p>
      </NoteBlock>
    </div>
  )
}
