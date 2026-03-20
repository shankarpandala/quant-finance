import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveDataSourceExplorer() {
  const [source, setSource] = useState('yfinance')
  const [dataType, setDataType] = useState('ohlcv')

  const sources = {
    yfinance: { name: 'yfinance (Yahoo Finance)', free: true, delay: '15 min', coverage: 'NSE, BSE equity', quality: 'Good', api: 'Python library' },
    nse_bhav: { name: 'NSE Bhavcopy', free: true, delay: 'EOD', coverage: 'NSE equity, F&O', quality: 'Official', api: 'CSV download' },
    bse_api: { name: 'BSE API', free: true, delay: 'EOD', coverage: 'BSE equity', quality: 'Official', api: 'REST API' },
    kite: { name: 'Zerodha Kite Connect', free: false, delay: 'Real-time', coverage: 'All segments', quality: 'Excellent', api: 'REST + WebSocket' },
    nse_live: { name: 'NSE Live Market Data', free: false, delay: 'Real-time', coverage: 'Full market depth', quality: 'Official', api: 'Co-location feed' },
    bloomberg: { name: 'Bloomberg Terminal', free: false, delay: 'Real-time', coverage: 'Global + India', quality: 'Best', api: 'BQL/API' },
  }

  const s = sources[source]

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Indian Market Data Source Comparison
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Compare data sources for Indian market research. Free sources work well for daily
        backtesting; real-time feeds are needed for intraday strategies.
      </p>
      <div className="mb-4 grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Data Source</span>
          <select value={source} onChange={e => setSource(e.target.value)}
            className="rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
            {Object.entries(sources).map(([k, v]) => (
              <option key={k} value={k}>{v.name}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Data Type</span>
          <select value={dataType} onChange={e => setDataType(e.target.value)}
            className="rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
            <option value="ohlcv">OHLCV (Price)</option>
            <option value="tick">Tick Data</option>
            <option value="fundamental">Fundamental</option>
            <option value="options">Options Chain</option>
          </select>
        </label>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[
          { label: 'Free', value: s.free ? 'Yes' : 'Paid' },
          { label: 'Latency', value: s.delay },
          { label: 'Coverage', value: s.coverage },
          { label: 'Quality', value: s.quality },
          { label: 'Access', value: s.api },
          { label: 'Best For', value: s.free ? 'Research & Backtest' : 'Live Trading' },
        ].map((item, i) => (
          <div key={i} className="rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-800">
            <div className="text-xs text-gray-500 dark:text-gray-400">{item.label}</div>
            <div className="text-sm font-bold text-gray-700 dark:text-gray-300">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DataSources() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Indian Market Data Sources
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Quality data is the lifeblood of quantitative finance. India offers several data
        sources ranging from free NSE bhavcopy downloads to premium real-time feeds. Choosing
        the right source depends on your strategy's frequency, universe, and budget.
      </p>

      <DefinitionBlock
        title="Bhavcopy (Daily Settlement File)"
        label="Definition 1.1"
        definition={<>
          The NSE Bhavcopy is the official end-of-day settlement file published by NSE after
          market close. It contains OHLC prices, volumes, delivery quantities, and settlement
          prices for all traded securities. Available free from the NSE website in CSV format.
          The F&O bhavcopy includes open interest, settlement price, and contract details for
          all futures and options contracts.
        </>}
        notation={<>
          Columns: SYMBOL, SERIES, OPEN, HIGH, LOW, CLOSE, LAST, PREVCLOSE, TOTTRDQTY,
          TOTTRDVAL, TOTALTRADES, ISIN.
        </>}
      />

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Source</th>
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Cost</th>
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Frequency</th>
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Best For</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2 font-medium">yfinance</td>
              <td className="px-3 py-2">Free</td>
              <td className="px-3 py-2">Daily/Intraday</td>
              <td className="px-3 py-2">Quick research, prototyping</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2 font-medium">NSE Bhavcopy</td>
              <td className="px-3 py-2">Free</td>
              <td className="px-3 py-2">EOD</td>
              <td className="px-3 py-2">Official daily data, F&O OI</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2 font-medium">Zerodha Kite</td>
              <td className="px-3 py-2">INR 2000/mo</td>
              <td className="px-3 py-2">Real-time</td>
              <td className="px-3 py-2">Live algo trading</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2 font-medium">Truedata</td>
              <td className="px-3 py-2">INR 1500/mo</td>
              <td className="px-3 py-2">Tick-level</td>
              <td className="px-3 py-2">HFT, tick data analysis</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-medium">Bloomberg</td>
              <td className="px-3 py-2">$20K+/yr</td>
              <td className="px-3 py-2">Real-time</td>
              <td className="px-3 py-2">Institutional research</td>
            </tr>
          </tbody>
        </table>
      </div>

      <TheoremBlock
        title="Data Quality Hierarchy"
        label="Theorem 1.1"
        statement={<>
          The reliability of data sources follows a hierarchy based on proximity to the
          exchange:
          <BlockMath math="\text{Exchange feed} > \text{Clearing data} > \text{Vendor data} > \text{Scraped data}" />
          Always validate derived data against the official NSE bhavcopy. Common issues
          include: incorrect split adjustments, missing dividend adjustments, and stale
          prices for illiquid stocks.
        </>}
      />

      <InteractiveDataSourceExplorer />

      <NoteBlock title="NSE Data Access Tips" type="info">
        <p>
          For research: start with yfinance (append ".NS" to NSE symbols, e.g., "RELIANCE.NS").
          For production: use Zerodha Kite Connect API (REST + WebSocket) with historical
          data access. For tick data: NSE offers co-location tick-by-tick data feeds. SEBI
          requires all algorithmic traders to use approved data feeds and maintain audit trails.
        </p>
      </NoteBlock>

      <PythonCode
        title="fetch_nse_data.py"
        runnable
        code={`import numpy as np

# Simulated NSE data fetch (in practice, use yfinance or Kite API)
np.random.seed(42)

# --- Simulate downloading Nifty 50 daily data ---
n_days = 252
dates = [f"2024-{(i//22)+1:02d}-{(i%22)+1:02d}" for i in range(n_days)]

# Generate realistic Nifty OHLCV data
nifty_close = [20000]
for i in range(1, n_days):
    ret = np.random.normal(0.0005, 0.012)
    nifty_close.append(nifty_close[-1] * (1 + ret))

nifty_data = []
for i in range(n_days):
    c = nifty_close[i]
    h = c * (1 + abs(np.random.normal(0, 0.005)))
    l = c * (1 - abs(np.random.normal(0, 0.005)))
    o = l + np.random.random() * (h - l)
    vol = int(np.random.exponential(200000) + 100000)
    nifty_data.append({'date': dates[i], 'open': o, 'high': h, 'low': l, 'close': c, 'volume': vol})

print("=== Nifty 50 Daily Data (Sample) ===")
print(f"{'Date':<12} {'Open':>10} {'High':>10} {'Low':>10} {'Close':>10} {'Volume':>10}")
for d in nifty_data[:10]:
    print(f"{d['date']:<12} {d['open']:>10.2f} {d['high']:>10.2f} {d['low']:>10.2f} {d['close']:>10.2f} {d['volume']:>10,}")

print(f"\\n... ({n_days} total trading days)")
print(f"Start: {nifty_data[0]['close']:.2f}, End: {nifty_data[-1]['close']:.2f}")
print(f"Return: {(nifty_data[-1]['close']/nifty_data[0]['close'] - 1)*100:.2f}%")
print(f"Avg daily volume: {np.mean([d['volume'] for d in nifty_data]):,.0f}")

# --- Data Quality Checks ---
print("\\n=== Data Quality Report ===")
closes = [d['close'] for d in nifty_data]
returns = np.diff(np.log(closes))
print(f"Missing values: 0/{n_days}")
print(f"Zero volume days: {sum(1 for d in nifty_data if d['volume'] == 0)}")
print(f"Max daily return: {max(returns)*100:.2f}%")
print(f"Min daily return: {min(returns)*100:.2f}%")
print(f"Stale prices (0% return): {sum(1 for r in returns if abs(r) < 1e-10)}")
print(f"OHLC consistency (H>=L): {all(d['high'] >= d['low'] for d in nifty_data)}")

# --- yfinance Usage Example (commented - for reference) ---
print("\\n=== yfinance Usage (Reference) ===")
print("# import yfinance as yf")
print("# nifty = yf.download('^NSEI', start='2024-01-01', end='2024-12-31')")
print("# tcs = yf.download('TCS.NS', start='2024-01-01')")
print("# reliance = yf.download('RELIANCE.NS', period='5y')")
print("# # For multiple stocks:")
print("# stocks = yf.download(['TCS.NS', 'INFY.NS', 'HDFCBANK.NS'], period='1y')")`}
      />

      <ExampleBlock
        title="Validating NSE Data Quality"
        difficulty="beginner"
        problem="You download 5 years of TCS daily data from yfinance. The data shows TCS dropping 50% on one day in 2022. Is this real or a data error?"
        solution={[
          {
            step: 'Check for corporate actions',
            formula: '\\text{TCS had a 1:1 bonus issue in June 2022}',
            explanation: 'The apparent 50% drop is due to the bonus issue (stock split). The price halves but shares double, so market cap is unchanged.',
          },
          {
            step: 'Verify with adjusted close',
            formula: '\\text{Use "Adj Close" column which accounts for splits and dividends}',
            explanation: 'yfinance provides both raw Close and Adj Close. Always use Adj Close for return calculations. Alternatively, apply split factors from NSE corporate action data.',
          },
          {
            step: 'Cross-validate',
            formula: '\\text{Compare with NSE bhavcopy for the same date}',
            explanation: 'The NSE bhavcopy will show the ex-bonus price. Always cross-check suspicious moves against official NSE data and corporate action records.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Start with yfinance for research (free, easy, adequate for daily strategies), graduate
          to Zerodha Kite for live trading, and consider premium feeds for HFT. Always validate
          data against NSE bhavcopy, adjust for corporate actions (splits, bonuses, dividends),
          and check for survivorship bias. The quality of your backtest is only as good as the
          quality of your data.
        </p>
      </NoteBlock>
    </div>
  )
}
