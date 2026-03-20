import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractivePreprocessing() {
  const [rawText, setRawText] = useState('Reliance Industries Ltd reported Q3 FY24 revenue of ₹2,32,745 Cr, up 3.7% YoY. EBITDA margin expanded 120bps to 18.2%.')
  const [steps, setSteps] = useState({ lowercase: true, numbers: true, stopwords: true, stemming: false, finTerms: true })

  let processed = rawText
  if (steps.lowercase) processed = processed.toLowerCase()
  if (steps.numbers) processed = processed.replace(/₹[\d,]+/g, '<CURRENCY>').replace(/\d+\.?\d*%/g, '<PERCENT>').replace(/\d+\.?\d*/g, '<NUM>')
  if (steps.stopwords) {
    const stops = ['the', 'of', 'to', 'a', 'in', 'is', 'and', 'for', 'on', 'at', 'by', 'an', 'be']
    processed = processed.split(' ').filter(w => !stops.includes(w.toLowerCase())).join(' ')
  }
  if (steps.finTerms) {
    processed = processed.replace(/ebitda/gi, '<FIN_METRIC:EBITDA>').replace(/yoy/gi, '<GROWTH:YOY>').replace(/revenue/gi, '<FIN_METRIC:REVENUE>')
  }

  const tokens = processed.split(/\s+/).filter(t => t.length > 0)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Financial Text Preprocessor
      </h3>
      <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
        Toggle preprocessing steps to see how Indian financial text is transformed for NLP models.
      </p>

      <textarea value={rawText} onChange={e => setRawText(e.target.value)}
        className="mb-3 w-full rounded-lg border border-gray-300 p-3 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
        rows={3} />

      <div className="mb-3 flex flex-wrap gap-2">
        {Object.entries(steps).map(([key, val]) => (
          <button key={key} onClick={() => setSteps({ ...steps, [key]: !val })}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              val ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300' : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500'
            }`}>
            {key}
          </button>
        ))}
      </div>

      <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
        <div className="text-xs font-semibold text-gray-500 mb-1">Processed ({tokens.length} tokens):</div>
        <div className="text-sm font-mono text-gray-700 dark:text-gray-300 break-all">{processed}</div>
      </div>
    </div>
  )
}

export default function TextPreprocessing() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Financial Text Preprocessing for Indian Filings
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Indian financial documents -- BSE/NSE filings, SEBI circulars, RBI monetary policy
        statements, and annual reports -- require specialized NLP preprocessing. The text
        contains unique challenges: Indian English conventions, Hindi/regional language mixing,
        Indian number formatting (lakhs, crores), and domain-specific financial terminology.
      </p>

      <DefinitionBlock
        title="Financial Text Preprocessing"
        label="Definition 15.4"
        definition="Financial text preprocessing transforms raw text from corporate filings, news articles, and regulatory documents into clean, structured inputs for NLP models. Steps include tokenization, normalization, entity recognition (company names, financial metrics), number handling (INR formatting), and domain-specific stop word removal."
        notation="Text pipeline: raw → tokenize → normalize → clean → encode → model input"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Indian Financial Text Challenges
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Challenge</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Example</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Solution</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Indian number system</td>
              <td className="px-4 py-2">₹2,32,745 Cr</td>
              <td className="px-4 py-2">Parse lakh/crore notation</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Fiscal year notation</td>
              <td className="px-4 py-2">FY24, Q3FY24, H1FY25</td>
              <td className="px-4 py-2">Map to calendar dates</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Mixed language</td>
              <td className="px-4 py-2">Hindi terms in English filings</td>
              <td className="px-4 py-2">Multilingual tokenizer</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Company name variants</td>
              <td className="px-4 py-2">HDFC Bank / HDFCBANK / HDFC Bank Ltd</td>
              <td className="px-4 py-2">Entity normalization</td>
            </tr>
            <tr>
              <td className="px-4 py-2">SEBI/RBI jargon</td>
              <td className="px-4 py-2">UPSI, SAST, NPA, LAF</td>
              <td className="px-4 py-2">Domain dictionary</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Tokenization for Financial Text
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Standard tokenizers fail on financial text. Consider the challenges with Indian financial numbers:
      </p>

      <BlockMath math="\text{``₹2,32,745 Cr''} \xrightarrow{\text{parse}} 2{,}32{,}745 \times 10^7 = 23{,}27{,}45{,}00{,}000" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The TF-IDF representation for document <InlineMath math="d" /> and term <InlineMath math="t" />:
      </p>

      <BlockMath math="\text{TF-IDF}(t, d) = \frac{f_{t,d}}{\max_{t'} f_{t',d}} \times \log \frac{N}{|\{d' : t \in d'\}|}" />

      <TheoremBlock
        title="Information Loss in Preprocessing"
        label="Theorem 15.4"
        statement="Over-aggressive preprocessing (removing numbers, normalizing all entities) can destroy predictive signal. For financial text, the optimal preprocessing preserves: (1) directional words (rose, fell, exceeded, missed), (2) magnitude information (₹1Cr vs ₹100Cr), (3) temporal references (Q3FY24, YoY). The mutual information I(Y; X_processed) ≤ I(Y; X_raw) with equality only when preprocessing is lossless."
        proof="By the data processing inequality, for any Markov chain X_raw → X_processed → Y, we have I(X_raw; Y) ≥ I(X_processed; Y). Equality holds if and only if X_processed is a sufficient statistic for Y given X_raw. Since no preprocessing pipeline captures all nuances of financial language, I(X_processed; Y) < I(X_raw; Y) in practice. The goal is to minimize this gap while reducing dimensionality."
      />

      <InteractivePreprocessing />

      <PythonCode
        title="financial_text_preprocessing.py"
        runnable
        code={`import re
import numpy as np
from typing import List, Dict, Tuple

class IndianFinancialPreprocessor:
    """
    Specialized text preprocessor for Indian financial documents.
    Handles INR formatting, FY notation, SEBI terminology.
    """
    def __init__(self):
        self.indian_number_pattern = re.compile(
            r'₹?\s*(\d{1,3}(?:,\d{2})*(?:,\d{3})?(?:\.\d+)?)\s*'
            r'(crore|cr|lakh|lk|billion|million|mn|bn|thousand|k)?',
            re.IGNORECASE
        )
        self.fy_pattern = re.compile(
            r'(?:FY|fy)\s*(\d{2,4})|(?:Q[1-4])\s*(?:FY|fy)\s*(\d{2,4})|'
            r'(?:H[12])\s*(?:FY|fy)\s*(\d{2,4})',
            re.IGNORECASE
        )
        self.percentage_pattern = re.compile(r'(\d+\.?\d*)\s*(%|bps|basis points)', re.IGNORECASE)

        # Indian financial stopwords
        self.fin_stopwords = {
            'limited', 'ltd', 'pvt', 'private', 'public',
            'company', 'corporation', 'inc', 'respectively',
            'following', 'table', 'annexure', 'schedule'
        }

        # SEBI/RBI domain terms to preserve
        self.domain_terms = {
            'UPSI', 'SAST', 'NPA', 'GNPA', 'NNPA', 'NIM', 'CASA',
            'PCR', 'SLR', 'CRR', 'LAF', 'MSF', 'NBFC', 'AUM',
            'NAV', 'SIP', 'STT', 'LTCG', 'STCG', 'DDT', 'TDS',
            'EBITDA', 'PAT', 'PBT', 'EPS', 'PE', 'ROE', 'ROCE'
        }

        # NSE stock name mappings
        self.stock_aliases = {
            'reliance': 'RELIANCE', 'reliance industries': 'RELIANCE',
            'tcs': 'TCS', 'tata consultancy': 'TCS',
            'hdfc bank': 'HDFCBANK', 'hdfc': 'HDFCBANK',
            'infosys': 'INFY', 'icici bank': 'ICICIBANK',
            'sbi': 'SBIN', 'state bank': 'SBIN',
            'kotak mahindra': 'KOTAKBANK', 'kotak bank': 'KOTAKBANK'
        }

    def parse_indian_number(self, text: str) -> float:
        """Parse Indian number notation to float."""
        multipliers = {
            'crore': 1e7, 'cr': 1e7,
            'lakh': 1e5, 'lk': 1e5,
            'billion': 1e9, 'bn': 1e9,
            'million': 1e6, 'mn': 1e6,
            'thousand': 1e3, 'k': 1e3
        }
        match = self.indian_number_pattern.search(text)
        if not match:
            return 0.0
        number_str = match.group(1).replace(',', '')
        multiplier_str = (match.group(2) or '').lower()
        number = float(number_str)
        multiplier = multipliers.get(multiplier_str, 1)
        return number * multiplier

    def normalize_entities(self, text: str) -> str:
        """Normalize company names to NSE symbols."""
        text_lower = text.lower()
        for alias, symbol in self.stock_aliases.items():
            if alias in text_lower:
                text = re.sub(re.escape(alias), f'<STOCK:{symbol}>', text, flags=re.IGNORECASE)
        return text

    def extract_financial_metrics(self, text: str) -> List[Dict]:
        """Extract structured financial metrics from text."""
        metrics = []

        # Find percentages and bps
        for match in self.percentage_pattern.finditer(text):
            value = float(match.group(1))
            unit = match.group(2).lower()
            if unit == 'bps' or 'basis' in unit:
                value /= 100  # Convert bps to percentage
            metrics.append({
                'value': value, 'unit': '%',
                'context': text[max(0, match.start()-30):match.end()+30]
            })

        # Find INR amounts
        for match in self.indian_number_pattern.finditer(text):
            value = self.parse_indian_number(match.group())
            if value > 0:
                metrics.append({
                    'value': value, 'unit': 'INR',
                    'context': text[max(0, match.start()-30):match.end()+30]
                })

        return metrics

    def preprocess(self, text: str, preserve_numbers: bool = True,
                    preserve_entities: bool = True) -> str:
        """Full preprocessing pipeline for Indian financial text."""
        # Normalize entities
        if preserve_entities:
            text = self.normalize_entities(text)

        # Handle FY notation
        text = self.fy_pattern.sub(r'<FISCAL_PERIOD>', text)

        # Handle numbers
        if preserve_numbers:
            text = self.percentage_pattern.sub(r'<PERCENT:\\1>', text)
            text = self.indian_number_pattern.sub(
                lambda m: f'<AMOUNT:{self.parse_indian_number(m.group()):.0f}>',
                text
            )
        else:
            text = re.sub(r'[\d₹,]+', '<NUM>', text)

        # Clean whitespace
        text = re.sub(r'\s+', ' ', text).strip()

        # Remove financial stopwords (but preserve domain terms)
        words = text.split()
        words = [w for w in words if w.lower() not in self.fin_stopwords
                 or w.upper() in self.domain_terms]

        return ' '.join(words)

    def tokenize_for_sentiment(self, text: str) -> List[str]:
        """Tokenize with sentiment-preserving rules."""
        # Preserve negations
        text = re.sub(r"n't", " not", text)
        text = re.sub(r"won't", "will not", text)

        # Preserve directional words
        directional = {'exceeded', 'missed', 'beat', 'rose', 'fell',
                       'surged', 'plunged', 'improved', 'declined',
                       'upgraded', 'downgraded', 'outperformed'}

        tokens = re.findall(r'<[^>]+>|[\w]+', text.lower())
        return tokens


# Demo
preprocessor = IndianFinancialPreprocessor()

sample_texts = [
    "Reliance Industries Q3 FY24: Revenue ₹2,32,745 Cr (+3.7% YoY), EBITDA margin expanded 120bps to 18.2%. Jio subscribers crossed 47 Cr.",
    "HDFC Bank reported GNPA at 1.26%, improved from 1.34% QoQ. NIM stood at 3.65%. CASA ratio at 42.8% as of Dec 2023.",
    "SEBI imposed penalty of ₹25 lakh on promoter for violation of SAST regulations. UPSI disclosure delayed by 3 trading days.",
    "SBI Q3 net profit surged 35% to ₹9,164 Cr. PCR improved to 74.8%. RBI's LAF rate unchanged at 6.50%.",
]

print("Indian Financial Text Preprocessing")
print(f"{'='*70}")

for i, text in enumerate(sample_texts):
    print(f"\\nSample {i+1}:")
    print(f"  Raw: {text[:80]}...")

    processed = preprocessor.preprocess(text)
    print(f"  Processed: {processed[:80]}...")

    metrics = preprocessor.extract_financial_metrics(text)
    if metrics:
        print(f"  Metrics extracted: {len(metrics)}")
        for m in metrics[:3]:
            print(f"    {m['unit']}: {m['value']:,.0f}")

    tokens = preprocessor.tokenize_for_sentiment(processed)
    print(f"  Tokens: {len(tokens)}")

# Number parsing demo
print(f"\\n{'='*70}")
print("Indian Number Parsing:")
test_numbers = ["₹2,32,745 Cr", "₹45.6 lakh", "₹1,234 crore", "₹89 bn"]
for num_str in test_numbers:
    parsed = preprocessor.parse_indian_number(num_str)
    print(f"  {num_str:20s} -> INR {parsed:>20,.0f}")`}
      />

      <ExampleBlock
        title="Preprocessing an NSE Corporate Filing"
        difficulty="intermediate"
        problem="Preprocess this BSE filing text for sentiment analysis: 'TATA MOTORS LTD has informed BSE that Q2 FY25 consolidated revenue stood at ₹1,01,450 crore, a decline of 3.2% YoY. Free cash flow turned negative at -₹2,350 Cr due to EV capex.'"
        solution={[
          {
            step: 'Entity normalization',
            formula: '\\text{TATA MOTORS LTD} \\rightarrow \\text{<STOCK:TATAMOTORS>}',
            explanation: 'Map the company name to its NSE ticker symbol for consistent entity reference.',
          },
          {
            step: 'Financial metric extraction',
            formula: '\\text{₹1,01,450 crore} \\rightarrow \\text{<AMOUNT:1014500000000>}',
            explanation: 'Parse Indian number notation: 1,01,450 × 10^7 = ₹1.01 lakh crore. This is the revenue figure.',
          },
          {
            step: 'Sentiment-critical tokens preserved',
            formula: '\\{\\text{decline, negative, turned}\\} \\in \\text{sentiment\\_tokens}',
            explanation: 'These directional words carry strong negative sentiment signal and must not be removed by stopword filtering.',
          },
          {
            step: 'Final preprocessed output',
            formula: '\\text{<STOCK:TATAMOTORS> <FISCAL> revenue <AMOUNT> decline <PERCENT:3.2> ...}',
            explanation: 'Structured representation preserving entities, amounts, directional words, and financial metrics.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Indian financial text preprocessing requires domain-specific handling: (1) parse
          the lakh/crore number system correctly (₹2,32,745 Cr = ₹23,274.5 billion),
          (2) handle FY notation (FY24 = Apr 2023 - Mar 2024), (3) preserve SEBI/RBI
          regulatory terms (UPSI, NPA, CASA, NIM), (4) normalize NSE stock names (multiple
          aliases per company), (5) preserve sentiment-critical words (beat, miss, surge,
          plunge) while removing boilerplate. These preprocessing choices directly impact
          downstream NLP model performance for trading signals.
        </p>
      </NoteBlock>
    </div>
  )
}
