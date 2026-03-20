import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveMACrossover() {
  const [shortWindow, setShortWindow] = useState(20)
  const [longWindow, setLongWindow] = useState(50)

  const generatePrices = () => {
    const prices = [18000]
    for (let i = 1; i < 200; i++) {
      const trend = Math.sin(i / 40) * 20
      prices.push(prices[i - 1] + trend + (Math.random() - 0.48) * 150)
    }
    return prices
  }

  const [prices] = useState(generatePrices)

  const calcMA = (data, window) => {
    return data.map((_, i) => {
      if (i < window - 1) return null
      const slice = data.slice(i - window + 1, i + 1)
      return slice.reduce((a, b) => a + b, 0) / window
    })
  }

  const shortMA = calcMA(prices, shortWindow)
  const longMA = calcMA(prices, longWindow)

  const minP = Math.min(...prices) - 200
  const maxP = Math.max(...prices) + 200
  const chartW = 500
  const chartH = 200

  const toX = (i) => (i / (prices.length - 1)) * chartW
  const toY = (v) => chartH - ((v - minP) / (maxP - minP)) * chartH

  const pricePath = prices.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(v)}`).join(' ')
  const shortPath = shortMA.filter(v => v !== null).map((v, i) => {
    const idx = i + shortWindow - 1
    return `${i === 0 ? 'M' : 'L'}${toX(idx)},${toY(v)}`
  }).join(' ')
  const longPath = longMA.filter(v => v !== null).map((v, i) => {
    const idx = i + longWindow - 1
    return `${i === 0 ? 'M' : 'L'}${toX(idx)},${toY(v)}`
  }).join(' ')

  const crossovers = []
  for (let i = longWindow; i < prices.length; i++) {
    const prevShort = shortMA[i - 1]
    const prevLong = longMA[i - 1]
    const curShort = shortMA[i]
    const curLong = longMA[i]
    if (prevShort !== null && prevLong !== null && curShort !== null && curLong !== null) {
      if (prevShort <= prevLong && curShort > curLong) crossovers.push({ i, type: 'golden' })
      if (prevShort >= prevLong && curShort < curLong) crossovers.push({ i, type: 'death' })
    }
  }

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Moving Average Crossover on Nifty 50
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust short and long MA windows to find optimal crossover signals on simulated Nifty 50 data.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Short MA Window: {shortWindow} days</span>
          <input type="range" min="5" max="50" step="1" value={shortWindow}
            onChange={e => setShortWindow(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Long MA Window: {longWindow} days</span>
          <input type="range" min="20" max="200" step="5" value={longWindow}
            onChange={e => setLongWindow(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full max-w-2xl mx-auto block">
        <path d={pricePath} fill="none" stroke="#94a3b8" strokeWidth="1" />
        {shortPath && <path d={shortPath} fill="none" stroke="#f59e0b" strokeWidth="1.5" />}
        {longPath && <path d={longPath} fill="none" stroke="#6366f1" strokeWidth="1.5" />}
        {crossovers.map((c, idx) => (
          <circle key={idx} cx={toX(c.i)} cy={toY(prices[c.i])} r="4"
            fill={c.type === 'golden' ? '#22c55e' : '#ef4444'} stroke="white" strokeWidth="1" />
        ))}
      </svg>

      <div className="mt-3 flex justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1"><span className="inline-block w-3 h-0.5 bg-gray-400" /> Nifty 50</span>
        <span className="flex items-center gap-1"><span className="inline-block w-3 h-0.5 bg-amber-500" /> Short MA</span>
        <span className="flex items-center gap-1"><span className="inline-block w-3 h-0.5 bg-indigo-500" /> Long MA</span>
        <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full bg-green-500" /> Golden Cross</span>
        <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full bg-red-500" /> Death Cross</span>
      </div>

      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        Crossover signals: {crossovers.filter(c => c.type === 'golden').length} golden crosses,{' '}
        {crossovers.filter(c => c.type === 'death').length} death crosses
      </p>
    </div>
  )
}

export default function TimeSeriesMomentum() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Time-Series Momentum (TSMOM) on Nifty
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Time-series momentum (TSMOM) is one of the most robust anomalies in financial markets.
        Unlike cross-sectional momentum (which compares assets against each other), TSMOM looks at
        each asset's own past returns to predict its future direction. Research by Moskowitz,
        Ooi, and Pedersen (2012) showed TSMOM generates significant returns across 58 liquid
        instruments globally, and the Nifty 50 exhibits strong TSMOM characteristics.
      </p>

      <DefinitionBlock
        title="Time-Series Momentum (TSMOM)"
        label="Definition 5.4"
        definition="Time-series momentum is the tendency for an asset's own past returns to predict its future returns. Specifically, assets with positive returns over the past k months tend to continue performing positively, and vice versa. The TSMOM signal for asset i at time t is simply the sign of the past return."
        notation={<>TSMOM signal: <InlineMath math="\text{signal}_{i,t} = \text{sign}(r_{i,t-k:t})" /> where <InlineMath math="r_{i,t-k:t}" /> is the return over the lookback period <InlineMath math="k" />.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Mathematical Formulation
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The basic TSMOM strategy for Nifty 50 computes the position as:
      </p>

      <BlockMath math="w_t = \frac{\text{sign}(r_{t-k:t})}{\sigma_t} \cdot \sigma_{\text{target}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="r_{t-k:t}" /> is the past <InlineMath math="k" />-day return,
        <InlineMath math="\sigma_t" /> is the realized volatility estimate, and <InlineMath math="\sigma_{\text{target}}" /> is
        the target annualized volatility. The volatility scaling ensures each position contributes
        equally to portfolio risk.
      </p>

      <BlockMath math="\sigma_t = \sqrt{252 \cdot \text{EWMA}(r_t^2, \lambda)}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The exponentially weighted moving average (EWMA) of squared returns with decay
        factor <InlineMath math="\lambda" /> (typically 0.94 for daily data) provides a responsive
        volatility estimate.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Moving Average Crossover Strategies
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A more refined TSMOM signal uses moving average crossovers. The <InlineMath math="(s, l)" />-day
        crossover signal is:
      </p>

      <BlockMath math="\text{MACD}_{s,l}(t) = \frac{1}{s}\sum_{i=0}^{s-1} P_{t-i} - \frac{1}{l}\sum_{i=0}^{l-1} P_{t-i}" />

      <BlockMath math="w_t = \frac{\text{MACD}_{s,l}(t)}{\sigma_t \cdot P_t} \cdot \sigma_{\text{target}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Common crossover combinations for Nifty 50 include (8,21), (20,50), and (50,200) day
        windows. The 50-200 day crossover is the famous "golden cross" / "death cross" signal
        widely watched by Indian market participants.
      </p>

      <TheoremBlock
        title="TSMOM Decomposition"
        label="Theorem 5.4"
        statement={<>The TSMOM return can be decomposed as: <BlockMath math="r_{TSMOM,t} = \text{sign}(r_{t-k:t}) \cdot r_{t:t+1} = |r_{t:t+1}| \cdot \mathbb{1}_{[\text{sign}(r_{t-k:t}) = \text{sign}(r_{t:t+1})]} - |r_{t:t+1}| \cdot \mathbb{1}_{[\text{sign}(r_{t-k:t}) \neq \text{sign}(r_{t:t+1})]}" /> This shows TSMOM profits when the direction of past returns correctly predicts future direction, regardless of magnitude. The strategy's expected return equals the autocorrelation of returns scaled by volatility.</>}
      />

      <InteractiveMACrossover />

      <PythonCode
        title="tsmom_nifty.py"
        runnable
        code={`import numpy as np

# Time-Series Momentum Strategy on Nifty 50
np.random.seed(42)
n_days = 756  # 3 years of NSE trading data

# Simulate Nifty 50 with momentum characteristics
nifty = np.zeros(n_days)
nifty[0] = 18000
regime = 1  # 1=bull, -1=bear
for t in range(1, n_days):
    if np.random.rand() < 0.005:  # Regime switch probability
        regime *= -1
    drift = regime * 0.0003  # Daily drift
    nifty[t] = nifty[t-1] * (1 + drift + np.random.randn() * 0.012)

returns = np.diff(nifty) / nifty[:-1]

# TSMOM Strategy Parameters
lookbacks = [21, 63, 126, 252]  # 1M, 3M, 6M, 12M
vol_lookback = 60
vol_target = 0.15  # 15% annualized target vol

print("=== TSMOM Strategy on Nifty 50 ===\\n")

for lb in lookbacks:
    # Compute signals
    positions = np.zeros(len(returns))
    strategy_returns = np.zeros(len(returns))

    for t in range(max(lb, vol_lookback), len(returns)):
        # Past return signal
        past_return = (nifty[t] - nifty[t - lb]) / nifty[t - lb]
        signal = np.sign(past_return)

        # EWMA volatility
        vol = np.std(returns[t-vol_lookback:t]) * np.sqrt(252)
        vol = max(vol, 0.05)  # Floor at 5%

        # Position sizing with vol targeting
        position = signal * (vol_target / vol)
        position = np.clip(position, -2, 2)  # Max 2x leverage

        positions[t] = position
        strategy_returns[t] = position * returns[t]

    # Performance metrics
    ann_return = np.mean(strategy_returns) * 252
    ann_vol = np.std(strategy_returns) * np.sqrt(252)
    sharpe = ann_return / ann_vol if ann_vol > 0 else 0
    max_dd = np.min(np.cumsum(strategy_returns) - np.maximum.accumulate(np.cumsum(strategy_returns)))
    hit_rate = np.mean(strategy_returns[strategy_returns != 0] > 0)

    print(f"Lookback: {lb:>3}d | Return: {ann_return*100:>6.1f}% | "
          f"Vol: {ann_vol*100:>5.1f}% | Sharpe: {sharpe:>5.2f} | "
          f"MaxDD: {max_dd*100:>6.1f}% | Hit: {hit_rate*100:>4.1f}%")

# Moving Average Crossover
print(f"\\n=== MA Crossover Signals ===")
ma_pairs = [(8, 21), (20, 50), (50, 200)]

for short_w, long_w in ma_pairs:
    if long_w >= n_days:
        continue
    signals = 0
    golden = 0
    death = 0
    for t in range(long_w, n_days):
        short_ma = np.mean(nifty[t-short_w:t])
        long_ma = np.mean(nifty[t-long_w:t])
        prev_short = np.mean(nifty[t-short_w-1:t-1])
        prev_long = np.mean(nifty[t-long_w-1:t-1])
        if prev_short <= prev_long and short_ma > long_ma:
            golden += 1
        elif prev_short >= prev_long and short_ma < long_ma:
            death += 1
    print(f"MA({short_w},{long_w}): {golden} golden crosses, {death} death crosses")

# Transaction costs (NSE specific)
print(f"\\n=== NSE Cost Analysis ===")
turnover_ratio = 12  # Approximate annual turnovers
nifty_futures_lot = 25  # Nifty futures lot size (25 units)
stt_futures = 0.0125 / 100  # STT on futures sell side
brokerage = 20  # INR per order
margin_req = 0.12  # 12% SPAN margin for Nifty futures

avg_nifty = np.mean(nifty)
notional_per_lot = nifty_futures_lot * avg_nifty
annual_stt = turnover_ratio * stt_futures * notional_per_lot
annual_brokerage = turnover_ratio * 2 * brokerage

print(f"Notional per lot: INR {notional_per_lot:,.0f}")
print(f"Margin per lot:   INR {notional_per_lot * margin_req:,.0f}")
print(f"Annual STT cost:  INR {annual_stt:,.0f}")
print(f"Annual brokerage: INR {annual_brokerage:,.0f}")
print(f"Total cost drag:  {(annual_stt + annual_brokerage)/notional_per_lot*100:.3f}%")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        TSMOM in the Indian Market Context
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Nifty 50 has exhibited strong time-series momentum historically, particularly at the
        3-month and 12-month lookback horizons. The strategy works well during trending regimes
        (bull runs from 2003-2007, 2020-2021) but suffers during choppy, range-bound markets.
        Key Indian market considerations include:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Aspect</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Indian Market Detail</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Instrument</td>
              <td className="px-5 py-2">Nifty 50 futures (lot size 25) or Nifty ETFs</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Trading hours</td>
              <td className="px-5 py-2">9:15 AM - 3:30 PM IST, pre-open from 9:00 AM</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Margin</td>
              <td className="px-5 py-2">SPAN + exposure margin (~12% for Nifty futures)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Roll cost</td>
              <td className="px-5 py-2">Monthly expiry on last Thursday, ~0.05% per roll</td>
            </tr>
            <tr>
              <td className="px-5 py-2">Key events</td>
              <td className="px-5 py-2">RBI MPC (bi-monthly), Union Budget (February), election cycles</td>
            </tr>
          </tbody>
        </table>
      </div>

      <ExampleBlock
        title="TSMOM Position Sizing"
        difficulty="intermediate"
        problem="Nifty 50 is at 22,000 with a 3-month return of +8%. The 60-day realized volatility is 14% annualized. Target vol is 15%. Compute the TSMOM position for a portfolio of INR 1 crore."
        solution={[
          {
            step: 'Determine signal',
            formula: '\\text{signal} = \\text{sign}(+8\\%) = +1',
            explanation: 'Positive 3-month return gives a long signal.',
          },
          {
            step: 'Compute position weight',
            formula: 'w = \\frac{\\sigma_{target}}{\\sigma_{realized}} \\times \\text{signal} = \\frac{0.15}{0.14} \\times 1 = 1.071',
            explanation: 'Slightly leveraged because realized vol is below target.',
          },
          {
            step: 'Calculate notional exposure',
            formula: '\\text{Notional} = 1.071 \\times 1,00,00,000 = \\text{INR } 1,07,14,286',
            explanation: 'Total notional exposure in Nifty futures.',
          },
          {
            step: 'Convert to lots',
            formula: '\\text{Lots} = \\frac{1,07,14,286}{25 \\times 22,000} = 19.5 \\approx 19 \\text{ lots}',
            explanation: 'Round down to 19 lots of Nifty futures. Margin required: ~INR 12.5 lakhs.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Time-series momentum on Nifty 50 captures trending behavior with a simple, robust
          signal: the sign of past returns. Volatility-scaled positioning ensures consistent
          risk contribution regardless of market regime. Moving average crossovers provide a
          smoother, less noisy variant of the pure TSMOM signal. For NSE implementation, Nifty
          futures with monthly rolls are the most cost-effective vehicle, with total execution
          costs under 0.5% annually for a disciplined strategy.
        </p>
      </NoteBlock>
    </div>
  )
}
