import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveVIXTermStructure() {
  const [spotVix, setSpotVix] = useState(14)
  const [contango, setContango] = useState(1.5)
  const [meanLevel, setMeanLevel] = useState(16)

  const months = [0, 1, 2, 3, 4, 5, 6]
  const termStructure = months.map(m => {
    if (m === 0) return spotVix
    const kappa = 0.1
    return spotVix + (meanLevel - spotVix) * (1 - Math.exp(-kappa * m)) + contango * Math.sqrt(m)
  })

  const chartW = 480, chartH = 150, padL = 50
  const maxV = Math.max(...termStructure) * 1.1
  const minV = Math.min(...termStructure) * 0.9
  const toY = (v) => chartH + 5 - ((v - minV) / (maxV - minV)) * chartH
  const toX = (i) => padL + (i / (months.length - 1)) * (chartW - padL)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: India VIX Term Structure
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Model the VIX futures term structure by adjusting spot VIX, contango, and mean reversion level.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Spot India VIX = {spotVix}</span>
          <input type="range" min="8" max="35" step="0.5" value={spotVix}
            onChange={e => setSpotVix(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Contango Factor = {contango.toFixed(1)}</span>
          <input type="range" min="-2" max="4" step="0.25" value={contango}
            onChange={e => setContango(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Mean Level = {meanLevel}</span>
          <input type="range" min="10" max="25" step="0.5" value={meanLevel}
            onChange={e => setMeanLevel(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox={`0 0 ${chartW + 20} ${chartH + 40}`}
        className="w-full max-w-2xl mx-auto block" aria-label="VIX term structure">
        <line x1={padL} y1={5} x2={padL} y2={chartH + 5} stroke="#9ca3af" strokeWidth="1" />
        <line x1={padL} y1={chartH + 5} x2={chartW + padL - padL} y2={chartH + 5} stroke="#9ca3af" strokeWidth="1" />

        <polyline points={months.map((_, i) => `${toX(i)},${toY(termStructure[i])}`).join(' ')}
          fill="none" stroke="#6366f1" strokeWidth="2.5" />

        {months.map((m, i) => (
          <g key={i}>
            <circle cx={toX(i)} cy={toY(termStructure[i])} r="4" fill="#6366f1" />
            <text x={toX(i)} y={chartH + 22} textAnchor="middle" className="text-[9px]" fill="#9ca3af">
              {m === 0 ? 'Spot' : `M${m}`}
            </text>
            <text x={toX(i)} y={toY(termStructure[i]) - 8} textAnchor="middle" className="text-[9px]" fill="#6366f1">
              {termStructure[i].toFixed(1)}
            </text>
          </g>
        ))}

        {/* Mean level line */}
        <line x1={padL} y1={toY(meanLevel)} x2={chartW} y2={toY(meanLevel)}
          stroke="#ef4444" strokeWidth="1" strokeDasharray="4" />
        <text x={chartW + 5} y={toY(meanLevel) + 3} className="text-[8px]" fill="#ef4444">mean</text>
      </svg>

      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        {contango > 0 ? 'Contango: futures above spot (normal)' : 'Backwardation: futures below spot (fear)'}
      </p>
    </div>
  )
}

export default function VIXStrategies() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        VIX Strategies
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        India VIX, computed by NSE from Nifty 50 option prices, measures the market's 30-day
        implied volatility expectation. VIX-based strategies exploit the mean-reverting nature
        of volatility, the persistent contango in VIX futures, and the negative correlation
        between VIX and Nifty returns. Though India VIX futures have limited liquidity, synthetic
        VIX exposure can be constructed through Nifty options.
      </p>

      <DefinitionBlock
        title="India VIX"
        label="Definition 7.11"
        definition="India VIX is a model-free measure of 30-day expected volatility of the Nifty 50 index, computed using the variance swap methodology from near-term and mid-term Nifty option prices across all available strikes."
        notation="\text{VIX}^2 = \frac{2}{T}\sum_i \frac{\Delta K_i}{K_i^2}e^{rT}Q(K_i) - \frac{1}{T}\left(\frac{F}{K_0} - 1\right)^2"
      />

      <BlockMath math="\text{India VIX} = 100 \times \sqrt{\frac{2}{T}\sum_i \frac{\Delta K_i}{K_i^2}e^{rT}Q(K_i) - \frac{1}{T}\left(\frac{F}{K_0} - 1\right)^2}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        India VIX typically ranges from 10 (extreme calm) to 40+ (crisis). Key statistical
        properties relevant for strategy design:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Property</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Value</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Strategy Implication</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Mean (10-year)</td>
              <td className="px-4 py-2">~16-18</td>
              <td className="px-4 py-2">Anchor for mean reversion trades</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Nifty correlation</td>
              <td className="px-4 py-2">-0.70 to -0.85</td>
              <td className="px-4 py-2">VIX as portfolio hedge</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Half-life</td>
              <td className="px-4 py-2">~25-40 trading days</td>
              <td className="px-4 py-2">Mean reversion speed</td>
            </tr>
            <tr>
              <td className="px-4 py-2">VRP (avg)</td>
              <td className="px-4 py-2">3-5 vol points</td>
              <td className="px-4 py-2">Structural short vol edge</td>
            </tr>
          </tbody>
        </table>
      </div>

      <TheoremBlock
        title="VIX Mean Reversion Half-Life"
        label="Theorem 7.8"
        statement="If VIX follows an Ornstein-Uhlenbeck process dV = \kappa(\theta - V)dt + \xi dW, the expected time for VIX to revert halfway to its long-term mean from any current level is t_{1/2} = \ln(2)/\kappa. For India VIX with \kappa \approx 4-6 (annualized), this is 40-63 trading days."
        proof="The expected value of the OU process at time t is E[V_t] = \theta + (V_0 - \theta)e^{-\kappa t}. Setting E[V_{t_{1/2}}] - \theta = \frac{1}{2}(V_0 - \theta) gives e^{-\kappa t_{1/2}} = 1/2, hence t_{1/2} = \ln(2)/\kappa."
      />

      <InteractiveVIXTermStructure />

      <PythonCode
        title="vix_strategies.py"
        runnable
        code={`import numpy as np

np.random.seed(42)

# Simulate India VIX using OU process
kappa = 5.0       # Mean reversion speed (annual)
theta = 16.0      # Long-term VIX level
xi = 4.0          # Vol of VIX
V0 = 14.0         # Current VIX
T = 1.0           # 1 year
N_days = 252
dt = T / N_days

print("=== India VIX Simulation (OU Process) ===")
print(f"kappa={kappa}, theta={theta}, xi={xi}, V0={V0}")
print(f"Half-life: {np.log(2)/kappa*252:.0f} trading days")

# Simulate paths
N_sims = 10000
vix_paths = np.zeros((N_sims, N_days + 1))
vix_paths[:, 0] = V0

for t in range(N_days):
    dW = np.random.standard_normal(N_sims) * np.sqrt(dt)
    vix_paths[:, t+1] = (vix_paths[:, t]
        + kappa * (theta - vix_paths[:, t]) * dt
        + xi * dW)
    vix_paths[:, t+1] = np.maximum(vix_paths[:, t+1], 5)  # floor at 5

# Strategy 1: Mean Reversion
print(f"\\n=== Strategy 1: VIX Mean Reversion ===")
entry_level = 12  # Enter long vol when VIX < 12
exit_level = theta  # Exit when VIX returns to mean

total_trades = 0
winning = 0
total_return = 0

for sim in range(N_sims):
    path = vix_paths[sim]
    in_trade = False
    entry_vix = 0

    for day in range(N_days):
        if not in_trade and path[day] < entry_level:
            in_trade = True
            entry_vix = path[day]
        elif in_trade and path[day] >= exit_level:
            pnl_pct = (path[day] - entry_vix) / entry_vix
            total_trades += 1
            total_return += pnl_pct
            if pnl_pct > 0:
                winning += 1
            in_trade = False

if total_trades > 0:
    print(f"Total signals: {total_trades}")
    print(f"Win rate: {winning/total_trades*100:.1f}%")
    print(f"Avg return: {total_return/total_trades*100:.1f}%")

# Strategy 2: Short vol premium harvesting
print(f"\\n=== Strategy 2: Systematic Short Vol (Monthly) ===")
monthly_pnls = []
for sim in range(N_sims):
    path = vix_paths[sim]
    for month in range(12):
        start = month * 21
        end = min(start + 21, N_days)
        if end <= N_days:
            iv = path[start]
            rv = np.std(np.diff(np.log(
                np.maximum(path[start:end+1], 5)))) * np.sqrt(252) * 100
            vrp = iv - rv / 100 * 100
            monthly_pnls.append(vrp)

monthly_pnls = np.array(monthly_pnls)
print(f"Avg monthly VRP: {np.mean(monthly_pnls):.2f} vol pts")
print(f"Win rate: {(monthly_pnls > 0).mean()*100:.1f}%")
print(f"Sharpe: {np.mean(monthly_pnls)/np.std(monthly_pnls)*np.sqrt(12):.2f}")

# VIX percentile analysis
final_vix = vix_paths[:, -1]
percentiles = [5, 25, 50, 75, 95]
print(f"\\n=== VIX Distribution After 1 Year ===")
for p in percentiles:
    print(f"  {p}th percentile: {np.percentile(final_vix, p):.1f}")`}
      />

      <ExampleBlock
        title="VIX Mean Reversion Trade"
        difficulty="intermediate"
        problem="India VIX is at 11 (historically low). Its long-term mean is 16. You implement a synthetic long VIX position by buying Nifty ATM straddles (estimated 1.5x vega multiplier to VIX). If VIX reverts to 14 over the next 30 days, estimate the P&L per lot."
        solution={[
          {
            step: 'VIX change expected',
            formula: '\\Delta\\text{VIX} = 14 - 11 = +3 \\text{ vol points}',
          },
          {
            step: 'ATM Nifty straddle vega (approximate)',
            formula: '\\text{Vega}_{\\text{straddle}} \\approx 2 \\times 62 = 124 \\text{ per unit per vol point}',
            explanation: 'ATM straddle has roughly 2x the vega of a single option.',
          },
          {
            step: 'Estimated P&L',
            formula: '\\text{P\\&L} \\approx 124 \\times 3 \\times 75 / 100 = \\text{INR } 2,790 \\text{ per lot}',
            explanation: 'Dividing by 100 since vega is per 1% vol change. However, theta decay over 30 days will offset some of this gain -- net P&L depends on actual Nifty realized vol during the period.',
          },
        ]}
      />

      <NoteBlock title="India VIX Futures" type="tip">
        <p>
          NSE launched India VIX futures in 2014, but liquidity has been consistently thin (often
          less than 1000 contracts/day). For practical VIX exposure, most traders use Nifty ATM
          straddles or strangles as proxies. The key difference: VIX futures reflect forward
          expectations and are in contango 80% of the time, while straddles give spot vol exposure
          plus theta drag. SEBI has been considering VIX options but they are not yet available.
        </p>
      </NoteBlock>

      <NoteBlock title="VIX Regime Detection" type="warning">
        <p>
          VIX-based strategies must account for regime changes. India VIX below 12 might signal
          complacency (buy protection), while VIX above 25 might signal panic (sell premium). But
          during sustained bear markets (like 2008 or 2020), VIX can stay elevated for weeks.
          Using a 60-day percentile rank of VIX as a regime indicator is more robust than
          fixed thresholds. When VIX rank exceeds the 90th percentile, short vol positions
          should be reduced or hedged with far-OTM puts.
        </p>
      </NoteBlock>
    </div>
  )
}
