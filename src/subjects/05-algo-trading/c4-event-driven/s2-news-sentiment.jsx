import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveSentiment() {
  const [sentimentWindow, setSentimentWindow] = useState(5)
  const [threshold, setThreshold] = useState(0.3)

  const events = [
    { day: 1, headline: 'RBI holds repo rate steady at 6.5%', sentiment: 0.1, stock: 'Bank Nifty' },
    { day: 3, headline: 'TCS wins $2B deal with US bank', sentiment: 0.8, stock: 'TCS' },
    { day: 5, headline: 'SEBI tightens F&O margin rules', sentiment: -0.6, stock: 'Nifty' },
    { day: 8, headline: 'Reliance announces JioFinance launch', sentiment: 0.7, stock: 'Reliance' },
    { day: 10, headline: 'Adani Group faces credit downgrade', sentiment: -0.9, stock: 'Adani Ent' },
    { day: 12, headline: 'India GDP growth at 7.8% beats estimates', sentiment: 0.6, stock: 'Nifty' },
    { day: 15, headline: 'Infosys CFO resigns unexpectedly', sentiment: -0.7, stock: 'Infosys' },
    { day: 18, headline: 'Crude oil falls below $70/barrel', sentiment: 0.4, stock: 'ONGC' },
  ]

  const tradeable = events.filter(e => Math.abs(e.sentiment) >= threshold)
  const chartW = 500
  const chartH = 150

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: News Sentiment Trading Signals
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust sentiment threshold to filter actionable news events for Indian stocks.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Sentiment Threshold: {threshold.toFixed(1)}</span>
          <input type="range" min="0.1" max="0.8" step="0.1" value={threshold}
            onChange={e => setThreshold(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Holding Window: {sentimentWindow} days</span>
          <input type="range" min="1" max="20" step="1" value={sentimentWindow}
            onChange={e => setSentimentWindow(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full max-w-2xl mx-auto block">
        <line x1="0" y1={chartH / 2} x2={chartW} y2={chartH / 2} stroke="#e5e7eb" strokeWidth="1" />
        <line x1="0" y1={chartH / 2 - threshold * (chartH / 2)} x2={chartW} y2={chartH / 2 - threshold * (chartH / 2)} stroke="#22c55e" strokeWidth="0.5" strokeDasharray="3" />
        <line x1="0" y1={chartH / 2 + threshold * (chartH / 2)} x2={chartW} y2={chartH / 2 + threshold * (chartH / 2)} stroke="#ef4444" strokeWidth="0.5" strokeDasharray="3" />
        {events.map((e, i) => {
          const x = (e.day / 20) * chartW
          const y = chartH / 2 - e.sentiment * (chartH / 2)
          const isTraded = Math.abs(e.sentiment) >= threshold
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={isTraded ? 6 : 3}
                fill={e.sentiment > 0 ? '#22c55e' : '#ef4444'}
                opacity={isTraded ? 1 : 0.3}
                stroke={isTraded ? '#1f2937' : 'none'} strokeWidth="1" />
              {isTraded && (
                <text x={x} y={y - 10} textAnchor="middle" className="text-[7px]" fill="#374151">
                  {e.stock}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      <div className="mt-3 space-y-1">
        {tradeable.map((e, i) => (
          <div key={i} className={`flex items-center gap-2 text-xs p-1 rounded ${e.sentiment > 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
            <span className={`font-bold ${e.sentiment > 0 ? 'text-green-600' : 'text-red-500'}`}>
              {e.sentiment > 0 ? 'BUY' : 'SELL'}
            </span>
            <span className="text-gray-700 dark:text-gray-300">{e.stock}</span>
            <span className="text-gray-500 flex-1 truncate">{e.headline}</span>
            <span className="font-mono">{e.sentiment.toFixed(1)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function NewsSentiment() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        News-Driven Trading on Indian Corporate Events
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        News sentiment analysis uses Natural Language Processing (NLP) to extract trading signals
        from text data -- corporate announcements, financial news, regulatory filings, and social
        media. In the Indian market, key news sources include BSE/NSE corporate filings, SEBI
        circulars, RBI announcements, and financial news from Economic Times, Moneycontrol, and
        LiveMint. The speed and accuracy of sentiment extraction determine trading profitability.
      </p>

      <DefinitionBlock
        title="Sentiment Score"
        label="Definition 5.11"
        definition="A sentiment score quantifies the positive or negative tone of a text document on a scale, typically [-1, +1]. For financial news, the score reflects the expected price impact of the information. A score of +1 indicates extremely positive news (e.g., major contract win), while -1 indicates extremely negative news (e.g., fraud discovery)."
        notation={<>Aggregate sentiment: <InlineMath math="S_t = \frac{1}{N_t}\sum_{j=1}^{N_t} s_j \cdot w_j" /> where <InlineMath math="s_j" /> is the sentiment of article <InlineMath math="j" />, <InlineMath math="w_j" /> is its relevance weight, and <InlineMath math="N_t" /> is the number of articles at time <InlineMath math="t" />.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        NLP Pipeline for Indian Financial News
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The typical sentiment analysis pipeline involves:
      </p>

      <BlockMath math="\text{Raw Text} \xrightarrow{\text{Preprocess}} \text{Tokens} \xrightarrow{\text{NLP Model}} \text{Sentiment } s \in [-1, 1] \xrightarrow{\text{Aggregate}} \text{Signal}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For Indian financial text, preprocessing must handle: (1) Hindi and English mixed content
        (code-switching), (2) Indian financial jargon (lakh, crore, NPA, FMCG), (3) BSE/NSE
        filing formats, and (4) regulatory language from SEBI/RBI circulars.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Event Categories in Indian Markets
      </h3>
      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Event Type</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Typical Impact</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Duration</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">RBI monetary policy</td>
              <td className="px-5 py-2">Bank Nifty +/- 2-5%</td>
              <td className="px-5 py-2">Same day</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Union Budget</td>
              <td className="px-5 py-2">Sector-specific 3-10%</td>
              <td className="px-5 py-2">1-5 days</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Management change</td>
              <td className="px-5 py-2">Stock-specific 2-8%</td>
              <td className="px-5 py-2">1-3 days</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Block deal / bulk deal</td>
              <td className="px-5 py-2">Stock-specific 1-5%</td>
              <td className="px-5 py-2">1-2 days</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">SEBI regulatory change</td>
              <td className="px-5 py-2">Sector-wide 1-3%</td>
              <td className="px-5 py-2">1-5 days</td>
            </tr>
            <tr>
              <td className="px-5 py-2">Promoter pledge change</td>
              <td className="px-5 py-2">Stock-specific 2-10%</td>
              <td className="px-5 py-2">1-7 days</td>
            </tr>
          </tbody>
        </table>
      </div>

      <TheoremBlock
        title="Information Content of News"
        label="Theorem 5.11"
        statement={<>The price impact of a news event is proportional to the surprise component of the information and inversely proportional to prior uncertainty: <BlockMath math="\Delta P = \frac{\sigma_{\text{prior}}^2}{\sigma_{\text{prior}}^2 + \sigma_{\text{noise}}^2} \times (\text{News Signal} - \text{Prior Expectation})" /> This is the Bayesian updating formula applied to financial prices. Events that are widely anticipated (like expected RBI rate holds) have minimal impact, while unexpected events (surprise rate cuts/hikes) have maximum impact.</>}
      />

      <InteractiveSentiment />

      <PythonCode
        title="news_sentiment_trading.py"
        runnable
        code={`import numpy as np

# News Sentiment Trading System for Indian Markets
np.random.seed(42)

# Simulated news events with sentiment scores
# In practice, use NLP models (FinBERT, GPT) on real news feeds
class IndianNewsEvent:
    def __init__(self, headline, sentiment, stock, category):
        self.headline = headline
        self.sentiment = sentiment  # [-1, 1]
        self.stock = stock
        self.category = category

# Sample events from Indian financial news
events = [
    IndianNewsEvent("RBI cuts repo rate by 25 bps to 6.25%", 0.7,
                    "Bank Nifty", "monetary_policy"),
    IndianNewsEvent("TCS bags USD 1.5 billion deal from UK insurer", 0.8,
                    "TCS", "corporate"),
    IndianNewsEvent("SEBI bans promoter from market for insider trading", -0.9,
                    "Target Stock", "regulatory"),
    IndianNewsEvent("India's CPI inflation rises to 6.2%", -0.5,
                    "Nifty", "macro"),
    IndianNewsEvent("Adani Group to invest INR 80,000 crore in green energy", 0.6,
                    "Adani Green", "corporate"),
    IndianNewsEvent("FII outflows reach INR 15,000 crore in October", -0.6,
                    "Nifty", "flow"),
    IndianNewsEvent("Government raises windfall tax on crude oil", -0.7,
                    "ONGC", "policy"),
    IndianNewsEvent("Reliance Jio adds 10 million subscribers in Q3", 0.5,
                    "Reliance", "corporate"),
    IndianNewsEvent("Banking sector NPAs decline to 3.9%", 0.6,
                    "Bank Nifty", "sector"),
    IndianNewsEvent("Rupee hits all-time low against dollar at 84.5", -0.4,
                    "IT Sector", "macro"),
]

# Sentiment Aggregation and Signal Generation
print("=== News Sentiment Analysis: Indian Markets ===\\n")
print(f"{'Headline':<55} {'Sentiment':<12} {'Stock':<15} {'Signal':<8}")
print("-" * 92)

signals = []
for event in events:
    signal = "BUY" if event.sentiment > 0.3 else ("SELL" if event.sentiment < -0.3 else "HOLD")
    signals.append(signal)
    truncated = event.headline[:52] + "..." if len(event.headline) > 55 else event.headline
    print(f"{truncated:<55} {event.sentiment:>8.1f}    {event.stock:<15} {signal:<8}")

# Sentiment decay model
print(f"\\n=== Sentiment Decay Model ===")
half_lives = {
    'monetary_policy': 5,   # days
    'corporate': 15,
    'regulatory': 10,
    'macro': 7,
    'flow': 3,
    'sector': 10,
    'policy': 8,
}

for category, hl in half_lives.items():
    decay_rate = np.log(2) / hl
    print(f"{category:<20} Half-life: {hl:>3} days, "
          f"Decay rate: {decay_rate:.4f}")

# Backtesting sentiment strategy
print(f"\\n=== Sentiment Strategy Backtest ===")
n_days = 504
daily_sentiment = np.zeros(n_days)
daily_returns = np.random.randn(n_days) * 0.012  # Nifty daily returns

# Inject sentiment signals
signal_days = np.random.choice(n_days, 50, replace=False)
for day in signal_days:
    sent = np.random.randn() * 0.5
    daily_sentiment[day] = sent
    # Sentiment partially predicts next-day return
    if day + 1 < n_days:
        daily_returns[day + 1] += sent * 0.005  # 0.5% impact

# Trading strategy: position = sign(sentiment) * |sentiment|
positions = np.zeros(n_days)
strategy_returns = np.zeros(n_days)

for t in range(1, n_days):
    # Exponential decay of past sentiment
    decay = 0.9
    positions[t] = decay * positions[t-1] + daily_sentiment[t]
    positions[t] = np.clip(positions[t], -1, 1)  # Cap leverage
    strategy_returns[t] = positions[t-1] * daily_returns[t]

# Performance
ann_ret = np.mean(strategy_returns) * 252
ann_vol = np.std(strategy_returns) * np.sqrt(252)
sharpe = ann_ret / ann_vol if ann_vol > 0 else 0

print(f"Annual Return:     {ann_ret*100:.2f}%")
print(f"Annual Volatility: {ann_vol*100:.2f}%")
print(f"Sharpe Ratio:      {sharpe:.2f}")
print(f"Signal count:      {len(signal_days)}")
print(f"Avg position size: {np.mean(np.abs(positions[positions != 0])):.3f}")

# NLP Model comparison for Indian financial text
print(f"\\n=== NLP Model Comparison (Indian Financial Text) ===")
models = [
    ('Loughran-McDonald Dict', 0.58, '< 1 ms'),
    ('VADER (adapted)', 0.62, '< 1 ms'),
    ('FinBERT', 0.78, '~50 ms'),
    ('GPT-based (few-shot)', 0.85, '~500 ms'),
    ('Fine-tuned BERT (Indian)', 0.82, '~30 ms'),
]

print(f"{'Model':<30} {'Accuracy':<12} {'Latency':<12}")
for model, acc, lat in models:
    print(f"{model:<30} {acc*100:>6.0f}%     {lat:<12}")

# Data sources for Indian market news
print(f"\\n=== Indian Market News Data Sources ===")
sources = [
    ('BSE/NSE Corporate Filings', 'Official, structured', 'Free'),
    ('SEBI Circulars', 'Regulatory, high impact', 'Free'),
    ('Economic Times', 'Broad coverage', 'Subscription'),
    ('Moneycontrol', 'Real-time, retail focus', 'Free/Premium'),
    ('Bloomberg Terminal', 'Institutional grade', 'Expensive'),
    ('Twitter/X Financial', 'Fast, noisy', 'API costs'),
]
print(f"{'Source':<30} {'Characteristics':<25} {'Cost':<15}")
for source, char, cost in sources:
    print(f"{source:<30} {char:<25} {cost:<15}")`}
      />

      <ExampleBlock
        title="Sentiment-Based RBI Policy Trade"
        difficulty="intermediate"
        problem="RBI announces a surprise 25 bps rate cut. Your NLP model scores the announcement at +0.7 sentiment. Historical analysis shows Bank Nifty moves 1.5x the sentiment score on RBI events. Bank Nifty is at 48,000. Capital is INR 30 lakhs. How would you trade?"
        solution={[
          {
            step: 'Estimate expected move',
            formula: '\\Delta P = 1.5 \\times 0.7 \\times 48000 / 100 = 504 \\text{ points}',
            explanation: 'Historical coefficient of 1.5% per unit sentiment implies a ~504 point move.',
          },
          {
            step: 'Compute position size',
            formula: '\\text{Lots} = \\frac{30,00,000}{15 \\times 48,000} = 4.2 \\approx 4 \\text{ lots}',
            explanation: 'Bank Nifty lot size is 15 units. Buy 4 lots of Bank Nifty futures.',
          },
          {
            step: 'Set risk limits',
            formula: '\\text{Stop loss} = 48000 - 200 = 47800 \\text{ (max loss: INR 12,000)}',
            explanation: 'Set stop at 200 points below entry. Target profit: 4 * 15 * 504 = INR 30,240. Risk-reward ratio ~2.5:1.',
          },
        ]}
      />

      <NoteBlock title="SEBI Regulations on Algorithmic News Trading" type="warning">
        <p>
          SEBI's circular on algorithmic trading (2012, updated 2018) requires all algo orders
          to be tagged and approved by the exchange. Automated news-based trading systems must
          have adequate risk controls including order-level checks, position limits, and kill
          switches. The system must not trade on UPSI (Unpublished Price Sensitive Information).
          News from official BSE/NSE filings is considered public information and is fair game
          for algorithmic processing once disseminated through official channels.
        </p>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          News sentiment trading in Indian markets requires NLP models tuned for Indian financial
          language, fast ingestion of BSE/NSE filings and RBI announcements, and careful
          event-type-specific calibration. The most impactful events are RBI policy decisions,
          SEBI regulatory changes, and corporate earnings surprises. Use sentiment decay models
          to manage position aging, and always account for the bid-ask spread and impact cost
          when trading on short-lived sentiment signals.
        </p>
      </NoteBlock>
    </div>
  )
}
