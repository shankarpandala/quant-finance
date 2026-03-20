import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveBSMPricer() {
  const [spot, setSpot] = useState(22000)
  const [strike, setStrike] = useState(22000)
  const [vol, setVol] = useState(15)

  function erf(x) {
    const a = 0.254829592, b = -0.284496736, c = 1.421413741
    const d2 = -1.453152027, e2 = 1.061405429, p = 0.3275911
    const s = Math.sign(x)
    x = Math.abs(x)
    const t2 = 1 / (1 + p * x)
    const y = 1 - (((((e2 * t2 + d2) * t2 + c) * t2 + b) * t2 + a) * t2) * Math.exp(-x * x)
    return s * y
  }

  const T = 0.083
  const r = 0.065
  const v = vol / 100
  const d1 = (Math.log(spot / strike) + (r + v * v / 2) * T) / (v * Math.sqrt(T))
  const d2 = d1 - v * Math.sqrt(T)
  const Nd1 = 0.5 * (1 + erf(d1 / Math.sqrt(2)))
  const Nd2 = 0.5 * (1 + erf(d2 / Math.sqrt(2)))
  const Nmd1 = 1 - Nd1
  const Nmd2 = 1 - Nd2
  const callPrice = spot * Nd1 - strike * Math.exp(-r * T) * Nd2
  const putPrice = strike * Math.exp(-r * T) * Nmd2 - spot * Nmd1
  function erf(x) { const a = 0.254829592, b = -0.284496736, c = 1.421413741, d = -1.453152027, e2 = 1.061405429, p = 0.3275911; const s = Math.sign(x); x = Math.abs(x); const t2 = 1 / (1 + p * x); const y = 1 - (((((e2 * t2 + d) * t2 + c) * t2 + b) * t2 + a) * t2) * Math.exp(-x * x); return s * y }

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: BSM Option Pricer for Nifty 50
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust spot price, strike, volatility, and time to expiry to price Nifty 50 European options.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Nifty Spot: {spot}</span>
          <input type="range" min="18000" max="25000" step="100" value={spot}
            onChange={e => setSpot(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Strike Price: {strike}</span>
          <input type="range" min="18000" max="25000" step="100" value={strike}
            onChange={e => setStrike(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Volatility (%): {vol}</span>
          <input type="range" min="8" max="40" step="1" value={vol}
            onChange={e => setVol(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">

        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <p className="text-xs text-gray-500">Call Price</p>
          <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{typeof callPrice === 'number' ? callPrice.toFixed(2) : callPrice} INR</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <p className="text-xs text-gray-500">Put Price</p>
          <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{typeof putPrice === 'number' ? putPrice.toFixed(2) : putPrice} INR</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <p className="text-xs text-gray-500">d1</p>
          <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{typeof d1 === 'number' ? d1.toFixed(2) : d1} </p>
        </div>
        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <p className="text-xs text-gray-500">d2</p>
          <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{typeof d2 === 'number' ? d2.toFixed(2) : d2} </p>
        </div>
      </div>
    </div>
  )
}

export default function BSMDerivation() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Black-Scholes-Merton Derivation and Risk-Neutral Pricing
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The Black-Scholes-Merton (BSM) model is the cornerstone of options pricing theory. Published simultaneously by Black & Scholes and Merton in 1973, it provides closed-form solutions for European option prices. On the NSE, Nifty 50 and Bank Nifty options are European-style, making BSM directly applicable. Understanding the derivation illuminates the assumptions underlying all modern options pricing.
      </p>

      <DefinitionBlock
        title="Risk-Neutral Pricing"
        label="Definition 6.1"
        definition="Risk-neutral pricing states that the fair price of a derivative is the expected payoff under the risk-neutral measure, discounted at the risk-free rate. Under this measure, all assets earn the risk-free rate on average, regardless of their actual risk. This is not a statement about investor preferences but a mathematical consequence of no-arbitrage."
        notation="Option price: $C_0 = e^{-rT} \\mathbb{E}^{\\mathcal{Q}}[\\max(S_T - K, 0)]$ where $\\mathcal{Q}$ is the risk-neutral measure."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Mathematical Framework
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Under the risk-neutral measure, the stock price follows geometric Brownian motion with drift equal to the risk-free rate:
      </p>

      <BlockMath math="dS_t = rS_t\,dt + \sigma S_t\,dW_t^{\mathcal{Q}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The BSM formula for a European call option is:
      </p>

      <BlockMath math="C(S, t) = S\,\Phi(d_1) - Ke^{-r(T-t)}\,\Phi(d_2)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where the d-terms are:
      </p>

      <BlockMath math="d_1 = \frac{\ln(S/K) + (r + \sigma^2/2)(T-t)}{\sigma\sqrt{T-t}}, \quad d_2 = d_1 - \sigma\sqrt{T-t}" />

      <TheoremBlock
        title="Black-Scholes PDE"
        label="Theorem 6.1"
        statement={<>Any derivative $V(S,t)$ on a non-dividend-paying stock must satisfy: $$\\frac{\\partial V}{\\partial t} + rS\\frac{\\partial V}{\\partial S} + \\frac{1}{2}\\sigma^2 S^2 \\frac{\\partial^2 V}{\\partial S^2} = rV$$ This PDE arises from constructing a riskless portfolio of the option and the underlying (delta-hedging), and invoking no-arbitrage.</>}
      />

      <InteractiveBSMPricer />

      <PythonCode
        title="bsm_nifty_options.py"
        runnable
        code={`import numpy as np
from scipy.stats import norm

def bsm_price(S, K, T, r, sigma, option_type='call'):
    """Black-Scholes-Merton pricing for European options."""
    d1 = (np.log(S / K) + (r + sigma**2 / 2) * T) / (sigma * np.sqrt(T))
    d2 = d1 - sigma * np.sqrt(T)

    if option_type == 'call':
        price = S * norm.cdf(d1) - K * np.exp(-r * T) * norm.cdf(d2)
    else:
        price = K * np.exp(-r * T) * norm.cdf(-d2) - S * norm.cdf(-d1)
    return price, d1, d2

# Nifty 50 European Options Pricing
S = 22000      # Nifty spot
K = 22000      # ATM strike
T = 30 / 365   # 30 days to expiry (monthly)
r = 0.065      # Risk-free rate (91-day T-bill rate)
sigma = 0.14   # 14% implied volatility

call_price, d1, d2 = bsm_price(S, K, T, r, sigma, 'call')
put_price, _, _ = bsm_price(S, K, T, r, sigma, 'put')

print("=== BSM Pricing: Nifty 50 Options ===")
print(f"Spot (S):        {S}")
print(f"Strike (K):      {K}")
print(f"Time (T):        {T:.4f} years ({T*365:.0f} days)")
print(f"Risk-free (r):   {r*100:.1f}%")
print(f"Volatility (σ):  {sigma*100:.1f}%")
print(f"\nd1 = {d1:.4f}")
print(f"d2 = {d2:.4f}")
print(f"N(d1) = {norm.cdf(d1):.4f}")
print(f"N(d2) = {norm.cdf(d2):.4f}")
print(f"\nCall Price: INR {call_price:.2f}")
print(f"Put Price:  INR {put_price:.2f}")

# Verify put-call parity
pcp_rhs = call_price - put_price
pcp_lhs = S - K * np.exp(-r * T)
print(f"\n=== Put-Call Parity Verification ===")
print(f"C - P = {pcp_rhs:.2f}")
print(f"S - K*exp(-rT) = {pcp_lhs:.2f}")
print(f"Difference: {abs(pcp_rhs - pcp_lhs):.6f} (should be ~0)")

# Price across strikes (option chain)
print(f"\n=== Nifty Option Chain (BSM Theoretical) ===")
print(f"{'Strike':<10} {'Call':<10} {'Put':<10} {'Intrinsic(C)':<14} {'Time Val(C)':<12}")
strikes = range(21000, 23100, 200)
for k in strikes:
    c, _, _ = bsm_price(S, k, T, r, sigma, 'call')
    p, _, _ = bsm_price(S, k, T, r, sigma, 'put')
    intrinsic = max(S - k, 0)
    time_val = c - intrinsic
    marker = " <-- ATM" if k == 22000 else ""
    print(f"{k:<10} {c:<10.2f} {p:<10.2f} {intrinsic:<14.2f} {time_val:<12.2f}{marker}")

# NSE lot size and premium
lot_size = 25  # Nifty options lot size
print(f"\n=== NSE Trading Parameters ===")
print(f"Lot size: {lot_size} units")
print(f"Call premium per lot: INR {call_price * lot_size:.2f}")
print(f"Put premium per lot:  INR {put_price * lot_size:.2f}")
print(f"Margin (approx):      INR {S * lot_size * 0.12:.2f}")`}
      />

      <ExampleBlock
        title="BSM Call Pricing for Nifty"
        difficulty="intermediate"
        problem="Price a 1-month Nifty 50 call option with S=22,000, K=22,200, r=6.5%, sigma=15%."
        solution={[
          {
            step: 'Compute d1',
            formula: 'd_1 = \frac{\ln(22000/22200) + (0.065 + 0.0225/2) \times 0.0833}{0.15 \times \sqrt{0.0833}} = \frac{-0.00909 + 0.00635}{0.04330} = -0.0633',
            explanation: '',
          },
          {
            step: 'Compute d2',
            formula: 'd_2 = -0.0633 - 0.04330 = -0.1066',
            explanation: '',
          },
          {
            step: 'Apply BSM formula',
            formula: 'C = 22000 \times \Phi(-0.0633) - 22200 \times e^{-0.065 \times 0.0833} \times \Phi(-0.1066) = 287.5',
            explanation: 'The ATM call is priced at approximately INR 287.50. Per lot (25 units), the premium is INR 7,187.50.',
          },
        ]}
      />

      <NoteBlock title="Important Considerations" type="warning">
        <p>
          BSM assumes constant volatility, continuous trading, no dividends, and no transaction costs. In the Indian market, Nifty options exhibit a volatility smile/skew, dividend-paying stocks have ex-date effects, and STT/brokerage create friction. Despite these limitations, BSM remains the starting point for all options pricing and risk management.
        </p>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          The BSM model provides closed-form prices for European options, making it directly applicable to Nifty 50 and Bank Nifty options on the NSE. The key insight is risk-neutral pricing: the option price equals the discounted expected payoff under the risk-neutral measure, not the real-world measure. Understanding the BSM PDE derivation (via delta-hedging) is essential for grasping why no-arbitrage implies a unique price.
        </p>
      </NoteBlock>
    </div>
  )
}
