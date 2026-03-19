import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveDCF() {
  const [fcf, setFcf] = useState(500)
  const [growthRate, setGrowthRate] = useState(12)
  const [wacc, setWacc] = useState(10)
  const [terminalGrowth, setTerminalGrowth] = useState(4)
  const [years, setYears] = useState(5)

  const projections = []
  let currentFcf = fcf
  let totalPV = 0
  for (let i = 1; i <= years; i++) {
    currentFcf = i === 1 ? fcf : currentFcf * (1 + growthRate / 100)
    const pv = currentFcf / Math.pow(1 + wacc / 100, i)
    totalPV += pv
    projections.push({ year: i, fcf: currentFcf, pv })
  }

  const terminalFcf = currentFcf * (1 + terminalGrowth / 100)
  const terminalValue = terminalFcf / (wacc / 100 - terminalGrowth / 100)
  const pvTerminal = terminalValue / Math.pow(1 + wacc / 100, years)
  const enterpriseValue = totalPV + pvTerminal

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: DCF Valuation Engine
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust free cash flow assumptions for an NSE-listed company. Values in INR Crores.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Base FCF (INR Cr) = {fcf}</span>
          <input type="range" min="100" max="2000" step="50" value={fcf}
            onChange={e => setFcf(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Growth Rate = {growthRate}%</span>
          <input type="range" min="0" max="30" step="1" value={growthRate}
            onChange={e => setGrowthRate(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>WACC = {wacc}%</span>
          <input type="range" min="6" max="20" step="0.5" value={wacc}
            onChange={e => setWacc(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Terminal Growth = {terminalGrowth}%</span>
          <input type="range" min="1" max="7" step="0.5" value={terminalGrowth}
            onChange={e => setTerminalGrowth(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Projection Years = {years}</span>
          <input type="range" min="3" max="10" step="1" value={years}
            onChange={e => setYears(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Year</th>
              <th className="px-3 py-2 text-right text-gray-600 dark:text-gray-400">FCF (INR Cr)</th>
              <th className="px-3 py-2 text-right text-gray-600 dark:text-gray-400">PV (INR Cr)</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            {projections.map(p => (
              <tr key={p.year} className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-3 py-1">{p.year}</td>
                <td className="px-3 py-1 text-right">{p.fcf.toFixed(1)}</td>
                <td className="px-3 py-1 text-right">{p.pv.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30">
          <span className="text-gray-600 dark:text-gray-400">Sum of PV(FCF)</span>
          <p className="text-lg font-bold text-indigo-700 dark:text-indigo-300">
            INR {totalPV.toFixed(1)} Cr
          </p>
        </div>
        <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30">
          <span className="text-gray-600 dark:text-gray-400">PV(Terminal Value)</span>
          <p className="text-lg font-bold text-indigo-700 dark:text-indigo-300">
            INR {pvTerminal.toFixed(1)} Cr
          </p>
        </div>
      </div>

      <p className="mt-3 text-center text-sm font-semibold text-green-700 dark:text-green-400">
        Enterprise Value = INR {enterpriseValue.toFixed(1)} Cr
      </p>
    </div>
  )
}

export default function DCFAutomation() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Automated DCF Valuation
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Discounted Cash Flow (DCF) analysis is the cornerstone of intrinsic valuation. In the
        Indian market context, automating DCF models for NSE/BSE-listed companies allows
        systematic screening of hundreds of stocks against their fundamental fair values.
        This section covers the mathematical framework and its programmatic implementation
        using Indian financial data sources.
      </p>

      <DefinitionBlock
        title="Discounted Cash Flow (DCF)"
        label="Definition 11.4"
        definition="The DCF model computes the intrinsic value of a company as the sum of the present values of its projected future free cash flows, discounted at the weighted average cost of capital (WACC). The enterprise value equals the sum of discounted explicit period cash flows plus the present value of the terminal value."
        notation="EV = \sum_{t=1}^{T} \frac{FCF_t}{(1+WACC)^t} + \frac{TV}{(1+WACC)^T}"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Core DCF Formula
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The enterprise value of an NSE-listed company is computed as:
      </p>

      <BlockMath math="EV = \sum_{t=1}^{T} \frac{FCF_t}{(1 + r_{WACC})^t} + \frac{FCF_{T+1}}{(r_{WACC} - g)} \cdot \frac{1}{(1 + r_{WACC})^T}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="FCF_t" /> is the free cash flow in year <InlineMath math="t" />,{' '}
        <InlineMath math="r_{WACC}" /> is the weighted average cost of capital, <InlineMath math="g" />{' '}
        is the perpetual growth rate, and <InlineMath math="T" /> is the explicit forecast period.
      </p>

      <TheoremBlock
        title="Gordon Growth Terminal Value"
        label="Theorem 11.1"
        statement="Under the assumption of constant perpetual growth g < r_{WACC}, the terminal value at time T converges to a finite sum: TV_T = \frac{FCF_{T+1}}{r_{WACC} - g} = \frac{FCF_T(1+g)}{r_{WACC} - g}. This requires g < r_{WACC} for convergence of the infinite geometric series."
        proof="The terminal value is the sum of discounted cash flows from T+1 to infinity: TV_T = \sum_{k=1}^{\infty} \frac{FCF_T(1+g)^k}{(1+r_{WACC})^k} = FCF_T(1+g) \sum_{k=0}^{\infty} \left(\frac{1+g}{1+r_{WACC}}\right)^k = \frac{FCF_T(1+g)}{1 - \frac{1+g}{1+r_{WACC}}} = \frac{FCF_T(1+g)}{r_{WACC} - g}"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        WACC for Indian Companies
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For Indian companies listed on NSE/BSE, the WACC is computed using the Indian risk-free
        rate (10-year Government of India bond yield), the equity risk premium for the Indian
        market, and the company-specific beta measured against the Nifty 50 index:
      </p>

      <BlockMath math="r_{WACC} = \frac{E}{E+D} \cdot r_e + \frac{D}{E+D} \cdot r_d \cdot (1 - \tau)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where the cost of equity <InlineMath math="r_e" /> follows the CAPM:
      </p>

      <BlockMath math="r_e = r_f^{IN} + \beta_{Nifty} \cdot ERP_{India}" />

      <NoteBlock title="India-Specific Considerations" type="tip">
        <ul className="space-y-1 text-sm">
          <li>Use the 10-year GoI bond yield (typically 7-7.5%) as the risk-free rate</li>
          <li>India equity risk premium is generally estimated at 6-8% above the risk-free rate</li>
          <li>Corporate tax rate under the new regime is 25.17% (including surcharge and cess)</li>
          <li>Beta should be computed against Nifty 50 using at least 3 years of weekly returns</li>
          <li>For Zerodha-sourced data, use adjusted close prices accounting for splits and bonuses</li>
        </ul>
      </NoteBlock>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Free Cash Flow Computation
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Free cash flow to the firm (FCFF) is derived from the Indian GAAP or Ind-AS financial
        statements filed with BSE/NSE:
      </p>

      <BlockMath math="FCFF = EBIT(1 - \tau) + D\&A - \Delta WC - CapEx" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\Delta WC" /> represents the change in net working capital,
        computed from the balance sheet items reported in quarterly results.
      </p>

      <InteractiveDCF />

      <PythonCode
        title="dcf_automation.py"
        runnable
        code={`import numpy as np

class DCFModel:
    """Automated DCF valuation for NSE-listed companies."""

    def __init__(self, base_fcf, growth_rate, wacc, terminal_growth,
                 projection_years=5):
        self.base_fcf = base_fcf  # INR Crores
        self.growth_rate = growth_rate
        self.wacc = wacc
        self.terminal_growth = terminal_growth
        self.years = projection_years

    def project_fcf(self):
        """Project free cash flows over the explicit period."""
        fcfs = []
        current = self.base_fcf
        for t in range(1, self.years + 1):
            current = current * (1 + self.growth_rate) if t > 1 else current
            fcfs.append(current)
        return np.array(fcfs)

    def compute_pv_fcf(self, fcfs):
        """Discount projected FCFs to present value."""
        discount_factors = np.array([
            1 / (1 + self.wacc) ** t for t in range(1, len(fcfs) + 1)
        ])
        return fcfs * discount_factors

    def terminal_value(self, last_fcf):
        """Gordon Growth Model terminal value."""
        fcf_next = last_fcf * (1 + self.terminal_growth)
        tv = fcf_next / (self.wacc - self.terminal_growth)
        pv_tv = tv / (1 + self.wacc) ** self.years
        return tv, pv_tv

    def enterprise_value(self):
        """Compute total enterprise value."""
        fcfs = self.project_fcf()
        pv_fcfs = self.compute_pv_fcf(fcfs)
        tv, pv_tv = self.terminal_value(fcfs[-1])
        ev = np.sum(pv_fcfs) + pv_tv
        return {
            'fcfs': fcfs,
            'pv_fcfs': pv_fcfs,
            'terminal_value': tv,
            'pv_terminal': pv_tv,
            'enterprise_value': ev,
            'tv_percentage': pv_tv / ev * 100
        }

# Example: Valuing a Nifty 50 constituent
# Assume TCS-like financials
model = DCFModel(
    base_fcf=350,           # INR 350 Crores base FCF
    growth_rate=0.12,       # 12% FCF growth
    wacc=0.105,             # 10.5% WACC (Indian cost of capital)
    terminal_growth=0.04,   # 4% perpetual growth
    projection_years=7
)

result = model.enterprise_value()

print("=" * 55)
print("  DCF Valuation - NSE Company Analysis")
print("=" * 55)
print(f"\\nBase FCF:           INR {model.base_fcf:.0f} Cr")
print(f"Growth Rate:        {model.growth_rate*100:.1f}%")
print(f"WACC:               {model.wacc*100:.1f}%")
print(f"Terminal Growth:    {model.terminal_growth*100:.1f}%")
print(f"\\nProjected FCFs (INR Cr):")
for i, (fcf, pv) in enumerate(zip(result['fcfs'], result['pv_fcfs'])):
    print(f"  Year {i+1}: FCF = {fcf:>8.1f}, PV = {pv:>8.1f}")
print(f"\\nTerminal Value:     INR {result['terminal_value']:>10.1f} Cr")
print(f"PV(Terminal):       INR {result['pv_terminal']:>10.1f} Cr")
print(f"Enterprise Value:   INR {result['enterprise_value']:>10.1f} Cr")
print(f"TV as % of EV:      {result['tv_percentage']:.1f}%")`}
      />

      <ExampleBlock
        title="DCF Valuation of an IT Services Company"
        difficulty="intermediate"
        problem="An NSE-listed IT company has base FCF of INR 200 Cr, expected to grow at 15% for 5 years. WACC is 11% (using GoI 10Y yield of 7.2%, beta of 0.85, and India ERP of 6.5%). Terminal growth is 4.5%. Compute the enterprise value."
        solution={[
          {
            step: 'Project free cash flows',
            formula: 'FCF_1 = 200,\\; FCF_2 = 230,\\; FCF_3 = 264.5,\\; FCF_4 = 304.2,\\; FCF_5 = 349.8',
            explanation: 'Each year grows at 15% from the previous year.',
          },
          {
            step: 'Discount each FCF',
            formula: 'PV(FCF_t) = \\frac{FCF_t}{(1.11)^t}',
            explanation: 'Sum of discounted FCFs = 200/1.11 + 230/1.232 + 264.5/1.368 + 304.2/1.518 + 349.8/1.685 = 180.2 + 186.7 + 193.3 + 200.4 + 207.6 = 968.2 Cr',
          },
          {
            step: 'Compute terminal value',
            formula: 'TV = \\frac{349.8 \\times 1.045}{0.11 - 0.045} = \\frac{365.5}{0.065} = 5623.8 \\text{ Cr}',
            explanation: 'Gordon Growth Model with perpetual growth of 4.5%.',
          },
          {
            step: 'Discount terminal value and sum',
            formula: 'EV = 968.2 + \\frac{5623.8}{1.685} = 968.2 + 3338.3 = 4306.5 \\text{ Cr}',
            explanation: 'Terminal value contributes 77.5% of enterprise value, typical for high-growth Indian IT companies.',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Sensitivity Analysis Framework
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A robust DCF automation framework includes sensitivity tables that vary key
        assumptions. For SEBI-regulated entities, the most impactful parameters are typically
        the WACC and terminal growth rate. The sensitivity of enterprise value to these
        parameters is captured by partial derivatives:
      </p>

      <BlockMath math="\frac{\partial EV}{\partial g} = \frac{FCF_{T+1}}{(r_{WACC} - g)^2} \cdot \frac{1}{(1+r_{WACC})^T} > 0" />

      <BlockMath math="\frac{\partial EV}{\partial r_{WACC}} < 0 \quad \text{(higher discount rate reduces value)}" />

      <NoteBlock title="Automation Best Practices" type="tip">
        <p>
          When automating DCF for Indian equities via platforms like Zerodha Kite or direct
          NSE data feeds, ensure you handle: (1) Ind-AS accounting adjustments for
          depreciation and amortization, (2) working capital seasonality in Q4 filings,
          (3) promoter holding dilution effects on equity value, and (4) SEBI-mandated
          related party transaction disclosures that may affect free cash flow estimates.
        </p>
      </NoteBlock>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Multi-Stage Growth DCF
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Indian growth companies often warrant a multi-stage DCF with distinct growth phases.
        The H-model provides a linear transition between high and stable growth:
      </p>

      <BlockMath math="EV = \frac{FCF_0(1+g_L)}{r - g_L} + \frac{FCF_0 \cdot H \cdot (g_S - g_L)}{r - g_L}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="H" /> is the half-life of the high-growth period,{' '}
        <InlineMath math="g_S" /> is the initial supernormal growth rate, and{' '}
        <InlineMath math="g_L" /> is the long-term stable growth rate. This is particularly
        relevant for mid-cap Indian companies transitioning from high-growth to mature phases.
      </p>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Automated DCF models enable systematic valuation screening across the entire
          NSE/BSE universe. The critical inputs -- WACC, growth rates, and terminal
          assumptions -- should be calibrated to Indian market conditions including GoI
          bond yields, India-specific equity risk premiums, and Ind-AS accounting standards.
          Always perform sensitivity analysis on WACC and terminal growth, as these
          parameters dominate the final enterprise value estimate.
        </p>
      </NoteBlock>
    </div>
  )
}
