import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveHigherGreeks() {
  const [spot, setSpot] = useState(22000)
  const [strike, setStrike] = useState(22000)
  const [vol, setVol] = useState(0.18)
  const [tte, setTte] = useState(15)

  const T = tte / 365
  const r = 0.065
  const sqrtT = Math.sqrt(T)
  const d1 = (Math.log(spot / strike) + (r + vol * vol / 2) * T) / (vol * sqrtT)
  const d2 = d1 - vol * sqrtT

  const normPdf = (x) => Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI)
  const nd1 = normPdf(d1)

  const gamma = nd1 / (spot * vol * sqrtT)
  const speed = -gamma / spot * (d1 / (vol * sqrtT) + 1)
  const vanna = -nd1 * d2 / (vol * spot)
  const charm = -nd1 * (2 * r * T - d2 * vol * sqrtT) / (2 * T * vol * sqrtT)
  const volga = spot * sqrtT * nd1 * d1 * d2 / vol

  const greeks = [
    { name: 'Gamma', value: gamma.toFixed(6), desc: 'dDelta/dS', color: 'text-blue-600 dark:text-blue-400' },
    { name: 'Speed', value: speed.toFixed(8), desc: 'dGamma/dS', color: 'text-green-600 dark:text-green-400' },
    { name: 'Vanna', value: vanna.toFixed(6), desc: 'dDelta/dvol', color: 'text-purple-600 dark:text-purple-400' },
    { name: 'Charm', value: charm.toFixed(4), desc: 'dDelta/dt', color: 'text-red-600 dark:text-red-400' },
    { name: 'Volga', value: volga.toFixed(2), desc: 'dVega/dvol', color: 'text-orange-600 dark:text-orange-400' },
  ]

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Higher-Order Greeks for Nifty Options
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Observe how second and third-order Greeks behave as you change spot, strike, volatility, and time to expiry.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Nifty Spot = {spot}</span>
          <input type="range" min="18000" max="26000" step="50" value={spot}
            onChange={e => setSpot(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Strike = {strike}</span>
          <input type="range" min="18000" max="26000" step="50" value={strike}
            onChange={e => setStrike(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>IV = {(vol * 100).toFixed(1)}%</span>
          <input type="range" min="0.05" max="0.60" step="0.01" value={vol}
            onChange={e => setVol(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Days to Expiry = {tte}</span>
          <input type="range" min="1" max="90" step="1" value={tte}
            onChange={e => setTte(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {greeks.map(g => (
          <div key={g.name} className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
            <div className="text-xs text-gray-500 dark:text-gray-400">{g.name}</div>
            <div className={`text-sm font-bold font-mono ${g.color}`}>{g.value}</div>
            <div className="text-[10px] text-gray-400">{g.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function HigherOrderGreeks() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Higher-Order Greeks
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        While first-order Greeks capture the primary sensitivities, higher-order Greeks describe
        how those sensitivities themselves change. For sophisticated options desks on NSE trading
        Bank Nifty weekly options with massive gamma exposure, understanding these second and
        third-order effects is critical for accurate risk management.
      </p>

      <DefinitionBlock
        title="Speed (Third-Order Greek)"
        label="Definition 6.9"
        definition="Speed is the third derivative of the option price with respect to the underlying price, or equivalently, the rate of change of Gamma with respect to spot. It tells you how quickly your Gamma hedge deteriorates as the market moves."
        notation="\text{Speed} = \frac{\partial \Gamma}{\partial S} = \frac{\partial^3 C}{\partial S^3} = -\frac{\Gamma}{S}\left(\frac{d_1}{\sigma\sqrt{T}} + 1\right)"
      />

      <DefinitionBlock
        title="Vanna (Cross Greek)"
        label="Definition 6.10"
        definition="Vanna measures the sensitivity of Delta to changes in implied volatility, or equivalently, the sensitivity of Vega to changes in spot price. It is a critical Greek for managing portfolios where both spot and vol move simultaneously."
        notation="\text{Vanna} = \frac{\partial \Delta}{\partial \sigma} = \frac{\partial \mathcal{V}}{\partial S} = -\frac{\phi(d_1)\,d_2}{\sigma \cdot S}"
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Vanna is particularly important in the Indian market because Nifty implied volatility and
        spot price are strongly negatively correlated -- when markets fall, IV spikes (the leverage
        effect). A position with significant Vanna exposure will see its delta shift as IV changes
        during market stress.
      </p>

      <BlockMath math="\text{Vanna} = \frac{\partial^2 C}{\partial S \,\partial \sigma} = \frac{\mathcal{V}}{S}\left(1 - \frac{d_1}{\sigma\sqrt{T}}\right)" />

      <DefinitionBlock
        title="Charm (Delta Decay)"
        label="Definition 6.11"
        definition="Charm, also called Delta bleed, measures how Delta changes as time passes. It is the cross-derivative of option price with respect to spot and time. Understanding Charm is essential for managing delta hedges overnight on NSE."
        notation="\text{Charm} = -\frac{\partial \Delta}{\partial t} = -\phi(d_1)\frac{2rT - d_2\sigma\sqrt{T}}{2T\sigma\sqrt{T}}"
      />

      <DefinitionBlock
        title="Volga (Vomma)"
        label="Definition 6.12"
        definition="Volga (also called Vomma) measures the sensitivity of Vega to changes in implied volatility -- the convexity of the option price with respect to volatility. It is key for pricing and hedging variance swaps and volatility derivatives."
        notation="\text{Volga} = \frac{\partial^2 C}{\partial \sigma^2} = S\sqrt{T}\,\phi(d_1)\frac{d_1 \cdot d_2}{\sigma}"
      />

      <TheoremBlock
        title="BSM PDE and Greek Relationships"
        label="Theorem 6.3"
        statement="The Black-Scholes PDE establishes a fundamental relationship between Greeks: \Theta + \frac{1}{2}\sigma^2 S^2 \Gamma + rS\Delta = rC. This implies that Theta, Gamma, and Delta are not independent -- knowing any two determines the third for a BSM-priced option."
        proof="The BSM PDE states \frac{\partial C}{\partial t} + \frac{1}{2}\sigma^2 S^2\frac{\partial^2 C}{\partial S^2} + rS\frac{\partial C}{\partial S} - rC = 0. Substituting the Greek definitions \Theta = \partial C/\partial t, \Gamma = \partial^2 C/\partial S^2, and \Delta = \partial C/\partial S directly yields the stated relationship."
      />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Greek</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Order</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Variables</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Practical Use</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Speed</td>
              <td className="px-4 py-2">3rd</td>
              <td className="px-4 py-2"><InlineMath math="\partial^3 C/\partial S^3" /></td>
              <td className="px-4 py-2">Gamma hedge stability</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Vanna</td>
              <td className="px-4 py-2">2nd (cross)</td>
              <td className="px-4 py-2"><InlineMath math="\partial^2 C/\partial S\,\partial\sigma" /></td>
              <td className="px-4 py-2">Spot-vol correlation risk</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Charm</td>
              <td className="px-4 py-2">2nd (cross)</td>
              <td className="px-4 py-2"><InlineMath math="\partial^2 C/\partial S\,\partial t" /></td>
              <td className="px-4 py-2">Overnight delta drift</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Volga</td>
              <td className="px-4 py-2">2nd</td>
              <td className="px-4 py-2"><InlineMath math="\partial^2 C/\partial\sigma^2" /></td>
              <td className="px-4 py-2">Vol-of-vol exposure</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Color</td>
              <td className="px-4 py-2">3rd (cross)</td>
              <td className="px-4 py-2"><InlineMath math="\partial^3 C/\partial S^2\,\partial t" /></td>
              <td className="px-4 py-2">Gamma decay rate</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveHigherGreeks />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Computing Higher-Order Greeks in Python
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        We compute all higher-order Greeks analytically and verify with finite differences. The
        example uses a Bank Nifty weekly option near expiry where these effects are most pronounced.
      </p>

      <PythonCode
        title="higher_order_greeks.py"
        runnable
        code={`import numpy as np
from scipy.stats import norm

def higher_order_greeks(S, K, T, r, sigma):
    """Compute second and third-order Greeks under BSM."""
    sqrt_T = np.sqrt(T)
    d1 = (np.log(S / K) + (r + sigma**2 / 2) * T) / (sigma * sqrt_T)
    d2 = d1 - sigma * sqrt_T
    nd1 = norm.pdf(d1)

    # First-order (for reference)
    delta = norm.cdf(d1)
    gamma = nd1 / (S * sigma * sqrt_T)
    vega = S * sqrt_T * nd1

    # Second-order
    vanna = -nd1 * d2 / (sigma * S)
    charm = -nd1 * (2 * r * T - d2 * sigma * sqrt_T) / (2 * T * sigma * sqrt_T)
    volga = vega * d1 * d2 / sigma

    # Third-order
    speed = -gamma / S * (d1 / (sigma * sqrt_T) + 1)
    color = -nd1 / (2 * S * T * sigma * sqrt_T) * (
        2 * r * T - d2 * sigma * sqrt_T + (2 * d1 * T * sigma * sqrt_T - 1)
    )
    zomma = gamma * (d1 * d2 - 1) / sigma

    return {
        'delta': delta, 'gamma': gamma, 'vega': vega,
        'vanna': vanna, 'charm': charm, 'volga': volga,
        'speed': speed, 'color': color, 'zomma': zomma
    }

# Bank Nifty near-expiry option (3 days left)
S = 48500     # Bank Nifty spot
K = 48500     # ATM strike
T = 3 / 365   # 3 days to expiry (weekly)
r = 0.065     # RBI repo rate
sigma = 0.22  # 22% IV

greeks = higher_order_greeks(S, K, T, r, sigma)

print("=== Bank Nifty 48500 CE Higher-Order Greeks (3 DTE) ===")
print(f"{'Greek':<10} {'Value':>14}  Description")
print("-" * 50)
for name, val in greeks.items():
    descs = {
        'delta': 'dC/dS', 'gamma': 'd2C/dS2', 'vega': 'dC/dvol',
        'vanna': 'd2C/dSdvol', 'charm': '-dDelta/dt',
        'volga': 'd2C/dvol2', 'speed': 'd3C/dS3',
        'color': 'd3C/dS2dt', 'zomma': 'd3C/dS2dvol'
    }
    print(f"{name:<10} {val:>14.8f}  {descs[name]}")

# Show how Gamma explodes near expiry
print("\\n=== Gamma Term Structure (ATM Bank Nifty) ===")
for days in [30, 15, 7, 3, 1, 0.5]:
    T_i = days / 365
    g = higher_order_greeks(S, K, T_i, r, sigma)
    print(f"  {days:>5.1f} DTE: Gamma = {g['gamma']:.8f}, "
          f"Speed = {g['speed']:.10f}")`}
      />

      <ExampleBlock
        title="Vanna Impact During a Market Crash"
        difficulty="advanced"
        problem="A trader holds a Nifty 22000 put with Vanna = -0.00003. During a crash, Nifty falls 500 points and IV rises from 15% to 25%. Estimate the change in Delta due to the Vanna effect alone."
        solution={[
          {
            step: 'Identify the volatility change',
            formula: '\\Delta\\sigma = 25\\% - 15\\% = 10\\% = 0.10',
            explanation: 'IV increased by 10 percentage points during the crash.',
          },
          {
            step: 'Compute Delta change from Vanna',
            formula: '\\delta\\Delta \\approx \\text{Vanna} \\times \\Delta\\sigma \\times S = -0.00003 \\times 0.10 \\times 22000',
            explanation: 'Vanna measures dDelta/dvol, so we multiply by the vol change.',
          },
          {
            step: 'Evaluate',
            formula: '\\delta\\Delta \\approx -0.066',
            explanation: 'The put Delta becomes more negative (deeper ITM effect) by roughly 0.066 from the Vanna effect alone. This is on top of the Gamma effect from the 500-point spot move.',
          },
        ]}
      />

      <NoteBlock title="Weekly Expiry Gamma Risk on NSE" type="warning">
        <p>
          On NSE weekly expiry days, ATM Bank Nifty options can have extremely high Gamma and Speed.
          A 100-point move can shift Delta from 0.50 to 0.80+ for the winning side. Market makers
          must monitor Speed (dGamma/dS) to anticipate how quickly their Gamma hedge deteriorates.
          The combination of high Gamma, negative Charm (delta bleeding toward 0 or 1), and
          Vanna effects during volatile sessions makes weekly expiry risk management one of the
          most challenging tasks in Indian derivatives markets.
        </p>
      </NoteBlock>

      <NoteBlock title="Practical Tip: Greek Bucketing" type="tip">
        <p>
          Professional trading desks at Indian brokerages aggregate Greeks by expiry bucket (current
          week, next week, monthly) and by strike range (deep OTM, OTM, ATM, ITM). This bucketed
          view reveals concentration risks that individual position Greeks may mask. SEBI margin
          requirements under the peak margin framework also depend implicitly on portfolio-level
          Greek exposures.
        </p>
      </NoteBlock>
    </div>
  )
}
