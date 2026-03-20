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

export default function AssetAllocation() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Strategic and Tactical Asset Allocation for Indian Investors
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Strategic Asset Allocation (SAA) defines the long-term policy portfolio weights across asset classes -- equity, fixed income, gold, real estate -- based on investor objectives and constraints. Tactical Asset Allocation (TAA) makes short-term deviations from SAA based on market views. For Indian investors, the typical SAA framework considers Nifty 50 for equity, G-Secs for bonds, SGBs or Gold ETFs for gold, and REITs for real estate.
      </p>

      <DefinitionBlock
        title="Asset Allocation Framework"
        label="Definition 10.9"
        definition="The SAA/TAA framework separates long-term policy decisions from short-term market views."
        notation="SAA = Strategic, TAA = Tactical"
      />

      <BlockMath math="\mathbf{w}^* = \arg\max_{\mathbf{w}} \left[\mathbf{w}'\boldsymbol{\mu} - \frac{\lambda}{2}\mathbf{w}'\Sigma\mathbf{w}\right]" />

      <TheoremBlock
        title="Mean-Variance with Asset Classes"
        label="Theorem 10.8"
        statement="The optimal SAA maximizes expected utility over asset classes."
        proof="Follows from Markowitz optimization."
      />

      <InteractiveViz />

      

      <PythonCode
        title="assetallocation.py"
        runnable
        code={`import numpy as np
np.random.seed(42)

assets = ['Nifty 50', 'G-Sec 10Y', 'Gold SGB', 'REIT', 'Nifty MidCap'] if 'AssetAllocation' != 'CurrencyHedging' else ['Nifty 50', 'S&P 500 (USD)', 'S&P 500 (INR)']
n = len(assets)

if 'AssetAllocation' == 'AssetAllocation':
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
elif 'AssetAllocation' == 'CurrencyHedging':
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
        title="SAA for Indian Retirement Portfolio"
        difficulty="intermediate"
        problem="Design SAA for a 35-year-old Indian professional. Retirement in 25 years, moderate risk tolerance."
        solution={[
          {
            step: 'Determine risk capacity',
            formula: '\text{Equity \%} \approx 100 - \text{Age} = 100 - 35 = 65\%',
            explanation: 'Standard age-based rule as starting point.',
          },
          {
            step: 'Allocate across asset classes',
            formula: 'w = [0.45, 0.20, 0.10, 0.10, 0.15]',
            explanation: 'Split equity between large-cap (45%) and mid-cap (15%), add bonds, gold, REITs.',
          },
          {
            step: 'Compute expected return',
            formula: '\mu_p = 0.45 \times 0.12 + 0.20 \times 0.07 + 0.10 \times 0.08 + 0.10 \times 0.09 + 0.15 \times 0.15 = 10.85\%',
            explanation: 'Expected CAGR of ~10.85% exceeds typical 8% inflation target.',
          }
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>Multi-asset allocation is the most important investment decision for Indian investors. SAA determines ~90% of long-term returns. TAA adds incremental value through market timing. Alternatives like REITs, InvITs, and SGBs provide diversification and income that pure equity-bond portfolios miss.</p>
      </NoteBlock>
    </div>
  )
}
