import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveDataSources() {
  const [granularity, setGranularity] = useState('1m')
  const [numPairs, setNumPairs] = useState(50)
  const [numExchanges, setNumExchanges] = useState(5)
  const [historyDays, setHistoryDays] = useState(365)

  const barsPerDay = { '1s': 86400, '1m': 1440, '5m': 288, '1h': 24, '1d': 1 }
  const bars = barsPerDay[granularity]
  const totalRows = bars * numPairs * numExchanges * historyDays
  const storageMB = totalRows * 48 / (1024 * 1024)
  const apiCalls = numPairs * numExchanges * Math.ceil(historyDays / 7)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Crypto Data Requirements Calculator
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Estimate data volume and API requirements for a multi-exchange crypto research database.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Granularity: {granularity}</span>
          <select value={granularity}
            onChange={e => setGranularity(e.target.value)}
            className="rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
            <option value="1s">1 Second</option>
            <option value="1m">1 Minute</option>
            <option value="5m">5 Minutes</option>
            <option value="1h">1 Hour</option>
            <option value="1d">1 Day</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Trading Pairs: {numPairs}</span>
          <input type="range" min="5" max="500" step="5" value={numPairs}
            onChange={e => setNumPairs(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Exchanges: {numExchanges}</span>
          <input type="range" min="1" max="20" step="1" value={numExchanges}
            onChange={e => setNumExchanges(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>History: {historyDays} days</span>
          <input type="range" min="30" max="1825" step="30" value={historyDays}
            onChange={e => setHistoryDays(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 500 100" className="w-full max-w-lg mx-auto block" aria-label="Data volume">
        <rect x="50" y="10" width="400" height="30" rx="6" fill="#e5e7eb" />
        <rect x="50" y="10" width={Math.min(400, storageMB / 100)} height="30" rx="6"
          fill="#6366f1" opacity="0.7" />
        <text x="250" y="30" textAnchor="middle" className="text-[10px] font-semibold" fill="#1f2937">
          {storageMB < 1024 ? `${storageMB.toFixed(0)} MB` : `${(storageMB / 1024).toFixed(1)} GB`}
        </text>

        <text x="250" y="65" textAnchor="middle" className="text-[10px] fill-gray-600 dark:fill-gray-400">
          Total rows: {totalRows > 1e9 ? `${(totalRows / 1e9).toFixed(1)}B` : totalRows > 1e6 ? `${(totalRows / 1e6).toFixed(1)}M` : `${(totalRows / 1e3).toFixed(0)}K`}
          {' | '}API calls needed: {apiCalls > 1000 ? `${(apiCalls / 1000).toFixed(1)}K` : apiCalls}
        </text>
        <text x="250" y="85" textAnchor="middle" className="text-[9px] fill-gray-500">
          Est. download time (1 req/sec): {apiCalls > 3600 ? `${(apiCalls / 3600).toFixed(1)} hours` : `${(apiCalls / 60).toFixed(0)} min`}
        </text>
      </svg>
    </div>
  )
}

export default function CryptoData() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Cryptocurrency Data Sources and Infrastructure
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Crypto markets generate vast quantities of data across hundreds of exchanges,
        thousands of trading pairs, and multiple blockchains. Unlike traditional markets
        that close overnight, crypto data streams 24/7/365, creating unique data
        engineering challenges. For Indian quant researchers, accessing reliable crypto
        data requires understanding both global and domestic data providers.
      </p>

      <DefinitionBlock
        title="OHLCV Data"
        label="Definition 2.1"
        definition="OHLCV (Open, High, Low, Close, Volume) is the standard aggregated market data format for crypto, representing candlestick bars at various time intervals. Unlike traditional markets, crypto OHLCV is available at granularities down to 1-second intervals and is collected 24/7 without market closures."
        notation={<>A candle: <InlineMath math="C_t = (O_t, H_t, L_t, C_t, V_t, N_t)" /> where <InlineMath math="N_t" /> is the number of trades in the interval. The true range is <InlineMath math="\text{TR}_t = H_t - L_t" />.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Data Source Taxonomy
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Category</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Source</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Data Type</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Cost</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Exchange APIs</td>
              <td className="px-4 py-2">Binance, OKX, WazirX</td>
              <td className="px-4 py-2">OHLCV, Order Book, Trades</td>
              <td className="px-4 py-2">Free (rate-limited)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Aggregators</td>
              <td className="px-4 py-2">CoinGecko, CoinMarketCap</td>
              <td className="px-4 py-2">Prices, Market Cap, Volume</td>
              <td className="px-4 py-2">Free / Premium</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Professional</td>
              <td className="px-4 py-2">Kaiko, CryptoCompare</td>
              <td className="px-4 py-2">L2/L3, Cleaned Tick Data</td>
              <td className="px-4 py-2">$500--5000/mo</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">On-Chain</td>
              <td className="px-4 py-2">Dune, Nansen, Glassnode</td>
              <td className="px-4 py-2">Wallet flows, DeFi metrics</td>
              <td className="px-4 py-2">Free / Premium</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Indian Market</td>
              <td className="px-4 py-2">WazirX API, CoinSwitch</td>
              <td className="px-4 py-2">INR pairs, Indian volume</td>
              <td className="px-4 py-2">Free (limited)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <TheoremBlock
        title="Data Quality Challenges in Crypto"
        label="Observation 2.1"
        statement={<>Crypto market data suffers from systematic quality issues that differ from traditional markets: (1) Wash trading inflates volume by an estimated 50--80% on unregulated exchanges. (2) Exchange outages create data gaps during high-volatility periods. (3) Stablecoin depegs create artificial price dislocations. The true volume can be estimated as: <BlockMath math="V_{\text{true}} \approx V_{\text{reported}} \times (1 - \hat{w})" /> where <InlineMath math="\hat{w}" /> is the estimated wash trading fraction, detectable via Benford's law analysis on trade sizes.</>}
        proof={<>Applying Benford's law to the first digits of trade sizes: genuine trades follow the distribution <InlineMath math="P(d) = \log_{10}(1 + 1/d)" /> while wash trades show uniform or peaked distributions. Analysis of 100M trades across 20 exchanges reveals <InlineMath math="\hat{w} \in [0.3, 0.8]" /> for smaller exchanges, while major regulated exchanges (Coinbase, Binance) show <InlineMath math="\hat{w} < 0.1" />.</>}
      />

      <InteractiveDataSources />

      <PythonCode
        title="crypto_data_pipeline.py"
        runnable
        code={`import numpy as np
from datetime import datetime, timedelta
import json

class CryptoDataPipeline:
    """Data pipeline for crypto market research."""

    def __init__(self):
        self.data_store = {}

    def generate_ohlcv(self, symbol, start_price, n_bars, volatility=0.02):
        """Simulate realistic crypto OHLCV data."""
        np.random.seed(hash(symbol) % 2**31)
        bars = []
        price = start_price

        for i in range(n_bars):
            # Crypto-specific: higher vol, occasional large moves
            ret = np.random.normal(0, volatility)
            if np.random.random() < 0.02:  # 2% chance of large move
                ret += np.random.choice([-1, 1]) * np.random.uniform(0.03, 0.08)

            open_p = price
            close_p = price * (1 + ret)
            high_p = max(open_p, close_p) * (1 + abs(np.random.normal(0, volatility/2)))
            low_p = min(open_p, close_p) * (1 - abs(np.random.normal(0, volatility/2)))

            # Volume follows log-normal, correlated with abs return
            base_vol = np.random.lognormal(10, 1.5)
            vol = base_vol * (1 + 5 * abs(ret))
            n_trades = int(vol / (price * 0.01))

            bars.append({
                'timestamp': i,
                'open': round(open_p, 2),
                'high': round(high_p, 2),
                'low': round(low_p, 2),
                'close': round(close_p, 2),
                'volume': round(vol, 2),
                'trades': n_trades
            })
            price = close_p

        self.data_store[symbol] = bars
        return bars

    def detect_wash_trading(self, trade_sizes, n_bins=9):
        """Detect wash trading using Benford's law."""
        first_digits = []
        for size in trade_sizes:
            if size > 0:
                d = int(str(int(size))[0])
                if 1 <= d <= 9:
                    first_digits.append(d)

        observed = np.zeros(n_bins)
        for d in first_digits:
            observed[d - 1] += 1
        observed /= len(first_digits)

        # Benford expected distribution
        expected = np.array([np.log10(1 + 1/d) for d in range(1, 10)])

        # Chi-squared statistic
        chi_sq = np.sum((observed - expected)**2 / expected) * len(first_digits)
        # Higher chi_sq = more wash trading likely
        wash_score = min(1.0, chi_sq / 100)

        return {
            'observed': observed,
            'expected': expected,
            'chi_squared': chi_sq,
            'wash_trading_score': wash_score,
            'likely_wash_pct': wash_score * 100
        }

    def compute_quality_metrics(self, bars):
        """Assess data quality of OHLCV bars."""
        n = len(bars)
        gaps = 0
        anomalies = 0

        for i in range(1, n):
            # Check for gaps (missing bars)
            if bars[i]['timestamp'] - bars[i-1]['timestamp'] > 1:
                gaps += 1
            # Check for anomalous bars
            if bars[i]['high'] < bars[i]['low']:
                anomalies += 1
            if bars[i]['volume'] == 0:
                anomalies += 1

        closes = [b['close'] for b in bars]
        returns = np.diff(np.log(closes))

        return {
            'n_bars': n,
            'gaps': gaps,
            'anomalies': anomalies,
            'quality_score': 1 - (gaps + anomalies) / n,
            'ann_volatility': np.std(returns) * np.sqrt(365 * 24),  # 24/7 market
            'max_return': np.max(returns),
            'min_return': np.min(returns),
        }

# Build crypto research dataset
pipeline = CryptoDataPipeline()

symbols = {
    'BTC/USDT': 65000,
    'ETH/USDT': 3500,
    'SOL/USDT': 150,
    'BTC/INR': 5500000,
}

print("=" * 60)
print("CRYPTO DATA PIPELINE")
print("=" * 60)

for symbol, start_price in symbols.items():
    bars = pipeline.generate_ohlcv(symbol, start_price, n_bars=1000)
    metrics = pipeline.compute_quality_metrics(bars)

    print(f"\\n{symbol}:")
    print(f"  Bars:       {metrics['n_bars']}")
    print(f"  Quality:    {metrics['quality_score']:.1%}")
    print(f"  Ann Vol:    {metrics['ann_volatility']:.1%}")
    print(f"  Max Return: {metrics['max_return']:.2%}")
    print(f"  Min Return: {metrics['min_return']:.2%}")

# Wash trading detection
np.random.seed(42)
genuine_trades = np.random.lognormal(5, 2, 5000)
wash_trades = np.random.uniform(100, 200, 5000)  # Suspicious uniform sizes

print(f"\\n--- Wash Trading Detection ---")
for name, trades in [("Genuine Exchange", genuine_trades), ("Suspect Exchange", wash_trades)]:
    result = pipeline.detect_wash_trading(trades)
    print(f"\\n  {name}:")
    print(f"    Chi-squared:      {result['chi_squared']:.1f}")
    print(f"    Wash score:       {result['wash_trading_score']:.2f}")
    print(f"    Est. wash %:      {result['likely_wash_pct']:.0f}%")`}
      />

      <ExampleBlock
        title="Building a BTC/INR Data Pipeline"
        difficulty="beginner"
        problem="You want to collect 1-minute OHLCV data for BTC/INR from WazirX for the past 365 days. The API returns max 500 candles per request with a rate limit of 10 requests per minute. How many API calls are needed and how long will the download take?"
        solution={[
          {
            step: 'Total candles needed',
            formula: '365 \\times 24 \\times 60 = 525{,}600 \\text{ candles}',
            explanation: 'Crypto markets run 24/7, so we need all 1440 candles per day.',
          },
          {
            step: 'API calls required',
            formula: '\\lceil 525{,}600 / 500 \\rceil = 1{,}052 \\text{ calls}',
          },
          {
            step: 'Download time at rate limit',
            formula: '1{,}052 / 10 = 105.2 \\text{ minutes} \\approx 1.75 \\text{ hours}',
          },
          {
            step: 'Storage estimate',
            formula: '525{,}600 \\times 48 \\text{ bytes} = 25.2 \\text{ MB (raw)}',
            explanation: 'Very manageable size. In Parquet format, this compresses to ~3 MB.',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Further Reading and Resources
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For deeper exploration of the concepts covered in this section, consider
        the following resources and research directions. The intersection of
        quantitative methods with Indian market specifics offers rich opportunities
        for both academic research and practical strategy development.
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Resource</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Type</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Relevance</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">NSE Research Papers</td>
              <td className="px-4 py-2">Academic</td>
              <td className="px-4 py-2">Indian market empirics</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">SEBI Discussion Papers</td>
              <td className="px-4 py-2">Regulatory</td>
              <td className="px-4 py-2">Market structure rules</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">RBI Working Papers</td>
              <td className="px-4 py-2">Policy</td>
              <td className="px-4 py-2">Macro-financial linkages</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">CMIE ProwessIQ</td>
              <td className="px-4 py-2">Data</td>
              <td className="px-4 py-2">Indian corporate financials</td>
            </tr>
            <tr>
              <td className="px-4 py-2">IIM/ISB Research</td>
              <td className="px-4 py-2">Academic</td>
              <td className="px-4 py-2">Indian finance research</td>
            </tr>
          </tbody>
        </table>
      </div>

      <NoteBlock title="Implementation Notes" type="historical">
        <p>
          When implementing these concepts for Indian markets, remember to account for
          the T+1 settlement cycle (since January 2023), the pre-open auction session
          mechanics (9:00--9:15 AM IST), and SEBI's regulatory requirements for
          algorithmic trading including the mandatory algo order tagging and
          order-to-trade ratio limits. Testing strategies on historical NSE data
          should use adjusted prices that account for corporate actions (splits,
          bonuses, dividends) which are frequent among Indian listed companies.
        </p>
      </NoteBlock>



      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Crypto data infrastructure requires handling 24/7 data streams, multiple
          exchange sources with varying quality, and unique challenges like wash
          trading detection. For Indian quant researchers, combining global exchange
          data (Binance, OKX) with Indian exchange data (WazirX, CoinDCX) enables
          cross-exchange analysis including INR premium tracking. Always validate
          data quality using Benford's law and anomaly detection before backtesting.
        </p>
      </NoteBlock>
    </div>
  )
}
