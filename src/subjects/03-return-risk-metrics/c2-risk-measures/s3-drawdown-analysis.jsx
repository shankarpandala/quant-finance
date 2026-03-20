import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveDrawdown() {
  const [initialCapital, setInitialCapital] = useState(1000000)
  const [annReturn, setAnnReturn] = useState(15.0)
  const [annVol, setAnnVol] = useState(20.0)
  const [recoveryMonths, setRecoveryMonths] = useState(8)

  const expectedMaxDD = annVol * 2.5 / 100
  const dollarMaxDD = initialCapital * expectedMaxDD
  const calmar = (annReturn / 100) / expectedMaxDD
  const ulcerIndex = expectedMaxDD * 0.6 * 100
  const martinRatio = annReturn / ulcerIndex
  const troughValue = initialCapital * (1 - expectedMaxDD)
  const monthlyReturn = Math.pow(1 + annReturn / 100, 1 / 12) - 1
  const recoveryValue = troughValue * Math.pow(1 + monthlyReturn, recoveryMonths)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Drawdown Scenario Analysis
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Estimate expected maximum drawdown and recovery for an Indian equity portfolio.
        Rule of thumb: Expected Max DD is approximately 2.5x annual volatility.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Capital: INR {(initialCapital / 100000).toFixed(0)} Lakhs</span>
          <input type="range" min="100000" max="10000000" step="100000" value={initialCapital}
            onChange={e => setInitialCapital(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Ann. Return: {annReturn.toFixed(1)}%</span>
          <input type="range" min="0" max="40" step="0.5" value={annReturn}
            onChange={e => setAnnReturn(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Ann. Volatility: {annVol.toFixed(1)}%</span>
          <input type="range" min="5" max="50" step="0.5" value={annVol}
            onChange={e => setAnnVol(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Recovery Period: {recoveryMonths} months</span>
          <input type="range" min="1" max="36" step="1" value={recoveryMonths}
            onChange={e => setRecoveryMonths(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/30">
          <p className="text-xs font-semibold text-red-700 dark:text-red-300">Expected Max DD</p>
          <p className="text-lg font-bold text-red-800 dark:text-red-200">{(expectedMaxDD * 100).toFixed(1)}%</p>
          <p className="text-xs text-red-600 dark:text-red-400">INR {(dollarMaxDD / 100000).toFixed(1)}L</p>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">Calmar Ratio</p>
          <p className="text-lg font-bold text-amber-800 dark:text-amber-200">{calmar.toFixed(3)}</p>
        </div>
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">Ulcer Index</p>
          <p className="text-lg font-bold text-blue-800 dark:text-blue-200">{ulcerIndex.toFixed(1)}%</p>
        </div>
        <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/30">
          <p className="text-xs font-semibold text-green-700 dark:text-green-300">Recovery Value</p>
          <p className="text-lg font-bold text-green-800 dark:text-green-200">
            INR {(recoveryValue / 100000).toFixed(1)}L
          </p>
          <p className="text-xs text-green-600 dark:text-green-400">
            {recoveryValue >= initialCapital ? 'Recovered!' : 'Not yet recovered'}
          </p>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
        {expectedMaxDD > 0.3
          ? <span className="font-semibold text-red-500">Warning: Expected drawdown exceeds 30% -- consider reducing position size.</span>
          : <span className="font-semibold text-green-600 dark:text-green-400">Drawdown within manageable range for institutional investors.</span>
        }
      </p>
    </div>
  )
}

export default function DrawdownAnalysis() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Drawdown Analysis
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        While volatility measures the dispersion of returns, drawdowns measure the pain of
        losing money. The Nifty 50 experienced a 38% drawdown during the 2020 COVID crash,
        and Bank Nifty has seen drawdowns exceeding 40%. For any quant strategy running on
        NSE, understanding drawdown dynamics is critical for position sizing, risk limits,
        and investor communication.
      </p>

      <DefinitionBlock
        title="Drawdown"
        label="Definition 2.5"
        definition="The drawdown at time t is the decline from the running peak of the portfolio equity curve. It measures how far the portfolio has fallen from its all-time high, expressed as a percentage or absolute value."
        notation="D_t = \frac{M_t - V_t}{M_t}, \quad M_t = \max_{s \leq t} V_s"
      />

      <DefinitionBlock
        title="Maximum Drawdown (MDD)"
        label="Definition 2.6"
        definition="The maximum drawdown is the largest peak-to-trough decline over the entire period. It represents the worst cumulative loss an investor would have experienced. SEBI-registered PMS schemes are required to disclose maximum drawdown in their performance reports."
        notation="\text{MDD} = \max_{t} \, D_t = \max_{t} \frac{M_t - V_t}{M_t}"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Drawdown Duration and Recovery
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Three key time-based drawdown metrics capture the temporal aspect of losses:
      </p>

      <BlockMath math="\text{Drawdown Duration} = t_{\text{recovery}} - t_{\text{peak}}" />
      <BlockMath math="\text{Time to Trough} = t_{\text{trough}} - t_{\text{peak}}" />
      <BlockMath math="\text{Recovery Time} = t_{\text{recovery}} - t_{\text{trough}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        After the 2020 crash, Nifty 50 took approximately 5 months to reach its trough and
        another 8 months to recover to pre-crash levels. Bank Nifty recovered faster due to
        strong earnings momentum in private banks.
      </p>

      <TheoremBlock
        title="Expected Maximum Drawdown (Magdon-Ismail)"
        label="Theorem 2.3"
        statement="For a geometric Brownian motion with drift mu and volatility sigma over T periods, the expected maximum drawdown can be approximated as a function of the Sharpe ratio and the number of observations."
        formula="E[\text{MDD}] \approx \begin{cases} \sigma\sqrt{\frac{\pi T}{2}} & \text{if } \mu = 0 \\ \frac{\sigma^2}{2\mu}\left[Q_p\left(\frac{\mu}{\sigma}\sqrt{T}\right)\right] & \text{if } \mu > 0 \end{cases}"
        proof="For a driftless Brownian motion, the maximum drawdown is related to the range of the process. The expected range of a standard Brownian motion over [0,T] is \sqrt{\pi T / 2} (from reflection principle). For positive drift, the drawdown is bounded and converges, with the correction function Q_p capturing the interplay between drift (pulling the process up) and diffusion (creating drawdowns). Empirically on NSE data, the approximation E[MDD] \approx 2.5\sigma_{annual} holds well for Nifty 50 over multi-year horizons."
      />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Event</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Nifty 50 MDD</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Duration</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Recovery</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">GFC (2008)</td>
              <td className="px-4 py-2">-59.9%</td>
              <td className="px-4 py-2">13 months</td>
              <td className="px-4 py-2">~24 months</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Taper Tantrum (2013)</td>
              <td className="px-4 py-2">-12.1%</td>
              <td className="px-4 py-2">3 months</td>
              <td className="px-4 py-2">~4 months</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Demonetization (2016)</td>
              <td className="px-4 py-2">-8.6%</td>
              <td className="px-4 py-2">2 months</td>
              <td className="px-4 py-2">~3 months</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">COVID (2020)</td>
              <td className="px-4 py-2">-38.4%</td>
              <td className="px-4 py-2">1.5 months</td>
              <td className="px-4 py-2">~13 months</td>
            </tr>
            <tr>
              <td className="px-4 py-2">FII Selloff (2022)</td>
              <td className="px-4 py-2">-17.1%</td>
              <td className="px-4 py-2">6 months</td>
              <td className="px-4 py-2">~5 months</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveDrawdown />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Ulcer Index
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The Ulcer Index measures the depth and duration of drawdowns, weighting deeper and
        longer drawdowns more heavily. It is the root mean square of drawdowns:
      </p>

      <BlockMath math="\text{UI} = \sqrt{\frac{1}{N}\sum_{t=1}^{N} D_t^2}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The Martin Ratio (or Ulcer Performance Index) is the return per unit of Ulcer Index:
      </p>

      <BlockMath math="\text{Martin Ratio} = \frac{R_p - R_f}{\text{UI}}" />

      <PythonCode
        title="drawdown_analysis.py"
        runnable
        code={`import numpy as np
import pandas as pd

# Simulated Nifty 50 strategy equity curve (3 years)
np.random.seed(42)
n_days = 756
daily_returns = np.random.normal(0.0005, 0.014, n_days)

# Add a crash event (like COVID March 2020)
daily_returns[200:215] = np.random.normal(-0.03, 0.025, 15)  # Crash
daily_returns[215:240] = np.random.normal(0.015, 0.02, 25)   # Recovery

# Build equity curve starting at INR 1 Crore
initial = 1_00_00_000
equity = initial * np.cumprod(1 + daily_returns)
equity = np.insert(equity, 0, initial)

dates = pd.bdate_range('2023-04-01', periods=n_days + 1, freq='B')
df = pd.DataFrame({'Equity': equity}, index=dates)

# --- Drawdown Computation ---
running_max = df['Equity'].cummax()
drawdown = (df['Equity'] - running_max) / running_max
df['Drawdown'] = drawdown
df['Running_Max'] = running_max

# Maximum Drawdown
mdd = drawdown.min()
mdd_date = drawdown.idxmin()

# Find peak before MDD
peak_mask = df.index <= mdd_date
peak_date = df.loc[peak_mask, 'Equity'].idxmax()

# Find recovery after MDD
recovery_mask = (df.index > mdd_date) & (df['Equity'] >= df.loc[peak_date, 'Equity'])
recovery_date = df.loc[recovery_mask].index[0] if recovery_mask.any() else None

# --- Top 5 Drawdowns ---
dd_series = drawdown.copy()
top_drawdowns = []
for _ in range(5):
    trough_idx = dd_series.idxmin()
    trough_val = dd_series.min()
    if trough_val >= 0:
        break
    # Find peak
    pk = df.loc[:trough_idx, 'Equity'].idxmax()
    # Find recovery
    rec_mask = (df.index > trough_idx) & (df['Equity'] >= df.loc[pk, 'Equity'])
    rec = df.loc[rec_mask].index[0] if rec_mask.any() else df.index[-1]
    top_drawdowns.append({
        'Peak': pk.strftime('%Y-%m-%d'),
        'Trough': trough_idx.strftime('%Y-%m-%d'),
        'Recovery': rec.strftime('%Y-%m-%d'),
        'Drawdown': f"{trough_val*100:.1f}%",
        'Duration': f"{(rec - pk).days} days"
    })
    dd_series.loc[pk:rec] = 0

# --- Ulcer Index ---
ulcer_index = np.sqrt(np.mean(drawdown**2))

# --- Calmar Ratio ---
total_return = equity[-1] / equity[0] - 1
ann_return = (1 + total_return) ** (252 / n_days) - 1
calmar = ann_return / abs(mdd)

# --- Martin Ratio ---
rf = 0.065
martin = (ann_return - rf) / ulcer_index

print("=== Drawdown Analysis (INR 1 Crore Nifty Strategy) ===")
print(f"Period: {dates[0].strftime('%Y-%m-%d')} to {dates[-1].strftime('%Y-%m-%d')}")
print(f"Starting: INR {initial/1e7:.2f} Cr | Ending: INR {equity[-1]/1e7:.2f} Cr")
print(f"\\nMaximum Drawdown: {mdd*100:.2f}%")
print(f"  Peak: {peak_date.strftime('%Y-%m-%d')} | Trough: {mdd_date.strftime('%Y-%m-%d')}")
if recovery_date:
    print(f"  Recovery: {recovery_date.strftime('%Y-%m-%d')} ({(recovery_date-peak_date).days} days)")
print(f"\\nUlcer Index: {ulcer_index*100:.2f}%")
print(f"Calmar Ratio: {calmar:.3f}")
print(f"Martin Ratio: {martin:.3f}")
print(f"\\n--- Top 5 Drawdowns ---")
for i, dd in enumerate(top_drawdowns):
    print(f"  {i+1}. {dd['Drawdown']:>7s} | {dd['Peak']} -> {dd['Trough']} | Duration: {dd['Duration']}")`}
      />

      <ExampleBlock
        title="Drawdown of a Bank Nifty Strategy"
        difficulty="beginner"
        problem="A Bank Nifty trading strategy started with INR 25 Lakhs, peaked at INR 32 Lakhs, dropped to INR 24 Lakhs, and currently sits at INR 30 Lakhs. Compute the maximum drawdown and determine if the strategy has recovered."
        solution={[
          {
            step: 'Identify peak and trough',
            formula: 'M = \\text{INR } 32\\text{L}, \\quad V_{\\text{trough}} = \\text{INR } 24\\text{L}',
            explanation: 'The peak was INR 32 Lakhs and the trough was INR 24 Lakhs.',
          },
          {
            step: 'Compute maximum drawdown',
            formula: '\\text{MDD} = \\frac{32 - 24}{32} = \\frac{8}{32} = 25.0\\%',
            explanation: 'The strategy lost 25% from its peak -- a significant drawdown.',
          },
          {
            step: 'Check recovery',
            formula: 'V_{\\text{current}} = 30\\text{L} < 32\\text{L} = M_{\\text{peak}}',
            explanation: 'The strategy has NOT recovered. It still needs to gain INR 2 Lakhs (6.67% from current level) to reach a new high water mark.',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Drawdown-Based Position Sizing
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Drawdown limits can be used to dynamically size positions. The key idea is to
        reduce exposure as drawdown deepens, preserving capital for recovery:
      </p>

      <BlockMath math="\text{Position Size} = \text{Base Size} \times \min\!\left(1, \frac{\text{Max Allowed DD} - \text{Current DD}}{\text{Max Allowed DD}}\right)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For example, if the maximum allowed drawdown is 20% and the strategy is currently
        in a 15% drawdown, position size is reduced to <InlineMath math="(20-15)/20 = 25\%" /> of
        normal. This automatic de-risking mechanism prevents catastrophic losses but creates
        a pro-cyclical effect -- reduced exposure means slower recovery. A compromise is
        to use a floor (e.g., minimum 30% of base size) to maintain some exposure even
        during deep drawdowns.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Conditional Drawdown at Risk (CDaR)
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Analogous to CVaR for returns, CDaR measures the average drawdown in the worst
        <InlineMath math="(1-\alpha)" /> fraction of drawdown periods:
      </p>

      <BlockMath math="\text{CDaR}_\alpha = E[D_t \mid D_t > \text{DaR}_\alpha]" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\text{DaR}_\alpha" /> is the drawdown-at-risk (the alpha
        quantile of the drawdown distribution). CDaR can be used as an objective in
        portfolio optimization to minimize tail drawdown risk. For Indian PMS schemes
        with strict drawdown limits from investors, CDaR-constrained optimization ensures
        the portfolio is designed to survive extreme market events.
      </p>

      <BlockMath math="\min_{\mathbf{w}} \; -\mathbf{w}^\top \boldsymbol{\mu} \quad \text{s.t. } \text{CDaR}_{95\%}(\mathbf{w}) \leq d_{\max}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        This optimization finds the highest-return portfolio subject to a maximum expected
        tail drawdown. It is more conservative than variance-based optimization and
        naturally accounts for the non-normal drawdown distributions observed in Indian
        equity markets.
      </p>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Drawdowns matter more than volatility to real investors. A strategy with 20% annual
          volatility might experience a 40-50% drawdown in a crisis (Nifty 50 in 2008). The{' '}
          <strong>Calmar ratio</strong> and <strong>Ulcer Index</strong> provide drawdown-adjusted
          performance measures. Use drawdown-based position sizing and CDaR-constrained
          optimization for more robust portfolio construction. For Indian quant strategies,
          always stress-test for historical events: GFC 2008, COVID 2020, and FII selloffs.
          SEBI-registered PMS schemes must disclose drawdown statistics, making this analysis
          mandatory for compliance.
        </p>
      </NoteBlock>
    </div>
  )
}
