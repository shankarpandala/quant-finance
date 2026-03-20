import{j as e,r as c}from"./vendor-DgA46Qmo.js";import{r as t}from"./vendor-katex-C-S70IU0.js";import{D as N,T as v,N as f,P as w,E as T}from"./subject-01-math-foundations-vREfsVbS.js";function E(){const[a,g]=c.useState(.9),[s,y]=c.useState(.5),[o,i]=c.useState(20),r=[1],d=[.5];for(let n=1;n<o;n++){const l=Math.sin(n*.5)*.3*s,p=a,m=1/(1+Math.exp(-l*2)),u=Math.tanh(l),_=p*r[n-1]+m*u,x=1/(1+Math.exp(-(_*.5)))*Math.tanh(_);r.push(_),d.push(x)}return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: LSTM Cell State Evolution"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Visualize how LSTM gates control information flow when processing Nifty return sequences."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Forget Gate Bias = ",a.toFixed(2)]}),e.jsx("input",{type:"range",min:"0.1",max:"1",step:"0.05",value:a,onChange:n=>g(parseFloat(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Input Scale = ",s.toFixed(2)]}),e.jsx("input",{type:"range",min:"0.1",max:"2",step:"0.1",value:s,onChange:n=>y(parseFloat(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Sequence Length = ",o]}),e.jsx("input",{type:"range",min:"5",max:"30",step:"1",value:o,onChange:n=>i(parseInt(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 420 120",className:"w-full max-w-lg mx-auto block",children:[r.map((n,l)=>{const p=20+l*(380/o),m=60-n*25,u=60-d[l]*25;return e.jsxs("g",{children:[l>0&&e.jsxs(e.Fragment,{children:[e.jsx("line",{x1:20+(l-1)*(380/o),y1:60-r[l-1]*25,x2:p,y2:m,stroke:"#6366f1",strokeWidth:"1.5"}),e.jsx("line",{x1:20+(l-1)*(380/o),y1:60-d[l-1]*25,x2:p,y2:u,stroke:"#10b981",strokeWidth:"1.5",strokeDasharray:"3"})]}),e.jsx("circle",{cx:p,cy:m,r:"2",fill:"#6366f1"}),e.jsx("circle",{cx:p,cy:u,r:"2",fill:"#10b981"})]},l)}),e.jsx("text",{x:"410",y:"15",className:"text-[8px]",fill:"#6366f1",children:"Cell"}),e.jsx("text",{x:"410",y:"25",className:"text-[8px]",fill:"#10b981",children:"Hidden"}),e.jsx("line",{x1:"20",y1:"60",x2:"400",y2:"60",stroke:"#e5e7eb",strokeWidth:"0.5"})]}),e.jsx("p",{className:"mt-2 text-center text-xs text-gray-500 dark:text-gray-400",children:"High forget bias preserves long-term memory; low bias creates rapid adaptation"})]})}function B(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"LSTM and GRU for Return Prediction"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Long Short-Term Memory (LSTM) and Gated Recurrent Unit (GRU) networks are recurrent architectures designed to capture long-range temporal dependencies in sequential data. For Indian equity trading, they process sequences of daily Nifty returns, volume, and technical indicators to predict future price movements."}),e.jsx(N,{title:"Long Short-Term Memory (LSTM)",label:"Definition 13.1",definition:"An LSTM unit maintains a cell state c_t that acts as a memory highway, controlled by three gates: the forget gate (what to discard from memory), the input gate (what new information to store), and the output gate (what to expose as the hidden state). This architecture solves the vanishing gradient problem that prevents standard RNNs from learning long-range dependencies.",notation:"c_t = f_t \\odot c_{t-1} + i_t \\odot \\tilde{c}_t, \\quad h_t = o_t \\odot \\tanh(c_t)"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"LSTM Gate Equations"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The LSTM processes input sequence ",e.jsx(t.InlineMath,{math:"x_t"})," (e.g., Nifty daily features):"]}),e.jsx(t.BlockMath,{math:"f_t = \\sigma(W_f [h_{t-1}, x_t] + b_f) \\quad \\text{(forget gate)}"}),e.jsx(t.BlockMath,{math:"i_t = \\sigma(W_i [h_{t-1}, x_t] + b_i) \\quad \\text{(input gate)}"}),e.jsx(t.BlockMath,{math:"\\tilde{c}_t = \\tanh(W_c [h_{t-1}, x_t] + b_c) \\quad \\text{(candidate cell)}"}),e.jsx(t.BlockMath,{math:"o_t = \\sigma(W_o [h_{t-1}, x_t] + b_o) \\quad \\text{(output gate)}"}),e.jsx(t.BlockMath,{math:"c_t = f_t \\odot c_{t-1} + i_t \\odot \\tilde{c}_t, \\quad h_t = o_t \\odot \\tanh(c_t)"}),e.jsx(v,{title:"Gradient Flow in LSTM",label:"Theorem 13.1",statement:"The LSTM cell state gradient satisfies: \\frac{\\partial c_t}{\\partial c_{t-1}} = f_t + \\text{other terms}. When the forget gate f_t \\approx 1, the gradient flows unchanged through time, preventing vanishing gradients. This enables learning dependencies across 100+ time steps, critical for capturing multi-week patterns in Nifty data.",proof:"By the chain rule: \\frac{\\partial c_t}{\\partial c_{t-1}} = \\frac{\\partial}{\\partial c_{t-1}}(f_t \\odot c_{t-1} + i_t \\odot \\tilde{c}_t) = f_t + \\text{terms involving } \\frac{\\partial f_t}{\\partial c_{t-1}}. When f_t \\approx 1, the dominant term is the identity, allowing gradients to propagate over long sequences."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"GRU: A Simplified Alternative"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The GRU merges the cell and hidden state, using only two gates:"}),e.jsx(t.BlockMath,{math:"z_t = \\sigma(W_z [h_{t-1}, x_t]) \\quad \\text{(update gate)}"}),e.jsx(t.BlockMath,{math:"r_t = \\sigma(W_r [h_{t-1}, x_t]) \\quad \\text{(reset gate)}"}),e.jsx(t.BlockMath,{math:"h_t = (1 - z_t) \\odot h_{t-1} + z_t \\odot \\tanh(W_h [r_t \\odot h_{t-1}, x_t])"}),e.jsx(f,{title:"LSTM/GRU for Indian Market Applications",type:"tip",children:e.jsxs("ul",{className:"space-y-1 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Input Features:"})," Nifty OHLCV, India VIX, FII/DII flows, sector indices as multivariate time series"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Sequence Length:"})," 20-60 trading days captures weekly and monthly patterns"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Stacked LSTM:"})," 2-3 layers with 64-128 units each for Nifty prediction"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Dropout:"})," 20-40% recurrent dropout to prevent overfitting on limited NSE historical data"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Training:"})," Walk-forward validation with expanding or rolling windows"]})]})}),e.jsx(E,{}),e.jsx(w,{title:"lstm_nifty_prediction.py",runnable:!0,code:`import numpy as np

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
print(f"Signal: {'LONG' if predictions[-1] > 0 else 'SHORT'}")`}),e.jsx(T,{title:"LSTM Forget Gate for Nifty Trend Memory",difficulty:"intermediate",problem:"An LSTM processes 60 days of Nifty returns. The forget gate averages 0.95 across time steps. What is the effective memory length? If a market shock occurred 30 days ago, how much does the LSTM remember?",solution:[{step:"Compute effective memory",formula:"\\text{Memory} = \\frac{1}{1 - f} = \\frac{1}{1 - 0.95} = 20 \\text{ steps}",explanation:"With forget gate 0.95, the effective exponential window is 20 days."},{step:"Memory of 30-day-old event",formula:"\\text{Retention} = 0.95^{30} = 0.215 = 21.5\\%",explanation:"The LSTM retains about 21.5% of information from 30 days ago."},{step:"Practical interpretation",formula:"\\text{For a major shock (e.g., 5\\% Nifty drop): retained signal} = 0.215 \\times 5\\% = 1.08\\%",explanation:"A major shock from 30 days ago still contributes a meaningful signal. This long memory is why LSTMs outperform simple lookback-window features for capturing decay patterns in Nifty momentum."}]}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"LSTM and GRU networks process sequential Nifty data while maintaining long-range memory through gated mechanisms. The forget gate controls how much historical information persists, making LSTMs naturally suited for capturing decaying momentum signals. GRUs offer similar performance with fewer parameters, making them preferable when training data is limited. For Indian equity prediction, use 20-60 day input sequences with multivariate features (returns, volume, VIX, FII flows) and apply recurrent dropout to prevent overfitting."})})]})}const me=Object.freeze(Object.defineProperty({__proto__:null,default:B},Symbol.toStringTag,{value:"Module"}));function q(){const[a,g]=c.useState(3),[s,y]=c.useState(4),[o,i]=c.useState(2),r=Array.from({length:s},(n,l)=>Math.pow(o,l)),d=1+(a-1)*r.reduce((n,l)=>n+l,0);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Temporal CNN Receptive Field"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Configure TCN architecture and observe the receptive field for Nifty time series."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Kernel Size = ",a]}),e.jsx("input",{type:"range",min:"2",max:"7",step:"1",value:a,onChange:n=>g(parseInt(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Layers = ",s]}),e.jsx("input",{type:"range",min:"2",max:"8",step:"1",value:s,onChange:n=>y(parseInt(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Dilation Base = ",o]}),e.jsx("input",{type:"range",min:"2",max:"4",step:"1",value:o,onChange:n=>i(parseInt(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 420 120",className:"w-full max-w-lg mx-auto block",children:[r.slice(0,Math.min(s,5)).map((n,l)=>{const p=100-l*22,m=Math.min(15,Math.ceil(30/n));return e.jsxs("g",{children:[e.jsxs("text",{x:"5",y:p+4,className:"text-[7px]",fill:"#6b7280",children:["d=",n]}),Array.from({length:m},(u,_)=>e.jsxs("g",{children:[e.jsx("circle",{cx:35+_*n*8,cy:p,r:"3",fill:l===0?"#818cf8":"#6366f1",opacity:.6+l*.1}),l>0&&_<m-1&&e.jsx("line",{x1:35+_*n*8,y1:p+3,x2:35+_*n*8,y2:p+19,stroke:"#c7d2fe",strokeWidth:"0.5"})]},_))]},l)}),e.jsxs("text",{x:"210",y:"115",textAnchor:"middle",className:"text-[9px] font-bold",fill:"#4338ca",children:["Receptive Field = ",d," time steps"]})]}),e.jsxs("div",{className:"mt-2 grid grid-cols-3 gap-2 text-center text-xs",children:[e.jsxs("div",{className:"rounded bg-gray-100 p-2 dark:bg-gray-800",children:[e.jsx("span",{className:"text-gray-500",children:"Dilations"}),e.jsxs("p",{className:"font-bold text-indigo-600",children:["[",r.join(", "),"]"]})]}),e.jsxs("div",{className:"rounded bg-gray-100 p-2 dark:bg-gray-800",children:[e.jsx("span",{className:"text-gray-500",children:"Receptive Field"}),e.jsxs("p",{className:"font-bold text-green-600",children:[d," days"]})]}),e.jsxs("div",{className:"rounded bg-gray-100 p-2 dark:bg-gray-800",children:[e.jsx("span",{className:"text-gray-500",children:"Trading Weeks"}),e.jsx("p",{className:"font-bold text-amber-600",children:(d/5).toFixed(1)})]})]})]})}function G(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Temporal Convolutional Networks"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Temporal Convolutional Networks (TCNs) apply causal dilated convolutions to time series data, offering parallelizable training and flexible receptive fields. For Indian equity prediction, TCNs efficiently process multivariate Nifty time series while maintaining strict causality -- each output depends only on past inputs."}),e.jsx(N,{title:"Causal Dilated Convolution",label:"Definition 13.2",definition:"A causal dilated convolution applies a filter to the input with gaps (dilation) between filter elements, ensuring the output at time t depends only on inputs at times t and earlier. Dilation d means the filter spans d*(k-1)+1 time steps while using only k parameters.",notation:"(x *_d f)(t) = \\sum_{i=0}^{k-1} f(i) \\cdot x(t - d \\cdot i)"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Dilated Convolution Mathematics"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["With exponentially increasing dilation rates ",e.jsx(t.InlineMath,{math:"d = 1, 2, 4, 8, ..."}),", the receptive field grows exponentially with network depth:"]}),e.jsx(t.BlockMath,{math:"RF = 1 + (k-1) \\sum_{l=0}^{L-1} d_l = 1 + (k-1) \\sum_{l=0}^{L-1} b^l = 1 + (k-1)\\frac{b^L - 1}{b - 1}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"k"})," is the kernel size, ",e.jsx(t.InlineMath,{math:"L"})," is the number of layers, and ",e.jsx(t.InlineMath,{math:"b"})," is the dilation base."]}),e.jsx(v,{title:"TCN vs LSTM Computational Complexity",label:"Theorem 13.2",statement:"TCN training is O(k \\cdot L \\cdot T) compared to LSTM's O(T \\cdot H^2) where T is sequence length, k is kernel size, L is layers, and H is hidden size. TCN is fully parallelizable across time steps (no sequential dependency), making it significantly faster for long sequences of Nifty daily data.",proof:"LSTM requires sequential computation: each step depends on the previous hidden state, giving O(T) serial operations. TCN convolutions at each layer can be computed in parallel across all time steps, requiring only O(L) serial operations (one per layer). With GPU parallelism, TCN training time scales as O(L) vs O(T) for LSTM."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Residual Connections in TCN"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Each TCN block uses a residual connection to enable gradient flow:"}),e.jsx(t.BlockMath,{math:"y_l = \\text{ReLU}(\\text{BN}(\\text{DilatedConv}(x_l))) + x_l"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["When input and output channel dimensions differ, a 1x1 convolution adjusts the residual path: ",e.jsx(t.InlineMath,{math:"y_l = F(x_l) + W_{1\\times1} x_l"}),"."]}),e.jsx(f,{title:"TCN Architecture for Indian Markets",type:"tip",children:e.jsxs("ul",{className:"space-y-1 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Architecture:"})," 4-6 layers, kernel size 3, dilations [1,2,4,8,16,32] for ~190 day receptive field"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Channels:"})," 32-64 channels per layer for Nifty prediction tasks"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Input:"})," Multivariate time series (OHLCV + indicators) as multi-channel input"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Advantage:"})," TCN trains 3-5x faster than LSTM on same GPU for Nifty data"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"WaveNet-style:"})," Gated activation (sigmoid * tanh) improves performance"]})]})}),e.jsx(q,{}),e.jsx(w,{title:"temporal_cnn.py",runnable:!0,code:`import numpy as np

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
          f"({rf/5:.0f} weeks)")`}),e.jsx(T,{title:"Designing TCN for Nifty Monthly Patterns",difficulty:"intermediate",problem:"You want a TCN that captures Nifty patterns up to 3 months (63 trading days). With kernel size k=3 and dilation base b=2, how many layers do you need?",solution:[{step:"Set up the receptive field equation",formula:"RF = 1 + (k-1) \\cdot \\frac{b^L - 1}{b - 1} = 1 + 2 \\cdot (2^L - 1)",explanation:"Need RF >= 63 trading days."},{step:"Solve for L",formula:"63 \\leq 1 + 2(2^L - 1) \\Rightarrow 31 \\leq 2^L - 1 \\Rightarrow 2^L \\geq 32",explanation:"We need 2^L >= 32."},{step:"Compute layers",formula:"L = \\lceil \\log_2(32) \\rceil = 5 \\text{ layers}",explanation:"With L=5: RF = 1 + 2*(1+2+4+8+16) = 1 + 62 = 63 days exactly. This 5-layer TCN with dilations [1,2,4,8,16] covers exactly 3 months of Nifty history."}]}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Temporal CNNs offer a compelling alternative to LSTMs for Indian equity time series: faster training through parallelization, flexible receptive fields through dilated convolutions, and stable gradient flow through residual connections. The exponential growth of receptive field with depth means a 5-layer TCN can capture 3 months of Nifty patterns with only 15 parameters per filter. TCNs are particularly effective for multivariate financial time series where multiple features (returns, volume, VIX, flows) are processed simultaneously."})})]})}const xe=Object.freeze(Object.defineProperty({__proto__:null,default:G},Symbol.toStringTag,{value:"Module"}));function R(){const[a,g]=c.useState(3),[s,y]=c.useState(3),[o,i]=c.useState(5),r=["Trend","Seasonality","Generic"],d=[1];for(let l=0;l<a;l++)d.push(d[l]*(.7-l*.1));const n=(1-d[a])*100;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: N-BEATS Architecture"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Configure N-BEATS stacks for decomposing Nifty 50 time series."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Stacks = ",a]}),e.jsx("input",{type:"range",min:"1",max:"5",step:"1",value:a,onChange:l=>g(parseInt(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Blocks/Stack = ",s]}),e.jsx("input",{type:"range",min:"1",max:"5",step:"1",value:s,onChange:l=>y(parseInt(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Forecast Horizon = ",o," days"]}),e.jsx("input",{type:"range",min:"1",max:"20",step:"1",value:o,onChange:l=>i(parseInt(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 420 110",className:"w-full max-w-lg mx-auto block",children:[Array.from({length:a},(l,p)=>{const m=30+p*(350/a),u=300/a,_=r[p%r.length],k=(d[p]-d[p+1])*60;return e.jsxs("g",{children:[e.jsx("rect",{x:m,y:80-k,width:u-10,height:k,fill:["#6366f1","#10b981","#f59e0b","#ef4444","#8b5cf6"][p%5],opacity:"0.6",rx:"3"}),e.jsx("text",{x:m+u/2-5,y:90,textAnchor:"middle",className:"text-[8px]",fill:"#6b7280",children:_}),e.jsxs("text",{x:m+u/2-5,y:75-k,textAnchor:"middle",className:"text-[7px] font-bold",fill:"#4338ca",children:[((d[p]-d[p+1])*100).toFixed(0),"%"]}),p<a-1&&e.jsx("line",{x1:m+u-10,y1:"50",x2:m+u,y2:"50",stroke:"#d1d5db",strokeWidth:"1",markerEnd:"url(#arrow)"})]},p)}),e.jsxs("text",{x:"210",y:"105",textAnchor:"middle",className:"text-[9px] font-bold",fill:"#16a34a",children:["Total Explained: ",n.toFixed(0),"% | Residual: ",(100-n).toFixed(0),"%"]})]})]})}function V(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"N-BEATS for Financial Forecasting"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"N-BEATS (Neural Basis Expansion Analysis for Time Series) is a deep learning architecture specifically designed for time series forecasting. Its hierarchical doubly residual structure decomposes time series into interpretable components (trend, seasonality), making it ideal for forecasting Nifty 50 returns with both accuracy and interpretability."}),e.jsx(N,{title:"N-BEATS Architecture",label:"Definition 13.3",definition:"N-BEATS consists of stacked blocks, where each block produces a backcast (fitted values for the input window) and a forecast (prediction for the horizon). The input to each subsequent block is the residual after subtracting the previous block's backcast. The final forecast is the sum of all blocks' partial forecasts.",notation:"\\hat{y} = \\sum_{l=1}^{L} \\hat{y}_l^{forecast}, \\quad x_{l+1} = x_l - \\hat{x}_l^{backcast}"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Block Architecture"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Each N-BEATS block processes the input through fully connected layers and generates basis expansion coefficients:"}),e.jsx(t.BlockMath,{math:"h_l = \\text{ReLU}(W_4 \\cdot \\text{ReLU}(W_3 \\cdot \\text{ReLU}(W_2 \\cdot \\text{ReLU}(W_1 \\cdot x_l))))"}),e.jsx(t.BlockMath,{math:"\\hat{x}_l^{back} = V_b^T \\theta_l^{back}, \\quad \\hat{y}_l^{fore} = V_f^T \\theta_l^{fore}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"V_b, V_f"})," are basis matrices and"," ",e.jsx(t.InlineMath,{math:"\\theta"})," are learned coefficients. For interpretable stacks:"]}),e.jsx(t.BlockMath,{math:"\\text{Trend basis: } V_{trend}(t) = [1, t, t^2, ..., t^p]"}),e.jsx(t.BlockMath,{math:"\\text{Seasonal basis: } V_{seas}(t) = [\\cos(2\\pi t/s_k), \\sin(2\\pi t/s_k)]_{k=1}^{K}"}),e.jsx(v,{title:"Doubly Residual Learning",label:"Theorem 13.3",statement:"N-BEATS' doubly residual architecture ensures that each block specializes in explaining a different component of the time series. The backcast residual x_{l+1} = x_l - hat{x}_l removes the explained component, forcing subsequent blocks to capture remaining patterns. The forecast residual aggregation hat{y} = sum(hat{y}_l) naturally decomposes the prediction.",proof:"By construction, block l receives residual x_l = x - sum_{j<l} hat{x}_j. The loss function minimizes sum_l ||x_l - hat{x}_l||^2, which is equivalent to fitting x = sum_l hat{x}_l. Each block's forecast hat{y}_l corresponds to the same component captured by hat{x}_l, ensuring interpretable decomposition."}),e.jsx(f,{title:"N-BEATS for Indian Financial Data",type:"tip",children:e.jsxs("ul",{className:"space-y-1 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Interpretable:"})," Trend stack captures Nifty bullish/bearish trends, seasonal stack captures monthly/quarterly patterns"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Generic:"})," Generic stacks learn arbitrary patterns (FII flow effects, budget impact)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Ensemble:"})," N-BEATS naturally supports ensembling by averaging predictions from multiple random initializations"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Input:"})," Lookback window of 2-5x forecast horizon (e.g., 50 days for 10-day forecast)"]})]})}),e.jsx(R,{}),e.jsx(w,{title:"nbeats_financial.py",runnable:!0,code:`import numpy as np

class NBeatsBlock:
    """Single N-BEATS block."""

    def __init__(self, input_size, hidden_size, forecast_size, basis_type='generic'):
        scale = 0.01
        self.fc1 = np.random.randn(hidden_size, input_size) * scale
        self.fc2 = np.random.randn(hidden_size, hidden_size) * scale
        self.back_proj = np.random.randn(input_size, hidden_size) * scale
        self.fore_proj = np.random.randn(forecast_size, hidden_size) * scale
        self.basis_type = basis_type

    def forward(self, x):
        h = np.maximum(self.fc1 @ x, 0)
        h = np.maximum(self.fc2 @ h, 0)
        backcast = self.back_proj @ h
        forecast = self.fore_proj @ h
        return backcast, forecast

class NBeats:
    """N-BEATS for financial time series forecasting."""

    def __init__(self, lookback, horizon, n_stacks=3, n_blocks=3,
                 hidden_size=64, stack_types=None):
        self.lookback = lookback
        self.horizon = horizon

        if stack_types is None:
            stack_types = ['trend', 'seasonality', 'generic']

        self.stacks = []
        for s in range(n_stacks):
            blocks = []
            for b in range(n_blocks):
                blocks.append(NBeatsBlock(
                    lookback, hidden_size, horizon,
                    stack_types[s % len(stack_types)]
                ))
            self.stacks.append(blocks)

    def forward(self, x):
        forecasts = []
        residual = x.copy()
        stack_contributions = []

        for stack in self.stacks:
            stack_forecast = np.zeros(self.horizon)
            for block in stack:
                backcast, forecast = block.forward(residual)
                residual = residual - backcast  # Doubly residual
                stack_forecast += forecast
            forecasts.append(stack_forecast)
            stack_contributions.append(np.linalg.norm(stack_forecast))

        total_forecast = sum(forecasts)
        return total_forecast, forecasts, stack_contributions

# Simulate Nifty 50 forecasting
np.random.seed(42)
lookback = 30  # 30 days lookback
horizon = 5    # 5 days forecast

# Generate Nifty-like price series
n_total = 252
trend = np.linspace(0, 0.15, n_total)  # ~15% annual trend
seasonal = 0.02 * np.sin(np.arange(n_total) * 2 * np.pi / 22)  # Monthly
noise = np.random.normal(0, 0.01, n_total)
returns = trend / n_total + seasonal + noise
prices = 20000 * np.exp(np.cumsum(returns))

# Build N-BEATS model
model = NBeats(
    lookback=lookback,
    horizon=horizon,
    n_stacks=3,
    n_blocks=3,
    hidden_size=32,
    stack_types=['trend', 'seasonality', 'generic']
)

# Forward pass on last window
window = returns[-lookback:]
forecast, stack_forecasts, contributions = model.forward(window)

print("=" * 55)
print("  N-BEATS - Nifty 50 Return Forecasting")
print("=" * 55)
print(f"\\nLookback: {lookback} days, Horizon: {horizon} days")
print(f"Stacks: trend + seasonality + generic")
print(f"\\nInput (last {lookback} returns):")
print(f"  Mean:  {window.mean()*100:.4f}%")
print(f"  Std:   {window.std()*100:.4f}%")
print(f"  Last:  {window[-1]*100:+.4f}%")

print(f"\\n{horizon}-day Forecast:")
for d in range(horizon):
    print(f"  Day {d+1}: {forecast[d]*100:+.4f}%")

print(f"\\nStack Contributions:")
stack_names = ['Trend', 'Seasonality', 'Generic']
total_contrib = sum(contributions)
for name, contrib, sf in zip(stack_names, contributions, stack_forecasts):
    pct = contrib / total_contrib * 100 if total_contrib > 0 else 33
    print(f"  {name:<15} {pct:>5.1f}%  forecast_mean={sf.mean()*100:+.4f}%")

print(f"\\nResidual norm: {np.linalg.norm(window - window):.6f}")
print(f"Forecast sum: {forecast.sum()*100:+.4f}% "
      f"(cumulative {horizon}-day predicted return)")`}),e.jsx(T,{title:"N-BEATS Decomposition of Nifty Returns",difficulty:"intermediate",problem:"N-BEATS produces a 5-day Nifty forecast with stack contributions: Trend=+0.12%, Seasonality=-0.05%, Generic=+0.03%. What is the total forecast and which component dominates?",solution:[{step:"Sum stack forecasts",formula:"\\hat{y} = 0.12\\% + (-0.05\\%) + 0.03\\% = +0.10\\%",explanation:"Total 5-day forecast is +0.10% return."},{step:"Analyze contributions",formula:"\\text{Trend: } 0.12/0.20 = 60\\%,\\; \\text{Seasonal: } 0.05/0.20 = 25\\%",explanation:"Trend dominates (60%), followed by seasonality (25%). The seasonal component is negative, suggesting a typical month-end pattern."},{step:"Trading signal",formula:"\\text{Net: } +0.10\\% \\Rightarrow \\text{Weak Long}",explanation:"The bullish trend is partially offset by negative seasonality. A cautious long position with reduced size would be appropriate, given the cross-currents between trend and seasonal components."}]}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"N-BEATS provides a powerful framework for financial time series forecasting with built-in interpretability. The doubly residual architecture naturally decomposes Nifty returns into trend, seasonal, and idiosyncratic components, allowing traders to understand what drives each prediction. The generic stacks capture complex patterns (macro events, flow dynamics) that do not fit simple trend or seasonal templates. N-BEATS has shown state-of-the-art performance on multiple financial forecasting benchmarks."})})]})}const fe=Object.freeze(Object.defineProperty({__proto__:null,default:V},Symbol.toStringTag,{value:"Module"}));function P(){const[a,g]=c.useState(4),[s,y]=c.useState(30),o=Array.from({length:5},(i,r)=>Math.exp(-r*.5)/2.5);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Temporal Fusion Transformer Attention"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Visualize multi-head attention weights over Nifty time steps."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Attention Heads = ",a]}),e.jsx("input",{type:"range",min:"1",max:"8",step:"1",value:a,onChange:i=>g(parseInt(i.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Sequence Length = ",s]}),e.jsx("input",{type:"range",min:"10",max:"60",step:"5",value:s,onChange:i=>y(parseInt(i.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsx("svg",{viewBox:"0 0 400 100",className:"w-full max-w-md mx-auto block",children:o.map((i,r)=>{const d=50+r*70,n=i*150;return e.jsxs("g",{children:[e.jsx("rect",{x:d,y:80-n,width:"40",height:n,fill:"#6366f1",opacity:.5+i,rx:"3"}),e.jsxs("text",{x:d+20,y:"95",textAnchor:"middle",className:"text-[8px]",fill:"#6b7280",children:["t-",r]}),e.jsxs("text",{x:d+20,y:75-n,textAnchor:"middle",className:"text-[7px] font-bold",fill:"#4338ca",children:[(i*100).toFixed(0),"%"]})]},r)})}),e.jsxs("p",{className:"mt-2 text-center text-xs text-gray-500 dark:text-gray-400",children:["Attention weights decay for older time steps, with ",a," heads capturing different temporal patterns"]})]})}function O(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Temporal Fusion Transformers"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"The Temporal Fusion Transformer (TFT) combines recurrent layers for local processing with multi-head attention for learning long-range dependencies. Designed specifically for multi-horizon forecasting, TFT is well-suited for predicting Nifty 50 returns across multiple time horizons while providing interpretable attention weights and variable importance."}),e.jsx(N,{title:"Temporal Fusion Transformer",label:"Definition 13.4",definition:"TFT is a transformer-based architecture for multi-horizon time series forecasting that handles static covariates (sector, market cap), known future inputs (calendar features, scheduled events), and observed past inputs (returns, volume). It uses variable selection networks, gated residual networks, and interpretable multi-head attention.",notation:"\\hat{y}_{t+\\tau} = \\text{TFT}(x_{1:t}^{observed}, x_{t+1:t+\\tau}^{known}, s^{static})"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Multi-Head Attention for Financial Time Series"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The scaled dot-product attention in TFT captures temporal dependencies:"}),e.jsx(t.BlockMath,{math:"\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V"}),e.jsx(t.BlockMath,{math:"\\text{MultiHead}(Q, K, V) = \\text{Concat}(\\text{head}_1, ..., \\text{head}_h)W^O"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Each attention head can learn different temporal patterns: one head may focus on recent momentum, another on weekly seasonality, and another on monthly patterns in Nifty data."}),e.jsx(v,{title:"Variable Selection Network",label:"Theorem 13.4",statement:"TFT's variable selection network learns to weight input features adaptively: v_t = \\text{Softmax}(W_v \\cdot \\text{GRN}([\\xi_1, ..., \\xi_K])) where GRN is a Gated Residual Network. This provides per-time-step feature importance, revealing which Nifty features (FII flow, VIX, momentum) drive predictions at each point.",proof:"The softmax over GRN outputs produces a probability distribution over features. The GRN provides nonlinear feature interactions through gating: GRN(x) = LayerNorm(x + GLU(W_1 x + b_1)) where GLU(x) = sigmoid(x_1) * x_2 is the Gated Linear Unit."}),e.jsx(f,{title:"TFT for Indian Equity Forecasting",type:"tip",children:e.jsxs("ul",{className:"space-y-1 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Static Features:"})," Sector (IT, Banking, FMCG), market cap bucket, promoter holding"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Known Future:"})," Day of week, month, F&O expiry flag, RBI policy dates"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Observed Past:"})," Returns, volume, FII/DII flows, India VIX, technical indicators"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Multi-horizon:"})," Predict 1-day, 5-day, and 20-day returns simultaneously"]})]})}),e.jsx(P,{}),e.jsx(w,{title:"temporal_fusion.py",runnable:!0,code:`import numpy as np

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
print(f"  In bear markets: VIX and volume become more important.")`}),e.jsx(T,{title:"TFT Attention Analysis for Nifty",difficulty:"intermediate",problem:"TFT attention weights for a 5-day Nifty forecast show: t-1: 35%, t-2: 25%, t-3: 15%, t-5: 15%, t-10: 10%. What does this reveal about the model's temporal focus?",solution:[{step:"Recent bias",formula:"\\text{Attention}_{t-1} + \\text{Attention}_{t-2} = 60\\%",explanation:"The last 2 days carry 60% of attention weight, indicating strong short-term momentum influence."},{step:"Weekly pattern",formula:"\\text{Attention}_{t-5} = 15\\%",explanation:"The t-5 spike captures weekly seasonality (same day previous week)."},{step:"Longer memory",formula:"\\text{Attention}_{t-10} = 10\\%",explanation:"Two-week lookback captures bi-weekly patterns. The model has learned a decaying attention with punctuated weekly peaks, consistent with market microstructure."}]}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Temporal Fusion Transformers combine the strengths of recurrent processing and attention-based learning for multi-horizon financial forecasting. The built-in variable selection and interpretable attention weights make TFT particularly valuable for Indian equity strategies where understanding which features drive predictions (and when) is as important as prediction accuracy itself."})})]})}const ge=Object.freeze(Object.defineProperty({__proto__:null,default:O},Symbol.toStringTag,{value:"Module"}));function W(){const[a,g]=c.useState(64),[s,y]=c.useState(4),o=Math.floor(a/s),i=a*a*4*3+a*a;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Stock Transformer Architecture"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Configure transformer dimensions for cross-sectional Nifty 500 stock prediction."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["d_model = ",a]}),e.jsx("input",{type:"range",min:"32",max:"256",step:"32",value:a,onChange:r=>g(parseInt(r.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["n_heads = ",s]}),e.jsx("input",{type:"range",min:"1",max:"8",step:"1",value:s,onChange:r=>y(parseInt(r.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-2 text-center text-xs",children:[e.jsxs("div",{className:"rounded-lg bg-indigo-50 p-2 dark:bg-indigo-900/30",children:[e.jsx("span",{className:"text-gray-500",children:"d_k per head"}),e.jsx("p",{className:"text-base font-bold text-indigo-600",children:o})]}),e.jsxs("div",{className:"rounded-lg bg-green-50 p-2 dark:bg-green-900/30",children:[e.jsx("span",{className:"text-gray-500",children:"Total Params"}),e.jsxs("p",{className:"text-base font-bold text-green-600",children:[(i/1e3).toFixed(1),"K"]})]}),e.jsxs("div",{className:"rounded-lg bg-amber-50 p-2 dark:bg-amber-900/30",children:[e.jsx("span",{className:"text-gray-500",children:"FLOPS/token"}),e.jsxs("p",{className:"text-base font-bold text-amber-600",children:[(i*2/1e3).toFixed(1),"K"]})]})]}),e.jsx("svg",{viewBox:"0 0 400 80",className:"w-full max-w-md mx-auto block mt-4",children:Array.from({length:s},(r,d)=>e.jsxs("g",{children:[e.jsx("rect",{x:20+d*(360/s),y:"10",width:340/s-10,height:"50",rx:"5",fill:"#6366f1",opacity:.3+d*.15}),e.jsxs("text",{x:20+d*(360/s)+(340/s-10)/2,y:"38",textAnchor:"middle",className:"text-[9px] font-bold",fill:"#4338ca",children:["Head ",d+1]}),e.jsxs("text",{x:20+d*(360/s)+(340/s-10)/2,y:"50",textAnchor:"middle",className:"text-[7px]",fill:"#6b7280",children:["d=",o]})]},d))})]})}function H(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Transformer Models for Stock Prediction"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Transformer architectures, originally designed for NLP, have been adapted for stock prediction by treating financial time series as sequences of tokens. Cross-sectional transformers process multiple Nifty 500 stocks simultaneously, learning inter-stock relationships through attention mechanisms that capture lead-lag effects and sector co-movements."}),e.jsx(N,{title:"Stock Transformer",label:"Definition 13.5",definition:"A stock transformer applies self-attention across both temporal and cross-sectional dimensions. Each stock at each time step is represented as a token embedding, enabling the model to learn which stocks' past behavior is informative for predicting a target stock's future returns.",notation:"z_i^{(l+1)} = \\text{FFN}(\\text{MultiHead}(z_i^{(l)}, Z^{(l)}, Z^{(l)})) + z_i^{(l)}"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Positional Encoding for Financial Data"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Financial positional encodings combine temporal position with calendar features:"}),e.jsx(t.BlockMath,{math:"PE(t, 2i) = \\sin\\left(\\frac{t}{10000^{2i/d}}\\right), \\quad PE(t, 2i+1) = \\cos\\left(\\frac{t}{10000^{2i/d}}\\right)"}),e.jsx(t.BlockMath,{math:"x_t^{stock} = \\text{Embed}(\\text{features}_t) + PE(t) + \\text{SectorEmbed}(s)"}),e.jsx(v,{title:"Attention Complexity for Cross-Sectional Models",label:"Theorem 13.5",statement:"Standard self-attention over N stocks and T time steps has O(N^2 T^2) complexity. For the Nifty 500 universe with 252 daily observations, this requires approximately 10^{10} operations per forward pass, necessitating efficient attention variants (linear attention, sparse attention) for practical deployment.",proof:"Self-attention computes QK^T of dimensions (NT, NT), requiring O((NT)^2 d) operations. For N=500, T=252, d=64: ops = 500^2 * 252^2 * 64 ≈ 10^{12}. Sparse attention with local temporal windows reduces this to O(NT * (N + w) * d) where w is the temporal window size."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Cross-Sectional Attention"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Cross-sectional attention learns inter-stock dependencies at each time step:"}),e.jsx(t.BlockMath,{math:"\\alpha_{ij}^t = \\frac{\\exp(q_i^t \\cdot k_j^t / \\sqrt{d_k})}{\\sum_{m=1}^{N} \\exp(q_i^t \\cdot k_m^t / \\sqrt{d_k})}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["High attention ",e.jsx(t.InlineMath,{math:"\\alpha_{ij}^t"})," indicates stock ",e.jsx(t.InlineMath,{math:"j"})," is informative for predicting stock ",e.jsx(t.InlineMath,{math:"i"})," at time ",e.jsx(t.InlineMath,{math:"t"}),". This captures lead-lag effects where certain Nifty stocks (e.g., HDFC Bank leading other private banks) carry predictive information."]}),e.jsx(f,{title:"Stock Transformers for NSE",type:"tip",children:e.jsxs("ul",{className:"space-y-1 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Token Design:"})," Each token = (stock, time) pair with features [returns, volume, technicals]"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Sector Embeddings:"})," Learnable embeddings for GICS sectors capture industry structure"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Lead-Lag Discovery:"})," Attention weights reveal which Nifty stocks lead others"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Output:"})," Cross-sectional stock ranking for long-short portfolio construction"]})]})}),e.jsx(W,{}),e.jsx(w,{title:"stock_transformer.py",runnable:!0,code:`import numpy as np

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
        print(f"  {stock_names[i]:<12} attends to: {', '.join(top_scores[:2])}")`}),e.jsx(T,{title:"Lead-Lag Discovery via Attention",difficulty:"intermediate",problem:"A stock transformer's attention weights show HDFCBANK attending to ICICIBANK with weight 0.28 and SBIN with 0.15. What does this mean for trading?",solution:[{step:"Interpret attention",formula:"\\alpha_{HDFC \\to ICICI} = 0.28 > \\alpha_{HDFC \\to SBI} = 0.15",explanation:"The model finds ICICI Bank more informative for predicting HDFC Bank than SBI."},{step:"Lead-lag implication",formula:"\\text{ICICI movements may lead HDFC movements}",explanation:"This could indicate that ICICI Bank price changes precede similar moves in HDFC Bank, creating a tradeable lead-lag signal."},{step:"Trading application",formula:"\\text{If ICICI rises sharply, go long HDFC}",explanation:"Use the attention-discovered lead-lag relationship for pairs trading within the Bank Nifty sector. Backtest the signal before deployment."}]}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Stock transformers learn cross-sectional relationships between Nifty stocks through attention mechanisms, automatically discovering lead-lag effects, sector co-movements, and factor exposures. The attention weights provide interpretable insights into inter-stock dependencies, enabling both alpha generation (trading lead-lag signals) and risk management (understanding portfolio correlation structure). For practical deployment on NSE, use efficient attention variants to handle the full Nifty 500 universe."})})]})}const ue=Object.freeze(Object.defineProperty({__proto__:null,default:H},Symbol.toStringTag,{value:"Module"}));function K(){const[a,g]=c.useState(.7),[s,y]=c.useState(5),o=100,i=o*(1-a),r=o/i;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Efficient Attention Comparison"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Compare attention efficiency for long-horizon Nifty forecasting."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Sparsity = ",(a*100).toFixed(0),"%"]}),e.jsx("input",{type:"range",min:"0.1",max:"0.95",step:"0.05",value:a,onChange:d=>g(parseFloat(d.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Auto-Correlation Lag = ",s]}),e.jsx("input",{type:"range",min:"1",max:"20",step:"1",value:s,onChange:d=>y(parseInt(d.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-2 text-center text-xs",children:[e.jsxs("div",{className:"rounded-lg bg-red-50 p-2 dark:bg-red-900/30",children:[e.jsx("span",{className:"text-gray-500",children:"Full Attention"}),e.jsxs("p",{className:"text-base font-bold text-red-600",children:["O(T",e.jsx("sup",{children:"2"}),")"]})]}),e.jsxs("div",{className:"rounded-lg bg-green-50 p-2 dark:bg-green-900/30",children:[e.jsx("span",{className:"text-gray-500",children:"Informer (Sparse)"}),e.jsx("p",{className:"text-base font-bold text-green-600",children:"O(T log T)"})]}),e.jsxs("div",{className:"rounded-lg bg-blue-50 p-2 dark:bg-blue-900/30",children:[e.jsx("span",{className:"text-gray-500",children:"Autoformer (AC)"}),e.jsx("p",{className:"text-base font-bold text-blue-600",children:"O(T log T)"})]})]}),e.jsxs("p",{className:"mt-2 text-center text-xs text-gray-500",children:["Speedup from sparse attention: ",r.toFixed(1),"x with ",(a*100).toFixed(0),"% sparsity"]})]})}function X(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Informer and Autoformer for Long-Horizon Forecasting"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Standard transformers have quadratic complexity in sequence length, limiting their use for long-horizon financial forecasting. Informer introduces ProbSparse attention that reduces complexity to O(T log T), while Autoformer replaces attention with auto-correlation mechanisms designed for time series. Both enable efficient multi-week Nifty forecasting."}),e.jsx(N,{title:"ProbSparse Attention (Informer)",label:"Definition 13.6",definition:"Informer's ProbSparse attention selects only the top-u queries with highest attention scores, where u = c * ln(T). This reduces the attention matrix from T x T to u x T while preserving the most informative query-key interactions. The KL-divergence between each query's attention distribution and a uniform distribution identifies the most dominant queries.",notation:"M(q_i, K) = \\max_j \\frac{q_i k_j^T}{\\sqrt{d}} - \\frac{1}{T}\\sum_j \\frac{q_i k_j^T}{\\sqrt{d}}"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Autoformer: Auto-Correlation Mechanism"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Autoformer replaces dot-product attention with auto-correlation computed via FFT:"}),e.jsx(t.BlockMath,{math:"R_{XX}(\\tau) = \\frac{1}{T}\\sum_{t=1}^{T-\\tau} x_t \\cdot x_{t+\\tau} \\quad \\text{(auto-correlation at lag } \\tau \\text{)}"}),e.jsx(t.BlockMath,{math:"\\text{AutoCorr}(Q, K, V) = \\sum_{\\tau \\in \\text{TopK}} \\text{softmax}(R_{QK}(\\tau)) \\cdot \\text{Roll}(V, \\tau)"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The auto-correlation mechanism is computed in ",e.jsx(t.InlineMath,{math:"O(T \\log T)"})," using FFT, naturally capturing periodic patterns in Nifty data (weekly, monthly, quarterly cycles)."]}),e.jsx(v,{title:"Complexity Comparison",label:"Theorem 13.6",statement:"For sequence length T: Full attention is O(T^2), Informer ProbSparse is O(T log T), and Autoformer Auto-Correlation is O(T log T). For T=252 (1 year of Nifty daily data): Full = 63,504 ops, Informer = 1,393 ops, Autoformer = 1,393 ops. This 45x reduction enables practical multi-year Nifty backtesting.",proof:"ProbSparse selects u = c*ln(T) queries, computing attention for each over T keys: O(c*T*ln(T)). Autoformer uses FFT to compute autocorrelation: FFT is O(T*log(T)), and TopK selection is O(T). Both achieve O(T*log(T)) overall."}),e.jsx(t.BlockMath,{math:"\\text{Decomposition: } x_t = \\text{Trend}_t + \\text{Seasonal}_t + \\text{Residual}_t"}),e.jsx(f,{title:"Efficient Transformers for Indian Market Applications",type:"tip",children:e.jsxs("ul",{className:"space-y-1 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Informer:"})," Best for event-driven forecasting where specific past events (budget, RBI) matter most"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Autoformer:"})," Best for cyclical pattern capture (monthly F&O expiry, quarterly results seasons)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Long Horizon:"})," Both enable 20-60 day forecasts for Nifty with practical compute"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Multi-variate:"})," Process OHLCV + macro indicators as multi-channel time series"]})]})}),e.jsx(K,{}),e.jsx(w,{title:"informer_autoformer.py",runnable:!0,code:`import numpy as np

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
print(f"  Autoformer output norm: {np.linalg.norm(out_auto):.3f}")`}),e.jsx(T,{title:"Choosing Between Informer and Autoformer for Nifty",difficulty:"intermediate",problem:"You need to forecast Nifty 50 returns for 20 days ahead using 252 days of history. The data shows strong weekly and monthly patterns. Should you use Informer or Autoformer?",solution:[{step:"Analyze data characteristics",formula:"\\text{Strong periodic patterns: weekly (lag 5), monthly (lag 22)}",explanation:"The presence of clear periodic patterns favors Autoformer, which uses auto-correlation."},{step:"Compare mechanisms",formula:"\\text{Autoformer: FFT-based} \\Rightarrow \\text{naturally captures periodicity}",explanation:"Autoformer discovers periodic patterns automatically through FFT-based auto-correlation, while Informer uses sparse point-wise attention."},{step:"Recommendation",formula:"\\text{Autoformer for periodic Nifty patterns}",explanation:"Use Autoformer when the target has clear cyclical patterns (F&O expiry, quarterly results). Use Informer when specific past events (RBI decisions, budget) are more important than periodic patterns."}]}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Informer and Autoformer enable practical long-horizon financial forecasting by reducing transformer complexity from O(T^2) to O(T log T). Informer excels at identifying which specific past events matter most (event-driven alpha), while Autoformer excels at capturing periodic patterns (cyclical alpha). For Indian equity markets, Autoformer naturally discovers weekly (F&O) and monthly (expiry) patterns, while Informer identifies high-impact events like RBI announcements. Both can process year-long Nifty histories efficiently."})})]})}const ye=Object.freeze(Object.defineProperty({__proto__:null,default:X},Symbol.toStringTag,{value:"Module"}));function U(){const[a,g]=c.useState(.5),s=[{x:100,y:50,name:"TCS"},{x:160,y:30,name:"INFY"},{x:80,y:100,name:"HDFC"},{x:200,y:80,name:"ICICI"},{x:140,y:120,name:"REL"},{x:250,y:50,name:"WIPRO"}],o=[{i:0,j:1,w:.8},{i:0,j:5,w:.7},{i:1,j:5,w:.65},{i:2,j:3,w:.75},{i:2,j:4,w:.45},{i:3,j:4,w:.5},{i:0,j:2,w:.3}].filter(i=>i.w>=a);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Stock Correlation Graph"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust correlation threshold to build the Nifty stock graph."}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400 mb-4",children:[e.jsxs("span",{children:["Correlation Threshold = ",a.toFixed(2)]}),e.jsx("input",{type:"range",min:"0.2",max:"0.9",step:"0.05",value:a,onChange:i=>g(parseFloat(i.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("svg",{viewBox:"0 0 320 160",className:"w-full max-w-md mx-auto block",children:[o.map((i,r)=>e.jsx("line",{x1:s[i.i].x,y1:s[i.i].y,x2:s[i.j].x,y2:s[i.j].y,stroke:"#6366f1",strokeWidth:i.w*3,opacity:i.w*.8},r)),s.map((i,r)=>e.jsxs("g",{children:[e.jsx("circle",{cx:i.x,cy:i.y,r:"15",fill:"#818cf8",stroke:"#4338ca",strokeWidth:"1.5"}),e.jsx("text",{x:i.x,y:i.y+3,textAnchor:"middle",className:"text-[7px] font-bold",fill:"white",children:i.name})]},r))]}),e.jsxs("p",{className:"mt-2 text-center text-xs text-gray-500",children:[o.length," edges at threshold ",a.toFixed(2)," | IT cluster: TCS-INFY-WIPRO | Banking: HDFC-ICICI"]})]})}function Q(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Stock Market Graphs"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Stock markets naturally form graphs where nodes are stocks and edges represent relationships (correlation, supply chain, sector membership). Graph Neural Networks (GNNs) exploit this relational structure to improve predictions for individual Nifty stocks by aggregating information from related stocks."}),e.jsx(N,{title:"Stock Market Graph",label:"Definition 13.7",definition:"A stock market graph G = (V, E, A) consists of nodes V (stocks), edges E (relationships), and an adjacency matrix A where A_ij captures the strength of the relationship between stocks i and j. Common graph construction methods include correlation-based thresholding, sector membership, and supply chain linkages.",notation:"A_{ij} = \\begin{cases} \\rho_{ij} & \\text{if } |\\rho_{ij}| > \\tau \\\\ 0 & \\text{otherwise} \\end{cases}"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Graph Construction Methods"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Three approaches to constructing stock graphs for Indian equities:"}),e.jsx(t.BlockMath,{math:"\\text{Correlation: } A_{ij}^{corr} = \\max(0, \\rho(r_i, r_j) - \\tau)"}),e.jsx(t.BlockMath,{math:"\\text{Sector: } A_{ij}^{sector} = \\mathbf{1}[\\text{sector}_i = \\text{sector}_j]"}),e.jsx(t.BlockMath,{math:"\\text{Industry chain: } A_{ij}^{chain} = \\text{revenue linkage}(i, j)"}),e.jsx(v,{title:"Message Passing on Stock Graphs",label:"Theorem 13.7",statement:"A single layer of graph convolution aggregates information from 1-hop neighbors. After L layers, each node's representation incorporates information from its L-hop neighborhood. For the Nifty 50 sector graph, L=2 layers suffice to propagate information across sector boundaries (IT -> Banking through conglomerate nodes like Reliance).",proof:"In a GCN layer, h_i^{(l+1)} = sigma(sum_{j in N(i)} A_ij W h_j^{(l)}). After L layers, h_i^{(L)} depends on all nodes within L hops. The Nifty sector graph has diameter ~3-4, so L=2-3 provides near-complete information propagation."}),e.jsx(t.BlockMath,{math:"h_i^{(l+1)} = \\sigma\\left(\\sum_{j \\in \\mathcal{N}(i)} \\frac{A_{ij}}{\\sqrt{d_i d_j}} W^{(l)} h_j^{(l)}\\right)"}),e.jsx(f,{title:"Nifty Stock Graph Structure",type:"tip",children:e.jsxs("ul",{className:"space-y-1 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Clusters:"})," IT (TCS-INFY-WIPRO-HCL), Banking (HDFC-ICICI-SBI-AXIS-KOTAK), FMCG (HUL-ITC-NESTLE)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Bridge Nodes:"})," Reliance connects energy, telecom, and retail sectors"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Temporal Edges:"})," Correlation-based edges change with market regimes"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Data Source:"})," Sector membership from NSE, correlations from Zerodha historical data"]})]})}),e.jsx(U,{}),e.jsx(w,{title:"stock_graphs.py",runnable:!0,code:`import numpy as np

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
    print(f"  {rank+1:>2}. {stocks[idx]:<12} {predictions[idx,0]:>+.4f} [{signal}]")`}),e.jsx(T,{title:"Building a Nifty Sector Graph",difficulty:"beginner",problem:"Given 4 stocks: TCS (IT), INFY (IT), HDFC (Bank), ICICI (Bank). Build the sector adjacency matrix and compute average degree.",solution:[{step:"Build adjacency matrix",formula:"A = \\begin{bmatrix} 0 & 1 & 0 & 0 \\\\ 1 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 1 \\\\ 0 & 0 & 1 & 0 \\end{bmatrix}",explanation:"IT stocks (TCS, INFY) connect to each other; banking stocks (HDFC, ICICI) connect to each other."},{step:"Compute degrees",formula:"d_{TCS}=1, d_{INFY}=1, d_{HDFC}=1, d_{ICICI}=1",explanation:"Each stock has degree 1 (connected to one sector peer)."},{step:"Average degree",formula:"\\bar{d} = (1+1+1+1)/4 = 1.0",explanation:"Average degree of 1.0. A fully connected graph within sectors with more stocks would have higher degree, enabling richer information propagation via GNN."}]}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Stock market graphs encode relational structure that individual time series models miss. For the Nifty universe, sector graphs capture obvious industry groupings, while correlation graphs discover hidden connections that change with market regimes. GNNs propagate information across the graph, enabling each stock's prediction to benefit from its neighbors' features -- a natural implementation of the financial intuition that sector peers move together."})})]})}const _e=Object.freeze(Object.defineProperty({__proto__:null,default:Q},Symbol.toStringTag,{value:"Module"}));function $(){const[a,g]=c.useState("sector"),[s,y]=c.useState(2),o=12,i=s*1.5,r=.8,d=r+s*.15;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: GNN Portfolio Optimization"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Compare GNN-enhanced vs standard portfolio construction for Nifty stocks."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Graph Type: ",a]}),e.jsxs("select",{value:a,onChange:n=>g(n.target.value),className:"rounded border border-gray-300 px-2 py-1 text-xs dark:border-gray-600 dark:bg-gray-800",children:[e.jsx("option",{value:"sector",children:"Sector"}),e.jsx("option",{value:"correlation",children:"Correlation"}),e.jsx("option",{value:"supply_chain",children:"Supply Chain"})]})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["GNN Layers = ",s]}),e.jsx("input",{type:"range",min:"1",max:"4",step:"1",value:s,onChange:n=>y(parseInt(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-3 text-center text-xs",children:[e.jsxs("div",{className:"rounded-lg bg-gray-100 p-3 dark:bg-gray-800",children:[e.jsx("span",{className:"text-gray-500",children:"Standard Portfolio"}),e.jsxs("p",{className:"text-sm font-bold text-gray-600",children:["Return: ",o,"% | Sharpe: ",r.toFixed(2)]})]}),e.jsxs("div",{className:"rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30",children:[e.jsx("span",{className:"text-gray-500",children:"GNN Portfolio"}),e.jsxs("p",{className:"text-sm font-bold text-indigo-600",children:["Return: ",(o+i).toFixed(1),"% | Sharpe: ",d.toFixed(2)]})]})]})]})}function Y(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"GNN-Based Portfolio Construction"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Graph Neural Networks enhance portfolio construction by incorporating inter-stock relationships into the optimization process. Rather than treating stocks independently, GNN portfolios leverage sector structure, correlation networks, and supply chain linkages to produce better-diversified and higher-returning portfolios on NSE/BSE."}),e.jsx(N,{title:"Graph-Aware Portfolio Optimization",label:"Definition 13.8",definition:"GNN portfolio optimization augments traditional mean-variance optimization by using graph-convolved features for return prediction and graph-regularized weights for diversification. The portfolio weight vector w is learned through a GNN that processes stock features on the market graph, producing weights that respect the graph's community structure.",notation:"w^* = \\text{GNN}(X, A; \\theta) \\quad \\text{s.t. } w^T \\mathbf{1} = 1, \\; w \\geq 0"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"GNN for Return Prediction and Weight Learning"}),e.jsx(t.BlockMath,{math:"\\hat{\\mu} = \\text{GCN}(X, A) \\cdot W_{out}, \\quad w^* = \\text{softmax}(\\hat{\\mu} / \\tau)"}),e.jsx(t.BlockMath,{math:"\\text{Graph regularization: } \\Omega(w) = w^T L w = \\sum_{(i,j) \\in E} A_{ij}(w_i - w_j)^2"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"L = D - A"})," is the graph Laplacian. The regularization term penalizes dissimilar weights for connected stocks, encouraging sector-balanced portfolios."]}),e.jsx(v,{title:"Graph Regularization and Diversification",label:"Theorem 13.8",statement:"The graph Laplacian regularization \\Omega(w) = w^T L w measures the smoothness of portfolio weights on the graph. Minimizing \\Omega encourages similar weights for connected stocks (sector peers), promoting within-sector diversification. The spectrum of L reveals the graph's community structure, with the Fiedler vector providing the optimal 2-cluster partition.",proof:"w^T L w = sum_{(i,j)} A_{ij}(w_i - w_j)^2 >= 0. This is minimized when w is constant on each connected component. The Fiedler vector (eigenvector of second-smallest eigenvalue of L) provides the cut that separates the graph into two balanced clusters, which for Nifty corresponds to the primary sector divide."}),e.jsx(f,{title:"GNN Portfolio Applications for NSE",type:"tip",children:e.jsxs("ul",{className:"space-y-1 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Sector Diversification:"})," Graph Laplacian regularization prevents over-concentration in single Nifty sectors"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Risk Propagation:"})," GNN captures how risk propagates through the stock network (e.g., banking sector contagion)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Rebalancing:"})," Graph-aware rebalancing reduces turnover by respecting sector structure"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Smallcase Integration:"})," GNN-optimized portfolios can be deployed as Zerodha Smallcases"]})]})}),e.jsx($,{}),e.jsx(w,{title:"gnn_portfolio.py",runnable:!0,code:`import numpy as np

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
print(f"(Lower = smoother weights across sector peers)")`}),e.jsx(T,{title:"Graph-Regularized Portfolio",difficulty:"intermediate",problem:"A GNN assigns weights: TCS=15%, INFY=12%, HDFC=18%, ICICI=20%, REL=10%. TCS-INFY are connected (IT), HDFC-ICICI are connected (Bank). Compute the graph Laplacian penalty.",solution:[{step:"Identify connected pairs",formula:"E = \\{(TCS, INFY), (HDFC, ICICI)\\}",explanation:"Two edges: within IT sector and within Banking sector."},{step:"Compute penalty",formula:"\\Omega = (0.15-0.12)^2 + (0.18-0.20)^2 = 0.0009 + 0.0004 = 0.0013",explanation:"Small penalty indicates weights are smooth within sectors."},{step:"Interpretation",formula:"\\text{IT spread: 3\\%, Banking spread: 2\\%}",explanation:"The GNN has learned to assign similar weights within sectors, promoting sector-balanced diversification. The banking overweight (38% combined) might trigger additional diversification constraints."}]}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"GNN-based portfolio optimization naturally incorporates stock relationships into weight determination. Graph Laplacian regularization promotes sector diversification, while GNN feature propagation enables each stock's weight to benefit from its sector peers' information. For Indian portfolios, this approach bridges the gap between traditional Markowitz optimization and the relational structure of the NSE market, producing more robust and diversified allocations."})})]})}const be=Object.freeze(Object.defineProperty({__proto__:null,default:Y},Symbol.toStringTag,{value:"Module"}));function Z(){const[a,g]=c.useState(60),[s,y]=c.useState("normal"),i=s==="crisis"?35:s==="rally"?20:15,r=i/45;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Dynamic Graph Evolution"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Observe how the Nifty stock graph densifies during market stress."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Rolling Window = ",a," days"]}),e.jsx("input",{type:"range",min:"20",max:"120",step:"10",value:a,onChange:d=>g(parseInt(d.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Market Regime: ",s]}),e.jsxs("select",{value:s,onChange:d=>y(d.target.value),className:"rounded border border-gray-300 px-2 py-1 text-xs dark:border-gray-600 dark:bg-gray-800",children:[e.jsx("option",{value:"normal",children:"Normal"}),e.jsx("option",{value:"crisis",children:"Crisis"}),e.jsx("option",{value:"rally",children:"Rally"})]})]})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-2 text-center text-xs",children:[e.jsxs("div",{className:"rounded-lg bg-indigo-50 p-2 dark:bg-indigo-900/30",children:[e.jsx("span",{className:"text-gray-500",children:"Active Edges"}),e.jsx("p",{className:"text-base font-bold text-indigo-600",children:i})]}),e.jsxs("div",{className:"rounded-lg bg-amber-50 p-2 dark:bg-amber-900/30",children:[e.jsx("span",{className:"text-gray-500",children:"Graph Density"}),e.jsxs("p",{className:"text-base font-bold text-amber-600",children:[(r*100).toFixed(0),"%"]})]}),e.jsxs("div",{className:`rounded-lg p-2 ${s==="crisis"?"bg-red-50 dark:bg-red-900/30":"bg-green-50 dark:bg-green-900/30"}`,children:[e.jsx("span",{className:"text-gray-500",children:"Diversification"}),e.jsx("p",{className:`text-base font-bold ${s==="crisis"?"text-red-600":"text-green-600"}`,children:s==="crisis"?"LOW":"NORMAL"})]})]})]})}function J(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Dynamic Graphs for Financial Markets"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Financial market graphs are inherently dynamic -- correlations between Nifty stocks shift with market regimes, macroeconomic conditions, and sector rotation. Dynamic graph models capture this time-varying structure, enabling adaptive portfolio management and regime-aware trading strategies."}),e.jsx(N,{title:"Dynamic Stock Graph",label:"Definition 13.9",definition:"A dynamic stock graph is a sequence of graphs G_t = (V, E_t, A_t) where the edge set and weights evolve over time. The adjacency matrix A_t is typically computed from rolling-window correlations: A_t(i,j) = rho(r_i, r_j; [t-w, t]) where w is the lookback window.",notation:"G_t = (V, E_t, A_t), \\quad A_t \\neq A_{t'} \\text{ for } t \\neq t'"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Temporal Graph Networks"}),e.jsx(t.BlockMath,{math:"h_i^{(t)} = \\text{GNN}(x_i^{(t)}, \\{h_j^{(t)}\\}_{j \\in \\mathcal{N}_t(i)}, A_t)"}),e.jsx(t.BlockMath,{math:"z_i^{(t)} = \\text{GRU}(h_i^{(t)}, z_i^{(t-1)})"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The spatial GNN aggregates neighborhood information on the current graph, while the temporal GRU maintains memory across time steps."}),e.jsx(v,{title:"Correlation Regime Change Detection",label:"Theorem 13.9",statement:"The spectral properties of the dynamic graph Laplacian L_t detect regime changes. The algebraic connectivity lambda_2(L_t) measures graph connectedness: during market crises, correlations increase, driving lambda_2 upward. A sudden increase in lambda_2 signals a regime change where diversification benefits collapse.",proof:"In a crisis, pairwise correlations increase: rho_{ij}^{crisis} > rho_{ij}^{normal}. More edges survive thresholding, increasing graph density. The Fiedler eigenvalue lambda_2 increases monotonically with edge additions for connected graphs, providing a smooth indicator of market stress."}),e.jsx(t.BlockMath,{math:"\\lambda_2(L_t) \\uparrow \\implies \\text{correlation regime shift (crisis)}"}),e.jsx(t.BlockMath,{math:"\\lambda_2(L_t) \\downarrow \\implies \\text{decorrelation (normal/sector rotation)}"}),e.jsx(f,{title:"Dynamic Graphs for Indian Markets",type:"tip",children:e.jsxs("ul",{className:"space-y-1 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Crisis Detection:"})," Graph density spike signals Nifty stress (March 2020, GFC 2008)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Sector Rotation:"})," Changing edge structure reveals sector leadership shifts"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"FII Flow Impact:"})," Large FII selling increases cross-stock correlations, densifying the graph"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Monthly Expiry:"})," F&O expiry creates temporary correlation spikes detectable via dynamic graphs"]})]})}),e.jsx(Z,{}),e.jsx(w,{title:"dynamic_graphs.py",runnable:!0,code:`import numpy as np

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
print(f"  Crisis period avg: {np.mean([m['density'] for m in metrics_history[28:]]):.3f}")`}),e.jsx(T,{title:"Detecting Nifty Crisis via Graph Density",difficulty:"intermediate",problem:"Normal Nifty graph density is 0.25 with std 0.05. During a crisis week, density jumps to 0.55. Is this a statistically significant regime change?",solution:[{step:"Compute z-score",formula:"z = \\frac{0.55 - 0.25}{0.05} = 6.0",explanation:"The density is 6 standard deviations above normal -- extremely significant."},{step:"Interpretation",formula:"z = 6.0 \\gg 2.0 \\Rightarrow \\text{Regime change confirmed}",explanation:"Correlations have spiked, meaning stocks are moving together. Diversification benefit has collapsed."},{step:"Trading action",formula:"\\text{Reduce exposure, increase hedging}",explanation:"Dense graph implies high systematic risk. Reduce long positions, buy Nifty puts or increase India VIX exposure as a hedge. Graph-based regime detection provides earlier warning than VIX alone."}]}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Dynamic graphs capture the time-varying nature of stock market relationships. During crises (Nifty selloffs, FII outflows), the graph densifies as correlations spike, providing an early warning signal. The Fiedler eigenvalue of the graph Laplacian offers a single number that tracks market stress. Combining temporal GNN with dynamic graph updates enables adaptive portfolio management that responds to changing market structure in real-time."})})]})}const je=Object.freeze(Object.defineProperty({__proto__:null,default:J},Symbol.toStringTag,{value:"Module"}));function ee(){const[a,g]=c.useState(50),[s,y]=c.useState(32),[o,i]=c.useState(50),[r,d]=c.useState(2e-4),n=Math.max(.3,3.5*Math.exp(-a/30)+.2+Math.sin(a/5)*.1),l=Math.max(.4,.7-.3*Math.exp(-a/20)+Math.cos(a/7)*.05),p=Math.max(5,120*Math.exp(-a/25)+s*.05),m=Math.min(95,40+a*.8+s*.3),u=4,_=Array.from({length:Math.min(a,100)},(x,h)=>({x:50+h/100*420,y:20+(1-Math.max(.3,3.5*Math.exp(-h/30)+.2)/u)*120})),k=Array.from({length:Math.min(a,100)},(x,h)=>({x:50+h/100*420,y:20+(1-Math.max(.4,.7-.3*Math.exp(-h/20))/u)*120}));return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: TimeGAN Training Monitor"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Simulate TimeGAN training on Nifty 50 daily OHLCV data. Watch generator and discriminator losses converge as the model learns to produce realistic synthetic paths."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Epoch = ",a]}),e.jsx("input",{type:"range",min:"1",max:"100",step:"1",value:a,onChange:x=>g(parseInt(x.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Latent Dim = ",s]}),e.jsx("input",{type:"range",min:"8",max:"128",step:"8",value:s,onChange:x=>y(parseInt(x.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Sequence Length = ",o]}),e.jsx("input",{type:"range",min:"10",max:"100",step:"5",value:o,onChange:x=>i(parseInt(x.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Disc LR = ",r.toFixed(4)]}),e.jsx("input",{type:"range",min:"0.00005",max:"0.001",step:"0.00005",value:r,onChange:x=>d(parseFloat(x.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 520 180",className:"w-full max-w-xl mx-auto block","aria-label":"GAN training curves",children:[e.jsx("line",{x1:"50",y1:"140",x2:"470",y2:"140",stroke:"#d1d5db",strokeWidth:"1"}),e.jsx("line",{x1:"50",y1:"20",x2:"50",y2:"140",stroke:"#d1d5db",strokeWidth:"1"}),e.jsx("text",{x:"260",y:"158",textAnchor:"middle",className:"text-[9px]",fill:"#6b7280",children:"Epoch"}),e.jsx("text",{x:"15",y:"80",textAnchor:"middle",className:"text-[9px]",fill:"#6b7280",transform:"rotate(-90, 15, 80)",children:"Loss"}),_.length>1&&e.jsx("polyline",{fill:"none",stroke:"#6366f1",strokeWidth:"2",opacity:"0.8",points:_.map(x=>`${x.x},${x.y}`).join(" ")}),k.length>1&&e.jsx("polyline",{fill:"none",stroke:"#ef4444",strokeWidth:"2",opacity:"0.8",points:k.map(x=>`${x.x},${x.y}`).join(" ")}),e.jsx("rect",{x:"300",y:"10",width:"12",height:"8",fill:"#6366f1",opacity:"0.8",rx:"1"}),e.jsxs("text",{x:"316",y:"18",className:"text-[8px]",fill:"#6b7280",children:["Generator (",n.toFixed(2),")"]}),e.jsx("rect",{x:"300",y:"22",width:"12",height:"8",fill:"#ef4444",opacity:"0.8",rx:"1"}),e.jsxs("text",{x:"316",y:"30",className:"text-[8px]",fill:"#6b7280",children:["Discriminator (",l.toFixed(2),")"]}),e.jsxs("text",{x:"260",y:"175",textAnchor:"middle",className:"text-[9px] font-semibold",fill:"#16a34a",children:["FID: ",p.toFixed(1)," | Kurtosis Match: ",m.toFixed(0),"%"]})]})]})}function te(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"GANs for Indian Market Data Generation"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Generative Adversarial Networks (GANs) offer a powerful approach to generating realistic synthetic financial time series. TimeGAN, a specialized architecture for temporal data, learns the joint distribution of multi-dimensional financial features while preserving temporal dynamics. For Indian markets with limited history, GANs provide a way to augment training data for ML-based strategies while maintaining the statistical properties unique to NSE/BSE instruments."}),e.jsx(N,{title:"Generative Adversarial Network",label:"Definition 13.7",definition:"A GAN consists of two neural networks -- a generator G and a discriminator D -- trained adversarially. The generator maps random noise to synthetic samples, while the discriminator distinguishes real from generated data. Training converges when the generator produces samples indistinguishable from real data.",notation:e.jsxs(e.Fragment,{children:["The minimax objective is ",e.jsx(t.InlineMath,{math:"\\min_G \\max_D \\mathbb{E}_{x \\sim p_{\\text{data}}}[\\log D(x)] + \\mathbb{E}_{z \\sim p_z}[\\log(1 - D(G(z)))]"}),"."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"TimeGAN Architecture"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"TimeGAN extends the standard GAN framework with four components: an embedding network, a recovery network, a sequence generator, and a sequence discriminator. The key innovation is the supervised loss that enforces temporal consistency:"}),e.jsx(t.BlockMath,{math:"\\mathcal{L}_{\\text{TimeGAN}} = \\mathcal{L}_{\\text{recon}} + \\lambda_s \\mathcal{L}_{\\text{supervised}} + \\lambda_u \\mathcal{L}_{\\text{unsupervised}}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"where the supervised loss ensures the generator respects the autoregressive structure of Nifty returns:"}),e.jsx(t.BlockMath,{math:"\\mathcal{L}_{\\text{supervised}} = \\mathbb{E}\\left[\\sum_{t=1}^{T} \\|h_t - g_s(h_{t-1}, z_t)\\|_2^2\\right]"}),e.jsx(v,{title:"Convergence of Financial GANs",label:"Theorem 13.4",statement:e.jsxs(e.Fragment,{children:["For a TimeGAN with generator capacity sufficient to represent the data distribution, the generated distribution ",e.jsx(t.InlineMath,{math:"p_G"})," converges to the real data distribution ",e.jsx(t.InlineMath,{math:"p_{\\text{data}}"})," in the Wasserstein-1 distance if:"]}),formula:"W_1(p_G, p_{\\text{data}}) \\leq \\epsilon \\quad \\text{as } n_{\\text{train}} \\to \\infty",proof:e.jsx(e.Fragment,{children:"Under the WGAN-GP training objective with gradient penalty, the discriminator approximates the 1-Lipschitz function maximizing the Kantorovich-Rubinstein dual. With sufficient generator capacity and proper hyperparameter tuning (gradient penalty coefficient = 10, n_critic = 5), the generated temporal distribution converges. For financial data, convergence is verified by matching marginal moments (mean, variance, skewness, kurtosis) and temporal statistics (autocorrelation, volatility clustering)."})}),e.jsx(ee,{}),e.jsx(w,{title:"timegan_nifty.py",runnable:!0,code:`import numpy as np

class SimpleTimeGAN:
    """Simplified TimeGAN for Nifty 50 data generation.

    This demonstrates the core concepts. For production use,
    see the ydata-synthetic or gretel-synthetics libraries.
    """

    def __init__(self, seq_len=50, n_features=5, latent_dim=32,
                 hidden_dim=64):
        self.seq_len = seq_len
        self.n_features = n_features  # OHLCV
        self.latent_dim = latent_dim
        self.hidden_dim = hidden_dim

    def _generate_noise(self, n_samples):
        """Generate random latent sequences."""
        return np.random.normal(0, 1,
            (n_samples, self.seq_len, self.latent_dim))

    def generate_synthetic(self, n_samples, real_stats):
        """Generate synthetic data matching real statistics.

        Uses moment matching as a simplified generation method
        to demonstrate the concept.
        """
        z = self._generate_noise(n_samples)

        # Transform noise to match real data moments
        synthetic = np.zeros((n_samples, self.seq_len, self.n_features))

        for f in range(self.n_features):
            mu = real_stats['mean'][f]
            sigma = real_stats['std'][f]
            skew = real_stats['skew'][f]
            kurt = real_stats['kurtosis'][f]

            # Generate with matching moments using Cornish-Fisher
            base = z[:, :, f % self.latent_dim]
            adjusted = mu + sigma * (
                base +
                (skew / 6) * (base**2 - 1) +
                (kurt / 24) * (base**3 - 3 * base)
            )

            # Add temporal autocorrelation
            for t in range(1, self.seq_len):
                acf = real_stats.get('acf1', 0.02)
                adjusted[:, t] = acf * adjusted[:, t-1] + \\
                    np.sqrt(1 - acf**2) * adjusted[:, t]

            synthetic[:, :, f] = adjusted

        return synthetic

    def evaluate(self, real_data, synthetic_data):
        """Evaluate synthetic data quality."""
        metrics = {}

        for f in range(self.n_features):
            real = real_data[:, :, f].flatten()
            synth = synthetic_data[:, :, f].flatten()

            metrics[f'feature_{f}_mean_err'] = abs(
                np.mean(real) - np.mean(synth))
            metrics[f'feature_{f}_std_err'] = abs(
                np.std(real) - np.std(synth))
            metrics[f'feature_{f}_kurt_err'] = abs(
                float(np.mean((real - np.mean(real))**4) /
                      np.std(real)**4) -
                float(np.mean((synth - np.mean(synth))**4) /
                      np.std(synth)**4)
            )

        return metrics

# --- Demo: Generate Synthetic Nifty Data ---
np.random.seed(42)

# Simulated real Nifty 50 OHLCV statistics
real_stats = {
    'mean': [0.0005, 0.0008, -0.0003, 0.0004, 1e6],
    'std': [0.012, 0.013, 0.012, 0.012, 5e5],
    'skew': [-0.3, -0.2, -0.4, -0.25, 1.5],
    'kurtosis': [5.2, 4.8, 5.5, 5.0, 8.0],
    'acf1': 0.02,
}

# Generate synthetic data
tgan = SimpleTimeGAN(seq_len=50, n_features=5, latent_dim=32)
n_samples = 100

# Create "real" reference data
real_data = np.random.normal(0, 1, (n_samples, 50, 5))
for f in range(5):
    real_data[:, :, f] = real_data[:, :, f] * real_stats['std'][f] + \\
        real_stats['mean'][f]

synthetic = tgan.generate_synthetic(n_samples, real_stats)

print("=== TimeGAN for Nifty 50 ===")
print(f"Real samples: {n_samples} sequences of {50} days")
print(f"Synthetic samples: {n_samples} sequences")
print(f"Features: Open, High, Low, Close, Volume\\n")

# Evaluate
metrics = tgan.evaluate(real_data, synthetic)
feature_names = ['Open', 'High', 'Low', 'Close', 'Volume']
print("--- Quality Metrics ---")
for f, name in enumerate(feature_names):
    mean_err = metrics[f'feature_{f}_mean_err']
    std_err = metrics[f'feature_{f}_std_err']
    kurt_err = metrics[f'feature_{f}_kurt_err']
    print(f"{name:>8}: Mean Err={mean_err:.6f}, "
          f"Std Err={std_err:.6f}, Kurt Err={kurt_err:.2f}")

# Synthetic data statistics
print("\\n--- Synthetic Data Summary ---")
for f, name in enumerate(feature_names[:4]):
    synth_f = synthetic[:, :, f].flatten()
    print(f"{name:>8}: mean={np.mean(synth_f):.6f}, "
          f"std={np.std(synth_f):.6f}, "
          f"kurt={float(np.mean((synth_f-np.mean(synth_f))**4)/np.std(synth_f)**4):.2f}")

print("\\n--- Use Cases for Indian Markets ---")
print("1. Augment limited NSE history for ML training")
print("2. Stress test strategies on synthetic crashes")
print("3. Generate F&O scenarios for risk management")
print("4. Privacy-preserving data sharing for research")`}),e.jsx(T,{title:"Evaluating GAN Quality for Nifty Data",difficulty:"intermediate",problem:"A TimeGAN trained on 5 years of Nifty 50 daily returns produces synthetic data with kurtosis 4.1 vs real kurtosis 5.2, and autocorrelation of absolute returns at lag 1 of 0.08 vs real 0.15. Is the synthetic data adequate?",solution:[{step:"Evaluate kurtosis match",formula:"\\text{Kurt Error} = |5.2 - 4.1| = 1.1 \\quad (\\approx 21\\% \\text{ relative error})",explanation:"The GAN underestimates tail risk, which is critical for risk management. A relative error below 10% is typically acceptable."},{step:"Evaluate volatility clustering",formula:"\\text{ACF}_{|r|}(1) \\text{ error} = |0.15 - 0.08| = 0.07",explanation:"The GAN captures only about half the real volatility clustering, suggesting the temporal dynamics need improvement."},{step:"Verdict",formula:"\\text{Not adequate for risk modeling; acceptable for signal research}",explanation:"The synthetic data underestimates tails and vol clustering. Add the supervised temporal loss or increase training epochs. For alpha signal research (where distribution shape matters less), it may be acceptable."}]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"GAN Architectures for Financial Data"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Architecture"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Key Feature"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Best For"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Nifty Use Case"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"TimeGAN"}),e.jsx("td",{className:"px-4 py-2",children:"Supervised temporal loss"}),e.jsx("td",{className:"px-4 py-2",children:"OHLCV sequences"}),e.jsx("td",{className:"px-4 py-2",children:"Training data augmentation"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"RCGAN"}),e.jsx("td",{className:"px-4 py-2",children:"Recurrent architecture"}),e.jsx("td",{className:"px-4 py-2",children:"Long sequences"}),e.jsx("td",{className:"px-4 py-2",children:"Multi-month simulations"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"WGAN-GP"}),e.jsx("td",{className:"px-4 py-2",children:"Wasserstein distance"}),e.jsx("td",{className:"px-4 py-2",children:"Stable training"}),e.jsx("td",{className:"px-4 py-2",children:"Fat-tailed distributions"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Quant GAN"}),e.jsx("td",{className:"px-4 py-2",children:"TCN generator"}),e.jsx("td",{className:"px-4 py-2",children:"Volatility clustering"}),e.jsx("td",{className:"px-4 py-2",children:"India VIX dynamics"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Sig-WGAN"}),e.jsx("td",{className:"px-4 py-2",children:"Signature features"}),e.jsx("td",{className:"px-4 py-2",children:"Path-dependent data"}),e.jsx("td",{className:"px-4 py-2",children:"Option hedging paths"})]})]})]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Evaluation Metrics for Synthetic Financial Data"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Evaluating synthetic financial data requires metrics beyond FID scores used in image generation. The key metrics for Indian market data quality are:"}),e.jsx(t.BlockMath,{math:"\\text{Marginal Score} = 1 - \\frac{1}{d}\\sum_{i=1}^{d} \\text{KS}(F_{\\text{real}}^{(i)}, F_{\\text{synth}}^{(i)})"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"\\text{KS}"})," is the Kolmogorov-Smirnov statistic for each of the ",e.jsx(t.InlineMath,{math:"d"})," features. For temporal quality:"]}),e.jsx(t.BlockMath,{math:"\\text{Temporal Score} = 1 - \\frac{1}{L}\\sum_{l=1}^{L} |\\rho_{\\text{real}}(l) - \\rho_{\\text{synth}}(l)|"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"\\rho(l)"})," is the autocorrelation at lag"," ",e.jsx(t.InlineMath,{math:"l"}),". Both scores should exceed 0.9 for production use."]}),e.jsx(f,{title:"Indian Market Training Data",type:"historical",children:e.jsxs("ul",{className:"space-y-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Data Sources:"})," Use NSE bhav copies (1994-present) for daily OHLCV, and Kite Connect / TrueData for intraday. Pre-2010 data may lack corporate action adjustments."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Preprocessing:"})," Remove trading holidays (Diwali Muhurat session has only 1 hour), adjust for stock splits and bonuses, and normalize volumes by free-float market cap."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Validation:"})," Always compare generated data against held-out real data from the most recent 2 years, as Indian market characteristics (particularly retail participation and algo penetration) have evolved significantly since 2020."]})]})}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"GANs, particularly TimeGAN, offer a powerful way to generate synthetic Indian market data that preserves temporal dependencies and distributional properties. The critical evaluation metrics are: (1) marginal distribution match (kurtosis, skewness), (2) temporal dependency preservation (ACF of returns and absolute returns), and (3) cross-asset correlation structure. For Indian markets, always verify that synthetic data reproduces the characteristic fat tails (kurtosis 4-6) and leverage effect observed in Nifty constituents."})})]})}const ke=Object.freeze(Object.defineProperty({__proto__:null,default:te},Symbol.toStringTag,{value:"Module"}));function ae(){const[a,g]=c.useState(0),[s,y]=c.useState(0),[o,i]=c.useState(1),[r,d]=c.useState(8),n=a>.5?"High Vol":a<-.5?"Low Vol":"Normal",l=s>.5?"Bull":s<-.5?"Bear":"Sideways",p=(16+a*8).toFixed(1),m=(12+s*10).toFixed(1),u=(.5+o*.3+Math.abs(a)*.1+Math.abs(s)*.1).toFixed(3),_=(.5*(a*a+s*s)).toFixed(3),k=(-parseFloat(u)-o*parseFloat(_)).toFixed(3),x=Array.from({length:8},(h,j)=>{const I=j/8*2*Math.PI,A=1.5;return{x:260+(a+A*Math.cos(I))*60,y:90+(s+A*Math.sin(I))*-40,label:`S${j+1}`}});return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: VAE Latent Space for Market Scenarios"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Navigate the latent space of a VAE trained on Nifty 50 data. Each point in latent space decodes to a different market scenario with specific vol and trend characteristics."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:[e.jsx(t.InlineMath,{math:"z_1"})," (Vol axis) = ",a.toFixed(1)]}),e.jsx("input",{type:"range",min:"-2",max:"2",step:"0.1",value:a,onChange:h=>g(parseFloat(h.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:[e.jsx(t.InlineMath,{math:"z_2"})," (Trend axis) = ",s.toFixed(1)]}),e.jsx("input",{type:"range",min:"-2",max:"2",step:"0.1",value:s,onChange:h=>y(parseFloat(h.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:[e.jsx(t.InlineMath,{math:"\\beta"})," (KL weight) = ",o.toFixed(1)]}),e.jsx("input",{type:"range",min:"0.1",max:"5",step:"0.1",value:o,onChange:h=>i(parseFloat(h.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Latent Dim = ",r]}),e.jsx("input",{type:"range",min:"2",max:"32",step:"2",value:r,onChange:h=>d(parseInt(h.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 520 200",className:"w-full max-w-xl mx-auto block","aria-label":"VAE latent space",children:[e.jsx("rect",{x:"110",y:"10",width:"300",height:"160",rx:"8",fill:"#f9fafb",stroke:"#e5e7eb",strokeWidth:"1"}),e.jsx("line",{x1:"260",y1:"10",x2:"260",y2:"170",stroke:"#d1d5db",strokeWidth:"0.5",strokeDasharray:"3,3"}),e.jsx("line",{x1:"110",y1:"90",x2:"410",y2:"90",stroke:"#d1d5db",strokeWidth:"0.5",strokeDasharray:"3,3"}),e.jsx("text",{x:"415",y:"93",className:"text-[8px]",fill:"#9ca3af",children:"z1 (vol)"}),e.jsx("text",{x:"262",y:"8",className:"text-[8px]",fill:"#9ca3af",children:"z2 (trend)"}),x.map((h,j)=>e.jsxs("g",{children:[e.jsx("circle",{cx:h.x,cy:h.y,r:"8",fill:"#6366f1",opacity:"0.3",stroke:"#6366f1",strokeWidth:"1"}),e.jsx("text",{x:h.x,y:h.y+3,textAnchor:"middle",className:"text-[7px] font-mono",fill:"#4338ca",children:h.label})]},j)),e.jsx("circle",{cx:260+a*60,cy:90-s*40,r:"6",fill:"#ef4444",stroke:"#dc2626",strokeWidth:"2"}),e.jsx("text",{x:260+a*60,y:90-s*40-12,textAnchor:"middle",className:"text-[8px] font-bold",fill:"#dc2626",children:"Current"}),e.jsx("text",{x:"50",y:"15",className:"text-[9px] font-bold",fill:"#374151",children:"Regime:"}),e.jsx("text",{x:"50",y:"30",className:"text-[8px]",fill:"#6b7280",children:n}),e.jsx("text",{x:"50",y:"42",className:"text-[8px]",fill:"#6b7280",children:l}),e.jsxs("text",{x:"50",y:"58",className:"text-[8px]",fill:"#6b7280",children:["Vol: ",p,"%"]}),e.jsxs("text",{x:"50",y:"70",className:"text-[8px]",fill:"#6b7280",children:["Drift: ",m,"%"]}),e.jsx("text",{x:"50",y:"110",className:"text-[9px] font-bold",fill:"#374151",children:"Losses:"}),e.jsxs("text",{x:"50",y:"125",className:"text-[8px]",fill:"#6b7280",children:["Recon: ",u]}),e.jsxs("text",{x:"50",y:"137",className:"text-[8px]",fill:"#6b7280",children:["KL: ",_]}),e.jsxs("text",{x:"50",y:"149",className:"text-[8px] font-bold",fill:"#4338ca",children:["ELBO: ",k]})]})]})}function se(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"VAE Scenario Generation for Indian Markets"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Variational Autoencoders (VAEs) learn a structured latent space where similar market conditions cluster together. Unlike GANs, VAEs provide an explicit probabilistic model that allows controlled scenario generation -- crucial for stress testing Indian portfolios against hypothetical market regimes like a 2008-style FII exodus, an RBI rate shock, or a currency crisis."}),e.jsx(N,{title:"Variational Autoencoder",label:"Definition 13.8",definition:"A VAE is a generative model that learns to encode data into a low-dimensional latent space z and decode it back. The encoder q(z|x) approximates the posterior distribution of latent variables, while the decoder p(x|z) reconstructs the data. Training maximizes the Evidence Lower Bound (ELBO) on the data log-likelihood.",notation:e.jsxs(e.Fragment,{children:["The ELBO is ",e.jsx(t.InlineMath,{math:"\\mathcal{L}(\\theta, \\phi; x) = \\mathbb{E}_{q_\\phi(z|x)}[\\log p_\\theta(x|z)] - D_{\\text{KL}}(q_\\phi(z|x) \\| p(z))"}),"."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"The ELBO Objective"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The VAE is trained by maximizing the Evidence Lower Bound (ELBO), which decomposes into a reconstruction term and a KL divergence regularizer:"}),e.jsx(t.BlockMath,{math:"\\text{ELBO} = \\underbrace{\\mathbb{E}_{q(z|x)}[\\log p(x|z)]}_{\\text{reconstruction}} - \\underbrace{\\beta \\cdot D_{\\text{KL}}(q(z|x) \\| \\mathcal{N}(0, I))}_{\\text{regularization}}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["For financial data, the reconstruction term ensures generated scenarios match real market dynamics, while the KL term enforces a smooth latent space where interpolation between market regimes produces plausible intermediate scenarios. The ",e.jsx(t.InlineMath,{math:"\\beta"})," parameter controls this trade-off:"]}),e.jsx(t.BlockMath,{math:"q_\\phi(z|x) = \\mathcal{N}(\\mu_\\phi(x), \\text{diag}(\\sigma_\\phi^2(x)))"}),e.jsx(v,{title:"Latent Space Interpolation",label:"Theorem 13.5",statement:e.jsxs(e.Fragment,{children:["For a well-trained VAE with continuous latent space ",e.jsx(t.InlineMath,{math:"\\mathcal{Z}"}),", linear interpolation between two encoded market states ",e.jsx(t.InlineMath,{math:"z_A"})," (bull market) and ",e.jsx(t.InlineMath,{math:"z_B"})," (bear market) produces a valid intermediate scenario:"]}),formula:"z_\\alpha = (1 - \\alpha) z_A + \\alpha z_B \\implies \\text{decode}(z_\\alpha) \\in \\mathcal{S}_{\\text{valid}}",proof:e.jsxs(e.Fragment,{children:["The KL regularization in the ELBO ensures that the aggregate posterior matches the prior ",e.jsx(t.InlineMath,{math:"\\mathcal{N}(0, I)"}),", which is a convex set. By the definition of convex sets, any convex combination of points in the latent space lies within the support of the prior, ensuring the decoder produces valid outputs. Empirically, this is verified by checking that decoded scenarios satisfy financial constraints (positive prices, bounded returns, valid correlation matrices)."]})}),e.jsx(ae,{}),e.jsx(w,{title:"vae_nifty_scenarios.py",runnable:!0,code:`import numpy as np

class FinancialVAE:
    """Simplified VAE for Nifty 50 scenario generation.

    Demonstrates latent space interpolation and scenario
    generation for Indian market stress testing.
    """

    def __init__(self, input_dim=5, latent_dim=8, beta=1.0):
        self.input_dim = input_dim   # OHLCV features
        self.latent_dim = latent_dim
        self.beta = beta

        # Simulated learned parameters
        np.random.seed(42)
        self.W_enc = np.random.randn(input_dim, latent_dim) * 0.1
        self.W_dec = np.random.randn(latent_dim, input_dim) * 0.1

    def encode(self, x):
        """Encode market data to latent space."""
        h = x @ self.W_enc
        mu = h
        log_var = h * 0.5 - 1  # Learned log variance
        return mu, log_var

    def reparameterize(self, mu, log_var):
        """Reparameterization trick."""
        std = np.exp(0.5 * log_var)
        eps = np.random.randn(*mu.shape)
        return mu + eps * std

    def decode(self, z):
        """Decode latent vector to market scenario."""
        return z @ self.W_dec

    def generate_scenarios(self, n_scenarios, regime='normal'):
        """Generate market scenarios from latent space."""
        if regime == 'bull':
            z_mean = np.array([0, 1.5] + [0] * (self.latent_dim - 2))
        elif regime == 'bear':
            z_mean = np.array([0, -1.5] + [0] * (self.latent_dim - 2))
        elif regime == 'high_vol':
            z_mean = np.array([1.5, 0] + [0] * (self.latent_dim - 2))
        elif regime == 'crisis':
            z_mean = np.array([2.0, -2.0] + [0] * (self.latent_dim - 2))
        else:
            z_mean = np.zeros(self.latent_dim)

        z_samples = np.random.randn(n_scenarios, self.latent_dim) * 0.5
        z_samples += z_mean
        scenarios = self.decode(z_samples)

        # Scale to realistic Nifty return magnitudes
        scenarios[:, 0] *= 0.015   # Open return
        scenarios[:, 1] *= 0.018   # High
        scenarios[:, 2] *= 0.015   # Low
        scenarios[:, 3] *= 0.015   # Close return
        scenarios[:, 4] = np.abs(scenarios[:, 4]) * 1e6  # Volume

        return scenarios

    def interpolate(self, z_a, z_b, n_steps=10):
        """Interpolate between two market states."""
        alphas = np.linspace(0, 1, n_steps)
        interpolated = []
        for alpha in alphas:
            z = (1 - alpha) * z_a + alpha * z_b
            scenario = self.decode(z.reshape(1, -1))
            interpolated.append(scenario[0])
        return np.array(interpolated), alphas

# --- Demo: Nifty 50 Scenario Generation ---
vae = FinancialVAE(input_dim=5, latent_dim=8, beta=1.0)

print("=== VAE Scenario Generation: Nifty 50 ===\\n")

# Generate scenarios for different regimes
regimes = ['normal', 'bull', 'bear', 'high_vol', 'crisis']
feature_names = ['dOpen', 'dHigh', 'dLow', 'dClose', 'Volume']

for regime in regimes:
    scenarios = vae.generate_scenarios(1000, regime=regime)
    print(f"--- Regime: {regime.upper()} (1000 scenarios) ---")
    for f, name in enumerate(feature_names[:4]):
        vals = scenarios[:, f] * 100  # To percentage
        print(f"  {name:>6}: mean={np.mean(vals):+.3f}%, "
              f"std={np.std(vals):.3f}%, "
              f"5th={np.percentile(vals, 5):+.3f}%, "
              f"95th={np.percentile(vals, 95):+.3f}%")
    print()

# Interpolate: Bull to Crisis (simulating regime transition)
print("--- Interpolation: Bull -> Crisis ---")
z_bull = np.array([0, 1.5] + [0] * 6)
z_crisis = np.array([2.0, -2.0] + [0] * 6)
interp, alphas = vae.interpolate(z_bull, z_crisis, n_steps=5)

for i, alpha in enumerate(alphas):
    close_ret = interp[i, 3] * 0.015 * 100
    vol_proxy = abs(interp[i, 0]) * 100
    print(f"  alpha={alpha:.2f}: Close={close_ret:+.3f}%, "
          f"VolProxy={vol_proxy:.3f}%")

print("\\n--- Indian Market Stress Scenarios ---")
print("1. RBI Rate Hike: Encode high-vol + bear regime")
print("2. FII Outflow:   Encode crisis regime")
print("3. Budget Rally:  Encode bull + low-vol regime")
print("4. COVID Shock:   Encode extreme crisis, interpolate recovery")`}),e.jsx(T,{title:"Generating RBI Rate Shock Scenarios",difficulty:"advanced",problem:"Using a VAE trained on Nifty 50 data, generate 1,000 scenarios representing an unexpected 50bps RBI repo rate hike. The historical response shows mean daily return of -1.2% with vol of 2.5% on announcement day. What latent vector should you use?",solution:[{step:"Identify the target distribution",formula:"r \\sim \\mathcal{N}(-0.012, 0.025^2)",explanation:"The target scenario has negative mean return with elevated volatility, characteristic of rate shock events."},{step:"Map to latent coordinates",formula:"z_1 \\approx 1.2 \\text{ (high vol)}, \\quad z_2 \\approx -1.0 \\text{ (bearish)}",explanation:"Using the learned encoder mapping, high volatility corresponds to positive z1 and negative drift to negative z2."},{step:"Generate and validate",formula:"\\text{decode}(z) \\to \\hat{r}, \\quad \\text{check: } |\\mathbb{E}[\\hat{r}] - (-0.012)| < 0.003",explanation:"Generate 1,000 samples from N(z_target, 0.25I) and verify the decoded scenarios match the target statistics within tolerance."}]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"VAE Variants for Finance"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Variant"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Modification"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Finance Application"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsxs("td",{className:"px-4 py-2",children:[e.jsx(t.InlineMath,{math:"\\beta"}),"-VAE"]}),e.jsx("td",{className:"px-4 py-2",children:"Adjustable KL weight"}),e.jsx("td",{className:"px-4 py-2",children:"Disentangled regime factors"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Conditional VAE"}),e.jsx("td",{className:"px-4 py-2",children:"Conditioned on labels"}),e.jsx("td",{className:"px-4 py-2",children:"Regime-specific scenarios"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"VQ-VAE"}),e.jsx("td",{className:"px-4 py-2",children:"Discrete latent codes"}),e.jsx("td",{className:"px-4 py-2",children:"Market state clustering"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Temporal VAE"}),e.jsx("td",{className:"px-4 py-2",children:"RNN encoder/decoder"}),e.jsx("td",{className:"px-4 py-2",children:"Time series generation"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Hierarchical VAE"}),e.jsx("td",{className:"px-4 py-2",children:"Multi-scale latent"}),e.jsx("td",{className:"px-4 py-2",children:"Macro + micro dynamics"})]})]})]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Stress Testing Indian Portfolios"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The primary use case for VAE scenario generation in Indian markets is regulatory and internal stress testing. SEBI's stress testing guidelines for mutual funds require scenario analysis across multiple market conditions. A VAE can generate scenarios calibrated to historical stress events:"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Scenario"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Historical Reference"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Nifty Impact"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Latent Encoding"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"FII Exodus"}),e.jsx("td",{className:"px-4 py-2",children:"Mar 2020"}),e.jsx("td",{className:"px-4 py-2",children:"-38%"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"z_1 = 2.5, z_2 = -2.5"})})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"RBI Rate Hike"}),e.jsx("td",{className:"px-4 py-2",children:"Jun 2022"}),e.jsx("td",{className:"px-4 py-2",children:"-8%"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"z_1 = 1.0, z_2 = -1.0"})})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"INR Crisis"}),e.jsx("td",{className:"px-4 py-2",children:"Sep 2013"}),e.jsx("td",{className:"px-4 py-2",children:"-12%"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"z_1 = 1.5, z_2 = -1.5"})})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Budget Rally"}),e.jsx("td",{className:"px-4 py-2",children:"Feb 2021"}),e.jsx("td",{className:"px-4 py-2",children:"+12%"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"z_1 = -0.5, z_2 = 2.0"})})]})]})]})}),e.jsx(f,{title:"Implementation Libraries",type:"tip",children:e.jsxs("p",{children:["For production VAE implementations on Indian market data, use"," ",e.jsx("strong",{children:"PyTorch"})," with ",e.jsx("code",{children:"torch.distributions"})," for the reparameterization trick, or ",e.jsx("strong",{children:"TensorFlow Probability"})," for the full Bayesian pipeline. The ",e.jsx("code",{children:"pythae"})," library provides ready-made VAE architectures (beta-VAE, VAMP, RHVAE) that can be adapted for financial time series with minimal custom code."]})}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsxs("p",{children:["VAEs provide a structured approach to scenario generation where the latent space organizes market regimes interpretably. For Indian market risk management, the key advantage over GANs is ",e.jsx("strong",{children:"controllability"}),": you can specify a target regime (crisis, bull, rate shock) and generate plausible scenarios around it. The ",e.jsx(t.InlineMath,{math:"\\beta"}),"-VAE variant allows fine-tuning the trade-off between scenario diversity and fidelity to historical patterns observed in NSE data."]})})]})}const Ne=Object.freeze(Object.defineProperty({__proto__:null,default:se},Symbol.toStringTag,{value:"Module"}));function re(){const[a,g]=c.useState(500),[s,y]=c.useState(1e3),[o,i]=c.useState(1e-4),[r,d]=c.useState(.02),n=a,l=s,p=Math.exp(-.5*(o+(r-o)*(n/l))*n),m=Math.sqrt(p),u=Math.sqrt(1-p),_=22e3,k=60,x=[];let h=42;for(let b=0;b<k;b++){h=h*1103515245+12345&2147483647;const S=(h/2147483647-.5)*2,M=(_+Math.sin(b/10)*500+b*10)*m+S*u*2e3;x.push(M)}const j=Math.min(...x)-200,A=Math.max(...x)+200-j||1;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Diffusion Forward Process on Nifty Prices"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Watch how noise is progressively added to a Nifty 50 price series during the forward diffusion process. The reverse process (denoising) generates new data."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Noise Step t = ",a," / ",s]}),e.jsx("input",{type:"range",min:"0",max:s,step:"10",value:a,onChange:b=>g(parseInt(b.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:[e.jsx(t.InlineMath,{math:"\\beta_{\\text{start}}"})," = ",o.toFixed(4)]}),e.jsx("input",{type:"range",min:"0.00001",max:"0.001",step:"0.00001",value:o,onChange:b=>i(parseFloat(b.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:[e.jsx(t.InlineMath,{math:"\\beta_{\\text{end}}"})," = ",r.toFixed(3)]}),e.jsx("input",{type:"range",min:"0.005",max:"0.05",step:"0.001",value:r,onChange:b=>d(parseFloat(b.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 520 180",className:"w-full max-w-xl mx-auto block","aria-label":"Diffusion forward process",children:[[0,.25,.5,.75,1].map(b=>{const S=160-b*130;return e.jsx("line",{x1:"45",y1:S,x2:"500",y2:S,stroke:"#e5e7eb",strokeWidth:"0.5"},b)}),e.jsx("polyline",{fill:"none",stroke:"#6366f1",strokeWidth:"1.5",opacity:"0.7",points:x.map((b,S)=>{const C=50+S/(k-1)*450,M=160-(b-j)/A*130;return`${C},${M}`}).join(" ")}),e.jsx("text",{x:"260",y:"178",textAnchor:"middle",className:"text-[9px]",fill:"#6b7280",children:"Trading Days"}),e.jsxs("text",{x:"420",y:"15",textAnchor:"end",className:"text-[9px] font-bold",fill:a>700?"#ef4444":a>300?"#f59e0b":"#22c55e",children:["Signal: ",(m*100).toFixed(1),"% | Noise: ",(u*100).toFixed(1),"%"]}),e.jsxs("text",{x:"420",y:"28",textAnchor:"end",className:"text-[8px]",fill:"#6b7280",children:["alpha_bar = ",p.toFixed(4)]})]})]})}function ne(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Diffusion Models for Financial Data"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Diffusion models (DDPMs -- Denoising Diffusion Probabilistic Models) have emerged as state-of-the-art generative models, surpassing GANs in image generation. Their application to financial time series generation offers advantages in training stability and mode coverage. For Indian markets, diffusion models can generate high-fidelity synthetic Nifty paths that capture complex dependencies including volatility clustering, leverage effects, and cross-asset correlations."}),e.jsx(N,{title:"Denoising Diffusion Probabilistic Model",label:"Definition 13.9",definition:"A DDPM defines a forward process that gradually adds Gaussian noise to data over T steps, and a learned reverse process that denoises the corrupted data step by step. The forward process is a fixed Markov chain, while the reverse process is parameterized by a neural network that predicts the noise at each step.",notation:e.jsxs(e.Fragment,{children:["Forward: ",e.jsx(t.InlineMath,{math:"q(x_t | x_{t-1}) = \\mathcal{N}(x_t; \\sqrt{1-\\beta_t}\\, x_{t-1}, \\beta_t I)"}),". Reverse: ",e.jsx(t.InlineMath,{math:"p_\\theta(x_{t-1} | x_t) = \\mathcal{N}(x_{t-1}; \\mu_\\theta(x_t, t), \\sigma_t^2 I)"}),"."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Forward Diffusion Process"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The forward process adds noise according to a variance schedule"," ",e.jsx(t.InlineMath,{math:"\\{\\beta_t\\}_{t=1}^T"}),". A key property is that we can sample any noisy version ",e.jsx(t.InlineMath,{math:"x_t"})," directly from"," ",e.jsx(t.InlineMath,{math:"x_0"})," without iterating through all steps:"]}),e.jsx(t.BlockMath,{math:"q(x_t | x_0) = \\mathcal{N}(x_t; \\sqrt{\\bar{\\alpha}_t}\\, x_0, (1 - \\bar{\\alpha}_t) I)"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"\\alpha_t = 1 - \\beta_t"})," and"," ",e.jsx(t.InlineMath,{math:"\\bar{\\alpha}_t = \\prod_{s=1}^t \\alpha_s"}),". For financial time series, ",e.jsx(t.InlineMath,{math:"x_0"})," is a window of Nifty returns and the noise schedule is calibrated so that ",e.jsx(t.InlineMath,{math:"x_T \\approx \\mathcal{N}(0, I)"}),"."]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Training Objective"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The model is trained to predict the noise ",e.jsx(t.InlineMath,{math:"\\epsilon"})," added at each step, using a simple MSE loss:"]}),e.jsx(t.BlockMath,{math:"\\mathcal{L}_{\\text{simple}} = \\mathbb{E}_{t, x_0, \\epsilon}\\left[\\|\\epsilon - \\epsilon_\\theta(\\sqrt{\\bar{\\alpha}_t}\\, x_0 + \\sqrt{1-\\bar{\\alpha}_t}\\, \\epsilon, t)\\|^2\\right]"}),e.jsx(v,{title:"Diffusion Model Likelihood Bound",label:"Theorem 13.6",statement:e.jsx(e.Fragment,{children:"The negative log-likelihood of a DDPM is bounded above by the sum of KL divergences between the forward and reverse transition kernels:"}),formula:"-\\log p_\\theta(x_0) \\leq \\sum_{t=1}^{T} D_{\\text{KL}}(q(x_{t-1}|x_t, x_0) \\| p_\\theta(x_{t-1}|x_t)) + C",proof:e.jsxs(e.Fragment,{children:["This follows from the variational bound applied to the hierarchical latent variable model. Each KL term measures how well the learned reverse step matches the true posterior transition. For financial data, minimizing this bound ensures the generated samples faithfully represent the joint distribution of returns, volumes, and volatilities observed in NSE data. The constant ",e.jsx(t.InlineMath,{math:"C"})," is the entropy of the forward process."]})}),e.jsx(re,{}),e.jsx(w,{title:"diffusion_nifty.py",runnable:!0,code:`import numpy as np

class FinancialDiffusion:
    """Simplified diffusion model for Nifty 50 data generation.

    Demonstrates the core forward/reverse diffusion concepts.
    For production, use the diffusers library with custom architectures.
    """

    def __init__(self, n_steps=1000, beta_start=1e-4, beta_end=0.02):
        self.n_steps = n_steps

        # Linear noise schedule
        self.betas = np.linspace(beta_start, beta_end, n_steps)
        self.alphas = 1 - self.betas
        self.alpha_bars = np.cumprod(self.alphas)

    def forward_process(self, x0, t):
        """Add noise to financial data at timestep t.

        q(x_t | x_0) = N(sqrt(alpha_bar_t) * x_0, (1 - alpha_bar_t) * I)
        """
        alpha_bar = self.alpha_bars[t]
        noise = np.random.randn(*x0.shape)
        x_t = np.sqrt(alpha_bar) * x0 + np.sqrt(1 - alpha_bar) * noise
        return x_t, noise

    def reverse_step(self, x_t, predicted_noise, t):
        """Denoise one step (simplified).

        In practice, this uses a neural network for noise prediction.
        """
        alpha = self.alphas[t]
        alpha_bar = self.alpha_bars[t]

        # Predicted x_0
        x0_pred = (x_t - np.sqrt(1 - alpha_bar) * predicted_noise) / \\
            np.sqrt(alpha_bar)

        # Posterior mean
        if t > 0:
            alpha_bar_prev = self.alpha_bars[t - 1]
            beta = self.betas[t]
            posterior_mean = (np.sqrt(alpha_bar_prev) * beta / (1 - alpha_bar)) * x0_pred + \\
                (np.sqrt(alpha) * (1 - alpha_bar_prev) / (1 - alpha_bar)) * x_t
            posterior_var = beta * (1 - alpha_bar_prev) / (1 - alpha_bar)
            noise = np.random.randn(*x_t.shape) * np.sqrt(posterior_var)
            return posterior_mean + noise
        return x0_pred

    def generate(self, shape, n_denoise_steps=50):
        """Generate synthetic financial data via reverse process."""
        # Start from pure noise
        x = np.random.randn(*shape)

        # Subsample timesteps for faster generation (DDIM-style)
        timesteps = np.linspace(self.n_steps - 1, 0,
                                 n_denoise_steps, dtype=int)

        for t in timesteps:
            # Simple noise prediction (would be neural network)
            predicted_noise = x * 0.1  # Placeholder
            x = self.reverse_step(x, predicted_noise, t)

        return x

# --- Demo ---
np.random.seed(42)

# Create "real" Nifty 50 return data
n_samples = 100
seq_len = 50
n_features = 4  # Open, High, Low, Close returns

# Simulated Nifty returns with realistic properties
real_data = np.random.normal(0.0005, 0.015, (n_samples, seq_len, n_features))
# Add fat tails
for i in range(n_samples):
    if np.random.random() < 0.05:  # 5% chance of jump
        jump_day = np.random.randint(0, seq_len)
        real_data[i, jump_day, :] += np.random.normal(-0.03, 0.01, n_features)

# Initialize diffusion model
diffusion = FinancialDiffusion(n_steps=1000, beta_start=1e-4, beta_end=0.02)

print("=== Diffusion Model for Nifty 50 ===")
print(f"Data: {n_samples} samples, {seq_len} days, {n_features} features\\n")

# Demonstrate forward process
print("--- Forward Process (Adding Noise) ---")
x0 = real_data[0]  # Single sample
for t in [0, 100, 500, 900, 999]:
    x_t, noise = diffusion.forward_process(x0, t)
    alpha_bar = diffusion.alpha_bars[t]
    snr = alpha_bar / (1 - alpha_bar)
    print(f"  t={t:4d}: alpha_bar={alpha_bar:.4f}, "
          f"SNR={snr:.4f}, "
          f"std(x_t)={np.std(x_t):.4f}")

# Generate synthetic data
print("\\n--- Reverse Process (Generating) ---")
synthetic = diffusion.generate(
    shape=(50, seq_len, n_features),
    n_denoise_steps=50
)

print(f"Generated: {synthetic.shape[0]} samples")
print(f"Mean:      {np.mean(synthetic):.6f}")
print(f"Std:       {np.std(synthetic):.6f}")
print(f"Min:       {np.min(synthetic):.6f}")
print(f"Max:       {np.max(synthetic):.6f}")

# Compare distributions
print("\\n--- Distribution Comparison ---")
print(f"{'Metric':<20} {'Real':>10} {'Synthetic':>10}")
print(f"{'Mean':<20} {np.mean(real_data):>10.6f} {np.mean(synthetic):>10.6f}")
print(f"{'Std':<20} {np.std(real_data):>10.6f} {np.std(synthetic):>10.6f}")

print("\\n--- Advantages over GANs ---")
print("1. No mode collapse: covers full distribution")
print("2. Stable training: simple MSE loss")
print("3. Controllable generation via guidance")
print("4. Better likelihood estimation")`}),e.jsx(T,{title:"Noise Schedule Calibration for Nifty",difficulty:"intermediate",problem:"For a diffusion model on Nifty 50 daily returns (std ~1.5%), what beta schedule ensures that at T=1000 steps, the data is approximately standard normal? Verify that alpha_bar_T is sufficiently small.",solution:[{step:"Requirement for full noising",formula:"\\bar{\\alpha}_T \\approx 0 \\implies \\sqrt{\\bar{\\alpha}_T} \\cdot \\sigma_{\\text{data}} \\ll \\sigma_{\\text{noise}}",explanation:"At the final step, the signal component should be negligible compared to noise."},{step:"Linear schedule computation",formula:"\\bar{\\alpha}_{1000} = \\prod_{t=1}^{1000}(1 - \\beta_t) \\approx e^{-\\sum \\beta_t}",explanation:"With linear schedule from 1e-4 to 0.02, the sum is approximately 10.05."},{step:"Verify",formula:"\\bar{\\alpha}_{1000} \\approx e^{-10.05} \\approx 4.3 \\times 10^{-5}",explanation:"The signal is attenuated by a factor of 0.0066 (sqrt), making x_T essentially pure noise. This is sufficient for Nifty return data with std = 0.015."}]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Generative Model Comparison for Finance"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Property"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"GAN"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"VAE"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Diffusion"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Sample Quality"}),e.jsx("td",{className:"px-4 py-2",children:"High"}),e.jsx("td",{className:"px-4 py-2",children:"Medium"}),e.jsx("td",{className:"px-4 py-2",children:"Highest"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Training Stability"}),e.jsx("td",{className:"px-4 py-2",children:"Low"}),e.jsx("td",{className:"px-4 py-2",children:"High"}),e.jsx("td",{className:"px-4 py-2",children:"High"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Mode Coverage"}),e.jsx("td",{className:"px-4 py-2",children:"Partial"}),e.jsx("td",{className:"px-4 py-2",children:"Full"}),e.jsx("td",{className:"px-4 py-2",children:"Full"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Controllability"}),e.jsx("td",{className:"px-4 py-2",children:"Low"}),e.jsx("td",{className:"px-4 py-2",children:"High"}),e.jsx("td",{className:"px-4 py-2",children:"Medium-High"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Generation Speed"}),e.jsx("td",{className:"px-4 py-2",children:"Fast"}),e.jsx("td",{className:"px-4 py-2",children:"Fast"}),e.jsx("td",{className:"px-4 py-2",children:"Slow (50-1000 steps)"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Likelihood"}),e.jsx("td",{className:"px-4 py-2",children:"No"}),e.jsx("td",{className:"px-4 py-2",children:"Lower bound"}),e.jsx("td",{className:"px-4 py-2",children:"Upper bound"})]})]})]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Conditional Generation for Indian Markets"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["Classifier-free guidance enables controlled generation of specific market conditions. By conditioning on regime labels ",e.jsx(t.InlineMath,{math:"c"})," (bull, bear, crisis), the reverse process becomes:"]}),e.jsx(t.BlockMath,{math:"\\hat{\\epsilon}_\\theta(x_t, t, c) = (1 + w) \\cdot \\epsilon_\\theta(x_t, t, c) - w \\cdot \\epsilon_\\theta(x_t, t)"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"w"})," is the guidance scale controlling how strongly the generation follows the conditioning. This is particularly useful for generating Nifty crash scenarios or India VIX spike events for stress testing portfolio risk limits."]}),e.jsx(f,{title:"Implementation Notes",type:"historical",children:e.jsxs("ul",{className:"space-y-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Architecture:"})," Use a 1D U-Net with temporal attention for sequence generation, or a Transformer backbone for multi-asset correlation modeling across Nifty 50 constituents."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Sampling:"})," DDIM (Denoising Diffusion Implicit Models) reduces generation from 1000 steps to 50-100 steps with negligible quality loss, making it practical for generating large-scale Monte Carlo scenarios."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Calibration:"})," Train on the last 5 years of NSE daily data with augmentation from synthetic crash scenarios. Use India VIX as an auxiliary conditioning signal for volatility-aware generation."]})]})}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsxs("p",{children:["Diffusion models offer superior mode coverage and training stability compared to GANs for financial data generation. For Indian markets, the key design choices are: (1) ",e.jsx("strong",{children:"noise schedule"})," calibrated to return magnitudes, (2)"," ",e.jsx("strong",{children:"conditional generation"})," using classifier-free guidance for targeted scenario creation, and (3) ",e.jsx("strong",{children:"temporal architecture"})," (1D U-Net or Transformer backbone) to capture the sequential nature of Nifty price dynamics. DDIM sampling enables fast generation with 50-100 steps instead of 1000."]})})]})}const ve=Object.freeze(Object.defineProperty({__proto__:null,default:ne},Symbol.toStringTag,{value:"Module"}));function ie(){const[a,g]=c.useState(.1),[s,y]=c.useState(1),[o,i]=c.useState(20),[r,d]=c.useState(30),n=o*.05*Math.sqrt(r/252),l=a*.5*(252/r),p=n*.7-l*.3,m=l*1.5,u=l*.8,_=-(n+m),k=-(Math.abs(p)+u),x=((1-Math.abs(k)/Math.abs(_))*100).toFixed(1);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Deep Hedging vs Black-Scholes Delta Hedging"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Compare neural hedging with traditional delta hedging on Nifty options under realistic Indian market transaction costs (STT, brokerage, slippage)."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Transaction Cost = ",a.toFixed(1),"%"]}),e.jsx("input",{type:"range",min:"0",max:"0.5",step:"0.05",value:a,onChange:h=>g(parseFloat(h.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Risk Aversion ",e.jsx(t.InlineMath,{math:"\\lambda"})," = ",s.toFixed(1)]}),e.jsx("input",{type:"range",min:"0.1",max:"5",step:"0.1",value:s,onChange:h=>y(parseFloat(h.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Nifty IV = ",o,"%"]}),e.jsx("input",{type:"range",min:"10",max:"40",step:"1",value:o,onChange:h=>i(parseInt(h.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Days to Expiry = ",r]}),e.jsx("input",{type:"range",min:"1",max:"90",step:"1",value:r,onChange:h=>d(parseInt(h.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 520 160",className:"w-full max-w-xl mx-auto block","aria-label":"Deep hedging comparison",children:[e.jsx("text",{x:"260",y:"15",textAnchor:"middle",className:"text-[10px] font-bold",fill:"#374151",children:"Hedging P&L Comparison (Nifty Options)"}),e.jsx("rect",{x:"80",y:"30",width:"160",height:"50",rx:"6",fill:"#ef4444",opacity:"0.15",stroke:"#ef4444",strokeWidth:"1"}),e.jsx("text",{x:"160",y:"47",textAnchor:"middle",className:"text-[10px] font-bold",fill:"#dc2626",children:"BS Delta Hedge"}),e.jsxs("text",{x:"160",y:"62",textAnchor:"middle",className:"text-[8px]",fill:"#6b7280",children:["Error: ",n.toFixed(3)," | Cost: ",m.toFixed(3)]}),e.jsxs("text",{x:"160",y:"75",textAnchor:"middle",className:"text-[9px] font-bold",fill:"#dc2626",children:["P&L: ",_.toFixed(3)]}),e.jsx("rect",{x:"280",y:"30",width:"160",height:"50",rx:"6",fill:"#22c55e",opacity:"0.15",stroke:"#22c55e",strokeWidth:"1"}),e.jsx("text",{x:"360",y:"47",textAnchor:"middle",className:"text-[10px] font-bold",fill:"#16a34a",children:"Deep Hedge"}),e.jsxs("text",{x:"360",y:"62",textAnchor:"middle",className:"text-[8px]",fill:"#6b7280",children:["Error: ",Math.abs(p).toFixed(3)," | Cost: ",u.toFixed(3)]}),e.jsxs("text",{x:"360",y:"75",textAnchor:"middle",className:"text-[9px] font-bold",fill:"#16a34a",children:["P&L: ",k.toFixed(3)]}),e.jsx("rect",{x:"160",y:"100",width:"200",height:"30",rx:"6",fill:"#6366f1",opacity:"0.1",stroke:"#6366f1",strokeWidth:"1"}),e.jsxs("text",{x:"260",y:"120",textAnchor:"middle",className:"text-[11px] font-bold",fill:"#4338ca",children:["Deep Hedge Improvement: ",x,"%"]}),e.jsx("rect",{x:"80",y:"145",width:m*800,height:"8",fill:"#ef4444",opacity:"0.5",rx:"2"}),e.jsx("rect",{x:"80",y:"145",width:u*800,height:"8",fill:"#22c55e",opacity:"0.5",rx:"2"}),e.jsx("text",{x:"75",y:"152",textAnchor:"end",className:"text-[7px]",fill:"#6b7280",children:"Cost"})]})]})}function oe(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Neural Hedging Under Indian Market Costs"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Deep hedging replaces the classical Black-Scholes delta hedging with a neural network that directly optimizes the hedging strategy end-to-end, accounting for transaction costs, discrete rebalancing, and market frictions. For Indian options markets (Nifty and Bank Nifty options on NSE), the high STT on options (0.0625% on sell premium), wide bid-ask spreads in OTM strikes, and lot size constraints make traditional delta hedging suboptimal."}),e.jsx(N,{title:"Deep Hedging",label:"Definition 13.10",definition:"Deep hedging is a data-driven approach to derivatives hedging where a neural network learns the optimal hedging strategy by minimizing a risk measure (e.g., CVaR, variance) of the hedging error over simulated or historical paths, subject to realistic market frictions including transaction costs, liquidity constraints, and discrete rebalancing.",notation:e.jsxs(e.Fragment,{children:["The hedging strategy ",e.jsx(t.InlineMath,{math:"\\delta_\\theta(t, S_t, V_t)"})," is parameterized by network weights ",e.jsx(t.InlineMath,{math:"\\theta"})," and maps market state to hedge ratios. The objective is ",e.jsx(t.InlineMath,{math:"\\min_\\theta \\rho(P\\&L_\\theta)"})," where ",e.jsx(t.InlineMath,{math:"\\rho"})," is a convex risk measure."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"The Deep Hedging Objective"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The hedging P&L for a short option position over ",e.jsx(t.InlineMath,{math:"N"})," ","rebalancing periods is:"]}),e.jsx(t.BlockMath,{math:"\\Pi_T = -\\text{Payoff}(S_T) + V_0 + \\sum_{n=0}^{N-1} \\delta_n (S_{n+1} - S_n) - \\sum_{n=0}^{N-1} c \\cdot |{\\delta_n - \\delta_{n-1}}| \\cdot S_n"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"\\delta_n"})," is the hedge ratio at time"," ",e.jsx(t.InlineMath,{math:"n"}),", ",e.jsx(t.InlineMath,{math:"V_0"})," is the option premium received, and ",e.jsx(t.InlineMath,{math:"c"})," is the proportional transaction cost. For Indian markets:"]}),e.jsx(t.BlockMath,{math:"c_{\\text{India}} = c_{\\text{brokerage}} + c_{\\text{STT}} + c_{\\text{stamp}} + c_{\\text{slippage}} \\approx 0.05\\% \\text{ to } 0.15\\%"}),e.jsx(v,{title:"Optimality of Deep Hedging",label:"Theorem 13.7",statement:e.jsxs(e.Fragment,{children:["Under proportional transaction costs ",e.jsx(t.InlineMath,{math:"c > 0"}),", the optimal hedging strategy ",e.jsx(t.InlineMath,{math:"\\delta^*"})," differs from the BS delta by a no-trade zone of width:"]}),formula:"w^* \\propto \\left(\\frac{3c \\cdot S^2 \\cdot \\Gamma^2}{2\\lambda}\\right)^{1/3}",proof:e.jsx(e.Fragment,{children:"The Hodges-Neuberger (1989) framework shows that under transaction costs, the optimal hedge introduces a bandwidth around the BS delta where no rebalancing occurs. Deep hedging learns this bandwidth implicitly by optimizing over the full P&L distribution. The cubic root scaling arises from balancing the quadratic hedging error (proportional to gamma squared times deviation squared) against linear transaction costs. For Nifty options with typical gamma of 0.001, this gives a no-trade zone of about 2-5% of delta."})}),e.jsx(ie,{}),e.jsx(w,{title:"deep_hedging_nifty.py",runnable:!0,code:`import numpy as np

class IndianOptionsCostModel:
    """NSE F&O transaction cost model."""

    def __init__(self):
        self.brokerage = 20       # Flat INR per order (Zerodha)
        self.stt_rate = 0.000625  # 0.0625% on sell premium
        self.sebi_rate = 0.000001
        self.stamp_rate = 0.00003
        self.gst_rate = 0.18

    def cost(self, notional, premium, side='sell'):
        """Calculate total cost for an options trade."""
        brok = min(self.brokerage, notional * 0.0003)
        stt = premium * self.stt_rate if side == 'sell' else 0
        sebi = notional * self.sebi_rate
        stamp = notional * self.stamp_rate
        gst = self.gst_rate * (brok + sebi)
        return brok + stt + sebi + stamp + gst

def bs_delta(S, K, T, sigma, r=0.065):
    """Black-Scholes delta for Nifty option."""
    from math import log, sqrt, exp
    if T <= 0:
        return 1.0 if S > K else 0.0
    d1 = (log(S/K) + (r + 0.5*sigma**2)*T) / (sigma*sqrt(T))
    # Approximate N(d1) using tanh
    nd1 = 0.5 * (1 + np.tanh(d1 * 0.7978845608))
    return nd1

def simulate_deep_hedging(S0, K, T_days, sigma, n_paths, cost_pct,
                           hedge_freq='daily', risk_aversion=1.0):
    """Compare BS delta hedge vs simplified deep hedge.

    The 'deep hedge' here uses a no-trade-zone heuristic
    that approximates what the neural network learns.
    """
    dt = 1 / 252
    n_steps = T_days
    T = T_days / 252

    # Generate Nifty paths (GBM)
    np.random.seed(42)
    Z = np.random.randn(n_paths, n_steps)
    S = np.zeros((n_paths, n_steps + 1))
    S[:, 0] = S0

    for t in range(n_steps):
        S[:, t+1] = S[:, t] * np.exp(
            (0.065 - 0.5*sigma**2)*dt + sigma*np.sqrt(dt)*Z[:, t]
        )

    # Payoff
    payoff = np.maximum(S[:, -1] - K, 0)

    # BS price (approximate)
    bs_price = S0 * 0.05  # Simplified

    # --- BS Delta Hedging ---
    bs_pnl = np.zeros(n_paths)
    bs_costs = np.zeros(n_paths)
    prev_delta_bs = np.zeros(n_paths)

    for t in range(n_steps):
        tau = (n_steps - t) / 252
        deltas = np.array([bs_delta(S[i, t], K, tau, sigma)
                           for i in range(n_paths)])
        trade_size = np.abs(deltas - prev_delta_bs)
        cost = trade_size * S[:, t] * cost_pct / 100
        bs_costs += cost
        bs_pnl += prev_delta_bs * (S[:, t+1] - S[:, t])
        prev_delta_bs = deltas

    bs_hedge_pnl = bs_price + bs_pnl - payoff - bs_costs

    # --- Deep Hedging (no-trade-zone heuristic) ---
    deep_pnl = np.zeros(n_paths)
    deep_costs = np.zeros(n_paths)
    prev_delta_deep = np.zeros(n_paths)
    bandwidth = (3 * cost_pct / 100) ** (1/3) * 0.5  # Optimal bandwidth

    for t in range(n_steps):
        tau = (n_steps - t) / 252
        target_deltas = np.array([bs_delta(S[i, t], K, tau, sigma)
                                   for i in range(n_paths)])

        # No-trade zone: only rebalance if delta deviates enough
        diff = np.abs(target_deltas - prev_delta_deep)
        rebalance = diff > bandwidth
        deltas = np.where(rebalance, target_deltas, prev_delta_deep)

        trade_size = np.abs(deltas - prev_delta_deep)
        cost = trade_size * S[:, t] * cost_pct / 100
        deep_costs += cost
        deep_pnl += prev_delta_deep * (S[:, t+1] - S[:, t])
        prev_delta_deep = deltas

    deep_hedge_pnl = bs_price + deep_pnl - payoff - deep_costs

    return {
        'bs_mean': np.mean(bs_hedge_pnl),
        'bs_std': np.std(bs_hedge_pnl),
        'bs_cvar': np.mean(np.sort(bs_hedge_pnl)[:int(0.05*n_paths)]),
        'bs_cost': np.mean(bs_costs),
        'deep_mean': np.mean(deep_hedge_pnl),
        'deep_std': np.std(deep_hedge_pnl),
        'deep_cvar': np.mean(np.sort(deep_hedge_pnl)[:int(0.05*n_paths)]),
        'deep_cost': np.mean(deep_costs),
    }

# --- Demo ---
print("=== Deep Hedging: Nifty Options ===\\n")

S0 = 22000  # Nifty spot
K = 22000   # ATM strike
sigma = 0.16  # 16% IV

for cost in [0.05, 0.10, 0.20]:
    result = simulate_deep_hedging(
        S0=S0, K=K, T_days=30, sigma=sigma,
        n_paths=5000, cost_pct=cost
    )
    print(f"--- Transaction Cost: {cost}% ---")
    print(f"  BS Delta Hedge:  Mean={result['bs_mean']:+.1f}, "
          f"Std={result['bs_std']:.1f}, "
          f"CVaR5%={result['bs_cvar']:+.1f}, "
          f"Cost={result['bs_cost']:.1f}")
    print(f"  Deep Hedge:      Mean={result['deep_mean']:+.1f}, "
          f"Std={result['deep_std']:.1f}, "
          f"CVaR5%={result['deep_cvar']:+.1f}, "
          f"Cost={result['deep_cost']:.1f}")
    improvement = (1 - result['deep_std']/result['bs_std']) * 100
    print(f"  Std Improvement: {improvement:.1f}%\\n")`}),e.jsx(T,{title:"No-Trade Zone for Nifty ATM Call",difficulty:"advanced",problem:"A Nifty 22,000 ATM call has gamma = 0.0012 per point. Transaction cost is 0.1% of notional. Risk aversion lambda = 1. What is the optimal no-trade zone width for the hedge ratio?",solution:[{step:"Apply the Whalley-Wilmott formula",formula:"w^* = \\left(\\frac{3 \\cdot c \\cdot S^2 \\cdot \\Gamma^2}{2\\lambda}\\right)^{1/3}"},{step:"Substitute values",formula:"w^* = \\left(\\frac{3 \\times 0.001 \\times 22000^2 \\times 0.0012^2}{2 \\times 1}\\right)^{1/3}"},{step:"Compute",formula:"w^* = \\left(\\frac{3 \\times 0.001 \\times 4.84 \\times 10^8 \\times 1.44 \\times 10^{-6}}{2}\\right)^{1/3} \\approx 0.048",explanation:"The optimal no-trade zone is about 4.8% of delta. Only rebalance when the BS delta moves more than 0.048 from the current hedge ratio. This saves approximately 40% in transaction costs on Nifty options."}]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Risk Measures for Deep Hedging"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The choice of risk measure ",e.jsx(t.InlineMath,{math:"\\rho"})," in the deep hedging objective significantly affects the learned strategy. Common choices for Indian options:"]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Risk Measure"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Formula"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Behaviour"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Variance"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"\\text{Var}(\\Pi_T)"})}),e.jsx("td",{className:"px-4 py-2",children:"Penalizes all deviations equally"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"CVaR (5%)"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"\\mathbb{E}[\\Pi_T | \\Pi_T \\leq q_{0.05}]"})}),e.jsx("td",{className:"px-4 py-2",children:"Focuses on tail risk"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Entropic"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"\\frac{1}{\\lambda}\\log \\mathbb{E}[e^{-\\lambda \\Pi_T}]"})}),e.jsx("td",{className:"px-4 py-2",children:"Exponential penalty on losses"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Mean-Variance"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"-\\mathbb{E}[\\Pi_T] + \\lambda \\text{Var}(\\Pi_T)"})}),e.jsx("td",{className:"px-4 py-2",children:"Standard utility framework"})]})]})]})}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For NSE options with their asymmetric cost structure (STT only on sell side), CVaR at 5% is typically the best choice as it focuses on worst-case scenarios while allowing the network to tolerate small hedging errors that would be too costly to eliminate."}),e.jsx(f,{title:"NSE Options Market Context",type:"historical",children:e.jsxs("ul",{className:"space-y-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Nifty Weekly Options:"})," The world's most traded index options by volume. Weekly expiry every Thursday creates unique gamma and theta dynamics that deep hedging can exploit."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Bank Nifty Options:"})," Higher volatility (IV ~18-25% vs Nifty ~14-18%) and wider spreads make the cost-accuracy tradeoff even more relevant for deep hedging."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"SEBI Regulations:"})," SEBI's 2023 mandate limiting weekly expiry to one index per exchange changes the options landscape, potentially improving liquidity at remaining expiries and reducing deep hedging costs."]})]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Implementation Architecture"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"A production deep hedging system for Nifty options requires the following pipeline. The neural network takes as input the current market state and outputs the optimal hedge ratio:"}),e.jsx(t.BlockMath,{math:"\\delta_\\theta^* = \\text{NN}_\\theta\\left(t, S_t, \\sigma_t^{\\text{IV}}, \\Gamma_t, \\text{DTE}, \\text{VIX}_t\\right)"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The input features for Indian options include the India VIX level (which captures regime information), days to expiry (critical for weekly options), and the current gamma (which determines the sensitivity to discrete hedging). A 3-layer LSTM with 64 hidden units typically suffices for daily hedging of Nifty monthly options, while weekly options benefit from attention-based architectures that capture the rapid theta decay in the final 2-3 days."}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Deep hedging is particularly valuable for Indian options markets where transaction costs (STT on options premium, wide spreads on OTM Nifty strikes) significantly impact hedging P&L. The neural network learns to trade off hedging accuracy against rebalancing costs -- effectively discovering the optimal no-trade zone. For Nifty weekly options with 5-day expiry, deep hedging can reduce hedging costs by 30-50% compared to daily BS delta rebalancing, while maintaining similar risk levels."})})]})}const we=Object.freeze(Object.defineProperty({__proto__:null,default:oe},Symbol.toStringTag,{value:"Module"}));function le(){const[a,g]=c.useState(.12),[s,y]=c.useState(.18),[o,i]=c.useState(2),[r,d]=c.useState(.5),n=60,l=1/252,p=[],m=[];for(let j=0;j<4;j++){const I=[22e3],A=[s];let b=(j+1)*31+17;for(let S=1;S<n;S++){b=b*1103515245+12345&2147483647;const C=(b/2147483647-.5)*3.4;b=b*1103515245+12345&2147483647;const M=(b/2147483647-.5)*3.4,F=A[S-1],z=Math.max(.05,F+o*(s-F)*l+r*F*Math.sqrt(l)*M);A.push(z);const D=(a-.5*z*z)*l,L=z*Math.sqrt(l)*C;I.push(I[S-1]*Math.exp(D+L))}p.push(I),m.push(A)}const u=p.flat(),_=Math.min(...u),x=Math.max(...u)-_||1,h=["#6366f1","#22c55e","#ef4444","#f59e0b"];return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Neural SDE Price Paths for Nifty Options"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Visualize Nifty paths under a neural SDE with learned stochastic volatility. The drift and diffusion functions are parameterized by neural networks."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Drift ",e.jsx(t.InlineMath,{math:"\\mu_\\theta"})," = ",(a*100).toFixed(0),"%"]}),e.jsx("input",{type:"range",min:"-0.1",max:"0.3",step:"0.01",value:a,onChange:j=>g(parseFloat(j.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Vol level ",e.jsx(t.InlineMath,{math:"\\sigma_\\theta"})," = ",(s*100).toFixed(0),"%"]}),e.jsx("input",{type:"range",min:"0.08",max:"0.4",step:"0.01",value:s,onChange:j=>y(parseFloat(j.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Mean Rev ",e.jsx(t.InlineMath,{math:"\\kappa"})," = ",o.toFixed(1)]}),e.jsx("input",{type:"range",min:"0.5",max:"5",step:"0.1",value:o,onChange:j=>i(parseFloat(j.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Vol-of-Vol ",e.jsx(t.InlineMath,{math:"\\xi"})," = ",r.toFixed(1)]}),e.jsx("input",{type:"range",min:"0.1",max:"2",step:"0.1",value:r,onChange:j=>d(parseFloat(j.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 520 180",className:"w-full max-w-xl mx-auto block","aria-label":"Neural SDE paths",children:[p.map((j,I)=>{const A=j.map((b,S)=>{const C=50+S/(n-1)*440,M=160-(b-_)/x*130;return`${C},${M}`}).join(" ");return e.jsx("polyline",{points:A,fill:"none",stroke:h[I],strokeWidth:"1.5",opacity:"0.7"},I)}),e.jsx("line",{x1:"50",y1:"160",x2:"490",y2:"160",stroke:"#d1d5db",strokeWidth:"1"}),e.jsx("text",{x:"270",y:"176",textAnchor:"middle",className:"text-[9px]",fill:"#6b7280",children:"Trading Days"}),e.jsx("text",{x:"15",y:"90",textAnchor:"middle",className:"text-[8px]",fill:"#9ca3af",transform:"rotate(-90, 15, 90)",children:"Nifty Price"}),e.jsxs("text",{x:"400",y:"20",textAnchor:"end",className:"text-[8px]",fill:"#6b7280",children:["Vol: ",(m[0][m[0].length-1]*100).toFixed(1),"% (path 1)"]})]})]})}function de(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Neural SDEs for Nifty Options Pricing"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Neural Stochastic Differential Equations (Neural SDEs) replace the parametric drift and diffusion functions in classical SDEs with neural networks. This allows the model to learn complex, state-dependent dynamics directly from Nifty options market data, capturing phenomena like the volatility smile, term structure dynamics, and jump behavior that parametric models (Heston, SABR) can only approximate."}),e.jsx(N,{title:"Neural Stochastic Differential Equation",label:"Definition 13.11",definition:"A Neural SDE is a continuous-time stochastic model where the drift and diffusion coefficients are parameterized by neural networks. The asset price evolves as dS_t = mu_theta(t, S_t) dt + sigma_phi(t, S_t) dW_t, where mu_theta and sigma_phi are learned functions.",notation:e.jsxs(e.Fragment,{children:["The general form is ",e.jsx(t.InlineMath,{math:"dX_t = f_\\theta(t, X_t)\\,dt + g_\\phi(t, X_t)\\,dW_t"})," where ",e.jsx(t.InlineMath,{math:"f_\\theta"})," and ",e.jsx(t.InlineMath,{math:"g_\\phi"})," are neural networks with parameters ",e.jsx(t.InlineMath,{math:"\\theta, \\phi"}),"."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Neural SDE for Options Pricing"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For Nifty options pricing, we model the risk-neutral dynamics with a neural diffusion:"}),e.jsx(t.BlockMath,{math:"dS_t = r\\, S_t\\, dt + \\sigma_\\phi(t, S_t, v_t)\\, S_t\\, dW_t^S"}),e.jsx(t.BlockMath,{math:"dv_t = \\kappa_\\theta(t, v_t)(\\bar{v}_\\theta(t) - v_t)\\,dt + \\xi_\\psi(t, v_t)\\,dW_t^v"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"r = 6.5\\%"})," (RBI repo rate),"," ",e.jsx(t.InlineMath,{math:"\\sigma_\\phi"})," is the neural local volatility, and"," ",e.jsx(t.InlineMath,{math:"v_t"})," is a latent volatility factor. The model is trained by minimizing the pricing error across the Nifty options surface:"]}),e.jsx(t.BlockMath,{math:"\\mathcal{L}(\\theta, \\phi, \\psi) = \\sum_{K, T} \\left(C_{\\text{model}}(K, T; \\theta, \\phi, \\psi) - C_{\\text{market}}(K, T)\\right)^2"}),e.jsx(v,{title:"Universal Approximation for SDEs",label:"Theorem 13.8",statement:e.jsxs(e.Fragment,{children:["A Neural SDE with sufficiently wide neural networks for drift ",e.jsx(t.InlineMath,{math:"f_\\theta"})," and diffusion ",e.jsx(t.InlineMath,{math:"g_\\phi"})," can approximate any Ito process with bounded coefficients to arbitrary accuracy:"]}),formula:"\\sup_{t \\in [0,T]} \\mathbb{E}\\left[\\|X_t - X_t^{\\theta,\\phi}\\|^2\\right] < \\epsilon \\quad \\text{for any } \\epsilon > 0",proof:e.jsx(e.Fragment,{children:"This follows from the universal approximation theorem for neural networks applied to the SDE coefficients. If the true drift and diffusion are continuous functions satisfying Lipschitz and linear growth conditions, then neural networks with ReLU activations can approximate them uniformly on compact sets. The SDE well-posedness theory (Ito existence theorem) then guarantees that the solution process inherits the approximation error. For Nifty options, this means the Neural SDE can fit any vol surface shape, including the steep put skew observed in Indian index options."})}),e.jsx(le,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Training with Adjoint Methods"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["Neural SDEs are trained using the adjoint sensitivity method, which computes gradients through the SDE solver without backpropagating through each discretization step. The adjoint state ",e.jsx(t.InlineMath,{math:"a_t = \\partial \\mathcal{L} / \\partial X_t"})," ","satisfies:"]}),e.jsx(t.BlockMath,{math:"da_t = -a_t \\frac{\\partial f_\\theta}{\\partial X_t}\\,dt - a_t \\frac{\\partial g_\\phi}{\\partial X_t}\\,dW_t"}),e.jsx(w,{title:"neural_sde_nifty.py",runnable:!0,code:`import numpy as np

class NeuralSDESimulator:
    """Simplified Neural SDE for Nifty options.

    Demonstrates the concept with parametric neural-inspired
    drift and diffusion. For full implementation, use torchsde.
    """

    def __init__(self, hidden_dim=32, seed=42):
        self.rng = np.random.RandomState(seed)
        self.hidden_dim = hidden_dim

        # Simulated learned parameters (would be neural network weights)
        self.W_drift = self.rng.randn(3, hidden_dim) * 0.1
        self.b_drift = self.rng.randn(hidden_dim) * 0.01
        self.W_drift_out = self.rng.randn(hidden_dim, 1) * 0.1

        self.W_vol = self.rng.randn(3, hidden_dim) * 0.1
        self.b_vol = self.rng.randn(hidden_dim) * 0.01
        self.W_vol_out = self.rng.randn(hidden_dim, 1) * 0.1

    def _relu(self, x):
        return np.maximum(0, x)

    def neural_drift(self, t, S, v):
        """Learned drift function."""
        x = np.array([t, np.log(S / 22000), v])
        h = self._relu(x @ self.W_drift + self.b_drift)
        mu = float(h @ self.W_vol_out) * 0.5
        return 0.065 + mu * 0.1  # Around risk-free rate

    def neural_diffusion(self, t, S, v):
        """Learned diffusion function."""
        x = np.array([t, np.log(S / 22000), v])
        h = self._relu(x @ self.W_vol + self.b_vol)
        sigma_raw = float(h @ self.W_vol_out)
        return max(0.08, 0.16 + sigma_raw * 0.05)  # Floor at 8%

    def simulate(self, S0, T, n_steps, n_paths):
        """Simulate paths using Euler-Maruyama."""
        dt = T / n_steps
        S = np.zeros((n_paths, n_steps + 1))
        vol = np.zeros((n_paths, n_steps + 1))
        S[:, 0] = S0
        vol[:, 0] = 0.16  # Initial vol

        for t_idx in range(n_steps):
            t = t_idx * dt
            Z_S = self.rng.randn(n_paths)
            Z_v = self.rng.randn(n_paths)

            for i in range(n_paths):
                mu = self.neural_drift(t, S[i, t_idx], vol[i, t_idx])
                sigma = self.neural_diffusion(t, S[i, t_idx], vol[i, t_idx])

                # Price dynamics
                S[i, t_idx + 1] = S[i, t_idx] * np.exp(
                    (mu - 0.5 * sigma**2) * dt +
                    sigma * np.sqrt(dt) * Z_S[i]
                )

                # Vol dynamics (mean-reverting)
                kappa = 2.0
                vol_bar = 0.16
                xi = 0.4
                vol[i, t_idx + 1] = max(0.05,
                    vol[i, t_idx] +
                    kappa * (vol_bar - vol[i, t_idx]) * dt +
                    xi * vol[i, t_idx] * np.sqrt(dt) * Z_v[i]
                )

        return S, vol

    def price_option(self, S0, K, T, n_paths=10000, n_steps=100):
        """Price option via Monte Carlo with Neural SDE."""
        S, vol = self.simulate(S0, T, n_steps, n_paths)
        payoff = np.maximum(S[:, -1] - K, 0)
        price = np.exp(-0.065 * T) * np.mean(payoff)
        std_err = np.exp(-0.065 * T) * np.std(payoff) / np.sqrt(n_paths)
        return price, std_err

# --- Demo ---
nsde = NeuralSDESimulator(seed=42)

print("=== Neural SDE for Nifty Options ===\\n")

# Simulate paths
S, vol = nsde.simulate(S0=22000, T=30/252, n_steps=30, n_paths=5)
print("--- Sample Paths (30 days) ---")
for i in range(5):
    ret = (S[i, -1] / S[i, 0] - 1) * 100
    final_vol = vol[i, -1] * 100
    print(f"  Path {i+1}: {S[i,0]:.0f} -> {S[i,-1]:.0f} "
          f"({ret:+.1f}%), vol={final_vol:.1f}%")

# Price Nifty options across strikes
print("\\n--- Nifty Option Prices (T=30 days) ---")
strikes = [21500, 21750, 22000, 22250, 22500]
for K in strikes:
    price, se = nsde.price_option(22000, K, 30/252, n_paths=5000)
    moneyness = (22000 - K) / 22000 * 100
    print(f"  K={K} ({moneyness:+.1f}% ITM): "
          f"Price={price:.1f} +/- {se:.1f} INR")

# Compare with Black-Scholes
print("\\n--- Neural SDE vs Parametric Models ---")
print("Advantages:")
print("  1. Learns vol surface shape from market data")
print("  2. Captures state-dependent dynamics")
print("  3. No need to specify functional form")
print("  4. Naturally handles Nifty skew and smile")
print("\\nCalibration target: Nifty weekly + monthly options")
print("Training data: 2 years of NSE option chain snapshots")`}),e.jsx(T,{title:"Calibrating Neural SDE to India VIX",difficulty:"advanced",problem:"India VIX trades at 14% with mean-reversion speed kappa = 3.0 and vol-of-vol xi = 0.6. A Neural SDE is trained on 2 years of daily India VIX data. What vol surface features can it capture that Heston cannot?",solution:[{step:"Heston limitations",formula:"\\text{Heston: } dv_t = \\kappa(\\bar{v} - v_t)\\,dt + \\xi\\sqrt{v_t}\\,dW_t^v",explanation:"Heston constrains the vol-of-vol to be proportional to sqrt(v_t), producing a fixed functional form for the smile."},{step:"Neural SDE flexibility",formula:"dv_t = f_\\theta(t, v_t)\\,dt + g_\\phi(t, v_t)\\,dW_t^v",explanation:"The Neural SDE can learn state-dependent mean-reversion and vol-of-vol, capturing features like vol-of-vol increasing during India VIX spikes (asymmetric behavior not possible in Heston)."},{step:"Practical improvements",formula:"\\text{RMSE}_{\\text{Neural}} < \\text{RMSE}_{\\text{Heston}} \\text{ by 30-50\\%}",explanation:"The Neural SDE typically reduces option pricing RMSE by 30-50% on the Nifty vol surface, particularly for short-dated OTM puts where the steep skew is hardest to fit parametrically."}]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Neural SDE vs Parametric Models"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Model"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Parameters"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Smile Fit"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Nifty RMSE (bps)"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Black-Scholes"}),e.jsx("td",{className:"px-4 py-2",children:"1"}),e.jsx("td",{className:"px-4 py-2",children:"Flat (no smile)"}),e.jsx("td",{className:"px-4 py-2",children:"~150-300"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Heston"}),e.jsx("td",{className:"px-4 py-2",children:"5"}),e.jsx("td",{className:"px-4 py-2",children:"Moderate skew"}),e.jsx("td",{className:"px-4 py-2",children:"~50-100"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"SABR"}),e.jsx("td",{className:"px-4 py-2",children:"4"}),e.jsx("td",{className:"px-4 py-2",children:"Good short-dated"}),e.jsx("td",{className:"px-4 py-2",children:"~30-80"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Local Vol (Dupire)"}),e.jsx("td",{className:"px-4 py-2",children:"Surface"}),e.jsx("td",{className:"px-4 py-2",children:"Exact static fit"}),e.jsx("td",{className:"px-4 py-2",children:"~0 (by construction)"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Neural SDE"}),e.jsx("td",{className:"px-4 py-2",children:"~10K-100K"}),e.jsx("td",{className:"px-4 py-2",children:"Learned from data"}),e.jsx("td",{className:"px-4 py-2",children:"~10-30"})]})]})]})}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The key advantage of Neural SDEs over Dupire local volatility is that they capture dynamic smile behavior -- how the volatility surface moves over time -- rather than just fitting a static snapshot. This is crucial for hedging multi-day Nifty option positions where vol surface dynamics dominate P&L."}),e.jsx(f,{title:"Nifty Vol Surface Characteristics",type:"historical",children:e.jsxs("ul",{className:"space-y-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Put Skew:"})," Nifty options exhibit steep put skew, with 5% OTM puts trading at 3-5 vol points above ATM. Neural SDEs learn this asymmetry naturally from market data."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Term Structure:"})," The Nifty vol term structure is typically in contango (upward sloping) but inverts during stress events. Neural SDEs capture this state-dependent behaviour."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Expiry Effects:"})," Weekly options expiry on Thursday creates unique gamma dynamics. Neural SDEs trained on intraday data can learn the characteristic vol crush pattern heading into expiry."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Correlation with India VIX:"})," The neural diffusion function naturally learns the correlation between Nifty returns and India VIX movements, improving cross-Greek hedging accuracy."]})]})}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsxs("p",{children:["Neural SDEs combine the continuous-time framework of classical mathematical finance with the flexibility of deep learning. For Nifty options, they offer a way to build pricing and hedging models that automatically adapt to the market-observed volatility dynamics without pre-specifying a parametric form. The key implementation tools are ",e.jsx("code",{children:"torchsde"})," for differentiable SDE simulation and adjoint-based gradient computation. Always validate against the live NSE option chain to ensure the model captures the steep put skew characteristic of Indian index options."]})})]})}const Te=Object.freeze(Object.defineProperty({__proto__:null,default:de},Symbol.toStringTag,{value:"Module"}));export{xe as a,fe as b,ge as c,ue as d,ye as e,_e as f,be as g,je as h,ke as i,Ne as j,ve as k,we as l,Te as m,me as s};
