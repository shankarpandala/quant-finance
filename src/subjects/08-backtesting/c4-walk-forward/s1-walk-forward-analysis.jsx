import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveWalkForward() {
  const [trainWindow, setTrainWindow] = useState(252)
  const [testWindow, setTestWindow] = useState(63)
  const [totalDays, setTotalDays] = useState(2520)

  const nFolds = Math.floor((totalDays - trainWindow) / testWindow)
  const coverage = Math.min(100, (nFolds * testWindow / totalDays) * 100)
  const trainPct = (trainWindow / (trainWindow + testWindow) * 100).toFixed(0)

  const folds = []
  for (let i = 0; i < Math.min(nFolds, 8); i++) {
    folds.push({
      trainStart: i * testWindow,
      trainEnd: i * testWindow + trainWindow,
      testStart: i * testWindow + trainWindow,
      testEnd: i * testWindow + trainWindow + testWindow,
    })
  }

  const chartW = 500, chartH = 120, padL = 40
  const scale = (chartW - padL) / totalDays

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Walk-Forward Analysis Windows
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Visualize the rolling train/test split for validating a Nifty strategy.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Training Window = {trainWindow} days ({(trainWindow / 252).toFixed(1)} yr)</span>
          <input type="range" min="63" max="1260" step="63" value={trainWindow}
            onChange={e => setTrainWindow(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Test Window = {testWindow} days ({(testWindow / 252).toFixed(1)} yr)</span>
          <input type="range" min="21" max="252" step="21" value={testWindow}
            onChange={e => setTestWindow(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Total Data = {totalDays} days ({(totalDays / 252).toFixed(0)} yr)</span>
          <input type="range" min="504" max="5040" step="252" value={totalDays}
            onChange={e => setTotalDays(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox={`0 0 ${chartW + 20} ${chartH}`}
        className="w-full max-w-2xl mx-auto block" aria-label="Walk-forward windows">
        {folds.map((f, i) => (
          <g key={i}>
            <rect x={padL + f.trainStart * scale} y={5 + i * 14}
              width={(f.trainEnd - f.trainStart) * scale} height={12}
              fill="#a5b4fc" rx="2" />
            <rect x={padL + f.testStart * scale} y={5 + i * 14}
              width={(f.testEnd - f.testStart) * scale} height={12}
              fill="#6366f1" rx="2" />
          </g>
        ))}
        <text x={padL} y={chartH - 5} className="text-[9px]" fill="#9ca3af">
          Blue: train | Purple: test | {nFolds} folds | {coverage.toFixed(0)}% coverage
        </text>
      </svg>

      <div className="mt-3 grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Folds</div>
          <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{nFolds}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Train/Test Ratio</div>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{trainPct}%/{100 - trainPct}%</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">OOS Coverage</div>
          <div className="text-lg font-bold text-green-600 dark:text-green-400">{coverage.toFixed(0)}%</div>
        </div>
      </div>
    </div>
  )
}

export default function WalkForwardAnalysis() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Walk-Forward Analysis
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Walk-forward analysis (WFA) is the gold standard for strategy validation. It simulates
        the realistic process of optimizing parameters on past data and testing on unseen future
        data, rolling this window forward through time. For Nifty strategies, WFA provides a much
        more honest assessment of expected performance than single-split train/test validation.
      </p>

      <DefinitionBlock
        title="Walk-Forward Analysis"
        label="Definition 8.10"
        definition="Walk-forward analysis divides historical data into sequential train-test windows. In each fold: (1) optimize strategy parameters on the training window, (2) test with the optimal parameters on the out-of-sample window, (3) advance both windows forward. The concatenated out-of-sample results represent realistic expected performance."
        notation="\text{OOS P\&L} = \bigoplus_{k=1}^{K} \text{P\&L}(\theta_k^*, D_k^{\text{test}}), \quad \theta_k^* = \arg\max_\theta \text{Perf}(\theta, D_k^{\text{train}})"
      />

      <BlockMath math="\text{WFA Sharpe} = \text{Sharpe}\!\left(\bigoplus_{k=1}^{K} r_{k,t}^{\text{OOS}}\right) \leq \text{In-Sample Sharpe}" />

      <TheoremBlock
        title="Walk-Forward Efficiency"
        label="Theorem 8.9"
        statement="The Walk-Forward Efficiency (WFE) ratio measures how well in-sample performance translates to out-of-sample results: WFE = SR_{\text{OOS}} / SR_{\text{IS}}. A WFE above 0.5 indicates a reasonably robust strategy. WFE below 0.3 suggests severe overfitting."
        proof="WFE is bounded by [0, 1] for a well-calibrated model. If the strategy captures genuine market inefficiency, the in-sample and out-of-sample Sharpe ratios should be comparable (WFE near 1). The gap SR_{\text{IS}} - SR_{\text{OOS}} represents the overfitting component. Systematic WFE < 0.3 across multiple walk-forward folds implies the in-sample optimization is fitting noise."
      />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">WFE Range</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Interpretation</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">&gt; 0.7</td>
              <td className="px-4 py-2">Excellent robustness</td>
              <td className="px-4 py-2">Proceed with caution</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">0.5 - 0.7</td>
              <td className="px-4 py-2">Acceptable</td>
              <td className="px-4 py-2">Consider simplification</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">0.3 - 0.5</td>
              <td className="px-4 py-2">Weak signal</td>
              <td className="px-4 py-2">Reduce parameters</td>
            </tr>
            <tr>
              <td className="px-4 py-2">&lt; 0.3</td>
              <td className="px-4 py-2">Likely overfit</td>
              <td className="px-4 py-2">Reject strategy</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveWalkForward />

      <PythonCode
        title="walk_forward_analysis.py"
        runnable
        code={`import numpy as np

np.random.seed(42)

def momentum_strategy(prices, lookback):
    """Simple momentum: long if past return > 0."""
    n = len(prices)
    signals = np.zeros(n)
    for i in range(lookback, n):
        ret = (prices[i] - prices[i-lookback]) / prices[i-lookback]
        signals[i] = 1 if ret > 0 else -1
    returns = np.diff(prices) / prices[:-1]
    strat_returns = signals[:-1] * returns
    return strat_returns

def walk_forward_analysis(prices, train_window, test_window, param_range):
    """Walk-forward optimization and testing."""
    n = len(prices)
    oos_returns = []
    is_sharpes = []
    oos_sharpes = []
    folds = []

    start = 0
    while start + train_window + test_window <= n:
        train_end = start + train_window
        test_end = train_end + test_window

        train_prices = prices[start:train_end]
        test_prices = prices[train_end:test_end]

        # Optimize: find best lookback on training data
        best_sharpe = -np.inf
        best_param = param_range[0]
        for lb in param_range:
            ret = momentum_strategy(train_prices, lb)
            if len(ret) > 0 and np.std(ret) > 0:
                sr = np.mean(ret) / np.std(ret) * np.sqrt(252)
                if sr > best_sharpe:
                    best_sharpe = sr
                    best_param = lb

        # Test: apply best param to test data
        test_ret = momentum_strategy(test_prices, best_param)
        if len(test_ret) > 0 and np.std(test_ret) > 0:
            test_sr = np.mean(test_ret) / np.std(test_ret) * np.sqrt(252)
        else:
            test_sr = 0

        oos_returns.extend(test_ret.tolist())
        is_sharpes.append(best_sharpe)
        oos_sharpes.append(test_sr)
        folds.append({
            'train': (start, train_end),
            'test': (train_end, test_end),
            'best_param': best_param,
            'is_sharpe': best_sharpe,
            'oos_sharpe': test_sr,
        })

        start += test_window

    return folds, np.array(oos_returns)

# Generate Nifty-like data (10 years)
n_days = 2520
nifty = 15000 * np.exp(np.cumsum(np.random.normal(0.0003, 0.013, n_days)))

# Run walk-forward
param_range = [5, 10, 15, 20, 30, 40, 60]
folds, oos_returns = walk_forward_analysis(
    nifty, train_window=504, test_window=126, param_range=param_range
)

print("=== Walk-Forward Analysis: Nifty Momentum ===")
print(f"Train: 2 years | Test: 6 months | Params: {param_range}")
print(f"Total folds: {len(folds)}")
print()

print(f"{'Fold':>5} {'Best LB':>8} {'IS Sharpe':>10} {'OOS Sharpe':>12} {'WFE':>8}")
print("-" * 48)
for i, f in enumerate(folds):
    wfe = f['oos_sharpe'] / f['is_sharpe'] if f['is_sharpe'] > 0 else 0
    print(f"{i+1:>5} {f['best_param']:>8} {f['is_sharpe']:>10.2f} "
          f"{f['oos_sharpe']:>12.2f} {wfe:>8.2f}")

# Aggregate results
avg_is = np.mean([f['is_sharpe'] for f in folds])
avg_oos = np.mean([f['oos_sharpe'] for f in folds])
wfe = avg_oos / avg_is if avg_is > 0 else 0

oos_sharpe = (np.mean(oos_returns) / np.std(oos_returns) * np.sqrt(252)
              if np.std(oos_returns) > 0 else 0)

print(f"\\n=== Summary ===")
print(f"Avg IS Sharpe:      {avg_is:.2f}")
print(f"Avg OOS Sharpe:     {avg_oos:.2f}")
print(f"Combined OOS Sharpe: {oos_sharpe:.2f}")
print(f"Walk-Forward Efficiency: {wfe:.2f}")
print(f"Verdict: {'ACCEPTABLE' if wfe > 0.5 else 'WEAK - possible overfit' if wfe > 0.3 else 'REJECT - overfit'}")`}
      />

      <ExampleBlock
        title="Walk-Forward Window Selection for Nifty"
        difficulty="intermediate"
        problem="You have 5 years of Nifty daily data (1260 days). You want at least 10 walk-forward folds with a 3:1 train-to-test ratio. What window sizes should you use?"
        solution={[
          {
            step: 'Set up the constraint',
            formula: '\\text{train} + \\text{test} \\leq \\frac{1260}{1} \\text{ and test} \\times 10 \\leq 1260',
          },
          {
            step: 'From 10 folds',
            formula: '\\text{test} \\leq \\frac{1260 - \\text{train}}{10} \\leq 126',
          },
          {
            step: 'With 3:1 ratio',
            formula: '\\text{train} = 3 \\times \\text{test} \\implies \\text{test} = 126, \\text{train} = 378',
          },
          {
            step: 'Verify coverage',
            formula: '\\text{Folds} = \\lfloor(1260 - 378)/126\\rfloor = 7',
            explanation: 'Only 7 folds with these parameters. To get 10 folds, reduce test to 63 days (quarterly) and train to 189 days (9 months). But 189 days may be too short for stable optimization.',
          },
        ]}
      />

      <NoteBlock title="Anchored vs Sliding Window" type="tip">
        <p>
          Two variants of walk-forward: (1) <strong>Sliding window</strong>: training window moves
          forward, always the same size. (2) <strong>Anchored/expanding window</strong>: training
          always starts from day 1, growing larger. For Nifty strategies, use sliding windows if
          you believe market regimes change (recent data is more relevant). Use anchored windows
          if you want maximum data for parameter estimation. The sliding approach is generally
          preferred for Indian markets due to significant structural changes over time.
        </p>
      </NoteBlock>

      <NoteBlock title="Combinatorial Purged Cross-Validation" type="warning">
        <p>
          Standard walk-forward assumes non-overlapping train/test. For strategies with holding
          periods longer than the test window, information can leak between folds. The next
          section covers Purged Cross-Validation (de Prado, 2018) which addresses this by
          adding embargo periods between train and test sets. This is critical for momentum
          strategies on Nifty with 20-60 day holding periods.
        </p>
      </NoteBlock>
    </div>
  )
}
