import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveAlmgrenChriss() {
  const [riskAversion, setRiskAversion] = useState(0.001)
  const [totalShares, setTotalShares] = useState(50000)
  const [nPeriods, setNPeriods] = useState(10)
  const [volatility, setVolatility] = useState(0.02)

  const eta = 0.01
  const gamma = 0.05

  const kappa = Math.sqrt(riskAversion * volatility * volatility / eta)
  const trajectory = []
  for (let i = 0; i <= nPeriods; i++) {
    const t = i / nPeriods
    const shares = totalShares * Math.sinh(kappa * (1 - t)) / Math.sinh(kappa)
    trajectory.push(shares)
  }

  const chartW = 500
  const chartH = 180

  const path = trajectory.map((s, i) => {
    const x = (i / nPeriods) * chartW
    const y = chartH - (s / totalShares) * (chartH - 20) - 10
    return `${i === 0 ? 'M' : 'L'}${x},${y}`
  }).join(' ')

  const linearPath = Array.from({ length: nPeriods + 1 }, (_, i) => {
    const x = (i / nPeriods) * chartW
    const s = totalShares * (1 - i / nPeriods)
    const y = chartH - (s / totalShares) * (chartH - 20) - 10
    return `${i === 0 ? 'M' : 'L'}${x},${y}`
  }).join(' ')

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Almgren-Chriss Optimal Execution Trajectory
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust risk aversion to see how the optimal liquidation path changes for Indian mid-cap stocks.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Risk Aversion: {riskAversion.toFixed(4)}</span>
          <input type="range" min="0.0001" max="0.01" step="0.0001" value={riskAversion}
            onChange={e => setRiskAversion(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Shares: {totalShares.toLocaleString()}</span>
          <input type="range" min="10000" max="100000" step="5000" value={totalShares}
            onChange={e => setTotalShares(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Periods: {nPeriods}</span>
          <input type="range" min="5" max="30" step="1" value={nPeriods}
            onChange={e => setNPeriods(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Volatility: {(volatility * 100).toFixed(1)}%</span>
          <input type="range" min="0.005" max="0.05" step="0.005" value={volatility}
            onChange={e => setVolatility(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full max-w-2xl mx-auto block">
        <path d={linearPath} fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
        <path d={path} fill="none" stroke="#6366f1" strokeWidth="2" />
        <text x="10" y="15" className="text-[9px]" fill="#6b7280">Shares remaining</text>
        <text x={chartW - 10} y={chartH - 2} textAnchor="end" className="text-[9px]" fill="#6b7280">Time</text>
      </svg>

      <div className="mt-3 flex justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1"><span className="inline-block w-4 h-0.5 bg-indigo-500" /> Optimal (A-C)</span>
        <span className="flex items-center gap-1"><span className="inline-block w-4 h-0.5 bg-gray-400" style={{ borderTop: '1px dashed' }} /> Linear (TWAP)</span>
      </div>

      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        {riskAversion > 0.005
          ? 'High risk aversion: front-loaded execution to reduce timing risk'
          : riskAversion < 0.001
          ? 'Low risk aversion: more uniform, minimizing impact cost'
          : 'Balanced: moderate front-loading with impact consideration'}
      </p>
    </div>
  )
}

export default function OptimalExecution() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Almgren-Chriss Optimal Execution for Indian Mid-Caps
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The Almgren-Chriss (2000) framework provides the gold standard for optimal execution
        of large orders. It formalizes the fundamental trade-off between market impact (trading
        too fast) and timing risk (trading too slow). For Indian mid-cap stocks on the NSE,
        where liquidity is thinner and spreads wider than large-caps, this framework is
        especially valuable for institutional traders.
      </p>

      <DefinitionBlock
        title="Implementation Shortfall"
        label="Definition 5.13"
        definition="Implementation shortfall (IS) is the difference between the paper return of a trading decision and the actual return achieved after execution. It captures all costs of trading: market impact, timing risk, and opportunity cost. IS is the standard benchmark for measuring execution quality."
        notation={<>IS = <InlineMath math="(P_{exec} - P_{decision}) \times \text{sign}(q)" /> where <InlineMath math="P_{exec}" /> is the average execution price, <InlineMath math="P_{decision}" /> is the price when the trading decision was made, and <InlineMath math="q" /> is the signed quantity.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Almgren-Chriss Model
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The model assumes a trader must liquidate <InlineMath math="X" /> shares over
        <InlineMath math="T" /> periods. The stock price follows:
      </p>

      <BlockMath math="S_k = S_{k-1} + \sigma \tau^{1/2} \xi_k - g\left(\frac{n_k}{\tau}\right)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\sigma" /> is volatility, <InlineMath math="\xi_k \sim N(0,1)" />,
        and <InlineMath math="g(\cdot)" /> is the permanent impact function. The temporary impact
        affects only the execution price:
      </p>

      <BlockMath math="\tilde{S}_k = S_k - h\left(\frac{n_k}{\tau}\right)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        With linear impact functions <InlineMath math="g(v) = \gamma v" /> and <InlineMath math="h(v) = \eta v" />,
        the expected cost and variance of execution are:
      </p>

      <BlockMath math="\mathbb{E}[\text{Cost}] = \frac{1}{2}\gamma X^2 + \eta \sum_k \frac{n_k^2}{\tau}" />
      <BlockMath math="\text{Var}[\text{Cost}] = \sigma^2 \sum_k x_k^2 \tau" />

      <TheoremBlock
        title="Almgren-Chriss Optimal Trajectory"
        label="Theorem 5.13"
        statement={<>For a risk-averse trader with mean-variance objective <InlineMath math="\min_{n_1,\ldots,n_N} \mathbb{E}[\text{Cost}] + \lambda \cdot \text{Var}[\text{Cost}]" />, the optimal holdings trajectory is: <BlockMath math="x_k^* = X \cdot \frac{\sinh(\kappa(T-t_k))}{\sinh(\kappa T)}" /> where <InlineMath math="\kappa = \sqrt{\frac{\lambda\sigma^2}{\eta}}" /> is the urgency parameter. When <InlineMath math="\lambda \to 0" /> (risk neutral), the trajectory approaches linear (TWAP). When <InlineMath math="\lambda \to \infty" /> (infinitely risk averse), execution approaches immediate liquidation.</>}
        proof={<>The proof uses calculus of variations. The Lagrangian is <InlineMath math="L = \mathbb{E}[\text{Cost}] + \lambda \cdot \text{Var}[\text{Cost}]" />. Taking the Euler-Lagrange equation with boundary conditions <InlineMath math="x_0 = X" /> and <InlineMath math="x_N = 0" /> yields a second-order difference equation. The general solution involves hyperbolic sine and cosine functions with parameter <InlineMath math="\kappa" /> determined by the ratio of risk penalty to temporary impact.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Efficient Frontier of Execution
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The Almgren-Chriss framework generates an execution efficient frontier in
        expected-cost vs. variance space:
      </p>

      <BlockMath math="\text{Var}[\text{Cost}](\lambda) = \frac{\sigma^2 X^2}{2\kappa} \cdot \frac{\tanh(\kappa T/2)}{\cosh(\kappa T) - 1}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        This curve represents the minimum variance achievable for each level of expected cost,
        analogous to the Markowitz efficient frontier in portfolio theory.
      </p>

      <InteractiveAlmgrenChriss />

      <PythonCode
        title="almgren_chriss_nse.py"
        runnable
        code={`import numpy as np

# Almgren-Chriss Optimal Execution for NSE Mid-Cap Stocks
np.random.seed(42)

class AlmgrenChriss:
    """Almgren-Chriss optimal execution model."""

    def __init__(self, X, T, N, sigma, gamma, eta, lam):
        """
        X: total shares to liquidate
        T: total time horizon (in days)
        N: number of time periods
        sigma: daily volatility
        gamma: permanent impact coefficient
        eta: temporary impact coefficient
        lam: risk aversion parameter
        """
        self.X = X
        self.T = T
        self.N = N
        self.tau = T / N
        self.sigma = sigma
        self.gamma = gamma
        self.eta = eta
        self.lam = lam

        # Urgency parameter
        self.kappa = np.sqrt(lam * sigma**2 / eta)

    def optimal_trajectory(self):
        """Compute optimal holdings trajectory."""
        t = np.linspace(0, self.T, self.N + 1)
        holdings = self.X * np.sinh(self.kappa * (self.T - t)) / \\
                   np.sinh(self.kappa * self.T)
        trades = -np.diff(holdings)
        return holdings, trades

    def expected_cost(self):
        """Expected execution cost."""
        _, trades = self.optimal_trajectory()
        permanent = 0.5 * self.gamma * self.X**2
        temporary = self.eta * np.sum(trades**2 / self.tau)
        return permanent + temporary

    def variance_cost(self):
        """Variance of execution cost."""
        holdings, _ = self.optimal_trajectory()
        return self.sigma**2 * np.sum(holdings[:-1]**2 * self.tau)

    def simulate(self, n_simulations=1000):
        """Monte Carlo simulation of execution."""
        holdings, trades = self.optimal_trajectory()
        costs = []

        for _ in range(n_simulations):
            price = 500.0  # Starting price (INR)
            total_cost = 0

            for k in range(self.N):
                # Random price move
                price += self.sigma * np.sqrt(self.tau) * np.random.randn()
                # Permanent impact
                price -= self.gamma * trades[k]
                # Temporary impact on execution price
                exec_price = price - self.eta * trades[k] / self.tau
                total_cost += trades[k] * exec_price

            costs.append(total_cost)

        return np.array(costs)

# Indian mid-cap stock parameters
stock = "Pidilite Industries"  # Example mid-cap
price = 2800  # INR
adv = 200000  # shares
order_size = 30000  # 15% of ADV - significant for mid-cap
volatility = 0.025  # 2.5% daily vol (higher than large-cap)

# Impact parameters (calibrated for Indian mid-caps)
gamma = 0.05 * price / adv    # Permanent impact
eta = 0.1 * price / adv       # Temporary impact

print(f"=== Almgren-Chriss: {stock} ===")
print(f"Stock price:    INR {price}")
print(f"Order size:     {order_size:,} shares ({order_size/adv*100:.1f}% of ADV)")
print(f"Daily vol:      {volatility*100:.1f}%")
print(f"Perm impact:    {gamma:.6f}")
print(f"Temp impact:    {eta:.6f}")

# Compare different risk aversion levels
print(f"\\n{'Lambda':<10} {'Strategy':<15} {'E[Cost]':<14} {'Std[Cost]':<14} {'Sharpe':<10}")
lambdas = [0.0001, 0.001, 0.005, 0.01, 0.05]

for lam in lambdas:
    ac = AlmgrenChriss(order_size, 5, 20, volatility, gamma, eta, lam)
    costs = ac.simulate(500)
    e_cost = np.mean(costs) / (order_size * price) * 10000  # bps
    s_cost = np.std(costs) / (order_size * price) * 10000
    label = 'Conservative' if lam > 0.01 else ('Balanced' if lam > 0.001 else 'Aggressive')
    sharpe = e_cost / s_cost if s_cost > 0 else 0
    print(f"{lam:<10.4f} {label:<15} {e_cost:>10.1f} bps  {s_cost:>10.1f} bps  {sharpe:>8.2f}")

# Optimal trajectory for chosen risk aversion
ac = AlmgrenChriss(order_size, 5, 20, volatility, gamma, eta, 0.005)
holdings, trades = ac.optimal_trajectory()

print(f"\\n=== Optimal Trajectory (lambda=0.005) ===")
print(f"{'Period':<8} {'Holdings':<12} {'Trade':<12} {'% Remaining':<15}")
for k in range(min(10, len(trades))):
    print(f"{k+1:<8} {holdings[k]:>10,.0f}  {trades[k]:>10,.0f}  {holdings[k]/order_size*100:>10.1f}%")

print(f"\\nUrgency parameter kappa: {ac.kappa:.4f}")
print(f"Expected cost:  {ac.expected_cost()/order_size/price*10000:.1f} bps")
print(f"Cost std dev:   {np.sqrt(ac.variance_cost())/order_size/price*10000:.1f} bps")

# Indian mid-cap liquidity tiers
print(f"\\n=== NSE Mid-Cap Liquidity Tiers ===")
tiers = [
    ('Tier 1 (Nifty Midcap 50)', 500000, 0.015, 0.02),
    ('Tier 2 (Nifty Midcap 100)', 200000, 0.020, 0.05),
    ('Tier 3 (Nifty Smallcap 50)', 80000, 0.030, 0.10),
    ('Tier 4 (Smallcap 250)', 30000, 0.040, 0.20),
]

print(f"{'Tier':<30} {'ADV':<10} {'Vol':<8} {'Spread':<8}")
for name, adv_t, vol_t, spread in tiers:
    print(f"{name:<30} {adv_t:>8,}  {vol_t*100:>5.1f}%  {spread*100:>5.2f}%")`}
      />

      <ExampleBlock
        title="Almgren-Chriss for Nifty Mid-Cap Stock"
        difficulty="advanced"
        problem={<>You need to sell 25,000 shares of a mid-cap stock (price INR 500, ADV 150,000, daily vol 3%). Permanent impact <InlineMath math="\gamma = 0.0002" />, temporary impact <InlineMath math="\eta = 0.0005" />, risk aversion <InlineMath math="\lambda = 0.005" />. Compute the urgency parameter and first-period trade.</>}
        solution={[
          {
            step: 'Compute urgency parameter',
            formula: '\\kappa = \\sqrt{\\frac{\\lambda \\sigma^2}{\\eta}} = \\sqrt{\\frac{0.005 \\times 0.03^2}{0.0005}} = 0.134',
          },
          {
            step: 'Compute optimal first-period holdings (after first trade)',
            formula: 'x_1 = 25000 \\cdot \\frac{\\sinh(0.134 \\times 4)}{\\sinh(0.134 \\times 5)} = 25000 \\times 0.791 = 19,780',
            explanation: 'With 5 periods, after the first period we should hold 19,780 shares.',
          },
          {
            step: 'First period trade',
            formula: 'n_1 = 25000 - 19780 = 5220 \\text{ shares}',
            explanation: 'Sell 5,220 shares in the first period (21% of total). The strategy is front-loaded due to risk aversion.',
          },
        ]}
      />

      <NoteBlock title="Calibrating Impact for Indian Stocks" type="warning">
        <p>
          Impact parameters must be calibrated from actual NSE execution data. Indian mid-caps
          typically have 2-5x higher impact costs than Nifty 50 stocks due to lower liquidity.
          Key calibration approaches include: (1) estimating from historical order flow data
          using Kyle's lambda, (2) using the square-root impact model <InlineMath math="\Delta P \propto \sigma \sqrt{Q/V}" />,
          or (3) backtesting against actual execution records from brokers like Zerodha or
          institutional platforms. The impact parameters should be re-calibrated monthly as
          liquidity conditions change.
        </p>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          The Almgren-Chriss framework provides the optimal trade-off between market impact and
          timing risk for large-order execution. For Indian mid-caps, where liquidity is thinner,
          the urgency parameter <InlineMath math="\kappa" /> determines whether to trade aggressively
          (high risk aversion) or patiently (low risk aversion). The model generates a hyperbolic
          sine trajectory that interpolates between immediate execution and TWAP, adapted to the
          specific liquidity characteristics of each NSE stock.
        </p>
      </NoteBlock>
    </div>
  )
}
