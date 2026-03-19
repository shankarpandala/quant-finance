import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveQualityScore() {
  const [roe, setRoe] = useState(18)
  const [debtEquity, setDebtEquity] = useState(0.5)
  const [roeStability, setRoeStability] = useState(3)
  const [accruals, setAccruals] = useState(5)
  const [grossMargin, setGrossMargin] = useState(35)

  const roeScore = Math.min(roe / 25 * 100, 100)
  const leverageScore = Math.max(0, (2 - debtEquity) / 2 * 100)
  const stabilityScore = Math.max(0, (10 - roeStability) / 10 * 100)
  const accrualScore = Math.max(0, (15 - accruals) / 15 * 100)
  const marginScore = Math.min(grossMargin / 50 * 100, 100)
  const compositeScore = (roeScore * 0.3 + leverageScore * 0.2 + stabilityScore * 0.2 +
    accrualScore * 0.15 + marginScore * 0.15)

  const metrics = [
    { name: 'ROE', score: roeScore, color: '#6366f1' },
    { name: 'Leverage', score: leverageScore, color: '#10b981' },
    { name: 'Stability', score: stabilityScore, color: '#f59e0b' },
    { name: 'Accruals', score: accrualScore, color: '#ef4444' },
    { name: 'Margins', score: marginScore, color: '#8b5cf6' },
  ]

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Quality Factor Score Calculator
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust fundamental metrics for an NSE-listed company to compute its quality score.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>ROE = {roe}%</span>
          <input type="range" min="0" max="40" step="1" value={roe}
            onChange={e => setRoe(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Debt/Equity = {debtEquity.toFixed(1)}</span>
          <input type="range" min="0" max="3" step="0.1" value={debtEquity}
            onChange={e => setDebtEquity(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>ROE Volatility (std) = {roeStability}%</span>
          <input type="range" min="0" max="15" step="0.5" value={roeStability}
            onChange={e => setRoeStability(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Accruals Ratio = {accruals}%</span>
          <input type="range" min="0" max="20" step="1" value={accruals}
            onChange={e => setAccruals(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Gross Margin = {grossMargin}%</span>
          <input type="range" min="5" max="70" step="1" value={grossMargin}
            onChange={e => setGrossMargin(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 400 180" className="w-full max-w-lg mx-auto block">
        {metrics.map((m, i) => (
          <g key={m.name}>
            <text x="70" y={25 + i * 32} textAnchor="end" className="text-[11px]" fill="#6b7280">
              {m.name}
            </text>
            <rect x="80" y={15 + i * 32} width="250" height="16" rx="3" fill="#e5e7eb" />
            <rect x="80" y={15 + i * 32} width={m.score * 2.5} height="16" rx="3" fill={m.color} opacity="0.8" />
            <text x={85 + m.score * 2.5} y={27 + i * 32} className="text-[9px] font-bold" fill={m.color}>
              {m.score.toFixed(0)}
            </text>
          </g>
        ))}
      </svg>

      <p className="mt-3 text-center text-lg font-bold">
        <span className="text-gray-600 dark:text-gray-400">Composite Quality Score: </span>
        <span className={compositeScore >= 70 ? 'text-green-600 dark:text-green-400' :
          compositeScore >= 40 ? 'text-amber-600 dark:text-amber-400' : 'text-red-500'}>
          {compositeScore.toFixed(1)} / 100
        </span>
      </p>
    </div>
  )
}

export default function QualityInvesting() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Quality Factor Investing
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Quality investing systematically selects companies with superior profitability,
        earnings stability, and financial strength. In the Indian market, the quality factor
        has historically delivered strong risk-adjusted returns, particularly during market
        drawdowns. The Nifty 200 Quality 30 index captures this premium by selecting
        NSE-listed companies based on ROE, earnings growth variability, and leverage.
      </p>

      <DefinitionBlock
        title="Quality Factor"
        label="Definition 11.8"
        definition="The quality factor is a systematic equity risk factor that captures the return premium associated with companies exhibiting high profitability (ROE, ROA, ROIC), low leverage (Debt/Equity), stable earnings, low accruals, and high gross margins. Quality stocks are expected to earn excess returns because the market underprices the persistence of high-quality fundamentals."
        notation="Q_i = \sum_{k=1}^{K} w_k \cdot \text{rank}(q_{i,k})"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Profitability Metrics
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The primary profitability metrics used in quality screening of NSE-listed stocks:
      </p>

      <BlockMath math="ROE = \frac{\text{Net Income}}{\text{Average Shareholders' Equity}}" />

      <BlockMath math="ROIC = \frac{NOPAT}{\text{Invested Capital}} = \frac{EBIT(1-\tau)}{E + D - \text{Cash}}" />

      <BlockMath math="\text{Gross Profitability} = \frac{\text{Revenue} - \text{COGS}}{\text{Total Assets}}" />

      <TheoremBlock
        title="Novy-Marx Profitability Premium"
        label="Theorem 11.4"
        statement="Gross profitability (GP/Assets) predicts cross-sectional stock returns with similar power to book-to-market (the value factor). Controlling for value, profitable firms earn significantly higher returns: E[R_{high-GP}] - E[R_{low-GP}] > 0 even after controlling for size, value, and momentum."
        proof="Empirically validated using Fama-MacBeth regressions on Indian stocks. The quality premium in India (Nifty 200 Quality 30 vs Nifty 200) has averaged 2-4% annually with lower drawdowns, consistent with the global evidence by Novy-Marx (2013) and Asness, Frazzini, and Pedersen (2019)."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Earnings Quality and Accruals
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The accruals ratio measures the gap between reported earnings and cash flow,
        serving as a red flag for earnings manipulation:
      </p>

      <BlockMath math="\text{Accruals Ratio} = \frac{\text{Net Income} - \text{CFO}}{\text{Total Assets}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Companies with high accruals tend to underperform as accruals reverse. This is
        particularly relevant in the Indian market where SEBI has flagged accounting
        quality concerns in certain sectors. The Beneish M-Score identifies potential
        earnings manipulation:
      </p>

      <BlockMath math="M = -4.84 + 0.92 \cdot DSRI + 0.528 \cdot GMI + 0.404 \cdot AQI + 0.892 \cdot SGI" />

      <BlockMath math="+ 0.115 \cdot DEPI - 0.172 \cdot SGAI + 4.679 \cdot TATA - 0.327 \cdot LVGI" />

      <NoteBlock title="Quality Investing in India" type="historical">
        <ul className="space-y-1 text-sm">
          <li><strong>Nifty 200 Quality 30:</strong> Selects 30 stocks from Nifty 200 based on ROE,
            D/E ratio, and EPS growth variability over 5 years</li>
          <li><strong>SEBI Categorization:</strong> Quality-focused mutual funds typically classify
            as thematic/sectoral under SEBI MF regulations</li>
          <li><strong>Indian Quality Stocks:</strong> Asian Paints, HDFC Bank, TCS, Nestle India
            consistently rank high on quality metrics</li>
          <li><strong>Zerodha Smallcase:</strong> Quality-factor portfolios available as smallcases
            for systematic quality investing</li>
        </ul>
      </NoteBlock>

      <InteractiveQualityScore />

      <PythonCode
        title="quality_factor_screen.py"
        runnable
        code={`import numpy as np

class QualityScreener:
    """Quality factor screening for NSE/BSE stocks."""

    WEIGHTS = {
        'roe': 0.30,
        'leverage': 0.20,
        'stability': 0.20,
        'accruals': 0.15,
        'margins': 0.15
    }

    def __init__(self):
        self.stocks = []

    def add_stock(self, name, roe, debt_equity, roe_std,
                  accruals_ratio, gross_margin):
        self.stocks.append({
            'name': name, 'roe': roe, 'de': debt_equity,
            'roe_std': roe_std, 'accruals': accruals_ratio,
            'gross_margin': gross_margin
        })

    def _score_metric(self, value, best, worst):
        """Normalize metric to 0-100 scale."""
        if best == worst:
            return 50.0
        score = (value - worst) / (best - worst) * 100
        return max(0, min(100, score))

    def compute_scores(self):
        results = []
        for s in self.stocks:
            roe_s = self._score_metric(s['roe'], 30, 0)
            lev_s = self._score_metric(s['de'], 0, 3)
            stab_s = self._score_metric(s['roe_std'], 0, 15)
            accr_s = self._score_metric(s['accruals'], 0, 20)
            marg_s = self._score_metric(s['gross_margin'], 60, 10)

            composite = (roe_s * self.WEIGHTS['roe'] +
                        lev_s * self.WEIGHTS['leverage'] +
                        stab_s * self.WEIGHTS['stability'] +
                        accr_s * self.WEIGHTS['accruals'] +
                        marg_s * self.WEIGHTS['margins'])

            results.append({
                'name': s['name'],
                'roe_score': roe_s,
                'leverage_score': lev_s,
                'stability_score': stab_s,
                'accrual_score': accr_s,
                'margin_score': marg_s,
                'composite': composite
            })
        return sorted(results, key=lambda x: -x['composite'])

# Nifty 50 quality screen
screener = QualityScreener()
screener.add_stock("TCS",          roe=38, debt_equity=0.05, roe_std=2.1, accruals_ratio=3, gross_margin=50)
screener.add_stock("Asian Paints", roe=26, debt_equity=0.35, roe_std=2.8, accruals_ratio=4, gross_margin=42)
screener.add_stock("HDFC Bank",    roe=17, debt_equity=0.90, roe_std=1.5, accruals_ratio=5, gross_margin=35)
screener.add_stock("Tata Steel",   roe=12, debt_equity=1.20, roe_std=8.5, accruals_ratio=9, gross_margin=22)
screener.add_stock("ITC",          roe=25, debt_equity=0.01, roe_std=2.0, accruals_ratio=2, gross_margin=55)
screener.add_stock("SBI",          roe=13, debt_equity=1.50, roe_std=5.2, accruals_ratio=8, gross_margin=28)
screener.add_stock("Infosys",      roe=30, debt_equity=0.10, roe_std=2.5, accruals_ratio=3, gross_margin=48)
screener.add_stock("Reliance",     roe=10, debt_equity=0.80, roe_std=3.5, accruals_ratio=7, gross_margin=30)

results = screener.compute_scores()

print("=" * 70)
print("  Quality Factor Screening - NSE Large-Cap Stocks")
print("=" * 70)
print(f"{'Rank':<5} {'Stock':<15} {'ROE':>5} {'Lev':>5} {'Stab':>5} "
      f"{'Accr':>5} {'Marg':>5} {'Score':>7}")
print("-" * 70)
for i, r in enumerate(results):
    print(f"{i+1:<5} {r['name']:<15} {r['roe_score']:>5.0f} "
          f"{r['leverage_score']:>5.0f} {r['stability_score']:>5.0f} "
          f"{r['accrual_score']:>5.0f} {r['margin_score']:>5.0f} "
          f"{r['composite']:>7.1f}")

print("\\nTop Quality Quintile:")
top = [r for r in results if r['composite'] >= results[1]['composite']]
for r in top:
    print(f"  {r['name']}: {r['composite']:.1f}")`}
      />

      <ExampleBlock
        title="Quality Score for Nestle India"
        difficulty="beginner"
        problem="Nestle India has ROE = 95%, Debt/Equity = 0.02, ROE std = 8%, Accruals ratio = 2%, Gross Margin = 55%. Compute the quality composite score using the standard weights."
        solution={[
          {
            step: 'Score each metric (0-100 scale)',
            formula: 'ROE: \\min(95/25 \\times 100, 100) = 100',
            explanation: 'ROE is exceptionally high due to low equity base (high leverage through payouts).',
          },
          {
            step: 'Score leverage and stability',
            formula: 'Leverage: (2-0.02)/2 \\times 100 = 99.0,\\quad Stability: (10-8)/10 \\times 100 = 20.0',
            explanation: 'Very low debt but moderate ROE volatility (inherent in FMCG cyclicality).',
          },
          {
            step: 'Score accruals and margins',
            formula: 'Accruals: (15-2)/15 \\times 100 = 86.7,\\quad Margins: 55/50 \\times 100 = 100',
            explanation: 'Low accruals indicate high earnings quality. Strong pricing power reflected in margins.',
          },
          {
            step: 'Compute weighted composite',
            formula: 'Q = 0.3(100) + 0.2(99) + 0.2(20) + 0.15(86.7) + 0.15(100) = 81.8',
            explanation: 'High quality score of 81.8/100, dragged slightly by ROE volatility. Nestle India is a quintessential quality stock on NSE.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Quality factor investing provides a systematic framework for identifying
          companies with durable competitive advantages. In the Indian context, quality
          stocks (high ROE, low leverage, stable earnings) have historically outperformed
          during Nifty drawdowns, offering a defensive alpha source. Combine quality
          screening with value metrics to avoid overpaying for quality -- the most
          effective strategy pairs high quality scores with reasonable valuations.
        </p>
      </NoteBlock>
    </div>
  )
}
