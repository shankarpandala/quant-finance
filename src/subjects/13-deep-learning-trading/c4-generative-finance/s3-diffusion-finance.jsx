import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveViz() {
  const [nSteps, setNSteps] = useState(100)
  const [noiseSchedule, setNoiseSchedule] = useState('linear')
  const steps = Array.from({length: 6}, (_, i) => Math.floor(i * nSteps / 5))
  const noiseLevel = steps.map(s => noiseSchedule === 'linear' ? s / nSteps : 1 - Math.exp(-3 * s / nSteps))
  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">Interactive: Diffusion Process</h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Visualize the forward diffusion process destroying Nifty return structure.</p>
      <div className="mb-4 grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400"><span>Diffusion Steps = {nSteps}</span><input type="range" min="10" max="1000" step="10" value={nSteps} onChange={e => setNSteps(parseInt(e.target.value))} className="h-2 w-full cursor-pointer accent-indigo-500" /></label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400"><span>Schedule: {noiseSchedule}</span><select value={noiseSchedule} onChange={e => setNoiseSchedule(e.target.value)} className="rounded border border-gray-300 px-2 py-1 text-xs dark:border-gray-600 dark:bg-gray-800"><option value="linear">Linear</option><option value="cosine">Cosine</option></select></label>
      </div>
      <svg viewBox="0 0 400 60" className="w-full max-w-md mx-auto block">
        {noiseLevel.map((nl, i) => {
          const x = 20 + i * 70; const barH = nl * 45
          return (<g key={i}><rect x={x} y={50 - barH} width="40" height={barH} fill={`rgb(${Math.floor(nl*200)}, ${Math.floor((1-nl)*150)}, ${Math.floor((1-nl)*255)})`} rx="3" /><text x={x + 20} y="58" textAnchor="middle" className="text-[7px]" fill="#6b7280">t={steps[i]}</text></g>)
        })}
      </svg>
      <p className="mt-1 text-center text-xs text-gray-500">Forward: data -> noise (left to right) | Reverse: noise -> data (right to left)</p>
    </div>
  )
}

export default function DiffusionFinance() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Diffusion Models for Finance</h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Diffusion models generate data by learning to reverse a gradual noising process. Starting from pure noise, the model iteratively denoises to produce realistic samples. For financial applications, diffusion models generate high-fidelity Nifty return paths, option-implied distributions, and multi-asset correlation structures with superior sample quality compared to GANs.</p>

      <DefinitionBlock title="Denoising Diffusion Probabilistic Model (DDPM)" label="Definition 13.12" definition="A DDPM defines a forward process that gradually adds Gaussian noise to data over T steps, and a learned reverse process that removes noise to generate samples. The forward process is a Markov chain: q(x_t|x_{t-1}) = N(x_t; sqrt(1-beta_t) x_{t-1}, beta_t I), where beta_t is the noise schedule." notation="q(x_t|x_0) = \mathcal{N}(x_t; \sqrt{\bar{\alpha}_t} x_0, (1-\bar{\alpha}_t)I), \quad \bar{\alpha}_t = \prod_{s=1}^{t}(1-\beta_s)" />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Forward and Reverse Process</h3>
      <BlockMath math="\text{Forward: } x_t = \sqrt{\bar{\alpha}_t}\, x_0 + \sqrt{1 - \bar{\alpha}_t}\, \epsilon, \quad \epsilon \sim \mathcal{N}(0, I)" />
      <BlockMath math="\text{Reverse: } x_{t-1} = \frac{1}{\sqrt{\alpha_t}}\left(x_t - \frac{\beta_t}{\sqrt{1-\bar{\alpha}_t}}\epsilon_\theta(x_t, t)\right) + \sigma_t z" />
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">The neural network <InlineMath math="\epsilon_\theta" /> learns to predict the noise added at each step. The training objective is simply:</p>
      <BlockMath math="\mathcal{L} = E_{t, x_0, \epsilon}\left[||\epsilon - \epsilon_\theta(\sqrt{\bar{\alpha}_t}\, x_0 + \sqrt{1-\bar{\alpha}_t}\, \epsilon, t)||^2\right]" />

      <TheoremBlock title="Diffusion Models as Score Matching" label="Theorem 13.12" statement="Diffusion models learn the score function (gradient of log-density) of the data distribution: epsilon_theta(x_t, t) is proportional to the negative score -nabla_x log p_t(x). This means the reverse diffusion process follows the score toward high-density regions, generating samples from the data distribution." proof="The denoising objective minimizes E[||epsilon - epsilon_theta||^2] = E[||nabla_x log q(x_t|x_0) - epsilon_theta||^2] up to a constant. Since nabla_x log q(x_t|x_0) = -(x_t - sqrt(alpha_bar_t) x_0)/(1-alpha_bar_t) = -epsilon/sqrt(1-alpha_bar_t), the noise predictor is equivalent to learning the score." />

      <NoteBlock title="Diffusion Models for Indian Financial Data" type="tip">
        <ul className="space-y-1 text-sm">
          <li><strong>Quality:</strong> Diffusion models generate higher-fidelity return paths than GANs (no mode collapse)</li>
          <li><strong>Conditional:</strong> Condition on macro state to generate regime-specific Nifty scenarios</li>
          <li><strong>Multi-asset:</strong> Joint diffusion over Nifty + Bank Nifty + Gold + INR preserves correlations</li>
          <li><strong>Option Pricing:</strong> Generate implied density for exotic Nifty option pricing</li>
        </ul>
      </NoteBlock>

      <InteractiveViz />

      <PythonCode title="diffusion_finance.py" runnable code={`import numpy as np

class FinancialDDPM:
    """Simplified DDPM for financial time series generation."""
    def __init__(self, seq_length, n_steps=100, hidden=32):
        self.seq_len = seq_length
        self.T = n_steps
        self.betas = np.linspace(1e-4, 0.02, n_steps)
        self.alphas = 1 - self.betas
        self.alpha_bars = np.cumprod(self.alphas)
        scale = 0.1
        self.W1 = np.random.randn(hidden, seq_length + 1) * scale
        self.W2 = np.random.randn(seq_length, hidden) * scale

    def forward_process(self, x0, t):
        alpha_bar = self.alpha_bars[t]
        noise = np.random.randn(*x0.shape)
        xt = np.sqrt(alpha_bar) * x0 + np.sqrt(1 - alpha_bar) * noise
        return xt, noise

    def predict_noise(self, xt, t):
        t_embed = np.array([t / self.T])
        inp = np.concatenate([xt, t_embed])
        h = np.maximum(self.W1 @ inp, 0)
        return self.W2 @ h

    def sample(self, n_samples):
        samples = []
        for _ in range(n_samples):
            x = np.random.randn(self.seq_len)
            for t in range(self.T - 1, -1, -1):
                eps_pred = self.predict_noise(x, t)
                alpha = self.alphas[t]
                alpha_bar = self.alpha_bars[t]
                beta = self.betas[t]
                x = (1 / np.sqrt(alpha)) * (x - beta / np.sqrt(1 - alpha_bar) * eps_pred)
                if t > 0:
                    x += np.sqrt(beta) * np.random.randn(self.seq_len)
            samples.append(x * 0.015)
        return np.array(samples)

# Generate Nifty scenarios via diffusion
np.random.seed(42)
seq_len = 63  # 3 months
ddpm = FinancialDDPM(seq_length=seq_len, n_steps=50)

# Generate scenarios
scenarios = ddpm.sample(500)

# Compare with real-like data
real = np.random.normal(0.0004, 0.014, (500, seq_len))
for i in range(500):
    jumps = np.random.choice(seq_len, np.random.poisson(2), replace=False)
    real[i, jumps] += np.random.normal(0, 0.035, len(jumps))

print("=" * 55)
print("  Diffusion Model - Nifty Scenario Generation")
print("=" * 55)
print(f"\\nDiffusion steps: {ddpm.T}")
print(f"Sequence length: {seq_len} days")
print(f"Scenarios generated: {len(scenarios)}")

def stats(data, name):
    cum_ret = np.sum(data, axis=1) * 100
    print(f"\\n{name}:")
    print(f"  Mean daily ret: {np.mean(data)*100:>+.4f}%")
    print(f"  Daily vol:      {np.std(data)*100:>.4f}%")
    print(f"  Cum return:     {np.mean(cum_ret):>+.2f}% +/- {np.std(cum_ret):.2f}%")
    print(f"  VaR(5%):        {np.percentile(cum_ret, 5):>+.2f}%")
    print(f"  Skewness:       {np.mean(((data.flatten()-data.mean())/data.std())**3):.3f}")

stats(real, "Real Nifty (simulated)")
stats(scenarios, "DDPM Generated")

print(f"\\nNote: Untrained DDPM produces Gaussian-like samples.")
print(f"Trained model would match higher moments and tail structure.")`} />

      <ExampleBlock title="Diffusion Steps and Sample Quality" difficulty="intermediate"
        problem="A DDPM for Nifty uses 1000 steps with linear beta schedule [0.0001, 0.02]. What is alpha_bar at step 500 (midpoint)? How noisy is the data?"
        solution={[
          { step: 'Compute beta at step 500', formula: '\\beta_{500} = 0.0001 + \\frac{500}{1000}(0.02 - 0.0001) \\approx 0.01', explanation: 'Linear interpolation gives beta around 0.01 at the midpoint.' },
          { step: 'Approximate alpha_bar', formula: '\\bar{\\alpha}_{500} = \\prod_{s=1}^{500}(1-\\beta_s) \\approx \\exp(-\\sum \\beta_s)', explanation: 'Sum of betas from 1 to 500 is approximately 2.5, so alpha_bar_500 ≈ exp(-2.5) ≈ 0.08.' },
          { step: 'Noise level', formula: '\\sqrt{1 - \\bar{\\alpha}_{500}} \\approx \\sqrt{0.92} \\approx 0.96', explanation: 'At step 500, the data is 96% noise and only 8% signal (sqrt(0.08) ≈ 0.28). The reverse process must denoise from this heavily corrupted state, which is why the neural network needs sufficient capacity to learn the score function.' },
        ]} />

      <NoteBlock title="Key Takeaway" type="tip"><p>Diffusion models represent the state-of-the-art in generative modeling for financial time series. They produce higher-quality samples than GANs (no mode collapse) with a simpler, more stable training objective. For Indian market applications, diffusion models can generate unlimited Nifty scenarios conditioned on macro states, enabling comprehensive stress testing and risk assessment beyond historical data limitations. The score-matching interpretation connects diffusion models to classical stochastic finance concepts.</p></NoteBlock>
    </div>
  )
}
