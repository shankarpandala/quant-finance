import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveViz() {
  const [sparsity, setSparsity] = useState(0.7)
  const [autoCorr, setAutoCorr] = useState(5)
  const fullOps = 100
  const sparseOps = fullOps * (1 - sparsity)
  const speedup = fullOps / sparseOps
  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">Interactive: Efficient Attention Comparison</h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Compare attention efficiency for long-horizon Nifty forecasting.</p>
      <div className="mb-4 grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400"><span>Sparsity = {(sparsity * 100).toFixed(0)}%</span><input type="range" min="0.1" max="0.95" step="0.05" value={sparsity} onChange={e => setSparsity(parseFloat(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" /></label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400"><span>Auto-Correlation Lag = {autoCorr}</span><input type="range" min="1" max="20" step="1" value={autoCorr} onChange={e => setAutoCorr(parseInt(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" /></label>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded-lg bg-red-50 p-2 dark:bg-red-900/30"><span className="text-gray-500">Full Attention</span><p className="text-base font-bold text-red-600">O(T<sup>2</sup>)</p></div>
        <div className="rounded-lg bg-green-50 p-2 dark:bg-green-900/30"><span className="text-gray-500">Informer (Sparse)</span><p className="text-base font-bold text-green-600">O(T log T)</p></div>
        <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-900/30"><span className="text-gray-500">Autoformer (AC)</span><p className="text-base font-bold text-blue-600">O(T log T)</p></div>
      </div>
      <p className="mt-2 text-center text-xs text-gray-500">Speedup from sparse attention: {speedup.toFixed(1)}x with {(sparsity*100).toFixed(0)}% sparsity</p>
    </div>
  )
}

export default function InformerAutoformer() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Informer and Autoformer for Long-Horizon Forecasting</h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Standard transformers have quadratic complexity in sequence length, limiting their use for long-horizon financial forecasting. Informer introduces ProbSparse attention that reduces complexity to O(T log T), while Autoformer replaces attention with auto-correlation mechanisms designed for time series. Both enable efficient multi-week Nifty forecasting.</p>

      <DefinitionBlock title="ProbSparse Attention (Informer)" label="Definition 13.6" definition="Informer's ProbSparse attention selects only the top-u queries with highest attention scores, where u = c * ln(T). This reduces the attention matrix from T x T to u x T while preserving the most informative query-key interactions. The KL-divergence between each query's attention distribution and a uniform distribution identifies the most dominant queries." notation="M(q_i, K) = \max_j \frac{q_i k_j^T}{\sqrt{d}} - \frac{1}{T}\sum_j \frac{q_i k_j^T}{\sqrt{d}}" />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Autoformer: Auto-Correlation Mechanism</h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">Autoformer replaces dot-product attention with auto-correlation computed via FFT:</p>
      <BlockMath math="R_{XX}(\tau) = \frac{1}{T}\sum_{t=1}^{T-\tau} x_t \cdot x_{t+\tau} \quad \text{(auto-correlation at lag } \tau \text{)}" />
      <BlockMath math="\text{AutoCorr}(Q, K, V) = \sum_{\tau \in \text{TopK}} \text{softmax}(R_{QK}(\tau)) \cdot \text{Roll}(V, \tau)" />
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">The auto-correlation mechanism is computed in <InlineMath math="O(T \log T)" /> using FFT, naturally capturing periodic patterns in Nifty data (weekly, monthly, quarterly cycles).</p>

      <TheoremBlock title="Complexity Comparison" label="Theorem 13.6" statement="For sequence length T: Full attention is O(T^2), Informer ProbSparse is O(T log T), and Autoformer Auto-Correlation is O(T log T). For T=252 (1 year of Nifty daily data): Full = 63,504 ops, Informer = 1,393 ops, Autoformer = 1,393 ops. This 45x reduction enables practical multi-year Nifty backtesting." proof="ProbSparse selects u = c*ln(T) queries, computing attention for each over T keys: O(c*T*ln(T)). Autoformer uses FFT to compute autocorrelation: FFT is O(T*log(T)), and TopK selection is O(T). Both achieve O(T*log(T)) overall." />

      <BlockMath math="\text{Decomposition: } x_t = \text{Trend}_t + \text{Seasonal}_t + \text{Residual}_t" />

      <NoteBlock title="Efficient Transformers for Indian Market Applications" type="tip">
        <ul className="space-y-1 text-sm">
          <li><strong>Informer:</strong> Best for event-driven forecasting where specific past events (budget, RBI) matter most</li>
          <li><strong>Autoformer:</strong> Best for cyclical pattern capture (monthly F&O expiry, quarterly results seasons)</li>
          <li><strong>Long Horizon:</strong> Both enable 20-60 day forecasts for Nifty with practical compute</li>
          <li><strong>Multi-variate:</strong> Process OHLCV + macro indicators as multi-channel time series</li>
        </ul>
      </NoteBlock>

      <InteractiveViz />

      <PythonCode title="informer_autoformer.py" runnable code={`import numpy as np

class ProbSparseAttention:
    """Informer's ProbSparse attention mechanism."""
    def __init__(self, d_model, c_factor=5):
        self.d_model = d_model
        self.c = c_factor

    def _query_sparsity_measure(self, Q, K):
        T = Q.shape[0]
        scores = Q @ K.T / np.sqrt(self.d_model)
        M = scores.max(axis=1) - scores.mean(axis=1)
        return M

    def forward(self, Q, K, V):
        T = Q.shape[0]
        u = max(1, int(self.c * np.log(T + 1)))
        M = self._query_sparsity_measure(Q, K)
        top_idx = np.argsort(-M)[:u]
        Q_sparse = Q[top_idx]
        scores = Q_sparse @ K.T / np.sqrt(self.d_model)
        attn = np.exp(scores - scores.max(axis=1, keepdims=True))
        attn /= attn.sum(axis=1, keepdims=True)
        output = np.zeros_like(V)
        output[top_idx] = attn @ V
        return output, u

class AutoCorrelation:
    """Autoformer's auto-correlation mechanism."""
    def __init__(self, top_k=3):
        self.top_k = top_k

    def forward(self, Q, K, V):
        T = Q.shape[0]
        # Compute auto-correlation via FFT
        Q_fft = np.fft.rfft(Q, axis=0)
        K_fft = np.fft.rfft(K, axis=0)
        corr_fft = Q_fft * np.conj(K_fft)
        corr = np.fft.irfft(corr_fft, n=T, axis=0)
        # Average across feature dimension
        corr_mean = np.mean(np.abs(corr), axis=1)
        # Top-k lags
        top_lags = np.argsort(-corr_mean)[:self.top_k]
        weights = np.exp(corr_mean[top_lags])
        weights /= weights.sum()
        # Aggregate shifted values
        output = np.zeros_like(V)
        for lag, w in zip(top_lags, weights):
            output += w * np.roll(V, -int(lag), axis=0)
        return output, top_lags

# Compare on Nifty 50 data
np.random.seed(42)
T = 252
d = 32

# Generate Nifty-like features with weekly pattern
t = np.arange(T)
weekly = 0.3 * np.sin(2 * np.pi * t / 5)
monthly = 0.2 * np.sin(2 * np.pi * t / 22)
trend = 0.1 * t / T
X = np.column_stack([trend + weekly + monthly + np.random.randn(T) * 0.1
                      for _ in range(d)])

Q, K, V = X, X, X

# ProbSparse Attention (Informer)
prob_attn = ProbSparseAttention(d_model=d, c_factor=5)
out_prob, n_queries = prob_attn.forward(Q, K, V)

# Auto-Correlation (Autoformer)
auto_corr = AutoCorrelation(top_k=3)
out_auto, top_lags = auto_corr.forward(Q, K, V)

print("=" * 55)
print("  Informer vs Autoformer - Nifty 50 Data")
print("=" * 55)
print(f"\\nSequence length: {T} days")
print(f"Feature dimension: {d}")

print(f"\\nInformer (ProbSparse Attention):")
print(f"  Active queries: {n_queries} / {T} ({n_queries/T*100:.1f}%)")
print(f"  Complexity: O({T} * {n_queries}) = {T * n_queries:,} ops")
print(f"  vs Full attention: O({T}^2) = {T*T:,} ops")
print(f"  Speedup: {T*T/(T*n_queries):.1f}x")

print(f"\\nAutoformer (Auto-Correlation):")
print(f"  Top lags discovered: {top_lags.tolist()}")
lag_meanings = {5: 'weekly', 22: 'monthly', 63: 'quarterly'}
for lag in top_lags:
    closest = min(lag_meanings.keys(), key=lambda k: abs(k - lag))
    if abs(closest - lag) <= 3:
        print(f"  Lag {lag} ~ {lag_meanings[closest]} pattern")
    else:
        print(f"  Lag {lag}: data-driven pattern")
print(f"  Complexity: O({T} * log({T})) = {int(T * np.log2(T)):,} ops")

print(f"\\nOutput comparison:")
print(f"  Informer output norm: {np.linalg.norm(out_prob):.3f}")
print(f"  Autoformer output norm: {np.linalg.norm(out_auto):.3f}")`} />

      <ExampleBlock title="Choosing Between Informer and Autoformer for Nifty" difficulty="intermediate"
        problem="You need to forecast Nifty 50 returns for 20 days ahead using 252 days of history. The data shows strong weekly and monthly patterns. Should you use Informer or Autoformer?"
        solution={[
          { step: 'Analyze data characteristics', formula: '\\text{Strong periodic patterns: weekly (lag 5), monthly (lag 22)}', explanation: 'The presence of clear periodic patterns favors Autoformer, which uses auto-correlation.' },
          { step: 'Compare mechanisms', formula: '\\text{Autoformer: FFT-based} \\Rightarrow \\text{naturally captures periodicity}', explanation: 'Autoformer discovers periodic patterns automatically through FFT-based auto-correlation, while Informer uses sparse point-wise attention.' },
          { step: 'Recommendation', formula: '\\text{Autoformer for periodic Nifty patterns}', explanation: 'Use Autoformer when the target has clear cyclical patterns (F&O expiry, quarterly results). Use Informer when specific past events (RBI decisions, budget) are more important than periodic patterns.' },
        ]} />

      <NoteBlock title="Key Takeaway" type="tip"><p>Informer and Autoformer enable practical long-horizon financial forecasting by reducing transformer complexity from O(T^2) to O(T log T). Informer excels at identifying which specific past events matter most (event-driven alpha), while Autoformer excels at capturing periodic patterns (cyclical alpha). For Indian equity markets, Autoformer naturally discovers weekly (F&O) and monthly (expiry) patterns, while Informer identifies high-impact events like RBI announcements. Both can process year-long Nifty histories efficiently.</p></NoteBlock>
    </div>
  )
}
