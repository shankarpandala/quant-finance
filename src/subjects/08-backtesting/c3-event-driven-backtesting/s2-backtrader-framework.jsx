import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveBacktraderPipeline() {
  const [commission, setCommission] = useState(0.05)
  const [slippage, setSlippage] = useState(0.02)
  const [initialCapital, setInitialCapital] = useState(1000000)
  const [smaFast, setSmaFast] = useState(20)
  const [smaSlow, setSmaSlow] = useState(50)

  const grossReturn = 18.5
  const totalCommission = commission * 2 * 52
  const totalSlippage = slippage * 2 * 52
  const netReturn = grossReturn - totalCommission - totalSlippage
  const finalCapital = initialCapital * (1 + netReturn / 100)
  const sharpe = netReturn / 14.2

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Backtrader Cost Impact Simulator
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust commission, slippage, and SMA crossover parameters to see how transaction
        costs erode alpha on a Nifty 50 SMA crossover strategy.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Commission (%) = {commission.toFixed(2)}</span>
          <input type="range" min="0" max="0.2" step="0.01" value={commission}
            onChange={e => setCommission(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Slippage (%) = {slippage.toFixed(2)}</span>
          <input type="range" min="0" max="0.1" step="0.005" value={slippage}
            onChange={e => setSlippage(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Initial Capital (INR) = {initialCapital.toLocaleString('en-IN')}</span>
          <input type="range" min="100000" max="10000000" step="100000" value={initialCapital}
            onChange={e => setInitialCapital(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Fast SMA = {smaFast} days</span>
          <input type="range" min="5" max="30" step="1" value={smaFast}
            onChange={e => setSmaFast(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Slow SMA = {smaSlow} days</span>
          <input type="range" min="30" max="200" step="5" value={smaSlow}
            onChange={e => setSmaSlow(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 520 200" className="w-full max-w-xl mx-auto block" aria-label="Cost impact waterfall">
        <defs>
          <linearGradient id="btGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <rect x="40" y={180 - grossReturn * 7} width="80" height={grossReturn * 7} fill="url(#btGrad)" rx="4" />
        <text x="80" y={175 - grossReturn * 7} textAnchor="middle" className="text-[10px] font-bold" fill="#4338ca">
          {grossReturn.toFixed(1)}%
        </text>
        <text x="80" y="196" textAnchor="middle" className="text-[9px]" fill="#6b7280">Gross</text>

        <rect x="160" y={180 - totalCommission * 7} width="80" height={totalCommission * 7} fill="#ef4444" rx="4" opacity="0.7" />
        <text x="200" y={175 - totalCommission * 7} textAnchor="middle" className="text-[10px] font-bold" fill="#dc2626">
          -{totalCommission.toFixed(1)}%
        </text>
        <text x="200" y="196" textAnchor="middle" className="text-[9px]" fill="#6b7280">Commission</text>

        <rect x="280" y={180 - totalSlippage * 7} width="80" height={totalSlippage * 7} fill="#f59e0b" rx="4" opacity="0.7" />
        <text x="320" y={175 - totalSlippage * 7} textAnchor="middle" className="text-[10px] font-bold" fill="#d97706">
          -{totalSlippage.toFixed(1)}%
        </text>
        <text x="320" y="196" textAnchor="middle" className="text-[9px]" fill="#6b7280">Slippage</text>

        <rect x="400" y={180 - Math.max(netReturn, 0) * 7} width="80" height={Math.max(netReturn, 0) * 7}
          fill={netReturn > 0 ? '#22c55e' : '#ef4444'} rx="4" opacity="0.7" />
        <text x="440" y={175 - Math.max(netReturn, 0) * 7} textAnchor="middle" className="text-[10px] font-bold"
          fill={netReturn > 0 ? '#16a34a' : '#dc2626'}>
          {netReturn.toFixed(1)}%
        </text>
        <text x="440" y="196" textAnchor="middle" className="text-[9px]" fill="#6b7280">Net</text>

        <line x1="30" y1="180" x2="490" y2="180" stroke="#9ca3af" strokeWidth="1" />
      </svg>

      <div className="mt-3 grid grid-cols-2 gap-2 text-center text-sm">
        <div className="rounded bg-gray-50 p-2 dark:bg-gray-800">
          <span className="text-gray-500 dark:text-gray-400">Final Capital: </span>
          <span className="font-bold text-indigo-600 dark:text-indigo-400">
            INR {finalCapital.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </span>
        </div>
        <div className="rounded bg-gray-50 p-2 dark:bg-gray-800">
          <span className="text-gray-500 dark:text-gray-400">Sharpe (approx): </span>
          <span className={`font-bold ${sharpe > 1 ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>
            {sharpe.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function BacktraderFramework() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Backtrader for Indian Markets
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Backtrader is a popular open-source Python framework for event-driven backtesting.
        Its flexible architecture supports multiple data feeds, custom indicators,
        position sizing, and realistic brokerage simulation -- making it well-suited for
        strategies on NSE and BSE instruments with Indian market conventions like
        T+1 settlement, STT, and SEBI margin requirements.
      </p>

      <DefinitionBlock
        title="Event-Driven Backtesting"
        label="Definition 8.3"
        definition="An event-driven backtester processes market data one event (bar or tick) at a time, maintaining a realistic simulation of order submission, execution, and portfolio state. Unlike vectorized backtesting, it naturally handles position-dependent logic, partial fills, and realistic commission structures."
        notation={<>The core loop processes events <InlineMath math="e_t" /> sequentially: <InlineMath math="S_{t+1} = T(S_t, e_t)" /> where <InlineMath math="S_t" /> is the full system state and <InlineMath math="T" /> is the transition function.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Backtrader Architecture
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The framework centres on <strong>Cerebro</strong> (the engine), which orchestrates
        data feeds, strategies, brokers, and analyzers. The key components are:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Component</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Role</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Indian Market Note</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2 font-mono text-xs">Cerebro</td>
              <td className="px-5 py-2">Orchestrator engine</td>
              <td className="px-5 py-2">Set timezone to Asia/Kolkata</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2 font-mono text-xs">DataFeed</td>
              <td className="px-5 py-2">OHLCV data source</td>
              <td className="px-5 py-2">Use NSEPython / Jugaad-data</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2 font-mono text-xs">Strategy</td>
              <td className="px-5 py-2">Trading logic</td>
              <td className="px-5 py-2">Handle 9:15-15:30 IST session</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2 font-mono text-xs">Broker</td>
              <td className="px-5 py-2">Order execution</td>
              <td className="px-5 py-2">STT + SEBI charges</td>
            </tr>
            <tr>
              <td className="px-5 py-2 font-mono text-xs">Analyzer</td>
              <td className="px-5 py-2">Performance metrics</td>
              <td className="px-5 py-2">INR-denominated returns</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Transaction Cost Modeling for India
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Indian equity markets have a multi-layered cost structure. The total round-trip
        cost for a delivery trade can be modelled as:
      </p>

      <BlockMath math="C_{\text{total}} = C_{\text{brokerage}} + C_{\text{STT}} + C_{\text{SEBI}} + C_{\text{stamp}} + C_{\text{GST}} + C_{\text{slippage}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For an intraday trade on NSE, the Securities Transaction Tax (STT) is 0.025% on
        sell side, SEBI turnover fee is 0.0001%, stamp duty varies by state (typically
        0.003%), and GST at 18% applies on brokerage and transaction charges.
      </p>

      <BlockMath math="\text{Effective Cost} \approx 2 \times \left(\text{brokerage} + \frac{\text{STT}}{2}\right) + \text{stamp} + \text{slippage}" />

      <TheoremBlock
        title="Break-Even Frequency Theorem"
        label="Theorem 8.2"
        statement={<>For a strategy with per-trade cost <InlineMath math="c" /> and average per-trade return <InlineMath math="\mu" />, the minimum number of winning trades per year to be profitable is:</>}
        formula="N_{\min} = \frac{c \cdot N_{\text{total}}}{\mu - c}"
        proof="Setting net annual return to zero: N_total * (mu - c) = 0 requires mu > c. The break-even frequency follows from requiring total profits to exceed total costs across all N_total trades, giving the stated bound when win-rate is factored in."
      />

      <InteractiveBacktraderPipeline />

      <NoteBlock title="NSE Data Integration" type="tip">
        <p>
          For Indian market data in Backtrader, use <strong>jugaad-data</strong> for
          historical NSE/BSE OHLCV, <strong>nsepython</strong> for live quotes and
          option chains, or <strong>Kite Connect API</strong> (Zerodha) for real-time
          feeds. Always adjust for NSE holidays using the <code>exchange_calendars</code>{' '}
          package with the XNSE calendar.
        </p>
      </NoteBlock>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Nifty 50 SMA Crossover in Backtrader
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Below is a complete Backtrader strategy implementing an SMA crossover on
        Nifty 50, with realistic Indian brokerage costs (Zerodha-style flat fee):
      </p>

      <PythonCode
        title="backtrader_nifty_sma.py"
        runnable
        code={`import backtrader as bt
import datetime

class NiftySMACrossover(bt.Strategy):
    """SMA crossover strategy for Nifty 50 / NSE stocks."""
    params = (
        ('fast_period', 20),
        ('slow_period', 50),
        ('stake', 10),           # Lot size
        ('printlog', True),
    )

    def __init__(self):
        self.sma_fast = bt.indicators.SMA(
            self.data.close, period=self.params.fast_period
        )
        self.sma_slow = bt.indicators.SMA(
            self.data.close, period=self.params.slow_period
        )
        self.crossover = bt.indicators.CrossOver(
            self.sma_fast, self.sma_slow
        )
        self.order = None

    def next(self):
        if self.order:
            return  # Pending order exists

        if not self.position:
            if self.crossover > 0:
                # Golden cross: buy
                self.order = self.buy(size=self.params.stake)
        else:
            if self.crossover < 0:
                # Death cross: sell
                self.order = self.sell(size=self.params.stake)

    def notify_trade(self, trade):
        if trade.isclosed and self.params.printlog:
            print(f"TRADE P&L: Gross={trade.pnl:.2f}, "
                  f"Net={trade.pnlcomm:.2f} INR")

# --- Setup Cerebro ---
cerebro = bt.Cerebro()
cerebro.addstrategy(NiftySMACrossover)

# Indian brokerage: Zerodha-style flat Rs 20 per order
cerebro.broker.setcommission(
    commission=20,        # Flat fee per order (INR)
    commtype=bt.CommInfoBase.COMM_FIXED,
    stocklike=True,
)
cerebro.broker.set_slippage_fixed(0.5)   # 50 paise slippage
cerebro.broker.setcash(1_000_000)        # INR 10 lakh

# Load Nifty 50 data (example with GenericCSV)
# data = bt.feeds.GenericCSVData(
#     dataname='nifty50_2020_2024.csv',
#     dtformat='%Y-%m-%d',
#     datetime=0, open=1, high=2, low=3, close=4, volume=5,
#     openinterest=-1,
# )
# cerebro.adddata(data)

# Add analyzers
cerebro.addanalyzer(bt.analyzers.SharpeRatio,
    _name='sharpe', riskfreerate=0.065)  # RBI repo rate approx
cerebro.addanalyzer(bt.analyzers.DrawDown, _name='drawdown')
cerebro.addanalyzer(bt.analyzers.TradeAnalyzer, _name='trades')

print("Backtrader Nifty SMA Crossover configured.")
print(f"Initial capital: INR {cerebro.broker.getvalue():,.0f}")
print(f"Commission: Flat INR 20/order (Zerodha-style)")
print(f"Slippage: 0.50 INR fixed")
print(f"Risk-free rate: 6.5% (RBI repo)")
# results = cerebro.run()
# cerebro.plot()
print("Ready to run with NSE data feed.")`}
      />

      <ExampleBlock
        title="Computing Break-Even for a Nifty Strategy"
        difficulty="intermediate"
        problem="A Nifty 50 swing trading strategy has average per-trade return of 0.8%, brokerage of INR 20 (flat), average trade size of INR 200,000, and STT of 0.025% on sell. How many trades per year must be profitable to break even?"
        solution={[
          {
            step: 'Calculate per-trade cost as percentage',
            formula: 'c = \\frac{20 + 20}{200000} + 0.00025 = 0.0002 + 0.00025 = 0.00045 = 0.045\\%',
            explanation: 'Round-trip brokerage (INR 40) as fraction of trade size, plus STT on sell side.',
          },
          {
            step: 'Compute break-even condition',
            formula: '\\mu > c \\implies 0.8\\% > 0.045\\%',
            explanation: 'Average return exceeds cost, so the strategy is viable if win rate is sufficient.',
          },
          {
            step: 'Find minimum profitable trades',
            formula: 'N_{\\min} = \\frac{0.00045 \\times 100}{0.008 - 0.00045} \\approx 6 \\text{ trades/year}',
            explanation: 'With 100 total trades, at least 6 must be net-profitable to cover total costs.',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Alternative Frameworks for Indian Markets
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Framework</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Type</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Indian Data</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Best For</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Backtrader</td>
              <td className="px-4 py-2">Event-driven</td>
              <td className="px-4 py-2">Via custom feed</td>
              <td className="px-4 py-2">Strategy prototyping</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Zipline-Reloaded</td>
              <td className="px-4 py-2">Event-driven</td>
              <td className="px-4 py-2">Via bundles</td>
              <td className="px-4 py-2">Pipeline API / factors</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">VectorBT</td>
              <td className="px-4 py-2">Vectorized</td>
              <td className="px-4 py-2">Any DataFrame</td>
              <td className="px-4 py-2">Fast parameter sweeps</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">QSTrader</td>
              <td className="px-4 py-2">Event-driven</td>
              <td className="px-4 py-2">CSV feeds</td>
              <td className="px-4 py-2">Institutional-grade</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Custom (Python)</td>
              <td className="px-4 py-2">Event-driven</td>
              <td className="px-4 py-2">Native</td>
              <td className="px-4 py-2">Full control</td>
            </tr>
          </tbody>
        </table>
      </div>

      <NoteBlock title="Indian Broker Integration" type="historical">
        <ul className="space-y-2">
          <li>
            <strong>Zerodha Kite Connect:</strong> Most popular API for Indian retail
            algos. Supports order placement, live market data (via WebSocket),
            and historical data. Rate limited to 3 requests/second for data.
          </li>
          <li>
            <strong>Angel One SmartAPI:</strong> Growing alternative with similar
            capabilities. Free historical data for backtesting.
          </li>
          <li>
            <strong>TrueData / Global Datafeeds:</strong> Professional data vendors
            for real-time and historical NSE/BSE data including tick-by-tick feeds
            needed for intraday strategy backtesting.
          </li>
          <li>
            <strong>NSE Bhav Copies:</strong> Free end-of-day OHLCV data directly
            from NSE, available from 1994 onwards. Use for daily strategy backtesting
            but remember to adjust for corporate actions manually.
          </li>
        </ul>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Backtrader provides a mature event-driven framework that maps naturally onto
          Indian market workflows. The critical step is <strong>realistic cost modeling</strong>:
          always include STT, stamp duty, SEBI fees, GST, and slippage. For NSE strategies,
          use the XNSE exchange calendar and verify that your data accounts for corporate
          actions (bonus, splits, dividends) that are frequent in Indian equities.
        </p>
      </NoteBlock>
    </div>
  )
}
