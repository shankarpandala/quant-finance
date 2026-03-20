import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveViz() {
  const [corrThreshold, setCorrThreshold] = useState(0.5)
  const stocks = [{x:100,y:50,name:'TCS'},{x:160,y:30,name:'INFY'},{x:80,y:100,name:'HDFC'},{x:200,y:80,name:'ICICI'},{x:140,y:120,name:'REL'},{x:250,y:50,name:'WIPRO'}]
  const edges = [{i:0,j:1,w:0.8},{i:0,j:5,w:0.7},{i:1,j:5,w:0.65},{i:2,j:3,w:0.75},{i:2,j:4,w:0.45},{i:3,j:4,w:0.5},{i:0,j:2,w:0.3}]
  const visibleEdges = edges.filter(e => e.w >= corrThreshold)
  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">Interactive: Stock Correlation Graph</h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Adjust correlation threshold to build the Nifty stock graph.</p>
      <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400 mb-4"><span>Correlation Threshold = {corrThreshold.toFixed(2)}</span><input type="range" min="0.2" max="0.9" step="0.05" value={corrThreshold} onChange={e => setCorrThreshold(parseFloat(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" /></label>
      <svg viewBox="0 0 320 160" className="w-full max-w-md mx-auto block">
        {visibleEdges.map((e, idx) => (<line key={idx} x1={stocks[e.i].x} y1={stocks[e.i].y} x2={stocks[e.j].x} y2={stocks[e.j].y} stroke="#6366f1" strokeWidth={e.w * 3} opacity={e.w * 0.8} />))}
        {stocks.map((s, i) => (<g key={i}><circle cx={s.x} cy={s.y} r="15" fill="#818cf8" stroke="#4338ca" strokeWidth="1.5" /><text x={s.x} y={s.y + 3} textAnchor="middle" className="text-[7px] font-bold" fill="white">{s.name}</text></g>))}
      </svg>
      <p className="mt-2 text-center text-xs text-gray-500">{visibleEdges.length} edges at threshold {corrThreshold.toFixed(2)} | IT cluster: TCS-INFY-WIPRO | Banking: HDFC-ICICI</p>
    </div>
  )
}

export default function StockGraphs() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Stock Market Graphs</h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Stock markets naturally form graphs where nodes are stocks and edges represent relationships (correlation, supply chain, sector membership). Graph Neural Networks (GNNs) exploit this relational structure to improve predictions for individual Nifty stocks by aggregating information from related stocks.</p>

      <DefinitionBlock title="Stock Market Graph" label="Definition 13.7" definition="A stock market graph G = (V, E, A) consists of nodes V (stocks), edges E (relationships), and an adjacency matrix A where A_ij captures the strength of the relationship between stocks i and j. Common graph construction methods include correlation-based thresholding, sector membership, and supply chain linkages." notation="A_{ij} = \begin{cases} \rho_{ij} & \text{if } |\rho_{ij}| > \tau \\ 0 & \text{otherwise} \end{cases}" />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Graph Construction Methods</h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">Three approaches to constructing stock graphs for Indian equities:</p>
      <BlockMath math="\text{Correlation: } A_{ij}^{corr} = \max(0, \rho(r_i, r_j) - \tau)" />
      <BlockMath math="\text{Sector: } A_{ij}^{sector} = \mathbf{1}[\text{sector}_i = \text{sector}_j]" />
      <BlockMath math="\text{Industry chain: } A_{ij}^{chain} = \text{revenue linkage}(i, j)" />

      <TheoremBlock title="Message Passing on Stock Graphs" label="Theorem 13.7" statement="A single layer of graph convolution aggregates information from 1-hop neighbors. After L layers, each node's representation incorporates information from its L-hop neighborhood. For the Nifty 50 sector graph, L=2 layers suffice to propagate information across sector boundaries (IT -> Banking through conglomerate nodes like Reliance)." proof="In a GCN layer, h_i^{(l+1)} = sigma(sum_{j in N(i)} A_ij W h_j^{(l)}). After L layers, h_i^{(L)} depends on all nodes within L hops. The Nifty sector graph has diameter ~3-4, so L=2-3 provides near-complete information propagation." />

      <BlockMath math="h_i^{(l+1)} = \sigma\left(\sum_{j \in \mathcal{N}(i)} \frac{A_{ij}}{\sqrt{d_i d_j}} W^{(l)} h_j^{(l)}\right)" />

      <NoteBlock title="Nifty Stock Graph Structure" type="tip">
        <ul className="space-y-1 text-sm">
          <li><strong>Clusters:</strong> IT (TCS-INFY-WIPRO-HCL), Banking (HDFC-ICICI-SBI-AXIS-KOTAK), FMCG (HUL-ITC-NESTLE)</li>
          <li><strong>Bridge Nodes:</strong> Reliance connects energy, telecom, and retail sectors</li>
          <li><strong>Temporal Edges:</strong> Correlation-based edges change with market regimes</li>
          <li><strong>Data Source:</strong> Sector membership from NSE, correlations from Zerodha historical data</li>
        </ul>
      </NoteBlock>

      <InteractiveViz />

      <PythonCode title="stock_graphs.py" runnable code={`import numpy as np

class StockGraphBuilder:
    """Build stock graphs for GNN-based prediction."""
    def __init__(self, stock_names):
        self.stocks = stock_names
        self.N = len(stock_names)

    def correlation_graph(self, returns, threshold=0.5):
        corr = np.corrcoef(returns.T)
        adj = np.where(np.abs(corr) > threshold, corr, 0)
        np.fill_diagonal(adj, 0)
        return adj

    def sector_graph(self, sectors):
        adj = np.zeros((self.N, self.N))
        for i in range(self.N):
            for j in range(i+1, self.N):
                if sectors[i] == sectors[j]:
                    adj[i, j] = adj[j, i] = 1.0
        return adj

    def combined_graph(self, corr_adj, sector_adj, alpha=0.5):
        return alpha * corr_adj + (1 - alpha) * sector_adj

    def graph_stats(self, adj):
        n_edges = np.sum(adj > 0) // 2
        degrees = np.sum(adj > 0, axis=1)
        density = 2 * n_edges / (self.N * (self.N - 1))
        return {'edges': n_edges, 'avg_degree': degrees.mean(),
                'density': density, 'max_degree': degrees.max()}

class SimpleGCN:
    """Graph Convolutional Network for stock prediction."""
    def __init__(self, in_features, hidden, out_features):
        self.W1 = np.random.randn(hidden, in_features) * 0.1
        self.W2 = np.random.randn(out_features, hidden) * 0.1

    def normalize_adj(self, A):
        D = np.diag(A.sum(axis=1) + 1e-6)
        D_inv_sqrt = np.diag(1.0 / np.sqrt(np.diag(D)))
        return D_inv_sqrt @ A @ D_inv_sqrt

    def forward(self, X, A):
        A_hat = A + np.eye(A.shape[0])
        A_norm = self.normalize_adj(A_hat)
        H = np.maximum(A_norm @ X @ self.W1.T, 0)
        out = A_norm @ H @ self.W2.T
        return out

# Build Nifty stock graph
np.random.seed(42)
stocks = ['TCS', 'INFY', 'WIPRO', 'HCLTECH', 'HDFCBANK', 'ICICIBANK',
          'SBIN', 'AXISBANK', 'RELIANCE', 'ITC', 'HUL', 'TATASTEEL']
sectors = ['IT', 'IT', 'IT', 'IT', 'Bank', 'Bank',
           'Bank', 'Bank', 'Energy', 'FMCG', 'FMCG', 'Metal']

builder = StockGraphBuilder(stocks)

# Simulate correlated returns
n_days = 252
market = np.random.randn(n_days) * 0.01
sector_factors = {s: np.random.randn(n_days) * 0.008 for s in set(sectors)}
returns = np.column_stack([
    market + sector_factors[s] + np.random.randn(n_days) * 0.005
    for s in sectors
])

corr_adj = builder.correlation_graph(returns, threshold=0.4)
sector_adj = builder.sector_graph(sectors)
combined = builder.combined_graph(corr_adj, sector_adj, alpha=0.6)

print("=" * 55)
print("  Stock Graph Analysis - Nifty Constituents")
print("=" * 55)

for name, adj in [('Correlation', corr_adj), ('Sector', sector_adj), ('Combined', combined)]:
    stats = builder.graph_stats(adj)
    print(f"\\n{name} Graph:")
    print(f"  Edges: {stats['edges']}, Avg degree: {stats['avg_degree']:.1f}, "
          f"Density: {stats['density']:.2f}")

# GCN prediction
features = np.random.randn(len(stocks), 8)  # 8 features per stock
gcn = SimpleGCN(in_features=8, hidden=16, out_features=1)
predictions = gcn.forward(features, combined)

print(f"\\nGCN Predictions (Combined Graph):")
ranks = np.argsort(-predictions.flatten())
for rank, idx in enumerate(ranks):
    signal = 'LONG' if rank < 3 else ('SHORT' if rank >= len(stocks)-3 else 'HOLD')
    print(f"  {rank+1:>2}. {stocks[idx]:<12} {predictions[idx,0]:>+.4f} [{signal}]")`} />

      <ExampleBlock title="Building a Nifty Sector Graph" difficulty="beginner"
        problem="Given 4 stocks: TCS (IT), INFY (IT), HDFC (Bank), ICICI (Bank). Build the sector adjacency matrix and compute average degree."
        solution={[
          { step: 'Build adjacency matrix', formula: 'A = \\begin{bmatrix} 0 & 1 & 0 & 0 \\\\ 1 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 1 \\\\ 0 & 0 & 1 & 0 \\end{bmatrix}', explanation: 'IT stocks (TCS, INFY) connect to each other; banking stocks (HDFC, ICICI) connect to each other.' },
          { step: 'Compute degrees', formula: 'd_{TCS}=1, d_{INFY}=1, d_{HDFC}=1, d_{ICICI}=1', explanation: 'Each stock has degree 1 (connected to one sector peer).' },
          { step: 'Average degree', formula: '\\bar{d} = (1+1+1+1)/4 = 1.0', explanation: 'Average degree of 1.0. A fully connected graph within sectors with more stocks would have higher degree, enabling richer information propagation via GNN.' },
        ]} />

      <NoteBlock title="Key Takeaway" type="tip"><p>Stock market graphs encode relational structure that individual time series models miss. For the Nifty universe, sector graphs capture obvious industry groupings, while correlation graphs discover hidden connections that change with market regimes. GNNs propagate information across the graph, enabling each stock's prediction to benefit from its neighbors' features -- a natural implementation of the financial intuition that sector peers move together.</p></NoteBlock>
    </div>
  )
}
