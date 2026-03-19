import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveDiagonal() {
  const [spot, setSpot] = useState(22000)
  const [longStrike, setLongStrike] = useState(21500)
  const [shortStrike, setShortStrike] = useState(22500)
  const [longPremium, setLongPremium] = useState(1200)
  const [shortPremium, setShortPremium] = useState(180)

  const netDebit = longPremium - shortPremium
  const expiryPrices = Array.from({ length: 31 }, (_, i) => 19500 + i * 200)

  // Approximate long LEAP value at short expiry (still has time value)
  const longTimeLeft = 300 / 365
  const vol = 0.18
  const r = 0.065
  const normCdf = (x) => {
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741
    const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911
    const sign = x < 0 ? -1 : 1
    const t = 1 / (1 + p * Math.abs(x) / Math.sqrt(2))
    const erf = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x / 2)
    return 0.5 * (1 + sign * erf)
  }

  const bsmCall = (S, K, T) => {
    if (T <= 0) return Math.max(S - K, 0)
    const d1 = (Math.log(S / K) + (r + vol * vol / 2) * T) / (vol * Math.sqrt(T))
    const d2 = d1 - vol * Math.sqrt(T)
    return S * normCdf(d1) - K * Math.exp(-r * T) * normCdf(d2)
  }

  const pnl = expiryPrices.map(s => {
    const longVal = bsmCall(s, longStrike, longTimeLeft)
    const shortVal = Math.max(s - shortStrike, 0)
    return (longVal - longPremium) + (shortPremium - shortVal)
  })

  const chartW = 480, chartH = 160, padL = 50
  const maxP = Math.max(...pnl), minP = Math.min(...pnl)
  const toY = (v) => chartH + 5 - ((v - minP) / (maxP - minP)) * chartH
  const toX = (i) => padL + (i / (expiryPrices.length - 1)) * (chartW - padL)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Diagonal Spread on Nifty 50
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Long LEAP call (12-month) + Short near-term call (1-month). P&L at short option expiry.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>LEAP Strike = {longStrike}</span>
          <input type="range" min="19000" max="23000" step="100" value={longStrike}
            onChange={e => setLongStrike(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Short Strike = {shortStrike}</span>
          <input type="range" min="21000" max="25000" step="100" value={shortStrike}
            onChange={e => setShortStrike(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>LEAP Premium = {longPremium}</span>
          <input type="range" min="500" max="3000" step="50" value={longPremium}
            onChange={e => setLongPremium(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Short Premium = {shortPremium}</span>
          <input type="range" min="20" max="500" step="10" value={shortPremium}
            onChange={e => setShortPremium(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox={`0 0 ${chartW + 20} ${chartH + 40}`}
        className="w-full max-w-2xl mx-auto block" aria-label="Diagonal spread payoff">
        <line x1={padL} y1={5} x2={padL} y2={chartH + 5} stroke="#9ca3af" strokeWidth="1" />
        <line x1={padL} y1={toY(0)} x2={chartW + 10} y2={toY(0)} stroke="#9ca3af" strokeWidth="1" strokeDasharray="3" />
        <polyline points={pnl.map((p, i) => `${toX(i)},${toY(p)}`).join(' ')}
          fill="none" stroke="#8b5cf6" strokeWidth="2.5" />
        <text x={padL + chartW / 2} y={chartH + 30} textAnchor="middle" className="text-[10px]" fill="#9ca3af">Nifty at Short Expiry</text>
      </svg>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Net Debit</div>
          <div className="text-lg font-bold text-red-600 dark:text-red-400">INR {netDebit}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Short/LEAP Ratio</div>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{(shortPremium / longPremium * 100).toFixed(1)}%</div>
        </div>
      </div>
    </div>
  )
}

export default function LeapsDiagonal() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        LEAPS and Diagonal Spreads
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        LEAPS (Long-term Equity Anticipation Securities) are options with expiries beyond one year.
        While NSE does not offer dedicated LEAPS contracts, long-dated monthly options (3-12 months
        out) serve a similar purpose for Nifty 50 and select liquid stocks. Diagonal spreads combine
        a long-dated option with a short near-term option at a different strike, exploiting the
        differential time decay between the two legs.
      </p>

      <DefinitionBlock
        title="Diagonal Spread"
        label="Definition 7.3"
        definition="A diagonal spread involves buying a longer-dated option at one strike and selling a shorter-dated option at a different strike on the same underlying. It combines features of both calendar spreads (different expiries) and vertical spreads (different strikes)."
        notation="\text{Diagonal} = -C(K_1, T_1) + C(K_2, T_2), \quad T_2 > T_1, \; K_2 \neq K_1"
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The diagonal call spread profits from three sources: (1) the short option's time decay
        (theta), (2) the long option's delta exposure (directional), and (3) changes in implied
        volatility (vega). The key insight is that the short near-term option decays much faster
        than the long-dated option.
      </p>

      <BlockMath math="\Theta_{\text{diagonal}} = \Theta_{\text{long}} - |\Theta_{\text{short}}| \approx -|\Theta_{\text{short}}| \quad \text{(net positive theta)}" />

      <TheoremBlock
        title="Theta Ratio in Diagonal Spreads"
        label="Theorem 7.3"
        statement="The ratio of daily theta between two ATM options with expiries T_1 and T_2 (T_2 > T_1) is approximately \Theta_1/\Theta_2 \approx \sqrt{T_2/T_1}. This means a 1-month option decays \sqrt{12} \approx 3.5 times faster than a 12-month option."
        proof="For ATM options, \Theta \propto S\sigma\phi(0)/(2\sqrt{T}) = S\sigma/(2\sqrt{2\pi T}). The ratio is \Theta_1/\Theta_2 = \sqrt{T_2}/\sqrt{T_1} = \sqrt{T_2/T_1}."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Poor Man's Covered Call
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The diagonal call spread where the long leg is a deep ITM LEAP call is called a "poor man's
        covered call" because it mimics a covered call with much less capital. Instead of buying
        shares of Reliance at INR 2500 (requiring INR 6.25 lakh per lot), you buy a deep ITM LEAP
        call for INR 300-400 per share and sell monthly OTM calls against it.
      </p>

      <BlockMath math="\text{Capital Required:} \quad \text{PMCC} = c_{\text{LEAP}} \ll S_0 = \text{Stock}" />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Feature</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Covered Call</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">PMCC (Diagonal)</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Capital needed</td>
              <td className="px-4 py-2">Full stock price</td>
              <td className="px-4 py-2">LEAP premium only</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Max loss</td>
              <td className="px-4 py-2">Stock to zero</td>
              <td className="px-4 py-2">Net debit paid</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Delta</td>
              <td className="px-4 py-2">1 - delta(short)</td>
              <td className="px-4 py-2">delta(LEAP) - delta(short)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Dividend</td>
              <td className="px-4 py-2">Received</td>
              <td className="px-4 py-2">Not received</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Leverage</td>
              <td className="px-4 py-2">1x</td>
              <td className="px-4 py-2">3-6x</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveDiagonal />

      <PythonCode
        title="diagonal_spread_analysis.py"
        runnable
        code={`import numpy as np
from scipy.stats import norm

def bsm_call(S, K, T, r, sigma):
    if T <= 0:
        return max(S - K, 0)
    d1 = (np.log(S/K) + (r + sigma**2/2)*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    return S*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)

def bsm_greeks(S, K, T, r, sigma):
    if T <= 0:
        return {'delta': 1.0 if S > K else 0.0, 'theta': 0, 'vega': 0}
    d1 = (np.log(S/K) + (r + sigma**2/2)*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    delta = norm.cdf(d1)
    theta = (-S*norm.pdf(d1)*sigma/(2*np.sqrt(T))
             - r*K*np.exp(-r*T)*norm.cdf(d2)) / 365
    vega = S * np.sqrt(T) * norm.pdf(d1) / 100
    return {'delta': delta, 'theta': theta, 'vega': vega}

# Nifty 50 Diagonal Spread (Poor Man's Covered Call)
S = 22000
r = 0.065
sigma = 0.18

# Long: 12-month deep ITM call
K_long = 20000
T_long = 365 / 365
c_long = bsm_call(S, K_long, T_long, r, sigma)

# Short: 1-month OTM call
K_short = 22500
T_short = 30 / 365
c_short = bsm_call(S, K_short, T_short, r, sigma)

net_debit = c_long - c_short

print("=== Nifty 50 Diagonal Spread (PMCC) ===")
print(f"Long:  {K_long} CE 12-month @ {c_long:.2f}")
print(f"Short: {K_short} CE 1-month  @ {c_short:.2f}")
print(f"Net Debit: {net_debit:.2f} per unit")
print(f"Capital per lot: INR {net_debit * 75:,.0f}")
print(f"vs Stock: INR {S * 75:,.0f}")
print(f"Leverage: {S / net_debit:.1f}x")

# Greeks comparison
g_long = bsm_greeks(S, K_long, T_long, r, sigma)
g_short = bsm_greeks(S, K_short, T_short, r, sigma)

print(f"\\n{'Greek':>10} {'Long':>10} {'Short':>10} {'Net':>10}")
print("-" * 44)
for key in ['delta', 'theta', 'vega']:
    net = g_long[key] - g_short[key]
    print(f"{key:>10} {g_long[key]:>10.4f} {g_short[key]:>10.4f} {net:>+10.4f}")

# Rolling simulation: sell monthly calls against LEAP
print(f"\\n=== Rolling Monthly Short Calls (12 months) ===")
total_collected = 0
months = 12
for m in range(months):
    T_remaining = (365 - m * 30) / 365
    K_m = S * 1.02  # 2% OTM each month
    c_m = bsm_call(S, K_m, 30/365, r, sigma)
    total_collected += c_m
    print(f"Month {m+1:>2}: Sell {K_m:.0f} CE @ {c_m:.2f} | "
          f"Cumulative: {total_collected:.2f}")

pct_recovered = total_collected / c_long * 100
print(f"\\nTotal collected: {total_collected:.2f}")
print(f"LEAP cost: {c_long:.2f}")
print(f"Recovered: {pct_recovered:.1f}% of LEAP cost")`}
      />

      <ExampleBlock
        title="Poor Man's Covered Call on Nifty"
        difficulty="intermediate"
        problem="Buy Nifty 20000 CE (12-month) at INR 3200 and sell Nifty 22500 CE (1-month) at INR 150. Compare capital efficiency with a traditional covered call (buying Nifty futures at 22000 + selling 22500 CE)."
        solution={[
          {
            step: 'PMCC capital per lot',
            formula: '\\text{PMCC} = (3200 - 150) \\times 75 = \\text{INR } 2,28,750',
          },
          {
            step: 'Traditional covered call capital',
            formula: '\\text{Traditional} \\approx 22000 \\times 75 \\times 12\\% = \\text{INR } 1,98,000 \\text{ (margin)}',
            explanation: 'Futures margin is ~12% of notional, plus the short call margin is offset by SPAN.',
          },
          {
            step: 'Max profit comparison',
            formula: '\\text{PMCC max} = (22500 - 20000 + 150 - 3200) \\times 75 = -550 \\times 75 < 0',
            explanation: 'If stock rises well above 22500, the PMCC nets 2500 - 3050 = -550 loss. But with rolling, monthly premiums compound.',
          },
          {
            step: 'Monthly premium as % of capital',
            formula: '\\frac{150 \\times 75}{2,28,750} = 4.9\\% \\text{ monthly return}',
            explanation: 'If the short call expires worthless, the monthly yield is 4.9% on capital deployed.',
          },
        ]}
      />

      <NoteBlock title="LEAP Availability on NSE" type="tip">
        <p>
          NSE offers monthly Nifty 50 options up to 12 months out, and weekly options for the
          current and next month. For diagonal spreads, use the far-month contracts (6-12 months)
          as the long leg. Liquidity drops significantly for options beyond 3 months, so use limit
          orders and check the bid-ask spread before entering. Bank Nifty long-dated options have
          even thinner liquidity -- consider Nifty for diagonal strategies.
        </p>
      </NoteBlock>

      <NoteBlock title="Vega Risk in Diagonals" type="warning">
        <p>
          Diagonal spreads are typically net long vega because the long-dated option has much
          higher vega than the short-dated one. If IV drops after entry (e.g., post-event vol
          crush after RBI policy or election results), the long LEAP loses more value than the
          short option gains. To mitigate this, enter diagonals when India VIX is at the lower
          end of its range (below 14) rather than during high-vol periods.
        </p>
      </NoteBlock>
    </div>
  )
}
