import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveBrinson() {
  const [bankWp, setBankWp] = useState(35)
  const [itWp, setItWp] = useState(25)
  const [bankRp, setBankRp] = useState(18)
  const [itRp, setItRp] = useState(22)

  const otherWp = 100 - bankWp - itWp
  const otherRp = 10

  const bankWb = 30; const bankRb = 15
  const itWb = 20; const itRb = 20
  const otherWb = 50; const otherRb = 12

  const portfolioReturn = (bankWp * bankRp + itWp * itRp + otherWp * otherRp) / 100
  const benchmarkReturn = (bankWb * bankRb + itWb * itRb + otherWb * otherRb) / 100
  const activeReturn = portfolioReturn - benchmarkReturn

  const allocationBank = (bankWp - bankWb) / 100 * (bankRb - benchmarkReturn) / 100
  const allocationIT = (itWp - itWb) / 100 * (itRb - benchmarkReturn) / 100
  const allocationOther = (otherWp - otherWb) / 100 * (otherRb - benchmarkReturn) / 100
  const totalAllocation = (allocationBank + allocationIT + allocationOther) * 100

  const selectionBank = bankWb / 100 * (bankRp - bankRb) / 100
  const selectionIT = itWb / 100 * (itRp - itRb) / 100
  const selectionOther = otherWb / 100 * (otherRp - otherRb) / 100
  const totalSelection = (selectionBank + selectionIT + selectionOther) * 100

  const interaction = activeReturn - totalAllocation - totalSelection

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Brinson Attribution (NSE Sectors)
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust portfolio weights and returns for Banking, IT, and Other sectors.
        Benchmark weights: Banks 30%, IT 20%, Others 50%.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Bank Weight: {bankWp}%</span>
          <input type="range" min="0" max="60" step="1" value={bankWp}
            onChange={e => setBankWp(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>IT Weight: {itWp}%</span>
          <input type="range" min="0" max="60" step="1" value={itWp}
            onChange={e => setItWp(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Bank Return: {bankRp}%</span>
          <input type="range" min="-10" max="40" step="1" value={bankRp}
            onChange={e => setBankRp(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>IT Return: {itRp}%</span>
          <input type="range" min="-10" max="40" step="1" value={itRp}
            onChange={e => setItRp(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">Portfolio</p>
          <p className="text-lg font-bold text-blue-800 dark:text-blue-200">{portfolioReturn.toFixed(2)}%</p>
        </div>
        <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Benchmark</p>
          <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{benchmarkReturn.toFixed(2)}%</p>
        </div>
        <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/30">
          <p className="text-xs font-semibold text-green-700 dark:text-green-300">Allocation</p>
          <p className="text-lg font-bold text-green-800 dark:text-green-200">{totalAllocation.toFixed(2)}%</p>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
          <p className="text-xs font-semibold text-purple-700 dark:text-purple-300">Selection</p>
          <p className="text-lg font-bold text-purple-800 dark:text-purple-200">{totalSelection.toFixed(2)}%</p>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">Interaction</p>
          <p className="text-lg font-bold text-amber-800 dark:text-amber-200">{interaction.toFixed(2)}%</p>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
        Active Return = {activeReturn.toFixed(2)}% = Allocation ({totalAllocation.toFixed(2)}%)
        + Selection ({totalSelection.toFixed(2)}%) + Interaction ({interaction.toFixed(2)}%)
      </p>
    </div>
  )
}

export default function BrinsonAttribution() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Brinson Performance Attribution
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        When a fund manager outperforms the Nifty 50, was it because they overweighted the
        right sectors (allocation), picked the best stocks within sectors (selection), or both?
        The Brinson-Hood-Beebower (BHB) attribution model decomposes active returns into
        these components, providing the standard framework used by Indian mutual funds, PMS
        schemes, and SEBI reporting.
      </p>

      <DefinitionBlock
        title="Brinson Attribution Model"
        label="Definition 4.2"
        definition="The Brinson model decomposes the portfolio's active return (R_p - R_b) into three effects: allocation (sector weighting decisions), selection (stock picking within sectors), and interaction (the combined effect of both). The sectors are typically NSE industry classifications or GICS sectors."
        notation="R_p - R_b = \sum_i \underbrace{(w^p_i - w^b_i)(R^b_i - R_b)}_{\text{Allocation}} + \sum_i \underbrace{w^b_i(R^p_i - R^b_i)}_{\text{Selection}} + \sum_i \underbrace{(w^p_i - w^b_i)(R^p_i - R^b_i)}_{\text{Interaction}}"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Three Effects
      </h3>

      <BlockMath math="\text{Allocation}_i = (w^p_i - w^b_i) \times (R^b_i - R_b)" />
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        <strong>Allocation effect:</strong> Did the manager overweight sectors that outperformed
        the benchmark? If you overweight Banking (vs. Nifty weights) and Banking beats Nifty,
        you earn positive allocation alpha.
      </p>

      <BlockMath math="\text{Selection}_i = w^b_i \times (R^p_i - R^b_i)" />
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        <strong>Selection effect:</strong> Within each sector, did the manager pick stocks that
        outperformed the sector benchmark? If your banking picks returned 20% while the Bank
        Nifty returned 15%, you earn positive selection alpha.
      </p>

      <BlockMath math="\text{Interaction}_i = (w^p_i - w^b_i) \times (R^p_i - R^b_i)" />
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        <strong>Interaction effect:</strong> The joint effect of overweighting a sector AND
        selecting better stocks in it. This is often combined with selection in the
        Brinson-Fachler variant.
      </p>

      <TheoremBlock
        title="Brinson-Fachler Decomposition"
        label="Theorem 4.2"
        statement="The Brinson-Fachler variant combines the interaction effect with the allocation effect, yielding a cleaner two-way decomposition that is preferred by most Indian fund managers."
        formula="R_p - R_b = \sum_i (w^p_i - w^b_i)(R^b_i - R_b) + \sum_i w^p_i(R^p_i - R^b_i)"
        proof="Adding the interaction term to the allocation effect: (w^p_i - w^b_i)(R^b_i - R_b) + (w^p_i - w^b_i)(R^p_i - R^b_i) = (w^p_i - w^b_i)(R^p_i - R_b). The selection effect becomes w^p_i(R^p_i - R^b_i) instead of w^b_i(R^p_i - R^b_i). This gives a cleaner interpretation: allocation measures the decision to deviate from benchmark weights, and selection measures stock-picking skill at portfolio weights."
      />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">NSE Sector</th>
              <th className="px-4 py-2 text-right text-gray-600 dark:text-gray-400">Bench Wt</th>
              <th className="px-4 py-2 text-right text-gray-600 dark:text-gray-400">Port Wt</th>
              <th className="px-4 py-2 text-right text-gray-600 dark:text-gray-400">Bench Ret</th>
              <th className="px-4 py-2 text-right text-gray-600 dark:text-gray-400">Port Ret</th>
              <th className="px-4 py-2 text-right text-gray-600 dark:text-gray-400">Alloc</th>
              <th className="px-4 py-2 text-right text-gray-600 dark:text-gray-400">Select</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Banking</td>
              <td className="px-4 py-2 text-right">30%</td>
              <td className="px-4 py-2 text-right">35%</td>
              <td className="px-4 py-2 text-right">15%</td>
              <td className="px-4 py-2 text-right">18%</td>
              <td className="px-4 py-2 text-right text-green-600">+0.13%</td>
              <td className="px-4 py-2 text-right text-green-600">+0.90%</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">IT</td>
              <td className="px-4 py-2 text-right">20%</td>
              <td className="px-4 py-2 text-right">25%</td>
              <td className="px-4 py-2 text-right">20%</td>
              <td className="px-4 py-2 text-right">22%</td>
              <td className="px-4 py-2 text-right text-green-600">+0.35%</td>
              <td className="px-4 py-2 text-right text-green-600">+0.40%</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Others</td>
              <td className="px-4 py-2 text-right">50%</td>
              <td className="px-4 py-2 text-right">40%</td>
              <td className="px-4 py-2 text-right">12%</td>
              <td className="px-4 py-2 text-right">10%</td>
              <td className="px-4 py-2 text-right text-red-600">+0.15%</td>
              <td className="px-4 py-2 text-right text-red-600">-1.00%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveBrinson />

      <PythonCode
        title="brinson_attribution.py"
        runnable
        code={`import numpy as np
import pandas as pd

# NSE Sector Data: Portfolio vs Nifty 50 benchmark
sectors = ['Banking', 'IT', 'Energy', 'FMCG', 'Pharma', 'Auto', 'Others']

# Benchmark (Nifty 50 sector weights and returns)
wb = np.array([0.30, 0.15, 0.12, 0.10, 0.08, 0.10, 0.15])
rb = np.array([0.16, 0.22, 0.08, 0.12, 0.18, 0.14, 0.10])

# Portfolio weights and returns
wp = np.array([0.35, 0.20, 0.08, 0.10, 0.12, 0.08, 0.07])
rp = np.array([0.19, 0.24, 0.06, 0.11, 0.22, 0.12, 0.09])

# Benchmark total return
Rb = np.dot(wb, rb)
# Portfolio total return
Rp = np.dot(wp, rp)

# --- Brinson-Hood-Beebower (3-way) ---
allocation = (wp - wb) * (rb - Rb)
selection = wb * (rp - rb)
interaction = (wp - wb) * (rp - rb)

# --- Brinson-Fachler (2-way) ---
allocation_bf = (wp - wb) * (rb - Rb)
selection_bf = wp * (rp - rb)

print("=== Brinson Performance Attribution ===")
print(f"Portfolio Return: {Rp*100:.2f}%")
print(f"Benchmark Return: {Rb*100:.2f}%")
print(f"Active Return:    {(Rp-Rb)*100:.2f}%\\n")

# Detailed breakdown
df = pd.DataFrame({
    'Sector': sectors,
    'W_bench': wb*100, 'W_port': wp*100,
    'R_bench': rb*100, 'R_port': rp*100,
    'Allocation': allocation*100,
    'Selection': selection*100,
    'Interaction': interaction*100,
    'Total': (allocation + selection + interaction)*100
})

print("--- BHB Three-Way Attribution (%) ---")
print(df[['Sector', 'W_bench', 'W_port', 'R_bench', 'R_port',
          'Allocation', 'Selection', 'Interaction', 'Total']].to_string(index=False))

print(f"\\n--- Summary ---")
print(f"Total Allocation:  {allocation.sum()*100:+.3f}%")
print(f"Total Selection:   {selection.sum()*100:+.3f}%")
print(f"Total Interaction: {interaction.sum()*100:+.3f}%")
print(f"Sum:               {(allocation.sum()+selection.sum()+interaction.sum())*100:+.3f}%")
print(f"Active Return:     {(Rp-Rb)*100:+.3f}% (should match)")

# Check
residual = (Rp - Rb) - (allocation.sum() + selection.sum() + interaction.sum())
print(f"Residual: {residual*100:.6f}% (should be ~0)")`}
      />

      <ExampleBlock
        title="Attribution for an Indian Equity Fund"
        difficulty="intermediate"
        problem="A fund overweighted Banking (35% vs 30% in Nifty) and its bank picks returned 20% vs 15% benchmark banking return. Nifty overall returned 13%. Compute allocation and selection effects for the banking sector."
        solution={[
          {
            step: 'Allocation effect for Banking',
            formula: '(w^p - w^b)(R^b_{\\text{bank}} - R_b) = (0.35-0.30)(0.15-0.13) = 0.05 \\times 0.02 = 0.10\\%',
            explanation: 'Overweighting banking by 5% in a sector that beat the Nifty by 2% added 10 bps.',
          },
          {
            step: 'Selection effect for Banking',
            formula: 'w^b(R^p_{\\text{bank}} - R^b_{\\text{bank}}) = 0.30 \\times (0.20 - 0.15) = 0.30 \\times 0.05 = 1.50\\%',
            explanation: 'Picking bank stocks that outperformed the banking sector by 5% added 150 bps. Selection dominated allocation here.',
          },
          {
            step: 'Total banking contribution',
            formula: '\\text{Allocation} + \\text{Selection} + \\text{Interaction} = 0.10\\% + 1.50\\% + 0.25\\% = 1.85\\%',
            explanation: 'The banking sector contributed 185 bps of active return, mostly through stock selection (picking HDFC Bank, ICICI Bank over weaker PSU banks).',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Multi-Period Attribution
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Single-period Brinson attribution does not aggregate correctly over multiple periods.
        The compounding effect creates a residual that grows with the number of periods and
        the magnitude of active returns. Two standard solutions are used in Indian fund
        management:
      </p>

      <BlockMath math="\text{Geometric linking (Cariño method):} \quad A_t^{\text{linked}} = A_t \times \frac{\ln(1+R_p) / \ln(1+R_b)}{R_p / R_b}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The Cariño (1999) method adjusts single-period attribution effects so they sum
        correctly to the multi-period geometric active return. The Menchero (2000) method
        provides an alternative approach based on exact decomposition of compounded returns.
        For SEBI-mandated quarterly and annual reporting, Indian PMS schemes typically use
        the Cariño method.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Fixed-Income Attribution for Indian Debt Funds
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For Indian debt mutual funds (SEBI categories: overnight, liquid, short duration,
        medium duration, long duration, dynamic bond), attribution uses a different
        framework based on key rate duration contributions:
      </p>

      <BlockMath math="R_p - R_b = \underbrace{\Delta y \cdot (D_p - D_b)}_{\text{Duration}} + \underbrace{\Delta s \cdot (S_p - S_b)}_{\text{Credit}} + \underbrace{\text{Carry}_p - \text{Carry}_b}_{\text{Carry}} + \epsilon" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="D" /> is duration, <InlineMath math="\Delta y" /> is the
        change in benchmark yield (10Y G-Sec), <InlineMath math="\Delta s" /> is the change
        in credit spread, and <InlineMath math="S" /> is spread duration. This decomposition
        is essential for understanding whether a debt fund's alpha comes from interest rate
        timing, credit selection, or carry harvesting in the Indian bond market.
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Attribution Type</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Asset Class</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Effects Decomposed</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">SEBI Use</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Brinson BHB</td>
              <td className="px-4 py-2">Equity</td>
              <td className="px-4 py-2">Allocation + Selection + Interaction</td>
              <td className="px-4 py-2">PMS / MF reporting</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Factor Attribution</td>
              <td className="px-4 py-2">Equity</td>
              <td className="px-4 py-2">Factor exposures + Alpha</td>
              <td className="px-4 py-2">Quant fund analysis</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Key Rate Duration</td>
              <td className="px-4 py-2">Fixed Income</td>
              <td className="px-4 py-2">Duration + Credit + Carry</td>
              <td className="px-4 py-2">Debt fund evaluation</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Multi-Asset</td>
              <td className="px-4 py-2">Balanced / Hybrid</td>
              <td className="px-4 py-2">Asset allocation + Within-asset</td>
              <td className="px-4 py-2">Hybrid fund reporting</td>
            </tr>
          </tbody>
        </table>
      </div>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Brinson attribution reveals <em>where</em> and <em>how</em> active returns are
          generated. For Indian equity portfolios, sector allocation decisions (overweighting
          Banking or IT vs. Nifty 50 weights) and stock selection within sectors are the two
          primary sources of alpha. SEBI-registered funds use this framework for investor
          reporting. For multi-period analysis, use the Cariño or Menchero linking methods.
          In practice, most alpha in Indian large-cap funds comes from selection
          (picking better stocks) rather than allocation (sector bets), consistent with
          global findings. Extend to fixed-income attribution for debt fund analysis.
        </p>
      </NoteBlock>
    </div>
  )
}
