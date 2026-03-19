import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveAgentSimulation() {
  const [nFundamental, setNFundamental] = useState(30)
  const [nMomentum, setNMomentum] = useState(40)
  const [nNoise, setNNoise] = useState(30)
  const [marketImpact, setMarketImpact] = useState(0.1)

  const total = nFundamental + nMomentum + nNoise
  const fundamentalPct = (nFundamental / total * 100).toFixed(0)
  const momentumPct = (nMomentum / total * 100).toFixed(0)
  const noisePct = (nNoise / total * 100).toFixed(0)

  const basePrice = 22000
  const fundamentalValue = 22500
  const momentumBias = nMomentum > 40 ? 1.2 : nMomentum > 20 ? 0.5 : -0.3
  const noiseFactor = nNoise / 100 * 0.8
  const priceDev = (fundamentalPct / 100 * (fundamentalValue - basePrice) +
    momentumBias * 200 + noiseFactor * 150) * (1 - marketImpact)
  const currentPrice = basePrice + priceDev
  const volatility = (nNoise * 0.3 + nMomentum * 0.2 + marketImpact * 500) / total * 20
  const spread = (0.02 + nNoise * 0.001 + marketImpact * 0.05).toFixed(3)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: NSE Agent-Based Market Simulator
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust the mix of agent types and market impact to see how emergent price
        dynamics and volatility change in a simulated NSE order book.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Fundamental Agents = {nFundamental} ({fundamentalPct}%)</span>
          <input type="range" min="5" max="80" step="5" value={nFundamental}
            onChange={e => setNFundamental(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-blue-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Momentum Agents = {nMomentum} ({momentumPct}%)</span>
          <input type="range" min="5" max="80" step="5" value={nMomentum}
            onChange={e => setNMomentum(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-green-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Noise Agents = {nNoise} ({noisePct}%)</span>
          <input type="range" min="5" max="80" step="5" value={nNoise}
            onChange={e => setNNoise(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-red-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Market Impact = {(marketImpact * 100).toFixed(0)}%</span>
          <input type="range" min="0" max="0.5" step="0.05" value={marketImpact}
            onChange={e => setMarketImpact(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-purple-500" />
        </label>
      </div>

      <svg viewBox="0 0 520 200" className="w-full max-w-xl mx-auto block" aria-label="Agent-based simulation">
        <rect x="30" y="20" width={nFundamental / total * 200} height="20" fill="#3b82f6" opacity="0.6" rx="3" />
        <rect x={30 + nFundamental / total * 200} y="20" width={nMomentum / total * 200} height="20" fill="#22c55e" opacity="0.6" rx="3" />
        <rect x={30 + (nFundamental + nMomentum) / total * 200} y="20" width={nNoise / total * 200} height="20" fill="#ef4444" opacity="0.6" rx="3" />

        <text x="130" y="57" textAnchor="middle" className="text-[8px]" fill="#6b7280">Agent Mix</text>

        <line x1="240" y1="30" x2="280" y2="30" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#absArrow)" />
        <defs>
          <marker id="absArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#9ca3af" />
          </marker>
        </defs>

        <rect x="290" y="10" width="200" height="80" rx="8" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1" />
        <text x="390" y="28" textAnchor="middle" className="text-[9px] font-bold" fill="#374151">Emergent Properties</text>

        <text x="300" y="45" className="text-[8px]" fill="#6b7280">Price: INR {currentPrice.toFixed(0)}</text>
        <text x="300" y="58" className="text-[8px]" fill="#6b7280">Volatility: {volatility.toFixed(1)}%</text>
        <text x="300" y="71" className="text-[8px]" fill="#6b7280">Spread: {spread}%</text>
        <text x="300" y="84" className="text-[8px]" fill="#6b7280">Fair Value: INR {fundamentalValue}</text>

        <rect x="100" y="110" width="12" height="8" fill="#3b82f6" opacity="0.6" rx="1" />
        <text x="116" y="118" className="text-[8px]" fill="#6b7280">Fundamental (FII/DII)</text>
        <rect x="220" y="110" width="12" height="8" fill="#22c55e" opacity="0.6" rx="1" />
        <text x="236" y="118" className="text-[8px]" fill="#6b7280">Momentum (Algo)</text>
        <rect x="330" y="110" width="12" height="8" fill="#ef4444" opacity="0.6" rx="1" />
        <text x="346" y="118" className="text-[8px]" fill="#6b7280">Noise (Retail)</text>

        <text x="260" y="148" textAnchor="middle" className="text-[10px] font-bold"
          fill={currentPrice > fundamentalValue ? '#dc2626' : '#16a34a'}>
          {currentPrice > fundamentalValue ? 'OVERVALUED' : 'UNDERVALUED'} by {Math.abs(currentPrice - fundamentalValue).toFixed(0)} INR
        </text>

        <rect x="80" y="160" width="360" height="12" rx="6" fill="#e5e7eb" />
        <rect x="80" y="160"
          width={Math.min(360, Math.max(10, ((currentPrice - 21500) / 1500) * 360))}
          height="12" rx="6" fill={currentPrice > fundamentalValue ? '#ef4444' : '#22c55e'} opacity="0.5" />
        <text x="80" y="186" className="text-[7px]" fill="#9ca3af">21,500</text>
        <text x="440" y="186" textAnchor="end" className="text-[7px]" fill="#9ca3af">23,000</text>
      </svg>
    </div>
  )
}

export default function AgentBasedSimulation() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Agent-Based Market Simulation
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Agent-based models (ABMs) simulate financial markets as emergent phenomena
        arising from the interactions of heterogeneous traders. Unlike top-down
        models (GBM, GARCH), ABMs can reproduce complex market phenomena like flash
        crashes, bubbles, and liquidity crises. For Indian markets, ABMs are
        particularly useful for modeling the interplay between FIIs (Foreign
        Institutional Investors), DIIs (Domestic Institutional Investors), and the
        large retail investor base that characterizes NSE.
      </p>

      <DefinitionBlock
        title="Agent-Based Model (ABM)"
        label="Definition 8.10"
        definition="An agent-based model is a computational model that simulates a market as a system of autonomous agents, each with individual decision rules, interacting through a common order book or price mechanism. Aggregate market behavior (price, volume, volatility) emerges from the collective actions of these agents without being explicitly programmed."
        notation={<>Each agent <InlineMath math="a_i" /> has a demand function <InlineMath math="d_i(P_t, \mathcal{I}_t^i)" /> where <InlineMath math="\mathcal{I}_t^i" /> is the agent's private information set. Market clearing gives <InlineMath math="P_t^* = \arg\min_P |\sum_i d_i(P, \mathcal{I}_t^i)|" />.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Indian Market Agent Taxonomy
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The NSE ecosystem can be modelled with three canonical agent types that
        reflect the actual participant mix:
      </p>

      <BlockMath math="P_{t+1} = P_t + \frac{1}{\lambda} \left[\sum_{i \in \mathcal{F}} d_i^F + \sum_{j \in \mathcal{M}} d_j^M + \sum_{k \in \mathcal{N}} d_k^N\right]" />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Agent Type</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">NSE Analogue</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Decision Rule</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Market Share</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Fundamentalist</td>
              <td className="px-4 py-2">FII / DII</td>
              <td className="px-4 py-2"><InlineMath math="d_i = \alpha(V_t - P_t)" /></td>
              <td className="px-4 py-2">~45%</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Momentum</td>
              <td className="px-4 py-2">Algo / Prop</td>
              <td className="px-4 py-2"><InlineMath math="d_j = \beta \cdot \text{sgn}(\Delta P)" /></td>
              <td className="px-4 py-2">~25%</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Noise</td>
              <td className="px-4 py-2">Retail</td>
              <td className="px-4 py-2"><InlineMath math="d_k \sim \mathcal{N}(0, \sigma_k^2)" /></td>
              <td className="px-4 py-2">~30%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <TheoremBlock
        title="Price Convergence in ABM"
        label="Theorem 8.8"
        statement={<>In a market with <InlineMath math="n_F" /> fundamentalists with intensity <InlineMath math="\alpha" /> and <InlineMath math="n_M" /> momentum agents with intensity <InlineMath math="\beta" />, the price converges to fundamental value if and only if:</>}
        formula="n_F \alpha > n_M \beta"
        proof={<>The price update equation can be written as a linear recurrence: <InlineMath math="P_{t+1} - V = (1 - n_F\alpha/\lambda + n_M\beta/\lambda)(P_t - V) + \epsilon_t" />. For the deviation <InlineMath math="P_t - V" /> to converge to zero, the coefficient must have absolute value less than 1, which requires <InlineMath math="n_F\alpha > n_M\beta" />. When momentum agents dominate, prices diverge from fundamentals -- creating bubbles, as observed in Indian mid-cap rallies.</>}
      />

      <InteractiveAgentSimulation />

      <PythonCode
        title="agent_based_nse.py"
        runnable
        code={`import numpy as np

class Agent:
    """Base agent class for NSE simulation."""
    def __init__(self, agent_id, cash, agent_type):
        self.id = agent_id
        self.cash = cash
        self.type = agent_type
        self.position = 0

    def decide(self, price, history):
        raise NotImplementedError

class FundamentalAgent(Agent):
    """FII/DII-style value investor."""
    def __init__(self, agent_id, cash, fundamental_value, alpha=0.05):
        super().__init__(agent_id, cash, 'fundamental')
        self.fv = fundamental_value
        self.alpha = alpha

    def decide(self, price, history):
        deviation = (self.fv - price) / price
        return self.alpha * deviation

class MomentumAgent(Agent):
    """Algorithmic trend follower."""
    def __init__(self, agent_id, cash, lookback=20, beta=0.03):
        super().__init__(agent_id, cash, 'momentum')
        self.lookback = lookback
        self.beta = beta

    def decide(self, price, history):
        if len(history) < self.lookback:
            return 0.0
        trend = (price - history[-self.lookback]) / history[-self.lookback]
        return self.beta * np.sign(trend) * min(abs(trend) * 10, 1)

class NoiseAgent(Agent):
    """Retail trader with random behavior."""
    def __init__(self, agent_id, cash, sigma=0.02):
        super().__init__(agent_id, cash, 'noise')
        self.sigma = sigma

    def decide(self, price, history):
        return np.random.normal(0, self.sigma)

class NSEMarketSimulator:
    """Agent-based simulator for NSE-like market."""

    def __init__(self, initial_price, market_depth=1000):
        self.price = initial_price
        self.depth = market_depth
        self.agents = []
        self.history = [initial_price]

    def add_agents(self, agents):
        self.agents.extend(agents)

    def step(self):
        total_demand = 0
        for agent in self.agents:
            demand = agent.decide(self.price, self.history)
            total_demand += demand

        price_change = total_demand / self.depth * self.price
        self.price = max(self.price + price_change, 1)
        self.history.append(self.price)
        return self.price

    def run(self, n_steps):
        for _ in range(n_steps):
            self.step()
        return np.array(self.history)

# --- Demo ---
np.random.seed(42)
sim = NSEMarketSimulator(initial_price=22000, market_depth=500)

agents = []
for i in range(15):
    agents.append(FundamentalAgent(i, 1e8, 22500, alpha=0.06))
for i in range(15, 30):
    agents.append(FundamentalAgent(i, 5e7, 22200, alpha=0.04))
for i in range(30, 55):
    agents.append(MomentumAgent(i, 2e7, lookback=20, beta=0.025))
for i in range(55, 100):
    agents.append(NoiseAgent(i, 5e6, sigma=0.015))

sim.add_agents(agents)
prices = sim.run(252)
returns = np.diff(np.log(prices))

print("=== NSE Agent-Based Simulation ===")
print(f"Agents: {len(agents)} (15 FII + 15 DII + 25 Algo + 45 Retail)")
print(f"Initial price: INR {prices[0]:.0f}")
print(f"Final price:   INR {prices[-1]:.0f}")
print(f"Annual return: {(prices[-1]/prices[0] - 1)*100:.1f}%")
print(f"Annual vol:    {np.std(returns)*np.sqrt(252)*100:.1f}%")
print(f"Sharpe ratio:  {np.mean(returns)/np.std(returns)*np.sqrt(252):.2f}")
print(f"Max drawdown:  {(1 - np.min(prices/np.maximum.accumulate(prices)))*100:.1f}%")
print(f"Kurtosis:      {float(np.mean((returns - np.mean(returns))**4)/np.std(returns)**4):.2f}")

acf1 = np.corrcoef(returns[1:], returns[:-1])[0,1]
abs_acf1 = np.corrcoef(np.abs(returns[1:]), np.abs(returns[:-1]))[0,1]
print(f"\\n--- Stylized Facts ---")
print(f"Return ACF(1):     {acf1:.3f} (should be ~0)")
print(f"|Return| ACF(1):   {abs_acf1:.3f} (should be >0, vol clustering)")`}
      />

      <ExampleBlock
        title="FII Outflow Shock Simulation"
        difficulty="advanced"
        problem="In March 2020, FIIs sold INR 1.1 lakh crore of Indian equities. In our ABM with 15 FII agents (alpha=0.06), how does a sudden shift in FII fundamental value from 22,500 to 18,000 affect equilibrium price?"
        solution={[
          {
            step: 'Compute new FII demand at current price',
            formula: 'd_F = 15 \\times 0.06 \\times \\frac{18000 - 22000}{22000} = 15 \\times 0.06 \\times (-0.182) = -0.164',
            explanation: 'FIIs now see the market as overvalued and generate strong sell demand.',
          },
          {
            step: 'Find new equilibrium price',
            formula: 'P^* \\text{ s.t. } n_F\\alpha(V_{\\text{new}} - P^*) + n_M\\beta\\cdot\\text{sgn}(P^* - P_0) + 0 = 0',
            explanation: 'At equilibrium, total demand is zero. Momentum agents amplify the sell-off initially.',
          },
          {
            step: 'Approximate equilibrium',
            formula: 'P^* \\approx \\frac{n_F\\alpha V_{\\text{new}}}{n_F\\alpha + n_M\\beta} \\approx 19{,}200',
            explanation: 'The price overshoots and settles ~13% below, consistent with the actual Nifty COVID crash.',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Calibration to NSE Data
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Calibrating an ABM to real NSE data requires matching both aggregate statistics
        and participant-level behavior. SEBI publishes monthly participant activity
        data that provides ground truth for agent population mix:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Participant</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Cash Market %</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">F&O Market %</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Agent Type</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">FII</td>
              <td className="px-4 py-2">~17%</td>
              <td className="px-4 py-2">~15%</td>
              <td className="px-4 py-2">Fundamental</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">DII (MF + Insurance)</td>
              <td className="px-4 py-2">~12%</td>
              <td className="px-4 py-2">~5%</td>
              <td className="px-4 py-2">Fundamental</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Proprietary</td>
              <td className="px-4 py-2">~25%</td>
              <td className="px-4 py-2">~35%</td>
              <td className="px-4 py-2">Momentum/HFT</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Retail</td>
              <td className="px-4 py-2">~46%</td>
              <td className="px-4 py-2">~45%</td>
              <td className="px-4 py-2">Noise</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The calibration objective minimizes the distance between simulated and
        real market statistics. The loss function typically includes:
      </p>

      <BlockMath math="\mathcal{L}(\theta) = w_1 |\sigma_{\text{sim}} - \sigma_{\text{real}}|^2 + w_2 |\kappa_{\text{sim}} - \kappa_{\text{real}}|^2 + w_3 \sum_{l=1}^{10} |\rho_l^{\text{sim}} - \rho_l^{\text{real}}|^2" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\theta" /> includes agent intensities, population
        fractions, and market depth. The weights{' '}
        <InlineMath math="w_1, w_2, w_3" /> balance volatility matching, tail
        behavior, and autocorrelation structure respectively.
      </p>

      <NoteBlock title="Applications in Strategy Research" type="historical">
        <ul className="space-y-2">
          <li>
            <strong>Impact Estimation:</strong> Before deploying a large-cap Nifty strategy,
            simulate the ABM with your strategy as an additional agent to estimate your
            own market impact on prices and execution quality.
          </li>
          <li>
            <strong>Crowding Analysis:</strong> Model what happens when multiple momentum
            agents adopt similar strategies -- the ABM naturally shows diminishing returns
            and flash-crash risk from crowded trades.
          </li>
          <li>
            <strong>Regulatory Stress:</strong> Simulate SEBI interventions like short-selling
            bans, margin increases, or circuit limit changes by modifying agent constraints
            and observing emergent market behavior.
          </li>
        </ul>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Agent-based models provide a bottom-up simulation framework that naturally
          reproduces emergent market phenomena (fat tails, volatility clustering, crashes)
          without explicitly programming them. For Indian market strategy testing, ABMs
          are invaluable for simulating scenarios with no historical precedent -- such as
          simultaneous FII outflows with SEBI regulatory changes -- that statistical models
          cannot capture. The key calibration parameters are agent population mix (matching
          NSE participant data) and market depth (estimated from actual LOB data).
        </p>
      </NoteBlock>
    </div>
  )
}
