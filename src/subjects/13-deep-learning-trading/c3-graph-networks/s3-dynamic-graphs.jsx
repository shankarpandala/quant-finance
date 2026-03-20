import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveViz() {
  const [window, setWindow] = useState(60)
  const [regime, setRegime] = useState('normal')
  const normalEdges = 15; const crisisEdges = regime === 'crisis' ? 35 : regime === 'rally' ? 20 : normalEdges
  const density = crisisEdges / 45
  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">Interactive: Dynamic Graph Evolution</h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Observe how the Nifty stock graph densifies during market stress.</p>
      <div className="mb-4 grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400"><span>Rolling Window = {window} days</span><input type="range" min="20" max="120" step="10" value={window} onChange={e => setWindow(parseInt(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" /></label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400"><span>Market Regime: {regime}</span><select value={regime} onChange={e => setRegime(e.target.value)} className="rounded border border-gray-300 px-2 py-1 text-xs dark:border-gray-600 dark:bg-gray-800"><option value="normal">Normal</option><option value="crisis">Crisis</option><option value="rally">Rally</option></select></label>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded-lg bg-indigo-50 p-2 dark:bg-indigo-900/30"><span className="text-gray-500">Active Edges</span><p className="text-base font-bold text-indigo-600">{crisisEdges}</p></div>
        <div className="rounded-lg bg-amber-50 p-2 dark:bg-amber-900/30"><span className="text-gray-500">Graph Density</span><p className="text-base font-bold text-amber-600">{(density * 100).toFixed(0)}%</p></div>
        <div className={`rounded-lg p-2 ${regime === 'crisis' ? 'bg-red-50 dark:bg-red-900/30' : 'bg-green-50 dark:bg-green-900/30'}`}><span className="text-gray-500">Diversification</span><p className={`text-base font-bold ${regime === 'crisis' ? 'text-red-600' : 'text-green-600'}`}>{regime === 'crisis' ? 'LOW' : 'NORMAL'}</p></div>
      </div>
    </div>
  )
}

export default function DynamicGraphs() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Dynamic Graphs for Financial Markets</h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Financial market graphs are inherently dynamic -- correlations between Nifty stocks shift with market regimes, macroeconomic conditions, and sector rotation. Dynamic graph models capture this time-varying structure, enabling adaptive portfolio management and regime-aware trading strategies.</p>

      <DefinitionBlock title="Dynamic Stock Graph" label="Definition 13.9" definition="A dynamic stock graph is a sequence of graphs G_t = (V, E_t, A_t) where the edge set and weights evolve over time. The adjacency matrix A_t is typically computed from rolling-window correlations: A_t(i,j) = rho(r_i, r_j; [t-w, t]) where w is the lookback window." notation="G_t = (V, E_t, A_t), \quad A_t \neq A_{t'} \text{ for } t \neq t'" />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Temporal Graph Networks</h3>
      <BlockMath math="h_i^{(t)} = \text{GNN}(x_i^{(t)}, \{h_j^{(t)}\}_{j \in \mathcal{N}_t(i)}, A_t)" />
      <BlockMath math="z_i^{(t)} = \text{GRU}(h_i^{(t)}, z_i^{(t-1)})" />
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">The spatial GNN aggregates neighborhood information on the current graph, while the temporal GRU maintains memory across time steps.</p>

      <TheoremBlock title="Correlation Regime Change Detection" label="Theorem 13.9" statement="The spectral properties of the dynamic graph Laplacian L_t detect regime changes. The algebraic connectivity lambda_2(L_t) measures graph connectedness: during market crises, correlations increase, driving lambda_2 upward. A sudden increase in lambda_2 signals a regime change where diversification benefits collapse." proof="In a crisis, pairwise correlations increase: rho_{ij}^{crisis} > rho_{ij}^{normal}. More edges survive thresholding, increasing graph density. The Fiedler eigenvalue lambda_2 increases monotonically with edge additions for connected graphs, providing a smooth indicator of market stress." />

      <BlockMath math="\lambda_2(L_t) \uparrow \implies \text{correlation regime shift (crisis)}" />
      <BlockMath math="\lambda_2(L_t) \downarrow \implies \text{decorrelation (normal/sector rotation)}" />

      <NoteBlock title="Dynamic Graphs for Indian Markets" type="tip">
        <ul className="space-y-1 text-sm">
          <li><strong>Crisis Detection:</strong> Graph density spike signals Nifty stress (March 2020, GFC 2008)</li>
          <li><strong>Sector Rotation:</strong> Changing edge structure reveals sector leadership shifts</li>
          <li><strong>FII Flow Impact:</strong> Large FII selling increases cross-stock correlations, densifying the graph</li>
          <li><strong>Monthly Expiry:</strong> F&O expiry creates temporary correlation spikes detectable via dynamic graphs</li>
        </ul>
      </NoteBlock>

      <InteractiveViz />

      <PythonCode title="dynamic_graphs.py" runnable code={`import numpy as np

class DynamicGraphAnalyzer:
    """Analyze time-varying stock graphs."""
    def __init__(self, stock_names, window=60):
        self.stocks = stock_names
        self.window = window

    def rolling_correlation_graph(self, returns, t, threshold=0.5):
        start = max(0, t - self.window)
        window_rets = returns[start:t]
        if len(window_rets) < 20:
            return np.zeros((len(self.stocks), len(self.stocks)))
        corr = np.corrcoef(window_rets.T)
        adj = np.where(np.abs(corr) > threshold, np.abs(corr), 0)
        np.fill_diagonal(adj, 0)
        return adj

    def graph_metrics(self, adj):
        n_edges = np.sum(adj > 0) // 2
        N = adj.shape[0]
        density = 2 * n_edges / (N * (N - 1)) if N > 1 else 0
        avg_corr = adj[adj > 0].mean() if np.sum(adj > 0) > 0 else 0
        # Algebraic connectivity (Fiedler value)
        D = np.diag(adj.sum(axis=1))
        L = D - adj
        eigvals = np.sort(np.linalg.eigvalsh(L))
        fiedler = eigvals[1] if len(eigvals) > 1 else 0
        return {'edges': n_edges, 'density': density,
                'avg_corr': avg_corr, 'fiedler': fiedler}

    def detect_regime_change(self, metrics_history, lookback=20):
        if len(metrics_history) < lookback + 1:
            return False
        recent = np.mean([m['fiedler'] for m in metrics_history[-5:]])
        baseline = np.mean([m['fiedler'] for m in metrics_history[-lookback:-5]])
        baseline_std = np.std([m['fiedler'] for m in metrics_history[-lookback:-5]])
        if baseline_std > 0:
            z_score = (recent - baseline) / baseline_std
            return abs(z_score) > 2.0, z_score
        return False, 0

# Simulate Nifty stocks with regime change
np.random.seed(42)
stocks = ['TCS', 'INFY', 'HDFCBANK', 'ICICIBANK', 'RELIANCE',
          'ITC', 'SBIN', 'TATASTEEL', 'MARUTI', 'SUNPHARMA']
n_stocks = len(stocks)
n_days = 252

# Normal regime (first 200 days) + crisis (last 52 days)
market_normal = np.random.randn(200) * 0.01
market_crisis = np.random.randn(52) * 0.025  # Higher vol
sector_factors = [np.random.randn(n_days) * 0.008 for _ in range(n_stocks)]

returns = np.zeros((n_days, n_stocks))
for i in range(n_stocks):
    normal_ret = market_normal + sector_factors[i][:200] + np.random.randn(200) * 0.012
    crisis_ret = market_crisis * 1.5 + sector_factors[i][200:] * 0.3 + np.random.randn(52) * 0.005
    returns[:, i] = np.concatenate([normal_ret, crisis_ret])

analyzer = DynamicGraphAnalyzer(stocks, window=60)

# Track graph evolution
metrics_history = []
key_dates = [100, 180, 220, 250]

print("=" * 60)
print("  Dynamic Graph Analysis - Nifty Stock Network")
print("=" * 60)
print(f"\\nRegime change at day 200 (crisis begins)")

for t in range(60, n_days, 5):
    adj = analyzer.rolling_correlation_graph(returns, t, threshold=0.4)
    metrics = analyzer.graph_metrics(adj)
    metrics_history.append(metrics)
    if t in key_dates:
        regime = "NORMAL" if t < 200 else "CRISIS"
        print(f"\\nDay {t} [{regime}]:")
        print(f"  Edges: {metrics['edges']}, Density: {metrics['density']:.2f}")
        print(f"  Avg Correlation: {metrics['avg_corr']:.3f}")
        print(f"  Fiedler Value: {metrics['fiedler']:.3f}")

        if len(metrics_history) > 20:
            changed, z = analyzer.detect_regime_change(metrics_history)
            print(f"  Regime Change Detected: {changed} (z={z:.2f})")

print(f"\\nGraph Density Over Time:")
print(f"  Normal period avg: {np.mean([m['density'] for m in metrics_history[:28]]):.3f}")
print(f"  Crisis period avg: {np.mean([m['density'] for m in metrics_history[28:]]):.3f}")`} />

      <ExampleBlock title="Detecting Nifty Crisis via Graph Density" difficulty="intermediate"
        problem="Normal Nifty graph density is 0.25 with std 0.05. During a crisis week, density jumps to 0.55. Is this a statistically significant regime change?"
        solution={[
          { step: 'Compute z-score', formula: 'z = \\frac{0.55 - 0.25}{0.05} = 6.0', explanation: 'The density is 6 standard deviations above normal -- extremely significant.' },
          { step: 'Interpretation', formula: 'z = 6.0 \\gg 2.0 \\Rightarrow \\text{Regime change confirmed}', explanation: 'Correlations have spiked, meaning stocks are moving together. Diversification benefit has collapsed.' },
          { step: 'Trading action', formula: '\\text{Reduce exposure, increase hedging}', explanation: 'Dense graph implies high systematic risk. Reduce long positions, buy Nifty puts or increase India VIX exposure as a hedge. Graph-based regime detection provides earlier warning than VIX alone.' },
        ]} />

      <NoteBlock title="Key Takeaway" type="tip"><p>Dynamic graphs capture the time-varying nature of stock market relationships. During crises (Nifty selloffs, FII outflows), the graph densifies as correlations spike, providing an early warning signal. The Fiedler eigenvalue of the graph Laplacian offers a single number that tracks market stress. Combining temporal GNN with dynamic graph updates enables adaptive portfolio management that responds to changing market structure in real-time.</p></NoteBlock>
    </div>
  )
}
