import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveDeltaHedge() {
  const [niftySpot, setNiftySpot] = useState(22000)
  const [positionDelta, setPositionDelta] = useState(-390)
  const [positionGamma, setPositionGamma] = useState(-15)
  const [hedgeInstrument, setHedgeInstrument] = useState('futures')

  const futuresLotSize = 75
  const atmOptionDelta = 0.50
  const atmOptionGamma = 0.0001

  let futuresNeeded, deltaAfter, gammaAfter
  if (hedgeInstrument === 'futures') {
    futuresNeeded = Math.round(-positionDelta / futuresLotSize)
    deltaAfter = positionDelta + futuresNeeded * futuresLotSize
    gammaAfter = positionGamma
  } else {
    const optionsForGamma = Math.round(-positionGamma / atmOptionGamma)
    gammaAfter = positionGamma + optionsForGamma * atmOptionGamma
    const optionDeltaContribution = optionsForGamma * atmOptionDelta
    deltaAfter = positionDelta + optionDeltaContribution
    futuresNeeded = Math.round(-deltaAfter / futuresLotSize)
    deltaAfter = deltaAfter + futuresNeeded * futuresLotSize
  }

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Delta-Gamma Hedging Simulator
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Simulate hedging a short Nifty options portfolio using futures and/or options.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Portfolio Delta = {positionDelta}</span>
          <input type="range" min="-1000" max="1000" step="10" value={positionDelta}
            onChange={e => setPositionDelta(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Portfolio Gamma = {positionGamma}</span>
          <input type="range" min="-50" max="50" step="1" value={positionGamma}
            onChange={e => setPositionGamma(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="mb-4 flex gap-4">
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <input type="radio" name="hedge" value="futures" checked={hedgeInstrument === 'futures'}
            onChange={() => setHedgeInstrument('futures')} className="accent-indigo-500" />
          Delta-only (Futures)
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <input type="radio" name="hedge" value="delta-gamma" checked={hedgeInstrument === 'delta-gamma'}
            onChange={() => setHedgeInstrument('delta-gamma')} className="accent-indigo-500" />
          Delta-Gamma (Options + Futures)
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Futures Lots</div>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{futuresNeeded}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Residual Delta</div>
          <div className={`text-lg font-bold ${Math.abs(deltaAfter) < 20 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {deltaAfter.toFixed(0)}
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Residual Gamma</div>
          <div className={`text-lg font-bold ${Math.abs(gammaAfter) < 2 ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
            {gammaAfter.toFixed(2)}
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Margin (approx)</div>
          <div className="text-lg font-bold text-gray-700 dark:text-gray-300">
            {(Math.abs(futuresNeeded) * niftySpot * futuresLotSize * 0.12 / 100000).toFixed(1)}L
          </div>
        </div>
      </div>
    </div>
  )
}

export default function GreekHedging() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Greek Hedging Strategies
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Greek hedging is the practice of constructing offsetting positions to neutralize one or more
        risk sensitivities in an options portfolio. On NSE, where Nifty and Bank Nifty options
        dominate daily trading volumes exceeding 50 million contracts, systematic Greek hedging
        separates professional market makers from retail speculators.
      </p>

      <DefinitionBlock
        title="Delta Hedging"
        label="Definition 6.13"
        definition="Delta hedging involves taking an offsetting position in the underlying asset (or futures) to make the portfolio's net Delta zero. A delta-neutral portfolio is locally insensitive to small changes in the underlying price."
        notation="\Delta_{\text{portfolio}} = \sum_i n_i \Delta_i = 0"
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        On NSE, delta hedging is typically done using Nifty futures (lot size 75) rather than the
        underlying basket. The discrete lot size creates unavoidable rounding errors. A Nifty
        futures contract has Delta equal to its lot size (75), making the hedge ratio calculation:
      </p>

      <BlockMath math="n_{\text{futures}} = -\frac{\Delta_{\text{options portfolio}}}{\text{lot size}} = -\frac{\sum_i n_i \Delta_i}{75}" />

      <DefinitionBlock
        title="Delta-Gamma Hedging"
        label="Definition 6.14"
        definition="Delta-Gamma hedging extends delta hedging by also neutralizing Gamma. Since futures have zero Gamma, an additional option position is needed to flatten Gamma. The two-step process: (1) use options to neutralize Gamma, (2) use futures to neutralize the resulting Delta."
        notation="\text{Solve: } n_{\text{opt}} \Gamma_{\text{opt}} + \Gamma_{\text{portfolio}} = 0, \text{ then } n_{\text{fut}} = -\frac{\Delta_{\text{total}}}{75}"
      />

      <TheoremBlock
        title="Minimum Variance Delta Hedge"
        label="Theorem 6.4"
        statement="Under discrete hedging with rebalancing interval \Delta t, the variance of the hedging error for a delta-hedged short call is approximately: \text{Var}[\text{P\&L}] \approx \frac{1}{2}\Gamma^2 S^4 \sigma^4 (\Delta t)^2 T / \Delta t. The optimal hedging frequency balances hedging error variance against transaction costs."
        proof="From the Taylor expansion of the option price, the hedging error over interval \Delta t is approximately \frac{1}{2}\Gamma(\Delta S)^2 - \Theta\Delta t. Under BSM, E[(\Delta S)^2] = S^2\sigma^2\Delta t, and the variance of (\Delta S)^2 is 2S^4\sigma^4(\Delta t)^2. Integrating over T/\Delta t rebalancing periods gives the result."
      />

      <BlockMath math="\text{Hedge Error} \approx \frac{1}{2}\Gamma\left[(\Delta S)^2 - \sigma^2 S^2 \Delta t\right]" />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Vega Hedging and Vol Surface Risk
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Vega hedging neutralizes exposure to parallel shifts in implied volatility. On NSE, this
        requires trading options against options since the underlying and futures have zero Vega.
        A common approach is to buy/sell options at a different strike or expiry to offset Vega
        while managing the resulting Delta with futures.
      </p>

      <BlockMath math="\begin{pmatrix} n_1 \\ n_2 \end{pmatrix} = -\begin{pmatrix} \Gamma_1 & \Gamma_2 \\ \mathcal{V}_1 & \mathcal{V}_2 \end{pmatrix}^{-1} \begin{pmatrix} \Gamma_{\pi} \\ \mathcal{V}_{\pi} \end{pmatrix}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The matrix equation above solves for the quantities <InlineMath math="n_1, n_2" /> of two
        hedging options needed to simultaneously neutralize portfolio Gamma (<InlineMath math="\Gamma_\pi" />)
        and Vega (<InlineMath math="\mathcal{V}_\pi" />). After this, futures neutralize residual Delta.
      </p>

      <InteractiveDeltaHedge />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Hedge Type</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Instruments</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Greeks Neutralized</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Residual Risk</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Delta hedge</td>
              <td className="px-4 py-2">Futures</td>
              <td className="px-4 py-2"><InlineMath math="\Delta" /></td>
              <td className="px-4 py-2">Gamma, Vega, Theta</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Delta-Gamma</td>
              <td className="px-4 py-2">Options + Futures</td>
              <td className="px-4 py-2"><InlineMath math="\Delta, \Gamma" /></td>
              <td className="px-4 py-2">Vega, Theta, higher-order</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Delta-Gamma-Vega</td>
              <td className="px-4 py-2">2+ Options + Futures</td>
              <td className="px-4 py-2"><InlineMath math="\Delta, \Gamma, \mathcal{V}" /></td>
              <td className="px-4 py-2">Theta, Vanna, Volga</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Full surface</td>
              <td className="px-4 py-2">Multiple strikes/expiries</td>
              <td className="px-4 py-2">All major Greeks</td>
              <td className="px-4 py-2">Model risk, liquidity</td>
            </tr>
          </tbody>
        </table>
      </div>

      <PythonCode
        title="greek_hedging_simulator.py"
        runnable
        code={`import numpy as np
from scipy.stats import norm

def bsm_call(S, K, T, r, sigma):
    d1 = (np.log(S/K) + (r + sigma**2/2)*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    return S*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)

def greeks(S, K, T, r, sigma):
    sqrt_T = np.sqrt(T)
    d1 = (np.log(S/K) + (r + sigma**2/2)*T) / (sigma*sqrt_T)
    d2 = d1 - sigma*sqrt_T
    delta = norm.cdf(d1)
    gamma = norm.pdf(d1) / (S * sigma * sqrt_T)
    theta = (-S*norm.pdf(d1)*sigma/(2*sqrt_T) - r*K*np.exp(-r*T)*norm.cdf(d2)) / 365
    vega = S * sqrt_T * norm.pdf(d1) / 100
    return delta, gamma, theta, vega

# Portfolio: Short 10 lots of Nifty 22000 CE
S, K, T, r, sigma = 22000, 22000, 30/365, 0.065, 0.18
lot_size = 75
n_lots = -10
n_units = n_lots * lot_size

d, g, th, v = greeks(S, K, T, r, sigma)
port_delta = n_units * d
port_gamma = n_units * g
port_theta = n_units * th
port_vega = n_units * v

print("=== Short 10 lots Nifty 22000 CE Portfolio ===")
print(f"Portfolio Delta: {port_delta:>10.1f}")
print(f"Portfolio Gamma: {port_gamma:>10.4f}")
print(f"Portfolio Theta: {port_theta:>10.2f} INR/day")
print(f"Portfolio Vega:  {port_vega:>10.2f}")

# Step 1: Delta hedge with futures
futures_lots = round(-port_delta / lot_size)
residual_delta = port_delta + futures_lots * lot_size
print(f"\\n--- Delta Hedge ---")
print(f"Buy {futures_lots} Nifty futures lots")
print(f"Residual Delta: {residual_delta:.1f}")
print(f"Residual Gamma: {port_gamma:.4f} (unchanged!)")

# Step 2: Delta-Gamma hedge using ATM options + futures
K2 = 22500  # Use a different strike for gamma hedge
d2, g2, th2, v2 = greeks(S, K2, T, r, sigma)
opt_lots = round(-port_gamma / (g2 * lot_size))
new_delta = port_delta + opt_lots * lot_size * d2
new_gamma = port_gamma + opt_lots * lot_size * g2
adj_futures = round(-new_delta / lot_size)
final_delta = new_delta + adj_futures * lot_size

print(f"\\n--- Delta-Gamma Hedge ---")
print(f"Buy {opt_lots} lots of 22500 CE (Gamma source)")
print(f"Buy {adj_futures} lots of futures (Delta adjust)")
print(f"Final Delta: {final_delta:.1f}")
print(f"Final Gamma: {new_gamma:.4f}")

# Simulate P&L under spot move
print(f"\\n--- P&L Comparison: Nifty moves +300 ---")
new_S = S + 300
p_unhedged = n_units * (bsm_call(new_S, K, T, r, sigma) - bsm_call(S, K, T, r, sigma))
p_delta_hedged = p_unhedged + futures_lots * lot_size * 300
p_dg_hedged = (p_unhedged + opt_lots * lot_size *
    (bsm_call(new_S, K2, T, r, sigma) - bsm_call(S, K2, T, r, sigma))
    + adj_futures * lot_size * 300)
print(f"Unhedged P&L:      INR {p_unhedged:>10,.0f}")
print(f"Delta-hedged P&L:  INR {p_delta_hedged:>10,.0f}")
print(f"DG-hedged P&L:     INR {p_dg_hedged:>10,.0f}")`}
      />

      <ExampleBlock
        title="Delta-Gamma Hedging a Short Straddle"
        difficulty="advanced"
        problem="A trader sells 5 lots of Nifty 22000 straddle (CE + PE). The portfolio has Delta = +50, Gamma = -8.5, Vega = -450. Using ATM 22000 CE (Delta = 0.52, Gamma = 0.00012, Vega = 62) and Nifty futures, construct a delta-gamma hedge."
        solution={[
          {
            step: 'Neutralize Gamma with options',
            formula: 'n_{\\text{opt}} = \\frac{-\\Gamma_{\\pi}}{\\Gamma_{\\text{opt}} \\times 75} = \\frac{8.5}{0.00012 \\times 75} = 944 \\approx 13 \\text{ lots}',
            explanation: 'Buy 13 lots of 22000 CE to offset negative Gamma. Each lot contributes 75 x 0.00012 = 0.009 Gamma.',
          },
          {
            step: 'Compute new Delta after Gamma hedge',
            formula: '\\Delta_{\\text{new}} = 50 + 13 \\times 75 \\times 0.52 = 50 + 507 = 557',
            explanation: 'The options purchased for Gamma bring additional positive Delta.',
          },
          {
            step: 'Hedge residual Delta with futures',
            formula: 'n_{\\text{fut}} = -\\frac{557}{75} = -7.4 \\approx -7 \\text{ lots}',
            explanation: 'Sell 7 lots of Nifty futures to neutralize the remaining Delta.',
          },
        ]}
      />

      <NoteBlock title="SEBI Margin Impact" type="warning">
        <p>
          Under SEBI peak margin rules, hedged positions receive margin benefits. A delta-hedged
          options position on NSE receives up to 70% margin reduction compared to naked positions.
          However, the benefit is computed at the portfolio level using SPAN margining. Traders on
          Zerodha and other brokers should note that margin benefits apply only if hedge and
          hedged positions are in the same underlying and the same account segment.
        </p>
      </NoteBlock>

      <NoteBlock title="Rebalancing Frequency" type="tip">
        <p>
          The optimal delta hedging frequency depends on the Gamma-to-transaction-cost ratio. On
          NSE, with Zerodha charging zero brokerage on equity delivery but INR 20 per futures order,
          high-frequency rebalancing is feasible. Professional desks typically rebalance when Delta
          drifts beyond a threshold (e.g., 50 Nifty points worth of Delta) rather than at fixed
          time intervals. This threshold-based approach minimizes unnecessary trades while keeping
          risk bounded.
        </p>
      </NoteBlock>
    </div>
  )
}
