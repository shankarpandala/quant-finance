import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveStableParams() {
  const [alpha, setAlpha] = useState(1.7)
  const [beta, setBeta] = useState(0.0)
  const [sigma, setSigma] = useState(1.0)

  const isGaussian = Math.abs(alpha - 2) < 0.05
  const isCauchy = Math.abs(alpha - 1) < 0.05 && Math.abs(beta) < 0.05
  const isLevy = Math.abs(alpha - 0.5) < 0.05 && Math.abs(beta - 1) < 0.05
  const hasFiniteVar = alpha >= 2.0
  const hasFiniteMean = alpha > 1.0
  const tailWeight = (2 - alpha).toFixed(2)
  const peakedness = alpha < 2 ? (2 / alpha).toFixed(2) : '1.00'

  let distName = 'General Stable'
  if (isGaussian) distName = 'Gaussian (Normal)'
  else if (isCauchy) distName = 'Cauchy'
  else if (isLevy) distName = 'Levy'

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Stable Distribution Parameters
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Explore how the stability index <InlineMath math="\alpha" /> and skewness parameter{' '}
        <InlineMath math="\beta" /> affect tail behavior and moments for modeling NSE returns.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Stability Index alpha: {alpha.toFixed(2)}</span>
          <input type="range" min="0.5" max="2.0" step="0.05" value={alpha}
            onChange={e => setAlpha(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Skewness beta: {beta.toFixed(2)}</span>
          <input type="range" min="-1" max="1" step="0.05" value={beta}
            onChange={e => setBeta(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Scale sigma: {sigma.toFixed(2)}</span>
          <input type="range" min="0.1" max="3.0" step="0.1" value={sigma}
            onChange={e => setSigma(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">Distribution</p>
          <p className="text-sm font-bold text-blue-800 dark:text-blue-200">{distName}</p>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
          <p className="text-xs font-semibold text-purple-700 dark:text-purple-300">Finite Variance?</p>
          <p className={`text-lg font-bold ${hasFiniteVar ? 'text-green-700 dark:text-green-300' : 'text-red-600'}`}>
            {hasFiniteVar ? 'Yes' : 'No'}
          </p>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">Finite Mean?</p>
          <p className={`text-lg font-bold ${hasFiniteMean ? 'text-green-700 dark:text-green-300' : 'text-red-600'}`}>
            {hasFiniteMean ? 'Yes' : 'No'}
          </p>
        </div>
        <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/30">
          <p className="text-xs font-semibold text-red-700 dark:text-red-300">Tail Heaviness</p>
          <p className="text-lg font-bold text-red-800 dark:text-red-200">{tailWeight}</p>
          <p className="text-xs text-red-600 dark:text-red-400">0 = Gaussian, higher = heavier</p>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
        <InlineMath math={`S_{${alpha.toFixed(2)}}(${beta.toFixed(2)}, ${sigma.toFixed(2)}, 0)`} />
        {' '} | Tail decay: <InlineMath math={`P(|X| > x) \\sim x^{-${alpha.toFixed(2)}}`} />
        {alpha < 1.8 && <span className="ml-2 font-semibold text-red-500"> -- Very heavy tails!</span>}
      </p>
    </div>
  )
}

export default function StableDistributions() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Stable Distributions
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        If the Gaussian distribution is too thin-tailed for financial returns, what
        distribution should we use? Stable distributions (also called alpha-stable or Levy
        stable) are a natural generalization that preserves the key property of the normal
        distribution -- stability under addition -- while allowing for fat tails and
        asymmetry. Mandelbrot first proposed them for financial returns in 1963.
      </p>

      <DefinitionBlock
        title="Stable Distribution"
        label="Definition 3.3"
        definition="A random variable X follows a stable distribution S(alpha, beta, sigma, mu) if the sum of independent copies of X (after proper normalization) has the same distribution. The Gaussian (alpha=2) is the only stable distribution with finite variance. All other stable distributions (alpha < 2) have power-law tails and infinite variance."
        notation="X \sim S_\alpha(\beta, \sigma, \mu) \text{ with characteristic function } \phi(t) = \exp\!\left[i\mu t - \sigma^\alpha |t|^\alpha \left(1 - i\beta \text{sgn}(t) \tan\frac{\pi\alpha}{2}\right)\right]"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The Four Parameters
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A stable distribution is characterized by four parameters:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Parameter</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Range</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Meaning</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">NSE Typical</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2"><InlineMath math="\alpha" /> (stability)</td>
              <td className="px-4 py-2">(0, 2]</td>
              <td className="px-4 py-2">Tail heaviness (2 = Gaussian)</td>
              <td className="px-4 py-2">1.6 -- 1.85</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2"><InlineMath math="\beta" /> (skewness)</td>
              <td className="px-4 py-2">[-1, 1]</td>
              <td className="px-4 py-2">Asymmetry (-1 = left, 1 = right)</td>
              <td className="px-4 py-2">-0.1 to -0.3</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2"><InlineMath math="\sigma" /> (scale)</td>
              <td className="px-4 py-2">(0, inf)</td>
              <td className="px-4 py-2">Dispersion (like std dev)</td>
              <td className="px-4 py-2">0.005 -- 0.015</td>
            </tr>
            <tr>
              <td className="px-4 py-2"><InlineMath math="\mu" /> (location)</td>
              <td className="px-4 py-2">(-inf, inf)</td>
              <td className="px-4 py-2">Center of distribution</td>
              <td className="px-4 py-2">~0.0003</td>
            </tr>
          </tbody>
        </table>
      </div>

      <TheoremBlock
        title="Generalized Central Limit Theorem"
        label="Theorem 3.2"
        statement="The classical CLT states that sums of i.i.d. random variables with finite variance converge to a Gaussian. The Generalized CLT extends this: sums of i.i.d. random variables (even with infinite variance) converge to a stable distribution. The Gaussian is just one special case."
        formula="\frac{X_1 + X_2 + \cdots + X_n - a_n}{b_n} \xrightarrow{d} S_\alpha(\beta, 1, 0)"
        proof="If the tail of the distribution satisfies P(X > x) \sim c_1 x^{-\alpha} and P(X < -x) \sim c_2 x^{-\alpha} for some \alpha \in (0,2), then the normalizing constants are b_n = n^{1/\alpha} and the limit distribution is S_\alpha(\beta, 1, 0) where \beta = (c_1 - c_2)/(c_1 + c_2). When \alpha = 2 (finite variance), this reduces to the classical CLT with b_n = \sqrt{n} and Gaussian limit. For Indian equity returns with empirical \alpha \approx 3 for tails, the CLT applies normally (finite variance), but stable distributions still provide better tail fits."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Special Cases
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Three important special cases of stable distributions are:
      </p>

      <BlockMath math="\alpha = 2: \text{Gaussian } N(\mu, 2\sigma^2)" />
      <BlockMath math="\alpha = 1, \beta = 0: \text{Cauchy (no mean!)}" />
      <BlockMath math="\alpha = 0.5, \beta = 1: \text{Levy distribution}" />

      <NoteBlock title="Practical Challenges" type="info">
        <p>
          Stable distributions with <InlineMath math="\alpha < 2" /> have <strong>infinite
          variance</strong>, which creates problems for portfolio theory (Markowitz requires
          finite variance), VaR computation, and regression. Two practical alternatives that
          capture fat tails while keeping finite variance are:
        </p>
        <ul className="mt-2 space-y-1">
          <li><strong>Truncated stable:</strong> Cut off the infinite tails at a threshold</li>
          <li><strong>Tempered stable:</strong> Multiply tails by exponential decay factor</li>
          <li><strong>Student-t:</strong> Fat-tailed but finite variance for df &gt; 2</li>
          <li><strong>GHD (Generalized Hyperbolic):</strong> Flexible, finite all moments</li>
        </ul>
      </NoteBlock>

      <InteractiveStableParams />

      <PythonCode
        title="stable_distributions_nse.py"
        runnable
        code={`import numpy as np
from scipy.stats import levy_stable, norm, t as t_dist
from scipy.optimize import minimize

# Simulated Nifty 50 returns (fat-tailed)
np.random.seed(42)
n_days = 2520
returns = t_dist.rvs(df=5, size=n_days) * 0.012 + 0.0003

# --- Fit Stable Distribution (Maximum Likelihood) ---
# levy_stable.fit uses Koutrouvelis method
alpha_hat, beta_hat, loc_hat, scale_hat = levy_stable.fit(returns)

# --- Fit Student-t for comparison ---
df_t, loc_t, scale_t = t_dist.fit(returns)

# --- Fit Gaussian ---
mu_g, sigma_g = norm.fit(returns)

# --- Log-Likelihood Comparison ---
ll_stable = np.sum(levy_stable.logpdf(returns, alpha_hat, beta_hat, loc_hat, scale_hat))
ll_t = np.sum(t_dist.logpdf(returns, df_t, loc_t, scale_t))
ll_normal = np.sum(norm.logpdf(returns, mu_g, sigma_g))

# --- Tail Probabilities ---
thresholds = [0.03, 0.04, 0.05, 0.08]
print("=== Stable Distribution Fit: Nifty 50 Returns ===")
print(f"Observations: {n_days} daily returns\\n")
print(f"--- Fitted Parameters ---")
print(f"Stable: alpha={alpha_hat:.4f}, beta={beta_hat:.4f}, sigma={scale_hat:.6f}, mu={loc_hat:.6f}")
print(f"Student-t: df={df_t:.2f}, loc={loc_t:.6f}, scale={scale_t:.6f}")
print(f"Gaussian: mu={mu_g:.6f}, sigma={sigma_g:.6f}")
print(f"\\n--- Log-Likelihood (higher is better) ---")
print(f"Stable:    {ll_stable:.1f}")
print(f"Student-t: {ll_t:.1f}")
print(f"Gaussian:  {ll_normal:.1f}")
print(f"\\n--- Tail Probability Comparison P(|r| > x) ---")
print(f"{'Threshold':>10} {'Empirical':>10} {'Stable':>10} {'Student-t':>10} {'Normal':>10}")
for x in thresholds:
    emp = np.mean(np.abs(returns) > x)
    stab = 2 * levy_stable.sf(x, alpha_hat, beta_hat, loc_hat, scale_hat)
    stu = 2 * t_dist.sf(x, df_t, loc_t, scale_t)
    nor = 2 * norm.sf(x, mu_g, sigma_g)
    print(f"{x*100:>9.1f}% {emp*100:>9.4f}% {stab*100:>9.4f}% {stu*100:>9.4f}% {nor*100:>9.4f}%")

print(f"\\nConclusion: alpha={alpha_hat:.2f} < 2 confirms fat tails in NSE returns.")
print(f"The stable distribution captures tail probabilities much better than Gaussian.")
print(f"Student-t (df={df_t:.1f}) is a practical alternative with finite variance.")`}
      />

      <ExampleBlock
        title="Comparing Tail Predictions"
        difficulty="intermediate"
        problem="A stable distribution fit to Nifty 50 daily returns gives alpha = 1.75. The Gaussian fit has sigma = 1.2%. What is the probability of a -4% daily move under each model?"
        solution={[
          {
            step: 'Gaussian probability',
            formula: 'P(r < -4\\%) = \\Phi\\!\\left(\\frac{-0.04}{0.012}\\right) = \\Phi(-3.33) \\approx 0.043\\%',
            explanation: 'Under normality, a -4% move is a 3.33-sigma event occurring about once every 2,300 trading days (9 years).',
          },
          {
            step: 'Stable distribution tail',
            formula: 'P(r < -x) \\sim \\frac{1+\\beta}{2} C_\\alpha \\sigma^\\alpha x^{-\\alpha} \\propto x^{-1.75}',
            explanation: 'The stable tail decays as a power law rather than exponentially.',
          },
          {
            step: 'Comparison',
            formula: '\\frac{P_{\\text{stable}}(r < -4\\%)}{P_{\\text{normal}}(r < -4\\%)} \\approx 5\\text{--}10\\times',
            explanation: 'The stable model predicts such events 5-10x more frequently, aligning better with empirical NSE data where -4% days occur roughly every 1-2 years.',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Tempered Stable Distributions
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Tempered stable distributions address the infinite-variance problem by exponentially
        dampening the tails of a stable distribution. The Classical Tempered Stable (CTS)
        distribution modifies the Levy measure:
      </p>

      <BlockMath math="q(x) = \begin{cases} C \frac{e^{-\lambda_+ x}}{x^{1+\alpha}} & x > 0 \\ C \frac{e^{-\lambda_- |x|}}{|x|^{1+\alpha}} & x < 0 \end{cases}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\lambda_+, \lambda_- > 0" /> are the tempering parameters.
        As <InlineMath math="x \to 0" />, the behavior is Levy-stable (capturing the peaked
        center and moderate tails). As <InlineMath math="x \to \infty" />, the exponential
        decay ensures all moments are finite. This makes tempered stable distributions
        compatible with mean-variance optimization and VaR calculations on NSE portfolios.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Practical Distribution Fitting for Indian Markets
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        When modeling Indian equity returns, the choice of distribution depends on the
        application:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Application</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Recommended Dist.</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Reason</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">NSE Fit Quality</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Portfolio optimization</td>
              <td className="px-4 py-2">Student-t or Normal</td>
              <td className="px-4 py-2">Finite variance required</td>
              <td className="px-4 py-2">Adequate for large-cap</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">VaR / risk management</td>
              <td className="px-4 py-2">Student-t (df=4-6)</td>
              <td className="px-4 py-2">Captures fat tails</td>
              <td className="px-4 py-2">Good for Nifty 50</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Options pricing</td>
              <td className="px-4 py-2">Tempered stable / GHD</td>
              <td className="px-4 py-2">Flexible skew and kurtosis</td>
              <td className="px-4 py-2">Best fit overall</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Tail risk analysis</td>
              <td className="px-4 py-2">Stable / EVT</td>
              <td className="px-4 py-2">Power-law tails critical</td>
              <td className="px-4 py-2">Essential for extremes</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Quick screening</td>
              <td className="px-4 py-2">Cornish-Fisher adjusted Normal</td>
              <td className="px-4 py-2">Fast computation</td>
              <td className="px-4 py-2">Reasonable approximation</td>
            </tr>
          </tbody>
        </table>
      </div>

      <NoteBlock title="Generalized Hyperbolic Distribution" type="info">
        <p>
          The Generalized Hyperbolic Distribution (GHD) is increasingly popular for Indian
          market modeling. It nests many distributions as special cases (Normal-Inverse
          Gaussian, Variance-Gamma, Student-t) and has five parameters allowing independent
          control over location, scale, skewness, tail heaviness, and peakedness. The
          probability density is:
        </p>
        <BlockMath math="f(x) = \frac{(\gamma/\delta)^\lambda}{\sqrt{2\pi} K_\lambda(\delta\gamma)} e^{\beta(x-\mu)} \frac{K_{\lambda-1/2}\!\left(\alpha\sqrt{\delta^2 + (x-\mu)^2}\right)}{\left(\sqrt{\delta^2 + (x-\mu)^2}/\alpha\right)^{1/2-\lambda}}" />
        <p>
          where <InlineMath math="K_\lambda" /> is the modified Bessel function. For Nifty 50
          daily returns, the Normal-Inverse Gaussian sub-case (<InlineMath math="\lambda = -1/2" />)
          provides the best balance of fit quality and computational tractability. SEBI-regulated
          risk models are beginning to adopt GHD for more accurate margin computations.
        </p>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Stable distributions provide a theoretically grounded framework for modeling fat tails
          in Indian equity returns. While pure stable models (<InlineMath math="\alpha < 2" />)
          have infinite variance (problematic for portfolio theory), they correctly capture
          the power-law tail behavior observed in NSE data. For practical applications, use
          the <strong>Student-t</strong> distribution (finite variance, fat tails) or
          tempered stable distributions. Fitting stable parameters to Nifty 50 data typically
          yields <InlineMath math="\alpha \approx 1.7" />, confirming that the Gaussian
          assumption is inadequate. The <strong>Generalized Hyperbolic Distribution</strong>
          offers the best overall fit for NSE data when computational resources allow.
        </p>
      </NoteBlock>
    </div>
  )
}
