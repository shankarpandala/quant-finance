import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveMacroFactor() {
  const [betaGDP, setBetaGDP] = useState(1.2)
  const [betaInflation, setBetaInflation] = useState(-0.8)
  const [betaRate, setBetaRate] = useState(-1.5)
  const [betaINR, setBetaINR] = useState(-0.6)
  const [betaOil, setBetaOil] = useState(-0.4)

  const gdpSurprise = 0.5
  const inflSurprise = -0.3
  const rateSurprise = -0.25
  const inrSurprise = -1.0
  const oilSurprise = 2.0

  const expectedReturn = betaGDP * gdpSurprise + betaInflation * inflSurprise +
    betaRate * rateSurprise + betaINR * inrSurprise + betaOil * oilSurprise
  const contributions = [
    { name: 'GDP Growth', beta: betaGDP, surprise: gdpSurprise, contrib: betaGDP * gdpSurprise },
    { name: 'Inflation', beta: betaInflation, surprise: inflSurprise, contrib: betaInflation * inflSurprise },
    { name: 'Interest Rate', beta: betaRate, surprise: rateSurprise, contrib: betaRate * rateSurprise },
    { name: 'INR/USD', beta: betaINR, surprise: inrSurprise, contrib: betaINR * inrSurprise },
    { name: 'Crude Oil', beta: betaOil, surprise: oilSurprise, contrib: betaOil * oilSurprise },
  ]

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Macro Factor Return Attribution
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust factor betas to see how macro surprises drive Nifty 50 returns.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          ['GDP Beta', betaGDP, setBetaGDP],
          ['Inflation Beta', betaInflation, setBetaInflation],
          ['Rate Beta', betaRate, setBetaRate],
          ['INR Beta', betaINR, setBetaINR],
          ['Oil Beta', betaOil, setBetaOil],
        ].map(([label, val, setter]) => (
          <label key={label} className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
            <span>{label} = {val.toFixed(1)}</span>
            <input type="range" min="-3" max="3" step="0.1" value={val}
              onChange={e => setter(parseFloat(e.target.value))}
              className="h-2 w-full cursor-pointer accent-indigo-500" />
          </label>
        ))}
      </div>

      <svg viewBox="0 0 450 170" className="w-full max-w-lg mx-auto block">
        {contributions.map((c, i) => {
          const barWidth = Math.abs(c.contrib) * 60
          const x = c.contrib >= 0 ? 200 : 200 - barWidth
          return (
            <g key={c.name}>
              <text x="90" y={22 + i * 30} textAnchor="end" className="text-[10px]" fill="#6b7280">
                {c.name}
              </text>
              <rect x={x} y={12 + i * 30} width={barWidth} height="16" rx="2"
                fill={c.contrib >= 0 ? '#4ade80' : '#f87171'} opacity="0.8" />
              <text x={c.contrib >= 0 ? x + barWidth + 5 : x - 5} y={24 + i * 30}
                textAnchor={c.contrib >= 0 ? 'start' : 'end'}
                className="text-[9px] font-bold"
                fill={c.contrib >= 0 ? '#16a34a' : '#dc2626'}>
                {c.contrib >= 0 ? '+' : ''}{c.contrib.toFixed(2)}%
              </text>
              <line x1="200" y1="5" x2="200" y2="160" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3" />
            </g>
          )
        })}
      </svg>

      <p className="mt-2 text-center text-sm font-semibold">
        Expected Return from Macro Factors:{' '}
        <span className={expectedReturn >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500'}>
          {expectedReturn >= 0 ? '+' : ''}{expectedReturn.toFixed(2)}%
        </span>
      </p>
    </div>
  )
}

export default function MacroFactorModels() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Macro Factor Models for Indian Markets
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Macro factor models decompose equity returns into systematic exposures to
        macroeconomic state variables. For the Indian market, key macro factors include
        GDP growth surprises, inflation innovations, RBI policy rate changes, INR/USD
        movements, and crude oil price shocks. These models enable risk attribution
        and macro-driven alpha generation.
      </p>

      <DefinitionBlock
        title="Arbitrage Pricing Theory (APT) Macro Model"
        label="Definition 11.14"
        definition="The APT macro factor model expresses the expected return of an asset as a linear function of its exposure (beta) to K macroeconomic risk factors. Unlike CAPM's single market factor, APT allows multiple sources of systematic risk to be priced independently."
        notation="E[R_i] = r_f + \beta_{i,1}\lambda_1 + \beta_{i,2}\lambda_2 + \cdots + \beta_{i,K}\lambda_K"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Indian Macro Factor Structure
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The return on stock <InlineMath math="i" /> is driven by surprise components
        of macroeconomic variables:
      </p>

      <BlockMath math="R_{i,t} = \alpha_i + \beta_{i,GDP} \cdot f_{GDP,t} + \beta_{i,CPI} \cdot f_{CPI,t} + \beta_{i,Rate} \cdot f_{Rate,t} + \beta_{i,INR} \cdot f_{INR,t} + \beta_{i,Oil} \cdot f_{Oil,t} + \epsilon_{i,t}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="f_{k,t}" /> represents the surprise (innovation) in
        factor <InlineMath math="k" />, defined as the difference between the realized
        value and the market's prior expectation:
      </p>

      <BlockMath math="f_{k,t} = X_{k,t}^{actual} - E_{t-1}[X_{k,t}]" />

      <TheoremBlock
        title="APT No-Arbitrage Pricing"
        label="Theorem 11.7"
        statement="In the absence of arbitrage opportunities, the expected excess return of any asset i must be a linear combination of its factor betas times the factor risk premiums: E[R_i] - r_f = \sum_{k=1}^{K} \beta_{i,k} \lambda_k, where \lambda_k is the risk premium for factor k."
        proof="By the APT, construct a well-diversified portfolio with zero exposure to all factors except factor k. In the absence of arbitrage, this portfolio must earn exactly \lambda_k per unit of beta exposure. By combining such factor-mimicking portfolios, any asset's expected return is fully explained by its factor loadings."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Factor Construction for India
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The macro factors are constructed from Indian economic time series:
      </p>

      <BlockMath math="f_{GDP} = \Delta \ln(IIP_t) - E[\Delta \ln(IIP_t)]" />

      <BlockMath math="f_{CPI} = \Delta CPI_t - E[\Delta CPI_t]" />

      <BlockMath math="f_{Rate} = \Delta r_{repo,t} + \Delta \text{term spread}_t" />

      <BlockMath math="f_{INR} = \Delta \ln(INR/USD)_t" />

      <BlockMath math="f_{Oil} = \Delta \ln(\text{Brent}_{INR,t})" />

      <NoteBlock title="Sector Factor Exposures in India" type="tip">
        <ul className="space-y-1 text-sm">
          <li><strong>IT Services:</strong> Positive INR depreciation beta (USD revenues), low oil beta</li>
          <li><strong>Banking:</strong> High negative rate beta (rate cuts boost NIMs), positive GDP beta</li>
          <li><strong>Oil Marketing:</strong> Strong negative oil beta (BPCL, HPCL, IOC)</li>
          <li><strong>FMCG:</strong> Negative inflation beta (input cost pressure), low GDP beta</li>
          <li><strong>Metals:</strong> High GDP beta, positive oil beta (commodity co-movement)</li>
          <li><strong>Auto:</strong> Negative rate beta (consumer financing), positive GDP beta</li>
        </ul>
      </NoteBlock>

      <InteractiveMacroFactor />

      <PythonCode
        title="macro_factor_model.py"
        runnable
        code={`import numpy as np

class MacroFactorModel:
    """APT-based macro factor model for Indian equities."""

    def __init__(self, factor_names):
        self.factor_names = factor_names
        self.K = len(factor_names)
        self.betas = {}      # stock -> array of betas
        self.risk_premia = np.zeros(self.K)

    def set_betas(self, stock, betas):
        self.betas[stock] = np.array(betas)

    def set_risk_premia(self, premia):
        self.risk_premia = np.array(premia)

    def expected_return(self, stock, rf=0.07):
        """APT expected return."""
        return rf + np.dot(self.betas[stock], self.risk_premia)

    def return_attribution(self, stock, factor_surprises):
        """Decompose realized return into factor contributions."""
        surprises = np.array(factor_surprises)
        contributions = self.betas[stock] * surprises
        return dict(zip(self.factor_names, contributions))

    def factor_risk(self, stock, factor_cov):
        """Compute systematic risk from factor exposures."""
        b = self.betas[stock]
        systematic_var = b @ factor_cov @ b
        return np.sqrt(systematic_var)

# Define Indian macro factors
factors = ['GDP_Growth', 'CPI_Inflation', 'RBI_Rate', 'INR_USD', 'Crude_Oil']
model = MacroFactorModel(factors)

# Factor risk premia (annualized, estimated)
model.set_risk_premia([0.03, -0.01, -0.02, -0.015, -0.005])

# Set betas for NSE sectors
model.set_betas('Nifty_IT',      [ 0.5, -0.3, -0.5,  1.5, -0.2])
model.set_betas('Bank_Nifty',    [ 1.8, -0.8, -2.0, -0.5, -0.3])
model.set_betas('Nifty_FMCG',   [ 0.3, -1.2, -0.3, -0.2, -0.5])
model.set_betas('Nifty_Metal',   [ 2.0,  0.5,  -0.8,  0.3,  1.2])
model.set_betas('Nifty_Energy',  [ 1.0,  0.3, -0.5,  0.5,  1.8])
model.set_betas('Nifty_Auto',    [ 1.5, -0.6, -1.5, -0.3, -0.8])

# Factor covariance matrix
factor_cov = np.array([
    [0.0004, 0.0001, 0.0000, -0.0001, 0.0001],
    [0.0001, 0.0003, 0.0001,  0.0001, 0.0002],
    [0.0000, 0.0001, 0.0002,  0.0000, 0.0000],
    [-0.0001, 0.0001, 0.0000, 0.0005, 0.0001],
    [0.0001, 0.0002, 0.0000,  0.0001, 0.0008]
])

print("=" * 60)
print("  Macro Factor Model - Indian Sector Analysis")
print("=" * 60)

# Expected returns
print(f"\\n{'Sector':<16} {'E[R]':>7} {'Sys Risk':>9}")
print("-" * 35)
for stock in model.betas:
    er = model.expected_return(stock) * 100
    risk = model.factor_risk(stock, factor_cov) * np.sqrt(252) * 100
    print(f"{stock:<16} {er:>6.1f}% {risk:>8.1f}%")

# Scenario: RBI cuts rate by 25bps, oil spikes 5%
print(f"\\nScenario: RBI -25bps rate cut, Crude +5%")
print("-" * 55)
surprises = [0.0, 0.0, -0.0025, 0.0, 0.05]
for stock in model.betas:
    attrib = model.return_attribution(stock, surprises)
    total = sum(attrib.values())
    print(f"  {stock:<16} Total: {total*100:>+5.2f}%")
    for f, c in attrib.items():
        if abs(c) > 0.0001:
            print(f"    {f:<16} {c*100:>+5.2f}%")`}
      />

      <ExampleBlock
        title="Macro Factor Attribution for Bank Nifty"
        difficulty="intermediate"
        problem="Bank Nifty has factor betas: GDP=1.8, Inflation=-0.8, Rate=-2.0, INR=-0.5, Oil=-0.3. In a month, GDP surprise is +0.3%, inflation surprise is +0.2%, RBI surprises with a 25bps cut, INR depreciates 1%, oil rises 3%. Compute the macro-driven return."
        solution={[
          {
            step: 'Compute each factor contribution',
            formula: 'R_{GDP} = 1.8 \\times 0.003 = +0.54\\%',
            explanation: 'Positive GDP surprise is bullish for banks (higher credit growth).',
          },
          {
            step: 'Inflation and rate contributions',
            formula: 'R_{CPI} = -0.8 \\times 0.002 = -0.16\\%,\\quad R_{Rate} = -2.0 \\times (-0.0025) = +0.50\\%',
            explanation: 'Rate cut is very positive for banks (lower funding costs, bond gains).',
          },
          {
            step: 'INR and oil contributions',
            formula: 'R_{INR} = -0.5 \\times (-0.01) = +0.50\\%,\\quad R_{Oil} = -0.3 \\times 0.03 = -0.90\\%',
            explanation: 'INR depreciation mildly positive (FII flow effect), oil spike negative.',
          },
          {
            step: 'Total macro-driven return',
            formula: 'R_{macro} = 0.54 - 0.16 + 0.50 + 0.50 - 0.90 = +0.48\\%',
            explanation: 'Bank Nifty is expected to gain 0.48% from macro factors, driven primarily by the RBI rate cut and GDP surprise, partially offset by the oil price spike.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Macro factor models provide a systematic framework for understanding how
          macroeconomic forces drive Indian equity returns. By estimating sector-level
          factor betas, portfolio managers can construct macro-hedged portfolios, stress-test
          against scenarios (RBI tightening, oil shocks, INR crisis), and generate alpha
          from macro views. The key India-specific factors are RBI policy, crude oil prices,
          and INR/USD -- these three explain the majority of macro-driven return variation
          across Nifty sectoral indices.
        </p>
      </NoteBlock>
    </div>
  )
}
