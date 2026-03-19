import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveDashboard() {
  const [niftyChange, setNiftyChange] = useState(0.5)
  const [portfolioPnl, setPortfolioPnl] = useState(15000)
  const [exposure, setExposure] = useState(65)
  const [openPositions, setOpenPositions] = useState(12)

  const sharpeDaily = portfolioPnl / (Math.abs(portfolioPnl) * 0.3 + 5000)
  const beta = portfolioPnl / (niftyChange * 10000 + 0.001)
  const isHealthy = exposure < 80 && portfolioPnl > -50000

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Real-Time P&amp;L Dashboard
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Simulate a live trading dashboard monitoring your NSE portfolio performance.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Nifty 50 Change (%): {niftyChange.toFixed(1)}</span>
          <input type="range" min="-5" max="5" step="0.1" value={niftyChange}
            onChange={e => setNiftyChange(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Portfolio P&amp;L: INR {(portfolioPnl / 1000).toFixed(1)}K</span>
          <input type="range" min="-100000" max="100000" step="1000" value={portfolioPnl}
            onChange={e => setPortfolioPnl(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Exposure (%): {exposure}</span>
          <input type="range" min="0" max="100" step="1" value={exposure}
            onChange={e => setExposure(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Open Positions: {openPositions}</span>
          <input type="range" min="0" max="50" step="1" value={openPositions}
            onChange={e => setOpenPositions(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 text-center">
        <div className={`rounded-lg p-3 ${portfolioPnl >= 0 ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'}`}>
          <div className="text-[10px] text-gray-500">Day P&amp;L</div>
          <div className={`text-lg font-bold ${portfolioPnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {portfolioPnl >= 0 ? '+' : ''}INR {(portfolioPnl / 1000).toFixed(1)}K
          </div>
        </div>
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
          <div className="text-[10px] text-gray-500">Nifty 50</div>
          <div className={`text-lg font-bold ${niftyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {niftyChange >= 0 ? '+' : ''}{niftyChange.toFixed(1)}%
          </div>
        </div>
        <div className={`rounded-lg p-3 ${exposure > 80 ? 'bg-red-50 dark:bg-red-900/30' : 'bg-purple-50 dark:bg-purple-900/30'}`}>
          <div className="text-[10px] text-gray-500">Exposure</div>
          <div className={`text-lg font-bold ${exposure > 80 ? 'text-red-600' : 'text-purple-600'}`}>
            {exposure}%
          </div>
        </div>
        <div className="rounded-lg bg-orange-50 p-3 dark:bg-orange-900/30">
          <div className="text-[10px] text-gray-500">Positions</div>
          <div className="text-lg font-bold text-orange-600">{openPositions}</div>
        </div>
        <div className={`rounded-lg p-3 ${isHealthy ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'}`}>
          <div className="text-[10px] text-gray-500">System Health</div>
          <div className={`text-lg font-bold ${isHealthy ? 'text-green-600' : 'text-red-600'}`}>
            {isHealthy ? 'HEALTHY' : 'ALERT'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function RealTimeMonitoring() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Real-Time P&amp;L Dashboards
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Real-time monitoring is the nervous system of a live trading operation. For strategies
        trading on NSE, continuous P&amp;L tracking, exposure monitoring, and system health
        checks are essential for risk management and regulatory compliance (SEBI mandates
        real-time monitoring for all algo trading systems).
      </p>

      <DefinitionBlock
        title="Real-Time P&L Attribution"
        label="Definition 18.7"
        definition="Real-time P&L attribution decomposes the portfolio profit and loss into contributions from individual positions, market factors, and strategy alpha. For a portfolio with N positions, the instantaneous P&L is: sum of (quantity_i x delta_price_i) for each position i, computed tick-by-tick during NSE trading hours."
        notation="P&L is tracked in INR with attribution to: alpha (signal-driven), beta (market exposure), sector, and individual stock contributions."
      />

      <BlockMath math="\text{PnL}(t) = \sum_{i=1}^{N} q_i \cdot (p_i(t) - p_i(t_{\text{entry}})) - \sum_{j} C_j" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="q_i" /> is the position quantity, <InlineMath math="p_i(t)" />{' '}
        is the current NSE price, <InlineMath math="p_i(t_{\text{entry}})" /> is the entry price,
        and <InlineMath math="C_j" /> are all transaction costs (brokerage, STT, GST, stamp duty).
      </p>

      <InteractiveDashboard />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        P&amp;L Attribution Framework
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A proper attribution decomposes P&amp;L into systematic and idiosyncratic components
        using factor models:
      </p>

      <BlockMath math="\text{PnL} = \underbrace{\beta_M \cdot R_{\text{Nifty}}}_{\text{Market}} + \underbrace{\sum_k \beta_k \cdot R_k}_{\text{Sector/Factor}} + \underbrace{\alpha}_{\text{Strategy Alpha}} + \underbrace{\epsilon}_{\text{Residual}}" />

      <TheoremBlock
        title="Real-Time Sharpe Estimation"
        label="Theorem 18.7"
        statement="The intraday rolling Sharpe ratio at time $t$ over the past $w$ observations is: $\hat{S}(t) = \frac{\bar{r}_w(t)}{\hat{\sigma}_w(t)} \cdot \sqrt{252 \cdot N_{\text{daily}}}$ where $N_{\text{daily}}$ is the number of return observations per day. For monitoring purposes, a 20-day rolling Sharpe with exponential weighting provides the best tradeoff between responsiveness and stability."
        proof="The annualization factor converts per-observation Sharpe to annual. With 375 minutes per NSE trading day and minute-level returns, $N_{\text{daily}} = 375$. The rolling window $w$ should be at least 100 observations for statistical stability, corresponding to approximately 20 trading days."
      />

      <PythonCode
        title="realtime_monitor.py"
        runnable
        code={`import numpy as np
from datetime import datetime, time, timedelta
from dataclasses import dataclass, field
from typing import Dict, List, Optional

@dataclass
class PositionSnapshot:
    symbol: str
    quantity: int
    avg_price: float
    current_price: float
    sector: str = ''

    @property
    def unrealized_pnl(self) -> float:
        return self.quantity * (self.current_price - self.avg_price)

    @property
    def market_value(self) -> float:
        return abs(self.quantity * self.current_price)

class RealTimeMonitor:
    """Real-time P&L and risk monitoring for NSE trading."""

    def __init__(self, initial_capital: float):
        self.capital = initial_capital
        self.positions: Dict[str, PositionSnapshot] = {}
        self.pnl_history: List[float] = []
        self.alerts: List[dict] = []

        # Alert thresholds
        self.max_daily_loss = initial_capital * 0.02  # 2%
        self.max_drawdown = initial_capital * 0.05    # 5%
        self.max_exposure = 0.80                       # 80%
        self.max_concentration = 0.15                  # 15%

    def update_price(self, symbol: str, price: float):
        """Update position with new NSE tick."""
        if symbol in self.positions:
            self.positions[symbol].current_price = price

    def get_portfolio_pnl(self) -> dict:
        """Calculate real-time portfolio P&L."""
        total_pnl = sum(
            p.unrealized_pnl for p in self.positions.values()
        )
        gross_exposure = sum(
            p.market_value for p in self.positions.values()
        )
        long_exposure = sum(
            p.market_value for p in self.positions.values()
            if p.quantity > 0
        )
        short_exposure = sum(
            p.market_value for p in self.positions.values()
            if p.quantity < 0
        )

        # Sector attribution
        sector_pnl = {}
        for p in self.positions.values():
            sector = p.sector or 'Unknown'
            sector_pnl[sector] = sector_pnl.get(sector, 0) + p.unrealized_pnl

        # Top winners and losers
        sorted_pos = sorted(
            self.positions.values(),
            key=lambda p: p.unrealized_pnl
        )

        return {
            'total_pnl': total_pnl,
            'pnl_pct': total_pnl / self.capital * 100,
            'gross_exposure': gross_exposure,
            'exposure_pct': gross_exposure / self.capital * 100,
            'long_exposure': long_exposure,
            'short_exposure': short_exposure,
            'n_positions': len(self.positions),
            'sector_attribution': sector_pnl,
            'top_winner': sorted_pos[-1].symbol if sorted_pos else None,
            'top_loser': sorted_pos[0].symbol if sorted_pos else None,
        }

    def check_alerts(self) -> List[dict]:
        """Run all alert checks."""
        alerts = []
        pnl = self.get_portfolio_pnl()

        # Daily loss check
        if pnl['total_pnl'] < -self.max_daily_loss:
            alerts.append({
                'level': 'CRITICAL',
                'type': 'DAILY_LOSS_BREACH',
                'message': f"Daily loss INR {pnl['total_pnl']:,.0f} exceeds limit",
                'action': 'FLATTEN_ALL_POSITIONS',
            })

        # Exposure check
        if pnl['exposure_pct'] > self.max_exposure * 100:
            alerts.append({
                'level': 'WARNING',
                'type': 'EXPOSURE_BREACH',
                'message': f"Exposure {pnl['exposure_pct']:.1f}% exceeds {self.max_exposure*100}%",
                'action': 'REDUCE_POSITIONS',
            })

        # Concentration check
        for p in self.positions.values():
            conc = p.market_value / self.capital
            if conc > self.max_concentration:
                alerts.append({
                    'level': 'WARNING',
                    'type': 'CONCENTRATION',
                    'message': f"{p.symbol} concentration {conc:.1%} exceeds limit",
                    'action': 'REDUCE_POSITION',
                })

        return alerts

    def generate_report(self) -> str:
        """Generate real-time status report."""
        pnl = self.get_portfolio_pnl()
        alerts = self.check_alerts()

        lines = [
            "=" * 50,
            f"  REAL-TIME TRADING MONITOR",
            f"  {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} IST",
            "=" * 50,
            f"  Portfolio P&L:  INR {pnl['total_pnl']:>12,.0f} ({pnl['pnl_pct']:+.2f}%)",
            f"  Gross Exposure: INR {pnl['gross_exposure']:>12,.0f} ({pnl['exposure_pct']:.1f}%)",
            f"  Long:           INR {pnl['long_exposure']:>12,.0f}",
            f"  Short:          INR {pnl['short_exposure']:>12,.0f}",
            f"  Positions:      {pnl['n_positions']}",
            "",
            "  --- Sector Attribution ---",
        ]
        for sector, spnl in sorted(
            pnl['sector_attribution'].items(),
            key=lambda x: x[1], reverse=True
        ):
            lines.append(f"    {sector:15s}: INR {spnl:>10,.0f}")

        if alerts:
            lines.extend(["", "  --- ALERTS ---"])
            for a in alerts:
                lines.append(f"  [{a['level']}] {a['message']}")

        return "\\n".join(lines)

# Demo: simulate live monitoring
monitor = RealTimeMonitor(initial_capital=5_000_000)

# Add positions (Nifty 50 stocks)
positions_data = [
    ('RELIANCE', 100, 2420, 2455, 'Energy'),
    ('TCS', 50, 3480, 3512, 'IT'),
    ('HDFCBANK', 200, 1660, 1685, 'Banking'),
    ('INFY', 150, 1430, 1449, 'IT'),
    ('ICICIBANK', 300, 1010, 1026, 'Banking'),
    ('ITC', 500, 435, 440, 'FMCG'),
    ('SBIN', -200, 635, 628, 'Banking'),
    ('BHARTIARTL', 100, 1160, 1180, 'Telecom'),
    ('HINDUNILVR', -50, 2600, 2580, 'FMCG'),
    ('KOTAKBANK', 100, 1760, 1782, 'Banking'),
]

for sym, qty, avg, curr, sector in positions_data:
    monitor.positions[sym] = PositionSnapshot(
        symbol=sym, quantity=qty,
        avg_price=avg, current_price=curr,
        sector=sector
    )

# Generate and print report
report = monitor.generate_report()
print(report)

# Check individual position P&L
print("\\n  --- Position Details ---")
for sym, pos in sorted(
    monitor.positions.items(),
    key=lambda x: x[1].unrealized_pnl, reverse=True
):
    print(f"    {sym:12s}: {pos.quantity:>5d} x INR {pos.current_price:>8.2f}"
          f"  P&L: INR {pos.unrealized_pnl:>10,.0f}")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Dashboard Metrics for NSE Trading
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A production monitoring dashboard should display these metrics in real-time,
        refreshed every second during NSE trading hours:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Metric</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Update Freq</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Alert Threshold</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Total P&amp;L</td>
              <td className="px-4 py-2">Tick-level</td>
              <td className="px-4 py-2">&gt; 2% daily loss</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Gross Exposure</td>
              <td className="px-4 py-2">1 second</td>
              <td className="px-4 py-2">&gt; 80% of capital</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Rolling Sharpe</td>
              <td className="px-4 py-2">1 minute</td>
              <td className="px-4 py-2">&lt; 0.5 (20-day)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Max Drawdown</td>
              <td className="px-4 py-2">1 minute</td>
              <td className="px-4 py-2">&gt; 5% from peak</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Order Fill Rate</td>
              <td className="px-4 py-2">Per order</td>
              <td className="px-4 py-2">&lt; 90%</td>
            </tr>
            <tr>
              <td className="px-4 py-2">System Latency</td>
              <td className="px-4 py-2">Per tick</td>
              <td className="px-4 py-2">&gt; 200ms p99</td>
            </tr>
          </tbody>
        </table>
      </div>

      <ExampleBlock
        title="Setting Up Grafana for NSE Trading"
        difficulty="intermediate"
        problem="You need to create a Grafana dashboard that shows real-time P&L for your Nifty 50 strategy. The data is stored in TimescaleDB with 1-second granularity. Design the key panels and queries."
        solution={[
          {
            step: 'P&L time series panel',
            formula: '\\text{SELECT time, cumulative\\_pnl FROM trades\\_pnl WHERE time > now() - 1d}',
            explanation: 'A line chart showing cumulative P&L throughout the trading day with markers for each trade execution.',
          },
          {
            step: 'Exposure gauge panel',
            formula: '\\text{exposure}(t) = \\frac{\\sum |q_i \\cdot p_i(t)|}{\\text{capital}} \\times 100',
            explanation: 'A gauge showing current gross exposure as a percentage of capital, with color zones: green (<60%), yellow (60-80%), red (>80%).',
          },
          {
            step: 'Position heatmap',
            formula: '\\text{PnL}_i = q_i \\cdot (p_i(t) - p_{i,\\text{entry}})',
            explanation: 'A treemap or heatmap showing each position colored by its P&L contribution, sized by market value. Groups by sector (Banking, IT, FMCG, etc.).',
          },
          {
            step: 'Alert configuration',
            formula: '\\text{IF } \\text{PnL} < -0.02 \\times \\text{capital THEN alert}',
            explanation: 'Configure Grafana alerts to send notifications via Telegram/Slack when daily loss exceeds 2% of capital.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Real-time monitoring is not optional for live trading on NSE -- it is a{' '}
          <strong>regulatory requirement and a risk management necessity</strong>. Build
          dashboards that provide instant visibility into P&amp;L, exposure, drawdown, and
          system health. Use Grafana with TimescaleDB for visualization, and configure
          automated alerts for critical thresholds. Every second of delayed awareness during
          a market crash can cost thousands of rupees.
        </p>
      </NoteBlock>
    </div>
  )
}
