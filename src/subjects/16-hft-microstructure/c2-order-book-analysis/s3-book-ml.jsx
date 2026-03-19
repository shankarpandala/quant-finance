import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveMLFeatures() {
  const [numLevels, setNumLevels] = useState(10)
  const [lookbackTicks, setLookbackTicks] = useState(50)
  const [predHorizon, setPredHorizon] = useState(100)

  const staticFeatures = numLevels * 4
  const dynamicFeatures = numLevels * 2 * lookbackTicks
  const crossFeatures = numLevels * 3
  const totalFeatures = staticFeatures + crossFeatures + 15

  const models = [
    { name: 'Linear', auc: 0.55 + numLevels * 0.002, latency: 0.01 },
    { name: 'XGBoost', auc: 0.59 + numLevels * 0.003 - predHorizon * 0.0001, latency: 0.1 },
    { name: 'LSTM', auc: 0.61 + numLevels * 0.003 - predHorizon * 0.00015, latency: 2.0 },
    { name: 'DeepLOB', auc: 0.63 + numLevels * 0.002 - predHorizon * 0.0001, latency: 5.0 },
  ]

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: ML Model Comparison for LOB Prediction
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Configure feature engineering parameters to compare ML model performance
        on NSE order book data.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>LOB Levels: {numLevels}</span>
          <input type="range" min="5" max="20" step="1" value={numLevels}
            onChange={e => setNumLevels(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Lookback: {lookbackTicks} ticks</span>
          <input type="range" min="10" max="200" step="10" value={lookbackTicks}
            onChange={e => setLookbackTicks(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Prediction Horizon: {predHorizon}ms</span>
          <input type="range" min="10" max="1000" step="10" value={predHorizon}
            onChange={e => setPredHorizon(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Model</th>
              <th className="px-3 py-2 text-right text-gray-600 dark:text-gray-400">AUC</th>
              <th className="px-3 py-2 text-right text-gray-600 dark:text-gray-400">Latency (ms)</th>
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Feasibility</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            {models.map((m, i) => {
              const feasible = m.latency < predHorizon / 10
              return (
                <tr key={i} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-3 py-2 font-semibold">{m.name}</td>
                  <td className="px-3 py-2 text-right font-mono">{Math.min(0.99, m.auc).toFixed(3)}</td>
                  <td className="px-3 py-2 text-right font-mono">{m.latency.toFixed(2)}</td>
                  <td className={`px-3 py-2 font-semibold ${feasible ? 'text-green-600' : 'text-red-500'}`}>
                    {feasible ? 'Feasible' : 'Too slow'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
        Total features: {totalFeatures} | Feature dim with history: {dynamicFeatures + totalFeatures}
      </p>
    </div>
  )
}

export default function BookML() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Machine Learning on Order Book Data
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Machine learning models applied to limit order book data can capture complex,
        nonlinear patterns in the joint dynamics of prices and quantities across
        multiple levels. These models are the backbone of modern high-frequency
        trading strategies on NSE, predicting short-term price movements with
        horizons from milliseconds to seconds.
      </p>

      <DefinitionBlock
        title="LOB Feature Engineering"
        label="Definition 3.1"
        definition="LOB feature engineering is the process of transforming raw order book snapshots (prices and quantities at multiple levels) into informative input features for ML models. Features fall into three categories: static snapshot features (current book state), dynamic features (changes over time windows), and cross-level features (relationships between different price levels)."
        notation={<>For a <InlineMath math="k" />-level LOB snapshot, the raw feature vector is <InlineMath math="\mathbf{x}_t = [p_1^b, q_1^b, \ldots, p_k^b, q_k^b, p_1^a, q_1^a, \ldots, p_k^a, q_k^a] \in \mathbb{R}^{4k}" />.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Feature Categories
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Effective LOB features for ML models on NSE data include:
      </p>

      <BlockMath math="\text{Static: } \text{OBI}_i, \text{spread}_i, \text{depth}_i \quad \text{for } i = 1, \ldots, k" />
      <BlockMath math="\text{Dynamic: } \Delta q_i^b(t, t-\tau), \Delta q_i^a(t, t-\tau) \quad \text{for various } \tau" />
      <BlockMath math="\text{Cross: } \frac{q_i^b}{q_j^a}, \; \text{slope}_b = \frac{q_k^b - q_1^b}{p_1^b - p_k^b}" />

      <TheoremBlock
        title="DeepLOB Architecture for Indian Markets"
        label="Result 3.1"
        statement={<>The DeepLOB architecture (Zhang et al., 2019) adapted for NSE stocks achieves state-of-the-art performance using a combination of convolutional layers (for spatial features across book levels) and LSTM layers (for temporal patterns). For NIFTY 50 stocks with 10-level LOB data at 100ms resolution, DeepLOB achieves: <BlockMath math="\text{F1-score} \approx 0.62\text{--}0.68 \text{ (3-class: up/down/flat)}" /> with prediction horizon <InlineMath math="\tau = 500" />ms, outperforming XGBoost by 3--5 percentage points.</>}
        proof={<>The architecture processes the LOB as a <InlineMath math="T \times 4k" /> image where <InlineMath math="T" /> is the lookback window. Convolutional filters of size <InlineMath math="(1, 2)" /> capture price-quantity relationships at each level, while filters of size <InlineMath math="(k, 1)" /> capture cross-level patterns. The LSTM layer then models the temporal evolution. Evaluated on 6 months of NSE tick data with 70/15/15 train/val/test split.</>}
      />

      <InteractiveMLFeatures />

      <PythonCode
        title="lob_ml_features.py"
        runnable
        code={`import numpy as np

class LOBFeatureEngine:
    """Feature engineering for ML models on NSE LOB data."""

    def __init__(self, n_levels=10):
        self.n_levels = n_levels

    def static_features(self, bid_prices, bid_qtys, ask_prices, ask_qtys):
        """Compute static snapshot features."""
        features = {}

        # Basic metrics
        mid = (bid_prices[0] + ask_prices[0]) / 2
        features['midprice'] = mid
        features['spread'] = ask_prices[0] - bid_prices[0]
        features['spread_bps'] = features['spread'] / mid * 10000

        # Microprice
        bq, aq = bid_qtys[0], ask_qtys[0]
        features['microprice'] = (aq * bid_prices[0] + bq * ask_prices[0]) / (bq + aq)

        # Multi-level imbalance
        for k in [1, 3, 5, self.n_levels]:
            k = min(k, len(bid_qtys))
            total_b = sum(bid_qtys[:k])
            total_a = sum(ask_qtys[:k])
            features[f'obi_{k}'] = (total_b - total_a) / (total_b + total_a)

        # Depth statistics
        features['total_bid_depth'] = sum(bid_qtys)
        features['total_ask_depth'] = sum(ask_qtys)
        features['depth_ratio'] = sum(bid_qtys) / max(1, sum(ask_qtys))

        # Book slope (price sensitivity of depth)
        if len(bid_prices) > 1 and bid_prices[0] != bid_prices[-1]:
            features['bid_slope'] = (bid_qtys[-1] - bid_qtys[0]) / (bid_prices[0] - bid_prices[-1])
        else:
            features['bid_slope'] = 0

        # Weighted price levels
        total_qty = sum(bid_qtys) + sum(ask_qtys)
        if total_qty > 0:
            features['vwap_bid'] = sum(p * q for p, q in zip(bid_prices, bid_qtys)) / max(1, sum(bid_qtys))
            features['vwap_ask'] = sum(p * q for p, q in zip(ask_prices, ask_qtys)) / max(1, sum(ask_qtys))

        return features

    def temporal_features(self, feature_history, lookbacks=[5, 10, 50]):
        """Compute features from historical snapshots."""
        if len(feature_history) < max(lookbacks):
            return {}

        features = {}
        current = feature_history[-1]

        for lb in lookbacks:
            past = feature_history[-lb]
            features[f'mid_return_{lb}'] = (current['midprice'] - past['midprice']) / past['midprice']
            features[f'spread_change_{lb}'] = current['spread'] - past['spread']
            features[f'obi_change_{lb}'] = current['obi_1'] - past['obi_1']

        # Rolling statistics
        obi_series = [f['obi_1'] for f in feature_history[-50:]]
        features['obi_mean_50'] = np.mean(obi_series)
        features['obi_std_50'] = np.std(obi_series)

        return features

    def create_label(self, midprices, current_idx, horizon, threshold_bps=2):
        """Create 3-class label: up/down/flat."""
        if current_idx + horizon >= len(midprices):
            return None
        future_mid = midprices[current_idx + horizon]
        current_mid = midprices[current_idx]
        ret_bps = (future_mid - current_mid) / current_mid * 10000
        if ret_bps > threshold_bps:
            return 1   # UP
        elif ret_bps < -threshold_bps:
            return -1  # DOWN
        return 0       # FLAT

# Simulate NSE LOB data for ICICI Bank
np.random.seed(42)
n_snapshots = 200
n_levels = 10
base_price = 1050.0

engine = LOBFeatureEngine(n_levels=n_levels)

# Generate realistic LOB snapshots
feature_history = []
midprices = []

for t in range(n_snapshots):
    drift = np.cumsum(np.random.normal(0, 0.02, 1))[0]
    mid = base_price + drift * t * 0.1

    bid_prices = [mid - 0.05 * (i + 1) for i in range(n_levels)]
    ask_prices = [mid + 0.05 * (i + 1) for i in range(n_levels)]
    bid_qtys = np.random.poisson(200, n_levels) + 30
    ask_qtys = np.random.poisson(180, n_levels) + 30

    features = engine.static_features(bid_prices, bid_qtys, ask_prices, ask_qtys)
    feature_history.append(features)
    midprices.append(mid)

# Show features for the latest snapshot
print("=" * 55)
print("LOB ML FEATURES: ICICI Bank (NSE)")
print("=" * 55)
latest = feature_history[-1]
print("\\nStatic Features:")
for k, v in latest.items():
    print(f"  {k:25s}: {v:>10.4f}")

# Temporal features
if len(feature_history) >= 50:
    temp = engine.temporal_features(feature_history)
    print("\\nTemporal Features:")
    for k, v in temp.items():
        print(f"  {k:25s}: {v:>10.6f}")

# Label distribution
labels = []
for i in range(len(midprices) - 10):
    lbl = engine.create_label(midprices, i, horizon=10, threshold_bps=2)
    if lbl is not None:
        labels.append(lbl)

print(f"\\nLabel Distribution (horizon=10 ticks):")
for cls, name in [(1, 'UP'), (0, 'FLAT'), (-1, 'DOWN')]:
    count = labels.count(cls)
    print(f"  {name:5s}: {count:4d} ({count/len(labels):.1%})")`}
      />

      <ExampleBlock
        title="Feature Importance for LOB Prediction"
        difficulty="intermediate"
        problem="An XGBoost model trained on 10-level LOB features for TCS on NSE reports the following top-5 feature importances: OBI_1 (0.18), spread_change_10 (0.12), obi_change_5 (0.10), microprice_deviation (0.09), depth_ratio (0.08). The model has AUC = 0.61. Interpret these results and suggest improvements."
        solution={[
          {
            step: 'Interpret top features',
            formula: '\\text{OBI}_1 \\text{ (18\\%)} \\gg \\text{others}',
            explanation: 'Level-1 imbalance is the dominant feature, consistent with microstructure theory. Dynamic features (spread_change, obi_change) rank 2nd and 3rd, suggesting temporal patterns add value.',
          },
          {
            step: 'Model quality assessment',
            formula: '\\text{AUC} = 0.61 > 0.5 \\text{ (random)}',
            explanation: 'AUC of 0.61 is reasonable for tick-level prediction. After transaction costs (~2-3 bps on NSE), this may be marginally profitable.',
          },
          {
            step: 'Suggested improvements',
            formula: '\\text{Add: cross-asset features, trade flow, temporal depth via LSTM}',
            explanation: 'Include NIFTY futures imbalance (cross-asset signal), trade flow imbalance (TFI), and switch to DeepLOB architecture to capture temporal patterns that XGBoost misses. Expected AUC improvement: +3-5 percentage points.',
          },
        ]}
      />

      <NoteBlock title="Latency-Accuracy Trade-off" type="warning">
        <p>
          On NSE's co-location infrastructure, inference latency is critical. Linear
          models run in microseconds but have lower accuracy. Deep learning models
          (LSTM, DeepLOB) achieve higher AUC but with millisecond-scale latency that
          may be too slow for sub-millisecond HFT strategies. XGBoost offers a
          practical middle ground for most Indian HFT firms. Always benchmark
          end-to-end latency (feature computation + inference + order submission)
          against the prediction horizon.
        </p>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          ML on LOB data represents the frontier of quantitative trading on NSE.
          Success requires careful feature engineering across static, dynamic, and
          cross-level dimensions, appropriate model selection balancing accuracy
          and latency, and rigorous backtesting that accounts for market impact
          and transaction costs. The DeepLOB architecture provides state-of-the-art
          performance but simpler models may be more practical for latency-sensitive
          strategies.
        </p>
      </NoteBlock>
    </div>
  )
}
