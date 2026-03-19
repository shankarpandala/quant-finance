import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveViz() {
  const [equityPct, setEquityPct] = useState(60)
  const [bondPct, setBondPct] = useState(25)
  const [riskAversion, setRiskAversion] = useState(2.0)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive Visualization
      </h3>
      <div className="mb-4 grid grid-cols-3 gap-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Equity %: {equityPct}</span>
          <input type="range" min="10" max="90" step="5" value={equityPct}
            onChange={e => setEquityPct(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Bond %: {bondPct}</span>
          <input type="range" min="5" max="70" step="5" value={bondPct}
            onChange={e => setBondPct(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Risk Aversion: {riskAversion}</span>
          <input type="range" min="0.5" max="5" step="0.5" value={riskAversion}
            onChange={e => setRiskAversion(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>
      <div className="grid grid-cols-3 gap-3 text-center text-xs">
        <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30">
          <div className="text-gray-500 dark:text-gray-400">Expected Return</div>
          <div className="text-lg font-bold text-indigo-600">{(equityPct * 0.12 + bondPct * 0.07 + (100-equityPct-bondPct) * 0.08).toFixed(2) + '%'}</div>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30">
          <div className="text-gray-500 dark:text-gray-400">Portfolio Vol</div>
          <div className="text-lg font-bold text-amber-600">{(equityPct * 0.22 * 0.01 * 100).toFixed(1) + '%'}</div>
        </div>
        <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/30">
          <div className="text-gray-500 dark:text-gray-400">Sharpe Ratio</div>
          <div className="text-lg font-bold text-green-600">{((equityPct * 0.12 + bondPct * 0.07 + (100-equityPct-bondPct) * 0.08 - 6.5) / (equityPct * 0.22 * 0.01 * 100 + 0.1)).toFixed(3)}</div>
        </div>
      </div>
    </div>
  )
}

export default function AlternativesIntegration() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        REITs, InvITs, and Gold in Indian Portfolios
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Alternative assets including REITs (Real Estate Investment Trusts), InvITs (Infrastructure Investment Trusts), and gold provide diversification benefits for Indian portfolios. SEBI-regulated REITs like Embassy Office Parks and Mindspace launched on NSE provide institutional-grade real estate exposure with 6-8% yields. Sovereign Gold Bonds (SGBs) offer gold exposure with an additional 2.5% annual interest.
      </p>

      <DefinitionBlock
        title="Asset Allocation Framework"
        label="Definition 10.11"
        definition="Alternative assets are non-traditional investments that provide returns uncorrelated with equity and bond markets."
        notation="REIT = Real Estate Investment Trust, InvIT = Infrastructure Investment Trust"
      />

      <BlockMath math="\sigma_p^2 = w_{\text{eq}}^2\sigma_{\text{eq}}^2 + w_{\text{alt}}^2\sigma_{\text{alt}}^2 + 2w_{\text{eq}}w_{\text{alt}}\rho\sigma_{\text{eq}}\sigma_{\text{alt}}" />

      <TheoremBlock
        title="Diversification Benefit of Alternatives"
        label="Theorem 10.10"
        statement="Adding uncorrelated alternatives reduces portfolio variance without reducing expected return."
        proof="By the variance decomposition of portfolio returns."
      />

      <InteractiveViz />

      

      <PythonCode
        title="alternativesintegration.py"
        runnable
        code={`import numpy as np
np.random.seed(42)

assets = ['Nifty 50', 'G-Sec 10Y', 'Gold SGB', 'REIT', 'Nifty MidCap'] if 'AlternativesIntegration' != 'CurrencyHedging' else ['Nifty 50', 'S&P 500 (USD)', 'S&P 500 (INR)']
n = len(assets)

if 'AlternativesIntegration' == 'AssetAllocation':
    mu = np.array([0.12, 0.07, 0.08, 0.09, 0.15])
    vols = np.array([0.22, 0.06, 0.15, 0.12, 0.28])
    corr = np.eye(n)
    corr[0,1] = corr[1,0] = -0.10
    corr[0,2] = corr[2,0] = 0.08
    corr[0,3] = corr[3,0] = 0.35
    corr[0,4] = corr[4,0] = 0.85
    Sigma = np.outer(vols, vols) * corr

    # Different risk profiles
    profiles = {
        'Conservative': np.array([0.20, 0.50, 0.15, 0.10, 0.05]),
        'Moderate': np.array([0.40, 0.30, 0.10, 0.10, 0.10]),
        'Aggressive': np.array([0.55, 0.15, 0.05, 0.05, 0.20]),
    }

    print("=== Strategic Asset Allocation (Indian Multi-Asset) ===")
    for name, w in profiles.items():
        ret = mu @ w
        vol = np.sqrt(w @ Sigma @ w)
        sr = (ret - 0.065) / vol
        print(f"\n{name:15s}: Ret={ret:.2%}, Vol={vol:.2%}, Sharpe={sr:.3f}")
        for a, wi in zip(assets, w):
            print(f"  {a:15s}: {wi:.2%}")
elif 'AlternativesIntegration' == 'CurrencyHedging':
    # USDINR forward premium analysis
    r_inr = 0.065  # Indian rate
    r_usd = 0.05   # US rate
    spot = 83.0  # USDINR spot
    fwd_premium = (r_inr - r_usd) * 100  # annualized bps
    
    horizons = [1, 3, 6, 12]
    print("=== INR/USD Hedging Cost Analysis ===")
    print(f"Spot USDINR: {spot}")
    print(f"India rate: {r_inr:.1%}, US rate: {r_usd:.1%}")
    for h in horizons:
        fwd = spot * (1 + r_inr * h/12) / (1 + r_usd * h/12)
        cost = (fwd/spot - 1) * 12/h * 100
        print(f"  {h:2d}M Forward: {fwd:.2f}, Cost: {cost:.2f}% ann")
else:
    # Alternative assets analysis
    returns_data = {
        'Nifty 50': 0.12, 'Embassy REIT': 0.09, 'Gold SGB': 0.08,
        'IndiGrid InvIT': 0.10, 'PPF': 0.071
    }
    vols_data = {
        'Nifty 50': 0.22, 'Embassy REIT': 0.12, 'Gold SGB': 0.15,
        'IndiGrid InvIT': 0.10, 'PPF': 0.0
    }
    print("=== Alternative Assets for Indian Portfolios ===")
    for asset, ret in returns_data.items():
        vol = vols_data[asset]
        sr = (ret - 0.065) / vol if vol > 0 else float('inf')
        print(f"  {asset:20s}: Ret={ret:.2%}, Vol={vol:.2%}, SR={sr:.3f}")`}
      />

      <ExampleBlock
        title="REIT Allocation for Indian Portfolio"
        difficulty="beginner"
        problem="Embassy Office Parks REIT yields 7% with 12% volatility. How much should a moderate investor allocate?"
        solution={[
          {
            step: 'Risk-adjusted return',
            formula: '\text{Sharpe} = (0.07 + 0.02 - 0.065) / 0.12 = 0.21',
            explanation: 'Including 2% expected capital appreciation. Modest Sharpe.',
          },
          {
            step: 'Optimal allocation',
            formula: 'w_{\text{REIT}} \approx 5\text{-}10\%',
            explanation: 'Limited allocation due to lower Sharpe, illiquidity premium, and concentration risk.',
          },
          {
            step: 'Tax consideration',
            formula: '\text{REIT dividends taxed at slab rate}',
            explanation: 'Unlike equity, REIT distributions are taxed as income, reducing after-tax return.',
          }
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>REITs, InvITs, and gold (via SGBs) are valuable additions to Indian portfolios, providing diversification and income. Typical allocation: 5-10% REITs, 5-10% gold (SGBs), with the remainder in equity and bonds.</p>
      </NoteBlock>
    </div>
  )
}
