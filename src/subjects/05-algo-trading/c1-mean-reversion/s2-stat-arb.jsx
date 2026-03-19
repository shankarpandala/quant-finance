import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveBasketBuilder() {
  const [weights, setWeights] = useState([0.3, 0.25, -0.2, -0.15, 0.1])
  const stocks = ['TCS', 'Infosys', 'Wipro', 'HCL Tech', 'Tech Mahindra']
  const prices = [3800, 1600, 450, 1350, 1200]

  const portfolioValue = weights.reduce((sum, w, i) => sum + w * prices[i], 0)
  const netExposure = weights.reduce((sum, w) => sum + w, 0)
  const longExposure = weights.filter(w => w > 0).reduce((s, w) => s + w, 0)
  const shortExposure = weights.filter(w => w < 0).reduce((s, w) => s + Math.abs(w), 0)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Cointegration Basket Builder
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust portfolio weights for NSE IT sector stocks to create a market-neutral, mean-reverting basket.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-5">
        {stocks.map((stock, i) => (
          <label key={i} className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
            <span>{stock}: {weights[i].toFixed(2)}</span>
            <input type="range" min="-0.5" max="0.5" step="0.05" value={weights[i]}
              onChange={e => {
                const next = [...weights]
                next[i] = parseFloat(e.target.value)
                setWeights(next)
              }}
              className="h-2 w-full cursor-pointer accent-indigo-500" />
            <span className="text-[10px]">INR {prices[i]}</span>
          </label>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">Portfolio Value</p>
          <p className="text-lg font-bold text-gray-800 dark:text-gray-200">INR {portfolioValue.toFixed(0)}</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">Net Exposure</p>
          <p className={`text-lg font-bold ${Math.abs(netExposure) < 0.05 ? 'text-green-600' : 'text-red-500'}`}>
            {(netExposure * 100).toFixed(1)}%
          </p>
        </div>
        <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">Long Exposure</p>
          <p className="text-lg font-bold text-green-600">{(longExposure * 100).toFixed(1)}%</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">Short Exposure</p>
          <p className="text-lg font-bold text-red-500">{(shortExposure * 100).toFixed(1)}%</p>
        </div>
      </div>

      <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
        {Math.abs(netExposure) < 0.05
          ? <span className="font-semibold text-green-600 dark:text-green-400">Market-neutral basket achieved!</span>
          : <span className="font-semibold text-red-500">Adjust weights to achieve market neutrality (net exposure near 0%)</span>
        }
      </p>
    </div>
  )
}

export default function StatArb() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Statistical Arbitrage: Cointegration-Based Baskets on NSE
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Statistical arbitrage (stat arb) extends pairs trading from two stocks to multi-asset
        portfolios. Instead of trading a single pair, we construct baskets of cointegrated
        securities, exploiting mean-reversion in the portfolio's eigenportfolio or factor residuals.
        On the NSE, sectoral clustering of IT, banking, and FMCG stocks provides rich opportunities
        for basket-based stat arb strategies.
      </p>

      <DefinitionBlock
        title="Statistical Arbitrage"
        label="Definition 5.2"
        definition="Statistical arbitrage is a class of market-neutral strategies that exploit mean-reversion in the residuals from a factor model. Unlike classical arbitrage (which is risk-free), stat arb profits are statistical in nature -- they are expected to be positive over many trades but any individual trade may lose money."
        notation={<>A stat arb portfolio satisfies: <InlineMath math="\mathbb{E}[r_{portfolio}] > 0" />, <InlineMath math="\text{Var}[r_{portfolio}]" /> is bounded, and the portfolio has zero beta to the market.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Johansen Cointegration for Baskets
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        While the Engle-Granger approach works for two stocks, baskets of <InlineMath math="N" /> stocks
        require the Johansen procedure, which tests for multiple cointegrating relationships
        simultaneously. Given an <InlineMath math="N" />-dimensional price vector <InlineMath math="\mathbf{P}_t" />,
        the Vector Error Correction Model (VECM) is:
      </p>

      <BlockMath math="\Delta \mathbf{P}_t = \Pi \mathbf{P}_{t-1} + \sum_{i=1}^{p-1} \Gamma_i \Delta \mathbf{P}_{t-i} + \epsilon_t" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\Pi = \alpha \beta'" /> decomposes into the adjustment
        speeds <InlineMath math="\alpha" /> and cointegrating vectors <InlineMath math="\beta" />.
        The rank of <InlineMath math="\Pi" /> equals the number of cointegrating relationships.
      </p>

      <TheoremBlock
        title="Johansen Trace Test"
        label="Theorem 5.2"
        statement={<>For an <InlineMath math="N" />-dimensional system, the Johansen trace test sequentially tests hypotheses <InlineMath math="H_0: r \leq r_0" /> for <InlineMath math="r_0 = 0, 1, \ldots, N-1" /> where <InlineMath math="r" /> is the cointegration rank. The trace statistic is <InlineMath math="\lambda_{\text{trace}}(r_0) = -T \sum_{i=r_0+1}^{N} \ln(1 - \hat{\lambda}_i)" /> where <InlineMath math="\hat{\lambda}_i" /> are estimated eigenvalues from the canonical correlation analysis of the VECM.</>}
        proof={<>The proof follows from maximum likelihood estimation of the VECM under the reduced rank restriction on <InlineMath math="\Pi" />. The eigenvalues <InlineMath math="\hat{\lambda}_i" /> come from solving a generalized eigenvalue problem involving the residual moment matrices from regressing <InlineMath math="\Delta \mathbf{P}_t" /> and <InlineMath math="\mathbf{P}_{t-1}" /> on lagged differences. Under the null, the trace statistic follows a non-standard distribution tabulated by Johansen (1991).</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        PCA-Based Eigenportfolios
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        An alternative approach uses Principal Component Analysis (PCA) on the returns of a basket
        of stocks. The first few principal components capture systematic risk factors (market,
        sector), while the residuals are mean-reverting. For NSE stocks:
      </p>

      <BlockMath math="r_{i,t} = \sum_{k=1}^{K} \beta_{i,k} F_{k,t} + \epsilon_{i,t}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="F_{k,t}" /> are the principal component factors and <InlineMath math="\epsilon_{i,t}" /> are
        the residuals we trade. The eigenportfolios corresponding to the smallest eigenvalues
        exhibit the strongest mean reversion.
      </p>

      <BlockMath math="\text{Eigenportfolio weights: } \mathbf{w}_k = \frac{\mathbf{v}_k}{\|\mathbf{v}_k\|_1}" />

      <InteractiveBasketBuilder />

      <PythonCode
        title="stat_arb_nse_basket.py"
        runnable
        code={`import numpy as np
from numpy.linalg import eig

# Simulated daily returns for NSE IT sector stocks
np.random.seed(42)
n_days = 504  # 2 years of trading data
n_stocks = 5
stocks = ['TCS', 'Infosys', 'Wipro', 'HCL Tech', 'Tech Mah']

# Common IT sector factor + idiosyncratic noise
market_factor = np.random.randn(n_days) * 0.012
sector_factor = np.random.randn(n_days) * 0.008

betas_market = [0.85, 0.90, 1.05, 0.95, 1.10]
betas_sector = [0.70, 0.75, 0.85, 0.80, 0.90]

returns = np.zeros((n_days, n_stocks))
for i in range(n_stocks):
    idio = np.random.randn(n_days) * 0.015
    returns[:, i] = betas_market[i] * market_factor + \\
                    betas_sector[i] * sector_factor + idio

# Step 1: PCA on returns
cov_matrix = np.cov(returns.T)
eigenvalues, eigenvectors = eig(cov_matrix)

# Sort by eigenvalue (descending)
idx = np.argsort(eigenvalues)[::-1]
eigenvalues = eigenvalues[idx].real
eigenvectors = eigenvectors[:, idx].real

print("=== PCA on NSE IT Sector Returns ===")
print(f"{'PC':<5} {'Eigenvalue':<14} {'Var Explained':<15} {'Cumulative':<12}")
total_var = np.sum(eigenvalues)
cum_var = 0
for k in range(n_stocks):
    var_exp = eigenvalues[k] / total_var * 100
    cum_var += var_exp
    print(f"PC{k+1:<3} {eigenvalues[k]:<14.6f} {var_exp:<15.2f}% {cum_var:<12.2f}%")

# Step 2: Construct eigenportfolio from last PC (most mean-reverting)
mr_weights = eigenvectors[:, -1]
mr_weights = mr_weights / np.sum(np.abs(mr_weights))  # Normalize

print(f"\\n=== Most Mean-Reverting Eigenportfolio ===")
for i, stock in enumerate(stocks):
    direction = "LONG" if mr_weights[i] > 0 else "SHORT"
    print(f"{stock:<12} Weight: {mr_weights[i]:>7.3f}  ({direction})")

# Step 3: Compute eigenportfolio spread
spread = returns @ mr_weights
cum_spread = np.cumsum(spread)

# Step 4: Test mean reversion (OU process half-life)
from scipy import stats
delta_s = np.diff(cum_spread)
s_lag = cum_spread[:-1]
slope, intercept, r, p, se = stats.linregress(s_lag, delta_s)
half_life = -np.log(2) / slope if slope < 0 else float('inf')

print(f"\\n=== Mean Reversion Analysis ===")
print(f"OU theta:    {-slope:.4f}")
print(f"Half-life:   {half_life:.1f} days")
print(f"Spread std:  {np.std(cum_spread):.6f}")

# Step 5: Generate z-score signals
lookback = 60
entry_z, exit_z = 1.5, 0.3
signals = {'long': 0, 'short': 0, 'exit': 0}

for t in range(lookback, n_days):
    window = cum_spread[t-lookback:t]
    z = (cum_spread[t] - np.mean(window)) / (np.std(window) + 1e-8)
    if z < -entry_z:
        signals['long'] += 1
    elif z > entry_z:
        signals['short'] += 1
    elif abs(z) < exit_z:
        signals['exit'] += 1

print(f"\\n=== Trading Signals (z_entry={entry_z}, z_exit={exit_z}) ===")
for sig, count in signals.items():
    print(f"{sig.upper():<8} signals: {count}")

# NSE lot sizes for position sizing
lot_sizes = {'TCS': 175, 'Infosys': 300, 'Wipro': 1500,
             'HCL Tech': 500, 'Tech Mah': 600}
capital = 5_000_000  # INR 50 lakhs

print(f"\\n=== Position Sizing (Capital: INR {capital:,.0f}) ===")
for i, stock in enumerate(stocks):
    notional = abs(mr_weights[i]) * capital
    lots = int(notional / (lot_sizes[stock] * [3800,1600,450,1350,1200][i]))
    print(f"{stock:<12} Lots: {lots}  Notional: INR {notional:,.0f}")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Factor Model Residual Approach
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A more sophisticated approach uses a multi-factor model to strip out systematic risk
        before trading residuals. For NSE stocks, common factors include:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Factor</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Proxy</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Description</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Market</td>
              <td className="px-5 py-2">Nifty 50 returns</td>
              <td className="px-5 py-2">Broad market exposure</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Sector</td>
              <td className="px-5 py-2">Nifty IT / Bank Nifty</td>
              <td className="px-5 py-2">Sector-specific risk</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Size</td>
              <td className="px-5 py-2">SME vs Large Cap spread</td>
              <td className="px-5 py-2">Small minus big</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Value</td>
              <td className="px-5 py-2">P/B sorted portfolios</td>
              <td className="px-5 py-2">High minus low book-to-market</td>
            </tr>
            <tr>
              <td className="px-5 py-2">Momentum</td>
              <td className="px-5 py-2">12-1 month returns</td>
              <td className="px-5 py-2">Winners minus losers</td>
            </tr>
          </tbody>
        </table>
      </div>

      <BlockMath math="r_{i,t} = \alpha_i + \beta_i^{mkt} r_{mkt,t} + \beta_i^{sec} r_{sec,t} + \beta_i^{smb} r_{smb,t} + \epsilon_{i,t}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The residuals <InlineMath math="\epsilon_{i,t}" /> are modeled as OU processes. We trade
        stocks whose residuals deviate significantly from zero, going long undervalued stocks
        (negative residuals) and short overvalued ones (positive residuals).
      </p>

      <ExampleBlock
        title="Stat Arb Portfolio Construction"
        difficulty="advanced"
        problem="You have 5 NSE IT stocks with the following cointegrating vector from Johansen analysis: [0.35, 0.28, -0.22, -0.18, -0.23]. Capital is INR 1 crore. Compute the notional allocation and verify market neutrality."
        solution={[
          {
            step: 'Verify weight sum approaches zero',
            formula: '\\sum w_i = 0.35 + 0.28 - 0.22 - 0.18 - 0.23 = 0.00',
            explanation: 'The weights sum to zero, confirming the portfolio is dollar-neutral.',
          },
          {
            step: 'Compute long and short legs',
            formula: '\\text{Long} = 0.35 + 0.28 = 0.63, \\quad \\text{Short} = 0.22 + 0.18 + 0.23 = 0.63',
            explanation: 'The long and short exposures are balanced at 63% each.',
          },
          {
            step: 'Allocate capital',
            formula: '\\text{TCS notional} = 0.35 \\times 1,00,00,000 = \\text{INR } 35,00,000',
            explanation: 'Each stock gets its proportional capital allocation. For TCS at INR 3,800 with lot size 175, this means approximately 5 lots.',
          },
        ]}
      />

      <NoteBlock title="Risk Management for Stat Arb" type="warning">
        <p>
          Stat arb strategies can suffer from <strong>factor crowding</strong> -- when too many quant
          funds trade similar signals, leading to simultaneous unwinding during stress (as in the
          August 2007 quant meltdown). In the Indian context, SEBI's position limits and lower
          institutional crowding reduce this risk compared to US markets, but the lower liquidity
          in mid-cap NSE stocks can amplify slippage. Always implement: (1) position limits per
          stock, (2) portfolio-level stop losses, (3) factor exposure monitoring, and (4) drawdown
          circuit breakers.
        </p>
      </NoteBlock>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Practical Considerations for NSE
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Implementing stat arb on the NSE requires attention to several India-specific factors:
        (1) F&O lot size constraints force discrete position sizing, (2) STT on futures is lower
        than on delivery equity, making F&O the preferred execution vehicle, (3) monthly expiry
        rollover introduces basis risk, (4) SEBI's margin framework (SPAN + exposure margin)
        determines capital efficiency, and (5) corporate actions (dividends, bonuses, splits)
        require adjustment of the cointegrating relationship.
      </p>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Statistical arbitrage extends pairs trading to multi-asset baskets using Johansen
          cointegration or PCA-based eigenportfolios. The key advantage is diversification across
          multiple mean-reverting spreads, reducing the risk of any single pair breaking down.
          For NSE implementation, use the F&O segment for efficient execution and ensure the
          basket remains market-neutral after accounting for lot size constraints.
        </p>
      </NoteBlock>
    </div>
  )
}
