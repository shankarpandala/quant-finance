import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveViz() {
  const [selectedMetric, setSelectedMetric] = useState('roe')
  const metrics = {
    roe: { label: 'ROE', values: [24.5, 17.2, 12.8, 20.1, 30.1], unit: '%' },
    margin: { label: 'PAT Margin', values: [19.6, 20.8, 9.8, 16.5, 28.0], unit: '%' },
    de: { label: 'D/E', values: [0.04, 7.05, 0.53, 0.06, 0.00], unit: 'x' },
  }
  const companies = ['TCS', 'HDFCBANK', 'RELIANCE', 'INFY', 'ITC']
  const m = metrics[selectedMetric]

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Indian Company Metrics
      </h3>
      <div className="mb-4">
        <select value={selectedMetric} onChange={e => setSelectedMetric(e.target.value)}
          className="rounded border px-3 py-1 text-sm dark:bg-gray-800 dark:border-gray-600">
          <option value="roe">ROE</option>
          <option value="margin">PAT Margin</option>
          <option value="de">Debt/Equity</option>
        </select>
      </div>
      <svg viewBox="0 0 400 160" className="w-full max-w-md mx-auto block">
        {companies.map((c, i) => {
          const barH = Math.min(120, m.values[i] * (selectedMetric === 'de' ? 15 : 4))
          const color = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'][i]
          return (
            <g key={i}>
              <rect x={30 + i * 75} y={140 - barH} width={50} height={barH} fill={color} opacity="0.7" rx="3" />
              <text x={55 + i * 75} y={135 - barH} textAnchor="middle" className="text-[9px] font-bold" fill={color}>
                {m.values[i]}{m.unit}
              </text>
              <text x={55 + i * 75} y={155} textAnchor="middle" className="text-[8px] fill-gray-500">{c}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default function RatioAnalysis() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Profitability and Leverage Ratios for Indian Companies
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Financial ratio analysis translates raw accounting data into comparable metrics across companies and time periods. For Indian equities, key ratios include ROE, ROCE, debt-to-equity, interest coverage, and working capital ratios. Understanding these in the context of Ind AS accounting standards and Indian business practices is essential for quantitative stock selection.
      </p>

      <DefinitionBlock
        title="Financial Ratios"
        label="Definition 11.2"
        definition="Financial ratios are standardized metrics derived from financial statements that measure profitability (ROE, ROA, margins), leverage (D/E, interest coverage), efficiency (asset turnover, working capital days), and valuation (P/E, P/B, EV/EBITDA). For Indian companies, ratios must be adjusted for Ind AS vs old IGAAP differences."
        notation="ROE = PAT/Equity, ROCE = EBIT/(Equity+Debt), D/E = Total Debt/Shareholders Equity"
      />

      <BlockMath math="\text{ROE} = \frac{\text{PAT}}{\text{Equity}} = \underbrace{\frac{\text{PAT}}{\text{Revenue}}}_{\text{Margin}} \times \underbrace{\frac{\text{Revenue}}{\text{Assets}}}_{\text{Turnover}} \times \underbrace{\frac{\text{Assets}}{\text{Equity}}}_{\text{Leverage}}" />

      <BlockMath math="\text{ROCE} = \frac{\text{EBIT}}{\text{Capital Employed}} = \frac{\text{EBIT}}{\text{Equity} + \text{Long-term Debt}}" />

      <TheoremBlock
        title="DuPont Decomposition"
        label="Theorem 11.2"
        statement="ROE can be decomposed into three drivers: ROE = Net Margin x Asset Turnover x Financial Leverage = (PAT/Revenue) x (Revenue/Assets) x (Assets/Equity). This reveals whether high ROE comes from profitability, efficiency, or leverage."
        proof="ROE = PAT/Equity = (PAT/Rev) x (Rev/Assets) x (Assets/Equity) by algebraic identity."
      />

      <InteractiveViz />

      <PythonCode
        title="ratio_analysis_nifty.py"
        runnable
        code={`import numpy as np

# DuPont analysis for top Indian companies
companies = {
    'TCS':       {'pat': 42497, 'revenue': 216887, 'assets': 97896, 'equity': 85964, 'debt': 3200, 'ebit': 55500},
    'RELIANCE':  {'pat': 68772, 'revenue': 884690, 'assets': 1520609, 'equity': 535680, 'debt': 285000, 'ebit': 115000},
    'HDFCBANK':  {'pat': 51190, 'revenue': 245648, 'assets': 2544000, 'equity': 298000, 'debt': 2100000, 'ebit': 78000},
    'INFY':      {'pat': 26439, 'revenue': 160439, 'assets': 89480, 'equity': 72483, 'debt': 4500, 'ebit': 35000},
    'ITC':       {'pat': 19476, 'revenue': 69481, 'assets': 78448, 'equity': 64748, 'debt': 150, 'ebit': 24000},
    'HINDUNILVR':{'pat': 10282, 'revenue': 60580, 'assets': 49752, 'equity': 7789, 'debt': 2500, 'ebit': 14000},
}

print("=== DuPont Analysis (Top Indian Companies) ===")
print(f"\n{'Company':<12} {'ROE':>8} {'Margin':>8} {'Turnover':>10} {'Leverage':>10} {'D/E':>6} {'ROCE':>8}")
print("-" * 68)
for name, d in companies.items():
    margin = d['pat'] / d['revenue']
    turnover = d['revenue'] / d['assets']
    leverage = d['assets'] / d['equity']
    roe = margin * turnover * leverage
    de = d['debt'] / d['equity']
    roce = d['ebit'] / (d['equity'] + d['debt'])
    print(f"{name:<12} {roe:>8.1%} {margin:>8.1%} {turnover:>10.2f} {leverage:>10.2f} {de:>6.2f} {roce:>8.1%}")

print("\nKey Insights:")
print("  HUL: High ROE driven by extreme leverage (high assets/equity)")
print("  TCS: High ROE driven by margin (24.7% PAT margin)")
print("  HDFC Bank: Banking leverage naturally high (deposits)")`}
      />

      <ExampleBlock
        title="DuPont for HDFC Bank"
        difficulty="intermediate"
        problem="HDFC Bank has PAT INR 51,190 Cr, Revenue INR 2,45,648 Cr, Assets INR 25,44,000 Cr, Equity INR 2,98,000 Cr. Decompose ROE using DuPont."
        solution={[
          {
            step: 'Margin',
            formula: '\text{Margin} = 51190 / 245648 = 20.8\%',
            explanation: 'Banking margins include net interest income.',
          },
          {
            step: 'Turnover',
            formula: '\text{Turnover} = 245648 / 2544000 = 0.097',
            explanation: 'Low turnover typical for banks (large balance sheets).',
          },
          {
            step: 'Leverage',
            formula: '\text{Leverage} = 2544000 / 298000 = 8.54',
            explanation: 'High leverage from deposits -- normal for banks.',
          },
          {
            step: 'ROE',
            formula: '\text{ROE} = 20.8\% \times 0.097 \times 8.54 = 17.2\%',
            explanation: 'ROE of 17.2% driven primarily by leverage, characteristic of banking.',
          }
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Financial ratios standardize company comparison across Nifty 50 constituents. DuPont decomposition reveals the source of ROE: margin-driven (IT companies), turnover-driven (FMCG), or leverage-driven (banks). For Indian stock selection, ROE > 15% with low D/E is a strong quality signal.
        </p>
      </NoteBlock>
    </div>
  )
}
