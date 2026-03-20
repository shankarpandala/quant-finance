import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveVectorized() {
  const [nDays, setNDays] = useState(1000)
  const [nParams, setNParams] = useState(20)

  const loopTime = nDays * nParams * 0.001
  const vectorTime = nDays * nParams * 0.000005
  const speedup = loopTime / vectorTime

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Vectorized vs Loop Performance
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Compare execution time for backtesting Nifty strategies with different data sizes.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Trading Days = {nDays}</span>
          <input type="range" min="100" max="10000" step="100" value={nDays}
            onChange={e => setNDays(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Parameter Combinations = {nParams}</span>
          <input type="range" min="1" max="200" step="5" value={nParams}
            onChange={e => setNParams(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Loop (Python)</div>
          <div className="text-lg font-bold text-red-600 dark:text-red-400">{loopTime.toFixed(1)}s</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Vectorized (NumPy)</div>
          <div className="text-lg font-bold text-green-600 dark:text-green-400">{vectorTime.toFixed(3)}s</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Speedup</div>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{speedup.toFixed(0)}x</div>
        </div>
      </div>
    </div>
  )
}

export default function VectorbtIntro() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Vectorized Backtesting with vectorbt
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Vectorized backtesting replaces row-by-row iteration with array operations, achieving
        100-1000x speedups over traditional loop-based approaches. The vectorbt library wraps
        NumPy and pandas operations into a high-level API designed specifically for strategy
        testing. For scanning thousands of Nifty parameter combinations, vectorization is essential.
      </p>

      <DefinitionBlock
        title="Vectorized Backtesting"
        label="Definition 8.5"
        definition="Vectorized backtesting computes trading signals, positions, and P&L as operations on entire arrays rather than iterating through each time step. It exploits NumPy's SIMD (Single Instruction Multiple Data) operations for massive parallelism."
        notation="\text{positions} = f(\text{signals}), \quad \text{pnl} = \text{positions}[:-1] \cdot \text{returns}[1:]"
      />

      <BlockMath math="\text{Cumulative Return} = \prod_{t=1}^{T} (1 + r_t \cdot w_t) - 1" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The key insight of vectorized backtesting is that most trading rules can be expressed as
        element-wise or rolling operations on price arrays. For example, a moving average crossover
        signal is simply a comparison of two rolling means:
      </p>

      <BlockMath math="\text{signal}_t = \mathbb{1}\!\left[\frac{1}{n_{\text{fast}}}\sum_{i=0}^{n_{\text{fast}}-1} S_{t-i} > \frac{1}{n_{\text{slow}}}\sum_{i=0}^{n_{\text{slow}}-1} S_{t-i}\right]" />

      <TheoremBlock
        title="Computational Complexity of Vectorized Backtest"
        label="Theorem 8.4"
        statement="A vectorized backtest of a signal computed from K rolling statistics on T observations with P parameter combinations runs in O(T \cdot K \cdot P) time but with constant factor c_{\text{vec}} \approx 10^{-9} per operation (NumPy), compared to c_{\text{loop}} \approx 10^{-6} for Python loops. The effective speedup is c_{\text{loop}}/c_{\text{vec}} \approx 1000\times."
        proof="NumPy operations are implemented in C and leverage CPU vector instructions (SSE, AVX). Each array operation processes data in cache-friendly contiguous memory. The O(T K P) scaling is the same for both approaches, but the constant factor differs by ~3 orders of magnitude due to Python interpreter overhead in the loop case."
      />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Feature</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">vectorbt</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Loop-based</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Speed</td>
              <td className="px-4 py-2">100-1000x faster</td>
              <td className="px-4 py-2">Baseline</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Parameter scanning</td>
              <td className="px-4 py-2">Native (broadcasting)</td>
              <td className="px-4 py-2">Nested loops</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Memory</td>
              <td className="px-4 py-2">Higher (stores all combos)</td>
              <td className="px-4 py-2">Lower (one at a time)</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Flexibility</td>
              <td className="px-4 py-2">Limited to array ops</td>
              <td className="px-4 py-2">Arbitrary logic</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveVectorized />

      <PythonCode
        title="vectorized_backtest.py"
        runnable
        code={`import numpy as np
import time

np.random.seed(42)

# Generate synthetic Nifty 50 daily data
n_days = 2520  # 10 years
dates = np.arange(n_days)
nifty = 10000 * np.exp(np.cumsum(
    np.random.normal(0.0004, 0.012, n_days)
))

print("=== Vectorized MA Crossover Backtest on Nifty 50 ===")
print(f"Data: {n_days} trading days")
print(f"Nifty range: {nifty[0]:.0f} to {nifty[-1]:.0f}")

# --- Method 1: Loop-based (slow) ---
def backtest_loop(prices, fast, slow):
    n = len(prices)
    position = 0
    pnl = 0
    for i in range(slow, n):
        fast_ma = np.mean(prices[i-fast:i])
        slow_ma = np.mean(prices[i-slow:i])
        new_position = 1 if fast_ma > slow_ma else -1
        pnl += position * (prices[i] - prices[i-1])
        position = new_position
    return pnl

# --- Method 2: Vectorized (fast) ---
def backtest_vectorized(prices, fast, slow):
    # Compute moving averages using cumulative sum trick
    cumsum = np.cumsum(np.insert(prices, 0, 0))
    fast_ma = (cumsum[fast:] - cumsum[:-fast]) / fast
    slow_ma = (cumsum[slow:] - cumsum[:-slow]) / slow

    # Align arrays
    offset = slow - fast
    fast_ma = fast_ma[offset:]

    # Generate signals
    signal = np.where(fast_ma > slow_ma, 1, -1)

    # Compute returns
    returns = np.diff(prices[slow:]) / prices[slow:-1]
    signal = signal[:-1]  # align with returns

    # P&L
    pnl = np.sum(signal * returns * prices[slow:-1])
    return pnl

# Single comparison
fast, slow = 20, 50
t0 = time.time()
pnl_loop = backtest_loop(nifty, fast, slow)
t_loop = time.time() - t0

t0 = time.time()
pnl_vec = backtest_vectorized(nifty, fast, slow)
t_vec = time.time() - t0

print(f"\\nSingle backtest (MA {fast}/{slow}):")
print(f"  Loop:       {t_loop:.4f}s, PnL = {pnl_loop:,.0f}")
print(f"  Vectorized: {t_vec:.6f}s, PnL = {pnl_vec:,.0f}")
print(f"  Speedup: {t_loop/t_vec:.0f}x")

# Parameter scan: test many combinations
fast_range = np.arange(5, 51, 5)    # 10 values
slow_range = np.arange(20, 201, 10)  # 19 values
print(f"\\nParameter scan: {len(fast_range)} x {len(slow_range)} = "
      f"{len(fast_range)*len(slow_range)} combinations")

t0 = time.time()
results = np.zeros((len(fast_range), len(slow_range)))
for i, fast in enumerate(fast_range):
    for j, slow in enumerate(slow_range):
        if fast < slow:
            results[i, j] = backtest_vectorized(nifty, fast, slow)
t_scan = time.time() - t0

best_idx = np.unravel_index(np.argmax(results), results.shape)
best_fast = fast_range[best_idx[0]]
best_slow = slow_range[best_idx[1]]
best_pnl = results[best_idx]

print(f"  Scan time: {t_scan:.2f}s")
print(f"  Best: MA {best_fast}/{best_slow}, PnL = {best_pnl:,.0f}")

# Compute Sharpe for best
signal = np.where(
    np.convolve(nifty, np.ones(best_fast)/best_fast, 'valid')[best_slow-best_fast:]
    > np.convolve(nifty, np.ones(best_slow)/best_slow, 'valid'), 1, -1)
returns = np.diff(nifty[best_slow:]) / nifty[best_slow:-1]
strat_returns = signal[:-1] * returns
sharpe = np.mean(strat_returns) / np.std(strat_returns) * np.sqrt(252)
print(f"  Sharpe: {sharpe:.2f}")
print(f"\\nWarning: Best of {len(fast_range)*len(slow_range)} combos is likely overfit!")`}
      />

      <ExampleBlock
        title="Vectorized RSI Signal for Bank Nifty"
        difficulty="beginner"
        problem="Implement a vectorized RSI(14) computation for Bank Nifty daily data. RSI below 30 generates a buy signal. Compute the signal array without any Python loops."
        solution={[
          {
            step: 'Compute price changes',
            formula: '\\Delta P_t = P_t - P_{t-1} \\quad \\text{(np.diff)}',
          },
          {
            step: 'Separate gains and losses',
            formula: '\\text{gains} = \\max(\\Delta P, 0), \\quad \\text{losses} = \\max(-\\Delta P, 0)',
            explanation: 'Use np.maximum(delta, 0) for gains and np.maximum(-delta, 0) for losses.',
          },
          {
            step: 'Compute rolling averages',
            formula: '\\text{avg\\_gain} = \\text{rolling\\_mean}(\\text{gains}, 14)',
            explanation: 'Use np.convolve or cumsum trick for O(n) computation.',
          },
          {
            step: 'RSI and signal',
            formula: 'RS = \\frac{\\text{avg\\_gain}}{\\text{avg\\_loss}}, \\quad RSI = 100 - \\frac{100}{1+RS}',
            explanation: 'Signal array: np.where(RSI < 30, 1, 0). The entire computation is O(n) with zero Python loops.',
          },
        ]}
      />

      <NoteBlock title="vectorbt Installation" type="tip">
        <p>
          Install vectorbt via pip: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">pip install vectorbt</code>.
          For Nifty data, combine with yfinance (<code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">pip install yfinance</code>)
          using the ticker ^NSEI. vectorbt's Portfolio.from_signals() handles position sizing,
          commission, and slippage automatically. Use vbt.Param for broadcasting parameter
          combinations across the entire price array simultaneously.
        </p>
      </NoteBlock>

      <NoteBlock title="Limitations of Vectorized Backtesting" type="warning">
        <p>
          Vectorized backtesting cannot handle: (1) path-dependent position sizing (e.g., sizing
          based on current drawdown), (2) complex order types (stop-loss orders that trigger
          intraday), (3) portfolio-level constraints (sector limits, max positions), (4) realistic
          execution modeling with partial fills and queue position. For these cases, use event-driven
          frameworks like Zipline or Backtrader covered in later sections. Use vectorized methods
          for initial screening and event-driven for final validation.
        </p>
      </NoteBlock>
    </div>
  )
}
