import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveDueDiligence() {
  const [checks, setChecks] = useState([
    { name: 'Economic Rationale', score: 8, weight: 20 },
    { name: 'Statistical Significance', score: 7, weight: 15 },
    { name: 'Out-of-Sample Performance', score: 6, weight: 20 },
    { name: 'Transaction Cost Analysis', score: 9, weight: 15 },
    { name: 'Capacity Estimation', score: 5, weight: 10 },
    { name: 'Robustness Checks', score: 7, weight: 10 },
    { name: 'Risk Profile', score: 8, weight: 10 },
  ])

  const totalScore = checks.reduce((sum, c) => sum + c.score * c.weight, 0) / checks.reduce((sum, c) => sum + c.weight, 0)
  const verdict = totalScore >= 7.5 ? 'DEPLOY' : totalScore >= 5.5 ? 'REVIEW' : 'REJECT'

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Strategy Due Diligence Scorecard
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Rate each dimension (1-10) to evaluate a strategy for NSE deployment.
      </p>
      <div className="space-y-2 mb-3">
        {checks.map((check, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-xs text-gray-600 dark:text-gray-400 w-40">{check.name} ({check.weight}%)</span>
            <input type="range" min="1" max="10" step="1" value={check.score}
              onChange={e => {
                const next = [...checks]
                next[i] = { ...next[i], score: parseInt(e.target.value) }
                setChecks(next)
              }}
              className="h-2 flex-1 cursor-pointer accent-indigo-500" />
            <span className={`text-sm font-bold w-8 ${check.score >= 7 ? 'text-green-600' : check.score >= 4 ? 'text-yellow-600' : 'text-red-600'}`}>
              {check.score}
            </span>
          </div>
        ))}
      </div>
      <div className={`rounded-lg p-3 text-center ${verdict === 'DEPLOY' ? 'bg-green-100 dark:bg-green-900/40' : verdict === 'REVIEW' ? 'bg-yellow-100 dark:bg-yellow-900/40' : 'bg-red-100 dark:bg-red-900/40'}`}>
        <span className="text-xs text-gray-500">Weighted Score: </span>
        <span className={`text-lg font-bold ${verdict === 'DEPLOY' ? 'text-green-700' : verdict === 'REVIEW' ? 'text-yellow-700' : 'text-red-700'}`}>
          {totalScore.toFixed(1)}/10 -- {verdict}
        </span>
      </div>
    </div>
  )
}

export default function DueDiligence() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Strategy Due Diligence Checklist
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Before allocating capital to any quantitative strategy on NSE, a rigorous due diligence
        process must be completed. This structured evaluation covers statistical validity,
        economic rationale, risk characteristics, and operational readiness. A strategy that
        fails any critical check should not proceed to paper trading.
      </p>

      <DefinitionBlock
        title="Strategy Due Diligence"
        label="Definition 19.7"
        definition="Strategy due diligence is a systematic evaluation process that assesses a trading strategy across multiple dimensions: statistical validity, economic rationale, risk profile, capacity, operational feasibility, and regulatory compliance. For Indian markets, this includes specific checks for SEBI compliance, NSE/BSE microstructure compatibility, and Indian tax efficiency."
        notation="A strategy must score above threshold on ALL critical dimensions (not just the average) to proceed."
      />

      <InteractiveDueDiligence />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Seven Pillars of Due Diligence
      </h3>

      <BlockMath math="\text{DD Score} = \sum_{i=1}^{7} w_i \cdot s_i \cdot \mathbb{1}[s_i \geq s_{\min,i}]" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The indicator function ensures that a strategy scoring below the minimum on any
        dimension receives a zero contribution from that dimension, effectively vetoing deployment.
      </p>

      <TheoremBlock
        title="Strategy Quality Score"
        label="Theorem 19.7"
        statement="A strategy's quality can be assessed using the deflated Sharpe ratio: $\text{DSR} = \text{SR} - \sqrt{\frac{V[\hat{\text{SR}}]}{1}} \cdot \Phi^{-1}\left(1 - \frac{1}{N_{\text{trials}}}\right)$ where $V[\hat{\text{SR}}] = \frac{1 + \frac{1}{2}\text{SR}^2 - \gamma_3 \cdot \text{SR} + \frac{\gamma_4 - 1}{4}\text{SR}^2}{T-1}$ accounts for non-normality ($\gamma_3$ = skewness, $\gamma_4$ = kurtosis) and $N_{\text{trials}}$ is the total number of strategies tested."
        proof="The deflated Sharpe ratio (Bailey and Lopez de Prado, 2014) adjusts the observed Sharpe for the multiple testing bias. It estimates the probability that the observed Sharpe is a false positive given $N$ trials. DSR > 0 indicates the strategy likely has genuine alpha after accounting for data mining."
      />

      <PythonCode
        title="due_diligence_framework.py"
        runnable
        code={`import numpy as np
from dataclasses import dataclass, field
from typing import List, Dict, Tuple
from scipy import stats

@dataclass
class DueDiligenceCheck:
    name: str
    category: str
    score: float  # 0-10
    min_score: float  # Minimum to pass
    weight: float  # Weight in composite
    details: str = ''

    @property
    def passed(self) -> bool:
        return self.score >= self.min_score

class StrategyDueDiligence:
    """Comprehensive due diligence for NSE strategies."""

    def __init__(self, strategy_name: str):
        self.strategy_name = strategy_name
        self.checks: List[DueDiligenceCheck] = []

    def add_check(self, **kwargs):
        self.checks.append(DueDiligenceCheck(**kwargs))

    def evaluate(self) -> dict:
        total_weight = sum(c.weight for c in self.checks)
        weighted_score = sum(
            c.score * c.weight for c in self.checks
        ) / total_weight

        critical_fails = [c for c in self.checks if not c.passed]
        all_pass = len(critical_fails) == 0

        if all_pass and weighted_score >= 7.5:
            verdict = 'DEPLOY'
        elif all_pass and weighted_score >= 5.5:
            verdict = 'CONDITIONAL_DEPLOY'
        else:
            verdict = 'REJECT'

        return {
            'strategy': self.strategy_name,
            'weighted_score': weighted_score,
            'all_critical_pass': all_pass,
            'critical_failures': [c.name for c in critical_fails],
            'verdict': verdict,
            'checks_passed': sum(1 for c in self.checks if c.passed),
            'total_checks': len(self.checks),
        }

    def deflated_sharpe(self, observed_sr: float, n_trials: int,
                        T: int, skew: float = 0,
                        kurt: float = 3) -> float:
        """Calculate Deflated Sharpe Ratio."""
        sr_var = (1 + 0.5 * observed_sr**2 -
                  skew * observed_sr +
                  (kurt - 1) / 4 * observed_sr**2) / (T - 1)
        sr_std = np.sqrt(sr_var)
        threshold = sr_std * stats.norm.ppf(1 - 1/n_trials)
        dsr = observed_sr - threshold
        return dsr

# Run due diligence on a Nifty 50 momentum strategy
dd = StrategyDueDiligence('Nifty50_Momentum_v3')

dd.add_check(
    name='Economic Rationale', category='Fundamental',
    score=8.5, min_score=6.0, weight=20,
    details='FII flow-driven momentum with clear economic mechanism'
)
dd.add_check(
    name='Statistical Significance', category='Statistical',
    score=7.0, min_score=6.0, weight=15,
    details='t-stat=2.8, passes Bonferroni for 15 trials'
)
dd.add_check(
    name='Out-of-Sample Performance', category='Statistical',
    score=6.5, min_score=5.0, weight=20,
    details='OOS Sharpe=1.1, IS Sharpe=1.6, decay=31%'
)
dd.add_check(
    name='Transaction Costs', category='Practical',
    score=8.0, min_score=5.0, weight=15,
    details='10 bps round-trip on NSE, strategy net Sharpe=0.9'
)
dd.add_check(
    name='Capacity', category='Practical',
    score=7.0, min_score=4.0, weight=10,
    details='Estimated capacity INR 50Cr based on Nifty 50 ADV'
)
dd.add_check(
    name='Robustness', category='Statistical',
    score=6.0, min_score=5.0, weight=10,
    details='PBO=0.22, stable across 3 sub-periods'
)
dd.add_check(
    name='Risk Profile', category='Risk',
    score=7.5, min_score=5.0, weight=10,
    details='MaxDD=8.5%, tail ratio=1.2, no catastrophic risk'
)

result = dd.evaluate()
print("=== Strategy Due Diligence Report ===")
print(f"Strategy: {result['strategy']}")
print(f"Weighted Score: {result['weighted_score']:.1f}/10")
print(f"Critical Checks: {result['checks_passed']}/{result['total_checks']} passed")
print(f"Verdict: {result['verdict']}")

if result['critical_failures']:
    print(f"\\nCritical Failures:")
    for f in result['critical_failures']:
        print(f"  - {f}")

print(f"\\n--- Individual Checks ---")
for c in dd.checks:
    status = "PASS" if c.passed else "FAIL"
    print(f"  [{status}] {c.name:25s}: {c.score:.1f}/10 "
          f"(min: {c.min_score}, w: {c.weight}%)")

# Deflated Sharpe Ratio
dsr = dd.deflated_sharpe(
    observed_sr=1.6,  # IS annualized Sharpe
    n_trials=15,       # strategies tested
    T=1260,           # 5 years daily
    skew=-0.3,        # negative skew (typical)
    kurt=4.5          # excess kurtosis (fat tails)
)
print(f"\\n=== Deflated Sharpe Ratio ===")
print(f"Observed Sharpe: 1.60")
print(f"Deflated Sharpe: {dsr:.3f}")
print(f"DSR > 0: {'YES - genuine alpha likely' if dsr > 0 else 'NO - may be data mining'}")`}
      />

      <ExampleBlock
        title="Red Flags in Strategy Evaluation"
        difficulty="intermediate"
        problem="A colleague presents a Bank Nifty options strategy with Sharpe 3.5, max drawdown 2%, and 95% win rate over 3 years. What due diligence questions should you ask?"
        solution={[
          { step: 'Sharpe ratio sanity check', formula: '\\text{Sharpe} = 3.5 \\gg 2.0 \\text{ (typical upper bound for liquid markets)}', explanation: 'Sharpe above 3.0 for a daily strategy on Bank Nifty is extremely unusual. This is a red flag for either overfitting, survivorship bias, or incorrect cost modeling.' },
          { step: 'Win rate vs payoff ratio', formula: '95\\% \\text{ win rate} \\Rightarrow \\text{likely selling options (small wins, rare large losses)}', explanation: 'A 95% win rate with 2% max drawdown suggests the strategy is selling options and has not yet experienced a tail event (e.g., COVID crash, demonetization shock).' },
          { step: 'Drawdown analysis', formula: '\\text{MaxDD} = 2\\% \\text{ is suspiciously low for 3 years on Bank Nifty}', explanation: 'Bank Nifty moved 30%+ during COVID. A 2% max drawdown implies the strategy was not tested through this period or uses look-ahead bias.' },
          { step: 'Key questions to ask', formula: '\\text{How many parameter combinations tested? What is the PBO?}', explanation: 'Also ask: Does the backtest include the March 2020 crash? How are STT and stamp duty modeled? What is the slippage assumption for Bank Nifty options (which can be illiquid)? What is the capacity in INR terms?' },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Robustness Testing Framework
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A robust strategy should produce similar results across variations in parameters,
        universe definition, and time periods. The robustness score measures sensitivity
        to perturbations:
      </p>

      <BlockMath math="R = 1 - \frac{\text{Var}(\text{Sharpe} | \theta \in \Theta_\epsilon)}{\text{Var}(\text{Sharpe} | \theta \in \Theta)}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\Theta_\epsilon" /> is the set of parameter values within{' '}
        <InlineMath math="\epsilon" /> of the optimal, and <InlineMath math="\Theta" /> is
        the full parameter space. A robustness score close to 1 indicates the strategy
        is insensitive to small parameter changes.
      </p>

      <PythonCode
        title="robustness_testing.py"
        runnable
        code={`import numpy as np
from scipy import stats

class RobustnessAnalyzer:
    """Test strategy robustness across perturbations."""

    def __init__(self, base_sharpe: float, base_params: dict):
        self.base_sharpe = base_sharpe
        self.base_params = base_params
        self.perturbation_results = []

    def add_perturbation(self, param_name: str,
                         perturbed_value, sharpe: float):
        self.perturbation_results.append({
            'param': param_name,
            'value': perturbed_value,
            'sharpe': sharpe,
            'decay': 1 - sharpe / self.base_sharpe,
        })

    def analyze(self) -> dict:
        sharpes = [r['sharpe'] for r in self.perturbation_results]
        decays = [r['decay'] for r in self.perturbation_results]

        return {
            'base_sharpe': self.base_sharpe,
            'mean_perturbed_sharpe': np.mean(sharpes),
            'std_perturbed_sharpe': np.std(sharpes),
            'mean_decay': np.mean(decays),
            'max_decay': np.max(decays),
            'pct_positive': np.mean([s > 0 for s in sharpes]) * 100,
            'robustness_score': 1 - np.std(sharpes) / (np.std(sharpes) + abs(np.mean(sharpes))),
            'verdict': (
                'ROBUST' if np.mean(decays) < 0.3 and np.min(sharpes) > 0.3
                else 'FRAGILE' if np.max(decays) > 0.7
                else 'MODERATE'
            ),
        }

# Test robustness of a Nifty 50 momentum strategy
np.random.seed(42)
analyzer = RobustnessAnalyzer(
    base_sharpe=1.5,
    base_params={'lookback': 252, 'holding': 21, 'universe': 'Nifty50'}
)

# Perturb lookback period
for lb in [126, 189, 210, 231, 273, 294, 315]:
    sharpe = 1.5 * np.exp(-0.002 * abs(lb - 252)) + np.random.normal(0, 0.1)
    analyzer.add_perturbation('lookback', lb, max(sharpe, -0.5))

# Perturb holding period
for hp in [5, 10, 15, 42, 63]:
    sharpe = 1.5 * np.exp(-0.01 * abs(hp - 21)) + np.random.normal(0, 0.15)
    analyzer.add_perturbation('holding', hp, max(sharpe, -0.5))

# Perturb universe
for univ in ['Nifty100', 'Nifty200', 'Nifty500', 'NiftyMidcap']:
    sharpe = 1.5 + np.random.normal(0, 0.3)
    analyzer.add_perturbation('universe', univ, max(sharpe, -0.5))

# Perturb sub-periods
for period in ['2015-2017', '2017-2019', '2019-2021', '2021-2023']:
    sharpe = 1.5 + np.random.normal(-0.2, 0.4)
    analyzer.add_perturbation('period', period, max(sharpe, -0.5))

result = analyzer.analyze()
print("=== Robustness Analysis ===")
print(f"Base Sharpe: {result['base_sharpe']:.2f}")
print(f"Mean Perturbed Sharpe: {result['mean_perturbed_sharpe']:.2f}")
print(f"Std Perturbed Sharpe: {result['std_perturbed_sharpe']:.2f}")
print(f"Mean Decay: {result['mean_decay']:.1%}")
print(f"Max Decay: {result['max_decay']:.1%}")
print(f"% Positive Sharpe: {result['pct_positive']:.0f}%")
print(f"Robustness Score: {result['robustness_score']:.2f}")
print(f"Verdict: {result['verdict']}")

print(f"\\n--- Perturbation Details ---")
for r in analyzer.perturbation_results[:10]:
    print(f"  {r['param']:12s} = {str(r['value']):12s} -> "
          f"Sharpe={r['sharpe']:.2f} (decay={r['decay']:.1%})")`}
      />

      <NoteBlock title="Due Diligence for SEBI AIF Registration" type="warning">
        <p>
          If deploying strategies through a SEBI-registered Alternative Investment Fund (AIF),
          additional due diligence requirements apply:
        </p>
        <ul className="mt-2 list-disc list-inside space-y-1">
          <li>Strategy must be documented in the AIF offering memorandum</li>
          <li>Risk disclosures must include maximum historical drawdown</li>
          <li>Performance must be audited by an independent chartered accountant</li>
          <li>Leverage limits as per SEBI AIF regulations (Category III: up to 2x)</li>
          <li>Investor suitability assessment required (minimum ticket INR 1 Cr)</li>
          <li>Quarterly reporting to SEBI with strategy performance attribution</li>
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
          Strategy due diligence is a <strong>structured skepticism process</strong>. The
          default assumption should be that every backtest is overfit until proven otherwise.
          Use the seven-pillar framework (economic rationale, statistical significance, OOS
          performance, transaction costs, capacity, robustness, risk profile) and require
          passing scores on ALL critical dimensions. The deflated Sharpe ratio is your best
          single metric for detecting data-mined strategies. Test robustness across parameter
          perturbations, sub-periods, and universe definitions before deploying on NSE.
        </p>
      </NoteBlock>
    </div>
  )
}
