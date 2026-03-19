import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveTCN() {
  const [kernelSize, setKernelSize] = useState(3)
  const [nLayers, setNLayers] = useState(4)
  const [dilationBase, setDilationBase] = useState(2)

  const dilations = Array.from({ length: nLayers }, (_, i) => Math.pow(dilationBase, i))
  const receptiveField = 1 + (kernelSize - 1) * dilations.reduce((s, d) => s + d, 0)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Temporal CNN Receptive Field
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Configure TCN architecture and observe the receptive field for Nifty time series.
      </p>
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Kernel Size = {kernelSize}</span>
          <input type="range" min="2" max="7" step="1" value={kernelSize}
            onChange={e => setKernelSize(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Layers = {nLayers}</span>
          <input type="range" min="2" max="8" step="1" value={nLayers}
            onChange={e => setNLayers(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Dilation Base = {dilationBase}</span>
          <input type="range" min="2" max="4" step="1" value={dilationBase}
            onChange={e => setDilationBase(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 420 120" className="w-full max-w-lg mx-auto block">
        {dilations.slice(0, Math.min(nLayers, 5)).map((d, layer) => {
          const y = 100 - layer * 22
          const nNodes = Math.min(15, Math.ceil(30 / d))
          return (
            <g key={layer}>
              <text x="5" y={y + 4} className="text-[7px]" fill="#6b7280">d={d}</text>
              {Array.from({ length: nNodes }, (_, i) => (
                <g key={i}>
                  <circle cx={35 + i * d * 8} cy={y} r="3" fill={layer === 0 ? '#818cf8' : '#6366f1'} opacity={0.6 + layer * 0.1} />
                  {layer > 0 && i < nNodes - 1 && (
                    <line x1={35 + i * d * 8} y1={y + 3} x2={35 + i * d * 8} y2={y + 19}
                      stroke="#c7d2fe" strokeWidth="0.5" />
                  )}
                </g>
              ))}
            </g>
          )
        })}
        <text x="210" y="115" textAnchor="middle" className="text-[9px] font-bold" fill="#4338ca">
          Receptive Field = {receptiveField} time steps
        </text>
      </svg>

      <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded bg-gray-100 p-2 dark:bg-gray-800">
          <span className="text-gray-500">Dilations</span>
          <p className="font-bold text-indigo-600">[{dilations.join(', ')}]</p>
        </div>
        <div className="rounded bg-gray-100 p-2 dark:bg-gray-800">
          <span className="text-gray-500">Receptive Field</span>
          <p className="font-bold text-green-600">{receptiveField} days</p>
        </div>
        <div className="rounded bg-gray-100 p-2 dark:bg-gray-800">
          <span className="text-gray-500">Trading Weeks</span>
          <p className="font-bold text-amber-600">{(receptiveField / 5).toFixed(1)}</p>
        </div>
      </div>
    </div>
  )
}

export default function TemporalCNN() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Temporal Convolutional Networks
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Temporal Convolutional Networks (TCNs) apply causal dilated convolutions to
        time series data, offering parallelizable training and flexible receptive fields.
        For Indian equity prediction, TCNs efficiently process multivariate Nifty time
        series while maintaining strict causality -- each output depends only on past inputs.
      </p>

      <DefinitionBlock
        title="Causal Dilated Convolution"
        label="Definition 13.2"
        definition="A causal dilated convolution applies a filter to the input with gaps (dilation) between filter elements, ensuring the output at time t depends only on inputs at times t and earlier. Dilation d means the filter spans d*(k-1)+1 time steps while using only k parameters."
        notation="(x *_d f)(t) = \sum_{i=0}^{k-1} f(i) \cdot x(t - d \cdot i)"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Dilated Convolution Mathematics
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        With exponentially increasing dilation rates <InlineMath math="d = 1, 2, 4, 8, ..." />,
        the receptive field grows exponentially with network depth:
      </p>

      <BlockMath math="RF = 1 + (k-1) \sum_{l=0}^{L-1} d_l = 1 + (k-1) \sum_{l=0}^{L-1} b^l = 1 + (k-1)\frac{b^L - 1}{b - 1}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="k" /> is the kernel size, <InlineMath math="L" /> is
        the number of layers, and <InlineMath math="b" /> is the dilation base.
      </p>

      <TheoremBlock
        title="TCN vs LSTM Computational Complexity"
        label="Theorem 13.2"
        statement="TCN training is O(k \cdot L \cdot T) compared to LSTM's O(T \cdot H^2) where T is sequence length, k is kernel size, L is layers, and H is hidden size. TCN is fully parallelizable across time steps (no sequential dependency), making it significantly faster for long sequences of Nifty daily data."
        proof="LSTM requires sequential computation: each step depends on the previous hidden state, giving O(T) serial operations. TCN convolutions at each layer can be computed in parallel across all time steps, requiring only O(L) serial operations (one per layer). With GPU parallelism, TCN training time scales as O(L) vs O(T) for LSTM."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Residual Connections in TCN
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Each TCN block uses a residual connection to enable gradient flow:
      </p>

      <BlockMath math="y_l = \text{ReLU}(\text{BN}(\text{DilatedConv}(x_l))) + x_l" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        When input and output channel dimensions differ, a 1x1 convolution adjusts the
        residual path: <InlineMath math="y_l = F(x_l) + W_{1\times1} x_l" />.
      </p>

      <NoteBlock title="TCN Architecture for Indian Markets" type="tip">
        <ul className="space-y-1 text-sm">
          <li><strong>Architecture:</strong> 4-6 layers, kernel size 3, dilations [1,2,4,8,16,32] for ~190 day receptive field</li>
          <li><strong>Channels:</strong> 32-64 channels per layer for Nifty prediction tasks</li>
          <li><strong>Input:</strong> Multivariate time series (OHLCV + indicators) as multi-channel input</li>
          <li><strong>Advantage:</strong> TCN trains 3-5x faster than LSTM on same GPU for Nifty data</li>
          <li><strong>WaveNet-style:</strong> Gated activation (sigmoid * tanh) improves performance</li>
        </ul>
      </NoteBlock>

      <InteractiveTCN />

      <PythonCode
        title="temporal_cnn.py"
        runnable
        code={`import numpy as np

class DilatedConv1D:
    """Single dilated causal convolution layer."""

    def __init__(self, in_channels, out_channels, kernel_size, dilation):
        self.kernel_size = kernel_size
        self.dilation = dilation
        scale = np.sqrt(2.0 / (kernel_size * in_channels))
        self.weight = np.random.randn(out_channels, in_channels, kernel_size) * scale
        self.bias = np.zeros(out_channels)

    def forward(self, x):
        """x: (channels, time_steps)"""
        C_out = self.weight.shape[0]
        T = x.shape[1]
        output = np.zeros((C_out, T))

        for t in range(T):
            for k in range(self.kernel_size):
                idx = t - k * self.dilation
                if idx >= 0:
                    output[:, t] += self.weight[:, :, k] @ x[:, idx]
            output[:, t] += self.bias

        return output

class TCNBlock:
    """TCN residual block with dilated convolution."""

    def __init__(self, channels, kernel_size, dilation):
        self.conv1 = DilatedConv1D(channels, channels, kernel_size, dilation)
        self.conv2 = DilatedConv1D(channels, channels, kernel_size, dilation)

    def forward(self, x):
        residual = x
        h = np.maximum(self.conv1.forward(x), 0)  # ReLU
        h = self.conv2.forward(h)
        return np.maximum(h + residual, 0)  # Residual + ReLU

class TemporalConvNet:
    """Simple TCN for financial time series."""

    def __init__(self, input_channels, hidden_channels, n_layers,
                 kernel_size=3, dilation_base=2):
        self.input_proj = DilatedConv1D(input_channels, hidden_channels, 1, 1)
        self.blocks = []
        for i in range(n_layers):
            dilation = dilation_base ** i
            self.blocks.append(TCNBlock(hidden_channels, kernel_size, dilation))

        self.receptive_field = 1 + (kernel_size - 1) * sum(
            dilation_base ** i for i in range(n_layers))

    def forward(self, x):
        h = self.input_proj.forward(x)
        for block in self.blocks:
            h = block.forward(h)
        return h

# Demonstrate TCN on Nifty data
np.random.seed(42)
seq_len = 120  # ~6 months of trading days
n_features = 5

# Generate multivariate Nifty features
returns = np.random.normal(0.0005, 0.015, seq_len)
volume = np.random.lognormal(0, 0.3, seq_len)
vix = np.random.normal(0, 1, seq_len)
fii = np.random.normal(0, 1, seq_len)
rsi = np.random.normal(0, 1, seq_len)

X = np.array([returns, volume, vix, fii, rsi])  # (5, 120)

# Build TCN
tcn = TemporalConvNet(
    input_channels=5,
    hidden_channels=16,
    n_layers=4,
    kernel_size=3,
    dilation_base=2
)

print("=" * 55)
print("  Temporal CNN - Nifty 50 Sequence Processing")
print("=" * 55)
print(f"\\nInput shape: {X.shape} (features, time)")
print(f"Architecture: 4 layers, kernel=3, dilations=[1,2,4,8]")
print(f"Receptive field: {tcn.receptive_field} days "
      f"({tcn.receptive_field/5:.1f} weeks)")

# Forward pass
output = tcn.forward(X)
print(f"\\nOutput shape: {output.shape}")
print(f"Output stats (last time step):")
print(f"  Mean: {output[:, -1].mean():.6f}")
print(f"  Std:  {output[:, -1].std():.6f}")
print(f"  Max:  {output[:, -1].max():.6f}")

# Compare receptive fields for different configs
print(f"\\nReceptive Field Comparison:")
configs = [
    (3, 4, 2, "Standard"),
    (3, 6, 2, "Deep"),
    (5, 4, 2, "Wide kernel"),
    (3, 4, 3, "Large dilation"),
]
for k, L, b, name in configs:
    rf = 1 + (k-1) * sum(b**i for i in range(L))
    print(f"  {name:<15} k={k} L={L} b={b}: RF={rf:>4} days "
          f"({rf/5:.0f} weeks)")`}
      />

      <ExampleBlock
        title="Designing TCN for Nifty Monthly Patterns"
        difficulty="intermediate"
        problem="You want a TCN that captures Nifty patterns up to 3 months (63 trading days). With kernel size k=3 and dilation base b=2, how many layers do you need?"
        solution={[
          {
            step: 'Set up the receptive field equation',
            formula: 'RF = 1 + (k-1) \\cdot \\frac{b^L - 1}{b - 1} = 1 + 2 \\cdot (2^L - 1)',
            explanation: 'Need RF >= 63 trading days.',
          },
          {
            step: 'Solve for L',
            formula: '63 \\leq 1 + 2(2^L - 1) \\Rightarrow 31 \\leq 2^L - 1 \\Rightarrow 2^L \\geq 32',
            explanation: 'We need 2^L >= 32.',
          },
          {
            step: 'Compute layers',
            formula: 'L = \\lceil \\log_2(32) \\rceil = 5 \\text{ layers}',
            explanation: 'With L=5: RF = 1 + 2*(1+2+4+8+16) = 1 + 62 = 63 days exactly. This 5-layer TCN with dilations [1,2,4,8,16] covers exactly 3 months of Nifty history.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Temporal CNNs offer a compelling alternative to LSTMs for Indian equity time
          series: faster training through parallelization, flexible receptive fields
          through dilated convolutions, and stable gradient flow through residual
          connections. The exponential growth of receptive field with depth means a
          5-layer TCN can capture 3 months of Nifty patterns with only 15 parameters
          per filter. TCNs are particularly effective for multivariate financial time
          series where multiple features (returns, volume, VIX, flows) are processed
          simultaneously.
        </p>
      </NoteBlock>
    </div>
  )
}
