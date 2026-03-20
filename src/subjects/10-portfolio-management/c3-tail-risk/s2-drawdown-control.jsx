import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveCPPI() {
  const [floor, setFloor] = useState(80)
  const [multiplier, setMultiplier] = useState(3)
  const [portfolioValue, setPortfolioValue] = useState(100)

  const cushion = Math.max(0, portfolioValue - floor)
  const equityExposure = Math.min(multiplier * cushion, portfolioValue)
  const bondExposure = portfolioValue - equityExposure
  const equityPct = (equityExposure / portfolioValue) * 100

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: CPPI Allocation
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        See how CPPI dynamically adjusts equity/bond allocation based on cushion.
      </p>
      <div className="mb-4 grid grid-cols-3 gap-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Floor: {floor}%</span>
          <input type="range" min="60" max="95" step="1" value={floor}
            onChange={e => setFloor(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Multiplier (m): {multiplier}</span>
          <input type="range" min="1" max="8" step="0.5" value={multiplier}
            onChange={e => setMultiplier(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Portfolio Value: {portfolioValue}</span>
          <input type="range" min="70" max="150" step="1" value={portfolioValue}
            onChange={e => setPortfolioValue(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>
      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30">
          <div className="text-gray-500">Cushion</div>
          <div className="text-lg font-bold text-indigo-600">{cushion.toFixed(0)}</div>
        </div>
        <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/30">
          <div className="text-gray-500">Equity %</div>
          <div className="text-lg font-bold text-green-600">{equityPct.toFixed(1)}%</div>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30">
          <div className="text-gray-500">Bond %</div>
          <div className="text-lg font-bold text-amber-600">{(100 - equityPct).toFixed(1)}%</div>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
          <div className="text-gray-500">Gap Risk</div>
          <div className="text-lg font-bold text-purple-600">{(100/multiplier).toFixed(1)}%</div>
        </div>
      </div>
    </div>
  )
}

export default function DrawdownControl() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        CPPI and Drawdown Constraints
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Constant Proportion Portfolio Insurance (CPPI) is a dynamic allocation strategy that provides a floor on portfolio value while maintaining upside participation. For Indian investors, CPPI is the mathematical foundation behind popular 'balanced advantage' and 'dynamic asset allocation' mutual fund categories regulated by SEBI.
      </p>

      <DefinitionBlock
        title="CPPI Strategy"
        label="Definition 10.8"
        definition="Constant Proportion Portfolio Insurance (CPPI) dynamically allocates between a risky asset (equity) and a safe asset (bonds) based on the cushion -- the difference between current portfolio value V and a floor F. Equity exposure = m × (V - F), where m is the multiplier. As the portfolio approaches the floor, equity exposure decreases to zero, protecting the floor value."
        notation="V = portfolio value, F = floor, C = V-F (cushion), m = multiplier, E = min(m*C, V)"
      />

      <BlockMath math="\text{Equity Exposure} = E_t = \min(m \times C_t, V_t) = \min(m(V_t - F_t), V_t)" />

      <BlockMath math="\text{Floor Growth: } F_t = F_0 \cdot e^{r_f \cdot t}" />

      <BlockMath math="\text{Gap Risk: } P(\text{breach}) = P(R_{\text{equity}} < -1/m)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        CPPI is widely used in India through SEBI-categorized Balanced Advantage Funds and Dynamic Asset Allocation Funds. These funds use variants of CPPI with P/E-based or model-based equity allocation, typically ranging from 30-80% equity. Popular examples include ICICI Prudential Balanced Advantage, HDFC Balanced Advantage, and Edelweiss Balanced Advantage.
      </p>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The multiplier m controls the aggressiveness of the strategy. Higher m means more equity exposure for a given cushion, but also higher gap risk. For Indian markets with circuit breaker limits of 20% on individual stocks and 15% on indices, a multiplier of 3-5 is typical.
      </p>

      <TheoremBlock
        title="CPPI Gap Risk"
        label="Theorem 10.7"
        statement="CPPI guarantees the floor only if the risky asset does not gap down by more than 1/m in a single rebalancing period. The gap risk is: P(breach) = P(R_equity < -1/m). For m=4 and daily rebalancing, the critical gap is -25%, which is rare but occurred for Nifty during circuit breaker days."
        proof="The floor breach occurs when m × C × (1+R) < 0, i.e., R < -1/m. For continuous rebalancing, the floor is never breached. In discrete time, gap risk exists."
      />

      <InteractiveCPPI />

      <PythonCode
        title="cppi_simulation.py"
        runnable
        code={`import numpy as np

np.random.seed(42)

# CPPI simulation for Indian balanced portfolio
T = 252 * 10  # 10 years daily
V0 = 100  # Initial portfolio value (INR lakh)
floor_pct = 0.80  # Protect 80% of initial value
multiplier = 4
rf = 0.065 / 252  # Daily risk-free rate (G-Sec)

# Nifty 50 returns (with crash events)
mu = 0.12 / 252
sigma = 0.20 / np.sqrt(252)
returns = np.random.normal(mu, sigma, T)

# Add 2 crash events
returns[500:515] = np.random.normal(-0.025, 0.035, 15)  # Crash 1
returns[1800:1810] = np.random.normal(-0.035, 0.04, 10)  # Crash 2

# CPPI simulation
V = np.zeros(T + 1)
V[0] = V0
floor_values = np.zeros(T + 1)
floor_values[0] = V0 * floor_pct
equity_pcts = []

for t in range(T):
    floor_values[t + 1] = floor_values[t] * (1 + rf)
    cushion = max(V[t] - floor_values[t], 0)
    equity = min(multiplier * cushion, V[t])
    bond = V[t] - equity
    equity_pcts.append(equity / V[t] * 100 if V[t] > 0 else 0)
    
    V[t + 1] = equity * (1 + returns[t]) + bond * (1 + rf)
    V[t + 1] = max(V[t + 1], 0)

# Buy-and-hold comparison
bh = V0 * np.cumprod(np.concatenate([[1], 1 + returns]))

# Metrics
cppi_ret = (V[-1] / V[0]) ** (252/T) - 1
bh_ret = (bh[-1] / bh[0]) ** (252/T) - 1
cppi_dd = np.min(V / np.maximum.accumulate(V) - 1)
bh_dd = np.min(bh / np.maximum.accumulate(bh) - 1)
cppi_vol = np.std(np.diff(np.log(V[V>0]))) * np.sqrt(252)
bh_vol = np.std(np.diff(np.log(bh[bh>0]))) * np.sqrt(252)

print("=== CPPI vs Buy-and-Hold (10 Year Simulation) ===")
print(f"Floor: {floor_pct:.0%} of initial, Multiplier: {multiplier}")
print(f"\n{'Metric':<15} {'CPPI':>10} {'Buy&Hold':>10}")
print("-" * 38)
print(f"{'CAGR':<15} {cppi_ret:>10.2%} {bh_ret:>10.2%}")
print(f"{'Vol':<15} {cppi_vol:>10.2%} {bh_vol:>10.2%}")
print(f"{'Max Drawdown':<15} {cppi_dd:>10.2%} {bh_dd:>10.2%}")
print(f"{'Min Value':<15} {np.min(V):>10.1f} {np.min(bh):>10.1f}")
print(f"{'Avg Equity %':<15} {np.mean(equity_pcts):>9.1f}%")
print(f"{'Floor breached':<15} {'Yes' if np.min(V) < floor_values[np.argmin(V)] else 'No':>10}")`}
      />

      <ExampleBlock
        title="CPPI Floor Breach Analysis"
        difficulty="intermediate"
        problem="A CPPI portfolio with m=4 and floor=85% has current value INR 95 (initial=100, floor=85). Nifty drops 8% overnight due to global selloff. Does the floor breach?"
        solution={[
          {
            step: 'Compute cushion',
            formula: 'C = V - F = 95 - 85 = 10',
          },
          {
            step: 'Equity exposure',
            formula: 'E = m \times C = 4 \times 10 = 40 \text{ (out of 95)}',
          },
          {
            step: 'Portfolio after crash',
            formula: 'V\' = 40 \times 0.92 + 55 \times 1.0 = 36.8 + 55 = 91.8',
            explanation: 'Portfolio value falls to 91.8, still above floor of 85. No breach since the 8% drop is less than 1/m = 25%.',
          }
        ]}
      />

      

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          CPPI provides a systematic framework for drawdown control that is widely used in Indian balanced advantage funds. The key parameter is the multiplier m, which controls the risk-return trade-off. For Indian markets with circuit breaker protections, m=3-5 provides good upside participation with robust floor protection.
        </p>
      </NoteBlock>
    </div>
  )
}
