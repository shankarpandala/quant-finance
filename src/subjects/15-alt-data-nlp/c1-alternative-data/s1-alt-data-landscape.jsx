import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveAltDataExplorer() {
  const [category, setCategory] = useState('satellite')
  const categories = {
    satellite: { name: 'Satellite Imagery', alpha: 0.65, decay: 30, cost: 'High', coverage: 'Retail, Auto, Energy', examples: ['Parking lot counts at Reliance Retail', 'Construction activity in Tier-2 cities', 'Port activity at Adani ports'] },
    upi: { name: 'UPI/Payments Data', alpha: 0.72, decay: 7, cost: 'Medium', coverage: 'Fintech, Banks, FMCG', examples: ['PhonePe/GPay transaction volumes', 'Paytm merchant payment trends', 'UPI penetration in rural India'] },
    employment: { name: 'Job Postings', alpha: 0.55, decay: 45, cost: 'Low', coverage: 'IT, BFSI, Manufacturing', examples: ['Naukri.com job index', 'LinkedIn hiring trends India', 'IT freshers demand signal'] },
    web: { name: 'Web Traffic/App Data', alpha: 0.60, decay: 14, cost: 'Medium', coverage: 'Tech, E-commerce, Media', examples: ['Flipkart/Amazon India daily visits', 'Zomato/Swiggy order frequency', 'Jio Cinema/Hotstar engagement'] },
    government: { name: 'Government Data', alpha: 0.50, decay: 60, cost: 'Free', coverage: 'Macro, Infrastructure', examples: ['GST collection figures', 'PMI manufacturing index', 'Highway toll collection data'] }
  }
  const current = categories[category]

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: India Alternative Data Explorer
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Explore different categories of alternative data available for Indian markets.
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {Object.entries(categories).map(([key, val]) => (
          <button key={key} onClick={() => setCategory(key)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
              category === key ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
            }`}>
            {val.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg bg-blue-50 p-3 text-center dark:bg-blue-900/30">
          <div className="text-xs text-blue-600 dark:text-blue-400">Alpha Potential</div>
          <div className="text-lg font-bold text-blue-800 dark:text-blue-200">{(current.alpha * 100).toFixed(0)}%</div>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 text-center dark:bg-amber-900/30">
          <div className="text-xs text-amber-600 dark:text-amber-400">Alpha Decay</div>
          <div className="text-lg font-bold text-amber-800 dark:text-amber-200">{current.decay} days</div>
        </div>
        <div className="rounded-lg bg-green-50 p-3 text-center dark:bg-green-900/30">
          <div className="text-xs text-green-600 dark:text-green-400">Cost</div>
          <div className="text-lg font-bold text-green-800 dark:text-green-200">{current.cost}</div>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 text-center dark:bg-purple-900/30">
          <div className="text-xs text-purple-600 dark:text-purple-400">Coverage</div>
          <div className="text-sm font-bold text-purple-800 dark:text-purple-200">{current.coverage}</div>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">India-Specific Examples</h4>
        <ul className="space-y-1">
          {current.examples.map((ex, i) => (
            <li key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2">
              <span className="text-indigo-500 mt-0.5">--</span> {ex}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function AltDataLandscape() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Alternative Data Landscape for Indian Markets
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Alternative data refers to non-traditional data sources used to gain investment
        insights beyond standard financial statements and market data. India&apos;s digital
        transformation -- particularly the UPI revolution, Aadhaar-linked databases, and
        massive smartphone adoption -- creates unique alternative data opportunities not
        available in other markets.
      </p>

      <DefinitionBlock
        title="Alternative Data"
        label="Definition 15.1"
        definition="Alternative data encompasses information not found in traditional financial data sources (price, volume, fundamentals). It includes satellite imagery, social media sentiment, web scraping, credit card transactions, geolocation data, and government datasets. The key value proposition is informational edge: insights that are not yet reflected in market prices."
        notation="Alpha from alt data: α_alt = E[R|D_alt] - E[R], where D_alt is the alternative dataset."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        India-Specific Alternative Data Sources
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Data Type</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">India Source</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Signal For</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Frequency</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">UPI Transactions</td>
              <td className="px-4 py-2">NPCI reports</td>
              <td className="px-4 py-2">Consumer spending, fintech</td>
              <td className="px-4 py-2">Monthly</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">GST Collections</td>
              <td className="px-4 py-2">Finance Ministry</td>
              <td className="px-4 py-2">Economic activity, GDP proxy</td>
              <td className="px-4 py-2">Monthly</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Satellite/Nightlights</td>
              <td className="px-4 py-2">ISRO, Planet Labs</td>
              <td className="px-4 py-2">Urbanization, industrial activity</td>
              <td className="px-4 py-2">Weekly</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Aadhaar Auth Volume</td>
              <td className="px-4 py-2">UIDAI</td>
              <td className="px-4 py-2">Financial inclusion, identity verification</td>
              <td className="px-4 py-2">Monthly</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Auto Registration</td>
              <td className="px-4 py-2">VAHAN portal</td>
              <td className="px-4 py-2">Auto sector demand</td>
              <td className="px-4 py-2">Daily</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Power Consumption</td>
              <td className="px-4 py-2">CEA, state DISCOMs</td>
              <td className="px-4 py-2">Industrial activity proxy</td>
              <td className="px-4 py-2">Daily</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        UPI Revolution as Alpha Signal
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        India&apos;s Unified Payments Interface processes over 10 billion transactions monthly.
        UPI data provides unique insights into:
      </p>

      <BlockMath math="\text{UPI Signal}_t = \frac{\text{UPI Volume}_t - \text{MA}_{12}(\text{UPI Volume})}{\text{Std}_{12}(\text{UPI Volume})}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The information content of alternative data can be measured via mutual information:
      </p>

      <BlockMath math="I(R; D_{\text{alt}}) = \sum_{r, d} P(R=r, D_{\text{alt}}=d) \log \frac{P(R=r, D_{\text{alt}}=d)}{P(R=r)P(D_{\text{alt}}=d)}" />

      <TheoremBlock
        title="Alternative Data Alpha Decay"
        label="Theorem 15.1"
        statement="The alpha from an alternative dataset D decays exponentially with the number of market participants using it: α(n) = α_0 · exp(-λn), where n is the number of funds using dataset D and λ is the crowding rate. In equilibrium, when enough participants incorporate D, its alpha approaches zero."
        proof="Consider a competitive market with N informed traders each using dataset D. The Kyle (1985) lambda measures price impact: λ_kyle = σ_v/(2σ_u). As N increases, total informed trading σ_v·N increases, causing faster price discovery. The expected alpha per trader scales as α(n) ∝ σ_v/(σ_u·n^{1/2}). For exponential adoption curves, this yields the stated exponential decay."
      />

      <InteractiveAltDataExplorer />

      <NoteBlock title="India's Digital Data Advantage" type="info">
        <p>
          India generates unique alternative data thanks to: (1) Aadhaar (1.3B biometric IDs)
          enabling linkage across databases, (2) UPI handling 10B+ monthly transactions with
          rich metadata, (3) GST creating a digital trail for nearly all business transactions,
          (4) VAHAN/Parivahan portals providing real-time vehicle registration data, (5) ISRO&apos;s
          satellite constellation providing local imagery. This digital infrastructure creates
          alt-data opportunities that are uniquely Indian and not easily replicated elsewhere.
        </p>
      </NoteBlock>

      <PythonCode
        title="alt_data_analysis.py"
        runnable
        code={`import numpy as np
from typing import Dict, List

class IndiaAltDataPipeline:
    """
    Pipeline for processing India-specific alternative data signals.
    Combines UPI, GST, satellite, and employment data.
    """
    def __init__(self):
        self.signal_weights = {
            'upi_volume': 0.25,
            'gst_collection': 0.20,
            'satellite_activity': 0.15,
            'job_postings': 0.10,
            'power_consumption': 0.15,
            'auto_registration': 0.15
        }

    def normalize_signal(self, values: np.ndarray, window: int = 12) -> np.ndarray:
        """Z-score normalization with rolling window."""
        if len(values) < window:
            return np.zeros_like(values)
        result = np.zeros_like(values, dtype=float)
        for i in range(window, len(values)):
            window_data = values[i-window:i]
            mean = window_data.mean()
            std = window_data.std()
            result[i] = (values[i] - mean) / (std + 1e-8)
        return result

    def compute_composite_signal(self, data: Dict[str, np.ndarray]) -> np.ndarray:
        """Compute weighted composite alternative data signal."""
        n = min(len(v) for v in data.values())
        composite = np.zeros(n)

        for signal_name, weight in self.signal_weights.items():
            if signal_name in data:
                normalized = self.normalize_signal(data[signal_name][:n])
                composite += weight * normalized

        return composite

    def compute_information_coefficient(self, signal: np.ndarray,
                                         returns: np.ndarray) -> float:
        """Compute IC (rank correlation) between signal and forward returns."""
        if len(signal) != len(returns):
            n = min(len(signal), len(returns))
            signal = signal[:n]
            returns = returns[:n]

        # Spearman rank correlation
        rank_signal = np.argsort(np.argsort(signal)).astype(float)
        rank_returns = np.argsort(np.argsort(returns)).astype(float)
        n = len(signal)

        d = rank_signal - rank_returns
        rho = 1 - 6 * np.sum(d**2) / (n * (n**2 - 1))
        return rho

    def alpha_decay_analysis(self, signal: np.ndarray,
                              returns: np.ndarray,
                              max_lag: int = 60) -> np.ndarray:
        """Measure how signal IC decays over time lags."""
        ics = []
        for lag in range(1, max_lag + 1):
            if lag < len(returns):
                fwd_returns = returns[lag:]
                lagged_signal = signal[:len(returns)-lag]
                ic = self.compute_information_coefficient(lagged_signal, fwd_returns)
                ics.append(ic)
        return np.array(ics)


# Demo: Analyze India alt data signals
np.random.seed(42)
n_months = 60  # 5 years

# Simulate India-specific alt data
upi_volume = np.cumsum(np.random.normal(500, 100, n_months)) + 5000
gst_collection = np.cumsum(np.random.normal(100, 30, n_months)) + 1200
satellite_idx = np.cumsum(np.random.normal(0.5, 1, n_months)) + 50
job_postings = np.cumsum(np.random.normal(20, 10, n_months)) + 200
power_consumption = np.cumsum(np.random.normal(1, 2, n_months)) + 100
auto_registrations = np.cumsum(np.random.normal(5, 8, n_months)) + 300

alt_data = {
    'upi_volume': upi_volume,
    'gst_collection': gst_collection,
    'satellite_activity': satellite_idx,
    'job_postings': job_postings,
    'power_consumption': power_consumption,
    'auto_registration': auto_registrations
}

# Simulate Nifty returns with some signal
pipeline = IndiaAltDataPipeline()
composite = pipeline.compute_composite_signal(alt_data)
nifty_returns = 0.01 + 0.005 * composite + np.random.normal(0, 0.05, len(composite))

print("India Alternative Data Analysis")
print(f"{'='*60}")
print(f"Dataset period: {n_months} months")
print(f"\\nSignal Weights:")
for name, w in pipeline.signal_weights.items():
    print(f"  {name:>25s}: {w:.2f}")

# Compute ICs for individual signals
print(f"\\nIndividual Signal ICs (rank correlation with Nifty):")
for name, data in alt_data.items():
    normalized = pipeline.normalize_signal(data)
    ic = pipeline.compute_information_coefficient(
        normalized[12:], nifty_returns[12:]
    )
    print(f"  {name:>25s}: IC = {ic:+.4f}")

# Composite signal IC
composite_ic = pipeline.compute_information_coefficient(
    composite[12:], nifty_returns[12:]
)
print(f"\\n  {'Composite Signal':>25s}: IC = {composite_ic:+.4f}")

# Alpha decay analysis
decay = pipeline.alpha_decay_analysis(composite[12:], nifty_returns[12:], max_lag=30)
print(f"\\nAlpha Decay (IC by lag):")
for lag in [1, 5, 10, 20, 30]:
    if lag-1 < len(decay):
        print(f"  Lag {lag:2d} months: IC = {decay[lag-1]:+.4f}")

# Estimate information ratio
ir = composite_ic * np.sqrt(12)  # Annualized
print(f"\\nEstimated Information Ratio: {ir:.2f}")
print(f"Expected alpha (Grinold): {ir * 0.05 * 100:.1f}% p.a.")`}
      />

      <ExampleBlock
        title="UPI Data as Leading Indicator"
        difficulty="intermediate"
        problem="Monthly UPI transaction volumes show a sudden 15% increase above the 12-month moving average in March. How would you construct a trading signal for consumer-facing stocks on NSE?"
        solution={[
          {
            step: 'Compute z-score of UPI volume',
            formula: 'z_t = \\frac{\\text{UPI}_t - \\text{MA}_{12}(\\text{UPI})}{\\text{Std}_{12}(\\text{UPI})} = \\frac{0.15}{\\sigma} \\approx 2.0',
            explanation: 'A z-score of 2.0 indicates the UPI surge is approximately 2 standard deviations above trend -- a strong positive signal.',
          },
          {
            step: 'Map to sector exposure',
            formula: 'w_i = \\beta_i^{\\text{UPI}} \\cdot z_t \\cdot \\text{sector\\_loading}_i',
            explanation: 'Overweight consumer discretionary (Titan, Trent, DMart), fintech-linked banks (HDFC Bank, Kotak), and e-commerce beneficiaries. Underweight cash-heavy traditional retail.',
          },
          {
            step: 'Estimate alpha with decay',
            formula: '\\alpha_t = \\alpha_0 \\cdot e^{-t/\\tau}, \\quad \\tau \\approx 7 \\text{ days}',
            explanation: 'UPI data is published monthly with a lag. Alpha decays quickly once the data becomes public. Position early based on proxy indicators.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          India offers a unique alternative data landscape driven by its digital
          infrastructure (UPI, Aadhaar, GST). The key to extracting alpha is: (1) access
          data before the market -- e.g., daily power consumption predicts industrial output
          before IIP release, (2) combine multiple weak signals into a composite that reduces
          noise, (3) account for India-specific seasonality (monsoon, festivals, fiscal year),
          and (4) be aware of alpha decay -- as more quant funds adopt the same alt data,
          the edge diminishes. Focus on uniquely Indian datasets (VAHAN, NPCI, electricity
          demand) that global funds may overlook.
        </p>
      </NoteBlock>
    </div>
  )
}
