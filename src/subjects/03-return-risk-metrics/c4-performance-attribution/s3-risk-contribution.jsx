import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveRiskContribution() {
  const [w1, setW1] = useState(40)
  const [w2, setW2] = useState(35)
  const [vol1, setVol1] = useState(22)
  const [vol2, setVol2] = useState(28)
  const [corr, setCorr] = useState(0.65)

  const w3 = 100 - w1 - w2
  const vol3 = 18
  const weights = [w1 / 100, w2 / 100, Math.max(0, w3) / 100]
  const vols = [vol1 / 100, vol2 / 100, vol3 / 100]

  const portVar = weights[0] ** 2 * vols[0] ** 2
    + weights[1] ** 2 * vols[1] ** 2
    + weights[2] ** 2 * vols[2] ** 2
    + 2 * weights[0] * weights[1] * vols[0] * vols[1] * corr
    + 2 * weights[0] * weights[2] * vols[0] * vols[2] * 0.4
    + 2 * weights[1] * weights[2] * vols[1] * vols[2] * 0.5
  const portVol = Math.sqrt(Math.max(portVar, 0.0001))

  const mcr1 = (weights[0] * vols[0] ** 2 + weights[1] * vols[0] * vols[1] * corr + weights[2] * vols[0] * vols[2] * 0.4) / portVol
  const mcr2 = (weights[1] * vols[1] ** 2 + weights[0] * vols[0] * vols[1] * corr + weights[2] * vols[1] * vols[2] * 0.5) / portVol
  const mcr3 = (weights[2] * vols[2] ** 2 + weights[0] * vols[0] * vols[2] * 0.4 + weights[1] * vols[1] * vols[2] * 0.5) / portVol

  const rc1 = weights[0] * mcr1
  const rc2 = weights[1] * mcr2
  const rc3 = weights[2] * mcr3
  const totalRC = rc1 + rc2 + rc3

  const pctRC1 = (rc1 / totalRC * 100) || 0
  const pctRC2 = (rc2 / totalRC * 100) || 0
  const pctRC3 = (rc3 / totalRC * 100) || 0

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Risk Contribution Analysis
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust weights, volatilities, and correlations for a 3-asset NSE portfolio
        (Banking, IT, FMCG) to see how risk concentrates.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-5">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Banking Wt: {w1}%</span>
          <input type="range" min="0" max="80" step="1" value={w1}
            onChange={e => setW1(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>IT Wt: {w2}%</span>
          <input type="range" min="0" max="80" step="1" value={w2}
            onChange={e => setW2(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Banking Vol: {vol1}%</span>
          <input type="range" min="10" max="40" step="1" value={vol1}
            onChange={e => setVol1(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>IT Vol: {vol2}%</span>
          <input type="range" min="10" max="40" step="1" value={vol2}
            onChange={e => setVol2(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Bank-IT Corr: {corr.toFixed(2)}</span>
          <input type="range" min="-0.5" max="1.0" step="0.05" value={corr}
            onChange={e => setCorr(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">Portfolio Vol</p>
          <p className="text-lg font-bold text-blue-800 dark:text-blue-200">{(portVol * 100).toFixed(1)}%</p>
        </div>
        <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/30">
          <p className="text-xs font-semibold text-red-700 dark:text-red-300">Banking RC</p>
          <p className="text-lg font-bold text-red-800 dark:text-red-200">{pctRC1.toFixed(1)}%</p>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
          <p className="text-xs font-semibold text-purple-700 dark:text-purple-300">IT RC</p>
          <p className="text-lg font-bold text-purple-800 dark:text-purple-200">{pctRC2.toFixed(1)}%</p>
        </div>
        <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/30">
          <p className="text-xs font-semibold text-green-700 dark:text-green-300">FMCG RC</p>
          <p className="text-lg font-bold text-green-800 dark:text-green-200">{pctRC3.toFixed(1)}%</p>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
        {pctRC1 > 60
          ? <span className="font-semibold text-red-500">Risk highly concentrated in Banking -- consider reducing exposure.</span>
          : <span className="font-semibold text-green-600 dark:text-green-400">Risk is reasonably diversified across sectors.</span>
        }
      </p>
    </div>
  )
}

export default function RiskContribution() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Risk Contribution and Risk Budgeting
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        While Brinson attribution decomposes <em>return</em>, risk contribution analysis
        decomposes <em>risk</em>. In a portfolio of Nifty 50 stocks, some positions contribute
        disproportionately to portfolio risk due to their volatility and correlations. Risk
        budgeting allows you to set explicit risk allocation targets, ensuring that no single
        position or sector dominates your risk profile.
      </p>

      <DefinitionBlock
        title="Marginal Risk Contribution (MRC)"
        label="Definition 4.3"
        definition="The marginal risk contribution of asset i is the partial derivative of portfolio volatility with respect to the weight of asset i. It measures how much additional risk a small increase in position i adds to the portfolio."
        notation="\text{MRC}_i = \frac{\partial \sigma_p}{\partial w_i} = \frac{(\Sigma \mathbf{w})_i}{\sigma_p}"
      />

      <DefinitionBlock
        title="Component Risk Contribution (CRC)"
        label="Definition 4.4"
        definition="The component risk contribution is the product of the weight and marginal risk contribution. By Euler's theorem, the sum of all component risk contributions equals portfolio volatility."
        notation="\text{CRC}_i = w_i \times \text{MRC}_i = \frac{w_i (\Sigma \mathbf{w})_i}{\sigma_p}"
      />

      <TheoremBlock
        title="Euler Decomposition of Portfolio Risk"
        label="Theorem 4.3"
        statement="Portfolio volatility can be exactly decomposed into the sum of component risk contributions. This follows from Euler's theorem for homogeneous functions, since portfolio volatility is homogeneous of degree 1 in weights."
        formula="\sigma_p = \sum_{i=1}^{N} w_i \frac{\partial \sigma_p}{\partial w_i} = \sum_{i=1}^{N} \text{CRC}_i"
        proof="Portfolio variance \sigma_p^2 = \mathbf{w}^\top \Sigma \mathbf{w} is homogeneous of degree 2 in \mathbf{w}. Therefore \sigma_p = \sqrt{\mathbf{w}^\top \Sigma \mathbf{w}} is homogeneous of degree 1. By Euler's theorem for homogeneous functions: f(\mathbf{w}) = \sum_i w_i \frac{\partial f}{\partial w_i} when f is homogeneous of degree 1. Applying this to \sigma_p gives the exact decomposition \sigma_p = \sum_i w_i \cdot \text{MRC}_i = \sum_i \text{CRC}_i."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Risk Parity (Equal Risk Contribution)
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A risk parity portfolio is one where each asset contributes equally to total risk:
      </p>

      <BlockMath math="\text{CRC}_i = \frac{\sigma_p}{N} \quad \forall i \quad \Leftrightarrow \quad w_i \cdot \text{MRC}_i = w_j \cdot \text{MRC}_j \quad \forall i,j" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        This is equivalent to finding weights such that the percentage risk contribution
        is <InlineMath math="1/N" /> for each asset. For Indian portfolios mixing equities
        (volatile) with bonds (stable), risk parity naturally reduces equity allocation
        relative to market-cap weighting.
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Approach</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Objective</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Pro</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Con</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Equal Weight</td>
              <td className="px-4 py-2"><InlineMath math="w_i = 1/N" /></td>
              <td className="px-4 py-2">Simple</td>
              <td className="px-4 py-2">Ignores correlations</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Risk Parity</td>
              <td className="px-4 py-2"><InlineMath math="\text{CRC}_i = \sigma_p/N" /></td>
              <td className="px-4 py-2">Balanced risk</td>
              <td className="px-4 py-2">Needs covariance</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Inverse Vol</td>
              <td className="px-4 py-2"><InlineMath math="w_i \propto 1/\sigma_i" /></td>
              <td className="px-4 py-2">Easy to compute</td>
              <td className="px-4 py-2">Ignores correlations</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Risk Budget</td>
              <td className="px-4 py-2"><InlineMath math="\text{CRC}_i = b_i \sigma_p" /></td>
              <td className="px-4 py-2">Flexible targets</td>
              <td className="px-4 py-2">Complex optimization</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveRiskContribution />

      <PythonCode
        title="risk_contribution.py"
        runnable
        code={`import numpy as np
from scipy.optimize import minimize

# NSE Sector Portfolio: Banking, IT, Energy, FMCG, Pharma
sectors = ['Banking', 'IT', 'Energy', 'FMCG', 'Pharma']
n = len(sectors)

# Annual volatilities (typical for NSE sectors)
vols = np.array([0.24, 0.26, 0.30, 0.16, 0.22])

# Correlation matrix (estimated from NSE data)
corr_matrix = np.array([
    [1.00, 0.55, 0.50, 0.35, 0.30],
    [0.55, 1.00, 0.40, 0.30, 0.35],
    [0.50, 0.40, 1.00, 0.25, 0.20],
    [0.35, 0.30, 0.25, 1.00, 0.40],
    [0.30, 0.35, 0.20, 0.40, 1.00],
])

# Covariance matrix
cov_matrix = np.outer(vols, vols) * corr_matrix

# --- Current portfolio weights (market-cap-like) ---
w_current = np.array([0.35, 0.20, 0.15, 0.15, 0.15])

def portfolio_risk(w, cov):
    return np.sqrt(w @ cov @ w)

def marginal_risk(w, cov):
    sigma = portfolio_risk(w, cov)
    return (cov @ w) / sigma

def risk_contribution(w, cov):
    mcr = marginal_risk(w, cov)
    return w * mcr

def pct_risk_contribution(w, cov):
    rc = risk_contribution(w, cov)
    return rc / rc.sum() * 100

# --- Current Portfolio Risk Decomposition ---
sigma_p = portfolio_risk(w_current, cov_matrix)
mcr = marginal_risk(w_current, cov_matrix)
rc = risk_contribution(w_current, cov_matrix)
prc = pct_risk_contribution(w_current, cov_matrix)

print("=== Risk Contribution Analysis (NSE Sectors) ===\\n")
print(f"{'Sector':<10} {'Weight':>8} {'Vol':>8} {'MRC':>8} {'CRC':>8} {'% Risk':>8}")
print("-" * 55)
for i in range(n):
    print(f"{sectors[i]:<10} {w_current[i]*100:>7.1f}% {vols[i]*100:>7.1f}% "
          f"{mcr[i]*100:>7.2f}% {rc[i]*100:>7.2f}% {prc[i]:>7.1f}%")
print(f"{'Total':<10} {100:>7.0f}%  {'':>7s} {'':>7s} {sigma_p*100:>7.2f}% {100:>7.1f}%")

# --- Risk Parity Portfolio ---
def risk_parity_obj(w, cov):
    rc = risk_contribution(w, cov)
    target = np.ones(n) / n
    prc = rc / rc.sum()
    return np.sum((prc - target)**2)

constraints = {'type': 'eq', 'fun': lambda w: np.sum(w) - 1}
bounds = [(0.05, 0.50)] * n
result = minimize(risk_parity_obj, w_current, args=(cov_matrix,),
                  method='SLSQP', bounds=bounds, constraints=constraints)

w_rp = result.x
sigma_rp = portfolio_risk(w_rp, cov_matrix)
prc_rp = pct_risk_contribution(w_rp, cov_matrix)

print(f"\\n=== Risk Parity Portfolio ===")
print(f"{'Sector':<10} {'Weight':>8} {'% Risk':>8}")
print("-" * 28)
for i in range(n):
    print(f"{sectors[i]:<10} {w_rp[i]*100:>7.1f}% {prc_rp[i]:>7.1f}%")
print(f"\\nPortfolio Vol: Current = {sigma_p*100:.2f}%, Risk Parity = {sigma_rp*100:.2f}%")
print(f"Vol reduction: {(sigma_p - sigma_rp)/sigma_p*100:.1f}%")
print(f"\\nRisk parity reduces Banking overweight and increases FMCG allocation.")`}
      />

      <ExampleBlock
        title="Risk Concentration in a Nifty Portfolio"
        difficulty="intermediate"
        problem="A portfolio has 40% in Banking (vol=24%), 30% in IT (vol=26%), 30% in FMCG (vol=16%). Correlation between Banking and IT is 0.6, Banking-FMCG is 0.3, IT-FMCG is 0.3. Compute portfolio vol and Banking's percentage risk contribution."
        solution={[
          {
            step: 'Compute portfolio variance',
            formula: '\\sigma_p^2 = 0.4^2(0.24)^2 + 0.3^2(0.26)^2 + 0.3^2(0.16)^2 + 2(0.4)(0.3)(0.24)(0.26)(0.6) + \\cdots',
            explanation: 'Including all cross terms, portfolio variance = 0.0295, so portfolio vol = 17.2%.',
          },
          {
            step: 'Compute Banking MCR',
            formula: '\\text{MRC}_{\\text{Bank}} = \\frac{(\\Sigma \\mathbf{w})_1}{\\sigma_p} = \\frac{0.4(0.24)^2 + 0.3(0.24)(0.26)(0.6) + 0.3(0.24)(0.16)(0.3)}{0.172}',
            explanation: 'MCR for Banking is approximately 21.5%.',
          },
          {
            step: 'Percentage risk contribution',
            formula: '\\text{\\%RC}_{\\text{Bank}} = \\frac{w_{\\text{Bank}} \\times \\text{MRC}_{\\text{Bank}}}{\\sigma_p} = \\frac{0.40 \\times 0.215}{0.172} \\approx 50\\%',
            explanation: 'Banking contributes ~50% of total risk despite being only 40% of the portfolio weight -- the risk is concentrated due to high volatility and correlation with IT.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Risk contribution analysis reveals hidden concentrations that weight-based analysis
          misses. In typical Indian portfolios, Banking stocks contribute 40-60% of total risk
          due to their high volatility and correlation. Risk parity rebalances toward
          lower-volatility sectors (FMCG, Pharma), reducing overall portfolio risk. For
          SEBI-regulated portfolios, risk budgeting ensures that no single sector or factor
          dominates -- a crucial practice for risk management in Indian markets.
        </p>
      </NoteBlock>
    </div>
  )
}
