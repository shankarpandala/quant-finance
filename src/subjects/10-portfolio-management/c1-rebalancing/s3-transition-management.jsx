import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveTransition() {
  const [portfolioSize, setPortfolioSize] = useState(500)
  const [overlapPct, setOverlapPct] = useState(40)
  const [tradingDays, setTradingDays] = useState(5)

  const netTrade = portfolioSize * (1 - overlapPct / 100)
  const explicitCost = netTrade * 0.0015
  const dailyTrade = netTrade / tradingDays
  const impactBps = 15 * Math.sqrt(dailyTrade / 500)
  const impactCost = netTrade * impactBps / 10000
  const totalCost = explicitCost + impactCost
  const totalBps = (totalCost / portfolioSize) * 10000

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Portfolio Transition Cost Estimator
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Estimate transition costs for restructuring an Indian institutional portfolio.
      </p>
      <div className="mb-4 grid grid-cols-3 gap-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Portfolio (INR Cr): {portfolioSize}</span>
          <input type="range" min="50" max="5000" step="50" value={portfolioSize}
            onChange={e => setPortfolioSize(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Overlap: {overlapPct}%</span>
          <input type="range" min="0" max="80" step="5" value={overlapPct}
            onChange={e => setOverlapPct(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Trading Days: {tradingDays}</span>
          <input type="range" min="1" max="20" step="1" value={tradingDays}
            onChange={e => setTradingDays(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>
      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30">
          <div className="text-gray-500">Net Trade</div>
          <div className="text-lg font-bold text-indigo-600">{netTrade.toFixed(0)} Cr</div>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30">
          <div className="text-gray-500">Explicit TC</div>
          <div className="text-lg font-bold text-amber-600">{explicitCost.toFixed(1)} Cr</div>
        </div>
        <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/30">
          <div className="text-gray-500">Impact Cost</div>
          <div className="text-lg font-bold text-red-600">{impactCost.toFixed(1)} Cr</div>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
          <div className="text-gray-500">Total (bps)</div>
          <div className="text-lg font-bold text-purple-600">{totalBps.toFixed(1)}</div>
        </div>
      </div>
    </div>
  )
}

export default function TransitionManagement() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Portfolio Transition Management
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Portfolio transitions involve restructuring large portfolios from one set of holdings to
        another. For Indian institutional investors like EPFO, NPS, and insurance companies,
        transitions can involve moving hundreds of crores across NSE-listed stocks while
        minimizing market impact and tracking error during the transition period.
      </p>

      <DefinitionBlock
        title="Implementation Shortfall"
        label="Definition 10.3"
        definition="Implementation shortfall (IS) is the difference between the paper return of a portfolio decision and the actual return achieved after accounting for all trading costs. IS = (Paper Portfolio Value - Actual Portfolio Value) / Paper Portfolio Value. It captures explicit costs (STT, brokerage), implicit costs (spread, market impact), and opportunity cost (delay, missed trades)."
        notation="IS = implementation shortfall, paper portfolio = ideal execution at decision prices"
      />

      <BlockMath math="\text{IS} = \underbrace{\text{Delay Cost}}_{\text{Opportunity}} + \underbrace{\text{Market Impact}}_{\text{Price Movement}} + \underbrace{\text{Explicit Costs}}_{\text{STT, Brokerage}} + \underbrace{\text{Timing Risk}}_{\text{Vol During Transition}}" />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Transition Cost Components
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For large Indian institutional transitions, the cost breakdown is typically:
      </p>

      <BlockMath math="\text{TC}_{\text{total}} = \sum_{i=1}^{n} |\Delta w_i| \cdot V \cdot \left(c_{\text{explicit}} + \sigma_i \eta \sqrt{\frac{|\Delta w_i| V}{V_i^{\text{ADV}}}}\right)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="V" /> is portfolio value, <InlineMath math="V_i^{\text{ADV}}" />
        is average daily volume, <InlineMath math="\eta \approx 0.1\text{-}0.2" /> is the impact
        coefficient, and <InlineMath math="c_{\text{explicit}} \approx 15" /> bps for Indian equities.
      </p>

      <TheoremBlock
        title="Optimal Transition Speed"
        label="Theorem 10.2"
        statement="For a portfolio transition of size X with temporary impact coefficient η and daily volatility σ, the optimal number of trading days to complete the transition is T* = √(X·η/(σ²·λ)), where λ is the urgency cost parameter."
        proof="The total cost as a function of trading duration T is TC(T) = η·(X/T) + λ·σ²·T, where the first term is market impact and the second is opportunity cost from being out of position. Setting dTC/dT = 0 yields T* = √(X·η/(σ²·λ))."
      />

      <InteractiveTransition />

      <PythonCode
        title="transition_management.py"
        runnable
        code={`import numpy as np

# Portfolio transition: old benchmark to new benchmark
legacy = {'RELIANCE': 0.15, 'TCS': 0.12, 'HDFCBANK': 0.18, 'INFY': 0.08,
          'ITC': 0.12, 'LT': 0.10, 'SBIN': 0.15, 'BHARTIARTL': 0.10}
target = {'RELIANCE': 0.12, 'TCS': 0.15, 'HDFCBANK': 0.12, 'INFY': 0.10,
          'ITC': 0.08, 'LT': 0.08, 'SBIN': 0.10, 'BHARTIARTL': 0.05,
          'AXISBANK': 0.10, 'MARUTI': 0.10}

portfolio_value = 1000  # INR crore
all_stocks = sorted(set(list(legacy.keys()) + list(target.keys())))

adv = {'RELIANCE': 3000, 'TCS': 800, 'HDFCBANK': 2500, 'INFY': 1200,
       'ITC': 1500, 'LT': 600, 'SBIN': 2000, 'BHARTIARTL': 800,
       'AXISBANK': 1000, 'MARUTI': 400}
daily_vol = {'RELIANCE': 0.018, 'TCS': 0.015, 'HDFCBANK': 0.014,
             'INFY': 0.016, 'ITC': 0.013, 'LT': 0.019, 'SBIN': 0.020,
             'BHARTIARTL': 0.017, 'AXISBANK': 0.019, 'MARUTI': 0.018}

eta = 0.15
total_explicit = 0
total_impact = 0

print("=== Portfolio Transition Analysis ===")
print(f"Portfolio: INR {portfolio_value} Cr")
print(f"\\n{'Stock':<12} {'Legacy':>8} {'Target':>8} {'Trade':>8} {'Value(Cr)':>10} {'Impact(bp)':>10}")
print("-" * 62)

for stock in all_stocks:
    w_old = legacy.get(stock, 0)
    w_new = target.get(stock, 0)
    trade = w_new - w_old
    trade_value = abs(trade) * portfolio_value
    if trade_value < 0.01:
        continue
    pct_adv = trade_value / adv.get(stock, 500)
    impact = daily_vol.get(stock, 0.017) * eta * np.sqrt(pct_adv) * 10000
    total_explicit += trade_value * 0.0015
    total_impact += trade_value * impact / 10000
    print(f"{stock:<12} {w_old:>8.2%} {w_new:>8.2%} {trade:>+8.2%} {trade_value:>10.1f} {impact:>10.1f}")

print(f"\\nExplicit cost: INR {total_explicit:.2f} Cr ({total_explicit/portfolio_value*10000:.1f} bps)")
print(f"Impact cost:   INR {total_impact:.2f} Cr ({total_impact/portfolio_value*10000:.1f} bps)")
print(f"Total cost:    INR {total_explicit+total_impact:.2f} Cr ({(total_explicit+total_impact)/portfolio_value*10000:.1f} bps)")`}
      />

      <ExampleBlock
        title="NPS Fund Manager Transition"
        difficulty="advanced"
        problem="NPS Tier I equity transitions INR 2000 Cr from SBI MF to HDFC MF with 40% holdings overlap. Estimate total transition cost assuming 5 trading days."
        solution={[
          {
            step: 'Compute net transition',
            formula: '\\text{Net} = 2000 \\times (1 - 0.40) = 1200 \\text{ Cr}',
            explanation: '40% overlap means only 60% needs trading.',
          },
          {
            step: 'Explicit costs (STT + brokerage)',
            formula: '\\text{Explicit} = 1200 \\times 0.0015 = 1.8 \\text{ Cr (15 bps)}',
          },
          {
            step: 'Market impact (5-day execution)',
            formula: '\\text{Impact} \\approx 1200 \\times 0.0020 = 2.4 \\text{ Cr (20 bps)}',
            explanation: 'Large-cap NPS stocks have ~20 bps impact when spread over 5 days.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Portfolio transitions require careful pre-trade analysis and execution planning.
          For Indian institutional portfolios, maximizing overlap between legacy and target
          reduces costs dramatically. Use crossing networks, dark pools (where available on NSE),
          and multi-day execution to minimize impact. Total costs typically range from 25-80 bps
          for Nifty 50-level stocks.
        </p>
      </NoteBlock>
    </div>
  )
}
