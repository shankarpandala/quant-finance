import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveOptionChain() {
  const [spot, setSpot] = useState(22000)
  const [expiry, setExpiry] = useState(15)
  const [vol, setVol] = useState(0.18)

  const r = 0.065
  const T = expiry / 365
  const normCdf = (x) => {
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741
    const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911
    const sign = x < 0 ? -1 : 1
    const t = 1 / (1 + p * Math.abs(x) / Math.sqrt(2))
    const erf = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x / 2)
    return 0.5 * (1 + sign * erf)
  }
  const bsm = (S, K) => {
    const d1 = (Math.log(S / K) + (r + vol * vol / 2) * T) / (vol * Math.sqrt(T))
    const d2 = d1 - vol * Math.sqrt(T)
    return { call: S * normCdf(d1) - K * Math.exp(-r * T) * normCdf(d2), delta: normCdf(d1) }
  }

  const strikes = Array.from({ length: 11 }, (_, i) => spot - 500 + i * 100)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Simulated NSE Option Chain
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Observe how the option chain changes with spot, DTE, and IV.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Nifty Spot = {spot}</span>
          <input type="range" min="20000" max="24000" step="50" value={spot}
            onChange={e => setSpot(Number(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>DTE = {expiry}</span>
          <input type="range" min="1" max="60" step="1" value={expiry}
            onChange={e => setExpiry(Number(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>IV = {(vol * 100).toFixed(0)}%</span>
          <input type="range" min="0.08" max="0.40" step="0.01" value={vol}
            onChange={e => setVol(Number(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="mx-auto text-xs border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-3 py-1 text-gray-600 dark:text-gray-400">Call</th>
              <th className="px-3 py-1 text-gray-600 dark:text-gray-400">Delta</th>
              <th className="px-3 py-1 text-gray-600 dark:text-gray-400">Strike</th>
              <th className="px-3 py-1 text-gray-600 dark:text-gray-400">Put</th>
              <th className="px-3 py-1 text-gray-600 dark:text-gray-400">OI (sim)</th>
            </tr>
          </thead>
          <tbody>
            {strikes.map(K => {
              const { call, delta } = bsm(spot, K)
              const put = call - spot + K * Math.exp(-r * T)
              const isATM = Math.abs(K - spot) <= 50
              return (
                <tr key={K} className={`border-b border-gray-200 dark:border-gray-700 ${isATM ? 'bg-indigo-50 dark:bg-indigo-900/30' : ''}`}>
                  <td className="px-3 py-1 text-right text-green-700 dark:text-green-400">{call.toFixed(1)}</td>
                  <td className="px-3 py-1 text-right text-gray-600 dark:text-gray-400">{delta.toFixed(2)}</td>
                  <td className="px-3 py-1 text-center font-bold text-gray-800 dark:text-gray-200">{K}</td>
                  <td className="px-3 py-1 text-right text-red-700 dark:text-red-400">{Math.max(put, 0.05).toFixed(1)}</td>
                  <td className="px-3 py-1 text-right text-gray-500">{(Math.random() * 100000 + 10000).toFixed(0)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function OptionsData() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Options Data for Backtesting
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Options backtesting requires fundamentally different data than equity backtesting. Instead
        of a single time series, you need a full option chain -- prices across multiple strikes,
        expiries, and option types -- at each timestamp. On NSE, this means handling millions of
        data points for Nifty and Bank Nifty options across weekly and monthly expiries.
      </p>

      <DefinitionBlock
        title="Option Chain Data"
        label="Definition 7.13"
        definition="An option chain is the complete set of listed call and put prices across all available strikes for a given underlying and expiry date. For backtesting, we need historical option chains -- snapshots of the full chain at each point in time."
        notation="\{C(K_i, T_j, t), P(K_i, T_j, t)\} \quad \forall \text{ strikes } K_i, \text{ expiries } T_j, \text{ timestamps } t"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        NSE Options Data Sources
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Source</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Frequency</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Cost</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Coverage</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">NSE Bhavcopy</td>
              <td className="px-4 py-2">Daily (EOD)</td>
              <td className="px-4 py-2">Free</td>
              <td className="px-4 py-2">Settlement prices, OI, volume</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">NSE tick data</td>
              <td className="px-4 py-2">Tick-by-tick</td>
              <td className="px-4 py-2">Paid (INR 5-20K/mo)</td>
              <td className="px-4 py-2">Full order book, trades</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Zerodha Kite API</td>
              <td className="px-4 py-2">1-min candles</td>
              <td className="px-4 py-2">INR 2000/mo</td>
              <td className="px-4 py-2">OHLCV, limited history</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Third-party vendors</td>
              <td className="px-4 py-2">Varies</td>
              <td className="px-4 py-2">INR 5-50K/mo</td>
              <td className="px-4 py-2">Cleaned, structured, Greeks</td>
            </tr>
          </tbody>
        </table>
      </div>

      <TheoremBlock
        title="No-Arbitrage Constraints on Option Data"
        label="Theorem 7.10"
        statement="Valid option chain data must satisfy: (1) Call prices decrease in strike: C(K_1) \geq C(K_2) if K_1 < K_2, (2) Convexity: C(K_1) - 2C(K_2) + C(K_3) \geq 0 for K_1 < K_2 < K_3 equally spaced, (3) Put-call parity: C - P = Se^{-qT} - Ke^{-rT} (within bid-ask). Violations indicate data errors or arbitrage opportunities."
        proof="These constraints follow from no-arbitrage pricing theory. Violation of (1) allows a bull spread arbitrage. Violation of (2) allows a butterfly arbitrage. Violation of (3) allows a conversion/reversal arbitrage. In practice, small violations occur due to bid-ask spreads and should be filtered during data cleaning."
      />

      <InteractiveOptionChain />

      <PythonCode
        title="options_data_pipeline.py"
        runnable
        code={`import numpy as np
from datetime import datetime, timedelta

# Simulate building an options data pipeline for Nifty
# In production, this would fetch from NSE bhavcopy or a vendor API

def generate_option_chain(spot, T, r, sigma_func, strikes):
    """Generate a synthetic option chain with realistic features."""
    from scipy.stats import norm

    chain = []
    for K in strikes:
        sigma = sigma_func(K, spot)
        sqrt_T = np.sqrt(T)
        d1 = (np.log(spot / K) + (r + sigma**2/2) * T) / (sigma * sqrt_T)
        d2 = d1 - sigma * sqrt_T

        call_mid = spot * norm.cdf(d1) - K * np.exp(-r*T) * norm.cdf(d2)
        put_mid = call_mid - spot + K * np.exp(-r*T)

        # Add realistic bid-ask spread (wider for OTM)
        moneyness = abs(np.log(K/spot))
        spread = max(0.5, 1.0 + moneyness * 50)

        # Simulate OI (higher for ATM)
        oi = int(50000 * np.exp(-moneyness * 20) + np.random.poisson(5000))
        volume = int(oi * np.random.uniform(0.1, 0.5))

        chain.append({
            'strike': K,
            'call_bid': max(0.05, call_mid - spread/2),
            'call_ask': call_mid + spread/2,
            'call_mid': call_mid,
            'put_bid': max(0.05, put_mid - spread/2),
            'put_ask': put_mid + spread/2,
            'put_mid': put_mid,
            'iv': sigma * 100,
            'oi': oi,
            'volume': volume,
        })
    return chain

# Generate chain
spot = 22000
r = 0.065
T = 15 / 365
strikes = np.arange(20500, 23600, 100)

# Realistic IV smile (skew)
def iv_func(K, S):
    m = np.log(K / S)
    return np.clip(0.18 - 0.12*m + 0.03*m**2, 0.08, 0.50)

chain = generate_option_chain(spot, T, r, iv_func, strikes)

print("=== Nifty 50 Option Chain (Simulated, 15 DTE) ===")
print(f"Spot: {spot:,} | DTE: 15")
print(f"\\n{'Strike':>8} {'Call Bid':>9} {'Call Ask':>9} {'IV':>6} "
      f"{'Put Bid':>9} {'Put Ask':>9} {'OI':>8}")
print("-" * 65)
for row in chain[::3]:  # every 3rd strike
    print(f"{row['strike']:>8.0f} {row['call_bid']:>9.1f} {row['call_ask']:>9.1f} "
          f"{row['iv']:>5.1f}% {row['put_bid']:>9.1f} {row['put_ask']:>9.1f} "
          f"{row['oi']:>8,}")

# Data quality checks
print(f"\\n=== Data Quality Checks ===")
calls = [r['call_mid'] for r in chain]
puts = [r['put_mid'] for r in chain]
stks = [r['strike'] for r in chain]

# Check monotonicity
mono_violations = sum(1 for i in range(len(calls)-1) if calls[i] < calls[i+1])
print(f"Call monotonicity violations: {mono_violations}")

# Check convexity (butterfly condition)
conv_violations = 0
for i in range(1, len(calls)-1):
    butterfly = calls[i-1] - 2*calls[i] + calls[i+1]
    if butterfly < -0.5:  # allow small tolerance
        conv_violations += 1
print(f"Convexity violations: {conv_violations}")

# Check put-call parity
parity_errors = []
for row in chain:
    parity = row['call_mid'] - row['put_mid'] - spot + row['strike'] * np.exp(-r*T)
    parity_errors.append(abs(parity))
print(f"Max put-call parity error: {max(parity_errors):.4f}")
print(f"Mean parity error: {np.mean(parity_errors):.4f}")
print(f"\\nData points: {len(chain)} strikes x 2 types = {len(chain)*2}")`}
      />

      <ExampleBlock
        title="Detecting Stale Quotes in NSE Data"
        difficulty="intermediate"
        problem="You notice that the Nifty 21000 PE has a last traded price of INR 8 but the theoretical value (BSM with current IV) is INR 2. The option has only 50 contracts of OI. Should you use this data point in your backtest?"
        solution={[
          {
            step: 'Check for staleness indicators',
            formula: '\\text{LTP} = 8, \\quad \\text{Theoretical} = 2, \\quad \\text{Ratio} = 4\\times',
            explanation: 'A 4x discrepancy between LTP and theoretical price is a strong staleness signal.',
          },
          {
            step: 'Check liquidity',
            formula: '\\text{OI} = 50 \\text{ contracts}, \\quad \\text{Volume} \\approx 0',
            explanation: 'Very low OI and zero volume confirm this is a stale quote from a previous session.',
          },
          {
            step: 'Decision',
            formula: '\\text{Exclude or use theoretical price}',
            explanation: 'Either exclude this strike from the backtest or replace with BSM-implied mid-price using the IV surface. Using stale quotes creates unrealistic fill assumptions and inflates backtest returns.',
          },
        ]}
      />

      <NoteBlock title="Data Storage for Options" type="tip">
        <p>
          NSE Nifty options generate ~500 strike-expiry combinations per day. With bid, ask, LTP,
          volume, OI for calls and puts, that is ~6,000 data points daily for EOD data. For
          minute-level data, multiply by 375 minutes per session = 2.25 million rows/day.
          Use columnar storage (Parquet) or time-series databases (InfluxDB, TimescaleDB).
          For Python backtesting, store data in HDF5 or Parquet and load using pandas with
          appropriate indexing on (date, strike, expiry, option_type).
        </p>
      </NoteBlock>

      <NoteBlock title="Common Data Pitfalls" type="warning">
        <p>
          Options backtesting data on NSE is plagued by: (1) stale last-traded prices for illiquid
          strikes, (2) missing data during market halts (circuit breakers), (3) lot size changes
          by SEBI (Nifty changed from 75 to 50 and back), (4) contract specification changes
          (European vs American, cash vs physical settlement), and (5) the introduction of weekly
          expiries in 2019. Always validate your data against these known structural breaks.
        </p>
      </NoteBlock>
    </div>
  )
}
