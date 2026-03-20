import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveCovarianceMatrix() {
  const [corrTcsInfosys, setCorrTcsInfosys] = useState(0.65)
  const [corrTcsHdfc, setCorrTcsHdfc] = useState(0.35)
  const [corrInfosysHdfc, setCorrInfosysHdfc] = useState(0.30)
  const [volTcs, setVolTcs] = useState(0.22)
  const [volInfosys, setVolInfosys] = useState(0.25)
  const [volHdfc, setVolHdfc] = useState(0.28)

  const cov = [
    [volTcs * volTcs, corrTcsInfosys * volTcs * volInfosys, corrTcsHdfc * volTcs * volHdfc],
    [corrTcsInfosys * volTcs * volInfosys, volInfosys * volInfosys, corrInfosysHdfc * volInfosys * volHdfc],
    [corrTcsHdfc * volTcs * volHdfc, corrInfosysHdfc * volInfosys * volHdfc, volHdfc * volHdfc],
  ]

  const weights = [1 / 3, 1 / 3, 1 / 3]
  let portVar = 0
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      portVar += weights[i] * weights[j] * cov[i][j]
    }
  }
  const portVol = Math.sqrt(portVar)
  const avgVol = (volTcs + volInfosys + volHdfc) / 3
  const diversBenefit = 1 - portVol / avgVol

  const cellColor = (v) => {
    const intensity = Math.min(Math.abs(v) / 0.08, 1)
    if (v >= 0) return `rgba(99, 102, 241, ${intensity * 0.3})`
    return `rgba(239, 68, 68, ${intensity * 0.3})`
  }

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Covariance Matrix of Indian Stocks
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust correlations and volatilities for TCS, Infosys, and HDFC Bank to see how
        the covariance matrix and portfolio risk change.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math="\rho" />(TCS, Infosys) = {corrTcsInfosys.toFixed(2)}</span>
          <input type="range" min="-0.5" max="0.95" step="0.05" value={corrTcsInfosys}
            onChange={e => setCorrTcsInfosys(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math="\rho" />(TCS, HDFC) = {corrTcsHdfc.toFixed(2)}</span>
          <input type="range" min="-0.5" max="0.95" step="0.05" value={corrTcsHdfc}
            onChange={e => setCorrTcsHdfc(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math="\rho" />(Infosys, HDFC) = {corrInfosysHdfc.toFixed(2)}</span>
          <input type="range" min="-0.5" max="0.95" step="0.05" value={corrInfosysHdfc}
            onChange={e => setCorrInfosysHdfc(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math="\sigma" />(TCS) = {(volTcs * 100).toFixed(0)}%</span>
          <input type="range" min="0.1" max="0.5" step="0.01" value={volTcs}
            onChange={e => setVolTcs(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math="\sigma" />(Infosys) = {(volInfosys * 100).toFixed(0)}%</span>
          <input type="range" min="0.1" max="0.5" step="0.01" value={volInfosys}
            onChange={e => setVolInfosys(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math="\sigma" />(HDFC) = {(volHdfc * 100).toFixed(0)}%</span>
          <input type="range" min="0.1" max="0.5" step="0.01" value={volHdfc}
            onChange={e => setVolHdfc(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      {/* Covariance matrix display */}
      <div className="overflow-x-auto">
        <table className="mx-auto text-sm border-collapse">
          <thead>
            <tr>
              <th className="px-3 py-2 text-gray-500 dark:text-gray-400"></th>
              <th className="px-3 py-2 text-gray-600 dark:text-gray-400">TCS</th>
              <th className="px-3 py-2 text-gray-600 dark:text-gray-400">Infosys</th>
              <th className="px-3 py-2 text-gray-600 dark:text-gray-400">HDFC Bank</th>
            </tr>
          </thead>
          <tbody>
            {['TCS', 'Infosys', 'HDFC Bank'].map((name, i) => (
              <tr key={name}>
                <td className="px-3 py-2 font-medium text-gray-600 dark:text-gray-400">{name}</td>
                {cov[i].map((v, j) => (
                  <td key={j} className="px-3 py-2 text-center font-mono text-xs" style={{ backgroundColor: cellColor(v) }}>
                    {v.toFixed(4)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
        <div className="rounded bg-indigo-50 p-2 dark:bg-indigo-900/30">
          <div className="text-xs text-indigo-600 dark:text-indigo-400">Portfolio Vol</div>
          <div className="font-bold text-indigo-700 dark:text-indigo-300">{(portVol * 100).toFixed(1)}%</div>
        </div>
        <div className="rounded bg-gray-50 p-2 dark:bg-gray-800">
          <div className="text-xs text-gray-500 dark:text-gray-400">Avg Stock Vol</div>
          <div className="font-bold text-gray-700 dark:text-gray-300">{(avgVol * 100).toFixed(1)}%</div>
        </div>
        <div className="rounded bg-green-50 p-2 dark:bg-green-900/30">
          <div className="text-xs text-green-600 dark:text-green-400">Diversification</div>
          <div className="font-bold text-green-700 dark:text-green-300">{(diversBenefit * 100).toFixed(1)}%</div>
        </div>
      </div>
    </div>
  )
}

export default function MatrixOperations() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Matrix Operations for Portfolio Analysis
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Linear algebra is the language of modern portfolio theory. Every portfolio optimization,
        risk decomposition, and factor model on the NSE relies on matrix operations. This
        section covers the essential matrix concepts needed for quantitative finance, with
        emphasis on the covariance matrix of Indian equities.
      </p>

      {/* --- Vectors in Finance --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Vectors: Portfolios and Returns
      </h3>

      <DefinitionBlock
        title="Portfolio Weight Vector"
        label="Definition 1.1"
        definition={<>
          A portfolio of <InlineMath math="n" /> assets is represented by a weight vector{' '}
          <InlineMath math="\mathbf{w} \in \mathbb{R}^n" /> where <InlineMath math="w_i" /> is
          the fraction of capital allocated to asset <InlineMath math="i" />. For a
          fully-invested long-only portfolio: <InlineMath math="\mathbf{1}^\top \mathbf{w} = 1" />{' '}
          and <InlineMath math="w_i \geq 0" />.
        </>}
        notation={<>
          Return vector: <InlineMath math="\mathbf{r} = (r_1, r_2, \ldots, r_n)^\top" />.
          Portfolio return: <InlineMath math="r_p = \mathbf{w}^\top \mathbf{r}" />.
        </>}
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For a portfolio of three Nifty stocks -- TCS (40%), Reliance (35%), HDFC Bank (25%) --
        the portfolio return is:
      </p>

      <BlockMath math="r_p = \mathbf{w}^\top \mathbf{r} = \begin{pmatrix} 0.40 \\ 0.35 \\ 0.25 \end{pmatrix}^\top \begin{pmatrix} r_{\text{TCS}} \\ r_{\text{RIL}} \\ r_{\text{HDFC}} \end{pmatrix} = 0.40 \, r_{\text{TCS}} + 0.35 \, r_{\text{RIL}} + 0.25 \, r_{\text{HDFC}}" />

      {/* --- Matrix Operations --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Essential Matrix Operations
      </h3>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The key matrix operations in portfolio management are:
      </p>

      <BlockMath math={`\\begin{aligned}
\\text{Matrix-vector product:} \\quad & \\mathbf{y} = A\\mathbf{x}, \\quad y_i = \\sum_j a_{ij} x_j \\\\
\\text{Matrix multiplication:} \\quad & C = AB, \\quad c_{ij} = \\sum_k a_{ik} b_{kj} \\\\
\\text{Transpose:} \\quad & (A^\\top)_{ij} = a_{ji} \\\\
\\text{Inverse:} \\quad & A^{-1}A = AA^{-1} = I \\\\
\\text{Determinant:} \\quad & \\det(A) \\neq 0 \\Leftrightarrow A \\text{ is invertible}
\\end{aligned}`} />

      {/* --- Covariance Matrix --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Covariance Matrix
      </h3>

      <DefinitionBlock
        title="Covariance Matrix"
        label="Definition 1.2"
        definition={<>
          For <InlineMath math="n" /> assets with return vector{' '}
          <InlineMath math="\mathbf{r}" />, the covariance matrix{' '}
          <InlineMath math="\Sigma \in \mathbb{R}^{n \times n}" /> has entries:
          <BlockMath math="\Sigma_{ij} = \text{Cov}(r_i, r_j) = E[(r_i - \mu_i)(r_j - \mu_j)]" />
          The diagonal entries are variances: <InlineMath math="\Sigma_{ii} = \sigma_i^2" />.
          Off-diagonal entries capture co-movements between assets.
        </>}
        notation={<>
          <InlineMath math="\Sigma" /> is symmetric positive semi-definite (PSD):{' '}
          <InlineMath math="\mathbf{x}^\top \Sigma \mathbf{x} \geq 0" /> for all{' '}
          <InlineMath math="\mathbf{x}" />.
        </>}
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Portfolio variance is a quadratic form in the weight vector:
      </p>

      <BlockMath math="\sigma_p^2 = \mathbf{w}^\top \Sigma \mathbf{w} = \sum_{i=1}^{n} \sum_{j=1}^{n} w_i w_j \sigma_{ij}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        This is the fundamental formula of Modern Portfolio Theory (MPT). The covariance matrix
        can be decomposed as:
      </p>

      <BlockMath math="\Sigma = D \cdot C \cdot D \quad \text{where } D = \text{diag}(\sigma_1, \ldots, \sigma_n), \; C_{ij} = \rho_{ij}" />

      {/* --- Interactive Component --- */}
      <InteractiveCovarianceMatrix />

      {/* --- Eigendecomposition --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Eigendecomposition of the Covariance Matrix
      </h3>

      <TheoremBlock
        title="Spectral Theorem for Symmetric Matrices"
        label="Theorem 1.1"
        statement={<>
          Every real symmetric matrix <InlineMath math="\Sigma" /> (such as a covariance
          matrix) can be decomposed as:
          <BlockMath math="\Sigma = Q \Lambda Q^\top = \sum_{i=1}^{n} \lambda_i \mathbf{q}_i \mathbf{q}_i^\top" />
          where <InlineMath math="Q = [\mathbf{q}_1, \ldots, \mathbf{q}_n]" /> is an orthogonal
          matrix of eigenvectors and <InlineMath math="\Lambda = \text{diag}(\lambda_1, \ldots, \lambda_n)" />{' '}
          contains the eigenvalues. For a valid covariance matrix, all{' '}
          <InlineMath math="\lambda_i \geq 0" />.
        </>}
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The eigenvalues represent the variance explained by each principal component, and the
        eigenvectors define independent risk directions. For the Nifty 50 covariance matrix:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Eigenvector</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Financial Interpretation</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Typical Variance Share</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2"><InlineMath math="\mathbf{q}_1" /> (1st PC)</td>
              <td className="px-4 py-2">"Market factor" -- all stocks move together</td>
              <td className="px-4 py-2">40--60% of total variance</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2"><InlineMath math="\mathbf{q}_2" /> (2nd PC)</td>
              <td className="px-4 py-2">Sector rotation (IT vs Banks, growth vs value)</td>
              <td className="px-4 py-2">10--15%</td>
            </tr>
            <tr>
              <td className="px-4 py-2"><InlineMath math="\mathbf{q}_3" /> (3rd PC)</td>
              <td className="px-4 py-2">Often size or momentum factor</td>
              <td className="px-4 py-2">5--8%</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- Matrix Inversion --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Matrix Inversion and Portfolio Optimization
      </h3>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The minimum variance portfolio weights require inverting the covariance matrix:
      </p>

      <BlockMath math="\mathbf{w}_{\text{MV}} = \frac{\Sigma^{-1} \mathbf{1}}{\mathbf{1}^\top \Sigma^{-1} \mathbf{1}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The maximum Sharpe ratio (tangency) portfolio is:
      </p>

      <BlockMath math="\mathbf{w}_{\text{tan}} = \frac{\Sigma^{-1} (\boldsymbol{\mu} - r_f \mathbf{1})}{\mathbf{1}^\top \Sigma^{-1} (\boldsymbol{\mu} - r_f \mathbf{1})}" />

      <NoteBlock title="Numerical Issues in Indian Markets" type="warning">
        <p>
          For Nifty 50 stocks, the covariance matrix is 50x50. Inverting it directly can be
          numerically unstable, especially with (a) highly correlated IT stocks (TCS, Infosys,
          Wipro, HCL Tech with <InlineMath math="\rho > 0.7" />) and (b) illiquid stocks with
          noisy estimates. Solutions include shrinkage estimators (Ledoit-Wolf), factor models,
          and regularized covariance matrices.
        </p>
      </NoteBlock>

      {/* --- Python Code --- */}
      <PythonCode
        title="matrix_operations.py"
        runnable
        code={`import numpy as np

# --- Portfolio of 5 Nifty 50 stocks ---
stocks = ['TCS', 'Reliance', 'HDFC Bank', 'Infosys', 'ITC']
n = len(stocks)

# Simulated annual volatilities and correlation matrix
vols = np.array([0.22, 0.28, 0.25, 0.24, 0.20])

# Correlation matrix (stylized for Indian large-caps)
corr = np.array([
    [1.00, 0.30, 0.35, 0.70, 0.25],  # TCS
    [0.30, 1.00, 0.45, 0.28, 0.40],  # Reliance
    [0.35, 0.45, 1.00, 0.32, 0.38],  # HDFC Bank
    [0.70, 0.28, 0.32, 1.00, 0.22],  # Infosys
    [0.25, 0.40, 0.38, 0.22, 1.00],  # ITC
])

# Construct covariance matrix: Sigma = D * C * D
D = np.diag(vols)
Sigma = D @ corr @ D

print("=== Covariance Matrix (Annual) ===")
for i, name in enumerate(stocks):
    row = ' '.join(f'{Sigma[i,j]:8.5f}' for j in range(n))
    print(f"  {name:>10}: {row}")
print()

# --- Eigendecomposition ---
eigenvalues, eigenvectors = np.linalg.eigh(Sigma)
# Sort descending
idx = np.argsort(eigenvalues)[::-1]
eigenvalues = eigenvalues[idx]
eigenvectors = eigenvectors[:, idx]

total_var = np.sum(eigenvalues)
print("=== Eigendecomposition ===")
for i in range(n):
    pct = eigenvalues[i] / total_var * 100
    cumul = np.sum(eigenvalues[:i+1]) / total_var * 100
    loadings = ' '.join(f'{eigenvectors[j,i]:+.3f}' for j in range(n))
    print(f"  PC{i+1}: eigenvalue={eigenvalues[i]:.5f} ({pct:.1f}%, cumul={cumul:.1f}%)")
    print(f"        loadings: [{loadings}]")
print()

# --- Minimum Variance Portfolio ---
Sigma_inv = np.linalg.inv(Sigma)
ones = np.ones(n)
w_mv = Sigma_inv @ ones / (ones @ Sigma_inv @ ones)

print("=== Minimum Variance Portfolio ===")
for name, w in zip(stocks, w_mv):
    print(f"  {name:>10}: {w*100:+7.2f}%")
port_vol = np.sqrt(w_mv @ Sigma @ w_mv)
print(f"  Portfolio vol: {port_vol*100:.2f}%")
print()

# --- Tangency Portfolio (Max Sharpe) ---
expected_returns = np.array([0.14, 0.16, 0.13, 0.15, 0.11])  # Annual
rf = 0.065  # RBI T-bill rate
excess = expected_returns - rf
w_tan = Sigma_inv @ excess / (ones @ Sigma_inv @ excess)

print("=== Tangency (Max Sharpe) Portfolio ===")
for name, w, er in zip(stocks, w_tan, expected_returns):
    print(f"  {name:>10}: {w*100:+7.2f}%  (E[r]={er*100:.1f}%)")
port_ret = w_tan @ expected_returns
port_vol_tan = np.sqrt(w_tan @ Sigma @ w_tan)
sharpe = (port_ret - rf) / port_vol_tan
print(f"  Portfolio return: {port_ret*100:.2f}%")
print(f"  Portfolio vol:    {port_vol_tan*100:.2f}%")
print(f"  Sharpe ratio:     {sharpe:.3f}")
print()

# --- Condition Number ---
cond = np.linalg.cond(Sigma)
print(f"Condition number of Sigma: {cond:.1f}")
print(f"(High values > 100 indicate numerical instability)")`}
      />

      {/* --- Worked Example --- */}
      <ExampleBlock
        title="Computing Portfolio Variance with Matrices"
        difficulty="beginner"
        problem={<>
          Given weights <InlineMath math="\mathbf{w} = (0.5, 0.3, 0.2)^\top" /> for TCS,
          Reliance, and HDFC Bank with covariance matrix entries{' '}
          <InlineMath math="\sigma_1^2 = 0.0484, \sigma_2^2 = 0.0784, \sigma_3^2 = 0.0625" />{' '}
          and <InlineMath math="\sigma_{12} = 0.0168, \sigma_{13} = 0.0193, \sigma_{23} = 0.0315" />,
          compute the portfolio variance and volatility.
        </>}
        solution={[
          {
            step: 'Set up the quadratic form',
            formula: '\\sigma_p^2 = \\mathbf{w}^\\top \\Sigma \\mathbf{w} = \\sum_i \\sum_j w_i w_j \\sigma_{ij}',
          },
          {
            step: 'Expand the sum',
            formula: '\\sigma_p^2 = 0.5^2(0.0484) + 0.3^2(0.0784) + 0.2^2(0.0625) + 2(0.5)(0.3)(0.0168) + 2(0.5)(0.2)(0.0193) + 2(0.3)(0.2)(0.0315)',
          },
          {
            step: 'Compute each term',
            formula: '= 0.0121 + 0.00706 + 0.0025 + 0.00504 + 0.00386 + 0.00378 = 0.03434',
          },
          {
            step: 'Take the square root for volatility',
            formula: '\\sigma_p = \\sqrt{0.03434} = 0.1853 = 18.53\\%',
            explanation: 'The portfolio volatility (18.53%) is lower than the weighted average of individual volatilities (22.6%), demonstrating diversification benefit.',
          },
        ]}
      />

      {/* --- Key Takeaway --- */}
      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          The covariance matrix is the single most important object in portfolio management.
          It encodes all pairwise risk relationships between assets. Eigendecomposition reveals
          the principal risk factors driving Indian stock returns (typically market, sector, and
          style factors). Matrix inversion is needed for Markowitz optimization but requires
          care with numerical stability -- always check the condition number and consider
          shrinkage estimators when working with the full Nifty 50 universe.
        </p>
      </NoteBlock>
    </div>
  )
}
