import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveMultiPeriod() {
  const [horizon, setHorizon] = useState(12)
  const [tcRate, setTcRate] = useState(0.15)
  const [riskAversion, setRiskAversion] = useState(2.0)
  const [initialDeviation, setInitialDeviation] = useState(0.10)

  const optimalTrades = []
  let deviation = initialDeviation
  const tradeFraction = 1 - Math.exp(-tcRate / (riskAversion * 100))
  for (let t = 0; t < Math.min(horizon, 24); t++) {
    const trade = deviation * tradeFraction
    deviation -= trade
    optimalTrades.push({ period: t + 1, deviation: deviation, trade: trade })
  }

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Multi-Period Trade Schedule
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        See how transaction costs affect the optimal trading pace for portfolio rebalancing.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Horizon (months): {horizon}</span>
          <input type="range" min="3" max="24" step="1" value={horizon}
            onChange={e => setHorizon(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>TC Rate (bps): {(tcRate * 100).toFixed(0)}</span>
          <input type="range" min="0.05" max="0.50" step="0.01" value={tcRate}
            onChange={e => setTcRate(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Risk Aversion: {riskAversion.toFixed(1)}</span>
          <input type="range" min="0.5" max="5" step="0.1" value={riskAversion}
            onChange={e => setRiskAversion(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Initial Deviation: {(initialDeviation * 100).toFixed(0)}%</span>
          <input type="range" min="0.02" max="0.30" step="0.01" value={initialDeviation}
            onChange={e => setInitialDeviation(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 450 150" className="w-full max-w-lg mx-auto block">
        <line x1={40} y1={130} x2={430} y2={130} stroke="#d1d5db" strokeWidth="1" />
        <line x1={40} y1={10} x2={40} y2={130} stroke="#d1d5db" strokeWidth="1" />
        <text x={235} y={148} textAnchor="middle" className="text-[10px] fill-gray-500">Period</text>
        <text x={15} y={70} textAnchor="middle" className="text-[10px] fill-gray-500" transform="rotate(-90, 15, 70)">Deviation</text>

        {optimalTrades.map((pt, i) => {
          const x = 50 + i * (370 / Math.min(horizon, 24))
          const y = 130 - pt.deviation * 1000
          return (
            <g key={i}>
              <circle cx={x} cy={Math.max(15, y)} r="3" fill="#6366f1" />
              {i > 0 && (
                <line x1={50 + (i - 1) * (370 / Math.min(horizon, 24))}
                  y1={Math.max(15, 130 - optimalTrades[i - 1].deviation * 1000)}
                  x2={x} y2={Math.max(15, y)}
                  stroke="#6366f1" strokeWidth="1.5" />
              )}
            </g>
          )
        })}

        <text x={60} y={25} className="text-[9px] fill-gray-500">
          Trade fraction: {(tradeFraction * 100).toFixed(1)}% per period
        </text>
      </svg>
    </div>
  )
}

export default function MultiPeriod() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Multi-Period Optimization with Transaction Costs
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Single-period Markowitz optimization assumes instantaneous, costless rebalancing. In
        reality, Indian market participants face significant friction: STT (0.1% on delivery),
        brokerage fees, bid-ask spreads, and market impact. Multi-period optimization accounts
        for these costs by spreading trades over time and balancing the urgency of reaching the
        target portfolio against the cost of trading.
      </p>

      <DefinitionBlock
        title="Multi-Period Portfolio Optimization"
        label="Definition 9.14"
        definition="Multi-period optimization selects a sequence of portfolios {w₁, w₂, ..., w_T} to maximize the expected utility over the full horizon, accounting for transaction costs incurred at each rebalancing: max Σₜ E[wₜ'rₜ] - λΣₜ wₜ'Σwₜ - Σₜ TC(wₜ - wₜ₋₁), where TC(·) is the transaction cost function."
        notation="T = number of periods, TC(·) = transaction cost function, Δwₜ = wₜ - wₜ₋₁"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Transaction Cost Models for Indian Markets
      </h3>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The total transaction cost in India for an equity delivery trade includes:
      </p>

      <BlockMath math="\text{TC}(\Delta w) = \underbrace{0.001}_{\text{STT}} + \underbrace{0.0003}_{\text{Brokerage}} + \underbrace{0.0002}_{\text{SEBI + Exchange}} + \underbrace{0.18 \times \text{Brokerage}}_{\text{GST}} + \underbrace{\text{Impact}}_{\text{Market Impact}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For a typical delivery trade on Zerodha, the total one-way cost is approximately
        13-15 basis points for large-cap stocks. Market impact for mid/small-cap stocks can add
        another 10-50 bps depending on order size relative to average daily volume.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Almgren-Chriss Optimal Execution
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The Almgren-Chriss (2001) framework finds the optimal trade schedule to execute a
        portfolio transition. Given a target trade <InlineMath math="X" /> shares over
        <InlineMath math="T" /> periods, the optimal trajectory minimizes:
      </p>

      <BlockMath math="\min_{\{n_t\}} \sum_{t=1}^{T} \left[\eta \frac{n_t}{\tau} + \gamma \sigma \left(\sum_{k=t}^{T} n_k\right)\right]" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\eta" /> is temporary impact, <InlineMath math="\gamma" /> is
        risk aversion, <InlineMath math="\sigma" /> is volatility, and <InlineMath math="n_t" />
        is the number of shares traded in period <InlineMath math="t" />.
      </p>

      <TheoremBlock
        title="Optimal Trading Rate"
        label="Theorem 9.12"
        statement="In the Grinold-Kahn multi-period framework with quadratic transaction costs, the optimal trading policy trades a constant fraction of the deviation from target each period: Δwₜ = κ(w*ₜ - wₜ₋₁), where κ = 1 - exp(-√(λ_risk/λ_tc)) depends on the ratio of risk aversion to transaction cost aversion."
        proof="This follows from the Bellman equation for the dynamic program. The quadratic cost structure yields a linear policy, and the optimal trade fraction κ balances the marginal risk reduction against the marginal transaction cost."
      />

      <InteractiveMultiPeriod />

      <PythonCode
        title="multi_period_optimization.py"
        runnable
        code={`import numpy as np
import cvxpy as cp

# Multi-period MVO for Indian portfolio
tickers = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ITC', 'LT']
n = len(tickers)
T = 12  # Monthly periods (1 year)

# Current and target weights
w_current = np.array([0.20, 0.15, 0.15, 0.12, 0.20, 0.18])
mu = np.array([0.15, 0.13, 0.12, 0.14, 0.10, 0.16])

vols = np.array([0.28, 0.22, 0.22, 0.24, 0.20, 0.28])
np.random.seed(42)
corr = np.eye(n) * 0.5 + 0.5
np.fill_diagonal(corr, 1.0)
Sigma = np.outer(vols, vols) * corr / 12  # Monthly

# Transaction costs (one-way, bps)
tc_linear = np.array([15, 12, 12, 12, 12, 15]) * 1e-4  # Linear TC
tc_quad = np.array([5, 3, 3, 3, 4, 5]) * 1e-4  # Quadratic impact

# Risk aversion
lam = 2.0

# Solve multi-period problem
weights = [cp.Variable(n) for _ in range(T + 1)]
constraints = [weights[0] == w_current]

objective = 0
for t in range(1, T + 1):
    w_t = weights[t]
    delta_w = w_t - weights[t - 1]

    # Return and risk at time t
    objective += mu / 12 @ w_t  # Monthly return
    objective -= lam * cp.quad_form(w_t, Sigma)  # Risk penalty

    # Transaction costs
    objective -= tc_linear @ cp.abs(delta_w)  # Linear TC
    objective -= 0.5 * tc_quad @ cp.square(delta_w)  # Quadratic impact

    # Constraints
    constraints += [
        cp.sum(w_t) == 1,
        w_t >= 0,
        w_t <= 0.30,
    ]

prob = cp.Problem(cp.Maximize(objective), constraints)
prob.solve(solver=cp.SCS)

print("=== Multi-Period Portfolio Optimization (12 months) ===")
print(f"Transaction costs: {tc_linear.mean()*10000:.0f}bps linear + quadratic impact")
print(f"\\nWeight trajectory:")
print(f"{'Month':<6}", end='')
for t in tickers:
    print(f"{t:>10}", end='')
print(f"{'Turnover':>10}")
print("-" * (6 + 10 * (n + 1)))

for t in range(T + 1):
    w = weights[t].value
    turnover = np.sum(np.abs(w - (weights[t-1].value if t > 0 else w_current)))
    print(f"{t:<6}", end='')
    for wi in w:
        print(f"{wi:>10.4f}", end='')
    print(f"{turnover:>10.4f}")

# Total TC
total_tc = sum(
    tc_linear @ np.abs(weights[t].value - weights[t-1].value)
    for t in range(1, T + 1)
)
print(f"\\nTotal transaction cost: {total_tc:.6f} ({total_tc*10000:.2f} bps)")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Market Impact in Indian Markets
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Market impact is the price movement caused by our own trading. For NSE stocks, the
        square-root impact model is commonly used:
      </p>

      <BlockMath math="\text{Impact}(v) = \sigma \cdot \eta \cdot \left(\frac{v}{V}\right)^{0.5}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="v" /> is our trade volume, <InlineMath math="V" /> is average
        daily volume, <InlineMath math="\sigma" /> is daily volatility, and <InlineMath math="\eta \approx 0.1 \text{-} 0.3" />.
        For Nifty 50 constituents, average daily turnover ranges from INR 500 crore (HDFC Bank)
        to INR 3000+ crore (Reliance).
      </p>

      <PythonCode
        title="market_impact_nse.py"
        runnable
        code={`import numpy as np

# Market impact estimation for NSE stocks
stocks = {
    'RELIANCE': {'price': 2500, 'adv_cr': 3000, 'daily_vol': 0.018},
    'TCS':      {'price': 3500, 'adv_cr': 800,  'daily_vol': 0.014},
    'HDFCBANK': {'price': 1600, 'adv_cr': 2500, 'daily_vol': 0.014},
    'INFY':     {'price': 1400, 'adv_cr': 1200, 'daily_vol': 0.015},
    'ITC':      {'price': 450,  'adv_cr': 1500, 'daily_vol': 0.013},
}

# Portfolio value: INR 100 crore
portfolio_value = 100  # crore

# Target: rebalance 5% of portfolio in each stock
rebal_pct = 0.05

print("=== Market Impact Analysis (NSE Stocks) ===")
print(f"Portfolio: INR {portfolio_value} crore, Rebalancing: {rebal_pct:.0%}")
print(f"\\n{'Stock':<12} {'Trade':>10} {'ADV':>10} {'%ADV':>8} {'Impact':>8} {'Cost':>10}")
print(f"{'':12} {'(Cr)':>10} {'(Cr)':>10} {'':>8} {'(bps)':>8} {'(Lakh)':>10}")
print("-" * 65)

eta = 0.15  # Impact coefficient
total_cost = 0

for stock, params in stocks.items():
    trade_value = portfolio_value * rebal_pct  # in crore
    pct_adv = trade_value / params['adv_cr']

    # Square-root impact
    impact_bps = params['daily_vol'] * eta * np.sqrt(pct_adv) * 10000

    # Cost in lakhs
    cost_lakh = trade_value * impact_bps / 10000 * 100  # convert to lakhs
    total_cost += cost_lakh

    print(f"{stock:<12} {trade_value:>10.1f} {params['adv_cr']:>10.0f} "
          f"{pct_adv:>7.1%} {impact_bps:>8.1f} {cost_lakh:>10.2f}")

print(f"\\nTotal impact cost: INR {total_cost:.2f} lakh")
print(f"As % of traded value: {total_cost / (portfolio_value * rebal_pct * 5 * 100) * 100:.2f}%")
print(f"\\nRecommendation: Split trades over "
      f"{max(2, int(np.ceil(portfolio_value * rebal_pct / min(s['adv_cr'] for s in stocks.values()) * 5)))} days")`}
      />

      <ExampleBlock
        title="Optimal Rebalancing Frequency"
        difficulty="advanced"
        problem="A INR 500 crore Indian equity fund has transaction costs of 15 bps per trade and daily tracking error of 50 bps against Nifty 50. Find the optimal rebalancing frequency that minimizes total cost (tracking error + TC)."
        solution={[
          {
            step: 'Model total cost',
            formula: '\\text{Total Cost} = \\underbrace{\\sigma_{TE} \\sqrt{f}}_\\text{Tracking error cost} + \\underbrace{c \\cdot \\text{TO}(f)}_\\text{Transaction cost}',
            explanation: 'Tracking error grows with time between rebalancing (√f days), while TC cost is proportional to frequency.',
          },
          {
            step: 'Take derivative and set to zero',
            formula: '\\frac{d}{df}\\text{TC} = \\frac{\\sigma_{TE}}{2\\sqrt{f}} - c \\cdot \\text{TO}^\\prime = 0',
            explanation: 'The optimal frequency balances marginal tracking error reduction against marginal TC.',
          },
          {
            step: 'Solve for optimal frequency',
            formula: 'f^* \\approx \\left(\\frac{\\sigma_{TE}}{2c \\cdot \\text{TO}^\\prime}\\right)^{2/3} \\approx 15\\text{-}20 \\text{ trading days}',
            explanation: 'For typical Indian fund parameters, monthly rebalancing is close to optimal.',
          },
        ]}
      />

      <NoteBlock title="Indian Market Transaction Cost Summary" type="tip">
        <div className="overflow-x-auto">
          <table className="text-xs border-collapse w-full">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="px-2 py-1 text-left">Cost Component</th>
                <th className="px-2 py-1 text-right">Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200"><td className="px-2 py-1">STT (delivery buy+sell)</td><td className="px-2 py-1 text-right">10 bps</td></tr>
              <tr className="border-b border-gray-200"><td className="px-2 py-1">Brokerage (Zerodha)</td><td className="px-2 py-1 text-right">0 bps (free)</td></tr>
              <tr className="border-b border-gray-200"><td className="px-2 py-1">Exchange charges</td><td className="px-2 py-1 text-right">~3 bps</td></tr>
              <tr className="border-b border-gray-200"><td className="px-2 py-1">SEBI turnover fee</td><td className="px-2 py-1 text-right">~0.1 bps</td></tr>
              <tr className="border-b border-gray-200"><td className="px-2 py-1">GST on above</td><td className="px-2 py-1 text-right">18% of charges</td></tr>
              <tr><td className="px-2 py-1 font-semibold">Total (excl. impact)</td><td className="px-2 py-1 text-right font-semibold">~13-15 bps</td></tr>
            </tbody>
          </table>
        </div>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Multi-period optimization is essential for practical portfolio management in India,
          where transaction costs of 13-15 bps per trade (plus market impact for large orders)
          are non-negligible. The optimal strategy trades a fraction of the deviation from target
          each period, with the fraction depending on the cost-risk trade-off. For typical
          Indian equity portfolios, monthly rebalancing strikes a good balance.
        </p>
      </NoteBlock>
    </div>
  )
}
