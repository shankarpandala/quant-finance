import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveMonteCarloValidation() {
  const [observedSharpe, setObservedSharpe] = useState(1.5)
  const [nSimulations, setNSimulations] = useState(1000)
  const [nTrades, setNTrades] = useState(200)

  const se = 1 / Math.sqrt(nTrades / 252)
  const seed = Math.floor(observedSharpe * 1000 + nSimulations)
  const mulberry = (a) => { return () => { let t = a += 0x6D2B79F5; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296 } }
  const rng = mulberry(seed)

  const randomSharpes = Array.from({ length: Math.min(nSimulations, 500) }, () => {
    let u1 = rng(), u2 = rng()
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2) * se
  })

  const exceedCount = randomSharpes.filter(s => s >= observedSharpe).length
  const pValue = exceedCount / randomSharpes.length

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Monte Carlo Permutation Test
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Test whether your observed Sharpe ratio could have arisen by chance through random permutation.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Observed Sharpe = {observedSharpe.toFixed(1)}</span>
          <input type="range" min="0.3" max="3.0" step="0.1" value={observedSharpe}
            onChange={e => setObservedSharpe(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Simulations = {nSimulations}</span>
          <input type="range" min="100" max="10000" step="100" value={nSimulations}
            onChange={e => setNSimulations(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Trades = {nTrades}</span>
          <input type="range" min="50" max="1000" step="25" value={nTrades}
            onChange={e => setNTrades(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">MC p-value</div>
          <div className={`text-lg font-bold ${pValue < 0.05 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {pValue.toFixed(3)}
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Exceeding Sims</div>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{exceedCount}/{randomSharpes.length}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Verdict</div>
          <div className={`text-sm font-bold ${pValue < 0.05 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {pValue < 0.05 ? 'SIGNIFICANT' : 'NOT SIGNIFICANT'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MonteCarloValidation() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Monte Carlo Validation
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Monte Carlo methods provide non-parametric tests for strategy robustness. By simulating
        thousands of random variations -- shuffled returns, randomized entry dates, or synthetic
        price paths -- we can assess whether a strategy's performance is genuinely significant
        or merely a product of the specific historical path. This is critical for Nifty strategies
        where the limited history makes parametric tests unreliable.
      </p>

      <DefinitionBlock
        title="Monte Carlo Permutation Test"
        label="Definition 8.12"
        definition="A Monte Carlo permutation test assesses strategy significance by randomly shuffling the order of returns and recomputing the strategy's Sharpe ratio. The p-value is the fraction of shuffled Sharpe ratios that exceed the observed Sharpe. This test is non-parametric and makes no distributional assumptions."
        notation="p = \frac{1}{B}\sum_{b=1}^{B} \mathbb{1}[SR(\pi_b(r)) \geq SR_{\text{observed}}]"
      />

      <BlockMath math="\text{MC p-value} = \frac{\#\{b : SR_b^{\text{shuffled}} \geq SR_{\text{observed}}\}}{B}" />

      <TheoremBlock
        title="Validity of the Permutation Test"
        label="Theorem 8.11"
        statement="Under the null hypothesis that the trading signal is independent of future returns, the permutation test has exact size \alpha: P(\text{reject} | H_0) = \alpha. This holds regardless of the return distribution (non-normal, fat-tailed, skewed) -- a crucial advantage for Nifty returns which exhibit all these features."
        proof="Under H_0, the signal is independent of returns, so any permutation of returns is equally likely given the signal. The observed test statistic is exchangeable with the B permuted statistics, making the permutation p-value exactly uniformly distributed under H_0. Therefore, rejecting at level \alpha gives exact size \alpha."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Types of Monte Carlo Validation
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Method</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">What It Shuffles</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Tests For</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Return shuffling</td>
              <td className="px-4 py-2">Order of daily returns</td>
              <td className="px-4 py-2">Signal-return dependency</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Trade shuffling</td>
              <td className="px-4 py-2">Order of trade P&Ls</td>
              <td className="px-4 py-2">Sequence independence</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Bootstrap</td>
              <td className="px-4 py-2">Sample with replacement</td>
              <td className="px-4 py-2">Confidence intervals</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Synthetic paths</td>
              <td className="px-4 py-2">Generate new price paths</td>
              <td className="px-4 py-2">Path dependency</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveMonteCarloValidation />

      <PythonCode
        title="monte_carlo_validation.py"
        runnable
        code={`import numpy as np

np.random.seed(42)

def momentum_pnl(returns, lookback=20):
    """Compute momentum strategy P&L."""
    n = len(returns)
    signals = np.zeros(n)
    prices = np.cumprod(1 + returns)
    for i in range(lookback, n):
        signals[i] = 1 if prices[i] > prices[i-lookback] else -1
    return signals[:-1] * returns[1:]

def compute_sharpe(pnl):
    if len(pnl) == 0 or np.std(pnl) == 0:
        return 0
    return np.mean(pnl) / np.std(pnl) * np.sqrt(252)

# Generate Nifty-like returns
n_days = 1260
nifty_returns = np.random.normal(0.0005, 0.013, n_days)

# Actual strategy performance
actual_pnl = momentum_pnl(nifty_returns, lookback=20)
actual_sharpe = compute_sharpe(actual_pnl)

print("=== Monte Carlo Validation: Nifty Momentum ===")
print(f"Observed Sharpe: {actual_sharpe:.3f}")

# Test 1: Return Shuffling (Permutation Test)
B = 5000
shuffled_sharpes = np.zeros(B)
for b in range(B):
    shuffled_returns = np.random.permutation(nifty_returns)
    shuffled_pnl = momentum_pnl(shuffled_returns, lookback=20)
    shuffled_sharpes[b] = compute_sharpe(shuffled_pnl)

p_value = np.mean(shuffled_sharpes >= actual_sharpe)
print(f"\\n--- Test 1: Return Permutation ---")
print(f"Simulations: {B}")
print(f"p-value: {p_value:.4f}")
print(f"{'SIGNIFICANT' if p_value < 0.05 else 'NOT SIGNIFICANT'} at 5% level")
print(f"Shuffled SR: mean={np.mean(shuffled_sharpes):.3f}, "
      f"std={np.std(shuffled_sharpes):.3f}")

# Test 2: Bootstrap Confidence Interval
bootstrap_sharpes = np.zeros(B)
for b in range(B):
    idx = np.random.choice(len(actual_pnl), len(actual_pnl), replace=True)
    bootstrap_sharpes[b] = compute_sharpe(actual_pnl[idx])

ci_low = np.percentile(bootstrap_sharpes, 2.5)
ci_high = np.percentile(bootstrap_sharpes, 97.5)
print(f"\\n--- Test 2: Bootstrap CI ---")
print(f"95% CI for Sharpe: [{ci_low:.3f}, {ci_high:.3f}]")
print(f"{'CI excludes zero -> significant' if ci_low > 0 else 'CI includes zero -> not significant'}")

# Test 3: Synthetic Path Simulation (GBM)
print(f"\\n--- Test 3: Synthetic GBM Paths ---")
mu = np.mean(nifty_returns) * 252
sigma = np.std(nifty_returns) * np.sqrt(252)
synthetic_sharpes = np.zeros(1000)

for b in range(1000):
    syn_returns = np.random.normal(mu/252, sigma/np.sqrt(252), n_days)
    syn_pnl = momentum_pnl(syn_returns, lookback=20)
    synthetic_sharpes[b] = compute_sharpe(syn_pnl)

p_synth = np.mean(synthetic_sharpes >= actual_sharpe)
print(f"Across 1000 synthetic Nifty paths:")
print(f"P(synthetic SR >= observed): {p_synth:.4f}")
print(f"Median synthetic SR: {np.median(synthetic_sharpes):.3f}")

# Test 4: Maximum Drawdown distribution
print(f"\\n--- Test 4: Drawdown Bootstrap ---")
cum_pnl = np.cumsum(actual_pnl)
running_max = np.maximum.accumulate(cum_pnl)
actual_maxdd = np.min(cum_pnl - running_max)

dd_boots = np.zeros(B)
for b in range(B):
    idx = np.random.choice(len(actual_pnl), len(actual_pnl), replace=True)
    boot_cum = np.cumsum(actual_pnl[idx])
    boot_max = np.maximum.accumulate(boot_cum)
    dd_boots[b] = np.min(boot_cum - boot_max)

dd_ci = np.percentile(dd_boots, [5, 50, 95])
print(f"Actual Max DD: {actual_maxdd:.2f}")
print(f"Bootstrap DD 5th/50th/95th: {dd_ci[0]:.2f} / {dd_ci[1]:.2f} / {dd_ci[2]:.2f}")`}
      />

      <ExampleBlock
        title="Is This Nifty Strategy Real?"
        difficulty="advanced"
        problem="A momentum strategy on Nifty shows Sharpe = 0.85 over 5 years. Monte Carlo permutation test gives p-value = 0.08. Bootstrap 95% CI for Sharpe is [-0.15, 1.65]. Should you trade it?"
        solution={[
          {
            step: 'Assess statistical significance',
            formula: 'p = 0.08 > 0.05 \\implies \\text{not significant at 5\\%}',
            explanation: 'The permutation test fails to reject the null that returns are random.',
          },
          {
            step: 'Examine confidence interval',
            formula: 'CI = [-0.15, 1.65] \\ni 0',
            explanation: 'The 95% CI includes zero, confirming that a zero-Sharpe strategy is consistent with the data.',
          },
          {
            step: 'Decision',
            formula: '\\text{DO NOT TRADE (as is)}',
            explanation: 'Both tests suggest insufficient evidence for a genuine edge. Options: (1) gather more data, (2) simplify the strategy to reduce variance, (3) test on Bank Nifty as an independent dataset. A Sharpe of 0.85 over 5 years (~1260 days) has t-stat = 0.85 x sqrt(5) = 1.90, which is below the 1.96 threshold.',
          },
        ]}
      />

      <NoteBlock title="Block Bootstrap for Time Series" type="tip">
        <p>
          Standard bootstrap assumes i.i.d. returns, which violates the autocorrelation structure
          of Nifty returns. Use block bootstrap: sample contiguous blocks of returns (e.g., 20-day
          blocks) with replacement. This preserves short-term dependencies while still randomizing
          the sequence. The optimal block size can be estimated using the method of Politis and
          White (2004) -- typically 10-30 days for daily Nifty data.
        </p>
      </NoteBlock>

      <NoteBlock title="Practical Monte Carlo Checklist" type="warning">
        <p>
          Before trusting a Nifty strategy, ensure it passes all four Monte Carlo tests: (1)
          Permutation test p-value below 0.05, (2) Bootstrap Sharpe 95% CI excludes zero, (3)
          Strategy beats at least 95% of synthetic GBM paths with same drift and volatility,
          (4) Observed max drawdown is within the 5th-95th percentile of bootstrapped drawdowns.
          Failing any single test should raise serious concerns about the strategy's viability.
        </p>
      </NoteBlock>
    </div>
  )
}
