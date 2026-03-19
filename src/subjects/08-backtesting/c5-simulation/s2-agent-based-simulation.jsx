import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function ABMSimulator() {
  const [nTraders, setNTraders] = useState(100)
  const [fundamentalists, setFundamentalists] = useState(40)
  const [chartists, setChartists] = useState(40)
  const [noisePct, setNoisePct] = useState(20)
  const [steps, setSteps] = useState(200)

  const fundPct = fundamentalists
  const chartPct = chartists
  const noiseP = noisePct
  const fundamentalPrice = 100

  const prices = [100]
  for (let t = 1; t < steps; t++) {
    const prev = prices[t - 1]
    const prev2 = t > 1 ? prices[t - 2] : prev

    const fundDemand = (fundPct / 100) * nTraders * 0.01 * (fundamentalPrice - prev)
    const momentum = prev - prev2
    const chartDemand = (chartPct / 100) * nTraders * 0.02 * momentum
    const noiseDemand = (noiseP / 100) * nTraders * 0.5 * (Math.random() * 2 - 1)

    const totalDemand = fundDemand + chartDemand + noiseDemand
    const priceImpact = totalDemand / nTraders
    const next = Math.max(prev + priceImpact, 10)
    prices.push(next)
  }

  const maxP = Math.max(...prices)
  const minP = Math.min(...prices)
  const rangeP = maxP - minP || 1

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Agent-Based Market Simulator
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust the mix of fundamentalist, chartist, and noise traders to see how price dynamics change.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Traders: {nTraders}</span>
          <input type="range" min="20" max="500" step="10" value={nTraders}
            onChange={e => setNTraders(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Fundamentalists: {fundamentalists}%</span>
          <input type="range" min="0" max="80" step="5" value={fundamentalists}
            onChange={e => setFundamentalists(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-green-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Chartists: {chartists}%</span>
          <input type="range" min="0" max="80" step="5" value={chartists}
            onChange={e => setChartists(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-orange-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Noise: {noisePct}%</span>
          <input type="range" min="0" max="50" step="5" value={noisePct}
            onChange={e => setNoisePct(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-red-500" />
        </label>
      </div>

      <svg viewBox="0 0 600 200" className="w-full rounded-lg bg-gray-50 dark:bg-gray-800/50">
        <line x1="10" y1="0" x2="10" y2="190" stroke="#d1d5db" strokeWidth="0.5" />
        <line x1="10" y1="190" x2="590" y2="190" stroke="#d1d5db" strokeWidth="0.5" />
        <line x1="10" y1={190 - ((fundamentalPrice - minP) / rangeP) * 180}
          x2="590" y2={190 - ((fundamentalPrice - minP) / rangeP) * 180}
          stroke="#22c55e" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
        <polyline
          fill="none"
          stroke="#6366f1"
          strokeWidth="1.5"
          points={prices.map((v, i) => `${(i / (steps - 1)) * 580 + 10},${190 - ((v - minP) / rangeP) * 180}`).join(' ')}
        />
        <text x="300" y="198" textAnchor="middle" className="text-[9px]" fill="#9ca3af">Time Steps</text>
        <text x="595" y={190 - ((fundamentalPrice - minP) / rangeP) * 180 - 4} textAnchor="end" className="text-[9px]" fill="#22c55e">Fair Value</text>
      </svg>
    </div>
  )
}

export default function AgentBasedSimulation() {
  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
        Agent-Based Market Simulation
      </h2>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Agent-based models (ABMs) simulate markets from the bottom up — individual traders
        with heterogeneous strategies interact to produce emergent price dynamics. Unlike
        statistical models, ABMs can reproduce stylized facts like fat tails, volatility
        clustering, and flash crashes without explicitly programming them.
      </p>

      <DefinitionBlock
        title="Agent-Based Model (ABM)"
        definition="A computational model where autonomous agents (traders) interact according to defined rules, generating emergent market-level phenomena. Each agent has a strategy (fundamentalist, chartist, noise), wealth, and position constraints."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8">
        Agent Types in Financial Markets
      </h3>

      <p className="text-gray-700 dark:text-gray-300">
        A canonical ABM for stock markets (like NSE) includes three agent types:
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 my-4">
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
          <h4 className="font-semibold text-green-800 dark:text-green-300">Fundamentalists</h4>
          <p className="mt-1 text-sm text-green-700 dark:text-green-400">
            Trade based on deviation from fundamental value. Mean-reverting force.
          </p>
          <BlockMath math="d_i^F = \phi_i (P^* - P_t)" />
        </div>
        <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-800 dark:bg-orange-900/20">
          <h4 className="font-semibold text-orange-800 dark:text-orange-300">Chartists</h4>
          <p className="mt-1 text-sm text-orange-700 dark:text-orange-400">
            Follow trends and momentum. Destabilizing, positive feedback.
          </p>
          <BlockMath math="d_i^C = \chi_i (P_t - P_{t-1})" />
        </div>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
          <h4 className="font-semibold text-red-800 dark:text-red-300">Noise Traders</h4>
          <p className="mt-1 text-sm text-red-700 dark:text-red-400">
            Random demand. Provide liquidity but add noise.
          </p>
          <BlockMath math="d_i^N \sim \mathcal{N}(0, \sigma_N^2)" />
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8">
        Price Formation Mechanism
      </h3>

      <p className="text-gray-700 dark:text-gray-300">
        The market-clearing price is set by aggregate excess demand through a market maker:
      </p>

      <BlockMath math="P_{t+1} = P_t + \lambda \sum_{i=1}^{N} d_i(t) + \epsilon_t" />

      <p className="text-gray-700 dark:text-gray-300">
        where <InlineMath math="\lambda" /> is the market maker's price impact parameter
        (analogous to Kyle's lambda) and <InlineMath math="\epsilon_t" /> is microstructure noise.
      </p>

      <ABMSimulator />

      <TheoremBlock
        title="Emergent Properties of ABMs"
        statement="A market with fundamentalist and chartist agents can produce fat-tailed return distributions, volatility clustering, and long memory in absolute returns — even when individual agents use simple linear rules. The interaction and switching between strategies creates complex dynamics."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8">
        Implementation: NSE Market Simulator
      </h3>

      <PythonCode
        title="Agent-Based NSE Market Simulator"
        code={`import numpy as np
import pandas as pd

class Agent:
    def __init__(self, agent_type, wealth=100000, aggressiveness=None):
        self.type = agent_type
        self.wealth = wealth
        self.position = 0
        self.aggressiveness = aggressiveness or np.random.uniform(0.01, 0.05)

    def demand(self, price, prev_price, fundamental_price):
        if self.type == 'fundamentalist':
            return self.aggressiveness * (fundamental_price - price)
        elif self.type == 'chartist':
            return self.aggressiveness * 2 * (price - prev_price)
        else:  # noise
            return np.random.normal(0, self.aggressiveness * price * 0.01)

class NSEMarketSimulator:
    def __init__(self, n_fundamentalists=40, n_chartists=30,
                 n_noise=30, fundamental_price=22000,
                 price_impact=0.0001):
        self.agents = []
        for _ in range(n_fundamentalists):
            self.agents.append(Agent('fundamentalist'))
        for _ in range(n_chartists):
            self.agents.append(Agent('chartist'))
        for _ in range(n_noise):
            self.agents.append(Agent('noise'))

        self.fundamental_price = fundamental_price
        self.price_impact = price_impact

    def simulate(self, n_days=504, initial_price=22000):
        prices = [initial_price]
        volumes = []

        for t in range(1, n_days):
            price = prices[-1]
            prev_price = prices[-2] if len(prices) > 1 else price

            # Compute aggregate demand
            total_demand = 0
            volume = 0
            for agent in self.agents:
                d = agent.demand(price, prev_price,
                               self.fundamental_price)
                total_demand += d
                volume += abs(d)

            # Price update with impact
            new_price = price + self.price_impact * total_demand
            new_price = max(new_price, price * 0.80)  # Circuit breaker
            new_price = min(new_price, price * 1.20)

            prices.append(new_price)
            volumes.append(volume)

        return pd.DataFrame({
            'price': prices,
            'returns': pd.Series(prices).pct_change(),
        })

# Run simulation
sim = NSEMarketSimulator()
results = sim.simulate(n_days=504)

# Analyze stylized facts
returns = results['returns'].dropna()
print(f"Mean daily return: {returns.mean():.4%}")
print(f"Daily vol: {returns.std():.4%}")
print(f"Annualized vol: {returns.std() * np.sqrt(252):.2%}")
print(f"Skewness: {returns.skew():.3f}")
print(f"Kurtosis: {returns.kurtosis():.3f}")
print(f"Min return: {returns.min():.2%}")
print(f"Max return: {returns.max():.2%}")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8">
        Strategy Switching & Herding
      </h3>

      <p className="text-gray-700 dark:text-gray-300">
        A key feature of realistic ABMs is that agents can switch strategies based on
        recent performance — a successful chartist strategy attracts followers, creating
        momentum bubbles, while fundamentalists eventually correct mispricing:
      </p>

      <BlockMath math="P(\text{switch to } k) = \frac{\exp(\beta \cdot \pi_k)}{\sum_j \exp(\beta \cdot \pi_j)}" />

      <p className="text-gray-700 dark:text-gray-300">
        where <InlineMath math="\pi_k" /> is the recent profitability of strategy <InlineMath math="k" />
        and <InlineMath math="\beta" /> controls the intensity of switching (herding parameter).
        Higher <InlineMath math="\beta" /> leads to more herding and larger bubbles/crashes.
      </p>

      <ExampleBlock
        title="Calibrating ABM to NSE Data"
        problem="Calibrate an ABM to match Nifty 50 stylized facts: annual vol ~16%, kurtosis ~5, negative skewness."
        solution={[
          { step: 'Set fundamentalists', formula: 'n_F = 40,\; \\phi \\sim U(0.01, 0.03)', explanation: '40% fundamentalists provide stability' },
          { step: 'Set chartists', formula: 'n_C = 35,\; \\chi \\sim U(0.02, 0.06)', explanation: '35% chartists create momentum and vol clustering' },
          { step: 'Set noise', formula: 'n_N = 25,\; \\sigma_N = 0.5\\%', explanation: '25% noise traders add randomness' },
          { step: 'Tune impact', formula: '\\lambda = 0.0001', explanation: 'Price impact tuned to match realized vol' },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8">
        Applications for Strategy Testing
      </h3>

      <NoteBlock type="tip" title="Using ABMs for Strategy Stress Testing">
        <ul className="list-disc pl-4 space-y-1 text-sm">
          <li><strong>Flash crash scenarios:</strong> Increase chartist fraction to simulate cascading sell-offs</li>
          <li><strong>Liquidity crises:</strong> Remove noise traders to simulate FII outflows from India</li>
          <li><strong>Regime changes:</strong> Shift fundamental price to simulate RBI policy surprises</li>
          <li><strong>Crowding effects:</strong> Add many agents with the same strategy to test capacity limits</li>
          <li><strong>Circuit breaker testing:</strong> NSE 5%/10%/20% limits affect price discovery</li>
        </ul>
      </NoteBlock>

      <NoteBlock type="note" title="India-Specific ABM Considerations">
        <p className="text-sm">
          Indian market ABMs should incorporate: FII/DII flow dynamics (FIIs as momentum traders,
          DIIs as contrarians), SEBI circuit breaker rules, T+1 settlement effects,
          derivative expiry-driven gamma exposure, and RBI intervention in currency markets
          affecting equity flows. The Nifty 50 microstructure with co-located HFT participants
          adds another layer of agent heterogeneity.
        </p>
      </NoteBlock>
    </div>
  )
}
