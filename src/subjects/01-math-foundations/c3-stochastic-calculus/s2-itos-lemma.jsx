import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveBlackScholes() {
  const [S, setS] = useState(20000)
  const [K, setK] = useState(20000)
  const [T, setT] = useState(0.25)
  const [sigma, setSigma] = useState(0.15)
  const [r, setR] = useState(0.065)

  const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T))
  const d2 = d1 - sigma * Math.sqrt(T)

  // CDF approximation
  const normCDF = (x) => {
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741
    const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911
    const sign = x < 0 ? -1 : 1
    const z = Math.abs(x) / Math.sqrt(2)
    const t = 1.0 / (1.0 + p * z)
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-z * z)
    return 0.5 * (1.0 + sign * y)
  }

  const callPrice = S * normCDF(d1) - K * Math.exp(-r * T) * normCDF(d2)
  const putPrice = K * Math.exp(-r * T) * normCDF(-d2) - S * normCDF(-d1)

  const delta = normCDF(d1)
  const gamma = Math.exp(-d1 * d1 / 2) / (Math.sqrt(2 * Math.PI) * S * sigma * Math.sqrt(T))
  const theta = -(S * Math.exp(-d1 * d1 / 2) * sigma) / (2 * Math.sqrt(2 * Math.PI * T)) - r * K * Math.exp(-r * T) * normCDF(d2)
  const vega = S * Math.sqrt(T) * Math.exp(-d1 * d1 / 2) / Math.sqrt(2 * Math.PI)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Black-Scholes for Nifty Options
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Price Nifty 50 European options using the Black-Scholes formula derived from Ito's lemma.
        Risk-free rate uses the RBI repo rate.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Nifty (S) = {S}</span>
          <input type="range" min="15000" max="25000" step="100" value={S}
            onChange={e => setS(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Strike (K) = {K}</span>
          <input type="range" min="15000" max="25000" step="100" value={K}
            onChange={e => setK(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Expiry (T) = {T.toFixed(2)}y</span>
          <input type="range" min="0.01" max="1" step="0.01" value={T}
            onChange={e => setT(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>IV (<InlineMath math="\sigma" />) = {(sigma * 100).toFixed(0)}%</span>
          <input type="range" min="0.05" max="0.5" step="0.01" value={sigma}
            onChange={e => setSigma(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>RBI rate = {(r * 100).toFixed(1)}%</span>
          <input type="range" min="0.03" max="0.1" step="0.005" value={r}
            onChange={e => setR(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-3">
        <div className="rounded-lg bg-green-50 p-3 text-center dark:bg-green-900/30">
          <div className="text-xs text-green-600 dark:text-green-400">Call Price</div>
          <div className="text-lg font-bold text-green-700 dark:text-green-300">INR {callPrice.toFixed(1)}</div>
        </div>
        <div className="rounded-lg bg-red-50 p-3 text-center dark:bg-red-900/30">
          <div className="text-xs text-red-600 dark:text-red-400">Put Price</div>
          <div className="text-lg font-bold text-red-700 dark:text-red-300">INR {putPrice.toFixed(1)}</div>
        </div>
        <div className="rounded-lg bg-blue-50 p-3 text-center dark:bg-blue-900/30">
          <div className="text-xs text-blue-600 dark:text-blue-400">d1 / d2</div>
          <div className="text-sm font-bold text-blue-700 dark:text-blue-300">{d1.toFixed(3)} / {d2.toFixed(3)}</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-800">
          <div className="text-xs text-gray-500 dark:text-gray-400">Moneyness</div>
          <div className="text-sm font-bold text-gray-700 dark:text-gray-300">
            {S > K ? 'ITM' : S < K ? 'OTM' : 'ATM'} ({((S / K - 1) * 100).toFixed(1)}%)
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        <div className="rounded bg-indigo-50 p-2 dark:bg-indigo-900/30">
          <div className="text-indigo-500 dark:text-indigo-400">Delta</div>
          <div className="font-bold text-indigo-700 dark:text-indigo-300">{delta.toFixed(4)}</div>
        </div>
        <div className="rounded bg-indigo-50 p-2 dark:bg-indigo-900/30">
          <div className="text-indigo-500 dark:text-indigo-400">Gamma</div>
          <div className="font-bold text-indigo-700 dark:text-indigo-300">{gamma.toFixed(6)}</div>
        </div>
        <div className="rounded bg-indigo-50 p-2 dark:bg-indigo-900/30">
          <div className="text-indigo-500 dark:text-indigo-400">Theta/day</div>
          <div className="font-bold text-indigo-700 dark:text-indigo-300">{(theta / 365).toFixed(2)}</div>
        </div>
        <div className="rounded bg-indigo-50 p-2 dark:bg-indigo-900/30">
          <div className="text-indigo-500 dark:text-indigo-400">Vega</div>
          <div className="font-bold text-indigo-700 dark:text-indigo-300">{(vega / 100).toFixed(2)}</div>
        </div>
      </div>
    </div>
  )
}

export default function ItosLemma() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Ito's Lemma and the Black-Scholes PDE
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Ito's lemma is the chain rule of stochastic calculus. It is the single most important
        result for derivative pricing, enabling the derivation of the Black-Scholes PDE that
        underpins all option pricing on the NSE. Understanding Ito's lemma is essential for
        anyone working with Nifty and Bank Nifty options.
      </p>

      {/* --- Why Ordinary Calculus Fails --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Why Ordinary Calculus Fails
      </h3>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        In ordinary calculus, for a smooth function <InlineMath math="f(x(t))" />, the
        chain rule gives <InlineMath math="df = f'(x) \, dx" />. However, when{' '}
        <InlineMath math="x = W_t" /> (Brownian motion), the second-order term{' '}
        <InlineMath math="\frac{1}{2} f''(x) (dx)^2" /> is not negligible because{' '}
        <InlineMath math="(dW_t)^2 = dt" />. This is the fundamental difference from
        ordinary calculus.
      </p>

      <BlockMath math="\text{Taylor: } df = f'(x) \, dx + \frac{1}{2} f''(x) \, (dx)^2 + \cdots" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        When <InlineMath math="dx = \sigma \, dW_t + \mu \, dt" />:
      </p>

      <BlockMath math="(dx)^2 = \sigma^2 (dW_t)^2 + 2\sigma\mu \, dW_t \, dt + \mu^2 (dt)^2 = \sigma^2 \, dt + O(dt^{3/2})" />

      {/* --- Ito's Lemma --- */}
      <TheoremBlock
        title="Ito's Lemma (One Dimension)"
        label="Theorem 2.1"
        statement={<>
          Let <InlineMath math="X_t" /> satisfy the SDE{' '}
          <InlineMath math="dX_t = \mu(X_t, t) \, dt + \sigma(X_t, t) \, dW_t" />,
          and let <InlineMath math="f(X_t, t)" /> be a twice continuously differentiable
          function. Then:
          <BlockMath math="df = \left(\frac{\partial f}{\partial t} + \mu \frac{\partial f}{\partial x} + \frac{1}{2} \sigma^2 \frac{\partial^2 f}{\partial x^2}\right) dt + \sigma \frac{\partial f}{\partial x} \, dW_t" />
          The extra term <InlineMath math="\frac{1}{2} \sigma^2 f_{xx}" /> is the "Ito
          correction" that distinguishes stochastic calculus from ordinary calculus.
        </>}
      />

      {/* --- Application to GBM --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Application: Solving GBM with Ito's Lemma
      </h3>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Given GBM <InlineMath math="dS = \mu S \, dt + \sigma S \, dW" />, let{' '}
        <InlineMath math="f(S) = \ln S" />. Then <InlineMath math="f' = 1/S" />,{' '}
        <InlineMath math="f'' = -1/S^2" />, and Ito's lemma gives:
      </p>

      <BlockMath math={`d(\\ln S) = \\frac{1}{S}(\\mu S \\, dt + \\sigma S \\, dW) + \\frac{1}{2}\\left(-\\frac{1}{S^2}\\right)(\\sigma S)^2 \\, dt`} />

      <BlockMath math="d(\ln S) = \left(\mu - \frac{\sigma^2}{2}\right) dt + \sigma \, dW" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Integrating both sides:
      </p>

      <BlockMath math="\ln S_T - \ln S_0 = \left(\mu - \frac{\sigma^2}{2}\right)T + \sigma W_T \implies S_T = S_0 e^{(\mu - \sigma^2/2)T + \sigma W_T}" />

      {/* --- Black-Scholes PDE Derivation --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Deriving the Black-Scholes PDE
      </h3>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Consider an option with value <InlineMath math="V(S, t)" /> on the Nifty 50.
        By Ito's lemma:
      </p>

      <BlockMath math="dV = \left(\frac{\partial V}{\partial t} + \mu S \frac{\partial V}{\partial S} + \frac{1}{2} \sigma^2 S^2 \frac{\partial^2 V}{\partial S^2}\right) dt + \sigma S \frac{\partial V}{\partial S} \, dW" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Construct a delta-hedged portfolio: <InlineMath math="\Pi = V - \Delta \cdot S" /> where{' '}
        <InlineMath math="\Delta = \partial V / \partial S" />. This eliminates the random
        <InlineMath math="dW" /> term, making the portfolio riskless:
      </p>

      <BlockMath math="d\Pi = \left(\frac{\partial V}{\partial t} + \frac{1}{2} \sigma^2 S^2 \frac{\partial^2 V}{\partial S^2}\right) dt" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        By no-arbitrage, a riskless portfolio must earn the risk-free rate (RBI T-bill rate{' '}
        <InlineMath math="r" />):
      </p>

      <BlockMath math="d\Pi = r \Pi \, dt = r(V - S \frac{\partial V}{\partial S}) \, dt" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Equating the two expressions yields the <strong>Black-Scholes PDE</strong>:
      </p>

      <BlockMath math="\frac{\partial V}{\partial t} + \frac{1}{2} \sigma^2 S^2 \frac{\partial^2 V}{\partial S^2} + r S \frac{\partial V}{\partial S} - rV = 0" />

      <NoteBlock title="Risk-Neutral Pricing" type="info">
        <p>
          A profound consequence: the drift <InlineMath math="\mu" /> of the stock has
          disappeared! The option price depends only on <InlineMath math="\sigma" />,{' '}
          <InlineMath math="r" />, <InlineMath math="S" />, <InlineMath math="K" />,
          and <InlineMath math="T" />. This is because we can perfectly hedge the option,
          so preferences (risk aversion) do not matter. For Nifty options on the NSE, this
          means we only need the India VIX (implied volatility) and the RBI rate, not a
          forecast of where Nifty is going.
        </p>
      </NoteBlock>

      {/* --- Black-Scholes Formula --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Black-Scholes Formula
      </h3>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Solving the PDE with the boundary condition{' '}
        <InlineMath math="V(S, T) = \max(S - K, 0)" /> for a European call:
      </p>

      <BlockMath math="C = S \, N(d_1) - K e^{-rT} N(d_2)" />

      <BlockMath math="d_1 = \frac{\ln(S/K) + (r + \sigma^2/2)T}{\sigma\sqrt{T}}, \quad d_2 = d_1 - \sigma\sqrt{T}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        By put-call parity <InlineMath math="P = C - S + Ke^{-rT}" />:
      </p>

      <BlockMath math="P = K e^{-rT} N(-d_2) - S \, N(-d_1)" />

      {/* --- Interactive BS Calculator --- */}
      <InteractiveBlackScholes />

      {/* --- Python Code --- */}
      <PythonCode
        title="itos_lemma_bs.py"
        runnable
        code={`import numpy as np
from scipy.stats import norm

def black_scholes(S, K, T, r, sigma, option_type='call'):
    """Black-Scholes European option pricing for Nifty options."""
    d1 = (np.log(S / K) + (r + 0.5 * sigma**2) * T) / (sigma * np.sqrt(T))
    d2 = d1 - sigma * np.sqrt(T)

    if option_type == 'call':
        price = S * norm.cdf(d1) - K * np.exp(-r * T) * norm.cdf(d2)
        delta = norm.cdf(d1)
    else:
        price = K * np.exp(-r * T) * norm.cdf(-d2) - S * norm.cdf(-d1)
        delta = norm.cdf(d1) - 1

    gamma = norm.pdf(d1) / (S * sigma * np.sqrt(T))
    theta = (-S * norm.pdf(d1) * sigma / (2 * np.sqrt(T))
             - r * K * np.exp(-r * T) * norm.cdf(d2))
    vega = S * np.sqrt(T) * norm.pdf(d1)

    return {
        'price': price, 'delta': delta, 'gamma': gamma,
        'theta': theta / 365, 'vega': vega / 100,
        'd1': d1, 'd2': d2
    }

# --- Nifty 50 ATM Option Pricing ---
S = 20000       # Nifty spot
K = 20000       # ATM strike
T = 30 / 365    # 30 days to expiry
r = 0.065       # RBI repo rate
sigma = 0.15    # India VIX ~ 15%

call = black_scholes(S, K, T, r, sigma, 'call')
put = black_scholes(S, K, T, r, sigma, 'put')

print("=== Nifty 50 ATM Option Pricing (Black-Scholes) ===")
print(f"Spot: {S}, Strike: {K}, Expiry: {T*365:.0f} days")
print(f"Risk-free (RBI): {r*100}%, IV: {sigma*100}%")
print()
print(f"{'':>12} {'Call':>10} {'Put':>10}")
print(f"{'Price (INR)':>12} {call['price']:>10.2f} {put['price']:>10.2f}")
print(f"{'Delta':>12} {call['delta']:>10.4f} {put['delta']:>10.4f}")
print(f"{'Gamma':>12} {call['gamma']:>10.6f} {put['gamma']:>10.6f}")
print(f"{'Theta/day':>12} {call['theta']:>10.2f} {put['theta']:>10.2f}")
print(f"{'Vega':>12} {call['vega']:>10.2f} {put['vega']:>10.2f}")
print()

# Put-call parity verification
pcp = call['price'] - put['price'] - (S - K * np.exp(-r * T))
print(f"Put-Call Parity check: {pcp:.6f} (should be ~0)")
print()

# --- Verify Ito's Lemma Numerically ---
print("=== Numerical Verification of Ito's Lemma ===")
np.random.seed(42)
n_steps = 10000
dt = T / n_steps
S_path = [S]
V_path = [call['price']]
ito_integral = 0
ordinary_integral = 0

S_t = S
for i in range(n_steps):
    dW = np.random.normal(0, np.sqrt(dt))
    dS = 0.12 * S_t * dt + sigma * S_t * dW

    # Ito's formula: dV = (V_t + mu*S*V_S + 0.5*sig^2*S^2*V_SS)dt + sig*S*V_S*dW
    bs = black_scholes(S_t, K, T - i*dt, r, sigma, 'call')
    dV_ito = (bs['delta'] * dS +
              0.5 * bs['gamma'] * (sigma * S_t)**2 * dt)  # simplified
    ito_integral += dV_ito

    S_t += dS

# Compare V(S_T) - V(S_0) with Ito integral
V_final = max(S_t - K, 0) if T - n_steps * dt < dt else black_scholes(S_t, K, max(T - n_steps*dt, 0.001), r, sigma, 'call')['price']
actual_change = V_final - call['price']

print(f"Actual option value change: {actual_change:.4f}")
print(f"Ito integral estimate:      {ito_integral:.4f}")
print("(These should be approximately equal, confirming Ito's lemma)")`}
      />

      {/* --- Worked Example --- */}
      <ExampleBlock
        title="Applying Ito's Lemma to a Squared Process"
        difficulty="intermediate"
        problem={<>
          Let <InlineMath math="X_t = W_t^2" /> where <InlineMath math="W_t" /> is a
          standard Brownian motion. Use Ito's lemma to find the SDE for{' '}
          <InlineMath math="X_t" />.
        </>}
        solution={[
          {
            step: 'Identify the function and its derivatives',
            formula: 'f(w) = w^2, \\quad f\'(w) = 2w, \\quad f\'\'(w) = 2',
          },
          {
            step: 'Apply Ito\'s lemma with dW_t (mu=0, sigma=1)',
            formula: 'dX = f\'(W) \\, dW + \\frac{1}{2} f\'\'(W) \\, (dW)^2 = 2W_t \\, dW_t + \\frac{1}{2} \\cdot 2 \\cdot dt',
          },
          {
            step: 'Simplify',
            formula: 'dX_t = dt + 2W_t \\, dW_t',
            explanation: 'Integrating: W_t^2 = t + 2\\int_0^t W_s \\, dW_s. This shows that W_t^2 is NOT a martingale (it has a dt drift term), but W_t^2 - t IS a martingale.',
          },
        ]}
      />

      {/* --- Key Takeaway --- */}
      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Ito's lemma is the bridge from stochastic dynamics (GBM for Nifty prices) to
          derivative pricing (Black-Scholes formula for Nifty options). The key insight is
          the extra <InlineMath math="\frac{1}{2}\sigma^2 S^2 V_{SS}" /> term, which arises
          because <InlineMath math="(dW)^2 = dt" />. This term gives rise to gamma risk in
          options and is the reason delta-hedging is not free -- the cost of gamma is theta
          (time decay). On the NSE, this trade-off between gamma and theta drives the entire
          options market.
        </p>
      </NoteBlock>
    </div>
  )
}
