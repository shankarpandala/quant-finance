import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractivePerformance() {
  const [sharpe, setSharpe] = useState(1.5)
  const [nTrades, setNTrades] = useState(200)
  const [winRate, setWinRate] = useState(65)
  const [skewness, setSkewness] = useState(-1.5)

  const tStat = sharpe * Math.sqrt(nTrades / 52)
  const pValue = 1 - 0.5 * (1 + Math.tanh(tStat * 0.7))
  const significant = pValue < 0.05

  const haircut = Math.max(0, 1 - 0.5 * Math.abs(skewness) / sharpe)
  const adjustedSharpe = sharpe * haircut

  const profitFactor = (winRate / 100) / ((100 - winRate) / 100) * (1 / (1 + Math.abs(skewness) * 0.3))

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Options Strategy Performance Metrics
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Evaluate statistical significance and risk-adjusted returns of your options backtest.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Sharpe Ratio = {sharpe.toFixed(1)}</span>
          <input type="range" min="0.1" max="4.0" step="0.1" value={sharpe}
            onChange={e => setSharpe(Number(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Total Trades = {nTrades}</span>
          <input type="range" min="20" max="1000" step="10" value={nTrades}
            onChange={e => setNTrades(Number(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Win Rate = {winRate}%</span>
          <input type="range" min="30" max="90" step="1" value={winRate}
            onChange={e => setWinRate(Number(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>P&L Skewness = {skewness.toFixed(1)}</span>
          <input type="range" min="-4" max="2" step="0.1" value={skewness}
            onChange={e => setSkewness(Number(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">t-Statistic</div>
          <div className={`text-lg font-bold ${tStat > 2 ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
            {tStat.toFixed(2)}
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Significant?</div>
          <div className={`text-sm font-bold ${significant ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {significant ? 'YES (p<0.05)' : 'NO'}
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Adjusted Sharpe</div>
          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{adjustedSharpe.toFixed(2)}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Profit Factor</div>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{profitFactor.toFixed(2)}</div>
        </div>
      </div>
    </div>
  )
}

export default function PerformanceAnalysis() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Options Strategy Performance Analysis
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Evaluating options strategy performance requires metrics beyond simple returns and Sharpe
        ratios. Options P&L distributions are typically non-normal -- short premium strategies
        show negative skewness (many small wins, few large losses), while long premium strategies
        show positive skewness. Standard performance metrics can be misleading without adjustments.
      </p>

      <DefinitionBlock
        title="Sortino Ratio"
        label="Definition 7.15"
        definition="The Sortino ratio measures risk-adjusted return using only downside deviation rather than total standard deviation. It is more appropriate for options strategies where upside volatility is desirable."
        notation="\text{Sortino} = \frac{R_p - R_f}{\sigma_{\text{downside}}}, \quad \sigma_{\text{downside}} = \sqrt{\frac{1}{n}\sum_{r_i < R_f}(r_i - R_f)^2}"
      />

      <DefinitionBlock
        title="Profit Factor"
        label="Definition 7.16"
        definition="Profit factor is the ratio of gross profits to gross losses. A profit factor above 1.0 indicates a profitable strategy. For short premium strategies on NSE, a typical profit factor is 1.2-1.8."
        notation="\text{PF} = \frac{\sum \text{Winning Trades}}{\sum |\text{Losing Trades}|}"
      />

      <TheoremBlock
        title="Adjusted Sharpe Ratio for Non-Normal Returns"
        label="Theorem 7.12"
        statement="For return distributions with skewness S_3 and excess kurtosis S_4, the Pezier-White adjusted Sharpe ratio is: SR_{\text{adj}} = SR \times [1 + \frac{S_3}{6}SR - \frac{S_4 - 3}{24}SR^2]. This penalizes strategies with negative skewness (like short premium) and rewards positive skewness."
        proof="The adjustment derives from the Cornish-Fisher expansion of the quantile function for non-normal distributions. By expressing the certainty equivalent return as a function of higher moments and equating to the risk-free rate, the adjusted Sharpe ratio emerges naturally."
      />

      <BlockMath math="\text{SR}_{\text{adj}} = \text{SR} \times \left[1 + \frac{S_3}{6}\text{SR} - \frac{S_4 - 3}{24}\text{SR}^2\right]" />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Key Metrics for Options Strategies
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Metric</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Formula</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Good Value</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Relevance</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Sharpe Ratio</td>
              <td className="px-4 py-2"><InlineMath math="(R_p - R_f)/\sigma" /></td>
              <td className="px-4 py-2">&gt; 1.5</td>
              <td className="px-4 py-2">Risk-adjusted return</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Max Drawdown</td>
              <td className="px-4 py-2">Peak-to-trough decline</td>
              <td className="px-4 py-2">&lt; 15%</td>
              <td className="px-4 py-2">Worst case scenario</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Calmar Ratio</td>
              <td className="px-4 py-2"><InlineMath math="R_p / \text{MaxDD}" /></td>
              <td className="px-4 py-2">&gt; 2.0</td>
              <td className="px-4 py-2">Return per drawdown</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Win Rate</td>
              <td className="px-4 py-2">Wins / Total</td>
              <td className="px-4 py-2">Context-dependent</td>
              <td className="px-4 py-2">Strategy character</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Expectancy</td>
              <td className="px-4 py-2"><InlineMath math="p \cdot W - (1-p) \cdot L" /></td>
              <td className="px-4 py-2">&gt; 0</td>
              <td className="px-4 py-2">Average P&L per trade</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractivePerformance />

      <PythonCode
        title="performance_analysis.py"
        runnable
        code={`import numpy as np
from scipy import stats

np.random.seed(42)

def generate_option_strategy_returns(strategy='iron_condor', n=200):
    """Generate realistic P&L for different option strategies."""
    if strategy == 'iron_condor':
        # High win rate, negative skew
        wins = np.random.uniform(15, 35, int(n * 0.68))
        losses = -np.random.uniform(60, 200, n - len(wins))
        returns = np.concatenate([wins, losses])
    elif strategy == 'straddle_buy':
        # Low win rate, positive skew
        losses = -np.random.uniform(30, 80, int(n * 0.60))
        wins = np.random.uniform(50, 400, n - len(losses))
        returns = np.concatenate([wins, losses])
    else:  # vertical spread
        wins = np.random.uniform(20, 80, int(n * 0.55))
        losses = -np.random.uniform(40, 120, n - len(wins))
        returns = np.concatenate([wins, losses])
    np.random.shuffle(returns)
    return returns

def performance_report(returns, name, capital=500000, lot_size=75):
    """Comprehensive performance analysis."""
    pnl = returns * lot_size
    cum_pnl = np.cumsum(pnl)
    equity = capital + cum_pnl

    # Basic stats
    total_return = cum_pnl[-1] / capital * 100
    n_trades = len(returns)
    win_rate = (returns > 0).mean() * 100

    # Sharpe (annualized, assuming weekly trades)
    sharpe = np.mean(returns) / np.std(returns) * np.sqrt(52)

    # Sortino
    downside = returns[returns < 0]
    downside_std = np.std(downside) if len(downside) > 0 else 1
    sortino = np.mean(returns) / downside_std * np.sqrt(52)

    # Skewness and Kurtosis
    skew = stats.skew(returns)
    kurt = stats.kurtosis(returns)

    # Adjusted Sharpe (Pezier-White)
    adj_sharpe = sharpe * (1 + skew/6 * sharpe - (kurt)/24 * sharpe**2)

    # Max Drawdown
    running_max = np.maximum.accumulate(equity)
    drawdowns = (equity - running_max) / running_max * 100
    max_dd = drawdowns.min()

    # Calmar
    annual_return = total_return / (n_trades / 52)  # approximate
    calmar = -annual_return / max_dd if max_dd != 0 else 0

    # Profit Factor
    gross_profit = pnl[pnl > 0].sum()
    gross_loss = abs(pnl[pnl < 0].sum())
    profit_factor = gross_profit / gross_loss if gross_loss > 0 else np.inf

    # Statistical significance
    t_stat = np.mean(returns) / (np.std(returns) / np.sqrt(n_trades))
    p_value = 2 * (1 - stats.t.cdf(abs(t_stat), n_trades - 1))

    print(f"\\n{'='*50}")
    print(f"  {name}")
    print(f"{'='*50}")
    print(f"Trades: {n_trades} | Win Rate: {win_rate:.1f}%")
    print(f"Total P&L: INR {cum_pnl[-1]:>12,.0f} ({total_return:+.1f}%)")
    print(f"Avg Win:  INR {pnl[pnl>0].mean():>8,.0f} | Avg Loss: INR {pnl[pnl<0].mean():>8,.0f}")
    print(f"\\nRisk Metrics:")
    print(f"  Sharpe Ratio:    {sharpe:>8.2f}")
    print(f"  Adjusted Sharpe: {adj_sharpe:>8.2f}")
    print(f"  Sortino Ratio:   {sortino:>8.2f}")
    print(f"  Max Drawdown:    {max_dd:>7.1f}%")
    print(f"  Calmar Ratio:    {calmar:>8.2f}")
    print(f"  Profit Factor:   {profit_factor:>8.2f}")
    print(f"\\nDistribution:")
    print(f"  Skewness:  {skew:>+7.2f} {'(neg skew - tail risk!)' if skew < -0.5 else ''}")
    print(f"  Kurtosis:  {kurt:>+7.2f} {'(fat tails!)' if kurt > 1 else ''}")
    print(f"\\nSignificance:")
    print(f"  t-stat: {t_stat:.2f} | p-value: {p_value:.4f}")
    print(f"  {'SIGNIFICANT (p<0.05)' if p_value < 0.05 else 'NOT SIGNIFICANT'}")

# Compare three option strategies
for strat, name in [
    ('iron_condor', 'Weekly Nifty Iron Condor'),
    ('straddle_buy', 'Pre-Event Long Straddle'),
    ('vertical', 'Directional Bull Call Spread'),
]:
    returns = generate_option_strategy_returns(strat)
    performance_report(returns, name)`}
      />

      <ExampleBlock
        title="Is This Iron Condor Backtest Too Good?"
        difficulty="advanced"
        problem="Your weekly Nifty iron condor backtest shows: Sharpe 2.8, win rate 72%, max drawdown 8%, over 100 trades. The P&L skewness is -2.1. Evaluate whether these results are statistically reliable."
        solution={[
          {
            step: 'Check t-statistic',
            formula: 't = SR \\times \\sqrt{N/52} = 2.8 \\times \\sqrt{100/52} = 3.88',
            explanation: 't > 2 suggests statistical significance at the 5% level.',
          },
          {
            step: 'Adjust Sharpe for negative skewness',
            formula: 'SR_{adj} \\approx 2.8 \\times [1 + \\frac{-2.1}{6}(2.8)] = 2.8 \\times 0.02 = 0.06',
            explanation: 'The heavy negative skew dramatically reduces the adjusted Sharpe! The raw Sharpe of 2.8 is misleading.',
          },
          {
            step: 'Interpret',
            formula: '\\text{Adjusted Sharpe} \\ll \\text{Raw Sharpe}',
            explanation: 'With skewness of -2.1, the strategy has significant tail risk that the Sharpe ratio hides. The 72% win rate comes at the cost of occasional large losses. This is a classic "picking up pennies in front of a steamroller" profile. The 100-trade sample may not have experienced a true tail event.',
          },
        ]}
      />

      <NoteBlock title="Minimum Sample Size" type="warning">
        <p>
          For weekly options strategies with 52 trades/year, you need at least 2-3 years of data
          (100-150 trades) for meaningful statistical analysis. With monthly strategies (12/year),
          you need 5+ years. The Indian options market structure changed significantly in 2019
          (weekly expiries) and 2020 (physical settlement), so pre-2019 data may not be
          representative. Always report confidence intervals alongside point estimates.
        </p>
      </NoteBlock>

      <NoteBlock title="Regime Analysis" type="tip">
        <p>
          Break your backtest into regimes: low vol (India VIX less than 14), normal vol (14-20),
          and high vol (above 20). Most iron condor strategies show excellent performance in low
          vol regimes and poor performance in high vol regimes. If your backtest period is
          dominated by low vol, results will be biased upward. The true test is performance
          during the March 2020 crash, September 2018 NBFC crisis, or the 2022 rate hike cycle.
        </p>
      </NoteBlock>
    </div>
  )
}
