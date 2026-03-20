import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveMarketMaker() {
  const [midPrice, setMidPrice] = useState(22000)
  const [gamma, setGamma] = useState(0.1)
  const [sigma, setSigma] = useState(0.015)
  const [inventory, setInventory] = useState(0)
  const [kappa, setKappa] = useState(1.5)

  const T = 1.0
  const t = 0.5
  const tau = T - t

  const reservationPrice = midPrice - gamma * sigma * sigma * inventory * tau
  const optimalSpread = gamma * sigma * sigma * tau + (2 / gamma) * Math.log(1 + gamma / kappa)
  const bidPrice = reservationPrice - optimalSpread / 2
  const askPrice = reservationPrice + optimalSpread / 2

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Avellaneda-Stoikov Market Maker
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust parameters to see how the optimal bid/ask quotes adapt to inventory and risk aversion.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Mid Price: {midPrice}</span>
          <input type="range" min="20000" max="24000" step="100" value={midPrice}
            onChange={e => setMidPrice(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Risk Aversion (gamma): {gamma.toFixed(2)}</span>
          <input type="range" min="0.01" max="0.5" step="0.01" value={gamma}
            onChange={e => setGamma(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Volatility (sigma): {(sigma * 100).toFixed(1)}%</span>
          <input type="range" min="0.005" max="0.03" step="0.001" value={sigma}
            onChange={e => setSigma(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Inventory: {inventory} lots</span>
          <input type="range" min="-10" max="10" step="1" value={inventory}
            onChange={e => setInventory(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 500 120" className="w-full max-w-xl mx-auto block">
        <line x1="50" y1="60" x2="450" y2="60" stroke="#e5e7eb" strokeWidth="2" />
        {/* Mid price */}
        <circle cx="250" cy="60" r="6" fill="#6366f1" />
        <text x="250" y="90" textAnchor="middle" className="text-[10px]" fill="#6366f1">Mid: {midPrice}</text>
        {/* Reservation price */}
        <circle cx={250 + (reservationPrice - midPrice) * 0.5} cy="60" r="5" fill="#f59e0b" />
        <text x={250 + (reservationPrice - midPrice) * 0.5} y="45" textAnchor="middle" className="text-[9px]" fill="#f59e0b">
          Rsv: {reservationPrice.toFixed(0)}
        </text>
        {/* Bid */}
        <rect x={250 + (bidPrice - midPrice) * 0.5 - 20} y="52" width="40" height="16" rx="3" fill="#22c55e" opacity="0.3" />
        <text x={250 + (bidPrice - midPrice) * 0.5} y="64" textAnchor="middle" className="text-[9px] font-bold" fill="#16a34a">
          Bid: {bidPrice.toFixed(0)}
        </text>
        {/* Ask */}
        <rect x={250 + (askPrice - midPrice) * 0.5 - 20} y="52" width="40" height="16" rx="3" fill="#ef4444" opacity="0.3" />
        <text x={250 + (askPrice - midPrice) * 0.5} y="64" textAnchor="middle" className="text-[9px] font-bold" fill="#dc2626">
          Ask: {askPrice.toFixed(0)}
        </text>
        <text x="250" y="115" textAnchor="middle" className="text-[10px]" fill="#6b7280">
          Spread: {optimalSpread.toFixed(1)} pts | Inventory skew: {(reservationPrice - midPrice).toFixed(1)} pts
        </text>
      </svg>

      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        {inventory > 0
          ? <span className="text-amber-600">Long inventory: quotes skew lower to encourage selling</span>
          : inventory < 0
          ? <span className="text-amber-600">Short inventory: quotes skew higher to encourage buying</span>
          : <span className="text-green-600">Flat inventory: symmetric quotes around mid price</span>
        }
      </p>
    </div>
  )
}

export default function MarketMakingBasics() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Market Making: Bid-Ask Quoting and Avellaneda-Stoikov
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Market making is the art of continuously providing liquidity by quoting bid and ask prices.
        The market maker profits from the bid-ask spread while managing inventory risk. On the NSE,
        market making plays a crucial role in providing liquidity for derivatives and less-liquid
        securities. SEBI's market-making framework incentivizes designated market makers (DMMs)
        with reduced transaction costs and margin benefits.
      </p>

      <DefinitionBlock
        title="Market Making"
        label="Definition 5.7"
        definition="A market maker is a firm or trader that continuously quotes both bid (buy) and ask (sell) prices for a financial instrument, profiting from the bid-ask spread. The market maker provides liquidity by being willing to trade on either side, bearing inventory risk in exchange for the spread."
        notation={<>The quoted spread is <InlineMath math="\delta = P_{ask} - P_{bid}" />. The market maker's instantaneous P&L per round-trip is <InlineMath math="\delta - \text{costs}" />.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Avellaneda-Stoikov Model
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The seminal Avellaneda-Stoikov (2008) model provides the optimal quoting strategy for a
        risk-averse market maker. The mid price follows a Brownian motion:
      </p>

      <BlockMath math="dS_t = \sigma\,dW_t" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The market maker's objective is to maximize expected terminal utility of wealth:
      </p>

      <BlockMath math="\max_{\delta^b, \delta^a} \mathbb{E}\left[-e^{-\gamma(X_T + q_T S_T)}\right]" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="X_T" /> is cash, <InlineMath math="q_T" /> is inventory,
        <InlineMath math="\gamma" /> is risk aversion, and <InlineMath math="\delta^b, \delta^a" /> are the
        bid/ask distances from mid price.
      </p>

      <TheoremBlock
        title="Avellaneda-Stoikov Optimal Quotes"
        label="Theorem 5.7"
        statement={<>The optimal reservation price and spread for a market maker with CARA utility are:
          <BlockMath math="r(s, q, t) = s - q\gamma\sigma^2(T-t)" />
          <BlockMath math="\delta^* = \gamma\sigma^2(T-t) + \frac{2}{\gamma}\ln\left(1 + \frac{\gamma}{\kappa}\right)" />
          where <InlineMath math="s" /> is the mid price, <InlineMath math="q" /> is inventory, <InlineMath math="\gamma" /> is risk aversion, <InlineMath math="\sigma" /> is volatility, <InlineMath math="\kappa" /> is the order arrival intensity parameter, and <InlineMath math="T-t" /> is time remaining. The optimal bid and ask are placed symmetrically around the reservation price with spread <InlineMath math="\delta^*" />.</>}
        proof={<>The proof uses dynamic programming. The market maker's value function <InlineMath math="V(t,x,q,s) = -e^{-\gamma(x + qs - q^2\gamma\sigma^2(T-t)/2 + \theta(T-t))}" /> satisfies the HJB equation with jump terms for order arrivals. Order arrivals on each side follow Poisson processes with intensities <InlineMath math="\Lambda^a(\delta^a) = Ae^{-\kappa\delta^a}" /> and <InlineMath math="\Lambda^b(\delta^b) = Ae^{-\kappa\delta^b}" />. Optimizing the HJB equation over <InlineMath math="\delta^b" /> and <InlineMath math="\delta^a" /> yields the stated results.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Key Components of the Optimal Strategy
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The Avellaneda-Stoikov model reveals two key insights:
      </p>

      <BlockMath math="\text{Reservation price: } r = s - q\gamma\sigma^2\tau" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The reservation price shifts <em>away</em> from inventory. If long (<InlineMath math="q > 0" />),
        the reservation price is below mid, encouraging selling. The shift magnitude scales with
        risk aversion <InlineMath math="\gamma" />, volatility squared <InlineMath math="\sigma^2" />,
        and time remaining <InlineMath math="\tau" />.
      </p>

      <BlockMath math="\text{Optimal spread: } \delta^* = \underbrace{\gamma\sigma^2\tau}_{\text{inventory risk}} + \underbrace{\frac{2}{\gamma}\ln\left(1+\frac{\gamma}{\kappa}\right)}_{\text{adverse selection}}" />

      <InteractiveMarketMaker />

      <PythonCode
        title="market_maker_nse.py"
        runnable
        code={`import numpy as np

# Avellaneda-Stoikov Market Making Simulation on NSE
np.random.seed(42)

# NSE Nifty 50 Futures Market Making Parameters
initial_mid = 22000    # Nifty mid price
sigma = 0.012          # Per-step volatility
gamma = 0.1            # Risk aversion
kappa = 1.5            # Order arrival decay
T = 1.0                # Trading session (normalized)
n_steps = 1000         # Steps per session
dt = T / n_steps
lot_size = 25          # Nifty futures lot size

# Simulation
mid_prices = np.zeros(n_steps)
inventory = np.zeros(n_steps)
cash = np.zeros(n_steps)
pnl = np.zeros(n_steps)
bid_prices = np.zeros(n_steps)
ask_prices = np.zeros(n_steps)

mid_prices[0] = initial_mid

for t in range(1, n_steps):
    # Mid price evolution (GBM)
    mid_prices[t] = mid_prices[t-1] + sigma * mid_prices[t-1] * np.random.randn() * np.sqrt(dt)
    tau = T - t * dt

    # Avellaneda-Stoikov optimal quotes
    q = inventory[t-1]
    s = mid_prices[t]

    # Reservation price
    r = s - q * gamma * (sigma * s)**2 * tau

    # Optimal spread
    spread = gamma * (sigma * s)**2 * tau + (2/gamma) * np.log(1 + gamma/kappa)
    spread = max(spread, 2)  # Minimum tick size on NSE (INR 0.05 * lot)

    bid = r - spread / 2
    ask = r + spread / 2

    bid_prices[t] = bid
    ask_prices[t] = ask

    # Order arrivals (Poisson process)
    delta_b = s - bid
    delta_a = ask - s
    prob_buy = min(1, np.exp(-kappa * delta_a / s) * dt * 100)
    prob_sell = min(1, np.exp(-kappa * delta_b / s) * dt * 100)

    inventory[t] = inventory[t-1]
    cash[t] = cash[t-1]

    # Someone hits our ask (we sell)
    if np.random.rand() < prob_buy:
        cash[t] += ask * lot_size
        inventory[t] -= 1

    # Someone hits our bid (we buy)
    if np.random.rand() < prob_sell:
        cash[t] -= bid * lot_size
        inventory[t] += 1

    pnl[t] = cash[t] + inventory[t] * mid_prices[t] * lot_size

# Performance analysis
final_pnl = pnl[-1]
max_inventory = np.max(np.abs(inventory))
n_trades = np.sum(np.abs(np.diff(inventory)))
avg_spread = np.mean(ask_prices[1:] - bid_prices[1:])

print("=== Avellaneda-Stoikov Market Maker: Nifty Futures ===")
print(f"{'Metric':<25} {'Value':<15}")
print(f"{'Final P&L':<25} INR {final_pnl:>12,.0f}")
print(f"{'Total trades':<25} {n_trades:>12.0f}")
print(f"{'P&L per trade':<25} INR {final_pnl/max(n_trades,1):>12,.0f}")
print(f"{'Max inventory':<25} {max_inventory:>12.0f} lots")
print(f"{'Final inventory':<25} {inventory[-1]:>12.0f} lots")
print(f"{'Avg quoted spread':<25} {avg_spread:>12.1f} pts")
print(f"{'Avg spread (bps)':<25} {avg_spread/np.mean(mid_prices)*10000:>12.1f} bps")

# NSE cost analysis
stt = n_trades * 0.0125/100 * lot_size * np.mean(mid_prices)
brokerage = n_trades * 20
exchange_fee = n_trades * lot_size * np.mean(mid_prices) * 0.0019/100
total_costs = stt + brokerage + exchange_fee

print(f"\\n=== NSE Transaction Costs ===")
print(f"STT:              INR {stt:,.0f}")
print(f"Brokerage:        INR {brokerage:,.0f}")
print(f"Exchange fees:    INR {exchange_fee:,.0f}")
print(f"Total costs:      INR {total_costs:,.0f}")
print(f"Net P&L:          INR {final_pnl - total_costs:,.0f}")

# Inventory risk metrics
print(f"\\n=== Inventory Risk Metrics ===")
print(f"Avg inventory:    {np.mean(np.abs(inventory)):.1f} lots")
print(f"Inventory std:    {np.std(inventory):.1f} lots")
print(f"Max drawdown:     INR {np.min(pnl - np.maximum.accumulate(pnl)):,.0f}")
print(f"Sharpe (per step): {np.mean(np.diff(pnl))/np.std(np.diff(pnl)):.3f}")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        NSE Market Making Framework
      </h3>
      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Aspect</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">NSE Specification</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Tick size (Nifty futures)</td>
              <td className="px-5 py-2">0.05 points</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Order types</td>
              <td className="px-5 py-2">Limit, market, stop-loss, IOC, day</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">DMM obligations</td>
              <td className="px-5 py-2">Minimum 75% presence, max spread obligations</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">DMM incentives</td>
              <td className="px-5 py-2">Reduced transaction charges, margin relaxation</td>
            </tr>
            <tr>
              <td className="px-5 py-2">SEBI regulation</td>
              <td className="px-5 py-2">Circular SEBI/HO/MRD/2017 on market making</td>
            </tr>
          </tbody>
        </table>
      </div>

      <ExampleBlock
        title="Optimal Quote Calculation"
        difficulty="intermediate"
        problem={<>A market maker for Nifty futures has: mid price <InlineMath math="S = 22{,}000" />, inventory <InlineMath math="q = 3" /> lots (long), risk aversion <InlineMath math="\gamma = 0.1" />, volatility <InlineMath math="\sigma = 1.2\%" />, order arrival <InlineMath math="\kappa = 1.5" />, and time remaining <InlineMath math="\tau = 0.5" />. Compute optimal bid and ask.</>}
        solution={[
          {
            step: 'Compute reservation price',
            formula: 'r = 22000 - 3 \\times 0.1 \\times (0.012 \\times 22000)^2 \\times 0.5 = 22000 - 10.45 = 21989.55',
            explanation: 'Long 3 lots pushes reservation price below mid to encourage selling.',
          },
          {
            step: 'Compute optimal spread',
            formula: '\\delta^* = 0.1 \\times (0.012 \\times 22000)^2 \\times 0.5 + \\frac{2}{0.1}\\ln(1 + 0.1/1.5) = 3.48 + 1.29 = 4.78',
            explanation: 'Spread has inventory risk and adverse selection components.',
          },
          {
            step: 'Compute bid and ask',
            formula: '\\text{Bid} = 21989.55 - 2.39 = 21987.16, \\quad \\text{Ask} = 21989.55 + 2.39 = 21991.94',
            explanation: 'Quotes are placed symmetrically around the reservation price (not the mid price).',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Market making on the NSE requires balancing spread income against inventory risk.
          The Avellaneda-Stoikov model provides the theoretical foundation: skew quotes away
          from inventory and widen spreads in volatile markets. SEBI's designated market maker
          (DMM) framework offers incentives but imposes presence and spread obligations.
          Successful market making requires fast execution, accurate volatility estimation,
          and robust inventory management.
        </p>
      </NoteBlock>
    </div>
  )
}
