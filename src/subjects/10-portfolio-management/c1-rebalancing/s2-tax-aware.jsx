import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveTaxCalculator() {
  const [buyPrice, setBuyPrice] = useState(100)
  const [sellPrice, setSellPrice] = useState(150)
  const [holdingMonths, setHoldingMonths] = useState(8)
  const [quantity, setQuantity] = useState(100)

  const gain = (sellPrice - buyPrice) * quantity
  const isLTCG = holdingMonths >= 12
  const sttBuy = sellPrice * quantity * 0.001
  const sttSell = sellPrice * quantity * 0.001

  const ltcgExemption = 100000
  const taxableGain = isLTCG ? Math.max(0, gain - ltcgExemption) : gain
  const taxRate = isLTCG ? 0.10 : 0.15
  const tax = taxableGain * taxRate
  const surcharge = tax * 0.04
  const totalTax = tax + surcharge

  const netGain = gain - totalTax - sttBuy - sttSell

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Indian Capital Gains Tax Calculator
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Calculate tax on equity gains under Indian tax law (FY 2024-25 rules).
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Buy Price (INR): {buyPrice}</span>
          <input type="range" min="50" max="5000" step="10" value={buyPrice}
            onChange={e => setBuyPrice(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Sell Price (INR): {sellPrice}</span>
          <input type="range" min="50" max="5000" step="10" value={sellPrice}
            onChange={e => setSellPrice(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Holding: {holdingMonths} months</span>
          <input type="range" min="1" max="36" step="1" value={holdingMonths}
            onChange={e => setHoldingMonths(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Quantity: {quantity}</span>
          <input type="range" min="1" max="1000" step="10" value={quantity}
            onChange={e => setQuantity(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 text-center text-xs">
        <div className={`rounded-lg p-3 ${isLTCG ? 'bg-green-50 dark:bg-green-900/30' : 'bg-amber-50 dark:bg-amber-900/30'}`}>
          <div className="text-gray-500">Type</div>
          <div className={`text-lg font-bold ${isLTCG ? 'text-green-600' : 'text-amber-600'}`}>
            {isLTCG ? 'LTCG' : 'STCG'}
          </div>
          <div className="text-[10px]">{isLTCG ? '10% > INR 1L' : '15% flat'}</div>
        </div>
        <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30">
          <div className="text-gray-500">Gross Gain</div>
          <div className="text-lg font-bold text-indigo-600">INR {gain.toLocaleString()}</div>
        </div>
        <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/30">
          <div className="text-gray-500">Total Tax</div>
          <div className="text-lg font-bold text-red-600">INR {Math.round(totalTax).toLocaleString()}</div>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
          <div className="text-gray-500">Net Gain</div>
          <div className="text-lg font-bold text-purple-600">INR {Math.round(netGain).toLocaleString()}</div>
        </div>
      </div>
    </div>
  )
}

export default function TaxAware() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Tax-Aware Rebalancing for Indian Portfolios
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        India&rsquo;s tax code creates significant incentives for tax-aware portfolio management.
        The difference between Short-Term Capital Gains (STCG) at 15% and Long-Term Capital Gains
        (LTCG) at 10% (above INR 1 lakh exemption), combined with STT and the grandfathering
        provisions, means that tax-naive rebalancing can cost investors 1-2% per year in
        unnecessary tax drag.
      </p>

      <DefinitionBlock
        title="Indian Equity Tax Structure (FY 2024-25)"
        label="Definition 10.2"
        definition="For listed equity held on a recognized exchange (NSE/BSE): STCG (holding < 12 months) is taxed at 15% flat. LTCG (holding ≥ 12 months) is taxed at 10% on gains exceeding INR 1,00,000 per financial year, without indexation benefit. STT of 0.1% is charged on delivery transactions (buy and sell). These rates apply to direct equity and equity-oriented mutual funds."
        notation="STCG = Short-Term Capital Gains, LTCG = Long-Term Capital Gains, STT = Securities Transaction Tax"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Indian Tax Rules Summary
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Instrument</th>
              <th className="px-4 py-2 text-center text-gray-600 dark:text-gray-400">STCG Rate</th>
              <th className="px-4 py-2 text-center text-gray-600 dark:text-gray-400">LTCG Rate</th>
              <th className="px-4 py-2 text-center text-gray-600 dark:text-gray-400">LT Threshold</th>
              <th className="px-4 py-2 text-center text-gray-600 dark:text-gray-400">LTCG Exemption</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Listed Equity</td>
              <td className="px-4 py-2 text-center">15%</td>
              <td className="px-4 py-2 text-center">10%</td>
              <td className="px-4 py-2 text-center">12 months</td>
              <td className="px-4 py-2 text-center">INR 1,00,000/yr</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Equity MF/ETF</td>
              <td className="px-4 py-2 text-center">15%</td>
              <td className="px-4 py-2 text-center">10%</td>
              <td className="px-4 py-2 text-center">12 months</td>
              <td className="px-4 py-2 text-center">INR 1,00,000/yr</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Debt MF</td>
              <td className="px-4 py-2 text-center">Slab rate</td>
              <td className="px-4 py-2 text-center">Slab rate</td>
              <td className="px-4 py-2 text-center">N/A (post 2023)</td>
              <td className="px-4 py-2 text-center">None</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Gold/REIT/InvIT</td>
              <td className="px-4 py-2 text-center">Slab rate</td>
              <td className="px-4 py-2 text-center">20% w/ indexation</td>
              <td className="px-4 py-2 text-center">36 months</td>
              <td className="px-4 py-2 text-center">None</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveTaxCalculator />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Tax-Loss Harvesting
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Tax-loss harvesting (TLH) involves selling losing positions to realize capital losses
        that offset gains. Under Indian tax law:
      </p>

      <BlockMath math="\text{Tax Saved} = \min(\text{Realized Loss}, \text{Realized Gain}) \times \text{Tax Rate}" />

      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4">
        <li>Short-term losses can offset both STCG and LTCG</li>
        <li>Long-term losses can only offset LTCG</li>
        <li>Unabsorbed losses can be carried forward for 8 assessment years</li>
        <li>Must file ITR within due date to carry forward losses</li>
      </ul>

      <PythonCode
        title="tax_aware_rebalancing.py"
        runnable
        code={`import numpy as np

np.random.seed(42)

# Tax-aware rebalancing simulator for Indian portfolio
class IndianTaxEngine:
    def __init__(self):
        self.stcg_rate = 0.15  # 15% for equity
        self.ltcg_rate = 0.10  # 10% for equity
        self.ltcg_exemption = 100000  # INR 1 lakh per FY
        self.lt_threshold_days = 365  # 12 months
        self.stt_rate = 0.001  # 0.1% STT

    def compute_tax(self, buy_price, sell_price, quantity, holding_days):
        gain = (sell_price - buy_price) * quantity
        stt = sell_price * quantity * self.stt_rate

        if gain <= 0:
            return {'tax': 0, 'stt': stt, 'gain': gain, 'type': 'LOSS'}

        if holding_days >= self.lt_threshold_days:
            taxable = max(0, gain - self.ltcg_exemption)
            tax = taxable * self.ltcg_rate
            return {'tax': tax, 'stt': stt, 'gain': gain, 'type': 'LTCG'}
        else:
            tax = gain * self.stcg_rate
            return {'tax': tax, 'stt': stt, 'gain': gain, 'type': 'STCG'}

# Portfolio with lot-level tracking
stocks = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ITC']
lots = [
    {'stock': 'RELIANCE', 'buy_price': 2200, 'qty': 50, 'hold_days': 400, 'current': 2600},
    {'stock': 'RELIANCE', 'buy_price': 2700, 'qty': 30, 'hold_days': 90, 'current': 2600},
    {'stock': 'TCS', 'buy_price': 3200, 'qty': 40, 'hold_days': 500, 'current': 3600},
    {'stock': 'HDFCBANK', 'buy_price': 1700, 'qty': 80, 'hold_days': 200, 'current': 1550},
    {'stock': 'INFY', 'buy_price': 1300, 'qty': 60, 'hold_days': 450, 'current': 1500},
    {'stock': 'ITC', 'buy_price': 400, 'qty': 100, 'hold_days': 100, 'current': 470},
]

tax_engine = IndianTaxEngine()

# Strategy 1: Naive rebalancing (sell proportionally from each lot)
print("=== Strategy 1: Tax-Naive Rebalancing ===")
total_tax_naive = 0
for lot in lots:
    sell_qty = lot['qty'] // 3  # Sell 1/3 of each lot
    result = tax_engine.compute_tax(lot['buy_price'], lot['current'], sell_qty, lot['hold_days'])
    total_tax_naive += result['tax'] + result['stt']
    if sell_qty > 0:
        print(f"  {lot['stock']:10s}: Sell {sell_qty:3d} @ {lot['current']:5d} "
              f"(bought {lot['buy_price']:5d}, {lot['hold_days']:3d}d) -> "
              f"{result['type']:4s} Tax: INR {result['tax']:8.0f}")

print(f"  Total tax (naive): INR {total_tax_naive:,.0f}")

# Strategy 2: Tax-aware (sell LTCG first, harvest losses, use exemption)
print(f"\\n=== Strategy 2: Tax-Aware Rebalancing ===")

# Sort: prioritize (1) losses, (2) LTCG within exemption, (3) LTCG, (4) STCG
sorted_lots = sorted(lots, key=lambda l: (
    0 if l['current'] < l['buy_price'] else 1,  # Losses first
    0 if l['hold_days'] >= 365 else 1,            # LTCG before STCG
    l['current'] - l['buy_price']                  # Smaller gains first
))

total_tax_aware = 0
ltcg_used = 0
for lot in sorted_lots:
    sell_qty = lot['qty'] // 3
    result = tax_engine.compute_tax(lot['buy_price'], lot['current'], sell_qty, lot['hold_days'])

    # Track LTCG exemption usage
    if result['type'] == 'LTCG' and result['gain'] > 0:
        remaining_exemption = max(0, tax_engine.ltcg_exemption - ltcg_used)
        exempt_gain = min(result['gain'], remaining_exemption)
        ltcg_used += exempt_gain
        actual_tax = max(0, result['gain'] - exempt_gain) * tax_engine.ltcg_rate
        result['tax'] = actual_tax

    total_tax_aware += result['tax'] + result['stt']
    if sell_qty > 0:
        print(f"  {lot['stock']:10s}: Sell {sell_qty:3d} @ {lot['current']:5d} "
              f"(bought {lot['buy_price']:5d}, {lot['hold_days']:3d}d) -> "
              f"{result['type']:4s} Tax: INR {result['tax']:8.0f}")

print(f"  Total tax (aware): INR {total_tax_aware:,.0f}")
print(f"  Tax savings: INR {total_tax_naive - total_tax_aware:,.0f} "
      f"({(1 - total_tax_aware/total_tax_naive)*100:.1f}%)")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        LTCG Exemption Harvesting
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Indian tax law provides a unique opportunity: INR 1,00,000 of LTCG on equity is exempt
        per financial year. Smart investors can &ldquo;harvest&rdquo; this exemption annually:
      </p>

      <BlockMath math="\text{Annual Tax Alpha} = \text{LTCG Exemption} \times \text{LTCG Rate} = 1,00,000 \times 10\% = \text{INR } 10,000" />

      <PythonCode
        title="ltcg_harvest.py"
        runnable
        code={`import numpy as np

# LTCG exemption harvesting strategy
initial_investment = 1000000  # INR 10 lakh
annual_return = 0.12  # 12% CAGR
years = 10
ltcg_exemption = 100000
ltcg_rate = 0.10
stt_rate = 0.001

# Strategy A: Buy and hold (sell after 10 years)
final_value_bh = initial_investment * (1 + annual_return) ** years
total_gain_bh = final_value_bh - initial_investment
tax_bh = max(0, total_gain_bh - ltcg_exemption) * ltcg_rate
net_bh = final_value_bh - tax_bh

# Strategy B: Annual harvest (sell and rebuy to reset cost basis)
value = initial_investment
cost_basis = initial_investment
total_tax_harvest = 0
total_stt = 0

for year in range(years):
    value *= (1 + annual_return)
    unrealized_gain = value - cost_basis

    if unrealized_gain > 0:
        # Sell enough to realize up to INR 1L gain
        harvest_fraction = min(1.0, ltcg_exemption / unrealized_gain)
        realized_gain = unrealized_gain * harvest_fraction

        # Tax on excess over exemption
        taxable = max(0, realized_gain - ltcg_exemption)
        tax = taxable * ltcg_rate
        stt = value * harvest_fraction * stt_rate * 2  # Buy + sell

        total_tax_harvest += tax
        total_stt += stt

        # Reset cost basis for harvested portion
        cost_basis = cost_basis * (1 - harvest_fraction) + value * harvest_fraction
        value -= (tax + stt)

# Final sale
final_gain = value - cost_basis
final_tax = max(0, final_gain - ltcg_exemption) * ltcg_rate
total_tax_harvest += final_tax
net_harvest = value - final_tax

print("=== LTCG Exemption Harvesting Analysis ===")
print(f"Initial Investment: INR {initial_investment:,.0f}")
print(f"Annual Return: {annual_return:.0%}, Period: {years} years")
print(f"\\nStrategy A: Buy and Hold")
print(f"  Final Value: INR {final_value_bh:,.0f}")
print(f"  Total LTCG:  INR {total_gain_bh:,.0f}")
print(f"  Tax:         INR {tax_bh:,.0f}")
print(f"  Net Value:   INR {net_bh:,.0f}")
print(f"\\nStrategy B: Annual Harvest")
print(f"  Final Value: INR {value:,.0f}")
print(f"  Total Tax:   INR {total_tax_harvest:,.0f}")
print(f"  Total STT:   INR {total_stt:,.0f}")
print(f"  Net Value:   INR {net_harvest:,.0f}")
print(f"\\nBenefit of Harvesting: INR {net_harvest - net_bh:,.0f} "
      f"({(net_harvest/net_bh - 1)*100:.2f}%)")`}
      />

      <ExampleBlock
        title="Tax-Lot Selection for Rebalancing"
        difficulty="intermediate"
        problem="You hold 3 lots of Reliance: (1) 50 shares bought at INR 2200, 14 months ago, (2) 30 shares at INR 2700, 3 months ago, (3) 20 shares at INR 2400, 8 months ago. Current price: INR 2600. You need to sell 30 shares. Which lots minimize tax?"
        solution={[
          {
            step: 'Evaluate each lot',
            formula: '\\text{Lot 1: LTCG} = (2600-2200) \\times 50 = 20000 \\text{ (10\\% tax)}',
            explanation: 'Lot 1 is LTCG (>12 months). Gain = INR 400/share.',
          },
          {
            step: 'Evaluate Lot 2 and 3',
            formula: '\\text{Lot 2: STCG loss} = (2600-2700) \\times 30 = -3000, \\quad \\text{Lot 3: STCG} = (2600-2400) \\times 20 = 4000',
            explanation: 'Lot 2 has a loss (tax-free and offsets gains). Lot 3 is STCG at 15%.',
          },
          {
            step: 'Optimal selection',
            formula: '\\text{Sell all 30 from Lot 2 (STCG loss of INR 3000)}',
            explanation: 'Selling Lot 2 realizes a loss that can offset other gains. Tax = INR 0. If Lot 1 were sold instead, tax = INR 2000 (LTCG within exemption).',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Tax-aware rebalancing can save 0.5-1.5% per year for Indian investors. Key strategies:
          (1) harvest LTCG exemption of INR 1 lakh annually, (2) sell loss-making lots first
          (FIFO is not mandatory for shares in demat), (3) prefer selling LTCG over STCG lots,
          (4) time rebalancing to cross the 12-month threshold, and (5) use SIP redirects and
          dividend reinvestment for tax-free rebalancing.
        </p>
      </NoteBlock>
    </div>
  )
}
