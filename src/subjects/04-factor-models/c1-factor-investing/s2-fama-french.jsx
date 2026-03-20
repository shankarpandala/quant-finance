import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveFF() {
  const [betaMkt, setBetaMkt] = useState(1.0)
  const [betaSMB, setBetaSMB] = useState(0.3)
  const [betaHML, setBetaHML] = useState(0.5)
  const [betaRMW, setBetaRMW] = useState(0.2)
  const [betaCMA, setBetaCMA] = useState(-0.1)

  const rf = 6.5
  const mktPrem = 8.0; const smbPrem = 3.0; const hmlPrem = 4.0
  const rmwPrem = 3.5; const cmaPrem = 2.5

  const expectedFF3 = rf + betaMkt * mktPrem + betaSMB * smbPrem + betaHML * hmlPrem
  const expectedFF5 = expectedFF3 + betaRMW * rmwPrem + betaCMA * cmaPrem
  const expectedCAPM = rf + betaMkt * mktPrem

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Fama-French Factor Exposures
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust factor loadings for an Indian stock and compare expected returns
        under CAPM, FF3, and FF5 models.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-5">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Market beta: {betaMkt.toFixed(2)}</span>
          <input type="range" min="0" max="2" step="0.05" value={betaMkt}
            onChange={e => setBetaMkt(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>SMB beta: {betaSMB.toFixed(2)}</span>
          <input type="range" min="-1" max="1.5" step="0.05" value={betaSMB}
            onChange={e => setBetaSMB(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>HML beta: {betaHML.toFixed(2)}</span>
          <input type="range" min="-1" max="1.5" step="0.05" value={betaHML}
            onChange={e => setBetaHML(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>RMW beta: {betaRMW.toFixed(2)}</span>
          <input type="range" min="-1" max="1.5" step="0.05" value={betaRMW}
            onChange={e => setBetaRMW(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>CMA beta: {betaCMA.toFixed(2)}</span>
          <input type="range" min="-1" max="1.5" step="0.05" value={betaCMA}
            onChange={e => setBetaCMA(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-blue-50 p-3 text-center dark:bg-blue-900/30">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">CAPM Expected</p>
          <p className="text-lg font-bold text-blue-800 dark:text-blue-200">{expectedCAPM.toFixed(1)}%</p>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 text-center dark:bg-purple-900/30">
          <p className="text-xs font-semibold text-purple-700 dark:text-purple-300">FF3 Expected</p>
          <p className="text-lg font-bold text-purple-800 dark:text-purple-200">{expectedFF3.toFixed(1)}%</p>
        </div>
        <div className="rounded-lg bg-green-50 p-3 text-center dark:bg-green-900/30">
          <p className="text-xs font-semibold text-green-700 dark:text-green-300">FF5 Expected</p>
          <p className="text-lg font-bold text-green-800 dark:text-green-200">{expectedFF5.toFixed(1)}%</p>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
        Size/value tilts add <InlineMath math={`${(expectedFF3 - expectedCAPM).toFixed(1)}\\%`} /> to CAPM;
        profitability/investment add <InlineMath math={`${(expectedFF5 - expectedFF3).toFixed(1)}\\%`} /> more.
      </p>
    </div>
  )
}

export default function FamaFrench() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Fama-French Factor Models
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The Fama-French models extend CAPM by adding empirically motivated factors that
        explain the cross-section of stock returns. The 3-factor model (1993) added size
        and value; the 5-factor model (2015) added profitability and investment. These
        factors have been validated on Indian market data and form the backbone of
        systematic equity strategies on NSE.
      </p>

      <DefinitionBlock
        title="Fama-French Three-Factor Model"
        label="Definition 1.3"
        definition="The FF3 model explains stock returns using three factors: the market excess return (MKT), a size factor (SMB: Small Minus Big), and a value factor (HML: High Minus Low book-to-market). On NSE, small-cap stocks have historically outperformed large-caps, and value stocks have outperformed growth stocks."
        notation="R_i - R_f = \alpha_i + \beta_i^{MKT}(R_m - R_f) + \beta_i^{SMB} \cdot SMB + \beta_i^{HML} \cdot HML + \epsilon_i"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Factor Construction
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The factors are long-short portfolios constructed by double-sorting stocks:
      </p>

      <BlockMath math="\text{SMB} = \frac{1}{3}(\text{S/L} + \text{S/M} + \text{S/H}) - \frac{1}{3}(\text{B/L} + \text{B/M} + \text{B/H})" />
      <BlockMath math="\text{HML} = \frac{1}{2}(\text{S/H} + \text{B/H}) - \frac{1}{2}(\text{S/L} + \text{B/L})" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For the Indian market, stocks are sorted using NSE market capitalization (size) and
        book-to-market ratios from annual reports filed with SEBI. The breakpoints use the
        median for size and 30th/70th percentiles for book-to-market.
      </p>

      <DefinitionBlock
        title="Fama-French Five-Factor Model"
        label="Definition 1.4"
        definition="The FF5 model adds profitability (RMW: Robust Minus Weak operating profitability) and investment (CMA: Conservative Minus Aggressive asset growth). These factors capture the tendency of profitable, conservatively investing firms to outperform. On NSE, RMW has been particularly strong for FMCG and IT sectors."
        notation="R_i - R_f = \alpha_i + \beta_i^{MKT} \cdot MKT + \beta_i^{SMB} \cdot SMB + \beta_i^{HML} \cdot HML + \beta_i^{RMW} \cdot RMW + \beta_i^{CMA} \cdot CMA + \epsilon_i"
      />

      <TheoremBlock
        title="Fama-French Factor Premia in India"
        label="Theorem 1.2"
        statement="Empirical studies on Indian equity markets (Agarwalla et al., 2013; IIM Ahmedabad Factor Library) confirm significant factor premia on NSE. The size premium is larger in India than in the US, while the value premium has been time-varying."
        formula="\text{Indian Factor Premia (annualized, 2000--2024):} \quad SMB \approx 5\text{--}8\%, \quad HML \approx 3\text{--}6\%, \quad RMW \approx 4\text{--}7\%"
        proof="Using the IIM Ahmedabad Indian Fama-French factor data (constructed following the original methodology on BSE/NSE listed stocks with accounting data from CMIE Prowess), monthly SMB returns average 0.5-0.7% with t-statistics of 2.5-3.5. HML averages 0.3-0.5% monthly. These premia are statistically significant and economically meaningful, though they vary across sub-periods. The size premium was strongest in 2003-2007 (India bull market) and weakest during 2018-2020 (mid-cap underperformance)."
      />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Factor</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Long</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Short</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">India Premium</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">NSE Example</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">SMB (Size)</td>
              <td className="px-4 py-2">Small-cap</td>
              <td className="px-4 py-2">Large-cap</td>
              <td className="px-4 py-2">~6% p.a.</td>
              <td className="px-4 py-2">Nifty Smallcap vs Nifty 50</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">HML (Value)</td>
              <td className="px-4 py-2">High B/M</td>
              <td className="px-4 py-2">Low B/M</td>
              <td className="px-4 py-2">~4% p.a.</td>
              <td className="px-4 py-2">PSU banks vs growth IT</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">RMW (Profit)</td>
              <td className="px-4 py-2">High ROE</td>
              <td className="px-4 py-2">Low ROE</td>
              <td className="px-4 py-2">~5% p.a.</td>
              <td className="px-4 py-2">HUL, Asian Paints vs loss-makers</td>
            </tr>
            <tr>
              <td className="px-4 py-2">CMA (Invest)</td>
              <td className="px-4 py-2">Low capex</td>
              <td className="px-4 py-2">High capex</td>
              <td className="px-4 py-2">~3% p.a.</td>
              <td className="px-4 py-2">Stable cos vs aggressive expanders</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveFF />

      <PythonCode
        title="fama_french_india.py"
        runnable
        code={`import numpy as np
import pandas as pd
from numpy.linalg import lstsq

# Simulated Indian Fama-French factor returns (monthly, 10 years)
np.random.seed(42)
n_months = 120

# Factor returns (calibrated to Indian market estimates)
mkt_rf = np.random.normal(0.008, 0.055, n_months)   # Market excess
smb = np.random.normal(0.005, 0.035, n_months)       # Size premium
hml = np.random.normal(0.004, 0.030, n_months)       # Value premium
rmw = np.random.normal(0.004, 0.025, n_months)       # Profitability
cma = np.random.normal(0.002, 0.020, n_months)       # Investment
mom = np.random.normal(0.006, 0.040, n_months)       # Momentum (Carhart)

# Simulate 5 Indian stocks with known loadings
stocks = {
    'Reliance':    {'mkt': 1.1, 'smb': -0.3, 'hml': 0.2, 'rmw': 0.4, 'cma': -0.1, 'alpha': 0.001},
    'HDFC_Bank':   {'mkt': 1.2, 'smb': -0.4, 'hml': 0.3, 'rmw': 0.5, 'cma': 0.2,  'alpha': 0.002},
    'TCS':         {'mkt': 0.7, 'smb': -0.5, 'hml': -0.3,'rmw': 0.6, 'cma': 0.3,  'alpha': 0.003},
    'Tata_Motors': {'mkt': 1.5, 'smb': 0.2,  'hml': 0.5, 'rmw': -0.2,'cma': -0.3, 'alpha': 0.000},
    'SmallCap_Co': {'mkt': 1.0, 'smb': 0.8,  'hml': 0.4, 'rmw': -0.1,'cma': -0.2, 'alpha': 0.004},
}

print("=== Fama-French Factor Analysis (Indian Stocks) ===\\n")

for name, loadings in stocks.items():
    # Generate returns
    returns = (loadings['alpha'] + loadings['mkt'] * mkt_rf +
               loadings['smb'] * smb + loadings['hml'] * hml +
               loadings['rmw'] * rmw + loadings['cma'] * cma +
               np.random.normal(0, 0.025, n_months))

    # --- CAPM ---
    X1 = np.column_stack([np.ones(n_months), mkt_rf])
    c1, _, _, _ = lstsq(X1, returns, rcond=None)
    r2_1 = 1 - np.sum((returns - X1 @ c1)**2) / np.sum((returns - returns.mean())**2)

    # --- FF3 ---
    X3 = np.column_stack([np.ones(n_months), mkt_rf, smb, hml])
    c3, _, _, _ = lstsq(X3, returns, rcond=None)
    r2_3 = 1 - np.sum((returns - X3 @ c3)**2) / np.sum((returns - returns.mean())**2)

    # --- FF5 ---
    X5 = np.column_stack([np.ones(n_months), mkt_rf, smb, hml, rmw, cma])
    c5, _, _, _ = lstsq(X5, returns, rcond=None)
    r2_5 = 1 - np.sum((returns - X5 @ c5)**2) / np.sum((returns - returns.mean())**2)

    print(f"--- {name} ---")
    print(f"  CAPM:  alpha={c1[0]*1200:+.1f}bps/yr, beta={c1[1]:.2f}, R²={r2_1:.3f}")
    print(f"  FF3:   alpha={c3[0]*1200:+.1f}bps/yr, betas=[M:{c3[1]:.2f}, SMB:{c3[2]:.2f}, HML:{c3[3]:.2f}], R²={r2_3:.3f}")
    print(f"  FF5:   alpha={c5[0]*1200:+.1f}bps/yr, R²={r2_5:.3f}")
    print(f"  R² improvement CAPM->FF5: {(r2_5-r2_1)*100:+.1f}pp\\n")

# Factor summary statistics
factors = {'MKT-RF': mkt_rf, 'SMB': smb, 'HML': hml, 'RMW': rmw, 'CMA': cma}
print("--- Factor Summary Statistics (Monthly) ---")
print(f"{'Factor':<8} {'Mean':>8} {'Std':>8} {'t-stat':>8} {'Ann.Ret':>8}")
for fname, fdata in factors.items():
    t_stat = fdata.mean() / (fdata.std() / np.sqrt(n_months))
    print(f"{fname:<8} {fdata.mean()*100:>7.2f}% {fdata.std()*100:>7.2f}% {t_stat:>7.2f} {fdata.mean()*12*100:>7.1f}%")`}
      />

      <ExampleBlock
        title="FF3 Regression for an Indian Mutual Fund"
        difficulty="intermediate"
        problem="An Indian small-cap value fund has FF3 loadings: beta_MKT = 1.0, beta_SMB = 0.6, beta_HML = 0.4, with monthly alpha of 30 bps. If factor premia are MKT=8%, SMB=6%, HML=4% annually, what is the fund's expected annual return? (Rf = 6.5%)"
        solution={[
          {
            step: 'Apply FF3 model',
            formula: 'E[R] = 6.5\\% + 1.0(8\\%) + 0.6(6\\%) + 0.4(4\\%) + 12(0.30\\%) = 6.5 + 8.0 + 3.6 + 1.6 + 3.6 = 23.3\\%',
            explanation: 'The fund earns from market exposure (8%), size tilt (3.6%), value tilt (1.6%), and genuine alpha (3.6%).',
          },
          {
            step: 'Decompose the return',
            formula: '\\text{Factor return} = 8.0 + 3.6 + 1.6 = 13.2\\%, \\quad \\alpha = 3.6\\%',
            explanation: 'Of the 16.8% excess return over risk-free, 13.2% is factor exposure (systematic) and only 3.6% is genuine alpha. A smart beta ETF could replicate the factor portion at much lower cost.',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Carhart Four-Factor Model: Adding Momentum
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Carhart (1997) extended the FF3 model with a momentum factor (WML: Winners Minus
        Losers), which is particularly strong on NSE. The 12-1 month momentum factor buys
        past winners (top decile by 12-month return, excluding the most recent month) and
        sells past losers (bottom decile):
      </p>

      <BlockMath math="R_i - R_f = \alpha_i + \beta_i^{MKT} \cdot MKT + \beta_i^{SMB} \cdot SMB + \beta_i^{HML} \cdot HML + \beta_i^{WML} \cdot WML + \epsilon_i" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        On Indian data (2000-2024), the momentum factor has earned approximately 8-12%
        annually, making it the most profitable factor on NSE. However, it is also the
        most volatile and prone to crashes (e.g., March 2020 reversal). The Carhart model
        significantly reduces alpha for momentum-tilted Indian mutual funds.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Data Sources for Indian Factor Research
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Source</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Data</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Frequency</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Access</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">IIM Ahmedabad</td>
              <td className="px-4 py-2">Indian FF factors</td>
              <td className="px-4 py-2">Monthly</td>
              <td className="px-4 py-2">Free (website)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">CMIE Prowess</td>
              <td className="px-4 py-2">Fundamentals + prices</td>
              <td className="px-4 py-2">Quarterly/Daily</td>
              <td className="px-4 py-2">Subscription</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">NSE India</td>
              <td className="px-4 py-2">Historical prices, indices</td>
              <td className="px-4 py-2">Daily</td>
              <td className="px-4 py-2">Free (website/API)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Zerodha Kite API</td>
              <td className="px-4 py-2">OHLCV + instruments</td>
              <td className="px-4 py-2">Minute/Daily</td>
              <td className="px-4 py-2">INR 2000/month</td>
            </tr>
            <tr>
              <td className="px-4 py-2">BSE India</td>
              <td className="px-4 py-2">Corporate actions, filings</td>
              <td className="px-4 py-2">Daily</td>
              <td className="px-4 py-2">Free (website)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          The Fama-French models decompose stock returns into systematic factor exposures.
          For Indian markets, the IIM Ahmedabad factor library provides monthly SMB, HML, RMW,
          and CMA returns for NSE/BSE stocks. The Carhart four-factor model adds momentum,
          which is the strongest single factor on NSE. Before claiming alpha, always check
          whether your returns are explained by known factor tilts. A small-cap value fund with
          high SMB and HML loadings may simply be harvesting factor premia rather than
          generating genuine alpha. Use CMIE Prowess for fundamentals and the IIM Ahmedabad
          library for pre-computed Indian factor returns.
        </p>
      </NoteBlock>
    </div>
  )
}
