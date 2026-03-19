import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveVolArb() {
  const [impliedVol, setImpliedVol] = useState(20)
  const [realizedVol, setRealizedVol] = useState(15)
  const [spot, setSpot] = useState(22000)
  const [daysHeld, setDaysHeld] = useState(15)

  const T = 30 / 365
  const tHeld = daysHeld / 365
  const gamma = 0.00012
  const theta = -12

  const volSpread = impliedVol - realizedVol
  const dailyGammaPnL = 0.5 * gamma * spot * spot * (realizedVol / 100) * (realizedVol / 100) / 252
  const dailyThetaCost = Math.abs(theta)
  const dailyNetPnL = dailyGammaPnL - dailyThetaCost
  const totalPnL = dailyNetPnL * daysHeld

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Volatility Arbitrage P&L Estimator
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust implied vs realized volatility to estimate P&L from delta-hedged option position on Nifty.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Implied Vol = {impliedVol}%</span>
          <input type="range" min="8" max="40" step="1" value={impliedVol}
            onChange={e => setImpliedVol(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Realized Vol = {realizedVol}%</span>
          <input type="range" min="5" max="35" step="1" value={realizedVol}
            onChange={e => setRealizedVol(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Nifty Spot = {spot}</span>
          <input type="range" min="18000" max="26000" step="100" value={spot}
            onChange={e => setSpot(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Days Held = {daysHeld}</span>
          <input type="range" min="1" max="30" step="1" value={daysHeld}
            onChange={e => setDaysHeld(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Vol Spread</div>
          <div className={`text-lg font-bold ${volSpread > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {volSpread > 0 ? '+' : ''}{volSpread}%
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Daily Gamma P&L</div>
          <div className="text-sm font-bold text-blue-600 dark:text-blue-400">{dailyGammaPnL.toFixed(1)}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Daily Theta Cost</div>
          <div className="text-sm font-bold text-red-600 dark:text-red-400">{dailyThetaCost.toFixed(1)}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Est. Total P&L</div>
          <div className={`text-lg font-bold ${totalPnL > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {totalPnL.toFixed(0)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function VolArb() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Volatility Arbitrage
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Volatility arbitrage exploits the difference between implied volatility (priced into
        options) and realized volatility (actual market movement). When IV exceeds expected
        realized vol, a trader sells options and delta-hedges, collecting the volatility risk
        premium. This is the core business model of many proprietary trading desks in India
        trading Nifty and Bank Nifty options on NSE.
      </p>

      <DefinitionBlock
        title="Volatility Risk Premium (VRP)"
        label="Definition 7.10"
        definition="The volatility risk premium is the systematic difference between implied volatility and subsequently realized volatility. In equity markets like NSE, implied volatility typically exceeds realized volatility, compensating option sellers for bearing tail risk."
        notation="\text{VRP} = \sigma_{\text{implied}} - \sigma_{\text{realized}} > 0 \quad \text{(on average)}"
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        On NSE, India VIX (implied vol) has historically traded 3-5 percentage points above
        subsequently realized Nifty volatility. This persistent premium is the source of returns
        for systematic volatility sellers.
      </p>

      <TheoremBlock
        title="Delta-Hedged Option P&L"
        label="Theorem 7.7"
        statement="The P&L of a delta-hedged long option position over an infinitesimal interval dt is: dP\&L = \frac{1}{2}\Gamma S^2[(\Delta S/S)^2 - \sigma_{\text{imp}}^2\,dt]. Over the option's life, the cumulative P&L depends on whether realized volatility exceeds implied volatility."
        proof="From the BSM hedge argument, the option P&L minus the hedge P&L equals \Theta\,dt + \frac{1}{2}\Gamma(\Delta S)^2. Using the BSM relation \Theta = -\frac{1}{2}\Gamma S^2\sigma_{\text{imp}}^2 - rS\Delta + rC (ignoring interest terms for simplicity), the net P&L is \frac{1}{2}\Gamma S^2[(\Delta S/S)^2 - \sigma_{\text{imp}}^2\,dt]."
      />

      <BlockMath math="\text{P\&L}_{\text{hedged}} = \frac{1}{2}\int_0^T \Gamma_t S_t^2 \left(\sigma_{\text{realized},t}^2 - \sigma_{\text{implied}}^2\right) dt" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The sign of the P&L depends on the relationship between realized and implied vol:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Position</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Condition for Profit</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Risk</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Long vol (buy + hedge)</td>
              <td className="px-4 py-2"><InlineMath math="\sigma_R > \sigma_I" /></td>
              <td className="px-4 py-2">Theta drag when vol is low</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Short vol (sell + hedge)</td>
              <td className="px-4 py-2"><InlineMath math="\sigma_R < \sigma_I" /></td>
              <td className="px-4 py-2">Gamma blowup during crashes</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveVolArb />

      <PythonCode
        title="vol_arb_simulation.py"
        runnable
        code={`import numpy as np
from scipy.stats import norm

np.random.seed(42)

def bsm_call_greeks(S, K, T, r, sigma):
    if T <= 1e-8:
        return max(S-K,0), 1.0 if S>K else 0.0, 0.0, 0.0
    d1 = (np.log(S/K) + (r+sigma**2/2)*T)/(sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    price = S*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)
    delta = norm.cdf(d1)
    gamma = norm.pdf(d1)/(S*sigma*np.sqrt(T))
    theta = (-S*norm.pdf(d1)*sigma/(2*np.sqrt(T)) - r*K*np.exp(-r*T)*norm.cdf(d2))/365
    return price, delta, gamma, theta

# Vol arb: Sell ATM Nifty straddle, delta hedge daily
S0 = 22000
K = 22000
T = 30 / 365
r = 0.065
iv = 0.20       # Implied vol at entry (what we sell)
rv = 0.14       # True realized vol (our forecast)
N_days = 30
dt = 1 / 365
lot = 75

# Entry: sell straddle at implied vol
c0, d_c, _, _ = bsm_call_greeks(S0, K, T, r, iv)
p0 = c0 - S0 + K * np.exp(-r*T)
premium = (c0 + p0) * lot

# Simulate GBM path with realized vol
S = S0
hedge_pos = 0  # shares held for delta hedge
cash = premium  # Start with premium collected
straddle_delta = d_c + (d_c - 1)  # call delta + put delta
hedge_pos = -straddle_delta * lot  # hedge straddle delta
cash -= hedge_pos * S  # cost of initial hedge

print("=== Volatility Arbitrage: Short Nifty Straddle + Delta Hedge ===")
print(f"Entry: Sell 22000 straddle @ IV={iv*100:.0f}%, Premium={premium:,.0f}")
print(f"Forecast RV: {rv*100:.0f}%")
print(f"\\n{'Day':>4} {'Nifty':>8} {'Delta':>8} {'Hedge':>8} {'Cash':>12}")
print("-" * 46)

daily_pnls = []
for day in range(1, N_days + 1):
    z = np.random.standard_normal()
    S_new = S * np.exp((r - 0.5*rv**2)*dt + rv*np.sqrt(dt)*z)
    T_rem = (N_days - day) / 365

    if T_rem > 1e-8:
        c, d_c, _, _ = bsm_call_greeks(S_new, K, T_rem, r, iv)
        new_delta = (d_c + (d_c - 1)) * lot
    else:
        new_delta = 0

    # Rebalance hedge
    delta_change = -new_delta - hedge_pos
    cash -= delta_change * S_new
    hedge_pos += delta_change

    # Mark-to-market
    if T_rem > 1e-8:
        c_val, _, _, _ = bsm_call_greeks(S_new, K, T_rem, r, iv)
        p_val = c_val - S_new + K*np.exp(-r*T_rem)
        straddle_val = (c_val + p_val) * lot
    else:
        straddle_val = (max(S_new-K,0) + max(K-S_new,0)) * lot

    total = cash + hedge_pos * S_new - straddle_val
    if day % 5 == 0 or day == N_days:
        print(f"{day:>4} {S_new:>8.0f} {new_delta/lot:>8.3f} {hedge_pos:>8.0f} {total:>12,.0f}")

    S = S_new

# Final settlement
final_payoff = (max(S-K,0) + max(K-S,0)) * lot
total_pnl = cash + hedge_pos * S - final_payoff
print(f"\\nFinal P&L: INR {total_pnl:,.0f}")
print(f"Annualized return: {total_pnl/premium*365/N_days*100:.1f}%")
print(f"\\nInterpretation: Sold at {iv*100:.0f}% IV, realized {rv*100:.0f}%")
print(f"Vol spread of {(iv-rv)*100:.0f}% generated INR {total_pnl:,.0f} profit")`}
      />

      <ExampleBlock
        title="Vol Arb P&L Estimation"
        difficulty="advanced"
        problem="You sell an ATM Nifty straddle at 20% IV and delta-hedge continuously. Realized volatility turns out to be 15%. The average Gamma over the trade was 0.00010 and the average spot was 22000. Estimate the P&L over 30 days."
        solution={[
          {
            step: 'Compute annualized P&L integrand',
            formula: '\\frac{1}{2}\\Gamma S^2(\\sigma_I^2 - \\sigma_R^2) = \\frac{1}{2}(0.0001)(22000^2)(0.04 - 0.0225)',
            explanation: 'The vol arb P&L depends on the difference of squared vols (variances).',
          },
          {
            step: 'Evaluate',
            formula: '= 0.5 \\times 0.0001 \\times 484000000 \\times 0.0175 = 423.5 \\text{ per year}',
          },
          {
            step: 'Scale to 30 days',
            formula: '\\text{P\\&L} \\approx 423.5 \\times \\frac{30}{365} = 34.8 \\text{ per unit}',
            explanation: 'Per Nifty lot (75 units): INR 34.8 x 75 = INR 2,610 profit from the vol spread.',
          },
        ]}
      />

      <NoteBlock title="India VIX as Vol Arb Signal" type="tip">
        <p>
          A simple vol arb signal on NSE: compare India VIX (30-day implied vol) to trailing
          30-day realized volatility of Nifty. When VIX minus RV exceeds its historical median
          (around 3-4%), the VRP is rich and short vol trades are attractive. When the spread is
          negative (RV exceeds VIX), long vol positions are indicated. Track this spread daily
          using data from NSE's website.
        </p>
      </NoteBlock>

      <NoteBlock title="Path Dependency and Discrete Hedging" type="warning">
        <p>
          In practice, delta hedging is done discretely (every few minutes to hourly), not
          continuously. Discrete hedging introduces path-dependent P&L variance even if the total
          realized vol matches your forecast. Additionally, transaction costs from frequent Nifty
          futures rebalancing erode profits. The optimal hedge frequency balances gamma P&L
          capture against transaction costs. Most Indian prop desks hedge at time-based intervals
          (every 15-30 minutes) or delta thresholds (when delta drifts by a preset amount).
        </p>
      </NoteBlock>
    </div>
  )
}
