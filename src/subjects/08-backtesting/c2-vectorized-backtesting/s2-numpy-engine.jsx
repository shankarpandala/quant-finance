import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveNumPyEngine() {
  const [strategy, setStrategy] = useState('momentum')
  const [lookback, setLookback] = useState(20)
  const [threshold, setThreshold] = useState(0)

  const nDays = 252
  const seed = lookback * 100 + threshold * 10 + (strategy === 'momentum' ? 1 : 2)
  const mulberry = (a) => { return () => { let t = a += 0x6D2B79F5; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296 } }
  const rng = mulberry(seed)

  const returns = Array.from({ length: nDays }, () => (rng() - 0.5) * 0.025)
  const prices = [22000]
  for (let i = 0; i < nDays; i++) prices.push(prices[i] * (1 + returns[i]))

  let signals
  if (strategy === 'momentum') {
    signals = prices.map((_, i) => {
      if (i < lookback) return 0
      const ret = (prices[i] - prices[i - lookback]) / prices[i - lookback]
      return ret > threshold / 100 ? 1 : ret < -threshold / 100 ? -1 : 0
    })
  } else {
    signals = prices.map((_, i) => {
      if (i < lookback) return 0
      const ma = prices.slice(i - lookback, i).reduce((a, b) => a + b, 0) / lookback
      return prices[i] < ma * (1 - threshold / 100) ? 1 : prices[i] > ma * (1 + threshold / 100) ? -1 : 0
    })
  }

  const pnl = returns.map((r, i) => signals[i] * r * 22000 * 75)
  const cumPnl = pnl.reduce((acc, v) => { acc.push((acc.length ? acc[acc.length - 1] : 0) + v); return acc }, [])
  const totalPnl = cumPnl[cumPnl.length - 1]
  const sharpe = (pnl.reduce((a, b) => a + b, 0) / nDays) / (Math.sqrt(pnl.reduce((a, b) => a + b * b, 0) / nDays) || 1) * Math.sqrt(252)

  const chartW = 480, chartH = 120, padL = 50
  const maxC = Math.max(...cumPnl, 0), minC = Math.min(...cumPnl, 0)
  const toY = (v) => chartH + 5 - ((v - minC) / (maxC - minC || 1)) * chartH
  const toX = (i) => padL + (i / cumPnl.length) * (chartW - padL)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: NumPy Backtest Engine
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Run a vectorized backtest with different strategy types and parameters.
      </p>

      <div className="mb-4 flex gap-4">
        {['momentum', 'mean-reversion'].map(s => (
          <label key={s} className="flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300">
            <input type="radio" name="strat" value={s} checked={strategy === s}
              onChange={() => setStrategy(s)} className="accent-indigo-500" />
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </label>
        ))}
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Lookback = {lookback} days</span>
          <input type="range" min="5" max="60" step="1" value={lookback}
            onChange={e => setLookback(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Threshold = {threshold}%</span>
          <input type="range" min="0" max="10" step="0.5" value={threshold}
            onChange={e => setThreshold(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox={`0 0 ${chartW + 20} ${chartH + 30}`}
        className="w-full max-w-2xl mx-auto block" aria-label="Equity curve">
        <line x1={padL} y1={toY(0)} x2={chartW + 10} y2={toY(0)} stroke="#9ca3af" strokeWidth="1" strokeDasharray="3" />
        <polyline points={cumPnl.map((c, i) => `${toX(i)},${toY(c)}`).join(' ')}
          fill="none" stroke={totalPnl > 0 ? '#10b981' : '#ef4444'} strokeWidth="2" />
      </svg>

      <div className="mt-3 grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Total P&L</div>
          <div className={`text-lg font-bold ${totalPnl > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            INR {(totalPnl / 1000).toFixed(0)}K
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Sharpe</div>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{sharpe.toFixed(2)}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Win Rate</div>
          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
            {((pnl.filter(p => p > 0).length / pnl.filter(p => p !== 0).length) * 100 || 0).toFixed(0)}%
          </div>
        </div>
      </div>
    </div>
  )
}

export default function NumpyEngine() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Building a NumPy Backtest Engine
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        A custom NumPy backtest engine gives you full control over the backtesting pipeline while
        maintaining near-C performance. This section builds a production-quality vectorized engine
        from scratch, designed for testing systematic strategies on NSE data including Nifty 50,
        Bank Nifty, and individual F&O stocks.
      </p>

      <DefinitionBlock
        title="Vectorized Position Array"
        label="Definition 8.6"
        definition="In a vectorized backtest, positions are stored as a 1D array of the same length as the price series. Each element represents the position size (positive for long, negative for short, zero for flat) at that timestamp. P&L is computed as the element-wise product of lagged positions and returns."
        notation="\text{pnl}_t = w_{t-1} \cdot r_t, \quad r_t = \frac{P_t - P_{t-1}}{P_{t-1}}"
      />

      <BlockMath math="\text{equity}_T = \text{equity}_0 \times \prod_{t=1}^{T} \left(1 + w_{t-1} \cdot r_t\right)" />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Engine Architecture
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Our NumPy engine consists of four pure-array functions with zero Python loops:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Function</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Input</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Output</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Complexity</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">compute_indicators</td>
              <td className="px-4 py-2">prices</td>
              <td className="px-4 py-2">indicator arrays</td>
              <td className="px-4 py-2">O(T x K)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">generate_signals</td>
              <td className="px-4 py-2">indicators, params</td>
              <td className="px-4 py-2">signal array {-1, 0, 1}</td>
              <td className="px-4 py-2">O(T)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">compute_positions</td>
              <td className="px-4 py-2">signals, sizing rules</td>
              <td className="px-4 py-2">position array</td>
              <td className="px-4 py-2">O(T)</td>
            </tr>
            <tr>
              <td className="px-4 py-2">compute_pnl</td>
              <td className="px-4 py-2">positions, returns</td>
              <td className="px-4 py-2">P&L, metrics</td>
              <td className="px-4 py-2">O(T)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <TheoremBlock
        title="Correct Position Alignment"
        label="Theorem 8.5"
        statement="To avoid look-ahead bias in vectorized backtesting, the position at time t must be determined by information available at or before time t, and the P&L from that position accrues at time t+1. Mathematically: \text{pnl}_{t+1} = w_t \cdot r_{t+1} = w_t \cdot (P_{t+1} - P_t)/P_t. Using w_t \cdot r_t introduces look-ahead bias equivalent to 1 bar."
        proof="If w_t depends on P_t (e.g., w_t = f(P_1, ..., P_t)), then w_t is known at time t. The return r_{t+1} = (P_{t+1} - P_t)/P_t is earned between t and t+1. Therefore w_t \cdot r_{t+1} correctly represents the P&L. Using r_t would require knowing P_t at time t-1 when deciding w_t, which is look-ahead."
      />

      <InteractiveNumPyEngine />

      <PythonCode
        title="numpy_backtest_engine.py"
        runnable
        code={`import numpy as np
import time

np.random.seed(42)

class NumpyBacktester:
    """Production-quality vectorized backtesting engine."""

    def __init__(self, prices, lot_size=75, commission_per_trade=20,
                 slippage_pct=0.0001):
        self.prices = prices
        self.returns = np.diff(prices) / prices[:-1]
        self.lot_size = lot_size
        self.commission = commission_per_trade
        self.slippage = slippage_pct
        self.n = len(prices)

    def rolling_mean(self, data, window):
        """Fast rolling mean using cumsum."""
        cumsum = np.cumsum(np.insert(data, 0, 0))
        return (cumsum[window:] - cumsum[:-window]) / window

    def rolling_std(self, data, window):
        """Rolling standard deviation."""
        mean = self.rolling_mean(data, window)
        sq_mean = self.rolling_mean(data**2, window)
        return np.sqrt(np.maximum(sq_mean - mean**2, 0))

    def momentum_signal(self, lookback=20, threshold=0):
        """Momentum signal: long if return > threshold."""
        ret = (self.prices[lookback:] - self.prices[:-lookback]) / self.prices[:-lookback]
        signal = np.zeros(self.n)
        signal[lookback:] = np.where(ret > threshold, 1,
                           np.where(ret < -threshold, -1, 0))
        return signal

    def mean_reversion_signal(self, window=20, z_thresh=1.5):
        """Mean reversion: long when price below MA - z*std."""
        ma = np.zeros(self.n)
        std = np.zeros(self.n)
        ma[window:] = self.rolling_mean(self.prices, window)
        std[window:] = self.rolling_std(self.prices, window)

        z_score = np.zeros(self.n)
        valid = std > 0
        z_score[valid] = (self.prices[valid] - ma[valid]) / std[valid]

        signal = np.where(z_score < -z_thresh, 1,
                 np.where(z_score > z_thresh, -1, 0))
        signal[:window] = 0
        return signal

    def compute_pnl(self, signal):
        """Compute P&L from signal array with costs."""
        # Position is signal shifted by 1 (trade on next bar)
        positions = signal[:-1]

        # Raw P&L
        raw_pnl = positions * self.returns * self.prices[:-1] * self.lot_size

        # Transaction costs (on position changes)
        trades = np.abs(np.diff(np.insert(positions, 0, 0)))
        costs = trades * (self.commission + self.prices[:-1] * self.slippage * self.lot_size)

        net_pnl = raw_pnl - costs
        return net_pnl, positions, trades

    def compute_metrics(self, pnl):
        """Compute performance metrics."""
        cum_pnl = np.cumsum(pnl)
        running_max = np.maximum.accumulate(cum_pnl)
        drawdown = cum_pnl - running_max

        total = cum_pnl[-1]
        sharpe = np.mean(pnl) / np.std(pnl) * np.sqrt(252) if np.std(pnl) > 0 else 0
        max_dd = drawdown.min()
        win_rate = (pnl[pnl != 0] > 0).mean() * 100 if (pnl != 0).any() else 0
        n_trades = int(np.sum(np.abs(np.diff(np.sign(pnl))) > 0) / 2)

        return {
            'total_pnl': total, 'sharpe': sharpe, 'max_dd': max_dd,
            'win_rate': win_rate, 'n_trades': n_trades
        }

# Generate 10 years of Nifty-like data
n_days = 2520
nifty = 10000 * np.exp(np.cumsum(np.random.normal(0.0004, 0.012, n_days)))

bt = NumpyBacktester(nifty, lot_size=75)

# Test multiple strategies
print("=== NumPy Backtest Engine: Nifty 50 ===")
print(f"Data: {n_days} days, Price: {nifty[0]:.0f} -> {nifty[-1]:.0f}")

# Momentum scan
print(f"\\n--- Momentum Strategy Scan ---")
print(f"{'Lookback':>10} {'Threshold':>10} {'Sharpe':>8} {'Total PnL':>12} {'Win%':>6}")
print("-" * 50)

t0 = time.time()
best_sharpe = -np.inf
for lb in [10, 20, 40, 60]:
    for th in [0, 0.01, 0.02, 0.05]:
        signal = bt.momentum_signal(lb, th)
        pnl, _, _ = bt.compute_pnl(signal)
        metrics = bt.compute_metrics(pnl)
        if metrics['sharpe'] > best_sharpe:
            best_sharpe = metrics['sharpe']
            best_params = (lb, th)
        print(f"{lb:>10} {th:>10.2%} {metrics['sharpe']:>8.2f} "
              f"{metrics['total_pnl']:>12,.0f} {metrics['win_rate']:>5.1f}%")

scan_time = time.time() - t0
print(f"\\nScan time: {scan_time:.3f}s ({4*4} combinations)")
print(f"Best: lookback={best_params[0]}, threshold={best_params[1]:.2%}, "
      f"Sharpe={best_sharpe:.2f}")

# Mean reversion
print(f"\\n--- Mean Reversion (window=20, z=1.5) ---")
signal = bt.mean_reversion_signal(20, 1.5)
pnl, _, trades = bt.compute_pnl(signal)
metrics = bt.compute_metrics(pnl)
print(f"Sharpe: {metrics['sharpe']:.2f} | PnL: {metrics['total_pnl']:,.0f}")
print(f"Trades: {trades.sum():.0f} | MaxDD: {metrics['max_dd']:,.0f}")`}
      />

      <ExampleBlock
        title="Vectorized Bollinger Band Strategy"
        difficulty="intermediate"
        problem="Implement a Bollinger Band (20, 2) mean-reversion strategy on Nifty in pure NumPy. Buy when price touches the lower band, sell when it touches the upper band. No Python loops allowed."
        solution={[
          {
            step: 'Compute rolling statistics',
            formula: 'MA_{20} = \\text{rolling\\_mean}(P, 20), \\quad \\sigma_{20} = \\text{rolling\\_std}(P, 20)',
          },
          {
            step: 'Compute bands',
            formula: '\\text{upper} = MA + 2\\sigma, \\quad \\text{lower} = MA - 2\\sigma',
          },
          {
            step: 'Generate signals (vectorized)',
            formula: '\\text{signal} = \\text{np.where}(P < \\text{lower}, 1, \\text{np.where}(P > \\text{upper}, -1, \\text{np.nan}))',
          },
          {
            step: 'Forward-fill positions',
            formula: '\\text{positions} = \\text{pd.Series(signal).ffill().fillna(0).values}',
            explanation: 'Forward-fill NaN values to maintain position until the opposite signal fires. Then compute PnL as positions[:-1] * returns[1:].',
          },
        ]}
      />

      <NoteBlock title="Memory Optimization" type="tip">
        <p>
          When scanning thousands of parameter combinations on Nifty data, memory becomes a
          bottleneck. Use float32 instead of float64 to halve memory usage. Process parameter
          batches using NumPy broadcasting: create a 2D array of shape (T, P) where P is the
          number of parameter combinations, and compute all signals simultaneously. For 10 years
          of daily data with 1000 combinations, this requires about 20 MB in float32.
        </p>
      </NoteBlock>

      <NoteBlock title="Numba JIT for Complex Logic" type="warning">
        <p>
          When strategy logic requires path-dependent decisions that cannot be expressed as
          array operations (e.g., trailing stops, position-dependent sizing), use Numba's
          @jit(nopython=True) decorator. Numba compiles Python loops to machine code, achieving
          C-like performance. Example: a trailing stop-loss requires tracking the highest price
          since entry, which is inherently sequential but runs at C speed with Numba.
        </p>
      </NoteBlock>
    </div>
  )
}
