import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveCAPM() {
  const [beta, setBeta] = useState(1.2)
  const [riskFree, setRiskFree] = useState(6.5)
  const [marketPremium, setMarketPremium] = useState(8.0)
  const [actualReturn, setActualReturn] = useState(20.0)

  const expectedReturn = riskFree + beta * marketPremium
  const alpha = actualReturn - expectedReturn
  const smlSlope = marketPremium
  const unsystematicRisk = Math.max(0, Math.sqrt(Math.pow(actualReturn - expectedReturn, 2)))

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: CAPM Security Market Line
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Plot an Indian stock on the Security Market Line. Stocks above the SML have
        positive alpha (undervalued); stocks below have negative alpha (overvalued).
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Beta: {beta.toFixed(2)}</span>
          <input type="range" min="0" max="2.5" step="0.05" value={beta}
            onChange={e => setBeta(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Risk-Free (T-Bill): {riskFree.toFixed(1)}%</span>
          <input type="range" min="4" max="9" step="0.25" value={riskFree}
            onChange={e => setRiskFree(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Market Premium: {marketPremium.toFixed(1)}%</span>
          <input type="range" min="3" max="12" step="0.5" value={marketPremium}
            onChange={e => setMarketPremium(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Actual Return: {actualReturn.toFixed(1)}%</span>
          <input type="range" min="-5" max="40" step="0.5" value={actualReturn}
            onChange={e => setActualReturn(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 500 280" className="w-full max-w-xl mx-auto block" aria-label="Security Market Line">
        <defs>
          <marker id="smlArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#6366f1" />
          </marker>
        </defs>
        {/* Axes */}
        <line x1="60" y1="240" x2="460" y2="240" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#smlArrow)" />
        <line x1="60" y1="240" x2="60" y2="20" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#smlArrow)" />
        <text x="260" y="270" textAnchor="middle" className="text-[10px]" fill="#6b7280">Beta</text>
        <text x="30" y="130" textAnchor="middle" className="text-[10px]" fill="#6b7280" transform="rotate(-90,30,130)">E[R]</text>

        {/* SML Line */}
        <line x1="60" y1={240 - riskFree * 8} x2="440" y2={240 - (riskFree + 2.5 * marketPremium) * 8}
          stroke="#6366f1" strokeWidth="2" strokeDasharray="6,3" />
        <text x="380" y={240 - (riskFree + 2.0 * marketPremium) * 8 - 8} className="text-[9px] font-semibold" fill="#6366f1">SML</text>

        {/* Risk-free point */}
        <circle cx="60" cy={240 - riskFree * 8} r="4" fill="#10b981" />
        <text x="75" y={240 - riskFree * 8 + 4} className="text-[9px]" fill="#10b981">Rf={riskFree}%</text>

        {/* Market portfolio */}
        <circle cx={60 + 1.0 * 160} cy={240 - (riskFree + marketPremium) * 8} r="5" fill="#6366f1" />
        <text x={60 + 1.0 * 160 + 10} y={240 - (riskFree + marketPremium) * 8 - 5} className="text-[9px]" fill="#6366f1">Nifty 50 (beta=1)</text>

        {/* Stock point */}
        <circle cx={60 + beta * 160} cy={240 - actualReturn * 8} r="6"
          fill={alpha >= 0 ? '#10b981' : '#ef4444'} />
        <text x={60 + beta * 160 + 10} y={240 - actualReturn * 8 - 5}
          className="text-[9px] font-semibold" fill={alpha >= 0 ? '#10b981' : '#ef4444'}>
          Stock ({actualReturn.toFixed(1)}%)
        </text>

        {/* Expected point on SML */}
        <circle cx={60 + beta * 160} cy={240 - expectedReturn * 8} r="4" fill="#94a3b8" strokeWidth="1" stroke="#6366f1" />

        {/* Alpha line */}
        {Math.abs(alpha) > 0.5 && (
          <line x1={60 + beta * 160} y1={240 - actualReturn * 8}
            x2={60 + beta * 160} y2={240 - expectedReturn * 8}
            stroke={alpha >= 0 ? '#10b981' : '#ef4444'} strokeWidth="1.5" strokeDasharray="3,2" />
        )}
      </svg>

      <div className="mt-3 grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-blue-50 p-2 text-center dark:bg-blue-900/30">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">CAPM Expected</p>
          <p className="text-lg font-bold text-blue-800 dark:text-blue-200">{expectedReturn.toFixed(1)}%</p>
        </div>
        <div className="rounded-lg bg-green-50 p-2 text-center dark:bg-green-900/30">
          <p className="text-xs font-semibold text-green-700 dark:text-green-300">Actual Return</p>
          <p className="text-lg font-bold text-green-800 dark:text-green-200">{actualReturn.toFixed(1)}%</p>
        </div>
        <div className={`rounded-lg p-2 text-center ${alpha >= 0 ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'}`}>
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Alpha</p>
          <p className={`text-lg font-bold ${alpha >= 0 ? 'text-green-700 dark:text-green-300' : 'text-red-600'}`}>{alpha.toFixed(1)}%</p>
        </div>
      </div>
    </div>
  )
}

export default function CAPMAPT() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        CAPM and Arbitrage Pricing Theory
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The Capital Asset Pricing Model (CAPM) and Arbitrage Pricing Theory (APT) are the
        foundational frameworks for understanding how risk is priced in equity markets. For
        Indian quant finance, they explain why Nifty 50 stocks earn different returns: it is
        their exposure to systematic risk factors. These models underpin SEBI's risk
        classification framework and every factor-based strategy on NSE.
      </p>

      <DefinitionBlock
        title="Capital Asset Pricing Model (CAPM)"
        label="Definition 1.1"
        definition="CAPM states that the expected return of any asset is determined solely by its systematic risk exposure (beta) relative to the market portfolio. Unsystematic (idiosyncratic) risk is not compensated because it can be diversified away."
        notation="E[R_i] = R_f + \beta_i (E[R_m] - R_f), \quad \beta_i = \frac{\text{Cov}(R_i, R_m)}{\text{Var}(R_m)}"
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For the Indian market, <InlineMath math="R_f" /> is the 91-day T-bill rate (~6.5%),{' '}
        <InlineMath math="R_m" /> is the Nifty 50 return, and <InlineMath math="\beta_i" /> is
        estimated by regressing stock returns on Nifty 50 returns. A stock with{' '}
        <InlineMath math="\beta = 1.5" /> is expected to earn 1.5x the market premium.
      </p>

      <TheoremBlock
        title="CAPM Derivation (Sketch)"
        label="Theorem 1.1"
        statement="Under the assumptions of mean-variance optimization, homogeneous expectations, and a risk-free asset, all investors hold the same risky portfolio (the market portfolio). The equilibrium expected return is linear in beta."
        formula="E[R_i] - R_f = \beta_i [E[R_m] - R_f], \quad \beta_i = \frac{\text{Cov}(R_i, R_m)}{\sigma_m^2}"
        proof="From the mean-variance frontier, the tangency portfolio is the market portfolio M. Any efficient portfolio is a combination of M and the risk-free asset. For any asset i, consider adding a small amount \epsilon to M. The change in portfolio return is \epsilon E[R_i] and the change in variance (to first order) is 2\epsilon \text{Cov}(R_i, R_m). At optimality, the marginal reward-to-risk ratio must equal the market's: \frac{E[R_i] - R_f}{\text{Cov}(R_i, R_m)} = \frac{E[R_m] - R_f}{\sigma_m^2}. Rearranging gives CAPM."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Arbitrage Pricing Theory (APT)
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        APT generalizes CAPM by allowing multiple risk factors. Instead of a single market
        factor, returns are driven by <InlineMath math="K" /> systematic factors:
      </p>

      <BlockMath math="R_i = \alpha_i + \sum_{k=1}^{K} \beta_{ik} F_k + \epsilon_i" />

      <DefinitionBlock
        title="Arbitrage Pricing Theory"
        label="Definition 1.2"
        definition="APT assumes that asset returns are generated by a linear factor model. In equilibrium, the expected return is a linear function of factor betas. Unlike CAPM, APT does not specify which factors matter -- they must be discovered empirically. For Indian markets, relevant factors include Nifty 50, INR/USD, crude oil, RBI policy rate, and sector indices."
        notation="E[R_i] = R_f + \sum_{k=1}^{K} \beta_{ik} \lambda_k"
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\lambda_k = E[F_k] - R_f" /> is the risk premium for factor{' '}
        <InlineMath math="k" />. The key insight is that no-arbitrage ensures this linear
        pricing relationship holds approximately for all assets.
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Feature</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">CAPM</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">APT</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Factors</td>
              <td className="px-4 py-2">Single (market)</td>
              <td className="px-4 py-2">Multiple (unspecified)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Assumptions</td>
              <td className="px-4 py-2">Mean-variance, homogeneous beliefs</td>
              <td className="px-4 py-2">No arbitrage, factor structure</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Testability</td>
              <td className="px-4 py-2">Requires identifying market portfolio</td>
              <td className="px-4 py-2">Factors must be discovered</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Indian market fit</td>
              <td className="px-4 py-2"><InlineMath math="R^2 \approx 0.3\text{--}0.5" /></td>
              <td className="px-4 py-2"><InlineMath math="R^2 \approx 0.5\text{--}0.7" /></td>
            </tr>
            <tr>
              <td className="px-4 py-2">Practical use</td>
              <td className="px-4 py-2">Cost of equity, SEBI</td>
              <td className="px-4 py-2">Factor investing, risk models</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveCAPM />

      <PythonCode
        title="capm_apt_nse.py"
        runnable
        code={`import numpy as np
from numpy.linalg import lstsq

# Simulated monthly returns: 5 years
np.random.seed(42)
n_months = 60

# Market factor (Nifty 50)
market = np.random.normal(0.01, 0.05, n_months)
rf_monthly = 0.065 / 12

# APT factors for Indian market
inr_usd = np.random.normal(0, 0.015, n_months)    # INR/USD changes
crude_oil = np.random.normal(0, 0.08, n_months)    # Crude oil returns
rate_change = np.random.normal(0, 0.002, n_months) # RBI rate changes

# Stock returns with known factor loadings
stocks = {
    'Reliance': {'beta_m': 1.1, 'beta_oil': 0.3, 'beta_fx': -0.2, 'alpha': 0.002},
    'TCS':      {'beta_m': 0.8, 'beta_oil': 0.0, 'beta_fx': 0.5,  'alpha': 0.003},
    'HDFC_Bank':{'beta_m': 1.3, 'beta_oil': -0.1,'beta_fx': -0.3, 'alpha': 0.001},
    'HUL':      {'beta_m': 0.6, 'beta_oil': -0.2,'beta_fx': -0.1, 'alpha': 0.002},
    'SBI':      {'beta_m': 1.5, 'beta_oil': 0.1, 'beta_fx': -0.4, 'alpha': -0.001},
}

print("=== CAPM and APT Analysis (NSE Stocks) ===")
print(f"Risk-free rate: {rf_monthly*12*100:.1f}% annual\\n")

for name, params in stocks.items():
    # Generate stock returns
    returns = (params['alpha'] + params['beta_m'] * market +
               params['beta_oil'] * crude_oil + params['beta_fx'] * inr_usd +
               np.random.normal(0, 0.03, n_months))
    excess = returns - rf_monthly
    mkt_excess = market - rf_monthly

    # --- CAPM Regression ---
    X_capm = np.column_stack([np.ones(n_months), mkt_excess])
    coeff_capm, residuals_c, _, _ = lstsq(X_capm, excess, rcond=None)
    alpha_capm = coeff_capm[0] * 12  # Annualized
    beta_capm = coeff_capm[1]
    ss_res = np.sum((excess - X_capm @ coeff_capm)**2)
    ss_tot = np.sum((excess - excess.mean())**2)
    r2_capm = 1 - ss_res / ss_tot

    # --- APT (3-factor) Regression ---
    X_apt = np.column_stack([np.ones(n_months), mkt_excess, crude_oil, inr_usd])
    coeff_apt, _, _, _ = lstsq(X_apt, excess, rcond=None)
    alpha_apt = coeff_apt[0] * 12
    ss_res_apt = np.sum((excess - X_apt @ coeff_apt)**2)
    r2_apt = 1 - ss_res_apt / ss_tot

    print(f"--- {name} ---")
    print(f"  CAPM: alpha={alpha_capm*100:+.2f}%, beta={beta_capm:.3f}, R²={r2_capm:.3f}")
    print(f"  APT:  alpha={alpha_apt*100:+.2f}%, betas=[mkt:{coeff_apt[1]:.2f}, oil:{coeff_apt[2]:.2f}, fx:{coeff_apt[3]:.2f}], R²={r2_apt:.3f}")
    print(f"  APT R² improvement: {(r2_apt-r2_capm)*100:+.1f} pp")
    print()

print("Conclusion: APT with macro factors explains more variance than single-factor CAPM.")
print("Oil sensitivity matters for Reliance; FX matters for TCS (USD revenues).")`}
      />

      <ExampleBlock
        title="CAPM for HDFC Bank on NSE"
        difficulty="beginner"
        problem="HDFC Bank has beta = 1.25 against Nifty 50. The 91-day T-bill yields 6.5% and the expected Nifty 50 return is 14%. What is HDFC Bank's CAPM expected return? If it actually returned 19%, what is Jensen's alpha?"
        solution={[
          {
            step: 'CAPM expected return',
            formula: 'E[R] = 6.5\\% + 1.25 \\times (14\\% - 6.5\\%) = 6.5\\% + 9.375\\% = 15.875\\%',
            explanation: 'CAPM predicts HDFC Bank should earn 15.9% given its beta of 1.25.',
          },
          {
            step: "Jensen's alpha",
            formula: '\\alpha = 19\\% - 15.875\\% = +3.125\\%',
            explanation: 'HDFC Bank earned 313 bps above its CAPM-predicted return, indicating positive alpha -- either genuine skill in picking this stock or exposure to risk factors not captured by CAPM.',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Testing CAPM on Indian Data
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Empirical tests of CAPM on NSE data reveal several well-known anomalies that
        violate the model's predictions:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Anomaly</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">CAPM Prediction</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Indian Market Reality</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Implication</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Low Beta Anomaly</td>
              <td className="px-4 py-2">High beta = high return</td>
              <td className="px-4 py-2">Low beta outperforms on risk-adj basis</td>
              <td className="px-4 py-2">Nifty 100 Low Vol outperforms</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Size Effect</td>
              <td className="px-4 py-2">No size premium</td>
              <td className="px-4 py-2">Small caps earn ~6% premium</td>
              <td className="px-4 py-2">Nifty Smallcap outperforms long-term</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Value Effect</td>
              <td className="px-4 py-2">No value premium</td>
              <td className="px-4 py-2">High B/M earns ~4% premium</td>
              <td className="px-4 py-2">PSU banks vs growth stocks</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Momentum Effect</td>
              <td className="px-4 py-2">Past returns irrelevant</td>
              <td className="px-4 py-2">Past winners continue (8-12% p.a.)</td>
              <td className="px-4 py-2">Strongest anomaly on NSE</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The Fama-MacBeth (1973) two-pass regression test provides the standard empirical
        framework. First, estimate betas for each stock using time-series regressions.
        Second, regress cross-sectional returns on estimated betas each month. If CAPM
        holds, the cross-sectional slope should equal the market premium and the intercept
        should be zero. On NSE data, the SML is flatter than CAPM predicts (low-beta
        stocks earn more than expected, high-beta stocks earn less), consistent with
        the low-beta anomaly observed globally.
      </p>

      <BlockMath math="\text{Fama-MacBeth: } R_{i,t} = \gamma_{0,t} + \gamma_{1,t} \hat{\beta}_i + \epsilon_{i,t}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Under CAPM: <InlineMath math="\bar{\gamma}_0 = R_f" /> and{' '}
        <InlineMath math="\bar{\gamma}_1 = \bar{R}_m - R_f" />. Indian data typically shows{' '}
        <InlineMath math="\bar{\gamma}_0 > R_f" /> (intercept too high) and{' '}
        <InlineMath math="\bar{\gamma}_1 < \bar{R}_m - R_f" /> (slope too flat), rejecting
        CAPM as a complete model of expected returns on NSE.
      </p>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          CAPM provides the simplest asset pricing framework: expected returns are linear in
          market beta. APT generalizes this to multiple factors (market, FX, oil, rates),
          improving explanatory power from ~35% to ~60% for Indian stocks. Empirical tests
          on NSE data reject CAPM due to the low-beta anomaly, size effect, value premium,
          and momentum effect. These anomalies motivate the move to multi-factor models.
          Alpha is what remains unexplained after accounting for all systematic risk factors --
          the holy grail of quant finance on NSE.
        </p>
      </NoteBlock>
    </div>
  )
}
