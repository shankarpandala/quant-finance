import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveGreeks() {
  const [spot, setSpot] = useState(22000)
  const [strike, setStrike] = useState(22000)
  const [vol, setVol] = useState(0.18)
  const [rate, setRate] = useState(0.065)
  const [tte, setTte] = useState(30)

  const T = tte / 365
  const sqrtT = Math.sqrt(T)
  const d1 = (Math.log(spot / strike) + (rate + vol * vol / 2) * T) / (vol * sqrtT)
  const d2 = d1 - vol * sqrtT

  const normPdf = (x) => Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI)
  const normCdf = (x) => {
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741
    const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911
    const sign = x < 0 ? -1 : 1
    const t = 1 / (1 + p * Math.abs(x) / Math.sqrt(2))
    const erf = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x / 2)
    return 0.5 * (1 + sign * erf)
  }

  const delta = normCdf(d1)
  const gamma = normPdf(d1) / (spot * vol * sqrtT)
  const theta = -(spot * normPdf(d1) * vol) / (2 * sqrtT) - rate * strike * Math.exp(-rate * T) * normCdf(d2)
  const thetaDay = theta / 365
  const vega = spot * sqrtT * normPdf(d1) / 100
  const rho = strike * T * Math.exp(-rate * T) * normCdf(d2) / 100

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Nifty 50 Option Greeks Calculator
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust parameters for a Nifty 50 call option to observe how the first-order Greeks change in real time.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Spot Price = {spot}</span>
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
          <span>Risk-Free Rate = {(rate * 100).toFixed(1)}%</span>
          <input type="range" min="0.02" max="0.10" step="0.005" value={rate}
            onChange={e => setRate(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Days to Expiry = {tte}</span>
          <input type="range" min="1" max="180" step="1" value={tte}
            onChange={e => setTte(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {[
          { label: 'Delta', value: delta.toFixed(4), color: 'text-blue-600 dark:text-blue-400' },
          { label: 'Gamma', value: gamma.toFixed(6), color: 'text-green-600 dark:text-green-400' },
          { label: 'Theta/day', value: thetaDay.toFixed(2), color: 'text-red-600 dark:text-red-400' },
          { label: 'Vega', value: vega.toFixed(2), color: 'text-purple-600 dark:text-purple-400' },
          { label: 'Rho', value: rho.toFixed(2), color: 'text-orange-600 dark:text-orange-400' },
        ].map(g => (
          <div key={g.label} className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
            <div className="text-xs text-gray-500 dark:text-gray-400">{g.label}</div>
            <div className={`text-lg font-bold ${g.color}`}>{g.value}</div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
        Moneyness: <InlineMath math={`S/K = ${(spot / strike).toFixed(4)}`} /> --
        {spot > strike ? ' In-the-money' : spot < strike ? ' Out-of-the-money' : ' At-the-money'}
      </p>
    </div>
  )
}

export default function FirstOrderGreeks() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        First-Order Greeks
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The Greeks measure the sensitivity of an option's price to changes in underlying parameters.
        On NSE, where Nifty 50 and Bank Nifty options see massive daily volumes, understanding Greeks
        is essential for every options trader. First-order Greeks are partial derivatives of the
        Black-Scholes option price with respect to each input variable.
      </p>

      <DefinitionBlock
        title="Delta"
        label="Definition 6.4"
        definition="Delta measures the rate of change of the option price with respect to changes in the underlying asset price. For a call option under Black-Scholes, Delta equals N(d_1), where N is the standard normal CDF."
        notation="\Delta_C = \frac{\partial C}{\partial S} = N(d_1), \quad \Delta_P = N(d_1) - 1"
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Delta has a dual interpretation. It represents both the hedge ratio (number of shares needed
        to delta-hedge one option contract) and an approximate probability that the option expires
        in-the-money. On NSE, a Nifty 22000 CE with Delta 0.50 means the option price moves
        roughly <InlineMath math="\pm 0.50" /> points for every <InlineMath math="\pm 1" /> point
        move in the Nifty 50 index.
      </p>

      <BlockMath math="\Delta_{\text{call}} = N(d_1) = N\!\left(\frac{\ln(S/K) + (r + \sigma^2/2)\,T}{\sigma\sqrt{T}}\right)" />

      <DefinitionBlock
        title="Gamma"
        label="Definition 6.5"
        definition="Gamma measures the rate of change of Delta with respect to the underlying price. It is the second derivative of the option price with respect to S. High Gamma indicates Delta is highly sensitive to spot price changes."
        notation="\Gamma = \frac{\partial^2 C}{\partial S^2} = \frac{N'(d_1)}{S\,\sigma\sqrt{T}}"
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Gamma is identical for calls and puts at the same strike. It peaks for at-the-money options
        near expiry. On weekly Nifty expiries (every Thursday on NSE), Gamma can become extremely
        large for ATM options, creating significant hedging challenges for market makers.
      </p>

      <BlockMath math="\Gamma = \frac{\phi(d_1)}{S\,\sigma\sqrt{T}}, \quad \phi(x) = \frac{1}{\sqrt{2\pi}}\,e^{-x^2/2}" />

      <DefinitionBlock
        title="Theta"
        label="Definition 6.6"
        definition="Theta measures the rate of time decay -- how much an option loses in value as one day passes, all else equal. It is almost always negative for long option positions."
        notation="\Theta_C = -\frac{S\,\phi(d_1)\,\sigma}{2\sqrt{T}} - r\,K\,e^{-rT}\,N(d_2)"
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Theta accelerates as expiry approaches. On NSE weekly options, a Bank Nifty ATM option
        might lose 100-200 INR per lot per day with 3 days left, but that decay could jump to 300+
        INR on the final day. Option sellers on Zerodha often exploit this rapid time decay.
      </p>

      <DefinitionBlock
        title="Vega"
        label="Definition 6.7"
        definition="Vega measures sensitivity to changes in implied volatility. It is the partial derivative of option price with respect to volatility sigma. Vega is highest for ATM, long-dated options."
        notation="\mathcal{V} = \frac{\partial C}{\partial \sigma} = S\sqrt{T}\,\phi(d_1)"
      />

      <DefinitionBlock
        title="Rho"
        label="Definition 6.8"
        definition="Rho measures sensitivity to changes in the risk-free interest rate. In India, this is typically the RBI repo rate or the MIBOR rate. Rho is generally the least important Greek for short-dated options."
        notation="\rho_C = K\,T\,e^{-rT}\,N(d_2)"
      />

      <TheoremBlock
        title="Greek Parity Relations"
        label="Theorem 6.2"
        statement="Under BSM, the Greeks of a call and put at the same strike and expiry are related by put-call parity derivatives: \Delta_P = \Delta_C - 1, \quad \Gamma_P = \Gamma_C, \quad \mathcal{V}_P = \mathcal{V}_C, \quad \Theta_P = \Theta_C + rKe^{-rT}, \quad \rho_P = \rho_C - KTe^{-rT}."
        proof="These follow directly from differentiating the put-call parity relation C - P = S - Ke^{-rT} with respect to S, \sigma, t, and r respectively. Since the forward relationship is linear in C and P, partial derivatives distribute across the equation."
      />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Greek</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Measures</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Call</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Put</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Typical Range</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2"><InlineMath math="\Delta" /></td>
              <td className="px-5 py-2">Price sensitivity</td>
              <td className="px-5 py-2">[0, 1]</td>
              <td className="px-5 py-2">[-1, 0]</td>
              <td className="px-5 py-2">ATM ~ 0.50</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2"><InlineMath math="\Gamma" /></td>
              <td className="px-5 py-2">Delta sensitivity</td>
              <td className="px-5 py-2">&ge; 0</td>
              <td className="px-5 py-2">&ge; 0</td>
              <td className="px-5 py-2">Peaks ATM near expiry</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2"><InlineMath math="\Theta" /></td>
              <td className="px-5 py-2">Time decay</td>
              <td className="px-5 py-2">&le; 0</td>
              <td className="px-5 py-2">Usually &le; 0</td>
              <td className="px-5 py-2">Accelerates near expiry</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2"><InlineMath math="\mathcal{V}" /></td>
              <td className="px-5 py-2">Volatility sensitivity</td>
              <td className="px-5 py-2">&ge; 0</td>
              <td className="px-5 py-2">&ge; 0</td>
              <td className="px-5 py-2">Peaks ATM long-dated</td>
            </tr>
            <tr>
              <td className="px-5 py-2"><InlineMath math="\rho" /></td>
              <td className="px-5 py-2">Rate sensitivity</td>
              <td className="px-5 py-2">&ge; 0</td>
              <td className="px-5 py-2">&le; 0</td>
              <td className="px-5 py-2">Small for short-dated</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveGreeks />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Computing Greeks in Python
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Below we compute all first-order Greeks for a Nifty 50 option using both closed-form BSM
        formulas and numerical finite differences for verification.
      </p>

      <PythonCode
        title="first_order_greeks.py"
        runnable
        code={`import numpy as np
from scipy.stats import norm

def bsm_greeks(S, K, T, r, sigma, option_type='call'):
    """Compute all first-order Greeks for a BSM option."""
    sqrt_T = np.sqrt(T)
    d1 = (np.log(S / K) + (r + sigma**2 / 2) * T) / (sigma * sqrt_T)
    d2 = d1 - sigma * sqrt_T

    # Common terms
    nd1 = norm.pdf(d1)
    Nd1 = norm.cdf(d1)
    Nd2 = norm.cdf(d2)

    if option_type == 'call':
        delta = Nd1
        theta = (-S * nd1 * sigma / (2 * sqrt_T)
                 - r * K * np.exp(-r * T) * Nd2)
        rho = K * T * np.exp(-r * T) * Nd2 / 100
    else:
        delta = Nd1 - 1
        theta = (-S * nd1 * sigma / (2 * sqrt_T)
                 + r * K * np.exp(-r * T) * norm.cdf(-d2))
        rho = -K * T * np.exp(-r * T) * norm.cdf(-d2) / 100

    gamma = nd1 / (S * sigma * sqrt_T)
    vega = S * sqrt_T * nd1 / 100
    theta_per_day = theta / 365

    return {
        'delta': delta, 'gamma': gamma,
        'theta': theta_per_day, 'vega': vega, 'rho': rho
    }

# Nifty 50 ATM call option
S = 22000     # Nifty spot
K = 22000     # ATM strike
T = 30 / 365  # 30 days to expiry
r = 0.065     # RBI repo rate
sigma = 0.18  # 18% implied volatility

greeks = bsm_greeks(S, K, T, r, sigma, 'call')

print("=== Nifty 50 22000 CE Greeks (30 DTE) ===")
print(f"Spot: {S:,} | Strike: {K:,} | IV: {sigma*100:.0f}%")
print(f"Delta:     {greeks['delta']:>8.4f}")
print(f"Gamma:     {greeks['gamma']:>8.6f}")
print(f"Theta/day: {greeks['theta']:>8.2f}")
print(f"Vega:      {greeks['vega']:>8.2f}")
print(f"Rho:       {greeks['rho']:>8.2f}")

# Verify with finite differences
h = 1.0
def bsm_price(S, K, T, r, sigma):
    d1 = (np.log(S/K) + (r + sigma**2/2)*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    return S*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)

price = bsm_price(S, K, T, r, sigma)
delta_num = (bsm_price(S+h, K, T, r, sigma) - bsm_price(S-h, K, T, r, sigma)) / (2*h)
gamma_num = (bsm_price(S+h, K, T, r, sigma) - 2*price + bsm_price(S-h, K, T, r, sigma)) / h**2

print(f"\\nOption Premium: INR {price:.2f}")
print(f"\\n--- Finite Difference Verification ---")
print(f"Delta (numerical): {delta_num:.4f}")
print(f"Gamma (numerical): {gamma_num:.6f}")`}
      />

      <ExampleBlock
        title="Delta Hedging a Nifty Call Position"
        difficulty="intermediate"
        problem="A trader on Zerodha sells 10 lots (750 units) of Nifty 22000 CE with Delta = 0.52. How many Nifty futures contracts (lot size 50) should they buy to delta-hedge?"
        solution={[
          {
            step: 'Compute total delta exposure',
            formula: '\\text{Total Delta} = -750 \\times 0.52 = -390',
            explanation: 'Selling calls gives negative delta. Each unit sold contributes -0.52 delta.',
          },
          {
            step: 'Determine futures needed',
            formula: '\\text{Futures lots} = \\frac{390}{50} = 7.8 \\approx 8 \\text{ lots}',
            explanation: 'Each Nifty futures lot has delta of 50 (lot size). Buy 8 lots to offset.',
          },
          {
            step: 'Compute residual delta',
            formula: '\\Delta_{\\text{residual}} = -390 + 8 \\times 50 = +10',
            explanation: 'Small residual positive delta of 10 remains. Perfectly flat hedging is impractical with discrete lot sizes on NSE.',
          },
        ]}
      />

      <NoteBlock title="NSE Market Microstructure" type="tip">
        <p>
          On NSE, Nifty 50 options have a lot size of 75 (revised periodically by SEBI) and weekly
          expiries every Thursday. Bank Nifty lot size is 15. Greeks must be computed per lot for
          practical hedging. Market makers using Zerodha or institutional DMA platforms typically
          rebalance delta hedges every few minutes during volatile sessions like RBI policy
          announcements or Union Budget day.
        </p>
      </NoteBlock>

      <NoteBlock title="Gamma-Theta Tradeoff" type="warning">
        <p>
          There is a fundamental tradeoff between Gamma and Theta. Long Gamma (positive curvature)
          means you profit from large moves but pay time decay. Short Gamma earns Theta but faces
          unlimited risk from jumps. The BSM relationship <InlineMath math="\Theta + \frac{1}{2}\sigma^2 S^2 \Gamma + rS\Delta = rC" /> formalizes
          this tradeoff. Weekly Nifty option sellers must respect this balance carefully.
        </p>
      </NoteBlock>
    </div>
  )
}
