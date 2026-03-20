import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveTokenomics() {
  const [totalSupply, setTotalSupply] = useState(1000)
  const [circulatingPct, setCirculatingPct] = useState(40)
  const [vestingMonths, setVestingMonths] = useState(24)
  const [monthlyUnlock, setMonthlyUnlock] = useState(2.5)
  const [tdsTaxRate, setTdsTaxRate] = useState(1)

  const circulatingSupply = totalSupply * circulatingPct / 100
  const fullyDilutedMcap = totalSupply * 10  // $10 per token assumed
  const currentMcap = circulatingSupply * 10
  const mcapRatio = (fullyDilutedMcap / currentMcap).toFixed(2)

  const monthsToFullCirculation = Math.ceil((100 - circulatingPct) / monthlyUnlock)
  const inflationRate = (monthlyUnlock * 12 / circulatingPct * 100).toFixed(1)

  const tdsImpact = (tdsTaxRate / 100 * 2).toFixed(2) // round-trip
  const effectiveSpread = (0.1 + parseFloat(tdsImpact)).toFixed(2)

  // Unlock schedule visualization
  const unlockData = []
  let cumPct = circulatingPct
  for (let m = 0; m <= Math.min(vestingMonths, 48); m++) {
    unlockData.push({ month: m, pct: Math.min(cumPct, 100) })
    cumPct += monthlyUnlock
  }

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Token Unlock & Indian TDS Impact Analyzer
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Model token unlock schedules and analyze the impact of India's 1% TDS on VDA
        (Virtual Digital Assets) on trading economics.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-5">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Total Supply = {totalSupply}M</span>
          <input type="range" min="100" max="10000" step="100" value={totalSupply}
            onChange={e => setTotalSupply(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Circulating = {circulatingPct}%</span>
          <input type="range" min="5" max="100" step="5" value={circulatingPct}
            onChange={e => setCirculatingPct(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Vesting = {vestingMonths} months</span>
          <input type="range" min="6" max="48" step="3" value={vestingMonths}
            onChange={e => setVestingMonths(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Monthly Unlock = {monthlyUnlock}%</span>
          <input type="range" min="0.5" max="10" step="0.5" value={monthlyUnlock}
            onChange={e => setMonthlyUnlock(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>TDS Rate = {tdsTaxRate}%</span>
          <input type="range" min="0" max="5" step="0.5" value={tdsTaxRate}
            onChange={e => setTdsTaxRate(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 520 200" className="w-full max-w-xl mx-auto block" aria-label="Token unlock schedule">
        {/* Unlock curve */}
        <text x="260" y="14" textAnchor="middle" className="text-[10px] font-semibold" fill="#6b7280">
          Token Unlock Schedule | FDV/MCap Ratio: {mcapRatio}x
        </text>

        {/* Grid */}
        {[0, 25, 50, 75, 100].map(pct => {
          const y = 160 - (pct / 100) * 130
          return (
            <g key={pct}>
              <line x1="50" y1={y} x2="490" y2={y} stroke="#e5e7eb" strokeWidth="0.5" />
              <text x="45" y={y + 3} textAnchor="end" className="text-[7px]" fill="#9ca3af">{pct}%</text>
            </g>
          )
        })}

        {/* Unlock curve */}
        {unlockData.length > 1 && (
          <polyline fill="none" stroke="#6366f1" strokeWidth="2"
            points={unlockData.map(d => {
              const x = 50 + (d.month / Math.min(vestingMonths, 48)) * 440
              const y = 160 - (d.pct / 100) * 130
              return `${x},${y}`
            }).join(' ')} />
        )}

        {/* Fill area */}
        <polygon fill="#6366f1" opacity="0.1"
          points={[
            `50,160`,
            ...unlockData.map(d => {
              const x = 50 + (d.month / Math.min(vestingMonths, 48)) * 440
              const y = 160 - (d.pct / 100) * 130
              return `${x},${y}`
            }),
            `${50 + 440},160`,
          ].join(' ')} />

        <line x1="50" y1="160" x2="490" y2="160" stroke="#9ca3af" strokeWidth="1" />
        <text x="270" y="175" textAnchor="middle" className="text-[9px]" fill="#6b7280">Months</text>

        {/* Metrics */}
        <text x="350" y="45" className="text-[8px]" fill="#6b7280">
          Inflation: {inflationRate}% annual
        </text>
        <text x="350" y="58" className="text-[8px]" fill="#6b7280">
          Full circ: ~{monthsToFullCirculation} months
        </text>
        <text x="350" y="71" className="text-[8px] font-bold" fill="#dc2626">
          TDS drag: {tdsImpact}% round-trip
        </text>
        <text x="350" y="84" className="text-[8px]" fill="#6b7280">
          Eff. spread: {effectiveSpread}%
        </text>
      </svg>
    </div>
  )
}

export default function TokenomicsAnalysis() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Tokenomics Analysis & Indian VDA Taxation
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Tokenomics -- the economic design of crypto tokens -- is a critical alpha
        source in crypto quantitative trading. Token unlock schedules, supply
        inflation, and vesting cliffs create predictable selling pressure that can
        be systematically traded. For Indian crypto traders, the 1% TDS (Tax
        Deducted at Source) on VDA (Virtual Digital Assets) transactions introduced
        in the 2022 Union Budget, combined with the 30% flat tax on crypto gains,
        fundamentally alters trading economics and strategy viability.
      </p>

      <DefinitionBlock
        title="Tokenomics"
        label="Definition 17.7"
        definition="Tokenomics refers to the economic model governing a cryptocurrency token, including its total supply, emission schedule, vesting periods for team/investor allocations, staking rewards, burn mechanisms, and governance utility. Quantitative tokenomics analysis models the supply-demand dynamics to forecast price pressure from upcoming token unlocks."
        notation={<>The circulating supply ratio is <InlineMath math="r_t = S_t^{\text{circ}} / S^{\text{total}}" /> and the dilution rate is <InlineMath math="\delta_t = \frac{\Delta S_t^{\text{circ}}}{S_t^{\text{circ}}}" />.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Token Unlock Impact Model
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        When locked tokens vest and enter circulation, they create potential sell
        pressure. The expected price impact of an unlock event can be modelled as:
      </p>

      <BlockMath math="\Delta P_{\text{unlock}} = -\eta \cdot \frac{U_t}{V_{\text{daily}}} \cdot P_t" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="U_t" /> is the unlock amount,{' '}
        <InlineMath math="V_{\text{daily}}" /> is average daily trading volume,{' '}
        <InlineMath math="P_t" /> is current price, and{' '}
        <InlineMath math="\eta" /> is the sell-through rate (fraction of unlocked
        tokens actually sold). Empirically, <InlineMath math="\eta \approx 0.3\text{-}0.6" />{' '}
        for investor allocations and <InlineMath math="\eta \approx 0.1\text{-}0.2" />{' '}
        for team allocations.
      </p>

      <BlockMath math="\text{FDV/MCap Ratio} = \frac{S^{\text{total}} \cdot P}{S^{\text{circ}} \cdot P} = \frac{1}{r_t}" />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        India's 1% TDS on VDA (Section 194S)
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Since July 2022, all crypto transactions in India attract 1% TDS under
        Section 194S of the Income Tax Act. This creates a significant drag on
        high-frequency trading strategies:
      </p>

      <BlockMath math="\text{Annual TDS Drag} = 2 \times \text{TDS\%} \times N_{\text{trades}} \times \bar{V}_{\text{trade}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The factor of 2 accounts for both buy and sell sides. Combined with the
        30% flat tax (no loss offset) under Section 115BBH, the effective taxation
        makes many strategies unprofitable that would work in other jurisdictions:
      </p>

      <BlockMath math="\text{Effective Tax} = 0.30 \cdot \max(\text{gains}, 0) + 0.01 \cdot |\text{turnover}|" />

      <TheoremBlock
        title="Break-Even Sharpe Under Indian VDA Tax"
        label="Theorem 17.3"
        statement={<>For a crypto trading strategy with <InlineMath math="N" /> trades per year, average trade size <InlineMath math="V" />, and TDS rate <InlineMath math="\tau" />, the minimum Sharpe ratio required for profitability after tax is:</>}
        formula="S_{\min} = \frac{2N\tau + 0.3 \cdot \mu^+ \cdot \text{Capital}}{\sigma \cdot \text{Capital}} \cdot \sqrt{252}"
        proof={<>Setting after-tax return to zero: gross P&L minus TDS drag (2 * N * tau * V) minus income tax (0.3 * gains) must equal zero. Since losses cannot offset gains under Section 115BBH, the effective tax rate on gross P&L is higher than 30%. For a strategy with 100 daily trades of INR 1 lakh each, the annual TDS alone is INR 73 lakh (2 * 252 * 100 * 0.01 * 100000), requiring minimum annualized return of approximately 73% just to cover TDS -- pushing the minimum viable Sharpe above 3.</>}
      />

      <InteractiveTokenomics />

      <PythonCode
        title="tokenomics_india.py"
        runnable
        code={`import numpy as np
from dataclasses import dataclass
from typing import List

@dataclass
class TokenUnlock:
    month: int
    amount_pct: float
    category: str  # 'team', 'investor', 'ecosystem', 'community'
    sell_through: float = 0.5  # Expected fraction sold

@dataclass
class IndianVDATax:
    """India VDA taxation model (2022 onwards)."""
    tds_rate: float = 0.01          # 1% TDS under Section 194S
    income_tax_rate: float = 0.30   # 30% flat tax, Section 115BBH
    surcharge_rate: float = 0.0     # Depends on income bracket
    cess_rate: float = 0.04         # Health and Education Cess
    can_offset_losses: bool = False  # No loss offset allowed

    def calculate_tds(self, trade_value):
        """TDS on a single trade."""
        return trade_value * self.tds_rate

    def annual_tds_drag(self, daily_trades, avg_trade_value, trading_days=252):
        """Total annual TDS drag."""
        return 2 * daily_trades * avg_trade_value * self.tds_rate * trading_days

    def effective_tax(self, gross_profit, gross_loss, turnover):
        """Total effective tax burden."""
        tds = turnover * self.tds_rate
        # No loss offset: tax only on profits
        income_tax = max(0, gross_profit) * self.income_tax_rate
        cess = income_tax * self.cess_rate
        total = tds + income_tax + cess
        return {
            'tds': tds,
            'income_tax': income_tax,
            'cess': cess,
            'total': total,
            'effective_rate': total / max(gross_profit - gross_loss, 1) * 100,
        }

class TokenomicsAnalyzer:
    """Analyze token unlock schedules and price impact."""

    def __init__(self, total_supply, circulating_pct, price):
        self.total_supply = total_supply
        self.circulating_pct = circulating_pct
        self.price = price
        self.unlocks: List[TokenUnlock] = []

    def add_unlock(self, unlock: TokenUnlock):
        self.unlocks.append(unlock)

    def compute_supply_schedule(self, months=36):
        """Project circulating supply over time."""
        schedule = []
        circ = self.circulating_pct
        for m in range(months):
            month_unlocks = [u for u in self.unlocks if u.month == m]
            for u in month_unlocks:
                circ = min(100, circ + u.amount_pct)
            schedule.append({'month': m, 'circulating_pct': circ})
        return schedule

    def estimate_sell_pressure(self, daily_volume):
        """Estimate monthly sell pressure from unlocks."""
        pressures = []
        for u in self.unlocks:
            unlock_value = self.total_supply * u.amount_pct / 100 * self.price
            expected_sell = unlock_value * u.sell_through
            days_to_sell = max(1, expected_sell / daily_volume * 5)
            price_impact = -0.1 * (expected_sell / daily_volume)
            pressures.append({
                'month': u.month,
                'category': u.category,
                'unlock_value': unlock_value,
                'sell_pressure': expected_sell,
                'days_to_absorb': days_to_sell,
                'est_price_impact': price_impact,
            })
        return pressures

# --- Demo ---
print("=== Tokenomics Analysis & Indian VDA Tax ===\\n")

# 1. Token Unlock Analysis
analyzer = TokenomicsAnalyzer(
    total_supply=1_000_000_000,  # 1B tokens
    circulating_pct=35,
    price=2.50  # USD
)

# Typical unlock schedule
unlocks = [
    TokenUnlock(6, 5.0, 'investor', 0.6),
    TokenUnlock(12, 10.0, 'investor', 0.5),
    TokenUnlock(12, 5.0, 'team', 0.15),
    TokenUnlock(18, 8.0, 'investor', 0.4),
    TokenUnlock(24, 5.0, 'team', 0.2),
    TokenUnlock(24, 10.0, 'ecosystem', 0.1),
]
for u in unlocks:
    analyzer.add_unlock(u)

schedule = analyzer.compute_supply_schedule(30)
print("--- Supply Schedule ---")
for s in schedule[::6]:
    print(f"  Month {s['month']:2d}: Circulating = {s['circulating_pct']:.1f}%")

sell_pressure = analyzer.estimate_sell_pressure(daily_volume=5_000_000)
print("\\n--- Sell Pressure from Unlocks ---")
for sp in sell_pressure:
    print(f"  Month {sp['month']:2d} ({sp['category']:>10}): "
          f"Unlock=${sp['unlock_value']/1e6:.1f}M, "
          f"Sell=${sp['sell_pressure']/1e6:.1f}M, "
          f"Impact={sp['est_price_impact']:.1%}")

# 2. Indian VDA Tax Impact
print("\\n=== Indian VDA Tax Analysis ===")
tax = IndianVDATax()

# Scenario: Algorithmic trader on WazirX/CoinDCX
scenarios = [
    {'name': 'Swing Trader', 'daily_trades': 2, 'avg_value': 50000},
    {'name': 'Day Trader', 'daily_trades': 20, 'avg_value': 100000},
    {'name': 'HF Bot', 'daily_trades': 200, 'avg_value': 50000},
]

for sc in scenarios:
    tds_annual = tax.annual_tds_drag(
        sc['daily_trades'], sc['avg_value']
    )
    annual_turnover = 2 * sc['daily_trades'] * sc['avg_value'] * 252

    # Assume 20% gross return on capital
    capital = sc['daily_trades'] * sc['avg_value'] * 5
    gross_profit = capital * 0.20
    gross_loss = capital * 0.08

    tax_result = tax.effective_tax(gross_profit, gross_loss, annual_turnover)

    print(f"\\n  --- {sc['name']} ---")
    print(f"  Capital: INR {capital:,.0f}")
    print(f"  Annual turnover: INR {annual_turnover:,.0f}")
    print(f"  TDS drag: INR {tds_annual:,.0f}")
    print(f"  Income tax: INR {tax_result['income_tax']:,.0f}")
    print(f"  Total tax: INR {tax_result['total']:,.0f}")
    print(f"  Effective rate: {tax_result['effective_rate']:.1f}%")
    print(f"  TDS as % of gross P&L: "
          f"{tds_annual / max(gross_profit - gross_loss, 1) * 100:.1f}%")

print("\\n--- Key Insight ---")
print("The 1% TDS makes HF strategies unviable in India.")
print("Focus on: low-frequency, high-conviction token unlock trades.")`}
      />

      <ExampleBlock
        title="Token Unlock Trade on Indian Exchange"
        difficulty="intermediate"
        problem="Token XYZ has a 10% investor unlock (100M tokens at $2 each = $200M) in 30 days. Daily volume is $10M. You want to short on WazirX pre-unlock. With 1% TDS, what is the minimum expected drop needed for profitability on a $50,000 (INR ~42 lakh) position?"
        solution={[
          {
            step: 'Calculate TDS cost',
            formula: '\\text{TDS} = 2 \\times 0.01 \\times 50000 = \\$1,000',
            explanation: 'Round-trip TDS: 1% on buy + 1% on sell = 2% of position size.',
          },
          {
            step: 'Estimate sell pressure and expected drop',
            formula: '\\text{Sell Pressure} = 0.5 \\times \\$200M = \\$100M',
            explanation: 'With 50% sell-through rate, $100M will hit the market over ~50 days (100M / 10M daily volume * 5x).',
          },
          {
            step: 'Compute break-even',
            formula: '\\text{Min drop} = \\frac{\\$1000 + \\text{spread cost}}{\\$50000} = \\frac{\\$1000 + \\$50}{\\$50000} = 2.1\\%',
            explanation: 'The token must drop at least 2.1% after the unlock for the trade to be profitable after Indian TDS. The estimated 10% sell-pressure-driven drop ($100M vs $10M daily volume) far exceeds this threshold, making it viable.',
          },
        ]}
      />

      <NoteBlock title="India VDA Regulatory Landscape" type="warning">
        <p>
          Indian crypto traders face a uniquely harsh tax regime: (1) <strong>30% flat tax</strong>{' '}
          on gains with no loss offset between different VDAs (Section 115BBH),
          (2) <strong>1% TDS</strong> on all transactions above INR 10,000 (Section 194S),
          (3) <strong>no deduction</strong> for any expenses except acquisition cost, and
          (4) <strong>no carry-forward</strong> of losses. This makes high-frequency strategies
          unviable and pushes Indian quants toward low-frequency, high-conviction trades
          based on tokenomics events (unlocks, burns, governance changes).
        </p>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Tokenomics analysis is a unique alpha source in crypto that has no direct analogue
          in traditional finance. Token unlocks are <strong>scheduled, public events</strong>{' '}
          that create predictable sell pressure -- making them ideal for systematic trading.
          For Indian traders, the 1% TDS constraint means focusing on large, infrequent
          unlock events where expected price impact (typically 5-20% for major unlocks
          relative to daily volume) far exceeds the 2% round-trip TDS cost. Always factor
          in the 30% tax on gains when computing strategy viability.
        </p>
      </NoteBlock>
    </div>
  )
}
