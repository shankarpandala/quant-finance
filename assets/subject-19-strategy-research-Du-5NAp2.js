import{j as e,r as d}from"./vendor-DgA46Qmo.js";import{r as t}from"./vendor-katex-C-S70IU0.js";import{D as _,T as j,P as g,E as b,N as p}from"./subject-01-math-foundations-vREfsVbS.js";function N(){const[a,c]=d.useState("hypothesis"),[s,n]=d.useState(10),[r,o]=d.useState(.05),i=a==="hypothesis"?1-Math.pow(1-r,1):1-Math.pow(1-r,s),m=a==="hypothesis"?r:r/s;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Hypothesis-Driven vs Data-Driven Research"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Compare the false discovery risk between research approaches."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsx("span",{children:"Research Approach"}),e.jsxs("select",{value:a,onChange:l=>c(l.target.value),className:"rounded border p-1 text-xs dark:bg-gray-800 dark:border-gray-600",children:[e.jsx("option",{value:"hypothesis",children:"Hypothesis-Driven (1 test)"}),e.jsxs("option",{value:"data_driven",children:["Data-Driven (",s," tests)"]})]})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Strategies Tested: ",a==="hypothesis"?1:s]}),e.jsx("input",{type:"range",min:"2",max:"100",step:"1",value:s,onChange:l=>n(parseInt(l.target.value)),disabled:a==="hypothesis",className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Significance Level: ",(r*100).toFixed(1),"%"]}),e.jsx("input",{type:"range",min:"0.01",max:"0.20",step:"0.01",value:r,onChange:l=>o(parseFloat(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-3 text-center",children:[e.jsxs("div",{className:"rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30",children:[e.jsx("div",{className:"text-[10px] text-gray-500",children:"False Discovery Prob"}),e.jsxs("div",{className:`text-lg font-bold ${i>.2?"text-red-600":"text-green-600"}`,children:[(i*100).toFixed(1),"%"]})]}),e.jsxs("div",{className:"rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30",children:[e.jsx("div",{className:"text-[10px] text-gray-500",children:"Corrected Alpha"}),e.jsxs("div",{className:"text-lg font-bold text-purple-600",children:[(m*100).toFixed(2),"%"]})]}),e.jsxs("div",{className:"rounded-lg bg-orange-50 p-3 dark:bg-orange-900/30",children:[e.jsx("div",{className:"text-[10px] text-gray-500",children:"Effective Tests"}),e.jsx("div",{className:"text-lg font-bold text-orange-600",children:a==="hypothesis"?1:s})]})]}),e.jsx("p",{className:"mt-3 text-center text-xs text-gray-500 dark:text-gray-400",children:a==="data_driven"?`With ${s} tests at ${(r*100).toFixed(0)}% significance, there is a ${(i*100).toFixed(0)}% chance of at least one false discovery.`:`With 1 hypothesis-driven test, false discovery rate equals the significance level: ${(r*100).toFixed(1)}%.`})]})}function k(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Hypothesis-Driven vs Data-Driven Research"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"The most important decision in quantitative strategy research is the research methodology itself. Hypothesis-driven research starts with an economic theory and tests it rigorously, while data-driven research searches for patterns in data. Understanding the tradeoffs is essential for developing strategies that work in live trading on NSE."}),e.jsx(_,{title:"Hypothesis-Driven Research",label:"Definition 19.1",definition:"Hypothesis-driven research begins with a specific, testable economic hypothesis about market behavior (e.g., 'Nifty 50 stocks exhibit momentum due to institutional herding'). The hypothesis is formalized mathematically, tested on historical data, and validated out-of-sample. This approach controls for data snooping because the hypothesis precedes the data analysis.",notation:"Contrast with data-driven research (data mining), where patterns are discovered first and explanations constructed post-hoc."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"The Two Approaches"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Aspect"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Hypothesis-Driven"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Data-Driven"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Starting point"}),e.jsx("td",{className:"px-4 py-2",children:"Economic theory"}),e.jsx("td",{className:"px-4 py-2",children:"Data patterns"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"False discovery risk"}),e.jsx("td",{className:"px-4 py-2",children:"Low (1 test)"}),e.jsx("td",{className:"px-4 py-2",children:"High (many tests)"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Alpha persistence"}),e.jsx("td",{className:"px-4 py-2",children:"Higher (structural)"}),e.jsx("td",{className:"px-4 py-2",children:"Lower (statistical)"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Speed of discovery"}),e.jsx("td",{className:"px-4 py-2",children:"Slower"}),e.jsx("td",{className:"px-4 py-2",children:"Faster"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Indian market example"}),e.jsx("td",{className:"px-4 py-2",children:"FII flows drive momentum"}),e.jsx("td",{className:"px-4 py-2",children:"ML finds patterns in NSE data"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Requires domain knowledge"}),e.jsx("td",{className:"px-4 py-2",children:"Deep"}),e.jsx("td",{className:"px-4 py-2",children:"Moderate"})]})]})]})}),e.jsx(N,{}),e.jsx(j,{title:"Multiple Testing Penalty",label:"Theorem 19.1",statement:"If $N$ independent strategies are tested at significance level $\\alpha$, the probability of at least one false discovery is: $P(\\text{at least one false positive}) = 1 - (1 - \\alpha)^N \\approx N\\alpha \\text{ for small } \\alpha$. For $N = 100$ strategies tested at $\\alpha = 0.05$, this probability is $1 - 0.95^{100} = 99.4\\%$. The Bonferroni-corrected significance level is $\\alpha^* = \\alpha / N$.",proof:"Each independent test has probability $(1 - \\alpha)$ of correctly accepting the null. With $N$ independent tests, the probability of no false positives is $(1 - \\alpha)^N$. The complement gives the probability of at least one. For small $\\alpha$, the Taylor expansion $(1-\\alpha)^N \\approx 1 - N\\alpha$ gives the approximation."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"The Hypothesis-Driven Research Process"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"A rigorous hypothesis-driven process for Indian markets follows these steps:"}),e.jsx("div",{className:"my-6 flex justify-center",children:e.jsxs("svg",{viewBox:"0 0 600 250",className:"w-full max-w-2xl","aria-label":"Research process flow",children:[e.jsx("defs",{children:e.jsx("marker",{id:"resArrow",markerWidth:"8",markerHeight:"6",refX:"8",refY:"3",orient:"auto",children:e.jsx("polygon",{points:"0 0, 8 3, 0 6",fill:"#6366f1"})})}),[{label:`Economic
Hypothesis`,x:20,y:40,color:"#3b82f6"},{label:`Formalize
Model`,x:140,y:40,color:"#8b5cf6"},{label:`In-Sample
Test`,x:260,y:40,color:"#f59e0b"},{label:`Out-of-Sample
Validation`,x:380,y:40,color:"#22c55e"},{label:`Paper
Trading`,x:500,y:40,color:"#ef4444"}].map((a,c)=>e.jsxs("g",{children:[e.jsx("rect",{x:a.x,y:a.y,width:"100",height:"50",rx:"8",fill:a.color,opacity:"0.8"}),a.label.split(`
`).map((s,n)=>e.jsx("text",{x:a.x+50,y:a.y+22+n*14,textAnchor:"middle",className:"text-[9px] font-bold",fill:"white",children:s},n)),c<4&&e.jsx("line",{x1:a.x+102,y1:a.y+25,x2:a.x+118,y2:a.y+25,stroke:"#6366f1",strokeWidth:"2",markerEnd:"url(#resArrow)"})]},c)),e.jsx("path",{d:"M 550 100 C 570 100, 570 180, 320 180 L 70 180 C 10 180, 10 100, 20 90",fill:"none",stroke:"#ef4444",strokeWidth:"1.5",strokeDasharray:"4",markerEnd:"url(#resArrow)"}),e.jsx("text",{x:"300",y:"200",textAnchor:"middle",className:"text-[9px]",fill:"#ef4444",children:"Iterate: refine hypothesis based on findings"}),e.jsx("rect",{x:"140",y:"120",width:"320",height:"35",rx:"6",fill:"#f0f9ff",stroke:"#0ea5e9",strokeWidth:"1"}),e.jsx("text",{x:"300",y:"140",textAnchor:"middle",className:"text-[9px] font-medium",fill:"#0369a1",children:"Indian Market Context: NSE microstructure, SEBI rules, FII flows, RBI policy"})]})}),e.jsx(g,{title:"hypothesis_research_framework.py",runnable:!0,code:`import numpy as np
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple
from datetime import datetime

@dataclass
class ResearchHypothesis:
    """Structured hypothesis for quant research."""
    id: str
    title: str
    economic_rationale: str
    testable_prediction: str
    null_hypothesis: str
    alternative_hypothesis: str
    market: str = 'NSE'
    asset_universe: str = 'Nifty 50'
    expected_sharpe: float = 0.0
    status: str = 'PROPOSED'
    created: str = field(default_factory=lambda: datetime.now().isoformat())

@dataclass
class ResearchResult:
    hypothesis_id: str
    in_sample_sharpe: float
    out_sample_sharpe: float
    t_statistic: float
    p_value: float
    n_observations: int
    decay_ratio: float
    verdict: str

class HypothesisDrivenResearch:
    """Framework for hypothesis-driven strategy research."""

    def __init__(self):
        self.hypotheses: List[ResearchHypothesis] = []
        self.results: List[ResearchResult] = []

    def register_hypothesis(self, **kwargs) -> ResearchHypothesis:
        h = ResearchHypothesis(**kwargs)
        self.hypotheses.append(h)
        return h

    def test_hypothesis(self, hypothesis_id: str,
                        returns_is: np.ndarray,
                        returns_oos: np.ndarray,
                        risk_free: float = 0.065/252) -> ResearchResult:
        """Test hypothesis with in-sample and out-of-sample data."""
        # In-sample Sharpe
        is_excess = returns_is - risk_free
        is_sharpe = np.mean(is_excess) / np.std(is_excess) * np.sqrt(252)

        # Out-of-sample Sharpe
        oos_excess = returns_oos - risk_free
        oos_sharpe = np.mean(oos_excess) / np.std(oos_excess) * np.sqrt(252)

        # t-test: is mean return significantly different from 0?
        n = len(returns_oos)
        t_stat = np.mean(oos_excess) / (np.std(oos_excess) / np.sqrt(n))

        # Approximate p-value (two-tailed)
        from scipy import stats
        p_value = 2 * (1 - stats.t.cdf(abs(t_stat), n - 1))

        # Decay ratio
        decay = 1 - oos_sharpe / max(is_sharpe, 0.001) if is_sharpe > 0 else 1.0

        # Verdict
        if p_value < 0.05 and oos_sharpe > 0.5 and decay < 0.5:
            verdict = 'PROMISING - proceed to paper trading'
        elif p_value < 0.10 and oos_sharpe > 0.3:
            verdict = 'MARGINAL - needs more investigation'
        else:
            verdict = 'REJECT - insufficient evidence'

        result = ResearchResult(
            hypothesis_id=hypothesis_id,
            in_sample_sharpe=is_sharpe,
            out_sample_sharpe=oos_sharpe,
            t_statistic=t_stat,
            p_value=p_value,
            n_observations=n,
            decay_ratio=decay,
            verdict=verdict
        )
        self.results.append(result)
        return result

# Research session: Indian market hypotheses
research = HypothesisDrivenResearch()

# Hypothesis 1: FII momentum
h1 = research.register_hypothesis(
    id='H001',
    title='FII Flow Momentum in Nifty 50',
    economic_rationale='Foreign Institutional Investors (FIIs) trade based on '
        'global macro views with persistent directional bias. Their large '
        'order flows create short-term momentum in Nifty 50 stocks.',
    testable_prediction='Stocks with positive FII net buying over 5 days '
        'outperform those with net selling by >5% annualized.',
    null_hypothesis='H0: FII flow quintile spread return = 0',
    alternative_hypothesis='H1: FII flow quintile spread return > 0',
    expected_sharpe=1.2,
)

# Hypothesis 2: Earnings announcement drift
h2 = research.register_hypothesis(
    id='H002',
    title='Post-Earnings Announcement Drift (PEAD) in India',
    economic_rationale='Indian retail investors underreact to earnings '
        'surprises due to information processing constraints. Institutional '
        'investors are slow to incorporate quarterly results.',
    testable_prediction='Stocks with positive earnings surprises (>10% beat) '
        'continue to outperform for 60 days post-announcement.',
    null_hypothesis='H0: Post-earnings CAR(1,60) = 0 for positive surprises',
    alternative_hypothesis='H1: Post-earnings CAR(1,60) > 0',
    expected_sharpe=0.8,
)

# Simulate test results
np.random.seed(42)

# H1: FII Momentum (strong signal)
is_returns_1 = np.random.normal(0.0008, 0.015, 1260)  # 5yr IS
oos_returns_1 = np.random.normal(0.0005, 0.016, 504)   # 2yr OOS

# H2: PEAD (weaker signal)
is_returns_2 = np.random.normal(0.0004, 0.018, 1260)
oos_returns_2 = np.random.normal(0.0002, 0.019, 504)

r1 = research.test_hypothesis('H001', is_returns_1, oos_returns_1)
r2 = research.test_hypothesis('H002', is_returns_2, oos_returns_2)

print("=== Hypothesis-Driven Research Results ===\\n")
for h, r in zip([h1, h2], [r1, r2]):
    print(f"--- {h.id}: {h.title} ---")
    print(f"  Economic Rationale: {h.economic_rationale[:80]}...")
    print(f"  In-Sample Sharpe:  {r.in_sample_sharpe:.2f}")
    print(f"  Out-Sample Sharpe: {r.out_sample_sharpe:.2f}")
    print(f"  Decay Ratio:       {r.decay_ratio:.1%}")
    print(f"  t-statistic:       {r.t_statistic:.3f}")
    print(f"  p-value:           {r.p_value:.4f}")
    print(f"  VERDICT: {r.verdict}")
    print()`}),e.jsx(b,{title:"Formulating a Hypothesis for Indian Markets",difficulty:"intermediate",problem:"You observe that Bank Nifty tends to move sharply after RBI policy announcements. Formulate this as a testable hypothesis using the hypothesis-driven framework.",solution:[{step:"State the economic rationale",formula:"\\text{RBI policy} \\to \\text{interest rate expectations} \\to \\text{bank stock prices}",explanation:"RBI monetary policy directly affects bank net interest margins (NIM). Rate cuts increase NIM for banks with floating-rate loans, while rate hikes benefit banks with more fixed-rate deposits."},{step:"Formalize the hypothesis",formula:"H_0: \\mathbb{E}[R_{\\text{BankNifty}} | \\text{rate cut}] = \\mathbb{E}[R_{\\text{BankNifty}} | \\text{no cut}]",explanation:"The null hypothesis states that Bank Nifty returns are the same regardless of RBI rate decisions."},{step:"Define the test",formula:"R_{\\text{event}} = \\frac{1}{N}\\sum_{i=1}^{N} R_{i, [0,5]} \\text{ for rate cut events}",explanation:"Calculate the average 5-day return after RBI rate cut announcements across all events since 2010. Compare with a control period."},{step:"Set acceptance criteria",formula:"t > 2.0, \\; \\text{Sharpe}_{\\text{OOS}} > 0.5, \\; \\text{Decay} < 50\\%",explanation:"The strategy must show statistical significance (t > 2.0), viable out-of-sample Sharpe (> 0.5), and less than 50% decay from in-sample to out-of-sample."}]}),e.jsxs(p,{title:"Indian Market Research Hypotheses",type:"historical",children:[e.jsx("p",{children:"Well-documented alpha sources in Indian markets with economic rationale:"}),e.jsxs("ul",{className:"mt-2 space-y-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"FII Flow Momentum:"})," Persistent directional trading by foreign institutions creates short-term momentum (structural: information asymmetry)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"NSE-BSE Spread:"})," Dual-listed stocks sometimes diverge between NSE and BSE, creating statistical arbitrage opportunities (structural: fragmented markets)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"F&O Expiry Effects:"})," Options open interest concentration around specific strikes creates gamma pinning effects on expiry Thursday (structural: derivative market mechanics)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Budget Day Volatility:"})," Union Budget creates predictable volatility expansion in specific sectors (behavioral: uncertainty premium)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Smallcap Value:"})," Indian small-caps with low P/E and high promoter holding tend to outperform (behavioral: neglected firm effect)."]})]})]}),e.jsx(p,{title:"Key Takeaway",type:"tip",children:e.jsxs("p",{children:["Always prefer ",e.jsx("strong",{children:"hypothesis-driven research"})," over data mining when developing strategies for Indian markets. Start with an economic rationale rooted in market structure (NSE/BSE mechanics, SEBI regulations, FII behavior) or behavioral biases. A single well-reasoned hypothesis test has far more predictive power than hundreds of data-mined patterns. The best strategies are those where you can explain ",e.jsx("em",{children:"why"})," the alpha exists, not just ",e.jsx("em",{children:"that"})," it exists."]})})]})}const Y=Object.freeze(Object.defineProperty({__proto__:null,default:k},Symbol.toStringTag,{value:"Module"}));function S(){const[a,c]=d.useState([{name:"Hypothesis",complete:!0},{name:"Data Collection",complete:!0},{name:"EDA",complete:!0},{name:"Feature Engineering",complete:!1},{name:"Backtesting",complete:!1},{name:"Statistical Tests",complete:!1},{name:"OOS Validation",complete:!1},{name:"Conclusion",complete:!1}]),s=a.filter(n=>n.complete).length/a.length*100;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Research Notebook Progress Tracker"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Track progress through the structured research notebook sections."}),e.jsx("div",{className:"mb-3 space-y-2",children:a.map((n,r)=>e.jsxs("div",{className:"flex items-center gap-3 cursor-pointer",onClick:()=>{const o=[...a];o[r]={...o[r],complete:!o[r].complete},c(o)},children:[e.jsx("div",{className:`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${n.complete?"bg-green-500 text-white":"bg-gray-200 text-gray-500 dark:bg-gray-700"}`,children:n.complete?"✓":r+1}),e.jsx("span",{className:`text-sm ${n.complete?"text-green-700 dark:text-green-400 line-through":"text-gray-700 dark:text-gray-300"}`,children:n.name})]},r))}),e.jsx("div",{className:"w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700",children:e.jsx("div",{className:"bg-indigo-500 h-3 rounded-full transition-all",style:{width:`${s}%`}})}),e.jsxs("p",{className:"mt-1 text-xs text-gray-500 text-center",children:[s.toFixed(0),"% complete"]})]})}function w(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Structuring Research Notebooks"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"A well-structured research notebook is the backbone of reproducible quantitative research. For Indian market strategies, notebooks must capture the complete research pipeline: from hypothesis formulation through NSE data analysis to statistical validation. This section covers best practices for organizing research that can be reviewed, replicated, and built upon."}),e.jsx(_,{title:"Research Notebook",label:"Definition 19.2",definition:"A research notebook in quantitative finance is a structured computational document (typically Jupyter/Python) that records the complete research process for a trading strategy. It includes the hypothesis, data sources, analysis methodology, results, and conclusions in a reproducible format. Good notebooks serve as both documentation and executable code.",notation:"Standard format: one notebook per hypothesis, with clear section headers, version control (git), and data provenance tracking."}),e.jsx(S,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Notebook Architecture"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Every research notebook should follow a standardized structure. This ensures consistency across your research team and makes it easy to review and compare different strategy ideas."}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Section"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Content"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Approx Lines"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2 font-medium",children:"1. Metadata"}),e.jsx("td",{className:"px-4 py-2",children:"Author, date, hypothesis ID, version"}),e.jsx("td",{className:"px-4 py-2",children:"10--20"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2 font-medium",children:"2. Hypothesis"}),e.jsx("td",{className:"px-4 py-2",children:"Economic rationale, formal statement, predictions"}),e.jsx("td",{className:"px-4 py-2",children:"30--50"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2 font-medium",children:"3. Data"}),e.jsx("td",{className:"px-4 py-2",children:"Sources, loading, cleaning, universe"}),e.jsx("td",{className:"px-4 py-2",children:"100--200"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2 font-medium",children:"4. EDA"}),e.jsx("td",{className:"px-4 py-2",children:"Plots, distributions, correlations"}),e.jsx("td",{className:"px-4 py-2",children:"100--200"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2 font-medium",children:"5. Signal"}),e.jsx("td",{className:"px-4 py-2",children:"Feature engineering, signal construction"}),e.jsx("td",{className:"px-4 py-2",children:"100--200"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2 font-medium",children:"6. Backtest"}),e.jsx("td",{className:"px-4 py-2",children:"Portfolio construction, performance"}),e.jsx("td",{className:"px-4 py-2",children:"150--300"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2 font-medium",children:"7. Validation"}),e.jsx("td",{className:"px-4 py-2",children:"OOS tests, statistical tests, robustness"}),e.jsx("td",{className:"px-4 py-2",children:"100--200"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2 font-medium",children:"8. Conclusion"}),e.jsx("td",{className:"px-4 py-2",children:"Summary, go/no-go decision, next steps"}),e.jsx("td",{className:"px-4 py-2",children:"30--50"})]})]})]})}),e.jsx(g,{title:"research_notebook_template.py",runnable:!0,code:`"""
Research Notebook Template for Indian Market Strategies
=====================================================
Hypothesis ID: H-2024-042
Author: Quant Research Team
Date: 2024-01-15
Version: 1.2
Universe: Nifty 50
Data Period: 2015-01-01 to 2024-01-01
"""

import numpy as np
from dataclasses import dataclass, field
from typing import List, Dict, Optional
from datetime import datetime

# ============================================================
# Section 1: Research Metadata
# ============================================================

@dataclass
class ResearchMetadata:
    """Standardized research notebook metadata."""
    hypothesis_id: str
    title: str
    author: str
    created: str
    version: str
    universe: str
    data_start: str
    data_end: str
    is_period: str  # In-sample period
    oos_period: str  # Out-of-sample period
    status: str = 'IN_PROGRESS'
    tags: List[str] = field(default_factory=list)

    def to_header(self) -> str:
        lines = [
            f"Hypothesis: {self.hypothesis_id} - {self.title}",
            f"Author: {self.author} | Version: {self.version}",
            f"Universe: {self.universe}",
            f"IS: {self.is_period} | OOS: {self.oos_period}",
            f"Status: {self.status}",
            f"Tags: {', '.join(self.tags)}",
        ]
        return '\\n'.join(lines)

meta = ResearchMetadata(
    hypothesis_id='H-2024-042',
    title='FII Flow Momentum in Nifty 50',
    author='Research Team',
    created='2024-01-15',
    version='1.2',
    universe='Nifty 50',
    data_start='2015-01-01',
    data_end='2024-01-01',
    is_period='2015-2020',
    oos_period='2021-2023',
    tags=['momentum', 'FII', 'institutional_flow', 'nifty50'],
)
print(meta.to_header())

# ============================================================
# Section 2: Hypothesis Statement
# ============================================================

@dataclass
class HypothesisStatement:
    economic_rationale: str
    formal_h0: str
    formal_h1: str
    predictions: List[str]
    assumptions: List[str]
    related_literature: List[str]

hypothesis = HypothesisStatement(
    economic_rationale=(
        "FII net buying creates persistent price pressure in Nifty 50 "
        "stocks due to (1) large order sizes relative to daily volume, "
        "(2) herding behavior among global funds, and (3) information "
        "cascades from developed market sentiment."
    ),
    formal_h0="H0: E[R_long - R_short | FII_quintile] = 0",
    formal_h1="H1: E[R_long - R_short | FII_quintile] > 0",
    predictions=[
        "Top FII-buying quintile outperforms bottom quintile",
        "Effect persists for 5-20 trading days",
        "Stronger during FII risk-on periods",
        "Weaker in small-caps (lower FII participation)",
    ],
    assumptions=[
        "FII flow data available with 1-day lag (NSDL/CDSL)",
        "No survivorship bias in Nifty 50 constituents",
        "Transaction costs: 10 bps round-trip (Zerodha)",
    ],
    related_literature=[
        "Bohn & Tesar (1996) - Portfolio rebalancing",
        "Griffin et al. (2004) - Institutional flows",
        "Grinblatt & Keloharju (2000) - Momentum trading",
    ],
)

print("\\n=== Hypothesis Statement ===")
print(f"Rationale: {hypothesis.economic_rationale[:100]}...")
print(f"H0: {hypothesis.formal_h0}")
print(f"H1: {hypothesis.formal_h1}")

# ============================================================
# Section 3: Research Quality Metrics
# ============================================================

@dataclass
class NotebookQualityScore:
    """Score the quality of a research notebook."""
    has_hypothesis: bool = False
    has_economic_rationale: bool = False
    has_in_sample: bool = False
    has_out_of_sample: bool = False
    has_statistical_tests: bool = False
    has_transaction_costs: bool = False
    has_robustness_checks: bool = False
    has_conclusion: bool = False
    code_is_reproducible: bool = False
    data_provenance_documented: bool = False

    @property
    def score(self) -> float:
        checks = [
            self.has_hypothesis, self.has_economic_rationale,
            self.has_in_sample, self.has_out_of_sample,
            self.has_statistical_tests, self.has_transaction_costs,
            self.has_robustness_checks, self.has_conclusion,
            self.code_is_reproducible, self.data_provenance_documented,
        ]
        return sum(checks) / len(checks) * 100

    @property
    def grade(self) -> str:
        s = self.score
        if s >= 90: return 'A - Publication quality'
        if s >= 70: return 'B - Good, minor gaps'
        if s >= 50: return 'C - Needs improvement'
        return 'D - Incomplete, do not proceed'

quality = NotebookQualityScore(
    has_hypothesis=True,
    has_economic_rationale=True,
    has_in_sample=True,
    has_out_of_sample=True,
    has_statistical_tests=True,
    has_transaction_costs=True,
    has_robustness_checks=False,
    has_conclusion=True,
    code_is_reproducible=True,
    data_provenance_documented=False,
)

print(f"\\n=== Notebook Quality ===")
print(f"Score: {quality.score:.0f}%")
print(f"Grade: {quality.grade}")`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Reproducibility Requirements"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Every research notebook must be fully reproducible. This means anyone on your team can run the notebook from scratch and get identical results. Key requirements:"}),e.jsx(t.BlockMath,{math:"\\text{Reproducibility} = f(\\text{code}, \\text{data}, \\text{environment}, \\text{random seeds})"}),e.jsx(j,{title:"Data Provenance Chain",label:"Theorem 19.2",statement:"For a research result to be trustworthy, the complete data provenance chain must be documented: $D_{\\text{raw}} \\xrightarrow{T_1} D_{\\text{clean}} \\xrightarrow{T_2} D_{\\text{features}} \\xrightarrow{T_3} D_{\\text{signals}} \\xrightarrow{T_4} R_{\\text{results}}$ where each transformation $T_i$ must be deterministic and logged. For NSE data, this includes: raw tick data source, corporate action adjustments, survivorship bias corrections, and feature transformations.",proof:"A break in any link of the provenance chain makes the result non-reproducible. Common breaks in Indian market research: (1) NSE corporate action adjustments applied inconsistently, (2) index constituent changes not tracked (survivorship bias), (3) random seeds not fixed for stochastic elements."}),e.jsx(b,{title:"Version-Controlled Research Repository",difficulty:"intermediate",problem:"You have 15 research notebooks testing different alpha signals for Nifty 50. How should you organize the git repository to enable comparison and prevent data leakage?",solution:[{step:"Repository structure",formula:"\\text{repo/} \\to \\{\\text{data/}, \\text{notebooks/}, \\text{lib/}, \\text{results/}\\}",explanation:"Separate data (read-only, gitignored), notebooks (versioned), shared library code (versioned), and results (versioned). Never commit raw NSE data to git."},{step:"Notebook naming convention",formula:"\\text{H-YYYY-NNN\\_v\\{version\\}\\_\\{short\\_title\\}.ipynb}",explanation:"Each notebook is named by hypothesis ID and version. Example: H-2024-042_v1.2_FII_momentum.ipynb. This enables easy comparison across versions."},{step:"Data isolation",formula:"\\text{IS} \\cap \\text{OOS} = \\emptyset, \\; \\text{IS} \\cup \\text{OOS} = \\text{Full Dataset}",explanation:"Define in-sample and out-of-sample periods in a configuration file that all notebooks reference. This prevents accidental data leakage."},{step:"Review workflow",formula:"\\text{PR review} \\to \\text{Code review + statistical review}",explanation:"Every notebook requires a pull request with both code review (is the implementation correct?) and statistical review (are the conclusions justified?). Use git branches for each hypothesis."}]}),e.jsxs(p,{title:"Common Research Notebook Mistakes",type:"warning",children:[e.jsx("p",{children:"Avoid these common mistakes in Indian market research notebooks:"}),e.jsxs("ul",{className:"mt-2 list-disc list-inside space-y-1",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"No fixed random seeds:"})," Results change on every run"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Missing data versioning:"})," NSE data may be updated retroactively"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Inline data transforms:"})," Use library functions, not one-off code"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Cherry-picked plots:"})," Show all results, including failures"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"No transaction cost modeling:"})," Gross returns are meaningless"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Hardcoded dates:"})," Use config files for IS/OOS boundaries"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"No environmental logging:"})," Record Python/library versions"]})]})]}),e.jsx(g,{title:"notebook_linter.py",runnable:!0,code:`import numpy as np
from dataclasses import dataclass
from typing import List, Dict

@dataclass
class NotebookSection:
    """Represents a section in a research notebook."""
    name: str
    required: bool
    min_cells: int
    has_code: bool = True
    has_markdown: bool = True

class NotebookLinter:
    """Lint research notebooks for quality and completeness."""

    REQUIRED_SECTIONS = [
        NotebookSection('Metadata', True, 1, False, True),
        NotebookSection('Hypothesis', True, 2, False, True),
        NotebookSection('Data Loading', True, 3, True, True),
        NotebookSection('Data Cleaning', True, 2, True, True),
        NotebookSection('EDA', True, 5, True, True),
        NotebookSection('Feature Engineering', True, 3, True, True),
        NotebookSection('Signal Construction', True, 3, True, True),
        NotebookSection('Backtest', True, 5, True, True),
        NotebookSection('Statistical Tests', True, 3, True, True),
        NotebookSection('OOS Validation', True, 3, True, True),
        NotebookSection('Robustness Checks', False, 3, True, True),
        NotebookSection('Transaction Cost Analysis', True, 2, True, True),
        NotebookSection('Conclusion', True, 1, False, True),
    ]

    def __init__(self):
        self.errors: List[str] = []
        self.warnings: List[str] = []

    def check_reproducibility(self, notebook: dict) -> List[str]:
        """Check if notebook is reproducible."""
        issues = []
        # Check for random seed
        has_seed = False
        has_imports = False
        has_version = False

        for cell in notebook.get('cells', []):
            content = cell.get('source', '')
            if 'random.seed' in content or 'np.random.seed' in content:
                has_seed = True
            if 'import' in content:
                has_imports = True
            if '__version__' in content or 'pip freeze' in content:
                has_version = True

        if not has_seed:
            issues.append('ERROR: No random seed set')
        if not has_version:
            issues.append('WARNING: No version logging')
        return issues

    def check_data_provenance(self, notebook: dict) -> List[str]:
        """Verify data source documentation."""
        issues = []
        has_source = False
        has_date_range = False

        for cell in notebook.get('cells', []):
            content = cell.get('source', '')
            if 'data_source' in content or 'NSE' in content:
                has_source = True
            if 'date_range' in content or 'start_date' in content:
                has_date_range = True

        if not has_source:
            issues.append('ERROR: Data source not documented')
        if not has_date_range:
            issues.append('ERROR: Date range not specified')
        return issues

    def lint(self, notebook: dict) -> dict:
        """Run all linting checks."""
        repro = self.check_reproducibility(notebook)
        prov = self.check_data_provenance(notebook)
        all_issues = repro + prov

        errors = [i for i in all_issues if i.startswith('ERROR')]
        warnings = [i for i in all_issues if i.startswith('WARNING')]

        score = 100 - len(errors) * 15 - len(warnings) * 5
        return {
            'score': max(0, score),
            'errors': errors,
            'warnings': warnings,
            'grade': 'A' if score >= 90 else 'B' if score >= 70 else 'C' if score >= 50 else 'F',
            'recommendation': 'Ready for review' if score >= 70 else 'Needs improvement',
        }

# Demo: lint a sample notebook
sample_notebook = {
    'cells': [
        {'source': 'import numpy as np\\nimport pandas as pd', 'type': 'code'},
        {'source': 'np.random.seed(42)\\n# NSE Nifty 50 data', 'type': 'code'},
        {'source': 'data_source = "NSE"\\nstart_date = "2015-01-01"', 'type': 'code'},
        {'source': '# Hypothesis: FII momentum in Nifty 50', 'type': 'markdown'},
        {'source': 'import sys; print(sys.__version__)', 'type': 'code'},
    ]
}

linter = NotebookLinter()
result = linter.lint(sample_notebook)

print("=== Notebook Lint Results ===")
print(f"Score: {result['score']}/100")
print(f"Grade: {result['grade']}")
print(f"Recommendation: {result['recommendation']}")

if result['errors']:
    print(f"\\nErrors ({len(result['errors'])}):")
    for e in result['errors']:
        print(f"  {e}")

if result['warnings']:
    print(f"\\nWarnings ({len(result['warnings'])}):")
    for w in result['warnings']:
        print(f"  {w}")

# Show required sections checklist
print(f"\\n=== Required Sections Checklist ===")
for section in NotebookLinter.REQUIRED_SECTIONS:
    req = "REQUIRED" if section.required else "OPTIONAL"
    print(f"  [{req:8s}] {section.name} (min {section.min_cells} cells)")`}),e.jsx(p,{title:"Key Takeaway",type:"tip",children:e.jsxs("p",{children:["A research notebook is a ",e.jsx("strong",{children:"permanent record of your intellectual process"}),". Structure it rigidly: metadata, hypothesis, data, EDA, signal, backtest, validation, conclusion. Every notebook should be reproducible by anyone on your team from a single command. Version control everything except raw data. The discipline of structured research notebooks is what separates professional quant firms from amateur traders."]})})]})}const K=Object.freeze(Object.defineProperty({__proto__:null,default:w},Symbol.toStringTag,{value:"Module"}));function I(){const[a,c]=d.useState([{title:"Momentum in Indian Stock Market",source:"SSRN",relevance:95,reviewed:!0},{title:"FII Flows and Market Returns in India",source:"JFE",relevance:90,reviewed:!0},{title:"Post-Earnings Drift in Emerging Markets",source:"arXiv",relevance:85,reviewed:!1},{title:"Factor Models for Indian Equities",source:"SSRN",relevance:80,reviewed:!1},{title:"Market Microstructure of NSE",source:"WP",relevance:75,reviewed:!1}]),n=a.filter(r=>r.reviewed).length/a.length*100;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Literature Review Tracker"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Track your systematic literature review progress. Click papers to mark as reviewed."}),e.jsx("div",{className:"space-y-2 mb-3",children:a.map((r,o)=>e.jsxs("div",{className:`flex items-center justify-between rounded-lg p-2 cursor-pointer ${r.reviewed?"bg-green-50 dark:bg-green-900/20":"bg-gray-50 dark:bg-gray-800/50"}`,onClick:()=>{const i=[...a];i[o]={...i[o],reviewed:!i[o].reviewed},c(i)},children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:`text-xs ${r.reviewed?"text-green-600":"text-gray-400"}`,children:r.reviewed?"✓":"○"}),e.jsx("span",{className:"text-sm text-gray-700 dark:text-gray-300",children:r.title})]}),e.jsxs("div",{className:"flex gap-2 text-xs",children:[e.jsx("span",{className:"text-gray-500",children:r.source}),e.jsxs("span",{className:`font-bold ${r.relevance>85?"text-green-600":"text-yellow-600"}`,children:[r.relevance,"%"]})]})]},o))}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"flex-1 bg-gray-200 rounded-full h-2 dark:bg-gray-700",children:e.jsx("div",{className:"bg-indigo-500 h-2 rounded-full transition-all",style:{width:`${n}%`}})}),e.jsxs("span",{className:"text-sm font-bold text-gray-600 dark:text-gray-400",children:[n.toFixed(0),"% reviewed"]})]})]})}function T(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Systematic Literature Review: SSRN and arXiv"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Quantitative finance research builds on decades of academic work. Before developing any strategy for Indian markets, a systematic literature review ensures you are not reinventing the wheel, helps identify proven alpha sources, and reveals common pitfalls that have already been documented."}),e.jsx(_,{title:"Systematic Literature Review",label:"Definition 19.3",definition:"A systematic literature review (SLR) is a structured, reproducible process for identifying, evaluating, and synthesizing all relevant research on a specific topic. In quantitative finance, this involves searching academic databases (SSRN, arXiv q-fin, NBER, JFE, RFS) using predefined search criteria, screening papers for relevance, and extracting key findings for strategy development.",notation:"Key databases: SSRN (Social Science Research Network), arXiv q-fin section, Google Scholar, NSE Research Working Papers, SEBI Working Papers."}),e.jsx(I,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"The Literature Review Process"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"A systematic review for Indian market strategies follows a funnel approach:"}),e.jsx(t.BlockMath,{math:"N_{\\text{found}} \\xrightarrow{\\text{screen}} N_{\\text{relevant}} \\xrightarrow{\\text{review}} N_{\\text{applicable}} \\xrightarrow{\\text{test}} N_{\\text{alpha}}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["Typical conversion: ",e.jsx(t.InlineMath,{math:"N_{\\text{found}} \\approx 200"}),","," ",e.jsx(t.InlineMath,{math:"N_{\\text{relevant}} \\approx 40"}),","," ",e.jsx(t.InlineMath,{math:"N_{\\text{applicable}} \\approx 10"}),","," ",e.jsx(t.InlineMath,{math:"N_{\\text{alpha}} \\approx 2"}),"."]}),e.jsx(j,{title:"Academic Alpha Decay",label:"Theorem 19.3",statement:"The post-publication alpha of a documented strategy decays exponentially: $\\alpha(t) = \\alpha_0 \\cdot e^{-\\lambda t}$ where $t$ is time since publication and $\\lambda$ is the decay rate. For well-known strategies (momentum, value), $\\lambda \\approx 0.1$ per year. The half-life $t_{1/2} = \\ln(2)/\\lambda \\approx 7$ years. For Indian markets, decay is slower due to lower institutional penetration: $\\lambda_{\\text{India}} \\approx 0.05$, giving $t_{1/2} \\approx 14$ years.",proof:"McLean and Pontiff (2016, JFE) showed that portfolio returns of academic anomalies decline by 32% post-publication. The exponential model fits observed decay patterns across 97 anomalies. For Indian markets, the slower decay reflects lower quant adoption and higher structural frictions (SEBI regulations, fragmented data, lower institutional participation)."}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"Source"}),e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"Focus"}),e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"India Coverage"}),e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"Access"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2",children:"SSRN"}),e.jsx("td",{className:"px-3 py-2",children:"Finance working papers"}),e.jsx("td",{className:"px-3 py-2",children:"Good (500+ India papers)"}),e.jsx("td",{className:"px-3 py-2",children:"Free"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2",children:"arXiv (q-fin)"}),e.jsx("td",{className:"px-3 py-2",children:"Quantitative methods"}),e.jsx("td",{className:"px-3 py-2",children:"Moderate"}),e.jsx("td",{className:"px-3 py-2",children:"Free"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2",children:"NSE Working Papers"}),e.jsx("td",{className:"px-3 py-2",children:"Indian market specific"}),e.jsx("td",{className:"px-3 py-2",children:"Excellent"}),e.jsx("td",{className:"px-3 py-2",children:"Free"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2",children:"IIMA/IIMB Research"}),e.jsx("td",{className:"px-3 py-2",children:"Indian finance research"}),e.jsx("td",{className:"px-3 py-2",children:"Excellent"}),e.jsx("td",{className:"px-3 py-2",children:"Institutional"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-3 py-2",children:"JFE / RFS / JF"}),e.jsx("td",{className:"px-3 py-2",children:"Top finance journals"}),e.jsx("td",{className:"px-3 py-2",children:"Some (EM focus)"}),e.jsx("td",{className:"px-3 py-2",children:"Paid/Library"})]})]})]})}),e.jsx(g,{title:"literature_review_system.py",runnable:!0,code:`import numpy as np
from dataclasses import dataclass, field
from typing import List, Dict, Optional
from datetime import datetime

@dataclass
class Paper:
    """Academic paper for literature review."""
    title: str
    authors: List[str]
    year: int
    source: str  # SSRN, arXiv, journal name
    abstract: str
    relevance_score: float  # 0-100
    alpha_type: str  # momentum, value, etc.
    market_coverage: str  # India, Global, EM
    key_findings: List[str] = field(default_factory=list)
    replicable: bool = False
    india_applicable: bool = False
    status: str = 'UNREAD'  # UNREAD, READING, REVIEWED

@dataclass
class ReviewSummary:
    """Summary of literature review for a research topic."""
    topic: str
    papers_found: int
    papers_screened: int
    papers_reviewed: int
    key_themes: List[str]
    indian_market_gaps: List[str]
    actionable_ideas: List[str]

class LiteratureReviewSystem:
    """Systematic literature review for quant research."""

    def __init__(self, research_topic: str):
        self.topic = research_topic
        self.papers: List[Paper] = []
        self.search_queries: List[str] = []

    def add_paper(self, paper: Paper):
        self.papers.append(paper)

    def screen_papers(self, min_relevance: float = 50.0) -> List[Paper]:
        """Screen papers by relevance score."""
        return [p for p in self.papers if p.relevance_score >= min_relevance]

    def get_india_applicable(self) -> List[Paper]:
        """Filter papers applicable to Indian markets."""
        return [p for p in self.papers if p.india_applicable]

    def generate_summary(self) -> ReviewSummary:
        """Generate review summary."""
        reviewed = [p for p in self.papers if p.status == 'REVIEWED']
        alpha_types = {}
        for p in reviewed:
            alpha_types[p.alpha_type] = alpha_types.get(p.alpha_type, 0) + 1

        return ReviewSummary(
            topic=self.topic,
            papers_found=len(self.papers),
            papers_screened=len([p for p in self.papers if p.status != 'UNREAD']),
            papers_reviewed=len(reviewed),
            key_themes=list(alpha_types.keys()),
            indian_market_gaps=[
                'Limited NSE microstructure research',
                'Few studies on F&O-equity interaction',
                'Lack of high-frequency data studies',
                'FII flow prediction models underdeveloped',
            ],
            actionable_ideas=[
                p.title for p in reviewed
                if p.india_applicable and p.replicable
            ],
        )

    def citation_network(self) -> Dict[str, int]:
        """Analyze most-cited themes."""
        themes = {}
        for p in self.papers:
            for finding in p.key_findings:
                for word in ['momentum', 'value', 'quality', 'volatility',
                             'liquidity', 'sentiment', 'flow']:
                    if word in finding.lower():
                        themes[word] = themes.get(word, 0) + 1
        return dict(sorted(themes.items(), key=lambda x: -x[1]))

# Build literature review for momentum in India
review = LiteratureReviewSystem('Momentum Strategies in Indian Equity Market')

# Add papers
papers_data = [
    ('Momentum and Herding in Indian Stock Market',
     ['Jegadeesh', 'Titman'], 2023, 'SSRN', 92,
     'momentum', True, True,
     ['12-1 momentum significant in Nifty 500',
      'FII herding amplifies momentum']),
    ('Cross-Sectional Return Predictability in India',
     ['Agarwalla', 'Jacob'], 2022, 'NSE WP', 88,
     'multi-factor', True, True,
     ['Fama-French factors work in India',
      'Momentum strongest among mid-caps']),
    ('Post-Earnings Announcement Drift in Emerging Markets',
     ['Chen', 'Patel'], 2021, 'arXiv', 78,
     'earnings', True, True,
     ['PEAD exists in India but weaker than US',
      'Retail investor underreaction drives drift']),
    ('Market Microstructure of NSE',
     ['Krishnan', 'Shah'], 2020, 'JFE', 85,
     'microstructure', True, True,
     ['NSE spread dynamics differ from US',
      'Co-location reduces spread for HFT firms']),
    ('Factor Investing in India: A Practitioner Guide',
     ['Gupta', 'Agarwal'], 2023, 'SSRN', 95,
     'multi-factor', True, True,
     ['Quality + Momentum best combination for India',
      'Value factor weaker post-demonetization']),
]

for title, authors, year, source, rel, alpha, repl, india, findings in papers_data:
    review.add_paper(Paper(
        title=title, authors=authors, year=year,
        source=source, abstract='...',
        relevance_score=rel, alpha_type=alpha,
        market_coverage='India' if india else 'Global',
        key_findings=findings,
        replicable=repl, india_applicable=india,
        status='REVIEWED'
    ))

# Generate summary
summary = review.generate_summary()
print("=== Literature Review Summary ===")
print(f"Topic: {summary.topic}")
print(f"Papers found: {summary.papers_found}")
print(f"Papers reviewed: {summary.papers_reviewed}")
print(f"Key themes: {', '.join(summary.key_themes)}")
print(f"\\n--- Indian Market Gaps ---")
for gap in summary.indian_market_gaps:
    print(f"  - {gap}")
print(f"\\n--- Actionable Ideas ---")
for idea in summary.actionable_ideas:
    print(f"  * {idea}")

# Citation network
print(f"\\n--- Theme Frequency ---")
for theme, count in review.citation_network().items():
    print(f"  {theme:15s}: {'#' * count} ({count})")`}),e.jsx(b,{title:"Finding Alpha in Academic Papers",difficulty:"intermediate",problem:"You find a 2022 SSRN paper showing 12-1 momentum generates Sharpe 1.5 in Nifty 500 from 2010-2020. Should you implement this strategy directly?",solution:[{step:"Check for publication decay",formula:"\\alpha(2024) = 1.5 \\cdot e^{-0.05 \\times 2} = 1.5 \\cdot 0.905 = 1.36",explanation:"Using Indian market decay rate of 0.05/year, the expected Sharpe 2 years post-publication is 1.36. This is still viable."},{step:"Assess out-of-sample evidence",formula:"\\text{OOS period: 2021-2024 not in paper}",explanation:"The paper only covers 2010-2020. You need to test on 2021-2024 data to verify the signal persists. Indian market structure changed significantly post-COVID."},{step:"Check for data snooping",formula:"\\text{Does } t > t_{\\text{Bonferroni}}?",explanation:"If the paper tested multiple momentum look-back periods, the reported t-stat may be inflated. Apply Bonferroni correction for the number of tested configurations."},{step:"Decision",formula:"\\text{DO NOT implement directly. Replicate first.}",explanation:"Never implement an academic strategy without independent replication on your own data with your own transaction cost assumptions. The paper may have different assumptions about STT, slippage, and Nifty 500 constituent survivorship."}]}),e.jsxs(p,{title:"India-Specific Research Sources",type:"tip",children:[e.jsx("p",{children:"Key sources for Indian market research beyond SSRN/arXiv:"}),e.jsxs("ul",{className:"mt-2 list-disc list-inside space-y-1",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"NSE Research Initiative:"})," Working papers on Indian market microstructure"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"SEBI Working Papers:"})," Regulatory research and market studies"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"RBI Bulletins:"})," Monetary policy impact studies"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"IIMA Working Papers:"})," Academic research on Indian finance"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"NISM Research:"})," National Institute of Securities Markets publications"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"CAFRAL:"})," Centre for Advanced Financial Research and Learning"]})]})]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Extracting Actionable Signals from Papers"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Not every academic paper translates directly into a trading strategy. The extraction process requires mapping theoretical constructs to implementable signals:"}),e.jsx(t.BlockMath,{math:"\\text{Signal}_i(t) = g\\left(\\text{Paper Factor}_i, \\text{NSE Data}_t, \\text{Indian Context}\\right)"}),e.jsx(g,{title:"paper_to_signal.py",runnable:!0,code:`import numpy as np
from dataclasses import dataclass
from typing import List, Dict

@dataclass
class PaperSignal:
    """Maps an academic paper finding to an implementable signal."""
    paper_title: str
    original_factor: str
    nse_implementation: str
    data_requirements: List[str]
    expected_decay: float  # Annual alpha decay rate
    india_adjustment: str
    estimated_sharpe: float
    implementation_complexity: str  # LOW, MEDIUM, HIGH

class PaperToSignalMapper:
    """Convert academic findings to NSE-tradeable signals."""

    def __init__(self):
        self.signals: List[PaperSignal] = []

    def add_signal(self, signal: PaperSignal):
        self.signals.append(signal)

    def rank_by_viability(self) -> List[PaperSignal]:
        """Rank signals by implementation viability."""
        def viability_score(s):
            sharpe_score = min(s.estimated_sharpe / 2.0, 1.0) * 40
            decay_score = (1 - s.estimated_decay) * 30
            complexity_map = {'LOW': 30, 'MEDIUM': 20, 'HIGH': 10}
            complexity_score = complexity_map.get(s.implementation_complexity, 10)
            return sharpe_score + decay_score + complexity_score

        return sorted(self.signals, key=viability_score, reverse=True)

    def generate_research_plan(self) -> str:
        ranked = self.rank_by_viability()
        lines = ["Research Plan - Ranked by Viability"]
        for i, s in enumerate(ranked):
            lines.append(f"  {i+1}. {s.paper_title}")
            lines.append(f"     Factor: {s.original_factor}")
            lines.append(f"     NSE Implementation: {s.nse_implementation}")
            lines.append(f"     Est. Sharpe: {s.estimated_sharpe}")
            lines.append(f"     India Adjustment: {s.india_adjustment}")
            lines.append("")
        return "\\n".join(lines)

# Map academic papers to NSE signals
mapper = PaperToSignalMapper()

mapper.add_signal(PaperSignal(
    paper_title='Jegadeesh & Titman (1993) - Momentum',
    original_factor='12-1 month return',
    nse_implementation='Rank Nifty 500 by 12-1 month return, long Q5 short Q1',
    data_requirements=['NSE daily prices', 'Index constituents (PIT)'],
    expected_decay=0.05,
    india_adjustment='Exclude F&O expiry weeks, adjust for circuit breakers',
    estimated_sharpe=1.2,
    implementation_complexity='LOW',
))

mapper.add_signal(PaperSignal(
    paper_title='Fama & French (1993) - Value',
    original_factor='Book-to-Market ratio',
    nse_implementation='Use P/B from NSE filings, quarterly rebalance',
    data_requirements=['NSE fundamentals', 'Quarterly filings'],
    expected_decay=0.08,
    india_adjustment='Exclude PSU banks (different B/M dynamics), use standalone P/B',
    estimated_sharpe=0.8,
    implementation_complexity='MEDIUM',
))

mapper.add_signal(PaperSignal(
    paper_title='Amihud (2002) - Illiquidity Premium',
    original_factor='|return|/volume ratio',
    nse_implementation='Daily Amihud ratio on NSE mid-caps, monthly sort',
    data_requirements=['NSE daily prices', 'Volume data'],
    expected_decay=0.03,
    india_adjustment='Higher premium in India due to wider spreads in mid-caps',
    estimated_sharpe=1.0,
    implementation_complexity='LOW',
))

mapper.add_signal(PaperSignal(
    paper_title='Novy-Marx (2013) - Gross Profitability',
    original_factor='Gross Profit / Total Assets',
    nse_implementation='Quarterly GP/TA from NSE filings, Nifty 500 universe',
    data_requirements=['NSE quarterly financials', 'Balance sheet data'],
    expected_decay=0.06,
    india_adjustment='Adjust for Indian GAAP vs IFRS differences in gross profit definition',
    estimated_sharpe=0.9,
    implementation_complexity='MEDIUM',
))

print(mapper.generate_research_plan())`}),e.jsx(p,{title:"Key Takeaway",type:"tip",children:e.jsxs("p",{children:["A systematic literature review is ",e.jsx("strong",{children:"not optional"})," -- it is the foundation of credible research. Every hour spent reviewing existing work saves ten hours of redundant research. Focus on papers with Indian market coverage, but also review global studies for transferable insights. Always replicate before implementing, and account for post-publication alpha decay. Map each paper to a concrete, implementable signal for NSE before deciding whether to pursue further research."]})})]})}const Q=Object.freeze(Object.defineProperty({__proto__:null,default:T},Symbol.toStringTag,{value:"Module"}));function E(){const[a,c]=d.useState(20),[s,n]=d.useState(.05),[r,o]=d.useState("none"),i=1-Math.pow(1-s,a),m=s/a,l=s*(a+1)/(2*a),y=r==="bonferroni"?m:r==="bh"?l:s,h=r==="none"?i:r==="bonferroni"?1-Math.pow(1-m,a):1-Math.pow(1-l,a);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Multiple Testing Correction"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"See how testing multiple strategies inflates false discovery risk and how corrections help."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Number of Tests: ",a]}),e.jsx("input",{type:"range",min:"1",max:"200",step:"1",value:a,onChange:x=>c(parseInt(x.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Base Alpha: ",(s*100).toFixed(1),"%"]}),e.jsx("input",{type:"range",min:"0.01",max:"0.20",step:"0.01",value:s,onChange:x=>n(parseFloat(x.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsx("span",{children:"Correction Method"}),e.jsxs("select",{value:r,onChange:x=>o(x.target.value),className:"rounded border p-1 text-xs dark:bg-gray-800 dark:border-gray-600",children:[e.jsx("option",{value:"none",children:"No Correction"}),e.jsx("option",{value:"bonferroni",children:"Bonferroni"}),e.jsx("option",{value:"bh",children:"Benjamini-Hochberg (FDR)"})]})]})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-3 text-center",children:[e.jsxs("div",{className:`rounded-lg p-3 ${i>.3&&r==="none"?"bg-red-50 dark:bg-red-900/30":"bg-green-50 dark:bg-green-900/30"}`,children:[e.jsx("div",{className:"text-[10px] text-gray-500",children:"Family-Wise Error"}),e.jsxs("div",{className:`text-lg font-bold ${r==="none"&&i>.3?"text-red-600":"text-green-600"}`,children:[r==="none"?(i*100).toFixed(1):(h*100).toFixed(2),"%"]})]}),e.jsxs("div",{className:"rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30",children:[e.jsx("div",{className:"text-[10px] text-gray-500",children:"Corrected Alpha"}),e.jsxs("div",{className:"text-lg font-bold text-blue-600",children:[(y*100).toFixed(3),"%"]})]}),e.jsxs("div",{className:"rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30",children:[e.jsx("div",{className:"text-[10px] text-gray-500",children:"Min t-stat Required"}),e.jsx("div",{className:"text-lg font-bold text-purple-600",children:(2.326+Math.log(a)*.3).toFixed(2)})]})]})]})}function R(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Bonferroni and BH-FDR Correction"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"The most dangerous trap in quantitative strategy research is the multiple testing problem. When you test many strategies, parameters, or signals on NSE data, some will appear statistically significant by chance alone. Proper correction methods are essential to avoid deploying strategies that are nothing more than noise."}),e.jsx(_,{title:"Multiple Testing Problem",label:"Definition 19.4",definition:"The multiple testing problem (also called the look-elsewhere effect or data snooping bias) occurs when multiple statistical hypotheses are tested simultaneously. With M independent tests at significance level alpha, the probability of at least one false positive (family-wise error rate, FWER) is 1 - (1 - alpha)^M. For M = 20 at alpha = 5%, FWER = 64%.",notation:"Key metrics: FWER (family-wise error rate), FDR (false discovery rate), FWER controls the probability of ANY false positive; FDR controls the PROPORTION of false positives among rejections."}),e.jsx(E,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Bonferroni Correction"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The simplest and most conservative correction divides the significance level by the number of tests:"}),e.jsx(t.BlockMath,{math:"\\alpha_{\\text{Bonferroni}} = \\frac{\\alpha}{M}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["For ",e.jsx(t.InlineMath,{math:"M = 50"})," strategies tested at ",e.jsx(t.InlineMath,{math:"\\alpha = 5\\%"}),", each individual test must achieve ",e.jsx(t.InlineMath,{math:"p < 0.001"})," to be considered significant. This is extremely conservative and rejects many true signals."]}),e.jsx(j,{title:"Bonferroni Inequality",label:"Theorem 19.4",statement:"For $M$ hypothesis tests with individual p-values $p_1, \\ldots, p_M$, the Bonferroni procedure rejects $H_{0,i}$ if $p_i \\leq \\alpha/M$. This controls the FWER at level $\\alpha$: $\\text{FWER} = P(\\text{any false rejection}) \\leq \\sum_{i \\in H_0} P(p_i \\leq \\alpha/M) \\leq M_0 \\cdot \\alpha/M \\leq \\alpha$ where $M_0 \\leq M$ is the number of true nulls.",proof:"By the union bound (Boole's inequality): $P(\\bigcup_i \\{p_i \\leq \\alpha/M\\}) \\leq \\sum_i P(p_i \\leq \\alpha/M)$. Under $H_0$, each p-value is uniform on $[0,1]$, so $P(p_i \\leq \\alpha/M) = \\alpha/M$. Summing over at most $M$ true nulls gives the bound."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Benjamini-Hochberg FDR Control"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The BH procedure controls the False Discovery Rate (FDR) -- the expected proportion of false positives among rejected hypotheses -- rather than the FWER. This is less conservative and more appropriate when testing many strategies:"}),e.jsx(t.BlockMath,{math:"\\text{FDR} = \\mathbb{E}\\left[\\frac{V}{R \\vee 1}\\right]"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"V"})," is the number of false discoveries and"," ",e.jsx(t.InlineMath,{math:"R"})," is the total number of rejections."]}),e.jsx(t.BlockMath,{math:"\\text{BH procedure: Reject } H_{(i)} \\text{ for } i \\leq k^* = \\max\\left\\{i : p_{(i)} \\leq \\frac{i}{M} \\cdot \\alpha\\right\\}"}),e.jsx(g,{title:"multiple_testing_correction.py",runnable:!0,code:`import numpy as np
from scipy import stats

class MultipleTestingCorrector:
    """Multiple testing correction for strategy research."""

    def __init__(self, alpha: float = 0.05):
        self.alpha = alpha

    def bonferroni(self, p_values: np.ndarray) -> dict:
        """Bonferroni correction (FWER control)."""
        m = len(p_values)
        threshold = self.alpha / m
        rejected = p_values <= threshold
        return {
            'method': 'Bonferroni',
            'threshold': threshold,
            'rejected': rejected,
            'n_rejected': np.sum(rejected),
            'adjusted_pvalues': np.minimum(p_values * m, 1.0),
        }

    def holm(self, p_values: np.ndarray) -> dict:
        """Holm-Bonferroni step-down (FWER control)."""
        m = len(p_values)
        sorted_idx = np.argsort(p_values)
        sorted_p = p_values[sorted_idx]
        rejected = np.zeros(m, dtype=bool)

        for i, p in enumerate(sorted_p):
            if p <= self.alpha / (m - i):
                rejected[sorted_idx[i]] = True
            else:
                break

        return {
            'method': 'Holm',
            'rejected': rejected,
            'n_rejected': np.sum(rejected),
        }

    def benjamini_hochberg(self, p_values: np.ndarray) -> dict:
        """Benjamini-Hochberg procedure (FDR control)."""
        m = len(p_values)
        sorted_idx = np.argsort(p_values)
        sorted_p = p_values[sorted_idx]

        # Find largest k such that p_(k) <= k/m * alpha
        thresholds = np.arange(1, m + 1) / m * self.alpha
        k_star = 0
        for i in range(m):
            if sorted_p[i] <= thresholds[i]:
                k_star = i + 1

        rejected = np.zeros(m, dtype=bool)
        if k_star > 0:
            rejected[sorted_idx[:k_star]] = True

        # Adjusted p-values
        adjusted = np.zeros(m)
        for i in range(m):
            adjusted[sorted_idx[i]] = min(
                sorted_p[i] * m / (i + 1), 1.0
            )

        return {
            'method': 'Benjamini-Hochberg',
            'k_star': k_star,
            'rejected': rejected,
            'n_rejected': np.sum(rejected),
            'adjusted_pvalues': adjusted,
            'fdr_threshold': thresholds[k_star - 1] if k_star > 0 else 0,
        }

    def compare_methods(self, p_values: np.ndarray) -> dict:
        """Compare all correction methods."""
        return {
            'uncorrected': np.sum(p_values <= self.alpha),
            'bonferroni': self.bonferroni(p_values)['n_rejected'],
            'holm': self.holm(p_values)['n_rejected'],
            'bh_fdr': self.benjamini_hochberg(p_values)['n_rejected'],
        }

# Simulate: testing 50 momentum strategies on Nifty 50
np.random.seed(42)
n_strategies = 50

# Most are noise (null), a few have real signal
n_real = 5  # 5 strategies have real alpha
p_values = np.zeros(n_strategies)

# Null strategies (no alpha)
for i in range(n_strategies - n_real):
    # Generate random t-stat from null distribution
    t = np.random.standard_t(df=250)
    p_values[i] = 2 * stats.t.sf(abs(t), df=250)

# Real strategies (have alpha, small p-values)
for i in range(n_real):
    # Real signal: t-stat around 2.5-3.5
    t = np.random.uniform(2.5, 3.5)
    p_values[n_strategies - n_real + i] = 2 * stats.t.sf(t, df=250)

# Apply corrections
corrector = MultipleTestingCorrector(alpha=0.05)

print("=== Multiple Testing Correction Results ===")
print(f"Strategies tested: {n_strategies}")
print(f"True signals: {n_real}")
print(f"Significance level: {corrector.alpha}\\n")

comparison = corrector.compare_methods(p_values)
for method, n_rej in comparison.items():
    fp = max(0, n_rej - n_real) if n_rej > 0 else 0
    print(f"  {method:15s}: {n_rej} rejected "
          f"(true positives: {min(n_rej, n_real)}, "
          f"false positives: {fp})")

# Detailed BH results
bh = corrector.benjamini_hochberg(p_values)
print(f"\\n=== Benjamini-Hochberg Details ===")
print(f"  FDR threshold: {bh['fdr_threshold']:.6f}")
print(f"  k*: {bh['k_star']}")
print(f"\\n  Accepted strategies:")
for i, (rej, p) in enumerate(zip(bh['rejected'], p_values)):
    if rej:
        is_real = i >= n_strategies - n_real
        print(f"    Strategy {i+1}: p={p:.6f} "
              f"{'[REAL SIGNAL]' if is_real else '[FALSE POSITIVE!]'}")`}),e.jsx(b,{title:"Correcting for Data Snooping in NSE Research",difficulty:"advanced",problem:"You tested 30 different momentum lookback periods (1-30 months) on Nifty 500. The best performer (12-month lookback) has t-stat = 3.2. After Bonferroni correction, is this still significant?",solution:[{step:"Raw p-value for t = 3.2",formula:"p = 2 \\times \\Phi(-3.2) = 2 \\times 0.000687 = 0.00137",explanation:"The uncorrected p-value is 0.137%, well below 5%."},{step:"Bonferroni correction",formula:"\\alpha_{\\text{Bonf}} = \\frac{0.05}{30} = 0.00167",explanation:"With 30 tests, the corrected threshold is 0.167%."},{step:"Compare",formula:"p = 0.00137 < \\alpha_{\\text{Bonf}} = 0.00167 \\; \\checkmark",explanation:"The result survives Bonferroni correction. The t-stat of 3.2 is strong enough to withstand correction for 30 tests."},{step:"Harvey et al. (2016) threshold",formula:"t_{\\text{Harvey}} = 3.0 \\text{ (recommended for finance)}",explanation:"Harvey, Liu, and Zhu (2016) recommend t > 3.0 as a universal threshold for new factors, accounting for the hundreds of factors tested across the literature. Your t = 3.2 passes this threshold."}]}),e.jsxs(p,{title:"The Harvey-Liu-Zhu t-Statistic Hurdle",type:"warning",children:[e.jsx("p",{children:"Harvey, Liu, and Zhu (2016) famously argued that the traditional t > 2 threshold is insufficient for new factor discovery because hundreds of factors have been tested across the finance literature. They recommend:"}),e.jsxs("ul",{className:"mt-2 list-disc list-inside space-y-1",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"t > 3.0"})," for new single-sorted portfolios"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"t > 3.5"})," for double-sorted or conditional strategies"]}),e.jsx("li",{children:"For Indian market strategies, adjust based on the number of YOUR tests"}),e.jsx("li",{children:"Always report the number of configurations tested alongside results"})]})]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Practical Application: Indian Factor Zoo"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The Indian factor zoo contains hundreds of proposed alpha signals for NSE. Without proper correction, most published results are likely false discoveries. Here is a framework for evaluating published Indian market factors:"}),e.jsx(g,{title:"indian_factor_evaluation.py",runnable:!0,code:`import numpy as np
from scipy import stats

def evaluate_indian_factor(factor_name, t_stat, n_tests_reported,
                           n_tests_estimated, sample_years,
                           universe='Nifty500'):
    """Evaluate an Indian market factor for false discovery risk."""

    # Raw p-value
    p_raw = 2 * stats.t.sf(abs(t_stat), df=sample_years * 252 - 2)

    # Bonferroni correction for reported tests
    p_bonf_reported = min(p_raw * n_tests_reported, 1.0)

    # Bonferroni for estimated total tests
    p_bonf_estimated = min(p_raw * n_tests_estimated, 1.0)

    # Harvey et al threshold
    harvey_pass = abs(t_stat) >= 3.0

    # Minimum Sharpe for significance
    min_sharpe = 1.96 / np.sqrt(sample_years * 252)
    observed_sharpe = t_stat / np.sqrt(sample_years * 252) * np.sqrt(252)

    return {
        'factor': factor_name,
        't_stat': t_stat,
        'p_raw': p_raw,
        'p_bonf_reported': p_bonf_reported,
        'p_bonf_estimated': p_bonf_estimated,
        'harvey_pass': harvey_pass,
        'observed_sharpe': observed_sharpe,
        'verdict': (
            'LIKELY GENUINE' if harvey_pass and p_bonf_estimated < 0.05
            else 'POSSIBLY GENUINE' if p_bonf_reported < 0.05
            else 'LIKELY FALSE DISCOVERY'
        )
    }

# Evaluate popular Indian market factors
factors = [
    ('12-1 Momentum (Nifty 500)', 3.8, 5, 50, 15),
    ('P/E Value Factor', 2.4, 3, 30, 20),
    ('FII Flow Signal', 2.9, 10, 100, 8),
    ('Promoter Holding Change', 2.1, 5, 40, 10),
    ('Quality (ROE)', 3.2, 4, 25, 15),
    ('Low Volatility', 2.7, 8, 60, 12),
    ('Earnings Revision', 3.5, 3, 20, 10),
    ('Smallcap Illiquidity', 2.0, 6, 80, 8),
]

print("=== Indian Factor Zoo Evaluation ===")
print(f"{'Factor':<30} {'t-stat':>6} {'p_raw':>8} {'p_Bonf':>8} "
      f"{'Harvey':>7} {'Verdict':<25}")
print("-" * 90)

for name, t, n_rep, n_est, years in factors:
    result = evaluate_indian_factor(name, t, n_rep, n_est, years)
    harvey = "PASS" if result['harvey_pass'] else "FAIL"
    print(f"{name:<30} {t:>6.1f} {result['p_raw']:>8.4f} "
          f"{result['p_bonf_estimated']:>8.4f} {harvey:>7} "
          f"{result['verdict']:<25}")

# How many factors survive correction?
genuine = sum(1 for name, t, n_rep, n_est, years in factors
              if evaluate_indian_factor(name, t, n_rep, n_est, years)['harvey_pass'])
print(f"\\nFactors passing Harvey threshold: {genuine}/{len(factors)}")
print(f"Expected false discoveries (uncorrected): "
      f"{sum(1 for _,t,_,_,_ in factors if abs(t) > 1.96) - genuine}")`}),e.jsx(b,{title:"The Deflated t-Statistic for Indian Markets",difficulty:"advanced",problem:"A researcher reports 15 different factor strategies for Nifty 500, with the best achieving t-stat of 2.8. Using the deflated t-statistic approach, what is the adjusted significance?",solution:[{step:"Calculate the expected maximum t-stat under null",formula:"E[\\max(t_1, \\ldots, t_{15})] \\approx \\sqrt{2 \\ln(15)} = \\sqrt{2 \\times 2.71} = 2.33",explanation:"Under the null hypothesis where all strategies have zero alpha, the expected maximum t-statistic from 15 independent tests is approximately 2.33."},{step:"Compute the deflated t-statistic",formula:"t_{\\text{deflated}} = 2.8 - 2.33 = 0.47",explanation:"Subtracting the expected maximum under the null gives a deflated t of only 0.47, which is not significant at any reasonable level."},{step:"Assess using Bonferroni",formula:"t_{\\text{Bonf}} = \\Phi^{-1}(1 - 0.05/(2 \\times 15)) = 3.16",explanation:"The Bonferroni-corrected critical value for 15 tests at 5% is 3.16. The observed t = 2.8 fails this threshold."},{step:"Conclusion",formula:"\\text{The best strategy is NOT significant after correction}",explanation:"Despite appearing significant at the 5% level individually (t = 2.8 > 1.96), after accounting for 15 tests, the result is likely a false discovery. The researcher needs either a stronger signal or fewer tests."}]}),e.jsx(p,{title:"Key Takeaway",type:"tip",children:e.jsxs("p",{children:["Multiple testing correction is ",e.jsx("strong",{children:"non-negotiable"})," in quantitative research. Use Bonferroni for conservative FWER control when you need certainty that no false positives slip through. Use Benjamini-Hochberg for FDR control when you can tolerate some false positives among a pool of discoveries. For Indian market research with typical test counts of 20--100, BH-FDR provides the best balance of power and false discovery control. Always report the number of tests alongside any significant result."]})})]})}const X=Object.freeze(Object.defineProperty({__proto__:null,default:R},Symbol.toStringTag,{value:"Module"}));function M(){const[a,c]=d.useState(10),[s,n]=d.useState(100),[r,o]=d.useState(30),i=r/100,m=i>.5;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Probability of Backtest Overfitting"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Estimate PBO for your Indian market strategy using CSCV framework parameters."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Data Partitions (S): ",a]}),e.jsx("input",{type:"range",min:"4",max:"20",step:"2",value:a,onChange:l=>c(parseInt(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Strategy Trials: ",s]}),e.jsx("input",{type:"range",min:"10",max:"1000",step:"10",value:s,onChange:l=>n(parseInt(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Overfit Rate (%): ",r]}),e.jsx("input",{type:"range",min:"0",max:"100",step:"1",value:r,onChange:l=>o(parseInt(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-3 text-center",children:[e.jsxs("div",{className:`rounded-lg p-3 ${m?"bg-red-50 dark:bg-red-900/30":"bg-green-50 dark:bg-green-900/30"}`,children:[e.jsx("div",{className:"text-[10px] text-gray-500",children:"PBO"}),e.jsxs("div",{className:`text-lg font-bold ${m?"text-red-600":"text-green-600"}`,children:[(i*100).toFixed(0),"%"]})]}),e.jsxs("div",{className:"rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30",children:[e.jsx("div",{className:"text-[10px] text-gray-500",children:"CSCV Combinations"}),e.jsx("div",{className:"text-lg font-bold text-blue-600",children:Math.round(v(a)/v(a/2)**2)})]}),e.jsxs("div",{className:`rounded-lg p-3 ${m?"bg-red-50 dark:bg-red-900/30":"bg-green-50 dark:bg-green-900/30"}`,children:[e.jsx("div",{className:"text-[10px] text-gray-500",children:"Verdict"}),e.jsx("div",{className:`text-lg font-bold ${m?"text-red-600":"text-green-600"}`,children:m?"OVERFIT":"OK"})]})]})]})}function v(a){if(a<=1)return 1;let c=1;for(let s=2;s<=a;s++)c*=s;return c}function F(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"PBO and MinBTL for Indian Strategies"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Backtest overfitting is the primary reason strategies that look excellent on paper fail in live trading on NSE. Probability of Backtest Overfitting (PBO) and Minimum Backtest Length (MinBTL) provide rigorous frameworks to detect and prevent overfitting before deploying capital."}),e.jsx(_,{title:"Probability of Backtest Overfitting (PBO)",label:"Definition 19.5",definition:"PBO is the probability that an in-sample optimal strategy will underperform the median of all tested strategies out-of-sample. It is computed using Combinatorially Symmetric Cross-Validation (CSCV), which exhaustively partitions the data into training and testing sets. PBO close to 1 indicates severe overfitting; PBO close to 0 indicates the strategy is robust.",notation:"PBO = P(rank_OOS of IS-optimal < median) where rank is the OOS performance rank among all tested strategies. Target: PBO < 0.25 for deployment."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Combinatorially Symmetric Cross-Validation"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["CSCV works by partitioning the data into ",e.jsx(t.InlineMath,{math:"S"})," equally-sized blocks, then evaluating all ",e.jsx(t.InlineMath,{math:"\\binom{S}{S/2}"})," ways to split these blocks into training and testing sets:"]}),e.jsx(t.BlockMath,{math:"C = \\binom{S}{S/2} = \\frac{S!}{(S/2)!^2}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["For ",e.jsx(t.InlineMath,{math:"S = 10"}),", this gives ",e.jsx(t.InlineMath,{math:"C = 252"})," unique train-test splits, providing a robust estimate of out-of-sample performance."]}),e.jsx(M,{}),e.jsx(j,{title:"Minimum Backtest Length (MinBTL)",label:"Theorem 19.5",statement:"The minimum backtest length required to avoid overfitting when $N$ strategies are tested is: $\\text{MinBTL} = \\frac{1}{2} \\left( \\frac{N \\cdot z_\\alpha}{\\bar{S} \\cdot \\hat{\\sigma}_{\\bar{S}}} \\right)^2 \\cdot T_0$ where $\\bar{S}$ is the average Sharpe ratio, $\\hat{\\sigma}_{\\bar{S}}$ is its standard error, $z_\\alpha$ is the critical z-value, and $T_0$ is the observation frequency. For $N = 50$ strategies tested on NSE daily data with target Sharpe 1.5, MinBTL $\\approx 15$ years.",proof:"This result follows from Bailey, Borwein, Lopez de Prado, and Zhu (2014). The key insight is that more strategy trials require longer backtests to maintain the same statistical significance. The square relationship between N and MinBTL means that doubling the number of trials quadruples the required data."}),e.jsx(g,{title:"pbo_analysis.py",runnable:!0,code:`import numpy as np
from itertools import combinations

class PBOAnalyzer:
    """Probability of Backtest Overfitting via CSCV."""

    def __init__(self, n_partitions: int = 10):
        self.S = n_partitions
        assert n_partitions % 2 == 0, "S must be even"

    def compute_pbo(self, strategy_returns: np.ndarray) -> dict:
        """
        Compute PBO using CSCV.

        strategy_returns: shape (T, N) - T time periods, N strategies
        """
        T, N = strategy_returns.shape
        block_size = T // self.S

        # Partition returns into S blocks
        blocks = []
        for s in range(self.S):
            start = s * block_size
            end = start + block_size
            blocks.append(strategy_returns[start:end])

        # Generate all CSCV combinations
        half = self.S // 2
        combos = list(combinations(range(self.S), half))
        n_combos = len(combos)

        logit_values = []
        overfit_count = 0

        for combo in combos:
            # Training set: blocks in combo
            # Testing set: remaining blocks
            test_blocks = [i for i in range(self.S) if i not in combo]

            # Combine blocks
            train_data = np.vstack([blocks[i] for i in combo])
            test_data = np.vstack([blocks[i] for i in test_blocks])

            # Find IS-optimal strategy
            is_sharpes = np.mean(train_data, axis=0) / (
                np.std(train_data, axis=0) + 1e-10
            ) * np.sqrt(252)
            is_best = np.argmax(is_sharpes)

            # Rank the IS-optimal strategy OOS
            oos_sharpes = np.mean(test_data, axis=0) / (
                np.std(test_data, axis=0) + 1e-10
            ) * np.sqrt(252)

            # Rank of IS-best in OOS
            rank = np.sum(oos_sharpes <= oos_sharpes[is_best]) / N

            # Check if IS-best is below median OOS
            if rank < 0.5:
                overfit_count += 1

            # Logit for distribution
            if 0 < rank < 1:
                logit_values.append(np.log(rank / (1 - rank)))

        pbo = overfit_count / n_combos

        return {
            'pbo': pbo,
            'n_combinations': n_combos,
            'mean_logit': np.mean(logit_values) if logit_values else 0,
            'std_logit': np.std(logit_values) if logit_values else 0,
            'overfit_count': overfit_count,
            'verdict': (
                'SAFE (PBO < 0.25)' if pbo < 0.25
                else 'MARGINAL (0.25 < PBO < 0.50)' if pbo < 0.50
                else 'OVERFIT (PBO > 0.50)'
            ),
        }

    def min_backtest_length(self, n_strategies: int,
                            target_sharpe: float = 1.5,
                            sharpe_std: float = 0.5,
                            alpha: float = 0.05) -> float:
        """Calculate Minimum Backtest Length in years."""
        from scipy.stats import norm
        z_alpha = norm.ppf(1 - alpha)
        min_btl = 0.5 * (
            n_strategies * z_alpha / (target_sharpe * sharpe_std)
        ) ** 2 / 252
        return min_btl

# Simulate PBO analysis for NSE strategies
np.random.seed(42)
T = 2520  # ~10 years of daily data
N = 30     # 30 strategy variants tested

# Generate returns: 3 have real signal, 27 are noise
returns = np.random.normal(0, 0.015, (T, N))
# Add signal to strategies 0, 1, 2
returns[:, 0] += 0.0004  # Sharpe ~1.0
returns[:, 1] += 0.0003  # Sharpe ~0.75
returns[:, 2] += 0.0005  # Sharpe ~1.25

analyzer = PBOAnalyzer(n_partitions=10)
result = analyzer.compute_pbo(returns)

print("=== PBO Analysis for NSE Strategy Suite ===")
print(f"Strategies tested: {N}")
print(f"Data length: {T} days (~{T/252:.0f} years)")
print(f"CSCV partitions: {analyzer.S}")
print(f"Total combinations: {result['n_combinations']}")
print(f"\\nPBO: {result['pbo']:.3f}")
print(f"Mean logit: {result['mean_logit']:.3f}")
print(f"Overfit combinations: {result['overfit_count']}/{result['n_combinations']}")
print(f"\\nVerdict: {result['verdict']}")

# MinBTL analysis
print(f"\\n=== Minimum Backtest Length ===")
for n_strats in [5, 10, 20, 50, 100]:
    min_btl = analyzer.min_backtest_length(n_strats, target_sharpe=1.5)
    print(f"  {n_strats:3d} strategies: {min_btl:.1f} years required")`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Practical PBO Guidelines for Indian Markets"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"PBO Range"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Interpretation"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Action"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2 text-green-600 font-bold",children:"PBO < 0.25"}),e.jsx("td",{className:"px-4 py-2",children:"Low overfitting risk"}),e.jsx("td",{className:"px-4 py-2",children:"Proceed to paper trading"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2 text-yellow-600 font-bold",children:"0.25 ≤ PBO < 0.50"}),e.jsx("td",{className:"px-4 py-2",children:"Moderate overfitting risk"}),e.jsx("td",{className:"px-4 py-2",children:"Reduce parameters, extend data"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2 text-red-600 font-bold",children:"PBO ≥ 0.50"}),e.jsx("td",{className:"px-4 py-2",children:"High overfitting risk"}),e.jsx("td",{className:"px-4 py-2",children:"Do not deploy, redesign strategy"})]})]})]})}),e.jsx(b,{title:"PBO for a Nifty 50 Momentum Strategy",difficulty:"advanced",problem:"You tested 20 parameter combinations for a Nifty 50 momentum strategy (lookback: 3-12 months, holding: 1-4 weeks) on 8 years of NSE data. CSCV with S=10 gives PBO = 0.42. Should you deploy?",solution:[{step:"Assess PBO level",formula:"\\text{PBO} = 0.42 \\in [0.25, 0.50)",explanation:"PBO of 0.42 falls in the marginal zone. There is a 42% chance the IS-optimal strategy will underperform the median OOS."},{step:"Check MinBTL requirement",formula:"\\text{MinBTL}(N=20, S=1.5) \\approx 11.2 \\text{ years}",explanation:"With 20 trials and target Sharpe 1.5, you need at least 11.2 years of data. Your 8 years is insufficient."},{step:"Reduce trial count",formula:"N_{\\text{reduced}} = 5 \\Rightarrow \\text{MinBTL} \\approx 2.8 \\text{ years}",explanation:"Fix the lookback to the theoretically motivated 12-1 month and test only 5 holding period variants. This dramatically reduces the overfitting risk."},{step:"Decision",formula:"\\text{DO NOT deploy with PBO} = 0.42",explanation:"Reduce parameters using economic theory, extend the dataset if possible (NSE data goes back to 1994), or combine with walk-forward optimization to reduce PBO below 0.25."}]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Overfitting in Indian Market Context"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Indian markets present unique overfitting challenges due to structural breaks (demonetization 2016, GST 2017, COVID 2020) and evolving market microstructure. A strategy optimized on pre-demonetization data may not generalize to post-2016 NSE conditions."}),e.jsx(g,{title:"indian_market_overfitting.py",runnable:!0,code:`import numpy as np

def regime_aware_pbo(returns, regime_dates, n_partitions=10):
    """
    PBO analysis that accounts for Indian market regime changes.
    Ensures each CSCV partition respects regime boundaries.
    """
    T, N = returns.shape

    # Indian market regimes
    regimes = {
        'pre_demon': (0, int(T * 0.4)),       # Before demonetization
        'gst_transition': (int(T * 0.4), int(T * 0.55)),  # GST period
        'normal': (int(T * 0.55), int(T * 0.8)),  # Stable period
        'covid_recovery': (int(T * 0.8), T),   # COVID and recovery
    }

    # Calculate Sharpe in each regime
    regime_sharpes = {}
    for regime_name, (start, end) in regimes.items():
        regime_data = returns[start:end]
        sharpes = np.mean(regime_data, axis=0) / (
            np.std(regime_data, axis=0) + 1e-10
        ) * np.sqrt(252)
        best_idx = np.argmax(sharpes)
        regime_sharpes[regime_name] = {
            'best_sharpe': sharpes[best_idx],
            'best_strategy': best_idx,
            'mean_sharpe': np.mean(sharpes),
            'std_sharpe': np.std(sharpes),
        }

    # Check if best strategy is consistent across regimes
    best_strategies = [v['best_strategy'] for v in regime_sharpes.values()]
    consistency = len(set(best_strategies)) / len(best_strategies)
    is_overfit = consistency > 0.8  # Different best strategy per regime

    return {
        'regime_sharpes': regime_sharpes,
        'best_strategies': best_strategies,
        'strategy_consistency': 1 - consistency,
        'is_likely_overfit': is_overfit,
    }

# Simulate NSE strategy analysis across regimes
np.random.seed(42)
T = 2520  # 10 years
N = 20    # 20 strategy variants

returns = np.random.normal(0, 0.015, (T, N))
# Strategy 0 has regime-dependent alpha (overfit risk)
returns[:1000, 0] += 0.0008   # Strong pre-demon
returns[1000:, 0] -= 0.0002   # Weak after
# Strategy 1 has stable alpha (genuine)
returns[:, 1] += 0.0003

result = regime_aware_pbo(returns, {})

print("=== Regime-Aware Overfitting Analysis ===")
print(f"Strategies: {N}, Period: {T} days\\n")

for regime, stats in result['regime_sharpes'].items():
    print(f"  {regime:20s}: Best Sharpe={stats['best_sharpe']:.2f} "
          f"(Strategy {stats['best_strategy']})")

print(f"\\nBest strategies per regime: {result['best_strategies']}")
print(f"Cross-regime consistency: {result['strategy_consistency']:.2f}")
print(f"Likely overfit: {'YES' if result['is_likely_overfit'] else 'NO'}")
print(f"\\nInsight: Strategy 0 looks great pre-demonetization but")
print(f"fails post-2016. Strategy 1 is consistent across regimes.")`}),e.jsxs(p,{title:"Indian Market Structural Breaks",type:"warning",children:[e.jsx("p",{children:"When running PBO analysis on NSE data, be aware of these major structural breaks:"}),e.jsxs("ul",{className:"mt-2 list-disc list-inside space-y-1",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Nov 2016:"})," Demonetization -- massive liquidity shock"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Jul 2017:"})," GST implementation -- changed corporate earnings patterns"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Sep 2019:"})," Corporate tax cut -- sector rotation"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Mar 2020:"})," COVID crash -- 40% drawdown in Nifty"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Jan 2023:"})," Adani crisis -- single-stock contagion event"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"2024:"})," T+1 settlement -- changed trade dynamics"]})]}),e.jsx("p",{className:"mt-2",children:"A strategy that performs well only in one regime is likely overfit. Verify performance consistency across ALL major regime changes."})]}),e.jsx(p,{title:"Key Takeaway",type:"tip",children:e.jsxs("p",{children:["PBO is the ",e.jsx("strong",{children:"gold standard for detecting backtest overfitting"}),". Every strategy proposed for live NSE trading should report its PBO computed via CSCV. If PBO exceeds 0.25, reduce the number of parameters, extend the dataset, or use stronger economic priors to constrain the search space. For Indian markets, supplement PBO with regime-aware analysis that checks performance consistency across demonetization, GST, and COVID periods."]})})]})}const Z=Object.freeze(Object.defineProperty({__proto__:null,default:F},Symbol.toStringTag,{value:"Module"}));function C(){const[a,c]=d.useState(10),[s,n]=d.useState(60),[r,o]=d.useState(20),[i,m]=d.useState(21),l=100-s-r,y=(a*s/100).toFixed(1),h=(a*r/100).toFixed(1),x=(a*l/100).toFixed(1);(i/252).toFixed(2);const f=Math.floor(a*252*s/100-i);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Train/Validation/Test Split Designer"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Design your data split for NSE strategy development with embargo periods."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Total Data: ",a," years"]}),e.jsx("input",{type:"range",min:"3",max:"20",step:"1",value:a,onChange:u=>c(parseInt(u.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Train: ",s,"%"]}),e.jsx("input",{type:"range",min:"40",max:"80",step:"5",value:s,onChange:u=>n(parseInt(u.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Validation: ",r,"%"]}),e.jsx("input",{type:"range",min:"10",max:"30",step:"5",value:r,onChange:u=>o(parseInt(u.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Embargo: ",i," days"]}),e.jsx("input",{type:"range",min:"0",max:"63",step:"1",value:i,onChange:u=>m(parseInt(u.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 600 80",className:"w-full max-w-2xl mx-auto block","aria-label":"Data split visualization",children:[e.jsx("rect",{x:"10",y:"20",width:s*5.5,height:"40",rx:"4",fill:"#3b82f6",opacity:"0.7"}),e.jsx("rect",{x:10+s*5.5+2,y:"20",width:10,height:"40",rx:"2",fill:"#ef4444",opacity:"0.5"}),e.jsx("rect",{x:22+s*5.5,y:"20",width:r*5.5,height:"40",rx:"4",fill:"#f59e0b",opacity:"0.7"}),e.jsx("rect",{x:22+s*5.5+2,y:"20",width:10,height:"40",rx:"2",fill:"#ef4444",opacity:"0.5"}),e.jsx("rect",{x:34+(s+r)*5.5,y:"20",width:l*5.5,height:"40",rx:"4",fill:"#22c55e",opacity:"0.7"}),e.jsxs("text",{x:10+s*2.75,y:"45",textAnchor:"middle",className:"text-[10px] font-bold",fill:"white",children:["Train (",y,"y)"]}),e.jsxs("text",{x:22+s*5.5+r*2.75,y:"45",textAnchor:"middle",className:"text-[10px] font-bold",fill:"white",children:["Val (",h,"y)"]}),e.jsxs("text",{x:34+(s+r)*5.5+l*2.75,y:"45",textAnchor:"middle",className:"text-[10px] font-bold",fill:"white",children:["Test (",x,"y)"]}),e.jsxs("text",{x:"300",y:"75",textAnchor:"middle",className:"text-[9px]",fill:"#ef4444",children:["Red bars = embargo gaps (",i," days)"]})]}),e.jsxs("div",{className:"mt-2 grid grid-cols-2 gap-2 text-center text-xs",children:[e.jsxs("div",{className:"rounded bg-blue-50 p-2 dark:bg-blue-900/20",children:[e.jsx("span",{className:"text-gray-500",children:"Effective train days: "}),e.jsx("span",{className:"font-bold text-blue-600",children:f})]}),e.jsxs("div",{className:`rounded p-2 ${l>=15?"bg-green-50 dark:bg-green-900/20":"bg-red-50 dark:bg-red-900/20"}`,children:[e.jsx("span",{className:"text-gray-500",children:"Test set adequate: "}),e.jsx("span",{className:`font-bold ${l>=15?"text-green-600":"text-red-600"}`,children:l>=15?"YES":"NO (need >= 15%)"})]})]})]})}function A(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Proper Train/Validation/Test Splits with Embargo"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"The most fundamental safeguard against overfitting in strategy research is proper data splitting. For time-series financial data from NSE, standard cross-validation fails because of temporal dependencies. This section covers the correct approach to train/validation/test splitting with embargo periods."}),e.jsx(_,{title:"Purged Walk-Forward Validation",label:"Definition 19.6",definition:"Purged walk-forward validation is a time-series cross-validation method that (1) maintains temporal ordering (training data always precedes test data), (2) applies an embargo gap between training and testing periods to prevent information leakage from overlapping labels, and (3) purges any training observations whose labels overlap with the test period.",notation:"The embargo period d_embargo should be at least as long as the label look-ahead period. For a strategy using 21-day forward returns on NSE, d_embargo >= 21 trading days."}),e.jsx(C,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Why Standard Cross-Validation Fails"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Standard k-fold cross-validation assumes i.i.d. data, which is violated in financial time series. Two critical problems arise:"}),e.jsx(t.BlockMath,{math:"\\text{Problem 1: } y_t = f(X_t, X_{t+1}, \\ldots, X_{t+h}) \\quad \\text{(label leakage)}"}),e.jsx(t.BlockMath,{math:"\\text{Problem 2: } \\text{Corr}(r_t, r_{t+1}) \\neq 0 \\quad \\text{(serial correlation)}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The embargo gap addresses both problems by creating a buffer zone between train and test data that exceeds the maximum temporal dependency."}),e.jsx(j,{title:"Optimal Embargo Length",label:"Theorem 19.6",statement:"For a strategy with label horizon $h$ days and feature look-back $L$ days, the minimum embargo length is: $d_{\\text{embargo}} = h + \\max(L, \\tau_{\\text{decay}})$ where $\\tau_{\\text{decay}}$ is the autocorrelation decay time of the features. For NSE Nifty 50 daily strategies with $h = 21$ days and $L = 63$ days: $d_{\\text{embargo}} \\geq 84$ trading days (approximately 4 months).",proof:"The label $y_t$ depends on prices up to $t+h$, so any training observation within $h$ days of the test set contains information about test labels. Similarly, features at time $t$ may use data from $t-L$ to $t$, creating backward dependency. The autocorrelation decay $\\tau$ accounts for indirect information leakage through correlated features."}),e.jsx(g,{title:"embargo_walk_forward.py",runnable:!0,code:`import numpy as np
from typing import List, Tuple

class PurgedWalkForwardCV:
    """Purged walk-forward cross-validation for NSE strategies."""

    def __init__(self, n_splits: int = 5, embargo_days: int = 21,
                 test_size_pct: float = 0.20):
        self.n_splits = n_splits
        self.embargo = embargo_days
        self.test_pct = test_size_pct

    def split(self, n_samples: int, label_horizon: int = 0
              ) -> List[Tuple[np.ndarray, np.ndarray]]:
        """Generate train/test splits with embargo."""
        splits = []
        test_size = int(n_samples * self.test_pct / self.n_splits)

        for i in range(self.n_splits):
            test_end = n_samples - i * test_size
            test_start = test_end - test_size

            if test_start < 0:
                break

            # Training: everything before test_start - embargo
            train_end = test_start - self.embargo - label_horizon
            train_indices = np.arange(0, max(0, train_end))
            test_indices = np.arange(test_start, test_end)

            if len(train_indices) < 100:  # Minimum training size
                break

            splits.append((train_indices, test_indices))

        return splits

    def visualize_splits(self, n_samples: int,
                         label_horizon: int = 0) -> str:
        """Create text visualization of splits."""
        splits = self.split(n_samples, label_horizon)
        lines = []

        for i, (train, test) in enumerate(splits):
            row = ['.'] * (n_samples // 10)
            for t in train[::10]:
                idx = t // 10
                if idx < len(row):
                    row[idx] = 'T'  # Train
            embargo_start = train[-1] if len(train) > 0 else 0
            embargo_end = test[0] if len(test) > 0 else 0
            for e in range(embargo_start // 10, embargo_end // 10 + 1):
                if 0 <= e < len(row):
                    row[e] = 'X'  # Embargo
            for t in test[::10]:
                idx = t // 10
                if idx < len(row):
                    row[idx] = 'V'  # Test/Validate
            lines.append(f"  Split {i+1}: {''.join(row)}")

        return '\\n'.join(lines)

class TimeSeriesSplitter:
    """Complete train/validation/test splitter for NSE data."""

    def __init__(self, train_pct=0.60, val_pct=0.20,
                 embargo_days=21):
        self.train_pct = train_pct
        self.val_pct = val_pct
        self.test_pct = 1 - train_pct - val_pct
        self.embargo = embargo_days

    def split(self, n_samples: int) -> dict:
        """Create three-way split with embargo gaps."""
        train_end = int(n_samples * self.train_pct)
        val_start = train_end + self.embargo
        val_end = int(n_samples * (self.train_pct + self.val_pct))
        test_start = val_end + self.embargo
        test_end = n_samples

        return {
            'train': (0, train_end),
            'embargo_1': (train_end, val_start),
            'validation': (val_start, val_end),
            'embargo_2': (val_end, test_start),
            'test': (test_start, test_end),
            'train_days': train_end,
            'val_days': val_end - val_start,
            'test_days': test_end - test_start,
            'embargo_total': 2 * self.embargo,
            'effective_data_pct': (
                (train_end + (val_end - val_start) +
                 (test_end - test_start)) / n_samples * 100
            ),
        }

# Demo: NSE data splitting
n_days = 2520  # 10 years of NSE trading days

# Walk-forward CV
wf_cv = PurgedWalkForwardCV(
    n_splits=5, embargo_days=21, test_size_pct=0.20
)

print("=== Purged Walk-Forward Cross-Validation ===")
print(f"Data: {n_days} days ({n_days/252:.0f} years)")
print(f"Embargo: {wf_cv.embargo} days")
print(f"Label horizon: 21 days (monthly returns)")
print()

splits = wf_cv.split(n_days, label_horizon=21)
for i, (train, test) in enumerate(splits):
    print(f"Split {i+1}:")
    print(f"  Train: days {train[0]}-{train[-1]} ({len(train)} days)")
    print(f"  Test:  days {test[0]}-{test[-1]} ({len(test)} days)")
    print(f"  Gap:   {test[0] - train[-1]} days")
    print()

print("Visualization (T=train, X=embargo, V=test):")
print(wf_cv.visualize_splits(n_days, label_horizon=21))

# Three-way split
print("\\n=== Train/Validation/Test Split ===")
splitter = TimeSeriesSplitter(
    train_pct=0.60, val_pct=0.20, embargo_days=21
)
split = splitter.split(n_days)

for key, val in split.items():
    if isinstance(val, tuple):
        print(f"  {key:15s}: days {val[0]}-{val[1]} ({val[1]-val[0]} days)")
    else:
        if isinstance(val, float):
            print(f"  {key:15s}: {val:.1f}%")
        else:
            print(f"  {key:15s}: {val} days")`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Common Leakage Patterns in NSE Research"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Leakage Type"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Example"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Prevention"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Label leakage"}),e.jsx("td",{className:"px-4 py-2",children:"Using future returns in training"}),e.jsx("td",{className:"px-4 py-2",children:"Embargo ≥ label horizon"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Feature leakage"}),e.jsx("td",{className:"px-4 py-2",children:"Normalization using full dataset"}),e.jsx("td",{className:"px-4 py-2",children:"Fit normalizer on train only"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Survivorship bias"}),e.jsx("td",{className:"px-4 py-2",children:"Using current Nifty 50 list historically"}),e.jsx("td",{className:"px-4 py-2",children:"Point-in-time index constituents"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Look-ahead bias"}),e.jsx("td",{className:"px-4 py-2",children:"Corporate action adjustments known ex-post"}),e.jsx("td",{className:"px-4 py-2",children:"Use as-reported data"})]})]})]})}),e.jsx(b,{title:"Designing Splits for a Bank Nifty Options Strategy",difficulty:"intermediate",problem:"You are developing a Bank Nifty weekly options strategy using 5 years of daily data (1,260 days). Options have weekly expiry on Thursday. Design a proper train/val/test split.",solution:[{step:"Determine label horizon",formula:"h = 5 \\text{ days (weekly options expiry cycle)}",explanation:"Weekly options expire every Thursday, so the label horizon is 5 trading days."},{step:"Set embargo length",formula:"d_{\\text{embargo}} = h + L = 5 + 10 = 15 \\text{ days}",explanation:"With a 10-day feature lookback (2 weeks of Greeks/IV data), the embargo should be at least 15 days to prevent any information leakage."},{step:"Calculate splits",formula:"\\text{Train: } 756 \\text{ days} \\;|\\; \\text{Embargo: } 15 \\;|\\; \\text{Val: } 252 \\;|\\; \\text{Embargo: } 15 \\;|\\; \\text{Test: } 222",explanation:"Using 60/20/20 split with embargo gaps. The effective data usage is 1,230/1,260 = 97.6% (30 days lost to embargo)."},{step:"Align to expiry dates",formula:"\\text{Split boundaries must fall on expiry Thursdays}",explanation:"Ensure split boundaries align with weekly expiry dates to avoid partial option cycles spanning the boundary. This is specific to F&O strategies on NSE."}]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Walk-Forward Optimization for NSE"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Walk-forward optimization (WFO) extends the simple train/test split by re-fitting the model periodically as new data becomes available, mimicking live deployment:"}),e.jsx(t.BlockMath,{math:"\\text{WFO}(t) = \\text{fit}(X_{t-W:t-d}) \\to \\text{predict}(X_{t:t+S})"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"W"})," is the training window, ",e.jsx(t.InlineMath,{math:"d"})," is the embargo, and ",e.jsx(t.InlineMath,{math:"S"})," is the step-forward period. For NSE monthly strategies, typical parameters are ",e.jsx(t.InlineMath,{math:"W = 756"})," days (3 years),"," ",e.jsx(t.InlineMath,{math:"d = 21"})," days, and ",e.jsx(t.InlineMath,{math:"S = 63"})," days (quarterly refit)."]}),e.jsx(g,{title:"walk_forward_nse.py",runnable:!0,code:`import numpy as np

class WalkForwardOptimizer:
    """Walk-forward optimization for NSE strategies."""

    def __init__(self, train_window: int = 756,
                 step_size: int = 63, embargo: int = 21):
        self.train_window = train_window
        self.step_size = step_size
        self.embargo = embargo

    def generate_windows(self, n_samples: int):
        """Generate walk-forward windows."""
        windows = []
        start = 0
        while start + self.train_window + self.embargo + self.step_size <= n_samples:
            train_end = start + self.train_window
            test_start = train_end + self.embargo
            test_end = test_start + self.step_size

            windows.append({
                'train': (start, train_end),
                'embargo': (train_end, test_start),
                'test': (test_start, min(test_end, n_samples)),
                'window_id': len(windows),
            })
            start += self.step_size
        return windows

    def run(self, returns: np.ndarray, signal_fn) -> dict:
        """Run walk-forward optimization."""
        T, N = returns.shape
        windows = self.generate_windows(T)
        oos_returns = []
        is_sharpes = []
        oos_sharpes = []

        for w in windows:
            train_data = returns[w['train'][0]:w['train'][1]]
            test_data = returns[w['test'][0]:w['test'][1]]

            # Find best strategy in-sample
            is_sr = np.mean(train_data, axis=0) / (
                np.std(train_data, axis=0) + 1e-10
            ) * np.sqrt(252)
            best = np.argmax(is_sr)
            is_sharpes.append(is_sr[best])

            # Evaluate OOS
            oos_ret = test_data[:, best]
            oos_returns.extend(oos_ret.tolist())
            oos_sr = np.mean(oos_ret) / (np.std(oos_ret) + 1e-10) * np.sqrt(252)
            oos_sharpes.append(oos_sr)

        oos_returns = np.array(oos_returns)
        wfo_sharpe = np.mean(oos_returns) / (
            np.std(oos_returns) + 1e-10
        ) * np.sqrt(252)

        return {
            'n_windows': len(windows),
            'wfo_sharpe': wfo_sharpe,
            'mean_is_sharpe': np.mean(is_sharpes),
            'mean_oos_sharpe': np.mean(oos_sharpes),
            'sharpe_decay': 1 - np.mean(oos_sharpes) / np.mean(is_sharpes),
            'oos_total_return': np.sum(oos_returns) * 100,
            'oos_max_dd': np.min(np.minimum.accumulate(
                np.cumprod(1 + oos_returns)
            ) / np.maximum.accumulate(
                np.cumprod(1 + oos_returns)
            ) - 1) * 100,
        }

# Run WFO on simulated NSE data
np.random.seed(42)
T, N = 2520, 15  # 10 years, 15 strategy variants
returns = np.random.normal(0, 0.015, (T, N))
returns[:, 0] += 0.0003  # Strategy 0 has weak but real signal
returns[:, 1] += 0.0004  # Strategy 1 has stronger signal

wfo = WalkForwardOptimizer(
    train_window=756, step_size=63, embargo=21
)
result = wfo.run(returns, signal_fn=None)

print("=== Walk-Forward Optimization Results ===")
print(f"Training window: {wfo.train_window} days")
print(f"Step size: {wfo.step_size} days")
print(f"Embargo: {wfo.embargo} days")
print(f"Walk-forward windows: {result['n_windows']}")
print(f"\\nMean IS Sharpe:  {result['mean_is_sharpe']:.2f}")
print(f"Mean OOS Sharpe: {result['mean_oos_sharpe']:.2f}")
print(f"WFO Sharpe:      {result['wfo_sharpe']:.2f}")
print(f"Sharpe decay:    {result['sharpe_decay']:.1%}")
print(f"OOS total return: {result['oos_total_return']:.1f}%")
print(f"OOS max drawdown: {result['oos_max_dd']:.1f}%")`}),e.jsx(p,{title:"Key Takeaway",type:"tip",children:e.jsxs("p",{children:["Proper data splitting with embargo is ",e.jsx("strong",{children:"the single most important step"})," ","in preventing overfitting. For NSE strategies: (1) always maintain temporal ordering, (2) use embargo gaps at least as long as the label horizon plus feature lookback, (3) never normalize or fit any parameters using data from the validation or test periods, (4) treat the test set as sacred -- evaluate on it only once, and (5) use walk-forward optimization to simulate realistic strategy deployment with periodic refitting."]})})]})}const J=Object.freeze(Object.defineProperty({__proto__:null,default:A},Symbol.toStringTag,{value:"Module"}));function D(){const[a,c]=d.useState([{name:"Economic Rationale",score:8,weight:20},{name:"Statistical Significance",score:7,weight:15},{name:"Out-of-Sample Performance",score:6,weight:20},{name:"Transaction Cost Analysis",score:9,weight:15},{name:"Capacity Estimation",score:5,weight:10},{name:"Robustness Checks",score:7,weight:10},{name:"Risk Profile",score:8,weight:10}]),s=a.reduce((r,o)=>r+o.score*o.weight,0)/a.reduce((r,o)=>r+o.weight,0),n=s>=7.5?"DEPLOY":s>=5.5?"REVIEW":"REJECT";return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Strategy Due Diligence Scorecard"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Rate each dimension (1-10) to evaluate a strategy for NSE deployment."}),e.jsx("div",{className:"space-y-2 mb-3",children:a.map((r,o)=>e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("span",{className:"text-xs text-gray-600 dark:text-gray-400 w-40",children:[r.name," (",r.weight,"%)"]}),e.jsx("input",{type:"range",min:"1",max:"10",step:"1",value:r.score,onChange:i=>{const m=[...a];m[o]={...m[o],score:parseInt(i.target.value)},c(m)},className:"h-2 flex-1 cursor-pointer accent-indigo-500"}),e.jsx("span",{className:`text-sm font-bold w-8 ${r.score>=7?"text-green-600":r.score>=4?"text-yellow-600":"text-red-600"}`,children:r.score})]},o))}),e.jsxs("div",{className:`rounded-lg p-3 text-center ${n==="DEPLOY"?"bg-green-100 dark:bg-green-900/40":n==="REVIEW"?"bg-yellow-100 dark:bg-yellow-900/40":"bg-red-100 dark:bg-red-900/40"}`,children:[e.jsx("span",{className:"text-xs text-gray-500",children:"Weighted Score: "}),e.jsxs("span",{className:`text-lg font-bold ${n==="DEPLOY"?"text-green-700":n==="REVIEW"?"text-yellow-700":"text-red-700"}`,children:[s.toFixed(1),"/10 -- ",n]})]})]})}function P(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Strategy Due Diligence Checklist"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Before allocating capital to any quantitative strategy on NSE, a rigorous due diligence process must be completed. This structured evaluation covers statistical validity, economic rationale, risk characteristics, and operational readiness. A strategy that fails any critical check should not proceed to paper trading."}),e.jsx(_,{title:"Strategy Due Diligence",label:"Definition 19.7",definition:"Strategy due diligence is a systematic evaluation process that assesses a trading strategy across multiple dimensions: statistical validity, economic rationale, risk profile, capacity, operational feasibility, and regulatory compliance. For Indian markets, this includes specific checks for SEBI compliance, NSE/BSE microstructure compatibility, and Indian tax efficiency.",notation:"A strategy must score above threshold on ALL critical dimensions (not just the average) to proceed."}),e.jsx(D,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"The Seven Pillars of Due Diligence"}),e.jsx(t.BlockMath,{math:"\\text{DD Score} = \\sum_{i=1}^{7} w_i \\cdot s_i \\cdot \\mathbb{1}[s_i \\geq s_{\\min,i}]"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The indicator function ensures that a strategy scoring below the minimum on any dimension receives a zero contribution from that dimension, effectively vetoing deployment."}),e.jsx(j,{title:"Strategy Quality Score",label:"Theorem 19.7",statement:"A strategy's quality can be assessed using the deflated Sharpe ratio: $\\text{DSR} = \\text{SR} - \\sqrt{\\frac{V[\\hat{\\text{SR}}]}{1}} \\cdot \\Phi^{-1}\\left(1 - \\frac{1}{N_{\\text{trials}}}\\right)$ where $V[\\hat{\\text{SR}}] = \\frac{1 + \\frac{1}{2}\\text{SR}^2 - \\gamma_3 \\cdot \\text{SR} + \\frac{\\gamma_4 - 1}{4}\\text{SR}^2}{T-1}$ accounts for non-normality ($\\gamma_3$ = skewness, $\\gamma_4$ = kurtosis) and $N_{\\text{trials}}$ is the total number of strategies tested.",proof:"The deflated Sharpe ratio (Bailey and Lopez de Prado, 2014) adjusts the observed Sharpe for the multiple testing bias. It estimates the probability that the observed Sharpe is a false positive given $N$ trials. DSR > 0 indicates the strategy likely has genuine alpha after accounting for data mining."}),e.jsx(g,{title:"due_diligence_framework.py",runnable:!0,code:`import numpy as np
from dataclasses import dataclass, field
from typing import List, Dict, Tuple
from scipy import stats

@dataclass
class DueDiligenceCheck:
    name: str
    category: str
    score: float  # 0-10
    min_score: float  # Minimum to pass
    weight: float  # Weight in composite
    details: str = ''

    @property
    def passed(self) -> bool:
        return self.score >= self.min_score

class StrategyDueDiligence:
    """Comprehensive due diligence for NSE strategies."""

    def __init__(self, strategy_name: str):
        self.strategy_name = strategy_name
        self.checks: List[DueDiligenceCheck] = []

    def add_check(self, **kwargs):
        self.checks.append(DueDiligenceCheck(**kwargs))

    def evaluate(self) -> dict:
        total_weight = sum(c.weight for c in self.checks)
        weighted_score = sum(
            c.score * c.weight for c in self.checks
        ) / total_weight

        critical_fails = [c for c in self.checks if not c.passed]
        all_pass = len(critical_fails) == 0

        if all_pass and weighted_score >= 7.5:
            verdict = 'DEPLOY'
        elif all_pass and weighted_score >= 5.5:
            verdict = 'CONDITIONAL_DEPLOY'
        else:
            verdict = 'REJECT'

        return {
            'strategy': self.strategy_name,
            'weighted_score': weighted_score,
            'all_critical_pass': all_pass,
            'critical_failures': [c.name for c in critical_fails],
            'verdict': verdict,
            'checks_passed': sum(1 for c in self.checks if c.passed),
            'total_checks': len(self.checks),
        }

    def deflated_sharpe(self, observed_sr: float, n_trials: int,
                        T: int, skew: float = 0,
                        kurt: float = 3) -> float:
        """Calculate Deflated Sharpe Ratio."""
        sr_var = (1 + 0.5 * observed_sr**2 -
                  skew * observed_sr +
                  (kurt - 1) / 4 * observed_sr**2) / (T - 1)
        sr_std = np.sqrt(sr_var)
        threshold = sr_std * stats.norm.ppf(1 - 1/n_trials)
        dsr = observed_sr - threshold
        return dsr

# Run due diligence on a Nifty 50 momentum strategy
dd = StrategyDueDiligence('Nifty50_Momentum_v3')

dd.add_check(
    name='Economic Rationale', category='Fundamental',
    score=8.5, min_score=6.0, weight=20,
    details='FII flow-driven momentum with clear economic mechanism'
)
dd.add_check(
    name='Statistical Significance', category='Statistical',
    score=7.0, min_score=6.0, weight=15,
    details='t-stat=2.8, passes Bonferroni for 15 trials'
)
dd.add_check(
    name='Out-of-Sample Performance', category='Statistical',
    score=6.5, min_score=5.0, weight=20,
    details='OOS Sharpe=1.1, IS Sharpe=1.6, decay=31%'
)
dd.add_check(
    name='Transaction Costs', category='Practical',
    score=8.0, min_score=5.0, weight=15,
    details='10 bps round-trip on NSE, strategy net Sharpe=0.9'
)
dd.add_check(
    name='Capacity', category='Practical',
    score=7.0, min_score=4.0, weight=10,
    details='Estimated capacity INR 50Cr based on Nifty 50 ADV'
)
dd.add_check(
    name='Robustness', category='Statistical',
    score=6.0, min_score=5.0, weight=10,
    details='PBO=0.22, stable across 3 sub-periods'
)
dd.add_check(
    name='Risk Profile', category='Risk',
    score=7.5, min_score=5.0, weight=10,
    details='MaxDD=8.5%, tail ratio=1.2, no catastrophic risk'
)

result = dd.evaluate()
print("=== Strategy Due Diligence Report ===")
print(f"Strategy: {result['strategy']}")
print(f"Weighted Score: {result['weighted_score']:.1f}/10")
print(f"Critical Checks: {result['checks_passed']}/{result['total_checks']} passed")
print(f"Verdict: {result['verdict']}")

if result['critical_failures']:
    print(f"\\nCritical Failures:")
    for f in result['critical_failures']:
        print(f"  - {f}")

print(f"\\n--- Individual Checks ---")
for c in dd.checks:
    status = "PASS" if c.passed else "FAIL"
    print(f"  [{status}] {c.name:25s}: {c.score:.1f}/10 "
          f"(min: {c.min_score}, w: {c.weight}%)")

# Deflated Sharpe Ratio
dsr = dd.deflated_sharpe(
    observed_sr=1.6,  # IS annualized Sharpe
    n_trials=15,       # strategies tested
    T=1260,           # 5 years daily
    skew=-0.3,        # negative skew (typical)
    kurt=4.5          # excess kurtosis (fat tails)
)
print(f"\\n=== Deflated Sharpe Ratio ===")
print(f"Observed Sharpe: 1.60")
print(f"Deflated Sharpe: {dsr:.3f}")
print(f"DSR > 0: {'YES - genuine alpha likely' if dsr > 0 else 'NO - may be data mining'}")`}),e.jsx(b,{title:"Red Flags in Strategy Evaluation",difficulty:"intermediate",problem:"A colleague presents a Bank Nifty options strategy with Sharpe 3.5, max drawdown 2%, and 95% win rate over 3 years. What due diligence questions should you ask?",solution:[{step:"Sharpe ratio sanity check",formula:"\\text{Sharpe} = 3.5 \\gg 2.0 \\text{ (typical upper bound for liquid markets)}",explanation:"Sharpe above 3.0 for a daily strategy on Bank Nifty is extremely unusual. This is a red flag for either overfitting, survivorship bias, or incorrect cost modeling."},{step:"Win rate vs payoff ratio",formula:"95\\% \\text{ win rate} \\Rightarrow \\text{likely selling options (small wins, rare large losses)}",explanation:"A 95% win rate with 2% max drawdown suggests the strategy is selling options and has not yet experienced a tail event (e.g., COVID crash, demonetization shock)."},{step:"Drawdown analysis",formula:"\\text{MaxDD} = 2\\% \\text{ is suspiciously low for 3 years on Bank Nifty}",explanation:"Bank Nifty moved 30%+ during COVID. A 2% max drawdown implies the strategy was not tested through this period or uses look-ahead bias."},{step:"Key questions to ask",formula:"\\text{How many parameter combinations tested? What is the PBO?}",explanation:"Also ask: Does the backtest include the March 2020 crash? How are STT and stamp duty modeled? What is the slippage assumption for Bank Nifty options (which can be illiquid)? What is the capacity in INR terms?"}]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Robustness Testing Framework"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"A robust strategy should produce similar results across variations in parameters, universe definition, and time periods. The robustness score measures sensitivity to perturbations:"}),e.jsx(t.BlockMath,{math:"R = 1 - \\frac{\\text{Var}(\\text{Sharpe} | \\theta \\in \\Theta_\\epsilon)}{\\text{Var}(\\text{Sharpe} | \\theta \\in \\Theta)}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"\\Theta_\\epsilon"})," is the set of parameter values within"," ",e.jsx(t.InlineMath,{math:"\\epsilon"})," of the optimal, and ",e.jsx(t.InlineMath,{math:"\\Theta"})," is the full parameter space. A robustness score close to 1 indicates the strategy is insensitive to small parameter changes."]}),e.jsx(g,{title:"robustness_testing.py",runnable:!0,code:`import numpy as np
from scipy import stats

class RobustnessAnalyzer:
    """Test strategy robustness across perturbations."""

    def __init__(self, base_sharpe: float, base_params: dict):
        self.base_sharpe = base_sharpe
        self.base_params = base_params
        self.perturbation_results = []

    def add_perturbation(self, param_name: str,
                         perturbed_value, sharpe: float):
        self.perturbation_results.append({
            'param': param_name,
            'value': perturbed_value,
            'sharpe': sharpe,
            'decay': 1 - sharpe / self.base_sharpe,
        })

    def analyze(self) -> dict:
        sharpes = [r['sharpe'] for r in self.perturbation_results]
        decays = [r['decay'] for r in self.perturbation_results]

        return {
            'base_sharpe': self.base_sharpe,
            'mean_perturbed_sharpe': np.mean(sharpes),
            'std_perturbed_sharpe': np.std(sharpes),
            'mean_decay': np.mean(decays),
            'max_decay': np.max(decays),
            'pct_positive': np.mean([s > 0 for s in sharpes]) * 100,
            'robustness_score': 1 - np.std(sharpes) / (np.std(sharpes) + abs(np.mean(sharpes))),
            'verdict': (
                'ROBUST' if np.mean(decays) < 0.3 and np.min(sharpes) > 0.3
                else 'FRAGILE' if np.max(decays) > 0.7
                else 'MODERATE'
            ),
        }

# Test robustness of a Nifty 50 momentum strategy
np.random.seed(42)
analyzer = RobustnessAnalyzer(
    base_sharpe=1.5,
    base_params={'lookback': 252, 'holding': 21, 'universe': 'Nifty50'}
)

# Perturb lookback period
for lb in [126, 189, 210, 231, 273, 294, 315]:
    sharpe = 1.5 * np.exp(-0.002 * abs(lb - 252)) + np.random.normal(0, 0.1)
    analyzer.add_perturbation('lookback', lb, max(sharpe, -0.5))

# Perturb holding period
for hp in [5, 10, 15, 42, 63]:
    sharpe = 1.5 * np.exp(-0.01 * abs(hp - 21)) + np.random.normal(0, 0.15)
    analyzer.add_perturbation('holding', hp, max(sharpe, -0.5))

# Perturb universe
for univ in ['Nifty100', 'Nifty200', 'Nifty500', 'NiftyMidcap']:
    sharpe = 1.5 + np.random.normal(0, 0.3)
    analyzer.add_perturbation('universe', univ, max(sharpe, -0.5))

# Perturb sub-periods
for period in ['2015-2017', '2017-2019', '2019-2021', '2021-2023']:
    sharpe = 1.5 + np.random.normal(-0.2, 0.4)
    analyzer.add_perturbation('period', period, max(sharpe, -0.5))

result = analyzer.analyze()
print("=== Robustness Analysis ===")
print(f"Base Sharpe: {result['base_sharpe']:.2f}")
print(f"Mean Perturbed Sharpe: {result['mean_perturbed_sharpe']:.2f}")
print(f"Std Perturbed Sharpe: {result['std_perturbed_sharpe']:.2f}")
print(f"Mean Decay: {result['mean_decay']:.1%}")
print(f"Max Decay: {result['max_decay']:.1%}")
print(f"% Positive Sharpe: {result['pct_positive']:.0f}%")
print(f"Robustness Score: {result['robustness_score']:.2f}")
print(f"Verdict: {result['verdict']}")

print(f"\\n--- Perturbation Details ---")
for r in analyzer.perturbation_results[:10]:
    print(f"  {r['param']:12s} = {str(r['value']):12s} -> "
          f"Sharpe={r['sharpe']:.2f} (decay={r['decay']:.1%})")`}),e.jsxs(p,{title:"Due Diligence for SEBI AIF Registration",type:"warning",children:[e.jsx("p",{children:"If deploying strategies through a SEBI-registered Alternative Investment Fund (AIF), additional due diligence requirements apply:"}),e.jsxs("ul",{className:"mt-2 list-disc list-inside space-y-1",children:[e.jsx("li",{children:"Strategy must be documented in the AIF offering memorandum"}),e.jsx("li",{children:"Risk disclosures must include maximum historical drawdown"}),e.jsx("li",{children:"Performance must be audited by an independent chartered accountant"}),e.jsx("li",{children:"Leverage limits as per SEBI AIF regulations (Category III: up to 2x)"}),e.jsx("li",{children:"Investor suitability assessment required (minimum ticket INR 1 Cr)"}),e.jsx("li",{children:"Quarterly reporting to SEBI with strategy performance attribution"})]})]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Advanced Analysis Framework"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"A comprehensive analysis framework for Indian markets must account for the unique characteristics of NSE microstructure, SEBI regulations, and the interplay between domestic and foreign institutional flows. The following performance attribution model decomposes strategy returns into actionable components:"}),e.jsx(t.BlockMath,{math:"R_{\\\\text{strategy}} = \\\\alpha + \\\\beta_{\\\\text{Nifty}} R_{\\\\text{Nifty}} + \\\\beta_{\\\\text{FII}} F_{\\\\text{FII}} + \\\\sum_k \\\\gamma_k S_k + \\\\epsilon"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"F_{\\\\text{FII}}"})," captures the FII flow factor,"," ",e.jsx(t.InlineMath,{math:"S_k"})," represents sector factors (Banking, IT, FMCG, Energy), and ",e.jsx(t.InlineMath,{math:"\\\\alpha"})," measures the strategy genuine value-add. For Indian markets, the FII flow factor alone explains 15-25% of cross-sectional return variation in Nifty 50 stocks."]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Performance Metric"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Target for NSE"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Measurement Period"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Annualized Alpha"}),e.jsx("td",{className:"px-4 py-2",children:"> 5% above Nifty 50"}),e.jsx("td",{className:"px-4 py-2",children:"Rolling 12-month"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Information Ratio"}),e.jsx("td",{className:"px-4 py-2",children:"> 0.5"}),e.jsx("td",{className:"px-4 py-2",children:"Since inception"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Maximum Drawdown"}),e.jsx("td",{className:"px-4 py-2",children:"< 15% absolute"}),e.jsx("td",{className:"px-4 py-2",children:"Peak-to-trough"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Sortino Ratio"}),e.jsx("td",{className:"px-4 py-2",children:"> 1.5"}),e.jsx("td",{className:"px-4 py-2",children:"Rolling 252-day"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Hit Rate"}),e.jsx("td",{className:"px-4 py-2",children:"> 52% daily"}),e.jsx("td",{className:"px-4 py-2",children:"All trading days"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Tail Ratio"}),e.jsx("td",{className:"px-4 py-2",children:"> 1.0"}),e.jsx("td",{className:"px-4 py-2",children:"95th/5th percentile"})]})]})]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Risk Management for NSE Deployment"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Deploying any quantitative strategy on NSE requires integration with a risk management framework that accounts for Indian market specifics. The Expected Shortfall at the 95% confidence level provides a more complete picture of tail risk than VaR alone:"}),e.jsx(t.BlockMath,{math:"\\\\text{ES}_{0.95} = -\\\\mathbb{E}[R_p | R_p < \\\\text{VaR}_{0.95}]"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For strategies trading Nifty 50 stocks, the typical daily ES at 95% is 2-4% of portfolio value. During extreme events (demonetization, COVID crash), ES can spike to 8-12%. Circuit breakers on NSE provide some natural protection but can also trap positions."}),e.jsx(p,{title:"Regulatory and Infrastructure Notes",type:"historical",children:e.jsxs("ul",{className:"space-y-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"SEBI Compliance:"})," All algo strategies must be registered with the exchange and comply with SEBI circular on automated trading. Maintain audit trails for minimum 5 years."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Transaction Costs:"})," Factor in STT (0.1% delivery, 0.025% intraday), GST (18% on brokerage), stamp duty (0.015% buy side), and exchange transaction charges. Zerodha offers zero delivery brokerage with INR 20/order for intraday."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Data Sources:"})," Use Zerodha Kite Connect for real-time NSE data, NSE archives for historical data, and Bloomberg/Refinitiv for comprehensive fundamental data on Indian companies."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Deployment:"})," AWS Mumbai (ap-south-1) provides 5-15ms latency to NSE. Use Docker containers with TimescaleDB for tick data storage and Grafana for real-time monitoring dashboards."]})]})}),e.jsx(p,{title:"Key Takeaway",type:"tip",children:e.jsxs("p",{children:["Strategy due diligence is a ",e.jsx("strong",{children:"structured skepticism process"}),". The default assumption should be that every backtest is overfit until proven otherwise. Use the seven-pillar framework (economic rationale, statistical significance, OOS performance, transaction costs, capacity, robustness, risk profile) and require passing scores on ALL critical dimensions. The deflated Sharpe ratio is your best single metric for detecting data-mined strategies. Test robustness across parameter perturbations, sub-periods, and universe definitions before deploying on NSE."]})})]})}const ee=Object.freeze(Object.defineProperty({__proto__:null,default:P},Symbol.toStringTag,{value:"Module"}));function B(){const[a,c]=d.useState(1.2),[s,n]=d.useState(.8),[r,o]=d.useState(.3),[i,m]=d.useState(.2),l=(1-i)**2+i**2+2*i*(1-i)*r,h=((1-i)*a+i*s)/Math.sqrt(l),x=h-a,f=x>0;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Marginal Sharpe Contribution"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Evaluate whether adding a new strategy improves your portfolio Sharpe ratio."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Existing Sharpe: ",a.toFixed(2)]}),e.jsx("input",{type:"range",min:"0",max:"3",step:"0.05",value:a,onChange:u=>c(parseFloat(u.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["New Strategy Sharpe: ",s.toFixed(2)]}),e.jsx("input",{type:"range",min:"0",max:"3",step:"0.05",value:s,onChange:u=>n(parseFloat(u.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Correlation: ",r.toFixed(2)]}),e.jsx("input",{type:"range",min:"-1",max:"1",step:"0.05",value:r,onChange:u=>o(parseFloat(u.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["New Weight: ",(i*100).toFixed(0),"%"]}),e.jsx("input",{type:"range",min:"0",max:"0.5",step:"0.05",value:i,onChange:u=>m(parseFloat(u.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-3 text-center",children:[e.jsxs("div",{className:"rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30",children:[e.jsx("div",{className:"text-[10px] text-gray-500",children:"Combined Sharpe"}),e.jsx("div",{className:"text-lg font-bold text-blue-600",children:h.toFixed(3)})]}),e.jsxs("div",{className:`rounded-lg p-3 ${f?"bg-green-50 dark:bg-green-900/30":"bg-red-50 dark:bg-red-900/30"}`,children:[e.jsx("div",{className:"text-[10px] text-gray-500",children:"Marginal Contribution"}),e.jsxs("div",{className:`text-lg font-bold ${f?"text-green-600":"text-red-600"}`,children:[x>=0?"+":"",x.toFixed(3)]})]}),e.jsxs("div",{className:`rounded-lg p-3 ${f?"bg-green-50 dark:bg-green-900/30":"bg-red-50 dark:bg-red-900/30"}`,children:[e.jsx("div",{className:"text-[10px] text-gray-500",children:"Add Strategy?"}),e.jsx("div",{className:`text-lg font-bold ${f?"text-green-600":"text-red-600"}`,children:f?"YES":"NO"})]})]})]})}function O(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Marginal Sharpe Contribution"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["When evaluating a new strategy for your NSE portfolio, the standalone Sharpe ratio is insufficient. What matters is the ",e.jsx("em",{children:"marginal contribution"})," to the overall portfolio Sharpe. A strategy with modest standalone Sharpe but low correlation to existing strategies can be more valuable than a high-Sharpe strategy that is highly correlated."]}),e.jsx(_,{title:"Marginal Sharpe Contribution",label:"Definition 19.8",definition:"The marginal Sharpe contribution of a new strategy to an existing portfolio measures the increase in portfolio Sharpe ratio from adding the strategy at an optimal weight. For a portfolio with Sharpe S_p and a new strategy with Sharpe S_n and correlation rho to the portfolio: the new portfolio Sharpe is S_combined = sqrt(S_p^2 + S_n^2 - 2*rho*S_p*S_n) when rho < S_n/S_p.",notation:"A strategy adds value if and only if its Sharpe ratio exceeds S_p * rho, where rho is its correlation with the existing portfolio."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"The Portfolio Sharpe Framework"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["For a portfolio of ",e.jsx(t.InlineMath,{math:"K"})," strategies with Sharpe ratios"," ",e.jsx(t.InlineMath,{math:"S_1, \\ldots, S_K"})," and correlation matrix"," ",e.jsx(t.InlineMath,{math:"\\Sigma"}),", the maximum portfolio Sharpe is:"]}),e.jsx(t.BlockMath,{math:"S_p^* = \\sqrt{\\mathbf{S}^\\top \\Sigma^{-1} \\mathbf{S}}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["Adding strategy ",e.jsx(t.InlineMath,{math:"K+1"})," improves the portfolio if and only if:"]}),e.jsx(t.BlockMath,{math:"S_{K+1} > \\rho_{K+1, p} \\cdot S_p^*"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"\\rho_{K+1, p}"})," is the correlation between the new strategy and the existing optimal portfolio."]}),e.jsx(B,{}),e.jsx(j,{title:"Optimal Portfolio Sharpe with N Strategies",label:"Theorem 19.8",statement:"For $N$ strategies with equal Sharpe ratios $S$ and pairwise correlation $\\rho$, the maximum portfolio Sharpe is: $S_p^* = S \\cdot \\sqrt{\\frac{N}{1 + (N-1)\\rho}}$. For uncorrelated strategies ($\\rho = 0$): $S_p^* = S\\sqrt{N}$. For perfectly correlated strategies ($\\rho = 1$): $S_p^* = S$. This shows that diversification across uncorrelated strategies grows Sharpe as $\\sqrt{N}$.",proof:"With equal Sharpe $S$ and equal pairwise correlation $\\rho$, the covariance matrix has diagonal $1$ and off-diagonal $\\rho$. Its inverse has diagonal $\\frac{1+(N-2)\\rho}{(1-\\rho)(1+(N-1)\\rho)}$ and off-diagonal $\\frac{-\\rho}{(1-\\rho)(1+(N-1)\\rho)}$. Computing $\\mathbf{S}^\\top \\Sigma^{-1} \\mathbf{S}$ with $\\mathbf{S} = S \\cdot \\mathbf{1}$ gives the result after simplification."}),e.jsx(g,{title:"marginal_sharpe_analysis.py",runnable:!0,code:`import numpy as np

class PortfolioSharpeAnalyzer:
    """Analyze marginal Sharpe contribution of NSE strategies."""

    def __init__(self):
        self.strategies = []
        self.returns = None

    def add_strategy(self, name: str, returns: np.ndarray):
        self.strategies.append(name)
        if self.returns is None:
            self.returns = returns.reshape(-1, 1)
        else:
            self.returns = np.column_stack([self.returns, returns])

    def portfolio_sharpe(self, weights: np.ndarray = None) -> float:
        if weights is None:
            weights = np.ones(len(self.strategies)) / len(self.strategies)
        port_ret = self.returns @ weights
        return np.mean(port_ret) / np.std(port_ret) * np.sqrt(252)

    def optimal_sharpe(self) -> dict:
        """Calculate maximum Sharpe portfolio."""
        mu = np.mean(self.returns, axis=0) * 252
        cov = np.cov(self.returns.T) * 252
        inv_cov = np.linalg.inv(cov + np.eye(len(self.strategies)) * 1e-8)
        w_opt = inv_cov @ mu
        w_opt = w_opt / np.sum(np.abs(w_opt))  # Normalize
        sharpe = np.sqrt(mu @ inv_cov @ mu)
        return {'weights': w_opt, 'sharpe': sharpe}

    def marginal_contribution(self, new_returns: np.ndarray,
                              new_name: str) -> dict:
        """Calculate marginal Sharpe contribution."""
        existing_opt = self.optimal_sharpe()
        existing_sharpe = existing_opt['sharpe']

        # Add new strategy temporarily
        self.add_strategy(new_name, new_returns)
        new_opt = self.optimal_sharpe()
        new_sharpe = new_opt['sharpe']

        # Remove the temporarily added strategy
        self.strategies.pop()
        self.returns = self.returns[:, :-1]

        # Correlation with existing portfolio
        opt_weights = existing_opt['weights']
        port_returns = self.returns @ opt_weights
        corr = np.corrcoef(port_returns, new_returns)[0, 1]

        return {
            'new_strategy': new_name,
            'standalone_sharpe': np.mean(new_returns) / np.std(new_returns) * np.sqrt(252),
            'correlation_with_portfolio': corr,
            'existing_portfolio_sharpe': existing_sharpe,
            'combined_sharpe': new_sharpe,
            'marginal_contribution': new_sharpe - existing_sharpe,
            'min_sharpe_needed': existing_sharpe * corr,
            'add_value': new_sharpe > existing_sharpe,
        }

    def correlation_matrix(self) -> np.ndarray:
        return np.corrcoef(self.returns.T)

# Simulate NSE strategy portfolio
np.random.seed(42)
T = 1260  # 5 years

analyzer = PortfolioSharpeAnalyzer()

# Existing strategies
nifty_momentum = np.random.normal(0.0004, 0.012, T)
value_factor = np.random.normal(0.0003, 0.014, T) + 0.2 * nifty_momentum
fii_flow = np.random.normal(0.0005, 0.015, T)
low_vol = np.random.normal(0.0002, 0.008, T) + 0.1 * nifty_momentum

analyzer.add_strategy('Nifty_Momentum', nifty_momentum)
analyzer.add_strategy('Value_Factor', value_factor)
analyzer.add_strategy('FII_Flow', fii_flow)
analyzer.add_strategy('Low_Volatility', low_vol)

print("=== Existing Portfolio Analysis ===")
opt = analyzer.optimal_sharpe()
print(f"Optimal Sharpe: {opt['sharpe']:.2f}")
print(f"Weights: {dict(zip(analyzer.strategies, [f'{w:.2f}' for w in opt['weights']]))}")

# Correlation matrix
corr = analyzer.correlation_matrix()
print(f"\\n--- Correlation Matrix ---")
for i, name in enumerate(analyzer.strategies):
    row = ' '.join([f'{corr[i,j]:6.3f}' for j in range(len(analyzer.strategies))])
    print(f"  {name:18s}: {row}")

# Evaluate candidate strategies
candidates = [
    ('Earnings_PEAD', np.random.normal(0.0003, 0.013, T) + 0.15 * nifty_momentum),
    ('BankNifty_Options', np.random.normal(0.0006, 0.020, T)),
    ('Sector_Rotation', np.random.normal(0.0002, 0.011, T) + 0.5 * nifty_momentum),
    ('Stat_Arb_NSE_BSE', np.random.normal(0.0004, 0.010, T) - 0.1 * nifty_momentum),
]

print(f"\\n=== Marginal Sharpe Analysis ===")
for name, returns in candidates:
    result = analyzer.marginal_contribution(returns, name)
    print(f"\\n{name}:")
    print(f"  Standalone Sharpe: {result['standalone_sharpe']:.2f}")
    print(f"  Corr with portfolio: {result['correlation_with_portfolio']:.3f}")
    print(f"  Min Sharpe needed: {result['min_sharpe_needed']:.2f}")
    print(f"  Combined Sharpe: {result['combined_sharpe']:.2f}")
    print(f"  Marginal contribution: {result['marginal_contribution']:+.3f}")
    print(f"  ADD VALUE: {'YES' if result['add_value'] else 'NO'}")`}),e.jsx(b,{title:"Diversification Benefit in Indian Multi-Strategy Portfolio",difficulty:"advanced",problem:"Your portfolio has 3 NSE strategies with Sharpe ratios 1.2, 0.9, and 1.0, and pairwise correlations 0.3, 0.2, and 0.15. A new strategy has Sharpe 0.7 and correlation 0.05 with each existing strategy. Should you add it?",solution:[{step:"Calculate existing portfolio Sharpe",formula:"S_p \\approx \\sqrt{1.2^2 + 0.9^2 + 1.0^2 - 2(\\text{corr terms})} \\approx 1.65",explanation:"Using the optimal portfolio formula with the 3x3 correlation matrix, the existing portfolio Sharpe is approximately 1.65."},{step:"Check the addition threshold",formula:"S_{\\text{new}} > \\rho \\cdot S_p \\Rightarrow 0.7 > 0.05 \\times 1.65 = 0.083",explanation:"The new strategy Sharpe of 0.7 far exceeds the threshold of 0.083 (correlation x portfolio Sharpe). It adds value."},{step:"Estimate new portfolio Sharpe",formula:"S_{p,\\text{new}} \\approx \\sqrt{1.65^2 + 0.7^2 - 2 \\times 0.05 \\times 1.65 \\times 0.7} \\approx 1.78",explanation:"Adding the low-correlation strategy increases portfolio Sharpe from 1.65 to approximately 1.78, an improvement of 0.13 Sharpe units."},{step:"Decision",formula:"\\text{ADD the strategy: +0.13 Sharpe is highly valuable}",explanation:"Despite its modest standalone Sharpe of 0.7, the near-zero correlation makes this strategy extremely valuable for diversification. In Indian markets, stat-arb strategies (NSE-BSE pairs) often provide this type of low-correlation alpha."}]}),e.jsx(p,{title:"Correlation Estimation Pitfalls",type:"warning",children:e.jsxs("ul",{className:"space-y-1 list-disc list-inside",children:[e.jsxs("li",{children:["Correlations between NSE strategies are ",e.jsx("strong",{children:"regime-dependent"})," -- they increase during market stress (correlation breakdown)"]}),e.jsx("li",{children:"Use at least 2 years of overlapping daily data for reliable correlation estimates"}),e.jsx("li",{children:"Test with rolling 60-day correlations, not just point estimates"}),e.jsx("li",{children:"Account for delayed correlation (lead-lag effects between strategies)"}),e.jsx("li",{children:"Correlation between momentum and value on NSE varies from -0.2 to +0.5 across regimes"}),e.jsx("li",{children:"F&O expiry weeks often show temporary correlation spikes across all strategies"})]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Advanced Analysis Framework"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"A comprehensive analysis framework for Indian markets must account for the unique characteristics of NSE microstructure, SEBI regulations, and the interplay between domestic and foreign institutional flows. The following performance attribution model decomposes strategy returns into actionable components:"}),e.jsx(t.BlockMath,{math:"R_{\\\\text{strategy}} = \\\\alpha + \\\\beta_{\\\\text{Nifty}} R_{\\\\text{Nifty}} + \\\\beta_{\\\\text{FII}} F_{\\\\text{FII}} + \\\\sum_k \\\\gamma_k S_k + \\\\epsilon"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"F_{\\\\text{FII}}"})," captures the FII flow factor,"," ",e.jsx(t.InlineMath,{math:"S_k"})," represents sector factors (Banking, IT, FMCG, Energy), and ",e.jsx(t.InlineMath,{math:"\\\\alpha"})," measures the strategy genuine value-add. For Indian markets, the FII flow factor alone explains 15-25% of cross-sectional return variation in Nifty 50 stocks."]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Performance Metric"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Target for NSE"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Measurement Period"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Annualized Alpha"}),e.jsx("td",{className:"px-4 py-2",children:"> 5% above Nifty 50"}),e.jsx("td",{className:"px-4 py-2",children:"Rolling 12-month"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Information Ratio"}),e.jsx("td",{className:"px-4 py-2",children:"> 0.5"}),e.jsx("td",{className:"px-4 py-2",children:"Since inception"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Maximum Drawdown"}),e.jsx("td",{className:"px-4 py-2",children:"< 15% absolute"}),e.jsx("td",{className:"px-4 py-2",children:"Peak-to-trough"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Sortino Ratio"}),e.jsx("td",{className:"px-4 py-2",children:"> 1.5"}),e.jsx("td",{className:"px-4 py-2",children:"Rolling 252-day"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Hit Rate"}),e.jsx("td",{className:"px-4 py-2",children:"> 52% daily"}),e.jsx("td",{className:"px-4 py-2",children:"All trading days"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Tail Ratio"}),e.jsx("td",{className:"px-4 py-2",children:"> 1.0"}),e.jsx("td",{className:"px-4 py-2",children:"95th/5th percentile"})]})]})]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Risk Management for NSE Deployment"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Deploying any quantitative strategy on NSE requires integration with a risk management framework that accounts for Indian market specifics. The Expected Shortfall at the 95% confidence level provides a more complete picture of tail risk than VaR alone:"}),e.jsx(t.BlockMath,{math:"\\\\text{ES}_{0.95} = -\\\\mathbb{E}[R_p | R_p < \\\\text{VaR}_{0.95}]"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For strategies trading Nifty 50 stocks, the typical daily ES at 95% is 2-4% of portfolio value. During extreme events (demonetization, COVID crash), ES can spike to 8-12%. Circuit breakers on NSE provide some natural protection but can also trap positions."}),e.jsx(p,{title:"Regulatory and Infrastructure Notes",type:"historical",children:e.jsxs("ul",{className:"space-y-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"SEBI Compliance:"})," All algo strategies must be registered with the exchange and comply with SEBI circular on automated trading. Maintain audit trails for minimum 5 years."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Transaction Costs:"})," Factor in STT (0.1% delivery, 0.025% intraday), GST (18% on brokerage), stamp duty (0.015% buy side), and exchange transaction charges. Zerodha offers zero delivery brokerage with INR 20/order for intraday."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Data Sources:"})," Use Zerodha Kite Connect for real-time NSE data, NSE archives for historical data, and Bloomberg/Refinitiv for comprehensive fundamental data on Indian companies."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Deployment:"})," AWS Mumbai (ap-south-1) provides 5-15ms latency to NSE. Use Docker containers with TimescaleDB for tick data storage and Grafana for real-time monitoring dashboards."]})]})}),e.jsx(p,{title:"Key Takeaway",type:"tip",children:e.jsxs("p",{children:["A new strategy's value is determined by its ",e.jsx("strong",{children:"marginal Sharpe contribution"}),", not its standalone Sharpe. The marginal contribution depends on both the strategy's Sharpe and its correlation with existing strategies. For NSE portfolios, actively seek strategies with low correlation to your existing book -- even a modest Sharpe 0.5 strategy can be extremely valuable if its correlation with your portfolio is near zero."]})})]})}const te=Object.freeze(Object.defineProperty({__proto__:null,default:O},Symbol.toStringTag,{value:"Module"}));function $(){const[a,c]=d.useState(500),[s,n]=d.useState(5),[r,o]=d.useState(12),[i,m]=d.useState(.5),l=a*s/(r||1),y=l*(1/(i||.1));return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Strategy Capacity Calculator"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Estimate the maximum AUM for your NSE strategy based on trading volume and impact."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["ADV (Cr INR): ",a.toFixed(0)]}),e.jsx("input",{type:"range",min:"50",max:"5000",step:"50",value:a,onChange:h=>c(parseFloat(h.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Participation (%): ",s.toFixed(0)]}),e.jsx("input",{type:"range",min:"1",max:"20",step:"1",value:s,onChange:h=>n(parseFloat(h.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Annual Turnover: ",r.toFixed(0)]}),e.jsx("input",{type:"range",min:"1",max:"50",step:"1",value:r,onChange:h=>o(parseFloat(h.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Impact Coeff: ",i.toFixed(1)]}),e.jsx("input",{type:"range",min:"0.1",max:"2",step:"0.1",value:i,onChange:h=>m(parseFloat(h.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-3 text-center",children:[e.jsxs("div",{className:"rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30",children:[e.jsx("div",{className:"text-[10px] text-gray-500",children:"Estimated Capacity"}),e.jsxs("div",{className:"text-lg font-bold text-blue-600",children:["INR ",y.toFixed(0)," Cr"]})]}),e.jsxs("div",{className:"rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30",children:[e.jsx("div",{className:"text-[10px] text-gray-500",children:"Daily Trade Size"}),e.jsxs("div",{className:"text-lg font-bold text-purple-600",children:["INR ",(l/252).toFixed(1)," Cr"]})]}),e.jsxs("div",{className:`rounded-lg p-3 ${y>50?"bg-green-50 dark:bg-green-900/30":"bg-red-50 dark:bg-red-900/30"}`,children:[e.jsx("div",{className:"text-[10px] text-gray-500",children:"Viable?"}),e.jsx("div",{className:`text-lg font-bold ${y>50?"text-green-600":"text-red-600"}`,children:y>50?"YES":"LIMITED"})]})]})]})}function q(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Capacity Estimation for Indian Strategies"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Understanding strategy capacity is critical for any quantitative trader in Indian markets. The capacity of a strategy determines the maximum capital that can be deployed without significantly eroding risk-adjusted returns through market impact. This is especially important for strategies trading mid-cap and small-cap NSE stocks, where liquidity is limited."}),e.jsx(_,{title:"Strategy Capacity",label:"Definition 19.9",definition:"Strategy capacity is the maximum assets under management (AUM) at which a strategy can operate without significantly degrading its risk-adjusted returns. Capacity is determined by market liquidity, price impact, and the speed of alpha decay. For NSE Nifty 50 strategies, capacity is typically INR 50-500 Cr; for mid-cap strategies, INR 5-50 Cr.",notation:"Capacity constraint: C_max = ADV * participation_rate / turnover, where ADV is average daily volume in INR."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Market Impact and Capacity"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The fundamental relationship between trading size and market impact follows the square-root law, which has been validated empirically on NSE:"}),e.jsx(t.BlockMath,{math:"C_{\\max} = \\frac{\\text{ADV} \\times \\pi_{\\max}}{\\tau} \\times \\frac{1}{\\eta}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The market impact per trade follows:"}),e.jsx(t.BlockMath,{math:"\\text{Impact}(Q) = \\eta \\cdot \\sigma \\cdot \\sqrt{\\frac{Q}{\\text{ADV}}}"}),e.jsx($,{}),e.jsx(j,{title:"Capacity-Adjusted Sharpe",label:"Theorem 19.9",statement:"The capacity-adjusted Sharpe ratio at AUM level $A$ is: $S(A) = S_0 - \\frac{\\eta \\cdot \\tau \\cdot A}{\\sigma \\cdot \\text{ADV}^{1/2}}$ where $S_0$ is the zero-capacity Sharpe, $\\eta$ is the impact coefficient, $\\tau$ is annual turnover, and $\\sigma$ is the strategy volatility. The capacity $C_{\\max}$ is the AUM where $S(A) = 0$.",proof:"This follows from the square-root market impact law applied to the strategy P&L. Each trade of size Q generates impact $\\eta\\sigma\\sqrt{Q/\\text{ADV}}$, which compounds over $\\tau$ turnovers per year. The linear relationship between AUM and impact cost (in Sharpe units) gives the capacity-adjusted formula."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Liquidity Landscape of Indian Markets"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Segment"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Avg Daily Volume"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Typical Spread"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Strategy Capacity"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Nifty 50 Cash"}),e.jsx("td",{className:"px-4 py-2",children:"INR 500-2000 Cr"}),e.jsx("td",{className:"px-4 py-2",children:"1-3 bps"}),e.jsx("td",{className:"px-4 py-2",children:"INR 100-500 Cr"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Nifty Next 50"}),e.jsx("td",{className:"px-4 py-2",children:"INR 100-500 Cr"}),e.jsx("td",{className:"px-4 py-2",children:"3-8 bps"}),e.jsx("td",{className:"px-4 py-2",children:"INR 30-100 Cr"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Midcap 150"}),e.jsx("td",{className:"px-4 py-2",children:"INR 20-100 Cr"}),e.jsx("td",{className:"px-4 py-2",children:"5-15 bps"}),e.jsx("td",{className:"px-4 py-2",children:"INR 5-30 Cr"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Smallcap 250"}),e.jsx("td",{className:"px-4 py-2",children:"INR 2-20 Cr"}),e.jsx("td",{className:"px-4 py-2",children:"15-50 bps"}),e.jsx("td",{className:"px-4 py-2",children:"INR 1-5 Cr"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Bank Nifty F&O"}),e.jsx("td",{className:"px-4 py-2",children:"INR 50,000+ Cr notional"}),e.jsx("td",{className:"px-4 py-2",children:"1-5 bps"}),e.jsx("td",{className:"px-4 py-2",children:"INR 200-1000 Cr"})]})]})]})}),e.jsx(g,{title:"capacity_estimation.py",runnable:!0,code:`import numpy as np

class CapacityEstimator:
    """Estimate strategy capacity for Indian markets."""

    def __init__(self, adv_inr_cr: float, sigma: float = 0.02,
                 impact_coeff: float = 0.5):
        self.adv = adv_inr_cr * 1e7  # Convert Cr to INR
        self.sigma = sigma
        self.eta = impact_coeff

    def market_impact(self, trade_size_inr: float) -> float:
        """Square-root market impact in bps."""
        participation = trade_size_inr / self.adv
        impact = self.eta * self.sigma * np.sqrt(participation)
        return impact * 10000  # Convert to bps

    def capacity_adjusted_sharpe(self, base_sharpe: float,
                                  aum_cr: float, turnover: float) -> float:
        """Sharpe ratio adjusted for market impact at given AUM."""
        trade_size = aum_cr * 1e7 * turnover / 252
        daily_impact = self.market_impact(trade_size) / 10000
        impact_drag = daily_impact * turnover * np.sqrt(252)
        adjusted = base_sharpe - impact_drag / self.sigma
        return max(adjusted, -2)

    def max_capacity(self, base_sharpe: float,
                     turnover: float) -> float:
        """Find maximum AUM in Cr where Sharpe remains positive."""
        for aum in np.arange(1, 5000, 1):
            if self.capacity_adjusted_sharpe(base_sharpe, aum, turnover) <= 0:
                return aum - 1
        return 5000

# NSE capacity analysis
nifty50_estimator = CapacityEstimator(adv_inr_cr=500, sigma=0.015)
midcap_estimator = CapacityEstimator(adv_inr_cr=50, sigma=0.025)

print("=== Capacity Analysis for NSE Strategies ===")
for name, est, sharpe, turn in [
    ('Nifty 50 Momentum', nifty50_estimator, 1.5, 12),
    ('Nifty 50 Mean-Rev', nifty50_estimator, 1.2, 24),
    ('Midcap Momentum', midcap_estimator, 1.8, 12),
    ('Midcap StatArb', midcap_estimator, 1.0, 50),
]:
    cap = est.max_capacity(sharpe, turn)
    print(f"
{name}:")
    print(f"  Base Sharpe: {sharpe}")
    print(f"  Turnover: {turn}x/year")
    print(f"  Max Capacity: INR {cap} Cr")
    for aum in [10, 50, 100, 200]:
        adj = est.capacity_adjusted_sharpe(sharpe, aum, turn)
        print(f"    AUM={aum:>4d}Cr: Adj Sharpe={adj:.2f}")`}),e.jsx(b,{title:"Capacity of a Bank Nifty Options Strategy",difficulty:"advanced",problem:"Your Bank Nifty weekly options strategy trades 50 lots per week. Bank Nifty options have ADV of 5 lakh contracts. What is the capacity?",solution:[{step:"Calculate participation rate",formula:"pi = \frac{50}{500000} = 0.01%",explanation:"Trading 50 lots out of 5 lakh daily volume gives extremely low participation, suggesting high capacity."},{step:"Estimate impact cost",formula:"	ext{Impact} = 0.5 	imes 0.02 	imes sqrt{0.0001} = 0.1 	ext{ bps}",explanation:"At this participation level, market impact is negligible."},{step:"Scale to maximum capacity",formula:"C_{max} approx \frac{500000 	imes 0.05}{52} approx 480 	ext{ lots/week}",explanation:"At 5% participation rate, capacity is about 480 lots per week, or approximately INR 15 Cr notional per week."},{step:"Conclusion",formula:"	ext{Capacity} approx 	ext{INR 15 Cr per week or INR 780 Cr annually}",explanation:"Bank Nifty options have high capacity due to deep liquidity. However, capacity drops sharply for far OTM strikes and on expiry day."}]}),e.jsx(p,{title:"Indian Market Liquidity Considerations",type:"warning",children:e.jsxs("ul",{className:"space-y-1 list-disc list-inside",children:[e.jsx("li",{children:"Nifty 50 stocks: ADV ranges from INR 200-2000 Cr, supporting strategy capacity of INR 50-500 Cr"}),e.jsx("li",{children:"Mid-cap stocks: ADV of INR 10-100 Cr limits capacity to INR 5-50 Cr"}),e.jsx("li",{children:"F&O segment: Bank Nifty options have highest liquidity, Nifty options second"}),e.jsx("li",{children:"Capacity estimates should use 10th percentile ADV (worst case), not mean"}),e.jsx("li",{children:"SEBI impact cost studies show Indian large-caps have impact of 5-15 bps for INR 10L orders"})]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Advanced Analysis Framework"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"A comprehensive analysis framework for Indian markets must account for the unique characteristics of NSE microstructure, SEBI regulations, and the interplay between domestic and foreign institutional flows. The following performance attribution model decomposes strategy returns into actionable components:"}),e.jsx(t.BlockMath,{math:"R_{\\\\text{strategy}} = \\\\alpha + \\\\beta_{\\\\text{Nifty}} R_{\\\\text{Nifty}} + \\\\beta_{\\\\text{FII}} F_{\\\\text{FII}} + \\\\sum_k \\\\gamma_k S_k + \\\\epsilon"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"F_{\\\\text{FII}}"})," captures the FII flow factor,"," ",e.jsx(t.InlineMath,{math:"S_k"})," represents sector factors (Banking, IT, FMCG, Energy), and ",e.jsx(t.InlineMath,{math:"\\\\alpha"})," measures the strategy genuine value-add. For Indian markets, the FII flow factor alone explains 15-25% of cross-sectional return variation in Nifty 50 stocks."]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Performance Metric"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Target for NSE"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Measurement Period"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Annualized Alpha"}),e.jsx("td",{className:"px-4 py-2",children:"> 5% above Nifty 50"}),e.jsx("td",{className:"px-4 py-2",children:"Rolling 12-month"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Information Ratio"}),e.jsx("td",{className:"px-4 py-2",children:"> 0.5"}),e.jsx("td",{className:"px-4 py-2",children:"Since inception"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Maximum Drawdown"}),e.jsx("td",{className:"px-4 py-2",children:"< 15% absolute"}),e.jsx("td",{className:"px-4 py-2",children:"Peak-to-trough"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Sortino Ratio"}),e.jsx("td",{className:"px-4 py-2",children:"> 1.5"}),e.jsx("td",{className:"px-4 py-2",children:"Rolling 252-day"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Hit Rate"}),e.jsx("td",{className:"px-4 py-2",children:"> 52% daily"}),e.jsx("td",{className:"px-4 py-2",children:"All trading days"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Tail Ratio"}),e.jsx("td",{className:"px-4 py-2",children:"> 1.0"}),e.jsx("td",{className:"px-4 py-2",children:"95th/5th percentile"})]})]})]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Risk Management for NSE Deployment"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Deploying any quantitative strategy on NSE requires integration with a risk management framework that accounts for Indian market specifics. The Expected Shortfall at the 95% confidence level provides a more complete picture of tail risk than VaR alone:"}),e.jsx(t.BlockMath,{math:"\\\\text{ES}_{0.95} = -\\\\mathbb{E}[R_p | R_p < \\\\text{VaR}_{0.95}]"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For strategies trading Nifty 50 stocks, the typical daily ES at 95% is 2-4% of portfolio value. During extreme events (demonetization, COVID crash), ES can spike to 8-12%. Circuit breakers on NSE provide some natural protection but can also trap positions."}),e.jsx(p,{title:"Regulatory and Infrastructure Notes",type:"historical",children:e.jsxs("ul",{className:"space-y-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"SEBI Compliance:"})," All algo strategies must be registered with the exchange and comply with SEBI circular on automated trading. Maintain audit trails for minimum 5 years."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Transaction Costs:"})," Factor in STT (0.1% delivery, 0.025% intraday), GST (18% on brokerage), stamp duty (0.015% buy side), and exchange transaction charges. Zerodha offers zero delivery brokerage with INR 20/order for intraday."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Data Sources:"})," Use Zerodha Kite Connect for real-time NSE data, NSE archives for historical data, and Bloomberg/Refinitiv for comprehensive fundamental data on Indian companies."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Deployment:"})," AWS Mumbai (ap-south-1) provides 5-15ms latency to NSE. Use Docker containers with TimescaleDB for tick data storage and Grafana for real-time monitoring dashboards."]})]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Alpha Decay and Strategy Crowding"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Beyond capacity constraints, strategies also face alpha decay over time as more participants discover and trade the same signals. The decay rate depends on the signal type and market segment:"}),e.jsx(t.BlockMath,{math:"\\alpha(t) = \\alpha_0 \\cdot \\exp(-\\lambda_{\\text{crowd}} \\cdot t)"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["For well-known momentum strategies on NSE, ",e.jsx(t.InlineMath,{math:"\\lambda_{\\text{crowd}} \\approx 0.05"})," ","per year, giving a half-life of approximately 14 years. For less-known signals (e.g., FII flow patterns, SEBI filing analysis), the decay is slower at"," ",e.jsx(t.InlineMath,{math:"\\lambda \\approx 0.02"})," per year."]}),e.jsx(p,{title:"Key Takeaway",type:"tip",children:e.jsxs("p",{children:["Capacity is the ",e.jsx("strong",{children:"overlooked dimension"})," of strategy evaluation. A Sharpe 2.0 strategy with INR 5 Cr capacity generates less total alpha than a Sharpe 1.0 strategy with INR 100 Cr capacity. Always estimate capacity before deploying capital, using conservative ADV estimates and the square-root impact law calibrated to NSE data. Additionally, monitor for alpha decay due to strategy crowding and adjust capital allocation dynamically as competition intensifies in Indian quantitative markets."]})})]})}const ae=Object.freeze(Object.defineProperty({__proto__:null,default:q},Symbol.toStringTag,{value:"Module"}));function z(){const[a,c]=d.useState(50),[s,n]=d.useState(20),[r,o]=d.useState(4),[i,m]=d.useState(.3),l=s*Math.ceil(a/10),y=2.326+Math.log(l)*.3,h=l*.05,x=1.5*(1-i);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: AutoML Alpha Discovery Configuration"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Configure AutoML search parameters and see the impact on false discovery risk."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Feature Pool: ",a]}),e.jsx("input",{type:"range",min:"10",max:"200",step:"10",value:a,onChange:f=>c(parseInt(f.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Model Variants: ",s]}),e.jsx("input",{type:"range",min:"5",max:"100",step:"5",value:s,onChange:f=>n(parseInt(f.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Search Hours: ",r]}),e.jsx("input",{type:"range",min:"1",max:"24",step:"1",value:r,onChange:f=>o(parseInt(f.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Overfit Penalty: ",(i*100).toFixed(0),"%"]}),e.jsx("input",{type:"range",min:"0",max:"0.8",step:"0.05",value:i,onChange:f=>m(parseFloat(f.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-4 gap-2 text-center",children:[e.jsxs("div",{className:"rounded-lg bg-blue-50 p-2 dark:bg-blue-900/30",children:[e.jsx("div",{className:"text-[10px] text-gray-500",children:"Effective Trials"}),e.jsx("div",{className:"text-sm font-bold text-blue-600",children:l})]}),e.jsxs("div",{className:"rounded-lg bg-purple-50 p-2 dark:bg-purple-900/30",children:[e.jsx("div",{className:"text-[10px] text-gray-500",children:"Min t-stat"}),e.jsx("div",{className:"text-sm font-bold text-purple-600",children:y.toFixed(2)})]}),e.jsxs("div",{className:`rounded-lg p-2 ${h>5?"bg-red-50 dark:bg-red-900/30":"bg-green-50 dark:bg-green-900/30"}`,children:[e.jsx("div",{className:"text-[10px] text-gray-500",children:"Expected False Disc."}),e.jsx("div",{className:`text-sm font-bold ${h>5?"text-red-600":"text-green-600"}`,children:h.toFixed(0)})]}),e.jsxs("div",{className:"rounded-lg bg-orange-50 p-2 dark:bg-orange-900/30",children:[e.jsx("div",{className:"text-[10px] text-gray-500",children:"Adj. Sharpe"}),e.jsx("div",{className:"text-sm font-bold text-orange-600",children:x.toFixed(2)})]})]})]})}function L(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"AutoML for Alpha Discovery"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Automated Machine Learning (AutoML) applies systematic search across model architectures, hyperparameters, and feature combinations to discover alpha signals in NSE data. While powerful, AutoML dramatically amplifies the multiple testing problem, requiring careful safeguards against overfitting."}),e.jsx(_,{title:"AutoML for Alpha Research",label:"Definition 19.10",definition:"AutoML for alpha discovery is the automated search over (1) feature engineering transformations, (2) model architectures (linear, tree-based, neural), (3) hyperparameters, and (4) portfolio construction methods to find combinations that generate risk-adjusted returns exceeding a threshold. For Indian markets, the feature space includes NSE price/volume data, F&O derivatives data, FII/DII flows, and macroeconomic indicators.",notation:"Search space: |F| x |M| x |H| x |P| where F = features, M = models, H = hyperparameters, P = portfolio methods. Typical total: 10^4 to 10^6 configurations."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"The AutoML Pipeline for Indian Markets"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"An AutoML alpha discovery system operates in stages, with each stage expanding the effective number of trials:"}),e.jsx(t.BlockMath,{math:"N_{\\text{effective}} = |F_{\\text{selected}}| \\times |M| \\times |H_{\\text{grid}}| \\times |P|"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The critical challenge is that the total Sharpe reported by the best configuration is inflated by this massive search. The deflated Sharpe must account for all trials:"}),e.jsx(t.BlockMath,{math:"S_{\\text{deflated}} = S_{\\text{best}} - \\sigma_S \\cdot \\Phi^{-1}\\left(1 - \\frac{1}{N_{\\text{effective}}}\\right)"}),e.jsx(z,{}),e.jsx(j,{title:"Expected Maximum Sharpe Under Null",label:"Theorem 19.10",statement:"When testing $N$ independent strategies on data of length $T$ under the null hypothesis of no alpha, the expected maximum Sharpe ratio is: $\\mathbb{E}[\\max_i S_i] \\approx \\sigma_S \\cdot \\left(\\sqrt{2 \\ln N} - \\frac{\\ln \\ln N + \\ln(4\\pi)}{2\\sqrt{2 \\ln N}}\\right)$ where $\\sigma_S = 1/\\sqrt{T}$ is the standard error of the Sharpe estimate. For $N = 10000$ trials on $T = 2520$ days: $\\mathbb{E}[\\max S] \\approx 0.85$.",proof:"This follows from the extreme value theory for the maximum of $N$ i.i.d. standard normal variables. The Sharpe ratio under the null is approximately $S_i \\sim N(0, 1/T)$, so $\\max_i S_i$ follows a Gumbel distribution with the stated expectation. The practical implication is that any AutoML system testing 10,000 configurations will find strategies with Sharpe ~0.85 even in pure noise."}),e.jsx(g,{title:"automl_alpha_search.py",runnable:!0,code:`import numpy as np
from itertools import product
from dataclasses import dataclass
from typing import List, Dict, Tuple

@dataclass
class AlphaCandidate:
    feature_set: str
    model: str
    params: dict
    is_sharpe: float
    oos_sharpe: float
    t_stat: float
    pbo: float

class AutoMLAlphaSearch:
    """AutoML framework for alpha discovery on NSE data."""

    def __init__(self, significance_level: float = 0.05):
        self.alpha = significance_level
        self.candidates: List[AlphaCandidate] = []
        self.n_trials = 0

    def search(self, returns: np.ndarray,
               feature_sets: List[str],
               models: List[str],
               n_params_per_model: int = 5) -> List[AlphaCandidate]:
        """Run automated search across configurations."""
        T = len(returns)
        n_train = int(T * 0.6)
        n_val = int(T * 0.2)

        train = returns[:n_train]
        val = returns[n_train:n_train + n_val]
        test = returns[n_train + n_val:]

        for feat in feature_sets:
            for model in models:
                for param_idx in range(n_params_per_model):
                    self.n_trials += 1

                    # Simulate model training with noise
                    noise_is = np.random.normal(0, 0.0002)
                    noise_oos = np.random.normal(0, 0.0003)

                    is_ret = train + noise_is
                    oos_ret = val + noise_oos

                    is_sharpe = np.mean(is_ret) / np.std(is_ret) * np.sqrt(252)
                    oos_sharpe = np.mean(oos_ret) / np.std(oos_ret) * np.sqrt(252)
                    t_stat = np.mean(oos_ret) / (np.std(oos_ret) / np.sqrt(len(oos_ret)))

                    candidate = AlphaCandidate(
                        feature_set=feat, model=model,
                        params={'idx': param_idx},
                        is_sharpe=is_sharpe, oos_sharpe=oos_sharpe,
                        t_stat=t_stat,
                        pbo=np.random.uniform(0.1, 0.6)
                    )
                    self.candidates.append(candidate)

        # Sort by OOS Sharpe
        self.candidates.sort(key=lambda c: c.oos_sharpe, reverse=True)
        return self.candidates

    def deflated_sharpe(self, observed_sr: float) -> float:
        """Calculate deflated Sharpe accounting for all trials."""
        from scipy.stats import norm
        sr_std = 1 / np.sqrt(252 * 5)  # 5 years
        threshold = sr_std * norm.ppf(1 - 1 / max(self.n_trials, 1))
        return observed_sr - threshold

    def filter_candidates(self, min_deflated_sr: float = 0.0,
                          max_pbo: float = 0.25) -> List[AlphaCandidate]:
        """Filter candidates using deflated Sharpe and PBO."""
        filtered = []
        for c in self.candidates:
            dsr = self.deflated_sharpe(c.oos_sharpe)
            if dsr > min_deflated_sr and c.pbo < max_pbo:
                filtered.append(c)
        return filtered

# Simulate AutoML search on NSE data
np.random.seed(42)
T = 2520  # 10 years daily

# Base returns with small signal
base_returns = np.random.normal(0.0003, 0.015, T)

searcher = AutoMLAlphaSearch()

feature_sets = [
    'momentum_12m', 'momentum_6m', 'mean_rev_20d',
    'volume_breakout', 'fii_flow', 'earnings_surprise',
    'quality_roe', 'low_vol', 'value_pe', 'size_mcap'
]

models = ['linear', 'ridge', 'lasso', 'random_forest',
          'gradient_boost', 'xgboost', 'lightgbm', 'mlp']

candidates = searcher.search(base_returns, feature_sets, models, 5)

print("=== AutoML Alpha Discovery Results ===")
print(f"Total trials: {searcher.n_trials}")
print(f"Feature sets: {len(feature_sets)}")
print(f"Models: {len(models)}")
print(f"\\n--- Top 10 Candidates (by OOS Sharpe) ---")
for i, c in enumerate(candidates[:10]):
    dsr = searcher.deflated_sharpe(c.oos_sharpe)
    print(f"  {i+1}. {c.feature_set:20s} | {c.model:15s} | "
          f"IS={c.is_sharpe:.2f} OOS={c.oos_sharpe:.2f} "
          f"DSR={dsr:.2f} PBO={c.pbo:.2f}")

# Filter with safeguards
filtered = searcher.filter_candidates(
    min_deflated_sr=0.0, max_pbo=0.25
)
print(f"\\n--- After Filtering (DSR>0, PBO<0.25) ---")
print(f"Survivors: {len(filtered)} / {searcher.n_trials}")
for c in filtered[:5]:
    dsr = searcher.deflated_sharpe(c.oos_sharpe)
    print(f"  {c.feature_set:20s} | {c.model:15s} | "
          f"OOS={c.oos_sharpe:.2f} DSR={dsr:.2f}")`}),e.jsx(b,{title:"AutoML Pitfall: The NSE Feature Factory",difficulty:"advanced",problem:"You build a feature factory with 200 technical indicators computed on 50 Nifty stocks, test 10 ML models with 20 hyperparameter configs each, resulting in 200 x 10 x 20 = 40,000 trials. The best model shows Sharpe 2.5. Is it real?",solution:[{step:"Expected maximum Sharpe under null",formula:"E[\\max S] \\approx \\frac{1}{\\sqrt{T}} \\sqrt{2 \\ln(40000)} \\approx \\frac{1}{\\sqrt{2520}} \\times 4.6 \\approx 0.092 \\times 4.6 = 0.42",explanation:"Even with pure noise data and 40,000 trials, you expect to find a strategy with annualized Sharpe ~0.42."},{step:"Calculate deflated Sharpe",formula:"S_{\\text{deflated}} = 2.5 - 0.42 = 2.08",explanation:"Subtracting the expected null maximum gives a deflated Sharpe of 2.08, which is still strong."},{step:"But check the Bonferroni threshold",formula:"t_{\\text{Bonf}} = \\Phi^{-1}(1 - 0.05/80000) = 4.73",explanation:"With 40,000 trials (two-sided), the Bonferroni corrected t-stat threshold is 4.73. Your t-stat of 2.5/0.092 = 27.2 actually passes! But this assumes independence."},{step:"Account for feature correlation",formula:"N_{\\text{eff}} \\ll 40000 \\text{ due to correlated features}",explanation:"Most of your 200 indicators are highly correlated (e.g., RSI-14 and RSI-21). The effective number of independent trials may be only 500-2000. Even so, always validate with PBO < 0.25 and walk-forward testing on NSE data before deploying."}]}),e.jsx(p,{title:"AutoML Safeguards for Indian Markets",type:"warning",children:e.jsxs("ul",{className:"space-y-1 list-disc list-inside",children:[e.jsxs("li",{children:["Always compute the ",e.jsx("strong",{children:"deflated Sharpe ratio"})," accounting for all trials"]}),e.jsxs("li",{children:["Use ",e.jsx("strong",{children:"PBO < 0.25"})," as a mandatory filter for AutoML discoveries"]}),e.jsxs("li",{children:["Require ",e.jsx("strong",{children:"economic rationale"})," for any AutoML-discovered signal"]}),e.jsx("li",{children:"Use walk-forward validation with NSE-specific embargo periods"}),e.jsx("li",{children:"Account for feature correlation when estimating effective trial count"}),e.jsx("li",{children:"Test on multiple Indian market regimes (pre/post demonetization, COVID)"})]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Advanced Analysis Framework"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"A comprehensive analysis framework for Indian markets must account for the unique characteristics of NSE microstructure, SEBI regulations, and the interplay between domestic and foreign institutional flows. The following performance attribution model decomposes strategy returns into actionable components:"}),e.jsx(t.BlockMath,{math:"R_{\\\\text{strategy}} = \\\\alpha + \\\\beta_{\\\\text{Nifty}} R_{\\\\text{Nifty}} + \\\\beta_{\\\\text{FII}} F_{\\\\text{FII}} + \\\\sum_k \\\\gamma_k S_k + \\\\epsilon"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"F_{\\\\text{FII}}"})," captures the FII flow factor,"," ",e.jsx(t.InlineMath,{math:"S_k"})," represents sector factors (Banking, IT, FMCG, Energy), and ",e.jsx(t.InlineMath,{math:"\\\\alpha"})," measures the strategy genuine value-add. For Indian markets, the FII flow factor alone explains 15-25% of cross-sectional return variation in Nifty 50 stocks."]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Performance Metric"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Target for NSE"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Measurement Period"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Annualized Alpha"}),e.jsx("td",{className:"px-4 py-2",children:"> 5% above Nifty 50"}),e.jsx("td",{className:"px-4 py-2",children:"Rolling 12-month"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Information Ratio"}),e.jsx("td",{className:"px-4 py-2",children:"> 0.5"}),e.jsx("td",{className:"px-4 py-2",children:"Since inception"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Maximum Drawdown"}),e.jsx("td",{className:"px-4 py-2",children:"< 15% absolute"}),e.jsx("td",{className:"px-4 py-2",children:"Peak-to-trough"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Sortino Ratio"}),e.jsx("td",{className:"px-4 py-2",children:"> 1.5"}),e.jsx("td",{className:"px-4 py-2",children:"Rolling 252-day"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Hit Rate"}),e.jsx("td",{className:"px-4 py-2",children:"> 52% daily"}),e.jsx("td",{className:"px-4 py-2",children:"All trading days"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Tail Ratio"}),e.jsx("td",{className:"px-4 py-2",children:"> 1.0"}),e.jsx("td",{className:"px-4 py-2",children:"95th/5th percentile"})]})]})]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Risk Management for NSE Deployment"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Deploying any quantitative strategy on NSE requires integration with a risk management framework that accounts for Indian market specifics. The Expected Shortfall at the 95% confidence level provides a more complete picture of tail risk than VaR alone:"}),e.jsx(t.BlockMath,{math:"\\\\text{ES}_{0.95} = -\\\\mathbb{E}[R_p | R_p < \\\\text{VaR}_{0.95}]"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For strategies trading Nifty 50 stocks, the typical daily ES at 95% is 2-4% of portfolio value. During extreme events (demonetization, COVID crash), ES can spike to 8-12%. Circuit breakers on NSE provide some natural protection but can also trap positions."}),e.jsx(p,{title:"Regulatory and Infrastructure Notes",type:"historical",children:e.jsxs("ul",{className:"space-y-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"SEBI Compliance:"})," All algo strategies must be registered with the exchange and comply with SEBI circular on automated trading. Maintain audit trails for minimum 5 years."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Transaction Costs:"})," Factor in STT (0.1% delivery, 0.025% intraday), GST (18% on brokerage), stamp duty (0.015% buy side), and exchange transaction charges. Zerodha offers zero delivery brokerage with INR 20/order for intraday."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Data Sources:"})," Use Zerodha Kite Connect for real-time NSE data, NSE archives for historical data, and Bloomberg/Refinitiv for comprehensive fundamental data on Indian companies."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Deployment:"})," AWS Mumbai (ap-south-1) provides 5-15ms latency to NSE. Use Docker containers with TimescaleDB for tick data storage and Grafana for real-time monitoring dashboards."]})]})}),e.jsx(p,{title:"Key Takeaway",type:"tip",children:e.jsxs("p",{children:["AutoML is a powerful tool for alpha discovery but a ",e.jsx("strong",{children:"dangerous one without safeguards"}),". The massive search space (10,000+ configurations) guarantees finding strategies with impressive in-sample performance even in pure noise. Always apply deflated Sharpe, PBO analysis, and walk-forward validation. For NSE strategies, require economic rationale for any AutoML-discovered signal before deploying capital."]})})]})}const re=Object.freeze(Object.defineProperty({__proto__:null,default:L},Symbol.toStringTag,{value:"Module"}));function V(){const[a,c]=d.useState(50),[s,n]=d.useState(.5),[r,o]=d.useState(252),[i,m]=d.useState(1.5),l=a*s*(i/Math.sqrt(r/252)),y=Math.sqrt(a)*i/(1+s),h=i*(1-s*Math.log(a)/10);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Genetic Programming for Formula Discovery Explorer"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Explore the key parameters of genetic programming for NSE Nifty 50 strategies."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Universe Size: ",a]}),e.jsx("input",{type:"range",min:"10",max:"200",step:"5",value:a,onChange:x=>c(parseInt(x.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Signal Strength: ",s.toFixed(2)]}),e.jsx("input",{type:"range",min:"0.1",max:"2",step:"0.05",value:s,onChange:x=>n(parseFloat(x.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Lookback (days): ",r]}),e.jsx("input",{type:"range",min:"21",max:"756",step:"21",value:r,onChange:x=>o(parseInt(x.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Target Sharpe: ",i.toFixed(1)]}),e.jsx("input",{type:"range",min:"0.5",max:"3",step:"0.1",value:i,onChange:x=>m(parseFloat(x.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-3 text-center",children:[e.jsxs("div",{className:"rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30",children:[e.jsx("div",{className:"text-[10px] text-gray-500",children:"Expected Alpha"}),e.jsx("div",{className:"text-lg font-bold text-blue-600",children:l.toFixed(2)})]}),e.jsxs("div",{className:"rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30",children:[e.jsx("div",{className:"text-[10px] text-gray-500",children:"Diversification Benefit"}),e.jsx("div",{className:"text-lg font-bold text-purple-600",children:y.toFixed(2)})]}),e.jsxs("div",{className:`rounded-lg p-3 ${h>.5?"bg-green-50 dark:bg-green-900/30":"bg-red-50 dark:bg-red-900/30"}`,children:[e.jsx("div",{className:"text-[10px] text-gray-500",children:"Adjusted Metric"}),e.jsx("div",{className:`text-lg font-bold ${h>.5?"text-green-600":"text-red-600"}`,children:h.toFixed(2)})]})]})]})}function H(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Genetic Programming for Formula Discovery"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Genetic programming represents a frontier area in quantitative finance with significant potential for Indian markets. As NSE evolves with increasing algorithmic participation and regulatory sophistication, techniques from GP and symbolic regression offer new approaches to alpha discovery and risk management. This section explores the theoretical foundations, practical implementations, and Indian market considerations for applying genetic programming to Nifty 50 trading."}),e.jsx(_,{title:"Genetic Programming",label:"Definition 19.3",definition:"Genetic programming in quantitative finance refers to the application of GP and symbolic regression to financial markets for alpha formula generation, portfolio construction, and risk management. In the context of Indian markets (NSE/Nifty 50), this involves adapting global methods to account for local market microstructure, SEBI regulations, and unique data characteristics such as FII/DII flows, formula trees, and crossover and mutation.",notation:"Key components: fitness function, Sharpe ratio, population, generation. Applied to Nifty 50 universe on NSE."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Mathematical Foundation"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The core mathematical framework for genetic programming in the context of Indian equity markets can be expressed through the following optimization problem:"}),e.jsx(t.BlockMath,{math:"\\min_{\\theta} \\mathcal{L}(\\theta) = \\sum_{t=1}^{T} \\ell(y_t, f_\\theta(X_t)) + \\lambda \\|\\theta\\|_2^2"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"f_\\theta"})," represents the GP model parameterized by ",e.jsx(t.InlineMath,{math:"\\theta"}),", ",e.jsx(t.InlineMath,{math:"X_t"})," are features derived from NSE data including formula trees and crossover and mutation, and",e.jsx(t.InlineMath,{math:"\\lambda"})," controls the regularization to prevent overfitting to historical Nifty 50 patterns."]}),e.jsx(t.BlockMath,{math:"S_{\\text{portfolio}} = \\frac{\\mathbb{E}[R_p] - r_f}{\\sigma_p} = \\frac{\\alpha + \\beta R_m - r_f}{\\sigma_p}"}),e.jsx(V,{}),e.jsx(j,{title:"Convergence of Gp in Financial Markets",label:"Theorem 19.3",statement:"For a GP model applied to NSE data with $T$ observations and $p$ features, the out-of-sample prediction error satisfies: $\\mathbb{E}[\\text{MSE}_{\\text{OOS}}] \\leq \\mathbb{E}[\\text{MSE}_{\\text{IS}}] + O\\left(\\sqrt{\\frac{p \\log T}{T}}\\right)$ provided the data generating process is stationary over the evaluation period. For Nifty 50 daily data with $T = 2520$ (10 years) and $p = 50$ features: the generalization gap is approximately $O(0.14)$.",proof:"This bound follows from standard statistical learning theory applied to dependent data (mixing conditions). The key assumption is that NSE returns satisfy beta-mixing with exponential decay, which has been validated empirically for liquid Nifty 50 stocks. The logarithmic factor accounts for the adaptive model selection in symbolic regression."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Application to Indian Markets"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Applying genetic programming to Indian markets requires careful consideration of local factors that differentiate NSE from developed markets:"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Factor"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Global Approach"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Indian Adaptation"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Data availability"}),e.jsx("td",{className:"px-4 py-2",children:"20+ years daily data"}),e.jsx("td",{className:"px-4 py-2",children:"NSE quality data from 2005+"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Market microstructure"}),e.jsx("td",{className:"px-4 py-2",children:"Continuous markets"}),e.jsx("td",{className:"px-4 py-2",children:"NSE circuit breakers, T+1 settlement"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Regulatory regime"}),e.jsx("td",{className:"px-4 py-2",children:"SEC/MiFID"}),e.jsx("td",{className:"px-4 py-2",children:"SEBI algo trading rules, STT, stamp duty"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Investor composition"}),e.jsx("td",{className:"px-4 py-2",children:"Institutional dominated"}),e.jsx("td",{className:"px-4 py-2",children:"High retail participation, FII influence"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Structural breaks"}),e.jsx("td",{className:"px-4 py-2",children:"GFC, COVID"}),e.jsx("td",{className:"px-4 py-2",children:"Demonetization, GST, COVID, Adani crisis"})]})]})]})}),e.jsx(g,{title:"geneticprogramming_analysis.py",runnable:!0,code:`import numpy as np
from dataclasses import dataclass, field
from typing import List, Dict, Optional

@dataclass
class GeneticProgrammingConfig:
    """Configuration for genetic programming analysis."""
    universe: str = "Nifty 50"
    exchange: str = "NSE"
    n_assets: int = 50
    lookback_days: int = 252
    confidence_level: float = 0.95
    method: str = "GP"

class GeneticProgrammingAnalyzer:
    """Analyzer for genetic programming in Indian markets."""

    def __init__(self, config: GeneticProgrammingConfig = None):
        self.config = config or GeneticProgrammingConfig()
        self.results: List[dict] = []

    def analyze(self, data: np.ndarray) -> dict:
        """Run genetic programming analysis on NSE data."""
        n_samples, n_features = data.shape
        
        # Core computation
        mean_signal = np.mean(data, axis=0)
        std_signal = np.std(data, axis=0)
        sharpe = mean_signal / (std_signal + 1e-10) * np.sqrt(252)
        
        # Rank assets by signal strength
        ranks = np.argsort(-sharpe)
        top_quintile = ranks[:n_features // 5]
        bottom_quintile = ranks[-n_features // 5:]
        
        # Long-short portfolio
        ls_returns = np.mean(data[:, top_quintile], axis=1) - np.mean(data[:, bottom_quintile], axis=1)
        ls_sharpe = np.mean(ls_returns) / np.std(ls_returns) * np.sqrt(252)
        
        result = {
            "method": self.config.method,
            "universe": self.config.universe,
            "n_assets": n_features,
            "ls_sharpe": ls_sharpe,
            "top_quintile_sharpe": np.mean(sharpe[top_quintile]),
            "bottom_quintile_sharpe": np.mean(sharpe[bottom_quintile]),
            "spread": np.mean(sharpe[top_quintile]) - np.mean(sharpe[bottom_quintile]),
            "t_stat": ls_sharpe * np.sqrt(n_samples / 252),
            "max_drawdown": np.min(np.minimum.accumulate(np.cumprod(1 + ls_returns)) / np.maximum.accumulate(np.cumprod(1 + ls_returns)) - 1) * 100,
        }
        self.results.append(result)
        return result

    def robustness_check(self, data: np.ndarray, n_bootstrap: int = 100) -> dict:
        """Bootstrap robustness check for NSE strategies."""
        sharpes = []
        n = len(data)
        for _ in range(n_bootstrap):
            idx = np.random.choice(n, size=n, replace=True)
            boot_data = data[idx]
            result = self.analyze(boot_data)
            sharpes.append(result["ls_sharpe"])
        
        return {
            "mean_sharpe": np.mean(sharpes),
            "std_sharpe": np.std(sharpes),
            "ci_lower": np.percentile(sharpes, 2.5),
            "ci_upper": np.percentile(sharpes, 97.5),
            "pct_positive": np.mean([s > 0 for s in sharpes]) * 100,
        }

# Demo: genetic programming analysis on NSE
np.random.seed(42)
n_days = 1260  # 5 years
n_stocks = 50  # Nifty 50 components

# Simulate NSE returns with alpha formula signal
returns = np.random.normal(0.0003, 0.018, (n_days, n_stocks))
# Add signal to some stocks
for i in range(10):
    returns[:, i] += np.random.normal(0.0002, 0.001, n_days)

config = GeneticProgrammingConfig(universe="Nifty 50", exchange="NSE")
analyzer = GeneticProgrammingAnalyzer(config)

result = analyzer.analyze(returns)
print("=== Genetic Programming for Formula Discovery - NSE Analysis ===")
for key, val in result.items():
    if isinstance(val, float):
        print(f"  {key:30s}: {val:.4f}")
    else:
        print(f"  {key:30s}: {val}")

# Robustness check
robust = analyzer.robustness_check(returns, n_bootstrap=50)
print(f"
=== Bootstrap Robustness ===")
for key, val in robust.items():
    print(f"  {key:20s}: {val:.3f}")`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Implementation Considerations"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"When implementing genetic programming for NSE trading, several practical considerations arise. The GP approach must be adapted to handle formula trees, crossover and mutation, and the unique characteristics of Indian financial data. Key implementation details include data preprocessing, feature engineering specific to Nifty 50 constituents, and validation methodology that respects the temporal structure of NSE trading data."}),e.jsx(b,{title:"Applying Gp to Nifty 50",difficulty:"intermediate",problem:"You want to apply GP to discover alpha formula signals in Nifty 50 stocks. Your dataset has 5 years of daily data for 50 stocks with 20 features each. Design the research pipeline.",solution:[{step:"Data preparation",formula:"X \\in \\mathbb{R}^{1260 \\times 50 \\times 20}, \\; y \\in \\mathbb{R}^{1260 \\times 50}",explanation:"Organize NSE data into a panel with 1260 days, 50 stocks, and 20 features. Labels are forward 21-day returns. Apply purged walk-forward validation with 21-day embargo."},{step:"Feature engineering",formula:"X_{\\text{aug}} = \\phi(X) \\in \\mathbb{R}^{1260 \\times 50 \\times 35}",explanation:"Augment with NSE-specific features: formula trees, crossover and mutation, and cross-sectional ranks. Total features expand from 20 to ~35."},{step:"Model training with GP",formula:"\\hat{\\theta} = \\arg\\min_\\theta \\mathcal{L}(\\theta; X_{\\text{train}}, y_{\\text{train}})",explanation:"Train using the GP approach on in-sample data (first 60%). Use Bayesian optimization for hyperparameter search with early stopping."},{step:"Validation and deployment decision",formula:"S_{\\text{OOS}} > 0.5 \\text{ AND PBO} < 0.25",explanation:"Evaluate on out-of-sample data. Only deploy if OOS Sharpe exceeds 0.5 and PBO (computed via CSCV) is below 0.25. Test specifically on post-demonetization and COVID periods."}]}),e.jsx(p,{title:"Indian Market Considerations",type:"warning",children:e.jsxs("ul",{className:"space-y-1 list-disc list-inside",children:[e.jsx("li",{children:"Account for NSE trading hours (9:15 AM -- 3:30 PM IST) and pre-open auction"}),e.jsx("li",{children:"Handle NSE circuit breakers that halt individual stocks and the index"}),e.jsx("li",{children:"Include fitness function and Sharpe ratio as additional signals"}),e.jsx("li",{children:"Test across Indian market regime changes: demonetization, GST, COVID"}),e.jsx("li",{children:"Consider population and generation in your feature engineering"}),e.jsx("li",{children:"SEBI regulations on algo trading require registration and audit trails"})]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Performance Benchmarking"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Evaluating the effectiveness of this approach requires benchmarking against standard Indian market indices and factor portfolios. The performance attribution should decompose returns into systematic and idiosyncratic components:"}),e.jsx(t.BlockMath,{math:"R_{\\\\text{strategy}} = \\\\alpha + \\\\beta_1 R_{\\\\text{Nifty}} + \\\\beta_2 R_{\\\\text{BankNifty}} + \\\\sum_k \\\\gamma_k F_k + \\\\epsilon"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"F_k"})," represents additional Indian market factors such as FII flow momentum, earnings revision, and size factors. The alpha"," ",e.jsx(t.InlineMath,{math:"\\\\alpha"})," represents the genuine value-add of the approach after controlling for systematic risk exposures on NSE."]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Metric"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Target"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Measurement"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Annualized Sharpe"}),e.jsx("td",{className:"px-4 py-2",children:"> 1.0 net of costs"}),e.jsx("td",{className:"px-4 py-2",children:"Rolling 252-day window"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Maximum Drawdown"}),e.jsx("td",{className:"px-4 py-2",children:"< 15%"}),e.jsx("td",{className:"px-4 py-2",children:"Peak-to-trough on equity curve"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Calmar Ratio"}),e.jsx("td",{className:"px-4 py-2",children:"> 0.5"}),e.jsx("td",{className:"px-4 py-2",children:"Annual return / Max DD"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Win Rate"}),e.jsx("td",{className:"px-4 py-2",children:"> 52%"}),e.jsx("td",{className:"px-4 py-2",children:"Percentage of profitable days"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Turnover"}),e.jsx("td",{className:"px-4 py-2",children:"< 24x annually"}),e.jsx("td",{className:"px-4 py-2",children:"Sum of absolute weight changes"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Information Ratio vs Nifty"}),e.jsx("td",{className:"px-4 py-2",children:"> 0.5"}),e.jsx("td",{className:"px-4 py-2",children:"Active return / Tracking error"})]})]})]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Risk Management Integration"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Any implementation on NSE must integrate with a comprehensive risk management framework. The Value-at-Risk for the strategy portfolio should be computed using the conditional distribution:"}),e.jsx(t.BlockMath,{math:"\\\\text{VaR}_{\\\\alpha}(R_p) = -\\\\inf\\\\{x : P(R_p \\\\leq x) \\\\geq \\\\alpha\\\\}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For Indian markets, VaR should be computed using Expected Shortfall (ES) as the primary risk measure, as SEBI increasingly requires tail risk reporting:"}),e.jsx(t.BlockMath,{math:"\\\\text{ES}_{\\\\alpha} = -\\\\frac{1}{\\\\alpha}\\\\int_0^{\\\\alpha} \\\\text{VaR}_u \\\\, du"}),e.jsx(p,{title:"Regulatory and Practical Notes",type:"historical",children:e.jsxs("ul",{className:"space-y-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"SEBI Framework:"})," All algorithmic strategies on NSE must comply with SEBI circular on algo trading, including registration, risk checks, and audit trail requirements."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Tax Implications:"})," STT of 0.1% on delivery and 0.025% on intraday affects strategy net returns. GST at 18% on brokerage adds additional friction."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Data Infrastructure:"})," Use Zerodha Kite or Angel One SmartAPI for live data. Historical data available from NSE archives and third-party providers like Quandl and Bloomberg."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Compute Requirements:"})," Deploy on AWS Mumbai (ap-south-1) for minimum latency to NSE co-location. Typical cost: INR 10,000--50,000/month for a production trading system."]})]})}),e.jsx(p,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Genetic programming offers promising avenues for alpha discovery in Indian markets, but requires careful adaptation to NSE microstructure and SEBI regulatory requirements. The key to success is combining GP with robust validation methodology -- including PBO analysis, walk-forward testing, and regime-aware evaluation across Indian market structural breaks. Always maintain the discipline of hypothesis-driven research even when using automated symbolic regression approaches."})})]})}const se=Object.freeze(Object.defineProperty({__proto__:null,default:H},Symbol.toStringTag,{value:"Module"}));export{K as a,Q as b,X as c,Z as d,J as e,ee as f,te as g,ae as h,re as i,se as j,Y as s};
