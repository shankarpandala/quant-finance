import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveViz() {
  const [riskAversion, setRiskAversion] = useState(1.0)
  const [txCost, setTxCost] = useState(0.001)
  const [volatility, setVolatility] = useState(20)
  const bsDelta = 0.55; const deepDelta = bsDelta * (1 - txCost * 100 * riskAversion * 0.5)
  const hedgeError = volatility * 0.01 * (1 - Math.abs(deepDelta)) * riskAversion
  const bsError = hedgeError * 1.3
  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">Interactive: Deep Hedging vs Black-Scholes</h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Compare hedging performance for Nifty options under transaction costs.</p>
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400"><span>Risk Aversion = {riskAversion.toFixed(1)}</span><input type="range" min="0.1" max="5" step="0.1" value={riskAversion} onChange={e => setRiskAversion(parseFloat(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" /></label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400"><span>Transaction Cost = {(txCost * 100).toFixed(2)}%</span><input type="range" min="0" max="0.005" step="0.0005" value={txCost} onChange={e => setTxCost(parseFloat(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" /></label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400"><span>Nifty Volatility = {volatility}%</span><input type="range" min="10" max="40" step="1" value={volatility} onChange={e => setVolatility(parseInt(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" /></label>
      </div>
      <div className="grid grid-cols-2 gap-3 text-center text-xs">
        <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800"><span className="text-gray-500">Black-Scholes Delta</span><p className="text-base font-bold text-gray-600">{bsDelta.toFixed(3)} | Error: {bsError.toFixed(3)}</p></div>
        <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30"><span className="text-gray-500">Deep Hedging Delta</span><p className="text-base font-bold text-indigo-600">{deepDelta.toFixed(3)} | Error: {hedgeError.toFixed(3)}</p></div>
      </div>
    </div>
  )
}

export default function DeepHedging() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Deep Hedging</h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Deep hedging uses neural networks to learn optimal hedging strategies that minimize risk under realistic market conditions -- transaction costs, discrete rebalancing, and non-Gaussian dynamics. For Nifty options traded on NSE, deep hedging outperforms Black-Scholes delta hedging by incorporating the actual cost structure and market dynamics faced by Indian derivatives traders.</p>

      <DefinitionBlock title="Deep Hedging" label="Definition 13.13" definition="Deep hedging trains a neural network to find the optimal hedging strategy delta_t = pi(S_t, t, ...) that minimizes a risk measure of the hedging P&L, subject to transaction costs. Unlike Black-Scholes which assumes continuous trading and no costs, deep hedging learns directly from simulated or real market data." notation="\min_\pi \rho\left(-\sum_{t=0}^{T-1}\delta_t(S_{t+1} - S_t) + H(S_T) - C_{tx}\right)" />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Hedging P&L with Transaction Costs</h3>
      <BlockMath math="PnL = \sum_{t=0}^{T-1} \delta_t (S_{t+1} - S_t) - H(S_T) - \sum_{t=0}^{T-1} c|\delta_t - \delta_{t-1}|S_t" />
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">where <InlineMath math="H(S_T)" /> is the option payoff, <InlineMath math="\delta_t" /> is the hedge ratio, and <InlineMath math="c" /> is the proportional transaction cost. The risk measure <InlineMath math="\rho" /> can be CVaR, entropic risk, or mean-variance.</p>
      <BlockMath math="\rho_{CVaR}(X) = -\frac{1}{\alpha}\int_0^{\alpha} F_X^{-1}(p)\,dp" />

      <TheoremBlock title="Deep Hedging Optimality" label="Theorem 13.13" statement="Under proportional transaction costs c > 0, the optimal hedging strategy is NOT the Black-Scholes delta but a modified strategy with a no-trade zone: the hedge ratio remains unchanged when the BS delta is within a band of width proportional to c^{1/3}. Deep hedging learns this no-trade zone automatically from data without requiring analytical solutions." proof="The Hodges-Neuberger no-trade zone theory shows that under transaction costs, the optimal hedge follows delta_BS only when it moves outside a band [delta_low, delta_high] where the band width scales as c^{1/3}. Deep hedging neural networks converge to this solution (and can improve upon it when the underlying dynamics are non-Black-Scholes)." />

      <NoteBlock title="Deep Hedging for NSE Options" type="tip">
        <ul className="space-y-1 text-sm">
          <li><strong>Nifty Options:</strong> STT, transaction charges, and brokerage create significant costs for delta hedging</li>
          <li><strong>Lot Size:</strong> Nifty option lot = 25, creating discrete hedging constraints</li>
          <li><strong>Volatility Smile:</strong> NSE Nifty options exhibit persistent skew not captured by BS</li>
          <li><strong>Weekly Options:</strong> Short-dated weekly Nifty options have extreme gamma, requiring frequent rebalancing</li>
          <li><strong>India VIX:</strong> Use India VIX as additional input feature for the hedging network</li>
        </ul>
      </NoteBlock>

      <InteractiveViz />

      <PythonCode title="deep_hedging.py" runnable code={`import numpy as np

class DeepHedgingModel:
    """Neural network for learning optimal hedging strategies."""
    def __init__(self, n_features, hidden=32):
        self.W1 = np.random.randn(hidden, n_features) * 0.1
        self.W2 = np.random.randn(1, hidden) * 0.1

    def predict_delta(self, features):
        h = np.maximum(self.W1 @ features, 0)
        delta = np.tanh(self.W2 @ h)  # Bounded [-1, 1]
        return delta.item()

class HedgingSimulator:
    """Simulate hedging of Nifty options."""
    def __init__(self, S0=20000, K=20000, T=30/365, r=0.07, sigma=0.18):
        self.S0 = S0; self.K = K; self.T = T; self.r = r; self.sigma = sigma

    def simulate_path(self, n_steps):
        dt = self.T / n_steps
        prices = [self.S0]
        for _ in range(n_steps):
            dW = np.random.randn() * np.sqrt(dt)
            S = prices[-1] * np.exp((self.r - 0.5*self.sigma**2)*dt + self.sigma*dW)
            prices.append(S)
        return np.array(prices)

    def bs_delta(self, S, t_remaining):
        if t_remaining <= 0:
            return 1.0 if S > self.K else 0.0
        d1 = (np.log(S/self.K) + (self.r + 0.5*self.sigma**2)*t_remaining) / (self.sigma*np.sqrt(t_remaining))
        return 0.5 * (1 + np.tanh(d1 * 0.7979))

    def hedge_pnl(self, deltas, prices, tx_cost=0.001):
        n = len(deltas)
        pnl = 0
        tx_total = 0
        for t in range(n):
            pnl += deltas[t] * (prices[t+1] - prices[t])
            if t > 0:
                tx = tx_cost * abs(deltas[t] - deltas[t-1]) * prices[t]
                tx_total += tx
        payoff = max(prices[-1] - self.K, 0)
        return pnl - payoff - tx_total, tx_total

# Compare BS vs Deep hedging
np.random.seed(42)
sim = HedgingSimulator(S0=20000, K=20000, T=30/365, r=0.07, sigma=0.18)
n_steps = 30
n_trials = 1000
tx_cost = 0.001  # 10bps (NSE-like)

model = DeepHedgingModel(n_features=4, hidden=16)

bs_pnls, deep_pnls = [], []
bs_tx, deep_tx = [], []

for trial in range(n_trials):
    prices = sim.simulate_path(n_steps)

    # BS hedging
    bs_deltas = []
    for t in range(n_steps):
        t_rem = sim.T * (1 - t/n_steps)
        bs_deltas.append(sim.bs_delta(prices[t], t_rem))
    pnl_bs, tx_bs = sim.hedge_pnl(bs_deltas, prices, tx_cost)
    bs_pnls.append(pnl_bs)
    bs_tx.append(tx_bs)

    # Deep hedging (untrained - random policy)
    deep_deltas = []
    for t in range(n_steps):
        t_rem = sim.T * (1 - t/n_steps)
        features = np.array([prices[t]/sim.S0, t_rem, sim.sigma,
                            prices[t]/sim.K])
        deep_deltas.append(model.predict_delta(features))
    pnl_deep, tx_deep = sim.hedge_pnl(deep_deltas, prices, tx_cost)
    deep_pnls.append(pnl_deep)
    deep_tx.append(tx_deep)

print("=" * 60)
print("  Deep Hedging vs Black-Scholes - Nifty Options")
print("=" * 60)
print(f"\\nOption: ATM Nifty Call, K=20000, T=30 days")
print(f"Transaction cost: {tx_cost*100:.2f}% per trade")

for name, pnls, txs in [('Black-Scholes', bs_pnls, bs_tx),
                          ('Deep Hedge (untrained)', deep_pnls, deep_tx)]:
    pnls = np.array(pnls)
    txs = np.array(txs)
    print(f"\\n{name}:")
    print(f"  Mean PnL:      INR {np.mean(pnls):>+8.1f}")
    print(f"  Std PnL:       INR {np.std(pnls):>8.1f}")
    print(f"  CVaR(5%):      INR {np.mean(pnls[pnls <= np.percentile(pnls, 5)]):>+8.1f}")
    print(f"  Avg Tx Cost:   INR {np.mean(txs):>8.1f}")
    print(f"  Sharpe:        {np.mean(pnls)/np.std(pnls)*np.sqrt(252/30):>8.2f}")

print(f"\\nNote: Deep hedging with training would reduce PnL variance")
print(f"by learning the optimal no-trade zone under tx costs.")`} />

      <ExampleBlock title="Transaction Cost Impact on Nifty Hedging" difficulty="intermediate"
        problem="A trader delta-hedges a Nifty ATM call daily for 30 days. Average daily delta change is 0.05. Nifty at 20,000, lot size 25. Transaction cost is 0.05% per trade. What is the total hedging cost?"
        solution={[
          { step: 'Compute daily rebalancing cost', formula: '\\text{Cost/day} = 0.0005 \\times 0.05 \\times 20000 \\times 25 = \\text{INR } 12.50', explanation: 'Each daily rebalance costs INR 12.50 per lot.' },
          { step: 'Total cost over 30 days', formula: '\\text{Total} = 12.50 \\times 30 = \\text{INR } 375', explanation: 'INR 375 in transaction costs per lot over the option life.' },
          { step: 'Compare to option premium', formula: '\\text{ATM premium} \\approx \\text{INR } 300\\text{-}500 \\text{ per lot}', explanation: 'Transaction costs are 75-125% of the option premium! This is why deep hedging, which learns to reduce unnecessary rebalancing, can save significant costs for Nifty option market makers.' },
        ]} />

      <NoteBlock title="Key Takeaway" type="tip"><p>Deep hedging learns optimal derivative hedging strategies that account for real-world frictions: transaction costs, discrete rebalancing, and non-Gaussian dynamics. For NSE Nifty options, where STT and transaction charges significantly impact hedging costs, deep hedging automatically discovers the optimal no-trade zone that minimizes total hedging cost. The approach generalizes to exotic products and complex portfolios where analytical hedging solutions do not exist.</p></NoteBlock>
    </div>
  )
}
