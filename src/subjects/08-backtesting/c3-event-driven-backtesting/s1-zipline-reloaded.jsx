import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveEventDriven() {
  const [eventType, setEventType] = useState('market_open')
  const [latency, setLatency] = useState(5)
  const [fillModel, setFillModel] = useState('next_bar')

  const events = [
    { type: 'market_open', time: '09:15', desc: 'NSE opens, pre-market data available' },
    { type: 'data_bar', time: '09:16', desc: 'First 1-min candle received' },
    { type: 'signal', time: '09:16+' + latency + 'ms', desc: 'Strategy computes signal' },
    { type: 'order', time: '09:16+' + (latency + 2) + 'ms', desc: 'Order submitted to exchange' },
    { type: 'fill', time: fillModel === 'next_bar' ? '09:17' : '09:16+' + (latency + 50) + 'ms', desc: fillModel === 'next_bar' ? 'Fill at next bar open' : 'Fill with simulated slippage' },
  ]

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Event-Driven Execution Timeline
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Visualize the event flow in a Zipline-style backtest for NSE trading.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Processing Latency = {latency}ms</span>
          <input type="range" min="1" max="100" step="1" value={latency}
            onChange={e => setLatency(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <div className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Fill Model</span>
          <div className="flex gap-3">
            {['next_bar', 'simulated'].map(f => (
              <label key={f} className="flex items-center gap-1 text-xs">
                <input type="radio" name="fill" value={f} checked={fillModel === f}
                  onChange={() => setFillModel(f)} className="accent-indigo-500" />
                {f === 'next_bar' ? 'Next Bar Open' : 'Simulated Fill'}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {events.map((ev, i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-2 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
              {i + 1}
            </div>
            <div className="flex-1">
              <div className="text-xs font-bold text-gray-800 dark:text-gray-200">{ev.type}</div>
              <div className="text-[10px] text-gray-500">{ev.desc}</div>
            </div>
            <div className="text-xs font-mono text-gray-600 dark:text-gray-400">{ev.time}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ZiplineReloaded() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Event-Driven Backtesting with Zipline
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Event-driven backtesting processes market data one event at a time, closely mimicking live
        trading execution. Zipline-reloaded (the maintained fork of Quantopian's Zipline) provides
        a robust framework with realistic order management, slippage modeling, and commission
        tracking. While slower than vectorized methods, it handles complex strategies that require
        path-dependent logic.
      </p>

      <DefinitionBlock
        title="Event-Driven Backtesting"
        label="Definition 8.7"
        definition="Event-driven backtesting processes a stream of events (market data updates, order fills, timer events) sequentially. At each event, the strategy logic executes with only the information available at that point in time, preventing look-ahead bias by construction."
        notation="\text{for each event } e_t: \quad \text{state}_{t+1} = f(\text{state}_t, e_t)"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Zipline Architecture
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Component</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Function</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">NSE Adaptation</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">initialize()</td>
              <td className="px-4 py-2">One-time setup</td>
              <td className="px-4 py-2">Set universe, params, commission</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">handle_data()</td>
              <td className="px-4 py-2">Called each bar</td>
              <td className="px-4 py-2">Process Nifty bar, generate signals</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">before_trading_start()</td>
              <td className="px-4 py-2">Pre-market logic</td>
              <td className="px-4 py-2">Check NSE pre-open data</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Slippage/Commission</td>
              <td className="px-4 py-2">Execution modeling</td>
              <td className="px-4 py-2">NSE lot sizes, STT, Zerodha fees</td>
            </tr>
          </tbody>
        </table>
      </div>

      <TheoremBlock
        title="Event-Driven vs Vectorized Equivalence"
        label="Theorem 8.6"
        statement="For strategies that depend only on past prices and have fixed position sizing (no path-dependent logic), the event-driven and vectorized backtests produce identical P&L trajectories, up to floating-point precision. The event-driven framework adds overhead but guarantees causality."
        proof="Both approaches compute positions as a function of the same historical data and apply the same P&L formula: pnl_t = w_{t-1} \cdot r_t. The event-driven framework evaluates w_{t-1} = f(data_1, ..., data_{t-1}) explicitly at each t, while the vectorized approach computes the entire w array in one pass. Since f is deterministic and the data is identical, the outputs match."
      />

      <InteractiveEventDriven />

      <PythonCode
        title="zipline_nifty_strategy.py"
        runnable
        code={`import numpy as np

# Simulated Zipline-style event-driven backtest
# (Using pure Python to demonstrate the pattern without Zipline dependency)

class SimulatedExchange:
    """Mimics Zipline's execution engine for NSE."""
    def __init__(self, prices, lot_size=75, commission=20, slippage_bps=2):
        self.prices = prices
        self.lot_size = lot_size
        self.commission = commission
        self.slippage_bps = slippage_bps

    def fill_order(self, day, quantity):
        """Simulate order fill with slippage."""
        price = self.prices[day]
        slip = price * self.slippage_bps / 10000 * np.sign(quantity)
        fill_price = price + slip
        cost = abs(quantity) * self.commission / self.lot_size
        return fill_price, cost

class ZiplineStyleBacktest:
    """Event-driven backtest mimicking Zipline's API."""

    def __init__(self, prices, strategy_func, **kwargs):
        self.prices = prices
        self.strategy = strategy_func
        self.exchange = SimulatedExchange(prices, **kwargs)
        self.n_days = len(prices)

        # State
        self.position = 0
        self.cash = 1000000  # INR 10 lakh
        self.equity_curve = []
        self.trades = []

    def run(self):
        context = {'position': 0, 'history': [], 'params': {}}
        self.strategy('initialize', context, None, None)

        for day in range(self.n_days):
            price = self.prices[day]
            context['history'].append(price)
            context['position'] = self.position
            context['day'] = day

            # Call strategy
            target = self.strategy('handle_data', context, price, day)

            # Execute orders
            if target is not None and target != self.position:
                qty_change = target - self.position
                fill_price, cost = self.exchange.fill_order(day, qty_change)

                self.cash -= qty_change * fill_price * self.exchange.lot_size
                self.cash -= cost
                self.position = target

                self.trades.append({
                    'day': day, 'price': fill_price, 'qty': qty_change,
                    'cost': cost, 'position': self.position
                })

            # Mark to market
            portfolio_value = self.cash + self.position * price * self.exchange.lot_size
            self.equity_curve.append(portfolio_value)

        return np.array(self.equity_curve)

# Define strategy (Zipline-style)
def momentum_strategy(event, context, price, day):
    if event == 'initialize':
        context['params'] = {'lookback': 20, 'threshold': 0.02}
        return None

    if event == 'handle_data':
        lookback = context['params']['lookback']
        history = context['history']

        if len(history) < lookback + 1:
            return None

        # Momentum signal
        past_price = history[-lookback - 1]
        momentum = (price - past_price) / past_price

        if momentum > context['params']['threshold']:
            return 1   # Long 1 lot
        elif momentum < -context['params']['threshold']:
            return -1  # Short 1 lot
        return context['position']  # Hold

# Generate Nifty data and run
np.random.seed(42)
n_days = 1260
nifty = 18000 * np.exp(np.cumsum(np.random.normal(0.0004, 0.012, n_days)))

bt = ZiplineStyleBacktest(nifty, momentum_strategy)
equity = bt.run()

# Performance analysis
returns = np.diff(equity) / equity[:-1]
sharpe = np.mean(returns) / np.std(returns) * np.sqrt(252)
max_dd = np.min(equity / np.maximum.accumulate(equity) - 1)
total_return = (equity[-1] / equity[0] - 1) * 100

print("=== Event-Driven Backtest: Nifty Momentum ===")
print(f"Period: {n_days} trading days (~{n_days/252:.0f} years)")
print(f"Initial Capital: INR {equity[0]:,.0f}")
print(f"Final Capital:   INR {equity[-1]:,.0f}")
print(f"Total Return:    {total_return:+.1f}%")
print(f"Sharpe Ratio:    {sharpe:.2f}")
print(f"Max Drawdown:    {max_dd*100:.1f}%")
print(f"Total Trades:    {len(bt.trades)}")

# Trade log (last 10)
print(f"\\n--- Last 10 Trades ---")
print(f"{'Day':>5} {'Price':>10} {'Qty':>6} {'Cost':>8} {'Position':>10}")
for t in bt.trades[-10:]:
    print(f"{t['day']:>5} {t['price']:>10.1f} {t['qty']:>+6} "
          f"{t['cost']:>8.1f} {t['position']:>10}")`}
      />

      <ExampleBlock
        title="Implementing NSE Commission in Zipline"
        difficulty="intermediate"
        problem="Configure realistic NSE trading costs in a Zipline backtest. Zerodha charges: INR 20 per order (or 0.03% whichever is lower for equity), STT 0.1% on buy+sell for delivery, exchange charges 0.00345%. Calculate total round-trip cost for buying and selling 1 lot of Nifty futures at 22000."
        solution={[
          {
            step: 'Brokerage (both legs)',
            formula: '2 \\times 20 = \\text{INR } 40',
          },
          {
            step: 'STT (on sell side only for futures)',
            formula: '0.0001 \\times 22000 \\times 75 = \\text{INR } 165',
          },
          {
            step: 'Exchange charges',
            formula: '0.0000345 \\times 22000 \\times 75 \\times 2 = \\text{INR } 113.85',
          },
          {
            step: 'Total round-trip cost',
            formula: '40 + 165 + 113.85 \\approx \\text{INR } 319',
            explanation: 'This is about 0.019% of notional (22000 x 75 = INR 16.5 lakh). Your backtest must deduct this from every round trip.',
          },
        ]}
      />

      <NoteBlock title="Zipline-reloaded for Indian Markets" type="tip">
        <p>
          To use Zipline with NSE data: (1) install via <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">pip install zipline-reloaded</code>,
          (2) create a custom data bundle for NSE using the csvdir ingester, (3) define a custom
          TradingCalendar for NSE holidays (XNSE), (4) implement a custom commission model
          matching Zerodha/broker fees. The zipline-tej package provides some India-specific
          adapters. For Nifty futures data, export from Zerodha Kite historical API or use
          NSE bhavcopy archives.
        </p>
      </NoteBlock>

      <NoteBlock title="When to Use Event-Driven" type="warning">
        <p>
          Use event-driven backtesting when: (1) your strategy uses stop-loss or take-profit
          orders that can trigger intraday, (2) position sizing depends on current P&L or
          drawdown, (3) you trade multiple instruments with cross-asset dependencies, (4) you
          need realistic execution simulation (partial fills, order queue), or (5) you plan to
          deploy the same code in live trading. For simple signal-based strategies, vectorized
          backtesting is faster and sufficient.
        </p>
      </NoteBlock>
    </div>
  )
}
