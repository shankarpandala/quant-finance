import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveDSR() {
  const [observedSR, setObservedSR] = useState(1.8)
  const [nTrials, setNTrials] = useState(50)
  const [nObs, setNObs] = useState(1260)
  const [skewness, setSkewness] = useState(-0.5)
  const [kurtosis, setKurtosis] = useState(4.0)

  const expectedMaxSR = Math.sqrt(2 * Math.log(nTrials)) * (1 - 1 / (4 * Math.log(nTrials))) * Math.sqrt(252 / nObs)
  const seSR = Math.sqrt((1 + 0.25 * observedSR * observedSR * (kurtosis - 1) - skewness * observedSR) / nObs) * Math.sqrt(252)
  const zScore = (observedSR - expectedMaxSR) / seSR
  const normCdf = (x) => {
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741
    const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911
    const sign = x < 0 ? -1 : 1
    const t = 1 / (1 + p * Math.abs(x) / Math.sqrt(2))
    const erf = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x / 2)
    return 0.5 * (1 + sign * erf)
  }
  const dsrPValue = 1 - normCdf(zScore)
  const isSignificant = dsrPValue < 0.05

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Deflated Sharpe Ratio Calculator
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Test whether your backtest Sharpe ratio survives adjustment for multiple testing and non-normality.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Observed Sharpe = {observedSR.toFixed(1)}</span>
          <input type="range" min="0.5" max="4.0" step="0.1" value={observedSR}
            onChange={e => setObservedSR(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Strategies Tested = {nTrials}</span>
          <input type="range" min="1" max="500" step="5" value={nTrials}
            onChange={e => setNTrials(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Trading Days = {nObs}</span>
          <input type="range" min="252" max="5000" step="126" value={nObs}
            onChange={e => setNObs(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Skewness = {skewness.toFixed(1)}</span>
          <input type="range" min="-3" max="2" step="0.1" value={skewness}
            onChange={e => setSkewness(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Kurtosis = {kurtosis.toFixed(1)}</span>
          <input type="range" min="3" max="10" step="0.5" value={kurtosis}
            onChange={e => setKurtosis(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Expected Max SR</div>
          <div className="text-lg font-bold text-orange-600 dark:text-orange-400">{expectedMaxSR.toFixed(2)}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">DSR z-score</div>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{zScore.toFixed(2)}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">p-value</div>
          <div className={`text-lg font-bold ${isSignificant ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {dsrPValue.toFixed(4)}
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Verdict</div>
          <div className={`text-sm font-bold ${isSignificant ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {isSignificant ? 'PASSES DSR' : 'FAILS DSR'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DeflatedSharpe() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        The Deflated Sharpe Ratio
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The Deflated Sharpe Ratio (DSR), introduced by Bailey and Lopez de Prado (2014), provides
        a rigorous statistical test for whether a backtest Sharpe ratio is genuinely significant
        after accounting for the number of strategies tested and the non-normality of returns.
        It is the gold standard for validating quantitative strategy performance.
      </p>

      <DefinitionBlock
        title="Deflated Sharpe Ratio"
        label="Definition 8.4"
        definition="The Deflated Sharpe Ratio tests the null hypothesis that the observed Sharpe ratio could have been achieved by chance, given the number of independent strategies tested. It adjusts the standard error of the Sharpe ratio for non-normality (skewness and kurtosis) and compares the observed SR against the expected maximum under the null."
        notation="\text{DSR} = \Phi\!\left(\frac{\widehat{SR} - E[\max SR]}{\widehat{\sigma}_{SR}}\right)"
      />

      <BlockMath math="\text{DSR p-value} = 1 - \Phi\!\left(\frac{\widehat{SR} - \sqrt{V[\widehat{SR}]} \cdot \sqrt{2\ln N} \cdot (1 - \gamma \cdot \text{correction})}{\widehat{\sigma}_{SR}}\right)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The standard error of the Sharpe ratio under non-normal returns (Lo, 2002) is:
      </p>

      <BlockMath math="\widehat{\sigma}_{SR} = \sqrt{\frac{1 + \frac{1}{4}\widehat{SR}^2(\hat{\kappa} - 1) - \hat{\gamma}_3 \cdot \widehat{SR}}{T}} \cdot \sqrt{252}" />

      <TheoremBlock
        title="DSR Test Properties"
        label="Theorem 8.3"
        statement="The DSR has the following properties: (1) It reduces to the standard t-test when N=1 (single strategy) and returns are normal. (2) The critical Sharpe ratio increases as \sqrt{\ln N}, making it progressively harder to achieve significance with more trials. (3) Negative skewness and excess kurtosis increase the standard error, further raising the bar. (4) DSR has correct size (Type I error rate) under the null."
        proof="Property (1): When N=1, E[\max SR] = 0, and with normal returns (\gamma_3 = 0, \kappa = 3), the test statistic reduces to SR/\sqrt{1/T} = SR\sqrt{T}, which is the standard t-statistic. Properties (2)-(4) follow from the Gumbel approximation for the maximum of N normal random variables and the Lo (2002) correction for the SR standard error."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Minimum Backtest Length (minBTL)
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The Minimum Backtest Length is the minimum number of observations needed for a given
        Sharpe ratio to be statistically significant:
      </p>

      <BlockMath math="T_{\min} \approx \left(\frac{\sqrt{2\ln N}}{\widehat{SR}}\right)^2 \cdot 252" />

      <InteractiveDSR />

      <PythonCode
        title="deflated_sharpe_ratio.py"
        runnable
        code={`import numpy as np
from scipy import stats

def deflated_sharpe_ratio(observed_sr, n_trials, n_obs,
                           skewness=0, kurtosis=3, annualize=252):
    """
    Compute the Deflated Sharpe Ratio p-value.

    Parameters:
    - observed_sr: annualized Sharpe ratio
    - n_trials: number of independent strategies tested
    - n_obs: number of daily observations
    - skewness: sample skewness of returns
    - kurtosis: sample kurtosis (not excess)
    """
    # Expected maximum SR under null (Euler-Mascheroni correction)
    euler_mascheroni = 0.5772156649
    e_max_sr = (np.sqrt(2 * np.log(n_trials))
                * (1 - euler_mascheroni / (2 * np.log(n_trials)))
                * np.sqrt(annualize / n_obs))

    # Standard error of SR (Lo 2002 with non-normal adjustment)
    se_sr = np.sqrt(
        (1 + 0.25 * observed_sr**2 * (kurtosis - 1) - skewness * observed_sr)
        / n_obs
    ) * np.sqrt(annualize)

    # Z-score
    z = (observed_sr - e_max_sr) / se_sr

    # p-value (one-sided test)
    p_value = 1 - stats.norm.cdf(z)

    return {
        'observed_sr': observed_sr,
        'e_max_sr': e_max_sr,
        'se_sr': se_sr,
        'z_score': z,
        'p_value': p_value,
        'significant': p_value < 0.05,
    }

def min_backtest_length(target_sr, n_trials, annualize=252):
    """Minimum backtest length for SR to be significant."""
    e_max_sr_factor = np.sqrt(2 * np.log(n_trials))
    min_obs = (e_max_sr_factor / target_sr) ** 2 * annualize
    return int(np.ceil(min_obs))

# Test various Nifty strategies
print("=== Deflated Sharpe Ratio Analysis ===")
print("Testing if backtest Sharpe ratios survive multiple-testing adjustment")
print()

strategies = [
    {"name": "Nifty Momentum (12-mo)", "sr": 1.2, "trials": 20,
     "obs": 2520, "skew": -0.3, "kurt": 4.5},
    {"name": "Mean Reversion RSI", "sr": 1.8, "trials": 100,
     "obs": 1260, "skew": 0.2, "kurt": 5.0},
    {"name": "ML Ensemble (50 features)", "sr": 2.5, "trials": 500,
     "obs": 1260, "skew": -0.8, "kurt": 6.0},
    {"name": "Simple MA Crossover", "sr": 0.8, "trials": 5,
     "obs": 5040, "skew": -0.1, "kurt": 3.5},
    {"name": "Iron Condor Weekly", "sr": 1.5, "trials": 30,
     "obs": 756, "skew": -2.0, "kurt": 8.0},
]

for s in strategies:
    result = deflated_sharpe_ratio(
        s['sr'], s['trials'], s['obs'], s['skew'], s['kurt']
    )
    print(f"Strategy: {s['name']}")
    print(f"  Observed SR: {result['observed_sr']:.2f} | "
          f"E[max SR]: {result['e_max_sr']:.2f}")
    print(f"  SE(SR): {result['se_sr']:.2f} | "
          f"z-score: {result['z_score']:.2f} | "
          f"p-value: {result['p_value']:.4f}")
    print(f"  Verdict: {'PASSES' if result['significant'] else 'FAILS'} "
          f"DSR test at 5% level")
    print()

# Minimum backtest length
print(f"=== Minimum Backtest Length ===")
print(f"{'Target SR':>12} {'N Trials':>10} {'Min Days':>10} {'Min Years':>10}")
print("-" * 46)
for sr in [1.0, 1.5, 2.0, 2.5]:
    for trials in [10, 50, 100]:
        min_t = min_backtest_length(sr, trials)
        print(f"{sr:>12.1f} {trials:>10} {min_t:>10} {min_t/252:>10.1f}")`}
      />

      <ExampleBlock
        title="Validating a Nifty Options Strategy"
        difficulty="advanced"
        problem="After testing 30 variations of a weekly iron condor on Nifty (3 years of weekly data = 156 observations), you find the best variant has Sharpe = 1.8, with return skewness = -1.5 and kurtosis = 7. Does it pass the DSR test?"
        solution={[
          {
            step: 'Compute expected max SR under null',
            formula: 'E[\\max SR] = \\sqrt{2\\ln 30} \\times \\sqrt{252/156} = 2.61 \\times 1.27 = 3.31',
            explanation: 'Wait -- this is much higher than our observed SR! But this formula assumes daily obs.',
          },
          {
            step: 'Correct for weekly frequency',
            formula: 'E[\\max SR] = \\sqrt{2\\ln 30} \\times \\sqrt{52/156} = 2.61 \\times 0.577 = 1.51',
            explanation: 'Using 52 weeks/year annualization with 156 weekly observations.',
          },
          {
            step: 'Compute SE of SR',
            formula: 'SE = \\sqrt{\\frac{1 + 0.25(1.8)^2(7-1) - (-1.5)(1.8)}{156}} \\times \\sqrt{52} = \\sqrt{\\frac{1+4.86+2.7}{156}} \\times 7.2 = 0.53',
          },
          {
            step: 'DSR test',
            formula: 'z = \\frac{1.8 - 1.51}{0.53} = 0.55, \\quad p = 0.29',
            explanation: 'p-value of 0.29 is far above 0.05. The strategy FAILS the DSR test. The high kurtosis and negative skewness (typical of iron condors) inflate the SE, and 156 weekly observations is insufficient to achieve significance.',
          },
        ]}
      />

      <NoteBlock title="How Many Trials to Count" type="warning">
        <p>
          The hardest part of applying DSR is honestly counting the number of trials N. This
          includes: every parameter combination tested, every filter variation, every entry/exit
          rule tried, and even strategies you tested and discarded. If you tried 5 strike widths
          x 3 DTE choices x 4 stop-loss levels x 2 adjustment rules = 120 trials, use N=120.
          Underestimating N inflates the DSR, giving false confidence. When in doubt, use a
          larger N to be conservative.
        </p>
      </NoteBlock>

      <NoteBlock title="DSR for Indian Market Strategies" type="tip">
        <p>
          Given India's shorter liquid options history (weekly options only since 2019), achieving
          DSR significance for weekly strategies is very challenging. With ~250 weekly observations
          and typical N=20-50 trials, you need annualized Sharpe ratios above 2.5-3.0 to pass.
          This explains why most retail strategies that appear to "work" in backtests fail live.
          For robustness, complement DSR with out-of-sample testing on Bank Nifty or Nifty Next
          50 as independent validation datasets.
        </p>
      </NoteBlock>
    </div>
  )
}
