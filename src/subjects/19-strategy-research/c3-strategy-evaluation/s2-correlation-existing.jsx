import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveMarginalSharpe() {
  const [existingSharpe, setExistingSharpe] = useState(1.2)
  const [newSharpe, setNewSharpe] = useState(0.8)
  const [correlation, setCorrelation] = useState(0.3)
  const [weight, setWeight] = useState(0.2)

  const combinedVar = (1 - weight) ** 2 + weight ** 2 + 2 * weight * (1 - weight) * correlation
  const combinedReturn = (1 - weight) * existingSharpe + weight * newSharpe
  const combinedSharpe = combinedReturn / Math.sqrt(combinedVar)
  const marginalContribution = combinedSharpe - existingSharpe
  const isAdditive = marginalContribution > 0

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Marginal Sharpe Contribution
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Evaluate whether adding a new strategy improves your portfolio Sharpe ratio.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Existing Sharpe: {existingSharpe.toFixed(2)}</span>
          <input type="range" min="0" max="3" step="0.05" value={existingSharpe}
            onChange={e => setExistingSharpe(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>New Strategy Sharpe: {newSharpe.toFixed(2)}</span>
          <input type="range" min="0" max="3" step="0.05" value={newSharpe}
            onChange={e => setNewSharpe(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Correlation: {correlation.toFixed(2)}</span>
          <input type="range" min="-1" max="1" step="0.05" value={correlation}
            onChange={e => setCorrelation(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>New Weight: {(weight * 100).toFixed(0)}%</span>
          <input type="range" min="0" max="0.5" step="0.05" value={weight}
            onChange={e => setWeight(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
          <div className="text-[10px] text-gray-500">Combined Sharpe</div>
          <div className="text-lg font-bold text-blue-600">{combinedSharpe.toFixed(3)}</div>
        </div>
        <div className={`rounded-lg p-3 ${isAdditive ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'}`}>
          <div className="text-[10px] text-gray-500">Marginal Contribution</div>
          <div className={`text-lg font-bold ${isAdditive ? 'text-green-600' : 'text-red-600'}`}>
            {marginalContribution >= 0 ? '+' : ''}{marginalContribution.toFixed(3)}
          </div>
        </div>
        <div className={`rounded-lg p-3 ${isAdditive ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'}`}>
          <div className="text-[10px] text-gray-500">Add Strategy?</div>
          <div className={`text-lg font-bold ${isAdditive ? 'text-green-600' : 'text-red-600'}`}>
            {isAdditive ? 'YES' : 'NO'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CorrelationExisting() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Marginal Sharpe Contribution
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        When evaluating a new strategy for your NSE portfolio, the standalone Sharpe ratio
        is insufficient. What matters is the <em>marginal contribution</em> to the overall
        portfolio Sharpe. A strategy with modest standalone Sharpe but low correlation to
        existing strategies can be more valuable than a high-Sharpe strategy that is
        highly correlated.
      </p>

      <DefinitionBlock
        title="Marginal Sharpe Contribution"
        label="Definition 19.8"
        definition="The marginal Sharpe contribution of a new strategy to an existing portfolio measures the increase in portfolio Sharpe ratio from adding the strategy at an optimal weight. For a portfolio with Sharpe S_p and a new strategy with Sharpe S_n and correlation rho to the portfolio: the new portfolio Sharpe is S_combined = sqrt(S_p^2 + S_n^2 - 2*rho*S_p*S_n) when rho < S_n/S_p."
        notation="A strategy adds value if and only if its Sharpe ratio exceeds S_p * rho, where rho is its correlation with the existing portfolio."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Portfolio Sharpe Framework
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For a portfolio of <InlineMath math="K" /> strategies with Sharpe ratios{' '}
        <InlineMath math="S_1, \ldots, S_K" /> and correlation matrix{' '}
        <InlineMath math="\Sigma" />, the maximum portfolio Sharpe is:
      </p>

      <BlockMath math="S_p^* = \sqrt{\mathbf{S}^\top \Sigma^{-1} \mathbf{S}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Adding strategy <InlineMath math="K+1" /> improves the portfolio if and only if:
      </p>

      <BlockMath math="S_{K+1} > \rho_{K+1, p} \cdot S_p^*" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\rho_{K+1, p}" /> is the correlation between the new
        strategy and the existing optimal portfolio.
      </p>

      <InteractiveMarginalSharpe />

      <TheoremBlock
        title="Optimal Portfolio Sharpe with N Strategies"
        label="Theorem 19.8"
        statement="For $N$ strategies with equal Sharpe ratios $S$ and pairwise correlation $\rho$, the maximum portfolio Sharpe is: $S_p^* = S \cdot \sqrt{\frac{N}{1 + (N-1)\rho}}$. For uncorrelated strategies ($\rho = 0$): $S_p^* = S\sqrt{N}$. For perfectly correlated strategies ($\rho = 1$): $S_p^* = S$. This shows that diversification across uncorrelated strategies grows Sharpe as $\sqrt{N}$."
        proof="With equal Sharpe $S$ and equal pairwise correlation $\rho$, the covariance matrix has diagonal $1$ and off-diagonal $\rho$. Its inverse has diagonal $\frac{1+(N-2)\rho}{(1-\rho)(1+(N-1)\rho)}$ and off-diagonal $\frac{-\rho}{(1-\rho)(1+(N-1)\rho)}$. Computing $\mathbf{S}^\top \Sigma^{-1} \mathbf{S}$ with $\mathbf{S} = S \cdot \mathbf{1}$ gives the result after simplification."
      />

      <PythonCode
        title="marginal_sharpe_analysis.py"
        runnable
        code={`import numpy as np

class PortfolioSharpeAnalyzer:
    """Analyze marginal Sharpe contribution of NSE strategies."""

    def __init__(self):
        self.strategies = []
        self.returns = None

    def add_strategy(self, name: str, returns: np.ndarray):
        self.strategies.append(name)
        if self.returns is None:
            self.returns = returns.reshape(-1, 1)
        else:
            self.returns = np.column_stack([self.returns, returns])

    def portfolio_sharpe(self, weights: np.ndarray = None) -> float:
        if weights is None:
            weights = np.ones(len(self.strategies)) / len(self.strategies)
        port_ret = self.returns @ weights
        return np.mean(port_ret) / np.std(port_ret) * np.sqrt(252)

    def optimal_sharpe(self) -> dict:
        """Calculate maximum Sharpe portfolio."""
        mu = np.mean(self.returns, axis=0) * 252
        cov = np.cov(self.returns.T) * 252
        inv_cov = np.linalg.inv(cov + np.eye(len(self.strategies)) * 1e-8)
        w_opt = inv_cov @ mu
        w_opt = w_opt / np.sum(np.abs(w_opt))  # Normalize
        sharpe = np.sqrt(mu @ inv_cov @ mu)
        return {'weights': w_opt, 'sharpe': sharpe}

    def marginal_contribution(self, new_returns: np.ndarray,
                              new_name: str) -> dict:
        """Calculate marginal Sharpe contribution."""
        existing_opt = self.optimal_sharpe()
        existing_sharpe = existing_opt['sharpe']

        # Add new strategy temporarily
        self.add_strategy(new_name, new_returns)
        new_opt = self.optimal_sharpe()
        new_sharpe = new_opt['sharpe']

        # Remove the temporarily added strategy
        self.strategies.pop()
        self.returns = self.returns[:, :-1]

        # Correlation with existing portfolio
        opt_weights = existing_opt['weights']
        port_returns = self.returns @ opt_weights
        corr = np.corrcoef(port_returns, new_returns)[0, 1]

        return {
            'new_strategy': new_name,
            'standalone_sharpe': np.mean(new_returns) / np.std(new_returns) * np.sqrt(252),
            'correlation_with_portfolio': corr,
            'existing_portfolio_sharpe': existing_sharpe,
            'combined_sharpe': new_sharpe,
            'marginal_contribution': new_sharpe - existing_sharpe,
            'min_sharpe_needed': existing_sharpe * corr,
            'add_value': new_sharpe > existing_sharpe,
        }

    def correlation_matrix(self) -> np.ndarray:
        return np.corrcoef(self.returns.T)

# Simulate NSE strategy portfolio
np.random.seed(42)
T = 1260  # 5 years

analyzer = PortfolioSharpeAnalyzer()

# Existing strategies
nifty_momentum = np.random.normal(0.0004, 0.012, T)
value_factor = np.random.normal(0.0003, 0.014, T) + 0.2 * nifty_momentum
fii_flow = np.random.normal(0.0005, 0.015, T)
low_vol = np.random.normal(0.0002, 0.008, T) + 0.1 * nifty_momentum

analyzer.add_strategy('Nifty_Momentum', nifty_momentum)
analyzer.add_strategy('Value_Factor', value_factor)
analyzer.add_strategy('FII_Flow', fii_flow)
analyzer.add_strategy('Low_Volatility', low_vol)

print("=== Existing Portfolio Analysis ===")
opt = analyzer.optimal_sharpe()
print(f"Optimal Sharpe: {opt['sharpe']:.2f}")
print(f"Weights: {dict(zip(analyzer.strategies, [f'{w:.2f}' for w in opt['weights']]))}")

# Correlation matrix
corr = analyzer.correlation_matrix()
print(f"\\n--- Correlation Matrix ---")
for i, name in enumerate(analyzer.strategies):
    row = ' '.join([f'{corr[i,j]:6.3f}' for j in range(len(analyzer.strategies))])
    print(f"  {name:18s}: {row}")

# Evaluate candidate strategies
candidates = [
    ('Earnings_PEAD', np.random.normal(0.0003, 0.013, T) + 0.15 * nifty_momentum),
    ('BankNifty_Options', np.random.normal(0.0006, 0.020, T)),
    ('Sector_Rotation', np.random.normal(0.0002, 0.011, T) + 0.5 * nifty_momentum),
    ('Stat_Arb_NSE_BSE', np.random.normal(0.0004, 0.010, T) - 0.1 * nifty_momentum),
]

print(f"\\n=== Marginal Sharpe Analysis ===")
for name, returns in candidates:
    result = analyzer.marginal_contribution(returns, name)
    print(f"\\n{name}:")
    print(f"  Standalone Sharpe: {result['standalone_sharpe']:.2f}")
    print(f"  Corr with portfolio: {result['correlation_with_portfolio']:.3f}")
    print(f"  Min Sharpe needed: {result['min_sharpe_needed']:.2f}")
    print(f"  Combined Sharpe: {result['combined_sharpe']:.2f}")
    print(f"  Marginal contribution: {result['marginal_contribution']:+.3f}")
    print(f"  ADD VALUE: {'YES' if result['add_value'] else 'NO'}")`}
      />

      <ExampleBlock
        title="Diversification Benefit in Indian Multi-Strategy Portfolio"
        difficulty="advanced"
        problem="Your portfolio has 3 NSE strategies with Sharpe ratios 1.2, 0.9, and 1.0, and pairwise correlations 0.3, 0.2, and 0.15. A new strategy has Sharpe 0.7 and correlation 0.05 with each existing strategy. Should you add it?"
        solution={[
          {
            step: 'Calculate existing portfolio Sharpe',
            formula: 'S_p \\approx \\sqrt{1.2^2 + 0.9^2 + 1.0^2 - 2(\\text{corr terms})} \\approx 1.65',
            explanation: 'Using the optimal portfolio formula with the 3x3 correlation matrix, the existing portfolio Sharpe is approximately 1.65.',
          },
          {
            step: 'Check the addition threshold',
            formula: 'S_{\\text{new}} > \\rho \\cdot S_p \\Rightarrow 0.7 > 0.05 \\times 1.65 = 0.083',
            explanation: 'The new strategy Sharpe of 0.7 far exceeds the threshold of 0.083 (correlation x portfolio Sharpe). It adds value.',
          },
          {
            step: 'Estimate new portfolio Sharpe',
            formula: 'S_{p,\\text{new}} \\approx \\sqrt{1.65^2 + 0.7^2 - 2 \\times 0.05 \\times 1.65 \\times 0.7} \\approx 1.78',
            explanation: 'Adding the low-correlation strategy increases portfolio Sharpe from 1.65 to approximately 1.78, an improvement of 0.13 Sharpe units.',
          },
          {
            step: 'Decision',
            formula: '\\text{ADD the strategy: +0.13 Sharpe is highly valuable}',
            explanation: 'Despite its modest standalone Sharpe of 0.7, the near-zero correlation makes this strategy extremely valuable for diversification. In Indian markets, stat-arb strategies (NSE-BSE pairs) often provide this type of low-correlation alpha.',
          },
        ]}
      />

      <NoteBlock title="Correlation Estimation Pitfalls" type="warning">
        <ul className="space-y-1 list-disc list-inside">
          <li>Correlations between NSE strategies are <strong>regime-dependent</strong> -- they increase during market stress (correlation breakdown)</li>
          <li>Use at least 2 years of overlapping daily data for reliable correlation estimates</li>
          <li>Test with rolling 60-day correlations, not just point estimates</li>
          <li>Account for delayed correlation (lead-lag effects between strategies)</li>
          <li>Correlation between momentum and value on NSE varies from -0.2 to +0.5 across regimes</li>
          <li>F&amp;O expiry weeks often show temporary correlation spikes across all strategies</li>
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

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          A new strategy's value is determined by its <strong>marginal Sharpe contribution</strong>,
          not its standalone Sharpe. The marginal contribution depends on both the strategy's
          Sharpe and its correlation with existing strategies. For NSE portfolios, actively
          seek strategies with low correlation to your existing book -- even a modest Sharpe
          0.5 strategy can be extremely valuable if its correlation with your portfolio is
          near zero.
        </p>
      </NoteBlock>
    </div>
  )
}
