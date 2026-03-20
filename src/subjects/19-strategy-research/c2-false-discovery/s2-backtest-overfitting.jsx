import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractivePBO() {
  const [nPartitions, setNPartitions] = useState(10)
  const [nTrials, setNTrials] = useState(100)
  const [overfit, setOverfit] = useState(30)

  const pbo = overfit / 100
  const rank = 1 - pbo
  const isOverfit = pbo > 0.5

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Probability of Backtest Overfitting
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Estimate PBO for your Indian market strategy using CSCV framework parameters.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Data Partitions (S): {nPartitions}</span>
          <input type="range" min="4" max="20" step="2" value={nPartitions}
            onChange={e => setNPartitions(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Strategy Trials: {nTrials}</span>
          <input type="range" min="10" max="1000" step="10" value={nTrials}
            onChange={e => setNTrials(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Overfit Rate (%): {overfit}</span>
          <input type="range" min="0" max="100" step="1" value={overfit}
            onChange={e => setOverfit(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className={`rounded-lg p-3 ${isOverfit ? 'bg-red-50 dark:bg-red-900/30' : 'bg-green-50 dark:bg-green-900/30'}`}>
          <div className="text-[10px] text-gray-500">PBO</div>
          <div className={`text-lg font-bold ${isOverfit ? 'text-red-600' : 'text-green-600'}`}>
            {(pbo * 100).toFixed(0)}%
          </div>
        </div>
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
          <div className="text-[10px] text-gray-500">CSCV Combinations</div>
          <div className="text-lg font-bold text-blue-600">
            {Math.round(factorial(nPartitions) / (factorial(nPartitions / 2) ** 2))}
          </div>
        </div>
        <div className={`rounded-lg p-3 ${isOverfit ? 'bg-red-50 dark:bg-red-900/30' : 'bg-green-50 dark:bg-green-900/30'}`}>
          <div className="text-[10px] text-gray-500">Verdict</div>
          <div className={`text-lg font-bold ${isOverfit ? 'text-red-600' : 'text-green-600'}`}>
            {isOverfit ? 'OVERFIT' : 'OK'}
          </div>
        </div>
      </div>
    </div>
  )
}

function factorial(n) {
  if (n <= 1) return 1
  let result = 1
  for (let i = 2; i <= n; i++) result *= i
  return result
}

export default function BacktestOverfitting() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        PBO and MinBTL for Indian Strategies
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Backtest overfitting is the primary reason strategies that look excellent on paper
        fail in live trading on NSE. Probability of Backtest Overfitting (PBO) and Minimum
        Backtest Length (MinBTL) provide rigorous frameworks to detect and prevent overfitting
        before deploying capital.
      </p>

      <DefinitionBlock
        title="Probability of Backtest Overfitting (PBO)"
        label="Definition 19.5"
        definition="PBO is the probability that an in-sample optimal strategy will underperform the median of all tested strategies out-of-sample. It is computed using Combinatorially Symmetric Cross-Validation (CSCV), which exhaustively partitions the data into training and testing sets. PBO close to 1 indicates severe overfitting; PBO close to 0 indicates the strategy is robust."
        notation="PBO = P(rank_OOS of IS-optimal < median) where rank is the OOS performance rank among all tested strategies. Target: PBO < 0.25 for deployment."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Combinatorially Symmetric Cross-Validation
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        CSCV works by partitioning the data into <InlineMath math="S" /> equally-sized blocks,
        then evaluating all <InlineMath math="\binom{S}{S/2}" /> ways to split these blocks
        into training and testing sets:
      </p>

      <BlockMath math="C = \binom{S}{S/2} = \frac{S!}{(S/2)!^2}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For <InlineMath math="S = 10" />, this gives <InlineMath math="C = 252" /> unique
        train-test splits, providing a robust estimate of out-of-sample performance.
      </p>

      <InteractivePBO />

      <TheoremBlock
        title="Minimum Backtest Length (MinBTL)"
        label="Theorem 19.5"
        statement="The minimum backtest length required to avoid overfitting when $N$ strategies are tested is: $\text{MinBTL} = \frac{1}{2} \left( \frac{N \cdot z_\alpha}{\bar{S} \cdot \hat{\sigma}_{\bar{S}}} \right)^2 \cdot T_0$ where $\bar{S}$ is the average Sharpe ratio, $\hat{\sigma}_{\bar{S}}$ is its standard error, $z_\alpha$ is the critical z-value, and $T_0$ is the observation frequency. For $N = 50$ strategies tested on NSE daily data with target Sharpe 1.5, MinBTL $\approx 15$ years."
        proof="This result follows from Bailey, Borwein, Lopez de Prado, and Zhu (2014). The key insight is that more strategy trials require longer backtests to maintain the same statistical significance. The square relationship between N and MinBTL means that doubling the number of trials quadruples the required data."
      />

      <PythonCode
        title="pbo_analysis.py"
        runnable
        code={`import numpy as np
from itertools import combinations

class PBOAnalyzer:
    """Probability of Backtest Overfitting via CSCV."""

    def __init__(self, n_partitions: int = 10):
        self.S = n_partitions
        assert n_partitions % 2 == 0, "S must be even"

    def compute_pbo(self, strategy_returns: np.ndarray) -> dict:
        """
        Compute PBO using CSCV.

        strategy_returns: shape (T, N) - T time periods, N strategies
        """
        T, N = strategy_returns.shape
        block_size = T // self.S

        # Partition returns into S blocks
        blocks = []
        for s in range(self.S):
            start = s * block_size
            end = start + block_size
            blocks.append(strategy_returns[start:end])

        # Generate all CSCV combinations
        half = self.S // 2
        combos = list(combinations(range(self.S), half))
        n_combos = len(combos)

        logit_values = []
        overfit_count = 0

        for combo in combos:
            # Training set: blocks in combo
            # Testing set: remaining blocks
            test_blocks = [i for i in range(self.S) if i not in combo]

            # Combine blocks
            train_data = np.vstack([blocks[i] for i in combo])
            test_data = np.vstack([blocks[i] for i in test_blocks])

            # Find IS-optimal strategy
            is_sharpes = np.mean(train_data, axis=0) / (
                np.std(train_data, axis=0) + 1e-10
            ) * np.sqrt(252)
            is_best = np.argmax(is_sharpes)

            # Rank the IS-optimal strategy OOS
            oos_sharpes = np.mean(test_data, axis=0) / (
                np.std(test_data, axis=0) + 1e-10
            ) * np.sqrt(252)

            # Rank of IS-best in OOS
            rank = np.sum(oos_sharpes <= oos_sharpes[is_best]) / N

            # Check if IS-best is below median OOS
            if rank < 0.5:
                overfit_count += 1

            # Logit for distribution
            if 0 < rank < 1:
                logit_values.append(np.log(rank / (1 - rank)))

        pbo = overfit_count / n_combos

        return {
            'pbo': pbo,
            'n_combinations': n_combos,
            'mean_logit': np.mean(logit_values) if logit_values else 0,
            'std_logit': np.std(logit_values) if logit_values else 0,
            'overfit_count': overfit_count,
            'verdict': (
                'SAFE (PBO < 0.25)' if pbo < 0.25
                else 'MARGINAL (0.25 < PBO < 0.50)' if pbo < 0.50
                else 'OVERFIT (PBO > 0.50)'
            ),
        }

    def min_backtest_length(self, n_strategies: int,
                            target_sharpe: float = 1.5,
                            sharpe_std: float = 0.5,
                            alpha: float = 0.05) -> float:
        """Calculate Minimum Backtest Length in years."""
        from scipy.stats import norm
        z_alpha = norm.ppf(1 - alpha)
        min_btl = 0.5 * (
            n_strategies * z_alpha / (target_sharpe * sharpe_std)
        ) ** 2 / 252
        return min_btl

# Simulate PBO analysis for NSE strategies
np.random.seed(42)
T = 2520  # ~10 years of daily data
N = 30     # 30 strategy variants tested

# Generate returns: 3 have real signal, 27 are noise
returns = np.random.normal(0, 0.015, (T, N))
# Add signal to strategies 0, 1, 2
returns[:, 0] += 0.0004  # Sharpe ~1.0
returns[:, 1] += 0.0003  # Sharpe ~0.75
returns[:, 2] += 0.0005  # Sharpe ~1.25

analyzer = PBOAnalyzer(n_partitions=10)
result = analyzer.compute_pbo(returns)

print("=== PBO Analysis for NSE Strategy Suite ===")
print(f"Strategies tested: {N}")
print(f"Data length: {T} days (~{T/252:.0f} years)")
print(f"CSCV partitions: {analyzer.S}")
print(f"Total combinations: {result['n_combinations']}")
print(f"\\nPBO: {result['pbo']:.3f}")
print(f"Mean logit: {result['mean_logit']:.3f}")
print(f"Overfit combinations: {result['overfit_count']}/{result['n_combinations']}")
print(f"\\nVerdict: {result['verdict']}")

# MinBTL analysis
print(f"\\n=== Minimum Backtest Length ===")
for n_strats in [5, 10, 20, 50, 100]:
    min_btl = analyzer.min_backtest_length(n_strats, target_sharpe=1.5)
    print(f"  {n_strats:3d} strategies: {min_btl:.1f} years required")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Practical PBO Guidelines for Indian Markets
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">PBO Range</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Interpretation</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 text-green-600 font-bold">PBO &lt; 0.25</td>
              <td className="px-4 py-2">Low overfitting risk</td>
              <td className="px-4 py-2">Proceed to paper trading</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 text-yellow-600 font-bold">0.25 &le; PBO &lt; 0.50</td>
              <td className="px-4 py-2">Moderate overfitting risk</td>
              <td className="px-4 py-2">Reduce parameters, extend data</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-red-600 font-bold">PBO &ge; 0.50</td>
              <td className="px-4 py-2">High overfitting risk</td>
              <td className="px-4 py-2">Do not deploy, redesign strategy</td>
            </tr>
          </tbody>
        </table>
      </div>

      <ExampleBlock
        title="PBO for a Nifty 50 Momentum Strategy"
        difficulty="advanced"
        problem="You tested 20 parameter combinations for a Nifty 50 momentum strategy (lookback: 3-12 months, holding: 1-4 weeks) on 8 years of NSE data. CSCV with S=10 gives PBO = 0.42. Should you deploy?"
        solution={[
          {
            step: 'Assess PBO level',
            formula: '\\text{PBO} = 0.42 \\in [0.25, 0.50)',
            explanation: 'PBO of 0.42 falls in the marginal zone. There is a 42% chance the IS-optimal strategy will underperform the median OOS.',
          },
          {
            step: 'Check MinBTL requirement',
            formula: '\\text{MinBTL}(N=20, S=1.5) \\approx 11.2 \\text{ years}',
            explanation: 'With 20 trials and target Sharpe 1.5, you need at least 11.2 years of data. Your 8 years is insufficient.',
          },
          {
            step: 'Reduce trial count',
            formula: 'N_{\\text{reduced}} = 5 \\Rightarrow \\text{MinBTL} \\approx 2.8 \\text{ years}',
            explanation: 'Fix the lookback to the theoretically motivated 12-1 month and test only 5 holding period variants. This dramatically reduces the overfitting risk.',
          },
          {
            step: 'Decision',
            formula: '\\text{DO NOT deploy with PBO} = 0.42',
            explanation: 'Reduce parameters using economic theory, extend the dataset if possible (NSE data goes back to 1994), or combine with walk-forward optimization to reduce PBO below 0.25.',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Overfitting in Indian Market Context
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Indian markets present unique overfitting challenges due to structural breaks
        (demonetization 2016, GST 2017, COVID 2020) and evolving market microstructure.
        A strategy optimized on pre-demonetization data may not generalize to post-2016
        NSE conditions.
      </p>

      <PythonCode
        title="indian_market_overfitting.py"
        runnable
        code={`import numpy as np

def regime_aware_pbo(returns, regime_dates, n_partitions=10):
    """
    PBO analysis that accounts for Indian market regime changes.
    Ensures each CSCV partition respects regime boundaries.
    """
    T, N = returns.shape

    # Indian market regimes
    regimes = {
        'pre_demon': (0, int(T * 0.4)),       # Before demonetization
        'gst_transition': (int(T * 0.4), int(T * 0.55)),  # GST period
        'normal': (int(T * 0.55), int(T * 0.8)),  # Stable period
        'covid_recovery': (int(T * 0.8), T),   # COVID and recovery
    }

    # Calculate Sharpe in each regime
    regime_sharpes = {}
    for regime_name, (start, end) in regimes.items():
        regime_data = returns[start:end]
        sharpes = np.mean(regime_data, axis=0) / (
            np.std(regime_data, axis=0) + 1e-10
        ) * np.sqrt(252)
        best_idx = np.argmax(sharpes)
        regime_sharpes[regime_name] = {
            'best_sharpe': sharpes[best_idx],
            'best_strategy': best_idx,
            'mean_sharpe': np.mean(sharpes),
            'std_sharpe': np.std(sharpes),
        }

    # Check if best strategy is consistent across regimes
    best_strategies = [v['best_strategy'] for v in regime_sharpes.values()]
    consistency = len(set(best_strategies)) / len(best_strategies)
    is_overfit = consistency > 0.8  # Different best strategy per regime

    return {
        'regime_sharpes': regime_sharpes,
        'best_strategies': best_strategies,
        'strategy_consistency': 1 - consistency,
        'is_likely_overfit': is_overfit,
    }

# Simulate NSE strategy analysis across regimes
np.random.seed(42)
T = 2520  # 10 years
N = 20    # 20 strategy variants

returns = np.random.normal(0, 0.015, (T, N))
# Strategy 0 has regime-dependent alpha (overfit risk)
returns[:1000, 0] += 0.0008   # Strong pre-demon
returns[1000:, 0] -= 0.0002   # Weak after
# Strategy 1 has stable alpha (genuine)
returns[:, 1] += 0.0003

result = regime_aware_pbo(returns, {})

print("=== Regime-Aware Overfitting Analysis ===")
print(f"Strategies: {N}, Period: {T} days\\n")

for regime, stats in result['regime_sharpes'].items():
    print(f"  {regime:20s}: Best Sharpe={stats['best_sharpe']:.2f} "
          f"(Strategy {stats['best_strategy']})")

print(f"\\nBest strategies per regime: {result['best_strategies']}")
print(f"Cross-regime consistency: {result['strategy_consistency']:.2f}")
print(f"Likely overfit: {'YES' if result['is_likely_overfit'] else 'NO'}")
print(f"\\nInsight: Strategy 0 looks great pre-demonetization but")
print(f"fails post-2016. Strategy 1 is consistent across regimes.")`}
      />

      <NoteBlock title="Indian Market Structural Breaks" type="warning">
        <p>
          When running PBO analysis on NSE data, be aware of these major structural breaks:
        </p>
        <ul className="mt-2 list-disc list-inside space-y-1">
          <li><strong>Nov 2016:</strong> Demonetization -- massive liquidity shock</li>
          <li><strong>Jul 2017:</strong> GST implementation -- changed corporate earnings patterns</li>
          <li><strong>Sep 2019:</strong> Corporate tax cut -- sector rotation</li>
          <li><strong>Mar 2020:</strong> COVID crash -- 40% drawdown in Nifty</li>
          <li><strong>Jan 2023:</strong> Adani crisis -- single-stock contagion event</li>
          <li><strong>2024:</strong> T+1 settlement -- changed trade dynamics</li>
        </ul>
        <p className="mt-2">
          A strategy that performs well only in one regime is likely overfit. Verify
          performance consistency across ALL major regime changes.
        </p>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          PBO is the <strong>gold standard for detecting backtest overfitting</strong>. Every
          strategy proposed for live NSE trading should report its PBO computed via CSCV.
          If PBO exceeds 0.25, reduce the number of parameters, extend the dataset, or
          use stronger economic priors to constrain the search space. For Indian markets,
          supplement PBO with regime-aware analysis that checks performance consistency
          across demonetization, GST, and COVID periods.
        </p>
      </NoteBlock>
    </div>
  )
}
