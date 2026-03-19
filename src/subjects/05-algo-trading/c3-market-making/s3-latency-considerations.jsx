import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveLatencyImpact() {
  const [latencyUs, setLatencyUs] = useState(50)
  const [tickSize, setTickSize] = useState(0.05)
  const [tradesPerDay, setTradesPerDay] = useState(500)

  const baseEdge = 0.3
  const edgeLost = Math.min(baseEdge, latencyUs * 0.002)
  const netEdge = Math.max(0, baseEdge - edgeLost)
  const dailyPnl = netEdge * tradesPerDay * tickSize * 25
  const annualPnl = dailyPnl * 252

  const latencyLevels = [
    { us: 5, label: 'Co-location', color: '#22c55e' },
    { us: 50, label: 'Same city', color: '#f59e0b' },
    { us: 200, label: 'Metro', color: '#ef4444' },
    { us: 1000, label: 'Remote', color: '#7f1d1d' },
  ]

  const chartW = 400
  const chartH = 120

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Latency Impact on Market Making P&L
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        See how round-trip latency erodes market making edge on NSE Nifty futures.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Latency: {latencyUs} microseconds</span>
          <input type="range" min="1" max="500" step="1" value={latencyUs}
            onChange={e => setLatencyUs(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Tick Size: {tickSize} pts</span>
          <input type="range" min="0.05" max="0.5" step="0.05" value={tickSize}
            onChange={e => setTickSize(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Trades/Day: {tradesPerDay}</span>
          <input type="range" min="100" max="2000" step="50" value={tradesPerDay}
            onChange={e => setTradesPerDay(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full max-w-lg mx-auto block">
        {latencyLevels.map((level, i) => {
          const edge = Math.max(0, baseEdge - level.us * 0.002)
          const barW = (edge / baseEdge) * (chartW - 100)
          const y = 10 + i * 28
          return (
            <g key={i}>
              <text x="0" y={y + 12} className="text-[9px]" fill="#6b7280">{level.label}</text>
              <rect x="70" y={y} width={barW} height="18" rx="3" fill={level.color} opacity="0.7" />
              <text x={75 + barW} y={y + 12} className="text-[9px]" fill="#374151">
                {(edge * 100).toFixed(0)}% edge | INR {(edge * tradesPerDay * tickSize * 25 * 252 / 100000).toFixed(1)}L/yr
              </text>
            </g>
          )
        })}
      </svg>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <p className="text-xs text-gray-500">Net Edge</p>
          <p className={`text-lg font-bold ${netEdge > 0.1 ? 'text-green-600' : 'text-red-500'}`}>{(netEdge * 100).toFixed(1)}%</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <p className="text-xs text-gray-500">Daily P&L</p>
          <p className="text-lg font-bold text-gray-800 dark:text-gray-200">INR {dailyPnl.toFixed(0)}</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <p className="text-xs text-gray-500">Annual P&L</p>
          <p className="text-lg font-bold text-gray-800 dark:text-gray-200">INR {(annualPnl / 100000).toFixed(1)}L</p>
        </div>
      </div>
    </div>
  )
}

export default function LatencyConsiderations() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        NSE Co-Location and SEBI Fair Access Norms
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        In high-frequency market making, latency is the ultimate competitive advantage. On the
        NSE, the co-location (colo) facility at the exchange's data center in Mumbai provides
        the lowest possible latency for order placement and market data receipt. However, SEBI's
        fair access norms ensure that all co-location participants receive equal treatment,
        preventing any single firm from gaining unfair speed advantages.
      </p>

      <DefinitionBlock
        title="Co-Location (Colo)"
        label="Definition 5.9"
        definition="Co-location is the practice of placing trading servers in the same data center as the exchange's matching engine. This minimizes the physical distance and network hops between the trader's system and the exchange, reducing round-trip latency to microseconds. NSE's co-location facility is located at its primary data center in Mumbai."
        notation={<>Round-trip latency: <InlineMath math="\tau_{RT} = \tau_{network} + \tau_{processing} + \tau_{matching}" />. In co-location, <InlineMath math="\tau_{network} \approx 5-10\,\mu s" />.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        NSE Technology Infrastructure
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        NSE operates one of the world's most advanced exchange platforms. Key specifications:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Parameter</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Specification</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Matching engine</td>
              <td className="px-5 py-2">INET-based, price-time priority</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Order processing capacity</td>
              <td className="px-5 py-2">~100,000 orders per second</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Median latency (colo)</td>
              <td className="px-5 py-2">~40-60 microseconds</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Market data protocol</td>
              <td className="px-5 py-2">TCP (order entry), UDP multicast (market data)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Co-location racks</td>
              <td className="px-5 py-2">Full rack / half rack / quarter rack</td>
            </tr>
            <tr>
              <td className="px-5 py-2">Equal-length cables</td>
              <td className="px-5 py-2">SEBI mandated for fair access</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        SEBI Fair Access Framework
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Following the 2015 NSE co-location controversy, SEBI issued comprehensive guidelines
        to ensure fair and transparent access to exchange infrastructure:
      </p>

      <BlockMath math="\text{Fair Access Principle: } \tau_i \approx \tau_j \quad \forall \text{ colo participants } i, j" />

      <NoteBlock title="SEBI Co-location Guidelines" type="warning">
        <p>
          Key SEBI requirements include: (1) Equal-length network cables from matching engine
          to all racks, (2) UDP multicast for market data (replaces TCP-based tick-by-tick feed
          that gave first-mover advantage), (3) Regular audits of infrastructure fairness,
          (4) Prohibition on preferential access or dark fiber connections, (5) Mandatory
          disclosure of all co-location arrangements, and (6) Order-to-trade ratio limits to
          prevent excessive messaging.
        </p>
      </NoteBlock>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Latency Components
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The total round-trip time for a market making system on NSE can be decomposed:
      </p>

      <BlockMath math="\tau_{total} = \underbrace{\tau_{feed}}_{\text{market data}} + \underbrace{\tau_{decode}}_{\text{parsing}} + \underbrace{\tau_{strategy}}_{\text{logic}} + \underbrace{\tau_{encode}}_{\text{order build}} + \underbrace{\tau_{wire}}_{\text{network}} + \underbrace{\tau_{match}}_{\text{exchange}}" />

      <TheoremBlock
        title="Latency-Edge Relationship"
        label="Theorem 5.9"
        statement={<>For a market maker competing in a zero-sum speed game, the expected profit per trade decays with latency. If the fastest competitor has latency <InlineMath math="\tau_1" /> and our latency is <InlineMath math="\tau" />, the probability of being adversely selected (filled on stale quotes) increases approximately as: <BlockMath math="P(\text{adverse selection}) \propto 1 - e^{-\lambda(\tau - \tau_1)}" /> where <InlineMath math="\lambda" /> is the rate of price-moving events. This implies that every microsecond of additional latency costs a quantifiable amount of expected P&L.</>}
      />

      <InteractiveLatencyImpact />

      <PythonCode
        title="latency_analysis_nse.py"
        runnable
        code={`import numpy as np

# Latency Impact Analysis for NSE Market Making
np.random.seed(42)

# NSE Co-location Latency Model
class LatencyModel:
    def __init__(self, colo_latency_us=50, remote_latency_us=500):
        self.colo_latency = colo_latency_us  # microseconds
        self.remote_latency = remote_latency_us

    def simulate_race(self, n_events=10000):
        """Simulate speed races between colo and remote trader."""
        # Price-moving events arrive as Poisson process
        event_rate = 100  # events per second

        colo_wins = 0
        remote_wins = 0
        ties = 0

        for _ in range(n_events):
            # Both see the event; who reacts first?
            colo_reaction = self.colo_latency + np.random.exponential(10)
            remote_reaction = self.remote_latency + np.random.exponential(20)

            if colo_reaction < remote_reaction:
                colo_wins += 1
            elif remote_reaction < colo_reaction:
                remote_wins += 1
            else:
                ties += 1

        return {
            'colo_win_rate': colo_wins / n_events,
            'remote_win_rate': remote_wins / n_events,
            'total_events': n_events
        }

# Run simulation
model = LatencyModel()
results = model.simulate_race()

print("=== NSE Co-location Speed Analysis ===")
print(f"Co-location win rate:  {results['colo_win_rate']*100:.1f}%")
print(f"Remote win rate:       {results['remote_win_rate']*100:.1f}%")
print(f"Events simulated:      {results['total_events']}")

# Latency breakdown for a typical NSE market making system
print(f"\\n=== Latency Budget (Microseconds) ===")
components = {
    'Market data decode': 5,
    'Strategy logic': 3,
    'Risk checks': 2,
    'Order encode': 2,
    'Network (colo)': 8,
    'Exchange matching': 25,
}
total = sum(components.values())
print(f"{'Component':<25} {'Latency (us)':<15} {'% of Total':<12}")
for comp, lat in components.items():
    print(f"{comp:<25} {lat:<15} {lat/total*100:<12.1f}%")
print(f"{'TOTAL':<25} {total:<15}")

# P&L impact of latency
print(f"\\n=== Annual P&L Impact of Latency ===")
latencies = [5, 10, 50, 100, 500, 1000]
base_edge_per_trade = 0.3  # ticks
tick_value = 0.05 * 25     # Nifty tick * lot size = INR 1.25
trades_per_day = 500
trading_days = 252

for lat in latencies:
    edge_decay = min(base_edge_per_trade, lat * 0.002)
    net_edge = max(0, base_edge_per_trade - edge_decay)
    daily_pnl = net_edge * trades_per_day * tick_value
    annual_pnl = daily_pnl * trading_days

    label = 'Colo' if lat <= 10 else ('City' if lat <= 100 else 'Remote')
    print(f"{lat:>6} us ({label:<6}): Edge = {net_edge:.2f} ticks, "
          f"Annual P&L = INR {annual_pnl:>10,.0f} "
          f"({annual_pnl/100000:.1f} lakhs)")

# SEBI Order-to-Trade (OTR) Ratio Analysis
print(f"\\n=== SEBI Order-to-Trade Ratio Limits ===")
orders_per_day = 50000
fills_per_day = 500
otr = orders_per_day / fills_per_day

print(f"Orders submitted:    {orders_per_day:,}")
print(f"Trades executed:     {fills_per_day:,}")
print(f"OTR ratio:           {otr:.0f}:1")
print(f"SEBI limit:          500:1")
print(f"Status:              {'OK' if otr < 500 else 'EXCEEDED - penalty applicable'}")

# NSE co-location costs
print(f"\\n=== NSE Co-location Cost Structure ===")
costs = {
    'Full rack (monthly)': 250000,
    'Cross-connect (monthly)': 50000,
    'Market data feed (monthly)': 100000,
    'Bandwidth 1Gbps (monthly)': 75000,
    'Power per kW (monthly)': 15000,
}
monthly_total = sum(costs.values())
for item, cost in costs.items():
    print(f"  {item:<30} INR {cost:>10,}")
print(f"  {'TOTAL MONTHLY':<30} INR {monthly_total:>10,}")
print(f"  {'TOTAL ANNUAL':<30} INR {monthly_total*12:>10,}")`}
      />

      <ExampleBlock
        title="Latency Arbitrage Calculation"
        difficulty="advanced"
        problem={<>A co-located market maker on NSE has 50us round-trip latency. A price-moving event occurs (e.g., large Nifty futures trade). The fair price moves from 22,000.00 to 22,000.50. A remote trader at 500us latency has a stale sell order at 22,000.25. What is the latency arbitrage profit?</>}
        solution={[
          {
            step: 'Identify the opportunity window',
            formula: '\\Delta\\tau = 500 - 50 = 450\\,\\mu s',
            explanation: 'The colo trader has a 450 microsecond window to act before the remote trader can update their quote.',
          },
          {
            step: 'Calculate adverse selection profit',
            formula: '\\text{Profit} = 22000.50 - 22000.25 = 0.25 \\text{ points}',
            explanation: 'The colo trader can buy the stale offer at 22,000.25 knowing fair value is 22,000.50.',
          },
          {
            step: 'Compute profit per lot',
            formula: '\\text{P\\&L} = 0.25 \\times 25 = \\text{INR } 6.25 \\text{ per lot}',
            explanation: 'With Nifty lot size of 25 units, profit is INR 6.25 per occurrence. Over hundreds of events daily, this compounds significantly.',
          },
        ]}
      />

      <NoteBlock title="The NSE Co-location Case" type="historical">
        <p>
          In 2015, whistleblower allegations revealed that certain brokers received preferential
          access to NSE's co-location facility through a TCP-based market data feed (TBT) that
          delivered data sequentially rather than simultaneously. SEBI investigated and found
          that the system allowed the first connected server to receive data before others. This
          led to significant regulatory reforms: SEBI mandated UDP multicast for market data
          (simultaneous delivery), equal-length cables, and regular infrastructure audits. The
          case highlighted the importance of fair access in electronic markets and led to
          penalties on NSE officials.
        </p>
      </NoteBlock>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Technology Stack for NSE HFT
      </h3>
      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Layer</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Technology</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Latency</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Network</td>
              <td className="px-5 py-2">Kernel bypass (DPDK, Solarflare)</td>
              <td className="px-5 py-2">&lt;1 us</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Language</td>
              <td className="px-5 py-2">C++ (lock-free), FPGA for ultra-low</td>
              <td className="px-5 py-2">1-5 us</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Market data</td>
              <td className="px-5 py-2">UDP multicast, hardware timestamping</td>
              <td className="px-5 py-2">2-5 us</td>
            </tr>
            <tr>
              <td className="px-5 py-2">Order gateway</td>
              <td className="px-5 py-2">FIX protocol, binary protocol</td>
              <td className="px-5 py-2">5-10 us</td>
            </tr>
          </tbody>
        </table>
      </div>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Latency is a critical factor for market making on the NSE. Co-location provides
          round-trip times of 40-60 microseconds, while remote connections suffer 500+ microsecond
          delays. SEBI's fair access norms ensure equal treatment within co-location but cannot
          eliminate the fundamental speed advantage of proximity. For market makers, every
          microsecond of latency reduction translates directly to better adverse selection
          management and higher expected P&L. The technology stack must optimize at every layer:
          network (kernel bypass), application (C++/FPGA), and protocol (binary encoding).
        </p>
      </NoteBlock>
    </div>
  )
}
