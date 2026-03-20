import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveCorrelation() {
  const [regime, setRegime] = useState('normal')
  const pairs = [
    ['Nifty-Gold', 0.08, 0.45],
    ['Nifty-GSec', -0.12, 0.35],
    ['Nifty-BankNifty', 0.85, 0.95],
    ['IT-Pharma', 0.25, 0.68],
    ['Metal-Energy', 0.55, 0.88],
  ]

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Correlation Regime Shift
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Toggle between normal and crisis regimes to see how Indian asset correlations change.
      </p>
      <div className="mb-4 flex gap-4 justify-center">
        <button onClick={() => setRegime('normal')}
          className={`px-4 py-2 rounded text-sm font-semibold ${regime === 'normal' ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
          Normal Market
        </button>
        <button onClick={() => setRegime('crisis')}
          className={`px-4 py-2 rounded text-sm font-semibold ${regime === 'crisis' ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
          Crisis Mode
        </button>
      </div>
      <div className="space-y-2">
        {pairs.map(([name, normCorr, crisisCorr], i) => {
          const corr = regime === 'normal' ? normCorr : crisisCorr
          const width = Math.abs(corr) * 200
          const color = corr > 0 ? '#ef4444' : '#22c55e'
          return (
            <div key={i} className="flex items-center gap-3 text-xs">
              <span className="w-28 text-right text-gray-600 dark:text-gray-400">{name}</span>
              <div className="flex-1 h-5 bg-gray-100 dark:bg-gray-800 rounded relative">
                <div className="absolute h-5 rounded" style={{width: `${width}px`, backgroundColor: color, opacity: 0.6}} />
              </div>
              <span className="w-12 font-mono font-bold" style={{color}}>{corr.toFixed(2)}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function CorrelationCrisis() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Correlation Breakdown in Indian Market Crises
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        One of the most dangerous phenomena in portfolio management is correlation breakdown
        during crises. Assets that appear diversifying in normal times become highly correlated
        during market stress, precisely when diversification is needed most. India has experienced
        several such episodes: the 2008 Global Financial Crisis, the 2013 Taper Tantrum, the
        2018 IL&FS crisis, and the 2020 COVID crash.
      </p>

      <DefinitionBlock
        title="Correlation Breakdown"
        label="Definition 10.6"
        definition="Correlation breakdown (or asymmetric correlation) refers to the tendency of asset correlations to increase during market downturns. Formally, Corr(Rᵢ, Rⱼ | R_m < q_α) > Corr(Rᵢ, Rⱼ | R_m > q_{1-α}), where R_m is the market return and q_α is the α-quantile."
        notation="Correlation is regime-dependent: ρ_crisis >> ρ_normal for most risky assets"
      />

      <BlockMath math="\rho_{\text{crisis}} = \rho_{\text{normal}} + \Delta\rho, \quad \Delta\rho > 0 \text{ for equity-like assets}" />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Indian Market Crisis Episodes
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Crisis</th>
              <th className="px-3 py-2 text-center text-gray-600 dark:text-gray-400">Nifty Drawdown</th>
              <th className="px-3 py-2 text-center text-gray-600 dark:text-gray-400">Avg Correlation</th>
              <th className="px-3 py-2 text-center text-gray-600 dark:text-gray-400">India VIX Peak</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2">GFC 2008</td>
              <td className="px-3 py-2 text-center text-red-600">-60%</td>
              <td className="px-3 py-2 text-center">0.85 (from 0.45)</td>
              <td className="px-3 py-2 text-center">85</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2">Taper Tantrum 2013</td>
              <td className="px-3 py-2 text-center text-red-600">-12%</td>
              <td className="px-3 py-2 text-center">0.65 (from 0.40)</td>
              <td className="px-3 py-2 text-center">28</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2">IL&FS 2018</td>
              <td className="px-3 py-2 text-center text-red-600">-17%</td>
              <td className="px-3 py-2 text-center">0.72 (from 0.42)</td>
              <td className="px-3 py-2 text-center">25</td>
            </tr>
            <tr>
              <td className="px-3 py-2">COVID 2020</td>
              <td className="px-3 py-2 text-center text-red-600">-38%</td>
              <td className="px-3 py-2 text-center">0.92 (from 0.48)</td>
              <td className="px-3 py-2 text-center">84</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveCorrelation />

      <TheoremBlock
        title="Asymmetric Dependence"
        label="Theorem 10.5"
        statement="Under multivariate normality, the conditional correlation given negative returns equals the unconditional correlation. The observed increase in correlations during crises implies that Indian stock returns are NOT multivariate normal -- they exhibit asymmetric tail dependence, which can be modeled via copulas or regime-switching models."
        proof="For bivariate normal (X,Y), Corr(X,Y|X<c) = ρ for all c (Forbes and Rigobon, 2002, after bias correction). Empirical evidence of ρ_down > ρ_up thus rejects normality."
      />

      <PythonCode
        title="correlation_crisis_india.py"
        runnable
        code={`import numpy as np

np.random.seed(42)

# Simulate Indian market with regime-switching correlations
T = 252 * 15  # 15 years
n = 4
assets = ['Nifty 50', 'Bank Nifty', 'Gold', 'G-Sec']

# Normal regime
mu_normal = np.array([0.12, 0.14, 0.08, 0.07]) / 252
vol_normal = np.array([0.18, 0.24, 0.15, 0.06]) / np.sqrt(252)
corr_normal = np.array([
    [1.0, 0.82, 0.08, -0.12],
    [0.82, 1.0, 0.05, -0.15],
    [0.08, 0.05, 1.0, 0.15],
    [-0.12, -0.15, 0.15, 1.0]
])

# Crisis regime
mu_crisis = np.array([-0.30, -0.40, 0.15, 0.10]) / 252
vol_crisis = np.array([0.40, 0.50, 0.25, 0.10]) / np.sqrt(252)
corr_crisis = np.array([
    [1.0, 0.95, 0.35, 0.30],
    [0.95, 1.0, 0.30, 0.25],
    [0.35, 0.30, 1.0, 0.20],
    [0.30, 0.25, 0.20, 1.0]
])

cov_normal = np.outer(vol_normal, vol_normal) * corr_normal
cov_crisis = np.outer(vol_crisis, vol_crisis) * corr_crisis

# Generate regime-switching returns
crisis_prob = 0.03
returns = np.zeros((T, n))
regimes = np.zeros(T)
in_crisis = False

for t in range(T):
    if in_crisis:
        in_crisis = np.random.random() > 0.08  # ~12 day avg crisis
    else:
        in_crisis = np.random.random() < crisis_prob

    regimes[t] = 1 if in_crisis else 0
    if in_crisis:
        returns[t] = np.random.multivariate_normal(mu_crisis, cov_crisis)
    else:
        returns[t] = np.random.multivariate_normal(mu_normal, cov_normal)

# Analyze
normal_mask = regimes == 0
crisis_mask = regimes == 1

print("=== Correlation Analysis: Normal vs Crisis ===")
print(f"Normal days: {np.sum(normal_mask)}, Crisis days: {np.sum(crisis_mask)}")
print(f"\\nCorrelations (Normal):")
corr_n = np.corrcoef(returns[normal_mask].T)
for i in range(n):
    for j in range(i+1, n):
        print(f"  {assets[i]:12s} - {assets[j]:12s}: {corr_n[i,j]:.4f}")

print(f"\\nCorrelations (Crisis):")
corr_c = np.corrcoef(returns[crisis_mask].T)
for i in range(n):
    for j in range(i+1, n):
        print(f"  {assets[i]:12s} - {assets[j]:12s}: {corr_c[i,j]:.4f} (delta: {corr_c[i,j]-corr_n[i,j]:+.4f})")

# Portfolio impact
w = np.array([0.60, 0.10, 0.15, 0.15])
vol_normal_port = np.std(returns[normal_mask] @ w) * np.sqrt(252)
vol_crisis_port = np.std(returns[crisis_mask] @ w) * np.sqrt(252)
print(f"\\nPortfolio (60/10/15/15) Volatility:")
print(f"  Normal: {vol_normal_port:.2%}")
print(f"  Crisis: {vol_crisis_port:.2%} ({vol_crisis_port/vol_normal_port:.1f}x)")`}
      />

      <ExampleBlock
        title="COVID 2020 Correlation Spike"
        difficulty="intermediate"
        problem="During March 2020, the correlation between Nifty 50 and Bank Nifty rose from 0.82 to 0.95, and Nifty-Gold from 0.08 to 0.35. A portfolio is 60% Nifty, 20% Bank Nifty, 20% Gold. By how much did portfolio vol increase due to correlation changes alone?"
        solution={[
          {
            step: 'Portfolio variance with normal correlations',
            formula: '\\sigma^2_{\\text{normal}} = 0.6^2 \\times 0.18^2 + 0.2^2 \\times 0.24^2 + 0.2^2 \\times 0.15^2 + 2 \\times \\text{cross terms}',
            explanation: 'Using normal-regime correlations and volatilities.',
          },
          {
            step: 'Portfolio variance with crisis correlations (same vols)',
            formula: '\\sigma^2_{\\text{crisis}} = \\text{same diag terms} + 2 \\times \\text{higher cross terms}',
            explanation: 'Only changing correlations (not volatilities) to isolate the correlation effect.',
          },
          {
            step: 'Correlation-driven vol increase',
            formula: '\\Delta\\sigma \\approx 3\\text{-}5\\% \\text{ (from correlation alone)}',
            explanation: 'In practice, both correlations AND volatilities increase, roughly doubling portfolio risk.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Correlation breakdown is a critical risk for Indian portfolios. During crises, all
          equity sectors become highly correlated, reducing diversification benefits precisely
          when needed most. Only truly uncorrelated assets (G-Secs, gold to some extent) provide
          meaningful crisis diversification. Portfolio stress testing should always use crisis-era
          correlations, not normal-regime correlations.
        </p>
      </NoteBlock>
    </div>
  )
}
