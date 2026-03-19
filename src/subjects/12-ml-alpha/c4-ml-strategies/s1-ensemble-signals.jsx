import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveEnsemble() {
  const [wMomentum, setWMomentum] = useState(0.3)
  const [wML, setWML] = useState(0.4)
  const [wFundamental, setWFundamental] = useState(0.3)

  const signals = [
    { name: 'Momentum', signal: 0.65, weight: wMomentum },
    { name: 'ML (GBM)', signal: 0.72, weight: wML },
    { name: 'Fundamental', signal: 0.45, weight: wFundamental },
  ]

  const totalW = wMomentum + wML + wFundamental
  const normalizedSignals = signals.map(s => ({
    ...s, normalizedWeight: s.weight / totalW
  }))
  const ensembleSignal = normalizedSignals.reduce((sum, s) => sum + s.signal * s.normalizedWeight, 0)
  const position = ensembleSignal > 0.6 ? 'LONG' : ensembleSignal < 0.4 ? 'SHORT' : 'NEUTRAL'

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Signal Ensemble for Nifty Trading
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust weights to combine multiple alpha signals for a Nifty 50 stock.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[[wMomentum, setWMomentum, 'Momentum Weight'], [wML, setWML, 'ML Weight'],
          [wFundamental, setWFundamental, 'Fundamental Weight']].map(([val, setter, label]) => (
          <label key={label} className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
            <span>{label} = {(val / totalW * 100).toFixed(0)}%</span>
            <input type="range" min="0" max="1" step="0.05" value={val}
              onChange={e => setter(parseFloat(e.target.value))}
              className="h-2 w-full cursor-pointer accent-indigo-500" />
          </label>
        ))}
      </div>

      <svg viewBox="0 0 400 100" className="w-full max-w-md mx-auto block">
        {normalizedSignals.map((s, i) => (
          <g key={s.name}>
            <text x="85" y={22 + i * 28} textAnchor="end" className="text-[9px]" fill="#6b7280">{s.name}</text>
            <rect x="90" y={12 + i * 28} width={s.signal * 200} height="16" rx="2" fill="#818cf8" opacity="0.6" />
            <rect x={90 + s.signal * 200 - 2} y={12 + i * 28} width="4" height="16" fill="#4338ca" />
            <text x={95 + s.signal * 200} y={24 + i * 28} className="text-[8px]" fill="#4338ca">
              {(s.signal * 100).toFixed(0)}% (w={s.normalizedWeight.toFixed(2)})
            </text>
          </g>
        ))}
        <line x1="90" y1="90" x2={90 + ensembleSignal * 200} y2="90" stroke="#16a34a" strokeWidth="3" />
        <circle cx={90 + ensembleSignal * 200} cy="90" r="4" fill="#16a34a" />
        <text x={95 + ensembleSignal * 200} y="93" className="text-[9px] font-bold" fill="#16a34a">
          Ensemble: {(ensembleSignal * 100).toFixed(1)}%
        </text>
      </svg>

      <p className={`mt-2 text-center text-sm font-bold ${position === 'LONG' ? 'text-green-600' : position === 'SHORT' ? 'text-red-500' : 'text-amber-600'}`}>
        Position: {position}
      </p>
    </div>
  )
}

export default function EnsembleSignals() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Ensemble Signal Combination
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Combining multiple alpha signals into an ensemble improves prediction robustness
        and reduces strategy drawdowns. For Indian equity trading on NSE/BSE, ensembling
        momentum, ML-based, and fundamental signals creates diversified alpha sources
        that are less prone to crowding and regime-dependent failures.
      </p>

      <DefinitionBlock
        title="Signal Ensemble"
        label="Definition 12.10"
        definition="A signal ensemble combines K individual alpha signals into a composite signal using a weighting scheme. The ensemble signal for stock i at time t is a weighted average of individual signals, where weights can be static (equal, risk-parity) or dynamic (performance-based, Bayesian updating)."
        notation="S_t^{ens} = \sum_{k=1}^{K} w_{k,t} \cdot s_{k,t}, \quad \sum_k w_{k,t} = 1"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Optimal Signal Combination
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The optimal weights maximize the ensemble Information Coefficient (IC):
      </p>

      <BlockMath math="w^* = \arg\max_w \frac{w^T \mu}{\sqrt{w^T \Sigma w}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\mu" /> is the vector of individual signal ICs and{' '}
        <InlineMath math="\Sigma" /> is the covariance matrix of signal errors. The
        solution is the tangency portfolio analog:
      </p>

      <BlockMath math="w^* = \frac{\Sigma^{-1} \mu}{\mathbf{1}^T \Sigma^{-1} \mu}" />

      <TheoremBlock
        title="Diversification of Alpha Sources"
        label="Theorem 12.10"
        statement="The ensemble IC exceeds any individual signal's IC when signals have positive but imperfect correlation: IC_{ens} \geq \max_k IC_k. With K independent signals of equal IC, the ensemble IC is IC_{ens} = IC \cdot \sqrt{K} (the square root of breadth rule)."
        proof="For K independent, equal-IC signals with equal weights: IC_{ens} = \frac{\sum_k IC}{\sqrt{\sum_k 1}} = \frac{K \cdot IC}{\sqrt{K}} = IC \cdot \sqrt{K}. This follows from the correlation between the ensemble signal and returns, using the independence to simplify the denominator."
      />

      <NoteBlock title="Ensemble Strategies for Indian Markets" type="tip">
        <ul className="space-y-1 text-sm">
          <li><strong>Signal 1 - Momentum:</strong> Cross-sectional momentum on Nifty 500 (12-1 month returns)</li>
          <li><strong>Signal 2 - ML (GBM):</strong> Tree ensemble trained on technical + flow features</li>
          <li><strong>Signal 3 - Fundamental:</strong> Composite quality + value score from financials</li>
          <li><strong>Signal 4 - Sentiment:</strong> FII/DII flows + PCR + India VIX regime</li>
          <li><strong>Dynamic Weighting:</strong> Increase ML weight in trending markets, fundamental weight in mean-reverting</li>
        </ul>
      </NoteBlock>

      <InteractiveEnsemble />

      <PythonCode
        title="ensemble_signals.py"
        runnable
        code={`import numpy as np

class SignalEnsemble:
    """Ensemble signal combination for NSE equity trading."""

    def __init__(self, signal_names):
        self.signal_names = signal_names
        self.K = len(signal_names)

    def equal_weight(self, signals):
        return np.mean(signals, axis=0)

    def ic_weighted(self, signals, ics):
        """Weight by Information Coefficient."""
        ics = np.array(ics)
        weights = np.maximum(ics, 0)
        if weights.sum() > 0:
            weights /= weights.sum()
        else:
            weights = np.ones(self.K) / self.K
        return signals.T @ weights

    def optimal_weights(self, signal_ics, signal_corr):
        """Compute optimal weights (tangency portfolio analog)."""
        mu = np.array(signal_ics)
        sigma = np.diag(np.ones(self.K)) * 0.3  # Signal volatility
        for i in range(self.K):
            for j in range(self.K):
                if i != j:
                    sigma[i, j] = signal_corr[i][j] * 0.3 * 0.3

        try:
            sigma_inv = np.linalg.inv(sigma)
            w = sigma_inv @ mu
            w = np.maximum(w, 0)
            if w.sum() > 0:
                w /= w.sum()
            else:
                w = np.ones(self.K) / self.K
        except np.linalg.LinAlgError:
            w = np.ones(self.K) / self.K
        return w

    def exponential_decay_weights(self, past_ics, halflife=63):
        """Dynamic weighting based on recent IC performance."""
        T = len(past_ics)
        decay = np.exp(-np.log(2) / halflife * np.arange(T-1, -1, -1))
        weighted_ics = np.average(past_ics, axis=0, weights=decay)
        w = np.maximum(weighted_ics, 0)
        return w / w.sum() if w.sum() > 0 else np.ones(self.K) / self.K

# Example: 4-signal ensemble for Nifty stocks
np.random.seed(42)
signals = ['Momentum', 'ML_GBM', 'Fundamental', 'Sentiment']
ensemble = SignalEnsemble(signals)

# Simulate signals for 50 Nifty stocks
n_stocks = 50
n_days = 252

# Signal matrices (n_signals x n_stocks) for each day
signal_ics = [0.05, 0.08, 0.04, 0.03]  # Historical ICs
signal_corr = [
    [1.0,  0.3,  0.1,  0.2],
    [0.3,  1.0,  0.2,  0.15],
    [0.1,  0.2,  1.0,  0.05],
    [0.2,  0.15, 0.05, 1.0],
]

# Compute optimal weights
opt_w = ensemble.optimal_weights(signal_ics, signal_corr)

# Simulate daily returns and signals
daily_signals = np.random.randn(n_days, 4, n_stocks) * 0.1
actual_returns = np.random.randn(n_days, n_stocks) * 0.02

# Backtest different weighting schemes
schemes = {
    'Equal': np.ones(4) / 4,
    'IC-Weighted': np.array(signal_ics) / sum(signal_ics),
    'Optimal': opt_w,
}

print("=" * 60)
print("  Signal Ensemble - Nifty 50 Trading Strategy")
print("=" * 60)
print(f"\\nSignals: {', '.join(signals)}")
print(f"Individual ICs: {signal_ics}")
print(f"\\nOptimal Weights:")
for name, w in zip(signals, opt_w):
    print(f"  {name:<15} {w:.1%}")

# Simulate performance
print(f"\\n{'Scheme':<15} {'Weights':>30} {'Ens IC':>8} {'Sharpe':>8}")
print("-" * 65)
for scheme_name, weights in schemes.items():
    # Ensemble signal = weighted combination
    ens_signals = np.zeros((n_days, n_stocks))
    for k in range(4):
        ens_signals += weights[k] * daily_signals[:, k, :]

    # Compute IC (correlation with returns)
    daily_ics = [np.corrcoef(ens_signals[t], actual_returns[t])[0, 1]
                 for t in range(n_days)]
    avg_ic = np.nanmean(daily_ics)

    # Strategy returns (long top quintile, short bottom)
    strat_rets = []
    for t in range(n_days):
        ranks = np.argsort(-ens_signals[t])
        long_ret = np.mean(actual_returns[t, ranks[:10]])
        short_ret = np.mean(actual_returns[t, ranks[-10:]])
        strat_rets.append(long_ret - short_ret)

    sharpe = np.mean(strat_rets) / np.std(strat_rets) * np.sqrt(252)
    w_str = ', '.join([f"{w:.0%}" for w in weights])
    print(f"{scheme_name:<15} [{w_str:>26}] {avg_ic:>+7.4f} {sharpe:>8.2f}")`}
      />

      <ExampleBlock
        title="Combining Momentum and ML Signals"
        difficulty="intermediate"
        problem="A momentum signal has IC=0.05 and an ML signal has IC=0.08. Their correlation is 0.3. What is the optimal weight allocation and expected ensemble IC?"
        solution={[
          {
            step: 'Set up the optimization',
            formula: 'w^* = \\arg\\max \\frac{w_1 \\cdot 0.05 + w_2 \\cdot 0.08}{\\sqrt{w_1^2 + w_2^2 + 2 \\cdot 0.3 \\cdot w_1 w_2}}',
            explanation: 'Maximize the signal-to-noise ratio of the ensemble.',
          },
          {
            step: 'Compute optimal weights',
            formula: 'w_{mom} \\approx 0.35,\\quad w_{ML} \\approx 0.65',
            explanation: 'The ML signal receives higher weight due to its higher IC.',
          },
          {
            step: 'Compute ensemble IC',
            formula: 'IC_{ens} = \\frac{0.35 \\times 0.05 + 0.65 \\times 0.08}{\\sqrt{0.35^2 + 0.65^2 + 2 \\times 0.3 \\times 0.35 \\times 0.65}} \\approx 0.088',
            explanation: 'The ensemble IC (0.088) exceeds the best individual IC (0.08) due to diversification. The low correlation (0.3) between signals creates ensemble benefit.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Signal ensembling is a powerful technique for building robust Indian equity
          strategies. The key insight is that combining weakly correlated alpha signals
          improves the overall IC beyond any individual signal. Use IC-weighted or
          optimal weights based on signal IC and correlation structure. Dynamic
          weighting that adapts to recent signal performance further enhances robustness
          across different Nifty market regimes.
        </p>
      </NoteBlock>
    </div>
  )
}
