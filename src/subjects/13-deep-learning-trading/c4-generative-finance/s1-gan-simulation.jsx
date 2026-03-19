import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveGANTraining() {
  const [epoch, setEpoch] = useState(50)
  const [latentDim, setLatentDim] = useState(32)
  const [seqLength, setSeqLength] = useState(50)
  const [discriminatorLR, setDiscriminatorLR] = useState(0.0002)

  const genLoss = Math.max(0.3, 3.5 * Math.exp(-epoch / 30) + 0.2 + Math.sin(epoch / 5) * 0.1)
  const discLoss = Math.max(0.4, 0.7 - 0.3 * Math.exp(-epoch / 20) + Math.cos(epoch / 7) * 0.05)
  const fid = Math.max(5, 120 * Math.exp(-epoch / 25) + latentDim * 0.05)
  const kurtosisMatch = Math.min(95, 40 + epoch * 0.8 + latentDim * 0.3)

  const maxLoss = 4
  const genPoints = Array.from({ length: Math.min(epoch, 100) }, (_, i) => ({
    x: 50 + (i / 100) * 420,
    y: 20 + (1 - Math.max(0.3, 3.5 * Math.exp(-i / 30) + 0.2) / maxLoss) * 120,
  }))
  const discPoints = Array.from({ length: Math.min(epoch, 100) }, (_, i) => ({
    x: 50 + (i / 100) * 420,
    y: 20 + (1 - Math.max(0.4, 0.7 - 0.3 * Math.exp(-i / 20)) / maxLoss) * 120,
  }))

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: TimeGAN Training Monitor
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Simulate TimeGAN training on Nifty 50 daily OHLCV data. Watch generator and
        discriminator losses converge as the model learns to produce realistic synthetic paths.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Epoch = {epoch}</span>
          <input type="range" min="1" max="100" step="1" value={epoch}
            onChange={e => setEpoch(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Latent Dim = {latentDim}</span>
          <input type="range" min="8" max="128" step="8" value={latentDim}
            onChange={e => setLatentDim(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Sequence Length = {seqLength}</span>
          <input type="range" min="10" max="100" step="5" value={seqLength}
            onChange={e => setSeqLength(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Disc LR = {discriminatorLR.toFixed(4)}</span>
          <input type="range" min="0.00005" max="0.001" step="0.00005" value={discriminatorLR}
            onChange={e => setDiscriminatorLR(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 520 180" className="w-full max-w-xl mx-auto block" aria-label="GAN training curves">
        <line x1="50" y1="140" x2="470" y2="140" stroke="#d1d5db" strokeWidth="1" />
        <line x1="50" y1="20" x2="50" y2="140" stroke="#d1d5db" strokeWidth="1" />
        <text x="260" y="158" textAnchor="middle" className="text-[9px]" fill="#6b7280">Epoch</text>
        <text x="15" y="80" textAnchor="middle" className="text-[9px]" fill="#6b7280" transform="rotate(-90, 15, 80)">Loss</text>

        {genPoints.length > 1 && (
          <polyline fill="none" stroke="#6366f1" strokeWidth="2" opacity="0.8"
            points={genPoints.map(p => `${p.x},${p.y}`).join(' ')} />
        )}
        {discPoints.length > 1 && (
          <polyline fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.8"
            points={discPoints.map(p => `${p.x},${p.y}`).join(' ')} />
        )}

        <rect x="300" y="10" width="12" height="8" fill="#6366f1" opacity="0.8" rx="1" />
        <text x="316" y="18" className="text-[8px]" fill="#6b7280">Generator ({genLoss.toFixed(2)})</text>
        <rect x="300" y="22" width="12" height="8" fill="#ef4444" opacity="0.8" rx="1" />
        <text x="316" y="30" className="text-[8px]" fill="#6b7280">Discriminator ({discLoss.toFixed(2)})</text>

        <text x="260" y="175" textAnchor="middle" className="text-[9px] font-semibold" fill="#16a34a">
          FID: {fid.toFixed(1)} | Kurtosis Match: {kurtosisMatch.toFixed(0)}%
        </text>
      </svg>
    </div>
  )
}

export default function GANSimulation() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        GANs for Indian Market Data Generation
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Generative Adversarial Networks (GANs) offer a powerful approach to generating
        realistic synthetic financial time series. TimeGAN, a specialized architecture
        for temporal data, learns the joint distribution of multi-dimensional financial
        features while preserving temporal dynamics. For Indian markets with limited
        history, GANs provide a way to augment training data for ML-based strategies
        while maintaining the statistical properties unique to NSE/BSE instruments.
      </p>

      <DefinitionBlock
        title="Generative Adversarial Network"
        label="Definition 13.7"
        definition="A GAN consists of two neural networks -- a generator G and a discriminator D -- trained adversarially. The generator maps random noise to synthetic samples, while the discriminator distinguishes real from generated data. Training converges when the generator produces samples indistinguishable from real data."
        notation={<>The minimax objective is <InlineMath math="\min_G \max_D \mathbb{E}_{x \sim p_{\text{data}}}[\log D(x)] + \mathbb{E}_{z \sim p_z}[\log(1 - D(G(z)))]" />.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        TimeGAN Architecture
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        TimeGAN extends the standard GAN framework with four components: an embedding
        network, a recovery network, a sequence generator, and a sequence discriminator.
        The key innovation is the supervised loss that enforces temporal consistency:
      </p>

      <BlockMath math="\mathcal{L}_{\text{TimeGAN}} = \mathcal{L}_{\text{recon}} + \lambda_s \mathcal{L}_{\text{supervised}} + \lambda_u \mathcal{L}_{\text{unsupervised}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where the supervised loss ensures the generator respects the autoregressive
        structure of Nifty returns:
      </p>

      <BlockMath math="\mathcal{L}_{\text{supervised}} = \mathbb{E}\left[\sum_{t=1}^{T} \|h_t - g_s(h_{t-1}, z_t)\|_2^2\right]" />

      <TheoremBlock
        title="Convergence of Financial GANs"
        label="Theorem 13.4"
        statement={<>For a TimeGAN with generator capacity sufficient to represent the data distribution, the generated distribution <InlineMath math="p_G" /> converges to the real data distribution <InlineMath math="p_{\text{data}}" /> in the Wasserstein-1 distance if:</>}
        formula="W_1(p_G, p_{\text{data}}) \leq \epsilon \quad \text{as } n_{\text{train}} \to \infty"
        proof={<>Under the WGAN-GP training objective with gradient penalty, the discriminator approximates the 1-Lipschitz function maximizing the Kantorovich-Rubinstein dual. With sufficient generator capacity and proper hyperparameter tuning (gradient penalty coefficient = 10, n_critic = 5), the generated temporal distribution converges. For financial data, convergence is verified by matching marginal moments (mean, variance, skewness, kurtosis) and temporal statistics (autocorrelation, volatility clustering).</>}
      />

      <InteractiveGANTraining />

      <PythonCode
        title="timegan_nifty.py"
        runnable
        code={`import numpy as np

class SimpleTimeGAN:
    """Simplified TimeGAN for Nifty 50 data generation.

    This demonstrates the core concepts. For production use,
    see the ydata-synthetic or gretel-synthetics libraries.
    """

    def __init__(self, seq_len=50, n_features=5, latent_dim=32,
                 hidden_dim=64):
        self.seq_len = seq_len
        self.n_features = n_features  # OHLCV
        self.latent_dim = latent_dim
        self.hidden_dim = hidden_dim

    def _generate_noise(self, n_samples):
        """Generate random latent sequences."""
        return np.random.normal(0, 1,
            (n_samples, self.seq_len, self.latent_dim))

    def generate_synthetic(self, n_samples, real_stats):
        """Generate synthetic data matching real statistics.

        Uses moment matching as a simplified generation method
        to demonstrate the concept.
        """
        z = self._generate_noise(n_samples)

        # Transform noise to match real data moments
        synthetic = np.zeros((n_samples, self.seq_len, self.n_features))

        for f in range(self.n_features):
            mu = real_stats['mean'][f]
            sigma = real_stats['std'][f]
            skew = real_stats['skew'][f]
            kurt = real_stats['kurtosis'][f]

            # Generate with matching moments using Cornish-Fisher
            base = z[:, :, f % self.latent_dim]
            adjusted = mu + sigma * (
                base +
                (skew / 6) * (base**2 - 1) +
                (kurt / 24) * (base**3 - 3 * base)
            )

            # Add temporal autocorrelation
            for t in range(1, self.seq_len):
                acf = real_stats.get('acf1', 0.02)
                adjusted[:, t] = acf * adjusted[:, t-1] + \\
                    np.sqrt(1 - acf**2) * adjusted[:, t]

            synthetic[:, :, f] = adjusted

        return synthetic

    def evaluate(self, real_data, synthetic_data):
        """Evaluate synthetic data quality."""
        metrics = {}

        for f in range(self.n_features):
            real = real_data[:, :, f].flatten()
            synth = synthetic_data[:, :, f].flatten()

            metrics[f'feature_{f}_mean_err'] = abs(
                np.mean(real) - np.mean(synth))
            metrics[f'feature_{f}_std_err'] = abs(
                np.std(real) - np.std(synth))
            metrics[f'feature_{f}_kurt_err'] = abs(
                float(np.mean((real - np.mean(real))**4) /
                      np.std(real)**4) -
                float(np.mean((synth - np.mean(synth))**4) /
                      np.std(synth)**4)
            )

        return metrics

# --- Demo: Generate Synthetic Nifty Data ---
np.random.seed(42)

# Simulated real Nifty 50 OHLCV statistics
real_stats = {
    'mean': [0.0005, 0.0008, -0.0003, 0.0004, 1e6],
    'std': [0.012, 0.013, 0.012, 0.012, 5e5],
    'skew': [-0.3, -0.2, -0.4, -0.25, 1.5],
    'kurtosis': [5.2, 4.8, 5.5, 5.0, 8.0],
    'acf1': 0.02,
}

# Generate synthetic data
tgan = SimpleTimeGAN(seq_len=50, n_features=5, latent_dim=32)
n_samples = 100

# Create "real" reference data
real_data = np.random.normal(0, 1, (n_samples, 50, 5))
for f in range(5):
    real_data[:, :, f] = real_data[:, :, f] * real_stats['std'][f] + \\
        real_stats['mean'][f]

synthetic = tgan.generate_synthetic(n_samples, real_stats)

print("=== TimeGAN for Nifty 50 ===")
print(f"Real samples: {n_samples} sequences of {50} days")
print(f"Synthetic samples: {n_samples} sequences")
print(f"Features: Open, High, Low, Close, Volume\\n")

# Evaluate
metrics = tgan.evaluate(real_data, synthetic)
feature_names = ['Open', 'High', 'Low', 'Close', 'Volume']
print("--- Quality Metrics ---")
for f, name in enumerate(feature_names):
    mean_err = metrics[f'feature_{f}_mean_err']
    std_err = metrics[f'feature_{f}_std_err']
    kurt_err = metrics[f'feature_{f}_kurt_err']
    print(f"{name:>8}: Mean Err={mean_err:.6f}, "
          f"Std Err={std_err:.6f}, Kurt Err={kurt_err:.2f}")

# Synthetic data statistics
print("\\n--- Synthetic Data Summary ---")
for f, name in enumerate(feature_names[:4]):
    synth_f = synthetic[:, :, f].flatten()
    print(f"{name:>8}: mean={np.mean(synth_f):.6f}, "
          f"std={np.std(synth_f):.6f}, "
          f"kurt={float(np.mean((synth_f-np.mean(synth_f))**4)/np.std(synth_f)**4):.2f}")

print("\\n--- Use Cases for Indian Markets ---")
print("1. Augment limited NSE history for ML training")
print("2. Stress test strategies on synthetic crashes")
print("3. Generate F&O scenarios for risk management")
print("4. Privacy-preserving data sharing for research")`}
      />

      <ExampleBlock
        title="Evaluating GAN Quality for Nifty Data"
        difficulty="intermediate"
        problem="A TimeGAN trained on 5 years of Nifty 50 daily returns produces synthetic data with kurtosis 4.1 vs real kurtosis 5.2, and autocorrelation of absolute returns at lag 1 of 0.08 vs real 0.15. Is the synthetic data adequate?"
        solution={[
          {
            step: 'Evaluate kurtosis match',
            formula: '\\text{Kurt Error} = |5.2 - 4.1| = 1.1 \\quad (\\approx 21\\% \\text{ relative error})',
            explanation: 'The GAN underestimates tail risk, which is critical for risk management. A relative error below 10% is typically acceptable.',
          },
          {
            step: 'Evaluate volatility clustering',
            formula: '\\text{ACF}_{|r|}(1) \\text{ error} = |0.15 - 0.08| = 0.07',
            explanation: 'The GAN captures only about half the real volatility clustering, suggesting the temporal dynamics need improvement.',
          },
          {
            step: 'Verdict',
            formula: '\\text{Not adequate for risk modeling; acceptable for signal research}',
            explanation: 'The synthetic data underestimates tails and vol clustering. Add the supervised temporal loss or increase training epochs. For alpha signal research (where distribution shape matters less), it may be acceptable.',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        GAN Architectures for Financial Data
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Architecture</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Key Feature</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Best For</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Nifty Use Case</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">TimeGAN</td>
              <td className="px-4 py-2">Supervised temporal loss</td>
              <td className="px-4 py-2">OHLCV sequences</td>
              <td className="px-4 py-2">Training data augmentation</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">RCGAN</td>
              <td className="px-4 py-2">Recurrent architecture</td>
              <td className="px-4 py-2">Long sequences</td>
              <td className="px-4 py-2">Multi-month simulations</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">WGAN-GP</td>
              <td className="px-4 py-2">Wasserstein distance</td>
              <td className="px-4 py-2">Stable training</td>
              <td className="px-4 py-2">Fat-tailed distributions</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Quant GAN</td>
              <td className="px-4 py-2">TCN generator</td>
              <td className="px-4 py-2">Volatility clustering</td>
              <td className="px-4 py-2">India VIX dynamics</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Sig-WGAN</td>
              <td className="px-4 py-2">Signature features</td>
              <td className="px-4 py-2">Path-dependent data</td>
              <td className="px-4 py-2">Option hedging paths</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Evaluation Metrics for Synthetic Financial Data
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Evaluating synthetic financial data requires metrics beyond FID scores used
        in image generation. The key metrics for Indian market data quality are:
      </p>

      <BlockMath math="\text{Marginal Score} = 1 - \frac{1}{d}\sum_{i=1}^{d} \text{KS}(F_{\text{real}}^{(i)}, F_{\text{synth}}^{(i)})" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\text{KS}" /> is the Kolmogorov-Smirnov statistic
        for each of the <InlineMath math="d" /> features. For temporal quality:
      </p>

      <BlockMath math="\text{Temporal Score} = 1 - \frac{1}{L}\sum_{l=1}^{L} |\rho_{\text{real}}(l) - \rho_{\text{synth}}(l)|" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\rho(l)" /> is the autocorrelation at lag{' '}
        <InlineMath math="l" />. Both scores should exceed 0.9 for production use.
      </p>

      <NoteBlock title="Indian Market Training Data" type="historical">
        <ul className="space-y-2">
          <li>
            <strong>Data Sources:</strong> Use NSE bhav copies (1994-present) for daily
            OHLCV, and Kite Connect / TrueData for intraday. Pre-2010 data may lack
            corporate action adjustments.
          </li>
          <li>
            <strong>Preprocessing:</strong> Remove trading holidays (Diwali Muhurat session
            has only 1 hour), adjust for stock splits and bonuses, and normalize volumes
            by free-float market cap.
          </li>
          <li>
            <strong>Validation:</strong> Always compare generated data against held-out real
            data from the most recent 2 years, as Indian market characteristics (particularly
            retail participation and algo penetration) have evolved significantly since 2020.
          </li>
        </ul>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          GANs, particularly TimeGAN, offer a powerful way to generate synthetic Indian
          market data that preserves temporal dependencies and distributional properties.
          The critical evaluation metrics are: (1) marginal distribution match (kurtosis,
          skewness), (2) temporal dependency preservation (ACF of returns and absolute
          returns), and (3) cross-asset correlation structure. For Indian markets, always
          verify that synthetic data reproduces the characteristic fat tails (kurtosis 4-6)
          and leverage effect observed in Nifty constituents.
        </p>
      </NoteBlock>
    </div>
  )
}
