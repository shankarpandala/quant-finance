import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveFDM() {
  const [method, setMethod] = useState('explicit')
  const [nSpace, setNSpace] = useState(50)
  const [nTime, setNTime] = useState(100)

  const S0 = 22000, K = 22000, T = 30 / 365, r = 0.065, sigma = 0.18
  const Smax = 2 * S0
  const dS = Smax / nSpace
  const dt = T / nTime

  const stabilityRatio = sigma * sigma * (nSpace) * (nSpace) * dt / (dS * dS)
  const isStable = method === 'explicit' ? stabilityRatio <= 1 : true

  const courantNum = sigma * Math.sqrt(dt) * nSpace / Smax
  const diffusionNum = sigma * sigma * dt * nSpace * nSpace / (Smax * Smax)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Finite Difference Stability Analysis
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Explore how grid resolution and method choice affect stability for Nifty option pricing.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="flex flex-col gap-2">
          <span className="text-xs text-gray-600 dark:text-gray-400">Method</span>
          <div className="flex gap-3">
            {['explicit', 'implicit', 'crank-nicolson'].map(m => (
              <label key={m} className="flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300">
                <input type="radio" name="fdm" value={m} checked={method === m}
                  onChange={() => setMethod(m)} className="accent-indigo-500" />
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </label>
            ))}
          </div>
        </div>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Space Steps = {nSpace}</span>
          <input type="range" min="10" max="200" step="5" value={nSpace}
            onChange={e => setNSpace(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Time Steps = {nTime}</span>
          <input type="range" min="10" max="500" step="10" value={nTime}
            onChange={e => setNTime(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Stability</div>
          <div className={`text-sm font-bold ${isStable ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {isStable ? 'STABLE' : 'UNSTABLE'}
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500"><InlineMath math="\Delta S" /></div>
          <div className="text-sm font-mono text-gray-700 dark:text-gray-300">{dS.toFixed(0)}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500"><InlineMath math="\Delta t" /></div>
          <div className="text-sm font-mono text-gray-700 dark:text-gray-300">{(dt * 365).toFixed(4)}d</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Diffusion #</div>
          <div className="text-sm font-mono text-gray-700 dark:text-gray-300">{diffusionNum.toFixed(4)}</div>
        </div>
      </div>

      <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
        {method === 'explicit' && 'Explicit: conditionally stable, requires small dt. Accuracy O(dt, dS^2).'}
        {method === 'implicit' && 'Implicit: unconditionally stable, requires solving tridiagonal system. Accuracy O(dt, dS^2).'}
        {method === 'crank-nicolson' && 'Crank-Nicolson: unconditionally stable, second-order in time. Accuracy O(dt^2, dS^2).'}
      </p>
    </div>
  )
}

export default function FiniteDifference() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Finite Difference Methods
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Finite difference methods (FDM) solve the Black-Scholes PDE directly on a discrete grid.
        They are deterministic, produce the full option price surface in one pass, and naturally
        handle American exercise, barriers, and dividends. For pricing the entire Nifty option
        chain simultaneously, FDM on a GPU is the method of choice at institutional desks.
      </p>

      <DefinitionBlock
        title="The Black-Scholes PDE"
        label="Definition 6.22"
        definition="The BSM PDE describes the evolution of the option price C(S,t) as a function of the underlying price and time. Every European option under BSM satisfies this PDE with appropriate boundary conditions."
        notation="\frac{\partial C}{\partial t} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 C}{\partial S^2} + rS\frac{\partial C}{\partial S} - rC = 0"
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        We discretize the PDE on a grid with <InlineMath math="M" /> space steps
        (<InlineMath math="\Delta S = S_{\max}/M" />) and <InlineMath math="N" /> time steps
        (<InlineMath math="\Delta t = T/N" />). The partial derivatives are approximated by
        finite differences:
      </p>

      <BlockMath math="\frac{\partial C}{\partial S} \approx \frac{C_{i+1}^n - C_{i-1}^n}{2\Delta S}, \quad \frac{\partial^2 C}{\partial S^2} \approx \frac{C_{i+1}^n - 2C_i^n + C_{i-1}^n}{(\Delta S)^2}" />

      <DefinitionBlock
        title="Explicit Finite Difference Scheme"
        label="Definition 6.23"
        definition="The explicit scheme computes option values at time step n from known values at step n+1 (working backward from expiry). It is simple but conditionally stable, requiring small time steps relative to space steps."
        notation="C_i^n = a_i C_{i-1}^{n+1} + b_i C_i^{n+1} + c_i C_{i+1}^{n+1}"
      />

      <BlockMath math="\begin{aligned} a_i &= \frac{\Delta t}{2}(r\,i - \sigma^2 i^2) \cdot \frac{1}{1 + r\Delta t} \\ b_i &= \frac{1 + \sigma^2 i^2 \Delta t}{1 + r\Delta t} \\ c_i &= \frac{-\Delta t}{2}(r\,i + \sigma^2 i^2) \cdot \frac{1}{1 + r\Delta t} \end{aligned}" />

      <TheoremBlock
        title="Stability Condition for Explicit FDM"
        label="Theorem 6.10"
        statement="The explicit finite difference scheme for the BSM PDE is stable if and only if \Delta t \leq \frac{(\Delta S)^2}{\sigma^2 S_{\max}^2}. Equivalently, the diffusion number D = \sigma^2 \Delta t / (\Delta S)^2 must satisfy D \leq 1 for all grid points. Violation leads to oscillatory, non-physical solutions."
        proof="Applying von Neumann stability analysis, the amplification factor g of the explicit scheme satisfies |g| \leq 1 only when the diffusion number is bounded. The highest-frequency mode (wavenumber k = \pi/\Delta S) is the most restrictive, giving the stated condition."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Crank-Nicolson Method
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The Crank-Nicolson scheme averages the explicit and implicit discretizations, achieving
        second-order accuracy in both time and space. It is the standard FDM scheme for production
        option pricing:
      </p>

      <BlockMath math="\frac{C_i^{n} - C_i^{n+1}}{\Delta t} = \frac{1}{2}\left[\mathcal{L}(C^{n}) + \mathcal{L}(C^{n+1})\right]" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\mathcal{L}" /> is the BSM spatial differential operator. This
        leads to a tridiagonal system <InlineMath math="A \mathbf{C}^n = B \mathbf{C}^{n+1} + \mathbf{d}" /> that
        is solved efficiently using the Thomas algorithm in <InlineMath math="O(M)" /> operations.
      </p>

      <InteractiveFDM />

      <PythonCode
        title="finite_difference.py"
        runnable
        code={`import numpy as np
from scipy.stats import norm

def bsm_call(S, K, T, r, sigma):
    d1 = (np.log(S/K) + (r+sigma**2/2)*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    return S*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)

def crank_nicolson(S0, K, T, r, sigma, M=200, N=200, option='call', style='european'):
    """Crank-Nicolson FDM for BSM PDE."""
    Smax = 3 * S0
    dS = Smax / M
    dt = T / N
    S = np.linspace(0, Smax, M+1)

    # Terminal condition
    if option == 'call':
        V = np.maximum(S - K, 0)
    else:
        V = np.maximum(K - S, 0)

    # Coefficient arrays (for interior points i=1..M-1)
    i = np.arange(1, M)
    alpha = 0.25 * dt * (sigma**2 * i**2 - r * i)
    beta = -0.5 * dt * (sigma**2 * i**2 + r)
    gamma = 0.25 * dt * (sigma**2 * i**2 + r * i)

    # Build tridiagonal matrices
    # A * V^n = B * V^{n+1} + d
    A = np.zeros((M-1, M-1))
    B = np.zeros((M-1, M-1))
    for j in range(M-1):
        A[j, j] = 1 - beta[j]
        B[j, j] = 1 + beta[j]
        if j > 0:
            A[j, j-1] = -alpha[j]
            B[j, j-1] = alpha[j]
        if j < M-2:
            A[j, j+1] = -gamma[j]
            B[j, j+1] = gamma[j]

    # Time-stepping (backward from T to 0)
    for n in range(N):
        # Boundary conditions
        if option == 'call':
            V[0] = 0
            V[M] = Smax - K * np.exp(-r * (N-n) * dt)
        else:
            V[0] = K * np.exp(-r * (N-n) * dt)
            V[M] = 0

        rhs = B @ V[1:M]
        rhs[0] += alpha[0] * (V[0])  # boundary adjustment
        rhs[-1] += gamma[-1] * (V[M])

        V[1:M] = np.linalg.solve(A, rhs)

        # American exercise check
        if style == 'american':
            if option == 'call':
                V[1:M] = np.maximum(V[1:M], S[1:M] - K)
            else:
                V[1:M] = np.maximum(V[1:M], K - S[1:M])

    # Interpolate to get price at S0
    idx = int(S0 / dS)
    w = (S0 - S[idx]) / dS
    return V[idx] * (1 - w) + V[idx + 1] * w

# Price Nifty 50 22000 CE
S0, K, T, r, sigma = 22000, 22000, 30/365, 0.065, 0.18
bsm = bsm_call(S0, K, T, r, sigma)

print("=== Crank-Nicolson FDM: Nifty 50 22000 CE ===")
print(f"BSM Analytical: {bsm:.4f}")
print(f"\\n{'Grid (MxN)':>12} {'CN Price':>10} {'Error':>10} {'Time':>8}")
print("-" * 44)

import time
for M, N in [(50, 50), (100, 100), (200, 200), (400, 400)]:
    t0 = time.time()
    cn = crank_nicolson(S0, K, T, r, sigma, M, N)
    elapsed = time.time() - t0
    print(f"{M:>5}x{N:<5} {cn:>10.4f} {cn-bsm:>+10.4f} {elapsed:>7.4f}s")

# American put comparison
print(f"\\n=== American Put (Nifty 22000 PE) ===")
eu_put = crank_nicolson(S0, K, T, r, sigma, 200, 200, 'put', 'european')
am_put = crank_nicolson(S0, K, T, r, sigma, 200, 200, 'put', 'american')
print(f"European Put (CN): {eu_put:.4f}")
print(f"American Put (CN): {am_put:.4f}")
print(f"Early Exercise Premium: {am_put - eu_put:.4f}")`}
      />

      <ExampleBlock
        title="Explicit FDM Grid Setup for Nifty Call"
        difficulty="intermediate"
        problem="Set up an explicit FDM grid for a 30-day Nifty 22000 CE with sigma=18%, r=6.5%. Use M=100 space steps and S_max=44000. What is the maximum allowable dt for stability?"
        solution={[
          {
            step: 'Compute space step',
            formula: '\\Delta S = \\frac{S_{\\max}}{M} = \\frac{44000}{100} = 440',
          },
          {
            step: 'Find stability constraint',
            formula: '\\Delta t \\leq \\frac{(\\Delta S)^2}{\\sigma^2 S_{\\max}^2} = \\frac{440^2}{0.18^2 \\times 44000^2} = \\frac{193600}{62726400} = 0.003086',
          },
          {
            step: 'Compute minimum time steps needed',
            formula: 'N \\geq \\frac{T}{\\Delta t_{\\max}} = \\frac{30/365}{0.003086} = 26.6 \\implies N \\geq 27',
            explanation: 'With M=100 space steps, we need at least 27 time steps for stability. In practice, use N=100+ for accuracy.',
          },
        ]}
      />

      <NoteBlock title="FDM for the Full Nifty Option Chain" type="tip">
        <p>
          A single Crank-Nicolson solve produces option prices at all spot levels simultaneously.
          This means one FDM run gives the entire price-vs-spot curve, from which Delta and Gamma
          can be extracted by finite differences of the solution. For pricing the full Nifty option
          chain (200+ strikes), the FDM grid naturally provides all prices in one sweep, making it
          far more efficient than running BSM formula 200 times.
        </p>
      </NoteBlock>

      <NoteBlock title="Boundary Conditions Matter" type="warning">
        <p>
          Incorrect boundary conditions are a common source of FDM pricing errors. For a Nifty call:
          at <InlineMath math="S=0" />, the call is worthless; at <InlineMath math="S=S_{\max}" />,
          use <InlineMath math="C \approx S - Ke^{-r(T-t)}" />. Setting <InlineMath math="S_{\max}" /> too
          low (e.g., less than 2x spot) causes boundary contamination. For production Nifty
          pricing, use <InlineMath math="S_{\max} = 3S_0" /> or employ a log-price transformation
          to avoid this issue entirely.
        </p>
      </NoteBlock>
    </div>
  )
}
