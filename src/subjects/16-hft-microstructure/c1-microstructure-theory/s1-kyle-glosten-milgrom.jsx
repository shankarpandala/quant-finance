import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveKyleModel() {
  const [sigmaV, setSigmaV] = useState(50)
  const [sigmaU, setSigmaU] = useState(100)
  const [numPeriods, setNumPeriods] = useState(5)

  const lambda = sigmaV / (2 * sigmaU)
  const priceImpact = lambda * 10
  const informedProfit = sigmaV * sigmaU / 2

  const periods = Array.from({ length: numPeriods }, (_, i) => {
    const t = (i + 1) / numPeriods
    const lambdaT = lambda * Math.sqrt(numPeriods)
    const infoRevealed = t
    return {
      period: i + 1,
      lambdaT: lambdaT / numPeriods,
      infoRevealed: (infoRevealed * 100).toFixed(0),
      priceVar: (sigmaV * sigmaV * infoRevealed).toFixed(0)
    }
  })

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Kyle Lambda Model
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust the fundamental volatility (<InlineMath math="\sigma_v" />), noise trader
        volume (<InlineMath math="\sigma_u" />), and trading periods to explore price
        impact dynamics on NSE.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math={`\\sigma_v = ${sigmaV}`} /> (fundamental vol)</span>
          <input type="range" min="10" max="200" step="5" value={sigmaV}
            onChange={e => setSigmaV(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math={`\\sigma_u = ${sigmaU}`} /> (noise vol)</span>
          <input type="range" min="20" max="500" step="10" value={sigmaU}
            onChange={e => setSigmaU(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Trading Periods: {numPeriods}</span>
          <input type="range" min="1" max="20" step="1" value={numPeriods}
            onChange={e => setNumPeriods(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 500 200" className="w-full max-w-lg mx-auto block" aria-label="Kyle model price impact">
        <rect x="50" y="10" width="400" height="150" fill="none" stroke="#e5e7eb" strokeWidth="1" />
        <text x="250" y="178" textAnchor="middle" className="text-[10px] fill-gray-500">Trading Period</text>
        <text x="20" y="85" textAnchor="middle" className="text-[10px] fill-gray-500" transform="rotate(-90,20,85)">Info Revealed (%)</text>

        {periods.map((p, i) => {
          const x = 70 + i * (360 / numPeriods)
          const barWidth = Math.max(10, 340 / numPeriods - 4)
          const barHeight = parseInt(p.infoRevealed) * 1.4
          return (
            <g key={i}>
              <rect x={x} y={160 - barHeight} width={barWidth} height={barHeight}
                fill="#6366f1" opacity={0.3 + 0.7 * (i / numPeriods)} rx="3" />
              <text x={x + barWidth / 2} y="170" textAnchor="middle" className="text-[8px] fill-gray-500">
                {p.period}
              </text>
              <text x={x + barWidth / 2} y={155 - barHeight} textAnchor="middle"
                className="text-[7px] fill-indigo-600">{p.infoRevealed}%</text>
            </g>
          )
        })}

        <text x="250" y="195" textAnchor="middle" className="text-[9px] fill-gray-600 dark:fill-gray-400">
          Lambda: {lambda.toFixed(4)} | Impact per 10 lots: Rs {priceImpact.toFixed(2)} | Informed Profit: Rs {informedProfit.toFixed(0)}
        </text>
      </svg>
    </div>
  )
}

export default function KyleGlostenMilgrom() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Kyle and Glosten-Milgrom Models
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The foundational models of market microstructure by Kyle (1985) and
        Glosten-Milgrom (1985) explain how prices incorporate private information
        through trading. These models are essential for understanding price formation
        on Indian exchanges (NSE/BSE), where the interplay between informed
        institutional traders and retail noise traders drives market dynamics.
      </p>

      <DefinitionBlock
        title="Kyle's Lambda (Price Impact Coefficient)"
        label="Definition 1.1"
        definition="Kyle's lambda is a measure of market illiquidity that quantifies the price impact per unit of net order flow. It represents the sensitivity of the market maker's pricing to the total order imbalance, reflecting the adverse selection cost of trading against potentially informed participants."
        notation={<>In the single-period Kyle model: <InlineMath math="\lambda = \frac{\sigma_v}{2\sigma_u}" /> where <InlineMath math="\sigma_v" /> is the standard deviation of the asset's fundamental value and <InlineMath math="\sigma_u" /> is the standard deviation of noise trading volume.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Kyle (1985) Model
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Kyle's model features three types of market participants: a single informed
        trader who knows the true value <InlineMath math="v" />, noise traders who
        submit random orders <InlineMath math="u \sim N(0, \sigma_u^2)" />, and a
        competitive market maker who sets prices efficiently.
      </p>

      <BlockMath math="v \sim N(p_0, \sigma_v^2), \quad u \sim N(0, \sigma_u^2), \quad x^* = \beta(v - p_0)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The market maker observes total order flow <InlineMath math="y = x^* + u" /> and
        sets the price as a linear function:
      </p>

      <BlockMath math="p = p_0 + \lambda y = p_0 + \lambda(x^* + u)" />

      <TheoremBlock
        title="Kyle Equilibrium"
        label="Theorem 1.1"
        statement={<>In the unique linear equilibrium of the Kyle model: <BlockMath math="\lambda = \frac{\sigma_v}{2\sigma_u}, \quad \beta = \frac{\sigma_u}{\sigma_v}" /> The informed trader's expected profit is <InlineMath math="\pi^* = \frac{\sigma_v \sigma_u}{2}" /> and exactly half of the private information is incorporated into prices through a single round of trading.</>}
        proof={<>The market maker's pricing rule must satisfy: <BlockMath math="p = \mathbb{E}[v \mid y] = p_0 + \frac{\text{Cov}(v, y)}{\text{Var}(y)} \cdot y" /> With <InlineMath math="y = \beta(v - p_0) + u" />: <BlockMath math="\frac{\text{Cov}(v, y)}{\text{Var}(y)} = \frac{\beta \sigma_v^2}{\beta^2 \sigma_v^2 + \sigma_u^2}" /> The informed trader maximizes <InlineMath math="\mathbb{E}[(v - p)x]" /> yielding the optimal trading intensity <InlineMath math="\beta = \sigma_u / \sigma_v" />. Substituting gives <InlineMath math="\lambda = \sigma_v / (2\sigma_u)" />.</>}
      />

      <InteractiveKyleModel />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Glosten-Milgrom Model
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Glosten-Milgrom uses a sequential trade framework where each trade is a single
        unit (buy or sell). The market maker posts bid-ask quotes and updates beliefs
        using Bayes' rule after each trade:
      </p>

      <BlockMath math="a_t = \mathbb{E}[v \mid \text{buy at } t] = \frac{\mu \cdot V_H \cdot \Pr(H) + (1-\mu)/2 \cdot V_H \cdot \Pr(H)}{\mu \cdot \Pr(H) + (1-\mu)/2}" />

      <BlockMath math="b_t = \mathbb{E}[v \mid \text{sell at } t]" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The bid-ask spread <InlineMath math="a - b" /> arises purely from adverse selection --
        the market maker's compensation for the risk of trading against informed participants.
      </p>

      <PythonCode
        title="microstructure_models.py"
        runnable
        code={`import numpy as np

class KyleModel:
    """Single-period Kyle (1985) model for NSE stocks."""

    def __init__(self, p0, sigma_v, sigma_u):
        self.p0 = p0      # prior price
        self.sigma_v = sigma_v  # fundamental vol
        self.sigma_u = sigma_u  # noise vol
        self.lam = sigma_v / (2 * sigma_u)
        self.beta = sigma_u / sigma_v

    def informed_order(self, v):
        """Optimal informed trader order given true value v."""
        return self.beta * (v - self.p0)

    def market_price(self, order_flow):
        """Market maker pricing function."""
        return self.p0 + self.lam * order_flow

    def simulate(self, n_simulations=1000):
        """Monte Carlo simulation of the model."""
        v = np.random.normal(self.p0, self.sigma_v, n_simulations)
        u = np.random.normal(0, self.sigma_u, n_simulations)
        x_star = self.beta * (v - self.p0)
        y = x_star + u
        p = self.p0 + self.lam * y
        profit = (v - p) * x_star
        return {
            'avg_profit': np.mean(profit),
            'theoretical_profit': self.sigma_v * self.sigma_u / 2,
            'info_revealed': np.var(p - self.p0) / self.sigma_v**2,
            'lambda': self.lam
        }

class GlostenMilgromModel:
    """Sequential trade Glosten-Milgrom model."""

    def __init__(self, v_high, v_low, prior_high, mu):
        self.v_h = v_high
        self.v_l = v_low
        self.prob_h = prior_high
        self.mu = mu  # fraction of informed traders

    def compute_quotes(self):
        """Compute bid and ask prices."""
        ph = self.prob_h
        pl = 1 - ph

        # Ask: E[v | buy order]
        pr_buy_h = self.mu + (1 - self.mu) / 2
        pr_buy_l = (1 - self.mu) / 2
        pr_buy = pr_buy_h * ph + pr_buy_l * pl
        ask = (pr_buy_h * ph * self.v_h + pr_buy_l * pl * self.v_l) / pr_buy

        # Bid: E[v | sell order]
        pr_sell_h = (1 - self.mu) / 2
        pr_sell_l = self.mu + (1 - self.mu) / 2
        pr_sell = pr_sell_h * ph + pr_sell_l * pl
        bid = (pr_sell_h * ph * self.v_h + pr_sell_l * pl * self.v_l) / pr_sell

        spread = ask - bid
        midprice = (ask + bid) / 2

        return {'bid': bid, 'ask': ask, 'spread': spread, 'midprice': midprice}

    def update_beliefs(self, is_buy):
        """Bayesian belief update after observing a trade."""
        if is_buy:
            pr_buy_h = self.mu + (1 - self.mu) / 2
            pr_buy_l = (1 - self.mu) / 2
            self.prob_h = (pr_buy_h * self.prob_h) / \\
                (pr_buy_h * self.prob_h + pr_buy_l * (1 - self.prob_h))
        else:
            pr_sell_h = (1 - self.mu) / 2
            pr_sell_l = self.mu + (1 - self.mu) / 2
            self.prob_h = (pr_sell_h * self.prob_h) / \\
                (pr_sell_h * self.prob_h + pr_sell_l * (1 - self.prob_h))

# --- Kyle Model: HDFC Bank on NSE ---
print("=" * 60)
print("KYLE MODEL: HDFC Bank (NSE)")
print("=" * 60)

kyle = KyleModel(p0=1650, sigma_v=50, sigma_u=100)
result = kyle.simulate(10000)
print(f"  Lambda (price impact):     {result['lambda']:.4f}")
print(f"  Avg informed profit:       Rs {result['avg_profit']:.2f}")
print(f"  Theoretical profit:        Rs {result['theoretical_profit']:.2f}")
print(f"  Info revealed (fraction):  {result['info_revealed']:.3f}")

# --- Glosten-Milgrom: Reliance on NSE ---
print(f"\\n{'=' * 60}")
print("GLOSTEN-MILGROM: Reliance Industries (NSE)")
print("=" * 60)

gm = GlostenMilgromModel(v_high=2800, v_low=2400, prior_high=0.5, mu=0.3)

for i in range(5):
    quotes = gm.compute_quotes()
    print(f"\\n  Round {i+1}: Bid={quotes['bid']:.2f}  Ask={quotes['ask']:.2f}  "
          f"Spread={quotes['spread']:.2f}  P(High)={gm.prob_h:.3f}")
    is_buy = np.random.random() < 0.6  # simulate trade
    gm.update_beliefs(is_buy)
    print(f"    Trade: {'BUY' if is_buy else 'SELL'} -> P(High)={gm.prob_h:.3f}")`}
      />

      <ExampleBlock
        title="Estimating Kyle's Lambda for TCS on NSE"
        difficulty="intermediate"
        problem="TCS stock has a daily fundamental volatility of Rs 35 and average daily noise trading volume standard deviation of 200,000 shares. Compute Kyle's lambda and the expected price impact of an informed order of 50,000 shares."
        solution={[
          {
            step: 'Compute lambda',
            formula: '\\lambda = \\frac{\\sigma_v}{2\\sigma_u} = \\frac{35}{2 \\times 200{,}000} = 0.0000875',
            explanation: 'Lambda is in Rs per share of order flow.',
          },
          {
            step: 'Price impact of 50,000 shares',
            formula: '\\Delta p = \\lambda \\times x = 0.0000875 \\times 50{,}000 = \\text{Rs } 4.375',
          },
          {
            step: 'Impact in basis points',
            formula: '\\text{Impact} = \\frac{4.375}{3500} \\times 10{,}000 \\approx 12.5 \\text{ bps}',
            explanation: 'Assuming TCS price of Rs 3,500, the informed order moves the price by ~12.5 basis points.',
          },
        ]}
      />

      <NoteBlock title="NSE Market Structure Context" type="historical">
        <p>
          NSE operates as a fully electronic order-driven market (unlike the dealer/specialist
          model assumed in Kyle and Glosten-Milgrom). However, the core insights about adverse
          selection and price impact remain highly relevant. In practice, Kyle's lambda is
          estimated from regression of price changes on signed order flow (the "Kyle regression")
          using tick data from NSE's co-location servers. SEBI's regulations on algorithmic
          trading (2012 circular, updated 2021) require all algo orders to have unique
          identifiers, enabling researchers to study informed vs. noise trading patterns.
        </p>
      </NoteBlock>

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
          Kyle and Glosten-Milgrom models provide the theoretical foundation for understanding
          how information gets incorporated into prices through trading. Kyle's lambda
          quantifies market depth and price impact, while Glosten-Milgrom explains the
          bid-ask spread as compensation for adverse selection. Both are essential for
          designing execution algorithms and understanding market quality on NSE.
        </p>
      </NoteBlock>
    </div>
  )
}
