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

export default function EarningsQuality() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Accruals and Beneish M-Score for Indian Firms
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Earnings quality assessment separates genuine economic performance from accounting manipulation. For Indian markets, where corporate governance varies widely, quantitative tools like accrual analysis and the Beneish M-Score help identify potential earnings manipulation. Notable Indian cases include Satyam Computer Services (2009) and recent NBFC frauds.
      </p>

      <DefinitionBlock
        title="Beneish M-Score"
        label="Definition 11.3"
        definition="The Beneish M-Score is a mathematical model using eight financial ratios to detect earnings manipulation. M = -4.84 + 0.920*DSRI + 0.528*GMI + 0.404*AQI + 0.892*SGI + 0.115*DEPI - 0.172*SGAI + 4.679*TATA - 0.327*LVGI. M > -1.78 suggests a high probability of manipulation."
        notation="DSRI = Days Sales Receivable Index, GMI = Gross Margin Index, TATA = Total Accruals to Total Assets"
      />

      <BlockMath math="\text{Accruals} = \frac{\Delta \text{Working Capital} - \text{Depreciation}}{\text{Total Assets}}" />

      <BlockMath math="\text{M-Score} = -4.84 + 0.920 \times \text{DSRI} + 0.528 \times \text{GMI} + \ldots" />

      <TheoremBlock
        title="Accrual Anomaly"
        label="Theorem 11.3"
        statement="Sloan (1996) showed that firms with high accruals (earnings much higher than cash flows) tend to have lower future returns: E[R_t+1 | Accruals_t > median] < E[R_t+1 | Accruals_t < median]. This anomaly persists in Indian markets."
        proof="Empirically documented by sorting stocks on accruals and measuring subsequent returns. The return spread is 4-8% annually in NSE data."
      />

      <InteractiveViz />

      <PythonCode
        title="beneish_mscore.py"
        runnable
        code={`import numpy as np

# Beneish M-Score calculator for Indian companies
def beneish_mscore(curr, prev):
    dsri = (curr['receivables']/curr['revenue']) / (prev['receivables']/prev['revenue'])
    gmi = prev['gross_margin'] / curr['gross_margin']
    aqi = (1 - (curr['ppe'] + curr['current_assets'])/curr['total_assets']) / \
          (1 - (prev['ppe'] + prev['current_assets'])/prev['total_assets'])
    sgi = curr['revenue'] / prev['revenue']
    depi = prev['depreciation']/(prev['depreciation']+prev['ppe']) / \
           (curr['depreciation']/(curr['depreciation']+curr['ppe']))
    sgai = (curr['sga']/curr['revenue']) / (prev['sga']/prev['revenue'])
    tata = (curr['net_income'] - curr['cfo']) / curr['total_assets']
    lvgi = (curr['total_debt']/curr['total_assets']) / (prev['total_debt']/prev['total_assets'])
    
    m = -4.84 + 0.920*dsri + 0.528*gmi + 0.404*aqi + 0.892*sgi + \
        0.115*depi - 0.172*sgai + 4.679*tata - 0.327*lvgi
    return m, {'DSRI': dsri, 'GMI': gmi, 'AQI': aqi, 'SGI': sgi, 'TATA': tata}

# Example: Checking Indian companies
companies = {
    'CLEAN_CO': {
        'curr': {'revenue': 5000, 'receivables': 400, 'gross_margin': 0.45, 'ppe': 2000,
                 'current_assets': 1500, 'total_assets': 8000, 'depreciation': 200,
                 'sga': 500, 'net_income': 600, 'cfo': 700, 'total_debt': 1000},
        'prev': {'revenue': 4500, 'receivables': 350, 'gross_margin': 0.44, 'ppe': 1800,
                 'current_assets': 1400, 'total_assets': 7200, 'depreciation': 180,
                 'sga': 450, 'total_debt': 900},
    },
    'SUSPECT_CO': {
        'curr': {'revenue': 8000, 'receivables': 1200, 'gross_margin': 0.30, 'ppe': 3000,
                 'current_assets': 2500, 'total_assets': 12000, 'depreciation': 250,
                 'sga': 600, 'net_income': 1500, 'cfo': 200, 'total_debt': 4000},
        'prev': {'revenue': 5000, 'receivables': 500, 'gross_margin': 0.40, 'ppe': 2800,
                 'current_assets': 2000, 'total_assets': 10000, 'depreciation': 280,
                 'sga': 500, 'total_debt': 2500},
    },
}

print("=== Beneish M-Score Analysis ===")
for name, data in companies.items():
    m, components = beneish_mscore(data['curr'], data['prev'])
    flag = "HIGH RISK" if m > -1.78 else "LOW RISK"
    print(f"\n{name}: M-Score = {m:.3f} [{flag}]")
    for k, v in components.items():
        print(f"  {k}: {v:.3f}")`}
      />

      <ExampleBlock
        title="Satyam Fraud Detection"
        difficulty="advanced"
        problem="Satyam reported FY2008 revenue of INR 10,211 Cr but actual was ~INR 7,000 Cr. Receivables were INR 2,651 Cr (inflated). Prior year receivables were INR 1,500 Cr on INR 7,500 Cr revenue. Compute the DSRI component of M-Score."
        solution={[
          {
            step: 'DSRI calculation',
            formula: '\text{DSRI} = (2651/10211) / (1500/7500) = 0.2596 / 0.200 = 1.298',
            explanation: 'DSRI > 1.2 is a strong warning sign.',
          },
          {
            step: 'Interpret',
            formula: '\text{DSRI} = 1.30 \Rightarrow \text{Receivables growing faster than revenue}',
            explanation: 'This suggests revenue may be fabricated or cash collection is deteriorating.',
          },
          {
            step: 'TATA would also flag',
            formula: '\text{TATA} = (\text{NI} - \text{CFO}) / \text{TA} \gg 0',
            explanation: 'Large gap between reported profit and cash flow is the clearest manipulation signal.',
          }
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Earnings quality analysis is critical for Indian stock selection, especially in mid/small-cap segments where governance is weaker. The Beneish M-Score and accrual analysis provide quantitative tools to flag potential manipulation. Always cross-check against cash flow statements -- cash does not lie.
        </p>
      </NoteBlock>
    </div>
  )
}
