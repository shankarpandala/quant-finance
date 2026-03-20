import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveDendrogram() {
  const [linkageMethod, setLinkageMethod] = useState('ward')
  const [nClusters, setNClusters] = useState(3)

  const sectors = ['Banking', 'IT', 'Energy', 'FMCG', 'Pharma']
  const distances = {
    ward: [0.3, 0.8, 1.2, 0.5, 0.9],
    single: [0.2, 0.6, 1.0, 0.4, 0.7],
    complete: [0.5, 1.0, 1.5, 0.7, 1.1],
  }

  const d = distances[linkageMethod]
  const svgW = 460
  const svgH = 200

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Hierarchical Clustering of NSE Sectors
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Change linkage method and cluster count to see how NSE sectors group.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Linkage: {linkageMethod}</span>
          <select value={linkageMethod} onChange={e => setLinkageMethod(e.target.value)}
            className="rounded border px-2 py-1 text-xs dark:bg-gray-800 dark:border-gray-600">
            <option value="ward">Ward</option>
            <option value="single">Single</option>
            <option value="complete">Complete</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Clusters: {nClusters}</span>
          <input type="range" min="2" max="5" step="1" value={nClusters}
            onChange={e => setNClusters(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-lg mx-auto block">
        {sectors.map((s, i) => {
          const x = 40 + i * 90
          return (
            <g key={i}>
              <line x1={x} y1={svgH - 20} x2={x} y2={svgH - 20 - d[i] * 100} stroke="#6366f1" strokeWidth="2" />
              <text x={x} y={svgH - 5} textAnchor="middle" className="text-[9px] fill-gray-600">{s}</text>
              <circle cx={x} cy={svgH - 20 - d[i] * 100} r="3" fill="#6366f1" />
            </g>
          )
        })}
        {/* Horizontal merge lines */}
        <line x1={40} y1={svgH - 20 - d[0] * 100} x2={130} y2={svgH - 20 - d[0] * 100} stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4" />
        <line x1={220} y1={svgH - 20 - d[2] * 100} x2={310} y2={svgH - 20 - d[2] * 100} stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4" />
        <line x1={310} y1={svgH - 20 - d[3] * 100} x2={400} y2={svgH - 20 - d[3] * 100} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4" />

        {nClusters <= 3 && (
          <line x1={40} y1={30} x2={400} y2={30} stroke="#ef4444" strokeWidth="1" strokeDasharray="6" />
        )}
        <text x={svgW / 2} y={15} textAnchor="middle" className="text-[10px] fill-gray-500">
          Dendrogram ({linkageMethod} linkage, {nClusters} clusters)
        </text>
      </svg>
    </div>
  )
}

export default function HierarchicalRiskParity() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Hierarchical Risk Parity (HRP) on NSE Sectors
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Hierarchical Risk Parity, introduced by Marcos Lopez de Prado (2016), addresses two
        key weaknesses of traditional portfolio optimization: instability due to matrix inversion
        and the inability to capture hierarchical relationships between assets. HRP uses machine
        learning (hierarchical clustering) to discover the natural grouping structure of assets
        and allocates risk top-down through the tree. We apply HRP to NSE sector indices,
        revealing the inherent clustering of Indian equity markets.
      </p>

      <DefinitionBlock
        title="Hierarchical Risk Parity"
        label="Definition 9.6"
        definition="HRP is a three-step portfolio construction algorithm: (1) Tree Clustering — apply hierarchical clustering to the correlation matrix to group similar assets, (2) Quasi-Diagonalization — reorder the covariance matrix along the dendrogram to place correlated assets adjacent, (3) Recursive Bisection — allocate weights top-down by splitting the dendrogram and allocating inversely proportional to cluster variance."
        notation="D = distance matrix, Z = linkage matrix, Σ̃ = quasi-diagonalized covariance"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Step 1: Distance Matrix and Clustering
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        HRP begins by converting the correlation matrix into a distance matrix. The standard
        distance metric for financial correlations is:
      </p>

      <BlockMath math="d_{ij} = \sqrt{\frac{1}{2}(1 - \rho_{ij})}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        This metric satisfies <InlineMath math="d_{ij} = 0" /> when <InlineMath math="\rho_{ij} = 1" />
        (perfectly correlated) and <InlineMath math="d_{ij} = 1" /> when <InlineMath math="\rho_{ij} = -1" />
        (perfectly anti-correlated). We then apply agglomerative hierarchical clustering
        with Ward linkage to build the dendrogram.
      </p>

      <InteractiveDendrogram />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Step 2: Quasi-Diagonalization
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        After clustering, we reorder the covariance matrix so that correlated assets are placed
        next to each other. This reordering follows the leaf ordering of the dendrogram. The
        quasi-diagonalized matrix <InlineMath math="\tilde{\Sigma}" /> has larger values near the
        diagonal and smaller values in off-diagonal blocks.
      </p>

      <BlockMath math="\tilde{\Sigma} = P^\top \Sigma P" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="P" /> is the permutation matrix corresponding to the dendrogram
        leaf ordering.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Step 3: Recursive Bisection
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The key innovation of HRP is the recursive bisection step. At each node of the dendrogram,
        we split assets into two clusters and allocate weights inversely proportional to their
        cluster variance:
      </p>

      <BlockMath math="\alpha = 1 - \frac{\tilde{V}_1}{\tilde{V}_1 + \tilde{V}_2}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\tilde{V}_k" /> is the variance of cluster <InlineMath math="k" />
        computed using inverse-variance weights within each cluster. Cluster 1 receives
        weight <InlineMath math="\alpha" /> and cluster 2 receives <InlineMath math="1 - \alpha" />.
        This process recurses until each cluster contains a single asset.
      </p>

      <TheoremBlock
        title="HRP Does Not Require Matrix Inversion"
        label="Theorem 9.5"
        statement="Unlike Markowitz optimization and even the standard ERC formulation, HRP never inverts the covariance matrix. It only requires element-wise access to variances and the correlation-derived distance matrix. This makes HRP numerically stable even when the number of assets exceeds the number of observations (N > T)."
        proof="By construction, the recursive bisection step only uses cluster variances computed from the diagonal of sub-matrices and the inverse-variance weighting scheme within clusters. No matrix inversion or optimization is needed."
      />

      <PythonCode
        title="hrp_nse_sectors.py"
        runnable
        code={`import numpy as np
from scipy.cluster.hierarchy import linkage, leaves_list
from scipy.spatial.distance import squareform

# NSE Sector Indices
sectors = ['Nifty Bank', 'Nifty IT', 'Nifty Pharma', 'Nifty FMCG',
           'Nifty Metal', 'Nifty Energy', 'Nifty Auto', 'Nifty Realty',
           'Nifty Infra', 'Nifty PSE']

n = len(sectors)
np.random.seed(42)

# Correlation matrix for NSE sectors (stylized)
corr = np.array([
    [1.00, 0.25, 0.20, 0.30, 0.55, 0.50, 0.60, 0.65, 0.58, 0.45],
    [0.25, 1.00, 0.35, 0.20, 0.15, 0.20, 0.25, 0.10, 0.15, 0.10],
    [0.20, 0.35, 1.00, 0.40, 0.15, 0.10, 0.20, 0.10, 0.12, 0.08],
    [0.30, 0.20, 0.40, 1.00, 0.25, 0.20, 0.35, 0.20, 0.25, 0.15],
    [0.55, 0.15, 0.15, 0.25, 1.00, 0.70, 0.50, 0.55, 0.60, 0.65],
    [0.50, 0.20, 0.10, 0.20, 0.70, 1.00, 0.45, 0.50, 0.55, 0.60],
    [0.60, 0.25, 0.20, 0.35, 0.50, 0.45, 1.00, 0.50, 0.55, 0.40],
    [0.65, 0.10, 0.10, 0.20, 0.55, 0.50, 0.50, 1.00, 0.70, 0.55],
    [0.58, 0.15, 0.12, 0.25, 0.60, 0.55, 0.55, 0.70, 1.00, 0.65],
    [0.45, 0.10, 0.08, 0.15, 0.65, 0.60, 0.40, 0.55, 0.65, 1.00],
])

vols = np.array([0.24, 0.20, 0.22, 0.15, 0.30, 0.28, 0.25, 0.35, 0.27, 0.26])
Sigma = np.outer(vols, vols) * corr

# Step 1: Distance matrix
dist = np.sqrt(0.5 * (1 - corr))
condensed_dist = squareform(dist)

# Step 2: Hierarchical clustering
Z = linkage(condensed_dist, method='ward')
order = leaves_list(Z)

print("Dendrogram leaf order:", [sectors[i] for i in order])

# Step 3: Recursive bisection
def get_cluster_var(Sigma, indices):
    sub_cov = Sigma[np.ix_(indices, indices)]
    inv_diag = 1.0 / np.diag(sub_cov)
    w = inv_diag / inv_diag.sum()
    return w @ sub_cov @ w

def recursive_bisection(Sigma, sorted_indices):
    weights = np.ones(len(sorted_indices))
    clusters = [sorted_indices.tolist()]

    while len(clusters) > 0:
        new_clusters = []
        for cluster in clusters:
            if len(cluster) <= 1:
                continue
            mid = len(cluster) // 2
            left = cluster[:mid]
            right = cluster[mid:]

            var_left = get_cluster_var(Sigma, left)
            var_right = get_cluster_var(Sigma, right)
            alpha = 1 - var_left / (var_left + var_right)

            for i in left:
                idx = sorted_indices.tolist().index(i)
                weights[idx] *= alpha
            for i in right:
                idx = sorted_indices.tolist().index(i)
                weights[idx] *= (1 - alpha)

            if len(left) > 1:
                new_clusters.append(left)
            if len(right) > 1:
                new_clusters.append(right)
        clusters = new_clusters

    return weights / weights.sum()

w_hrp = recursive_bisection(Sigma, order)
port_vol = np.sqrt(w_hrp @ Sigma[np.ix_(order, order)] @ w_hrp)

# Map back to original order
w_final = np.zeros(n)
for i, idx in enumerate(order):
    w_final[idx] = w_hrp[i]

port_vol_check = np.sqrt(w_final @ Sigma @ w_final)

print(f"\\n=== HRP Portfolio (NSE Sectors) ===")
print(f"Portfolio volatility: {port_vol_check:.4f} ({port_vol_check:.2%})")
print(f"\\n{'Sector':<15} {'Weight':>8} {'Vol':>8}")
print("-" * 35)
for s, w, v in sorted(zip(sectors, w_final, vols), key=lambda x: -x[1]):
    print(f"{s:<15} {w:>8.4f} {v:>8.2%}")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        HRP vs. MVO vs. ERC: Comparison on Indian Data
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        De Prado demonstrated that HRP outperforms MVO out-of-sample, particularly when the
        covariance matrix is poorly estimated (small T/N ratio). Key advantages for Indian markets:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Property</th>
              <th className="px-4 py-2 text-center text-gray-600 dark:text-gray-400">MVO</th>
              <th className="px-4 py-2 text-center text-gray-600 dark:text-gray-400">ERC</th>
              <th className="px-4 py-2 text-center text-gray-600 dark:text-gray-400">HRP</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Requires return estimates</td>
              <td className="px-4 py-2 text-center">Yes</td>
              <td className="px-4 py-2 text-center">No</td>
              <td className="px-4 py-2 text-center">No</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Matrix inversion</td>
              <td className="px-4 py-2 text-center">Yes</td>
              <td className="px-4 py-2 text-center">No (Spinu)</td>
              <td className="px-4 py-2 text-center">No</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Handles N &gt; T</td>
              <td className="px-4 py-2 text-center">No</td>
              <td className="px-4 py-2 text-center">Partially</td>
              <td className="px-4 py-2 text-center">Yes</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Turnover stability</td>
              <td className="px-4 py-2 text-center">Low</td>
              <td className="px-4 py-2 text-center">Medium</td>
              <td className="px-4 py-2 text-center">High</td>
            </tr>
          </tbody>
        </table>
      </div>

      <ExampleBlock
        title="HRP on Three NSE Sectors"
        difficulty="intermediate"
        problem="Apply HRP to Nifty Bank ($\\sigma=24\\%$), Nifty IT ($\\sigma=20\\%$), and Nifty FMCG ($\\sigma=15\\%$) with correlations $\\rho_{\\text{Bank,IT}}=0.25$, $\\rho_{\\text{Bank,FMCG}}=0.30$, $\\rho_{\\text{IT,FMCG}}=0.20$."
        solution={[
          {
            step: 'Compute distance matrix',
            formula: 'd_{ij} = \\sqrt{(1-\\rho_{ij})/2}',
            explanation: 'd_Bank,IT = √(0.375) = 0.612, d_Bank,FMCG = √(0.35) = 0.592, d_IT,FMCG = √(0.4) = 0.632',
          },
          {
            step: 'Cluster: Bank and FMCG merge first (d=0.592)',
            formula: '\\text{Tree: } [\\text{IT}] \\;|\\; [\\text{Bank}, \\text{FMCG}]',
            explanation: 'Bank and FMCG have the smallest distance, so they form the first cluster.',
          },
          {
            step: 'Recursive bisection',
            formula: '\\alpha = 1 - \\frac{V_{\\text{IT}}}{V_{\\text{IT}} + V_{\\{\\text{Bank,FMCG}\\}}}',
            explanation: 'Compute cluster variances and split weights. FMCG gets the highest weight due to lowest volatility.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          HRP combines hierarchical clustering with risk-based allocation to produce portfolios
          that are more stable, require no matrix inversion, and naturally capture the sector
          structure of the Indian market. For NSE stocks, HRP typically groups banking/financial
          stocks together, separates defensive sectors (FMCG, Pharma, IT), and allocates more
          to lower-volatility clusters -- a behavior well-suited to Indian market dynamics.
        </p>
      </NoteBlock>
    </div>
  )
}
