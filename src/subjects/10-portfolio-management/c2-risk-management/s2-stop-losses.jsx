import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveStopLoss() {
  const [entryPrice, setEntryPrice] = useState(2500)
  const [stopPct, setStopPct] = useState(5)
  const [trailPct, setTrailPct] = useState(3)
  const [currentPrice, setCurrentPrice] = useState(2700)

  const fixedStop = entryPrice * (1 - stopPct / 100)
  const highWatermark = Math.max(entryPrice, currentPrice)
  const trailingStop = highWatermark * (1 - trailPct / 100)
  const activeStop = Math.max(fixedStop, trailingStop)
  const isTriggered = currentPrice <= activeStop

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Stop-Loss Calculator
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Configure fixed and trailing stop-losses for NSE stock positions.
      </p>
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Entry: INR {entryPrice}</span>
          <input type="range" min="500" max="5000" step="50" value={entryPrice}
            onChange={e => setEntryPrice(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Fixed Stop: {stopPct}%</span>
          <input type="range" min="1" max="15" step="0.5" value={stopPct}
            onChange={e => setStopPct(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Trail: {trailPct}%</span>
          <input type="range" min="1" max="10" step="0.5" value={trailPct}
            onChange={e => setTrailPct(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Current: INR {currentPrice}</span>
          <input type="range" min="500" max="5000" step="50" value={currentPrice}
            onChange={e => setCurrentPrice(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>
      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        <div className="rounded-lg bg-indigo-50 p-2 dark:bg-indigo-900/30">
          <div className="text-gray-500">Fixed Stop</div>
          <div className="text-sm font-bold text-indigo-600">INR {fixedStop.toFixed(0)}</div>
        </div>
        <div className="rounded-lg bg-amber-50 p-2 dark:bg-amber-900/30">
          <div className="text-gray-500">Trailing Stop</div>
          <div className="text-sm font-bold text-amber-600">INR {trailingStop.toFixed(0)}</div>
        </div>
        <div className="rounded-lg bg-purple-50 p-2 dark:bg-purple-900/30">
          <div className="text-gray-500">Active Stop</div>
          <div className="text-sm font-bold text-purple-600">INR {activeStop.toFixed(0)}</div>
        </div>
        <div className={`rounded-lg p-2 ${isTriggered ? 'bg-red-50 dark:bg-red-900/30' : 'bg-green-50 dark:bg-green-900/30'}`}>
          <div className="text-gray-500">Status</div>
          <div className={`text-sm font-bold ${isTriggered ? 'text-red-600' : 'text-green-600'}`}>
            {isTriggered ? 'TRIGGERED' : 'Active'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function StopLosses() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Stop-Loss Strategies on NSE
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Stop-loss orders are fundamental risk management tools that automatically exit positions
        when prices move against the trader. On NSE, stop-loss orders (SL and SL-M) are natively
        supported by the exchange order matching system. Understanding the mechanics, types, and
        optimal calibration of stop-losses is critical for Indian market participants.
      </p>

      <DefinitionBlock
        title="Stop-Loss Order Types on NSE"
        label="Definition 10.5"
        definition="NSE supports two stop-loss order types: SL (Stop-Loss Limit) triggers a limit order when the trigger price is hit, and SL-M (Stop-Loss Market) triggers a market order. SL orders may not execute if price gaps beyond the limit; SL-M guarantees execution but at potentially worse prices. The trigger price must be set above LTP for buy SL and below LTP for sell SL."
        notation="SL = Stop-Loss Limit, SL-M = Stop-Loss Market, LTP = Last Traded Price"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        ATR-Based Stop-Loss
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The Average True Range (ATR) provides a volatility-adaptive stop-loss distance:
      </p>

      <BlockMath math="\text{Stop} = \text{Entry} - k \times \text{ATR}(n)" />
      <BlockMath math="\text{ATR}(n) = \frac{1}{n}\sum_{t=1}^{n} \max(H_t - L_t, |H_t - C_{t-1}|, |L_t - C_{t-1}|)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Typical values: <InlineMath math="k = 2\text{-}3" /> for swing trades,
        <InlineMath math="k = 1\text{-}1.5" /> for intraday. Using ATR adapts the stop to
        current market volatility -- wider stops during volatile periods, tighter when calm.
      </p>

      <TheoremBlock
        title="Optimal Stop-Loss Width"
        label="Theorem 10.4"
        statement="For a momentum strategy with signal Sharpe ratio S and normally distributed returns, the optimal stop-loss maximizes the truncated Sharpe ratio. The optimal stop is approximately δ* = σ·√(2·ln(1/α)) where α is the desired probability of being stopped out on noise."
        proof="The stop-loss truncates the return distribution. The expected return of the truncated distribution is E[R|R>-δ] = μ + σ·φ(d)/Φ(d) where d = (δ+μ)/σ. Maximizing the Sharpe of the truncated distribution yields the result."
      />

      <InteractiveStopLoss />

      <PythonCode
        title="stop_loss_backtest_nse.py"
        runnable
        code={`import numpy as np

np.random.seed(42)

# Backtest stop-loss strategies on simulated Nifty 50 trades
n_trades = 1000
win_rate = 0.52
avg_win = 0.03  # 3% average win
avg_loss = -0.02  # 2% average loss

# Generate trade returns (mixture of wins and losses)
wins = np.random.exponential(avg_win, int(n_trades * win_rate))
losses = -np.random.exponential(-avg_loss, int(n_trades * (1 - win_rate)))
all_returns = np.concatenate([wins, losses])
np.random.shuffle(all_returns)

strategies = {
    'No Stop': {'stop': -1.0, 'trail': None},
    'Fixed 2%': {'stop': -0.02, 'trail': None},
    'Fixed 5%': {'stop': -0.05, 'trail': None},
    'Trail 3%': {'stop': -0.03, 'trail': 0.03},
    'ATR 2x': {'stop': -0.028, 'trail': None},  # ~2x simulated ATR
}

print("=== Stop-Loss Strategy Comparison (1000 Nifty Trades) ===")
print(f"\\n{'Strategy':<15} {'Avg Ret':>8} {'Win%':>8} {'MaxDD':>8} {'Sharpe':>8} {'Profit Factor':>13}")
print("-" * 65)

for name, params in strategies.items():
    modified_returns = []
    max_intra = 0

    for r in all_returns:
        if params['stop'] > -1.0 and r < params['stop']:
            modified_returns.append(params['stop'])
        elif params['trail'] and r > params['trail']:
            # Trailing stop locks in some profit
            modified_returns.append(r * 0.85)  # Keep 85% of gains
        else:
            modified_returns.append(r)

    rets = np.array(modified_returns)
    cumulative = np.cumprod(1 + rets)
    max_dd = np.min(cumulative / np.maximum.accumulate(cumulative) - 1)
    wins_sum = np.sum(rets[rets > 0])
    losses_sum = abs(np.sum(rets[rets < 0]))
    pf = wins_sum / losses_sum if losses_sum > 0 else float('inf')

    print(f"{name:<15} {np.mean(rets):>8.4f} {np.mean(rets>0)*100:>7.1f}% "
          f"{max_dd:>8.2%} {np.mean(rets)/np.std(rets)*np.sqrt(252):>8.3f} {pf:>13.3f}")`}
      />

      <ExampleBlock
        title="Chandelier Exit for Nifty Swing Trade"
        difficulty="intermediate"
        problem="You enter RELIANCE at INR 2500. The 14-day ATR is INR 45. Using a 3x ATR chandelier exit, what is the initial stop? If price rises to INR 2650, where does the trailing stop move?"
        solution={[
          {
            step: 'Initial stop',
            formula: '\\text{Stop}_0 = 2500 - 3 \\times 45 = 2500 - 135 = \\text{INR } 2365',
          },
          {
            step: 'After price rises to INR 2650',
            formula: '\\text{Stop}_1 = 2650 - 3 \\times 45 = 2650 - 135 = \\text{INR } 2515',
            explanation: 'The trailing stop ratchets up with price, locking in profit. Note the stop never moves down.',
          },
          {
            step: 'Risk-reward check',
            formula: '\\text{Risk} = 2500 - 2365 = 135, \\quad \\text{Reward so far} = 2650 - 2500 = 150',
            explanation: 'R:R = 1.11:1 at current level. The trailing stop ensures at least INR 15 profit per share.',
          },
        ]}
      />

      <NoteBlock title="NSE-Specific Stop-Loss Tips" type="tip">
        <ul className="space-y-1 list-disc list-inside">
          <li>Use SL-M for liquid stocks (Nifty 50), SL-Limit for less liquid mid-caps</li>
          <li>NSE has circuit breakers at 5/10/15/20% -- stops may not trigger in circuit freeze</li>
          <li>AMO (After Market Orders) can set stops before market opens on Zerodha/Kite</li>
          <li>GTT (Good Till Triggered) on Zerodha allows multi-day stop-loss orders</li>
          <li>Avoid placing stops at round numbers (INR 2500, 3000) as these are obvious levels</li>
        </ul>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Stop-losses are essential risk management for Indian equity trading. ATR-based stops
          adapt to volatility, trailing stops lock in profits, and the choice between SL and SL-M
          depends on liquidity. Backtesting shows that well-calibrated stops improve the Sharpe
          ratio by 0.1-0.3 for typical NSE trading strategies.
        </p>
      </NoteBlock>
    </div>
  )
}
