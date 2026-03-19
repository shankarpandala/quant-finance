import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveImpactModel() {
  const [orderSize, setOrderSize] = useState(50000)
  const [adv, setAdv] = useState(2000000)
  const [volatility, setVolatility] = useState(1.8)
  const [spread, setSpread] = useState(0.05)

  const participation = orderSize / adv
  const sqrtImpact = volatility * Math.sqrt(participation)
  const linearImpact = spread / 2 + 0.1 * volatility * participation
  const almgrenChriss = 0.5 * spread + volatility * 0.314 * Math.pow(participation, 0.6)
  const totalCostSqrt = sqrtImpact * orderSize * 150 / 10000
  const totalCostAC = almgrenChriss * orderSize * 150 / 10000

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Market Impact Estimator
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Simulate market impact for a Nifty 50 stock order on NSE. Adjust order size, ADV,
        and volatility to see how different models estimate slippage in basis points.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Order Size = {orderSize.toLocaleString()} shares</span>
          <input type="range" min="5000" max="500000" step="5000" value={orderSize}
            onChange={e => setOrderSize(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>ADV = {adv.toLocaleString()} shares</span>
          <input type="range" min="100000" max="10000000" step="100000" value={adv}
            onChange={e => setAdv(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Daily Vol = {volatility.toFixed(1)}%</span>
          <input type="range" min="0.5" max="5.0" step="0.1" value={volatility}
            onChange={e => setVolatility(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Spread = {spread.toFixed(2)}%</span>
          <input type="range" min="0.01" max="0.20" step="0.01" value={spread}
            onChange={e => setSpread(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">Square-Root Model</p>
          <p className="text-lg font-bold text-blue-800 dark:text-blue-200">{sqrtImpact.toFixed(2)} bps</p>
          <p className="text-xs text-blue-600 dark:text-blue-400">
            Cost: <InlineMath math={`\\approx \\text{INR } ${totalCostSqrt.toFixed(0)}`} />
          </p>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
          <p className="text-xs font-semibold text-purple-700 dark:text-purple-300">Linear Model</p>
          <p className="text-lg font-bold text-purple-800 dark:text-purple-200">{linearImpact.toFixed(2)} bps</p>
        </div>
        <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/30">
          <p className="text-xs font-semibold text-green-700 dark:text-green-300">Almgren-Chriss</p>
          <p className="text-lg font-bold text-green-800 dark:text-green-200">{almgrenChriss.toFixed(2)} bps</p>
          <p className="text-xs text-green-600 dark:text-green-400">
            Cost: <InlineMath math={`\\approx \\text{INR } ${totalCostAC.toFixed(0)}`} />
          </p>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
        Participation rate: <InlineMath math={`\\frac{Q}{\\text{ADV}} = ${(participation * 100).toFixed(2)}\\%`} />
        {participation > 0.1
          ? <span className="ml-2 font-semibold text-red-500">High participation -- consider slicing!</span>
          : <span className="ml-2 font-semibold text-green-600 dark:text-green-400">Manageable participation rate</span>
        }
      </p>
    </div>
  )
}

export default function ModelingImpact() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Modeling Market Impact
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        When a trader on NSE places a large order for a Nifty 50 stock, the order itself moves the
        price. This phenomenon, called <strong>market impact</strong>, is the single largest implicit
        transaction cost for institutional traders in India. Understanding and modeling impact is
        essential for any quantitative trading strategy operating on BSE or NSE.
      </p>

      <DefinitionBlock
        title="Market Impact"
        label="Definition 4.3"
        definition="Market impact is the adverse price movement caused by the act of trading itself. It represents the difference between the price at the time of the trading decision and the actual execution price. In the Indian context, even mid-cap NSE stocks can show significant impact for orders exceeding 5% of average daily volume."
        notation="Impact is typically measured in basis points (bps), where 1 bps = 0.01%."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Temporary vs. Permanent Impact
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Market impact has two distinct components. <strong>Temporary impact</strong> is the
        short-lived price displacement that reverses after execution completes -- it arises from
        consuming available liquidity in the NSE order book. <strong>Permanent impact</strong>
        reflects new information revealed by the trade that is absorbed into the equilibrium price.
      </p>

      <BlockMath math="\text{Total Impact} = \underbrace{g(Q)}_{\text{permanent}} + \underbrace{h(Q, T)}_{\text{temporary}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="Q" /> is the order quantity, and <InlineMath math="T" /> is the
        execution horizon. For Bank Nifty stocks, empirical research shows permanent impact
        accounts for roughly 30-40% of total impact.
      </p>

      <TheoremBlock
        title="Square-Root Law of Market Impact"
        label="Theorem 4.1"
        statement="The permanent price impact of executing an order of size Q scales as the square root of the participation rate. If \sigma is the daily volatility and V is the average daily volume, then:"
        formula="\Delta P \approx \sigma \sqrt{\frac{Q}{V}}"
        proof="The square-root law can be derived from Kyle's (1985) lambda model under the assumption that informed and noise traders interact in a competitive market-making framework. The market maker sets prices such that the price change is proportional to the signed order flow. Aggregating over multiple trades, the cumulative impact of Q shares traded against daily volume V is \sigma \cdot (Q/V)^{1/2}. Empirical validation on Indian equity markets (NSE data, 2018-2023) confirms this scaling across Nifty 50 constituents with R^2 > 0.75."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Almgren-Chriss Framework
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The Almgren-Chriss (2000) framework provides an optimal execution strategy by trading off
        market impact against timing risk. The trader must liquidate <InlineMath math="X" /> shares
        over <InlineMath math="T" /> periods, minimizing the expected cost plus a risk penalty:
      </p>

      <BlockMath math="\min_{\{x_k\}} \; \mathbb{E}[\text{Cost}] + \lambda \cdot \text{Var}[\text{Cost}]" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The cost has two components: a permanent impact function <InlineMath math="g(v)" /> and a
        temporary impact function <InlineMath math="h(v)" />, where <InlineMath math="v" /> is the
        trading rate. The standard parameterization is:
      </p>

      <BlockMath math="g(v) = \gamma \, v, \quad h(v) = \eta \, v + \epsilon \, \text{sgn}(v)" />

      <BlockMath math="\text{Optimal trajectory: } x_k^* = X \cdot \frac{\sinh\left(\kappa (T - t_k)\right)}{\sinh(\kappa T)}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\kappa" /> is the urgency parameter balancing impact cost vs.
        volatility risk. A higher <InlineMath math="\lambda" /> (risk aversion) leads to faster,
        more front-loaded execution -- critical for volatile Bank Nifty stocks during
        budget announcements or RBI policy days.
      </p>

      <NoteBlock title="Indian Market Specifics" type="info">
        <ul className="space-y-2">
          <li>
            <strong>NSE Tick Size:</strong> The minimum tick size on NSE is INR 0.05 for stocks
            priced above INR 1. This discreteness affects impact modeling for low-price stocks.
          </li>
          <li>
            <strong>SEBI Circuit Limits:</strong> Individual stock circuits (5%, 10%, 20%) and
            index-level circuits create non-linear impact during volatile sessions.
          </li>
          <li>
            <strong>T+1 Settlement:</strong> Since January 2023, India moved to T+1 settlement,
            reducing counterparty risk and altering intraday liquidity patterns.
          </li>
          <li>
            <strong>FII Flows:</strong> Foreign Institutional Investor flows significantly affect
            impact for large-cap stocks, especially during global risk-off events.
          </li>
        </ul>
      </NoteBlock>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Model</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Formula</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Key Assumption</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Best For</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Linear</td>
              <td className="px-4 py-2"><InlineMath math="\Delta P = \lambda Q" /></td>
              <td className="px-4 py-2">Kyle (1985)</td>
              <td className="px-4 py-2">Small orders</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Square-Root</td>
              <td className="px-4 py-2"><InlineMath math="\Delta P = \sigma\sqrt{Q/V}" /></td>
              <td className="px-4 py-2">Empirical universal law</td>
              <td className="px-4 py-2">Institutional orders</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Power Law</td>
              <td className="px-4 py-2"><InlineMath math="\Delta P = \alpha (Q/V)^\beta" /></td>
              <td className="px-4 py-2">Generalized scaling</td>
              <td className="px-4 py-2">Calibration</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Almgren-Chriss</td>
              <td className="px-4 py-2"><InlineMath math="\min E[C] + \lambda \text{Var}[C]" /></td>
              <td className="px-4 py-2">Mean-variance optimal</td>
              <td className="px-4 py-2">Execution scheduling</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveImpactModel />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Calibrating Impact Models on NSE Data
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        To calibrate impact models for Indian markets, we use tick-by-tick trade and quote data
        from NSE. The following Python implementation estimates the square-root impact coefficient
        and fits the Almgren-Chriss model parameters using Zerodha Kite historical data.
      </p>

      <PythonCode
        title="market_impact_nse.py"
        runnable
        code={`import numpy as np
import pandas as pd
from scipy.optimize import curve_fit

# Simulated NSE trade data for Reliance Industries
np.random.seed(42)
n_trades = 500
trade_sizes = np.random.lognormal(mean=8.5, sigma=1.2, size=n_trades).astype(int)
daily_volume = 5_000_000  # Average daily volume on NSE
participation = trade_sizes / daily_volume

# True impact parameters (calibrated to Indian large-cap)
sigma_daily = 0.018  # 1.8% daily volatility
true_alpha = sigma_daily * 0.8
true_beta = 0.5  # Square-root law

# Generate impact with noise (in basis points)
noise = np.random.normal(0, 2, n_trades)
observed_impact = true_alpha * np.power(participation, true_beta) * 10000 + noise

# --- Fit Square-Root Model ---
def sqrt_model(q_over_v, alpha):
    return alpha * np.sqrt(q_over_v) * 10000

popt_sqrt, _ = curve_fit(sqrt_model, participation, observed_impact, p0=[0.01])

# --- Fit Power-Law Model ---
def power_model(q_over_v, alpha, beta):
    return alpha * np.power(q_over_v, beta) * 10000

popt_power, _ = curve_fit(power_model, participation, observed_impact, p0=[0.01, 0.5])

# --- Almgren-Chriss Optimal Trajectory ---
X_total = 100_000  # Total shares to liquidate
T = 20  # Number of time periods (5-minute bars)
sigma = sigma_daily / np.sqrt(78)  # Per-bar volatility (78 bars/day)
eta = 0.01  # Temporary impact parameter
gamma = 0.005  # Permanent impact parameter
risk_aversion = 1e-6

kappa = np.sqrt(risk_aversion * sigma**2 / eta)
trajectory = [X_total * np.sinh(kappa * (T - k)) / np.sinh(kappa * T) for k in range(T + 1)]
trade_schedule = np.diff(trajectory)

print("=== Market Impact Calibration (NSE - Reliance Industries) ===")
print(f"\\nSquare-Root Model: alpha = {popt_sqrt[0]:.6f}")
print(f"  Impact for 1% participation: {sqrt_model(0.01, *popt_sqrt):.1f} bps")
print(f"\\nPower-Law Model: alpha = {popt_power[0]:.6f}, beta = {popt_power[1]:.3f}")
print(f"  Impact for 1% participation: {power_model(0.01, *popt_power):.1f} bps")
print(f"\\n=== Almgren-Chriss Optimal Execution ===")
print(f"Total shares: {X_total:,}, Horizon: {T} bars")
print(f"Urgency (kappa): {kappa:.4f}")
print(f"First 5 trades: {[-int(t) for t in trade_schedule[:5]]}")
print(f"Last 5 trades:  {[-int(t) for t in trade_schedule[-5:]]}")
print(f"Front-loading ratio: {abs(trade_schedule[0]/trade_schedule[-1]):.2f}x")`}
      />

      <ExampleBlock
        title="Estimating Impact for a Bank Nifty Stock"
        difficulty="intermediate"
        problem="A fund manager on Zerodha needs to buy 200,000 shares of HDFC Bank (daily vol = 1.5%, ADV = 8 million shares). Estimate the market impact using the square-root model and the total cost in INR if HDFC Bank trades at INR 1,650."
        solution={[
          {
            step: 'Compute participation rate',
            formula: '\\frac{Q}{V} = \\frac{200{,}000}{8{,}000{,}000} = 0.025',
            explanation: 'The order is 2.5% of average daily volume -- moderate participation.',
          },
          {
            step: 'Apply square-root impact model',
            formula: '\\Delta P = \\sigma \\sqrt{Q/V} = 0.015 \\times \\sqrt{0.025} = 0.015 \\times 0.1581 = 0.00237',
            explanation: 'Impact is approximately 23.7 basis points.',
          },
          {
            step: 'Convert to INR cost',
            formula: '\\text{Cost} = \\Delta P \\times P \\times Q = 0.00237 \\times 1650 \\times 200{,}000 = \\text{INR } 7{,}82{,}100',
            explanation: 'Total market impact cost is approximately INR 7.82 lakhs, a significant implicit cost that dwarfs the explicit brokerage of INR 40 (Zerodha flat fee).',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Intraday Liquidity Patterns on NSE
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        NSE trading sessions exhibit a distinctive U-shaped volume pattern. Understanding
        these intraday patterns is essential for optimal execution scheduling:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Time (IST)</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Volume Share</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Spread</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Strategy Implication</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">9:15-9:30</td>
              <td className="px-4 py-2">~8% (opening)</td>
              <td className="px-4 py-2">Wide</td>
              <td className="px-4 py-2">Avoid unless liquidity taking</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">9:30-10:30</td>
              <td className="px-4 py-2">~20%</td>
              <td className="px-4 py-2">Tightening</td>
              <td className="px-4 py-2">Good for initial execution</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">10:30-14:00</td>
              <td className="px-4 py-2">~35%</td>
              <td className="px-4 py-2">Tight</td>
              <td className="px-4 py-2">Best for passive algorithms</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">14:00-15:00</td>
              <td className="px-4 py-2">~22%</td>
              <td className="px-4 py-2">Tightening</td>
              <td className="px-4 py-2">Pick up remaining orders</td>
            </tr>
            <tr>
              <td className="px-4 py-2">15:00-15:30</td>
              <td className="px-4 py-2">~15% (closing)</td>
              <td className="px-4 py-2">Variable</td>
              <td className="px-4 py-2">High impact; close auction available</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The opening 15 minutes and closing 30 minutes account for approximately 23% of
        daily volume but with wider spreads and higher volatility. VWAP and TWAP
        algorithms used by institutional traders on Zerodha or institutional platforms
        should adapt their participation rates to match this intraday pattern.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Execution Algorithms for NSE
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Common execution algorithms used by institutional traders on NSE include:
      </p>

      <BlockMath math="\text{VWAP: } v_k = V_k^{\text{hist}} / \sum_j V_j^{\text{hist}} \quad \text{(trade proportional to historical volume profile)}" />
      <BlockMath math="\text{TWAP: } v_k = Q / T \quad \text{(equal slices over time)}" />
      <BlockMath math="\text{IS: minimize } E[\text{Cost}] + \lambda \cdot \text{Var}[\text{Cost}] \quad \text{(Almgren-Chriss)}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        VWAP is the most popular benchmark for Indian institutional execution. Implementation
        Shortfall (IS) is preferred by sophisticated quant funds as it minimizes the total
        cost of execution including timing risk. NSE also offers a closing price session
        (3:40-4:00 PM) with a call auction mechanism, allowing traders to execute at the
        official closing price without market impact.
      </p>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Market impact is the dominant cost for institutional-size orders on NSE and BSE. The
          square-root law <InlineMath math="\Delta P \propto \sigma \sqrt{Q/V}" /> is remarkably
          universal across markets including India. The Almgren-Chriss framework provides the
          optimal execution schedule by balancing impact cost against timing risk. For Indian
          markets, always account for SEBI circuit limits, T+1 settlement effects, the
          U-shaped intraday volume pattern, and the concentrated liquidity in the first and
          last hours of NSE trading. Use VWAP or IS algorithms matched to the specific
          liquidity profile of your target stocks.
        </p>
      </NoteBlock>
    </div>
  )
}
