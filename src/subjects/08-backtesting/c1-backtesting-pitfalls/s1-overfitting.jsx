import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveOverfitting() {
  const [nParams, setNParams] = useState(5)
  const [nObservations, setNObservations] = useState(500)
  const [nTrials, setNTrials] = useState(100)

  const ratio = nObservations / nParams
  const expectedMaxSharpe = Math.sqrt(2 * Math.log(nTrials)) * (1 / Math.sqrt(nObservations / 252))
  const overfitProb = Math.min(0.99, 1 - Math.exp(-nParams * nTrials / nObservations))
  const minBacktestLength = Math.ceil(nParams * nTrials / 252 * 5)

  const riskLevel = ratio < 20 ? 'HIGH' : ratio < 50 ? 'MODERATE' : 'LOW'
  const riskColor = ratio < 20 ? 'text-red-600 dark:text-red-400' : ratio < 50 ? 'text-orange-600 dark:text-orange-400' : 'text-green-600 dark:text-green-400'

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Overfitting Risk Calculator
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Estimate the probability of overfitting based on your strategy complexity and data size.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Free Parameters = {nParams}</span>
          <input type="range" min="1" max="50" step="1" value={nParams}
            onChange={e => setNParams(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Trading Days = {nObservations}</span>
          <input type="range" min="50" max="5000" step="50" value={nObservations}
            onChange={e => setNObservations(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Strategies Tried = {nTrials}</span>
          <input type="range" min="1" max="1000" step="10" value={nTrials}
            onChange={e => setNTrials(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Overfit Risk</div>
          <div className={`text-sm font-bold ${riskColor}`}>{riskLevel}</div>
          <div className="text-[10px] text-gray-400">ratio: {ratio.toFixed(0)}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Max Spurious Sharpe</div>
          <div className="text-lg font-bold text-red-600 dark:text-red-400">{expectedMaxSharpe.toFixed(2)}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Overfit Probability</div>
          <div className="text-lg font-bold text-orange-600 dark:text-orange-400">{(overfitProb * 100).toFixed(1)}%</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="text-xs text-gray-500">Min Years Needed</div>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{(minBacktestLength / 252).toFixed(1)}</div>
        </div>
      </div>
    </div>
  )
}

export default function Overfitting() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Overfitting in Backtesting
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Overfitting is the most dangerous pitfall in quantitative strategy development. A strategy
        that appears profitable in a backtest may simply be fitting noise in historical data rather
        than capturing genuine market inefficiencies. In the Indian market context, where Nifty 50
        data since 2000 provides roughly 6000 trading days, the risk of overfitting is acute for
        strategies with many parameters or those tested across many configurations.
      </p>

      <DefinitionBlock
        title="Overfitting (Backtest Overfitting)"
        label="Definition 8.1"
        definition="Overfitting occurs when a trading strategy is tuned to exploit specific patterns in historical data that are unlikely to repeat in the future. An overfit strategy has high in-sample performance but poor out-of-sample results."
        notation="\text{Sharpe}_{\text{IS}} \gg \text{Sharpe}_{\text{OOS}} \implies \text{overfitting}"
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The fundamental cause of overfitting is the multiple testing problem: when you test many
        strategy variations, some will appear profitable by chance alone. The more parameters you
        tune, the more degrees of freedom the optimizer has to fit noise.
      </p>

      <TheoremBlock
        title="Expected Maximum Sharpe Ratio Under Null"
        label="Theorem 8.1"
        statement="If you test N independent strategies on T observations, each with zero true Sharpe ratio, the expected maximum in-sample Sharpe ratio is approximately: E[\max SR] \approx \sqrt{2 \ln N} \cdot \sqrt{252/T}. For N=100 trials on 5 years of daily data (T=1260), this gives E[\max SR] \approx 0.96. A backtest Sharpe must significantly exceed this threshold to be credible."
        proof="Under the null hypothesis (true SR = 0), each strategy's annualized in-sample Sharpe ratio follows approximately N(0, 252/T). For N independent draws from this distribution, the expected maximum is given by the Gumbel extreme value distribution: E[\max Z_i] \approx \sqrt{2\ln N} for large N, where Z_i are standard normal. Scaling by \sqrt{252/T} gives the annualized result."
      />

      <BlockMath math="E\!\left[\max_{i=1}^{N} \widehat{SR}_i\right] \approx \sqrt{2 \ln N} \cdot \frac{1}{\sqrt{T/252}}" />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Symptoms of Overfitting
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Symptom</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Description</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Example (NSE)</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Parameter sensitivity</td>
              <td className="px-4 py-2">Small param changes destroy returns</td>
              <td className="px-4 py-2">RSI works at 14 but not 13 or 15</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Too many rules</td>
              <td className="px-4 py-2">Complex entry/exit logic</td>
              <td className="px-4 py-2">Buy Nifty if MA20>MA50 AND RSI AND VIX AND...</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Period-specific</td>
              <td className="px-4 py-2">Works only in certain years</td>
              <td className="px-4 py-2">Great 2017-2019, fails 2020+</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Unrealistic SR</td>
              <td className="px-4 py-2">Sharpe &gt; 3 on daily data</td>
              <td className="px-4 py-2">Almost certainly overfit</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveOverfitting />

      <PythonCode
        title="overfitting_demonstration.py"
        runnable
        code={`import numpy as np

np.random.seed(42)

def simulate_overfitting(n_days=1260, n_strategies=100):
    """Demonstrate how testing many strategies produces spurious results."""
    # Generate pure noise returns (no real signal)
    noise_returns = np.random.normal(0, 0.01, (n_strategies, n_days))

    # Compute Sharpe ratios (all should be ~0 in truth)
    sharpes = np.mean(noise_returns, axis=1) / np.std(noise_returns, axis=1)
    sharpes_annual = sharpes * np.sqrt(252)

    # Find the "best" strategy
    best_idx = np.argmax(sharpes_annual)
    best_sharpe = sharpes_annual[best_idx]

    # Theoretical expected max
    expected_max = np.sqrt(2 * np.log(n_strategies)) * np.sqrt(252 / n_days)

    return sharpes_annual, best_sharpe, expected_max, best_idx

# Run the demonstration
print("=== Overfitting Demonstration ===")
print(f"Setup: {100} random strategies on {1260} days of NOISE (no signal)")
print(f"True Sharpe of ALL strategies: 0.00")
print()

sharpes, best, expected, best_idx = simulate_overfitting()

print(f"Best in-sample Sharpe found: {best:.2f}")
print(f"Expected max (theory):       {expected:.2f}")
print(f"")
print(f"Distribution of 'best' Sharpe across 1000 experiments:")

# Run many experiments
bests = []
for _ in range(1000):
    _, b, _, _ = simulate_overfitting(n_strategies=100)
    bests.append(b)
bests = np.array(bests)

print(f"  Mean of best SR:   {np.mean(bests):.2f}")
print(f"  Max of best SR:    {np.max(bests):.2f}")
print(f"  P(best SR > 1.0): {(bests > 1.0).mean()*100:.1f}%")
print(f"  P(best SR > 1.5): {(bests > 1.5).mean()*100:.1f}%")
print(f"  P(best SR > 2.0): {(bests > 2.0).mean()*100:.1f}%")

# Impact of number of strategies tested
print(f"\\n=== Impact of Multiple Testing ===")
print(f"{'N strategies':>15} {'E[max SR]':>12} {'P(SR>1.5)':>12}")
print("-" * 42)
for N in [1, 5, 10, 50, 100, 500, 1000]:
    expected = np.sqrt(2 * np.log(max(N, 2))) * np.sqrt(252 / 1260)
    bests_n = []
    for _ in range(500):
        noise = np.random.normal(0, 0.01, (N, 1260))
        sr = np.max(np.mean(noise, axis=1) / np.std(noise, axis=1) * np.sqrt(252))
        bests_n.append(sr)
    bests_n = np.array(bests_n)
    print(f"{N:>15} {expected:>12.2f} {(bests_n > 1.5).mean()*100:>11.1f}%")

# Practical rule: observations per parameter
print(f"\\n=== Minimum Data Requirements ===")
for params in [2, 5, 10, 20]:
    min_obs = params * 50  # rule of thumb: 50x
    years = min_obs / 252
    print(f"  {params} parameters: need {min_obs} days ({years:.1f} years)")`}
      />

      <ExampleBlock
        title="Testing Moving Average Crossovers on Nifty"
        difficulty="intermediate"
        problem="A researcher tests 100 different moving average crossover combinations (fast: 5-50, slow: 20-200) on Nifty 50 daily data from 2015-2024 (2520 days). The best combination (MA 18/67) shows Sharpe = 1.2. Is this reliable?"
        solution={[
          {
            step: 'Compute expected spurious maximum Sharpe',
            formula: 'E[\\max SR] = \\sqrt{2\\ln(100)} \\cdot \\sqrt{252/2520} = 3.03 \\times 0.316 = 0.96',
          },
          {
            step: 'Compare observed vs threshold',
            formula: 'SR_{\\text{observed}} = 1.2, \\quad SR_{\\text{threshold}} \\approx 0.96',
          },
          {
            step: 'Assessment',
            formula: '1.2 > 0.96 \\text{ but not by much}',
            explanation: 'The observed Sharpe exceeds the spurious threshold by only 0.24. This is weak evidence of a real signal. A genuine edge would show Sharpe > 2x the threshold (i.e., > 1.9). The MA 18/67 result is likely partially overfit and would show degraded OOS performance.',
          },
        ]}
      />

      <NoteBlock title="The Paradox of Indian Market Data" type="warning">
        <p>
          India's equity market has undergone massive structural changes: NSE launch (1994),
          electronic trading (2000s), algo trading permitted (2008), co-location (2012), weekly
          options (2019), SEBI margin rules (2020-21). Using pre-2015 data to validate strategies
          designed for current market microstructure is problematic. Yet restricting to 2015+ gives
          only ~2500 trading days, which limits statistical power. This tension makes robust
          validation critical.
        </p>
      </NoteBlock>

      <NoteBlock title="Combating Overfitting" type="tip">
        <p>
          Practical defenses against overfitting for Nifty strategies: (1) Use out-of-sample
          testing with walk-forward validation, (2) limit free parameters to fewer than T/50
          where T is trading days, (3) prefer simple strategies with economic rationale over
          data-mined patterns, (4) test on related markets (Bank Nifty, Nifty Next 50) for
          robustness, (5) use the Deflated Sharpe Ratio (covered in section s3) to account
          for multiple testing, and (6) paper trade for 3-6 months before deploying capital.
        </p>
      </NoteBlock>
    </div>
  )
}
