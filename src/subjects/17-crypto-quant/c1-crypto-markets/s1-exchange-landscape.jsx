import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveExchangeComparison() {
  const [tradeSize, setTradeSize] = useState(100000)
  const [selectedPair, setSelectedPair] = useState('BTC/USDT')

  const exchanges = [
    { name: 'Binance', fee: 0.1, spread: 0.01, depth: 50000000, latency: 5 },
    { name: 'WazirX (India)', fee: 0.2, spread: 0.15, depth: 500000, latency: 50 },
    { name: 'CoinDCX (India)', fee: 0.2, spread: 0.12, depth: 300000, latency: 45 },
    { name: 'Coinbase', fee: 0.4, spread: 0.02, depth: 20000000, latency: 10 },
    { name: 'OKX', fee: 0.08, spread: 0.015, depth: 30000000, latency: 8 },
  ]

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Crypto Exchange Cost Comparison
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Compare execution costs across global and Indian exchanges for a given trade size.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Trade Size: ${(tradeSize / 1000).toFixed(0)}K</span>
          <input type="range" min="1000" max="1000000" step="1000" value={tradeSize}
            onChange={e => setTradeSize(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Pair: {selectedPair}</span>
          <select value={selectedPair}
            onChange={e => setSelectedPair(e.target.value)}
            className="rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
            <option value="BTC/USDT">BTC/USDT</option>
            <option value="ETH/USDT">ETH/USDT</option>
            <option value="BTC/INR">BTC/INR</option>
          </select>
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Exchange</th>
              <th className="px-3 py-2 text-right text-gray-600 dark:text-gray-400">Fee ($)</th>
              <th className="px-3 py-2 text-right text-gray-600 dark:text-gray-400">Spread Cost ($)</th>
              <th className="px-3 py-2 text-right text-gray-600 dark:text-gray-400">Impact ($)</th>
              <th className="px-3 py-2 text-right text-gray-600 dark:text-gray-400">Total ($)</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            {exchanges.map((ex, i) => {
              const fee = tradeSize * ex.fee / 100
              const spreadCost = tradeSize * ex.spread / 100
              const impactCost = tradeSize > ex.depth ? (tradeSize - ex.depth) / ex.depth * tradeSize * 0.01 : 0
              const total = fee + spreadCost + impactCost
              return (
                <tr key={i} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-3 py-2 font-semibold">{ex.name}</td>
                  <td className="px-3 py-2 text-right font-mono">{fee.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right font-mono">{spreadCost.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right font-mono">{impactCost.toFixed(2)}</td>
                  <td className={`px-3 py-2 text-right font-mono font-semibold ${i === 0 ? 'text-green-600' : ''}`}>
                    {total.toFixed(2)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function ExchangeLandscape() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Crypto Exchange Landscape
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The cryptocurrency exchange ecosystem spans centralized exchanges (CEX) like
        Binance and decentralized exchanges (DEX) like Uniswap, with Indian platforms
        like WazirX and CoinDCX serving the domestic market. Understanding the
        structure, fee models, and regulatory landscape is essential for crypto
        quant strategies targeting Indian and global markets.
      </p>

      <DefinitionBlock
        title="Centralized Exchange (CEX)"
        label="Definition 1.1"
        definition="A centralized cryptocurrency exchange is a platform operated by a company that matches buy and sell orders using a central limit order book (CLOB), similar to traditional stock exchanges. CEXs hold customer funds in custodial wallets and provide order matching, settlement, and margin services. In India, CEXs must comply with the Virtual Digital Asset (VDA) framework introduced in the 2022 Finance Act."
        notation={<>Key metrics: daily volume <InlineMath math="V_d" />, maker/taker fees <InlineMath math="(f_m, f_t)" />, and order book depth at <InlineMath math="k" /> bps from mid <InlineMath math="D_k" />.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Indian Crypto Taxation Framework
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The Indian VDA tax regime (effective April 2022) imposes significant constraints
        on crypto trading strategies:
      </p>

      <BlockMath math="\text{Tax on VDA} = 30\% \times \text{Gains} + 1\% \text{ TDS on each transaction}" />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Provision</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Detail</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Impact on Quant</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">30% Flat Tax</td>
              <td className="px-4 py-2">Section 115BBH</td>
              <td className="px-4 py-2">High hurdle rate for strategies</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">1% TDS</td>
              <td className="px-4 py-2">Section 194S, per trade</td>
              <td className="px-4 py-2">Kills high-frequency strategies</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">No Loss Set-off</td>
              <td className="px-4 py-2">Cannot offset crypto losses</td>
              <td className="px-4 py-2">Asymmetric risk profile</td>
            </tr>
            <tr>
              <td className="px-4 py-2">No Deductions</td>
              <td className="px-4 py-2">Only acquisition cost allowed</td>
              <td className="px-4 py-2">Infrastructure costs not deductible</td>
            </tr>
          </tbody>
        </table>
      </div>

      <TheoremBlock
        title="Minimum Profitability for Indian Crypto Trading"
        label="Theorem 1.1"
        statement={<>Given the Indian VDA tax framework (30% flat tax, 1% TDS, no loss offset), a crypto trading strategy must achieve a pre-tax return of at least: <BlockMath math="r_{\min} = \frac{c_{\text{TDS}} \cdot N_{\text{trades}}}{1 - \tau} = \frac{0.01 \cdot N_{\text{trades}}}{0.70}" /> where <InlineMath math="N_{\text{trades}}" /> is the annual number of round-trip trades. For a strategy with 100 round-trip trades per year, the minimum return is approximately <InlineMath math="1.43\%" /> just to break even on TDS alone, before accounting for exchange fees.</>}
        proof={<>Each round trip incurs 2 TDS deductions of 1% each (buy and sell). The total TDS outflow is <InlineMath math="0.02 \times N" /> of the traded notional. After 30% tax on profits, the net retention is 70% of gross profit. Setting net profit equal to TDS cost: <InlineMath math="0.7 \times r = 0.02 \times N" />.</>}
      />

      <InteractiveExchangeComparison />

      <PythonCode
        title="exchange_analysis.py"
        runnable
        code={`import numpy as np

class CryptoExchangeAnalyzer:
    """Compare crypto exchange economics for Indian traders."""

    def __init__(self):
        self.exchanges = {
            'Binance': {'maker': 0.10, 'taker': 0.10, 'depth_usd': 50e6,
                       'min_spread_bps': 1, 'jurisdiction': 'Global'},
            'WazirX': {'maker': 0.20, 'taker': 0.20, 'depth_usd': 0.5e6,
                      'min_spread_bps': 15, 'jurisdiction': 'India'},
            'CoinDCX': {'maker': 0.20, 'taker': 0.20, 'depth_usd': 0.3e6,
                       'min_spread_bps': 12, 'jurisdiction': 'India'},
            'OKX': {'maker': 0.08, 'taker': 0.10, 'depth_usd': 30e6,
                   'min_spread_bps': 1.5, 'jurisdiction': 'Global'},
        }

    def compute_cost(self, exchange, trade_size_usd, is_taker=True):
        """Compute total execution cost."""
        ex = self.exchanges[exchange]
        fee_rate = ex['taker'] if is_taker else ex['maker']
        fee = trade_size_usd * fee_rate / 100
        spread_cost = trade_size_usd * ex['min_spread_bps'] / 10000
        impact = 0
        if trade_size_usd > ex['depth_usd']:
            excess = trade_size_usd - ex['depth_usd']
            impact = excess / ex['depth_usd'] * trade_size_usd * 0.001
        return {'fee': fee, 'spread': spread_cost, 'impact': impact,
                'total': fee + spread_cost + impact}

    def india_tax_impact(self, gross_profit, num_trades, trade_size):
        """Compute Indian VDA tax impact."""
        tds = num_trades * 2 * trade_size * 0.01  # 1% TDS each leg
        tax = max(0, gross_profit) * 0.30  # 30% flat
        net = gross_profit - tax - tds
        effective_rate = 1 - net / gross_profit if gross_profit > 0 else 1
        return {
            'gross_profit': gross_profit,
            'tds_total': tds,
            'income_tax': tax,
            'net_profit': net,
            'effective_tax_rate': effective_rate
        }

    def optimal_exchange(self, trade_size_usd):
        """Find lowest-cost exchange for given trade size."""
        costs = {}
        for name in self.exchanges:
            costs[name] = self.compute_cost(name, trade_size_usd)
        best = min(costs, key=lambda x: costs[x]['total'])
        return best, costs

analyzer = CryptoExchangeAnalyzer()

print("=" * 60)
print("CRYPTO EXCHANGE ANALYSIS FOR INDIAN TRADERS")
print("=" * 60)

# Cost comparison for different trade sizes
print("\\nExecution Cost Comparison (taker orders):")
print(f"{'Exchange':<15} {'$10K':>10} {'$100K':>10} {'$1M':>10}")
print("-" * 50)
for name in analyzer.exchanges:
    costs = [analyzer.compute_cost(name, s)['total'] for s in [10000, 100000, 1000000]]
    print(f"{name:<15} ${costs[0]:>8.2f} ${costs[1]:>8.2f} ${costs[2]:>8.2f}")

# Indian tax impact
print("\\nIndian VDA Tax Impact Analysis:")
scenarios = [
    ("Low-freq (12 trades/yr)", 12, 100000, 50000),
    ("Med-freq (100 trades/yr)", 100, 50000, 80000),
    ("High-freq (1000 trades/yr)", 1000, 10000, 100000),
]

for desc, n_trades, trade_size, profit in scenarios:
    tax = analyzer.india_tax_impact(profit, n_trades, trade_size)
    print(f"\\n  {desc}:")
    print(f"    Gross Profit:  Rs {tax['gross_profit']:>10,}")
    print(f"    TDS Total:     Rs {tax['tds_total']:>10,.0f}")
    print(f"    Income Tax:    Rs {tax['income_tax']:>10,.0f}")
    print(f"    Net Profit:    Rs {tax['net_profit']:>10,.0f}")
    print(f"    Effective Tax: {tax['effective_tax_rate']:.1%}")`}
      />

      <ExampleBlock
        title="BTC/INR vs BTC/USDT Arbitrage"
        difficulty="intermediate"
        problem="BTC is trading at $65,000 on Binance (BTC/USDT) and Rs 55,50,000 on WazirX (BTC/INR). The USD/INR rate is 84.50. Binance taker fee is 0.1%, WazirX is 0.2%. Is there an arbitrage opportunity? Account for the 1% TDS on the Indian leg."
        solution={[
          {
            step: 'Convert Binance price to INR',
            formula: '65{,}000 \\times 84.50 = \\text{Rs } 54{,}92{,}500',
          },
          {
            step: 'Compute premium on WazirX',
            formula: '\\text{Premium} = \\frac{55{,}50{,}000 - 54{,}92{,}500}{54{,}92{,}500} = 1.05\\%',
          },
          {
            step: 'Compute costs',
            formula: '\\text{Binance fee} = 0.1\\% + \\text{WazirX fee} = 0.2\\% + \\text{TDS} = 1\\% = 1.3\\%',
          },
          {
            step: 'Net P&L',
            formula: '1.05\\% - 1.3\\% = -0.25\\%',
            explanation: 'No profitable arbitrage exists after accounting for TDS. The 1% TDS on Indian exchanges makes most cross-exchange arbitrage unviable, which is why the INR premium persists.',
          },
        ]}
      />

      <NoteBlock title="Indian Regulatory Landscape" type="warning">
        <p>
          As of 2025, cryptocurrency is not illegal in India but is heavily regulated
          through taxation. The RBI has not issued a central bank digital currency
          (CBDC) framework for crypto assets. Indian exchanges must register as
          reporting entities under the PMLA. The 30% flat tax with no loss offset
          and 1% TDS makes high-frequency crypto trading uneconomic on Indian
          exchanges. Most Indian crypto quants operate through global exchanges
          with INR-USD conversion, though this introduces additional forex risk and
          regulatory complexity under FEMA.
        </p>
      </NoteBlock>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Exchange Selection Framework
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For Indian quant traders, exchange selection involves a multi-factor
        optimization considering fees, liquidity, latency, API quality, and
        regulatory risk. The total cost of execution includes:
      </p>

      <BlockMath math="\text{Total Cost} = \underbrace{f_{\text{maker/taker}}}_{\text{exchange fee}} + \underbrace{\frac{s}{2}}_{\text{half-spread}} + \underbrace{\eta(Q)}_{\text{market impact}} + \underbrace{c_{\text{TDS}}}_{\text{India tax}} + \underbrace{c_{\text{FX}}}_{\text{forex cost}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For a round-trip trade on an Indian exchange, the 1% TDS on each leg
        adds 2% to the total cost, making it the dominant expense. On global exchanges,
        the forex conversion cost (INR to USDT) adds approximately 0.5--1.5% depending
        on the pathway (bank wire, P2P, or stablecoin on-ramp).
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Feature</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Indian CEX</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Global CEX</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">DEX</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">KYC Required</td>
              <td className="px-4 py-2">Yes (Aadhaar)</td>
              <td className="px-4 py-2">Yes</td>
              <td className="px-4 py-2">No</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">INR On-ramp</td>
              <td className="px-4 py-2">Direct (UPI/NEFT)</td>
              <td className="px-4 py-2">P2P / Wire</td>
              <td className="px-4 py-2">Via CEX</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">TDS Applicable</td>
              <td className="px-4 py-2">Yes (1%)</td>
              <td className="px-4 py-2">No</td>
              <td className="px-4 py-2">No</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">API Quality</td>
              <td className="px-4 py-2">Basic</td>
              <td className="px-4 py-2">Excellent</td>
              <td className="px-4 py-2">On-chain</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Derivatives</td>
              <td className="px-4 py-2">Limited</td>
              <td className="px-4 py-2">Full (perps, options)</td>
              <td className="px-4 py-2">Growing (dYdX)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <NoteBlock title="PMLA Compliance" type="warning">
        <p>
          Under the Prevention of Money Laundering Act (PMLA) amendments of 2023,
          all crypto exchanges operating in India (including offshore exchanges serving
          Indian customers) must register as reporting entities with the Financial
          Intelligence Unit (FIU-IND). Several global exchanges including Binance
          were initially non-compliant but have since registered. Indian traders
          should verify that their chosen exchange is FIU-registered to avoid
          potential legal complications. Non-compliant exchange URLs may be blocked
          by Indian ISPs per government directives.
        </p>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          The crypto exchange landscape presents vastly different economics for Indian
          vs. global traders. The 1% TDS regime effectively eliminates high-frequency
          strategies on Indian exchanges, pushing quant activity to global platforms.
          Exchange selection must account for fees, spreads, depth, and jurisdictional
          tax implications. For Indian crypto quants, the regulatory and tax framework
          is the dominant factor in strategy design.
        </p>
      </NoteBlock>
    </div>
  )
}
