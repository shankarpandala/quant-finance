import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveBacktrader() {
  const [cerebro, setCerebro] = useState({
    cash: 1000000, commission: 0.0003, stake: 75, strategy: 'sma-cross'
  })
  const [fastPeriod, setFastPeriod] = useState(10)
  const [slowPeriod, setSlowPeriod] = useState(30)

  const nDays = 252
  const seed = fastPeriod * 100 + slowPeriod
  const mulberry = (a) => { return () => { let t = a += 0x6D2B79F5; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296 } }
  const rng = mulberry(seed)
  const returns = Array.from({ length: nDays }, () => (rng() - 0.498) * 0.024)
  const prices = [22000]
  for (let i = 0; i < nDays; i++) prices.push(prices[i] * (1 + returns[i]))

  const ma = (arr, period, idx) => {
    if (idx < period) return null
    return arr.slice(idx - period, idx).reduce((a, b) => a + b, 0) / period
  }

  let position = 0, pnl = 0, trades = 0
  for (let i = slowPeriod; i < nDays; i++) {
    const fast = ma(prices, fastPeriod, i)
    const slow = ma(prices, slowPeriod, i)
    const newPos = fast > slow ? 1 : -1
    if (newPos !== position) { trades++; position = newPos }
    pnl += position * (prices[i + 1] - prices[i]) * cerebro.stake
  }

  const sharpe = pnl / nDays / (Math.abs(pnl / nDays) * 15 || 1) * Math.sqrt(252)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Backtrader Cerebro Simulator
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Simulate a Backtrader SMA crossover strategy on Nifty 50.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Fast SMA = {fastPeriod}</span>
          <input type="range" min="3" max="30" step="1" value={fastPeriod}
            onChange={e => setFastPeriod(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Slow SMA = {slowPeriod}</span>
          <input type="range" min="15" max="100" step="5" value={slowPeriod}
            onChange={e => setSlowPeriod(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Net P&L</div>
          <div className={`text-lg font-bold ${pnl > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            INR {(pnl / 1000).toFixed(0)}K
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Total Trades</div>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{trades}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Lot Size</div>
          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{cerebro.stake}</div>
        </div>
      </div>
    </div>
  )
}

export default function BacktraderFramework() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Backtrader Framework
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Backtrader is a popular Python backtesting framework that offers an intuitive API,
        built-in indicators, and flexible order management. It is widely used by Indian retail
        quants and small prop desks for developing and testing strategies on Nifty, Bank Nifty,
        and individual F&O stocks available on NSE and BSE.
      </p>

      <DefinitionBlock
        title="Backtrader Cerebro"
        label="Definition 8.8"
        definition="Cerebro is the central engine of Backtrader. It orchestrates data feeds, strategies, brokers, and analyzers. A Cerebro instance is configured with initial capital, commission scheme, and strategy parameters, then executes the backtest by iterating through data bars and calling strategy methods."
        notation="\text{cerebro} = \\text{bt.Cerebro()} \\to \\text{addstrategy} \\to \\text{adddata} \\to \\text{run()}"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Backtrader vs Zipline Comparison
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Feature</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Backtrader</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Zipline</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Learning curve</td>
              <td className="px-4 py-2">Moderate</td>
              <td className="px-4 py-2">Steeper</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Built-in indicators</td>
              <td className="px-4 py-2">100+ (ta-lib)</td>
              <td className="px-4 py-2">Limited</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Order types</td>
              <td className="px-4 py-2">Market, Limit, Stop, Bracket</td>
              <td className="px-4 py-2">Market, Limit</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Live trading</td>
              <td className="px-4 py-2">IB, Zerodha (via plugins)</td>
              <td className="px-4 py-2">Limited</td>
            </tr>
            <tr>
              <td className="px-4 py-2">NSE support</td>
              <td className="px-4 py-2">CSV data, Zerodha plugin</td>
              <td className="px-4 py-2">Custom bundle needed</td>
            </tr>
          </tbody>
        </table>
      </div>

      <TheoremBlock
        title="Broker Simulation Fidelity"
        label="Theorem 8.7"
        statement="The accuracy of a backtest is bounded by the fidelity of its broker simulation. For NSE F&O strategies, the key simulation parameters are: lot size (discrete, not divisible), margin requirements (SPAN), commission structure (brokerage + STT + exchange), and settlement cycle (T+1 for F&O). Errors in any of these can bias P&L by 1-5% annually."
        proof="Each parameter contributes a systematic bias: incorrect lot sizes cause over/under-allocation, missing STT understates costs by ~0.05% per trade, ignoring margin constraints allows impossible leverage. Over 250 trading days with 50 round-trips, a 0.01% cost error per trade compounds to 0.01% x 100 legs = 1% annual bias."
      />

      <InteractiveBacktrader />

      <PythonCode
        title="backtrader_nifty.py"
        runnable
        code={`import numpy as np

# Backtrader-style implementation in pure Python
# (Demonstrates the pattern without requiring backtrader installation)

class Indicator:
    """Base class for Backtrader-style indicators."""
    pass

class SMA(Indicator):
    def __init__(self, data, period):
        self.data = data
        self.period = period
        self._cache = {}

    def __getitem__(self, idx):
        if idx < self.period - 1:
            return None
        if idx not in self._cache:
            self._cache[idx] = np.mean(self.data[idx - self.period + 1:idx + 1])
        return self._cache[idx]

class RSI(Indicator):
    def __init__(self, data, period=14):
        self.data = data
        self.period = period

    def __getitem__(self, idx):
        if idx < self.period:
            return 50  # neutral
        changes = np.diff(self.data[idx - self.period:idx + 1])
        gains = np.maximum(changes, 0)
        losses = np.maximum(-changes, 0)
        avg_gain = np.mean(gains) if len(gains) > 0 else 0
        avg_loss = np.mean(losses) if len(losses) > 0 else 0.001
        rs = avg_gain / avg_loss
        return 100 - 100 / (1 + rs)

class BacktraderStrategy:
    """Backtrader-style strategy base class."""
    def __init__(self, data, params=None):
        self.data = data
        self.params = params or {}
        self.position = 0
        self.trades = []
        self.orders = []

    def buy(self, size=1):
        self.orders.append(('BUY', size))

    def sell(self, size=1):
        self.orders.append(('SELL', size))

    def close(self):
        if self.position > 0:
            self.sell(self.position)
        elif self.position < 0:
            self.buy(abs(self.position))

class NiftyMomentumStrategy(BacktraderStrategy):
    def __init__(self, data, params=None):
        super().__init__(data, params)
        fast = self.params.get('fast', 10)
        slow = self.params.get('slow', 30)
        self.sma_fast = SMA(data, fast)
        self.sma_slow = SMA(data, slow)
        self.rsi = RSI(data, 14)

    def next(self, idx):
        fast = self.sma_fast[idx]
        slow = self.sma_slow[idx]
        rsi = self.rsi[idx]

        if fast is None or slow is None:
            return

        if fast > slow and rsi < 70 and self.position <= 0:
            if self.position < 0:
                self.close()
            self.buy(1)
        elif fast < slow and rsi > 30 and self.position >= 0:
            if self.position > 0:
                self.close()
            self.sell(1)

class Cerebro:
    """Simplified Backtrader Cerebro engine."""
    def __init__(self, cash=1000000, lot_size=75):
        self.cash = cash
        self.lot_size = lot_size
        self.commission_rate = 0.0003  # 0.03%
        self.strategies = []
        self.data = None

    def adddata(self, data):
        self.data = data

    def addstrategy(self, strategy_class, **params):
        self.strategies.append((strategy_class, params))

    def run(self):
        results = []
        for StratClass, params in self.strategies:
            strat = StratClass(self.data, params)
            equity = [self.cash]
            cash = self.cash
            position = 0

            for idx in range(len(self.data)):
                strat.orders = []
                strat.next(idx)

                for order_type, size in strat.orders:
                    price = self.data[idx]
                    if order_type == 'BUY':
                        cost = price * size * self.lot_size
                        commission = cost * self.commission_rate
                        cash -= (cost + commission)
                        position += size
                    else:
                        revenue = price * size * self.lot_size
                        commission = revenue * self.commission_rate
                        cash += (revenue - commission)
                        position -= size

                    strat.position = position
                    strat.trades.append({
                        'day': idx, 'type': order_type,
                        'price': price, 'size': size
                    })

                portfolio = cash + position * self.data[idx] * self.lot_size
                equity.append(portfolio)

            results.append({
                'equity': np.array(equity),
                'trades': strat.trades,
                'final_value': equity[-1]
            })
        return results

# Run backtest
np.random.seed(42)
nifty = 20000 * np.exp(np.cumsum(np.random.normal(0.0004, 0.012, 1260)))

cerebro = Cerebro(cash=1000000, lot_size=75)
cerebro.adddata(nifty)
cerebro.addstrategy(NiftyMomentumStrategy, fast=10, slow=30)

results = cerebro.run()
r = results[0]

equity = r['equity']
returns = np.diff(equity) / equity[:-1]
sharpe = np.mean(returns) / np.std(returns) * np.sqrt(252)
max_dd = np.min(equity / np.maximum.accumulate(equity) - 1) * 100
total_ret = (equity[-1] / equity[0] - 1) * 100

print("=== Backtrader-Style Nifty Momentum Backtest ===")
print(f"Initial: INR {equity[0]:,.0f}")
print(f"Final:   INR {equity[-1]:,.0f}")
print(f"Return:  {total_ret:+.1f}%")
print(f"Sharpe:  {sharpe:.2f}")
print(f"Max DD:  {max_dd:.1f}%")
print(f"Trades:  {len(r['trades'])}")
print(f"\\nLast 5 trades:")
for t in r['trades'][-5:]:
    print(f"  Day {t['day']:>4}: {t['type']:<4} {t['size']} lot @ {t['price']:.0f}")`}
      />

      <ExampleBlock
        title="Adding NSE Commission to Backtrader"
        difficulty="beginner"
        problem="Configure Backtrader with Zerodha's commission structure for Nifty futures: INR 20 flat per order, 0.01% exchange charges, 0.01% STT on sell side. Write the commission class."
        solution={[
          {
            step: 'Define commission components',
            formula: '\\text{Brokerage} = \\min(20, 0.03\\% \\times \\text{notional})',
          },
          {
            step: 'Exchange + clearing charges',
            formula: '\\text{Exchange} = 0.01\\% \\times \\text{notional}',
          },
          {
            step: 'STT (sell side only)',
            formula: '\\text{STT} = 0.01\\% \\times \\text{notional} \\times \\mathbb{1}_{\\text{sell}}',
          },
          {
            step: 'In Backtrader code',
            formula: '\\text{cerebro.broker.setcommission(commission=0.0003, mult=75)}',
            explanation: 'Set 0.03% as an approximation. For precise modeling, subclass bt.CommInfoBase and implement _getcommission() with the exact fee structure.',
          },
        ]}
      />

      <NoteBlock title="Backtrader with Zerodha" type="tip">
        <p>
          The backtrader-zerodha package provides a live trading bridge from Backtrader to
          Zerodha Kite. Install via pip and configure with your Kite API key. This allows you
          to use the exact same strategy code for backtesting and live trading. However, be
          aware that the bridge has latency limitations and may not handle rapid order updates
          well during volatile Nifty sessions.
        </p>
      </NoteBlock>

      <NoteBlock title="Backtrader Limitations" type="warning">
        <p>
          Backtrader has not been actively maintained since 2021. Known issues include: (1) memory
          leaks with large datasets, (2) slow performance for parameter optimization (use
          vectorized methods for scanning), (3) limited support for multi-asset portfolio strategies,
          and (4) no native support for options Greeks and multi-leg positions. For options
          backtesting, consider building a custom engine or using QuantLib for pricing. For
          equity/futures, Backtrader remains a solid choice.
        </p>
      </NoteBlock>
    </div>
  )
}
