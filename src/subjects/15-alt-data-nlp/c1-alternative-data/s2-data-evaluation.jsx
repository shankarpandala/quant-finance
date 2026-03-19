import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveDataEvaluation() {
  const [coverage, setCoverage] = useState(0.85)
  const [uniqueness, setUniqueness] = useState(0.60)
  const [timeliness, setTimeliness] = useState(0.75)
  const [accuracy, setAccuracy] = useState(0.90)
  const [cost, setCost] = useState(50000)

  const qualityScore = (coverage * 0.25 + uniqueness * 0.30 + timeliness * 0.25 + accuracy * 0.20)
  const estimatedAlpha = qualityScore * 0.03
  const roi = (estimatedAlpha * 10_00_00_000 - cost * 12) / (cost * 12) * 100

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Alt Data Quality Evaluator
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Score an alternative dataset across quality dimensions and estimate its value for Indian market strategies.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Coverage: {(coverage * 100).toFixed(0)}%</span>
          <input type="range" min="0" max="1" step="0.05" value={coverage}
            onChange={e => setCoverage(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-blue-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Uniqueness: {(uniqueness * 100).toFixed(0)}%</span>
          <input type="range" min="0" max="1" step="0.05" value={uniqueness}
            onChange={e => setUniqueness(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-green-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Timeliness: {(timeliness * 100).toFixed(0)}%</span>
          <input type="range" min="0" max="1" step="0.05" value={timeliness}
            onChange={e => setTimeliness(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-amber-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Accuracy: {(accuracy * 100).toFixed(0)}%</span>
          <input type="range" min="0" max="1" step="0.05" value={accuracy}
            onChange={e => setAccuracy(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-purple-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Monthly cost: ₹{(cost / 1000).toFixed(0)}K</span>
          <input type="range" min="5000" max="500000" step="5000" value={cost}
            onChange={e => setCost(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-red-500" />
        </label>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-indigo-50 p-3 text-center dark:bg-indigo-900/30">
          <div className="text-xs text-indigo-600 dark:text-indigo-400">Quality Score</div>
          <div className="text-xl font-bold text-indigo-800 dark:text-indigo-200">{(qualityScore * 100).toFixed(0)}/100</div>
        </div>
        <div className="rounded-lg bg-green-50 p-3 text-center dark:bg-green-900/30">
          <div className="text-xs text-green-600 dark:text-green-400">Est. Annual Alpha</div>
          <div className="text-xl font-bold text-green-800 dark:text-green-200">{(estimatedAlpha * 100).toFixed(1)}%</div>
        </div>
        <div className={`rounded-lg p-3 text-center ${roi > 0 ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'}`}>
          <div className="text-xs text-gray-600 dark:text-gray-400">Data ROI</div>
          <div className={`text-xl font-bold ${roi > 0 ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
            {roi > 0 ? '+' : ''}{roi.toFixed(0)}%
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DataEvaluation() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Evaluating Alternative Data for Indian Markets
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Not all alternative data is worth the investment. A rigorous evaluation framework
        helps quantify whether a dataset provides genuine informational edge for Indian
        market strategies. We assess datasets across multiple dimensions: coverage, uniqueness,
        timeliness, accuracy, and cost-effectiveness relative to the Indian equity universe.
      </p>

      <DefinitionBlock
        title="Alt Data Quality Framework"
        label="Definition 15.2"
        definition="The quality of an alternative dataset is evaluated across five dimensions: (1) Coverage -- what fraction of the investable universe does it cover, (2) Uniqueness -- is the signal orthogonal to existing factors, (3) Timeliness -- how quickly is data available relative to market events, (4) Accuracy -- data quality and reliability, (5) History -- length of backtest-quality historical data."
        notation="Quality = f(coverage, uniqueness, timeliness, accuracy, history)"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Information Coefficient Analysis
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The primary metric for evaluating alternative data is the Information Coefficient (IC) --
        the rank correlation between the data signal and subsequent returns:
      </p>

      <BlockMath math="IC = \text{corr}_{\text{rank}}(\text{signal}_t, R_{t+1})" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The relationship between IC and portfolio performance via the Fundamental Law of Active Management:
      </p>

      <BlockMath math="IR = IC \times \sqrt{BR} \times TC" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="IR" /> is the Information Ratio, <InlineMath math="BR" /> is
        breadth (number of independent bets), and <InlineMath math="TC" /> is the transfer
        coefficient. For Nifty 500 with monthly signals:
      </p>

      <BlockMath math="IR = IC \times \sqrt{500 \times 12} \times TC \approx 77.5 \times IC \times TC" />

      <TheoremBlock
        title="Fundamental Law of Active Management"
        label="Theorem 15.2 (Grinold & Kahn)"
        statement="The expected Information Ratio of an active portfolio strategy is: IR ≈ IC × √BR, where IC is the Information Coefficient (correlation between forecasts and realizations) and BR is the breadth (number of independent forecasts per year). For IC = 0.05 with BR = 500×12 = 6000 monthly forecasts across Nifty 500, IR ≈ 0.05 × 77.5 = 3.87."
        proof="Under mean-variance optimization with N assets and independent signals, the optimal portfolio has Sharpe ratio approximately IC × √N. With T independent periods per year, breadth BR = N × T. The approximation holds when signals are independent and the IC is constant across assets and time periods. Extensions by Clarke, de Silva, and Thorley (2002) introduce the transfer coefficient TC ∈ [0,1] to account for portfolio constraints."
      />

      <InteractiveDataEvaluation />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Due Diligence Checklist for Indian Alt Data
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Criterion</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Question</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">India Context</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-semibold">Legal</td>
              <td className="px-4 py-2">DPDP Act compliance?</td>
              <td className="px-4 py-2">India Digital Personal Data Protection Act 2023</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-semibold">Coverage</td>
              <td className="px-4 py-2">Nifty 500 coverage?</td>
              <td className="px-4 py-2">Mid/small cap data often sparse</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-semibold">History</td>
              <td className="px-4 py-2">3+ year backtest window?</td>
              <td className="px-4 py-2">India digital data mostly post-2016 (demonetization)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-semibold">Exclusivity</td>
              <td className="px-4 py-2">How many funds use it?</td>
              <td className="px-4 py-2">India quant fund ecosystem is smaller -- more edge</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">Survivorship</td>
              <td className="px-4 py-2">Survivorship bias risk?</td>
              <td className="px-4 py-2">Check if data excludes delisted NSE stocks</td>
            </tr>
          </tbody>
        </table>
      </div>

      <NoteBlock title="SEBI and Data Privacy" type="warning">
        <p>
          India&apos;s Digital Personal Data Protection Act (DPDP) 2023 restricts use of personally
          identifiable information. When using alternative data for trading on NSE, ensure:
          (1) data is aggregated and anonymized, (2) no material non-public information (MNPI)
          per SEBI insider trading regulations, (3) web scraping complies with website terms of
          service, (4) credit card/UPI data does not contain individual-level transaction details.
          SEBI&apos;s prohibition on insider trading (SEBI PIT Regulations 2015) applies to any
          information that could be construed as UPSI (Unpublished Price Sensitive Information).
        </p>
      </NoteBlock>

      <PythonCode
        title="data_evaluation.py"
        runnable
        code={`import numpy as np
from typing import Dict, Tuple

class AltDataEvaluator:
    """
    Framework for evaluating alternative data quality
    for Indian market trading strategies.
    """
    def __init__(self, nifty_500_size=500, monthly_periods=12):
        self.universe_size = nifty_500_size
        self.periods = monthly_periods
        self.breadth = nifty_500_size * monthly_periods

    def compute_ic(self, signal: np.ndarray,
                    forward_returns: np.ndarray) -> float:
        """Rank IC (Spearman correlation)."""
        n = min(len(signal), len(forward_returns))
        s, r = signal[:n], forward_returns[:n]
        rs = np.argsort(np.argsort(s)).astype(float)
        rr = np.argsort(np.argsort(r)).astype(float)
        d = rs - rr
        return 1 - 6 * np.sum(d**2) / (n * (n**2 - 1))

    def ic_t_stat(self, ic: float, n_obs: int) -> float:
        """T-statistic for IC significance."""
        return ic * np.sqrt(n_obs - 2) / np.sqrt(1 - ic**2 + 1e-8)

    def fundamental_law_ir(self, ic: float, tc: float = 0.5) -> float:
        """Information Ratio via Fundamental Law."""
        return ic * np.sqrt(self.breadth) * tc

    def expected_alpha(self, ic: float, tc: float = 0.5,
                        tracking_error: float = 0.05) -> float:
        """Expected alpha from Grinold's fundamental law."""
        ir = self.fundamental_law_ir(ic, tc)
        return ir * tracking_error

    def evaluate_uniqueness(self, signal: np.ndarray,
                             existing_factors: np.ndarray) -> float:
        """Measure signal orthogonality to existing factors."""
        if existing_factors.ndim == 1:
            existing_factors = existing_factors.reshape(-1, 1)
        n = min(len(signal), len(existing_factors))
        s = signal[:n]
        X = existing_factors[:n]

        # Residual after regressing on existing factors
        XtX_inv = np.linalg.pinv(X.T @ X)
        beta = XtX_inv @ X.T @ s
        residual = s - X @ beta
        uniqueness = np.var(residual) / (np.var(s) + 1e-8)
        return uniqueness

    def decay_analysis(self, signal: np.ndarray,
                        returns: np.ndarray,
                        max_lag: int = 12) -> Dict:
        """Analyze how quickly the signal's IC decays."""
        ics = []
        for lag in range(1, max_lag + 1):
            if lag < len(returns):
                ic = self.compute_ic(signal[:-lag], returns[lag:])
                ics.append({'lag': lag, 'ic': ic})
        half_life = None
        if ics and abs(ics[0]['ic']) > 0:
            for item in ics:
                if abs(item['ic']) < abs(ics[0]['ic']) / 2:
                    half_life = item['lag']
                    break
        return {'ics': ics, 'half_life': half_life}

    def cost_benefit(self, ic: float, annual_cost_inr: float,
                      aum_inr: float, tc: float = 0.5) -> Dict:
        """Compute cost-benefit analysis of alt data."""
        alpha = self.expected_alpha(ic, tc)
        annual_alpha_inr = alpha * aum_inr
        roi = (annual_alpha_inr - annual_cost_inr) / annual_cost_inr
        breakeven_aum = annual_cost_inr / (alpha + 1e-8)
        return {
            'annual_alpha_pct': alpha * 100,
            'annual_alpha_inr': annual_alpha_inr,
            'roi': roi,
            'breakeven_aum': breakeven_aum
        }


# Demo: Evaluate India alt data sources
np.random.seed(42)
evaluator = AltDataEvaluator(nifty_500_size=500)
n_obs = 60  # 5 years monthly

# Simulate signals and returns
nifty_returns = np.random.normal(0.01, 0.05, n_obs)

signals = {
    'UPI Transaction Volume': np.random.normal(0, 1, n_obs) + 0.1 * nifty_returns,
    'GST Collections': np.random.normal(0, 1, n_obs) + 0.08 * nifty_returns,
    'Satellite Parking Lots': np.random.normal(0, 1, n_obs) + 0.12 * nifty_returns,
    'Job Postings (Naukri)': np.random.normal(0, 1, n_obs) + 0.06 * nifty_returns,
    'Power Consumption': np.random.normal(0, 1, n_obs) + 0.09 * nifty_returns,
}

costs_monthly = {
    'UPI Transaction Volume': 25000,
    'GST Collections': 0,
    'Satellite Parking Lots': 200000,
    'Job Postings (Naukri)': 50000,
    'Power Consumption': 10000,
}

aum = 100_00_00_000  # INR 100 crores

print("Alternative Data Evaluation Framework (Indian Markets)")
print(f"Universe: Nifty 500 | Periods: Monthly | Breadth: {evaluator.breadth}")
print(f"AUM: INR {aum/1e7:.0f} crores")
print(f"{'='*75}")

results = []
for name, signal in signals.items():
    ic = evaluator.compute_ic(signal, nifty_returns)
    t_stat = evaluator.ic_t_stat(ic, n_obs)
    ir = evaluator.fundamental_law_ir(ic)
    decay = evaluator.decay_analysis(signal, nifty_returns)
    cost_annual = costs_monthly[name] * 12
    cb = evaluator.cost_benefit(ic, cost_annual, aum)

    results.append({
        'name': name, 'ic': ic, 't_stat': t_stat,
        'ir': ir, 'half_life': decay['half_life'],
        'roi': cb['roi'], 'alpha': cb['annual_alpha_pct']
    })

    print(f"\\n{name}:")
    print(f"  IC: {ic:+.4f} (t={t_stat:.2f}{'*' if abs(t_stat)>2 else ''})")
    print(f"  IR: {ir:.2f} | Alpha: {cb['annual_alpha_pct']:.2f}%")
    print(f"  Half-life: {decay['half_life'] or '>12'} months")
    print(f"  Cost: INR {cost_annual/1e3:.0f}K/yr | ROI: {cb['roi']:.0f}x")

# Rank datasets by ROI
results.sort(key=lambda x: x['roi'], reverse=True)
print(f"\\n{'='*75}")
print("Ranked by ROI:")
for i, r in enumerate(results):
    print(f"  {i+1}. {r['name']:30s} ROI: {r['roi']:>8.0f}x | IC: {r['ic']:+.4f}")`}
      />

      <ExampleBlock
        title="Evaluating Satellite Data for D-Mart"
        difficulty="intermediate"
        problem="A vendor offers satellite-derived parking lot occupancy data for 50 D-Mart stores across India at ₹2 lakhs/month. Your fund manages ₹500 crores. The preliminary IC with Avenue Supermarts (DMART) quarterly revenue surprises is 0.12. Is this data worth buying?"
        solution={[
          {
            step: 'Compute expected alpha',
            formula: 'IR = IC \\times \\sqrt{BR} \\times TC = 0.12 \\times \\sqrt{4} \\times 0.5 = 0.12',
            explanation: 'With only 1 stock and 4 quarterly observations per year, breadth is very low (BR=4). Transfer coefficient TC=0.5 for single-stock signal.',
          },
          {
            step: 'Estimate annual alpha',
            formula: '\\alpha = IR \\times \\text{TE} = 0.12 \\times 3\\% = 0.36\\%',
            explanation: 'With limited breadth, the expected alpha from this single-stock signal is modest at 0.36% of the relevant allocation.',
          },
          {
            step: 'Cost-benefit analysis',
            formula: '\\text{ROI} = \\frac{500 \\text{cr} \\times 0.05 \\times 0.0036 - 24 \\text{L}}{24 \\text{L}} = -63\\%',
            explanation: 'Assuming 5% of AUM is allocated to DMART, the alpha generated (₹9L) does not justify the cost (₹24L/yr). The data is not worth buying for a single-stock signal. However, if the satellite data extends to 200+ retail stocks on NSE (Reliance Retail, Trent, etc.), the breadth increases dramatically.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Evaluating alt data requires a disciplined cost-benefit framework. For Indian
          markets, prioritize datasets that: (1) have high breadth (cover many Nifty 500
          stocks, not just one), (2) are unique to India (UPI, GST, VAHAN -- not available
          to global quant funds), (3) have at least 3 years of history (post-demonetization
          for digital data), (4) show IC &gt; 0.03 with statistical significance (t &gt; 2).
          Always test for survivorship bias using NSE delisting data and ensure compliance
          with India&apos;s DPDP Act and SEBI PIT Regulations.
        </p>
      </NoteBlock>
    </div>
  )
}
