import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveIC() {
  const [ic, setIc] = useState(0.05)
  const [breadth, setBreadth] = useState(500)
  const [rebalFreq, setRebalFreq] = useState(12)
  const [tc, setTc] = useState(30)

  const totalBreadth = breadth * rebalFreq
  const ir = ic * Math.sqrt(totalBreadth)
  const expectedAlpha = ir * 0.15
  const alphaAfterTC = expectedAlpha - tc / 10000 * rebalFreq * 2
  const tStat = ic * Math.sqrt(breadth * rebalFreq * 5)
  const hitRate = 0.5 + ic / Math.sqrt(2 * Math.PI)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: IC to Portfolio Performance
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        See how Information Coefficient translates to portfolio alpha via the
        Fundamental Law of Active Management for NSE strategies.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>IC: {ic.toFixed(3)}</span>
          <input type="range" min="0.01" max="0.15" step="0.005" value={ic}
            onChange={e => setIc(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Universe Size: {breadth} stocks</span>
          <input type="range" min="50" max="1500" step="50" value={breadth}
            onChange={e => setBreadth(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Rebalancing: {rebalFreq}x/year</span>
          <input type="range" min="1" max="52" step="1" value={rebalFreq}
            onChange={e => setRebalFreq(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Transaction Cost: {tc} bps one-way</span>
          <input type="range" min="5" max="100" step="5" value={tc}
            onChange={e => setTc(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">Breadth (BR)</p>
          <p className="text-lg font-bold text-blue-800 dark:text-blue-200">{totalBreadth.toLocaleString()}</p>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
          <p className="text-xs font-semibold text-purple-700 dark:text-purple-300">IR</p>
          <p className="text-lg font-bold text-purple-800 dark:text-purple-200">{ir.toFixed(2)}</p>
        </div>
        <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/30">
          <p className="text-xs font-semibold text-green-700 dark:text-green-300">Gross Alpha</p>
          <p className="text-lg font-bold text-green-800 dark:text-green-200">{(expectedAlpha * 100).toFixed(1)}%</p>
        </div>
        <div className={`rounded-lg p-3 ${alphaAfterTC > 0 ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'}`}>
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Net Alpha</p>
          <p className={`text-lg font-bold ${alphaAfterTC > 0 ? 'text-green-800 dark:text-green-200' : 'text-red-600'}`}>
            {(alphaAfterTC * 100).toFixed(1)}%
          </p>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">Hit Rate</p>
          <p className="text-lg font-bold text-amber-800 dark:text-amber-200">{(hitRate * 100).toFixed(1)}%</p>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
        <InlineMath math={`\\text{IR} = \\text{IC} \\times \\sqrt{\\text{BR}} = ${ic.toFixed(3)} \\times \\sqrt{${totalBreadth}} = ${ir.toFixed(2)}`} />
      </p>
    </div>
  )
}

export default function InformationCoefficient() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Information Coefficient and the Fundamental Law
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The Information Coefficient (IC) is the single most important metric for evaluating
        alpha signals. It measures the correlation between your signal's predictions and
        subsequent realized returns. Even a small IC of 0.05 on 500 NSE stocks can generate
        substantial portfolio alpha -- this is the magic of the Fundamental Law of Active
        Management.
      </p>

      <DefinitionBlock
        title="Information Coefficient (IC)"
        label="Definition 2.2"
        definition="The Information Coefficient is the Spearman rank correlation between the signal scores at time t and the forward returns from t to t+h. An IC of 0.05 means the signal explains about 0.25% of the variance of cross-sectional returns, which sounds tiny but is economically very significant across hundreds of stocks."
        notation="\text{IC}_t = \rho_S(\alpha_{i,t}, r_{i,t \to t+h}) = \text{Spearman}(\text{signal}, \text{forward return})"
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The IC is computed cross-sectionally at each rebalancing date and then averaged
        over time. Key statistics include:
      </p>

      <BlockMath math="\overline{\text{IC}} = \frac{1}{T}\sum_{t=1}^{T} \text{IC}_t, \quad \text{ICIR} = \frac{\overline{\text{IC}}}{\sigma_{\text{IC}}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The IC Information Ratio (ICIR) measures the consistency of the signal. An ICIR
        above 0.5 indicates a stable, reliable signal.
      </p>

      <TheoremBlock
        title="Fundamental Law of Active Management (Grinold)"
        label="Theorem 2.2"
        statement="The Information Ratio of an actively managed portfolio is approximately equal to the Information Coefficient times the square root of breadth (number of independent bets per year). This is the most important formula in quantitative portfolio management."
        formula="\text{IR} \approx \text{IC} \times \sqrt{\text{BR}}"
        proof="Let there be BR independent bets per year, each with skill IC and residual volatility \sigma. Each bet generates alpha \approx IC \cdot \sigma with tracking error \sigma. After BR independent bets, total alpha = IC \cdot \sigma \cdot BR (additive), total tracking error = \sigma \cdot \sqrt{BR} (by independence). Thus IR = \frac{IC \cdot \sigma \cdot BR}{\sigma \cdot \sqrt{BR}} = IC \cdot \sqrt{BR}. The transfer coefficient TC (0 to 1) accounts for portfolio constraints: IR = IC \times TC \times \sqrt{BR}."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        IC Benchmarks for Indian Markets
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Signal Type</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Typical IC</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">ICIR</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">NSE Performance</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">12-1 Momentum</td>
              <td className="px-4 py-2">0.04 -- 0.07</td>
              <td className="px-4 py-2">0.3 -- 0.5</td>
              <td className="px-4 py-2">Strong, especially mid-cap</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Earnings Yield</td>
              <td className="px-4 py-2">0.03 -- 0.06</td>
              <td className="px-4 py-2">0.3 -- 0.4</td>
              <td className="px-4 py-2">Cyclical in India</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">ROE (Quality)</td>
              <td className="px-4 py-2">0.03 -- 0.05</td>
              <td className="px-4 py-2">0.4 -- 0.6</td>
              <td className="px-4 py-2">Consistent performer</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Low Volatility</td>
              <td className="px-4 py-2">0.02 -- 0.04</td>
              <td className="px-4 py-2">0.3 -- 0.5</td>
              <td className="px-4 py-2">Strong in India</td>
            </tr>
            <tr>
              <td className="px-4 py-2">ML Composite</td>
              <td className="px-4 py-2">0.05 -- 0.10</td>
              <td className="px-4 py-2">0.4 -- 0.7</td>
              <td className="px-4 py-2">Decay concerns</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveIC />

      <PythonCode
        title="ic_analysis.py"
        runnable
        code={`import numpy as np
import pandas as pd
from scipy.stats import spearmanr

# Simulate IC analysis for 3 signals on NSE 500
np.random.seed(42)
n_stocks = 500
n_periods = 60  # Monthly for 5 years

# True ICs for each signal
true_ics = {'Momentum': 0.06, 'Value': 0.04, 'Quality': 0.05}

results = {}
for signal_name, true_ic in true_ics.items():
    period_ics = []
    for t in range(n_periods):
        # Generate signal scores (cross-sectional)
        signal = np.random.normal(0, 1, n_stocks)

        # Generate forward returns correlated with signal
        noise = np.random.normal(0, 1, n_stocks)
        forward_returns = true_ic * signal + np.sqrt(1 - true_ic**2) * noise

        # Compute rank IC
        ic, p_val = spearmanr(signal, forward_returns)
        period_ics.append(ic)

    period_ics = np.array(period_ics)
    results[signal_name] = {
        'ics': period_ics,
        'mean_ic': np.mean(period_ics),
        'ic_std': np.std(period_ics),
        'icir': np.mean(period_ics) / np.std(period_ics),
        'hit_rate': np.mean(period_ics > 0),
        't_stat': np.mean(period_ics) / (np.std(period_ics) / np.sqrt(n_periods)),
    }

print("=== Information Coefficient Analysis (NSE 500) ===")
print(f"Universe: {n_stocks} stocks | Periods: {n_periods} months\\n")

print(f"{'Signal':<12} {'Mean IC':>8} {'IC Std':>8} {'ICIR':>8} {'Hit Rate':>9} {'t-stat':>8}")
print("-" * 58)
for name, r in results.items():
    print(f"{name:<12} {r['mean_ic']:>8.4f} {r['ic_std']:>8.4f} {r['icir']:>8.3f} {r['hit_rate']:>8.0%} {r['t_stat']:>8.2f}")

# --- Fundamental Law Calculation ---
print(f"\\n=== Fundamental Law of Active Management ===")
breadth = n_stocks * 12  # Monthly rebalancing
for name, r in results.items():
    ir = r['mean_ic'] * np.sqrt(breadth)
    # Assume 15% annual tracking error
    te = 0.15
    expected_alpha = ir * te
    print(f"{name:<12}: IR = {r['mean_ic']:.4f} x sqrt({breadth}) = {ir:.2f}")
    print(f"{'':12}  Expected alpha (TE=15%): {expected_alpha*100:.1f}%")

# --- Signal Combination ---
ic_vec = np.array([r['mean_ic'] for r in results.values()])
# Assume signals have correlation 0.3 with each other
corr = np.array([[1, 0.3, 0.25], [0.3, 1, 0.2], [0.25, 0.2, 1]])
cov_inv = np.linalg.inv(corr)
combined_ic = np.sqrt(ic_vec @ cov_inv @ ic_vec)
print(f"\\n--- Signal Combination ---")
print(f"Individual ICs: {', '.join(f'{ic:.4f}' for ic in ic_vec)}")
print(f"Combined IC (optimal weights): {combined_ic:.4f}")
print(f"Improvement over best single: {(combined_ic/max(ic_vec)-1)*100:+.1f}%")`}
      />

      <ExampleBlock
        title="IC to Alpha for an NSE Strategy"
        difficulty="intermediate"
        problem="A momentum signal has IC = 0.05 on a universe of 500 NSE stocks, rebalanced monthly. If the strategy runs with 12% tracking error and single-trip costs are 30 bps with 50% monthly turnover, what is the net alpha?"
        solution={[
          {
            step: 'Compute breadth and IR',
            formula: '\\text{BR} = 500 \\times 12 = 6000, \\quad \\text{IR} = 0.05 \\times \\sqrt{6000} = 3.87',
            explanation: 'With 500 stocks and monthly rebalancing, the strategy makes 6000 bets per year.',
          },
          {
            step: 'Gross alpha',
            formula: '\\alpha_{\\text{gross}} = \\text{IR} \\times \\text{TE} = 3.87 \\times 12\\% = 46.4\\%',
            explanation: 'The theoretical gross alpha is very high, but the Fundamental Law assumes perfect transfer coefficient.',
          },
          {
            step: 'Net alpha (accounting for TC = 0.8 and costs)',
            formula: '\\alpha_{\\text{net}} \\approx 0.8 \\times 3.87 \\times 12\\% - 12 \\times 50\\% \\times 2 \\times 0.30\\% = 37.2\\% - 3.6\\% = 33.6\\%',
            explanation: 'After realistic transfer coefficient (0.8) and transaction costs (3.6% annually from 50% monthly turnover at 30 bps round trip), net alpha is about 33.6%. In practice, real alpha is lower due to capacity constraints, slippage, and IC decay.',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Transfer Coefficient
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The transfer coefficient (TC) measures how efficiently the portfolio translates
        signal predictions into positions. Real-world constraints -- sector limits, position
        caps, turnover constraints, SEBI limits on single-stock exposure -- all reduce TC
        below 1.0:
      </p>

      <BlockMath math="\text{IR} = \text{IC} \times \text{TC} \times \sqrt{\text{BR}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For a long-only Indian mutual fund (no shorting), TC is typically 0.3-0.5. For a
        long-short PMS or AIF without sector constraints, TC can reach 0.7-0.9. The TC
        is computed as the correlation between the optimal signal-based weights and the
        actual implemented weights:
      </p>

      <BlockMath math="\text{TC} = \rho(\alpha_i, w_i^{\text{active}} \cdot \sigma_i)" />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        IC Decay and Signal Monitoring
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Alpha signals inevitably decay as markets become more efficient. Regular monitoring
        of IC is essential for Indian quant strategies:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Metric</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Healthy</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Warning</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Critical</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Rolling 12m IC</td>
              <td className="px-4 py-2">&gt; 0.03</td>
              <td className="px-4 py-2">0.01 -- 0.03</td>
              <td className="px-4 py-2">&lt; 0.01</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">ICIR</td>
              <td className="px-4 py-2">&gt; 0.4</td>
              <td className="px-4 py-2">0.2 -- 0.4</td>
              <td className="px-4 py-2">&lt; 0.2</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">IC Hit Rate</td>
              <td className="px-4 py-2">&gt; 60%</td>
              <td className="px-4 py-2">50 -- 60%</td>
              <td className="px-4 py-2">&lt; 50%</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Quintile Monotonicity</td>
              <td className="px-4 py-2">Strictly monotonic</td>
              <td className="px-4 py-2">1 violation</td>
              <td className="px-4 py-2">Non-monotonic</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        If the rolling 12-month IC drops below 0.02 for two consecutive quarters on NSE
        data, consider the signal impaired. Common causes of IC decay in Indian markets
        include: increased factor crowding (too many quant funds trading the same signal),
        structural market changes (SEBI regulations, market microstructure evolution),
        and regime shifts (e.g., quality factor weakening during speculative bull markets).
      </p>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          The IC is the DNA of a quant strategy. Even a small IC of 0.03-0.05 generates
          meaningful alpha when applied across hundreds of NSE stocks with frequent rebalancing.
          The Fundamental Law shows that <strong>breadth matters as much as skill</strong> --
          a mediocre signal on 500 stocks beats a great signal on 50 stocks. The transfer
          coefficient captures real-world implementation friction. Track IC, ICIR,
          and hit rate monthly. If IC drops below 0.02 consistently, the signal is decaying
          and needs replacement or refinement.
        </p>
      </NoteBlock>
    </div>
  )
}
