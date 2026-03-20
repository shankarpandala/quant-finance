import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveBacktestResult() {
  const [winRate, setWinRate] = useState(65)
  const [avgWin, setAvgWin] = useState(30)
  const [avgLoss, setAvgLoss] = useState(80)
  const [tradesPerMonth, setTradesPerMonth] = useState(4)

  const expectancy = (winRate / 100) * avgWin - ((100 - winRate) / 100) * avgLoss
  const monthlyPnl = expectancy * tradesPerMonth
  const annualPnl = monthlyPnl * 12
  const kellyPct = (winRate / 100) - ((100 - winRate) / 100) / (avgWin / avgLoss)

  const months = 12
  const equity = [100000]
  for (let m = 0; m < months; m++) {
    equity.push(equity[equity.length - 1] + monthlyPnl * 75)
  }

  const chartW = 480, chartH = 140, padL = 50
  const maxE = Math.max(...equity), minE = Math.min(...equity)
  const toY = (v) => chartH + 5 - ((v - minE * 0.95) / (maxE * 1.05 - minE * 0.95)) * chartH
  const toX = (i) => padL + (i / months) * (chartW - padL)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Options Strategy Backtest Metrics
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust win rate, average win/loss to see strategy expectancy for a weekly Nifty iron condor.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Win Rate = {winRate}%</span>
          <input type="range" min="30" max="90" step="1" value={winRate}
            onChange={e => setWinRate(Number(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Avg Win = INR {avgWin}/unit</span>
          <input type="range" min="10" max="100" step="5" value={avgWin}
            onChange={e => setAvgWin(Number(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Avg Loss = INR {avgLoss}/unit</span>
          <input type="range" min="30" max="300" step="10" value={avgLoss}
            onChange={e => setAvgLoss(Number(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Trades/Month = {tradesPerMonth}</span>
          <input type="range" min="1" max="12" step="1" value={tradesPerMonth}
            onChange={e => setTradesPerMonth(Number(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox={`0 0 ${chartW + 20} ${chartH + 35}`}
        className="w-full max-w-2xl mx-auto block" aria-label="Equity curve">
        <line x1={padL} y1={5} x2={padL} y2={chartH + 5} stroke="#9ca3af" strokeWidth="1" />
        <line x1={padL} y1={chartH + 5} x2={chartW + padL - padL} y2={chartH + 5} stroke="#9ca3af" strokeWidth="1" />
        <polyline points={equity.map((e, i) => `${toX(i)},${toY(e)}`).join(' ')}
          fill="none" stroke={expectancy > 0 ? '#10b981' : '#ef4444'} strokeWidth="2.5" />
      </svg>

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Expectancy/trade</div>
          <div className={`text-lg font-bold ${expectancy > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {expectancy > 0 ? '+' : ''}{expectancy.toFixed(1)}
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Monthly P&L/lot</div>
          <div className="text-sm font-bold text-blue-600 dark:text-blue-400">INR {(monthlyPnl * 75).toFixed(0)}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Annual P&L/lot</div>
          <div className="text-sm font-bold text-purple-600 dark:text-purple-400">INR {(annualPnl * 75).toFixed(0)}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Kelly %</div>
          <div className="text-sm font-bold text-orange-600 dark:text-orange-400">{(kellyPct * 100).toFixed(1)}%</div>
        </div>
      </div>
    </div>
  )
}

export default function BacktestEngine() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Options Backtest Engine
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Building an options backtest engine is substantially more complex than a stock backtest.
        You must handle multi-dimensional data (strikes, expiries), model Greeks evolution,
        account for assignment and exercise, and properly simulate fills with bid-ask spreads.
        This section covers the architecture of a robust options backtesting framework for
        NSE Nifty strategies.
      </p>

      <DefinitionBlock
        title="Options Backtest Engine"
        label="Definition 7.14"
        definition="An options backtest engine simulates the execution of options trading strategies on historical data, tracking positions across multiple strikes and expiries, managing Greeks exposure, handling expiration and assignment, and computing realistic P&L including transaction costs and margin."
        notation="\text{P\&L}_t = \sum_{i \in \text{positions}} n_i \cdot [\text{Price}_t(K_i, T_i) - \text{Entry}(K_i, T_i)] - \text{Costs}"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Engine Architecture
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Component</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Responsibility</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Key Challenges</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Data Feed</td>
              <td className="px-4 py-2">Load option chains per timestamp</td>
              <td className="px-4 py-2">Missing strikes, stale quotes</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Strategy Logic</td>
              <td className="px-4 py-2">Entry/exit signal generation</td>
              <td className="px-4 py-2">Strike selection, roll logic</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Execution Model</td>
              <td className="px-4 py-2">Fill simulation with slippage</td>
              <td className="px-4 py-2">Bid-ask, partial fills, OI limits</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Position Manager</td>
              <td className="px-4 py-2">Track multi-leg positions</td>
              <td className="px-4 py-2">Expiry handling, assignment</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Risk/Margin</td>
              <td className="px-4 py-2">SPAN margin computation</td>
              <td className="px-4 py-2">Intraday margin calls</td>
            </tr>
          </tbody>
        </table>
      </div>

      <TheoremBlock
        title="Transaction Cost Impact on Options Strategies"
        label="Theorem 7.11"
        statement="For a credit spread strategy with expected return E[R] per trade, the break-even number of legs is: n_{\max} = E[R] \times \text{lot size} / (2 \times \text{cost per leg}). On NSE with INR 20 brokerage per order, STT of 0.05% on sell premium, and typical 2-point slippage, a 4-leg iron condor incurs approximately INR 600-900 per lot in total costs."
        proof="Total cost per iron condor: 4 legs x INR 20 brokerage = INR 80. STT on 2 sell legs: 0.0005 x premium x lot_size x 2. Slippage: 2 points x 4 legs x lot_size / 2 (average). For typical Nifty premiums and lot size 75, this sums to INR 600-900."
      />

      <InteractiveBacktestResult />

      <PythonCode
        title="options_backtest_engine.py"
        runnable
        code={`import numpy as np
from scipy.stats import norm
from dataclasses import dataclass
from typing import List

@dataclass
class OptionPosition:
    strike: float
    expiry_days: int
    option_type: str  # 'call' or 'put'
    quantity: int     # positive = long, negative = short
    entry_price: float

def bsm_price(S, K, T, r, sigma, opt_type='call'):
    if T <= 0:
        if opt_type == 'call':
            return max(S - K, 0)
        return max(K - S, 0)
    d1 = (np.log(S/K) + (r+sigma**2/2)*T)/(sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    if opt_type == 'call':
        return S*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)
    return K*np.exp(-r*T)*norm.cdf(-d2) - S*norm.cdf(-d1)

class OptionsBacktester:
    def __init__(self, initial_capital=500000, lot_size=75):
        self.capital = initial_capital
        self.lot_size = lot_size
        self.positions: List[OptionPosition] = []
        self.trade_log = []
        self.equity_curve = [initial_capital]

    def enter_iron_condor(self, spot, strikes, premiums, day):
        """Enter a 4-leg iron condor."""
        K1, K2, K3, K4 = strikes
        p1, p2, p3, p4 = premiums

        # Slippage model: 2 points per leg
        slippage = 2

        self.positions = [
            OptionPosition(K1, 7, 'put', 1, p1 + slippage),    # buy OTM put
            OptionPosition(K2, 7, 'put', -1, p2 - slippage),   # sell put
            OptionPosition(K3, 7, 'call', -1, p3 - slippage),  # sell call
            OptionPosition(K4, 7, 'call', 1, p4 + slippage),   # buy OTM call
        ]

        credit = (p2 - p1 + p3 - p4 - 4 * slippage)
        brokerage = 4 * 20  # INR 20 per leg
        stt = 0.0005 * (p2 + p3) * self.lot_size  # STT on sells
        total_cost = brokerage + stt

        self.trade_log.append({
            'day': day, 'type': 'ENTRY', 'credit': credit,
            'cost': total_cost, 'spot': spot
        })
        return credit, total_cost

    def settle(self, spot, day):
        """Settle all positions at expiry."""
        total_pnl = 0
        for pos in self.positions:
            if pos.option_type == 'call':
                settle_val = max(spot - pos.strike, 0)
            else:
                settle_val = max(pos.strike - spot, 0)

            pnl = pos.quantity * (pos.entry_price - settle_val) * self.lot_size
            total_pnl += pnl

        self.capital += total_pnl
        self.equity_curve.append(self.capital)
        self.trade_log.append({
            'day': day, 'type': 'SETTLE', 'pnl': total_pnl, 'spot': spot
        })
        self.positions = []
        return total_pnl

# Run backtest: Weekly Nifty Iron Condor
np.random.seed(42)
bt = OptionsBacktester(initial_capital=500000)

S = 22000
r = 0.065
sigma = 0.16
n_weeks = 52

print("=== Weekly Nifty Iron Condor Backtest (1 Year) ===")
print(f"Initial Capital: INR {bt.capital:,}")
print(f"Strategy: Sell 300-pt wide IC, 200-pt wings")
print()

weekly_pnls = []
for week in range(n_weeks):
    # Simulate weekly Nifty return
    weekly_return = np.random.normal(0.001, sigma/np.sqrt(52))
    S_new = S * (1 + weekly_return)

    # Set up iron condor 300 pts from spot
    K1 = round(S/50)*50 - 500
    K2 = round(S/50)*50 - 300
    K3 = round(S/50)*50 + 300
    K4 = round(S/50)*50 + 500

    # Price options
    T = 7/365
    p1 = bsm_price(S, K1, T, r, sigma, 'put')
    p2 = bsm_price(S, K2, T, r, sigma, 'put')
    p3 = bsm_price(S, K3, T, r, sigma, 'call')
    p4 = bsm_price(S, K4, T, r, sigma, 'call')

    credit, cost = bt.enter_iron_condor(S, [K1,K2,K3,K4], [p1,p2,p3,p4], week)
    pnl = bt.settle(S_new, week)
    weekly_pnls.append(pnl)

    if (week+1) % 13 == 0:
        print(f"Q{(week+1)//13}: Capital={bt.capital:>10,.0f} | "
              f"Nifty={S_new:>8,.0f} | Q-PnL={sum(weekly_pnls[-13:]):>8,.0f}")

    S = S_new

pnls = np.array(weekly_pnls)
print(f"\\n=== Performance Summary ===")
print(f"Final Capital: INR {bt.capital:,}")
print(f"Total P&L: INR {bt.capital - 500000:,}")
print(f"Win Rate: {(pnls > 0).mean()*100:.1f}%")
print(f"Avg Win: INR {pnls[pnls>0].mean():,.0f}")
print(f"Avg Loss: INR {pnls[pnls<0].mean():,.0f}")
print(f"Sharpe: {np.mean(pnls)/np.std(pnls)*np.sqrt(52):.2f}")
print(f"Max Drawdown: INR {min(np.minimum.accumulate(np.cumsum(pnls)) - np.cumsum(pnls)):,.0f}")`}
      />

      <ExampleBlock
        title="Computing Fill Price for a Nifty Spread"
        difficulty="intermediate"
        problem="You want to enter a Nifty 21800/22200 bull call spread. The 21800 CE shows bid=285, ask=290. The 22200 CE shows bid=118, ask=122. What is the realistic entry cost per unit?"
        solution={[
          {
            step: 'Buy the 21800 CE at the ask',
            formula: '\\text{Pay} = 290 \\text{ (ask price, lifting the offer)}',
          },
          {
            step: 'Sell the 22200 CE at the bid',
            formula: '\\text{Receive} = 118 \\text{ (bid price, hitting the bid)}',
          },
          {
            step: 'Net debit with realistic fills',
            formula: '\\text{Debit} = 290 - 118 = 172 \\text{ per unit}',
            explanation: 'vs. mid-to-mid: (287.5 - 120) = 167.5. The bid-ask slippage costs 4.5 points (2.7% of the spread cost). This is why many backtesters underestimate transaction costs.',
          },
        ]}
      />

      <NoteBlock title="Realistic Fill Modeling" type="warning">
        <p>
          The single biggest source of backtest overfitting in options strategies is unrealistic
          fill assumptions. Never assume mid-price fills. For Nifty ATM options, use mid plus
          1-2 point slippage. For 500+ point OTM options, use 3-5 points or the bid/ask directly.
          For Bank Nifty, add 50% more slippage. Model the cost of all legs entering and exiting.
          A 4-leg iron condor with 2-point slippage per leg costs 16 points round-trip per unit,
          which can exceed the total credit on a narrow condor.
        </p>
      </NoteBlock>

      <NoteBlock title="Margin-Aware Backtesting" type="tip">
        <p>
          Options strategies on NSE require margin under the SPAN framework. A short straddle
          requires approximately INR 1.5-2 lakh margin per lot. An iron condor requires less
          (~INR 30-50K). Your backtest must track margin requirements and reject trades that
          exceed available capital. SEBI peak margin rules mean intraday margin must be
          maintained at all times, not just at EOD. Use NSE SPAN calculator data for
          historically accurate margin estimates.
        </p>
      </NoteBlock>
    </div>
  )
}
