import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractivePCAScreePlot() {
  const [nStocks, setNStocks] = useState(20)
  const [marketCorr, setMarketCorr] = useState(0.4)

  // Simulate eigenvalue spectrum: first eigenvalue dominates, rest decay
  const eigenvalues = []
  const firstEig = nStocks * marketCorr
  eigenvalues.push(firstEig)
  let remaining = nStocks - firstEig
  for (let i = 1; i < Math.min(nStocks, 15); i++) {
    const val = remaining * 0.35 * Math.pow(0.65, i - 1)
    eigenvalues.push(Math.max(val, 0.1))
    remaining -= val
  }
  eigenvalues.sort((a, b) => b - a)

  const totalVar = eigenvalues.reduce((s, v) => s + v, 0)
  const explained = eigenvalues.map(v => v / totalVar)
  const cumulative = []
  let cumul = 0
  for (const e of explained) {
    cumul += e
    cumulative.push(cumul)
  }

  const chartW = 480
  const chartH = 200
  const padL = 55
  const padR = 15
  const padT = 20
  const padB = 35
  const plotW = chartW - padL - padR
  const plotH = chartH - padT - padB
  const nBars = Math.min(eigenvalues.length, 10)
  const barW = plotW / nBars * 0.6
  const gap = plotW / nBars

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Scree Plot for Nifty Stocks PCA
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust the number of stocks and average pairwise correlation to see how the
        eigenvalue spectrum changes. Higher correlation concentrates variance in the first
        principal component (the "market factor").
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Number of stocks: {nStocks}</span>
          <input type="range" min="5" max="50" step="1" value={nStocks}
            onChange={e => setNStocks(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Avg correlation: {marketCorr.toFixed(2)}</span>
          <input type="range" min="0.05" max="0.8" step="0.05" value={marketCorr}
            onChange={e => setMarketCorr(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full max-w-lg mx-auto block">
        <line x1={padL} y1={padT + plotH} x2={padL + plotW} y2={padT + plotH} stroke="#9ca3af" strokeWidth="1" />
        <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke="#9ca3af" strokeWidth="1" />

        {/* Bars for individual variance explained */}
        {Array.from({ length: nBars }, (_, i) => {
          const x = padL + i * gap + gap * 0.2
          const h = explained[i] * plotH
          return (
            <g key={i}>
              <rect x={x} y={padT + plotH - h} width={barW} height={h}
                fill="#6366f1" opacity="0.7" rx="2" />
              <text x={x + barW / 2} y={padT + plotH + 12} textAnchor="middle"
                className="text-[8px]" fill="#6b7280">PC{i + 1}</text>
            </g>
          )
        })}

        {/* Cumulative line */}
        {cumulative.slice(0, nBars).map((c, i) => {
          const x = padL + i * gap + gap * 0.2 + barW / 2
          const y = padT + plotH - c * plotH
          return (
            <g key={`cum-${i}`}>
              {i > 0 && (
                <line
                  x1={padL + (i - 1) * gap + gap * 0.2 + barW / 2}
                  y1={padT + plotH - cumulative[i - 1] * plotH}
                  x2={x} y2={y}
                  stroke="#ef4444" strokeWidth="2" />
              )}
              <circle cx={x} cy={y} r="3" fill="#ef4444" />
            </g>
          )
        })}

        {/* Y-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1.0].map(v => (
          <text key={v} x={padL - 5} y={padT + plotH - v * plotH + 3} textAnchor="end"
            className="text-[9px]" fill="#6b7280">{(v * 100).toFixed(0)}%</text>
        ))}

        <text x={padL - 35} y={padT + plotH / 2} textAnchor="middle" className="text-[9px]" fill="#6b7280"
          transform={`rotate(-90,${padL - 35},${padT + plotH / 2})`}>Variance Explained</text>

        {/* Legend */}
        <rect x={padL + plotW - 100} y={padT + 5} width={10} height={8} fill="#6366f1" opacity="0.7" rx="1" />
        <text x={padL + plotW - 85} y={padT + 12} className="text-[8px]" fill="#6b7280">Individual</text>
        <line x1={padL + plotW - 100} y1={padT + 22} x2={padL + plotW - 90} y2={padT + 22} stroke="#ef4444" strokeWidth="2" />
        <text x={padL + plotW - 85} y={padT + 25} className="text-[8px]" fill="#ef4444">Cumulative</text>
      </svg>

      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        PC1 explains <strong>{(explained[0] * 100).toFixed(1)}%</strong> of total variance.
        First 3 PCs explain <strong>{(cumulative[Math.min(2, nBars - 1)] * 100).toFixed(1)}%</strong>.
      </p>
    </div>
  )
}

export default function PCASVD() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        PCA and SVD for Factor Extraction
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Principal Component Analysis (PCA) and Singular Value Decomposition (SVD) are the
        workhorses of statistical factor models in quantitative finance. Applied to the
        return matrix of Nifty 50 stocks, they reveal the latent risk factors -- market,
        sector, and style -- that drive Indian equity returns.
      </p>

      {/* --- PCA Definition --- */}
      <DefinitionBlock
        title="Principal Component Analysis (PCA)"
        label="Definition 2.1"
        definition={<>
          PCA finds orthogonal directions of maximum variance in a dataset. Given a centered
          return matrix <InlineMath math="X \in \mathbb{R}^{T \times n}" /> (T observations of
          n stocks), PCA computes the eigendecomposition of the sample covariance matrix{' '}
          <InlineMath math="\hat{\Sigma} = \frac{1}{T-1} X^\top X" />. The <InlineMath math="k" />-th
          principal component is the projection <InlineMath math="z_k = X \mathbf{q}_k" />,
          where <InlineMath math="\mathbf{q}_k" /> is the <InlineMath math="k" />-th eigenvector.
        </>}
        notation={<>
          PC loadings: <InlineMath math="Q = [\mathbf{q}_1, \ldots, \mathbf{q}_n]" />.
          PC scores: <InlineMath math="Z = XQ" />.
          Variance of PC<InlineMath math="_k" /> = <InlineMath math="\lambda_k" />.
        </>}
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The total variance is preserved: <InlineMath math="\sum_{k=1}^n \lambda_k = \text{tr}(\Sigma) = \sum_{i=1}^n \sigma_i^2" />.
        The fraction of variance explained by the first <InlineMath math="K" /> components is:
      </p>

      <BlockMath math="\text{FVE}(K) = \frac{\sum_{k=1}^{K} \lambda_k}{\sum_{k=1}^{n} \lambda_k}" />

      {/* --- SVD --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Singular Value Decomposition (SVD)
      </h3>

      <TheoremBlock
        title="SVD Theorem"
        label="Theorem 2.1"
        statement={<>
          Any matrix <InlineMath math="X \in \mathbb{R}^{T \times n}" /> can be decomposed as:
          <BlockMath math="X = U \Sigma V^\top" />
          where <InlineMath math="U \in \mathbb{R}^{T \times T}" /> (left singular vectors),{' '}
          <InlineMath math="\Sigma \in \mathbb{R}^{T \times n}" /> (diagonal matrix of singular
          values <InlineMath math="\sigma_1 \geq \sigma_2 \geq \cdots \geq 0" />), and{' '}
          <InlineMath math="V \in \mathbb{R}^{n \times n}" /> (right singular vectors). The
          columns of <InlineMath math="V" /> are the PC loading vectors, and the singular values
          satisfy <InlineMath math="\lambda_k = \sigma_k^2 / (T-1)" />.
        </>}
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        SVD is numerically more stable than eigendecomposition and is preferred for large
        return matrices. The truncated SVD <InlineMath math="X \approx U_K \Sigma_K V_K^\top" />{' '}
        gives the best rank-<InlineMath math="K" /> approximation in both the Frobenius and
        spectral norms (Eckart-Young theorem).
      </p>

      {/* --- Relationship between PCA and SVD --- */}
      <BlockMath math={`\\begin{aligned}
\\text{SVD:} \\quad & X = U \\Sigma V^\\top \\\\
\\text{Covariance:} \\quad & \\hat{\\Sigma} = \\frac{1}{T-1} X^\\top X = V \\frac{\\Sigma^2}{T-1} V^\\top \\\\
\\text{PC scores:} \\quad & Z = XV = U\\Sigma \\\\
\\text{PC loadings:} \\quad & V \\text{ (same as eigenvectors of } \\hat{\\Sigma}\\text{)}
\\end{aligned}`} />

      {/* --- Interactive Scree Plot --- */}
      <InteractivePCAScreePlot />

      {/* --- Financial Interpretation --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Interpreting Principal Components for Indian Stocks
      </h3>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        When PCA is applied to Nifty 50 daily returns, the principal components have clear
        financial interpretations:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">PC</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Var Explained</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Loading Pattern</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Interpretation</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">PC1</td>
              <td className="px-4 py-2">~45%</td>
              <td className="px-4 py-2">All loadings positive, roughly equal</td>
              <td className="px-4 py-2">Market factor (broad Nifty movement)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">PC2</td>
              <td className="px-4 py-2">~12%</td>
              <td className="px-4 py-2">IT stocks positive, Banks negative</td>
              <td className="px-4 py-2">IT vs Banking sector rotation</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">PC3</td>
              <td className="px-4 py-2">~7%</td>
              <td className="px-4 py-2">Large-cap positive, mid-cap negative</td>
              <td className="px-4 py-2">Size/capitalization factor</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-medium">PC4</td>
              <td className="px-4 py-2">~5%</td>
              <td className="px-4 py-2">Recent winners positive, losers negative</td>
              <td className="px-4 py-2">Momentum/mean-reversion</td>
            </tr>
          </tbody>
        </table>
      </div>

      <NoteBlock title="PCA for Nifty Options Risk" type="info">
        <p>
          PCA is also applied to the interest rate curve (G-Sec yields from RBI) and to the
          implied volatility surface of Nifty options. For G-Secs, the first 3 PCs explain
          ~99% of yield curve variation: level (parallel shift), slope (steepening/flattening),
          and curvature (butterfly). For Nifty options, PCA on the implied volatility surface
          captures the ATM level, skew, and term structure dimensions.
        </p>
      </NoteBlock>

      {/* --- Dimensionality Reduction for Factor Models --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Statistical Factor Models via PCA
      </h3>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A statistical factor model decomposes returns into factor and idiosyncratic components:
      </p>

      <BlockMath math="r_i = \alpha_i + \sum_{k=1}^{K} \beta_{ik} f_k + \epsilon_i" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="f_k" /> are the PC factors (scores) and{' '}
        <InlineMath math="\beta_{ik}" /> are the loadings. The covariance matrix can then be
        approximated using only <InlineMath math="K" /> factors:
      </p>

      <BlockMath math="\hat{\Sigma} \approx B \Lambda_K B^\top + D" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="B" /> is the <InlineMath math="n \times K" /> loading matrix,{' '}
        <InlineMath math="\Lambda_K" /> is the <InlineMath math="K \times K" /> diagonal eigenvalue
        matrix, and <InlineMath math="D" /> is a diagonal matrix of idiosyncratic variances.
        This reduces the number of parameters from <InlineMath math="n(n+1)/2" /> (full covariance)
        to <InlineMath math="nK + n" /> (factor model), which is critical for stable estimation
        with Nifty 50 stocks.
      </p>

      {/* --- Python Code --- */}
      <PythonCode
        title="pca_nifty_factors.py"
        runnable
        code={`import numpy as np
from numpy.linalg import svd

np.random.seed(42)

# Simulate daily returns for 20 NSE stocks (1 year = 252 days)
n_stocks = 20
n_days = 252
stock_names = ['TCS', 'Infosys', 'Wipro', 'HCLTech', 'TechM',
               'HDFC', 'ICICI', 'Kotak', 'Axis', 'SBI',
               'Reliance', 'ITC', 'HUL', 'Nestle', 'Asian Paints',
               'Tata Steel', 'JSW Steel', 'Hindalco', 'Sun Pharma', 'Dr Reddy']

# Generate returns with sector structure
# 3 latent factors: market, IT-vs-Banks, metals
market_factor = np.random.normal(0.0004, 0.012, n_days)
sector_factor = np.random.normal(0, 0.008, n_days)
metals_factor = np.random.normal(0, 0.01, n_days)

# Factor loadings (sector-dependent)
loadings = np.zeros((n_stocks, 3))
loadings[:, 0] = np.random.uniform(0.7, 1.3, n_stocks)  # market
loadings[:5, 1] = np.random.uniform(0.5, 1.0, 5)   # IT positive
loadings[5:10, 1] = np.random.uniform(-1.0, -0.5, 5)  # Banks negative
loadings[15:18, 2] = np.random.uniform(0.7, 1.2, 3)  # Metals

factors = np.column_stack([market_factor, sector_factor, metals_factor])
returns = factors @ loadings.T + np.random.normal(0, 0.015, (n_days, n_stocks))

# Center the returns
returns_centered = returns - returns.mean(axis=0)

# --- PCA via SVD ---
U, s, Vt = svd(returns_centered, full_matrices=False)
eigenvalues = s**2 / (n_days - 1)
total_var = np.sum(eigenvalues)

print("=== PCA of NSE Stock Returns (SVD) ===")
print(f"Stocks: {n_stocks}, Days: {n_days}")
print(f"Total variance: {total_var:.6f}")
print()

print("Eigenvalue Spectrum:")
cumul = 0
for i in range(min(8, n_stocks)):
    pct = eigenvalues[i] / total_var * 100
    cumul += pct
    bar = '█' * int(pct / 2)
    print(f"  PC{i+1:2d}: λ={eigenvalues[i]:.6f} ({pct:5.1f}%) cumul={cumul:5.1f}% {bar}")

# --- PC Loadings Interpretation ---
print("\\n=== PC1 Loadings (Market Factor) ===")
pc1_loadings = Vt[0, :]
for name, loading in zip(stock_names, pc1_loadings):
    bar = '+' * int(abs(loading) * 40) if loading >= 0 else '-' * int(abs(loading) * 40)
    print(f"  {name:>12}: {loading:+.3f} {bar}")

print("\\n=== PC2 Loadings (IT vs Banks) ===")
pc2_loadings = Vt[1, :]
for name, loading in zip(stock_names, pc2_loadings):
    bar = '+' * int(abs(loading) * 40) if loading >= 0 else '-' * int(abs(loading) * 40)
    print(f"  {name:>12}: {loading:+.3f} {bar}")

# --- Factor Model Covariance vs Full Covariance ---
K = 3  # Use 3 factors
B = Vt[:K, :].T  # n x K loading matrix
Lambda_K = np.diag(eigenvalues[:K])
Sigma_factor = B @ Lambda_K @ B.T

# Idiosyncratic variance
residuals = returns_centered - (returns_centered @ B) @ B.T
D = np.diag(np.var(residuals, axis=0, ddof=1))
Sigma_approx = Sigma_factor + D

Sigma_full = np.cov(returns_centered, rowvar=False)
approx_error = np.linalg.norm(Sigma_full - Sigma_approx, 'fro') / np.linalg.norm(Sigma_full, 'fro')
print(f"\\n=== Factor Model Approximation (K={K}) ===")
print(f"Full covariance params:   {n_stocks*(n_stocks+1)//2}")
print(f"Factor model params:      {n_stocks*K + n_stocks}")
print(f"Relative Frobenius error: {approx_error:.4f}")
print(f"Reduction ratio:          {(n_stocks*K + n_stocks)/(n_stocks*(n_stocks+1)//2):.2f}x")`}
      />

      {/* --- Worked Example --- */}
      <ExampleBlock
        title="How Many Factors for Nifty 50?"
        difficulty="intermediate"
        problem="The first 5 eigenvalues of the Nifty 50 daily return covariance matrix are [0.0028, 0.0006, 0.0004, 0.0003, 0.0002]. Total variance is 0.0065. How many factors should we use?"
        solution={[
          {
            step: 'Compute cumulative variance explained',
            formula: '\\text{FVE}(1) = 43.1\\%, \\; \\text{FVE}(2) = 52.3\\%, \\; \\text{FVE}(3) = 58.5\\%, \\; \\text{FVE}(4) = 63.1\\%, \\; \\text{FVE}(5) = 66.2\\%',
          },
          {
            step: 'Apply the Kaiser rule (eigenvalue > average)',
            formula: '\\bar{\\lambda} = 0.0065 / 50 = 0.00013. \\; \\text{PCs 1-5 all exceed this.}',
            explanation: 'Kaiser rule: keep PCs with eigenvalue above the average. This gives ~5 factors for Nifty 50.',
          },
          {
            step: 'Consider the practical threshold (80% FVE)',
            formula: '\\text{Need approximately } K = 8 \\text{--} 10 \\text{ PCs for 80% FVE}',
            explanation: 'In practice, 3-5 statistical factors capture the main risk structure. The "elbow" in the scree plot typically occurs at K=3 for Indian equities.',
          },
        ]}
      />

      {/* --- Key Takeaway --- */}
      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          PCA/SVD reveal that the returns of 50 Nifty stocks are driven by far fewer than
          50 independent risk sources. Typically, 3--5 principal components explain 60--70%
          of total variance. This dimensional reduction is essential for: (1) building stable
          covariance estimates, (2) constructing factor-neutral portfolios, (3) risk decomposition,
          and (4) detecting regime changes in Indian market structure. Use SVD rather than
          eigendecomposition for better numerical stability with large return matrices.
        </p>
      </NoteBlock>
    </div>
  )
}
