import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveSplitDesigner() {
  const [totalYears, setTotalYears] = useState(10)
  const [trainPct, setTrainPct] = useState(60)
  const [valPct, setValPct] = useState(20)
  const [embargoDays, setEmbargoDays] = useState(21)

  const testPct = 100 - trainPct - valPct
  const trainYears = (totalYears * trainPct / 100).toFixed(1)
  const valYears = (totalYears * valPct / 100).toFixed(1)
  const testYears = (totalYears * testPct / 100).toFixed(1)
  const embargoYears = (embargoDays / 252).toFixed(2)
  const effectiveTrainDays = Math.floor(totalYears * 252 * trainPct / 100 - embargoDays)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Train/Validation/Test Split Designer
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Design your data split for NSE strategy development with embargo periods.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Total Data: {totalYears} years</span>
          <input type="range" min="3" max="20" step="1" value={totalYears}
            onChange={e => setTotalYears(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Train: {trainPct}%</span>
          <input type="range" min="40" max="80" step="5" value={trainPct}
            onChange={e => setTrainPct(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Validation: {valPct}%</span>
          <input type="range" min="10" max="30" step="5" value={valPct}
            onChange={e => setValPct(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Embargo: {embargoDays} days</span>
          <input type="range" min="0" max="63" step="1" value={embargoDays}
            onChange={e => setEmbargoDays(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 600 80" className="w-full max-w-2xl mx-auto block" aria-label="Data split visualization">
        <rect x="10" y="20" width={trainPct * 5.5} height="40" rx="4" fill="#3b82f6" opacity="0.7" />
        <rect x={10 + trainPct * 5.5 + 2} y="20" width={10} height="40" rx="2" fill="#ef4444" opacity="0.5" />
        <rect x={22 + trainPct * 5.5} y="20" width={valPct * 5.5} height="40" rx="4" fill="#f59e0b" opacity="0.7" />
        <rect x={22 + trainPct * 5.5 + 2} y="20" width={10} height="40" rx="2" fill="#ef4444" opacity="0.5" />
        <rect x={34 + (trainPct + valPct) * 5.5} y="20" width={testPct * 5.5} height="40" rx="4" fill="#22c55e" opacity="0.7" />

        <text x={10 + trainPct * 2.75} y="45" textAnchor="middle" className="text-[10px] font-bold" fill="white">Train ({trainYears}y)</text>
        <text x={22 + trainPct * 5.5 + valPct * 2.75} y="45" textAnchor="middle" className="text-[10px] font-bold" fill="white">Val ({valYears}y)</text>
        <text x={34 + (trainPct + valPct) * 5.5 + testPct * 2.75} y="45" textAnchor="middle" className="text-[10px] font-bold" fill="white">Test ({testYears}y)</text>

        <text x="300" y="75" textAnchor="middle" className="text-[9px]" fill="#ef4444">Red bars = embargo gaps ({embargoDays} days)</text>
      </svg>

      <div className="mt-2 grid grid-cols-2 gap-2 text-center text-xs">
        <div className="rounded bg-blue-50 p-2 dark:bg-blue-900/20">
          <span className="text-gray-500">Effective train days: </span>
          <span className="font-bold text-blue-600">{effectiveTrainDays}</span>
        </div>
        <div className={`rounded p-2 ${testPct >= 15 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
          <span className="text-gray-500">Test set adequate: </span>
          <span className={`font-bold ${testPct >= 15 ? 'text-green-600' : 'text-red-600'}`}>
            {testPct >= 15 ? 'YES' : 'NO (need >= 15%)'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function OutOfSample() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Proper Train/Validation/Test Splits with Embargo
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The most fundamental safeguard against overfitting in strategy research is proper
        data splitting. For time-series financial data from NSE, standard cross-validation
        fails because of temporal dependencies. This section covers the correct approach
        to train/validation/test splitting with embargo periods.
      </p>

      <DefinitionBlock
        title="Purged Walk-Forward Validation"
        label="Definition 19.6"
        definition="Purged walk-forward validation is a time-series cross-validation method that (1) maintains temporal ordering (training data always precedes test data), (2) applies an embargo gap between training and testing periods to prevent information leakage from overlapping labels, and (3) purges any training observations whose labels overlap with the test period."
        notation="The embargo period d_embargo should be at least as long as the label look-ahead period. For a strategy using 21-day forward returns on NSE, d_embargo >= 21 trading days."
      />

      <InteractiveSplitDesigner />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Why Standard Cross-Validation Fails
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Standard k-fold cross-validation assumes i.i.d. data, which is violated in financial
        time series. Two critical problems arise:
      </p>

      <BlockMath math="\text{Problem 1: } y_t = f(X_t, X_{t+1}, \ldots, X_{t+h}) \quad \text{(label leakage)}" />
      <BlockMath math="\text{Problem 2: } \text{Corr}(r_t, r_{t+1}) \neq 0 \quad \text{(serial correlation)}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The embargo gap addresses both problems by creating a buffer zone between train
        and test data that exceeds the maximum temporal dependency.
      </p>

      <TheoremBlock
        title="Optimal Embargo Length"
        label="Theorem 19.6"
        statement="For a strategy with label horizon $h$ days and feature look-back $L$ days, the minimum embargo length is: $d_{\text{embargo}} = h + \max(L, \tau_{\text{decay}})$ where $\tau_{\text{decay}}$ is the autocorrelation decay time of the features. For NSE Nifty 50 daily strategies with $h = 21$ days and $L = 63$ days: $d_{\text{embargo}} \geq 84$ trading days (approximately 4 months)."
        proof="The label $y_t$ depends on prices up to $t+h$, so any training observation within $h$ days of the test set contains information about test labels. Similarly, features at time $t$ may use data from $t-L$ to $t$, creating backward dependency. The autocorrelation decay $\tau$ accounts for indirect information leakage through correlated features."
      />

      <PythonCode
        title="embargo_walk_forward.py"
        runnable
        code={`import numpy as np
from typing import List, Tuple

class PurgedWalkForwardCV:
    """Purged walk-forward cross-validation for NSE strategies."""

    def __init__(self, n_splits: int = 5, embargo_days: int = 21,
                 test_size_pct: float = 0.20):
        self.n_splits = n_splits
        self.embargo = embargo_days
        self.test_pct = test_size_pct

    def split(self, n_samples: int, label_horizon: int = 0
              ) -> List[Tuple[np.ndarray, np.ndarray]]:
        """Generate train/test splits with embargo."""
        splits = []
        test_size = int(n_samples * self.test_pct / self.n_splits)

        for i in range(self.n_splits):
            test_end = n_samples - i * test_size
            test_start = test_end - test_size

            if test_start < 0:
                break

            # Training: everything before test_start - embargo
            train_end = test_start - self.embargo - label_horizon
            train_indices = np.arange(0, max(0, train_end))
            test_indices = np.arange(test_start, test_end)

            if len(train_indices) < 100:  # Minimum training size
                break

            splits.append((train_indices, test_indices))

        return splits

    def visualize_splits(self, n_samples: int,
                         label_horizon: int = 0) -> str:
        """Create text visualization of splits."""
        splits = self.split(n_samples, label_horizon)
        lines = []

        for i, (train, test) in enumerate(splits):
            row = ['.'] * (n_samples // 10)
            for t in train[::10]:
                idx = t // 10
                if idx < len(row):
                    row[idx] = 'T'  # Train
            embargo_start = train[-1] if len(train) > 0 else 0
            embargo_end = test[0] if len(test) > 0 else 0
            for e in range(embargo_start // 10, embargo_end // 10 + 1):
                if 0 <= e < len(row):
                    row[e] = 'X'  # Embargo
            for t in test[::10]:
                idx = t // 10
                if idx < len(row):
                    row[idx] = 'V'  # Test/Validate
            lines.append(f"  Split {i+1}: {''.join(row)}")

        return '\\n'.join(lines)

class TimeSeriesSplitter:
    """Complete train/validation/test splitter for NSE data."""

    def __init__(self, train_pct=0.60, val_pct=0.20,
                 embargo_days=21):
        self.train_pct = train_pct
        self.val_pct = val_pct
        self.test_pct = 1 - train_pct - val_pct
        self.embargo = embargo_days

    def split(self, n_samples: int) -> dict:
        """Create three-way split with embargo gaps."""
        train_end = int(n_samples * self.train_pct)
        val_start = train_end + self.embargo
        val_end = int(n_samples * (self.train_pct + self.val_pct))
        test_start = val_end + self.embargo
        test_end = n_samples

        return {
            'train': (0, train_end),
            'embargo_1': (train_end, val_start),
            'validation': (val_start, val_end),
            'embargo_2': (val_end, test_start),
            'test': (test_start, test_end),
            'train_days': train_end,
            'val_days': val_end - val_start,
            'test_days': test_end - test_start,
            'embargo_total': 2 * self.embargo,
            'effective_data_pct': (
                (train_end + (val_end - val_start) +
                 (test_end - test_start)) / n_samples * 100
            ),
        }

# Demo: NSE data splitting
n_days = 2520  # 10 years of NSE trading days

# Walk-forward CV
wf_cv = PurgedWalkForwardCV(
    n_splits=5, embargo_days=21, test_size_pct=0.20
)

print("=== Purged Walk-Forward Cross-Validation ===")
print(f"Data: {n_days} days ({n_days/252:.0f} years)")
print(f"Embargo: {wf_cv.embargo} days")
print(f"Label horizon: 21 days (monthly returns)")
print()

splits = wf_cv.split(n_days, label_horizon=21)
for i, (train, test) in enumerate(splits):
    print(f"Split {i+1}:")
    print(f"  Train: days {train[0]}-{train[-1]} ({len(train)} days)")
    print(f"  Test:  days {test[0]}-{test[-1]} ({len(test)} days)")
    print(f"  Gap:   {test[0] - train[-1]} days")
    print()

print("Visualization (T=train, X=embargo, V=test):")
print(wf_cv.visualize_splits(n_days, label_horizon=21))

# Three-way split
print("\\n=== Train/Validation/Test Split ===")
splitter = TimeSeriesSplitter(
    train_pct=0.60, val_pct=0.20, embargo_days=21
)
split = splitter.split(n_days)

for key, val in split.items():
    if isinstance(val, tuple):
        print(f"  {key:15s}: days {val[0]}-{val[1]} ({val[1]-val[0]} days)")
    else:
        if isinstance(val, float):
            print(f"  {key:15s}: {val:.1f}%")
        else:
            print(f"  {key:15s}: {val} days")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Common Leakage Patterns in NSE Research
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Leakage Type</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Example</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Prevention</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Label leakage</td>
              <td className="px-4 py-2">Using future returns in training</td>
              <td className="px-4 py-2">Embargo &ge; label horizon</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Feature leakage</td>
              <td className="px-4 py-2">Normalization using full dataset</td>
              <td className="px-4 py-2">Fit normalizer on train only</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Survivorship bias</td>
              <td className="px-4 py-2">Using current Nifty 50 list historically</td>
              <td className="px-4 py-2">Point-in-time index constituents</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Look-ahead bias</td>
              <td className="px-4 py-2">Corporate action adjustments known ex-post</td>
              <td className="px-4 py-2">Use as-reported data</td>
            </tr>
          </tbody>
        </table>
      </div>

      <ExampleBlock
        title="Designing Splits for a Bank Nifty Options Strategy"
        difficulty="intermediate"
        problem="You are developing a Bank Nifty weekly options strategy using 5 years of daily data (1,260 days). Options have weekly expiry on Thursday. Design a proper train/val/test split."
        solution={[
          {
            step: 'Determine label horizon',
            formula: 'h = 5 \\text{ days (weekly options expiry cycle)}',
            explanation: 'Weekly options expire every Thursday, so the label horizon is 5 trading days.',
          },
          {
            step: 'Set embargo length',
            formula: 'd_{\\text{embargo}} = h + L = 5 + 10 = 15 \\text{ days}',
            explanation: 'With a 10-day feature lookback (2 weeks of Greeks/IV data), the embargo should be at least 15 days to prevent any information leakage.',
          },
          {
            step: 'Calculate splits',
            formula: '\\text{Train: } 756 \\text{ days} \\;|\\; \\text{Embargo: } 15 \\;|\\; \\text{Val: } 252 \\;|\\; \\text{Embargo: } 15 \\;|\\; \\text{Test: } 222',
            explanation: 'Using 60/20/20 split with embargo gaps. The effective data usage is 1,230/1,260 = 97.6% (30 days lost to embargo).',
          },
          {
            step: 'Align to expiry dates',
            formula: '\\text{Split boundaries must fall on expiry Thursdays}',
            explanation: 'Ensure split boundaries align with weekly expiry dates to avoid partial option cycles spanning the boundary. This is specific to F&O strategies on NSE.',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Walk-Forward Optimization for NSE
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Walk-forward optimization (WFO) extends the simple train/test split by re-fitting
        the model periodically as new data becomes available, mimicking live deployment:
      </p>

      <BlockMath math="\text{WFO}(t) = \text{fit}(X_{t-W:t-d}) \to \text{predict}(X_{t:t+S})" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="W" /> is the training window, <InlineMath math="d" /> is the
        embargo, and <InlineMath math="S" /> is the step-forward period. For NSE monthly
        strategies, typical parameters are <InlineMath math="W = 756" /> days (3 years),{' '}
        <InlineMath math="d = 21" /> days, and <InlineMath math="S = 63" /> days (quarterly refit).
      </p>

      <PythonCode
        title="walk_forward_nse.py"
        runnable
        code={`import numpy as np

class WalkForwardOptimizer:
    """Walk-forward optimization for NSE strategies."""

    def __init__(self, train_window: int = 756,
                 step_size: int = 63, embargo: int = 21):
        self.train_window = train_window
        self.step_size = step_size
        self.embargo = embargo

    def generate_windows(self, n_samples: int):
        """Generate walk-forward windows."""
        windows = []
        start = 0
        while start + self.train_window + self.embargo + self.step_size <= n_samples:
            train_end = start + self.train_window
            test_start = train_end + self.embargo
            test_end = test_start + self.step_size

            windows.append({
                'train': (start, train_end),
                'embargo': (train_end, test_start),
                'test': (test_start, min(test_end, n_samples)),
                'window_id': len(windows),
            })
            start += self.step_size
        return windows

    def run(self, returns: np.ndarray, signal_fn) -> dict:
        """Run walk-forward optimization."""
        T, N = returns.shape
        windows = self.generate_windows(T)
        oos_returns = []
        is_sharpes = []
        oos_sharpes = []

        for w in windows:
            train_data = returns[w['train'][0]:w['train'][1]]
            test_data = returns[w['test'][0]:w['test'][1]]

            # Find best strategy in-sample
            is_sr = np.mean(train_data, axis=0) / (
                np.std(train_data, axis=0) + 1e-10
            ) * np.sqrt(252)
            best = np.argmax(is_sr)
            is_sharpes.append(is_sr[best])

            # Evaluate OOS
            oos_ret = test_data[:, best]
            oos_returns.extend(oos_ret.tolist())
            oos_sr = np.mean(oos_ret) / (np.std(oos_ret) + 1e-10) * np.sqrt(252)
            oos_sharpes.append(oos_sr)

        oos_returns = np.array(oos_returns)
        wfo_sharpe = np.mean(oos_returns) / (
            np.std(oos_returns) + 1e-10
        ) * np.sqrt(252)

        return {
            'n_windows': len(windows),
            'wfo_sharpe': wfo_sharpe,
            'mean_is_sharpe': np.mean(is_sharpes),
            'mean_oos_sharpe': np.mean(oos_sharpes),
            'sharpe_decay': 1 - np.mean(oos_sharpes) / np.mean(is_sharpes),
            'oos_total_return': np.sum(oos_returns) * 100,
            'oos_max_dd': np.min(np.minimum.accumulate(
                np.cumprod(1 + oos_returns)
            ) / np.maximum.accumulate(
                np.cumprod(1 + oos_returns)
            ) - 1) * 100,
        }

# Run WFO on simulated NSE data
np.random.seed(42)
T, N = 2520, 15  # 10 years, 15 strategy variants
returns = np.random.normal(0, 0.015, (T, N))
returns[:, 0] += 0.0003  # Strategy 0 has weak but real signal
returns[:, 1] += 0.0004  # Strategy 1 has stronger signal

wfo = WalkForwardOptimizer(
    train_window=756, step_size=63, embargo=21
)
result = wfo.run(returns, signal_fn=None)

print("=== Walk-Forward Optimization Results ===")
print(f"Training window: {wfo.train_window} days")
print(f"Step size: {wfo.step_size} days")
print(f"Embargo: {wfo.embargo} days")
print(f"Walk-forward windows: {result['n_windows']}")
print(f"\\nMean IS Sharpe:  {result['mean_is_sharpe']:.2f}")
print(f"Mean OOS Sharpe: {result['mean_oos_sharpe']:.2f}")
print(f"WFO Sharpe:      {result['wfo_sharpe']:.2f}")
print(f"Sharpe decay:    {result['sharpe_decay']:.1%}")
print(f"OOS total return: {result['oos_total_return']:.1f}%")
print(f"OOS max drawdown: {result['oos_max_dd']:.1f}%")`}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Proper data splitting with embargo is <strong>the single most important step</strong>{' '}
          in preventing overfitting. For NSE strategies: (1) always maintain temporal ordering,
          (2) use embargo gaps at least as long as the label horizon plus feature lookback,
          (3) never normalize or fit any parameters using data from the validation or test
          periods, (4) treat the test set as sacred -- evaluate on it only once, and
          (5) use walk-forward optimization to simulate realistic strategy deployment with
          periodic refitting.
        </p>
      </NoteBlock>
    </div>
  )
}
