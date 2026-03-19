import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveStorageCalculator() {
  const [numStocks, setNumStocks] = useState(200)
  const [ticksPerSecond, setTicksPerSecond] = useState(100)
  const [bytesPerTick, setBytesPerTick] = useState(64)
  const [retentionDays, setRetentionDays] = useState(252)

  const tradingSeconds = 6.25 * 3600
  const dailyTicksPerStock = ticksPerSecond * tradingSeconds
  const dailyTotalTicks = dailyTicksPerStock * numStocks
  const dailyStorageGB = (dailyTotalTicks * bytesPerTick) / (1024 ** 3)
  const totalStorageTB = (dailyStorageGB * retentionDays) / 1024
  const compressedTB = totalStorageTB * 0.15

  const formats = [
    { name: 'CSV (Raw)', ratio: 1.0, querySpeed: 'Slow' },
    { name: 'Parquet', ratio: 0.12, querySpeed: 'Fast' },
    { name: 'Arrow/Feather', ratio: 0.15, querySpeed: 'Very Fast' },
    { name: 'HDF5', ratio: 0.18, querySpeed: 'Fast' },
  ]

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: NSE Tick Data Storage Calculator
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Estimate storage requirements for tick-by-tick data from NSE based on
        universe size and data resolution.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Stocks: {numStocks}</span>
          <input type="range" min="50" max="2000" step="50" value={numStocks}
            onChange={e => setNumStocks(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Ticks/sec/stock: {ticksPerSecond}</span>
          <input type="range" min="1" max="500" step="10" value={ticksPerSecond}
            onChange={e => setTicksPerSecond(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Bytes/tick: {bytesPerTick}</span>
          <input type="range" min="32" max="256" step="8" value={bytesPerTick}
            onChange={e => setBytesPerTick(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Retention: {retentionDays} days</span>
          <input type="range" min="20" max="1260" step="20" value={retentionDays}
            onChange={e => setRetentionDays(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Metric</th>
              <th className="px-3 py-2 text-right text-gray-600 dark:text-gray-400">Value</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2">Daily ticks (total)</td>
              <td className="px-3 py-2 text-right font-mono">{(dailyTotalTicks / 1e6).toFixed(1)}M</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2">Daily raw storage</td>
              <td className="px-3 py-2 text-right font-mono">{dailyStorageGB.toFixed(1)} GB</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2">Total raw ({retentionDays} days)</td>
              <td className="px-3 py-2 text-right font-mono">{totalStorageTB.toFixed(2)} TB</td>
            </tr>
            <tr>
              <td className="px-3 py-2">Compressed (Parquet, ~85% ratio)</td>
              <td className="px-3 py-2 text-right font-mono font-semibold text-green-600">{compressedTB.toFixed(2)} TB</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex flex-wrap justify-center gap-3">
        {formats.map((f, i) => (
          <span key={i} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
            {f.name}: {(totalStorageTB * f.ratio).toFixed(2)} TB | {f.querySpeed}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function DataStorage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Tick Data Storage and Infrastructure
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Storing and processing tick-by-tick data from NSE is a fundamental
        infrastructure challenge for quantitative trading firms. With thousands of
        instruments generating millions of ticks per day, efficient storage, compression,
        and retrieval systems are essential for backtesting and real-time analytics.
      </p>

      <DefinitionBlock
        title="Tick Data"
        label="Definition 1.1"
        definition="Tick data is the most granular level of market data, recording every individual event in the order book: trades, order additions, modifications, and cancellations, each timestamped to microsecond or nanosecond precision. On NSE, tick data includes Level-1 (best bid/ask), Level-2 (top 5/20 levels), and Level-3 (full order-by-order) feeds."
        notation={<>A tick record: <InlineMath math="T_i = (t_i, \text{sym}_i, \text{type}_i, p_i, q_i, \text{side}_i, \text{oid}_i)" /> where <InlineMath math="t_i" /> is the exchange timestamp (nanosecond precision on NSE).</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        NSE Data Volume Estimates
      </h3>

      <BlockMath math="\text{Daily Volume} = N_{\text{stocks}} \times f_{\text{ticks/s}} \times T_{\text{session}} \times B_{\text{bytes/tick}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For NSE's equity segment alone, with approximately 2,000 actively traded
        stocks, average tick rates of 50--200 ticks/second for liquid names, and a
        6.25-hour trading session, daily raw data volumes reach 50--200 GB.
      </p>

      <TheoremBlock
        title="Optimal Storage Format Selection"
        label="Guideline 1.1"
        statement={<>For tick data workloads on NSE data, columnar formats (Parquet, Arrow) achieve 80--90% compression ratios while maintaining <InlineMath math="O(1)" /> column access and <InlineMath math="O(\log n)" /> range query performance. The optimal storage hierarchy is: <BlockMath math="\text{Hot (SSD):}\ t < 5\text{ days} \xrightarrow{\text{Parquet}} \text{Warm (HDD):}\ 5 < t < 90\text{ days} \xrightarrow{\text{Archive}} \text{Cold (S3):}\ t > 90\text{ days}" /></>}
        proof={<>Benchmarks on 1 year of NSE NIFTY 50 tick data (200M+ rows per stock) show: Parquet achieves 88% compression with predicate pushdown enabling sub-second range queries. CSV baseline requires 8x more storage with 10--50x slower queries. Partitioning by date + symbol reduces scan times by another 10--20x.</>}
      />

      <InteractiveStorageCalculator />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Schema Design for NSE Tick Data
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Field</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Type</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Bytes</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Description</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-mono">timestamp</td>
              <td className="px-4 py-2">int64 (ns)</td>
              <td className="px-4 py-2">8</td>
              <td className="px-4 py-2">Exchange timestamp</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-mono">symbol</td>
              <td className="px-4 py-2">uint16 (encoded)</td>
              <td className="px-4 py-2">2</td>
              <td className="px-4 py-2">NSE instrument token</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-mono">event_type</td>
              <td className="px-4 py-2">uint8</td>
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">Trade/Add/Modify/Cancel</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-mono">price</td>
              <td className="px-4 py-2">int32 (paise)</td>
              <td className="px-4 py-2">4</td>
              <td className="px-4 py-2">Price in paise (avoid float)</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 font-mono">quantity</td>
              <td className="px-4 py-2">int32</td>
              <td className="px-4 py-2">4</td>
              <td className="px-4 py-2">Order/trade quantity</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-mono">side</td>
              <td className="px-4 py-2">uint8</td>
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">Buy=1, Sell=2</td>
            </tr>
          </tbody>
        </table>
      </div>

      <PythonCode
        title="tick_data_storage.py"
        runnable
        code={`import numpy as np
from datetime import datetime, timedelta
import struct

class TickDataStore:
    """Efficient tick data storage for NSE market data."""

    def __init__(self):
        self.data = {}  # symbol -> list of ticks
        self.symbol_map = {}
        self.stats = {'total_ticks': 0, 'total_bytes': 0}

    def _encode_tick(self, timestamp_ns, symbol_id, event_type,
                     price_paise, quantity, side):
        """Pack tick into compact binary format (20 bytes)."""
        return struct.pack(
            '<qHBiIB',  # little-endian: int64, uint16, uint8, int32, uint32, uint8
            timestamp_ns, symbol_id, event_type, price_paise, quantity, side
        )

    def add_tick(self, symbol, timestamp_ns, event_type, price, quantity, side):
        """Store a tick record."""
        if symbol not in self.symbol_map:
            self.symbol_map[symbol] = len(self.symbol_map)
        sym_id = self.symbol_map[symbol]

        price_paise = int(price * 100)  # Store as integer paise
        binary = self._encode_tick(timestamp_ns, sym_id, event_type,
                                    price_paise, quantity, side)

        if symbol not in self.data:
            self.data[symbol] = []
        self.data[symbol].append({
            'ts': timestamp_ns, 'type': event_type,
            'price': price, 'qty': quantity, 'side': side,
            'binary_size': len(binary)
        })
        self.stats['total_ticks'] += 1
        self.stats['total_bytes'] += len(binary)

    def query_range(self, symbol, start_ns, end_ns):
        """Query ticks in a time range."""
        if symbol not in self.data:
            return []
        return [t for t in self.data[symbol]
                if start_ns <= t['ts'] <= end_ns]

    def compute_bars(self, symbol, bar_seconds=60):
        """Aggregate ticks into OHLCV bars."""
        if symbol not in self.data:
            return []
        trades = [t for t in self.data[symbol] if t['type'] == 1]
        if not trades:
            return []

        bars = []
        bar_ns = bar_seconds * 1_000_000_000
        current_bar_start = trades[0]['ts'] // bar_ns * bar_ns

        bar_trades = []
        for t in trades:
            bar_start = t['ts'] // bar_ns * bar_ns
            if bar_start != current_bar_start:
                if bar_trades:
                    prices = [tr['price'] for tr in bar_trades]
                    vols = [tr['qty'] for tr in bar_trades]
                    bars.append({
                        'ts': current_bar_start,
                        'open': prices[0], 'high': max(prices),
                        'low': min(prices), 'close': prices[-1],
                        'volume': sum(vols), 'trades': len(bar_trades)
                    })
                current_bar_start = bar_start
                bar_trades = []
            bar_trades.append(t)

        return bars

    def storage_report(self):
        """Generate storage statistics."""
        report = {
            'total_ticks': self.stats['total_ticks'],
            'total_bytes': self.stats['total_bytes'],
            'symbols': len(self.data),
            'bytes_per_tick': self.stats['total_bytes'] / max(1, self.stats['total_ticks']),
            'estimated_parquet_bytes': int(self.stats['total_bytes'] * 0.12),
        }
        return report

# Simulate NSE tick data for RELIANCE
np.random.seed(42)
store = TickDataStore()

base_ts = 1704067200_000_000_000  # 2024-01-01 start
base_price = 2500.0
price = base_price

print("=" * 55)
print("TICK DATA STORAGE: NSE SIMULATION")
print("=" * 55)

# Generate 10,000 ticks
for i in range(10000):
    price += np.random.normal(0, 0.05)
    ts = base_ts + i * 1_000_000  # 1ms apart
    event_type = 1 if np.random.random() < 0.4 else 2  # trade or order
    side = 1 if np.random.random() < 0.5 else 2
    qty = np.random.poisson(100) + 10

    store.add_tick('RELIANCE', ts, event_type, round(price, 2), qty, side)

# Storage report
report = store.storage_report()
print(f"\\nStorage Report:")
print(f"  Total ticks:     {report['total_ticks']:,}")
print(f"  Raw bytes:       {report['total_bytes']:,} ({report['total_bytes']/1024:.1f} KB)")
print(f"  Bytes per tick:  {report['bytes_per_tick']:.1f}")
print(f"  Parquet est:     {report['estimated_parquet_bytes']:,} ({report['estimated_parquet_bytes']/1024:.1f} KB)")
print(f"  Compression:     {1 - report['estimated_parquet_bytes']/report['total_bytes']:.0%}")

# Query performance
results = store.query_range('RELIANCE', base_ts, base_ts + 1_000_000_000)
print(f"\\nQuery (1 second window): {len(results)} ticks")

# OHLCV bars
bars = store.compute_bars('RELIANCE', bar_seconds=60)
print(f"\\n1-Minute Bars ({len(bars)} bars):")
for bar in bars[:3]:
    print(f"  O={bar['open']:.2f} H={bar['high']:.2f} "
          f"L={bar['low']:.2f} C={bar['close']:.2f} "
          f"V={bar['volume']:,} Trades={bar['trades']}")

# Extrapolate to full NSE
nse_daily_gb = 200 * 100 * 22500 * 64 / (1024**3)
print(f"\\nFull NSE Estimate (200 stocks, 100 tps):")
print(f"  Daily raw:   {nse_daily_gb:.1f} GB")
print(f"  Daily Parq:  {nse_daily_gb * 0.12:.1f} GB")
print(f"  Yearly Parq: {nse_daily_gb * 0.12 * 252 / 1024:.2f} TB")`}
      />

      <ExampleBlock
        title="Designing a Tick Data Pipeline for NSE"
        difficulty="intermediate"
        problem="You need to store 3 years of tick data for the NIFTY 200 universe from NSE. Average tick rate is 80 ticks/second per stock, with 20 bytes per tick (binary). Trading session is 6.25 hours. Compute raw storage, Parquet storage, and the number of rows."
        solution={[
          {
            step: 'Daily ticks per stock',
            formula: '80 \\times 6.25 \\times 3600 = 1{,}800{,}000 \\text{ ticks/day/stock}',
          },
          {
            step: 'Total daily ticks',
            formula: '200 \\times 1.8M = 360M \\text{ ticks/day}',
          },
          {
            step: 'Raw daily storage',
            formula: '360M \\times 20 = 7.2 \\text{ GB/day (raw binary)}',
          },
          {
            step: '3-year totals (756 trading days)',
            formula: '\\text{Rows} = 360M \\times 756 = 272.2 \\text{ billion rows}',
          },
          {
            step: 'Storage estimates',
            formula: '\\text{Raw} = 7.2 \\times 756 = 5.4 \\text{ TB}, \\quad \\text{Parquet} \\approx 0.65 \\text{ TB}',
            explanation: 'Parquet achieves ~88% compression. This fits on a single NVMe SSD for hot storage, with cold data on S3/MinIO.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Efficient tick data infrastructure is the foundation of quantitative trading
          on NSE. Use columnar formats (Parquet/Arrow) for 80-90% compression with
          fast analytical queries, partition by date and symbol, implement a
          hot/warm/cold storage hierarchy, and store prices as integer paise to
          avoid floating-point precision issues. A well-designed pipeline can handle
          the full NSE universe within modest hardware budgets.
        </p>
      </NoteBlock>
    </div>
  )
}
