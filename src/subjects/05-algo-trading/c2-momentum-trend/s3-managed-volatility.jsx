import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveVolTargeting() {
  const [targetVol, setTargetVol] = useState(15)
  const [maxLeverage, setMaxLeverage] = useState(2.0)
  const [ewmaLambda, setEwmaLambda] = useState(0.94)

  const generateData = () => {
    const n = 150
    const returns = []
    const vols = []
    const leverages = []
    let vol = 0.14
    for (let i = 0; i < n; i++) {
      const shock = i > 60 && i < 90 ? 2.5 : 1.0
      vol = Math.sqrt(ewmaLambda * vol * vol + (1 - ewmaLambda) * (Math.random() - 0.5) ** 2 * 0.04 * shock)
      const annVol = vol * Math.sqrt(252) * 100
      const lev = Math.min(targetVol / annVol, maxLeverage)
      returns.push((Math.random() - 0.48) * vol * 200)
      vols.push(annVol)
      leverages.push(lev)
    }
    return { returns, vols, leverages }
  }

  const [data] = useState(generateData)
  const chartW = 500
  const chartH = 140

  const maxVol = Math.max(...data.vols)
  const volPath = data.vols.map((v, i) => {
    const x = (i / (data.vols.length - 1)) * chartW
    const y = chartH - (v / maxVol) * chartH
    return `${i === 0 ? 'M' : 'L'}${x},${y}`
  }).join(' ')

  const levPath = data.leverages.map((l, i) => {
    const x = (i / (data.leverages.length - 1)) * chartW
    const y = chartH - (l / maxLeverage) * chartH
    return `${i === 0 ? 'M' : 'L'}${x},${y}`
  }).join(' ')

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Volatility Targeting with India VIX
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust target volatility, max leverage, and EWMA decay to see how the strategy dynamically sizes positions.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Target Vol: {targetVol}%</span>
          <input type="range" min="5" max="25" step="1" value={targetVol}
            onChange={e => setTargetVol(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Max Leverage: {maxLeverage.toFixed(1)}x</span>
          <input type="range" min="1.0" max="3.0" step="0.1" value={maxLeverage}
            onChange={e => setMaxLeverage(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>EWMA Lambda: {ewmaLambda.toFixed(2)}</span>
          <input type="range" min="0.90" max="0.99" step="0.01" value={ewmaLambda}
            onChange={e => setEwmaLambda(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">Realized Vol (blue) vs Leverage (green)</p>
        <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full max-w-2xl mx-auto block">
          <line x1="0" y1={chartH - (targetVol / maxVol) * chartH} x2={chartW} y2={chartH - (targetVol / maxVol) * chartH}
            stroke="#f59e0b" strokeWidth="1" strokeDasharray="4" />
          <path d={volPath} fill="none" stroke="#6366f1" strokeWidth="1.5" />
          <path d={levPath} fill="none" stroke="#22c55e" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="mt-3 flex justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1"><span className="inline-block w-4 h-0.5 bg-indigo-500" /> Realized Vol</span>
        <span className="flex items-center gap-1"><span className="inline-block w-4 h-0.5 bg-green-500" /> Leverage</span>
        <span className="flex items-center gap-1"><span className="inline-block w-4 h-0.5 bg-amber-500" /> Target Vol</span>
      </div>

      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        Note how leverage <span className="text-green-600">decreases</span> during the high-vol period (days 60-90)
        and <span className="text-green-600">increases</span> during calm markets.
      </p>
    </div>
  )
}

export default function ManagedVolatility() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Managed Volatility with India VIX
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Volatility targeting (or managed volatility) dynamically scales portfolio exposure to maintain
        a constant level of risk over time. When market volatility rises (as measured by India VIX
        or realized volatility), the strategy reduces leverage; when volatility falls, it increases
        exposure. This simple mechanism dramatically improves risk-adjusted returns for momentum
        and trend-following strategies on the Nifty 50.
      </p>

      <DefinitionBlock
        title="Volatility Targeting"
        label="Definition 5.6"
        definition="Volatility targeting is a dynamic position sizing technique that scales portfolio exposure inversely with estimated volatility to achieve a constant target risk level. The leverage at time t is computed as the ratio of target volatility to forecasted volatility."
        notation={<>Leverage: <InlineMath math="L_t = \min\left(\frac{\sigma_{\text{target}}}{\hat{\sigma}_t}, L_{\max}\right)" /> where <InlineMath math="\hat{\sigma}_t" /> is the volatility forecast and <InlineMath math="L_{\max}" /> is the maximum allowed leverage.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        India VIX: The Fear Gauge
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        India VIX, computed by NSE from Nifty 50 options prices, measures the market's expectation
        of 30-day forward volatility. It is computed using the CBOE VIX methodology adapted for
        Indian markets:
      </p>

      <BlockMath math="\text{India VIX} = 100 \times \sqrt{\frac{2}{T}\sum_i \frac{\Delta K_i}{K_i^2} e^{rT} Q(K_i) - \frac{1}{T}\left(\frac{F}{K_0} - 1\right)^2}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="T" /> is time to expiry, <InlineMath math="K_i" /> are option strike prices,
        <InlineMath math="Q(K_i)" /> is the midpoint of the bid-ask spread for each out-of-the-money
        option, <InlineMath math="F" /> is the forward Nifty level, and <InlineMath math="r" /> is the
        risk-free rate (typically the 91-day T-bill rate).
      </p>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Volatility Estimation Methods
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Several approaches to estimate volatility for targeting:
      </p>

      <BlockMath math="\text{EWMA: } \hat{\sigma}_t^2 = \lambda \hat{\sigma}_{t-1}^2 + (1-\lambda) r_{t-1}^2" />

      <BlockMath math="\text{Realized Vol: } \hat{\sigma}_t = \sqrt{\frac{252}{n}\sum_{i=0}^{n-1} r_{t-i}^2}" />

      <BlockMath math="\text{Yang-Zhang: } \hat{\sigma}_{YZ}^2 = \hat{\sigma}_{OC}^2 + k \hat{\sigma}_{RS}^2 + (1-k)\hat{\sigma}_{CC}^2" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The Yang-Zhang estimator uses open, high, low, and close prices, providing 7x better
        efficiency than close-to-close volatility. For Nifty, where overnight gaps can be
        significant (due to SGX Nifty / GIFT Nifty moves), this is particularly valuable.
      </p>

      <TheoremBlock
        title="Volatility Clustering and Mean Reversion"
        label="Theorem 5.6"
        statement={<>India VIX exhibits two key properties that make it useful for volatility targeting: (1) <strong>Clustering</strong>: High-volatility periods tend to be followed by high-volatility periods, making volatility partially predictable. Formally, the autocorrelation of <InlineMath math="\sigma_t^2" /> is significantly positive: <InlineMath math="\text{Corr}(\sigma_t^2, \sigma_{t+1}^2) > 0" />. (2) <strong>Mean Reversion</strong>: India VIX mean-reverts to its long-term average (historically around 16-18%), so extreme VIX levels tend to normalize. These properties ensure that past volatility is a reasonable predictor of near-future volatility.</>}
      />

      <InteractiveVolTargeting />

      <PythonCode
        title="vol_targeting_india_vix.py"
        runnable
        code={`import numpy as np

# Managed Volatility Strategy using India VIX
np.random.seed(42)
n_days = 756  # 3 years

# Simulate Nifty 50 with volatility clustering (GARCH-like)
nifty = np.zeros(n_days)
nifty[0] = 18000
vol = np.zeros(n_days)
vol[0] = 0.14  # Initial annualized vol (14%)
india_vix = np.zeros(n_days)

omega = 0.000002
alpha_garch = 0.08
beta_garch = 0.90

for t in range(1, n_days):
    # GARCH(1,1) daily variance
    daily_var = omega + alpha_garch * (nifty[t-1] * 0.01 * np.random.randn())**2 / nifty[t-1]**2 + beta_garch * (vol[t-1]/np.sqrt(252))**2
    vol[t] = np.sqrt(daily_var * 252)

    # India VIX = implied vol (slightly above realized + noise)
    india_vix[t] = vol[t] * 100 * (1.1 + np.random.randn() * 0.05)

    # Nifty price with vol regime
    ret = 0.0004 + np.random.randn() * np.sqrt(daily_var)
    nifty[t] = nifty[t-1] * (1 + ret)

returns = np.diff(nifty) / nifty[:-1]

# Strategy: Vol-targeted Nifty 50
target_vol = 0.15  # 15% annualized
max_leverage = 2.0
min_leverage = 0.2

# Method 1: EWMA volatility
ewma_lambda = 0.94
ewma_var = np.zeros(len(returns))
ewma_var[0] = np.var(returns[:20])

for t in range(1, len(returns)):
    ewma_var[t] = ewma_lambda * ewma_var[t-1] + (1-ewma_lambda) * returns[t-1]**2

ewma_vol = np.sqrt(ewma_var * 252)
ewma_leverage = np.clip(target_vol / ewma_vol, min_leverage, max_leverage)

# Method 2: India VIX-based
vix_vol = india_vix[1:] / 100  # Convert VIX to decimal
vix_leverage = np.clip(target_vol / vix_vol, min_leverage, max_leverage)

# Compute strategy returns
buy_hold_returns = returns
ewma_strategy = ewma_leverage * returns
vix_strategy = vix_leverage * returns

# Performance comparison
strategies = {
    'Buy & Hold Nifty': buy_hold_returns,
    'EWMA Vol Target': ewma_strategy,
    'VIX Vol Target': vix_strategy
}

print("=== Managed Volatility Performance ===")
print(f"{'Strategy':<20} {'Ann Ret':<10} {'Ann Vol':<10} {'Sharpe':<8} "
      f"{'MaxDD':<10} {'Calmar':<8} {'Sortino':<8}")

for name, rets in strategies.items():
    ann_ret = np.mean(rets) * 252
    ann_vol = np.std(rets) * np.sqrt(252)
    sharpe = ann_ret / ann_vol if ann_vol > 0 else 0
    cum = np.cumsum(rets)
    max_dd = np.min(cum - np.maximum.accumulate(cum))
    calmar = ann_ret / abs(max_dd) if max_dd != 0 else 0
    downside_vol = np.std(rets[rets < 0]) * np.sqrt(252)
    sortino = ann_ret / downside_vol if downside_vol > 0 else 0

    print(f"{name:<20} {ann_ret*100:>6.1f}%   {ann_vol*100:>6.1f}%   "
          f"{sharpe:>5.2f}   {max_dd*100:>7.1f}%   {calmar:>5.2f}   {sortino:>5.2f}")

# VIX regime analysis
print(f"\\n=== India VIX Regime Analysis ===")
vix_percentiles = [10, 25, 50, 75, 90]
for p in vix_percentiles:
    threshold = np.percentile(india_vix[1:], p)
    print(f"VIX P{p:<3}: {threshold:.1f}")

# Returns in different VIX regimes
low_vix = india_vix[1:] < np.percentile(india_vix[1:], 25)
high_vix = india_vix[1:] > np.percentile(india_vix[1:], 75)

print(f"\\n=== Nifty Returns by VIX Regime ===")
print(f"Low VIX (<P25):  Ann ret = {np.mean(returns[low_vix])*252*100:.1f}%, "
      f"Vol = {np.std(returns[low_vix])*np.sqrt(252)*100:.1f}%")
print(f"High VIX (>P75): Ann ret = {np.mean(returns[high_vix])*252*100:.1f}%, "
      f"Vol = {np.std(returns[high_vix])*np.sqrt(252)*100:.1f}%")

# Leverage statistics
print(f"\\n=== Leverage Statistics ===")
print(f"{'Metric':<20} {'EWMA':<12} {'VIX-based':<12}")
print(f"{'Mean leverage':<20} {np.mean(ewma_leverage):>8.2f}x   {np.mean(vix_leverage):>8.2f}x")
print(f"{'Median leverage':<20} {np.median(ewma_leverage):>8.2f}x   {np.median(vix_leverage):>8.2f}x")
print(f"{'Min leverage':<20} {np.min(ewma_leverage):>8.2f}x   {np.min(vix_leverage):>8.2f}x")
print(f"{'Max leverage':<20} {np.max(ewma_leverage):>8.2f}x   {np.max(vix_leverage):>8.2f}x")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        India VIX Regimes and Trading Implications
      </h3>
      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">VIX Level</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Regime</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Leverage</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Strategy Implication</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">&lt; 12</td>
              <td className="px-5 py-2">Complacency</td>
              <td className="px-5 py-2">1.5-2.0x</td>
              <td className="px-5 py-2">Max exposure, trend-following works well</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">12-18</td>
              <td className="px-5 py-2">Normal</td>
              <td className="px-5 py-2">0.8-1.5x</td>
              <td className="px-5 py-2">Standard positioning</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">18-25</td>
              <td className="px-5 py-2">Elevated</td>
              <td className="px-5 py-2">0.5-0.8x</td>
              <td className="px-5 py-2">Reduced exposure, tighter stops</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">25-35</td>
              <td className="px-5 py-2">High fear</td>
              <td className="px-5 py-2">0.2-0.5x</td>
              <td className="px-5 py-2">Minimal exposure, consider hedges</td>
            </tr>
            <tr>
              <td className="px-5 py-2">&gt; 35</td>
              <td className="px-5 py-2">Panic</td>
              <td className="px-5 py-2">0.2x (floor)</td>
              <td className="px-5 py-2">Emergency risk-off, potential mean-reversion opportunity</td>
            </tr>
          </tbody>
        </table>
      </div>

      <ExampleBlock
        title="Vol Targeting Calculation"
        difficulty="beginner"
        problem="India VIX is at 22. Your target volatility is 15% and maximum leverage is 2x. Capital is INR 50 lakhs. How many Nifty futures lots should you hold if Nifty is at 22,000?"
        solution={[
          {
            step: 'Compute target leverage',
            formula: 'L = \\frac{\\sigma_{target}}{\\text{India VIX}} = \\frac{15\\%}{22\\%} = 0.682',
            explanation: 'India VIX is above target vol, so leverage is below 1x (under-exposed).',
          },
          {
            step: 'Compute target notional',
            formula: '\\text{Notional} = L \\times \\text{Capital} = 0.682 \\times 50,00,000 = \\text{INR 34,09,091}',
          },
          {
            step: 'Convert to Nifty futures lots',
            formula: '\\text{Lots} = \\frac{34,09,091}{25 \\times 22,000} = 6.2 \\approx 6 \\text{ lots}',
            explanation: 'Round to 6 lots. Each lot has notional value of INR 5.5 lakhs. Margin required: ~INR 3.96 lakhs (12% SPAN).',
          },
        ]}
      />

      <NoteBlock title="India VIX Historical Extremes" type="historical">
        <p>
          India VIX hit its all-time high of 87.6 on November 17, 2008 during the Global Financial
          Crisis. During the COVID-19 crash in March 2020, it reached 83.6. Both instances were
          followed by sharp market recoveries. At the other extreme, VIX has occasionally dropped
          below 10 during prolonged calm periods (e.g., late 2017), often preceding corrections.
          A volatility targeting strategy would have dramatically reduced exposure during these
          stress events, limiting drawdowns by 40-60% compared to buy-and-hold.
        </p>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Managed volatility using India VIX or EWMA-estimated volatility consistently improves
          the Sharpe ratio and Calmar ratio of Nifty strategies. The mechanism is simple: reduce
          exposure when risk is high, increase when risk is low. This works because volatility
          is persistent (predictable) and high-volatility periods tend to have poor risk-adjusted
          returns. For NSE implementation, use Nifty futures with SEBI-compliant margin, and
          rebalance leverage daily or weekly based on updated volatility estimates.
        </p>
      </NoteBlock>
    </div>
  )
}
