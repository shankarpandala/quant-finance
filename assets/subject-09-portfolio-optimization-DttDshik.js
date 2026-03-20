import{j as e,r as m}from"./vendor-DgA46Qmo.js";import{r as t}from"./vendor-katex-C-S70IU0.js";import{D as S,T,P as k,E as C,N as b}from"./subject-01-math-foundations-vREfsVbS.js";function P(){const[s,u]=m.useState(2),[r,f]=m.useState(.6),o=.14,p=.12,a=.18,c=.24,n=.82,i=r*p+(1-r)*o,d=Math.sqrt(Math.pow(r,2)*Math.pow(a,2)+Math.pow(1-r,2)*Math.pow(c,2)+2*r*(1-r)*a*c*n),l=i-s/2*Math.pow(d,2),_=(i-.065)/d,x=[];for(let y=0;y<=1;y+=.02){const B=y*p+(1-y)*o,E=Math.sqrt(y*y*a*a+(1-y)*(1-y)*c*c+2*y*(1-y)*a*c*n);x.push({vol:E,ret:B,w:y})}const h=500,v=320,g=50,w=.15,j=.26,I=.11,M=.15,N=y=>g+(y-w)/(j-w)*(h-2*g),R=y=>v-g-(y-I)/(M-I)*(v-2*g),q=x.map((y,B)=>`${B===0?"M":"L"} ${N(y.vol).toFixed(1)} ${R(y.ret).toFixed(1)}`).join(" ");return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Two-Asset Efficient Frontier"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust Nifty 50 weight and risk aversion to explore the frontier between Nifty 50 and Bank Nifty."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Nifty 50 Weight: ",(r*100).toFixed(0),"%"]}),e.jsx("input",{type:"range",min:"0",max:"1",step:"0.02",value:r,onChange:y=>f(parseFloat(y.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Risk Aversion ",e.jsx(t.InlineMath,{math:"\\lambda"})," = ",s.toFixed(1)]}),e.jsx("input",{type:"range",min:"0.5",max:"6",step:"0.1",value:s,onChange:y=>u(parseFloat(y.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:`0 0 ${h} ${v}`,className:"w-full max-w-xl mx-auto block",children:[e.jsx("line",{x1:g,y1:v-g,x2:h-g,y2:v-g,stroke:"#9ca3af",strokeWidth:"1"}),e.jsx("line",{x1:g,y1:g,x2:g,y2:v-g,stroke:"#9ca3af",strokeWidth:"1"}),e.jsx("text",{x:h/2,y:v-10,textAnchor:"middle",className:"text-[11px] fill-gray-500",children:"Volatility (σ)"}),e.jsx("text",{x:15,y:v/2,textAnchor:"middle",className:"text-[11px] fill-gray-500",transform:`rotate(-90, 15, ${v/2})`,children:"Return (μ)"}),e.jsx("path",{d:q,fill:"none",stroke:"#6366f1",strokeWidth:"2.5"}),e.jsx("circle",{cx:N(d),cy:R(i),r:"6",fill:"#ef4444",stroke:"#fff",strokeWidth:"1.5"}),e.jsx("text",{x:N(d)+10,y:R(i)-8,className:"text-[10px] fill-red-500 font-semibold",children:"Your Portfolio"}),e.jsx("circle",{cx:N(a),cy:R(p),r:"4",fill:"#22c55e"}),e.jsx("text",{x:N(a)+8,y:R(p)+4,className:"text-[9px] fill-green-600",children:"Nifty 50"}),e.jsx("circle",{cx:N(c),cy:R(o),r:"4",fill:"#f59e0b"}),e.jsx("text",{x:N(c)+8,y:R(o)+4,className:"text-[9px] fill-amber-600",children:"Bank Nifty"})]}),e.jsxs("div",{className:"mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 text-center text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("div",{children:["Return: ",e.jsxs("span",{className:"font-semibold text-indigo-600",children:[(i*100).toFixed(2),"%"]})]}),e.jsxs("div",{children:["Volatility: ",e.jsxs("span",{className:"font-semibold text-indigo-600",children:[(d*100).toFixed(2),"%"]})]}),e.jsxs("div",{children:["Sharpe: ",e.jsx("span",{className:"font-semibold text-indigo-600",children:_.toFixed(3)})]}),e.jsxs("div",{children:["Utility: ",e.jsx("span",{className:"font-semibold text-indigo-600",children:l.toFixed(4)})]})]})]})}function A(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Markowitz Mean-Variance Optimization"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Harry Markowitz’s 1952 paper “Portfolio Selection” launched modern portfolio theory. The core insight is that investors should care about both expected return and risk (variance), and that diversification can reduce portfolio risk below that of any individual asset. We apply this framework to the Indian equity market, using stocks from the Nifty 50 universe traded on the National Stock Exchange (NSE)."}),e.jsx(S,{title:"Mean-Variance Portfolio",label:"Definition 9.1",definition:"A mean-variance portfolio is defined by a weight vector w ∈ ℝⁿ that allocates capital across n assets. The portfolio return is μₚ = w'μ and the portfolio variance is σₚ² = w'Σw, where μ is the vector of expected returns and Σ is the covariance matrix.",notation:"w = portfolio weights, μ = expected return vector, Σ = covariance matrix"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The mean-variance optimization problem seeks the portfolio with minimum variance for a given target return ",e.jsx(t.InlineMath,{math:"\\mu_{\\text{target}}"}),":"]}),e.jsx(t.BlockMath,{math:"\\min_{\\mathbf{w}} \\quad \\mathbf{w}^\\top \\Sigma \\mathbf{w} \\quad \\text{s.t.} \\quad \\mathbf{w}^\\top \\boldsymbol{\\mu} = \\mu_{\\text{target}}, \\quad \\mathbf{w}^\\top \\mathbf{1} = 1"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["This is a quadratic program (QP) with linear equality constraints. By solving it for a range of target returns, we trace out the ",e.jsx("strong",{children:"efficient frontier"})," -- the set of portfolios offering maximum return for each level of risk."]}),e.jsx(T,{title:"Two-Fund Separation",label:"Theorem 9.1",statement:"In the mean-variance framework without a risk-free asset, every efficient portfolio is a linear combination of any two distinct efficient portfolios. Formally, if w₁ and w₂ are efficient, then w = αw₁ + (1-α)w₂ is efficient for all α ∈ ℝ.",proof:"By the first-order KKT conditions, efficient portfolios satisfy w = Σ⁻¹(λ₁μ + λ₂1) where λ₁, λ₂ are Lagrange multipliers. Since this is affine in (λ₁, λ₂), any convex combination of solutions is also a solution."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Analytical Solution"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"With equality constraints only, the efficient frontier has a closed-form solution using the Lagrangian method. Define the following scalars:"}),e.jsx(t.BlockMath,{math:"A = \\mathbf{1}^\\top \\Sigma^{-1} \\boldsymbol{\\mu}, \\quad B = \\boldsymbol{\\mu}^\\top \\Sigma^{-1} \\boldsymbol{\\mu}, \\quad C = \\mathbf{1}^\\top \\Sigma^{-1} \\mathbf{1}, \\quad D = BC - A^2"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The minimum-variance portfolio achieving target return ",e.jsx(t.InlineMath,{math:"\\mu_p"})," has weights:"]}),e.jsx(t.BlockMath,{math:"\\mathbf{w}^* = \\frac{1}{D}\\left[(B - A\\mu_p)\\,\\Sigma^{-1}\\mathbf{1} + (C\\mu_p - A)\\,\\Sigma^{-1}\\boldsymbol{\\mu}\\right]"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The efficient frontier in ",e.jsx(t.InlineMath,{math:"(\\sigma_p, \\mu_p)"})," space is a hyperbola:"]}),e.jsx(t.BlockMath,{math:"\\sigma_p^2 = \\frac{C\\mu_p^2 - 2A\\mu_p + B}{D}"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Global Minimum Variance Portfolio"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The portfolio with the lowest possible variance regardless of return target is the Global Minimum Variance (GMV) portfolio:"}),e.jsx(t.BlockMath,{math:"\\mathbf{w}_{\\text{GMV}} = \\frac{\\Sigma^{-1}\\mathbf{1}}{\\mathbf{1}^\\top \\Sigma^{-1}\\mathbf{1}}, \\quad \\mu_{\\text{GMV}} = \\frac{A}{C}, \\quad \\sigma^2_{\\text{GMV}} = \\frac{1}{C}"}),e.jsx(P,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Efficient Frontier with Nifty 50 Stocks"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["Let us compute the efficient frontier using a selection of blue-chip Nifty 50 stocks. We use historical daily returns from NSE and solve the QP using ",e.jsx("code",{children:"cvxpy"}),"."]}),e.jsx(k,{title:"efficient_frontier_nifty50.py",runnable:!0,code:`import numpy as np
import cvxpy as cp

# Annualized expected returns for 8 Nifty 50 stocks
# (Reliance, TCS, HDFC Bank, Infosys, ITC, L&T, Axis Bank, HUL)
tickers = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ITC', 'LT', 'AXISBANK', 'HINDUNILVR']
mu = np.array([0.15, 0.13, 0.12, 0.14, 0.10, 0.16, 0.18, 0.11])

# Sample covariance matrix (annualized)
# In practice, estimate from daily returns via NSE data
np.random.seed(42)
raw = np.random.randn(8, 8) * 0.01
cov_matrix = raw @ raw.T + np.diag([0.04, 0.035, 0.03, 0.038, 0.025, 0.045, 0.055, 0.028])

n = len(mu)
w = cp.Variable(n)
ret = mu @ w
risk = cp.quad_form(w, cov_matrix)

# Trace efficient frontier
target_returns = np.linspace(0.10, 0.18, 30)
frontier_risk = []
frontier_weights = []

for target in target_returns:
    prob = cp.Problem(
        cp.Minimize(risk),
        [cp.sum(w) == 1, ret == target, w >= 0]  # long-only
    )
    prob.solve(solver=cp.SCS, verbose=False)
    if prob.status == 'optimal':
        frontier_risk.append(np.sqrt(risk.value))
        frontier_weights.append(w.value.copy())
    else:
        frontier_risk.append(None)
        frontier_weights.append(None)

# Global Minimum Variance Portfolio
prob_gmv = cp.Problem(cp.Minimize(risk), [cp.sum(w) == 1, w >= 0])
prob_gmv.solve(solver=cp.SCS)
gmv_ret = mu @ w.value
gmv_vol = np.sqrt(risk.value)

print("=== Efficient Frontier (Nifty 50 Stocks) ===")
print(f"Global Minimum Variance Portfolio:")
print(f"  Return: {gmv_ret:.4f}  Volatility: {gmv_vol:.4f}")
print(f"  Weights: {dict(zip(tickers, np.round(w.value, 4)))}")
print()
print("Frontier points (return -> volatility):")
for i, (t, r) in enumerate(zip(target_returns, frontier_risk)):
    if r is not None:
        print(f"  mu={t:.3f}  sigma={r:.4f}")`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Capital Market Line"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["When a risk-free asset is available (e.g., Indian Government Securities yielding around 6.5-7%), the efficient set becomes a straight line from the risk-free rate tangent to the frontier. This is the ",e.jsx("strong",{children:"Capital Market Line"})," (CML):"]}),e.jsx(t.BlockMath,{math:"\\mu_p = r_f + \\frac{\\mu_T - r_f}{\\sigma_T}\\,\\sigma_p"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The tangency portfolio ",e.jsx(t.InlineMath,{math:"T"})," maximizes the Sharpe ratio:"]}),e.jsx(t.BlockMath,{math:"\\mathbf{w}_T = \\frac{\\Sigma^{-1}(\\boldsymbol{\\mu} - r_f \\mathbf{1})}{\\mathbf{1}^\\top \\Sigma^{-1}(\\boldsymbol{\\mu} - r_f \\mathbf{1})}"}),e.jsx(C,{title:"Tangency Portfolio for Indian Equities",difficulty:"intermediate",problem:"Given the risk-free rate $r_f = 0.065$ (Indian G-Sec yield), expected returns $\\mu = [0.12, 0.15, 0.10]$ for HDFC Bank, Reliance, and ITC, and a covariance matrix, find the tangency portfolio weights.",solution:[{step:"Compute excess returns",formula:"\\mu^{\\text{excess}} = \\mu - r_f \\mathbf{1} = [0.055,\\; 0.085,\\; 0.035]",explanation:"Subtract the risk-free rate from each expected return."},{step:"Compute Σ⁻¹(μ - rₓ1)",formula:"\\mathbf{z} = \\Sigma^{-1}(\\boldsymbol{\\mu} - r_f \\mathbf{1})",explanation:"Multiply the inverse covariance matrix by the excess return vector."},{step:"Normalize to sum to 1",formula:"\\mathbf{w}_T = \\frac{\\mathbf{z}}{\\mathbf{1}^\\top \\mathbf{z}}",explanation:"Divide each element by the sum to get portfolio weights."}]}),e.jsxs(b,{title:"Indian Market Context",type:"tip",children:[e.jsx("p",{children:"When applying Markowitz optimization to Indian equities, consider these practical factors:"}),e.jsxs("ul",{className:"mt-2 space-y-1 list-disc list-inside",children:[e.jsx("li",{children:"The risk-free rate for Indian investors is the 10-year G-Sec yield (~7% as of 2024)"}),e.jsx("li",{children:"NSE provides free historical data through its website for backtesting"}),e.jsx("li",{children:"SEBI regulations limit mutual fund concentration -- max 10% in a single stock for diversified funds"}),e.jsx("li",{children:"STT (Securities Transaction Tax) of 0.1% on equity delivery impacts short-horizon rebalancing"}),e.jsx("li",{children:"High correlation within Nifty sectors (especially banking) reduces diversification benefit"})]})]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Maximum Sharpe Ratio Portfolio"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["For practical allocation, we often seek the maximum Sharpe ratio portfolio. Using the Indian risk-free rate ",e.jsx(t.InlineMath,{math:"r_f \\approx 6.5\\%"}),":"]}),e.jsx(t.BlockMath,{math:"\\max_{\\mathbf{w}} \\quad \\frac{\\mathbf{w}^\\top \\boldsymbol{\\mu} - r_f}{\\sqrt{\\mathbf{w}^\\top \\Sigma \\mathbf{w}}} \\quad \\text{s.t.} \\quad \\mathbf{w}^\\top \\mathbf{1} = 1, \\quad w_i \\geq 0"}),e.jsx(k,{title:"max_sharpe_nifty.py",runnable:!0,code:`import numpy as np
import cvxpy as cp

tickers = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ITC', 'LT', 'AXISBANK', 'HINDUNILVR']
mu = np.array([0.15, 0.13, 0.12, 0.14, 0.10, 0.16, 0.18, 0.11])
rf = 0.065  # Indian G-Sec 10Y yield

np.random.seed(42)
raw = np.random.randn(8, 8) * 0.01
Sigma = raw @ raw.T + np.diag([0.04, 0.035, 0.03, 0.038, 0.025, 0.045, 0.055, 0.028])

# Reformulation: maximize Sharpe via Cornish trick
# Let y = w / (w'(mu - rf)) -- unnormalized
y = cp.Variable(8)
kappa = cp.Variable()  # scaling variable

prob = cp.Problem(
    cp.Minimize(cp.quad_form(y, Sigma)),
    [(mu - rf) @ y == 1, cp.sum(y) == kappa, y >= 0, kappa >= 0]
)
prob.solve(solver=cp.SCS)

w_star = y.value / kappa.value
port_ret = mu @ w_star
port_vol = np.sqrt(w_star @ Sigma @ w_star)
sharpe = (port_ret - rf) / port_vol

print("=== Maximum Sharpe Ratio Portfolio ===")
print(f"Risk-free rate: {rf:.1%} (Indian G-Sec)")
print(f"Expected Return: {port_ret:.4f} ({port_ret:.2%})")
print(f"Volatility:      {port_vol:.4f} ({port_vol:.2%})")
print(f"Sharpe Ratio:    {sharpe:.4f}")
print()
print("Optimal Weights:")
for t, wt in zip(tickers, w_star):
    if wt > 0.001:
        print(f"  {t:12s}: {wt:.4f} ({wt:.2%})")`}),e.jsx(b,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"The Markowitz efficient frontier provides the theoretical foundation for portfolio construction. While the math is elegant, practical implementation for Indian markets requires addressing estimation error (next section), transaction costs (STT, brokerage), and SEBI-mandated constraints. Modern platforms like Zerodha and Kite allow systematic rebalancing that makes mean-variance optimization actionable for Indian retail investors."})})]})}const le=Object.freeze(Object.defineProperty({__proto__:null,default:A},Symbol.toStringTag,{value:"Module"}));function z(){const[s,u]=m.useState(252),[r,f]=m.useState(10),[o,p]=m.useState(.5),[a,c]=m.useState(100),n=s/r,i=n<2,d=Math.max(.1,3-n*.5).toFixed(2),l=(.22*(1-o)+.18*o).toFixed(3),_=(.15/Math.sqrt(a)).toFixed(4);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Estimation Error Diagnostics"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Explore how sample size, number of assets, and shrinkage affect estimation quality."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Sample Days (T): ",s]}),e.jsx("input",{type:"range",min:"50",max:"1000",step:"10",value:s,onChange:x=>u(parseInt(x.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Assets (N): ",r]}),e.jsx("input",{type:"range",min:"2",max:"50",step:"1",value:r,onChange:x=>f(parseInt(x.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Shrinkage ",e.jsx(t.InlineMath,{math:"\\alpha"}),": ",o.toFixed(2)]}),e.jsx("input",{type:"range",min:"0",max:"1",step:"0.01",value:o,onChange:x=>p(parseFloat(x.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Resample Draws: ",a]}),e.jsx("input",{type:"range",min:"10",max:"500",step:"10",value:a,onChange:x=>c(parseInt(x.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-3 sm:grid-cols-4 text-center text-xs",children:[e.jsxs("div",{className:`rounded-lg p-3 ${i?"bg-red-50 dark:bg-red-900/30":"bg-green-50 dark:bg-green-900/30"}`,children:[e.jsx("div",{className:"text-gray-500 dark:text-gray-400",children:"T/N Ratio"}),e.jsx("div",{className:`text-lg font-bold ${i?"text-red-600":"text-green-600"}`,children:n.toFixed(1)}),e.jsx("div",{className:"text-[10px]",children:i?"Ill-conditioned!":"Acceptable"})]}),e.jsxs("div",{className:"rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30",children:[e.jsx("div",{className:"text-gray-500 dark:text-gray-400",children:"Eigenvalue Spread"}),e.jsx("div",{className:"text-lg font-bold text-indigo-600",children:d}),e.jsx("div",{className:"text-[10px]",children:"Condition number proxy"})]}),e.jsxs("div",{className:"rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30",children:[e.jsx("div",{className:"text-gray-500 dark:text-gray-400",children:"Shrunk Vol"}),e.jsx("div",{className:"text-lg font-bold text-amber-600",children:l}),e.jsx("div",{className:"text-[10px]",children:"Blended estimate"})]}),e.jsxs("div",{className:"rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30",children:[e.jsx("div",{className:"text-gray-500 dark:text-gray-400",children:"Resample Std"}),e.jsx("div",{className:"text-lg font-bold text-purple-600",children:_}),e.jsx("div",{className:"text-[10px]",children:"Weight stability"})]})]})]})}function F(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Estimation Error and Michaud Resampling"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["The elegant mathematics of Markowitz optimization hides a critical practical problem: the inputs -- expected returns ",e.jsx(t.InlineMath,{math:"\\boldsymbol{\\mu}"})," and the covariance matrix ",e.jsx(t.InlineMath,{math:"\\Sigma"})," -- must be estimated from historical data. Small estimation errors in these inputs can produce wildly different optimal portfolios. This is especially problematic for Indian markets, where regime changes (demonetization 2016, COVID 2020, IL&FS crisis 2018) cause structural breaks in return distributions."]}),e.jsx(S,{title:"Estimation Error",label:"Definition 9.2",definition:"Estimation error in portfolio optimization refers to the deviation between sample estimates (μ̂, Σ̂) computed from T observations and the true population parameters (μ, Σ). The optimizer treats estimates as truth, amplifying errors by concentrating weights in assets with overestimated returns and underestimated risk.",notation:"μ̂ = sample mean return, Σ̂ = sample covariance, T = number of observations"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Why Markowitz is an “Error Maximizer”"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Michaud (1989) famously called mean-variance optimization an “error maximizer.” The optimizer systematically overweights assets with large positive estimation errors in expected returns and underweights those with negative errors. Consider the standard errors:"}),e.jsx(t.BlockMath,{math:"\\text{SE}(\\hat{\\mu}_i) = \\frac{\\hat{\\sigma}_i}{\\sqrt{T}}, \\quad \\text{SE}(\\hat{\\sigma}_{ij}) = \\frac{\\hat{\\sigma}_{ii}\\hat{\\sigma}_{jj} + \\hat{\\sigma}_{ij}^2}{T-1}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["For a typical Nifty 50 stock with 20% annualized volatility and 5 years of daily data (",e.jsx(t.InlineMath,{math:"T = 1260"}),"), the standard error of the mean return estimate is:"]}),e.jsx(t.BlockMath,{math:"\\text{SE}(\\hat{\\mu}) = \\frac{0.20}{\\sqrt{1260}} \\approx 0.56\\%"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"This means we cannot distinguish between a stock with 10% and 11% expected return even with 5 years of data. Yet the optimizer will aggressively tilt toward the 11% estimate."}),e.jsx(T,{title:"Bound on Portfolio Weight Error",label:"Theorem 9.2",statement:"For the unconstrained Markowitz portfolio, the estimation error in optimal weights is bounded by: ||ŵ* - w*|| ≤ ||Σ⁻¹|| · (||Δμ|| + ||ΔΣ|| · ||w*||), where Δμ = μ̂ - μ and ΔΣ = Σ̂ - Σ.",proof:"This follows from perturbation analysis of the KKT conditions. The optimal weights w* = Σ⁻¹μ / (1'Σ⁻¹μ) are differentiable in (μ, Σ), and the sensitivity scales with the condition number of Σ."}),e.jsx(z,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Shrinkage Estimators"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Ledoit and Wolf (2004) proposed shrinking the sample covariance toward a structured target to reduce estimation error. The shrinkage estimator is:"}),e.jsx(t.BlockMath,{math:"\\hat{\\Sigma}_{\\text{shrunk}} = \\alpha \\mathbf{F} + (1 - \\alpha) \\hat{\\Sigma}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"\\mathbf{F}"})," is the shrinkage target (e.g., constant correlation model or single-factor model) and ",e.jsx(t.InlineMath,{math:"\\alpha \\in [0,1]"})," is the optimal shrinkage intensity determined analytically:"]}),e.jsx(t.BlockMath,{math:"\\alpha^* = \\frac{\\sum_{i,j} \\text{Var}(\\hat{\\sigma}_{ij})}{\\sum_{i,j} (\\hat{\\sigma}_{ij} - f_{ij})^2 + \\sum_{i,j} \\text{Var}(\\hat{\\sigma}_{ij})}"}),e.jsx(k,{title:"ledoit_wolf_nifty.py",runnable:!0,code:`import numpy as np
from sklearn.covariance import LedoitWolf

# Simulated daily returns for 10 Nifty 50 stocks (252 trading days)
np.random.seed(42)
n_assets = 10
n_days = 252
tickers = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ITC',
           'LT', 'AXISBANK', 'HINDUNILVR', 'SBIN', 'BHARTIARTL']

# Generate correlated returns
true_cov = np.eye(n_assets) * 0.04
for i in range(n_assets):
    for j in range(i+1, n_assets):
        true_cov[i, j] = true_cov[j, i] = 0.01 * np.random.uniform(0.3, 0.8)

returns = np.random.multivariate_normal(np.zeros(n_assets), true_cov / 252, n_days)

# Sample covariance
sample_cov = np.cov(returns.T) * 252

# Ledoit-Wolf shrinkage
lw = LedoitWolf().fit(returns)
lw_cov = lw.covariance_ * 252
shrinkage_intensity = lw.shrinkage_

print("=== Covariance Estimation for Nifty 50 Stocks ===")
print(f"Sample size: {n_days} days, Assets: {n_assets}")
print(f"T/N ratio: {n_days/n_assets:.1f}")
print(f"\\nShrinkage intensity (alpha): {shrinkage_intensity:.4f}")
print(f"\\nSample Cov condition number: {np.linalg.cond(sample_cov):.1f}")
print(f"Shrunk Cov condition number:  {np.linalg.cond(lw_cov):.1f}")
print(f"\\nSample Cov diagonal (annualized vols):")
for t, v in zip(tickers, np.sqrt(np.diag(sample_cov))):
    print(f"  {t:12s}: {v:.4f} ({v:.2%})")
print(f"\\nLW Shrunk Cov diagonal (annualized vols):")
for t, v in zip(tickers, np.sqrt(np.diag(lw_cov))):
    print(f"  {t:12s}: {v:.4f} ({v:.2%})")`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Michaud Resampled Efficiency"}),e.jsx(S,{title:"Resampled Efficient Frontier",label:"Definition 9.3",definition:"The Michaud resampled efficient frontier generates multiple efficient frontiers from bootstrapped return samples, each drawn from the estimated distribution (μ̂, Σ̂). The final portfolio weights are the average of optimal weights across all resampled frontiers, producing more stable allocations that account for estimation uncertainty.",notation:"B = number of bootstrap draws, w̄ = (1/B)Σᵦ w*ᵦ"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The resampling procedure is:"}),e.jsxs("ol",{className:"list-decimal list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4",children:[e.jsxs("li",{children:["Estimate ",e.jsx(t.InlineMath,{math:"\\hat{\\mu}"})," and ",e.jsx(t.InlineMath,{math:"\\hat{\\Sigma}"})," from historical data"]}),e.jsxs("li",{children:["For ",e.jsx(t.InlineMath,{math:"b = 1, \\ldots, B"}),": draw ",e.jsx(t.InlineMath,{math:"\\mu^{(b)} \\sim \\mathcal{N}(\\hat{\\mu}, \\hat{\\Sigma}/T)"})," and ",e.jsx(t.InlineMath,{math:"\\Sigma^{(b)} \\sim \\text{Wishart}"})]}),e.jsxs("li",{children:["Solve Markowitz optimization with ",e.jsx(t.InlineMath,{math:"(\\mu^{(b)}, \\Sigma^{(b)})"})," to get ",e.jsx(t.InlineMath,{math:"w^{*(b)}"})]}),e.jsxs("li",{children:["Average: ",e.jsx(t.InlineMath,{math:"\\bar{w} = \\frac{1}{B}\\sum_{b=1}^{B} w^{*(b)}"})]})]}),e.jsx(k,{title:"michaud_resampling_nse.py",runnable:!0,code:`import numpy as np
import cvxpy as cp

np.random.seed(42)
n_assets = 8
T = 252
B = 200  # number of bootstrap samples

tickers = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ITC', 'LT', 'AXISBANK', 'HINDUNILVR']
mu_hat = np.array([0.15, 0.13, 0.12, 0.14, 0.10, 0.16, 0.18, 0.11])

raw = np.random.randn(n_assets, n_assets) * 0.01
Sigma_hat = raw @ raw.T + np.diag([0.04, 0.035, 0.03, 0.038, 0.025, 0.045, 0.055, 0.028])

target_ret = 0.14
resampled_weights = []

for b in range(B):
    # Draw resampled parameters
    mu_b = np.random.multivariate_normal(mu_hat, Sigma_hat / T)
    # Use Wishart-like perturbation for covariance
    X_b = np.random.multivariate_normal(np.zeros(n_assets), Sigma_hat, T)
    Sigma_b = np.cov(X_b.T)

    # Solve MVO
    w = cp.Variable(n_assets)
    prob = cp.Problem(
        cp.Minimize(cp.quad_form(w, Sigma_b)),
        [cp.sum(w) == 1, mu_b @ w == target_ret, w >= 0]
    )
    try:
        prob.solve(solver=cp.SCS, verbose=False, max_iters=5000)
        if prob.status == 'optimal' and w.value is not None:
            resampled_weights.append(w.value)
    except:
        pass

resampled_weights = np.array(resampled_weights)
avg_weights = resampled_weights.mean(axis=0)
std_weights = resampled_weights.std(axis=0)

print("=== Michaud Resampled Portfolio (NSE Stocks) ===")
print(f"Bootstrap samples: {B}, Successful: {len(resampled_weights)}")
print(f"Target return: {target_ret:.2%}")
print(f"\\nResampled Weights (mean +/- std):")
for t, m, s in zip(tickers, avg_weights, std_weights):
    print(f"  {t:12s}: {m:.4f} +/- {s:.4f}")
print(f"\\nExpected return: {mu_hat @ avg_weights:.4f}")
print(f"Expected vol:    {np.sqrt(avg_weights @ Sigma_hat @ avg_weights):.4f}")`}),e.jsx(C,{title:"Impact of Estimation Error on an Indian Portfolio",difficulty:"intermediate",problem:"A fund manager uses 2 years of daily data (T=504) to optimize a portfolio of N=20 Nifty stocks. The sample mean return for HDFC Bank is $\\\\hat{\\\\mu} = 12\\\\%$ with volatility $\\\\hat{\\\\sigma} = 18\\\\%$. What is the 95% confidence interval for the true expected return?",solution:[{step:"Compute the standard error of mean return",formula:"\\text{SE}(\\hat{\\mu}) = \\frac{\\hat{\\sigma}}{\\sqrt{T}} = \\frac{0.18}{\\sqrt{504}} = 0.00802",explanation:"The standard error decreases with the square root of the sample size."},{step:"Compute 95% confidence interval",formula:"\\hat{\\mu} \\pm 1.96 \\times \\text{SE} = 0.12 \\pm 1.96 \\times 0.00802 = [0.1043, 0.1357]",explanation:"The true return could be anywhere from 10.4% to 13.6%. The optimizer cannot meaningfully distinguish this from a stock with 11% or 13% expected return."},{step:"Assess T/N ratio",formula:"T/N = 504/20 = 25.2",explanation:"A ratio above 10 is generally acceptable, but the covariance matrix still has N(N+1)/2 = 210 parameters to estimate, making shrinkage advisable."}]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"James-Stein Shrinkage for Returns"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"While Ledoit-Wolf addresses covariance estimation, we also need to shrink expected returns. The James-Stein estimator shrinks sample means toward a common value:"}),e.jsx(t.BlockMath,{math:"\\hat{\\mu}_{\\text{JS}} = \\left(1 - \\frac{(N-2)\\sigma^2/T}{\\|\\hat{\\mu} - \\bar{\\mu}\\mathbf{1}\\|^2}\\right)(\\hat{\\mu} - \\bar{\\mu}\\mathbf{1}) + \\bar{\\mu}\\mathbf{1}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"\\bar{\\mu}"})," is the grand mean of all estimated returns. This estimator dominates the sample mean in terms of total squared error when ",e.jsx(t.InlineMath,{math:"N \\geq 3"}),"."]}),e.jsxs(b,{title:"Practical Advice for Indian Markets",type:"warning",children:[e.jsx("p",{children:"Estimation error is particularly severe in Indian mid-cap and small-cap stocks due to lower liquidity, thinner analyst coverage, and occasional circuit-breaker halts. Recommendations:"}),e.jsxs("ul",{className:"mt-2 space-y-1 list-disc list-inside",children:[e.jsx("li",{children:"Use at least 3-5 years of data for Nifty 50 stocks, 5-7 years for broader indices"}),e.jsx("li",{children:"Always apply Ledoit-Wolf shrinkage when N/T > 0.1"}),e.jsx("li",{children:"Consider Michaud resampling with B &geq; 200 for robust weight estimates"}),e.jsx("li",{children:"Bayesian approaches (Black-Litterman) are often preferable to pure sample-based MVO"}),e.jsx("li",{children:"Validate out-of-sample using walk-forward analysis on NSE data"})]})]}),e.jsx(b,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Estimation error is the Achilles’ heel of mean-variance optimization. Shrinkage estimators and Michaud resampling provide practical remedies that are essential for deploying Markowitz in Indian equity portfolios. The next section addresses another important dimension: incorporating real-world constraints like SEBI regulations and transaction costs."})})]})}const ce=Object.freeze(Object.defineProperty({__proto__:null,default:F},Symbol.toStringTag,{value:"Module"}));function L(){const[s,u]=m.useState(.15),[r,f]=m.useState(.35),[o,p]=m.useState(.2),[a,c]=m.useState(!0),n=2+(a?1:0)+1,i=Math.max(0,(1-s*3)*(1-r)*(a?.6:1)).toFixed(3);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Constraint Impact on Feasible Set"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust constraints to see how they restrict the optimization problem."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Max Single Weight: ",(s*100).toFixed(0),"%"]}),e.jsx("input",{type:"range",min:"0.05",max:"0.50",step:"0.01",value:s,onChange:d=>u(parseFloat(d.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Max Sector: ",(r*100).toFixed(0),"%"]}),e.jsx("input",{type:"range",min:"0.10",max:"0.60",step:"0.01",value:r,onChange:d=>f(parseFloat(d.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Turnover Limit: ",(o*100).toFixed(0),"%"]}),e.jsx("input",{type:"range",min:"0.05",max:"0.50",step:"0.01",value:o,onChange:d=>p(parseFloat(d.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400",children:[e.jsx("input",{type:"checkbox",checked:a,onChange:d=>c(d.target.checked),className:"h-4 w-4 accent-indigo-500"}),e.jsx("span",{children:"Long-Only"})]})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-3 text-center text-xs",children:[e.jsxs("div",{className:"rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30",children:[e.jsx("div",{className:"text-gray-500 dark:text-gray-400",children:"Active Constraints"}),e.jsx("div",{className:"text-lg font-bold text-indigo-600",children:n})]}),e.jsxs("div",{className:"rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30",children:[e.jsx("div",{className:"text-gray-500 dark:text-gray-400",children:"Feasible Region"}),e.jsx("div",{className:"text-lg font-bold text-amber-600",children:i})]}),e.jsxs("div",{className:`rounded-lg p-3 ${parseFloat(i)<.01?"bg-red-50 dark:bg-red-900/30":"bg-green-50 dark:bg-green-900/30"}`,children:[e.jsx("div",{className:"text-gray-500 dark:text-gray-400",children:"Status"}),e.jsx("div",{className:`text-lg font-bold ${parseFloat(i)<.01?"text-red-600":"text-green-600"}`,children:parseFloat(i)<.01?"Tight!":"Feasible"})]})]})]})}function V(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Constrained Portfolio Optimization with CVXPY"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["Real-world portfolio optimization for Indian markets requires incorporating numerous constraints beyond the basic equality constraints of Markowitz. SEBI regulations, fund mandates, risk limits, and transaction cost considerations all shape the feasible set. Convex optimization tools like ",e.jsx("code",{children:"cvxpy"})," allow us to express these constraints naturally and solve the resulting QPs efficiently."]}),e.jsx(S,{title:"Constrained Mean-Variance Problem",label:"Definition 9.4",definition:"The constrained mean-variance optimization augments the basic Markowitz problem with inequality constraints: min w'Σw subject to w'μ ≥ μ_target, w'1 = 1, and additional constraints on individual weights, sector exposures, turnover, and factor exposures.",notation:"w ∈ ℝⁿ, subject to Aw ≤ b (inequality), Cw = d (equality)"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Common Constraints for Indian Portfolios"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Constraint"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Mathematical Form"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Indian Context"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Long-only"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"w_i \\geq 0 \\; \\forall i"})}),e.jsx("td",{className:"px-4 py-2",children:"Most Indian MFs cannot short"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Max position"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"w_i \\leq w_{\\max}"})}),e.jsx("td",{className:"px-4 py-2",children:"SEBI: max 10% for diversified equity funds"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Sector limit"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"\\sum_{i \\in S_k} w_i \\leq \\bar{s}_k"})}),e.jsx("td",{className:"px-4 py-2",children:"Max 25-35% in banking/financial sector"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Turnover"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"\\sum_i |w_i - w_i^{\\text{prev}}| \\leq \\tau"})}),e.jsx("td",{className:"px-4 py-2",children:"STT + brokerage makes turnover costly"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Min holdings"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"\\sum_i \\mathbb{1}(w_i > 0) \\geq N_{\\min}"})}),e.jsx("td",{className:"px-4 py-2",children:"SEBI: min 20 stocks for diversified funds"})]})]})]})}),e.jsx(L,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Long-Only Constraint"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The long-only constraint ",e.jsx(t.InlineMath,{math:"w_i \\geq 0"})," is the most common in Indian markets. Shorting equities on NSE requires borrowing through the SLB (Stock Lending & Borrowing) mechanism, which is illiquid for most stocks. The long-only constraint is convex and fits naturally into the QP framework:"]}),e.jsx(t.BlockMath,{math:"\\min_{\\mathbf{w}} \\quad \\mathbf{w}^\\top \\Sigma \\mathbf{w} \\quad \\text{s.t.} \\quad \\mathbf{w}^\\top \\boldsymbol{\\mu} \\geq \\mu_{\\text{target}}, \\quad \\mathbf{w}^\\top \\mathbf{1} = 1, \\quad \\mathbf{w} \\geq \\mathbf{0}"}),e.jsx(k,{title:"constrained_mvo_nifty.py",runnable:!0,code:`import numpy as np
import cvxpy as cp

# Nifty 50 blue-chip stocks with sector classification
tickers = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ITC',
           'LT', 'AXISBANK', 'HINDUNILVR', 'SBIN', 'BHARTIARTL']
sectors = ['Energy', 'IT', 'Banking', 'IT', 'FMCG',
           'Capital Goods', 'Banking', 'FMCG', 'Banking', 'Telecom']

mu = np.array([0.15, 0.13, 0.12, 0.14, 0.10,
               0.16, 0.18, 0.11, 0.14, 0.13])

np.random.seed(42)
n = len(mu)
raw = np.random.randn(n, n) * 0.01
Sigma = raw @ raw.T + np.diag(np.random.uniform(0.025, 0.055, n))

# Sector groupings
sector_map = {}
for t, s in zip(tickers, sectors):
    sector_map.setdefault(s, []).append(tickers.index(t))

w = cp.Variable(n)
ret = mu @ w
risk = cp.quad_form(w, Sigma)

# Constraints
constraints = [
    cp.sum(w) == 1,           # Fully invested
    w >= 0,                    # Long-only
    w <= 0.15,                 # SEBI: max 15% per stock
    ret >= 0.13,               # Min target return: 13%
]

# Sector constraints: max 35% in any single sector
for sector_name, indices in sector_map.items():
    constraints.append(cp.sum(w[indices]) <= 0.35)

# Solve
prob = cp.Problem(cp.Minimize(risk), constraints)
prob.solve(solver=cp.SCS)

port_ret = mu @ w.value
port_vol = np.sqrt(w.value @ Sigma @ w.value)
sharpe = (port_ret - 0.065) / port_vol

print("=== Constrained MVO (Indian Market Constraints) ===")
print(f"Status: {prob.status}")
print(f"Return: {port_ret:.4f} ({port_ret:.2%})")
print(f"Vol:    {port_vol:.4f} ({port_vol:.2%})")
print(f"Sharpe: {sharpe:.4f} (rf=6.5%)")
print(f"\\nOptimal Weights:")
for t, s, wt in zip(tickers, sectors, w.value):
    if wt > 0.001:
        print(f"  {t:12s} ({s:13s}): {wt:.4f} ({wt:.2%})")
print(f"\\nSector Exposures:")
for sector_name, indices in sector_map.items():
    sw = sum(w.value[i] for i in indices)
    print(f"  {sector_name:13s}: {sw:.4f} ({sw:.2%})")`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Turnover Constraints and Transaction Costs"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"In India, transaction costs include STT (Securities Transaction Tax) of 0.1% on delivery equity trades, brokerage (typically 0.01-0.03% on discount brokers like Zerodha), and GST on brokerage. We can incorporate turnover constraints to limit trading costs:"}),e.jsx(t.BlockMath,{math:"\\sum_{i=1}^{n} |w_i - w_i^{\\text{prev}}| \\leq \\tau"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The absolute value makes this non-differentiable, but ",e.jsx("code",{children:"cvxpy"})," handles it natively via epigraph reformulation. Alternatively, we can add a transaction cost penalty to the objective:"]}),e.jsx(t.BlockMath,{math:"\\min_{\\mathbf{w}} \\quad \\mathbf{w}^\\top \\Sigma \\mathbf{w} + \\lambda_{\\text{tc}} \\sum_{i=1}^{n} c_i |w_i - w_i^{\\text{prev}}|"}),e.jsx(k,{title:"turnover_constrained.py",runnable:!0,code:`import numpy as np
import cvxpy as cp

n = 10
tickers = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ITC',
           'LT', 'AXISBANK', 'HINDUNILVR', 'SBIN', 'BHARTIARTL']
mu = np.array([0.15, 0.13, 0.12, 0.14, 0.10, 0.16, 0.18, 0.11, 0.14, 0.13])
np.random.seed(42)
raw = np.random.randn(n, n) * 0.01
Sigma = raw @ raw.T + np.diag(np.random.uniform(0.025, 0.055, n))

# Previous portfolio (equal weight)
w_prev = np.ones(n) / n

# Transaction costs (STT + brokerage + impact)
tc_rate = np.full(n, 0.0015)  # 15 bps round-trip

w = cp.Variable(n)
ret = mu @ w
risk = cp.quad_form(w, Sigma)
turnover = cp.norm(w - w_prev, 1)
tc_cost = tc_rate @ cp.abs(w - w_prev)

# Risk-return with TC penalty
lambda_risk = 2.0
objective = -ret + lambda_risk * risk + tc_cost

constraints = [
    cp.sum(w) == 1,
    w >= 0,
    w <= 0.20,
    turnover <= 0.30,  # Max 30% turnover
]

prob = cp.Problem(cp.Minimize(objective), constraints)
prob.solve(solver=cp.SCS)

print("=== Turnover-Constrained Portfolio ===")
print(f"Max turnover: 30%, TC rate: 15 bps")
print(f"\\nWeight changes:")
total_turnover = 0
total_tc = 0
for t, wp, wn in zip(tickers, w_prev, w.value):
    change = wn - wp
    tc = abs(change) * 0.0015
    total_turnover += abs(change)
    total_tc += tc
    if abs(change) > 0.001:
        print(f"  {t:12s}: {wp:.4f} -> {wn:.4f} (delta={change:+.4f}, TC={tc*10000:.1f}bps)")
print(f"\\nTotal turnover: {total_turnover:.4f} ({total_turnover:.2%})")
print(f"Total TC cost:  {total_tc:.6f} ({total_tc*10000:.2f} bps)")
print(f"Net return:     {(mu @ w.value - total_tc):.4f}")`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Tracking Error Constraints"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Many Indian fund managers benchmark to Nifty 50 or Nifty 500. A tracking error constraint limits how much the portfolio can deviate from the benchmark:"}),e.jsx(t.BlockMath,{math:"\\sqrt{(\\mathbf{w} - \\mathbf{w}_b)^\\top \\Sigma (\\mathbf{w} - \\mathbf{w}_b)} \\leq \\text{TE}_{\\max}"}),e.jsx(C,{title:"SEBI Regulatory Constraints for Indian Mutual Funds",difficulty:"intermediate",problem:"A SEBI-regulated large-cap fund must invest at least 80% in the top 100 stocks by market capitalization. It can hold max 10% in any single stock and must hold at least 20 stocks. Formulate these as CVXPY constraints.",solution:[{step:"Define binary indicator for large-cap membership",formula:"L = \\{i : \\text{stock } i \\in \\text{top 100 by mcap}\\}",explanation:"Identify which of our N stocks are classified as large-cap per SEBI norms."},{step:"Large-cap minimum constraint",formula:"\\sum_{i \\in L} w_i \\geq 0.80",explanation:"At least 80% must be in large-cap stocks (SEBI mandate for large-cap funds)."},{step:"Maximum single-stock constraint",formula:"w_i \\leq 0.10 \\quad \\forall i",explanation:"No single stock can exceed 10% of the portfolio."},{step:"Minimum holdings (non-convex, use heuristic)",formula:"\\sum_{i=1}^{N} \\mathbb{1}(w_i > 0.001) \\geq 20",explanation:"This is a cardinality constraint. In practice, set minimum weight of 0.5% and include at least 20 stocks with w_min >= 0.005."}]}),e.jsx(T,{title:"Impact of Constraints on Efficient Frontier",label:"Theorem 9.3",statement:"Adding any constraint to the mean-variance problem can only move the efficient frontier to the left (lower) or keep it the same. That is, the constrained frontier is always dominated by or equal to the unconstrained frontier: σ²_constrained(μ) ≥ σ²_unconstrained(μ) for all achievable μ.",proof:"The unconstrained feasible set contains the constrained feasible set. Since we are minimizing over a smaller set, the minimum can only be equal or larger."}),e.jsxs(b,{title:"Indian Regulatory Landscape",type:"warning",children:[e.jsx("p",{children:"Key SEBI constraints for portfolio construction:"}),e.jsxs("ul",{className:"mt-2 space-y-1 list-disc list-inside",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Large Cap Fund:"})," Min 80% in top 100 stocks by market cap"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Mid Cap Fund:"})," Min 65% in stocks ranked 101-250"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Flexi Cap Fund:"})," Min 65% in equity, no cap-wise restriction"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"ELSS:"})," Min 80% equity, 3-year lock-in, max 10% per stock"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Single Issuer Limit:"})," Max 10% of NAV in a single issuer for diversified funds"]})]})]}),e.jsx(b,{title:"Key Takeaway",type:"tip",children:e.jsxs("p",{children:["Constrained optimization bridges theory and practice. Using ",e.jsx("code",{children:"cvxpy"}),", Indian quant practitioners can encode SEBI regulations, sector limits, turnover budgets, and tracking error bounds directly into the optimization. The key insight is that all commonly used constraints are convex, preserving the tractability of the QP solver."]})})]})}const de=Object.freeze(Object.defineProperty({__proto__:null,default:V},Symbol.toStringTag,{value:"Module"}));function D(){const[s,u]=m.useState(.4),[r,f]=m.useState(.35),o=Math.max(0,1-s-r),p=[s,r,o],a=[.22,.18,.12],c=[[1,.6,.3],[.6,1,.2],[.3,.2,1]],n=["Nifty 50","Govt Bonds","Gold"],i=a.map((w,j)=>a.map((I,M)=>w*I*c[j][M])),d=p.reduce((w,j,I)=>w+p.reduce((M,N,R)=>M+j*N*i[I][R],0),0),l=Math.sqrt(d),_=p.map((w,j)=>p.reduce((I,M,N)=>I+M*i[j][N],0)/l),h=p.map((w,j)=>w*_[j]).map(w=>w/l*100),v=180,g=60;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Risk Contribution Decomposition"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust weights for Indian asset classes and observe how risk contribution changes. Assets: Nifty 50, Govt Bonds (G-Sec), Gold (MCX)."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Nifty 50 Weight: ",(s*100).toFixed(0),"%"]}),e.jsx("input",{type:"range",min:"0",max:"0.9",step:"0.01",value:s,onChange:w=>u(parseFloat(w.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Govt Bonds Weight: ",(r*100).toFixed(0),"%"]}),e.jsx("input",{type:"range",min:"0",max:"0.9",step:"0.01",value:r,onChange:w=>f(parseFloat(w.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"text-center text-xs text-gray-500 mb-2",children:["Gold Weight: ",(o*100).toFixed(0),"% | Portfolio Vol: ",(l*100).toFixed(2),"%"]}),e.jsxs("svg",{viewBox:"0 0 400 240",className:"w-full max-w-md mx-auto block",children:[n.map((w,j)=>{const I=60+j*110,M=Math.max(2,h[j]/100*v),N=["#6366f1","#22c55e","#f59e0b"][j];return e.jsxs("g",{children:[e.jsx("rect",{x:I,y:220-M,width:g,height:M,fill:N,opacity:"0.7",rx:"3"}),e.jsxs("text",{x:I+g/2,y:215-M,textAnchor:"middle",className:"text-[10px] font-bold",fill:N,children:[h[j].toFixed(1),"%"]}),e.jsx("text",{x:I+g/2,y:235,textAnchor:"middle",className:"text-[9px] fill-gray-500",children:w})]},j)}),e.jsx("text",{x:200,y:15,textAnchor:"middle",className:"text-[11px] font-semibold fill-gray-600",children:"Risk Contribution (%)"})]})]})}function G(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Equal Risk Contribution (ERC) Portfolios"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Risk parity is a portfolio construction approach that allocates risk, rather than capital, equally across assets or risk factors. Unlike mean-variance optimization, risk parity does not require expected return estimates -- a significant advantage given the estimation error problems we explored earlier. In the Indian context, risk parity naturally leads to higher allocations to bonds and gold relative to equities, producing portfolios that are more resilient to crashes like those in 2008 and 2020."}),e.jsx(S,{title:"Risk Contribution",label:"Definition 9.5",definition:"For a portfolio with weights w and covariance matrix Σ, the risk contribution of asset i is RC_i = w_i × (Σw)_i / σ_p, where σ_p = √(w'Σw) is the portfolio volatility. The sum of all risk contributions equals the portfolio volatility: Σ_i RC_i = σ_p.",notation:"RC_i = risk contribution of asset i, MRC_i = (Σw)_i / σ_p = marginal risk contribution"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The marginal risk contribution (MRC) of asset ",e.jsx(t.InlineMath,{math:"i"})," is the partial derivative of portfolio volatility with respect to weight ",e.jsx(t.InlineMath,{math:"w_i"}),":"]}),e.jsx(t.BlockMath,{math:"\\text{MRC}_i = \\frac{\\partial \\sigma_p}{\\partial w_i} = \\frac{(\\Sigma \\mathbf{w})_i}{\\sigma_p}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The risk contribution is the product of weight and marginal risk:"}),e.jsx(t.BlockMath,{math:"\\text{RC}_i = w_i \\cdot \\text{MRC}_i = \\frac{w_i (\\Sigma \\mathbf{w})_i}{\\sigma_p}"}),e.jsx(T,{title:"Euler Decomposition of Portfolio Risk",label:"Theorem 9.4",statement:"Portfolio volatility decomposes exactly into the sum of individual risk contributions: σ_p = Σᵢ RCᵢ = Σᵢ wᵢ × MRCᵢ. This follows from Euler's theorem for homogeneous functions, since σ_p is homogeneous of degree 1 in w.",proof:"By Euler's theorem, for any function f homogeneous of degree k: Σᵢ xᵢ (∂f/∂xᵢ) = k·f(x). Since σ_p(w) = √(w'Σw) is homogeneous of degree 1 in w, we have Σᵢ wᵢ (∂σ_p/∂wᵢ) = σ_p, which gives Σᵢ RCᵢ = σ_p."}),e.jsx(D,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"The ERC Portfolio"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The Equal Risk Contribution (ERC) portfolio, also known as the risk parity portfolio, equalizes risk contributions across all assets:"}),e.jsx(t.BlockMath,{math:"\\text{RC}_i = \\text{RC}_j \\quad \\forall \\, i, j \\quad \\Leftrightarrow \\quad w_i (\\Sigma \\mathbf{w})_i = w_j (\\Sigma \\mathbf{w})_j \\quad \\forall \\, i, j"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["This is equivalent to each asset contributing ",e.jsx(t.InlineMath,{math:"1/n"})," of total portfolio risk. There is no closed-form solution in general; we solve it numerically via optimization:"]}),e.jsx(t.BlockMath,{math:"\\min_{\\mathbf{w}} \\sum_{i=1}^{n} \\sum_{j=1}^{n} \\left(w_i (\\Sigma \\mathbf{w})_i - w_j (\\Sigma \\mathbf{w})_j\\right)^2 \\quad \\text{s.t.} \\quad \\mathbf{w}^\\top \\mathbf{1} = 1, \\quad \\mathbf{w} \\geq 0"}),e.jsx(k,{title:"erc_indian_assets.py",runnable:!0,code:`import numpy as np
from scipy.optimize import minimize

# Indian multi-asset universe
assets = ['Nifty 50', 'Nifty MidCap', 'G-Sec 10Y', 'Corp Bonds', 'Gold (MCX)', 'REIT']
n = len(assets)

# Annualized expected volatilities
vols = np.array([0.22, 0.28, 0.06, 0.04, 0.15, 0.12])

# Correlation matrix
corr = np.array([
    [1.00, 0.85, -0.10, 0.05, 0.10, 0.40],
    [0.85, 1.00, -0.15, 0.00, 0.12, 0.35],
    [-0.10, -0.15, 1.00, 0.80, 0.15, 0.10],
    [0.05, 0.00, 0.80, 1.00, 0.10, 0.15],
    [0.10, 0.12, 0.15, 0.10, 1.00, 0.05],
    [0.40, 0.35, 0.10, 0.15, 0.05, 1.00],
])

# Covariance matrix
Sigma = np.outer(vols, vols) * corr

def portfolio_risk(w):
    return np.sqrt(w @ Sigma @ w)

def risk_contributions(w):
    sigma_p = portfolio_risk(w)
    mrc = Sigma @ w / sigma_p
    rc = w * mrc
    return rc

def erc_objective(w):
    rc = risk_contributions(w)
    # Sum of squared differences in risk contributions
    n = len(w)
    obj = 0
    for i in range(n):
        for j in range(i+1, n):
            obj += (rc[i] - rc[j])**2
    return obj

# Optimize
w0 = np.ones(n) / n
bounds = [(0.01, 0.80)] * n
constraints = [{'type': 'eq', 'fun': lambda w: np.sum(w) - 1}]

result = minimize(erc_objective, w0, method='SLSQP',
                  bounds=bounds, constraints=constraints,
                  options={'maxiter': 1000, 'ftol': 1e-15})

w_erc = result.x
rc = risk_contributions(w_erc)
sigma_p = portfolio_risk(w_erc)

print("=== Equal Risk Contribution Portfolio (Indian Assets) ===")
print(f"Portfolio volatility: {sigma_p:.4f} ({sigma_p:.2%})")
print(f"\\n{'Asset':<15} {'Weight':>8} {'RC':>10} {'RC %':>8}")
print("-" * 45)
for a, w, r in zip(assets, w_erc, rc):
    print(f"{a:<15} {w:>8.4f} {r:>10.6f} {r/sigma_p*100:>7.2f}%")
print(f"\\nSum of RC: {sum(rc):.6f} (= portfolio vol: {sigma_p:.6f})")
print(f"Max RC deviation: {(max(rc) - min(rc))/sigma_p*100:.4f}%")`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Spinu’s Convex Reformulation"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["Spinu (2013) showed that the ERC problem can be reformulated as a convex optimization. By substituting ",e.jsx(t.InlineMath,{math:"y = w / \\sigma_p"})," and working in the unnormalized space:"]}),e.jsx(t.BlockMath,{math:"\\min_{\\mathbf{y} \\geq 0} \\quad \\frac{1}{2} \\mathbf{y}^\\top \\Sigma \\mathbf{y} - \\frac{1}{n} \\sum_{i=1}^{n} \\ln y_i"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The solution ",e.jsx(t.InlineMath,{math:"\\mathbf{y}^*"})," is then normalized:",e.jsx(t.InlineMath,{math:"\\mathbf{w}^* = \\mathbf{y}^* / (\\mathbf{1}^\\top \\mathbf{y}^*)"}),". The log barrier ensures all weights remain positive and creates equal risk contributions at the optimum."]}),e.jsx(k,{title:"erc_convex_spinu.py",runnable:!0,code:`import numpy as np
import cvxpy as cp

assets = ['Nifty 50', 'Nifty MidCap', 'G-Sec 10Y', 'Corp Bonds', 'Gold (MCX)', 'REIT']
vols = np.array([0.22, 0.28, 0.06, 0.04, 0.15, 0.12])
corr = np.array([
    [1.00, 0.85, -0.10, 0.05, 0.10, 0.40],
    [0.85, 1.00, -0.15, 0.00, 0.12, 0.35],
    [-0.10, -0.15, 1.00, 0.80, 0.15, 0.10],
    [0.05, 0.00, 0.80, 1.00, 0.10, 0.15],
    [0.10, 0.12, 0.15, 0.10, 1.00, 0.05],
    [0.40, 0.35, 0.10, 0.15, 0.05, 1.00],
])
Sigma = np.outer(vols, vols) * corr
n = len(assets)

# Spinu's convex formulation
y = cp.Variable(n, pos=True)
objective = 0.5 * cp.quad_form(y, Sigma) - (1.0/n) * cp.sum(cp.log(y))
prob = cp.Problem(cp.Minimize(objective))
prob.solve(solver=cp.SCS)

w_erc = y.value / np.sum(y.value)
sigma_p = np.sqrt(w_erc @ Sigma @ w_erc)
rc = w_erc * (Sigma @ w_erc) / sigma_p

print("=== ERC via Spinu Convex Formulation ===")
print(f"Portfolio volatility: {sigma_p:.4f} ({sigma_p:.2%})")
print(f"\\n{'Asset':<15} {'Weight':>8} {'RC %':>8}")
print("-" * 35)
for a, w, r in zip(assets, w_erc, rc):
    print(f"{a:<15} {w:>8.4f} {r/sigma_p*100:>7.2f}%")
print(f"\\nTarget RC per asset: {100/n:.2f}%")`}),e.jsx(C,{title:"Two-Asset ERC",difficulty:"beginner",problem:"Compute the ERC portfolio for Nifty 50 ($\\\\sigma_1 = 22\\\\%$) and Indian G-Sec ($\\\\sigma_2 = 6\\\\%$) with correlation $\\\\rho = -0.1$.",solution:[{step:"Set up the equal risk contribution condition",formula:"w_1 \\cdot (\\Sigma \\mathbf{w})_1 = w_2 \\cdot (\\Sigma \\mathbf{w})_2",explanation:"Each asset must contribute equally to portfolio risk."},{step:"Expand using covariance terms",formula:"w_1(w_1 \\sigma_1^2 + w_2 \\rho \\sigma_1 \\sigma_2) = w_2(w_2 \\sigma_2^2 + w_1 \\rho \\sigma_1 \\sigma_2)",explanation:"Substitute the covariance matrix entries."},{step:"Simplify with w₂ = 1 - w₁",formula:"w_1^2 \\sigma_1^2 = (1-w_1)^2 \\sigma_2^2",explanation:"When correlation is low, the cross terms approximately cancel. The approximate ERC weight is w₁ ≈ σ₂/(σ₁+σ₂) = 0.06/0.28 = 21.4% for Nifty 50 and 78.6% for G-Sec."}]}),e.jsxs(b,{title:"Risk Parity in Indian Markets",type:"tip",children:[e.jsx("p",{children:"Risk parity naturally allocates heavily to Indian G-Secs and gold due to their lower volatility. This produces a portfolio that:"}),e.jsxs("ul",{className:"mt-2 space-y-1 list-disc list-inside",children:[e.jsx("li",{children:"Had drawdowns of ~8% vs ~55% for equity-only during 2008 crisis"}),e.jsx("li",{children:"Benefits from India’s structural decline in interest rates (G-Sec appreciation)"}),e.jsx("li",{children:"Often requires leverage to match equity-like returns (target ~12% CAGR)"}),e.jsx("li",{children:"Is offered by Indian AMCs like DSP and Edelweiss as “balanced advantage” funds"})]})]}),e.jsx(b,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"The ERC portfolio equalizes risk contributions, producing allocations that are robust to return estimation errors. For Indian multi-asset portfolios, ERC typically allocates 20-25% to equities, 50-60% to bonds, and 15-20% to gold -- a defensive allocation that has historically delivered superior risk-adjusted returns compared to the typical Indian retail portfolio of 60%+ equity."})})]})}const me=Object.freeze(Object.defineProperty({__proto__:null,default:G},Symbol.toStringTag,{value:"Module"}));function H(){const[s,u]=m.useState("ward"),[r,f]=m.useState(3),o=["Banking","IT","Energy","FMCG","Pharma"],a={ward:[.3,.8,1.2,.5,.9],single:[.2,.6,1,.4,.7],complete:[.5,1,1.5,.7,1.1]}[s],c=460,n=200;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Hierarchical Clustering of NSE Sectors"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Change linkage method and cluster count to see how NSE sectors group."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Linkage: ",s]}),e.jsxs("select",{value:s,onChange:i=>u(i.target.value),className:"rounded border px-2 py-1 text-xs dark:bg-gray-800 dark:border-gray-600",children:[e.jsx("option",{value:"ward",children:"Ward"}),e.jsx("option",{value:"single",children:"Single"}),e.jsx("option",{value:"complete",children:"Complete"})]})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Clusters: ",r]}),e.jsx("input",{type:"range",min:"2",max:"5",step:"1",value:r,onChange:i=>f(parseInt(i.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:`0 0 ${c} ${n}`,className:"w-full max-w-lg mx-auto block",children:[o.map((i,d)=>{const l=40+d*90;return e.jsxs("g",{children:[e.jsx("line",{x1:l,y1:n-20,x2:l,y2:n-20-a[d]*100,stroke:"#6366f1",strokeWidth:"2"}),e.jsx("text",{x:l,y:n-5,textAnchor:"middle",className:"text-[9px] fill-gray-600",children:i}),e.jsx("circle",{cx:l,cy:n-20-a[d]*100,r:"3",fill:"#6366f1"})]},d)}),e.jsx("line",{x1:40,y1:n-20-a[0]*100,x2:130,y2:n-20-a[0]*100,stroke:"#6366f1",strokeWidth:"1.5",strokeDasharray:"4"}),e.jsx("line",{x1:220,y1:n-20-a[2]*100,x2:310,y2:n-20-a[2]*100,stroke:"#22c55e",strokeWidth:"1.5",strokeDasharray:"4"}),e.jsx("line",{x1:310,y1:n-20-a[3]*100,x2:400,y2:n-20-a[3]*100,stroke:"#f59e0b",strokeWidth:"1.5",strokeDasharray:"4"}),r<=3&&e.jsx("line",{x1:40,y1:30,x2:400,y2:30,stroke:"#ef4444",strokeWidth:"1",strokeDasharray:"6"}),e.jsxs("text",{x:c/2,y:15,textAnchor:"middle",className:"text-[10px] fill-gray-500",children:["Dendrogram (",s," linkage, ",r," clusters)"]})]})]})}function O(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Hierarchical Risk Parity (HRP) on NSE Sectors"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Hierarchical Risk Parity, introduced by Marcos Lopez de Prado (2016), addresses two key weaknesses of traditional portfolio optimization: instability due to matrix inversion and the inability to capture hierarchical relationships between assets. HRP uses machine learning (hierarchical clustering) to discover the natural grouping structure of assets and allocates risk top-down through the tree. We apply HRP to NSE sector indices, revealing the inherent clustering of Indian equity markets."}),e.jsx(S,{title:"Hierarchical Risk Parity",label:"Definition 9.6",definition:"HRP is a three-step portfolio construction algorithm: (1) Tree Clustering — apply hierarchical clustering to the correlation matrix to group similar assets, (2) Quasi-Diagonalization — reorder the covariance matrix along the dendrogram to place correlated assets adjacent, (3) Recursive Bisection — allocate weights top-down by splitting the dendrogram and allocating inversely proportional to cluster variance.",notation:"D = distance matrix, Z = linkage matrix, Σ̃ = quasi-diagonalized covariance"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Step 1: Distance Matrix and Clustering"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"HRP begins by converting the correlation matrix into a distance matrix. The standard distance metric for financial correlations is:"}),e.jsx(t.BlockMath,{math:"d_{ij} = \\sqrt{\\frac{1}{2}(1 - \\rho_{ij})}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["This metric satisfies ",e.jsx(t.InlineMath,{math:"d_{ij} = 0"})," when ",e.jsx(t.InlineMath,{math:"\\rho_{ij} = 1"}),"(perfectly correlated) and ",e.jsx(t.InlineMath,{math:"d_{ij} = 1"})," when ",e.jsx(t.InlineMath,{math:"\\rho_{ij} = -1"}),"(perfectly anti-correlated). We then apply agglomerative hierarchical clustering with Ward linkage to build the dendrogram."]}),e.jsx(H,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Step 2: Quasi-Diagonalization"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["After clustering, we reorder the covariance matrix so that correlated assets are placed next to each other. This reordering follows the leaf ordering of the dendrogram. The quasi-diagonalized matrix ",e.jsx(t.InlineMath,{math:"\\tilde{\\Sigma}"})," has larger values near the diagonal and smaller values in off-diagonal blocks."]}),e.jsx(t.BlockMath,{math:"\\tilde{\\Sigma} = P^\\top \\Sigma P"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"P"})," is the permutation matrix corresponding to the dendrogram leaf ordering."]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Step 3: Recursive Bisection"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The key innovation of HRP is the recursive bisection step. At each node of the dendrogram, we split assets into two clusters and allocate weights inversely proportional to their cluster variance:"}),e.jsx(t.BlockMath,{math:"\\alpha = 1 - \\frac{\\tilde{V}_1}{\\tilde{V}_1 + \\tilde{V}_2}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"\\tilde{V}_k"})," is the variance of cluster ",e.jsx(t.InlineMath,{math:"k"}),"computed using inverse-variance weights within each cluster. Cluster 1 receives weight ",e.jsx(t.InlineMath,{math:"\\alpha"})," and cluster 2 receives ",e.jsx(t.InlineMath,{math:"1 - \\alpha"}),". This process recurses until each cluster contains a single asset."]}),e.jsx(T,{title:"HRP Does Not Require Matrix Inversion",label:"Theorem 9.5",statement:"Unlike Markowitz optimization and even the standard ERC formulation, HRP never inverts the covariance matrix. It only requires element-wise access to variances and the correlation-derived distance matrix. This makes HRP numerically stable even when the number of assets exceeds the number of observations (N > T).",proof:"By construction, the recursive bisection step only uses cluster variances computed from the diagonal of sub-matrices and the inverse-variance weighting scheme within clusters. No matrix inversion or optimization is needed."}),e.jsx(k,{title:"hrp_nse_sectors.py",runnable:!0,code:`import numpy as np
from scipy.cluster.hierarchy import linkage, leaves_list
from scipy.spatial.distance import squareform

# NSE Sector Indices
sectors = ['Nifty Bank', 'Nifty IT', 'Nifty Pharma', 'Nifty FMCG',
           'Nifty Metal', 'Nifty Energy', 'Nifty Auto', 'Nifty Realty',
           'Nifty Infra', 'Nifty PSE']

n = len(sectors)
np.random.seed(42)

# Correlation matrix for NSE sectors (stylized)
corr = np.array([
    [1.00, 0.25, 0.20, 0.30, 0.55, 0.50, 0.60, 0.65, 0.58, 0.45],
    [0.25, 1.00, 0.35, 0.20, 0.15, 0.20, 0.25, 0.10, 0.15, 0.10],
    [0.20, 0.35, 1.00, 0.40, 0.15, 0.10, 0.20, 0.10, 0.12, 0.08],
    [0.30, 0.20, 0.40, 1.00, 0.25, 0.20, 0.35, 0.20, 0.25, 0.15],
    [0.55, 0.15, 0.15, 0.25, 1.00, 0.70, 0.50, 0.55, 0.60, 0.65],
    [0.50, 0.20, 0.10, 0.20, 0.70, 1.00, 0.45, 0.50, 0.55, 0.60],
    [0.60, 0.25, 0.20, 0.35, 0.50, 0.45, 1.00, 0.50, 0.55, 0.40],
    [0.65, 0.10, 0.10, 0.20, 0.55, 0.50, 0.50, 1.00, 0.70, 0.55],
    [0.58, 0.15, 0.12, 0.25, 0.60, 0.55, 0.55, 0.70, 1.00, 0.65],
    [0.45, 0.10, 0.08, 0.15, 0.65, 0.60, 0.40, 0.55, 0.65, 1.00],
])

vols = np.array([0.24, 0.20, 0.22, 0.15, 0.30, 0.28, 0.25, 0.35, 0.27, 0.26])
Sigma = np.outer(vols, vols) * corr

# Step 1: Distance matrix
dist = np.sqrt(0.5 * (1 - corr))
condensed_dist = squareform(dist)

# Step 2: Hierarchical clustering
Z = linkage(condensed_dist, method='ward')
order = leaves_list(Z)

print("Dendrogram leaf order:", [sectors[i] for i in order])

# Step 3: Recursive bisection
def get_cluster_var(Sigma, indices):
    sub_cov = Sigma[np.ix_(indices, indices)]
    inv_diag = 1.0 / np.diag(sub_cov)
    w = inv_diag / inv_diag.sum()
    return w @ sub_cov @ w

def recursive_bisection(Sigma, sorted_indices):
    weights = np.ones(len(sorted_indices))
    clusters = [sorted_indices.tolist()]

    while len(clusters) > 0:
        new_clusters = []
        for cluster in clusters:
            if len(cluster) <= 1:
                continue
            mid = len(cluster) // 2
            left = cluster[:mid]
            right = cluster[mid:]

            var_left = get_cluster_var(Sigma, left)
            var_right = get_cluster_var(Sigma, right)
            alpha = 1 - var_left / (var_left + var_right)

            for i in left:
                idx = sorted_indices.tolist().index(i)
                weights[idx] *= alpha
            for i in right:
                idx = sorted_indices.tolist().index(i)
                weights[idx] *= (1 - alpha)

            if len(left) > 1:
                new_clusters.append(left)
            if len(right) > 1:
                new_clusters.append(right)
        clusters = new_clusters

    return weights / weights.sum()

w_hrp = recursive_bisection(Sigma, order)
port_vol = np.sqrt(w_hrp @ Sigma[np.ix_(order, order)] @ w_hrp)

# Map back to original order
w_final = np.zeros(n)
for i, idx in enumerate(order):
    w_final[idx] = w_hrp[i]

port_vol_check = np.sqrt(w_final @ Sigma @ w_final)

print(f"\\n=== HRP Portfolio (NSE Sectors) ===")
print(f"Portfolio volatility: {port_vol_check:.4f} ({port_vol_check:.2%})")
print(f"\\n{'Sector':<15} {'Weight':>8} {'Vol':>8}")
print("-" * 35)
for s, w, v in sorted(zip(sectors, w_final, vols), key=lambda x: -x[1]):
    print(f"{s:<15} {w:>8.4f} {v:>8.2%}")`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"HRP vs. MVO vs. ERC: Comparison on Indian Data"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"De Prado demonstrated that HRP outperforms MVO out-of-sample, particularly when the covariance matrix is poorly estimated (small T/N ratio). Key advantages for Indian markets:"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Property"}),e.jsx("th",{className:"px-4 py-2 text-center text-gray-600 dark:text-gray-400",children:"MVO"}),e.jsx("th",{className:"px-4 py-2 text-center text-gray-600 dark:text-gray-400",children:"ERC"}),e.jsx("th",{className:"px-4 py-2 text-center text-gray-600 dark:text-gray-400",children:"HRP"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Requires return estimates"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"Yes"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"No"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"No"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Matrix inversion"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"Yes"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"No (Spinu)"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"No"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Handles N > T"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"No"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"Partially"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"Yes"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Turnover stability"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"Low"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"Medium"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"High"})]})]})]})}),e.jsx(C,{title:"HRP on Three NSE Sectors",difficulty:"intermediate",problem:"Apply HRP to Nifty Bank ($\\\\sigma=24\\\\%$), Nifty IT ($\\\\sigma=20\\\\%$), and Nifty FMCG ($\\\\sigma=15\\\\%$) with correlations $\\\\rho_{\\\\text{Bank,IT}}=0.25$, $\\\\rho_{\\\\text{Bank,FMCG}}=0.30$, $\\\\rho_{\\\\text{IT,FMCG}}=0.20$.",solution:[{step:"Compute distance matrix",formula:"d_{ij} = \\sqrt{(1-\\rho_{ij})/2}",explanation:"d_Bank,IT = √(0.375) = 0.612, d_Bank,FMCG = √(0.35) = 0.592, d_IT,FMCG = √(0.4) = 0.632"},{step:"Cluster: Bank and FMCG merge first (d=0.592)",formula:"\\text{Tree: } [\\text{IT}] \\;|\\; [\\text{Bank}, \\text{FMCG}]",explanation:"Bank and FMCG have the smallest distance, so they form the first cluster."},{step:"Recursive bisection",formula:"\\alpha = 1 - \\frac{V_{\\text{IT}}}{V_{\\text{IT}} + V_{\\{\\text{Bank,FMCG}\\}}}",explanation:"Compute cluster variances and split weights. FMCG gets the highest weight due to lowest volatility."}]}),e.jsx(b,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"HRP combines hierarchical clustering with risk-based allocation to produce portfolios that are more stable, require no matrix inversion, and naturally capture the sector structure of the Indian market. For NSE stocks, HRP typically groups banking/financial stocks together, separates defensive sectors (FMCG, Pharma, IT), and allocates more to lower-volatility clusters -- a behavior well-suited to Indian market dynamics."})})]})}const pe=Object.freeze(Object.defineProperty({__proto__:null,default:O},Symbol.toStringTag,{value:"Module"}));function W(){const[s,u]=m.useState(22),[r,f]=m.useState(6),[o,p]=m.useState(15),a=[s,r,o],c=a.map(x=>1/x),n=c.reduce((x,h)=>x+h,0),i=c.map(x=>x/n),d=["Nifty 50","G-Sec 10Y","Gold (MCX)"],l=["#6366f1","#22c55e","#f59e0b"],_=i.reduce((x,h,v)=>x+h*a[v],0)/Math.sqrt(i.reduce((x,h,v)=>x+i.reduce((g,w,j)=>g+h*w*a[v]*a[j]*(v===j?1:.2),0),0));return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Inverse Volatility Weighting"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust asset volatilities to see how inverse-vol weights respond."}),e.jsx("div",{className:"mb-4 grid grid-cols-3 gap-3",children:[["Nifty Vol (%)",s,u],["Bond Vol (%)",r,f],["Gold Vol (%)",o,p]].map(([x,h,v],g)=>e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:[x,": ",h,"%"]}),e.jsx("input",{type:"range",min:"2",max:"40",step:"1",value:h,onChange:w=>v(parseInt(w.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]},g))}),e.jsxs("svg",{viewBox:"0 0 400 160",className:"w-full max-w-md mx-auto block",children:[d.map((x,h)=>{const v=i[h]*300,g=20+h*45;return e.jsxs("g",{children:[e.jsx("rect",{x:60,y:g,width:v,height:28,fill:l[h],opacity:"0.7",rx:"4"}),e.jsx("text",{x:55,y:g+18,textAnchor:"end",className:"text-[10px] fill-gray-600",children:x}),e.jsxs("text",{x:65+v,y:g+18,className:"text-[10px] font-bold",fill:l[h],children:[(i[h]*100).toFixed(1),"%"]})]},h)}),e.jsxs("text",{x:200,y:155,textAnchor:"middle",className:"text-[10px] fill-gray-500",children:["Diversification Ratio: ",_.toFixed(3)]})]})]})}function K(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Inverse Volatility and Maximum Diversification"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Beyond ERC and HRP, two other risk-based portfolio construction methods are widely used: inverse volatility weighting and maximum diversification. Both avoid return estimation and focus purely on risk characteristics, making them robust choices for Indian market practitioners who distrust expected return forecasts."}),e.jsx(S,{title:"Inverse Volatility Portfolio",label:"Definition 9.7",definition:"The inverse volatility (IV) portfolio assigns weights inversely proportional to each asset's standalone volatility: w_i = (1/σ_i) / Σⱼ(1/σⱼ). This is the simplest risk-based allocation and ignores correlations entirely.",notation:"σ_i = annualized volatility of asset i"}),e.jsx(t.BlockMath,{math:"w_i^{\\text{IV}} = \\frac{1/\\sigma_i}{\\sum_{j=1}^{n} 1/\\sigma_j}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Inverse volatility is equivalent to the ERC portfolio when all pairwise correlations are equal. Despite its simplicity, it performs surprisingly well in practice because it naturally tilts away from volatile assets, acting as an implicit risk management mechanism."}),e.jsx(W,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Maximum Diversification Portfolio"}),e.jsx(S,{title:"Diversification Ratio",label:"Definition 9.8",definition:"The diversification ratio (DR) of a portfolio is the ratio of the weighted average of individual asset volatilities to the portfolio volatility: DR(w) = (w'σ) / √(w'Σw), where σ is the vector of individual volatilities. DR ≥ 1, with equality only when all assets are perfectly correlated.",notation:"DR = diversification ratio, σ = vector of volatilities"}),e.jsx(t.BlockMath,{math:"\\text{DR}(\\mathbf{w}) = \\frac{\\sum_{i=1}^{n} w_i \\sigma_i}{\\sqrt{\\mathbf{w}^\\top \\Sigma \\mathbf{w}}} = \\frac{\\mathbf{w}^\\top \\boldsymbol{\\sigma}}{\\sigma_p}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The Maximum Diversification Portfolio (MDP), introduced by Choueifaty and Coignard (2008), maximizes this ratio:"}),e.jsx(t.BlockMath,{math:"\\max_{\\mathbf{w}} \\quad \\frac{\\mathbf{w}^\\top \\boldsymbol{\\sigma}}{\\sqrt{\\mathbf{w}^\\top \\Sigma \\mathbf{w}}} \\quad \\text{s.t.} \\quad \\mathbf{w}^\\top \\mathbf{1} = 1, \\quad \\mathbf{w} \\geq 0"}),e.jsx(T,{title:"MDP and Implied Returns",label:"Theorem 9.6",statement:"The Maximum Diversification Portfolio is equivalent to the mean-variance tangency portfolio when expected returns are proportional to volatilities: μᵢ = c · σᵢ for some constant c > 0. This is equivalent to assuming all assets have equal Sharpe ratios.",proof:"When μ = c·σ, the tangency portfolio maximizes (w'μ - rf)/σ_p = c·(w'σ)/σ_p - rf/σ_p. Since rf/σ_p does not depend on the direction of w, maximizing this is equivalent to maximizing w'σ/σ_p = DR(w)."}),e.jsx(k,{title:"mdp_nse_stocks.py",runnable:!0,code:`import numpy as np
import cvxpy as cp

# Indian multi-asset universe
assets = ['Nifty 50', 'Nifty MidCap', 'Nifty SmallCap', 'G-Sec 10Y',
          'Corp Bonds', 'Gold (MCX)', 'Nifty Bank', 'Nifty IT']
n = len(assets)

vols = np.array([0.22, 0.28, 0.32, 0.06, 0.04, 0.15, 0.26, 0.22])
corr = np.array([
    [1.00, 0.85, 0.78, -0.10, 0.05, 0.10, 0.90, 0.55],
    [0.85, 1.00, 0.88, -0.12, 0.02, 0.12, 0.80, 0.50],
    [0.78, 0.88, 1.00, -0.15, 0.00, 0.15, 0.72, 0.45],
    [-0.10, -0.12, -0.15, 1.00, 0.80, 0.15, -0.12, -0.05],
    [0.05, 0.02, 0.00, 0.80, 1.00, 0.10, 0.03, 0.08],
    [0.10, 0.12, 0.15, 0.15, 0.10, 1.00, 0.08, 0.10],
    [0.90, 0.80, 0.72, -0.12, 0.03, 0.08, 1.00, 0.45],
    [0.55, 0.50, 0.45, -0.05, 0.08, 0.10, 0.45, 1.00],
])
Sigma = np.outer(vols, vols) * corr

# === Inverse Volatility Portfolio ===
w_iv = (1 / vols) / np.sum(1 / vols)
vol_iv = np.sqrt(w_iv @ Sigma @ w_iv)
dr_iv = (w_iv @ vols) / vol_iv

# === Maximum Diversification Portfolio ===
# Reformulate: min w'Σw / (w'σ)^2
# Use Cornish trick: let y = w/(w'σ), min y'Σy s.t. y'σ = 1
y = cp.Variable(n)
prob = cp.Problem(
    cp.Minimize(cp.quad_form(y, Sigma)),
    [vols @ y == 1, y >= 0]
)
prob.solve(solver=cp.SCS)
w_mdp = y.value / np.sum(y.value)
vol_mdp = np.sqrt(w_mdp @ Sigma @ w_mdp)
dr_mdp = (w_mdp @ vols) / vol_mdp

# === Equal Weight ===
w_ew = np.ones(n) / n
vol_ew = np.sqrt(w_ew @ Sigma @ w_ew)
dr_ew = (w_ew @ vols) / vol_ew

print("=== Portfolio Comparison (Indian Multi-Asset) ===")
print(f"\\n{'Method':<20} {'Vol':>8} {'DR':>8}")
print("-" * 40)
print(f"{'Equal Weight':<20} {vol_ew:>8.4f} {dr_ew:>8.4f}")
print(f"{'Inverse Vol':<20} {vol_iv:>8.4f} {dr_iv:>8.4f}")
print(f"{'Max Diversification':<20} {vol_mdp:>8.4f} {dr_mdp:>8.4f}")

print(f"\\n=== Maximum Diversification Portfolio Weights ===")
for a, w in sorted(zip(assets, w_mdp), key=lambda x: -x[1]):
    if w > 0.001:
        print(f"  {a:<15}: {w:.4f} ({w:.2%})")`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Comparing Risk-Based Methods on Indian Data"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Let us compare all four risk-based methods (IV, ERC, HRP, MDP) on a backtest using NSE sector data. The key metrics are out-of-sample volatility, maximum drawdown, and turnover."}),e.jsx(k,{title:"risk_parity_backtest.py",runnable:!0,code:`import numpy as np

np.random.seed(42)
n_assets = 6
T = 252 * 5  # 5 years daily

assets = ['Nifty 50', 'Nifty Bank', 'G-Sec', 'Gold', 'Nifty IT', 'Nifty FMCG']
true_mu = np.array([0.12, 0.14, 0.07, 0.08, 0.13, 0.10]) / 252
true_vols = np.array([0.22, 0.26, 0.06, 0.15, 0.22, 0.15]) / np.sqrt(252)
true_corr = np.array([
    [1.0, 0.85, -0.1, 0.1, 0.55, 0.35],
    [0.85, 1.0, -0.12, 0.08, 0.45, 0.30],
    [-0.1, -0.12, 1.0, 0.15, -0.05, 0.10],
    [0.1, 0.08, 0.15, 1.0, 0.10, 0.08],
    [0.55, 0.45, -0.05, 0.10, 1.0, 0.25],
    [0.35, 0.30, 0.10, 0.08, 0.25, 1.0],
])
true_cov = np.outer(true_vols, true_vols) * true_corr

# Simulate returns
returns = np.random.multivariate_normal(true_mu, true_cov, T)

# Strategy: rebalance monthly using rolling 1-year estimation
lookback = 252
rebal_freq = 21
strategies = {'Equal Weight': [], 'Inverse Vol': [], 'MDP': []}

for t in range(lookback, T, rebal_freq):
    hist = returns[t-lookback:t]
    cov_est = np.cov(hist.T)
    vol_est = np.sqrt(np.diag(cov_est))

    # Equal weight
    w_ew = np.ones(n_assets) / n_assets
    strategies['Equal Weight'].append(w_ew)

    # Inverse vol
    w_iv = (1/vol_est) / np.sum(1/vol_est)
    strategies['Inverse Vol'].append(w_iv)

    # MDP (simplified via correlation structure)
    inv_vol = np.diag(1/vol_est)
    corr_est = inv_vol @ cov_est @ inv_vol
    ones = np.ones(n_assets)
    try:
        corr_inv = np.linalg.inv(corr_est)
        z = corr_inv @ ones
        w_mdp = (z / vol_est) / np.sum(z / vol_est)
        w_mdp = np.maximum(w_mdp, 0)
        w_mdp /= w_mdp.sum()
    except:
        w_mdp = w_iv
    strategies['MDP'].append(w_mdp)

# Compute portfolio returns
for name, weight_list in strategies.items():
    port_rets = []
    for i, w in enumerate(weight_list):
        start = lookback + i * rebal_freq
        end = min(start + rebal_freq, T)
        period_ret = returns[start:end] @ w
        port_rets.extend(period_ret.tolist())

    port_rets = np.array(port_rets)
    ann_ret = np.mean(port_rets) * 252
    ann_vol = np.std(port_rets) * np.sqrt(252)
    sharpe = ann_ret / ann_vol
    cum = np.cumprod(1 + port_rets)
    max_dd = np.min(cum / np.maximum.accumulate(cum) - 1)

    print(f"{name:<15}: Return={ann_ret:.2%}, Vol={ann_vol:.2%}, "
          f"Sharpe={sharpe:.3f}, MaxDD={max_dd:.2%}")`}),e.jsx(C,{title:"Inverse Volatility for Three Indian Assets",difficulty:"beginner",problem:"Compute inverse volatility weights for Nifty 50 ($\\\\sigma=22\\\\%$), Indian G-Sec ($\\\\sigma=6\\\\%$), and Gold MCX ($\\\\sigma=15\\\\%$).",solution:[{step:"Compute inverse volatilities",formula:"1/\\sigma_1 = 1/0.22 = 4.545, \\quad 1/\\sigma_2 = 1/0.06 = 16.667, \\quad 1/\\sigma_3 = 1/0.15 = 6.667"},{step:"Sum of inverse volatilities",formula:"\\sum 1/\\sigma_i = 4.545 + 16.667 + 6.667 = 27.879"},{step:"Compute weights",formula:"w_{\\text{Nifty}} = 4.545/27.879 = 16.3\\%, \\quad w_{\\text{G-Sec}} = 16.667/27.879 = 59.8\\%, \\quad w_{\\text{Gold}} = 6.667/27.879 = 23.9\\%",explanation:"G-Sec dominates because it has the lowest volatility. This is typical for Indian multi-asset risk parity portfolios."}]}),e.jsx(b,{title:"Practical Implementation on Zerodha/Kite",type:"tip",children:e.jsxs("ul",{className:"space-y-1 list-disc list-inside",children:[e.jsx("li",{children:"Use Zerodha Coin for G-Sec exposure via Gilt mutual funds"}),e.jsx("li",{children:"Gold exposure via Sovereign Gold Bonds (SGBs) or Gold ETFs on NSE"}),e.jsx("li",{children:"Nifty 50 exposure via index ETFs or Nifty BeES"}),e.jsx("li",{children:"Rebalance quarterly to minimize STT impact (0.1% on delivery trades)"}),e.jsx("li",{children:"Track the diversification ratio to ensure the portfolio remains well-diversified"})]})}),e.jsx(b,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Inverse volatility is the simplest risk-based allocation and works well as a baseline. Maximum diversification takes correlations into account and produces portfolios with the highest diversification ratio. For Indian investors, both methods naturally lead to significant fixed-income and gold allocations -- a welcome antidote to the common home-bias toward equity-heavy portfolios."})})]})}const xe=Object.freeze(Object.defineProperty({__proto__:null,default:K},Symbol.toStringTag,{value:"Module"}));function Q(){const[s,u]=m.useState(2.5),[r,f]=m.useState(6.5),o=["RELIANCE","TCS","HDFCBANK","INFY","ITC"],p=[.25,.2,.18,.15,.1],a=[.28,.22,.2,.24,.18],c=p.map((n,i)=>r/100+s*n*a[i]*a[i]);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Implied Equilibrium Returns"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust risk aversion and risk-free rate to see implied returns for top Nifty 50 constituents."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Risk Aversion ",e.jsx(t.InlineMath,{math:"\\delta"}),": ",s.toFixed(1)]}),e.jsx("input",{type:"range",min:"0.5",max:"6",step:"0.1",value:s,onChange:n=>u(parseFloat(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Risk-Free Rate: ",r.toFixed(1),"% (G-Sec)"]}),e.jsx("input",{type:"range",min:"4",max:"9",step:"0.1",value:r,onChange:n=>f(parseFloat(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto text-xs border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-3 py-1 text-left text-gray-600 dark:text-gray-400",children:"Stock"}),e.jsx("th",{className:"px-3 py-1 text-right text-gray-600 dark:text-gray-400",children:"Mcap Wt"}),e.jsx("th",{className:"px-3 py-1 text-right text-gray-600 dark:text-gray-400",children:"Vol"}),e.jsx("th",{className:"px-3 py-1 text-right text-gray-600 dark:text-gray-400",children:"Implied Return"})]})}),e.jsx("tbody",{className:"text-gray-700 dark:text-gray-300",children:o.map((n,i)=>e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-1 font-mono",children:n}),e.jsxs("td",{className:"px-3 py-1 text-right",children:[(p[i]*100).toFixed(1),"%"]}),e.jsxs("td",{className:"px-3 py-1 text-right",children:[(a[i]*100).toFixed(0),"%"]}),e.jsxs("td",{className:"px-3 py-1 text-right font-semibold text-indigo-600",children:[(c[i]*100).toFixed(2),"%"]})]},i))})]})})]})}function $(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Market-Implied Equilibrium Returns"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"The Black-Litterman model (1992) begins with a powerful observation: if the market portfolio is the equilibrium outcome of all investors optimizing, then we can reverse-engineer the expected returns implied by market capitalization weights. These “implied” returns serve as a neutral starting point, far more stable than historical sample means. For Indian markets, we extract implied returns from Nifty 50 market-cap weights."}),e.jsx(S,{title:"Market-Implied Equilibrium Returns",label:"Definition 9.9",definition:"The equilibrium expected return vector Π is the set of returns that, when plugged into a mean-variance optimizer, would produce the market-capitalization-weighted portfolio as the optimal solution. Formally: Π = δΣw_mkt, where δ is the risk aversion coefficient, Σ is the covariance matrix, and w_mkt is the market-cap weight vector.",notation:"Π = equilibrium returns, δ = risk aversion, w_mkt = market-cap weights"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Reverse Optimization"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The key insight is that in CAPM equilibrium, the market portfolio is mean-variance efficient. The first-order conditions of the Markowitz problem yield:"}),e.jsx(t.BlockMath,{math:"\\boldsymbol{\\Pi} = \\delta \\Sigma \\mathbf{w}_{\\text{mkt}}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where the risk aversion parameter ",e.jsx(t.InlineMath,{math:"\\delta"})," is calibrated from the market’s expected excess return and variance:"]}),e.jsx(t.BlockMath,{math:"\\delta = \\frac{E[R_m] - r_f}{\\sigma_m^2}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For the Indian market, using the Nifty 50 with expected excess return of ~6% and volatility of ~18%:"}),e.jsx(t.BlockMath,{math:"\\delta = \\frac{0.06}{0.18^2} = \\frac{0.06}{0.0324} \\approx 1.85"}),e.jsx(T,{title:"Equilibrium Returns and CAPM",label:"Theorem 9.7",statement:"The implied equilibrium returns Π are proportional to each asset's beta with respect to the market portfolio: Πᵢ = δ · βᵢ · σ²_m = δ · Cov(Rᵢ, R_m), where βᵢ = Cov(Rᵢ, R_m)/σ²_m. This is precisely the CAPM expected return.",proof:"By definition, Π = δΣw_mkt. The i-th element is Πᵢ = δ Σᵢ w_mkt = δ · Cov(Rᵢ, R_m) since Cov(Rᵢ, R_m) = Σᵢ w_mkt (the i-th row of the covariance matrix times the market weights). Dividing by σ²_m = w_mkt'Σw_mkt gives the CAPM beta relation."}),e.jsx(Q,{}),e.jsx(k,{title:"implied_returns_nifty50.py",runnable:!0,code:`import numpy as np

# Top 15 Nifty 50 constituents by market cap (approximate weights)
tickers = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK',
           'HINDUNILVR', 'ITC', 'SBIN', 'BHARTIARTL', 'LT',
           'AXISBANK', 'KOTAKBANK', 'BAJFINANCE', 'WIPRO', 'MARUTI']

# Market-cap weights (approximate, sum < 1 for top 15)
w_mkt = np.array([0.112, 0.088, 0.072, 0.060, 0.055,
                   0.048, 0.045, 0.038, 0.035, 0.032,
                   0.028, 0.026, 0.024, 0.018, 0.016])
w_mkt = w_mkt / w_mkt.sum()  # Normalize to sum to 1

# Annualized volatilities (approximate)
vols = np.array([0.28, 0.22, 0.22, 0.24, 0.24,
                 0.18, 0.20, 0.30, 0.26, 0.28,
                 0.28, 0.24, 0.35, 0.24, 0.26])

# Correlation matrix (stylized for Nifty 50)
n = len(tickers)
np.random.seed(42)
corr = np.eye(n) * 0.4 + 0.6 * np.ones((n, n)) * 0.3
np.fill_diagonal(corr, 1.0)
# Sector correlations
for i, j in [(0,9), (1,3), (1,13), (3,13), (2,4), (2,10), (2,11), (4,10), (4,11), (10,11)]:
    corr[i,j] = corr[j,i] = 0.7
for i, j in [(5,6),]:
    corr[i,j] = corr[j,i] = 0.5

Sigma = np.outer(vols, vols) * corr

# Calibrate risk aversion from market
# Nifty 50 expected excess return ~6%, vol ~18%
market_excess_return = 0.06
market_vol = np.sqrt(w_mkt @ Sigma @ w_mkt)
delta = market_excess_return / market_vol**2

# Implied equilibrium returns
Pi = delta * Sigma @ w_mkt
rf = 0.065  # 10Y G-Sec yield

print("=== Market-Implied Equilibrium Returns (Nifty 50) ===")
print(f"Risk aversion (delta): {delta:.4f}")
print(f"Market volatility: {market_vol:.4f} ({market_vol:.2%})")
print(f"Risk-free rate: {rf:.1%} (10Y G-Sec)")
print(f"\\n{'Ticker':<12} {'Mcap Wt':>8} {'Vol':>8} {'Implied mu':>10} {'Total':>10}")
print("-" * 55)
for t, w, v, pi in zip(tickers, w_mkt, vols, Pi):
    print(f"{t:<12} {w:>8.4f} {v:>8.2%} {pi:>10.4f} {rf+pi:>10.2%}")

# Verify: optimizing with Pi should recover w_mkt
Sigma_inv = np.linalg.inv(Sigma)
w_check = Sigma_inv @ Pi / (np.ones(n) @ Sigma_inv @ Pi)
print(f"\\nVerification (max weight deviation): {np.max(np.abs(w_check - w_mkt)):.6f}")`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Why Implied Returns Are Superior to Historical Means"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Implied returns offer several advantages over historical sample means for Indian portfolios:"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Property"}),e.jsx("th",{className:"px-4 py-2 text-center text-gray-600 dark:text-gray-400",children:"Historical Means"}),e.jsx("th",{className:"px-4 py-2 text-center text-gray-600 dark:text-gray-400",children:"Implied Returns"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Stability"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"Volatile (SE ~ 1%/yr)"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"Stable (market-cap anchored)"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Economic meaning"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"Backward-looking"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"Forward-looking equilibrium"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Regime sensitivity"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"Contaminated by past regimes"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"Reflects current market view"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Portfolio optimality"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"Produces extreme weights"}),e.jsx("td",{className:"px-4 py-2 text-center",children:"Produces market portfolio"})]})]})]})}),e.jsx(C,{title:"Computing Implied Return for Reliance Industries",difficulty:"intermediate",problem:"Reliance has a Nifty 50 weight of 11.2%, volatility of 28%, and correlation with the market of 0.85. The market volatility is 18%. Compute the implied excess return with $\\\\delta = 1.85$.",solution:[{step:"Compute beta",formula:"\\beta_{\\text{REL}} = \\frac{\\rho \\cdot \\sigma_{\\text{REL}}}{\\sigma_m} = \\frac{0.85 \\times 0.28}{0.18} = 1.322"},{step:"Compute implied excess return (CAPM)",formula:"\\Pi_{\\text{REL}} = \\delta \\cdot \\beta_{\\text{REL}} \\cdot \\sigma_m^2 = 1.85 \\times 1.322 \\times 0.0324 = 0.0793",explanation:"The implied excess return is 7.93%, giving a total implied return of 7.93% + 6.5% = 14.43%."},{step:"Interpret",formula:"E[R_{\\text{REL}}] = r_f + \\Pi_{\\text{REL}} = 6.5\\% + 7.93\\% = 14.43\\%",explanation:'This is the return the market "believes" Reliance will earn, consistent with its weight in the Nifty 50.'}]}),e.jsx(b,{title:"Data Sources for Indian Markets",type:"tip",children:e.jsxs("ul",{className:"space-y-1 list-disc list-inside",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Market-cap weights:"})," NSE publishes Nifty 50 constituent weights monthly"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Risk-free rate:"})," RBI publishes G-Sec yields (use 10Y benchmark)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Covariance matrix:"})," Compute from NSE daily adjusted close prices"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Risk aversion:"})," Calibrate from Nifty 50 excess return / variance"]}),e.jsx("li",{children:"The Nifty 50 free-float market-cap methodology aligns perfectly with BL assumptions"})]})}),e.jsx(b,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Market-implied equilibrium returns are the foundation of the Black-Litterman model. By reverse-engineering returns from Nifty 50 market-cap weights, we obtain a stable, economically meaningful starting point. In the next section, we learn how to blend investor views with these equilibrium returns to produce tilted portfolios."})})]})}const he=Object.freeze(Object.defineProperty({__proto__:null,default:$},Symbol.toStringTag,{value:"Module"}));function U(){const[s,u]=m.useState(.5),[r,f]=m.useState(50),[o,p]=m.useState(.05),a=.12,c=.18,n=(100-r)/100*.05,i=o*.04,d=(i*c/n+a)/(i/n+1);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: View Blending (Single Asset)"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"See how view confidence and tau affect the blended return for an Indian stock."}),e.jsxs("div",{className:"mb-4 grid grid-cols-3 gap-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:[e.jsx(t.InlineMath,{math:"\\tau"})," = ",o.toFixed(3)]}),e.jsx("input",{type:"range",min:"0.01",max:"0.20",step:"0.005",value:o,onChange:l=>p(parseFloat(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["View Confidence: ",r,"%"]}),e.jsx("input",{type:"range",min:"10",max:"95",step:"5",value:r,onChange:l=>f(parseInt(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["View Return: ",(c*100).toFixed(0),"%"]}),e.jsx("input",{type:"range",min:"0.05",max:"0.30",step:"0.01",value:s,onChange:l=>u(parseFloat(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 400 100",className:"w-full max-w-md mx-auto block",children:[e.jsx("line",{x1:50,y1:50,x2:350,y2:50,stroke:"#d1d5db",strokeWidth:"2"}),e.jsx("circle",{cx:50+a*1500,cy:50,r:"6",fill:"#6366f1"}),e.jsxs("text",{x:50+a*1500,y:35,textAnchor:"middle",className:"text-[9px] fill-indigo-600 font-semibold",children:["Equil: ",(a*100).toFixed(1),"%"]}),e.jsx("circle",{cx:50+c*1500,cy:50,r:"6",fill:"#f59e0b"}),e.jsxs("text",{x:50+c*1500,y:35,textAnchor:"middle",className:"text-[9px] fill-amber-600 font-semibold",children:["View: ",(c*100).toFixed(1),"%"]}),e.jsx("circle",{cx:50+d*1500,cy:50,r:"8",fill:"#22c55e",stroke:"#fff",strokeWidth:"2"}),e.jsxs("text",{x:50+d*1500,y:75,textAnchor:"middle",className:"text-[10px] fill-green-600 font-bold",children:["BL: ",(d*100).toFixed(2),"%"]})]})]})}function X(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Views and Blending in Black-Litterman"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"The Black-Litterman model’s second key ingredient is the ability to incorporate investor views on expected returns. Views can be absolute (“Nifty IT will return 15%”) or relative (“IT will outperform Banking by 3%”). The model blends these views with equilibrium returns using Bayesian updating, producing a posterior distribution that tilts away from market-cap weights toward the views."}),e.jsx(S,{title:"Black-Litterman View Structure",label:"Definition 9.10",definition:"Views are expressed as P × μ = Q + ε, where P is a K×N pick matrix identifying which assets are involved in each view, Q is a K×1 vector of expected returns from the views, and ε ~ N(0, Ω) represents view uncertainty. Ω is a K×K diagonal matrix of view confidence levels.",notation:"P = pick matrix, Q = view returns, Ω = view uncertainty matrix, K = number of views"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Types of Views"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:[e.jsx("strong",{children:"Absolute view:"})," “TCS will return 15% annually.” Row of P: ",e.jsx(t.InlineMath,{math:"[0, 1, 0, \\ldots, 0]"}),", Q entry: 0.15."]}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:[e.jsx("strong",{children:"Relative view:"})," “Nifty IT will outperform Nifty Bank by 3%.” Row of P: ",e.jsx(t.InlineMath,{math:"[0, \\ldots, +1, \\ldots, -1, \\ldots, 0]"}),", Q entry: 0.03."]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"The Black-Litterman Master Formula"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The posterior expected returns combine equilibrium and views via Bayesian updating:"}),e.jsx(t.BlockMath,{math:"\\boldsymbol{\\mu}_{\\text{BL}} = \\left[(\\tau\\Sigma)^{-1} + P^\\top \\Omega^{-1} P\\right]^{-1} \\left[(\\tau\\Sigma)^{-1}\\boldsymbol{\\Pi} + P^\\top \\Omega^{-1} \\mathbf{Q}\\right]"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The posterior covariance is:"}),e.jsx(t.BlockMath,{math:"\\bar{\\Sigma} = \\left[(\\tau\\Sigma)^{-1} + P^\\top \\Omega^{-1} P\\right]^{-1} + \\Sigma"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"\\tau"})," is a scalar (typically 0.025-0.05) representing the uncertainty in the equilibrium prior. It controls the relative weight given to equilibrium vs. views."]}),e.jsx(T,{title:"Black-Litterman as Bayesian Update",label:"Theorem 9.8",statement:"The BL posterior is the result of a Bayesian conjugate update: Prior: μ ~ N(Π, τΣ), Likelihood: Pμ = Q + ε where ε ~ N(0, Ω). The posterior is μ|Q ~ N(μ_BL, Σ_BL) where μ_BL and Σ_BL are given by the master formula.",proof:"This follows directly from the conjugate normal-normal model. The prior precision is (τΣ)⁻¹ and the likelihood precision is P'Ω⁻¹P. The posterior precision is their sum, and the posterior mean is the precision-weighted average of prior mean and observed data."}),e.jsx(U,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Setting View Confidence (Omega)"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The uncertainty matrix ",e.jsx(t.InlineMath,{math:"\\Omega"})," controls how much the views tilt the posterior. He and Litterman (1999) suggested:"]}),e.jsx(t.BlockMath,{math:"\\Omega = \\text{diag}(P(\\tau\\Sigma)P^\\top)"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"This sets view uncertainty proportional to the equilibrium uncertainty of the assets involved. Alternatively, Idzorek (2005) proposed a confidence-based approach where analysts specify a percentage confidence (0-100%) for each view."}),e.jsx(k,{title:"black_litterman_nifty.py",runnable:!0,code:`import numpy as np

# Top 8 Nifty 50 stocks
tickers = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK',
           'ITC', 'LT', 'AXISBANK']
n = len(tickers)

# Market-cap weights (normalized)
w_mkt = np.array([0.15, 0.12, 0.10, 0.08, 0.07, 0.06, 0.05, 0.04])
w_mkt /= w_mkt.sum()

# Covariance matrix
vols = np.array([0.28, 0.22, 0.22, 0.24, 0.24, 0.20, 0.28, 0.28])
np.random.seed(42)
corr_base = np.full((n, n), 0.35)
np.fill_diagonal(corr_base, 1.0)
# Higher intra-sector correlations
corr_base[1, 3] = corr_base[3, 1] = 0.72  # TCS-INFY (IT)
corr_base[2, 4] = corr_base[4, 2] = 0.78  # HDFC-ICICI (Banking)
corr_base[2, 7] = corr_base[7, 2] = 0.70  # HDFC-Axis (Banking)
corr_base[4, 7] = corr_base[7, 4] = 0.75  # ICICI-Axis (Banking)
Sigma = np.outer(vols, vols) * corr_base

# Risk aversion and equilibrium returns
delta = 1.85
tau = 0.05
Pi = delta * Sigma @ w_mkt

print("=== Equilibrium Returns (Prior) ===")
for t, pi in zip(tickers, Pi):
    print(f"  {t:<12}: {pi:.4f} ({pi+0.065:.2%} total)")

# === Views ===
# View 1 (Absolute): IT sector (TCS) will return 16% (excess ~9.5%)
# View 2 (Relative): Banking (HDFCBANK) will outperform Energy (RELIANCE) by 3%
# View 3 (Absolute): L&T will return 18% (excess ~11.5%)
K = 3
P = np.zeros((K, n))
Q = np.zeros(K)

# View 1: TCS absolute return of 16%
P[0, 1] = 1  # TCS
Q[0] = 0.095  # 16% - 6.5% rf

# View 2: HDFCBANK outperforms RELIANCE by 3%
P[1, 2] = 1   # HDFCBANK
P[1, 0] = -1  # RELIANCE
Q[1] = 0.03

# View 3: L&T absolute return of 18%
P[2, 6] = 1  # LT
Q[2] = 0.115

# View uncertainty (He-Litterman method)
Omega = np.diag(np.diag(P @ (tau * Sigma) @ P.T))

# Black-Litterman posterior
tau_Sigma_inv = np.linalg.inv(tau * Sigma)
Omega_inv = np.linalg.inv(Omega)

# Posterior mean
M = np.linalg.inv(tau_Sigma_inv + P.T @ Omega_inv @ P)
mu_BL = M @ (tau_Sigma_inv @ Pi + P.T @ Omega_inv @ Q)

# Posterior covariance
Sigma_BL = M + Sigma

# Optimal weights
w_BL = np.linalg.inv(delta * Sigma_BL) @ mu_BL
w_BL = w_BL / w_BL.sum()  # Normalize

print(f"\\n=== Black-Litterman Posterior ===")
print(f"{'Ticker':<12} {'Equil':>8} {'BL Post':>8} {'Mkt Wt':>8} {'BL Wt':>8} {'Delta':>8}")
print("-" * 55)
for t, pi, mu, wm, wb in zip(tickers, Pi, mu_BL, w_mkt, w_BL):
    print(f"{t:<12} {pi:>8.4f} {mu:>8.4f} {wm:>8.4f} {wb:>8.4f} {wb-wm:>+8.4f}")

print(f"\\nViews:")
print(f"  1. TCS return = 16% -> BL tilts toward IT")
print(f"  2. HDFC > RELIANCE by 3% -> tilts toward banking")
print(f"  3. L&T return = 18% -> overweights L&T")`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Views on Indian Sectors"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"In practice, views on Indian markets often come from:"}),e.jsxs("ul",{className:"list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4",children:[e.jsx("li",{children:"Broker research: Analysts at ICICI Securities, Motilal Oswal, Kotak provide sector outlook"}),e.jsx("li",{children:"RBI monetary policy: Rate cuts favor banking sector, rate hikes favor IT (USD earnings)"}),e.jsx("li",{children:"Global commodity prices: Oil prices affect Reliance, ONGC, IOC"}),e.jsx("li",{children:"Government policy: Budget announcements, PLI schemes for manufacturing"}),e.jsx("li",{children:"FII/DII flow data published by SEBI and NSDL"})]}),e.jsx(C,{title:"Constructing a Relative View",difficulty:"intermediate",problem:"An analyst believes Nifty IT (TCS weight 0.6, Infosys weight 0.4) will outperform Nifty Bank (HDFC Bank weight 0.5, ICICI Bank weight 0.3, Axis Bank weight 0.2) by 4% over the next year. Express this as a BL view.",solution:[{step:"Construct the pick matrix row",formula:"P_k = [0, +0.6, -0.5, +0.4, -0.3, 0, 0, -0.2]",explanation:"Positive weights for IT stocks (proportional to intra-sector weights), negative for banking stocks."},{step:"Set the view return",formula:"Q_k = 0.04",explanation:"The expected outperformance is 4%."},{step:"Set view confidence",formula:"\\Omega_{kk} = P_k (\\tau \\Sigma) P_k^\\top",explanation:"Using the He-Litterman method, confidence scales with the prior uncertainty of the assets involved."}]}),e.jsxs(b,{title:"Idzorek Confidence Method",type:"tip",children:[e.jsx("p",{children:"Idzorek’s method lets you express view confidence as a percentage (0-100%). At 100% confidence, the view fully overrides the equilibrium; at 0%, the equilibrium prevails. For Indian markets, typical confidences might be:"}),e.jsxs("ul",{className:"mt-2 space-y-1 list-disc list-inside",children:[e.jsx("li",{children:"RBI policy impact on banking: 60-80% confidence"}),e.jsx("li",{children:"Earnings growth forecast for IT: 40-60% confidence"}),e.jsx("li",{children:"Commodity price view: 30-50% confidence"}),e.jsx("li",{children:"Budget-related sector bets: 20-40% confidence"})]})]}),e.jsx(b,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"The Black-Litterman model elegantly blends market equilibrium with investor views using Bayesian updating. For Indian market practitioners, it offers a disciplined framework to incorporate research views while anchoring to the Nifty 50 market-cap equilibrium. The result is portfolios that tilt meaningfully toward views without the extreme positions that raw mean-variance optimization produces."})})]})}const ge=Object.freeze(Object.defineProperty({__proto__:null,default:X},Symbol.toStringTag,{value:"Module"}));function Y(){const[s,u]=m.useState("mean"),[r,f]=m.useState(0),[o,p]=m.useState(.15),a=["Nifty 50","G-Sec 10Y","Gold","Nifty IT"],c=[.12,.07,.08,.14],n=[.22,.06,.15,.22],i=s==="mean"?Math.pow(o-c[r],2)/(2*Math.pow(n[r],2)):Math.abs(Math.log(o/n[r]));return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Entropy Pooling View Impact"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Explore how different view types affect the posterior distribution via entropy pooling."}),e.jsxs("div",{className:"mb-4 grid grid-cols-3 gap-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsx("span",{children:"View Type"}),e.jsxs("select",{value:s,onChange:d=>u(d.target.value),className:"rounded border px-2 py-1 text-xs dark:bg-gray-800 dark:border-gray-600",children:[e.jsx("option",{value:"mean",children:"Mean View"}),e.jsx("option",{value:"vol",children:"Volatility View"})]})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Asset: ",a[r]]}),e.jsx("input",{type:"range",min:"0",max:"3",step:"1",value:r,onChange:d=>f(parseInt(d.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["View Value: ",(o*100).toFixed(1),"%"]}),e.jsx("input",{type:"range",min:"0.02",max:"0.30",step:"0.01",value:o,onChange:d=>p(parseFloat(d.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-3 text-center text-xs",children:[e.jsxs("div",{className:"rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30",children:[e.jsxs("div",{className:"text-gray-500",children:["Prior ",s==="mean"?"Mean":"Vol"]}),e.jsxs("div",{className:"text-lg font-bold text-indigo-600",children:[((s==="mean"?c[r]:n[r])*100).toFixed(1),"%"]})]}),e.jsxs("div",{className:"rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30",children:[e.jsxs("div",{className:"text-gray-500",children:["View ",s==="mean"?"Mean":"Vol"]}),e.jsxs("div",{className:"text-lg font-bold text-amber-600",children:[(o*100).toFixed(1),"%"]})]}),e.jsxs("div",{className:"rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30",children:[e.jsx("div",{className:"text-gray-500",children:"KL Divergence"}),e.jsx("div",{className:"text-lg font-bold text-purple-600",children:i.toFixed(4)})]})]})]})}function Z(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Augmented Black-Litterman and Entropy Pooling"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"The classical Black-Litterman model assumes views on expected returns from a Gaussian distribution. Modern extensions relax these assumptions significantly. The Augmented Black-Litterman (ABL) model and Meucci’s Entropy Pooling framework allow views on any distributional feature -- volatility, correlation, skewness, tail probabilities -- making them powerful tools for Indian markets where non-normality is pervasive."}),e.jsx(S,{title:"Entropy Pooling",label:"Definition 9.11",definition:"Entropy Pooling (Meucci, 2008) finds the posterior distribution that is closest to the prior (in the Kullback-Leibler sense) while satisfying arbitrary view constraints. The posterior probabilities p* minimize: D_KL(p||p₀) = Σⱼ pⱼ ln(pⱼ/p₀ⱼ) subject to view constraints expressed as expectations under p.",notation:"p₀ = prior probabilities, p* = posterior, D_KL = KL divergence"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Limitations of Classical BL"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The classical BL model has several limitations when applied to Indian markets:"}),e.jsxs("ul",{className:"list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4",children:[e.jsx("li",{children:"Only supports views on expected returns (not volatility, correlation, or tail risk)"}),e.jsx("li",{children:"Assumes Gaussian distributions (Indian stock returns exhibit fat tails and skewness)"}),e.jsx("li",{children:"Cannot express views like “Nifty volatility will exceed 25%”"}),e.jsx("li",{children:"Cannot handle conditional views like “if RBI cuts rates, banking outperforms”"})]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"The Entropy Pooling Framework"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["Entropy pooling works with a discrete set of J scenarios, each with prior probability",e.jsx(t.InlineMath,{math:"p_{0,j}"}),". The posterior probabilities ",e.jsx(t.InlineMath,{math:"p^*"})," solve:"]}),e.jsx(t.BlockMath,{math:"\\min_{\\mathbf{p}} \\sum_{j=1}^{J} p_j \\ln\\frac{p_j}{p_{0,j}} \\quad \\text{s.t.} \\quad \\sum_j p_j = 1, \\quad p_j \\geq 0, \\quad \\sum_j p_j g_k(\\mathbf{x}_j) = v_k \\;\\; \\forall k"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"g_k(\\mathbf{x}_j)"})," are arbitrary functions of the scenarios and",e.jsx(t.InlineMath,{math:"v_k"})," are the view targets. This can express:"]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"View Type"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Constraint"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Indian Example"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Mean return"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"\\sum p_j x_{ij} = \\mu_i"})}),e.jsx("td",{className:"px-4 py-2",children:"Nifty IT return = 15%"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Volatility"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"\\sum p_j (x_{ij} - \\mu_i)^2 = \\sigma_i^2"})}),e.jsx("td",{className:"px-4 py-2",children:"Nifty Bank vol = 28%"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Correlation"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"\\sum p_j x_{ij} x_{kj} = \\sigma_{ik}"})}),e.jsx("td",{className:"px-4 py-2",children:"Gold-Nifty corr = 0.1"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Tail probability"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"\\sum p_j \\mathbb{1}(x_{ij} < c) = \\alpha"})}),e.jsx("td",{className:"px-4 py-2",children:"P(Nifty < -10%) = 5%"})]})]})]})}),e.jsx(T,{title:"Entropy Pooling Solution",label:"Theorem 9.9",statement:"The entropy pooling problem has a unique solution of exponential family form: p*ⱼ = p₀ⱼ exp(Σₖ λₖ gₖ(xⱼ)) / Z(λ), where λₖ are Lagrange multipliers and Z(λ) is the partition function ensuring Σ pⱼ = 1.",proof:"The KL minimization with linear constraints yields a convex dual problem. By the KKT conditions, the optimal probabilities take the exponential tilt form. Uniqueness follows from strict convexity of KL divergence."}),e.jsx(Y,{}),e.jsx(k,{title:"entropy_pooling_nifty.py",runnable:!0,code:`import numpy as np
from scipy.optimize import minimize

np.random.seed(42)

# Generate J scenarios from prior distribution
J = 10000  # Number of scenarios
n = 4      # Assets: Nifty 50, G-Sec, Gold, Nifty IT

mu_prior = np.array([0.12, 0.07, 0.08, 0.14])
vols = np.array([0.22, 0.06, 0.15, 0.22])
corr = np.array([
    [1.0, -0.1, 0.1, 0.55],
    [-0.1, 1.0, 0.15, -0.05],
    [0.1, 0.15, 1.0, 0.10],
    [0.55, -0.05, 0.10, 1.0],
])
Sigma = np.outer(vols, vols) * corr

# Generate scenarios
X = np.random.multivariate_normal(mu_prior, Sigma, J)
p0 = np.ones(J) / J  # Uniform prior

# Views:
# 1. Nifty IT mean return = 16% (bullish on IT)
# 2. Gold volatility will be 18% (higher than prior 15%)

# Entropy pooling via dual optimization
def dual_objective(lam):
    """Dual of entropy pooling."""
    lam_mean = lam[0]
    lam_vol = lam[1]

    # View 1: E[X_IT] = 0.16
    g1 = X[:, 3]  # Nifty IT returns
    # View 2: E[(X_Gold - E[X_Gold])^2] = 0.18^2
    g2 = (X[:, 2] - np.mean(X[:, 2]))**2

    log_p = np.log(p0) + lam_mean * g1 + lam_vol * g2
    log_Z = np.max(log_p) + np.log(np.sum(np.exp(log_p - np.max(log_p))))

    # Dual = log(Z) - lambda * target
    dual = log_Z - lam_mean * 0.16 - lam_vol * 0.18**2
    return dual

result = minimize(dual_objective, [0.0, 0.0], method='Nelder-Mead',
                  options={'maxiter': 10000, 'xatol': 1e-10})
lam_opt = result.x

# Compute posterior probabilities
g1 = X[:, 3]
g2 = (X[:, 2] - np.mean(X[:, 2]))**2
log_p = np.log(p0) + lam_opt[0] * g1 + lam_opt[1] * g2
log_p -= np.max(log_p)
p_star = np.exp(log_p)
p_star /= p_star.sum()

# Compute posterior statistics
assets = ['Nifty 50', 'G-Sec 10Y', 'Gold', 'Nifty IT']
print("=== Entropy Pooling Results ===")
print(f"{'Asset':<12} {'Prior Mean':>10} {'Post Mean':>10} {'Prior Vol':>10} {'Post Vol':>10}")
print("-" * 57)
for i, a in enumerate(assets):
    prior_mean = np.sum(p0 * X[:, i])
    post_mean = np.sum(p_star * X[:, i])
    prior_vol = np.sqrt(np.sum(p0 * (X[:, i] - prior_mean)**2))
    post_vol = np.sqrt(np.sum(p_star * (X[:, i] - post_mean)**2))
    print(f"{a:<12} {prior_mean:>10.4f} {post_mean:>10.4f} {prior_vol:>10.4f} {post_vol:>10.4f}")

# Effective number of scenarios
eff_n = np.exp(-np.sum(p_star * np.log(p_star + 1e-15)))
print(f"\\nEffective scenarios: {eff_n:.0f} / {J} ({eff_n/J*100:.1f}%)")
print(f"KL divergence: {np.sum(p_star * np.log(p_star / p0 + 1e-15)):.4f}")`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Augmented Black-Litterman (ABL)"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The ABL model extends BL by incorporating factor views and non-linear views. For Indian markets, we can express views on:"}),e.jsx(t.BlockMath,{math:"\\text{Factor view: } \\mathbf{w}_{\\text{factor}}^\\top \\boldsymbol{\\mu} = q_{\\text{factor}}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"where factor weights can be momentum scores, value ratios, or macro exposures. The ABL posterior combines standard BL views with factor model constraints."}),e.jsx(k,{title:"augmented_bl_india.py",runnable:!0,code:`import numpy as np

# Augmented BL with factor views for Indian stocks
tickers = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ITC', 'LT']
n = len(tickers)

# Equilibrium setup
vols = np.array([0.28, 0.22, 0.22, 0.24, 0.20, 0.28])
corr = np.eye(n) * 0.5 + 0.5
np.fill_diagonal(corr, 1.0)
corr[1, 3] = corr[3, 1] = 0.72
corr[2, 4] = corr[4, 2] = 0.35
Sigma = np.outer(vols, vols) * corr

w_mkt = np.array([0.20, 0.15, 0.15, 0.12, 0.10, 0.08])
w_mkt /= w_mkt.sum()
delta = 1.85
tau = 0.05
Pi = delta * Sigma @ w_mkt

# Standard BL views
P1 = np.zeros((2, n))
Q1 = np.zeros(2)
P1[0, 1] = 1; Q1[0] = 0.095  # TCS return view
P1[1, 5] = 1; Q1[1] = 0.115  # LT return view

# Factor views: momentum factor suggests IT > others
# Express as: 0.5*TCS + 0.5*INFY - 0.33*REL - 0.33*ITC - 0.33*LT = 0.02
P2 = np.zeros((1, n))
Q2 = np.zeros(1)
P2[0] = [-0.33, 0.50, 0.0, 0.50, -0.33, -0.33]
Q2[0] = 0.02

# Combined view matrix
P = np.vstack([P1, P2])
Q = np.concatenate([Q1, Q2])
K = len(Q)

Omega = np.diag(np.diag(P @ (tau * Sigma) @ P.T))

# BL posterior
tau_Sigma_inv = np.linalg.inv(tau * Sigma)
Omega_inv = np.linalg.inv(Omega)
M = np.linalg.inv(tau_Sigma_inv + P.T @ Omega_inv @ P)
mu_BL = M @ (tau_Sigma_inv @ Pi + P.T @ Omega_inv @ Q)
Sigma_BL = M + Sigma

# Optimal weights
w_BL = np.linalg.inv(delta * Sigma_BL) @ mu_BL
w_BL_norm = w_BL / w_BL.sum()

print("=== Augmented Black-Litterman (Factor + Standard Views) ===")
print(f"\\nViews incorporated:")
print(f"  1. TCS absolute return: 16% (confidence via He-Litterman)")
print(f"  2. L&T absolute return: 18%")
print(f"  3. IT momentum factor: IT outperforms by 2%")
print(f"\\n{'Ticker':<12} {'Equil':>8} {'ABL Post':>8} {'Mkt Wt':>8} {'ABL Wt':>8}")
print("-" * 50)
for t, pi, mu, wm, wb in zip(tickers, Pi, mu_BL, w_mkt, w_BL_norm):
    print(f"{t:<12} {pi:>8.4f} {mu:>8.4f} {wm:>8.4f} {wb:>8.4f}")`}),e.jsx(C,{title:"Entropy Pooling with Volatility View",difficulty:"advanced",problem:"You believe Nifty 50 realized volatility will rise to 28% (from current 22%) due to upcoming state elections. Express this as an entropy pooling constraint.",solution:[{step:"Define the variance constraint",formula:"\\sum_{j=1}^{J} p_j^* (x_j^{\\text{Nifty}} - \\bar{x}^{\\text{Nifty}})^2 = (0.28)^2 = 0.0784",explanation:"The view constrains the second moment of Nifty returns under the posterior."},{step:"Solve the dual problem",formula:"\\min_{\\lambda} \\log Z(\\lambda) - \\lambda \\times 0.0784",explanation:"The dual has a single Lagrange multiplier. The posterior probabilities tilt toward scenarios with higher Nifty volatility."},{step:"Effect on other assets",formula:"\\text{Posterior adjusts correlations and means consistently}",explanation:"Unlike BL, entropy pooling propagates the vol view to all assets through the scenario weights, preserving the dependence structure."}]}),e.jsx(b,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Entropy pooling generalizes Black-Litterman to arbitrary views on any distributional feature. For Indian markets, this enables views on volatility regimes (elections, monetary policy), tail risk (monsoon failure, geopolitical tensions), and correlation changes (crisis-driven correlation spikes). The framework is non-parametric and preserves as much of the prior information as possible while exactly satisfying the views."})})]})}const ue=Object.freeze(Object.defineProperty({__proto__:null,default:Z},Symbol.toStringTag,{value:"Module"}));function J(){const[s,u]=m.useState(.05),[r,f]=m.useState(.1),[o,p]=m.useState("box"),a=.12,c=o==="box"?a-s:a-s*Math.sqrt(1+r),n=o==="box"?a+s:a+s*Math.sqrt(1+r);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Uncertainty Sets for Expected Returns"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Explore how uncertainty set size affects the worst-case return."}),e.jsxs("div",{className:"mb-4 grid grid-cols-3 gap-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsx("span",{children:"Uncertainty Set"}),e.jsxs("select",{value:o,onChange:i=>p(i.target.value),className:"rounded border px-2 py-1 text-xs dark:bg-gray-800 dark:border-gray-600",children:[e.jsx("option",{value:"box",children:"Box (L∞)"}),e.jsx("option",{value:"ellipsoidal",children:"Ellipsoidal (L2)"})]})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:[e.jsx(t.InlineMath,{math:"\\epsilon"})," = ",s.toFixed(3)]}),e.jsx("input",{type:"range",min:"0.01",max:"0.15",step:"0.005",value:s,onChange:i=>u(parseFloat(i.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:[e.jsx(t.InlineMath,{math:"\\kappa"})," = ",r.toFixed(3)]}),e.jsx("input",{type:"range",min:"0.01",max:"0.30",step:"0.01",value:r,onChange:i=>f(parseFloat(i.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 400 80",className:"w-full max-w-md mx-auto block",children:[e.jsx("line",{x1:30,y1:40,x2:370,y2:40,stroke:"#d1d5db",strokeWidth:"1"}),e.jsx("rect",{x:30+c*2500,y:25,width:(n-c)*2500,height:30,fill:"#6366f1",opacity:"0.15",rx:"4"}),e.jsx("line",{x1:30+c*2500,y1:20,x2:30+c*2500,y2:60,stroke:"#ef4444",strokeWidth:"2"}),e.jsx("line",{x1:30+n*2500,y1:20,x2:30+n*2500,y2:60,stroke:"#22c55e",strokeWidth:"2"}),e.jsx("circle",{cx:30+a*2500,cy:40,r:"5",fill:"#6366f1"}),e.jsxs("text",{x:30+c*2500,y:72,textAnchor:"middle",className:"text-[9px] fill-red-500",children:[(c*100).toFixed(1),"%"]}),e.jsxs("text",{x:30+a*2500,y:15,textAnchor:"middle",className:"text-[9px] fill-indigo-600 font-semibold",children:["Nominal: ",(a*100).toFixed(1),"%"]}),e.jsxs("text",{x:30+n*2500,y:72,textAnchor:"middle",className:"text-[9px] fill-green-600",children:[(n*100).toFixed(1),"%"]})]})]})}function ee(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Worst-Case and Robust Optimization"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Robust portfolio optimization addresses parameter uncertainty by optimizing for the worst case within an uncertainty set, rather than treating estimated parameters as exact. This minimax approach produces portfolios that perform well even when our estimates of expected returns and covariances are wrong -- a common scenario in volatile Indian markets subject to sudden policy changes, monsoon risks, and global contagion."}),e.jsx(S,{title:"Robust Portfolio Optimization",label:"Definition 9.12",definition:"Robust portfolio optimization solves a minimax problem: max_w min_{(μ,Σ) ∈ U} w'μ - λw'Σw, where U is an uncertainty set containing the plausible values of the true parameters. The solution is optimal for the worst-case parameter realization within U.",notation:"U = uncertainty set, (μ,Σ) = uncertain parameters"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Types of Uncertainty Sets"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:[e.jsx("strong",{children:"Box uncertainty"})," (Tutuncu and Koenig, 2004):"]}),e.jsx(t.BlockMath,{math:"\\mathcal{U}_{\\text{box}} = \\{\\boldsymbol{\\mu} : |\\mu_i - \\hat{\\mu}_i| \\leq \\epsilon_i, \\; \\forall i\\}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:[e.jsx("strong",{children:"Ellipsoidal uncertainty"})," (Goldfarb and Iyengar, 2003):"]}),e.jsx(t.BlockMath,{math:"\\mathcal{U}_{\\text{ellip}} = \\{\\boldsymbol{\\mu} : (\\boldsymbol{\\mu} - \\hat{\\boldsymbol{\\mu}})^\\top \\hat{\\Sigma}^{-1} (\\boldsymbol{\\mu} - \\hat{\\boldsymbol{\\mu}}) \\leq \\kappa^2\\}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The parameter ",e.jsx(t.InlineMath,{math:"\\kappa"})," can be calibrated from the chi-squared distribution: ",e.jsx(t.InlineMath,{math:"\\kappa^2 = \\chi^2_n(\\alpha)"})," for confidence level ",e.jsx(t.InlineMath,{math:"1-\\alpha"}),"."]}),e.jsx(T,{title:"Robust MVO with Ellipsoidal Uncertainty",label:"Theorem 9.10",statement:"When expected returns lie in an ellipsoidal uncertainty set U_ellip, the robust mean-variance problem max_w min_{μ∈U} w'μ - λw'Σw has the tractable reformulation: max_w w'μ̂ - κ√(w'Σw) - λw'Σw. This is a second-order cone program (SOCP).",proof:"By duality, min_{μ∈U} w'μ = w'μ̂ - κ√(w'Σ̂w/T) since the worst case μ in the ellipsoid points opposite to w in the Σ̂-metric. The inner minimum is achieved at μ* = μ̂ - κΣ̂w/(√(w'Σ̂w)·√T)."}),e.jsx(J,{}),e.jsx(k,{title:"robust_mvo_nifty.py",runnable:!0,code:`import numpy as np
import cvxpy as cp

# Indian portfolio optimization
tickers = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ITC',
           'LT', 'AXISBANK', 'HINDUNILVR']
n = len(tickers)

mu_hat = np.array([0.15, 0.13, 0.12, 0.14, 0.10, 0.16, 0.18, 0.11])
vols = np.array([0.28, 0.22, 0.22, 0.24, 0.20, 0.28, 0.30, 0.18])
np.random.seed(42)
corr = np.eye(n) * 0.4 + 0.6 * np.full((n, n), 0.35)
np.fill_diagonal(corr, 1.0)
Sigma = np.outer(vols, vols) * corr

# Risk aversion
lam = 2.0
rf = 0.065

# === Standard MVO ===
w = cp.Variable(n)
prob_std = cp.Problem(
    cp.Maximize(mu_hat @ w - lam * cp.quad_form(w, Sigma)),
    [cp.sum(w) == 1, w >= 0]
)
prob_std.solve(solver=cp.SCS)
w_std = w.value

# === Robust MVO (Ellipsoidal) ===
T = 252  # 1 year of daily data
kappa = np.sqrt(n)  # ~chi-squared quantile
Sigma_mu = Sigma / T  # Uncertainty in mean estimate

w2 = cp.Variable(n)
# Worst-case return = mu_hat @ w - kappa * ||Sigma_mu^{1/2} w||
L = np.linalg.cholesky(Sigma_mu)
robust_return = mu_hat @ w2 - kappa * cp.norm(L.T @ w2)
prob_rob = cp.Problem(
    cp.Maximize(robust_return - lam * cp.quad_form(w2, Sigma)),
    [cp.sum(w2) == 1, w2 >= 0]
)
prob_rob.solve(solver=cp.SCS)
w_rob = w2.value

# === Box Robust ===
w3 = cp.Variable(n)
epsilon = vols / np.sqrt(T)  # Per-asset uncertainty
worst_return = (mu_hat - epsilon) @ w3  # Worst-case for long-only
prob_box = cp.Problem(
    cp.Maximize(worst_return - lam * cp.quad_form(w3, Sigma)),
    [cp.sum(w3) == 1, w3 >= 0]
)
prob_box.solve(solver=cp.SCS)
w_box = w3.value

print("=== Robust Optimization Comparison (NSE Stocks) ===")
print(f"\\n{'Ticker':<12} {'Std MVO':>8} {'Ellip Rob':>10} {'Box Rob':>8}")
print("-" * 42)
for t, ws, wr, wb in zip(tickers, w_std, w_rob, w_box):
    print(f"{t:<12} {ws:>8.4f} {wr:>10.4f} {wb:>8.4f}")

print(f"\\nPortfolio metrics:")
for name, ww in [('Standard', w_std), ('Ellipsoidal', w_rob), ('Box', w_box)]:
    ret = mu_hat @ ww
    vol = np.sqrt(ww @ Sigma @ ww)
    sr = (ret - rf) / vol
    print(f"  {name:12s}: ret={ret:.2%}, vol={vol:.2%}, SR={sr:.3f}")`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Worst-Case CVaR Optimization"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"An alternative robust approach minimizes the worst-case Conditional Value-at-Risk (CVaR) over an ambiguity set of distributions:"}),e.jsx(t.BlockMath,{math:"\\min_{\\mathbf{w}} \\max_{F \\in \\mathcal{F}} \\text{CVaR}_\\alpha^F(-\\mathbf{w}^\\top \\mathbf{r})"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"This is particularly relevant for Indian markets where tail events (demonetization shock, COVID crash, IL&FS crisis) have shown that normal distribution assumptions severely underestimate downside risk."}),e.jsx(C,{title:"Calibrating Uncertainty Set from NSE Data",difficulty:"advanced",problem:"Using 3 years of daily Nifty 50 data (T=756), compute the ellipsoidal uncertainty radius $\\\\kappa$ at 95% confidence for N=10 stocks. How does this affect the worst-case expected return?",solution:[{step:"Compute chi-squared quantile",formula:"\\kappa^2 = \\chi^2_{10}(0.95) = 18.307",explanation:"For 10 assets at 95% confidence, the chi-squared quantile determines the ellipsoid size."},{step:"Compute uncertainty radius",formula:"\\kappa = \\sqrt{18.307} = 4.279",explanation:"The uncertainty radius scales the penalty on portfolio risk."},{step:"Worst-case return penalty",formula:"\\text{Penalty} = \\kappa \\sqrt{\\mathbf{w}^\\top (\\Sigma/T) \\mathbf{w}} \\approx 4.279 \\times \\frac{0.18}{\\sqrt{756}} \\approx 2.8\\%",explanation:"For an equal-weight portfolio with 18% vol, the worst-case return is reduced by about 2.8% from the nominal estimate."}]}),e.jsx(b,{title:"Robust Methods for Indian Market Practitioners",type:"tip",children:e.jsxs("ul",{className:"space-y-1 list-disc list-inside",children:[e.jsx("li",{children:"Robust optimization is most valuable during uncertain periods (elections, RBI policy shifts)"}),e.jsx("li",{children:"Box uncertainty is simpler but may be too conservative for well-estimated stocks"}),e.jsx("li",{children:"Ellipsoidal uncertainty accounts for estimation correlation across assets"}),e.jsx("li",{children:"Combine with shrinkage estimators for double robustness"}),e.jsxs("li",{children:["Available in Python via ",e.jsx("code",{children:"cvxpy"})," (SOCP and SDP solvers)"]})]})}),e.jsx(b,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Robust optimization produces portfolios that are resilient to parameter estimation error by optimizing for the worst case within an uncertainty set. For Indian markets, where regime changes and structural breaks are common, robust methods provide a valuable safety margin. The key trade-off is between robustness and performance: larger uncertainty sets produce more conservative portfolios with lower expected returns."})})]})}const fe=Object.freeze(Object.defineProperty({__proto__:null,default:ee},Symbol.toStringTag,{value:"Module"}));function te(){const[s,u]=m.useState(25),[r,f]=m.useState(18),[o,p]=m.useState(.05),[a,c]=m.useState(.9),n=r>s?"Crisis":"Normal",i=o+a,d=Math.log(.5)/Math.log(a);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Regime Detection and DCC Parameters"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust volatility threshold and DCC-GARCH parameters for Indian market regime detection."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Vol Threshold: ",s,"%"]}),e.jsx("input",{type:"range",min:"15",max:"40",step:"1",value:s,onChange:l=>u(parseInt(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Current Nifty Vol: ",r,"%"]}),e.jsx("input",{type:"range",min:"8",max:"50",step:"1",value:r,onChange:l=>f(parseInt(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["DCC ",e.jsx(t.InlineMath,{math:"\\alpha"}),": ",o.toFixed(2)]}),e.jsx("input",{type:"range",min:"0.01",max:"0.15",step:"0.01",value:o,onChange:l=>p(parseFloat(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["DCC ",e.jsx(t.InlineMath,{math:"\\beta"}),": ",a.toFixed(2)]}),e.jsx("input",{type:"range",min:"0.70",max:"0.98",step:"0.01",value:a,onChange:l=>c(parseFloat(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-3 text-center text-xs",children:[e.jsxs("div",{className:`rounded-lg p-3 ${n==="Crisis"?"bg-red-50 dark:bg-red-900/30":"bg-green-50 dark:bg-green-900/30"}`,children:[e.jsx("div",{className:"text-gray-500",children:"Regime"}),e.jsx("div",{className:`text-lg font-bold ${n==="Crisis"?"text-red-600":"text-green-600"}`,children:n})]}),e.jsxs("div",{className:"rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30",children:[e.jsx("div",{className:"text-gray-500",children:"DCC Persistence"}),e.jsx("div",{className:"text-lg font-bold text-indigo-600",children:i.toFixed(3)}),e.jsx("div",{className:"text-[10px]",children:i>.99?"Non-stationary!":"Stationary"})]}),e.jsxs("div",{className:"rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30",children:[e.jsx("div",{className:"text-gray-500",children:"Half-Life (days)"}),e.jsx("div",{className:"text-lg font-bold text-amber-600",children:d.toFixed(1)})]})]})]})}function ae(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Regime-Conditioned Optimization and DCC-GARCH"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Indian financial markets exhibit distinct regimes: calm bull markets with low volatility, turbulent periods with spiking correlations, and transitional phases. Regime-conditioned portfolio optimization adapts the covariance matrix and expected returns to the current market state, using Hidden Markov Models (HMMs) for regime detection and DCC-GARCH for dynamic correlation estimation."}),e.jsx(S,{title:"DCC-GARCH Model",label:"Definition 9.13",definition:"The Dynamic Conditional Correlation (DCC) model of Engle (2002) models time-varying correlations. Each asset's variance follows a univariate GARCH(1,1): σ²ᵢ,ₜ = ωᵢ + αᵢε²ᵢ,ₜ₋₁ + βᵢσ²ᵢ,ₜ₋₁. The conditional correlation matrix evolves as: Qₜ = (1-a-b)Q̄ + a·zₜ₋₁z'ₜ₋₁ + b·Qₜ₋₁, where zₜ are standardized residuals and Q̄ is the unconditional correlation.",notation:"Qₜ = quasi-correlation matrix, Rₜ = diag(Qₜ)⁻¹/² Qₜ diag(Qₜ)⁻¹/²"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"The DCC-GARCH Framework"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The full time-varying covariance matrix is:"}),e.jsx(t.BlockMath,{math:"\\Sigma_t = D_t R_t D_t"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"D_t = \\text{diag}(\\sigma_{1,t}, \\ldots, \\sigma_{n,t})"})," contains the GARCH volatilities and ",e.jsx(t.InlineMath,{math:"R_t"})," is the DCC correlation matrix:"]}),e.jsx(t.BlockMath,{math:"Q_t = (1 - a - b)\\bar{Q} + a \\mathbf{z}_{t-1}\\mathbf{z}_{t-1}^\\top + b Q_{t-1}"}),e.jsx(t.BlockMath,{math:"R_t = \\text{diag}(Q_t)^{-1/2} \\, Q_t \\, \\text{diag}(Q_t)^{-1/2}"}),e.jsx(te,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Hidden Markov Model for Regime Detection"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["An HMM with ",e.jsx(t.InlineMath,{math:"K"})," states models the Indian market as switching between regimes. Each regime has its own return distribution:"]}),e.jsx(t.BlockMath,{math:"r_t | S_t = k \\sim \\mathcal{N}(\\mu_k, \\Sigma_k)"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The transition probability matrix ",e.jsx(t.InlineMath,{math:"A"})," governs regime switching:"]}),e.jsx(t.BlockMath,{math:"A_{ij} = P(S_t = j \\mid S_{t-1} = i)"}),e.jsx(k,{title:"dcc_garch_nifty.py",runnable:!0,code:`import numpy as np

np.random.seed(42)

# Simulate DCC-GARCH for Nifty 50 and Bank Nifty
T = 500  # Trading days
n = 2    # Assets

# GARCH(1,1) parameters
omega = np.array([0.00001, 0.000015])
alpha = np.array([0.08, 0.10])
beta = np.array([0.88, 0.85])

# DCC parameters
a_dcc = 0.05
b_dcc = 0.92
Q_bar = np.array([[1.0, 0.82], [0.82, 1.0]])  # Unconditional correlation

# Simulate
sigma2 = np.zeros((T, n))
sigma2[0] = [0.0003, 0.0004]  # Initial variance

Q = np.zeros((T, n, n))
R = np.zeros((T, n, n))
Q[0] = Q_bar.copy()
R[0] = Q_bar.copy()

returns = np.zeros((T, n))

for t in range(1, T):
    # GARCH volatilities
    for i in range(n):
        sigma2[t, i] = omega[i] + alpha[i] * returns[t-1, i]**2 + beta[i] * sigma2[t-1, i]

    D = np.diag(np.sqrt(sigma2[t]))

    # Standardized residuals
    if t > 1:
        z = returns[t-1] / np.sqrt(sigma2[t-1])
        Q[t] = (1 - a_dcc - b_dcc) * Q_bar + a_dcc * np.outer(z, z) + b_dcc * Q[t-1]
    else:
        Q[t] = Q_bar

    # Normalize to correlation
    Q_diag_inv = np.diag(1.0 / np.sqrt(np.diag(Q[t])))
    R[t] = Q_diag_inv @ Q[t] @ Q_diag_inv

    # Full covariance
    Sigma_t = D @ R[t] @ D

    # Generate returns
    returns[t] = np.random.multivariate_normal([0.0004, 0.0005], Sigma_t)

# Annualize
ann_vols = np.sqrt(sigma2 * 252)
ann_corrs = np.array([R[t, 0, 1] for t in range(T)])

# Print summary statistics
print("=== DCC-GARCH Results (Nifty 50 & Bank Nifty) ===")
print(f"\\nNifty 50 Volatility (annualized):")
print(f"  Mean: {np.mean(ann_vols[:, 0]):.2%}")
print(f"  Min:  {np.min(ann_vols[:, 0]):.2%}")
print(f"  Max:  {np.max(ann_vols[:, 0]):.2%}")
print(f"\\nBank Nifty Volatility (annualized):")
print(f"  Mean: {np.mean(ann_vols[:, 1]):.2%}")
print(f"  Min:  {np.min(ann_vols[:, 1]):.2%}")
print(f"  Max:  {np.max(ann_vols[:, 1]):.2%}")
print(f"\\nDynamic Correlation (Nifty-BankNifty):")
print(f"  Mean: {np.mean(ann_corrs):.4f}")
print(f"  Min:  {np.min(ann_corrs):.4f}")
print(f"  Max:  {np.max(ann_corrs):.4f}")
print(f"  Last: {ann_corrs[-1]:.4f}")
print(f"\\nDCC persistence (a+b): {a_dcc + b_dcc:.4f}")`}),e.jsx(k,{title:"hmm_regime_nifty.py",runnable:!0,code:`import numpy as np

np.random.seed(42)

# Simulate 2-regime HMM for Nifty 50
T = 1000

# Regime parameters (annualized, then daily)
mu_regimes = np.array([0.15, -0.10]) / 252  # Bull, Bear
sigma_regimes = np.array([0.15, 0.35]) / np.sqrt(252)

# Transition matrix
A = np.array([
    [0.98, 0.02],  # Bull -> Bull, Bull -> Bear
    [0.05, 0.95],  # Bear -> Bull, Bear -> Bear
])

# Simulate regimes
states = np.zeros(T, dtype=int)
states[0] = 0  # Start in bull
for t in range(1, T):
    states[t] = np.random.choice(2, p=A[states[t-1]])

# Simulate returns
returns = np.array([
    np.random.normal(mu_regimes[s], sigma_regimes[s])
    for s in states
])

# Simple regime detection: rolling volatility threshold
window = 63  # Quarterly
rolling_vol = np.array([
    np.std(returns[max(0, t-window):t]) * np.sqrt(252)
    for t in range(1, T+1)
])

# Detect regimes
vol_threshold = 0.25
detected_regime = (rolling_vol > vol_threshold).astype(int)
accuracy = np.mean(detected_regime[window:] == states[window:])

# Regime-conditioned portfolio
# In normal regime: 70% equity, 30% bonds
# In crisis regime: 30% equity, 70% bonds
equity_weight = np.where(detected_regime == 0, 0.70, 0.30)

print("=== HMM Regime Analysis for Nifty 50 ===")
print(f"Total days: {T}")
print(f"Bull regime days: {np.sum(states == 0)} ({np.mean(states == 0):.1%})")
print(f"Bear regime days: {np.sum(states == 1)} ({np.mean(states == 1):.1%})")
print(f"\\nDetection accuracy: {accuracy:.2%}")
print(f"\\nRegime statistics:")
for k, name in enumerate(['Bull', 'Bear']):
    mask = states == k
    r = returns[mask]
    print(f"  {name}: mean={np.mean(r)*252:.2%}, vol={np.std(r)*np.sqrt(252):.2%}, "
          f"n={np.sum(mask)}")
print(f"\\nRegime-conditioned equity allocation:")
print(f"  Average: {np.mean(equity_weight):.2%}")
print(f"  Current: {equity_weight[-1]:.2%}")`}),e.jsx(T,{title:"Expected Duration of Market Regimes",label:"Theorem 9.11",statement:"In a K-state Hidden Markov Model, the expected duration of regime k is 1/(1 - Aₖₖ), where Aₖₖ is the self-transition probability. For Indian markets, typical bull regime duration is ~50 trading days (1/0.02) and bear regime duration is ~20 trading days (1/0.05).",proof:"The duration in state k is geometrically distributed with parameter (1-Aₖₖ). The expected value of a geometric random variable with success probability p is 1/p."}),e.jsx(C,{title:"Regime-Conditioned Allocation during COVID Crash",difficulty:"intermediate",problem:"During March 2020, India VIX spiked to 84 (from typical 12-15), Nifty 50 fell 38% in 25 days. An HMM with $A_{22}=0.95$ (bear persistence) detected the crisis regime on day 5. How should the portfolio adjust?",solution:[{step:"Detect crisis regime",formula:"\\text{VIX} = 84 \\gg \\text{threshold} = 25 \\Rightarrow \\text{Crisis regime}",explanation:"Rolling volatility or VIX exceeds the threshold, triggering regime switch."},{step:"Switch to crisis covariance matrix",formula:"\\Sigma_{\\text{crisis}} \\approx 3\\times \\Sigma_{\\text{normal}}",explanation:"Use the crisis-regime covariance matrix which has ~3x higher variances and elevated correlations."},{step:"Reoptimize portfolio",formula:"w_{\\text{equity}} \\downarrow, \\quad w_{\\text{G-Sec}} \\uparrow, \\quad w_{\\text{Gold}} \\uparrow",explanation:"The regime-conditioned optimizer reduces equity from ~60% to ~25%, increases G-Sec to ~50% and Gold to ~25%."}]}),e.jsx(b,{title:"Indian Market Regime Indicators",type:"tip",children:e.jsxs("ul",{className:"space-y-1 list-disc list-inside",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"India VIX:"})," Published by NSE, spikes above 25 signal crisis regime"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"FII outflows:"})," NSDL publishes daily FII/FPI data; sustained outflows signal risk"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"INR/USD:"})," Rapid depreciation (>2% monthly) correlates with equity drawdowns"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Credit spreads:"})," 10Y AAA-G-Sec spread widening signals stress"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"RBI actions:"})," Emergency rate changes or liquidity measures signal regime shift"]})]})}),e.jsx(b,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Regime-conditioned optimization uses DCC-GARCH for dynamic correlations and HMMs for regime detection. This allows portfolios to adapt to the current market state, reducing equity exposure during crises and increasing it during calm periods. For Indian markets, monitoring India VIX, FII flows, and RBI policy provides effective real-time regime signals."})})]})}const ye=Object.freeze(Object.defineProperty({__proto__:null,default:ae},Symbol.toStringTag,{value:"Module"}));function re(){const[s,u]=m.useState(12),[r,f]=m.useState(.15),[o,p]=m.useState(2),[a,c]=m.useState(.1),n=[];let i=a;const d=1-Math.exp(-r/(o*100));for(let l=0;l<Math.min(s,24);l++){const _=i*d;i-=_,n.push({period:l+1,deviation:i,trade:_})}return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Multi-Period Trade Schedule"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"See how transaction costs affect the optimal trading pace for portfolio rebalancing."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Horizon (months): ",s]}),e.jsx("input",{type:"range",min:"3",max:"24",step:"1",value:s,onChange:l=>u(parseInt(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["TC Rate (bps): ",(r*100).toFixed(0)]}),e.jsx("input",{type:"range",min:"0.05",max:"0.50",step:"0.01",value:r,onChange:l=>f(parseFloat(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Risk Aversion: ",o.toFixed(1)]}),e.jsx("input",{type:"range",min:"0.5",max:"5",step:"0.1",value:o,onChange:l=>p(parseFloat(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Initial Deviation: ",(a*100).toFixed(0),"%"]}),e.jsx("input",{type:"range",min:"0.02",max:"0.30",step:"0.01",value:a,onChange:l=>c(parseFloat(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 450 150",className:"w-full max-w-lg mx-auto block",children:[e.jsx("line",{x1:40,y1:130,x2:430,y2:130,stroke:"#d1d5db",strokeWidth:"1"}),e.jsx("line",{x1:40,y1:10,x2:40,y2:130,stroke:"#d1d5db",strokeWidth:"1"}),e.jsx("text",{x:235,y:148,textAnchor:"middle",className:"text-[10px] fill-gray-500",children:"Period"}),e.jsx("text",{x:15,y:70,textAnchor:"middle",className:"text-[10px] fill-gray-500",transform:"rotate(-90, 15, 70)",children:"Deviation"}),n.map((l,_)=>{const x=50+_*(370/Math.min(s,24)),h=130-l.deviation*1e3;return e.jsxs("g",{children:[e.jsx("circle",{cx:x,cy:Math.max(15,h),r:"3",fill:"#6366f1"}),_>0&&e.jsx("line",{x1:50+(_-1)*(370/Math.min(s,24)),y1:Math.max(15,130-n[_-1].deviation*1e3),x2:x,y2:Math.max(15,h),stroke:"#6366f1",strokeWidth:"1.5"})]},_)}),e.jsxs("text",{x:60,y:25,className:"text-[9px] fill-gray-500",children:["Trade fraction: ",(d*100).toFixed(1),"% per period"]})]})]})}function ie(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Multi-Period Optimization with Transaction Costs"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Single-period Markowitz optimization assumes instantaneous, costless rebalancing. In reality, Indian market participants face significant friction: STT (0.1% on delivery), brokerage fees, bid-ask spreads, and market impact. Multi-period optimization accounts for these costs by spreading trades over time and balancing the urgency of reaching the target portfolio against the cost of trading."}),e.jsx(S,{title:"Multi-Period Portfolio Optimization",label:"Definition 9.14",definition:"Multi-period optimization selects a sequence of portfolios {w₁, w₂, ..., w_T} to maximize the expected utility over the full horizon, accounting for transaction costs incurred at each rebalancing: max Σₜ E[wₜ'rₜ] - λΣₜ wₜ'Σwₜ - Σₜ TC(wₜ - wₜ₋₁), where TC(·) is the transaction cost function.",notation:"T = number of periods, TC(·) = transaction cost function, Δwₜ = wₜ - wₜ₋₁"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Transaction Cost Models for Indian Markets"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The total transaction cost in India for an equity delivery trade includes:"}),e.jsx(t.BlockMath,{math:"\\text{TC}(\\Delta w) = \\underbrace{0.001}_{\\text{STT}} + \\underbrace{0.0003}_{\\text{Brokerage}} + \\underbrace{0.0002}_{\\text{SEBI + Exchange}} + \\underbrace{0.18 \\times \\text{Brokerage}}_{\\text{GST}} + \\underbrace{\\text{Impact}}_{\\text{Market Impact}}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For a typical delivery trade on Zerodha, the total one-way cost is approximately 13-15 basis points for large-cap stocks. Market impact for mid/small-cap stocks can add another 10-50 bps depending on order size relative to average daily volume."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Almgren-Chriss Optimal Execution"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The Almgren-Chriss (2001) framework finds the optimal trade schedule to execute a portfolio transition. Given a target trade ",e.jsx(t.InlineMath,{math:"X"})," shares over",e.jsx(t.InlineMath,{math:"T"})," periods, the optimal trajectory minimizes:"]}),e.jsx(t.BlockMath,{math:"\\min_{\\{n_t\\}} \\sum_{t=1}^{T} \\left[\\eta \\frac{n_t}{\\tau} + \\gamma \\sigma \\left(\\sum_{k=t}^{T} n_k\\right)\\right]"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"\\eta"})," is temporary impact, ",e.jsx(t.InlineMath,{math:"\\gamma"})," is risk aversion, ",e.jsx(t.InlineMath,{math:"\\sigma"})," is volatility, and ",e.jsx(t.InlineMath,{math:"n_t"}),"is the number of shares traded in period ",e.jsx(t.InlineMath,{math:"t"}),"."]}),e.jsx(T,{title:"Optimal Trading Rate",label:"Theorem 9.12",statement:"In the Grinold-Kahn multi-period framework with quadratic transaction costs, the optimal trading policy trades a constant fraction of the deviation from target each period: Δwₜ = κ(w*ₜ - wₜ₋₁), where κ = 1 - exp(-√(λ_risk/λ_tc)) depends on the ratio of risk aversion to transaction cost aversion.",proof:"This follows from the Bellman equation for the dynamic program. The quadratic cost structure yields a linear policy, and the optimal trade fraction κ balances the marginal risk reduction against the marginal transaction cost."}),e.jsx(re,{}),e.jsx(k,{title:"multi_period_optimization.py",runnable:!0,code:`import numpy as np
import cvxpy as cp

# Multi-period MVO for Indian portfolio
tickers = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ITC', 'LT']
n = len(tickers)
T = 12  # Monthly periods (1 year)

# Current and target weights
w_current = np.array([0.20, 0.15, 0.15, 0.12, 0.20, 0.18])
mu = np.array([0.15, 0.13, 0.12, 0.14, 0.10, 0.16])

vols = np.array([0.28, 0.22, 0.22, 0.24, 0.20, 0.28])
np.random.seed(42)
corr = np.eye(n) * 0.5 + 0.5
np.fill_diagonal(corr, 1.0)
Sigma = np.outer(vols, vols) * corr / 12  # Monthly

# Transaction costs (one-way, bps)
tc_linear = np.array([15, 12, 12, 12, 12, 15]) * 1e-4  # Linear TC
tc_quad = np.array([5, 3, 3, 3, 4, 5]) * 1e-4  # Quadratic impact

# Risk aversion
lam = 2.0

# Solve multi-period problem
weights = [cp.Variable(n) for _ in range(T + 1)]
constraints = [weights[0] == w_current]

objective = 0
for t in range(1, T + 1):
    w_t = weights[t]
    delta_w = w_t - weights[t - 1]

    # Return and risk at time t
    objective += mu / 12 @ w_t  # Monthly return
    objective -= lam * cp.quad_form(w_t, Sigma)  # Risk penalty

    # Transaction costs
    objective -= tc_linear @ cp.abs(delta_w)  # Linear TC
    objective -= 0.5 * tc_quad @ cp.square(delta_w)  # Quadratic impact

    # Constraints
    constraints += [
        cp.sum(w_t) == 1,
        w_t >= 0,
        w_t <= 0.30,
    ]

prob = cp.Problem(cp.Maximize(objective), constraints)
prob.solve(solver=cp.SCS)

print("=== Multi-Period Portfolio Optimization (12 months) ===")
print(f"Transaction costs: {tc_linear.mean()*10000:.0f}bps linear + quadratic impact")
print(f"\\nWeight trajectory:")
print(f"{'Month':<6}", end='')
for t in tickers:
    print(f"{t:>10}", end='')
print(f"{'Turnover':>10}")
print("-" * (6 + 10 * (n + 1)))

for t in range(T + 1):
    w = weights[t].value
    turnover = np.sum(np.abs(w - (weights[t-1].value if t > 0 else w_current)))
    print(f"{t:<6}", end='')
    for wi in w:
        print(f"{wi:>10.4f}", end='')
    print(f"{turnover:>10.4f}")

# Total TC
total_tc = sum(
    tc_linear @ np.abs(weights[t].value - weights[t-1].value)
    for t in range(1, T + 1)
)
print(f"\\nTotal transaction cost: {total_tc:.6f} ({total_tc*10000:.2f} bps)")`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Market Impact in Indian Markets"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Market impact is the price movement caused by our own trading. For NSE stocks, the square-root impact model is commonly used:"}),e.jsx(t.BlockMath,{math:"\\text{Impact}(v) = \\sigma \\cdot \\eta \\cdot \\left(\\frac{v}{V}\\right)^{0.5}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"v"})," is our trade volume, ",e.jsx(t.InlineMath,{math:"V"})," is average daily volume, ",e.jsx(t.InlineMath,{math:"\\sigma"})," is daily volatility, and ",e.jsx(t.InlineMath,{math:"\\eta \\approx 0.1 \\text{-} 0.3"}),". For Nifty 50 constituents, average daily turnover ranges from INR 500 crore (HDFC Bank) to INR 3000+ crore (Reliance)."]}),e.jsx(k,{title:"market_impact_nse.py",runnable:!0,code:`import numpy as np

# Market impact estimation for NSE stocks
stocks = {
    'RELIANCE': {'price': 2500, 'adv_cr': 3000, 'daily_vol': 0.018},
    'TCS':      {'price': 3500, 'adv_cr': 800,  'daily_vol': 0.014},
    'HDFCBANK': {'price': 1600, 'adv_cr': 2500, 'daily_vol': 0.014},
    'INFY':     {'price': 1400, 'adv_cr': 1200, 'daily_vol': 0.015},
    'ITC':      {'price': 450,  'adv_cr': 1500, 'daily_vol': 0.013},
}

# Portfolio value: INR 100 crore
portfolio_value = 100  # crore

# Target: rebalance 5% of portfolio in each stock
rebal_pct = 0.05

print("=== Market Impact Analysis (NSE Stocks) ===")
print(f"Portfolio: INR {portfolio_value} crore, Rebalancing: {rebal_pct:.0%}")
print(f"\\n{'Stock':<12} {'Trade':>10} {'ADV':>10} {'%ADV':>8} {'Impact':>8} {'Cost':>10}")
print(f"{'':12} {'(Cr)':>10} {'(Cr)':>10} {'':>8} {'(bps)':>8} {'(Lakh)':>10}")
print("-" * 65)

eta = 0.15  # Impact coefficient
total_cost = 0

for stock, params in stocks.items():
    trade_value = portfolio_value * rebal_pct  # in crore
    pct_adv = trade_value / params['adv_cr']

    # Square-root impact
    impact_bps = params['daily_vol'] * eta * np.sqrt(pct_adv) * 10000

    # Cost in lakhs
    cost_lakh = trade_value * impact_bps / 10000 * 100  # convert to lakhs
    total_cost += cost_lakh

    print(f"{stock:<12} {trade_value:>10.1f} {params['adv_cr']:>10.0f} "
          f"{pct_adv:>7.1%} {impact_bps:>8.1f} {cost_lakh:>10.2f}")

print(f"\\nTotal impact cost: INR {total_cost:.2f} lakh")
print(f"As % of traded value: {total_cost / (portfolio_value * rebal_pct * 5 * 100) * 100:.2f}%")
print(f"\\nRecommendation: Split trades over "
      f"{max(2, int(np.ceil(portfolio_value * rebal_pct / min(s['adv_cr'] for s in stocks.values()) * 5)))} days")`}),e.jsx(C,{title:"Optimal Rebalancing Frequency",difficulty:"advanced",problem:"A INR 500 crore Indian equity fund has transaction costs of 15 bps per trade and daily tracking error of 50 bps against Nifty 50. Find the optimal rebalancing frequency that minimizes total cost (tracking error + TC).",solution:[{step:"Model total cost",formula:"\\text{Total Cost} = \\underbrace{\\sigma_{TE} \\sqrt{f}}_\\text{Tracking error cost} + \\underbrace{c \\cdot \\text{TO}(f)}_\\text{Transaction cost}",explanation:"Tracking error grows with time between rebalancing (√f days), while TC cost is proportional to frequency."},{step:"Take derivative and set to zero",formula:"\\frac{d}{df}\\text{TC} = \\frac{\\sigma_{TE}}{2\\sqrt{f}} - c \\cdot \\text{TO}^\\prime = 0",explanation:"The optimal frequency balances marginal tracking error reduction against marginal TC."},{step:"Solve for optimal frequency",formula:"f^* \\approx \\left(\\frac{\\sigma_{TE}}{2c \\cdot \\text{TO}^\\prime}\\right)^{2/3} \\approx 15\\text{-}20 \\text{ trading days}",explanation:"For typical Indian fund parameters, monthly rebalancing is close to optimal."}]}),e.jsx(b,{title:"Indian Market Transaction Cost Summary",type:"tip",children:e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"text-xs border-collapse w-full",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b border-gray-300",children:[e.jsx("th",{className:"px-2 py-1 text-left",children:"Cost Component"}),e.jsx("th",{className:"px-2 py-1 text-right",children:"Rate"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{className:"border-b border-gray-200",children:[e.jsx("td",{className:"px-2 py-1",children:"STT (delivery buy+sell)"}),e.jsx("td",{className:"px-2 py-1 text-right",children:"10 bps"})]}),e.jsxs("tr",{className:"border-b border-gray-200",children:[e.jsx("td",{className:"px-2 py-1",children:"Brokerage (Zerodha)"}),e.jsx("td",{className:"px-2 py-1 text-right",children:"0 bps (free)"})]}),e.jsxs("tr",{className:"border-b border-gray-200",children:[e.jsx("td",{className:"px-2 py-1",children:"Exchange charges"}),e.jsx("td",{className:"px-2 py-1 text-right",children:"~3 bps"})]}),e.jsxs("tr",{className:"border-b border-gray-200",children:[e.jsx("td",{className:"px-2 py-1",children:"SEBI turnover fee"}),e.jsx("td",{className:"px-2 py-1 text-right",children:"~0.1 bps"})]}),e.jsxs("tr",{className:"border-b border-gray-200",children:[e.jsx("td",{className:"px-2 py-1",children:"GST on above"}),e.jsx("td",{className:"px-2 py-1 text-right",children:"18% of charges"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-2 py-1 font-semibold",children:"Total (excl. impact)"}),e.jsx("td",{className:"px-2 py-1 text-right font-semibold",children:"~13-15 bps"})]})]})]})})}),e.jsx(b,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Multi-period optimization is essential for practical portfolio management in India, where transaction costs of 13-15 bps per trade (plus market impact for large orders) are non-negligible. The optimal strategy trades a fraction of the deviation from target each period, with the fraction depending on the cost-risk trade-off. For typical Indian equity portfolios, monthly rebalancing strikes a good balance."})})]})}const be=Object.freeze(Object.defineProperty({__proto__:null,default:ie},Symbol.toStringTag,{value:"Module"}));export{ce as a,de as b,me as c,pe as d,xe as e,he as f,ge as g,ue as h,fe as i,ye as j,be as k,le as s};
