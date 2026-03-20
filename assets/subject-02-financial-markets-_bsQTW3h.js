import{j as e,r as f}from"./vendor-DgA46Qmo.js";import{r as t}from"./vendor-katex-C-S70IU0.js";import{D as E,N as w,P as C,E as q,T as F}from"./subject-01-math-foundations-vREfsVbS.js";function O(){const[r,_]=f.useState(10.5),[d,S]=f.useState("all"),n=[{name:"NSE/BSE Equity",open:9.25,close:15.5,preOpen:9,color:"#6366f1",segment:"equity"},{name:"NSE/BSE F&O",open:9.25,close:15.5,preOpen:9,color:"#8b5cf6",segment:"fo"},{name:"MCX Commodity",open:9,close:23.5,preOpen:8.75,color:"#f59e0b",segment:"commodity"},{name:"NSE Currency",open:9,close:17,preOpen:8.75,color:"#22c55e",segment:"currency"},{name:"SGX Nifty",open:6.5,close:23.75,preOpen:6.25,color:"#ef4444",segment:"sgx"}],v=520,i=200,g=120,u=15,y=20,N=35,b=v-g-u,m=i-y-N,a=6,s=24,l=h=>g+(h-a)/(s-a)*b,j=d==="all"?n:n.filter(h=>h.segment===d),x=m/j.length,c=x*.6,p=h=>r>=h.open&&r<=h.close;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Indian Market Trading Hours (IST)"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Explore trading hours across Indian exchanges. Move the time slider to see which markets are open at any given time."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Time (IST): ",Math.floor(r),":",String(Math.round(r%1*60)).padStart(2,"0")]}),e.jsx("input",{type:"range",min:"6",max:"24",step:"0.25",value:r,onChange:h=>_(parseFloat(h.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsx("span",{children:"Filter"}),e.jsxs("select",{value:d,onChange:h=>S(h.target.value),className:"rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200",children:[e.jsx("option",{value:"all",children:"All Exchanges"}),e.jsx("option",{value:"equity",children:"Equity"}),e.jsx("option",{value:"fo",children:"F&O"}),e.jsx("option",{value:"commodity",children:"MCX"}),e.jsx("option",{value:"currency",children:"Currency"}),e.jsx("option",{value:"sgx",children:"SGX Nifty"})]})]})]}),e.jsxs("svg",{viewBox:`0 0 ${v} ${i}`,className:"w-full max-w-xl mx-auto block",children:[e.jsx("line",{x1:l(r),y1:y-5,x2:l(r),y2:y+m+5,stroke:"#ef4444",strokeWidth:"2",strokeDasharray:"4,2"}),[6,8,10,12,14,16,18,20,22,24].map(h=>e.jsxs("text",{x:l(h),y:i-8,textAnchor:"middle",className:"text-[8px]",fill:"#6b7280",children:[h,":00"]},h)),j.map((h,T)=>{const I=y+T*x+x/2,k=p(h);return e.jsxs("g",{children:[e.jsx("text",{x:g-5,y:I+3,textAnchor:"end",className:"text-[9px]",fill:k?h.color:"#9ca3af",children:h.name}),e.jsx("rect",{x:l(h.preOpen),y:I-c/2,width:l(h.open)-l(h.preOpen),height:c,fill:h.color,opacity:"0.2",rx:"2"}),e.jsx("rect",{x:l(h.open),y:I-c/2,width:l(h.close)-l(h.open),height:c,fill:h.color,opacity:k?.7:.3,rx:"2"}),k&&e.jsx("circle",{cx:l(r),cy:I,r:"4",fill:h.color})]},h.name)})]}),e.jsxs("p",{className:"mt-2 text-center text-sm text-gray-600 dark:text-gray-400",children:["At ",Math.floor(r),":",String(Math.round(r%1*60)).padStart(2,"0")," IST,"," ",e.jsx("strong",{children:n.filter(h=>p(h)).length})," of ",n.length," markets are open."]})]})}function P(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Indian Exchanges and Trading Venues"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"India's financial markets operate through a well-regulated exchange infrastructure overseen by SEBI (Securities and Exchange Board of India). Understanding the structure, rules, and mechanics of Indian exchanges is foundational for any quantitative trader."}),e.jsx(E,{title:"National Stock Exchange (NSE)",label:"Definition 1.1",definition:e.jsx(e.Fragment,{children:"The NSE is India's largest stock exchange by trading volume, established in 1992. It operates a fully electronic limit order book (CLOB) with the NEAT (National Exchange for Automated Trading) system. Key indices include the Nifty 50, Nifty Bank, and Nifty IT. The NSE handles approximately 85-90% of equity derivative trading in India."}),notation:e.jsx(e.Fragment,{children:"Trading hours: 9:15 AM -- 3:30 PM IST (equity). Pre-open session: 9:00 -- 9:15 AM. Settlement: T+1 for equities (since 2023)."})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Bombay Stock Exchange (BSE)"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The BSE, established in 1875, is Asia's oldest stock exchange. Its flagship index is the Sensex (S&P BSE 30). While the BSE lists more companies (5,000+), the NSE dominates in liquidity and derivative volumes. The BSE runs the BOLT (BSE Online Trading) system."}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Feature"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"NSE"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"BSE"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"MCX"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2 font-medium",children:"Founded"}),e.jsx("td",{className:"px-4 py-2",children:"1992"}),e.jsx("td",{className:"px-4 py-2",children:"1875"}),e.jsx("td",{className:"px-4 py-2",children:"2003"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2 font-medium",children:"Key Index"}),e.jsx("td",{className:"px-4 py-2",children:"Nifty 50"}),e.jsx("td",{className:"px-4 py-2",children:"Sensex"}),e.jsx("td",{className:"px-4 py-2",children:"MCX iCOMDEX"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2 font-medium",children:"Segments"}),e.jsx("td",{className:"px-4 py-2",children:"Equity, F&O, Currency, Debt"}),e.jsx("td",{className:"px-4 py-2",children:"Equity, F&O, Currency, MF"}),e.jsx("td",{className:"px-4 py-2",children:"Commodity futures/options"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2 font-medium",children:"Trading System"}),e.jsx("td",{className:"px-4 py-2",children:"NEAT"}),e.jsx("td",{className:"px-4 py-2",children:"BOLT"}),e.jsx("td",{className:"px-4 py-2",children:"Proprietary"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2 font-medium",children:"Listed Companies"}),e.jsx("td",{className:"px-4 py-2",children:"~2,100"}),e.jsx("td",{className:"px-4 py-2",children:"~5,500"}),e.jsx("td",{className:"px-4 py-2",children:"~50 commodities"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2 font-medium",children:"Settlement"}),e.jsx("td",{className:"px-4 py-2",children:"T+1"}),e.jsx("td",{className:"px-4 py-2",children:"T+1"}),e.jsx("td",{className:"px-4 py-2",children:"T+1 to T+5"})]})]})]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Market Microstructure: How Indian Exchanges Work"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["Indian exchanges operate a ",e.jsx("strong",{children:"Central Limit Order Book (CLOB)"})," model. All orders are visible in the order book, and matching follows strict price-time priority. Unlike US markets with fragmented venues, Indian equity trading is concentrated on NSE and BSE, with no payment for order flow (PFOF), no dark pools for retail, and minimal fragmentation."]}),e.jsx(t.BlockMath,{math:"\\text{Best Bid} \\leq \\text{Last Traded Price} \\leq \\text{Best Ask}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The bid-ask spread for Nifty 50 stocks is typically 1-3 basis points (bps) during regular hours, widening during the pre-open session and near close. The spread can be modeled as:"}),e.jsx(t.BlockMath,{math:"\\text{Spread} = 2 \\times (\\text{Adverse Selection Cost} + \\text{Inventory Cost} + \\text{Order Processing Cost})"}),e.jsx(w,{title:"SEBI's Role in Market Structure",type:"info",children:e.jsx("p",{children:"SEBI regulates all Indian exchanges and enforces rules on: (1) circuit breakers (10%/15%/20% for individual stocks, market-wide halts), (2) position limits for F&O, (3) margin requirements (SPAN + exposure margin), (4) algo trading regulations (co-location, order-to-trade ratio), and (5) short selling rules (only permitted for institutional investors with stock borrowing). Since 2023, equity settlement moved to T+1 from T+2, one of the fastest globally."})}),e.jsx(O,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"The Pre-Open Session and Price Discovery"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"NSE's pre-open session (9:00 -- 9:15 AM) uses a call auction mechanism to determine the opening price:"}),e.jsxs("ol",{className:"ml-6 list-decimal space-y-1 text-sm text-gray-700 dark:text-gray-300",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"9:00 -- 9:08:"})," Order entry, modification, cancellation allowed"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"9:08 -- 9:12:"})," Order matching -- equilibrium price determined"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"9:12 -- 9:15:"})," Buffer for transition to continuous trading"]})]}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The equilibrium price maximizes the total quantity traded:"}),e.jsx(t.BlockMath,{math:"p^* = \\arg\\max_p \\min\\!\\left(\\sum_{i: b_i \\geq p} q_i^{\\text{buy}}, \\sum_{j: a_j \\leq p} q_j^{\\text{sell}}\\right)"}),e.jsx(C,{title:"exchange_data_exploration.py",runnable:!0,code:`import numpy as np
from datetime import datetime, timedelta

# --- Indian Exchange Reference Data ---
exchanges = {
    'NSE': {
        'indices': ['Nifty 50', 'Nifty Bank', 'Nifty IT', 'Nifty Midcap 100'],
        'equity_hours': '9:15 AM - 3:30 PM IST',
        'fo_hours': '9:15 AM - 3:30 PM IST',
        'tick_size': 0.05,  # INR for equity
        'lot_sizes': {'NIFTY': 25, 'BANKNIFTY': 15, 'RELIANCE': 250, 'TCS': 150},
        'settlement': 'T+1',
    },
    'BSE': {
        'indices': ['Sensex', 'BSE 500', 'BSE Midcap', 'BSE Smallcap'],
        'equity_hours': '9:15 AM - 3:30 PM IST',
        'tick_size': 0.05,
        'settlement': 'T+1',
    },
    'MCX': {
        'commodities': ['Gold', 'Silver', 'Crude Oil', 'Natural Gas', 'Copper'],
        'trading_hours': '9:00 AM - 11:30 PM IST',
        'tick_sizes': {'GOLD': 1, 'SILVER': 1, 'CRUDEOIL': 1},
    }
}

print("=== Indian Exchange Overview ===\\n")
for name, info in exchanges.items():
    print(f"--- {name} ---")
    for key, val in info.items():
        print(f"  {key}: {val}")
    print()

# --- Simulate Order Book for TCS on NSE ---
np.random.seed(42)
mid_price = 3800.0  # TCS ~ INR 3800
tick = 0.05

# Generate bid and ask levels
n_levels = 10
bid_prices = [mid_price - tick * (i + 1) for i in range(n_levels)]
ask_prices = [mid_price + tick * (i + 1) for i in range(n_levels)]

# Quantities follow roughly power-law distribution
bid_qtys = np.random.exponential(500, n_levels).astype(int) + 50
ask_qtys = np.random.exponential(500, n_levels).astype(int) + 50

print("=== TCS Order Book (Simulated) ===")
print(f"{'Level':>6} {'Bid Qty':>8} {'Bid Price':>10} {'Ask Price':>10} {'Ask Qty':>8}")
for i in range(n_levels):
    print(f"{i+1:>6} {bid_qtys[i]:>8} {bid_prices[i]:>10.2f} {ask_prices[i]:>10.2f} {ask_qtys[i]:>8}")

spread = ask_prices[0] - bid_prices[0]
spread_bps = spread / mid_price * 10000
print(f"\\nBid-Ask Spread: INR {spread:.2f} ({spread_bps:.1f} bps)")
print(f"Mid Price: INR {mid_price:.2f}")
print(f"Total Bid Depth: {np.sum(bid_qtys)} shares (INR {np.sum(bid_qtys) * mid_price / 1e6:.1f}M)")
print(f"Total Ask Depth: {np.sum(ask_qtys)} shares (INR {np.sum(ask_qtys) * mid_price / 1e6:.1f}M)")

# --- Market Impact Estimation ---
print("\\n=== Market Impact Estimation ===")
order_sizes = [100, 500, 1000, 5000, 10000]
for size in order_sizes:
    remaining = size
    cost = 0
    for i in range(n_levels):
        fill = min(remaining, ask_qtys[i])
        cost += fill * ask_prices[i]
        remaining -= fill
        if remaining <= 0:
            break
    avg_price = cost / size if remaining <= 0 else float('inf')
    impact_bps = (avg_price - mid_price) / mid_price * 10000 if remaining <= 0 else float('inf')
    status = "Filled" if remaining <= 0 else f"Partial ({size - remaining}/{size})"
    print(f"  Buy {size:>5} shares: Avg price = INR {avg_price:.2f}, Impact = {impact_bps:.1f} bps [{status}]")

# --- Circuit Breaker Levels ---
print("\\n=== SEBI Circuit Breaker Levels ===")
nifty_close = 20000
for pct in [10, 15, 20]:
    lower = nifty_close * (1 - pct/100)
    upper = nifty_close * (1 + pct/100)
    print(f"  {pct}% circuit: [{lower:.0f}, {upper:.0f}]")

print("\\nNote: Market-wide circuit breaker halts trading for 15-45 min")
print("Individual stock circuit: 2%/5%/10%/20% (varies by category)")`}),e.jsx(q,{title:"Calculating Effective Spread",difficulty:"beginner",problem:"TCS is quoted at INR 3799.95 bid / INR 3800.05 ask on NSE. A trader buys 100 shares at the ask and sells at the bid. What is the effective round-trip cost?",solution:[{step:"Calculate the quoted spread",formula:"\\text{Spread} = 3800.05 - 3799.95 = \\text{INR } 0.10"},{step:"Calculate spread in basis points",formula:"\\text{Spread (bps)} = \\frac{0.10}{3800.00} \\times 10000 = 0.26 \\text{ bps}"},{step:"Calculate round-trip cost",formula:"\\text{Cost} = 100 \\times 0.10 = \\text{INR } 10.00",explanation:"This is extremely tight -- TCS is one of the most liquid stocks on NSE. For a mid-cap stock, the spread might be 5-20 bps, making round-trip costs much higher."}]}),e.jsx(w,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Indian equity markets are centralized on NSE and BSE with transparent order books, T+1 settlement, and strong SEBI regulation. This centralization simplifies quantitative trading compared to fragmented markets like the US. Key advantages for quants: (1) single venue for best execution (no smart order routing needed), (2) clean order book data from exchanges, (3) well-defined lot sizes for F&O. Key challenges: (1) lower liquidity in mid/small-caps, (2) circuit breakers can freeze positions, (3) algo trading requires exchange co-location approval."})})]})}const ne=Object.freeze(Object.defineProperty({__proto__:null,default:P},Symbol.toStringTag,{value:"Module"}));function D(){const[r,_]=f.useState("limit"),[d,S]=f.useState("buy"),[n,v]=f.useState(3800),[i,g]=f.useState(100),u=3800,y=[{price:3799.95,qty:320},{price:3799.9,qty:180},{price:3799.85,qty:450},{price:3799.8,qty:200},{price:3799.75,qty:600},{price:3799.7,qty:350},{price:3799.65,qty:280},{price:3799.6,qty:520}],N=[{price:3800.05,qty:280},{price:3800.1,qty:350},{price:3800.15,qty:200},{price:3800.2,qty:500},{price:3800.25,qty:150},{price:3800.3,qty:420},{price:3800.35,qty:300},{price:3800.4,qty:380}];let b={filled:0,avgPrice:0,levels:0};if(r==="market"){const a=d==="buy"?N:y;let s=i,l=0,j=0;for(const x of a){const c=Math.min(s,x.qty);if(l+=c*x.price,s-=c,j++,s<=0)break}b={filled:i-s,avgPrice:l/(i-s),levels:j}}else if(r==="limit"){const a=d==="buy"?N:y;let s=i,l=0,j=0;for(const x of a){if(!(d==="buy"?x.price<=n:x.price>=n))break;const p=Math.min(s,x.qty);if(l+=p*x.price,s-=p,j++,s<=0)break}b={filled:i-s,avgPrice:i-s>0?l/(i-s):0,levels:j}}const m=b.filled>0?Math.abs(b.avgPrice-u)/u*1e4:0;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Order Execution on NSE Order Book"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"See how different order types execute against the TCS order book. Compare market orders (immediate fill, potential slippage) vs limit orders (price control, partial fill risk)."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsx("span",{children:"Order Type"}),e.jsxs("select",{value:r,onChange:a=>_(a.target.value),className:"rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200",children:[e.jsx("option",{value:"market",children:"Market"}),e.jsx("option",{value:"limit",children:"Limit"}),e.jsx("option",{value:"sl",children:"Stop-Loss"}),e.jsx("option",{value:"amo",children:"AMO (After Market)"})]})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsx("span",{children:"Side"}),e.jsxs("select",{value:d,onChange:a=>S(a.target.value),className:"rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200",children:[e.jsx("option",{value:"buy",children:"Buy"}),e.jsx("option",{value:"sell",children:"Sell"})]})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Limit Price: ",n.toFixed(2)]}),e.jsx("input",{type:"range",min:"3799.50",max:"3800.50",step:"0.05",value:n,onChange:a=>v(parseFloat(a.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500",disabled:r==="market"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Quantity: ",i]}),e.jsx("input",{type:"range",min:"10",max:"2000",step:"10",value:i,onChange:a=>g(parseInt(a.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-2 text-xs font-mono",children:[e.jsxs("div",{children:[e.jsx("div",{className:"text-center font-bold text-green-600 dark:text-green-400 mb-1",children:"BID (Buyers)"}),y.map((a,s)=>e.jsxs("div",{className:"flex justify-between px-2 py-0.5 hover:bg-green-50 dark:hover:bg-green-900/20",children:[e.jsx("span",{className:"text-gray-500",children:a.qty}),e.jsx("span",{className:"text-green-600 dark:text-green-400",children:a.price.toFixed(2)})]},s))]}),e.jsxs("div",{children:[e.jsx("div",{className:"text-center font-bold text-red-600 dark:text-red-400 mb-1",children:"ASK (Sellers)"}),N.map((a,s)=>e.jsxs("div",{className:"flex justify-between px-2 py-0.5 hover:bg-red-50 dark:hover:bg-red-900/20",children:[e.jsx("span",{className:"text-red-600 dark:text-red-400",children:a.price.toFixed(2)}),e.jsx("span",{className:"text-gray-500",children:a.qty})]},s))]})]}),e.jsxs("div",{className:"mt-3 grid grid-cols-4 gap-2 text-center text-xs",children:[e.jsxs("div",{className:"rounded bg-gray-50 p-2 dark:bg-gray-800",children:[e.jsx("div",{className:"text-gray-500",children:"Filled"}),e.jsxs("div",{className:"font-bold text-gray-700 dark:text-gray-300",children:[b.filled,"/",i]})]}),e.jsxs("div",{className:"rounded bg-gray-50 p-2 dark:bg-gray-800",children:[e.jsx("div",{className:"text-gray-500",children:"Avg Price"}),e.jsx("div",{className:"font-bold text-gray-700 dark:text-gray-300",children:b.avgPrice>0?b.avgPrice.toFixed(2):"N/A"})]}),e.jsxs("div",{className:"rounded bg-gray-50 p-2 dark:bg-gray-800",children:[e.jsx("div",{className:"text-gray-500",children:"Slippage"}),e.jsxs("div",{className:"font-bold text-gray-700 dark:text-gray-300",children:[m.toFixed(1)," bps"]})]}),e.jsxs("div",{className:"rounded bg-gray-50 p-2 dark:bg-gray-800",children:[e.jsx("div",{className:"text-gray-500",children:"Levels Swept"}),e.jsx("div",{className:"font-bold text-gray-700 dark:text-gray-300",children:b.levels})]})]})]})}function L(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Order Types on NSE"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Mastering order types is fundamental to execution quality in algorithmic trading. On the NSE, every order must specify type, price, quantity, and validity. The choice of order type directly impacts execution cost, fill probability, and strategy performance."}),e.jsx(E,{title:"Market Order",label:"Definition 2.1",definition:e.jsx(e.Fragment,{children:'A market order executes immediately at the best available price in the order book. It guarantees execution but not price. Market orders consume liquidity (they are "taker" orders) and pay the bid-ask spread.'}),notation:e.jsxs(e.Fragment,{children:["Expected slippage for a market buy of ",e.jsx(t.InlineMath,{math:"Q"})," shares:"," ",e.jsx(t.InlineMath,{math:"\\text{Slippage} = \\bar{p}_{\\text{fill}} - p_{\\text{mid}}"}),", where ",e.jsx(t.InlineMath,{math:"\\bar{p}_{\\text{fill}}"})," is the volume-weighted average fill price."]})}),e.jsx(E,{title:"Limit Order",label:"Definition 2.2",definition:e.jsx(e.Fragment,{children:'A limit order specifies the maximum price (for buys) or minimum price (for sells). It only executes at the limit price or better. Limit orders provide liquidity ("maker" orders) and may receive partial fills. On the NSE, the minimum tick size is INR 0.05 for equity.'})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Complete Order Type Reference for NSE"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"Order Type"}),e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"Price"}),e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"Execution"}),e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"Use Case"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2 font-medium",children:"Market (MKT)"}),e.jsx("td",{className:"px-3 py-2",children:"Best available"}),e.jsx("td",{className:"px-3 py-2",children:"Immediate, full fill"}),e.jsx("td",{className:"px-3 py-2",children:"Urgent execution, liquid stocks"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2 font-medium",children:"Limit (LMT)"}),e.jsx("td",{className:"px-3 py-2",children:"Specified"}),e.jsx("td",{className:"px-3 py-2",children:"At limit or better"}),e.jsx("td",{className:"px-3 py-2",children:"Price-sensitive, algo strategies"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2 font-medium",children:"Stop-Loss (SL)"}),e.jsx("td",{className:"px-3 py-2",children:"Trigger + limit"}),e.jsx("td",{className:"px-3 py-2",children:"When trigger hit"}),e.jsx("td",{className:"px-3 py-2",children:"Risk management, trend following"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2 font-medium",children:"SL-Market (SL-M)"}),e.jsx("td",{className:"px-3 py-2",children:"Trigger only"}),e.jsx("td",{className:"px-3 py-2",children:"Market order on trigger"}),e.jsx("td",{className:"px-3 py-2",children:"Guaranteed exit on stop"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2 font-medium",children:"AMO"}),e.jsx("td",{className:"px-3 py-2",children:"Specified"}),e.jsx("td",{className:"px-3 py-2",children:"Queued for next day"}),e.jsx("td",{className:"px-3 py-2",children:"Overnight strategy signals"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-3 py-2 font-medium",children:"IOC"}),e.jsx("td",{className:"px-3 py-2",children:"Specified"}),e.jsx("td",{className:"px-3 py-2",children:"Immediate or cancel"}),e.jsx("td",{className:"px-3 py-2",children:"Algo trading, sweeping book"})]})]})]})}),e.jsx(F,{title:"Optimal Order Placement",label:"Theorem 2.1",statement:e.jsxs(e.Fragment,{children:["For a strategy with expected alpha ",e.jsx(t.InlineMath,{math:"\\alpha"}),", the optimal order type depends on the urgency parameter"," ",e.jsx(t.InlineMath,{math:"\\kappa = \\alpha / (\\text{spread} + \\text{market impact})"}),":",e.jsx(t.BlockMath,{math:"\\text{Order choice} = \\begin{cases} \\text{Market order} & \\text{if } \\kappa > 1 \\text{ (alpha exceeds cost)} \\\\ \\text{Limit order} & \\text{if } \\kappa < 1 \\text{ (patience pays)} \\end{cases}"}),"For mean-reversion strategies on NSE with small alpha, limit orders are strongly preferred. For momentum strategies with decaying signals, market orders may be optimal."]})}),e.jsx(D,{}),e.jsx(C,{title:"order_simulation.py",runnable:!0,code:`import numpy as np

np.random.seed(42)

# --- Simulate Order Book for Reliance on NSE ---
mid_price = 2500.00
tick_size = 0.05
n_levels = 20

def generate_order_book(mid, tick, levels):
    """Generate a realistic NSE order book."""
    bids, asks = [], []
    for i in range(levels):
        bid_price = mid - tick * (i + 1)
        ask_price = mid + tick * (i + 1)
        # Quantity increases with distance from mid (typical pattern)
        bid_qty = int(np.random.exponential(300) + 50 + i * 20)
        ask_qty = int(np.random.exponential(300) + 50 + i * 20)
        bids.append({'price': bid_price, 'qty': bid_qty})
        asks.append({'price': ask_price, 'qty': ask_qty})
    return bids, asks

bids, asks = generate_order_book(mid_price, tick_size, n_levels)

def execute_market_order(side, qty, bids, asks):
    """Simulate market order execution."""
    book = asks if side == 'buy' else bids
    remaining = qty
    total_cost = 0
    fills = []
    for level in book:
        fill = min(remaining, level['qty'])
        total_cost += fill * level['price']
        fills.append({'price': level['price'], 'qty': fill})
        remaining -= fill
        if remaining <= 0:
            break
    avg_price = total_cost / qty if remaining <= 0 else None
    return avg_price, fills, remaining

def execute_limit_order(side, qty, limit_price, bids, asks):
    """Simulate limit order execution (immediate fill portion)."""
    book = asks if side == 'buy' else bids
    remaining = qty
    total_cost = 0
    fills = []
    for level in book:
        can_fill = (side == 'buy' and level['price'] <= limit_price) or \\
                   (side == 'sell' and level['price'] >= limit_price)
        if not can_fill:
            break
        fill = min(remaining, level['qty'])
        total_cost += fill * level['price']
        fills.append({'price': level['price'], 'qty': fill})
        remaining -= fill
        if remaining <= 0:
            break
    filled = qty - remaining
    avg_price = total_cost / filled if filled > 0 else None
    return avg_price, fills, remaining

# --- Compare Order Types ---
print("=== Reliance Industries (NSE) Order Execution ===")
print(f"Mid price: INR {mid_price:.2f}")
print(f"Best bid: INR {bids[0]['price']:.2f} ({bids[0]['qty']} qty)")
print(f"Best ask: INR {asks[0]['price']:.2f} ({asks[0]['qty']} qty)")
print(f"Spread: INR {asks[0]['price'] - bids[0]['price']:.2f} "
      f"({(asks[0]['price'] - bids[0]['price'])/mid_price*10000:.1f} bps)")
print()

# Test different order sizes
order_sizes = [100, 500, 1000, 5000]
print(f"{'Size':>6} {'Market Avg':>12} {'Slippage':>10} {'Limit Fill%':>12} {'Limit Avg':>12}")

for size in order_sizes:
    # Market order
    mkt_avg, _, mkt_rem = execute_market_order('buy', size, bids, asks)

    # Limit at mid (aggressive limit)
    lmt_avg, _, lmt_rem = execute_limit_order('buy', size, mid_price, bids, asks)
    lmt_fill_pct = (size - lmt_rem) / size * 100

    # Limit at best ask (join the queue)
    slippage = (mkt_avg - mid_price) / mid_price * 10000 if mkt_avg else float('inf')
    lmt_avg_str = f"{lmt_avg:.2f}" if lmt_avg else "None"

    print(f"{size:>6} {mkt_avg:>12.2f} {slippage:>9.1f}bp {lmt_fill_pct:>11.0f}% {lmt_avg_str:>12}")

# --- Execution Cost Analysis ---
print("\\n=== Execution Cost Breakdown (Buy 1000 shares) ===")
size = 1000
mkt_avg, fills, _ = execute_market_order('buy', size, bids, asks)

print(f"Volume-weighted avg price: INR {mkt_avg:.2f}")
print(f"Slippage vs mid:           INR {mkt_avg - mid_price:.2f}")
print(f"Slippage (bps):            {(mkt_avg - mid_price)/mid_price * 10000:.2f}")
print(f"Notional value:            INR {mkt_avg * size:,.0f}")
print(f"Levels swept:              {len(fills)}")
for f in fills:
    print(f"  INR {f['price']:.2f} x {f['qty']} shares")

# --- AMO (After Market Order) Strategy ---
print("\\n=== AMO Strategy for Overnight Signals ===")
print("AMO orders are placed between 3:45 PM - 8:57 AM IST")
print("They execute at market open (9:15 AM) in the pre-open session")
print("Common use: signal generated after market close, execute at next open")
print("Risk: overnight gap risk (Nifty can gap 1-3% on global events)")`}),e.jsx(q,{title:"Stop-Loss Order for Risk Management",difficulty:"beginner",problem:"You are long 500 shares of Infosys at INR 1,450. You want a stop-loss at INR 1,420 with a limit of INR 1,415. How does this SL order work?",solution:[{step:"Order parameters",formula:"\\text{SL Sell: Trigger} = 1420, \\text{ Limit} = 1415, \\text{ Qty} = 500",explanation:"This is a Stop-Loss Limit order. It remains dormant until the trigger price is hit."},{step:"Trigger activation",formula:"\\text{When LTP} \\leq 1420: \\text{ order becomes active as a limit sell at } 1415",explanation:"Once Infosys trades at or below INR 1,420, a limit sell order at INR 1,415 is placed."},{step:"Maximum loss calculation",formula:"\\text{Max loss} = 500 \\times (1450 - 1415) = \\text{INR } 17,500",explanation:"If filled at the limit price. In fast markets, the order may not fill if the price gaps below INR 1,415. Using SL-M (stop-loss market) guarantees execution but not price."}]}),e.jsx(w,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Order type selection is a critical decision in algorithmic trading. For quant strategies on NSE: (1) use limit orders for mean-reversion strategies to capture the spread, (2) use market/IOC orders for momentum strategies where speed matters, (3) always use stop-loss orders for risk management, (4) consider AMO orders for overnight signal execution. The cost of crossing the spread (typically 1-3 bps for Nifty 50 stocks) must be factored into every backtest."})})]})}const le=Object.freeze(Object.defineProperty({__proto__:null,default:L},Symbol.toStringTag,{value:"Module"}));function z(){const[r,_]=f.useState([{id:1,side:"buy",price:100,qty:200,time:1},{id:2,side:"buy",price:100.05,qty:150,time:2},{id:3,side:"sell",price:100.1,qty:300,time:3},{id:4,side:"buy",price:100.1,qty:100,time:4}]),[d,S]=f.useState("buy"),[n,v]=f.useState(100.1),[i,g]=f.useState(200),[u,y]=f.useState([]),N=()=>{const a={id:r.length+1,side:d,price:n,qty:i,time:r.length+1},s=[];let l=i;const j=[...r];if(d==="buy"){const x=j.filter(c=>c.side==="sell"&&c.price<=n&&c.qty>0).sort((c,p)=>c.price-p.price||c.time-p.time);for(const c of x){if(l<=0)break;const p=Math.min(l,c.qty);s.push(`MATCH: Buy ${p} @ ${c.price.toFixed(2)} (Order #${c.id})`),c.qty-=p,l-=p}}else{const x=j.filter(c=>c.side==="buy"&&c.price>=n&&c.qty>0).sort((c,p)=>p.price-c.price||c.time-p.time);for(const c of x){if(l<=0)break;const p=Math.min(l,c.qty);s.push(`MATCH: Sell ${p} @ ${c.price.toFixed(2)} (Order #${c.id})`),c.qty-=p,l-=p}}l>0&&(a.qty=l,j.push(a),s.push(`RESTING: ${d} ${l} @ ${n.toFixed(2)} added to book`)),_(j.filter(x=>x.qty>0)),y(s)},b=r.filter(a=>a.side==="buy"&&a.qty>0).sort((a,s)=>s.price-a.price),m=r.filter(a=>a.side==="sell"&&a.qty>0).sort((a,s)=>a.price-s.price);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: NSE NEAT Matching Engine Simulator"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Submit orders and watch how the price-time priority matching engine works. Orders are matched at the best available price, with time priority for orders at the same price."}),e.jsxs("div",{className:"mb-4 grid grid-cols-4 gap-2",children:[e.jsxs("select",{value:d,onChange:a=>S(a.target.value),className:"rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200",children:[e.jsx("option",{value:"buy",children:"Buy"}),e.jsx("option",{value:"sell",children:"Sell"})]}),e.jsxs("label",{className:"flex flex-col gap-0.5 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Price: ",n.toFixed(2)]}),e.jsx("input",{type:"range",min:"99.80",max:"100.30",step:"0.05",value:n,onChange:a=>v(parseFloat(a.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-0.5 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Qty: ",i]}),e.jsx("input",{type:"range",min:"50",max:"500",step:"50",value:i,onChange:a=>g(parseInt(a.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsx("button",{onClick:N,className:"rounded bg-indigo-500 px-3 py-1 text-sm font-medium text-white hover:bg-indigo-600",children:"Submit"})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4 text-xs font-mono",children:[e.jsxs("div",{children:[e.jsx("div",{className:"text-center font-bold text-green-600 dark:text-green-400 mb-1",children:"BIDS"}),b.length===0?e.jsx("div",{className:"text-center text-gray-400",children:"Empty"}):b.map(a=>e.jsxs("div",{className:"flex justify-between px-2 py-0.5 bg-green-50 dark:bg-green-900/20 rounded mb-0.5",children:[e.jsxs("span",{children:["#",a.id," Qty:",a.qty]}),e.jsx("span",{className:"text-green-600",children:a.price.toFixed(2)})]},a.id))]}),e.jsxs("div",{children:[e.jsx("div",{className:"text-center font-bold text-red-600 dark:text-red-400 mb-1",children:"ASKS"}),m.length===0?e.jsx("div",{className:"text-center text-gray-400",children:"Empty"}):m.map(a=>e.jsxs("div",{className:"flex justify-between px-2 py-0.5 bg-red-50 dark:bg-red-900/20 rounded mb-0.5",children:[e.jsx("span",{className:"text-red-600",children:a.price.toFixed(2)}),e.jsxs("span",{children:["Qty:",a.qty," #",a.id]})]},a.id))]})]}),u.length>0&&e.jsxs("div",{className:"mt-3 rounded bg-gray-50 p-2 text-xs dark:bg-gray-800",children:[e.jsx("div",{className:"font-bold text-gray-600 dark:text-gray-400",children:"Match Log:"}),u.map((a,s)=>e.jsx("div",{className:a.startsWith("MATCH")?"text-green-600 dark:text-green-400":"text-blue-600 dark:text-blue-400",children:a},s))]})]})}function V(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"NSE NEAT System and Price-Time Priority"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"The NSE's NEAT (National Exchange for Automated Trading) system is a fully electronic order-driven matching engine that processes millions of orders per day. Understanding how the matching engine works is crucial for designing efficient execution algorithms and minimizing market impact."}),e.jsx(E,{title:"Price-Time Priority",label:"Definition 3.1",definition:e.jsx(e.Fragment,{children:"In a price-time priority system, orders are ranked first by price (best price has highest priority) and then by time of arrival (earlier orders have priority at the same price level). For buy orders, higher prices have priority. For sell orders, lower prices have priority. When a new order arrives, it is matched against the best available orders on the opposite side."}),notation:e.jsxs(e.Fragment,{children:["Priority ranking for buys: ",e.jsx(t.InlineMath,{math:"p_1 > p_2 \\implies \\text{Order 1 first}"}),". If ",e.jsx(t.InlineMath,{math:"p_1 = p_2"})," and ",e.jsx(t.InlineMath,{math:"t_1 < t_2"}),", then Order 1 first."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"NEAT System Architecture"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The NSE NEAT system processes orders through several stages:"}),e.jsxs("ol",{className:"ml-6 list-decimal space-y-2 text-sm text-gray-700 dark:text-gray-300",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Order Validation:"})," Check price limits, circuit breakers, margin requirements, lot sizes"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Matching:"})," Price-time priority matching against the order book"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Trade Confirmation:"})," Generate trade records for both parties"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Clearing:"})," NSCCL (National Securities Clearing Corporation) handles settlement"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Dissemination:"})," Market data broadcast to all participants"]})]}),e.jsx(t.BlockMath,{math:"\\text{Matching condition (buy)}: \\quad p_{\\text{buy}} \\geq p_{\\text{best ask}} \\implies \\text{trade at } p_{\\text{best ask}}"}),e.jsx(t.BlockMath,{math:"\\text{Matching condition (sell)}: \\quad p_{\\text{sell}} \\leq p_{\\text{best bid}} \\implies \\text{trade at } p_{\\text{best bid}}"}),e.jsx(F,{title:"Queue Position and Fill Probability",label:"Theorem 3.1",statement:e.jsxs(e.Fragment,{children:["For a limit order at the best bid with queue position ",e.jsx(t.InlineMath,{math:"Q"})," (shares ahead) and total volume at that level ",e.jsx(t.InlineMath,{math:"V"}),", the probability of getting filled before the price moves is approximately:",e.jsx(t.BlockMath,{math:"P(\\text{fill}) \\approx 1 - \\frac{Q}{V + \\text{incoming sell volume}}"}),"For an NSE stock with high queue depth, improving queue position by 1 microsecond can mean the difference between getting filled and missing the trade. This is why co-location matters for high-frequency strategies."]})}),e.jsx(w,{title:"NSE Co-location and Latency",type:"info",children:e.jsx("p",{children:"NSE offers co-location services at its data center in Mumbai. Co-located servers achieve round-trip latencies of 10--50 microseconds, compared to 1--5 milliseconds for remote connections. SEBI regulates co-location to ensure fair access: all co-located members receive market data simultaneously via multicast, and the exchange uses randomized order processing to prevent systematic latency advantages."})}),e.jsx(z,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Pre-Open Call Auction Algorithm"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The pre-open session (9:00--9:08 AM) uses a call auction to determine the opening price. The algorithm finds the price that maximizes matched volume:"}),e.jsx(t.BlockMath,{math:"p^* = \\arg\\max_p \\; Q_{\\text{matched}}(p) = \\arg\\max_p \\; \\min\\!\\left(\\sum_{b_i \\geq p} q_i^B, \\sum_{a_j \\leq p} q_j^S\\right)"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"If multiple prices give the same maximum volume, the price closest to the previous close is chosen (minimizing price disruption). This mechanism reduces the impact of overnight information on opening prices."}),e.jsx(C,{title:"matching_engine.py",runnable:!0,code:`import numpy as np
from collections import deque

class Order:
    def __init__(self, order_id, side, price, qty, timestamp):
        self.id = order_id
        self.side = side   # 'buy' or 'sell'
        self.price = price
        self.qty = qty
        self.timestamp = timestamp
        self.filled = 0

    def remaining(self):
        return self.qty - self.filled

class MatchingEngine:
    """Simplified NSE NEAT price-time priority matching engine."""

    def __init__(self, tick_size=0.05):
        self.bids = {}   # price -> list of orders (sorted by time)
        self.asks = {}
        self.trades = []
        self.tick_size = tick_size
        self.order_count = 0

    def submit(self, side, price, qty):
        """Submit a new order and attempt matching."""
        self.order_count += 1
        order = Order(self.order_count, side, price, qty, self.order_count)
        matches = []

        if side == 'buy':
            # Match against asks (lowest first, then by time)
            ask_prices = sorted(self.asks.keys())
            for ap in ask_prices:
                if ap > price or order.remaining() <= 0:
                    break
                for ask_order in list(self.asks[ap]):
                    if order.remaining() <= 0:
                        break
                    fill = min(order.remaining(), ask_order.remaining())
                    order.filled += fill
                    ask_order.filled += fill
                    trade = {'buyer': order.id, 'seller': ask_order.id,
                             'price': ap, 'qty': fill}
                    self.trades.append(trade)
                    matches.append(trade)
                    if ask_order.remaining() == 0:
                        self.asks[ap].remove(ask_order)
                if not self.asks[ap]:
                    del self.asks[ap]

            # Add remaining to book
            if order.remaining() > 0:
                if price not in self.bids:
                    self.bids[price] = []
                self.bids[price].append(order)

        else:  # sell
            bid_prices = sorted(self.bids.keys(), reverse=True)
            for bp in bid_prices:
                if bp < price or order.remaining() <= 0:
                    break
                for bid_order in list(self.bids[bp]):
                    if order.remaining() <= 0:
                        break
                    fill = min(order.remaining(), bid_order.remaining())
                    order.filled += fill
                    bid_order.filled += fill
                    trade = {'buyer': bid_order.id, 'seller': order.id,
                             'price': bp, 'qty': fill}
                    self.trades.append(trade)
                    matches.append(trade)
                    if bid_order.remaining() == 0:
                        self.bids[bp].remove(bid_order)
                if not self.bids[bp]:
                    del self.bids[bp]

            if order.remaining() > 0:
                if price not in self.asks:
                    self.asks[price] = []
                self.asks[price].append(order)

        return matches

    def book_summary(self):
        bids = sorted(self.bids.keys(), reverse=True)[:5]
        asks = sorted(self.asks.keys())[:5]
        print("  BIDS                    ASKS")
        max_rows = max(len(bids), len(asks))
        for i in range(max_rows):
            bid_str = ""
            ask_str = ""
            if i < len(bids):
                qty = sum(o.remaining() for o in self.bids[bids[i]])
                bid_str = f"{qty:>6} @ {bids[i]:.2f}"
            if i < len(asks):
                qty = sum(o.remaining() for o in self.asks[asks[i]])
                ask_str = f"{asks[i]:.2f} @ {qty:<6}"
            print(f"  {bid_str:<20} {ask_str}")

# --- Simulate TCS Order Flow ---
engine = MatchingEngine(tick_size=0.05)

print("=== NSE NEAT Matching Engine Simulation (TCS) ===\\n")

# Build initial order book
initial_orders = [
    ('buy',  3799.90, 200), ('buy',  3799.95, 300), ('buy',  3799.85, 150),
    ('sell', 3800.05, 250), ('sell', 3800.10, 400), ('sell', 3800.15, 180),
]

print("Building order book...")
for side, price, qty in initial_orders:
    engine.submit(side, price, qty)

print("\\nInitial Order Book:")
engine.book_summary()

# Submit crossing orders
print("\\n--- Incoming Market Buy (500 shares) ---")
trades = engine.submit('buy', 9999.0, 500)  # high price = market order
for t in trades:
    print(f"  TRADE: {t['qty']} shares @ INR {t['price']:.2f}")
print(f"  Total filled: {sum(t['qty'] for t in trades)} shares")
if trades:
    vwap = sum(t['price'] * t['qty'] for t in trades) / sum(t['qty'] for t in trades)
    print(f"  VWAP: INR {vwap:.2f}")

print("\\nBook after market buy:")
engine.book_summary()

# --- Pre-Open Call Auction ---
print("\\n=== Pre-Open Call Auction Simulation ===")
buy_orders = [(3800, 500), (3799, 300), (3801, 200), (3798, 400)]
sell_orders = [(3799, 400), (3800, 350), (3801, 300), (3802, 200)]

prices = sorted(set([p for p,_ in buy_orders + sell_orders]))
print(f"\\nCandidate prices: {prices}")

best_price = None
best_volume = 0
for p in prices:
    buy_vol = sum(q for bp, q in buy_orders if bp >= p)
    sell_vol = sum(q for sp, q in sell_orders if sp <= p)
    matched = min(buy_vol, sell_vol)
    print(f"  Price {p}: Buy vol={buy_vol}, Sell vol={sell_vol}, Matched={matched}")
    if matched > best_volume:
        best_volume = matched
        best_price = p

print(f"\\nEquilibrium price: INR {best_price}")
print(f"Volume matched: {best_volume} shares")`}),e.jsx(q,{title:"Queue Position Calculation",difficulty:"intermediate",problem:"You place a limit buy at INR 3,800.00 on TCS. There are already 1,200 shares ahead of you at this price. The average sell volume at this level is 2,000 shares per minute. What is your expected wait time for a fill?",solution:[{step:"Estimate fill probability per minute",formula:"P(\\text{fill in 1 min}) \\approx \\frac{2000}{1200 + 2000} \\approx 0.625",explanation:"This is a rough approximation assuming sell volume is consumed pro-rata."},{step:"Expected time to fill",formula:"E[T] \\approx \\frac{1200}{2000} = 0.6 \\text{ minutes} = 36 \\text{ seconds}",explanation:"Under the simplistic assumption that sell volume arrives uniformly."},{step:"Caveat",formula:"\\text{Actual fill depends on price movement}",explanation:"If the price moves up before your order fills, you may not get filled at all. If it moves down, you get filled but with potential adverse selection (the stock was going down). This is the maker-taker dilemma."}]}),e.jsx(w,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"The NSE NEAT matching engine is transparent and deterministic: price-time priority governs all matches. For algorithmic trading, understanding queue position dynamics, fill probability, and the trade-off between aggressive (market) and passive (limit) orders is essential. The pre-open call auction provides an important price discovery mechanism. Co-location reduces latency but SEBI regulation ensures no unfair advantage in data dissemination."})})]})}const oe=Object.freeze(Object.defineProperty({__proto__:null,default:V},Symbol.toStringTag,{value:"Module"}));function W(){const[r,_]=f.useState("nifty50"),n=r==="nifty50"?[{name:"Financials",weight:35.2,color:"#6366f1"},{name:"IT",weight:13.8,color:"#22c55e"},{name:"Oil & Gas",weight:12.5,color:"#f59e0b"},{name:"Consumer",weight:10.1,color:"#ef4444"},{name:"Auto",weight:6.8,color:"#8b5cf6"},{name:"Metals",weight:4.2,color:"#14b8a6"},{name:"Pharma",weight:4,color:"#ec4899"},{name:"Telecom",weight:3.5,color:"#f97316"},{name:"Power",weight:3.1,color:"#06b6d4"},{name:"Others",weight:6.8,color:"#6b7280"}]:[{name:"Financials",weight:38.5,color:"#6366f1"},{name:"IT",weight:14.2,color:"#22c55e"},{name:"Oil & Gas",weight:13.1,color:"#f59e0b"},{name:"Consumer",weight:11.5,color:"#ef4444"},{name:"Auto",weight:7.2,color:"#8b5cf6"},{name:"Pharma",weight:4.5,color:"#ec4899"},{name:"Metals",weight:3.8,color:"#14b8a6"},{name:"Others",weight:7.2,color:"#6b7280"}],v=500,i=180,g=85,u=15,y=15,N=25,b=v-g-u,m=i-y-N,a=m/n.length*.7,s=m/n.length;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Indian Index Sector Composition"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Explore the sector weights of India's flagship indices. Financials dominate both Nifty 50 and Sensex, creating concentration risk."}),e.jsx("div",{className:"mb-4",children:e.jsxs("select",{value:r,onChange:l=>_(l.target.value),className:"rounded border border-gray-300 bg-white px-3 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200",children:[e.jsx("option",{value:"nifty50",children:"Nifty 50"}),e.jsx("option",{value:"sensex",children:"BSE Sensex"})]})}),e.jsx("svg",{viewBox:`0 0 ${v} ${i}`,className:"w-full max-w-xl mx-auto block",children:n.map((l,j)=>{const x=y+j*s,c=l.weight/40*b;return e.jsxs("g",{children:[e.jsx("text",{x:g-5,y:x+a/2+3,textAnchor:"end",className:"text-[9px]",fill:"#6b7280",children:l.name}),e.jsx("rect",{x:g,y:x,width:c,height:a,fill:l.color,opacity:"0.7",rx:"2"}),e.jsxs("text",{x:g+c+5,y:x+a/2+3,className:"text-[9px] font-bold",fill:l.color,children:[l.weight,"%"]})]},l.name)})}),e.jsxs("p",{className:"mt-2 text-center text-sm text-gray-600 dark:text-gray-400",children:["Top 3 sectors account for ",e.jsxs("strong",{children:[n.slice(0,3).reduce((l,j)=>l+j.weight,0).toFixed(1),"%"]})," ","of the index. Consider sector-neutral strategies to mitigate concentration risk."]})]})}function G(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Indian Equities and ETFs"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Indian equities listed on NSE and BSE form the primary asset class for quantitative strategies. Understanding stock classification, index construction, corporate actions, and ETF mechanics is essential for building robust trading systems."}),e.jsx(E,{title:"Equity Classification in India",label:"Definition 1.1",definition:e.jsxs(e.Fragment,{children:["Indian stocks are classified by market capitalization: ",e.jsx("strong",{children:"Large-cap"})," ","(top 100 by market cap, includes Nifty 50 constituents like Reliance, TCS, HDFC Bank),"," ",e.jsx("strong",{children:"Mid-cap"})," (101st--250th), and ",e.jsx("strong",{children:"Small-cap"})," (251st and below). SEBI mandates this classification, updated semi-annually, which affects mutual fund portfolio mandates and liquidity patterns."]})}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The Nifty 50 index is a free-float market-cap weighted index of 50 large-cap stocks selected by NSE Indices Ltd. The index value is computed as:"}),e.jsx(t.BlockMath,{math:"\\text{Index Value} = \\frac{\\sum_{i=1}^{50} p_i \\times \\text{IWF}_i \\times s_i}{\\text{Base Market Cap}} \\times \\text{Base Value}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"p_i"})," is the stock price, ",e.jsx(t.InlineMath,{math:"\\text{IWF}_i"})," ","is the investable weight factor (free-float fraction), and ",e.jsx(t.InlineMath,{math:"s_i"})," ","is the number of equity shares. Stocks with higher free-float market cap have larger index weights."]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"Stock"}),e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"Sector"}),e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"Nifty Weight"}),e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"Avg Daily Vol (INR Cr)"}),e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"F&O Lot Size"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2 font-medium",children:"Reliance"}),e.jsx("td",{className:"px-3 py-2",children:"Oil & Gas"}),e.jsx("td",{className:"px-3 py-2",children:"~10%"}),e.jsx("td",{className:"px-3 py-2",children:"~3,500"}),e.jsx("td",{className:"px-3 py-2",children:"250"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2 font-medium",children:"HDFC Bank"}),e.jsx("td",{className:"px-3 py-2",children:"Financials"}),e.jsx("td",{className:"px-3 py-2",children:"~9%"}),e.jsx("td",{className:"px-3 py-2",children:"~2,800"}),e.jsx("td",{className:"px-3 py-2",children:"550"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2 font-medium",children:"TCS"}),e.jsx("td",{className:"px-3 py-2",children:"IT"}),e.jsx("td",{className:"px-3 py-2",children:"~5%"}),e.jsx("td",{className:"px-3 py-2",children:"~1,200"}),e.jsx("td",{className:"px-3 py-2",children:"150"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2 font-medium",children:"Infosys"}),e.jsx("td",{className:"px-3 py-2",children:"IT"}),e.jsx("td",{className:"px-3 py-2",children:"~5%"}),e.jsx("td",{className:"px-3 py-2",children:"~1,500"}),e.jsx("td",{className:"px-3 py-2",children:"300"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-3 py-2 font-medium",children:"ITC"}),e.jsx("td",{className:"px-3 py-2",children:"Consumer"}),e.jsx("td",{className:"px-3 py-2",children:"~4%"}),e.jsx("td",{className:"px-3 py-2",children:"~1,800"}),e.jsx("td",{className:"px-3 py-2",children:"1600"})]})]})]})}),e.jsx(W,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Exchange-Traded Funds (ETFs) in India"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Indian ETFs have grown significantly, with total AUM exceeding INR 6 lakh crore. Key ETF categories for quant strategies include:"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"ETF Type"}),e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"Examples"}),e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"Quant Use Case"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2",children:"Index ETFs"}),e.jsx("td",{className:"px-3 py-2",children:"Nifty BeES, SBI Sensex ETF"}),e.jsx("td",{className:"px-3 py-2",children:"Benchmark, pairs with futures"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2",children:"Sectoral ETFs"}),e.jsx("td",{className:"px-3 py-2",children:"Bank BeES, IT BeES"}),e.jsx("td",{className:"px-3 py-2",children:"Sector rotation strategies"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2",children:"Gold ETFs"}),e.jsx("td",{className:"px-3 py-2",children:"SBI Gold ETF, HDFC Gold ETF"}),e.jsx("td",{className:"px-3 py-2",children:"Portfolio hedging, safe haven"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-3 py-2",children:"International"}),e.jsx("td",{className:"px-3 py-2",children:"MOSt NASDAQ 100"}),e.jsx("td",{className:"px-3 py-2",children:"Global diversification"})]})]})]})}),e.jsx(F,{title:"ETF Tracking Error",label:"Theorem 1.1",statement:e.jsxs(e.Fragment,{children:["The tracking error of an ETF relative to its benchmark is defined as:",e.jsx(t.BlockMath,{math:"\\text{TE} = \\sigma(r_{\\text{ETF}} - r_{\\text{index}}) \\times \\sqrt{252}"}),"For well-managed Nifty ETFs, the annualized tracking error is typically 0.1--0.3%. Sources include: expense ratio, cash drag, rebalancing costs, dividend timing, and creation/redemption friction."]})}),e.jsx(w,{title:"ADRs and Global Listings",type:"info",children:e.jsx("p",{children:"Several Indian companies trade as ADRs (American Depositary Receipts) on US exchanges: Infosys (INFY), HDFC Bank (HDB), ICICI Bank (IBN), and Wipro (WIT). The price difference between ADRs and NSE-listed shares (adjusted for INR/USD) creates arbitrage opportunities, though capital account restrictions limit direct exploitation. The ADR premium/discount is a useful signal for cross-border sentiment."})}),e.jsx(C,{title:"indian_equities_analysis.py",runnable:!0,code:`import numpy as np

np.random.seed(42)

# --- Nifty 50 Stock Universe ---
nifty_stocks = {
    'RELIANCE': {'sector': 'Oil & Gas', 'weight': 10.2, 'beta': 0.95, 'mcap_cr': 1800000},
    'HDFCBANK': {'sector': 'Financials', 'weight': 9.1, 'beta': 0.85, 'mcap_cr': 1200000},
    'TCS': {'sector': 'IT', 'weight': 5.2, 'beta': 0.75, 'mcap_cr': 1350000},
    'INFY': {'sector': 'IT', 'weight': 5.0, 'beta': 0.80, 'mcap_cr': 620000},
    'ICICIBANK': {'sector': 'Financials', 'weight': 6.5, 'beta': 1.10, 'mcap_cr': 700000},
    'ITC': {'sector': 'Consumer', 'weight': 4.2, 'beta': 0.65, 'mcap_cr': 550000},
    'KOTAKBANK': {'sector': 'Financials', 'weight': 3.8, 'beta': 0.90, 'mcap_cr': 380000},
    'SBIN': {'sector': 'Financials', 'weight': 3.2, 'beta': 1.25, 'mcap_cr': 600000},
    'BHARTIARTL': {'sector': 'Telecom', 'weight': 3.5, 'beta': 0.70, 'mcap_cr': 750000},
    'TATASTEEL': {'sector': 'Metals', 'weight': 1.5, 'beta': 1.40, 'mcap_cr': 180000},
}

print("=== Nifty 50 Stock Analysis ===\\n")
print(f"{'Stock':<14} {'Sector':<14} {'Weight%':>8} {'Beta':>6} {'MCap(Cr)':>10}")
total_weight = 0
for stock, info in sorted(nifty_stocks.items(), key=lambda x: -x[1]['weight']):
    print(f"{stock:<14} {info['sector']:<14} {info['weight']:>8.1f} {info['beta']:>6.2f} {info['mcap_cr']:>10,}")
    total_weight += info['weight']
print(f"{'TOTAL':<14} {'':14} {total_weight:>8.1f}")

# --- Sector Concentration ---
print("\\n=== Sector Concentration ===")
sector_weights = {}
for stock, info in nifty_stocks.items():
    sector_weights[info['sector']] = sector_weights.get(info['sector'], 0) + info['weight']

for sector, weight in sorted(sector_weights.items(), key=lambda x: -x[1]):
    bar = '█' * int(weight * 2)
    print(f"  {sector:<14} {weight:>6.1f}% {bar}")

# HHI (Herfindahl-Hirschman Index) for sector concentration
hhi = sum(w**2 for w in sector_weights.values())
print(f"\\nSector HHI: {hhi:.0f} (>2500 = highly concentrated)")

# --- Simulate Returns and Compute Portfolio Metrics ---
n_days = 252
market_returns = np.random.normal(0.0005, 0.012, n_days)

print("\\n=== Simulated Annual Return Summary ===")
print(f"{'Stock':<14} {'Ann Return':>10} {'Ann Vol':>8} {'Sharpe':>8}")
for stock, info in nifty_stocks.items():
    # returns = alpha + beta * market + idiosyncratic
    alpha_daily = np.random.uniform(-0.0001, 0.0003)
    idio = np.random.normal(0, 0.015, n_days)
    stock_returns = alpha_daily + info['beta'] * market_returns + idio
    ann_ret = np.mean(stock_returns) * 252
    ann_vol = np.std(stock_returns) * np.sqrt(252)
    rf = 0.065
    sharpe = (ann_ret - rf) / ann_vol
    print(f"{stock:<14} {ann_ret*100:>9.1f}% {ann_vol*100:>7.1f}% {sharpe:>8.2f}")

# --- ETF Tracking Error ---
print("\\n=== ETF Tracking Error Simulation ===")
index_returns = market_returns
etf_returns = index_returns - 0.0001/252  # Expense ratio drag
# Add tracking noise
etf_returns += np.random.normal(0, 0.0002, n_days)
te = np.std(etf_returns - index_returns) * np.sqrt(252)
print(f"Annualized tracking error: {te*100:.3f}%")
print(f"Expense ratio drag: ~{0.01*100:.2f}% per year")
print(f"Total performance drag: ~{(te + 0.0001*252)*100:.3f}%")`}),e.jsx(q,{title:"Computing Index Weight After a Stock Split",difficulty:"beginner",problem:"Reliance Industries does a 1:1 bonus issue (stock split). Its price halves from INR 2,500 to INR 1,250. What happens to its Nifty 50 weight?",solution:[{step:"Before split",formula:"\\text{Market Cap} = 2500 \\times 6 \\text{ billion shares} = \\text{INR } 15 \\text{ lakh crore}"},{step:"After split",formula:"\\text{Market Cap} = 1250 \\times 12 \\text{ billion shares} = \\text{INR } 15 \\text{ lakh crore}",explanation:"The market cap is unchanged -- price halves, shares double."},{step:"Index weight unchanged",formula:"\\text{Weight}_{\\text{after}} = \\text{Weight}_{\\text{before}} \\approx 10\\%",explanation:"Free-float market cap is unchanged, so the index weight remains the same. The NSE Indices team adjusts the divisor to ensure no discontinuity in the index value. No rebalancing is needed."}]}),e.jsx(w,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Indian equities offer a rich universe for quantitative strategies, from large-cap Nifty 50 stocks with tight spreads and deep liquidity, to mid/small-caps with higher alpha potential but greater execution challenges. Key considerations: (1) the Nifty is heavily concentrated in Financials (~35%), (2) IT stocks provide INR/USD hedging, (3) ETFs are growing but still have lower liquidity than direct equity, (4) corporate actions (bonus, splits, rights issues) require careful data handling, and (5) F&O lot sizes define the minimum tradeable unit for derivatives."})})]})}const de=Object.freeze(Object.defineProperty({__proto__:null,default:G},Symbol.toStringTag,{value:"Module"}));function H(){const[r,_]=f.useState(6.5),[d,S]=f.useState(1),[n,v]=f.useState(.3),i=[.25,.5,1,2,3,5,7,10,15,20,30],g=i.map(k=>r+d*(1-Math.exp(-.5*k))+n*k*Math.exp(-.3*k)),u=500,y=200,N=50,b=15,m=20,a=35,s=u-N-b,l=y-m-a,j=Math.max(...g)*1.05,x=Math.min(...g)*.95,c=k=>N+k/30*s,p=k=>m+l-(k-x)/(j-x)*l,h=i.map((k,M)=>`${M===0?"M":"L"}${c(k).toFixed(1)},${p(g[M]).toFixed(1)}`).join(" "),T=g[i.indexOf(1)],I=g[i.indexOf(10)];return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Indian G-Sec Yield Curve"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Model the G-Sec yield curve by adjusting the RBI repo rate, term premium, and curvature."}),e.jsxs("div",{className:"mb-4 grid grid-cols-3 gap-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Short Rate = ",r.toFixed(1),"%"]}),e.jsx("input",{type:"range",min:"4",max:"9",step:"0.1",value:r,onChange:k=>_(parseFloat(k.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Term Premium = ",d.toFixed(1),"%"]}),e.jsx("input",{type:"range",min:"-1",max:"3",step:"0.1",value:d,onChange:k=>S(parseFloat(k.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Curvature = ",n.toFixed(1)]}),e.jsx("input",{type:"range",min:"-1",max:"2",step:"0.1",value:n,onChange:k=>v(parseFloat(k.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:`0 0 ${u} ${y}`,className:"w-full max-w-xl mx-auto block",children:[e.jsx("line",{x1:N,y1:m+l,x2:N+s,y2:m+l,stroke:"#9ca3af",strokeWidth:"1"}),e.jsx("line",{x1:N,y1:m,x2:N,y2:m+l,stroke:"#9ca3af",strokeWidth:"1"}),e.jsx("path",{d:h,fill:"none",stroke:"#6366f1",strokeWidth:"2.5"}),i.map((k,M)=>e.jsx("circle",{cx:c(k),cy:p(g[M]),r:"3",fill:"#6366f1"},M)),e.jsx("text",{x:N+s/2,y:y-4,textAnchor:"middle",className:"text-[10px]",fill:"#6b7280",children:"Maturity (Years)"})]}),e.jsxs("div",{className:"mt-2 grid grid-cols-3 gap-2 text-center text-xs",children:[e.jsxs("div",{className:"rounded bg-gray-50 p-2 dark:bg-gray-800",children:[e.jsx("div",{className:"text-gray-500",children:"1Y Yield"}),e.jsxs("div",{className:"font-bold text-gray-700 dark:text-gray-300",children:[T.toFixed(2),"%"]})]}),e.jsxs("div",{className:"rounded bg-gray-50 p-2 dark:bg-gray-800",children:[e.jsx("div",{className:"text-gray-500",children:"10Y Yield"}),e.jsxs("div",{className:"font-bold text-gray-700 dark:text-gray-300",children:[I.toFixed(2),"%"]})]}),e.jsxs("div",{className:"rounded bg-indigo-50 p-2 dark:bg-indigo-900/30",children:[e.jsx("div",{className:"text-indigo-500",children:"10Y-1Y Spread"}),e.jsxs("div",{className:"font-bold text-indigo-700 dark:text-indigo-300",children:[((I-T)*100).toFixed(0)," bps"]})]})]})]})}function Y(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Indian Fixed Income: G-Secs, Corporate Bonds, and the RBI Yield Curve"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"India's fixed income market, anchored by Government Securities (G-Secs), is the second-largest component of the financial system after equities. Understanding bond pricing, duration, and the yield curve is essential for multi-asset quantitative strategies."}),e.jsx(E,{title:"Government Securities (G-Secs)",label:"Definition 2.1",definition:e.jsx(e.Fragment,{children:"G-Secs are sovereign debt instruments issued by the Government of India through the RBI. They include Treasury Bills (91, 182, 364-day maturities) and dated G-Secs (up to 40 years). Being sovereign, they carry zero credit risk in INR terms and serve as the benchmark risk-free rate for all Indian fixed income pricing."}),notation:e.jsx(e.Fragment,{children:"Risk-free rate proxy: 91-day T-Bill (~6.5--7.0%). Benchmark: 10Y G-Sec yield (~7.0--7.5%)."})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Bond Pricing Mathematics"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The price of a fixed-coupon bond with semi-annual payments:"}),e.jsx(t.BlockMath,{math:"P = \\sum_{t=1}^{2n} \\frac{c \\cdot F / 2}{(1 + y/2)^t} + \\frac{F}{(1 + y/2)^{2n}}"}),e.jsx(F,{title:"Duration-Convexity Price Approximation",label:"Theorem 2.1",statement:e.jsxs(e.Fragment,{children:["For a yield change ",e.jsx(t.InlineMath,{math:"\\Delta y"}),":",e.jsx(t.BlockMath,{math:"\\frac{\\Delta P}{P} \\approx -D_{\\text{mod}} \\cdot \\Delta y + \\frac{1}{2} C \\cdot (\\Delta y)^2"}),"A 10Y G-Sec with duration 7.5 loses approximately 3.75% for a 50 bps rate hike. For a INR 100 crore position, this is a INR 3.75 crore mark-to-market loss."]})}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Instrument"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Maturity"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Yield"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Duration"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"91-day T-Bill"}),e.jsx("td",{className:"px-4 py-2",children:"3M"}),e.jsx("td",{className:"px-4 py-2",children:"6.5%"}),e.jsx("td",{className:"px-4 py-2",children:"0.25"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"5Y G-Sec"}),e.jsx("td",{className:"px-4 py-2",children:"5Y"}),e.jsx("td",{className:"px-4 py-2",children:"7.1%"}),e.jsx("td",{className:"px-4 py-2",children:"4.3"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"10Y G-Sec"}),e.jsx("td",{className:"px-4 py-2",children:"10Y"}),e.jsx("td",{className:"px-4 py-2",children:"7.3%"}),e.jsx("td",{className:"px-4 py-2",children:"7.5"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"AAA Corp Bond"}),e.jsx("td",{className:"px-4 py-2",children:"5Y"}),e.jsx("td",{className:"px-4 py-2",children:"7.8%"}),e.jsx("td",{className:"px-4 py-2",children:"4.2"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"SDL"}),e.jsx("td",{className:"px-4 py-2",children:"10Y"}),e.jsx("td",{className:"px-4 py-2",children:"7.5%"}),e.jsx("td",{className:"px-4 py-2",children:"7.2"})]})]})]})}),e.jsx(H,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Nelson-Siegel Yield Curve Model"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The Nelson-Siegel model parameterizes the yield curve with just 4 parameters:"}),e.jsx(t.BlockMath,{math:"y(\\tau) = \\beta_0 + \\beta_1 \\frac{1 - e^{-\\lambda\\tau}}{\\lambda\\tau} + \\beta_2 \\left(\\frac{1 - e^{-\\lambda\\tau}}{\\lambda\\tau} - e^{-\\lambda\\tau}\\right)"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"\\beta_0"})," is the long-run level, ",e.jsx(t.InlineMath,{math:"\\beta_1"})," ","is the slope, ",e.jsx(t.InlineMath,{math:"\\beta_2"})," is the curvature, and"," ",e.jsx(t.InlineMath,{math:"\\lambda"})," controls the decay rate."]}),e.jsx(w,{title:"Credit Spreads in India",type:"info",children:e.jsx("p",{children:"The spread between AAA corporate bonds and G-Secs is typically 50--100 bps. AA-rated bonds trade 100--200 bps above G-Secs. Credit spread strategies involve going long corporate bonds and hedging duration with G-Sec futures or interest rate swaps (IRS). SEBI has introduced credit default swaps (CDS) to facilitate credit risk transfer."})}),e.jsx(C,{title:"gsec_analysis.py",runnable:!0,code:`import numpy as np

def bond_price(coupon, face, ytm, maturity, freq=2):
    """Price a fixed-coupon bond with semi-annual payments."""
    n = int(maturity * freq)
    c = coupon * face / freq
    y = ytm / freq
    pv = sum(c / (1 + y)**t for t in range(1, n + 1))
    pv += face / (1 + y)**n
    return pv

def mod_duration(coupon, face, ytm, maturity, freq=2):
    """Modified duration via numerical differentiation."""
    dp = 0.0001
    p = bond_price(coupon, face, ytm, maturity, freq)
    p_up = bond_price(coupon, face, ytm + dp, maturity, freq)
    p_down = bond_price(coupon, face, ytm - dp, maturity, freq)
    return -(p_up - p_down) / (2 * dp * p)

def convexity_calc(coupon, face, ytm, maturity, freq=2):
    """Bond convexity."""
    dp = 0.0001
    p = bond_price(coupon, face, ytm, maturity, freq)
    p_up = bond_price(coupon, face, ytm + dp, maturity, freq)
    p_down = bond_price(coupon, face, ytm - dp, maturity, freq)
    return (p_up + p_down - 2 * p) / (dp**2 * p)

# --- 10Y G-Sec Analysis ---
print("=== 10-Year G-Sec Bond Analysis ===")
coupon = 0.0726  # 7.26% coupon
ytm = 0.0730     # 7.30% YTM
maturity = 10
face = 100

price = bond_price(coupon, face, ytm, maturity)
dur = mod_duration(coupon, face, ytm, maturity)
conv = convexity_calc(coupon, face, ytm, maturity)

print(f"Coupon:     {coupon*100:.2f}%")
print(f"YTM:        {ytm*100:.2f}%")
print(f"Price:      INR {price:.4f}")
print(f"Mod Duration: {dur:.4f}")
print(f"Convexity:  {conv:.2f}")

# RBI rate change scenarios
print("\\n=== RBI Rate Change Impact ===")
position_cr = 100  # INR 100 crore
for dy_bps in [-50, -25, 25, 50, 100]:
    dy = dy_bps / 10000
    dp_pct = -dur * dy + 0.5 * conv * dy**2
    pnl = dp_pct * position_cr
    print(f"  {dy_bps:+4d} bps: Price change {dp_pct*100:+.3f}%, P&L = INR {pnl:+.2f} Cr")

# --- G-Sec Yield Curve ---
print("\\n=== G-Sec Yield Curve ===")
maturities = [0.25, 0.5, 1, 2, 3, 5, 7, 10, 15, 20, 30]
yields_pct = [6.50, 6.60, 6.80, 7.00, 7.10, 7.20, 7.25, 7.30, 7.35, 7.38, 7.40]

for m, y in zip(maturities, yields_pct):
    spread = (y - yields_pct[2]) * 100  # bps over 1Y
    bar = '█' * int(y * 3)
    print(f"  {m:>5.2f}Y: {y:.2f}% {spread:>+5.0f}bp {bar}")

# Carry and rolldown
print("\\n=== Carry Trade Analysis (Buy 10Y, Fund at Repo) ===")
repo = 6.50 / 100
ten_y = 7.30 / 100
carry = ten_y - repo
rolldown = 0.0005  # 5 bps/year price appreciation from rolling down curve
total_return = carry + rolldown
print(f"Carry (10Y - Repo): {carry*100:.2f}%")
print(f"Rolldown:           {rolldown*100:.2f}%")
print(f"Total expected:     {total_return*100:.2f}%")
print(f"Break-even rate rise: {total_return/dur*10000:.0f} bps")`}),e.jsx(q,{title:"Duration Hedging a G-Sec Portfolio",difficulty:"intermediate",problem:"You hold INR 50 crore of 10Y G-Secs (duration 7.5). How many 5Y G-Sec futures contracts (duration 4.3, notional INR 2 lakh) do you need to sell to hedge duration risk?",solution:[{step:"Compute dollar duration of portfolio",formula:"DD_{\\text{port}} = 50 \\times 7.5 = 375 \\text{ Cr-years}"},{step:"Compute dollar duration per futures contract",formula:"DD_{\\text{fut}} = 0.02 \\times 4.3 = 0.086 \\text{ Cr-years}"},{step:"Number of contracts",formula:"n = \\frac{375}{0.086} \\approx 4,360 \\text{ contracts}",explanation:"Sell 4,360 five-year G-Sec futures to neutralize the portfolio duration. This hedges against parallel yield curve shifts but not twists."}]}),e.jsx(w,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Indian fixed income revolves around G-Secs and the RBI's monetary policy. Duration and convexity are essential risk metrics. Key quant strategies include: (1) curve steepener/flattener trades, (2) G-Sec carry with repo funding, (3) credit spread trading between AAA corporates and G-Secs, and (4) event-driven trading around RBI MPC meetings. The Nelson-Siegel model provides a parsimonious yield curve representation."})})]})}const ce=Object.freeze(Object.defineProperty({__proto__:null,default:Y},Symbol.toStringTag,{value:"Module"}));function Q(){const[r,_]=f.useState(2e4),[d,S]=f.useState(200),[n,v]=f.useState("call"),[i,g]=f.useState("long"),u=Array.from({length:41},(o,B)=>r-2e3+B*100),y=u.map(o=>{let B=Math.max(n==="call"?o-r:r-o,0),R=i==="long"?B-d:d-B;return{spot:o,pnl:R}}),N=500,b=200,m=55,a=15,s=20,l=35,j=N-m-a,x=b-s-l,c=Math.min(...y.map(o=>o.pnl)),p=Math.max(...y.map(o=>o.pnl)),h=Math.max(p-c,1),T=o=>m+(o-u[0])/(u[u.length-1]-u[0])*j,I=o=>s+x-(o-c)/h*x,k=y.map((o,B)=>`${B===0?"M":"L"}${T(o.spot).toFixed(1)},${I(o.pnl).toFixed(1)}`).join(" "),M=i==="long"?n==="call"?"Unlimited":`INR ${(r-d).toFixed(0)}`:`INR ${d}`,A=i==="long"?`INR ${d}`:n==="call"?"Unlimited":`INR ${(r-d).toFixed(0)}`;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Nifty Option Payoff Diagram"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Visualize P&L at expiry for Nifty options. Adjust strike, premium, type, and position."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Strike: ",r]}),e.jsx("input",{type:"range",min:"18000",max:"22000",step:"100",value:r,onChange:o=>_(parseInt(o.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Premium: INR ",d]}),e.jsx("input",{type:"range",min:"50",max:"800",step:"10",value:d,onChange:o=>S(parseInt(o.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("select",{value:n,onChange:o=>v(o.target.value),className:"rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200",children:[e.jsx("option",{value:"call",children:"Call"}),e.jsx("option",{value:"put",children:"Put"})]}),e.jsxs("select",{value:i,onChange:o=>g(o.target.value),className:"rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200",children:[e.jsx("option",{value:"long",children:"Long (Buy)"}),e.jsx("option",{value:"short",children:"Short (Sell)"})]})]}),e.jsxs("svg",{viewBox:`0 0 ${N} ${b}`,className:"w-full max-w-xl mx-auto block",children:[e.jsx("line",{x1:m,y1:s+x,x2:m+j,y2:s+x,stroke:"#9ca3af",strokeWidth:"1"}),e.jsx("line",{x1:m,y1:s,x2:m,y2:s+x,stroke:"#9ca3af",strokeWidth:"1"}),e.jsx("line",{x1:m,y1:I(0),x2:m+j,y2:I(0),stroke:"#9ca3af",strokeWidth:"0.5",strokeDasharray:"4,3"}),e.jsx("path",{d:k,fill:"none",stroke:i==="long"?"#22c55e":"#ef4444",strokeWidth:"2.5"}),e.jsx("line",{x1:T(r),y1:s,x2:T(r),y2:s+x,stroke:"#6366f1",strokeWidth:"1",strokeDasharray:"3,3"}),e.jsx("text",{x:m+j/2,y:b-4,textAnchor:"middle",className:"text-[10px]",fill:"#6b7280",children:"Nifty at Expiry"})]}),e.jsxs("div",{className:"mt-2 grid grid-cols-3 gap-2 text-center text-xs",children:[e.jsxs("div",{className:"rounded bg-green-50 p-2 dark:bg-green-900/30",children:[e.jsx("div",{className:"text-green-600 dark:text-green-400",children:"Max Profit"}),e.jsx("div",{className:"font-bold text-green-700 dark:text-green-300",children:M})]}),e.jsxs("div",{className:"rounded bg-red-50 p-2 dark:bg-red-900/30",children:[e.jsx("div",{className:"text-red-600 dark:text-red-400",children:"Max Loss"}),e.jsx("div",{className:"font-bold text-red-700 dark:text-red-300",children:A})]}),e.jsxs("div",{className:"rounded bg-gray-50 p-2 dark:bg-gray-800",children:[e.jsx("div",{className:"text-gray-500",children:"Breakeven"}),e.jsx("div",{className:"font-bold text-gray-700 dark:text-gray-300",children:n==="call"?r+d:r-d})]})]})]})}function K(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Indian Derivatives: Nifty and Bank Nifty F&O"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"India has one of the world's most active derivatives markets. The NSE's F&O segment trades Nifty 50, Bank Nifty, Nifty Financial Services, and individual stock futures and options. Understanding lot sizes, margin requirements, and settlement mechanics is essential for quantitative derivatives strategies."}),e.jsx(E,{title:"Index Futures and Options on NSE",label:"Definition 3.1",definition:e.jsx(e.Fragment,{children:"A Nifty futures contract obligates the buyer to purchase the Nifty 50 index at a specified price on expiry. Nifty options give the right (not obligation) to buy (call) or sell (put) at the strike price. NSE offers weekly and monthly expiry contracts. The lot size for Nifty is 25 units (notional ~INR 5 lakh), and Bank Nifty is 15 units."}),notation:e.jsxs(e.Fragment,{children:["Futures pricing: ",e.jsx(t.InlineMath,{math:"F = S \\cdot e^{(r-q)T}"})," where"," ",e.jsx(t.InlineMath,{math:"r"})," is the risk-free rate (RBI repo) and"," ",e.jsx(t.InlineMath,{math:"q"})," is the dividend yield."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"F&O Contract Specifications"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"Contract"}),e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"Lot Size"}),e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"Tick Size"}),e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"Expiry"}),e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"Margin (Approx)"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2 font-medium",children:"Nifty Futures"}),e.jsx("td",{className:"px-3 py-2",children:"25"}),e.jsx("td",{className:"px-3 py-2",children:"INR 0.05"}),e.jsx("td",{className:"px-3 py-2",children:"Monthly (last Thu)"}),e.jsx("td",{className:"px-3 py-2",children:"~INR 1.2L"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2 font-medium",children:"Nifty Options"}),e.jsx("td",{className:"px-3 py-2",children:"25"}),e.jsx("td",{className:"px-3 py-2",children:"INR 0.05"}),e.jsx("td",{className:"px-3 py-2",children:"Weekly (Thu)"}),e.jsx("td",{className:"px-3 py-2",children:"Premium"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2 font-medium",children:"Bank Nifty Futures"}),e.jsx("td",{className:"px-3 py-2",children:"15"}),e.jsx("td",{className:"px-3 py-2",children:"INR 0.05"}),e.jsx("td",{className:"px-3 py-2",children:"Monthly"}),e.jsx("td",{className:"px-3 py-2",children:"~INR 1.5L"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2 font-medium",children:"Bank Nifty Options"}),e.jsx("td",{className:"px-3 py-2",children:"15"}),e.jsx("td",{className:"px-3 py-2",children:"INR 0.05"}),e.jsx("td",{className:"px-3 py-2",children:"Weekly (Wed)"}),e.jsx("td",{className:"px-3 py-2",children:"Premium"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-3 py-2 font-medium",children:"Stock Futures"}),e.jsx("td",{className:"px-3 py-2",children:"Varies"}),e.jsx("td",{className:"px-3 py-2",children:"INR 0.05"}),e.jsx("td",{className:"px-3 py-2",children:"Monthly"}),e.jsx("td",{className:"px-3 py-2",children:"~20-30% of notional"})]})]})]})}),e.jsx(F,{title:"Put-Call Parity for Nifty Options",label:"Theorem 3.1",statement:e.jsxs(e.Fragment,{children:["For European-style Nifty options (cash-settled):",e.jsx(t.BlockMath,{math:"C - P = S \\cdot e^{-qT} - K \\cdot e^{-rT}"}),"where ",e.jsx(t.InlineMath,{math:"C"})," and ",e.jsx(t.InlineMath,{math:"P"})," are call and put prices,"," ",e.jsx(t.InlineMath,{math:"S"})," is the Nifty spot, ",e.jsx(t.InlineMath,{math:"K"})," is the strike,"," ",e.jsx(t.InlineMath,{math:"r"})," is the RBI rate, ",e.jsx(t.InlineMath,{math:"q"})," is the dividend yield, and ",e.jsx(t.InlineMath,{math:"T"})," is time to expiry. Violations of put-call parity create arbitrage opportunities (box spreads)."]})}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The margin system on NSE uses SPAN (Standard Portfolio Analysis of Risk) plus an exposure margin. SPAN computes the worst-case portfolio loss across 16 scenario combinations of price moves and volatility changes:"}),e.jsx(t.BlockMath,{math:"\\text{SPAN Margin} = \\max_{i=1}^{16} \\left(\\sum_j \\Delta V_j^{(i)}\\right)"}),e.jsx(Q,{}),e.jsx(w,{title:"Weekly Expiry Revolution",type:"info",children:e.jsx("p",{children:"The introduction of weekly Nifty options (2019) and Bank Nifty options transformed the Indian derivatives landscape. Weekly options now account for over 90% of total option volume on NSE. Popular quant strategies include: (1) short straddles/strangles on Thursday expiry, (2) iron condors with weekly hedges, (3) dispersion trading between index and stock options. SEBI has restricted weekly expiry contracts to one per exchange per index to curb excessive speculation."})}),e.jsx(C,{title:"nifty_fo_analysis.py",runnable:!0,code:`import numpy as np
from scipy.stats import norm

# --- Nifty F&O Contract Analysis ---
nifty_spot = 20000
lot_size = 25
rf = 0.065       # RBI repo rate
div_yield = 0.012  # Nifty dividend yield ~1.2%

# Futures fair value
T_monthly = 30 / 365
futures_fair = nifty_spot * np.exp((rf - div_yield) * T_monthly)
print("=== Nifty Futures Analysis ===")
print(f"Spot: {nifty_spot}")
print(f"Fair value (30-day): {futures_fair:.2f}")
print(f"Basis: {futures_fair - nifty_spot:.2f} points ({(futures_fair/nifty_spot - 1)*100:.3f}%)")
print(f"Notional per lot: INR {nifty_spot * lot_size:,}")
print()

# Options analysis
sigma = 0.14  # India VIX ~14%
K = 20000
T = 7 / 365  # Weekly expiry

d1 = (np.log(nifty_spot / K) + (rf - div_yield + 0.5 * sigma**2) * T) / (sigma * np.sqrt(T))
d2 = d1 - sigma * np.sqrt(T)
call = nifty_spot * np.exp(-div_yield * T) * norm.cdf(d1) - K * np.exp(-rf * T) * norm.cdf(d2)
put = K * np.exp(-rf * T) * norm.cdf(-d2) - nifty_spot * np.exp(-div_yield * T) * norm.cdf(-d1)

print("=== Weekly ATM Options (7 DTE) ===")
print(f"Call premium: INR {call:.2f} per unit (INR {call * lot_size:.0f} per lot)")
print(f"Put premium:  INR {put:.2f} per unit (INR {put * lot_size:.0f} per lot)")
print(f"Straddle:     INR {call + put:.2f} ({(call + put)/nifty_spot*100:.2f}%)")
print()

# Expected move from straddle
expected_move = (call + put) * 0.85  # empirical adjustment
print(f"Expected weekly move: +/- {expected_move:.0f} points ({expected_move/nifty_spot*100:.2f}%)")

# Option chain
print("\\n=== Nifty Option Chain (7 DTE) ===")
print(f"{'Strike':>8} {'Call':>8} {'Put':>8} {'IV':>6} {'Delta':>7}")
for k in range(19500, 20600, 100):
    d1_k = (np.log(nifty_spot / k) + (rf - div_yield + 0.5 * sigma**2) * T) / (sigma * np.sqrt(T))
    d2_k = d1_k - sigma * np.sqrt(T)
    c = nifty_spot * np.exp(-div_yield * T) * norm.cdf(d1_k) - k * np.exp(-rf * T) * norm.cdf(d2_k)
    p = k * np.exp(-rf * T) * norm.cdf(-d2_k) - nifty_spot * np.exp(-div_yield * T) * norm.cdf(-d1_k)
    delta = norm.cdf(d1_k)
    moneyness = 'ATM' if abs(k - nifty_spot) < 50 else ('ITM' if k < nifty_spot else 'OTM')
    print(f"{k:>8} {c:>8.2f} {p:>8.2f} {sigma*100:>5.1f}% {delta:>7.3f} {moneyness}")

# Transaction costs
print("\\n=== F&O Transaction Costs (per lot) ===")
brokerage = 20  # Zerodha flat fee
stt_options = call * lot_size * 0.000625  # STT on sell side
stamp = call * lot_size * 0.00003
sebi = call * lot_size * 0.000001
gst = brokerage * 0.18
total = brokerage + stt_options + stamp + sebi + gst
print(f"Brokerage:  INR {brokerage:.2f}")
print(f"STT:        INR {stt_options:.2f}")
print(f"GST:        INR {gst:.2f}")
print(f"Total:      INR {total:.2f} ({total/(call*lot_size)*100:.2f}% of premium)")`}),e.jsx(q,{title:"Computing Nifty Futures Basis",difficulty:"beginner",problem:"Nifty spot is at 20,000 with RBI repo rate 6.5% and dividend yield 1.2%. What should the 1-month Nifty futures trade at?",solution:[{step:"Apply cost-of-carry model",formula:"F = S \\cdot e^{(r-q)T} = 20000 \\times e^{(0.065 - 0.012) \\times 30/365}"},{step:"Compute",formula:"F = 20000 \\times e^{0.00436} = 20000 \\times 1.00437 = 20,087",explanation:"The futures should trade approximately 87 points above spot. This 87-point basis represents the net cost of carry (interest minus dividends). If the actual futures trade higher, it signals bullish sentiment; if lower, bearish."}]}),e.jsx(w,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Indian derivatives, particularly Nifty and Bank Nifty options, offer exceptional liquidity and tight spreads for quantitative strategies. Key features: (1) weekly expiry enables short-term strategies, (2) SPAN margin system requires careful capital management, (3) STT on sell side of options adds friction, (4) European-style exercise simplifies pricing. The options market provides rich data for implied volatility analysis, skew trading, and dispersion strategies."})})]})}const pe=Object.freeze(Object.defineProperty({__proto__:null,default:K},Symbol.toStringTag,{value:"Module"}));function $(){const[r,_]=f.useState("yfinance"),[d,S]=f.useState("ohlcv"),n={yfinance:{name:"yfinance (Yahoo Finance)",free:!0,delay:"15 min",coverage:"NSE, BSE equity",quality:"Good",api:"Python library"},nse_bhav:{name:"NSE Bhavcopy",free:!0,delay:"EOD",coverage:"NSE equity, F&O",quality:"Official",api:"CSV download"},bse_api:{name:"BSE API",free:!0,delay:"EOD",coverage:"BSE equity",quality:"Official",api:"REST API"},kite:{name:"Zerodha Kite Connect",free:!1,delay:"Real-time",coverage:"All segments",quality:"Excellent",api:"REST + WebSocket"},nse_live:{name:"NSE Live Market Data",free:!1,delay:"Real-time",coverage:"Full market depth",quality:"Official",api:"Co-location feed"},bloomberg:{name:"Bloomberg Terminal",free:!1,delay:"Real-time",coverage:"Global + India",quality:"Best",api:"BQL/API"}},v=n[r];return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Indian Market Data Source Comparison"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Compare data sources for Indian market research. Free sources work well for daily backtesting; real-time feeds are needed for intraday strategies."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsx("span",{children:"Data Source"}),e.jsx("select",{value:r,onChange:i=>_(i.target.value),className:"rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200",children:Object.entries(n).map(([i,g])=>e.jsx("option",{value:i,children:g.name},i))})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsx("span",{children:"Data Type"}),e.jsxs("select",{value:d,onChange:i=>S(i.target.value),className:"rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200",children:[e.jsx("option",{value:"ohlcv",children:"OHLCV (Price)"}),e.jsx("option",{value:"tick",children:"Tick Data"}),e.jsx("option",{value:"fundamental",children:"Fundamental"}),e.jsx("option",{value:"options",children:"Options Chain"})]})]})]}),e.jsx("div",{className:"grid grid-cols-2 gap-3 sm:grid-cols-3",children:[{label:"Free",value:v.free?"Yes":"Paid"},{label:"Latency",value:v.delay},{label:"Coverage",value:v.coverage},{label:"Quality",value:v.quality},{label:"Access",value:v.api},{label:"Best For",value:v.free?"Research & Backtest":"Live Trading"}].map((i,g)=>e.jsxs("div",{className:"rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500 dark:text-gray-400",children:i.label}),e.jsx("div",{className:"text-sm font-bold text-gray-700 dark:text-gray-300",children:i.value})]},g))})]})}function U(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Indian Market Data Sources"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Quality data is the lifeblood of quantitative finance. India offers several data sources ranging from free NSE bhavcopy downloads to premium real-time feeds. Choosing the right source depends on your strategy's frequency, universe, and budget."}),e.jsx(E,{title:"Bhavcopy (Daily Settlement File)",label:"Definition 1.1",definition:e.jsx(e.Fragment,{children:"The NSE Bhavcopy is the official end-of-day settlement file published by NSE after market close. It contains OHLC prices, volumes, delivery quantities, and settlement prices for all traded securities. Available free from the NSE website in CSV format. The F&O bhavcopy includes open interest, settlement price, and contract details for all futures and options contracts."}),notation:e.jsx(e.Fragment,{children:"Columns: SYMBOL, SERIES, OPEN, HIGH, LOW, CLOSE, LAST, PREVCLOSE, TOTTRDQTY, TOTTRDVAL, TOTALTRADES, ISIN."})}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"Source"}),e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"Cost"}),e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"Frequency"}),e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"Best For"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2 font-medium",children:"yfinance"}),e.jsx("td",{className:"px-3 py-2",children:"Free"}),e.jsx("td",{className:"px-3 py-2",children:"Daily/Intraday"}),e.jsx("td",{className:"px-3 py-2",children:"Quick research, prototyping"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2 font-medium",children:"NSE Bhavcopy"}),e.jsx("td",{className:"px-3 py-2",children:"Free"}),e.jsx("td",{className:"px-3 py-2",children:"EOD"}),e.jsx("td",{className:"px-3 py-2",children:"Official daily data, F&O OI"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2 font-medium",children:"Zerodha Kite"}),e.jsx("td",{className:"px-3 py-2",children:"INR 2000/mo"}),e.jsx("td",{className:"px-3 py-2",children:"Real-time"}),e.jsx("td",{className:"px-3 py-2",children:"Live algo trading"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2 font-medium",children:"Truedata"}),e.jsx("td",{className:"px-3 py-2",children:"INR 1500/mo"}),e.jsx("td",{className:"px-3 py-2",children:"Tick-level"}),e.jsx("td",{className:"px-3 py-2",children:"HFT, tick data analysis"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-3 py-2 font-medium",children:"Bloomberg"}),e.jsx("td",{className:"px-3 py-2",children:"$20K+/yr"}),e.jsx("td",{className:"px-3 py-2",children:"Real-time"}),e.jsx("td",{className:"px-3 py-2",children:"Institutional research"})]})]})]})}),e.jsx(F,{title:"Data Quality Hierarchy",label:"Theorem 1.1",statement:e.jsxs(e.Fragment,{children:["The reliability of data sources follows a hierarchy based on proximity to the exchange:",e.jsx(t.BlockMath,{math:"\\text{Exchange feed} > \\text{Clearing data} > \\text{Vendor data} > \\text{Scraped data}"}),"Always validate derived data against the official NSE bhavcopy. Common issues include: incorrect split adjustments, missing dividend adjustments, and stale prices for illiquid stocks."]})}),e.jsx($,{}),e.jsx(w,{title:"NSE Data Access Tips",type:"info",children:e.jsx("p",{children:'For research: start with yfinance (append ".NS" to NSE symbols, e.g., "RELIANCE.NS"). For production: use Zerodha Kite Connect API (REST + WebSocket) with historical data access. For tick data: NSE offers co-location tick-by-tick data feeds. SEBI requires all algorithmic traders to use approved data feeds and maintain audit trails.'})}),e.jsx(C,{title:"fetch_nse_data.py",runnable:!0,code:`import numpy as np

# Simulated NSE data fetch (in practice, use yfinance or Kite API)
np.random.seed(42)

# --- Simulate downloading Nifty 50 daily data ---
n_days = 252
dates = [f"2024-{(i//22)+1:02d}-{(i%22)+1:02d}" for i in range(n_days)]

# Generate realistic Nifty OHLCV data
nifty_close = [20000]
for i in range(1, n_days):
    ret = np.random.normal(0.0005, 0.012)
    nifty_close.append(nifty_close[-1] * (1 + ret))

nifty_data = []
for i in range(n_days):
    c = nifty_close[i]
    h = c * (1 + abs(np.random.normal(0, 0.005)))
    l = c * (1 - abs(np.random.normal(0, 0.005)))
    o = l + np.random.random() * (h - l)
    vol = int(np.random.exponential(200000) + 100000)
    nifty_data.append({'date': dates[i], 'open': o, 'high': h, 'low': l, 'close': c, 'volume': vol})

print("=== Nifty 50 Daily Data (Sample) ===")
print(f"{'Date':<12} {'Open':>10} {'High':>10} {'Low':>10} {'Close':>10} {'Volume':>10}")
for d in nifty_data[:10]:
    print(f"{d['date']:<12} {d['open']:>10.2f} {d['high']:>10.2f} {d['low']:>10.2f} {d['close']:>10.2f} {d['volume']:>10,}")

print(f"\\n... ({n_days} total trading days)")
print(f"Start: {nifty_data[0]['close']:.2f}, End: {nifty_data[-1]['close']:.2f}")
print(f"Return: {(nifty_data[-1]['close']/nifty_data[0]['close'] - 1)*100:.2f}%")
print(f"Avg daily volume: {np.mean([d['volume'] for d in nifty_data]):,.0f}")

# --- Data Quality Checks ---
print("\\n=== Data Quality Report ===")
closes = [d['close'] for d in nifty_data]
returns = np.diff(np.log(closes))
print(f"Missing values: 0/{n_days}")
print(f"Zero volume days: {sum(1 for d in nifty_data if d['volume'] == 0)}")
print(f"Max daily return: {max(returns)*100:.2f}%")
print(f"Min daily return: {min(returns)*100:.2f}%")
print(f"Stale prices (0% return): {sum(1 for r in returns if abs(r) < 1e-10)}")
print(f"OHLC consistency (H>=L): {all(d['high'] >= d['low'] for d in nifty_data)}")

# --- yfinance Usage Example (commented - for reference) ---
print("\\n=== yfinance Usage (Reference) ===")
print("# import yfinance as yf")
print("# nifty = yf.download('^NSEI', start='2024-01-01', end='2024-12-31')")
print("# tcs = yf.download('TCS.NS', start='2024-01-01')")
print("# reliance = yf.download('RELIANCE.NS', period='5y')")
print("# # For multiple stocks:")
print("# stocks = yf.download(['TCS.NS', 'INFY.NS', 'HDFCBANK.NS'], period='1y')")`}),e.jsx(q,{title:"Validating NSE Data Quality",difficulty:"beginner",problem:"You download 5 years of TCS daily data from yfinance. The data shows TCS dropping 50% on one day in 2022. Is this real or a data error?",solution:[{step:"Check for corporate actions",formula:"\\text{TCS had a 1:1 bonus issue in June 2022}",explanation:"The apparent 50% drop is due to the bonus issue (stock split). The price halves but shares double, so market cap is unchanged."},{step:"Verify with adjusted close",formula:'\\text{Use "Adj Close" column which accounts for splits and dividends}',explanation:"yfinance provides both raw Close and Adj Close. Always use Adj Close for return calculations. Alternatively, apply split factors from NSE corporate action data."},{step:"Cross-validate",formula:"\\text{Compare with NSE bhavcopy for the same date}",explanation:"The NSE bhavcopy will show the ex-bonus price. Always cross-check suspicious moves against official NSE data and corporate action records."}]}),e.jsx(w,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Start with yfinance for research (free, easy, adequate for daily strategies), graduate to Zerodha Kite for live trading, and consider premium feeds for HFT. Always validate data against NSE bhavcopy, adjust for corporate actions (splits, bonuses, dividends), and check for survivorship bias. The quality of your backtest is only as good as the quality of your data."})})]})}const xe=Object.freeze(Object.defineProperty({__proto__:null,default:U},Symbol.toStringTag,{value:"Module"}));function X(){const[r,_]=f.useState(!0),[d,S]=f.useState(!0),[n,v]=f.useState(2),i=200,g=[],u=[];let y=3e3;for(let o=0;o<i;o++)y*=1+(Math.sin(o*.05)*.005+.001+(Math.random()-.5)*.02),o===100?(g.push(y/n),u.push(y),y=y/n):(g.push(y),u.push((o<=100,y*n)));const N=g[i-1]/u[i-1],b=u.map(o=>o*N);let m=1/0,a=-1/0;const s=[...r?g:[],...d?b:[]];for(const o of s)o<m&&(m=o),o>a&&(a=o);m===a&&(m-=1,a+=1),m*=.95,a*=1.05;const l=500,j=200,x=55,c=15,p=20,h=35,T=l-x-c,I=j-p-h,k=o=>x+o/(i-1)*T,M=o=>p+I-(o-m)/(a-m)*I,A=o=>o.map((B,R)=>`${R===0?"M":"L"}${k(R).toFixed(1)},${M(B).toFixed(1)}`).join(" ");return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Corporate Action Adjustment for Indian Stocks"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Compare raw vs adjusted prices around a stock split event. Splits create artificial price drops that must be corrected for accurate return calculations."}),e.jsxs("div",{className:"mb-4 grid grid-cols-3 gap-3",children:[e.jsxs("label",{className:"flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400",children:[e.jsx("input",{type:"checkbox",checked:r,onChange:o=>_(o.target.checked),className:"accent-red-500"}),"Raw Price (with split gap)"]}),e.jsxs("label",{className:"flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400",children:[e.jsx("input",{type:"checkbox",checked:d,onChange:o=>S(o.target.checked),className:"accent-indigo-500"}),"Adjusted Price (continuous)"]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Split Ratio: 1:",n]}),e.jsx("input",{type:"range",min:"2",max:"10",step:"1",value:n,onChange:o=>v(parseInt(o.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:`0 0 ${l} ${j}`,className:"w-full max-w-xl mx-auto block",children:[e.jsx("line",{x1:x,y1:p+I,x2:x+T,y2:p+I,stroke:"#9ca3af",strokeWidth:"1"}),e.jsx("line",{x1:x,y1:p,x2:x,y2:p+I,stroke:"#9ca3af",strokeWidth:"1"}),e.jsx("line",{x1:k(100),y1:p,x2:k(100),y2:p+I,stroke:"#f59e0b",strokeWidth:"1",strokeDasharray:"4,3"}),e.jsx("text",{x:k(100),y:p-4,textAnchor:"middle",className:"text-[9px]",fill:"#f59e0b",children:"Split Date"}),r&&e.jsx("path",{d:A(g),fill:"none",stroke:"#ef4444",strokeWidth:"1.5",opacity:"0.7"}),d&&e.jsx("path",{d:A(b),fill:"none",stroke:"#6366f1",strokeWidth:"2"}),e.jsx("text",{x:x+T/2,y:j-4,textAnchor:"middle",className:"text-[10px]",fill:"#6b7280",children:"Trading Days"})]}),e.jsxs("p",{className:"mt-2 text-center text-sm text-gray-600 dark:text-gray-400",children:["The raw price shows a ",((1-1/n)*100).toFixed(0),"% drop at the split, but the adjusted price is continuous. Always use adjusted prices for return calculations."]})]})}function Z(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Data Cleaning for Indian Market Data"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Raw market data from NSE and BSE contains numerous artifacts that must be cleaned before use in quantitative research. Failure to properly handle corporate actions, survivorship bias, and data errors can lead to severely misleading backtest results."}),e.jsx(E,{title:"Corporate Action Adjustment",label:"Definition 2.1",definition:e.jsxs(e.Fragment,{children:["Corporate actions (splits, bonuses, rights issues, dividends) change the number of shares or the price per share without changing the company's market capitalization. The adjustment factor for a 1:N bonus issue is:",e.jsx(t.BlockMath,{math:"\\text{Adj Factor} = \\frac{1}{1 + N}, \\quad P_{\\text{adj}} = P_{\\text{raw}} \\times \\text{Adj Factor}"}),"All historical prices before the ex-date must be multiplied by this factor."]}),notation:e.jsx(e.Fragment,{children:"For a 1:1 bonus (like TCS June 2022): factor = 1/2. For a 5:1 split: factor = 1/5. Cumulative adjustment: multiply all factors for events after each date."})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Common Data Quality Issues in Indian Markets"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Issue"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Description"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Impact on Backtest"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Fix"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2 font-medium",children:"Splits/Bonuses"}),e.jsx("td",{className:"px-4 py-2",children:"Price drops without value change"}),e.jsx("td",{className:"px-4 py-2",children:"Huge false negative returns"}),e.jsx("td",{className:"px-4 py-2",children:"Apply adjustment factors"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2 font-medium",children:"Dividends"}),e.jsx("td",{className:"px-4 py-2",children:"Price drops by dividend amount"}),e.jsx("td",{className:"px-4 py-2",children:"Understated total returns"}),e.jsx("td",{className:"px-4 py-2",children:"Use total return index or adjust"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2 font-medium",children:"Survivorship Bias"}),e.jsx("td",{className:"px-4 py-2",children:"Delisted stocks excluded"}),e.jsx("td",{className:"px-4 py-2",children:"Overstated strategy returns"}),e.jsx("td",{className:"px-4 py-2",children:"Include delisted stock data"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2 font-medium",children:"Stale Prices"}),e.jsx("td",{className:"px-4 py-2",children:"Illiquid stocks not traded"}),e.jsx("td",{className:"px-4 py-2",children:"False zero volatility"}),e.jsx("td",{className:"px-4 py-2",children:"Filter by minimum volume"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2 font-medium",children:"Circuit Limits"}),e.jsx("td",{className:"px-4 py-2",children:"Prices frozen at limit"}),e.jsx("td",{className:"px-4 py-2",children:"Understated volatility"}),e.jsx("td",{className:"px-4 py-2",children:"Flag circuit-hit days"})]})]})]})}),e.jsx(F,{title:"Survivorship Bias Magnitude",label:"Theorem 2.1",statement:e.jsxs(e.Fragment,{children:["Survivorship bias inflates annual returns by approximately 1--3% for Indian equity strategies. If the universe has an annual delisting rate of"," ",e.jsx(t.InlineMath,{math:"d"})," and delisted stocks underperform by"," ",e.jsx(t.InlineMath,{math:"\\delta"})," on average:",e.jsx(t.BlockMath,{math:"\\text{Bias} \\approx d \\times \\delta"}),"For NSE with ~3% annual delisting rate and ~15% average underperformance of delisted stocks: Bias ",e.jsx(t.InlineMath,{math:"\\approx 0.03 \\times 0.15 = 0.45\\%"})," per year. Over a 10-year backtest, this compounds to ~4.6% of cumulative alpha."]})}),e.jsx(X,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Data Cleaning Pipeline"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"A robust data pipeline for Indian market data should follow these steps:"}),e.jsxs("ol",{className:"ml-6 list-decimal space-y-2 text-sm text-gray-700 dark:text-gray-300",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Download:"})," Fetch raw OHLCV from NSE bhavcopy or yfinance"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Corporate Actions:"})," Apply split, bonus, and dividend adjustments"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Validation:"})," Check OHLC consistency (H ≥ max(O,C), L ≤ min(O,C))"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Outlier Detection:"})," Flag returns > 20% for manual review"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Liquidity Filter:"})," Remove stocks with daily volume < INR 1 crore"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Universe Definition:"})," Point-in-time Nifty 50/500 membership"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Return Calculation:"})," Compute log returns from adjusted close"]})]}),e.jsx(w,{title:"Point-in-Time Universe",type:"warning",children:e.jsxs("p",{children:["A critical but often overlooked bias is ",e.jsx("strong",{children:"look-ahead bias in universe selection"}),". Using today's Nifty 50 constituents for a 2015 backtest is wrong -- you must use the Nifty 50 composition as it was in 2015. NSE publishes historical index composition data. Stocks that were in the index in 2015 but were later removed (often due to poor performance) must be included."]})}),e.jsx(C,{title:"data_cleaning_pipeline.py",runnable:!0,code:`import numpy as np

np.random.seed(42)

# --- Simulate Raw NSE Data with Issues ---
n = 500
dates = list(range(n))

# Generate price series with embedded issues
raw_close = [1000.0]
for i in range(1, n):
    ret = np.random.normal(0.0003, 0.015)
    raw_close.append(raw_close[-1] * (1 + ret))

# Inject data quality issues
# 1. Stock split at day 200 (1:2)
split_day = 200
split_ratio = 2
for i in range(split_day, n):
    raw_close[i] = raw_close[i] / split_ratio

# 2. Bonus issue at day 350 (1:1)
bonus_day = 350
for i in range(bonus_day, n):
    raw_close[i] = raw_close[i] / 2

# 3. Stale prices (zero returns for illiquid days)
stale_days = [50, 51, 52, 150, 151]
for d in stale_days:
    raw_close[d] = raw_close[d - 1]

raw_close = np.array(raw_close)

print("=== Data Quality Issues Detection ===")
raw_returns = np.diff(np.log(raw_close))

# Detect large moves (potential corporate actions)
large_moves = np.where(np.abs(raw_returns) > 0.15)[0]
print(f"\\nLarge moves (>15%):")
for d in large_moves:
    print(f"  Day {d+1}: {raw_returns[d]*100:.1f}% (raw close: {raw_close[d]:.2f} -> {raw_close[d+1]:.2f})")

# Detect stale prices
stale = np.where(np.abs(raw_returns) < 1e-10)[0]
print(f"\\nStale prices (0% return): {len(stale)} days at indices {stale[:10]}...")

# --- Apply Adjustments ---
adj_close = raw_close.copy()

# Reverse split adjustment (multiply pre-split prices by 1/split_ratio)
adj_close[:split_day] = adj_close[:split_day] / split_ratio

# Reverse bonus adjustment
adj_close[:bonus_day] = adj_close[:bonus_day] / 2

print(f"\\n=== Adjusted vs Raw Comparison ===")
print(f"{'Metric':<25} {'Raw':>12} {'Adjusted':>12}")
raw_ret_total = (raw_close[-1] / raw_close[0] - 1) * 100
adj_ret_total = (adj_close[-1] / adj_close[0] - 1) * 100
print(f"{'Total return':<25} {raw_ret_total:>11.2f}% {adj_ret_total:>11.2f}%")
print(f"{'Start price':<25} {raw_close[0]:>12.2f} {adj_close[0]:>12.2f}")
print(f"{'End price':<25} {raw_close[-1]:>12.2f} {adj_close[-1]:>12.2f}")

adj_returns = np.diff(np.log(adj_close))
adj_returns_clean = adj_returns[np.abs(adj_returns) > 1e-10]  # Remove stale

print(f"\\n=== Clean Return Statistics ===")
print(f"Mean daily return:  {np.mean(adj_returns_clean)*100:.4f}%")
print(f"Daily volatility:   {np.std(adj_returns_clean)*100:.4f}%")
print(f"Annualized return:  {np.mean(adj_returns_clean)*252*100:.2f}%")
print(f"Annualized vol:     {np.std(adj_returns_clean)*np.sqrt(252)*100:.2f}%")
print(f"Skewness:           {float(np.mean(((adj_returns_clean - np.mean(adj_returns_clean))/np.std(adj_returns_clean))**3)):.4f}")
print(f"Excess kurtosis:    {float(np.mean(((adj_returns_clean - np.mean(adj_returns_clean))/np.std(adj_returns_clean))**4) - 3):.4f}")

# --- Survivorship Bias Example ---
print("\\n=== Survivorship Bias Illustration ===")
n_stocks = 100
n_years = 10
alive = np.ones(n_stocks, dtype=bool)
cum_returns_survivor = []
cum_returns_all = []

for year in range(n_years):
    annual_rets = np.random.normal(0.10, 0.30, n_stocks)
    # Bottom 3% delist
    delist_threshold = np.percentile(annual_rets[alive], 3)
    delisted = (annual_rets < delist_threshold) & alive
    alive[delisted] = False

    survivor_ret = np.mean(annual_rets[alive])
    all_ret = np.mean(annual_rets)
    cum_returns_survivor.append(survivor_ret)
    cum_returns_all.append(all_ret)

surv_total = np.prod([1 + r for r in cum_returns_survivor]) - 1
all_total = np.prod([1 + r for r in cum_returns_all]) - 1
print(f"Survivors only (annualized): {np.mean(cum_returns_survivor)*100:.2f}%")
print(f"All stocks (annualized):     {np.mean(cum_returns_all)*100:.2f}%")
print(f"Survivorship bias:           {(np.mean(cum_returns_survivor) - np.mean(cum_returns_all))*100:.2f}% per year")
print(f"Cumulative bias over {n_years}Y:   {(surv_total - all_total)*100:.1f}%")`}),e.jsx(q,{title:"Adjusting for a Bonus Issue",difficulty:"beginner",problem:"TCS declares a 1:1 bonus with ex-date June 10. On June 9, TCS closed at INR 3,400. On June 10, it opened at INR 1,700. How do you adjust historical prices?",solution:[{step:"Compute the adjustment factor",formula:"\\text{Factor} = \\frac{1}{1 + 1} = 0.5",explanation:"For a 1:1 bonus, the number of shares doubles, so the price adjustment factor is 0.5."},{step:"Adjust all pre-bonus prices",formula:"P_{\\text{adj}}(t) = P_{\\text{raw}}(t) \\times 0.5 \\quad \\forall \\, t < \\text{June 10}",explanation:"Multiply all historical prices before June 10 by 0.5. This makes the time series continuous."},{step:"Verify continuity",formula:"\\text{June 9 adj}: 3400 \\times 0.5 = 1700, \\quad \\text{June 10}: 1700",explanation:"The adjusted close on June 9 equals the open on June 10, confirming no artificial return."}]}),e.jsx(w,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Data cleaning is not glamorous but is arguably the most important step in quantitative research. For Indian markets: (1) always use adjusted prices for return calculations, (2) account for survivorship bias by including delisted stocks, (3) use point-in-time index membership, (4) filter illiquid stocks by volume, and (5) flag circuit-hit days. A clean data pipeline is the foundation of any credible backtest on NSE/BSE data."})})]})}const me=Object.freeze(Object.defineProperty({__proto__:null,default:Z},Symbol.toStringTag,{value:"Module"}));function J(){const[r,_]=f.useState(1e5),[d,S]=f.useState(0),[n,v]=f.useState(20),i=[.001,25e-5,625e-6,125e-6],g=[345e-7,345e-7,5e-4,2e-5],u=[15e-5,3e-5,3e-5,2e-5],y=r*i[d],N=r*g[d],b=(n+N)*.18,m=r*1e-6,a=r*u[d],s=n+y+N+b+m+a,l=r*2e-4,x=(s+l)/r*1e4,c=[{label:"STT",value:`INR ${y.toFixed(2)}`},{label:"Brokerage + GST",value:`INR ${(n+b).toFixed(2)}`},{label:"Total Explicit",value:`INR ${s.toFixed(2)}`},{label:"Total (incl spread)",value:`${x.toFixed(1)} bps`}];return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: NSE Trade Cost Calculator"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Calculate the total transaction cost for different trade types on NSE. Input your trade size and see the cost breakdown in INR and basis points."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["`Trade Value: INR $",r.toLocaleString(),"`"]}),e.jsx("input",{type:"range",min:"10000",max:"10000000",step:"10000",value:r,onChange:p=>_(parseInt(p.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["`Segment: $",["Delivery","Intraday","Options","Futures"][d],"`"]}),e.jsx("input",{type:"range",min:"0",max:"3",step:"1",value:d,onChange:p=>S(parseInt(p.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["`Brokerage: INR $",n,"`"]}),e.jsx("input",{type:"range",min:"0",max:"100",step:"5",value:n,onChange:p=>v(parseInt(p.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsx("div",{className:"grid grid-cols-2 gap-3 sm:grid-cols-4",children:c.map((p,h)=>e.jsxs("div",{className:"rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500 dark:text-gray-400",children:p.label}),e.jsx("div",{className:"text-lg font-bold text-indigo-600 dark:text-indigo-400",children:p.value})]},h))})]})}function ee(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Transaction Cost Components in Indian Markets"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"This section covers essential concepts for quantitative finance in the Indian market context, with applications to NSE, BSE, Nifty 50, and Bank Nifty instruments."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Explicit Costs on NSE"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Every trade on NSE incurs multiple layers of fees. For a typical equity delivery trade on Zerodha: brokerage is zero (for delivery) or INR 20 flat (for intraday/F&O), STT is 0.1% on both buy and sell, exchange transaction charge is 0.00345%, GST is 18% on brokerage + exchange charges, SEBI turnover fee is 0.0001%, and stamp duty varies by state (typically 0.003-0.015%)."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Implicit Costs: Spread and Impact"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The bid-ask spread is the most visible implicit cost. For Nifty 50 stocks, spreads are typically 1-3 bps. For mid-cap stocks outside the top 200, spreads widen to 10-50 bps. Market impact -- the additional price movement caused by your order -- scales with order size relative to daily volume. The square-root model estimates impact as proportional to the square root of participation rate."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Cost Comparison Across Segments"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"F&O trading has lower STT than equity delivery but requires margin capital. Options selling incurs STT only on the sell premium, while futures STT is on the sell-side notional value. Intraday equity has lower STT (0.025%) than delivery (0.1%), creating an incentive structure that affects strategy design."}),e.jsx(E,{title:"Total Transaction Cost",label:"Definition 4.1",definition:e.jsxs(e.Fragment,{children:["The total cost of a trade on NSE/BSE includes explicit costs (brokerage, STT, exchange fees, GST, stamp duty, SEBI turnover fee) and implicit costs (bid-ask spread, market impact, timing cost). For a Zerodha trade: ",e.jsx(t.BlockMath,{math:"\\\\text{Total Cost} = \\\\text{Brokerage} + \\\\text{STT} + \\\\text{Exchange} + \\\\text{GST} + \\\\text{Stamp} + \\\\text{SEBI} + \\\\text{Spread} + \\\\text{Impact}"})]}),notation:e.jsx(e.Fragment,{children:"STT (Securities Transaction Tax) is the largest explicit cost for equity delivery trades at 0.1% on buy and sell sides."})}),e.jsx(t.BlockMath,{math:"\\text{STT}_{\\text{delivery}} = 0.001 \\times \\text{Value}, \\quad \\text{STT}_{\\text{intraday}} = 0.00025 \\times \\text{Sell Value}"}),e.jsx(t.BlockMath,{math:"\\text{STT}_{\\text{options}} = 0.000625 \\times \\text{Sell Premium}, \\quad \\text{STT}_{\\text{futures}} = 0.000125 \\times \\text{Sell Value}"}),e.jsx(t.BlockMath,{math:"\\text{GST} = 0.18 \\times (\\text{Brokerage} + \\text{Exchange Fees})"}),e.jsx(F,{title:"Implementation Shortfall",label:"Theorem 4.1",statement:e.jsxs(e.Fragment,{children:["The implementation shortfall (IS) measures the total cost of executing a trading decision: ",e.jsx(t.BlockMath,{math:"\\\\text{IS} = \\\\text{Paper Return} - \\\\text{Actual Return} = \\\\text{Delay Cost} + \\\\text{Market Impact} + \\\\text{Explicit Costs} + \\\\text{Opportunity Cost}"})," For Indian mid-cap stocks, IS can be 50-200 bps per trade, significantly eroding strategy alpha."]})}),e.jsx(J,{}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Cost Component"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Equity Delivery"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Equity Intraday"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Options"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Futures"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2 font-medium",children:"Brokerage (Zerodha)"}),e.jsx("td",{className:"px-4 py-2",children:"0 (free)"}),e.jsx("td",{className:"px-4 py-2",children:"INR 20 or 0.03%"}),e.jsx("td",{className:"px-4 py-2",children:"INR 20 flat"}),e.jsx("td",{className:"px-4 py-2",children:"INR 20 flat"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2 font-medium",children:"STT"}),e.jsx("td",{className:"px-4 py-2",children:"0.1% (both sides)"}),e.jsx("td",{className:"px-4 py-2",children:"0.025% (sell)"}),e.jsx("td",{className:"px-4 py-2",children:"0.0625% (sell premium)"}),e.jsx("td",{className:"px-4 py-2",children:"0.0125% (sell)"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2 font-medium",children:"Exchange Charges"}),e.jsx("td",{className:"px-4 py-2",children:"0.00345%"}),e.jsx("td",{className:"px-4 py-2",children:"0.00345%"}),e.jsx("td",{className:"px-4 py-2",children:"0.05%"}),e.jsx("td",{className:"px-4 py-2",children:"0.002%"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2 font-medium",children:"GST"}),e.jsx("td",{className:"px-4 py-2",children:"18% on fees"}),e.jsx("td",{className:"px-4 py-2",children:"18% on fees"}),e.jsx("td",{className:"px-4 py-2",children:"18% on fees"}),e.jsx("td",{className:"px-4 py-2",children:"18% on fees"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2 font-medium",children:"Stamp Duty"}),e.jsx("td",{className:"px-4 py-2",children:"0.015% (buy)"}),e.jsx("td",{className:"px-4 py-2",children:"0.003% (buy)"}),e.jsx("td",{className:"px-4 py-2",children:"0.003% (buy)"}),e.jsx("td",{className:"px-4 py-2",children:"0.002% (buy)"})]})]})]})}),e.jsx(C,{title:"transaction_costs.py",runnable:!0,code:`import numpy as np

def calculate_nse_costs(trade_value, segment='delivery', brokerage=20):
    """Calculate all transaction costs for an NSE trade."""
    costs = {}
    
    # STT rates
    stt_rates = {'delivery': 0.001, 'intraday': 0.00025, 'options': 0.000625, 'futures': 0.000125}
    costs['stt'] = trade_value * stt_rates[segment]
    
    # Exchange transaction charges
    exc_rates = {'delivery': 0.0000345, 'intraday': 0.0000345, 'options': 0.0005, 'futures': 0.00002}
    costs['exchange'] = trade_value * exc_rates[segment]
    
    # Brokerage
    if segment == 'delivery':
        costs['brokerage'] = 0  # Zerodha free delivery
    else:
        costs['brokerage'] = min(brokerage, trade_value * 0.0003)
    
    # GST on brokerage + exchange
    costs['gst'] = (costs['brokerage'] + costs['exchange']) * 0.18
    
    # SEBI turnover fee
    costs['sebi'] = trade_value * 0.000001
    
    # Stamp duty (varies by state, using Maharashtra)
    stamp_rates = {'delivery': 0.00015, 'intraday': 0.00003, 'options': 0.00003, 'futures': 0.00002}
    costs['stamp'] = trade_value * stamp_rates[segment]
    
    costs['total_explicit'] = sum(costs.values())
    costs['total_bps'] = costs['total_explicit'] / trade_value * 10000
    
    return costs

# --- Cost Analysis for Different Trade Sizes ---
print("=== NSE Transaction Cost Analysis ===
")
segments = ['delivery', 'intraday', 'options', 'futures']
trade_values = [50000, 100000, 500000, 1000000, 5000000]

for seg in segments:
    print(f"--- {seg.upper()} ---")
    print(f"{'Value (INR)':>12} {'STT':>8} {'Total':>10} {'BPS':>6}")
    for tv in trade_values:
        c = calculate_nse_costs(tv, seg)
        print(f"{tv:>12,} {c['stt']:>8.2f} {c['total_explicit']:>10.2f} {c['total_bps']:>6.2f}")
    print()

# --- Break-even Alpha Calculation ---
print("=== Break-even Alpha for Different Strategies ===")
strategies = [
    ('Daily mean-reversion (delivery)', 252, 'delivery', 100000),
    ('Weekly momentum (delivery)', 52, 'delivery', 500000),
    ('Intraday scalping', 252*5, 'intraday', 200000),
    ('Options selling (monthly)', 12, 'options', 300000),
]

for name, trades_per_year, seg, avg_trade in strategies:
    c = calculate_nse_costs(avg_trade, seg)
    annual_cost_bps = c['total_bps'] * trades_per_year * 2  # round trip
    print(f"  {name}")
    print(f"    Trades/year: {trades_per_year}, Cost/trade: {c['total_bps']:.1f} bps")
    print(f"    Annual cost: {annual_cost_bps:.0f} bps ({annual_cost_bps/100:.2f}%)")
    print(f"    Need alpha > {annual_cost_bps:.0f} bps to be profitable")
    print()`}),e.jsx(q,{title:"Computing Round-Trip Cost for a Nifty Futures Trade",difficulty:"beginner",problem:"You buy and sell 1 lot of Nifty futures (25 units at INR 20,000) on Zerodha. What is the total round-trip cost?",solution:[{step:"Notional value",formula:"V = 25 \\times 20000 = \\text{INR } 5,00,000"},{step:"Buy side costs",formula:"\\text{Brokerage} = 20, \\text{ Exchange} = 10, \\text{ Stamp} = 10, \\text{ SEBI} = 0.50"},{step:"Sell side costs",formula:"\\text{Brokerage} = 20, \\text{ STT} = 62.50, \\text{ Exchange} = 10"},{step:"Total",formula:"\\text{Total} \\approx \\text{INR } 155 \\approx 3.1 \\text{ bps}",explanation:"The total round-trip cost is about 3 bps of notional value, dominated by STT on the sell side. This must be exceeded by the strategy's alpha to be profitable."}]}),e.jsx(w,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Transaction costs are the silent killer of quant strategies. For Indian markets, STT is the largest component for delivery trades, while brokerage dominates for frequent F&O trading. Always include realistic transaction costs in backtests -- a strategy with 5 bps alpha per trade needs extremely low costs to survive. Use Zerodha's zero-brokerage delivery to minimize costs for position strategies."})})]})}const he=Object.freeze(Object.defineProperty({__proto__:null,default:ee},Symbol.toStringTag,{value:"Module"}));function te(){const[r,_]=f.useState(5e4),[d,S]=f.useState(2e6),[n,v]=f.useState(1.8),[i,g]=f.useState(.05),u=r/d,y=n*Math.sqrt(u),N=i/2+.1*n*u,b=.5*i+n*.314*Math.pow(u,.6),m=y*r*150/1e4,a=b*r*150/1e4;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Market Impact Estimator"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Simulate market impact for a Nifty 50 stock order on NSE. Adjust order size, ADV, and volatility to see how different models estimate slippage in basis points."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Order Size = ",r.toLocaleString()," shares"]}),e.jsx("input",{type:"range",min:"5000",max:"500000",step:"5000",value:r,onChange:s=>_(parseInt(s.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["ADV = ",d.toLocaleString()," shares"]}),e.jsx("input",{type:"range",min:"100000",max:"10000000",step:"100000",value:d,onChange:s=>S(parseInt(s.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Daily Vol = ",n.toFixed(1),"%"]}),e.jsx("input",{type:"range",min:"0.5",max:"5.0",step:"0.1",value:n,onChange:s=>v(parseFloat(s.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Spread = ",i.toFixed(2),"%"]}),e.jsx("input",{type:"range",min:"0.01",max:"0.20",step:"0.01",value:i,onChange:s=>g(parseFloat(s.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("div",{className:"rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30",children:[e.jsx("p",{className:"text-xs font-semibold text-blue-700 dark:text-blue-300",children:"Square-Root Model"}),e.jsxs("p",{className:"text-lg font-bold text-blue-800 dark:text-blue-200",children:[y.toFixed(2)," bps"]}),e.jsxs("p",{className:"text-xs text-blue-600 dark:text-blue-400",children:["Cost: ",e.jsx(t.InlineMath,{math:`\\approx \\text{INR } ${m.toFixed(0)}`})]})]}),e.jsxs("div",{className:"rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30",children:[e.jsx("p",{className:"text-xs font-semibold text-purple-700 dark:text-purple-300",children:"Linear Model"}),e.jsxs("p",{className:"text-lg font-bold text-purple-800 dark:text-purple-200",children:[N.toFixed(2)," bps"]})]}),e.jsxs("div",{className:"rounded-lg bg-green-50 p-3 dark:bg-green-900/30",children:[e.jsx("p",{className:"text-xs font-semibold text-green-700 dark:text-green-300",children:"Almgren-Chriss"}),e.jsxs("p",{className:"text-lg font-bold text-green-800 dark:text-green-200",children:[b.toFixed(2)," bps"]}),e.jsxs("p",{className:"text-xs text-green-600 dark:text-green-400",children:["Cost: ",e.jsx(t.InlineMath,{math:`\\approx \\text{INR } ${a.toFixed(0)}`})]})]})]}),e.jsxs("p",{className:"mt-3 text-center text-xs text-gray-500 dark:text-gray-400",children:["Participation rate: ",e.jsx(t.InlineMath,{math:`\\frac{Q}{\\text{ADV}} = ${(u*100).toFixed(2)}\\%`}),u>.1?e.jsx("span",{className:"ml-2 font-semibold text-red-500",children:"High participation -- consider slicing!"}):e.jsx("span",{className:"ml-2 font-semibold text-green-600 dark:text-green-400",children:"Manageable participation rate"})]})]})}function ae(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Modeling Market Impact"}),e.jsxs("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:["When a trader on NSE places a large order for a Nifty 50 stock, the order itself moves the price. This phenomenon, called ",e.jsx("strong",{children:"market impact"}),", is the single largest implicit transaction cost for institutional traders in India. Understanding and modeling impact is essential for any quantitative trading strategy operating on BSE or NSE."]}),e.jsx(E,{title:"Market Impact",label:"Definition 4.3",definition:"Market impact is the adverse price movement caused by the act of trading itself. It represents the difference between the price at the time of the trading decision and the actual execution price. In the Indian context, even mid-cap NSE stocks can show significant impact for orders exceeding 5% of average daily volume.",notation:"Impact is typically measured in basis points (bps), where 1 bps = 0.01%."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Temporary vs. Permanent Impact"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["Market impact has two distinct components. ",e.jsx("strong",{children:"Temporary impact"})," is the short-lived price displacement that reverses after execution completes -- it arises from consuming available liquidity in the NSE order book. ",e.jsx("strong",{children:"Permanent impact"}),"reflects new information revealed by the trade that is absorbed into the equilibrium price."]}),e.jsx(t.BlockMath,{math:"\\text{Total Impact} = \\underbrace{g(Q)}_{\\text{permanent}} + \\underbrace{h(Q, T)}_{\\text{temporary}}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"Q"})," is the order quantity, and ",e.jsx(t.InlineMath,{math:"T"})," is the execution horizon. For Bank Nifty stocks, empirical research shows permanent impact accounts for roughly 30-40% of total impact."]}),e.jsx(F,{title:"Square-Root Law of Market Impact",label:"Theorem 4.1",statement:"The permanent price impact of executing an order of size Q scales as the square root of the participation rate. If \\sigma is the daily volatility and V is the average daily volume, then:",formula:"\\Delta P \\approx \\sigma \\sqrt{\\frac{Q}{V}}",proof:"The square-root law can be derived from Kyle's (1985) lambda model under the assumption that informed and noise traders interact in a competitive market-making framework. The market maker sets prices such that the price change is proportional to the signed order flow. Aggregating over multiple trades, the cumulative impact of Q shares traded against daily volume V is \\sigma \\cdot (Q/V)^{1/2}. Empirical validation on Indian equity markets (NSE data, 2018-2023) confirms this scaling across Nifty 50 constituents with R^2 > 0.75."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"The Almgren-Chriss Framework"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The Almgren-Chriss (2000) framework provides an optimal execution strategy by trading off market impact against timing risk. The trader must liquidate ",e.jsx(t.InlineMath,{math:"X"})," shares over ",e.jsx(t.InlineMath,{math:"T"})," periods, minimizing the expected cost plus a risk penalty:"]}),e.jsx(t.BlockMath,{math:"\\min_{\\{x_k\\}} \\; \\mathbb{E}[\\text{Cost}] + \\lambda \\cdot \\text{Var}[\\text{Cost}]"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The cost has two components: a permanent impact function ",e.jsx(t.InlineMath,{math:"g(v)"})," and a temporary impact function ",e.jsx(t.InlineMath,{math:"h(v)"}),", where ",e.jsx(t.InlineMath,{math:"v"})," is the trading rate. The standard parameterization is:"]}),e.jsx(t.BlockMath,{math:"g(v) = \\gamma \\, v, \\quad h(v) = \\eta \\, v + \\epsilon \\, \\text{sgn}(v)"}),e.jsx(t.BlockMath,{math:"\\text{Optimal trajectory: } x_k^* = X \\cdot \\frac{\\sinh\\left(\\kappa (T - t_k)\\right)}{\\sinh(\\kappa T)}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"\\kappa"})," is the urgency parameter balancing impact cost vs. volatility risk. A higher ",e.jsx(t.InlineMath,{math:"\\lambda"})," (risk aversion) leads to faster, more front-loaded execution -- critical for volatile Bank Nifty stocks during budget announcements or RBI policy days."]}),e.jsx(w,{title:"Indian Market Specifics",type:"info",children:e.jsxs("ul",{className:"space-y-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"NSE Tick Size:"})," The minimum tick size on NSE is INR 0.05 for stocks priced above INR 1. This discreteness affects impact modeling for low-price stocks."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"SEBI Circuit Limits:"})," Individual stock circuits (5%, 10%, 20%) and index-level circuits create non-linear impact during volatile sessions."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"T+1 Settlement:"})," Since January 2023, India moved to T+1 settlement, reducing counterparty risk and altering intraday liquidity patterns."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"FII Flows:"})," Foreign Institutional Investor flows significantly affect impact for large-cap stocks, especially during global risk-off events."]})]})}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Model"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Formula"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Key Assumption"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Best For"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Linear"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"\\Delta P = \\lambda Q"})}),e.jsx("td",{className:"px-4 py-2",children:"Kyle (1985)"}),e.jsx("td",{className:"px-4 py-2",children:"Small orders"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Square-Root"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"\\Delta P = \\sigma\\sqrt{Q/V}"})}),e.jsx("td",{className:"px-4 py-2",children:"Empirical universal law"}),e.jsx("td",{className:"px-4 py-2",children:"Institutional orders"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Power Law"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"\\Delta P = \\alpha (Q/V)^\\beta"})}),e.jsx("td",{className:"px-4 py-2",children:"Generalized scaling"}),e.jsx("td",{className:"px-4 py-2",children:"Calibration"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Almgren-Chriss"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"\\min E[C] + \\lambda \\text{Var}[C]"})}),e.jsx("td",{className:"px-4 py-2",children:"Mean-variance optimal"}),e.jsx("td",{className:"px-4 py-2",children:"Execution scheduling"})]})]})]})}),e.jsx(te,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Calibrating Impact Models on NSE Data"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"To calibrate impact models for Indian markets, we use tick-by-tick trade and quote data from NSE. The following Python implementation estimates the square-root impact coefficient and fits the Almgren-Chriss model parameters using Zerodha Kite historical data."}),e.jsx(C,{title:"market_impact_nse.py",runnable:!0,code:`import numpy as np
import pandas as pd
from scipy.optimize import curve_fit

# Simulated NSE trade data for Reliance Industries
np.random.seed(42)
n_trades = 500
trade_sizes = np.random.lognormal(mean=8.5, sigma=1.2, size=n_trades).astype(int)
daily_volume = 5_000_000  # Average daily volume on NSE
participation = trade_sizes / daily_volume

# True impact parameters (calibrated to Indian large-cap)
sigma_daily = 0.018  # 1.8% daily volatility
true_alpha = sigma_daily * 0.8
true_beta = 0.5  # Square-root law

# Generate impact with noise (in basis points)
noise = np.random.normal(0, 2, n_trades)
observed_impact = true_alpha * np.power(participation, true_beta) * 10000 + noise

# --- Fit Square-Root Model ---
def sqrt_model(q_over_v, alpha):
    return alpha * np.sqrt(q_over_v) * 10000

popt_sqrt, _ = curve_fit(sqrt_model, participation, observed_impact, p0=[0.01])

# --- Fit Power-Law Model ---
def power_model(q_over_v, alpha, beta):
    return alpha * np.power(q_over_v, beta) * 10000

popt_power, _ = curve_fit(power_model, participation, observed_impact, p0=[0.01, 0.5])

# --- Almgren-Chriss Optimal Trajectory ---
X_total = 100_000  # Total shares to liquidate
T = 20  # Number of time periods (5-minute bars)
sigma = sigma_daily / np.sqrt(78)  # Per-bar volatility (78 bars/day)
eta = 0.01  # Temporary impact parameter
gamma = 0.005  # Permanent impact parameter
risk_aversion = 1e-6

kappa = np.sqrt(risk_aversion * sigma**2 / eta)
trajectory = [X_total * np.sinh(kappa * (T - k)) / np.sinh(kappa * T) for k in range(T + 1)]
trade_schedule = np.diff(trajectory)

print("=== Market Impact Calibration (NSE - Reliance Industries) ===")
print(f"\\nSquare-Root Model: alpha = {popt_sqrt[0]:.6f}")
print(f"  Impact for 1% participation: {sqrt_model(0.01, *popt_sqrt):.1f} bps")
print(f"\\nPower-Law Model: alpha = {popt_power[0]:.6f}, beta = {popt_power[1]:.3f}")
print(f"  Impact for 1% participation: {power_model(0.01, *popt_power):.1f} bps")
print(f"\\n=== Almgren-Chriss Optimal Execution ===")
print(f"Total shares: {X_total:,}, Horizon: {T} bars")
print(f"Urgency (kappa): {kappa:.4f}")
print(f"First 5 trades: {[-int(t) for t in trade_schedule[:5]]}")
print(f"Last 5 trades:  {[-int(t) for t in trade_schedule[-5:]]}")
print(f"Front-loading ratio: {abs(trade_schedule[0]/trade_schedule[-1]):.2f}x")`}),e.jsx(q,{title:"Estimating Impact for a Bank Nifty Stock",difficulty:"intermediate",problem:"A fund manager on Zerodha needs to buy 200,000 shares of HDFC Bank (daily vol = 1.5%, ADV = 8 million shares). Estimate the market impact using the square-root model and the total cost in INR if HDFC Bank trades at INR 1,650.",solution:[{step:"Compute participation rate",formula:"\\frac{Q}{V} = \\frac{200{,}000}{8{,}000{,}000} = 0.025",explanation:"The order is 2.5% of average daily volume -- moderate participation."},{step:"Apply square-root impact model",formula:"\\Delta P = \\sigma \\sqrt{Q/V} = 0.015 \\times \\sqrt{0.025} = 0.015 \\times 0.1581 = 0.00237",explanation:"Impact is approximately 23.7 basis points."},{step:"Convert to INR cost",formula:"\\text{Cost} = \\Delta P \\times P \\times Q = 0.00237 \\times 1650 \\times 200{,}000 = \\text{INR } 7{,}82{,}100",explanation:"Total market impact cost is approximately INR 7.82 lakhs, a significant implicit cost that dwarfs the explicit brokerage of INR 40 (Zerodha flat fee)."}]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Intraday Liquidity Patterns on NSE"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"NSE trading sessions exhibit a distinctive U-shaped volume pattern. Understanding these intraday patterns is essential for optimal execution scheduling:"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Time (IST)"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Volume Share"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Spread"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Strategy Implication"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"9:15-9:30"}),e.jsx("td",{className:"px-4 py-2",children:"~8% (opening)"}),e.jsx("td",{className:"px-4 py-2",children:"Wide"}),e.jsx("td",{className:"px-4 py-2",children:"Avoid unless liquidity taking"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"9:30-10:30"}),e.jsx("td",{className:"px-4 py-2",children:"~20%"}),e.jsx("td",{className:"px-4 py-2",children:"Tightening"}),e.jsx("td",{className:"px-4 py-2",children:"Good for initial execution"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"10:30-14:00"}),e.jsx("td",{className:"px-4 py-2",children:"~35%"}),e.jsx("td",{className:"px-4 py-2",children:"Tight"}),e.jsx("td",{className:"px-4 py-2",children:"Best for passive algorithms"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"14:00-15:00"}),e.jsx("td",{className:"px-4 py-2",children:"~22%"}),e.jsx("td",{className:"px-4 py-2",children:"Tightening"}),e.jsx("td",{className:"px-4 py-2",children:"Pick up remaining orders"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"15:00-15:30"}),e.jsx("td",{className:"px-4 py-2",children:"~15% (closing)"}),e.jsx("td",{className:"px-4 py-2",children:"Variable"}),e.jsx("td",{className:"px-4 py-2",children:"High impact; close auction available"})]})]})]})}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The opening 15 minutes and closing 30 minutes account for approximately 23% of daily volume but with wider spreads and higher volatility. VWAP and TWAP algorithms used by institutional traders on Zerodha or institutional platforms should adapt their participation rates to match this intraday pattern."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Execution Algorithms for NSE"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Common execution algorithms used by institutional traders on NSE include:"}),e.jsx(t.BlockMath,{math:"\\text{VWAP: } v_k = V_k^{\\text{hist}} / \\sum_j V_j^{\\text{hist}} \\quad \\text{(trade proportional to historical volume profile)}"}),e.jsx(t.BlockMath,{math:"\\text{TWAP: } v_k = Q / T \\quad \\text{(equal slices over time)}"}),e.jsx(t.BlockMath,{math:"\\text{IS: minimize } E[\\text{Cost}] + \\lambda \\cdot \\text{Var}[\\text{Cost}] \\quad \\text{(Almgren-Chriss)}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"VWAP is the most popular benchmark for Indian institutional execution. Implementation Shortfall (IS) is preferred by sophisticated quant funds as it minimizes the total cost of execution including timing risk. NSE also offers a closing price session (3:40-4:00 PM) with a call auction mechanism, allowing traders to execute at the official closing price without market impact."}),e.jsx(w,{title:"Key Takeaway",type:"tip",children:e.jsxs("p",{children:["Market impact is the dominant cost for institutional-size orders on NSE and BSE. The square-root law ",e.jsx(t.InlineMath,{math:"\\Delta P \\propto \\sigma \\sqrt{Q/V}"})," is remarkably universal across markets including India. The Almgren-Chriss framework provides the optimal execution schedule by balancing impact cost against timing risk. For Indian markets, always account for SEBI circuit limits, T+1 settlement effects, the U-shaped intraday volume pattern, and the concentrated liquidity in the first and last hours of NSE trading. Use VWAP or IS algorithms matched to the specific liquidity profile of your target stocks."]})})]})}const ye=Object.freeze(Object.defineProperty({__proto__:null,default:ae},Symbol.toStringTag,{value:"Module"}));export{le as a,oe as b,de as c,ce as d,pe as e,xe as f,me as g,he as h,ye as i,ne as s};
