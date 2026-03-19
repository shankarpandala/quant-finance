import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveViz() {
  const [bankROE, setBankROE] = useState(17)
  const [costEq, setCostEq] = useState(12.5)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive Visualization
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust parameters to explore the concepts interactively.
      </p>
      <div className="mb-4 grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400"><span>ROE (%): {bankROE}</span><input type="range" min="8" max="25" step="0.5" value={bankROE} onChange={e => setBankROE(parseFloat(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" /></label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400"><span>Cost of Equity (%): {costEq}</span><input type="range" min="8" max="18" step="0.5" value={costEq} onChange={e => setCostEq(parseFloat(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" /></label>
      </div>
      <div className="grid grid-cols-2 gap-3 text-center text-xs">
        <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30">
          <div className="text-gray-500 dark:text-gray-400">Output 1</div>
          <div className="text-lg font-bold text-indigo-600">{bankROE}</div>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30">
          <div className="text-gray-500 dark:text-gray-400">Output 2</div>
          <div className="text-lg font-bold text-amber-600">{costEq}</div>
        </div>
      </div>
    </div>
  )
}

export default function ResidualIncome() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Residual Income Models for Indian Banks
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The Residual Income Valuation (RIV) model is particularly well-suited for Indian banks because it directly values the franchise value of a bank -- the ability to generate returns above the cost of equity. For banks like HDFC Bank, ICICI Bank, and SBI, where book value is meaningful and ROE stability is high, RIV provides more reliable valuations than DCF.
      </p>

      <DefinitionBlock
        title="Residual Income"
        label="Definition 11.6"
        definition="Residual Income (RI) is the earnings a company generates above its cost of equity: RI_t = NI_t - r_e * B_{t-1}, where NI = net income, r_e = cost of equity, and B = book value. The stock value equals book value plus present value of future residual incomes: V = B_0 + Sum(RI_t / (1+r_e)^t)."
        notation="RI = Net Income - Cost of Equity × Book Value, also called Economic Value Added (EVA) for non-financial firms"
      />

      <BlockMath math="V_0 = B_0 + \sum_{t=1}^{\infty} \frac{\text{RI}_t}{(1+r_e)^t} = B_0 + \sum_{t=1}^{\infty} \frac{(\text{ROE}_t - r_e) \cdot B_{t-1}}{(1+r_e)^t}" />

      <BlockMath math="\frac{P}{B} = 1 + \frac{\text{ROE} - r_e}{r_e - g}" />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Mathematical Framework
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The mathematical foundation enables rigorous analysis and systematic implementation for Indian market applications.
      </p>

      <TheoremBlock
        title="RIV and P/B Multiple"
        label="Theorem 11.6"
        statement="Under clean surplus accounting, the RIV model implies P/B = 1 + (ROE - r_e)/(r_e - g) in steady state. A bank with ROE > r_e deserves P/B > 1, and the premium increases with the ROE spread and persistence."
        proof="In steady state, RI_t = (ROE - r_e) * B_{t-1} and B grows at rate g. Discounting the geometric series of RI gives P/B = 1 + (ROE-r_e)/(r_e-g)."
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
        title="riv_indian_banks.py"
        runnable
        code={`import numpy as np

# Residual Income Valuation for Indian Banks
banks = {
    'HDFCBANK': {'bvps': 506, 'roe': 0.172, 'cost_eq': 0.125, 'growth': 0.12, 'cmp': 1650},
    'ICICIBANK': {'bvps': 320, 'roe': 0.168, 'cost_eq': 0.130, 'growth': 0.14, 'cmp': 1100},
    'SBIN': {'bvps': 385, 'roe': 0.145, 'cost_eq': 0.135, 'growth': 0.10, 'cmp': 780},
    'KOTAKBANK': {'bvps': 540, 'roe': 0.135, 'cost_eq': 0.120, 'growth': 0.11, 'cmp': 1800},
    'AXISBANK': {'bvps': 450, 'roe': 0.155, 'cost_eq': 0.130, 'growth': 0.12, 'cmp': 1100},
}

print("=== Residual Income Valuation (Indian Banks) ===")
print(f"\n{'Bank':<12} {'BVPS':>6} {'ROE':>6} {'CoE':>6} {'Spread':>7} {'Fair P/B':>8} {'Fair Val':>9} {'CMP':>6} {'Up/Down':>8}")
print("-" * 78)
for name, d in banks.items():
    spread = d['roe'] - d['cost_eq']
    fair_pb = 1 + spread / (d['cost_eq'] - d['growth']) if d['cost_eq'] > d['growth'] else 999
    fair_value = d['bvps'] * fair_pb
    upside = (fair_value / d['cmp'] - 1) * 100
    print(f"{name:<12} {d['bvps']:>6} {d['roe']:>6.1%} {d['cost_eq']:>6.1%} {spread:>+6.1%} {fair_pb:>8.2f}x {fair_value:>9.0f} {d['cmp']:>6} {upside:>+7.1f}%")`}
      />

      <ExampleBlock
        title="HDFC Bank Fair Value via RIV"
        difficulty="intermediate"
        problem="HDFC Bank: BVPS = INR 506, ROE = 17.2%, Cost of Equity = 12.5%, Sustainable growth = 12%. Compute fair P/B and intrinsic value."
        solution={[
          {
            step: 'ROE spread',
            formula: '\text{Spread} = 17.2\% - 12.5\% = 4.7\%',
            explanation: 'Positive spread means HDFC Bank creates economic value.',
          },
          {
            step: 'Fair P/B',
            formula: 'P/B = 1 + \frac{0.047}{0.125 - 0.12} = 1 + \frac{0.047}{0.005} = 10.4x',
            explanation: 'Very high P/B because growth is close to cost of equity, amplifying the franchise value.',
          },
          {
            step: 'Intrinsic value',
            formula: 'V = 506 \times 10.4 = \text{INR } 5,262',
            explanation: 'Note: this is sensitive to growth assumption. At g=10%, fair P/B drops to 2.88x.',
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
          Residual income valuation is ideal for Indian banks where book value is economically meaningful. The model shows that banks with ROE consistently above cost of equity (HDFC, ICICI) deserve premium P/B multiples, while those with ROE near cost of equity (PSU banks) should trade near book value.
        </p>
      </NoteBlock>
    </div>
  )
}
