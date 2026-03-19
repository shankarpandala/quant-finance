import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveHeston() {
  const [kappa, setKappa] = useState(2.0)
  const [theta, setTheta] = useState(0.04)
  const [xi, setXi] = useState(0.3)
  const [rho, setRho] = useState(-0.7)
  const [v0, setV0] = useState(0.04)

  const fellerCondition = 2 * kappa * theta > xi * xi
  const meanRevHalfLife = Math.log(2) / kappa
  const longTermVol = Math.sqrt(theta) * 100

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Heston Model Parameters
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Explore how Heston parameters affect the variance dynamics and Feller condition.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math="\kappa" /> (mean reversion) = {kappa.toFixed(2)}</span>
          <input type="range" min="0.1" max="10" step="0.1" value={kappa}
            onChange={e => setKappa(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math="\theta" /> (long-run var) = {theta.toFixed(3)}</span>
          <input type="range" min="0.005" max="0.15" step="0.005" value={theta}
            onChange={e => setTheta(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math="\xi" /> (vol of vol) = {xi.toFixed(2)}</span>
          <input type="range" min="0.05" max="1.0" step="0.05" value={xi}
            onChange={e => setXi(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math="\rho" /> (correlation) = {rho.toFixed(2)}</span>
          <input type="range" min="-0.95" max="0.95" step="0.05" value={rho}
            onChange={e => setRho(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math="v_0" /> (initial var) = {v0.toFixed(3)}</span>
          <input type="range" min="0.005" max="0.15" step="0.005" value={v0}
            onChange={e => setV0(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Feller Condition</div>
          <div className={`text-sm font-bold ${fellerCondition ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {fellerCondition ? 'SATISFIED' : 'VIOLATED'}
          </div>
          <div className="text-[10px] text-gray-400">
            {(2 * kappa * theta).toFixed(3)} {fellerCondition ? '>' : '<='} {(xi * xi).toFixed(3)}
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Long-Term Vol</div>
          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{longTermVol.toFixed(1)}%</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Half-Life</div>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{(meanRevHalfLife * 252).toFixed(0)}d</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Current Vol</div>
          <div className="text-lg font-bold text-orange-600 dark:text-orange-400">{(Math.sqrt(v0) * 100).toFixed(1)}%</div>
        </div>
      </div>
    </div>
  )
}

export default function StochasticVol() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Stochastic Volatility Models
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Stochastic volatility models treat volatility itself as a random process, capturing the
        empirical fact that Nifty 50 volatility clusters, mean-reverts, and is correlated with
        price movements. The Heston model (1993) is the workhorse of the industry, offering
        a semi-analytical pricing formula while generating realistic volatility smiles.
      </p>

      <DefinitionBlock
        title="Heston Stochastic Volatility Model"
        label="Definition 6.18"
        definition="The Heston model specifies the asset price and its variance as a system of coupled SDEs. The variance follows a CIR (Cox-Ingersoll-Ross) mean-reverting square-root process."
        notation="dS_t = rS_t\,dt + \sqrt{v_t}\,S_t\,dW_t^S, \quad dv_t = \kappa(\theta - v_t)\,dt + \xi\sqrt{v_t}\,dW_t^v"
      />

      <BlockMath math="\begin{aligned} dS_t &= r\,S_t\,dt + \sqrt{v_t}\,S_t\,dW_t^S \\ dv_t &= \kappa(\theta - v_t)\,dt + \xi\sqrt{v_t}\,dW_t^v \\ \text{Corr}(dW^S, dW^v) &= \rho\,dt \end{aligned}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The five Heston parameters have clear economic interpretations for the Indian market:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Parameter</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Symbol</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Meaning</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Nifty Typical</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Mean reversion speed</td>
              <td className="px-4 py-2"><InlineMath math="\kappa" /></td>
              <td className="px-4 py-2">How fast vol returns to long-run level</td>
              <td className="px-4 py-2">1.5 - 4.0</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Long-run variance</td>
              <td className="px-4 py-2"><InlineMath math="\theta" /></td>
              <td className="px-4 py-2">Equilibrium variance level</td>
              <td className="px-4 py-2">0.02 - 0.06</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Vol of vol</td>
              <td className="px-4 py-2"><InlineMath math="\xi" /></td>
              <td className="px-4 py-2">Volatility of the variance process</td>
              <td className="px-4 py-2">0.2 - 0.6</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Correlation</td>
              <td className="px-4 py-2"><InlineMath math="\rho" /></td>
              <td className="px-4 py-2">Spot-vol correlation (leverage)</td>
              <td className="px-4 py-2">-0.8 to -0.5</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Initial variance</td>
              <td className="px-4 py-2"><InlineMath math="v_0" /></td>
              <td className="px-4 py-2">Current instantaneous variance</td>
              <td className="px-4 py-2">From India VIX</td>
            </tr>
          </tbody>
        </table>
      </div>

      <TheoremBlock
        title="Feller Condition"
        label="Theorem 6.7"
        statement="The variance process v_t remains strictly positive (never touches zero) if and only if the Feller condition is satisfied: 2\kappa\theta > \xi^2. When violated, the variance can reach zero, requiring careful numerical treatment."
        proof="The CIR process v_t has a non-central chi-squared transition density. The boundary behavior at v=0 is classified by the ratio 2\kappa\theta/\xi^2. When this ratio exceeds 1, zero is an entrance boundary (inaccessible from above). When the ratio is at most 1, zero is a regular boundary that is reached with positive probability."
      />

      <InteractiveHeston />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Heston Characteristic Function
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The power of the Heston model lies in its semi-analytical characteristic function, which
        enables fast pricing via Fourier inversion:
      </p>

      <BlockMath math="\phi(u) = \exp\!\left\{i u \ln S + \frac{\kappa\theta}{\xi^2}\left[(\kappa - \rho\xi iu - d)T - 2\ln\frac{1 - ge^{-dT}}{1-g}\right] + \frac{v_0}{\xi^2}(\kappa - \rho\xi iu - d)\frac{1 - e^{-dT}}{1 - ge^{-dT}}\right\}" />

      <BlockMath math="d = \sqrt{(\rho\xi iu - \kappa)^2 + \xi^2(iu + u^2)}, \quad g = \frac{\kappa - \rho\xi iu - d}{\kappa - \rho\xi iu + d}" />

      <PythonCode
        title="heston_pricing.py"
        runnable
        code={`import numpy as np
from scipy.integrate import quad

def heston_char_func(u, S, K, T, r, v0, kappa, theta, xi, rho):
    """Heston characteristic function (Albrecher et al. formulation)."""
    d = np.sqrt((rho * xi * 1j * u - kappa)**2 + xi**2 * (1j * u + u**2))
    g = (kappa - rho * xi * 1j * u - d) / (kappa - rho * xi * 1j * u + d)

    C = (kappa * theta / xi**2) * (
        (kappa - rho * xi * 1j * u - d) * T
        - 2 * np.log((1 - g * np.exp(-d * T)) / (1 - g))
    )
    D = ((kappa - rho * xi * 1j * u - d) / xi**2) * (
        (1 - np.exp(-d * T)) / (1 - g * np.exp(-d * T))
    )
    return np.exp(C + D * v0 + 1j * u * np.log(S * np.exp(r * T)))

def heston_call(S, K, T, r, v0, kappa, theta, xi, rho):
    """Price a European call using Heston via Fourier inversion."""
    def integrand(u, j):
        if j == 1:
            phi = heston_char_func(u - 1j, S, K, T, r, v0, kappa, theta, xi, rho)
            phi /= (1j * u * heston_char_func(-1j, S, K, T, r, v0, kappa, theta, xi, rho))
        else:
            phi = heston_char_func(u, S, K, T, r, v0, kappa, theta, xi, rho)
            phi /= (1j * u)
        return (np.exp(-1j * u * np.log(K)) * phi).real

    P1 = 0.5 + (1/np.pi) * quad(integrand, 0, 100, args=(1,), limit=200)[0]
    P2 = 0.5 + (1/np.pi) * quad(integrand, 0, 100, args=(2,), limit=200)[0]
    return S * P1 - K * np.exp(-r * T) * P2

# Calibrated Heston parameters for Nifty 50
S = 22000
r = 0.065
v0 = 0.0324     # Current variance (IV ~ 18%)
kappa = 2.5      # Mean reversion speed
theta = 0.04     # Long-run variance (vol ~ 20%)
xi = 0.35        # Vol of vol
rho = -0.70      # Spot-vol correlation

print("=== Heston Model: Nifty 50 Option Prices ===")
print(f"Spot: {S:,} | v0: {v0} (vol={np.sqrt(v0)*100:.1f}%)")
print(f"kappa={kappa}, theta={theta}, xi={xi}, rho={rho}")
feller = 2 * kappa * theta > xi**2
print(f"Feller: 2*kappa*theta={2*kappa*theta:.3f} vs xi^2={xi**2:.3f} -> {'OK' if feller else 'VIOLATED'}")

strikes = np.arange(20000, 24200, 500)
T = 30 / 365
print(f"\\n{'Strike':>8} {'Heston':>10} {'BSM(ATM IV)':>12} {'Difference':>10}")
print("-" * 44)

from scipy.stats import norm
def bsm_call(S, K, T, r, sigma):
    d1 = (np.log(S/K) + (r+sigma**2/2)*T)/(sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    return S*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)

for K in strikes:
    h_price = heston_call(S, K, T, r, v0, kappa, theta, xi, rho)
    b_price = bsm_call(S, K, T, r, np.sqrt(v0))
    print(f"{K:>8.0f} {h_price:>10.2f} {b_price:>12.2f} {h_price-b_price:>+10.2f}")

print("\\nNote: Heston produces higher OTM put prices (left skew from rho < 0)")`}
      />

      <ExampleBlock
        title="Estimating Heston Parameters from India VIX"
        difficulty="intermediate"
        problem="India VIX is at 14 (annualized vol 14%). Historical mean of India VIX over 5 years is 18%. The half-life of VIX mean reversion is estimated at 45 trading days. Estimate kappa, theta, and v0."
        solution={[
          {
            step: 'Convert VIX to variance',
            formula: 'v_0 = (0.14)^2 = 0.0196, \\quad \\theta = (0.18)^2 = 0.0324',
            explanation: 'VIX is quoted in volatility terms; Heston uses variance.',
          },
          {
            step: 'Compute kappa from half-life',
            formula: '\\kappa = \\frac{\\ln 2}{\\text{half-life}} = \\frac{0.693}{45/252} = \\frac{0.693}{0.1786} \\approx 3.88',
            explanation: 'Half-life of 45 trading days converted to annual mean reversion speed.',
          },
          {
            step: 'Summary of estimates',
            formula: 'v_0 = 0.0196, \\; \\theta = 0.0324, \\; \\kappa \\approx 3.88',
            explanation: 'Rho and xi require calibration to the full volatility surface using optimization.',
          },
        ]}
      />

      <NoteBlock title="SABR Model Alternative" type="tip">
        <p>
          The SABR model (Hagan et al., 2002) is another popular stochastic volatility model used
          for interest rate options and increasingly for equity index options. Unlike Heston, SABR
          provides an analytical approximation for implied volatility directly, making it convenient
          for interpolation. For Nifty options, SABR with <InlineMath math="\beta = 1" /> (lognormal)
          is commonly used by Indian sell-side desks for smile interpolation.
        </p>
      </NoteBlock>

      <NoteBlock title="Calibration Challenges" type="warning">
        <p>
          Calibrating the Heston model to the NSE Nifty volatility surface is an ill-posed
          optimization problem. Multiple parameter sets can produce similar fits. Best practices
          include: (1) using global optimizers like differential evolution before local refinement,
          (2) adding regularization to prevent extreme parameters, (3) weighting liquid strikes
          (ATM and near-ATM) more heavily, and (4) checking Feller condition satisfaction.
          Overfitting to noisy short-dated weekly option data should be avoided.
        </p>
      </NoteBlock>
    </div>
  )
}
