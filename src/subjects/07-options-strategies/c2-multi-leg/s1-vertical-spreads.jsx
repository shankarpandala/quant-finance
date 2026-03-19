import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveVerticalSpread() {
  const [spreadType, setSpreadType] = useState('bull-call')
  const [lowerStrike, setLowerStrike] = useState(21800)
  const [upperStrike, setUpperStrike] = useState(22200)
  const [lowerPrem, setLowerPrem] = useState(280)
  const [upperPrem, setUpperPrem] = useState(120)

  const expiryPrices = Array.from({ length: 41 }, (_, i) => 20000 + i * 100)

  let pnl
  if (spreadType === 'bull-call') {
    pnl = expiryPrices.map(s => {
      const longCall = Math.max(s - lowerStrike, 0) - lowerPrem
      const shortCall = upperPrem - Math.max(s - upperStrike, 0)
      return longCall + shortCall
    })
  } else if (spreadType === 'bear-put') {
    pnl = expiryPrices.map(s => {
      const longPut = Math.max(upperStrike - s, 0) - upperPrem
      const shortPut = lowerPrem - Math.max(lowerStrike - s, 0)
      return longPut + shortPut
    })
  } else if (spreadType === 'bull-put') {
    pnl = expiryPrices.map(s => {
      const shortPut = upperPrem - Math.max(upperStrike - s, 0)
      const longPut = Math.max(lowerStrike - s, 0) - lowerPrem
      return shortPut + longPut
    })
  } else {
    pnl = expiryPrices.map(s => {
      const shortCall = lowerPrem - Math.max(s - lowerStrike, 0)
      const longCall = Math.max(s - upperStrike, 0) - upperPrem
      return shortCall + longCall
    })
  }

  const maxProfit = Math.max(...pnl)
  const maxLoss = Math.min(...pnl)
  const chartW = 480, chartH = 150, padL = 50
  const toY = (v) => chartH + 5 - ((v - maxLoss) / (maxProfit - maxLoss)) * chartH
  const toX = (i) => padL + (i / (expiryPrices.length - 1)) * (chartW - padL)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Vertical Spreads on Nifty 50
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Select spread type and adjust strikes to visualize the payoff profile.
      </p>

      <div className="mb-4 flex flex-wrap gap-3">
        {['bull-call', 'bear-put', 'bull-put', 'bear-call'].map(t => (
          <label key={t} className="flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300">
            <input type="radio" name="spread" value={t} checked={spreadType === t}
              onChange={() => setSpreadType(t)} className="accent-indigo-500" />
            {t.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </label>
        ))}
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Lower Strike = {lowerStrike}</span>
          <input type="range" min="20000" max="22000" step="50" value={lowerStrike}
            onChange={e => setLowerStrike(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Upper Strike = {upperStrike}</span>
          <input type="range" min="22000" max="24000" step="50" value={upperStrike}
            onChange={e => setUpperStrike(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Lower Premium = {lowerPrem}</span>
          <input type="range" min="20" max="500" step="10" value={lowerPrem}
            onChange={e => setLowerPrem(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Upper Premium = {upperPrem}</span>
          <input type="range" min="10" max="400" step="10" value={upperPrem}
            onChange={e => setUpperPrem(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox={`0 0 ${chartW + 20} ${chartH + 35}`}
        className="w-full max-w-2xl mx-auto block" aria-label="Vertical spread payoff">
        <line x1={padL} y1={5} x2={padL} y2={chartH + 5} stroke="#9ca3af" strokeWidth="1" />
        <line x1={padL} y1={toY(0)} x2={chartW + 10} y2={toY(0)} stroke="#9ca3af" strokeWidth="1" strokeDasharray="3" />
        <polyline points={pnl.map((p, i) => `${toX(i)},${toY(p)}`).join(' ')}
          fill="none" stroke="#6366f1" strokeWidth="2.5" />
        <text x={padL + chartW / 2} y={chartH + 28} textAnchor="middle" className="text-[10px]" fill="#9ca3af">Nifty at Expiry</text>
      </svg>

      <div className="mt-3 grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Max Profit</div>
          <div className="text-lg font-bold text-green-600 dark:text-green-400">{maxProfit}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Max Loss</div>
          <div className="text-lg font-bold text-red-600 dark:text-red-400">{maxLoss}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Risk/Reward</div>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {Math.abs(maxLoss / maxProfit).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function VerticalSpreads() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Vertical Spreads
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Vertical spreads involve buying and selling options of the same type (calls or puts) with
        the same expiry but different strikes. They are the most popular multi-leg strategies on
        NSE, offering defined risk and defined reward. On Zerodha, vertical spreads enjoy margin
        benefits under SPAN, making them capital-efficient for directional bets on Nifty and
        Bank Nifty.
      </p>

      <DefinitionBlock
        title="Bull Call Spread"
        label="Definition 7.4"
        definition="A bull call spread is constructed by buying a call at a lower strike K_1 and selling a call at a higher strike K_2 with the same expiry. It profits when the underlying rises moderately. Maximum profit is (K_2 - K_1) - net debit."
        notation="\text{P\&L} = \max(S_T - K_1, 0) - \max(S_T - K_2, 0) - (c_1 - c_2)"
      />

      <BlockMath math="\text{Bull Call P\&L} = \begin{cases} -(c_1 - c_2) & S_T \leq K_1 \\ S_T - K_1 - (c_1 - c_2) & K_1 < S_T < K_2 \\ (K_2 - K_1) - (c_1 - c_2) & S_T \geq K_2 \end{cases}" />

      <DefinitionBlock
        title="Bear Put Spread"
        label="Definition 7.5"
        definition="A bear put spread is constructed by buying a put at a higher strike K_2 and selling a put at a lower strike K_1 with the same expiry. It profits when the underlying falls. Maximum profit is (K_2 - K_1) - net debit."
        notation="\text{P\&L} = \max(K_2 - S_T, 0) - \max(K_1 - S_T, 0) - (p_2 - p_1)"
      />

      <TheoremBlock
        title="Put-Call Parity for Vertical Spreads"
        label="Theorem 7.4"
        statement="A bull call spread and a bull put spread at the same strikes have the same terminal payoff profile. They differ only in the upfront cash flow (debit vs. credit): Bull Call debit = (K_2 - K_1)e^{-rT} - Bull Put credit. In practice on NSE, the choice depends on liquidity and bid-ask spreads at each strike."
        proof="By put-call parity at each strike: C_i - P_i = S - K_i e^{-rT}. Subtracting the parity equations at K_1 and K_2: (C_1 - C_2) - (P_1 - P_2) = (K_2 - K_1)e^{-rT}. This shows the bull call debit equals the spread width discounted minus the bull put credit."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Spread Width and Risk-Reward
      </h3>
      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Width</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Max Profit</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Max Loss</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Margin (NSE)</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Character</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Narrow (100pt)</td>
              <td className="px-4 py-2">Small</td>
              <td className="px-4 py-2">Small</td>
              <td className="px-4 py-2">~INR 8K</td>
              <td className="px-4 py-2">High probability</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Medium (300pt)</td>
              <td className="px-4 py-2">Moderate</td>
              <td className="px-4 py-2">Moderate</td>
              <td className="px-4 py-2">~INR 22K</td>
              <td className="px-4 py-2">Balanced</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Wide (500pt)</td>
              <td className="px-4 py-2">Large</td>
              <td className="px-4 py-2">Large</td>
              <td className="px-4 py-2">~INR 38K</td>
              <td className="px-4 py-2">Directional bet</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveVerticalSpread />

      <PythonCode
        title="vertical_spreads.py"
        runnable
        code={`import numpy as np
from scipy.stats import norm

def bsm_call(S, K, T, r, sigma):
    d1 = (np.log(S/K) + (r + sigma**2/2)*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    return S*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)

def bsm_put(S, K, T, r, sigma):
    d1 = (np.log(S/K) + (r + sigma**2/2)*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    return K*np.exp(-r*T)*norm.cdf(-d2) - S*norm.cdf(-d1)

S, r, sigma, T = 22000, 0.065, 0.18, 15/365
lot_size = 75

# Bull Call Spread: Buy 22000 CE, Sell 22300 CE
K1, K2 = 22000, 22300
c1 = bsm_call(S, K1, T, r, sigma)
c2 = bsm_call(S, K2, T, r, sigma)
debit = c1 - c2

print("=== Nifty Bull Call Spread (15 DTE) ===")
print(f"Buy  {K1} CE @ {c1:.2f}")
print(f"Sell {K2} CE @ {c2:.2f}")
print(f"Net Debit: {debit:.2f} per unit")
print(f"Max Profit: {(K2-K1) - debit:.2f} per unit")
print(f"Max Loss: {debit:.2f} per unit")
print(f"Breakeven: {K1 + debit:.0f}")
print(f"Per lot: Debit={debit*lot_size:,.0f}, Max Profit={(K2-K1-debit)*lot_size:,.0f}")

# Compare all four verticals
print(f"\\n=== All Vertical Spreads at {K1}/{K2} ===")
p1 = bsm_put(S, K1, T, r, sigma)
p2 = bsm_put(S, K2, T, r, sigma)

spreads = {
    'Bull Call': {'debit': c1-c2, 'max_profit': (K2-K1)-(c1-c2), 'bias': 'bullish'},
    'Bear Put': {'debit': p2-p1, 'max_profit': (K2-K1)-(p2-p1), 'bias': 'bearish'},
    'Bull Put': {'debit': -(p2-p1), 'max_profit': p2-p1, 'bias': 'bullish (credit)'},
    'Bear Call': {'debit': -(c1-c2), 'max_profit': c1-c2, 'bias': 'bearish (credit)'},
}

print(f"{'Strategy':<15} {'Net Cost':>10} {'Max Profit':>12} {'Max Loss':>10} {'Bias':<18}")
print("-" * 68)
for name, s in spreads.items():
    max_loss = abs(s['debit']) if s['debit'] > 0 else (K2-K1) - abs(s['debit'])
    print(f"{name:<15} {s['debit']:>10.2f} {s['max_profit']:>12.2f} "
          f"{max_loss:>10.2f} {s['bias']:<18}")

# Probability of profit using BSM
d2_be = (np.log(S/(K1+debit)) + (r-sigma**2/2)*T) / (sigma*np.sqrt(T))
prob_profit = norm.cdf(d2_be)
print(f"\\nBull Call Spread probability of profit: {prob_profit*100:.1f}%")`}
      />

      <ExampleBlock
        title="Bull Call Spread Before RBI Policy"
        difficulty="beginner"
        problem="You expect Nifty to rally 200-300 points after the RBI keeps rates unchanged. Buy Nifty 22000 CE at INR 250, sell 22300 CE at INR 110. Both expire in 7 days. Calculate max profit, max loss, and breakeven."
        solution={[
          {
            step: 'Net debit',
            formula: '\\text{Debit} = 250 - 110 = 140 \\text{ per unit}',
          },
          {
            step: 'Max profit (per lot of 75)',
            formula: '(K_2 - K_1 - \\text{Debit}) \\times 75 = (300 - 140) \\times 75 = \\text{INR } 12,000',
          },
          {
            step: 'Max loss (per lot)',
            formula: '\\text{Debit} \\times 75 = 140 \\times 75 = \\text{INR } 10,500',
          },
          {
            step: 'Breakeven',
            formula: 'K_1 + \\text{Debit} = 22000 + 140 = 22140',
            explanation: 'Nifty needs to close above 22140 for the spread to be profitable.',
          },
        ]}
      />

      <NoteBlock title="Credit vs Debit Spreads on NSE" type="tip">
        <p>
          Credit spreads (bull put, bear call) collect premium upfront but require margin. On
          Zerodha, the margin for a Nifty credit spread is roughly equal to the spread width
          minus the premium collected, multiplied by lot size. Debit spreads require no margin
          beyond the debit paid. For capital-constrained traders, debit spreads are simpler to
          manage. For income-oriented traders, credit spreads benefit from theta decay.
        </p>
      </NoteBlock>

      <NoteBlock title="Slippage and Execution" type="warning">
        <p>
          When executing vertical spreads on NSE, enter both legs simultaneously using spread
          orders (available on some platforms) or execute the less liquid leg first. Nifty options
          have 50-point strike intervals, so a 100-point wide spread uses adjacent strikes. The
          bid-ask spread on individual Nifty options is typically 1-3 points for near-month ATM,
          but widens for far OTM or far-month contracts. Account for 2-4 points of total slippage
          when evaluating expected returns.
        </p>
      </NoteBlock>
    </div>
  )
}
