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
  const [totalDays, setTotalDays] = useState(1260)
  const [anchorStart, setAnchorStart] = useState(false)

  const numFolds = Math.floor((totalDays - trainWindow) / testWindow)
  const totalTestDays = numFolds * testWindow
  const coverageRatio = (totalTestDays / totalDays * 100).toFixed(1)

  const folds = []
  for (let i = 0; i < Math.min(numFolds, 6); i++) {
    const trainStart = anchorStart ? 0 : i * testWindow
    const trainEnd = (anchorStart ? 0 : i * testWindow) + trainWindow
    const testStart = trainEnd
    const testEnd = testStart + testWindow
    folds.push({ trainStart, trainEnd, testStart, testEnd })
  }

  const barWidth = 460 / totalDays

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Walk-Forward Windows on Nifty 50
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust training/test window sizes and see how walk-forward folds partition the data.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Train Window = {trainWindow} days</span>
          <input type="range" min="63" max="756" step="21" value={trainWindow}
            onChange={e => setTrainWindow(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Test Window = {testWindow} days</span>
          <input type="range" min="21" max="252" step="21" value={testWindow}
            onChange={e => setTestWindow(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Total = {totalDays} days (~{(totalDays / 252).toFixed(1)} yrs)</span>
          <input type="range" min="504" max="2520" step="252" value={totalDays}
            onChange={e => setTotalDays(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <input type="checkbox" checked={anchorStart}
            onChange={e => setAnchorStart(e.target.checked)}
            className="accent-indigo-500" />
          <span>Anchored (expanding window)</span>
        </label>
      </div>

      <svg viewBox="0 0 520 200" className="w-full max-w-xl mx-auto block" aria-label="Walk-forward folds">
        <text x="260" y="15" textAnchor="middle" className="text-[10px] font-semibold" fill="#6b7280">
          {numFolds} folds | Coverage: {coverageRatio}% | {anchorStart ? 'Anchored' : 'Rolling'}
        </text>

        {folds.map((fold, i) => {
          const y = 25 + i * 27
          return (
            <g key={i}>
              <text x="5" y={y + 13} className="text-[8px]" fill="#9ca3af">F{i + 1}</text>
              <rect x={30 + fold.trainStart * barWidth} y={y}
                width={Math.max((fold.trainEnd - fold.trainStart) * barWidth, 2)} height="18"
                fill="#6366f1" opacity="0.4" rx="2" />
              <rect x={30 + fold.testStart * barWidth} y={y}
                width={Math.max((fold.testEnd - fold.testStart) * barWidth, 2)} height="18"
                fill="#22c55e" opacity="0.5" rx="2" />
            </g>
          )
        })}

        <rect x="160" y="185" width="14" height="10" fill="#6366f1" opacity="0.4" rx="2" />
        <text x="178" y="194" className="text-[9px]" fill="#6b7280">Train</text>
        <rect x="220" y="185" width="14" height="10" fill="#22c55e" opacity="0.5" rx="2" />
        <text x="238" y="194" className="text-[9px]" fill="#6b7280">Test (OOS)</text>

        <line x1="30" y1="178" x2="490" y2="178" stroke="#d1d5db" strokeWidth="1" />
      </svg>
    </div>
  )
}

export default function WalkForwardAnalysis() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Walk-Forward Analysis on Nifty Strategies
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Walk-forward analysis (WFA) is the gold standard for validating trading
        strategies on non-stationary financial time series. It mimics the real-world
        process of periodically re-optimizing a strategy on recent data and then
        trading out-of-sample. For Indian markets, WFA must account for regime
        changes like demonetization (2016), COVID crash (2020), and SEBI regulatory
        shifts.
      </p>

      <DefinitionBlock
        title="Walk-Forward Analysis"
        label="Definition 8.6"
        definition="Walk-forward analysis partitions a time series into consecutive (train, test) pairs where each training window is used to optimize strategy parameters, and the subsequent test window evaluates out-of-sample performance. The final performance metric is the concatenation of all out-of-sample segments."
        notation={<>Given total data <InlineMath math="[0, T]" />, training window <InlineMath math="w" />, and test window <InlineMath math="h" />, the <InlineMath math="k" />-th fold uses train <InlineMath math="[kh, kh+w)" /> and test <InlineMath math="[kh+w, kh+w+h)" />.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Rolling vs. Anchored Walk-Forward
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Two variants exist. In <strong>rolling</strong> walk-forward, the training
        window slides forward maintaining fixed size <InlineMath math="w" />. In{' '}
        <strong>anchored</strong> (expanding) walk-forward, the training window starts
        from the beginning and grows with each fold:
      </p>

      <BlockMath math="\text{Rolling: } \mathcal{T}_k^{\text{train}} = [kh,\; kh + w), \quad \text{Anchored: } \mathcal{T}_k^{\text{train}} = [0,\; kh + w)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The Walk-Forward Efficiency (WFE) ratio measures how well in-sample performance
        translates to out-of-sample:
      </p>

      <BlockMath math="\text{WFE} = \frac{\text{OOS Annualized Return}}{\text{IS Annualized Return}} \times 100\%" />

      <TheoremBlock
        title="Optimal Training Window"
        label="Theorem 8.4"
        statement={<>For a mean-reverting strategy with half-life <InlineMath math="\tau" />, the optimal training window <InlineMath math="w^*" /> that minimizes the bias-variance tradeoff satisfies:</>}
        formula="w^* \approx \max\left(3\tau, \; \sqrt{\frac{2T}{\lambda}}\right)"
        proof={<>A shorter window reduces estimation bias (adapts to regime changes) but increases variance. For mean-reverting processes, at least <InlineMath math="3\tau" /> observations are needed to reliably estimate the half-life. The second term comes from the bias-variance decomposition where <InlineMath math="\lambda" /> captures the rate of parameter drift. For Nifty 50 strategies with typical half-lives of 20-60 days, this yields training windows of 180-504 days.</>}
      />

      <InteractiveWalkForward />

      <PythonCode
        title="walk_forward_nifty.py"
        runnable
        code={`import numpy as np
from dataclasses import dataclass

@dataclass
class WFAConfig:
    train_window: int = 252    # 1 year of trading days
    test_window: int = 63      # 1 quarter
    anchored: bool = False
    min_trades: int = 20

class WalkForwardAnalyzer:
    """Walk-Forward Analysis for Nifty 50 strategies."""

    def __init__(self, config: WFAConfig):
        self.config = config
        self.oos_returns = []

    def generate_folds(self, n_obs: int):
        """Generate train/test fold indices."""
        folds = []
        k = 0
        while True:
            if self.config.anchored:
                train_start = 0
            else:
                train_start = k * self.config.test_window
            train_end = k * self.config.test_window + self.config.train_window
            test_start = train_end
            test_end = test_start + self.config.test_window

            if test_end > n_obs:
                break

            folds.append({
                'fold': k + 1,
                'train': (train_start, train_end),
                'test': (test_start, test_end),
                'train_size': train_end - train_start,
            })
            k += 1
        return folds

    def compute_wfe(self, is_returns, oos_returns):
        """Walk-Forward Efficiency ratio."""
        is_annual = np.mean(is_returns) * 252
        oos_annual = np.mean(oos_returns) * 252
        if abs(is_annual) < 1e-8:
            return 0.0
        return (oos_annual / is_annual) * 100

# --- Demo: Nifty 50 Walk-Forward ---
np.random.seed(42)
n_days = 1260  # 5 years of NSE trading data

# Simulated Nifty 50 daily returns (mean ~12% annual, vol ~16%)
nifty_returns = np.random.normal(0.12/252, 0.16/np.sqrt(252), n_days)

# Add regime changes (demonetization-style shock, COVID crash)
nifty_returns[504:510] -= 0.03   # Regime shock
nifty_returns[756:775] -= 0.04   # COVID-like crash
nifty_returns[780:800] += 0.025  # Recovery rally

config = WFAConfig(train_window=252, test_window=63, anchored=False)
wfa = WalkForwardAnalyzer(config)
folds = wfa.generate_folds(n_days)

print("=== Walk-Forward Analysis: Nifty 50 SMA Strategy ===")
print(f"Total observations: {n_days} days ({n_days/252:.1f} years)")
print(f"Training window: {config.train_window} days")
print(f"Test window: {config.test_window} days")
print(f"Mode: {'Anchored' if config.anchored else 'Rolling'}")
print(f"Number of folds: {len(folds)}\\n")

all_oos_returns = []
for fold in folds:
    train_ret = nifty_returns[fold['train'][0]:fold['train'][1]]
    test_ret = nifty_returns[fold['test'][0]:fold['test'][1]]

    # Simple strategy: optimal lookback from training
    opt_lookback = max(10, int(np.argmax(
        np.cumsum(train_ret[-60:])) + 10))

    # Out-of-sample return
    oos_mean = np.mean(test_ret) * 252 * 100
    oos_vol = np.std(test_ret) * np.sqrt(252) * 100
    all_oos_returns.extend(test_ret)

    print(f"Fold {fold['fold']:2d}: Train [{fold['train'][0]:4d}-{fold['train'][1]:4d}] "
          f"Test [{fold['test'][0]:4d}-{fold['test'][1]:4d}] "
          f"OOS Return: {oos_mean:+6.1f}% | Vol: {oos_vol:5.1f}%")

# Summary
concat_return = np.mean(all_oos_returns) * 252 * 100
concat_sharpe = np.mean(all_oos_returns) / np.std(all_oos_returns) * np.sqrt(252)
print(f"\\n--- Concatenated OOS Performance ---")
print(f"Annualized Return: {concat_return:+.2f}%")
print(f"Sharpe Ratio:      {concat_sharpe:.3f}")
print(f"Coverage:          {len(all_oos_returns)/n_days*100:.1f}%")`}
      />

      <ExampleBlock
        title="Nifty Momentum Walk-Forward"
        difficulty="intermediate"
        problem="You have 5 years of Nifty 50 data (1,260 trading days). Using a rolling walk-forward with 1-year training and 3-month test windows, how many OOS folds do you get? What percentage of data is used for OOS evaluation?"
        solution={[
          {
            step: 'Calculate number of folds',
            formula: 'K = \\lfloor \\frac{T - w}{h} \\rfloor = \\lfloor \\frac{1260 - 252}{63} \\rfloor = \\lfloor 16 \\rfloor = 16',
            explanation: 'Each fold advances by the test window size (63 days = 1 quarter).',
          },
          {
            step: 'Calculate total OOS coverage',
            formula: '\\text{OOS days} = K \\times h = 16 \\times 63 = 1008 \\text{ days}',
          },
          {
            step: 'Compute coverage ratio',
            formula: '\\text{Coverage} = \\frac{1008}{1260} \\times 100\\% = 80\\%',
            explanation: '80% of the data is evaluated out-of-sample, giving a robust performance estimate.',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Common Pitfalls in Walk-Forward
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Pitfall</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Symptom</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Solution</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Window too short</td>
              <td className="px-4 py-2">High variance in OOS returns</td>
              <td className="px-4 py-2">Increase to {'>'}3x strategy half-life</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Window too long</td>
              <td className="px-4 py-2">Poor adaptation to regimes</td>
              <td className="px-4 py-2">Use rolling (not anchored) mode</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Lookahead in features</td>
              <td className="px-4 py-2">IS/OOS gap {'<'} 10%</td>
              <td className="px-4 py-2">Audit feature computation timestamps</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Survivorship bias</td>
              <td className="px-4 py-2">Inflated returns on mid/small caps</td>
              <td className="px-4 py-2">Use point-in-time Nifty 200 constituents</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Ignoring costs</td>
              <td className="px-4 py-2">OOS Sharpe drops {'>'} 50%</td>
              <td className="px-4 py-2">Include STT, stamp, slippage in OOS eval</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Regime-Aware Walk-Forward
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Indian markets exhibit distinct regimes driven by macro events. A
        regime-aware WFA uses a hidden Markov model or India VIX threshold to
        define regimes and reports OOS performance separately for each:
      </p>

      <BlockMath math="\text{WFE}_{\text{regime}} = \frac{\text{OOS Return in Regime } k}{\text{IS Return in Regime } k} \times 100\%" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Common regime definitions for NSE:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Regime</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">India VIX Range</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Nifty Behaviour</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Historical %</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Low Vol Bull</td>
              <td className="px-4 py-2">{'<'} 14</td>
              <td className="px-4 py-2">Steady uptrend</td>
              <td className="px-4 py-2">~40%</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Normal</td>
              <td className="px-4 py-2">14 - 22</td>
              <td className="px-4 py-2">Range-bound</td>
              <td className="px-4 py-2">~35%</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">High Vol</td>
              <td className="px-4 py-2">22 - 35</td>
              <td className="px-4 py-2">Corrective / choppy</td>
              <td className="px-4 py-2">~20%</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Crisis</td>
              <td className="px-4 py-2">{'>'} 35</td>
              <td className="px-4 py-2">Sharp sell-off</td>
              <td className="px-4 py-2">~5%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <NoteBlock title="Historical Context" type="historical">
        <ul className="space-y-2">
          <li>
            <strong>2008 GFC:</strong> Nifty fell 60% peak-to-trough. Walk-forward
            strategies trained only on 2003-2007 bull market data failed catastrophically
            out-of-sample during this regime change.
          </li>
          <li>
            <strong>2016 Demonetization:</strong> A sudden policy shock that standard
            rolling windows could not anticipate, demonstrating the need for
            regime-aware WFA.
          </li>
          <li>
            <strong>2020 COVID:</strong> India VIX spiked to 83, the highest ever. Strategies
            must be tested across this full VIX range to claim robustness.
          </li>
        </ul>
      </NoteBlock>

      <NoteBlock title="Indian Market Considerations" type="tip">
        <p>
          When applying walk-forward analysis to Indian equities, align fold boundaries with
          NSE calendar quarters (Apr-Jun, Jul-Sep, Oct-Dec, Jan-Mar) to match the Indian
          financial year. Also consider that major events like Union Budget (February),
          RBI policy announcements (bi-monthly), and F&O expiry weeks (monthly) can create
          regime shifts that affect fold performance differently.
        </p>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Walk-forward analysis is the most realistic backtest validation method because it
          mimics the actual workflow of a quant: optimize, deploy, observe, re-optimize.
          The <strong>Walk-Forward Efficiency</strong> ratio is your single most important
          metric -- a WFE above 50% indicates a robust strategy, while WFE below 30%
          suggests overfitting to in-sample data.
        </p>
      </NoteBlock>
    </div>
  )
}
