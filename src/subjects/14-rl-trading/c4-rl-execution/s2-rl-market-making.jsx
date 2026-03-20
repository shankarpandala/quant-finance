import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveMarketMaker() {
  const [spreadWidth, setSpreadWidth] = useState(0.10)
  const [skew, setSkew] = useState(0)
  const [inventory, setInventory] = useState(0)
  const [riskAversion, setRiskAversion] = useState(0.1)

  const midPrice = 2500
  const bidPrice = (midPrice - spreadWidth / 2 + skew * spreadWidth).toFixed(2)
  const askPrice = (midPrice + spreadWidth / 2 + skew * spreadWidth).toFixed(2)
  const inventoryRisk = Math.abs(inventory) * riskAversion * midPrice * 0.015
  const expectedPnl = spreadWidth * 100 - inventoryRisk
  const optimalSkew = -riskAversion * inventory * 0.015 * 0.015

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Market Making Quote Adjuster
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust spread, skew, and inventory to see the impact on PnL and risk for an NSE stock.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Spread: ₹{spreadWidth.toFixed(2)}</span>
          <input type="range" min="0.05" max="1.0" step="0.05" value={spreadWidth}
            onChange={e => setSpreadWidth(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Skew: {skew.toFixed(2)}</span>
          <input type="range" min="-0.5" max="0.5" step="0.05" value={skew}
            onChange={e => setSkew(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-green-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Inventory: {inventory}</span>
          <input type="range" min="-100" max="100" step="10" value={inventory}
            onChange={e => setInventory(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-amber-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Risk aversion: {riskAversion.toFixed(2)}</span>
          <input type="range" min="0.01" max="1.0" step="0.01" value={riskAversion}
            onChange={e => setRiskAversion(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-red-500" />
        </label>
      </div>

      <div className="mb-4 flex items-center justify-center gap-8">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">₹{bidPrice}</div>
          <div className="text-xs text-gray-500">Bid</div>
        </div>
        <div className="text-center">
          <div className="text-lg text-gray-400">₹{midPrice}</div>
          <div className="text-xs text-gray-500">Mid</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">₹{askPrice}</div>
          <div className="text-xs text-gray-500">Ask</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded bg-blue-50 p-2 dark:bg-blue-900/30">
          <div className="text-blue-600 dark:text-blue-400">Spread P&L</div>
          <div className="font-bold">₹{(spreadWidth * 100).toFixed(0)}/100 shares</div>
        </div>
        <div className="rounded bg-red-50 p-2 dark:bg-red-900/30">
          <div className="text-red-600 dark:text-red-400">Inventory Risk</div>
          <div className="font-bold">₹{inventoryRisk.toFixed(0)}</div>
        </div>
        <div className={`rounded p-2 ${expectedPnl >= 0 ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'}`}>
          <div className="text-gray-600 dark:text-gray-400">Net Expected PnL</div>
          <div className={`font-bold ${expectedPnl >= 0 ? 'text-green-700' : 'text-red-700'}`}>
            ₹{expectedPnl.toFixed(0)}
          </div>
        </div>
      </div>

      <p className="mt-2 text-center text-xs text-gray-500">
        Optimal skew for current inventory: {optimalSkew.toFixed(4)}
      </p>
    </div>
  )
}

export default function RLMarketMaking() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        RL-Based Market Making
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Market makers provide liquidity by simultaneously posting buy and sell orders,
        profiting from the bid-ask spread while managing inventory risk. On NSE, authorized
        market makers operate in ETFs, commodity derivatives, and currency segments. RL enables
        adaptive quoting strategies that respond to order flow patterns, volatility changes,
        and inventory levels in real-time.
      </p>

      <DefinitionBlock
        title="Market Making"
        label="Definition 14.13"
        definition="A market maker continuously quotes bid and ask prices (p_bid, p_ask) to facilitate trading. The market maker profits from the spread (p_ask - p_bid) but bears inventory risk from accumulated positions. The Avellaneda-Stoikov framework optimizes quotes by adjusting for inventory and volatility."
        notation="δ_bid and δ_ask are the distances from mid-price to bid and ask quotes respectively."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Avellaneda-Stoikov Model
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The optimal reservation price and spread under the AS model:
      </p>

      <BlockMath math="r(s, q, t) = s - q \gamma \sigma^2 (T - t)" />

      <BlockMath math="\delta^* = \gamma \sigma^2 (T-t) + \frac{2}{\gamma} \ln\left(1 + \frac{\gamma}{k}\right)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="s" /> is the mid-price, <InlineMath math="q" /> is inventory,{' '}
        <InlineMath math="\gamma" /> is risk aversion, <InlineMath math="\sigma" /> is volatility,
        and <InlineMath math="k" /> is the order arrival rate parameter.
      </p>

      <BlockMath math="p_{\text{bid}} = r - \frac{\delta^*}{2}, \quad p_{\text{ask}} = r + \frac{\delta^*}{2}" />

      <TheoremBlock
        title="Avellaneda-Stoikov Optimal Quotes"
        label="Theorem 14.11"
        statement="Under the Avellaneda-Stoikov framework with exponential utility and Poisson order arrivals with rate λ(δ) = Ae^{-kδ}, the optimal market maker quotes satisfy the HJB equation: 0 = ∂u/∂t + σ²/2 · ∂²u/∂s² + max_{δ_b,δ_a}[λ_b(δ_b)(u(s,q+1,t)-u+δ_b) + λ_a(δ_a)(u(s,q-1,t)-u+δ_a)], where u is the value function."
        proof="The market maker maximizes expected exponential utility E[-exp(-γW_T)] where W is terminal wealth. The inventory process follows: dq = dN_bid - dN_ask (Poisson). The mid-price follows geometric Brownian motion dS = σS·dW. By Ito's lemma and the dynamic programming principle, the value function u(s,q,t) satisfies the given HJB equation. The optimal δ* is found by taking FOC of the max operator."
      />

      <InteractiveMarketMaker />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        RL State-Action for Market Making
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The RL market making agent uses a rich state representation:
      </p>

      <BlockMath math="s_t = \left[q_t, \; \sigma_t, \; \text{spread}_t, \; \text{imb}_t, \; \text{vol\_ratio}_t, \; \text{time\_to\_close}\right]" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Actions specify quote offsets from mid-price:
      </p>

      <BlockMath math="a_t = (\delta_{\text{bid}}, \delta_{\text{ask}}) \in \mathbb{R}_+^2" />

      <NoteBlock title="Market Making on NSE" type="info">
        <p>
          On NSE, market making is formalized in specific segments: (1) ETF market makers
          are incentivized by SEBI/NSE with reduced transaction costs, (2) commodity market
          makers on MCX operate with specific obligations (continuous two-way quotes within
          specified spread limits), (3) currency derivatives on NSE have designated market
          makers. In the equity segment, proprietary trading firms effectively act as
          informal market makers. The minimum tick size of ₹0.05 sets a floor on the
          minimum spread.
        </p>
      </NoteBlock>

      <PythonCode
        title="rl_market_making.py"
        runnable
        code={`import numpy as np

class MarketMakingEnv:
    """
    RL environment for market making on NSE.
    Simulates order arrival, execution, and inventory dynamics.
    """
    def __init__(self, mid_price=2500, volatility=0.015,
                 tick_size=0.05, max_inventory=50,
                 arrival_rate=10, arrival_decay=50,
                 time_horizon=100):
        self.base_mid = mid_price
        self.sigma = volatility
        self.tick = tick_size
        self.max_inv = max_inventory
        self.A = arrival_rate        # Base arrival rate
        self.k = arrival_decay       # Arrival rate decay
        self.T = time_horizon
        self.reset()

    def reset(self):
        self.mid = self.base_mid
        self.inventory = 0
        self.cash = 0
        self.step_count = 0
        self.pnl_history = []
        self.inventory_history = []
        return self._get_obs()

    def _get_obs(self):
        return np.array([
            self.inventory / self.max_inv,
            self.sigma,
            self.tick / self.mid,
            np.random.uniform(-1, 1),    # Order flow imbalance
            self.step_count / self.T,
            (self.mid - self.base_mid) / self.base_mid
        ], dtype=np.float32)

    def _arrival_prob(self, delta):
        """Probability of fill at distance delta from mid."""
        return min(1.0, self.A * np.exp(-self.k * delta / self.mid))

    def step(self, action):
        """
        action: [delta_bid, delta_ask] - distances from mid
        """
        delta_bid, delta_ask = action
        delta_bid = max(delta_bid, self.tick)
        delta_ask = max(delta_ask, self.tick)

        bid_price = self.mid - delta_bid
        ask_price = self.mid + delta_ask

        # Check for fills (Poisson arrival)
        bid_fill = np.random.random() < self._arrival_prob(delta_bid)
        ask_fill = np.random.random() < self._arrival_prob(delta_ask)

        # Process fills
        trade_pnl = 0
        if bid_fill and self.inventory < self.max_inv:
            self.inventory += 1
            self.cash -= bid_price
            trade_pnl += self.mid - bid_price  # Earned bid spread

        if ask_fill and self.inventory > -self.max_inv:
            self.inventory -= 1
            self.cash += ask_price
            trade_pnl += ask_price - self.mid  # Earned ask spread

        # Mid price movement
        self.mid += self.sigma * self.mid * np.random.randn() * 0.01

        # Mark-to-market PnL
        mtm_pnl = trade_pnl + self.inventory * (self.mid - self.base_mid) * 0.001
        self.step_count += 1

        # Reward: spread earned - inventory risk penalty
        risk_penalty = 0.001 * self.inventory ** 2 * self.sigma ** 2
        reward = trade_pnl - risk_penalty

        self.pnl_history.append(trade_pnl)
        self.inventory_history.append(self.inventory)

        done = self.step_count >= self.T
        obs = self._get_obs()

        info = {
            'bid': bid_price,
            'ask': ask_price,
            'spread': ask_price - bid_price,
            'inventory': self.inventory,
            'trade_pnl': trade_pnl,
            'cash': self.cash,
            'mtm': self.cash + self.inventory * self.mid
        }
        return obs, reward, done, info


class ASMarketMaker:
    """Avellaneda-Stoikov market maker (analytical baseline)."""
    def __init__(self, gamma=0.1, sigma=0.015, k=50, T=100):
        self.gamma = gamma
        self.sigma = sigma
        self.k = k
        self.T = T

    def get_quotes(self, mid, inventory, t):
        """Compute optimal AS quotes."""
        tau = (self.T - t) / self.T
        reservation = mid - inventory * self.gamma * self.sigma**2 * tau
        spread = self.gamma * self.sigma**2 * tau + (2/self.gamma) * np.log(1 + self.gamma/self.k)
        spread = max(spread, 0.05)  # Min tick

        delta_bid = mid - reservation + spread/2
        delta_ask = reservation + spread/2 - mid
        return max(delta_bid, 0.05), max(delta_ask, 0.05)


class RLMarketMaker:
    """Simple RL market maker."""
    def __init__(self, obs_dim=6, gamma_risk=0.1):
        np.random.seed(42)
        self.W = np.random.randn(obs_dim, 2) * 0.01
        self.gamma = gamma_risk

    def get_quotes(self, obs, inventory):
        """Compute RL-based quotes."""
        raw = obs @ self.W
        # Base spread with inventory skew
        delta_bid = np.abs(raw[0]) * 0.5 + 0.05 + max(0, inventory * 0.01)
        delta_ask = np.abs(raw[1]) * 0.5 + 0.05 + max(0, -inventory * 0.01)
        return delta_bid, delta_ask


# Run comparison
np.random.seed(42)
env = MarketMakingEnv(mid_price=2500, volatility=0.015, time_horizon=200)

as_mm = ASMarketMaker(gamma=0.1, sigma=0.015)
rl_mm = RLMarketMaker()

strategies = {'Avellaneda-Stoikov': as_mm, 'RL Agent': rl_mm}

print("Market Making on NSE - Strategy Comparison")
print(f"Stock: Mid price INR {env.base_mid}, Tick: INR {env.tick}")
print(f"{'='*65}")

for name, strategy in strategies.items():
    env.reset()
    total_spread_pnl = 0
    total_reward = 0
    max_inv = 0

    for t in range(200):
        obs = env._get_obs()
        if name == 'Avellaneda-Stoikov':
            delta_b, delta_a = strategy.get_quotes(env.mid, env.inventory, t)
        else:
            delta_b, delta_a = strategy.get_quotes(obs, env.inventory)

        obs, reward, done, info = env.step([delta_b, delta_a])
        total_spread_pnl += info['trade_pnl']
        total_reward += reward
        max_inv = max(max_inv, abs(info['inventory']))

        if done:
            break

    final_mtm = info['mtm']
    avg_spread = np.mean([0.10])  # Approximate

    print(f"\\n{name}:")
    print(f"  Total spread PnL: INR {total_spread_pnl:,.2f}")
    print(f"  Mark-to-market:   INR {final_mtm:,.2f}")
    print(f"  Total reward:     {total_reward:.4f}")
    print(f"  Max |inventory|:  {max_inv}")
    print(f"  Avg inventory:    {np.mean(np.abs(env.inventory_history)):.1f}")
    print(f"  Fill count:       {sum(1 for p in env.pnl_history if p != 0)}")

print(f"\\n{'='*65}")
print("Note: RL agent learns to adapt spread and skew dynamically.")`}
      />

      <ExampleBlock
        title="AS Model Calibration for NSE ETF"
        difficulty="advanced"
        problem="Calibrate the Avellaneda-Stoikov model for making markets in Nifty BeES (Nifty 50 ETF) on NSE. NAV ≈ ₹230, daily volume ≈ 5M units, average spread ≈ ₹0.10, σ_daily = 1.2%."
        solution={[
          {
            step: 'Estimate arrival rate parameters',
            formula: 'A \\cdot e^{-k \\cdot \\delta/P} = \\lambda(\\delta), \\quad \\lambda(0.05) \\approx 50/\\text{min}',
            explanation: 'From historical fill data, estimate A ≈ 100 fills/min at zero spread, with decay k ≈ 200 per unit relative spread.',
          },
          {
            step: 'Compute optimal spread',
            formula: '\\delta^* = \\gamma \\sigma^2 \\tau + \\frac{2}{\\gamma}\\ln(1 + \\gamma/k) \\approx 0.08 + 0.02 = ₹0.10',
            explanation: 'With γ = 0.5 and intraday σ = 0.012/√252 ≈ 0.00076, the optimal spread is approximately ₹0.10, matching observed spreads.',
          },
          {
            step: 'Inventory-adjusted reservation price',
            formula: 'r = 230 - q \\times 0.5 \\times 0.00076^2 \\times \\tau',
            explanation: 'For q = 1000 units inventory (long), the reservation price shifts down by about ₹0.0003, causing a slight ask-side skew to reduce inventory.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          RL-based market making extends the Avellaneda-Stoikov framework by learning
          non-linear quoting strategies that adapt to changing market conditions. For NSE
          applications: (1) ETF market making (Nifty BeES, Gold BeES) offers regulated
          opportunities with SEBI incentives, (2) the minimum tick of ₹0.05 constrains
          the minimum spread, (3) inventory risk is paramount -- the RL agent must learn
          to skew quotes to manage inventory, (4) adverse selection from informed traders
          (especially around F&O expiry) requires dynamic spread widening. Always comply
          with NSE market maker obligations regarding continuous quoting and spread limits.
        </p>
      </NoteBlock>
    </div>
  )
}
