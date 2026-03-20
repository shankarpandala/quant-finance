import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveViewBlending() {
  const [viewStrength, setViewStrength] = useState(0.5)
  const [viewConfidence, setViewConfidence] = useState(50)
  const [tau, setTau] = useState(0.05)

  const equilibriumReturn = 0.12
  const viewReturn = 0.18
  const omega = (100 - viewConfidence) / 100 * 0.05
  const tauSigma = tau * 0.04

  const blendedReturn = (tauSigma * viewReturn / omega + equilibriumReturn) / (tauSigma / omega + 1)
  const blendedVol = Math.sqrt(1 / (1 / tauSigma + 1 / omega))

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: View Blending (Single Asset)
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        See how view confidence and tau affect the blended return for an Indian stock.
      </p>

      <div className="mb-4 grid grid-cols-3 gap-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math="\tau" /> = {tau.toFixed(3)}</span>
          <input type="range" min="0.01" max="0.20" step="0.005" value={tau}
            onChange={e => setTau(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>View Confidence: {viewConfidence}%</span>
          <input type="range" min="10" max="95" step="5" value={viewConfidence}
            onChange={e => setViewConfidence(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>View Return: {(viewReturn * 100).toFixed(0)}%</span>
          <input type="range" min="0.05" max="0.30" step="0.01" value={viewStrength}
            onChange={e => setViewStrength(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 400 100" className="w-full max-w-md mx-auto block">
        <line x1={50} y1={50} x2={350} y2={50} stroke="#d1d5db" strokeWidth="2" />
        {/* Equilibrium */}
        <circle cx={50 + equilibriumReturn * 1500} cy={50} r="6" fill="#6366f1" />
        <text x={50 + equilibriumReturn * 1500} y={35} textAnchor="middle" className="text-[9px] fill-indigo-600 font-semibold">
          Equil: {(equilibriumReturn * 100).toFixed(1)}%
        </text>
        {/* View */}
        <circle cx={50 + viewReturn * 1500} cy={50} r="6" fill="#f59e0b" />
        <text x={50 + viewReturn * 1500} y={35} textAnchor="middle" className="text-[9px] fill-amber-600 font-semibold">
          View: {(viewReturn * 100).toFixed(1)}%
        </text>
        {/* Blended */}
        <circle cx={50 + blendedReturn * 1500} cy={50} r="8" fill="#22c55e" stroke="#fff" strokeWidth="2" />
        <text x={50 + blendedReturn * 1500} y={75} textAnchor="middle" className="text-[10px] fill-green-600 font-bold">
          BL: {(blendedReturn * 100).toFixed(2)}%
        </text>
      </svg>
    </div>
  )
}

export default function ViewsBlending() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Views and Blending in Black-Litterman
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The Black-Litterman model&rsquo;s second key ingredient is the ability to incorporate
        investor views on expected returns. Views can be absolute (&ldquo;Nifty IT will return
        15%&rdquo;) or relative (&ldquo;IT will outperform Banking by 3%&rdquo;). The model
        blends these views with equilibrium returns using Bayesian updating, producing a posterior
        distribution that tilts away from market-cap weights toward the views.
      </p>

      <DefinitionBlock
        title="Black-Litterman View Structure"
        label="Definition 9.10"
        definition="Views are expressed as P × μ = Q + ε, where P is a K×N pick matrix identifying which assets are involved in each view, Q is a K×1 vector of expected returns from the views, and ε ~ N(0, Ω) represents view uncertainty. Ω is a K×K diagonal matrix of view confidence levels."
        notation="P = pick matrix, Q = view returns, Ω = view uncertainty matrix, K = number of views"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Types of Views
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        <strong>Absolute view:</strong> &ldquo;TCS will return 15% annually.&rdquo;
        Row of P: <InlineMath math="[0, 1, 0, \ldots, 0]" />, Q entry: 0.15.
      </p>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        <strong>Relative view:</strong> &ldquo;Nifty IT will outperform Nifty Bank by 3%.&rdquo;
        Row of P: <InlineMath math="[0, \ldots, +1, \ldots, -1, \ldots, 0]" />, Q entry: 0.03.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Black-Litterman Master Formula
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The posterior expected returns combine equilibrium and views via Bayesian updating:
      </p>

      <BlockMath math="\boldsymbol{\mu}_{\text{BL}} = \left[(\tau\Sigma)^{-1} + P^\top \Omega^{-1} P\right]^{-1} \left[(\tau\Sigma)^{-1}\boldsymbol{\Pi} + P^\top \Omega^{-1} \mathbf{Q}\right]" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The posterior covariance is:
      </p>

      <BlockMath math="\bar{\Sigma} = \left[(\tau\Sigma)^{-1} + P^\top \Omega^{-1} P\right]^{-1} + \Sigma" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\tau" /> is a scalar (typically 0.025-0.05) representing the
        uncertainty in the equilibrium prior. It controls the relative weight given to equilibrium
        vs. views.
      </p>

      <TheoremBlock
        title="Black-Litterman as Bayesian Update"
        label="Theorem 9.8"
        statement="The BL posterior is the result of a Bayesian conjugate update: Prior: μ ~ N(Π, τΣ), Likelihood: Pμ = Q + ε where ε ~ N(0, Ω). The posterior is μ|Q ~ N(μ_BL, Σ_BL) where μ_BL and Σ_BL are given by the master formula."
        proof="This follows directly from the conjugate normal-normal model. The prior precision is (τΣ)⁻¹ and the likelihood precision is P'Ω⁻¹P. The posterior precision is their sum, and the posterior mean is the precision-weighted average of prior mean and observed data."
      />

      <InteractiveViewBlending />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Setting View Confidence (Omega)
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The uncertainty matrix <InlineMath math="\Omega" /> controls how much the views tilt the
        posterior. He and Litterman (1999) suggested:
      </p>

      <BlockMath math="\Omega = \text{diag}(P(\tau\Sigma)P^\top)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        This sets view uncertainty proportional to the equilibrium uncertainty of the assets
        involved. Alternatively, Idzorek (2005) proposed a confidence-based approach where
        analysts specify a percentage confidence (0-100%) for each view.
      </p>

      <PythonCode
        title="black_litterman_nifty.py"
        runnable
        code={`import numpy as np

# Top 8 Nifty 50 stocks
tickers = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK',
           'ITC', 'LT', 'AXISBANK']
n = len(tickers)

# Market-cap weights (normalized)
w_mkt = np.array([0.15, 0.12, 0.10, 0.08, 0.07, 0.06, 0.05, 0.04])
w_mkt /= w_mkt.sum()

# Covariance matrix
vols = np.array([0.28, 0.22, 0.22, 0.24, 0.24, 0.20, 0.28, 0.28])
np.random.seed(42)
corr_base = np.full((n, n), 0.35)
np.fill_diagonal(corr_base, 1.0)
# Higher intra-sector correlations
corr_base[1, 3] = corr_base[3, 1] = 0.72  # TCS-INFY (IT)
corr_base[2, 4] = corr_base[4, 2] = 0.78  # HDFC-ICICI (Banking)
corr_base[2, 7] = corr_base[7, 2] = 0.70  # HDFC-Axis (Banking)
corr_base[4, 7] = corr_base[7, 4] = 0.75  # ICICI-Axis (Banking)
Sigma = np.outer(vols, vols) * corr_base

# Risk aversion and equilibrium returns
delta = 1.85
tau = 0.05
Pi = delta * Sigma @ w_mkt

print("=== Equilibrium Returns (Prior) ===")
for t, pi in zip(tickers, Pi):
    print(f"  {t:<12}: {pi:.4f} ({pi+0.065:.2%} total)")

# === Views ===
# View 1 (Absolute): IT sector (TCS) will return 16% (excess ~9.5%)
# View 2 (Relative): Banking (HDFCBANK) will outperform Energy (RELIANCE) by 3%
# View 3 (Absolute): L&T will return 18% (excess ~11.5%)
K = 3
P = np.zeros((K, n))
Q = np.zeros(K)

# View 1: TCS absolute return of 16%
P[0, 1] = 1  # TCS
Q[0] = 0.095  # 16% - 6.5% rf

# View 2: HDFCBANK outperforms RELIANCE by 3%
P[1, 2] = 1   # HDFCBANK
P[1, 0] = -1  # RELIANCE
Q[1] = 0.03

# View 3: L&T absolute return of 18%
P[2, 6] = 1  # LT
Q[2] = 0.115

# View uncertainty (He-Litterman method)
Omega = np.diag(np.diag(P @ (tau * Sigma) @ P.T))

# Black-Litterman posterior
tau_Sigma_inv = np.linalg.inv(tau * Sigma)
Omega_inv = np.linalg.inv(Omega)

# Posterior mean
M = np.linalg.inv(tau_Sigma_inv + P.T @ Omega_inv @ P)
mu_BL = M @ (tau_Sigma_inv @ Pi + P.T @ Omega_inv @ Q)

# Posterior covariance
Sigma_BL = M + Sigma

# Optimal weights
w_BL = np.linalg.inv(delta * Sigma_BL) @ mu_BL
w_BL = w_BL / w_BL.sum()  # Normalize

print(f"\\n=== Black-Litterman Posterior ===")
print(f"{'Ticker':<12} {'Equil':>8} {'BL Post':>8} {'Mkt Wt':>8} {'BL Wt':>8} {'Delta':>8}")
print("-" * 55)
for t, pi, mu, wm, wb in zip(tickers, Pi, mu_BL, w_mkt, w_BL):
    print(f"{t:<12} {pi:>8.4f} {mu:>8.4f} {wm:>8.4f} {wb:>8.4f} {wb-wm:>+8.4f}")

print(f"\\nViews:")
print(f"  1. TCS return = 16% -> BL tilts toward IT")
print(f"  2. HDFC > RELIANCE by 3% -> tilts toward banking")
print(f"  3. L&T return = 18% -> overweights L&T")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Views on Indian Sectors
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        In practice, views on Indian markets often come from:
      </p>
      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4">
        <li>Broker research: Analysts at ICICI Securities, Motilal Oswal, Kotak provide sector outlook</li>
        <li>RBI monetary policy: Rate cuts favor banking sector, rate hikes favor IT (USD earnings)</li>
        <li>Global commodity prices: Oil prices affect Reliance, ONGC, IOC</li>
        <li>Government policy: Budget announcements, PLI schemes for manufacturing</li>
        <li>FII/DII flow data published by SEBI and NSDL</li>
      </ul>

      <ExampleBlock
        title="Constructing a Relative View"
        difficulty="intermediate"
        problem="An analyst believes Nifty IT (TCS weight 0.6, Infosys weight 0.4) will outperform Nifty Bank (HDFC Bank weight 0.5, ICICI Bank weight 0.3, Axis Bank weight 0.2) by 4% over the next year. Express this as a BL view."
        solution={[
          {
            step: 'Construct the pick matrix row',
            formula: 'P_k = [0, +0.6, -0.5, +0.4, -0.3, 0, 0, -0.2]',
            explanation: 'Positive weights for IT stocks (proportional to intra-sector weights), negative for banking stocks.',
          },
          {
            step: 'Set the view return',
            formula: 'Q_k = 0.04',
            explanation: 'The expected outperformance is 4%.',
          },
          {
            step: 'Set view confidence',
            formula: '\\Omega_{kk} = P_k (\\tau \\Sigma) P_k^\\top',
            explanation: 'Using the He-Litterman method, confidence scales with the prior uncertainty of the assets involved.',
          },
        ]}
      />

      <NoteBlock title="Idzorek Confidence Method" type="tip">
        <p>
          Idzorek&rsquo;s method lets you express view confidence as a percentage (0-100%).
          At 100% confidence, the view fully overrides the equilibrium; at 0%, the equilibrium
          prevails. For Indian markets, typical confidences might be:
        </p>
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>RBI policy impact on banking: 60-80% confidence</li>
          <li>Earnings growth forecast for IT: 40-60% confidence</li>
          <li>Commodity price view: 30-50% confidence</li>
          <li>Budget-related sector bets: 20-40% confidence</li>
        </ul>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          The Black-Litterman model elegantly blends market equilibrium with investor views using
          Bayesian updating. For Indian market practitioners, it offers a disciplined framework to
          incorporate research views while anchoring to the Nifty 50 market-cap equilibrium. The
          result is portfolios that tilt meaningfully toward views without the extreme positions
          that raw mean-variance optimization produces.
        </p>
      </NoteBlock>
    </div>
  )
}
