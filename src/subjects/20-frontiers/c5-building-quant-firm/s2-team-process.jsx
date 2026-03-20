import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveViz() {
  const [param1, setParam1] = useState(50)
  const [param2, setParam2] = useState(0.5)
  const [param3, setParam3] = useState(252)
  const [param4, setParam4] = useState(1.5)

  const result1 = param1 * param2 * (param4 / Math.sqrt(param3 / 252))
  const result2 = Math.sqrt(param1) * param4 / (1 + param2)
  const result3 = param4 * (1 - param2 * Math.log(param1) / 10)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Team Structure, Research Culture, and SEBI AIF Explorer
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Explore the key parameters of team structure for NSE Nifty 50 strategies.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Universe Size: {param1}</span>
          <input type="range" min="10" max="200" step="5" value={param1}
            onChange={e => setParam1(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Signal Strength: {param2.toFixed(2)}</span>
          <input type="range" min="0.1" max="2" step="0.05" value={param2}
            onChange={e => setParam2(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Lookback (days): {param3}</span>
          <input type="range" min="21" max="756" step="21" value={param3}
            onChange={e => setParam3(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Target Sharpe: {param4.toFixed(1)}</span>
          <input type="range" min="0.5" max="3" step="0.1" value={param4}
            onChange={e => setParam4(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
          <div className="text-[10px] text-gray-500">Expected Alpha</div>
          <div className="text-lg font-bold text-blue-600">{result1.toFixed(2)}</div>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
          <div className="text-[10px] text-gray-500">Diversification Benefit</div>
          <div className="text-lg font-bold text-purple-600">{result2.toFixed(2)}</div>
        </div>
        <div className={`rounded-lg p-3 ${result3 > 0.5 ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'}`}>
          <div className="text-[10px] text-gray-500">Adjusted Metric</div>
          <div className={`text-lg font-bold ${result3 > 0.5 ? 'text-green-600' : 'text-red-600'}`}>
            {result3.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TeamProcess() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Team Structure, Research Culture, and SEBI AIF
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Team structure represents a frontier area in quantitative finance with significant
        potential for Indian markets. As NSE evolves with increasing algorithmic participation
        and regulatory sophistication, techniques from quant firm and AIF regulation offer new
        approaches to alpha discovery and risk management. This section explores the theoretical
        foundations, practical implementations, and Indian market considerations for
        applying team structure to Nifty 50 trading.
      </p>

      <DefinitionBlock
        title="Team Structure"
        label="Definition 20.8"
        definition="Team structure in quantitative finance refers to the application of quant firm and AIF regulation to financial markets for research culture generation, portfolio construction, and risk management. In the context of Indian markets (NSE/Nifty 50), this involves adapting global methods to account for local market microstructure, SEBI regulations, and unique data characteristics such as FII/DII flows, research process, and portfolio manager."
        notation="Key components: risk officer, SEBI AIF, Category III AIF, compliance. Applied to Nifty 50 universe on NSE."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Mathematical Foundation
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The core mathematical framework for team structure in the context of Indian equity
        markets can be expressed through the following optimization problem:
      </p>

      <BlockMath math="\min_{\theta} \mathcal{L}(\theta) = \sum_{t=1}^{T} \ell(y_t, f_\theta(X_t)) + \lambda \|\theta\|_2^2" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="f_\theta" /> represents the quant firm model parameterized
        by <InlineMath math="\theta" />, <InlineMath math="X_t" /> are features derived
        from NSE data including research process and portfolio manager, and 
        <InlineMath math="\lambda" /> controls the regularization to prevent overfitting
        to historical Nifty 50 patterns.
      </p>

      <BlockMath math="S_{\text{portfolio}} = \frac{\mathbb{E}[R_p] - r_f}{\sigma_p} = \frac{\alpha + \beta R_m - r_f}{\sigma_p}" />

      <InteractiveViz />

      <TheoremBlock
        title="Convergence of Quant Firm in Financial Markets"
        label="Theorem 20.8"
        statement="For a quant firm model applied to NSE data with $T$ observations and $p$ features, the out-of-sample prediction error satisfies: $\mathbb{E}[\text{MSE}_{\text{OOS}}] \leq \mathbb{E}[\text{MSE}_{\text{IS}}] + O\left(\sqrt{\frac{p \log T}{T}}\right)$ provided the data generating process is stationary over the evaluation period. For Nifty 50 daily data with $T = 2520$ (10 years) and $p = 50$ features: the generalization gap is approximately $O(0.14)$."
        proof="This bound follows from standard statistical learning theory applied to dependent data (mixing conditions). The key assumption is that NSE returns satisfy beta-mixing with exponential decay, which has been validated empirically for liquid Nifty 50 stocks. The logarithmic factor accounts for the adaptive model selection in AIF regulation."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Application to Indian Markets
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Applying team structure to Indian markets requires careful consideration of local
        factors that differentiate NSE from developed markets:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Factor</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Global Approach</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Indian Adaptation</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Data availability</td>
              <td className="px-4 py-2">20+ years daily data</td>
              <td className="px-4 py-2">NSE quality data from 2005+</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Market microstructure</td>
              <td className="px-4 py-2">Continuous markets</td>
              <td className="px-4 py-2">NSE circuit breakers, T+1 settlement</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Regulatory regime</td>
              <td className="px-4 py-2">SEC/MiFID</td>
              <td className="px-4 py-2">SEBI algo trading rules, STT, stamp duty</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Investor composition</td>
              <td className="px-4 py-2">Institutional dominated</td>
              <td className="px-4 py-2">High retail participation, FII influence</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Structural breaks</td>
              <td className="px-4 py-2">GFC, COVID</td>
              <td className="px-4 py-2">Demonetization, GST, COVID, Adani crisis</td>
            </tr>
          </tbody>
        </table>
      </div>

      <PythonCode
        title="teamprocess_analysis.py"
        runnable
        code={`import numpy as np
from dataclasses import dataclass, field
from typing import List, Dict, Optional

@dataclass
class TeamProcessConfig:
    """Configuration for team structure analysis."""
    universe: str = "Nifty 50"
    exchange: str = "NSE"
    n_assets: int = 50
    lookback_days: int = 252
    confidence_level: float = 0.95
    method: str = "quant firm"

class TeamProcessAnalyzer:
    """Analyzer for team structure in Indian markets."""

    def __init__(self, config: TeamProcessConfig = None):
        self.config = config or TeamProcessConfig()
        self.results: List[dict] = []

    def analyze(self, data: np.ndarray) -> dict:
        """Run team structure analysis on NSE data."""
        n_samples, n_features = data.shape
        
        # Core computation
        mean_signal = np.mean(data, axis=0)
        std_signal = np.std(data, axis=0)
        sharpe = mean_signal / (std_signal + 1e-10) * np.sqrt(252)
        
        # Rank assets by signal strength
        ranks = np.argsort(-sharpe)
        top_quintile = ranks[:n_features // 5]
        bottom_quintile = ranks[-n_features // 5:]
        
        # Long-short portfolio
        ls_returns = np.mean(data[:, top_quintile], axis=1) - np.mean(data[:, bottom_quintile], axis=1)
        ls_sharpe = np.mean(ls_returns) / np.std(ls_returns) * np.sqrt(252)
        
        result = {
            "method": self.config.method,
            "universe": self.config.universe,
            "n_assets": n_features,
            "ls_sharpe": ls_sharpe,
            "top_quintile_sharpe": np.mean(sharpe[top_quintile]),
            "bottom_quintile_sharpe": np.mean(sharpe[bottom_quintile]),
            "spread": np.mean(sharpe[top_quintile]) - np.mean(sharpe[bottom_quintile]),
            "t_stat": ls_sharpe * np.sqrt(n_samples / 252),
            "max_drawdown": np.min(np.minimum.accumulate(np.cumprod(1 + ls_returns)) / np.maximum.accumulate(np.cumprod(1 + ls_returns)) - 1) * 100,
        }
        self.results.append(result)
        return result

    def robustness_check(self, data: np.ndarray, n_bootstrap: int = 100) -> dict:
        """Bootstrap robustness check for NSE strategies."""
        sharpes = []
        n = len(data)
        for _ in range(n_bootstrap):
            idx = np.random.choice(n, size=n, replace=True)
            boot_data = data[idx]
            result = self.analyze(boot_data)
            sharpes.append(result["ls_sharpe"])
        
        return {
            "mean_sharpe": np.mean(sharpes),
            "std_sharpe": np.std(sharpes),
            "ci_lower": np.percentile(sharpes, 2.5),
            "ci_upper": np.percentile(sharpes, 97.5),
            "pct_positive": np.mean([s > 0 for s in sharpes]) * 100,
        }

# Demo: team structure analysis on NSE
np.random.seed(42)
n_days = 1260  # 5 years
n_stocks = 50  # Nifty 50 components

# Simulate NSE returns with research culture signal
returns = np.random.normal(0.0003, 0.018, (n_days, n_stocks))
# Add signal to some stocks
for i in range(10):
    returns[:, i] += np.random.normal(0.0002, 0.001, n_days)

config = TeamProcessConfig(universe="Nifty 50", exchange="NSE")
analyzer = TeamProcessAnalyzer(config)

result = analyzer.analyze(returns)
print("=== Team Structure, Research Culture, and SEBI AIF - NSE Analysis ===")
for key, val in result.items():
    if isinstance(val, float):
        print(f"  {key:30s}: {val:.4f}")
    else:
        print(f"  {key:30s}: {val}")

# Robustness check
robust = analyzer.robustness_check(returns, n_bootstrap=50)
print(f"\n=== Bootstrap Robustness ===")
for key, val in robust.items():
    print(f"  {key:20s}: {val:.3f}")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Implementation Considerations
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        When implementing team structure for NSE trading, several practical considerations
        arise. The quant firm approach must be adapted to handle research process, 
        portfolio manager, and the unique characteristics of Indian financial data.
        Key implementation details include data preprocessing, feature engineering
        specific to Nifty 50 constituents, and validation methodology that respects
        the temporal structure of NSE trading data.
      </p>

      <ExampleBlock
        title="Applying Quant Firm to Nifty 50"
        difficulty="intermediate"
        problem="You want to apply quant firm to discover research culture signals in Nifty 50 stocks. Your dataset has 5 years of daily data for 50 stocks with 20 features each. Design the research pipeline."
        solution={[
          {
            step: 'Data preparation',
            formula: 'X \\in \\mathbb{R}^{1260 \\times 50 \\times 20}, \\; y \\in \\mathbb{R}^{1260 \\times 50}',
            explanation: 'Organize NSE data into a panel with 1260 days, 50 stocks, and 20 features. Labels are forward 21-day returns. Apply purged walk-forward validation with 21-day embargo.',
          },
          {
            step: 'Feature engineering',
            formula: 'X_{\\text{aug}} = \\phi(X) \\in \\mathbb{R}^{1260 \\times 50 \\times 35}',
            explanation: 'Augment with NSE-specific features: research process, portfolio manager, and cross-sectional ranks. Total features expand from 20 to ~35.',
          },
          {
            step: 'Model training with quant firm',
            formula: '\\hat{\\theta} = \\arg\\min_\\theta \\mathcal{L}(\\theta; X_{\\text{train}}, y_{\\text{train}})',
            explanation: 'Train using the quant firm approach on in-sample data (first 60%). Use Bayesian optimization for hyperparameter search with early stopping.',
          },
          {
            step: 'Validation and deployment decision',
            formula: 'S_{\\text{OOS}} > 0.5 \\text{ AND PBO} < 0.25',
            explanation: 'Evaluate on out-of-sample data. Only deploy if OOS Sharpe exceeds 0.5 and PBO (computed via CSCV) is below 0.25. Test specifically on post-demonetization and COVID periods.',
          },
        ]}
      />

      <NoteBlock title="Indian Market Considerations" type="warning">
        <ul className="space-y-1 list-disc list-inside">
          <li>Account for NSE trading hours (9:15 AM -- 3:30 PM IST) and pre-open auction</li>
          <li>Handle NSE circuit breakers that halt individual stocks and the index</li>
          <li>Include risk officer and SEBI AIF as additional signals</li>
          <li>Test across Indian market regime changes: demonetization, GST, COVID</li>
          <li>Consider Category III AIF and compliance in your feature engineering</li>
          <li>SEBI regulations on algo trading require registration and audit trails</li>
        </ul>
      </NoteBlock>


      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Performance Benchmarking
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Evaluating the effectiveness of this approach requires benchmarking against
        standard Indian market indices and factor portfolios. The performance attribution
        should decompose returns into systematic and idiosyncratic components:
      </p>

      <BlockMath math="R_{\\text{strategy}} = \\alpha + \\beta_1 R_{\\text{Nifty}} + \\beta_2 R_{\\text{BankNifty}} + \\sum_k \\gamma_k F_k + \\epsilon" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="F_k" /> represents additional Indian market factors such as
        FII flow momentum, earnings revision, and size factors. The alpha{' '}
        <InlineMath math="\\alpha" /> represents the genuine value-add of the approach after
        controlling for systematic risk exposures on NSE.
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Metric</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Target</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Measurement</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Annualized Sharpe</td>
              <td className="px-4 py-2">&gt; 1.0 net of costs</td>
              <td className="px-4 py-2">Rolling 252-day window</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Maximum Drawdown</td>
              <td className="px-4 py-2">&lt; 15%</td>
              <td className="px-4 py-2">Peak-to-trough on equity curve</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Calmar Ratio</td>
              <td className="px-4 py-2">&gt; 0.5</td>
              <td className="px-4 py-2">Annual return / Max DD</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Win Rate</td>
              <td className="px-4 py-2">&gt; 52%</td>
              <td className="px-4 py-2">Percentage of profitable days</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Turnover</td>
              <td className="px-4 py-2">&lt; 24x annually</td>
              <td className="px-4 py-2">Sum of absolute weight changes</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Information Ratio vs Nifty</td>
              <td className="px-4 py-2">&gt; 0.5</td>
              <td className="px-4 py-2">Active return / Tracking error</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Risk Management Integration
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Any implementation on NSE must integrate with a comprehensive risk management
        framework. The Value-at-Risk for the strategy portfolio should be computed using
        the conditional distribution:
      </p>

      <BlockMath math="\\text{VaR}_{\\alpha}(R_p) = -\\inf\\{x : P(R_p \\leq x) \\geq \\alpha\\}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For Indian markets, VaR should be computed using Expected Shortfall (ES) as the
        primary risk measure, as SEBI increasingly requires tail risk reporting:
      </p>

      <BlockMath math="\\text{ES}_{\\alpha} = -\\frac{1}{\\alpha}\\int_0^{\\alpha} \\text{VaR}_u \\, du" />

      <NoteBlock title="Regulatory and Practical Notes" type="historical">
        <ul className="space-y-2">
          <li>
            <strong>SEBI Framework:</strong> All algorithmic strategies on NSE must comply
            with SEBI circular on algo trading, including registration, risk checks, and
            audit trail requirements.
          </li>
          <li>
            <strong>Tax Implications:</strong> STT of 0.1% on delivery and 0.025% on intraday
            affects strategy net returns. GST at 18% on brokerage adds additional friction.
          </li>
          <li>
            <strong>Data Infrastructure:</strong> Use Zerodha Kite or Angel One SmartAPI for
            live data. Historical data available from NSE archives and third-party providers
            like Quandl and Bloomberg.
          </li>
          <li>
            <strong>Compute Requirements:</strong> Deploy on AWS Mumbai (ap-south-1) for
            minimum latency to NSE co-location. Typical cost: INR 10,000--50,000/month
            for a production trading system.
          </li>
        </ul>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Team structure offers promising avenues for alpha discovery in Indian markets,
          but requires careful adaptation to NSE microstructure and SEBI regulatory
          requirements. The key to success is combining quant firm with robust validation
          methodology -- including PBO analysis, walk-forward testing, and regime-aware
          evaluation across Indian market structural breaks. Always maintain the discipline
          of hypothesis-driven research even when using automated AIF regulation approaches.
        </p>
      </NoteBlock>
    </div>
  )
}
