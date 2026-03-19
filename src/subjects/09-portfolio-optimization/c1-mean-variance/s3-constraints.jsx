import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveConstraints() {
  const [maxWeight, setMaxWeight] = useState(0.15)
  const [maxSector, setMaxSector] = useState(0.35)
  const [turnoverLimit, setTurnoverLimit] = useState(0.20)
  const [longOnly, setLongOnly] = useState(true)

  const nConstraints = 2 + (longOnly ? 1 : 0) + 1
  const feasibleArea = Math.max(0, (1 - maxWeight * 3) * (1 - maxSector) * (longOnly ? 0.6 : 1.0)).toFixed(3)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Constraint Impact on Feasible Set
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust constraints to see how they restrict the optimization problem.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Max Single Weight: {(maxWeight * 100).toFixed(0)}%</span>
          <input type="range" min="0.05" max="0.50" step="0.01" value={maxWeight}
            onChange={e => setMaxWeight(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Max Sector: {(maxSector * 100).toFixed(0)}%</span>
          <input type="range" min="0.10" max="0.60" step="0.01" value={maxSector}
            onChange={e => setMaxSector(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Turnover Limit: {(turnoverLimit * 100).toFixed(0)}%</span>
          <input type="range" min="0.05" max="0.50" step="0.01" value={turnoverLimit}
            onChange={e => setTurnoverLimit(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <input type="checkbox" checked={longOnly} onChange={e => setLongOnly(e.target.checked)}
            className="h-4 w-4 accent-indigo-500" />
          <span>Long-Only</span>
        </label>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center text-xs">
        <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30">
          <div className="text-gray-500 dark:text-gray-400">Active Constraints</div>
          <div className="text-lg font-bold text-indigo-600">{nConstraints}</div>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30">
          <div className="text-gray-500 dark:text-gray-400">Feasible Region</div>
          <div className="text-lg font-bold text-amber-600">{feasibleArea}</div>
        </div>
        <div className={`rounded-lg p-3 ${parseFloat(feasibleArea) < 0.01 ? 'bg-red-50 dark:bg-red-900/30' : 'bg-green-50 dark:bg-green-900/30'}`}>
          <div className="text-gray-500 dark:text-gray-400">Status</div>
          <div className={`text-lg font-bold ${parseFloat(feasibleArea) < 0.01 ? 'text-red-600' : 'text-green-600'}`}>
            {parseFloat(feasibleArea) < 0.01 ? 'Tight!' : 'Feasible'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Constraints() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Constrained Portfolio Optimization with CVXPY
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Real-world portfolio optimization for Indian markets requires incorporating numerous
        constraints beyond the basic equality constraints of Markowitz. SEBI regulations, fund
        mandates, risk limits, and transaction cost considerations all shape the feasible set.
        Convex optimization tools like <code>cvxpy</code> allow us to express these constraints
        naturally and solve the resulting QPs efficiently.
      </p>

      <DefinitionBlock
        title="Constrained Mean-Variance Problem"
        label="Definition 9.4"
        definition="The constrained mean-variance optimization augments the basic Markowitz problem with inequality constraints: min w'Σw subject to w'μ ≥ μ_target, w'1 = 1, and additional constraints on individual weights, sector exposures, turnover, and factor exposures."
        notation="w ∈ ℝⁿ, subject to Aw ≤ b (inequality), Cw = d (equality)"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Common Constraints for Indian Portfolios
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Constraint</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Mathematical Form</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Indian Context</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Long-only</td>
              <td className="px-4 py-2"><InlineMath math="w_i \geq 0 \; \forall i" /></td>
              <td className="px-4 py-2">Most Indian MFs cannot short</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Max position</td>
              <td className="px-4 py-2"><InlineMath math="w_i \leq w_{\max}" /></td>
              <td className="px-4 py-2">SEBI: max 10% for diversified equity funds</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Sector limit</td>
              <td className="px-4 py-2"><InlineMath math="\sum_{i \in S_k} w_i \leq \bar{s}_k" /></td>
              <td className="px-4 py-2">Max 25-35% in banking/financial sector</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Turnover</td>
              <td className="px-4 py-2"><InlineMath math="\sum_i |w_i - w_i^{\text{prev}}| \leq \tau" /></td>
              <td className="px-4 py-2">STT + brokerage makes turnover costly</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Min holdings</td>
              <td className="px-4 py-2"><InlineMath math="\sum_i \mathbb{1}(w_i > 0) \geq N_{\min}" /></td>
              <td className="px-4 py-2">SEBI: min 20 stocks for diversified funds</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveConstraints />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Long-Only Constraint
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The long-only constraint <InlineMath math="w_i \geq 0" /> is the most common in Indian
        markets. Shorting equities on NSE requires borrowing through the SLB (Stock Lending &
        Borrowing) mechanism, which is illiquid for most stocks. The long-only constraint is convex
        and fits naturally into the QP framework:
      </p>

      <BlockMath math="\min_{\mathbf{w}} \quad \mathbf{w}^\top \Sigma \mathbf{w} \quad \text{s.t.} \quad \mathbf{w}^\top \boldsymbol{\mu} \geq \mu_{\text{target}}, \quad \mathbf{w}^\top \mathbf{1} = 1, \quad \mathbf{w} \geq \mathbf{0}" />

      <PythonCode
        title="constrained_mvo_nifty.py"
        runnable
        code={`import numpy as np
import cvxpy as cp

# Nifty 50 blue-chip stocks with sector classification
tickers = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ITC',
           'LT', 'AXISBANK', 'HINDUNILVR', 'SBIN', 'BHARTIARTL']
sectors = ['Energy', 'IT', 'Banking', 'IT', 'FMCG',
           'Capital Goods', 'Banking', 'FMCG', 'Banking', 'Telecom']

mu = np.array([0.15, 0.13, 0.12, 0.14, 0.10,
               0.16, 0.18, 0.11, 0.14, 0.13])

np.random.seed(42)
n = len(mu)
raw = np.random.randn(n, n) * 0.01
Sigma = raw @ raw.T + np.diag(np.random.uniform(0.025, 0.055, n))

# Sector groupings
sector_map = {}
for t, s in zip(tickers, sectors):
    sector_map.setdefault(s, []).append(tickers.index(t))

w = cp.Variable(n)
ret = mu @ w
risk = cp.quad_form(w, Sigma)

# Constraints
constraints = [
    cp.sum(w) == 1,           # Fully invested
    w >= 0,                    # Long-only
    w <= 0.15,                 # SEBI: max 15% per stock
    ret >= 0.13,               # Min target return: 13%
]

# Sector constraints: max 35% in any single sector
for sector_name, indices in sector_map.items():
    constraints.append(cp.sum(w[indices]) <= 0.35)

# Solve
prob = cp.Problem(cp.Minimize(risk), constraints)
prob.solve(solver=cp.SCS)

port_ret = mu @ w.value
port_vol = np.sqrt(w.value @ Sigma @ w.value)
sharpe = (port_ret - 0.065) / port_vol

print("=== Constrained MVO (Indian Market Constraints) ===")
print(f"Status: {prob.status}")
print(f"Return: {port_ret:.4f} ({port_ret:.2%})")
print(f"Vol:    {port_vol:.4f} ({port_vol:.2%})")
print(f"Sharpe: {sharpe:.4f} (rf=6.5%)")
print(f"\\nOptimal Weights:")
for t, s, wt in zip(tickers, sectors, w.value):
    if wt > 0.001:
        print(f"  {t:12s} ({s:13s}): {wt:.4f} ({wt:.2%})")
print(f"\\nSector Exposures:")
for sector_name, indices in sector_map.items():
    sw = sum(w.value[i] for i in indices)
    print(f"  {sector_name:13s}: {sw:.4f} ({sw:.2%})")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Turnover Constraints and Transaction Costs
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        In India, transaction costs include STT (Securities Transaction Tax) of 0.1% on delivery
        equity trades, brokerage (typically 0.01-0.03% on discount brokers like Zerodha), and
        GST on brokerage. We can incorporate turnover constraints to limit trading costs:
      </p>

      <BlockMath math="\sum_{i=1}^{n} |w_i - w_i^{\text{prev}}| \leq \tau" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The absolute value makes this non-differentiable, but <code>cvxpy</code> handles it
        natively via epigraph reformulation. Alternatively, we can add a transaction cost penalty
        to the objective:
      </p>

      <BlockMath math="\min_{\mathbf{w}} \quad \mathbf{w}^\top \Sigma \mathbf{w} + \lambda_{\text{tc}} \sum_{i=1}^{n} c_i |w_i - w_i^{\text{prev}}|" />

      <PythonCode
        title="turnover_constrained.py"
        runnable
        code={`import numpy as np
import cvxpy as cp

n = 10
tickers = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ITC',
           'LT', 'AXISBANK', 'HINDUNILVR', 'SBIN', 'BHARTIARTL']
mu = np.array([0.15, 0.13, 0.12, 0.14, 0.10, 0.16, 0.18, 0.11, 0.14, 0.13])
np.random.seed(42)
raw = np.random.randn(n, n) * 0.01
Sigma = raw @ raw.T + np.diag(np.random.uniform(0.025, 0.055, n))

# Previous portfolio (equal weight)
w_prev = np.ones(n) / n

# Transaction costs (STT + brokerage + impact)
tc_rate = np.full(n, 0.0015)  # 15 bps round-trip

w = cp.Variable(n)
ret = mu @ w
risk = cp.quad_form(w, Sigma)
turnover = cp.norm(w - w_prev, 1)
tc_cost = tc_rate @ cp.abs(w - w_prev)

# Risk-return with TC penalty
lambda_risk = 2.0
objective = -ret + lambda_risk * risk + tc_cost

constraints = [
    cp.sum(w) == 1,
    w >= 0,
    w <= 0.20,
    turnover <= 0.30,  # Max 30% turnover
]

prob = cp.Problem(cp.Minimize(objective), constraints)
prob.solve(solver=cp.SCS)

print("=== Turnover-Constrained Portfolio ===")
print(f"Max turnover: 30%, TC rate: 15 bps")
print(f"\\nWeight changes:")
total_turnover = 0
total_tc = 0
for t, wp, wn in zip(tickers, w_prev, w.value):
    change = wn - wp
    tc = abs(change) * 0.0015
    total_turnover += abs(change)
    total_tc += tc
    if abs(change) > 0.001:
        print(f"  {t:12s}: {wp:.4f} -> {wn:.4f} (delta={change:+.4f}, TC={tc*10000:.1f}bps)")
print(f"\\nTotal turnover: {total_turnover:.4f} ({total_turnover:.2%})")
print(f"Total TC cost:  {total_tc:.6f} ({total_tc*10000:.2f} bps)")
print(f"Net return:     {(mu @ w.value - total_tc):.4f}")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Tracking Error Constraints
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Many Indian fund managers benchmark to Nifty 50 or Nifty 500. A tracking error constraint
        limits how much the portfolio can deviate from the benchmark:
      </p>

      <BlockMath math="\sqrt{(\mathbf{w} - \mathbf{w}_b)^\top \Sigma (\mathbf{w} - \mathbf{w}_b)} \leq \text{TE}_{\max}" />

      <ExampleBlock
        title="SEBI Regulatory Constraints for Indian Mutual Funds"
        difficulty="intermediate"
        problem="A SEBI-regulated large-cap fund must invest at least 80% in the top 100 stocks by market capitalization. It can hold max 10% in any single stock and must hold at least 20 stocks. Formulate these as CVXPY constraints."
        solution={[
          {
            step: 'Define binary indicator for large-cap membership',
            formula: 'L = \\{i : \\text{stock } i \\in \\text{top 100 by mcap}\\}',
            explanation: 'Identify which of our N stocks are classified as large-cap per SEBI norms.',
          },
          {
            step: 'Large-cap minimum constraint',
            formula: '\\sum_{i \\in L} w_i \\geq 0.80',
            explanation: 'At least 80% must be in large-cap stocks (SEBI mandate for large-cap funds).',
          },
          {
            step: 'Maximum single-stock constraint',
            formula: 'w_i \\leq 0.10 \\quad \\forall i',
            explanation: 'No single stock can exceed 10% of the portfolio.',
          },
          {
            step: 'Minimum holdings (non-convex, use heuristic)',
            formula: '\\sum_{i=1}^{N} \\mathbb{1}(w_i > 0.001) \\geq 20',
            explanation: 'This is a cardinality constraint. In practice, set minimum weight of 0.5% and include at least 20 stocks with w_min >= 0.005.',
          },
        ]}
      />

      <TheoremBlock
        title="Impact of Constraints on Efficient Frontier"
        label="Theorem 9.3"
        statement="Adding any constraint to the mean-variance problem can only move the efficient frontier to the left (lower) or keep it the same. That is, the constrained frontier is always dominated by or equal to the unconstrained frontier: σ²_constrained(μ) ≥ σ²_unconstrained(μ) for all achievable μ."
        proof="The unconstrained feasible set contains the constrained feasible set. Since we are minimizing over a smaller set, the minimum can only be equal or larger."
      />

      <NoteBlock title="Indian Regulatory Landscape" type="warning">
        <p>Key SEBI constraints for portfolio construction:</p>
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li><strong>Large Cap Fund:</strong> Min 80% in top 100 stocks by market cap</li>
          <li><strong>Mid Cap Fund:</strong> Min 65% in stocks ranked 101-250</li>
          <li><strong>Flexi Cap Fund:</strong> Min 65% in equity, no cap-wise restriction</li>
          <li><strong>ELSS:</strong> Min 80% equity, 3-year lock-in, max 10% per stock</li>
          <li><strong>Single Issuer Limit:</strong> Max 10% of NAV in a single issuer for diversified funds</li>
        </ul>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Constrained optimization bridges theory and practice. Using <code>cvxpy</code>, Indian
          quant practitioners can encode SEBI regulations, sector limits, turnover budgets, and
          tracking error bounds directly into the optimization. The key insight is that all
          commonly used constraints are convex, preserving the tractability of the QP solver.
        </p>
      </NoteBlock>
    </div>
  )
}
