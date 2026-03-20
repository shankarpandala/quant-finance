import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveExcessReturn() {
  const [stockReturn, setStockReturn] = useState(15.0)
  const [riskFreeRate, setRiskFreeRate] = useState(6.5)
  const [benchmarkReturn, setBenchmarkReturn] = useState(12.0)
  const [beta, setBeta] = useState(1.2)

  const excessOverRf = stockReturn - riskFreeRate
  const activeReturn = stockReturn - benchmarkReturn
  const expectedReturn = riskFreeRate + beta * (benchmarkReturn - riskFreeRate)
  const alpha = stockReturn - expectedReturn

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Excess Return Decomposition
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Analyze different types of excess returns for an Indian equity portfolio.
        Risk-free rate reflects RBI repo rate + T-bill yield.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Stock Return: {stockReturn.toFixed(1)}%</span>
          <input type="range" min="-20" max="40" step="0.5" value={stockReturn}
            onChange={e => setStockReturn(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Risk-Free (91-day T-Bill): {riskFreeRate.toFixed(1)}%</span>
          <input type="range" min="3" max="10" step="0.25" value={riskFreeRate}
            onChange={e => setRiskFreeRate(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Nifty 50 Return: {benchmarkReturn.toFixed(1)}%</span>
          <input type="range" min="-15" max="30" step="0.5" value={benchmarkReturn}
            onChange={e => setBenchmarkReturn(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Beta: {beta.toFixed(2)}</span>
          <input type="range" min="0" max="2.5" step="0.05" value={beta}
            onChange={e => setBeta(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">Excess over Rf</p>
          <p className={`text-lg font-bold ${excessOverRf >= 0 ? 'text-blue-800 dark:text-blue-200' : 'text-red-600'}`}>
            {excessOverRf.toFixed(1)}%
          </p>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
          <p className="text-xs font-semibold text-purple-700 dark:text-purple-300">Active Return</p>
          <p className={`text-lg font-bold ${activeReturn >= 0 ? 'text-purple-800 dark:text-purple-200' : 'text-red-600'}`}>
            {activeReturn.toFixed(1)}%
          </p>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">CAPM Expected</p>
          <p className="text-lg font-bold text-amber-800 dark:text-amber-200">
            {expectedReturn.toFixed(1)}%
          </p>
        </div>
        <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/30">
          <p className="text-xs font-semibold text-green-700 dark:text-green-300">Jensen's Alpha</p>
          <p className={`text-lg font-bold ${alpha >= 0 ? 'text-green-800 dark:text-green-200' : 'text-red-600'}`}>
            {alpha.toFixed(2)}%
          </p>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
        <InlineMath math={`\\alpha = R_p - [R_f + \\beta(R_m - R_f)] = ${stockReturn.toFixed(1)} - [${riskFreeRate.toFixed(1)} + ${beta.toFixed(2)} \\times ${(benchmarkReturn - riskFreeRate).toFixed(1)}] = ${alpha.toFixed(2)}\\%`} />
      </p>
    </div>
  )
}

export default function ExcessReturns() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Excess Returns and Benchmarking
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Raw returns are meaningless without context. Did your portfolio earn 15% because you
        took smart bets, or because Nifty 50 rose 18%? Excess returns strip away the baseline --
        whether the risk-free rate or a benchmark -- to reveal genuine performance. In Indian
        markets, where the risk-free rate (91-day T-bill) hovers around 6-7%, this distinction
        is crucial.
      </p>

      <DefinitionBlock
        title="Excess Return over Risk-Free Rate"
        label="Definition 1.3"
        definition="The excess return is the return earned above the risk-free rate. It represents the compensation for bearing risk. In India, the risk-free rate is typically proxied by the 91-day Government of India Treasury Bill yield, published by RBI."
        notation="R^e_t = R_t - R_{f,t}"
      />

      <DefinitionBlock
        title="Active Return (Benchmark-Relative)"
        label="Definition 1.4"
        definition="The active return is the difference between the portfolio return and the benchmark return. It measures the value added (or destroyed) by active management relative to a passive index. For Indian equity funds, the standard benchmarks are Nifty 50, Nifty 500, or BSE Sensex."
        notation="R^{\text{active}}_t = R_{p,t} - R_{b,t}"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Risk-Free Rate in India
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The choice of risk-free rate matters significantly in India due to the higher absolute
        level compared to developed markets. Common proxies include:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Instrument</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Typical Yield</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Tenor</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Use Case</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">91-day T-Bill</td>
              <td className="px-4 py-2">6.5-7.0%</td>
              <td className="px-4 py-2">3 months</td>
              <td className="px-4 py-2">Short-term Sharpe ratio</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">364-day T-Bill</td>
              <td className="px-4 py-2">6.8-7.2%</td>
              <td className="px-4 py-2">1 year</td>
              <td className="px-4 py-2">Annual excess returns</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">RBI Repo Rate</td>
              <td className="px-4 py-2">6.0-6.5%</td>
              <td className="px-4 py-2">Overnight</td>
              <td className="px-4 py-2">Overnight cost of carry</td>
            </tr>
            <tr>
              <td className="px-4 py-2">10Y G-Sec</td>
              <td className="px-4 py-2">7.0-7.5%</td>
              <td className="px-4 py-2">10 years</td>
              <td className="px-4 py-2">Long-term equity premium</td>
            </tr>
          </tbody>
        </table>
      </div>

      <TheoremBlock
        title="Jensen's Alpha"
        label="Theorem 1.2"
        statement="Jensen's alpha measures the abnormal return of a portfolio beyond what is predicted by the CAPM. A positive alpha indicates that the manager generated returns above the systematic risk compensation."
        formula="\alpha_p = R_p - \left[R_f + \beta_p (R_m - R_f)\right]"
        proof="From CAPM, the expected return is E[R_p] = R_f + \beta_p(E[R_m] - R_f). Jensen's alpha is the intercept in the regression R_{p,t} - R_{f,t} = \alpha_p + \beta_p(R_{m,t} - R_{f,t}) + \epsilon_t. Under the null hypothesis of CAPM, \alpha_p = 0. A statistically significant positive \alpha_p implies the portfolio earned returns not explained by market risk exposure."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Equity Risk Premium in India
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The equity risk premium (ERP) is the expected excess return of the stock market over the
        risk-free rate. For India, empirical estimates from 2000-2025 suggest:
      </p>

      <BlockMath math="\text{ERP}_{\text{India}} = E[R_{\text{Nifty50}}] - R_f \approx 6\text{--}8\%" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        This is higher than the US ERP (4-6%) due to higher growth expectations, currency risk,
        and emerging market premium. The ERP is time-varying and tends to spike during crises
        (e.g., IL&FS collapse in 2018, COVID in 2020).
      </p>

      <InteractiveExcessReturn />

      <PythonCode
        title="excess_returns_india.py"
        runnable
        code={`import numpy as np
import pandas as pd

# Simulated data: Nifty 50 and portfolio returns
np.random.seed(42)
n_months = 60  # 5 years of monthly data

# Risk-free rate: 91-day T-bill (monthly)
rf_annual = 0.065  # 6.5% annual
rf_monthly = (1 + rf_annual) ** (1/12) - 1

# Nifty 50 monthly returns
nifty_returns = np.random.normal(0.01, 0.05, n_months)

# Portfolio returns (alpha-generating strategy)
beta_true = 1.15
alpha_true = 0.003  # 30 bps monthly alpha
portfolio_returns = alpha_true + beta_true * nifty_returns + np.random.normal(0, 0.02, n_months)

# --- Compute Excess Returns ---
excess_over_rf = portfolio_returns - rf_monthly
nifty_excess = nifty_returns - rf_monthly
active_return = portfolio_returns - nifty_returns

# --- OLS Regression for Jensen's Alpha ---
from numpy.linalg import lstsq
X = np.column_stack([np.ones(n_months), nifty_excess])
y = excess_over_rf
coeffs, residuals, _, _ = lstsq(X, y, rcond=None)
alpha_est, beta_est = coeffs

# --- Information Ratio ---
tracking_error = np.std(active_return) * np.sqrt(12)
ir = np.mean(active_return) * 12 / tracking_error

# --- Annualized Metrics ---
ann_portfolio = (1 + np.mean(portfolio_returns))**12 - 1
ann_nifty = (1 + np.mean(nifty_returns))**12 - 1
ann_alpha = alpha_est * 12

print("=== Excess Return Analysis (INR Portfolio vs Nifty 50) ===")
print(f"\\nRisk-free rate (91-day T-Bill): {rf_annual*100:.1f}% annual")
print(f"\\n--- Annualized Returns ---")
print(f"Portfolio:  {ann_portfolio*100:.2f}%")
print(f"Nifty 50:   {ann_nifty*100:.2f}%")
print(f"Excess over Rf: {(ann_portfolio - rf_annual)*100:.2f}%")
print(f"Active return:  {(ann_portfolio - ann_nifty)*100:.2f}%")
print(f"\\n--- CAPM Regression ---")
print(f"Jensen's Alpha (monthly): {alpha_est*10000:.1f} bps")
print(f"Jensen's Alpha (annual):  {ann_alpha*100:.2f}%")
print(f"Beta: {beta_est:.3f}")
print(f"\\n--- Information Ratio ---")
print(f"Tracking Error: {tracking_error*100:.2f}%")
print(f"Information Ratio: {ir:.3f}")
print(f"\\nInterpretation: IR > 0.5 is good, > 1.0 is excellent")
print(f"This portfolio: {'Excellent' if ir > 1 else 'Good' if ir > 0.5 else 'Below average'}")`}
      />

      <ExampleBlock
        title="Active Return of a Nifty 50 Fund"
        difficulty="beginner"
        problem="A SEBI-registered PMS scheme returned 18.5% over the past year. Nifty 50 returned 14.2% and the 91-day T-bill yielded 6.8%. The fund's beta against Nifty 50 is 1.1. Compute: (a) excess return over risk-free, (b) active return, (c) Jensen's alpha."
        solution={[
          {
            step: 'Excess return over risk-free rate',
            formula: 'R^e = 18.5\\% - 6.8\\% = 11.7\\%',
            explanation: 'The fund earned 11.7% above the risk-free rate for bearing equity risk.',
          },
          {
            step: 'Active return vs. Nifty 50',
            formula: 'R^{\\text{active}} = 18.5\\% - 14.2\\% = 4.3\\%',
            explanation: 'The fund outperformed its benchmark by 430 basis points.',
          },
          {
            step: "Jensen's alpha",
            formula: '\\alpha = 18.5\\% - [6.8\\% + 1.1 \\times (14.2\\% - 6.8\\%)] = 18.5\\% - [6.8\\% + 8.14\\%] = 3.56\\%',
            explanation: 'After adjusting for the higher beta exposure, the manager still generated 356 bps of alpha -- genuine skill rather than just leveraging market risk.',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Tracking Error and the Information Ratio
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Tracking error is the standard deviation of active returns. It measures how
        consistently the portfolio deviates from its benchmark:
      </p>

      <BlockMath math="\text{TE} = \sigma(R_p - R_b) = \sqrt{\frac{1}{T-1}\sum_{t=1}^{T}(R^{\text{active}}_t - \overline{R^{\text{active}}})^2}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The Information Ratio normalizes active return by tracking error, giving the
        active return per unit of active risk:
      </p>

      <BlockMath math="\text{IR} = \frac{\overline{R^{\text{active}}}}{\text{TE}} = \frac{R_p - R_b}{\sigma(R_p - R_b)}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For SEBI-registered Indian mutual funds, the typical tracking error ranges from
        1-3% for large-cap funds (closely tracking Nifty 50) to 6-10% for mid/small-cap
        funds. An IR above 0.5 is considered good; above 1.0 is exceptional and rare in
        Indian equity markets over sustained periods.
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">SEBI Category</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Benchmark</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Typical TE</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Top Quartile IR</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Large Cap</td>
              <td className="px-4 py-2">Nifty 50 TRI</td>
              <td className="px-4 py-2">1-3%</td>
              <td className="px-4 py-2">0.3-0.5</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Large & Mid Cap</td>
              <td className="px-4 py-2">Nifty 200 TRI</td>
              <td className="px-4 py-2">3-5%</td>
              <td className="px-4 py-2">0.4-0.7</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Mid Cap</td>
              <td className="px-4 py-2">Nifty Midcap 150</td>
              <td className="px-4 py-2">4-7%</td>
              <td className="px-4 py-2">0.3-0.6</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Small Cap</td>
              <td className="px-4 py-2">Nifty Smallcap 250</td>
              <td className="px-4 py-2">6-10%</td>
              <td className="px-4 py-2">0.3-0.5</td>
            </tr>
            <tr>
              <td className="px-4 py-2">PMS / AIF</td>
              <td className="px-4 py-2">Varies</td>
              <td className="px-4 py-2">5-15%</td>
              <td className="px-4 py-2">0.5-1.0</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Geometric vs. Arithmetic Excess Returns
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For multi-period analysis, the arithmetic excess return{' '}
        <InlineMath math="R_p - R_b" /> differs from the geometric excess return.
        The geometric (compounded) excess return is:
      </p>

      <BlockMath math="R^{\text{geo}}_{\text{excess}} = \frac{1 + R_p}{1 + R_b} - 1 \approx R_p - R_b - R_b \cdot R^{\text{active}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The difference matters over long horizons. For Indian large-cap funds with
        benchmark returns of 12-15%, the compounding correction can be 20-30 bps
        annually. SEBI's CAGR reporting implicitly uses geometric returns, so always
        compute excess returns consistently using the same compounding convention.
      </p>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Always analyze returns relative to a benchmark. In India, the high risk-free rate
          (6-7%) means a fund returning 12% is barely earning 5-6% excess return. Use{' '}
          <strong>Jensen's alpha</strong> to separate genuine skill from beta exposure, and the{' '}
          <strong>Information Ratio</strong> to assess whether active returns compensate for
          tracking error. SEBI's mutual fund categorization rules help standardize benchmark
          comparisons across fund categories. Be consistent about arithmetic vs. geometric
          excess returns, especially over multi-year horizons.
        </p>
      </NoteBlock>
    </div>
  )
}
