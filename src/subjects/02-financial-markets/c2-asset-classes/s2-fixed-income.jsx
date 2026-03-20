import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveYieldCurve() {
  const [shortRate, setShortRate] = useState(6.5)
  const [termPremium, setTermPremium] = useState(1.0)
  const [curvature, setCurvature] = useState(0.3)

  const maturities = [0.25, 0.5, 1, 2, 3, 5, 7, 10, 15, 20, 30]
  const yields = maturities.map(t =>
    shortRate + termPremium * (1 - Math.exp(-0.5 * t)) + curvature * t * Math.exp(-0.3 * t)
  )

  const chartW = 500, chartH = 200
  const padL = 50, padR = 15, padT = 20, padB = 35
  const plotW = chartW - padL - padR, plotH = chartH - padT - padB
  const maxY = Math.max(...yields) * 1.05
  const minY = Math.min(...yields) * 0.95
  const toX = (t) => padL + (t / 30) * plotW
  const toY = (y) => padT + plotH - ((y - minY) / (maxY - minY)) * plotH

  const pathD = maturities.map((t, i) => `${i === 0 ? 'M' : 'L'}${toX(t).toFixed(1)},${toY(yields[i]).toFixed(1)}`).join(' ')
  const y1 = yields[maturities.indexOf(1)]
  const y10 = yields[maturities.indexOf(10)]

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Indian G-Sec Yield Curve
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Model the G-Sec yield curve by adjusting the RBI repo rate, term premium, and curvature.
      </p>
      <div className="mb-4 grid grid-cols-3 gap-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Short Rate = {shortRate.toFixed(1)}%</span>
          <input type="range" min="4" max="9" step="0.1" value={shortRate}
            onChange={e => setShortRate(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Term Premium = {termPremium.toFixed(1)}%</span>
          <input type="range" min="-1" max="3" step="0.1" value={termPremium}
            onChange={e => setTermPremium(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Curvature = {curvature.toFixed(1)}</span>
          <input type="range" min="-1" max="2" step="0.1" value={curvature}
            onChange={e => setCurvature(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>
      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full max-w-xl mx-auto block">
        <line x1={padL} y1={padT + plotH} x2={padL + plotW} y2={padT + plotH} stroke="#9ca3af" strokeWidth="1" />
        <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke="#9ca3af" strokeWidth="1" />
        <path d={pathD} fill="none" stroke="#6366f1" strokeWidth="2.5" />
        {maturities.map((t, i) => (
          <circle key={i} cx={toX(t)} cy={toY(yields[i])} r="3" fill="#6366f1" />
        ))}
        <text x={padL + plotW / 2} y={chartH - 4} textAnchor="middle" className="text-[10px]" fill="#6b7280">Maturity (Years)</text>
      </svg>
      <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded bg-gray-50 p-2 dark:bg-gray-800">
          <div className="text-gray-500">1Y Yield</div>
          <div className="font-bold text-gray-700 dark:text-gray-300">{y1.toFixed(2)}%</div>
        </div>
        <div className="rounded bg-gray-50 p-2 dark:bg-gray-800">
          <div className="text-gray-500">10Y Yield</div>
          <div className="font-bold text-gray-700 dark:text-gray-300">{y10.toFixed(2)}%</div>
        </div>
        <div className="rounded bg-indigo-50 p-2 dark:bg-indigo-900/30">
          <div className="text-indigo-500">10Y-1Y Spread</div>
          <div className="font-bold text-indigo-700 dark:text-indigo-300">{((y10 - y1) * 100).toFixed(0)} bps</div>
        </div>
      </div>
    </div>
  )
}

export default function FixedIncome() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Indian Fixed Income: G-Secs, Corporate Bonds, and the RBI Yield Curve
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        India's fixed income market, anchored by Government Securities (G-Secs), is the
        second-largest component of the financial system after equities. Understanding bond
        pricing, duration, and the yield curve is essential for multi-asset quantitative strategies.
      </p>

      <DefinitionBlock
        title="Government Securities (G-Secs)"
        label="Definition 2.1"
        definition={<>
          G-Secs are sovereign debt instruments issued by the Government of India through
          the RBI. They include Treasury Bills (91, 182, 364-day maturities) and dated
          G-Secs (up to 40 years). Being sovereign, they carry zero credit risk in INR terms
          and serve as the benchmark risk-free rate for all Indian fixed income pricing.
        </>}
        notation={<>
          Risk-free rate proxy: 91-day T-Bill (~6.5--7.0%). Benchmark: 10Y G-Sec yield (~7.0--7.5%).
        </>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Bond Pricing Mathematics</h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The price of a fixed-coupon bond with semi-annual payments:
      </p>
      <BlockMath math="P = \sum_{t=1}^{2n} \frac{c \cdot F / 2}{(1 + y/2)^t} + \frac{F}{(1 + y/2)^{2n}}" />

      <TheoremBlock
        title="Duration-Convexity Price Approximation"
        label="Theorem 2.1"
        statement={<>
          For a yield change <InlineMath math="\Delta y" />:
          <BlockMath math="\frac{\Delta P}{P} \approx -D_{\text{mod}} \cdot \Delta y + \frac{1}{2} C \cdot (\Delta y)^2" />
          A 10Y G-Sec with duration 7.5 loses approximately 3.75% for a 50 bps rate hike.
          For a INR 100 crore position, this is a INR 3.75 crore mark-to-market loss.
        </>}
      />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Instrument</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Maturity</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Yield</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Duration</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">91-day T-Bill</td><td className="px-4 py-2">3M</td>
              <td className="px-4 py-2">6.5%</td><td className="px-4 py-2">0.25</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">5Y G-Sec</td><td className="px-4 py-2">5Y</td>
              <td className="px-4 py-2">7.1%</td><td className="px-4 py-2">4.3</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">10Y G-Sec</td><td className="px-4 py-2">10Y</td>
              <td className="px-4 py-2">7.3%</td><td className="px-4 py-2">7.5</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">AAA Corp Bond</td><td className="px-4 py-2">5Y</td>
              <td className="px-4 py-2">7.8%</td><td className="px-4 py-2">4.2</td>
            </tr>
            <tr>
              <td className="px-4 py-2">SDL</td><td className="px-4 py-2">10Y</td>
              <td className="px-4 py-2">7.5%</td><td className="px-4 py-2">7.2</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveYieldCurve />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Nelson-Siegel Yield Curve Model</h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The Nelson-Siegel model parameterizes the yield curve with just 4 parameters:
      </p>
      <BlockMath math="y(\tau) = \beta_0 + \beta_1 \frac{1 - e^{-\lambda\tau}}{\lambda\tau} + \beta_2 \left(\frac{1 - e^{-\lambda\tau}}{\lambda\tau} - e^{-\lambda\tau}\right)" />
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\beta_0" /> is the long-run level, <InlineMath math="\beta_1" />{' '}
        is the slope, <InlineMath math="\beta_2" /> is the curvature, and{' '}
        <InlineMath math="\lambda" /> controls the decay rate.
      </p>

      <NoteBlock title="Credit Spreads in India" type="info">
        <p>
          The spread between AAA corporate bonds and G-Secs is typically 50--100 bps. AA-rated
          bonds trade 100--200 bps above G-Secs. Credit spread strategies involve going long
          corporate bonds and hedging duration with G-Sec futures or interest rate swaps (IRS).
          SEBI has introduced credit default swaps (CDS) to facilitate credit risk transfer.
        </p>
      </NoteBlock>

      <PythonCode
        title="gsec_analysis.py"
        runnable
        code={`import numpy as np

def bond_price(coupon, face, ytm, maturity, freq=2):
    """Price a fixed-coupon bond with semi-annual payments."""
    n = int(maturity * freq)
    c = coupon * face / freq
    y = ytm / freq
    pv = sum(c / (1 + y)**t for t in range(1, n + 1))
    pv += face / (1 + y)**n
    return pv

def mod_duration(coupon, face, ytm, maturity, freq=2):
    """Modified duration via numerical differentiation."""
    dp = 0.0001
    p = bond_price(coupon, face, ytm, maturity, freq)
    p_up = bond_price(coupon, face, ytm + dp, maturity, freq)
    p_down = bond_price(coupon, face, ytm - dp, maturity, freq)
    return -(p_up - p_down) / (2 * dp * p)

def convexity_calc(coupon, face, ytm, maturity, freq=2):
    """Bond convexity."""
    dp = 0.0001
    p = bond_price(coupon, face, ytm, maturity, freq)
    p_up = bond_price(coupon, face, ytm + dp, maturity, freq)
    p_down = bond_price(coupon, face, ytm - dp, maturity, freq)
    return (p_up + p_down - 2 * p) / (dp**2 * p)

# --- 10Y G-Sec Analysis ---
print("=== 10-Year G-Sec Bond Analysis ===")
coupon = 0.0726  # 7.26% coupon
ytm = 0.0730     # 7.30% YTM
maturity = 10
face = 100

price = bond_price(coupon, face, ytm, maturity)
dur = mod_duration(coupon, face, ytm, maturity)
conv = convexity_calc(coupon, face, ytm, maturity)

print(f"Coupon:     {coupon*100:.2f}%")
print(f"YTM:        {ytm*100:.2f}%")
print(f"Price:      INR {price:.4f}")
print(f"Mod Duration: {dur:.4f}")
print(f"Convexity:  {conv:.2f}")

# RBI rate change scenarios
print("\\n=== RBI Rate Change Impact ===")
position_cr = 100  # INR 100 crore
for dy_bps in [-50, -25, 25, 50, 100]:
    dy = dy_bps / 10000
    dp_pct = -dur * dy + 0.5 * conv * dy**2
    pnl = dp_pct * position_cr
    print(f"  {dy_bps:+4d} bps: Price change {dp_pct*100:+.3f}%, P&L = INR {pnl:+.2f} Cr")

# --- G-Sec Yield Curve ---
print("\\n=== G-Sec Yield Curve ===")
maturities = [0.25, 0.5, 1, 2, 3, 5, 7, 10, 15, 20, 30]
yields_pct = [6.50, 6.60, 6.80, 7.00, 7.10, 7.20, 7.25, 7.30, 7.35, 7.38, 7.40]

for m, y in zip(maturities, yields_pct):
    spread = (y - yields_pct[2]) * 100  # bps over 1Y
    bar = '█' * int(y * 3)
    print(f"  {m:>5.2f}Y: {y:.2f}% {spread:>+5.0f}bp {bar}")

# Carry and rolldown
print("\\n=== Carry Trade Analysis (Buy 10Y, Fund at Repo) ===")
repo = 6.50 / 100
ten_y = 7.30 / 100
carry = ten_y - repo
rolldown = 0.0005  # 5 bps/year price appreciation from rolling down curve
total_return = carry + rolldown
print(f"Carry (10Y - Repo): {carry*100:.2f}%")
print(f"Rolldown:           {rolldown*100:.2f}%")
print(f"Total expected:     {total_return*100:.2f}%")
print(f"Break-even rate rise: {total_return/dur*10000:.0f} bps")`}
      />

      <ExampleBlock
        title="Duration Hedging a G-Sec Portfolio"
        difficulty="intermediate"
        problem="You hold INR 50 crore of 10Y G-Secs (duration 7.5). How many 5Y G-Sec futures contracts (duration 4.3, notional INR 2 lakh) do you need to sell to hedge duration risk?"
        solution={[
          { step: 'Compute dollar duration of portfolio', formula: 'DD_{\\text{port}} = 50 \\times 7.5 = 375 \\text{ Cr-years}' },
          { step: 'Compute dollar duration per futures contract', formula: 'DD_{\\text{fut}} = 0.02 \\times 4.3 = 0.086 \\text{ Cr-years}' },
          { step: 'Number of contracts', formula: 'n = \\frac{375}{0.086} \\approx 4,360 \\text{ contracts}', explanation: 'Sell 4,360 five-year G-Sec futures to neutralize the portfolio duration. This hedges against parallel yield curve shifts but not twists.' },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Indian fixed income revolves around G-Secs and the RBI's monetary policy. Duration
          and convexity are essential risk metrics. Key quant strategies include: (1) curve
          steepener/flattener trades, (2) G-Sec carry with repo funding, (3) credit spread
          trading between AAA corporates and G-Secs, and (4) event-driven trading around RBI
          MPC meetings. The Nelson-Siegel model provides a parsimonious yield curve representation.
        </p>
      </NoteBlock>
    </div>
  )
}
