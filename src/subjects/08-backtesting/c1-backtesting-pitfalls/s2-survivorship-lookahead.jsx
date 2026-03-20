import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveBias() {
  const [biasType, setBiasType] = useState('survivorship')
  const [nStocks, setNStocks] = useState(50)
  const [delistRate, setDelistRate] = useState(5)
  const [years, setYears] = useState(10)

  const survivingStocks = Math.round(nStocks * Math.pow(1 - delistRate / 100, years))
  const delistedStocks = nStocks - survivingStocks
  const avgSurvivorReturn = 12 + delistRate * 0.5
  const avgDelistedReturn = -15 - delistRate * 2
  const biasedReturn = avgSurvivorReturn
  const trueReturn = (survivingStocks * avgSurvivorReturn + delistedStocks * avgDelistedReturn) / nStocks
  const biasAmount = biasedReturn - trueReturn

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Survivorship Bias Impact on Nifty 50 Backtests
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        See how excluding delisted stocks inflates backtest returns.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Universe Size = {nStocks}</span>
          <input type="range" min="20" max="200" step="10" value={nStocks}
            onChange={e => setNStocks(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Annual Delist Rate = {delistRate}%</span>
          <input type="range" min="1" max="15" step="1" value={delistRate}
            onChange={e => setDelistRate(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Backtest Years = {years}</span>
          <input type="range" min="3" max="20" step="1" value={years}
            onChange={e => setYears(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Surviving Stocks</div>
          <div className="text-lg font-bold text-green-600 dark:text-green-400">{survivingStocks}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Biased Return</div>
          <div className="text-lg font-bold text-orange-600 dark:text-orange-400">{biasedReturn.toFixed(1)}%</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">True Return</div>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{trueReturn.toFixed(1)}%</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Bias Amount</div>
          <div className="text-lg font-bold text-red-600 dark:text-red-400">{biasAmount.toFixed(1)}%</div>
        </div>
      </div>
    </div>
  )
}

export default function SurvivorshipLookahead() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Survivorship Bias and Look-Ahead Bias
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Survivorship bias and look-ahead bias are two of the most insidious data biases in
        backtesting. They inflate apparent strategy performance by incorporating information that
        would not have been available at the time of the trade. On NSE, where stocks are regularly
        added to and removed from Nifty 50, these biases can add 2-4% annually to backtest returns.
      </p>

      <DefinitionBlock
        title="Survivorship Bias"
        label="Definition 8.2"
        definition="Survivorship bias occurs when a backtest uses only currently existing (surviving) securities, excluding those that were delisted, merged, or removed from an index. Since surviving stocks tend to have performed better, this creates an upward bias in returns."
        notation="R_{\text{biased}} = \frac{1}{n_{\text{surviving}}} \sum_{i \in \text{survivors}} R_i > R_{\text{true}} = \frac{1}{n_{\text{all}}} \sum_{i \in \text{all}} R_i"
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        On NSE, Nifty 50 constituents change 2-5 times per year through periodic rebalancing by
        NSE Indices Ltd. Companies that perform poorly are removed (e.g., Yes Bank was removed
        from Nifty in 2020 after its stock crashed 90%), and their poor performance is excluded
        from survivorship-biased datasets.
      </p>

      <DefinitionBlock
        title="Look-Ahead Bias"
        label="Definition 8.3"
        definition="Look-ahead bias occurs when a backtest uses information that was not available at the time of the simulated trade decision. This includes using future prices, upcoming corporate actions, or fundamental data before its actual release date."
        notation="\text{Signal}_t = f(\text{Data}_{t+k}) \quad \text{for any } k > 0 \implies \text{look-ahead bias}"
      />

      <TheoremBlock
        title="Survivorship Bias Bound"
        label="Theorem 8.2"
        statement="For a universe of N stocks with annual attrition rate \lambda (fraction delisted/year), the survivorship bias over T years is bounded by: \text{Bias} \leq \lambda T \cdot |\bar{R}_{\text{dead}} - \bar{R}_{\text{alive}}|, where \bar{R}_{\text{dead}} is the average return of stocks in the year before delisting."
        proof="In each year, \lambda N stocks are removed. Their absence biases the mean return upward by \lambda \cdot (\bar{R}_{\text{alive}} - \bar{R}_{\text{dead}}). Over T years, under the simplifying assumption that the bias is additive, the total bias accumulates linearly to \lambda T \cdot |\bar{R}_{\text{dead}} - \bar{R}_{\text{alive}}|."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Common Sources of Look-Ahead Bias on NSE
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Bias Source</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Example</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Impact</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Fix</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Index composition</td>
              <td className="px-4 py-2">Using today's Nifty 50 list for 2015</td>
              <td className="px-4 py-2">+2-3% annual</td>
              <td className="px-4 py-2">Point-in-time constituents</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Earnings data</td>
              <td className="px-4 py-2">Using Q2 results on Q2 end date</td>
              <td className="px-4 py-2">Huge (earnings drift)</td>
              <td className="px-4 py-2">Use actual filing date</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Adjusted prices</td>
              <td className="px-4 py-2">Split-adjusted data applied retroactively</td>
              <td className="px-4 py-2">Moderate</td>
              <td className="px-4 py-2">Adjustment factors per date</td>
            </tr>
            <tr>
              <td className="px-4 py-2">SEBI regulations</td>
              <td className="px-4 py-2">Applying 2023 margin rules to 2018</td>
              <td className="px-4 py-2">Varies</td>
              <td className="px-4 py-2">Time-stamped rule database</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveBias />

      <PythonCode
        title="survivorship_bias_demo.py"
        runnable
        code={`import numpy as np

np.random.seed(42)

def simulate_universe(n_stocks=100, n_years=10, annual_delist_rate=0.05,
                       mean_return=0.12, vol=0.25, delist_threshold=-0.50):
    """Simulate a stock universe with delistings to show survivorship bias."""
    annual_returns_all = []
    annual_returns_survivors = []

    active = np.ones(n_stocks, dtype=bool)
    prices = np.ones(n_stocks) * 100  # starting prices

    for year in range(n_years):
        # Generate returns for active stocks
        returns = np.random.normal(mean_return, vol, n_stocks)

        # Stocks that crash below threshold get delisted
        cum_prices = prices * (1 + returns)
        new_delists = (cum_prices < prices * (1 + delist_threshold)) & active

        # Record returns
        all_year_return = np.mean(returns[active])
        annual_returns_all.append(all_year_return)

        # Mark delistings
        active[new_delists] = False

        # Also random delistings (mergers, etc.)
        random_delists = np.random.random(n_stocks) < annual_delist_rate
        active[random_delists & active] = False

        # Survivor-only return (computed using only current survivors)
        survivor_return = np.mean(returns[active]) if active.any() else 0
        annual_returns_survivors.append(survivor_return)

        prices = cum_prices

    return (np.array(annual_returns_all),
            np.array(annual_returns_survivors),
            active.sum())

# Run simulation
all_ret, surv_ret, n_surviving = simulate_universe()

print("=== Survivorship Bias in Indian Stock Universe ===")
print(f"Starting universe: 100 stocks")
print(f"Surviving after 10 years: {n_surviving}")
print()

print(f"{'Year':>5} {'All Stocks':>12} {'Survivors':>12} {'Bias':>8}")
print("-" * 40)
cum_bias = 0
for y in range(10):
    bias = surv_ret[y] - all_ret[y]
    cum_bias += bias
    print(f"{y+1:>5} {all_ret[y]*100:>11.1f}% {surv_ret[y]*100:>11.1f}% "
          f"{bias*100:>+7.1f}%")

print(f"\\nCumulative bias over 10 years: {cum_bias*100:+.1f}%")
print(f"Average annual bias: {cum_bias/10*100:+.1f}%")
print(f"Survivor avg return: {np.mean(surv_ret)*100:.1f}%")
print(f"True avg return:     {np.mean(all_ret)*100:.1f}%")

# Look-ahead bias demonstration
print(f"\\n=== Look-Ahead Bias: Nifty 50 Composition ===")
# Simulate using point-in-time vs current composition
n_periods = 20
changes_per_period = 3
universe = list(range(50))

biased_returns = []
correct_returns = []

for period in range(n_periods):
    # True returns for all stocks
    returns = {s: np.random.normal(0.01, 0.05) for s in range(200)}

    # Correct: use composition known at start of period
    correct_ret = np.mean([returns[s] for s in universe])
    correct_returns.append(correct_ret)

    # Remove worst performers, add best new ones
    perf = [(s, returns[s]) for s in universe]
    perf.sort(key=lambda x: x[1])
    removed = [p[0] for p in perf[:changes_per_period]]
    new_stocks = np.random.choice(
        [s for s in range(200) if s not in universe],
        changes_per_period, replace=False)
    for r in removed:
        universe.remove(r)
    universe.extend(new_stocks)

    # Biased: use the NEW composition (look-ahead)
    biased_ret = np.mean([returns[s] for s in universe])
    biased_returns.append(biased_ret)

print(f"Correct avg return: {np.mean(correct_returns)*100:.2f}%")
print(f"Biased avg return:  {np.mean(biased_returns)*100:.2f}%")
print(f"Look-ahead bias:    {(np.mean(biased_returns)-np.mean(correct_returns))*100:+.2f}%")`}
      />

      <ExampleBlock
        title="Survivorship Bias in Nifty 50 Momentum Strategy"
        difficulty="intermediate"
        problem="You backtest a 12-month momentum strategy on current Nifty 50 stocks from 2015-2024. In 2018, Yes Bank (then in Nifty) showed a 12-month return of +80% and was ranked #3 by momentum. By 2020, it crashed 90% and was removed from Nifty. How does this create bias?"
        solution={[
          {
            step: 'Identify the bias',
            formula: '\\text{Using current Nifty 50 excludes Yes Bank from the universe}',
            explanation: 'Yes Bank is not in the current Nifty 50, so it is excluded from the backtest entirely.',
          },
          {
            step: 'Impact on 2018 momentum signal',
            formula: '\\text{True: Yes Bank ranked \\#3 with +80\\% momentum}',
            explanation: 'A correct backtest would have bought Yes Bank in 2018 based on momentum. The subsequent 90% crash would have been a devastating loss.',
          },
          {
            step: 'Quantify the bias',
            formula: '\\text{Excluded loss} \\approx -90\\% \\times \\frac{1}{50} = -1.8\\% \\text{ portfolio impact}',
            explanation: 'By excluding Yes Bank, the backtest avoids this loss entirely, inflating cumulative returns. Similar biases occur for other removed stocks like Zee, BPCL, etc.',
          },
        ]}
      />

      <NoteBlock title="Getting Point-in-Time Data for NSE" type="tip">
        <p>
          For survivorship-free backtesting on NSE: (1) NSE publishes historical Nifty 50
          constituent lists on its website (nseindia.com), (2) use CMIE Prowess or Bloomberg
          for point-in-time fundamental data, (3) the NSE bhavcopy archive contains all traded
          securities including delisted ones, (4) Kite Connect Historical API provides adjusted
          prices but check for survivorship in symbol lists. When in doubt, manually verify
          constituents against NSE circulars for the specific date.
        </p>
      </NoteBlock>

      <NoteBlock title="Subtle Look-Ahead Biases" type="warning">
        <p>
          Beyond obvious look-ahead biases, watch for: (1) using close prices for same-day
          signals (you cannot trade at close after seeing the close), (2) corporate action
          adjustments applied with future knowledge (bonus, splits), (3) using India VIX
          settlement value for same-day trading (computed after market close), (4) SEBI
          circular impacts (e.g., margin rule changes) assumed to be known before publication.
          Always ask: "Would I have known this information at the time of the trade decision?"
        </p>
      </NoteBlock>
    </div>
  )
}
