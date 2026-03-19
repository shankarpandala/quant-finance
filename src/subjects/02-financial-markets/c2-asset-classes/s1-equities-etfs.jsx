import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveSectorWeights() {
  const [showIndex, setShowIndex] = useState('nifty50')

  const nifty50Sectors = [
    { name: 'Financials', weight: 35.2, color: '#6366f1' },
    { name: 'IT', weight: 13.8, color: '#22c55e' },
    { name: 'Oil & Gas', weight: 12.5, color: '#f59e0b' },
    { name: 'Consumer', weight: 10.1, color: '#ef4444' },
    { name: 'Auto', weight: 6.8, color: '#8b5cf6' },
    { name: 'Metals', weight: 4.2, color: '#14b8a6' },
    { name: 'Pharma', weight: 4.0, color: '#ec4899' },
    { name: 'Telecom', weight: 3.5, color: '#f97316' },
    { name: 'Power', weight: 3.1, color: '#06b6d4' },
    { name: 'Others', weight: 6.8, color: '#6b7280' },
  ]

  const sensexSectors = [
    { name: 'Financials', weight: 38.5, color: '#6366f1' },
    { name: 'IT', weight: 14.2, color: '#22c55e' },
    { name: 'Oil & Gas', weight: 13.1, color: '#f59e0b' },
    { name: 'Consumer', weight: 11.5, color: '#ef4444' },
    { name: 'Auto', weight: 7.2, color: '#8b5cf6' },
    { name: 'Pharma', weight: 4.5, color: '#ec4899' },
    { name: 'Metals', weight: 3.8, color: '#14b8a6' },
    { name: 'Others', weight: 7.2, color: '#6b7280' },
  ]

  const sectors = showIndex === 'nifty50' ? nifty50Sectors : sensexSectors

  const chartW = 500, chartH = 180
  const padL = 85, padR = 15, padT = 15, padB = 25
  const plotW = chartW - padL - padR, plotH = chartH - padT - padB
  const barH = plotH / sectors.length * 0.7
  const rowH = plotH / sectors.length

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Indian Index Sector Composition
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Explore the sector weights of India's flagship indices. Financials dominate both
        Nifty 50 and Sensex, creating concentration risk.
      </p>

      <div className="mb-4">
        <select value={showIndex} onChange={e => setShowIndex(e.target.value)}
          className="rounded border border-gray-300 bg-white px-3 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
          <option value="nifty50">Nifty 50</option>
          <option value="sensex">BSE Sensex</option>
        </select>
      </div>

      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full max-w-xl mx-auto block">
        {sectors.map((s, i) => {
          const y = padT + i * rowH
          const w = (s.weight / 40) * plotW
          return (
            <g key={s.name}>
              <text x={padL - 5} y={y + barH / 2 + 3} textAnchor="end" className="text-[9px]" fill="#6b7280">{s.name}</text>
              <rect x={padL} y={y} width={w} height={barH} fill={s.color} opacity="0.7" rx="2" />
              <text x={padL + w + 5} y={y + barH / 2 + 3} className="text-[9px] font-bold" fill={s.color}>{s.weight}%</text>
            </g>
          )
        })}
      </svg>

      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        Top 3 sectors account for <strong>{sectors.slice(0, 3).reduce((s, x) => s + x.weight, 0).toFixed(1)}%</strong>{' '}
        of the index. Consider sector-neutral strategies to mitigate concentration risk.
      </p>
    </div>
  )
}

export default function EquitiesETFs() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Indian Equities and ETFs
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Indian equities listed on NSE and BSE form the primary asset class for quantitative
        strategies. Understanding stock classification, index construction, corporate actions,
        and ETF mechanics is essential for building robust trading systems.
      </p>

      <DefinitionBlock
        title="Equity Classification in India"
        label="Definition 1.1"
        definition={<>
          Indian stocks are classified by market capitalization: <strong>Large-cap</strong>{' '}
          (top 100 by market cap, includes Nifty 50 constituents like Reliance, TCS, HDFC Bank),{' '}
          <strong>Mid-cap</strong> (101st--250th), and <strong>Small-cap</strong> (251st and
          below). SEBI mandates this classification, updated semi-annually, which affects
          mutual fund portfolio mandates and liquidity patterns.
        </>}
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The Nifty 50 index is a free-float market-cap weighted index of 50 large-cap stocks
        selected by NSE Indices Ltd. The index value is computed as:
      </p>

      <BlockMath math="\text{Index Value} = \frac{\sum_{i=1}^{50} p_i \times \text{IWF}_i \times s_i}{\text{Base Market Cap}} \times \text{Base Value}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="p_i" /> is the stock price, <InlineMath math="\text{IWF}_i" />{' '}
        is the investable weight factor (free-float fraction), and <InlineMath math="s_i" />{' '}
        is the number of equity shares. Stocks with higher free-float market cap have
        larger index weights.
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Stock</th>
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Sector</th>
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Nifty Weight</th>
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Avg Daily Vol (INR Cr)</th>
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">F&O Lot Size</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2 font-medium">Reliance</td>
              <td className="px-3 py-2">Oil & Gas</td>
              <td className="px-3 py-2">~10%</td>
              <td className="px-3 py-2">~3,500</td>
              <td className="px-3 py-2">250</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2 font-medium">HDFC Bank</td>
              <td className="px-3 py-2">Financials</td>
              <td className="px-3 py-2">~9%</td>
              <td className="px-3 py-2">~2,800</td>
              <td className="px-3 py-2">550</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2 font-medium">TCS</td>
              <td className="px-3 py-2">IT</td>
              <td className="px-3 py-2">~5%</td>
              <td className="px-3 py-2">~1,200</td>
              <td className="px-3 py-2">150</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2 font-medium">Infosys</td>
              <td className="px-3 py-2">IT</td>
              <td className="px-3 py-2">~5%</td>
              <td className="px-3 py-2">~1,500</td>
              <td className="px-3 py-2">300</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-medium">ITC</td>
              <td className="px-3 py-2">Consumer</td>
              <td className="px-3 py-2">~4%</td>
              <td className="px-3 py-2">~1,800</td>
              <td className="px-3 py-2">1600</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- Interactive --- */}
      <InteractiveSectorWeights />

      {/* --- ETFs --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Exchange-Traded Funds (ETFs) in India
      </h3>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Indian ETFs have grown significantly, with total AUM exceeding INR 6 lakh crore.
        Key ETF categories for quant strategies include:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">ETF Type</th>
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Examples</th>
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Quant Use Case</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2">Index ETFs</td>
              <td className="px-3 py-2">Nifty BeES, SBI Sensex ETF</td>
              <td className="px-3 py-2">Benchmark, pairs with futures</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2">Sectoral ETFs</td>
              <td className="px-3 py-2">Bank BeES, IT BeES</td>
              <td className="px-3 py-2">Sector rotation strategies</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2">Gold ETFs</td>
              <td className="px-3 py-2">SBI Gold ETF, HDFC Gold ETF</td>
              <td className="px-3 py-2">Portfolio hedging, safe haven</td>
            </tr>
            <tr>
              <td className="px-3 py-2">International</td>
              <td className="px-3 py-2">MOSt NASDAQ 100</td>
              <td className="px-3 py-2">Global diversification</td>
            </tr>
          </tbody>
        </table>
      </div>

      <TheoremBlock
        title="ETF Tracking Error"
        label="Theorem 1.1"
        statement={<>
          The tracking error of an ETF relative to its benchmark is defined as:
          <BlockMath math="\text{TE} = \sigma(r_{\text{ETF}} - r_{\text{index}}) \times \sqrt{252}" />
          For well-managed Nifty ETFs, the annualized tracking error is typically 0.1--0.3%.
          Sources include: expense ratio, cash drag, rebalancing costs, dividend timing,
          and creation/redemption friction.
        </>}
      />

      <NoteBlock title="ADRs and Global Listings" type="info">
        <p>
          Several Indian companies trade as ADRs (American Depositary Receipts) on US
          exchanges: Infosys (INFY), HDFC Bank (HDB), ICICI Bank (IBN), and Wipro (WIT).
          The price difference between ADRs and NSE-listed shares (adjusted for INR/USD)
          creates arbitrage opportunities, though capital account restrictions limit
          direct exploitation. The ADR premium/discount is a useful signal for cross-border
          sentiment.
        </p>
      </NoteBlock>

      {/* --- Python Code --- */}
      <PythonCode
        title="indian_equities_analysis.py"
        runnable
        code={`import numpy as np

np.random.seed(42)

# --- Nifty 50 Stock Universe ---
nifty_stocks = {
    'RELIANCE': {'sector': 'Oil & Gas', 'weight': 10.2, 'beta': 0.95, 'mcap_cr': 1800000},
    'HDFCBANK': {'sector': 'Financials', 'weight': 9.1, 'beta': 0.85, 'mcap_cr': 1200000},
    'TCS': {'sector': 'IT', 'weight': 5.2, 'beta': 0.75, 'mcap_cr': 1350000},
    'INFY': {'sector': 'IT', 'weight': 5.0, 'beta': 0.80, 'mcap_cr': 620000},
    'ICICIBANK': {'sector': 'Financials', 'weight': 6.5, 'beta': 1.10, 'mcap_cr': 700000},
    'ITC': {'sector': 'Consumer', 'weight': 4.2, 'beta': 0.65, 'mcap_cr': 550000},
    'KOTAKBANK': {'sector': 'Financials', 'weight': 3.8, 'beta': 0.90, 'mcap_cr': 380000},
    'SBIN': {'sector': 'Financials', 'weight': 3.2, 'beta': 1.25, 'mcap_cr': 600000},
    'BHARTIARTL': {'sector': 'Telecom', 'weight': 3.5, 'beta': 0.70, 'mcap_cr': 750000},
    'TATASTEEL': {'sector': 'Metals', 'weight': 1.5, 'beta': 1.40, 'mcap_cr': 180000},
}

print("=== Nifty 50 Stock Analysis ===\\n")
print(f"{'Stock':<14} {'Sector':<14} {'Weight%':>8} {'Beta':>6} {'MCap(Cr)':>10}")
total_weight = 0
for stock, info in sorted(nifty_stocks.items(), key=lambda x: -x[1]['weight']):
    print(f"{stock:<14} {info['sector']:<14} {info['weight']:>8.1f} {info['beta']:>6.2f} {info['mcap_cr']:>10,}")
    total_weight += info['weight']
print(f"{'TOTAL':<14} {'':14} {total_weight:>8.1f}")

# --- Sector Concentration ---
print("\\n=== Sector Concentration ===")
sector_weights = {}
for stock, info in nifty_stocks.items():
    sector_weights[info['sector']] = sector_weights.get(info['sector'], 0) + info['weight']

for sector, weight in sorted(sector_weights.items(), key=lambda x: -x[1]):
    bar = '█' * int(weight * 2)
    print(f"  {sector:<14} {weight:>6.1f}% {bar}")

# HHI (Herfindahl-Hirschman Index) for sector concentration
hhi = sum(w**2 for w in sector_weights.values())
print(f"\\nSector HHI: {hhi:.0f} (>2500 = highly concentrated)")

# --- Simulate Returns and Compute Portfolio Metrics ---
n_days = 252
market_returns = np.random.normal(0.0005, 0.012, n_days)

print("\\n=== Simulated Annual Return Summary ===")
print(f"{'Stock':<14} {'Ann Return':>10} {'Ann Vol':>8} {'Sharpe':>8}")
for stock, info in nifty_stocks.items():
    # returns = alpha + beta * market + idiosyncratic
    alpha_daily = np.random.uniform(-0.0001, 0.0003)
    idio = np.random.normal(0, 0.015, n_days)
    stock_returns = alpha_daily + info['beta'] * market_returns + idio
    ann_ret = np.mean(stock_returns) * 252
    ann_vol = np.std(stock_returns) * np.sqrt(252)
    rf = 0.065
    sharpe = (ann_ret - rf) / ann_vol
    print(f"{stock:<14} {ann_ret*100:>9.1f}% {ann_vol*100:>7.1f}% {sharpe:>8.2f}")

# --- ETF Tracking Error ---
print("\\n=== ETF Tracking Error Simulation ===")
index_returns = market_returns
etf_returns = index_returns - 0.0001/252  # Expense ratio drag
# Add tracking noise
etf_returns += np.random.normal(0, 0.0002, n_days)
te = np.std(etf_returns - index_returns) * np.sqrt(252)
print(f"Annualized tracking error: {te*100:.3f}%")
print(f"Expense ratio drag: ~{0.01*100:.2f}% per year")
print(f"Total performance drag: ~{(te + 0.0001*252)*100:.3f}%")`}
      />

      {/* --- Worked Example --- */}
      <ExampleBlock
        title="Computing Index Weight After a Stock Split"
        difficulty="beginner"
        problem="Reliance Industries does a 1:1 bonus issue (stock split). Its price halves from INR 2,500 to INR 1,250. What happens to its Nifty 50 weight?"
        solution={[
          {
            step: 'Before split',
            formula: '\\text{Market Cap} = 2500 \\times 6 \\text{ billion shares} = \\text{INR } 15 \\text{ lakh crore}',
          },
          {
            step: 'After split',
            formula: '\\text{Market Cap} = 1250 \\times 12 \\text{ billion shares} = \\text{INR } 15 \\text{ lakh crore}',
            explanation: 'The market cap is unchanged -- price halves, shares double.',
          },
          {
            step: 'Index weight unchanged',
            formula: '\\text{Weight}_{\\text{after}} = \\text{Weight}_{\\text{before}} \\approx 10\\%',
            explanation: 'Free-float market cap is unchanged, so the index weight remains the same. The NSE Indices team adjusts the divisor to ensure no discontinuity in the index value. No rebalancing is needed.',
          },
        ]}
      />

      {/* --- Key Takeaway --- */}
      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Indian equities offer a rich universe for quantitative strategies, from large-cap
          Nifty 50 stocks with tight spreads and deep liquidity, to mid/small-caps with higher
          alpha potential but greater execution challenges. Key considerations: (1) the Nifty
          is heavily concentrated in Financials (~35%), (2) IT stocks provide INR/USD hedging,
          (3) ETFs are growing but still have lower liquidity than direct equity, (4) corporate
          actions (bonus, splits, rights issues) require careful data handling, and (5)
          F&O lot sizes define the minimum tradeable unit for derivatives.
        </p>
      </NoteBlock>
    </div>
  )
}
