import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveTripleBarrier() {
  const [upperBarrier, setUpperBarrier] = useState(2.0)
  const [lowerBarrier, setLowerBarrier] = useState(2.0)
  const [maxHolding, setMaxHolding] = useState(10)

  const prices = [100, 101.2, 100.5, 102.1, 103.5, 102.8, 104.2, 103.1, 105.0, 104.3, 106.1, 105.5, 107.2]
  const entryPrice = prices[0]
  const dailyVol = 1.2

  const upperLevel = entryPrice * (1 + upperBarrier * dailyVol / 100)
  const lowerLevel = entryPrice * (1 - lowerBarrier * dailyVol / 100)

  let exitDay = Math.min(maxHolding, prices.length - 1)
  let exitType = 'TIME'
  let exitPrice = prices[exitDay]

  for (let i = 1; i < Math.min(maxHolding + 1, prices.length); i++) {
    if (prices[i] >= upperLevel) {
      exitDay = i
      exitType = 'UPPER'
      exitPrice = prices[i]
      break
    }
    if (prices[i] <= lowerLevel) {
      exitDay = i
      exitType = 'LOWER'
      exitPrice = prices[i]
      break
    }
  }

  const returnPct = ((exitPrice - entryPrice) / entryPrice * 100)
  const label = exitType === 'UPPER' ? 1 : exitType === 'LOWER' ? -1 : (returnPct > 0 ? 1 : -1)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Triple Barrier Labeling
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust barrier widths and holding period to see how labels are generated for Nifty 50 trades.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Upper Barrier = {upperBarrier.toFixed(1)} x daily vol</span>
          <input type="range" min="0.5" max="5" step="0.5" value={upperBarrier}
            onChange={e => setUpperBarrier(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Lower Barrier = {lowerBarrier.toFixed(1)} x daily vol</span>
          <input type="range" min="0.5" max="5" step="0.5" value={lowerBarrier}
            onChange={e => setLowerBarrier(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Max Holding = {maxHolding} days</span>
          <input type="range" min="3" max="12" step="1" value={maxHolding}
            onChange={e => setMaxHolding(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 420 160" className="w-full max-w-lg mx-auto block">
        <line x1="30" y1={80 - (upperLevel - 103) * 6} x2={30 + maxHolding * 28}
          y2={80 - (upperLevel - 103) * 6} stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4" />
        <text x={35 + maxHolding * 28} y={83 - (upperLevel - 103) * 6}
          className="text-[8px]" fill="#16a34a">Upper ({upperLevel.toFixed(1)})</text>

        <line x1="30" y1={80 - (lowerLevel - 103) * 6} x2={30 + maxHolding * 28}
          y2={80 - (lowerLevel - 103) * 6} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4" />
        <text x={35 + maxHolding * 28} y={83 - (lowerLevel - 103) * 6}
          className="text-[8px]" fill="#dc2626">Lower ({lowerLevel.toFixed(1)})</text>

        <line x1={30 + maxHolding * 28} y1={80 - (upperLevel - 103) * 6}
          x2={30 + maxHolding * 28} y2={80 - (lowerLevel - 103) * 6}
          stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4" />

        {prices.slice(0, maxHolding + 1).map((p, i) => {
          const x = 30 + i * 28
          const y = 80 - (p - 103) * 6
          return (
            <g key={i}>
              {i > 0 && (
                <line x1={30 + (i - 1) * 28} y1={80 - (prices[i - 1] - 103) * 6}
                  x2={x} y2={y} stroke="#6366f1" strokeWidth="1.5" />
              )}
              <circle cx={x} cy={y} r={i === exitDay ? 4 : 2}
                fill={i === exitDay ? (label === 1 ? '#16a34a' : '#dc2626') : '#6366f1'} />
            </g>
          )
        })}
      </svg>

      <div className="mt-3 grid grid-cols-4 gap-2 text-center text-xs">
        <div className="rounded bg-gray-100 p-2 dark:bg-gray-800">
          <span className="text-gray-500">Entry</span>
          <p className="font-bold">INR {entryPrice}</p>
        </div>
        <div className="rounded bg-gray-100 p-2 dark:bg-gray-800">
          <span className="text-gray-500">Exit Day</span>
          <p className="font-bold">{exitDay}</p>
        </div>
        <div className="rounded bg-gray-100 p-2 dark:bg-gray-800">
          <span className="text-gray-500">Exit Type</span>
          <p className={`font-bold ${exitType === 'UPPER' ? 'text-green-600' : exitType === 'LOWER' ? 'text-red-500' : 'text-amber-600'}`}>
            {exitType}
          </p>
        </div>
        <div className="rounded bg-gray-100 p-2 dark:bg-gray-800">
          <span className="text-gray-500">Label</span>
          <p className={`font-bold ${label === 1 ? 'text-green-600' : 'text-red-500'}`}>
            {label === 1 ? '+1 (Long)' : '-1 (Short)'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Labeling() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Labeling Methods for Financial ML
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        In supervised ML for trading, the label (target variable) defines what the model
        learns to predict. Naive labeling (e.g., next-day return sign) introduces noise
        and path-dependency issues. Advanced labeling methods like the triple-barrier
        method and meta-labeling, adapted for Indian market microstructure and SEBI
        regulations, produce cleaner training signals.
      </p>

      <DefinitionBlock
        title="Triple-Barrier Method"
        label="Definition 12.2"
        definition="The triple-barrier method labels each observation by which of three barriers is touched first: (1) an upper horizontal barrier at entry_price * (1 + pt), yielding label +1 (profit-taking), (2) a lower horizontal barrier at entry_price * (1 - sl), yielding label -1 (stop-loss), or (3) a vertical barrier at t + max_holding, with the label determined by the sign of the return at expiry."
        notation="y_i = \begin{cases} +1 & \text{upper barrier hit first} \\ -1 & \text{lower barrier hit first} \\ \text{sign}(r_{t+h}) & \text{time barrier hit} \end{cases}"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Fixed-Horizon vs. Variable-Horizon Labels
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Fixed-horizon labeling assigns labels based on returns over a fixed window:
      </p>

      <BlockMath math="y_t = \text{sign}(r_{t, t+h}) = \text{sign}\left(\frac{P_{t+h} - P_t}{P_t}\right)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The triple-barrier method uses volatility-adjusted barriers, where the barrier
        width is scaled by daily volatility <InlineMath math="\sigma_{daily}" />:
      </p>

      <BlockMath math="\text{Upper} = P_t \cdot (1 + k_{up} \cdot \sigma_{daily,t}), \quad \text{Lower} = P_t \cdot (1 - k_{down} \cdot \sigma_{daily,t})" />

      <TheoremBlock
        title="Label Purity and Concurrency"
        label="Theorem 12.2"
        statement="When labels overlap in time (concurrent labels), the effective number of independent observations is reduced. The average uniqueness of label i is: \bar{u}_i = \frac{1}{|T_i|}\sum_{t \in T_i} \frac{1}{c_t}, where T_i is the set of time indices over which label i is active and c_t is the number of labels active at time t."
        proof="At time t, c_t labels share the same information. Each label's unique information content at t is 1/c_t. Averaging over the label's lifespan gives \bar{u}_i. This directly impacts sample weight computation: w_i \propto \bar{u}_i."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Meta-Labeling
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Meta-labeling is a two-stage approach where a primary model generates directional
        signals and a secondary (meta) model learns when to act:
      </p>

      <BlockMath math="y_t^{meta} = \begin{cases} 1 & \text{if primary model's bet is profitable} \\ 0 & \text{otherwise} \end{cases}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The meta-model outputs a probability <InlineMath math="p_t" /> that the primary
        bet will be profitable, enabling position sizing:
        <InlineMath math="\; \text{size}_t = (2p_t - 1) \cdot \text{max\_size}" />.
      </p>

      <NoteBlock title="Labeling for Indian Markets" type="tip">
        <ul className="space-y-1 text-sm">
          <li><strong>Circuit Breakers:</strong> SEBI circuit limits (5%, 10%, 20%) truncate
            returns, affecting barrier calibration</li>
          <li><strong>Nifty Expiry:</strong> F&O expiry days (last Thursday) create
            abnormal volatility -- use expiry-aware barriers</li>
          <li><strong>Trading Hours:</strong> NSE 9:15-15:30 IST, with pre-open session
            9:00-9:15. Label intraday strategies accordingly</li>
          <li><strong>T+1 Settlement:</strong> SEBI's T+1 settlement affects delivery-based
            strategy labels</li>
        </ul>
      </NoteBlock>

      <InteractiveTripleBarrier />

      <PythonCode
        title="labeling_methods.py"
        runnable
        code={`import numpy as np

class TripleBarrierLabeler:
    """Triple-barrier labeling for NSE equity data."""

    def __init__(self, prices, daily_vol=None):
        self.prices = np.array(prices, dtype=float)
        if daily_vol is None:
            rets = np.diff(np.log(self.prices))
            self.daily_vol = np.full(len(prices), np.std(rets))
            for i in range(20, len(rets)):
                self.daily_vol[i+1] = np.std(rets[i-20:i])
        else:
            self.daily_vol = np.array(daily_vol)

    def label(self, idx, pt_mult=2.0, sl_mult=2.0, max_holding=10):
        """Label a single observation using triple barrier."""
        entry = self.prices[idx]
        vol = self.daily_vol[idx]
        upper = entry * (1 + pt_mult * vol)
        lower = entry * (1 - sl_mult * vol)

        end_idx = min(idx + max_holding, len(self.prices) - 1)

        for t in range(idx + 1, end_idx + 1):
            if self.prices[t] >= upper:
                return {'label': 1, 'exit_day': t - idx,
                        'exit_type': 'upper', 'return': (self.prices[t] - entry) / entry}
            if self.prices[t] <= lower:
                return {'label': -1, 'exit_day': t - idx,
                        'exit_type': 'lower', 'return': (self.prices[t] - entry) / entry}

        final_ret = (self.prices[end_idx] - entry) / entry
        return {'label': 1 if final_ret > 0 else -1, 'exit_day': end_idx - idx,
                'exit_type': 'time', 'return': final_ret}

    def label_all(self, pt_mult=2.0, sl_mult=2.0, max_holding=10):
        """Label all valid observations."""
        labels = []
        for i in range(len(self.prices) - max_holding):
            result = self.label(i, pt_mult, sl_mult, max_holding)
            labels.append(result)
        return labels

    def compute_uniqueness(self, labels, max_holding):
        """Compute average uniqueness for concurrent labels."""
        n = len(labels)
        concurrency = np.zeros(len(self.prices))
        for i, lbl in enumerate(labels):
            for t in range(i, i + lbl['exit_day'] + 1):
                if t < len(self.prices):
                    concurrency[t] += 1

        uniqueness = []
        for i, lbl in enumerate(labels):
            times = range(i, min(i + lbl['exit_day'] + 1, len(self.prices)))
            u = np.mean([1.0 / concurrency[t] for t in times if concurrency[t] > 0])
            uniqueness.append(u)
        return uniqueness

# Simulate Nifty 50 price data
np.random.seed(42)
n = 252
rets = np.random.normal(0.0004, 0.013, n)
prices = 20000 * np.exp(np.cumsum(rets))

labeler = TripleBarrierLabeler(prices)
labels = labeler.label_all(pt_mult=2.0, sl_mult=2.0, max_holding=10)

# Statistics
n_labels = len(labels)
n_long = sum(1 for l in labels if l['label'] == 1)
n_short = sum(1 for l in labels if l['label'] == -1)
avg_ret = np.mean([l['return'] for l in labels])
exit_types = {}
for l in labels:
    exit_types[l['exit_type']] = exit_types.get(l['exit_type'], 0) + 1

uniqueness = labeler.compute_uniqueness(labels, 10)

print("=" * 55)
print("  Triple-Barrier Labeling - Nifty 50 Simulation")
print("=" * 55)
print(f"\\nTotal observations labeled: {n_labels}")
print(f"Long labels (+1):  {n_long} ({n_long/n_labels*100:.1f}%)")
print(f"Short labels (-1): {n_short} ({n_short/n_labels*100:.1f}%)")
print(f"Average return:    {avg_ret*100:.3f}%")
print(f"\\nExit Type Distribution:")
for etype, count in sorted(exit_types.items()):
    print(f"  {etype:<8} {count:>5} ({count/n_labels*100:.1f}%)")
print(f"\\nAverage label uniqueness: {np.mean(uniqueness):.3f}")
print(f"Min uniqueness:           {np.min(uniqueness):.3f}")
print(f"Effective samples:        {sum(uniqueness):.0f} / {n_labels}")`}
      />

      <ExampleBlock
        title="Triple Barrier Label for Nifty 50 Trade"
        difficulty="intermediate"
        problem="Entry price is INR 20,000 (Nifty 50). Daily volatility is 1.3%. Upper barrier at 2x vol, lower barrier at 2x vol, max holding 10 days. Over the next 5 days, Nifty moves: 20100, 20250, 20400, 20550, 20600. What is the label?"
        solution={[
          {
            step: 'Compute barrier levels',
            formula: 'Upper = 20000 \\times (1 + 2 \\times 0.013) = 20000 \\times 1.026 = 20520',
            explanation: 'Upper barrier at 20,520.',
          },
          {
            step: 'Lower barrier',
            formula: 'Lower = 20000 \\times (1 - 2 \\times 0.013) = 20000 \\times 0.974 = 19480',
            explanation: 'Lower barrier at 19,480.',
          },
          {
            step: 'Check barriers sequentially',
            formula: 'Day 1: 20100 < 20520,\\; Day 2: 20250 < 20520,\\; Day 3: 20400 < 20520',
            explanation: 'Neither barrier touched in days 1-3.',
          },
          {
            step: 'Day 4 touches upper barrier',
            formula: '20550 \\geq 20520 \\Rightarrow \\text{Label} = +1,\\; \\text{Exit type} = \\text{Upper}',
            explanation: 'Upper barrier hit on day 4 with return of 2.75%. Label is +1 (profitable long).',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Proper labeling is essential for financial ML success. The triple-barrier method
          produces cleaner labels than fixed-horizon approaches by adapting to volatility
          and incorporating realistic exit rules. Meta-labeling adds a second layer that
          learns when to trade versus when to abstain. For Indian markets, calibrate
          barriers using NSE intraday volatility, account for SEBI circuit limits, and
          adjust for F&O expiry-related volatility spikes.
        </p>
      </NoteBlock>
    </div>
  )
}
