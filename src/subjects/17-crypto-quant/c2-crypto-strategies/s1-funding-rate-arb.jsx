import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveFundingArb() {
  const [capitalUSD, setCapitalUSD] = useState(100000)
  const [leverage, setLeverage] = useState(2)
  const [avgFunding, setAvgFunding] = useState(0.02)
  const [maxDrawdown, setMaxDrawdown] = useState(5)

  const notional = capitalUSD * leverage
  const dailyIncome = notional * avgFunding / 100 * 3
  const annualReturn = dailyIncome * 365 / capitalUSD * 100
  const sharpeEstimate = annualReturn / maxDrawdown * 0.5
  const breakEvenFunding = 0

  const monthlyPnL = Array.from({ length: 12 }, (_, i) => {
    const monthly = dailyIncome * 30 * (1 + Math.sin(i * 0.5) * 0.3)
    return { month: i + 1, pnl: monthly }
  })

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Funding Rate Arbitrage Calculator
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Configure capital, leverage, and expected funding rate to model the
        delta-neutral carry strategy P&L.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Capital: ${(capitalUSD / 1000).toFixed(0)}K</span>
          <input type="range" min="10000" max="1000000" step="10000" value={capitalUSD}
            onChange={e => setCapitalUSD(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Leverage: {leverage}x</span>
          <input type="range" min="1" max="5" step="0.5" value={leverage}
            onChange={e => setLeverage(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Avg Funding: {avgFunding.toFixed(3)}%</span>
          <input type="range" min="-0.05" max="0.1" step="0.005" value={avgFunding}
            onChange={e => setAvgFunding(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Max DD: {maxDrawdown}%</span>
          <input type="range" min="1" max="20" step="1" value={maxDrawdown}
            onChange={e => setMaxDrawdown(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 500 150" className="w-full max-w-lg mx-auto block" aria-label="Funding PnL">
        {monthlyPnL.map((m, i) => {
          const x = 40 + i * 38
          const barHeight = Math.max(5, m.pnl / 50)
          const y = m.pnl >= 0 ? 100 - barHeight : 100
          return (
            <g key={i}>
              <rect x={x} y={y} width="28" height={Math.abs(barHeight)}
                fill={m.pnl >= 0 ? '#4ade80' : '#f87171'} opacity="0.7" rx="3" />
              <text x={x + 14} y="118" textAnchor="middle" className="text-[7px]" fill="#6b7280">
                M{m.month}
              </text>
              <text x={x + 14} y={y - 3} textAnchor="middle" className="text-[6px]" fill="#374151">
                ${(m.pnl / 1000).toFixed(1)}K
              </text>
            </g>
          )
        })}
        <line x1="35" y1="100" x2="500" y2="100" stroke="#94a3b8" strokeWidth="1" />
        <text x="250" y="140" textAnchor="middle" className="text-[9px] fill-gray-600 dark:fill-gray-400">
          Annual Return: {annualReturn.toFixed(1)}% | Daily Income: ${dailyIncome.toFixed(0)} | Sharpe: {sharpeEstimate.toFixed(1)}
        </text>
      </svg>
    </div>
  )
}

export default function FundingRateArb() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Funding Rate Arbitrage
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Funding rate arbitrage is a delta-neutral strategy that harvests the carry
        from perpetual futures funding payments. When perpetual futures trade at a
        premium to spot (positive funding), the strategy goes long spot and short
        perps to collect funding while maintaining zero directional exposure.
      </p>

      <DefinitionBlock
        title="Delta-Neutral Funding Carry"
        label="Definition 1.1"
        definition="A delta-neutral funding carry trade consists of a long position in the underlying asset (or a correlated spot instrument) and an equal-sized short position in the perpetual futures contract. The portfolio delta is approximately zero, meaning it profits from funding payments regardless of price direction. The strategy is profitable when the average funding rate exceeds execution costs."
        notation={<>Portfolio: <InlineMath math="\Pi = +S_t - P_t" /> (long spot, short perp). PnL per period: <InlineMath math="\Delta\Pi = F_t \cdot |P_t| + (S_t - S_{t-1}) - (P_t - P_{t-1}) \approx F_t \cdot N" /> where <InlineMath math="F_t" /> is the funding rate and <InlineMath math="N" /> is notional.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Strategy Mechanics
      </h3>

      <BlockMath math="\text{Daily PnL} = N \cdot \sum_{k=1}^{3} F_{t,k} - \text{Execution Costs} - \text{Financing}" />

      <BlockMath math="\text{Ann. Return} = \frac{365 \times \text{Daily PnL}}{\text{Capital}} = \frac{365 \times 3 \times N \times \bar{F}}{C}" />

      <TheoremBlock
        title="Optimal Position Sizing for Funding Carry"
        label="Theorem 1.1"
        statement={<>The Kelly-optimal leverage for a funding carry strategy with mean funding rate <InlineMath math="\bar{F}" />, funding volatility <InlineMath math="\sigma_F" />, and basis risk <InlineMath math="\sigma_B" /> is: <BlockMath math="l^* = \frac{\bar{F}}{\sigma_F^2 + \sigma_B^2}" /> For BTC perpetuals with typical parameters (<InlineMath math="\bar{F} = 0.01\%, \sigma_F = 0.02\%, \sigma_B = 0.5\%" />), the full Kelly leverage is approximately <InlineMath math="l^* \approx 4\times" />, with half-Kelly at <InlineMath math="2\times" /> recommended in practice.</>}
        proof={<>The strategy return per period is <InlineMath math="r = l \cdot F + \epsilon" /> where <InlineMath math="\epsilon \sim N(0, l^2(\sigma_F^2 + \sigma_B^2))" /> represents basis and funding noise. Maximizing <InlineMath math="\mathbb{E}[\log(1 + r)]" /> using the Kelly criterion: <InlineMath math="l^* = \bar{F}/\text{Var}(\epsilon/l) = \bar{F}/(\sigma_F^2 + \sigma_B^2)" />.</>}
      />

      <InteractiveFundingArb />

      <PythonCode
        title="funding_rate_arb.py"
        runnable
        code={`import numpy as np

class FundingRateArbitrage:
    """Delta-neutral funding rate carry strategy."""

    def __init__(self, capital, leverage=2.0, rebalance_threshold=0.02):
        self.capital = capital
        self.leverage = leverage
        self.notional = capital * leverage
        self.rebalance_thresh = rebalance_threshold

    def simulate_funding_rates(self, n_days, mean_rate=0.0001,
                                vol=0.0003, mr_speed=0.1):
        """Simulate 8-hourly funding rates (3 per day)."""
        n_periods = n_days * 3
        rates = [mean_rate]
        for _ in range(n_periods - 1):
            dr = mr_speed * (mean_rate - rates[-1]) + vol * np.random.normal()
            rates.append(rates[-1] + dr)
        return np.array(rates)

    def backtest(self, funding_rates, spot_returns, exec_cost_bps=2):
        """Run backtest of the funding carry strategy."""
        n = len(funding_rates)
        pnl = []
        capital = self.capital
        rebalances = 0

        for i in range(n):
            # Funding income
            funding_pnl = self.notional * funding_rates[i]

            # Basis risk (imperfect hedge)
            basis_noise = np.random.normal(0, 0.0001) * self.notional

            # Execution cost for rebalancing
            exec_cost = 0
            if i > 0 and abs(spot_returns[i]) > self.rebalance_thresh:
                exec_cost = self.notional * exec_cost_bps / 10000
                rebalances += 1

            period_pnl = funding_pnl + basis_noise - exec_cost
            pnl.append(period_pnl)
            capital += period_pnl

        pnl = np.array(pnl)
        daily_pnl = np.array([np.sum(pnl[i*3:(i+1)*3]) for i in range(len(pnl)//3)])

        return {
            'total_pnl': np.sum(pnl),
            'ann_return': np.sum(daily_pnl) / self.capital * 365 / (len(daily_pnl)),
            'sharpe': np.mean(daily_pnl) / np.std(daily_pnl) * np.sqrt(365) if np.std(daily_pnl) > 0 else 0,
            'max_drawdown': np.min(np.minimum.accumulate(np.cumsum(daily_pnl)) - np.cumsum(daily_pnl)),
            'win_rate': np.mean(daily_pnl > 0),
            'rebalances': rebalances,
            'avg_daily_pnl': np.mean(daily_pnl),
        }

    def risk_metrics(self, funding_rates):
        """Compute strategy risk metrics."""
        neg_periods = np.sum(funding_rates < 0)
        max_neg_streak = 0
        current_streak = 0
        for f in funding_rates:
            if f < 0:
                current_streak += 1
                max_neg_streak = max(max_neg_streak, current_streak)
            else:
                current_streak = 0

        return {
            'neg_funding_pct': neg_periods / len(funding_rates),
            'max_neg_streak': max_neg_streak,
            'worst_8h_funding': np.min(funding_rates),
            'best_8h_funding': np.max(funding_rates),
            'funding_volatility': np.std(funding_rates),
        }

# Run strategy simulation
np.random.seed(42)
strategy = FundingRateArbitrage(capital=100_000, leverage=2.0)

# Simulate different market regimes
regimes = [
    ("Bull Market (High Funding)", 0.0003, 0.0004),
    ("Normal Market", 0.0001, 0.0003),
    ("Bear Market (Neg Funding)", -0.0001, 0.0005),
]

print("=" * 60)
print("FUNDING RATE ARBITRAGE STRATEGY")
print(f"Capital: $100K | Leverage: 2x | Notional: $200K")
print("=" * 60)

for regime_name, mean_f, vol_f in regimes:
    funding = strategy.simulate_funding_rates(180, mean_rate=mean_f, vol=vol_f)
    spot_ret = np.random.normal(0, 0.003, len(funding))
    result = strategy.backtest(funding, spot_ret)
    risk = strategy.risk_metrics(funding)

    print(f"\\n--- {regime_name} ---")
    print(f"  Total PnL:      ${result['total_pnl']:>10,.2f}")
    print(f"  Ann. Return:    {result['ann_return']:>9.1%}")
    print(f"  Sharpe Ratio:   {result['sharpe']:>9.2f}")
    print(f"  Win Rate:       {result['win_rate']:>9.1%}")
    print(f"  Max Drawdown:   ${result['max_drawdown']:>10,.2f}")
    print(f"  Neg Funding %:  {risk['neg_funding_pct']:>9.1%}")
    print(f"  Max Neg Streak: {risk['max_neg_streak']:>9d} periods")`}
      />

      <ExampleBlock
        title="Multi-Asset Funding Rotation"
        difficulty="advanced"
        problem="You have $300K capital and observe 8-hour funding rates: BTC = +0.035%, ETH = +0.020%, SOL = -0.010%. Your leverage limit is 2x. How should you allocate across assets to maximize funding income while maintaining delta-neutrality?"
        solution={[
          {
            step: 'Rank by funding rate',
            formula: '\\text{BTC} > \\text{ETH} > \\text{SOL}',
            explanation: 'BTC has the highest positive funding, SOL has negative funding.',
          },
          {
            step: 'Exclude negative funding assets',
            formula: '\\text{Skip SOL (negative funding)}',
            explanation: 'For a carry strategy, only collect positive funding.',
          },
          {
            step: 'Proportional allocation',
            formula: 'w_{\\text{BTC}} = \\frac{0.035}{0.035 + 0.020} = 63.6\\%, \\quad w_{\\text{ETH}} = 36.4\\%',
          },
          {
            step: 'Position sizes',
            formula: '\\text{BTC notional} = 300K \\times 2 \\times 0.636 = \\$381.8K',
          },
          {
            step: 'Daily income',
            formula: '\\text{Daily} = 381.8K \\times 0.035\\% \\times 3 + 218.2K \\times 0.020\\% \\times 3 = \\$532',
            explanation: 'Annualized to approximately $194K or 64.7% return on capital. In practice, account for basis risk across multiple assets.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Funding rate arbitrage is one of the most accessible crypto quant strategies,
          offering attractive risk-adjusted returns during bullish markets when funding
          rates are persistently positive. The key risks are basis risk (imperfect
          spot-perp hedge), negative funding periods during bear markets, exchange
          counterparty risk, and liquidation risk from leverage. For Indian traders,
          the strategy must be executed on global exchanges due to the prohibitive
          1% TDS on Indian platforms.
        </p>
      </NoteBlock>
    </div>
  )
}
