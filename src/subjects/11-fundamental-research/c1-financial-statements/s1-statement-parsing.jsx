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
        }}
      </svg>
    </div>
  )
}

export default function StatementParsing() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Parsing BSE/NSE Annual Reports and MCA Filings
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Automated parsing of Indian corporate filings is the foundation of quantitative fundamental analysis. Indian companies file annual reports with BSE/NSE, quarterly results in XBRL format, and statutory filings with the Ministry of Corporate Affairs (MCA). This section covers extracting structured financial data from these sources using Python.
      </p>

      <DefinitionBlock
        title="Financial Statement Parsing"
        label="Definition 11.1"
        definition="Financial statement parsing is the automated extraction of structured data (revenue, profit, assets, liabilities) from corporate filings. In India, primary sources include BSE/NSE XBRL filings (quarterly), MCA annual returns (Form AOC-4), and company annual reports (PDF). The Indian Accounting Standards (Ind AS) provide the standardized taxonomy."
        notation="XBRL = eXtensible Business Reporting Language, MCA = Ministry of Corporate Affairs"
      />

      <BlockMath math="\text{Revenue}_{t} = \sum_{q=1}^{4} \text{Revenue}_{t,q}" />

      <BlockMath math="\text{Normalized Metric} = \frac{\text{Reported Value}}{\text{Industry Median}}" />

      <TheoremBlock
        title="Data Quality and Restatements"
        label="Theorem 11.1"
        statement="For any automated parsing pipeline, the error rate is bounded by: P(error) <= P(format_change) + P(taxonomy_change) + P(restatement). For Indian filings post-2019, XBRL standardization has reduced format_change probability to <5% per quarter."
        proof="By the union bound on error sources and empirical measurement of each component."
      />

      <InteractiveViz />

      <PythonCode
        title="parse_bse_xbrl.py"
        runnable
        code={`import numpy as np

# Simulated BSE/NSE financial data parsing
companies = {
    'TCS': {'revenue': [50591, 52758, 55309, 58229], 'pat': [10846, 11342, 11909, 12392],
            'total_assets': 97896, 'equity': 85964, 'debt': 3200},
    'INFY': {'revenue': [37441, 38994, 40986, 43764], 'pat': [6021, 6106, 6368, 6944],
             'total_assets': 89480, 'equity': 72483, 'debt': 4500},
    'RELIANCE': {'revenue': [200684, 213985, 227865, 242156], 'pat': [15792, 16593, 17422, 18965],
                 'total_assets': 1520609, 'equity': 535680, 'debt': 285000},
}

print("=== Parsed Financial Data (INR Crore) ===")
for company, data in companies.items():
    annual_rev = sum(data['revenue'])
    annual_pat = sum(data['pat'])
    roe = annual_pat / data['equity'] * 100
    de_ratio = data['debt'] / data['equity']
    pat_margin = annual_pat / annual_rev * 100
    
    print(f"\n{company}:")
    print(f"  Annual Revenue: INR {annual_rev:,.0f} Cr")
    print(f"  Annual PAT:     INR {annual_pat:,.0f} Cr")
    print(f"  PAT Margin:     {pat_margin:.1f}%")
    print(f"  ROE:            {roe:.1f}%")
    print(f"  D/E Ratio:      {de_ratio:.2f}")
    print(f"  Revenue Growth: {(data['revenue'][-1]/data['revenue'][0] - 1)*100:.1f}% (Q4/Q1)")`}
      />

      <ExampleBlock
        title="Extracting TCS Revenue from XBRL"
        difficulty="beginner"
        problem="Parse TCS quarterly XBRL filing to extract Q4 FY24 revenue. The XBRL tag is 'RevenueFromOperations' under Ind AS taxonomy."
        solution={[
          {
            step: 'Locate XBRL element',
            formula: '\text{Tag: in-gaap:RevenueFromOperations}',
            explanation: 'Standard Ind AS taxonomy tag for top-line revenue.',
          },
          {
            step: 'Extract value',
            formula: '\text{Revenue}_{Q4} = \text{INR 58,229 Cr}',
            explanation: 'Extracted from the inline XBRL filing on BSE.',
          },
          {
            step: 'Validate',
            formula: '\text{Check: } |\text{Parsed} - \text{Published}| < 1 \text{ Cr}',
            explanation: 'Cross-validate against BSE published results.',
          }
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Automated parsing of Indian financial filings enables quantitative fundamental analysis at scale. Use BSE/NSE XBRL feeds for quarterly data, MCA filings for annual statutory data, and screener.in/Trendlyne APIs for pre-parsed datasets. Always validate parsed data against published figures.
        </p>
      </NoteBlock>
    </div>
  )
}
