import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveMomentumRanker() {
  const [lookbackMonths, setLookbackMonths] = useState(12)
  const [skipMonths, setSkipMonths] = useState(1)
  const [topN, setTopN] = useState(5)

  const stocks = [
    { name: 'Reliance', sector: 'Energy', returns: [0.02, 0.03, -0.01, 0.04, 0.01, -0.02, 0.05, 0.03, 0.02, 0.01, 0.04, 0.03] },
    { name: 'TCS', sector: 'IT', returns: [0.01, 0.02, 0.03, 0.01, 0.02, 0.04, 0.01, -0.01, 0.03, 0.02, 0.01, 0.02] },
    { name: 'HDFC Bank', sector: 'Banking', returns: [-0.01, 0.01, 0.02, 0.03, 0.04, 0.02, 0.03, 0.02, -0.01, 0.01, 0.03, 0.04] },
    { name: 'Infosys', sector: 'IT', returns: [0.03, 0.01, 0.02, -0.02, 0.01, 0.03, 0.02, 0.01, 0.04, 0.03, -0.01, 0.01] },
    { name: 'ICICI Bank', sector: 'Banking', returns: [0.02, 0.04, 0.03, 0.01, 0.03, 0.01, -0.01, 0.02, 0.03, 0.04, 0.02, 0.01] },
    { name: 'ITC', sector: 'FMCG', returns: [-0.01, 0.01, 0.00, 0.02, -0.01, 0.01, 0.02, 0.03, 0.01, 0.00, 0.02, 0.01] },
    { name: 'SBI', sector: 'Banking', returns: [0.04, 0.03, 0.02, -0.03, 0.01, 0.05, 0.03, -0.02, 0.04, 0.02, 0.01, 0.03] },
    { name: 'Bharti Airtel', sector: 'Telecom', returns: [0.01, 0.02, 0.01, 0.03, 0.02, 0.01, 0.04, 0.03, 0.02, 0.01, 0.03, 0.02] },
    { name: 'HUL', sector: 'FMCG', returns: [0.01, -0.01, 0.02, 0.01, 0.00, 0.01, -0.01, 0.02, 0.01, 0.01, 0.00, 0.01] },
    { name: 'Adani Ports', sector: 'Infra', returns: [0.05, 0.04, -0.03, 0.06, 0.02, -0.04, 0.07, 0.03, -0.02, 0.05, 0.04, -0.01] },
  ]

  const scoredStocks = stocks.map(s => {
    const validReturns = s.returns.slice(0, Math.min(lookbackMonths, 12))
    const skipReturns = validReturns.slice(0, validReturns.length - skipMonths)
    const cumReturn = skipReturns.reduce((prod, r) => prod * (1 + r), 1) - 1
    return { ...s, momentum: cumReturn }
  }).sort((a, b) => b.momentum - a.momentum)

  const winners = scoredStocks.slice(0, topN)
  const losers = scoredStocks.slice(-topN)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Cross-Sectional Momentum Ranker
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Rank NSE 500 stocks (sample) by relative momentum. Adjust lookback, skip period, and portfolio size.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Lookback: {lookbackMonths} months</span>
          <input type="range" min="3" max="12" step="1" value={lookbackMonths}
            onChange={e => setLookbackMonths(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Skip (reversal buffer): {skipMonths} month</span>
          <input type="range" min="0" max="3" step="1" value={skipMonths}
            onChange={e => setSkipMonths(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Top/Bottom N: {topN} stocks</span>
          <input type="range" min="2" max="5" step="1" value={topN}
            onChange={e => setTopN(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <h4 className="text-sm font-bold text-green-600 dark:text-green-400 mb-2">Winners (Long)</h4>
          {winners.map((s, i) => (
            <div key={i} className="flex justify-between border-b border-gray-100 dark:border-gray-700 py-1 text-sm">
              <span className="text-gray-700 dark:text-gray-300">{i + 1}. {s.name} <span className="text-xs text-gray-400">({s.sector})</span></span>
              <span className="font-mono text-green-600">{(s.momentum * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
        <div>
          <h4 className="text-sm font-bold text-red-500 mb-2">Losers (Short)</h4>
          {losers.map((s, i) => (
            <div key={i} className="flex justify-between border-b border-gray-100 dark:border-gray-700 py-1 text-sm">
              <span className="text-gray-700 dark:text-gray-300">{stocks.length - topN + i + 1}. {s.name} <span className="text-xs text-gray-400">({s.sector})</span></span>
              <span className="font-mono text-red-500">{(s.momentum * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
        Long-short spread: <span className="font-bold text-indigo-600">{((winners.reduce((s, w) => s + w.momentum, 0) / topN - losers.reduce((s, l) => s + l.momentum, 0) / topN) * 100).toFixed(1)}%</span> over the lookback period
      </p>
    </div>
  )
}

export default function CrossSectionalMomentum() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Cross-Sectional Momentum on NSE 500
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Cross-sectional momentum ranks assets by their relative performance and goes long the
        winners while shorting the losers. Jegadeesh and Titman (1993) documented that stocks
        with high returns over the past 3-12 months tend to outperform low-return stocks over the
        next 1-6 months. This "relative strength" effect is particularly strong in the Indian
        market, where retail investor herding and information asymmetry amplify momentum patterns.
      </p>

      <DefinitionBlock
        title="Cross-Sectional Momentum"
        label="Definition 5.5"
        definition="Cross-sectional momentum is a strategy that ranks securities within a universe by their past returns over a formation period, then constructs a long-short portfolio by buying the top decile (winners) and selling the bottom decile (losers). The strategy profits from the relative continuation of performance across securities."
        notation={<>Momentum score for stock <InlineMath math="i" />: <InlineMath math="m_{i,t} = \prod_{j=1}^{k-s}(1 + r_{i,t-j}) - 1" /> where <InlineMath math="k" /> is the lookback period and <InlineMath math="s" /> is the skip period (typically 1 month to avoid short-term reversal).</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Jegadeesh-Titman Framework
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The classic momentum strategy is parameterized by <InlineMath math="(J, K)" /> where
        <InlineMath math="J" /> is the formation (lookback) period and <InlineMath math="K" /> is the
        holding period. At each rebalancing date:
      </p>

      <BlockMath math="r_{WML,t} = \frac{1}{N_W}\sum_{i \in \text{Winners}} r_{i,t} - \frac{1}{N_L}\sum_{i \in \text{Losers}} r_{i,t}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The most common specification is (12,1): rank by 12-month returns, hold for 1 month,
        skip the most recent month. The skip month is crucial because of the well-documented
        short-term reversal effect (Jegadeesh, 1990).
      </p>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Momentum in Indian Equities
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The NSE 500 universe provides an excellent testing ground for momentum strategies. India's
        Nifty 200 Momentum 30 Index (maintained by NSE) has consistently outperformed the
        broad market. Several India-specific factors enhance momentum:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Factor</th>
              <th className="px-5 py-2 text-left text-gray-600 dark:text-gray-400">Effect on Momentum</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Retail investor dominance</td>
              <td className="px-5 py-2">Herding amplifies trends, delays price discovery</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Analyst coverage gaps</td>
              <td className="px-5 py-2">Information diffuses slowly in mid/small caps</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">Sectoral concentration</td>
              <td className="px-5 py-2">Sector rotation creates persistent momentum</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-5 py-2">FII/DII flow patterns</td>
              <td className="px-5 py-2">Persistent institutional flows sustain trends</td>
            </tr>
            <tr>
              <td className="px-5 py-2">Promoter holding signals</td>
              <td className="px-5 py-2">Promoter buying reinforces momentum</td>
            </tr>
          </tbody>
        </table>
      </div>

      <TheoremBlock
        title="Momentum Factor Risk Premium"
        label="Theorem 5.5"
        statement={<>Under the behavioral explanation (Daniel, Hirshleifer, and Subrahmanyam, 1998), momentum profits arise from investor overconfidence and biased self-attribution. Investors overreact to private signals and underreact to public information, causing prices to trend away from fundamentals. The momentum premium <InlineMath math="\mathbb{E}[r_{WML}]" /> is positive but exhibits negative skewness and occasional severe crashes (momentum crashes), especially following market downturns when losers sharply rebound.</>}
      />

      <InteractiveMomentumRanker />

      <PythonCode
        title="xsmom_nse500.py"
        runnable
        code={`import numpy as np

# Cross-Sectional Momentum Strategy on NSE 500 (simulated)
np.random.seed(42)
n_stocks = 100   # Subset of NSE 500
n_months = 60    # 5 years monthly data

# Stock names (representative)
sectors = ['IT', 'Banking', 'FMCG', 'Pharma', 'Auto', 'Energy',
           'Metals', 'Infra', 'Telecom', 'Chemicals']
stock_names = [f"{sectors[i%10]}_{i//10+1}" for i in range(n_stocks)]

# Generate monthly returns with momentum characteristics
# Each stock has a persistent alpha + sector factor + noise
alphas = np.random.randn(n_stocks) * 0.005
sector_factors = np.random.randn(10, n_months) * 0.03
market_factor = np.random.randn(n_months) * 0.04

monthly_returns = np.zeros((n_months, n_stocks))
for i in range(n_stocks):
    sector_idx = i % 10
    betas = 0.7 + np.random.rand() * 0.6
    monthly_returns[:, i] = (alphas[i] +
                              betas * market_factor +
                              sector_factors[sector_idx] +
                              np.random.randn(n_months) * 0.06)

# Momentum strategy: (12,1) with 1-month skip
formation = 12
holding = 1
skip = 1
n_quintiles = 5

portfolio_returns = {q: [] for q in range(n_quintiles)}
wml_returns = []

for t in range(formation + skip, n_months - holding + 1):
    # Compute momentum scores (cumulative return over formation - skip)
    momentum_scores = np.zeros(n_stocks)
    for i in range(n_stocks):
        past_rets = monthly_returns[t-formation-skip:t-skip, i]
        momentum_scores[i] = np.prod(1 + past_rets) - 1

    # Rank stocks into quintiles
    ranks = np.argsort(np.argsort(-momentum_scores))  # 0 = best
    quintile_size = n_stocks // n_quintiles

    for q in range(n_quintiles):
        mask = (ranks >= q * quintile_size) & (ranks < (q+1) * quintile_size)
        q_return = np.mean(monthly_returns[t:t+holding, mask])
        portfolio_returns[q].append(q_return)

    # WML = Q1 (winners) - Q5 (losers)
    wml = portfolio_returns[0][-1] - portfolio_returns[n_quintiles-1][-1]
    wml_returns.append(wml)

# Performance analysis
print("=== Cross-Sectional Momentum: NSE 500 Quintile Analysis ===")
print(f"{'Quintile':<12} {'Ann Return':<14} {'Ann Vol':<12} {'Sharpe':<10} {'Max DD':<10}")

for q in range(n_quintiles):
    rets = np.array(portfolio_returns[q])
    ann_ret = np.mean(rets) * 12
    ann_vol = np.std(rets) * np.sqrt(12)
    sharpe = ann_ret / ann_vol if ann_vol > 0 else 0
    cum = np.cumsum(rets)
    max_dd = np.min(cum - np.maximum.accumulate(cum))
    label = 'Winners' if q == 0 else ('Losers' if q == n_quintiles-1 else f'Q{q+1}')
    print(f"{label:<12} {ann_ret*100:>10.1f}%   {ann_vol*100:>8.1f}%   {sharpe:>7.2f}   {max_dd*100:>7.1f}%")

wml = np.array(wml_returns)
print(f"\\n{'WML (L-S)':<12} {np.mean(wml)*12*100:>10.1f}%   "
      f"{np.std(wml)*np.sqrt(12)*100:>8.1f}%   "
      f"{np.mean(wml)*12/(np.std(wml)*np.sqrt(12)):>7.2f}")

# Momentum crash risk
from scipy.stats import skew, kurtosis
print(f"\\n=== Momentum Risk Characteristics ===")
print(f"WML monthly skewness:  {skew(wml):.2f}")
print(f"WML monthly kurtosis:  {kurtosis(wml):.2f}")
print(f"Worst month:           {np.min(wml)*100:.1f}%")
print(f"Best month:            {np.max(wml)*100:.1f}%")
print(f"% positive months:     {np.mean(wml > 0)*100:.1f}%")

# Sector decomposition
print(f"\\n=== Sector Exposure of Winners Portfolio ===")
last_scores = np.zeros(n_stocks)
for i in range(n_stocks):
    last_scores[i] = np.prod(1 + monthly_returns[-13:-1, i]) - 1

top_20_idx = np.argsort(-last_scores)[:20]
sector_counts = {}
for idx in top_20_idx:
    sec = sectors[idx % 10]
    sector_counts[sec] = sector_counts.get(sec, 0) + 1

for sec, count in sorted(sector_counts.items(), key=lambda x: -x[1]):
    print(f"  {sec:<12} {count} stocks ({count/20*100:.0f}%)")`}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Momentum Crash Risk Management
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Momentum strategies are vulnerable to sharp reversals ("momentum crashes"), which tend
        to occur when markets rebound after a severe decline. The losers portfolio, composed of
        beaten-down stocks with high betas, rallies sharply, causing large losses for the
        long-short strategy. To manage this risk:
      </p>

      <BlockMath math="\text{Dynamic hedging: } w_{WML,t} = w_{WML,t}^{*} \cdot \frac{\sigma_{\text{target}}}{\hat{\sigma}_{WML,t}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\hat{\sigma}_{WML,t}" /> is the estimated WML portfolio volatility.
        This automatically reduces exposure when WML volatility spikes, which typically precedes
        momentum crashes.
      </p>

      <ExampleBlock
        title="Monthly Momentum Rebalance"
        difficulty="intermediate"
        problem="From the NSE 500 universe, the top quintile (100 stocks) has an average 12-1 month return of 45% and the bottom quintile has -15%. Capital is INR 2 crore. Compute the long-short portfolio positions and expected monthly return."
        solution={[
          {
            step: 'Long leg (Winners)',
            formula: '\\text{Long notional} = \\frac{2,00,00,000}{2} = \\text{INR 1 crore}',
            explanation: 'Equal capital allocation to long and short legs for dollar neutrality.',
          },
          {
            step: 'Per-stock allocation',
            formula: '\\text{Per stock} = \\frac{1,00,00,000}{100} = \\text{INR 10,000}',
            explanation: 'Equal-weight allocation within each quintile (100 stocks per quintile).',
          },
          {
            step: 'Expected monthly WML return',
            formula: 'r_{WML} \\approx \\frac{45\\% - (-15\\%)}{12} = 5\\% \\text{ monthly}',
            explanation: 'The long-short spread of 60% annualizes to approximately 5% per month, though this is the historical spread and not a guaranteed forward return.',
          },
        ]}
      />

      <NoteBlock title="NSE Implementation: Nifty 200 Momentum 30 Index" type="historical">
        <p>
          NSE launched the Nifty 200 Momentum 30 Index in 2020, which selects the top 30 stocks
          from the Nifty 200 universe based on their momentum scores (normalized 6-month and
          12-month returns adjusted for volatility). This index has historically outperformed the
          Nifty 50 by 4-6% annually. Several mutual funds and ETFs now track this index, providing
          retail investors easy access to systematic momentum exposure. For quantitative traders,
          this index serves as a useful benchmark for evaluating custom momentum strategies.
        </p>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Cross-sectional momentum on the NSE 500 exploits the tendency of relative winners to
          continue outperforming and losers to continue underperforming. The (12,1) specification
          with a 1-month skip is the most robust parameterization. Indian markets show stronger
          momentum than developed markets due to retail herding and slower information diffusion.
          However, momentum crash risk requires careful volatility-based position sizing and
          drawdown management.
        </p>
      </NoteBlock>
    </div>
  )
}
