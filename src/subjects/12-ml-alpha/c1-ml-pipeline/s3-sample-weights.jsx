import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveSampleWeights() {
  const [concurrency, setConcurrency] = useState(5)
  const [decayFactor, setDecayFactor] = useState(0.95)
  const [nSamples, setNSamples] = useState(10)

  const weights = []
  for (let i = 0; i < nSamples; i++) {
    const uniqueness = 1 / Math.max(1, concurrency - Math.abs(i - nSamples / 2))
    const timeDecay = Math.pow(decayFactor, nSamples - 1 - i)
    const combined = uniqueness * timeDecay
    weights.push({ idx: i, uniqueness, timeDecay, combined })
  }

  const totalW = weights.reduce((s, w) => s + w.combined, 0)
  const normalizedWeights = weights.map(w => ({ ...w, normalized: w.combined / totalW }))
  const effectiveN = Math.pow(totalW, 2) / weights.reduce((s, w) => s + w.combined ** 2, 0)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Sample Weight Visualization
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust concurrency and decay to see how sample weights change for Nifty 50 trading signals.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Avg Concurrency = {concurrency}</span>
          <input type="range" min="1" max="15" step="1" value={concurrency}
            onChange={e => setConcurrency(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Time Decay = {decayFactor.toFixed(2)}</span>
          <input type="range" min="0.8" max="1" step="0.01" value={decayFactor}
            onChange={e => setDecayFactor(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Samples = {nSamples}</span>
          <input type="range" min="5" max="20" step="1" value={nSamples}
            onChange={e => setNSamples(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 420 130" className="w-full max-w-lg mx-auto block">
        {normalizedWeights.map((w, i) => {
          const x = 30 + i * (360 / nSamples)
          const barHeight = w.normalized * nSamples * 80
          return (
            <g key={i}>
              <rect x={x} y={110 - barHeight} width={Math.max(300 / nSamples - 2, 8)}
                height={barHeight} fill="#6366f1" opacity="0.7" rx="2" />
              <text x={x + Math.max(150 / nSamples - 1, 4)} y="125"
                textAnchor="middle" className="text-[7px]" fill="#6b7280">{i}</text>
            </g>
          )
        })}
        <text x="210" y="12" textAnchor="middle" className="text-[9px] font-bold" fill="#4338ca">
          Normalized Sample Weights
        </text>
      </svg>

      <div className="mt-3 grid grid-cols-2 gap-3 text-center text-xs">
        <div className="rounded-lg bg-indigo-50 p-2 dark:bg-indigo-900/30">
          <span className="text-gray-500 dark:text-gray-400">Effective N</span>
          <p className="text-base font-bold text-indigo-600 dark:text-indigo-400">{effectiveN.toFixed(1)} / {nSamples}</p>
        </div>
        <div className="rounded-lg bg-amber-50 p-2 dark:bg-amber-900/30">
          <span className="text-gray-500 dark:text-gray-400">Weight Efficiency</span>
          <p className="text-base font-bold text-amber-600 dark:text-amber-400">{(effectiveN / nSamples * 100).toFixed(0)}%</p>
        </div>
      </div>
    </div>
  )
}

export default function SampleWeights() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Sample Weights and Uniqueness
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        In financial ML, observations are not independent -- labels from overlapping
        holding periods share information. Proper sample weighting corrects for this
        dependency, preventing the model from overfitting to redundant samples. This
        is critical for Indian equity strategies where Nifty futures positions often
        overlap across multiple trading signals.
      </p>

      <DefinitionBlock
        title="Sample Uniqueness"
        label="Definition 12.3"
        definition="The uniqueness of sample i at time t is the reciprocal of the number of concurrent labels at that time: u_{i,t} = 1/c_t. The average uniqueness of sample i is the mean of u_{i,t} over the sample's lifespan T_i. Samples with higher uniqueness carry more independent information and should receive higher weight during training."
        notation="\bar{u}_i = \frac{1}{|T_i|} \sum_{t \in T_i} \frac{1}{c_t}"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Concurrency and Information Overlap
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        When multiple labels are active simultaneously, they share the same price
        information. The concurrency at time <InlineMath math="t" /> counts overlapping labels:
      </p>

      <BlockMath math="c_t = \sum_{i=1}^{N} \mathbf{1}[t_i^{start} \leq t \leq t_i^{end}]" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The effective number of independent observations is:
      </p>

      <BlockMath math="N_{eff} = \frac{\left(\sum_{i=1}^{N} w_i\right)^2}{\sum_{i=1}^{N} w_i^2}" />

      <TheoremBlock
        title="Optimal Sample Weight"
        label="Theorem 12.3"
        statement="The optimal sample weight that maximizes the effective number of independent observations while accounting for both uniqueness and return attribution is: w_i = \bar{u}_i \cdot |r_i|, where \bar{u}_i is the average uniqueness and |r_i| is the absolute return attributed to sample i."
        proof="The uniqueness weight \bar{u}_i ensures that concurrent labels are not double-counted. The return attribution |r_i| ensures that samples contributing larger price movements receive proportionally higher weight, as they carry more signal relative to noise. The product balances information content with independence."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Time Decay Weights
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        In non-stationary markets like NSE, recent observations are more relevant.
        Time decay weights give more importance to recent samples:
      </p>

      <BlockMath math="w_t^{decay} = \lambda^{T-t}, \quad 0 < \lambda \leq 1" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The combined weight multiplies uniqueness with time decay:
      </p>

      <BlockMath math="w_i^{final} = \bar{u}_i \cdot \lambda^{T - t_i} \cdot |r_i|" />

      <NoteBlock title="Sample Weighting for Indian Markets" type="tip">
        <ul className="space-y-1 text-sm">
          <li><strong>Budget Days:</strong> Union Budget, RBI Policy days create high-impact
            samples that deserve higher weight</li>
          <li><strong>Expiry Effects:</strong> Nifty/Bank Nifty monthly expiry creates
            artificial volatility -- consider down-weighting expiry-day samples</li>
          <li><strong>FII Flow Regime:</strong> Weight samples differently during FII buying
            vs selling regimes (structural breaks in Nifty dynamics)</li>
          <li><strong>Muhurat Trading:</strong> Diwali Muhurat session is a single-hour session
            with different dynamics -- exclude or down-weight</li>
        </ul>
      </NoteBlock>

      <InteractiveSampleWeights />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Sequential Bootstrapping
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Standard bootstrapping draws i.i.d. samples, which is invalid for overlapping
        financial labels. Sequential bootstrapping draws samples that minimize
        information overlap:
      </p>

      <BlockMath math="P(\text{draw } i | S_{drawn}) \propto \bar{u}_i(S_{drawn})" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where the uniqueness is recomputed at each step conditioned on the already-drawn
        samples <InlineMath math="S_{drawn}" />, ensuring each new draw adds maximum
        independent information.
      </p>

      <PythonCode
        title="sample_weights.py"
        runnable
        code={`import numpy as np

class SampleWeightEngine:
    """Sample weight computation for financial ML."""

    def __init__(self, n_observations):
        self.n = n_observations
        self.labels = []

    def add_label(self, start, end, ret):
        self.labels.append({'start': start, 'end': end, 'return': ret})

    def compute_concurrency(self):
        concurrency = np.zeros(self.n)
        for lbl in self.labels:
            for t in range(lbl['start'], min(lbl['end'] + 1, self.n)):
                concurrency[t] += 1
        return concurrency

    def compute_uniqueness(self):
        concurrency = self.compute_concurrency()
        uniqueness = []
        for lbl in self.labels:
            times = range(lbl['start'], min(lbl['end'] + 1, self.n))
            u_vals = [1.0 / concurrency[t] for t in times if concurrency[t] > 0]
            uniqueness.append(np.mean(u_vals) if u_vals else 0)
        return np.array(uniqueness)

    def time_decay_weights(self, decay_factor=0.95):
        n_labels = len(self.labels)
        return np.array([decay_factor ** (n_labels - 1 - i) for i in range(n_labels)])

    def combined_weights(self, decay_factor=0.95, use_returns=True):
        uniqueness = self.compute_uniqueness()
        time_decay = self.time_decay_weights(decay_factor)
        weights = uniqueness * time_decay
        if use_returns:
            returns = np.array([abs(lbl['return']) for lbl in self.labels])
            returns = returns / (returns.mean() + 1e-10)  # normalize
            weights *= returns
        total = weights.sum()
        if total > 0:
            weights /= total
        return weights

    def effective_n(self, weights):
        return np.sum(weights) ** 2 / np.sum(weights ** 2)

    def sequential_bootstrap(self, n_draws):
        """Draw samples with probability proportional to uniqueness."""
        drawn = []
        available = list(range(len(self.labels)))
        for _ in range(n_draws):
            if not available:
                break
            # Compute uniqueness given already drawn
            probs = []
            for idx in available:
                lbl = self.labels[idx]
                overlap = 0
                for d_idx in drawn:
                    d_lbl = self.labels[d_idx]
                    overlap += max(0, min(lbl['end'], d_lbl['end']) -
                                  max(lbl['start'], d_lbl['start']))
                probs.append(1.0 / (1 + overlap))
            probs = np.array(probs) / sum(probs)
            choice = np.random.choice(len(available), p=probs)
            drawn.append(available[choice])
        return drawn

# Simulate overlapping labels for Nifty 50 signals
np.random.seed(42)
n_days = 252
engine = SampleWeightEngine(n_days)

# Generate labels with varying holding periods
for i in range(0, n_days - 15, 3):  # Signal every 3 days
    holding = np.random.randint(5, 15)
    ret = np.random.normal(0.002, 0.02)
    engine.add_label(i, min(i + holding, n_days - 1), ret)

n_labels = len(engine.labels)
concurrency = engine.compute_concurrency()
uniqueness = engine.compute_uniqueness()
weights = engine.combined_weights(decay_factor=0.97)
eff_n = engine.effective_n(weights)

print("=" * 55)
print("  Sample Weights - Nifty 50 Trading Signals")
print("=" * 55)
print(f"\\nTotal labels:           {n_labels}")
print(f"Avg concurrency:        {np.mean(concurrency[concurrency > 0]):.1f}")
print(f"Max concurrency:        {np.max(concurrency):.0f}")
print(f"Avg uniqueness:         {np.mean(uniqueness):.3f}")
print(f"Effective N:            {eff_n:.1f} / {n_labels}")
print(f"Weight efficiency:      {eff_n / n_labels * 100:.1f}%")

print(f"\\nWeight Distribution:")
print(f"  Min weight:  {np.min(weights):.4f}")
print(f"  Max weight:  {np.max(weights):.4f}")
print(f"  Std weight:  {np.std(weights):.4f}")
print(f"  Gini coeff:  {np.mean(np.abs(np.subtract.outer(weights, weights))) / (2 * np.mean(weights)):.3f}")

# Sequential bootstrap
drawn = engine.sequential_bootstrap(n_draws=50)
print(f"\\nSequential Bootstrap:")
print(f"  Drew {len(drawn)} samples from {n_labels}")
print(f"  Unique indices: {len(set(drawn))}")`}
      />

      <ExampleBlock
        title="Computing Sample Uniqueness"
        difficulty="intermediate"
        problem="Three Nifty trading labels overlap: Label A spans days 1-5, Label B spans days 3-8, Label C spans days 6-10. Compute the average uniqueness of Label B."
        solution={[
          {
            step: 'Compute concurrency at each time step',
            formula: 'c_3 = 2 \\text{ (A,B)},\\; c_4 = 2 \\text{ (A,B)},\\; c_5 = 2 \\text{ (A,B)},\\; c_6 = 2 \\text{ (B,C)},\\; c_7 = 2 \\text{ (B,C)},\\; c_8 = 2 \\text{ (B,C)}',
            explanation: 'Label B overlaps with A on days 3-5 and with C on days 6-8.',
          },
          {
            step: 'Compute uniqueness at each time step',
            formula: 'u_{B,t} = 1/c_t = 1/2 \\text{ for all } t \\in \\{3,4,5,6,7,8\\}',
            explanation: 'At every time step, Label B shares information with exactly one other label.',
          },
          {
            step: 'Compute average uniqueness',
            formula: '\\bar{u}_B = \\frac{1}{6}(0.5 + 0.5 + 0.5 + 0.5 + 0.5 + 0.5) = 0.5',
            explanation: 'Label B has 50% uniqueness, meaning it shares half its information with other labels. Its weight should be proportionally reduced compared to a non-overlapping label.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Sample weights correct for the non-IID nature of financial data. The three
          key components are: (1) uniqueness weights that account for label overlap,
          (2) time decay weights that prioritize recent observations, and (3) return
          attribution weights that emphasize high-signal observations. For Indian equity
          strategies, also consider event-based weighting for high-impact days (Budget,
          RBI policy, election results) and down-weighting market microstructure noise
          around F&O expiry dates.
        </p>
      </NoteBlock>
    </div>
  )
}
