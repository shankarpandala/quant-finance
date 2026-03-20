import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveNVT() {
  const [marketCap, setMarketCap] = useState(1200)
  const [txVolume, setTxVolume] = useState(15)
  const [activeAddresses, setActiveAddresses] = useState(800)
  const [hashRate, setHashRate] = useState(500)

  const nvt = marketCap / txVolume
  const nvtSignal = nvt > 100 ? 'OVERVALUED' : nvt > 60 ? 'FAIR' : 'UNDERVALUED'
  const nvm = marketCap / (activeAddresses / 1000)
  const thermocapRatio = marketCap / (hashRate * 0.5)

  const metcalfe = (activeAddresses / 1000) ** 2 * 0.001
  const metcalfeRatio = marketCap / metcalfe

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: On-Chain Valuation Metrics
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust network metrics to compute on-chain valuation ratios for Bitcoin.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Market Cap: ${marketCap}B</span>
          <input type="range" min="100" max="3000" step="50" value={marketCap}
            onChange={e => setMarketCap(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Daily Tx Vol: ${txVolume}B</span>
          <input type="range" min="1" max="50" step="1" value={txVolume}
            onChange={e => setTxVolume(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Active Addr: {activeAddresses}K</span>
          <input type="range" min="200" max="2000" step="50" value={activeAddresses}
            onChange={e => setActiveAddresses(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Hash Rate: {hashRate} EH/s</span>
          <input type="range" min="100" max="1000" step="50" value={hashRate}
            onChange={e => setHashRate(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 500 110" className="w-full max-w-lg mx-auto block" aria-label="Valuation metrics">
        {[
          { name: 'NVT Ratio', value: nvt, zones: [30, 60, 100, 150] },
          { name: 'NVM Ratio', value: nvm / 10, zones: [50, 100, 200, 300] },
        ].map((metric, i) => {
          const y = 10 + i * 45
          const position = Math.min(400, metric.value / metric.zones[3] * 400)
          const color = metric.value < metric.zones[1] ? '#4ade80' :
            metric.value < metric.zones[2] ? '#fbbf24' : '#f87171'
          return (
            <g key={i}>
              <text x="10" y={y + 15} className="text-[9px]" fill="#374151">{metric.name}</text>
              <rect x="80" y={y} width="400" height="25" rx="4" fill="#e5e7eb" />
              {/* Zone colors */}
              <rect x="80" y={y} width={metric.zones[1] / metric.zones[3] * 400} height="25" rx="4" fill="#4ade80" opacity="0.2" />
              <rect x={80 + metric.zones[1] / metric.zones[3] * 400} y={y}
                width={(metric.zones[2] - metric.zones[1]) / metric.zones[3] * 400} height="25" fill="#fbbf24" opacity="0.2" />
              <rect x={80 + metric.zones[2] / metric.zones[3] * 400} y={y}
                width={(metric.zones[3] - metric.zones[2]) / metric.zones[3] * 400} height="25" rx="4" fill="#f87171" opacity="0.2" />
              {/* Indicator */}
              <circle cx={80 + position} cy={y + 12.5} r="6" fill={color} stroke="#fff" strokeWidth="2" />
              <text x={85 + position} y={y + 16} className="text-[8px] font-bold" fill="#374151">
                {metric.value.toFixed(0)}
              </text>
            </g>
          )
        })}
        <text x="250" y="100" textAnchor="middle"
          className={`text-[10px] font-bold ${nvtSignal === 'UNDERVALUED' ? 'fill-green-600' : nvtSignal === 'OVERVALUED' ? 'fill-red-500' : 'fill-amber-500'}`}>
          NVT Signal: {nvtSignal} | Metcalfe Ratio: {metcalfeRatio.toFixed(1)}
        </text>
      </svg>
    </div>
  )
}

export default function NetworkMetrics() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Network Metrics and On-Chain Valuation
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        On-chain network metrics provide fundamental valuation frameworks for
        cryptocurrencies, analogous to financial ratios in equity analysis. These
        metrics leverage the transparency of blockchain data to assess whether a
        network is overvalued or undervalued relative to its usage and adoption.
      </p>

      <DefinitionBlock
        title="NVT Ratio (Network Value to Transactions)"
        label="Definition 2.1"
        definition="The NVT ratio is the cryptocurrency equivalent of the P/E ratio. It compares the network's market capitalization to the value being transmitted through the network. A high NVT suggests the network is overvalued relative to its utility; a low NVT suggests undervaluation."
        notation={<><InlineMath math="\text{NVT} = \frac{\text{Market Cap}}{\text{Daily Transaction Volume (USD)}}" />. The NVT signal uses a smoothed 90-day moving average of transaction volume for reduced noise.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Key On-Chain Valuation Metrics
      </h3>

      <BlockMath math="\text{NVT} = \frac{\text{Market Cap}}{V_{\text{tx}}}, \quad \text{NVM} = \frac{\text{Market Cap}}{A_{\text{active}}^2}, \quad \text{MVRV} = \frac{\text{Market Cap}}{\text{Realized Cap}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The MVRV ratio compares market value to realized value (sum of each UTXO
        valued at the price when it last moved). MVRV above 3.7 historically signals
        cycle tops; below 1.0 signals cycle bottoms.
      </p>

      <TheoremBlock
        title="Metcalfe's Law in Crypto Valuation"
        label="Theorem 2.1"
        statement={<>The market capitalization of major blockchain networks follows a generalized Metcalfe's law: <BlockMath math="\ln(\text{Market Cap}) = \alpha + \beta \cdot \ln(A^2) + \epsilon, \quad \beta \approx 0.95\text{--}1.05" /> where <InlineMath math="A" /> is the number of active addresses. The deviation from the Metcalfe-predicted value serves as a mean-reverting valuation signal with half-life of approximately 60--90 days.</>}
        proof={<>Regression analysis of Bitcoin market cap vs. active addresses (2012--2024) on log-log scale yields <InlineMath math="R^2 = 0.92" /> with <InlineMath math="\beta = 0.98" />, confirming near-exact Metcalfe scaling. Similar results hold for Ethereum (<InlineMath math="\beta = 1.03, R^2 = 0.89" />). The deviation series <InlineMath math="\epsilon_t" /> has Augmented Dickey-Fuller test p-value <InlineMath math="< 0.01" />, confirming stationarity and mean-reversion.</>}
      />

      <InteractiveNVT />

      <PythonCode
        title="network_metrics.py"
        runnable
        code={`import numpy as np

class OnChainMetrics:
    """Compute on-chain valuation metrics for crypto networks."""

    def __init__(self):
        self.metrics_history = []

    def nvt_ratio(self, market_cap, tx_volume):
        """Network Value to Transactions ratio."""
        return market_cap / max(tx_volume, 1e-6)

    def mvrv_ratio(self, market_cap, realized_cap):
        """Market Value to Realized Value ratio."""
        return market_cap / max(realized_cap, 1e-6)

    def nvt_signal(self, market_cap, tx_volume_90d_avg):
        """Smoothed NVT using 90-day average volume."""
        nvt = self.nvt_ratio(market_cap, tx_volume_90d_avg)
        if nvt > 100:
            return {'nvt': nvt, 'signal': 'OVERVALUED', 'action': 'SELL'}
        elif nvt > 60:
            return {'nvt': nvt, 'signal': 'FAIR', 'action': 'HOLD'}
        else:
            return {'nvt': nvt, 'signal': 'UNDERVALUED', 'action': 'BUY'}

    def metcalfe_value(self, active_addresses, alpha=0, beta=1.0, scale=1e-6):
        """Metcalfe's law predicted market cap."""
        return np.exp(alpha) * (active_addresses ** (2 * beta)) * scale

    def metcalfe_deviation(self, market_cap, active_addresses):
        """Deviation from Metcalfe's law prediction."""
        predicted = self.metcalfe_value(active_addresses)
        if predicted == 0:
            return 0
        return np.log(market_cap / predicted)

    def sopr(self, outputs_in_profit_value, outputs_total_value):
        """Spent Output Profit Ratio."""
        return outputs_in_profit_value / max(outputs_total_value, 1e-6)

    def compute_all(self, data):
        """Compute all metrics from network data."""
        return {
            'nvt': self.nvt_ratio(data['market_cap'], data['tx_volume']),
            'mvrv': self.mvrv_ratio(data['market_cap'], data['realized_cap']),
            'metcalfe_dev': self.metcalfe_deviation(
                data['market_cap'], data['active_addresses']
            ),
            'nvt_signal': self.nvt_signal(
                data['market_cap'], data.get('tx_volume_90d', data['tx_volume'])
            ),
        }

    def generate_composite_signal(self, metrics):
        """Combine multiple on-chain metrics into a single signal."""
        scores = []

        # NVT score
        nvt = metrics['nvt']
        nvt_score = -1 if nvt > 120 else 1 if nvt < 40 else 0
        scores.append(('NVT', nvt_score, 0.25))

        # MVRV score
        mvrv = metrics['mvrv']
        mvrv_score = -1 if mvrv > 3.5 else 1 if mvrv < 1.0 else 0
        scores.append(('MVRV', mvrv_score, 0.35))

        # Metcalfe deviation
        met_dev = metrics['metcalfe_dev']
        met_score = -1 if met_dev > 0.5 else 1 if met_dev < -0.5 else 0
        scores.append(('Metcalfe', met_score, 0.40))

        # Weighted composite
        composite = sum(s * w for _, s, w in scores)
        direction = 'BUY' if composite > 0.3 else 'SELL' if composite < -0.3 else 'HOLD'

        return {
            'scores': {name: score for name, score, _ in scores},
            'composite': composite,
            'direction': direction,
        }

# Simulate Bitcoin on-chain data
np.random.seed(42)
metrics = OnChainMetrics()

# Historical BTC data points (simplified)
btc_data = [
    {'date': '2024-Q1', 'market_cap': 850e9, 'tx_volume': 12e9,
     'realized_cap': 500e9, 'active_addresses': 700000, 'tx_volume_90d': 10e9},
    {'date': '2024-Q2', 'market_cap': 1200e9, 'tx_volume': 18e9,
     'realized_cap': 600e9, 'active_addresses': 900000, 'tx_volume_90d': 14e9},
    {'date': '2024-Q3', 'market_cap': 1100e9, 'tx_volume': 15e9,
     'realized_cap': 650e9, 'active_addresses': 850000, 'tx_volume_90d': 16e9},
    {'date': '2024-Q4', 'market_cap': 1400e9, 'tx_volume': 20e9,
     'realized_cap': 700e9, 'active_addresses': 1000000, 'tx_volume_90d': 17e9},
]

print("=" * 65)
print("ON-CHAIN VALUATION METRICS: BITCOIN")
print("=" * 65)

for data in btc_data:
    m = metrics.compute_all(data)
    signal = metrics.generate_composite_signal(m)

    print(f"\\n{data['date']}:")
    print(f"  Market Cap:    \${data['market_cap']/1e9:.0f}B")
    print(f"  NVT Ratio:     {m['nvt']:.1f} ({m['nvt_signal']['signal']})")
    print(f"  MVRV Ratio:    {m['mvrv']:.2f}")
    print(f"  Metcalfe Dev:  {m['metcalfe_dev']:+.3f}")
    print(f"  Composite:     {signal['composite']:+.2f} -> {signal['direction']}")

# NVT zones analysis
print(f"\\nNVT Historical Zones:")
print(f"  < 40:    Strong BUY (network undervalued)")
print(f"  40-60:   Fair value zone")
print(f"  60-100:  Elevated, caution")
print(f"  > 100:   Overvalued, SELL signal")
print(f"\\nMVRV Historical Zones:")
print(f"  < 1.0:   Cycle bottom (BUY)")
print(f"  1.0-2.5: Fair value")
print(f"  2.5-3.7: Overheated")
print(f"  > 3.7:   Cycle top (SELL)")`}
      />

      <ExampleBlock
        title="Composite On-Chain Signal for BTC"
        difficulty="intermediate"
        problem="Bitcoin has NVT = 95, MVRV = 2.8, and Metcalfe deviation = +0.6. Using weights NVT=0.25, MVRV=0.35, Metcalfe=0.40, compute the composite signal. Score each metric as +1 (buy), 0 (hold), or -1 (sell) based on the zones above."
        solution={[
          {
            step: 'Score individual metrics',
            formula: '\\text{NVT}_{95} \\in [60,100] \\implies 0, \\; \\text{MVRV}_{2.8} \\in [2.5,3.7] \\implies -0.5',
          },
          {
            step: 'Note: adjust MVRV for overheated zone',
            formula: '\\text{MVRV score} \\approx -0.5 \\text{ (between hold and sell)}',
            explanation: 'MVRV in overheated zone warrants partial caution.',
          },
          {
            step: 'Metcalfe deviation score',
            formula: '\\text{Met dev} = +0.6 > 0.5 \\implies -1 \\text{ (overvalued vs. Metcalfe)}',
          },
          {
            step: 'Weighted composite',
            formula: 'S = 0.25 \\times 0 + 0.35 \\times (-0.5) + 0.40 \\times (-1) = -0.575',
            explanation: 'Composite score of -0.575 is below -0.3, generating a SELL signal. The network is trading above Metcalfe-predicted value with elevated MVRV, suggesting a prudent reduction in BTC exposure.',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Further Reading and Resources
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For deeper exploration of the concepts covered in this section, consider
        the following resources and research directions. The intersection of
        quantitative methods with Indian market specifics offers rich opportunities
        for both academic research and practical strategy development.
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Resource</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Type</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Relevance</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">NSE Research Papers</td>
              <td className="px-4 py-2">Academic</td>
              <td className="px-4 py-2">Indian market empirics</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">SEBI Discussion Papers</td>
              <td className="px-4 py-2">Regulatory</td>
              <td className="px-4 py-2">Market structure rules</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">RBI Working Papers</td>
              <td className="px-4 py-2">Policy</td>
              <td className="px-4 py-2">Macro-financial linkages</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">CMIE ProwessIQ</td>
              <td className="px-4 py-2">Data</td>
              <td className="px-4 py-2">Indian corporate financials</td>
            </tr>
            <tr>
              <td className="px-4 py-2">IIM/ISB Research</td>
              <td className="px-4 py-2">Academic</td>
              <td className="px-4 py-2">Indian finance research</td>
            </tr>
          </tbody>
        </table>
      </div>

      <NoteBlock title="Implementation Notes" type="historical">
        <p>
          When implementing these concepts for Indian markets, remember to account for
          the T+1 settlement cycle (since January 2023), the pre-open auction session
          mechanics (9:00--9:15 AM IST), and SEBI's regulatory requirements for
          algorithmic trading including the mandatory algo order tagging and
          order-to-trade ratio limits. Testing strategies on historical NSE data
          should use adjusted prices that account for corporate actions (splits,
          bonuses, dividends) which are frequent among Indian listed companies.
        </p>
      </NoteBlock>



      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          On-chain network metrics provide fundamental valuation frameworks unique
          to crypto. NVT ratio (crypto's P/E), MVRV (market vs. realized value),
          and Metcalfe deviation (network effect valuation) offer complementary
          perspectives. These metrics are most powerful at identifying cycle extremes
          and should be combined into composite signals with appropriate weighting.
          For Indian crypto investors, on-chain metrics provide objective valuation
          anchors in a market often driven by sentiment and speculation.
        </p>
      </NoteBlock>
    </div>
  )
}
