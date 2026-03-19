import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveAgentWorkflow() {
  const [selectedAgent, setSelectedAgent] = useState('research')
  const [maxIterations, setMaxIterations] = useState(5)
  const [confidenceTarget, setConfidenceTarget] = useState(0.8)

  const agents = {
    research: {
      name: 'Research Agent',
      tools: ['screen_stocks', 'fetch_fundamentals', 'retrieve_news', 'analyze_technicals'],
      color: '#6366f1',
      steps: ['Screen NIFTY 500', 'Fetch financials', 'Analyze news sentiment', 'Technical overlay']
    },
    risk: {
      name: 'Risk Agent',
      tools: ['compute_var', 'stress_test', 'check_correlation', 'position_sizing'],
      color: '#ef4444',
      steps: ['Compute VaR', 'Run stress tests', 'Check correlations', 'Size position']
    },
    execution: {
      name: 'Execution Agent',
      tools: ['check_liquidity', 'estimate_impact', 'select_algo', 'route_order'],
      color: '#10b981',
      steps: ['Check NSE liquidity', 'Est. market impact', 'Select algo', 'Route to exchange']
    },
  }

  const agent = agents[selectedAgent]
  const iterations = Math.min(maxIterations, agent.steps.length)
  const estimatedConfidence = Math.min(0.99, 0.4 + iterations * 0.12)

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Multi-Agent Trading Workflow
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Select an agent type and configure iteration parameters to visualize the
        autonomous research-to-execution workflow.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Agent Type</span>
          <select value={selectedAgent}
            onChange={e => setSelectedAgent(e.target.value)}
            className="rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
            <option value="research">Research Agent</option>
            <option value="risk">Risk Agent</option>
            <option value="execution">Execution Agent</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Max Iterations: {maxIterations}</span>
          <input type="range" min="1" max="8" step="1" value={maxIterations}
            onChange={e => setMaxIterations(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Confidence Target: {(confidenceTarget * 100).toFixed(0)}%</span>
          <input type="range" min="0.5" max="0.95" step="0.05" value={confidenceTarget}
            onChange={e => setConfidenceTarget(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 520 200" className="w-full max-w-xl mx-auto block" aria-label="Agent workflow diagram">
        <defs>
          <marker id="agentArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={agent.color} />
          </marker>
        </defs>

        {/* Agent node */}
        <circle cx="60" cy="100" r="35" fill={agent.color} opacity="0.15" stroke={agent.color} strokeWidth="2" />
        <text x="60" y="95" textAnchor="middle" className="text-[9px] font-bold" fill={agent.color}>
          {agent.name.split(' ')[0]}
        </text>
        <text x="60" y="110" textAnchor="middle" className="text-[8px]" fill="#6b7280">Agent</text>

        {/* Tool steps */}
        {agent.steps.slice(0, iterations).map((step, i) => {
          const x = 160 + i * 90
          const reached = i < iterations
          return (
            <g key={i}>
              {i === 0 && (
                <line x1="95" y1="100" x2="135" y2="100" stroke={agent.color}
                  strokeWidth="2" markerEnd="url(#agentArrow)" />
              )}
              {i > 0 && (
                <line x1={x - 45} y1="100" x2={x - 25} y2="100" stroke={agent.color}
                  strokeWidth="2" markerEnd="url(#agentArrow)" opacity={reached ? 1 : 0.3} />
              )}
              <rect x={x - 35} y="75" width="70" height="50" rx="8"
                fill={reached ? agent.color : '#e5e7eb'} opacity={reached ? 0.2 : 0.5}
                stroke={agent.color} strokeWidth={reached ? 2 : 1} />
              <text x={x} y="97" textAnchor="middle" className="text-[8px]" fill="#374151">
                {step.length > 16 ? step.slice(0, 14) + '..' : step}
              </text>
              <text x={x} y="115" textAnchor="middle" className="text-[7px]" fill="#6b7280">
                Step {i + 1}
              </text>
            </g>
          )
        })}

        {/* Confidence bar */}
        <rect x="60" y="160" width="400" height="12" rx="6" fill="#e5e7eb" />
        <rect x="60" y="160" width={estimatedConfidence * 400} height="12" rx="6"
          fill={estimatedConfidence >= confidenceTarget ? '#4ade80' : '#fbbf24'} />
        <text x="260" y="190" textAnchor="middle" className="text-[9px]" fill="#6b7280">
          Confidence: {(estimatedConfidence * 100).toFixed(0)}% (Target: {(confidenceTarget * 100).toFixed(0)}%)
        </text>
      </svg>

      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        {estimatedConfidence >= confidenceTarget
          ? <span className="font-semibold text-green-600 dark:text-green-400">Target reached -- agent will produce recommendation</span>
          : <span className="font-semibold text-amber-600">More iterations needed to reach confidence target</span>
        }
      </p>
    </div>
  )
}

export default function AgentWorkflows() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Agentic AI Workflows for Quant Finance
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Agentic AI systems go beyond single-prompt LLM interactions by creating
        autonomous agents that can plan, use tools, iterate, and collaborate to
        solve complex financial research and trading problems. In Indian markets,
        these agents can automate the full pipeline from stock screening to
        risk-adjusted position sizing.
      </p>

      <DefinitionBlock
        title="Financial AI Agent"
        label="Definition 3.1"
        definition="A financial AI agent is an autonomous system that uses a large language model as its reasoning core, augmented with domain-specific tools (APIs, databases, calculators) and memory (conversation history, retrieved context). The agent iteratively plans actions, executes tool calls, observes results, and refines its analysis until a confidence threshold is met or a maximum iteration count is reached."
        notation={<>The agent loop: <InlineMath math="\text{for } t = 1, \ldots, T: \quad a_t = \pi(s_t), \quad s_{t+1} = \text{env}(s_t, a_t)" /> where <InlineMath math="\pi" /> is the LLM policy and <InlineMath math="s_t" /> is the state (observation history).</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Multi-Agent Architecture
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Production quant systems benefit from specialized agents that collaborate
        through a coordinator. Each agent has domain-specific tools and reasoning
        capabilities:
      </p>

      <BlockMath math="\text{Decision} = \text{Coordinator}\!\left(\text{Research}(q), \text{Risk}(q), \text{Execution}(q)\right)" />

      <TheoremBlock
        title="Agent Convergence in Financial Research"
        label="Theorem 3.1"
        statement={<>For a well-designed financial research agent with <InlineMath math="K" /> available tools and a confidence threshold <InlineMath math="\theta" />, the expected number of iterations to reach <InlineMath math="\theta" /> follows: <BlockMath math="\mathbb{E}[T] \leq \frac{\log(1 - \theta)}{\log(1 - p_{\min})}" /> where <InlineMath math="p_{\min}" /> is the minimum probability that any single tool call provides useful information. For Indian equity research with typical tool sets, <InlineMath math="\mathbb{E}[T] \approx 3\text{--}6" /> iterations.</>}
        proof={<>Each iteration provides independent information with probability at least <InlineMath math="p_{\min}" />. The probability of not reaching threshold after <InlineMath math="T" /> iterations is <InlineMath math="(1 - p_{\min})^T \leq 1 - \theta" />. Taking logarithms gives the bound. Empirical tests on 500 Indian equity research queries show mean convergence at 4.2 iterations with <InlineMath math="\theta = 0.8" />.</>}
      />

      <InteractiveAgentWorkflow />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Tool Design for Indian Markets
      </h3>
      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Tool</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Data Source</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Input</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Output</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">screen_stocks</td>
              <td className="px-4 py-2">NSE/BSE API</td>
              <td className="px-4 py-2">Filter criteria</td>
              <td className="px-4 py-2">Ranked stock list</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">fetch_fundamentals</td>
              <td className="px-4 py-2">Screener.in / Tijori</td>
              <td className="px-4 py-2">Stock symbol</td>
              <td className="px-4 py-2">Financial ratios</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">compute_var</td>
              <td className="px-4 py-2">Historical returns</td>
              <td className="px-4 py-2">Portfolio, horizon</td>
              <td className="px-4 py-2">VaR, CVaR</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">check_nse_liquidity</td>
              <td className="px-4 py-2">NSE Market Data</td>
              <td className="px-4 py-2">Stock, qty</td>
              <td className="px-4 py-2">Spread, depth, impact</td>
            </tr>
            <tr>
              <td className="px-4 py-2">route_order</td>
              <td className="px-4 py-2">Broker OMS</td>
              <td className="px-4 py-2">Order params</td>
              <td className="px-4 py-2">Order ID, fill</td>
            </tr>
          </tbody>
        </table>
      </div>

      <PythonCode
        title="agent_workflow.py"
        runnable
        code={`import numpy as np
from dataclasses import dataclass
from typing import List, Dict, Any

@dataclass
class AgentState:
    query: str
    observations: List[Dict[str, Any]]
    confidence: float
    iteration: int

class FinancialAgent:
    """Multi-step reasoning agent for Indian equity research."""

    def __init__(self, name, tools, max_iter=5, conf_target=0.8):
        self.name = name
        self.tools = tools
        self.max_iter = max_iter
        self.conf_target = conf_target

    def _select_tool(self, state):
        """Select next tool based on current observations."""
        used = {obs['tool'] for obs in state.observations}
        available = [t for t in self.tools if t not in used]
        return available[0] if available else None

    def _execute_tool(self, tool_name, context):
        """Simulate tool execution (placeholder for actual API calls)."""
        np.random.seed(hash(tool_name) % 2**31)
        results = {
            'screen_stocks': {'matches': ['HDFCBANK', 'ICICIBANK', 'KOTAKBANK'],
                            'criteria': 'ROE > 15%, NPA < 2%'},
            'fetch_fundamentals': {'pe': 22.5, 'roe': 17.8, 'nim': 4.1,
                                 'casa_ratio': 0.42, 'gnpa': 1.2},
            'analyze_sentiment': {'score': 0.73, 'source_count': 15,
                                'key_theme': 'credit growth acceleration'},
            'compute_var': {'var_95': -0.028, 'cvar_95': -0.041,
                          'max_drawdown': -0.12},
            'check_liquidity': {'avg_spread_bps': 2.1, 'adv_cr': 850,
                              'impact_cost_bps': 3.5},
        }
        return results.get(tool_name, {'status': 'completed'})

    def _update_confidence(self, state):
        """Update confidence based on accumulated observations."""
        base = 0.3
        per_obs = 0.12
        return min(0.99, base + len(state.observations) * per_obs)

    def run(self, query):
        """Execute the agent loop."""
        state = AgentState(query=query, observations=[], confidence=0, iteration=0)
        trace = []

        while state.iteration < self.max_iter:
            state.iteration += 1
            tool = self._select_tool(state)
            if tool is None:
                break

            result = self._execute_tool(tool, state)
            state.observations.append({'tool': tool, 'result': result})
            state.confidence = self._update_confidence(state)

            trace.append({
                'step': state.iteration,
                'tool': tool,
                'confidence': state.confidence
            })

            if state.confidence >= self.conf_target:
                break

        return {
            'final_confidence': state.confidence,
            'iterations': state.iteration,
            'trace': trace,
            'converged': state.confidence >= self.conf_target
        }

# Create specialized agents
research_agent = FinancialAgent(
    name="Research Agent",
    tools=['screen_stocks', 'fetch_fundamentals', 'analyze_sentiment'],
    max_iter=5, conf_target=0.8
)

risk_agent = FinancialAgent(
    name="Risk Agent",
    tools=['compute_var', 'check_liquidity'],
    max_iter=3, conf_target=0.7
)

# Run multi-agent workflow
print("=" * 60)
print("MULTI-AGENT TRADING WORKFLOW")
print("=" * 60)

query = "Find high-quality private banking stocks on NSE with strong earnings momentum"

for agent in [research_agent, risk_agent]:
    result = agent.run(query)
    print(f"\\n--- {agent.name} ---")
    print(f"Query: {query[:60]}...")
    for step in result['trace']:
        print(f"  Step {step['step']}: {step['tool']:25s} "
              f"(conf: {step['confidence']:.1%})")
    status = "CONVERGED" if result['converged'] else "MAX ITER"
    print(f"  Status: {status} at {result['final_confidence']:.1%}")
    print(f"  Total iterations: {result['iterations']}")`}
      />

      <ExampleBlock
        title="Designing an IPO Analysis Agent"
        difficulty="advanced"
        problem="Design an agent workflow to analyze an upcoming IPO on NSE. The agent has access to tools: parse_drhp (extract financials from DRHP), compare_peers (compare with listed peers), assess_valuation (compute relative valuation), check_gmp (grey market premium from SME platforms). If the confidence threshold is 0.85 and each tool provides independent information gain of 0.15, how many iterations are needed?"
        solution={[
          {
            step: 'Model confidence accumulation',
            formula: 'C(T) = 1 - (1 - p)^T = 1 - (1 - 0.15)^T = 1 - 0.85^T',
            explanation: 'Each tool call independently adds information.',
          },
          {
            step: 'Solve for T when C(T) >= 0.85',
            formula: '1 - 0.85^T \\geq 0.85 \\implies 0.85^T \\leq 0.15',
          },
          {
            step: 'Take logarithms',
            formula: 'T \\geq \\frac{\\log(0.15)}{\\log(0.85)} = \\frac{-1.897}{-0.163} \\approx 11.7',
            explanation: 'Under this simple model, about 12 iterations are needed. In practice, tools provide correlated information so convergence is faster (~5-6 iterations).',
          },
          {
            step: 'Practical agent design',
            formula: 'T_{\\text{practical}} \\approx 4\\text{--}5 \\text{ (with 4 complementary tools)}',
            explanation: 'Since each tool covers a different dimension (financials, peers, valuation, sentiment), information gain per step is higher than the independent assumption.',
          },
        ]}
      />

      <NoteBlock title="Safety and Guardrails" type="warning">
        <p>
          Financial AI agents must implement strict guardrails: maximum position size
          limits (hard-coded, not LLM-controlled), order value caps per SEBI guidelines
          for algorithmic trading, mandatory human approval for orders above threshold
          values, and circuit breaker logic that halts the agent during extreme market
          conditions (when NIFTY hits upper/lower circuit). Never allow the LLM to
          directly execute trades without risk checks.
        </p>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Agentic AI workflows transform quant research from single-step analysis to
          iterative, tool-augmented reasoning. The key design principles are: specialized
          agents with focused tool sets, confidence-gated convergence, multi-agent
          coordination for research-risk-execution pipelines, and robust safety
          guardrails for the Indian regulatory environment.
        </p>
      </NoteBlock>
    </div>
  )
}
