import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveHierarchy() {
  const [macroAction, setMacroAction] = useState('risk_on')
  const [equityBudget, setEquityBudget] = useState(0.7)
  const [microAllocations, setMicroAllocations] = useState({
    RELIANCE: 0.25, TCS: 0.20, HDFCBANK: 0.20, INFY: 0.15, ICICIBANK: 0.20
  })

  const macroOptions = [
    { key: 'risk_on', label: 'Risk On', equity: 0.7, bond: 0.2, cash: 0.1 },
    { key: 'neutral', label: 'Neutral', equity: 0.5, bond: 0.3, cash: 0.2 },
    { key: 'risk_off', label: 'Risk Off', equity: 0.2, bond: 0.5, cash: 0.3 },
    { key: 'defensive', label: 'Defensive', equity: 0.1, bond: 0.4, cash: 0.5 }
  ]

  const currentMacro = macroOptions.find(m => m.key === macroAction)

  const updateMicro = (stock, val) => {
    const newAlloc = { ...microAllocations, [stock]: val }
    const total = Object.values(newAlloc).reduce((a, b) => a + b, 0)
    if (total > 0) {
      Object.keys(newAlloc).forEach(k => { newAlloc[k] /= total })
      setMicroAllocations(newAlloc)
    }
  }

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Hierarchical RL Policy
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        The macro-level policy sets asset class budgets. The micro-level policy allocates within equities.
      </p>

      <div className="mb-4">
        <h4 className="mb-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
          Level 1: Macro Policy (Asset Class Allocation)
        </h4>
        <div className="flex gap-2">
          {macroOptions.map(opt => (
            <button key={opt.key} onClick={() => setMacroAction(opt.key)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                macroAction === opt.key
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
              }`}>
              {opt.label}
            </button>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="rounded bg-blue-50 p-2 text-center dark:bg-blue-900/30">
            <div className="text-xs text-blue-600 dark:text-blue-400">Equity</div>
            <div className="font-bold text-blue-800 dark:text-blue-200">{(currentMacro.equity * 100).toFixed(0)}%</div>
          </div>
          <div className="rounded bg-green-50 p-2 text-center dark:bg-green-900/30">
            <div className="text-xs text-green-600 dark:text-green-400">Bonds</div>
            <div className="font-bold text-green-800 dark:text-green-200">{(currentMacro.bond * 100).toFixed(0)}%</div>
          </div>
          <div className="rounded bg-gray-50 p-2 text-center dark:bg-gray-900/30">
            <div className="text-xs text-gray-600 dark:text-gray-400">Cash</div>
            <div className="font-bold text-gray-800 dark:text-gray-200">{(currentMacro.cash * 100).toFixed(0)}%</div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-semibold text-purple-600 dark:text-purple-400">
          Level 2: Micro Policy (Within-Equity Allocation)
        </h4>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {Object.entries(microAllocations).map(([stock, w]) => (
            <label key={stock} className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
              <span>{stock}: {(w * currentMacro.equity * 100).toFixed(1)}%</span>
              <input type="range" min="0" max="1" step="0.05" value={w}
                onChange={e => updateMicro(stock, parseFloat(e.target.value))}
                className="h-2 w-full cursor-pointer accent-purple-500" />
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function HierarchicalRL() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Hierarchical RL: Macro Allocation + Micro Execution
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Real portfolio management operates at multiple time scales: strategic asset allocation
        (monthly/quarterly) and tactical stock selection (daily/weekly). Hierarchical RL (HRL)
        decomposes this into a macro-level policy that determines asset class budgets and a
        micro-level policy that handles individual stock allocation and execution within
        the Indian market context.
      </p>

      <DefinitionBlock
        title="Hierarchical Reinforcement Learning (HRL)"
        label="Definition 14.9"
        definition="HRL decomposes a complex decision-making problem into a hierarchy of sub-problems. In the options framework, a high-level policy selects 'options' (temporally extended actions), and a low-level policy executes within each option. For portfolio management, the high-level policy sets asset class targets (equity/bond/cash split), while the low-level policy selects individual securities."
        notation="π_H: S → O (high-level), π_L: S × O → A (low-level), where O is the option space."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Two-Level Portfolio Hierarchy
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The hierarchy operates at two temporal scales:
      </p>

      <BlockMath math="\underbrace{\pi_H(o_t | s_t^{\text{macro}})}_{\text{Monthly: Asset class budget}} \quad \rightarrow \quad \underbrace{\pi_L(a_t | s_t^{\text{micro}}, o_t)}_{\text{Daily: Stock selection}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The macro state includes global factors relevant to Indian markets:
      </p>

      <BlockMath math="s_t^{\text{macro}} = \left[\text{VIX}_{\text{India}}, \; r_{\text{repo}}, \; \frac{\text{FII flow}}{V}, \; \text{USD/INR}, \; \text{Oil}_t, \; \text{monsoon index}\right]" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The micro state is stock-specific:
      </p>

      <BlockMath math="s_t^{\text{micro}} = \left[\text{returns}_{t-W:t}, \; \text{volume ratio}, \; \text{RSI}, \; \text{sector momentum}, \; \text{delivery \%}\right]" />

      <TheoremBlock
        title="Hierarchical Optimality"
        label="Theorem 14.8"
        statement="Under the options framework with Markov options, the hierarchical value function decomposes as: V^*(s) = max_o [R(s,o) + γ^{τ_o} Σ_{s'} P(s'|s,o) V^*(s')], where τ_o is the duration of option o. If both levels are optimized jointly, the hierarchical solution converges to the flat optimal policy in the limit."
        proof="Each option o defines a semi-MDP with temporally extended transitions. The Bellman equation for semi-MDPs preserves the contraction property of the Bellman operator with discount γ^τ_o. By the recursive optimality principle, if π_H and π_L are both optimal for their respective sub-problems, the composite policy is optimal for the original MDP. This follows from the hierarchical decomposition theorem (Dietterich, 2000)."
      />

      <InteractiveHierarchy />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Options Framework for Trading
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Each macro option defines a regime-dependent asset class allocation:
      </p>

      <BlockMath math="o \in \{\text{risk\_on}, \text{neutral}, \text{risk\_off}, \text{defensive}\}" />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Option</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Equity</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Bonds</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Cash</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Trigger (India)</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-semibold text-green-600">Risk On</td>
              <td className="px-4 py-2">70%</td>
              <td className="px-4 py-2">20%</td>
              <td className="px-4 py-2">10%</td>
              <td className="px-4 py-2">India VIX &lt; 15, FII inflow</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-semibold text-blue-600">Neutral</td>
              <td className="px-4 py-2">50%</td>
              <td className="px-4 py-2">30%</td>
              <td className="px-4 py-2">20%</td>
              <td className="px-4 py-2">Normal conditions</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-semibold text-amber-600">Risk Off</td>
              <td className="px-4 py-2">20%</td>
              <td className="px-4 py-2">50%</td>
              <td className="px-4 py-2">30%</td>
              <td className="px-4 py-2">India VIX &gt; 25, FII outflow</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold text-red-600">Defensive</td>
              <td className="px-4 py-2">10%</td>
              <td className="px-4 py-2">40%</td>
              <td className="px-4 py-2">50%</td>
              <td className="px-4 py-2">Crisis: VIX &gt; 35, INR crash</td>
            </tr>
          </tbody>
        </table>
      </div>

      <PythonCode
        title="hierarchical_rl_portfolio.py"
        runnable
        code={`import numpy as np

class MacroPolicy:
    """High-level policy: asset class allocation based on macro indicators."""
    def __init__(self, n_options=4, obs_dim=6):
        np.random.seed(42)
        self.W = np.random.randn(obs_dim, n_options) * 0.1
        self.options = [
            {'name': 'risk_on',   'equity': 0.70, 'bond': 0.20, 'cash': 0.10},
            {'name': 'neutral',   'equity': 0.50, 'bond': 0.30, 'cash': 0.20},
            {'name': 'risk_off',  'equity': 0.20, 'bond': 0.50, 'cash': 0.30},
            {'name': 'defensive', 'equity': 0.10, 'bond': 0.40, 'cash': 0.50}
        ]

    def select_option(self, macro_state, epsilon=0.1):
        logits = macro_state @ self.W
        probs = np.exp(logits - logits.max())
        probs = probs / probs.sum()

        if np.random.random() < epsilon:
            idx = np.random.randint(len(self.options))
        else:
            idx = np.argmax(probs)

        return idx, self.options[idx]


class MicroPolicy:
    """Low-level policy: stock selection within equity budget."""
    def __init__(self, n_stocks=5, obs_dim=10):
        np.random.seed(42)
        self.W = np.random.randn(obs_dim, n_stocks) * 0.01

    def allocate(self, micro_state, equity_budget):
        logits = micro_state @ self.W
        exp_logits = np.exp(logits - logits.max())
        weights = exp_logits / exp_logits.sum()
        return weights * equity_budget


class HierarchicalPortfolio:
    """
    Two-level hierarchical RL for Indian market portfolio.
    Level 1 (Macro): Asset class allocation (monthly)
    Level 2 (Micro): Stock selection within equity (daily)
    """
    def __init__(self):
        self.macro = MacroPolicy()
        self.micro = MicroPolicy()
        self.stock_names = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK']

    def get_macro_state(self, vix, repo_rate, fii_flow, usd_inr, oil, monsoon):
        """Construct macro state vector."""
        return np.array([vix/50, repo_rate/10, fii_flow, usd_inr/100,
                        oil/100, monsoon], dtype=np.float32)

    def get_micro_state(self, stock_returns, volumes, rsi_values):
        """Construct micro state for stock allocation."""
        return np.concatenate([stock_returns, volumes]).astype(np.float32)

    def allocate(self, macro_state, micro_state):
        """Full hierarchical allocation."""
        option_idx, option = self.macro.select_option(macro_state)
        equity_weights = self.micro.allocate(micro_state, option['equity'])
        bond_weight = option['bond']
        cash_weight = option['cash']

        full_weights = np.concatenate([equity_weights, [bond_weight, cash_weight]])
        return full_weights, option


# Simulation
np.random.seed(42)
hrl = HierarchicalPortfolio()

# Simulate 12 months of Indian macro data
n_months = 12
portfolio_value = 1_00_00_000  # INR 1 Crore

print("Hierarchical RL Portfolio - Indian Markets")
print(f"Initial: INR {portfolio_value:,.0f}")
print(f"Stocks: {', '.join(hrl.stock_names)} + Bonds + Cash")
print(f"{'='*75}")

all_assets = hrl.stock_names + ['GOI_Bond', 'Cash']
monthly_returns = {
    'RELIANCE': np.random.normal(0.015, 0.06, n_months),
    'TCS': np.random.normal(0.012, 0.05, n_months),
    'HDFCBANK': np.random.normal(0.010, 0.055, n_months),
    'INFY': np.random.normal(0.014, 0.06, n_months),
    'ICICIBANK': np.random.normal(0.011, 0.055, n_months),
    'GOI_Bond': np.random.normal(0.006, 0.015, n_months),
    'Cash': np.full(n_months, 0.005)
}

for month in range(n_months):
    # Macro indicators
    vix = np.random.uniform(10, 35)
    repo = 6.5
    fii = np.random.normal(0, 0.5)
    usd_inr = np.random.uniform(82, 86)
    oil = np.random.uniform(70, 100)
    monsoon = np.random.uniform(-1, 1)

    macro_state = hrl.get_macro_state(vix, repo, fii, usd_inr, oil, monsoon)

    # Micro indicators
    stock_rets = np.array([monthly_returns[s][month] for s in hrl.stock_names])
    volumes = np.random.uniform(0.5, 2.0, 5)
    micro_state = hrl.get_micro_state(stock_rets, volumes)

    # Allocate
    weights, option = hrl.allocate(macro_state, micro_state)

    # Portfolio return
    all_returns = np.array([monthly_returns[a][month] for a in all_assets])
    port_return = np.dot(weights, all_returns)
    portfolio_value *= (1 + port_return)

    eq_w = sum(weights[:5])
    print(f"Month {month+1:2d} | {option['name']:>10s} | VIX: {vix:5.1f} | "
          f"FII: {fii:+.2f} | Eq: {eq_w:.0%} | "
          f"Return: {port_return:+.2%} | INR {portfolio_value:>14,.0f}")

total_return = (portfolio_value / 1_00_00_000 - 1) * 100
print(f"\\n{'='*75}")
print(f"Final:  INR {portfolio_value:,.0f}")
print(f"Return: {total_return:+.1f}%")
print(f"CAGR:   {((portfolio_value/1_00_00_000)**(12/n_months)-1)*100:.1f}%")`}
      />

      <ExampleBlock
        title="Designing Hierarchical Options for Indian Markets"
        difficulty="advanced"
        problem="Design a 3-level hierarchical RL system for managing a ₹10 crore Indian portfolio. Define the options at each level and the temporal scale of decisions."
        solution={[
          {
            step: 'Level 1: Strategic (Quarterly)',
            formula: 'o_1 \\in \\{\\text{growth}, \\text{balanced}, \\text{income}, \\text{capital preservation}\\}',
            explanation: 'Based on RBI policy cycle, GDP growth, inflation (CPI), and global macro. Sets the broad equity/debt/gold/cash allocation.',
          },
          {
            step: 'Level 2: Tactical (Monthly)',
            formula: 'o_2 \\in \\{\\text{sector overweight/underweight}\\} \\times |\\text{Nifty sectors}|',
            explanation: 'Selects sector tilts: overweight IT during USD strength, overweight banks during rate cut cycle, overweight pharma during defensive periods.',
          },
          {
            step: 'Level 3: Execution (Daily)',
            formula: 'a_t \\in \\mathbb{R}^N \\quad (\\text{individual stock weights})',
            explanation: 'Handles individual stock selection and execution timing within sector budgets. Uses intraday features from NSE like delivery percentage and bulk deal data.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Hierarchical RL naturally maps to how professional fund managers in India operate:
          the CIO sets the asset allocation policy (macro), sector heads decide sector tilts
          (meso), and portfolio managers pick individual stocks (micro). The key advantage
          of HRL is that the macro policy can operate on slow-moving, low-noise features
          (India VIX, FII flows, RBI policy), while the micro policy handles noisy daily
          stock signals. This decomposition dramatically reduces the effective state-action
          space and improves sample efficiency.
        </p>
      </NoteBlock>
    </div>
  )
}
