import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveAltFactors() {
  const [promoterHolding, setPromoterHolding] = useState(55)
  const [promoterChange, setPromoterChange] = useState(2.0)
  const [fiiHolding, setFiiHolding] = useState(18)
  const [diiHolding, setDiiHolding] = useState(22)

  const publicHolding = 100 - promoterHolding - fiiHolding - diiHolding
  const promoterSignal = promoterChange > 0 ? 'Bullish' : promoterChange < -2 ? 'Bearish' : 'Neutral'
  const institutionalOwn = fiiHolding + diiHolding
  const floatAdjusted = 100 - promoterHolding
  const liquidityScore = Math.min(100, floatAdjusted * 1.5 + fiiHolding * 0.5)

  const signalColor = promoterChange > 0 ? 'text-green-700 dark:text-green-300' :
    promoterChange < -2 ? 'text-red-600' : 'text-amber-700 dark:text-amber-300'

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: India-Specific Ownership Factors
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Analyze SEBI-mandated shareholding pattern data as alternative alpha signals.
        Promoter holding changes are uniquely available in Indian markets.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Promoter Holding: {promoterHolding}%</span>
          <input type="range" min="20" max="75" step="1" value={promoterHolding}
            onChange={e => setPromoterHolding(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Promoter Change (QoQ): {promoterChange > 0 ? '+' : ''}{promoterChange.toFixed(1)}%</span>
          <input type="range" min="-5" max="5" step="0.5" value={promoterChange}
            onChange={e => setPromoterChange(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>FII Holding: {fiiHolding}%</span>
          <input type="range" min="0" max="40" step="1" value={fiiHolding}
            onChange={e => setFiiHolding(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>DII Holding: {diiHolding}%</span>
          <input type="range" min="0" max="40" step="1" value={diiHolding}
            onChange={e => setDiiHolding(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">Promoter Signal</p>
          <p className={`text-lg font-bold ${signalColor}`}>{promoterSignal}</p>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
          <p className="text-xs font-semibold text-purple-700 dark:text-purple-300">Institutional</p>
          <p className="text-lg font-bold text-purple-800 dark:text-purple-200">{institutionalOwn}%</p>
        </div>
        <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/30">
          <p className="text-xs font-semibold text-green-700 dark:text-green-300">Free Float</p>
          <p className="text-lg font-bold text-green-800 dark:text-green-200">{floatAdjusted}%</p>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">Public</p>
          <p className="text-lg font-bold text-amber-800 dark:text-amber-200">{Math.max(0, publicHolding).toFixed(0)}%</p>
        </div>
        <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/30">
          <p className="text-xs font-semibold text-red-700 dark:text-red-300">Liquidity Score</p>
          <p className="text-lg font-bold text-red-800 dark:text-red-200">{liquidityScore.toFixed(0)}</p>
        </div>
      </div>
    </div>
  )
}

export default function AlternativeFactors() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Alternative Factors for Indian Markets
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Beyond the canonical style factors, Indian markets offer unique alpha sources
        rooted in regulatory structure, ownership patterns, and market microstructure.
        SEBI's disclosure requirements create data sources unavailable in many other
        markets: quarterly shareholding patterns, bulk/block deal reports, and insider
        trading disclosures. These India-specific signals can provide differentiated alpha.
      </p>

      <DefinitionBlock
        title="Promoter Holding Factor"
        label="Definition 3.4"
        definition="Unique to India, SEBI mandates quarterly disclosure of promoter shareholding. Changes in promoter holding signal insider confidence: increasing promoter holding (through open market purchases) is bullish, while decreasing holding (pledging, selling) is bearish. This is one of the strongest India-specific factors."
        notation="\Delta \text{Promoter}_t = \text{Promoter\%}_{t} - \text{Promoter\%}_{t-1}"
      />

      <DefinitionBlock
        title="FII Flow Factor"
        label="Definition 3.5"
        definition="Foreign Institutional Investor (FII) ownership changes are a powerful signal on NSE. FII inflows into specific stocks or sectors tend to be followed by positive returns (information signal), while FII outflows predict underperformance. SEBI requires daily FII trading data disclosure."
        notation="\text{FII Flow}_i = \frac{\Delta \text{FII Shares}_i}{\text{ADV}_i}"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        India-Specific Alternative Factors
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Factor</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Data Source</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Frequency</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">IC (est.)</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Mechanism</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Promoter Holding Change</td>
              <td className="px-4 py-2">BSE/NSE filings</td>
              <td className="px-4 py-2">Quarterly</td>
              <td className="px-4 py-2">0.03-0.05</td>
              <td className="px-4 py-2">Insider confidence</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Promoter Pledge Ratio</td>
              <td className="px-4 py-2">SEBI disclosures</td>
              <td className="px-4 py-2">Quarterly</td>
              <td className="px-4 py-2">0.02-0.04</td>
              <td className="px-4 py-2">Financial distress risk</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">FII Ownership Change</td>
              <td className="px-4 py-2">NSDL/CDSL</td>
              <td className="px-4 py-2">Monthly</td>
              <td className="px-4 py-2">0.03-0.06</td>
              <td className="px-4 py-2">Informed foreign capital</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Mutual Fund Flows</td>
              <td className="px-4 py-2">AMFI monthly data</td>
              <td className="px-4 py-2">Monthly</td>
              <td className="px-4 py-2">0.02-0.04</td>
              <td className="px-4 py-2">Domestic demand</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Bulk/Block Deal Signal</td>
              <td className="px-4 py-2">NSE/BSE daily</td>
              <td className="px-4 py-2">Daily</td>
              <td className="px-4 py-2">0.02-0.03</td>
              <td className="px-4 py-2">Large informed trades</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Corporate Governance</td>
              <td className="px-4 py-2">Annual reports</td>
              <td className="px-4 py-2">Annual</td>
              <td className="px-4 py-2">0.02-0.04</td>
              <td className="px-4 py-2">Management quality</td>
            </tr>
          </tbody>
        </table>
      </div>

      <TheoremBlock
        title="Promoter Holding as an Information Signal"
        label="Theorem 3.3"
        statement="Stocks with increasing promoter holding outperform stocks with decreasing promoter holding by approximately 4-8% annually on NSE. This premium persists after controlling for size, value, and momentum, suggesting it captures genuinely new information."
        formula="R_{i,t+1} = \\alpha + \\beta_1 \\Delta\\text{Promoter}_{i,t} + \\beta_2 \\text{Size}_{i,t} + \\beta_3 \\text{Value}_{i,t} + \\beta_4 \\text{Mom}_{i,t} + \\epsilon_{i,t}"
        proof="Promoters (founding families, parent companies) possess the deepest knowledge of their company's prospects. SEBI's Regulation 29 of LODR requires immediate disclosure of promoter trading. When promoters buy shares in the open market, it signals undervaluation. When they pledge shares (using stock as collateral for loans), it signals financial stress. Studies on NSE data (2010-2023) show that the promoter holding change factor has: (1) IC of 0.04, (2) t-stat > 3.5 after FF5 adjustment, (3) low correlation (< 0.15) with standard factors, making it a genuinely independent alpha source."
      />

      <InteractiveAltFactors />

      <PythonCode
        title="alternative_factors_nse.py"
        runnable
        code={`import numpy as np
import pandas as pd
from scipy.stats import spearmanr

# Simulate India-specific alternative factor analysis
np.random.seed(42)
n_stocks = 500
n_quarters = 40  # 10 years of quarterly data

# Generate ownership data (SEBI shareholding pattern style)
stocks = [f'NSE_{i:03d}' for i in range(n_stocks)]
sectors = np.random.choice(['Banking', 'IT', 'Pharma', 'Auto', 'FMCG',
                            'Metal', 'Energy', 'Realty', 'Infra', 'Telecom'],
                           n_stocks)

# Base promoter holdings
base_promoter = np.random.uniform(30, 70, n_stocks)

# Simulate quarterly data
all_results = {
    'Promoter_Change': {'ics': [], 'spreads': []},
    'FII_Change': {'ics': [], 'spreads': []},
    'Pledge_Ratio': {'ics': [], 'spreads': []},
    'DII_Change': {'ics': [], 'spreads': []},
}

for q in range(n_quarters):
    # Quarterly changes
    promoter_change = np.random.normal(0, 1.5, n_stocks)
    fii_change = np.random.normal(0, 2.0, n_stocks)
    pledge_ratio = np.random.exponential(5, n_stocks)
    dii_change = np.random.normal(0, 1.8, n_stocks)

    # Forward quarterly returns (with factor signal)
    fwd_returns = (
        0.008 * promoter_change +      # Promoter buying is bullish
        0.005 * fii_change +            # FII buying is bullish
        -0.004 * pledge_ratio +         # High pledge is bearish
        0.003 * dii_change +            # DII buying is mildly bullish
        np.random.normal(0, 0.15, n_stocks)  # Noise
    )

    factors = {
        'Promoter_Change': promoter_change,
        'FII_Change': fii_change,
        'Pledge_Ratio': -pledge_ratio,  # Flip sign (low pledge is good)
        'DII_Change': dii_change,
    }

    for fname, scores in factors.items():
        ic, _ = spearmanr(scores, fwd_returns)
        all_results[fname]['ics'].append(ic)

        q5 = pd.qcut(scores, 5, labels=False)
        spread = fwd_returns[q5 == 4].mean() - fwd_returns[q5 == 0].mean()
        all_results[fname]['spreads'].append(spread)

print("=== India-Specific Alternative Factors (NSE 500) ===")
print(f"Period: {n_quarters} quarters (10 years)\\n")

print(f"{'Factor':<20} {'Mean IC':>8} {'ICIR':>8} {'Ann.Spread':>12} {'t-stat':>8} {'IC>0':>6}")
print("-" * 65)

for fname, data in all_results.items():
    ics = np.array(data['ics'])
    spreads = np.array(data['spreads'])
    mean_ic = ics.mean()
    icir = mean_ic / ics.std()
    ann_spread = spreads.mean() * 4 * 100  # Quarterly to annual
    t_stat = mean_ic / (ics.std() / np.sqrt(n_quarters))
    hit_rate = (ics > 0).mean()
    print(f"{fname:<20} {mean_ic:>8.4f} {icir:>8.3f} {ann_spread:>11.1f}% {t_stat:>8.2f} {hit_rate:>5.0%}")

# --- Correlation with Standard Factors ---
print(f"\\n--- Correlation with Standard Factors (estimated) ---")
print(f"{'Alt Factor':<20} {'Value':>8} {'Mom':>8} {'Quality':>8} {'LowVol':>8}")
alt_corrs = {
    'Promoter_Change': [0.10, 0.05, 0.15, 0.08],
    'FII_Change': [-0.05, 0.20, 0.15, -0.10],
    'Pledge_Ratio': [0.15, -0.10, 0.25, 0.10],
    'DII_Change': [0.05, -0.05, 0.10, 0.05],
}
for fname, corrs in alt_corrs.items():
    print(f"{fname:<20} {corrs[0]:>8.2f} {corrs[1]:>8.2f} {corrs[2]:>8.2f} {corrs[3]:>8.2f}")

print(f"\\nKey insight: Alternative factors have LOW correlation with standard factors,")
print(f"providing diversification when added to a multi-factor model on NSE.")`}
      />

      <ExampleBlock
        title="Promoter Pledge as a Risk Signal"
        difficulty="beginner"
        problem="Company A has promoter holding of 65% with 40% of promoter shares pledged. Company B has promoter holding of 50% with 0% pledged. Which carries more risk from a promoter pledge factor perspective?"
        solution={[
          {
            step: 'Compute effective promoter exposure',
            formula: '\\text{A: Pledged} = 0.40 \\times 65\\% = 26\\% \\text{ of total shares}',
            explanation: '26% of total shares are pledged by promoters. If the stock falls, lenders may sell pledged shares, creating a forced-selling spiral (seen in DHFL, Zee, Reliance ADAG).',
          },
          {
            step: 'Compare pledge ratios',
            formula: '\\text{A: Pledge ratio} = 40\\%, \\quad \\text{B: Pledge ratio} = 0\\%',
            explanation: 'Company A has significantly higher risk. SEBI requires disclosure of pledging, and historical NSE data shows pledged stocks underperform by 4-6% annually.',
          },
          {
            step: 'Signal interpretation',
            formula: '\\text{Short A, Long B (or underweight A in long-only)}',
            explanation: 'The pledge factor would assign a negative score to Company A and a positive score to Company B. This factor captured major blowups in Indian markets: DHFL (2019), Zee (2019), and several Adani group stocks during periods of high pledge ratios.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          India offers unique alternative factors not available in most global markets.
          <strong>Promoter holding changes</strong> and <strong>pledge ratios</strong> from
          SEBI's mandatory quarterly disclosures are particularly powerful, with low correlation
          to standard factors. <strong>FII flow data</strong> from NSDL/CDSL captures the
          information content of foreign institutional activity. These India-specific signals
          provide genuine diversification when added to a Fama-French-style factor model.
          Always lag ownership data by the publication delay (typically 21 days after quarter-end).
        </p>
      </NoteBlock>
    </div>
  )
}
