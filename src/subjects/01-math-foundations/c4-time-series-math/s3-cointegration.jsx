import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractivePairsTrading() {
  const [beta, setBeta] = useState(1.2)
  const [meanRevSpeed, setMeanRevSpeed] = useState(0.05)
  const [entryZ, setEntryZ] = useState(2.0)
  const [seed, setSeed] = useState(42)

  const seededRandom = (s) => {
    let state = s
    return () => { state = (state * 1664525 + 1013904223) & 0xffffffff; return (state >>> 0) / 0xffffffff }
  }
  const normalRandom = (rng) => {
    const u1 = rng(); const u2 = rng()
    return Math.sqrt(-2 * Math.log(u1 + 1e-10)) * Math.cos(2 * Math.PI * u2)
  }

  const n = 200
  const rng = seededRandom(seed)

  // Generate cointegrated pair (TCS-Infosys style)
  const commonFactor = [100]
  for (let i = 1; i < n; i++) commonFactor.push(commonFactor[i - 1] + normalRandom(rng) * 2)

  const spread = [0]
  for (let i = 1; i < n; i++) {
    spread.push((1 - meanRevSpeed) * spread[i - 1] + normalRandom(rng) * 3)
  }

  const priceA = commonFactor.map((c, i) => c + spread[i])
  const priceB = commonFactor.map(c => c * beta / 1.2)
  const actualSpread = priceA.map((a, i) => a - beta * priceB[i])

  const spreadMean = actualSpread.reduce((s, v) => s + v, 0) / n
  const spreadStd = Math.sqrt(actualSpread.reduce((s, v) => s + (v - spreadMean) ** 2, 0) / n)
  const zScores = actualSpread.map(s => (s - spreadMean) / spreadStd)

  // Compute P&L from pairs trading
  let position = 0
  let pnl = 0
  let trades = 0
  const pnlCurve = [0]
  for (let i = 1; i < n; i++) {
    if (position === 0 && zScores[i] > entryZ) { position = -1; trades++ }
    else if (position === 0 && zScores[i] < -entryZ) { position = 1; trades++ }
    else if (position === 1 && zScores[i] > 0) { position = 0 }
    else if (position === -1 && zScores[i] < 0) { position = 0 }
    pnl += position * (actualSpread[i] - actualSpread[i - 1])
    pnlCurve.push(pnl)
  }

  const chartW = 500, chartH = 150
  const padL = 45, padR = 15, padT = 15, padB = 25
  const plotW = chartW - padL - padR, plotH = chartH - padT - padB

  let minZ = -4, maxZ = 4
  const toX = (i) => padL + (i / (n - 1)) * plotW
  const toYZ = (v) => padT + plotH / 2 - (v / maxZ) * (plotH / 2)

  const spreadPath = zScores.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i).toFixed(1)},${toYZ(v).toFixed(1)}`).join(' ')

  let minPnl = Infinity, maxPnl = -Infinity
  for (const p of pnlCurve) { if (p < minPnl) minPnl = p; if (p > maxPnl) maxPnl = p }
  const pnlRange = Math.max(maxPnl - minPnl, 1)
  const toYPnl = (v) => padT + plotH - ((v - minPnl) / pnlRange) * plotH
  const pnlPath = pnlCurve.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i).toFixed(1)},${toYPnl(v).toFixed(1)}`).join(' ')

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Pairs Trading with Cointegrated NSE Stocks
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Simulate a cointegrated pair (e.g., TCS-Infosys). Adjust the hedge ratio, mean-reversion
        speed, and entry threshold to see the z-score and P&L.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Hedge ratio <InlineMath math="\beta" /> = {beta.toFixed(2)}</span>
          <input type="range" min="0.5" max="2.0" step="0.05" value={beta}
            onChange={e => setBeta(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Mean-rev speed = {meanRevSpeed.toFixed(2)}</span>
          <input type="range" min="0.01" max="0.2" step="0.01" value={meanRevSpeed}
            onChange={e => setMeanRevSpeed(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Entry z-score = {entryZ.toFixed(1)}</span>
          <input type="range" min="1.0" max="3.0" step="0.1" value={entryZ}
            onChange={e => setEntryZ(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Seed = {seed}</span>
          <input type="range" min="1" max="100" step="1" value={seed}
            onChange={e => setSeed(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Z-Score of Spread</div>
      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full max-w-xl mx-auto block">
        <line x1={padL} y1={toYZ(0)} x2={padL + plotW} y2={toYZ(0)} stroke="#9ca3af" strokeWidth="0.5" />
        <line x1={padL} y1={toYZ(entryZ)} x2={padL + plotW} y2={toYZ(entryZ)} stroke="#ef4444" strokeWidth="0.5" strokeDasharray="3,3" />
        <line x1={padL} y1={toYZ(-entryZ)} x2={padL + plotW} y2={toYZ(-entryZ)} stroke="#22c55e" strokeWidth="0.5" strokeDasharray="3,3" />
        <path d={spreadPath} fill="none" stroke="#6366f1" strokeWidth="1.5" />
      </svg>

      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 mt-2">Cumulative P&L</div>
      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full max-w-xl mx-auto block">
        <line x1={padL} y1={padT + plotH} x2={padL + plotW} y2={padT + plotH} stroke="#9ca3af" strokeWidth="1" />
        <path d={pnlPath} fill="none" stroke={pnl >= 0 ? '#22c55e' : '#ef4444'} strokeWidth="1.5" />
      </svg>

      <div className="mt-2 grid grid-cols-3 gap-3 text-center text-xs">
        <div className="rounded bg-gray-50 p-2 dark:bg-gray-800">
          <div className="text-gray-500">Trades</div>
          <div className="font-bold text-gray-700 dark:text-gray-300">{trades}</div>
        </div>
        <div className={`rounded p-2 ${pnl >= 0 ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'}`}>
          <div className={pnl >= 0 ? 'text-green-600' : 'text-red-600'}>Final P&L</div>
          <div className={`font-bold ${pnl >= 0 ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
            {pnl >= 0 ? '+' : ''}{pnl.toFixed(1)}
          </div>
        </div>
        <div className="rounded bg-gray-50 p-2 dark:bg-gray-800">
          <div className="text-gray-500">Spread Std</div>
          <div className="font-bold text-gray-700 dark:text-gray-300">{spreadStd.toFixed(2)}</div>
        </div>
      </div>
    </div>
  )
}

export default function Cointegration() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Cointegration and Error Correction Models
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Cointegration is the cornerstone of statistical arbitrage and pairs trading on the NSE.
        Two non-stationary price series are cointegrated if a linear combination of them is
        stationary. This enables mean-reversion strategies even when individual prices are
        random walks.
      </p>

      <DefinitionBlock
        title="Cointegration"
        label="Definition 3.1"
        definition={<>
          Two I(1) time series <InlineMath math="Y_t" /> and <InlineMath math="X_t" /> are
          cointegrated of order CI(1,1) if there exists a constant <InlineMath math="\beta" />{' '}
          such that:
          <BlockMath math="z_t = Y_t - \beta X_t \sim I(0)" />
          The stationary residual <InlineMath math="z_t" /> is called the <strong>cointegrating
          residual</strong> or <strong>equilibrium error</strong>. The vector{' '}
          <InlineMath math="(1, -\beta)^\top" /> is the cointegrating vector.
        </>}
        notation={<>
          In the Indian market context: <InlineMath math="Y_t" /> = TCS price,{' '}
          <InlineMath math="X_t" /> = Infosys price, <InlineMath math="\beta" /> = hedge ratio,{' '}
          <InlineMath math="z_t" /> = tradeable spread.
        </>}
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The economic intuition is that cointegrated stocks share common long-run drivers (e.g.,
        TCS and Infosys are both driven by global IT spending, INR/USD exchange rate, and
        the Indian IT sector outlook). While each stock's price wanders randomly, their
        spread is pulled back to an equilibrium by these shared fundamentals.
      </p>

      {/* --- Engle-Granger --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Engle-Granger Two-Step Procedure
      </h3>

      <TheoremBlock
        title="Engle-Granger Cointegration Test"
        label="Theorem 3.1"
        statement={<>
          <strong>Step 1:</strong> Estimate the cointegrating regression by OLS:
          <BlockMath math="Y_t = \alpha + \beta X_t + z_t" />
          <strong>Step 2:</strong> Test the residuals <InlineMath math="\hat{z}_t" /> for
          stationarity using the ADF test. If we reject the unit root null, the series are
          cointegrated. Critical values are different from standard ADF because the residuals
          are estimated, not observed (use Engle-Granger critical values).
        </>}
      />

      <NoteBlock title="Common Pairs on NSE" type="info">
        <p>
          Popular cointegrated pairs in the Indian market include:
          TCS-Infosys (IT sector), HDFC Bank-ICICI Bank (banking), Tata Steel-JSW Steel
          (metals), SBI-Bank of Baroda (PSU banks), Nifty-Bank Nifty (index pair).
          However, cointegration relationships can break down, especially during regime
          changes, sector rotations, or firm-specific events (e.g., mergers, management
          changes).
        </p>
      </NoteBlock>

      {/* --- Error Correction Model --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Vector Error Correction Model (VECM)
      </h3>

      <DefinitionBlock
        title="Error Correction Model"
        label="Definition 3.2"
        definition={<>
          The Granger Representation Theorem states that if <InlineMath math="Y_t" /> and{' '}
          <InlineMath math="X_t" /> are cointegrated, there exists an error correction
          representation:
          <BlockMath math={`\\begin{aligned}
\\Delta Y_t &= \\alpha_Y (z_{t-1}) + \\sum_{i=1}^{p} \\gamma_i \\Delta Y_{t-i} + \\sum_{i=1}^{p} \\delta_i \\Delta X_{t-i} + \\epsilon_{Y,t} \\\\
\\Delta X_t &= \\alpha_X (z_{t-1}) + \\sum_{i=1}^{p} \\gamma_i' \\Delta Y_{t-i} + \\sum_{i=1}^{p} \\delta_i' \\Delta X_{t-i} + \\epsilon_{X,t}
\\end{aligned}`} />
          where <InlineMath math="z_{t-1} = Y_{t-1} - \beta X_{t-1}" /> is the lagged
          equilibrium error. The coefficients <InlineMath math="\alpha_Y, \alpha_X" /> measure
          the speed of adjustment back to equilibrium.
        </>}
      />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For a pairs trade, we need <InlineMath math="\alpha_Y < 0" /> (stock Y adjusts downward
        when the spread is too high) and/or <InlineMath math="\alpha_X > 0" /> (stock X adjusts
        upward). The half-life of mean reversion is:
      </p>

      <BlockMath math="\text{Half-life} = -\frac{\ln(2)}{\ln(1 + \alpha)} \approx \frac{\ln(2)}{|\alpha|}" />

      {/* --- Johansen Test --- */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Johansen Cointegration Test
      </h3>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For systems with more than 2 variables (e.g., a basket of Indian bank stocks), the
        Johansen test determines the number of cointegrating relationships. It is based on
        the VECM representation:
      </p>

      <BlockMath math="\Delta \mathbf{Y}_t = \Pi \mathbf{Y}_{t-1} + \sum_{i=1}^{p-1} \Gamma_i \Delta \mathbf{Y}_{t-i} + \epsilon_t" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\Pi = \alpha \beta^\top" /> has rank{' '}
        <InlineMath math="r" /> (the number of cointegrating relationships). The test uses
        the trace statistic and maximum eigenvalue statistic.
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Test</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Null</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Advantage</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">Engle-Granger</td>
              <td className="px-4 py-2">No cointegration</td>
              <td className="px-4 py-2">Simple, intuitive, works for 2 variables</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">Johansen Trace</td>
              <td className="px-4 py-2"><InlineMath math="r = r_0" /> vs <InlineMath math="r > r_0" /></td>
              <td className="px-4 py-2">Multiple variables, determines r, MLE-based</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-medium">Johansen Max Eigenvalue</td>
              <td className="px-4 py-2"><InlineMath math="r = r_0" /> vs <InlineMath math="r = r_0 + 1" /></td>
              <td className="px-4 py-2">More power for specific alternative</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- Interactive Pairs Trading --- */}
      <InteractivePairsTrading />

      {/* --- Python Code --- */}
      <PythonCode
        title="cointegration_pairs.py"
        runnable
        code={`import numpy as np
from scipy import stats

np.random.seed(42)

# --- Simulate Cointegrated NSE Stock Pair ---
n = 500  # ~2 years of daily data

# Common stochastic trend (Indian IT sector trend)
sector_trend = np.cumsum(np.random.normal(0.5, 2.0, n))

# TCS price = sector_trend + mean-reverting component
tcs_idio = np.zeros(n)
for t in range(1, n):
    tcs_idio[t] = 0.92 * tcs_idio[t-1] + np.random.normal(0, 3)
tcs_price = 3500 + sector_trend + tcs_idio

# Infosys price = 0.45 * sector_trend + different mean-reverting component
infy_idio = np.zeros(n)
for t in range(1, n):
    infy_idio[t] = 0.90 * infy_idio[t-1] + np.random.normal(0, 2.5)
infy_price = 1500 + 0.45 * sector_trend + infy_idio

print("=== Cointegration Analysis: TCS - Infosys ===")
print(f"Data: {n} daily observations")
print(f"TCS:    mean={np.mean(tcs_price):.0f}, std={np.std(tcs_price):.0f}")
print(f"Infosys: mean={np.mean(infy_price):.0f}, std={np.std(infy_price):.0f}")
print()

# --- Step 1: Estimate Cointegrating Regression ---
X = np.column_stack([np.ones(n), infy_price])
beta_hat = np.linalg.lstsq(X, tcs_price, rcond=None)[0]
alpha, beta = beta_hat
spread = tcs_price - alpha - beta * infy_price

print(f"Cointegrating Regression: TCS = {alpha:.2f} + {beta:.4f} * Infosys + z")
print(f"Hedge ratio (beta): {beta:.4f}")
print(f"Spread mean: {np.mean(spread):.4f}")
print(f"Spread std:  {np.std(spread):.4f}")
print()

# --- Step 2: ADF Test on Residuals ---
dy = np.diff(spread)
y_lag = spread[:-1]
X_adf = np.column_stack([np.ones(len(dy)), y_lag])
beta_adf = np.linalg.lstsq(X_adf, dy, rcond=None)[0]
gamma = beta_adf[1]
resid_adf = dy - X_adf @ beta_adf
se = np.sqrt(np.var(resid_adf) * np.linalg.inv(X_adf.T @ X_adf)[1, 1])
t_stat = gamma / se

# Engle-Granger critical values (2 variables, n=500)
eg_cv_1 = -3.90
eg_cv_5 = -3.34
eg_cv_10 = -3.04

print(f"=== Engle-Granger Cointegration Test ===")
print(f"ADF t-stat on spread: {t_stat:.4f}")
print(f"Critical values: 1%={eg_cv_1}, 5%={eg_cv_5}, 10%={eg_cv_10}")
print(f"Decision: {'Cointegrated' if t_stat < eg_cv_5 else 'Not cointegrated'} at 5%")
print()

# --- Half-life of Mean Reversion ---
half_life = -np.log(2) / np.log(1 + gamma)
print(f"Mean reversion coefficient: {gamma:.4f}")
print(f"Half-life: {half_life:.1f} days")
print()

# --- Pairs Trading Backtest ---
z_score = (spread - np.mean(spread)) / np.std(spread)
entry_threshold = 2.0
exit_threshold = 0.0

position = 0
trades = 0
pnl_daily = []
for t in range(1, n):
    # Entry signals
    if position == 0 and z_score[t] > entry_threshold:
        position = -1  # Short spread
        trades += 1
    elif position == 0 and z_score[t] < -entry_threshold:
        position = 1   # Long spread
        trades += 1
    # Exit signals
    elif position == 1 and z_score[t] > exit_threshold:
        position = 0
    elif position == -1 and z_score[t] < exit_threshold:
        position = 0

    daily_pnl = position * (spread[t] - spread[t-1])
    pnl_daily.append(daily_pnl)

pnl_daily = np.array(pnl_daily)
total_pnl = np.sum(pnl_daily)
sharpe = np.mean(pnl_daily) / np.std(pnl_daily) * np.sqrt(252) if np.std(pnl_daily) > 0 else 0

print(f"=== Pairs Trading Backtest (TCS-Infosys) ===")
print(f"Entry/Exit: z={entry_threshold}/{exit_threshold}")
print(f"Number of trades: {trades}")
print(f"Total P&L (INR per unit): {total_pnl:.2f}")
print(f"Mean daily P&L: {np.mean(pnl_daily):.4f}")
print(f"Sharpe ratio (annualized): {sharpe:.3f}")
print(f"Max drawdown: {np.min(np.cumsum(pnl_daily) - np.maximum.accumulate(np.cumsum(pnl_daily))):.2f}")
print(f"Win rate: {np.mean(pnl_daily[pnl_daily != 0] > 0)*100:.1f}%")`}
      />

      {/* --- Worked Example --- */}
      <ExampleBlock
        title="Testing Cointegration for HDFC Bank - ICICI Bank"
        difficulty="intermediate"
        problem="Running the Engle-Granger test on HDFC Bank and ICICI Bank prices yields a hedge ratio of 0.85 and ADF t-stat on the residuals of -2.95. The 5% critical value is -3.34. Are they cointegrated?"
        solution={[
          {
            step: 'Compare test statistic to critical value',
            formula: 't_{\\text{ADF}} = -2.95 > -3.34 = \\text{CV}_{5\\%}',
            explanation: 'The test statistic is NOT more negative than the critical value.',
          },
          {
            step: 'Decision',
            formula: '\\text{Fail to reject } H_0 \\text{ of no cointegration}',
            explanation: 'At the 5% level, we cannot conclude that HDFC Bank and ICICI Bank are cointegrated. This means the spread is not reliably mean-reverting.',
          },
          {
            step: 'Practical implications',
            formula: '\\text{Do NOT trade this pair as a mean-reversion strategy}',
            explanation: 'The spread may appear mean-reverting over short periods but can diverge permanently. Consider: (a) checking at 10% level (-3.04), (b) using a longer sample, (c) adding a third bank stock to find a cointegrated basket, or (d) using the Johansen test for a system of banking stocks.',
          },
        ]}
      />

      {/* --- Key Takeaway --- */}
      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Cointegration is the theoretical foundation of pairs trading and statistical arbitrage
          on the NSE. The Engle-Granger test works well for two-variable systems, while the
          Johansen test handles baskets (e.g., a portfolio of Indian bank stocks). Key practical
          considerations: (1) cointegration can break down, so test periodically, (2) the
          half-life determines position holding period, (3) transaction costs (STT, brokerage)
          eat into profits, and (4) always use out-of-sample validation before live trading.
          The most robust Indian market pairs tend to be within the same sector (IT, Banking, Metals).
        </p>
      </NoteBlock>
    </div>
  )
}
