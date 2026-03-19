import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveRiskAdjusted() {
  const [annReturn, setAnnReturn] = useState(18.0)
  const [annVol, setAnnVol] = useState(22.0)
  const [riskFree, setRiskFree] = useState(6.5)
  const [maxDrawdown, setMaxDrawdown] = useState(15.0)
  const [downsideVol, setDownsideVol] = useState(14.0)

  const sharpe = (annReturn - riskFree) / annVol
  const sortino = (annReturn - riskFree) / downsideVol
  const calmar = (annReturn - riskFree) / maxDrawdown
  const treynor = (annReturn - riskFree) / 1.1

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Risk-Adjusted Return Metrics
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Compare Sharpe, Sortino, and Calmar ratios for an Indian equity strategy.
        All metrics use the 91-day T-bill rate as risk-free.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-5">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Ann. Return: {annReturn.toFixed(1)}%</span>
          <input type="range" min="-10" max="40" step="0.5" value={annReturn}
            onChange={e => setAnnReturn(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Ann. Volatility: {annVol.toFixed(1)}%</span>
          <input type="range" min="5" max="50" step="0.5" value={annVol}
            onChange={e => setAnnVol(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Risk-Free: {riskFree.toFixed(1)}%</span>
          <input type="range" min="3" max="10" step="0.25" value={riskFree}
            onChange={e => setRiskFree(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Max Drawdown: {maxDrawdown.toFixed(1)}%</span>
          <input type="range" min="2" max="50" step="0.5" value={maxDrawdown}
            onChange={e => setMaxDrawdown(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Downside Vol: {downsideVol.toFixed(1)}%</span>
          <input type="range" min="3" max="35" step="0.5" value={downsideVol}
            onChange={e => setDownsideVol(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">Sharpe Ratio</p>
          <p className={`text-lg font-bold ${sharpe >= 1 ? 'text-green-700 dark:text-green-300' : sharpe >= 0.5 ? 'text-blue-800 dark:text-blue-200' : 'text-red-600'}`}>
            {sharpe.toFixed(3)}
          </p>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
          <p className="text-xs font-semibold text-purple-700 dark:text-purple-300">Sortino Ratio</p>
          <p className={`text-lg font-bold ${sortino >= 1.5 ? 'text-green-700 dark:text-green-300' : 'text-purple-800 dark:text-purple-200'}`}>
            {sortino.toFixed(3)}
          </p>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">Calmar Ratio</p>
          <p className="text-lg font-bold text-amber-800 dark:text-amber-200">
            {calmar.toFixed(3)}
          </p>
        </div>
        <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/30">
          <p className="text-xs font-semibold text-green-700 dark:text-green-300">Treynor Ratio</p>
          <p className="text-lg font-bold text-green-800 dark:text-green-200">
            {treynor.toFixed(2)}%
          </p>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
        {sharpe >= 1.0
          ? <span className="font-semibold text-green-600 dark:text-green-400">Excellent risk-adjusted performance (Sharpe &ge; 1.0)</span>
          : sharpe >= 0.5
          ? <span className="font-semibold text-blue-600 dark:text-blue-400">Decent risk-adjusted performance (Sharpe 0.5-1.0)</span>
          : <span className="font-semibold text-red-500">Weak risk-adjusted performance (Sharpe &lt; 0.5)</span>
        }
      </p>
    </div>
  )
}

export default function RiskAdjustedReturns() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Risk-Adjusted Return Measures
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        A strategy that returns 30% sounds impressive until you learn it did so with 60%
        annualized volatility. Risk-adjusted metrics normalize returns by the risk taken,
        enabling fair comparison across strategies, asset classes, and time periods. For
        Indian quant funds reporting to SEBI, these metrics are the standard language of
        performance evaluation.
      </p>

      <DefinitionBlock
        title="Sharpe Ratio"
        label="Definition 1.5"
        definition="The Sharpe ratio measures the excess return per unit of total risk (volatility). It is the most widely used risk-adjusted performance metric. A higher Sharpe ratio indicates better compensation for the risk taken."
        notation="S = \frac{R_p - R_f}{\sigma_p} = \frac{\text{Excess Return}}{\text{Volatility}}"
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The ex-post (realized) Sharpe ratio using daily data with <InlineMath math="N" /> observations
        is computed as:
      </p>

      <BlockMath math="S = \frac{\bar{r}^e}{\hat{\sigma}_{r^e}} \times \sqrt{252}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\bar{r}^e" /> is the mean daily excess return and{' '}
        <InlineMath math="\hat{\sigma}_{r^e}" /> is the sample standard deviation. The{' '}
        <InlineMath math="\sqrt{252}" /> factor annualizes the daily Sharpe ratio, assuming
        252 trading days on NSE.
      </p>

      <DefinitionBlock
        title="Sortino Ratio"
        label="Definition 1.6"
        definition="The Sortino ratio replaces total volatility with downside deviation, penalizing only negative returns below a minimum acceptable return (MAR). This is more appropriate for strategies with asymmetric return distributions, common in options-based strategies on Bank Nifty."
        notation="S_{\text{Sortino}} = \frac{R_p - R_f}{\sigma_{\text{down}}}, \quad \sigma_{\text{down}} = \sqrt{\frac{1}{N}\sum_{r_t < \text{MAR}} (r_t - \text{MAR})^2}"
      />

      <DefinitionBlock
        title="Calmar Ratio"
        label="Definition 1.7"
        definition="The Calmar ratio divides annualized excess return by the maximum drawdown. It measures how well the strategy recovers from its worst loss, making it particularly relevant for Indian quant strategies that must survive periodic market crashes and SEBI circuit-limit events."
        notation="C = \frac{R_p - R_f}{|\text{Max Drawdown}|}"
      />

      <TheoremBlock
        title="Sharpe Ratio Under Normality"
        label="Theorem 1.3"
        statement="If returns are normally distributed, the Sharpe ratio completely characterizes the risk-return tradeoff. For any two portfolios A and B with normally distributed returns, portfolio A is preferred if and only if S_A > S_B. However, this breaks down when returns exhibit fat tails or skewness (common in Indian equity markets)."
        formula="S = \frac{\mu - r_f}{\sigma} \implies P(R < 0) = \Phi\!\left(-\frac{\mu}{\sigma}\right) = \Phi\!\left(-S \cdot \frac{\sqrt{T}}{1}\right)"
        proof="Under normality, excess returns follow R^e \sim N(\mu - r_f, \sigma^2). The probability of a negative return over horizon T depends only on the Sharpe ratio scaled by \sqrt{T}. Therefore, the Sharpe ratio uniquely determines the probability of loss for any horizon. When returns are non-normal (as empirically observed for Nifty 50 with kurtosis ~ 5-7), higher moments matter and the Sharpe ratio is insufficient."
      />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Metric</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Risk Measure</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Best For</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Good Value</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Sharpe</td>
              <td className="px-4 py-2">Total volatility</td>
              <td className="px-4 py-2">Comparing strategies</td>
              <td className="px-4 py-2">&gt; 1.0</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Sortino</td>
              <td className="px-4 py-2">Downside deviation</td>
              <td className="px-4 py-2">Asymmetric strategies</td>
              <td className="px-4 py-2">&gt; 1.5</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Calmar</td>
              <td className="px-4 py-2">Max drawdown</td>
              <td className="px-4 py-2">Tail risk evaluation</td>
              <td className="px-4 py-2">&gt; 1.0</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Treynor</td>
              <td className="px-4 py-2">Systematic risk (beta)</td>
              <td className="px-4 py-2">Diversified portfolios</td>
              <td className="px-4 py-2">&gt; market premium</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Info Ratio</td>
              <td className="px-4 py-2">Tracking error</td>
              <td className="px-4 py-2">Active management</td>
              <td className="px-4 py-2">&gt; 0.5</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveRiskAdjusted />

      <NoteBlock title="Indian Market Benchmarks" type="info">
        <p>
          When computing Sharpe ratios for Indian strategies, be careful about annualization.
          NSE has approximately 252 trading days, but the actual number varies (holidays for
          Diwali, Holi, etc.). SEBI requires PMS schemes to report both absolute returns and
          benchmark-relative performance. The commonly used risk-free rate for Indian Sharpe
          ratios is the overnight MIBOR or 91-day T-bill rate, not the US T-bill.
        </p>
      </NoteBlock>

      <PythonCode
        title="risk_adjusted_metrics.py"
        runnable
        code={`import numpy as np
import pandas as pd

# Simulated: 3 Indian quant strategies over 3 years
np.random.seed(42)
n_days = 756  # ~3 years of trading

rf_daily = 0.065 / 252  # 6.5% annual risk-free

# Strategy 1: Nifty momentum (high return, high vol)
r1 = np.random.normal(0.0008, 0.015, n_days)
# Strategy 2: Bank Nifty mean-reversion (moderate, lower vol)
r2 = np.random.normal(0.0005, 0.008, n_days)
# Strategy 3: Options selling (high Sharpe, fat left tail)
r3 = np.random.normal(0.0006, 0.006, n_days)
r3[np.random.choice(n_days, 10)] -= 0.08  # Occasional blowups

strategies = {'Nifty_Momentum': r1, 'BankNifty_MeanRev': r2, 'Options_Selling': r3}

print("=== Risk-Adjusted Performance Comparison ===")
print(f"Risk-free rate: 6.5% annual ({rf_daily*10000:.2f} bps daily)\\n")

for name, returns in strategies.items():
    excess = returns - rf_daily

    # Sharpe Ratio
    sharpe = np.mean(excess) / np.std(excess) * np.sqrt(252)

    # Sortino Ratio
    downside = excess[excess < 0]
    downside_std = np.sqrt(np.mean(downside**2)) * np.sqrt(252)
    sortino = (np.mean(excess) * 252) / downside_std

    # Calmar Ratio
    cumulative = np.cumsum(returns)
    running_max = np.maximum.accumulate(cumulative)
    drawdowns = cumulative - running_max
    max_dd = np.min(drawdowns)
    ann_return = np.mean(returns) * 252
    calmar = (ann_return - 0.065) / abs(max_dd) if max_dd != 0 else np.inf

    # Annualized metrics
    ann_vol = np.std(returns) * np.sqrt(252)
    cumul_return = np.exp(np.sum(np.log(1 + returns))) - 1

    print(f"--- {name} ---")
    print(f"  Cumulative Return: {cumul_return*100:.1f}%")
    print(f"  Ann. Return: {ann_return*100:.1f}%  |  Ann. Vol: {ann_vol*100:.1f}%")
    print(f"  Sharpe:  {sharpe:.3f}  |  Sortino: {sortino:.3f}")
    print(f"  Max DD: {max_dd*100:.1f}%  |  Calmar: {calmar:.3f}")
    print(f"  Skew: {pd.Series(returns).skew():.2f}  |  Kurt: {pd.Series(returns).kurtosis():.2f}")
    print()

print("Note: Options selling shows high Sharpe but poor Calmar/Sortino")
print("due to fat left tail -- a common trap in Indian options markets.")`}
      />

      <ExampleBlock
        title="Comparing Two Zerodha PMS Strategies"
        difficulty="intermediate"
        problem="Strategy A: 22% return, 28% vol, 18% max drawdown. Strategy B: 16% return, 14% vol, 9% max drawdown. Risk-free rate is 6.5%. Which is better on each risk-adjusted metric?"
        solution={[
          {
            step: 'Compute Sharpe ratios',
            formula: 'S_A = \\frac{22 - 6.5}{28} = 0.554, \\quad S_B = \\frac{16 - 6.5}{14} = 0.679',
            explanation: 'Strategy B has a higher Sharpe ratio despite lower absolute returns.',
          },
          {
            step: 'Compute Calmar ratios',
            formula: 'C_A = \\frac{22 - 6.5}{18} = 0.861, \\quad C_B = \\frac{16 - 6.5}{9} = 1.056',
            explanation: 'Strategy B also wins on Calmar -- better drawdown recovery.',
          },
          {
            step: 'Interpretation',
            formula: 'S_B > S_A \\text{ and } C_B > C_A',
            explanation: 'Strategy B is superior on risk-adjusted basis. Strategy A only appears better in absolute terms because it takes more risk. A risk-conscious Indian PMS investor should prefer Strategy B.',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Statistical Significance of the Sharpe Ratio
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A common mistake is treating the Sharpe ratio as precise. The estimated Sharpe ratio
        has a standard error that depends on the sample size:
      </p>

      <BlockMath math="\text{SE}(\hat{S}) \approx \sqrt{\frac{1 + S^2/2}{N}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="N" /> is the number of observations (months or years). For a
        strategy with a true Sharpe of 1.0 measured over 3 years of monthly data (N=36),
        the standard error is approximately <InlineMath math="\sqrt{1.5/36} = 0.20" />. This
        means the 95% confidence interval is [0.61, 1.39] -- a wide range! Indian quant
        strategies with short track records (common for PMS schemes) have very imprecise
        Sharpe estimates.
      </p>

      <BlockMath math="\text{Min track record for } 95\% \text{ confidence:} \quad N \geq \left(\frac{1.96}{\hat{S}}\right)^2 \times (1 + \hat{S}^2/2)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For a Sharpe of 0.5, you need approximately 62 monthly observations (~5 years) for
        statistical significance. For a Sharpe of 1.0, you need approximately 17 months.
        This is why SEBI mandates minimum 3-year track records for PMS performance claims.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Omega Ratio: Beyond Mean-Variance
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The Omega ratio considers the entire return distribution, not just mean and variance:
      </p>

      <BlockMath math="\Omega(\theta) = \frac{\int_\theta^\infty [1 - F(r)] \, dr}{\int_{-\infty}^\theta F(r) \, dr} = \frac{E[\max(R-\theta, 0)]}{E[\max(\theta-R, 0)]}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\theta" /> is the threshold return (typically 0 or{' '}
        <InlineMath math="R_f" />). The Omega ratio captures the full distribution shape,
        making it particularly useful for strategies with non-normal returns (common in
        Indian options strategies). An Omega ratio above 1.5 at the risk-free threshold
        indicates a strong strategy after accounting for all moments.
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Metric</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Handles Non-Normality</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Handles Drawdowns</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Best For</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Sharpe</td>
              <td className="px-4 py-2">No (assumes normal)</td>
              <td className="px-4 py-2">No</td>
              <td className="px-4 py-2">General comparison</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Sortino</td>
              <td className="px-4 py-2">Partially (downside)</td>
              <td className="px-4 py-2">No</td>
              <td className="px-4 py-2">Asymmetric strategies</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Omega</td>
              <td className="px-4 py-2">Yes (full distribution)</td>
              <td className="px-4 py-2">No</td>
              <td className="px-4 py-2">Options strategies</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Calmar</td>
              <td className="px-4 py-2">No</td>
              <td className="px-4 py-2">Yes (max DD)</td>
              <td className="px-4 py-2">Tail risk assessment</td>
            </tr>
          </tbody>
        </table>
      </div>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Never evaluate strategies on raw returns alone. The <strong>Sharpe ratio</strong> is
          the universal standard, but supplement it with the <strong>Sortino ratio</strong> for
          asymmetric strategies (common in Bank Nifty options), the <strong>Calmar ratio</strong>{' '}
          for tail risk, and the <strong>Omega ratio</strong> for non-normal distributions.
          Always consider the <strong>statistical significance</strong> of your Sharpe estimate --
          a 3-year track record with Sharpe 0.5 is barely significant. In Indian markets, a
          Sharpe ratio above 1.0 after transaction costs is considered excellent for a fully
          systematic strategy.
        </p>
      </NoteBlock>
    </div>
  )
}
