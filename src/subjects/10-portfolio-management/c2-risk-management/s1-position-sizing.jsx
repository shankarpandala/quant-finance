import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveKelly() {
  const [winRate, setWinRate] = useState(55)
  const [winLoss, setWinLoss] = useState(1.5)
  const [capital, setCapital] = useState(50)

  const p = winRate / 100
  const q = 1 - p
  const kelly = (winLoss * p - q) / winLoss
  const halfKelly = kelly / 2
  const position = capital * halfKelly

  const growthRate = p * Math.log(1 + kelly * winLoss * 0.01) + q * Math.log(1 - kelly * 0.01)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Kelly Criterion Calculator
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Calculate optimal position size for Indian stock trades.
      </p>
      <div className="mb-4 grid grid-cols-3 gap-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Win Rate: {winRate}%</span>
          <input type="range" min="30" max="80" step="1" value={winRate}
            onChange={e => setWinRate(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Win/Loss Ratio: {winLoss.toFixed(1)}</span>
          <input type="range" min="0.5" max="4.0" step="0.1" value={winLoss}
            onChange={e => setWinLoss(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Capital (Lakh): {capital}</span>
          <input type="range" min="5" max="500" step="5" value={capital}
            onChange={e => setCapital(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>
      <div className="grid grid-cols-3 gap-3 text-center text-xs">
        <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30">
          <div className="text-gray-500">Full Kelly</div>
          <div className="text-lg font-bold text-indigo-600">{(kelly * 100).toFixed(1)}%</div>
        </div>
        <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/30">
          <div className="text-gray-500">Half Kelly</div>
          <div className="text-lg font-bold text-green-600">{(halfKelly * 100).toFixed(1)}%</div>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30">
          <div className="text-gray-500">Position Size</div>
          <div className="text-lg font-bold text-amber-600">INR {(position).toFixed(1)}L</div>
        </div>
      </div>
    </div>
  )
}

export default function PositionSizing() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Kelly Criterion for Indian Portfolios
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The Kelly criterion, developed by John Larry Kelly Jr. at Bell Labs in 1956, provides
        the mathematically optimal fraction of capital to risk on each trade. It maximizes the
        long-term compound growth rate while naturally controlling risk. For Indian market
        practitioners trading on NSE/BSE, Kelly-based sizing provides a disciplined alternative
        to ad-hoc position sizing.
      </p>

      <DefinitionBlock
        title="Kelly Fraction"
        label="Definition 10.4"
        definition="The Kelly fraction f* is the proportion of capital to bet that maximizes the expected logarithm of wealth (geometric growth rate). For a binary bet with win probability p and odds b (profit per unit risked), f* = (bp - (1-p))/b = p - q/b where q = 1-p."
        notation="f* = optimal fraction, p = win probability, b = win/loss ratio, q = 1-p"
      />

      <BlockMath math="f^* = \frac{bp - q}{b} = \frac{bp - (1-p)}{b}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For continuous returns with mean <InlineMath math="\mu" /> and variance <InlineMath math="\sigma^2" />,
        the Kelly fraction simplifies to:
      </p>

      <BlockMath math="f^* = \frac{\mu}{\sigma^2} = \frac{\text{Expected Excess Return}}{\text{Variance}}" />

      <TheoremBlock
        title="Optimality of Kelly Criterion"
        label="Theorem 10.3"
        statement="The Kelly fraction maximizes the expected log-wealth E[log(W_T)] = Σ E[log(1 + f·Rₜ)]. Among all fixed-fraction strategies, Kelly achieves the highest geometric growth rate asymptotically. Moreover, any strategy betting more than Kelly (f > f*) has lower growth rate AND higher variance."
        proof="G(f) = E[log(1+fR)] is concave in f. The maximum is at f* where G'(f*) = E[R/(1+f*R)] = 0. For f > f*, G(f) < G(f*) by concavity. The variance of log-wealth is proportional to f², so over-betting increases both risk and reduces growth."
      />

      <InteractiveKelly />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Fractional Kelly for Practical Trading
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Full Kelly betting leads to extreme drawdowns in practice. Most quantitative traders
        use <strong>half-Kelly</strong> or <strong>quarter-Kelly</strong>:
      </p>

      <BlockMath math="f_{\text{practical}} = \alpha \cdot f^*, \quad \alpha \in \{0.25, 0.50\}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Half-Kelly achieves 75% of the full Kelly growth rate with significantly lower drawdowns,
        making it the standard choice for Indian portfolio managers.
      </p>

      <PythonCode
        title="kelly_nse_portfolio.py"
        runnable
        code={`import numpy as np

np.random.seed(42)

# Kelly sizing for NSE stock portfolio
stocks = {
    'RELIANCE': {'annual_ret': 0.15, 'annual_vol': 0.28},
    'TCS':      {'annual_ret': 0.13, 'annual_vol': 0.22},
    'HDFCBANK': {'annual_ret': 0.12, 'annual_vol': 0.22},
    'INFY':     {'annual_ret': 0.14, 'annual_vol': 0.24},
    'ITC':      {'annual_ret': 0.10, 'annual_vol': 0.20},
    'AXISBANK': {'annual_ret': 0.18, 'annual_vol': 0.30},
}

rf = 0.065

print("=== Kelly Criterion for NSE Stocks ===")
print(f"\\n{'Stock':<12} {'Excess':>8} {'Vol':>8} {'Kelly':>8} {'Half':>8} {'Sharpe':>8}")
print("-" * 55)

for stock, p in stocks.items():
    excess = p['annual_ret'] - rf
    kelly = excess / p['annual_vol']**2
    sharpe = excess / p['annual_vol']
    print(f"{stock:<12} {excess:>8.2%} {p['annual_vol']:>8.2%} "
          f"{kelly:>8.2f} {kelly/2:>8.2f} {sharpe:>8.3f}")

# Multi-asset Kelly
print("\\n=== Multi-Asset Kelly (Markowitz Connection) ===")
n = len(stocks)
mu = np.array([s['annual_ret'] - rf for s in stocks.values()])
vols = np.array([s['annual_vol'] for s in stocks.values()])
corr = np.eye(n) * 0.5 + 0.5
np.fill_diagonal(corr, 1.0)
Sigma = np.outer(vols, vols) * corr

kelly_multi = np.linalg.inv(Sigma) @ mu
kelly_half = kelly_multi / 2

names = list(stocks.keys())
print(f"\\n{'Stock':<12} {'Full Kelly':>10} {'Half Kelly':>10}")
for name, kf, kh in zip(names, kelly_multi, kelly_half):
    print(f"{name:<12} {kf:>10.4f} {kh:>10.4f}")
print(f"\\nSum of weights: Full={sum(kelly_multi):.2f}, Half={sum(kelly_half):.2f}")`}
      />

      <ExampleBlock
        title="Kelly Sizing for Nifty 50 Mean-Reversion"
        difficulty="intermediate"
        problem="A mean-reversion strategy on Nifty 50 has win rate 58%, average win 1.8x average loss, and capital of INR 1 Cr. Compute position size."
        solution={[
          {
            step: 'Compute Kelly fraction',
            formula: 'f^* = \\frac{b \\cdot p - q}{b} = \\frac{1.8 \\times 0.58 - 0.42}{1.8} = \\frac{0.624}{1.8} = 0.347',
          },
          {
            step: 'Apply half-Kelly',
            formula: 'f_{\\text{half}} = 0.347 / 2 = 0.173 = 17.3\\%',
          },
          {
            step: 'Position size',
            formula: '\\text{Position} = 1,00,00,000 \\times 0.173 = 17,30,000 \\text{ INR}',
            explanation: 'Allocate INR 17.3 lakh per trade on a INR 1 Cr account.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          The Kelly criterion provides a principled, mathematically optimal approach to position
          sizing. For Indian markets, use half-Kelly to balance growth against drawdown risk.
          The multi-asset Kelly is equivalent to Markowitz optimization with risk aversion of 1,
          connecting position sizing theory to portfolio optimization.
        </p>
      </NoteBlock>
    </div>
  )
}
