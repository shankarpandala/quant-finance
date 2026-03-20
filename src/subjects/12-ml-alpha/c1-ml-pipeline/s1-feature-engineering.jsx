import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveFeatureEngineering() {
  const [lookback, setLookback] = useState(20)
  const [maType, setMaType] = useState('ema')
  const [zThreshold, setZThreshold] = useState(2.0)

  const prices = [100, 102, 99, 101, 103, 105, 104, 106, 108, 107, 109, 111, 110, 112, 114, 113, 115, 117, 116, 118, 120, 119, 121, 123, 122]
  const slice = prices.slice(0, Math.min(lookback + 5, prices.length))
  const returns = slice.slice(1).map((p, i) => (p - slice[i]) / slice[i] * 100)
  const mean = returns.reduce((s, r) => s + r, 0) / returns.length
  const std = Math.sqrt(returns.reduce((s, r) => s + (r - mean) ** 2, 0) / returns.length)
  const zScore = std > 0 ? (returns[returns.length - 1] - mean) / std : 0

  const ma = slice.slice(-lookback).reduce((s, p) => s + p, 0) / Math.min(lookback, slice.length)
  const lastPrice = slice[slice.length - 1]
  const maDistance = ((lastPrice - ma) / ma * 100)

  const features = [
    { name: 'Returns Mean', value: mean.toFixed(3) + '%' },
    { name: 'Returns Std', value: std.toFixed(3) + '%' },
    { name: `MA(${lookback})`, value: ma.toFixed(2) },
    { name: 'MA Distance', value: maDistance.toFixed(2) + '%' },
    { name: 'Z-Score', value: zScore.toFixed(3) },
    { name: 'Signal', value: Math.abs(zScore) > zThreshold ? 'ACTIVE' : 'NEUTRAL' },
  ]

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Feature Engineering from Price Data
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Explore how lookback windows and thresholds affect feature construction for Nifty 50 data.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Lookback Window = {lookback} days</span>
          <input type="range" min="5" max="25" step="1" value={lookback}
            onChange={e => setLookback(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Z-Score Threshold = {zThreshold.toFixed(1)}</span>
          <input type="range" min="1" max="3" step="0.1" value={zThreshold}
            onChange={e => setZThreshold(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>MA Type: {maType.toUpperCase()}</span>
          <select value={maType} onChange={e => setMaType(e.target.value)}
            className="rounded border border-gray-300 px-2 py-1 text-xs dark:border-gray-600 dark:bg-gray-800">
            <option value="sma">SMA</option>
            <option value="ema">EMA</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {features.map(f => (
          <div key={f.name} className="rounded-lg bg-gray-50 p-2 text-center dark:bg-gray-800">
            <span className="text-[10px] text-gray-500 dark:text-gray-400">{f.name}</span>
            <p className={`text-sm font-bold ${f.value === 'ACTIVE' ? 'text-red-500' : 'text-indigo-600 dark:text-indigo-400'}`}>
              {f.value}
            </p>
          </div>
        ))}
      </div>

      <svg viewBox="0 0 400 120" className="w-full max-w-lg mx-auto block mt-4">
        {slice.map((p, i) => {
          const x = 20 + i * (360 / slice.length)
          const y = 110 - (p - 95) * 3.5
          return (
            <g key={i}>
              {i > 0 && (
                <line x1={20 + (i - 1) * (360 / slice.length)} y1={110 - (slice[i - 1] - 95) * 3.5}
                  x2={x} y2={y} stroke="#6366f1" strokeWidth="1.5" />
              )}
              <circle cx={x} cy={y} r="2" fill="#6366f1" />
            </g>
          )
        })}
        <line x1="20" y1={110 - (ma - 95) * 3.5} x2="380" y2={110 - (ma - 95) * 3.5}
          stroke="#ef4444" strokeWidth="1" strokeDasharray="4" />
        <text x="385" y={113 - (ma - 95) * 3.5} className="text-[8px]" fill="#ef4444">MA</text>
      </svg>
    </div>
  )
}

export default function FeatureEngineering() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Feature Engineering for Financial ML
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Feature engineering is the most critical step in building ML-based trading strategies.
        Raw market data from NSE (OHLCV, order book) must be transformed into informative
        features that capture predictive patterns. This section covers systematic feature
        construction methods designed to avoid lookahead bias and information leakage.
      </p>

      <DefinitionBlock
        title="Feature (Predictor Variable)"
        label="Definition 12.1"
        definition="A feature in financial ML is a numerical representation of market state at time t, computed using only information available up to time t (no future information). Features transform raw data (prices, volumes, fundamentals) into signals that ML models can learn from. The feature matrix X has shape (T, K) where T is the number of observations and K is the number of features."
        notation="x_{t,k} = f_k(P_{1:t}, V_{1:t}, F_{1:t}) \quad \text{(no lookahead)}"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Feature Categories for Indian Equities
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Features for NSE/BSE equities fall into several categories. Price-based features
        capture momentum and mean-reversion:
      </p>

      <BlockMath math="r_{t,d} = \ln\left(\frac{P_t}{P_{t-d}}\right) \quad \text{(log return over } d \text{ days)}" />

      <BlockMath math="\text{RSI}_t = 100 - \frac{100}{1 + \frac{\text{avg gain}_{t,n}}{\text{avg loss}_{t,n}}}" />

      <BlockMath math="z_t = \frac{P_t - \mu_{t,n}}{\sigma_{t,n}} \quad \text{(rolling z-score)}" />

      <TheoremBlock
        title="Feature Information Content"
        label="Theorem 12.1"
        statement="The mutual information between a feature X and the target label Y bounds the achievable prediction accuracy: I(X; Y) \geq H(Y) - H(Y|X). A feature is informative if and only if I(X; Y) > 0, meaning knowing the feature reduces uncertainty about the label."
        proof="By the data processing inequality, any transformation g(X) satisfies I(g(X); Y) \leq I(X; Y). Therefore, feature engineering should preserve or enhance mutual information with the target. The Fano inequality further bounds the error rate: P_e \geq \frac{H(Y|X) - 1}{\log(|Y|)}."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Volume and Microstructure Features
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Volume features from NSE data capture participation and liquidity dynamics:
      </p>

      <BlockMath math="\text{VWAP}_t = \frac{\sum_{i=1}^{N} P_i \cdot V_i}{\sum_{i=1}^{N} V_i}" />

      <BlockMath math="\text{Volume Ratio}_t = \frac{V_t}{\text{MA}(V, 20)_t}" />

      <BlockMath math="\text{Amihud Illiquidity}_t = \frac{|r_t|}{V_t \cdot P_t} \times 10^6" />

      <NoteBlock title="India-Specific Features" type="tip">
        <ul className="space-y-1 text-sm">
          <li><strong>FII/DII Flow:</strong> Daily FII and DII net buy/sell from NSE as a feature</li>
          <li><strong>India VIX:</strong> Implied volatility from Nifty options as a regime indicator</li>
          <li><strong>Rollover Data:</strong> F&O monthly rollover percentage as sentiment proxy</li>
          <li><strong>PCR:</strong> Put-Call Ratio from NSE options data for sentiment</li>
          <li><strong>Delivery %:</strong> Delivery volume percentage from NSE Bhavcopy</li>
          <li><strong>Circuit Limits:</strong> Proximity to SEBI-mandated circuit breaker levels</li>
        </ul>
      </NoteBlock>

      <InteractiveFeatureEngineering />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Feature Stationarity and Transformation
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Raw price data is non-stationary. Features must be transformed to achieve
        stationarity for ML models. The fractional differentiation operator preserves
        memory while achieving stationarity:
      </p>

      <BlockMath math="(1 - B)^d X_t = \sum_{k=0}^{\infty} \binom{d}{k} (-1)^k X_{t-k}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="d \in (0, 1)" /> is the differentiation order and{' '}
        <InlineMath math="B" /> is the backshift operator. Choosing the minimum{' '}
        <InlineMath math="d" /> that achieves stationarity (ADF test) preserves
        maximum predictive information.
      </p>

      <PythonCode
        title="feature_engineering.py"
        runnable
        code={`import numpy as np

class FinancialFeatureEngine:
    """Feature engineering for NSE equity data."""

    def __init__(self, prices, volumes=None):
        self.prices = np.array(prices, dtype=float)
        self.volumes = np.array(volumes, dtype=float) if volumes is not None else None
        self.features = {}

    def log_returns(self, periods=[1, 5, 10, 21]):
        for d in periods:
            if len(self.prices) > d:
                ret = np.log(self.prices[d:] / self.prices[:-d])
                padded = np.full(len(self.prices), np.nan)
                padded[d:] = ret
                self.features[f'ret_{d}d'] = padded
        return self

    def rolling_zscore(self, window=20):
        zscores = np.full(len(self.prices), np.nan)
        for i in range(window, len(self.prices)):
            w = self.prices[i-window:i]
            mu, sigma = np.mean(w), np.std(w)
            if sigma > 0:
                zscores[i] = (self.prices[i] - mu) / sigma
        self.features[f'zscore_{window}'] = zscores
        return self

    def rsi(self, period=14):
        deltas = np.diff(self.prices)
        rsi_vals = np.full(len(self.prices), np.nan)
        for i in range(period, len(deltas)):
            gains = deltas[i-period:i]
            avg_gain = np.mean(np.maximum(gains, 0))
            avg_loss = np.mean(np.abs(np.minimum(gains, 0)))
            if avg_loss > 0:
                rs = avg_gain / avg_loss
                rsi_vals[i+1] = 100 - 100 / (1 + rs)
            else:
                rsi_vals[i+1] = 100
        self.features['rsi_14'] = rsi_vals
        return self

    def volatility(self, windows=[5, 10, 21]):
        rets = np.diff(np.log(self.prices))
        for w in windows:
            vol = np.full(len(self.prices), np.nan)
            for i in range(w, len(rets)):
                vol[i+1] = np.std(rets[i-w:i]) * np.sqrt(252)
            self.features[f'vol_{w}d'] = vol
        return self

    def volume_features(self):
        if self.volumes is None:
            return self
        vol_ratio = np.full(len(self.volumes), np.nan)
        for i in range(20, len(self.volumes)):
            avg_vol = np.mean(self.volumes[i-20:i])
            if avg_vol > 0:
                vol_ratio[i] = self.volumes[i] / avg_vol
        self.features['vol_ratio'] = vol_ratio
        return self

    def get_feature_matrix(self):
        n = len(self.prices)
        names = sorted(self.features.keys())
        X = np.column_stack([self.features[f] for f in names])
        return X, names

# Generate synthetic Nifty 50 daily data
np.random.seed(42)
n_days = 252
returns = np.random.normal(0.0005, 0.015, n_days)
prices = 18000 * np.exp(np.cumsum(returns))
volumes = np.random.lognormal(18, 0.5, n_days)

# Build features
engine = FinancialFeatureEngine(prices, volumes)
engine.log_returns([1, 5, 10, 21])
engine.rolling_zscore(20)
engine.rsi(14)
engine.volatility([5, 10, 21])
engine.volume_features()

X, feature_names = engine.get_feature_matrix()

print("=" * 60)
print("  Feature Engineering - Nifty 50 Data")
print("=" * 60)
print(f"\\nPrice data: {n_days} trading days")
print(f"Features generated: {len(feature_names)}")
print(f"Feature matrix shape: {X.shape}")
print(f"\\nFeature Summary (last available observation):")
print(f"{'Feature':<18} {'Value':>10} {'Non-NaN':>10}")
print("-" * 40)
for i, name in enumerate(feature_names):
    col = X[:, i]
    valid = np.sum(~np.isnan(col))
    last_valid = col[~np.isnan(col)][-1] if valid > 0 else np.nan
    print(f"{name:<18} {last_valid:>10.4f} {valid:>10}")

print(f"\\nCorrelation between ret_1d and ret_5d: "
      f"{np.corrcoef(X[50:, feature_names.index('ret_1d')], X[50:, feature_names.index('ret_5d')])[0,1]:.3f}")`}
      />

      <ExampleBlock
        title="Computing RSI for a Nifty 50 Stock"
        difficulty="beginner"
        problem="Over the last 14 days, a Nifty 50 stock had 9 up days with average gain of 1.2% and 5 down days with average loss of 0.8%. Compute the RSI."
        solution={[
          {
            step: 'Compute Relative Strength',
            formula: 'RS = \\frac{\\text{Avg Gain}}{\\text{Avg Loss}} = \\frac{1.2}{0.8} = 1.5',
            explanation: 'RS measures the ratio of average upward to downward price movements.',
          },
          {
            step: 'Compute RSI',
            formula: 'RSI = 100 - \\frac{100}{1 + 1.5} = 100 - 40 = 60',
            explanation: 'RSI of 60 indicates mildly bullish momentum. Values above 70 are overbought, below 30 oversold.',
          },
          {
            step: 'Feature interpretation',
            formula: 'x_{RSI} = 60 \\in [30, 70] \\Rightarrow \\text{Neutral zone}',
            explanation: 'This would be encoded as a neutral signal in the feature matrix. For ML models, RSI is typically normalized to [0, 1] by dividing by 100.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Feature engineering is the primary driver of ML model performance in quantitative
          trading. For Indian equities, combine price-based features (returns, momentum,
          volatility) with India-specific features (FII flows, India VIX, delivery percentage).
          Always ensure features are point-in-time (no lookahead bias) and stationary.
          The fractional differentiation approach provides a principled way to balance
          stationarity with information preservation.
        </p>
      </NoteBlock>
    </div>
  )
}
