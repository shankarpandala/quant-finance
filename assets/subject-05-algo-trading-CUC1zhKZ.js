import{j as e,r as b}from"./vendor-DgA46Qmo.js";import{r as t}from"./vendor-katex-C-S70IU0.js";import{D as S,T as I,P as M,E as T,N}from"./subject-01-math-foundations-vREfsVbS.js";function B(){const[a,v]=b.useState(2),[r,j]=b.useState(.5),[m,y]=b.useState(60),f=()=>{const l=[];let g=0;for(let h=0;h<120;h++)g=g*.92+(Math.random()-.5)*3,l.push(g);return l},[o]=b.useState(f),s=o.slice(0,m).reduce((i,l)=>i+l,0)/m,c=Math.sqrt(o.slice(0,m).reduce((i,l)=>i+(l-s)**2,0)/m),n=o.map(i=>{const l=(i-s)/(c||1);return l>a?"short":l<-a?"long":Math.abs(l)<r?"exit":"hold"}),p=Math.max(...o.map(Math.abs),5),x=200,d=500;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Pairs Trading Z-Score Signals"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust entry/exit thresholds and lookback window to see how signals change on a simulated TCS-Infosys spread."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Entry Z-Score: ",a.toFixed(1)]}),e.jsx("input",{type:"range",min:"1.0",max:"3.0",step:"0.1",value:a,onChange:i=>v(parseFloat(i.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Exit Z-Score: ",r.toFixed(1)]}),e.jsx("input",{type:"range",min:"0.0",max:"1.5",step:"0.1",value:r,onChange:i=>j(parseFloat(i.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Lookback: ",m," days"]}),e.jsx("input",{type:"range",min:"20",max:"120",step:"5",value:m,onChange:i=>y(parseInt(i.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:`0 0 ${d} ${x}`,className:"w-full max-w-2xl mx-auto block",children:[e.jsx("line",{x1:"0",y1:x/2,x2:d,y2:x/2,stroke:"#6b7280",strokeWidth:"1",strokeDasharray:"4"}),e.jsx("line",{x1:"0",y1:x/2-a*c/p*(x/2),x2:d,y2:x/2-a*c/p*(x/2),stroke:"#ef4444",strokeWidth:"1",strokeDasharray:"3"}),e.jsx("line",{x1:"0",y1:x/2+a*c/p*(x/2),x2:d,y2:x/2+a*c/p*(x/2),stroke:"#22c55e",strokeWidth:"1",strokeDasharray:"3"}),o.map((i,l)=>{const g=l/(o.length-1)*d,h=x/2-i/p*(x/2),_=n[l]==="short"?"#ef4444":n[l]==="long"?"#22c55e":"#6366f1";return e.jsx("circle",{cx:g,cy:h,r:"2",fill:_,opacity:"0.8"},l)})]}),e.jsxs("div",{className:"mt-3 flex justify-center gap-4 text-xs text-gray-500 dark:text-gray-400",children:[e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx("span",{className:"inline-block w-3 h-3 rounded-full bg-green-500"})," Long spread"]}),e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx("span",{className:"inline-block w-3 h-3 rounded-full bg-red-500"})," Short spread"]}),e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx("span",{className:"inline-block w-3 h-3 rounded-full bg-indigo-500"})," Neutral"]})]})]})}function R(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Pairs Trading on NSE Stocks"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Pairs trading is one of the oldest and most well-studied mean-reversion strategies in quantitative finance. The idea is elegantly simple: find two stocks whose prices move together historically (such as TCS and Infosys, or HDFC Bank and ICICI Bank on the NSE), and trade the spread when it diverges from its historical norm."}),e.jsx(S,{title:"Pairs Trading",label:"Definition 5.1",definition:"Pairs trading is a market-neutral strategy that involves simultaneously going long one asset and short another related asset when the spread between them deviates significantly from its historical mean, with the expectation that the spread will revert to the mean.",notation:e.jsxs(e.Fragment,{children:["The spread is typically defined as ",e.jsx(t.InlineMath,{math:"S_t = P_t^A - \\beta \\cdot P_t^B"})," where ",e.jsx(t.InlineMath,{math:"\\beta"})," is the hedge ratio."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Why Pairs Trading Works in Indian Markets"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Indian IT sector stocks like TCS, Infosys, Wipro, and HCL Tech share common revenue drivers: US enterprise spending, USD/INR exchange rates, and visa regulations. Similarly, private banks like HDFC Bank and ICICI Bank respond to the same RBI policy rates, credit growth cycles, and NPA trends. These shared fundamentals create natural cointegration relationships that pairs traders exploit."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Mathematical Framework"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["Given two stock price series ",e.jsx(t.InlineMath,{math:"P_t^A"})," and ",e.jsx(t.InlineMath,{math:"P_t^B"}),", we first estimate the hedge ratio ",e.jsx(t.InlineMath,{math:"\\beta"})," via OLS regression:"]}),e.jsx(t.BlockMath,{math:"P_t^A = \\alpha + \\beta \\cdot P_t^B + \\epsilon_t"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The spread (residual) is:"}),e.jsx(t.BlockMath,{math:"S_t = P_t^A - \\hat{\\alpha} - \\hat{\\beta} \\cdot P_t^B"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"We then compute the z-score of the spread to normalize it:"}),e.jsx(t.BlockMath,{math:"z_t = \\frac{S_t - \\mu_S}{\\sigma_S}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"\\mu_S"})," and ",e.jsx(t.InlineMath,{math:"\\sigma_S"})," are the rolling mean and standard deviation of the spread over a lookback window of ",e.jsx(t.InlineMath,{math:"L"})," days."]}),e.jsx(I,{title:"Cointegration (Engle-Granger)",label:"Theorem 5.1",statement:e.jsxs(e.Fragment,{children:["Two non-stationary time series ",e.jsx(t.InlineMath,{math:"P_t^A"})," and ",e.jsx(t.InlineMath,{math:"P_t^B"})," are cointegrated of order CI(1,1) if there exists a linear combination ",e.jsx(t.InlineMath,{math:"S_t = P_t^A - \\beta P_t^B"})," that is stationary (I(0)). This means while each price series individually follows a random walk, their spread is mean-reverting."]}),proof:e.jsx(e.Fragment,{children:"We test cointegration using the Augmented Dickey-Fuller (ADF) test on the spread residuals. Under the null hypothesis of no cointegration, the spread has a unit root. If the ADF test statistic is below the critical value (more negative), we reject the null and conclude cointegration exists. The critical values differ from standard ADF tables because we test residuals from an estimated regression (Engle-Granger critical values)."})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Trading Rules"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The standard z-score based trading rules are:"}),e.jsx(t.BlockMath,{math:"\\text{Signal} = \\begin{cases} \\text{Long spread} & \\text{if } z_t < -z_{\\text{entry}} \\\\ \\text{Short spread} & \\text{if } z_t > z_{\\text{entry}} \\\\ \\text{Close position} & \\text{if } |z_t| < z_{\\text{exit}} \\\\ \\text{Stop loss} & \\text{if } |z_t| > z_{\\text{stop}} \\end{cases}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:['"Long spread" means buy stock A, sell ',e.jsx(t.InlineMath,{math:"\\beta"}),' units of stock B. "Short spread" means the reverse. On NSE, shorting requires borrowing via the Securities Lending and Borrowing (SLB) mechanism or using stock futures on the F&O segment.']}),e.jsx(B,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Implementation on NSE"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"In practice, pairs trading on the NSE involves several Indian-market-specific considerations: lot sizes in F&O, STT (Securities Transaction Tax) on delivery vs intraday, SEBI margin requirements, and settlement cycles. Using stock futures for the short leg avoids SLB complexities but introduces roll costs at monthly expiry."}),e.jsx(M,{title:"pairs_trading_nse.py",runnable:!0,code:`import numpy as np
from scipy import stats

# Simulated daily prices for TCS and Infosys (in INR)
np.random.seed(42)
n_days = 252  # One trading year on NSE

# Generate cointegrated price series
common_factor = np.cumsum(np.random.randn(n_days) * 15)
tcs_prices = 3500 + common_factor + np.cumsum(np.random.randn(n_days) * 3)
infosys_prices = 1500 + 0.42 * common_factor + np.cumsum(np.random.randn(n_days) * 2)

# Step 1: Estimate hedge ratio via OLS regression
slope, intercept, r_value, p_value, std_err = stats.linregress(infosys_prices, tcs_prices)
print(f"Hedge Ratio (beta): {slope:.4f}")
print(f"Intercept (alpha):  {intercept:.2f} INR")
print(f"R-squared:          {r_value**2:.4f}")

# Step 2: Compute spread
spread = tcs_prices - slope * infosys_prices - intercept

# Step 3: ADF test for cointegration (simplified)
# Using Dickey-Fuller regression: delta_S = phi * S_{t-1} + e_t
delta_s = np.diff(spread)
s_lag = spread[:-1]
phi_slope, phi_intercept, _, _, phi_se = stats.linregress(s_lag, delta_s)
adf_stat = phi_slope / phi_se
print(f"\\nADF test statistic: {adf_stat:.4f}")
print(f"Critical value (5%): -2.86")
print(f"Cointegrated: {'Yes' if adf_stat < -2.86 else 'No'}")

# Step 4: Generate trading signals
lookback = 60
z_entry, z_exit, z_stop = 2.0, 0.5, 3.5
signals = []
pnl = []
position = 0  # 1=long spread, -1=short spread, 0=flat

for t in range(lookback, n_days):
    window = spread[t-lookback:t]
    mu = np.mean(window)
    sigma = np.std(window)
    z = (spread[t] - mu) / sigma if sigma > 0 else 0

    if position == 0:
        if z < -z_entry:
            position = 1   # Long spread: Buy TCS, Sell Infosys
            signals.append(('LONG', t))
        elif z > z_entry:
            position = -1  # Short spread: Sell TCS, Buy Infosys
            signals.append(('SHORT', t))
    elif abs(z) < z_exit or abs(z) > z_stop:
        signals.append(('EXIT', t))
        position = 0

# Step 5: Summary
print(f"\\n--- Pairs Trading Summary (TCS-Infosys) ---")
print(f"Total signals generated: {len(signals)}")
print(f"Spread mean: {np.mean(spread):.2f} INR")
print(f"Spread std:  {np.std(spread):.2f} INR")
print(f"Half-life:   {-np.log(2)/phi_slope:.1f} days")

# NSE-specific costs
lot_size_tcs = 175    # TCS futures lot size
lot_size_infy = 300   # Infosys futures lot size
stt_rate = 0.0001     # STT for futures (0.01%)
brokerage = 20        # Flat brokerage per order (Zerodha)

print(f"\\n--- NSE Trading Costs ---")
print(f"TCS lot size:     {lot_size_tcs} shares")
print(f"Infosys lot size: {lot_size_infy} shares")
print(f"STT per leg:      {stt_rate*100:.2f}%")
print(f"Brokerage:        INR {brokerage} per order (Zerodha)")`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Popular NSE Pairs"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Pair"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Sector"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Rationale"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"TCS - Infosys"}),e.jsx("td",{className:"px-5 py-2",children:"IT Services"}),e.jsx("td",{className:"px-5 py-2",children:"Same revenue drivers: US enterprise, USD/INR"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"HDFC Bank - ICICI Bank"}),e.jsx("td",{className:"px-5 py-2",children:"Private Banking"}),e.jsx("td",{className:"px-5 py-2",children:"RBI rates, credit growth, NPA cycles"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"SBI - Bank of Baroda"}),e.jsx("td",{className:"px-5 py-2",children:"PSU Banking"}),e.jsx("td",{className:"px-5 py-2",children:"Government policy, PSU reform cycle"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Reliance - ONGC"}),e.jsx("td",{className:"px-5 py-2",children:"Energy"}),e.jsx("td",{className:"px-5 py-2",children:"Crude oil prices, government fuel policy"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-5 py-2",children:"HUL - ITC"}),e.jsx("td",{className:"px-5 py-2",children:"FMCG"}),e.jsx("td",{className:"px-5 py-2",children:"Rural demand, monsoon, commodity input costs"})]})]})]})}),e.jsx(T,{title:"TCS-Infosys Pairs Trade Calculation",difficulty:"intermediate",problem:"TCS trades at INR 3,800 and Infosys at INR 1,600. The hedge ratio is 0.42. The 60-day spread mean is 1,128 INR and standard deviation is 45 INR. Current spread is 1,038 INR. Determine the trading signal.",solution:[{step:"Compute the current spread",formula:"S_t = P_t^{TCS} - \\beta \\cdot P_t^{INFY} = 3800 - 0.42 \\times 1600 = 3128",explanation:"We use the hedge ratio to compute the price spread between TCS and Infosys."},{step:"Compute the z-score",formula:"z_t = \\frac{S_t - \\mu}{\\sigma} = \\frac{1038 - 1128}{45} = -2.0",explanation:"The z-score tells us how many standard deviations the spread is from its mean."},{step:"Apply trading rule",formula:"z_t = -2.0 < -z_{entry} = -2.0 \\Rightarrow \\text{Long Spread}",explanation:"Since z = -2.0 hits our entry threshold, we go long the spread: Buy TCS futures (1 lot = 175 shares) and Sell Infosys futures proportionally."}]}),e.jsx(N,{title:"SEBI Regulatory Considerations",type:"warning",children:e.jsx("p",{children:"SEBI regulates short selling in India differently from US markets. Institutional investors must disclose short positions. Retail traders can short intraday in the cash segment but must use F&O or SLB for overnight short positions. The Securities Lending and Borrowing (SLB) framework on NSE allows borrowing shares for up to 12 months. For pairs trading, using stock futures is generally more practical, though it introduces basis risk and rollover costs at monthly expiry."})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Half-Life of Mean Reversion"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"A critical parameter for pairs trading is the half-life of mean reversion, which tells us how quickly the spread reverts. We model the spread as an Ornstein-Uhlenbeck process:"}),e.jsx(t.BlockMath,{math:"dS_t = \\theta(\\mu - S_t)\\,dt + \\sigma\\,dW_t"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The half-life is:"}),e.jsx(t.BlockMath,{math:"t_{1/2} = \\frac{-\\ln(2)}{\\ln(1 + \\theta)} \\approx \\frac{\\ln(2)}{\\theta}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For practical pairs trading on NSE, a half-life between 5 and 60 trading days is ideal. Shorter half-lives may be consumed by transaction costs (STT + brokerage), while longer ones tie up margin capital for too long."}),e.jsx(N,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Pairs trading on the NSE works best with fundamentally related stocks within the same sector. The key steps are: (1) identify cointegrated pairs using the Engle-Granger test, (2) estimate the hedge ratio and compute the spread, (3) normalize with z-scores, and (4) trade mean reversion with appropriate entry/exit thresholds. Always account for NSE-specific costs: STT, lot sizes, margin requirements, and rollover at monthly expiry."})})]})}const me=Object.freeze(Object.defineProperty({__proto__:null,default:R},Symbol.toStringTag,{value:"Module"}));function F(){const[a,v]=b.useState([.3,.25,-.2,-.15,.1]),r=["TCS","Infosys","Wipro","HCL Tech","Tech Mahindra"],j=[3800,1600,450,1350,1200],m=a.reduce((s,c,n)=>s+c*j[n],0),y=a.reduce((s,c)=>s+c,0),f=a.filter(s=>s>0).reduce((s,c)=>s+c,0),o=a.filter(s=>s<0).reduce((s,c)=>s+Math.abs(c),0);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Cointegration Basket Builder"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust portfolio weights for NSE IT sector stocks to create a market-neutral, mean-reverting basket."}),e.jsx("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-5",children:r.map((s,c)=>e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:[s,": ",a[c].toFixed(2)]}),e.jsx("input",{type:"range",min:"-0.5",max:"0.5",step:"0.05",value:a[c],onChange:n=>{const p=[...a];p[c]=parseFloat(n.target.value),v(p)},className:"h-2 w-full cursor-pointer accent-indigo-500"}),e.jsxs("span",{className:"text-[10px]",children:["INR ",j[c]]})]},c))}),e.jsxs("div",{className:"grid grid-cols-2 gap-4 sm:grid-cols-4",children:[e.jsxs("div",{className:"rounded-lg bg-gray-50 p-3 dark:bg-gray-800",children:[e.jsx("p",{className:"text-xs text-gray-500 dark:text-gray-400",children:"Portfolio Value"}),e.jsxs("p",{className:"text-lg font-bold text-gray-800 dark:text-gray-200",children:["INR ",m.toFixed(0)]})]}),e.jsxs("div",{className:"rounded-lg bg-gray-50 p-3 dark:bg-gray-800",children:[e.jsx("p",{className:"text-xs text-gray-500 dark:text-gray-400",children:"Net Exposure"}),e.jsxs("p",{className:`text-lg font-bold ${Math.abs(y)<.05?"text-green-600":"text-red-500"}`,children:[(y*100).toFixed(1),"%"]})]}),e.jsxs("div",{className:"rounded-lg bg-gray-50 p-3 dark:bg-gray-800",children:[e.jsx("p",{className:"text-xs text-gray-500 dark:text-gray-400",children:"Long Exposure"}),e.jsxs("p",{className:"text-lg font-bold text-green-600",children:[(f*100).toFixed(1),"%"]})]}),e.jsxs("div",{className:"rounded-lg bg-gray-50 p-3 dark:bg-gray-800",children:[e.jsx("p",{className:"text-xs text-gray-500 dark:text-gray-400",children:"Short Exposure"}),e.jsxs("p",{className:"text-lg font-bold text-red-500",children:[(o*100).toFixed(1),"%"]})]})]}),e.jsx("p",{className:"mt-3 text-center text-sm text-gray-600 dark:text-gray-400",children:Math.abs(y)<.05?e.jsx("span",{className:"font-semibold text-green-600 dark:text-green-400",children:"Market-neutral basket achieved!"}):e.jsx("span",{className:"font-semibold text-red-500",children:"Adjust weights to achieve market neutrality (net exposure near 0%)"})})]})}function q(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Statistical Arbitrage: Cointegration-Based Baskets on NSE"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Statistical arbitrage (stat arb) extends pairs trading from two stocks to multi-asset portfolios. Instead of trading a single pair, we construct baskets of cointegrated securities, exploiting mean-reversion in the portfolio's eigenportfolio or factor residuals. On the NSE, sectoral clustering of IT, banking, and FMCG stocks provides rich opportunities for basket-based stat arb strategies."}),e.jsx(S,{title:"Statistical Arbitrage",label:"Definition 5.2",definition:"Statistical arbitrage is a class of market-neutral strategies that exploit mean-reversion in the residuals from a factor model. Unlike classical arbitrage (which is risk-free), stat arb profits are statistical in nature -- they are expected to be positive over many trades but any individual trade may lose money.",notation:e.jsxs(e.Fragment,{children:["A stat arb portfolio satisfies: ",e.jsx(t.InlineMath,{math:"\\mathbb{E}[r_{portfolio}] > 0"}),", ",e.jsx(t.InlineMath,{math:"\\text{Var}[r_{portfolio}]"})," is bounded, and the portfolio has zero beta to the market."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Johansen Cointegration for Baskets"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["While the Engle-Granger approach works for two stocks, baskets of ",e.jsx(t.InlineMath,{math:"N"})," stocks require the Johansen procedure, which tests for multiple cointegrating relationships simultaneously. Given an ",e.jsx(t.InlineMath,{math:"N"}),"-dimensional price vector ",e.jsx(t.InlineMath,{math:"\\mathbf{P}_t"}),", the Vector Error Correction Model (VECM) is:"]}),e.jsx(t.BlockMath,{math:"\\Delta \\mathbf{P}_t = \\Pi \\mathbf{P}_{t-1} + \\sum_{i=1}^{p-1} \\Gamma_i \\Delta \\mathbf{P}_{t-i} + \\epsilon_t"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"\\Pi = \\alpha \\beta'"})," decomposes into the adjustment speeds ",e.jsx(t.InlineMath,{math:"\\alpha"})," and cointegrating vectors ",e.jsx(t.InlineMath,{math:"\\beta"}),". The rank of ",e.jsx(t.InlineMath,{math:"\\Pi"})," equals the number of cointegrating relationships."]}),e.jsx(I,{title:"Johansen Trace Test",label:"Theorem 5.2",statement:e.jsxs(e.Fragment,{children:["For an ",e.jsx(t.InlineMath,{math:"N"}),"-dimensional system, the Johansen trace test sequentially tests hypotheses ",e.jsx(t.InlineMath,{math:"H_0: r \\leq r_0"})," for ",e.jsx(t.InlineMath,{math:"r_0 = 0, 1, \\ldots, N-1"})," where ",e.jsx(t.InlineMath,{math:"r"})," is the cointegration rank. The trace statistic is ",e.jsx(t.InlineMath,{math:"\\lambda_{\\text{trace}}(r_0) = -T \\sum_{i=r_0+1}^{N} \\ln(1 - \\hat{\\lambda}_i)"})," where ",e.jsx(t.InlineMath,{math:"\\hat{\\lambda}_i"})," are estimated eigenvalues from the canonical correlation analysis of the VECM."]}),proof:e.jsxs(e.Fragment,{children:["The proof follows from maximum likelihood estimation of the VECM under the reduced rank restriction on ",e.jsx(t.InlineMath,{math:"\\Pi"}),". The eigenvalues ",e.jsx(t.InlineMath,{math:"\\hat{\\lambda}_i"})," come from solving a generalized eigenvalue problem involving the residual moment matrices from regressing ",e.jsx(t.InlineMath,{math:"\\Delta \\mathbf{P}_t"})," and ",e.jsx(t.InlineMath,{math:"\\mathbf{P}_{t-1}"})," on lagged differences. Under the null, the trace statistic follows a non-standard distribution tabulated by Johansen (1991)."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"PCA-Based Eigenportfolios"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"An alternative approach uses Principal Component Analysis (PCA) on the returns of a basket of stocks. The first few principal components capture systematic risk factors (market, sector), while the residuals are mean-reverting. For NSE stocks:"}),e.jsx(t.BlockMath,{math:"r_{i,t} = \\sum_{k=1}^{K} \\beta_{i,k} F_{k,t} + \\epsilon_{i,t}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"F_{k,t}"})," are the principal component factors and ",e.jsx(t.InlineMath,{math:"\\epsilon_{i,t}"})," are the residuals we trade. The eigenportfolios corresponding to the smallest eigenvalues exhibit the strongest mean reversion."]}),e.jsx(t.BlockMath,{math:"\\text{Eigenportfolio weights: } \\mathbf{w}_k = \\frac{\\mathbf{v}_k}{\\|\\mathbf{v}_k\\|_1}"}),e.jsx(F,{}),e.jsx(M,{title:"stat_arb_nse_basket.py",runnable:!0,code:`import numpy as np
from numpy.linalg import eig

# Simulated daily returns for NSE IT sector stocks
np.random.seed(42)
n_days = 504  # 2 years of trading data
n_stocks = 5
stocks = ['TCS', 'Infosys', 'Wipro', 'HCL Tech', 'Tech Mah']

# Common IT sector factor + idiosyncratic noise
market_factor = np.random.randn(n_days) * 0.012
sector_factor = np.random.randn(n_days) * 0.008

betas_market = [0.85, 0.90, 1.05, 0.95, 1.10]
betas_sector = [0.70, 0.75, 0.85, 0.80, 0.90]

returns = np.zeros((n_days, n_stocks))
for i in range(n_stocks):
    idio = np.random.randn(n_days) * 0.015
    returns[:, i] = betas_market[i] * market_factor + \\
                    betas_sector[i] * sector_factor + idio

# Step 1: PCA on returns
cov_matrix = np.cov(returns.T)
eigenvalues, eigenvectors = eig(cov_matrix)

# Sort by eigenvalue (descending)
idx = np.argsort(eigenvalues)[::-1]
eigenvalues = eigenvalues[idx].real
eigenvectors = eigenvectors[:, idx].real

print("=== PCA on NSE IT Sector Returns ===")
print(f"{'PC':<5} {'Eigenvalue':<14} {'Var Explained':<15} {'Cumulative':<12}")
total_var = np.sum(eigenvalues)
cum_var = 0
for k in range(n_stocks):
    var_exp = eigenvalues[k] / total_var * 100
    cum_var += var_exp
    print(f"PC{k+1:<3} {eigenvalues[k]:<14.6f} {var_exp:<15.2f}% {cum_var:<12.2f}%")

# Step 2: Construct eigenportfolio from last PC (most mean-reverting)
mr_weights = eigenvectors[:, -1]
mr_weights = mr_weights / np.sum(np.abs(mr_weights))  # Normalize

print(f"\\n=== Most Mean-Reverting Eigenportfolio ===")
for i, stock in enumerate(stocks):
    direction = "LONG" if mr_weights[i] > 0 else "SHORT"
    print(f"{stock:<12} Weight: {mr_weights[i]:>7.3f}  ({direction})")

# Step 3: Compute eigenportfolio spread
spread = returns @ mr_weights
cum_spread = np.cumsum(spread)

# Step 4: Test mean reversion (OU process half-life)
from scipy import stats
delta_s = np.diff(cum_spread)
s_lag = cum_spread[:-1]
slope, intercept, r, p, se = stats.linregress(s_lag, delta_s)
half_life = -np.log(2) / slope if slope < 0 else float('inf')

print(f"\\n=== Mean Reversion Analysis ===")
print(f"OU theta:    {-slope:.4f}")
print(f"Half-life:   {half_life:.1f} days")
print(f"Spread std:  {np.std(cum_spread):.6f}")

# Step 5: Generate z-score signals
lookback = 60
entry_z, exit_z = 1.5, 0.3
signals = {'long': 0, 'short': 0, 'exit': 0}

for t in range(lookback, n_days):
    window = cum_spread[t-lookback:t]
    z = (cum_spread[t] - np.mean(window)) / (np.std(window) + 1e-8)
    if z < -entry_z:
        signals['long'] += 1
    elif z > entry_z:
        signals['short'] += 1
    elif abs(z) < exit_z:
        signals['exit'] += 1

print(f"\\n=== Trading Signals (z_entry={entry_z}, z_exit={exit_z}) ===")
for sig, count in signals.items():
    print(f"{sig.upper():<8} signals: {count}")

# NSE lot sizes for position sizing
lot_sizes = {'TCS': 175, 'Infosys': 300, 'Wipro': 1500,
             'HCL Tech': 500, 'Tech Mah': 600}
capital = 5_000_000  # INR 50 lakhs

print(f"\\n=== Position Sizing (Capital: INR {capital:,.0f}) ===")
for i, stock in enumerate(stocks):
    notional = abs(mr_weights[i]) * capital
    lots = int(notional / (lot_sizes[stock] * [3800,1600,450,1350,1200][i]))
    print(f"{stock:<12} Lots: {lots}  Notional: INR {notional:,.0f}")`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Factor Model Residual Approach"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"A more sophisticated approach uses a multi-factor model to strip out systematic risk before trading residuals. For NSE stocks, common factors include:"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Factor"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Proxy"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Description"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Market"}),e.jsx("td",{className:"px-5 py-2",children:"Nifty 50 returns"}),e.jsx("td",{className:"px-5 py-2",children:"Broad market exposure"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Sector"}),e.jsx("td",{className:"px-5 py-2",children:"Nifty IT / Bank Nifty"}),e.jsx("td",{className:"px-5 py-2",children:"Sector-specific risk"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Size"}),e.jsx("td",{className:"px-5 py-2",children:"SME vs Large Cap spread"}),e.jsx("td",{className:"px-5 py-2",children:"Small minus big"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Value"}),e.jsx("td",{className:"px-5 py-2",children:"P/B sorted portfolios"}),e.jsx("td",{className:"px-5 py-2",children:"High minus low book-to-market"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-5 py-2",children:"Momentum"}),e.jsx("td",{className:"px-5 py-2",children:"12-1 month returns"}),e.jsx("td",{className:"px-5 py-2",children:"Winners minus losers"})]})]})]})}),e.jsx(t.BlockMath,{math:"r_{i,t} = \\alpha_i + \\beta_i^{mkt} r_{mkt,t} + \\beta_i^{sec} r_{sec,t} + \\beta_i^{smb} r_{smb,t} + \\epsilon_{i,t}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The residuals ",e.jsx(t.InlineMath,{math:"\\epsilon_{i,t}"})," are modeled as OU processes. We trade stocks whose residuals deviate significantly from zero, going long undervalued stocks (negative residuals) and short overvalued ones (positive residuals)."]}),e.jsx(T,{title:"Stat Arb Portfolio Construction",difficulty:"advanced",problem:"You have 5 NSE IT stocks with the following cointegrating vector from Johansen analysis: [0.35, 0.28, -0.22, -0.18, -0.23]. Capital is INR 1 crore. Compute the notional allocation and verify market neutrality.",solution:[{step:"Verify weight sum approaches zero",formula:"\\sum w_i = 0.35 + 0.28 - 0.22 - 0.18 - 0.23 = 0.00",explanation:"The weights sum to zero, confirming the portfolio is dollar-neutral."},{step:"Compute long and short legs",formula:"\\text{Long} = 0.35 + 0.28 = 0.63, \\quad \\text{Short} = 0.22 + 0.18 + 0.23 = 0.63",explanation:"The long and short exposures are balanced at 63% each."},{step:"Allocate capital",formula:"\\text{TCS notional} = 0.35 \\times 1,00,00,000 = \\text{INR } 35,00,000",explanation:"Each stock gets its proportional capital allocation. For TCS at INR 3,800 with lot size 175, this means approximately 5 lots."}]}),e.jsx(N,{title:"Risk Management for Stat Arb",type:"warning",children:e.jsxs("p",{children:["Stat arb strategies can suffer from ",e.jsx("strong",{children:"factor crowding"})," -- when too many quant funds trade similar signals, leading to simultaneous unwinding during stress (as in the August 2007 quant meltdown). In the Indian context, SEBI's position limits and lower institutional crowding reduce this risk compared to US markets, but the lower liquidity in mid-cap NSE stocks can amplify slippage. Always implement: (1) position limits per stock, (2) portfolio-level stop losses, (3) factor exposure monitoring, and (4) drawdown circuit breakers."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Practical Considerations for NSE"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Implementing stat arb on the NSE requires attention to several India-specific factors: (1) F&O lot size constraints force discrete position sizing, (2) STT on futures is lower than on delivery equity, making F&O the preferred execution vehicle, (3) monthly expiry rollover introduces basis risk, (4) SEBI's margin framework (SPAN + exposure margin) determines capital efficiency, and (5) corporate actions (dividends, bonuses, splits) require adjustment of the cointegrating relationship."}),e.jsx(N,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Statistical arbitrage extends pairs trading to multi-asset baskets using Johansen cointegration or PCA-based eigenportfolios. The key advantage is diversification across multiple mean-reverting spreads, reducing the risk of any single pair breaking down. For NSE implementation, use the F&O segment for efficient execution and ensure the basket remains market-neutral after accounting for lot size constraints."})})]})}const pe=Object.freeze(Object.defineProperty({__proto__:null,default:q},Symbol.toStringTag,{value:"Module"}));function z(){const[a,v]=b.useState(.001),[r,j]=b.useState(.1),[m]=b.useState(100),y=.42,f=()=>{const h=[],_=[];let u=y,k=1,w=.5;for(let E=0;E<m;E++){const P=Math.sin(E/20)*.05;u=y+P+(Math.random()-.5)*.02;const C=u+(Math.random()-.5)*r*2;k=k+a;const A=k/(k+r);w=w+A*(C-w),k=(1-A)*k,h.push(C),_.push(w)}return{observations:h,kalmanEstimates:_}},{observations:o,kalmanEstimates:s}=f(),c=Math.min(...o,...s)-.05,n=Math.max(...o,...s)+.05,p=500,x=200,d=h=>h/(m-1)*p,i=h=>x-(h-c)/(n-c)*x,l=o.map((h,_)=>`${_===0?"M":"L"}${d(_)},${i(h)}`).join(" "),g=s.map((h,_)=>`${_===0?"M":"L"}${d(_)},${i(h)}`).join(" ");return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Kalman Filter Hedge Ratio Estimation"}),e.jsxs("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:["Adjust process noise ",e.jsx(t.InlineMath,{math:"Q"})," and measurement noise ",e.jsx(t.InlineMath,{math:"R"})," to see how the Kalman filter tracks a time-varying hedge ratio for TCS-Infosys."]}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Process Noise Q: ",a.toFixed(4)]}),e.jsx("input",{type:"range",min:"0.0001",max:"0.01",step:"0.0001",value:a,onChange:h=>v(parseFloat(h.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Measurement Noise R: ",r.toFixed(3)]}),e.jsx("input",{type:"range",min:"0.01",max:"0.5",step:"0.01",value:r,onChange:h=>j(parseFloat(h.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:`0 0 ${p} ${x}`,className:"w-full max-w-2xl mx-auto block",children:[e.jsx("path",{d:l,fill:"none",stroke:"#94a3b8",strokeWidth:"1",opacity:"0.5"}),e.jsx("path",{d:g,fill:"none",stroke:"#6366f1",strokeWidth:"2"}),e.jsx("line",{x1:"0",y1:i(y),x2:p,y2:i(y),stroke:"#22c55e",strokeWidth:"1",strokeDasharray:"4"})]}),e.jsxs("div",{className:"mt-3 flex justify-center gap-4 text-xs text-gray-500 dark:text-gray-400",children:[e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx("span",{className:"inline-block w-4 h-0.5 bg-gray-400"})," Observed"]}),e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx("span",{className:"inline-block w-4 h-0.5 bg-indigo-500"})," Kalman Estimate"]}),e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx("span",{className:"inline-block w-4 h-0.5 bg-green-500",style:{borderTop:"1px dashed"}})," True Mean"]})]}),e.jsxs("p",{className:"mt-2 text-center text-sm text-gray-600 dark:text-gray-400",children:["Kalman gain adapts: high ",e.jsx(t.InlineMath,{math:"Q/R"})," ratio = faster tracking but more noise; low ratio = smoother but slower adaptation."]})]})}function O(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Kalman Filters for Dynamic Hedge Ratios"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"In pairs trading and stat arb, the hedge ratio between two stocks is not constant -- it evolves over time as fundamentals change. The Kalman filter provides an optimal framework for dynamically estimating this time-varying relationship, adapting faster than rolling OLS while being more principled than ad-hoc exponential smoothing."}),e.jsx(S,{title:"Kalman Filter",label:"Definition 5.3",definition:"The Kalman filter is a recursive Bayesian estimator that provides the optimal (minimum mean-squared error) estimate of a linear dynamical system's state from noisy observations. It consists of two steps: predict (propagate the state forward using the system model) and update (correct the prediction using the new observation).",notation:e.jsxs(e.Fragment,{children:["The state at time ",e.jsx(t.InlineMath,{math:"t"})," is ",e.jsx(t.InlineMath,{math:"\\mathbf{x}_t"}),", observed through ",e.jsx(t.InlineMath,{math:"\\mathbf{z}_t = H\\mathbf{x}_t + \\mathbf{v}_t"})," where ",e.jsx(t.InlineMath,{math:"\\mathbf{v}_t \\sim \\mathcal{N}(0, R)"}),"."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"State-Space Model for Hedge Ratios"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["For a pairs trade between stock A (e.g., TCS) and stock B (e.g., Infosys), we model the hedge ratio ",e.jsx(t.InlineMath,{math:"\\beta_t"})," as a random walk with drift:"]}),e.jsx(t.BlockMath,{math:"\\text{State equation: } \\beta_t = \\beta_{t-1} + w_t, \\quad w_t \\sim \\mathcal{N}(0, Q)"}),e.jsx(t.BlockMath,{math:"\\text{Observation equation: } P_t^A = \\alpha_t + \\beta_t \\cdot P_t^B + v_t, \\quad v_t \\sim \\mathcal{N}(0, R)"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The state vector is ",e.jsx(t.InlineMath,{math:"\\mathbf{x}_t = [\\alpha_t, \\beta_t]^\\top"})," containing both the intercept and hedge ratio. The observation matrix is ",e.jsx(t.InlineMath,{math:"H_t = [1, P_t^B]"}),"."]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Kalman Filter Equations"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The full Kalman recursion consists of:"}),e.jsx(t.BlockMath,{math:"\\text{Predict: } \\hat{\\mathbf{x}}_{t|t-1} = F \\hat{\\mathbf{x}}_{t-1|t-1}"}),e.jsx(t.BlockMath,{math:"P_{t|t-1} = F P_{t-1|t-1} F^\\top + Q"}),e.jsx(t.BlockMath,{math:"\\text{Innovation: } y_t = z_t - H_t \\hat{\\mathbf{x}}_{t|t-1}"}),e.jsx(t.BlockMath,{math:"S_t = H_t P_{t|t-1} H_t^\\top + R"}),e.jsx(t.BlockMath,{math:"\\text{Update: } K_t = P_{t|t-1} H_t^\\top S_t^{-1}"}),e.jsx(t.BlockMath,{math:"\\hat{\\mathbf{x}}_{t|t} = \\hat{\\mathbf{x}}_{t|t-1} + K_t y_t"}),e.jsx(t.BlockMath,{math:"P_{t|t} = (I - K_t H_t) P_{t|t-1}"}),e.jsx(I,{title:"Optimality of the Kalman Filter",label:"Theorem 5.3",statement:e.jsxs(e.Fragment,{children:["For a linear Gaussian state-space model, the Kalman filter provides the minimum mean-squared error (MMSE) estimate of the state. That is, for any other estimator ",e.jsx(t.InlineMath,{math:"\\tilde{\\mathbf{x}}_t"})," based on observations ",e.jsx(t.InlineMath,{math:"z_1, \\ldots, z_t"}),", we have ",e.jsx(t.InlineMath,{math:"\\mathbb{E}[\\|\\mathbf{x}_t - \\hat{\\mathbf{x}}_{t|t}\\|^2] \\leq \\mathbb{E}[\\|\\mathbf{x}_t - \\tilde{\\mathbf{x}}_t\\|^2]"}),"."]}),proof:e.jsxs(e.Fragment,{children:["The proof follows from the orthogonality principle in Hilbert space. The Kalman estimate is the conditional expectation ",e.jsx(t.InlineMath,{math:"\\hat{\\mathbf{x}}_{t|t} = \\mathbb{E}[\\mathbf{x}_t | z_1, \\ldots, z_t]"}),", which is the orthogonal projection of ",e.jsx(t.InlineMath,{math:"\\mathbf{x}_t"})," onto the space of linear functions of observations. For Gaussian systems, the conditional expectation is linear, so the Kalman filter achieves the global MMSE optimum, not just the linear MMSE."]})}),e.jsx(z,{}),e.jsx(M,{title:"kalman_hedge_ratio.py",runnable:!0,code:`import numpy as np

# Kalman filter for dynamic hedge ratio: TCS vs Infosys on NSE
np.random.seed(42)
n_days = 252

# Simulate cointegrated prices with time-varying hedge ratio
true_beta = np.zeros(n_days)
infosys_price = np.zeros(n_days)
tcs_price = np.zeros(n_days)

infosys_price[0] = 1500
tcs_price[0] = 3500

for t in range(1, n_days):
    # Hedge ratio drifts slowly (structural change)
    true_beta[t] = 0.42 + 0.08 * np.sin(2 * np.pi * t / 252)
    infosys_price[t] = infosys_price[t-1] + np.random.randn() * 20
    tcs_price[t] = 800 + true_beta[t] * infosys_price[t] + np.random.randn() * 30

# Kalman Filter Implementation
# State: [alpha, beta]
x = np.array([0.0, 0.5])  # Initial state estimate
P = np.eye(2) * 1.0        # Initial covariance
Q = np.eye(2) * 0.0001     # Process noise (how fast beta changes)
R = 30.0 ** 2              # Measurement noise variance
F = np.eye(2)              # State transition (random walk)

kalman_beta = np.zeros(n_days)
kalman_alpha = np.zeros(n_days)
spread = np.zeros(n_days)
kalman_gain_history = np.zeros(n_days)

for t in range(n_days):
    # Observation model: TCS = alpha + beta * Infosys + noise
    H = np.array([[1.0, infosys_price[t]]])
    z = tcs_price[t]

    # Predict
    x_pred = F @ x
    P_pred = F @ P @ F.T + Q

    # Innovation
    y = z - H @ x_pred
    S = H @ P_pred @ H.T + R

    # Kalman gain
    K = P_pred @ H.T / S
    kalman_gain_history[t] = K[1, 0]

    # Update
    x = x_pred + K.flatten() * y
    P = (np.eye(2) - K @ H) @ P_pred

    kalman_alpha[t] = x[0]
    kalman_beta[t] = x[1]
    spread[t] = tcs_price[t] - x[0] - x[1] * infosys_price[t]

# Compare with rolling OLS (60-day window)
from scipy import stats as sp_stats
ols_beta = np.full(n_days, np.nan)
for t in range(60, n_days):
    slope, intercept, _, _, _ = sp_stats.linregress(
        infosys_price[t-60:t], tcs_price[t-60:t])
    ols_beta[t] = slope

# Performance metrics
kalman_error = np.mean((kalman_beta[60:] - true_beta[60:])**2)
ols_error = np.nanmean((ols_beta[60:] - true_beta[60:])**2)

print("=== Kalman Filter vs Rolling OLS: TCS-Infosys Hedge Ratio ===")
print(f"{'Metric':<25} {'Kalman':<15} {'OLS (60d)':<15}")
print(f"{'MSE vs true beta':<25} {kalman_error:<15.6f} {ols_error:<15.6f}")
print(f"{'Final beta estimate':<25} {kalman_beta[-1]:<15.4f} {ols_beta[-1]:<15.4f}")
print(f"{'True beta (final)':<25} {true_beta[-1]:<15.4f}")
print(f"{'Improvement':<25} {(1-kalman_error/ols_error)*100:<15.1f}%")

# Spread statistics for trading
print(f"\\n=== Kalman Spread Statistics ===")
print(f"Spread mean:   {np.mean(spread):.2f} INR")
print(f"Spread std:    {np.std(spread):.2f} INR")
print(f"Max deviation: {np.max(np.abs(spread)):.2f} INR")

# Z-score signals
z_scores = (spread - np.mean(spread)) / np.std(spread)
n_entries = np.sum(np.abs(z_scores) > 2.0)
print(f"\\nEntry signals (|z| > 2): {n_entries}")
print(f"Avg Kalman gain (beta):  {np.mean(kalman_gain_history):.6f}")
print(f"\\nNSE Implementation Note:")
print(f"  TCS lot size: 175, Infosys lot size: 300")
print(f"  For beta={kalman_beta[-1]:.2f}, trade 1 TCS lot vs")
print(f"  {175 * kalman_beta[-1] * 3800 / (300 * 1500):.1f} Infosys lots")`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Kalman Filter vs Rolling OLS"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Feature"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Kalman Filter"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Rolling OLS"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Adaptation speed"}),e.jsx("td",{className:"px-5 py-2",children:"Controlled by Q/R ratio"}),e.jsx("td",{className:"px-5 py-2",children:"Fixed by window length"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Optimality"}),e.jsx("td",{className:"px-5 py-2",children:"MMSE optimal for linear Gaussian"}),e.jsx("td",{className:"px-5 py-2",children:"No optimality guarantee"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Confidence intervals"}),e.jsx("td",{className:"px-5 py-2",children:"Natural from covariance P"}),e.jsx("td",{className:"px-5 py-2",children:"Requires separate calculation"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Memory"}),e.jsx("td",{className:"px-5 py-2",children:"O(1) per update"}),e.jsx("td",{className:"px-5 py-2",children:"O(window) stored"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-5 py-2",children:"Hyperparameters"}),e.jsx("td",{className:"px-5 py-2",children:"Q, R matrices"}),e.jsx("td",{className:"px-5 py-2",children:"Window length"})]})]})]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Tuning Q and R for Indian Markets"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The process noise ",e.jsx(t.InlineMath,{math:"Q"})," controls how fast the hedge ratio can change. For stable Indian blue-chip pairs (TCS-Infosys), set ",e.jsx(t.InlineMath,{math:"Q"})," small (around ",e.jsx(t.InlineMath,{math:"10^{-4}"}),"). For more volatile pairs or during regime changes (like RBI policy shifts affecting bank stock correlations), increase ",e.jsx(t.InlineMath,{math:"Q"}),". The measurement noise ",e.jsx(t.InlineMath,{math:"R"})," can be estimated from the variance of the OLS residuals over a training period."]}),e.jsx(t.BlockMath,{math:"\\text{Kalman gain: } K_t = \\frac{P_{t|t-1}}{P_{t|t-1} + R}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["When ",e.jsx(t.InlineMath,{math:"K_t \\to 1"}),", the filter trusts new observations heavily (fast tracking). When ",e.jsx(t.InlineMath,{math:"K_t \\to 0"}),", it relies on its prior estimate (smoothing). The steady-state Kalman gain converges to ",e.jsx(t.InlineMath,{math:"K^* = \\frac{-R + \\sqrt{R^2 + 4QR}}{2}"}),"."]}),e.jsx(T,{title:"Kalman Update Step",difficulty:"intermediate",problem:e.jsxs(e.Fragment,{children:["The current Kalman estimate of the TCS-Infosys hedge ratio is ",e.jsx(t.InlineMath,{math:"\\hat{\\beta}_{t-1} = 0.40"})," with uncertainty ",e.jsx(t.InlineMath,{math:"P_{t-1} = 0.01"}),". Process noise ",e.jsx(t.InlineMath,{math:"Q = 0.001"}),", measurement noise ",e.jsx(t.InlineMath,{math:"R = 0.05"}),". A new observation suggests ",e.jsx(t.InlineMath,{math:"\\beta_{obs} = 0.48"}),". Compute the updated estimate."]}),solution:[{step:"Predict step",formula:"\\hat{\\beta}_{t|t-1} = 0.40, \\quad P_{t|t-1} = 0.01 + 0.001 = 0.011",explanation:"State propagates unchanged (random walk), uncertainty grows by Q."},{step:"Compute Kalman gain",formula:"K_t = \\frac{P_{t|t-1}}{P_{t|t-1} + R} = \\frac{0.011}{0.011 + 0.05} = 0.180",explanation:"The gain is moderate -- the filter will partially trust the new observation."},{step:"Update estimate",formula:"\\hat{\\beta}_{t|t} = 0.40 + 0.180 \\times (0.48 - 0.40) = 0.4144",explanation:"The estimate moves toward the observation but not all the way, dampening noise."},{step:"Update uncertainty",formula:"P_{t|t} = (1 - 0.180) \\times 0.011 = 0.00902",explanation:"Uncertainty decreases after incorporating the observation."}]}),e.jsx(N,{title:"Extended Kalman Filter for Non-Linear Models",type:"historical",children:e.jsx("p",{children:"When the relationship between stocks is non-linear (e.g., during market stress, the TCS-Infosys correlation may change non-linearly), the Extended Kalman Filter (EKF) or Unscented Kalman Filter (UKF) can be used. The EKF linearizes the state transition and observation equations using first-order Taylor expansions. For Indian markets, this is particularly useful when modeling cross-asset relationships that shift during events like RBI policy announcements, budget sessions, or election results."})}),e.jsx(N,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"The Kalman filter provides an optimal, recursive framework for estimating time-varying hedge ratios in pairs trading. Unlike rolling OLS, it adapts its tracking speed based on the signal-to-noise ratio and provides natural confidence intervals. For NSE pairs trading, properly tuned Kalman filters reduce tracking error by 30-50% compared to fixed-window methods, especially during periods of structural change like RBI rate cycles or sectoral rotation."})})]})}const xe=Object.freeze(Object.defineProperty({__proto__:null,default:O},Symbol.toStringTag,{value:"Module"}));function L(){const[a,v]=b.useState(20),[r,j]=b.useState(50),m=()=>{const u=[18e3];for(let k=1;k<200;k++){const w=Math.sin(k/40)*20;u.push(u[k-1]+w+(Math.random()-.48)*150)}return u},[y]=b.useState(m),f=(u,k)=>u.map((w,E)=>E<k-1?null:u.slice(E-k+1,E+1).reduce((C,A)=>C+A,0)/k),o=f(y,a),s=f(y,r),c=Math.min(...y)-200,n=Math.max(...y)+200,p=500,x=200,d=u=>u/(y.length-1)*p,i=u=>x-(u-c)/(n-c)*x,l=y.map((u,k)=>`${k===0?"M":"L"}${d(k)},${i(u)}`).join(" "),g=o.filter(u=>u!==null).map((u,k)=>{const w=k+a-1;return`${k===0?"M":"L"}${d(w)},${i(u)}`}).join(" "),h=s.filter(u=>u!==null).map((u,k)=>{const w=k+r-1;return`${k===0?"M":"L"}${d(w)},${i(u)}`}).join(" "),_=[];for(let u=r;u<y.length;u++){const k=o[u-1],w=s[u-1],E=o[u],P=s[u];k!==null&&w!==null&&E!==null&&P!==null&&(k<=w&&E>P&&_.push({i:u,type:"golden"}),k>=w&&E<P&&_.push({i:u,type:"death"}))}return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Moving Average Crossover on Nifty 50"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust short and long MA windows to find optimal crossover signals on simulated Nifty 50 data."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Short MA Window: ",a," days"]}),e.jsx("input",{type:"range",min:"5",max:"50",step:"1",value:a,onChange:u=>v(parseInt(u.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Long MA Window: ",r," days"]}),e.jsx("input",{type:"range",min:"20",max:"200",step:"5",value:r,onChange:u=>j(parseInt(u.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:`0 0 ${p} ${x}`,className:"w-full max-w-2xl mx-auto block",children:[e.jsx("path",{d:l,fill:"none",stroke:"#94a3b8",strokeWidth:"1"}),g&&e.jsx("path",{d:g,fill:"none",stroke:"#f59e0b",strokeWidth:"1.5"}),h&&e.jsx("path",{d:h,fill:"none",stroke:"#6366f1",strokeWidth:"1.5"}),_.map((u,k)=>e.jsx("circle",{cx:d(u.i),cy:i(y[u.i]),r:"4",fill:u.type==="golden"?"#22c55e":"#ef4444",stroke:"white",strokeWidth:"1"},k))]}),e.jsxs("div",{className:"mt-3 flex justify-center gap-4 text-xs text-gray-500 dark:text-gray-400",children:[e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx("span",{className:"inline-block w-3 h-0.5 bg-gray-400"})," Nifty 50"]}),e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx("span",{className:"inline-block w-3 h-0.5 bg-amber-500"})," Short MA"]}),e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx("span",{className:"inline-block w-3 h-0.5 bg-indigo-500"})," Long MA"]}),e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx("span",{className:"inline-block w-3 h-3 rounded-full bg-green-500"})," Golden Cross"]}),e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx("span",{className:"inline-block w-3 h-3 rounded-full bg-red-500"})," Death Cross"]})]}),e.jsxs("p",{className:"mt-2 text-center text-sm text-gray-600 dark:text-gray-400",children:["Crossover signals: ",_.filter(u=>u.type==="golden").length," golden crosses,"," ",_.filter(u=>u.type==="death").length," death crosses"]})]})}function V(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Time-Series Momentum (TSMOM) on Nifty"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Time-series momentum (TSMOM) is one of the most robust anomalies in financial markets. Unlike cross-sectional momentum (which compares assets against each other), TSMOM looks at each asset's own past returns to predict its future direction. Research by Moskowitz, Ooi, and Pedersen (2012) showed TSMOM generates significant returns across 58 liquid instruments globally, and the Nifty 50 exhibits strong TSMOM characteristics."}),e.jsx(S,{title:"Time-Series Momentum (TSMOM)",label:"Definition 5.4",definition:"Time-series momentum is the tendency for an asset's own past returns to predict its future returns. Specifically, assets with positive returns over the past k months tend to continue performing positively, and vice versa. The TSMOM signal for asset i at time t is simply the sign of the past return.",notation:e.jsxs(e.Fragment,{children:["TSMOM signal: ",e.jsx(t.InlineMath,{math:"\\text{signal}_{i,t} = \\text{sign}(r_{i,t-k:t})"})," where ",e.jsx(t.InlineMath,{math:"r_{i,t-k:t}"})," is the return over the lookback period ",e.jsx(t.InlineMath,{math:"k"}),"."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Mathematical Formulation"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The basic TSMOM strategy for Nifty 50 computes the position as:"}),e.jsx(t.BlockMath,{math:"w_t = \\frac{\\text{sign}(r_{t-k:t})}{\\sigma_t} \\cdot \\sigma_{\\text{target}}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"r_{t-k:t}"})," is the past ",e.jsx(t.InlineMath,{math:"k"}),"-day return,",e.jsx(t.InlineMath,{math:"\\sigma_t"})," is the realized volatility estimate, and ",e.jsx(t.InlineMath,{math:"\\sigma_{\\text{target}}"})," is the target annualized volatility. The volatility scaling ensures each position contributes equally to portfolio risk."]}),e.jsx(t.BlockMath,{math:"\\sigma_t = \\sqrt{252 \\cdot \\text{EWMA}(r_t^2, \\lambda)}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The exponentially weighted moving average (EWMA) of squared returns with decay factor ",e.jsx(t.InlineMath,{math:"\\lambda"})," (typically 0.94 for daily data) provides a responsive volatility estimate."]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Moving Average Crossover Strategies"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["A more refined TSMOM signal uses moving average crossovers. The ",e.jsx(t.InlineMath,{math:"(s, l)"}),"-day crossover signal is:"]}),e.jsx(t.BlockMath,{math:"\\text{MACD}_{s,l}(t) = \\frac{1}{s}\\sum_{i=0}^{s-1} P_{t-i} - \\frac{1}{l}\\sum_{i=0}^{l-1} P_{t-i}"}),e.jsx(t.BlockMath,{math:"w_t = \\frac{\\text{MACD}_{s,l}(t)}{\\sigma_t \\cdot P_t} \\cdot \\sigma_{\\text{target}}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:'Common crossover combinations for Nifty 50 include (8,21), (20,50), and (50,200) day windows. The 50-200 day crossover is the famous "golden cross" / "death cross" signal widely watched by Indian market participants.'}),e.jsx(I,{title:"TSMOM Decomposition",label:"Theorem 5.4",statement:e.jsxs(e.Fragment,{children:["The TSMOM return can be decomposed as: ",e.jsx(t.BlockMath,{math:"r_{TSMOM,t} = \\text{sign}(r_{t-k:t}) \\cdot r_{t:t+1} = |r_{t:t+1}| \\cdot \\mathbb{1}_{[\\text{sign}(r_{t-k:t}) = \\text{sign}(r_{t:t+1})]} - |r_{t:t+1}| \\cdot \\mathbb{1}_{[\\text{sign}(r_{t-k:t}) \\neq \\text{sign}(r_{t:t+1})]}"})," This shows TSMOM profits when the direction of past returns correctly predicts future direction, regardless of magnitude. The strategy's expected return equals the autocorrelation of returns scaled by volatility."]})}),e.jsx(L,{}),e.jsx(M,{title:"tsmom_nifty.py",runnable:!0,code:`import numpy as np

# Time-Series Momentum Strategy on Nifty 50
np.random.seed(42)
n_days = 756  # 3 years of NSE trading data

# Simulate Nifty 50 with momentum characteristics
nifty = np.zeros(n_days)
nifty[0] = 18000
regime = 1  # 1=bull, -1=bear
for t in range(1, n_days):
    if np.random.rand() < 0.005:  # Regime switch probability
        regime *= -1
    drift = regime * 0.0003  # Daily drift
    nifty[t] = nifty[t-1] * (1 + drift + np.random.randn() * 0.012)

returns = np.diff(nifty) / nifty[:-1]

# TSMOM Strategy Parameters
lookbacks = [21, 63, 126, 252]  # 1M, 3M, 6M, 12M
vol_lookback = 60
vol_target = 0.15  # 15% annualized target vol

print("=== TSMOM Strategy on Nifty 50 ===\\n")

for lb in lookbacks:
    # Compute signals
    positions = np.zeros(len(returns))
    strategy_returns = np.zeros(len(returns))

    for t in range(max(lb, vol_lookback), len(returns)):
        # Past return signal
        past_return = (nifty[t] - nifty[t - lb]) / nifty[t - lb]
        signal = np.sign(past_return)

        # EWMA volatility
        vol = np.std(returns[t-vol_lookback:t]) * np.sqrt(252)
        vol = max(vol, 0.05)  # Floor at 5%

        # Position sizing with vol targeting
        position = signal * (vol_target / vol)
        position = np.clip(position, -2, 2)  # Max 2x leverage

        positions[t] = position
        strategy_returns[t] = position * returns[t]

    # Performance metrics
    ann_return = np.mean(strategy_returns) * 252
    ann_vol = np.std(strategy_returns) * np.sqrt(252)
    sharpe = ann_return / ann_vol if ann_vol > 0 else 0
    max_dd = np.min(np.cumsum(strategy_returns) - np.maximum.accumulate(np.cumsum(strategy_returns)))
    hit_rate = np.mean(strategy_returns[strategy_returns != 0] > 0)

    print(f"Lookback: {lb:>3}d | Return: {ann_return*100:>6.1f}% | "
          f"Vol: {ann_vol*100:>5.1f}% | Sharpe: {sharpe:>5.2f} | "
          f"MaxDD: {max_dd*100:>6.1f}% | Hit: {hit_rate*100:>4.1f}%")

# Moving Average Crossover
print(f"\\n=== MA Crossover Signals ===")
ma_pairs = [(8, 21), (20, 50), (50, 200)]

for short_w, long_w in ma_pairs:
    if long_w >= n_days:
        continue
    signals = 0
    golden = 0
    death = 0
    for t in range(long_w, n_days):
        short_ma = np.mean(nifty[t-short_w:t])
        long_ma = np.mean(nifty[t-long_w:t])
        prev_short = np.mean(nifty[t-short_w-1:t-1])
        prev_long = np.mean(nifty[t-long_w-1:t-1])
        if prev_short <= prev_long and short_ma > long_ma:
            golden += 1
        elif prev_short >= prev_long and short_ma < long_ma:
            death += 1
    print(f"MA({short_w},{long_w}): {golden} golden crosses, {death} death crosses")

# Transaction costs (NSE specific)
print(f"\\n=== NSE Cost Analysis ===")
turnover_ratio = 12  # Approximate annual turnovers
nifty_futures_lot = 25  # Nifty futures lot size (25 units)
stt_futures = 0.0125 / 100  # STT on futures sell side
brokerage = 20  # INR per order
margin_req = 0.12  # 12% SPAN margin for Nifty futures

avg_nifty = np.mean(nifty)
notional_per_lot = nifty_futures_lot * avg_nifty
annual_stt = turnover_ratio * stt_futures * notional_per_lot
annual_brokerage = turnover_ratio * 2 * brokerage

print(f"Notional per lot: INR {notional_per_lot:,.0f}")
print(f"Margin per lot:   INR {notional_per_lot * margin_req:,.0f}")
print(f"Annual STT cost:  INR {annual_stt:,.0f}")
print(f"Annual brokerage: INR {annual_brokerage:,.0f}")
print(f"Total cost drag:  {(annual_stt + annual_brokerage)/notional_per_lot*100:.3f}%")`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"TSMOM in the Indian Market Context"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Nifty 50 has exhibited strong time-series momentum historically, particularly at the 3-month and 12-month lookback horizons. The strategy works well during trending regimes (bull runs from 2003-2007, 2020-2021) but suffers during choppy, range-bound markets. Key Indian market considerations include:"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Aspect"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Indian Market Detail"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Instrument"}),e.jsx("td",{className:"px-5 py-2",children:"Nifty 50 futures (lot size 25) or Nifty ETFs"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Trading hours"}),e.jsx("td",{className:"px-5 py-2",children:"9:15 AM - 3:30 PM IST, pre-open from 9:00 AM"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Margin"}),e.jsx("td",{className:"px-5 py-2",children:"SPAN + exposure margin (~12% for Nifty futures)"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Roll cost"}),e.jsx("td",{className:"px-5 py-2",children:"Monthly expiry on last Thursday, ~0.05% per roll"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-5 py-2",children:"Key events"}),e.jsx("td",{className:"px-5 py-2",children:"RBI MPC (bi-monthly), Union Budget (February), election cycles"})]})]})]})}),e.jsx(T,{title:"TSMOM Position Sizing",difficulty:"intermediate",problem:"Nifty 50 is at 22,000 with a 3-month return of +8%. The 60-day realized volatility is 14% annualized. Target vol is 15%. Compute the TSMOM position for a portfolio of INR 1 crore.",solution:[{step:"Determine signal",formula:"\\text{signal} = \\text{sign}(+8\\%) = +1",explanation:"Positive 3-month return gives a long signal."},{step:"Compute position weight",formula:"w = \\frac{\\sigma_{target}}{\\sigma_{realized}} \\times \\text{signal} = \\frac{0.15}{0.14} \\times 1 = 1.071",explanation:"Slightly leveraged because realized vol is below target."},{step:"Calculate notional exposure",formula:"\\text{Notional} = 1.071 \\times 1,00,00,000 = \\text{INR } 1,07,14,286",explanation:"Total notional exposure in Nifty futures."},{step:"Convert to lots",formula:"\\text{Lots} = \\frac{1,07,14,286}{25 \\times 22,000} = 19.5 \\approx 19 \\text{ lots}",explanation:"Round down to 19 lots of Nifty futures. Margin required: ~INR 12.5 lakhs."}]}),e.jsx(N,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Time-series momentum on Nifty 50 captures trending behavior with a simple, robust signal: the sign of past returns. Volatility-scaled positioning ensures consistent risk contribution regardless of market regime. Moving average crossovers provide a smoother, less noisy variant of the pure TSMOM signal. For NSE implementation, Nifty futures with monthly rolls are the most cost-effective vehicle, with total execution costs under 0.5% annually for a disciplined strategy."})})]})}const he=Object.freeze(Object.defineProperty({__proto__:null,default:V},Symbol.toStringTag,{value:"Module"}));function W(){const[a,v]=b.useState(12),[r,j]=b.useState(1),[m,y]=b.useState(5),f=[{name:"Reliance",sector:"Energy",returns:[.02,.03,-.01,.04,.01,-.02,.05,.03,.02,.01,.04,.03]},{name:"TCS",sector:"IT",returns:[.01,.02,.03,.01,.02,.04,.01,-.01,.03,.02,.01,.02]},{name:"HDFC Bank",sector:"Banking",returns:[-.01,.01,.02,.03,.04,.02,.03,.02,-.01,.01,.03,.04]},{name:"Infosys",sector:"IT",returns:[.03,.01,.02,-.02,.01,.03,.02,.01,.04,.03,-.01,.01]},{name:"ICICI Bank",sector:"Banking",returns:[.02,.04,.03,.01,.03,.01,-.01,.02,.03,.04,.02,.01]},{name:"ITC",sector:"FMCG",returns:[-.01,.01,0,.02,-.01,.01,.02,.03,.01,0,.02,.01]},{name:"SBI",sector:"Banking",returns:[.04,.03,.02,-.03,.01,.05,.03,-.02,.04,.02,.01,.03]},{name:"Bharti Airtel",sector:"Telecom",returns:[.01,.02,.01,.03,.02,.01,.04,.03,.02,.01,.03,.02]},{name:"HUL",sector:"FMCG",returns:[.01,-.01,.02,.01,0,.01,-.01,.02,.01,.01,0,.01]},{name:"Adani Ports",sector:"Infra",returns:[.05,.04,-.03,.06,.02,-.04,.07,.03,-.02,.05,.04,-.01]}],o=f.map(n=>{const p=n.returns.slice(0,Math.min(a,12)),d=p.slice(0,p.length-r).reduce((i,l)=>i*(1+l),1)-1;return{...n,momentum:d}}).sort((n,p)=>p.momentum-n.momentum),s=o.slice(0,m),c=o.slice(-m);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Cross-Sectional Momentum Ranker"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Rank NSE 500 stocks (sample) by relative momentum. Adjust lookback, skip period, and portfolio size."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Lookback: ",a," months"]}),e.jsx("input",{type:"range",min:"3",max:"12",step:"1",value:a,onChange:n=>v(parseInt(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Skip (reversal buffer): ",r," month"]}),e.jsx("input",{type:"range",min:"0",max:"3",step:"1",value:r,onChange:n=>j(parseInt(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Top/Bottom N: ",m," stocks"]}),e.jsx("input",{type:"range",min:"2",max:"5",step:"1",value:m,onChange:n=>y(parseInt(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-1 gap-4 sm:grid-cols-2",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"text-sm font-bold text-green-600 dark:text-green-400 mb-2",children:"Winners (Long)"}),s.map((n,p)=>e.jsxs("div",{className:"flex justify-between border-b border-gray-100 dark:border-gray-700 py-1 text-sm",children:[e.jsxs("span",{className:"text-gray-700 dark:text-gray-300",children:[p+1,". ",n.name," ",e.jsxs("span",{className:"text-xs text-gray-400",children:["(",n.sector,")"]})]}),e.jsxs("span",{className:"font-mono text-green-600",children:[(n.momentum*100).toFixed(1),"%"]})]},p))]}),e.jsxs("div",{children:[e.jsx("h4",{className:"text-sm font-bold text-red-500 mb-2",children:"Losers (Short)"}),c.map((n,p)=>e.jsxs("div",{className:"flex justify-between border-b border-gray-100 dark:border-gray-700 py-1 text-sm",children:[e.jsxs("span",{className:"text-gray-700 dark:text-gray-300",children:[f.length-m+p+1,". ",n.name," ",e.jsxs("span",{className:"text-xs text-gray-400",children:["(",n.sector,")"]})]}),e.jsxs("span",{className:"font-mono text-red-500",children:[(n.momentum*100).toFixed(1),"%"]})]},p))]})]}),e.jsxs("p",{className:"mt-3 text-center text-sm text-gray-600 dark:text-gray-400",children:["Long-short spread: ",e.jsxs("span",{className:"font-bold text-indigo-600",children:[((s.reduce((n,p)=>n+p.momentum,0)/m-c.reduce((n,p)=>n+p.momentum,0)/m)*100).toFixed(1),"%"]})," over the lookback period"]})]})}function D(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Cross-Sectional Momentum on NSE 500"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:'Cross-sectional momentum ranks assets by their relative performance and goes long the winners while shorting the losers. Jegadeesh and Titman (1993) documented that stocks with high returns over the past 3-12 months tend to outperform low-return stocks over the next 1-6 months. This "relative strength" effect is particularly strong in the Indian market, where retail investor herding and information asymmetry amplify momentum patterns.'}),e.jsx(S,{title:"Cross-Sectional Momentum",label:"Definition 5.5",definition:"Cross-sectional momentum is a strategy that ranks securities within a universe by their past returns over a formation period, then constructs a long-short portfolio by buying the top decile (winners) and selling the bottom decile (losers). The strategy profits from the relative continuation of performance across securities.",notation:e.jsxs(e.Fragment,{children:["Momentum score for stock ",e.jsx(t.InlineMath,{math:"i"}),": ",e.jsx(t.InlineMath,{math:"m_{i,t} = \\prod_{j=1}^{k-s}(1 + r_{i,t-j}) - 1"})," where ",e.jsx(t.InlineMath,{math:"k"})," is the lookback period and ",e.jsx(t.InlineMath,{math:"s"})," is the skip period (typically 1 month to avoid short-term reversal)."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"The Jegadeesh-Titman Framework"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The classic momentum strategy is parameterized by ",e.jsx(t.InlineMath,{math:"(J, K)"})," where",e.jsx(t.InlineMath,{math:"J"})," is the formation (lookback) period and ",e.jsx(t.InlineMath,{math:"K"})," is the holding period. At each rebalancing date:"]}),e.jsx(t.BlockMath,{math:"r_{WML,t} = \\frac{1}{N_W}\\sum_{i \\in \\text{Winners}} r_{i,t} - \\frac{1}{N_L}\\sum_{i \\in \\text{Losers}} r_{i,t}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The most common specification is (12,1): rank by 12-month returns, hold for 1 month, skip the most recent month. The skip month is crucial because of the well-documented short-term reversal effect (Jegadeesh, 1990)."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Momentum in Indian Equities"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The NSE 500 universe provides an excellent testing ground for momentum strategies. India's Nifty 200 Momentum 30 Index (maintained by NSE) has consistently outperformed the broad market. Several India-specific factors enhance momentum:"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Factor"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Effect on Momentum"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Retail investor dominance"}),e.jsx("td",{className:"px-5 py-2",children:"Herding amplifies trends, delays price discovery"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Analyst coverage gaps"}),e.jsx("td",{className:"px-5 py-2",children:"Information diffuses slowly in mid/small caps"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Sectoral concentration"}),e.jsx("td",{className:"px-5 py-2",children:"Sector rotation creates persistent momentum"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"FII/DII flow patterns"}),e.jsx("td",{className:"px-5 py-2",children:"Persistent institutional flows sustain trends"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-5 py-2",children:"Promoter holding signals"}),e.jsx("td",{className:"px-5 py-2",children:"Promoter buying reinforces momentum"})]})]})]})}),e.jsx(I,{title:"Momentum Factor Risk Premium",label:"Theorem 5.5",statement:e.jsxs(e.Fragment,{children:["Under the behavioral explanation (Daniel, Hirshleifer, and Subrahmanyam, 1998), momentum profits arise from investor overconfidence and biased self-attribution. Investors overreact to private signals and underreact to public information, causing prices to trend away from fundamentals. The momentum premium ",e.jsx(t.InlineMath,{math:"\\mathbb{E}[r_{WML}]"})," is positive but exhibits negative skewness and occasional severe crashes (momentum crashes), especially following market downturns when losers sharply rebound."]})}),e.jsx(W,{}),e.jsx(M,{title:"xsmom_nse500.py",runnable:!0,code:`import numpy as np

# Cross-Sectional Momentum Strategy on NSE 500 (simulated)
np.random.seed(42)
n_stocks = 100   # Subset of NSE 500
n_months = 60    # 5 years monthly data

# Stock names (representative)
sectors = ['IT', 'Banking', 'FMCG', 'Pharma', 'Auto', 'Energy',
           'Metals', 'Infra', 'Telecom', 'Chemicals']
stock_names = [f"{sectors[i%10]}_{i//10+1}" for i in range(n_stocks)]

# Generate monthly returns with momentum characteristics
# Each stock has a persistent alpha + sector factor + noise
alphas = np.random.randn(n_stocks) * 0.005
sector_factors = np.random.randn(10, n_months) * 0.03
market_factor = np.random.randn(n_months) * 0.04

monthly_returns = np.zeros((n_months, n_stocks))
for i in range(n_stocks):
    sector_idx = i % 10
    betas = 0.7 + np.random.rand() * 0.6
    monthly_returns[:, i] = (alphas[i] +
                              betas * market_factor +
                              sector_factors[sector_idx] +
                              np.random.randn(n_months) * 0.06)

# Momentum strategy: (12,1) with 1-month skip
formation = 12
holding = 1
skip = 1
n_quintiles = 5

portfolio_returns = {q: [] for q in range(n_quintiles)}
wml_returns = []

for t in range(formation + skip, n_months - holding + 1):
    # Compute momentum scores (cumulative return over formation - skip)
    momentum_scores = np.zeros(n_stocks)
    for i in range(n_stocks):
        past_rets = monthly_returns[t-formation-skip:t-skip, i]
        momentum_scores[i] = np.prod(1 + past_rets) - 1

    # Rank stocks into quintiles
    ranks = np.argsort(np.argsort(-momentum_scores))  # 0 = best
    quintile_size = n_stocks // n_quintiles

    for q in range(n_quintiles):
        mask = (ranks >= q * quintile_size) & (ranks < (q+1) * quintile_size)
        q_return = np.mean(monthly_returns[t:t+holding, mask])
        portfolio_returns[q].append(q_return)

    # WML = Q1 (winners) - Q5 (losers)
    wml = portfolio_returns[0][-1] - portfolio_returns[n_quintiles-1][-1]
    wml_returns.append(wml)

# Performance analysis
print("=== Cross-Sectional Momentum: NSE 500 Quintile Analysis ===")
print(f"{'Quintile':<12} {'Ann Return':<14} {'Ann Vol':<12} {'Sharpe':<10} {'Max DD':<10}")

for q in range(n_quintiles):
    rets = np.array(portfolio_returns[q])
    ann_ret = np.mean(rets) * 12
    ann_vol = np.std(rets) * np.sqrt(12)
    sharpe = ann_ret / ann_vol if ann_vol > 0 else 0
    cum = np.cumsum(rets)
    max_dd = np.min(cum - np.maximum.accumulate(cum))
    label = 'Winners' if q == 0 else ('Losers' if q == n_quintiles-1 else f'Q{q+1}')
    print(f"{label:<12} {ann_ret*100:>10.1f}%   {ann_vol*100:>8.1f}%   {sharpe:>7.2f}   {max_dd*100:>7.1f}%")

wml = np.array(wml_returns)
print(f"\\n{'WML (L-S)':<12} {np.mean(wml)*12*100:>10.1f}%   "
      f"{np.std(wml)*np.sqrt(12)*100:>8.1f}%   "
      f"{np.mean(wml)*12/(np.std(wml)*np.sqrt(12)):>7.2f}")

# Momentum crash risk
from scipy.stats import skew, kurtosis
print(f"\\n=== Momentum Risk Characteristics ===")
print(f"WML monthly skewness:  {skew(wml):.2f}")
print(f"WML monthly kurtosis:  {kurtosis(wml):.2f}")
print(f"Worst month:           {np.min(wml)*100:.1f}%")
print(f"Best month:            {np.max(wml)*100:.1f}%")
print(f"% positive months:     {np.mean(wml > 0)*100:.1f}%")

# Sector decomposition
print(f"\\n=== Sector Exposure of Winners Portfolio ===")
last_scores = np.zeros(n_stocks)
for i in range(n_stocks):
    last_scores[i] = np.prod(1 + monthly_returns[-13:-1, i]) - 1

top_20_idx = np.argsort(-last_scores)[:20]
sector_counts = {}
for idx in top_20_idx:
    sec = sectors[idx % 10]
    sector_counts[sec] = sector_counts.get(sec, 0) + 1

for sec, count in sorted(sector_counts.items(), key=lambda x: -x[1]):
    print(f"  {sec:<12} {count} stocks ({count/20*100:.0f}%)")`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Momentum Crash Risk Management"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:'Momentum strategies are vulnerable to sharp reversals ("momentum crashes"), which tend to occur when markets rebound after a severe decline. The losers portfolio, composed of beaten-down stocks with high betas, rallies sharply, causing large losses for the long-short strategy. To manage this risk:'}),e.jsx(t.BlockMath,{math:"\\text{Dynamic hedging: } w_{WML,t} = w_{WML,t}^{*} \\cdot \\frac{\\sigma_{\\text{target}}}{\\hat{\\sigma}_{WML,t}}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"\\hat{\\sigma}_{WML,t}"})," is the estimated WML portfolio volatility. This automatically reduces exposure when WML volatility spikes, which typically precedes momentum crashes."]}),e.jsx(T,{title:"Monthly Momentum Rebalance",difficulty:"intermediate",problem:"From the NSE 500 universe, the top quintile (100 stocks) has an average 12-1 month return of 45% and the bottom quintile has -15%. Capital is INR 2 crore. Compute the long-short portfolio positions and expected monthly return.",solution:[{step:"Long leg (Winners)",formula:"\\text{Long notional} = \\frac{2,00,00,000}{2} = \\text{INR 1 crore}",explanation:"Equal capital allocation to long and short legs for dollar neutrality."},{step:"Per-stock allocation",formula:"\\text{Per stock} = \\frac{1,00,00,000}{100} = \\text{INR 10,000}",explanation:"Equal-weight allocation within each quintile (100 stocks per quintile)."},{step:"Expected monthly WML return",formula:"r_{WML} \\approx \\frac{45\\% - (-15\\%)}{12} = 5\\% \\text{ monthly}",explanation:"The long-short spread of 60% annualizes to approximately 5% per month, though this is the historical spread and not a guaranteed forward return."}]}),e.jsx(N,{title:"NSE Implementation: Nifty 200 Momentum 30 Index",type:"historical",children:e.jsx("p",{children:"NSE launched the Nifty 200 Momentum 30 Index in 2020, which selects the top 30 stocks from the Nifty 200 universe based on their momentum scores (normalized 6-month and 12-month returns adjusted for volatility). This index has historically outperformed the Nifty 50 by 4-6% annually. Several mutual funds and ETFs now track this index, providing retail investors easy access to systematic momentum exposure. For quantitative traders, this index serves as a useful benchmark for evaluating custom momentum strategies."})}),e.jsx(N,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Cross-sectional momentum on the NSE 500 exploits the tendency of relative winners to continue outperforming and losers to continue underperforming. The (12,1) specification with a 1-month skip is the most robust parameterization. Indian markets show stronger momentum than developed markets due to retail herding and slower information diffusion. However, momentum crash risk requires careful volatility-based position sizing and drawdown management."})})]})}const ge=Object.freeze(Object.defineProperty({__proto__:null,default:D},Symbol.toStringTag,{value:"Module"}));function H(){const[a,v]=b.useState(15),[r,j]=b.useState(2),[m,y]=b.useState(.94),f=()=>{const i=[],l=[],g=[];let h=.14;for(let _=0;_<150;_++){const u=_>60&&_<90?2.5:1;h=Math.sqrt(m*h*h+(1-m)*(Math.random()-.5)**2*.04*u);const k=h*Math.sqrt(252)*100,w=Math.min(a/k,r);i.push((Math.random()-.48)*h*200),l.push(k),g.push(w)}return{returns:i,vols:l,leverages:g}},[o]=b.useState(f),s=500,c=140,n=Math.max(...o.vols),p=o.vols.map((d,i)=>{const l=i/(o.vols.length-1)*s,g=c-d/n*c;return`${i===0?"M":"L"}${l},${g}`}).join(" "),x=o.leverages.map((d,i)=>{const l=i/(o.leverages.length-1)*s,g=c-d/r*c;return`${i===0?"M":"L"}${l},${g}`}).join(" ");return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Volatility Targeting with India VIX"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust target volatility, max leverage, and EWMA decay to see how the strategy dynamically sizes positions."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Target Vol: ",a,"%"]}),e.jsx("input",{type:"range",min:"5",max:"25",step:"1",value:a,onChange:d=>v(parseInt(d.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Max Leverage: ",r.toFixed(1),"x"]}),e.jsx("input",{type:"range",min:"1.0",max:"3.0",step:"0.1",value:r,onChange:d=>j(parseFloat(d.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["EWMA Lambda: ",m.toFixed(2)]}),e.jsx("input",{type:"range",min:"0.90",max:"0.99",step:"0.01",value:m,onChange:d=>y(parseFloat(d.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("p",{className:"text-xs text-gray-500 dark:text-gray-400 font-semibold",children:"Realized Vol (blue) vs Leverage (green)"}),e.jsxs("svg",{viewBox:`0 0 ${s} ${c}`,className:"w-full max-w-2xl mx-auto block",children:[e.jsx("line",{x1:"0",y1:c-a/n*c,x2:s,y2:c-a/n*c,stroke:"#f59e0b",strokeWidth:"1",strokeDasharray:"4"}),e.jsx("path",{d:p,fill:"none",stroke:"#6366f1",strokeWidth:"1.5"}),e.jsx("path",{d:x,fill:"none",stroke:"#22c55e",strokeWidth:"1.5"})]})]}),e.jsxs("div",{className:"mt-3 flex justify-center gap-4 text-xs text-gray-500 dark:text-gray-400",children:[e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx("span",{className:"inline-block w-4 h-0.5 bg-indigo-500"})," Realized Vol"]}),e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx("span",{className:"inline-block w-4 h-0.5 bg-green-500"})," Leverage"]}),e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx("span",{className:"inline-block w-4 h-0.5 bg-amber-500"})," Target Vol"]})]}),e.jsxs("p",{className:"mt-2 text-center text-sm text-gray-600 dark:text-gray-400",children:["Note how leverage ",e.jsx("span",{className:"text-green-600",children:"decreases"})," during the high-vol period (days 60-90) and ",e.jsx("span",{className:"text-green-600",children:"increases"})," during calm markets."]})]})}function K(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Managed Volatility with India VIX"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Volatility targeting (or managed volatility) dynamically scales portfolio exposure to maintain a constant level of risk over time. When market volatility rises (as measured by India VIX or realized volatility), the strategy reduces leverage; when volatility falls, it increases exposure. This simple mechanism dramatically improves risk-adjusted returns for momentum and trend-following strategies on the Nifty 50."}),e.jsx(S,{title:"Volatility Targeting",label:"Definition 5.6",definition:"Volatility targeting is a dynamic position sizing technique that scales portfolio exposure inversely with estimated volatility to achieve a constant target risk level. The leverage at time t is computed as the ratio of target volatility to forecasted volatility.",notation:e.jsxs(e.Fragment,{children:["Leverage: ",e.jsx(t.InlineMath,{math:"L_t = \\min\\left(\\frac{\\sigma_{\\text{target}}}{\\hat{\\sigma}_t}, L_{\\max}\\right)"})," where ",e.jsx(t.InlineMath,{math:"\\hat{\\sigma}_t"})," is the volatility forecast and ",e.jsx(t.InlineMath,{math:"L_{\\max}"})," is the maximum allowed leverage."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"India VIX: The Fear Gauge"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"India VIX, computed by NSE from Nifty 50 options prices, measures the market's expectation of 30-day forward volatility. It is computed using the CBOE VIX methodology adapted for Indian markets:"}),e.jsx(t.BlockMath,{math:"\\text{India VIX} = 100 \\times \\sqrt{\\frac{2}{T}\\sum_i \\frac{\\Delta K_i}{K_i^2} e^{rT} Q(K_i) - \\frac{1}{T}\\left(\\frac{F}{K_0} - 1\\right)^2}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"T"})," is time to expiry, ",e.jsx(t.InlineMath,{math:"K_i"})," are option strike prices,",e.jsx(t.InlineMath,{math:"Q(K_i)"})," is the midpoint of the bid-ask spread for each out-of-the-money option, ",e.jsx(t.InlineMath,{math:"F"})," is the forward Nifty level, and ",e.jsx(t.InlineMath,{math:"r"})," is the risk-free rate (typically the 91-day T-bill rate)."]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Volatility Estimation Methods"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Several approaches to estimate volatility for targeting:"}),e.jsx(t.BlockMath,{math:"\\text{EWMA: } \\hat{\\sigma}_t^2 = \\lambda \\hat{\\sigma}_{t-1}^2 + (1-\\lambda) r_{t-1}^2"}),e.jsx(t.BlockMath,{math:"\\text{Realized Vol: } \\hat{\\sigma}_t = \\sqrt{\\frac{252}{n}\\sum_{i=0}^{n-1} r_{t-i}^2}"}),e.jsx(t.BlockMath,{math:"\\text{Yang-Zhang: } \\hat{\\sigma}_{YZ}^2 = \\hat{\\sigma}_{OC}^2 + k \\hat{\\sigma}_{RS}^2 + (1-k)\\hat{\\sigma}_{CC}^2"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The Yang-Zhang estimator uses open, high, low, and close prices, providing 7x better efficiency than close-to-close volatility. For Nifty, where overnight gaps can be significant (due to SGX Nifty / GIFT Nifty moves), this is particularly valuable."}),e.jsx(I,{title:"Volatility Clustering and Mean Reversion",label:"Theorem 5.6",statement:e.jsxs(e.Fragment,{children:["India VIX exhibits two key properties that make it useful for volatility targeting: (1) ",e.jsx("strong",{children:"Clustering"}),": High-volatility periods tend to be followed by high-volatility periods, making volatility partially predictable. Formally, the autocorrelation of ",e.jsx(t.InlineMath,{math:"\\sigma_t^2"})," is significantly positive: ",e.jsx(t.InlineMath,{math:"\\text{Corr}(\\sigma_t^2, \\sigma_{t+1}^2) > 0"}),". (2) ",e.jsx("strong",{children:"Mean Reversion"}),": India VIX mean-reverts to its long-term average (historically around 16-18%), so extreme VIX levels tend to normalize. These properties ensure that past volatility is a reasonable predictor of near-future volatility."]})}),e.jsx(H,{}),e.jsx(M,{title:"vol_targeting_india_vix.py",runnable:!0,code:`import numpy as np

# Managed Volatility Strategy using India VIX
np.random.seed(42)
n_days = 756  # 3 years

# Simulate Nifty 50 with volatility clustering (GARCH-like)
nifty = np.zeros(n_days)
nifty[0] = 18000
vol = np.zeros(n_days)
vol[0] = 0.14  # Initial annualized vol (14%)
india_vix = np.zeros(n_days)

omega = 0.000002
alpha_garch = 0.08
beta_garch = 0.90

for t in range(1, n_days):
    # GARCH(1,1) daily variance
    daily_var = omega + alpha_garch * (nifty[t-1] * 0.01 * np.random.randn())**2 / nifty[t-1]**2 + beta_garch * (vol[t-1]/np.sqrt(252))**2
    vol[t] = np.sqrt(daily_var * 252)

    # India VIX = implied vol (slightly above realized + noise)
    india_vix[t] = vol[t] * 100 * (1.1 + np.random.randn() * 0.05)

    # Nifty price with vol regime
    ret = 0.0004 + np.random.randn() * np.sqrt(daily_var)
    nifty[t] = nifty[t-1] * (1 + ret)

returns = np.diff(nifty) / nifty[:-1]

# Strategy: Vol-targeted Nifty 50
target_vol = 0.15  # 15% annualized
max_leverage = 2.0
min_leverage = 0.2

# Method 1: EWMA volatility
ewma_lambda = 0.94
ewma_var = np.zeros(len(returns))
ewma_var[0] = np.var(returns[:20])

for t in range(1, len(returns)):
    ewma_var[t] = ewma_lambda * ewma_var[t-1] + (1-ewma_lambda) * returns[t-1]**2

ewma_vol = np.sqrt(ewma_var * 252)
ewma_leverage = np.clip(target_vol / ewma_vol, min_leverage, max_leverage)

# Method 2: India VIX-based
vix_vol = india_vix[1:] / 100  # Convert VIX to decimal
vix_leverage = np.clip(target_vol / vix_vol, min_leverage, max_leverage)

# Compute strategy returns
buy_hold_returns = returns
ewma_strategy = ewma_leverage * returns
vix_strategy = vix_leverage * returns

# Performance comparison
strategies = {
    'Buy & Hold Nifty': buy_hold_returns,
    'EWMA Vol Target': ewma_strategy,
    'VIX Vol Target': vix_strategy
}

print("=== Managed Volatility Performance ===")
print(f"{'Strategy':<20} {'Ann Ret':<10} {'Ann Vol':<10} {'Sharpe':<8} "
      f"{'MaxDD':<10} {'Calmar':<8} {'Sortino':<8}")

for name, rets in strategies.items():
    ann_ret = np.mean(rets) * 252
    ann_vol = np.std(rets) * np.sqrt(252)
    sharpe = ann_ret / ann_vol if ann_vol > 0 else 0
    cum = np.cumsum(rets)
    max_dd = np.min(cum - np.maximum.accumulate(cum))
    calmar = ann_ret / abs(max_dd) if max_dd != 0 else 0
    downside_vol = np.std(rets[rets < 0]) * np.sqrt(252)
    sortino = ann_ret / downside_vol if downside_vol > 0 else 0

    print(f"{name:<20} {ann_ret*100:>6.1f}%   {ann_vol*100:>6.1f}%   "
          f"{sharpe:>5.2f}   {max_dd*100:>7.1f}%   {calmar:>5.2f}   {sortino:>5.2f}")

# VIX regime analysis
print(f"\\n=== India VIX Regime Analysis ===")
vix_percentiles = [10, 25, 50, 75, 90]
for p in vix_percentiles:
    threshold = np.percentile(india_vix[1:], p)
    print(f"VIX P{p:<3}: {threshold:.1f}")

# Returns in different VIX regimes
low_vix = india_vix[1:] < np.percentile(india_vix[1:], 25)
high_vix = india_vix[1:] > np.percentile(india_vix[1:], 75)

print(f"\\n=== Nifty Returns by VIX Regime ===")
print(f"Low VIX (<P25):  Ann ret = {np.mean(returns[low_vix])*252*100:.1f}%, "
      f"Vol = {np.std(returns[low_vix])*np.sqrt(252)*100:.1f}%")
print(f"High VIX (>P75): Ann ret = {np.mean(returns[high_vix])*252*100:.1f}%, "
      f"Vol = {np.std(returns[high_vix])*np.sqrt(252)*100:.1f}%")

# Leverage statistics
print(f"\\n=== Leverage Statistics ===")
print(f"{'Metric':<20} {'EWMA':<12} {'VIX-based':<12}")
print(f"{'Mean leverage':<20} {np.mean(ewma_leverage):>8.2f}x   {np.mean(vix_leverage):>8.2f}x")
print(f"{'Median leverage':<20} {np.median(ewma_leverage):>8.2f}x   {np.median(vix_leverage):>8.2f}x")
print(f"{'Min leverage':<20} {np.min(ewma_leverage):>8.2f}x   {np.min(vix_leverage):>8.2f}x")
print(f"{'Max leverage':<20} {np.max(ewma_leverage):>8.2f}x   {np.max(vix_leverage):>8.2f}x")`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"India VIX Regimes and Trading Implications"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"VIX Level"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Regime"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Leverage"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Strategy Implication"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"< 12"}),e.jsx("td",{className:"px-5 py-2",children:"Complacency"}),e.jsx("td",{className:"px-5 py-2",children:"1.5-2.0x"}),e.jsx("td",{className:"px-5 py-2",children:"Max exposure, trend-following works well"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"12-18"}),e.jsx("td",{className:"px-5 py-2",children:"Normal"}),e.jsx("td",{className:"px-5 py-2",children:"0.8-1.5x"}),e.jsx("td",{className:"px-5 py-2",children:"Standard positioning"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"18-25"}),e.jsx("td",{className:"px-5 py-2",children:"Elevated"}),e.jsx("td",{className:"px-5 py-2",children:"0.5-0.8x"}),e.jsx("td",{className:"px-5 py-2",children:"Reduced exposure, tighter stops"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"25-35"}),e.jsx("td",{className:"px-5 py-2",children:"High fear"}),e.jsx("td",{className:"px-5 py-2",children:"0.2-0.5x"}),e.jsx("td",{className:"px-5 py-2",children:"Minimal exposure, consider hedges"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-5 py-2",children:"> 35"}),e.jsx("td",{className:"px-5 py-2",children:"Panic"}),e.jsx("td",{className:"px-5 py-2",children:"0.2x (floor)"}),e.jsx("td",{className:"px-5 py-2",children:"Emergency risk-off, potential mean-reversion opportunity"})]})]})]})}),e.jsx(T,{title:"Vol Targeting Calculation",difficulty:"beginner",problem:"India VIX is at 22. Your target volatility is 15% and maximum leverage is 2x. Capital is INR 50 lakhs. How many Nifty futures lots should you hold if Nifty is at 22,000?",solution:[{step:"Compute target leverage",formula:"L = \\frac{\\sigma_{target}}{\\text{India VIX}} = \\frac{15\\%}{22\\%} = 0.682",explanation:"India VIX is above target vol, so leverage is below 1x (under-exposed)."},{step:"Compute target notional",formula:"\\text{Notional} = L \\times \\text{Capital} = 0.682 \\times 50,00,000 = \\text{INR 34,09,091}"},{step:"Convert to Nifty futures lots",formula:"\\text{Lots} = \\frac{34,09,091}{25 \\times 22,000} = 6.2 \\approx 6 \\text{ lots}",explanation:"Round to 6 lots. Each lot has notional value of INR 5.5 lakhs. Margin required: ~INR 3.96 lakhs (12% SPAN)."}]}),e.jsx(N,{title:"India VIX Historical Extremes",type:"historical",children:e.jsx("p",{children:"India VIX hit its all-time high of 87.6 on November 17, 2008 during the Global Financial Crisis. During the COVID-19 crash in March 2020, it reached 83.6. Both instances were followed by sharp market recoveries. At the other extreme, VIX has occasionally dropped below 10 during prolonged calm periods (e.g., late 2017), often preceding corrections. A volatility targeting strategy would have dramatically reduced exposure during these stress events, limiting drawdowns by 40-60% compared to buy-and-hold."})}),e.jsx(N,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Managed volatility using India VIX or EWMA-estimated volatility consistently improves the Sharpe ratio and Calmar ratio of Nifty strategies. The mechanism is simple: reduce exposure when risk is high, increase when risk is low. This works because volatility is persistent (predictable) and high-volatility periods tend to have poor risk-adjusted returns. For NSE implementation, use Nifty futures with SEBI-compliant margin, and rebalance leverage daily or weekly based on updated volatility estimates."})})]})}const ue=Object.freeze(Object.defineProperty({__proto__:null,default:K},Symbol.toStringTag,{value:"Module"}));function U(){const[a,v]=b.useState(22e3),[r,j]=b.useState(.1),[m,y]=b.useState(.015),[f,o]=b.useState(0),[s,c]=b.useState(1.5),x=1-.5,d=a-r*m*m*f*x,i=r*m*m*x+2/r*Math.log(1+r/s),l=d-i/2,g=d+i/2;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Avellaneda-Stoikov Market Maker"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust parameters to see how the optimal bid/ask quotes adapt to inventory and risk aversion."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Mid Price: ",a]}),e.jsx("input",{type:"range",min:"20000",max:"24000",step:"100",value:a,onChange:h=>v(parseInt(h.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Risk Aversion (gamma): ",r.toFixed(2)]}),e.jsx("input",{type:"range",min:"0.01",max:"0.5",step:"0.01",value:r,onChange:h=>j(parseFloat(h.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Volatility (sigma): ",(m*100).toFixed(1),"%"]}),e.jsx("input",{type:"range",min:"0.005",max:"0.03",step:"0.001",value:m,onChange:h=>y(parseFloat(h.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Inventory: ",f," lots"]}),e.jsx("input",{type:"range",min:"-10",max:"10",step:"1",value:f,onChange:h=>o(parseInt(h.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 500 120",className:"w-full max-w-xl mx-auto block",children:[e.jsx("line",{x1:"50",y1:"60",x2:"450",y2:"60",stroke:"#e5e7eb",strokeWidth:"2"}),e.jsx("circle",{cx:"250",cy:"60",r:"6",fill:"#6366f1"}),e.jsxs("text",{x:"250",y:"90",textAnchor:"middle",className:"text-[10px]",fill:"#6366f1",children:["Mid: ",a]}),e.jsx("circle",{cx:250+(d-a)*.5,cy:"60",r:"5",fill:"#f59e0b"}),e.jsxs("text",{x:250+(d-a)*.5,y:"45",textAnchor:"middle",className:"text-[9px]",fill:"#f59e0b",children:["Rsv: ",d.toFixed(0)]}),e.jsx("rect",{x:250+(l-a)*.5-20,y:"52",width:"40",height:"16",rx:"3",fill:"#22c55e",opacity:"0.3"}),e.jsxs("text",{x:250+(l-a)*.5,y:"64",textAnchor:"middle",className:"text-[9px] font-bold",fill:"#16a34a",children:["Bid: ",l.toFixed(0)]}),e.jsx("rect",{x:250+(g-a)*.5-20,y:"52",width:"40",height:"16",rx:"3",fill:"#ef4444",opacity:"0.3"}),e.jsxs("text",{x:250+(g-a)*.5,y:"64",textAnchor:"middle",className:"text-[9px] font-bold",fill:"#dc2626",children:["Ask: ",g.toFixed(0)]}),e.jsxs("text",{x:"250",y:"115",textAnchor:"middle",className:"text-[10px]",fill:"#6b7280",children:["Spread: ",i.toFixed(1)," pts | Inventory skew: ",(d-a).toFixed(1)," pts"]})]}),e.jsx("p",{className:"mt-2 text-center text-sm text-gray-600 dark:text-gray-400",children:f>0?e.jsx("span",{className:"text-amber-600",children:"Long inventory: quotes skew lower to encourage selling"}):f<0?e.jsx("span",{className:"text-amber-600",children:"Short inventory: quotes skew higher to encourage buying"}):e.jsx("span",{className:"text-green-600",children:"Flat inventory: symmetric quotes around mid price"})})]})}function $(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Market Making: Bid-Ask Quoting and Avellaneda-Stoikov"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Market making is the art of continuously providing liquidity by quoting bid and ask prices. The market maker profits from the bid-ask spread while managing inventory risk. On the NSE, market making plays a crucial role in providing liquidity for derivatives and less-liquid securities. SEBI's market-making framework incentivizes designated market makers (DMMs) with reduced transaction costs and margin benefits."}),e.jsx(S,{title:"Market Making",label:"Definition 5.7",definition:"A market maker is a firm or trader that continuously quotes both bid (buy) and ask (sell) prices for a financial instrument, profiting from the bid-ask spread. The market maker provides liquidity by being willing to trade on either side, bearing inventory risk in exchange for the spread.",notation:e.jsxs(e.Fragment,{children:["The quoted spread is ",e.jsx(t.InlineMath,{math:"\\delta = P_{ask} - P_{bid}"}),". The market maker's instantaneous P&L per round-trip is ",e.jsx(t.InlineMath,{math:"\\delta - \\text{costs}"}),"."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"The Avellaneda-Stoikov Model"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The seminal Avellaneda-Stoikov (2008) model provides the optimal quoting strategy for a risk-averse market maker. The mid price follows a Brownian motion:"}),e.jsx(t.BlockMath,{math:"dS_t = \\sigma\\,dW_t"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The market maker's objective is to maximize expected terminal utility of wealth:"}),e.jsx(t.BlockMath,{math:"\\max_{\\delta^b, \\delta^a} \\mathbb{E}\\left[-e^{-\\gamma(X_T + q_T S_T)}\\right]"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"X_T"})," is cash, ",e.jsx(t.InlineMath,{math:"q_T"})," is inventory,",e.jsx(t.InlineMath,{math:"\\gamma"})," is risk aversion, and ",e.jsx(t.InlineMath,{math:"\\delta^b, \\delta^a"})," are the bid/ask distances from mid price."]}),e.jsx(I,{title:"Avellaneda-Stoikov Optimal Quotes",label:"Theorem 5.7",statement:e.jsxs(e.Fragment,{children:["The optimal reservation price and spread for a market maker with CARA utility are:",e.jsx(t.BlockMath,{math:"r(s, q, t) = s - q\\gamma\\sigma^2(T-t)"}),e.jsx(t.BlockMath,{math:"\\delta^* = \\gamma\\sigma^2(T-t) + \\frac{2}{\\gamma}\\ln\\left(1 + \\frac{\\gamma}{\\kappa}\\right)"}),"where ",e.jsx(t.InlineMath,{math:"s"})," is the mid price, ",e.jsx(t.InlineMath,{math:"q"})," is inventory, ",e.jsx(t.InlineMath,{math:"\\gamma"})," is risk aversion, ",e.jsx(t.InlineMath,{math:"\\sigma"})," is volatility, ",e.jsx(t.InlineMath,{math:"\\kappa"})," is the order arrival intensity parameter, and ",e.jsx(t.InlineMath,{math:"T-t"})," is time remaining. The optimal bid and ask are placed symmetrically around the reservation price with spread ",e.jsx(t.InlineMath,{math:"\\delta^*"}),"."]}),proof:e.jsxs(e.Fragment,{children:["The proof uses dynamic programming. The market maker's value function ",e.jsx(t.InlineMath,{math:"V(t,x,q,s) = -e^{-\\gamma(x + qs - q^2\\gamma\\sigma^2(T-t)/2 + \\theta(T-t))}"})," satisfies the HJB equation with jump terms for order arrivals. Order arrivals on each side follow Poisson processes with intensities ",e.jsx(t.InlineMath,{math:"\\Lambda^a(\\delta^a) = Ae^{-\\kappa\\delta^a}"})," and ",e.jsx(t.InlineMath,{math:"\\Lambda^b(\\delta^b) = Ae^{-\\kappa\\delta^b}"}),". Optimizing the HJB equation over ",e.jsx(t.InlineMath,{math:"\\delta^b"})," and ",e.jsx(t.InlineMath,{math:"\\delta^a"})," yields the stated results."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Key Components of the Optimal Strategy"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The Avellaneda-Stoikov model reveals two key insights:"}),e.jsx(t.BlockMath,{math:"\\text{Reservation price: } r = s - q\\gamma\\sigma^2\\tau"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The reservation price shifts ",e.jsx("em",{children:"away"})," from inventory. If long (",e.jsx(t.InlineMath,{math:"q > 0"}),"), the reservation price is below mid, encouraging selling. The shift magnitude scales with risk aversion ",e.jsx(t.InlineMath,{math:"\\gamma"}),", volatility squared ",e.jsx(t.InlineMath,{math:"\\sigma^2"}),", and time remaining ",e.jsx(t.InlineMath,{math:"\\tau"}),"."]}),e.jsx(t.BlockMath,{math:"\\text{Optimal spread: } \\delta^* = \\underbrace{\\gamma\\sigma^2\\tau}_{\\text{inventory risk}} + \\underbrace{\\frac{2}{\\gamma}\\ln\\left(1+\\frac{\\gamma}{\\kappa}\\right)}_{\\text{adverse selection}}"}),e.jsx(U,{}),e.jsx(M,{title:"market_maker_nse.py",runnable:!0,code:`import numpy as np

# Avellaneda-Stoikov Market Making Simulation on NSE
np.random.seed(42)

# NSE Nifty 50 Futures Market Making Parameters
initial_mid = 22000    # Nifty mid price
sigma = 0.012          # Per-step volatility
gamma = 0.1            # Risk aversion
kappa = 1.5            # Order arrival decay
T = 1.0                # Trading session (normalized)
n_steps = 1000         # Steps per session
dt = T / n_steps
lot_size = 25          # Nifty futures lot size

# Simulation
mid_prices = np.zeros(n_steps)
inventory = np.zeros(n_steps)
cash = np.zeros(n_steps)
pnl = np.zeros(n_steps)
bid_prices = np.zeros(n_steps)
ask_prices = np.zeros(n_steps)

mid_prices[0] = initial_mid

for t in range(1, n_steps):
    # Mid price evolution (GBM)
    mid_prices[t] = mid_prices[t-1] + sigma * mid_prices[t-1] * np.random.randn() * np.sqrt(dt)
    tau = T - t * dt

    # Avellaneda-Stoikov optimal quotes
    q = inventory[t-1]
    s = mid_prices[t]

    # Reservation price
    r = s - q * gamma * (sigma * s)**2 * tau

    # Optimal spread
    spread = gamma * (sigma * s)**2 * tau + (2/gamma) * np.log(1 + gamma/kappa)
    spread = max(spread, 2)  # Minimum tick size on NSE (INR 0.05 * lot)

    bid = r - spread / 2
    ask = r + spread / 2

    bid_prices[t] = bid
    ask_prices[t] = ask

    # Order arrivals (Poisson process)
    delta_b = s - bid
    delta_a = ask - s
    prob_buy = min(1, np.exp(-kappa * delta_a / s) * dt * 100)
    prob_sell = min(1, np.exp(-kappa * delta_b / s) * dt * 100)

    inventory[t] = inventory[t-1]
    cash[t] = cash[t-1]

    # Someone hits our ask (we sell)
    if np.random.rand() < prob_buy:
        cash[t] += ask * lot_size
        inventory[t] -= 1

    # Someone hits our bid (we buy)
    if np.random.rand() < prob_sell:
        cash[t] -= bid * lot_size
        inventory[t] += 1

    pnl[t] = cash[t] + inventory[t] * mid_prices[t] * lot_size

# Performance analysis
final_pnl = pnl[-1]
max_inventory = np.max(np.abs(inventory))
n_trades = np.sum(np.abs(np.diff(inventory)))
avg_spread = np.mean(ask_prices[1:] - bid_prices[1:])

print("=== Avellaneda-Stoikov Market Maker: Nifty Futures ===")
print(f"{'Metric':<25} {'Value':<15}")
print(f"{'Final P&L':<25} INR {final_pnl:>12,.0f}")
print(f"{'Total trades':<25} {n_trades:>12.0f}")
print(f"{'P&L per trade':<25} INR {final_pnl/max(n_trades,1):>12,.0f}")
print(f"{'Max inventory':<25} {max_inventory:>12.0f} lots")
print(f"{'Final inventory':<25} {inventory[-1]:>12.0f} lots")
print(f"{'Avg quoted spread':<25} {avg_spread:>12.1f} pts")
print(f"{'Avg spread (bps)':<25} {avg_spread/np.mean(mid_prices)*10000:>12.1f} bps")

# NSE cost analysis
stt = n_trades * 0.0125/100 * lot_size * np.mean(mid_prices)
brokerage = n_trades * 20
exchange_fee = n_trades * lot_size * np.mean(mid_prices) * 0.0019/100
total_costs = stt + brokerage + exchange_fee

print(f"\\n=== NSE Transaction Costs ===")
print(f"STT:              INR {stt:,.0f}")
print(f"Brokerage:        INR {brokerage:,.0f}")
print(f"Exchange fees:    INR {exchange_fee:,.0f}")
print(f"Total costs:      INR {total_costs:,.0f}")
print(f"Net P&L:          INR {final_pnl - total_costs:,.0f}")

# Inventory risk metrics
print(f"\\n=== Inventory Risk Metrics ===")
print(f"Avg inventory:    {np.mean(np.abs(inventory)):.1f} lots")
print(f"Inventory std:    {np.std(inventory):.1f} lots")
print(f"Max drawdown:     INR {np.min(pnl - np.maximum.accumulate(pnl)):,.0f}")
print(f"Sharpe (per step): {np.mean(np.diff(pnl))/np.std(np.diff(pnl)):.3f}")`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"NSE Market Making Framework"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Aspect"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"NSE Specification"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Tick size (Nifty futures)"}),e.jsx("td",{className:"px-5 py-2",children:"0.05 points"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Order types"}),e.jsx("td",{className:"px-5 py-2",children:"Limit, market, stop-loss, IOC, day"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"DMM obligations"}),e.jsx("td",{className:"px-5 py-2",children:"Minimum 75% presence, max spread obligations"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"DMM incentives"}),e.jsx("td",{className:"px-5 py-2",children:"Reduced transaction charges, margin relaxation"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-5 py-2",children:"SEBI regulation"}),e.jsx("td",{className:"px-5 py-2",children:"Circular SEBI/HO/MRD/2017 on market making"})]})]})]})}),e.jsx(T,{title:"Optimal Quote Calculation",difficulty:"intermediate",problem:e.jsxs(e.Fragment,{children:["A market maker for Nifty futures has: mid price ",e.jsx(t.InlineMath,{math:"S = 22{,}000"}),", inventory ",e.jsx(t.InlineMath,{math:"q = 3"})," lots (long), risk aversion ",e.jsx(t.InlineMath,{math:"\\gamma = 0.1"}),", volatility ",e.jsx(t.InlineMath,{math:"\\sigma = 1.2\\%"}),", order arrival ",e.jsx(t.InlineMath,{math:"\\kappa = 1.5"}),", and time remaining ",e.jsx(t.InlineMath,{math:"\\tau = 0.5"}),". Compute optimal bid and ask."]}),solution:[{step:"Compute reservation price",formula:"r = 22000 - 3 \\times 0.1 \\times (0.012 \\times 22000)^2 \\times 0.5 = 22000 - 10.45 = 21989.55",explanation:"Long 3 lots pushes reservation price below mid to encourage selling."},{step:"Compute optimal spread",formula:"\\delta^* = 0.1 \\times (0.012 \\times 22000)^2 \\times 0.5 + \\frac{2}{0.1}\\ln(1 + 0.1/1.5) = 3.48 + 1.29 = 4.78",explanation:"Spread has inventory risk and adverse selection components."},{step:"Compute bid and ask",formula:"\\text{Bid} = 21989.55 - 2.39 = 21987.16, \\quad \\text{Ask} = 21989.55 + 2.39 = 21991.94",explanation:"Quotes are placed symmetrically around the reservation price (not the mid price)."}]}),e.jsx(N,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Market making on the NSE requires balancing spread income against inventory risk. The Avellaneda-Stoikov model provides the theoretical foundation: skew quotes away from inventory and widen spreads in volatile markets. SEBI's designated market maker (DMM) framework offers incentives but imposes presence and spread obligations. Successful market making requires fast execution, accurate volatility estimation, and robust inventory management."})})]})}const fe=Object.freeze(Object.defineProperty({__proto__:null,default:$},Symbol.toStringTag,{value:"Module"}));function G(){const[a,v]=b.useState(50),[r,j]=b.useState(.7),m=()=>{const n=[];let p=22e3;for(let x=0;x<300;x++){const d=Math.random()<.15,i=Math.random()<.5?1:-1,l=Math.floor(d?Math.random()*50+30:Math.random()*20+5);p+=i*(Math.random()*5+.5),n.push({price:p,volume:l,direction:i,informed:d})}return n},[y]=b.useState(m),f=Math.floor(y.length/a),o=[];for(let n=0;n<f;n++){const p=y.slice(n*a,(n+1)*a),x=p.filter(g=>g.direction>0).reduce((g,h)=>g+h.volume,0),d=p.filter(g=>g.direction<0).reduce((g,h)=>g+h.volume,0),i=x+d,l=Math.abs(x-d)/(i||1);o.push(l)}const s=500,c=150;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: VPIN (Volume-Synchronized Probability of Informed Trading)"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust bucket size and alert threshold to monitor order flow toxicity on NSE."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Volume Bucket Size: ",a," trades"]}),e.jsx("input",{type:"range",min:"20",max:"100",step:"5",value:a,onChange:n=>v(parseInt(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["VPIN Alert Threshold: ",r.toFixed(2)]}),e.jsx("input",{type:"range",min:"0.4",max:"0.9",step:"0.05",value:r,onChange:n=>j(parseFloat(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:`0 0 ${s} ${c}`,className:"w-full max-w-2xl mx-auto block",children:[e.jsx("line",{x1:"0",y1:c*(1-r),x2:s,y2:c*(1-r),stroke:"#ef4444",strokeWidth:"1",strokeDasharray:"4"}),o.map((n,p)=>{const x=p/(o.length-1)*s,d=s/o.length*.8,i=n*c,l=n>r?"#ef4444":"#6366f1";return e.jsx("rect",{x:x-d/2,y:c-i,width:d,height:i,fill:l,opacity:"0.7",rx:"1"},p)}),e.jsx("text",{x:s-5,y:c*(1-r)-3,textAnchor:"end",className:"text-[9px]",fill:"#ef4444",children:"Threshold"})]}),e.jsxs("div",{className:"mt-3 grid grid-cols-3 gap-4 text-center",children:[e.jsxs("div",{className:"rounded-lg bg-gray-50 p-2 dark:bg-gray-800",children:[e.jsx("p",{className:"text-xs text-gray-500",children:"Avg VPIN"}),e.jsx("p",{className:"text-lg font-bold text-gray-800 dark:text-gray-200",children:(o.reduce((n,p)=>n+p,0)/o.length).toFixed(3)})]}),e.jsxs("div",{className:"rounded-lg bg-gray-50 p-2 dark:bg-gray-800",children:[e.jsx("p",{className:"text-xs text-gray-500",children:"Max VPIN"}),e.jsx("p",{className:"text-lg font-bold text-red-500",children:Math.max(...o).toFixed(3)})]}),e.jsxs("div",{className:"rounded-lg bg-gray-50 p-2 dark:bg-gray-800",children:[e.jsx("p",{className:"text-xs text-gray-500",children:"Alerts"}),e.jsx("p",{className:"text-lg font-bold text-amber-600",children:o.filter(n=>n>r).length})]})]})]})}function X(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Order Flow Imbalance on NSE and VPIN"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Order flow analysis reveals the hidden dynamics of market microstructure -- who is buying, who is selling, and whether informed traders are active. On the NSE, analyzing order flow imbalance in Nifty futures, Bank Nifty options, and liquid single-stock futures provides critical signals for market makers and short-term traders. VPIN (Volume-Synchronized Probability of Informed Trading) is a key metric that quantifies order flow toxicity."}),e.jsx(S,{title:"Order Flow Imbalance (OFI)",label:"Definition 5.8",definition:"Order flow imbalance measures the net directional pressure in the order book. It is computed as the difference between buy-initiated and sell-initiated volume, normalized by total volume. High OFI indicates one-sided trading pressure, often driven by informed participants.",notation:e.jsxs(e.Fragment,{children:["OFI at time ",e.jsx(t.InlineMath,{math:"t"}),": ",e.jsx(t.InlineMath,{math:"\\text{OFI}_t = \\frac{V_t^{buy} - V_t^{sell}}{V_t^{buy} + V_t^{sell}}"})," where ",e.jsx(t.InlineMath,{math:"V_t^{buy}"})," and ",e.jsx(t.InlineMath,{math:"V_t^{sell}"})," are buy- and sell-initiated volumes."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Trade Classification: The Lee-Ready Algorithm"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"To compute OFI, we must classify each trade as buyer- or seller-initiated. The Lee-Ready (1991) algorithm is the standard approach:"}),e.jsx(t.BlockMath,{math:"\\text{Direction}_t = \\begin{cases} +1 \\text{ (buy)} & \\text{if } P_t > M_t \\text{ (above midpoint)} \\\\ -1 \\text{ (sell)} & \\text{if } P_t < M_t \\text{ (below midpoint)} \\\\ \\text{sign}(P_t - P_{t-1}) & \\text{if } P_t = M_t \\text{ (tick test)} \\end{cases}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"M_t = (P_t^{bid} + P_t^{ask})/2"})," is the midpoint. For NSE tick data, we typically use the best bid and ask from the order book snapshot at the time of trade execution."]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"VPIN: Volume-Synchronized Probability of Informed Trading"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"VPIN, developed by Easley, Lopez de Prado, and O'Hara (2012), is a flow toxicity metric that operates in volume time rather than clock time. This is crucial because informed traders cluster their activity in volume bursts."}),e.jsx(t.BlockMath,{math:"\\text{VPIN} = \\frac{\\sum_{\\tau=1}^{n} |V_\\tau^{buy} - V_\\tau^{sell}|}{n \\cdot V_{bucket}}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"V_{bucket}"})," is the volume per bucket, ",e.jsx(t.InlineMath,{math:"n"})," is the number of buckets in the rolling window, and trade classification uses the bulk volume classification (BVC) method:"]}),e.jsx(t.BlockMath,{math:"V_\\tau^{buy} = V_\\tau \\cdot \\Phi\\left(\\frac{\\Delta P_\\tau}{\\sigma_{\\Delta P}}\\right)"}),e.jsx(I,{title:"VPIN as a Leading Indicator",label:"Theorem 5.8",statement:e.jsxs(e.Fragment,{children:["VPIN is a leading indicator of price volatility and market stress. Easley et al. showed that VPIN reached extreme levels before major market events, including the Flash Crash of May 6, 2010. Theoretically, when ",e.jsx(t.InlineMath,{math:"\\text{VPIN} \\to 1"}),", all volume is informed (toxic), indicating maximum adverse selection risk for market makers. When ",e.jsx(t.InlineMath,{math:"\\text{VPIN} \\to 0"}),", trading is balanced between buyers and sellers (non-toxic). A VPIN above the 95th percentile of its historical distribution signals elevated risk."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Kyle's Lambda: Price Impact"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Kyle's lambda measures the permanent price impact of order flow, reflecting the information content of trades:"}),e.jsx(t.BlockMath,{math:"\\Delta P_t = \\lambda \\cdot \\text{OFI}_t + \\epsilon_t"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["A higher ",e.jsx(t.InlineMath,{math:"\\lambda"})," indicates more informed trading activity, making it costlier for market makers. On the NSE, ",e.jsx(t.InlineMath,{math:"\\lambda"})," tends to spike around quarterly results announcements, RBI policy meetings, and SEBI regulatory changes."]}),e.jsx(G,{}),e.jsx(M,{title:"order_flow_nse.py",runnable:!0,code:`import numpy as np
from scipy.stats import norm

# Order Flow Analysis for NSE Nifty Futures
np.random.seed(42)
n_trades = 5000

# Simulate tick-by-tick trade data
prices = np.zeros(n_trades)
volumes = np.zeros(n_trades)
bid_prices = np.zeros(n_trades)
ask_prices = np.zeros(n_trades)

prices[0] = 22000
spread = 0.5  # Nifty futures tick spread

for t in range(1, n_trades):
    # Informed trading probability varies
    informed_prob = 0.10 + 0.15 * np.sin(2 * np.pi * t / 1000)  # Time-varying
    is_informed = np.random.rand() < informed_prob

    if is_informed:
        direction = 1 if np.random.rand() < 0.6 else -1  # Slight buy bias
        volume = np.random.randint(50, 200)  # Larger orders
    else:
        direction = 1 if np.random.rand() < 0.5 else -1
        volume = np.random.randint(5, 50)

    impact = direction * volume * 0.001  # Price impact
    prices[t] = prices[t-1] + impact + np.random.randn() * 0.5
    volumes[t] = volume
    bid_prices[t] = prices[t] - spread / 2
    ask_prices[t] = prices[t] + spread / 2

# Lee-Ready Trade Classification
midpoints = (bid_prices + ask_prices) / 2
directions = np.zeros(n_trades)

for t in range(1, n_trades):
    if prices[t] > midpoints[t]:
        directions[t] = 1   # Buy
    elif prices[t] < midpoints[t]:
        directions[t] = -1  # Sell
    else:
        directions[t] = np.sign(prices[t] - prices[t-1])  # Tick test

# VPIN Calculation
bucket_volume = 500  # Volume per bucket
n_buckets = 50       # Rolling window

# Fill volume buckets
buckets = []
current_buy = 0
current_sell = 0
current_vol = 0

for t in range(n_trades):
    vol = volumes[t]
    if directions[t] > 0:
        current_buy += vol
    else:
        current_sell += vol
    current_vol += vol

    if current_vol >= bucket_volume:
        buckets.append({
            'buy_vol': current_buy,
            'sell_vol': current_sell,
            'imbalance': abs(current_buy - current_sell),
            'total_vol': current_vol
        })
        current_buy = 0
        current_sell = 0
        current_vol = 0

# Compute rolling VPIN
vpin_values = []
for i in range(n_buckets, len(buckets)):
    window = buckets[i-n_buckets:i]
    vpin = sum(b['imbalance'] for b in window) / sum(b['total_vol'] for b in window)
    vpin_values.append(vpin)

vpin = np.array(vpin_values)

print("=== VPIN Analysis: Nifty 50 Futures ===")
print(f"Total trades analyzed:    {n_trades}")
print(f"Volume buckets created:   {len(buckets)}")
print(f"VPIN observations:        {len(vpin)}")
print(f"\\nVPIN Statistics:")
print(f"  Mean:     {np.mean(vpin):.4f}")
print(f"  Median:   {np.median(vpin):.4f}")
print(f"  Std:      {np.std(vpin):.4f}")
print(f"  P95:      {np.percentile(vpin, 95):.4f}")
print(f"  P99:      {np.percentile(vpin, 99):.4f}")
print(f"  Max:      {np.max(vpin):.4f}")

# Kyle's Lambda estimation
window = 100
ofi = np.zeros(n_trades - window)
price_changes = np.zeros(n_trades - window)

for t in range(window, n_trades):
    w_trades = directions[t-window:t] * volumes[t-window:t]
    ofi[t-window] = np.sum(w_trades)
    price_changes[t-window] = prices[t] - prices[t-window]

from scipy import stats
slope, intercept, r_value, p_value, std_err = stats.linregress(ofi, price_changes)

print(f"\\n=== Kyle's Lambda (Price Impact) ===")
print(f"Lambda:   {slope:.6f} INR per unit OFI")
print(f"R-squared: {r_value**2:.4f}")
print(f"p-value:   {p_value:.6f}")

# Order Flow Imbalance by time of day (simulated)
print(f"\\n=== OFI by Session (NSE Trading Hours) ===")
session_names = ['Opening (9:15-10:00)', 'Morning (10:00-12:00)',
                 'Afternoon (12:00-14:00)', 'Closing (14:00-15:30)']
session_ofi = [0.15, 0.08, 0.05, 0.12]  # Typical OFI magnitudes
for name, ofi_val in zip(session_names, session_ofi):
    print(f"  {name:<25} Avg |OFI|: {ofi_val:.2f}")

print(f"\\nNote: Opening and closing sessions show highest OFI")
print(f"due to overnight information and closing auction dynamics.")`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Order Flow Signals on NSE"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Signal"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Interpretation"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Action"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"High VPIN + Rising price"}),e.jsx("td",{className:"px-5 py-2",children:"Strong informed buying"}),e.jsx("td",{className:"px-5 py-2",children:"Widen ask, follow momentum"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"High VPIN + Falling price"}),e.jsx("td",{className:"px-5 py-2",children:"Informed selling / liquidation"}),e.jsx("td",{className:"px-5 py-2",children:"Widen bid, reduce long exposure"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Low VPIN"}),e.jsx("td",{className:"px-5 py-2",children:"Balanced, uninformed flow"}),e.jsx("td",{className:"px-5 py-2",children:"Tighten spreads, collect spread income"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-5 py-2",children:"VPIN spike before event"}),e.jsx("td",{className:"px-5 py-2",children:"Information leakage"}),e.jsx("td",{className:"px-5 py-2",children:"Pull quotes, reduce exposure"})]})]})]})}),e.jsx(T,{title:"VPIN Calculation",difficulty:"intermediate",problem:"In 5 volume buckets of 1000 contracts each, the buy/sell classifications are: (600,400), (700,300), (450,550), (800,200), (500,500). Calculate VPIN.",solution:[{step:"Compute absolute imbalance per bucket",formula:"|V^B - V^S| = |200|, |400|, |100|, |600|, |0| = 200, 400, 100, 600, 0"},{step:"Sum imbalances",formula:"\\sum |V^B_\\tau - V^S_\\tau| = 200 + 400 + 100 + 600 + 0 = 1300"},{step:"Compute VPIN",formula:"\\text{VPIN} = \\frac{1300}{5 \\times 1000} = 0.26",explanation:"VPIN of 0.26 indicates moderate flow toxicity. If P95 threshold is 0.40, this is within normal range."}]}),e.jsx(N,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Order flow analysis is essential for market makers and short-term traders on the NSE. VPIN quantifies the probability of informed trading in volume time, serving as an early warning system for market stress. Kyle's lambda measures price impact and helps set appropriate bid-ask spreads. On the NSE, order flow toxicity tends to spike during quarterly earnings, RBI announcements, and FII rebalancing days."})})]})}const ye=Object.freeze(Object.defineProperty({__proto__:null,default:X},Symbol.toStringTag,{value:"Module"}));function Q(){const[a,v]=b.useState(50),[r,j]=b.useState(.05),[m,y]=b.useState(500),f=.3,o=Math.min(f,a*.002),s=Math.max(0,f-o),c=s*m*r*25,n=c*252,p=[{us:5,label:"Co-location",color:"#22c55e"},{us:50,label:"Same city",color:"#f59e0b"},{us:200,label:"Metro",color:"#ef4444"},{us:1e3,label:"Remote",color:"#7f1d1d"}],x=400;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Latency Impact on Market Making P&L"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"See how round-trip latency erodes market making edge on NSE Nifty futures."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Latency: ",a," microseconds"]}),e.jsx("input",{type:"range",min:"1",max:"500",step:"1",value:a,onChange:i=>v(parseInt(i.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Tick Size: ",r," pts"]}),e.jsx("input",{type:"range",min:"0.05",max:"0.5",step:"0.05",value:r,onChange:i=>j(parseFloat(i.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Trades/Day: ",m]}),e.jsx("input",{type:"range",min:"100",max:"2000",step:"50",value:m,onChange:i=>y(parseInt(i.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsx("svg",{viewBox:`0 0 ${x} 120`,className:"w-full max-w-lg mx-auto block",children:p.map((i,l)=>{const g=Math.max(0,f-i.us*.002),h=g/f*(x-100),_=10+l*28;return e.jsxs("g",{children:[e.jsx("text",{x:"0",y:_+12,className:"text-[9px]",fill:"#6b7280",children:i.label}),e.jsx("rect",{x:"70",y:_,width:h,height:"18",rx:"3",fill:i.color,opacity:"0.7"}),e.jsxs("text",{x:75+h,y:_+12,className:"text-[9px]",fill:"#374151",children:[(g*100).toFixed(0),"% edge | INR ",(g*m*r*25*252/1e5).toFixed(1),"L/yr"]})]},l)})}),e.jsxs("div",{className:"mt-4 grid grid-cols-3 gap-4 text-center",children:[e.jsxs("div",{className:"rounded-lg bg-gray-50 p-2 dark:bg-gray-800",children:[e.jsx("p",{className:"text-xs text-gray-500",children:"Net Edge"}),e.jsxs("p",{className:`text-lg font-bold ${s>.1?"text-green-600":"text-red-500"}`,children:[(s*100).toFixed(1),"%"]})]}),e.jsxs("div",{className:"rounded-lg bg-gray-50 p-2 dark:bg-gray-800",children:[e.jsx("p",{className:"text-xs text-gray-500",children:"Daily P&L"}),e.jsxs("p",{className:"text-lg font-bold text-gray-800 dark:text-gray-200",children:["INR ",c.toFixed(0)]})]}),e.jsxs("div",{className:"rounded-lg bg-gray-50 p-2 dark:bg-gray-800",children:[e.jsx("p",{className:"text-xs text-gray-500",children:"Annual P&L"}),e.jsxs("p",{className:"text-lg font-bold text-gray-800 dark:text-gray-200",children:["INR ",(n/1e5).toFixed(1),"L"]})]})]})]})}function J(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"NSE Co-Location and SEBI Fair Access Norms"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"In high-frequency market making, latency is the ultimate competitive advantage. On the NSE, the co-location (colo) facility at the exchange's data center in Mumbai provides the lowest possible latency for order placement and market data receipt. However, SEBI's fair access norms ensure that all co-location participants receive equal treatment, preventing any single firm from gaining unfair speed advantages."}),e.jsx(S,{title:"Co-Location (Colo)",label:"Definition 5.9",definition:"Co-location is the practice of placing trading servers in the same data center as the exchange's matching engine. This minimizes the physical distance and network hops between the trader's system and the exchange, reducing round-trip latency to microseconds. NSE's co-location facility is located at its primary data center in Mumbai.",notation:e.jsxs(e.Fragment,{children:["Round-trip latency: ",e.jsx(t.InlineMath,{math:"\\tau_{RT} = \\tau_{network} + \\tau_{processing} + \\tau_{matching}"}),". In co-location, ",e.jsx(t.InlineMath,{math:"\\tau_{network} \\approx 5-10\\,\\mu s"}),"."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"NSE Technology Infrastructure"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"NSE operates one of the world's most advanced exchange platforms. Key specifications:"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Parameter"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Specification"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Matching engine"}),e.jsx("td",{className:"px-5 py-2",children:"INET-based, price-time priority"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Order processing capacity"}),e.jsx("td",{className:"px-5 py-2",children:"~100,000 orders per second"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Median latency (colo)"}),e.jsx("td",{className:"px-5 py-2",children:"~40-60 microseconds"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Market data protocol"}),e.jsx("td",{className:"px-5 py-2",children:"TCP (order entry), UDP multicast (market data)"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Co-location racks"}),e.jsx("td",{className:"px-5 py-2",children:"Full rack / half rack / quarter rack"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-5 py-2",children:"Equal-length cables"}),e.jsx("td",{className:"px-5 py-2",children:"SEBI mandated for fair access"})]})]})]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"SEBI Fair Access Framework"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Following the 2015 NSE co-location controversy, SEBI issued comprehensive guidelines to ensure fair and transparent access to exchange infrastructure:"}),e.jsx(t.BlockMath,{math:"\\text{Fair Access Principle: } \\tau_i \\approx \\tau_j \\quad \\forall \\text{ colo participants } i, j"}),e.jsx(N,{title:"SEBI Co-location Guidelines",type:"warning",children:e.jsx("p",{children:"Key SEBI requirements include: (1) Equal-length network cables from matching engine to all racks, (2) UDP multicast for market data (replaces TCP-based tick-by-tick feed that gave first-mover advantage), (3) Regular audits of infrastructure fairness, (4) Prohibition on preferential access or dark fiber connections, (5) Mandatory disclosure of all co-location arrangements, and (6) Order-to-trade ratio limits to prevent excessive messaging."})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Latency Components"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The total round-trip time for a market making system on NSE can be decomposed:"}),e.jsx(t.BlockMath,{math:"\\tau_{total} = \\underbrace{\\tau_{feed}}_{\\text{market data}} + \\underbrace{\\tau_{decode}}_{\\text{parsing}} + \\underbrace{\\tau_{strategy}}_{\\text{logic}} + \\underbrace{\\tau_{encode}}_{\\text{order build}} + \\underbrace{\\tau_{wire}}_{\\text{network}} + \\underbrace{\\tau_{match}}_{\\text{exchange}}"}),e.jsx(I,{title:"Latency-Edge Relationship",label:"Theorem 5.9",statement:e.jsxs(e.Fragment,{children:["For a market maker competing in a zero-sum speed game, the expected profit per trade decays with latency. If the fastest competitor has latency ",e.jsx(t.InlineMath,{math:"\\tau_1"})," and our latency is ",e.jsx(t.InlineMath,{math:"\\tau"}),", the probability of being adversely selected (filled on stale quotes) increases approximately as: ",e.jsx(t.BlockMath,{math:"P(\\text{adverse selection}) \\propto 1 - e^{-\\lambda(\\tau - \\tau_1)}"})," where ",e.jsx(t.InlineMath,{math:"\\lambda"})," is the rate of price-moving events. This implies that every microsecond of additional latency costs a quantifiable amount of expected P&L."]})}),e.jsx(Q,{}),e.jsx(M,{title:"latency_analysis_nse.py",runnable:!0,code:`import numpy as np

# Latency Impact Analysis for NSE Market Making
np.random.seed(42)

# NSE Co-location Latency Model
class LatencyModel:
    def __init__(self, colo_latency_us=50, remote_latency_us=500):
        self.colo_latency = colo_latency_us  # microseconds
        self.remote_latency = remote_latency_us

    def simulate_race(self, n_events=10000):
        """Simulate speed races between colo and remote trader."""
        # Price-moving events arrive as Poisson process
        event_rate = 100  # events per second

        colo_wins = 0
        remote_wins = 0
        ties = 0

        for _ in range(n_events):
            # Both see the event; who reacts first?
            colo_reaction = self.colo_latency + np.random.exponential(10)
            remote_reaction = self.remote_latency + np.random.exponential(20)

            if colo_reaction < remote_reaction:
                colo_wins += 1
            elif remote_reaction < colo_reaction:
                remote_wins += 1
            else:
                ties += 1

        return {
            'colo_win_rate': colo_wins / n_events,
            'remote_win_rate': remote_wins / n_events,
            'total_events': n_events
        }

# Run simulation
model = LatencyModel()
results = model.simulate_race()

print("=== NSE Co-location Speed Analysis ===")
print(f"Co-location win rate:  {results['colo_win_rate']*100:.1f}%")
print(f"Remote win rate:       {results['remote_win_rate']*100:.1f}%")
print(f"Events simulated:      {results['total_events']}")

# Latency breakdown for a typical NSE market making system
print(f"\\n=== Latency Budget (Microseconds) ===")
components = {
    'Market data decode': 5,
    'Strategy logic': 3,
    'Risk checks': 2,
    'Order encode': 2,
    'Network (colo)': 8,
    'Exchange matching': 25,
}
total = sum(components.values())
print(f"{'Component':<25} {'Latency (us)':<15} {'% of Total':<12}")
for comp, lat in components.items():
    print(f"{comp:<25} {lat:<15} {lat/total*100:<12.1f}%")
print(f"{'TOTAL':<25} {total:<15}")

# P&L impact of latency
print(f"\\n=== Annual P&L Impact of Latency ===")
latencies = [5, 10, 50, 100, 500, 1000]
base_edge_per_trade = 0.3  # ticks
tick_value = 0.05 * 25     # Nifty tick * lot size = INR 1.25
trades_per_day = 500
trading_days = 252

for lat in latencies:
    edge_decay = min(base_edge_per_trade, lat * 0.002)
    net_edge = max(0, base_edge_per_trade - edge_decay)
    daily_pnl = net_edge * trades_per_day * tick_value
    annual_pnl = daily_pnl * trading_days

    label = 'Colo' if lat <= 10 else ('City' if lat <= 100 else 'Remote')
    print(f"{lat:>6} us ({label:<6}): Edge = {net_edge:.2f} ticks, "
          f"Annual P&L = INR {annual_pnl:>10,.0f} "
          f"({annual_pnl/100000:.1f} lakhs)")

# SEBI Order-to-Trade (OTR) Ratio Analysis
print(f"\\n=== SEBI Order-to-Trade Ratio Limits ===")
orders_per_day = 50000
fills_per_day = 500
otr = orders_per_day / fills_per_day

print(f"Orders submitted:    {orders_per_day:,}")
print(f"Trades executed:     {fills_per_day:,}")
print(f"OTR ratio:           {otr:.0f}:1")
print(f"SEBI limit:          500:1")
print(f"Status:              {'OK' if otr < 500 else 'EXCEEDED - penalty applicable'}")

# NSE co-location costs
print(f"\\n=== NSE Co-location Cost Structure ===")
costs = {
    'Full rack (monthly)': 250000,
    'Cross-connect (monthly)': 50000,
    'Market data feed (monthly)': 100000,
    'Bandwidth 1Gbps (monthly)': 75000,
    'Power per kW (monthly)': 15000,
}
monthly_total = sum(costs.values())
for item, cost in costs.items():
    print(f"  {item:<30} INR {cost:>10,}")
print(f"  {'TOTAL MONTHLY':<30} INR {monthly_total:>10,}")
print(f"  {'TOTAL ANNUAL':<30} INR {monthly_total*12:>10,}")`}),e.jsx(T,{title:"Latency Arbitrage Calculation",difficulty:"advanced",problem:e.jsx(e.Fragment,{children:"A co-located market maker on NSE has 50us round-trip latency. A price-moving event occurs (e.g., large Nifty futures trade). The fair price moves from 22,000.00 to 22,000.50. A remote trader at 500us latency has a stale sell order at 22,000.25. What is the latency arbitrage profit?"}),solution:[{step:"Identify the opportunity window",formula:"\\Delta\\tau = 500 - 50 = 450\\,\\mu s",explanation:"The colo trader has a 450 microsecond window to act before the remote trader can update their quote."},{step:"Calculate adverse selection profit",formula:"\\text{Profit} = 22000.50 - 22000.25 = 0.25 \\text{ points}",explanation:"The colo trader can buy the stale offer at 22,000.25 knowing fair value is 22,000.50."},{step:"Compute profit per lot",formula:"\\text{P\\&L} = 0.25 \\times 25 = \\text{INR } 6.25 \\text{ per lot}",explanation:"With Nifty lot size of 25 units, profit is INR 6.25 per occurrence. Over hundreds of events daily, this compounds significantly."}]}),e.jsx(N,{title:"The NSE Co-location Case",type:"historical",children:e.jsx("p",{children:"In 2015, whistleblower allegations revealed that certain brokers received preferential access to NSE's co-location facility through a TCP-based market data feed (TBT) that delivered data sequentially rather than simultaneously. SEBI investigated and found that the system allowed the first connected server to receive data before others. This led to significant regulatory reforms: SEBI mandated UDP multicast for market data (simultaneous delivery), equal-length cables, and regular infrastructure audits. The case highlighted the importance of fair access in electronic markets and led to penalties on NSE officials."})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Technology Stack for NSE HFT"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Layer"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Technology"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Latency"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Network"}),e.jsx("td",{className:"px-5 py-2",children:"Kernel bypass (DPDK, Solarflare)"}),e.jsx("td",{className:"px-5 py-2",children:"<1 us"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Language"}),e.jsx("td",{className:"px-5 py-2",children:"C++ (lock-free), FPGA for ultra-low"}),e.jsx("td",{className:"px-5 py-2",children:"1-5 us"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Market data"}),e.jsx("td",{className:"px-5 py-2",children:"UDP multicast, hardware timestamping"}),e.jsx("td",{className:"px-5 py-2",children:"2-5 us"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-5 py-2",children:"Order gateway"}),e.jsx("td",{className:"px-5 py-2",children:"FIX protocol, binary protocol"}),e.jsx("td",{className:"px-5 py-2",children:"5-10 us"})]})]})]})}),e.jsx(N,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Latency is a critical factor for market making on the NSE. Co-location provides round-trip times of 40-60 microseconds, while remote connections suffer 500+ microsecond delays. SEBI's fair access norms ensure equal treatment within co-location but cannot eliminate the fundamental speed advantage of proximity. For market makers, every microsecond of latency reduction translates directly to better adverse selection management and higher expected P&L. The technology stack must optimize at every layer: network (kernel bypass), application (C++/FPGA), and protocol (binary encoding)."})})]})}const be=Object.freeze(Object.defineProperty({__proto__:null,default:J},Symbol.toStringTag,{value:"Module"}));function Y(){const[a,v]=b.useState(5),[r,j]=b.useState(30),y=[{name:"TCS",surprise:8.2,drift:[0,.5,1.2,2.1,3,3.5,4.2]},{name:"Infosys",surprise:-6.5,drift:[0,-.3,-1,-1.8,-2.5,-3,-3.2]},{name:"HDFC Bank",surprise:3.1,drift:[0,.2,.5,.8,1,1.2,1.5]},{name:"Reliance",surprise:-2,drift:[0,-.1,-.3,-.5,-.6,-.7,-.8]},{name:"ITC",surprise:12.5,drift:[0,.8,1.8,3.2,4.5,5.2,6]},{name:"SBI",surprise:-9.3,drift:[0,-.5,-1.5,-2.8,-3.8,-4.5,-5]}].filter(s=>Math.abs(s.surprise)>=a),f=400,o=150;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Post-Earnings Announcement Drift (PEAD)"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust the earnings surprise threshold and see which NSE stocks exhibit PEAD."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Min |Surprise|: ",a,"%"]}),e.jsx("input",{type:"range",min:"1",max:"15",step:"1",value:a,onChange:s=>v(parseInt(s.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Holding Period: ",r," days"]}),e.jsx("input",{type:"range",min:"5",max:"60",step:"5",value:r,onChange:s=>j(parseInt(s.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:`0 0 ${f} ${o}`,className:"w-full max-w-lg mx-auto block",children:[e.jsx("line",{x1:"0",y1:o/2,x2:f,y2:o/2,stroke:"#e5e7eb",strokeWidth:"1"}),e.jsx("text",{x:"5",y:o/2-5,className:"text-[8px]",fill:"#6b7280",children:"0%"}),y.map((s,c)=>{const n=s.surprise>0?"#22c55e":"#ef4444",p=s.drift.map((x,d)=>{const i=d/(s.drift.length-1)*f,l=o/2-x/8*(o/2);return`${d===0?"M":"L"}${i},${l}`}).join(" ");return e.jsxs("g",{children:[e.jsx("path",{d:p,fill:"none",stroke:n,strokeWidth:"1.5",opacity:"0.7"}),e.jsx("text",{x:f-5,y:o/2-s.drift[6]/8*(o/2),textAnchor:"end",className:"text-[8px]",fill:n,children:s.name})]},c)})]}),e.jsxs("p",{className:"mt-2 text-center text-sm text-gray-600 dark:text-gray-400",children:[y.length," stocks with |surprise| ≥ ",a,"% showing post-earnings drift over 60 days"]})]})}function Z(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Post-Earnings Announcement Drift on Indian Quarterly Results"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Post-Earnings Announcement Drift (PEAD) is one of the most robust anomalies in financial markets. Stocks that report positive earnings surprises tend to drift upward for 30-60 days after the announcement, and vice versa. In the Indian market, where quarterly results are announced by all listed companies within 45 days of quarter-end per SEBI regulations, PEAD offers a systematic and well-documented alpha source."}),e.jsx(S,{title:"Post-Earnings Announcement Drift (PEAD)",label:"Definition 5.10",definition:"PEAD is the tendency for a stock's cumulative abnormal return to continue in the direction of the earnings surprise for 30-90 days following the earnings announcement. This anomaly contradicts the Efficient Market Hypothesis (semi-strong form) and is attributed to investor underreaction to earnings information.",notation:e.jsxs(e.Fragment,{children:["Standardized Unexpected Earnings: ",e.jsx(t.InlineMath,{math:"\\text{SUE}_i = \\frac{E_i - \\hat{E}_i}{\\sigma(E_i - \\hat{E}_i)}"})," where ",e.jsx(t.InlineMath,{math:"E_i"})," is actual EPS and ",e.jsx(t.InlineMath,{math:"\\hat{E}_i"})," is the consensus estimate."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Earnings Surprise Measurement"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The earnings surprise for an Indian company can be computed using several methods:"}),e.jsx(t.BlockMath,{math:"\\text{Surprise}_1 = \\frac{\\text{Actual EPS} - \\text{Consensus EPS}}{\\text{Consensus EPS}} \\times 100\\%"}),e.jsx(t.BlockMath,{math:"\\text{Surprise}_2 = \\frac{\\text{Actual PAT} - \\text{Estimated PAT}}{\\text{Market Cap}} \\times 100\\%"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For Indian stocks, analyst consensus is available from Bloomberg, Refinitiv, and domestic providers like Capitaline and Ace Equity. Revenue surprises, EBITDA margin surprises, and commentary-based surprises (guidance changes) also drive PEAD."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Indian Earnings Calendar"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Indian companies report quarterly results according to SEBI's Listing Obligations:"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Quarter"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Period"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Reporting Deadline"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Peak Season"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Q1"}),e.jsx("td",{className:"px-5 py-2",children:"Apr-Jun"}),e.jsx("td",{className:"px-5 py-2",children:"Aug 14"}),e.jsx("td",{className:"px-5 py-2",children:"Jul 15 - Aug 14"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Q2"}),e.jsx("td",{className:"px-5 py-2",children:"Jul-Sep"}),e.jsx("td",{className:"px-5 py-2",children:"Nov 14"}),e.jsx("td",{className:"px-5 py-2",children:"Oct 15 - Nov 14"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Q3"}),e.jsx("td",{className:"px-5 py-2",children:"Oct-Dec"}),e.jsx("td",{className:"px-5 py-2",children:"Feb 14"}),e.jsx("td",{className:"px-5 py-2",children:"Jan 15 - Feb 14"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-5 py-2",children:"Q4"}),e.jsx("td",{className:"px-5 py-2",children:"Jan-Mar"}),e.jsx("td",{className:"px-5 py-2",children:"May 30"}),e.jsx("td",{className:"px-5 py-2",children:"Apr 15 - May 30"})]})]})]})}),e.jsx(I,{title:"PEAD Under Gradual Information Diffusion",label:"Theorem 5.10",statement:e.jsxs(e.Fragment,{children:["Under the gradual information diffusion model (Hong and Stein, 1999), PEAD arises because information about earnings quality spreads slowly through the investor population. Early informed traders (institutions) partially incorporate the earnings surprise, but the full information takes 30-60 days to diffuse to retail investors and index funds. The drift magnitude is proportional to: ",e.jsx(t.BlockMath,{math:"\\text{CAR}_{[1,T]} = \\alpha + \\beta_1 \\cdot \\text{SUE} + \\beta_2 \\cdot \\text{SUE} \\times \\text{Analyst Coverage}^{-1} + \\epsilon"})," Stocks with lower analyst coverage exhibit stronger PEAD because information diffuses more slowly."]})}),e.jsx(Y,{}),e.jsx(M,{title:"pead_indian_stocks.py",runnable:!0,code:`import numpy as np
from scipy import stats

# PEAD Strategy on Indian Quarterly Results
np.random.seed(42)
n_quarters = 20   # 5 years of quarterly data
n_stocks = 50     # Universe of NSE stocks

# Simulate earnings surprises and post-announcement returns
# In practice, use actual data from BSE/NSE filings

# Generate realistic earnings surprises (% beat/miss)
surprises = np.random.randn(n_quarters, n_stocks) * 8  # Std dev ~8%

# PEAD effect: positive surprise -> positive drift
drift_coefficient = 0.04  # 4% of surprise translates to drift
noise = np.random.randn(n_quarters, n_stocks) * 5

# 60-day post-announcement CAR
car_60d = drift_coefficient * surprises + noise

# Sort into quintiles by surprise magnitude
print("=== PEAD Analysis: NSE Stock Universe ===\\n")
print(f"{'Quintile':<12} {'Avg Surprise':<16} {'Avg CAR(60d)':<16} {'t-stat':<10} {'Hit Rate':<10}")

for q in range(5):
    q_mask = np.zeros_like(surprises, dtype=bool)
    for t in range(n_quarters):
        pctiles = np.percentile(surprises[t], [20, 40, 60, 80])
        if q == 0:
            q_mask[t] = surprises[t] <= pctiles[0]
        elif q == 4:
            q_mask[t] = surprises[t] > pctiles[3]
        else:
            q_mask[t] = (surprises[t] > pctiles[q-1]) & (surprises[t] <= pctiles[q])

    avg_surprise = np.mean(surprises[q_mask])
    avg_car = np.mean(car_60d[q_mask])
    t_stat = avg_car / (np.std(car_60d[q_mask]) / np.sqrt(np.sum(q_mask)))
    hit_rate = np.mean(np.sign(car_60d[q_mask]) == np.sign(surprises[q_mask]))

    label = ['Big Miss', 'Miss', 'Meet', 'Beat', 'Big Beat'][q]
    print(f"{label:<12} {avg_surprise:>12.1f}%   {avg_car:>12.1f}%   {t_stat:>8.2f}   {hit_rate*100:>6.1f}%")

# Long-short strategy
long_mask = surprises > np.percentile(surprises, 80, axis=1, keepdims=True)
short_mask = surprises < np.percentile(surprises, 20, axis=1, keepdims=True)

ls_returns = []
for t in range(n_quarters):
    long_ret = np.mean(car_60d[t][long_mask[t]])
    short_ret = np.mean(car_60d[t][short_mask[t]])
    ls_returns.append(long_ret - short_ret)

ls_returns = np.array(ls_returns)

print(f"\\n=== PEAD Long-Short Strategy ===")
print(f"Mean quarterly return:  {np.mean(ls_returns):.2f}%")
print(f"Std quarterly return:   {np.std(ls_returns):.2f}%")
print(f"Sharpe (annualized):    {np.mean(ls_returns)/np.std(ls_returns)*2:.2f}")
print(f"Hit rate:               {np.mean(ls_returns > 0)*100:.0f}%")
print(f"Max return:             {np.max(ls_returns):.2f}%")
print(f"Min return:             {np.min(ls_returns):.2f}%")

# Sector-wise PEAD strength
sectors = ['IT', 'Banking', 'FMCG', 'Pharma', 'Auto',
           'Energy', 'Metals', 'Infra', 'Telecom', 'Chemicals']
print(f"\\n=== Sector-wise PEAD Strength ===")
for i, sector in enumerate(sectors[:5]):
    sector_stocks = range(i*10, (i+1)*10)
    sector_surprise = surprises[:, list(sector_stocks)]
    sector_car = car_60d[:, list(sector_stocks)]
    corr = np.corrcoef(sector_surprise.flatten(), sector_car.flatten())[0, 1]
    print(f"{sector:<12} Surprise-CAR correlation: {corr:.3f}")

# Event window analysis
print(f"\\n=== Event Window Returns (Result Day Anchored) ===")
windows = [(-5, -1), (0, 0), (1, 5), (1, 30), (1, 60)]
for start, end in windows:
    label = f"[{start:+d}, {end:+d}]"
    avg_ret = np.random.randn() * 2 + (end - start) * 0.05
    print(f"Window {label:<12}: Avg absolute return = {abs(avg_ret):.2f}%")

# Indian-specific considerations
print(f"\\n=== Indian Market Considerations ===")
print(f"- Results after market hours: Gap opening next day")
print(f"- Board meetings pre-announced: Options IV spikes pre-event")
print(f"- SEBI UPSI rules: No trading by insiders during quiet period")
print(f"- STT impact: Delivery trades (0.1%) vs Intraday (0.025%)")
print(f"- F&O availability: Only ~200 stocks have futures/options")`}),e.jsx(T,{title:"PEAD Trade on TCS Quarterly Results",difficulty:"intermediate",problem:"TCS reports Q3 results with EPS of INR 62 vs consensus of INR 58. Historical PEAD coefficient is 4% (i.e., 4% of surprise translates to 60-day drift). TCS is at INR 3,800. Calculate expected drift and position sizing for INR 20 lakh capital.",solution:[{step:"Compute earnings surprise",formula:"\\text{Surprise} = \\frac{62 - 58}{58} \\times 100 = 6.9\\%"},{step:"Estimate expected 60-day drift",formula:"\\text{Expected CAR} = 0.04 \\times 6.9\\% = 0.276\\%",explanation:"Based on historical PEAD coefficient of 4%."},{step:"Compute expected profit",formula:"\\text{Profit} = 20,00,000 \\times 0.276\\% = \\text{INR } 5,520",explanation:"This is the expected profit from the PEAD drift. In practice, combine with other signals (revenue surprise, guidance) for higher conviction."},{step:"Position using futures",formula:"\\text{Lots} = \\frac{20,00,000}{175 \\times 3,800} = 3 \\text{ lots}",explanation:"TCS futures lot size is 175 shares. Buy 3 lots and hold for 60 days."}]}),e.jsx(N,{title:"SEBI Insider Trading Regulations",type:"warning",children:e.jsxs("p",{children:["SEBI's Prohibition of Insider Trading (PIT) Regulations strictly prohibit trading based on Unpublished Price Sensitive Information (UPSI). Earnings data before public announcement is classified as UPSI. Designated persons of listed companies have a trading window closure period (typically from quarter-end until 48 hours after results are published). Quantitative PEAD strategies trade ",e.jsx("em",{children:"after"})," public announcement, which is fully compliant with SEBI regulations."]})}),e.jsx(N,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"PEAD is a well-documented anomaly in Indian equities driven by investor underreaction to earnings surprises. The strategy is simple: go long stocks with large positive surprises and short those with large negative surprises, holding for 30-60 days. Indian-specific considerations include the concentrated earnings season (45-day reporting window), after-hours announcement timing, and the subset of stocks with F&O availability for efficient execution."})})]})}const ke=Object.freeze(Object.defineProperty({__proto__:null,default:Z},Symbol.toStringTag,{value:"Module"}));function ee(){const[a,v]=b.useState(5),[r,j]=b.useState(.3),m=[{day:1,headline:"RBI holds repo rate steady at 6.5%",sentiment:.1,stock:"Bank Nifty"},{day:3,headline:"TCS wins $2B deal with US bank",sentiment:.8,stock:"TCS"},{day:5,headline:"SEBI tightens F&O margin rules",sentiment:-.6,stock:"Nifty"},{day:8,headline:"Reliance announces JioFinance launch",sentiment:.7,stock:"Reliance"},{day:10,headline:"Adani Group faces credit downgrade",sentiment:-.9,stock:"Adani Ent"},{day:12,headline:"India GDP growth at 7.8% beats estimates",sentiment:.6,stock:"Nifty"},{day:15,headline:"Infosys CFO resigns unexpectedly",sentiment:-.7,stock:"Infosys"},{day:18,headline:"Crude oil falls below $70/barrel",sentiment:.4,stock:"ONGC"}],y=m.filter(s=>Math.abs(s.sentiment)>=r),f=500,o=150;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: News Sentiment Trading Signals"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust sentiment threshold to filter actionable news events for Indian stocks."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Sentiment Threshold: ",r.toFixed(1)]}),e.jsx("input",{type:"range",min:"0.1",max:"0.8",step:"0.1",value:r,onChange:s=>j(parseFloat(s.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Holding Window: ",a," days"]}),e.jsx("input",{type:"range",min:"1",max:"20",step:"1",value:a,onChange:s=>v(parseInt(s.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:`0 0 ${f} ${o}`,className:"w-full max-w-2xl mx-auto block",children:[e.jsx("line",{x1:"0",y1:o/2,x2:f,y2:o/2,stroke:"#e5e7eb",strokeWidth:"1"}),e.jsx("line",{x1:"0",y1:o/2-r*(o/2),x2:f,y2:o/2-r*(o/2),stroke:"#22c55e",strokeWidth:"0.5",strokeDasharray:"3"}),e.jsx("line",{x1:"0",y1:o/2+r*(o/2),x2:f,y2:o/2+r*(o/2),stroke:"#ef4444",strokeWidth:"0.5",strokeDasharray:"3"}),m.map((s,c)=>{const n=s.day/20*f,p=o/2-s.sentiment*(o/2),x=Math.abs(s.sentiment)>=r;return e.jsxs("g",{children:[e.jsx("circle",{cx:n,cy:p,r:x?6:3,fill:s.sentiment>0?"#22c55e":"#ef4444",opacity:x?1:.3,stroke:x?"#1f2937":"none",strokeWidth:"1"}),x&&e.jsx("text",{x:n,y:p-10,textAnchor:"middle",className:"text-[7px]",fill:"#374151",children:s.stock})]},c)})]}),e.jsx("div",{className:"mt-3 space-y-1",children:y.map((s,c)=>e.jsxs("div",{className:`flex items-center gap-2 text-xs p-1 rounded ${s.sentiment>0?"bg-green-50 dark:bg-green-900/20":"bg-red-50 dark:bg-red-900/20"}`,children:[e.jsx("span",{className:`font-bold ${s.sentiment>0?"text-green-600":"text-red-500"}`,children:s.sentiment>0?"BUY":"SELL"}),e.jsx("span",{className:"text-gray-700 dark:text-gray-300",children:s.stock}),e.jsx("span",{className:"text-gray-500 flex-1 truncate",children:s.headline}),e.jsx("span",{className:"font-mono",children:s.sentiment.toFixed(1)})]},c))})]})}function te(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"News-Driven Trading on Indian Corporate Events"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"News sentiment analysis uses Natural Language Processing (NLP) to extract trading signals from text data -- corporate announcements, financial news, regulatory filings, and social media. In the Indian market, key news sources include BSE/NSE corporate filings, SEBI circulars, RBI announcements, and financial news from Economic Times, Moneycontrol, and LiveMint. The speed and accuracy of sentiment extraction determine trading profitability."}),e.jsx(S,{title:"Sentiment Score",label:"Definition 5.11",definition:"A sentiment score quantifies the positive or negative tone of a text document on a scale, typically [-1, +1]. For financial news, the score reflects the expected price impact of the information. A score of +1 indicates extremely positive news (e.g., major contract win), while -1 indicates extremely negative news (e.g., fraud discovery).",notation:e.jsxs(e.Fragment,{children:["Aggregate sentiment: ",e.jsx(t.InlineMath,{math:"S_t = \\frac{1}{N_t}\\sum_{j=1}^{N_t} s_j \\cdot w_j"})," where ",e.jsx(t.InlineMath,{math:"s_j"})," is the sentiment of article ",e.jsx(t.InlineMath,{math:"j"}),", ",e.jsx(t.InlineMath,{math:"w_j"})," is its relevance weight, and ",e.jsx(t.InlineMath,{math:"N_t"})," is the number of articles at time ",e.jsx(t.InlineMath,{math:"t"}),"."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"NLP Pipeline for Indian Financial News"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The typical sentiment analysis pipeline involves:"}),e.jsx(t.BlockMath,{math:"\\text{Raw Text} \\xrightarrow{\\text{Preprocess}} \\text{Tokens} \\xrightarrow{\\text{NLP Model}} \\text{Sentiment } s \\in [-1, 1] \\xrightarrow{\\text{Aggregate}} \\text{Signal}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For Indian financial text, preprocessing must handle: (1) Hindi and English mixed content (code-switching), (2) Indian financial jargon (lakh, crore, NPA, FMCG), (3) BSE/NSE filing formats, and (4) regulatory language from SEBI/RBI circulars."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Event Categories in Indian Markets"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Event Type"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Typical Impact"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Duration"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"RBI monetary policy"}),e.jsx("td",{className:"px-5 py-2",children:"Bank Nifty +/- 2-5%"}),e.jsx("td",{className:"px-5 py-2",children:"Same day"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Union Budget"}),e.jsx("td",{className:"px-5 py-2",children:"Sector-specific 3-10%"}),e.jsx("td",{className:"px-5 py-2",children:"1-5 days"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Management change"}),e.jsx("td",{className:"px-5 py-2",children:"Stock-specific 2-8%"}),e.jsx("td",{className:"px-5 py-2",children:"1-3 days"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Block deal / bulk deal"}),e.jsx("td",{className:"px-5 py-2",children:"Stock-specific 1-5%"}),e.jsx("td",{className:"px-5 py-2",children:"1-2 days"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"SEBI regulatory change"}),e.jsx("td",{className:"px-5 py-2",children:"Sector-wide 1-3%"}),e.jsx("td",{className:"px-5 py-2",children:"1-5 days"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-5 py-2",children:"Promoter pledge change"}),e.jsx("td",{className:"px-5 py-2",children:"Stock-specific 2-10%"}),e.jsx("td",{className:"px-5 py-2",children:"1-7 days"})]})]})]})}),e.jsx(I,{title:"Information Content of News",label:"Theorem 5.11",statement:e.jsxs(e.Fragment,{children:["The price impact of a news event is proportional to the surprise component of the information and inversely proportional to prior uncertainty: ",e.jsx(t.BlockMath,{math:"\\Delta P = \\frac{\\sigma_{\\text{prior}}^2}{\\sigma_{\\text{prior}}^2 + \\sigma_{\\text{noise}}^2} \\times (\\text{News Signal} - \\text{Prior Expectation})"})," This is the Bayesian updating formula applied to financial prices. Events that are widely anticipated (like expected RBI rate holds) have minimal impact, while unexpected events (surprise rate cuts/hikes) have maximum impact."]})}),e.jsx(ee,{}),e.jsx(M,{title:"news_sentiment_trading.py",runnable:!0,code:`import numpy as np

# News Sentiment Trading System for Indian Markets
np.random.seed(42)

# Simulated news events with sentiment scores
# In practice, use NLP models (FinBERT, GPT) on real news feeds
class IndianNewsEvent:
    def __init__(self, headline, sentiment, stock, category):
        self.headline = headline
        self.sentiment = sentiment  # [-1, 1]
        self.stock = stock
        self.category = category

# Sample events from Indian financial news
events = [
    IndianNewsEvent("RBI cuts repo rate by 25 bps to 6.25%", 0.7,
                    "Bank Nifty", "monetary_policy"),
    IndianNewsEvent("TCS bags USD 1.5 billion deal from UK insurer", 0.8,
                    "TCS", "corporate"),
    IndianNewsEvent("SEBI bans promoter from market for insider trading", -0.9,
                    "Target Stock", "regulatory"),
    IndianNewsEvent("India's CPI inflation rises to 6.2%", -0.5,
                    "Nifty", "macro"),
    IndianNewsEvent("Adani Group to invest INR 80,000 crore in green energy", 0.6,
                    "Adani Green", "corporate"),
    IndianNewsEvent("FII outflows reach INR 15,000 crore in October", -0.6,
                    "Nifty", "flow"),
    IndianNewsEvent("Government raises windfall tax on crude oil", -0.7,
                    "ONGC", "policy"),
    IndianNewsEvent("Reliance Jio adds 10 million subscribers in Q3", 0.5,
                    "Reliance", "corporate"),
    IndianNewsEvent("Banking sector NPAs decline to 3.9%", 0.6,
                    "Bank Nifty", "sector"),
    IndianNewsEvent("Rupee hits all-time low against dollar at 84.5", -0.4,
                    "IT Sector", "macro"),
]

# Sentiment Aggregation and Signal Generation
print("=== News Sentiment Analysis: Indian Markets ===\\n")
print(f"{'Headline':<55} {'Sentiment':<12} {'Stock':<15} {'Signal':<8}")
print("-" * 92)

signals = []
for event in events:
    signal = "BUY" if event.sentiment > 0.3 else ("SELL" if event.sentiment < -0.3 else "HOLD")
    signals.append(signal)
    truncated = event.headline[:52] + "..." if len(event.headline) > 55 else event.headline
    print(f"{truncated:<55} {event.sentiment:>8.1f}    {event.stock:<15} {signal:<8}")

# Sentiment decay model
print(f"\\n=== Sentiment Decay Model ===")
half_lives = {
    'monetary_policy': 5,   # days
    'corporate': 15,
    'regulatory': 10,
    'macro': 7,
    'flow': 3,
    'sector': 10,
    'policy': 8,
}

for category, hl in half_lives.items():
    decay_rate = np.log(2) / hl
    print(f"{category:<20} Half-life: {hl:>3} days, "
          f"Decay rate: {decay_rate:.4f}")

# Backtesting sentiment strategy
print(f"\\n=== Sentiment Strategy Backtest ===")
n_days = 504
daily_sentiment = np.zeros(n_days)
daily_returns = np.random.randn(n_days) * 0.012  # Nifty daily returns

# Inject sentiment signals
signal_days = np.random.choice(n_days, 50, replace=False)
for day in signal_days:
    sent = np.random.randn() * 0.5
    daily_sentiment[day] = sent
    # Sentiment partially predicts next-day return
    if day + 1 < n_days:
        daily_returns[day + 1] += sent * 0.005  # 0.5% impact

# Trading strategy: position = sign(sentiment) * |sentiment|
positions = np.zeros(n_days)
strategy_returns = np.zeros(n_days)

for t in range(1, n_days):
    # Exponential decay of past sentiment
    decay = 0.9
    positions[t] = decay * positions[t-1] + daily_sentiment[t]
    positions[t] = np.clip(positions[t], -1, 1)  # Cap leverage
    strategy_returns[t] = positions[t-1] * daily_returns[t]

# Performance
ann_ret = np.mean(strategy_returns) * 252
ann_vol = np.std(strategy_returns) * np.sqrt(252)
sharpe = ann_ret / ann_vol if ann_vol > 0 else 0

print(f"Annual Return:     {ann_ret*100:.2f}%")
print(f"Annual Volatility: {ann_vol*100:.2f}%")
print(f"Sharpe Ratio:      {sharpe:.2f}")
print(f"Signal count:      {len(signal_days)}")
print(f"Avg position size: {np.mean(np.abs(positions[positions != 0])):.3f}")

# NLP Model comparison for Indian financial text
print(f"\\n=== NLP Model Comparison (Indian Financial Text) ===")
models = [
    ('Loughran-McDonald Dict', 0.58, '< 1 ms'),
    ('VADER (adapted)', 0.62, '< 1 ms'),
    ('FinBERT', 0.78, '~50 ms'),
    ('GPT-based (few-shot)', 0.85, '~500 ms'),
    ('Fine-tuned BERT (Indian)', 0.82, '~30 ms'),
]

print(f"{'Model':<30} {'Accuracy':<12} {'Latency':<12}")
for model, acc, lat in models:
    print(f"{model:<30} {acc*100:>6.0f}%     {lat:<12}")

# Data sources for Indian market news
print(f"\\n=== Indian Market News Data Sources ===")
sources = [
    ('BSE/NSE Corporate Filings', 'Official, structured', 'Free'),
    ('SEBI Circulars', 'Regulatory, high impact', 'Free'),
    ('Economic Times', 'Broad coverage', 'Subscription'),
    ('Moneycontrol', 'Real-time, retail focus', 'Free/Premium'),
    ('Bloomberg Terminal', 'Institutional grade', 'Expensive'),
    ('Twitter/X Financial', 'Fast, noisy', 'API costs'),
]
print(f"{'Source':<30} {'Characteristics':<25} {'Cost':<15}")
for source, char, cost in sources:
    print(f"{source:<30} {char:<25} {cost:<15}")`}),e.jsx(T,{title:"Sentiment-Based RBI Policy Trade",difficulty:"intermediate",problem:"RBI announces a surprise 25 bps rate cut. Your NLP model scores the announcement at +0.7 sentiment. Historical analysis shows Bank Nifty moves 1.5x the sentiment score on RBI events. Bank Nifty is at 48,000. Capital is INR 30 lakhs. How would you trade?",solution:[{step:"Estimate expected move",formula:"\\Delta P = 1.5 \\times 0.7 \\times 48000 / 100 = 504 \\text{ points}",explanation:"Historical coefficient of 1.5% per unit sentiment implies a ~504 point move."},{step:"Compute position size",formula:"\\text{Lots} = \\frac{30,00,000}{15 \\times 48,000} = 4.2 \\approx 4 \\text{ lots}",explanation:"Bank Nifty lot size is 15 units. Buy 4 lots of Bank Nifty futures."},{step:"Set risk limits",formula:"\\text{Stop loss} = 48000 - 200 = 47800 \\text{ (max loss: INR 12,000)}",explanation:"Set stop at 200 points below entry. Target profit: 4 * 15 * 504 = INR 30,240. Risk-reward ratio ~2.5:1."}]}),e.jsx(N,{title:"SEBI Regulations on Algorithmic News Trading",type:"warning",children:e.jsx("p",{children:"SEBI's circular on algorithmic trading (2012, updated 2018) requires all algo orders to be tagged and approved by the exchange. Automated news-based trading systems must have adequate risk controls including order-level checks, position limits, and kill switches. The system must not trade on UPSI (Unpublished Price Sensitive Information). News from official BSE/NSE filings is considered public information and is fair game for algorithmic processing once disseminated through official channels."})}),e.jsx(N,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"News sentiment trading in Indian markets requires NLP models tuned for Indian financial language, fast ingestion of BSE/NSE filings and RBI announcements, and careful event-type-specific calibration. The most impactful events are RBI policy decisions, SEBI regulatory changes, and corporate earnings surprises. Use sentiment decay models to manage position aging, and always account for the bid-ask spread and impact cost when trading on short-lived sentiment signals."})})]})}const _e=Object.freeze(Object.defineProperty({__proto__:null,default:te},Symbol.toStringTag,{value:"Module"}));function ae(){const[a,v]=b.useState(1e4),[r,j]=b.useState(10),[m,y]=b.useState("VWAP"),f=[.12,.08,.06,.05,.04,.04,.05,.06,.08,.1,.14,.18],o=f.reduce((d,i)=>d+i,0),s=f.map(d=>d/o),c=[];for(let d=0;d<r;d++){const i=Math.floor(d*f.length/r);m==="TWAP"?c.push(a/r):c.push(a*s[i])}const n=500,p=150,x=Math.max(...c);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: TWAP vs VWAP Order Scheduling"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Compare uniform (TWAP) vs volume-weighted (VWAP) order slicing on NSE."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Total Shares: ",a.toLocaleString()]}),e.jsx("input",{type:"range",min:"1000",max:"50000",step:"1000",value:a,onChange:d=>v(parseInt(d.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Number of Slices: ",r]}),e.jsx("input",{type:"range",min:"3",max:"20",step:"1",value:r,onChange:d=>j(parseInt(d.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("div",{className:"flex gap-2 items-end",children:[e.jsx("button",{onClick:()=>y("TWAP"),className:`px-3 py-1 text-xs rounded ${m==="TWAP"?"bg-indigo-500 text-white":"bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`,children:"TWAP"}),e.jsx("button",{onClick:()=>y("VWAP"),className:`px-3 py-1 text-xs rounded ${m==="VWAP"?"bg-indigo-500 text-white":"bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`,children:"VWAP"})]})]}),e.jsxs("svg",{viewBox:`0 0 ${n} ${p}`,className:"w-full max-w-2xl mx-auto block",children:[c.map((d,i)=>{const l=n/r*.7,g=i/r*n+l*.2,h=d/x*(p-20),_=m==="TWAP"?"#6366f1":"#22c55e";return e.jsxs("g",{children:[e.jsx("rect",{x:g,y:p-h-15,width:l,height:h,fill:_,opacity:"0.7",rx:"2"}),e.jsx("text",{x:g+l/2,y:p-2,textAnchor:"middle",className:"text-[7px]",fill:"#6b7280",children:Math.round(d)})]},i)}),e.jsxs("text",{x:n/2,y:"10",textAnchor:"middle",className:"text-[10px] font-bold",fill:"#374151",children:[m," Schedule: ",a.toLocaleString()," shares in ",r," slices"]})]}),e.jsx("p",{className:"mt-2 text-center text-sm text-gray-600 dark:text-gray-400",children:m==="TWAP"?"TWAP: Equal shares per slice. Simple but ignores volume patterns.":"VWAP: More shares during high-volume periods (open/close). Reduces market impact."})]})}function se(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"TWAP and VWAP Execution on NSE"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"When executing large orders on the NSE, market impact is the primary concern. A single market order for 50,000 shares of a Nifty stock can move the price by 0.5-2%, eating into strategy profits. TWAP (Time-Weighted Average Price) and VWAP (Volume-Weighted Average Price) algorithms slice large orders into smaller child orders, spreading execution over time to minimize impact and achieve a benchmark price."}),e.jsx(S,{title:"VWAP (Volume-Weighted Average Price)",label:"Definition 5.12",definition:"VWAP is the average price of a security weighted by the volume traded at each price level over a given period. It serves as both a benchmark for execution quality and a trading algorithm that aims to match or beat this benchmark by distributing child orders proportionally to the expected volume profile.",notation:e.jsxs(e.Fragment,{children:["VWAP benchmark: ",e.jsx(t.InlineMath,{math:"\\text{VWAP} = \\frac{\\sum_{t} P_t \\cdot V_t}{\\sum_{t} V_t}"})," where ",e.jsx(t.InlineMath,{math:"P_t"})," is price and ",e.jsx(t.InlineMath,{math:"V_t"})," is volume at time ",e.jsx(t.InlineMath,{math:"t"}),"."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"TWAP Algorithm"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"TWAP divides the total order equally across time intervals:"}),e.jsx(t.BlockMath,{math:"q_i = \\frac{Q}{N}, \\quad i = 1, 2, \\ldots, N"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"Q"})," is total order quantity and ",e.jsx(t.InlineMath,{math:"N"})," is the number of time slices. Each slice is executed as a limit order near the best bid/ask, with optional aggression if the slice is not filled within the time window."]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"VWAP Algorithm"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"VWAP distributes the order proportionally to the expected volume profile:"}),e.jsx(t.BlockMath,{math:"q_i = Q \\cdot \\frac{\\hat{v}_i}{\\sum_{j=1}^{N} \\hat{v}_j}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"\\hat{v}_i"})," is the predicted volume for interval ",e.jsx(t.InlineMath,{math:"i"}),". The volume profile is estimated from historical intraday volume data, typically using the past 20-30 trading days. On the NSE, the volume profile has a characteristic U-shape: high volume at open (9:15-10:00) and close (2:30-3:30), with lower volume during midday."]}),e.jsx(I,{title:"VWAP Tracking Error",label:"Theorem 5.12",statement:e.jsxs(e.Fragment,{children:["The expected tracking error of a VWAP algorithm relative to the market VWAP benchmark is: ",e.jsx(t.BlockMath,{math:"TE = \\mathbb{E}\\left[\\frac{\\sum_i q_i P_i^{exec}}{\\sum_i q_i} - \\text{VWAP}_{market}\\right] = \\sum_i \\frac{\\hat{v}_i}{\\sum_j \\hat{v}_j} \\cdot \\mathbb{E}[\\Delta P_i^{impact}]"})," where ",e.jsx(t.InlineMath,{math:"\\Delta P_i^{impact}"})," is the price impact of the child order in interval ",e.jsx(t.InlineMath,{math:"i"}),". Minimizing tracking error requires accurate volume prediction and minimizing per-slice impact. The tracking error is bounded by: ",e.jsx(t.InlineMath,{math:"|TE| \\leq \\frac{Q}{ADV} \\cdot \\sigma_{daily} \\cdot \\sqrt{\\sum_i \\hat{v}_i^2}"}),"."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"NSE Volume Profile"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Time (IST)"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"% of Daily Volume"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Characteristics"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"9:15 - 10:00"}),e.jsx("td",{className:"px-5 py-2",children:"~18%"}),e.jsx("td",{className:"px-5 py-2",children:"Opening auction, overnight info processed"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"10:00 - 11:00"}),e.jsx("td",{className:"px-5 py-2",children:"~12%"}),e.jsx("td",{className:"px-5 py-2",children:"European market overlap"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"11:00 - 13:00"}),e.jsx("td",{className:"px-5 py-2",children:"~15%"}),e.jsx("td",{className:"px-5 py-2",children:"Midday lull"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"13:00 - 14:30"}),e.jsx("td",{className:"px-5 py-2",children:"~18%"}),e.jsx("td",{className:"px-5 py-2",children:"Afternoon pickup"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-5 py-2",children:"14:30 - 15:30"}),e.jsx("td",{className:"px-5 py-2",children:"~37%"}),e.jsx("td",{className:"px-5 py-2",children:"Closing rush, F&O expiry effects"})]})]})]})}),e.jsx(ae,{}),e.jsx(M,{title:"twap_vwap_nse.py",runnable:!0,code:`import numpy as np

# TWAP and VWAP Execution Algorithms for NSE
np.random.seed(42)

# NSE trading parameters
trading_start = 9.25   # 9:15 AM IST
trading_end = 15.5     # 3:30 PM IST
trading_hours = trading_end - trading_start
n_intervals = 75       # 5-minute intervals in trading day

# Historical NSE volume profile (U-shaped)
def generate_volume_profile(n_intervals):
    """Generate typical NSE intraday volume profile."""
    x = np.linspace(0, 1, n_intervals)
    # U-shape: high at open and close, low at midday
    profile = 0.5 * np.exp(-10 * (x - 0.05)**2) + \\
              0.3 * np.exp(-10 * (x - 0.95)**2) + \\
              0.15 + 0.1 * np.random.rand(n_intervals)
    return profile / np.sum(profile)

volume_profile = generate_volume_profile(n_intervals)

# Stock parameters
stock = "HDFC Bank"
price = 1650  # INR
lot_size = 550  # F&O lot size
total_order = 25000  # Shares to buy
adv = 500000  # Average daily volume
participation_rate = total_order / adv

print(f"=== Execution Algorithm Comparison: {stock} ===")
print(f"Order size:        {total_order:,} shares")
print(f"Stock price:       INR {price}")
print(f"Order value:       INR {total_order * price:,.0f}")
print(f"ADV:               {adv:,} shares")
print(f"Participation:     {participation_rate*100:.1f}%")

# Simulate price path
prices = np.zeros(n_intervals)
prices[0] = price
for t in range(1, n_intervals):
    prices[t] = prices[t-1] * (1 + np.random.randn() * 0.002)

# Market volumes per interval
market_volumes = (adv * volume_profile * (1 + np.random.randn(n_intervals) * 0.2)).astype(int)
market_volumes = np.maximum(market_volumes, 100)

# True VWAP benchmark
true_vwap = np.sum(prices * market_volumes) / np.sum(market_volumes)

# TWAP Execution
twap_shares = np.ones(n_intervals) * total_order / n_intervals
twap_fills = np.minimum(twap_shares, market_volumes * 0.1)  # Max 10% participation
twap_remaining = total_order - np.sum(twap_fills)
twap_cost = np.sum(twap_fills * prices * (1 + twap_fills / market_volumes * 0.001))
twap_avg = twap_cost / np.sum(twap_fills)

# VWAP Execution
vwap_shares = total_order * volume_profile
vwap_fills = np.minimum(vwap_shares, market_volumes * 0.1)
vwap_remaining = total_order - np.sum(vwap_fills)
vwap_cost = np.sum(vwap_fills * prices * (1 + vwap_fills / market_volumes * 0.0005))
vwap_avg = vwap_cost / np.sum(vwap_fills)

print(f"\\n{'Metric':<25} {'TWAP':<18} {'VWAP':<18} {'Benchmark':<18}")
print(f"{'Avg exec price':<25} INR {twap_avg:>10.2f}   INR {vwap_avg:>10.2f}   INR {true_vwap:>10.2f}")
print(f"{'Slippage (bps)':<25} {(twap_avg/true_vwap-1)*10000:>10.1f}       {(vwap_avg/true_vwap-1)*10000:>10.1f}")
print(f"{'Shares filled':<25} {np.sum(twap_fills):>10,.0f}       {np.sum(vwap_fills):>10,.0f}")
print(f"{'Fill rate':<25} {np.sum(twap_fills)/total_order*100:>9.1f}%       {np.sum(vwap_fills)/total_order*100:>9.1f}%")
print(f"{'Max participation':<25} {np.max(twap_fills/market_volumes)*100:>9.1f}%       {np.max(vwap_fills/market_volumes)*100:>9.1f}%")

# Implementation shortfall
arrival_price = prices[0]
twap_is = (twap_avg - arrival_price) / arrival_price * 10000
vwap_is = (vwap_avg - arrival_price) / arrival_price * 10000
print(f"\\n{'Impl Shortfall (bps)':<25} {twap_is:>10.1f}       {vwap_is:>10.1f}")

# Cost analysis
print(f"\\n=== Transaction Cost Breakdown (per INR 1 Cr turnover) ===")
costs = {
    'Brokerage (Zerodha)':  0.03,   # 0.03% or INR 20 flat
    'STT (delivery)':       0.10,   # 0.1% buyer side
    'Exchange txn':         0.00345, # NSE charges
    'SEBI turnover fee':    0.0001,
    'GST (18% on brokerage)': 0.0054,
    'Stamp duty':           0.015,
}

total_cost = 0
for name, rate in costs.items():
    cost_inr = rate / 100 * 10000000
    total_cost += rate
    print(f"  {name:<30} {rate:>8.4f}%  INR {cost_inr:>8,.0f}")

print(f"  {'TOTAL':<30} {total_cost:>8.4f}%  INR {total_cost/100*10000000:>8,.0f}")

# Optimal number of slices
print(f"\\n=== Optimal Slicing Analysis ===")
for n in [5, 10, 20, 50, 75]:
    per_slice = total_order / n
    impact_per_slice = (per_slice / adv) * 100 * 0.5  # Simple impact model
    timing_risk = 0.012 * np.sqrt(trading_hours / n) * 100  # Volatility risk
    total_cost_est = impact_per_slice + timing_risk * 0.1
    print(f"N={n:>3}: Slice={per_slice:>6,.0f} shares, "
          f"Impact={impact_per_slice:.2f}bps, "
          f"Timing={timing_risk:.2f}%, "
          f"Total={total_cost_est:.2f}bps")`}),e.jsx(T,{title:"VWAP Execution Plan",difficulty:"intermediate",problem:"You need to buy 20,000 shares of ICICI Bank (price INR 1,050, ADV 400,000). The first hour of trading accounts for 25% of daily volume. How many shares should the VWAP algo execute in the first hour (of 6.25 total trading hours)?",solution:[{step:"Compute VWAP target for first hour",formula:"q_1 = Q \\times \\frac{v_1}{\\sum v_j} = 20000 \\times 0.25 = 5000 \\text{ shares}",explanation:"25% of volume in first hour means 25% of order should execute then."},{step:"Check participation rate",formula:"\\text{Participation} = \\frac{5000}{400000 \\times 0.25} = 5\\%",explanation:"5% participation rate is within acceptable limits (typically < 10%)."},{step:"Compute expected impact",formula:"\\text{Impact} \\approx 0.5 \\times \\sqrt{\\frac{5000}{100000}} = 0.11\\%",explanation:"Using square-root impact model, expected slippage is ~11 bps for this slice."}]}),e.jsx(N,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"TWAP and VWAP are the workhorses of institutional execution on the NSE. TWAP is simpler but ignores volume patterns; VWAP matches the market's natural rhythm, reducing impact. The NSE's U-shaped volume profile (heavy at open/close) makes VWAP particularly effective. For large orders (above 5% of ADV), multi-day VWAP or implementation shortfall algorithms are preferred. Always account for India-specific costs: STT, stamp duty, and exchange transaction charges."})})]})}const je=Object.freeze(Object.defineProperty({__proto__:null,default:se},Symbol.toStringTag,{value:"Module"}));function re(){const[a,v]=b.useState(.001),[r,j]=b.useState(5e4),[m,y]=b.useState(10),[f,o]=b.useState(.02),c=Math.sqrt(a*f*f/.01),n=[];for(let l=0;l<=m;l++){const g=l/m,h=r*Math.sinh(c*(1-g))/Math.sinh(c);n.push(h)}const p=500,x=180,d=n.map((l,g)=>{const h=g/m*p,_=x-l/r*(x-20)-10;return`${g===0?"M":"L"}${h},${_}`}).join(" "),i=Array.from({length:m+1},(l,g)=>{const h=g/m*p,_=r*(1-g/m),u=x-_/r*(x-20)-10;return`${g===0?"M":"L"}${h},${u}`}).join(" ");return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Almgren-Chriss Optimal Execution Trajectory"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust risk aversion to see how the optimal liquidation path changes for Indian mid-cap stocks."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Risk Aversion: ",a.toFixed(4)]}),e.jsx("input",{type:"range",min:"0.0001",max:"0.01",step:"0.0001",value:a,onChange:l=>v(parseFloat(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Shares: ",r.toLocaleString()]}),e.jsx("input",{type:"range",min:"10000",max:"100000",step:"5000",value:r,onChange:l=>j(parseInt(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Periods: ",m]}),e.jsx("input",{type:"range",min:"5",max:"30",step:"1",value:m,onChange:l=>y(parseInt(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Volatility: ",(f*100).toFixed(1),"%"]}),e.jsx("input",{type:"range",min:"0.005",max:"0.05",step:"0.005",value:f,onChange:l=>o(parseFloat(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:`0 0 ${p} ${x}`,className:"w-full max-w-2xl mx-auto block",children:[e.jsx("path",{d:i,fill:"none",stroke:"#94a3b8",strokeWidth:"1",strokeDasharray:"4"}),e.jsx("path",{d,fill:"none",stroke:"#6366f1",strokeWidth:"2"}),e.jsx("text",{x:"10",y:"15",className:"text-[9px]",fill:"#6b7280",children:"Shares remaining"}),e.jsx("text",{x:p-10,y:x-2,textAnchor:"end",className:"text-[9px]",fill:"#6b7280",children:"Time"})]}),e.jsxs("div",{className:"mt-3 flex justify-center gap-4 text-xs text-gray-500 dark:text-gray-400",children:[e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx("span",{className:"inline-block w-4 h-0.5 bg-indigo-500"})," Optimal (A-C)"]}),e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx("span",{className:"inline-block w-4 h-0.5 bg-gray-400",style:{borderTop:"1px dashed"}})," Linear (TWAP)"]})]}),e.jsx("p",{className:"mt-2 text-center text-sm text-gray-600 dark:text-gray-400",children:a>.005?"High risk aversion: front-loaded execution to reduce timing risk":a<.001?"Low risk aversion: more uniform, minimizing impact cost":"Balanced: moderate front-loading with impact consideration"})]})}function ne(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Almgren-Chriss Optimal Execution for Indian Mid-Caps"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"The Almgren-Chriss (2000) framework provides the gold standard for optimal execution of large orders. It formalizes the fundamental trade-off between market impact (trading too fast) and timing risk (trading too slow). For Indian mid-cap stocks on the NSE, where liquidity is thinner and spreads wider than large-caps, this framework is especially valuable for institutional traders."}),e.jsx(S,{title:"Implementation Shortfall",label:"Definition 5.13",definition:"Implementation shortfall (IS) is the difference between the paper return of a trading decision and the actual return achieved after execution. It captures all costs of trading: market impact, timing risk, and opportunity cost. IS is the standard benchmark for measuring execution quality.",notation:e.jsxs(e.Fragment,{children:["IS = ",e.jsx(t.InlineMath,{math:"(P_{exec} - P_{decision}) \\times \\text{sign}(q)"})," where ",e.jsx(t.InlineMath,{math:"P_{exec}"})," is the average execution price, ",e.jsx(t.InlineMath,{math:"P_{decision}"})," is the price when the trading decision was made, and ",e.jsx(t.InlineMath,{math:"q"})," is the signed quantity."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"The Almgren-Chriss Model"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The model assumes a trader must liquidate ",e.jsx(t.InlineMath,{math:"X"})," shares over",e.jsx(t.InlineMath,{math:"T"})," periods. The stock price follows:"]}),e.jsx(t.BlockMath,{math:"S_k = S_{k-1} + \\sigma \\tau^{1/2} \\xi_k - g\\left(\\frac{n_k}{\\tau}\\right)"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"\\sigma"})," is volatility, ",e.jsx(t.InlineMath,{math:"\\xi_k \\sim N(0,1)"}),", and ",e.jsx(t.InlineMath,{math:"g(\\cdot)"})," is the permanent impact function. The temporary impact affects only the execution price:"]}),e.jsx(t.BlockMath,{math:"\\tilde{S}_k = S_k - h\\left(\\frac{n_k}{\\tau}\\right)"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["With linear impact functions ",e.jsx(t.InlineMath,{math:"g(v) = \\gamma v"})," and ",e.jsx(t.InlineMath,{math:"h(v) = \\eta v"}),", the expected cost and variance of execution are:"]}),e.jsx(t.BlockMath,{math:"\\mathbb{E}[\\text{Cost}] = \\frac{1}{2}\\gamma X^2 + \\eta \\sum_k \\frac{n_k^2}{\\tau}"}),e.jsx(t.BlockMath,{math:"\\text{Var}[\\text{Cost}] = \\sigma^2 \\sum_k x_k^2 \\tau"}),e.jsx(I,{title:"Almgren-Chriss Optimal Trajectory",label:"Theorem 5.13",statement:e.jsxs(e.Fragment,{children:["For a risk-averse trader with mean-variance objective ",e.jsx(t.InlineMath,{math:"\\min_{n_1,\\ldots,n_N} \\mathbb{E}[\\text{Cost}] + \\lambda \\cdot \\text{Var}[\\text{Cost}]"}),", the optimal holdings trajectory is: ",e.jsx(t.BlockMath,{math:"x_k^* = X \\cdot \\frac{\\sinh(\\kappa(T-t_k))}{\\sinh(\\kappa T)}"})," where ",e.jsx(t.InlineMath,{math:"\\kappa = \\sqrt{\\frac{\\lambda\\sigma^2}{\\eta}}"})," is the urgency parameter. When ",e.jsx(t.InlineMath,{math:"\\lambda \\to 0"})," (risk neutral), the trajectory approaches linear (TWAP). When ",e.jsx(t.InlineMath,{math:"\\lambda \\to \\infty"})," (infinitely risk averse), execution approaches immediate liquidation."]}),proof:e.jsxs(e.Fragment,{children:["The proof uses calculus of variations. The Lagrangian is ",e.jsx(t.InlineMath,{math:"L = \\mathbb{E}[\\text{Cost}] + \\lambda \\cdot \\text{Var}[\\text{Cost}]"}),". Taking the Euler-Lagrange equation with boundary conditions ",e.jsx(t.InlineMath,{math:"x_0 = X"})," and ",e.jsx(t.InlineMath,{math:"x_N = 0"})," yields a second-order difference equation. The general solution involves hyperbolic sine and cosine functions with parameter ",e.jsx(t.InlineMath,{math:"\\kappa"})," determined by the ratio of risk penalty to temporary impact."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Efficient Frontier of Execution"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The Almgren-Chriss framework generates an execution efficient frontier in expected-cost vs. variance space:"}),e.jsx(t.BlockMath,{math:"\\text{Var}[\\text{Cost}](\\lambda) = \\frac{\\sigma^2 X^2}{2\\kappa} \\cdot \\frac{\\tanh(\\kappa T/2)}{\\cosh(\\kappa T) - 1}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"This curve represents the minimum variance achievable for each level of expected cost, analogous to the Markowitz efficient frontier in portfolio theory."}),e.jsx(re,{}),e.jsx(M,{title:"almgren_chriss_nse.py",runnable:!0,code:`import numpy as np

# Almgren-Chriss Optimal Execution for NSE Mid-Cap Stocks
np.random.seed(42)

class AlmgrenChriss:
    """Almgren-Chriss optimal execution model."""

    def __init__(self, X, T, N, sigma, gamma, eta, lam):
        """
        X: total shares to liquidate
        T: total time horizon (in days)
        N: number of time periods
        sigma: daily volatility
        gamma: permanent impact coefficient
        eta: temporary impact coefficient
        lam: risk aversion parameter
        """
        self.X = X
        self.T = T
        self.N = N
        self.tau = T / N
        self.sigma = sigma
        self.gamma = gamma
        self.eta = eta
        self.lam = lam

        # Urgency parameter
        self.kappa = np.sqrt(lam * sigma**2 / eta)

    def optimal_trajectory(self):
        """Compute optimal holdings trajectory."""
        t = np.linspace(0, self.T, self.N + 1)
        holdings = self.X * np.sinh(self.kappa * (self.T - t)) / \\
                   np.sinh(self.kappa * self.T)
        trades = -np.diff(holdings)
        return holdings, trades

    def expected_cost(self):
        """Expected execution cost."""
        _, trades = self.optimal_trajectory()
        permanent = 0.5 * self.gamma * self.X**2
        temporary = self.eta * np.sum(trades**2 / self.tau)
        return permanent + temporary

    def variance_cost(self):
        """Variance of execution cost."""
        holdings, _ = self.optimal_trajectory()
        return self.sigma**2 * np.sum(holdings[:-1]**2 * self.tau)

    def simulate(self, n_simulations=1000):
        """Monte Carlo simulation of execution."""
        holdings, trades = self.optimal_trajectory()
        costs = []

        for _ in range(n_simulations):
            price = 500.0  # Starting price (INR)
            total_cost = 0

            for k in range(self.N):
                # Random price move
                price += self.sigma * np.sqrt(self.tau) * np.random.randn()
                # Permanent impact
                price -= self.gamma * trades[k]
                # Temporary impact on execution price
                exec_price = price - self.eta * trades[k] / self.tau
                total_cost += trades[k] * exec_price

            costs.append(total_cost)

        return np.array(costs)

# Indian mid-cap stock parameters
stock = "Pidilite Industries"  # Example mid-cap
price = 2800  # INR
adv = 200000  # shares
order_size = 30000  # 15% of ADV - significant for mid-cap
volatility = 0.025  # 2.5% daily vol (higher than large-cap)

# Impact parameters (calibrated for Indian mid-caps)
gamma = 0.05 * price / adv    # Permanent impact
eta = 0.1 * price / adv       # Temporary impact

print(f"=== Almgren-Chriss: {stock} ===")
print(f"Stock price:    INR {price}")
print(f"Order size:     {order_size:,} shares ({order_size/adv*100:.1f}% of ADV)")
print(f"Daily vol:      {volatility*100:.1f}%")
print(f"Perm impact:    {gamma:.6f}")
print(f"Temp impact:    {eta:.6f}")

# Compare different risk aversion levels
print(f"\\n{'Lambda':<10} {'Strategy':<15} {'E[Cost]':<14} {'Std[Cost]':<14} {'Sharpe':<10}")
lambdas = [0.0001, 0.001, 0.005, 0.01, 0.05]

for lam in lambdas:
    ac = AlmgrenChriss(order_size, 5, 20, volatility, gamma, eta, lam)
    costs = ac.simulate(500)
    e_cost = np.mean(costs) / (order_size * price) * 10000  # bps
    s_cost = np.std(costs) / (order_size * price) * 10000
    label = 'Conservative' if lam > 0.01 else ('Balanced' if lam > 0.001 else 'Aggressive')
    sharpe = e_cost / s_cost if s_cost > 0 else 0
    print(f"{lam:<10.4f} {label:<15} {e_cost:>10.1f} bps  {s_cost:>10.1f} bps  {sharpe:>8.2f}")

# Optimal trajectory for chosen risk aversion
ac = AlmgrenChriss(order_size, 5, 20, volatility, gamma, eta, 0.005)
holdings, trades = ac.optimal_trajectory()

print(f"\\n=== Optimal Trajectory (lambda=0.005) ===")
print(f"{'Period':<8} {'Holdings':<12} {'Trade':<12} {'% Remaining':<15}")
for k in range(min(10, len(trades))):
    print(f"{k+1:<8} {holdings[k]:>10,.0f}  {trades[k]:>10,.0f}  {holdings[k]/order_size*100:>10.1f}%")

print(f"\\nUrgency parameter kappa: {ac.kappa:.4f}")
print(f"Expected cost:  {ac.expected_cost()/order_size/price*10000:.1f} bps")
print(f"Cost std dev:   {np.sqrt(ac.variance_cost())/order_size/price*10000:.1f} bps")

# Indian mid-cap liquidity tiers
print(f"\\n=== NSE Mid-Cap Liquidity Tiers ===")
tiers = [
    ('Tier 1 (Nifty Midcap 50)', 500000, 0.015, 0.02),
    ('Tier 2 (Nifty Midcap 100)', 200000, 0.020, 0.05),
    ('Tier 3 (Nifty Smallcap 50)', 80000, 0.030, 0.10),
    ('Tier 4 (Smallcap 250)', 30000, 0.040, 0.20),
]

print(f"{'Tier':<30} {'ADV':<10} {'Vol':<8} {'Spread':<8}")
for name, adv_t, vol_t, spread in tiers:
    print(f"{name:<30} {adv_t:>8,}  {vol_t*100:>5.1f}%  {spread*100:>5.2f}%")`}),e.jsx(T,{title:"Almgren-Chriss for Nifty Mid-Cap Stock",difficulty:"advanced",problem:e.jsxs(e.Fragment,{children:["You need to sell 25,000 shares of a mid-cap stock (price INR 500, ADV 150,000, daily vol 3%). Permanent impact ",e.jsx(t.InlineMath,{math:"\\gamma = 0.0002"}),", temporary impact ",e.jsx(t.InlineMath,{math:"\\eta = 0.0005"}),", risk aversion ",e.jsx(t.InlineMath,{math:"\\lambda = 0.005"}),". Compute the urgency parameter and first-period trade."]}),solution:[{step:"Compute urgency parameter",formula:"\\kappa = \\sqrt{\\frac{\\lambda \\sigma^2}{\\eta}} = \\sqrt{\\frac{0.005 \\times 0.03^2}{0.0005}} = 0.134"},{step:"Compute optimal first-period holdings (after first trade)",formula:"x_1 = 25000 \\cdot \\frac{\\sinh(0.134 \\times 4)}{\\sinh(0.134 \\times 5)} = 25000 \\times 0.791 = 19,780",explanation:"With 5 periods, after the first period we should hold 19,780 shares."},{step:"First period trade",formula:"n_1 = 25000 - 19780 = 5220 \\text{ shares}",explanation:"Sell 5,220 shares in the first period (21% of total). The strategy is front-loaded due to risk aversion."}]}),e.jsx(N,{title:"Calibrating Impact for Indian Stocks",type:"warning",children:e.jsxs("p",{children:["Impact parameters must be calibrated from actual NSE execution data. Indian mid-caps typically have 2-5x higher impact costs than Nifty 50 stocks due to lower liquidity. Key calibration approaches include: (1) estimating from historical order flow data using Kyle's lambda, (2) using the square-root impact model ",e.jsx(t.InlineMath,{math:"\\Delta P \\propto \\sigma \\sqrt{Q/V}"}),", or (3) backtesting against actual execution records from brokers like Zerodha or institutional platforms. The impact parameters should be re-calibrated monthly as liquidity conditions change."]})}),e.jsx(N,{title:"Key Takeaway",type:"tip",children:e.jsxs("p",{children:["The Almgren-Chriss framework provides the optimal trade-off between market impact and timing risk for large-order execution. For Indian mid-caps, where liquidity is thinner, the urgency parameter ",e.jsx(t.InlineMath,{math:"\\kappa"})," determines whether to trade aggressively (high risk aversion) or patiently (low risk aversion). The model generates a hyperbolic sine trajectory that interpolates between immediate execution and TWAP, adapted to the specific liquidity characteristics of each NSE stock."]})})]})}const ve=Object.freeze(Object.defineProperty({__proto__:null,default:ne},Symbol.toStringTag,{value:"Module"}));function ie(){const[a,v]=b.useState(5e3),[r,j]=b.useState(.5),m=1648.5,y=1649,f=[3e3,2500,2e3,1500,1e3],o=1648.3,s=1649.2,c=[1e3,800,600,500,400],n=y-m,p=s-o,x=f[0],d=c[0];let i,l,g;x>=a?(i=a,l=0,g="NSE has better ask price with sufficient depth"):(i=Math.min(a,x),l=Math.min(a-i,d),g="Split across exchanges for best execution");const h=i*y,_=l*s,k=(h+_)/(i+l||1);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Smart Order Router (NSE vs BSE)"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"See how the SOR routes an order for HDFC Bank between NSE and BSE based on price and depth."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Order Size: ",a.toLocaleString()," shares"]}),e.jsx("input",{type:"range",min:"500",max:"10000",step:"500",value:a,onChange:w=>v(parseInt(w.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Urgency: ",(r*100).toFixed(0),"%"]}),e.jsx("input",{type:"range",min:"0",max:"1",step:"0.1",value:r,onChange:w=>j(parseFloat(w.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4 mb-4",children:[e.jsxs("div",{className:"rounded-lg border border-indigo-200 bg-indigo-50 p-3 dark:border-indigo-700 dark:bg-indigo-900/30",children:[e.jsx("h4",{className:"text-sm font-bold text-indigo-700 dark:text-indigo-300",children:"NSE"}),e.jsxs("p",{className:"text-xs text-gray-600 dark:text-gray-400",children:["Bid: ",m.toFixed(2)," | Ask: ",y.toFixed(2)]}),e.jsxs("p",{className:"text-xs text-gray-600 dark:text-gray-400",children:["Spread: ",n.toFixed(2)]}),e.jsxs("p",{className:"text-xs text-gray-600 dark:text-gray-400",children:["Best depth: ",x.toLocaleString()]}),e.jsxs("p",{className:"text-lg font-bold text-indigo-600 mt-1",children:[i.toLocaleString()," shares"]})]}),e.jsxs("div",{className:"rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-700 dark:bg-amber-900/30",children:[e.jsx("h4",{className:"text-sm font-bold text-amber-700 dark:text-amber-300",children:"BSE"}),e.jsxs("p",{className:"text-xs text-gray-600 dark:text-gray-400",children:["Bid: ",o.toFixed(2)," | Ask: ",s.toFixed(2)]}),e.jsxs("p",{className:"text-xs text-gray-600 dark:text-gray-400",children:["Spread: ",p.toFixed(2)]}),e.jsxs("p",{className:"text-xs text-gray-600 dark:text-gray-400",children:["Best depth: ",d.toLocaleString()]}),e.jsxs("p",{className:"text-lg font-bold text-amber-600 mt-1",children:[l.toLocaleString()," shares"]})]})]}),e.jsxs("p",{className:"text-center text-sm text-gray-600 dark:text-gray-400",children:[e.jsx("span",{className:"font-semibold",children:"Routing: "}),g,". Avg price: INR ",k.toFixed(2)]})]})}function oe(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Smart Order Routing: NSE vs BSE and Best Execution"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"India is unique among major markets in having two competing stock exchanges -- NSE and BSE -- where most liquid stocks are cross-listed. Smart Order Routing (SOR) automatically routes orders to the exchange offering the best price and liquidity, ensuring best execution as mandated by SEBI. While NSE dominates equity derivatives and cash market turnover (90%+), BSE can occasionally offer better prices, especially for less-liquid stocks."}),e.jsx(S,{title:"Smart Order Routing (SOR)",label:"Definition 5.14",definition:"Smart Order Routing is an automated order management system that evaluates available liquidity and prices across multiple execution venues (exchanges, dark pools) and routes orders to achieve best execution. In India, SOR primarily routes between NSE and BSE, considering price, depth, speed, and transaction costs.",notation:e.jsxs(e.Fragment,{children:["Best execution: ",e.jsx(t.InlineMath,{math:"\\text{Route}^* = \\arg\\min_{\\text{route}} \\left(P_{exec}(\\text{route}) + C_{txn}(\\text{route}) + C_{impact}(\\text{route})\\right)"}),"."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"NSE vs BSE: Market Structure"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Feature"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"NSE"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"BSE"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Cash market share"}),e.jsx("td",{className:"px-5 py-2",children:"~90%"}),e.jsx("td",{className:"px-5 py-2",children:"~10%"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"F&O market share"}),e.jsx("td",{className:"px-5 py-2",children:"~99%"}),e.jsx("td",{className:"px-5 py-2",children:"~1%"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Listed companies"}),e.jsx("td",{className:"px-5 py-2",children:"~2,000"}),e.jsx("td",{className:"px-5 py-2",children:"~5,500"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Trading hours"}),e.jsx("td",{className:"px-5 py-2",children:"9:15-15:30 IST"}),e.jsx("td",{className:"px-5 py-2",children:"9:15-15:30 IST"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-5 py-2",children:"Co-location"}),e.jsx("td",{className:"px-5 py-2",children:"Mumbai DC"}),e.jsx("td",{className:"px-5 py-2",children:"Mumbai DC"})]})]})]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"SOR Decision Framework"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The SOR evaluates multiple factors before routing:"}),e.jsx(t.BlockMath,{math:"\\text{Score}_{venue} = w_1 \\cdot \\frac{1}{\\text{Price}} + w_2 \\cdot \\text{Depth} + w_3 \\cdot \\frac{1}{\\text{Spread}} - w_4 \\cdot \\text{Cost}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The routing decision considers:"}),e.jsx(t.BlockMath,{math:"\\text{Total Cost}_{venue} = P_{exec} + \\underbrace{\\text{STT} + \\text{Exchange} + \\text{SEBI} + \\text{Stamp} + \\text{GST}}_{\\text{Regulatory costs}} + \\underbrace{\\text{Impact}(Q, D)}_{\\text{Market impact}}"}),e.jsx(I,{title:"Best Execution Obligation (SEBI)",label:"Theorem 5.14",statement:e.jsxs(e.Fragment,{children:["Under SEBI's best execution framework, brokers must ensure that client orders are executed at the best available price across connected venues. The best execution obligation requires: (1) price improvement over the National Best Bid/Offer (NBBO) when possible, (2) consideration of total execution costs including all regulatory charges, (3) reasonable speed of execution, and (4) documentation of routing decisions for audit purposes. The NBBO across NSE and BSE is defined as: ",e.jsx(t.BlockMath,{math:"\\text{NBBO}_{bid} = \\max(P_{NSE}^{bid}, P_{BSE}^{bid}), \\quad \\text{NBBO}_{ask} = \\min(P_{NSE}^{ask}, P_{BSE}^{ask})"})]})}),e.jsx(ie,{}),e.jsx(M,{title:"smart_order_router.py",runnable:!0,code:`import numpy as np

# Smart Order Routing Engine: NSE vs BSE
np.random.seed(42)

class OrderBook:
    def __init__(self, exchange, bids, asks):
        self.exchange = exchange
        self.bids = bids  # [(price, qty), ...]
        self.asks = asks

    def best_bid(self):
        return self.bids[0][0] if self.bids else 0

    def best_ask(self):
        return self.asks[0][0] if self.asks else float('inf')

    def spread(self):
        return self.best_ask() - self.best_bid()

    def depth_at_levels(self, n=5):
        return sum(qty for _, qty in self.asks[:n])

    def simulate_fill(self, qty, side='buy'):
        """Simulate filling qty shares, return avg price."""
        remaining = qty
        total_cost = 0
        levels = self.asks if side == 'buy' else self.bids

        for price, available in levels:
            filled = min(remaining, available)
            total_cost += filled * price
            remaining -= filled
            if remaining <= 0:
                break

        filled_qty = qty - remaining
        avg_price = total_cost / filled_qty if filled_qty > 0 else 0
        return avg_price, filled_qty

# HDFC Bank order books
nse_book = OrderBook('NSE',
    bids=[(1648.50, 3000), (1648.40, 2500), (1648.30, 2000),
          (1648.20, 1500), (1648.10, 1000)],
    asks=[(1649.00, 3000), (1649.10, 2500), (1649.20, 2000),
          (1649.30, 1500), (1649.40, 1000)])

bse_book = OrderBook('BSE',
    bids=[(1648.30, 1000), (1648.20, 800), (1648.10, 600),
          (1648.00, 500), (1647.90, 400)],
    asks=[(1649.20, 1000), (1649.30, 800), (1649.40, 600),
          (1649.50, 500), (1649.60, 400)])

# SOR Decision Engine
class SmartOrderRouter:
    def __init__(self, books):
        self.books = books

    def transaction_costs(self, exchange, value, is_delivery=True):
        """Compute total transaction costs for Indian exchanges."""
        costs = {
            'NSE': {
                'stt_buy': 0.001 if is_delivery else 0.00025,
                'stt_sell': 0.001 if is_delivery else 0.00025,
                'exchange': 0.0000345,
                'sebi': 0.000001,
                'stamp': 0.00015,
            },
            'BSE': {
                'stt_buy': 0.001 if is_delivery else 0.00025,
                'stt_sell': 0.001 if is_delivery else 0.00025,
                'exchange': 0.0000300,
                'sebi': 0.000001,
                'stamp': 0.00015,
            }
        }
        c = costs[exchange]
        total = sum(c.values()) * value
        return total

    def route_order(self, qty, side='buy'):
        """Route order to best venue(s)."""
        results = []

        for book in self.books:
            avg_price, filled = book.simulate_fill(qty, side)
            if filled == 0:
                continue
            value = avg_price * filled
            txn_cost = self.transaction_costs(book.exchange, value)
            total_cost = value + txn_cost
            eff_price = total_cost / filled

            results.append({
                'exchange': book.exchange,
                'avg_price': avg_price,
                'filled': filled,
                'txn_cost': txn_cost,
                'total_cost': total_cost,
                'eff_price': eff_price,
                'spread': book.spread(),
                'depth': book.depth_at_levels()
            })

        # Sort by effective price (best first)
        results.sort(key=lambda x: x['eff_price'] if side == 'buy' else -x['eff_price'])
        return results

# Run SOR for different order sizes
sor = SmartOrderRouter([nse_book, bse_book])

print("=== Smart Order Router: HDFC Bank ===\\n")
print(f"{'Exchange':<8} {'Best Bid':<12} {'Best Ask':<12} {'Spread':<10} {'5L Depth':<10}")
for book in [nse_book, bse_book]:
    print(f"{book.exchange:<8} {book.best_bid():<12} {book.best_ask():<12} "
          f"{book.spread():<10.2f} {book.depth_at_levels():<10}")

# NBBO
nbbo_bid = max(nse_book.best_bid(), bse_book.best_bid())
nbbo_ask = min(nse_book.best_ask(), bse_book.best_ask())
print(f"\\nNBBO: Bid = {nbbo_bid}, Ask = {nbbo_ask}, Spread = {nbbo_ask - nbbo_bid:.2f}")

# Route orders of different sizes
print(f"\\n=== Routing Analysis ===")
order_sizes = [500, 1000, 3000, 5000, 8000]

for qty in order_sizes:
    results = sor.route_order(qty, 'buy')
    best = results[0]
    print(f"\\nOrder: {qty:>5} shares (BUY)")
    print(f"  Route to: {best['exchange']}")
    print(f"  Avg price: INR {best['avg_price']:.2f}")
    print(f"  Eff price: INR {best['eff_price']:.2f}")
    print(f"  Txn costs: INR {best['txn_cost']:.2f}")
    if len(results) > 1:
        alt = results[1]
        savings = (alt['eff_price'] - best['eff_price']) * qty
        print(f"  Savings vs {alt['exchange']}: INR {savings:.2f} "
              f"({(alt['eff_price']/best['eff_price']-1)*10000:.1f} bps)")

# Split order routing
print(f"\\n=== Split Order Routing (8000 shares) ===")
nse_fill_price, nse_filled = nse_book.simulate_fill(5000, 'buy')
bse_fill_price, bse_filled = bse_book.simulate_fill(3000, 'buy')
combined_price = (nse_fill_price * nse_filled + bse_fill_price * bse_filled) / (nse_filled + bse_filled)
nse_only_price, _ = nse_book.simulate_fill(8000, 'buy')

print(f"NSE only: {nse_only_price:.2f} (walking up the book)")
print(f"Split (NSE 5k + BSE 3k): {combined_price:.2f}")
print(f"Improvement: {(nse_only_price - combined_price) * 8000:.0f} INR "
      f"({(nse_only_price/combined_price - 1) * 10000:.1f} bps)")`}),e.jsx(T,{title:"SOR Routing Decision",difficulty:"intermediate",problem:"You want to buy 4,000 shares of ICICI Bank. NSE ask: 1,050.00 with 5,000 depth. BSE ask: 1,049.80 with 2,000 depth. NSE transaction costs: 0.15% of value. BSE transaction costs: 0.14% of value. Where should the SOR route?",solution:[{step:"Compute effective price at NSE",formula:"\\text{NSE eff} = 1050.00 \\times (1 + 0.0015) = 1051.575",explanation:"NSE has sufficient depth (5,000 > 4,000) to fill entirely at best ask."},{step:"Compute effective price at BSE (split needed)",formula:"\\text{BSE best} = 1049.80 \\times (1 + 0.0014) = 1051.27 \\text{ for 2,000 shares}",explanation:"BSE has only 2,000 at best. Remaining 2,000 would go to next level."},{step:"Route decision",formula:"\\text{BSE eff (2k)} = 1051.27 < \\text{NSE eff} = 1051.58",explanation:"SOR should route 2,000 to BSE (better price) and 2,000 to NSE. The blended effective price beats routing all to NSE."}]}),e.jsx(N,{title:"SEBI Best Execution Framework",type:"warning",children:e.jsx("p",{children:"SEBI's circular on best execution (2019) requires brokers offering SOR to: (1) evaluate both NSE and BSE for every order, (2) route to the venue offering the best price after accounting for all costs, (3) maintain audit trails of all routing decisions, (4) report execution quality metrics quarterly, and (5) handle partial fills and re-routing transparently. Brokers like Zerodha automatically route to the best venue for market orders. For limit orders, the client can specify the exchange."})}),e.jsx(N,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Smart Order Routing between NSE and BSE is essential for best execution in Indian markets. While NSE dominates liquidity, BSE can offer better prices for specific stocks, especially SME and less-liquid names. The SOR must consider not just the quoted price but total costs (STT, exchange charges, stamp duty), available depth, and fill probability. SEBI mandates best execution, making SOR a regulatory requirement for brokers, not just a competitive advantage."})})]})}const Ne=Object.freeze(Object.defineProperty({__proto__:null,default:oe},Symbol.toStringTag,{value:"Module"}));export{pe as a,xe as b,he as c,ge as d,ue as e,fe as f,ye as g,be as h,ke as i,_e as j,je as k,ve as l,Ne as m,me as s};
