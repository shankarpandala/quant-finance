import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveBetSizing() {
  const [confidence, setConfidence] = useState(0.65)
  const [winLossRatio, setWinLossRatio] = useState(1.5)
  const [maxPosition, setMaxPosition] = useState(10)

  const kellyFraction = confidence - (1 - confidence) / winLossRatio
  const halfKelly = kellyFraction / 2
  const linearSize = (2 * confidence - 1) * maxPosition
  const sigmoidSize = maxPosition / (1 + Math.exp(-10 * (confidence - 0.5)))
  const discreteSize = confidence > 0.6 ? maxPosition : confidence > 0.55 ? maxPosition * 0.5 : 0

  const methods = [
    { name: 'Kelly', size: kellyFraction * maxPosition, color: '#6366f1' },
    { name: 'Half Kelly', size: halfKelly * maxPosition, color: '#818cf8' },
    { name: 'Linear', size: linearSize, color: '#10b981' },
    { name: 'Sigmoid', size: sigmoidSize, color: '#f59e0b' },
    { name: 'Discrete', size: discreteSize, color: '#ef4444' },
  ]

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Bet Sizing Methods
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Compare position sizing methods for a Nifty 50 trading signal.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Confidence (p) = {(confidence * 100).toFixed(0)}%</span>
          <input type="range" min="0.45" max="0.85" step="0.01" value={confidence}
            onChange={e => setConfidence(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Win/Loss Ratio = {winLossRatio.toFixed(1)}</span>
          <input type="range" min="0.5" max="3" step="0.1" value={winLossRatio}
            onChange={e => setWinLossRatio(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Max Position = {maxPosition}%</span>
          <input type="range" min="2" max="20" step="1" value={maxPosition}
            onChange={e => setMaxPosition(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 400 140" className="w-full max-w-md mx-auto block">
        {methods.map((m, i) => {
          const barWidth = Math.max(0, m.size / maxPosition * 200)
          return (
            <g key={m.name}>
              <text x="75" y={22 + i * 25} textAnchor="end" className="text-[9px]" fill="#6b7280">{m.name}</text>
              <rect x="80" y={12 + i * 25} width={barWidth} height="16" rx="2" fill={m.color} opacity="0.7" />
              <text x={85 + barWidth} y={24 + i * 25} className="text-[8px] font-bold" fill={m.color}>
                {m.size.toFixed(1)}%
              </text>
            </g>
          )
        })}
        <text x="200" y="138" textAnchor="middle" className="text-[9px]" fill="#6b7280">
          Kelly f* = {(kellyFraction * 100).toFixed(1)}%
        </text>
      </svg>
    </div>
  )
}

export default function BetSizing() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Bet Sizing for ML Trading Strategies
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Position sizing determines how much capital to allocate to each trade based
        on the model's prediction confidence. Proper bet sizing transforms a marginally
        profitable signal into a robust strategy by concentrating capital on high-confidence
        predictions and reducing exposure on uncertain ones. For Indian equity and F&O
        trading on NSE, bet sizing must also respect SEBI margin requirements and
        lot size constraints.
      </p>

      <DefinitionBlock
        title="Kelly Criterion"
        label="Definition 12.12"
        definition="The Kelly criterion determines the optimal fraction of capital to bet on a favorable wager to maximize the long-run geometric growth rate of wealth. For a binary outcome with probability p of winning b units and probability 1-p of losing 1 unit, the optimal fraction is f* = p - (1-p)/b."
        notation="f^* = p - \frac{1-p}{b} = \frac{pb - (1-p)}{b} = \frac{E[\text{profit}]}{b}"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Kelly Criterion for Trading
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For continuous returns with mean <InlineMath math="\mu" /> and variance{' '}
        <InlineMath math="\sigma^2" />, the Kelly fraction is:
      </p>

      <BlockMath math="f^* = \frac{\mu}{\sigma^2}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        In practice, half-Kelly (<InlineMath math="f^*/2" />) is used to account for
        estimation error in <InlineMath math="\mu" /> and <InlineMath math="\sigma^2" />:
      </p>

      <BlockMath math="f_{half} = \frac{1}{2} \cdot \frac{\mu}{\sigma^2}" />

      <TheoremBlock
        title="Kelly Growth Rate Optimality"
        label="Theorem 12.12"
        statement="The Kelly fraction f* maximizes the expected logarithmic growth rate of wealth: f^* = \arg\max_f E[\log(1 + f \cdot r)]. Any fraction f > f^* has lower expected growth AND higher variance, while f < f^* reduces both growth and variance proportionally."
        proof="The expected log growth is g(f) = E[\log(1+fr)]. Taking the derivative: g'(f) = E[r/(1+fr)]. Setting g'(f^*)=0 and solving gives f^* = \mu/\sigma^2 for normal returns. The second derivative g''(f) < 0 everywhere, confirming f^* is a maximum."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        ML-Based Bet Sizing
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        When using ML model prediction probabilities for bet sizing, the position
        size is a function of model confidence:
      </p>

      <BlockMath math="\text{size}_t = m(2p_t - 1) \quad \text{(linear scaling)}" />

      <BlockMath math="\text{size}_t = m \cdot \frac{2}{1 + e^{-\alpha(p_t - 0.5)}} - m \quad \text{(sigmoid scaling)}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="p_t" /> is the model's predicted probability of profit
        and <InlineMath math="m" /> is the maximum position size. The sigmoid function
        concentrates positions near full size for high-confidence predictions.
      </p>

      <NoteBlock title="Bet Sizing Constraints in India" type="tip">
        <ul className="space-y-1 text-sm">
          <li><strong>SEBI Margins:</strong> F&O margins (SPAN + exposure) typically 15-25% of
            notional, constraining maximum leverage</li>
          <li><strong>Lot Sizes:</strong> Nifty futures lot = 25 units, Bank Nifty = 15 units.
            Positions must be in multiples of lot size</li>
          <li><strong>Peak Margin:</strong> SEBI peak margin norms require intraday margin
            compliance at all times, not just end-of-day</li>
          <li><strong>Zerodha Limits:</strong> Bracket order and cover order position limits
            affect maximum position sizes for retail traders</li>
        </ul>
      </NoteBlock>

      <InteractiveBetSizing />

      <PythonCode
        title="bet_sizing.py"
        runnable
        code={`import numpy as np

class BetSizer:
    """Position sizing for ML-based trading strategies."""

    def __init__(self, max_position=0.10, method='half_kelly'):
        self.max_pos = max_position
        self.method = method

    def kelly_fraction(self, win_prob, win_loss_ratio):
        """Classic Kelly criterion."""
        f = win_prob - (1 - win_prob) / win_loss_ratio
        return max(0, min(f, 1))

    def continuous_kelly(self, expected_return, return_std):
        """Kelly for continuous returns."""
        if return_std <= 0:
            return 0
        f = expected_return / (return_std ** 2)
        return max(0, min(f, 2))  # Cap at 2x leverage

    def size_from_probability(self, prob, method=None):
        """Convert ML probability to position size."""
        method = method or self.method
        edge = 2 * prob - 1  # Range: [-1, 1]

        if method == 'kelly':
            size = self.kelly_fraction(prob, 1.5) * self.max_pos
        elif method == 'half_kelly':
            size = 0.5 * self.kelly_fraction(prob, 1.5) * self.max_pos
        elif method == 'linear':
            size = edge * self.max_pos
        elif method == 'sigmoid':
            size = self.max_pos * (2 / (1 + np.exp(-10 * (prob - 0.5))) - 1)
        elif method == 'discrete':
            if prob > 0.60:
                size = self.max_pos
            elif prob > 0.55:
                size = self.max_pos * 0.5
            else:
                size = 0
        else:
            size = edge * self.max_pos

        return np.clip(size, -self.max_pos, self.max_pos)

    def nse_lot_adjust(self, size_pct, capital, price, lot_size):
        """Round to NSE F&O lot size multiples."""
        notional = capital * abs(size_pct)
        n_lots = max(0, int(notional / (price * lot_size)))
        actual_notional = n_lots * price * lot_size
        actual_pct = actual_notional / capital
        return {
            'lots': n_lots,
            'notional': actual_notional,
            'actual_pct': actual_pct,
            'margin_required': actual_notional * 0.20  # ~20% margin
        }

# Simulate ML model predictions and bet sizing
np.random.seed(42)
n_trades = 200
probabilities = np.random.beta(3, 2.5, n_trades)  # Slightly positive edge

sizer = BetSizer(max_position=0.10)
methods = ['kelly', 'half_kelly', 'linear', 'sigmoid', 'discrete']

# Generate returns (correlated with true probabilities)
actual_returns = np.where(
    np.random.random(n_trades) < probabilities,
    np.random.exponential(0.015, n_trades),
    -np.random.exponential(0.012, n_trades)
)

print("=" * 65)
print("  Bet Sizing Comparison - Nifty 50 ML Strategy")
print("=" * 65)
print(f"\\nTrades: {n_trades}, Avg probability: {probabilities.mean():.3f}")
print(f"Win rate: {(actual_returns > 0).mean()*100:.1f}%")

print(f"\\n{'Method':<13} {'Avg Size':>9} {'Return':>9} {'Sharpe':>8} {'MaxDD':>8}")
print("-" * 55)

for method in methods:
    sizes = np.array([sizer.size_from_probability(p, method) for p in probabilities])
    strat_returns = sizes * actual_returns

    avg_size = np.mean(np.abs(sizes)) * 100
    total_ret = np.sum(strat_returns) * 100
    sharpe = np.mean(strat_returns) / np.std(strat_returns) * np.sqrt(252)
    cum_ret = np.cumsum(strat_returns)
    max_dd = np.min(cum_ret - np.maximum.accumulate(cum_ret)) * 100

    print(f"{method:<13} {avg_size:>8.1f}% {total_ret:>+8.1f}% "
          f"{sharpe:>8.2f} {max_dd:>+7.1f}%")

# NSE lot size example
print(f"\\nNSE F&O Position Sizing Example:")
print(f"  Capital: INR 50 Lakhs, Nifty at 22000, Lot size: 25")
for prob in [0.55, 0.60, 0.70]:
    size = sizer.size_from_probability(prob, 'half_kelly')
    lot_info = sizer.nse_lot_adjust(size, 5000000, 22000, 25)
    print(f"  p={prob:.2f}: size={size*100:.1f}%, lots={lot_info['lots']}, "
          f"margin=INR {lot_info['margin_required']:,.0f}")`}
      />

      <ExampleBlock
        title="Kelly Sizing for Nifty Futures Trade"
        difficulty="intermediate"
        problem="Your ML model predicts Nifty will rise with 62% probability. Historical win/loss ratio is 1.3 (average win / average loss). Capital is INR 50 Lakhs. Compute the Kelly and half-Kelly position sizes in Nifty futures lots (lot = 25, Nifty at 22,000)."
        solution={[
          {
            step: 'Compute Kelly fraction',
            formula: 'f^* = 0.62 - \\frac{0.38}{1.3} = 0.62 - 0.292 = 0.328',
            explanation: 'Full Kelly suggests betting 32.8% of capital.',
          },
          {
            step: 'Apply half-Kelly for safety',
            formula: 'f_{half} = 0.328 / 2 = 16.4\\%',
            explanation: 'Half-Kelly is 16.4% of capital = INR 8.2 Lakhs.',
          },
          {
            step: 'Convert to Nifty lots',
            formula: '\\text{Lots} = \\lfloor \\frac{820000}{22000 \\times 25} \\rfloor = \\lfloor 1.49 \\rfloor = 1 \\text{ lot}',
            explanation: 'At INR 5.5L per lot, one lot is the maximum. Margin required at 20% = INR 1.1L.',
          },
          {
            step: 'Risk check',
            formula: '\\text{Max loss} = 1 \\text{ lot} \\times 25 \\times 22000 \\times 2\\% = \\text{INR } 11,000',
            explanation: 'At a 2% stop loss, maximum risk per trade is INR 11,000 (0.22% of capital), which is conservative and appropriate for a 62% confidence signal.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Bet sizing bridges ML prediction quality and portfolio profitability. The
          Kelly criterion provides the theoretically optimal sizing but should be
          halved in practice due to estimation uncertainty. For Indian F&O trading,
          positions must be rounded to NSE lot sizes and constrained by SEBI margin
          requirements. Sigmoid-based sizing concentrates positions on high-confidence
          trades, while linear scaling provides smoother capital allocation. Always
          ensure position sizes respect both model confidence and risk management
          limits.
        </p>
      </NoteBlock>
    </div>
  )
}
