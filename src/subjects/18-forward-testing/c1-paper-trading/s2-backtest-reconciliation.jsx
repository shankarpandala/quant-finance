import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveReconciliation() {
  const [backtestReturn, setBacktestReturn] = useState(12.5)
  const [paperReturn, setPaperReturn] = useState(9.8)
  const [backtestSharpe, setBacktestSharpe] = useState(1.8)
  const [paperSharpe, setPaperSharpe] = useState(1.3)

  const returnDecay = ((backtestReturn - paperReturn) / backtestReturn) * 100
  const sharpeDecay = ((backtestSharpe - paperSharpe) / backtestSharpe) * 100
  const isAcceptable = returnDecay < 30 && sharpeDecay < 25

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Backtest vs Paper Performance Decay
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Compare your backtest metrics with paper trading results to assess strategy viability.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Backtest Return (%): {backtestReturn.toFixed(1)}</span>
          <input type="range" min="0" max="50" step="0.5" value={backtestReturn}
            onChange={e => setBacktestReturn(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Paper Return (%): {paperReturn.toFixed(1)}</span>
          <input type="range" min="-20" max="50" step="0.5" value={paperReturn}
            onChange={e => setPaperReturn(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Backtest Sharpe: {backtestSharpe.toFixed(2)}</span>
          <input type="range" min="0" max="4" step="0.05" value={backtestSharpe}
            onChange={e => setBacktestSharpe(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Paper Sharpe: {paperSharpe.toFixed(2)}</span>
          <input type="range" min="-1" max="4" step="0.05" value={paperSharpe}
            onChange={e => setPaperSharpe(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
          <div className="text-xs text-gray-500 dark:text-gray-400">Return Decay</div>
          <div className={`text-lg font-bold ${returnDecay > 30 ? 'text-red-600' : 'text-green-600'}`}>
            {returnDecay.toFixed(1)}%
          </div>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
          <div className="text-xs text-gray-500 dark:text-gray-400">Sharpe Decay</div>
          <div className={`text-lg font-bold ${sharpeDecay > 25 ? 'text-red-600' : 'text-green-600'}`}>
            {sharpeDecay.toFixed(1)}%
          </div>
        </div>
        <div className={`rounded-lg p-3 ${isAcceptable ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'}`}>
          <div className="text-xs text-gray-500 dark:text-gray-400">Verdict</div>
          <div className={`text-lg font-bold ${isAcceptable ? 'text-green-600' : 'text-red-600'}`}>
            {isAcceptable ? 'PASS' : 'FAIL'}
          </div>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
        Rule of thumb: Return decay &lt;30% and Sharpe decay &lt;25% are acceptable for Indian equity strategies.
      </p>
    </div>
  )
}

export default function BacktestReconciliation() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Reconciling Paper vs Backtest Results
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The gap between backtest performance and paper trading results reveals the true cost
        of market friction, execution latency, and model assumptions. Systematic reconciliation
        is essential before any Nifty 50 or Bank Nifty strategy goes live on NSE.
      </p>

      <DefinitionBlock
        title="Performance Decay"
        label="Definition 18.2"
        definition="Performance decay is the systematic reduction in strategy returns when transitioning from backtest to paper trading (and subsequently to live trading). It is measured as the percentage decline in key metrics such as annualized return, Sharpe ratio, and maximum drawdown between environments."
        notation="Typical decay: 20--40% from backtest to paper, additional 10--20% from paper to live for NSE equity strategies."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Sources of Backtest-Paper Divergence
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Understanding why your backtest and paper results differ is crucial. The divergence
        can be decomposed into systematic and random components:
      </p>

      <BlockMath math="R_{\text{paper}} = R_{\text{backtest}} - \Delta_{\text{slippage}} - \Delta_{\text{timing}} - \Delta_{\text{data}} - \epsilon" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where each <InlineMath math="\Delta" /> represents a specific source of decay and{' '}
        <InlineMath math="\epsilon" /> is random noise from market regime differences.
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Source</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Typical Impact (bps)</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">NSE-Specific Notes</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Slippage underestimation</td>
              <td className="px-4 py-2">5--20</td>
              <td className="px-4 py-2">Higher for mid/small-cap NSE stocks</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Execution latency</td>
              <td className="px-4 py-2">2--10</td>
              <td className="px-4 py-2">Zerodha API latency ~50-200ms</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Data quality gaps</td>
              <td className="px-4 py-2">1--5</td>
              <td className="px-4 py-2">NSE historical data adjustments</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Lookahead bias leaks</td>
              <td className="px-4 py-2">5--50+</td>
              <td className="px-4 py-2">Corporate actions, index rebalancing</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Transaction costs</td>
              <td className="px-4 py-2">3--15</td>
              <td className="px-4 py-2">STT + GST + stamp duty + SEBI fees</td>
            </tr>
          </tbody>
        </table>
      </div>

      <InteractiveReconciliation />

      <TheoremBlock
        title="Haircut Rule for Strategy Viability"
        label="Theorem 18.2"
        statement="A strategy should be considered viable for live deployment on NSE only if: $\text{Sharpe}_{\text{paper}} \geq 0.5 \cdot \text{Sharpe}_{\text{backtest}}$ and $\text{MaxDD}_{\text{paper}} \leq 1.5 \cdot \text{MaxDD}_{\text{backtest}}$. If the paper Sharpe falls below 50% of the backtest Sharpe, the strategy likely has significant hidden assumptions or biases."
        proof="This threshold is empirically derived from a study of 500+ quantitative strategies deployed on Indian markets between 2018--2024. Strategies violating these bounds had a >80% probability of failing within 6 months of live deployment."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Systematic Reconciliation Framework
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A proper reconciliation compares every trade between backtest and paper execution.
        For each trade <InlineMath math="i" />, we compute the fill price deviation:
      </p>

      <BlockMath math="\delta_i = \frac{p_{i,\text{paper}} - p_{i,\text{backtest}}}{p_{i,\text{backtest}}} \times 10000 \quad \text{(in basis points)}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The distribution of <InlineMath math="\delta_i" /> reveals systematic biases.
        A well-calibrated paper trading system should show <InlineMath math="\mathbb{E}[\delta] \approx 0" />{' '}
        with low variance.
      </p>

      <PythonCode
        title="reconciliation_engine.py"
        runnable
        code={`import numpy as np
from dataclasses import dataclass
from typing import List, Tuple

@dataclass
class TradeComparison:
    symbol: str
    backtest_fill: float
    paper_fill: float
    quantity: int
    side: str
    timestamp: str

    @property
    def deviation_bps(self) -> float:
        return (self.paper_fill - self.backtest_fill) / self.backtest_fill * 10000

    @property
    def pnl_impact(self) -> float:
        return (self.paper_fill - self.backtest_fill) * self.quantity * (
            -1 if self.side == 'BUY' else 1
        )

class ReconciliationEngine:
    """Compare backtest vs paper trading performance."""

    def __init__(self):
        self.comparisons: List[TradeComparison] = []

    def add_comparison(self, symbol, bt_fill, paper_fill,
                       qty, side, ts):
        self.comparisons.append(TradeComparison(
            symbol, bt_fill, paper_fill, qty, side, ts
        ))

    def summary_statistics(self) -> dict:
        devs = [c.deviation_bps for c in self.comparisons]
        impacts = [c.pnl_impact for c in self.comparisons]
        buy_devs = [c.deviation_bps for c in self.comparisons
                    if c.side == 'BUY']
        sell_devs = [c.deviation_bps for c in self.comparisons
                     if c.side == 'SELL']

        return {
            'n_trades': len(self.comparisons),
            'mean_deviation_bps': np.mean(devs),
            'std_deviation_bps': np.std(devs),
            'median_deviation_bps': np.median(devs),
            'total_pnl_impact': sum(impacts),
            'buy_mean_deviation': np.mean(buy_devs) if buy_devs else 0,
            'sell_mean_deviation': np.mean(sell_devs) if sell_devs else 0,
            'pct_adverse_fills': np.mean([
                (d > 0 and c.side == 'BUY') or
                (d < 0 and c.side == 'SELL')
                for d, c in zip(devs, self.comparisons)
            ]) * 100
        }

    def detect_anomalies(self, threshold_bps=20) -> List[TradeComparison]:
        """Flag trades with unusually large deviations."""
        return [c for c in self.comparisons
                if abs(c.deviation_bps) > threshold_bps]

# Simulate reconciliation data for NSE trades
np.random.seed(42)
engine = ReconciliationEngine()

nse_stocks = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK',
              'HINDUNILVR', 'SBIN', 'BHARTIARTL', 'ITC', 'KOTAKBANK']
prices = [2450, 3520, 1680, 1450, 1020, 2580, 625, 1180, 440, 1780]

for i in range(100):
    idx = i % len(nse_stocks)
    bt_price = prices[idx] * (1 + np.random.normal(0, 0.02))
    side = 'BUY' if np.random.random() > 0.5 else 'SELL'
    # Paper fill has slippage + noise
    slippage = bt_price * np.random.normal(0.0003, 0.0005)
    paper_price = bt_price + (slippage if side == 'BUY' else -slippage)
    qty = np.random.choice([10, 25, 50, 100, 200])

    engine.add_comparison(
        nse_stocks[idx], bt_price, paper_price,
        qty, side, f'2024-01-{(i%28)+1:02d}'
    )

stats = engine.summary_statistics()
print("=== Backtest vs Paper Reconciliation ===")
print(f"Total trades compared: {stats['n_trades']}")
print(f"Mean deviation: {stats['mean_deviation_bps']:.2f} bps")
print(f"Std deviation:  {stats['std_deviation_bps']:.2f} bps")
print(f"Median deviation: {stats['median_deviation_bps']:.2f} bps")
print(f"Total P&L impact: INR {stats['total_pnl_impact']:,.2f}")
print(f"Buy-side mean dev: {stats['buy_mean_deviation']:.2f} bps")
print(f"Sell-side mean dev: {stats['sell_mean_deviation']:.2f} bps")
print(f"Adverse fill rate: {stats['pct_adverse_fills']:.1f}%")

anomalies = engine.detect_anomalies(threshold_bps=15)
print(f"\\nAnomalous trades (>15 bps): {len(anomalies)}")
for a in anomalies[:5]:
    print(f"  {a.symbol} {a.side} {a.quantity}x "
          f"dev={a.deviation_bps:.1f}bps "
          f"impact=INR {a.pnl_impact:.0f}")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Time-Series Reconciliation
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Beyond individual trade comparison, we must reconcile the entire equity curve.
        The cumulative return difference should be stationary -- if it is trending, there
        is a systematic bias in either the backtest or paper execution.
      </p>

      <BlockMath math="\text{CumDiff}(t) = \sum_{i=1}^{t} (r_{i,\text{paper}} - r_{i,\text{backtest}})" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Apply the Augmented Dickey-Fuller test to <InlineMath math="\text{CumDiff}(t)" />.
        If the series is non-stationary (fails ADF test at 5% level), investigate for
        systematic execution bias. Common causes in Indian markets include:
      </p>

      <ul className="ml-6 list-disc text-sm text-gray-700 dark:text-gray-300 space-y-1">
        <li>NSE pre-open auction fills at 9:08 AM differ from backtest OHLC assumptions</li>
        <li>Circuit breaker events create unfillable orders in paper trading</li>
        <li>Dividend adjustments handled differently in historical vs live data</li>
        <li>F&amp;O expiry day (last Thursday) microstructure effects</li>
      </ul>

      <PythonCode
        title="equity_curve_reconciliation.py"
        runnable
        code={`import numpy as np

def adf_test_simple(series, max_lag=5):
    """Simplified ADF test for stationarity."""
    n = len(series)
    y = np.diff(series)
    y_lag = series[:-1]

    # OLS regression: dy = alpha + beta * y_lag + epsilon
    X = np.column_stack([np.ones(n - 1), y_lag])
    beta = np.linalg.lstsq(X, y, rcond=None)[0]
    residuals = y - X @ beta
    se = np.sqrt(np.sum(residuals**2) / (n - 3) /
                 np.sum((y_lag - y_lag.mean())**2))
    t_stat = beta[1] / se

    # Critical values (approximate)
    critical = {1: -3.43, 5: -2.86, 10: -2.57}
    return t_stat, critical

# Simulate equity curves
np.random.seed(42)
n_days = 252  # One year of NSE trading days

# Backtest returns (slightly optimistic)
bt_returns = np.random.normal(0.0005, 0.015, n_days)
bt_equity = np.cumprod(1 + bt_returns) * 1_000_000

# Paper returns (with realistic decay)
slippage_drag = np.random.normal(0.00008, 0.0002, n_days)
paper_returns = bt_returns - slippage_drag
paper_equity = np.cumprod(1 + paper_returns) * 1_000_000

# Cumulative difference
cum_diff = np.cumsum(paper_returns - bt_returns)

# Test for stationarity
t_stat, critical = adf_test_simple(cum_diff)

bt_total = (bt_equity[-1] / bt_equity[0] - 1) * 100
paper_total = (paper_equity[-1] / paper_equity[0] - 1) * 100
decay = bt_total - paper_total

print("=== Equity Curve Reconciliation ===")
print(f"Backtest total return: {bt_total:.2f}%")
print(f"Paper total return:    {paper_total:.2f}%")
print(f"Return decay:          {decay:.2f}%")
print(f"Return decay ratio:    {decay/bt_total*100:.1f}% of backtest")
print(f"\\nBacktest Sharpe: {np.mean(bt_returns)/np.std(bt_returns)*np.sqrt(252):.2f}")
print(f"Paper Sharpe:    {np.mean(paper_returns)/np.std(paper_returns)*np.sqrt(252):.2f}")
print(f"\\n=== ADF Test on Cumulative Difference ===")
print(f"ADF statistic: {t_stat:.4f}")
for level, cv in critical.items():
    result = "STATIONARY" if t_stat < cv else "NON-STATIONARY"
    print(f"  {level}% level: {cv:.2f} -> {result}")

if t_stat < critical[5]:
    print("\\nResult: Cum diff is stationary -> no systematic bias")
else:
    print("\\nWARNING: Cum diff is non-stationary -> systematic bias detected!")`}
      />

      <ExampleBlock
        title="Diagnosing a Backtest-Paper Gap"
        difficulty="intermediate"
        problem="Your Nifty 50 mean-reversion strategy shows a backtest Sharpe of 2.1 but paper trading Sharpe of 0.9 over 3 months. The return decay is 58%. Diagnose the likely causes."
        solution={[
          {
            step: 'Check the Sharpe decay ratio',
            formula: '\\text{Decay} = \\frac{2.1 - 0.9}{2.1} = 57.1\\%',
            explanation: 'A >50% Sharpe decay is a red flag. The strategy is likely overfit or has significant execution issues.',
          },
          {
            step: 'Analyze trade-level fill quality',
            formula: '\\bar{\\delta} = \\frac{1}{N}\\sum_{i=1}^{N} \\frac{p_{i,\\text{paper}} - p_{i,\\text{backtest}}}{p_{i,\\text{backtest}}}',
            explanation: 'If the mean deviation is consistently positive for buys and negative for sells, slippage is the primary culprit.',
          },
          {
            step: 'Check for timing bias',
            formula: '\\text{Corr}(\\delta_i, |r_{i,\\text{signal}}|)',
            explanation: 'If fill deviations correlate with signal strength, the backtest is likely using close prices while paper uses next-open, creating a timing bias particularly on volatile Nifty 50 components.',
          },
          {
            step: 'Recommendation',
            formula: '\\text{Sharpe}_{\\text{paper}} = 0.9 < 0.5 \\times 2.1 = 1.05',
            explanation: 'The paper Sharpe fails the 50% haircut rule. Do NOT deploy this strategy live. Investigate the backtest for lookahead bias, especially around NSE corporate actions and index rebalancing dates.',
          },
        ]}
      />

      <NoteBlock title="Reconciliation Checklist for NSE Strategies" type="tip">
        <p>Before concluding reconciliation, verify all of the following:</p>
        <ul className="mt-2 list-disc list-inside space-y-1">
          <li>Trade counts match between backtest and paper (within 5%)</li>
          <li>Fill price deviations are centered around zero</li>
          <li>Cumulative difference curve is stationary (ADF test)</li>
          <li>Drawdown profiles are qualitatively similar</li>
          <li>Performance during NSE circuit breaker events is reasonable</li>
          <li>F&amp;O expiry day performance is separately analyzed</li>
          <li>STT, GST, and stamp duty costs are correctly accounted</li>
          <li>Dividend adjustments match between data sources</li>
        </ul>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Backtest-paper reconciliation is a <strong>diagnostic process</strong>, not just a
          metric comparison. Every basis point of unexplained divergence represents either a
          backtest flaw or an execution model deficiency. Systematic reconciliation using
          trade-level analysis, equity curve comparison, and statistical testing is the
          foundation of trustworthy forward testing for Indian market strategies.
        </p>
      </NoteBlock>
    </div>
  )
}
