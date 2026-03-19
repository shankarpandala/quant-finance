import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractivePINModel() {
  const [alphaRate, setAlphaRate] = useState(0.3)
  const [delta, setDelta] = useState(0.5)
  const [epsilonBuy, setEpsilonBuy] = useState(50)
  const [epsilonSell, setEpsilonSell] = useState(50)
  const [muRate, setMuRate] = useState(40)

  const expectedBuys = alphaRate * delta * muRate + epsilonBuy
  const expectedSells = alphaRate * (1 - delta) * muRate + epsilonSell
  const pin = (alphaRate * muRate) / (alphaRate * muRate + epsilonBuy + epsilonSell)

  const buyBar = expectedBuys * 2
  const sellBar = expectedSells * 2
  const maxBar = Math.max(buyBar, sellBar, 1)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: PIN (Probability of Informed Trading)
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust the parameters of the Easley-Kiefer-O'Hara-Paperman model to compute
        the PIN for an NSE-listed stock.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math={`\\alpha = ${alphaRate.toFixed(2)}`} /></span>
          <input type="range" min="0" max="1" step="0.05" value={alphaRate}
            onChange={e => setAlphaRate(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math={`\\delta = ${delta.toFixed(2)}`} /></span>
          <input type="range" min="0" max="1" step="0.05" value={delta}
            onChange={e => setDelta(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math={`\\varepsilon_b = ${epsilonBuy}`} /></span>
          <input type="range" min="10" max="200" step="5" value={epsilonBuy}
            onChange={e => setEpsilonBuy(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math={`\\varepsilon_s = ${epsilonSell}`} /></span>
          <input type="range" min="10" max="200" step="5" value={epsilonSell}
            onChange={e => setEpsilonSell(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math={`\\mu = ${muRate}`} /></span>
          <input type="range" min="5" max="100" step="5" value={muRate}
            onChange={e => setMuRate(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 500 150" className="w-full max-w-lg mx-auto block" aria-label="PIN model visualization">
        {/* Buy/Sell bars */}
        <rect x="80" y="20" width={buyBar / maxBar * 300} height="35" fill="#4ade80" opacity="0.7" rx="4" />
        <text x="70" y="42" textAnchor="end" className="text-[10px] font-semibold" fill="#16a34a">Buys</text>
        <text x={90 + buyBar / maxBar * 300} y="42" className="text-[10px]" fill="#374151">
          E[B] = {expectedBuys.toFixed(1)}
        </text>

        <rect x="80" y="65" width={sellBar / maxBar * 300} height="35" fill="#f87171" opacity="0.7" rx="4" />
        <text x="70" y="87" textAnchor="end" className="text-[10px] font-semibold" fill="#dc2626">Sells</text>
        <text x={90 + sellBar / maxBar * 300} y="87" className="text-[10px]" fill="#374151">
          E[S] = {expectedSells.toFixed(1)}
        </text>

        {/* PIN display */}
        <rect x="80" y="115" width={pin * 300} height="20" fill="#6366f1" opacity="0.7" rx="4" />
        <text x="70" y="129" textAnchor="end" className="text-[10px] font-bold" fill="#4338ca">PIN</text>
        <text x={90 + pin * 300} y="129" className="text-[11px] font-bold" fill="#4338ca">
          {(pin * 100).toFixed(1)}%
        </text>
      </svg>

      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        PIN = {(pin * 100).toFixed(1)}% --{' '}
        <span className={`font-semibold ${pin > 0.3 ? 'text-red-500' : pin > 0.15 ? 'text-amber-600' : 'text-green-600'}`}>
          {pin > 0.3 ? 'High informed trading risk' : pin > 0.15 ? 'Moderate information asymmetry' : 'Low adverse selection'}
        </span>
      </p>
    </div>
  )
}

export default function InformationModels() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Information-Based Trading Models
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Information models in market microstructure quantify the degree to which
        trades are driven by private information versus noise. The PIN model
        (Probability of Informed Trading) and its extensions are widely used
        to measure information asymmetry in Indian markets, particularly for
        assessing adverse selection risk on NSE and BSE.
      </p>

      <DefinitionBlock
        title="Probability of Informed Trading (PIN)"
        label="Definition 2.1"
        definition="The PIN is the unconditional probability that a randomly selected trade comes from an informed trader. It is estimated from the structural parameters of the Easley-Kiefer-O'Hara-Paperman (EKOP) model using daily buy and sell volume data classified via tick rules or Lee-Ready algorithm."
        notation={<><InlineMath math="\text{PIN} = \frac{\alpha \mu}{\alpha \mu + \varepsilon_b + \varepsilon_s}" /> where <InlineMath math="\alpha" /> is the probability of an information event, <InlineMath math="\mu" /> is the informed arrival rate, and <InlineMath math="\varepsilon_b, \varepsilon_s" /> are uninformed buy/sell rates.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The EKOP Sequential Trade Model
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The model assumes a tree structure for each trading day: with probability{' '}
        <InlineMath math="\alpha" /> an information event occurs (good news with probability{' '}
        <InlineMath math="\delta" />, bad news with <InlineMath math="1 - \delta" />). The
        likelihood function for observed daily buy/sell counts is:
      </p>

      <BlockMath math="L(\theta | B, S) = (1-\alpha) f(B|\varepsilon_b) f(S|\varepsilon_s) + \alpha\delta f(B|\varepsilon_b + \mu) f(S|\varepsilon_s) + \alpha(1-\delta) f(B|\varepsilon_b) f(S|\varepsilon_s + \mu)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="f(n|\lambda) = e^{-\lambda}\lambda^n / n!" /> is the Poisson
        probability and <InlineMath math="\theta = (\alpha, \delta, \varepsilon_b, \varepsilon_s, \mu)" />.
      </p>

      <TheoremBlock
        title="PIN and Bid-Ask Spread Relationship"
        label="Theorem 2.1"
        statement={<>The adverse selection component of the bid-ask spread is proportional to the PIN: <BlockMath math="\text{Spread}_{\text{AS}} = \frac{\alpha \mu}{\alpha \mu + \varepsilon_b + \varepsilon_s} \cdot (V_H - V_L) = \text{PIN} \cdot \Delta V" /> For NIFTY 50 stocks, the adverse selection component typically accounts for 30--50% of the total spread, with the remainder being order processing and inventory costs.</>}
        proof={<>The market maker's expected loss per trade due to informed trading equals the probability of facing an informed trader times the expected information advantage. In the competitive market maker framework: <BlockMath math="a - b = \frac{\alpha\mu}{\alpha\mu + \varepsilon_b + \varepsilon_s}(V_H - V_L) + \text{inventory cost} + \text{processing cost}" /> Regression analysis on NSE data confirms <InlineMath math="R^2 \approx 0.45" /> for PIN predicting the adverse selection spread component.</>}
      />

      <InteractivePINModel />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Volume-Synchronized Probability of Informed Trading (VPIN)
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        VPIN is a real-time, model-free alternative to PIN that uses volume buckets
        instead of time intervals. It is particularly useful for monitoring toxicity
        on NSE in real-time:
      </p>

      <BlockMath math="\text{VPIN} = \frac{\sum_{\tau=1}^{n} |V_\tau^B - V_\tau^S|}{n \cdot V_{\text{bucket}}}" />

      <PythonCode
        title="pin_estimation.py"
        runnable
        code={`import numpy as np
from scipy.optimize import minimize

class PINEstimator:
    """Estimate PIN from daily buy/sell volume data."""

    @staticmethod
    def log_likelihood(params, buys, sells):
        """EKOP log-likelihood function."""
        alpha, delta, eps_b, eps_s, mu = params
        if any(p <= 0 for p in [alpha, eps_b, eps_s, mu]) or alpha > 1 or delta > 1:
            return 1e10

        ll = 0
        for b, s in zip(buys, sells):
            # Three regimes: no event, good news, bad news
            term1 = (1 - alpha) * _poisson_ll(b, eps_b) * _poisson_ll(s, eps_s)
            term2 = alpha * delta * _poisson_ll(b, eps_b + mu) * _poisson_ll(s, eps_s)
            term3 = alpha * (1 - delta) * _poisson_ll(b, eps_b) * _poisson_ll(s, eps_s + mu)
            total = term1 + term2 + term3
            ll += np.log(max(total, 1e-300))
        return -ll  # minimize negative log-likelihood

    def estimate(self, buys, sells):
        """MLE estimation of PIN parameters."""
        # Initial guess
        avg_b, avg_s = np.mean(buys), np.mean(sells)
        x0 = [0.3, 0.5, avg_b * 0.7, avg_s * 0.7, max(avg_b, avg_s) * 0.3]

        result = minimize(
            self.log_likelihood, x0, args=(buys, sells),
            method='Nelder-Mead',
            options={'maxiter': 5000, 'xatol': 1e-6}
        )

        alpha, delta, eps_b, eps_s, mu = result.x
        pin = alpha * mu / (alpha * mu + eps_b + eps_s)
        return {
            'alpha': alpha, 'delta': delta,
            'eps_buy': eps_b, 'eps_sell': eps_s, 'mu': mu,
            'pin': pin, 'converged': result.success
        }

def _poisson_ll(k, lam):
    """Poisson probability (numerically stable)."""
    if lam <= 0:
        return 1e-300
    return np.exp(-lam + k * np.log(lam) - sum(np.log(range(1, int(k) + 1))))

def compute_vpin(trades, bucket_size=50):
    """Volume-synchronized PIN computation."""
    n = len(trades) // bucket_size
    if n == 0:
        return 0
    buy_vols = []
    sell_vols = []
    for i in range(n):
        bucket = trades[i * bucket_size:(i + 1) * bucket_size]
        bv = sum(t['volume'] for t in bucket if t['side'] == 'buy')
        sv = sum(t['volume'] for t in bucket if t['side'] == 'sell')
        buy_vols.append(bv)
        sell_vols.append(sv)
    imbalances = [abs(b - s) for b, s in zip(buy_vols, sell_vols)]
    total_vol = sum(b + s for b, s in zip(buy_vols, sell_vols))
    return sum(imbalances) / total_vol if total_vol > 0 else 0

# Simulate NSE trading data
np.random.seed(42)
n_days = 60

# HDFC Bank: low information asymmetry (large cap)
buys_hdfc = np.random.poisson(120, n_days)
sells_hdfc = np.random.poisson(110, n_days)
# Add informed trading days
info_days = np.random.random(n_days) < 0.2
buys_hdfc[info_days] += np.random.poisson(30, sum(info_days))

# Small-cap stock: higher information asymmetry
buys_small = np.random.poisson(30, n_days)
sells_small = np.random.poisson(28, n_days)
info_days_s = np.random.random(n_days) < 0.4
buys_small[info_days_s] += np.random.poisson(25, sum(info_days_s))

estimator = PINEstimator()

print("=" * 55)
print("PIN ESTIMATION: NSE STOCKS")
print("=" * 55)
for name, buys, sells in [("HDFC Bank (Large Cap)", buys_hdfc, sells_hdfc),
                           ("Small Cap XYZ", buys_small, sells_small)]:
    result = estimator.estimate(buys, sells)
    print(f"\\n{name}:")
    print(f"  Alpha (info event prob): {result['alpha']:.3f}")
    print(f"  Mu (informed rate):      {result['mu']:.1f}")
    print(f"  Eps_buy (uninformed):    {result['eps_buy']:.1f}")
    print(f"  Eps_sell (uninformed):   {result['eps_sell']:.1f}")
    print(f"  PIN:                     {result['pin']:.1%}")
    risk = "HIGH" if result['pin'] > 0.3 else "MODERATE" if result['pin'] > 0.15 else "LOW"
    print(f"  Risk Level:              {risk}")`}
      />

      <ExampleBlock
        title="Computing PIN for an NSE Mid-Cap Stock"
        difficulty="intermediate"
        problem="A mid-cap NSE stock has estimated parameters: information event probability $\\alpha = 0.35$, informed arrival rate $\\mu = 45$ orders/day, uninformed buy rate $\\varepsilon_b = 60$, uninformed sell rate $\\varepsilon_s = 55$. Compute the PIN and the expected daily buy/sell imbalance on an informed day."
        solution={[
          {
            step: 'Compute PIN',
            formula: '\\text{PIN} = \\frac{0.35 \\times 45}{0.35 \\times 45 + 60 + 55} = \\frac{15.75}{130.75} = 0.1204',
            explanation: 'About 12% of trades come from informed participants.',
          },
          {
            step: 'Expected buys on good-news day',
            formula: 'E[B | \\text{good}] = \\varepsilon_b + \\mu = 60 + 45 = 105',
          },
          {
            step: 'Expected sells on good-news day',
            formula: 'E[S | \\text{good}] = \\varepsilon_s = 55',
          },
          {
            step: 'Expected imbalance',
            formula: 'E[B - S | \\text{good}] = 105 - 55 = 50 \\text{ orders}',
            explanation: 'On informed-buying days, there is a 50-order buy surplus above normal levels, which a market maker can detect as a signal of informed activity.',
          },
        ]}
      />

      <NoteBlock title="PIN in Indian Regulatory Context" type="warning">
        <p>
          SEBI monitors for unusual trading patterns that may indicate insider trading,
          using metrics related to PIN. The SEBI (Prohibition of Insider Trading)
          Regulations, 2015 require companies to maintain insider lists and trading
          windows. Elevated PIN readings before corporate announcements can trigger
          SEBI surveillance alerts. Research on NSE data shows that PIN increases
          significantly 2--5 days before major corporate announcements for stocks
          with weaker corporate governance.
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
          Information-based models like PIN and VPIN provide quantitative measures of
          adverse selection risk that are essential for market making, execution
          optimization, and regulatory surveillance. In Indian markets, PIN varies
          significantly across market-cap segments, with small-caps exhibiting
          2--3x higher PIN than NIFTY 50 constituents, reflecting greater
          information asymmetry and lower analyst coverage.
        </p>
      </NoteBlock>
    </div>
  )
}
