import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveValueScreen() {
  const [peThreshold, setPeThreshold] = useState(15)
  const [pbvThreshold, setPbvThreshold] = useState(2.0)
  const [divYieldMin, setDivYieldMin] = useState(3)
  const [evEbitdaMax, setEvEbitdaMax] = useState(10)

  const stocks = [
    { name: 'ITC', pe: 22, pbv: 7.5, divYield: 3.5, evEbitda: 14 },
    { name: 'Coal India', pe: 7.5, pbv: 3.2, divYield: 8.5, evEbitda: 4.5 },
    { name: 'ONGC', pe: 6.8, pbv: 0.9, divYield: 5.2, evEbitda: 3.8 },
    { name: 'NTPC', pe: 12, pbv: 1.6, divYield: 4.1, evEbitda: 8.2 },
    { name: 'Power Grid', pe: 11, pbv: 2.1, divYield: 5.8, evEbitda: 7.5 },
    { name: 'SBI', pe: 9, pbv: 1.3, divYield: 2.8, evEbitda: 5.1 },
    { name: 'BPCL', pe: 5.5, pbv: 1.8, divYield: 6.2, evEbitda: 4.2 },
    { name: 'Vedanta', pe: 8, pbv: 2.5, divYield: 9.1, evEbitda: 5.8 },
  ]

  const passedStocks = stocks.filter(s =>
    s.pe <= peThreshold && s.pbv <= pbvThreshold &&
    s.divYield >= divYieldMin && s.evEbitda <= evEbitdaMax
  )

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Value Stock Screener
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Set value criteria to filter NSE-listed stocks. Adjust thresholds to see which stocks pass.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Max P/E = {peThreshold}x</span>
          <input type="range" min="5" max="30" step="1" value={peThreshold}
            onChange={e => setPeThreshold(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Max P/BV = {pbvThreshold.toFixed(1)}x</span>
          <input type="range" min="0.5" max="5" step="0.5" value={pbvThreshold}
            onChange={e => setPbvThreshold(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Min Div Yield = {divYieldMin}%</span>
          <input type="range" min="0" max="8" step="0.5" value={divYieldMin}
            onChange={e => setDivYieldMin(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Max EV/EBITDA = {evEbitdaMax}x</span>
          <input type="range" min="3" max="20" step="1" value={evEbitdaMax}
            onChange={e => setEvEbitdaMax(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-3 py-2 text-left text-gray-600 dark:text-gray-400">Stock</th>
              <th className="px-3 py-2 text-right text-gray-600 dark:text-gray-400">P/E</th>
              <th className="px-3 py-2 text-right text-gray-600 dark:text-gray-400">P/BV</th>
              <th className="px-3 py-2 text-right text-gray-600 dark:text-gray-400">Div Yield</th>
              <th className="px-3 py-2 text-right text-gray-600 dark:text-gray-400">EV/EBITDA</th>
              <th className="px-3 py-2 text-center text-gray-600 dark:text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            {stocks.map(s => {
              const passed = s.pe <= peThreshold && s.pbv <= pbvThreshold &&
                s.divYield >= divYieldMin && s.evEbitda <= evEbitdaMax
              return (
                <tr key={s.name} className={`border-b border-gray-200 dark:border-gray-700 ${passed ? 'bg-green-50 dark:bg-green-900/20' : ''}`}>
                  <td className="px-3 py-1 font-semibold">{s.name}</td>
                  <td className={`px-3 py-1 text-right ${s.pe <= peThreshold ? 'text-green-600' : 'text-red-500'}`}>{s.pe}x</td>
                  <td className={`px-3 py-1 text-right ${s.pbv <= pbvThreshold ? 'text-green-600' : 'text-red-500'}`}>{s.pbv}x</td>
                  <td className={`px-3 py-1 text-right ${s.divYield >= divYieldMin ? 'text-green-600' : 'text-red-500'}`}>{s.divYield}%</td>
                  <td className={`px-3 py-1 text-right ${s.evEbitda <= evEbitdaMax ? 'text-green-600' : 'text-red-500'}`}>{s.evEbitda}x</td>
                  <td className="px-3 py-1 text-center">{passed ? 'PASS' : 'FAIL'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
        {passedStocks.length} of {stocks.length} stocks pass all value criteria
      </p>
    </div>
  )
}

export default function ValueStrategies() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Systematic Value Strategies
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Value investing, pioneered by Graham and Dodd, systematically selects stocks trading
        below their intrinsic value. In the Indian market, value strategies exploit the
        tendency of NSE-listed stocks to mean-revert from extreme valuations, particularly
        in cyclical sectors like metals, energy, and PSU banks.
      </p>

      <DefinitionBlock
        title="Value Factor"
        label="Definition 11.10"
        definition="The value factor captures the return premium earned by stocks with low price-to-fundamental ratios (low P/E, low P/BV, low EV/EBITDA, high dividend yield) relative to stocks with high ratios. The value premium arises from systematic mispricing due to investor overreaction to negative news and underestimation of mean reversion in fundamentals."
        notation="HML = R_{high\,B/M} - R_{low\,B/M}"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Value Metrics and Construction
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The primary value metrics used for Indian equity screening:
      </p>

      <BlockMath math="E/P = \frac{\text{Trailing EPS}}{\text{Market Price}} \quad \text{(Earnings Yield)}" />

      <BlockMath math="B/M = \frac{\text{Book Value per Share}}{\text{Market Price}} \quad \text{(Book-to-Market)}" />

      <BlockMath math="EBITDA/EV = \frac{\text{EBITDA}}{\text{Market Cap + Net Debt}} \quad \text{(EBITDA Yield)}" />

      <TheoremBlock
        title="Fama-French Value Premium"
        label="Theorem 11.5"
        statement="The value premium (HML factor) in Indian equities is statistically significant and economically meaningful. Using BSE-listed stocks sorted into value and growth portfolios by B/M ratio, the long-short HML factor earns a positive premium: E[R_{HML}] > 0 with t-statistic > 2.0 over multi-decade samples."
        proof="Evidence from Agarwalla, Jacob, and Varma (2013) at IIM Ahmedabad shows that the Indian HML factor earns an annualized premium of approximately 4-6% over the 1993-2012 period. The premium is larger among small-cap stocks and is robust to controlling for momentum and quality factors. Data available on the Indian Fama-French factor library maintained by IIM Ahmedabad."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Composite Value Score
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A robust value strategy combines multiple metrics into a composite score to
        avoid single-metric bias:
      </p>

      <BlockMath math="V_i = \frac{1}{4}\left[\text{rank}(E/P_i) + \text{rank}(B/M_i) + \text{rank}(EBITDA/EV_i) + \text{rank}(D/P_i)\right]" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Cross-sectional ranks are computed within sector peer groups to control for
        industry-specific valuation norms. The composite score provides more stable
        value signals than any individual metric.
      </p>

      <NoteBlock title="Value Traps in Indian Markets" type="historical">
        <ul className="space-y-1 text-sm">
          <li><strong>PSU Value Trap:</strong> Government-owned enterprises often appear cheap
            on P/E and P/BV but face structural headwinds from government interference,
            poor capital allocation, and declining market share.</li>
          <li><strong>Cyclical Traps:</strong> Metal and commodity stocks show low P/E at
            cycle peaks (when earnings are inflated), not troughs. Use normalized earnings
            (Shiller P/E) for cyclicals.</li>
          <li><strong>Financial Distress:</strong> Stocks with low valuations due to actual
            distress (high NPAs for banks, debt covenants) destroy value. Add quality
            filters to avoid.</li>
          <li><strong>SEBI Delisting Risk:</strong> Some low-valuation stocks face potential
            delisting or promoter buyback at low prices under SEBI regulations.</li>
        </ul>
      </NoteBlock>

      <InteractiveValueScreen />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Shiller CAPE for Indian Market Timing
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The Cyclically Adjusted P/E (CAPE or Shiller P/E) for the Nifty 50 smooths
        earnings over 10 years to filter out cyclical fluctuations:
      </p>

      <BlockMath math="CAPE_{Nifty} = \frac{P_{Nifty}}{\frac{1}{10}\sum_{t=1}^{10} E_t^{real}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Historical Nifty 50 CAPE has ranged from 12x (March 2020 COVID low, GFC 2008)
        to 40x+ (2007 peak, late 2024). CAPE below 18x has historically offered
        excellent 5-year forward returns for Indian investors.
      </p>

      <PythonCode
        title="value_strategy.py"
        runnable
        code={`import numpy as np

class ValueStrategy:
    """Systematic value strategy for NSE stocks."""

    def __init__(self, name="Indian Value"):
        self.name = name
        self.universe = []

    def add_stock(self, ticker, pe, pbv, div_yield, ev_ebitda,
                  sector, market_cap_cr):
        self.universe.append({
            'ticker': ticker, 'pe': pe, 'pbv': pbv,
            'div_yield': div_yield, 'ev_ebitda': ev_ebitda,
            'sector': sector, 'mcap': market_cap_cr
        })

    def rank_metric(self, metric, ascending=True):
        """Rank stocks on a metric (ascending = lower is better for value)."""
        values = [(i, s[metric]) for i, s in enumerate(self.universe)]
        values.sort(key=lambda x: x[1], reverse=not ascending)
        ranks = {}
        for rank, (idx, _) in enumerate(values):
            ranks[idx] = rank + 1
        return ranks

    def composite_value_score(self):
        """Compute composite value score from multiple metrics."""
        n = len(self.universe)
        pe_ranks = self.rank_metric('pe', ascending=True)
        pbv_ranks = self.rank_metric('pbv', ascending=True)
        dy_ranks = self.rank_metric('div_yield', ascending=False)
        ev_ranks = self.rank_metric('ev_ebitda', ascending=True)

        scores = []
        for i in range(n):
            avg_rank = (pe_ranks[i] + pbv_ranks[i] +
                       dy_ranks[i] + ev_ranks[i]) / 4
            percentile = (1 - avg_rank / n) * 100
            scores.append({
                **self.universe[i],
                'pe_rank': pe_ranks[i],
                'pbv_rank': pbv_ranks[i],
                'dy_rank': dy_ranks[i],
                'ev_rank': ev_ranks[i],
                'composite_rank': avg_rank,
                'value_percentile': percentile
            })
        return sorted(scores, key=lambda x: x['composite_rank'])

# Build NSE value universe
strategy = ValueStrategy("Nifty Value Screen")
strategy.add_stock("ONGC",       pe=6.8,  pbv=0.9, div_yield=5.2, ev_ebitda=3.8, sector="Energy", market_cap_cr=250000)
strategy.add_stock("Coal India", pe=7.5,  pbv=3.2, div_yield=8.5, ev_ebitda=4.5, sector="Mining", market_cap_cr=180000)
strategy.add_stock("NTPC",       pe=12.0, pbv=1.6, div_yield=4.1, ev_ebitda=8.2, sector="Power",  market_cap_cr=320000)
strategy.add_stock("Power Grid", pe=11.0, pbv=2.1, div_yield=5.8, ev_ebitda=7.5, sector="Power",  market_cap_cr=280000)
strategy.add_stock("SBI",        pe=9.0,  pbv=1.3, div_yield=2.8, ev_ebitda=5.1, sector="Banking",market_cap_cr=650000)
strategy.add_stock("BPCL",       pe=5.5,  pbv=1.8, div_yield=6.2, ev_ebitda=4.2, sector="Energy", market_cap_cr=90000)
strategy.add_stock("ITC",        pe=22.0, pbv=7.5, div_yield=3.5, ev_ebitda=14.0,sector="FMCG",   market_cap_cr=560000)
strategy.add_stock("Vedanta",    pe=8.0,  pbv=2.5, div_yield=9.1, ev_ebitda=5.8, sector="Metals", market_cap_cr=120000)
strategy.add_stock("GAIL",       pe=10.5, pbv=1.4, div_yield=4.5, ev_ebitda=6.5, sector="Gas",    market_cap_cr=95000)
strategy.add_stock("NHPC",       pe=14.0, pbv=1.9, div_yield=3.8, ev_ebitda=9.0, sector="Power",  market_cap_cr=75000)

results = strategy.composite_value_score()

print("=" * 75)
print("  Composite Value Ranking - NSE Universe")
print("=" * 75)
print(f"{'Rank':<5} {'Ticker':<12} {'Sector':<8} {'P/E':>5} {'P/BV':>5} "
      f"{'DY%':>5} {'EV/EB':>6} {'Score':>6}")
print("-" * 75)
for i, r in enumerate(results):
    print(f"{i+1:<5} {r['ticker']:<12} {r['sector']:<8} "
          f"{r['pe']:>5.1f} {r['pbv']:>5.1f} {r['div_yield']:>5.1f} "
          f"{r['ev_ebitda']:>6.1f} {r['value_percentile']:>5.1f}%")

print("\\nValue Portfolio (Top Quartile):")
top_q = results[:len(results)//4 + 1]
for r in top_q:
    print(f"  {r['ticker']} ({r['sector']}): "
          f"P/E={r['pe']:.1f}x, Div Yield={r['div_yield']:.1f}%")`}
      />

      <ExampleBlock
        title="Deep Value Screen on NSE"
        difficulty="beginner"
        problem="Screen the Nifty 500 universe for deep value stocks with P/E < 8, P/BV < 1.5, dividend yield > 5%, and EV/EBITDA < 5. A stock has P/E=6.8, P/BV=0.9, Div Yield=5.2%, EV/EBITDA=3.8. Does it pass?"
        solution={[
          {
            step: 'Check P/E criterion',
            formula: 'P/E = 6.8 < 8 \\quad \\checkmark',
            explanation: 'Passes the earnings yield threshold.',
          },
          {
            step: 'Check P/BV criterion',
            formula: 'P/BV = 0.9 < 1.5 \\quad \\checkmark',
            explanation: 'Trading below book value -- strong value signal.',
          },
          {
            step: 'Check dividend yield',
            formula: 'DY = 5.2\\% > 5\\% \\quad \\checkmark',
            explanation: 'Above the minimum dividend yield threshold.',
          },
          {
            step: 'Check EV/EBITDA',
            formula: 'EV/EBITDA = 3.8 < 5 \\quad \\checkmark',
            explanation: 'All four criteria pass. This stock qualifies as deep value. However, verify it is not a value trap by checking for declining revenues, high debt maturity risk, or adverse SEBI/regulatory actions.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Systematic value strategies in India should combine multiple valuation metrics
          into composite scores, screen within sector peer groups, and incorporate quality
          filters to avoid value traps. The Indian value premium has been significant
          historically but requires patience -- value strategies can underperform growth
          for extended periods. Use Nifty CAPE as a market-level timing overlay and
          individual stock composite value scores for security selection.
        </p>
      </NoteBlock>
    </div>
  )
}
