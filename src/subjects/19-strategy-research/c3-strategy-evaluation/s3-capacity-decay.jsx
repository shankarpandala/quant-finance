import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveViz() {
  const [adv, setAdv] = useState(500)
  const [participation, setParticipation] = useState(5)
  const [turnover, setTurnover] = useState(12)
  const [impactCoeff, setImpactCoeff] = useState(0.5)

  const result1 = adv * participation / (turnover || 1)
  const result2 = result1 * (1 / (impactCoeff || 0.1))

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Strategy Capacity Calculator
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Estimate the maximum AUM for your NSE strategy based on trading volume and impact.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>ADV (Cr INR): {adv.toFixed(0)}</span>
          <input type="range" min="50" max="5000" step="50" value={adv}
            onChange={e => setAdv(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Participation (%): {participation.toFixed(0)}</span>
          <input type="range" min="1" max="20" step="1" value={participation}
            onChange={e => setParticipation(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Annual Turnover: {turnover.toFixed(0)}</span>
          <input type="range" min="1" max="50" step="1" value={turnover}
            onChange={e => setTurnover(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Impact Coeff: {impactCoeff.toFixed(1)}</span>
          <input type="range" min="0.1" max="2" step="0.1" value={impactCoeff}
            onChange={e => setImpactCoeff(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
          <div className="text-[10px] text-gray-500">Estimated Capacity</div>
          <div className="text-lg font-bold text-blue-600">INR {result2.toFixed(0)} Cr</div>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
          <div className="text-[10px] text-gray-500">Daily Trade Size</div>
          <div className="text-lg font-bold text-purple-600">INR {(result1 / 252).toFixed(1)} Cr</div>
        </div>
        <div className={`rounded-lg p-3 ${result2 > 50 ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'}`}>
          <div className="text-[10px] text-gray-500">Viable?</div>
          <div className={`text-lg font-bold ${result2 > 50 ? 'text-green-600' : 'text-red-600'}`}>
            {result2 > 50 ? 'YES' : 'LIMITED'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CapacityDecay() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Capacity Estimation for Indian Strategies
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Understanding strategy capacity is critical for any quantitative trader in Indian
        markets. The capacity of a strategy determines the maximum capital that can be
        deployed without significantly eroding risk-adjusted returns through market impact.
        This is especially important for strategies trading mid-cap and small-cap NSE stocks,
        where liquidity is limited.
      </p>

      <DefinitionBlock
        title="Strategy Capacity"
        label="Definition 19.9"
        definition="Strategy capacity is the maximum assets under management (AUM) at which a strategy can operate without significantly degrading its risk-adjusted returns. Capacity is determined by market liquidity, price impact, and the speed of alpha decay. For NSE Nifty 50 strategies, capacity is typically INR 50-500 Cr; for mid-cap strategies, INR 5-50 Cr."
        notation="Capacity constraint: C_max = ADV * participation_rate / turnover, where ADV is average daily volume in INR."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Market Impact and Capacity
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The fundamental relationship between trading size and market impact follows the
        square-root law, which has been validated empirically on NSE:
      </p>

      <BlockMath math="C_{\max} = \frac{\text{ADV} \times \pi_{\max}}{\tau} \times \frac{1}{\eta}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The market impact per trade follows:
      </p>

      <BlockMath math="\text{Impact}(Q) = \eta \cdot \sigma \cdot \sqrt{\frac{Q}{\text{ADV}}}" />

      <InteractiveViz />

      <TheoremBlock
        title="Capacity-Adjusted Sharpe"
        label="Theorem 19.9"
        statement="The capacity-adjusted Sharpe ratio at AUM level $A$ is: $S(A) = S_0 - \frac{\eta \cdot \tau \cdot A}{\sigma \cdot \text{ADV}^{1/2}}$ where $S_0$ is the zero-capacity Sharpe, $\eta$ is the impact coefficient, $\tau$ is annual turnover, and $\sigma$ is the strategy volatility. The capacity $C_{\max}$ is the AUM where $S(A) = 0$."
        proof="This follows from the square-root market impact law applied to the strategy P&L. Each trade of size Q generates impact $\eta\sigma\sqrt{Q/\text{ADV}}$, which compounds over $\tau$ turnovers per year. The linear relationship between AUM and impact cost (in Sharpe units) gives the capacity-adjusted formula."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Liquidity Landscape of Indian Markets
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Segment</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Avg Daily Volume</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Typical Spread</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Strategy Capacity</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Nifty 50 Cash</td>
              <td className="px-4 py-2">INR 500-2000 Cr</td>
              <td className="px-4 py-2">1-3 bps</td>
              <td className="px-4 py-2">INR 100-500 Cr</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Nifty Next 50</td>
              <td className="px-4 py-2">INR 100-500 Cr</td>
              <td className="px-4 py-2">3-8 bps</td>
              <td className="px-4 py-2">INR 30-100 Cr</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Midcap 150</td>
              <td className="px-4 py-2">INR 20-100 Cr</td>
              <td className="px-4 py-2">5-15 bps</td>
              <td className="px-4 py-2">INR 5-30 Cr</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Smallcap 250</td>
              <td className="px-4 py-2">INR 2-20 Cr</td>
              <td className="px-4 py-2">15-50 bps</td>
              <td className="px-4 py-2">INR 1-5 Cr</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Bank Nifty F&amp;O</td>
              <td className="px-4 py-2">INR 50,000+ Cr notional</td>
              <td className="px-4 py-2">1-5 bps</td>
              <td className="px-4 py-2">INR 200-1000 Cr</td>
            </tr>
          </tbody>
        </table>
      </div>

      <PythonCode
        title="capacity_estimation.py"
        runnable
        code={`import numpy as np

class CapacityEstimator:
    \"\"\"Estimate strategy capacity for Indian markets.\"\"\"

    def __init__(self, adv_inr_cr: float, sigma: float = 0.02,
                 impact_coeff: float = 0.5):
        self.adv = adv_inr_cr * 1e7  # Convert Cr to INR
        self.sigma = sigma
        self.eta = impact_coeff

    def market_impact(self, trade_size_inr: float) -> float:
        \"\"\"Square-root market impact in bps.\"\"\"
        participation = trade_size_inr / self.adv
        impact = self.eta * self.sigma * np.sqrt(participation)
        return impact * 10000  # Convert to bps

    def capacity_adjusted_sharpe(self, base_sharpe: float,
                                  aum_cr: float, turnover: float) -> float:
        \"\"\"Sharpe ratio adjusted for market impact at given AUM.\"\"\"
        trade_size = aum_cr * 1e7 * turnover / 252
        daily_impact = self.market_impact(trade_size) / 10000
        impact_drag = daily_impact * turnover * np.sqrt(252)
        adjusted = base_sharpe - impact_drag / self.sigma
        return max(adjusted, -2)

    def max_capacity(self, base_sharpe: float,
                     turnover: float) -> float:
        \"\"\"Find maximum AUM in Cr where Sharpe remains positive.\"\"\"
        for aum in np.arange(1, 5000, 1):
            if self.capacity_adjusted_sharpe(base_sharpe, aum, turnover) <= 0:
                return aum - 1
        return 5000

# NSE capacity analysis
nifty50_estimator = CapacityEstimator(adv_inr_cr=500, sigma=0.015)
midcap_estimator = CapacityEstimator(adv_inr_cr=50, sigma=0.025)

print("=== Capacity Analysis for NSE Strategies ===")
for name, est, sharpe, turn in [
    ('Nifty 50 Momentum', nifty50_estimator, 1.5, 12),
    ('Nifty 50 Mean-Rev', nifty50_estimator, 1.2, 24),
    ('Midcap Momentum', midcap_estimator, 1.8, 12),
    ('Midcap StatArb', midcap_estimator, 1.0, 50),
]:
    cap = est.max_capacity(sharpe, turn)
    print(f"\n{name}:")
    print(f"  Base Sharpe: {sharpe}")
    print(f"  Turnover: {turn}x/year")
    print(f"  Max Capacity: INR {cap} Cr")
    for aum in [10, 50, 100, 200]:
        adj = est.capacity_adjusted_sharpe(sharpe, aum, turn)
        print(f"    AUM={aum:>4d}Cr: Adj Sharpe={adj:.2f}")`}
      />

      <ExampleBlock
        title="Capacity of a Bank Nifty Options Strategy"
        difficulty="advanced"
        problem="Your Bank Nifty weekly options strategy trades 50 lots per week. Bank Nifty options have ADV of 5 lakh contracts. What is the capacity?"
        solution={[
          {
            step: 'Calculate participation rate',
            formula: '\pi = \frac{50}{500000} = 0.01\%',
            explanation: 'Trading 50 lots out of 5 lakh daily volume gives extremely low participation, suggesting high capacity.',
          },
          {
            step: 'Estimate impact cost',
            formula: '\text{Impact} = 0.5 \times 0.02 \times \sqrt{0.0001} = 0.1 \text{ bps}',
            explanation: 'At this participation level, market impact is negligible.',
          },
          {
            step: 'Scale to maximum capacity',
            formula: 'C_{\max} \approx \frac{500000 \times 0.05}{52} \approx 480 \text{ lots/week}',
            explanation: 'At 5% participation rate, capacity is about 480 lots per week, or approximately INR 15 Cr notional per week.',
          },
          {
            step: 'Conclusion',
            formula: '\text{Capacity} \approx \text{INR 15 Cr per week or INR 780 Cr annually}',
            explanation: 'Bank Nifty options have high capacity due to deep liquidity. However, capacity drops sharply for far OTM strikes and on expiry day.',
          },
        ]}
      />

      <NoteBlock title="Indian Market Liquidity Considerations" type="warning">
        <ul className="space-y-1 list-disc list-inside">
                    <li>Nifty 50 stocks: ADV ranges from INR 200-2000 Cr, supporting strategy capacity of INR 50-500 Cr</li>
          <li>Mid-cap stocks: ADV of INR 10-100 Cr limits capacity to INR 5-50 Cr</li>
          <li>F&O segment: Bank Nifty options have highest liquidity, Nifty options second</li>
          <li>Capacity estimates should use 10th percentile ADV (worst case), not mean</li>
          <li>SEBI impact cost studies show Indian large-caps have impact of 5-15 bps for INR 10L orders</li>
        </ul>
      </NoteBlock>


      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Advanced Analysis Framework
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A comprehensive analysis framework for Indian markets must account for the unique
        characteristics of NSE microstructure, SEBI regulations, and the interplay between
        domestic and foreign institutional flows. The following performance attribution model
        decomposes strategy returns into actionable components:
      </p>

      <BlockMath math="R_{\\text{strategy}} = \\alpha + \\beta_{\\text{Nifty}} R_{\\text{Nifty}} + \\beta_{\\text{FII}} F_{\\text{FII}} + \\sum_k \\gamma_k S_k + \\epsilon" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="F_{\\text{FII}}" /> captures the FII flow factor,{' '}
        <InlineMath math="S_k" /> represents sector factors (Banking, IT, FMCG, Energy),
        and <InlineMath math="\\alpha" /> measures the strategy genuine value-add. For
        Indian markets, the FII flow factor alone explains 15-25% of cross-sectional return
        variation in Nifty 50 stocks.
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Performance Metric</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Target for NSE</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Measurement Period</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Annualized Alpha</td>
              <td className="px-4 py-2">&gt; 5% above Nifty 50</td>
              <td className="px-4 py-2">Rolling 12-month</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Information Ratio</td>
              <td className="px-4 py-2">&gt; 0.5</td>
              <td className="px-4 py-2">Since inception</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Maximum Drawdown</td>
              <td className="px-4 py-2">&lt; 15% absolute</td>
              <td className="px-4 py-2">Peak-to-trough</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Sortino Ratio</td>
              <td className="px-4 py-2">&gt; 1.5</td>
              <td className="px-4 py-2">Rolling 252-day</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Hit Rate</td>
              <td className="px-4 py-2">&gt; 52% daily</td>
              <td className="px-4 py-2">All trading days</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Tail Ratio</td>
              <td className="px-4 py-2">&gt; 1.0</td>
              <td className="px-4 py-2">95th/5th percentile</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Risk Management for NSE Deployment
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Deploying any quantitative strategy on NSE requires integration with a risk
        management framework that accounts for Indian market specifics. The Expected
        Shortfall at the 95% confidence level provides a more complete picture of tail risk
        than VaR alone:
      </p>

      <BlockMath math="\\text{ES}_{0.95} = -\\mathbb{E}[R_p | R_p < \\text{VaR}_{0.95}]" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For strategies trading Nifty 50 stocks, the typical daily ES at 95% is 2-4% of
        portfolio value. During extreme events (demonetization, COVID crash), ES can
        spike to 8-12%. Circuit breakers on NSE provide some natural protection but
        can also trap positions.
      </p>

      <NoteBlock title="Regulatory and Infrastructure Notes" type="historical">
        <ul className="space-y-2">
          <li>
            <strong>SEBI Compliance:</strong> All algo strategies must be registered with
            the exchange and comply with SEBI circular on automated trading. Maintain audit
            trails for minimum 5 years.
          </li>
          <li>
            <strong>Transaction Costs:</strong> Factor in STT (0.1% delivery, 0.025% intraday),
            GST (18% on brokerage), stamp duty (0.015% buy side), and exchange transaction
            charges. Zerodha offers zero delivery brokerage with INR 20/order for intraday.
          </li>
          <li>
            <strong>Data Sources:</strong> Use Zerodha Kite Connect for real-time NSE data,
            NSE archives for historical data, and Bloomberg/Refinitiv for comprehensive
            fundamental data on Indian companies.
          </li>
          <li>
            <strong>Deployment:</strong> AWS Mumbai (ap-south-1) provides 5-15ms latency
            to NSE. Use Docker containers with TimescaleDB for tick data storage and
            Grafana for real-time monitoring dashboards.
          </li>
        </ul>
      </NoteBlock>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Alpha Decay and Strategy Crowding
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Beyond capacity constraints, strategies also face alpha decay over time as
        more participants discover and trade the same signals. The decay rate depends
        on the signal type and market segment:
      </p>

      <BlockMath math="\alpha(t) = \alpha_0 \cdot \exp(-\lambda_{\text{crowd}} \cdot t)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For well-known momentum strategies on NSE, <InlineMath math="\lambda_{\text{crowd}} \approx 0.05" />{' '}
        per year, giving a half-life of approximately 14 years. For less-known signals
        (e.g., FII flow patterns, SEBI filing analysis), the decay is slower at{' '}
        <InlineMath math="\lambda \approx 0.02" /> per year.
      </p>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Capacity is the <strong>overlooked dimension</strong> of strategy evaluation.
          A Sharpe 2.0 strategy with INR 5 Cr capacity generates less total alpha than
          a Sharpe 1.0 strategy with INR 100 Cr capacity. Always estimate capacity before
          deploying capital, using conservative ADV estimates and the square-root impact
          law calibrated to NSE data. Additionally, monitor for alpha decay due to strategy
          crowding and adjust capital allocation dynamically as competition intensifies in
          Indian quantitative markets.
        </p>
      </NoteBlock>
    </div>
  )
}
