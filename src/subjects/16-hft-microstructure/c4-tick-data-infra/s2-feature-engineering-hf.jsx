import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveFeatureLatency() {
  const [windowSize, setWindowSize] = useState(100)
  const [numFeatures, setNumFeatures] = useState(50)
  const [updateFreqMs, setUpdateFreqMs] = useState(10)

  const computeTimeUs = numFeatures * Math.log2(windowSize) * 0.5
  const memoryKB = windowSize * numFeatures * 8 / 1024
  const throughput = 1000 / updateFreqMs
  const feasible = computeTimeUs < updateFreqMs * 1000

  const featureGroups = [
    { name: 'Price-based', count: Math.round(numFeatures * 0.3), latency: computeTimeUs * 0.2 },
    { name: 'Volume-based', count: Math.round(numFeatures * 0.2), latency: computeTimeUs * 0.15 },
    { name: 'Book-based', count: Math.round(numFeatures * 0.3), latency: computeTimeUs * 0.4 },
    { name: 'Cross-asset', count: Math.round(numFeatures * 0.2), latency: computeTimeUs * 0.25 },
  ]

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Feature Engineering Latency Budget
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Configure window size, feature count, and update frequency to assess
        computational feasibility for HFT on NSE.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Window: {windowSize} ticks</span>
          <input type="range" min="10" max="1000" step="10" value={windowSize}
            onChange={e => setWindowSize(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Features: {numFeatures}</span>
          <input type="range" min="10" max="200" step="5" value={numFeatures}
            onChange={e => setNumFeatures(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Update Freq: {updateFreqMs}ms</span>
          <input type="range" min="1" max="100" step="1" value={updateFreqMs}
            onChange={e => setUpdateFreqMs(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 500 130" className="w-full max-w-lg mx-auto block" aria-label="Feature latency budget">
        {featureGroups.map((g, i) => {
          const x = 80 + i * 100
          const barHeight = Math.min(80, g.latency * 0.3)
          return (
            <g key={i}>
              <rect x={x} y={90 - barHeight} width="60" height={barHeight}
                fill="#6366f1" opacity={0.5 + i * 0.1} rx="4" />
              <text x={x + 30} y="105" textAnchor="middle" className="text-[8px]" fill="#374151">
                {g.name}
              </text>
              <text x={x + 30} y="118" textAnchor="middle" className="text-[7px]" fill="#6b7280">
                {g.count} feat, {g.latency.toFixed(0)}us
              </text>
            </g>
          )
        })}

        <text x="250" y="15" textAnchor="middle"
          className={`text-[11px] font-bold ${feasible ? 'fill-green-600' : 'fill-red-500'}`}>
          Total: {computeTimeUs.toFixed(0)}us / {updateFreqMs}ms budget = {feasible ? 'FEASIBLE' : 'TOO SLOW'}
        </text>
        <text x="250" y="30" textAnchor="middle" className="text-[9px] fill-gray-500">
          Memory: {memoryKB.toFixed(1)} KB | Throughput: {throughput.toFixed(0)} updates/sec
        </text>
      </svg>
    </div>
  )
}

export default function FeatureEngineeringHF() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        High-Frequency Feature Engineering
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Feature engineering at high frequency requires fundamentally different approaches
        than daily-frequency quant models. On NSE, features must be computed incrementally
        with microsecond-level latency, handle irregular tick arrivals, and capture
        microstructure phenomena that exist only at sub-second timescales.
      </p>

      <DefinitionBlock
        title="Incremental Feature Computation"
        label="Definition 2.1"
        definition="Incremental (online) feature computation updates feature values with each new tick in O(1) amortized time, rather than recomputing over the full window. This is essential for HFT where recomputing rolling statistics from scratch would introduce unacceptable latency. Techniques include running sums, exponential moving averages, and ring buffers."
        notation={<>For a rolling mean over window <InlineMath math="W" />: <InlineMath math="\bar{x}_t = \bar{x}_{t-1} + \frac{x_t - x_{t-W}}{W}" /> computed in <InlineMath math="O(1)" /> versus <InlineMath math="O(W)" /> for naive recomputation.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Feature Categories for HFT
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        High-frequency features fall into four categories, each with different
        computational profiles:
      </p>

      <BlockMath math="\text{Price:} \quad r_\tau = \frac{m_t - m_{t-\tau}}{m_{t-\tau}}, \quad \text{VWAP}_\tau, \quad \text{realized vol}_\tau" />
      <BlockMath math="\text{Volume:} \quad V_\tau^{\text{agg}}, \quad \frac{V_\tau^b}{V_\tau^s}, \quad \text{trade intensity}_\tau" />
      <BlockMath math="\text{Book:} \quad \text{OBI}_k, \quad \text{microprice}, \quad \text{book slope}" />
      <BlockMath math="\text{Cross:} \quad \Delta r_t^{\text{SGX}}, \quad \Delta r_t^{\text{FX}}, \quad \text{sector return}" />

      <TheoremBlock
        title="Optimal Feature Horizon Selection"
        label="Result 2.1"
        statement={<>For NSE equity tick data, the information content (measured by predictive mutual information) of price-based features follows a power-law decay with horizon: <BlockMath math="I(\tau) \propto \tau^{-\alpha}, \quad \alpha \approx 0.7\text{--}0.9" /> implying that shorter horizons are more informative but noisier. The optimal set of horizons for a multi-horizon feature set is geometrically spaced: <InlineMath math="\tau_k = \tau_0 \cdot \gamma^k" /> with <InlineMath math="\gamma \approx 2\text{--}3" />.</>}
        proof={<>Analysis of mutual information between <InlineMath math="r_\tau" /> and future 100ms returns for 50 NIFTY stocks shows consistent power-law decay. Geometric spacing is optimal because it provides uniform coverage on a log-scale, matching the information decay profile. Typical horizon set: {'{'}50ms, 100ms, 200ms, 500ms, 1s, 2s, 5s{'}'} (approximately <InlineMath math="\gamma = 2.2" />).</>}
      />

      <InteractiveFeatureLatency />

      <PythonCode
        title="hf_feature_engine.py"
        runnable
        code={`import numpy as np
from collections import deque

class IncrementalStats:
    """O(1) incremental statistics using ring buffer."""

    def __init__(self, window_size):
        self.window = window_size
        self.buffer = deque(maxlen=window_size)
        self.sum = 0.0
        self.sum_sq = 0.0
        self.count = 0

    def update(self, value):
        """Add new value, O(1) amortized."""
        if len(self.buffer) == self.window:
            old = self.buffer[0]
            self.sum -= old
            self.sum_sq -= old * old
        else:
            self.count += 1

        self.buffer.append(value)
        self.sum += value
        self.sum_sq += value * value

    @property
    def mean(self):
        return self.sum / self.count if self.count > 0 else 0

    @property
    def variance(self):
        if self.count < 2:
            return 0
        return self.sum_sq / self.count - self.mean ** 2

    @property
    def std(self):
        return np.sqrt(max(0, self.variance))

class HFFeatureEngine:
    """High-frequency feature engine for NSE tick data."""

    def __init__(self, horizons=[50, 100, 200, 500, 1000]):
        self.horizons = horizons  # in ticks
        self.price_buffers = {h: deque(maxlen=h) for h in horizons}
        self.vol_buffers = {h: IncrementalStats(h) for h in horizons}
        self.trade_count_buffers = {h: deque(maxlen=h) for h in horizons}
        self.ema_alpha = {h: 2 / (h + 1) for h in horizons}
        self.ema_values = {h: None for h in horizons}
        self.tick_count = 0

    def update(self, midprice, volume, trade_sign, bid_depth, ask_depth):
        """Process one tick and return feature vector."""
        self.tick_count += 1
        features = {}

        for h in self.horizons:
            # Price returns at multiple horizons
            self.price_buffers[h].append(midprice)
            if len(self.price_buffers[h]) == h:
                old_price = self.price_buffers[h][0]
                ret = (midprice - old_price) / old_price
                features[f'ret_{h}'] = ret
            else:
                features[f'ret_{h}'] = 0.0

            # EMA of returns
            ret_val = features[f'ret_{h}']
            alpha = self.ema_alpha[h]
            if self.ema_values[h] is None:
                self.ema_values[h] = ret_val
            else:
                self.ema_values[h] = alpha * ret_val + (1 - alpha) * self.ema_values[h]
            features[f'ema_{h}'] = self.ema_values[h]

            # Rolling volatility
            self.vol_buffers[h].update(ret_val)
            features[f'vol_{h}'] = self.vol_buffers[h].std

            # Trade intensity (volume)
            self.trade_count_buffers[h].append(volume)
            features[f'trade_intensity_{h}'] = sum(self.trade_count_buffers[h])

        # Book features (instant)
        total_depth = bid_depth + ask_depth
        features['obi'] = (bid_depth - ask_depth) / max(total_depth, 1)
        features['microprice_dev'] = (ask_depth * midprice - bid_depth * midprice) / max(total_depth, 1) / midprice
        features['depth_ratio'] = bid_depth / max(ask_depth, 1)

        # Trade sign features
        features['trade_sign'] = trade_sign

        return features

# Simulate and benchmark
np.random.seed(42)
n_ticks = 5000
base_price = 2500.0

engine = HFFeatureEngine(horizons=[10, 50, 100, 500])

prices = base_price + np.cumsum(np.random.normal(0, 0.05, n_ticks))
volumes = np.random.poisson(100, n_ticks)
signs = np.random.choice([-1, 1], n_ticks)
bid_depths = np.random.poisson(300, n_ticks) + 50
ask_depths = np.random.poisson(280, n_ticks) + 50

print("=" * 55)
print("HF FEATURE ENGINE: NSE TICK DATA")
print("=" * 55)

# Process all ticks
all_features = []
import time
start = time.time()

for i in range(n_ticks):
    feat = engine.update(prices[i], volumes[i], signs[i],
                         bid_depths[i], ask_depths[i])
    all_features.append(feat)

elapsed = time.time() - start

print(f"\\nProcessed {n_ticks} ticks in {elapsed*1000:.1f}ms")
print(f"Per-tick latency: {elapsed/n_ticks*1e6:.1f} microseconds")
print(f"Throughput: {n_ticks/elapsed:.0f} ticks/second")

# Show final feature vector
print(f"\\nFeature vector ({len(all_features[-1])} features):")
for k, v in sorted(all_features[-1].items()):
    print(f"  {k:25s}: {v:>12.6f}")

# Feature statistics
print(f"\\nFeature Statistics (last 1000 ticks):")
recent = all_features[-1000:]
for feat_name in ['ret_50', 'vol_100', 'obi', 'trade_intensity_500']:
    values = [f[feat_name] for f in recent]
    print(f"  {feat_name:25s}: mean={np.mean(values):+.6f}, "
          f"std={np.std(values):.6f}")`}
      />

      <ExampleBlock
        title="Incremental vs. Batch Feature Computation"
        difficulty="intermediate"
        problem="You need to compute a 500-tick rolling standard deviation of midprice returns for NIFTY futures, updating every tick. Compare the computational cost of batch (recompute from scratch) vs. incremental (Welford's algorithm) approaches if the update rate is 1,000 ticks/second."
        solution={[
          {
            step: 'Batch computation cost',
            formula: 'C_{\\text{batch}} = O(500) \\times 1000 = 500{,}000 \\text{ ops/sec}',
            explanation: 'Each update requires iterating over the full 500-tick window.',
          },
          {
            step: 'Incremental computation cost',
            formula: 'C_{\\text{incr}} = O(1) \\times 1000 = 1{,}000 \\text{ ops/sec}',
            explanation: 'Welford algorithm updates running sum and sum-of-squares with 1 add and 1 subtract.',
          },
          {
            step: 'Speedup factor',
            formula: '\\text{Speedup} = \\frac{500{,}000}{1{,}000} = 500\\times',
          },
          {
            step: 'Latency comparison',
            formula: 't_{\\text{batch}} \\approx 5\\text{--}10\\mu s, \\quad t_{\\text{incr}} \\approx 0.01\\text{--}0.02\\mu s',
            explanation: 'The incremental approach is ~500x faster, critical when computing dozens of features simultaneously within a microsecond budget on NSE co-location.',
          },
        ]}
      />

      <NoteBlock title="Implementation Best Practices" type="tip">
        <p>
          For production HFT feature engines on NSE: use fixed-size ring buffers
          (not dynamic arrays), pre-allocate all memory at startup, avoid heap
          allocation in the hot path, use integer arithmetic where possible (prices
          in paise), and consider SIMD vectorization for batch operations. In Python,
          use NumPy or Cython for the core computation loop. For sub-microsecond
          requirements, implement in C++ or Rust with the Python layer only for
          strategy logic and configuration.
        </p>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          High-frequency feature engineering requires incremental (O(1)) computation,
          geometrically-spaced time horizons matching the power-law information decay,
          and careful latency budgeting. The feature engine is often the performance
          bottleneck in HFT systems -- its design directly determines the strategy's
          achievable prediction horizon and trading frequency on NSE.
        </p>
      </NoteBlock>
    </div>
  )
}
