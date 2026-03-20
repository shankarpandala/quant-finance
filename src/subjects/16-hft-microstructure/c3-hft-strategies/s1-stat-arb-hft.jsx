import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveStatArbHFT() {
  const [entryThreshold, setEntryThreshold] = useState(2.0)
  const [exitThreshold, setExitThreshold] = useState(0.5)
  const [halfLife, setHalfLife] = useState(30)
  const [spreadVol, setSpreadVol] = useState(0.8)

  const meanReversionSpeed = Math.log(2) / halfLife
  const expectedProfit = spreadVol * entryThreshold * (1 - Math.exp(-meanReversionSpeed * halfLife))
  const sharpe = expectedProfit / spreadVol * Math.sqrt(252 * 6.25 * 3600 / halfLife)
  const tradingFrequency = (252 * 6.25 * 3600) / (halfLife * 3)

  const spreadPath = Array.from({ length: 20 }, (_, i) => {
    const t = i * 5
    if (i < 5) return spreadVol * entryThreshold * (1 + 0.1 * i)
    return spreadVol * entryThreshold * Math.exp(-meanReversionSpeed * (t - 25))
  })

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: HFT Statistical Arbitrage
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Configure mean-reversion parameters for a pairs trade between NIFTY futures
        and NIFTY Bank futures on NSE.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Entry: {entryThreshold.toFixed(1)}σ</span>
          <input type="range" min="1" max="4" step="0.1" value={entryThreshold}
            onChange={e => setEntryThreshold(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Exit: {exitThreshold.toFixed(1)}σ</span>
          <input type="range" min="0" max="1.5" step="0.1" value={exitThreshold}
            onChange={e => setExitThreshold(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Half-life: {halfLife}s</span>
          <input type="range" min="5" max="300" step="5" value={halfLife}
            onChange={e => setHalfLife(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Spread Vol: {spreadVol.toFixed(2)}</span>
          <input type="range" min="0.2" max="2" step="0.1" value={spreadVol}
            onChange={e => setSpreadVol(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 500 160" className="w-full max-w-lg mx-auto block" aria-label="Spread mean reversion">
        {/* Entry/exit thresholds */}
        <line x1="40" y1={80 - entryThreshold * 15} x2="480" y2={80 - entryThreshold * 15}
          stroke="#ef4444" strokeWidth="1" strokeDasharray="4,4" />
        <line x1="40" y1={80 - exitThreshold * 15} x2="480" y2={80 - exitThreshold * 15}
          stroke="#22c55e" strokeWidth="1" strokeDasharray="4,4" />
        <line x1="40" y1="80" x2="480" y2="80" stroke="#94a3b8" strokeWidth="1" />

        <text x="485" y={83 - entryThreshold * 15} className="text-[7px]" fill="#ef4444">Entry</text>
        <text x="485" y={83 - exitThreshold * 15} className="text-[7px]" fill="#22c55e">Exit</text>
        <text x="485" y="83" className="text-[7px]" fill="#94a3b8">Mean</text>

        {/* Spread path */}
        {spreadPath.map((s, i) => {
          const x = 50 + i * 22
          const y = 80 - s * 15 / spreadVol
          if (i === 0) return null
          const prevY = 80 - spreadPath[i - 1] * 15 / spreadVol
          return (
            <line key={i} x1={50 + (i - 1) * 22} y1={prevY} x2={x} y2={y}
              stroke="#6366f1" strokeWidth="2" />
          )
        })}

        <text x="260" y="155" textAnchor="middle" className="text-[9px] fill-gray-500">
          Est. Sharpe: {sharpe.toFixed(1)} | Trades/year: ~{tradingFrequency.toFixed(0)} | E[PnL/trade]: {expectedProfit.toFixed(3)}σ
        </text>
      </svg>
    </div>
  )
}

export default function StatArbHFT() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Statistical Arbitrage at High Frequency
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        High-frequency statistical arbitrage exploits transient pricing inefficiencies
        between related instruments on NSE. Unlike traditional stat-arb which operates
        on daily data, HFT stat-arb targets mean-reverting spreads with half-lives of
        seconds to minutes, executing hundreds of round-trip trades per day with
        sub-basis-point edge per trade.
      </p>

      <DefinitionBlock
        title="HFT Statistical Arbitrage"
        label="Definition 1.1"
        definition="HFT statistical arbitrage is a market-neutral strategy that identifies and trades mean-reverting price relationships between correlated securities at high frequency. The strategy enters when the spread deviates beyond a threshold from its equilibrium and exits as it reverts, profiting from the temporary mispricing. Trade durations range from seconds to minutes."
        notation={<>The spread follows an Ornstein-Uhlenbeck process: <InlineMath math="dS_t = \kappa(\mu - S_t)\,dt + \sigma\,dW_t" /> where <InlineMath math="\kappa" /> is the mean-reversion speed, <InlineMath math="\mu" /> is the long-run mean, and the half-life is <InlineMath math="t_{1/2} = \ln(2)/\kappa" />.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Pairs on NSE for HFT Stat-Arb
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Common mean-reverting pairs on NSE for HFT strategies:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Pair</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Relationship</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Typical Half-Life</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Capacity</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">NIFTY Fut vs NIFTY Bank Fut</td>
              <td className="px-4 py-2">Index co-movement</td>
              <td className="px-4 py-2">15--60 sec</td>
              <td className="px-4 py-2">High</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">NIFTY Spot vs NIFTY Fut</td>
              <td className="px-4 py-2">Cash-futures basis</td>
              <td className="px-4 py-2">30--120 sec</td>
              <td className="px-4 py-2">Very High</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">HDFC Bank vs ICICI Bank</td>
              <td className="px-4 py-2">Sector peers</td>
              <td className="px-4 py-2">60--300 sec</td>
              <td className="px-4 py-2">Medium</td>
            </tr>
            <tr>
              <td className="px-4 py-2">NIFTY weekly options</td>
              <td className="px-4 py-2">Put-call parity</td>
              <td className="px-4 py-2">5--30 sec</td>
              <td className="px-4 py-2">Medium</td>
            </tr>
          </tbody>
        </table>
      </div>

      <BlockMath math="S_t = \ln P_t^A - \beta \ln P_t^B - \alpha" />

      <TheoremBlock
        title="Optimal Entry Threshold"
        label="Theorem 1.1"
        statement={<>For an OU process with parameters <InlineMath math="(\kappa, \mu, \sigma)" /> and symmetric transaction costs <InlineMath math="c" /> (in spread units), the optimal entry threshold that maximizes expected profit per unit time is: <BlockMath math="S^* = \mu + \sigma\sqrt{\frac{2}{\kappa}} \cdot \Phi^{-1}\!\left(\frac{1}{2} + \frac{c\kappa}{2\sigma\sqrt{2\kappa}}\right)" /> For typical NSE parameters with transaction costs of 1--2 bps, the optimal entry is approximately <InlineMath math="2.0\text{--}2.5\sigma" />.</>}
        proof={<>The expected profit per round trip is <InlineMath math="\pi(S^*) = (S^* - \mu) - c" /> (spread mean-reverts from entry to mean minus costs). The expected time per trade scales as <InlineMath math="\mathbb{E}[T] \propto (S^* - \mu)^2 / \sigma^2" />. Maximizing <InlineMath math="\pi / \mathbb{E}[T]" /> with respect to <InlineMath math="S^*" /> yields the result via calculus of variations.</>}
      />

      <InteractiveStatArbHFT />

      <PythonCode
        title="hft_stat_arb.py"
        runnable
        code={`import numpy as np

class OUProcess:
    """Ornstein-Uhlenbeck process for mean-reverting spreads."""

    def __init__(self, kappa, mu, sigma):
        self.kappa = kappa
        self.mu = mu
        self.sigma = sigma
        self.half_life = np.log(2) / kappa

    def simulate(self, s0, dt, n_steps):
        """Simulate the OU process."""
        path = [s0]
        for _ in range(n_steps):
            ds = self.kappa * (self.mu - path[-1]) * dt + \\
                 self.sigma * np.sqrt(dt) * np.random.normal()
            path.append(path[-1] + ds)
        return np.array(path)

    @staticmethod
    def estimate_params(spread_series, dt=1.0):
        """Estimate OU parameters from observed spread."""
        n = len(spread_series)
        s = np.array(spread_series)
        ds = np.diff(s)
        s_lag = s[:-1]

        # OLS: ds = kappa*(mu - s_lag)*dt + noise
        X = np.column_stack([np.ones(n-1), s_lag])
        beta = np.linalg.lstsq(X, ds / dt, rcond=None)[0]
        kappa = -beta[1]
        mu = beta[0] / kappa if kappa > 0 else np.mean(s)
        residuals = ds / dt - X @ beta
        sigma = np.std(residuals) * np.sqrt(dt)

        return {'kappa': max(0.001, kappa), 'mu': mu, 'sigma': sigma,
                'half_life': np.log(2) / max(0.001, kappa)}

class HFTStatArb:
    """High-frequency pairs trading strategy."""

    def __init__(self, entry_z=2.0, exit_z=0.5, max_hold=300):
        self.entry_z = entry_z
        self.exit_z = exit_z
        self.max_hold = max_hold  # max hold in seconds

    def backtest(self, spread, params, dt=1.0, cost_bps=1.5):
        """Backtest the strategy on spread data."""
        z_scores = (spread - params['mu']) / params['sigma']
        position = 0
        pnl = []
        entry_price = 0
        hold_time = 0
        trades = 0

        for i in range(len(spread)):
            z = z_scores[i]

            if position == 0:
                if z > self.entry_z:
                    position = -1
                    entry_price = spread[i]
                    hold_time = 0
                    trades += 1
                elif z < -self.entry_z:
                    position = 1
                    entry_price = spread[i]
                    hold_time = 0
                    trades += 1
            else:
                hold_time += dt
                if (position == 1 and z >= -self.exit_z) or \\
                   (position == -1 and z <= self.exit_z) or \\
                   hold_time >= self.max_hold:
                    trade_pnl = position * (spread[i] - entry_price)
                    trade_pnl -= cost_bps / 10000 * abs(entry_price) * 2
                    pnl.append(trade_pnl)
                    position = 0

        return {
            'total_pnl': sum(pnl),
            'num_trades': trades,
            'win_rate': sum(1 for p in pnl if p > 0) / max(1, len(pnl)),
            'avg_pnl': np.mean(pnl) if pnl else 0,
            'sharpe': np.mean(pnl) / np.std(pnl) * np.sqrt(252) if pnl and np.std(pnl) > 0 else 0,
            'max_drawdown': min(np.minimum.accumulate(np.cumsum(pnl))) if pnl else 0
        }

# Simulate NIFTY-BankNIFTY spread on NSE
np.random.seed(42)
ou = OUProcess(kappa=0.05, mu=0, sigma=0.8)
spread = ou.simulate(0, dt=1.0, n_steps=22500)  # ~6.25 hours

# Estimate parameters
params = OUProcess.estimate_params(spread)
print("=" * 55)
print("HFT STAT-ARB: NIFTY vs BANKNIFTY (NSE)")
print("=" * 55)
print(f"\\nEstimated OU Parameters:")
print(f"  Kappa:     {params['kappa']:.4f}")
print(f"  Mu:        {params['mu']:.4f}")
print(f"  Sigma:     {params['sigma']:.4f}")
print(f"  Half-life: {params['half_life']:.1f} seconds")

# Backtest with different entry thresholds
strategy = HFTStatArb(entry_z=2.0, exit_z=0.5)
result = strategy.backtest(spread, params, cost_bps=1.5)

print(f"\\nBacktest Results (entry=2σ, exit=0.5σ):")
print(f"  Total PnL:    {result['total_pnl']:.4f}")
print(f"  Num Trades:   {result['num_trades']}")
print(f"  Win Rate:     {result['win_rate']:.1%}")
print(f"  Avg PnL:      {result['avg_pnl']:.6f}")
print(f"  Ann. Sharpe:  {result['sharpe']:.2f}")

# Compare entry thresholds
print(f"\\nEntry Threshold Comparison:")
for entry in [1.5, 2.0, 2.5, 3.0]:
    s = HFTStatArb(entry_z=entry, exit_z=0.5)
    r = s.backtest(spread, params, cost_bps=1.5)
    print(f"  {entry:.1f}σ: trades={r['num_trades']:4d}, "
          f"win={r['win_rate']:.0%}, sharpe={r['sharpe']:+.1f}")`}
      />

      <ExampleBlock
        title="Optimal Sizing for NIFTY Pairs Trade"
        difficulty="advanced"
        problem="A NIFTY-BankNIFTY stat-arb on NSE has OU parameters: $\\kappa = 0.04$, $\\sigma = 0.6$, half-life = 17.3 seconds. The spread is currently at $z = 2.5\\sigma$. Transaction cost is 1.5 bps per leg. Compute the expected profit per trade and the Kelly-optimal position size if your capital is Rs 1 crore."
        solution={[
          {
            step: 'Expected profit per trade',
            formula: '\\pi = (z_{\\text{entry}} - z_{\\text{exit}}) \\cdot \\sigma - 2c = (2.5 - 0.5) \\times 0.6 - 2 \\times 0.00015 = 1.2 - 0.0003 = 1.1997',
            explanation: 'In spread units. The profit from mean reversion far exceeds transaction costs.',
          },
          {
            step: 'Expected time to exit',
            formula: 'E[T] \\approx \\frac{(z_{\\text{entry}} - z_{\\text{exit}})^2}{2\\kappa} = \\frac{4}{0.08} = 50 \\text{ seconds}',
          },
          {
            step: 'Win probability estimate',
            formula: 'p \\approx \\Phi(z_{\\text{entry}}) = \\Phi(2.5) \\approx 0.994',
            explanation: 'At 2.5σ, the probability of reversion to 0.5σ is very high.',
          },
          {
            step: 'Kelly fraction',
            formula: 'f^* = \\frac{p - (1-p) \\cdot (L/W)}{1} \\approx 0.25 \\implies \\text{Rs } 25 \\text{ lakh per trade}',
            explanation: 'With half-Kelly for safety, size at Rs 12.5 lakh notional per leg, which translates to approximately 5-6 lots of NIFTY futures.',
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
          HFT stat-arb on NSE exploits mean-reverting spreads at second-to-minute
          timescales. Success requires precise OU parameter estimation, optimal
          entry/exit thresholds that account for transaction costs, and ultra-low
          latency infrastructure at NSE co-location. The strategy's edge per trade
          is tiny but compounds over hundreds of daily trades to produce
          attractive risk-adjusted returns.
        </p>
      </NoteBlock>
    </div>
  )
}
