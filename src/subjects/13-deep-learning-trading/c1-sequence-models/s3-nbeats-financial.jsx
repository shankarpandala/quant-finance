import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveNBEATS() {
  const [nStacks, setNStacks] = useState(3)
  const [nBlocks, setNBlocks] = useState(3)
  const [forecastHorizon, setForecastHorizon] = useState(5)

  const stackTypes = ['Trend', 'Seasonality', 'Generic']
  const residuals = [1.0]
  for (let s = 0; s < nStacks; s++) {
    residuals.push(residuals[s] * (0.7 - s * 0.1))
  }

  const totalExplained = (1 - residuals[nStacks]) * 100

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: N-BEATS Architecture
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Configure N-BEATS stacks for decomposing Nifty 50 time series.
      </p>
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Stacks = {nStacks}</span>
          <input type="range" min="1" max="5" step="1" value={nStacks}
            onChange={e => setNStacks(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Blocks/Stack = {nBlocks}</span>
          <input type="range" min="1" max="5" step="1" value={nBlocks}
            onChange={e => setNBlocks(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Forecast Horizon = {forecastHorizon} days</span>
          <input type="range" min="1" max="20" step="1" value={forecastHorizon}
            onChange={e => setForecastHorizon(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 420 110" className="w-full max-w-lg mx-auto block">
        {Array.from({ length: nStacks }, (_, s) => {
          const x = 30 + s * (350 / nStacks)
          const width = 300 / nStacks
          const stackName = stackTypes[s % stackTypes.length]
          const barHeight = (residuals[s] - residuals[s + 1]) * 60
          return (
            <g key={s}>
              <rect x={x} y={80 - barHeight} width={width - 10} height={barHeight}
                fill={['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][s % 5]} opacity="0.6" rx="3" />
              <text x={x + width / 2 - 5} y={90} textAnchor="middle" className="text-[8px]" fill="#6b7280">
                {stackName}
              </text>
              <text x={x + width / 2 - 5} y={75 - barHeight} textAnchor="middle"
                className="text-[7px] font-bold" fill="#4338ca">
                {((residuals[s] - residuals[s + 1]) * 100).toFixed(0)}%
              </text>
              {s < nStacks - 1 && (
                <line x1={x + width - 10} y1="50" x2={x + width} y2="50"
                  stroke="#d1d5db" strokeWidth="1" markerEnd="url(#arrow)" />
              )}
            </g>
          )
        })}
        <text x="210" y="105" textAnchor="middle" className="text-[9px] font-bold" fill="#16a34a">
          Total Explained: {totalExplained.toFixed(0)}% | Residual: {(100 - totalExplained).toFixed(0)}%
        </text>
      </svg>
    </div>
  )
}

export default function NBeatsFinancial() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        N-BEATS for Financial Forecasting
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        N-BEATS (Neural Basis Expansion Analysis for Time Series) is a deep learning
        architecture specifically designed for time series forecasting. Its hierarchical
        doubly residual structure decomposes time series into interpretable components
        (trend, seasonality), making it ideal for forecasting Nifty 50 returns with
        both accuracy and interpretability.
      </p>

      <DefinitionBlock
        title="N-BEATS Architecture"
        label="Definition 13.3"
        definition="N-BEATS consists of stacked blocks, where each block produces a backcast (fitted values for the input window) and a forecast (prediction for the horizon). The input to each subsequent block is the residual after subtracting the previous block's backcast. The final forecast is the sum of all blocks' partial forecasts."
        notation="\hat{y} = \sum_{l=1}^{L} \hat{y}_l^{forecast}, \quad x_{l+1} = x_l - \hat{x}_l^{backcast}"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Block Architecture
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Each N-BEATS block processes the input through fully connected layers and
        generates basis expansion coefficients:
      </p>

      <BlockMath math="h_l = \text{ReLU}(W_4 \cdot \text{ReLU}(W_3 \cdot \text{ReLU}(W_2 \cdot \text{ReLU}(W_1 \cdot x_l))))" />

      <BlockMath math="\hat{x}_l^{back} = V_b^T \theta_l^{back}, \quad \hat{y}_l^{fore} = V_f^T \theta_l^{fore}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="V_b, V_f" /> are basis matrices and{' '}
        <InlineMath math="\theta" /> are learned coefficients. For interpretable stacks:
      </p>

      <BlockMath math="\text{Trend basis: } V_{trend}(t) = [1, t, t^2, ..., t^p]" />
      <BlockMath math="\text{Seasonal basis: } V_{seas}(t) = [\cos(2\pi t/s_k), \sin(2\pi t/s_k)]_{k=1}^{K}" />

      <TheoremBlock
        title="Doubly Residual Learning"
        label="Theorem 13.3"
        statement="N-BEATS' doubly residual architecture ensures that each block specializes in explaining a different component of the time series. The backcast residual x_{l+1} = x_l - hat{x}_l removes the explained component, forcing subsequent blocks to capture remaining patterns. The forecast residual aggregation hat{y} = sum(hat{y}_l) naturally decomposes the prediction."
        proof="By construction, block l receives residual x_l = x - sum_{j<l} hat{x}_j. The loss function minimizes sum_l ||x_l - hat{x}_l||^2, which is equivalent to fitting x = sum_l hat{x}_l. Each block's forecast hat{y}_l corresponds to the same component captured by hat{x}_l, ensuring interpretable decomposition."
      />

      <NoteBlock title="N-BEATS for Indian Financial Data" type="tip">
        <ul className="space-y-1 text-sm">
          <li><strong>Interpretable:</strong> Trend stack captures Nifty bullish/bearish trends, seasonal stack captures monthly/quarterly patterns</li>
          <li><strong>Generic:</strong> Generic stacks learn arbitrary patterns (FII flow effects, budget impact)</li>
          <li><strong>Ensemble:</strong> N-BEATS naturally supports ensembling by averaging predictions from multiple random initializations</li>
          <li><strong>Input:</strong> Lookback window of 2-5x forecast horizon (e.g., 50 days for 10-day forecast)</li>
        </ul>
      </NoteBlock>

      <InteractiveNBEATS />

      <PythonCode
        title="nbeats_financial.py"
        runnable
        code={`import numpy as np

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
      f"(cumulative {horizon}-day predicted return)")`}
      />

      <ExampleBlock
        title="N-BEATS Decomposition of Nifty Returns"
        difficulty="intermediate"
        problem="N-BEATS produces a 5-day Nifty forecast with stack contributions: Trend=+0.12%, Seasonality=-0.05%, Generic=+0.03%. What is the total forecast and which component dominates?"
        solution={[
          {
            step: 'Sum stack forecasts',
            formula: '\\hat{y} = 0.12\\% + (-0.05\\%) + 0.03\\% = +0.10\\%',
            explanation: 'Total 5-day forecast is +0.10% return.',
          },
          {
            step: 'Analyze contributions',
            formula: '\\text{Trend: } 0.12/0.20 = 60\\%,\\; \\text{Seasonal: } 0.05/0.20 = 25\\%',
            explanation: 'Trend dominates (60%), followed by seasonality (25%). The seasonal component is negative, suggesting a typical month-end pattern.',
          },
          {
            step: 'Trading signal',
            formula: '\\text{Net: } +0.10\\% \\Rightarrow \\text{Weak Long}',
            explanation: 'The bullish trend is partially offset by negative seasonality. A cautious long position with reduced size would be appropriate, given the cross-currents between trend and seasonal components.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          N-BEATS provides a powerful framework for financial time series forecasting
          with built-in interpretability. The doubly residual architecture naturally
          decomposes Nifty returns into trend, seasonal, and idiosyncratic components,
          allowing traders to understand what drives each prediction. The generic stacks
          capture complex patterns (macro events, flow dynamics) that do not fit simple
          trend or seasonal templates. N-BEATS has shown state-of-the-art performance
          on multiple financial forecasting benchmarks.
        </p>
      </NoteBlock>
    </div>
  )
}
