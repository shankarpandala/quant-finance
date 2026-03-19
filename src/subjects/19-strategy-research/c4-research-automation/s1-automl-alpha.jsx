import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveAutoML() {
  const [nFeatures, setNFeatures] = useState(50)
  const [nModels, setNModels] = useState(20)
  const [searchTime, setSearchTime] = useState(4)
  const [overfitPenalty, setOverfitPenalty] = useState(0.3)

  const effectiveTrials = nModels * Math.ceil(nFeatures / 10)
  const correctedAlpha = 0.05 / effectiveTrials
  const minTStat = 2.326 + Math.log(effectiveTrials) * 0.3
  const expectedFalseDisc = effectiveTrials * 0.05
  const adjustedSharpe = 1.5 * (1 - overfitPenalty)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: AutoML Alpha Discovery Configuration
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Configure AutoML search parameters and see the impact on false discovery risk.
      </p>
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Feature Pool: {nFeatures}</span>
          <input type="range" min="10" max="200" step="10" value={nFeatures}
            onChange={e => setNFeatures(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Model Variants: {nModels}</span>
          <input type="range" min="5" max="100" step="5" value={nModels}
            onChange={e => setNModels(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Search Hours: {searchTime}</span>
          <input type="range" min="1" max="24" step="1" value={searchTime}
            onChange={e => setSearchTime(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Overfit Penalty: {(overfitPenalty * 100).toFixed(0)}%</span>
          <input type="range" min="0" max="0.8" step="0.05" value={overfitPenalty}
            onChange={e => setOverfitPenalty(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-900/30">
          <div className="text-[10px] text-gray-500">Effective Trials</div>
          <div className="text-sm font-bold text-blue-600">{effectiveTrials}</div>
        </div>
        <div className="rounded-lg bg-purple-50 p-2 dark:bg-purple-900/30">
          <div className="text-[10px] text-gray-500">Min t-stat</div>
          <div className="text-sm font-bold text-purple-600">{minTStat.toFixed(2)}</div>
        </div>
        <div className={`rounded-lg p-2 ${expectedFalseDisc > 5 ? 'bg-red-50 dark:bg-red-900/30' : 'bg-green-50 dark:bg-green-900/30'}`}>
          <div className="text-[10px] text-gray-500">Expected False Disc.</div>
          <div className={`text-sm font-bold ${expectedFalseDisc > 5 ? 'text-red-600' : 'text-green-600'}`}>{expectedFalseDisc.toFixed(0)}</div>
        </div>
        <div className="rounded-lg bg-orange-50 p-2 dark:bg-orange-900/30">
          <div className="text-[10px] text-gray-500">Adj. Sharpe</div>
          <div className="text-sm font-bold text-orange-600">{adjustedSharpe.toFixed(2)}</div>
        </div>
      </div>
    </div>
  )
}

export default function AutoMLAlpha() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        AutoML for Alpha Discovery
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Automated Machine Learning (AutoML) applies systematic search across model architectures,
        hyperparameters, and feature combinations to discover alpha signals in NSE data. While
        powerful, AutoML dramatically amplifies the multiple testing problem, requiring careful
        safeguards against overfitting.
      </p>

      <DefinitionBlock
        title="AutoML for Alpha Research"
        label="Definition 19.10"
        definition="AutoML for alpha discovery is the automated search over (1) feature engineering transformations, (2) model architectures (linear, tree-based, neural), (3) hyperparameters, and (4) portfolio construction methods to find combinations that generate risk-adjusted returns exceeding a threshold. For Indian markets, the feature space includes NSE price/volume data, F&O derivatives data, FII/DII flows, and macroeconomic indicators."
        notation="Search space: |F| x |M| x |H| x |P| where F = features, M = models, H = hyperparameters, P = portfolio methods. Typical total: 10^4 to 10^6 configurations."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The AutoML Pipeline for Indian Markets
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        An AutoML alpha discovery system operates in stages, with each stage expanding
        the effective number of trials:
      </p>

      <BlockMath math="N_{\text{effective}} = |F_{\text{selected}}| \times |M| \times |H_{\text{grid}}| \times |P|" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The critical challenge is that the total Sharpe reported by the best configuration
        is inflated by this massive search. The deflated Sharpe must account for all trials:
      </p>

      <BlockMath math="S_{\text{deflated}} = S_{\text{best}} - \sigma_S \cdot \Phi^{-1}\left(1 - \frac{1}{N_{\text{effective}}}\right)" />

      <InteractiveAutoML />

      <TheoremBlock
        title="Expected Maximum Sharpe Under Null"
        label="Theorem 19.10"
        statement="When testing $N$ independent strategies on data of length $T$ under the null hypothesis of no alpha, the expected maximum Sharpe ratio is: $\mathbb{E}[\max_i S_i] \approx \sigma_S \cdot \left(\sqrt{2 \ln N} - \frac{\ln \ln N + \ln(4\pi)}{2\sqrt{2 \ln N}}\right)$ where $\sigma_S = 1/\sqrt{T}$ is the standard error of the Sharpe estimate. For $N = 10000$ trials on $T = 2520$ days: $\mathbb{E}[\max S] \approx 0.85$."
        proof="This follows from the extreme value theory for the maximum of $N$ i.i.d. standard normal variables. The Sharpe ratio under the null is approximately $S_i \sim N(0, 1/T)$, so $\max_i S_i$ follows a Gumbel distribution with the stated expectation. The practical implication is that any AutoML system testing 10,000 configurations will find strategies with Sharpe ~0.85 even in pure noise."
      />

      <PythonCode
        title="automl_alpha_search.py"
        runnable
        code={`import numpy as np
from itertools import product
from dataclasses import dataclass
from typing import List, Dict, Tuple

@dataclass
class AlphaCandidate:
    feature_set: str
    model: str
    params: dict
    is_sharpe: float
    oos_sharpe: float
    t_stat: float
    pbo: float

class AutoMLAlphaSearch:
    """AutoML framework for alpha discovery on NSE data."""

    def __init__(self, significance_level: float = 0.05):
        self.alpha = significance_level
        self.candidates: List[AlphaCandidate] = []
        self.n_trials = 0

    def search(self, returns: np.ndarray,
               feature_sets: List[str],
               models: List[str],
               n_params_per_model: int = 5) -> List[AlphaCandidate]:
        """Run automated search across configurations."""
        T = len(returns)
        n_train = int(T * 0.6)
        n_val = int(T * 0.2)

        train = returns[:n_train]
        val = returns[n_train:n_train + n_val]
        test = returns[n_train + n_val:]

        for feat in feature_sets:
            for model in models:
                for param_idx in range(n_params_per_model):
                    self.n_trials += 1

                    # Simulate model training with noise
                    noise_is = np.random.normal(0, 0.0002)
                    noise_oos = np.random.normal(0, 0.0003)

                    is_ret = train + noise_is
                    oos_ret = val + noise_oos

                    is_sharpe = np.mean(is_ret) / np.std(is_ret) * np.sqrt(252)
                    oos_sharpe = np.mean(oos_ret) / np.std(oos_ret) * np.sqrt(252)
                    t_stat = np.mean(oos_ret) / (np.std(oos_ret) / np.sqrt(len(oos_ret)))

                    candidate = AlphaCandidate(
                        feature_set=feat, model=model,
                        params={'idx': param_idx},
                        is_sharpe=is_sharpe, oos_sharpe=oos_sharpe,
                        t_stat=t_stat,
                        pbo=np.random.uniform(0.1, 0.6)
                    )
                    self.candidates.append(candidate)

        # Sort by OOS Sharpe
        self.candidates.sort(key=lambda c: c.oos_sharpe, reverse=True)
        return self.candidates

    def deflated_sharpe(self, observed_sr: float) -> float:
        """Calculate deflated Sharpe accounting for all trials."""
        from scipy.stats import norm
        sr_std = 1 / np.sqrt(252 * 5)  # 5 years
        threshold = sr_std * norm.ppf(1 - 1 / max(self.n_trials, 1))
        return observed_sr - threshold

    def filter_candidates(self, min_deflated_sr: float = 0.0,
                          max_pbo: float = 0.25) -> List[AlphaCandidate]:
        """Filter candidates using deflated Sharpe and PBO."""
        filtered = []
        for c in self.candidates:
            dsr = self.deflated_sharpe(c.oos_sharpe)
            if dsr > min_deflated_sr and c.pbo < max_pbo:
                filtered.append(c)
        return filtered

# Simulate AutoML search on NSE data
np.random.seed(42)
T = 2520  # 10 years daily

# Base returns with small signal
base_returns = np.random.normal(0.0003, 0.015, T)

searcher = AutoMLAlphaSearch()

feature_sets = [
    'momentum_12m', 'momentum_6m', 'mean_rev_20d',
    'volume_breakout', 'fii_flow', 'earnings_surprise',
    'quality_roe', 'low_vol', 'value_pe', 'size_mcap'
]

models = ['linear', 'ridge', 'lasso', 'random_forest',
          'gradient_boost', 'xgboost', 'lightgbm', 'mlp']

candidates = searcher.search(base_returns, feature_sets, models, 5)

print("=== AutoML Alpha Discovery Results ===")
print(f"Total trials: {searcher.n_trials}")
print(f"Feature sets: {len(feature_sets)}")
print(f"Models: {len(models)}")
print(f"\\n--- Top 10 Candidates (by OOS Sharpe) ---")
for i, c in enumerate(candidates[:10]):
    dsr = searcher.deflated_sharpe(c.oos_sharpe)
    print(f"  {i+1}. {c.feature_set:20s} | {c.model:15s} | "
          f"IS={c.is_sharpe:.2f} OOS={c.oos_sharpe:.2f} "
          f"DSR={dsr:.2f} PBO={c.pbo:.2f}")

# Filter with safeguards
filtered = searcher.filter_candidates(
    min_deflated_sr=0.0, max_pbo=0.25
)
print(f"\\n--- After Filtering (DSR>0, PBO<0.25) ---")
print(f"Survivors: {len(filtered)} / {searcher.n_trials}")
for c in filtered[:5]:
    dsr = searcher.deflated_sharpe(c.oos_sharpe)
    print(f"  {c.feature_set:20s} | {c.model:15s} | "
          f"OOS={c.oos_sharpe:.2f} DSR={dsr:.2f}")`}
      />

      <ExampleBlock
        title="AutoML Pitfall: The NSE Feature Factory"
        difficulty="advanced"
        problem="You build a feature factory with 200 technical indicators computed on 50 Nifty stocks, test 10 ML models with 20 hyperparameter configs each, resulting in 200 x 10 x 20 = 40,000 trials. The best model shows Sharpe 2.5. Is it real?"
        solution={[
          {
            step: 'Expected maximum Sharpe under null',
            formula: 'E[\\max S] \\approx \\frac{1}{\\sqrt{T}} \\sqrt{2 \\ln(40000)} \\approx \\frac{1}{\\sqrt{2520}} \\times 4.6 \\approx 0.092 \\times 4.6 = 0.42',
            explanation: 'Even with pure noise data and 40,000 trials, you expect to find a strategy with annualized Sharpe ~0.42.',
          },
          {
            step: 'Calculate deflated Sharpe',
            formula: 'S_{\\text{deflated}} = 2.5 - 0.42 = 2.08',
            explanation: 'Subtracting the expected null maximum gives a deflated Sharpe of 2.08, which is still strong.',
          },
          {
            step: 'But check the Bonferroni threshold',
            formula: 't_{\\text{Bonf}} = \\Phi^{-1}(1 - 0.05/80000) = 4.73',
            explanation: 'With 40,000 trials (two-sided), the Bonferroni corrected t-stat threshold is 4.73. Your t-stat of 2.5/0.092 = 27.2 actually passes! But this assumes independence.',
          },
          {
            step: 'Account for feature correlation',
            formula: 'N_{\\text{eff}} \\ll 40000 \\text{ due to correlated features}',
            explanation: 'Most of your 200 indicators are highly correlated (e.g., RSI-14 and RSI-21). The effective number of independent trials may be only 500-2000. Even so, always validate with PBO < 0.25 and walk-forward testing on NSE data before deploying.',
          },
        ]}
      />

      <NoteBlock title="AutoML Safeguards for Indian Markets" type="warning">
        <ul className="space-y-1 list-disc list-inside">
          <li>Always compute the <strong>deflated Sharpe ratio</strong> accounting for all trials</li>
          <li>Use <strong>PBO &lt; 0.25</strong> as a mandatory filter for AutoML discoveries</li>
          <li>Require <strong>economic rationale</strong> for any AutoML-discovered signal</li>
          <li>Use walk-forward validation with NSE-specific embargo periods</li>
          <li>Account for feature correlation when estimating effective trial count</li>
          <li>Test on multiple Indian market regimes (pre/post demonetization, COVID)</li>
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
          AutoML is a powerful tool for alpha discovery but a <strong>dangerous one without
          safeguards</strong>. The massive search space (10,000+ configurations) guarantees
          finding strategies with impressive in-sample performance even in pure noise. Always
          apply deflated Sharpe, PBO analysis, and walk-forward validation. For NSE strategies,
          require economic rationale for any AutoML-discovered signal before deploying capital.
        </p>
      </NoteBlock>
    </div>
  )
}
