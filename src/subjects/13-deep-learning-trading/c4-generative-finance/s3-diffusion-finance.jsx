import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveDiffusionProcess() {
  const [noiseLevel, setNoiseLevel] = useState(500)
  const [totalSteps, setTotalSteps] = useState(1000)
  const [betaStart, setBetaStart] = useState(0.0001)
  const [betaEnd, setBetaEnd] = useState(0.02)

  const t = noiseLevel
  const T = totalSteps
  const alphaBar = Math.exp(-0.5 * (betaStart + (betaEnd - betaStart) * (t / T)) * t)
  const signalRatio = Math.sqrt(alphaBar)
  const noiseRatio = Math.sqrt(1 - alphaBar)

  const basePrice = 22000
  const nPoints = 60
  const prices = []
  let seed = 42
  for (let i = 0; i < nPoints; i++) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff
    const z = ((seed / 0x7fffffff) - 0.5) * 2
    const signal = basePrice + Math.sin(i / 10) * 500 + i * 10
    const noised = signal * signalRatio + z * noiseRatio * 2000
    prices.push(noised)
  }
  const minP = Math.min(...prices) - 200
  const maxP = Math.max(...prices) + 200
  const range = maxP - minP || 1

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Diffusion Forward Process on Nifty Prices
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Watch how noise is progressively added to a Nifty 50 price series during the
        forward diffusion process. The reverse process (denoising) generates new data.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Noise Step t = {noiseLevel} / {totalSteps}</span>
          <input type="range" min="0" max={totalSteps} step="10" value={noiseLevel}
            onChange={e => setNoiseLevel(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math="\beta_{\text{start}}" /> = {betaStart.toFixed(4)}</span>
          <input type="range" min="0.00001" max="0.001" step="0.00001" value={betaStart}
            onChange={e => setBetaStart(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math="\beta_{\text{end}}" /> = {betaEnd.toFixed(3)}</span>
          <input type="range" min="0.005" max="0.05" step="0.001" value={betaEnd}
            onChange={e => setBetaEnd(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 520 180" className="w-full max-w-xl mx-auto block" aria-label="Diffusion forward process">
        {[0, 0.25, 0.5, 0.75, 1].map(frac => {
          const y = 160 - frac * 130
          return <line key={frac} x1="45" y1={y} x2="500" y2={y} stroke="#e5e7eb" strokeWidth="0.5" />
        })}

        <polyline fill="none" stroke="#6366f1" strokeWidth="1.5" opacity="0.7"
          points={prices.map((p, i) => {
            const x = 50 + (i / (nPoints - 1)) * 450
            const y = 160 - ((p - minP) / range) * 130
            return `${x},${y}`
          }).join(' ')} />

        <text x="260" y="178" textAnchor="middle" className="text-[9px]" fill="#6b7280">Trading Days</text>

        <text x="420" y="15" textAnchor="end" className="text-[9px] font-bold"
          fill={noiseLevel > 700 ? '#ef4444' : noiseLevel > 300 ? '#f59e0b' : '#22c55e'}>
          Signal: {(signalRatio * 100).toFixed(1)}% | Noise: {(noiseRatio * 100).toFixed(1)}%
        </text>
        <text x="420" y="28" textAnchor="end" className="text-[8px]" fill="#6b7280">
          alpha_bar = {alphaBar.toFixed(4)}
        </text>
      </svg>
    </div>
  )
}

export default function DiffusionFinance() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Diffusion Models for Financial Data
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Diffusion models (DDPMs -- Denoising Diffusion Probabilistic Models) have
        emerged as state-of-the-art generative models, surpassing GANs in image
        generation. Their application to financial time series generation offers
        advantages in training stability and mode coverage. For Indian markets,
        diffusion models can generate high-fidelity synthetic Nifty paths that
        capture complex dependencies including volatility clustering, leverage
        effects, and cross-asset correlations.
      </p>

      <DefinitionBlock
        title="Denoising Diffusion Probabilistic Model"
        label="Definition 13.9"
        definition="A DDPM defines a forward process that gradually adds Gaussian noise to data over T steps, and a learned reverse process that denoises the corrupted data step by step. The forward process is a fixed Markov chain, while the reverse process is parameterized by a neural network that predicts the noise at each step."
        notation={<>Forward: <InlineMath math="q(x_t | x_{t-1}) = \mathcal{N}(x_t; \sqrt{1-\beta_t}\, x_{t-1}, \beta_t I)" />. Reverse: <InlineMath math="p_\theta(x_{t-1} | x_t) = \mathcal{N}(x_{t-1}; \mu_\theta(x_t, t), \sigma_t^2 I)" />.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Forward Diffusion Process
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The forward process adds noise according to a variance schedule{' '}
        <InlineMath math="\{\beta_t\}_{t=1}^T" />. A key property is that we can
        sample any noisy version <InlineMath math="x_t" /> directly from{' '}
        <InlineMath math="x_0" /> without iterating through all steps:
      </p>

      <BlockMath math="q(x_t | x_0) = \mathcal{N}(x_t; \sqrt{\bar{\alpha}_t}\, x_0, (1 - \bar{\alpha}_t) I)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\alpha_t = 1 - \beta_t" /> and{' '}
        <InlineMath math="\bar{\alpha}_t = \prod_{s=1}^t \alpha_s" />. For financial
        time series, <InlineMath math="x_0" /> is a window of Nifty returns and the
        noise schedule is calibrated so that <InlineMath math="x_T \approx \mathcal{N}(0, I)" />.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Training Objective
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The model is trained to predict the noise <InlineMath math="\epsilon" /> added
        at each step, using a simple MSE loss:
      </p>

      <BlockMath math="\mathcal{L}_{\text{simple}} = \mathbb{E}_{t, x_0, \epsilon}\left[\|\epsilon - \epsilon_\theta(\sqrt{\bar{\alpha}_t}\, x_0 + \sqrt{1-\bar{\alpha}_t}\, \epsilon, t)\|^2\right]" />

      <TheoremBlock
        title="Diffusion Model Likelihood Bound"
        label="Theorem 13.6"
        statement={<>The negative log-likelihood of a DDPM is bounded above by the sum of KL divergences between the forward and reverse transition kernels:</>}
        formula="-\log p_\theta(x_0) \leq \sum_{t=1}^{T} D_{\text{KL}}(q(x_{t-1}|x_t, x_0) \| p_\theta(x_{t-1}|x_t)) + C"
        proof={<>This follows from the variational bound applied to the hierarchical latent variable model. Each KL term measures how well the learned reverse step matches the true posterior transition. For financial data, minimizing this bound ensures the generated samples faithfully represent the joint distribution of returns, volumes, and volatilities observed in NSE data. The constant <InlineMath math="C" /> is the entropy of the forward process.</>}
      />

      <InteractiveDiffusionProcess />

      <PythonCode
        title="diffusion_nifty.py"
        runnable
        code={`import numpy as np

class FinancialDiffusion:
    """Simplified diffusion model for Nifty 50 data generation.

    Demonstrates the core forward/reverse diffusion concepts.
    For production, use the diffusers library with custom architectures.
    """

    def __init__(self, n_steps=1000, beta_start=1e-4, beta_end=0.02):
        self.n_steps = n_steps

        # Linear noise schedule
        self.betas = np.linspace(beta_start, beta_end, n_steps)
        self.alphas = 1 - self.betas
        self.alpha_bars = np.cumprod(self.alphas)

    def forward_process(self, x0, t):
        """Add noise to financial data at timestep t.

        q(x_t | x_0) = N(sqrt(alpha_bar_t) * x_0, (1 - alpha_bar_t) * I)
        """
        alpha_bar = self.alpha_bars[t]
        noise = np.random.randn(*x0.shape)
        x_t = np.sqrt(alpha_bar) * x0 + np.sqrt(1 - alpha_bar) * noise
        return x_t, noise

    def reverse_step(self, x_t, predicted_noise, t):
        """Denoise one step (simplified).

        In practice, this uses a neural network for noise prediction.
        """
        alpha = self.alphas[t]
        alpha_bar = self.alpha_bars[t]

        # Predicted x_0
        x0_pred = (x_t - np.sqrt(1 - alpha_bar) * predicted_noise) / \\
            np.sqrt(alpha_bar)

        # Posterior mean
        if t > 0:
            alpha_bar_prev = self.alpha_bars[t - 1]
            beta = self.betas[t]
            posterior_mean = (np.sqrt(alpha_bar_prev) * beta / (1 - alpha_bar)) * x0_pred + \\
                (np.sqrt(alpha) * (1 - alpha_bar_prev) / (1 - alpha_bar)) * x_t
            posterior_var = beta * (1 - alpha_bar_prev) / (1 - alpha_bar)
            noise = np.random.randn(*x_t.shape) * np.sqrt(posterior_var)
            return posterior_mean + noise
        return x0_pred

    def generate(self, shape, n_denoise_steps=50):
        """Generate synthetic financial data via reverse process."""
        # Start from pure noise
        x = np.random.randn(*shape)

        # Subsample timesteps for faster generation (DDIM-style)
        timesteps = np.linspace(self.n_steps - 1, 0,
                                 n_denoise_steps, dtype=int)

        for t in timesteps:
            # Simple noise prediction (would be neural network)
            predicted_noise = x * 0.1  # Placeholder
            x = self.reverse_step(x, predicted_noise, t)

        return x

# --- Demo ---
np.random.seed(42)

# Create "real" Nifty 50 return data
n_samples = 100
seq_len = 50
n_features = 4  # Open, High, Low, Close returns

# Simulated Nifty returns with realistic properties
real_data = np.random.normal(0.0005, 0.015, (n_samples, seq_len, n_features))
# Add fat tails
for i in range(n_samples):
    if np.random.random() < 0.05:  # 5% chance of jump
        jump_day = np.random.randint(0, seq_len)
        real_data[i, jump_day, :] += np.random.normal(-0.03, 0.01, n_features)

# Initialize diffusion model
diffusion = FinancialDiffusion(n_steps=1000, beta_start=1e-4, beta_end=0.02)

print("=== Diffusion Model for Nifty 50 ===")
print(f"Data: {n_samples} samples, {seq_len} days, {n_features} features\\n")

# Demonstrate forward process
print("--- Forward Process (Adding Noise) ---")
x0 = real_data[0]  # Single sample
for t in [0, 100, 500, 900, 999]:
    x_t, noise = diffusion.forward_process(x0, t)
    alpha_bar = diffusion.alpha_bars[t]
    snr = alpha_bar / (1 - alpha_bar)
    print(f"  t={t:4d}: alpha_bar={alpha_bar:.4f}, "
          f"SNR={snr:.4f}, "
          f"std(x_t)={np.std(x_t):.4f}")

# Generate synthetic data
print("\\n--- Reverse Process (Generating) ---")
synthetic = diffusion.generate(
    shape=(50, seq_len, n_features),
    n_denoise_steps=50
)

print(f"Generated: {synthetic.shape[0]} samples")
print(f"Mean:      {np.mean(synthetic):.6f}")
print(f"Std:       {np.std(synthetic):.6f}")
print(f"Min:       {np.min(synthetic):.6f}")
print(f"Max:       {np.max(synthetic):.6f}")

# Compare distributions
print("\\n--- Distribution Comparison ---")
print(f"{'Metric':<20} {'Real':>10} {'Synthetic':>10}")
print(f"{'Mean':<20} {np.mean(real_data):>10.6f} {np.mean(synthetic):>10.6f}")
print(f"{'Std':<20} {np.std(real_data):>10.6f} {np.std(synthetic):>10.6f}")

print("\\n--- Advantages over GANs ---")
print("1. No mode collapse: covers full distribution")
print("2. Stable training: simple MSE loss")
print("3. Controllable generation via guidance")
print("4. Better likelihood estimation")`}
      />

      <ExampleBlock
        title="Noise Schedule Calibration for Nifty"
        difficulty="intermediate"
        problem="For a diffusion model on Nifty 50 daily returns (std ~1.5%), what beta schedule ensures that at T=1000 steps, the data is approximately standard normal? Verify that alpha_bar_T is sufficiently small."
        solution={[
          {
            step: 'Requirement for full noising',
            formula: '\\bar{\\alpha}_T \\approx 0 \\implies \\sqrt{\\bar{\\alpha}_T} \\cdot \\sigma_{\\text{data}} \\ll \\sigma_{\\text{noise}}',
            explanation: 'At the final step, the signal component should be negligible compared to noise.',
          },
          {
            step: 'Linear schedule computation',
            formula: '\\bar{\\alpha}_{1000} = \\prod_{t=1}^{1000}(1 - \\beta_t) \\approx e^{-\\sum \\beta_t}',
            explanation: 'With linear schedule from 1e-4 to 0.02, the sum is approximately 10.05.',
          },
          {
            step: 'Verify',
            formula: '\\bar{\\alpha}_{1000} \\approx e^{-10.05} \\approx 4.3 \\times 10^{-5}',
            explanation: 'The signal is attenuated by a factor of 0.0066 (sqrt), making x_T essentially pure noise. This is sufficient for Nifty return data with std = 0.015.',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Generative Model Comparison for Finance
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Property</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">GAN</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">VAE</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Diffusion</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Sample Quality</td>
              <td className="px-4 py-2">High</td>
              <td className="px-4 py-2">Medium</td>
              <td className="px-4 py-2">Highest</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Training Stability</td>
              <td className="px-4 py-2">Low</td>
              <td className="px-4 py-2">High</td>
              <td className="px-4 py-2">High</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Mode Coverage</td>
              <td className="px-4 py-2">Partial</td>
              <td className="px-4 py-2">Full</td>
              <td className="px-4 py-2">Full</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Controllability</td>
              <td className="px-4 py-2">Low</td>
              <td className="px-4 py-2">High</td>
              <td className="px-4 py-2">Medium-High</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Generation Speed</td>
              <td className="px-4 py-2">Fast</td>
              <td className="px-4 py-2">Fast</td>
              <td className="px-4 py-2">Slow (50-1000 steps)</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Likelihood</td>
              <td className="px-4 py-2">No</td>
              <td className="px-4 py-2">Lower bound</td>
              <td className="px-4 py-2">Upper bound</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Conditional Generation for Indian Markets
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Classifier-free guidance enables controlled generation of specific market
        conditions. By conditioning on regime labels <InlineMath math="c" /> (bull,
        bear, crisis), the reverse process becomes:
      </p>

      <BlockMath math="\hat{\epsilon}_\theta(x_t, t, c) = (1 + w) \cdot \epsilon_\theta(x_t, t, c) - w \cdot \epsilon_\theta(x_t, t)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="w" /> is the guidance scale controlling how strongly
        the generation follows the conditioning. This is particularly useful for
        generating Nifty crash scenarios or India VIX spike events for stress testing
        portfolio risk limits.
      </p>

      <NoteBlock title="Implementation Notes" type="historical">
        <ul className="space-y-2">
          <li>
            <strong>Architecture:</strong> Use a 1D U-Net with temporal attention for
            sequence generation, or a Transformer backbone for multi-asset correlation
            modeling across Nifty 50 constituents.
          </li>
          <li>
            <strong>Sampling:</strong> DDIM (Denoising Diffusion Implicit Models) reduces
            generation from 1000 steps to 50-100 steps with negligible quality loss,
            making it practical for generating large-scale Monte Carlo scenarios.
          </li>
          <li>
            <strong>Calibration:</strong> Train on the last 5 years of NSE daily data
            with augmentation from synthetic crash scenarios. Use India VIX as an
            auxiliary conditioning signal for volatility-aware generation.
          </li>
        </ul>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Diffusion models offer superior mode coverage and training stability compared to
          GANs for financial data generation. For Indian markets, the key design choices are:
          (1) <strong>noise schedule</strong> calibrated to return magnitudes, (2){' '}
          <strong>conditional generation</strong> using classifier-free guidance for targeted
          scenario creation, and (3) <strong>temporal architecture</strong> (1D U-Net or
          Transformer backbone) to capture the sequential nature of Nifty price dynamics.
          DDIM sampling enables fast generation with 50-100 steps instead of 1000.
        </p>
      </NoteBlock>
    </div>
  )
}
