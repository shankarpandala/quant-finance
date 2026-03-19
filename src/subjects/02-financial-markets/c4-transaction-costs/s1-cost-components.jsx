import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveCostComponents() {
  const [tradeValue, setTradeValue] = useState(100000)
  const [segment, setSegment] = useState(0)
  const [brokerage, setBrokerage] = useState(20)

  const sttRates = [0.001, 0.00025, 0.000625, 0.000125]
  const exchangeRates = [0.0000345, 0.0000345, 0.0005, 0.00002]
  const stampRates = [0.00015, 0.00003, 0.00003, 0.00002]
  const stt = tradeValue * sttRates[segment]
  const exchange = tradeValue * exchangeRates[segment]
  const gst = (brokerage + exchange) * 0.18
  const sebi = tradeValue * 0.000001
  const stamp = tradeValue * stampRates[segment]
  const totalExplicit = brokerage + stt + exchange + gst + sebi + stamp
  const spreadCost = tradeValue * 0.0002
  const totalCost = totalExplicit + spreadCost
  const costBps = (totalCost / tradeValue) * 10000

  const results = [
    { label: 'STT', value: `INR ${stt.toFixed(2)}` },
    { label: 'Brokerage + GST', value: `INR ${(brokerage + gst).toFixed(2)}` },
    { label: 'Total Explicit', value: `INR ${totalExplicit.toFixed(2)}` },
    { label: 'Total (incl spread)', value: `${costBps.toFixed(1)} bps` },
  ]

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: NSE Trade Cost Calculator
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Calculate the total transaction cost for different trade types on NSE. Input your trade size and see the cost breakdown in INR and basis points.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>`Trade Value: INR ${tradeValue.toLocaleString()}`</span>
          <input type="range" min="10000" max="10000000" step="10000" value={tradeValue}
            onChange={e => setTradeValue(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>`Segment: ${['Delivery', 'Intraday', 'Options', 'Futures'][segment]}`</span>
          <input type="range" min="0" max="3" step="1" value={segment}
            onChange={e => setSegment(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>`Brokerage: INR ${brokerage}`</span>
          <input type="range" min="0" max="100" step="5" value={brokerage}
            onChange={e => setBrokerage(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {results.map((r, i) => (
          <div key={i} className="rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-800">
            <div className="text-xs text-gray-500 dark:text-gray-400">{r.label}</div>
            <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{r.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CostComponents() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Transaction Cost Components in Indian Markets
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        This section covers essential concepts for quantitative finance in the Indian market
        context, with applications to NSE, BSE, Nifty 50, and Bank Nifty instruments.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Explicit Costs on NSE
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Every trade on NSE incurs multiple layers of fees. For a typical equity delivery trade on Zerodha: brokerage is zero (for delivery) or INR 20 flat (for intraday/F&O), STT is 0.1% on both buy and sell, exchange transaction charge is 0.00345%, GST is 18% on brokerage + exchange charges, SEBI turnover fee is 0.0001%, and stamp duty varies by state (typically 0.003-0.015%).
      </p>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Implicit Costs: Spread and Impact
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The bid-ask spread is the most visible implicit cost. For Nifty 50 stocks, spreads are typically 1-3 bps. For mid-cap stocks outside the top 200, spreads widen to 10-50 bps. Market impact -- the additional price movement caused by your order -- scales with order size relative to daily volume. The square-root model estimates impact as proportional to the square root of participation rate.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Cost Comparison Across Segments
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        F&O trading has lower STT than equity delivery but requires margin capital. Options selling incurs STT only on the sell premium, while futures STT is on the sell-side notional value. Intraday equity has lower STT (0.025%) than delivery (0.1%), creating an incentive structure that affects strategy design.
      </p>

      <DefinitionBlock
        title="Total Transaction Cost"
        label="Definition 4.1"
        definition={<>
          The total cost of a trade on NSE/BSE includes explicit costs (brokerage, STT, exchange fees, GST, stamp duty, SEBI turnover fee) and implicit costs (bid-ask spread, market impact, timing cost). For a Zerodha trade: <BlockMath math="\\text{Total Cost} = \\text{Brokerage} + \\text{STT} + \\text{Exchange} + \\text{GST} + \\text{Stamp} + \\text{SEBI} + \\text{Spread} + \\text{Impact}" />
        </>}
        notation={<>STT (Securities Transaction Tax) is the largest explicit cost for equity delivery trades at 0.1% on buy and sell sides.</>}
      />

      <BlockMath math={"\\text{STT}_{\\text{delivery}} = 0.001 \\times \\text{Value}, \\quad \\text{STT}_{\\text{intraday}} = 0.00025 \\times \\text{Sell Value}"} />

      <BlockMath math={"\\text{STT}_{\\text{options}} = 0.000625 \\times \\text{Sell Premium}, \\quad \\text{STT}_{\\text{futures}} = 0.000125 \\times \\text{Sell Value}"} />

      <BlockMath math={"\\text{GST} = 0.18 \\times (\\text{Brokerage} + \\text{Exchange Fees})"} />

      <TheoremBlock
        title="Implementation Shortfall"
        label="Theorem 4.1"
        statement={<>
          The implementation shortfall (IS) measures the total cost of executing a trading decision: <BlockMath math="\\text{IS} = \\text{Paper Return} - \\text{Actual Return} = \\text{Delay Cost} + \\text{Market Impact} + \\text{Explicit Costs} + \\text{Opportunity Cost}" /> For Indian mid-cap stocks, IS can be 50-200 bps per trade, significantly eroding strategy alpha.
        </>}
      />

      <InteractiveCostComponents />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Cost Component</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Equity Delivery</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Equity Intraday</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Options</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Futures</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">Brokerage (Zerodha)</td>
              <td className="px-4 py-2">0 (free)</td>
              <td className="px-4 py-2">INR 20 or 0.03%</td>
              <td className="px-4 py-2">INR 20 flat</td>
              <td className="px-4 py-2">INR 20 flat</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">STT</td>
              <td className="px-4 py-2">0.1% (both sides)</td>
              <td className="px-4 py-2">0.025% (sell)</td>
              <td className="px-4 py-2">0.0625% (sell premium)</td>
              <td className="px-4 py-2">0.0125% (sell)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">Exchange Charges</td>
              <td className="px-4 py-2">0.00345%</td>
              <td className="px-4 py-2">0.00345%</td>
              <td className="px-4 py-2">0.05%</td>
              <td className="px-4 py-2">0.002%</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">GST</td>
              <td className="px-4 py-2">18% on fees</td>
              <td className="px-4 py-2">18% on fees</td>
              <td className="px-4 py-2">18% on fees</td>
              <td className="px-4 py-2">18% on fees</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-medium">Stamp Duty</td>
              <td className="px-4 py-2">0.015% (buy)</td>
              <td className="px-4 py-2">0.003% (buy)</td>
              <td className="px-4 py-2">0.003% (buy)</td>
              <td className="px-4 py-2">0.002% (buy)</td>
            </tr>
          </tbody>
        </table>
      </div>



      <PythonCode
        title="transaction_costs.py"
        runnable
        code={`import numpy as np

def calculate_nse_costs(trade_value, segment='delivery', brokerage=20):
    \"\"\"Calculate all transaction costs for an NSE trade.\"\"\"
    costs = {}
    
    # STT rates
    stt_rates = {'delivery': 0.001, 'intraday': 0.00025, 'options': 0.000625, 'futures': 0.000125}
    costs['stt'] = trade_value * stt_rates[segment]
    
    # Exchange transaction charges
    exc_rates = {'delivery': 0.0000345, 'intraday': 0.0000345, 'options': 0.0005, 'futures': 0.00002}
    costs['exchange'] = trade_value * exc_rates[segment]
    
    # Brokerage
    if segment == 'delivery':
        costs['brokerage'] = 0  # Zerodha free delivery
    else:
        costs['brokerage'] = min(brokerage, trade_value * 0.0003)
    
    # GST on brokerage + exchange
    costs['gst'] = (costs['brokerage'] + costs['exchange']) * 0.18
    
    # SEBI turnover fee
    costs['sebi'] = trade_value * 0.000001
    
    # Stamp duty (varies by state, using Maharashtra)
    stamp_rates = {'delivery': 0.00015, 'intraday': 0.00003, 'options': 0.00003, 'futures': 0.00002}
    costs['stamp'] = trade_value * stamp_rates[segment]
    
    costs['total_explicit'] = sum(costs.values())
    costs['total_bps'] = costs['total_explicit'] / trade_value * 10000
    
    return costs

# --- Cost Analysis for Different Trade Sizes ---
print("=== NSE Transaction Cost Analysis ===\n")
segments = ['delivery', 'intraday', 'options', 'futures']
trade_values = [50000, 100000, 500000, 1000000, 5000000]

for seg in segments:
    print(f"--- {seg.upper()} ---")
    print(f"{'Value (INR)':>12} {'STT':>8} {'Total':>10} {'BPS':>6}")
    for tv in trade_values:
        c = calculate_nse_costs(tv, seg)
        print(f"{tv:>12,} {c['stt']:>8.2f} {c['total_explicit']:>10.2f} {c['total_bps']:>6.2f}")
    print()

# --- Break-even Alpha Calculation ---
print("=== Break-even Alpha for Different Strategies ===")
strategies = [
    ('Daily mean-reversion (delivery)', 252, 'delivery', 100000),
    ('Weekly momentum (delivery)', 52, 'delivery', 500000),
    ('Intraday scalping', 252*5, 'intraday', 200000),
    ('Options selling (monthly)', 12, 'options', 300000),
]

for name, trades_per_year, seg, avg_trade in strategies:
    c = calculate_nse_costs(avg_trade, seg)
    annual_cost_bps = c['total_bps'] * trades_per_year * 2  # round trip
    print(f"  {name}")
    print(f"    Trades/year: {trades_per_year}, Cost/trade: {c['total_bps']:.1f} bps")
    print(f"    Annual cost: {annual_cost_bps:.0f} bps ({annual_cost_bps/100:.2f}%)")
    print(f"    Need alpha > {annual_cost_bps:.0f} bps to be profitable")
    print()`}
      />

      <ExampleBlock
        title="Computing Round-Trip Cost for a Nifty Futures Trade"
        difficulty="beginner"
        problem="You buy and sell 1 lot of Nifty futures (25 units at INR 20,000) on Zerodha. What is the total round-trip cost?"
        solution={[
          {
            step: 'Notional value',
            formula: 'V = 25 \\times 20000 = \\text{INR } 5,00,000'
          },
          {
            step: 'Buy side costs',
            formula: '\\text{Brokerage} = 20, \\text{ Exchange} = 10, \\text{ Stamp} = 10, \\text{ SEBI} = 0.50'
          },
          {
            step: 'Sell side costs',
            formula: '\\text{Brokerage} = 20, \\text{ STT} = 62.50, \\text{ Exchange} = 10'
          },
          {
            step: 'Total',
            formula: '\\text{Total} \\approx \\text{INR } 155 \\approx 3.1 \\text{ bps}',
            explanation: "The total round-trip cost is about 3 bps of notional value, dominated by STT on the sell side. This must be exceeded by the strategy's alpha to be profitable."
          }
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Transaction costs are the silent killer of quant strategies. For Indian markets, STT is the largest component for delivery trades, while brokerage dominates for frequent F&O trading. Always include realistic transaction costs in backtests -- a strategy with 5 bps alpha per trade needs extremely low costs to survive. Use Zerodha's zero-brokerage delivery to minimize costs for position strategies.
        </p>
      </NoteBlock>
    </div>
  )
}
