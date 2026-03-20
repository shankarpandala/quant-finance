import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveDispersion() {
  const [niftyIV, setNiftyIV] = useState(18)
  const [avgStockIV, setAvgStockIV] = useState(28)
  const [avgCorr, setAvgCorr] = useState(0.45)
  const [nStocks, setNStocks] = useState(10)

  const impliedCorr = (niftyIV * niftyIV) / (avgStockIV * avgStockIV)
  const dispersionGap = avgCorr - impliedCorr
  const tradePnL = dispersionGap * avgStockIV * avgStockIV * 0.01

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Nifty 50 Dispersion Trade Analysis
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Compare index implied vol vs constituent stock vols to identify dispersion opportunities.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Nifty IV = {niftyIV}%</span>
          <input type="range" min="8" max="35" step="1" value={niftyIV}
            onChange={e => setNiftyIV(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Avg Stock IV = {avgStockIV}%</span>
          <input type="range" min="15" max="50" step="1" value={avgStockIV}
            onChange={e => setAvgStockIV(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Realized Correlation = {avgCorr.toFixed(2)}</span>
          <input type="range" min="0.10" max="0.90" step="0.05" value={avgCorr}
            onChange={e => setAvgCorr(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Stocks Traded = {nStocks}</span>
          <input type="range" min="5" max="30" step="1" value={nStocks}
            onChange={e => setNStocks(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Implied Corr</div>
          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{impliedCorr.toFixed(3)}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Realized Corr</div>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{avgCorr.toFixed(2)}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Corr Gap</div>
          <div className={`text-lg font-bold ${dispersionGap > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {dispersionGap > 0 ? '+' : ''}{dispersionGap.toFixed(3)}
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Trade Signal</div>
          <div className={`text-sm font-bold ${dispersionGap > 0 ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
            {dispersionGap > 0.05 ? 'SELL INDEX VOL' : dispersionGap < -0.05 ? 'BUY INDEX VOL' : 'NEUTRAL'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DispersionTrading() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Dispersion Trading
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Dispersion trading exploits the difference between index-level implied volatility and the
        weighted average implied volatility of the index's constituent stocks. The trade is
        fundamentally a bet on implied correlation versus realized correlation. On NSE, this
        strategy can be implemented using Nifty 50 index options against options on the top
        liquid Nifty constituents like Reliance, TCS, HDFC Bank, and Infosys.
      </p>

      <DefinitionBlock
        title="Dispersion Trade"
        label="Definition 7.12"
        definition="A dispersion trade involves selling index volatility (typically via straddles or variance swaps) and buying single-stock volatility on the index constituents. It profits when the implied correlation between stocks is higher than the realized correlation."
        notation="\text{P\&L} \propto \rho_{\text{implied}} - \rho_{\text{realized}}"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Correlation Trade
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For an equally-weighted index of <InlineMath math="n" /> stocks with individual volatilities
        <InlineMath math="\sigma_i" /> and pairwise correlation <InlineMath math="\rho" />, the
        index variance is:
      </p>

      <BlockMath math="\sigma_{\text{index}}^2 = \frac{1}{n}\bar{\sigma}^2 + \frac{n-1}{n}\rho\bar{\sigma}^2 \approx \rho\,\bar{\sigma}^2 \quad \text{for large } n" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        This gives us the implied correlation:
      </p>

      <BlockMath math="\rho_{\text{implied}} = \frac{\sigma_{\text{index}}^2}{\bar{\sigma}_{\text{stocks}}^2}" />

      <TheoremBlock
        title="Correlation Risk Premium"
        label="Theorem 7.9"
        statement="Implied correlation systematically exceeds realized correlation in equity index markets. This correlation risk premium exists because: (1) index options are bid up for portfolio hedging, inflating index IV, (2) diversification benefit means index vol is always less than constituent vol average, and (3) during crises, correlations spike, making short correlation a concave payoff."
        proof="Empirically, the average implied-realized correlation gap on major equity indices is 5-15 correlation points. Theoretically, index put demand by institutional hedgers creates excess demand for index vol relative to single-stock vol, inflating the index IV and hence implied correlation."
      />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Component</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Position</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Greek</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">NSE Instrument</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Index leg</td>
              <td className="px-4 py-2">Sell straddle</td>
              <td className="px-4 py-2">Short vega</td>
              <td className="px-4 py-2">Nifty 50 options</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Stock legs</td>
              <td className="px-4 py-2">Buy straddles</td>
              <td className="px-4 py-2">Long vega</td>
              <td className="px-4 py-2">RIL, TCS, HDFC, INFY etc.</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Delta hedge</td>
              <td className="px-4 py-2">Futures</td>
              <td className="px-4 py-2">Flat delta</td>
              <td className="px-4 py-2">Nifty + stock futures</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveDispersion />

      <PythonCode
        title="dispersion_trading.py"
        runnable
        code={`import numpy as np

np.random.seed(42)

# Nifty 50 top constituents (simplified to 10 stocks)
stocks = {
    'RELIANCE': {'weight': 0.12, 'iv': 28, 'rv': 26},
    'TCS':      {'weight': 0.05, 'iv': 22, 'rv': 20},
    'HDFCBANK': {'weight': 0.09, 'iv': 24, 'rv': 22},
    'INFY':     {'weight': 0.07, 'iv': 26, 'rv': 23},
    'ICICIBANK':{'weight': 0.06, 'iv': 27, 'rv': 25},
    'HINDUNILVR':{'weight': 0.04, 'iv': 20, 'rv': 18},
    'ITC':      {'weight': 0.04, 'iv': 22, 'rv': 19},
    'SBIN':     {'weight': 0.03, 'iv': 32, 'rv': 30},
    'BAJFINANCE':{'weight': 0.03, 'iv': 35, 'rv': 32},
    'LT':       {'weight': 0.03, 'iv': 25, 'rv': 22},
}

# Compute weighted average stock IV and RV
weights = np.array([s['weight'] for s in stocks.values()])
weights = weights / weights.sum()  # renormalize
stock_ivs = np.array([s['iv'] for s in stocks.values()])
stock_rvs = np.array([s['rv'] for s in stocks.values()])

avg_stock_iv = np.sqrt(np.sum(weights * stock_ivs**2))
avg_stock_rv = np.sqrt(np.sum(weights * stock_rvs**2))

nifty_iv = 18  # Nifty 50 ATM IV
nifty_rv = 14  # Nifty 50 realized vol

# Implied and realized correlation
impl_corr = (nifty_iv / avg_stock_iv) ** 2
real_corr = (nifty_rv / avg_stock_rv) ** 2

print("=== Nifty 50 Dispersion Trade Analysis ===")
print(f"\\nNifty IV: {nifty_iv}% | Nifty RV: {nifty_rv}%")
print(f"Avg Stock IV: {avg_stock_iv:.1f}% | Avg Stock RV: {avg_stock_rv:.1f}%")
print(f"\\nImplied Correlation:  {impl_corr:.3f}")
print(f"Realized Correlation: {real_corr:.3f}")
print(f"Correlation Gap:      {impl_corr - real_corr:+.3f}")

# P&L estimation
print(f"\\n=== Per-Stock IV vs RV ===")
print(f"{'Stock':<12} {'Wt':>5} {'IV':>5} {'RV':>5} {'VRP':>5}")
print("-" * 35)
for name, data in stocks.items():
    vrp = data['iv'] - data['rv']
    print(f"{name:<12} {data['weight']:>4.0%} {data['iv']:>4}% {data['rv']:>4}% {vrp:>+4}%")

# Simulate dispersion P&L
print(f"\\n=== Dispersion P&L Simulation (30 days) ===")
T = 30 / 365
N_sims = 5000
pnls = []

for _ in range(N_sims):
    # Generate correlated stock returns
    n = len(stocks)
    corr_matrix = np.eye(n) * (1 - real_corr) + real_corr
    L = np.linalg.cholesky(corr_matrix)
    Z = np.random.standard_normal(n)
    returns = L @ Z * np.array(stock_rvs) / 100 * np.sqrt(T)

    # Index return (weighted sum)
    idx_return = np.sum(weights * returns)

    # P&L: short index vol, long stock vol
    # Simplified: P&L = sum(w_i * |r_i|) - |r_idx| scaled by vega
    stock_pnl = np.sum(weights * np.abs(returns) * stock_ivs)
    index_pnl = np.abs(idx_return) * nifty_iv
    net_pnl = stock_pnl - index_pnl
    pnls.append(net_pnl)

pnls = np.array(pnls)
print(f"Mean P&L:     {np.mean(pnls)*100:.2f}%")
print(f"Std P&L:      {np.std(pnls)*100:.2f}%")
print(f"Win Rate:     {(pnls > 0).mean()*100:.1f}%")
print(f"Sharpe:       {np.mean(pnls)/np.std(pnls)*np.sqrt(12):.2f}")
print(f"Max Drawdown: {np.min(pnls)*100:.2f}%")`}
      />

      <ExampleBlock
        title="Simple Dispersion Trade on NSE"
        difficulty="advanced"
        problem="Nifty IV is 18%, and the cap-weighted average IV of top 5 Nifty stocks is 27%. Implied correlation is (18/27)^2 = 0.444. You estimate realized correlation will be 0.35. Set up the trade and estimate profit if you trade INR 1 crore notional."
        solution={[
          {
            step: 'Confirm dispersion signal',
            formula: '\\rho_{\\text{impl}} - \\rho_{\\text{real}} = 0.444 - 0.35 = 0.094',
            explanation: 'Implied correlation exceeds realized by 9.4 points -- sell index vol, buy stock vol.',
          },
          {
            step: 'Index leg: sell Nifty straddle',
            formula: '\\text{Nifty vega} \\approx 130 \\text{ per lot}. \\text{ Sell } \\frac{1,00,00,000}{22000 \\times 75} \\approx 6 \\text{ lots}',
          },
          {
            step: 'Stock legs: buy straddles on top 5 stocks',
            formula: '\\text{Weight-proportional allocation across RIL, TCS, HDFC, INFY, ICICI}',
          },
          {
            step: 'Approximate P&L',
            formula: '\\text{P\\&L} \\approx \\frac{1}{2}(\\rho_{\\text{impl}} - \\rho_{\\text{real}}) \\times \\bar{\\sigma}^2 \\times \\text{Notional} \\times T',
            explanation: 'With the correlation gap of ~9%, this could generate 0.5-1% of notional over 30 days, but with significant variance.',
          },
        ]}
      />

      <NoteBlock title="Practical Challenges on NSE" type="warning">
        <p>
          Dispersion trading on NSE faces several hurdles: (1) only ~50 stocks have liquid options
          in the F&O segment, limiting constituent coverage, (2) stock option bid-ask spreads
          are wider than Nifty options (5-10 points vs 1-3 points), (3) different lot sizes
          make weight-matching imprecise, (4) physical settlement of stock options adds delivery
          risk, and (5) the margin requirement for the multi-leg position is substantial. Only
          well-capitalized institutional desks can execute this strategy efficiently.
        </p>
      </NoteBlock>

      <NoteBlock title="Correlation Spikes During Crises" type="tip">
        <p>
          The biggest risk in dispersion trading is a correlation spike during market stress.
          When Nifty crashes (e.g., March 2020), all stocks fall together and correlations surge
          toward 1.0. This causes the short index vol leg to lose far more than the long stock
          vol legs gain. Always maintain stop-losses or buy cheap OTM Nifty puts as crash
          protection. The correlation between India VIX and realized correlation is itself
          positive -- when vol spikes, correlations spike too.
        </p>
      </NoteBlock>
    </div>
  )
}
