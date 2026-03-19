import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveLSTM() {
  const [forgetBias, setForgetBias] = useState(0.9)
  const [inputScale, setInputScale] = useState(0.5)
  const [seqLength, setSeqLength] = useState(20)

  const cellStates = [1.0]
  const hiddenStates = [0.5]
  for (let t = 1; t < seqLength; t++) {
    const input = Math.sin(t * 0.5) * 0.3 * inputScale
    const forgetGate = forgetBias
    const inputGate = 1 / (1 + Math.exp(-input * 2))
    const candidateCell = Math.tanh(input)
    const newCell = forgetGate * cellStates[t - 1] + inputGate * candidateCell
    const outputGate = 1 / (1 + Math.exp(-(newCell * 0.5)))
    const newHidden = outputGate * Math.tanh(newCell)
    cellStates.push(newCell)
    hiddenStates.push(newHidden)
  }

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: LSTM Cell State Evolution
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Visualize how LSTM gates control information flow when processing Nifty return sequences.
      </p>
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Forget Gate Bias = {forgetBias.toFixed(2)}</span>
          <input type="range" min="0.1" max="1" step="0.05" value={forgetBias}
            onChange={e => setForgetBias(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Input Scale = {inputScale.toFixed(2)}</span>
          <input type="range" min="0.1" max="2" step="0.1" value={inputScale}
            onChange={e => setInputScale(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Sequence Length = {seqLength}</span>
          <input type="range" min="5" max="30" step="1" value={seqLength}
            onChange={e => setSeqLength(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>
      <svg viewBox="0 0 420 120" className="w-full max-w-lg mx-auto block">
        {cellStates.map((cs, i) => {
          const x = 20 + i * (380 / seqLength)
          const yCell = 60 - cs * 25
          const yHidden = 60 - hiddenStates[i] * 25
          return (
            <g key={i}>
              {i > 0 && (
                <>
                  <line x1={20 + (i - 1) * (380 / seqLength)} y1={60 - cellStates[i - 1] * 25}
                    x2={x} y2={yCell} stroke="#6366f1" strokeWidth="1.5" />
                  <line x1={20 + (i - 1) * (380 / seqLength)} y1={60 - hiddenStates[i - 1] * 25}
                    x2={x} y2={yHidden} stroke="#10b981" strokeWidth="1.5" strokeDasharray="3" />
                </>
              )}
              <circle cx={x} cy={yCell} r="2" fill="#6366f1" />
              <circle cx={x} cy={yHidden} r="2" fill="#10b981" />
            </g>
          )
        })}
        <text x="410" y="15" className="text-[8px]" fill="#6366f1">Cell</text>
        <text x="410" y="25" className="text-[8px]" fill="#10b981">Hidden</text>
        <line x1="20" y1="60" x2="400" y2="60" stroke="#e5e7eb" strokeWidth="0.5" />
      </svg>
      <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
        High forget bias preserves long-term memory; low bias creates rapid adaptation
      </p>
    </div>
  )
}

export default function LSTMGRUReturns() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        LSTM and GRU for Return Prediction
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Long Short-Term Memory (LSTM) and Gated Recurrent Unit (GRU) networks are
        recurrent architectures designed to capture long-range temporal dependencies
        in sequential data. For Indian equity trading, they process sequences of daily
        Nifty returns, volume, and technical indicators to predict future price movements.
      </p>

      <DefinitionBlock
        title="Long Short-Term Memory (LSTM)"
        label="Definition 13.1"
        definition="An LSTM unit maintains a cell state c_t that acts as a memory highway, controlled by three gates: the forget gate (what to discard from memory), the input gate (what new information to store), and the output gate (what to expose as the hidden state). This architecture solves the vanishing gradient problem that prevents standard RNNs from learning long-range dependencies."
        notation="c_t = f_t \odot c_{t-1} + i_t \odot \tilde{c}_t, \quad h_t = o_t \odot \tanh(c_t)"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        LSTM Gate Equations
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The LSTM processes input sequence <InlineMath math="x_t" /> (e.g., Nifty daily features):
      </p>

      <BlockMath math="f_t = \sigma(W_f [h_{t-1}, x_t] + b_f) \quad \text{(forget gate)}" />
      <BlockMath math="i_t = \sigma(W_i [h_{t-1}, x_t] + b_i) \quad \text{(input gate)}" />
      <BlockMath math="\tilde{c}_t = \tanh(W_c [h_{t-1}, x_t] + b_c) \quad \text{(candidate cell)}" />
      <BlockMath math="o_t = \sigma(W_o [h_{t-1}, x_t] + b_o) \quad \text{(output gate)}" />
      <BlockMath math="c_t = f_t \odot c_{t-1} + i_t \odot \tilde{c}_t, \quad h_t = o_t \odot \tanh(c_t)" />

      <TheoremBlock
        title="Gradient Flow in LSTM"
        label="Theorem 13.1"
        statement="The LSTM cell state gradient satisfies: \frac{\partial c_t}{\partial c_{t-1}} = f_t + \text{other terms}. When the forget gate f_t \approx 1, the gradient flows unchanged through time, preventing vanishing gradients. This enables learning dependencies across 100+ time steps, critical for capturing multi-week patterns in Nifty data."
        proof="By the chain rule: \frac{\partial c_t}{\partial c_{t-1}} = \frac{\partial}{\partial c_{t-1}}(f_t \odot c_{t-1} + i_t \odot \tilde{c}_t) = f_t + \text{terms involving } \frac{\partial f_t}{\partial c_{t-1}}. When f_t \approx 1, the dominant term is the identity, allowing gradients to propagate over long sequences."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        GRU: A Simplified Alternative
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The GRU merges the cell and hidden state, using only two gates:
      </p>

      <BlockMath math="z_t = \sigma(W_z [h_{t-1}, x_t]) \quad \text{(update gate)}" />
      <BlockMath math="r_t = \sigma(W_r [h_{t-1}, x_t]) \quad \text{(reset gate)}" />
      <BlockMath math="h_t = (1 - z_t) \odot h_{t-1} + z_t \odot \tanh(W_h [r_t \odot h_{t-1}, x_t])" />

      <NoteBlock title="LSTM/GRU for Indian Market Applications" type="tip">
        <ul className="space-y-1 text-sm">
          <li><strong>Input Features:</strong> Nifty OHLCV, India VIX, FII/DII flows, sector indices as multivariate time series</li>
          <li><strong>Sequence Length:</strong> 20-60 trading days captures weekly and monthly patterns</li>
          <li><strong>Stacked LSTM:</strong> 2-3 layers with 64-128 units each for Nifty prediction</li>
          <li><strong>Dropout:</strong> 20-40% recurrent dropout to prevent overfitting on limited NSE historical data</li>
          <li><strong>Training:</strong> Walk-forward validation with expanding or rolling windows</li>
        </ul>
      </NoteBlock>

      <InteractiveLSTM />

      <PythonCode
        title="lstm_nifty_prediction.py"
        runnable
        code={`import numpy as np

class SimpleLSTM:
    """Minimal LSTM implementation for demonstration."""

    def __init__(self, input_size, hidden_size):
        self.H = hidden_size
        self.I = input_size
        scale = 0.1
        # Initialize gates
        self.Wf = np.random.randn(hidden_size, hidden_size + input_size) * scale
        self.Wi = np.random.randn(hidden_size, hidden_size + input_size) * scale
        self.Wc = np.random.randn(hidden_size, hidden_size + input_size) * scale
        self.Wo = np.random.randn(hidden_size, hidden_size + input_size) * scale
        self.bf = np.ones(hidden_size) * 1.0  # Forget gate bias > 0
        self.bi = np.zeros(hidden_size)
        self.bc = np.zeros(hidden_size)
        self.bo = np.zeros(hidden_size)

    def sigmoid(self, x):
        return 1 / (1 + np.exp(-np.clip(x, -10, 10)))

    def forward_step(self, x_t, h_prev, c_prev):
        concat = np.concatenate([h_prev, x_t])
        f_t = self.sigmoid(self.Wf @ concat + self.bf)
        i_t = self.sigmoid(self.Wi @ concat + self.bi)
        c_tilde = np.tanh(self.Wc @ concat + self.bc)
        o_t = self.sigmoid(self.Wo @ concat + self.bo)
        c_t = f_t * c_prev + i_t * c_tilde
        h_t = o_t * np.tanh(c_t)
        return h_t, c_t, {'f': f_t, 'i': i_t, 'o': o_t}

    def forward_sequence(self, X):
        T = len(X)
        h = np.zeros(self.H)
        c = np.zeros(self.H)
        hidden_states = []
        gate_history = []
        for t in range(T):
            h, c, gates = self.forward_step(X[t], h, c)
            hidden_states.append(h.copy())
            gate_history.append(gates)
        return np.array(hidden_states), gate_history

# Simulate Nifty 50 input sequence
np.random.seed(42)
seq_len = 60  # 60 trading days
n_features = 5  # returns, volume, VIX, FII, RSI

# Generate synthetic features
returns = np.random.normal(0.0005, 0.015, seq_len)
volume = np.random.lognormal(0, 0.3, seq_len)
vix = 15 + np.cumsum(np.random.normal(0, 0.5, seq_len))
fii = np.random.normal(500, 2000, seq_len)  # INR Cr
rsi = 50 + np.cumsum(np.random.normal(0, 2, seq_len))
rsi = np.clip(rsi, 20, 80)

# Normalize features
X = np.column_stack([returns, volume, (vix-vix.mean())/vix.std(),
                     fii/fii.std(), (rsi-50)/15])

# Run through LSTM
lstm = SimpleLSTM(input_size=n_features, hidden_size=32)
hidden_states, gate_history = lstm.forward_sequence(X)

# Output layer (simple linear)
W_out = np.random.randn(32) * 0.01
predictions = hidden_states @ W_out

print("=" * 55)
print("  LSTM Forward Pass - Nifty 50 Sequence")
print("=" * 55)
print(f"\\nSequence length: {seq_len} days")
print(f"Input features: {n_features}")
print(f"Hidden size: 32")
print(f"\\nInput Features (last 5 days):")
print(f"  {'Day':<5} {'Return':>8} {'Volume':>8} {'VIX':>8} {'FII':>10} {'RSI':>6}")
for t in range(seq_len-5, seq_len):
    print(f"  {t:<5} {returns[t]:>+7.4f} {volume[t]:>8.2f} "
          f"{vix[t]:>8.1f} {fii[t]:>10.0f} {rsi[t]:>6.1f}")

print(f"\\nGate Statistics (last step):")
last_gates = gate_history[-1]
for gate_name, gate_val in last_gates.items():
    print(f"  {gate_name}_gate: mean={gate_val.mean():.3f}, "
          f"std={gate_val.std():.3f}")

print(f"\\nHidden state norm (last): {np.linalg.norm(hidden_states[-1]):.3f}")
print(f"Prediction (last): {predictions[-1]:+.6f}")
print(f"Signal: {'LONG' if predictions[-1] > 0 else 'SHORT'}")`}
      />

      <ExampleBlock
        title="LSTM Forget Gate for Nifty Trend Memory"
        difficulty="intermediate"
        problem="An LSTM processes 60 days of Nifty returns. The forget gate averages 0.95 across time steps. What is the effective memory length? If a market shock occurred 30 days ago, how much does the LSTM remember?"
        solution={[
          {
            step: 'Compute effective memory',
            formula: '\\text{Memory} = \\frac{1}{1 - f} = \\frac{1}{1 - 0.95} = 20 \\text{ steps}',
            explanation: 'With forget gate 0.95, the effective exponential window is 20 days.',
          },
          {
            step: 'Memory of 30-day-old event',
            formula: '\\text{Retention} = 0.95^{30} = 0.215 = 21.5\\%',
            explanation: 'The LSTM retains about 21.5% of information from 30 days ago.',
          },
          {
            step: 'Practical interpretation',
            formula: '\\text{For a major shock (e.g., 5\\% Nifty drop): retained signal} = 0.215 \\times 5\\% = 1.08\\%',
            explanation: 'A major shock from 30 days ago still contributes a meaningful signal. This long memory is why LSTMs outperform simple lookback-window features for capturing decay patterns in Nifty momentum.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          LSTM and GRU networks process sequential Nifty data while maintaining
          long-range memory through gated mechanisms. The forget gate controls how
          much historical information persists, making LSTMs naturally suited for
          capturing decaying momentum signals. GRUs offer similar performance with
          fewer parameters, making them preferable when training data is limited.
          For Indian equity prediction, use 20-60 day input sequences with
          multivariate features (returns, volume, VIX, FII flows) and apply
          recurrent dropout to prevent overfitting.
        </p>
      </NoteBlock>
    </div>
  )
}
