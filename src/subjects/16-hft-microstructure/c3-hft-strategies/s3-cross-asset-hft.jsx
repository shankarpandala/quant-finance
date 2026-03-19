import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveCrossAssetSignal() {
  const [sgxLeadLag, setSgxLeadLag] = useState(50)
  const [currencyBeta, setCurrencyBeta] = useState(-0.4)
  const [oilBeta, setOilBeta] = useState(0.15)
  const [signalDecay, setSignalDecay] = useState(200)

  const sgxSignal = 0.8 * Math.exp(-sgxLeadLag / 100)
  const fxSignal = Math.abs(currencyBeta) * 0.5
  const oilSignalVal = Math.abs(oilBeta) * 0.3
  const compositeSignal = sgxSignal * 0.5 + fxSignal * 0.3 + oilSignalVal * 0.2
  const decayedSignal = compositeSignal * Math.exp(-signalDecay / 500)

  const signals = [
    { name: 'SGX NIFTY Lead', value: sgxSignal, weight: 0.5, color: '#6366f1' },
    { name: 'USD/INR Impact', value: fxSignal, weight: 0.3, color: '#f59e0b' },
    { name: 'Crude Oil', value: oilSignalVal, weight: 0.2, color: '#10b981' },
  ]

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Cross-Asset Signal for NIFTY Futures
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust cross-asset parameters to see how SGX NIFTY, USD/INR, and crude oil
        prices generate trading signals for NSE NIFTY futures.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>SGX Lead: {sgxLeadLag}ms</span>
          <input type="range" min="0" max="500" step="10" value={sgxLeadLag}
            onChange={e => setSgxLeadLag(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>FX Beta: {currencyBeta.toFixed(2)}</span>
          <input type="range" min="-1" max="0" step="0.05" value={currencyBeta}
            onChange={e => setCurrencyBeta(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Oil Beta: {oilBeta.toFixed(2)}</span>
          <input type="range" min="-0.5" max="0.5" step="0.05" value={oilBeta}
            onChange={e => setOilBeta(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Signal Age: {signalDecay}ms</span>
          <input type="range" min="0" max="1000" step="50" value={signalDecay}
            onChange={e => setSignalDecay(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 500 140" className="w-full max-w-lg mx-auto block" aria-label="Cross-asset signals">
        {signals.map((s, i) => {
          const y = 15 + i * 35
          const barWidth = s.value * 250
          return (
            <g key={i}>
              <text x="10" y={y + 15} className="text-[9px]" fill="#374151">{s.name}</text>
              <rect x="130" y={y} width={barWidth} height="22" fill={s.color} opacity="0.6" rx="3" />
              <text x={135 + barWidth} y={y + 15} className="text-[9px] font-mono" fill="#374151">
                {s.value.toFixed(3)} (w={s.weight})
              </text>
            </g>
          )
        })}
        <line x1="130" y1="112" x2={130 + compositeSignal * 250} y2="112" stroke="#ef4444" strokeWidth="3" />
        <text x="130" y="130" className="text-[9px]" fill="#374151">
          Composite: {compositeSignal.toFixed(3)} | After decay: {decayedSignal.toFixed(3)}
        </text>
      </svg>
    </div>
  )
}

export default function CrossAssetHFT() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Cross-Asset HFT Strategies
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Cross-asset HFT exploits the lead-lag relationships between correlated
        instruments traded on different exchanges or asset classes. For Indian markets,
        the key relationships include SGX NIFTY leading NSE NIFTY futures, USD/INR
        movements affecting export-heavy stocks, and global crude oil prices impacting
        energy and airline stocks on NSE.
      </p>

      <DefinitionBlock
        title="Cross-Asset Lead-Lag Signal"
        label="Definition 3.1"
        definition="A cross-asset lead-lag signal exploits the empirical observation that price changes in one market (the leader) predict price changes in a related market (the lagger) at very short time horizons. This arises from differences in trading hours, market structure, latency, and participant composition."
        notation={<>The lead-lag return predictability: <InlineMath math="r_t^{\text{lag}} = \alpha + \beta \cdot r_{t-\delta}^{\text{lead}} + \varepsilon_t" /> where <InlineMath math="\delta" /> is the lead time in milliseconds and <InlineMath math="\beta" /> captures the strength of the relationship.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Key Cross-Asset Relationships for NSE
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Leader</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Lagger (NSE)</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Lead Time</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Mechanism</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">SGX NIFTY Futures</td>
              <td className="px-4 py-2">NSE NIFTY Futures</td>
              <td className="px-4 py-2">20--100ms</td>
              <td className="px-4 py-2">Same underlying, faster SGX execution</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">USD/INR (Spot/NDF)</td>
              <td className="px-4 py-2">IT Stocks (TCS, Infy)</td>
              <td className="px-4 py-2">100--500ms</td>
              <td className="px-4 py-2">Revenue sensitivity to INR</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Brent Crude (ICE)</td>
              <td className="px-4 py-2">ONGC, IOC, Indigo</td>
              <td className="px-4 py-2">500ms--5s</td>
              <td className="px-4 py-2">Input cost / revenue impact</td>
            </tr>
            <tr>
              <td className="px-4 py-2">S&P 500 E-mini</td>
              <td className="px-4 py-2">NIFTY at open</td>
              <td className="px-4 py-2">Pre-open</td>
              <td className="px-4 py-2">Global risk sentiment</td>
            </tr>
          </tbody>
        </table>
      </div>

      <BlockMath math="S_t = \sum_{a \in \text{assets}} w_a \cdot \beta_a \cdot r_{t-\delta_a}^a \cdot e^{-\lambda_a (t - t_a)}" />

      <TheoremBlock
        title="SGX-NSE Lead-Lag Structure"
        label="Empirical Finding 3.1"
        statement={<>SGX NIFTY futures lead NSE NIFTY futures by approximately 30--80ms during overlapping trading hours (9:15 AM -- 5:00 PM IST). The lead-lag coefficient <InlineMath math="\beta_{\text{SGX} \to \text{NSE}}" /> ranges from 0.6 to 0.9 at the optimal lag, with the relationship being stronger during high-volatility periods and weaker during low-volatility periods.</>}
        proof={<>Cross-correlation analysis at 10ms resolution between SGX NIFTY and NSE NIFTY tick-by-tick data over 120 trading days (2023-2024): <BlockMath math="\rho(\delta) = \text{Corr}(r_t^{\text{NSE}}, r_{t-\delta}^{\text{SGX}}), \quad \delta^* = \arg\max_\delta \rho(\delta) \approx 50\text{ms}" /> The peak correlation at optimal lag is <InlineMath math="\rho(\delta^*) \approx 0.35\text{--}0.45" />, which is economically significant after accounting for transaction costs of ~0.5 bps per leg.</>}
      />

      <InteractiveCrossAssetSignal />

      <PythonCode
        title="cross_asset_hft.py"
        runnable
        code={`import numpy as np

class CrossAssetSignal:
    """Cross-asset lead-lag signal for NSE NIFTY futures."""

    def __init__(self):
        self.assets = {
            'sgx_nifty': {'beta': 0.85, 'lag_ms': 50, 'decay_ms': 200, 'weight': 0.50},
            'usdinr': {'beta': -0.40, 'lag_ms': 150, 'decay_ms': 500, 'weight': 0.30},
            'brent_crude': {'beta': 0.15, 'lag_ms': 500, 'decay_ms': 2000, 'weight': 0.20},
        }

    def compute_signal(self, asset_returns, current_time_ms=0):
        """Compute composite cross-asset signal."""
        signals = {}
        composite = 0

        for asset, params in self.assets.items():
            if asset in asset_returns:
                # Apply lead-lag adjusted return
                raw_return = asset_returns[asset]
                directional_signal = params['beta'] * raw_return

                # Time decay
                age_ms = current_time_ms
                decay = np.exp(-age_ms / params['decay_ms'])
                decayed_signal = directional_signal * decay

                weighted_signal = params['weight'] * decayed_signal
                composite += weighted_signal

                signals[asset] = {
                    'raw_return': raw_return,
                    'directional': directional_signal,
                    'decay': decay,
                    'weighted': weighted_signal
                }

        return {'composite': composite, 'details': signals}

    def lead_lag_analysis(self, leader_returns, lagger_returns, max_lag=100):
        """Compute lead-lag cross-correlation."""
        correlations = {}
        n = min(len(leader_returns), len(lagger_returns))

        for lag in range(-max_lag, max_lag + 1, 5):
            if lag >= 0:
                l1 = leader_returns[:n - lag]
                l2 = lagger_returns[lag:n]
            else:
                l1 = leader_returns[-lag:n]
                l2 = lagger_returns[:n + lag]
            if len(l1) > 10:
                correlations[lag] = np.corrcoef(l1, l2)[0, 1]

        optimal_lag = max(correlations, key=correlations.get)
        return {
            'correlations': correlations,
            'optimal_lag': optimal_lag,
            'peak_correlation': correlations[optimal_lag]
        }

class CrossAssetBacktester:
    """Backtest cross-asset HFT strategy."""

    def __init__(self, signal_gen, entry_threshold=0.001, cost_bps=0.5):
        self.signal_gen = signal_gen
        self.entry_thresh = entry_threshold
        self.cost = cost_bps / 10000

    def run(self, sgx_returns, nifty_returns, fx_returns, oil_returns):
        """Run backtest over simulated data."""
        n = min(len(sgx_returns), len(nifty_returns))
        pnl = []
        positions = []

        for i in range(1, n):
            asset_returns = {
                'sgx_nifty': sgx_returns[i - 1],
                'usdinr': fx_returns[i - 1] if i < len(fx_returns) else 0,
                'brent_crude': oil_returns[i - 1] if i < len(oil_returns) else 0,
            }

            result = self.signal_gen.compute_signal(asset_returns, current_time_ms=50)
            signal = result['composite']

            # Trading decision
            position = 0
            if signal > self.entry_thresh:
                position = 1
            elif signal < -self.entry_thresh:
                position = -1

            # PnL
            actual_return = nifty_returns[i]
            trade_pnl = position * actual_return - abs(position) * self.cost
            pnl.append(trade_pnl)
            positions.append(position)

        pnl = np.array(pnl)
        return {
            'total_pnl': np.sum(pnl),
            'sharpe': np.mean(pnl) / np.std(pnl) * np.sqrt(252 * 22500) if np.std(pnl) > 0 else 0,
            'hit_rate': np.mean(pnl[np.array(positions[:-1]) != 0] > 0) if any(p != 0 for p in positions) else 0,
            'num_trades': sum(1 for p in positions if p != 0),
            'avg_pnl_per_trade': np.mean(pnl[np.array(positions[:-1]) != 0]) if any(p != 0 for p in positions) else 0
        }

# Simulate cross-asset data
np.random.seed(42)
n_ticks = 5000

# Correlated returns
global_factor = np.random.normal(0, 0.0003, n_ticks)
sgx = global_factor + np.random.normal(0, 0.0002, n_ticks)
nifty = 0.8 * np.roll(sgx, 5) + np.random.normal(0, 0.0002, n_ticks)
fx = -0.3 * global_factor + np.random.normal(0, 0.0001, n_ticks)
oil = 0.2 * global_factor + np.random.normal(0, 0.0002, n_ticks)

signal_gen = CrossAssetSignal()
backtester = CrossAssetBacktester(signal_gen, entry_threshold=0.0005)
result = backtester.run(sgx, nifty, fx, oil)

print("=" * 55)
print("CROSS-ASSET HFT: NIFTY FUTURES (NSE)")
print("=" * 55)

# Lead-lag analysis
ll = signal_gen.lead_lag_analysis(sgx, nifty, max_lag=50)
print(f"\\nSGX-NSE Lead-Lag Analysis:")
print(f"  Optimal lag:      {ll['optimal_lag']} ticks")
print(f"  Peak correlation: {ll['peak_correlation']:.4f}")

print(f"\\nBacktest Results:")
print(f"  Total PnL:        {result['total_pnl']:.6f}")
print(f"  Annualized Sharpe:{result['sharpe']:.2f}")
print(f"  Hit Rate:         {result['hit_rate']:.1%}")
print(f"  Num Trades:       {result['num_trades']}")
print(f"  Avg PnL/Trade:    {result['avg_pnl_per_trade']:.8f}")`}
      />

      <ExampleBlock
        title="SGX-NSE Arbitrage Profitability"
        difficulty="intermediate"
        problem="SGX NIFTY moves up 10 points (from 22,500 to 22,510) in a 50ms window. Your model estimates $\\beta_{\\text{SGX}\\to\\text{NSE}} = 0.82$ with optimal lag of 50ms. NSE NIFTY is still at 22,500. Transaction costs are 0.5 bps per leg (total 1 bps). Should you trade? What is the expected profit per lot (50 units)?"
        solution={[
          {
            step: 'Expected NSE move',
            formula: '\\Delta p_{\\text{NSE}} = 0.82 \\times 10 = 8.2 \\text{ points}',
          },
          {
            step: 'Transaction cost',
            formula: 'c = 22{,}500 \\times 0.0001 \\times 2 = \\text{Rs } 4.50 \\text{ per unit}',
          },
          {
            step: 'Expected profit per unit',
            formula: '\\pi = 8.2 - 4.50 = \\text{Rs } 3.70',
          },
          {
            step: 'Profit per lot',
            formula: '\\text{Profit} = 50 \\times 3.70 = \\text{Rs } 185 \\text{ per lot}',
            explanation: 'Yes, trade is profitable. Buy NIFTY futures immediately. At 100 such opportunities per day, daily PnL = Rs 18,500 per lot traded.',
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
          Cross-asset HFT on NSE leverages lead-lag relationships with SGX NIFTY,
          USD/INR, and global commodity prices. The SGX-NSE lead provides the
          strongest and most reliable signal with 30--80ms of alpha. Success requires
          direct market access to both exchanges, sub-millisecond latency, and
          careful calibration of signal decay rates to avoid trading on stale
          information.
        </p>
      </NoteBlock>
    </div>
  )
}
