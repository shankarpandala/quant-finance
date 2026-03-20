import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveViz() {
  const [dModel, setDModel] = useState(64)
  const [nHeads, setNHeads] = useState(4)
  const dK = Math.floor(dModel / nHeads)
  const params = dModel * dModel * 4 * 3 + dModel * dModel
  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">Interactive: Stock Transformer Architecture</h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Configure transformer dimensions for cross-sectional Nifty 500 stock prediction.</p>
      <div className="mb-4 grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400"><span>d_model = {dModel}</span><input type="range" min="32" max="256" step="32" value={dModel} onChange={e => setDModel(parseInt(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" /></label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400"><span>n_heads = {nHeads}</span><input type="range" min="1" max="8" step="1" value={nHeads} onChange={e => setNHeads(parseInt(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" /></label>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded-lg bg-indigo-50 p-2 dark:bg-indigo-900/30"><span className="text-gray-500">d_k per head</span><p className="text-base font-bold text-indigo-600">{dK}</p></div>
        <div className="rounded-lg bg-green-50 p-2 dark:bg-green-900/30"><span className="text-gray-500">Total Params</span><p className="text-base font-bold text-green-600">{(params/1000).toFixed(1)}K</p></div>
        <div className="rounded-lg bg-amber-50 p-2 dark:bg-amber-900/30"><span className="text-gray-500">FLOPS/token</span><p className="text-base font-bold text-amber-600">{(params * 2 / 1000).toFixed(1)}K</p></div>
      </div>
      <svg viewBox="0 0 400 80" className="w-full max-w-md mx-auto block mt-4">
        {Array.from({length: nHeads}, (_, h) => (
          <g key={h}>
            <rect x={20 + h * (360/nHeads)} y="10" width={340/nHeads - 10} height="50" rx="5" fill="#6366f1" opacity={0.3 + h * 0.15} />
            <text x={20 + h * (360/nHeads) + (340/nHeads - 10)/2} y="38" textAnchor="middle" className="text-[9px] font-bold" fill="#4338ca">Head {h+1}</text>
            <text x={20 + h * (360/nHeads) + (340/nHeads - 10)/2} y="50" textAnchor="middle" className="text-[7px]" fill="#6b7280">d={dK}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

export default function StockTransformers() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Transformer Models for Stock Prediction</h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Transformer architectures, originally designed for NLP, have been adapted for stock prediction by treating financial time series as sequences of tokens. Cross-sectional transformers process multiple Nifty 500 stocks simultaneously, learning inter-stock relationships through attention mechanisms that capture lead-lag effects and sector co-movements.</p>

      <DefinitionBlock title="Stock Transformer" label="Definition 13.5" definition="A stock transformer applies self-attention across both temporal and cross-sectional dimensions. Each stock at each time step is represented as a token embedding, enabling the model to learn which stocks' past behavior is informative for predicting a target stock's future returns." notation="z_i^{(l+1)} = \text{FFN}(\text{MultiHead}(z_i^{(l)}, Z^{(l)}, Z^{(l)})) + z_i^{(l)}" />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Positional Encoding for Financial Data</h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">Financial positional encodings combine temporal position with calendar features:</p>
      <BlockMath math="PE(t, 2i) = \sin\left(\frac{t}{10000^{2i/d}}\right), \quad PE(t, 2i+1) = \cos\left(\frac{t}{10000^{2i/d}}\right)" />
      <BlockMath math="x_t^{stock} = \text{Embed}(\text{features}_t) + PE(t) + \text{SectorEmbed}(s)" />

      <TheoremBlock title="Attention Complexity for Cross-Sectional Models" label="Theorem 13.5" statement="Standard self-attention over N stocks and T time steps has O(N^2 T^2) complexity. For the Nifty 500 universe with 252 daily observations, this requires approximately 10^{10} operations per forward pass, necessitating efficient attention variants (linear attention, sparse attention) for practical deployment." proof="Self-attention computes QK^T of dimensions (NT, NT), requiring O((NT)^2 d) operations. For N=500, T=252, d=64: ops = 500^2 * 252^2 * 64 ≈ 10^{12}. Sparse attention with local temporal windows reduces this to O(NT * (N + w) * d) where w is the temporal window size." />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Cross-Sectional Attention</h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">Cross-sectional attention learns inter-stock dependencies at each time step:</p>
      <BlockMath math="\alpha_{ij}^t = \frac{\exp(q_i^t \cdot k_j^t / \sqrt{d_k})}{\sum_{m=1}^{N} \exp(q_i^t \cdot k_m^t / \sqrt{d_k})}" />
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">High attention <InlineMath math="\alpha_{ij}^t" /> indicates stock <InlineMath math="j" /> is informative for predicting stock <InlineMath math="i" /> at time <InlineMath math="t" />. This captures lead-lag effects where certain Nifty stocks (e.g., HDFC Bank leading other private banks) carry predictive information.</p>

      <NoteBlock title="Stock Transformers for NSE" type="tip">
        <ul className="space-y-1 text-sm">
          <li><strong>Token Design:</strong> Each token = (stock, time) pair with features [returns, volume, technicals]</li>
          <li><strong>Sector Embeddings:</strong> Learnable embeddings for GICS sectors capture industry structure</li>
          <li><strong>Lead-Lag Discovery:</strong> Attention weights reveal which Nifty stocks lead others</li>
          <li><strong>Output:</strong> Cross-sectional stock ranking for long-short portfolio construction</li>
        </ul>
      </NoteBlock>

      <InteractiveViz />

      <PythonCode title="stock_transformer.py" runnable code={`import numpy as np

class MultiHeadAttention:
    """Multi-head attention for cross-sectional stock modeling."""
    def __init__(self, d_model, n_heads):
        self.d_model = d_model
        self.n_heads = n_heads
        self.d_k = d_model // n_heads
        scale = 0.1 / np.sqrt(d_model)
        self.W_q = np.random.randn(d_model, d_model) * scale
        self.W_k = np.random.randn(d_model, d_model) * scale
        self.W_v = np.random.randn(d_model, d_model) * scale
        self.W_o = np.random.randn(d_model, d_model) * scale

    def forward(self, X):
        N = X.shape[0]
        Q = X @ self.W_q
        K = X @ self.W_k
        V = X @ self.W_v
        scores = Q @ K.T / np.sqrt(self.d_k)
        attn = np.exp(scores - scores.max(axis=1, keepdims=True))
        attn /= attn.sum(axis=1, keepdims=True)
        output = attn @ V @ self.W_o
        return output, attn

class StockTransformer:
    """Simplified stock transformer for cross-sectional prediction."""
    def __init__(self, d_features, d_model, n_heads, n_layers):
        self.input_proj = np.random.randn(d_model, d_features) * 0.1
        self.layers = [MultiHeadAttention(d_model, n_heads) for _ in range(n_layers)]
        self.output_proj = np.random.randn(1, d_model) * 0.01

    def forward(self, X):
        H = X @ self.input_proj.T
        all_attentions = []
        for layer in self.layers:
            H_attn, attn = layer.forward(H)
            H = H + H_attn  # Residual
            all_attentions.append(attn)
        predictions = H @ self.output_proj.T
        return predictions.flatten(), all_attentions

# Simulate cross-sectional Nifty 50 data
np.random.seed(42)
n_stocks = 10
d_features = 8
stock_names = ['TCS', 'INFY', 'HDFCBANK', 'ICICIBANK', 'RELIANCE',
               'ITC', 'SBIN', 'TATASTEEL', 'MARUTI', 'SUNPHARMA']
feature_names = ['ret_1d', 'ret_5d', 'vol', 'rsi', 'fii', 'sector', 'mcap', 'beta']

X = np.random.randn(n_stocks, d_features)

model = StockTransformer(d_features=d_features, d_model=32, n_heads=4, n_layers=2)
predictions, attentions = model.forward(X)

print("=" * 60)
print("  Stock Transformer - Nifty 50 Cross-Sectional Prediction")
print("=" * 60)
print(f"\\nStocks: {n_stocks}, Features: {d_features}")
print(f"Architecture: d_model=32, heads=4, layers=2")

ranks = np.argsort(-predictions)
print(f"\\n{'Rank':<5} {'Stock':<12} {'Prediction':>11} {'Signal':>8}")
print("-" * 40)
for rank, idx in enumerate(ranks):
    signal = 'LONG' if rank < 3 else ('SHORT' if rank >= n_stocks - 3 else 'HOLD')
    print(f"{rank+1:<5} {stock_names[idx]:<12} {predictions[idx]:>+10.6f} {signal:>8}")

print(f"\\nCross-Sectional Attention (Layer 1, top connections):")
attn = attentions[0]
for i in range(n_stocks):
    top_j = np.argsort(-attn[i])[:3]
    top_scores = [f"{stock_names[j]}({attn[i,j]:.2f})" for j in top_j if j != i]
    if top_scores:
        print(f"  {stock_names[i]:<12} attends to: {', '.join(top_scores[:2])}")`} />

      <ExampleBlock title="Lead-Lag Discovery via Attention" difficulty="intermediate"
        problem="A stock transformer's attention weights show HDFCBANK attending to ICICIBANK with weight 0.28 and SBIN with 0.15. What does this mean for trading?"
        solution={[
          { step: 'Interpret attention', formula: '\\alpha_{HDFC \\to ICICI} = 0.28 > \\alpha_{HDFC \\to SBI} = 0.15', explanation: 'The model finds ICICI Bank more informative for predicting HDFC Bank than SBI.' },
          { step: 'Lead-lag implication', formula: '\\text{ICICI movements may lead HDFC movements}', explanation: 'This could indicate that ICICI Bank price changes precede similar moves in HDFC Bank, creating a tradeable lead-lag signal.' },
          { step: 'Trading application', formula: '\\text{If ICICI rises sharply, go long HDFC}', explanation: 'Use the attention-discovered lead-lag relationship for pairs trading within the Bank Nifty sector. Backtest the signal before deployment.' },
        ]} />

      <NoteBlock title="Key Takeaway" type="tip"><p>Stock transformers learn cross-sectional relationships between Nifty stocks through attention mechanisms, automatically discovering lead-lag effects, sector co-movements, and factor exposures. The attention weights provide interpretable insights into inter-stock dependencies, enabling both alpha generation (trading lead-lag signals) and risk management (understanding portfolio correlation structure). For practical deployment on NSE, use efficient attention variants to handle the full Nifty 500 universe.</p></NoteBlock>
    </div>
  )
}
