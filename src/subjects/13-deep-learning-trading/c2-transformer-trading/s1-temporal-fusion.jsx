import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveViz() {
  const [nHeads, setNHeads] = useState(4)
  const [seqLen, setSeqLen] = useState(30)
  const attentionScores = Array.from({length: 5}, (_, i) => Math.exp(-i * 0.5) / 2.5)
  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">Interactive: Temporal Fusion Transformer Attention</h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Visualize multi-head attention weights over Nifty time steps.</p>
      <div className="mb-4 grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400"><span>Attention Heads = {nHeads}</span><input type="range" min="1" max="8" step="1" value={nHeads} onChange={e => setNHeads(parseInt(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" /></label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400"><span>Sequence Length = {seqLen}</span><input type="range" min="10" max="60" step="5" value={seqLen} onChange={e => setSeqLen(parseInt(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" /></label>
      </div>
      <svg viewBox="0 0 400 100" className="w-full max-w-md mx-auto block">
        {attentionScores.map((score, i) => {
          const x = 50 + i * 70
          const barH = score * 150
          return (<g key={i}><rect x={x} y={80 - barH} width="40" height={barH} fill="#6366f1" opacity={0.5 + score} rx="3" /><text x={x + 20} y="95" textAnchor="middle" className="text-[8px]" fill="#6b7280">t-{i}</text><text x={x + 20} y={75 - barH} textAnchor="middle" className="text-[7px] font-bold" fill="#4338ca">{(score * 100).toFixed(0)}%</text></g>)
        })}
      </svg>
      <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">Attention weights decay for older time steps, with {nHeads} heads capturing different temporal patterns</p>
    </div>
  )
}

export default function TemporalFusion() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Temporal Fusion Transformers</h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">The Temporal Fusion Transformer (TFT) combines recurrent layers for local processing with multi-head attention for learning long-range dependencies. Designed specifically for multi-horizon forecasting, TFT is well-suited for predicting Nifty 50 returns across multiple time horizons while providing interpretable attention weights and variable importance.</p>
      <DefinitionBlock title="Temporal Fusion Transformer" label="Definition 13.4" definition="TFT is a transformer-based architecture for multi-horizon time series forecasting that handles static covariates (sector, market cap), known future inputs (calendar features, scheduled events), and observed past inputs (returns, volume). It uses variable selection networks, gated residual networks, and interpretable multi-head attention." notation="\hat{y}_{t+\tau} = \text{TFT}(x_{1:t}^{observed}, x_{t+1:t+\tau}^{known}, s^{static})" />
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Multi-Head Attention for Financial Time Series</h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">The scaled dot-product attention in TFT captures temporal dependencies:</p>
      <BlockMath math="\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V" />
      <BlockMath math="\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, ..., \text{head}_h)W^O" />
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">Each attention head can learn different temporal patterns: one head may focus on recent momentum, another on weekly seasonality, and another on monthly patterns in Nifty data.</p>
      <TheoremBlock title="Variable Selection Network" label="Theorem 13.4" statement="TFT's variable selection network learns to weight input features adaptively: v_t = \text{Softmax}(W_v \cdot \text{GRN}([\xi_1, ..., \xi_K])) where GRN is a Gated Residual Network. This provides per-time-step feature importance, revealing which Nifty features (FII flow, VIX, momentum) drive predictions at each point." proof="The softmax over GRN outputs produces a probability distribution over features. The GRN provides nonlinear feature interactions through gating: GRN(x) = LayerNorm(x + GLU(W_1 x + b_1)) where GLU(x) = sigmoid(x_1) * x_2 is the Gated Linear Unit." />
      <NoteBlock title="TFT for Indian Equity Forecasting" type="tip">
        <ul className="space-y-1 text-sm">
          <li><strong>Static Features:</strong> Sector (IT, Banking, FMCG), market cap bucket, promoter holding</li>
          <li><strong>Known Future:</strong> Day of week, month, F&O expiry flag, RBI policy dates</li>
          <li><strong>Observed Past:</strong> Returns, volume, FII/DII flows, India VIX, technical indicators</li>
          <li><strong>Multi-horizon:</strong> Predict 1-day, 5-day, and 20-day returns simultaneously</li>
        </ul>
      </NoteBlock>
      <InteractiveViz />
      <PythonCode title="temporal_fusion.py" runnable code={`import numpy as np

class GatedResidualNetwork:
    """Gated Residual Network (GRN) component of TFT."""
    def __init__(self, input_size, hidden_size):
        self.W1 = np.random.randn(hidden_size, input_size) * 0.1
        self.W2 = np.random.randn(input_size, hidden_size) * 0.1
        self.Wg = np.random.randn(input_size, hidden_size) * 0.1

    def forward(self, x):
        h = np.maximum(self.W1 @ x, 0)  # ReLU
        gate = 1 / (1 + np.exp(-(self.Wg @ h)))  # Sigmoid gate
        output = gate * (self.W2 @ h)
        return x + output  # Residual

class VariableSelector:
    """Variable selection network for TFT."""
    def __init__(self, n_features, hidden_size):
        self.grn = GatedResidualNetwork(n_features, hidden_size)
        self.W_select = np.random.randn(n_features, n_features) * 0.1

    def forward(self, features):
        h = self.grn.forward(features)
        weights = np.exp(self.W_select @ h)
        weights /= weights.sum()
        return weights, weights * features

# Demo: Variable selection on Nifty features
np.random.seed(42)
feature_names = ['returns_1d', 'returns_5d', 'volume', 'india_vix',
                 'fii_flow', 'rsi_14', 'sector_rot', 'delivery_pct']
n_features = len(feature_names)

selector = VariableSelector(n_features, hidden_size=16)

# Simulate different market regimes
regimes = {
    'Bull Market': np.array([0.02, 0.08, 1.2, -0.5, 2.0, 0.7, 0.3, 0.6]),
    'Bear Market': np.array([-0.03, -0.10, 2.5, 1.5, -3.0, -1.2, -0.8, -0.3]),
    'Sideways': np.array([0.001, 0.01, 0.8, 0.1, 0.2, 0.05, -0.1, 0.1]),
}

print("=" * 60)
print("  TFT Variable Selection - Nifty 50 Features")
print("=" * 60)

for regime, features in regimes.items():
    weights, selected = selector.forward(features)
    print(f"\\nRegime: {regime}")
    print(f"  {'Feature':<15} {'Value':>8} {'Weight':>8} {'Selected':>10}")
    print("  " + "-" * 45)
    for name, val, w, sel in sorted(zip(feature_names, features, weights, selected),
                                      key=lambda x: -abs(x[2])):
        print(f"  {name:<15} {val:>+7.3f} {w:>7.1%} {sel:>+9.4f}")

print(f"\\nInterpretation:")
print(f"  TFT learns to weight features differently per regime.")
print(f"  In bull markets: momentum and FII flows dominate.")
print(f"  In bear markets: VIX and volume become more important.")`} />
      <ExampleBlock title="TFT Attention Analysis for Nifty" difficulty="intermediate"
        problem="TFT attention weights for a 5-day Nifty forecast show: t-1: 35%, t-2: 25%, t-3: 15%, t-5: 15%, t-10: 10%. What does this reveal about the model's temporal focus?"
        solution={[
          { step: 'Recent bias', formula: '\\text{Attention}_{t-1} + \\text{Attention}_{t-2} = 60\\%', explanation: 'The last 2 days carry 60% of attention weight, indicating strong short-term momentum influence.' },
          { step: 'Weekly pattern', formula: '\\text{Attention}_{t-5} = 15\\%', explanation: 'The t-5 spike captures weekly seasonality (same day previous week).' },
          { step: 'Longer memory', formula: '\\text{Attention}_{t-10} = 10\\%', explanation: 'Two-week lookback captures bi-weekly patterns. The model has learned a decaying attention with punctuated weekly peaks, consistent with market microstructure.' },
        ]} />
      <NoteBlock title="Key Takeaway" type="tip"><p>Temporal Fusion Transformers combine the strengths of recurrent processing and attention-based learning for multi-horizon financial forecasting. The built-in variable selection and interpretable attention weights make TFT particularly valuable for Indian equity strategies where understanding which features drive predictions (and when) is as important as prediction accuracy itself.</p></NoteBlock>
    </div>
  )
}
