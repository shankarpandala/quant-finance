import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveStyleTilts() {
  const [valueTilt, setValueTilt] = useState(30)
  const [momentumTilt, setMomentumTilt] = useState(25)
  const [qualityTilt, setQualityTilt] = useState(25)
  const [lowVolTilt, setLowVolTilt] = useState(20)

  const total = valueTilt + momentumTilt + qualityTilt + lowVolTilt
  const norm = total / 100
  const vW = valueTilt / total; const mW = momentumTilt / total
  const qW = qualityTilt / total; const lW = lowVolTilt / total

  const expectedReturn = vW * 14 + mW * 16 + qW * 13 + lW * 11
  const expectedVol = Math.sqrt(
    vW ** 2 * 20 ** 2 + mW ** 2 * 22 ** 2 + qW ** 2 * 16 ** 2 + lW ** 2 * 14 ** 2 +
    2 * vW * mW * 20 * 22 * (-0.3) + 2 * vW * qW * 20 * 16 * 0.2 +
    2 * mW * qW * 22 * 16 * 0.1 + 2 * vW * lW * 20 * 14 * 0.4 +
    2 * mW * lW * 22 * 14 * (-0.2) + 2 * qW * lW * 16 * 14 * 0.5
  )
  const sharpe = (expectedReturn - 6.5) / expectedVol

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Multi-Factor Style Portfolio
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Build a multi-factor portfolio by adjusting style tilts for NSE.
        Weights auto-normalize to 100%.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Value: {(vW * 100).toFixed(0)}%</span>
          <input type="range" min="0" max="100" step="5" value={valueTilt}
            onChange={e => setValueTilt(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-blue-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Momentum: {(mW * 100).toFixed(0)}%</span>
          <input type="range" min="0" max="100" step="5" value={momentumTilt}
            onChange={e => setMomentumTilt(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-purple-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Quality: {(qW * 100).toFixed(0)}%</span>
          <input type="range" min="0" max="100" step="5" value={qualityTilt}
            onChange={e => setQualityTilt(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-green-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Low Vol: {(lW * 100).toFixed(0)}%</span>
          <input type="range" min="0" max="100" step="5" value={lowVolTilt}
            onChange={e => setLowVolTilt(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-amber-500" />
        </label>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-blue-50 p-3 text-center dark:bg-blue-900/30">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">Expected Return</p>
          <p className="text-lg font-bold text-blue-800 dark:text-blue-200">{expectedReturn.toFixed(1)}%</p>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 text-center dark:bg-purple-900/30">
          <p className="text-xs font-semibold text-purple-700 dark:text-purple-300">Expected Vol</p>
          <p className="text-lg font-bold text-purple-800 dark:text-purple-200">{expectedVol.toFixed(1)}%</p>
        </div>
        <div className="rounded-lg bg-green-50 p-3 text-center dark:bg-green-900/30">
          <p className="text-xs font-semibold text-green-700 dark:text-green-300">Sharpe Ratio</p>
          <p className="text-lg font-bold text-green-800 dark:text-green-200">{sharpe.toFixed(2)}</p>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
        Value-Momentum correlation: -0.30 (diversifying!) |
        Quality-LowVol correlation: 0.50 (overlapping)
      </p>
    </div>
  )
}

export default function StyleFactors() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Style Factors for Indian Equities
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Style factors are the systematic, repeatable characteristics that explain the
        cross-section of stock returns on NSE and BSE. Value, momentum, quality, low
        volatility, and size are the canonical style factors. Each captures a different
        behavioral or structural premium. Understanding these factors is essential for
        building multi-factor strategies and smart-beta products for the Indian market.
      </p>

      <DefinitionBlock
        title="Value Factor"
        label="Definition 3.2"
        definition="The value factor captures the premium earned by stocks trading at low prices relative to fundamentals. Common metrics include price-to-book (P/B), price-to-earnings (P/E), earnings yield, and dividend yield. On NSE, value has been particularly strong in PSU banks and cyclical sectors."
        notation="\text{Value Score}_i = z\!\left(\frac{1}{\text{P/B}_i}\right) \quad \text{or} \quad z\!\left(\frac{E_i}{P_i}\right)"
      />

      <DefinitionBlock
        title="Momentum Factor"
        label="Definition 3.3"
        definition="The momentum factor captures the tendency of past winners to continue outperforming and past losers to continue underperforming. The standard construction uses 12-month returns excluding the most recent month (12-1 momentum) to avoid short-term reversal effects."
        notation="\text{Mom}_{i,t} = \frac{P_{i,t-1}}{P_{i,t-12}} - 1 \quad \text{(skip most recent month)}"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Factor Definitions for Indian Markets
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Factor</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Metric</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">India Premium</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Correlation</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">NSE ETF</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Value</td>
              <td className="px-4 py-2">P/B, P/E, Div Yield</td>
              <td className="px-4 py-2">~4-6% p.a.</td>
              <td className="px-4 py-2">-0.30 with Mom</td>
              <td className="px-4 py-2">Nifty 50 Value 20</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Momentum</td>
              <td className="px-4 py-2">12-1 month return</td>
              <td className="px-4 py-2">~6-10% p.a.</td>
              <td className="px-4 py-2">-0.30 with Value</td>
              <td className="px-4 py-2">Nifty 200 Momentum 30</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Quality</td>
              <td className="px-4 py-2">ROE, debt/equity, margins</td>
              <td className="px-4 py-2">~4-7% p.a.</td>
              <td className="px-4 py-2">0.20 with Value</td>
              <td className="px-4 py-2">Nifty 200 Quality 30</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Low Volatility</td>
              <td className="px-4 py-2">252-day realized vol</td>
              <td className="px-4 py-2">~3-5% p.a.</td>
              <td className="px-4 py-2">0.50 with Quality</td>
              <td className="px-4 py-2">Nifty 100 Low Vol 30</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Size</td>
              <td className="px-4 py-2">Market cap (inverse)</td>
              <td className="px-4 py-2">~5-8% p.a.</td>
              <td className="px-4 py-2">0.40 with Value</td>
              <td className="px-4 py-2">Nifty Smallcap 250</td>
            </tr>
          </tbody>
        </table>
      </div>

      <TheoremBlock
        title="Value-Momentum Negative Correlation"
        label="Theorem 3.2"
        statement="Value and momentum factors are negatively correlated (rho ~ -0.3 on NSE), making them natural diversifiers in a multi-factor portfolio. This negative correlation arises because value stocks tend to be past losers (low momentum) while momentum stocks tend to be expensive (low value)."
        formula="\text{Corr}(\text{HML}, \text{WML}) \approx -0.3 \quad \text{(NSE, 2005--2024)}"
        proof="Mechanically, a stock that has fallen in price (negative momentum) becomes cheaper (higher book-to-market, i.e., value). Conversely, a stock that has risen (positive momentum) becomes expensive (lower book-to-market). This creates an inherent negative correlation between the two style factors. Asness et al. (2013) document this 'value and momentum everywhere' across countries including India. The portfolio diversification benefit is: \sigma_{VM} = \sqrt{w_V^2\sigma_V^2 + w_M^2\sigma_M^2 + 2w_V w_M \sigma_V \sigma_M \rho} < w_V\sigma_V + w_M\sigma_M."
      />

      <InteractiveStyleTilts />

      <PythonCode
        title="style_factors_nse.py"
        runnable
        code={`import numpy as np
import pandas as pd
from scipy.stats import spearmanr

# Simulate style factor analysis on NSE 500
np.random.seed(42)
n_stocks = 500
n_months = 120  # 10 years

# Generate factor scores (cross-sectionally)
def generate_factor_data():
    # Correlated factor scores
    mean = [0, 0, 0, 0]
    # Value-Momentum negatively correlated, Quality-LowVol positively
    cov = [[1.0, -0.3, 0.2, 0.3],
           [-0.3, 1.0, 0.1, -0.2],
           [0.2, 0.1, 1.0, 0.5],
           [0.3, -0.2, 0.5, 1.0]]
    scores = np.random.multivariate_normal(mean, cov, n_stocks)
    return scores  # columns: Value, Momentum, Quality, LowVol

# True factor premia (monthly)
factor_premia = {'Value': 0.004, 'Momentum': 0.007, 'Quality': 0.005, 'LowVol': 0.003}
factor_names = list(factor_premia.keys())

# Simulate returns and compute factor performance
monthly_returns = {f: [] for f in factor_names}
monthly_ics = {f: [] for f in factor_names}

for t in range(n_months):
    scores = generate_factor_data()

    # Stock returns = sum of factor contributions + noise
    noise = np.random.normal(0, 0.06, n_stocks)
    stock_returns = sum(
        factor_premia[f] * scores[:, i] for i, f in enumerate(factor_names)
    ) + noise

    for i, f in enumerate(factor_names):
        # Quintile long-short return
        q = pd.qcut(scores[:, i], 5, labels=False)
        ls = stock_returns[q == 4].mean() - stock_returns[q == 0].mean()
        monthly_returns[f].append(ls)

        # IC
        ic, _ = spearmanr(scores[:, i], stock_returns)
        monthly_ics[f].append(ic)

# --- Factor Performance Summary ---
print("=== Style Factor Analysis: NSE 500 (10 Years) ===\\n")
print(f"{'Factor':<12} {'Ann.Ret':>8} {'Ann.Vol':>8} {'Sharpe':>8} {'Mean IC':>8} {'ICIR':>8}")
print("-" * 58)
for f in factor_names:
    rets = np.array(monthly_returns[f])
    ics = np.array(monthly_ics[f])
    ann_ret = np.mean(rets) * 12 * 100
    ann_vol = np.std(rets) * np.sqrt(12) * 100
    sharpe = ann_ret / ann_vol if ann_vol > 0 else 0
    print(f"{f:<12} {ann_ret:>7.1f}% {ann_vol:>7.1f}% {sharpe:>8.2f} {ics.mean():>8.4f} {ics.mean()/ics.std():>8.3f}")

# --- Factor Correlation Matrix ---
ret_matrix = np.column_stack([monthly_returns[f] for f in factor_names])
corr = np.corrcoef(ret_matrix.T)
print(f"\\n--- Factor Return Correlations ---")
print(f"{'':>12}", end='')
for f in factor_names:
    print(f"{f:>10}", end='')
print()
for i, f1 in enumerate(factor_names):
    print(f"{f1:<12}", end='')
    for j, f2 in enumerate(factor_names):
        print(f"{corr[i,j]:>10.2f}", end='')
    print()

# --- Multi-Factor Combination ---
equal_weight = ret_matrix.mean(axis=1)
ann_mf = np.mean(equal_weight) * 12 * 100
vol_mf = np.std(equal_weight) * np.sqrt(12) * 100
sharpe_mf = ann_mf / vol_mf
print(f"\\n--- Equal-Weight Multi-Factor ---")
print(f"Ann. Return: {ann_mf:.1f}% | Vol: {vol_mf:.1f}% | Sharpe: {sharpe_mf:.2f}")
print(f"Diversification benefit vs best single: Sharpe improved by {(sharpe_mf/max(np.mean(ret_matrix[:,i])*12/(np.std(ret_matrix[:,i])*np.sqrt(12)) for i in range(4))-1)*100:+.0f}%")`}
      />

      <ExampleBlock
        title="Building a Multi-Factor Score for NSE"
        difficulty="intermediate"
        problem="You want to combine Value (z-score of earnings yield), Momentum (z-score of 12-1 return), and Quality (z-score of ROE) into a single score for NSE 500 stocks. The factor correlations are: Value-Mom = -0.3, Value-Quality = 0.2, Mom-Quality = 0.1. How should you weight them?"
        solution={[
          {
            step: 'Equal weight (simple approach)',
            formula: '\\alpha_i = \\frac{1}{3}z_{\\text{val}} + \\frac{1}{3}z_{\\text{mom}} + \\frac{1}{3}z_{\\text{qual}}',
            explanation: 'Equal weighting is a robust starting point. The negative correlation between value and momentum naturally diversifies the combined signal.',
          },
          {
            step: 'Inverse-correlation weighting (optimal)',
            formula: '\\mathbf{w}^* = \\boldsymbol{\\Omega}^{-1} \\mathbf{IC} / (\\mathbf{1}^\\top \\boldsymbol{\\Omega}^{-1} \\mathbf{IC})',
            explanation: 'If ICs are equal, the optimal weights tilt toward factors with lower correlation to others. Momentum gets higher weight because it is negatively correlated with value, providing more diversification.',
          },
          {
            step: 'Practical weights',
            formula: 'w \\approx [30\\%, 40\\%, 30\\%]',
            explanation: 'Momentum gets a slight overweight due to its diversification benefit and historically stronger IC on NSE. Rebalance monthly, sector-neutralize each factor before combining.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Style factors are the building blocks of systematic equity strategies. For Indian
          markets, the "big four" -- Value, Momentum, Quality, and Low Volatility -- have
          robust historical evidence on NSE. The key insight is that <strong>combining negatively
          correlated factors</strong> (especially value + momentum) dramatically improves the
          Sharpe ratio compared to any single factor. NSE now offers factor-based index ETFs
          (Nifty 200 Momentum 30, Nifty 100 Low Vol 30) for cost-efficient factor exposure.
        </p>
      </NoteBlock>
    </div>
  )
}
