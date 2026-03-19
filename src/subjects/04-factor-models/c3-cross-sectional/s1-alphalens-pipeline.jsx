import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveAlphalens() {
  const [quantiles, setQuantiles] = useState(5)
  const [holdPeriod, setHoldPeriod] = useState(21)
  const [longShort, setLongShort] = useState(true)

  const spreadPerQuantile = 2.5
  const qSpread = spreadPerQuantile * (quantiles - 1)
  const annFactor = 252 / holdPeriod
  const annSpread = qSpread * annFactor / 100
  const longOnly = qSpread * 0.6 / 100
  const ic = 0.04 + (quantiles > 5 ? 0.005 : 0) + (holdPeriod < 30 ? 0.01 : 0)
  const turnover = 0.3 * annFactor * 100

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Alphalens Factor Analysis
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Configure quantile analysis parameters for evaluating a factor on NSE stocks.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Quantiles: {quantiles}</span>
          <input type="range" min="3" max="10" step="1" value={quantiles}
            onChange={e => setQuantiles(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Holding Period: {holdPeriod} days</span>
          <input type="range" min="1" max="63" step="1" value={holdPeriod}
            onChange={e => setHoldPeriod(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <input type="checkbox" checked={longShort}
            onChange={e => setLongShort(e.target.checked)}
            className="accent-indigo-500" />
          <span>Long-Short Portfolio</span>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">Q{quantiles}-Q1 Spread</p>
          <p className="text-lg font-bold text-blue-800 dark:text-blue-200">{qSpread.toFixed(1)} bps</p>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
          <p className="text-xs font-semibold text-purple-700 dark:text-purple-300">Ann. Spread</p>
          <p className="text-lg font-bold text-purple-800 dark:text-purple-200">{(annSpread * 100).toFixed(1)}%</p>
        </div>
        <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/30">
          <p className="text-xs font-semibold text-green-700 dark:text-green-300">Mean IC</p>
          <p className="text-lg font-bold text-green-800 dark:text-green-200">{ic.toFixed(3)}</p>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">Ann. Turnover</p>
          <p className="text-lg font-bold text-amber-800 dark:text-amber-200">{turnover.toFixed(0)}%</p>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
        {longShort ? 'Long-short' : 'Long-only'} portfolio |
        Rebalances: {annFactor.toFixed(0)}x/year |
        Stocks per quantile: ~{Math.round(500 / quantiles)}
      </p>
    </div>
  )
}

export default function AlphalensPipeline() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Alphalens Factor Analysis Pipeline
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Alphalens is the standard tool for evaluating whether a factor actually predicts
        cross-sectional stock returns. Before committing capital to a factor strategy on NSE,
        you must rigorously test: Does the factor sort stocks into meaningful return quantiles?
        Is the IC stable? Does the spread survive transaction costs? This section builds a
        complete alphalens-style pipeline for Indian equity factors.
      </p>

      <DefinitionBlock
        title="Quantile Analysis"
        label="Definition 3.1"
        definition="Quantile analysis sorts stocks into N equal-sized buckets based on factor scores and computes the average forward return for each bucket. A good factor produces a monotonically increasing (or decreasing) return pattern across quantiles, with a statistically significant spread between the top and bottom quantiles."
        notation="r_{q,t \to t+h} = \frac{1}{|Q_q|}\sum_{i \in Q_q} r_{i,t \to t+h}, \quad \text{Spread} = r_{Q_N} - r_{Q_1}"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Alphalens Workflow
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A standard alphalens factor evaluation follows this pipeline:
      </p>

      <BlockMath math="\text{Factor Scores} \xrightarrow{\text{quantile}} \text{Portfolios} \xrightarrow{\text{forward returns}} \text{Performance} \xrightarrow{\text{IC/spread}} \text{Decision}" />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Output</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">What It Shows</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Good Result</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Red Flag</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Quantile Returns</td>
              <td className="px-4 py-2">Return by factor bucket</td>
              <td className="px-4 py-2">Monotonic pattern</td>
              <td className="px-4 py-2">Non-monotonic or flat</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">IC Time Series</td>
              <td className="px-4 py-2">Signal stability over time</td>
              <td className="px-4 py-2">Positive, stable IC</td>
              <td className="px-4 py-2">Switching signs</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Cumulative Returns</td>
              <td className="px-4 py-2">Factor performance path</td>
              <td className="px-4 py-2">Upward-sloping spread</td>
              <td className="px-4 py-2">Concentrated in one period</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Turnover Analysis</td>
              <td className="px-4 py-2">Rebalancing costs</td>
              <td className="px-4 py-2">&lt; 30% per rebalance</td>
              <td className="px-4 py-2">&gt; 60% per rebalance</td>
            </tr>
          </tbody>
        </table>
      </div>

      <TheoremBlock
        title="Monotonicity of Quantile Returns"
        label="Theorem 3.1"
        statement="For a factor with positive IC, the expected return of quantile portfolios is monotonically increasing in the factor score. The spread between top and bottom quantiles is approximately proportional to the IC and the cross-sectional volatility of returns."
        formula="\text{Spread} \approx 2 \cdot \text{IC} \cdot \sigma_{\text{cs}} \cdot \Phi^{-1}\!\left(\frac{N-1}{N}\right)"
        proof="Under the assumption that factor scores and returns are jointly bivariate normal with correlation IC, the conditional expected return for quantile q is E[r | \alpha \in Q_q] = IC \cdot \sigma_r \cdot E[z | z \in Q_q], where z is the standardized factor score. For quantile N of N groups, E[z | z \in Q_N] \approx \phi(\Phi^{-1}((N-1)/N)) / (1/N). The spread between top and bottom quantiles is thus 2 \cdot IC \cdot \sigma_r \cdot E[z | z \in Q_N]. For 5 quantiles with IC = 0.05 and monthly cross-sectional vol of 8%, spread \approx 2 \times 0.05 \times 8\% \times 1.4 = 1.12\% per month."
      />

      <InteractiveAlphalens />

      <PythonCode
        title="alphalens_nse.py"
        runnable
        code={`import numpy as np
import pandas as pd
from scipy.stats import spearmanr

# Simulate alphalens-style factor analysis on NSE 500
np.random.seed(42)
n_stocks = 500
n_periods = 60  # Monthly periods
n_quantiles = 5

# Factor: 12-1 Momentum on NSE
true_ic = 0.05
factor_scores_all = []
forward_returns_all = []
ic_series = []

for t in range(n_periods):
    # Cross-sectional factor scores
    scores = np.random.normal(0, 1, n_stocks)

    # Forward returns (correlated with scores)
    noise = np.random.normal(0, 1, n_stocks)
    fwd_returns = true_ic * scores + np.sqrt(1 - true_ic**2) * noise
    fwd_returns *= 0.08  # Scale to ~8% cross-sectional vol

    factor_scores_all.append(scores)
    forward_returns_all.append(fwd_returns)

    ic, _ = spearmanr(scores, fwd_returns)
    ic_series.append(ic)

factor_scores = np.array(factor_scores_all)  # (n_periods, n_stocks)
forward_returns = np.array(forward_returns_all)

# --- Quantile Analysis ---
quantile_returns = np.zeros((n_periods, n_quantiles))
for t in range(n_periods):
    quantile_labels = pd.qcut(factor_scores[t], n_quantiles, labels=False)
    for q in range(n_quantiles):
        mask = quantile_labels == q
        quantile_returns[t, q] = forward_returns[t, mask].mean()

avg_q_returns = quantile_returns.mean(axis=0) * 100
q_spread = avg_q_returns[-1] - avg_q_returns[0]

# --- Cumulative Long-Short Performance ---
long_short = quantile_returns[:, -1] - quantile_returns[:, 0]
cumulative_ls = np.cumsum(long_short)

# --- Turnover Analysis ---
turnovers = []
prev_quantiles = None
for t in range(n_periods):
    curr_quantiles = pd.qcut(factor_scores[t], n_quantiles, labels=False)
    if prev_quantiles is not None:
        # Top quantile turnover
        top_prev = set(np.where(prev_quantiles == n_quantiles - 1)[0])
        top_curr = set(np.where(curr_quantiles == n_quantiles - 1)[0])
        turnover = 1 - len(top_prev & top_curr) / max(len(top_curr), 1)
        turnovers.append(turnover)
    prev_quantiles = curr_quantiles

# --- IC Summary ---
ic_array = np.array(ic_series)

print("=== Alphalens Factor Analysis: NSE 500 Momentum ===")
print(f"Universe: {n_stocks} stocks | Periods: {n_periods} months | Quantiles: {n_quantiles}\\n")

print("--- Quantile Average Returns (monthly %) ---")
for q in range(n_quantiles):
    bar = '#' * int(max(0, avg_q_returns[q]) * 20)
    print(f"  Q{q+1}: {avg_q_returns[q]:+.3f}%  {bar}")
print(f"  Spread (Q5-Q1): {q_spread:+.3f}% monthly ({q_spread*12:+.2f}% annualized)")

print(f"\\n--- Information Coefficient ---")
print(f"  Mean IC:    {ic_array.mean():.4f}")
print(f"  IC Std:     {ic_array.std():.4f}")
print(f"  ICIR:       {ic_array.mean()/ic_array.std():.3f}")
print(f"  IC > 0:     {(ic_array > 0).mean()*100:.0f}% of periods")
print(f"  t-stat:     {ic_array.mean()/(ic_array.std()/np.sqrt(n_periods)):.2f}")

print(f"\\n--- Turnover ---")
print(f"  Avg monthly turnover (top Q): {np.mean(turnovers)*100:.1f}%")
print(f"  Annualized turnover: {np.mean(turnovers)*12*100:.0f}%")

print(f"\\n--- Long-Short Performance ---")
print(f"  Cumulative return: {cumulative_ls[-1]*100:.1f}%")
print(f"  Sharpe (L/S): {np.mean(long_short)/np.std(long_short)*np.sqrt(12):.2f}")
print(f"  Max monthly loss: {long_short.min()*100:.2f}%")`}
      />

      <ExampleBlock
        title="Evaluating a Value Factor on NSE"
        difficulty="intermediate"
        problem="An alphalens analysis of P/B ratio on NSE 500 shows: Q1 (low P/B): +1.2% monthly, Q5 (high P/B): +0.3% monthly, IC = 0.04, ICIR = 0.35. Is this a viable factor?"
        solution={[
          {
            step: 'Assess quantile spread',
            formula: '\\text{Spread} = 1.2\\% - 0.3\\% = 0.9\\% \\text{ monthly} = 10.8\\% \\text{ annualized}',
            explanation: 'The Q1-Q5 spread of 90 bps per month is economically significant.',
          },
          {
            step: 'Check IC quality',
            formula: '\\text{IC} = 0.04, \\quad \\text{ICIR} = 0.35',
            explanation: 'IC of 0.04 is decent for a value factor. ICIR of 0.35 means the signal is positive about 63% of months -- acceptable but not outstanding.',
          },
          {
            step: 'Verdict',
            formula: '\\text{Net spread} = 10.8\\% - \\text{TC} \\approx 10.8\\% - 3\\% = 7.8\\%',
            explanation: 'After estimated transaction costs of ~3% annually (low turnover for value), the factor is viable. Value factors on NSE tend to work well over multi-year horizons. Use this as a component in a multi-factor model.',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Common Pitfalls in Factor Evaluation
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Factor evaluation on Indian data has several common pitfalls that can lead to
        overly optimistic results:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Pitfall</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Description</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Prevention</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Survivorship bias</td>
              <td className="px-4 py-2">Backtesting only on stocks that still exist on NSE</td>
              <td className="px-4 py-2">Include delisted stocks; use point-in-time universe</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Look-ahead bias</td>
              <td className="px-4 py-2">Using data that was not yet available at signal time</td>
              <td className="px-4 py-2">Lag fundamentals by 60+ days for SEBI filing delays</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Liquidity illusion</td>
              <td className="px-4 py-2">Strong returns in illiquid small-cap quintiles</td>
              <td className="px-4 py-2">Filter by ADV &gt; INR 1 Cr; add impact cost estimates</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Sector confounding</td>
              <td className="px-4 py-2">Factor proxying for sector bets</td>
              <td className="px-4 py-2">Sector-neutralize before quantile sort</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Single-period significance</td>
              <td className="px-4 py-2">Strong results driven by one market event</td>
              <td className="px-4 py-2">Check cumulative IC chart for breaks; use sub-periods</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Outlier dominance</td>
              <td className="px-4 py-2">Circuit-hit stocks driving Q1/Q5 returns</td>
              <td className="px-4 py-2">Winsorize returns at 3-sigma; use median returns</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Multi-Horizon Testing
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A robust factor should work across multiple forward return horizons. Alphalens
        typically tests 1-day, 5-day, and 21-day forward returns. For Indian equity factors:
      </p>

      <BlockMath math="\text{IC}(h) = \rho_S(\alpha_{i,t}, r_{i,t \to t+h}), \quad h \in \{1, 5, 10, 21, 63\} \text{ days}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A genuine alpha factor should show positive IC that either stays constant or slowly
        decays as the horizon increases. If the IC is positive at 1-day but zero at 21-day,
        the signal is too short-lived for most Indian equity strategies (which face high
        delivery-based STT). Conversely, if the IC is only positive at 63-day horizons,
        the factor may be capturing slow-moving fundamentals -- suitable for monthly
        rebalancing with low turnover.
      </p>

      <BlockMath math="\text{Decay rate} = \frac{\text{IC}(5) - \text{IC}(21)}{\text{IC}(5) \cdot (21 - 5)} \times 100 \; \text{(\% per day)}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For NSE stocks, momentum signals typically peak at 10-21 day horizons, value signals
        peak at 63-126 day horizons, and quality signals show relatively flat IC profiles
        across all horizons (reflecting their fundamental stability).
      </p>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Alphalens provides the rigorous statistical framework for factor evaluation before
          capital deployment. The three key outputs are: (1) <strong>Monotonic quantile
          returns</strong> -- the factor must sort stocks predictably, (2) <strong>Stable
          IC</strong> -- look for ICIR &gt; 0.3 and IC &gt; 0 in at least 55% of periods,
          (3) <strong>Manageable turnover</strong> -- ensure costs do not eat the spread. For
          NSE factors, always test on both the Nifty 500 and broader BSE universes, check
          multiple forward horizons, and guard against survivorship bias, look-ahead bias,
          and liquidity illusion. A factor that passes all these tests has earned the right
          to be included in your production strategy.
        </p>
      </NoteBlock>
    </div>
  )
}
