import{j as e,r as i}from"./vendor-DgA46Qmo.js";import{r as n}from"./vendor-katex-C-S70IU0.js";import{D as b,T as N,P as y,E as v,N as f}from"./subject-01-math-foundations-vREfsVbS.js";function I(){const[t,o]=i.useState(5),[a,c]=i.useState(21),[s,x]=i.useState(.5),r=252,m=Math.floor(r/a),d=s*Math.sqrt(a/252)*100,l=Math.round(r*s*.01/(t/100)),h=m*15,g=l*15;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Calendar vs Threshold Rebalancing"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Compare rebalancing strategies for an Indian equity portfolio over one year."}),e.jsxs("div",{className:"mb-4 grid grid-cols-3 gap-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Threshold Band: +/-",t,"%"]}),e.jsx("input",{type:"range",min:"1",max:"15",step:"1",value:t,onChange:p=>o(parseInt(p.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Calendar: Every ",a," days"]}),e.jsx("input",{type:"range",min:"5",max:"63",step:"1",value:a,onChange:p=>c(parseInt(p.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Drift Rate: ",s.toFixed(1)]}),e.jsx("input",{type:"range",min:"0.1",max:"2.0",step:"0.1",value:s,onChange:p=>x(parseFloat(p.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4 text-center text-xs",children:[e.jsxs("div",{className:"rounded-lg bg-indigo-50 p-4 dark:bg-indigo-900/30",children:[e.jsx("div",{className:"text-sm font-bold text-indigo-700 dark:text-indigo-300",children:"Calendar"}),e.jsxs("div",{className:"mt-1 text-gray-600 dark:text-gray-400",children:["Rebalances: ",e.jsx("span",{className:"font-bold text-indigo-600",children:m})]}),e.jsxs("div",{className:"text-gray-600 dark:text-gray-400",children:["Expected TC: ",e.jsxs("span",{className:"font-bold text-indigo-600",children:[h," bps"]})]}),e.jsxs("div",{className:"text-gray-600 dark:text-gray-400",children:["Max Drift: ",e.jsxs("span",{className:"font-bold text-indigo-600",children:[d.toFixed(1),"%"]})]})]}),e.jsxs("div",{className:"rounded-lg bg-amber-50 p-4 dark:bg-amber-900/30",children:[e.jsx("div",{className:"text-sm font-bold text-amber-700 dark:text-amber-300",children:"Threshold"}),e.jsxs("div",{className:"mt-1 text-gray-600 dark:text-gray-400",children:["Rebalances: ",e.jsxs("span",{className:"font-bold text-amber-600",children:["~",l]})]}),e.jsxs("div",{className:"text-gray-600 dark:text-gray-400",children:["Expected TC: ",e.jsxs("span",{className:"font-bold text-amber-600",children:[g," bps"]})]}),e.jsxs("div",{className:"text-gray-600 dark:text-gray-400",children:["Max Drift: ",e.jsxs("span",{className:"font-bold text-amber-600",children:[t,"%"]})]})]})]})]})}function S(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Calendar vs Threshold Rebalancing"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Portfolio rebalancing is the process of realigning portfolio weights to target allocations after market movements cause drift. For Indian investors, the two primary approaches are calendar-based rebalancing (trading at fixed intervals) and threshold-based rebalancing (trading when drift exceeds a band). Each approach involves different trade-offs between tracking error, transaction costs, and tax efficiency under Indian tax law."}),e.jsx(b,{title:"Portfolio Drift",label:"Definition 10.1",definition:"Portfolio drift measures how far current weights have deviated from target weights due to differential asset returns. For asset i, drift is Δwᵢ = wᵢ,actual - wᵢ,target. Total portfolio drift is measured as ||Δw|| = Σᵢ|wᵢ,actual - wᵢ,target|.",notation:"Δw = drift vector, ||Δw||₁ = L1 norm (total absolute drift)"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Calendar Rebalancing"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Calendar rebalancing trades at fixed intervals regardless of drift magnitude. Common frequencies for Indian portfolios:"}),e.jsxs("ul",{className:"list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Monthly:"})," Best tracking but highest TC (~15 bps x 12 = 180 bps/year)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Quarterly:"})," Good balance, aligns with MF NAV reporting"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Semi-annually:"})," Common for retail investors, lower TC"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Annually:"})," Tax-efficient (LTCG after 1 year), minimal TC"]})]}),e.jsx(n.BlockMath,{math:"\\text{Expected drift after } \\Delta t \\text{ days: } E[\\|\\Delta \\mathbf{w}\\|] \\approx \\sigma_w \\sqrt{\\Delta t / 252}"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Threshold (Band) Rebalancing"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Threshold rebalancing triggers a trade only when any asset’s weight drifts beyond a specified band around its target. This is more efficient as it only trades when needed:"}),e.jsx(n.BlockMath,{math:"\\text{Rebalance if } |w_{i,\\text{actual}} - w_{i,\\text{target}}| > \\delta_i \\text{ for any } i"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The optimal threshold ",e.jsx(n.InlineMath,{math:"\\delta^*"})," depends on the transaction cost rate ",e.jsx(n.InlineMath,{math:"c"}),", volatility ",e.jsx(n.InlineMath,{math:"\\sigma"}),", and risk aversion ",e.jsx(n.InlineMath,{math:"\\lambda"}),":"]}),e.jsx(n.BlockMath,{math:"\\delta^* \\approx \\left(\\frac{3c}{2\\lambda\\sigma^2}\\right)^{1/3}"}),e.jsx(N,{title:"No-Trade Region (Constant Proportional TC)",label:"Theorem 10.1",statement:"Under proportional transaction costs c, the optimal rebalancing policy has a no-trade region around each target weight. For asset i, no trade occurs when w_target,i - δ_i ≤ w_actual,i ≤ w_target,i + δ_i. When the weight exits the band, trade only enough to bring it to the edge of the band (not back to target).",proof:"This follows from the Merton (1971) and Davis-Norman (1990) analysis of optimal consumption-investment with transaction costs. The no-trade region is characterized by the free boundary of the corresponding variational inequality."}),e.jsx(I,{}),e.jsx(y,{title:"rebalancing_backtest.py",runnable:!0,code:`import numpy as np

np.random.seed(42)

# Simulate 3-asset Indian portfolio: Nifty 50, G-Sec, Gold
assets = ['Nifty 50', 'G-Sec 10Y', 'Gold MCX']
target = np.array([0.60, 0.30, 0.10])
n = len(assets)

# Daily return parameters (annualized)
mu = np.array([0.12, 0.07, 0.08]) / 252
sigma = np.array([0.22, 0.06, 0.15]) / np.sqrt(252)
corr = np.array([[1.0, -0.1, 0.1], [-0.1, 1.0, 0.15], [0.1, 0.15, 1.0]])
cov = np.outer(sigma, sigma) * corr

T = 252 * 5  # 5 years
tc_rate = 0.0015  # 15 bps per trade

# Generate returns
returns = np.random.multivariate_normal(mu, cov, T)

def simulate_rebalancing(returns, target, strategy, param):
    n = len(target)
    T = len(returns)
    weights = target.copy()
    portfolio_value = 1.0
    total_tc = 0
    n_rebal = 0
    values = [1.0]

    for t in range(T):
        # Apply returns
        new_values = weights * (1 + returns[t])
        portfolio_value = np.sum(new_values)
        weights = new_values / portfolio_value

        # Check rebalancing condition
        rebalance = False
        if strategy == 'calendar' and (t + 1) % param == 0:
            rebalance = True
        elif strategy == 'threshold':
            drift = np.max(np.abs(weights - target))
            if drift > param:
                rebalance = True

        if rebalance:
            tc = tc_rate * np.sum(np.abs(weights - target)) * portfolio_value
            total_tc += tc
            portfolio_value -= tc
            weights = target.copy()
            n_rebal += 1

        values.append(portfolio_value)

    values = np.array(values)
    ann_ret = (values[-1] / values[0]) ** (252 / T) - 1
    ann_vol = np.std(np.diff(np.log(values))) * np.sqrt(252)
    max_dd = np.min(values / np.maximum.accumulate(values) - 1)

    return {
        'return': ann_ret, 'vol': ann_vol, 'maxdd': max_dd,
        'tc': total_tc, 'n_rebal': n_rebal, 'final': values[-1]
    }

# Compare strategies
strategies = [
    ('No Rebalancing', 'calendar', 999999),
    ('Monthly Calendar', 'calendar', 21),
    ('Quarterly Calendar', 'calendar', 63),
    ('Annual Calendar', 'calendar', 252),
    ('Threshold 3%', 'threshold', 0.03),
    ('Threshold 5%', 'threshold', 0.05),
    ('Threshold 10%', 'threshold', 0.10),
]

print("=== Rebalancing Strategy Comparison (5-Year Backtest) ===")
print(f"Portfolio: 60% Nifty 50, 30% G-Sec, 10% Gold")
print(f"TC rate: {tc_rate*10000:.0f} bps per rebalance")
print(f"\\n{'Strategy':<22} {'Ann Ret':>8} {'Vol':>8} {'MaxDD':>8} {'#Rebal':>8} {'TC(bps)':>8}")
print("-" * 65)

for name, strategy, param in strategies:
    result = simulate_rebalancing(returns, target, strategy, param)
    print(f"{name:<22} {result['return']:>8.2%} {result['vol']:>8.2%} "
          f"{result['maxdd']:>8.2%} {result['n_rebal']:>8} {result['tc']*10000:>8.1f}")`}),e.jsx(v,{title:"Optimal Threshold for a 60/30/10 Indian Portfolio",difficulty:"intermediate",problem:"A retail investor holds 60% Nifty 50 (vol=22%), 30% G-Sec (vol=6%), 10% Gold (vol=15%). Transaction cost is 15 bps. Risk aversion $\\\\lambda = 2$. Find the optimal rebalancing threshold.",solution:[{step:"Compute portfolio drift volatility",formula:"\\sigma_w \\approx \\sqrt{\\sum_i w_i^2 \\sigma_i^2} \\approx \\sqrt{0.36 \\times 0.0484 + 0.09 \\times 0.0036 + 0.01 \\times 0.0225} \\approx 0.138",explanation:"The drift volatility measures how fast weights drift from targets."},{step:"Apply optimal threshold formula",formula:"\\delta^* = \\left(\\frac{3c}{2\\lambda\\sigma_w^2}\\right)^{1/3} = \\left(\\frac{3 \\times 0.0015}{2 \\times 2 \\times 0.019}\\right)^{1/3}"},{step:"Compute",formula:"\\delta^* = (0.059)^{1/3} \\approx 0.039 = 3.9\\%",explanation:"A ~4% threshold band is optimal, meaning rebalance when any asset drifts more than 4% from target."}]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Hybrid Approaches"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Many Indian fund managers use hybrid strategies:"}),e.jsxs("ul",{className:"list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Calendar + Threshold:"})," Check monthly, rebalance only if drift > 3%"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Cash-flow rebalancing:"})," Use SIP inflows to buy underweight assets"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Partial rebalancing:"})," Trade halfway back to target to reduce TC"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Tax-aware timing:"})," Wait for LTCG eligibility (1 year) before selling"]})]}),e.jsx(f,{title:"Practical Tips for Indian Investors",type:"tip",children:e.jsxs("ul",{className:"space-y-1 list-disc list-inside",children:[e.jsx("li",{children:"Use SIP date as natural rebalancing point -- redirect inflows to underweight assets"}),e.jsx("li",{children:"Zerodha/Kite allows basket orders for systematic multi-asset rebalancing"}),e.jsx("li",{children:"Annual rebalancing in March aligns with tax year for harvest LTCG exemption"}),e.jsx("li",{children:"For large portfolios (>INR 1 Cr), quarterly threshold (5%) is usually optimal"}),e.jsx("li",{children:"Monitor LTCG vs STCG implications before each rebalance (15% STCG vs 10% LTCG)"})]})}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Calendar rebalancing is simpler but can be wasteful (trading when drift is small) or slow (missing large drifts). Threshold rebalancing is more efficient, with an optimal band of ~3-5% for typical Indian multi-asset portfolios. The best practical approach combines both: check monthly, rebalance only if drift exceeds 3-5%, and use SIP cash flows for opportunistic rebalancing."})})]})}const J=Object.freeze(Object.defineProperty({__proto__:null,default:S},Symbol.toStringTag,{value:"Module"}));function C(){const[t,o]=i.useState(100),[a,c]=i.useState(150),[s,x]=i.useState(8),[r,m]=i.useState(100),d=(a-t)*r,l=s>=12,h=a*r*.001,g=a*r*.001,j=(l?Math.max(0,d-1e5):d)*(l?.1:.15),T=j*.04,k=j+T,w=d-k-h-g;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Indian Capital Gains Tax Calculator"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Calculate tax on equity gains under Indian tax law (FY 2024-25 rules)."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Buy Price (INR): ",t]}),e.jsx("input",{type:"range",min:"50",max:"5000",step:"10",value:t,onChange:_=>o(parseInt(_.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Sell Price (INR): ",a]}),e.jsx("input",{type:"range",min:"50",max:"5000",step:"10",value:a,onChange:_=>c(parseInt(_.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Holding: ",s," months"]}),e.jsx("input",{type:"range",min:"1",max:"36",step:"1",value:s,onChange:_=>x(parseInt(_.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Quantity: ",r]}),e.jsx("input",{type:"range",min:"1",max:"1000",step:"10",value:r,onChange:_=>m(parseInt(_.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-3 sm:grid-cols-4 text-center text-xs",children:[e.jsxs("div",{className:`rounded-lg p-3 ${l?"bg-green-50 dark:bg-green-900/30":"bg-amber-50 dark:bg-amber-900/30"}`,children:[e.jsx("div",{className:"text-gray-500",children:"Type"}),e.jsx("div",{className:`text-lg font-bold ${l?"text-green-600":"text-amber-600"}`,children:l?"LTCG":"STCG"}),e.jsx("div",{className:"text-[10px]",children:l?"10% > INR 1L":"15% flat"})]}),e.jsxs("div",{className:"rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30",children:[e.jsx("div",{className:"text-gray-500",children:"Gross Gain"}),e.jsxs("div",{className:"text-lg font-bold text-indigo-600",children:["INR ",d.toLocaleString()]})]}),e.jsxs("div",{className:"rounded-lg bg-red-50 p-3 dark:bg-red-900/30",children:[e.jsx("div",{className:"text-gray-500",children:"Total Tax"}),e.jsxs("div",{className:"text-lg font-bold text-red-600",children:["INR ",Math.round(k).toLocaleString()]})]}),e.jsxs("div",{className:"rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30",children:[e.jsx("div",{className:"text-gray-500",children:"Net Gain"}),e.jsxs("div",{className:"text-lg font-bold text-purple-600",children:["INR ",Math.round(w).toLocaleString()]})]})]})]})}function R(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Tax-Aware Rebalancing for Indian Portfolios"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"India’s tax code creates significant incentives for tax-aware portfolio management. The difference between Short-Term Capital Gains (STCG) at 15% and Long-Term Capital Gains (LTCG) at 10% (above INR 1 lakh exemption), combined with STT and the grandfathering provisions, means that tax-naive rebalancing can cost investors 1-2% per year in unnecessary tax drag."}),e.jsx(b,{title:"Indian Equity Tax Structure (FY 2024-25)",label:"Definition 10.2",definition:"For listed equity held on a recognized exchange (NSE/BSE): STCG (holding < 12 months) is taxed at 15% flat. LTCG (holding ≥ 12 months) is taxed at 10% on gains exceeding INR 1,00,000 per financial year, without indexation benefit. STT of 0.1% is charged on delivery transactions (buy and sell). These rates apply to direct equity and equity-oriented mutual funds.",notation:"STCG = Short-Term Capital Gains, LTCG = Long-Term Capital Gains, STT = Securities Transaction Tax"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Indian Tax Rules Summary"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Instrument"}),e.jsx("th",{className:"px-4 py-2 text-center text-gray-600 dark:text-gray-400",children:"STCG Rate"}),e.jsx("th",{className:"px-4 py-2 text-center text-gray-600 dark:text-gray-400",children:"LTCG Rate"}),e.jsx("th",{className:"px-4 py-2 text-center text-gray-600 dark:text-gray-400",children:"LT Threshold"}),e.jsx("th",{className:"px-4 py-2 text-center text-gray-600 dark:text-gray-400",children:"LTCG Exemption"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Listed Equity"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"15%"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"10%"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"12 months"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"INR 1,00,000/yr"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Equity MF/ETF"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"15%"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"10%"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"12 months"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"INR 1,00,000/yr"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Debt MF"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"Slab rate"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"Slab rate"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"N/A (post 2023)"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"None"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Gold/REIT/InvIT"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"Slab rate"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"20% w/ indexation"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"36 months"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"None"})]})]})]})}),e.jsx(C,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Tax-Loss Harvesting"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Tax-loss harvesting (TLH) involves selling losing positions to realize capital losses that offset gains. Under Indian tax law:"}),e.jsx(n.BlockMath,{math:"\\text{Tax Saved} = \\min(\\text{Realized Loss}, \\text{Realized Gain}) \\times \\text{Tax Rate}"}),e.jsxs("ul",{className:"list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4",children:[e.jsx("li",{children:"Short-term losses can offset both STCG and LTCG"}),e.jsx("li",{children:"Long-term losses can only offset LTCG"}),e.jsx("li",{children:"Unabsorbed losses can be carried forward for 8 assessment years"}),e.jsx("li",{children:"Must file ITR within due date to carry forward losses"})]}),e.jsx(y,{title:"tax_aware_rebalancing.py",runnable:!0,code:`import numpy as np

np.random.seed(42)

# Tax-aware rebalancing simulator for Indian portfolio
class IndianTaxEngine:
    def __init__(self):
        self.stcg_rate = 0.15  # 15% for equity
        self.ltcg_rate = 0.10  # 10% for equity
        self.ltcg_exemption = 100000  # INR 1 lakh per FY
        self.lt_threshold_days = 365  # 12 months
        self.stt_rate = 0.001  # 0.1% STT

    def compute_tax(self, buy_price, sell_price, quantity, holding_days):
        gain = (sell_price - buy_price) * quantity
        stt = sell_price * quantity * self.stt_rate

        if gain <= 0:
            return {'tax': 0, 'stt': stt, 'gain': gain, 'type': 'LOSS'}

        if holding_days >= self.lt_threshold_days:
            taxable = max(0, gain - self.ltcg_exemption)
            tax = taxable * self.ltcg_rate
            return {'tax': tax, 'stt': stt, 'gain': gain, 'type': 'LTCG'}
        else:
            tax = gain * self.stcg_rate
            return {'tax': tax, 'stt': stt, 'gain': gain, 'type': 'STCG'}

# Portfolio with lot-level tracking
stocks = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ITC']
lots = [
    {'stock': 'RELIANCE', 'buy_price': 2200, 'qty': 50, 'hold_days': 400, 'current': 2600},
    {'stock': 'RELIANCE', 'buy_price': 2700, 'qty': 30, 'hold_days': 90, 'current': 2600},
    {'stock': 'TCS', 'buy_price': 3200, 'qty': 40, 'hold_days': 500, 'current': 3600},
    {'stock': 'HDFCBANK', 'buy_price': 1700, 'qty': 80, 'hold_days': 200, 'current': 1550},
    {'stock': 'INFY', 'buy_price': 1300, 'qty': 60, 'hold_days': 450, 'current': 1500},
    {'stock': 'ITC', 'buy_price': 400, 'qty': 100, 'hold_days': 100, 'current': 470},
]

tax_engine = IndianTaxEngine()

# Strategy 1: Naive rebalancing (sell proportionally from each lot)
print("=== Strategy 1: Tax-Naive Rebalancing ===")
total_tax_naive = 0
for lot in lots:
    sell_qty = lot['qty'] // 3  # Sell 1/3 of each lot
    result = tax_engine.compute_tax(lot['buy_price'], lot['current'], sell_qty, lot['hold_days'])
    total_tax_naive += result['tax'] + result['stt']
    if sell_qty > 0:
        print(f"  {lot['stock']:10s}: Sell {sell_qty:3d} @ {lot['current']:5d} "
              f"(bought {lot['buy_price']:5d}, {lot['hold_days']:3d}d) -> "
              f"{result['type']:4s} Tax: INR {result['tax']:8.0f}")

print(f"  Total tax (naive): INR {total_tax_naive:,.0f}")

# Strategy 2: Tax-aware (sell LTCG first, harvest losses, use exemption)
print(f"\\n=== Strategy 2: Tax-Aware Rebalancing ===")

# Sort: prioritize (1) losses, (2) LTCG within exemption, (3) LTCG, (4) STCG
sorted_lots = sorted(lots, key=lambda l: (
    0 if l['current'] < l['buy_price'] else 1,  # Losses first
    0 if l['hold_days'] >= 365 else 1,            # LTCG before STCG
    l['current'] - l['buy_price']                  # Smaller gains first
))

total_tax_aware = 0
ltcg_used = 0
for lot in sorted_lots:
    sell_qty = lot['qty'] // 3
    result = tax_engine.compute_tax(lot['buy_price'], lot['current'], sell_qty, lot['hold_days'])

    # Track LTCG exemption usage
    if result['type'] == 'LTCG' and result['gain'] > 0:
        remaining_exemption = max(0, tax_engine.ltcg_exemption - ltcg_used)
        exempt_gain = min(result['gain'], remaining_exemption)
        ltcg_used += exempt_gain
        actual_tax = max(0, result['gain'] - exempt_gain) * tax_engine.ltcg_rate
        result['tax'] = actual_tax

    total_tax_aware += result['tax'] + result['stt']
    if sell_qty > 0:
        print(f"  {lot['stock']:10s}: Sell {sell_qty:3d} @ {lot['current']:5d} "
              f"(bought {lot['buy_price']:5d}, {lot['hold_days']:3d}d) -> "
              f"{result['type']:4s} Tax: INR {result['tax']:8.0f}")

print(f"  Total tax (aware): INR {total_tax_aware:,.0f}")
print(f"  Tax savings: INR {total_tax_naive - total_tax_aware:,.0f} "
      f"({(1 - total_tax_aware/total_tax_naive)*100:.1f}%)")`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"LTCG Exemption Harvesting"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Indian tax law provides a unique opportunity: INR 1,00,000 of LTCG on equity is exempt per financial year. Smart investors can “harvest” this exemption annually:"}),e.jsx(n.BlockMath,{math:"\\text{Annual Tax Alpha} = \\text{LTCG Exemption} \\times \\text{LTCG Rate} = 1,00,000 \\times 10\\% = \\text{INR } 10,000"}),e.jsx(y,{title:"ltcg_harvest.py",runnable:!0,code:`import numpy as np

# LTCG exemption harvesting strategy
initial_investment = 1000000  # INR 10 lakh
annual_return = 0.12  # 12% CAGR
years = 10
ltcg_exemption = 100000
ltcg_rate = 0.10
stt_rate = 0.001

# Strategy A: Buy and hold (sell after 10 years)
final_value_bh = initial_investment * (1 + annual_return) ** years
total_gain_bh = final_value_bh - initial_investment
tax_bh = max(0, total_gain_bh - ltcg_exemption) * ltcg_rate
net_bh = final_value_bh - tax_bh

# Strategy B: Annual harvest (sell and rebuy to reset cost basis)
value = initial_investment
cost_basis = initial_investment
total_tax_harvest = 0
total_stt = 0

for year in range(years):
    value *= (1 + annual_return)
    unrealized_gain = value - cost_basis

    if unrealized_gain > 0:
        # Sell enough to realize up to INR 1L gain
        harvest_fraction = min(1.0, ltcg_exemption / unrealized_gain)
        realized_gain = unrealized_gain * harvest_fraction

        # Tax on excess over exemption
        taxable = max(0, realized_gain - ltcg_exemption)
        tax = taxable * ltcg_rate
        stt = value * harvest_fraction * stt_rate * 2  # Buy + sell

        total_tax_harvest += tax
        total_stt += stt

        # Reset cost basis for harvested portion
        cost_basis = cost_basis * (1 - harvest_fraction) + value * harvest_fraction
        value -= (tax + stt)

# Final sale
final_gain = value - cost_basis
final_tax = max(0, final_gain - ltcg_exemption) * ltcg_rate
total_tax_harvest += final_tax
net_harvest = value - final_tax

print("=== LTCG Exemption Harvesting Analysis ===")
print(f"Initial Investment: INR {initial_investment:,.0f}")
print(f"Annual Return: {annual_return:.0%}, Period: {years} years")
print(f"\\nStrategy A: Buy and Hold")
print(f"  Final Value: INR {final_value_bh:,.0f}")
print(f"  Total LTCG:  INR {total_gain_bh:,.0f}")
print(f"  Tax:         INR {tax_bh:,.0f}")
print(f"  Net Value:   INR {net_bh:,.0f}")
print(f"\\nStrategy B: Annual Harvest")
print(f"  Final Value: INR {value:,.0f}")
print(f"  Total Tax:   INR {total_tax_harvest:,.0f}")
print(f"  Total STT:   INR {total_stt:,.0f}")
print(f"  Net Value:   INR {net_harvest:,.0f}")
print(f"\\nBenefit of Harvesting: INR {net_harvest - net_bh:,.0f} "
      f"({(net_harvest/net_bh - 1)*100:.2f}%)")`}),e.jsx(v,{title:"Tax-Lot Selection for Rebalancing",difficulty:"intermediate",problem:"You hold 3 lots of Reliance: (1) 50 shares bought at INR 2200, 14 months ago, (2) 30 shares at INR 2700, 3 months ago, (3) 20 shares at INR 2400, 8 months ago. Current price: INR 2600. You need to sell 30 shares. Which lots minimize tax?",solution:[{step:"Evaluate each lot",formula:"\\text{Lot 1: LTCG} = (2600-2200) \\times 50 = 20000 \\text{ (10\\% tax)}",explanation:"Lot 1 is LTCG (>12 months). Gain = INR 400/share."},{step:"Evaluate Lot 2 and 3",formula:"\\text{Lot 2: STCG loss} = (2600-2700) \\times 30 = -3000, \\quad \\text{Lot 3: STCG} = (2600-2400) \\times 20 = 4000",explanation:"Lot 2 has a loss (tax-free and offsets gains). Lot 3 is STCG at 15%."},{step:"Optimal selection",formula:"\\text{Sell all 30 from Lot 2 (STCG loss of INR 3000)}",explanation:"Selling Lot 2 realizes a loss that can offset other gains. Tax = INR 0. If Lot 1 were sold instead, tax = INR 2000 (LTCG within exemption)."}]}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Tax-aware rebalancing can save 0.5-1.5% per year for Indian investors. Key strategies: (1) harvest LTCG exemption of INR 1 lakh annually, (2) sell loss-making lots first (FIFO is not mandatory for shares in demat), (3) prefer selling LTCG over STCG lots, (4) time rebalancing to cross the 12-month threshold, and (5) use SIP redirects and dividend reinvestment for tax-free rebalancing."})})]})}const ee=Object.freeze(Object.defineProperty({__proto__:null,default:R},Symbol.toStringTag,{value:"Module"}));function A(){const[t,o]=i.useState(500),[a,c]=i.useState(40),[s,x]=i.useState(5),r=t*(1-a/100),m=r*.0015,d=r/s,l=15*Math.sqrt(d/500),h=r*l/1e4,p=(m+h)/t*1e4;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Portfolio Transition Cost Estimator"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Estimate transition costs for restructuring an Indian institutional portfolio."}),e.jsxs("div",{className:"mb-4 grid grid-cols-3 gap-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Portfolio (INR Cr): ",t]}),e.jsx("input",{type:"range",min:"50",max:"5000",step:"50",value:t,onChange:u=>o(parseInt(u.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Overlap: ",a,"%"]}),e.jsx("input",{type:"range",min:"0",max:"80",step:"5",value:a,onChange:u=>c(parseInt(u.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Trading Days: ",s]}),e.jsx("input",{type:"range",min:"1",max:"20",step:"1",value:s,onChange:u=>x(parseInt(u.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-4 gap-2 text-center text-xs",children:[e.jsxs("div",{className:"rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30",children:[e.jsx("div",{className:"text-gray-500",children:"Net Trade"}),e.jsxs("div",{className:"text-lg font-bold text-indigo-600",children:[r.toFixed(0)," Cr"]})]}),e.jsxs("div",{className:"rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30",children:[e.jsx("div",{className:"text-gray-500",children:"Explicit TC"}),e.jsxs("div",{className:"text-lg font-bold text-amber-600",children:[m.toFixed(1)," Cr"]})]}),e.jsxs("div",{className:"rounded-lg bg-red-50 p-3 dark:bg-red-900/30",children:[e.jsx("div",{className:"text-gray-500",children:"Impact Cost"}),e.jsxs("div",{className:"text-lg font-bold text-red-600",children:[h.toFixed(1)," Cr"]})]}),e.jsxs("div",{className:"rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30",children:[e.jsx("div",{className:"text-gray-500",children:"Total (bps)"}),e.jsx("div",{className:"text-lg font-bold text-purple-600",children:p.toFixed(1)})]})]})]})}function P(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Portfolio Transition Management"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Portfolio transitions involve restructuring large portfolios from one set of holdings to another. For Indian institutional investors like EPFO, NPS, and insurance companies, transitions can involve moving hundreds of crores across NSE-listed stocks while minimizing market impact and tracking error during the transition period."}),e.jsx(b,{title:"Implementation Shortfall",label:"Definition 10.3",definition:"Implementation shortfall (IS) is the difference between the paper return of a portfolio decision and the actual return achieved after accounting for all trading costs. IS = (Paper Portfolio Value - Actual Portfolio Value) / Paper Portfolio Value. It captures explicit costs (STT, brokerage), implicit costs (spread, market impact), and opportunity cost (delay, missed trades).",notation:"IS = implementation shortfall, paper portfolio = ideal execution at decision prices"}),e.jsx(n.BlockMath,{math:"\\text{IS} = \\underbrace{\\text{Delay Cost}}_{\\text{Opportunity}} + \\underbrace{\\text{Market Impact}}_{\\text{Price Movement}} + \\underbrace{\\text{Explicit Costs}}_{\\text{STT, Brokerage}} + \\underbrace{\\text{Timing Risk}}_{\\text{Vol During Transition}}"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Transition Cost Components"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For large Indian institutional transitions, the cost breakdown is typically:"}),e.jsx(n.BlockMath,{math:"\\text{TC}_{\\text{total}} = \\sum_{i=1}^{n} |\\Delta w_i| \\cdot V \\cdot \\left(c_{\\text{explicit}} + \\sigma_i \\eta \\sqrt{\\frac{|\\Delta w_i| V}{V_i^{\\text{ADV}}}}\\right)"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(n.InlineMath,{math:"V"})," is portfolio value, ",e.jsx(n.InlineMath,{math:"V_i^{\\text{ADV}}"}),"is average daily volume, ",e.jsx(n.InlineMath,{math:"\\eta \\approx 0.1\\text{-}0.2"})," is the impact coefficient, and ",e.jsx(n.InlineMath,{math:"c_{\\text{explicit}} \\approx 15"})," bps for Indian equities."]}),e.jsx(N,{title:"Optimal Transition Speed",label:"Theorem 10.2",statement:"For a portfolio transition of size X with temporary impact coefficient η and daily volatility σ, the optimal number of trading days to complete the transition is T* = √(X·η/(σ²·λ)), where λ is the urgency cost parameter.",proof:"The total cost as a function of trading duration T is TC(T) = η·(X/T) + λ·σ²·T, where the first term is market impact and the second is opportunity cost from being out of position. Setting dTC/dT = 0 yields T* = √(X·η/(σ²·λ))."}),e.jsx(A,{}),e.jsx(y,{title:"transition_management.py",runnable:!0,code:`import numpy as np

# Portfolio transition: old benchmark to new benchmark
legacy = {'RELIANCE': 0.15, 'TCS': 0.12, 'HDFCBANK': 0.18, 'INFY': 0.08,
          'ITC': 0.12, 'LT': 0.10, 'SBIN': 0.15, 'BHARTIARTL': 0.10}
target = {'RELIANCE': 0.12, 'TCS': 0.15, 'HDFCBANK': 0.12, 'INFY': 0.10,
          'ITC': 0.08, 'LT': 0.08, 'SBIN': 0.10, 'BHARTIARTL': 0.05,
          'AXISBANK': 0.10, 'MARUTI': 0.10}

portfolio_value = 1000  # INR crore
all_stocks = sorted(set(list(legacy.keys()) + list(target.keys())))

adv = {'RELIANCE': 3000, 'TCS': 800, 'HDFCBANK': 2500, 'INFY': 1200,
       'ITC': 1500, 'LT': 600, 'SBIN': 2000, 'BHARTIARTL': 800,
       'AXISBANK': 1000, 'MARUTI': 400}
daily_vol = {'RELIANCE': 0.018, 'TCS': 0.015, 'HDFCBANK': 0.014,
             'INFY': 0.016, 'ITC': 0.013, 'LT': 0.019, 'SBIN': 0.020,
             'BHARTIARTL': 0.017, 'AXISBANK': 0.019, 'MARUTI': 0.018}

eta = 0.15
total_explicit = 0
total_impact = 0

print("=== Portfolio Transition Analysis ===")
print(f"Portfolio: INR {portfolio_value} Cr")
print(f"\\n{'Stock':<12} {'Legacy':>8} {'Target':>8} {'Trade':>8} {'Value(Cr)':>10} {'Impact(bp)':>10}")
print("-" * 62)

for stock in all_stocks:
    w_old = legacy.get(stock, 0)
    w_new = target.get(stock, 0)
    trade = w_new - w_old
    trade_value = abs(trade) * portfolio_value
    if trade_value < 0.01:
        continue
    pct_adv = trade_value / adv.get(stock, 500)
    impact = daily_vol.get(stock, 0.017) * eta * np.sqrt(pct_adv) * 10000
    total_explicit += trade_value * 0.0015
    total_impact += trade_value * impact / 10000
    print(f"{stock:<12} {w_old:>8.2%} {w_new:>8.2%} {trade:>+8.2%} {trade_value:>10.1f} {impact:>10.1f}")

print(f"\\nExplicit cost: INR {total_explicit:.2f} Cr ({total_explicit/portfolio_value*10000:.1f} bps)")
print(f"Impact cost:   INR {total_impact:.2f} Cr ({total_impact/portfolio_value*10000:.1f} bps)")
print(f"Total cost:    INR {total_explicit+total_impact:.2f} Cr ({(total_explicit+total_impact)/portfolio_value*10000:.1f} bps)")`}),e.jsx(v,{title:"NPS Fund Manager Transition",difficulty:"advanced",problem:"NPS Tier I equity transitions INR 2000 Cr from SBI MF to HDFC MF with 40% holdings overlap. Estimate total transition cost assuming 5 trading days.",solution:[{step:"Compute net transition",formula:"\\text{Net} = 2000 \\times (1 - 0.40) = 1200 \\text{ Cr}",explanation:"40% overlap means only 60% needs trading."},{step:"Explicit costs (STT + brokerage)",formula:"\\text{Explicit} = 1200 \\times 0.0015 = 1.8 \\text{ Cr (15 bps)}"},{step:"Market impact (5-day execution)",formula:"\\text{Impact} \\approx 1200 \\times 0.0020 = 2.4 \\text{ Cr (20 bps)}",explanation:"Large-cap NPS stocks have ~20 bps impact when spread over 5 days."}]}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Portfolio transitions require careful pre-trade analysis and execution planning. For Indian institutional portfolios, maximizing overlap between legacy and target reduces costs dramatically. Use crossing networks, dark pools (where available on NSE), and multi-day execution to minimize impact. Total costs typically range from 25-80 bps for Nifty 50-level stocks."})})]})}const te=Object.freeze(Object.defineProperty({__proto__:null,default:P},Symbol.toStringTag,{value:"Module"}));function F(){const[t,o]=i.useState(55),[a,c]=i.useState(1.5),[s,x]=i.useState(50),r=t/100,m=1-r,d=(a*r-m)/a,l=d/2,h=s*l;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Kelly Criterion Calculator"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Calculate optimal position size for Indian stock trades."}),e.jsxs("div",{className:"mb-4 grid grid-cols-3 gap-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Win Rate: ",t,"%"]}),e.jsx("input",{type:"range",min:"30",max:"80",step:"1",value:t,onChange:g=>o(parseInt(g.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Win/Loss Ratio: ",a.toFixed(1)]}),e.jsx("input",{type:"range",min:"0.5",max:"4.0",step:"0.1",value:a,onChange:g=>c(parseFloat(g.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Capital (Lakh): ",s]}),e.jsx("input",{type:"range",min:"5",max:"500",step:"5",value:s,onChange:g=>x(parseInt(g.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-3 text-center text-xs",children:[e.jsxs("div",{className:"rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30",children:[e.jsx("div",{className:"text-gray-500",children:"Full Kelly"}),e.jsxs("div",{className:"text-lg font-bold text-indigo-600",children:[(d*100).toFixed(1),"%"]})]}),e.jsxs("div",{className:"rounded-lg bg-green-50 p-3 dark:bg-green-900/30",children:[e.jsx("div",{className:"text-gray-500",children:"Half Kelly"}),e.jsxs("div",{className:"text-lg font-bold text-green-600",children:[(l*100).toFixed(1),"%"]})]}),e.jsxs("div",{className:"rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30",children:[e.jsx("div",{className:"text-gray-500",children:"Position Size"}),e.jsxs("div",{className:"text-lg font-bold text-amber-600",children:["INR ",h.toFixed(1),"L"]})]})]})]})}function E(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Kelly Criterion for Indian Portfolios"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"The Kelly criterion, developed by John Larry Kelly Jr. at Bell Labs in 1956, provides the mathematically optimal fraction of capital to risk on each trade. It maximizes the long-term compound growth rate while naturally controlling risk. For Indian market practitioners trading on NSE/BSE, Kelly-based sizing provides a disciplined alternative to ad-hoc position sizing."}),e.jsx(b,{title:"Kelly Fraction",label:"Definition 10.4",definition:"The Kelly fraction f* is the proportion of capital to bet that maximizes the expected logarithm of wealth (geometric growth rate). For a binary bet with win probability p and odds b (profit per unit risked), f* = (bp - (1-p))/b = p - q/b where q = 1-p.",notation:"f* = optimal fraction, p = win probability, b = win/loss ratio, q = 1-p"}),e.jsx(n.BlockMath,{math:"f^* = \\frac{bp - q}{b} = \\frac{bp - (1-p)}{b}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["For continuous returns with mean ",e.jsx(n.InlineMath,{math:"\\mu"})," and variance ",e.jsx(n.InlineMath,{math:"\\sigma^2"}),", the Kelly fraction simplifies to:"]}),e.jsx(n.BlockMath,{math:"f^* = \\frac{\\mu}{\\sigma^2} = \\frac{\\text{Expected Excess Return}}{\\text{Variance}}"}),e.jsx(N,{title:"Optimality of Kelly Criterion",label:"Theorem 10.3",statement:"The Kelly fraction maximizes the expected log-wealth E[log(W_T)] = Σ E[log(1 + f·Rₜ)]. Among all fixed-fraction strategies, Kelly achieves the highest geometric growth rate asymptotically. Moreover, any strategy betting more than Kelly (f > f*) has lower growth rate AND higher variance.",proof:"G(f) = E[log(1+fR)] is concave in f. The maximum is at f* where G'(f*) = E[R/(1+f*R)] = 0. For f > f*, G(f) < G(f*) by concavity. The variance of log-wealth is proportional to f², so over-betting increases both risk and reduces growth."}),e.jsx(F,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Fractional Kelly for Practical Trading"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["Full Kelly betting leads to extreme drawdowns in practice. Most quantitative traders use ",e.jsx("strong",{children:"half-Kelly"})," or ",e.jsx("strong",{children:"quarter-Kelly"}),":"]}),e.jsx(n.BlockMath,{math:"f_{\\text{practical}} = \\alpha \\cdot f^*, \\quad \\alpha \\in \\{0.25, 0.50\\}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Half-Kelly achieves 75% of the full Kelly growth rate with significantly lower drawdowns, making it the standard choice for Indian portfolio managers."}),e.jsx(y,{title:"kelly_nse_portfolio.py",runnable:!0,code:`import numpy as np

np.random.seed(42)

# Kelly sizing for NSE stock portfolio
stocks = {
    'RELIANCE': {'annual_ret': 0.15, 'annual_vol': 0.28},
    'TCS':      {'annual_ret': 0.13, 'annual_vol': 0.22},
    'HDFCBANK': {'annual_ret': 0.12, 'annual_vol': 0.22},
    'INFY':     {'annual_ret': 0.14, 'annual_vol': 0.24},
    'ITC':      {'annual_ret': 0.10, 'annual_vol': 0.20},
    'AXISBANK': {'annual_ret': 0.18, 'annual_vol': 0.30},
}

rf = 0.065

print("=== Kelly Criterion for NSE Stocks ===")
print(f"\\n{'Stock':<12} {'Excess':>8} {'Vol':>8} {'Kelly':>8} {'Half':>8} {'Sharpe':>8}")
print("-" * 55)

for stock, p in stocks.items():
    excess = p['annual_ret'] - rf
    kelly = excess / p['annual_vol']**2
    sharpe = excess / p['annual_vol']
    print(f"{stock:<12} {excess:>8.2%} {p['annual_vol']:>8.2%} "
          f"{kelly:>8.2f} {kelly/2:>8.2f} {sharpe:>8.3f}")

# Multi-asset Kelly
print("\\n=== Multi-Asset Kelly (Markowitz Connection) ===")
n = len(stocks)
mu = np.array([s['annual_ret'] - rf for s in stocks.values()])
vols = np.array([s['annual_vol'] for s in stocks.values()])
corr = np.eye(n) * 0.5 + 0.5
np.fill_diagonal(corr, 1.0)
Sigma = np.outer(vols, vols) * corr

kelly_multi = np.linalg.inv(Sigma) @ mu
kelly_half = kelly_multi / 2

names = list(stocks.keys())
print(f"\\n{'Stock':<12} {'Full Kelly':>10} {'Half Kelly':>10}")
for name, kf, kh in zip(names, kelly_multi, kelly_half):
    print(f"{name:<12} {kf:>10.4f} {kh:>10.4f}")
print(f"\\nSum of weights: Full={sum(kelly_multi):.2f}, Half={sum(kelly_half):.2f}")`}),e.jsx(v,{title:"Kelly Sizing for Nifty 50 Mean-Reversion",difficulty:"intermediate",problem:"A mean-reversion strategy on Nifty 50 has win rate 58%, average win 1.8x average loss, and capital of INR 1 Cr. Compute position size.",solution:[{step:"Compute Kelly fraction",formula:"f^* = \\frac{b \\cdot p - q}{b} = \\frac{1.8 \\times 0.58 - 0.42}{1.8} = \\frac{0.624}{1.8} = 0.347"},{step:"Apply half-Kelly",formula:"f_{\\text{half}} = 0.347 / 2 = 0.173 = 17.3\\%"},{step:"Position size",formula:"\\text{Position} = 1,00,00,000 \\times 0.173 = 17,30,000 \\text{ INR}",explanation:"Allocate INR 17.3 lakh per trade on a INR 1 Cr account."}]}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"The Kelly criterion provides a principled, mathematically optimal approach to position sizing. For Indian markets, use half-Kelly to balance growth against drawdown risk. The multi-asset Kelly is equivalent to Markowitz optimization with risk aversion of 1, connecting position sizing theory to portfolio optimization."})})]})}const ae=Object.freeze(Object.defineProperty({__proto__:null,default:E},Symbol.toStringTag,{value:"Module"}));function M(){const[t,o]=i.useState(2500),[a,c]=i.useState(5),[s,x]=i.useState(3),[r,m]=i.useState(2700),d=t*(1-a/100),h=Math.max(t,r)*(1-s/100),g=Math.max(d,h),p=r<=g;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Stop-Loss Calculator"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Configure fixed and trailing stop-losses for NSE stock positions."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Entry: INR ",t]}),e.jsx("input",{type:"range",min:"500",max:"5000",step:"50",value:t,onChange:u=>o(parseInt(u.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Fixed Stop: ",a,"%"]}),e.jsx("input",{type:"range",min:"1",max:"15",step:"0.5",value:a,onChange:u=>c(parseFloat(u.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Trail: ",s,"%"]}),e.jsx("input",{type:"range",min:"1",max:"10",step:"0.5",value:s,onChange:u=>x(parseFloat(u.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Current: INR ",r]}),e.jsx("input",{type:"range",min:"500",max:"5000",step:"50",value:r,onChange:u=>m(parseInt(u.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-4 gap-2 text-center text-xs",children:[e.jsxs("div",{className:"rounded-lg bg-indigo-50 p-2 dark:bg-indigo-900/30",children:[e.jsx("div",{className:"text-gray-500",children:"Fixed Stop"}),e.jsxs("div",{className:"text-sm font-bold text-indigo-600",children:["INR ",d.toFixed(0)]})]}),e.jsxs("div",{className:"rounded-lg bg-amber-50 p-2 dark:bg-amber-900/30",children:[e.jsx("div",{className:"text-gray-500",children:"Trailing Stop"}),e.jsxs("div",{className:"text-sm font-bold text-amber-600",children:["INR ",h.toFixed(0)]})]}),e.jsxs("div",{className:"rounded-lg bg-purple-50 p-2 dark:bg-purple-900/30",children:[e.jsx("div",{className:"text-gray-500",children:"Active Stop"}),e.jsxs("div",{className:"text-sm font-bold text-purple-600",children:["INR ",g.toFixed(0)]})]}),e.jsxs("div",{className:`rounded-lg p-2 ${p?"bg-red-50 dark:bg-red-900/30":"bg-green-50 dark:bg-green-900/30"}`,children:[e.jsx("div",{className:"text-gray-500",children:"Status"}),e.jsx("div",{className:`text-sm font-bold ${p?"text-red-600":"text-green-600"}`,children:p?"TRIGGERED":"Active"})]})]})]})}function q(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Stop-Loss Strategies on NSE"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Stop-loss orders are fundamental risk management tools that automatically exit positions when prices move against the trader. On NSE, stop-loss orders (SL and SL-M) are natively supported by the exchange order matching system. Understanding the mechanics, types, and optimal calibration of stop-losses is critical for Indian market participants."}),e.jsx(b,{title:"Stop-Loss Order Types on NSE",label:"Definition 10.5",definition:"NSE supports two stop-loss order types: SL (Stop-Loss Limit) triggers a limit order when the trigger price is hit, and SL-M (Stop-Loss Market) triggers a market order. SL orders may not execute if price gaps beyond the limit; SL-M guarantees execution but at potentially worse prices. The trigger price must be set above LTP for buy SL and below LTP for sell SL.",notation:"SL = Stop-Loss Limit, SL-M = Stop-Loss Market, LTP = Last Traded Price"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"ATR-Based Stop-Loss"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The Average True Range (ATR) provides a volatility-adaptive stop-loss distance:"}),e.jsx(n.BlockMath,{math:"\\text{Stop} = \\text{Entry} - k \\times \\text{ATR}(n)"}),e.jsx(n.BlockMath,{math:"\\text{ATR}(n) = \\frac{1}{n}\\sum_{t=1}^{n} \\max(H_t - L_t, |H_t - C_{t-1}|, |L_t - C_{t-1}|)"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["Typical values: ",e.jsx(n.InlineMath,{math:"k = 2\\text{-}3"})," for swing trades,",e.jsx(n.InlineMath,{math:"k = 1\\text{-}1.5"})," for intraday. Using ATR adapts the stop to current market volatility -- wider stops during volatile periods, tighter when calm."]}),e.jsx(N,{title:"Optimal Stop-Loss Width",label:"Theorem 10.4",statement:"For a momentum strategy with signal Sharpe ratio S and normally distributed returns, the optimal stop-loss maximizes the truncated Sharpe ratio. The optimal stop is approximately δ* = σ·√(2·ln(1/α)) where α is the desired probability of being stopped out on noise.",proof:"The stop-loss truncates the return distribution. The expected return of the truncated distribution is E[R|R>-δ] = μ + σ·φ(d)/Φ(d) where d = (δ+μ)/σ. Maximizing the Sharpe of the truncated distribution yields the result."}),e.jsx(M,{}),e.jsx(y,{title:"stop_loss_backtest_nse.py",runnable:!0,code:`import numpy as np

np.random.seed(42)

# Backtest stop-loss strategies on simulated Nifty 50 trades
n_trades = 1000
win_rate = 0.52
avg_win = 0.03  # 3% average win
avg_loss = -0.02  # 2% average loss

# Generate trade returns (mixture of wins and losses)
wins = np.random.exponential(avg_win, int(n_trades * win_rate))
losses = -np.random.exponential(-avg_loss, int(n_trades * (1 - win_rate)))
all_returns = np.concatenate([wins, losses])
np.random.shuffle(all_returns)

strategies = {
    'No Stop': {'stop': -1.0, 'trail': None},
    'Fixed 2%': {'stop': -0.02, 'trail': None},
    'Fixed 5%': {'stop': -0.05, 'trail': None},
    'Trail 3%': {'stop': -0.03, 'trail': 0.03},
    'ATR 2x': {'stop': -0.028, 'trail': None},  # ~2x simulated ATR
}

print("=== Stop-Loss Strategy Comparison (1000 Nifty Trades) ===")
print(f"\\n{'Strategy':<15} {'Avg Ret':>8} {'Win%':>8} {'MaxDD':>8} {'Sharpe':>8} {'Profit Factor':>13}")
print("-" * 65)

for name, params in strategies.items():
    modified_returns = []
    max_intra = 0

    for r in all_returns:
        if params['stop'] > -1.0 and r < params['stop']:
            modified_returns.append(params['stop'])
        elif params['trail'] and r > params['trail']:
            # Trailing stop locks in some profit
            modified_returns.append(r * 0.85)  # Keep 85% of gains
        else:
            modified_returns.append(r)

    rets = np.array(modified_returns)
    cumulative = np.cumprod(1 + rets)
    max_dd = np.min(cumulative / np.maximum.accumulate(cumulative) - 1)
    wins_sum = np.sum(rets[rets > 0])
    losses_sum = abs(np.sum(rets[rets < 0]))
    pf = wins_sum / losses_sum if losses_sum > 0 else float('inf')

    print(f"{name:<15} {np.mean(rets):>8.4f} {np.mean(rets>0)*100:>7.1f}% "
          f"{max_dd:>8.2%} {np.mean(rets)/np.std(rets)*np.sqrt(252):>8.3f} {pf:>13.3f}")`}),e.jsx(v,{title:"Chandelier Exit for Nifty Swing Trade",difficulty:"intermediate",problem:"You enter RELIANCE at INR 2500. The 14-day ATR is INR 45. Using a 3x ATR chandelier exit, what is the initial stop? If price rises to INR 2650, where does the trailing stop move?",solution:[{step:"Initial stop",formula:"\\text{Stop}_0 = 2500 - 3 \\times 45 = 2500 - 135 = \\text{INR } 2365"},{step:"After price rises to INR 2650",formula:"\\text{Stop}_1 = 2650 - 3 \\times 45 = 2650 - 135 = \\text{INR } 2515",explanation:"The trailing stop ratchets up with price, locking in profit. Note the stop never moves down."},{step:"Risk-reward check",formula:"\\text{Risk} = 2500 - 2365 = 135, \\quad \\text{Reward so far} = 2650 - 2500 = 150",explanation:"R:R = 1.11:1 at current level. The trailing stop ensures at least INR 15 profit per share."}]}),e.jsx(f,{title:"NSE-Specific Stop-Loss Tips",type:"tip",children:e.jsxs("ul",{className:"space-y-1 list-disc list-inside",children:[e.jsx("li",{children:"Use SL-M for liquid stocks (Nifty 50), SL-Limit for less liquid mid-caps"}),e.jsx("li",{children:"NSE has circuit breakers at 5/10/15/20% -- stops may not trigger in circuit freeze"}),e.jsx("li",{children:"AMO (After Market Orders) can set stops before market opens on Zerodha/Kite"}),e.jsx("li",{children:"GTT (Good Till Triggered) on Zerodha allows multi-day stop-loss orders"}),e.jsx("li",{children:"Avoid placing stops at round numbers (INR 2500, 3000) as these are obvious levels"})]})}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Stop-losses are essential risk management for Indian equity trading. ATR-based stops adapt to volatility, trailing stops lock in profits, and the choice between SL and SL-M depends on liquidity. Backtesting shows that well-calibrated stops improve the Sharpe ratio by 0.1-0.3 for typical NSE trading strategies."})})]})}const re=Object.freeze(Object.defineProperty({__proto__:null,default:q},Symbol.toStringTag,{value:"Module"}));function G(){const[t,o]=i.useState("normal"),a=[["Nifty-Gold",.08,.45],["Nifty-GSec",-.12,.35],["Nifty-BankNifty",.85,.95],["IT-Pharma",.25,.68],["Metal-Energy",.55,.88]];return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Correlation Regime Shift"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Toggle between normal and crisis regimes to see how Indian asset correlations change."}),e.jsxs("div",{className:"mb-4 flex gap-4 justify-center",children:[e.jsx("button",{onClick:()=>o("normal"),className:`px-4 py-2 rounded text-sm font-semibold ${t==="normal"?"bg-green-500 text-white":"bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`,children:"Normal Market"}),e.jsx("button",{onClick:()=>o("crisis"),className:`px-4 py-2 rounded text-sm font-semibold ${t==="crisis"?"bg-red-500 text-white":"bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`,children:"Crisis Mode"})]}),e.jsx("div",{className:"space-y-2",children:a.map(([c,s,x],r)=>{const m=t==="normal"?s:x,d=Math.abs(m)*200,l=m>0?"#ef4444":"#22c55e";return e.jsxs("div",{className:"flex items-center gap-3 text-xs",children:[e.jsx("span",{className:"w-28 text-right text-gray-600 dark:text-gray-400",children:c}),e.jsx("div",{className:"flex-1 h-5 bg-gray-100 dark:bg-gray-800 rounded relative",children:e.jsx("div",{className:"absolute h-5 rounded",style:{width:`${d}px`,backgroundColor:l,opacity:.6}})}),e.jsx("span",{className:"w-12 font-mono font-bold",style:{color:l},children:m.toFixed(2)})]},r)})})]})}function L(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Correlation Breakdown in Indian Market Crises"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"One of the most dangerous phenomena in portfolio management is correlation breakdown during crises. Assets that appear diversifying in normal times become highly correlated during market stress, precisely when diversification is needed most. India has experienced several such episodes: the 2008 Global Financial Crisis, the 2013 Taper Tantrum, the 2018 IL&FS crisis, and the 2020 COVID crash."}),e.jsx(b,{title:"Correlation Breakdown",label:"Definition 10.6",definition:"Correlation breakdown (or asymmetric correlation) refers to the tendency of asset correlations to increase during market downturns. Formally, Corr(Rᵢ, Rⱼ | R_m < q_α) > Corr(Rᵢ, Rⱼ | R_m > q_{1-α}), where R_m is the market return and q_α is the α-quantile.",notation:"Correlation is regime-dependent: ρ_crisis >> ρ_normal for most risky assets"}),e.jsx(n.BlockMath,{math:"\\rho_{\\text{crisis}} = \\rho_{\\text{normal}} + \\Delta\\rho, \\quad \\Delta\\rho > 0 \\text{ for equity-like assets}"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Indian Market Crisis Episodes"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"Crisis"}),e.jsx("th",{className:"px-3 py-2 text-center text-gray-600 dark:text-gray-400",children:"Nifty Drawdown"}),e.jsx("th",{className:"px-3 py-2 text-center text-gray-600 dark:text-gray-400",children:"Avg Correlation"}),e.jsx("th",{className:"px-3 py-2 text-center text-gray-600 dark:text-gray-400",children:"India VIX Peak"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2",children:"GFC 2008"}),e.jsx("td",{className:"px-3 py-2 text-center text-red-600",children:"-60%"}),e.jsx("td",{className:"px-3 py-2 text-center",children:"0.85 (from 0.45)"}),e.jsx("td",{className:"px-3 py-2 text-center",children:"85"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2",children:"Taper Tantrum 2013"}),e.jsx("td",{className:"px-3 py-2 text-center text-red-600",children:"-12%"}),e.jsx("td",{className:"px-3 py-2 text-center",children:"0.65 (from 0.40)"}),e.jsx("td",{className:"px-3 py-2 text-center",children:"28"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2",children:"IL&FS 2018"}),e.jsx("td",{className:"px-3 py-2 text-center text-red-600",children:"-17%"}),e.jsx("td",{className:"px-3 py-2 text-center",children:"0.72 (from 0.42)"}),e.jsx("td",{className:"px-3 py-2 text-center",children:"25"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-3 py-2",children:"COVID 2020"}),e.jsx("td",{className:"px-3 py-2 text-center text-red-600",children:"-38%"}),e.jsx("td",{className:"px-3 py-2 text-center",children:"0.92 (from 0.48)"}),e.jsx("td",{className:"px-3 py-2 text-center",children:"84"})]})]})]})}),e.jsx(G,{}),e.jsx(N,{title:"Asymmetric Dependence",label:"Theorem 10.5",statement:"Under multivariate normality, the conditional correlation given negative returns equals the unconditional correlation. The observed increase in correlations during crises implies that Indian stock returns are NOT multivariate normal -- they exhibit asymmetric tail dependence, which can be modeled via copulas or regime-switching models.",proof:"For bivariate normal (X,Y), Corr(X,Y|X<c) = ρ for all c (Forbes and Rigobon, 2002, after bias correction). Empirical evidence of ρ_down > ρ_up thus rejects normality."}),e.jsx(y,{title:"correlation_crisis_india.py",runnable:!0,code:`import numpy as np

np.random.seed(42)

# Simulate Indian market with regime-switching correlations
T = 252 * 15  # 15 years
n = 4
assets = ['Nifty 50', 'Bank Nifty', 'Gold', 'G-Sec']

# Normal regime
mu_normal = np.array([0.12, 0.14, 0.08, 0.07]) / 252
vol_normal = np.array([0.18, 0.24, 0.15, 0.06]) / np.sqrt(252)
corr_normal = np.array([
    [1.0, 0.82, 0.08, -0.12],
    [0.82, 1.0, 0.05, -0.15],
    [0.08, 0.05, 1.0, 0.15],
    [-0.12, -0.15, 0.15, 1.0]
])

# Crisis regime
mu_crisis = np.array([-0.30, -0.40, 0.15, 0.10]) / 252
vol_crisis = np.array([0.40, 0.50, 0.25, 0.10]) / np.sqrt(252)
corr_crisis = np.array([
    [1.0, 0.95, 0.35, 0.30],
    [0.95, 1.0, 0.30, 0.25],
    [0.35, 0.30, 1.0, 0.20],
    [0.30, 0.25, 0.20, 1.0]
])

cov_normal = np.outer(vol_normal, vol_normal) * corr_normal
cov_crisis = np.outer(vol_crisis, vol_crisis) * corr_crisis

# Generate regime-switching returns
crisis_prob = 0.03
returns = np.zeros((T, n))
regimes = np.zeros(T)
in_crisis = False

for t in range(T):
    if in_crisis:
        in_crisis = np.random.random() > 0.08  # ~12 day avg crisis
    else:
        in_crisis = np.random.random() < crisis_prob

    regimes[t] = 1 if in_crisis else 0
    if in_crisis:
        returns[t] = np.random.multivariate_normal(mu_crisis, cov_crisis)
    else:
        returns[t] = np.random.multivariate_normal(mu_normal, cov_normal)

# Analyze
normal_mask = regimes == 0
crisis_mask = regimes == 1

print("=== Correlation Analysis: Normal vs Crisis ===")
print(f"Normal days: {np.sum(normal_mask)}, Crisis days: {np.sum(crisis_mask)}")
print(f"\\nCorrelations (Normal):")
corr_n = np.corrcoef(returns[normal_mask].T)
for i in range(n):
    for j in range(i+1, n):
        print(f"  {assets[i]:12s} - {assets[j]:12s}: {corr_n[i,j]:.4f}")

print(f"\\nCorrelations (Crisis):")
corr_c = np.corrcoef(returns[crisis_mask].T)
for i in range(n):
    for j in range(i+1, n):
        print(f"  {assets[i]:12s} - {assets[j]:12s}: {corr_c[i,j]:.4f} (delta: {corr_c[i,j]-corr_n[i,j]:+.4f})")

# Portfolio impact
w = np.array([0.60, 0.10, 0.15, 0.15])
vol_normal_port = np.std(returns[normal_mask] @ w) * np.sqrt(252)
vol_crisis_port = np.std(returns[crisis_mask] @ w) * np.sqrt(252)
print(f"\\nPortfolio (60/10/15/15) Volatility:")
print(f"  Normal: {vol_normal_port:.2%}")
print(f"  Crisis: {vol_crisis_port:.2%} ({vol_crisis_port/vol_normal_port:.1f}x)")`}),e.jsx(v,{title:"COVID 2020 Correlation Spike",difficulty:"intermediate",problem:"During March 2020, the correlation between Nifty 50 and Bank Nifty rose from 0.82 to 0.95, and Nifty-Gold from 0.08 to 0.35. A portfolio is 60% Nifty, 20% Bank Nifty, 20% Gold. By how much did portfolio vol increase due to correlation changes alone?",solution:[{step:"Portfolio variance with normal correlations",formula:"\\sigma^2_{\\text{normal}} = 0.6^2 \\times 0.18^2 + 0.2^2 \\times 0.24^2 + 0.2^2 \\times 0.15^2 + 2 \\times \\text{cross terms}",explanation:"Using normal-regime correlations and volatilities."},{step:"Portfolio variance with crisis correlations (same vols)",formula:"\\sigma^2_{\\text{crisis}} = \\text{same diag terms} + 2 \\times \\text{higher cross terms}",explanation:"Only changing correlations (not volatilities) to isolate the correlation effect."},{step:"Correlation-driven vol increase",formula:"\\Delta\\sigma \\approx 3\\text{-}5\\% \\text{ (from correlation alone)}",explanation:"In practice, both correlations AND volatilities increase, roughly doubling portfolio risk."}]}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Correlation breakdown is a critical risk for Indian portfolios. During crises, all equity sectors become highly correlated, reducing diversification benefits precisely when needed most. Only truly uncorrelated assets (G-Secs, gold to some extent) provide meaningful crisis diversification. Portfolio stress testing should always use crisis-era correlations, not normal-regime correlations."})})]})}const se=Object.freeze(Object.defineProperty({__proto__:null,default:L},Symbol.toStringTag,{value:"Module"}));function B(){const[t,o]=i.useState(95),[a,c]=i.useState(2.5),[s,x]=i.useState(50),[r,m]=i.useState(-15),d=r,l=Math.max(0,-(r-(t-100)))*s/100,h=d+l-a*s/100,g=d;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Nifty Put Hedge Payoff"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Simulate hedging a Nifty portfolio with OTM put options."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Put Strike (% of spot): ",t,"%"]}),e.jsx("input",{type:"range",min:"80",max:"100",step:"1",value:t,onChange:p=>o(parseInt(p.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Premium: ",a,"%"]}),e.jsx("input",{type:"range",min:"0.5",max:"8",step:"0.5",value:a,onChange:p=>c(parseFloat(p.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Hedge Ratio: ",s,"%"]}),e.jsx("input",{type:"range",min:"10",max:"100",step:"5",value:s,onChange:p=>x(parseInt(p.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Nifty Return: ",r,"%"]}),e.jsx("input",{type:"range",min:"-40",max:"20",step:"1",value:r,onChange:p=>m(parseInt(p.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-3 text-center text-xs",children:[e.jsxs("div",{className:"rounded-lg bg-red-50 p-3 dark:bg-red-900/30",children:[e.jsx("div",{className:"text-gray-500",children:"Unhedged"}),e.jsxs("div",{className:"text-lg font-bold text-red-600",children:[g.toFixed(1),"%"]})]}),e.jsxs("div",{className:"rounded-lg bg-green-50 p-3 dark:bg-green-900/30",children:[e.jsx("div",{className:"text-gray-500",children:"Hedged"}),e.jsxs("div",{className:"text-lg font-bold text-green-600",children:[h.toFixed(1),"%"]})]}),e.jsxs("div",{className:"rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30",children:[e.jsx("div",{className:"text-gray-500",children:"Protection Value"}),e.jsxs("div",{className:"text-lg font-bold text-indigo-600",children:[(h-g).toFixed(1),"%"]})]})]})]})}function D(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Tail Hedging with Nifty Puts"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Tail risk hedging protects portfolios against extreme market drawdowns using options. For Indian investors, Nifty 50 put options traded on NSE provide the most liquid hedging instrument. The challenge is balancing protection cost against portfolio drag -- buying puts is expensive insurance that reduces returns in normal markets."}),e.jsx(b,{title:"Tail Risk Hedge",label:"Definition 10.7",definition:"A tail risk hedge is a portfolio position designed to generate positive returns during extreme market drawdowns (typically > 2 standard deviations). Common instruments include OTM put options, VIX calls, and put spreads. The hedge provides convex payoff: limited cost in normal times but large payout during crashes.",notation:"OTM = Out-of-The-Money, typically 5-15% below current level"}),e.jsx(n.BlockMath,{math:"\\text{Hedged Return} = R_{\\text{portfolio}} + \\max(0, K - S_T) \\cdot h - \\text{Premium} \\cdot h"}),e.jsx(n.BlockMath,{math:"\\text{Hedge Ratio} = h^* = -\\frac{\\text{Cov}(R_p, R_{\\text{put}})}{\\text{Var}(R_{\\text{put}})}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Nifty 50 put options are the primary tail hedging instrument for Indian equity portfolios. They trade on NSE with monthly and weekly expiries, with strikes available in 50-point increments. The most liquid OTM puts are 5-10% below the current level."}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The cost of tail hedging, or the insurance premium, typically ranges from 2-4% annualized for 5% OTM puts. This drag reduces portfolio returns in normal markets but provides substantial protection during crashes like the 38% Nifty drawdown in March 2020."}),e.jsx(N,{title:"Optimal Put Strike",label:"Theorem 10.6",statement:"For a portfolio with expected return mu and volatility sigma, the optimal OTM put strike K* that minimizes total portfolio variance (including hedge cost) satisfies: K* = S·exp(-sigma·sqrt(T)·Phi_inv(1-alpha) + (r-sigma^2/2)T), where alpha is the target protection level.",proof:"This follows from minimizing the variance of the hedged portfolio return. The optimal strike balances the cost of deeper OTM puts against their lower payoff probability."}),e.jsx(B,{}),e.jsx(y,{title:"tail_hedging_nifty.py",runnable:!0,code:`import numpy as np

np.random.seed(42)

# Tail hedging simulation for Nifty 50 portfolio
T = 252 * 10  # 10 years
S0 = 20000  # Nifty starting level
mu = 0.12 / 252
sigma = 0.18 / np.sqrt(252)

# Simulate Nifty path with occasional crashes
returns = np.random.normal(mu, sigma, T)
# Add crash events
crash_days = np.random.choice(T, 5, replace=False)
for d in crash_days:
    crash_len = np.random.randint(5, 20)
    returns[d:d+crash_len] = np.random.normal(-0.03, 0.04, min(crash_len, T-d))

nifty = S0 * np.cumprod(1 + returns)

# Strategy: buy monthly 5% OTM puts
put_otm = 0.05
monthly_premium = 0.003  # 30 bps monthly = ~3.6% annual

unhedged = np.cumprod(1 + returns)
hedged_returns = returns.copy()

for month_start in range(0, T, 21):
    month_end = min(month_start + 21, T)
    strike = nifty[month_start] * (1 - put_otm)
    
    for t in range(month_start, month_end):
        hedged_returns[t] -= monthly_premium / 21  # Daily premium cost
        if nifty[t] < strike:
            payoff = (strike - nifty[t]) / nifty[month_start]
            hedged_returns[t] += payoff * 0.05  # Small daily payoff

hedged = np.cumprod(1 + hedged_returns)

# Metrics
def metrics(rets):
    cum = np.cumprod(1 + rets)
    ann_ret = (cum[-1] ** (252/T) - 1)
    ann_vol = np.std(rets) * np.sqrt(252)
    max_dd = np.min(cum / np.maximum.accumulate(cum) - 1)
    return ann_ret, ann_vol, max_dd

ur, uv, ud = metrics(returns)
hr, hv, hd = metrics(hedged_returns)

print("=== Tail Hedging Analysis (Nifty 50, 10 Years) ===")
print(f"{'Metric':<15} {'Unhedged':>12} {'Hedged':>12}")
print("-" * 42)
print(f"{'Ann Return':<15} {ur:>12.2%} {hr:>12.2%}")
print(f"{'Ann Vol':<15} {uv:>12.2%} {hv:>12.2%}")
print(f"{'Max Drawdown':<15} {ud:>12.2%} {hd:>12.2%}")
print(f"{'Sharpe':<15} {ur/uv:>12.3f} {hr/hv:>12.3f}")
print(f"\\nHedge cost (annual): ~{monthly_premium*12*100:.1f}%")
print(f"Drawdown reduction: {(1-hd/ud)*100:.1f}%")`}),e.jsx(v,{title:"Nifty Put Hedge Cost Analysis",difficulty:"intermediate",problem:"A portfolio manager holds INR 100 Cr in Nifty 50 stocks. She buys monthly 5% OTM Nifty puts at 1.5% premium. During a 20% crash, what is the net portfolio return?",solution:[{step:"Put payoff",formula:"	ext{Payoff} = max(0, 0.95S - 0.80S) = 0.15S = 15%",explanation:"The 5% OTM put pays 15% when Nifty falls 20%."},{step:"Net hedged return",formula:"R_{	ext{hedged}} = -20% + 15% - 1.5% = -6.5%",explanation:"The hedge reduces the 20% loss to 6.5%."},{step:"Protection value",formula:"	ext{Value} = 20% - 6.5% = 13.5% 	ext{ on INR 100 Cr} = 	ext{INR 13.5 Cr}",explanation:"The put hedge saved INR 13.5 crore against a 1.5% annual cost."}]}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Tail hedging with Nifty puts provides convex protection against market crashes. The key trade-off is the annual premium cost (2-4%) versus the insurance value during crashes. For Indian portfolios, a systematic tail hedging program using 5% OTM monthly puts with 50% hedge ratio offers a good balance of cost and protection."})})]})}const ie=Object.freeze(Object.defineProperty({__proto__:null,default:D},Symbol.toStringTag,{value:"Module"}));function z(){const[t,o]=i.useState(80),[a,c]=i.useState(3),[s,x]=i.useState(100),r=Math.max(0,s-t),d=Math.min(a*r,s)/s*100;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: CPPI Allocation"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"See how CPPI dynamically adjusts equity/bond allocation based on cushion."}),e.jsxs("div",{className:"mb-4 grid grid-cols-3 gap-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Floor: ",t,"%"]}),e.jsx("input",{type:"range",min:"60",max:"95",step:"1",value:t,onChange:l=>o(parseInt(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Multiplier (m): ",a]}),e.jsx("input",{type:"range",min:"1",max:"8",step:"0.5",value:a,onChange:l=>c(parseFloat(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Portfolio Value: ",s]}),e.jsx("input",{type:"range",min:"70",max:"150",step:"1",value:s,onChange:l=>x(parseInt(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-4 gap-2 text-center text-xs",children:[e.jsxs("div",{className:"rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30",children:[e.jsx("div",{className:"text-gray-500",children:"Cushion"}),e.jsx("div",{className:"text-lg font-bold text-indigo-600",children:r.toFixed(0)})]}),e.jsxs("div",{className:"rounded-lg bg-green-50 p-3 dark:bg-green-900/30",children:[e.jsx("div",{className:"text-gray-500",children:"Equity %"}),e.jsxs("div",{className:"text-lg font-bold text-green-600",children:[d.toFixed(1),"%"]})]}),e.jsxs("div",{className:"rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30",children:[e.jsx("div",{className:"text-gray-500",children:"Bond %"}),e.jsxs("div",{className:"text-lg font-bold text-amber-600",children:[(100-d).toFixed(1),"%"]})]}),e.jsxs("div",{className:"rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30",children:[e.jsx("div",{className:"text-gray-500",children:"Gap Risk"}),e.jsxs("div",{className:"text-lg font-bold text-purple-600",children:[(100/a).toFixed(1),"%"]})]})]})]})}function V(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"CPPI and Drawdown Constraints"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Constant Proportion Portfolio Insurance (CPPI) is a dynamic allocation strategy that provides a floor on portfolio value while maintaining upside participation. For Indian investors, CPPI is the mathematical foundation behind popular 'balanced advantage' and 'dynamic asset allocation' mutual fund categories regulated by SEBI."}),e.jsx(b,{title:"CPPI Strategy",label:"Definition 10.8",definition:"Constant Proportion Portfolio Insurance (CPPI) dynamically allocates between a risky asset (equity) and a safe asset (bonds) based on the cushion -- the difference between current portfolio value V and a floor F. Equity exposure = m × (V - F), where m is the multiplier. As the portfolio approaches the floor, equity exposure decreases to zero, protecting the floor value.",notation:"V = portfolio value, F = floor, C = V-F (cushion), m = multiplier, E = min(m*C, V)"}),e.jsx(n.BlockMath,{math:"\\text{Equity Exposure} = E_t = \\min(m \\times C_t, V_t) = \\min(m(V_t - F_t), V_t)"}),e.jsx(n.BlockMath,{math:"\\text{Floor Growth: } F_t = F_0 \\cdot e^{r_f \\cdot t}"}),e.jsx(n.BlockMath,{math:"\\text{Gap Risk: } P(\\text{breach}) = P(R_{\\text{equity}} < -1/m)"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"CPPI is widely used in India through SEBI-categorized Balanced Advantage Funds and Dynamic Asset Allocation Funds. These funds use variants of CPPI with P/E-based or model-based equity allocation, typically ranging from 30-80% equity. Popular examples include ICICI Prudential Balanced Advantage, HDFC Balanced Advantage, and Edelweiss Balanced Advantage."}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The multiplier m controls the aggressiveness of the strategy. Higher m means more equity exposure for a given cushion, but also higher gap risk. For Indian markets with circuit breaker limits of 20% on individual stocks and 15% on indices, a multiplier of 3-5 is typical."}),e.jsx(N,{title:"CPPI Gap Risk",label:"Theorem 10.7",statement:"CPPI guarantees the floor only if the risky asset does not gap down by more than 1/m in a single rebalancing period. The gap risk is: P(breach) = P(R_equity < -1/m). For m=4 and daily rebalancing, the critical gap is -25%, which is rare but occurred for Nifty during circuit breaker days.",proof:"The floor breach occurs when m × C × (1+R) < 0, i.e., R < -1/m. For continuous rebalancing, the floor is never breached. In discrete time, gap risk exists."}),e.jsx(z,{}),e.jsx(y,{title:"cppi_simulation.py",runnable:!0,code:`import numpy as np

np.random.seed(42)

# CPPI simulation for Indian balanced portfolio
T = 252 * 10  # 10 years daily
V0 = 100  # Initial portfolio value (INR lakh)
floor_pct = 0.80  # Protect 80% of initial value
multiplier = 4
rf = 0.065 / 252  # Daily risk-free rate (G-Sec)

# Nifty 50 returns (with crash events)
mu = 0.12 / 252
sigma = 0.20 / np.sqrt(252)
returns = np.random.normal(mu, sigma, T)

# Add 2 crash events
returns[500:515] = np.random.normal(-0.025, 0.035, 15)  # Crash 1
returns[1800:1810] = np.random.normal(-0.035, 0.04, 10)  # Crash 2

# CPPI simulation
V = np.zeros(T + 1)
V[0] = V0
floor_values = np.zeros(T + 1)
floor_values[0] = V0 * floor_pct
equity_pcts = []

for t in range(T):
    floor_values[t + 1] = floor_values[t] * (1 + rf)
    cushion = max(V[t] - floor_values[t], 0)
    equity = min(multiplier * cushion, V[t])
    bond = V[t] - equity
    equity_pcts.append(equity / V[t] * 100 if V[t] > 0 else 0)
    
    V[t + 1] = equity * (1 + returns[t]) + bond * (1 + rf)
    V[t + 1] = max(V[t + 1], 0)

# Buy-and-hold comparison
bh = V0 * np.cumprod(np.concatenate([[1], 1 + returns]))

# Metrics
cppi_ret = (V[-1] / V[0]) ** (252/T) - 1
bh_ret = (bh[-1] / bh[0]) ** (252/T) - 1
cppi_dd = np.min(V / np.maximum.accumulate(V) - 1)
bh_dd = np.min(bh / np.maximum.accumulate(bh) - 1)
cppi_vol = np.std(np.diff(np.log(V[V>0]))) * np.sqrt(252)
bh_vol = np.std(np.diff(np.log(bh[bh>0]))) * np.sqrt(252)

print("=== CPPI vs Buy-and-Hold (10 Year Simulation) ===")
print(f"Floor: {floor_pct:.0%} of initial, Multiplier: {multiplier}")
print(f"
{'Metric':<15} {'CPPI':>10} {'Buy&Hold':>10}")
print("-" * 38)
print(f"{'CAGR':<15} {cppi_ret:>10.2%} {bh_ret:>10.2%}")
print(f"{'Vol':<15} {cppi_vol:>10.2%} {bh_vol:>10.2%}")
print(f"{'Max Drawdown':<15} {cppi_dd:>10.2%} {bh_dd:>10.2%}")
print(f"{'Min Value':<15} {np.min(V):>10.1f} {np.min(bh):>10.1f}")
print(f"{'Avg Equity %':<15} {np.mean(equity_pcts):>9.1f}%")
print(f"{'Floor breached':<15} {'Yes' if np.min(V) < floor_values[np.argmin(V)] else 'No':>10}")`}),e.jsx(v,{title:"CPPI Floor Breach Analysis",difficulty:"intermediate",problem:"A CPPI portfolio with m=4 and floor=85% has current value INR 95 (initial=100, floor=85). Nifty drops 8% overnight due to global selloff. Does the floor breach?",solution:[{step:"Compute cushion",formula:"C = V - F = 95 - 85 = 10"},{step:"Equity exposure",formula:"E = m 	imes C = 4 	imes 10 = 40 	ext{ (out of 95)}"},{step:"Portfolio after crash",formula:"V' = 40 	imes 0.92 + 55 	imes 1.0 = 36.8 + 55 = 91.8",explanation:"Portfolio value falls to 91.8, still above floor of 85. No breach since the 8% drop is less than 1/m = 25%."}]}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"CPPI provides a systematic framework for drawdown control that is widely used in Indian balanced advantage funds. The key parameter is the multiplier m, which controls the risk-return trade-off. For Indian markets with circuit breaker protections, m=3-5 provides good upside participation with robust floor protection."})})]})}const ne=Object.freeze(Object.defineProperty({__proto__:null,default:V},Symbol.toStringTag,{value:"Module"}));function H(){const[t,o]=i.useState(60),[a,c]=i.useState(25),[s,x]=i.useState(2);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive Visualization"}),e.jsxs("div",{className:"mb-4 grid grid-cols-3 gap-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Equity %: ",t]}),e.jsx("input",{type:"range",min:"10",max:"90",step:"5",value:t,onChange:r=>o(parseInt(r.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Bond %: ",a]}),e.jsx("input",{type:"range",min:"5",max:"70",step:"5",value:a,onChange:r=>c(parseInt(r.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Risk Aversion: ",s]}),e.jsx("input",{type:"range",min:"0.5",max:"5",step:"0.5",value:s,onChange:r=>x(parseFloat(r.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-3 text-center text-xs",children:[e.jsxs("div",{className:"rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30",children:[e.jsx("div",{className:"text-gray-500 dark:text-gray-400",children:"Expected Return"}),e.jsx("div",{className:"text-lg font-bold text-indigo-600",children:(t*.12+a*.07+(100-t-a)*.08).toFixed(2)+"%"})]}),e.jsxs("div",{className:"rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30",children:[e.jsx("div",{className:"text-gray-500 dark:text-gray-400",children:"Portfolio Vol"}),e.jsx("div",{className:"text-lg font-bold text-amber-600",children:(t*.22*.01*100).toFixed(1)+"%"})]}),e.jsxs("div",{className:"rounded-lg bg-green-50 p-3 dark:bg-green-900/30",children:[e.jsx("div",{className:"text-gray-500 dark:text-gray-400",children:"Sharpe Ratio"}),e.jsx("div",{className:"text-lg font-bold text-green-600",children:((t*.12+a*.07+(100-t-a)*.08-6.5)/(t*.22*.01*100+.1)).toFixed(3)})]})]})]})}function K(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Strategic and Tactical Asset Allocation for Indian Investors"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Strategic Asset Allocation (SAA) defines the long-term policy portfolio weights across asset classes -- equity, fixed income, gold, real estate -- based on investor objectives and constraints. Tactical Asset Allocation (TAA) makes short-term deviations from SAA based on market views. For Indian investors, the typical SAA framework considers Nifty 50 for equity, G-Secs for bonds, SGBs or Gold ETFs for gold, and REITs for real estate."}),e.jsx(b,{title:"Asset Allocation Framework",label:"Definition 10.9",definition:"The SAA/TAA framework separates long-term policy decisions from short-term market views.",notation:"SAA = Strategic, TAA = Tactical"}),e.jsx(n.BlockMath,{math:"\\mathbf{w}^* = \\arg\\max_{\\mathbf{w}} \\left[\\mathbf{w}'\\boldsymbol{\\mu} - \\frac{\\lambda}{2}\\mathbf{w}'\\Sigma\\mathbf{w}\\right]"}),e.jsx(N,{title:"Mean-Variance with Asset Classes",label:"Theorem 10.8",statement:"The optimal SAA maximizes expected utility over asset classes.",proof:"Follows from Markowitz optimization."}),e.jsx(H,{}),e.jsx(y,{title:"assetallocation.py",runnable:!0,code:`import numpy as np
np.random.seed(42)

assets = ['Nifty 50', 'G-Sec 10Y', 'Gold SGB', 'REIT', 'Nifty MidCap'] if 'AssetAllocation' != 'CurrencyHedging' else ['Nifty 50', 'S&P 500 (USD)', 'S&P 500 (INR)']
n = len(assets)

if 'AssetAllocation' == 'AssetAllocation':
    mu = np.array([0.12, 0.07, 0.08, 0.09, 0.15])
    vols = np.array([0.22, 0.06, 0.15, 0.12, 0.28])
    corr = np.eye(n)
    corr[0,1] = corr[1,0] = -0.10
    corr[0,2] = corr[2,0] = 0.08
    corr[0,3] = corr[3,0] = 0.35
    corr[0,4] = corr[4,0] = 0.85
    Sigma = np.outer(vols, vols) * corr

    # Different risk profiles
    profiles = {
        'Conservative': np.array([0.20, 0.50, 0.15, 0.10, 0.05]),
        'Moderate': np.array([0.40, 0.30, 0.10, 0.10, 0.10]),
        'Aggressive': np.array([0.55, 0.15, 0.05, 0.05, 0.20]),
    }

    print("=== Strategic Asset Allocation (Indian Multi-Asset) ===")
    for name, w in profiles.items():
        ret = mu @ w
        vol = np.sqrt(w @ Sigma @ w)
        sr = (ret - 0.065) / vol
        print(f"
{name:15s}: Ret={ret:.2%}, Vol={vol:.2%}, Sharpe={sr:.3f}")
        for a, wi in zip(assets, w):
            print(f"  {a:15s}: {wi:.2%}")
elif 'AssetAllocation' == 'CurrencyHedging':
    # USDINR forward premium analysis
    r_inr = 0.065  # Indian rate
    r_usd = 0.05   # US rate
    spot = 83.0  # USDINR spot
    fwd_premium = (r_inr - r_usd) * 100  # annualized bps
    
    horizons = [1, 3, 6, 12]
    print("=== INR/USD Hedging Cost Analysis ===")
    print(f"Spot USDINR: {spot}")
    print(f"India rate: {r_inr:.1%}, US rate: {r_usd:.1%}")
    for h in horizons:
        fwd = spot * (1 + r_inr * h/12) / (1 + r_usd * h/12)
        cost = (fwd/spot - 1) * 12/h * 100
        print(f"  {h:2d}M Forward: {fwd:.2f}, Cost: {cost:.2f}% ann")
else:
    # Alternative assets analysis
    returns_data = {
        'Nifty 50': 0.12, 'Embassy REIT': 0.09, 'Gold SGB': 0.08,
        'IndiGrid InvIT': 0.10, 'PPF': 0.071
    }
    vols_data = {
        'Nifty 50': 0.22, 'Embassy REIT': 0.12, 'Gold SGB': 0.15,
        'IndiGrid InvIT': 0.10, 'PPF': 0.0
    }
    print("=== Alternative Assets for Indian Portfolios ===")
    for asset, ret in returns_data.items():
        vol = vols_data[asset]
        sr = (ret - 0.065) / vol if vol > 0 else float('inf')
        print(f"  {asset:20s}: Ret={ret:.2%}, Vol={vol:.2%}, SR={sr:.3f}")`}),e.jsx(v,{title:"SAA for Indian Retirement Portfolio",difficulty:"intermediate",problem:"Design SAA for a 35-year-old Indian professional. Retirement in 25 years, moderate risk tolerance.",solution:[{step:"Determine risk capacity",formula:"	ext{Equity %} approx 100 - 	ext{Age} = 100 - 35 = 65%",explanation:"Standard age-based rule as starting point."},{step:"Allocate across asset classes",formula:"w = [0.45, 0.20, 0.10, 0.10, 0.15]",explanation:"Split equity between large-cap (45%) and mid-cap (15%), add bonds, gold, REITs."},{step:"Compute expected return",formula:"mu_p = 0.45 	imes 0.12 + 0.20 	imes 0.07 + 0.10 	imes 0.08 + 0.10 	imes 0.09 + 0.15 	imes 0.15 = 10.85%",explanation:"Expected CAGR of ~10.85% exceeds typical 8% inflation target."}]}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Multi-asset allocation is the most important investment decision for Indian investors. SAA determines ~90% of long-term returns. TAA adds incremental value through market timing. Alternatives like REITs, InvITs, and SGBs provide diversification and income that pure equity-bond portfolios miss."})})]})}const le=Object.freeze(Object.defineProperty({__proto__:null,default:K},Symbol.toStringTag,{value:"Module"}));function O(){const[t,o]=i.useState(60),[a,c]=i.useState(25),[s,x]=i.useState(2);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive Visualization"}),e.jsxs("div",{className:"mb-4 grid grid-cols-3 gap-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Equity %: ",t]}),e.jsx("input",{type:"range",min:"10",max:"90",step:"5",value:t,onChange:r=>o(parseInt(r.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Bond %: ",a]}),e.jsx("input",{type:"range",min:"5",max:"70",step:"5",value:a,onChange:r=>c(parseInt(r.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Risk Aversion: ",s]}),e.jsx("input",{type:"range",min:"0.5",max:"5",step:"0.5",value:s,onChange:r=>x(parseFloat(r.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-3 text-center text-xs",children:[e.jsxs("div",{className:"rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30",children:[e.jsx("div",{className:"text-gray-500 dark:text-gray-400",children:"Expected Return"}),e.jsx("div",{className:"text-lg font-bold text-indigo-600",children:(t*.12+a*.07+(100-t-a)*.08).toFixed(2)+"%"})]}),e.jsxs("div",{className:"rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30",children:[e.jsx("div",{className:"text-gray-500 dark:text-gray-400",children:"Portfolio Vol"}),e.jsx("div",{className:"text-lg font-bold text-amber-600",children:(t*.22*.01*100).toFixed(1)+"%"})]}),e.jsxs("div",{className:"rounded-lg bg-green-50 p-3 dark:bg-green-900/30",children:[e.jsx("div",{className:"text-gray-500 dark:text-gray-400",children:"Sharpe Ratio"}),e.jsx("div",{className:"text-lg font-bold text-green-600",children:((t*.12+a*.07+(100-t-a)*.08-6.5)/(t*.22*.01*100+.1)).toFixed(3)})]})]})]})}function U(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"INR/USD Exposure Management"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Indian investors with international exposure or companies with USD revenues face currency risk from INR/USD fluctuations. The rupee has depreciated by an average of 3-4% annually against the dollar over the past two decades. Currency hedging using forwards, futures on NSE (USDINR), and options can manage this risk, but at a cost equal to the interest rate differential (carry cost)."}),e.jsx(b,{title:"Asset Allocation Framework",label:"Definition 10.10",definition:"Currency hedge ratio determines what fraction of foreign exposure is hedged against INR depreciation.",notation:"h = hedge ratio, F = forward rate"}),e.jsx(n.BlockMath,{math:"F = S \\cdot \\frac{1 + r_{\\text{INR}}}{1 + r_{\\text{USD}}}"}),e.jsx(N,{title:"Covered Interest Rate Parity",label:"Theorem 10.9",statement:"Forward rate F = S × (1+r_INR)/(1+r_USD). Hedging cost = r_INR - r_USD.",proof:"By no-arbitrage, covered interest parity must hold."}),e.jsx(O,{}),e.jsx(y,{title:"currencyhedging.py",runnable:!0,code:`import numpy as np
np.random.seed(42)

assets = ['Nifty 50', 'G-Sec 10Y', 'Gold SGB', 'REIT', 'Nifty MidCap'] if 'CurrencyHedging' != 'CurrencyHedging' else ['Nifty 50', 'S&P 500 (USD)', 'S&P 500 (INR)']
n = len(assets)

if 'CurrencyHedging' == 'AssetAllocation':
    mu = np.array([0.12, 0.07, 0.08, 0.09, 0.15])
    vols = np.array([0.22, 0.06, 0.15, 0.12, 0.28])
    corr = np.eye(n)
    corr[0,1] = corr[1,0] = -0.10
    corr[0,2] = corr[2,0] = 0.08
    corr[0,3] = corr[3,0] = 0.35
    corr[0,4] = corr[4,0] = 0.85
    Sigma = np.outer(vols, vols) * corr

    # Different risk profiles
    profiles = {
        'Conservative': np.array([0.20, 0.50, 0.15, 0.10, 0.05]),
        'Moderate': np.array([0.40, 0.30, 0.10, 0.10, 0.10]),
        'Aggressive': np.array([0.55, 0.15, 0.05, 0.05, 0.20]),
    }

    print("=== Strategic Asset Allocation (Indian Multi-Asset) ===")
    for name, w in profiles.items():
        ret = mu @ w
        vol = np.sqrt(w @ Sigma @ w)
        sr = (ret - 0.065) / vol
        print(f"
{name:15s}: Ret={ret:.2%}, Vol={vol:.2%}, Sharpe={sr:.3f}")
        for a, wi in zip(assets, w):
            print(f"  {a:15s}: {wi:.2%}")
elif 'CurrencyHedging' == 'CurrencyHedging':
    # USDINR forward premium analysis
    r_inr = 0.065  # Indian rate
    r_usd = 0.05   # US rate
    spot = 83.0  # USDINR spot
    fwd_premium = (r_inr - r_usd) * 100  # annualized bps
    
    horizons = [1, 3, 6, 12]
    print("=== INR/USD Hedging Cost Analysis ===")
    print(f"Spot USDINR: {spot}")
    print(f"India rate: {r_inr:.1%}, US rate: {r_usd:.1%}")
    for h in horizons:
        fwd = spot * (1 + r_inr * h/12) / (1 + r_usd * h/12)
        cost = (fwd/spot - 1) * 12/h * 100
        print(f"  {h:2d}M Forward: {fwd:.2f}, Cost: {cost:.2f}% ann")
else:
    # Alternative assets analysis
    returns_data = {
        'Nifty 50': 0.12, 'Embassy REIT': 0.09, 'Gold SGB': 0.08,
        'IndiGrid InvIT': 0.10, 'PPF': 0.071
    }
    vols_data = {
        'Nifty 50': 0.22, 'Embassy REIT': 0.12, 'Gold SGB': 0.15,
        'IndiGrid InvIT': 0.10, 'PPF': 0.0
    }
    print("=== Alternative Assets for Indian Portfolios ===")
    for asset, ret in returns_data.items():
        vol = vols_data[asset]
        sr = (ret - 0.065) / vol if vol > 0 else float('inf')
        print(f"  {asset:20s}: Ret={ret:.2%}, Vol={vol:.2%}, SR={sr:.3f}")`}),e.jsx(v,{title:"Hedge Cost for US Equity Fund",difficulty:"intermediate",problem:"An Indian investor buys USD 100K of S&P 500 ETF. INR rate is 6.5%, USD rate is 5%. What is the annual hedging cost?",solution:[{step:"Forward premium",formula:"	ext{Cost} = r_{	ext{INR}} - r_{	ext{USD}} = 6.5% - 5.0% = 1.5%",explanation:"The interest rate differential is the hedging cost."},{step:"In INR terms",formula:"	ext{Annual cost} = 100,000 	imes 83 	imes 0.015 = 	ext{INR } 1,24,500",explanation:"Hedging costs about INR 1.25 lakh per year on USD 1 lakh exposure."},{step:"Decision",formula:"	ext{Hedge if } E[	ext{INR depreciation}] < 1.5%",explanation:"If you expect INR to depreciate more than 1.5%, leaving unhedged is better."}]}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Currency hedging costs about 1.5% annually for INR/USD, equal to the interest rate differential. Indian investors should evaluate whether expected INR depreciation exceeds this cost before hedging."})})]})}const oe=Object.freeze(Object.defineProperty({__proto__:null,default:U},Symbol.toStringTag,{value:"Module"}));function Y(){const[t,o]=i.useState(60),[a,c]=i.useState(25),[s,x]=i.useState(2);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive Visualization"}),e.jsxs("div",{className:"mb-4 grid grid-cols-3 gap-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Equity %: ",t]}),e.jsx("input",{type:"range",min:"10",max:"90",step:"5",value:t,onChange:r=>o(parseInt(r.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Bond %: ",a]}),e.jsx("input",{type:"range",min:"5",max:"70",step:"5",value:a,onChange:r=>c(parseInt(r.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Risk Aversion: ",s]}),e.jsx("input",{type:"range",min:"0.5",max:"5",step:"0.5",value:s,onChange:r=>x(parseFloat(r.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-3 text-center text-xs",children:[e.jsxs("div",{className:"rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30",children:[e.jsx("div",{className:"text-gray-500 dark:text-gray-400",children:"Expected Return"}),e.jsx("div",{className:"text-lg font-bold text-indigo-600",children:(t*.12+a*.07+(100-t-a)*.08).toFixed(2)+"%"})]}),e.jsxs("div",{className:"rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30",children:[e.jsx("div",{className:"text-gray-500 dark:text-gray-400",children:"Portfolio Vol"}),e.jsx("div",{className:"text-lg font-bold text-amber-600",children:(t*.22*.01*100).toFixed(1)+"%"})]}),e.jsxs("div",{className:"rounded-lg bg-green-50 p-3 dark:bg-green-900/30",children:[e.jsx("div",{className:"text-gray-500 dark:text-gray-400",children:"Sharpe Ratio"}),e.jsx("div",{className:"text-lg font-bold text-green-600",children:((t*.12+a*.07+(100-t-a)*.08-6.5)/(t*.22*.01*100+.1)).toFixed(3)})]})]})]})}function X(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"REITs, InvITs, and Gold in Indian Portfolios"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Alternative assets including REITs (Real Estate Investment Trusts), InvITs (Infrastructure Investment Trusts), and gold provide diversification benefits for Indian portfolios. SEBI-regulated REITs like Embassy Office Parks and Mindspace launched on NSE provide institutional-grade real estate exposure with 6-8% yields. Sovereign Gold Bonds (SGBs) offer gold exposure with an additional 2.5% annual interest."}),e.jsx(b,{title:"Asset Allocation Framework",label:"Definition 10.11",definition:"Alternative assets are non-traditional investments that provide returns uncorrelated with equity and bond markets.",notation:"REIT = Real Estate Investment Trust, InvIT = Infrastructure Investment Trust"}),e.jsx(n.BlockMath,{math:"\\sigma_p^2 = w_{\\text{eq}}^2\\sigma_{\\text{eq}}^2 + w_{\\text{alt}}^2\\sigma_{\\text{alt}}^2 + 2w_{\\text{eq}}w_{\\text{alt}}\\rho\\sigma_{\\text{eq}}\\sigma_{\\text{alt}}"}),e.jsx(N,{title:"Diversification Benefit of Alternatives",label:"Theorem 10.10",statement:"Adding uncorrelated alternatives reduces portfolio variance without reducing expected return.",proof:"By the variance decomposition of portfolio returns."}),e.jsx(Y,{}),e.jsx(y,{title:"alternativesintegration.py",runnable:!0,code:`import numpy as np
np.random.seed(42)

assets = ['Nifty 50', 'G-Sec 10Y', 'Gold SGB', 'REIT', 'Nifty MidCap'] if 'AlternativesIntegration' != 'CurrencyHedging' else ['Nifty 50', 'S&P 500 (USD)', 'S&P 500 (INR)']
n = len(assets)

if 'AlternativesIntegration' == 'AssetAllocation':
    mu = np.array([0.12, 0.07, 0.08, 0.09, 0.15])
    vols = np.array([0.22, 0.06, 0.15, 0.12, 0.28])
    corr = np.eye(n)
    corr[0,1] = corr[1,0] = -0.10
    corr[0,2] = corr[2,0] = 0.08
    corr[0,3] = corr[3,0] = 0.35
    corr[0,4] = corr[4,0] = 0.85
    Sigma = np.outer(vols, vols) * corr

    # Different risk profiles
    profiles = {
        'Conservative': np.array([0.20, 0.50, 0.15, 0.10, 0.05]),
        'Moderate': np.array([0.40, 0.30, 0.10, 0.10, 0.10]),
        'Aggressive': np.array([0.55, 0.15, 0.05, 0.05, 0.20]),
    }

    print("=== Strategic Asset Allocation (Indian Multi-Asset) ===")
    for name, w in profiles.items():
        ret = mu @ w
        vol = np.sqrt(w @ Sigma @ w)
        sr = (ret - 0.065) / vol
        print(f"
{name:15s}: Ret={ret:.2%}, Vol={vol:.2%}, Sharpe={sr:.3f}")
        for a, wi in zip(assets, w):
            print(f"  {a:15s}: {wi:.2%}")
elif 'AlternativesIntegration' == 'CurrencyHedging':
    # USDINR forward premium analysis
    r_inr = 0.065  # Indian rate
    r_usd = 0.05   # US rate
    spot = 83.0  # USDINR spot
    fwd_premium = (r_inr - r_usd) * 100  # annualized bps
    
    horizons = [1, 3, 6, 12]
    print("=== INR/USD Hedging Cost Analysis ===")
    print(f"Spot USDINR: {spot}")
    print(f"India rate: {r_inr:.1%}, US rate: {r_usd:.1%}")
    for h in horizons:
        fwd = spot * (1 + r_inr * h/12) / (1 + r_usd * h/12)
        cost = (fwd/spot - 1) * 12/h * 100
        print(f"  {h:2d}M Forward: {fwd:.2f}, Cost: {cost:.2f}% ann")
else:
    # Alternative assets analysis
    returns_data = {
        'Nifty 50': 0.12, 'Embassy REIT': 0.09, 'Gold SGB': 0.08,
        'IndiGrid InvIT': 0.10, 'PPF': 0.071
    }
    vols_data = {
        'Nifty 50': 0.22, 'Embassy REIT': 0.12, 'Gold SGB': 0.15,
        'IndiGrid InvIT': 0.10, 'PPF': 0.0
    }
    print("=== Alternative Assets for Indian Portfolios ===")
    for asset, ret in returns_data.items():
        vol = vols_data[asset]
        sr = (ret - 0.065) / vol if vol > 0 else float('inf')
        print(f"  {asset:20s}: Ret={ret:.2%}, Vol={vol:.2%}, SR={sr:.3f}")`}),e.jsx(v,{title:"REIT Allocation for Indian Portfolio",difficulty:"beginner",problem:"Embassy Office Parks REIT yields 7% with 12% volatility. How much should a moderate investor allocate?",solution:[{step:"Risk-adjusted return",formula:"	ext{Sharpe} = (0.07 + 0.02 - 0.065) / 0.12 = 0.21",explanation:"Including 2% expected capital appreciation. Modest Sharpe."},{step:"Optimal allocation",formula:"w_{	ext{REIT}} approx 5	ext{-}10%",explanation:"Limited allocation due to lower Sharpe, illiquidity premium, and concentration risk."},{step:"Tax consideration",formula:"	ext{REIT dividends taxed at slab rate}",explanation:"Unlike equity, REIT distributions are taxed as income, reducing after-tax return."}]}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"REITs, InvITs, and gold (via SGBs) are valuable additions to Indian portfolios, providing diversification and income. Typical allocation: 5-10% REITs, 5-10% gold (SGBs), with the remainder in equity and bonds."})})]})}const de=Object.freeze(Object.defineProperty({__proto__:null,default:X},Symbol.toStringTag,{value:"Module"}));export{ee as a,te as b,ae as c,re as d,se as e,ie as f,ne as g,le as h,oe as i,de as j,J as s};
