import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveYieldFarming() {
  const [depositAmount, setDepositAmount] = useState(10000)
  const [baseAPY, setBaseAPY] = useState(5)
  const [rewardAPY, setRewardAPY] = useState(15)
  const [ilRisk, setIlRisk] = useState(10)
  const [compoundFreq, setCompoundFreq] = useState(365)

  const totalAPY = baseAPY + rewardAPY
  const netAPY = totalAPY - ilRisk
  const compoundedReturn = depositAmount * Math.pow(1 + totalAPY / 100 / compoundFreq, compoundFreq) - depositAmount
  const simpleReturn = depositAmount * totalAPY / 100
  const compoundingBenefit = compoundedReturn - simpleReturn
  const netReturn = compoundedReturn - depositAmount * ilRisk / 100
  const dailyYield = depositAmount * totalAPY / 100 / 365

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: DeFi Yield Farming Calculator
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Model the returns from providing liquidity to a DeFi protocol, accounting
        for base yield, reward tokens, impermanent loss, and compounding.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Deposit: ${(depositAmount / 1000).toFixed(0)}K</span>
          <input type="range" min="1000" max="100000" step="1000" value={depositAmount}
            onChange={e => setDepositAmount(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Base APY: {baseAPY}%</span>
          <input type="range" min="0" max="30" step="0.5" value={baseAPY}
            onChange={e => setBaseAPY(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Reward APY: {rewardAPY}%</span>
          <input type="range" min="0" max="100" step="1" value={rewardAPY}
            onChange={e => setRewardAPY(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>IL Risk: {ilRisk}%</span>
          <input type="range" min="0" max="30" step="1" value={ilRisk}
            onChange={e => setIlRisk(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 500 130" className="w-full max-w-lg mx-auto block" aria-label="Yield breakdown">
        {[
          { name: 'Base APY', value: baseAPY, color: '#4ade80' },
          { name: 'Reward APY', value: rewardAPY, color: '#6366f1' },
          { name: 'IL Risk', value: -ilRisk, color: '#f87171' },
        ].map((item, i) => {
          const y = 10 + i * 35
          const barWidth = Math.abs(item.value) * 3
          const x = item.value >= 0 ? 200 : 200 - barWidth
          return (
            <g key={i}>
              <text x="30" y={y + 15} className="text-[9px]" fill="#374151">{item.name}</text>
              <rect x={x} y={y} width={barWidth} height="22" fill={item.color} opacity="0.7" rx="3" />
              <text x={200 + (item.value >= 0 ? barWidth + 5 : -barWidth - 5)} y={y + 15}
                textAnchor={item.value >= 0 ? "start" : "end"}
                className="text-[9px] font-mono" fill="#374151">
                {item.value > 0 ? '+' : ''}{item.value.toFixed(1)}%
              </text>
            </g>
          )
        })}
        <line x1="200" y1="5" x2="200" y2="105" stroke="#94a3b8" strokeWidth="1" />
        <text x="250" y="120" textAnchor="middle" className="text-[10px] fill-gray-600 dark:fill-gray-400">
          Net APY: {netAPY.toFixed(1)}% | Daily: ${dailyYield.toFixed(2)} | Compounded: ${compoundedReturn.toFixed(0)}/yr
        </text>
      </svg>
    </div>
  )
}

export default function YieldFarming() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Quantitative Yield Farming
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Yield farming involves deploying capital across DeFi protocols to earn returns
        from trading fees, lending interest, and protocol reward tokens. A quantitative
        approach to yield farming optimizes allocation across protocols and pools based
        on risk-adjusted returns, impermanent loss modeling, and reward token valuation.
      </p>

      <DefinitionBlock
        title="Impermanent Loss (IL)"
        label="Definition 1.1"
        definition="Impermanent loss is the difference in value between holding tokens in a liquidity pool versus holding them in a wallet. It occurs when the relative price of tokens in a pool changes from the time of deposit. For a constant-product AMM, IL is always negative (a loss) and depends only on the price ratio change, not the direction."
        notation={<>For a price change ratio <InlineMath math="r = P_1/P_0" />: <InlineMath math="\text{IL}(r) = \frac{2\sqrt{r}}{1 + r} - 1" />. At <InlineMath math="r = 2" /> (price doubles), <InlineMath math="\text{IL} = -5.7\%" />. At <InlineMath math="r = 5" />, <InlineMath math="\text{IL} = -25.5\%" />.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Yield Decomposition
      </h3>

      <BlockMath math="\text{Net APY} = \underbrace{\text{Fee APY}}_{\text{trading fees}} + \underbrace{\text{Reward APY}}_{\text{token emissions}} - \underbrace{\text{IL}}_{\text{impermanent loss}} - \underbrace{c_{\text{gas}}}_{\text{gas costs}}" />

      <BlockMath math="\text{Fee APY} = \frac{V_{\text{daily}} \times f \times 365}{\text{TVL}}" />

      <TheoremBlock
        title="Impermanent Loss Derivation"
        label="Theorem 1.1"
        statement={<>For a constant-product AMM with initial reserves <InlineMath math="(x_0, y_0)" /> and price ratio change <InlineMath math="r = P_1/P_0" />, the impermanent loss is: <BlockMath math="\text{IL}(r) = \frac{2\sqrt{r}}{1 + r} - 1" /> This is always non-positive, equals zero only when <InlineMath math="r = 1" /> (no price change), and approaches <InlineMath math="-1" /> as <InlineMath math="r \to 0" /> or <InlineMath math="r \to \infty" />.</>}
        proof={<>Initial portfolio value: <InlineMath math="V_0 = 2x_0 P_0" /> (assuming 50/50 value split). After price change to <InlineMath math="P_1 = r P_0" />, pool reserves adjust to maintain <InlineMath math="x_1 y_1 = k" /> with <InlineMath math="y_1/x_1 = P_1" />. Solving: <InlineMath math="x_1 = x_0/\sqrt{r}, \; y_1 = y_0\sqrt{r}" />. Pool value: <InlineMath math="V_{\text{pool}} = x_1 P_1 + y_1 = 2x_0 P_0 \sqrt{r}" />. Hold value: <InlineMath math="V_{\text{hold}} = x_0 P_1 + y_0 = x_0 P_0(1 + r)" />. IL = <InlineMath math="V_{\text{pool}}/V_{\text{hold}} - 1 = 2\sqrt{r}/(1+r) - 1" />.</>}
      />

      <InteractiveYieldFarming />

      <PythonCode
        title="yield_farming_optimizer.py"
        runnable
        code={`import numpy as np

class YieldFarmingOptimizer:
    """Optimize DeFi yield farming allocations."""

    @staticmethod
    def impermanent_loss(price_ratio):
        """Compute IL for constant-product AMM."""
        r = price_ratio
        return 2 * np.sqrt(r) / (1 + r) - 1

    @staticmethod
    def fee_apy(daily_volume, tvl, fee_rate=0.003):
        """Estimate fee APY from volume and TVL."""
        daily_fees = daily_volume * fee_rate
        return daily_fees / tvl * 365

    def evaluate_pool(self, pool):
        """Evaluate a liquidity pool's risk-adjusted return."""
        fee_return = self.fee_apy(pool['daily_volume'], pool['tvl'], pool['fee_rate'])
        reward_return = pool.get('reward_apy', 0)
        expected_il = abs(self.impermanent_loss(pool.get('expected_price_ratio', 1.1)))
        gas_cost_apy = pool.get('gas_cost_annual', 0) / pool.get('deposit', 10000)

        gross_apy = fee_return + reward_return
        net_apy = gross_apy - expected_il - gas_cost_apy
        risk = pool.get('vol', 0.5) * np.sqrt(365)

        return {
            'pool': pool['name'],
            'fee_apy': fee_return,
            'reward_apy': reward_return,
            'expected_il': expected_il,
            'gross_apy': gross_apy,
            'net_apy': net_apy,
            'sharpe': net_apy / risk if risk > 0 else 0,
        }

    def optimize_allocation(self, pools, total_capital, max_per_pool=0.4):
        """Simple rank-based allocation across pools."""
        evaluated = [self.evaluate_pool(p) for p in pools]
        evaluated.sort(key=lambda x: -x['sharpe'])

        # Allocate proportionally by Sharpe
        positive = [e for e in evaluated if e['sharpe'] > 0]
        if not positive:
            return [{'pool': e['pool'], 'allocation': 0} for e in evaluated]

        total_sharpe = sum(e['sharpe'] for e in positive)
        allocations = []
        for e in evaluated:
            if e['sharpe'] > 0:
                raw_weight = e['sharpe'] / total_sharpe
                weight = min(raw_weight, max_per_pool)
                allocations.append({
                    'pool': e['pool'],
                    'allocation': weight * total_capital,
                    'weight': weight,
                    'net_apy': e['net_apy'],
                    'sharpe': e['sharpe'],
                })
            else:
                allocations.append({
                    'pool': e['pool'], 'allocation': 0,
                    'weight': 0, 'net_apy': e['net_apy'], 'sharpe': e['sharpe'],
                })

        return allocations

optimizer = YieldFarmingOptimizer()

# IL analysis
print("=" * 55)
print("IMPERMANENT LOSS ANALYSIS")
print("=" * 55)
print(f"\\n{'Price Ratio':>12} {'IL':>10} {'% Lost':>10}")
for r in [0.5, 0.75, 0.9, 1.0, 1.1, 1.25, 1.5, 2.0, 3.0, 5.0]:
    il = optimizer.impermanent_loss(r)
    print(f"  {r:>10.2f}x {il:>10.4f} {il*100:>9.2f}%")

# Pool evaluation
pools = [
    {'name': 'ETH/USDT (Uniswap V2)', 'daily_volume': 50e6, 'tvl': 200e6,
     'fee_rate': 0.003, 'reward_apy': 0.02, 'expected_price_ratio': 1.15,
     'vol': 0.6, 'gas_cost_annual': 500, 'deposit': 10000},
    {'name': 'USDC/USDT (Curve)', 'daily_volume': 100e6, 'tvl': 500e6,
     'fee_rate': 0.0004, 'reward_apy': 0.05, 'expected_price_ratio': 1.001,
     'vol': 0.02, 'gas_cost_annual': 300, 'deposit': 10000},
    {'name': 'SOL/USDT (Raydium)', 'daily_volume': 20e6, 'tvl': 50e6,
     'fee_rate': 0.0025, 'reward_apy': 0.15, 'expected_price_ratio': 1.3,
     'vol': 0.9, 'gas_cost_annual': 50, 'deposit': 10000},
    {'name': 'MATIC/ETH (SushiSwap)', 'daily_volume': 5e6, 'tvl': 30e6,
     'fee_rate': 0.003, 'reward_apy': 0.08, 'expected_price_ratio': 1.2,
     'vol': 0.7, 'gas_cost_annual': 400, 'deposit': 10000},
]

print(f"\\n{'=' * 55}")
print("POOL EVALUATION")
print("=" * 55)
for pool in pools:
    result = optimizer.evaluate_pool(pool)
    print(f"\\n  {result['pool']}:")
    print(f"    Fee APY:    {result['fee_apy']:.1%}")
    print(f"    Reward APY: {result['reward_apy']:.1%}")
    print(f"    Expected IL:{result['expected_il']:.1%}")
    print(f"    Net APY:    {result['net_apy']:.1%}")
    print(f"    Sharpe:     {result['sharpe']:.2f}")

# Optimize allocation
allocs = optimizer.optimize_allocation(pools, total_capital=50000)
print(f"\\nOptimal Allocation ($50K):")
for a in allocs:
    if a['allocation'] > 0:
        print(f"  {a['pool']:30s}: \${a['allocation']:>8,.0f} "
              f"({a['weight']:.0%}) Net APY: {a['net_apy']:.1%}")`}
      />

      <ExampleBlock
        title="Evaluating a Stablecoin Yield Farm"
        difficulty="beginner"
        problem="A USDC/USDT pool on Curve has $500M TVL, $100M daily volume, 0.04% fee rate, and 5% CRV reward APY. There is negligible impermanent loss for stablecoin pairs. Gas costs are $300/year. Compute the net APY for a $10,000 deposit."
        solution={[
          {
            step: 'Fee APY',
            formula: '\\text{Fee APY} = \\frac{100M \\times 0.0004 \\times 365}{500M} = 2.92\\%',
          },
          {
            step: 'Total gross APY',
            formula: '\\text{Gross} = 2.92\\% + 5.00\\% = 7.92\\%',
          },
          {
            step: 'Gas cost as APY',
            formula: '\\text{Gas APY} = \\frac{300}{10000} = 3.0\\%',
          },
          {
            step: 'Net APY',
            formula: '\\text{Net} = 7.92\\% - 0\\% - 3.0\\% = 4.92\\%',
            explanation: 'After gas costs, the net return is 4.92%. This is competitive with traditional Indian fixed deposits (6-7%) but with smart contract risk. Gas costs significantly impact small deposits.',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Advanced Yield Strategies
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Sophisticated yield farming strategies go beyond simple LP provision to
        include leveraged yield farming, auto-compounding, and cross-protocol
        arbitrage:
      </p>

      <BlockMath math="\text{Leveraged Yield} = L \times \text{APY}_{\text{pool}} - (L - 1) \times r_{\text{borrow}} - L \times \text{IL}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="L" /> is the leverage factor and <InlineMath math="r_{\text{borrow}}" /> is
        the borrowing cost. Leveraged farming amplifies both returns and IL risk.
        The optimal leverage depends on the pool's fee yield relative to borrowing cost:
      </p>

      <BlockMath math="L^* = \frac{\text{APY}_{\text{pool}} - \text{IL}_{\text{expected}}}{\text{APY}_{\text{pool}} - r_{\text{borrow}} - \text{IL}_{\text{expected}}}" />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Strategy</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Typical APY</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Risk Level</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Complexity</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Stablecoin LP (Curve)</td>
              <td className="px-4 py-2">3--8%</td>
              <td className="px-4 py-2">Low</td>
              <td className="px-4 py-2">Low</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Blue-chip LP (Uniswap V3)</td>
              <td className="px-4 py-2">10--25%</td>
              <td className="px-4 py-2">Medium</td>
              <td className="px-4 py-2">Medium</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Leveraged Farming</td>
              <td className="px-4 py-2">20--60%</td>
              <td className="px-4 py-2">High</td>
              <td className="px-4 py-2">High</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Auto-Compounding Vaults</td>
              <td className="px-4 py-2">5--15%</td>
              <td className="px-4 py-2">Medium</td>
              <td className="px-4 py-2">Low</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Delta-Neutral Farming</td>
              <td className="px-4 py-2">8--20%</td>
              <td className="px-4 py-2">Medium</td>
              <td className="px-4 py-2">High</td>
            </tr>
          </tbody>
        </table>
      </div>

      <NoteBlock title="Smart Contract Risk" type="warning">
        <p>
          All DeFi yield farming carries smart contract risk -- the risk that a bug
          in the protocol's code leads to loss of deposited funds. Notable examples
          include the $600M Poly Network hack (2021), the $325M Wormhole exploit
          (2022), and the $200M Euler Finance hack (2023). Risk mitigation includes:
          only using audited protocols (multiple audits preferred), starting with
          small positions, monitoring protocol TVL trends, and using DeFi insurance
          (Nexus Mutual, InsurAce) for larger allocations. Indian DeFi users should
          also consider that losses from smart contract exploits cannot be offset
          against gains under the current 30% VDA tax regime.
        </p>
      </NoteBlock>

      <NoteBlock title="Concentrated Liquidity (Uniswap V3)" type="historical">
        <p>
          Uniswap V3 introduced concentrated liquidity, where LPs specify a price
          range for their capital. This dramatically increases capital efficiency
          (up to 4000x for narrow ranges) but also increases impermanent loss risk
          when price moves outside the range. The optimal range width depends on
          the asset's volatility: <InlineMath math="\Delta P \approx 2\sigma\sqrt{T}" /> where{' '}
          <InlineMath math="T" /> is the rebalancing frequency. Quantitative LP
          strategies on Uniswap V3 actively manage range placement and width,
          making it more akin to options market-making than passive liquidity provision.
        </p>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Quantitative yield farming requires decomposing returns into trading fees,
          protocol rewards, and impermanent loss, then optimizing across pools using
          risk-adjusted metrics. Stablecoin pools offer lower returns but minimal IL,
          while volatile pair pools offer higher gross yields offset by significant IL
          risk. For Indian investors, DeFi yields must clear the 30% VDA tax hurdle
          to be competitive with domestic fixed-income alternatives.
        </p>
      </NoteBlock>
    </div>
  )
}
