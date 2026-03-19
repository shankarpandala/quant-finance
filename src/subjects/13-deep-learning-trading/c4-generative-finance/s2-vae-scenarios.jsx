import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveViz() {
  const [latentDim, setLatentDim] = useState(8)
  const [beta, setBeta] = useState(1.0)
  const reconLoss = 10 / latentDim; const klLoss = latentDim * 0.5 * beta; const totalLoss = reconLoss + klLoss
  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">Interactive: VAE Loss Decomposition</h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Balance reconstruction quality vs latent space regularity for Nifty scenario generation.</p>
      <div className="mb-4 grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400"><span>Latent Dimensions = {latentDim}</span><input type="range" min="2" max="32" step="2" value={latentDim} onChange={e => setLatentDim(parseInt(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" /></label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400"><span>Beta (KL weight) = {beta.toFixed(1)}</span><input type="range" min="0.1" max="5" step="0.1" value={beta} onChange={e => setBeta(parseFloat(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" /></label>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-900/30"><span className="text-gray-500">Reconstruction</span><p className="text-base font-bold text-blue-600">{reconLoss.toFixed(2)}</p></div>
        <div className="rounded-lg bg-red-50 p-2 dark:bg-red-900/30"><span className="text-gray-500">KL Divergence</span><p className="text-base font-bold text-red-600">{klLoss.toFixed(2)}</p></div>
        <div className="rounded-lg bg-indigo-50 p-2 dark:bg-indigo-900/30"><span className="text-gray-500">Total ELBO</span><p className="text-base font-bold text-indigo-600">{totalLoss.toFixed(2)}</p></div>
      </div>
    </div>
  )
}

export default function VAEScenarios() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">VAE for Financial Scenario Generation</h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Variational Autoencoders (VAEs) learn a structured latent space of market scenarios, enabling controlled generation of plausible Nifty return paths. Unlike GANs, VAEs provide explicit density estimation and smooth interpolation between scenarios, making them ideal for stress testing and scenario analysis in Indian portfolio management.</p>

      <DefinitionBlock title="Variational Autoencoder (VAE)" label="Definition 13.11" definition="A VAE consists of an encoder q(z|x) that maps observed data to a latent distribution, and a decoder p(x|z) that reconstructs data from latent codes. The model is trained by maximizing the Evidence Lower Bound (ELBO), which balances reconstruction quality with latent space regularity." notation="\text{ELBO} = E_{q(z|x)}[\log p(x|z)] - D_{KL}(q(z|x) || p(z))" />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">VAE for Financial Time Series</h3>
      <BlockMath math="\text{Encoder: } q_\phi(z|r_{1:T}) = \mathcal{N}(\mu_\phi(r), \sigma_\phi^2(r))" />
      <BlockMath math="\text{Decoder: } p_\theta(r_{1:T}|z) = \mathcal{N}(\mu_\theta(z), \sigma_\theta^2(z))" />
      <BlockMath math="\mathcal{L} = -\frac{1}{2}\sum_{t=1}^{T}(r_t - \hat{r}_t)^2 - \frac{\beta}{2}\sum_{d=1}^{D}(\mu_d^2 + \sigma_d^2 - \log\sigma_d^2 - 1)" />

      <TheoremBlock title="Latent Space Interpretation" label="Theorem 13.11" statement="Each dimension of the VAE latent space z captures an independent factor of variation in Nifty return paths. With proper disentanglement (beta-VAE), individual latent dimensions correspond to interpretable market factors: z_1 might capture market direction, z_2 volatility regime, z_3 sector rotation, etc." proof="The KL regularization term pushes q(z|x) toward the isotropic Gaussian prior, encouraging independent latent dimensions. With beta > 1 (beta-VAE), this independence is strengthened at the cost of reconstruction quality. The information bottleneck forces each dimension to capture the most significant independent factor of variation." />

      <NoteBlock title="VAE Scenario Applications" type="tip">
        <ul className="space-y-1 text-sm">
          <li><strong>Stress Scenarios:</strong> Navigate latent space to generate targeted stress scenarios (high vol + negative returns)</li>
          <li><strong>Interpolation:</strong> Smoothly transition between bull and bear market scenarios</li>
          <li><strong>Conditional Generation:</strong> Generate Nifty paths conditioned on specific macro scenarios</li>
          <li><strong>Risk Budgeting:</strong> Generate scenario distributions for VaR and CVaR computation</li>
        </ul>
      </NoteBlock>

      <InteractiveViz />

      <PythonCode title="vae_scenarios.py" runnable code={`import numpy as np

class FinancialVAE:
    """VAE for generating market scenarios."""
    def __init__(self, seq_length, latent_dim=8, hidden=32):
        self.seq_len = seq_length
        self.latent_dim = latent_dim
        scale = 0.1
        # Encoder
        self.enc_W = np.random.randn(hidden, seq_length) * scale
        self.enc_mu = np.random.randn(latent_dim, hidden) * scale
        self.enc_logvar = np.random.randn(latent_dim, hidden) * scale
        # Decoder
        self.dec_W1 = np.random.randn(hidden, latent_dim) * scale
        self.dec_W2 = np.random.randn(seq_length, hidden) * scale

    def encode(self, x):
        h = np.maximum(x @ self.enc_W.T, 0)
        mu = h @ self.enc_mu.T
        logvar = h @ self.enc_logvar.T
        return mu, logvar

    def reparameterize(self, mu, logvar):
        std = np.exp(0.5 * logvar)
        eps = np.random.randn(*mu.shape)
        return mu + eps * std

    def decode(self, z):
        h = np.maximum(z @ self.dec_W1.T, 0)
        return h @ self.dec_W2.T * 0.03

    def generate(self, n_samples):
        z = np.random.randn(n_samples, self.latent_dim)
        return self.decode(z)

    def generate_conditional(self, z_override, dim, value, n_samples):
        z = np.random.randn(n_samples, self.latent_dim)
        z[:, dim] = value
        return self.decode(z)

# Scenario generation for Nifty
np.random.seed(42)
seq_len = 63  # ~3 months
vae = FinancialVAE(seq_length=seq_len, latent_dim=8)

# Generate base scenarios
base_scenarios = vae.generate(1000)

# Conditional scenarios (varying latent dim 0 = "market direction")
bull_scenarios = vae.generate_conditional(None, dim=0, value=2.0, n_samples=200)
bear_scenarios = vae.generate_conditional(None, dim=0, value=-2.0, n_samples=200)
vol_scenarios = vae.generate_conditional(None, dim=1, value=3.0, n_samples=200)

print("=" * 55)
print("  VAE Scenario Generation - Nifty 50")
print("=" * 55)

for name, scenarios in [('Base', base_scenarios), ('Bull', bull_scenarios),
                         ('Bear', bear_scenarios), ('High Vol', vol_scenarios)]:
    cum_returns = np.sum(scenarios, axis=1) * 100
    final_prices = 20000 * np.exp(np.sum(scenarios, axis=1))
    var_5 = np.percentile(cum_returns, 5)
    cvar_5 = np.mean(cum_returns[cum_returns <= var_5])

    print(f"\\n{name} Scenarios ({len(scenarios)} paths, {seq_len} days):")
    print(f"  Mean return:    {np.mean(cum_returns):>+6.2f}%")
    print(f"  Std:            {np.std(cum_returns):>6.2f}%")
    print(f"  5th percentile: {var_5:>+6.2f}% (VaR)")
    print(f"  CVaR (5%):      {cvar_5:>+6.2f}%")
    print(f"  Price range:    [{np.min(final_prices):,.0f}, {np.max(final_prices):,.0f}]")`} />

      <ExampleBlock title="VAE Latent Space Navigation" difficulty="intermediate"
        problem="A VAE has 4 latent dimensions for Nifty scenarios. z_1 controls market direction, z_2 controls volatility. To generate a 'crash' scenario (large negative returns + high volatility), what latent vector should you use?"
        solution={[
          { step: 'Set market direction', formula: 'z_1 = -3 \\quad \\text{(3 std below mean = bearish)}', explanation: 'Extreme negative z_1 generates strongly negative return paths.' },
          { step: 'Set volatility regime', formula: 'z_2 = +3 \\quad \\text{(3 std above mean = high vol)}', explanation: 'High z_2 generates paths with large daily swings.' },
          { step: 'Leave other dims random', formula: 'z_3, z_4 \\sim \\mathcal{N}(0, 1)', explanation: 'Random sampling of other dimensions provides diversity in crash paths while maintaining the crash characteristics. This generates a distribution of crash scenarios for stress testing a Nifty portfolio.' },
        ]} />

      <NoteBlock title="Key Takeaway" type="tip"><p>VAEs provide a principled framework for generating controlled financial scenarios. The structured latent space enables targeted scenario generation (crash, rally, high-vol) by manipulating specific latent dimensions, while the probabilistic framework provides density estimates for risk assessment. For Indian portfolio management, VAE-generated scenarios complement historical backtesting by covering extreme events beyond what Nifty historical data contains.</p></NoteBlock>
    </div>
  )
}
