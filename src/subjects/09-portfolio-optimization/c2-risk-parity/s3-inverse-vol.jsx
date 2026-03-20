import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveInverseVol() {
  const [niftyVol, setNiftyVol] = useState(22)
  const [bondVol, setBondVol] = useState(6)
  const [goldVol, setGoldVol] = useState(15)

  const vols = [niftyVol, bondVol, goldVol]
  const invVols = vols.map(v => 1 / v)
  const sumInv = invVols.reduce((a, b) => a + b, 0)
  const weights = invVols.map(iv => iv / sumInv)
  const labels = ['Nifty 50', 'G-Sec 10Y', 'Gold (MCX)']
  const colors = ['#6366f1', '#22c55e', '#f59e0b']

  const diversificationRatio = (weights.reduce((s, w, i) => s + w * vols[i], 0)) /
    Math.sqrt(weights.reduce((s, wi, i) =>
      s + weights.reduce((s2, wj, j) =>
        s2 + wi * wj * vols[i] * vols[j] * (i === j ? 1 : 0.2), 0), 0))

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Inverse Volatility Weighting
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust asset volatilities to see how inverse-vol weights respond.
      </p>

      <div className="mb-4 grid grid-cols-3 gap-3">
        {[['Nifty Vol (%)', niftyVol, setNiftyVol], ['Bond Vol (%)', bondVol, setBondVol], ['Gold Vol (%)', goldVol, setGoldVol]].map(([label, val, setter], i) => (
          <label key={i} className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
            <span>{label}: {val}%</span>
            <input type="range" min="2" max="40" step="1" value={val}
              onChange={e => setter(parseInt(e.target.value))}
              className="h-2 w-full cursor-pointer accent-indigo-500" />
          </label>
        ))}
      </div>

      <svg viewBox="0 0 400 160" className="w-full max-w-md mx-auto block">
        {labels.map((label, i) => {
          const barW = weights[i] * 300
          const y = 20 + i * 45
          return (
            <g key={i}>
              <rect x={60} y={y} width={barW} height={28} fill={colors[i]} opacity="0.7" rx="4" />
              <text x={55} y={y + 18} textAnchor="end" className="text-[10px] fill-gray-600">{label}</text>
              <text x={65 + barW} y={y + 18} className="text-[10px] font-bold" fill={colors[i]}>
                {(weights[i] * 100).toFixed(1)}%
              </text>
            </g>
          )
        })}
        <text x={200} y={155} textAnchor="middle" className="text-[10px] fill-gray-500">
          Diversification Ratio: {diversificationRatio.toFixed(3)}
        </text>
      </svg>
    </div>
  )
}

export default function InverseVol() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Inverse Volatility and Maximum Diversification
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Beyond ERC and HRP, two other risk-based portfolio construction methods are widely used:
        inverse volatility weighting and maximum diversification. Both avoid return estimation
        and focus purely on risk characteristics, making them robust choices for Indian market
        practitioners who distrust expected return forecasts.
      </p>

      <DefinitionBlock
        title="Inverse Volatility Portfolio"
        label="Definition 9.7"
        definition="The inverse volatility (IV) portfolio assigns weights inversely proportional to each asset's standalone volatility: w_i = (1/σ_i) / Σⱼ(1/σⱼ). This is the simplest risk-based allocation and ignores correlations entirely."
        notation="σ_i = annualized volatility of asset i"
      />

      <BlockMath math="w_i^{\text{IV}} = \frac{1/\sigma_i}{\sum_{j=1}^{n} 1/\sigma_j}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Inverse volatility is equivalent to the ERC portfolio when all pairwise correlations are
        equal. Despite its simplicity, it performs surprisingly well in practice because it
        naturally tilts away from volatile assets, acting as an implicit risk management mechanism.
      </p>

      <InteractiveInverseVol />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Maximum Diversification Portfolio
      </h3>

      <DefinitionBlock
        title="Diversification Ratio"
        label="Definition 9.8"
        definition="The diversification ratio (DR) of a portfolio is the ratio of the weighted average of individual asset volatilities to the portfolio volatility: DR(w) = (w'σ) / √(w'Σw), where σ is the vector of individual volatilities. DR ≥ 1, with equality only when all assets are perfectly correlated."
        notation="DR = diversification ratio, σ = vector of volatilities"
      />

      <BlockMath math="\text{DR}(\mathbf{w}) = \frac{\sum_{i=1}^{n} w_i \sigma_i}{\sqrt{\mathbf{w}^\top \Sigma \mathbf{w}}} = \frac{\mathbf{w}^\top \boldsymbol{\sigma}}{\sigma_p}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The Maximum Diversification Portfolio (MDP), introduced by Choueifaty and Coignard (2008),
        maximizes this ratio:
      </p>

      <BlockMath math="\max_{\mathbf{w}} \quad \frac{\mathbf{w}^\top \boldsymbol{\sigma}}{\sqrt{\mathbf{w}^\top \Sigma \mathbf{w}}} \quad \text{s.t.} \quad \mathbf{w}^\top \mathbf{1} = 1, \quad \mathbf{w} \geq 0" />

      <TheoremBlock
        title="MDP and Implied Returns"
        label="Theorem 9.6"
        statement="The Maximum Diversification Portfolio is equivalent to the mean-variance tangency portfolio when expected returns are proportional to volatilities: μᵢ = c · σᵢ for some constant c > 0. This is equivalent to assuming all assets have equal Sharpe ratios."
        proof="When μ = c·σ, the tangency portfolio maximizes (w'μ - rf)/σ_p = c·(w'σ)/σ_p - rf/σ_p. Since rf/σ_p does not depend on the direction of w, maximizing this is equivalent to maximizing w'σ/σ_p = DR(w)."
      />

      <PythonCode
        title="mdp_nse_stocks.py"
        runnable
        code={`import numpy as np
import cvxpy as cp

# Indian multi-asset universe
assets = ['Nifty 50', 'Nifty MidCap', 'Nifty SmallCap', 'G-Sec 10Y',
          'Corp Bonds', 'Gold (MCX)', 'Nifty Bank', 'Nifty IT']
n = len(assets)

vols = np.array([0.22, 0.28, 0.32, 0.06, 0.04, 0.15, 0.26, 0.22])
corr = np.array([
    [1.00, 0.85, 0.78, -0.10, 0.05, 0.10, 0.90, 0.55],
    [0.85, 1.00, 0.88, -0.12, 0.02, 0.12, 0.80, 0.50],
    [0.78, 0.88, 1.00, -0.15, 0.00, 0.15, 0.72, 0.45],
    [-0.10, -0.12, -0.15, 1.00, 0.80, 0.15, -0.12, -0.05],
    [0.05, 0.02, 0.00, 0.80, 1.00, 0.10, 0.03, 0.08],
    [0.10, 0.12, 0.15, 0.15, 0.10, 1.00, 0.08, 0.10],
    [0.90, 0.80, 0.72, -0.12, 0.03, 0.08, 1.00, 0.45],
    [0.55, 0.50, 0.45, -0.05, 0.08, 0.10, 0.45, 1.00],
])
Sigma = np.outer(vols, vols) * corr

# === Inverse Volatility Portfolio ===
w_iv = (1 / vols) / np.sum(1 / vols)
vol_iv = np.sqrt(w_iv @ Sigma @ w_iv)
dr_iv = (w_iv @ vols) / vol_iv

# === Maximum Diversification Portfolio ===
# Reformulate: min w'Σw / (w'σ)^2
# Use Cornish trick: let y = w/(w'σ), min y'Σy s.t. y'σ = 1
y = cp.Variable(n)
prob = cp.Problem(
    cp.Minimize(cp.quad_form(y, Sigma)),
    [vols @ y == 1, y >= 0]
)
prob.solve(solver=cp.SCS)
w_mdp = y.value / np.sum(y.value)
vol_mdp = np.sqrt(w_mdp @ Sigma @ w_mdp)
dr_mdp = (w_mdp @ vols) / vol_mdp

# === Equal Weight ===
w_ew = np.ones(n) / n
vol_ew = np.sqrt(w_ew @ Sigma @ w_ew)
dr_ew = (w_ew @ vols) / vol_ew

print("=== Portfolio Comparison (Indian Multi-Asset) ===")
print(f"\\n{'Method':<20} {'Vol':>8} {'DR':>8}")
print("-" * 40)
print(f"{'Equal Weight':<20} {vol_ew:>8.4f} {dr_ew:>8.4f}")
print(f"{'Inverse Vol':<20} {vol_iv:>8.4f} {dr_iv:>8.4f}")
print(f"{'Max Diversification':<20} {vol_mdp:>8.4f} {dr_mdp:>8.4f}")

print(f"\\n=== Maximum Diversification Portfolio Weights ===")
for a, w in sorted(zip(assets, w_mdp), key=lambda x: -x[1]):
    if w > 0.001:
        print(f"  {a:<15}: {w:.4f} ({w:.2%})")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Comparing Risk-Based Methods on Indian Data
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Let us compare all four risk-based methods (IV, ERC, HRP, MDP) on a backtest using NSE
        sector data. The key metrics are out-of-sample volatility, maximum drawdown, and turnover.
      </p>

      <PythonCode
        title="risk_parity_backtest.py"
        runnable
        code={`import numpy as np

np.random.seed(42)
n_assets = 6
T = 252 * 5  # 5 years daily

assets = ['Nifty 50', 'Nifty Bank', 'G-Sec', 'Gold', 'Nifty IT', 'Nifty FMCG']
true_mu = np.array([0.12, 0.14, 0.07, 0.08, 0.13, 0.10]) / 252
true_vols = np.array([0.22, 0.26, 0.06, 0.15, 0.22, 0.15]) / np.sqrt(252)
true_corr = np.array([
    [1.0, 0.85, -0.1, 0.1, 0.55, 0.35],
    [0.85, 1.0, -0.12, 0.08, 0.45, 0.30],
    [-0.1, -0.12, 1.0, 0.15, -0.05, 0.10],
    [0.1, 0.08, 0.15, 1.0, 0.10, 0.08],
    [0.55, 0.45, -0.05, 0.10, 1.0, 0.25],
    [0.35, 0.30, 0.10, 0.08, 0.25, 1.0],
])
true_cov = np.outer(true_vols, true_vols) * true_corr

# Simulate returns
returns = np.random.multivariate_normal(true_mu, true_cov, T)

# Strategy: rebalance monthly using rolling 1-year estimation
lookback = 252
rebal_freq = 21
strategies = {'Equal Weight': [], 'Inverse Vol': [], 'MDP': []}

for t in range(lookback, T, rebal_freq):
    hist = returns[t-lookback:t]
    cov_est = np.cov(hist.T)
    vol_est = np.sqrt(np.diag(cov_est))

    # Equal weight
    w_ew = np.ones(n_assets) / n_assets
    strategies['Equal Weight'].append(w_ew)

    # Inverse vol
    w_iv = (1/vol_est) / np.sum(1/vol_est)
    strategies['Inverse Vol'].append(w_iv)

    # MDP (simplified via correlation structure)
    inv_vol = np.diag(1/vol_est)
    corr_est = inv_vol @ cov_est @ inv_vol
    ones = np.ones(n_assets)
    try:
        corr_inv = np.linalg.inv(corr_est)
        z = corr_inv @ ones
        w_mdp = (z / vol_est) / np.sum(z / vol_est)
        w_mdp = np.maximum(w_mdp, 0)
        w_mdp /= w_mdp.sum()
    except:
        w_mdp = w_iv
    strategies['MDP'].append(w_mdp)

# Compute portfolio returns
for name, weight_list in strategies.items():
    port_rets = []
    for i, w in enumerate(weight_list):
        start = lookback + i * rebal_freq
        end = min(start + rebal_freq, T)
        period_ret = returns[start:end] @ w
        port_rets.extend(period_ret.tolist())

    port_rets = np.array(port_rets)
    ann_ret = np.mean(port_rets) * 252
    ann_vol = np.std(port_rets) * np.sqrt(252)
    sharpe = ann_ret / ann_vol
    cum = np.cumprod(1 + port_rets)
    max_dd = np.min(cum / np.maximum.accumulate(cum) - 1)

    print(f"{name:<15}: Return={ann_ret:.2%}, Vol={ann_vol:.2%}, "
          f"Sharpe={sharpe:.3f}, MaxDD={max_dd:.2%}")`}
      />

      <ExampleBlock
        title="Inverse Volatility for Three Indian Assets"
        difficulty="beginner"
        problem="Compute inverse volatility weights for Nifty 50 ($\\sigma=22\\%$), Indian G-Sec ($\\sigma=6\\%$), and Gold MCX ($\\sigma=15\\%$)."
        solution={[
          {
            step: 'Compute inverse volatilities',
            formula: '1/\\sigma_1 = 1/0.22 = 4.545, \\quad 1/\\sigma_2 = 1/0.06 = 16.667, \\quad 1/\\sigma_3 = 1/0.15 = 6.667',
          },
          {
            step: 'Sum of inverse volatilities',
            formula: '\\sum 1/\\sigma_i = 4.545 + 16.667 + 6.667 = 27.879',
          },
          {
            step: 'Compute weights',
            formula: 'w_{\\text{Nifty}} = 4.545/27.879 = 16.3\\%, \\quad w_{\\text{G-Sec}} = 16.667/27.879 = 59.8\\%, \\quad w_{\\text{Gold}} = 6.667/27.879 = 23.9\\%',
            explanation: 'G-Sec dominates because it has the lowest volatility. This is typical for Indian multi-asset risk parity portfolios.',
          },
        ]}
      />

      <NoteBlock title="Practical Implementation on Zerodha/Kite" type="tip">
        <ul className="space-y-1 list-disc list-inside">
          <li>Use Zerodha Coin for G-Sec exposure via Gilt mutual funds</li>
          <li>Gold exposure via Sovereign Gold Bonds (SGBs) or Gold ETFs on NSE</li>
          <li>Nifty 50 exposure via index ETFs or Nifty BeES</li>
          <li>Rebalance quarterly to minimize STT impact (0.1% on delivery trades)</li>
          <li>Track the diversification ratio to ensure the portfolio remains well-diversified</li>
        </ul>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Inverse volatility is the simplest risk-based allocation and works well as a baseline.
          Maximum diversification takes correlations into account and produces portfolios with the
          highest diversification ratio. For Indian investors, both methods naturally lead to
          significant fixed-income and gold allocations -- a welcome antidote to the common
          home-bias toward equity-heavy portfolios.
        </p>
      </NoteBlock>
    </div>
  )
}
