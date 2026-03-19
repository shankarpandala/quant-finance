import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveResearchFramework() {
  const [approach, setApproach] = useState('hypothesis')
  const [nTests, setNTests] = useState(10)
  const [alpha, setAlpha] = useState(0.05)

  const falseDiscoveryProb = approach === 'hypothesis'
    ? 1 - Math.pow(1 - alpha, 1)
    : 1 - Math.pow(1 - alpha, nTests)
  const correctedAlpha = approach === 'hypothesis'
    ? alpha
    : alpha / nTests

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Hypothesis-Driven vs Data-Driven Research
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Compare the false discovery risk between research approaches.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Research Approach</span>
          <select value={approach} onChange={e => setApproach(e.target.value)}
            className="rounded border p-1 text-xs dark:bg-gray-800 dark:border-gray-600">
            <option value="hypothesis">Hypothesis-Driven (1 test)</option>
            <option value="data_driven">Data-Driven ({nTests} tests)</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Strategies Tested: {approach === 'hypothesis' ? 1 : nTests}</span>
          <input type="range" min="2" max="100" step="1" value={nTests}
            onChange={e => setNTests(parseInt(e.target.value))}
            disabled={approach === 'hypothesis'}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Significance Level: {(alpha * 100).toFixed(1)}%</span>
          <input type="range" min="0.01" max="0.20" step="0.01" value={alpha}
            onChange={e => setAlpha(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
          <div className="text-[10px] text-gray-500">False Discovery Prob</div>
          <div className={`text-lg font-bold ${falseDiscoveryProb > 0.20 ? 'text-red-600' : 'text-green-600'}`}>
            {(falseDiscoveryProb * 100).toFixed(1)}%
          </div>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
          <div className="text-[10px] text-gray-500">Corrected Alpha</div>
          <div className="text-lg font-bold text-purple-600">
            {(correctedAlpha * 100).toFixed(2)}%
          </div>
        </div>
        <div className="rounded-lg bg-orange-50 p-3 dark:bg-orange-900/30">
          <div className="text-[10px] text-gray-500">Effective Tests</div>
          <div className="text-lg font-bold text-orange-600">
            {approach === 'hypothesis' ? 1 : nTests}
          </div>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
        {approach === 'data_driven'
          ? `With ${nTests} tests at ${(alpha * 100).toFixed(0)}% significance, there is a ${(falseDiscoveryProb * 100).toFixed(0)}% chance of at least one false discovery.`
          : `With 1 hypothesis-driven test, false discovery rate equals the significance level: ${(alpha * 100).toFixed(1)}%.`
        }
      </p>
    </div>
  )
}

export default function HypothesisDriven() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Hypothesis-Driven vs Data-Driven Research
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The most important decision in quantitative strategy research is the research
        methodology itself. Hypothesis-driven research starts with an economic theory and
        tests it rigorously, while data-driven research searches for patterns in data.
        Understanding the tradeoffs is essential for developing strategies that work in
        live trading on NSE.
      </p>

      <DefinitionBlock
        title="Hypothesis-Driven Research"
        label="Definition 19.1"
        definition="Hypothesis-driven research begins with a specific, testable economic hypothesis about market behavior (e.g., 'Nifty 50 stocks exhibit momentum due to institutional herding'). The hypothesis is formalized mathematically, tested on historical data, and validated out-of-sample. This approach controls for data snooping because the hypothesis precedes the data analysis."
        notation="Contrast with data-driven research (data mining), where patterns are discovered first and explanations constructed post-hoc."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Two Approaches
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Aspect</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Hypothesis-Driven</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Data-Driven</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Starting point</td>
              <td className="px-4 py-2">Economic theory</td>
              <td className="px-4 py-2">Data patterns</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">False discovery risk</td>
              <td className="px-4 py-2">Low (1 test)</td>
              <td className="px-4 py-2">High (many tests)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Alpha persistence</td>
              <td className="px-4 py-2">Higher (structural)</td>
              <td className="px-4 py-2">Lower (statistical)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Speed of discovery</td>
              <td className="px-4 py-2">Slower</td>
              <td className="px-4 py-2">Faster</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Indian market example</td>
              <td className="px-4 py-2">FII flows drive momentum</td>
              <td className="px-4 py-2">ML finds patterns in NSE data</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Requires domain knowledge</td>
              <td className="px-4 py-2">Deep</td>
              <td className="px-4 py-2">Moderate</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveResearchFramework />

      <TheoremBlock
        title="Multiple Testing Penalty"
        label="Theorem 19.1"
        statement="If $N$ independent strategies are tested at significance level $\alpha$, the probability of at least one false discovery is: $P(\text{at least one false positive}) = 1 - (1 - \alpha)^N \approx N\alpha \text{ for small } \alpha$. For $N = 100$ strategies tested at $\alpha = 0.05$, this probability is $1 - 0.95^{100} = 99.4\%$. The Bonferroni-corrected significance level is $\alpha^* = \alpha / N$."
        proof="Each independent test has probability $(1 - \alpha)$ of correctly accepting the null. With $N$ independent tests, the probability of no false positives is $(1 - \alpha)^N$. The complement gives the probability of at least one. For small $\alpha$, the Taylor expansion $(1-\alpha)^N \approx 1 - N\alpha$ gives the approximation."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Hypothesis-Driven Research Process
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A rigorous hypothesis-driven process for Indian markets follows these steps:
      </p>

      <div className="my-6 flex justify-center">
        <svg viewBox="0 0 600 250" className="w-full max-w-2xl" aria-label="Research process flow">
          <defs>
            <marker id="resArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#6366f1" />
            </marker>
          </defs>

          {[
            { label: 'Economic\nHypothesis', x: 20, y: 40, color: '#3b82f6' },
            { label: 'Formalize\nModel', x: 140, y: 40, color: '#8b5cf6' },
            { label: 'In-Sample\nTest', x: 260, y: 40, color: '#f59e0b' },
            { label: 'Out-of-Sample\nValidation', x: 380, y: 40, color: '#22c55e' },
            { label: 'Paper\nTrading', x: 500, y: 40, color: '#ef4444' },
          ].map((step, i) => (
            <g key={i}>
              <rect x={step.x} y={step.y} width="100" height="50" rx="8" fill={step.color} opacity="0.8" />
              {step.label.split('\n').map((line, j) => (
                <text key={j} x={step.x + 50} y={step.y + 22 + j * 14} textAnchor="middle"
                  className="text-[9px] font-bold" fill="white">{line}</text>
              ))}
              {i < 4 && (
                <line x1={step.x + 102} y1={step.y + 25} x2={step.x + 118} y2={step.y + 25}
                  stroke="#6366f1" strokeWidth="2" markerEnd="url(#resArrow)" />
              )}
            </g>
          ))}

          {/* Feedback loop */}
          <path d="M 550 100 C 570 100, 570 180, 320 180 L 70 180 C 10 180, 10 100, 20 90"
            fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4" markerEnd="url(#resArrow)" />
          <text x="300" y="200" textAnchor="middle" className="text-[9px]" fill="#ef4444">
            Iterate: refine hypothesis based on findings
          </text>

          {/* Indian market context */}
          <rect x="140" y="120" width="320" height="35" rx="6" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="1" />
          <text x="300" y="140" textAnchor="middle" className="text-[9px] font-medium" fill="#0369a1">
            Indian Market Context: NSE microstructure, SEBI rules, FII flows, RBI policy
          </text>
        </svg>
      </div>

      <PythonCode
        title="hypothesis_research_framework.py"
        runnable
        code={`import numpy as np
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple
from datetime import datetime

@dataclass
class ResearchHypothesis:
    """Structured hypothesis for quant research."""
    id: str
    title: str
    economic_rationale: str
    testable_prediction: str
    null_hypothesis: str
    alternative_hypothesis: str
    market: str = 'NSE'
    asset_universe: str = 'Nifty 50'
    expected_sharpe: float = 0.0
    status: str = 'PROPOSED'
    created: str = field(default_factory=lambda: datetime.now().isoformat())

@dataclass
class ResearchResult:
    hypothesis_id: str
    in_sample_sharpe: float
    out_sample_sharpe: float
    t_statistic: float
    p_value: float
    n_observations: int
    decay_ratio: float
    verdict: str

class HypothesisDrivenResearch:
    """Framework for hypothesis-driven strategy research."""

    def __init__(self):
        self.hypotheses: List[ResearchHypothesis] = []
        self.results: List[ResearchResult] = []

    def register_hypothesis(self, **kwargs) -> ResearchHypothesis:
        h = ResearchHypothesis(**kwargs)
        self.hypotheses.append(h)
        return h

    def test_hypothesis(self, hypothesis_id: str,
                        returns_is: np.ndarray,
                        returns_oos: np.ndarray,
                        risk_free: float = 0.065/252) -> ResearchResult:
        """Test hypothesis with in-sample and out-of-sample data."""
        # In-sample Sharpe
        is_excess = returns_is - risk_free
        is_sharpe = np.mean(is_excess) / np.std(is_excess) * np.sqrt(252)

        # Out-of-sample Sharpe
        oos_excess = returns_oos - risk_free
        oos_sharpe = np.mean(oos_excess) / np.std(oos_excess) * np.sqrt(252)

        # t-test: is mean return significantly different from 0?
        n = len(returns_oos)
        t_stat = np.mean(oos_excess) / (np.std(oos_excess) / np.sqrt(n))

        # Approximate p-value (two-tailed)
        from scipy import stats
        p_value = 2 * (1 - stats.t.cdf(abs(t_stat), n - 1))

        # Decay ratio
        decay = 1 - oos_sharpe / max(is_sharpe, 0.001) if is_sharpe > 0 else 1.0

        # Verdict
        if p_value < 0.05 and oos_sharpe > 0.5 and decay < 0.5:
            verdict = 'PROMISING - proceed to paper trading'
        elif p_value < 0.10 and oos_sharpe > 0.3:
            verdict = 'MARGINAL - needs more investigation'
        else:
            verdict = 'REJECT - insufficient evidence'

        result = ResearchResult(
            hypothesis_id=hypothesis_id,
            in_sample_sharpe=is_sharpe,
            out_sample_sharpe=oos_sharpe,
            t_statistic=t_stat,
            p_value=p_value,
            n_observations=n,
            decay_ratio=decay,
            verdict=verdict
        )
        self.results.append(result)
        return result

# Research session: Indian market hypotheses
research = HypothesisDrivenResearch()

# Hypothesis 1: FII momentum
h1 = research.register_hypothesis(
    id='H001',
    title='FII Flow Momentum in Nifty 50',
    economic_rationale='Foreign Institutional Investors (FIIs) trade based on '
        'global macro views with persistent directional bias. Their large '
        'order flows create short-term momentum in Nifty 50 stocks.',
    testable_prediction='Stocks with positive FII net buying over 5 days '
        'outperform those with net selling by >5% annualized.',
    null_hypothesis='H0: FII flow quintile spread return = 0',
    alternative_hypothesis='H1: FII flow quintile spread return > 0',
    expected_sharpe=1.2,
)

# Hypothesis 2: Earnings announcement drift
h2 = research.register_hypothesis(
    id='H002',
    title='Post-Earnings Announcement Drift (PEAD) in India',
    economic_rationale='Indian retail investors underreact to earnings '
        'surprises due to information processing constraints. Institutional '
        'investors are slow to incorporate quarterly results.',
    testable_prediction='Stocks with positive earnings surprises (>10% beat) '
        'continue to outperform for 60 days post-announcement.',
    null_hypothesis='H0: Post-earnings CAR(1,60) = 0 for positive surprises',
    alternative_hypothesis='H1: Post-earnings CAR(1,60) > 0',
    expected_sharpe=0.8,
)

# Simulate test results
np.random.seed(42)

# H1: FII Momentum (strong signal)
is_returns_1 = np.random.normal(0.0008, 0.015, 1260)  # 5yr IS
oos_returns_1 = np.random.normal(0.0005, 0.016, 504)   # 2yr OOS

# H2: PEAD (weaker signal)
is_returns_2 = np.random.normal(0.0004, 0.018, 1260)
oos_returns_2 = np.random.normal(0.0002, 0.019, 504)

r1 = research.test_hypothesis('H001', is_returns_1, oos_returns_1)
r2 = research.test_hypothesis('H002', is_returns_2, oos_returns_2)

print("=== Hypothesis-Driven Research Results ===\\n")
for h, r in zip([h1, h2], [r1, r2]):
    print(f"--- {h.id}: {h.title} ---")
    print(f"  Economic Rationale: {h.economic_rationale[:80]}...")
    print(f"  In-Sample Sharpe:  {r.in_sample_sharpe:.2f}")
    print(f"  Out-Sample Sharpe: {r.out_sample_sharpe:.2f}")
    print(f"  Decay Ratio:       {r.decay_ratio:.1%}")
    print(f"  t-statistic:       {r.t_statistic:.3f}")
    print(f"  p-value:           {r.p_value:.4f}")
    print(f"  VERDICT: {r.verdict}")
    print()`}
      />

      <ExampleBlock
        title="Formulating a Hypothesis for Indian Markets"
        difficulty="intermediate"
        problem="You observe that Bank Nifty tends to move sharply after RBI policy announcements. Formulate this as a testable hypothesis using the hypothesis-driven framework."
        solution={[
          {
            step: 'State the economic rationale',
            formula: '\\text{RBI policy} \\to \\text{interest rate expectations} \\to \\text{bank stock prices}',
            explanation: 'RBI monetary policy directly affects bank net interest margins (NIM). Rate cuts increase NIM for banks with floating-rate loans, while rate hikes benefit banks with more fixed-rate deposits.',
          },
          {
            step: 'Formalize the hypothesis',
            formula: 'H_0: \\mathbb{E}[R_{\\text{BankNifty}} | \\text{rate cut}] = \\mathbb{E}[R_{\\text{BankNifty}} | \\text{no cut}]',
            explanation: 'The null hypothesis states that Bank Nifty returns are the same regardless of RBI rate decisions.',
          },
          {
            step: 'Define the test',
            formula: 'R_{\\text{event}} = \\frac{1}{N}\\sum_{i=1}^{N} R_{i, [0,5]} \\text{ for rate cut events}',
            explanation: 'Calculate the average 5-day return after RBI rate cut announcements across all events since 2010. Compare with a control period.',
          },
          {
            step: 'Set acceptance criteria',
            formula: 't > 2.0, \\; \\text{Sharpe}_{\\text{OOS}} > 0.5, \\; \\text{Decay} < 50\\%',
            explanation: 'The strategy must show statistical significance (t > 2.0), viable out-of-sample Sharpe (> 0.5), and less than 50% decay from in-sample to out-of-sample.',
          },
        ]}
      />

      <NoteBlock title="Indian Market Research Hypotheses" type="historical">
        <p>Well-documented alpha sources in Indian markets with economic rationale:</p>
        <ul className="mt-2 space-y-2">
          <li><strong>FII Flow Momentum:</strong> Persistent directional trading by foreign institutions creates short-term momentum (structural: information asymmetry).</li>
          <li><strong>NSE-BSE Spread:</strong> Dual-listed stocks sometimes diverge between NSE and BSE, creating statistical arbitrage opportunities (structural: fragmented markets).</li>
          <li><strong>F&amp;O Expiry Effects:</strong> Options open interest concentration around specific strikes creates gamma pinning effects on expiry Thursday (structural: derivative market mechanics).</li>
          <li><strong>Budget Day Volatility:</strong> Union Budget creates predictable volatility expansion in specific sectors (behavioral: uncertainty premium).</li>
          <li><strong>Smallcap Value:</strong> Indian small-caps with low P/E and high promoter holding tend to outperform (behavioral: neglected firm effect).</li>
        </ul>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Always prefer <strong>hypothesis-driven research</strong> over data mining when
          developing strategies for Indian markets. Start with an economic rationale rooted
          in market structure (NSE/BSE mechanics, SEBI regulations, FII behavior) or
          behavioral biases. A single well-reasoned hypothesis test has far more predictive
          power than hundreds of data-mined patterns. The best strategies are those where
          you can explain <em>why</em> the alpha exists, not just <em>that</em> it exists.
        </p>
      </NoteBlock>
    </div>
  )
}
