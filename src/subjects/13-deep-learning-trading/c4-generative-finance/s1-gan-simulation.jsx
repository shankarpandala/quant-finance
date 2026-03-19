import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveViz() {
  const [noiseScale, setNoiseScale] = useState(1.0)
  const [nSamples, setNSamples] = useState(50)
  const realMean = 0.05; const realStd = 1.5; const genMean = realMean * 0.9; const genStd = realStd * noiseScale
  const wasserstein = Math.abs(realMean - genMean) + Math.abs(realStd - genStd) * 0.5
  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">Interactive: GAN Market Simulation</h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Compare generated vs real Nifty return distributions.</p>
      <div className="mb-4 grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400"><span>Generator Noise Scale = {noiseScale.toFixed(1)}</span><input type="range" min="0.5" max="2" step="0.1" value={noiseScale} onChange={e => setNoiseScale(parseFloat(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" /></label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400"><span>Samples = {nSamples}</span><input type="range" min="20" max="200" step="10" value={nSamples} onChange={e => setNSamples(parseInt(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" /></label>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-900/30"><span className="text-gray-500">Real: N({realMean}, {realStd})</span><p className="text-sm font-bold text-blue-600">Nifty Daily</p></div>
        <div className="rounded-lg bg-green-50 p-2 dark:bg-green-900/30"><span className="text-gray-500">Generated: N({genMean.toFixed(2)}, {genStd.toFixed(1)})</span><p className="text-sm font-bold text-green-600">GAN Output</p></div>
        <div className="rounded-lg bg-amber-50 p-2 dark:bg-amber-900/30"><span className="text-gray-500">Wasserstein Dist</span><p className="text-sm font-bold text-amber-600">{wasserstein.toFixed(3)}</p></div>
      </div>
    </div>
  )
}

export default function GANSimulation() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">GANs for Market Simulation</h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Generative Adversarial Networks learn to generate realistic synthetic financial data by training a generator against a discriminator. For Indian markets, GANs can produce synthetic Nifty return scenarios that preserve the statistical properties of real data -- fat tails, volatility clustering, and cross-asset correlations -- enabling robust strategy backtesting and risk assessment.</p>

      <DefinitionBlock title="Generative Adversarial Network (GAN)" label="Definition 13.10" definition="A GAN consists of a generator G that transforms random noise z ~ p(z) into synthetic data G(z), and a discriminator D that classifies data as real or generated. Training is a minimax game: the generator learns to fool the discriminator, while the discriminator learns to distinguish real from fake data." notation="\min_G \max_D V(D, G) = E_{x \sim p_{data}}[\log D(x)] + E_{z \sim p_z}[\log(1 - D(G(z)))]" />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Financial GAN Architecture</h3>
      <BlockMath math="G: z \sim \mathcal{N}(0, I_d) \mapsto \hat{r} \in \mathbb{R}^T \quad \text{(synthetic return path)}" />
      <BlockMath math="D: r \in \mathbb{R}^T \mapsto [0, 1] \quad \text{(probability of being real)}" />
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">The Wasserstein GAN (WGAN) objective is more stable for financial data:</p>
      <BlockMath math="\min_G \max_{D \in \mathcal{D}} E_{x \sim p_{data}}[D(x)] - E_{z \sim p_z}[D(G(z))]" />

      <TheoremBlock title="Wasserstein Distance for Financial Distributions" label="Theorem 13.10" statement="The Wasserstein-1 distance between two return distributions P and Q equals the minimum expected cost of transporting mass from P to Q: W_1(P, Q) = inf_{gamma} E_{(x,y) sim gamma}[|x - y|]. For financial distributions, W_1 captures differences in mean, variance, skewness, and tail behavior simultaneously." proof="By the Kantorovich-Rubinstein duality: W_1(P, Q) = sup_{||f||_L leq 1} E_P[f(X)] - E_Q[f(X)]. WGAN's critic approximates this supremum via a neural network with gradient penalty to enforce the Lipschitz constraint." />

      <NoteBlock title="GAN Applications for Indian Markets" type="tip">
        <ul className="space-y-1 text-sm">
          <li><strong>Stress Testing:</strong> Generate extreme Nifty scenarios (worse than 2008, COVID) for portfolio stress tests</li>
          <li><strong>Data Augmentation:</strong> Augment limited Indian mid-cap data for ML training</li>
          <li><strong>Tail Risk:</strong> GANs capture fat tails better than parametric models (GBM)</li>
          <li><strong>Multi-asset:</strong> Joint generation of Nifty + Bank Nifty + VIX preserving correlations</li>
        </ul>
      </NoteBlock>

      <InteractiveViz />

      <PythonCode title="gan_simulation.py" runnable code={`import numpy as np

class FinancialGAN:
    """Simple GAN for generating synthetic Nifty returns."""
    def __init__(self, seq_length, noise_dim=16, hidden=32):
        self.seq_len = seq_length
        self.noise_dim = noise_dim
        self.G_W1 = np.random.randn(hidden, noise_dim) * 0.1
        self.G_W2 = np.random.randn(seq_length, hidden) * 0.1
        self.D_W1 = np.random.randn(hidden, seq_length) * 0.1
        self.D_W2 = np.random.randn(1, hidden) * 0.1

    def generate(self, n_samples):
        z = np.random.randn(n_samples, self.noise_dim)
        h = np.maximum(z @ self.G_W1.T, 0)
        fake = np.tanh(h @ self.G_W2.T) * 0.03
        return fake

    def discriminate(self, x):
        h = np.maximum(x @ self.D_W1.T, 0)
        score = 1 / (1 + np.exp(-(h @ self.D_W2.T)))
        return score.flatten()

    def compute_statistics(self, returns):
        daily = returns
        stats = {
            'mean': np.mean(daily) * 252 * 100,
            'std': np.std(daily) * np.sqrt(252) * 100,
            'skew': self._skewness(daily.flatten()),
            'kurtosis': self._kurtosis(daily.flatten()),
            'max_dd': self._max_drawdown(daily),
        }
        return stats

    def _skewness(self, x):
        mu = np.mean(x)
        sigma = np.std(x)
        return np.mean(((x - mu) / sigma) ** 3) if sigma > 0 else 0

    def _kurtosis(self, x):
        mu = np.mean(x)
        sigma = np.std(x)
        return np.mean(((x - mu) / sigma) ** 4) if sigma > 0 else 0

    def _max_drawdown(self, returns):
        prices = np.cumprod(1 + returns.mean(axis=0) if returns.ndim > 1 else 1 + returns)
        peak = np.maximum.accumulate(prices)
        dd = (prices - peak) / peak
        return np.min(dd) * 100

# Real Nifty data simulation
np.random.seed(42)
n_days = 252
real_returns = np.random.normal(0.0004, 0.014, (100, n_days))
# Add fat tails
for i in range(100):
    n_jumps = np.random.poisson(3)
    jump_days = np.random.choice(n_days, n_jumps, replace=False)
    real_returns[i, jump_days] += np.random.normal(0, 0.04, n_jumps)

# Generate synthetic data
gan = FinancialGAN(seq_length=n_days, noise_dim=32, hidden=64)
fake_returns = gan.generate(100)

# Compare statistics
real_stats = gan.compute_statistics(real_returns)
fake_stats = gan.compute_statistics(fake_returns)

print("=" * 55)
print("  GAN Market Simulation - Nifty 50 Returns")
print("=" * 55)
print(f"\\nGenerated {100} synthetic return paths of {n_days} days")
print(f"\\n{'Statistic':<20} {'Real':>10} {'GAN':>10} {'Match':>8}")
print("-" * 50)
for stat in ['mean', 'std', 'skew', 'kurtosis', 'max_dd']:
    r_val = real_stats[stat]
    f_val = fake_stats[stat]
    match = abs(r_val - f_val) / (abs(r_val) + 1e-6) * 100
    quality = 'GOOD' if match < 30 else ('FAIR' if match < 60 else 'POOR')
    print(f"  {stat:<18} {r_val:>10.2f} {f_val:>10.2f} {quality:>8}")

print(f"\\nNote: Untrained GAN produces poor matches.")
print(f"After 10K+ training iterations, statistics converge.")
print(f"Use WGAN-GP for stable training on financial data.")`} />

      <ExampleBlock title="Validating GAN-Generated Nifty Scenarios" difficulty="intermediate"
        problem="Real Nifty daily returns have: mean=0.05%, std=1.4%, skew=-0.3, kurtosis=5.2. GAN output has: mean=0.04%, std=1.5%, skew=-0.1, kurtosis=3.8. Is the GAN capturing tail risk?"
        solution={[
          { step: 'Compare first moments', formula: '\\text{Mean: } 0.04 \\approx 0.05 \\checkmark,\\quad \\text{Std: } 1.5 \\approx 1.4 \\checkmark', explanation: 'Mean and standard deviation are well-matched.' },
          { step: 'Assess tail properties', formula: '\\text{Kurtosis: } 3.8 < 5.2 \\Rightarrow \\text{Under-generating tails}', explanation: 'Real Nifty has excess kurtosis of 5.2 (fat tails), but GAN produces only 3.8 (closer to normal). The GAN is not generating enough extreme events.' },
          { step: 'Recommendation', formula: '\\text{Add jump-diffusion component or use WGAN-GP}', explanation: 'The GAN needs architectural improvements to capture fat tails: add a conditional jump component, use WGAN with gradient penalty for more stable tail generation, or mix GAN output with a jump-diffusion model.' },
        ]} />

      <NoteBlock title="Key Takeaway" type="tip"><p>GANs generate realistic synthetic financial data that preserves the complex statistical properties of real Nifty returns -- fat tails, volatility clustering, and cross-asset correlations. This enables unlimited scenario generation for stress testing, data augmentation for ML models, and risk assessment beyond historical experience. Use WGAN-GP for stable training and validate generated scenarios against real Nifty statistics including higher moments and tail behavior.</p></NoteBlock>
    </div>
  )
}
