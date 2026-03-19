import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveNotebookPlanner() {
  const [sections, setSections] = useState([
    { name: 'Hypothesis', complete: true },
    { name: 'Data Collection', complete: true },
    { name: 'EDA', complete: true },
    { name: 'Feature Engineering', complete: false },
    { name: 'Backtesting', complete: false },
    { name: 'Statistical Tests', complete: false },
    { name: 'OOS Validation', complete: false },
    { name: 'Conclusion', complete: false },
  ])

  const progress = sections.filter(s => s.complete).length / sections.length * 100

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Research Notebook Progress Tracker
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Track progress through the structured research notebook sections.
      </p>

      <div className="mb-3 space-y-2">
        {sections.map((section, i) => (
          <div key={i} className="flex items-center gap-3 cursor-pointer" onClick={() => {
            const next = [...sections]
            next[i] = { ...next[i], complete: !next[i].complete }
            setSections(next)
          }}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${section.complete ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500 dark:bg-gray-700'}`}>
              {section.complete ? '\u2713' : i + 1}
            </div>
            <span className={`text-sm ${section.complete ? 'text-green-700 dark:text-green-400 line-through' : 'text-gray-700 dark:text-gray-300'}`}>
              {section.name}
            </span>
          </div>
        ))}
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
        <div className="bg-indigo-500 h-3 rounded-full transition-all" style={{ width: `${progress}%` }} />
      </div>
      <p className="mt-1 text-xs text-gray-500 text-center">{progress.toFixed(0)}% complete</p>
    </div>
  )
}

export default function ResearchNotebooks() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Structuring Research Notebooks
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        A well-structured research notebook is the backbone of reproducible quantitative
        research. For Indian market strategies, notebooks must capture the complete research
        pipeline: from hypothesis formulation through NSE data analysis to statistical validation.
        This section covers best practices for organizing research that can be reviewed,
        replicated, and built upon.
      </p>

      <DefinitionBlock
        title="Research Notebook"
        label="Definition 19.2"
        definition="A research notebook in quantitative finance is a structured computational document (typically Jupyter/Python) that records the complete research process for a trading strategy. It includes the hypothesis, data sources, analysis methodology, results, and conclusions in a reproducible format. Good notebooks serve as both documentation and executable code."
        notation="Standard format: one notebook per hypothesis, with clear section headers, version control (git), and data provenance tracking."
      />

      <InteractiveNotebookPlanner />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Notebook Architecture
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Every research notebook should follow a standardized structure. This ensures
        consistency across your research team and makes it easy to review and compare
        different strategy ideas.
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Section</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Content</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Approx Lines</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">1. Metadata</td>
              <td className="px-4 py-2">Author, date, hypothesis ID, version</td>
              <td className="px-4 py-2">10--20</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">2. Hypothesis</td>
              <td className="px-4 py-2">Economic rationale, formal statement, predictions</td>
              <td className="px-4 py-2">30--50</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">3. Data</td>
              <td className="px-4 py-2">Sources, loading, cleaning, universe</td>
              <td className="px-4 py-2">100--200</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">4. EDA</td>
              <td className="px-4 py-2">Plots, distributions, correlations</td>
              <td className="px-4 py-2">100--200</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">5. Signal</td>
              <td className="px-4 py-2">Feature engineering, signal construction</td>
              <td className="px-4 py-2">100--200</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">6. Backtest</td>
              <td className="px-4 py-2">Portfolio construction, performance</td>
              <td className="px-4 py-2">150--300</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-medium">7. Validation</td>
              <td className="px-4 py-2">OOS tests, statistical tests, robustness</td>
              <td className="px-4 py-2">100--200</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-medium">8. Conclusion</td>
              <td className="px-4 py-2">Summary, go/no-go decision, next steps</td>
              <td className="px-4 py-2">30--50</td>
            </tr>
          </tbody>
        </table>
      </div>

      <PythonCode
        title="research_notebook_template.py"
        runnable
        code={`"""
Research Notebook Template for Indian Market Strategies
=====================================================
Hypothesis ID: H-2024-042
Author: Quant Research Team
Date: 2024-01-15
Version: 1.2
Universe: Nifty 50
Data Period: 2015-01-01 to 2024-01-01
"""

import numpy as np
from dataclasses import dataclass, field
from typing import List, Dict, Optional
from datetime import datetime

# ============================================================
# Section 1: Research Metadata
# ============================================================

@dataclass
class ResearchMetadata:
    """Standardized research notebook metadata."""
    hypothesis_id: str
    title: str
    author: str
    created: str
    version: str
    universe: str
    data_start: str
    data_end: str
    is_period: str  # In-sample period
    oos_period: str  # Out-of-sample period
    status: str = 'IN_PROGRESS'
    tags: List[str] = field(default_factory=list)

    def to_header(self) -> str:
        lines = [
            f"Hypothesis: {self.hypothesis_id} - {self.title}",
            f"Author: {self.author} | Version: {self.version}",
            f"Universe: {self.universe}",
            f"IS: {self.is_period} | OOS: {self.oos_period}",
            f"Status: {self.status}",
            f"Tags: {', '.join(self.tags)}",
        ]
        return '\\n'.join(lines)

meta = ResearchMetadata(
    hypothesis_id='H-2024-042',
    title='FII Flow Momentum in Nifty 50',
    author='Research Team',
    created='2024-01-15',
    version='1.2',
    universe='Nifty 50',
    data_start='2015-01-01',
    data_end='2024-01-01',
    is_period='2015-2020',
    oos_period='2021-2023',
    tags=['momentum', 'FII', 'institutional_flow', 'nifty50'],
)
print(meta.to_header())

# ============================================================
# Section 2: Hypothesis Statement
# ============================================================

@dataclass
class HypothesisStatement:
    economic_rationale: str
    formal_h0: str
    formal_h1: str
    predictions: List[str]
    assumptions: List[str]
    related_literature: List[str]

hypothesis = HypothesisStatement(
    economic_rationale=(
        "FII net buying creates persistent price pressure in Nifty 50 "
        "stocks due to (1) large order sizes relative to daily volume, "
        "(2) herding behavior among global funds, and (3) information "
        "cascades from developed market sentiment."
    ),
    formal_h0="H0: E[R_long - R_short | FII_quintile] = 0",
    formal_h1="H1: E[R_long - R_short | FII_quintile] > 0",
    predictions=[
        "Top FII-buying quintile outperforms bottom quintile",
        "Effect persists for 5-20 trading days",
        "Stronger during FII risk-on periods",
        "Weaker in small-caps (lower FII participation)",
    ],
    assumptions=[
        "FII flow data available with 1-day lag (NSDL/CDSL)",
        "No survivorship bias in Nifty 50 constituents",
        "Transaction costs: 10 bps round-trip (Zerodha)",
    ],
    related_literature=[
        "Bohn & Tesar (1996) - Portfolio rebalancing",
        "Griffin et al. (2004) - Institutional flows",
        "Grinblatt & Keloharju (2000) - Momentum trading",
    ],
)

print("\\n=== Hypothesis Statement ===")
print(f"Rationale: {hypothesis.economic_rationale[:100]}...")
print(f"H0: {hypothesis.formal_h0}")
print(f"H1: {hypothesis.formal_h1}")

# ============================================================
# Section 3: Research Quality Metrics
# ============================================================

@dataclass
class NotebookQualityScore:
    """Score the quality of a research notebook."""
    has_hypothesis: bool = False
    has_economic_rationale: bool = False
    has_in_sample: bool = False
    has_out_of_sample: bool = False
    has_statistical_tests: bool = False
    has_transaction_costs: bool = False
    has_robustness_checks: bool = False
    has_conclusion: bool = False
    code_is_reproducible: bool = False
    data_provenance_documented: bool = False

    @property
    def score(self) -> float:
        checks = [
            self.has_hypothesis, self.has_economic_rationale,
            self.has_in_sample, self.has_out_of_sample,
            self.has_statistical_tests, self.has_transaction_costs,
            self.has_robustness_checks, self.has_conclusion,
            self.code_is_reproducible, self.data_provenance_documented,
        ]
        return sum(checks) / len(checks) * 100

    @property
    def grade(self) -> str:
        s = self.score
        if s >= 90: return 'A - Publication quality'
        if s >= 70: return 'B - Good, minor gaps'
        if s >= 50: return 'C - Needs improvement'
        return 'D - Incomplete, do not proceed'

quality = NotebookQualityScore(
    has_hypothesis=True,
    has_economic_rationale=True,
    has_in_sample=True,
    has_out_of_sample=True,
    has_statistical_tests=True,
    has_transaction_costs=True,
    has_robustness_checks=False,
    has_conclusion=True,
    code_is_reproducible=True,
    data_provenance_documented=False,
)

print(f"\\n=== Notebook Quality ===")
print(f"Score: {quality.score:.0f}%")
print(f"Grade: {quality.grade}")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Reproducibility Requirements
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Every research notebook must be fully reproducible. This means anyone on your team
        can run the notebook from scratch and get identical results. Key requirements:
      </p>

      <BlockMath math="\text{Reproducibility} = f(\text{code}, \text{data}, \text{environment}, \text{random seeds})" />

      <TheoremBlock
        title="Data Provenance Chain"
        label="Theorem 19.2"
        statement="For a research result to be trustworthy, the complete data provenance chain must be documented: $D_{\text{raw}} \xrightarrow{T_1} D_{\text{clean}} \xrightarrow{T_2} D_{\text{features}} \xrightarrow{T_3} D_{\text{signals}} \xrightarrow{T_4} R_{\text{results}}$ where each transformation $T_i$ must be deterministic and logged. For NSE data, this includes: raw tick data source, corporate action adjustments, survivorship bias corrections, and feature transformations."
        proof="A break in any link of the provenance chain makes the result non-reproducible. Common breaks in Indian market research: (1) NSE corporate action adjustments applied inconsistently, (2) index constituent changes not tracked (survivorship bias), (3) random seeds not fixed for stochastic elements."
      />

      <ExampleBlock
        title="Version-Controlled Research Repository"
        difficulty="intermediate"
        problem="You have 15 research notebooks testing different alpha signals for Nifty 50. How should you organize the git repository to enable comparison and prevent data leakage?"
        solution={[
          {
            step: 'Repository structure',
            formula: '\\text{repo/} \\to \\{\\text{data/}, \\text{notebooks/}, \\text{lib/}, \\text{results/}\\}',
            explanation: 'Separate data (read-only, gitignored), notebooks (versioned), shared library code (versioned), and results (versioned). Never commit raw NSE data to git.',
          },
          {
            step: 'Notebook naming convention',
            formula: '\\text{H-YYYY-NNN\\_v\\{version\\}\\_\\{short\\_title\\}.ipynb}',
            explanation: 'Each notebook is named by hypothesis ID and version. Example: H-2024-042_v1.2_FII_momentum.ipynb. This enables easy comparison across versions.',
          },
          {
            step: 'Data isolation',
            formula: '\\text{IS} \\cap \\text{OOS} = \\emptyset, \\; \\text{IS} \\cup \\text{OOS} = \\text{Full Dataset}',
            explanation: 'Define in-sample and out-of-sample periods in a configuration file that all notebooks reference. This prevents accidental data leakage.',
          },
          {
            step: 'Review workflow',
            formula: '\\text{PR review} \\to \\text{Code review + statistical review}',
            explanation: 'Every notebook requires a pull request with both code review (is the implementation correct?) and statistical review (are the conclusions justified?). Use git branches for each hypothesis.',
          },
        ]}
      />

      <NoteBlock title="Common Research Notebook Mistakes" type="warning">
        <p>Avoid these common mistakes in Indian market research notebooks:</p>
        <ul className="mt-2 list-disc list-inside space-y-1">
          <li><strong>No fixed random seeds:</strong> Results change on every run</li>
          <li><strong>Missing data versioning:</strong> NSE data may be updated retroactively</li>
          <li><strong>Inline data transforms:</strong> Use library functions, not one-off code</li>
          <li><strong>Cherry-picked plots:</strong> Show all results, including failures</li>
          <li><strong>No transaction cost modeling:</strong> Gross returns are meaningless</li>
          <li><strong>Hardcoded dates:</strong> Use config files for IS/OOS boundaries</li>
          <li><strong>No environmental logging:</strong> Record Python/library versions</li>
        </ul>
      </NoteBlock>

      <PythonCode
        title="notebook_linter.py"
        runnable
        code={`import numpy as np
from dataclasses import dataclass
from typing import List, Dict

@dataclass
class NotebookSection:
    """Represents a section in a research notebook."""
    name: str
    required: bool
    min_cells: int
    has_code: bool = True
    has_markdown: bool = True

class NotebookLinter:
    """Lint research notebooks for quality and completeness."""

    REQUIRED_SECTIONS = [
        NotebookSection('Metadata', True, 1, False, True),
        NotebookSection('Hypothesis', True, 2, False, True),
        NotebookSection('Data Loading', True, 3, True, True),
        NotebookSection('Data Cleaning', True, 2, True, True),
        NotebookSection('EDA', True, 5, True, True),
        NotebookSection('Feature Engineering', True, 3, True, True),
        NotebookSection('Signal Construction', True, 3, True, True),
        NotebookSection('Backtest', True, 5, True, True),
        NotebookSection('Statistical Tests', True, 3, True, True),
        NotebookSection('OOS Validation', True, 3, True, True),
        NotebookSection('Robustness Checks', False, 3, True, True),
        NotebookSection('Transaction Cost Analysis', True, 2, True, True),
        NotebookSection('Conclusion', True, 1, False, True),
    ]

    def __init__(self):
        self.errors: List[str] = []
        self.warnings: List[str] = []

    def check_reproducibility(self, notebook: dict) -> List[str]:
        """Check if notebook is reproducible."""
        issues = []
        # Check for random seed
        has_seed = False
        has_imports = False
        has_version = False

        for cell in notebook.get('cells', []):
            content = cell.get('source', '')
            if 'random.seed' in content or 'np.random.seed' in content:
                has_seed = True
            if 'import' in content:
                has_imports = True
            if '__version__' in content or 'pip freeze' in content:
                has_version = True

        if not has_seed:
            issues.append('ERROR: No random seed set')
        if not has_version:
            issues.append('WARNING: No version logging')
        return issues

    def check_data_provenance(self, notebook: dict) -> List[str]:
        """Verify data source documentation."""
        issues = []
        has_source = False
        has_date_range = False

        for cell in notebook.get('cells', []):
            content = cell.get('source', '')
            if 'data_source' in content or 'NSE' in content:
                has_source = True
            if 'date_range' in content or 'start_date' in content:
                has_date_range = True

        if not has_source:
            issues.append('ERROR: Data source not documented')
        if not has_date_range:
            issues.append('ERROR: Date range not specified')
        return issues

    def lint(self, notebook: dict) -> dict:
        """Run all linting checks."""
        repro = self.check_reproducibility(notebook)
        prov = self.check_data_provenance(notebook)
        all_issues = repro + prov

        errors = [i for i in all_issues if i.startswith('ERROR')]
        warnings = [i for i in all_issues if i.startswith('WARNING')]

        score = 100 - len(errors) * 15 - len(warnings) * 5
        return {
            'score': max(0, score),
            'errors': errors,
            'warnings': warnings,
            'grade': 'A' if score >= 90 else 'B' if score >= 70 else 'C' if score >= 50 else 'F',
            'recommendation': 'Ready for review' if score >= 70 else 'Needs improvement',
        }

# Demo: lint a sample notebook
sample_notebook = {
    'cells': [
        {'source': 'import numpy as np\\nimport pandas as pd', 'type': 'code'},
        {'source': 'np.random.seed(42)\\n# NSE Nifty 50 data', 'type': 'code'},
        {'source': 'data_source = "NSE"\\nstart_date = "2015-01-01"', 'type': 'code'},
        {'source': '# Hypothesis: FII momentum in Nifty 50', 'type': 'markdown'},
        {'source': 'import sys; print(sys.__version__)', 'type': 'code'},
    ]
}

linter = NotebookLinter()
result = linter.lint(sample_notebook)

print("=== Notebook Lint Results ===")
print(f"Score: {result['score']}/100")
print(f"Grade: {result['grade']}")
print(f"Recommendation: {result['recommendation']}")

if result['errors']:
    print(f"\\nErrors ({len(result['errors'])}):")
    for e in result['errors']:
        print(f"  {e}")

if result['warnings']:
    print(f"\\nWarnings ({len(result['warnings'])}):")
    for w in result['warnings']:
        print(f"  {w}")

# Show required sections checklist
print(f"\\n=== Required Sections Checklist ===")
for section in NotebookLinter.REQUIRED_SECTIONS:
    req = "REQUIRED" if section.required else "OPTIONAL"
    print(f"  [{req:8s}] {section.name} (min {section.min_cells} cells)")`}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          A research notebook is a <strong>permanent record of your intellectual process</strong>.
          Structure it rigidly: metadata, hypothesis, data, EDA, signal, backtest, validation,
          conclusion. Every notebook should be reproducible by anyone on your team from a
          single command. Version control everything except raw data. The discipline of
          structured research notebooks is what separates professional quant firms from
          amateur traders.
        </p>
      </NoteBlock>
    </div>
  )
}
