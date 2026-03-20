import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractivePutCallParity() {
  const [spot, setSpot] = useState(22000)
  const [strike, setStrike] = useState(22000)
  const [callPrem, setCallPrem] = useState(300)


  const T = 0.083
  const r = 0.065
  const putTheory = callPrem - spot + strike * Math.exp(-r * T)
  const parity = callPrem - putTheory - spot + strike * Math.exp(-r * T)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Put-Call Parity Checker for Nifty Options
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Verify put-call parity across Nifty strikes. Deviations indicate arbitrage opportunities.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Nifty Spot: {spot}</span>
          <input type="range" min="20000" max="24000" step="100" value={spot}
            onChange={e => setSpot(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Strike: {strike}</span>
          <input type="range" min="20000" max="24000" step="100" value={strike}
            onChange={e => setStrike(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Call Premium: {callPrem}</span>
          <input type="range" min="50" max="800" step="10" value={callPrem}
            onChange={e => setCallPrem(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">

        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <p className="text-xs text-gray-500">Theoretical Put</p>
          <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{typeof putTheory === 'number' ? putTheory.toFixed(2) : putTheory} INR</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <p className="text-xs text-gray-500">Parity Check</p>
          <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{typeof parity === 'number' ? parity.toFixed(2) : parity} INR</p>
        </div>
      </div>
    </div>
  )
}

export default function PutCallParity() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Put-Call Parity: American vs European on NSE
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Put-call parity is a fundamental relationship connecting European call and put prices. On the NSE, where Nifty options are European-style, put-call parity holds precisely (up to transaction costs). For individual stock options, which are American-style on NSE, the relationship becomes an inequality, creating different pricing dynamics.
      </p>

      <DefinitionBlock
        title="Put-Call Parity"
        label="Definition 6.2"
        definition="For European options on the same underlying with the same strike and expiry, put-call parity states that the difference between call and put prices equals the difference between the current stock price and the present value of the strike price."
        notation="C - P = S - Ke^{-rT}"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Mathematical Framework
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The fundamental put-call parity relationship for European options:
      </p>

      <BlockMath math="C - P = S - Ke^{-rT}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For American options (individual NSE stock options), parity becomes a bound:
      </p>

      <BlockMath math="S - K \leq C - P \leq S - Ke^{-rT}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Put-call parity implies synthetic positions. A conversion (long stock + long put + short call) creates a risk-free bond:
      </p>

      <BlockMath math="\text{Conversion: Long Stock + Long Put + Short Call} = Ke^{-rT}" />

      <TheoremBlock
        title="No-Arbitrage Put-Call Parity"
        label="Theorem 6.2"
        statement={<>If put-call parity is violated, a riskless arbitrage exists. Specifically, if $C - P > S - Ke^{-rT}$, sell the call, buy the put, buy the stock, and borrow $Ke^{-rT}$ to earn a riskless profit. If $C - P < S - Ke^{-rT}$, buy the call, sell the put, short the stock, and lend $Ke^{-rT}$. The profit equals the magnitude of the parity violation minus transaction costs.</>}
      />

      <InteractivePutCallParity />

      <PythonCode
        title="put_call_parity_nse.py"
        runnable
        code={`import numpy as np
from scipy.stats import norm

def bsm(S, K, T, r, sigma, opt='call'):
    d1 = (np.log(S/K) + (r + sigma**2/2)*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    if opt == 'call':
        return S * norm.cdf(d1) - K * np.exp(-r*T) * norm.cdf(d2)
    return K * np.exp(-r*T) * norm.cdf(-d2) - S * norm.cdf(-d1)

# Nifty 50 Put-Call Parity Analysis
S = 22000
T = 30/365
r = 0.065
sigma = 0.14

print("=== Put-Call Parity: Nifty 50 Options ===\n")
print(f"{'Strike':<8} {'Call':<10} {'Put':<10} {'C-P':<10} {'S-Ke^-rT':<12} {'Deviation':<10}")

for K in range(21000, 23100, 200):
    call = bsm(S, K, T, r, sigma, 'call')
    put = bsm(S, K, T, r, sigma, 'put')
    lhs = call - put
    rhs = S - K * np.exp(-r * T)
    deviation = lhs - rhs
    print(f"{K:<8} {call:<10.2f} {put:<10.2f} {lhs:<10.2f} {rhs:<12.2f} {deviation:<10.6f}")

# Arbitrage check with transaction costs
print(f"\n=== Arbitrage Analysis (with NSE costs) ===")
lot_size = 25
stt_rate = 0.0625 / 100  # STT on options exercise
brokerage = 20  # INR per leg

# Simulated market prices (slightly off parity)
market_call = 310
market_put = 295
K_test = 22000

parity_call = market_put + S - K_test * np.exp(-r * T)
parity_put = market_call - S + K_test * np.exp(-r * T)

print(f"Market Call: {market_call:.2f}, Parity Call: {parity_call:.2f}")
print(f"Market Put: {market_put:.2f}, Parity Put: {parity_put:.2f}")

mispricing = market_call - market_put - (S - K_test * np.exp(-r * T))
costs = (stt_rate * S + brokerage * 4 / lot_size)
print(f"\nMispricing: {mispricing:.2f} INR per unit")
print(f"Transaction costs: {costs:.2f} INR per unit")
print(f"Net arbitrage: {abs(mispricing) - costs:.2f} INR per unit")
print(f"{'PROFITABLE' if abs(mispricing) > costs else 'NOT profitable after costs'}")

# American vs European options on NSE
print(f"\n=== American vs European Options on NSE ===")
print(f"{'Type':<25} {'Style':<12} {'Parity':<20}")
print(f"{'Nifty options':<25} {'European':<12} {'Exact equality':<20}")
print(f"{'Bank Nifty options':<25} {'European':<12} {'Exact equality':<20}")
print(f"{'Stock options':<25} {'American':<12} {'Inequality bounds':<20}")
print(f"\nNote: Early exercise premium for American puts on")
print(f"high-dividend stocks can be significant near ex-dates.")
`}
      />

      <ExampleBlock
        title="Conversion Arbitrage on NSE"
        difficulty="advanced"
        problem="Nifty 22000 CE trades at 320, 22000 PE trades at 280. Nifty spot is 22,000, r=6.5%, T=30 days. Is there an arbitrage?"
        solution={[
          {
            step: 'Compute theoretical put-call parity',
            formula: 'C - P = S - Ke^{-rT} = 22000 - 22000 \times e^{-0.065 \times 0.0833} = 22000 - 21880.8 = 119.2',
            explanation: '',
          },
          {
            step: 'Check market prices',
            formula: 'C_{market} - P_{market} = 320 - 280 = 40',
            explanation: '',
          },
          {
            step: 'Identify mispricing',
            formula: '\text{Mispricing} = 119.2 - 40 = 79.2 \text{ INR/unit}',
            explanation: 'The call is underpriced or put is overpriced relative to parity. Execute a reverse conversion: buy call, sell put, short Nifty futures.',
          },
        ]}
      />

      <NoteBlock title="Important Considerations" type="warning">
        <p>
          On the NSE, stock options are American-style, which means early exercise is possible. The put-call parity for American options is only a bound, not an equality. For deep ITM puts near dividend dates, early exercise can be optimal, breaking the European parity relationship. Always check the ex-dividend calendar before trading parity arbitrage on individual stocks.
        </p>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Put-call parity is the most fundamental no-arbitrage relationship in options. For NSE Nifty options (European), it holds exactly up to bid-ask spreads and STT. Violations exceeding transaction costs represent risk-free profit. In practice, market makers monitor parity across all strikes continuously, so profitable arbitrage windows are fleeting and require co-located systems.
        </p>
      </NoteBlock>
    </div>
  )
}
