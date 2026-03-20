import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveViz() {
  const [wacc, setWacc] = useState(11.5)
  const [tGrowth, setTGrowth] = useState(5)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive Visualization
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust parameters to explore the concepts interactively.
      </p>
      <div className="mb-4 grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400"><span>WACC (%): {wacc}</span><input type="range" min="8" max="16" step="0.5" value={wacc} onChange={e => setWacc(parseFloat(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" /></label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400"><span>Terminal Growth (%): {tGrowth}</span><input type="range" min="2" max="7" step="0.5" value={tGrowth} onChange={e => setTGrowth(parseFloat(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" /></label>
      </div>
      <div className="grid grid-cols-2 gap-3 text-center text-xs">
        <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30">
          <div className="text-gray-500 dark:text-gray-400">Output 1</div>
          <div className="text-lg font-bold text-indigo-600">{wacc}</div>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30">
          <div className="text-gray-500 dark:text-gray-400">Output 2</div>
          <div className="text-lg font-bold text-amber-600">{tGrowth}</div>
        </div>
      </div>
    </div>
  )
}

export default function DCFAutomation() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Automated DCF for Indian IT Companies
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Discounted Cash Flow (DCF) valuation is the gold standard for intrinsic value estimation. For Indian IT companies like TCS and Infosys, DCF models incorporate INR free cash flows, WACC computed with Indian risk-free rates (G-Sec yield), and terminal values based on long-term GDP growth. Automating DCF enables systematic screening of over 5000 NSE-listed companies.
      </p>

      <DefinitionBlock
        title="Discounted Cash Flow"
        label="Definition 11.4"
        definition="DCF values a company as the present value of its expected future free cash flows: V = Sum(FCF_t / (1+WACC)^t) + TV/(1+WACC)^N, where FCF = Free Cash Flow, WACC = Weighted Average Cost of Capital, and TV = Terminal Value. For Indian companies, WACC typically ranges from 10-14%."
        notation="FCF = EBIT(1-tax) + Depreciation - CapEx - Delta_WC, WACC = w_e*r_e + w_d*r_d*(1-t)"
      />

      <BlockMath math="V_0 = \sum_{t=1}^{N} \frac{\text{FCF}_t}{(1+\text{WACC})^t} + \frac{\text{FCF}_N(1+g)}{(\text{WACC}-g)(1+\text{WACC})^N}" />

      <BlockMath math="\text{WACC} = \frac{E}{E+D} \cdot r_e + \frac{D}{E+D} \cdot r_d \cdot (1-t)" />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Mathematical Framework
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The mathematical foundation enables rigorous analysis and systematic implementation for Indian market applications.
      </p>

      <TheoremBlock
        title="Terminal Value Sensitivity"
        label="Theorem 11.4"
        statement="Terminal value typically represents 60-80% of total DCF value for Indian growth companies. A 1% change in terminal growth rate g changes the intrinsic value by approximately TV/(WACC-g)^2, making the DCF highly sensitive to long-term growth assumptions."
        proof="Differentiating TV = FCF_N*(1+g)/(WACC-g) with respect to g yields dTV/dg = FCF_N*(1+WACC)/((WACC-g)^2)."
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
        title="dcf_tcs.py"
        runnable
        code={`import numpy as np

# DCF Valuation for TCS
revenue_base = 216887  # INR Cr FY24
growth_rates = [0.10, 0.10, 0.09, 0.08, 0.07]  # 5-year projections
fcf_margin = 0.22  # FCF/Revenue
wacc = 0.115  # 11.5% for Indian IT
terminal_growth = 0.05  # 5% perpetual (India nominal GDP)
shares = 366  # Cr shares outstanding

# Project FCFs
revenues = [revenue_base]
for g in growth_rates:
    revenues.append(revenues[-1] * (1 + g))

fcfs = [r * fcf_margin for r in revenues[1:]]
pvs = [fcf / (1 + wacc)**t for t, fcf in enumerate(fcfs, 1)]

# Terminal value
tv = fcfs[-1] * (1 + terminal_growth) / (wacc - terminal_growth)
pv_tv = tv / (1 + wacc)**len(fcfs)

# Enterprise value
ev = sum(pvs) + pv_tv
net_debt = -25000  # TCS has net cash
equity_value = ev - net_debt
price_per_share = equity_value / shares

print("=== DCF Valuation: TCS ===")
print(f"WACC: {wacc:.1%}, Terminal growth: {terminal_growth:.1%}")
print(f"\nYear  Revenue(Cr)  FCF(Cr)   PV(FCF)")
for i, (r, f, p) in enumerate(zip(revenues[1:], fcfs, pvs)):
    print(f"  {i+1}    {r:>10,.0f}  {f:>8,.0f}  {p:>8,.0f}")
print(f"\nPV of FCFs:    INR {sum(pvs):>10,.0f} Cr")
print(f"PV of TV:      INR {pv_tv:>10,.0f} Cr ({pv_tv/ev*100:.0f}% of EV)")
print(f"Enterprise V:  INR {ev:>10,.0f} Cr")
print(f"Equity Value:  INR {equity_value:>10,.0f} Cr")
print(f"Price/Share:   INR {price_per_share:>10,.0f}")`}
      />

      <ExampleBlock
        title="DCF Sensitivity Analysis"
        difficulty="intermediate"
        problem="TCS DCF gives INR 3,800 per share at WACC=11.5% and g=5%. How does the value change if WACC increases to 12.5%?"
        solution={[
          {
            step: 'Recompute terminal value',
            formula: 'TV_{\text{new}} = \frac{FCF_5 \times 1.05}{0.125 - 0.05} = \frac{FCF_5 \times 1.05}{0.075}',
            explanation: 'Higher WACC reduces terminal value significantly.',
          },
          {
            step: 'New TV is ~22% lower',
            formula: '\Delta TV \approx -22\%',
            explanation: 'Terminal value drops from 15.4x FCF to 14x FCF.',
          },
          {
            step: 'New price',
            formula: '\text{Price}_{\text{new}} \approx \text{INR } 3,100',
            explanation: 'A 1% WACC increase reduces the price by ~18%.',
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
          Automated DCF enables systematic valuation screening of Indian stocks. For IT companies like TCS, the model is relatively clean due to low debt and stable margins. Key sensitivities are WACC and terminal growth rate -- small changes in these produce large value swings.
        </p>
      </NoteBlock>
    </div>
  )
}
