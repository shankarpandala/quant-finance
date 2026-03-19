import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveViz() {
  const [graphType, setGraphType] = useState('sector')
  const [gnnLayers, setGnnLayers] = useState(2)
  const baseReturn = 12; const graphBoost = gnnLayers * 1.5
  const sharpeBase = 0.8; const sharpeGraph = sharpeBase + gnnLayers * 0.15
  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">Interactive: GNN Portfolio Optimization</h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Compare GNN-enhanced vs standard portfolio construction for Nifty stocks.</p>
      <div className="mb-4 grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400"><span>Graph Type: {graphType}</span><select value={graphType} onChange={e => setGraphType(e.target.value)} className="rounded border border-gray-300 px-2 py-1 text-xs dark:border-gray-600 dark:bg-gray-800"><option value="sector">Sector</option><option value="correlation">Correlation</option><option value="supply_chain">Supply Chain</option></select></label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400"><span>GNN Layers = {gnnLayers}</span><input type="range" min="1" max="4" step="1" value={gnnLayers} onChange={e => setGnnLayers(parseInt(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" /></label>
      </div>
      <div className="grid grid-cols-2 gap-3 text-center text-xs">
        <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800"><span className="text-gray-500">Standard Portfolio</span><p className="text-sm font-bold text-gray-600">Return: {baseReturn}% | Sharpe: {sharpeBase.toFixed(2)}</p></div>
        <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30"><span className="text-gray-500">GNN Portfolio</span><p className="text-sm font-bold text-indigo-600">Return: {(baseReturn + graphBoost).toFixed(1)}% | Sharpe: {sharpeGraph.toFixed(2)}</p></div>
      </div>
    </div>
  )
}

export default function GNNPortfolio() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">GNN-Based Portfolio Construction</h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Graph Neural Networks enhance portfolio construction by incorporating inter-stock relationships into the optimization process. Rather than treating stocks independently, GNN portfolios leverage sector structure, correlation networks, and supply chain linkages to produce better-diversified and higher-returning portfolios on NSE/BSE.</p>

      <DefinitionBlock title="Graph-Aware Portfolio Optimization" label="Definition 13.8" definition="GNN portfolio optimization augments traditional mean-variance optimization by using graph-convolved features for return prediction and graph-regularized weights for diversification. The portfolio weight vector w is learned through a GNN that processes stock features on the market graph, producing weights that respect the graph's community structure." notation="w^* = \text{GNN}(X, A; \theta) \quad \text{s.t. } w^T \mathbf{1} = 1, \; w \geq 0" />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">GNN for Return Prediction and Weight Learning</h3>
      <BlockMath math="\hat{\mu} = \text{GCN}(X, A) \cdot W_{out}, \quad w^* = \text{softmax}(\hat{\mu} / \tau)" />
      <BlockMath math="\text{Graph regularization: } \Omega(w) = w^T L w = \sum_{(i,j) \in E} A_{ij}(w_i - w_j)^2" />
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">where <InlineMath math="L = D - A" /> is the graph Laplacian. The regularization term penalizes dissimilar weights for connected stocks, encouraging sector-balanced portfolios.</p>

      <TheoremBlock title="Graph Regularization and Diversification" label="Theorem 13.8" statement="The graph Laplacian regularization \Omega(w) = w^T L w measures the smoothness of portfolio weights on the graph. Minimizing \Omega encourages similar weights for connected stocks (sector peers), promoting within-sector diversification. The spectrum of L reveals the graph's community structure, with the Fiedler vector providing the optimal 2-cluster partition." proof="w^T L w = sum_{(i,j)} A_{ij}(w_i - w_j)^2 >= 0. This is minimized when w is constant on each connected component. The Fiedler vector (eigenvector of second-smallest eigenvalue of L) provides the cut that separates the graph into two balanced clusters, which for Nifty corresponds to the primary sector divide." />

      <NoteBlock title="GNN Portfolio Applications for NSE" type="tip">
        <ul className="space-y-1 text-sm">
          <li><strong>Sector Diversification:</strong> Graph Laplacian regularization prevents over-concentration in single Nifty sectors</li>
          <li><strong>Risk Propagation:</strong> GNN captures how risk propagates through the stock network (e.g., banking sector contagion)</li>
          <li><strong>Rebalancing:</strong> Graph-aware rebalancing reduces turnover by respecting sector structure</li>
          <li><strong>Smallcase Integration:</strong> GNN-optimized portfolios can be deployed as Zerodha Smallcases</li>
        </ul>
      </NoteBlock>

      <InteractiveViz />

      <PythonCode title="gnn_portfolio.py" runnable code={`import numpy as np

class GNNPortfolioOptimizer:
    """GNN-based portfolio construction for NSE stocks."""
    def __init__(self, n_stocks, n_features, hidden_dim=16):
        self.W1 = np.random.randn(hidden_dim, n_features) * 0.1
        self.W2 = np.random.randn(1, hidden_dim) * 0.1
        self.temperature = 1.0

    def gcn_layer(self, X, A):
        A_hat = A + np.eye(A.shape[0])
        D = np.diag(A_hat.sum(axis=1) + 1e-8)
        D_inv = np.diag(1.0 / np.sqrt(np.diag(D)))
        A_norm = D_inv @ A_hat @ D_inv
        return np.maximum(A_norm @ X @ self.W1.T, 0)

    def predict_weights(self, X, A):
        H = self.gcn_layer(X, A)
        scores = H @ self.W2.T
        weights = np.exp(scores.flatten() / self.temperature)
        weights /= weights.sum()
        return weights

    def graph_laplacian_reg(self, weights, A):
        D = np.diag(A.sum(axis=1))
        L = D - A
        return weights @ L @ weights

    def portfolio_metrics(self, weights, returns):
        port_ret = returns @ weights
        mu = np.mean(port_ret) * 252
        sigma = np.std(port_ret) * np.sqrt(252)
        sharpe = mu / sigma if sigma > 0 else 0
        max_w = np.max(weights)
        hhi = np.sum(weights ** 2)
        return {'return': mu, 'risk': sigma, 'sharpe': sharpe,
                'max_weight': max_w, 'hhi': hhi}

# Nifty sector-based portfolio
np.random.seed(42)
stocks = ['TCS', 'INFY', 'HDFCBANK', 'ICICIBANK', 'RELIANCE',
          'ITC', 'HUL', 'SBIN', 'TATASTEEL', 'SUNPHARMA']
sectors = ['IT', 'IT', 'Bank', 'Bank', 'Energy',
           'FMCG', 'FMCG', 'Bank', 'Metal', 'Pharma']

# Build sector adjacency
N = len(stocks)
A = np.zeros((N, N))
for i in range(N):
    for j in range(i+1, N):
        if sectors[i] == sectors[j]:
            A[i, j] = A[j, i] = 1.0

# Simulate returns
n_days = 252
features = np.random.randn(N, 8)
market = np.random.randn(n_days) * 0.01
sector_f = {s: np.random.randn(n_days) * 0.008 for s in set(sectors)}
returns = np.column_stack([
    market + sector_f[s] + np.random.randn(n_days) * 0.012
    for s in sectors
])

# GNN portfolio
optimizer = GNNPortfolioOptimizer(N, 8)
gnn_weights = optimizer.predict_weights(features, A)
gnn_metrics = optimizer.portfolio_metrics(gnn_weights, returns)
graph_reg = optimizer.graph_laplacian_reg(gnn_weights, A)

# Equal weight baseline
eq_weights = np.ones(N) / N
eq_metrics = optimizer.portfolio_metrics(eq_weights, returns)

print("=" * 55)
print("  GNN Portfolio Optimization - Nifty Stocks")
print("=" * 55)

print(f"\\n{'Method':<15} {'Return':>8} {'Risk':>8} {'Sharpe':>8} {'HHI':>8}")
print("-" * 50)
print(f"{'Equal Weight':<15} {eq_metrics['return']*100:>7.1f}% {eq_metrics['risk']*100:>7.1f}% "
      f"{eq_metrics['sharpe']:>8.2f} {eq_metrics['hhi']:>8.3f}")
print(f"{'GNN Portfolio':<15} {gnn_metrics['return']*100:>7.1f}% {gnn_metrics['risk']*100:>7.1f}% "
      f"{gnn_metrics['sharpe']:>8.2f} {gnn_metrics['hhi']:>8.3f}")

print(f"\\nGNN Portfolio Weights:")
for name, sector, w in sorted(zip(stocks, sectors, gnn_weights), key=lambda x: -x[2]):
    print(f"  {name:<12} ({sector:<6}) {w:>6.1%}")

print(f"\\nGraph Laplacian Regularization: {graph_reg:.4f}")
print(f"(Lower = smoother weights across sector peers)")`} />

      <ExampleBlock title="Graph-Regularized Portfolio" difficulty="intermediate"
        problem="A GNN assigns weights: TCS=15%, INFY=12%, HDFC=18%, ICICI=20%, REL=10%. TCS-INFY are connected (IT), HDFC-ICICI are connected (Bank). Compute the graph Laplacian penalty."
        solution={[
          { step: 'Identify connected pairs', formula: 'E = \\{(TCS, INFY), (HDFC, ICICI)\\}', explanation: 'Two edges: within IT sector and within Banking sector.' },
          { step: 'Compute penalty', formula: '\\Omega = (0.15-0.12)^2 + (0.18-0.20)^2 = 0.0009 + 0.0004 = 0.0013', explanation: 'Small penalty indicates weights are smooth within sectors.' },
          { step: 'Interpretation', formula: '\\text{IT spread: 3\\%, Banking spread: 2\\%}', explanation: 'The GNN has learned to assign similar weights within sectors, promoting sector-balanced diversification. The banking overweight (38% combined) might trigger additional diversification constraints.' },
        ]} />

      <NoteBlock title="Key Takeaway" type="tip"><p>GNN-based portfolio optimization naturally incorporates stock relationships into weight determination. Graph Laplacian regularization promotes sector diversification, while GNN feature propagation enables each stock's weight to benefit from its sector peers' information. For Indian portfolios, this approach bridges the gap between traditional Markowitz optimization and the relational structure of the NSE market, producing more robust and diversified allocations.</p></NoteBlock>
    </div>
  )
}
