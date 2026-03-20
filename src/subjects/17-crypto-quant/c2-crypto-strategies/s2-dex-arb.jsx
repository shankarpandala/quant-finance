import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveDEXArb() {
  const [reserveX, setReserveX] = useState(1000)
  const [reserveY, setReserveY] = useState(3000000)
  const [swapAmount, setSwapAmount] = useState(10)
  const [gasCost, setGasCost] = useState(5)

  const k = reserveX * reserveY
  const spotPrice = reserveY / reserveX
  const newReserveX = reserveX + swapAmount
  const newReserveY = k / newReserveX
  const amountOut = reserveY - newReserveY
  const executionPrice = amountOut / swapAmount
  const priceImpact = ((spotPrice - executionPrice) / spotPrice) * 100
  const slippageBps = priceImpact * 100

  const cexPrice = spotPrice * 0.998
  const arbProfit = (executionPrice - cexPrice) * swapAmount - gasCost
  const isProfitable = arbProfit > 0

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: AMM Price Impact & DEX-CEX Arbitrage
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Explore how constant-product AMM (Uniswap V2 style) pricing creates
        arbitrage opportunities between DEX and CEX markets.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Reserve X (ETH): {reserveX}</span>
          <input type="range" min="100" max="10000" step="100" value={reserveX}
            onChange={e => setReserveX(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Reserve Y (USDT): {(reserveY / 1000).toFixed(0)}K</span>
          <input type="range" min="100000" max="10000000" step="100000" value={reserveY}
            onChange={e => setReserveY(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Swap: {swapAmount} ETH</span>
          <input type="range" min="1" max="100" step="1" value={swapAmount}
            onChange={e => setSwapAmount(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Gas: ${gasCost}</span>
          <input type="range" min="1" max="50" step="1" value={gasCost}
            onChange={e => setGasCost(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 500 140" className="w-full max-w-lg mx-auto block" aria-label="AMM curve">
        <defs>
          <marker id="ammArrow" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
            <polygon points="0 0, 6 2, 0 4" fill="#6366f1" />
          </marker>
        </defs>
        {/* xy=k curve approximation */}
        {Array.from({ length: 20 }, (_, i) => {
          const x1 = 200 + i * 200 / reserveX * 10
          const y1 = 120 - k / (reserveX * 0.5 + i * reserveX * 0.1) / reserveY * 100
          const x2 = 200 + (i + 1) * 200 / reserveX * 10
          const y2 = 120 - k / (reserveX * 0.5 + (i + 1) * reserveX * 0.1) / reserveY * 100
          return <line key={i} x1={x1} y1={Math.max(10, y1)} x2={x2} y2={Math.max(10, y2)} stroke="#6366f1" strokeWidth="2" />
        })}
        <text x="30" y="50" className="text-[9px]" fill="#374151">Spot: ${spotPrice.toFixed(0)}</text>
        <text x="30" y="65" className="text-[9px]" fill="#374151">Exec: ${executionPrice.toFixed(0)}</text>
        <text x="30" y="80" className="text-[9px]" fill="#374151">Impact: {priceImpact.toFixed(2)}%</text>
        <text x="250" y="135" textAnchor="middle" className={`text-[10px] font-bold ${isProfitable ? 'fill-green-600' : 'fill-red-500'}`}>
          Arb Profit: ${arbProfit.toFixed(2)} ({isProfitable ? 'PROFITABLE' : 'UNPROFITABLE'})
        </text>
      </svg>
    </div>
  )
}

export default function DEXArb() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        DEX Arbitrage Strategies
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Decentralized exchange (DEX) arbitrage exploits price discrepancies between
        automated market makers (AMMs) and centralized exchanges. The deterministic
        pricing of AMMs (like Uniswap's constant-product formula) creates predictable
        arbitrage opportunities that can be captured through on-chain transactions
        or atomic arbitrage bots.
      </p>

      <DefinitionBlock
        title="Constant Product Market Maker (CPMM)"
        label="Definition 2.1"
        definition="A constant product market maker maintains a liquidity pool with reserves of two tokens (x, y) satisfying the invariant x * y = k. When a trader swaps dx of token X for token Y, they receive dy = y - k/(x + dx). The price increases with trade size, creating a natural price impact that depends on the pool's depth."
        notation={<>Invariant: <InlineMath math="x \cdot y = k" />. Spot price: <InlineMath math="P = y/x" />. Execution price for swap <InlineMath math="\Delta x" />: <InlineMath math="P_{\text{exec}} = \frac{y - k/(x + \Delta x)}{\Delta x}" /></>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        AMM Price Impact
      </h3>

      <BlockMath math="\text{Price Impact} = 1 - \frac{P_{\text{exec}}}{P_{\text{spot}}} = 1 - \frac{x}{x + \Delta x} = \frac{\Delta x}{x + \Delta x}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Unlike traditional order books, AMM price impact is a deterministic function
        of trade size relative to pool depth. This predictability is what makes
        DEX arbitrage algorithmic rather than statistical.
      </p>

      <TheoremBlock
        title="Optimal Arbitrage Size"
        label="Theorem 2.1"
        statement={<>Given a CPMM pool with reserves <InlineMath math="(x, y)" /> and a CEX price <InlineMath math="P_{\text{CEX}}" />, the optimal arbitrage trade size that maximizes profit (ignoring gas) is: <BlockMath math="\Delta x^* = \sqrt{\frac{x \cdot y}{P_{\text{CEX}}}} - x \quad \text{(when DEX is overpriced: } y/x > P_{\text{CEX}}\text{)}" /> The maximum profit is <InlineMath math="\pi^* = y - \sqrt{x \cdot y \cdot P_{\text{CEX}}} - P_{\text{CEX}} \cdot (\sqrt{x \cdot y / P_{\text{CEX}}} - x)" />.</>}
        proof={<>The profit function for buying <InlineMath math="\Delta x" /> on CEX and selling on DEX: <BlockMath math="\pi(\Delta x) = \left(y - \frac{k}{x + \Delta x}\right) - P_{\text{CEX}} \cdot \Delta x" /> Setting <InlineMath math="d\pi/d(\Delta x) = 0" />: <InlineMath math="k/(x + \Delta x)^2 = P_{\text{CEX}}" />, yielding <InlineMath math="\Delta x^* = \sqrt{k/P_{\text{CEX}}} - x" />.</>}
      />

      <InteractiveDEXArb />

      <PythonCode
        title="dex_arbitrage.py"
        runnable
        code={`import numpy as np

class ConstantProductAMM:
    """Uniswap V2 style constant product AMM."""

    def __init__(self, reserve_x, reserve_y, fee_pct=0.3):
        self.x = reserve_x
        self.y = reserve_y
        self.k = reserve_x * reserve_y
        self.fee = fee_pct / 100

    @property
    def spot_price(self):
        return self.y / self.x

    def swap_x_for_y(self, dx):
        """Swap dx of token X for token Y."""
        dx_after_fee = dx * (1 - self.fee)
        new_x = self.x + dx_after_fee
        new_y = self.k / new_x
        dy = self.y - new_y
        return {
            'amount_out': dy,
            'execution_price': dy / dx,
            'price_impact_pct': (1 - (self.x / new_x)) * 100,
            'fee_paid': dx * self.fee * self.spot_price
        }

    def optimal_arb_size(self, cex_price):
        """Compute optimal arbitrage size."""
        if self.spot_price <= cex_price:
            return 0  # No arb opportunity (DEX cheaper)
        optimal = np.sqrt(self.k / cex_price) - self.x
        return max(0, optimal * (1 - self.fee))

class DEXArbBot:
    """DEX-CEX arbitrage bot."""

    def __init__(self, gas_cost_usd=5, min_profit_usd=10):
        self.gas_cost = gas_cost_usd
        self.min_profit = min_profit_usd

    def find_opportunity(self, amm, cex_price):
        """Check for arbitrage opportunity."""
        # DEX overpriced: buy on CEX, sell on DEX
        if amm.spot_price > cex_price * 1.001:
            opt_size = amm.optimal_arb_size(cex_price)
            if opt_size > 0:
                swap = amm.swap_x_for_y(opt_size)
                profit = swap['amount_out'] - opt_size * cex_price - self.gas_cost
                return {
                    'direction': 'BUY_CEX_SELL_DEX',
                    'size': opt_size,
                    'dex_price': amm.spot_price,
                    'cex_price': cex_price,
                    'gross_profit': swap['amount_out'] - opt_size * cex_price,
                    'gas_cost': self.gas_cost,
                    'net_profit': profit,
                    'profitable': profit > self.min_profit,
                    'impact': swap['price_impact_pct']
                }

        # DEX underpriced: buy on DEX, sell on CEX
        elif cex_price > amm.spot_price * 1.001:
            # Swap Y for X on DEX, sell X on CEX
            dy_needed = 1000  # test with fixed amount
            return {
                'direction': 'BUY_DEX_SELL_CEX',
                'dex_price': amm.spot_price,
                'cex_price': cex_price,
                'profitable': False,  # simplified
            }

        return {'profitable': False, 'reason': 'No opportunity'}

    def simulate_arb_day(self, n_periods=100):
        """Simulate a day of DEX arb opportunities."""
        np.random.seed(42)
        base_price = 3000
        results = []

        for i in range(n_periods):
            # Random pool state
            reserve_x = 1000 + np.random.normal(0, 50)
            reserve_y = reserve_x * base_price * (1 + np.random.normal(0, 0.005))
            amm = ConstantProductAMM(reserve_x, reserve_y)

            # CEX price with slight deviation
            cex_price = base_price * (1 + np.random.normal(0, 0.003))

            opp = self.find_opportunity(amm, cex_price)
            if opp.get('profitable'):
                results.append(opp)

        return results

# Demo
amm = ConstantProductAMM(reserve_x=1000, reserve_y=3_000_000, fee_pct=0.3)
print("=" * 55)
print("DEX ARBITRAGE ANALYSIS")
print("=" * 55)

print(f"\\nPool: ETH/USDT")
print(f"  Reserve X (ETH): {amm.x:,.0f}")
print(f"  Reserve Y (USDT): {amm.y:,.0f}")
print(f"  Spot Price: \${amm.spot_price:,.2f}")
print(f"  k (invariant): {amm.k:,.0f}")

# Test swaps at different sizes
print(f"\\nSwap Analysis:")
for size in [1, 5, 10, 50, 100]:
    result = amm.swap_x_for_y(size)
    print(f"  Swap {size:>3d} ETH -> \${result['amount_out']:>10,.2f} USDT "
          f"(price: \${result['execution_price']:,.2f}, "
          f"impact: {result['price_impact_pct']:.2f}%)")

# Arbitrage simulation
bot = DEXArbBot(gas_cost_usd=5, min_profit_usd=10)
opportunities = bot.simulate_arb_day(200)

print(f"\\nArbitrage Simulation (200 periods):")
print(f"  Opportunities found: {len(opportunities)}")
if opportunities:
    total_profit = sum(o['net_profit'] for o in opportunities)
    avg_profit = np.mean([o['net_profit'] for o in opportunities])
    print(f"  Total profit:   \${total_profit:,.2f}")
    print(f"  Avg per trade:  \${avg_profit:,.2f}")
    print(f"  Avg impact:     {np.mean([o['impact'] for o in opportunities]):.2f}%")`}
      />

      <ExampleBlock
        title="Optimal Arb Size on Uniswap"
        difficulty="intermediate"
        problem="A Uniswap V2 ETH/USDT pool has 500 ETH and $1,750,000 USDT (spot price = $3,500). Binance ETH price is $3,450. Uniswap fee is 0.3%, gas cost is $8. Find the optimal arb size and expected profit."
        solution={[
          {
            step: 'Check arb direction',
            formula: 'P_{\\text{DEX}} = 3500 > P_{\\text{CEX}} = 3450 \\implies \\text{Buy CEX, Sell DEX}',
          },
          {
            step: 'Compute optimal size (before fee)',
            formula: '\\Delta x^* = \\sqrt{\\frac{500 \\times 1{,}750{,}000}{3450}} - 500 = \\sqrt{253{,}623} - 500 = 503.6 - 500 = 3.6 \\text{ ETH}',
          },
          {
            step: 'After fee adjustment',
            formula: '\\Delta x_{\\text{eff}} = 3.6 \\times 0.997 = 3.59 \\text{ ETH}',
          },
          {
            step: 'Compute output from DEX',
            formula: '\\Delta y = 1{,}750{,}000 - \\frac{500 \\times 1{,}750{,}000}{500 + 3.59} = \\$12{,}480',
          },
          {
            step: 'Net profit',
            formula: '\\pi = 12{,}480 - 3.6 \\times 3{,}450 - 8 = 12{,}480 - 12{,}420 - 8 = \\$52',
            explanation: 'A modest $52 profit on a $12K trade. DEX arb margins are thin but compound over many daily opportunities.',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Further Reading and Resources
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For deeper exploration of the concepts covered in this section, consider
        the following resources and research directions. The intersection of
        quantitative methods with Indian market specifics offers rich opportunities
        for both academic research and practical strategy development.
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Resource</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Type</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Relevance</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">NSE Research Papers</td>
              <td className="px-4 py-2">Academic</td>
              <td className="px-4 py-2">Indian market empirics</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">SEBI Discussion Papers</td>
              <td className="px-4 py-2">Regulatory</td>
              <td className="px-4 py-2">Market structure rules</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">RBI Working Papers</td>
              <td className="px-4 py-2">Policy</td>
              <td className="px-4 py-2">Macro-financial linkages</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">CMIE ProwessIQ</td>
              <td className="px-4 py-2">Data</td>
              <td className="px-4 py-2">Indian corporate financials</td>
            </tr>
            <tr>
              <td className="px-4 py-2">IIM/ISB Research</td>
              <td className="px-4 py-2">Academic</td>
              <td className="px-4 py-2">Indian finance research</td>
            </tr>
          </tbody>
        </table>
      </div>

      <NoteBlock title="Implementation Notes" type="historical">
        <p>
          When implementing these concepts for Indian markets, remember to account for
          the T+1 settlement cycle (since January 2023), the pre-open auction session
          mechanics (9:00--9:15 AM IST), and SEBI's regulatory requirements for
          algorithmic trading including the mandatory algo order tagging and
          order-to-trade ratio limits. Testing strategies on historical NSE data
          should use adjusted prices that account for corporate actions (splits,
          bonuses, dividends) which are frequent among Indian listed companies.
        </p>
      </NoteBlock>



      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          DEX arbitrage exploits the deterministic pricing of AMMs against CEX reference
          prices. The optimal trade size has a closed-form solution for constant-product
          AMMs. Profitability depends on the size of price discrepancies, pool depth,
          AMM fees, and gas costs. MEV (Maximal Extractable Value) bots compete
          intensely for these opportunities, making speed and gas optimization critical.
          For Indian crypto quants, DEX arb operates entirely on-chain and is not
          subject to Indian TDS regulations.
        </p>
      </NoteBlock>
    </div>
  )
}
