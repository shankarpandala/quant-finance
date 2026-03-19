import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveSHAP() {
  const [momentum, setMomentum] = useState(1.5)
  const [fiiFlow, setFiiFlow] = useState(0.8)
  const [vix, setVix] = useState(-0.5)
  const [volume, setVolume] = useState(0.3)

  const shapMom = 0.12 * momentum
  const shapFII = 0.15 * fiiFlow
  const shapVIX = -0.10 * vix
  const shapVol = 0.05 * volume
  const baseValue = 0.02
  const prediction = baseValue + shapMom + shapFII + shapVIX + shapVol

  const shapValues = [
    { name: 'FII Flow', shap: shapFII, color: shapFII >= 0 ? '#16a34a' : '#dc2626' },
    { name: 'Momentum', shap: shapMom, color: shapMom >= 0 ? '#16a34a' : '#dc2626' },
    { name: 'VIX', shap: shapVIX, color: shapVIX >= 0 ? '#16a34a' : '#dc2626' },
    { name: 'Volume', shap: shapVol, color: shapVol >= 0 ? '#16a34a' : '#dc2626' },
  ].sort((a, b) => Math.abs(b.shap) - Math.abs(a.shap))

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: SHAP Waterfall for Nifty Prediction
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust feature values to see SHAP attribution for a single Nifty 50 return prediction.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Momentum = {momentum.toFixed(1)}</span>
          <input type="range" min="-3" max="3" step="0.1" value={momentum}
            onChange={e => setMomentum(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>FII Flow = {fiiFlow.toFixed(1)}</span>
          <input type="range" min="-3" max="3" step="0.1" value={fiiFlow}
            onChange={e => setFiiFlow(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>VIX = {vix.toFixed(1)}</span>
          <input type="range" min="-3" max="3" step="0.1" value={vix}
            onChange={e => setVix(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Volume = {volume.toFixed(1)}</span>
          <input type="range" min="-3" max="3" step="0.1" value={volume}
            onChange={e => setVolume(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 400 150" className="w-full max-w-lg mx-auto block">
        <text x="50" y="15" className="text-[9px]" fill="#6b7280">Base: {(baseValue * 100).toFixed(2)}%</text>
        <line x1="200" y1="20" x2="200" y2="130" stroke="#d1d5db" strokeWidth="1" strokeDasharray="3" />

        {shapValues.map((sv, i) => {
          const barWidth = Math.abs(sv.shap) * 500
          const x = sv.shap >= 0 ? 200 : 200 - barWidth
          return (
            <g key={sv.name}>
              <text x="55" y={38 + i * 25} textAnchor="end" className="text-[9px]" fill="#6b7280">{sv.name}</text>
              <rect x={x} y={28 + i * 25} width={barWidth} height="16" rx="2" fill={sv.color} opacity="0.7" />
              <text x={sv.shap >= 0 ? x + barWidth + 5 : x - 5} y={40 + i * 25}
                textAnchor={sv.shap >= 0 ? 'start' : 'end'}
                className="text-[8px] font-bold" fill={sv.color}>
                {sv.shap >= 0 ? '+' : ''}{(sv.shap * 100).toFixed(2)}%
              </text>
            </g>
          )
        })}

        <text x="200" y="140" textAnchor="middle" className="text-[10px] font-bold"
          fill={prediction >= 0 ? '#16a34a' : '#dc2626'}>
          Prediction: {prediction >= 0 ? '+' : ''}{(prediction * 100).toFixed(2)}%
        </text>
      </svg>
    </div>
  )
}

export default function SHAPFinance() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        SHAP Values for Financial Models
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        SHAP (SHapley Additive exPlanations) provides theoretically grounded feature
        attributions based on cooperative game theory. For ML-based trading models on
        NSE/BSE, SHAP enables understanding why a model predicts a particular stock
        to outperform, decomposing each prediction into individual feature contributions.
      </p>

      <DefinitionBlock
        title="Shapley Value"
        label="Definition 12.8"
        definition="The Shapley value of feature j for prediction f(x) is the average marginal contribution of feature j across all possible orderings of features. It uniquely satisfies four axioms: efficiency (contributions sum to the prediction minus base value), symmetry, dummy (zero contribution features get zero value), and additivity."
        notation="\phi_j(x) = \sum_{S \subseteq F \setminus \{j\}} \frac{|S|!(|F|-|S|-1)!}{|F|!} [f(S \cup \{j\}) - f(S)]"
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        The SHAP Formula
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For a model <InlineMath math="f" /> with <InlineMath math="K" /> features, the
        SHAP value of feature <InlineMath math="j" /> is:
      </p>

      <BlockMath math="\phi_j(x) = \sum_{S \subseteq \{1,...,K\} \setminus \{j\}} \frac{|S|! \cdot (K - |S| - 1)!}{K!} \left[f_{S \cup \{j\}}(x_{S \cup \{j\}}) - f_S(x_S)\right]" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The efficiency property ensures that SHAP values exactly decompose the prediction:
      </p>

      <BlockMath math="f(x) = \phi_0 + \sum_{j=1}^{K} \phi_j(x) \quad \text{where } \phi_0 = E[f(X)]" />

      <TheoremBlock
        title="SHAP Uniqueness Theorem"
        label="Theorem 12.8"
        statement="The Shapley value is the unique attribution method satisfying four axioms simultaneously: (1) Efficiency: \sum_j \phi_j = f(x) - E[f(X)], (2) Symmetry: features with identical contributions receive equal values, (3) Dummy: a feature that never changes the prediction receives \phi_j = 0, (4) Additivity: \phi_j(f+g) = \phi_j(f) + \phi_j(g)."
        proof="Proven by Shapley (1953). The key insight is that among all possible attribution methods, only one simultaneously satisfies all four axioms. Any method violating any axiom can lead to misleading feature attributions, potentially causing incorrect trading decisions."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        TreeSHAP for Financial Models
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For tree ensemble models (the most common in financial ML), TreeSHAP computes
        exact SHAP values in <InlineMath math="O(TLD^2)" /> time instead of the
        exponential <InlineMath math="O(2^K)" /> of exact Shapley:
      </p>

      <BlockMath math="\phi_j^{tree}(x) = \sum_{m=1}^{M} \sum_{t \in T_m} \Delta_{t,j}(x)" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\Delta_{t,j}(x)" /> is the SHAP contribution of
        feature <InlineMath math="j" /> at node <InlineMath math="t" />.
      </p>

      <NoteBlock title="SHAP Applications in Indian Trading" type="tip">
        <ul className="space-y-1 text-sm">
          <li><strong>Trade Attribution:</strong> SHAP explains why a model went long on a
            specific Nifty stock (e.g., strong FII buying + low VIX)</li>
          <li><strong>Regime Analysis:</strong> Aggregate SHAP values across time to identify
            which features drive alpha in different market regimes</li>
          <li><strong>Risk Management:</strong> If a model's predictions are primarily driven by
            a single feature, the portfolio is exposed to single-factor risk</li>
          <li><strong>SEBI Compliance:</strong> SHAP provides model explainability required for
            institutional algo trading audits under SEBI guidelines</li>
        </ul>
      </NoteBlock>

      <InteractiveSHAP />

      <PythonCode
        title="shap_analysis.py"
        runnable
        code={`import numpy as np

class ApproximateSHAP:
    """Approximate SHAP values for financial model interpretation."""

    def __init__(self, model_fn, background_data):
        self.model_fn = model_fn
        self.background = background_data
        self.base_value = np.mean([model_fn(x) for x in background_data])

    def compute_shap(self, x, n_samples=100):
        """Monte Carlo approximation of SHAP values."""
        K = len(x)
        shap_values = np.zeros(K)

        for _ in range(n_samples):
            # Random permutation of features
            perm = np.random.permutation(K)
            # Random background sample
            bg = self.background[np.random.randint(len(self.background))]

            x_before = bg.copy()
            x_after = bg.copy()

            for j in perm:
                x_after[j] = x[j]
                marginal = self.model_fn(x_after) - self.model_fn(x_before)
                shap_values[j] += marginal
                x_before[j] = x[j]

        shap_values /= n_samples
        return shap_values

    def feature_interaction(self, x, feat_i, feat_j, n_samples=50):
        """SHAP interaction value between two features."""
        K = len(x)
        interaction = 0

        for _ in range(n_samples):
            bg = self.background[np.random.randint(len(self.background))]

            # With both
            x_both = bg.copy()
            x_both[feat_i] = x[feat_i]
            x_both[feat_j] = x[feat_j]

            # With only i
            x_i = bg.copy()
            x_i[feat_i] = x[feat_i]

            # With only j
            x_j = bg.copy()
            x_j[feat_j] = x[feat_j]

            interaction += (self.model_fn(x_both) - self.model_fn(x_i) -
                          self.model_fn(x_j) + self.model_fn(bg))

        return interaction / n_samples

# Simulate Nifty alpha model
def nifty_alpha_model(x):
    """Nonlinear alpha model with interactions."""
    momentum, fii, vix, volume, rsi, delivery = x[:6]
    return (0.15 * momentum * (1 + 0.3 * fii) +  # momentum-FII interaction
            0.10 * fii +
            -0.08 * vix +
            0.05 * volume * delivery +              # volume-delivery interaction
            0.03 * rsi +
            0.02)  # base

np.random.seed(42)
feature_names = ['momentum', 'fii_flow', 'india_vix', 'volume', 'rsi', 'delivery_pct']

# Background data (training distribution)
background = np.random.randn(200, 6)

# Instance to explain
x_instance = np.array([1.5, 0.8, -0.5, 1.2, 0.3, 0.7])

# Compute SHAP
explainer = ApproximateSHAP(nifty_alpha_model, background)
shap_vals = explainer.compute_shap(x_instance, n_samples=500)

print("=" * 55)
print("  SHAP Analysis - Nifty 50 Alpha Prediction")
print("=" * 55)
print(f"\\nPrediction: {nifty_alpha_model(x_instance)*100:.3f}%")
print(f"Base value:  {explainer.base_value*100:.3f}%")
print(f"\\n{'Feature':<16} {'Value':>8} {'SHAP':>8} {'Contrib':>8}")
print("-" * 45)
for name, val, sv in sorted(zip(feature_names, x_instance, shap_vals),
                              key=lambda x: -abs(x[2])):
    print(f"{name:<16} {val:>8.2f} {sv*100:>+7.3f}% {'+' if sv>0 else '-':>1}")

# Verify efficiency
print(f"\\nEfficiency check:")
print(f"  Sum of SHAP:  {sum(shap_vals)*100:.3f}%")
print(f"  Pred - base:  {(nifty_alpha_model(x_instance) - explainer.base_value)*100:.3f}%")

# Feature interactions
print(f"\\nKey Feature Interactions:")
interactions = [
    ('momentum', 'fii_flow', 0, 1),
    ('volume', 'delivery_pct', 3, 5),
    ('momentum', 'india_vix', 0, 2),
]
for name1, name2, i, j in interactions:
    inter = explainer.feature_interaction(x_instance, i, j, n_samples=200)
    print(f"  {name1} x {name2}: {inter*100:>+.3f}%")`}
      />

      <ExampleBlock
        title="SHAP Attribution for a Nifty Trade"
        difficulty="intermediate"
        problem="A GBM model predicts Nifty 50 to return +0.35% tomorrow. The base value (average prediction) is +0.02%. SHAP values are: momentum=+0.18%, FII flow=+0.12%, VIX=+0.05%, volume=-0.02%. Verify efficiency and interpret."
        solution={[
          {
            step: 'Verify efficiency axiom',
            formula: '\\phi_0 + \\sum_j \\phi_j = 0.02 + 0.18 + 0.12 + 0.05 - 0.02 = 0.35\\%',
            explanation: 'The SHAP values plus base value exactly equal the prediction (0.35%). Efficiency is satisfied.',
          },
          {
            step: 'Interpret dominant features',
            formula: '\\phi_{momentum} = +0.18\\% \\text{ (largest positive contributor)}',
            explanation: 'Strong recent momentum is the primary driver of the bullish prediction.',
          },
          {
            step: 'FII flow confirmation',
            formula: '\\phi_{FII} = +0.12\\% \\text{ (second largest)}',
            explanation: 'Positive FII flow supports the momentum signal, providing confirmation.',
          },
          {
            step: 'Risk assessment',
            formula: '\\phi_{volume} = -0.02\\% \\text{ (negative but small)}',
            explanation: 'Volume is slightly negative, suggesting the momentum may lack volume support. This is a minor warning sign. The prediction is primarily momentum + FII driven, making it sensitive to sudden FII flow reversal.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          SHAP provides the gold standard for model explainability in financial ML.
          For Indian equity trading, SHAP enables: per-trade attribution (why this
          prediction), feature interaction discovery (how momentum and FII flows
          interact), and model monitoring (detecting feature importance drift across
          market regimes). TreeSHAP makes this computationally feasible for production
          models. Always verify the efficiency axiom and use SHAP interaction values
          to discover nonlinear feature combinations that drive alpha.
        </p>
      </NoteBlock>
    </div>
  )
}
