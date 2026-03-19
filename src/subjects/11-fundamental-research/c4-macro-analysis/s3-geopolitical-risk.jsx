import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveGeopoliticalRisk() {
  const [gprIndex, setGprIndex] = useState(120)
  const [oilShock, setOilShock] = useState(10)
  const [fiiOutflow, setFiiOutflow] = useState(5000)
  const [inrDepreciation, setInrDepreciation] = useState(3)

  const niftyImpact = -0.02 * (gprIndex / 100) - 0.003 * oilShock -
    0.0001 * (fiiOutflow / 1000) - 0.005 * inrDepreciation
  const vixImpact = 2.5 * (gprIndex / 100) + 0.3 * oilShock + 0.5 * (fiiOutflow / 1000)
  const goldImpact = 0.01 * (gprIndex / 100) + 0.002 * oilShock + 0.003 * inrDepreciation

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Geopolitical Risk Impact on Indian Markets
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Model the cascading impact of geopolitical events on Nifty, India VIX, and gold.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>GPR Index = {gprIndex}</span>
          <input type="range" min="50" max="300" step="5" value={gprIndex}
            onChange={e => setGprIndex(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Oil Shock = +{oilShock}%</span>
          <input type="range" min="0" max="50" step="1" value={oilShock}
            onChange={e => setOilShock(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>FII Outflow = INR {fiiOutflow} Cr</span>
          <input type="range" min="0" max="20000" step="500" value={fiiOutflow}
            onChange={e => setFiiOutflow(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>INR Depreciation = {inrDepreciation}%</span>
          <input type="range" min="0" max="15" step="0.5" value={inrDepreciation}
            onChange={e => setInrDepreciation(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/30 text-center">
          <span className="text-xs text-gray-600 dark:text-gray-400">Nifty 50 Impact</span>
          <p className={`text-lg font-bold ${niftyImpact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {(niftyImpact * 100).toFixed(1)}%
          </p>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30 text-center">
          <span className="text-xs text-gray-600 dark:text-gray-400">India VIX Change</span>
          <p className="text-lg font-bold text-amber-700 dark:text-amber-300">
            +{vixImpact.toFixed(1)} pts
          </p>
        </div>
        <div className="rounded-lg bg-yellow-50 p-3 dark:bg-yellow-900/30 text-center">
          <span className="text-xs text-gray-600 dark:text-gray-400">Gold (INR) Impact</span>
          <p className="text-lg font-bold text-yellow-700 dark:text-yellow-300">
            +{(goldImpact * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      <svg viewBox="0 0 400 100" className="w-full max-w-md mx-auto block mt-4">
        <text x="50" y="20" className="text-[10px] font-bold" fill="#6b7280">Transmission Channel</text>
        <rect x="10" y="30" width="70" height="25" rx="4" fill="#ef4444" opacity="0.2" stroke="#ef4444" />
        <text x="45" y="47" textAnchor="middle" className="text-[8px]" fill="#dc2626">GPR Event</text>
        <line x1="80" y1="42" x2="110" y2="42" stroke="#9ca3af" strokeWidth="1.5" markerEnd="url(#geoArrow)" />

        <rect x="110" y="30" width="65" height="25" rx="4" fill="#f59e0b" opacity="0.2" stroke="#f59e0b" />
        <text x="142" y="47" textAnchor="middle" className="text-[8px]" fill="#d97706">Oil/FII</text>
        <line x1="175" y1="42" x2="205" y2="42" stroke="#9ca3af" strokeWidth="1.5" />

        <rect x="205" y="30" width="65" height="25" rx="4" fill="#6366f1" opacity="0.2" stroke="#6366f1" />
        <text x="237" y="47" textAnchor="middle" className="text-[8px]" fill="#4f46e5">INR/VIX</text>
        <line x1="270" y1="42" x2="300" y2="42" stroke="#9ca3af" strokeWidth="1.5" />

        <rect x="300" y="30" width="80" height="25" rx="4" fill="#10b981" opacity="0.2" stroke="#10b981" />
        <text x="340" y="47" textAnchor="middle" className="text-[8px]" fill="#059669">Nifty/Sectors</text>
      </svg>
    </div>
  )
}

export default function GeopoliticalRisk() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Geopolitical Risk and Indian Markets
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Geopolitical events -- border tensions, global trade wars, energy supply disruptions,
        and sanctions -- have outsized impacts on Indian equity markets. India's dependence
        on crude oil imports, sensitivity to FII flows, and proximity to geopolitical
        hotspots make quantifying geopolitical risk essential for systematic trading on
        NSE and BSE.
      </p>

      <DefinitionBlock
        title="Geopolitical Risk Index (GPR)"
        label="Definition 11.16"
        definition="The Geopolitical Risk Index, constructed by Caldara and Iacoviello, measures geopolitical risk based on automated text analysis of newspaper articles. The GPR index captures risks related to wars, terrorism, and tensions between major states. An India-specific GPR can be constructed from Indian media sources using NLP-based event extraction."
        notation="GPR_t = f(\text{count of geopolitical articles in period } t)"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Transmission Channels to Indian Markets
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Geopolitical risk transmits to Indian equities through four primary channels:
      </p>

      <BlockMath math="R_{Nifty,t} = \alpha + \beta_1 \Delta GPR_t + \beta_2 \Delta Oil_t + \beta_3 \Delta FII_t + \beta_4 \Delta INR_t + \epsilon_t" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The causal chain operates as: Geopolitical event causes oil spike and capital
        outflows, which cause INR depreciation and VIX spike, which cause Nifty selloff
        with sector-specific differential impacts.
      </p>

      <TheoremBlock
        title="Geopolitical Risk Premium"
        label="Theorem 11.8"
        statement="Geopolitical risk commands a positive risk premium in Indian equities: stocks with higher geopolitical beta (more sensitive to GPR shocks) earn higher expected returns. The geopolitical risk premium in India is estimated at 1-2% annualized, concentrated in defense, oil-sensitive, and border-state exposed sectors."
        proof="Using event study methodology around India-specific geopolitical events (Pulwama 2019, Galwan 2020, etc.), stocks with high GPR beta experienced larger drawdowns but subsequently recovered with excess returns. The unconditional risk premium is estimated via Fama-MacBeth regressions of stock returns on GPR betas, controlling for standard factors."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        India-Specific Geopolitical Scenarios
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The conditional impact of geopolitical events on Nifty can be modeled using
        an event study framework with abnormal returns:
      </p>

      <BlockMath math="AR_{i,t} = R_{i,t} - (\hat{\alpha}_i + \hat{\beta}_i R_{m,t})" />

      <BlockMath math="CAR_{i}(t_1, t_2) = \sum_{t=t_1}^{t_2} AR_{i,t}" />

      <NoteBlock title="Historical Geopolitical Events and Nifty" type="historical">
        <ul className="space-y-1 text-sm">
          <li><strong>Kargil War (1999):</strong> Nifty fell ~15% then recovered fully within 3 months</li>
          <li><strong>Mumbai Attacks (2008):</strong> Short-lived 5% decline amid broader GFC</li>
          <li><strong>Surgical Strikes (2016):</strong> Nifty dropped 1.5%, recovered in 2 sessions</li>
          <li><strong>Pulwama/Balakot (2019):</strong> Initial 2% drop, full recovery in 1 week</li>
          <li><strong>Galwan Clash (2020):</strong> Minimal direct equity impact amid COVID recovery</li>
          <li><strong>Russia-Ukraine (2022):</strong> Nifty fell 10% over 2 months on oil spike and FII outflows</li>
        </ul>
      </NoteBlock>

      <InteractiveGeopoliticalRisk />

      <PythonCode
        title="geopolitical_risk.py"
        runnable
        code={`import numpy as np

class GeopoliticalRiskModel:
    """Geopolitical risk analysis for Indian equity markets."""

    def __init__(self):
        self.events = []
        self.sector_betas = {}

    def add_event(self, name, gpr_level, oil_impact, fii_outflow_cr,
                   inr_impact, nifty_impact, recovery_days):
        self.events.append({
            'name': name, 'gpr': gpr_level, 'oil': oil_impact,
            'fii': fii_outflow_cr, 'inr': inr_impact,
            'nifty': nifty_impact, 'recovery': recovery_days
        })

    def set_sector_gpr_beta(self, sector, beta):
        self.sector_betas[sector] = beta

    def scenario_impact(self, gpr_shock, oil_pct, fii_cr, inr_pct):
        """Estimate Nifty impact from a geopolitical scenario."""
        nifty_impact = (-0.02 * gpr_shock / 100 - 0.003 * oil_pct
                        - 0.0001 * fii_cr / 1000 - 0.005 * inr_pct)
        vix_change = 2.5 * gpr_shock / 100 + 0.3 * oil_pct

        sector_impacts = {}
        for sector, beta in self.sector_betas.items():
            sector_impacts[sector] = nifty_impact * beta

        return {
            'nifty_impact': nifty_impact,
            'vix_change': vix_change,
            'sector_impacts': sector_impacts
        }

    def event_statistics(self):
        if not self.events:
            return {}
        impacts = [e['nifty'] for e in self.events]
        recoveries = [e['recovery'] for e in self.events]
        return {
            'avg_drawdown': np.mean(impacts),
            'worst_drawdown': np.min(impacts),
            'avg_recovery_days': np.mean(recoveries),
            'median_recovery_days': np.median(recoveries)
        }

# Build India geopolitical risk model
model = GeopoliticalRiskModel()

# Historical events
model.add_event("Kargil War",         gpr_level=200, oil_impact=15, fii_outflow_cr=8000,  inr_impact=5,  nifty_impact=-15, recovery_days=90)
model.add_event("Parliament Attack",  gpr_level=180, oil_impact=5,  fii_outflow_cr=3000,  inr_impact=2,  nifty_impact=-5,  recovery_days=20)
model.add_event("Mumbai 2008",        gpr_level=160, oil_impact=8,  fii_outflow_cr=12000, inr_impact=8,  nifty_impact=-5,  recovery_days=15)
model.add_event("Surgical Strikes",   gpr_level=140, oil_impact=2,  fii_outflow_cr=2000,  inr_impact=0.5,nifty_impact=-1.5,recovery_days=2)
model.add_event("Pulwama/Balakot",    gpr_level=170, oil_impact=3,  fii_outflow_cr=3500,  inr_impact=1,  nifty_impact=-2,  recovery_days=7)
model.add_event("Russia-Ukraine",     gpr_level=250, oil_impact=40, fii_outflow_cr=15000, inr_impact=4,  nifty_impact=-10, recovery_days=60)

# Sector GPR betas
model.set_sector_gpr_beta('Nifty_IT',     0.6)
model.set_sector_gpr_beta('Bank_Nifty',   1.3)
model.set_sector_gpr_beta('Nifty_Defense', 0.4)  # Often benefits
model.set_sector_gpr_beta('Nifty_Energy', 1.8)
model.set_sector_gpr_beta('Nifty_FMCG',  0.5)
model.set_sector_gpr_beta('Nifty_Metal',  1.5)

# Historical analysis
stats = model.event_statistics()
print("=" * 60)
print("  India Geopolitical Risk Analysis")
print("=" * 60)
print(f"\\nHistorical Event Statistics:")
print(f"  Events analyzed:       {len(model.events)}")
print(f"  Average drawdown:      {stats['avg_drawdown']:.1f}%")
print(f"  Worst drawdown:        {stats['worst_drawdown']:.1f}%")
print(f"  Avg recovery (days):   {stats['avg_recovery_days']:.0f}")
print(f"  Median recovery:       {stats['median_recovery_days']:.0f}")

print(f"\\nEvent History:")
for e in model.events:
    print(f"  {e['name']:<22} Nifty: {e['nifty']:>+5.1f}%  "
          f"Oil: +{e['oil']:>2.0f}%  Recovery: {e['recovery']:>3.0f}d")

# Scenario analysis
print(f"\\nScenario: Major Border Escalation")
print("-" * 50)
result = model.scenario_impact(gpr_shock=180, oil_pct=20,
                                fii_cr=10000, inr_pct=5)
print(f"  Expected Nifty Impact: {result['nifty_impact']*100:.1f}%")
print(f"  India VIX Change:      +{result['vix_change']:.1f} pts")
print(f"\\n  Sector Impacts:")
for sector, impact in sorted(result['sector_impacts'].items(),
                              key=lambda x: x[1]):
    print(f"    {sector:<18} {impact*100:>+6.2f}%")`}
      />

      <ExampleBlock
        title="Event Study: Oil Price Shock Impact"
        difficulty="intermediate"
        problem="Crude oil spikes 25% due to Middle East tensions. India imports 85% of its crude. Estimate the impact on Nifty using: oil beta = -0.003 per 1% oil move, FII outflows of INR 8,000 Cr (beta = -0.0001 per INR 1,000 Cr), and INR depreciation of 3% (beta = -0.005 per 1%)."
        solution={[
          {
            step: 'Oil price impact',
            formula: 'R_{oil} = -0.003 \\times 25 = -7.5\\%',
            explanation: 'Direct oil impact on Nifty through import costs and current account deterioration.',
          },
          {
            step: 'FII outflow impact',
            formula: 'R_{FII} = -0.0001 \\times 8 = -0.08\\%',
            explanation: 'FII selling pressure creates market impact.',
          },
          {
            step: 'INR depreciation impact',
            formula: 'R_{INR} = -0.005 \\times 3 = -1.5\\%',
            explanation: 'Currency depreciation compounds the oil import cost and signals capital flight.',
          },
          {
            step: 'Total estimated Nifty impact',
            formula: 'R_{total} = -7.5 - 0.08 - 1.5 = -9.08\\%',
            explanation: 'Expected Nifty drawdown of approximately 9%, consistent with the Russia-Ukraine episode where a similar oil shock caused a 10% decline. Energy-heavy sectors (BPCL, HPCL) would be disproportionately affected.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Geopolitical risk is an underpriced source of systematic risk in Indian markets.
          The primary transmission channels -- crude oil prices, FII flows, and INR
          depreciation -- can be modeled quantitatively. Historical analysis shows that
          India-specific geopolitical events (border tensions, surgical strikes) typically
          cause 1-5% drawdowns with rapid recovery, while global events with oil supply
          implications cause larger 10-15% drawdowns. Systematic strategies should
          maintain geopolitical hedges through gold allocation, put protection on Nifty,
          and reduced exposure to oil-sensitive sectors during elevated GPR periods.
        </p>
      </NoteBlock>
    </div>
  )
}
