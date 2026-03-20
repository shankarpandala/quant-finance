import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveTearsheet() {
  const [annReturn, setAnnReturn] = useState(18.0)
  const [annVol, setAnnVol] = useState(20.0)
  const [maxDD, setMaxDD] = useState(22.0)
  const [winRate, setWinRate] = useState(54.0)

  const rf = 6.5
  const sharpe = (annReturn - rf) / annVol
  const calmar = (annReturn - rf) / maxDD
  const avgWin = annReturn > 0 ? (annReturn / (winRate / 100 * 252) * 252) : 0
  const profitFactor = winRate / (100 - winRate)
  const stability = Math.min(0.99, sharpe * 0.45 + 0.3)
  const tailRatio = 1.0 + (sharpe - 0.5) * 0.3

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Strategy Tearsheet Summary
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Preview key pyfolio-style metrics for an Indian equity strategy.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Ann. Return: {annReturn.toFixed(1)}%</span>
          <input type="range" min="-10" max="40" step="0.5" value={annReturn}
            onChange={e => setAnnReturn(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Ann. Vol: {annVol.toFixed(1)}%</span>
          <input type="range" min="5" max="50" step="0.5" value={annVol}
            onChange={e => setAnnVol(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Max DD: {maxDD.toFixed(1)}%</span>
          <input type="range" min="3" max="50" step="0.5" value={maxDD}
            onChange={e => setMaxDD(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Win Rate: {winRate.toFixed(1)}%</span>
          <input type="range" min="30" max="75" step="0.5" value={winRate}
            onChange={e => setWinRate(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">Sharpe</p>
          <p className="text-lg font-bold text-blue-800 dark:text-blue-200">{sharpe.toFixed(2)}</p>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
          <p className="text-xs font-semibold text-purple-700 dark:text-purple-300">Calmar</p>
          <p className="text-lg font-bold text-purple-800 dark:text-purple-200">{calmar.toFixed(2)}</p>
        </div>
        <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/30">
          <p className="text-xs font-semibold text-green-700 dark:text-green-300">Stability</p>
          <p className="text-lg font-bold text-green-800 dark:text-green-200">{stability.toFixed(2)}</p>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">Profit Factor</p>
          <p className="text-lg font-bold text-amber-800 dark:text-amber-200">{profitFactor.toFixed(2)}</p>
        </div>
        <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/30">
          <p className="text-xs font-semibold text-red-700 dark:text-red-300">Tail Ratio</p>
          <p className="text-lg font-bold text-red-800 dark:text-red-200">{tailRatio.toFixed(2)}</p>
        </div>
        <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30">
          <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">Win Rate</p>
          <p className="text-lg font-bold text-indigo-800 dark:text-indigo-200">{winRate.toFixed(0)}%</p>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
        {sharpe >= 1.0
          ? <span className="font-semibold text-green-600 dark:text-green-400">Strong strategy profile -- suitable for institutional allocation</span>
          : sharpe >= 0.5
          ? <span className="font-semibold text-blue-600 dark:text-blue-400">Decent strategy -- monitor drawdown risk carefully</span>
          : <span className="font-semibold text-red-500">Weak risk-adjusted performance -- consider refinement</span>
        }
      </p>
    </div>
  )
}

export default function PyfolioEmpyrical() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Performance Analysis with Pyfolio and Empyrical
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Pyfolio and empyrical are the standard Python libraries for quantitative strategy
        evaluation. Originally developed by Quantopian, they provide tearsheet-style
        performance reports that every Indian quant fund uses for internal review and
        SEBI-mandated reporting. We will build a complete performance analysis pipeline
        for NSE strategies.
      </p>

      <DefinitionBlock
        title="Strategy Tearsheet"
        label="Definition 4.1"
        definition="A tearsheet is a comprehensive one-page summary of a trading strategy's performance, risk, and characteristics. It typically includes: equity curve, drawdown chart, monthly returns heatmap, rolling Sharpe/beta, exposure analysis, and key metrics (Sharpe, Sortino, Calmar, max drawdown, win rate, tail ratio)."
        notation="Empyrical functions: annual_return(), annual_volatility(), sharpe_ratio(), max_drawdown(), stability_of_timeseries(), tail_ratio()"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Key Empyrical Metrics
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Empyrical computes the following metrics from a pandas Series of daily returns:
      </p>

      <BlockMath math="\text{Stability} = R^2 \text{ of } \ln(\text{cumulative return}) \text{ vs. time}" />
      <BlockMath math="\text{Tail Ratio} = \frac{|P_{95}(\text{returns})|}{|P_5(\text{returns})|}" />
      <BlockMath math="\text{Omega Ratio} = \frac{\int_\theta^\infty [1 - F(r)] \, dr}{\int_{-\infty}^\theta F(r) \, dr}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Stability close to 1.0 indicates smooth, consistent equity curve growth. Tail ratio
        above 1.0 indicates larger right-tail gains than left-tail losses. The Omega ratio
        generalizes the Sharpe ratio by considering the entire return distribution.
      </p>

      <TheoremBlock
        title="Information Ratio Decomposition"
        label="Theorem 4.1"
        statement="The Information Ratio can be decomposed into the product of the Information Coefficient (skill) and the square root of breadth (number of independent bets). This is Grinold's Fundamental Law of Active Management."
        formula="\text{IR} = \text{IC} \times \sqrt{\text{BR}}"
        proof="Let IC be the correlation between predicted and actual returns, and BR be the number of independent bets per year. If each bet has alpha proportional to IC \cdot \sigma, then the total alpha is IC \cdot \sigma \cdot \sqrt{BR} (by diversification), and tracking error scales as \sigma \cdot \sqrt{BR}. Thus IR = alpha / TE = IC \cdot \sqrt{BR}. For an Indian quant strategy trading 50 Nifty stocks with weekly rebalancing, BR \approx 50 \times 52 = 2600, so even a small IC of 0.05 yields IR = 0.05 \times \sqrt{2600} = 2.55 -- an excellent theoretical IR."
      />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Metric</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Formula</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Good Value</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Measures</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Stability</td>
              <td className="px-4 py-2"><InlineMath math="R^2(\ln C_t, t)" /></td>
              <td className="px-4 py-2">&gt; 0.9</td>
              <td className="px-4 py-2">Equity curve smoothness</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Tail Ratio</td>
              <td className="px-4 py-2"><InlineMath math="|P_{95}|/|P_5|" /></td>
              <td className="px-4 py-2">&gt; 1.0</td>
              <td className="px-4 py-2">Return symmetry</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Omega</td>
              <td className="px-4 py-2"><InlineMath math="\int^+ / \int^-" /></td>
              <td className="px-4 py-2">&gt; 1.5</td>
              <td className="px-4 py-2">Full distribution quality</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Common Sense Ratio</td>
              <td className="px-4 py-2"><InlineMath math="\text{TR} \times (1 + \text{Ann.Ret})" /></td>
              <td className="px-4 py-2">&gt; 1.0</td>
              <td className="px-4 py-2">Sanity check</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveTearsheet />

      <NoteBlock title="Indian Market Adaptations" type="info">
        <ul className="space-y-2">
          <li>
            <strong>Risk-Free Rate:</strong> Set empyrical's risk_free parameter to the
            91-day T-bill yield (approximately 6.5% annual or 0.025% daily), not the US rate.
          </li>
          <li>
            <strong>Trading Days:</strong> Use period='daily' with annualization factor of 252
            for NSE strategies. For intraday, use the actual number of bars.
          </li>
          <li>
            <strong>Benchmark:</strong> Use Nifty 50 Total Return Index (TRI) as benchmark,
            which includes dividend reinvestment, for fair comparison against SEBI guidelines.
          </li>
          <li>
            <strong>STT and Charges:</strong> Always include Securities Transaction Tax,
            stamp duty, and GST in returns before computing performance metrics.
          </li>
        </ul>
      </NoteBlock>

      <PythonCode
        title="pyfolio_tearsheet.py"
        runnable
        code={`import numpy as np
import pandas as pd
from scipy.stats import linregress

# Simulate a Nifty-based quant strategy (3 years daily)
np.random.seed(42)
n_days = 756
dates = pd.bdate_range('2023-04-01', periods=n_days, freq='B')

# Strategy returns (momentum-based on NSE)
strategy_returns = np.random.normal(0.0006, 0.012, n_days)
# Benchmark: Nifty 50 returns
benchmark_returns = np.random.normal(0.0004, 0.013, n_days)

df = pd.DataFrame({
    'Strategy': strategy_returns,
    'Nifty50': benchmark_returns
}, index=dates)

rf_daily = 0.065 / 252  # 91-day T-bill

# --- Empyrical-style Metrics ---
def annual_return(returns, periods=252):
    total = (1 + returns).prod()
    years = len(returns) / periods
    return total ** (1/years) - 1

def annual_volatility(returns, periods=252):
    return returns.std() * np.sqrt(periods)

def sharpe_ratio(returns, rf=rf_daily, periods=252):
    excess = returns - rf
    return excess.mean() / excess.std() * np.sqrt(periods)

def sortino_ratio(returns, rf=rf_daily, periods=252):
    excess = returns - rf
    downside = excess[excess < 0]
    return excess.mean() * periods / (downside.std() * np.sqrt(periods))

def max_drawdown(returns):
    cumulative = (1 + returns).cumprod()
    running_max = cumulative.cummax()
    return ((cumulative - running_max) / running_max).min()

def stability_of_timeseries(returns):
    cumulative = np.log1p(returns).cumsum()
    x = np.arange(len(cumulative))
    slope, intercept, r_value, p_value, std_err = linregress(x, cumulative)
    return r_value ** 2

def tail_ratio(returns):
    p95 = np.percentile(returns, 95)
    p5 = np.percentile(returns, 5)
    return abs(p95 / p5) if p5 != 0 else np.inf

def omega_ratio(returns, threshold=0):
    above = returns[returns > threshold].sum()
    below = abs(returns[returns <= threshold].sum())
    return above / below if below > 0 else np.inf

def information_ratio(returns, benchmark, periods=252):
    active = returns - benchmark
    return active.mean() / active.std() * np.sqrt(periods)

# --- Compute All Metrics ---
strat = df['Strategy']
bench = df['Nifty50']

metrics = {
    'Annual Return': f"{annual_return(strat)*100:.2f}%",
    'Annual Volatility': f"{annual_volatility(strat)*100:.2f}%",
    'Sharpe Ratio': f"{sharpe_ratio(strat):.3f}",
    'Sortino Ratio': f"{sortino_ratio(strat):.3f}",
    'Max Drawdown': f"{max_drawdown(strat)*100:.2f}%",
    'Calmar Ratio': f"{(annual_return(strat)-0.065)/abs(max_drawdown(strat)):.3f}",
    'Stability': f"{stability_of_timeseries(strat):.4f}",
    'Tail Ratio': f"{tail_ratio(strat):.3f}",
    'Omega Ratio': f"{omega_ratio(strat):.3f}",
    'Information Ratio': f"{information_ratio(strat, bench):.3f}",
    'Win Rate': f"{(strat > 0).mean()*100:.1f}%",
    'Best Day': f"{strat.max()*100:.2f}%",
    'Worst Day': f"{strat.min()*100:.2f}%",
    'Skew': f"{strat.skew():.3f}",
    'Kurtosis': f"{strat.kurtosis():.3f}",
}

print("=== Strategy Tearsheet (Nifty Momentum) ===")
print(f"Period: {dates[0].strftime('%Y-%m-%d')} to {dates[-1].strftime('%Y-%m-%d')}")
print(f"Risk-free rate: 6.5% (91-day T-bill)\\n")
for name, value in metrics.items():
    print(f"  {name:<22} {value}")

# --- Monthly Returns Table ---
monthly = strat.resample('M').apply(lambda x: (1+x).prod()-1)
print(f"\\n--- Monthly Returns Summary ---")
print(f"Best month:  {monthly.max()*100:.2f}%")
print(f"Worst month: {monthly.min()*100:.2f}%")
print(f"Positive months: {(monthly > 0).sum()}/{len(monthly)} ({(monthly > 0).mean()*100:.0f}%)")`}
      />

      <ExampleBlock
        title="Reading a Pyfolio Tearsheet"
        difficulty="beginner"
        problem="A pyfolio tearsheet for a Bank Nifty intraday strategy shows: Sharpe = 1.8, Stability = 0.95, Tail Ratio = 1.3, Max DD = -8%, Win Rate = 52%. Interpret these metrics."
        solution={[
          {
            step: 'Sharpe Ratio = 1.8',
            formula: '\\text{SR} = 1.8 > 1.0',
            explanation: 'Excellent risk-adjusted returns. After accounting for the 6.5% Indian risk-free rate, the strategy generates strong excess returns per unit of risk.',
          },
          {
            step: 'Stability = 0.95',
            formula: 'R^2 = 0.95',
            explanation: '95% of the equity curve variation is explained by a linear trend -- very smooth growth with minimal deviation.',
          },
          {
            step: 'Tail Ratio = 1.3 and Win Rate = 52%',
            formula: '\\text{TR} = \\frac{|P_{95}|}{|P_5|} = 1.3',
            explanation: 'The right tail (gains) is 30% larger than the left tail (losses). Combined with 52% win rate, this is a positive expectancy strategy -- it wins slightly more often AND wins bigger. The -8% max drawdown is manageable.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Pyfolio and empyrical provide a standardized framework for evaluating strategies
          that goes far beyond simple returns. Always examine <strong>stability</strong> (is
          the equity curve linear or lumpy?), <strong>tail ratio</strong> (are you earning from
          fat right tails or losing to fat left tails?), and <strong>monthly returns
          heatmap</strong> (is performance seasonal or consistent?). For Indian markets,
          customize the risk-free rate and trading calendar to NSE conventions.
        </p>
      </NoteBlock>
    </div>
  )
}
