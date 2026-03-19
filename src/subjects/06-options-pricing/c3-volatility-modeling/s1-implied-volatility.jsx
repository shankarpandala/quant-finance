import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveIVSmile() {
  const [atmVol, setAtmVol] = useState(0.18)
  const [skew, setSkew] = useState(-0.12)
  const [kurtosis, setKurtosis] = useState(0.03)

  const strikes = Array.from({ length: 21 }, (_, i) => 19000 + i * 300)
  const spot = 22000
  const ivs = strikes.map(K => {
    const m = Math.log(K / spot)
    return Math.max(0.05, atmVol + skew * m + kurtosis * m * m)
  })

  const maxIV = Math.max(...ivs)
  const minIV = Math.min(...ivs)
  const chartH = 180
  const chartW = 500
  const padL = 50
  const padB = 30

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Nifty 50 Volatility Smile
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust ATM vol, skew, and kurtosis parameters to shape the implied volatility curve.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>ATM Vol = {(atmVol * 100).toFixed(1)}%</span>
          <input type="range" min="0.08" max="0.40" step="0.01" value={atmVol}
            onChange={e => setAtmVol(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Skew = {skew.toFixed(2)}</span>
          <input type="range" min="-0.40" max="0.10" step="0.01" value={skew}
            onChange={e => setSkew(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Kurtosis = {kurtosis.toFixed(2)}</span>
          <input type="range" min="-0.05" max="0.15" step="0.005" value={kurtosis}
            onChange={e => setKurtosis(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox={`0 0 ${chartW + padL + 20} ${chartH + padB + 20}`}
        className="w-full max-w-2xl mx-auto block" aria-label="IV Smile Chart">
        {/* Y axis */}
        <line x1={padL} y1={10} x2={padL} y2={chartH + 10} stroke="#9ca3af" strokeWidth="1" />
        {/* X axis */}
        <line x1={padL} y1={chartH + 10} x2={chartW + padL} y2={chartH + 10} stroke="#9ca3af" strokeWidth="1" />

        {/* Y labels */}
        {[0, 0.25, 0.5, 0.75, 1].map(f => {
          const y = chartH + 10 - f * chartH
          const val = minIV + f * (maxIV - minIV)
          return (
            <text key={f} x={padL - 5} y={y + 3} textAnchor="end"
              className="text-[9px]" fill="#9ca3af">{(val * 100).toFixed(0)}%</text>
          )
        })}

        {/* Spot line */}
        {(() => {
          const spotX = padL + ((spot - strikes[0]) / (strikes[strikes.length - 1] - strikes[0])) * chartW
          return (
            <g>
              <line x1={spotX} y1={10} x2={spotX} y2={chartH + 10} stroke="#6366f1" strokeWidth="1" strokeDasharray="4" />
              <text x={spotX} y={chartH + 25} textAnchor="middle" className="text-[9px]" fill="#6366f1">ATM</text>
            </g>
          )
        })()}

        {/* IV curve */}
        <polyline
          points={strikes.map((K, i) => {
            const x = padL + (i / (strikes.length - 1)) * chartW
            const y = chartH + 10 - ((ivs[i] - minIV) / (maxIV - minIV)) * chartH
            return `${x},${y}`
          }).join(' ')}
          fill="none" stroke="#6366f1" strokeWidth="2.5"
        />

        {/* Data points */}
        {strikes.map((K, i) => {
          const x = padL + (i / (strikes.length - 1)) * chartW
          const y = chartH + 10 - ((ivs[i] - minIV) / (maxIV - minIV)) * chartH
          return <circle key={i} cx={x} cy={y} r="3" fill="#6366f1" />
        })}

        <text x={padL + chartW / 2} y={chartH + padB + 8} textAnchor="middle"
          className="text-[10px]" fill="#9ca3af">Strike Price</text>
      </svg>
    </div>
  )
}

export default function ImpliedVolatility() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Implied Volatility
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Implied volatility (IV) is the market's consensus forecast of future realized volatility,
        extracted from observed option prices. On NSE, where Nifty 50 options are the most liquid
        derivatives in India, IV provides a real-time gauge of market fear and uncertainty. India
        VIX, computed by NSE from Nifty option prices, is the benchmark volatility index.
      </p>

      <DefinitionBlock
        title="Implied Volatility"
        label="Definition 6.15"
        definition="Implied volatility is the value of sigma that, when substituted into the Black-Scholes formula, reproduces the observed market price of the option. It is found by numerically inverting the BSM pricing function."
        notation="C_{\text{market}} = C_{\text{BSM}}(S, K, T, r, \sigma_{\text{imp}}) \implies \sigma_{\text{imp}} = \text{BSM}^{-1}(C_{\text{market}})"
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Since the BSM formula has no closed-form inverse for <InlineMath math="\sigma" />, we use
        numerical root-finding. The most common methods are Newton-Raphson (using Vega as the
        derivative) and Brent's method (bracketing approach). Newton-Raphson converges quickly
        because Vega is always positive for vanilla options:
      </p>

      <BlockMath math="\sigma_{n+1} = \sigma_n - \frac{C_{\text{BSM}}(\sigma_n) - C_{\text{market}}}{\mathcal{V}(\sigma_n)}" />

      <DefinitionBlock
        title="Volatility Smile and Skew"
        label="Definition 6.16"
        definition="The volatility smile is the empirical pattern where implied volatility varies across strike prices for a given expiry. In equity markets like NSE, it typically takes the form of a skew -- OTM puts have higher IV than OTM calls, reflecting demand for downside protection."
        notation="\sigma_{\text{imp}}(K) \neq \text{constant} \quad \text{(contradicting BSM assumptions)}"
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The Nifty 50 volatility surface typically shows a pronounced negative skew: puts struck
        5-10% below spot trade at 3-5 vol points higher than ATM. This reflects institutional
        demand for portfolio protection. During market stress (e.g., COVID crash of March 2020,
        when Nifty fell from 12000 to 7500), the skew steepens dramatically.
      </p>

      <BlockMath math="\sigma_{\text{imp}}(K) \approx \sigma_{\text{ATM}} + \alpha \cdot \ln\!\left(\frac{K}{S}\right) + \beta \cdot \left[\ln\!\left(\frac{K}{S}\right)\right]^2" />

      <TheoremBlock
        title="Monotonicity of BSM Price in Volatility"
        label="Theorem 6.5"
        statement="The Black-Scholes call (and put) price is strictly increasing in \sigma for \sigma > 0 and T > 0. This guarantees that implied volatility, if it exists, is unique."
        proof="The derivative of the BSM call price with respect to \sigma is the Vega: \mathcal{V} = S\sqrt{T}\,\phi(d_1) > 0 for all S, T > 0. Since the price function is continuous and strictly monotone in \sigma, the intermediate value theorem guarantees existence, and monotonicity guarantees uniqueness of the inverse."
      />

      <InteractiveIVSmile />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Computing IV from NSE Option Chain
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Below we implement Newton-Raphson IV solver and apply it to a simulated Nifty option chain
        to construct the volatility smile.
      </p>

      <PythonCode
        title="implied_volatility.py"
        runnable
        code={`import numpy as np
from scipy.stats import norm
from scipy.optimize import brentq

def bsm_call(S, K, T, r, sigma):
    d1 = (np.log(S/K) + (r + sigma**2/2)*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    return S*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)

def bsm_vega(S, K, T, r, sigma):
    d1 = (np.log(S/K) + (r + sigma**2/2)*T) / (sigma*np.sqrt(T))
    return S * np.sqrt(T) * norm.pdf(d1)

def implied_vol_newton(price, S, K, T, r, tol=1e-8, max_iter=100):
    """Newton-Raphson IV solver using Vega."""
    sigma = 0.20  # initial guess
    for i in range(max_iter):
        diff = bsm_call(S, K, T, r, sigma) - price
        vega = bsm_vega(S, K, T, r, sigma)
        if vega < 1e-12:
            break
        sigma -= diff / vega
        if abs(diff) < tol:
            return sigma
    return sigma

def implied_vol_brent(price, S, K, T, r):
    """Brent's method (robust bracketing)."""
    f = lambda sig: bsm_call(S, K, T, r, sig) - price
    return brentq(f, 0.01, 3.0)

# Nifty 50 option chain (simulated market prices)
S = 22000
r = 0.065
T = 30 / 365
strikes = np.arange(20000, 24200, 200)

# Generate prices with a realistic skew
true_ivs = 0.18 - 0.12 * np.log(strikes / S) + 0.03 * np.log(strikes / S)**2
prices = np.array([bsm_call(S, K, T, r, iv) for K, iv in zip(strikes, true_ivs)])

# Recover IV using Newton-Raphson
print("=== Nifty 50 Volatility Smile (30 DTE) ===")
print(f"{'Strike':>8} {'Price':>10} {'IV (Newton)':>12} {'IV (Brent)':>12} {'True IV':>10}")
print("-" * 56)
for K, price, true_iv in zip(strikes, prices, true_ivs):
    if price > 0.50:
        iv_newton = implied_vol_newton(price, S, K, T, r)
        iv_brent = implied_vol_brent(price, S, K, T, r)
        print(f"{K:>8.0f} {price:>10.2f} {iv_newton*100:>11.2f}% "
              f"{iv_brent*100:>11.2f}% {true_iv*100:>9.2f}%")

# India VIX approximation
atm_iv = implied_vol_newton(
    bsm_call(S, S, T, r, 0.18), S, S, T, r
)
print(f"\\nATM Implied Volatility: {atm_iv*100:.2f}%")
print(f"Annualized (India VIX proxy): {atm_iv*100:.2f}%")
print(f"Expected daily move: {S * atm_iv / np.sqrt(252):.0f} points")`}
      />

      <ExampleBlock
        title="Computing IV for a Nifty Put"
        difficulty="intermediate"
        problem="A Nifty 21500 PE (30 DTE) is trading at INR 185. Spot is 22000, risk-free rate is 6.5%. Find the implied volatility using one iteration of Newton-Raphson starting from sigma_0 = 0.20."
        solution={[
          {
            step: 'Convert to call price using put-call parity',
            formula: 'C = P + S - Ke^{-rT} = 185 + 22000 - 21500 \\cdot e^{-0.065 \\times 30/365} \\approx 185 + 22000 - 21464.6 = 720.4',
            explanation: 'Newton-Raphson is typically applied to call prices. Use put-call parity to convert.',
          },
          {
            step: 'Compute BSM call price at sigma_0 = 0.20',
            formula: 'C_{BSM}(0.20) \\approx 673.5',
            explanation: 'Evaluate BSM formula with all parameters and initial vol guess.',
          },
          {
            step: 'Compute Vega at sigma_0',
            formula: '\\mathcal{V}(0.20) = S\\sqrt{T}\\phi(d_1) \\approx 2380',
          },
          {
            step: 'Newton-Raphson update',
            formula: '\\sigma_1 = 0.20 - \\frac{673.5 - 720.4}{2380} = 0.20 + 0.0197 \\approx 0.2197',
            explanation: 'The implied vol is approximately 22.0%, higher than the 20% guess because the put was relatively expensive.',
          },
        ]}
      />

      <NoteBlock title="India VIX" type="tip">
        <p>
          India VIX is computed by NSE using a model-free approach based on Nifty option prices
          across multiple strikes. It represents the market's expectation of 30-day annualized
          volatility. Historically, India VIX ranges from 10-15 in calm markets to 40+ during
          crises. It is mean-reverting, making it useful for timing options strategies. SEBI
          allows trading VIX futures on NSE, though liquidity remains limited compared to
          Nifty options.
        </p>
      </NoteBlock>

      <NoteBlock title="Smile Dynamics" type="warning">
        <p>
          The volatility smile is not static -- it shifts and reshapes as the market moves. Two
          common dynamics are observed on NSE: (1) <strong>Sticky strike</strong>: each strike
          retains its IV as spot moves, and (2) <strong>Sticky delta</strong>: IV follows
          moneyness, so ATM vol stays constant. Real markets exhibit behavior between these
          extremes. Understanding smile dynamics is critical for accurate delta hedging and
          P&L attribution on Nifty option books.
        </p>
      </NoteBlock>
    </div>
  )
}
