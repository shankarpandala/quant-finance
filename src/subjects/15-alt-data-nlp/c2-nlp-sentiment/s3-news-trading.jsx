import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveNewsSentiment() {
  const [headline, setHeadline] = useState('RBI holds repo rate steady at 6.5%, signals accommodative stance')
  const [sentimentScore, setSentimentScore] = useState(0.72)
  const [volatilityMultiplier, setVolatilityMultiplier] = useState(1.5)
  const [decayHalfLife, setDecayHalfLife] = useState(30)

  const signalStrength = sentimentScore * volatilityMultiplier
  const positionSize = Math.min(1.0, Math.abs(signalStrength))
  const direction = signalStrength > 0 ? 'LONG' : signalStrength < 0 ? 'SHORT' : 'FLAT'

  const decayValues = Array.from({ length: 8 }, (_, i) => {
    const minutes = i * 10
    return {
      minutes,
      strength: signalStrength * Math.exp(-0.693 * minutes / decayHalfLife)
    }
  })

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: News-Driven Trading Signal
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust sentiment score, volatility multiplier, and decay half-life to see how a
        news headline translates into a trading signal on NSE.
      </p>

      <div className="mb-4 space-y-3">
        <label className="block text-xs text-gray-600 dark:text-gray-400">
          <span className="font-semibold">Headline:</span>
          <input
            type="text" value={headline}
            onChange={e => setHeadline(e.target.value)}
            className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-1.5 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
          />
        </label>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
            <span>Sentiment <InlineMath math={`s = ${sentimentScore.toFixed(2)}`} /></span>
            <input type="range" min="-1" max="1" step="0.01" value={sentimentScore}
              onChange={e => setSentimentScore(parseFloat(e.target.value))}
              className="h-2 w-full cursor-pointer accent-indigo-500" />
          </label>
          <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
            <span>Vol Multiplier <InlineMath math={`\\sigma_m = ${volatilityMultiplier.toFixed(2)}`} /></span>
            <input type="range" min="0.5" max="3" step="0.1" value={volatilityMultiplier}
              onChange={e => setVolatilityMultiplier(parseFloat(e.target.value))}
              className="h-2 w-full cursor-pointer accent-indigo-500" />
          </label>
          <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
            <span>Decay Half-Life <InlineMath math={`t_{1/2} = ${decayHalfLife}`} /> min</span>
            <input type="range" min="5" max="120" step="5" value={decayHalfLife}
              onChange={e => setDecayHalfLife(parseFloat(e.target.value))}
              className="h-2 w-full cursor-pointer accent-indigo-500" />
          </label>
        </div>
      </div>

      <svg viewBox="0 0 500 200" className="w-full max-w-lg mx-auto block" aria-label="Signal decay chart">
        <rect x="50" y="10" width="430" height="170" fill="none" stroke="#e5e7eb" strokeWidth="1" />
        <text x="250" y="198" textAnchor="middle" className="text-[10px] fill-gray-500">Minutes after publication</text>
        <text x="15" y="95" textAnchor="middle" className="text-[10px] fill-gray-500" transform="rotate(-90,15,95)">Signal</text>
        {decayValues.map((d, i) => {
          const x = 60 + i * 55
          const barHeight = Math.abs(d.strength) * 120
          const yTop = 170 - barHeight
          const color = d.strength >= 0 ? '#4ade80' : '#f87171'
          return (
            <g key={i}>
              <rect x={x} y={yTop} width="30" height={barHeight} fill={color} opacity="0.7" rx="3" />
              <text x={x + 15} y="185" textAnchor="middle" className="text-[9px] fill-gray-500">{d.minutes}</text>
              <text x={x + 15} y={yTop - 4} textAnchor="middle" className="text-[8px] fill-gray-600 dark:fill-gray-400">
                {d.strength.toFixed(2)}
              </text>
            </g>
          )
        })}
      </svg>

      <div className="mt-3 flex justify-center gap-6 text-sm">
        <span className="text-gray-600 dark:text-gray-400">
          Signal: <span className={`font-bold ${direction === 'LONG' ? 'text-green-600' : direction === 'SHORT' ? 'text-red-500' : 'text-gray-500'}`}>
            {direction}
          </span>
        </span>
        <span className="text-gray-600 dark:text-gray-400">
          Position Size: <span className="font-semibold">{(positionSize * 100).toFixed(0)}%</span>
        </span>
      </div>
    </div>
  )
}

export default function NewsTrading() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        News-Based Trading Signals
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        News-based trading strategies in Indian markets leverage real-time information from
        sources such as CNBC-TV18, Moneycontrol, ET Now, and BSE/NSE corporate filings
        to generate alpha. The key challenge lies in converting unstructured text into a
        quantifiable trading signal before the market fully prices in the information.
      </p>

      <DefinitionBlock
        title="News Alpha"
        label="Definition 3.1"
        definition="News alpha is the excess return attributable to trading on information extracted from news articles before the market fully incorporates that information. It is measured as the abnormal return in the event window around a news publication timestamp."
        notation={<>Formally, <InlineMath math="\alpha_{\text{news}} = r_{\text{actual}} - r_{\text{expected}}" /> where expected return comes from a factor model such as the Fama-French India model.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Signal Construction Framework
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A news trading signal combines sentiment analysis with market microstructure considerations.
        The raw sentiment score is scaled by recent volatility and decayed over time as the
        information gets absorbed by the market.
      </p>

      <BlockMath math="S(t) = s_{\text{raw}} \cdot \sigma_m \cdot e^{-\lambda (t - t_0)}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="s_{\text{raw}} \in [-1, 1]" /> is the NLP sentiment score,{' '}
        <InlineMath math="\sigma_m" /> is the volatility multiplier (higher volatility regimes
        amplify the signal), <InlineMath math="\lambda = \ln(2) / t_{1/2}" /> is the decay
        constant, and <InlineMath math="t_0" /> is the publication timestamp.
      </p>

      <TheoremBlock
        title="Information Half-Life in Indian Markets"
        label="Empirical Finding 3.1"
        statement={<>For NIFTY 50 constituent stocks, the average information half-life for material news events (earnings surprises, RBI policy changes, SEBI regulations) is approximately <InlineMath math="t_{1/2} \approx 25\text{--}40" /> minutes during regular NSE trading hours (9:15 AM to 3:30 PM IST). For mid-cap and small-cap stocks on BSE, the half-life can extend to <InlineMath math="t_{1/2} \approx 2\text{--}4" /> hours due to lower liquidity.</>}
        proof={<>This is supported by event study analysis of abnormal returns around news publication timestamps. The cumulative abnormal return (CAR) follows: <BlockMath math="\text{CAR}(t_0, t_0 + \Delta t) = \sum_{\tau=t_0}^{t_0+\Delta t} (r_\tau - \hat{r}_\tau)" /> Empirical analysis of 10,000+ news events on NSE (2019--2024) shows that 50% of the total price adjustment occurs within the first 30 minutes for large-cap stocks.</>}
      />

      <InteractiveNewsSentiment />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Indian Market News Sources and Latency
      </h3>
      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Source</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Typical Latency</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Signal Quality</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Coverage</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">NSE/BSE Corporate Filings</td>
              <td className="px-4 py-2">Real-time</td>
              <td className="px-4 py-2">High</td>
              <td className="px-4 py-2">All listed companies</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">RBI Press Releases</td>
              <td className="px-4 py-2">Seconds</td>
              <td className="px-4 py-2">Very High</td>
              <td className="px-4 py-2">Macro / Banking</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">CNBC-TV18 / ET Now</td>
              <td className="px-4 py-2">Minutes</td>
              <td className="px-4 py-2">Medium</td>
              <td className="px-4 py-2">Large & Mid Cap</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Moneycontrol</td>
              <td className="px-4 py-2">1--5 min</td>
              <td className="px-4 py-2">Medium</td>
              <td className="px-4 py-2">Broad market</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Social Media (Twitter/X)</td>
              <td className="px-4 py-2">Variable</td>
              <td className="px-4 py-2">Low--High</td>
              <td className="px-4 py-2">Selective</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Event-Driven Signal Pipeline
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The pipeline for news-based trading on NSE involves ingestion, NLP processing,
        signal generation, risk filtering, and execution. The entire pipeline must operate
        within the information half-life to capture alpha.
      </p>

      <BlockMath math="\text{Position} = \text{sign}(S) \cdot \min\!\left(1, \frac{|S|}{\sigma_{\text{stock}}}\right) \cdot \text{MaxPosition}" />

      <PythonCode
        title="news_trading_signal.py"
        runnable
        code={`import numpy as np
from datetime import datetime, timedelta

class NewsSignalGenerator:
    """Generate trading signals from news sentiment for Indian markets."""

    def __init__(self, half_life_minutes=30, vol_lookback=20):
        self.half_life = half_life_minutes
        self.decay_lambda = np.log(2) / half_life_minutes
        self.vol_lookback = vol_lookback

    def compute_sentiment(self, headline: str) -> float:
        """Simplified rule-based sentiment for Indian market news."""
        positive_keywords = [
            'beats estimates', 'upgrade', 'bullish', 'rally',
            'rate cut', 'accommodative', 'outperform', 'buyback',
            'dividend', 'profit jumps', 'nifty high', 'fii buying'
        ]
        negative_keywords = [
            'misses estimates', 'downgrade', 'bearish', 'crash',
            'rate hike', 'hawkish', 'underperform', 'default',
            'scam', 'profit falls', 'fii selling', 'sebi penalty'
        ]
        text = headline.lower()
        pos = sum(1 for kw in positive_keywords if kw in text)
        neg = sum(1 for kw in negative_keywords if kw in text)
        total = pos + neg
        if total == 0:
            return 0.0
        return (pos - neg) / total

    def vol_multiplier(self, recent_returns):
        """Scale signal by recent volatility regime."""
        vol = np.std(recent_returns) * np.sqrt(252)
        median_vol = 0.25  # ~25% annualized vol typical for NIFTY
        return vol / median_vol

    def generate_signal(self, headline, minutes_since_pub, recent_returns):
        """Full signal pipeline."""
        sentiment = self.compute_sentiment(headline)
        vol_mult = self.vol_multiplier(recent_returns)
        decay = np.exp(-self.decay_lambda * minutes_since_pub)
        signal = sentiment * vol_mult * decay
        return {
            'sentiment': sentiment,
            'vol_multiplier': vol_mult,
            'decay_factor': decay,
            'signal': signal,
            'direction': 'LONG' if signal > 0.05 else 'SHORT' if signal < -0.05 else 'FLAT'
        }

# Simulate NIFTY 50 daily returns
np.random.seed(42)
nifty_returns = np.random.normal(0.0005, 0.012, 20)

generator = NewsSignalGenerator(half_life_minutes=30)

headlines = [
    ("HDFC Bank Q3 beats estimates, profit jumps 25% YoY", 5),
    ("RBI holds repo rate, hawkish tone on inflation", 15),
    ("SEBI penalty on Adani Group, FII selling accelerates", 45),
    ("TCS wins mega deal, upgrade from Goldman Sachs", 10),
]

print("=" * 70)
print("NEWS-BASED TRADING SIGNALS (NSE)")
print("=" * 70)
for headline, mins in headlines:
    result = generator.generate_signal(headline, mins, nifty_returns)
    print(f"\\nHeadline: {headline}")
    print(f"  Minutes since pub: {mins}")
    print(f"  Sentiment:    {result['sentiment']:+.3f}")
    print(f"  Vol Mult:     {result['vol_multiplier']:.3f}")
    print(f"  Decay:        {result['decay_factor']:.3f}")
    print(f"  Signal:       {result['signal']:+.4f}")
    print(f"  Direction:    {result['direction']}")`}
      />

      <ExampleBlock
        title="RBI Policy Day Trading Strategy"
        difficulty="intermediate"
        problem="On an RBI monetary policy day, the central bank announces a 25 bps rate cut (surprise, as consensus expected a hold). The sentiment score is $s = 0.85$, current NIFTY Bank implied volatility is 22% (vs. median 18%), and you're evaluating the signal 8 minutes after the announcement with a half-life of 25 minutes. Calculate the trading signal and recommended position."
        solution={[
          {
            step: 'Compute volatility multiplier',
            formula: '\\sigma_m = \\frac{0.22}{0.18} = 1.222',
            explanation: 'Current implied vol divided by the median vol gives the regime adjustment.',
          },
          {
            step: 'Compute decay factor',
            formula: '\\lambda = \\frac{\\ln 2}{25} = 0.02773, \\quad e^{-0.02773 \\times 8} = 0.8005',
            explanation: 'After 8 minutes, the signal retains about 80% of its initial strength.',
          },
          {
            step: 'Compute trading signal',
            formula: 'S = 0.85 \\times 1.222 \\times 0.8005 = 0.831',
            explanation: 'A strong bullish signal for NIFTY Bank futures.',
          },
          {
            step: 'Determine position',
            formula: '\\text{Position} = \\text{sign}(0.831) \\cdot \\min(1, |0.831|) \\cdot \\text{MaxPos} = 83.1\\% \\text{ of max LONG}',
            explanation: 'Go long NIFTY Bank futures at ~83% of maximum allocation.',
          },
        ]}
      />

      <NoteBlock title="Regulatory Considerations" type="warning">
        <p>
          News-based trading in India must comply with SEBI regulations on insider trading
          (PIT Regulations, 2015). Traders must ensure that their news sources are publicly
          available and that signals are derived from legitimately published information.
          The use of material non-public information (MNPI) from corporate insiders,
          board members, or pre-release data feeds is strictly prohibited under Indian
          securities law. SEBI has increased surveillance of algorithmic trading around
          major news events since the 2020 circular on algo trading.
        </p>
      </NoteBlock>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Challenges Specific to Indian Markets
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Indian market news trading faces unique challenges: multilingual news sources
        (Hindi, English, regional languages), the dominance of retail sentiment on
        platforms like Moneycontrol forums, and the pre-open session (9:00--9:15 AM)
        where order matching follows a different mechanism. Additionally, the T+1
        settlement cycle (introduced 2023) affects position management for
        delivery-based strategies.
      </p>

      <BlockMath math="\text{Sharpe}_{\text{news}} = \frac{\mathbb{E}[\alpha_{\text{news}}]}{\sigma(\alpha_{\text{news}})} \cdot \sqrt{N_{\text{trades/year}}}" />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Successful news trading in Indian markets requires sub-minute latency from
          news publication to signal generation, careful calibration of information
          half-lives across market-cap segments, and robust sentiment models trained
          on Indian financial language. The alpha from news signals decays rapidly,
          making execution speed and transaction cost management critical success factors.
        </p>
      </NoteBlock>
    </div>
  )
}
