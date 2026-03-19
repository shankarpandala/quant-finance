import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveEarningsAnalysis() {
  const [temperature, setTemperature] = useState(0.2)
  const [topK, setTopK] = useState(5)
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.7)

  const metrics = [
    { name: 'Revenue Growth', extracted: 18.5, consensus: 16.2, surprise: 2.3 },
    { name: 'EBITDA Margin', extracted: 24.1, consensus: 23.5, surprise: 0.6 },
    { name: 'PAT Growth', extracted: 22.3, consensus: 19.8, surprise: 2.5 },
    { name: 'Guidance (Rev)', extracted: 15.0, consensus: 13.0, surprise: 2.0 },
  ]

  const overallSurprise = metrics.reduce((sum, m) => sum + m.surprise, 0) / metrics.length
  const confidence = Math.min(0.99, 0.5 + (1 - temperature) * 0.4 + topK * 0.02)
  const signalStrength = overallSurprise * confidence
  const passesThreshold = confidence >= confidenceThreshold

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: LLM Earnings Extraction Pipeline
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Configure LLM parameters and confidence threshold for automated earnings analysis
        of an Indian IT company (e.g., Infosys Q3 FY25 results).
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Temperature <InlineMath math={`T = ${temperature.toFixed(2)}`} /></span>
          <input type="range" min="0" max="1" step="0.05" value={temperature}
            onChange={e => setTemperature(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Top-K Metrics: {topK}</span>
          <input type="range" min="2" max="10" step="1" value={topK}
            onChange={e => setTopK(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Confidence Threshold: {(confidenceThreshold * 100).toFixed(0)}%</span>
          <input type="range" min="0.5" max="0.95" step="0.05" value={confidenceThreshold}
            onChange={e => setConfidenceThreshold(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Metric</th>
              <th className="px-3 py-2 text-right text-gray-600 dark:text-gray-400">LLM Extracted</th>
              <th className="px-3 py-2 text-right text-gray-600 dark:text-gray-400">Consensus</th>
              <th className="px-3 py-2 text-right text-gray-600 dark:text-gray-400">Surprise (%)</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            {metrics.map((m, i) => (
              <tr key={i} className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-3 py-2">{m.name}</td>
                <td className="px-3 py-2 text-right font-mono">{m.extracted.toFixed(1)}%</td>
                <td className="px-3 py-2 text-right font-mono">{m.consensus.toFixed(1)}%</td>
                <td className={`px-3 py-2 text-right font-mono font-semibold ${m.surprise > 0 ? 'text-green-600' : 'text-red-500'}`}>
                  +{m.surprise.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
        <span className="text-gray-600 dark:text-gray-400">
          Confidence: <span className="font-semibold">{(confidence * 100).toFixed(1)}%</span>
        </span>
        <span className="text-gray-600 dark:text-gray-400">
          Signal: <span className="font-semibold">{signalStrength.toFixed(3)}</span>
        </span>
        <span className={`font-bold ${passesThreshold ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>
          {passesThreshold ? 'SIGNAL ACTIVE' : 'BELOW THRESHOLD'}
        </span>
      </div>
    </div>
  )
}

export default function LLMEarnings() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        LLM-Powered Earnings Analysis
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Large Language Models (LLMs) have transformed how quantitative analysts process
        earnings calls and financial results in Indian markets. With over 5,000 listed
        companies on NSE and BSE releasing quarterly results, automated LLM-based
        extraction provides a scalable edge in capturing earnings surprises across the
        NIFTY 500 universe.
      </p>

      <DefinitionBlock
        title="LLM Earnings Extraction"
        label="Definition 1.1"
        definition="LLM earnings extraction is the process of using large language models to automatically parse earnings call transcripts, press releases, and financial result filings to extract structured quantitative data (revenue, margins, guidance) and qualitative signals (management tone, forward-looking statements) from unstructured text."
        notation={<>The extraction function maps text to structured output: <InlineMath math="f_{\text{LLM}}: \mathcal{T} \to \{(m_i, v_i, c_i)\}_{i=1}^K" /> where <InlineMath math="m_i" /> is a metric name, <InlineMath math="v_i" /> its value, and <InlineMath math="c_i" /> the confidence score.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Earnings Surprise Signal
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The core signal measures the deviation of LLM-extracted actuals from consensus
        estimates. The standardized earnings surprise (SES) normalizes this by the
        historical forecast dispersion:
      </p>

      <BlockMath math="\text{SES}_i = \frac{A_i^{\text{LLM}} - E_i^{\text{consensus}}}{\sigma_i^{\text{forecast}}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The aggregate surprise signal combines multiple metrics using information-weighted
        averaging:
      </p>

      <BlockMath math="S_{\text{earnings}} = \sum_{i=1}^{K} w_i \cdot \text{SES}_i, \quad w_i = \frac{\text{IC}_i}{\sum_j \text{IC}_j}" />

      <TheoremBlock
        title="Post-Earnings Announcement Drift (PEAD) in Indian Markets"
        label="Empirical Finding 1.1"
        statement={<>Stocks in the NIFTY 500 universe exhibit significant post-earnings announcement drift lasting 30--60 trading days. Stocks in the top quintile of earnings surprise (as measured by SES) outperform the bottom quintile by an average of <InlineMath math="3.2\%\text{--}5.8\%" /> over the subsequent 60-day period. This drift is more pronounced for mid-cap and small-cap stocks due to lower analyst coverage.</>}
        proof={<>The PEAD is measured through cumulative abnormal returns: <BlockMath math="\text{CAR}(0, T) = \sum_{t=0}^{T} \left(r_{i,t} - \hat{r}_{i,t}^{\text{FF5}}\right)" /> where <InlineMath math="\hat{r}_{i,t}^{\text{FF5}}" /> is the Fama-French five-factor expected return adapted for Indian markets. Analysis of 15,000 quarterly results (2018--2024) on NSE confirms statistical significance at the 1% level.</>}
      />

      <InteractiveEarningsAnalysis />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Prompt Engineering for Indian Earnings
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Effective prompt design for Indian earnings analysis must account for
        India-specific financial terminology (PAT vs net income, crore/lakh notation,
        IndAS accounting standards), bilingual content in earnings calls, and the
        structure of BSE/NSE result filings.
      </p>

      <PythonCode
        title="llm_earnings_analyzer.py"
        runnable
        code={`import numpy as np
import json

class LLMEarningsAnalyzer:
    """Analyze Indian company earnings using LLM-based extraction."""

    PROMPT_TEMPLATE = """
    Analyze the following quarterly results for an Indian listed company.
    Extract these metrics in JSON format:
    - revenue_cr: Revenue in crores (INR)
    - revenue_growth_yoy: Year-over-year revenue growth (%)
    - ebitda_margin: EBITDA margin (%)
    - pat_cr: Profit After Tax in crores (INR)
    - pat_growth_yoy: YoY PAT growth (%)
    - eps: Earnings Per Share (INR)
    - management_tone: One of [very_positive, positive, neutral, negative, very_negative]
    - guidance_change: One of [raised, maintained, lowered, not_provided]
    - key_risks: List of up to 3 key risks mentioned

    Results text:
    {results_text}
    """

    def __init__(self, confidence_threshold=0.7):
        self.confidence_threshold = confidence_threshold

    def compute_surprise(self, extracted, consensus):
        """Compute standardized earnings surprise."""
        surprises = {}
        for metric in extracted:
            if metric in consensus:
                actual = extracted[metric]
                expected = consensus[metric]['estimate']
                std_dev = consensus[metric]['std_dev']
                if std_dev > 0:
                    ses = (actual - expected) / std_dev
                    surprises[metric] = ses
        return surprises

    def aggregate_signal(self, surprises, ic_weights):
        """IC-weighted aggregation of individual metric surprises."""
        total_ic = sum(ic_weights.get(m, 0.1) for m in surprises)
        signal = sum(
            ic_weights.get(m, 0.1) * s / total_ic
            for m, s in surprises.items()
        )
        return signal

    def generate_trade(self, signal, confidence, stock_vol):
        """Convert signal to position recommendation."""
        if confidence < self.confidence_threshold:
            return {'action': 'NO_TRADE', 'reason': 'Low confidence'}

        direction = 'LONG' if signal > 0 else 'SHORT'
        # Kelly-inspired sizing with half-Kelly for safety
        raw_size = abs(signal) / stock_vol
        position_pct = min(0.10, raw_size * 0.5)  # Max 10% of portfolio

        return {
            'action': direction,
            'position_pct': position_pct,
            'signal_strength': abs(signal),
            'holding_period_days': 30 if abs(signal) > 2 else 60
        }

# --- Simulation ---
np.random.seed(42)

# Simulated Infosys Q3 FY25 extraction
extracted = {
    'revenue_growth_yoy': 18.5,
    'ebitda_margin': 24.1,
    'pat_growth_yoy': 22.3,
    'eps': 16.8
}

consensus = {
    'revenue_growth_yoy': {'estimate': 16.2, 'std_dev': 1.5},
    'ebitda_margin': {'estimate': 23.5, 'std_dev': 0.8},
    'pat_growth_yoy': {'estimate': 19.8, 'std_dev': 2.0},
    'eps': {'estimate': 15.5, 'std_dev': 0.9}
}

ic_weights = {
    'revenue_growth_yoy': 0.25,
    'ebitda_margin': 0.20,
    'pat_growth_yoy': 0.35,
    'eps': 0.30
}

analyzer = LLMEarningsAnalyzer(confidence_threshold=0.7)
surprises = analyzer.compute_surprise(extracted, consensus)
signal = analyzer.aggregate_signal(surprises, ic_weights)
trade = analyzer.generate_trade(signal, confidence=0.85, stock_vol=0.22)

print("=" * 60)
print("LLM EARNINGS ANALYSIS: Infosys Q3 FY25 (Simulated)")
print("=" * 60)
print("\\nStandardized Earnings Surprises:")
for metric, ses in surprises.items():
    print(f"  {metric:25s}: SES = {ses:+.2f} sigma")
print(f"\\nAggregate Signal: {signal:+.3f}")
print(f"\\nTrade Recommendation:")
for k, v in trade.items():
    print(f"  {k:20s}: {v}")`}
      />

      <ExampleBlock
        title="Reliance Industries Quarterly Analysis"
        difficulty="intermediate"
        problem="Reliance Industries reports Q3 results. The LLM extracts: revenue growth = 12.8%, EBITDA margin = 16.2%, PAT growth = 9.5%. Consensus estimates are: revenue growth = 14.0% (std = 1.8%), EBITDA margin = 15.5% (std = 0.6%), PAT growth = 11.0% (std = 2.2%). IC weights are 0.3, 0.25, and 0.35 respectively. Compute the aggregate signal."
        solution={[
          {
            step: 'Compute individual surprises',
            formula: '\\text{SES}_{\\text{rev}} = \\frac{12.8 - 14.0}{1.8} = -0.667',
          },
          {
            step: 'EBITDA margin surprise',
            formula: '\\text{SES}_{\\text{ebitda}} = \\frac{16.2 - 15.5}{0.6} = +1.167',
          },
          {
            step: 'PAT growth surprise',
            formula: '\\text{SES}_{\\text{pat}} = \\frac{9.5 - 11.0}{2.2} = -0.682',
          },
          {
            step: 'IC-weighted aggregate',
            formula: 'S = \\frac{0.3(-0.667) + 0.25(1.167) + 0.35(-0.682)}{0.3 + 0.25 + 0.35} = \\frac{-0.200 + 0.292 - 0.239}{0.90} = -0.163',
            explanation: 'A mildly negative signal -- the revenue miss and PAT miss outweigh the margin beat.',
          },
        ]}
      />

      <NoteBlock title="Indian Earnings Calendar" type="tip">
        <p>
          Indian listed companies report results quarterly within 45 days of quarter end
          (per SEBI LODR regulations). The earnings season for Q3 (Oct--Dec) typically
          runs from mid-January to mid-February. Companies file results on BSE LISTING
          CENTER and NSE NEAPS platforms, which provide structured data feeds. LLM
          pipelines should ingest from both the official filings and the earnings call
          transcripts (available via investor relations pages or services like Tikr).
        </p>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          LLMs enable scalable earnings analysis across thousands of Indian companies,
          capturing both quantitative surprises and qualitative management tone shifts.
          The key is combining structured metric extraction with confidence-gated signal
          generation and proper backtesting against the well-documented PEAD anomaly
          in Indian equity markets.
        </p>
      </NoteBlock>
    </div>
  )
}
