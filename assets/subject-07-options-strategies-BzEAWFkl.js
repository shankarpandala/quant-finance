import{j as e,r as h}from"./vendor-DgA46Qmo.js";import{r as _}from"./vendor-katex-C-S70IU0.js";import{D as M,T as E,P as V,E as L,N as S}from"./subject-01-math-foundations-vREfsVbS.js";function X(){const[t,C]=h.useState(2500),[r,w]=h.useState(2600),[a,T]=h.useState(45),[l,b]=h.useState(2500),d=Array.from({length:41},(j,K)=>2200+K*20),y=d.map(j=>j-l),g=d.map(j=>a-Math.max(j-r,0)),c=d.map((j,K)=>y[K]+g[K]),u=r-l+a,p=l-a,o=480,n=160,x=50,P=[...y,...c],k=Math.max(...P),s=Math.min(...P),i=j=>n+5-(j-s)/(k-s)*n,m=j=>x+j/(d.length-1)*(o-x);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Covered Call Payoff (Reliance Industries)"}),e.jsxs("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:["Adjust strike price and premium received. Stock bought at ",l,"."]}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Strike = ",r]}),e.jsx("input",{type:"range",min:"2400",max:"2800",step:"50",value:r,onChange:j=>w(Number(j.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Premium = INR ",a]}),e.jsx("input",{type:"range",min:"10",max:"100",step:"5",value:a,onChange:j=>T(Number(j.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Entry Price = ",l]}),e.jsx("input",{type:"range",min:"2300",max:"2700",step:"10",value:l,onChange:j=>b(Number(j.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:`0 0 ${o+20} ${n+40}`,className:"w-full max-w-2xl mx-auto block","aria-label":"Covered call payoff",children:[e.jsx("line",{x1:x,y1:5,x2:x,y2:n+5,stroke:"#9ca3af",strokeWidth:"1"}),e.jsx("line",{x1:x,y1:i(0),x2:o+10,y2:i(0),stroke:"#9ca3af",strokeWidth:"1",strokeDasharray:"3"}),e.jsx("polyline",{points:y.map((j,K)=>`${m(K)},${i(j)}`).join(" "),fill:"none",stroke:"#94a3b8",strokeWidth:"1.5",strokeDasharray:"4"}),e.jsx("polyline",{points:c.map((j,K)=>`${m(K)},${i(j)}`).join(" "),fill:"none",stroke:"#6366f1",strokeWidth:"2.5"}),e.jsx("text",{x:o-20,y:i(y[y.length-1])-5,className:"text-[9px]",fill:"#94a3b8",children:"Stock only"}),e.jsx("text",{x:o-30,y:i(c[c.length-1])+12,className:"text-[9px]",fill:"#6366f1",children:"Covered call"}),e.jsx("text",{x:x+o/2,y:n+30,textAnchor:"middle",className:"text-[10px]",fill:"#9ca3af",children:"Expiry Price"})]}),e.jsxs("div",{className:"mt-3 grid grid-cols-3 gap-3",children:[e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Max Profit"}),e.jsxs("div",{className:"text-lg font-bold text-green-600 dark:text-green-400",children:["INR ",u]})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Breakeven"}),e.jsx("div",{className:"text-lg font-bold text-blue-600 dark:text-blue-400",children:p})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Max Loss"}),e.jsxs("div",{className:"text-lg font-bold text-red-600 dark:text-red-400",children:[p," (to 0)"]})]})]})]})}function $(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Covered Calls"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"A covered call is the most fundamental options strategy: own the underlying stock and sell a call option against it. On NSE, this is widely used by retail investors holding blue-chip stocks like Reliance Industries, TCS, and HDFC Bank to generate additional income from their equity holdings. SEBI allows covered call writing in both cash and F&O segments."}),e.jsx(M,{title:"Covered Call",label:"Definition 7.1",definition:"A covered call consists of a long position in the underlying stock (or equivalent) combined with a short call option on the same stock. The stock 'covers' the obligation to deliver shares if the call is exercised. It is a mildly bullish to neutral strategy.",notation:"\\text{P\\&L} = (S_T - S_0) + [c - \\max(S_T - K, 0)]"}),e.jsx(_.BlockMath,{math:"\\text{Covered Call P\\&L} = \\begin{cases} S_T - S_0 + c & \\text{if } S_T \\leq K \\\\ K - S_0 + c & \\text{if } S_T > K \\end{cases}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The strategy has a capped upside (at the strike price plus premium received) but provides downside cushion equal to the premium collected. The maximum profit occurs when the stock closes exactly at or above the strike price at expiry."}),e.jsx(_.BlockMath,{math:"\\text{Max Profit} = K - S_0 + c, \\quad \\text{Breakeven} = S_0 - c"}),e.jsx(E,{title:"Covered Call as Short Put Equivalence",label:"Theorem 7.1",statement:"By put-call parity, a covered call (long stock + short call) is synthetically equivalent to a short put at the same strike plus a risk-free bond position: S - C = Ke^{-rT} - P. This means the risk profile of a covered call is identical to selling a cash-secured put.",proof:"From put-call parity C - P = S - Ke^{-rT}. Rearranging: S - C = Ke^{-rT} - P. The left side is the covered call position (long stock, short call). The right side is a short put plus bond. Thus both positions have identical terminal payoffs."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Strike Selection on NSE"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The choice of strike price determines the strategy's risk-return tradeoff:"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Strike"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Premium"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Upside Cap"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Protection"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Best When"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Deep ITM"}),e.jsx("td",{className:"px-4 py-2",children:"High"}),e.jsx("td",{className:"px-4 py-2",children:"Very low"}),e.jsx("td",{className:"px-4 py-2",children:"Maximum"}),e.jsx("td",{className:"px-4 py-2",children:"Bearish / exiting"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"ATM"}),e.jsx("td",{className:"px-4 py-2",children:"Medium"}),e.jsx("td",{className:"px-4 py-2",children:"Moderate"}),e.jsx("td",{className:"px-4 py-2",children:"Moderate"}),e.jsx("td",{className:"px-4 py-2",children:"Neutral"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"OTM"}),e.jsx("td",{className:"px-4 py-2",children:"Low"}),e.jsx("td",{className:"px-4 py-2",children:"High"}),e.jsx("td",{className:"px-4 py-2",children:"Minimal"}),e.jsx("td",{className:"px-4 py-2",children:"Mildly bullish"})]})]})]})}),e.jsx(X,{}),e.jsx(V,{title:"covered_call_analysis.py",runnable:!0,code:`import numpy as np

def covered_call_pnl(S_entry, strike, premium, S_exit):
    """Compute covered call P&L per share."""
    stock_pnl = S_exit - S_entry
    call_pnl = premium - np.maximum(S_exit - strike, 0)
    return stock_pnl + call_pnl

# Example: Reliance Industries covered call on NSE
S_entry = 2500     # Bought Reliance at 2500
lot_size = 250     # NSE F&O lot size for RELIANCE
strikes = [2550, 2600, 2650, 2700]
premiums = [68, 42, 25, 14]  # Approximate premiums

print("=== Reliance Industries Covered Call Analysis ===")
print(f"Entry Price: INR {S_entry} | Lot Size: {lot_size}")
print()

for K, c in zip(strikes, premiums):
    max_profit = (K - S_entry + c) * lot_size
    breakeven = S_entry - c
    yield_pct = c / S_entry * 100
    upside_cap = (K - S_entry) / S_entry * 100

    print(f"Strike {K} | Premium: INR {c}")
    print(f"  Max Profit/lot: INR {max_profit:,.0f}")
    print(f"  Breakeven: INR {breakeven:.0f}")
    print(f"  Premium Yield: {yield_pct:.1f}% (monthly)")
    print(f"  Annualized: {yield_pct * 12:.1f}%")
    print(f"  Upside Cap: {upside_cap:.1f}%")
    print()

# Monthly covered call income simulation
print("=== 12-Month Covered Call Simulation (Reliance) ===")
np.random.seed(42)
monthly_returns = np.random.normal(0.01, 0.06, 12)  # ~12% annual, 20% vol
S = S_entry
total_premium = 0
total_pnl = 0

for month, ret in enumerate(monthly_returns, 1):
    S_new = S * (1 + ret)
    K = S * 1.03  # 3% OTM call
    c = S * 0.015  # ~1.5% monthly premium
    pnl = covered_call_pnl(S, K, c, S_new)
    total_premium += c
    total_pnl += pnl

    assigned = S_new > K
    print(f"Month {month:>2}: S={S:.0f} -> {S_new:.0f} | "
          f"K={K:.0f} | Premium={c:.0f} | "
          f"P&L={pnl:.0f} | {'ASSIGNED' if assigned else 'expired'}")

    S = min(S_new, K) if assigned else S_new

print(f"\\nTotal Premium Collected: INR {total_premium:,.0f}")
print(f"Total P&L: INR {total_pnl:,.0f}")
print(f"Buy-Hold P&L: INR {S_entry*(np.prod(1+monthly_returns)-1):,.0f}")`}),e.jsx(L,{title:"Monthly Covered Call on HDFC Bank",difficulty:"beginner",problem:"You hold 550 shares of HDFC Bank (1 lot) bought at INR 1650. You sell the 1700 CE for INR 22 with 25 days to expiry. Calculate max profit, breakeven, and annualized yield.",solution:[{step:"Maximum profit per share",formula:"\\text{Max Profit} = K - S_0 + c = 1700 - 1650 + 22 = 72"},{step:"Maximum profit per lot",formula:"72 \\times 550 = \\text{INR } 39,600"},{step:"Breakeven",formula:"\\text{BE} = S_0 - c = 1650 - 22 = 1628"},{step:"Annualized premium yield",formula:"\\text{Yield} = \\frac{22}{1650} \\times \\frac{365}{25} \\times 100 = 19.5\\%",explanation:"This 19.5% annualized yield assumes consistent monthly covered call writing, which is aggressive for HDFC Bank."}]}),e.jsx(S,{title:"Tax Implications in India",type:"tip",children:e.jsx("p",{children:"Under Indian tax law, covered call premium received is treated as business income (taxed at slab rate) if you are a frequent trader. If classified as a capital gain, short-term capital gains tax of 15% applies for F&O profits. The assignment of shares triggers capital gains on the stock sale. Consult a CA for the optimal classification. Zerodha provides a P&L report that separates F&O and equity segments for tax filing."})}),e.jsx(S,{title:"Assignment Risk on NSE",type:"warning",children:e.jsx("p",{children:"Unlike US-style options, most NSE stock options are European-style (no early exercise). However, physical delivery applies to all stock F&O contracts on NSE since October 2019 per SEBI mandate. If your short call expires ITM, you must deliver the shares. Ensure you have the shares in your demat account. Margin requirements increase in the last few days before expiry for physically settled contracts."})})]})}const fe=Object.freeze(Object.defineProperty({__proto__:null,default:$},Symbol.toStringTag,{value:"Module"}));function H(){const[t,C]=h.useState(22e3),[r,w]=h.useState(21500),[a,T]=h.useState(180),l=Array.from({length:41},(i,m)=>19e3+m*200),b=l.map(i=>i-t),d=l.map(i=>Math.max(r-i,0)-a),y=l.map((i,m)=>b[m]+d[m]),g=t-r+a,c=t+a,u=480,p=160,o=50,n=[...b,...y],x=Math.max(...n),P=Math.min(...n),k=i=>p+5-(i-P)/(x-P)*p,s=i=>o+i/(l.length-1)*(u-o);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Protective Put on Nifty 50"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust put strike and premium to visualize the insurance effect on your Nifty position."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Nifty Entry = ",t]}),e.jsx("input",{type:"range",min:"20000",max:"24000",step:"100",value:t,onChange:i=>C(Number(i.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Put Strike = ",r]}),e.jsx("input",{type:"range",min:"19000",max:"23000",step:"100",value:r,onChange:i=>w(Number(i.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Put Premium = ",a]}),e.jsx("input",{type:"range",min:"20",max:"500",step:"10",value:a,onChange:i=>T(Number(i.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:`0 0 ${u+20} ${p+40}`,className:"w-full max-w-2xl mx-auto block","aria-label":"Protective put payoff",children:[e.jsx("line",{x1:o,y1:5,x2:o,y2:p+5,stroke:"#9ca3af",strokeWidth:"1"}),e.jsx("line",{x1:o,y1:k(0),x2:u+10,y2:k(0),stroke:"#9ca3af",strokeWidth:"1",strokeDasharray:"3"}),e.jsx("polyline",{points:b.map((i,m)=>`${s(m)},${k(i)}`).join(" "),fill:"none",stroke:"#94a3b8",strokeWidth:"1.5",strokeDasharray:"4"}),e.jsx("polyline",{points:y.map((i,m)=>`${s(m)},${k(i)}`).join(" "),fill:"none",stroke:"#10b981",strokeWidth:"2.5"}),e.jsx("text",{x:u-20,y:k(b[0])+12,className:"text-[9px]",fill:"#94a3b8",children:"Unhedged"}),e.jsx("text",{x:u-40,y:k(y[y.length-1])-5,className:"text-[9px]",fill:"#10b981",children:"Protected"}),e.jsx("text",{x:o+u/2,y:p+30,textAnchor:"middle",className:"text-[10px]",fill:"#9ca3af",children:"Nifty at Expiry"})]}),e.jsxs("div",{className:"mt-3 grid grid-cols-3 gap-3",children:[e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Max Loss"}),e.jsxs("div",{className:"text-lg font-bold text-red-600 dark:text-red-400",children:["INR ",g]})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Breakeven"}),e.jsx("div",{className:"text-lg font-bold text-blue-600 dark:text-blue-400",children:c})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Protection Level"}),e.jsxs("div",{className:"text-lg font-bold text-green-600 dark:text-green-400",children:[((1-r/t)*100).toFixed(1),"% OTM"]})]})]})]})}function U(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Protective Puts"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"A protective put, often called portfolio insurance, combines a long stock (or index) position with a long put option. It creates a price floor below which losses are limited, while preserving unlimited upside. On NSE, institutional investors and mutual funds frequently use Nifty 50 puts to hedge equity portfolios during uncertain periods like general elections, RBI policy changes, or global risk events."}),e.jsx(M,{title:"Protective Put",label:"Definition 7.2",definition:"A protective put consists of a long position in the underlying asset combined with a long put option on the same asset. The put provides downside insurance in exchange for the premium paid.",notation:"\\text{P\\&L} = (S_T - S_0) + [\\max(K - S_T, 0) - p]"}),e.jsx(_.BlockMath,{math:"\\text{Protective Put P\\&L} = \\begin{cases} K - S_0 - p & \\text{if } S_T \\leq K \\\\ S_T - S_0 - p & \\text{if } S_T > K \\end{cases}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:'The protective put is economically equivalent to a long call (by put-call parity) plus holding cash equal to the present value of the strike. This is why it is sometimes called a "synthetic long call."'}),e.jsx(_.BlockMath,{math:"\\text{Max Loss} = S_0 - K + p, \\quad \\text{Breakeven} = S_0 + p"}),e.jsx(E,{title:"Cost of Insurance and Moneyness",label:"Theorem 7.2",statement:"The cost of portfolio insurance (as a percentage of portfolio value) is determined by the put's moneyness and term. For a put struck x\\% below spot with T days to expiry, the approximate premium under BSM is: p/S \\approx \\sigma\\sqrt{T}\\,\\phi(d_1) - x\\,N(-d_2), where x = (S-K)/S is the deductible and \\phi is the standard normal PDF.",proof:"This follows from the BSM put formula P = Ke^{-rT}N(-d_2) - SN(-d_1). Dividing by S and using the approximation for small x gives the result. The first term reflects time-value cost, the second reflects the deductible chosen."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Choosing the Right Put on NSE"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Put Type"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Moneyness"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Cost (% of S)"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Max Loss"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Use Case"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"ATM put"}),e.jsx("td",{className:"px-4 py-2",children:"100%"}),e.jsx("td",{className:"px-4 py-2",children:"2.5-4%"}),e.jsx("td",{className:"px-4 py-2",children:"Premium only"}),e.jsx("td",{className:"px-4 py-2",children:"Full protection"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"3% OTM"}),e.jsx("td",{className:"px-4 py-2",children:"97%"}),e.jsx("td",{className:"px-4 py-2",children:"1.5-2.5%"}),e.jsx("td",{className:"px-4 py-2",children:"3% + premium"}),e.jsx("td",{className:"px-4 py-2",children:"Moderate hedge"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"5% OTM"}),e.jsx("td",{className:"px-4 py-2",children:"95%"}),e.jsx("td",{className:"px-4 py-2",children:"0.8-1.5%"}),e.jsx("td",{className:"px-4 py-2",children:"5% + premium"}),e.jsx("td",{className:"px-4 py-2",children:"Tail-risk hedge"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"10% OTM"}),e.jsx("td",{className:"px-4 py-2",children:"90%"}),e.jsx("td",{className:"px-4 py-2",children:"0.2-0.5%"}),e.jsx("td",{className:"px-4 py-2",children:"10% + premium"}),e.jsx("td",{className:"px-4 py-2",children:"Crash protection"})]})]})]})}),e.jsx(H,{}),e.jsx(V,{title:"protective_put_analysis.py",runnable:!0,code:`import numpy as np
from scipy.stats import norm

def bsm_put(S, K, T, r, sigma):
    d1 = (np.log(S/K) + (r + sigma**2/2)*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    return K*np.exp(-r*T)*norm.cdf(-d2) - S*norm.cdf(-d1)

# Nifty 50 portfolio protection analysis
S = 22000
r = 0.065
sigma = 0.18
portfolio_value = 1_00_00_000  # INR 1 crore Nifty portfolio
nifty_lot = 75

print("=== Portfolio Insurance Cost (INR 1 Cr Nifty Portfolio) ===")
print(f"Nifty Spot: {S:,} | IV: {sigma*100:.0f}% | Rate: {r*100:.1f}%")
print(f"Units held: {portfolio_value/S:.0f} = {portfolio_value/S/nifty_lot:.1f} lots")
print()

for T_days in [7, 15, 30, 60, 90]:
    T = T_days / 365
    print(f"--- {T_days}-Day Protection ---")
    print(f"{'Strike':>8} {'OTM%':>6} {'Put Price':>10} {'Cost/Lot':>10} "
          f"{'Total Cost':>12} {'% Portfolio':>10}")

    for otm_pct in [0, 2, 5, 8, 10]:
        K = S * (1 - otm_pct/100)
        put_price = bsm_put(S, K, T, r, sigma)
        cost_per_lot = put_price * nifty_lot
        units = portfolio_value / S
        total_cost = put_price * units
        pct_cost = total_cost / portfolio_value * 100

        print(f"{K:>8.0f} {otm_pct:>5}% {put_price:>10.2f} "
              f"{cost_per_lot:>10,.0f} {total_cost:>12,.0f} {pct_cost:>9.2f}%")
    print()

# Cost of continuous hedging (rolling monthly puts)
print("=== Annual Cost of Rolling Monthly 5% OTM Puts ===")
annual_cost = 0
for month in range(12):
    T = 30 / 365
    K = S * 0.95
    put_price = bsm_put(S, K, T, r, sigma)
    annual_cost += put_price / S * 100
    print(f"Month {month+1:>2}: Put cost = {put_price:.2f} ({put_price/S*100:.2f}%)")

print(f"\\nTotal annual insurance cost: {annual_cost:.1f}% of portfolio")
print(f"Equivalent to: INR {annual_cost/100 * portfolio_value:,.0f}")
print(f"\\nNote: This is like paying {annual_cost:.1f}% annual 'premium'")
print(f"for floor protection at 95% of portfolio value")`}),e.jsx(L,{title:"Hedging a Nifty Portfolio Before Election Results",difficulty:"intermediate",problem:"An FII holds INR 10 crore in Nifty 50 ETF at 22000. They want to protect against a >5% fall over the next 30 days (election result risk). Nifty 20900 PE is quoted at INR 95. Calculate the hedge cost and the worst-case outcome.",solution:[{step:"Calculate units and lots",formula:"\\text{Units} = \\frac{10,00,00,000}{22,000} = 4,545 \\text{ units} = 60.6 \\text{ lots}",explanation:"Round to 61 lots = 4,575 units for practical purposes."},{step:"Total hedge cost",formula:"\\text{Cost} = 61 \\times 75 \\times 95 = \\text{INR } 4,34,625",explanation:"Cost is 0.43% of portfolio value -- relatively cheap for 30-day crash protection."},{step:"Worst-case outcome",formula:"\\text{Floor} = K - \\text{premium} = 20,900 - 95 = 20,805 \\text{ per unit}"},{step:"Maximum loss",formula:"\\text{Max Loss} = (22,000 - 20,805) \\times 4,575 = \\text{INR } 54,67,125 = 5.47\\%",explanation:"The maximum portfolio loss is capped at ~5.5% regardless of how far Nifty falls."}]}),e.jsx(S,{title:"India VIX and Put Pricing",type:"tip",children:e.jsx("p",{children:"The cost of protective puts is directly tied to India VIX. When VIX is at 12 (calm), a 5% OTM monthly put costs about 0.5% of portfolio. When VIX spikes to 25+ (crisis), the same put costs 2%+. Smart hedgers buy protection when VIX is low (insurance is cheap) rather than scrambling during a crisis when premiums are inflated. Monitor India VIX on NSE's website or through Zerodha Kite for hedging timing decisions."})}),e.jsx(S,{title:"Put Spread as Cheaper Alternative",type:"warning",children:e.jsx("p",{children:"If outright put protection is too expensive, consider a put spread: buy a 5% OTM put and simultaneously sell a 10% OTM put. This caps your protection at the lower strike but reduces the net premium by 40-60%. On NSE, this is particularly efficient because SPAN margining provides margin offset for the spread, and the net debit is smaller. The tradeoff is that protection ceases below the lower strike."})})]})}const be=Object.freeze(Object.defineProperty({__proto__:null,default:U},Symbol.toStringTag,{value:"Module"}));function G(){const[t,C]=h.useState(22e3),[r,w]=h.useState(21500),[a,T]=h.useState(22500),[l,b]=h.useState(1200),[d,y]=h.useState(180),g=l-d,c=Array.from({length:31},(N,v)=>19500+v*200),u=300/365,p=.18,o=.065,n=N=>{const v=.254829592,f=-.284496736,I=1.421413741,R=-1.453152027,D=1.061405429,F=.3275911,B=N<0?-1:1,A=1/(1+F*Math.abs(N)/Math.sqrt(2)),O=1-((((D*A+R)*A+I)*A+f)*A+v)*A*Math.exp(-N*N/2);return .5*(1+B*O)},x=(N,v,f)=>{const I=(Math.log(N/v)+(o+p*p/2)*f)/(p*Math.sqrt(f)),R=I-p*Math.sqrt(f);return N*n(I)-v*Math.exp(-o*f)*n(R)},P=c.map(N=>{const v=x(N,r,u),f=Math.max(N-a,0);return v-l+(d-f)}),k=480,s=160,i=50,m=Math.max(...P),j=Math.min(...P),K=N=>s+5-(N-j)/(m-j)*s,q=N=>i+N/(c.length-1)*(k-i);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Diagonal Spread on Nifty 50"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Long LEAP call (12-month) + Short near-term call (1-month). P&L at short option expiry."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["LEAP Strike = ",r]}),e.jsx("input",{type:"range",min:"19000",max:"23000",step:"100",value:r,onChange:N=>w(Number(N.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Short Strike = ",a]}),e.jsx("input",{type:"range",min:"21000",max:"25000",step:"100",value:a,onChange:N=>T(Number(N.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["LEAP Premium = ",l]}),e.jsx("input",{type:"range",min:"500",max:"3000",step:"50",value:l,onChange:N=>b(Number(N.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Short Premium = ",d]}),e.jsx("input",{type:"range",min:"20",max:"500",step:"10",value:d,onChange:N=>y(Number(N.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:`0 0 ${k+20} ${s+40}`,className:"w-full max-w-2xl mx-auto block","aria-label":"Diagonal spread payoff",children:[e.jsx("line",{x1:i,y1:5,x2:i,y2:s+5,stroke:"#9ca3af",strokeWidth:"1"}),e.jsx("line",{x1:i,y1:K(0),x2:k+10,y2:K(0),stroke:"#9ca3af",strokeWidth:"1",strokeDasharray:"3"}),e.jsx("polyline",{points:P.map((N,v)=>`${q(v)},${K(N)}`).join(" "),fill:"none",stroke:"#8b5cf6",strokeWidth:"2.5"}),e.jsx("text",{x:i+k/2,y:s+30,textAnchor:"middle",className:"text-[10px]",fill:"#9ca3af",children:"Nifty at Short Expiry"})]}),e.jsxs("div",{className:"mt-3 grid grid-cols-2 gap-3",children:[e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Net Debit"}),e.jsxs("div",{className:"text-lg font-bold text-red-600 dark:text-red-400",children:["INR ",g]})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Short/LEAP Ratio"}),e.jsxs("div",{className:"text-lg font-bold text-blue-600 dark:text-blue-400",children:[(d/l*100).toFixed(1),"%"]})]})]})]})}function Y(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"LEAPS and Diagonal Spreads"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"LEAPS (Long-term Equity Anticipation Securities) are options with expiries beyond one year. While NSE does not offer dedicated LEAPS contracts, long-dated monthly options (3-12 months out) serve a similar purpose for Nifty 50 and select liquid stocks. Diagonal spreads combine a long-dated option with a short near-term option at a different strike, exploiting the differential time decay between the two legs."}),e.jsx(M,{title:"Diagonal Spread",label:"Definition 7.3",definition:"A diagonal spread involves buying a longer-dated option at one strike and selling a shorter-dated option at a different strike on the same underlying. It combines features of both calendar spreads (different expiries) and vertical spreads (different strikes).",notation:"\\text{Diagonal} = -C(K_1, T_1) + C(K_2, T_2), \\quad T_2 > T_1, \\; K_2 \\neq K_1"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The diagonal call spread profits from three sources: (1) the short option's time decay (theta), (2) the long option's delta exposure (directional), and (3) changes in implied volatility (vega). The key insight is that the short near-term option decays much faster than the long-dated option."}),e.jsx(_.BlockMath,{math:"\\Theta_{\\text{diagonal}} = \\Theta_{\\text{long}} - |\\Theta_{\\text{short}}| \\approx -|\\Theta_{\\text{short}}| \\quad \\text{(net positive theta)}"}),e.jsx(E,{title:"Theta Ratio in Diagonal Spreads",label:"Theorem 7.3",statement:"The ratio of daily theta between two ATM options with expiries T_1 and T_2 (T_2 > T_1) is approximately \\Theta_1/\\Theta_2 \\approx \\sqrt{T_2/T_1}. This means a 1-month option decays \\sqrt{12} \\approx 3.5 times faster than a 12-month option.",proof:"For ATM options, \\Theta \\propto S\\sigma\\phi(0)/(2\\sqrt{T}) = S\\sigma/(2\\sqrt{2\\pi T}). The ratio is \\Theta_1/\\Theta_2 = \\sqrt{T_2}/\\sqrt{T_1} = \\sqrt{T_2/T_1}."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Poor Man's Covered Call"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:`The diagonal call spread where the long leg is a deep ITM LEAP call is called a "poor man's covered call" because it mimics a covered call with much less capital. Instead of buying shares of Reliance at INR 2500 (requiring INR 6.25 lakh per lot), you buy a deep ITM LEAP call for INR 300-400 per share and sell monthly OTM calls against it.`}),e.jsx(_.BlockMath,{math:"\\text{Capital Required:} \\quad \\text{PMCC} = c_{\\text{LEAP}} \\ll S_0 = \\text{Stock}"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Feature"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Covered Call"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"PMCC (Diagonal)"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Capital needed"}),e.jsx("td",{className:"px-4 py-2",children:"Full stock price"}),e.jsx("td",{className:"px-4 py-2",children:"LEAP premium only"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Max loss"}),e.jsx("td",{className:"px-4 py-2",children:"Stock to zero"}),e.jsx("td",{className:"px-4 py-2",children:"Net debit paid"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Delta"}),e.jsx("td",{className:"px-4 py-2",children:"1 - delta(short)"}),e.jsx("td",{className:"px-4 py-2",children:"delta(LEAP) - delta(short)"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Dividend"}),e.jsx("td",{className:"px-4 py-2",children:"Received"}),e.jsx("td",{className:"px-4 py-2",children:"Not received"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Leverage"}),e.jsx("td",{className:"px-4 py-2",children:"1x"}),e.jsx("td",{className:"px-4 py-2",children:"3-6x"})]})]})]})}),e.jsx(G,{}),e.jsx(V,{title:"diagonal_spread_analysis.py",runnable:!0,code:`import numpy as np
from scipy.stats import norm

def bsm_call(S, K, T, r, sigma):
    if T <= 0:
        return max(S - K, 0)
    d1 = (np.log(S/K) + (r + sigma**2/2)*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    return S*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)

def bsm_greeks(S, K, T, r, sigma):
    if T <= 0:
        return {'delta': 1.0 if S > K else 0.0, 'theta': 0, 'vega': 0}
    d1 = (np.log(S/K) + (r + sigma**2/2)*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    delta = norm.cdf(d1)
    theta = (-S*norm.pdf(d1)*sigma/(2*np.sqrt(T))
             - r*K*np.exp(-r*T)*norm.cdf(d2)) / 365
    vega = S * np.sqrt(T) * norm.pdf(d1) / 100
    return {'delta': delta, 'theta': theta, 'vega': vega}

# Nifty 50 Diagonal Spread (Poor Man's Covered Call)
S = 22000
r = 0.065
sigma = 0.18

# Long: 12-month deep ITM call
K_long = 20000
T_long = 365 / 365
c_long = bsm_call(S, K_long, T_long, r, sigma)

# Short: 1-month OTM call
K_short = 22500
T_short = 30 / 365
c_short = bsm_call(S, K_short, T_short, r, sigma)

net_debit = c_long - c_short

print("=== Nifty 50 Diagonal Spread (PMCC) ===")
print(f"Long:  {K_long} CE 12-month @ {c_long:.2f}")
print(f"Short: {K_short} CE 1-month  @ {c_short:.2f}")
print(f"Net Debit: {net_debit:.2f} per unit")
print(f"Capital per lot: INR {net_debit * 75:,.0f}")
print(f"vs Stock: INR {S * 75:,.0f}")
print(f"Leverage: {S / net_debit:.1f}x")

# Greeks comparison
g_long = bsm_greeks(S, K_long, T_long, r, sigma)
g_short = bsm_greeks(S, K_short, T_short, r, sigma)

print(f"\\n{'Greek':>10} {'Long':>10} {'Short':>10} {'Net':>10}")
print("-" * 44)
for key in ['delta', 'theta', 'vega']:
    net = g_long[key] - g_short[key]
    print(f"{key:>10} {g_long[key]:>10.4f} {g_short[key]:>10.4f} {net:>+10.4f}")

# Rolling simulation: sell monthly calls against LEAP
print(f"\\n=== Rolling Monthly Short Calls (12 months) ===")
total_collected = 0
months = 12
for m in range(months):
    T_remaining = (365 - m * 30) / 365
    K_m = S * 1.02  # 2% OTM each month
    c_m = bsm_call(S, K_m, 30/365, r, sigma)
    total_collected += c_m
    print(f"Month {m+1:>2}: Sell {K_m:.0f} CE @ {c_m:.2f} | "
          f"Cumulative: {total_collected:.2f}")

pct_recovered = total_collected / c_long * 100
print(f"\\nTotal collected: {total_collected:.2f}")
print(f"LEAP cost: {c_long:.2f}")
print(f"Recovered: {pct_recovered:.1f}% of LEAP cost")`}),e.jsx(L,{title:"Poor Man's Covered Call on Nifty",difficulty:"intermediate",problem:"Buy Nifty 20000 CE (12-month) at INR 3200 and sell Nifty 22500 CE (1-month) at INR 150. Compare capital efficiency with a traditional covered call (buying Nifty futures at 22000 + selling 22500 CE).",solution:[{step:"PMCC capital per lot",formula:"\\text{PMCC} = (3200 - 150) \\times 75 = \\text{INR } 2,28,750"},{step:"Traditional covered call capital",formula:"\\text{Traditional} \\approx 22000 \\times 75 \\times 12\\% = \\text{INR } 1,98,000 \\text{ (margin)}",explanation:"Futures margin is ~12% of notional, plus the short call margin is offset by SPAN."},{step:"Max profit comparison",formula:"\\text{PMCC max} = (22500 - 20000 + 150 - 3200) \\times 75 = -550 \\times 75 < 0",explanation:"If stock rises well above 22500, the PMCC nets 2500 - 3050 = -550 loss. But with rolling, monthly premiums compound."},{step:"Monthly premium as % of capital",formula:"\\frac{150 \\times 75}{2,28,750} = 4.9\\% \\text{ monthly return}",explanation:"If the short call expires worthless, the monthly yield is 4.9% on capital deployed."}]}),e.jsx(S,{title:"LEAP Availability on NSE",type:"tip",children:e.jsx("p",{children:"NSE offers monthly Nifty 50 options up to 12 months out, and weekly options for the current and next month. For diagonal spreads, use the far-month contracts (6-12 months) as the long leg. Liquidity drops significantly for options beyond 3 months, so use limit orders and check the bid-ask spread before entering. Bank Nifty long-dated options have even thinner liquidity -- consider Nifty for diagonal strategies."})}),e.jsx(S,{title:"Vega Risk in Diagonals",type:"warning",children:e.jsx("p",{children:"Diagonal spreads are typically net long vega because the long-dated option has much higher vega than the short-dated one. If IV drops after entry (e.g., post-event vol crush after RBI policy or election results), the long LEAP loses more value than the short option gains. To mitigate this, enter diagonals when India VIX is at the lower end of its range (below 14) rather than during high-vol periods."})})]})}const Ne=Object.freeze(Object.defineProperty({__proto__:null,default:Y},Symbol.toStringTag,{value:"Module"}));function Q(){const[t,C]=h.useState("bull-call"),[r,w]=h.useState(21800),[a,T]=h.useState(22200),[l,b]=h.useState(280),[d,y]=h.useState(120),g=Array.from({length:41},(s,i)=>2e4+i*100);let c;t==="bull-call"?c=g.map(s=>{const i=Math.max(s-r,0)-l,m=d-Math.max(s-a,0);return i+m}):t==="bear-put"?c=g.map(s=>{const i=Math.max(a-s,0)-d,m=l-Math.max(r-s,0);return i+m}):t==="bull-put"?c=g.map(s=>{const i=d-Math.max(a-s,0),m=Math.max(r-s,0)-l;return i+m}):c=g.map(s=>{const i=l-Math.max(s-r,0),m=Math.max(s-a,0)-d;return i+m});const u=Math.max(...c),p=Math.min(...c),o=480,n=150,x=50,P=s=>n+5-(s-p)/(u-p)*n,k=s=>x+s/(g.length-1)*(o-x);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Vertical Spreads on Nifty 50"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Select spread type and adjust strikes to visualize the payoff profile."}),e.jsx("div",{className:"mb-4 flex flex-wrap gap-3",children:["bull-call","bear-put","bull-put","bear-call"].map(s=>e.jsxs("label",{className:"flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300",children:[e.jsx("input",{type:"radio",name:"spread",value:s,checked:t===s,onChange:()=>C(s),className:"accent-indigo-500"}),s.split("-").map(i=>i.charAt(0).toUpperCase()+i.slice(1)).join(" ")]},s))}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Lower Strike = ",r]}),e.jsx("input",{type:"range",min:"20000",max:"22000",step:"50",value:r,onChange:s=>w(Number(s.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Upper Strike = ",a]}),e.jsx("input",{type:"range",min:"22000",max:"24000",step:"50",value:a,onChange:s=>T(Number(s.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Lower Premium = ",l]}),e.jsx("input",{type:"range",min:"20",max:"500",step:"10",value:l,onChange:s=>b(Number(s.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Upper Premium = ",d]}),e.jsx("input",{type:"range",min:"10",max:"400",step:"10",value:d,onChange:s=>y(Number(s.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:`0 0 ${o+20} ${n+35}`,className:"w-full max-w-2xl mx-auto block","aria-label":"Vertical spread payoff",children:[e.jsx("line",{x1:x,y1:5,x2:x,y2:n+5,stroke:"#9ca3af",strokeWidth:"1"}),e.jsx("line",{x1:x,y1:P(0),x2:o+10,y2:P(0),stroke:"#9ca3af",strokeWidth:"1",strokeDasharray:"3"}),e.jsx("polyline",{points:c.map((s,i)=>`${k(i)},${P(s)}`).join(" "),fill:"none",stroke:"#6366f1",strokeWidth:"2.5"}),e.jsx("text",{x:x+o/2,y:n+28,textAnchor:"middle",className:"text-[10px]",fill:"#9ca3af",children:"Nifty at Expiry"})]}),e.jsxs("div",{className:"mt-3 grid grid-cols-3 gap-3",children:[e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Max Profit"}),e.jsx("div",{className:"text-lg font-bold text-green-600 dark:text-green-400",children:u})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Max Loss"}),e.jsx("div",{className:"text-lg font-bold text-red-600 dark:text-red-400",children:p})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Risk/Reward"}),e.jsx("div",{className:"text-lg font-bold text-blue-600 dark:text-blue-400",children:Math.abs(p/u).toFixed(2)})]})]})]})}function Z(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Vertical Spreads"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Vertical spreads involve buying and selling options of the same type (calls or puts) with the same expiry but different strikes. They are the most popular multi-leg strategies on NSE, offering defined risk and defined reward. On Zerodha, vertical spreads enjoy margin benefits under SPAN, making them capital-efficient for directional bets on Nifty and Bank Nifty."}),e.jsx(M,{title:"Bull Call Spread",label:"Definition 7.4",definition:"A bull call spread is constructed by buying a call at a lower strike K_1 and selling a call at a higher strike K_2 with the same expiry. It profits when the underlying rises moderately. Maximum profit is (K_2 - K_1) - net debit.",notation:"\\text{P\\&L} = \\max(S_T - K_1, 0) - \\max(S_T - K_2, 0) - (c_1 - c_2)"}),e.jsx(_.BlockMath,{math:"\\text{Bull Call P\\&L} = \\begin{cases} -(c_1 - c_2) & S_T \\leq K_1 \\\\ S_T - K_1 - (c_1 - c_2) & K_1 < S_T < K_2 \\\\ (K_2 - K_1) - (c_1 - c_2) & S_T \\geq K_2 \\end{cases}"}),e.jsx(M,{title:"Bear Put Spread",label:"Definition 7.5",definition:"A bear put spread is constructed by buying a put at a higher strike K_2 and selling a put at a lower strike K_1 with the same expiry. It profits when the underlying falls. Maximum profit is (K_2 - K_1) - net debit.",notation:"\\text{P\\&L} = \\max(K_2 - S_T, 0) - \\max(K_1 - S_T, 0) - (p_2 - p_1)"}),e.jsx(E,{title:"Put-Call Parity for Vertical Spreads",label:"Theorem 7.4",statement:"A bull call spread and a bull put spread at the same strikes have the same terminal payoff profile. They differ only in the upfront cash flow (debit vs. credit): Bull Call debit = (K_2 - K_1)e^{-rT} - Bull Put credit. In practice on NSE, the choice depends on liquidity and bid-ask spreads at each strike.",proof:"By put-call parity at each strike: C_i - P_i = S - K_i e^{-rT}. Subtracting the parity equations at K_1 and K_2: (C_1 - C_2) - (P_1 - P_2) = (K_2 - K_1)e^{-rT}. This shows the bull call debit equals the spread width discounted minus the bull put credit."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Spread Width and Risk-Reward"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Width"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Max Profit"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Max Loss"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Margin (NSE)"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Character"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Narrow (100pt)"}),e.jsx("td",{className:"px-4 py-2",children:"Small"}),e.jsx("td",{className:"px-4 py-2",children:"Small"}),e.jsx("td",{className:"px-4 py-2",children:"~INR 8K"}),e.jsx("td",{className:"px-4 py-2",children:"High probability"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Medium (300pt)"}),e.jsx("td",{className:"px-4 py-2",children:"Moderate"}),e.jsx("td",{className:"px-4 py-2",children:"Moderate"}),e.jsx("td",{className:"px-4 py-2",children:"~INR 22K"}),e.jsx("td",{className:"px-4 py-2",children:"Balanced"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Wide (500pt)"}),e.jsx("td",{className:"px-4 py-2",children:"Large"}),e.jsx("td",{className:"px-4 py-2",children:"Large"}),e.jsx("td",{className:"px-4 py-2",children:"~INR 38K"}),e.jsx("td",{className:"px-4 py-2",children:"Directional bet"})]})]})]})}),e.jsx(Q,{}),e.jsx(V,{title:"vertical_spreads.py",runnable:!0,code:`import numpy as np
from scipy.stats import norm

def bsm_call(S, K, T, r, sigma):
    d1 = (np.log(S/K) + (r + sigma**2/2)*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    return S*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)

def bsm_put(S, K, T, r, sigma):
    d1 = (np.log(S/K) + (r + sigma**2/2)*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    return K*np.exp(-r*T)*norm.cdf(-d2) - S*norm.cdf(-d1)

S, r, sigma, T = 22000, 0.065, 0.18, 15/365
lot_size = 75

# Bull Call Spread: Buy 22000 CE, Sell 22300 CE
K1, K2 = 22000, 22300
c1 = bsm_call(S, K1, T, r, sigma)
c2 = bsm_call(S, K2, T, r, sigma)
debit = c1 - c2

print("=== Nifty Bull Call Spread (15 DTE) ===")
print(f"Buy  {K1} CE @ {c1:.2f}")
print(f"Sell {K2} CE @ {c2:.2f}")
print(f"Net Debit: {debit:.2f} per unit")
print(f"Max Profit: {(K2-K1) - debit:.2f} per unit")
print(f"Max Loss: {debit:.2f} per unit")
print(f"Breakeven: {K1 + debit:.0f}")
print(f"Per lot: Debit={debit*lot_size:,.0f}, Max Profit={(K2-K1-debit)*lot_size:,.0f}")

# Compare all four verticals
print(f"\\n=== All Vertical Spreads at {K1}/{K2} ===")
p1 = bsm_put(S, K1, T, r, sigma)
p2 = bsm_put(S, K2, T, r, sigma)

spreads = {
    'Bull Call': {'debit': c1-c2, 'max_profit': (K2-K1)-(c1-c2), 'bias': 'bullish'},
    'Bear Put': {'debit': p2-p1, 'max_profit': (K2-K1)-(p2-p1), 'bias': 'bearish'},
    'Bull Put': {'debit': -(p2-p1), 'max_profit': p2-p1, 'bias': 'bullish (credit)'},
    'Bear Call': {'debit': -(c1-c2), 'max_profit': c1-c2, 'bias': 'bearish (credit)'},
}

print(f"{'Strategy':<15} {'Net Cost':>10} {'Max Profit':>12} {'Max Loss':>10} {'Bias':<18}")
print("-" * 68)
for name, s in spreads.items():
    max_loss = abs(s['debit']) if s['debit'] > 0 else (K2-K1) - abs(s['debit'])
    print(f"{name:<15} {s['debit']:>10.2f} {s['max_profit']:>12.2f} "
          f"{max_loss:>10.2f} {s['bias']:<18}")

# Probability of profit using BSM
d2_be = (np.log(S/(K1+debit)) + (r-sigma**2/2)*T) / (sigma*np.sqrt(T))
prob_profit = norm.cdf(d2_be)
print(f"\\nBull Call Spread probability of profit: {prob_profit*100:.1f}%")`}),e.jsx(L,{title:"Bull Call Spread Before RBI Policy",difficulty:"beginner",problem:"You expect Nifty to rally 200-300 points after the RBI keeps rates unchanged. Buy Nifty 22000 CE at INR 250, sell 22300 CE at INR 110. Both expire in 7 days. Calculate max profit, max loss, and breakeven.",solution:[{step:"Net debit",formula:"\\text{Debit} = 250 - 110 = 140 \\text{ per unit}"},{step:"Max profit (per lot of 75)",formula:"(K_2 - K_1 - \\text{Debit}) \\times 75 = (300 - 140) \\times 75 = \\text{INR } 12,000"},{step:"Max loss (per lot)",formula:"\\text{Debit} \\times 75 = 140 \\times 75 = \\text{INR } 10,500"},{step:"Breakeven",formula:"K_1 + \\text{Debit} = 22000 + 140 = 22140",explanation:"Nifty needs to close above 22140 for the spread to be profitable."}]}),e.jsx(S,{title:"Credit vs Debit Spreads on NSE",type:"tip",children:e.jsx("p",{children:"Credit spreads (bull put, bear call) collect premium upfront but require margin. On Zerodha, the margin for a Nifty credit spread is roughly equal to the spread width minus the premium collected, multiplied by lot size. Debit spreads require no margin beyond the debit paid. For capital-constrained traders, debit spreads are simpler to manage. For income-oriented traders, credit spreads benefit from theta decay."})}),e.jsx(S,{title:"Slippage and Execution",type:"warning",children:e.jsx("p",{children:"When executing vertical spreads on NSE, enter both legs simultaneously using spread orders (available on some platforms) or execute the less liquid leg first. Nifty options have 50-point strike intervals, so a 100-point wide spread uses adjacent strikes. The bid-ask spread on individual Nifty options is typically 1-3 points for near-month ATM, but widens for far OTM or far-month contracts. Account for 2-4 points of total slippage when evaluating expected returns."})})]})}const je=Object.freeze(Object.defineProperty({__proto__:null,default:Z},Symbol.toStringTag,{value:"Module"}));function J(){const[t,C]=h.useState(22e3),[r,w]=h.useState(300),[a,T]=h.useState(300),[l,b]=h.useState("iron-condor"),d=t-r-200,y=t-r,g=t+a,c=t+a+200,u=.16,p=15/365,o=.065,n=f=>{const I=.254829592,R=-.284496736,D=1.421413741,F=-1.453152027,B=1.061405429,A=.3275911,O=f<0?-1:1,W=1/(1+A*Math.abs(f)/Math.sqrt(2)),z=1-((((B*W+F)*W+D)*W+R)*W+I)*W*Math.exp(-f*f/2);return .5*(1+O*z)},x=(f,I)=>{const R=(Math.log(f/I)+(o+u*u/2)*p)/(u*Math.sqrt(p)),D=R-u*Math.sqrt(p);return f*n(R)-I*Math.exp(-o*p)*n(D)},P=(f,I)=>x(f,I)-f+I*Math.exp(-o*p),k=Array.from({length:61},(f,I)=>t-1500+I*50);let s;if(l==="iron-condor"){const f=P(t,d),I=P(t,y),R=x(t,g),D=x(t,c),F=I-f+(R-D);s=k.map(B=>{const A=Math.max(y-B,0)-Math.max(d-B,0),O=Math.max(B-g,0)-Math.max(B-c,0);return F-A-O})}else{const f=t,I=t-200,R=t+200,D=x(t,I),F=x(t,f),B=x(t,R),A=D-2*F+B;s=k.map(O=>Math.max(O-I,0)-2*Math.max(O-f,0)+Math.max(O-R,0)-A)}const i=Math.max(...s),m=Math.min(...s),j=480,K=150,q=50,N=f=>K+5-(f-m*1.1)/(i*1.1-m*1.1)*K,v=f=>q+f/(k.length-1)*(j-q);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Iron Condor & Butterfly on Nifty 50"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Choose strategy and adjust wing widths around the center price."}),e.jsxs("div",{className:"mb-4 flex gap-4",children:[e.jsxs("label",{className:"flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300",children:[e.jsx("input",{type:"radio",name:"strat",value:"iron-condor",checked:l==="iron-condor",onChange:()=>b("iron-condor"),className:"accent-indigo-500"}),"Iron Condor"]}),e.jsxs("label",{className:"flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300",children:[e.jsx("input",{type:"radio",name:"strat",value:"butterfly",checked:l==="butterfly",onChange:()=>b("butterfly"),className:"accent-indigo-500"}),"Butterfly"]})]}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Center = ",t]}),e.jsx("input",{type:"range",min:"20000",max:"24000",step:"50",value:t,onChange:f=>C(Number(f.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),l==="iron-condor"&&e.jsxs(e.Fragment,{children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Put Wing Width = ",r]}),e.jsx("input",{type:"range",min:"100",max:"800",step:"50",value:r,onChange:f=>w(Number(f.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Call Wing Width = ",a]}),e.jsx("input",{type:"range",min:"100",max:"800",step:"50",value:a,onChange:f=>T(Number(f.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]})]}),e.jsxs("svg",{viewBox:`0 0 ${j+20} ${K+35}`,className:"w-full max-w-2xl mx-auto block","aria-label":"Strategy payoff",children:[e.jsx("line",{x1:q,y1:5,x2:q,y2:K+5,stroke:"#9ca3af",strokeWidth:"1"}),e.jsx("line",{x1:q,y1:N(0),x2:j+10,y2:N(0),stroke:"#9ca3af",strokeWidth:"1",strokeDasharray:"3"}),e.jsx("polyline",{points:s.map((f,I)=>`${v(I)},${N(f)}`).join(" "),fill:"none",stroke:"#6366f1",strokeWidth:"2.5"})]}),e.jsxs("div",{className:"mt-3 grid grid-cols-3 gap-3",children:[e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Max Profit"}),e.jsx("div",{className:"text-lg font-bold text-green-600 dark:text-green-400",children:i.toFixed(0)})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Max Loss"}),e.jsx("div",{className:"text-lg font-bold text-red-600 dark:text-red-400",children:m.toFixed(0)})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Reward/Risk"}),e.jsx("div",{className:"text-lg font-bold text-blue-600 dark:text-blue-400",children:(i/Math.abs(m)).toFixed(2)})]})]})]})}function ee(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Iron Condors and Butterflies"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Iron condors and butterflies are range-bound strategies that profit when the underlying stays within a defined range. They are among the most popular strategies for weekly Nifty and Bank Nifty options on NSE, where traders exploit rapid theta decay on expiry weeks."}),e.jsx(M,{title:"Iron Condor",label:"Definition 7.6",definition:"An iron condor combines a bull put spread and a bear call spread. It involves four options at four strikes: buy OTM put, sell less-OTM put, sell OTM call, buy more-OTM call. All options share the same expiry. Maximum profit is the net credit received.",notation:"\\text{IC} = +P(K_1) - P(K_2) - C(K_3) + C(K_4), \\quad K_1 < K_2 < K_3 < K_4"}),e.jsx(_.BlockMath,{math:"\\text{Max Profit} = \\text{Net Credit}, \\quad \\text{Max Loss} = \\max(K_2 - K_1, K_4 - K_3) - \\text{Credit}"}),e.jsx(M,{title:"Butterfly Spread",label:"Definition 7.7",definition:"A butterfly spread uses three strikes: buy one option at the lower strike, sell two at the middle strike, and buy one at the upper strike. It profits from minimal movement around the center strike. Can be constructed with calls, puts, or a combination (iron butterfly).",notation:"\\text{Butterfly} = C(K-w) - 2C(K) + C(K+w), \\quad \\text{width } w"}),e.jsx(_.BlockMath,{math:"\\text{Butterfly P\\&L} = \\begin{cases} -\\text{debit} & S_T \\leq K-w \\text{ or } S_T \\geq K+w \\\\ S_T - (K-w) - \\text{debit} & K-w < S_T \\leq K \\\\ (K+w) - S_T - \\text{debit} & K < S_T < K+w \\end{cases}"}),e.jsx(E,{title:"Iron Condor as Butterfly Decomposition",label:"Theorem 7.5",statement:"Any iron condor can be decomposed into two butterfly spreads. Conversely, a butterfly is a limiting case of an iron condor where the inner strikes converge. The iron condor profit zone is wider but the maximum profit is smaller than a butterfly centered at the same point.",proof:"An iron condor with strikes K_1 < K_2 < K_3 < K_4 can be written as: IC = Butterfly(K_1, K_2, K_3) + Butterfly(K_2, K_3, K_4) - Vertical(K_2, K_3). As K_2 approaches K_3, the iron condor degenerates into a single butterfly."}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Feature"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Iron Condor"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Butterfly"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Legs"}),e.jsx("td",{className:"px-4 py-2",children:"4 (2 spreads)"}),e.jsx("td",{className:"px-4 py-2",children:"3 (or 4 for iron)"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Profit zone"}),e.jsx("td",{className:"px-4 py-2",children:"Wide"}),e.jsx("td",{className:"px-4 py-2",children:"Narrow (centered)"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Max profit"}),e.jsx("td",{className:"px-4 py-2",children:"Small (credit)"}),e.jsx("td",{className:"px-4 py-2",children:"Larger (wing width - debit)"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Win rate"}),e.jsx("td",{className:"px-4 py-2",children:"Higher (~60-70%)"}),e.jsx("td",{className:"px-4 py-2",children:"Lower (~30-40%)"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Greeks"}),e.jsx("td",{className:"px-4 py-2",children:"Low delta, +theta, -gamma"}),e.jsx("td",{className:"px-4 py-2",children:"Near-zero delta, +theta near K"})]})]})]})}),e.jsx(J,{}),e.jsx(V,{title:"iron_condor_analysis.py",runnable:!0,code:`import numpy as np
from scipy.stats import norm

def bsm_call(S, K, T, r, sigma):
    d1 = (np.log(S/K) + (r+sigma**2/2)*T)/(sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    return S*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)

def bsm_put(S, K, T, r, sigma):
    return bsm_call(S,K,T,r,sigma) - S + K*np.exp(-r*T)

S, r, sigma, T = 22000, 0.065, 0.16, 7/365
lot = 75

# Iron Condor: 21500/21700 put spread + 22300/22500 call spread
K1, K2, K3, K4 = 21500, 21700, 22300, 22500
p1 = bsm_put(S, K1, T, r, sigma)
p2 = bsm_put(S, K2, T, r, sigma)
c3 = bsm_call(S, K3, T, r, sigma)
c4 = bsm_call(S, K4, T, r, sigma)

credit = (p2 - p1) + (c3 - c4)
max_loss = max(K2-K1, K4-K3) - credit
be_lower = K2 - credit
be_upper = K3 + credit

print("=== Weekly Nifty Iron Condor (7 DTE) ===")
print(f"Strikes: {K1}/{K2}/{K3}/{K4}")
print(f"Buy  {K1} PE @ {p1:.2f}")
print(f"Sell {K2} PE @ {p2:.2f}")
print(f"Sell {K3} CE @ {c3:.2f}")
print(f"Buy  {K4} CE @ {c4:.2f}")
print(f"\\nNet Credit: {credit:.2f} per unit")
print(f"Max Profit/lot: INR {credit*lot:,.0f}")
print(f"Max Loss/lot:   INR {max_loss*lot:,.0f}")
print(f"Breakevens: {be_lower:.0f} -- {be_upper:.0f}")
print(f"Profit Range: {(be_upper-be_lower)/S*100:.1f}% of spot")

# Probability of max profit (both OTM at expiry)
d2_put = (np.log(S/K2) + (r-sigma**2/2)*T) / (sigma*np.sqrt(T))
d2_call = (np.log(S/K3) + (r-sigma**2/2)*T) / (sigma*np.sqrt(T))
prob_profit = norm.cdf(d2_call) - norm.cdf(d2_put)
print(f"Probability of max profit: {prob_profit*100:.1f}%")

# Butterfly comparison
print(f"\\n=== Nifty Butterfly at {S} ===")
Km = 22000
w = 200
cl = bsm_call(S, Km-w, T, r, sigma)
cm = bsm_call(S, Km, T, r, sigma)
cu = bsm_call(S, Km+w, T, r, sigma)
debit = cl - 2*cm + cu
max_profit_bf = w - debit

print(f"Strikes: {Km-w}/{Km}/{Km+w}")
print(f"Debit: {debit:.2f}")
print(f"Max Profit: {max_profit_bf:.2f} (at S_T = {Km})")
print(f"Max Loss: {debit:.2f}")
print(f"Per lot: Debit={debit*lot:,.0f}, Max Profit={max_profit_bf*lot:,.0f}")
print(f"Reward/Risk: {max_profit_bf/debit:.1f}x")`}),e.jsx(L,{title:"Weekly Nifty Iron Condor",difficulty:"intermediate",problem:"Sell a Nifty iron condor for Thursday weekly expiry: sell 21700 PE at 28, buy 21500 PE at 15, sell 22300 CE at 25, buy 22500 CE at 12. Nifty is at 22000. Calculate credit, max loss, and breakevens.",solution:[{step:"Net credit received",formula:"\\text{Credit} = (28 - 15) + (25 - 12) = 13 + 13 = 26"},{step:"Max loss",formula:"\\text{Max Loss} = \\max(200, 200) - 26 = 174 \\text{ per unit}"},{step:"Per lot P&L",formula:"\\text{Max Profit/lot} = 26 \\times 75 = \\text{INR } 1,950"},{step:"Breakevens",formula:"\\text{Lower BE} = 21700 - 26 = 21674, \\quad \\text{Upper BE} = 22300 + 26 = 22326",explanation:"Nifty must stay between 21674 and 22326 for full profit. That is a 652-point range or 2.96% of spot."}]}),e.jsx(S,{title:"Weekly Expiry Iron Condors",type:"tip",children:e.jsx("p",{children:"Weekly Nifty iron condors are the bread and butter of many options income traders on NSE. The rapid theta decay in the final 3-4 days makes these highly profitable when Nifty stays range-bound. However, the reward-to-risk ratio is typically 1:6 to 1:8, meaning one losing week can wipe out several weeks of profits. Risk management via stop-losses or adjustment rules is essential for long-term survival."})}),e.jsx(S,{title:"Adjustment Strategies",type:"warning",children:e.jsx("p",{children:"When Nifty threatens to breach a short strike, common adjustments include: (1) rolling the tested side further OTM (costs premium), (2) closing the untested side and opening a new spread closer to the current price, or (3) buying a single option to convert into a different structure. On NSE, adjustments should account for the increased margin requirements during volatile sessions and the wider bid-ask spreads on strikes that have moved from OTM to ATM."})})]})}const ve=Object.freeze(Object.defineProperty({__proto__:null,default:ee},Symbol.toStringTag,{value:"Module"}));function te(){const[t,C]=h.useState(22e3),[r,w]=h.useState(22e3),[a,T]=h.useState(250),[l,b]=h.useState(230),[d,y]=h.useState(!1),[g,c]=h.useState(300),u=d?r-g:r,p=d?r+g:r,o=a+l,n=Array.from({length:51},(v,f)=>19500+f*100),x=n.map(v=>{const f=Math.max(v-p,0)-a,I=Math.max(u-v,0)-l;return f+I}),P=u-o,k=p+o,s=480,i=160,m=50,j=Math.max(...x),K=Math.min(...x),q=v=>i+5-(v-K)/(j-K)*i,N=v=>m+v/(n.length-1)*(s-m);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsxs("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:["Interactive: ",d?"Strangle":"Straddle"," on Nifty 50"]}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Toggle between straddle and strangle. Adjust premiums and width."}),e.jsxs("div",{className:"mb-4 flex gap-4",children:[e.jsxs("label",{className:"flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300",children:[e.jsx("input",{type:"radio",name:"type",checked:!d,onChange:()=>y(!1),className:"accent-indigo-500"}),"Straddle"]}),e.jsxs("label",{className:"flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300",children:[e.jsx("input",{type:"radio",name:"type",checked:d,onChange:()=>y(!0),className:"accent-indigo-500"}),"Strangle"]})]}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Center Strike = ",r]}),e.jsx("input",{type:"range",min:"20000",max:"24000",step:"50",value:r,onChange:v=>w(Number(v.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Call Premium = ",a]}),e.jsx("input",{type:"range",min:"20",max:"600",step:"10",value:a,onChange:v=>T(Number(v.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Put Premium = ",l]}),e.jsx("input",{type:"range",min:"20",max:"600",step:"10",value:l,onChange:v=>b(Number(v.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),d&&e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Width = ",g]}),e.jsx("input",{type:"range",min:"100",max:"800",step:"50",value:g,onChange:v=>c(Number(v.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:`0 0 ${s+20} ${i+35}`,className:"w-full max-w-2xl mx-auto block","aria-label":"Straddle payoff",children:[e.jsx("line",{x1:m,y1:5,x2:m,y2:i+5,stroke:"#9ca3af",strokeWidth:"1"}),e.jsx("line",{x1:m,y1:q(0),x2:s+10,y2:q(0),stroke:"#9ca3af",strokeWidth:"1",strokeDasharray:"3"}),e.jsx("polyline",{points:x.map((v,f)=>`${N(f)},${q(v)}`).join(" "),fill:"none",stroke:"#6366f1",strokeWidth:"2.5"})]}),e.jsxs("div",{className:"mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Total Cost"}),e.jsx("div",{className:"text-lg font-bold text-red-600 dark:text-red-400",children:o})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Lower BE"}),e.jsx("div",{className:"text-sm font-bold text-blue-600 dark:text-blue-400",children:P})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Upper BE"}),e.jsx("div",{className:"text-sm font-bold text-blue-600 dark:text-blue-400",children:k})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Move Needed"}),e.jsxs("div",{className:"text-sm font-bold text-orange-600 dark:text-orange-400",children:[(o/t*100).toFixed(1),"%"]})]})]})]})}function ae(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Straddles and Strangles"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Straddles and strangles are volatility strategies that profit from large moves in either direction. They are direction-agnostic, betting on the magnitude of the move rather than its direction. On NSE, these are heavily traded around high-impact events: Union Budget, RBI policy meetings, quarterly earnings of Nifty heavyweights, and election results."}),e.jsx(M,{title:"Long Straddle",label:"Definition 7.8",definition:"A long straddle involves buying both a call and a put at the same strike price and expiry. It profits when the underlying makes a large move in either direction, beyond the combined premium paid.",notation:"\\text{Straddle P\\&L} = \\max(S_T - K, 0) + \\max(K - S_T, 0) - (c + p) = |S_T - K| - (c + p)"}),e.jsx(_.BlockMath,{math:"\\text{Breakevens:} \\quad K - (c + p) \\quad \\text{and} \\quad K + (c + p)"}),e.jsx(M,{title:"Long Strangle",label:"Definition 7.9",definition:"A long strangle buys an OTM call (strike K_2) and an OTM put (strike K_1 < K_2). It is cheaper than a straddle but requires a larger move to profit. The loss zone (between the strikes minus premiums) is wider.",notation:"\\text{Strangle P\\&L} = \\max(S_T - K_2, 0) + \\max(K_1 - S_T, 0) - (c + p)"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The implied breakeven move for a straddle gives a direct measure of the market's expected range. If a Nifty 22000 straddle costs 480 points (call 250 + put 230), the market implies a move of ",e.jsx(_.InlineMath,{math:"\\pm 480"})," points, or ",e.jsx(_.InlineMath,{math:"\\pm 2.18\\%"}),"."]}),e.jsx(E,{title:"Straddle Price and ATM Volatility",label:"Theorem 7.6",statement:"For an ATM straddle with short maturity, the straddle price is approximately: C_{ATM} + P_{ATM} \\approx S\\sigma\\sqrt{T}\\sqrt{2/\\pi} \\approx 0.798\\,S\\sigma\\sqrt{T}. This provides a quick estimate of the straddle cost from implied volatility and vice versa.",proof:"For ATM options (S = K), d_1 = (r + \\sigma^2/2)T/(\\sigma\\sqrt{T}) \\approx \\sigma\\sqrt{T}/2 for short T. Using Taylor expansion of N(d_1) and N(-d_1) around 0.5, and noting that C + P = 2S\\phi(d_1)\\sigma\\sqrt{T}/(1 + O(\\sqrt{T})), the leading term gives the stated approximation."}),e.jsx(_.BlockMath,{math:"\\sigma_{\\text{implied}} \\approx \\frac{\\text{Straddle Price}}{0.798 \\cdot S \\cdot \\sqrt{T}}"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Feature"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Long Straddle"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Long Strangle"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Short Straddle"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Direction"}),e.jsx("td",{className:"px-4 py-2",children:"Neutral"}),e.jsx("td",{className:"px-4 py-2",children:"Neutral"}),e.jsx("td",{className:"px-4 py-2",children:"Neutral"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Vol view"}),e.jsx("td",{className:"px-4 py-2",children:"Long vol"}),e.jsx("td",{className:"px-4 py-2",children:"Long vol"}),e.jsx("td",{className:"px-4 py-2",children:"Short vol"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Cost"}),e.jsx("td",{className:"px-4 py-2",children:"High debit"}),e.jsx("td",{className:"px-4 py-2",children:"Lower debit"}),e.jsx("td",{className:"px-4 py-2",children:"Credit received"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Max risk"}),e.jsx("td",{className:"px-4 py-2",children:"Premium paid"}),e.jsx("td",{className:"px-4 py-2",children:"Premium paid"}),e.jsx("td",{className:"px-4 py-2",children:"Unlimited"})]})]})]})}),e.jsx(te,{}),e.jsx(V,{title:"straddle_analysis.py",runnable:!0,code:`import numpy as np
from scipy.stats import norm

def bsm_call(S, K, T, r, sigma):
    d1 = (np.log(S/K) + (r+sigma**2/2)*T)/(sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    return S*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)

def bsm_put(S, K, T, r, sigma):
    return bsm_call(S,K,T,r,sigma) - S + K*np.exp(-r*T)

S, r, T = 22000, 0.065, 7/365
lot = 75

# Pre-event vs post-event straddle analysis
print("=== Pre-RBI Policy Straddle Analysis ===")
print(f"Nifty: {S:,} | 7 DTE")

iv_pre = 0.22   # Pre-event elevated IV
iv_post = 0.14  # Post-event IV crush

K = 22000
c_pre = bsm_call(S, K, T, r, iv_pre)
p_pre = bsm_put(S, K, T, r, iv_pre)
straddle_cost = c_pre + p_pre

print(f"\\nPre-event IV: {iv_pre*100:.0f}%")
print(f"ATM Call: {c_pre:.2f} | ATM Put: {p_pre:.2f}")
print(f"Straddle Cost: {straddle_cost:.2f}")
print(f"Per lot: INR {straddle_cost*lot:,.0f}")
print(f"Implied move: +/- {straddle_cost:.0f} pts ({straddle_cost/S*100:.1f}%)")

# Quick formula check
approx = 0.798 * S * iv_pre * np.sqrt(T)
print(f"Quick approximation: {approx:.2f}")

# Post-event scenario analysis
print(f"\\n=== Post-Event P&L Scenarios (IV crush to {iv_post*100:.0f}%) ===")
# Assume event happens next day, T_new = 6/365
T_new = 6 / 365
moves = [-500, -300, -100, 0, 100, 300, 500]

print(f"{'Move':>8} {'S_new':>8} {'Call':>8} {'Put':>8} {'Total':>8} {'P&L':>8}")
print("-" * 52)
for move in moves:
    S_new = S + move
    c_new = bsm_call(S_new, K, T_new, r, iv_post)
    p_new = bsm_put(S_new, K, T_new, r, iv_post)
    total = c_new + p_new
    pnl = total - straddle_cost
    print(f"{move:>+8} {S_new:>8} {c_new:>8.1f} {p_new:>8.1f} "
          f"{total:>8.1f} {pnl:>+8.1f}")

# Strangle comparison
print(f"\\n=== Strangle vs Straddle (Pre-event) ===")
widths = [0, 100, 200, 300, 500]
for w in widths:
    c = bsm_call(S, K+w, T, r, iv_pre)
    p = bsm_put(S, K-w, T, r, iv_pre)
    cost = c + p
    be_pct = (cost + w) / S * 100
    label = "Straddle" if w == 0 else f"Strangle +/-{w}"
    print(f"{label:<20} Cost: {cost:>6.1f} | BE move: {be_pct:.1f}%")`}),e.jsx(L,{title:"Budget Day Straddle on Nifty",difficulty:"intermediate",problem:"Before Union Budget, Nifty 22000 CE trades at 350 and PE at 320 (elevated IV of 24%). Post-budget, IV is expected to crush to 14%. If Nifty moves +200 points, estimate the straddle P&L the next day (6 DTE remaining).",solution:[{step:"Entry cost",formula:"\\text{Straddle} = 350 + 320 = 670 \\text{ per unit}"},{step:"Post-event position value (S=22200, IV=14%, T=6/365)",formula:"C(22200, 22000, 6/365, 14\\%) \\approx 225, \\quad P \\approx 18",explanation:"Call retains intrinsic + some time value, put is nearly worthless."},{step:"P&L",formula:"(225 + 18) - 670 = -427 \\text{ per unit}",explanation:"Despite a 200-point move, the straddle LOSES money because the IV crush from 24% to 14% destroys more value than the move generates. This is the vol crush trap."}]}),e.jsx(S,{title:"The Vol Crush Trap",type:"warning",children:e.jsx("p",{children:"Buying straddles before known events (RBI policy, Budget, elections) is tempting but dangerous. The market prices the expected move into pre-event IV. After the event, IV crushes back to normal levels. Unless the actual move exceeds the implied move, the straddle loses money. On NSE, pre-Budget Nifty IV often reaches 22-28%, but post-Budget it can drop to 13-16% overnight. The move must exceed the straddle cost AFTER adjusting for IV crush."})}),e.jsx(S,{title:"Short Strangles: The Most Popular NSE Strategy",type:"tip",children:e.jsx("p",{children:"Short strangles (selling OTM call + OTM put) are extremely popular on NSE weekly options. Zerodha data shows this is among the top 3 strategies by volume. Sellers collect premium and profit when Nifty stays within the range. However, the unlimited risk profile means a single 3-sigma event (like the COVID crash of March 2020 when Nifty fell 38%) can cause catastrophic losses. Always use defined-risk alternatives (iron condors) or strict stop-losses."})})]})}const ke=Object.freeze(Object.defineProperty({__proto__:null,default:ae},Symbol.toStringTag,{value:"Module"}));function re(){const[t,C]=h.useState(20),[r,w]=h.useState(15),[a,T]=h.useState(22e3),[l,b]=h.useState(15),d=12e-5,y=-12,g=t-r,c=.5*d*a*a*(r/100)*(r/100)/252,u=Math.abs(y),o=(c-u)*l;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Volatility Arbitrage P&L Estimator"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust implied vs realized volatility to estimate P&L from delta-hedged option position on Nifty."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Implied Vol = ",t,"%"]}),e.jsx("input",{type:"range",min:"8",max:"40",step:"1",value:t,onChange:n=>C(Number(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Realized Vol = ",r,"%"]}),e.jsx("input",{type:"range",min:"5",max:"35",step:"1",value:r,onChange:n=>w(Number(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Nifty Spot = ",a]}),e.jsx("input",{type:"range",min:"18000",max:"26000",step:"100",value:a,onChange:n=>T(Number(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Days Held = ",l]}),e.jsx("input",{type:"range",min:"1",max:"30",step:"1",value:l,onChange:n=>b(Number(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Vol Spread"}),e.jsxs("div",{className:`text-lg font-bold ${g>0?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}`,children:[g>0?"+":"",g,"%"]})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Daily Gamma P&L"}),e.jsx("div",{className:"text-sm font-bold text-blue-600 dark:text-blue-400",children:c.toFixed(1)})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Daily Theta Cost"}),e.jsx("div",{className:"text-sm font-bold text-red-600 dark:text-red-400",children:u.toFixed(1)})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Est. Total P&L"}),e.jsx("div",{className:`text-lg font-bold ${o>0?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}`,children:o.toFixed(0)})]})]})]})}function se(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Volatility Arbitrage"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Volatility arbitrage exploits the difference between implied volatility (priced into options) and realized volatility (actual market movement). When IV exceeds expected realized vol, a trader sells options and delta-hedges, collecting the volatility risk premium. This is the core business model of many proprietary trading desks in India trading Nifty and Bank Nifty options on NSE."}),e.jsx(M,{title:"Volatility Risk Premium (VRP)",label:"Definition 7.10",definition:"The volatility risk premium is the systematic difference between implied volatility and subsequently realized volatility. In equity markets like NSE, implied volatility typically exceeds realized volatility, compensating option sellers for bearing tail risk.",notation:"\\text{VRP} = \\sigma_{\\text{implied}} - \\sigma_{\\text{realized}} > 0 \\quad \\text{(on average)}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"On NSE, India VIX (implied vol) has historically traded 3-5 percentage points above subsequently realized Nifty volatility. This persistent premium is the source of returns for systematic volatility sellers."}),e.jsx(E,{title:"Delta-Hedged Option P&L",label:"Theorem 7.7",statement:"The P&L of a delta-hedged long option position over an infinitesimal interval dt is: dP\\&L = \\frac{1}{2}\\Gamma S^2[(\\Delta S/S)^2 - \\sigma_{\\text{imp}}^2\\,dt]. Over the option's life, the cumulative P&L depends on whether realized volatility exceeds implied volatility.",proof:"From the BSM hedge argument, the option P&L minus the hedge P&L equals \\Theta\\,dt + \\frac{1}{2}\\Gamma(\\Delta S)^2. Using the BSM relation \\Theta = -\\frac{1}{2}\\Gamma S^2\\sigma_{\\text{imp}}^2 - rS\\Delta + rC (ignoring interest terms for simplicity), the net P&L is \\frac{1}{2}\\Gamma S^2[(\\Delta S/S)^2 - \\sigma_{\\text{imp}}^2\\,dt]."}),e.jsx(_.BlockMath,{math:"\\text{P\\&L}_{\\text{hedged}} = \\frac{1}{2}\\int_0^T \\Gamma_t S_t^2 \\left(\\sigma_{\\text{realized},t}^2 - \\sigma_{\\text{implied}}^2\\right) dt"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The sign of the P&L depends on the relationship between realized and implied vol:"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Position"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Condition for Profit"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Risk"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Long vol (buy + hedge)"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(_.InlineMath,{math:"\\sigma_R > \\sigma_I"})}),e.jsx("td",{className:"px-4 py-2",children:"Theta drag when vol is low"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Short vol (sell + hedge)"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(_.InlineMath,{math:"\\sigma_R < \\sigma_I"})}),e.jsx("td",{className:"px-4 py-2",children:"Gamma blowup during crashes"})]})]})]})}),e.jsx(re,{}),e.jsx(V,{title:"vol_arb_simulation.py",runnable:!0,code:`import numpy as np
from scipy.stats import norm

np.random.seed(42)

def bsm_call_greeks(S, K, T, r, sigma):
    if T <= 1e-8:
        return max(S-K,0), 1.0 if S>K else 0.0, 0.0, 0.0
    d1 = (np.log(S/K) + (r+sigma**2/2)*T)/(sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    price = S*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)
    delta = norm.cdf(d1)
    gamma = norm.pdf(d1)/(S*sigma*np.sqrt(T))
    theta = (-S*norm.pdf(d1)*sigma/(2*np.sqrt(T)) - r*K*np.exp(-r*T)*norm.cdf(d2))/365
    return price, delta, gamma, theta

# Vol arb: Sell ATM Nifty straddle, delta hedge daily
S0 = 22000
K = 22000
T = 30 / 365
r = 0.065
iv = 0.20       # Implied vol at entry (what we sell)
rv = 0.14       # True realized vol (our forecast)
N_days = 30
dt = 1 / 365
lot = 75

# Entry: sell straddle at implied vol
c0, d_c, _, _ = bsm_call_greeks(S0, K, T, r, iv)
p0 = c0 - S0 + K * np.exp(-r*T)
premium = (c0 + p0) * lot

# Simulate GBM path with realized vol
S = S0
hedge_pos = 0  # shares held for delta hedge
cash = premium  # Start with premium collected
straddle_delta = d_c + (d_c - 1)  # call delta + put delta
hedge_pos = -straddle_delta * lot  # hedge straddle delta
cash -= hedge_pos * S  # cost of initial hedge

print("=== Volatility Arbitrage: Short Nifty Straddle + Delta Hedge ===")
print(f"Entry: Sell 22000 straddle @ IV={iv*100:.0f}%, Premium={premium:,.0f}")
print(f"Forecast RV: {rv*100:.0f}%")
print(f"\\n{'Day':>4} {'Nifty':>8} {'Delta':>8} {'Hedge':>8} {'Cash':>12}")
print("-" * 46)

daily_pnls = []
for day in range(1, N_days + 1):
    z = np.random.standard_normal()
    S_new = S * np.exp((r - 0.5*rv**2)*dt + rv*np.sqrt(dt)*z)
    T_rem = (N_days - day) / 365

    if T_rem > 1e-8:
        c, d_c, _, _ = bsm_call_greeks(S_new, K, T_rem, r, iv)
        new_delta = (d_c + (d_c - 1)) * lot
    else:
        new_delta = 0

    # Rebalance hedge
    delta_change = -new_delta - hedge_pos
    cash -= delta_change * S_new
    hedge_pos += delta_change

    # Mark-to-market
    if T_rem > 1e-8:
        c_val, _, _, _ = bsm_call_greeks(S_new, K, T_rem, r, iv)
        p_val = c_val - S_new + K*np.exp(-r*T_rem)
        straddle_val = (c_val + p_val) * lot
    else:
        straddle_val = (max(S_new-K,0) + max(K-S_new,0)) * lot

    total = cash + hedge_pos * S_new - straddle_val
    if day % 5 == 0 or day == N_days:
        print(f"{day:>4} {S_new:>8.0f} {new_delta/lot:>8.3f} {hedge_pos:>8.0f} {total:>12,.0f}")

    S = S_new

# Final settlement
final_payoff = (max(S-K,0) + max(K-S,0)) * lot
total_pnl = cash + hedge_pos * S - final_payoff
print(f"\\nFinal P&L: INR {total_pnl:,.0f}")
print(f"Annualized return: {total_pnl/premium*365/N_days*100:.1f}%")
print(f"\\nInterpretation: Sold at {iv*100:.0f}% IV, realized {rv*100:.0f}%")
print(f"Vol spread of {(iv-rv)*100:.0f}% generated INR {total_pnl:,.0f} profit")`}),e.jsx(L,{title:"Vol Arb P&L Estimation",difficulty:"advanced",problem:"You sell an ATM Nifty straddle at 20% IV and delta-hedge continuously. Realized volatility turns out to be 15%. The average Gamma over the trade was 0.00010 and the average spot was 22000. Estimate the P&L over 30 days.",solution:[{step:"Compute annualized P&L integrand",formula:"\\frac{1}{2}\\Gamma S^2(\\sigma_I^2 - \\sigma_R^2) = \\frac{1}{2}(0.0001)(22000^2)(0.04 - 0.0225)",explanation:"The vol arb P&L depends on the difference of squared vols (variances)."},{step:"Evaluate",formula:"= 0.5 \\times 0.0001 \\times 484000000 \\times 0.0175 = 423.5 \\text{ per year}"},{step:"Scale to 30 days",formula:"\\text{P\\&L} \\approx 423.5 \\times \\frac{30}{365} = 34.8 \\text{ per unit}",explanation:"Per Nifty lot (75 units): INR 34.8 x 75 = INR 2,610 profit from the vol spread."}]}),e.jsx(S,{title:"India VIX as Vol Arb Signal",type:"tip",children:e.jsx("p",{children:"A simple vol arb signal on NSE: compare India VIX (30-day implied vol) to trailing 30-day realized volatility of Nifty. When VIX minus RV exceeds its historical median (around 3-4%), the VRP is rich and short vol trades are attractive. When the spread is negative (RV exceeds VIX), long vol positions are indicated. Track this spread daily using data from NSE's website."})}),e.jsx(S,{title:"Path Dependency and Discrete Hedging",type:"warning",children:e.jsx("p",{children:"In practice, delta hedging is done discretely (every few minutes to hourly), not continuously. Discrete hedging introduces path-dependent P&L variance even if the total realized vol matches your forecast. Additionally, transaction costs from frequent Nifty futures rebalancing erode profits. The optimal hedge frequency balances gamma P&L capture against transaction costs. Most Indian prop desks hedge at time-based intervals (every 15-30 minutes) or delta thresholds (when delta drifts by a preset amount)."})})]})}const _e=Object.freeze(Object.defineProperty({__proto__:null,default:se},Symbol.toStringTag,{value:"Module"}));function ie(){const[t,C]=h.useState(14),[r,w]=h.useState(1.5),[a,T]=h.useState(16),l=[0,1,2,3,4,5,6],b=l.map(n=>n===0?t:t+(a-t)*(1-Math.exp(-.1*n))+r*Math.sqrt(n)),d=480,y=150,g=50,c=Math.max(...b)*1.1,u=Math.min(...b)*.9,p=n=>y+5-(n-u)/(c-u)*y,o=n=>g+n/(l.length-1)*(d-g);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: India VIX Term Structure"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Model the VIX futures term structure by adjusting spot VIX, contango, and mean reversion level."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Spot India VIX = ",t]}),e.jsx("input",{type:"range",min:"8",max:"35",step:"0.5",value:t,onChange:n=>C(Number(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Contango Factor = ",r.toFixed(1)]}),e.jsx("input",{type:"range",min:"-2",max:"4",step:"0.25",value:r,onChange:n=>w(Number(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Mean Level = ",a]}),e.jsx("input",{type:"range",min:"10",max:"25",step:"0.5",value:a,onChange:n=>T(Number(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:`0 0 ${d+20} ${y+40}`,className:"w-full max-w-2xl mx-auto block","aria-label":"VIX term structure",children:[e.jsx("line",{x1:g,y1:5,x2:g,y2:y+5,stroke:"#9ca3af",strokeWidth:"1"}),e.jsx("line",{x1:g,y1:y+5,x2:d+g-g,y2:y+5,stroke:"#9ca3af",strokeWidth:"1"}),e.jsx("polyline",{points:l.map((n,x)=>`${o(x)},${p(b[x])}`).join(" "),fill:"none",stroke:"#6366f1",strokeWidth:"2.5"}),l.map((n,x)=>e.jsxs("g",{children:[e.jsx("circle",{cx:o(x),cy:p(b[x]),r:"4",fill:"#6366f1"}),e.jsx("text",{x:o(x),y:y+22,textAnchor:"middle",className:"text-[9px]",fill:"#9ca3af",children:n===0?"Spot":`M${n}`}),e.jsx("text",{x:o(x),y:p(b[x])-8,textAnchor:"middle",className:"text-[9px]",fill:"#6366f1",children:b[x].toFixed(1)})]},x)),e.jsx("line",{x1:g,y1:p(a),x2:d,y2:p(a),stroke:"#ef4444",strokeWidth:"1",strokeDasharray:"4"}),e.jsx("text",{x:d+5,y:p(a)+3,className:"text-[8px]",fill:"#ef4444",children:"mean"})]}),e.jsx("p",{className:"mt-2 text-center text-sm text-gray-600 dark:text-gray-400",children:r>0?"Contango: futures above spot (normal)":"Backwardation: futures below spot (fear)"})]})}function ne(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"VIX Strategies"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"India VIX, computed by NSE from Nifty 50 option prices, measures the market's 30-day implied volatility expectation. VIX-based strategies exploit the mean-reverting nature of volatility, the persistent contango in VIX futures, and the negative correlation between VIX and Nifty returns. Though India VIX futures have limited liquidity, synthetic VIX exposure can be constructed through Nifty options."}),e.jsx(M,{title:"India VIX",label:"Definition 7.11",definition:"India VIX is a model-free measure of 30-day expected volatility of the Nifty 50 index, computed using the variance swap methodology from near-term and mid-term Nifty option prices across all available strikes.",notation:"\\text{VIX}^2 = \\frac{2}{T}\\sum_i \\frac{\\Delta K_i}{K_i^2}e^{rT}Q(K_i) - \\frac{1}{T}\\left(\\frac{F}{K_0} - 1\\right)^2"}),e.jsx(_.BlockMath,{math:"\\text{India VIX} = 100 \\times \\sqrt{\\frac{2}{T}\\sum_i \\frac{\\Delta K_i}{K_i^2}e^{rT}Q(K_i) - \\frac{1}{T}\\left(\\frac{F}{K_0} - 1\\right)^2}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"India VIX typically ranges from 10 (extreme calm) to 40+ (crisis). Key statistical properties relevant for strategy design:"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Property"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Value"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Strategy Implication"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Mean (10-year)"}),e.jsx("td",{className:"px-4 py-2",children:"~16-18"}),e.jsx("td",{className:"px-4 py-2",children:"Anchor for mean reversion trades"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Nifty correlation"}),e.jsx("td",{className:"px-4 py-2",children:"-0.70 to -0.85"}),e.jsx("td",{className:"px-4 py-2",children:"VIX as portfolio hedge"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Half-life"}),e.jsx("td",{className:"px-4 py-2",children:"~25-40 trading days"}),e.jsx("td",{className:"px-4 py-2",children:"Mean reversion speed"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"VRP (avg)"}),e.jsx("td",{className:"px-4 py-2",children:"3-5 vol points"}),e.jsx("td",{className:"px-4 py-2",children:"Structural short vol edge"})]})]})]})}),e.jsx(E,{title:"VIX Mean Reversion Half-Life",label:"Theorem 7.8",statement:"If VIX follows an Ornstein-Uhlenbeck process dV = \\kappa(\\theta - V)dt + \\xi dW, the expected time for VIX to revert halfway to its long-term mean from any current level is t_{1/2} = \\ln(2)/\\kappa. For India VIX with \\kappa \\approx 4-6 (annualized), this is 40-63 trading days.",proof:"The expected value of the OU process at time t is E[V_t] = \\theta + (V_0 - \\theta)e^{-\\kappa t}. Setting E[V_{t_{1/2}}] - \\theta = \\frac{1}{2}(V_0 - \\theta) gives e^{-\\kappa t_{1/2}} = 1/2, hence t_{1/2} = \\ln(2)/\\kappa."}),e.jsx(ie,{}),e.jsx(V,{title:"vix_strategies.py",runnable:!0,code:`import numpy as np

np.random.seed(42)

# Simulate India VIX using OU process
kappa = 5.0       # Mean reversion speed (annual)
theta = 16.0      # Long-term VIX level
xi = 4.0          # Vol of VIX
V0 = 14.0         # Current VIX
T = 1.0           # 1 year
N_days = 252
dt = T / N_days

print("=== India VIX Simulation (OU Process) ===")
print(f"kappa={kappa}, theta={theta}, xi={xi}, V0={V0}")
print(f"Half-life: {np.log(2)/kappa*252:.0f} trading days")

# Simulate paths
N_sims = 10000
vix_paths = np.zeros((N_sims, N_days + 1))
vix_paths[:, 0] = V0

for t in range(N_days):
    dW = np.random.standard_normal(N_sims) * np.sqrt(dt)
    vix_paths[:, t+1] = (vix_paths[:, t]
        + kappa * (theta - vix_paths[:, t]) * dt
        + xi * dW)
    vix_paths[:, t+1] = np.maximum(vix_paths[:, t+1], 5)  # floor at 5

# Strategy 1: Mean Reversion
print(f"\\n=== Strategy 1: VIX Mean Reversion ===")
entry_level = 12  # Enter long vol when VIX < 12
exit_level = theta  # Exit when VIX returns to mean

total_trades = 0
winning = 0
total_return = 0

for sim in range(N_sims):
    path = vix_paths[sim]
    in_trade = False
    entry_vix = 0

    for day in range(N_days):
        if not in_trade and path[day] < entry_level:
            in_trade = True
            entry_vix = path[day]
        elif in_trade and path[day] >= exit_level:
            pnl_pct = (path[day] - entry_vix) / entry_vix
            total_trades += 1
            total_return += pnl_pct
            if pnl_pct > 0:
                winning += 1
            in_trade = False

if total_trades > 0:
    print(f"Total signals: {total_trades}")
    print(f"Win rate: {winning/total_trades*100:.1f}%")
    print(f"Avg return: {total_return/total_trades*100:.1f}%")

# Strategy 2: Short vol premium harvesting
print(f"\\n=== Strategy 2: Systematic Short Vol (Monthly) ===")
monthly_pnls = []
for sim in range(N_sims):
    path = vix_paths[sim]
    for month in range(12):
        start = month * 21
        end = min(start + 21, N_days)
        if end <= N_days:
            iv = path[start]
            rv = np.std(np.diff(np.log(
                np.maximum(path[start:end+1], 5)))) * np.sqrt(252) * 100
            vrp = iv - rv / 100 * 100
            monthly_pnls.append(vrp)

monthly_pnls = np.array(monthly_pnls)
print(f"Avg monthly VRP: {np.mean(monthly_pnls):.2f} vol pts")
print(f"Win rate: {(monthly_pnls > 0).mean()*100:.1f}%")
print(f"Sharpe: {np.mean(monthly_pnls)/np.std(monthly_pnls)*np.sqrt(12):.2f}")

# VIX percentile analysis
final_vix = vix_paths[:, -1]
percentiles = [5, 25, 50, 75, 95]
print(f"\\n=== VIX Distribution After 1 Year ===")
for p in percentiles:
    print(f"  {p}th percentile: {np.percentile(final_vix, p):.1f}")`}),e.jsx(L,{title:"VIX Mean Reversion Trade",difficulty:"intermediate",problem:"India VIX is at 11 (historically low). Its long-term mean is 16. You implement a synthetic long VIX position by buying Nifty ATM straddles (estimated 1.5x vega multiplier to VIX). If VIX reverts to 14 over the next 30 days, estimate the P&L per lot.",solution:[{step:"VIX change expected",formula:"\\Delta\\text{VIX} = 14 - 11 = +3 \\text{ vol points}"},{step:"ATM Nifty straddle vega (approximate)",formula:"\\text{Vega}_{\\text{straddle}} \\approx 2 \\times 62 = 124 \\text{ per unit per vol point}",explanation:"ATM straddle has roughly 2x the vega of a single option."},{step:"Estimated P&L",formula:"\\text{P\\&L} \\approx 124 \\times 3 \\times 75 / 100 = \\text{INR } 2,790 \\text{ per lot}",explanation:"Dividing by 100 since vega is per 1% vol change. However, theta decay over 30 days will offset some of this gain -- net P&L depends on actual Nifty realized vol during the period."}]}),e.jsx(S,{title:"India VIX Futures",type:"tip",children:e.jsx("p",{children:"NSE launched India VIX futures in 2014, but liquidity has been consistently thin (often less than 1000 contracts/day). For practical VIX exposure, most traders use Nifty ATM straddles or strangles as proxies. The key difference: VIX futures reflect forward expectations and are in contango 80% of the time, while straddles give spot vol exposure plus theta drag. SEBI has been considering VIX options but they are not yet available."})}),e.jsx(S,{title:"VIX Regime Detection",type:"warning",children:e.jsx("p",{children:"VIX-based strategies must account for regime changes. India VIX below 12 might signal complacency (buy protection), while VIX above 25 might signal panic (sell premium). But during sustained bear markets (like 2008 or 2020), VIX can stay elevated for weeks. Using a 60-day percentile rank of VIX as a regime indicator is more robust than fixed thresholds. When VIX rank exceeds the 90th percentile, short vol positions should be reduced or hedged with far-OTM puts."})})]})}const Se=Object.freeze(Object.defineProperty({__proto__:null,default:ne},Symbol.toStringTag,{value:"Module"}));function le(){const[t,C]=h.useState(18),[r,w]=h.useState(28),[a,T]=h.useState(.45),[l,b]=h.useState(10),d=t*t/(r*r),y=a-d;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Nifty 50 Dispersion Trade Analysis"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Compare index implied vol vs constituent stock vols to identify dispersion opportunities."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Nifty IV = ",t,"%"]}),e.jsx("input",{type:"range",min:"8",max:"35",step:"1",value:t,onChange:g=>C(Number(g.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Avg Stock IV = ",r,"%"]}),e.jsx("input",{type:"range",min:"15",max:"50",step:"1",value:r,onChange:g=>w(Number(g.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Realized Correlation = ",a.toFixed(2)]}),e.jsx("input",{type:"range",min:"0.10",max:"0.90",step:"0.05",value:a,onChange:g=>T(Number(g.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Stocks Traded = ",l]}),e.jsx("input",{type:"range",min:"5",max:"30",step:"1",value:l,onChange:g=>b(Number(g.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Implied Corr"}),e.jsx("div",{className:"text-lg font-bold text-purple-600 dark:text-purple-400",children:d.toFixed(3)})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Realized Corr"}),e.jsx("div",{className:"text-lg font-bold text-blue-600 dark:text-blue-400",children:a.toFixed(2)})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Corr Gap"}),e.jsxs("div",{className:`text-lg font-bold ${y>0?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}`,children:[y>0?"+":"",y.toFixed(3)]})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Trade Signal"}),e.jsx("div",{className:`text-sm font-bold ${y>0?"text-green-600 dark:text-green-400":"text-orange-600 dark:text-orange-400"}`,children:y>.05?"SELL INDEX VOL":y<-.05?"BUY INDEX VOL":"NEUTRAL"})]})]})]})}function oe(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Dispersion Trading"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Dispersion trading exploits the difference between index-level implied volatility and the weighted average implied volatility of the index's constituent stocks. The trade is fundamentally a bet on implied correlation versus realized correlation. On NSE, this strategy can be implemented using Nifty 50 index options against options on the top liquid Nifty constituents like Reliance, TCS, HDFC Bank, and Infosys."}),e.jsx(M,{title:"Dispersion Trade",label:"Definition 7.12",definition:"A dispersion trade involves selling index volatility (typically via straddles or variance swaps) and buying single-stock volatility on the index constituents. It profits when the implied correlation between stocks is higher than the realized correlation.",notation:"\\text{P\\&L} \\propto \\rho_{\\text{implied}} - \\rho_{\\text{realized}}"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"The Correlation Trade"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["For an equally-weighted index of ",e.jsx(_.InlineMath,{math:"n"})," stocks with individual volatilities",e.jsx(_.InlineMath,{math:"\\sigma_i"})," and pairwise correlation ",e.jsx(_.InlineMath,{math:"\\rho"}),", the index variance is:"]}),e.jsx(_.BlockMath,{math:"\\sigma_{\\text{index}}^2 = \\frac{1}{n}\\bar{\\sigma}^2 + \\frac{n-1}{n}\\rho\\bar{\\sigma}^2 \\approx \\rho\\,\\bar{\\sigma}^2 \\quad \\text{for large } n"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"This gives us the implied correlation:"}),e.jsx(_.BlockMath,{math:"\\rho_{\\text{implied}} = \\frac{\\sigma_{\\text{index}}^2}{\\bar{\\sigma}_{\\text{stocks}}^2}"}),e.jsx(E,{title:"Correlation Risk Premium",label:"Theorem 7.9",statement:"Implied correlation systematically exceeds realized correlation in equity index markets. This correlation risk premium exists because: (1) index options are bid up for portfolio hedging, inflating index IV, (2) diversification benefit means index vol is always less than constituent vol average, and (3) during crises, correlations spike, making short correlation a concave payoff.",proof:"Empirically, the average implied-realized correlation gap on major equity indices is 5-15 correlation points. Theoretically, index put demand by institutional hedgers creates excess demand for index vol relative to single-stock vol, inflating the index IV and hence implied correlation."}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Component"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Position"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Greek"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"NSE Instrument"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Index leg"}),e.jsx("td",{className:"px-4 py-2",children:"Sell straddle"}),e.jsx("td",{className:"px-4 py-2",children:"Short vega"}),e.jsx("td",{className:"px-4 py-2",children:"Nifty 50 options"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Stock legs"}),e.jsx("td",{className:"px-4 py-2",children:"Buy straddles"}),e.jsx("td",{className:"px-4 py-2",children:"Long vega"}),e.jsx("td",{className:"px-4 py-2",children:"RIL, TCS, HDFC, INFY etc."})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Delta hedge"}),e.jsx("td",{className:"px-4 py-2",children:"Futures"}),e.jsx("td",{className:"px-4 py-2",children:"Flat delta"}),e.jsx("td",{className:"px-4 py-2",children:"Nifty + stock futures"})]})]})]})}),e.jsx(le,{}),e.jsx(V,{title:"dispersion_trading.py",runnable:!0,code:`import numpy as np

np.random.seed(42)

# Nifty 50 top constituents (simplified to 10 stocks)
stocks = {
    'RELIANCE': {'weight': 0.12, 'iv': 28, 'rv': 26},
    'TCS':      {'weight': 0.05, 'iv': 22, 'rv': 20},
    'HDFCBANK': {'weight': 0.09, 'iv': 24, 'rv': 22},
    'INFY':     {'weight': 0.07, 'iv': 26, 'rv': 23},
    'ICICIBANK':{'weight': 0.06, 'iv': 27, 'rv': 25},
    'HINDUNILVR':{'weight': 0.04, 'iv': 20, 'rv': 18},
    'ITC':      {'weight': 0.04, 'iv': 22, 'rv': 19},
    'SBIN':     {'weight': 0.03, 'iv': 32, 'rv': 30},
    'BAJFINANCE':{'weight': 0.03, 'iv': 35, 'rv': 32},
    'LT':       {'weight': 0.03, 'iv': 25, 'rv': 22},
}

# Compute weighted average stock IV and RV
weights = np.array([s['weight'] for s in stocks.values()])
weights = weights / weights.sum()  # renormalize
stock_ivs = np.array([s['iv'] for s in stocks.values()])
stock_rvs = np.array([s['rv'] for s in stocks.values()])

avg_stock_iv = np.sqrt(np.sum(weights * stock_ivs**2))
avg_stock_rv = np.sqrt(np.sum(weights * stock_rvs**2))

nifty_iv = 18  # Nifty 50 ATM IV
nifty_rv = 14  # Nifty 50 realized vol

# Implied and realized correlation
impl_corr = (nifty_iv / avg_stock_iv) ** 2
real_corr = (nifty_rv / avg_stock_rv) ** 2

print("=== Nifty 50 Dispersion Trade Analysis ===")
print(f"\\nNifty IV: {nifty_iv}% | Nifty RV: {nifty_rv}%")
print(f"Avg Stock IV: {avg_stock_iv:.1f}% | Avg Stock RV: {avg_stock_rv:.1f}%")
print(f"\\nImplied Correlation:  {impl_corr:.3f}")
print(f"Realized Correlation: {real_corr:.3f}")
print(f"Correlation Gap:      {impl_corr - real_corr:+.3f}")

# P&L estimation
print(f"\\n=== Per-Stock IV vs RV ===")
print(f"{'Stock':<12} {'Wt':>5} {'IV':>5} {'RV':>5} {'VRP':>5}")
print("-" * 35)
for name, data in stocks.items():
    vrp = data['iv'] - data['rv']
    print(f"{name:<12} {data['weight']:>4.0%} {data['iv']:>4}% {data['rv']:>4}% {vrp:>+4}%")

# Simulate dispersion P&L
print(f"\\n=== Dispersion P&L Simulation (30 days) ===")
T = 30 / 365
N_sims = 5000
pnls = []

for _ in range(N_sims):
    # Generate correlated stock returns
    n = len(stocks)
    corr_matrix = np.eye(n) * (1 - real_corr) + real_corr
    L = np.linalg.cholesky(corr_matrix)
    Z = np.random.standard_normal(n)
    returns = L @ Z * np.array(stock_rvs) / 100 * np.sqrt(T)

    # Index return (weighted sum)
    idx_return = np.sum(weights * returns)

    # P&L: short index vol, long stock vol
    # Simplified: P&L = sum(w_i * |r_i|) - |r_idx| scaled by vega
    stock_pnl = np.sum(weights * np.abs(returns) * stock_ivs)
    index_pnl = np.abs(idx_return) * nifty_iv
    net_pnl = stock_pnl - index_pnl
    pnls.append(net_pnl)

pnls = np.array(pnls)
print(f"Mean P&L:     {np.mean(pnls)*100:.2f}%")
print(f"Std P&L:      {np.std(pnls)*100:.2f}%")
print(f"Win Rate:     {(pnls > 0).mean()*100:.1f}%")
print(f"Sharpe:       {np.mean(pnls)/np.std(pnls)*np.sqrt(12):.2f}")
print(f"Max Drawdown: {np.min(pnls)*100:.2f}%")`}),e.jsx(L,{title:"Simple Dispersion Trade on NSE",difficulty:"advanced",problem:"Nifty IV is 18%, and the cap-weighted average IV of top 5 Nifty stocks is 27%. Implied correlation is (18/27)^2 = 0.444. You estimate realized correlation will be 0.35. Set up the trade and estimate profit if you trade INR 1 crore notional.",solution:[{step:"Confirm dispersion signal",formula:"\\rho_{\\text{impl}} - \\rho_{\\text{real}} = 0.444 - 0.35 = 0.094",explanation:"Implied correlation exceeds realized by 9.4 points -- sell index vol, buy stock vol."},{step:"Index leg: sell Nifty straddle",formula:"\\text{Nifty vega} \\approx 130 \\text{ per lot}. \\text{ Sell } \\frac{1,00,00,000}{22000 \\times 75} \\approx 6 \\text{ lots}"},{step:"Stock legs: buy straddles on top 5 stocks",formula:"\\text{Weight-proportional allocation across RIL, TCS, HDFC, INFY, ICICI}"},{step:"Approximate P&L",formula:"\\text{P\\&L} \\approx \\frac{1}{2}(\\rho_{\\text{impl}} - \\rho_{\\text{real}}) \\times \\bar{\\sigma}^2 \\times \\text{Notional} \\times T",explanation:"With the correlation gap of ~9%, this could generate 0.5-1% of notional over 30 days, but with significant variance."}]}),e.jsx(S,{title:"Practical Challenges on NSE",type:"warning",children:e.jsx("p",{children:"Dispersion trading on NSE faces several hurdles: (1) only ~50 stocks have liquid options in the F&O segment, limiting constituent coverage, (2) stock option bid-ask spreads are wider than Nifty options (5-10 points vs 1-3 points), (3) different lot sizes make weight-matching imprecise, (4) physical settlement of stock options adds delivery risk, and (5) the margin requirement for the multi-leg position is substantial. Only well-capitalized institutional desks can execute this strategy efficiently."})}),e.jsx(S,{title:"Correlation Spikes During Crises",type:"tip",children:e.jsx("p",{children:"The biggest risk in dispersion trading is a correlation spike during market stress. When Nifty crashes (e.g., March 2020), all stocks fall together and correlations surge toward 1.0. This causes the short index vol leg to lose far more than the long stock vol legs gain. Always maintain stop-losses or buy cheap OTM Nifty puts as crash protection. The correlation between India VIX and realized correlation is itself positive -- when vol spikes, correlations spike too."})})]})}const we=Object.freeze(Object.defineProperty({__proto__:null,default:oe},Symbol.toStringTag,{value:"Module"}));function de(){const[t,C]=h.useState(22e3),[r,w]=h.useState(15),[a,T]=h.useState(.18),l=.065,b=r/365,d=c=>{const u=.254829592,p=-.284496736,o=1.421413741,n=-1.453152027,x=1.061405429,P=.3275911,k=c<0?-1:1,s=1/(1+P*Math.abs(c)/Math.sqrt(2)),i=1-((((x*s+n)*s+o)*s+p)*s+u)*s*Math.exp(-c*c/2);return .5*(1+k*i)},y=(c,u)=>{const p=(Math.log(c/u)+(l+a*a/2)*b)/(a*Math.sqrt(b)),o=p-a*Math.sqrt(b);return{call:c*d(p)-u*Math.exp(-l*b)*d(o),delta:d(p)}},g=Array.from({length:11},(c,u)=>t-500+u*100);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Simulated NSE Option Chain"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Observe how the option chain changes with spot, DTE, and IV."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Nifty Spot = ",t]}),e.jsx("input",{type:"range",min:"20000",max:"24000",step:"50",value:t,onChange:c=>C(Number(c.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["DTE = ",r]}),e.jsx("input",{type:"range",min:"1",max:"60",step:"1",value:r,onChange:c=>w(Number(c.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["IV = ",(a*100).toFixed(0),"%"]}),e.jsx("input",{type:"range",min:"0.08",max:"0.40",step:"0.01",value:a,onChange:c=>T(Number(c.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto text-xs border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-3 py-1 text-gray-600 dark:text-gray-400",children:"Call"}),e.jsx("th",{className:"px-3 py-1 text-gray-600 dark:text-gray-400",children:"Delta"}),e.jsx("th",{className:"px-3 py-1 text-gray-600 dark:text-gray-400",children:"Strike"}),e.jsx("th",{className:"px-3 py-1 text-gray-600 dark:text-gray-400",children:"Put"}),e.jsx("th",{className:"px-3 py-1 text-gray-600 dark:text-gray-400",children:"OI (sim)"})]})}),e.jsx("tbody",{children:g.map(c=>{const{call:u,delta:p}=y(t,c),o=u-t+c*Math.exp(-l*b),n=Math.abs(c-t)<=50;return e.jsxs("tr",{className:`border-b border-gray-200 dark:border-gray-700 ${n?"bg-indigo-50 dark:bg-indigo-900/30":""}`,children:[e.jsx("td",{className:"px-3 py-1 text-right text-green-700 dark:text-green-400",children:u.toFixed(1)}),e.jsx("td",{className:"px-3 py-1 text-right text-gray-600 dark:text-gray-400",children:p.toFixed(2)}),e.jsx("td",{className:"px-3 py-1 text-center font-bold text-gray-800 dark:text-gray-200",children:c}),e.jsx("td",{className:"px-3 py-1 text-right text-red-700 dark:text-red-400",children:Math.max(o,.05).toFixed(1)}),e.jsx("td",{className:"px-3 py-1 text-right text-gray-500",children:(Math.random()*1e5+1e4).toFixed(0)})]},c)})})]})})]})}function ce(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Options Data for Backtesting"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Options backtesting requires fundamentally different data than equity backtesting. Instead of a single time series, you need a full option chain -- prices across multiple strikes, expiries, and option types -- at each timestamp. On NSE, this means handling millions of data points for Nifty and Bank Nifty options across weekly and monthly expiries."}),e.jsx(M,{title:"Option Chain Data",label:"Definition 7.13",definition:"An option chain is the complete set of listed call and put prices across all available strikes for a given underlying and expiry date. For backtesting, we need historical option chains -- snapshots of the full chain at each point in time.",notation:"\\{C(K_i, T_j, t), P(K_i, T_j, t)\\} \\quad \\forall \\text{ strikes } K_i, \\text{ expiries } T_j, \\text{ timestamps } t"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"NSE Options Data Sources"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Source"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Frequency"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Cost"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Coverage"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"NSE Bhavcopy"}),e.jsx("td",{className:"px-4 py-2",children:"Daily (EOD)"}),e.jsx("td",{className:"px-4 py-2",children:"Free"}),e.jsx("td",{className:"px-4 py-2",children:"Settlement prices, OI, volume"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"NSE tick data"}),e.jsx("td",{className:"px-4 py-2",children:"Tick-by-tick"}),e.jsx("td",{className:"px-4 py-2",children:"Paid (INR 5-20K/mo)"}),e.jsx("td",{className:"px-4 py-2",children:"Full order book, trades"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Zerodha Kite API"}),e.jsx("td",{className:"px-4 py-2",children:"1-min candles"}),e.jsx("td",{className:"px-4 py-2",children:"INR 2000/mo"}),e.jsx("td",{className:"px-4 py-2",children:"OHLCV, limited history"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Third-party vendors"}),e.jsx("td",{className:"px-4 py-2",children:"Varies"}),e.jsx("td",{className:"px-4 py-2",children:"INR 5-50K/mo"}),e.jsx("td",{className:"px-4 py-2",children:"Cleaned, structured, Greeks"})]})]})]})}),e.jsx(E,{title:"No-Arbitrage Constraints on Option Data",label:"Theorem 7.10",statement:"Valid option chain data must satisfy: (1) Call prices decrease in strike: C(K_1) \\geq C(K_2) if K_1 < K_2, (2) Convexity: C(K_1) - 2C(K_2) + C(K_3) \\geq 0 for K_1 < K_2 < K_3 equally spaced, (3) Put-call parity: C - P = Se^{-qT} - Ke^{-rT} (within bid-ask). Violations indicate data errors or arbitrage opportunities.",proof:"These constraints follow from no-arbitrage pricing theory. Violation of (1) allows a bull spread arbitrage. Violation of (2) allows a butterfly arbitrage. Violation of (3) allows a conversion/reversal arbitrage. In practice, small violations occur due to bid-ask spreads and should be filtered during data cleaning."}),e.jsx(de,{}),e.jsx(V,{title:"options_data_pipeline.py",runnable:!0,code:`import numpy as np
from datetime import datetime, timedelta

# Simulate building an options data pipeline for Nifty
# In production, this would fetch from NSE bhavcopy or a vendor API

def generate_option_chain(spot, T, r, sigma_func, strikes):
    """Generate a synthetic option chain with realistic features."""
    from scipy.stats import norm

    chain = []
    for K in strikes:
        sigma = sigma_func(K, spot)
        sqrt_T = np.sqrt(T)
        d1 = (np.log(spot / K) + (r + sigma**2/2) * T) / (sigma * sqrt_T)
        d2 = d1 - sigma * sqrt_T

        call_mid = spot * norm.cdf(d1) - K * np.exp(-r*T) * norm.cdf(d2)
        put_mid = call_mid - spot + K * np.exp(-r*T)

        # Add realistic bid-ask spread (wider for OTM)
        moneyness = abs(np.log(K/spot))
        spread = max(0.5, 1.0 + moneyness * 50)

        # Simulate OI (higher for ATM)
        oi = int(50000 * np.exp(-moneyness * 20) + np.random.poisson(5000))
        volume = int(oi * np.random.uniform(0.1, 0.5))

        chain.append({
            'strike': K,
            'call_bid': max(0.05, call_mid - spread/2),
            'call_ask': call_mid + spread/2,
            'call_mid': call_mid,
            'put_bid': max(0.05, put_mid - spread/2),
            'put_ask': put_mid + spread/2,
            'put_mid': put_mid,
            'iv': sigma * 100,
            'oi': oi,
            'volume': volume,
        })
    return chain

# Generate chain
spot = 22000
r = 0.065
T = 15 / 365
strikes = np.arange(20500, 23600, 100)

# Realistic IV smile (skew)
def iv_func(K, S):
    m = np.log(K / S)
    return np.clip(0.18 - 0.12*m + 0.03*m**2, 0.08, 0.50)

chain = generate_option_chain(spot, T, r, iv_func, strikes)

print("=== Nifty 50 Option Chain (Simulated, 15 DTE) ===")
print(f"Spot: {spot:,} | DTE: 15")
print(f"\\n{'Strike':>8} {'Call Bid':>9} {'Call Ask':>9} {'IV':>6} "
      f"{'Put Bid':>9} {'Put Ask':>9} {'OI':>8}")
print("-" * 65)
for row in chain[::3]:  # every 3rd strike
    print(f"{row['strike']:>8.0f} {row['call_bid']:>9.1f} {row['call_ask']:>9.1f} "
          f"{row['iv']:>5.1f}% {row['put_bid']:>9.1f} {row['put_ask']:>9.1f} "
          f"{row['oi']:>8,}")

# Data quality checks
print(f"\\n=== Data Quality Checks ===")
calls = [r['call_mid'] for r in chain]
puts = [r['put_mid'] for r in chain]
stks = [r['strike'] for r in chain]

# Check monotonicity
mono_violations = sum(1 for i in range(len(calls)-1) if calls[i] < calls[i+1])
print(f"Call monotonicity violations: {mono_violations}")

# Check convexity (butterfly condition)
conv_violations = 0
for i in range(1, len(calls)-1):
    butterfly = calls[i-1] - 2*calls[i] + calls[i+1]
    if butterfly < -0.5:  # allow small tolerance
        conv_violations += 1
print(f"Convexity violations: {conv_violations}")

# Check put-call parity
parity_errors = []
for row in chain:
    parity = row['call_mid'] - row['put_mid'] - spot + row['strike'] * np.exp(-r*T)
    parity_errors.append(abs(parity))
print(f"Max put-call parity error: {max(parity_errors):.4f}")
print(f"Mean parity error: {np.mean(parity_errors):.4f}")
print(f"\\nData points: {len(chain)} strikes x 2 types = {len(chain)*2}")`}),e.jsx(L,{title:"Detecting Stale Quotes in NSE Data",difficulty:"intermediate",problem:"You notice that the Nifty 21000 PE has a last traded price of INR 8 but the theoretical value (BSM with current IV) is INR 2. The option has only 50 contracts of OI. Should you use this data point in your backtest?",solution:[{step:"Check for staleness indicators",formula:"\\text{LTP} = 8, \\quad \\text{Theoretical} = 2, \\quad \\text{Ratio} = 4\\times",explanation:"A 4x discrepancy between LTP and theoretical price is a strong staleness signal."},{step:"Check liquidity",formula:"\\text{OI} = 50 \\text{ contracts}, \\quad \\text{Volume} \\approx 0",explanation:"Very low OI and zero volume confirm this is a stale quote from a previous session."},{step:"Decision",formula:"\\text{Exclude or use theoretical price}",explanation:"Either exclude this strike from the backtest or replace with BSM-implied mid-price using the IV surface. Using stale quotes creates unrealistic fill assumptions and inflates backtest returns."}]}),e.jsx(S,{title:"Data Storage for Options",type:"tip",children:e.jsx("p",{children:"NSE Nifty options generate ~500 strike-expiry combinations per day. With bid, ask, LTP, volume, OI for calls and puts, that is ~6,000 data points daily for EOD data. For minute-level data, multiply by 375 minutes per session = 2.25 million rows/day. Use columnar storage (Parquet) or time-series databases (InfluxDB, TimescaleDB). For Python backtesting, store data in HDF5 or Parquet and load using pandas with appropriate indexing on (date, strike, expiry, option_type)."})}),e.jsx(S,{title:"Common Data Pitfalls",type:"warning",children:e.jsx("p",{children:"Options backtesting data on NSE is plagued by: (1) stale last-traded prices for illiquid strikes, (2) missing data during market halts (circuit breakers), (3) lot size changes by SEBI (Nifty changed from 75 to 50 and back), (4) contract specification changes (European vs American, cash vs physical settlement), and (5) the introduction of weekly expiries in 2019. Always validate your data against these known structural breaks."})})]})}const Te=Object.freeze(Object.defineProperty({__proto__:null,default:ce},Symbol.toStringTag,{value:"Module"}));function pe(){const[t,C]=h.useState(65),[r,w]=h.useState(30),[a,T]=h.useState(80),[l,b]=h.useState(4),d=t/100*r-(100-t)/100*a,y=d*l,g=y*12,c=t/100-(100-t)/100/(r/a),u=12,p=[1e5];for(let m=0;m<u;m++)p.push(p[p.length-1]+y*75);const o=480,n=140,x=50,P=Math.max(...p),k=Math.min(...p),s=m=>n+5-(m-k*.95)/(P*1.05-k*.95)*n,i=m=>x+m/u*(o-x);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Options Strategy Backtest Metrics"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust win rate, average win/loss to see strategy expectancy for a weekly Nifty iron condor."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Win Rate = ",t,"%"]}),e.jsx("input",{type:"range",min:"30",max:"90",step:"1",value:t,onChange:m=>C(Number(m.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Avg Win = INR ",r,"/unit"]}),e.jsx("input",{type:"range",min:"10",max:"100",step:"5",value:r,onChange:m=>w(Number(m.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Avg Loss = INR ",a,"/unit"]}),e.jsx("input",{type:"range",min:"30",max:"300",step:"10",value:a,onChange:m=>T(Number(m.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Trades/Month = ",l]}),e.jsx("input",{type:"range",min:"1",max:"12",step:"1",value:l,onChange:m=>b(Number(m.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:`0 0 ${o+20} ${n+35}`,className:"w-full max-w-2xl mx-auto block","aria-label":"Equity curve",children:[e.jsx("line",{x1:x,y1:5,x2:x,y2:n+5,stroke:"#9ca3af",strokeWidth:"1"}),e.jsx("line",{x1:x,y1:n+5,x2:o+x-x,y2:n+5,stroke:"#9ca3af",strokeWidth:"1"}),e.jsx("polyline",{points:p.map((m,j)=>`${i(j)},${s(m)}`).join(" "),fill:"none",stroke:d>0?"#10b981":"#ef4444",strokeWidth:"2.5"})]}),e.jsxs("div",{className:"mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Expectancy/trade"}),e.jsxs("div",{className:`text-lg font-bold ${d>0?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}`,children:[d>0?"+":"",d.toFixed(1)]})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Monthly P&L/lot"}),e.jsxs("div",{className:"text-sm font-bold text-blue-600 dark:text-blue-400",children:["INR ",(y*75).toFixed(0)]})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Annual P&L/lot"}),e.jsxs("div",{className:"text-sm font-bold text-purple-600 dark:text-purple-400",children:["INR ",(g*75).toFixed(0)]})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Kelly %"}),e.jsxs("div",{className:"text-sm font-bold text-orange-600 dark:text-orange-400",children:[(c*100).toFixed(1),"%"]})]})]})]})}function xe(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Options Backtest Engine"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Building an options backtest engine is substantially more complex than a stock backtest. You must handle multi-dimensional data (strikes, expiries), model Greeks evolution, account for assignment and exercise, and properly simulate fills with bid-ask spreads. This section covers the architecture of a robust options backtesting framework for NSE Nifty strategies."}),e.jsx(M,{title:"Options Backtest Engine",label:"Definition 7.14",definition:"An options backtest engine simulates the execution of options trading strategies on historical data, tracking positions across multiple strikes and expiries, managing Greeks exposure, handling expiration and assignment, and computing realistic P&L including transaction costs and margin.",notation:"\\text{P\\&L}_t = \\sum_{i \\in \\text{positions}} n_i \\cdot [\\text{Price}_t(K_i, T_i) - \\text{Entry}(K_i, T_i)] - \\text{Costs}"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Engine Architecture"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Component"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Responsibility"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Key Challenges"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Data Feed"}),e.jsx("td",{className:"px-4 py-2",children:"Load option chains per timestamp"}),e.jsx("td",{className:"px-4 py-2",children:"Missing strikes, stale quotes"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Strategy Logic"}),e.jsx("td",{className:"px-4 py-2",children:"Entry/exit signal generation"}),e.jsx("td",{className:"px-4 py-2",children:"Strike selection, roll logic"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Execution Model"}),e.jsx("td",{className:"px-4 py-2",children:"Fill simulation with slippage"}),e.jsx("td",{className:"px-4 py-2",children:"Bid-ask, partial fills, OI limits"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Position Manager"}),e.jsx("td",{className:"px-4 py-2",children:"Track multi-leg positions"}),e.jsx("td",{className:"px-4 py-2",children:"Expiry handling, assignment"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Risk/Margin"}),e.jsx("td",{className:"px-4 py-2",children:"SPAN margin computation"}),e.jsx("td",{className:"px-4 py-2",children:"Intraday margin calls"})]})]})]})}),e.jsx(E,{title:"Transaction Cost Impact on Options Strategies",label:"Theorem 7.11",statement:"For a credit spread strategy with expected return E[R] per trade, the break-even number of legs is: n_{\\max} = E[R] \\times \\text{lot size} / (2 \\times \\text{cost per leg}). On NSE with INR 20 brokerage per order, STT of 0.05% on sell premium, and typical 2-point slippage, a 4-leg iron condor incurs approximately INR 600-900 per lot in total costs.",proof:"Total cost per iron condor: 4 legs x INR 20 brokerage = INR 80. STT on 2 sell legs: 0.0005 x premium x lot_size x 2. Slippage: 2 points x 4 legs x lot_size / 2 (average). For typical Nifty premiums and lot size 75, this sums to INR 600-900."}),e.jsx(pe,{}),e.jsx(V,{title:"options_backtest_engine.py",runnable:!0,code:`import numpy as np
from scipy.stats import norm
from dataclasses import dataclass
from typing import List

@dataclass
class OptionPosition:
    strike: float
    expiry_days: int
    option_type: str  # 'call' or 'put'
    quantity: int     # positive = long, negative = short
    entry_price: float

def bsm_price(S, K, T, r, sigma, opt_type='call'):
    if T <= 0:
        if opt_type == 'call':
            return max(S - K, 0)
        return max(K - S, 0)
    d1 = (np.log(S/K) + (r+sigma**2/2)*T)/(sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    if opt_type == 'call':
        return S*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)
    return K*np.exp(-r*T)*norm.cdf(-d2) - S*norm.cdf(-d1)

class OptionsBacktester:
    def __init__(self, initial_capital=500000, lot_size=75):
        self.capital = initial_capital
        self.lot_size = lot_size
        self.positions: List[OptionPosition] = []
        self.trade_log = []
        self.equity_curve = [initial_capital]

    def enter_iron_condor(self, spot, strikes, premiums, day):
        """Enter a 4-leg iron condor."""
        K1, K2, K3, K4 = strikes
        p1, p2, p3, p4 = premiums

        # Slippage model: 2 points per leg
        slippage = 2

        self.positions = [
            OptionPosition(K1, 7, 'put', 1, p1 + slippage),    # buy OTM put
            OptionPosition(K2, 7, 'put', -1, p2 - slippage),   # sell put
            OptionPosition(K3, 7, 'call', -1, p3 - slippage),  # sell call
            OptionPosition(K4, 7, 'call', 1, p4 + slippage),   # buy OTM call
        ]

        credit = (p2 - p1 + p3 - p4 - 4 * slippage)
        brokerage = 4 * 20  # INR 20 per leg
        stt = 0.0005 * (p2 + p3) * self.lot_size  # STT on sells
        total_cost = brokerage + stt

        self.trade_log.append({
            'day': day, 'type': 'ENTRY', 'credit': credit,
            'cost': total_cost, 'spot': spot
        })
        return credit, total_cost

    def settle(self, spot, day):
        """Settle all positions at expiry."""
        total_pnl = 0
        for pos in self.positions:
            if pos.option_type == 'call':
                settle_val = max(spot - pos.strike, 0)
            else:
                settle_val = max(pos.strike - spot, 0)

            pnl = pos.quantity * (pos.entry_price - settle_val) * self.lot_size
            total_pnl += pnl

        self.capital += total_pnl
        self.equity_curve.append(self.capital)
        self.trade_log.append({
            'day': day, 'type': 'SETTLE', 'pnl': total_pnl, 'spot': spot
        })
        self.positions = []
        return total_pnl

# Run backtest: Weekly Nifty Iron Condor
np.random.seed(42)
bt = OptionsBacktester(initial_capital=500000)

S = 22000
r = 0.065
sigma = 0.16
n_weeks = 52

print("=== Weekly Nifty Iron Condor Backtest (1 Year) ===")
print(f"Initial Capital: INR {bt.capital:,}")
print(f"Strategy: Sell 300-pt wide IC, 200-pt wings")
print()

weekly_pnls = []
for week in range(n_weeks):
    # Simulate weekly Nifty return
    weekly_return = np.random.normal(0.001, sigma/np.sqrt(52))
    S_new = S * (1 + weekly_return)

    # Set up iron condor 300 pts from spot
    K1 = round(S/50)*50 - 500
    K2 = round(S/50)*50 - 300
    K3 = round(S/50)*50 + 300
    K4 = round(S/50)*50 + 500

    # Price options
    T = 7/365
    p1 = bsm_price(S, K1, T, r, sigma, 'put')
    p2 = bsm_price(S, K2, T, r, sigma, 'put')
    p3 = bsm_price(S, K3, T, r, sigma, 'call')
    p4 = bsm_price(S, K4, T, r, sigma, 'call')

    credit, cost = bt.enter_iron_condor(S, [K1,K2,K3,K4], [p1,p2,p3,p4], week)
    pnl = bt.settle(S_new, week)
    weekly_pnls.append(pnl)

    if (week+1) % 13 == 0:
        print(f"Q{(week+1)//13}: Capital={bt.capital:>10,.0f} | "
              f"Nifty={S_new:>8,.0f} | Q-PnL={sum(weekly_pnls[-13:]):>8,.0f}")

    S = S_new

pnls = np.array(weekly_pnls)
print(f"\\n=== Performance Summary ===")
print(f"Final Capital: INR {bt.capital:,}")
print(f"Total P&L: INR {bt.capital - 500000:,}")
print(f"Win Rate: {(pnls > 0).mean()*100:.1f}%")
print(f"Avg Win: INR {pnls[pnls>0].mean():,.0f}")
print(f"Avg Loss: INR {pnls[pnls<0].mean():,.0f}")
print(f"Sharpe: {np.mean(pnls)/np.std(pnls)*np.sqrt(52):.2f}")
print(f"Max Drawdown: INR {min(np.minimum.accumulate(np.cumsum(pnls)) - np.cumsum(pnls)):,.0f}")`}),e.jsx(L,{title:"Computing Fill Price for a Nifty Spread",difficulty:"intermediate",problem:"You want to enter a Nifty 21800/22200 bull call spread. The 21800 CE shows bid=285, ask=290. The 22200 CE shows bid=118, ask=122. What is the realistic entry cost per unit?",solution:[{step:"Buy the 21800 CE at the ask",formula:"\\text{Pay} = 290 \\text{ (ask price, lifting the offer)}"},{step:"Sell the 22200 CE at the bid",formula:"\\text{Receive} = 118 \\text{ (bid price, hitting the bid)}"},{step:"Net debit with realistic fills",formula:"\\text{Debit} = 290 - 118 = 172 \\text{ per unit}",explanation:"vs. mid-to-mid: (287.5 - 120) = 167.5. The bid-ask slippage costs 4.5 points (2.7% of the spread cost). This is why many backtesters underestimate transaction costs."}]}),e.jsx(S,{title:"Realistic Fill Modeling",type:"warning",children:e.jsx("p",{children:"The single biggest source of backtest overfitting in options strategies is unrealistic fill assumptions. Never assume mid-price fills. For Nifty ATM options, use mid plus 1-2 point slippage. For 500+ point OTM options, use 3-5 points or the bid/ask directly. For Bank Nifty, add 50% more slippage. Model the cost of all legs entering and exiting. A 4-leg iron condor with 2-point slippage per leg costs 16 points round-trip per unit, which can exceed the total credit on a narrow condor."})}),e.jsx(S,{title:"Margin-Aware Backtesting",type:"tip",children:e.jsx("p",{children:"Options strategies on NSE require margin under the SPAN framework. A short straddle requires approximately INR 1.5-2 lakh margin per lot. An iron condor requires less (~INR 30-50K). Your backtest must track margin requirements and reject trades that exceed available capital. SEBI peak margin rules mean intraday margin must be maintained at all times, not just at EOD. Use NSE SPAN calculator data for historically accurate margin estimates."})})]})}const Ie=Object.freeze(Object.defineProperty({__proto__:null,default:xe},Symbol.toStringTag,{value:"Module"}));function me(){const[t,C]=h.useState(1.5),[r,w]=h.useState(200),[a,T]=h.useState(65),[l,b]=h.useState(-1.5),d=t*Math.sqrt(r/52),g=1-.5*(1+Math.tanh(d*.7))<.05,c=Math.max(0,1-.5*Math.abs(l)/t),u=t*c,p=a/100/((100-a)/100)*(1/(1+Math.abs(l)*.3));return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Options Strategy Performance Metrics"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Evaluate statistical significance and risk-adjusted returns of your options backtest."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Sharpe Ratio = ",t.toFixed(1)]}),e.jsx("input",{type:"range",min:"0.1",max:"4.0",step:"0.1",value:t,onChange:o=>C(Number(o.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Total Trades = ",r]}),e.jsx("input",{type:"range",min:"20",max:"1000",step:"10",value:r,onChange:o=>w(Number(o.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Win Rate = ",a,"%"]}),e.jsx("input",{type:"range",min:"30",max:"90",step:"1",value:a,onChange:o=>T(Number(o.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["P&L Skewness = ",l.toFixed(1)]}),e.jsx("input",{type:"range",min:"-4",max:"2",step:"0.1",value:l,onChange:o=>b(Number(o.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"t-Statistic"}),e.jsx("div",{className:`text-lg font-bold ${d>2?"text-green-600 dark:text-green-400":"text-orange-600 dark:text-orange-400"}`,children:d.toFixed(2)})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Significant?"}),e.jsx("div",{className:`text-sm font-bold ${g?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}`,children:g?"YES (p<0.05)":"NO"})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Adjusted Sharpe"}),e.jsx("div",{className:"text-lg font-bold text-purple-600 dark:text-purple-400",children:u.toFixed(2)})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Profit Factor"}),e.jsx("div",{className:"text-lg font-bold text-blue-600 dark:text-blue-400",children:p.toFixed(2)})]})]})]})}function he(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Options Strategy Performance Analysis"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Evaluating options strategy performance requires metrics beyond simple returns and Sharpe ratios. Options P&L distributions are typically non-normal -- short premium strategies show negative skewness (many small wins, few large losses), while long premium strategies show positive skewness. Standard performance metrics can be misleading without adjustments."}),e.jsx(M,{title:"Sortino Ratio",label:"Definition 7.15",definition:"The Sortino ratio measures risk-adjusted return using only downside deviation rather than total standard deviation. It is more appropriate for options strategies where upside volatility is desirable.",notation:"\\text{Sortino} = \\frac{R_p - R_f}{\\sigma_{\\text{downside}}}, \\quad \\sigma_{\\text{downside}} = \\sqrt{\\frac{1}{n}\\sum_{r_i < R_f}(r_i - R_f)^2}"}),e.jsx(M,{title:"Profit Factor",label:"Definition 7.16",definition:"Profit factor is the ratio of gross profits to gross losses. A profit factor above 1.0 indicates a profitable strategy. For short premium strategies on NSE, a typical profit factor is 1.2-1.8.",notation:"\\text{PF} = \\frac{\\sum \\text{Winning Trades}}{\\sum |\\text{Losing Trades}|}"}),e.jsx(E,{title:"Adjusted Sharpe Ratio for Non-Normal Returns",label:"Theorem 7.12",statement:"For return distributions with skewness S_3 and excess kurtosis S_4, the Pezier-White adjusted Sharpe ratio is: SR_{\\text{adj}} = SR \\times [1 + \\frac{S_3}{6}SR - \\frac{S_4 - 3}{24}SR^2]. This penalizes strategies with negative skewness (like short premium) and rewards positive skewness.",proof:"The adjustment derives from the Cornish-Fisher expansion of the quantile function for non-normal distributions. By expressing the certainty equivalent return as a function of higher moments and equating to the risk-free rate, the adjusted Sharpe ratio emerges naturally."}),e.jsx(_.BlockMath,{math:"\\text{SR}_{\\text{adj}} = \\text{SR} \\times \\left[1 + \\frac{S_3}{6}\\text{SR} - \\frac{S_4 - 3}{24}\\text{SR}^2\\right]"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Key Metrics for Options Strategies"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Metric"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Formula"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Good Value"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Relevance"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Sharpe Ratio"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(_.InlineMath,{math:"(R_p - R_f)/\\sigma"})}),e.jsx("td",{className:"px-4 py-2",children:"> 1.5"}),e.jsx("td",{className:"px-4 py-2",children:"Risk-adjusted return"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Max Drawdown"}),e.jsx("td",{className:"px-4 py-2",children:"Peak-to-trough decline"}),e.jsx("td",{className:"px-4 py-2",children:"< 15%"}),e.jsx("td",{className:"px-4 py-2",children:"Worst case scenario"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Calmar Ratio"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(_.InlineMath,{math:"R_p / \\text{MaxDD}"})}),e.jsx("td",{className:"px-4 py-2",children:"> 2.0"}),e.jsx("td",{className:"px-4 py-2",children:"Return per drawdown"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Win Rate"}),e.jsx("td",{className:"px-4 py-2",children:"Wins / Total"}),e.jsx("td",{className:"px-4 py-2",children:"Context-dependent"}),e.jsx("td",{className:"px-4 py-2",children:"Strategy character"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Expectancy"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(_.InlineMath,{math:"p \\cdot W - (1-p) \\cdot L"})}),e.jsx("td",{className:"px-4 py-2",children:"> 0"}),e.jsx("td",{className:"px-4 py-2",children:"Average P&L per trade"})]})]})]})}),e.jsx(me,{}),e.jsx(V,{title:"performance_analysis.py",runnable:!0,code:`import numpy as np
from scipy import stats

np.random.seed(42)

def generate_option_strategy_returns(strategy='iron_condor', n=200):
    """Generate realistic P&L for different option strategies."""
    if strategy == 'iron_condor':
        # High win rate, negative skew
        wins = np.random.uniform(15, 35, int(n * 0.68))
        losses = -np.random.uniform(60, 200, n - len(wins))
        returns = np.concatenate([wins, losses])
    elif strategy == 'straddle_buy':
        # Low win rate, positive skew
        losses = -np.random.uniform(30, 80, int(n * 0.60))
        wins = np.random.uniform(50, 400, n - len(losses))
        returns = np.concatenate([wins, losses])
    else:  # vertical spread
        wins = np.random.uniform(20, 80, int(n * 0.55))
        losses = -np.random.uniform(40, 120, n - len(wins))
        returns = np.concatenate([wins, losses])
    np.random.shuffle(returns)
    return returns

def performance_report(returns, name, capital=500000, lot_size=75):
    """Comprehensive performance analysis."""
    pnl = returns * lot_size
    cum_pnl = np.cumsum(pnl)
    equity = capital + cum_pnl

    # Basic stats
    total_return = cum_pnl[-1] / capital * 100
    n_trades = len(returns)
    win_rate = (returns > 0).mean() * 100

    # Sharpe (annualized, assuming weekly trades)
    sharpe = np.mean(returns) / np.std(returns) * np.sqrt(52)

    # Sortino
    downside = returns[returns < 0]
    downside_std = np.std(downside) if len(downside) > 0 else 1
    sortino = np.mean(returns) / downside_std * np.sqrt(52)

    # Skewness and Kurtosis
    skew = stats.skew(returns)
    kurt = stats.kurtosis(returns)

    # Adjusted Sharpe (Pezier-White)
    adj_sharpe = sharpe * (1 + skew/6 * sharpe - (kurt)/24 * sharpe**2)

    # Max Drawdown
    running_max = np.maximum.accumulate(equity)
    drawdowns = (equity - running_max) / running_max * 100
    max_dd = drawdowns.min()

    # Calmar
    annual_return = total_return / (n_trades / 52)  # approximate
    calmar = -annual_return / max_dd if max_dd != 0 else 0

    # Profit Factor
    gross_profit = pnl[pnl > 0].sum()
    gross_loss = abs(pnl[pnl < 0].sum())
    profit_factor = gross_profit / gross_loss if gross_loss > 0 else np.inf

    # Statistical significance
    t_stat = np.mean(returns) / (np.std(returns) / np.sqrt(n_trades))
    p_value = 2 * (1 - stats.t.cdf(abs(t_stat), n_trades - 1))

    print(f"\\n{'='*50}")
    print(f"  {name}")
    print(f"{'='*50}")
    print(f"Trades: {n_trades} | Win Rate: {win_rate:.1f}%")
    print(f"Total P&L: INR {cum_pnl[-1]:>12,.0f} ({total_return:+.1f}%)")
    print(f"Avg Win:  INR {pnl[pnl>0].mean():>8,.0f} | Avg Loss: INR {pnl[pnl<0].mean():>8,.0f}")
    print(f"\\nRisk Metrics:")
    print(f"  Sharpe Ratio:    {sharpe:>8.2f}")
    print(f"  Adjusted Sharpe: {adj_sharpe:>8.2f}")
    print(f"  Sortino Ratio:   {sortino:>8.2f}")
    print(f"  Max Drawdown:    {max_dd:>7.1f}%")
    print(f"  Calmar Ratio:    {calmar:>8.2f}")
    print(f"  Profit Factor:   {profit_factor:>8.2f}")
    print(f"\\nDistribution:")
    print(f"  Skewness:  {skew:>+7.2f} {'(neg skew - tail risk!)' if skew < -0.5 else ''}")
    print(f"  Kurtosis:  {kurt:>+7.2f} {'(fat tails!)' if kurt > 1 else ''}")
    print(f"\\nSignificance:")
    print(f"  t-stat: {t_stat:.2f} | p-value: {p_value:.4f}")
    print(f"  {'SIGNIFICANT (p<0.05)' if p_value < 0.05 else 'NOT SIGNIFICANT'}")

# Compare three option strategies
for strat, name in [
    ('iron_condor', 'Weekly Nifty Iron Condor'),
    ('straddle_buy', 'Pre-Event Long Straddle'),
    ('vertical', 'Directional Bull Call Spread'),
]:
    returns = generate_option_strategy_returns(strat)
    performance_report(returns, name)`}),e.jsx(L,{title:"Is This Iron Condor Backtest Too Good?",difficulty:"advanced",problem:"Your weekly Nifty iron condor backtest shows: Sharpe 2.8, win rate 72%, max drawdown 8%, over 100 trades. The P&L skewness is -2.1. Evaluate whether these results are statistically reliable.",solution:[{step:"Check t-statistic",formula:"t = SR \\times \\sqrt{N/52} = 2.8 \\times \\sqrt{100/52} = 3.88",explanation:"t > 2 suggests statistical significance at the 5% level."},{step:"Adjust Sharpe for negative skewness",formula:"SR_{adj} \\approx 2.8 \\times [1 + \\frac{-2.1}{6}(2.8)] = 2.8 \\times 0.02 = 0.06",explanation:"The heavy negative skew dramatically reduces the adjusted Sharpe! The raw Sharpe of 2.8 is misleading."},{step:"Interpret",formula:"\\text{Adjusted Sharpe} \\ll \\text{Raw Sharpe}",explanation:'With skewness of -2.1, the strategy has significant tail risk that the Sharpe ratio hides. The 72% win rate comes at the cost of occasional large losses. This is a classic "picking up pennies in front of a steamroller" profile. The 100-trade sample may not have experienced a true tail event.'}]}),e.jsx(S,{title:"Minimum Sample Size",type:"warning",children:e.jsx("p",{children:"For weekly options strategies with 52 trades/year, you need at least 2-3 years of data (100-150 trades) for meaningful statistical analysis. With monthly strategies (12/year), you need 5+ years. The Indian options market structure changed significantly in 2019 (weekly expiries) and 2020 (physical settlement), so pre-2019 data may not be representative. Always report confidence intervals alongside point estimates."})}),e.jsx(S,{title:"Regime Analysis",type:"tip",children:e.jsx("p",{children:"Break your backtest into regimes: low vol (India VIX less than 14), normal vol (14-20), and high vol (above 20). Most iron condor strategies show excellent performance in low vol regimes and poor performance in high vol regimes. If your backtest period is dominated by low vol, results will be biased upward. The true test is performance during the March 2020 crash, September 2018 NBFC crisis, or the 2022 rate hike cycle."})})]})}const Pe=Object.freeze(Object.defineProperty({__proto__:null,default:he},Symbol.toStringTag,{value:"Module"}));export{be as a,Ne as b,je as c,ve as d,ke as e,_e as f,Se as g,we as h,Te as i,Ie as j,Pe as k,fe as s};
