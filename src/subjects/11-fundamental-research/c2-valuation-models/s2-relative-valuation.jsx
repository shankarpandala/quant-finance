import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveViz() {
  const [sectorPE, setSectorPE] = useState(25)
  const [histPE, setHistPE] = useState(20)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive Visualization
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust parameters to explore the concepts interactively.
      </p>
      <div className="mb-4 grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400"><span>Sector P/E: {sectorPE}</span><input type="range" min="5" max="80" step="1" value={sectorPE} onChange={e => setSectorPE(parseInt(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" /></label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400"><span>Historical Avg: {histPE}</span><input type="range" min="5" max="60" step="1" value={histPE} onChange={e => setHistPE(parseInt(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" /></label>
      </div>
      <div className="grid grid-cols-2 gap-3 text-center text-xs">
        <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30">
          <div className="text-gray-500 dark:text-gray-400">Output 1</div>
          <div className="text-lg font-bold text-indigo-600">{sectorPE}</div>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30">
          <div className="text-gray-500 dark:text-gray-400">Output 2</div>
          <div className="text-lg font-bold text-amber-600">{histPE}</div>
        </div>
      </div>
    </div>
  )
}

export default function RelativeValuation() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        P/E and EV/EBITDA Relative Valuation for Nifty Sectors
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Relative valuation compares stocks to peers using multiples like P/E, EV/EBITDA, and P/B. For Indian markets, sectoral benchmarking is essential because Nifty sector indices trade at vastly different multiples: IT at 25-30x P/E, Banking at 12-18x, FMCG at 50-70x, and Metals at 6-10x. Understanding these differences and mean-reversion patterns is key to systematic value investing on NSE.
      </p>

      <DefinitionBlock
        title="Relative Valuation Multiple"
        label="Definition 11.5"
        definition="A valuation multiple relates market price to a fundamental metric: P/E = Price/EPS, EV/EBITDA = Enterprise Value/EBITDA, P/B = Price/Book Value. For Indian stocks, multiples should be compared within sectors (cross-sectional) and against historical averages (time-series)."
        notation="P/E = Market Cap / Net Profit, EV = Market Cap + Debt - Cash, EBITDA = EBIT + Depreciation"
      />

      <BlockMath math="\text{P/E Relative} = \frac{\text{P/E}_{\text{stock}}}{\text{P/E}_{\text{sector median}}}" />

      <BlockMath math="\text{EV/EBITDA} = \frac{\text{Market Cap} + \text{Net Debt}}{\text{EBITDA}}" />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Mathematical Framework
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The mathematical foundation enables rigorous analysis and systematic implementation for Indian market applications.
      </p>

      <TheoremBlock
        title="Mean Reversion of Multiples"
        label="Theorem 11.5"
        statement="Valuation multiples for Indian sectors exhibit mean reversion: sectors trading above their historical average P/E tend to underperform, and vice versa. The half-life of mean reversion for Nifty sector P/E ratios is approximately 18-24 months."
        proof="Estimated from AR(1) regression of P/E ratios on Nifty sector data: P/E_t = alpha + beta * P/E_{t-1}. Half-life = -log(2)/log(beta)."
      />

      <InteractiveViz />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Implementation
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The following Python implementation demonstrates the core concepts applied to Indian market data,
        using NSE stocks, Nifty indices, and INR-denominated financial data.
      </p>

      <PythonCode
        title="relative_valuation_nifty.py"
        runnable
        code={`import numpy as np

# Relative valuation for Nifty 50 sectors
sectors = {
    'Nifty IT': {'pe': 27.5, 'ev_ebitda': 20.1, 'pb': 8.5, 'hist_pe': 24.0, 'stocks': ['TCS', 'INFY', 'WIPRO', 'HCLTECH']},
    'Nifty Bank': {'pe': 14.2, 'ev_ebitda': None, 'pb': 2.1, 'hist_pe': 16.5, 'stocks': ['HDFCBANK', 'ICICIBANK', 'SBIN', 'AXISBANK']},
    'Nifty FMCG': {'pe': 52.3, 'ev_ebitda': 38.5, 'pb': 12.4, 'hist_pe': 45.0, 'stocks': ['HINDUNILVR', 'ITC', 'NESTLEIND']},
    'Nifty Metal': {'pe': 8.5, 'ev_ebitda': 5.2, 'pb': 1.4, 'hist_pe': 12.0, 'stocks': ['TATASTEEL', 'HINDALCO', 'JSWSTEEL']},
    'Nifty Pharma': {'pe': 32.1, 'ev_ebitda': 22.4, 'pb': 4.8, 'hist_pe': 28.0, 'stocks': ['SUNPHARMA', 'DRREDDY', 'CIPLA']},
    'Nifty Auto': {'pe': 24.8, 'ev_ebitda': 16.2, 'pb': 5.1, 'hist_pe': 22.0, 'stocks': ['MARUTI', 'TATAMOTORS', 'M&M']},
}

print("=== Nifty Sector Relative Valuation ===")
print(f"\n{'Sector':<15} {'P/E':>6} {'Hist P/E':>8} {'Premium':>8} {'EV/EBITDA':>10} {'P/B':>6}")
print("-" * 58)
for name, d in sectors.items():
    premium = (d['pe'] / d['hist_pe'] - 1) * 100
    ev_str = f"{d['ev_ebitda']:.1f}" if d['ev_ebitda'] else "N/A"
    signal = "EXPENSIVE" if premium > 15 else ("CHEAP" if premium < -15 else "FAIR")
    print(f"{name:<15} {d['pe']:>6.1f} {d['hist_pe']:>8.1f} {premium:>+7.1f}% {ev_str:>10} {d['pb']:>6.1f}  [{signal}]")

# Value strategy signal
print("\n=== Value Signal (Buy cheap sectors, sell expensive) ===")
ranked = sorted(sectors.items(), key=lambda x: x[1]['pe']/x[1]['hist_pe'])
for i, (name, d) in enumerate(ranked):
    signal = "BUY" if i < 2 else ("SELL" if i >= len(ranked)-2 else "HOLD")
    print(f"  {signal:4s}: {name} (P/E ratio: {d['pe']/d['hist_pe']:.2f}x historical)")`}
      />

      <ExampleBlock
        title="Sector Rotation Using P/E"
        difficulty="intermediate"
        problem="Nifty Metal trades at 8.5x P/E vs historical average of 12x. Nifty FMCG trades at 52x vs historical 45x. Which sector is more attractive on relative basis?"
        solution={[
          {
            step: 'Compute P/E ratios',
            formula: '\text{Metal: } 8.5/12.0 = 0.71x, \quad \text{FMCG: } 52.3/45.0 = 1.16x',
            explanation: 'Metal is 29% below historical average, FMCG is 16% above.',
          },
          {
            step: 'Value signal',
            formula: '\text{Metal: BUY (0.71x)}, \quad \text{FMCG: SELL (1.16x)}',
            explanation: 'Rotate from expensive FMCG to cheap Metal.',
          },
          {
            step: 'Caveat',
            formula: '\text{Check if low Metal P/E is cyclical peak earnings}',
            explanation: 'Cyclical sectors can have low P/E at earnings peaks -- use EV/EBITDA or normalized earnings for cyclicals.',
          }
        ]}
      />

      <NoteBlock title="Indian Market Context" type="warning">
        <p>
          When applying these techniques to Indian markets, consider SEBI regulations, NSE/BSE
          data availability, and India-specific factors like monsoon seasonality, RBI policy
          cycles, and FII/DII flow dynamics.
        </p>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Relative valuation provides quick, actionable signals for Indian sector rotation. P/E mean reversion is a robust factor for Nifty sector indices with 18-24 month half-life. Always compare within sectors and adjust for cyclicality.
        </p>
      </NoteBlock>
    </div>
  )
}
