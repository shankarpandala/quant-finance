import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveStraddle() {
  const [spot, setSpot] = useState(22000)
  const [strike, setStrike] = useState(22000)
  const [callPrem, setCallPrem] = useState(250)
  const [putPrem, setPutPrem] = useState(230)
  const [isStrangle, setIsStrangle] = useState(false)
  const [strangleWidth, setStrangleWidth] = useState(300)

  const putStrike = isStrangle ? strike - strangleWidth : strike
  const callStrike = isStrangle ? strike + strangleWidth : strike
  const totalCost = callPrem + putPrem

  const expiryPrices = Array.from({ length: 51 }, (_, i) => 19500 + i * 100)
  const pnl = expiryPrices.map(s => {
    const callPayoff = Math.max(s - callStrike, 0) - callPrem
    const putPayoff = Math.max(putStrike - s, 0) - putPrem
    return callPayoff + putPayoff
  })

  const lowerBE = putStrike - totalCost
  const upperBE = callStrike + totalCost
  const maxLoss = -totalCost

  const chartW = 480, chartH = 160, padL = 50
  const maxP = Math.max(...pnl), minP = Math.min(...pnl)
  const toY = (v) => chartH + 5 - ((v - minP) / (maxP - minP)) * chartH
  const toX = (i) => padL + (i / (expiryPrices.length - 1)) * (chartW - padL)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: {isStrangle ? 'Strangle' : 'Straddle'} on Nifty 50
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Toggle between straddle and strangle. Adjust premiums and width.
      </p>

      <div className="mb-4 flex gap-4">
        <label className="flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300">
          <input type="radio" name="type" checked={!isStrangle}
            onChange={() => setIsStrangle(false)} className="accent-indigo-500" />
          Straddle
        </label>
        <label className="flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300">
          <input type="radio" name="type" checked={isStrangle}
            onChange={() => setIsStrangle(true)} className="accent-indigo-500" />
          Strangle
        </label>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Center Strike = {strike}</span>
          <input type="range" min="20000" max="24000" step="50" value={strike}
            onChange={e => setStrike(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Call Premium = {callPrem}</span>
          <input type="range" min="20" max="600" step="10" value={callPrem}
            onChange={e => setCallPrem(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Put Premium = {putPrem}</span>
          <input type="range" min="20" max="600" step="10" value={putPrem}
            onChange={e => setPutPrem(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        {isStrangle && (
          <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
            <span>Width = {strangleWidth}</span>
            <input type="range" min="100" max="800" step="50" value={strangleWidth}
              onChange={e => setStrangleWidth(Number(e.target.value))}
              className="h-2 w-full cursor-pointer accent-indigo-500" />
          </label>
        )}
      </div>

      <svg viewBox={`0 0 ${chartW + 20} ${chartH + 35}`}
        className="w-full max-w-2xl mx-auto block" aria-label="Straddle payoff">
        <line x1={padL} y1={5} x2={padL} y2={chartH + 5} stroke="#9ca3af" strokeWidth="1" />
        <line x1={padL} y1={toY(0)} x2={chartW + 10} y2={toY(0)} stroke="#9ca3af" strokeWidth="1" strokeDasharray="3" />
        <polyline points={pnl.map((p, i) => `${toX(i)},${toY(p)}`).join(' ')}
          fill="none" stroke="#6366f1" strokeWidth="2.5" />
      </svg>

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Total Cost</div>
          <div className="text-lg font-bold text-red-600 dark:text-red-400">{totalCost}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Lower BE</div>
          <div className="text-sm font-bold text-blue-600 dark:text-blue-400">{lowerBE}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Upper BE</div>
          <div className="text-sm font-bold text-blue-600 dark:text-blue-400">{upperBE}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Move Needed</div>
          <div className="text-sm font-bold text-orange-600 dark:text-orange-400">
            {(totalCost / spot * 100).toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  )
}

export default function StraddlesStrangles() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Straddles and Strangles
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Straddles and strangles are volatility strategies that profit from large moves in either
        direction. They are direction-agnostic, betting on the magnitude of the move rather than
        its direction. On NSE, these are heavily traded around high-impact events: Union Budget,
        RBI policy meetings, quarterly earnings of Nifty heavyweights, and election results.
      </p>

      <DefinitionBlock
        title="Long Straddle"
        label="Definition 7.8"
        definition="A long straddle involves buying both a call and a put at the same strike price and expiry. It profits when the underlying makes a large move in either direction, beyond the combined premium paid."
        notation="\text{Straddle P\&L} = \max(S_T - K, 0) + \max(K - S_T, 0) - (c + p) = |S_T - K| - (c + p)"
      />

      <BlockMath math="\text{Breakevens:} \quad K - (c + p) \quad \text{and} \quad K + (c + p)" />

      <DefinitionBlock
        title="Long Strangle"
        label="Definition 7.9"
        definition="A long strangle buys an OTM call (strike K_2) and an OTM put (strike K_1 < K_2). It is cheaper than a straddle but requires a larger move to profit. The loss zone (between the strikes minus premiums) is wider."
        notation="\text{Strangle P\&L} = \max(S_T - K_2, 0) + \max(K_1 - S_T, 0) - (c + p)"
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The implied breakeven move for a straddle gives a direct measure of the market's expected
        range. If a Nifty 22000 straddle costs 480 points (call 250 + put 230), the market implies
        a move of <InlineMath math="\pm 480" /> points, or <InlineMath math="\pm 2.18\%" />.
      </p>

      <TheoremBlock
        title="Straddle Price and ATM Volatility"
        label="Theorem 7.6"
        statement="For an ATM straddle with short maturity, the straddle price is approximately: C_{ATM} + P_{ATM} \approx S\sigma\sqrt{T}\sqrt{2/\pi} \approx 0.798\,S\sigma\sqrt{T}. This provides a quick estimate of the straddle cost from implied volatility and vice versa."
        proof="For ATM options (S = K), d_1 = (r + \sigma^2/2)T/(\sigma\sqrt{T}) \approx \sigma\sqrt{T}/2 for short T. Using Taylor expansion of N(d_1) and N(-d_1) around 0.5, and noting that C + P = 2S\phi(d_1)\sigma\sqrt{T}/(1 + O(\sqrt{T})), the leading term gives the stated approximation."
      />

      <BlockMath math="\sigma_{\text{implied}} \approx \frac{\text{Straddle Price}}{0.798 \cdot S \cdot \sqrt{T}}" />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Feature</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Long Straddle</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Long Strangle</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Short Straddle</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Direction</td>
              <td className="px-4 py-2">Neutral</td>
              <td className="px-4 py-2">Neutral</td>
              <td className="px-4 py-2">Neutral</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Vol view</td>
              <td className="px-4 py-2">Long vol</td>
              <td className="px-4 py-2">Long vol</td>
              <td className="px-4 py-2">Short vol</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Cost</td>
              <td className="px-4 py-2">High debit</td>
              <td className="px-4 py-2">Lower debit</td>
              <td className="px-4 py-2">Credit received</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Max risk</td>
              <td className="px-4 py-2">Premium paid</td>
              <td className="px-4 py-2">Premium paid</td>
              <td className="px-4 py-2">Unlimited</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveStraddle />

      <PythonCode
        title="straddle_analysis.py"
        runnable
        code={`import numpy as np
from scipy.stats import norm

def bsm_call(S, K, T, r, sigma):
    d1 = (np.log(S/K) + (r+sigma**2/2)*T)/(sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    return S*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)

def bsm_put(S, K, T, r, sigma):
    return bsm_call(S,K,T,r,sigma) - S + K*np.exp(-r*T)

S, r, T = 22000, 0.065, 7/365
lot = 75

# Pre-event vs post-event straddle analysis
print("=== Pre-RBI Policy Straddle Analysis ===")
print(f"Nifty: {S:,} | 7 DTE")

iv_pre = 0.22   # Pre-event elevated IV
iv_post = 0.14  # Post-event IV crush

K = 22000
c_pre = bsm_call(S, K, T, r, iv_pre)
p_pre = bsm_put(S, K, T, r, iv_pre)
straddle_cost = c_pre + p_pre

print(f"\\nPre-event IV: {iv_pre*100:.0f}%")
print(f"ATM Call: {c_pre:.2f} | ATM Put: {p_pre:.2f}")
print(f"Straddle Cost: {straddle_cost:.2f}")
print(f"Per lot: INR {straddle_cost*lot:,.0f}")
print(f"Implied move: +/- {straddle_cost:.0f} pts ({straddle_cost/S*100:.1f}%)")

# Quick formula check
approx = 0.798 * S * iv_pre * np.sqrt(T)
print(f"Quick approximation: {approx:.2f}")

# Post-event scenario analysis
print(f"\\n=== Post-Event P&L Scenarios (IV crush to {iv_post*100:.0f}%) ===")
# Assume event happens next day, T_new = 6/365
T_new = 6 / 365
moves = [-500, -300, -100, 0, 100, 300, 500]

print(f"{'Move':>8} {'S_new':>8} {'Call':>8} {'Put':>8} {'Total':>8} {'P&L':>8}")
print("-" * 52)
for move in moves:
    S_new = S + move
    c_new = bsm_call(S_new, K, T_new, r, iv_post)
    p_new = bsm_put(S_new, K, T_new, r, iv_post)
    total = c_new + p_new
    pnl = total - straddle_cost
    print(f"{move:>+8} {S_new:>8} {c_new:>8.1f} {p_new:>8.1f} "
          f"{total:>8.1f} {pnl:>+8.1f}")

# Strangle comparison
print(f"\\n=== Strangle vs Straddle (Pre-event) ===")
widths = [0, 100, 200, 300, 500]
for w in widths:
    c = bsm_call(S, K+w, T, r, iv_pre)
    p = bsm_put(S, K-w, T, r, iv_pre)
    cost = c + p
    be_pct = (cost + w) / S * 100
    label = "Straddle" if w == 0 else f"Strangle +/-{w}"
    print(f"{label:<20} Cost: {cost:>6.1f} | BE move: {be_pct:.1f}%")`}
      />

      <ExampleBlock
        title="Budget Day Straddle on Nifty"
        difficulty="intermediate"
        problem="Before Union Budget, Nifty 22000 CE trades at 350 and PE at 320 (elevated IV of 24%). Post-budget, IV is expected to crush to 14%. If Nifty moves +200 points, estimate the straddle P&L the next day (6 DTE remaining)."
        solution={[
          {
            step: 'Entry cost',
            formula: '\\text{Straddle} = 350 + 320 = 670 \\text{ per unit}',
          },
          {
            step: 'Post-event position value (S=22200, IV=14%, T=6/365)',
            formula: 'C(22200, 22000, 6/365, 14\\%) \\approx 225, \\quad P \\approx 18',
            explanation: 'Call retains intrinsic + some time value, put is nearly worthless.',
          },
          {
            step: 'P&L',
            formula: '(225 + 18) - 670 = -427 \\text{ per unit}',
            explanation: 'Despite a 200-point move, the straddle LOSES money because the IV crush from 24% to 14% destroys more value than the move generates. This is the vol crush trap.',
          },
        ]}
      />

      <NoteBlock title="The Vol Crush Trap" type="warning">
        <p>
          Buying straddles before known events (RBI policy, Budget, elections) is tempting but
          dangerous. The market prices the expected move into pre-event IV. After the event, IV
          crushes back to normal levels. Unless the actual move exceeds the implied move, the
          straddle loses money. On NSE, pre-Budget Nifty IV often reaches 22-28%, but post-Budget
          it can drop to 13-16% overnight. The move must exceed the straddle cost AFTER adjusting
          for IV crush.
        </p>
      </NoteBlock>

      <NoteBlock title="Short Strangles: The Most Popular NSE Strategy" type="tip">
        <p>
          Short strangles (selling OTM call + OTM put) are extremely popular on NSE weekly
          options. Zerodha data shows this is among the top 3 strategies by volume. Sellers
          collect premium and profit when Nifty stays within the range. However, the unlimited
          risk profile means a single 3-sigma event (like the COVID crash of March 2020 when
          Nifty fell 38%) can cause catastrophic losses. Always use defined-risk alternatives
          (iron condors) or strict stop-losses.
        </p>
      </NoteBlock>
    </div>
  )
}
