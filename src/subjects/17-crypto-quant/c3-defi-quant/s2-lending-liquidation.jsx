import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveLiquidation() {
  const [collateralETH, setCollateralETH] = useState(10)
  const [ethPrice, setEthPrice] = useState(3000)
  const [borrowedUSD, setBorrowedUSD] = useState(15000)
  const [liqThreshold, setLiqThreshold] = useState(80)

  const collateralValue = collateralETH * ethPrice
  const healthFactor = (collateralValue * liqThreshold / 100) / borrowedUSD
  const maxBorrow = collateralValue * liqThreshold / 100
  const ltv = (borrowedUSD / collateralValue) * 100
  const liqPrice = borrowedUSD / (collateralETH * liqThreshold / 100)
  const distToLiq = ((ethPrice - liqPrice) / ethPrice) * 100

  const isHealthy = healthFactor > 1
  const isWarning = healthFactor > 1 && healthFactor < 1.2

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: DeFi Lending & Liquidation Monitor
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust collateral, ETH price, borrowed amount, and liquidation threshold
        to monitor health factor and liquidation risk.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Collateral: {collateralETH} ETH</span>
          <input type="range" min="1" max="100" step="1" value={collateralETH}
            onChange={e => setCollateralETH(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>ETH Price: ${ethPrice}</span>
          <input type="range" min="500" max="10000" step="50" value={ethPrice}
            onChange={e => setEthPrice(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Borrowed: ${(borrowedUSD / 1000).toFixed(0)}K</span>
          <input type="range" min="1000" max="50000" step="1000" value={borrowedUSD}
            onChange={e => setBorrowedUSD(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Liq Threshold: {liqThreshold}%</span>
          <input type="range" min="50" max="95" step="5" value={liqThreshold}
            onChange={e => setLiqThreshold(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 500 100" className="w-full max-w-lg mx-auto block" aria-label="Health factor gauge">
        {/* Health factor gauge */}
        <rect x="50" y="20" width="400" height="30" rx="15" fill="#e5e7eb" />
        <rect x="50" y="20" width={Math.min(400, healthFactor * 150)} height="30" rx="15"
          fill={healthFactor > 1.5 ? '#4ade80' : healthFactor > 1 ? '#fbbf24' : '#f87171'} opacity="0.8" />

        {/* Liquidation line */}
        <line x1="200" y1="15" x2="200" y2="55" stroke="#ef4444" strokeWidth="2" />
        <text x="200" y="12" textAnchor="middle" className="text-[8px] font-bold" fill="#ef4444">LIQ</text>

        <text x="250" y="40" textAnchor="middle" className="text-[12px] font-bold" fill="#1f2937">
          HF = {healthFactor.toFixed(3)}
        </text>

        <text x="250" y="70" textAnchor="middle" className="text-[9px] fill-gray-600 dark:fill-gray-400">
          LTV: {ltv.toFixed(1)}% | Liq Price: ${liqPrice.toFixed(0)} | Distance: {distToLiq.toFixed(1)}%
        </text>
        <text x="250" y="85" textAnchor="middle"
          className={`text-[10px] font-bold ${isHealthy ? (isWarning ? 'fill-amber-500' : 'fill-green-600') : 'fill-red-500'}`}>
          {healthFactor < 1 ? 'LIQUIDATABLE!' : isWarning ? 'WARNING - LOW HF' : 'HEALTHY'}
        </text>
      </svg>
    </div>
  )
}

export default function LendingLiquidation() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        DeFi Lending and Liquidation Strategies
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        DeFi lending protocols like Aave and Compound create opportunities for
        quantitative strategies in both lending optimization and liquidation bot
        operation. Liquidation bots monitor undercollateralized positions and execute
        liquidations to earn protocol-defined bonuses, while lending optimizers
        maximize yield across protocols.
      </p>

      <DefinitionBlock
        title="Health Factor"
        label="Definition 2.1"
        definition="The health factor in DeFi lending is the ratio of collateral value (adjusted by the liquidation threshold) to outstanding debt. When the health factor falls below 1.0, the position becomes eligible for liquidation. Liquidators can repay a portion of the debt and seize collateral at a discount (typically 5-15%)."
        notation={<><InlineMath math="\text{HF} = \frac{\sum_i C_i \cdot P_i \cdot \text{LT}_i}{\sum_j D_j \cdot P_j}" /> where <InlineMath math="C_i" /> is collateral amount, <InlineMath math="P_i" /> is price, <InlineMath math="\text{LT}_i" /> is liquidation threshold, and <InlineMath math="D_j" /> is debt amount.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Liquidation Mechanics
      </h3>

      <BlockMath math="\text{Liquidation Profit} = D_{\text{repaid}} \times \text{Bonus\%} - \text{Gas Cost}" />

      <BlockMath math="\text{Max Repay} = \min\!\left(\text{Close Factor} \times D, \frac{C \times P_C}{\text{Bonus Factor}}\right)" />

      <TheoremBlock
        title="Liquidation Cascade Dynamics"
        label="Empirical Finding 2.1"
        statement={<>During rapid price declines, DeFi liquidations create positive feedback loops (liquidation cascades): as positions are liquidated, collateral is sold on DEXs, pushing prices lower and triggering more liquidations. For ETH on Aave, a 20% price drop within 4 hours triggers approximately 3--5% of total borrowing to be liquidated, with cascade multiplier: <BlockMath math="\text{Cascade} \approx 1 + \frac{\text{Liquidated Collateral}}{L_{\text{DEX}}} \times \text{Impact}" /> where <InlineMath math="L_{\text{DEX}}" /> is DEX liquidity depth.</>}
        proof={<>Analysis of 50 major market drawdown events (2020--2024) across Aave V2/V3 and Compound. During the May 2022 LUNA crash, approximately $400M was liquidated on Aave within 24 hours, with cascading effects amplifying the price decline by an estimated 8--12%.</>}
      />

      <InteractiveLiquidation />

      <PythonCode
        title="liquidation_bot.py"
        runnable
        code={`import numpy as np

class DeFiLendingPosition:
    """Model a DeFi lending position (Aave-like)."""

    def __init__(self, collateral_asset, collateral_amount, collateral_price,
                 debt_asset, debt_amount, liq_threshold=0.80, liq_bonus=0.05):
        self.coll_asset = collateral_asset
        self.coll_amount = collateral_amount
        self.coll_price = collateral_price
        self.debt_asset = debt_asset
        self.debt_amount = debt_amount
        self.liq_threshold = liq_threshold
        self.liq_bonus = liq_bonus

    @property
    def collateral_value(self):
        return self.coll_amount * self.coll_price

    @property
    def health_factor(self):
        return (self.collateral_value * self.liq_threshold) / self.debt_amount

    @property
    def ltv(self):
        return self.debt_amount / self.collateral_value

    @property
    def liquidation_price(self):
        return self.debt_amount / (self.coll_amount * self.liq_threshold)

    def is_liquidatable(self):
        return self.health_factor < 1.0

    def liquidation_opportunity(self, close_factor=0.5, gas_cost_usd=10):
        """Compute liquidation opportunity if position is underwater."""
        if not self.is_liquidatable():
            return None

        max_repay = self.debt_amount * close_factor
        collateral_seized = max_repay * (1 + self.liq_bonus) / self.coll_price
        collateral_seized = min(collateral_seized, self.coll_amount)
        actual_repay = collateral_seized * self.coll_price / (1 + self.liq_bonus)

        profit = collateral_seized * self.coll_price - actual_repay - gas_cost_usd

        return {
            'debt_repaid': actual_repay,
            'collateral_seized': collateral_seized,
            'collateral_value': collateral_seized * self.coll_price,
            'gross_profit': collateral_seized * self.coll_price - actual_repay,
            'gas_cost': gas_cost_usd,
            'net_profit': profit,
            'profitable': profit > 0,
        }

class LiquidationBot:
    """Monitor and execute DeFi liquidations."""

    def __init__(self, gas_cost=10, min_profit=50):
        self.gas_cost = gas_cost
        self.min_profit = min_profit

    def scan_positions(self, positions):
        """Scan for liquidatable positions."""
        opportunities = []
        for pos in positions:
            if pos.is_liquidatable():
                opp = pos.liquidation_opportunity(gas_cost_usd=self.gas_cost)
                if opp and opp['net_profit'] > self.min_profit:
                    opp['position'] = f"{pos.coll_amount} {pos.coll_asset}"
                    opportunities.append(opp)

        opportunities.sort(key=lambda x: -x['net_profit'])
        return opportunities

    def simulate_crash(self, positions, price_drop_pct, n_steps=10):
        """Simulate a price crash and resulting liquidations."""
        results = []
        total_liquidated = 0
        remaining = list(positions)

        for step in range(n_steps):
            step_drop = price_drop_pct / n_steps
            # Apply price drop
            for pos in remaining:
                pos.coll_price *= (1 - step_drop / 100)

            # Find liquidations
            to_liquidate = [p for p in remaining if p.is_liquidatable()]
            step_liquidated = sum(p.collateral_value for p in to_liquidate)
            total_liquidated += step_liquidated
            remaining = [p for p in remaining if not p.is_liquidatable()]

            results.append({
                'step': step + 1,
                'price_drop': (step + 1) * step_drop,
                'liquidations': len(to_liquidate),
                'value_liquidated': step_liquidated,
                'remaining_positions': len(remaining),
            })

        return results, total_liquidated

# Simulate lending positions
np.random.seed(42)
n_positions = 50

positions = []
for i in range(n_positions):
    eth_amount = np.random.uniform(1, 100)
    eth_price = 3000
    ltv = np.random.uniform(0.4, 0.78)
    debt = eth_amount * eth_price * ltv

    positions.append(DeFiLendingPosition(
        'ETH', eth_amount, eth_price, 'USDT', debt,
        liq_threshold=0.80, liq_bonus=0.05
    ))

print("=" * 55)
print("DEFI LIQUIDATION ANALYSIS")
print("=" * 55)

# Current state
hfs = [p.health_factor for p in positions]
ltvs = [p.ltv for p in positions]
print(f"\\nPosition Summary ({n_positions} positions):")
print(f"  Avg Health Factor: {np.mean(hfs):.3f}")
print(f"  Min Health Factor: {np.min(hfs):.3f}")
print(f"  Avg LTV:           {np.mean(ltvs):.1%}")
print(f"  Total Collateral:  ${sum(p.collateral_value for p in positions):,.0f}")
print(f"  Total Debt:        ${sum(p.debt_amount for p in positions):,.0f}")

# Current liquidation opportunities
bot = LiquidationBot(gas_cost=10, min_profit=20)
opps = bot.scan_positions(positions)
print(f"\\nCurrent Liquidation Opportunities: {len(opps)}")
for opp in opps[:3]:
    print(f"  Position: {opp['position']}")
    print(f"    Repay: ${opp['debt_repaid']:,.0f} -> Seize: ${opp['collateral_value']:,.0f}")
    print(f"    Net Profit: ${opp['net_profit']:,.0f}")

# Crash simulation
positions_copy = [DeFiLendingPosition(
    p.coll_asset, p.coll_amount, p.coll_price,
    p.debt_asset, p.debt_amount
) for p in positions]

results, total_liq = bot.simulate_crash(positions_copy, price_drop_pct=30, n_steps=6)
print(f"\\n--- Crash Simulation (30% ETH drop) ---")
for r in results:
    print(f"  Step {r['step']}: -{r['price_drop']:.0f}% | "
          f"Liquidations: {r['liquidations']} | "
          f"Value: ${r['value_liquidated']:,.0f}")
print(f"  Total Liquidated: ${total_liq:,.0f}")`}
      />

      <ExampleBlock
        title="Liquidation Profitability on Aave"
        difficulty="intermediate"
        problem="A borrower on Aave has 10 ETH collateral at $3,000/ETH ($30,000 value), $22,000 USDT debt, liquidation threshold 80%, and liquidation bonus 5%. ETH drops to $2,700. Is the position liquidatable? If yes, compute the liquidator's profit (close factor = 50%, gas = $15)."
        solution={[
          {
            step: 'Compute health factor at $2,700',
            formula: 'HF = \\frac{10 \\times 2700 \\times 0.80}{22000} = \\frac{21600}{22000} = 0.982',
            explanation: 'HF < 1.0, so the position is liquidatable.',
          },
          {
            step: 'Maximum repayable debt',
            formula: '\\text{Max repay} = 0.50 \\times 22000 = \\$11{,}000',
          },
          {
            step: 'Collateral seized',
            formula: '\\text{Seized} = \\frac{11000 \\times 1.05}{2700} = 4.278 \\text{ ETH} = \\$11{,}550',
          },
          {
            step: 'Net profit',
            formula: '\\pi = 11{,}550 - 11{,}000 - 15 = \\$535',
            explanation: 'The liquidator earns $535 for repaying $11K of debt. This requires flash loan capital or pre-positioned stablecoin balance.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          DeFi liquidation is a competitive, MEV-driven activity where bots monitor
          thousands of lending positions for underwater collateral. The strategy
          requires real-time price monitoring, gas optimization, and often flash
          loans for capital efficiency. Lending optimization involves dynamically
          adjusting collateral ratios and borrowing across protocols to maximize
          yield while maintaining safe health factors.
        </p>
      </NoteBlock>
    </div>
  )
}
