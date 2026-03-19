import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveVAELatentSpace() {
  const [z1, setZ1] = useState(0)
  const [z2, setZ2] = useState(0)
  const [beta, setBeta] = useState(1.0)
  const [latentDim, setLatentDim] = useState(8)

  const volatilityRegime = z1 > 0.5 ? 'High Vol' : z1 < -0.5 ? 'Low Vol' : 'Normal'
  const trendRegime = z2 > 0.5 ? 'Bull' : z2 < -0.5 ? 'Bear' : 'Sideways'
  const impliedVol = (16 + z1 * 8).toFixed(1)
  const impliedDrift = (12 + z2 * 10).toFixed(1)
  const reconstructionLoss = (0.5 + beta * 0.3 + Math.abs(z1) * 0.1 + Math.abs(z2) * 0.1).toFixed(3)
  const klDivergence = (0.5 * (z1 * z1 + z2 * z2)).toFixed(3)
  const elbo = (-parseFloat(reconstructionLoss) - beta * parseFloat(klDivergence)).toFixed(3)

  const scenarios = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * 2 * Math.PI
    const r = 1.5
    return {
      x: 260 + (z1 + r * Math.cos(angle)) * 60,
      y: 90 + (z2 + r * Math.sin(angle)) * -40,
      label: `S${i + 1}`,
    }
  })

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: VAE Latent Space for Market Scenarios
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Navigate the latent space of a VAE trained on Nifty 50 data. Each point in latent
        space decodes to a different market scenario with specific vol and trend characteristics.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math="z_1" /> (Vol axis) = {z1.toFixed(1)}</span>
          <input type="range" min="-2" max="2" step="0.1" value={z1}
            onChange={e => setZ1(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math="z_2" /> (Trend axis) = {z2.toFixed(1)}</span>
          <input type="range" min="-2" max="2" step="0.1" value={z2}
            onChange={e => setZ2(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span><InlineMath math="\beta" /> (KL weight) = {beta.toFixed(1)}</span>
          <input type="range" min="0.1" max="5" step="0.1" value={beta}
            onChange={e => setBeta(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Latent Dim = {latentDim}</span>
          <input type="range" min="2" max="32" step="2" value={latentDim}
            onChange={e => setLatentDim(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 520 200" className="w-full max-w-xl mx-auto block" aria-label="VAE latent space">
        <rect x="110" y="10" width="300" height="160" rx="8" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1" />

        <line x1="260" y1="10" x2="260" y2="170" stroke="#d1d5db" strokeWidth="0.5" strokeDasharray="3,3" />
        <line x1="110" y1="90" x2="410" y2="90" stroke="#d1d5db" strokeWidth="0.5" strokeDasharray="3,3" />

        <text x="415" y="93" className="text-[8px]" fill="#9ca3af">z1 (vol)</text>
        <text x="262" y="8" className="text-[8px]" fill="#9ca3af">z2 (trend)</text>

        {scenarios.map((s, i) => (
          <g key={i}>
            <circle cx={s.x} cy={s.y} r="8" fill="#6366f1" opacity="0.3" stroke="#6366f1" strokeWidth="1" />
            <text x={s.x} y={s.y + 3} textAnchor="middle" className="text-[7px] font-mono" fill="#4338ca">{s.label}</text>
          </g>
        ))}

        <circle cx={260 + z1 * 60} cy={90 - z2 * 40} r="6" fill="#ef4444" stroke="#dc2626" strokeWidth="2" />
        <text x={260 + z1 * 60} y={90 - z2 * 40 - 12} textAnchor="middle"
          className="text-[8px] font-bold" fill="#dc2626">Current</text>

        <text x="50" y="15" className="text-[9px] font-bold" fill="#374151">Regime:</text>
        <text x="50" y="30" className="text-[8px]" fill="#6b7280">{volatilityRegime}</text>
        <text x="50" y="42" className="text-[8px]" fill="#6b7280">{trendRegime}</text>
        <text x="50" y="58" className="text-[8px]" fill="#6b7280">Vol: {impliedVol}%</text>
        <text x="50" y="70" className="text-[8px]" fill="#6b7280">Drift: {impliedDrift}%</text>

        <text x="50" y="110" className="text-[9px] font-bold" fill="#374151">Losses:</text>
        <text x="50" y="125" className="text-[8px]" fill="#6b7280">Recon: {reconstructionLoss}</text>
        <text x="50" y="137" className="text-[8px]" fill="#6b7280">KL: {klDivergence}</text>
        <text x="50" y="149" className="text-[8px] font-bold" fill="#4338ca">ELBO: {elbo}</text>
      </svg>
    </div>
  )
}

export default function VAEScenarios() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        VAE Scenario Generation for Indian Markets
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Variational Autoencoders (VAEs) learn a structured latent space where
        similar market conditions cluster together. Unlike GANs, VAEs provide an
        explicit probabilistic model that allows controlled scenario generation --
        crucial for stress testing Indian portfolios against hypothetical market
        regimes like a 2008-style FII exodus, an RBI rate shock, or a currency
        crisis.
      </p>

      <DefinitionBlock
        title="Variational Autoencoder"
        label="Definition 13.8"
        definition="A VAE is a generative model that learns to encode data into a low-dimensional latent space z and decode it back. The encoder q(z|x) approximates the posterior distribution of latent variables, while the decoder p(x|z) reconstructs the data. Training maximizes the Evidence Lower Bound (ELBO) on the data log-likelihood."
        notation={<>The ELBO is <InlineMath math="\mathcal{L}(\theta, \phi; x) = \mathbb{E}_{q_\phi(z|x)}[\log p_\theta(x|z)] - D_{\text{KL}}(q_\phi(z|x) \| p(z))" />.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The ELBO Objective
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The VAE is trained by maximizing the Evidence Lower Bound (ELBO), which
        decomposes into a reconstruction term and a KL divergence regularizer:
      </p>

      <BlockMath math="\text{ELBO} = \underbrace{\mathbb{E}_{q(z|x)}[\log p(x|z)]}_{\text{reconstruction}} - \underbrace{\beta \cdot D_{\text{KL}}(q(z|x) \| \mathcal{N}(0, I))}_{\text{regularization}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For financial data, the reconstruction term ensures generated scenarios match
        real market dynamics, while the KL term enforces a smooth latent space where
        interpolation between market regimes produces plausible intermediate scenarios.
        The <InlineMath math="\beta" /> parameter controls this trade-off:
      </p>

      <BlockMath math="q_\phi(z|x) = \mathcal{N}(\mu_\phi(x), \text{diag}(\sigma_\phi^2(x)))" />

      <TheoremBlock
        title="Latent Space Interpolation"
        label="Theorem 13.5"
        statement={<>For a well-trained VAE with continuous latent space <InlineMath math="\mathcal{Z}" />, linear interpolation between two encoded market states <InlineMath math="z_A" /> (bull market) and <InlineMath math="z_B" /> (bear market) produces a valid intermediate scenario:</>}
        formula="z_\alpha = (1 - \alpha) z_A + \alpha z_B \implies \text{decode}(z_\alpha) \in \mathcal{S}_{\text{valid}}"
        proof={<>The KL regularization in the ELBO ensures that the aggregate posterior matches the prior <InlineMath math="\mathcal{N}(0, I)" />, which is a convex set. By the definition of convex sets, any convex combination of points in the latent space lies within the support of the prior, ensuring the decoder produces valid outputs. Empirically, this is verified by checking that decoded scenarios satisfy financial constraints (positive prices, bounded returns, valid correlation matrices).</>}
      />

      <InteractiveVAELatentSpace />

      <PythonCode
        title="vae_nifty_scenarios.py"
        runnable
        code={`import numpy as np

class FinancialVAE:
    """Simplified VAE for Nifty 50 scenario generation.

    Demonstrates latent space interpolation and scenario
    generation for Indian market stress testing.
    """

    def __init__(self, input_dim=5, latent_dim=8, beta=1.0):
        self.input_dim = input_dim   # OHLCV features
        self.latent_dim = latent_dim
        self.beta = beta

        # Simulated learned parameters
        np.random.seed(42)
        self.W_enc = np.random.randn(input_dim, latent_dim) * 0.1
        self.W_dec = np.random.randn(latent_dim, input_dim) * 0.1

    def encode(self, x):
        """Encode market data to latent space."""
        h = x @ self.W_enc
        mu = h
        log_var = h * 0.5 - 1  # Learned log variance
        return mu, log_var

    def reparameterize(self, mu, log_var):
        """Reparameterization trick."""
        std = np.exp(0.5 * log_var)
        eps = np.random.randn(*mu.shape)
        return mu + eps * std

    def decode(self, z):
        """Decode latent vector to market scenario."""
        return z @ self.W_dec

    def generate_scenarios(self, n_scenarios, regime='normal'):
        """Generate market scenarios from latent space."""
        if regime == 'bull':
            z_mean = np.array([0, 1.5] + [0] * (self.latent_dim - 2))
        elif regime == 'bear':
            z_mean = np.array([0, -1.5] + [0] * (self.latent_dim - 2))
        elif regime == 'high_vol':
            z_mean = np.array([1.5, 0] + [0] * (self.latent_dim - 2))
        elif regime == 'crisis':
            z_mean = np.array([2.0, -2.0] + [0] * (self.latent_dim - 2))
        else:
            z_mean = np.zeros(self.latent_dim)

        z_samples = np.random.randn(n_scenarios, self.latent_dim) * 0.5
        z_samples += z_mean
        scenarios = self.decode(z_samples)

        # Scale to realistic Nifty return magnitudes
        scenarios[:, 0] *= 0.015   # Open return
        scenarios[:, 1] *= 0.018   # High
        scenarios[:, 2] *= 0.015   # Low
        scenarios[:, 3] *= 0.015   # Close return
        scenarios[:, 4] = np.abs(scenarios[:, 4]) * 1e6  # Volume

        return scenarios

    def interpolate(self, z_a, z_b, n_steps=10):
        """Interpolate between two market states."""
        alphas = np.linspace(0, 1, n_steps)
        interpolated = []
        for alpha in alphas:
            z = (1 - alpha) * z_a + alpha * z_b
            scenario = self.decode(z.reshape(1, -1))
            interpolated.append(scenario[0])
        return np.array(interpolated), alphas

# --- Demo: Nifty 50 Scenario Generation ---
vae = FinancialVAE(input_dim=5, latent_dim=8, beta=1.0)

print("=== VAE Scenario Generation: Nifty 50 ===\\n")

# Generate scenarios for different regimes
regimes = ['normal', 'bull', 'bear', 'high_vol', 'crisis']
feature_names = ['dOpen', 'dHigh', 'dLow', 'dClose', 'Volume']

for regime in regimes:
    scenarios = vae.generate_scenarios(1000, regime=regime)
    print(f"--- Regime: {regime.upper()} (1000 scenarios) ---")
    for f, name in enumerate(feature_names[:4]):
        vals = scenarios[:, f] * 100  # To percentage
        print(f"  {name:>6}: mean={np.mean(vals):+.3f}%, "
              f"std={np.std(vals):.3f}%, "
              f"5th={np.percentile(vals, 5):+.3f}%, "
              f"95th={np.percentile(vals, 95):+.3f}%")
    print()

# Interpolate: Bull to Crisis (simulating regime transition)
print("--- Interpolation: Bull -> Crisis ---")
z_bull = np.array([0, 1.5] + [0] * 6)
z_crisis = np.array([2.0, -2.0] + [0] * 6)
interp, alphas = vae.interpolate(z_bull, z_crisis, n_steps=5)

for i, alpha in enumerate(alphas):
    close_ret = interp[i, 3] * 0.015 * 100
    vol_proxy = abs(interp[i, 0]) * 100
    print(f"  alpha={alpha:.2f}: Close={close_ret:+.3f}%, "
          f"VolProxy={vol_proxy:.3f}%")

print("\\n--- Indian Market Stress Scenarios ---")
print("1. RBI Rate Hike: Encode high-vol + bear regime")
print("2. FII Outflow:   Encode crisis regime")
print("3. Budget Rally:  Encode bull + low-vol regime")
print("4. COVID Shock:   Encode extreme crisis, interpolate recovery")`}
      />

      <ExampleBlock
        title="Generating RBI Rate Shock Scenarios"
        difficulty="advanced"
        problem="Using a VAE trained on Nifty 50 data, generate 1,000 scenarios representing an unexpected 50bps RBI repo rate hike. The historical response shows mean daily return of -1.2% with vol of 2.5% on announcement day. What latent vector should you use?"
        solution={[
          {
            step: 'Identify the target distribution',
            formula: 'r \\sim \\mathcal{N}(-0.012, 0.025^2)',
            explanation: 'The target scenario has negative mean return with elevated volatility, characteristic of rate shock events.',
          },
          {
            step: 'Map to latent coordinates',
            formula: 'z_1 \\approx 1.2 \\text{ (high vol)}, \\quad z_2 \\approx -1.0 \\text{ (bearish)}',
            explanation: 'Using the learned encoder mapping, high volatility corresponds to positive z1 and negative drift to negative z2.',
          },
          {
            step: 'Generate and validate',
            formula: '\\text{decode}(z) \\to \\hat{r}, \\quad \\text{check: } |\\mathbb{E}[\\hat{r}] - (-0.012)| < 0.003',
            explanation: 'Generate 1,000 samples from N(z_target, 0.25I) and verify the decoded scenarios match the target statistics within tolerance.',
          },
        ]}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        VAE Variants for Finance
      </h3>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Variant</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Modification</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Finance Application</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2"><InlineMath math="\beta" />-VAE</td>
              <td className="px-4 py-2">Adjustable KL weight</td>
              <td className="px-4 py-2">Disentangled regime factors</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Conditional VAE</td>
              <td className="px-4 py-2">Conditioned on labels</td>
              <td className="px-4 py-2">Regime-specific scenarios</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">VQ-VAE</td>
              <td className="px-4 py-2">Discrete latent codes</td>
              <td className="px-4 py-2">Market state clustering</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Temporal VAE</td>
              <td className="px-4 py-2">RNN encoder/decoder</td>
              <td className="px-4 py-2">Time series generation</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Hierarchical VAE</td>
              <td className="px-4 py-2">Multi-scale latent</td>
              <td className="px-4 py-2">Macro + micro dynamics</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Stress Testing Indian Portfolios
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The primary use case for VAE scenario generation in Indian markets is
        regulatory and internal stress testing. SEBI's stress testing guidelines
        for mutual funds require scenario analysis across multiple market conditions.
        A VAE can generate scenarios calibrated to historical stress events:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Scenario</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Historical Reference</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Nifty Impact</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Latent Encoding</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">FII Exodus</td>
              <td className="px-4 py-2">Mar 2020</td>
              <td className="px-4 py-2">-38%</td>
              <td className="px-4 py-2"><InlineMath math="z_1 = 2.5, z_2 = -2.5" /></td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">RBI Rate Hike</td>
              <td className="px-4 py-2">Jun 2022</td>
              <td className="px-4 py-2">-8%</td>
              <td className="px-4 py-2"><InlineMath math="z_1 = 1.0, z_2 = -1.0" /></td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">INR Crisis</td>
              <td className="px-4 py-2">Sep 2013</td>
              <td className="px-4 py-2">-12%</td>
              <td className="px-4 py-2"><InlineMath math="z_1 = 1.5, z_2 = -1.5" /></td>
            </tr>
            <tr>
              <td className="px-4 py-2">Budget Rally</td>
              <td className="px-4 py-2">Feb 2021</td>
              <td className="px-4 py-2">+12%</td>
              <td className="px-4 py-2"><InlineMath math="z_1 = -0.5, z_2 = 2.0" /></td>
            </tr>
          </tbody>
        </table>
      </div>

      <NoteBlock title="Implementation Libraries" type="tip">
        <p>
          For production VAE implementations on Indian market data, use{' '}
          <strong>PyTorch</strong> with <code>torch.distributions</code> for the
          reparameterization trick, or <strong>TensorFlow Probability</strong> for
          the full Bayesian pipeline. The <code>pythae</code> library provides
          ready-made VAE architectures (beta-VAE, VAMP, RHVAE) that can be adapted
          for financial time series with minimal custom code.
        </p>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          VAEs provide a structured approach to scenario generation where the latent space
          organizes market regimes interpretably. For Indian market risk management, the
          key advantage over GANs is <strong>controllability</strong>: you can specify a
          target regime (crisis, bull, rate shock) and generate plausible scenarios around
          it. The <InlineMath math="\beta" />-VAE variant allows fine-tuning the trade-off
          between scenario diversity and fidelity to historical patterns observed in NSE data.
        </p>
      </NoteBlock>
    </div>
  )
}
