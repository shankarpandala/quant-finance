import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveCrowdWisdom() {
  const [numForecasters, setNumForecasters] = useState(100)
  const [diversityIndex, setDiversityIndex] = useState(0.6)
  const [informationDecay, setInformationDecay] = useState(0.3)

  const trueValue = 22500
  const individualError = 800
  const crowdError = individualError / Math.sqrt(numForecasters * diversityIndex)
  const decayedCrowdError = crowdError / (1 - informationDecay)
  const crowdEstimate = trueValue + (Math.sin(numForecasters * 0.1) * crowdError * 0.3)
  const accuracy = Math.max(0, 100 - (decayedCrowdError / trueValue) * 100 * 10)

  const forecasters = Array.from({ length: Math.min(numForecasters, 20) }, (_, i) => {
    const bias = Math.sin(i * 2.3) * individualError
    return trueValue + bias
  })

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Crowd Wisdom for NIFTY 50 Forecasting
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust the number of independent forecasters, opinion diversity, and information
        decay to see how crowd wisdom improves NIFTY 50 target prediction.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Forecasters: {numForecasters}</span>
          <input type="range" min="5" max="500" step="5" value={numForecasters}
            onChange={e => setNumForecasters(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Diversity Index: {diversityIndex.toFixed(2)}</span>
          <input type="range" min="0.1" max="1" step="0.05" value={diversityIndex}
            onChange={e => setDiversityIndex(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Info Decay: {(informationDecay * 100).toFixed(0)}%</span>
          <input type="range" min="0" max="0.8" step="0.05" value={informationDecay}
            onChange={e => setInformationDecay(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 500 180" className="w-full max-w-lg mx-auto block" aria-label="Crowd wisdom visualization">
        {/* True value line */}
        <line x1="50" y1="90" x2="450" y2="90" stroke="#6366f1" strokeWidth="2" strokeDasharray="5,5" />
        <text x="455" y="93" className="text-[9px]" fill="#6366f1">True: {trueValue}</text>

        {/* Individual forecasts */}
        {forecasters.map((f, i) => {
          const x = 60 + i * 19
          const y = 90 - (f - trueValue) / 20
          return (
            <circle key={i} cx={x} cy={Math.max(20, Math.min(160, y))} r="3"
              fill="#94a3b8" opacity="0.6" />
          )
        })}

        {/* Crowd estimate */}
        <circle cx="250" cy={90 - (crowdEstimate - trueValue) / 20} r="8"
          fill="#4ade80" stroke="#16a34a" strokeWidth="2" />
        <text x="265" y={85 - (crowdEstimate - trueValue) / 20} className="text-[9px] font-semibold" fill="#16a34a">
          Crowd: {crowdEstimate.toFixed(0)}
        </text>

        {/* Error band */}
        <rect x="50" y={90 - decayedCrowdError / 8} width="400"
          height={decayedCrowdError / 4} fill="#4ade80" opacity="0.1" />

        <text x="250" y="175" textAnchor="middle" className="text-[10px] fill-gray-500">
          Crowd Error: {decayedCrowdError.toFixed(0)} pts | Accuracy: {accuracy.toFixed(1)}%
        </text>
      </svg>

      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        Individual error: <InlineMath math={`\\pm ${individualError}`} /> pts |
        Crowd error: <InlineMath math={`\\pm ${decayedCrowdError.toFixed(0)}`} /> pts |
        <span className="font-semibold"> {(individualError / decayedCrowdError).toFixed(1)}x improvement</span>
      </p>
    </div>
  )
}

export default function CrowdWisdom() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Wisdom of Crowds and Prediction Markets
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The wisdom of crowds principle -- that aggregated opinions of a diverse group
        can outperform individual experts -- has powerful applications in Indian
        financial markets. From analyst consensus estimates to social media sentiment
        aggregation, crowd intelligence provides a robust signal when properly
        extracted and calibrated.
      </p>

      <DefinitionBlock
        title="Wisdom of Crowds"
        label="Definition 2.1"
        definition="The wisdom of crowds is the phenomenon where the aggregate estimate of a group of independent individuals converges to the true value more accurately than any individual estimate, provided the group exhibits sufficient diversity, independence, and decentralization. This is a direct consequence of the law of large numbers applied to forecasting."
        notation={<>For <InlineMath math="N" /> independent forecasters with individual error variance <InlineMath math="\sigma^2" />, the crowd's mean squared error scales as <InlineMath math="\text{MSE}_{\text{crowd}} = \sigma^2 / N" />, yielding a <InlineMath math="\sqrt{N}" /> improvement.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Mathematical Framework
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Surowiecki's conditions for crowd wisdom can be formalized. Let each forecaster
        produce estimate <InlineMath math="\hat{y}_i = y^* + \epsilon_i" /> where{' '}
        <InlineMath math="y^*" /> is the true value and <InlineMath math="\epsilon_i" /> is
        the individual error. The crowd estimate is:
      </p>

      <BlockMath math="\bar{y} = \frac{1}{N} \sum_{i=1}^{N} \hat{y}_i = y^* + \frac{1}{N} \sum_{i=1}^{N} \epsilon_i" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        When errors are independent and unbiased (<InlineMath math="\mathbb{E}[\epsilon_i] = 0" />):
      </p>

      <BlockMath math="\text{Var}(\bar{y}) = \frac{\text{Var}(\epsilon_i)}{N} = \frac{\sigma^2}{N}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        However, when forecasters share information (reducing diversity), the effective
        sample size decreases:
      </p>

      <BlockMath math="\text{Var}(\bar{y}) = \frac{\sigma^2}{N_{\text{eff}}} = \frac{\sigma^2}{N \cdot D}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="D \in (0, 1]" /> is the diversity index, measuring the
        degree of independence among forecaster opinions.
      </p>

      <TheoremBlock
        title="Diversity Prediction Theorem (Page)"
        label="Theorem 2.1"
        statement={<>The collective error of a crowd equals the average individual error minus the diversity of predictions: <BlockMath math="\underbrace{(\bar{y} - y^*)^2}_{\text{Crowd Error}} = \underbrace{\frac{1}{N}\sum_i (\hat{y}_i - y^*)^2}_{\text{Avg Individual Error}} - \underbrace{\frac{1}{N}\sum_i (\hat{y}_i - \bar{y})^2}_{\text{Prediction Diversity}}" /> This implies that a diverse crowd always outperforms the average individual, and increasing diversity (holding accuracy constant) always improves crowd performance.</>}
        proof={<>Expand the left side: <InlineMath math="(\bar{y} - y^*)^2 = \frac{1}{N^2}\left(\sum_i (\hat{y}_i - y^*)\right)^2" />. Add and subtract <InlineMath math="\bar{y}" /> inside each individual error: <InlineMath math="(\hat{y}_i - y^*) = (\hat{y}_i - \bar{y}) + (\bar{y} - y^*)" />. Expanding and simplifying yields the identity. The cross-terms vanish because <InlineMath math="\sum_i (\hat{y}_i - \bar{y}) = 0" /> by definition of the mean.</>}
      />

      <InteractiveCrowdWisdom />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Applications in Indian Markets
      </h3>
      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Application</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Crowd Source</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Signal</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Effectiveness</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Earnings Estimates</td>
              <td className="px-4 py-2">Analyst consensus</td>
              <td className="px-4 py-2">EPS forecast</td>
              <td className="px-4 py-2">High (for large-caps)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">NIFTY Target</td>
              <td className="px-4 py-2">Strategist surveys</td>
              <td className="px-4 py-2">Index level forecast</td>
              <td className="px-4 py-2">Medium</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">IPO Demand</td>
              <td className="px-4 py-2">Grey market premium</td>
              <td className="px-4 py-2">Listing gain estimate</td>
              <td className="px-4 py-2">Medium--High</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Sector Rotation</td>
              <td className="px-4 py-2">Fund flow data</td>
              <td className="px-4 py-2">Sector preference</td>
              <td className="px-4 py-2">Medium</td>
            </tr>
          </tbody>
        </table>
      </div>

      <PythonCode
        title="crowd_wisdom_aggregator.py"
        runnable
        code={`import numpy as np

class CrowdWisdomAggregator:
    """Aggregate crowd forecasts with diversity weighting."""

    def __init__(self, min_forecasters=5):
        self.min_forecasters = min_forecasters

    def simple_average(self, forecasts):
        """Equal-weight average (baseline)."""
        return np.mean(forecasts)

    def trimmed_mean(self, forecasts, trim_pct=0.1):
        """Trim extreme outliers before averaging."""
        sorted_f = np.sort(forecasts)
        n = len(sorted_f)
        trim_n = int(n * trim_pct)
        return np.mean(sorted_f[trim_n:n - trim_n]) if trim_n > 0 else np.mean(sorted_f)

    def credibility_weighted(self, forecasts, track_records):
        """Weight by historical accuracy."""
        weights = np.array([max(0.01, tr) for tr in track_records])
        return np.average(forecasts, weights=weights)

    def diversity_index(self, forecasts):
        """Compute prediction diversity (variance of forecasts)."""
        return np.var(forecasts) / (np.mean(np.abs(forecasts - np.mean(forecasts)))**2 + 1e-8)

    def page_decomposition(self, forecasts, true_value):
        """Apply the Diversity Prediction Theorem."""
        crowd_estimate = np.mean(forecasts)
        crowd_error = (crowd_estimate - true_value) ** 2
        avg_individual_error = np.mean((forecasts - true_value) ** 2)
        diversity = np.mean((forecasts - crowd_estimate) ** 2)
        return {
            'crowd_error': crowd_error,
            'avg_individual_error': avg_individual_error,
            'diversity': diversity,
            'diversity_benefit': avg_individual_error - crowd_error,
            'identity_check': abs(crowd_error - (avg_individual_error - diversity))
        }

# Simulate NIFTY 50 year-end target forecasts
np.random.seed(42)
true_nifty = 22500

# Analyst forecasts with varying skill and bias
n_analysts = 50
forecasts = true_nifty + np.random.normal(200, 800, n_analysts)
track_records = np.random.beta(3, 2, n_analysts)  # historical accuracy

# Grey market premium forecasters (noisier, retail)
n_retail = 200
retail_forecasts = true_nifty + np.random.normal(-100, 1200, n_retail)

agg = CrowdWisdomAggregator()

print("=" * 60)
print("CROWD WISDOM: NIFTY 50 TARGET FORECASTING")
print(f"True Value: {true_nifty}")
print("=" * 60)

# Analyst crowd
print("\\n--- Analyst Crowd (N=50) ---")
methods = {
    'Simple Average': agg.simple_average(forecasts),
    'Trimmed Mean (10%)': agg.trimmed_mean(forecasts, 0.1),
    'Credibility-Weighted': agg.credibility_weighted(forecasts, track_records),
}
for name, estimate in methods.items():
    error = abs(estimate - true_nifty)
    print(f"  {name:25s}: {estimate:.0f}  (error: {error:.0f} pts)")

# Diversity analysis
decomp = agg.page_decomposition(forecasts, true_nifty)
print(f"\\n--- Diversity Prediction Theorem ---")
print(f"  Crowd Error:          {decomp['crowd_error']:.0f}")
print(f"  Avg Individual Error: {decomp['avg_individual_error']:.0f}")
print(f"  Prediction Diversity: {decomp['diversity']:.0f}")
print(f"  Diversity Benefit:    {decomp['diversity_benefit']:.0f}")

# Retail vs analyst
print(f"\\n--- Analyst vs Retail Crowd ---")
analyst_error = abs(agg.simple_average(forecasts) - true_nifty)
retail_error = abs(agg.simple_average(retail_forecasts) - true_nifty)
combined = np.concatenate([forecasts, retail_forecasts])
combined_error = abs(agg.simple_average(combined) - true_nifty)
print(f"  Analyst crowd error:  {analyst_error:.0f} pts (N={n_analysts})")
print(f"  Retail crowd error:   {retail_error:.0f} pts (N={n_retail})")
print(f"  Combined crowd error: {combined_error:.0f} pts (N={len(combined)})")
print(f"  Diversity index:      {agg.diversity_index(combined):.3f}")`}
      />

      <ExampleBlock
        title="IPO Grey Market Premium as Crowd Signal"
        difficulty="intermediate"
        problem="An upcoming IPO on NSE has issue price Rs 500. The grey market premium (GMP) from 3 different tracking platforms shows Rs 120, Rs 95, and Rs 140 respectively, based on 500, 200, and 300 data points. Platform historical accuracy (correlation with actual listing gain) is 0.65, 0.45, and 0.70. Compute the credibility-weighted expected listing price."
        solution={[
          {
            step: 'Normalize weights by volume and accuracy',
            formula: 'w_i = n_i \\cdot \\rho_i \\implies w_1 = 325, \\; w_2 = 90, \\; w_3 = 210',
          },
          {
            step: 'Compute weighted GMP',
            formula: '\\text{GMP}_{\\text{crowd}} = \\frac{325(120) + 90(95) + 210(140)}{325 + 90 + 210}',
          },
          {
            step: 'Calculate',
            formula: '= \\frac{39000 + 8550 + 29400}{625} = \\frac{76950}{625} = 123.12',
          },
          {
            step: 'Expected listing price',
            formula: '\\text{Listing Price} = 500 + 123.12 = \\text{Rs } 623.12',
            explanation: 'The credibility-weighted crowd estimate suggests a ~24.6% listing gain, giving more weight to platforms with better track records and more data points.',
          },
        ]}
      />

      <NoteBlock title="When Crowds Fail" type="warning">
        <p>
          Crowd wisdom breaks down when Surowiecki's conditions are violated. In Indian
          markets, common failure modes include: herding during market manias (2007 peak,
          2021 small-cap bubble), information cascades on WhatsApp stock tip groups where
          everyone copies the same "expert," and anchoring to prominent CNBC-TV18
          commentator targets. The diversity condition is most frequently violated --
          when everyone reads the same Moneycontrol article, the effective sample size
          collapses regardless of the number of forecasters.
        </p>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Crowd wisdom is a mathematically grounded framework for aggregating diverse
          opinions into superior forecasts. In Indian markets, it applies to analyst
          consensus, social media sentiment aggregation, and grey market pricing. The
          critical insight from the Diversity Prediction Theorem is that diversity
          of opinion is just as important as individual accuracy -- making
          heterogeneous crowds of retail and institutional participants potentially
          more valuable than homogeneous expert panels.
        </p>
      </NoteBlock>
    </div>
  )
}
