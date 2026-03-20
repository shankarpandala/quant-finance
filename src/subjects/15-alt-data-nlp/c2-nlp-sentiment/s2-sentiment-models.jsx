import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'


function InteractiveSentimentScorer() {
  const [headline, setHeadline] = useState('Reliance Industries beats Q3 estimates with strong Jio growth')
  const [sentiment, setSentiment] = useState({ positive: 0.72, negative: 0.08, neutral: 0.20 })
  const headlines = [
    { text: 'Reliance Industries beats Q3 estimates with strong Jio growth', pos: 0.72, neg: 0.08, neu: 0.20 },
    { text: 'HDFC Bank NPA rises to 1.4%, concerns over asset quality', pos: 0.10, neg: 0.65, neu: 0.25 },
    { text: 'TCS declares interim dividend of Rs 9 per share', pos: 0.45, neg: 0.05, neu: 0.50 },
    { text: 'SEBI bans promoter group for insider trading in NDTV shares', pos: 0.03, neg: 0.82, neu: 0.15 },
    { text: 'Infosys revises guidance upward for FY24 revenue growth', pos: 0.68, neg: 0.07, neu: 0.25 },
    { text: 'RBI keeps repo rate unchanged at 6.50% in December policy', pos: 0.20, neg: 0.15, neu: 0.65 }
  ]

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Score sentiment of Indian financial headlines using simulate
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Score sentiment of Indian financial headlines using simulated FinBERT output.
      </p>
      <div className="mb-4 flex flex-wrap gap-2">
        {headlines.map((h, i) => (
          <button key={i} onClick={() => { setHeadline(h.text); setSentiment({ positive: h.pos, negative: h.neg, neutral: h.neu }) }}
            className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs text-left text-gray-700 hover:bg-indigo-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-indigo-900/30">
            {h.text.substring(0, 50)}...
          </button>
        ))}
      </div>
      <div className="mb-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{headline}</div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-green-50 p-3 text-center dark:bg-green-900/30">
          <div className="text-xs text-green-600 dark:text-green-400">Positive</div>
          <div className="text-xl font-bold text-green-800 dark:text-green-200">{(sentiment.positive * 100).toFixed(0)}%</div>
          <div className="mt-1 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
            <div className="h-2 rounded-full bg-green-500" style={{ width: (sentiment.positive * 100) + '%' }} />
          </div>
        </div>
        <div className="rounded-lg bg-red-50 p-3 text-center dark:bg-red-900/30">
          <div className="text-xs text-red-600 dark:text-red-400">Negative</div>
          <div className="text-xl font-bold text-red-800 dark:text-red-200">{(sentiment.negative * 100).toFixed(0)}%</div>
          <div className="mt-1 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
            <div className="h-2 rounded-full bg-red-500" style={{ width: (sentiment.negative * 100) + '%' }} />
          </div>
        </div>
        <div className="rounded-lg bg-gray-100 p-3 text-center dark:bg-gray-800/50">
          <div className="text-xs text-gray-600 dark:text-gray-400">Neutral</div>
          <div className="text-xl font-bold text-gray-800 dark:text-gray-200">{(sentiment.neutral * 100).toFixed(0)}%</div>
          <div className="mt-1 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
            <div className="h-2 rounded-full bg-gray-500" style={{ width: (sentiment.neutral * 100) + '%' }} />
          </div>
        </div>
      </div>
    </div>
  )
}


export default function SentimentModels() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        FinBERT for Indian Financial Text
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        This section covers finbert for indian financial text with applications to Indian financial markets,
        including NSE/BSE listed companies, SEBI regulations, and India-specific data patterns.
        We explore both theoretical foundations and practical implementations using real
        Indian market examples and data from platforms like Zerodha and NSE.
      </p>

      <DefinitionBlock
        title="FinBERT Sentiment Model"
        label="Definition 15.5"
        definition="FinBERT is a BERT-based language model pre-trained on financial text corpora. It classifies text into positive, negative, or neutral sentiment. For Indian markets, FinBERT must be fine-tuned on Indian financial text (BSE/NSE filings, Economic Times, Moneycontrol) to handle India-specific terminology and sentiment patterns."
        notation="P(sentiment|text) = softmax(W · h_[CLS] + b), where h_[CLS] is the BERT pooled output."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Mathematical Foundation
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The core mathematical framework underpinning this approach:
      </p>

      <BlockMath math="P(y=k|x) = \frac{\exp(w_k^\top h_{[CLS]} + b_k)}{\sum_{j=1}^3 \exp(w_j^\top h_{[CLS]} + b_j)}, \quad k \in \{\text{pos, neg, neu}\}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The derived signal for trading applications:
      </p>

      <BlockMath math="\text{Sentiment Score} = P(\text{pos}|x) - P(\text{neg}|x) \in [-1, 1]" />

      <TheoremBlock
        title="Sentiment-Return Predictability"
        label="Theorem 15.5"
        statement="For Indian mid-cap stocks (Nifty Midcap 150), aggregate daily sentiment from financial news has predictive power for next-day returns with IC ≈ 0.03-0.05. The effect is stronger for stocks with lower analyst coverage, as information is incorporated more slowly into prices."
        proof="Consider the information incorporation model: P_t = P_{t-1} + δ·I_t + ε_t, where I_t is news information and δ is the speed of incorporation. For stocks with N analysts, δ ∝ N^{1/2} (Kyle, 1985). Mid-cap Indian stocks typically have N < 10 analysts vs N > 30 for large-caps, resulting in slower information incorporation and higher sentiment-based predictability. Empirically, IC for Nifty Midcap 150 sentiment signals is 2-3x higher than for Nifty 50."
      />

      <InteractiveSentimentScorer />

      <PythonCode
        title="finbert_indian_sentiment.py"
        runnable
        code={`import numpy as np
from typing import List, Dict, Tuple

class IndianFinBERTSentiment:
    """
    Simulated FinBERT sentiment model fine-tuned for Indian financial text.
    In production, use transformers library with ProsusAI/finbert.
    """
    def __init__(self):
        # Sentiment lexicon for Indian financial text
        self.positive_words = {
            'beat', 'exceeded', 'surged', 'improved', 'growth', 'upgraded',
            'outperformed', 'robust', 'strong', 'expansion', 'profit',
            'dividend', 'buyback', 'record', 'bullish', 'momentum',
            'accumulate', 'overweight', 'raised', 'bonus', 'split'
        }
        self.negative_words = {
            'missed', 'declined', 'fell', 'deteriorated', 'downgraded',
            'underperformed', 'weak', 'contraction', 'loss', 'penalty',
            'fraud', 'default', 'npa', 'bearish', 'sell', 'cut',
            'underweight', 'reduced', 'warning', 'violation', 'ban'
        }
        self.amplifiers = {'significantly', 'sharply', 'substantially', 'massive', 'huge'}
        self.negators = {'not', 'no', 'never', 'without', 'despite', 'unlikely'}

    def predict(self, text: str) -> Dict[str, float]:
        """Predict sentiment scores (simulated FinBERT)."""
        words = text.lower().split()
        pos_score = 0
        neg_score = 0
        amplifier = 1.0
        negate = False

        for i, word in enumerate(words):
            if word in self.amplifiers:
                amplifier = 1.5
                continue
            if word in self.negators:
                negate = True
                continue

            if word in self.positive_words:
                if negate:
                    neg_score += 1 * amplifier
                else:
                    pos_score += 1 * amplifier
            elif word in self.negative_words:
                if negate:
                    pos_score += 1 * amplifier
                else:
                    neg_score += 1 * amplifier

            amplifier = 1.0
            negate = False

        total = pos_score + neg_score + 1
        positive = pos_score / total
        negative = neg_score / total
        neutral = 1 / total

        # Normalize
        s = positive + negative + neutral
        return {
            'positive': positive / s,
            'negative': negative / s,
            'neutral': neutral / s,
            'score': (positive - negative) / s
        }

    def analyze_batch(self, texts: List[str]) -> Dict:
        """Analyze batch of texts and return aggregate sentiment."""
        results = [self.predict(t) for t in texts]
        avg_score = np.mean([r['score'] for r in results])
        return {
            'individual': results,
            'avg_score': avg_score,
            'bullish_pct': sum(1 for r in results if r['score'] > 0.1) / len(results),
            'bearish_pct': sum(1 for r in results if r['score'] < -0.1) / len(results)
        }


class SentimentTradingSignal:
    """Convert sentiment scores to trading signals for NSE stocks."""
    def __init__(self, lookback=5, threshold=0.15):
        self.lookback = lookback
        self.threshold = threshold
        self.history = {}

    def update(self, stock: str, sentiment_score: float, date: str):
        if stock not in self.history:
            self.history[stock] = []
        self.history[stock].append({'date': date, 'score': sentiment_score})

    def get_signal(self, stock: str) -> Dict:
        if stock not in self.history or len(self.history[stock]) < self.lookback:
            return {'signal': 'neutral', 'strength': 0}

        recent = [h['score'] for h in self.history[stock][-self.lookback:]]
        avg = np.mean(recent)
        trend = recent[-1] - recent[0]

        if avg > self.threshold and trend > 0:
            return {'signal': 'bullish', 'strength': min(avg, 1.0)}
        elif avg < -self.threshold and trend < 0:
            return {'signal': 'bearish', 'strength': min(abs(avg), 1.0)}
        return {'signal': 'neutral', 'strength': abs(avg)}


# Demo
model = IndianFinBERTSentiment()
signal_gen = SentimentTradingSignal()

headlines = [
    ("RELIANCE", "Reliance Industries Q3 profit beats estimates, Jio adds 10M subscribers"),
    ("HDFCBANK", "HDFC Bank NPA ratio rises to 1.4%, asset quality concerns mount"),
    ("TCS", "TCS wins mega deal worth $2 billion from European bank"),
    ("INFY", "Infosys revises FY24 guidance upward, strong demand in BFSI"),
    ("ICICIBANK", "ICICI Bank reports record quarterly profit, NIM expands 15bps"),
    ("TATAMOTORS", "Tata Motors EV sales surge 65% YoY, JLR margins improve"),
    ("SBIN", "SBI asset quality deteriorates, GNPA rises despite strong topline"),
    ("WIPRO", "Wipro Q3 revenue declines 1.7% QoQ, weak guidance for Q4"),
]

print("FinBERT Sentiment Analysis - Indian Market Headlines")
print(f"{'='*70}")

for stock, headline in headlines:
    result = model.predict(headline)
    signal_gen.update(stock, result['score'], '2024-01-15')

    emoji = '+' if result['score'] > 0.1 else '-' if result['score'] < -0.1 else '~'
    print(f"[{emoji}] {stock:12s} | Score: {result['score']:+.3f} | "
          f"P:{result['positive']:.2f} N:{result['negative']:.2f} | "
          f"{headline[:50]}...")

print(f"\n{'='*70}")
print("Aggregate Market Sentiment:")
batch = model.analyze_batch([h[1] for h in headlines])
print(f"  Average score: {batch['avg_score']:+.3f}")
print(f"  Bullish headlines: {batch['bullish_pct']:.0%}")
print(f"  Bearish headlines: {batch['bearish_pct']:.0%}")
print(f"  Market signal: {'BULLISH' if batch['avg_score'] > 0.05 else 'BEARISH' if batch['avg_score'] < -0.05 else 'NEUTRAL'}")`}
      />

      <ExampleBlock
        title="FinBERT vs Lexicon for RBI Policy"
        difficulty="intermediate"
        problem="Compare FinBERT and lexicon-based sentiment for: 'RBI maintains status quo on repo rate at 6.50%, stance remains withdrawal of accommodation.' What is the correct financial sentiment?"
        solution={[
          {
            step: 'Lexicon-based analysis',
            formula: '\text{score}_{\text{lex}} = \frac{|\text{pos\_words}| - |\text{neg\_words}|}{|\text{total\_words}|} = \frac{1 - 1}{20} = 0',
            explanation: 'Lexicon approach finds 'maintains' (neutral/positive) and 'withdrawal' (negative), yielding near-zero sentiment. But this misses the financial meaning.',
          },
          {
            step: 'FinBERT contextual analysis',
            formula: 'P(\text{hawkish}|\text{text}) = 0.65, \quad P(\text{dovish}) = 0.15',
            explanation: 'FinBERT understands that 'withdrawal of accommodation' is hawkish (tightening) which is negative for rate-sensitive stocks (HDFCBANK, BAJFINANCE) but neutral-to-positive for banks with high CASA ratios.',
          },
          {
            step: 'Trading signal',
            formula: 'w_{\text{bank}} = -0.3 \times P(\text{hawkish}) = -0.20',
            explanation: 'Underweight rate-sensitive banking stocks. The key insight is that FinBERT trained on RBI statements captures the nuance that lexicon methods miss.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          FinBERT for Indian markets requires fine-tuning on: (1) BSE/NSE corporate filings (XBRL format), (2) RBI monetary policy statements and minutes, (3) SEBI circulars and enforcement orders, (4) Indian financial news (Economic Times, Moneycontrol, LiveMint), (5) earnings call transcripts from Indian companies. The base FinBERT model (ProsusAI/finbert) performs reasonably but misses India-specific sentiment patterns around monsoon, festival season, and budget announcements.
        </p>
      </NoteBlock>
    </div>
  )
}
