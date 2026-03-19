import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveMacroIndicators() {
  const [gdpGrowth, setGdpGrowth] = useState(6.5)
  const [cpi, setCpi] = useState(5.2)
  const [repoRate, setRepoRate] = useState(6.5)
  const [fiscalDeficit, setFiscalDeficit] = useState(5.9)
  const [cadGdp, setCadGdp] = useState(1.8)

  const realRate = repoRate - cpi
  const expectedNiftyReturn = gdpGrowth + cpi + 2
  const bondYield = repoRate + 0.5
  const equityRiskPremium = expectedNiftyReturn - bondYield

  const indicators = [
    { name: 'GDP Growth', value: gdpGrowth, unit: '%', status: gdpGrowth > 6 ? 'STRONG' : gdpGrowth > 4 ? 'MODERATE' : 'WEAK' },
    { name: 'CPI Inflation', value: cpi, unit: '%', status: cpi < 4 ? 'LOW' : cpi < 6 ? 'TARGET' : 'HIGH' },
    { name: 'Real Interest Rate', value: realRate, unit: '%', status: realRate > 1 ? 'TIGHT' : realRate > 0 ? 'NEUTRAL' : 'EASY' },
    { name: 'Fiscal Deficit', value: fiscalDeficit, unit: '% GDP', status: fiscalDeficit < 4 ? 'PRUDENT' : fiscalDeficit < 6 ? 'ELEVATED' : 'HIGH' },
    { name: 'CAD/GDP', value: cadGdp, unit: '%', status: cadGdp < 1.5 ? 'HEALTHY' : cadGdp < 2.5 ? 'MODERATE' : 'CONCERN' },
  ]

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Indian Macro Dashboard
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust macroeconomic indicators to see their impact on equity market expectations.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>GDP Growth = {gdpGrowth}%</span>
          <input type="range" min="0" max="12" step="0.5" value={gdpGrowth}
            onChange={e => setGdpGrowth(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>CPI Inflation = {cpi}%</span>
          <input type="range" min="1" max="12" step="0.2" value={cpi}
            onChange={e => setCpi(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>RBI Repo Rate = {repoRate}%</span>
          <input type="range" min="3" max="10" step="0.25" value={repoRate}
            onChange={e => setRepoRate(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Fiscal Deficit = {fiscalDeficit}% of GDP</span>
          <input type="range" min="2" max="10" step="0.1" value={fiscalDeficit}
            onChange={e => setFiscalDeficit(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>CAD/GDP = {cadGdp}%</span>
          <input type="range" min="0" max="5" step="0.1" value={cadGdp}
            onChange={e => setCadGdp(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="overflow-x-auto mb-4">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Indicator</th>
              <th className="px-3 py-2 text-right text-gray-600 dark:text-gray-400">Value</th>
              <th className="px-3 py-2 text-center text-gray-600 dark:text-gray-400">Assessment</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            {indicators.map(ind => (
              <tr key={ind.name} className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-3 py-1 font-semibold">{ind.name}</td>
                <td className="px-3 py-1 text-right">{ind.value.toFixed(1)}{ind.unit}</td>
                <td className={`px-3 py-1 text-center font-bold text-xs ${
                  ind.status === 'STRONG' || ind.status === 'HEALTHY' || ind.status === 'PRUDENT' || ind.status === 'LOW'
                    ? 'text-green-600' : ind.status === 'HIGH' || ind.status === 'CONCERN' || ind.status === 'WEAK'
                    ? 'text-red-500' : 'text-amber-600'
                }`}>{ind.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30 text-center">
          <span className="text-xs text-gray-600 dark:text-gray-400">Expected Nifty Return</span>
          <p className="text-base font-bold text-blue-700 dark:text-blue-300">{expectedNiftyReturn.toFixed(1)}%</p>
        </div>
        <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/30 text-center">
          <span className="text-xs text-gray-600 dark:text-gray-400">10Y Bond Yield</span>
          <p className="text-base font-bold text-green-700 dark:text-green-300">{bondYield.toFixed(1)}%</p>
        </div>
        <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30 text-center">
          <span className="text-xs text-gray-600 dark:text-gray-400">Equity Risk Premium</span>
          <p className="text-base font-bold text-indigo-700 dark:text-indigo-300">{equityRiskPremium.toFixed(1)}%</p>
        </div>
      </div>
    </div>
  )
}

export default function EconomicIndicators() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Indian Economic Indicators for Trading
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Macroeconomic indicators drive the broad direction of Indian equity markets.
        Understanding the relationship between GDP growth, inflation, RBI monetary policy,
        and fiscal dynamics is essential for systematic macro trading strategies on NSE/BSE.
        This section quantifies these relationships for algorithmic implementation.
      </p>

      <DefinitionBlock
        title="Leading Economic Indicator"
        label="Definition 11.12"
        definition="A leading economic indicator is a measurable variable that changes direction before the broader economy, providing advance signal of economic expansion or contraction. In India, key leading indicators include the IIP (Index of Industrial Production), PMI (Purchasing Managers' Index), credit growth, and auto sales -- all of which tend to lead Nifty 50 returns by 1-3 months."
        notation="\text{Leading indicator } X_t \text{ Granger-causes } Y_{t+k} \text{ for } k > 0"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        GDP and Equity Returns
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The long-run relationship between nominal GDP growth and Nifty 50 earnings growth
        can be modeled as a cointegrating relationship:
      </p>

      <BlockMath math="\Delta \ln(EPS_{Nifty,t}) = \alpha + \beta \cdot \Delta \ln(GDP_{nominal,t}) + \epsilon_t" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Empirically, <InlineMath math="\beta \approx 1.5" /> for India, indicating that Nifty
        earnings growth has historically exceeded nominal GDP growth due to the increasing
        formalization of the economy and the market-cap weighted bias toward high-growth sectors.
      </p>

      <TheoremBlock
        title="Fisher Effect for Indian Markets"
        label="Theorem 11.6"
        statement="Under the Fisher equation, the nominal return on Indian equities can be decomposed as: E[R_{Nifty}] \approx r_{real} + E[\pi] + ERP_{India}, where r_{real} is the real risk-free rate (real GoI bond yield), E[\pi] is expected CPI inflation, and ERP_{India} is the Indian equity risk premium."
        proof="The Fisher equation states (1+R_{nominal}) = (1+r_{real})(1+\pi). For India: R_{nominal} \approx r_{real} + \pi (approximation for moderate inflation). Adding the equity premium: E[R_{Nifty}] = r_{real} + E[\pi] + ERP \approx 2\% + 5\% + 6\% = 13\%, which aligns with the historical 12-15% CAGR of the Nifty 50."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        RBI Monetary Policy and Markets
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The RBI's repo rate directly impacts the discount rate for Indian equities. The
        Taylor Rule adapted for India describes the policy rate as:
      </p>

      <BlockMath math="r_{repo} = r^* + \pi_t + 0.5(\pi_t - \pi^*) + 0.5(y_t - y^*)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="r^*" /> is the neutral real rate (approximately 1-1.5% for India),{' '}
        <InlineMath math="\pi^*" /> is the RBI's inflation target (4% under the flexible
        inflation targeting framework), and <InlineMath math="y_t - y^*" /> is the output gap.
      </p>

      <NoteBlock title="Key Indian Macro Indicators" type="historical">
        <ul className="space-y-1 text-sm">
          <li><strong>GDP:</strong> CSO releases advance estimates (Jan), revised estimates (Feb), quarterly GVA data</li>
          <li><strong>CPI:</strong> MoSPI releases monthly, RBI targets 4% +/- 2% band</li>
          <li><strong>IIP:</strong> Monthly industrial production index, leads GDP by 1-2 quarters</li>
          <li><strong>PMI:</strong> S&P Global India Manufacturing and Services PMI (monthly)</li>
          <li><strong>RBI Policy:</strong> Bi-monthly MPC meetings, repo rate and liquidity operations</li>
          <li><strong>Trade Data:</strong> DGCIS monthly merchandise exports/imports, CAD quarterly</li>
          <li><strong>Fiscal:</strong> Monthly CGA data on government expenditure and tax collections</li>
        </ul>
      </NoteBlock>

      <InteractiveMacroIndicators />

      <PythonCode
        title="macro_indicators.py"
        runnable
        code={`import numpy as np

class IndianMacroDashboard:
    """Macro indicator analysis for Indian equity markets."""

    def __init__(self):
        self.indicators = {}

    def set_indicator(self, name, value, weight=1.0):
        self.indicators[name] = {'value': value, 'weight': weight}

    def taylor_rule(self, inflation, output_gap, neutral_real=1.25,
                     inflation_target=4.0):
        """RBI Taylor Rule implied repo rate."""
        return (neutral_real + inflation +
                0.5 * (inflation - inflation_target) +
                0.5 * output_gap)

    def equity_risk_premium(self, nifty_earnings_yield, bond_yield_10y):
        """Implied ERP from Nifty earnings yield vs GoI bond."""
        return nifty_earnings_yield - bond_yield_10y

    def real_rate(self, repo_rate, cpi_inflation):
        return repo_rate - cpi_inflation

    def fed_model_signal(self, nifty_pe, bond_yield_10y):
        """Fed Model adapted for India: compare E/P to bond yield."""
        earnings_yield = 100 / nifty_pe
        gap = earnings_yield - bond_yield_10y
        if gap > 2:
            return 'EQUITIES_ATTRACTIVE'
        elif gap > 0:
            return 'NEUTRAL'
        else:
            return 'BONDS_ATTRACTIVE'

    def macro_score(self, gdp_growth, cpi, repo_rate, fiscal_deficit,
                     cad_gdp):
        """Composite macro health score (0-100)."""
        gdp_s = min(gdp_growth / 8 * 100, 100)
        cpi_s = max(0, (8 - cpi) / 6 * 100)
        real_r = repo_rate - cpi
        real_s = 50 + real_r * 20  # Neutral at 0 real rate
        fiscal_s = max(0, (8 - fiscal_deficit) / 6 * 100)
        cad_s = max(0, (3 - cad_gdp) / 3 * 100)

        return {
            'gdp_score': gdp_s,
            'inflation_score': cpi_s,
            'monetary_score': min(100, max(0, real_s)),
            'fiscal_score': fiscal_s,
            'external_score': cad_s,
            'composite': (gdp_s * 0.25 + cpi_s * 0.20 +
                         min(100, max(0, real_s)) * 0.20 +
                         fiscal_s * 0.15 + cad_s * 0.20)
        }

# Current Indian macro environment
dashboard = IndianMacroDashboard()

# Set parameters
gdp = 6.5      # Real GDP growth
cpi = 5.2      # CPI inflation
repo = 6.5     # RBI repo rate
fiscal = 5.9   # Fiscal deficit % GDP
cad = 1.8      # CAD % GDP
nifty_pe = 22  # Nifty 50 trailing P/E
goi_10y = 7.1  # 10Y GoI bond yield

# Computations
taylor_implied = dashboard.taylor_rule(cpi, gdp - 6.5)
real_rate = dashboard.real_rate(repo, cpi)
erp = dashboard.equity_risk_premium(100 / nifty_pe, goi_10y)
fed_signal = dashboard.fed_model_signal(nifty_pe, goi_10y)
macro = dashboard.macro_score(gdp, cpi, repo, fiscal, cad)

print("=" * 55)
print("  Indian Macro Dashboard")
print("=" * 55)
print(f"\\nGDP Growth:        {gdp:.1f}%")
print(f"CPI Inflation:     {cpi:.1f}%")
print(f"RBI Repo Rate:     {repo:.1f}%")
print(f"Real Rate:         {real_rate:.1f}%")
print(f"Taylor Rule Rate:  {taylor_implied:.1f}%")
print(f"Rate Gap:          {repo - taylor_implied:+.1f}% "
      f"({'Dovish' if repo < taylor_implied else 'Hawkish'})")
print(f"\\nNifty P/E:         {nifty_pe:.1f}x")
print(f"Nifty E/P:         {100/nifty_pe:.1f}%")
print(f"GoI 10Y Yield:     {goi_10y:.1f}%")
print(f"Implied ERP:       {erp:.1f}%")
print(f"Fed Model Signal:  {fed_signal}")
print(f"\\nMacro Health Scores:")
for key, val in macro.items():
    if key != 'composite':
        print(f"  {key:<20} {val:>5.1f}/100")
print(f"  {'COMPOSITE':<20} {macro['composite']:>5.1f}/100")`}
      />

      <ExampleBlock
        title="RBI Rate Decision Impact on Nifty"
        difficulty="intermediate"
        problem="CPI inflation is at 5.8% and GDP growth at 6.2%. The RBI's inflation target is 4%. Using the Taylor Rule (neutral real rate = 1.25%), what should the repo rate be? If the actual repo rate is 6.5%, is the RBI dovish or hawkish?"
        solution={[
          {
            step: 'Compute output gap',
            formula: 'y - y^* = 6.2 - 6.5 = -0.3\\%',
            explanation: 'Assuming potential GDP growth of 6.5%, the economy is slightly below potential.',
          },
          {
            step: 'Apply Taylor Rule',
            formula: 'r_{repo}^* = 1.25 + 5.8 + 0.5(5.8 - 4.0) + 0.5(-0.3)',
            explanation: 'Substitute inflation, inflation gap, and output gap.',
          },
          {
            step: 'Compute implied rate',
            formula: 'r_{repo}^* = 1.25 + 5.8 + 0.9 - 0.15 = 7.8\\%',
            explanation: 'Taylor Rule implies repo rate should be 7.8%.',
          },
          {
            step: 'Compare with actual',
            formula: '6.5\\% < 7.8\\% \\Rightarrow \\text{Dovish by 130 bps}',
            explanation: 'RBI is running policy 130bps below what the Taylor Rule suggests, indicating a growth-supportive stance. This is positive for equities (Nifty/Bank Nifty) but may keep inflation above target.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Indian macroeconomic indicators provide critical context for systematic equity
          strategies. The RBI repo rate and CPI inflation determine the discount rate regime,
          GDP growth drives corporate earnings, and the fiscal/external position affects
          INR stability and FII flows. A composite macro score combining these indicators
          can serve as an overlay for adjusting equity allocation between Nifty exposure
          and fixed-income alternatives.
        </p>
      </NoteBlock>
    </div>
  )
}
