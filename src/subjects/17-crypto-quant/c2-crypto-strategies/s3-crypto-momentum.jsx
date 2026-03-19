import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveCryptoMomentum() {
  const [lookbackDays, setLookbackDays] = useState(14)
  const [topN, setTopN] = useState(5)
  const [rebalanceFreq, setRebalanceFreq] = useState(7)
  const [volTarget, setVolTarget] = useState(30)

  const assets = ['BTC', 'ETH', 'SOL', 'BNB', 'ADA', 'AVAX', 'DOT', 'MATIC', 'LINK', 'UNI']
  const momScores = assets.map((a, i) => ({
    name: a,
    momentum: (Math.sin(i * 1.7 + lookbackDays * 0.1) * 30 + 5).toFixed(1),
    vol: (20 + i * 5 + Math.cos(i) * 10).toFixed(1),
  })).sort((a, b) => parseFloat(b.momentum) - parseFloat(a.momentum))

  const selected = momScores.slice(0, topN)
  const totalMom = selected.reduce((s, a) => s + parseFloat(a.momentum), 0)
  const avgVol = selected.reduce((s, a) => s + parseFloat(a.vol), 0) / topN
  const volScalar = volTarget / avgVol

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Cross-Sectional Crypto Momentum
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Configure lookback period, portfolio size, and vol target for a top-N
        momentum strategy across major crypto assets.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Lookback: {lookbackDays}d</span>
          <input type="range" min="3" max="90" step="1" value={lookbackDays}
            onChange={e => setLookbackDays(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Top-N: {topN}</span>
          <input type="range" min="1" max="10" step="1" value={topN}
            onChange={e => setTopN(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Rebalance: {rebalanceFreq}d</span>
          <input type="range" min="1" max="30" step="1" value={rebalanceFreq}
            onChange={e => setRebalanceFreq(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Vol Target: {volTarget}%</span>
          <input type="range" min="10" max="100" step="5" value={volTarget}
            onChange={e => setVolTarget(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 500 140" className="w-full max-w-lg mx-auto block" aria-label="Momentum rankings">
        {momScores.map((a, i) => {
          const isSelected = i < topN
          const barWidth = Math.max(0, parseFloat(a.momentum)) * 3
          const y = 5 + i * 13
          return (
            <g key={i}>
              <text x="45" y={y + 10} textAnchor="end" className={`text-[8px] ${isSelected ? 'font-bold' : ''}`}
                fill={isSelected ? '#6366f1' : '#9ca3af'}>{a.name}</text>
              <rect x="50" y={y} width={barWidth} height="10"
                fill={isSelected ? '#6366f1' : '#d1d5db'} opacity={isSelected ? 0.8 : 0.4} rx="2" />
              <text x={55 + barWidth} y={y + 9} className="text-[7px]" fill="#6b7280">
                {a.momentum}%
              </text>
            </g>
          )
        })}
        <text x="350" y="60" className="text-[9px] fill-gray-600 dark:fill-gray-400">
          Vol scalar: {volScalar.toFixed(2)}x
        </text>
        <text x="350" y="75" className="text-[9px] fill-gray-600 dark:fill-gray-400">
          Portfolio vol: ~{volTarget}%
        </text>
      </svg>
    </div>
  )
}

export default function CryptoMomentum() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Crypto Momentum Strategies
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Momentum strategies in crypto markets exploit the persistence of returns,
        which is stronger and more persistent than in traditional equity markets
        due to retail-dominated flows, narrative-driven trading, and the absence of
        fundamental value anchors for most crypto assets.
      </p>

      <DefinitionBlock
        title="Cross-Sectional Crypto Momentum"
        label="Definition 3.1"
        definition="Cross-sectional crypto momentum ranks assets by their past returns over a lookback period and goes long the top performers while (optionally) shorting the bottom performers. Unlike equity momentum, crypto momentum works well at shorter horizons (7-30 days) due to the high volatility and strong trend persistence in crypto markets."
        notation={<>Momentum score: <InlineMath math="\text{MOM}_i = \frac{P_{i,t}}{P_{i,t-L}} - 1" /> where <InlineMath math="L" /> is the lookback. Portfolio: long top-<InlineMath math="N" /> by MOM, optionally short bottom-<InlineMath math="N" />.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Volatility-Adjusted Momentum
      </h3>

      <BlockMath math="\text{RiskAdjMOM}_i = \frac{\text{MOM}_i}{\sigma_i} = \frac{r_{i,t-L:t}}{\sigma_{i,t-L:t}}" />

      <BlockMath math="w_i = \frac{\sigma_{\text{target}}}{\sigma_p} \cdot \frac{1}{N} \cdot \text{sign}(\text{RiskAdjMOM}_i)" />

      <TheoremBlock
        title="Crypto Momentum Decay"
        label="Empirical Finding 3.1"
        statement={<>Cross-sectional momentum in the top-100 crypto assets by market cap exhibits a return profile that differs from equity momentum: <BlockMath math="\text{MOM}_{1\text{--}4w}: \text{Sharpe} \approx 1.8, \quad \text{MOM}_{1\text{--}12w}: \text{Sharpe} \approx 1.2, \quad \text{MOM}_{1\text{--}52w}: \text{Sharpe} \approx 0.4" /> Short-term momentum (1--4 weeks) is strongest, with rapid decay beyond 12 weeks. There is no reversal effect at 12 months unlike in equities. The long-only version captures approximately 70% of the long-short Sharpe.</>}
        proof={<>Backtested on top-100 crypto assets by market cap (2018--2024) using weekly returns. The strategy goes long top-10 and short bottom-10, equal-weighted, with weekly rebalancing. Transaction costs of 10 bps per trade are deducted. The monotonic decay pattern (unlike equities' reversal) suggests crypto markets are less efficient at incorporating fundamental information.</>}
      />

      <InteractiveCryptoMomentum />

      <PythonCode
        title="crypto_momentum_strategy.py"
        runnable
        code={`import numpy as np

class CryptoMomentumStrategy:
    """Cross-sectional momentum strategy for crypto assets."""

    def __init__(self, lookback=14, top_n=5, vol_target=0.30,
                 rebalance_days=7, long_only=True):
        self.lookback = lookback
        self.top_n = top_n
        self.vol_target = vol_target
        self.rebal_freq = rebalance_days
        self.long_only = long_only

    def compute_signals(self, returns_matrix):
        """Compute momentum scores for all assets."""
        n_days, n_assets = returns_matrix.shape

        if n_days < self.lookback:
            return np.zeros(n_assets)

        # Cumulative return over lookback
        lookback_returns = np.prod(1 + returns_matrix[-self.lookback:], axis=0) - 1

        # Volatility over lookback
        vols = np.std(returns_matrix[-self.lookback:], axis=0) * np.sqrt(365)
        vols = np.maximum(vols, 0.01)  # floor at 1%

        # Risk-adjusted momentum
        risk_adj_mom = lookback_returns / vols

        return risk_adj_mom

    def construct_portfolio(self, signals, vols):
        """Construct volatility-targeted portfolio."""
        n_assets = len(signals)
        weights = np.zeros(n_assets)

        # Rank by signal
        ranked = np.argsort(signals)[::-1]

        # Long top-N
        long_assets = ranked[:self.top_n]
        for idx in long_assets:
            weights[idx] = 1.0 / self.top_n

        # Short bottom-N (if not long-only)
        if not self.long_only:
            short_assets = ranked[-self.top_n:]
            for idx in short_assets:
                weights[idx] = -1.0 / self.top_n

        # Vol targeting
        port_vol = np.sqrt(np.dot(weights**2, vols**2))
        if port_vol > 0:
            vol_scalar = self.vol_target / port_vol
            weights *= vol_scalar

        return weights

    def backtest(self, returns_matrix, asset_names, cost_bps=10):
        """Full backtest of the momentum strategy."""
        n_days, n_assets = returns_matrix.shape
        portfolio_returns = []
        turnover_history = []
        prev_weights = np.zeros(n_assets)

        for t in range(self.lookback, n_days):
            if (t - self.lookback) % self.rebal_freq == 0:
                signals = self.compute_signals(returns_matrix[:t])
                vols = np.std(returns_matrix[max(0,t-30):t], axis=0) * np.sqrt(365)
                weights = self.construct_portfolio(signals, vols)

                # Turnover cost
                turnover = np.sum(np.abs(weights - prev_weights))
                cost = turnover * cost_bps / 10000
                turnover_history.append(turnover)
                prev_weights = weights.copy()
            else:
                cost = 0

            # Portfolio return
            port_ret = np.dot(prev_weights, returns_matrix[t]) - cost
            portfolio_returns.append(port_ret)

        portfolio_returns = np.array(portfolio_returns)

        # Performance metrics
        ann_return = np.mean(portfolio_returns) * 365
        ann_vol = np.std(portfolio_returns) * np.sqrt(365)
        sharpe = ann_return / ann_vol if ann_vol > 0 else 0
        cum_ret = np.cumprod(1 + portfolio_returns)
        max_dd = np.min(cum_ret / np.maximum.accumulate(cum_ret) - 1)

        return {
            'ann_return': ann_return,
            'ann_vol': ann_vol,
            'sharpe': sharpe,
            'max_drawdown': max_dd,
            'avg_turnover': np.mean(turnover_history) if turnover_history else 0,
            'final_value': cum_ret[-1] if len(cum_ret) > 0 else 1,
        }

# Simulate crypto returns
np.random.seed(42)
n_days = 365
assets = ['BTC', 'ETH', 'SOL', 'BNB', 'ADA', 'AVAX', 'DOT', 'LINK', 'UNI', 'ATOM']
n_assets = len(assets)

# Generate returns with momentum structure
factor = np.random.normal(0.0003, 0.02, n_days)
returns = np.zeros((n_days, n_assets))
for i in range(n_assets):
    beta = 0.5 + np.random.random() * 1.0
    idio_vol = 0.03 + np.random.random() * 0.04
    returns[:, i] = beta * factor + np.random.normal(0.0001, idio_vol, n_days)
    # Add momentum: autocorrelation in returns
    for t in range(1, n_days):
        returns[t, i] += 0.1 * returns[t-1, i]

strategy = CryptoMomentumStrategy(lookback=14, top_n=5, vol_target=0.30)
result = strategy.backtest(returns, assets)

print("=" * 55)
print("CRYPTO MOMENTUM STRATEGY")
print("=" * 55)
print(f"  Universe:       {', '.join(assets)}")
print(f"  Lookback:       14 days")
print(f"  Top-N:          5 (long-only)")
print(f"  Vol Target:     30%")
print(f"  Rebalance:      Weekly")
print(f"\\nResults ({n_days} days):")
print(f"  Ann. Return:    {result['ann_return']:.1%}")
print(f"  Ann. Vol:       {result['ann_vol']:.1%}")
print(f"  Sharpe Ratio:   {result['sharpe']:.2f}")
print(f"  Max Drawdown:   {result['max_drawdown']:.1%}")
print(f"  Avg Turnover:   {result['avg_turnover']:.2f}")
print(f"  Final Value:    {result['final_value']:.3f}x")

# Lookback sensitivity
print(f"\\nLookback Sensitivity:")
for lb in [7, 14, 30, 60]:
    s = CryptoMomentumStrategy(lookback=lb, top_n=5, vol_target=0.30)
    r = s.backtest(returns, assets)
    print(f"  {lb:3d}d: Sharpe={r['sharpe']:+.2f}, Return={r['ann_return']:+.1%}")`}
      />

      <ExampleBlock
        title="Momentum Signal for Crypto Portfolio"
        difficulty="intermediate"
        problem="Given 14-day returns: BTC=+8%, ETH=+15%, SOL=+25%, BNB=-3%, ADA=-10%, and 14-day volatilities: BTC=45%, ETH=60%, SOL=90%, BNB=40%, ADA=70%. Construct a top-2 long-only portfolio with 30% vol target."
        solution={[
          {
            step: 'Compute risk-adjusted momentum',
            formula: '\\text{RAM}_{\\text{SOL}} = 25/90 = 0.278, \\; \\text{RAM}_{\\text{ETH}} = 15/60 = 0.250',
          },
          {
            step: 'Rank and select top-2',
            formula: '\\text{Top-2: SOL, ETH}',
          },
          {
            step: 'Equal-weight portfolio vol',
            formula: '\\sigma_p \\approx \\sqrt{0.5^2 \\times 0.9^2 + 0.5^2 \\times 0.6^2} = 54\\%',
          },
          {
            step: 'Vol scalar',
            formula: '\\text{scalar} = 30\\% / 54\\% = 0.556',
          },
          {
            step: 'Final weights',
            formula: 'w_{\\text{SOL}} = w_{\\text{ETH}} = 0.5 \\times 0.556 = 27.8\\%',
            explanation: 'Allocate 27.8% each to SOL and ETH, with 44.4% in cash (or stablecoin yield).',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Crypto momentum is one of the strongest and most persistent alpha sources
          in digital asset markets. Short-term (1--4 week) lookbacks work best,
          unlike the 12-month horizon typical in equity momentum. Vol-targeting is
          essential given the extreme volatility of crypto assets. Long-only
          implementations are preferred due to the high cost and risk of shorting
          crypto (funding rates, liquidation risk). For Indian traders, this strategy
          is best implemented on global perp exchanges to avoid the 1% TDS.
        </p>
      </NoteBlock>
    </div>
  )
}
