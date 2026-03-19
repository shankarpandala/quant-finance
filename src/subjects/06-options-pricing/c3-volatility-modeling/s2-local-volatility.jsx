import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveLocalVol() {
  const [spotLevel, setSpotLevel] = useState(22000)
  const [timeSlice, setTimeSlice] = useState(30)

  const strikes = Array.from({ length: 11 }, (_, i) => 19000 + i * 600)
  const times = [7, 15, 30, 60, 90]

  const localVol = (K, T) => {
    const m = Math.log(K / spotLevel)
    const tFactor = 1 + 0.3 * Math.exp(-T / 60)
    return Math.max(0.08, (0.18 + (-0.15) * m + 0.04 * m * m) * tFactor)
  }

  const chartW = 480
  const chartH = 160
  const padL = 50

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Local Volatility Surface Slice
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        View the local volatility curve at a given time slice for Nifty 50.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Nifty Spot = {spotLevel}</span>
          <input type="range" min="19000" max="25000" step="100" value={spotLevel}
            onChange={e => setSpotLevel(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Time Slice = {timeSlice} days</span>
          <input type="range" min="5" max="90" step="1" value={timeSlice}
            onChange={e => setTimeSlice(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox={`0 0 ${chartW + padL + 20} ${chartH + 50}`}
        className="w-full max-w-2xl mx-auto block" aria-label="Local Vol Surface Slice">
        <line x1={padL} y1={10} x2={padL} y2={chartH + 10} stroke="#9ca3af" strokeWidth="1" />
        <line x1={padL} y1={chartH + 10} x2={chartW + padL} y2={chartH + 10} stroke="#9ca3af" strokeWidth="1" />

        {/* Local vol curve */}
        {(() => {
          const lvs = strikes.map(K => localVol(K, timeSlice))
          const maxLV = Math.max(...lvs) * 1.1
          const minLV = Math.min(...lvs) * 0.9
          const points = strikes.map((K, i) => {
            const x = padL + (i / (strikes.length - 1)) * chartW
            const y = chartH + 10 - ((lvs[i] - minLV) / (maxLV - minLV)) * chartH
            return `${x},${y}`
          }).join(' ')
          return (
            <g>
              <polyline points={points} fill="none" stroke="#8b5cf6" strokeWidth="2.5" />
              {strikes.map((K, i) => {
                const x = padL + (i / (strikes.length - 1)) * chartW
                const y = chartH + 10 - ((lvs[i] - minLV) / (maxLV - minLV)) * chartH
                return <circle key={i} cx={x} cy={y} r="3" fill="#8b5cf6" />
              })}
              {[0, 0.5, 1].map(f => (
                <text key={f} x={padL - 5} y={chartH + 13 - f * chartH} textAnchor="end"
                  className="text-[9px]" fill="#9ca3af">
                  {((minLV + f * (maxLV - minLV)) * 100).toFixed(0)}%
                </text>
              ))}
            </g>
          )
        })()}

        <text x={padL + chartW / 2} y={chartH + 40} textAnchor="middle"
          className="text-[10px]" fill="#9ca3af">Strike Price (Nifty)</text>
        <text x={padL - 35} y={chartH / 2 + 10} textAnchor="middle"
          className="text-[9px]" fill="#9ca3af" transform={`rotate(-90, ${padL - 35}, ${chartH / 2 + 10})`}>
          Local Vol
        </text>
      </svg>
    </div>
  )
}

export default function LocalVolatility() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Local Volatility Models
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Local volatility models extend Black-Scholes by allowing volatility to be a deterministic
        function of both the underlying price and time. Introduced by Dupire (1994) and
        Derman-Kani (1994), local vol is the simplest framework that exactly reproduces observed
        option prices across all strikes and expiries on the NSE volatility surface.
      </p>

      <DefinitionBlock
        title="Local Volatility"
        label="Definition 6.17"
        definition="Local volatility sigma_L(S,t) is the instantaneous volatility of the underlying at price level S and time t, such that the risk-neutral diffusion dS = rS dt + sigma_L(S,t) S dW reproduces all observed European option prices."
        notation="dS_t = r\,S_t\,dt + \sigma_L(S_t, t)\,S_t\,dW_t"
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The key insight of the local volatility framework is that there exists a unique
        deterministic volatility function that is consistent with any arbitrage-free set of
        European option prices. This is formalized by Dupire's equation:
      </p>

      <TheoremBlock
        title="Dupire's Formula"
        label="Theorem 6.6"
        statement="Given a smooth surface of European call prices C(K,T), the unique local volatility function consistent with these prices is: \sigma_L^2(K,T) = \frac{\frac{\partial C}{\partial T} + rK\frac{\partial C}{\partial K}}{\ \frac{1}{2}K^2\frac{\partial^2 C}{\partial K^2}}. This remarkable result allows us to extract local volatility from the market-observed option price surface."
        proof="Starting from the Fokker-Planck (forward Kolmogorov) equation for the risk-neutral transition density p(S,T|S_0,0), and using the relationship C(K,T) = e^{-rT}\int_K^\infty (S-K)p(S,T)dS, differentiate twice with respect to K and once with respect to T. Combining these partial derivatives and using the boundary conditions of the call price yields Dupire's formula."
      />

      <BlockMath math="\sigma_L^2(K, T) = \frac{\dfrac{\partial C}{\partial T} + rK\dfrac{\partial C}{\partial K}}{\dfrac{1}{2}K^2\dfrac{\partial^2 C}{\partial K^2}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        In practice, the partial derivatives are estimated numerically from the observed option
        price grid on NSE. The denominator involves the butterfly spread price (proportional to
        the risk-neutral density), and the numerator involves a calendar spread.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Relationship to Implied Volatility
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Local volatility and implied volatility are related but distinct. Implied vol is an average
        of local vol along the path from spot to strike. For ATM options at short maturity:
      </p>

      <BlockMath math="\sigma_{\text{imp}}^2(K, T) \approx \frac{1}{T}\int_0^T \sigma_L^2(K, t)\,dt" />

      <BlockMath math="\sigma_L^2(K, T) = \sigma_{\text{imp}}^2 + 2T\sigma_{\text{imp}}\frac{\partial \sigma_{\text{imp}}}{\partial T} + \frac{2rK\sigma_{\text{imp}}\frac{\partial \sigma_{\text{imp}}}{\partial K}}{1 + d_1\sqrt{T}\frac{\partial \sigma_{\text{imp}}}{\partial K}}" />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Feature</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Black-Scholes</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Local Vol</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Volatility</td>
              <td className="px-4 py-2">Constant <InlineMath math="\sigma" /></td>
              <td className="px-4 py-2"><InlineMath math="\sigma_L(S, t)" /></td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Smile fit</td>
              <td className="px-4 py-2">No (flat)</td>
              <td className="px-4 py-2">Exact by construction</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Forward smile</td>
              <td className="px-4 py-2">Flat</td>
              <td className="px-4 py-2">Flattens too fast</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Dynamics</td>
              <td className="px-4 py-2">Deterministic</td>
              <td className="px-4 py-2">Deterministic</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Calibration</td>
              <td className="px-4 py-2">1 parameter</td>
              <td className="px-4 py-2">Full surface</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveLocalVol />

      <PythonCode
        title="local_volatility.py"
        runnable
        code={`import numpy as np
from scipy.stats import norm
from scipy.interpolate import RectBivariateSpline

def bsm_call(S, K, T, r, sigma):
    d1 = (np.log(S/K) + (r + sigma**2/2)*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    return S*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)

# Build a synthetic Nifty option surface
S0 = 22000
r = 0.065
strikes = np.linspace(19000, 25000, 25)
expiries = np.array([7, 15, 30, 45, 60, 90]) / 365

# Implied vol surface with skew
def iv_surface(K, T):
    m = np.log(K / S0)
    base = 0.18 - 0.12 * m + 0.03 * m**2
    term = 1 + 0.3 * np.exp(-T * 365 / 60)
    return np.clip(base * term, 0.08, 0.60)

# Build call price surface
K_grid, T_grid = np.meshgrid(strikes, expiries)
IV_grid = iv_surface(K_grid, T_grid)
C_grid = np.vectorize(bsm_call)(S0, K_grid, T_grid, r, IV_grid)

# Dupire local vol via finite differences
def dupire_local_vol(C, K, T, r):
    nT, nK = C.shape
    lv = np.zeros_like(C)
    for i in range(1, nT - 1):
        for j in range(1, nK - 1):
            dC_dT = (C[i+1, j] - C[i-1, j]) / (T[i+1, j] - T[i-1, j])
            dC_dK = (C[i, j+1] - C[i, j-1]) / (K[i, j+1] - K[i, j-1])
            d2C_dK2 = (C[i, j+1] - 2*C[i, j] + C[i, j-1]) / (
                (K[i, j+1] - K[i, j-1]) / 2)**2
            numerator = dC_dT + r * K[i, j] * dC_dK
            denominator = 0.5 * K[i, j]**2 * d2C_dK2
            if denominator > 1e-8:
                lv[i, j] = np.sqrt(max(numerator / denominator, 0))
    return lv

local_vol = dupire_local_vol(C_grid, K_grid, T_grid, r)

print("=== Dupire Local Volatility for Nifty 50 ===")
print(f"Spot: {S0:,} | Rate: {r*100:.1f}%")
print(f"\\n{'Strike':>8}", end="")
for T in expiries[1:-1]:
    print(f" {T*365:>6.0f}D", end="")
print()
print("-" * 50)
for j in range(2, len(strikes) - 2, 2):
    print(f"{strikes[j]:>8.0f}", end="")
    for i in range(1, len(expiries) - 1):
        if local_vol[i, j] > 0:
            print(f" {local_vol[i, j]*100:>5.1f}%", end="")
        else:
            print(f"   N/A", end="")
    print()

print(f"\\nNote: Local vol > implied vol for OTM puts (left skew)")
print(f"      Local vol surface is always >= 0 (arbitrage-free)")`}
      />

      <ExampleBlock
        title="Local Vol from Calendar and Butterfly Spreads"
        difficulty="advanced"
        problem="At strike K=22000, the 30-day Nifty call costs INR 450 and the 60-day call costs INR 720. The 21900/22000/22100 butterfly costs INR 12 for the 45-day expiry. Estimate local volatility at (K=22000, T=45 days)."
        solution={[
          {
            step: 'Estimate dC/dT from calendar spread',
            formula: '\\frac{\\partial C}{\\partial T} \\approx \\frac{720 - 450}{(60-30)/365} = \\frac{270}{0.0822} = 3285',
          },
          {
            step: 'Estimate d2C/dK2 from butterfly spread',
            formula: '\\frac{\\partial^2 C}{\\partial K^2} \\approx \\frac{\\text{Butterfly price}}{(\\Delta K)^2} = \\frac{12}{100^2} = 0.0012',
            explanation: 'The butterfly spread approximates the second derivative with respect to strike.',
          },
          {
            step: 'Apply Dupire formula (ignoring drift term)',
            formula: '\\sigma_L^2 \\approx \\frac{3285}{0.5 \\times 22000^2 \\times 0.0012} = \\frac{3285}{290400} = 0.01131',
          },
          {
            step: 'Take square root',
            formula: '\\sigma_L \\approx \\sqrt{0.01131} = 0.1063 = 10.63\\%',
            explanation: 'This is the local (instantaneous) volatility at this strike-time point.',
          },
        ]}
      />

      <NoteBlock title="Limitations of Local Vol" type="warning">
        <p>
          While local volatility perfectly fits the current smile, it produces unrealistic forward
          smile dynamics. The model predicts that the smile flattens as we look forward in time,
          which contradicts market behavior. On NSE, traders observe that the Nifty skew persists
          into forward-starting options. This limitation motivates stochastic volatility models
          like Heston and SABR.
        </p>
      </NoteBlock>

      <NoteBlock title="Practical Tip: Surface Smoothing" type="tip">
        <p>
          Raw NSE option data contains noise from bid-ask spreads and stale quotes. Before applying
          Dupire's formula, the implied volatility surface must be smoothed (e.g., using SVI
          parameterization or cubic spline interpolation) to ensure non-negative local variances.
          A negative local variance implies calendar spread arbitrage in the input data.
        </p>
      </NoteBlock>
    </div>
  )
}
