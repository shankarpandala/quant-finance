import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveHypothesisTest() {
  const [nTrades, setNTrades] = useState(100)
  const [meanReturn, setMeanReturn] = useState(0.15)
  const [stdReturn, setStdReturn] = useState(1.2)

  const tStat = (meanReturn / stdReturn) * Math.sqrt(nTrades)
  const criticalValue = 1.96
  const pValue = 2 * (1 - normalCDF(Math.abs(tStat)))
  const isSignificant = Math.abs(tStat) > criticalValue
  const minTrades = Math.ceil((criticalValue * stdReturn / meanReturn) ** 2)

  function normalCDF(x) {
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741
    const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911
    const sign = x < 0 ? -1 : 1
    x = Math.abs(x) / Math.sqrt(2)
    const t = 1.0 / (1.0 + p * x)
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)
    return 0.5 * (1.0 + sign * y)
  }

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Statistical Significance of Paper Trading Returns
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Test whether your paper trading returns are statistically different from zero
        using a t-test. Adjust parameters to see the required sample size.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Number of trades: {nTrades}</span>
          <input type="range" min="10" max="1000" step="10" value={nTrades}
            onChange={e => setNTrades(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Mean return (%): {meanReturn.toFixed(2)}</span>
          <input type="range" min="-1" max="2" step="0.01" value={meanReturn}
            onChange={e => setMeanReturn(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Std dev (%): {stdReturn.toFixed(2)}</span>
          <input type="range" min="0.1" max="5" step="0.05" value={stdReturn}
            onChange={e => setStdReturn(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-4 gap-3 text-center">
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
          <div className="text-xs text-gray-500">t-statistic</div>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{tStat.toFixed(3)}</div>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
          <div className="text-xs text-gray-500">p-value</div>
          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{pValue.toFixed(4)}</div>
        </div>
        <div className={`rounded-lg p-3 ${isSignificant ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'}`}>
          <div className="text-xs text-gray-500">Significant?</div>
          <div className={`text-lg font-bold ${isSignificant ? 'text-green-600' : 'text-red-600'}`}>
            {isSignificant ? 'YES' : 'NO'}
          </div>
        </div>
        <div className="rounded-lg bg-orange-50 p-3 dark:bg-orange-900/30">
          <div className="text-xs text-gray-500">Min Trades Needed</div>
          <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
            {meanReturn > 0 ? minTrades : 'Inf'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function StatisticalValidation() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Statistical Tests for Live vs Backtest Validation
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Before deploying a strategy live on NSE, we need rigorous statistical evidence that
        paper trading results are consistent with backtest expectations. This section covers
        the hypothesis testing framework for validating forward test results.
      </p>

      <DefinitionBlock
        title="Strategy Validation Hypothesis"
        label="Definition 18.3"
        definition="The null hypothesis for strategy validation states that paper trading returns are drawn from the same distribution as backtest returns: H_0: mu_paper = mu_backtest. We test against H_1: mu_paper != mu_backtest at significance level alpha (typically 5%). Rejection of H_0 indicates a systematic discrepancy requiring investigation."
        notation="We use two-sample t-tests, KS tests, and permutation tests depending on distributional assumptions."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Minimum Sample Size Problem
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A critical question for Indian market strategies: how many paper trades do we need
        before the results are statistically meaningful? The answer depends on the strategy
        Sharpe ratio and the desired confidence level.
      </p>

      <BlockMath math="n_{\min} = \left(\frac{z_{\alpha/2} \cdot \sigma_r}{\mu_r}\right)^2" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For a strategy with annualized Sharpe of 1.5 trading Nifty 50 components daily,
        with per-trade return of 0.15% and standard deviation of 1.2%, we need:
      </p>

      <BlockMath math="n_{\min} = \left(\frac{1.96 \times 1.2}{0.15}\right)^2 = \left(15.68\right)^2 \approx 246 \text{ trades}" />

      <InteractiveHypothesisTest />

      <TheoremBlock
        title="Two-Sample Test for Return Distributions"
        label="Theorem 18.3"
        statement="To test whether backtest and paper trading returns come from the same distribution, the Kolmogorov-Smirnov (KS) test statistic is: $D_{n,m} = \sup_x |F_{n,\text{bt}}(x) - F_{m,\text{paper}}(x)|$ where $F_n$ and $F_m$ are the empirical CDFs. Under $H_0$, $\sqrt{\frac{nm}{n+m}} D_{n,m} \to K$ (Kolmogorov distribution). Reject $H_0$ at level $\alpha$ if $D_{n,m} > c(\alpha) \sqrt{\frac{n+m}{nm}}$."
        proof="The KS test is distribution-free, making it ideal for comparing return distributions that may be non-normal (heavy-tailed, as commonly observed in NSE returns). The test detects differences in location, scale, and shape simultaneously."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Comprehensive Statistical Validation Suite
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A single test is insufficient. We apply a battery of tests to validate paper
        trading results against backtest expectations:
      </p>

      <PythonCode
        title="statistical_validation.py"
        runnable
        code={`import numpy as np
from scipy import stats

class StrategyValidator:
    """Statistical validation suite for paper vs backtest."""

    def __init__(self, backtest_returns, paper_returns, alpha=0.05):
        self.bt = np.array(backtest_returns)
        self.paper = np.array(paper_returns)
        self.alpha = alpha
        self.results = {}

    def t_test_returns(self):
        """Two-sample t-test: are mean returns different?"""
        t_stat, p_value = stats.ttest_ind(
            self.bt, self.paper, equal_var=False  # Welch's
        )
        self.results['t_test'] = {
            'statistic': t_stat, 'p_value': p_value,
            'reject_H0': p_value < self.alpha,
            'interpretation': (
                'FAIL: Means significantly different'
                if p_value < self.alpha
                else 'PASS: No significant difference in means'
            )
        }
        return self.results['t_test']

    def ks_test_distribution(self):
        """KS test: are return distributions the same?"""
        ks_stat, p_value = stats.ks_2samp(self.bt, self.paper)
        self.results['ks_test'] = {
            'statistic': ks_stat, 'p_value': p_value,
            'reject_H0': p_value < self.alpha,
            'interpretation': (
                'FAIL: Distributions significantly different'
                if p_value < self.alpha
                else 'PASS: Distributions not significantly different'
            )
        }
        return self.results['ks_test']

    def levene_test_variance(self):
        """Levene test: are return variances the same?"""
        stat, p_value = stats.levene(self.bt, self.paper)
        self.results['levene_test'] = {
            'statistic': stat, 'p_value': p_value,
            'reject_H0': p_value < self.alpha,
            'interpretation': (
                'FAIL: Variances significantly different'
                if p_value < self.alpha
                else 'PASS: Variances not significantly different'
            )
        }
        return self.results['levene_test']

    def sharpe_ratio_test(self, risk_free_rate=0.065/252):
        """Test if paper Sharpe is consistent with backtest."""
        bt_sharpe = (np.mean(self.bt) - risk_free_rate) / np.std(self.bt)
        paper_sharpe = (np.mean(self.paper) - risk_free_rate) / np.std(self.paper)
        ann_bt = bt_sharpe * np.sqrt(252)
        ann_paper = paper_sharpe * np.sqrt(252)

        # Jobson-Korkie test for Sharpe ratio equality
        n = min(len(self.bt), len(self.paper))
        se_diff = np.sqrt(
            (2 / n) * (1 - np.corrcoef(
                self.bt[:n], self.paper[:n]
            )[0, 1]) + (1 / (2 * n)) * (
                bt_sharpe**2 + paper_sharpe**2
                - 2 * bt_sharpe * paper_sharpe
            )
        )
        z_stat = (bt_sharpe - paper_sharpe) / max(se_diff, 1e-10)
        p_value = 2 * (1 - stats.norm.cdf(abs(z_stat)))

        self.results['sharpe_test'] = {
            'bt_sharpe_ann': ann_bt,
            'paper_sharpe_ann': ann_paper,
            'sharpe_decay_pct': (ann_bt - ann_paper) / ann_bt * 100,
            'z_statistic': z_stat, 'p_value': p_value,
            'reject_H0': p_value < self.alpha,
            'interpretation': (
                'FAIL: Sharpe ratios significantly different'
                if p_value < self.alpha
                else 'PASS: Sharpe ratios not significantly different'
            )
        }
        return self.results['sharpe_test']

    def drawdown_test(self):
        """Compare maximum drawdown distributions."""
        def max_dd(returns, n_windows=50):
            equity = np.cumprod(1 + returns)
            dds = []
            window = len(returns) // n_windows
            for i in range(n_windows):
                chunk = equity[i*window:(i+1)*window]
                peak = np.maximum.accumulate(chunk)
                dd = (chunk - peak) / peak
                dds.append(dd.min())
            return np.array(dds)

        bt_dds = max_dd(self.bt)
        paper_dds = max_dd(self.paper)
        stat, p_value = stats.mannwhitneyu(
            bt_dds, paper_dds, alternative='two-sided'
        )
        self.results['drawdown_test'] = {
            'bt_mean_dd': np.mean(bt_dds) * 100,
            'paper_mean_dd': np.mean(paper_dds) * 100,
            'statistic': stat, 'p_value': p_value,
            'reject_H0': p_value < self.alpha,
        }
        return self.results['drawdown_test']

    def run_all(self):
        self.t_test_returns()
        self.ks_test_distribution()
        self.levene_test_variance()
        self.sharpe_ratio_test()
        self.drawdown_test()
        return self.results

# Simulate NSE Nifty 50 strategy results
np.random.seed(42)
n_bt, n_paper = 500, 200

# Backtest: slightly higher returns (overfit)
bt_returns = np.random.normal(0.0008, 0.012, n_bt)
# Paper: more realistic with slippage drag
paper_returns = np.random.normal(0.0005, 0.013, n_paper)

validator = StrategyValidator(bt_returns, paper_returns)
results = validator.run_all()

print("=" * 55)
print("  STATISTICAL VALIDATION: Backtest vs Paper Trading")
print("  Strategy: Nifty 50 Mean-Reversion | NSE")
print("=" * 55)

for test_name, result in results.items():
    print(f"\\n--- {test_name.upper()} ---")
    for key, val in result.items():
        if isinstance(val, float):
            print(f"  {key}: {val:.4f}")
        else:
            print(f"  {key}: {val}")

# Overall verdict
n_failures = sum(1 for r in results.values() if r.get('reject_H0'))
print(f"\\n{'='*55}")
print(f"OVERALL: {n_failures}/{len(results)} tests failed")
if n_failures <= 1:
    print("VERDICT: Strategy PASSES validation -> ready for live")
elif n_failures <= 2:
    print("VERDICT: Strategy needs INVESTIGATION -> check failures")
else:
    print("VERDICT: Strategy FAILS validation -> do NOT deploy")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Sequential Testing for Continuous Monitoring
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Rather than waiting for a fixed number of trades, sequential testing allows
        us to make go/no-go decisions as paper trading data accumulates. The Sequential
        Probability Ratio Test (SPRT) is ideal for this:
      </p>

      <BlockMath math="\Lambda_n = \sum_{i=1}^{n} \log \frac{f(r_i | H_1)}{f(r_i | H_0)}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Decision boundaries for SPRT are set at:
      </p>

      <BlockMath math="\text{Accept } H_0: \Lambda_n \leq \log\frac{\beta}{1-\alpha}, \quad \text{Reject } H_0: \Lambda_n \geq \log\frac{1-\beta}{\alpha}" />

      <PythonCode
        title="sequential_testing.py"
        runnable
        code={`import numpy as np

class SequentialValidator:
    """SPRT-based sequential validation for paper trading."""

    def __init__(self, mu_0=0.0, mu_1=0.0005, sigma=0.012,
                 alpha=0.05, beta=0.10):
        """
        mu_0: mean return under H0 (strategy has no edge)
        mu_1: mean return under H1 (strategy has edge)
        sigma: assumed return std dev
        alpha: Type I error rate
        beta: Type II error rate
        """
        self.mu_0 = mu_0
        self.mu_1 = mu_1
        self.sigma = sigma
        self.lower = np.log(beta / (1 - alpha))
        self.upper = np.log((1 - beta) / alpha)
        self.log_lr = 0.0
        self.n = 0
        self.history = []

    def update(self, return_val):
        """Process a new trade return."""
        self.n += 1
        # Log likelihood ratio for normal distributions
        lr = ((return_val - self.mu_0)**2 -
              (return_val - self.mu_1)**2) / (2 * self.sigma**2)
        self.log_lr += lr
        self.history.append(self.log_lr)

        if self.log_lr >= self.upper:
            return 'ACCEPT_H1'  # Strategy has edge
        elif self.log_lr <= self.lower:
            return 'ACCEPT_H0'  # Strategy has no edge
        return 'CONTINUE'

# Simulate sequential testing on paper trades
np.random.seed(42)
validator = SequentialValidator(
    mu_0=0.0,        # No edge
    mu_1=0.0004,     # Expected edge: 4 bps/trade
    sigma=0.012,     # Typical NSE daily vol
    alpha=0.05,
    beta=0.10
)

# Paper trading returns (strategy has a small edge)
paper_returns = np.random.normal(0.0003, 0.012, 500)

print("=== Sequential Validation (SPRT) ===")
print(f"H0: mu = {validator.mu_0} (no edge)")
print(f"H1: mu = {validator.mu_1} (strategy has edge)")
print(f"Lower boundary: {validator.lower:.4f}")
print(f"Upper boundary: {validator.upper:.4f}")
print()

decision = 'CONTINUE'
for i, r in enumerate(paper_returns):
    decision = validator.update(r)
    if (i + 1) % 50 == 0 or decision != 'CONTINUE':
        print(f"Trade {i+1:4d}: LLR = {validator.log_lr:+.4f}  "
              f"Status: {decision}")
    if decision != 'CONTINUE':
        break

print(f"\\nFinal decision after {validator.n} trades: {decision}")
if decision == 'ACCEPT_H1':
    print("Strategy shows statistically significant edge!")
    print("Recommendation: Proceed to live deployment on NSE")
elif decision == 'ACCEPT_H0':
    print("Strategy shows no significant edge.")
    print("Recommendation: Revisit strategy design")
else:
    print("Inconclusive after all trades. Need more data.")`}
      />

      <ExampleBlock
        title="Power Analysis for Paper Trading Duration"
        difficulty="advanced"
        problem="A Bank Nifty options strategy has expected per-trade return of 0.3% with std dev 2.5%. At 5% significance level with 80% power, how many trades are needed to detect the edge? With 5 trades/day on NSE, how many months of paper trading?"
        solution={[
          {
            step: 'Set up the power equation',
            formula: 'n = \\left(\\frac{z_{\\alpha/2} + z_{\\beta}}{\\mu/\\sigma}\\right)^2',
            explanation: 'Using the standard sample size formula for a one-sample t-test detecting a mean different from zero.',
          },
          {
            step: 'Plug in values',
            formula: 'n = \\left(\\frac{1.96 + 0.842}{0.003/0.025}\\right)^2 = \\left(\\frac{2.802}{0.12}\\right)^2',
          },
          {
            step: 'Calculate',
            formula: 'n = (23.35)^2 = 545.2 \\approx 546 \\text{ trades}',
          },
          {
            step: 'Convert to calendar time',
            formula: '\\frac{546}{5 \\times 22} = \\frac{546}{110} \\approx 5.0 \\text{ months}',
            explanation: 'With 5 trades per day and approximately 22 NSE trading days per month, you need about 5 months of paper trading to achieve 80% power to detect a 0.3% per-trade edge.',
          },
        ]}
      />

      <NoteBlock title="Practical Considerations for Indian Markets" type="warning">
        <p>
          Statistical tests assume i.i.d. returns, but NSE/BSE returns exhibit autocorrelation,
          heteroskedasticity, and regime shifts. Adjustments to consider:
        </p>
        <ul className="mt-2 list-disc list-inside space-y-1">
          <li>Use Newey-West standard errors to account for serial correlation</li>
          <li>Stratify tests by market regime (trending vs mean-reverting)</li>
          <li>Exclude NSE circuit breaker days and F&amp;O expiry dates</li>
          <li>Apply block bootstrap instead of standard t-tests for robustness</li>
          <li>Test during budget week and RBI policy announcement periods separately</li>
        </ul>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Never deploy a strategy live on NSE based solely on backtest results. Apply a
          rigorous battery of statistical tests -- t-tests, KS tests, Sharpe ratio tests,
          and sequential testing -- to validate that paper trading performance is consistent
          with backtest expectations. Use power analysis to determine the minimum paper trading
          duration, and continuously monitor using SPRT for early detection of strategy failure.
        </p>
      </NoteBlock>
    </div>
  )
}
