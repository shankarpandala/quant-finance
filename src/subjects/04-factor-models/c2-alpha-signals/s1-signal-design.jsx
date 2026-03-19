import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveSignalDesign() {
  const [lookback, setLookback] = useState(60)
  const [zscore, setZscore] = useState(true)
  const [winsorize, setWinsorize] = useState(3.0)
  const [neutralize, setNeutralize] = useState(true)

  const rawSpread = 2.5
  const neutralizedSpread = neutralize ? rawSpread * 0.7 : rawSpread
  const winsorizedSpread = Math.min(neutralizedSpread, winsorize)
  const normalizedSpread = zscore ? winsorizedSpread / 1.0 : winsorizedSpread
  const ic = 0.03 + (lookback > 20 ? 0.02 : 0) + (zscore ? 0.01 : 0) + (neutralize ? 0.015 : 0)
  const turnover = 100 / lookback
  const halfLife = lookback * 0.4

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Alpha Signal Pipeline
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Configure signal processing steps and observe the impact on signal quality
        for NSE stock selection.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Lookback: {lookback} days</span>
          <input type="range" min="5" max="252" step="1" value={lookback}
            onChange={e => setLookback(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <input type="checkbox" checked={zscore}
            onChange={e => setZscore(e.target.checked)}
            className="accent-indigo-500" />
          <span>Z-Score Normalize</span>
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Winsorize at: {winsorize.toFixed(1)} sigma</span>
          <input type="range" min="2" max="5" step="0.5" value={winsorize}
            onChange={e => setWinsorize(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <input type="checkbox" checked={neutralize}
            onChange={e => setNeutralize(e.target.checked)}
            className="accent-indigo-500" />
          <span>Sector Neutralize</span>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">Est. IC</p>
          <p className="text-lg font-bold text-blue-800 dark:text-blue-200">{ic.toFixed(3)}</p>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
          <p className="text-xs font-semibold text-purple-700 dark:text-purple-300">Monthly Turnover</p>
          <p className="text-lg font-bold text-purple-800 dark:text-purple-200">{turnover.toFixed(0)}%</p>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">Half-Life</p>
          <p className="text-lg font-bold text-amber-800 dark:text-amber-200">{halfLife.toFixed(0)} days</p>
        </div>
        <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/30">
          <p className="text-xs font-semibold text-green-700 dark:text-green-300">Signal Spread</p>
          <p className="text-lg font-bold text-green-800 dark:text-green-200">{normalizedSpread.toFixed(2)}</p>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
        Pipeline: Raw Signal
        {zscore ? ' -> Z-Score' : ''}
        {' -> Winsorize'}
        {neutralize ? ' -> Sector Neutralize' : ''}
        {' -> Portfolio Weights'}
      </p>
    </div>
  )
}

export default function SignalDesign() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Alpha Signal Design
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        An alpha signal is a quantitative prediction of future stock returns. Designing robust
        signals for the Indian market requires a systematic pipeline: from raw data (NSE prices,
        fundamentals from CMIE, corporate actions from BSE) through standardization,
        neutralization, and combination into portfolio weights. A well-designed signal is the
        difference between a profitable quant strategy and an expensive random number generator.
      </p>

      <DefinitionBlock
        title="Alpha Signal"
        label="Definition 2.1"
        definition="An alpha signal is a cross-sectional score assigned to each stock at each time period, predicting its future relative return. A positive score predicts outperformance; negative predicts underperformance. Signals are typically standardized to have zero mean and unit variance across stocks."
        notation="\alpha_{i,t} = f(\text{data}_{i,t}), \quad E[\alpha_{i,t}] = 0, \quad \text{Var}[\alpha_{i,t}] = 1"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Signal Processing Pipeline
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Every alpha signal should pass through a standard processing pipeline:
      </p>

      <BlockMath math="\text{Raw} \xrightarrow{\text{clean}} \text{Cleaned} \xrightarrow{\text{winsorize}} \text{Bounded} \xrightarrow{\text{z-score}} \text{Standardized} \xrightarrow{\text{neutralize}} \text{Final}" />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Step</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Operation</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Purpose</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">NSE Notes</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">1. Clean</td>
              <td className="px-4 py-2">Remove NaN, adjust splits</td>
              <td className="px-4 py-2">Data integrity</td>
              <td className="px-4 py-2">NSE corporate actions API</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">2. Winsorize</td>
              <td className="px-4 py-2">Clip at 3-sigma</td>
              <td className="px-4 py-2">Limit outlier influence</td>
              <td className="px-4 py-2">Important for mid/small cap</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">3. Z-Score</td>
              <td className="px-4 py-2"><InlineMath math="z = (x - \mu) / \sigma" /></td>
              <td className="px-4 py-2">Comparable scale</td>
              <td className="px-4 py-2">Cross-sectional each day</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">4. Neutralize</td>
              <td className="px-4 py-2">Demean within sectors</td>
              <td className="px-4 py-2">Remove sector bias</td>
              <td className="px-4 py-2">NSE sector classification</td>
            </tr>
            <tr>
              <td className="px-4 py-2">5. Rank</td>
              <td className="px-4 py-2">Convert to percentile ranks</td>
              <td className="px-4 py-2">Robustness to outliers</td>
              <td className="px-4 py-2">Optional, but recommended</td>
            </tr>
          </tbody>
        </table>
      </div>

      <TheoremBlock
        title="Optimal Signal Combination"
        label="Theorem 2.1"
        statement="Given K alpha signals with information coefficients IC_1, ..., IC_K and correlation matrix Omega, the optimal combined signal maximizes the combined IC through the inverse-covariance-weighted sum."
        formula="\alpha^*_i = \boldsymbol{\Omega}^{-1} \boldsymbol{\alpha}_i, \quad \text{IC}^* = \sqrt{\mathbf{IC}^\top \boldsymbol{\Omega}^{-1} \mathbf{IC}}"
        proof="This follows from the Markowitz portfolio analogy. Each signal is like an 'asset' with expected return IC_k and covariance \Omega. The mean-variance optimal combination is w^* = \Omega^{-1} \cdot IC, and the resulting portfolio IC (analogous to Sharpe ratio) is \sqrt{IC' \Omega^{-1} IC}. For two uncorrelated signals with IC = 0.05 each, the combined IC is \sqrt{0.05^2 + 0.05^2} = 0.071, a 41% improvement from diversification."
      />

      <InteractiveSignalDesign />

      <NoteBlock title="Indian Market Signal Considerations" type="info">
        <ul className="space-y-2">
          <li>
            <strong>Survivorship Bias:</strong> NSE delistings and BSE-only stocks create
            survivorship bias. Always include delisted stocks in backtests using CMIE Prowess
            or NSE historical archives.
          </li>
          <li>
            <strong>Look-Ahead Bias:</strong> Indian quarterly results have a 45-day filing
            deadline with SEBI. Lag fundamental data by at least 60 days to avoid using
            information not yet publicly available.
          </li>
          <li>
            <strong>Liquidity Filter:</strong> Many NSE-listed stocks have zero or minimal
            trading volume. Apply ADV &gt; INR 1 Cr and impact cost &lt; 0.5% filters.
          </li>
        </ul>
      </NoteBlock>

      <PythonCode
        title="signal_design.py"
        runnable
        code={`import numpy as np
import pandas as pd
from scipy.stats import rankdata, zscore

# Simulate NSE 500 stock universe with signal data
np.random.seed(42)
n_stocks = 500
n_days = 252

# Generate stock IDs and sector assignments
stock_ids = [f"NSE_{i:03d}" for i in range(n_stocks)]
sectors = np.random.choice(['Banking', 'IT', 'Energy', 'FMCG', 'Pharma',
                            'Auto', 'Metal', 'Realty', 'Infra', 'Telecom'],
                           n_stocks)

# --- Raw Signal: 12-month momentum (with noise) ---
raw_momentum = np.random.normal(0, 15, n_stocks)  # % returns
raw_momentum[0:10] = np.random.uniform(80, 200, 10)   # Outliers (circuit hits)
raw_momentum[10:15] = np.random.uniform(-90, -50, 5)   # Crashed stocks

# --- Step 1: Clean (remove NaN, infinite) ---
clean_momentum = raw_momentum.copy()
clean_momentum[np.isnan(clean_momentum)] = 0
clean_momentum[np.isinf(clean_momentum)] = 0

# --- Step 2: Winsorize at 3 sigma ---
mu = np.mean(clean_momentum)
sigma = np.std(clean_momentum)
winsorized = np.clip(clean_momentum, mu - 3*sigma, mu + 3*sigma)

# --- Step 3: Z-Score (cross-sectional) ---
z_scored = (winsorized - np.mean(winsorized)) / np.std(winsorized)

# --- Step 4: Sector Neutralize ---
df = pd.DataFrame({
    'Stock': stock_ids,
    'Sector': sectors,
    'Raw': raw_momentum,
    'Winsorized': winsorized,
    'ZScored': z_scored
})

def sector_neutralize(df, col, sector_col='Sector'):
    result = df[col].copy()
    for sector in df[sector_col].unique():
        mask = df[sector_col] == sector
        result[mask] = result[mask] - result[mask].mean()
    return result

df['Neutralized'] = sector_neutralize(df, 'ZScored')

# --- Step 5: Rank (percentile) ---
df['Ranked'] = rankdata(df['Neutralized']) / n_stocks

# --- Signal Quality Metrics ---
# Simulate forward returns
forward_returns = 0.03 * df['Neutralized'] + np.random.normal(0, 5, n_stocks)

# Information Coefficient (rank correlation)
from scipy.stats import spearmanr
ic_raw, _ = spearmanr(df['Raw'], forward_returns)
ic_neutralized, _ = spearmanr(df['Neutralized'], forward_returns)

# Quintile spread
quintiles = pd.qcut(df['Neutralized'], 5, labels=False)
q_returns = pd.Series(forward_returns).groupby(quintiles).mean()

print("=== Alpha Signal Processing Pipeline ===\\n")
print(f"Universe: {n_stocks} NSE stocks across {len(df['Sector'].unique())} sectors")
print(f"\\n--- Processing Statistics ---")
print(f"{'Step':<20} {'Mean':>8} {'Std':>8} {'Min':>10} {'Max':>10}")
for col in ['Raw', 'Winsorized', 'ZScored', 'Neutralized']:
    s = df[col]
    print(f"{col:<20} {s.mean():>8.2f} {s.std():>8.2f} {s.min():>10.2f} {s.max():>10.2f}")

print(f"\\n--- Signal Quality ---")
print(f"IC (raw signal):         {ic_raw:.4f}")
print(f"IC (neutralized signal): {ic_neutralized:.4f}")
print(f"IC improvement:          {(ic_neutralized/ic_raw - 1)*100:+.1f}%")
print(f"\\n--- Quintile Returns (Forward) ---")
for q in range(5):
    print(f"  Q{q+1}: {q_returns.iloc[q]:+.2f}%")
print(f"  Q5-Q1 spread: {q_returns.iloc[4] - q_returns.iloc[0]:+.2f}%")`}
      />

      <ExampleBlock
        title="Building a Momentum Signal for NSE"
        difficulty="intermediate"
        problem="You want to build a 12-month momentum signal for NSE 500 stocks. The raw signal for Stock A (Banking) is +45% return, while the Banking sector average is +30%. After z-scoring, the cross-sectional mean is 0 and std is 12%. Compute the final signal value for Stock A."
        solution={[
          {
            step: 'Raw momentum',
            formula: '\\alpha_{\\text{raw}} = +45\\%',
          },
          {
            step: 'Cross-sectional z-score',
            formula: 'z = \\frac{45 - 0}{12} = 3.75',
            explanation: 'Stock A is 3.75 standard deviations above the universe mean.',
          },
          {
            step: 'Sector neutralize',
            formula: '\\alpha_{\\text{neutral}} = 45\\% - 30\\% = 15\\% \\implies z_{\\text{neutral}} = \\frac{15}{12} = 1.25',
            explanation: 'After removing the Banking sector average, Stock A has a sector-neutral z-score of 1.25 -- still positive, meaning it outperformed even within the strong Banking sector.',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Common Alpha Signal Categories for NSE
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Alpha signals for Indian equities fall into several broad categories, each with
        distinct data requirements, decay profiles, and capacity:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Category</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Examples (NSE)</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Data Source</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Typical IC</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Decay</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Price-based</td>
              <td className="px-4 py-2">Momentum, reversal, vol</td>
              <td className="px-4 py-2">NSE prices</td>
              <td className="px-4 py-2">0.03-0.07</td>
              <td className="px-4 py-2">Fast (5-30d)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Fundamental</td>
              <td className="px-4 py-2">P/E, ROE, D/E, cash flow</td>
              <td className="px-4 py-2">CMIE, annual reports</td>
              <td className="px-4 py-2">0.03-0.05</td>
              <td className="px-4 py-2">Slow (60-120d)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Analyst</td>
              <td className="px-4 py-2">Earnings revisions, target px</td>
              <td className="px-4 py-2">Bloomberg, broker reports</td>
              <td className="px-4 py-2">0.04-0.06</td>
              <td className="px-4 py-2">Medium (15-30d)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Ownership</td>
              <td className="px-4 py-2">Promoter, FII, MF changes</td>
              <td className="px-4 py-2">SEBI filings</td>
              <td className="px-4 py-2">0.02-0.05</td>
              <td className="px-4 py-2">Slow (30-90d)</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Event-driven</td>
              <td className="px-4 py-2">Earnings surprise, buyback</td>
              <td className="px-4 py-2">BSE announcements</td>
              <td className="px-4 py-2">0.05-0.10</td>
              <td className="px-4 py-2">Fast (1-10d)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Rank vs. Z-Score Normalization
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Two common normalization approaches are used in practice. Z-scoring preserves
        the relative magnitude of signals but is sensitive to outliers. Rank normalization
        (converting to uniform percentiles) is robust to outliers but discards magnitude:
      </p>

      <BlockMath math="\text{Rank}_i = \frac{\text{rank}(x_i)}{N+1}, \quad z_i^{\text{rank}} = \Phi^{-1}(\text{Rank}_i)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For Indian mid and small-cap stocks where outliers are common (circuit hits,
        illiquid price jumps), rank normalization is generally preferred. For Nifty 50
        large-cap stocks with clean data, z-scoring preserves more information. Many
        practitioners use a hybrid: rank-normalize first, then convert to normal scores
        using the inverse CDF (rank-based z-scoring), getting the best of both approaches.
      </p>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Signal design is the most important step in quant investing. A well-processed signal
          (winsorized, z-scored or rank-normalized, sector-neutralized) dramatically improves
          IC and portfolio performance on NSE. Always process signals cross-sectionally
          (across stocks) rather than time-series. Sector neutralization prevents unintended
          sector bets, and winsorization reduces the influence of circuit-hit stocks. Use
          rank normalization for mid/small-cap universes and z-scoring for large-cap. Combine
          multiple low-correlation signals from different categories (price, fundamental,
          ownership) for maximum diversification.
        </p>
      </NoteBlock>
    </div>
  )
}
