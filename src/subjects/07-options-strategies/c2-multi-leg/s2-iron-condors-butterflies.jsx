import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveIronCondor() {
  const [center, setCenter] = useState(22000)
  const [putWidth, setPutWidth] = useState(300)
  const [callWidth, setCallWidth] = useState(300)
  const [strategy, setStrategy] = useState('iron-condor')

  const K1 = center - putWidth - 200
  const K2 = center - putWidth
  const K3 = center + callWidth
  const K4 = center + callWidth + 200

  const vol = 0.16
  const T = 15 / 365
  const r = 0.065

  const normCdf = (x) => {
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741
    const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911
    const sign = x < 0 ? -1 : 1
    const t = 1 / (1 + p * Math.abs(x) / Math.sqrt(2))
    const erf = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x / 2)
    return 0.5 * (1 + sign * erf)
  }
  const bsm = (S, K) => {
    const d1 = (Math.log(S / K) + (r + vol * vol / 2) * T) / (vol * Math.sqrt(T))
    const d2 = d1 - vol * Math.sqrt(T)
    return S * normCdf(d1) - K * Math.exp(-r * T) * normCdf(d2)
  }
  const bsmPut = (S, K) => bsm(S, K) - S + K * Math.exp(-r * T)

  const expiryPrices = Array.from({ length: 61 }, (_, i) => center - 1500 + i * 50)
  let pnl

  if (strategy === 'iron-condor') {
    const p1 = bsmPut(center, K1)
    const p2 = bsmPut(center, K2)
    const c3 = bsm(center, K3)
    const c4 = bsm(center, K4)
    const credit = (p2 - p1) + (c3 - c4)
    pnl = expiryPrices.map(s => {
      const putSpread = Math.max(K2 - s, 0) - Math.max(K1 - s, 0)
      const callSpread = Math.max(s - K3, 0) - Math.max(s - K4, 0)
      return credit - putSpread - callSpread
    })
  } else {
    const Km = center
    const Kl = center - 200
    const Ku = center + 200
    const cl = bsm(center, Kl)
    const cm = bsm(center, Km)
    const cu = bsm(center, Ku)
    const debit = cl - 2 * cm + cu
    pnl = expiryPrices.map(s => {
      return Math.max(s - Kl, 0) - 2 * Math.max(s - Km, 0) + Math.max(s - Ku, 0) - debit
    })
  }

  const maxProfit = Math.max(...pnl)
  const maxLoss = Math.min(...pnl)
  const chartW = 480, chartH = 150, padL = 50
  const toY = (v) => chartH + 5 - ((v - maxLoss * 1.1) / (maxProfit * 1.1 - maxLoss * 1.1)) * chartH
  const toX = (i) => padL + (i / (expiryPrices.length - 1)) * (chartW - padL)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Iron Condor & Butterfly on Nifty 50
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Choose strategy and adjust wing widths around the center price.
      </p>

      <div className="mb-4 flex gap-4">
        <label className="flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300">
          <input type="radio" name="strat" value="iron-condor" checked={strategy === 'iron-condor'}
            onChange={() => setStrategy('iron-condor')} className="accent-indigo-500" />
          Iron Condor
        </label>
        <label className="flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300">
          <input type="radio" name="strat" value="butterfly" checked={strategy === 'butterfly'}
            onChange={() => setStrategy('butterfly')} className="accent-indigo-500" />
          Butterfly
        </label>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Center = {center}</span>
          <input type="range" min="20000" max="24000" step="50" value={center}
            onChange={e => setCenter(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        {strategy === 'iron-condor' && (
          <>
            <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
              <span>Put Wing Width = {putWidth}</span>
              <input type="range" min="100" max="800" step="50" value={putWidth}
                onChange={e => setPutWidth(Number(e.target.value))}
                className="h-2 w-full cursor-pointer accent-indigo-500" />
            </label>
            <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
              <span>Call Wing Width = {callWidth}</span>
              <input type="range" min="100" max="800" step="50" value={callWidth}
                onChange={e => setCallWidth(Number(e.target.value))}
                className="h-2 w-full cursor-pointer accent-indigo-500" />
            </label>
          </>
        )}
      </div>

      <svg viewBox={`0 0 ${chartW + 20} ${chartH + 35}`}
        className="w-full max-w-2xl mx-auto block" aria-label="Strategy payoff">
        <line x1={padL} y1={5} x2={padL} y2={chartH + 5} stroke="#9ca3af" strokeWidth="1" />
        <line x1={padL} y1={toY(0)} x2={chartW + 10} y2={toY(0)} stroke="#9ca3af" strokeWidth="1" strokeDasharray="3" />
        <polyline points={pnl.map((p, i) => `${toX(i)},${toY(p)}`).join(' ')}
          fill="none" stroke="#6366f1" strokeWidth="2.5" />
      </svg>

      <div className="mt-3 grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Max Profit</div>
          <div className="text-lg font-bold text-green-600 dark:text-green-400">{maxProfit.toFixed(0)}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Max Loss</div>
          <div className="text-lg font-bold text-red-600 dark:text-red-400">{maxLoss.toFixed(0)}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Reward/Risk</div>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {(maxProfit / Math.abs(maxLoss)).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function IronCondorsButterflies() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Iron Condors and Butterflies
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Iron condors and butterflies are range-bound strategies that profit when the underlying
        stays within a defined range. They are among the most popular strategies for weekly Nifty
        and Bank Nifty options on NSE, where traders exploit rapid theta decay on expiry weeks.
      </p>

      <DefinitionBlock
        title="Iron Condor"
        label="Definition 7.6"
        definition="An iron condor combines a bull put spread and a bear call spread. It involves four options at four strikes: buy OTM put, sell less-OTM put, sell OTM call, buy more-OTM call. All options share the same expiry. Maximum profit is the net credit received."
        notation="\text{IC} = +P(K_1) - P(K_2) - C(K_3) + C(K_4), \quad K_1 < K_2 < K_3 < K_4"
      />

      <BlockMath math="\text{Max Profit} = \text{Net Credit}, \quad \text{Max Loss} = \max(K_2 - K_1, K_4 - K_3) - \text{Credit}" />

      <DefinitionBlock
        title="Butterfly Spread"
        label="Definition 7.7"
        definition="A butterfly spread uses three strikes: buy one option at the lower strike, sell two at the middle strike, and buy one at the upper strike. It profits from minimal movement around the center strike. Can be constructed with calls, puts, or a combination (iron butterfly)."
        notation="\text{Butterfly} = C(K-w) - 2C(K) + C(K+w), \quad \text{width } w"
      />

      <BlockMath math="\text{Butterfly P\&L} = \begin{cases} -\text{debit} & S_T \leq K-w \text{ or } S_T \geq K+w \\ S_T - (K-w) - \text{debit} & K-w < S_T \leq K \\ (K+w) - S_T - \text{debit} & K < S_T < K+w \end{cases}" />

      <TheoremBlock
        title="Iron Condor as Butterfly Decomposition"
        label="Theorem 7.5"
        statement="Any iron condor can be decomposed into two butterfly spreads. Conversely, a butterfly is a limiting case of an iron condor where the inner strikes converge. The iron condor profit zone is wider but the maximum profit is smaller than a butterfly centered at the same point."
        proof="An iron condor with strikes K_1 < K_2 < K_3 < K_4 can be written as: IC = Butterfly(K_1, K_2, K_3) + Butterfly(K_2, K_3, K_4) - Vertical(K_2, K_3). As K_2 approaches K_3, the iron condor degenerates into a single butterfly."
      />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Feature</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Iron Condor</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Butterfly</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Legs</td>
              <td className="px-4 py-2">4 (2 spreads)</td>
              <td className="px-4 py-2">3 (or 4 for iron)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Profit zone</td>
              <td className="px-4 py-2">Wide</td>
              <td className="px-4 py-2">Narrow (centered)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Max profit</td>
              <td className="px-4 py-2">Small (credit)</td>
              <td className="px-4 py-2">Larger (wing width - debit)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Win rate</td>
              <td className="px-4 py-2">Higher (~60-70%)</td>
              <td className="px-4 py-2">Lower (~30-40%)</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Greeks</td>
              <td className="px-4 py-2">Low delta, +theta, -gamma</td>
              <td className="px-4 py-2">Near-zero delta, +theta near K</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveIronCondor />

      <PythonCode
        title="iron_condor_analysis.py"
        runnable
        code={`import numpy as np
from scipy.stats import norm

def bsm_call(S, K, T, r, sigma):
    d1 = (np.log(S/K) + (r+sigma**2/2)*T)/(sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    return S*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)

def bsm_put(S, K, T, r, sigma):
    return bsm_call(S,K,T,r,sigma) - S + K*np.exp(-r*T)

S, r, sigma, T = 22000, 0.065, 0.16, 7/365
lot = 75

# Iron Condor: 21500/21700 put spread + 22300/22500 call spread
K1, K2, K3, K4 = 21500, 21700, 22300, 22500
p1 = bsm_put(S, K1, T, r, sigma)
p2 = bsm_put(S, K2, T, r, sigma)
c3 = bsm_call(S, K3, T, r, sigma)
c4 = bsm_call(S, K4, T, r, sigma)

credit = (p2 - p1) + (c3 - c4)
max_loss = max(K2-K1, K4-K3) - credit
be_lower = K2 - credit
be_upper = K3 + credit

print("=== Weekly Nifty Iron Condor (7 DTE) ===")
print(f"Strikes: {K1}/{K2}/{K3}/{K4}")
print(f"Buy  {K1} PE @ {p1:.2f}")
print(f"Sell {K2} PE @ {p2:.2f}")
print(f"Sell {K3} CE @ {c3:.2f}")
print(f"Buy  {K4} CE @ {c4:.2f}")
print(f"\\nNet Credit: {credit:.2f} per unit")
print(f"Max Profit/lot: INR {credit*lot:,.0f}")
print(f"Max Loss/lot:   INR {max_loss*lot:,.0f}")
print(f"Breakevens: {be_lower:.0f} -- {be_upper:.0f}")
print(f"Profit Range: {(be_upper-be_lower)/S*100:.1f}% of spot")

# Probability of max profit (both OTM at expiry)
d2_put = (np.log(S/K2) + (r-sigma**2/2)*T) / (sigma*np.sqrt(T))
d2_call = (np.log(S/K3) + (r-sigma**2/2)*T) / (sigma*np.sqrt(T))
prob_profit = norm.cdf(d2_call) - norm.cdf(d2_put)
print(f"Probability of max profit: {prob_profit*100:.1f}%")

# Butterfly comparison
print(f"\\n=== Nifty Butterfly at {S} ===")
Km = 22000
w = 200
cl = bsm_call(S, Km-w, T, r, sigma)
cm = bsm_call(S, Km, T, r, sigma)
cu = bsm_call(S, Km+w, T, r, sigma)
debit = cl - 2*cm + cu
max_profit_bf = w - debit

print(f"Strikes: {Km-w}/{Km}/{Km+w}")
print(f"Debit: {debit:.2f}")
print(f"Max Profit: {max_profit_bf:.2f} (at S_T = {Km})")
print(f"Max Loss: {debit:.2f}")
print(f"Per lot: Debit={debit*lot:,.0f}, Max Profit={max_profit_bf*lot:,.0f}")
print(f"Reward/Risk: {max_profit_bf/debit:.1f}x")`}
      />

      <ExampleBlock
        title="Weekly Nifty Iron Condor"
        difficulty="intermediate"
        problem="Sell a Nifty iron condor for Thursday weekly expiry: sell 21700 PE at 28, buy 21500 PE at 15, sell 22300 CE at 25, buy 22500 CE at 12. Nifty is at 22000. Calculate credit, max loss, and breakevens."
        solution={[
          {
            step: 'Net credit received',
            formula: '\\text{Credit} = (28 - 15) + (25 - 12) = 13 + 13 = 26',
          },
          {
            step: 'Max loss',
            formula: '\\text{Max Loss} = \\max(200, 200) - 26 = 174 \\text{ per unit}',
          },
          {
            step: 'Per lot P&L',
            formula: '\\text{Max Profit/lot} = 26 \\times 75 = \\text{INR } 1,950',
          },
          {
            step: 'Breakevens',
            formula: '\\text{Lower BE} = 21700 - 26 = 21674, \\quad \\text{Upper BE} = 22300 + 26 = 22326',
            explanation: 'Nifty must stay between 21674 and 22326 for full profit. That is a 652-point range or 2.96% of spot.',
          },
        ]}
      />

      <NoteBlock title="Weekly Expiry Iron Condors" type="tip">
        <p>
          Weekly Nifty iron condors are the bread and butter of many options income traders on
          NSE. The rapid theta decay in the final 3-4 days makes these highly profitable when
          Nifty stays range-bound. However, the reward-to-risk ratio is typically 1:6 to 1:8,
          meaning one losing week can wipe out several weeks of profits. Risk management via
          stop-losses or adjustment rules is essential for long-term survival.
        </p>
      </NoteBlock>

      <NoteBlock title="Adjustment Strategies" type="warning">
        <p>
          When Nifty threatens to breach a short strike, common adjustments include: (1) rolling
          the tested side further OTM (costs premium), (2) closing the untested side and opening
          a new spread closer to the current price, or (3) buying a single option to convert into
          a different structure. On NSE, adjustments should account for the increased margin
          requirements during volatile sessions and the wider bid-ask spreads on strikes that
          have moved from OTM to ATM.
        </p>
      </NoteBlock>
    </div>
  )
}
