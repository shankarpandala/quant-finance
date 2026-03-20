import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveProtectivePut() {
  const [spot, setSpot] = useState(22000)
  const [strike, setStrike] = useState(21500)
  const [premium, setPremium] = useState(180)

  const expiryPrices = Array.from({ length: 41 }, (_, i) => 19000 + i * 200)
  const stockPnl = expiryPrices.map(s => s - spot)
  const putPnl = expiryPrices.map(s => Math.max(strike - s, 0) - premium)
  const totalPnl = expiryPrices.map((_, i) => stockPnl[i] + putPnl[i])

  const maxLoss = spot - strike + premium
  const breakeven = spot + premium

  const chartW = 480
  const chartH = 160
  const padL = 50
  const allPnl = [...stockPnl, ...totalPnl]
  const maxP = Math.max(...allPnl)
  const minP = Math.min(...allPnl)

  const toY = (v) => chartH + 5 - ((v - minP) / (maxP - minP)) * chartH
  const toX = (i) => padL + (i / (expiryPrices.length - 1)) * (chartW - padL)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Protective Put on Nifty 50
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust put strike and premium to visualize the insurance effect on your Nifty position.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Nifty Entry = {spot}</span>
          <input type="range" min="20000" max="24000" step="100" value={spot}
            onChange={e => setSpot(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Put Strike = {strike}</span>
          <input type="range" min="19000" max="23000" step="100" value={strike}
            onChange={e => setStrike(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Put Premium = {premium}</span>
          <input type="range" min="20" max="500" step="10" value={premium}
            onChange={e => setPremium(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox={`0 0 ${chartW + 20} ${chartH + 40}`}
        className="w-full max-w-2xl mx-auto block" aria-label="Protective put payoff">
        <line x1={padL} y1={5} x2={padL} y2={chartH + 5} stroke="#9ca3af" strokeWidth="1" />
        <line x1={padL} y1={toY(0)} x2={chartW + 10} y2={toY(0)} stroke="#9ca3af" strokeWidth="1" strokeDasharray="3" />

        <polyline points={stockPnl.map((p, i) => `${toX(i)},${toY(p)}`).join(' ')}
          fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4" />
        <polyline points={totalPnl.map((p, i) => `${toX(i)},${toY(p)}`).join(' ')}
          fill="none" stroke="#10b981" strokeWidth="2.5" />

        <text x={chartW - 20} y={toY(stockPnl[0]) + 12} className="text-[9px]" fill="#94a3b8">Unhedged</text>
        <text x={chartW - 40} y={toY(totalPnl[totalPnl.length - 1]) - 5} className="text-[9px]" fill="#10b981">Protected</text>
        <text x={padL + chartW / 2} y={chartH + 30} textAnchor="middle" className="text-[10px]" fill="#9ca3af">Nifty at Expiry</text>
      </svg>

      <div className="mt-3 grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Max Loss</div>
          <div className="text-lg font-bold text-red-600 dark:text-red-400">INR {maxLoss}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Breakeven</div>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{breakeven}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Protection Level</div>
          <div className="text-lg font-bold text-green-600 dark:text-green-400">{((1 - strike / spot) * 100).toFixed(1)}% OTM</div>
        </div>
      </div>
    </div>
  )
}

export default function ProtectivePuts() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Protective Puts
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        A protective put, often called portfolio insurance, combines a long stock (or index)
        position with a long put option. It creates a price floor below which losses are limited,
        while preserving unlimited upside. On NSE, institutional investors and mutual funds
        frequently use Nifty 50 puts to hedge equity portfolios during uncertain periods like
        general elections, RBI policy changes, or global risk events.
      </p>

      <DefinitionBlock
        title="Protective Put"
        label="Definition 7.2"
        definition="A protective put consists of a long position in the underlying asset combined with a long put option on the same asset. The put provides downside insurance in exchange for the premium paid."
        notation="\text{P\&L} = (S_T - S_0) + [\max(K - S_T, 0) - p]"
      />

      <BlockMath math="\text{Protective Put P\&L} = \begin{cases} K - S_0 - p & \text{if } S_T \leq K \\ S_T - S_0 - p & \text{if } S_T > K \end{cases}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The protective put is economically equivalent to a long call (by put-call parity) plus
        holding cash equal to the present value of the strike. This is why it is sometimes called
        a "synthetic long call."
      </p>

      <BlockMath math="\text{Max Loss} = S_0 - K + p, \quad \text{Breakeven} = S_0 + p" />

      <TheoremBlock
        title="Cost of Insurance and Moneyness"
        label="Theorem 7.2"
        statement="The cost of portfolio insurance (as a percentage of portfolio value) is determined by the put's moneyness and term. For a put struck x\% below spot with T days to expiry, the approximate premium under BSM is: p/S \approx \sigma\sqrt{T}\,\phi(d_1) - x\,N(-d_2), where x = (S-K)/S is the deductible and \phi is the standard normal PDF."
        proof="This follows from the BSM put formula P = Ke^{-rT}N(-d_2) - SN(-d_1). Dividing by S and using the approximation for small x gives the result. The first term reflects time-value cost, the second reflects the deductible chosen."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Choosing the Right Put on NSE
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Put Type</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Moneyness</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Cost (% of S)</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Max Loss</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Use Case</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">ATM put</td>
              <td className="px-4 py-2">100%</td>
              <td className="px-4 py-2">2.5-4%</td>
              <td className="px-4 py-2">Premium only</td>
              <td className="px-4 py-2">Full protection</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">3% OTM</td>
              <td className="px-4 py-2">97%</td>
              <td className="px-4 py-2">1.5-2.5%</td>
              <td className="px-4 py-2">3% + premium</td>
              <td className="px-4 py-2">Moderate hedge</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">5% OTM</td>
              <td className="px-4 py-2">95%</td>
              <td className="px-4 py-2">0.8-1.5%</td>
              <td className="px-4 py-2">5% + premium</td>
              <td className="px-4 py-2">Tail-risk hedge</td>
            </tr>
            <tr>
              <td className="px-4 py-2">10% OTM</td>
              <td className="px-4 py-2">90%</td>
              <td className="px-4 py-2">0.2-0.5%</td>
              <td className="px-4 py-2">10% + premium</td>
              <td className="px-4 py-2">Crash protection</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveProtectivePut />

      <PythonCode
        title="protective_put_analysis.py"
        runnable
        code={`import numpy as np
from scipy.stats import norm

def bsm_put(S, K, T, r, sigma):
    d1 = (np.log(S/K) + (r + sigma**2/2)*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    return K*np.exp(-r*T)*norm.cdf(-d2) - S*norm.cdf(-d1)

# Nifty 50 portfolio protection analysis
S = 22000
r = 0.065
sigma = 0.18
portfolio_value = 1_00_00_000  # INR 1 crore Nifty portfolio
nifty_lot = 75

print("=== Portfolio Insurance Cost (INR 1 Cr Nifty Portfolio) ===")
print(f"Nifty Spot: {S:,} | IV: {sigma*100:.0f}% | Rate: {r*100:.1f}%")
print(f"Units held: {portfolio_value/S:.0f} = {portfolio_value/S/nifty_lot:.1f} lots")
print()

for T_days in [7, 15, 30, 60, 90]:
    T = T_days / 365
    print(f"--- {T_days}-Day Protection ---")
    print(f"{'Strike':>8} {'OTM%':>6} {'Put Price':>10} {'Cost/Lot':>10} "
          f"{'Total Cost':>12} {'% Portfolio':>10}")

    for otm_pct in [0, 2, 5, 8, 10]:
        K = S * (1 - otm_pct/100)
        put_price = bsm_put(S, K, T, r, sigma)
        cost_per_lot = put_price * nifty_lot
        units = portfolio_value / S
        total_cost = put_price * units
        pct_cost = total_cost / portfolio_value * 100

        print(f"{K:>8.0f} {otm_pct:>5}% {put_price:>10.2f} "
              f"{cost_per_lot:>10,.0f} {total_cost:>12,.0f} {pct_cost:>9.2f}%")
    print()

# Cost of continuous hedging (rolling monthly puts)
print("=== Annual Cost of Rolling Monthly 5% OTM Puts ===")
annual_cost = 0
for month in range(12):
    T = 30 / 365
    K = S * 0.95
    put_price = bsm_put(S, K, T, r, sigma)
    annual_cost += put_price / S * 100
    print(f"Month {month+1:>2}: Put cost = {put_price:.2f} ({put_price/S*100:.2f}%)")

print(f"\\nTotal annual insurance cost: {annual_cost:.1f}% of portfolio")
print(f"Equivalent to: INR {annual_cost/100 * portfolio_value:,.0f}")
print(f"\\nNote: This is like paying {annual_cost:.1f}% annual 'premium'")
print(f"for floor protection at 95% of portfolio value")`}
      />

      <ExampleBlock
        title="Hedging a Nifty Portfolio Before Election Results"
        difficulty="intermediate"
        problem="An FII holds INR 10 crore in Nifty 50 ETF at 22000. They want to protect against a >5% fall over the next 30 days (election result risk). Nifty 20900 PE is quoted at INR 95. Calculate the hedge cost and the worst-case outcome."
        solution={[
          {
            step: 'Calculate units and lots',
            formula: '\\text{Units} = \\frac{10,00,00,000}{22,000} = 4,545 \\text{ units} = 60.6 \\text{ lots}',
            explanation: 'Round to 61 lots = 4,575 units for practical purposes.',
          },
          {
            step: 'Total hedge cost',
            formula: '\\text{Cost} = 61 \\times 75 \\times 95 = \\text{INR } 4,34,625',
            explanation: 'Cost is 0.43% of portfolio value -- relatively cheap for 30-day crash protection.',
          },
          {
            step: 'Worst-case outcome',
            formula: '\\text{Floor} = K - \\text{premium} = 20,900 - 95 = 20,805 \\text{ per unit}',
          },
          {
            step: 'Maximum loss',
            formula: '\\text{Max Loss} = (22,000 - 20,805) \\times 4,575 = \\text{INR } 54,67,125 = 5.47\\%',
            explanation: 'The maximum portfolio loss is capped at ~5.5% regardless of how far Nifty falls.',
          },
        ]}
      />

      <NoteBlock title="India VIX and Put Pricing" type="tip">
        <p>
          The cost of protective puts is directly tied to India VIX. When VIX is at 12 (calm),
          a 5% OTM monthly put costs about 0.5% of portfolio. When VIX spikes to 25+ (crisis),
          the same put costs 2%+. Smart hedgers buy protection when VIX is low (insurance is
          cheap) rather than scrambling during a crisis when premiums are inflated. Monitor India
          VIX on NSE's website or through Zerodha Kite for hedging timing decisions.
        </p>
      </NoteBlock>

      <NoteBlock title="Put Spread as Cheaper Alternative" type="warning">
        <p>
          If outright put protection is too expensive, consider a put spread: buy a 5% OTM put
          and simultaneously sell a 10% OTM put. This caps your protection at the lower strike
          but reduces the net premium by 40-60%. On NSE, this is particularly efficient because
          SPAN margining provides margin offset for the spread, and the net debit is smaller.
          The tradeoff is that protection ceases below the lower strike.
        </p>
      </NoteBlock>
    </div>
  )
}
