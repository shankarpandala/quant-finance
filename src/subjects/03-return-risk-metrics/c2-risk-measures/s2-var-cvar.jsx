import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveVaR() {
  const [portfolioValue, setPortfolioValue] = useState(10000000)
  const [confidence, setConfidence] = useState(95)
  const [dailyVol, setDailyVol] = useState(1.5)
  const [horizon, setHorizon] = useState(1)

  const zScores = { 90: 1.282, 95: 1.645, 99: 2.326 }
  const z = zScores[confidence] || 1.645
  const scaledVol = dailyVol / 100 * Math.sqrt(horizon)
  const varAmount = portfolioValue * z * scaledVol
  const varPct = z * scaledVol * 100
  const esMultiplier = confidence === 99 ? 2.665 : confidence === 95 ? 2.063 : 1.755
  const cvarAmount = portfolioValue * esMultiplier * scaledVol
  const cvarPct = esMultiplier * scaledVol * 100

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: VaR and CVaR Calculator
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Compute parametric VaR and CVaR for an Indian equity portfolio.
        Assumes normally distributed returns (Gaussian VaR).
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Portfolio: INR {(portfolioValue / 100000).toFixed(0)} Lakhs</span>
          <input type="range" min="1000000" max="100000000" step="1000000" value={portfolioValue}
            onChange={e => setPortfolioValue(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Confidence: {confidence}%</span>
          <select value={confidence} onChange={e => setConfidence(parseInt(e.target.value))}
            className="rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800">
            <option value={90}>90%</option>
            <option value={95}>95%</option>
            <option value={99}>99%</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Daily Vol: {dailyVol.toFixed(2)}%</span>
          <input type="range" min="0.5" max="4.0" step="0.1" value={dailyVol}
            onChange={e => setDailyVol(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Horizon: {horizon} day(s)</span>
          <input type="range" min="1" max="10" step="1" value={horizon}
            onChange={e => setHorizon(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/30">
          <p className="text-xs font-semibold text-red-700 dark:text-red-300">VaR ({confidence}%)</p>
          <p className="text-lg font-bold text-red-800 dark:text-red-200">
            INR {(varAmount / 100000).toFixed(2)}L
          </p>
          <p className="text-xs text-red-600 dark:text-red-400">{varPct.toFixed(2)}% of portfolio</p>
        </div>
        <div className="rounded-lg bg-orange-50 p-3 dark:bg-orange-900/30">
          <p className="text-xs font-semibold text-orange-700 dark:text-orange-300">CVaR / ES</p>
          <p className="text-lg font-bold text-orange-800 dark:text-orange-200">
            INR {(cvarAmount / 100000).toFixed(2)}L
          </p>
          <p className="text-xs text-orange-600 dark:text-orange-400">{cvarPct.toFixed(2)}% of portfolio</p>
        </div>
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">Z-Score</p>
          <p className="text-lg font-bold text-blue-800 dark:text-blue-200">{z.toFixed(3)}</p>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
          <p className="text-xs font-semibold text-purple-700 dark:text-purple-300">Scaled Vol</p>
          <p className="text-lg font-bold text-purple-800 dark:text-purple-200">{(scaledVol * 100).toFixed(3)}%</p>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
        There is a {confidence}% probability that the portfolio will not lose more than{' '}
        <strong>INR {(varAmount / 100000).toFixed(2)} Lakhs</strong> over {horizon} day(s).
        If it does breach, the expected loss is <strong>INR {(cvarAmount / 100000).toFixed(2)} Lakhs</strong>.
      </p>
    </div>
  )
}

export default function VaRCVaR() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Value at Risk and Conditional VaR
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Value at Risk (VaR) answers a simple question: What is the maximum loss over a given
        horizon at a given confidence level? It is the standard risk metric used by SEBI for
        margin requirements, by Indian banks for market risk capital under Basel III, and by
        quant funds for portfolio risk budgeting. CVaR (Expected Shortfall) extends VaR by
        measuring the expected loss when VaR is breached.
      </p>

      <DefinitionBlock
        title="Value at Risk (VaR)"
        label="Definition 2.3"
        definition="VaR at confidence level alpha is the loss threshold such that the probability of exceeding it is 1-alpha. Equivalently, it is the negative of the alpha-quantile of the P&L distribution. SEBI mandates VaR-based margin calculations for equity derivatives on NSE."
        notation="\text{VaR}_\alpha = -\inf\{x : P(L \leq x) \geq 1 - \alpha\} = -F_L^{-1}(1 - \alpha)"
      />

      <DefinitionBlock
        title="Conditional VaR (Expected Shortfall)"
        label="Definition 2.4"
        definition="CVaR (also called Expected Shortfall or ES) is the expected loss conditional on the loss exceeding VaR. It is a coherent risk measure (unlike VaR) and captures tail risk more accurately. Under Basel III, Indian banks are transitioning from VaR to ES for market risk."
        notation="\text{CVaR}_\alpha = E[L \mid L > \text{VaR}_\alpha] = \frac{1}{1-\alpha}\int_\alpha^1 \text{VaR}_u \, du"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Parametric (Gaussian) VaR
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Under the assumption that portfolio returns are normally distributed, VaR has a
        closed-form expression:
      </p>

      <BlockMath math="\text{VaR}_\alpha = \mu - z_\alpha \cdot \sigma = -z_\alpha \cdot \sigma \quad \text{(assuming } \mu \approx 0 \text{ for daily)}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For multi-day VaR with horizon <InlineMath math="T" />:
      </p>

      <BlockMath math="\text{VaR}_\alpha(T) = z_\alpha \cdot \sigma_{\text{daily}} \cdot \sqrt{T} \cdot W" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="W" /> is the portfolio value in INR. Under normality, CVaR
        also has a closed form:
      </p>

      <BlockMath math="\text{CVaR}_\alpha = \sigma \cdot \frac{\phi(z_\alpha)}{1 - \alpha} \cdot W" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\phi" /> is the standard normal PDF.
      </p>

      <TheoremBlock
        title="Subadditivity and Coherent Risk Measures"
        label="Theorem 2.2"
        statement="A risk measure rho is coherent if it satisfies: (1) Monotonicity, (2) Translation invariance, (3) Positive homogeneity, and (4) Subadditivity: rho(X+Y) <= rho(X) + rho(Y). VaR fails subadditivity in general, while CVaR is always coherent."
        formula="\text{CVaR}(X + Y) \leq \text{CVaR}(X) + \text{CVaR}(Y) \quad \text{always}"
        proof="VaR can violate subadditivity for non-elliptical distributions. Consider two zero-coupon bonds, each defaulting with probability 4%. Individual VaR_{95\%} = 0 (since P(loss) < 5%), but the portfolio can have VaR_{95\%} > 0 (since P(at least one default) \approx 8% > 5%). CVaR, defined as the tail conditional expectation, inherits linearity of expectation and thus is always subadditive. This is why SEBI and Basel III are moving toward ES-based risk measures."
      />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Method</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Assumption</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Pros</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Cons</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Parametric</td>
              <td className="px-4 py-2">Normal returns</td>
              <td className="px-4 py-2">Fast, closed-form</td>
              <td className="px-4 py-2">Underestimates tails</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Historical</td>
              <td className="px-4 py-2">Past = future</td>
              <td className="px-4 py-2">Non-parametric</td>
              <td className="px-4 py-2">Limited by sample</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Monte Carlo</td>
              <td className="px-4 py-2">Model-dependent</td>
              <td className="px-4 py-2">Flexible, handles nonlinearity</td>
              <td className="px-4 py-2">Computationally heavy</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Cornish-Fisher</td>
              <td className="px-4 py-2">Near-normal with corrections</td>
              <td className="px-4 py-2">Captures skew/kurtosis</td>
              <td className="px-4 py-2">Approximation only</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveVaR />

      <PythonCode
        title="var_cvar_nse.py"
        runnable
        code={`import numpy as np
from scipy.stats import norm, t as t_dist

# Simulated Nifty 50 portfolio daily returns (2 years)
np.random.seed(42)
n_days = 504
returns = np.random.standard_t(df=5, size=n_days) * 0.012 + 0.0003

portfolio_value = 1_00_00_000  # INR 1 Crore
confidence = 0.95
alpha = 1 - confidence

# --- 1. Parametric (Gaussian) VaR ---
mu = np.mean(returns)
sigma = np.std(returns)
z = norm.ppf(alpha)
var_gaussian = -(mu + z * sigma) * portfolio_value
cvar_gaussian = sigma * norm.pdf(z) / alpha * portfolio_value

# --- 2. Historical VaR ---
sorted_returns = np.sort(returns)
var_index = int(np.floor(alpha * n_days))
var_historical = -sorted_returns[var_index] * portfolio_value
cvar_historical = -np.mean(sorted_returns[:var_index]) * portfolio_value

# --- 3. Cornish-Fisher VaR ---
skew = float(np.mean(((returns - mu)/sigma)**3))
kurt = float(np.mean(((returns - mu)/sigma)**4)) - 3
z_cf = z + (z**2 - 1) * skew / 6 + (z**3 - 3*z) * kurt / 24 - (2*z**3 - 5*z) * skew**2 / 36
var_cf = -(mu + z_cf * sigma) * portfolio_value

# --- 4. Student-t VaR ---
from scipy.optimize import minimize_scalar
# Fit t-distribution
result = t_dist.fit(returns)
df_t, loc_t, scale_t = result
var_t = -t_dist.ppf(alpha, df_t, loc_t, scale_t) * portfolio_value
cvar_t_quantile = t_dist.ppf(alpha, df_t)
cvar_t = -portfolio_value * (loc_t + scale_t * (-t_dist.pdf(cvar_t_quantile, df_t) / alpha) * (df_t + cvar_t_quantile**2) / (df_t - 1))

print("=== VaR & CVaR Analysis (INR 1 Crore Nifty Portfolio) ===")
print(f"Confidence: {confidence*100:.0f}% | Daily | {n_days} observations")
print(f"Daily vol: {sigma*100:.3f}% | Skew: {skew:.3f} | Ex. Kurt: {kurt:.3f}")
print()
print(f"{'Method':<20} {'VaR (INR)':>15} {'VaR (%)':>10} {'CVaR (INR)':>15}")
print("-" * 65)
print(f"{'Gaussian':<20} {var_gaussian:>15,.0f} {var_gaussian/portfolio_value*100:>9.3f}% {cvar_gaussian:>15,.0f}")
print(f"{'Historical':<20} {var_historical:>15,.0f} {var_historical/portfolio_value*100:>9.3f}% {cvar_historical:>15,.0f}")
print(f"{'Cornish-Fisher':<20} {var_cf:>15,.0f} {var_cf/portfolio_value*100:>9.3f}%")
print(f"{'Student-t (df={df_t:.1f})':<20} {var_t:>15,.0f} {var_t/portfolio_value*100:>9.3f}%")
print()
print("Note: Fat tails (kurtosis > 0) cause Gaussian VaR to underestimate risk.")
print(f"Historical CVaR/VaR ratio: {cvar_historical/var_historical:.3f}")
print(f"Under normality, CVaR/VaR ≈ {norm.pdf(norm.ppf(alpha))/alpha/norm.ppf(1-alpha):.3f}")`}
      />

      <ExampleBlock
        title="VaR for a Zerodha Portfolio"
        difficulty="intermediate"
        problem="A trader has INR 50 Lakhs in Nifty 50 stocks with daily volatility of 1.4%. Compute the 1-day 99% parametric VaR and the corresponding CVaR, assuming normal returns."
        solution={[
          {
            step: 'Identify parameters',
            formula: 'W = 50{,}00{,}000, \\quad \\sigma = 0.014, \\quad z_{0.01} = 2.326',
            explanation: 'For 99% confidence, the z-score is 2.326.',
          },
          {
            step: 'Compute VaR',
            formula: '\\text{VaR}_{99\\%} = 2.326 \\times 0.014 \\times 50{,}00{,}000 = \\text{INR } 1{,}62{,}820',
            explanation: 'With 99% confidence, the daily loss will not exceed INR 1.63 Lakhs.',
          },
          {
            step: 'Compute CVaR',
            formula: '\\text{CVaR}_{99\\%} = \\frac{\\phi(2.326)}{0.01} \\times 0.014 \\times 50{,}00{,}000 = \\frac{0.02665}{0.01} \\times 70{,}000 = \\text{INR } 1{,}86{,}550',
            explanation: 'If the 99% VaR is breached, the expected loss is about INR 1.87 Lakhs -- 15% more than VaR.',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Cornish-Fisher VaR
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The Cornish-Fisher expansion adjusts the Gaussian quantile for skewness and kurtosis,
        providing a more accurate VaR without abandoning the parametric framework:
      </p>

      <BlockMath math="z_{\text{CF}} = z + \frac{z^2 - 1}{6}S + \frac{z^3 - 3z}{24}K - \frac{2z^3 - 5z}{36}S^2" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="S" /> is skewness, <InlineMath math="K" /> is excess kurtosis,
        and <InlineMath math="z" /> is the Gaussian quantile. For Nifty 50 with{' '}
        <InlineMath math="S \approx -0.3" /> and <InlineMath math="K \approx 4" />, the
        Cornish-Fisher 99% VaR is approximately 15-20% higher than Gaussian VaR -- a
        material difference for SEBI margin calculations.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        SEBI Margin Framework
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        SEBI mandates VaR-based margins for equity derivatives on NSE using the SPAN
        (Standard Portfolio Analysis of Risk) system. Key features of the Indian margin
        framework include:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Margin Component</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Calculation</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Purpose</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">VaR Margin</td>
              <td className="px-4 py-2">99% VaR (exponential, 6-sigma)</td>
              <td className="px-4 py-2">Covers worst 1% daily move</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">ELM (Extreme Loss)</td>
              <td className="px-4 py-2">Higher of 5% or 1.5x sigma</td>
              <td className="px-4 py-2">Covers beyond-VaR events</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">SPAN Margin</td>
              <td className="px-4 py-2">Portfolio-based scanning</td>
              <td className="px-4 py-2">F&O portfolio risk</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Peak Margin</td>
              <td className="px-4 py-2">Intraday margin snapshots</td>
              <td className="px-4 py-2">Prevents intraday leverage abuse</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Since 2020, SEBI introduced peak margin reporting requiring Zerodha and other
        brokers to collect margins based on the highest intraday exposure at four random
        snapshots. This significantly increased the capital requirements for intraday
        trading strategies on NSE.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Backtesting VaR Models
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A VaR model must be backtested by counting violations -- days where the actual loss
        exceeded the VaR estimate. Under Basel III (applicable to Indian banks via RBI), the
        model is evaluated using the Kupiec test:
      </p>

      <BlockMath math="LR_{\text{Kupiec}} = -2\ln\!\left[\frac{(1-p)^{T-x} p^x}{(1-x/T)^{T-x} (x/T)^x}\right] \sim \chi^2_1" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="x" /> is the number of violations in{' '}
        <InlineMath math="T" /> days and <InlineMath math="p = 1 - \alpha" /> is the expected
        violation rate. For a 99% VaR over 250 days, we expect 2.5 violations. If the
        actual count exceeds 4, the model is likely underestimating risk.
      </p>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          VaR tells you the minimum loss in the worst <InlineMath math="(1-\alpha)" /> fraction
          of days; CVaR tells you the <em>average</em> loss in those worst days. For Indian
          markets with fat tails (Nifty 50 excess kurtosis ~ 3-5), Gaussian VaR significantly
          underestimates risk. The Cornish-Fisher expansion provides a quick fix by incorporating
          skewness and kurtosis. Always complement parametric VaR with historical or Student-t
          approaches. SEBI uses VaR-based SPAN margins for F&O on NSE -- understanding these
          calculations is essential for any derivatives trader. Backtest your VaR model using
          the Kupiec test to ensure the violation rate matches the confidence level.
        </p>
      </NoteBlock>
    </div>
  )
}
