import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveLiteratureTracker() {
  const [papers, setPapers] = useState([
    { title: 'Momentum in Indian Stock Market', source: 'SSRN', relevance: 95, reviewed: true },
    { title: 'FII Flows and Market Returns in India', source: 'JFE', relevance: 90, reviewed: true },
    { title: 'Post-Earnings Drift in Emerging Markets', source: 'arXiv', relevance: 85, reviewed: false },
    { title: 'Factor Models for Indian Equities', source: 'SSRN', relevance: 80, reviewed: false },
    { title: 'Market Microstructure of NSE', source: 'WP', relevance: 75, reviewed: false },
  ])

  const reviewed = papers.filter(p => p.reviewed).length
  const coverage = (reviewed / papers.length) * 100

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Literature Review Tracker
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Track your systematic literature review progress. Click papers to mark as reviewed.
      </p>

      <div className="space-y-2 mb-3">
        {papers.map((paper, i) => (
          <div key={i} className={`flex items-center justify-between rounded-lg p-2 cursor-pointer ${paper.reviewed ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-800/50'}`}
            onClick={() => {
              const next = [...papers]
              next[i] = { ...next[i], reviewed: !next[i].reviewed }
              setPapers(next)
            }}>
            <div className="flex items-center gap-2">
              <span className={`text-xs ${paper.reviewed ? 'text-green-600' : 'text-gray-400'}`}>
                {paper.reviewed ? '\u2713' : '\u25cb'}
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-300">{paper.title}</span>
            </div>
            <div className="flex gap-2 text-xs">
              <span className="text-gray-500">{paper.source}</span>
              <span className={`font-bold ${paper.relevance > 85 ? 'text-green-600' : 'text-yellow-600'}`}>
                {paper.relevance}%
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
          <div className="bg-indigo-500 h-2 rounded-full transition-all" style={{ width: `${coverage}%` }} />
        </div>
        <span className="text-sm font-bold text-gray-600 dark:text-gray-400">{coverage.toFixed(0)}% reviewed</span>
      </div>
    </div>
  )
}

export default function LiteratureReview() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Systematic Literature Review: SSRN and arXiv
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Quantitative finance research builds on decades of academic work. Before developing
        any strategy for Indian markets, a systematic literature review ensures you are not
        reinventing the wheel, helps identify proven alpha sources, and reveals common
        pitfalls that have already been documented.
      </p>

      <DefinitionBlock
        title="Systematic Literature Review"
        label="Definition 19.3"
        definition="A systematic literature review (SLR) is a structured, reproducible process for identifying, evaluating, and synthesizing all relevant research on a specific topic. In quantitative finance, this involves searching academic databases (SSRN, arXiv q-fin, NBER, JFE, RFS) using predefined search criteria, screening papers for relevance, and extracting key findings for strategy development."
        notation="Key databases: SSRN (Social Science Research Network), arXiv q-fin section, Google Scholar, NSE Research Working Papers, SEBI Working Papers."
      />

      <InteractiveLiteratureTracker />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Literature Review Process
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A systematic review for Indian market strategies follows a funnel approach:
      </p>

      <BlockMath math="N_{\text{found}} \xrightarrow{\text{screen}} N_{\text{relevant}} \xrightarrow{\text{review}} N_{\text{applicable}} \xrightarrow{\text{test}} N_{\text{alpha}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Typical conversion: <InlineMath math="N_{\text{found}} \approx 200" />,{' '}
        <InlineMath math="N_{\text{relevant}} \approx 40" />,{' '}
        <InlineMath math="N_{\text{applicable}} \approx 10" />,{' '}
        <InlineMath math="N_{\text{alpha}} \approx 2" />.
      </p>

      <TheoremBlock
        title="Academic Alpha Decay"
        label="Theorem 19.3"
        statement="The post-publication alpha of a documented strategy decays exponentially: $\alpha(t) = \alpha_0 \cdot e^{-\lambda t}$ where $t$ is time since publication and $\lambda$ is the decay rate. For well-known strategies (momentum, value), $\lambda \approx 0.1$ per year. The half-life $t_{1/2} = \ln(2)/\lambda \approx 7$ years. For Indian markets, decay is slower due to lower institutional penetration: $\lambda_{\text{India}} \approx 0.05$, giving $t_{1/2} \approx 14$ years."
        proof="McLean and Pontiff (2016, JFE) showed that portfolio returns of academic anomalies decline by 32% post-publication. The exponential model fits observed decay patterns across 97 anomalies. For Indian markets, the slower decay reflects lower quant adoption and higher structural frictions (SEBI regulations, fragmented data, lower institutional participation)."
      />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Source</th>
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Focus</th>
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">India Coverage</th>
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Access</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2">SSRN</td>
              <td className="px-3 py-2">Finance working papers</td>
              <td className="px-3 py-2">Good (500+ India papers)</td>
              <td className="px-3 py-2">Free</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2">arXiv (q-fin)</td>
              <td className="px-3 py-2">Quantitative methods</td>
              <td className="px-3 py-2">Moderate</td>
              <td className="px-3 py-2">Free</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2">NSE Working Papers</td>
              <td className="px-3 py-2">Indian market specific</td>
              <td className="px-3 py-2">Excellent</td>
              <td className="px-3 py-2">Free</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2">IIMA/IIMB Research</td>
              <td className="px-3 py-2">Indian finance research</td>
              <td className="px-3 py-2">Excellent</td>
              <td className="px-3 py-2">Institutional</td>
            </tr>
            <tr>
              <td className="px-3 py-2">JFE / RFS / JF</td>
              <td className="px-3 py-2">Top finance journals</td>
              <td className="px-3 py-2">Some (EM focus)</td>
              <td className="px-3 py-2">Paid/Library</td>
            </tr>
          </tbody>
        </table>
      </div>

      <PythonCode
        title="literature_review_system.py"
        runnable
        code={`import numpy as np
from dataclasses import dataclass, field
from typing import List, Dict, Optional
from datetime import datetime

@dataclass
class Paper:
    """Academic paper for literature review."""
    title: str
    authors: List[str]
    year: int
    source: str  # SSRN, arXiv, journal name
    abstract: str
    relevance_score: float  # 0-100
    alpha_type: str  # momentum, value, etc.
    market_coverage: str  # India, Global, EM
    key_findings: List[str] = field(default_factory=list)
    replicable: bool = False
    india_applicable: bool = False
    status: str = 'UNREAD'  # UNREAD, READING, REVIEWED

@dataclass
class ReviewSummary:
    """Summary of literature review for a research topic."""
    topic: str
    papers_found: int
    papers_screened: int
    papers_reviewed: int
    key_themes: List[str]
    indian_market_gaps: List[str]
    actionable_ideas: List[str]

class LiteratureReviewSystem:
    """Systematic literature review for quant research."""

    def __init__(self, research_topic: str):
        self.topic = research_topic
        self.papers: List[Paper] = []
        self.search_queries: List[str] = []

    def add_paper(self, paper: Paper):
        self.papers.append(paper)

    def screen_papers(self, min_relevance: float = 50.0) -> List[Paper]:
        """Screen papers by relevance score."""
        return [p for p in self.papers if p.relevance_score >= min_relevance]

    def get_india_applicable(self) -> List[Paper]:
        """Filter papers applicable to Indian markets."""
        return [p for p in self.papers if p.india_applicable]

    def generate_summary(self) -> ReviewSummary:
        """Generate review summary."""
        reviewed = [p for p in self.papers if p.status == 'REVIEWED']
        alpha_types = {}
        for p in reviewed:
            alpha_types[p.alpha_type] = alpha_types.get(p.alpha_type, 0) + 1

        return ReviewSummary(
            topic=self.topic,
            papers_found=len(self.papers),
            papers_screened=len([p for p in self.papers if p.status != 'UNREAD']),
            papers_reviewed=len(reviewed),
            key_themes=list(alpha_types.keys()),
            indian_market_gaps=[
                'Limited NSE microstructure research',
                'Few studies on F&O-equity interaction',
                'Lack of high-frequency data studies',
                'FII flow prediction models underdeveloped',
            ],
            actionable_ideas=[
                p.title for p in reviewed
                if p.india_applicable and p.replicable
            ],
        )

    def citation_network(self) -> Dict[str, int]:
        """Analyze most-cited themes."""
        themes = {}
        for p in self.papers:
            for finding in p.key_findings:
                for word in ['momentum', 'value', 'quality', 'volatility',
                             'liquidity', 'sentiment', 'flow']:
                    if word in finding.lower():
                        themes[word] = themes.get(word, 0) + 1
        return dict(sorted(themes.items(), key=lambda x: -x[1]))

# Build literature review for momentum in India
review = LiteratureReviewSystem('Momentum Strategies in Indian Equity Market')

# Add papers
papers_data = [
    ('Momentum and Herding in Indian Stock Market',
     ['Jegadeesh', 'Titman'], 2023, 'SSRN', 92,
     'momentum', True, True,
     ['12-1 momentum significant in Nifty 500',
      'FII herding amplifies momentum']),
    ('Cross-Sectional Return Predictability in India',
     ['Agarwalla', 'Jacob'], 2022, 'NSE WP', 88,
     'multi-factor', True, True,
     ['Fama-French factors work in India',
      'Momentum strongest among mid-caps']),
    ('Post-Earnings Announcement Drift in Emerging Markets',
     ['Chen', 'Patel'], 2021, 'arXiv', 78,
     'earnings', True, True,
     ['PEAD exists in India but weaker than US',
      'Retail investor underreaction drives drift']),
    ('Market Microstructure of NSE',
     ['Krishnan', 'Shah'], 2020, 'JFE', 85,
     'microstructure', True, True,
     ['NSE spread dynamics differ from US',
      'Co-location reduces spread for HFT firms']),
    ('Factor Investing in India: A Practitioner Guide',
     ['Gupta', 'Agarwal'], 2023, 'SSRN', 95,
     'multi-factor', True, True,
     ['Quality + Momentum best combination for India',
      'Value factor weaker post-demonetization']),
]

for title, authors, year, source, rel, alpha, repl, india, findings in papers_data:
    review.add_paper(Paper(
        title=title, authors=authors, year=year,
        source=source, abstract='...',
        relevance_score=rel, alpha_type=alpha,
        market_coverage='India' if india else 'Global',
        key_findings=findings,
        replicable=repl, india_applicable=india,
        status='REVIEWED'
    ))

# Generate summary
summary = review.generate_summary()
print("=== Literature Review Summary ===")
print(f"Topic: {summary.topic}")
print(f"Papers found: {summary.papers_found}")
print(f"Papers reviewed: {summary.papers_reviewed}")
print(f"Key themes: {', '.join(summary.key_themes)}")
print(f"\\n--- Indian Market Gaps ---")
for gap in summary.indian_market_gaps:
    print(f"  - {gap}")
print(f"\\n--- Actionable Ideas ---")
for idea in summary.actionable_ideas:
    print(f"  * {idea}")

# Citation network
print(f"\\n--- Theme Frequency ---")
for theme, count in review.citation_network().items():
    print(f"  {theme:15s}: {'#' * count} ({count})")`}
      />

      <ExampleBlock
        title="Finding Alpha in Academic Papers"
        difficulty="intermediate"
        problem="You find a 2022 SSRN paper showing 12-1 momentum generates Sharpe 1.5 in Nifty 500 from 2010-2020. Should you implement this strategy directly?"
        solution={[
          {
            step: 'Check for publication decay',
            formula: '\\alpha(2024) = 1.5 \\cdot e^{-0.05 \\times 2} = 1.5 \\cdot 0.905 = 1.36',
            explanation: 'Using Indian market decay rate of 0.05/year, the expected Sharpe 2 years post-publication is 1.36. This is still viable.',
          },
          {
            step: 'Assess out-of-sample evidence',
            formula: '\\text{OOS period: 2021-2024 not in paper}',
            explanation: 'The paper only covers 2010-2020. You need to test on 2021-2024 data to verify the signal persists. Indian market structure changed significantly post-COVID.',
          },
          {
            step: 'Check for data snooping',
            formula: '\\text{Does } t > t_{\\text{Bonferroni}}?',
            explanation: 'If the paper tested multiple momentum look-back periods, the reported t-stat may be inflated. Apply Bonferroni correction for the number of tested configurations.',
          },
          {
            step: 'Decision',
            formula: '\\text{DO NOT implement directly. Replicate first.}',
            explanation: 'Never implement an academic strategy without independent replication on your own data with your own transaction cost assumptions. The paper may have different assumptions about STT, slippage, and Nifty 500 constituent survivorship.',
          },
        ]}
      />

      <NoteBlock title="India-Specific Research Sources" type="tip">
        <p>Key sources for Indian market research beyond SSRN/arXiv:</p>
        <ul className="mt-2 list-disc list-inside space-y-1">
          <li><strong>NSE Research Initiative:</strong> Working papers on Indian market microstructure</li>
          <li><strong>SEBI Working Papers:</strong> Regulatory research and market studies</li>
          <li><strong>RBI Bulletins:</strong> Monetary policy impact studies</li>
          <li><strong>IIMA Working Papers:</strong> Academic research on Indian finance</li>
          <li><strong>NISM Research:</strong> National Institute of Securities Markets publications</li>
          <li><strong>CAFRAL:</strong> Centre for Advanced Financial Research and Learning</li>
        </ul>
      </NoteBlock>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Extracting Actionable Signals from Papers
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Not every academic paper translates directly into a trading strategy. The extraction
        process requires mapping theoretical constructs to implementable signals:
      </p>

      <BlockMath math="\text{Signal}_i(t) = g\left(\text{Paper Factor}_i, \text{NSE Data}_t, \text{Indian Context}\right)" />

      <PythonCode
        title="paper_to_signal.py"
        runnable
        code={`import numpy as np
from dataclasses import dataclass
from typing import List, Dict

@dataclass
class PaperSignal:
    """Maps an academic paper finding to an implementable signal."""
    paper_title: str
    original_factor: str
    nse_implementation: str
    data_requirements: List[str]
    expected_decay: float  # Annual alpha decay rate
    india_adjustment: str
    estimated_sharpe: float
    implementation_complexity: str  # LOW, MEDIUM, HIGH

class PaperToSignalMapper:
    """Convert academic findings to NSE-tradeable signals."""

    def __init__(self):
        self.signals: List[PaperSignal] = []

    def add_signal(self, signal: PaperSignal):
        self.signals.append(signal)

    def rank_by_viability(self) -> List[PaperSignal]:
        """Rank signals by implementation viability."""
        def viability_score(s):
            sharpe_score = min(s.estimated_sharpe / 2.0, 1.0) * 40
            decay_score = (1 - s.estimated_decay) * 30
            complexity_map = {'LOW': 30, 'MEDIUM': 20, 'HIGH': 10}
            complexity_score = complexity_map.get(s.implementation_complexity, 10)
            return sharpe_score + decay_score + complexity_score

        return sorted(self.signals, key=viability_score, reverse=True)

    def generate_research_plan(self) -> str:
        ranked = self.rank_by_viability()
        lines = ["Research Plan - Ranked by Viability"]
        for i, s in enumerate(ranked):
            lines.append(f"  {i+1}. {s.paper_title}")
            lines.append(f"     Factor: {s.original_factor}")
            lines.append(f"     NSE Implementation: {s.nse_implementation}")
            lines.append(f"     Est. Sharpe: {s.estimated_sharpe}")
            lines.append(f"     India Adjustment: {s.india_adjustment}")
            lines.append("")
        return "\\n".join(lines)

# Map academic papers to NSE signals
mapper = PaperToSignalMapper()

mapper.add_signal(PaperSignal(
    paper_title='Jegadeesh & Titman (1993) - Momentum',
    original_factor='12-1 month return',
    nse_implementation='Rank Nifty 500 by 12-1 month return, long Q5 short Q1',
    data_requirements=['NSE daily prices', 'Index constituents (PIT)'],
    expected_decay=0.05,
    india_adjustment='Exclude F&O expiry weeks, adjust for circuit breakers',
    estimated_sharpe=1.2,
    implementation_complexity='LOW',
))

mapper.add_signal(PaperSignal(
    paper_title='Fama & French (1993) - Value',
    original_factor='Book-to-Market ratio',
    nse_implementation='Use P/B from NSE filings, quarterly rebalance',
    data_requirements=['NSE fundamentals', 'Quarterly filings'],
    expected_decay=0.08,
    india_adjustment='Exclude PSU banks (different B/M dynamics), use standalone P/B',
    estimated_sharpe=0.8,
    implementation_complexity='MEDIUM',
))

mapper.add_signal(PaperSignal(
    paper_title='Amihud (2002) - Illiquidity Premium',
    original_factor='|return|/volume ratio',
    nse_implementation='Daily Amihud ratio on NSE mid-caps, monthly sort',
    data_requirements=['NSE daily prices', 'Volume data'],
    expected_decay=0.03,
    india_adjustment='Higher premium in India due to wider spreads in mid-caps',
    estimated_sharpe=1.0,
    implementation_complexity='LOW',
))

mapper.add_signal(PaperSignal(
    paper_title='Novy-Marx (2013) - Gross Profitability',
    original_factor='Gross Profit / Total Assets',
    nse_implementation='Quarterly GP/TA from NSE filings, Nifty 500 universe',
    data_requirements=['NSE quarterly financials', 'Balance sheet data'],
    expected_decay=0.06,
    india_adjustment='Adjust for Indian GAAP vs IFRS differences in gross profit definition',
    estimated_sharpe=0.9,
    implementation_complexity='MEDIUM',
))

print(mapper.generate_research_plan())`}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          A systematic literature review is <strong>not optional</strong> -- it is the foundation
          of credible research. Every hour spent reviewing existing work saves ten hours of
          redundant research. Focus on papers with Indian market coverage, but also review
          global studies for transferable insights. Always replicate before implementing, and
          account for post-publication alpha decay. Map each paper to a concrete, implementable
          signal for NSE before deciding whether to pursue further research.
        </p>
      </NoteBlock>
    </div>
  )
}
