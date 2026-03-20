import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveBinomialTree() {
  const [steps, setSteps] = useState(4)
  const [spot, setSpot] = useState(22000)
  const [strike, setStrike] = useState(22000)
  const [vol, setVol] = useState(0.18)

  const T = 30 / 365
  const r = 0.065
  const dt = T / steps
  const u = Math.exp(vol * Math.sqrt(dt))
  const d = 1 / u
  const p = (Math.exp(r * dt) - d) / (u - d)

  const displaySteps = Math.min(steps, 5)
  const nodeW = 70
  const nodeH = 40
  const svgW = (displaySteps + 1) * nodeW + 40
  const svgH = (displaySteps + 1) * nodeH + 60

  const nodes = []
  for (let i = 0; i <= displaySteps; i++) {
    for (let j = 0; j <= i; j++) {
      const price = spot * Math.pow(u, i - j) * Math.pow(d, j)
      nodes.push({ i, j, price, x: 20 + i * nodeW, y: 20 + j * nodeH + (displaySteps - i) * nodeH / 2 })
    }
  }

  // Simple backward induction for the displayed tree
  const finalPayoffs = []
  for (let j = 0; j <= displaySteps; j++) {
    const price = spot * Math.pow(u, displaySteps - j) * Math.pow(d, j)
    finalPayoffs.push(Math.max(price - strike, 0))
  }

  // Full tree price
  const fullN = steps
  const fullPrices = []
  for (let j = 0; j <= fullN; j++) {
    const price = spot * Math.pow(u, fullN - j) * Math.pow(d, j)
    fullPrices.push(Math.max(price - strike, 0))
  }
  for (let i = fullN - 1; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      fullPrices[j] = Math.exp(-r * dt) * (p * fullPrices[j] + (1 - p) * fullPrices[j + 1])
    }
  }
  const treePrice = fullPrices[0]

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: CRR Binomial Tree for Nifty 50 Call
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust parameters and tree depth. Price shown via backward induction.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Steps = {steps}</span>
          <input type="range" min="2" max="50" step="1" value={steps}
            onChange={e => setSteps(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Spot = {spot}</span>
          <input type="range" min="18000" max="26000" step="100" value={spot}
            onChange={e => setSpot(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Strike = {strike}</span>
          <input type="range" min="18000" max="26000" step="100" value={strike}
            onChange={e => setStrike(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>IV = {(vol * 100).toFixed(0)}%</span>
          <input type="range" min="0.08" max="0.50" step="0.01" value={vol}
            onChange={e => setVol(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-4">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Tree Price</div>
          <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{treePrice.toFixed(2)}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">u (up)</div>
          <div className="text-sm font-mono text-gray-700 dark:text-gray-300">{u.toFixed(5)}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">d (down)</div>
          <div className="text-sm font-mono text-gray-700 dark:text-gray-300">{d.toFixed(5)}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">p (prob)</div>
          <div className="text-sm font-mono text-gray-700 dark:text-gray-300">{p.toFixed(4)}</div>
        </div>
      </div>

      {steps <= 5 && (
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-2xl mx-auto block" aria-label="Binomial tree">
          {/* Edges */}
          {nodes.filter(n => n.i < displaySteps).map(n => (
            <g key={`e-${n.i}-${n.j}`}>
              <line x1={n.x} y1={n.y} x2={n.x + nodeW} y2={n.y - nodeH / 2} stroke="#a5b4fc" strokeWidth="1.5" />
              <line x1={n.x} y1={n.y} x2={n.x + nodeW} y2={n.y + nodeH / 2} stroke="#fca5a5" strokeWidth="1.5" />
            </g>
          ))}
          {/* Nodes */}
          {nodes.map(n => (
            <g key={`n-${n.i}-${n.j}`}>
              <circle cx={n.x} cy={n.y} r="14"
                fill={n.price >= strike ? '#dbeafe' : '#fee2e2'}
                stroke={n.price >= strike ? '#6366f1' : '#ef4444'} strokeWidth="1.5" />
              <text x={n.x} y={n.y + 1} textAnchor="middle" dominantBaseline="middle"
                className="text-[7px] font-mono" fill="#374151">
                {(n.price / 1000).toFixed(1)}k
              </text>
            </g>
          ))}
        </svg>
      )}
    </div>
  )
}

export default function BinomialTrinomial() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Binomial and Trinomial Trees
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Lattice methods discretize the continuous-time asset price process into a recombining
        tree. They provide intuitive, flexible frameworks for pricing both European and American
        options. On NSE, where some Nifty options have American-style features and early exercise
        considerations arise in dividend-paying stock options, tree methods remain indispensable.
      </p>

      <DefinitionBlock
        title="Cox-Ross-Rubinstein (CRR) Binomial Tree"
        label="Definition 6.19"
        definition="The CRR model discretizes time into N steps of size dt = T/N. At each step the asset price moves up by factor u = exp(sigma sqrt(dt)) or down by d = 1/u, with risk-neutral probability p = (exp(r dt) - d)/(u - d)."
        notation="u = e^{\sigma\sqrt{\Delta t}}, \quad d = \frac{1}{u}, \quad p = \frac{e^{r\Delta t} - d}{u - d}"
      />

      <BlockMath math="S_{i,j} = S_0 \cdot u^{i-j} \cdot d^j, \quad j = 0, 1, \ldots, i" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The option is priced by backward induction: starting from terminal payoffs at expiry
        and working backward to time zero, computing the discounted expected value under
        risk-neutral probabilities at each node:
      </p>

      <BlockMath math="C_{i,j} = e^{-r\Delta t}\left[p \cdot C_{i+1,j} + (1-p) \cdot C_{i+1,j+1}\right]" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For American options, at each node we also check whether early exercise is optimal:
      </p>

      <BlockMath math="C_{i,j}^{\text{American}} = \max\!\left(\text{Payoff}(S_{i,j}),\; e^{-r\Delta t}\left[p \cdot C_{i+1,j} + (1-p) \cdot C_{i+1,j+1}\right]\right)" />

      <TheoremBlock
        title="Convergence of Binomial Tree to BSM"
        label="Theorem 6.8"
        statement="As the number of steps N tends to infinity, the CRR binomial tree price converges to the Black-Scholes price. The convergence rate is O(1/N) with oscillations, and can be improved to O(1/N^2) using Richardson extrapolation or the BBS (Broadie-Detemple) smoothing method."
        proof="As N grows, the CLT ensures that the log-return \sum_{i=1}^N X_i (where X_i = \ln u or \ln d with probability p, 1-p) converges to a normal distribution. The mean and variance of this sum match the BSM lognormal parameters by construction of u, d, p. The binomial pricing formula converges to the BSM integral."
      />

      <DefinitionBlock
        title="Trinomial Tree"
        label="Definition 6.20"
        definition="A trinomial tree allows three moves per step: up by u, middle (stay at S), and down by d = 1/u. It provides faster convergence and can directly accommodate mean-reverting processes. The probabilities p_u, p_m, p_d are chosen to match the first two moments of the log-return."
        notation="p_u = \frac{1}{2}\left(\frac{\sigma^2\Delta t + \nu^2(\Delta t)^2}{(\Delta x)^2} + \frac{\nu\Delta t}{\Delta x}\right), \quad \Delta x = \sigma\sqrt{3\Delta t}"
      />

      <InteractiveBinomialTree />

      <PythonCode
        title="binomial_trinomial_trees.py"
        runnable
        code={`import numpy as np
from scipy.stats import norm

def bsm_call(S, K, T, r, sigma):
    d1 = (np.log(S/K) + (r + sigma**2/2)*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    return S*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)

def crr_tree(S, K, T, r, sigma, N, option='call', style='european'):
    """CRR Binomial Tree pricing."""
    dt = T / N
    u = np.exp(sigma * np.sqrt(dt))
    d = 1 / u
    p = (np.exp(r * dt) - d) / (u - d)
    disc = np.exp(-r * dt)

    # Terminal payoffs
    ST = S * u**(np.arange(N, -1, -1)) * d**(np.arange(0, N+1, 1))
    if option == 'call':
        values = np.maximum(ST - K, 0)
    else:
        values = np.maximum(K - ST, 0)

    # Backward induction
    for i in range(N-1, -1, -1):
        values = disc * (p * values[:-1] + (1-p) * values[1:])
        if style == 'american':
            Si = S * u**(np.arange(i, -1, -1)) * d**(np.arange(0, i+1, 1))
            if option == 'call':
                values = np.maximum(values, Si - K)
            else:
                values = np.maximum(values, K - Si)
    return values[0]

def trinomial_tree(S, K, T, r, sigma, N, option='call', style='european'):
    """Trinomial tree pricing."""
    dt = T / N
    dx = sigma * np.sqrt(3 * dt)
    nu = r - 0.5 * sigma**2
    pu = 0.5 * ((sigma**2 * dt + nu**2 * dt**2) / dx**2 + nu * dt / dx)
    pm = 1 - (sigma**2 * dt + nu**2 * dt**2) / dx**2
    pd = 0.5 * ((sigma**2 * dt + nu**2 * dt**2) / dx**2 - nu * dt / dx)
    disc = np.exp(-r * dt)

    # Terminal prices
    js = np.arange(-N, N+1)
    ST = S * np.exp(js * dx)
    if option == 'call':
        values = np.maximum(ST - K, 0)
    else:
        values = np.maximum(K - ST, 0)

    for i in range(N-1, -1, -1):
        new_vals = np.zeros(2*i + 1)
        for j in range(2*i + 1):
            new_vals[j] = disc * (pu * values[j] + pm * values[j+1] + pd * values[j+2])
        if style == 'american':
            js_i = np.arange(-i, i+1)
            Si = S * np.exp(js_i * dx)
            if option == 'call':
                new_vals = np.maximum(new_vals, Si - K)
            else:
                new_vals = np.maximum(new_vals, K - Si)
        values = new_vals
    return values[0]

# Nifty 50 option pricing
S, K, T, r, sigma = 22000, 22000, 30/365, 0.065, 0.18
bsm = bsm_call(S, K, T, r, sigma)

print("=== Nifty 50 22000 CE (30 DTE) ===")
print(f"BSM Analytical: {bsm:.4f}")
print(f"\\n{'N':>6} {'Binomial':>12} {'Trinomial':>12} {'Bin Error':>10} {'Tri Error':>10}")
print("-" * 54)
for N in [10, 25, 50, 100, 200, 500]:
    bp = crr_tree(S, K, T, r, sigma, N)
    tp = trinomial_tree(S, K, T, r, sigma, N)
    print(f"{N:>6} {bp:>12.4f} {tp:>12.4f} {bp-bsm:>+10.4f} {tp-bsm:>+10.4f}")

# American put premium
print(f"\\n=== American vs European Nifty 22000 PE ===")
eu_put = crr_tree(S, K, T, r, sigma, 200, 'put', 'european')
am_put = crr_tree(S, K, T, r, sigma, 200, 'put', 'american')
print(f"European Put: {eu_put:.4f}")
print(f"American Put: {am_put:.4f}")
print(f"Early Exercise Premium: {am_put - eu_put:.4f}")`}
      />

      <ExampleBlock
        title="Two-Step Binomial Tree for Nifty Call"
        difficulty="beginner"
        problem="Price a 2-month Nifty 22000 CE using a 2-step CRR tree. S=22000, sigma=18%, r=6.5%."
        solution={[
          {
            step: 'Compute tree parameters',
            formula: '\\Delta t = \\frac{2/12}{2} = \\frac{1}{12}, \\; u = e^{0.18\\sqrt{1/12}} = 1.0534, \\; d = 0.9493',
          },
          {
            step: 'Risk-neutral probability',
            formula: 'p = \\frac{e^{0.065/12} - 0.9493}{1.0534 - 0.9493} = \\frac{1.00543 - 0.9493}{0.1041} = 0.5394',
          },
          {
            step: 'Terminal node prices',
            formula: 'S_{uu} = 22000 \\times 1.0534^2 = 24406,\\; S_{ud} = 22000,\\; S_{dd} = 22000 \\times 0.9493^2 = 19821',
          },
          {
            step: 'Terminal payoffs and backward induction',
            formula: 'C_{uu} = 2406,\\; C_{ud} = 0,\\; C_{dd} = 0 \\implies C_0 = e^{-2r\\Delta t}[p^2 \\cdot 2406] \\approx 691.6',
          },
        ]}
      />

      <NoteBlock title="Tree Methods for Exotic Options on NSE" type="tip">
        <p>
          While NSE primarily trades vanilla European options on Nifty and Bank Nifty, tree methods
          are essential for: (1) American-style stock options where SEBI allows early exercise,
          (2) barrier options traded OTC by institutional desks, and (3) options with discrete
          dividend adjustments for individual stock options on NSE. The trinomial tree's extra
          node flexibility makes it particularly suited for barrier options where the barrier
          level should align with tree nodes.
        </p>
      </NoteBlock>

      <NoteBlock title="Computational Efficiency" type="warning">
        <p>
          A binomial tree with N steps requires O(N) memory and O(N^2) time. For real-time pricing
          of the entire Nifty option chain (200+ strikes x multiple expiries), vectorized
          implementations using NumPy are essential. The trinomial tree is roughly 3x slower per
          step but converges with fewer steps. For production systems at Indian brokerages,
          GPU-accelerated trees can price thousands of options per millisecond.
        </p>
      </NoteBlock>
    </div>
  )
}
