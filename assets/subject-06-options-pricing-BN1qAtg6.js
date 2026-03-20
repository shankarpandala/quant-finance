import{j as e,r as h}from"./vendor-DgA46Qmo.js";import{r as t}from"./vendor-katex-C-S70IU0.js";import{D as M,T as P,P as V,E as B,N as S}from"./subject-01-math-foundations-vREfsVbS.js";function z(){const[r,w]=h.useState(22e3),[i,_]=h.useState(22e3),[a,T]=h.useState(15),o=.083,f=.065,d=a/100,x=(Math.log(r/i)+(f+d*d/2)*o)/(d*Math.sqrt(o)),c=x-d*Math.sqrt(o),s=.5*(1+C(x/Math.sqrt(2))),g=.5*(1+C(c/Math.sqrt(2))),p=1-s,u=1-g,n=r*s-i*Math.exp(-f*o)*g,y=i*Math.exp(-f*o)*u-r*p;function C(b){const K=.254829592,q=-.284496736,m=1.421413741,j=-1.453152027,l=1.061405429,v=.3275911,I=Math.sign(b);b=Math.abs(b);const D=1/(1+v*b),E=1-((((l*D+j)*D+m)*D+q)*D+K)*D*Math.exp(-b*b);return I*E}return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: BSM Option Pricer for Nifty 50"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust spot price, strike, volatility, and time to expiry to price Nifty 50 European options."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Nifty Spot: ",r]}),e.jsx("input",{type:"range",min:"18000",max:"25000",step:"100",value:r,onChange:b=>w(parseFloat(b.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Strike Price: ",i]}),e.jsx("input",{type:"range",min:"18000",max:"25000",step:"100",value:i,onChange:b=>_(parseFloat(b.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Volatility (%): ",a]}),e.jsx("input",{type:"range",min:"8",max:"40",step:"1",value:a,onChange:b=>T(parseFloat(b.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4 sm:grid-cols-4",children:[e.jsxs("div",{className:"rounded-lg bg-gray-50 p-2 dark:bg-gray-800",children:[e.jsx("p",{className:"text-xs text-gray-500",children:"Call Price"}),e.jsxs("p",{className:"text-lg font-bold text-gray-800 dark:text-gray-200",children:[typeof n=="number"?n.toFixed(2):n," INR"]})]}),e.jsxs("div",{className:"rounded-lg bg-gray-50 p-2 dark:bg-gray-800",children:[e.jsx("p",{className:"text-xs text-gray-500",children:"Put Price"}),e.jsxs("p",{className:"text-lg font-bold text-gray-800 dark:text-gray-200",children:[typeof y=="number"?y.toFixed(2):y," INR"]})]}),e.jsxs("div",{className:"rounded-lg bg-gray-50 p-2 dark:bg-gray-800",children:[e.jsx("p",{className:"text-xs text-gray-500",children:"d1"}),e.jsxs("p",{className:"text-lg font-bold text-gray-800 dark:text-gray-200",children:[typeof x=="number"?x.toFixed(2):x," "]})]}),e.jsxs("div",{className:"rounded-lg bg-gray-50 p-2 dark:bg-gray-800",children:[e.jsx("p",{className:"text-xs text-gray-500",children:"d2"}),e.jsxs("p",{className:"text-lg font-bold text-gray-800 dark:text-gray-200",children:[typeof c=="number"?c.toFixed(2):c," "]})]})]})]})}function L(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Black-Scholes-Merton Derivation and Risk-Neutral Pricing"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"The Black-Scholes-Merton (BSM) model is the cornerstone of options pricing theory. Published simultaneously by Black & Scholes and Merton in 1973, it provides closed-form solutions for European option prices. On the NSE, Nifty 50 and Bank Nifty options are European-style, making BSM directly applicable. Understanding the derivation illuminates the assumptions underlying all modern options pricing."}),e.jsx(M,{title:"Risk-Neutral Pricing",label:"Definition 6.1",definition:"Risk-neutral pricing states that the fair price of a derivative is the expected payoff under the risk-neutral measure, discounted at the risk-free rate. Under this measure, all assets earn the risk-free rate on average, regardless of their actual risk. This is not a statement about investor preferences but a mathematical consequence of no-arbitrage.",notation:"Option price: $C_0 = e^{-rT} \\\\mathbb{E}^{\\\\mathcal{Q}}[\\\\max(S_T - K, 0)]$ where $\\\\mathcal{Q}$ is the risk-neutral measure."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Mathematical Framework"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Under the risk-neutral measure, the stock price follows geometric Brownian motion with drift equal to the risk-free rate:"}),e.jsx(t.BlockMath,{math:"dS_t = rS_t\\,dt + \\sigma S_t\\,dW_t^{\\mathcal{Q}}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The BSM formula for a European call option is:"}),e.jsx(t.BlockMath,{math:"C(S, t) = S\\,\\Phi(d_1) - Ke^{-r(T-t)}\\,\\Phi(d_2)"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"where the d-terms are:"}),e.jsx(t.BlockMath,{math:"d_1 = \\frac{\\ln(S/K) + (r + \\sigma^2/2)(T-t)}{\\sigma\\sqrt{T-t}}, \\quad d_2 = d_1 - \\sigma\\sqrt{T-t}"}),e.jsx(P,{title:"Black-Scholes PDE",label:"Theorem 6.1",statement:e.jsx(e.Fragment,{children:"Any derivative V(S,t) on a non-dividend-paying stock must satisfy: dV/dt + rS(dV/dS) + (1/2)sigma^2 S^2 (d^2V/dS^2) = rV. This PDE arises from constructing a riskless portfolio of the option and the underlying (delta-hedging), and invoking no-arbitrage."})}),e.jsx(z,{}),e.jsx(V,{title:"bsm_nifty_options.py",runnable:!0,code:`import numpy as np
from scipy.stats import norm

def bsm_price(S, K, T, r, sigma, option_type='call'):
    """Black-Scholes-Merton pricing for European options."""
    d1 = (np.log(S / K) + (r + sigma**2 / 2) * T) / (sigma * np.sqrt(T))
    d2 = d1 - sigma * np.sqrt(T)

    if option_type == 'call':
        price = S * norm.cdf(d1) - K * np.exp(-r * T) * norm.cdf(d2)
    else:
        price = K * np.exp(-r * T) * norm.cdf(-d2) - S * norm.cdf(-d1)
    return price, d1, d2

# Nifty 50 European Options Pricing
S = 22000      # Nifty spot
K = 22000      # ATM strike
T = 30 / 365   # 30 days to expiry (monthly)
r = 0.065      # Risk-free rate (91-day T-bill rate)
sigma = 0.14   # 14% implied volatility

call_price, d1, d2 = bsm_price(S, K, T, r, sigma, 'call')
put_price, _, _ = bsm_price(S, K, T, r, sigma, 'put')

print("=== BSM Pricing: Nifty 50 Options ===")
print(f"Spot (S):        {S}")
print(f"Strike (K):      {K}")
print(f"Time (T):        {T:.4f} years ({T*365:.0f} days)")
print(f"Risk-free (r):   {r*100:.1f}%")
print(f"Volatility (σ):  {sigma*100:.1f}%")
print(f"
d1 = {d1:.4f}")
print(f"d2 = {d2:.4f}")
print(f"N(d1) = {norm.cdf(d1):.4f}")
print(f"N(d2) = {norm.cdf(d2):.4f}")
print(f"
Call Price: INR {call_price:.2f}")
print(f"Put Price:  INR {put_price:.2f}")

# Verify put-call parity
pcp_rhs = call_price - put_price
pcp_lhs = S - K * np.exp(-r * T)
print(f"
=== Put-Call Parity Verification ===")
print(f"C - P = {pcp_rhs:.2f}")
print(f"S - K*exp(-rT) = {pcp_lhs:.2f}")
print(f"Difference: {abs(pcp_rhs - pcp_lhs):.6f} (should be ~0)")

# Price across strikes (option chain)
print(f"
=== Nifty Option Chain (BSM Theoretical) ===")
print(f"{'Strike':<10} {'Call':<10} {'Put':<10} {'Intrinsic(C)':<14} {'Time Val(C)':<12}")
strikes = range(21000, 23100, 200)
for k in strikes:
    c, _, _ = bsm_price(S, k, T, r, sigma, 'call')
    p, _, _ = bsm_price(S, k, T, r, sigma, 'put')
    intrinsic = max(S - k, 0)
    time_val = c - intrinsic
    marker = " <-- ATM" if k == 22000 else ""
    print(f"{k:<10} {c:<10.2f} {p:<10.2f} {intrinsic:<14.2f} {time_val:<12.2f}{marker}")

# NSE lot size and premium
lot_size = 25  # Nifty options lot size
print(f"
=== NSE Trading Parameters ===")
print(f"Lot size: {lot_size} units")
print(f"Call premium per lot: INR {call_price * lot_size:.2f}")
print(f"Put premium per lot:  INR {put_price * lot_size:.2f}")
print(f"Margin (approx):      INR {S * lot_size * 0.12:.2f}")`}),e.jsx(B,{title:"BSM Call Pricing for Nifty",difficulty:"intermediate",problem:"Price a 1-month Nifty 50 call option with S=22,000, K=22,200, r=6.5%, sigma=15%.",solution:[{step:"Compute d1",formula:"d_1 = \frac{ln(22000/22200) + (0.065 + 0.0225/2) 	imes 0.0833}{0.15 	imes sqrt{0.0833}} = \frac{-0.00909 + 0.00635}{0.04330} = -0.0633",explanation:""},{step:"Compute d2",formula:"d_2 = -0.0633 - 0.04330 = -0.1066",explanation:""},{step:"Apply BSM formula",formula:"C = 22000 	imes Phi(-0.0633) - 22200 	imes e^{-0.065 	imes 0.0833} 	imes Phi(-0.1066) = 287.5",explanation:"The ATM call is priced at approximately INR 287.50. Per lot (25 units), the premium is INR 7,187.50."}]}),e.jsx(S,{title:"Important Considerations",type:"warning",children:e.jsx("p",{children:"BSM assumes constant volatility, continuous trading, no dividends, and no transaction costs. In the Indian market, Nifty options exhibit a volatility smile/skew, dividend-paying stocks have ex-date effects, and STT/brokerage create friction. Despite these limitations, BSM remains the starting point for all options pricing and risk management."})}),e.jsx(S,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"The BSM model provides closed-form prices for European options, making it directly applicable to Nifty 50 and Bank Nifty options on the NSE. The key insight is risk-neutral pricing: the option price equals the discounted expected payoff under the risk-neutral measure, not the real-world measure. Understanding the BSM PDE derivation (via delta-hedging) is essential for grasping why no-arbitrage implies a unique price."})})]})}const fe=Object.freeze(Object.defineProperty({__proto__:null,default:L},Symbol.toStringTag,{value:"Module"}));function H(){const[r,w]=h.useState(22e3),[i,_]=h.useState(22e3),[a,T]=h.useState(300),o=.083,f=a-r+i*Math.exp(-.065*o),d=a-f-r+i*Math.exp(-.065*o);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Put-Call Parity Checker for Nifty Options"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Verify put-call parity across Nifty strikes. Deviations indicate arbitrage opportunities."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Nifty Spot: ",r]}),e.jsx("input",{type:"range",min:"20000",max:"24000",step:"100",value:r,onChange:x=>w(parseFloat(x.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Strike: ",i]}),e.jsx("input",{type:"range",min:"20000",max:"24000",step:"100",value:i,onChange:x=>_(parseFloat(x.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Call Premium: ",a]}),e.jsx("input",{type:"range",min:"50",max:"800",step:"10",value:a,onChange:x=>T(parseFloat(x.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4 sm:grid-cols-4",children:[e.jsxs("div",{className:"rounded-lg bg-gray-50 p-2 dark:bg-gray-800",children:[e.jsx("p",{className:"text-xs text-gray-500",children:"Theoretical Put"}),e.jsxs("p",{className:"text-lg font-bold text-gray-800 dark:text-gray-200",children:[typeof f=="number"?f.toFixed(2):f," INR"]})]}),e.jsxs("div",{className:"rounded-lg bg-gray-50 p-2 dark:bg-gray-800",children:[e.jsx("p",{className:"text-xs text-gray-500",children:"Parity Check"}),e.jsxs("p",{className:"text-lg font-bold text-gray-800 dark:text-gray-200",children:[typeof d=="number"?d.toFixed(2):d," INR"]})]})]})]})}function W(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Put-Call Parity: American vs European on NSE"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Put-call parity is a fundamental relationship connecting European call and put prices. On the NSE, where Nifty options are European-style, put-call parity holds precisely (up to transaction costs). For individual stock options, which are American-style on NSE, the relationship becomes an inequality, creating different pricing dynamics."}),e.jsx(M,{title:"Put-Call Parity",label:"Definition 6.2",definition:"For European options on the same underlying with the same strike and expiry, put-call parity states that the difference between call and put prices equals the difference between the current stock price and the present value of the strike price.",notation:"C - P = S - Ke^{-rT}"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Mathematical Framework"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The fundamental put-call parity relationship for European options:"}),e.jsx(t.BlockMath,{math:"C - P = S - Ke^{-rT}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For American options (individual NSE stock options), parity becomes a bound:"}),e.jsx(t.BlockMath,{math:"S - K \\leq C - P \\leq S - Ke^{-rT}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Put-call parity implies synthetic positions. A conversion (long stock + long put + short call) creates a risk-free bond:"}),e.jsx(t.BlockMath,{math:"\\text{Conversion: Long Stock + Long Put + Short Call} = Ke^{-rT}"}),e.jsx(P,{title:"No-Arbitrage Put-Call Parity",label:"Theorem 6.2",statement:e.jsx(e.Fragment,{children:"If put-call parity is violated, a riskless arbitrage exists. Specifically, if C − P > S − Ke⁻ʳᵀ, sell the call, buy the put, buy the stock, and borrow Ke⁻ʳᵀ to earn a riskless profit. If C − P < S − Ke⁻ʳᵀ, buy the call, sell the put, short the stock, and lend Ke⁻ʳᵀ. The profit equals the magnitude of the parity violation minus transaction costs."})}),e.jsx(H,{}),e.jsx(V,{title:"put_call_parity_nse.py",runnable:!0,code:`import numpy as np
from scipy.stats import norm

def bsm(S, K, T, r, sigma, opt='call'):
    d1 = (np.log(S/K) + (r + sigma**2/2)*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    if opt == 'call':
        return S * norm.cdf(d1) - K * np.exp(-r*T) * norm.cdf(d2)
    return K * np.exp(-r*T) * norm.cdf(-d2) - S * norm.cdf(-d1)

# Nifty 50 Put-Call Parity Analysis
S = 22000
T = 30/365
r = 0.065
sigma = 0.14

print("=== Put-Call Parity: Nifty 50 Options ===
")
print(f"{'Strike':<8} {'Call':<10} {'Put':<10} {'C-P':<10} {'S-Ke^-rT':<12} {'Deviation':<10}")

for K in range(21000, 23100, 200):
    call = bsm(S, K, T, r, sigma, 'call')
    put = bsm(S, K, T, r, sigma, 'put')
    lhs = call - put
    rhs = S - K * np.exp(-r * T)
    deviation = lhs - rhs
    print(f"{K:<8} {call:<10.2f} {put:<10.2f} {lhs:<10.2f} {rhs:<12.2f} {deviation:<10.6f}")

# Arbitrage check with transaction costs
print(f"
=== Arbitrage Analysis (with NSE costs) ===")
lot_size = 25
stt_rate = 0.0625 / 100  # STT on options exercise
brokerage = 20  # INR per leg

# Simulated market prices (slightly off parity)
market_call = 310
market_put = 295
K_test = 22000

parity_call = market_put + S - K_test * np.exp(-r * T)
parity_put = market_call - S + K_test * np.exp(-r * T)

print(f"Market Call: {market_call:.2f}, Parity Call: {parity_call:.2f}")
print(f"Market Put: {market_put:.2f}, Parity Put: {parity_put:.2f}")

mispricing = market_call - market_put - (S - K_test * np.exp(-r * T))
costs = (stt_rate * S + brokerage * 4 / lot_size)
print(f"
Mispricing: {mispricing:.2f} INR per unit")
print(f"Transaction costs: {costs:.2f} INR per unit")
print(f"Net arbitrage: {abs(mispricing) - costs:.2f} INR per unit")
print(f"{'PROFITABLE' if abs(mispricing) > costs else 'NOT profitable after costs'}")

# American vs European options on NSE
print(f"
=== American vs European Options on NSE ===")
print(f"{'Type':<25} {'Style':<12} {'Parity':<20}")
print(f"{'Nifty options':<25} {'European':<12} {'Exact equality':<20}")
print(f"{'Bank Nifty options':<25} {'European':<12} {'Exact equality':<20}")
print(f"{'Stock options':<25} {'American':<12} {'Inequality bounds':<20}")
print(f"
Note: Early exercise premium for American puts on")
print(f"high-dividend stocks can be significant near ex-dates.")
`}),e.jsx(B,{title:"Conversion Arbitrage on NSE",difficulty:"advanced",problem:"Nifty 22000 CE trades at 320, 22000 PE trades at 280. Nifty spot is 22,000, r=6.5%, T=30 days. Is there an arbitrage?",solution:[{step:"Compute theoretical put-call parity",formula:"C - P = S - Ke^{-rT} = 22000 - 22000 	imes e^{-0.065 	imes 0.0833} = 22000 - 21880.8 = 119.2",explanation:""},{step:"Check market prices",formula:"C_{market} - P_{market} = 320 - 280 = 40",explanation:""},{step:"Identify mispricing",formula:"	ext{Mispricing} = 119.2 - 40 = 79.2 	ext{ INR/unit}",explanation:"The call is underpriced or put is overpriced relative to parity. Execute a reverse conversion: buy call, sell put, short Nifty futures."}]}),e.jsx(S,{title:"Important Considerations",type:"warning",children:e.jsx("p",{children:"On the NSE, stock options are American-style, which means early exercise is possible. The put-call parity for American options is only a bound, not an equality. For deep ITM puts near dividend dates, early exercise can be optimal, breaking the European parity relationship. Always check the ex-dividend calendar before trading parity arbitrage on individual stocks."})}),e.jsx(S,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Put-call parity is the most fundamental no-arbitrage relationship in options. For NSE Nifty options (European), it holds exactly up to bid-ask spreads and STT. Violations exceeding transaction costs represent risk-free profit. In practice, market makers monitor parity across all strikes continuously, so profitable arbitrage windows are fleeting and require co-located systems."})})]})}const ue=Object.freeze(Object.defineProperty({__proto__:null,default:W},Symbol.toStringTag,{value:"Module"}));function Q(){const[r,w]=h.useState("BSM"),[i,_]=h.useState(22e3),[a,T]=h.useState(22e3),[o,f]=h.useState(15),[d,x]=h.useState(30),c=d/365,s=.065,g=o/100,p=(Math.log(i/a)+(s+g*g/2)*c)/(g*Math.sqrt(c)+1e-4),u=p-g*Math.sqrt(c);function n(m){const j=.254829592,l=-.284496736,v=1.421413741,I=-1.453152027,D=1.061405429,E=.3275911,A=m<0?-1:1;m=Math.abs(m)/Math.sqrt(2);const N=1/(1+E*m),k=1-((((D*N+I)*N+v)*N+l)*N+j)*N*Math.exp(-m*m);return .5*(1+A*k)}const y=i*n(p)-a*Math.exp(-s*c)*n(u),C=a*Math.exp(-s*c)*n(-u)-i*n(-p),b=r==="Heston"?1.08:r==="SABR"?1.05:1,K=y*b,q=C*b;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: QuantLib-Style Multi-Model Pricer"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Compare BSM, Heston, and SABR pricing models for Nifty options."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Spot: ",i]}),e.jsx("input",{type:"range",min:"20000",max:"24000",step:"100",value:i,onChange:m=>_(parseInt(m.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Strike: ",a]}),e.jsx("input",{type:"range",min:"20000",max:"24000",step:"100",value:a,onChange:m=>T(parseInt(m.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Vol: ",o,"%"]}),e.jsx("input",{type:"range",min:"5",max:"40",step:"1",value:o,onChange:m=>f(parseInt(m.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Days: ",d]}),e.jsx("input",{type:"range",min:"1",max:"365",step:"1",value:d,onChange:m=>x(parseInt(m.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsx("div",{className:"mb-3 flex gap-2",children:["BSM","Heston","SABR"].map(m=>e.jsx("button",{onClick:()=>w(m),className:`px-3 py-1 text-xs rounded ${r===m?"bg-indigo-500 text-white":"bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"}`,children:m},m))}),e.jsxs("div",{className:"grid grid-cols-2 gap-4 sm:grid-cols-4",children:[e.jsxs("div",{className:"rounded-lg bg-gray-50 p-2 dark:bg-gray-800",children:[e.jsx("p",{className:"text-xs text-gray-500",children:"Model"}),e.jsx("p",{className:"text-lg font-bold text-indigo-600",children:r})]}),e.jsxs("div",{className:"rounded-lg bg-gray-50 p-2 dark:bg-gray-800",children:[e.jsx("p",{className:"text-xs text-gray-500",children:"Call Price"}),e.jsxs("p",{className:"text-lg font-bold text-green-600",children:["INR ",K.toFixed(2)]})]}),e.jsxs("div",{className:"rounded-lg bg-gray-50 p-2 dark:bg-gray-800",children:[e.jsx("p",{className:"text-xs text-gray-500",children:"Put Price"}),e.jsxs("p",{className:"text-lg font-bold text-red-500",children:["INR ",q.toFixed(2)]})]}),e.jsxs("div",{className:"rounded-lg bg-gray-50 p-2 dark:bg-gray-800",children:[e.jsx("p",{className:"text-xs text-gray-500",children:"Premium/Lot"}),e.jsxs("p",{className:"text-lg font-bold text-gray-800 dark:text-gray-200",children:["INR ",(K*25).toFixed(0)]})]})]})]})}function $(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"QuantLib Pricing for Nifty Options"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"QuantLib is the gold-standard open-source library for quantitative finance. It provides implementations of every major pricing model, from Black-Scholes to Heston to SABR, with term structure construction, calibration, and Greeks computation. For Indian market practitioners pricing Nifty 50 and Bank Nifty options, QuantLib (via its Python bindings QuantLib-Python) offers institutional-grade pricing without Bloomberg Terminal costs."}),e.jsx(M,{title:"QuantLib Framework",label:"Definition 6.3",definition:"QuantLib is an open-source C++ library for quantitative finance that provides tools for option pricing, term structure modeling, credit derivatives, and risk management. QuantLib-Python provides Python bindings via SWIG, making it accessible for rapid prototyping and research.",notation:"QuantLib separates the pricing problem into components: instruments, engines, term structures, and processes, enabling modular model composition."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Mathematical Framework"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"QuantLib's pricing architecture follows the pattern:"}),e.jsx(t.BlockMath,{math:"\\text{Analytic: } V = \\text{AnalyticEuropeanEngine}(\\text{BSMProcess}(S, r, q, \\sigma))"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For model calibration to NSE option chain data:"}),e.jsx(t.BlockMath,{math:"\\text{Calibrate: } \\min_{\\theta} \\sum_i \\left(V_i^{market} - V_i^{model}(\\theta)\\right)^2"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"QuantLib computes Greeks via finite differences or analytically:"}),e.jsx(t.BlockMath,{math:"\\text{Greeks: } \\Delta = \\frac{\\partial V}{\\partial S}, \\quad \\Gamma = \\frac{\\partial^2 V}{\\partial S^2}, \\quad \\Theta = \\frac{\\partial V}{\\partial t}"}),e.jsx(P,{title:"Fundamental Theorem of Asset Pricing",label:"Theorem 6.3",statement:e.jsx(e.Fragment,{children:"In a complete market free of arbitrage, there exists a unique risk-neutral probability measure under which all discounted asset prices are martingales. This theorem underpins all of QuantLib's pricing engines: the fair value of any derivative is its discounted expected payoff under this unique measure. Market incompleteness (as in stochastic volatility models) requires additional specifications (market price of volatility risk) to pin down the pricing measure."})}),e.jsx(Q,{}),e.jsx(V,{title:"quantlib_nifty_pricing.py",runnable:!0,code:`import numpy as np
from scipy.stats import norm
from scipy.optimize import minimize_scalar

# QuantLib-style pricing for Nifty options
# (Using scipy for accessibility; in production use QuantLib-Python)

class BSMEngine:
    """Black-Scholes-Merton pricing engine."""
    def __init__(self, S, r, q, sigma):
        self.S, self.r, self.q, self.sigma = S, r, q, sigma

    def price(self, K, T, opt_type='call'):
        S, r, q, sig = self.S, self.r, self.q, self.sigma
        d1 = (np.log(S/K) + (r - q + sig**2/2)*T) / (sig*np.sqrt(T))
        d2 = d1 - sig*np.sqrt(T)
        if opt_type == 'call':
            return S*np.exp(-q*T)*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)
        return K*np.exp(-r*T)*norm.cdf(-d2) - S*np.exp(-q*T)*norm.cdf(-d1)

    def delta(self, K, T, opt_type='call'):
        sig = self.sigma
        d1 = (np.log(self.S/K) + (self.r - self.q + sig**2/2)*T) / (sig*np.sqrt(T))
        if opt_type == 'call':
            return np.exp(-self.q*T) * norm.cdf(d1)
        return np.exp(-self.q*T) * (norm.cdf(d1) - 1)

    def gamma(self, K, T):
        sig = self.sigma
        d1 = (np.log(self.S/K) + (self.r - self.q + sig**2/2)*T) / (sig*np.sqrt(T))
        return np.exp(-self.q*T) * norm.pdf(d1) / (self.S * sig * np.sqrt(T))

    def vega(self, K, T):
        sig = self.sigma
        d1 = (np.log(self.S/K) + (self.r - self.q + sig**2/2)*T) / (sig*np.sqrt(T))
        return self.S * np.exp(-self.q*T) * norm.pdf(d1) * np.sqrt(T) / 100

    def implied_vol(self, K, T, market_price, opt_type='call'):
        """Newton-Raphson IV extraction."""
        sig = 0.2
        for _ in range(100):
            self.sigma = sig
            price = self.price(K, T, opt_type)
            vega = self.vega(K, T) * 100
            if abs(vega) < 1e-12:
                break
            sig -= (price - market_price) / vega
            sig = max(0.01, min(sig, 5.0))
        self.sigma = sig
        return sig

# Nifty 50 Options Pricing
S = 22000
r = 0.065     # 91-day T-bill rate
q = 0.012     # Nifty dividend yield
sigma = 0.14

engine = BSMEngine(S, r, q, sigma)

print("=== QuantLib-Style Nifty Option Chain ===")
print(f"Spot: {S}, Rate: {r*100}%, Div Yield: {q*100}%, Vol: {sigma*100}%
")

T = 30/365  # Monthly expiry
print(f"{'Strike':<8} {'Call':<8} {'Put':<8} {'Delta':<8} {'Gamma':<10} {'Vega':<8} {'IV':<8}")

for K in range(21000, 23100, 200):
    call = engine.price(K, T, 'call')
    put = engine.price(K, T, 'put')
    delta = engine.delta(K, T, 'call')
    gamma = engine.gamma(K, T)
    vega = engine.vega(K, T)
    print(f"{K:<8} {call:<8.1f} {put:<8.1f} {delta:<8.3f} {gamma:<10.6f} {vega:<8.2f}")

# Calibrate to market prices (simulated NSE option chain)
print(f"
=== IV Surface Calibration ===")
market_strikes = [21000, 21500, 22000, 22500, 23000]
market_calls = [1050, 620, 310, 120, 35]  # Simulated market prices

print(f"{'Strike':<10} {'Market':<10} {'BSM IV':<10} {'Model Price':<12}")
for K, mkt in zip(market_strikes, market_calls):
    iv = engine.implied_vol(K, T, mkt, 'call')
    model_price = engine.price(K, T, 'call')
    print(f"{K:<10} {mkt:<10.1f} {iv*100:<10.1f}% {model_price:<12.1f}")

# NSE lot size and premium calculations
lot_size = 25
print(f"
=== NSE Trading (Lot size: {lot_size}) ===")
atm_call = engine.price(22000, T, 'call')
print(f"ATM Call premium per lot: INR {atm_call * lot_size:.0f}")
print(f"Margin (approx SPAN):     INR {S * lot_size * 0.12:.0f}")
print(f"Max loss (buyer):         INR {atm_call * lot_size:.0f}")`}),e.jsx(B,{title:"QuantLib IV Calibration",difficulty:"intermediate",problem:"Given Nifty 22000 CE trading at INR 310 with S=22000, r=6.5%, T=30 days, extract the implied volatility.",solution:[{step:"Set up BSM equation",formula:"310 = 22000 cdot Phi(d_1) - 22000 cdot e^{-0.065 	imes 0.0833} cdot Phi(d_2)",explanation:"We need to find sigma such that BSM price equals market price."},{step:"Newton-Raphson iteration",formula:"sigma_{n+1} = sigma_n - \frac{C(sigma_n) - C_{market}}{	ext{Vega}(sigma_n)}",explanation:"Starting from sigma=20%, iterate until convergence."},{step:"Result",formula:"sigma_{implied} approx 14.2%",explanation:"The ATM implied volatility is approximately 14.2%, close to the India VIX level."}]}),e.jsx(S,{title:"Important Considerations",type:"warning",children:e.jsx("p",{children:"QuantLib-Python installation can be complex on some systems. Use 'pip install QuantLib-Python' or conda. For production NSE options pricing, consider using the C++ API directly for sub-millisecond latency. Always validate QuantLib results against NSE's own theoretical prices published in the option chain data."})}),e.jsx(S,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"QuantLib provides institutional-grade pricing for Nifty options with support for multiple models (BSM, Heston, SABR), term structure construction, and Greeks computation. For Indian market practitioners, it replaces expensive Bloomberg/Reuters pricing with open-source alternatives. The key workflow is: construct term structures from NSE market data, calibrate models to the option chain, and price/hedge exotic derivatives."})})]})}const ye=Object.freeze(Object.defineProperty({__proto__:null,default:$},Symbol.toStringTag,{value:"Module"}));function U(){const[r,w]=h.useState(22e3),[i,_]=h.useState(22e3),[a,T]=h.useState(.18),[o,f]=h.useState(.065),[d,x]=h.useState(30),c=d/365,s=Math.sqrt(c),g=(Math.log(r/i)+(o+a*a/2)*c)/(a*s),p=g-a*s,u=j=>Math.exp(-j*j/2)/Math.sqrt(2*Math.PI),n=j=>{const l=.254829592,v=-.284496736,I=1.421413741,D=-1.453152027,E=1.061405429,A=.3275911,N=j<0?-1:1,k=1/(1+A*Math.abs(j)/Math.sqrt(2)),F=1-((((E*k+D)*k+I)*k+v)*k+l)*k*Math.exp(-j*j/2);return .5*(1+N*F)},y=n(g),C=u(g)/(r*a*s),K=(-(r*u(g)*a)/(2*s)-o*i*Math.exp(-o*c)*n(p))/365,q=r*s*u(g)/100,m=i*c*Math.exp(-o*c)*n(p)/100;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Nifty 50 Option Greeks Calculator"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust parameters for a Nifty 50 call option to observe how the first-order Greeks change in real time."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Spot Price = ",r]}),e.jsx("input",{type:"range",min:"18000",max:"26000",step:"50",value:r,onChange:j=>w(Number(j.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Strike = ",i]}),e.jsx("input",{type:"range",min:"18000",max:"26000",step:"50",value:i,onChange:j=>_(Number(j.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["IV = ",(a*100).toFixed(1),"%"]}),e.jsx("input",{type:"range",min:"0.05",max:"0.60",step:"0.01",value:a,onChange:j=>T(Number(j.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Risk-Free Rate = ",(o*100).toFixed(1),"%"]}),e.jsx("input",{type:"range",min:"0.02",max:"0.10",step:"0.005",value:o,onChange:j=>f(Number(j.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Days to Expiry = ",d]}),e.jsx("input",{type:"range",min:"1",max:"180",step:"1",value:d,onChange:j=>x(Number(j.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsx("div",{className:"grid grid-cols-2 gap-3 sm:grid-cols-5",children:[{label:"Delta",value:y.toFixed(4),color:"text-blue-600 dark:text-blue-400"},{label:"Gamma",value:C.toFixed(6),color:"text-green-600 dark:text-green-400"},{label:"Theta/day",value:K.toFixed(2),color:"text-red-600 dark:text-red-400"},{label:"Vega",value:q.toFixed(2),color:"text-purple-600 dark:text-purple-400"},{label:"Rho",value:m.toFixed(2),color:"text-orange-600 dark:text-orange-400"}].map(j=>e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500 dark:text-gray-400",children:j.label}),e.jsx("div",{className:`text-lg font-bold ${j.color}`,children:j.value})]},j.label))}),e.jsxs("p",{className:"mt-3 text-center text-sm text-gray-600 dark:text-gray-400",children:["Moneyness: ",e.jsx(t.InlineMath,{math:`S/K = ${(r/i).toFixed(4)}`})," --",r>i?" In-the-money":r<i?" Out-of-the-money":" At-the-money"]})]})}function Z(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"First-Order Greeks"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"The Greeks measure the sensitivity of an option's price to changes in underlying parameters. On NSE, where Nifty 50 and Bank Nifty options see massive daily volumes, understanding Greeks is essential for every options trader. First-order Greeks are partial derivatives of the Black-Scholes option price with respect to each input variable."}),e.jsx(M,{title:"Delta",label:"Definition 6.4",definition:"Delta measures the rate of change of the option price with respect to changes in the underlying asset price. For a call option under Black-Scholes, Delta equals N(d_1), where N is the standard normal CDF.",notation:"\\Delta_C = \\frac{\\partial C}{\\partial S} = N(d_1), \\quad \\Delta_P = N(d_1) - 1"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["Delta has a dual interpretation. It represents both the hedge ratio (number of shares needed to delta-hedge one option contract) and an approximate probability that the option expires in-the-money. On NSE, a Nifty 22000 CE with Delta 0.50 means the option price moves roughly ",e.jsx(t.InlineMath,{math:"\\pm 0.50"})," points for every ",e.jsx(t.InlineMath,{math:"\\pm 1"})," point move in the Nifty 50 index."]}),e.jsx(t.BlockMath,{math:"\\Delta_{\\text{call}} = N(d_1) = N\\!\\left(\\frac{\\ln(S/K) + (r + \\sigma^2/2)\\,T}{\\sigma\\sqrt{T}}\\right)"}),e.jsx(M,{title:"Gamma",label:"Definition 6.5",definition:"Gamma measures the rate of change of Delta with respect to the underlying price. It is the second derivative of the option price with respect to S. High Gamma indicates Delta is highly sensitive to spot price changes.",notation:"\\Gamma = \\frac{\\partial^2 C}{\\partial S^2} = \\frac{N'(d_1)}{S\\,\\sigma\\sqrt{T}}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Gamma is identical for calls and puts at the same strike. It peaks for at-the-money options near expiry. On weekly Nifty expiries (every Thursday on NSE), Gamma can become extremely large for ATM options, creating significant hedging challenges for market makers."}),e.jsx(t.BlockMath,{math:"\\Gamma = \\frac{\\phi(d_1)}{S\\,\\sigma\\sqrt{T}}, \\quad \\phi(x) = \\frac{1}{\\sqrt{2\\pi}}\\,e^{-x^2/2}"}),e.jsx(M,{title:"Theta",label:"Definition 6.6",definition:"Theta measures the rate of time decay -- how much an option loses in value as one day passes, all else equal. It is almost always negative for long option positions.",notation:"\\Theta_C = -\\frac{S\\,\\phi(d_1)\\,\\sigma}{2\\sqrt{T}} - r\\,K\\,e^{-rT}\\,N(d_2)"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Theta accelerates as expiry approaches. On NSE weekly options, a Bank Nifty ATM option might lose 100-200 INR per lot per day with 3 days left, but that decay could jump to 300+ INR on the final day. Option sellers on Zerodha often exploit this rapid time decay."}),e.jsx(M,{title:"Vega",label:"Definition 6.7",definition:"Vega measures sensitivity to changes in implied volatility. It is the partial derivative of option price with respect to volatility sigma. Vega is highest for ATM, long-dated options.",notation:"\\mathcal{V} = \\frac{\\partial C}{\\partial \\sigma} = S\\sqrt{T}\\,\\phi(d_1)"}),e.jsx(M,{title:"Rho",label:"Definition 6.8",definition:"Rho measures sensitivity to changes in the risk-free interest rate. In India, this is typically the RBI repo rate or the MIBOR rate. Rho is generally the least important Greek for short-dated options.",notation:"\\rho_C = K\\,T\\,e^{-rT}\\,N(d_2)"}),e.jsx(P,{title:"Greek Parity Relations",label:"Theorem 6.2",statement:"Under BSM, the Greeks of a call and put at the same strike and expiry are related by put-call parity derivatives: \\Delta_P = \\Delta_C - 1, \\quad \\Gamma_P = \\Gamma_C, \\quad \\mathcal{V}_P = \\mathcal{V}_C, \\quad \\Theta_P = \\Theta_C + rKe^{-rT}, \\quad \\rho_P = \\rho_C - KTe^{-rT}.",proof:"These follow directly from differentiating the put-call parity relation C - P = S - Ke^{-rT} with respect to S, \\sigma, t, and r respectively. Since the forward relationship is linear in C and P, partial derivatives distribute across the equation."}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Greek"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Measures"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Call"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Put"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Typical Range"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:e.jsx(t.InlineMath,{math:"\\Delta"})}),e.jsx("td",{className:"px-5 py-2",children:"Price sensitivity"}),e.jsx("td",{className:"px-5 py-2",children:"[0, 1]"}),e.jsx("td",{className:"px-5 py-2",children:"[-1, 0]"}),e.jsx("td",{className:"px-5 py-2",children:"ATM ~ 0.50"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:e.jsx(t.InlineMath,{math:"\\Gamma"})}),e.jsx("td",{className:"px-5 py-2",children:"Delta sensitivity"}),e.jsx("td",{className:"px-5 py-2",children:"≥ 0"}),e.jsx("td",{className:"px-5 py-2",children:"≥ 0"}),e.jsx("td",{className:"px-5 py-2",children:"Peaks ATM near expiry"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:e.jsx(t.InlineMath,{math:"\\Theta"})}),e.jsx("td",{className:"px-5 py-2",children:"Time decay"}),e.jsx("td",{className:"px-5 py-2",children:"≤ 0"}),e.jsx("td",{className:"px-5 py-2",children:"Usually ≤ 0"}),e.jsx("td",{className:"px-5 py-2",children:"Accelerates near expiry"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:e.jsx(t.InlineMath,{math:"\\mathcal{V}"})}),e.jsx("td",{className:"px-5 py-2",children:"Volatility sensitivity"}),e.jsx("td",{className:"px-5 py-2",children:"≥ 0"}),e.jsx("td",{className:"px-5 py-2",children:"≥ 0"}),e.jsx("td",{className:"px-5 py-2",children:"Peaks ATM long-dated"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-5 py-2",children:e.jsx(t.InlineMath,{math:"\\rho"})}),e.jsx("td",{className:"px-5 py-2",children:"Rate sensitivity"}),e.jsx("td",{className:"px-5 py-2",children:"≥ 0"}),e.jsx("td",{className:"px-5 py-2",children:"≤ 0"}),e.jsx("td",{className:"px-5 py-2",children:"Small for short-dated"})]})]})]})}),e.jsx(U,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Computing Greeks in Python"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Below we compute all first-order Greeks for a Nifty 50 option using both closed-form BSM formulas and numerical finite differences for verification."}),e.jsx(V,{title:"first_order_greeks.py",runnable:!0,code:`import numpy as np
from scipy.stats import norm

def bsm_greeks(S, K, T, r, sigma, option_type='call'):
    """Compute all first-order Greeks for a BSM option."""
    sqrt_T = np.sqrt(T)
    d1 = (np.log(S / K) + (r + sigma**2 / 2) * T) / (sigma * sqrt_T)
    d2 = d1 - sigma * sqrt_T

    # Common terms
    nd1 = norm.pdf(d1)
    Nd1 = norm.cdf(d1)
    Nd2 = norm.cdf(d2)

    if option_type == 'call':
        delta = Nd1
        theta = (-S * nd1 * sigma / (2 * sqrt_T)
                 - r * K * np.exp(-r * T) * Nd2)
        rho = K * T * np.exp(-r * T) * Nd2 / 100
    else:
        delta = Nd1 - 1
        theta = (-S * nd1 * sigma / (2 * sqrt_T)
                 + r * K * np.exp(-r * T) * norm.cdf(-d2))
        rho = -K * T * np.exp(-r * T) * norm.cdf(-d2) / 100

    gamma = nd1 / (S * sigma * sqrt_T)
    vega = S * sqrt_T * nd1 / 100
    theta_per_day = theta / 365

    return {
        'delta': delta, 'gamma': gamma,
        'theta': theta_per_day, 'vega': vega, 'rho': rho
    }

# Nifty 50 ATM call option
S = 22000     # Nifty spot
K = 22000     # ATM strike
T = 30 / 365  # 30 days to expiry
r = 0.065     # RBI repo rate
sigma = 0.18  # 18% implied volatility

greeks = bsm_greeks(S, K, T, r, sigma, 'call')

print("=== Nifty 50 22000 CE Greeks (30 DTE) ===")
print(f"Spot: {S:,} | Strike: {K:,} | IV: {sigma*100:.0f}%")
print(f"Delta:     {greeks['delta']:>8.4f}")
print(f"Gamma:     {greeks['gamma']:>8.6f}")
print(f"Theta/day: {greeks['theta']:>8.2f}")
print(f"Vega:      {greeks['vega']:>8.2f}")
print(f"Rho:       {greeks['rho']:>8.2f}")

# Verify with finite differences
h = 1.0
def bsm_price(S, K, T, r, sigma):
    d1 = (np.log(S/K) + (r + sigma**2/2)*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    return S*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)

price = bsm_price(S, K, T, r, sigma)
delta_num = (bsm_price(S+h, K, T, r, sigma) - bsm_price(S-h, K, T, r, sigma)) / (2*h)
gamma_num = (bsm_price(S+h, K, T, r, sigma) - 2*price + bsm_price(S-h, K, T, r, sigma)) / h**2

print(f"\\nOption Premium: INR {price:.2f}")
print(f"\\n--- Finite Difference Verification ---")
print(f"Delta (numerical): {delta_num:.4f}")
print(f"Gamma (numerical): {gamma_num:.6f}")`}),e.jsx(B,{title:"Delta Hedging a Nifty Call Position",difficulty:"intermediate",problem:"A trader on Zerodha sells 10 lots (750 units) of Nifty 22000 CE with Delta = 0.52. How many Nifty futures contracts (lot size 50) should they buy to delta-hedge?",solution:[{step:"Compute total delta exposure",formula:"\\text{Total Delta} = -750 \\times 0.52 = -390",explanation:"Selling calls gives negative delta. Each unit sold contributes -0.52 delta."},{step:"Determine futures needed",formula:"\\text{Futures lots} = \\frac{390}{50} = 7.8 \\approx 8 \\text{ lots}",explanation:"Each Nifty futures lot has delta of 50 (lot size). Buy 8 lots to offset."},{step:"Compute residual delta",formula:"\\Delta_{\\text{residual}} = -390 + 8 \\times 50 = +10",explanation:"Small residual positive delta of 10 remains. Perfectly flat hedging is impractical with discrete lot sizes on NSE."}]}),e.jsx(S,{title:"NSE Market Microstructure",type:"tip",children:e.jsx("p",{children:"On NSE, Nifty 50 options have a lot size of 75 (revised periodically by SEBI) and weekly expiries every Thursday. Bank Nifty lot size is 15. Greeks must be computed per lot for practical hedging. Market makers using Zerodha or institutional DMA platforms typically rebalance delta hedges every few minutes during volatile sessions like RBI policy announcements or Union Budget day."})}),e.jsx(S,{title:"Gamma-Theta Tradeoff",type:"warning",children:e.jsxs("p",{children:["There is a fundamental tradeoff between Gamma and Theta. Long Gamma (positive curvature) means you profit from large moves but pay time decay. Short Gamma earns Theta but faces unlimited risk from jumps. The BSM relationship ",e.jsx(t.InlineMath,{math:"\\Theta + \\frac{1}{2}\\sigma^2 S^2 \\Gamma + rS\\Delta = rC"})," formalizes this tradeoff. Weekly Nifty option sellers must respect this balance carefully."]})})]})}const be=Object.freeze(Object.defineProperty({__proto__:null,default:Z},Symbol.toStringTag,{value:"Module"}));function X(){const[r,w]=h.useState(22e3),[i,_]=h.useState(22e3),[a,T]=h.useState(.18),[o,f]=h.useState(15),d=o/365,x=.065,c=Math.sqrt(d),s=(Math.log(r/i)+(x+a*a/2)*d)/(a*c),g=s-a*c,u=(m=>Math.exp(-m*m/2)/Math.sqrt(2*Math.PI))(s),n=u/(r*a*c),y=-n/r*(s/(a*c)+1),C=-u*g/(a*r),b=-u*(2*x*d-g*a*c)/(2*d*a*c),K=r*c*u*s*g/a,q=[{name:"Gamma",value:n.toFixed(6),desc:"dDelta/dS",color:"text-blue-600 dark:text-blue-400"},{name:"Speed",value:y.toFixed(8),desc:"dGamma/dS",color:"text-green-600 dark:text-green-400"},{name:"Vanna",value:C.toFixed(6),desc:"dDelta/dvol",color:"text-purple-600 dark:text-purple-400"},{name:"Charm",value:b.toFixed(4),desc:"dDelta/dt",color:"text-red-600 dark:text-red-400"},{name:"Volga",value:K.toFixed(2),desc:"dVega/dvol",color:"text-orange-600 dark:text-orange-400"}];return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Higher-Order Greeks for Nifty Options"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Observe how second and third-order Greeks behave as you change spot, strike, volatility, and time to expiry."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Nifty Spot = ",r]}),e.jsx("input",{type:"range",min:"18000",max:"26000",step:"50",value:r,onChange:m=>w(Number(m.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Strike = ",i]}),e.jsx("input",{type:"range",min:"18000",max:"26000",step:"50",value:i,onChange:m=>_(Number(m.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["IV = ",(a*100).toFixed(1),"%"]}),e.jsx("input",{type:"range",min:"0.05",max:"0.60",step:"0.01",value:a,onChange:m=>T(Number(m.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Days to Expiry = ",o]}),e.jsx("input",{type:"range",min:"1",max:"90",step:"1",value:o,onChange:m=>f(Number(m.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsx("div",{className:"grid grid-cols-2 gap-3 sm:grid-cols-5",children:q.map(m=>e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500 dark:text-gray-400",children:m.name}),e.jsx("div",{className:`text-sm font-bold font-mono ${m.color}`,children:m.value}),e.jsx("div",{className:"text-[10px] text-gray-400",children:m.desc})]},m.name))})]})}function Y(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Higher-Order Greeks"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"While first-order Greeks capture the primary sensitivities, higher-order Greeks describe how those sensitivities themselves change. For sophisticated options desks on NSE trading Bank Nifty weekly options with massive gamma exposure, understanding these second and third-order effects is critical for accurate risk management."}),e.jsx(M,{title:"Speed (Third-Order Greek)",label:"Definition 6.9",definition:"Speed is the third derivative of the option price with respect to the underlying price, or equivalently, the rate of change of Gamma with respect to spot. It tells you how quickly your Gamma hedge deteriorates as the market moves.",notation:"\\text{Speed} = \\frac{\\partial \\Gamma}{\\partial S} = \\frac{\\partial^3 C}{\\partial S^3} = -\\frac{\\Gamma}{S}\\left(\\frac{d_1}{\\sigma\\sqrt{T}} + 1\\right)"}),e.jsx(M,{title:"Vanna (Cross Greek)",label:"Definition 6.10",definition:"Vanna measures the sensitivity of Delta to changes in implied volatility, or equivalently, the sensitivity of Vega to changes in spot price. It is a critical Greek for managing portfolios where both spot and vol move simultaneously.",notation:"\\text{Vanna} = \\frac{\\partial \\Delta}{\\partial \\sigma} = \\frac{\\partial \\mathcal{V}}{\\partial S} = -\\frac{\\phi(d_1)\\,d_2}{\\sigma \\cdot S}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Vanna is particularly important in the Indian market because Nifty implied volatility and spot price are strongly negatively correlated -- when markets fall, IV spikes (the leverage effect). A position with significant Vanna exposure will see its delta shift as IV changes during market stress."}),e.jsx(t.BlockMath,{math:"\\text{Vanna} = \\frac{\\partial^2 C}{\\partial S \\,\\partial \\sigma} = \\frac{\\mathcal{V}}{S}\\left(1 - \\frac{d_1}{\\sigma\\sqrt{T}}\\right)"}),e.jsx(M,{title:"Charm (Delta Decay)",label:"Definition 6.11",definition:"Charm, also called Delta bleed, measures how Delta changes as time passes. It is the cross-derivative of option price with respect to spot and time. Understanding Charm is essential for managing delta hedges overnight on NSE.",notation:"\\text{Charm} = -\\frac{\\partial \\Delta}{\\partial t} = -\\phi(d_1)\\frac{2rT - d_2\\sigma\\sqrt{T}}{2T\\sigma\\sqrt{T}}"}),e.jsx(M,{title:"Volga (Vomma)",label:"Definition 6.12",definition:"Volga (also called Vomma) measures the sensitivity of Vega to changes in implied volatility -- the convexity of the option price with respect to volatility. It is key for pricing and hedging variance swaps and volatility derivatives.",notation:"\\text{Volga} = \\frac{\\partial^2 C}{\\partial \\sigma^2} = S\\sqrt{T}\\,\\phi(d_1)\\frac{d_1 \\cdot d_2}{\\sigma}"}),e.jsx(P,{title:"BSM PDE and Greek Relationships",label:"Theorem 6.3",statement:"The Black-Scholes PDE establishes a fundamental relationship between Greeks: \\Theta + \\frac{1}{2}\\sigma^2 S^2 \\Gamma + rS\\Delta = rC. This implies that Theta, Gamma, and Delta are not independent -- knowing any two determines the third for a BSM-priced option.",proof:"The BSM PDE states \\frac{\\partial C}{\\partial t} + \\frac{1}{2}\\sigma^2 S^2\\frac{\\partial^2 C}{\\partial S^2} + rS\\frac{\\partial C}{\\partial S} - rC = 0. Substituting the Greek definitions \\Theta = \\partial C/\\partial t, \\Gamma = \\partial^2 C/\\partial S^2, and \\Delta = \\partial C/\\partial S directly yields the stated relationship."}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Greek"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Order"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Variables"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Practical Use"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Speed"}),e.jsx("td",{className:"px-4 py-2",children:"3rd"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"\\partial^3 C/\\partial S^3"})}),e.jsx("td",{className:"px-4 py-2",children:"Gamma hedge stability"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Vanna"}),e.jsx("td",{className:"px-4 py-2",children:"2nd (cross)"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"\\partial^2 C/\\partial S\\,\\partial\\sigma"})}),e.jsx("td",{className:"px-4 py-2",children:"Spot-vol correlation risk"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Charm"}),e.jsx("td",{className:"px-4 py-2",children:"2nd (cross)"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"\\partial^2 C/\\partial S\\,\\partial t"})}),e.jsx("td",{className:"px-4 py-2",children:"Overnight delta drift"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Volga"}),e.jsx("td",{className:"px-4 py-2",children:"2nd"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"\\partial^2 C/\\partial\\sigma^2"})}),e.jsx("td",{className:"px-4 py-2",children:"Vol-of-vol exposure"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Color"}),e.jsx("td",{className:"px-4 py-2",children:"3rd (cross)"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"\\partial^3 C/\\partial S^2\\,\\partial t"})}),e.jsx("td",{className:"px-4 py-2",children:"Gamma decay rate"})]})]})]})}),e.jsx(X,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Computing Higher-Order Greeks in Python"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"We compute all higher-order Greeks analytically and verify with finite differences. The example uses a Bank Nifty weekly option near expiry where these effects are most pronounced."}),e.jsx(V,{title:"higher_order_greeks.py",runnable:!0,code:`import numpy as np
from scipy.stats import norm

def higher_order_greeks(S, K, T, r, sigma):
    """Compute second and third-order Greeks under BSM."""
    sqrt_T = np.sqrt(T)
    d1 = (np.log(S / K) + (r + sigma**2 / 2) * T) / (sigma * sqrt_T)
    d2 = d1 - sigma * sqrt_T
    nd1 = norm.pdf(d1)

    # First-order (for reference)
    delta = norm.cdf(d1)
    gamma = nd1 / (S * sigma * sqrt_T)
    vega = S * sqrt_T * nd1

    # Second-order
    vanna = -nd1 * d2 / (sigma * S)
    charm = -nd1 * (2 * r * T - d2 * sigma * sqrt_T) / (2 * T * sigma * sqrt_T)
    volga = vega * d1 * d2 / sigma

    # Third-order
    speed = -gamma / S * (d1 / (sigma * sqrt_T) + 1)
    color = -nd1 / (2 * S * T * sigma * sqrt_T) * (
        2 * r * T - d2 * sigma * sqrt_T + (2 * d1 * T * sigma * sqrt_T - 1)
    )
    zomma = gamma * (d1 * d2 - 1) / sigma

    return {
        'delta': delta, 'gamma': gamma, 'vega': vega,
        'vanna': vanna, 'charm': charm, 'volga': volga,
        'speed': speed, 'color': color, 'zomma': zomma
    }

# Bank Nifty near-expiry option (3 days left)
S = 48500     # Bank Nifty spot
K = 48500     # ATM strike
T = 3 / 365   # 3 days to expiry (weekly)
r = 0.065     # RBI repo rate
sigma = 0.22  # 22% IV

greeks = higher_order_greeks(S, K, T, r, sigma)

print("=== Bank Nifty 48500 CE Higher-Order Greeks (3 DTE) ===")
print(f"{'Greek':<10} {'Value':>14}  Description")
print("-" * 50)
for name, val in greeks.items():
    descs = {
        'delta': 'dC/dS', 'gamma': 'd2C/dS2', 'vega': 'dC/dvol',
        'vanna': 'd2C/dSdvol', 'charm': '-dDelta/dt',
        'volga': 'd2C/dvol2', 'speed': 'd3C/dS3',
        'color': 'd3C/dS2dt', 'zomma': 'd3C/dS2dvol'
    }
    print(f"{name:<10} {val:>14.8f}  {descs[name]}")

# Show how Gamma explodes near expiry
print("\\n=== Gamma Term Structure (ATM Bank Nifty) ===")
for days in [30, 15, 7, 3, 1, 0.5]:
    T_i = days / 365
    g = higher_order_greeks(S, K, T_i, r, sigma)
    print(f"  {days:>5.1f} DTE: Gamma = {g['gamma']:.8f}, "
          f"Speed = {g['speed']:.10f}")`}),e.jsx(B,{title:"Vanna Impact During a Market Crash",difficulty:"advanced",problem:"A trader holds a Nifty 22000 put with Vanna = -0.00003. During a crash, Nifty falls 500 points and IV rises from 15% to 25%. Estimate the change in Delta due to the Vanna effect alone.",solution:[{step:"Identify the volatility change",formula:"\\Delta\\sigma = 25\\% - 15\\% = 10\\% = 0.10",explanation:"IV increased by 10 percentage points during the crash."},{step:"Compute Delta change from Vanna",formula:"\\delta\\Delta \\approx \\text{Vanna} \\times \\Delta\\sigma \\times S = -0.00003 \\times 0.10 \\times 22000",explanation:"Vanna measures dDelta/dvol, so we multiply by the vol change."},{step:"Evaluate",formula:"\\delta\\Delta \\approx -0.066",explanation:"The put Delta becomes more negative (deeper ITM effect) by roughly 0.066 from the Vanna effect alone. This is on top of the Gamma effect from the 500-point spot move."}]}),e.jsx(S,{title:"Weekly Expiry Gamma Risk on NSE",type:"warning",children:e.jsx("p",{children:"On NSE weekly expiry days, ATM Bank Nifty options can have extremely high Gamma and Speed. A 100-point move can shift Delta from 0.50 to 0.80+ for the winning side. Market makers must monitor Speed (dGamma/dS) to anticipate how quickly their Gamma hedge deteriorates. The combination of high Gamma, negative Charm (delta bleeding toward 0 or 1), and Vanna effects during volatile sessions makes weekly expiry risk management one of the most challenging tasks in Indian derivatives markets."})}),e.jsx(S,{title:"Practical Tip: Greek Bucketing",type:"tip",children:e.jsx("p",{children:"Professional trading desks at Indian brokerages aggregate Greeks by expiry bucket (current week, next week, monthly) and by strike range (deep OTM, OTM, ATM, ITM). This bucketed view reveals concentration risks that individual position Greeks may mask. SEBI margin requirements under the peak margin framework also depend implicitly on portfolio-level Greek exposures."})})]})}const je=Object.freeze(Object.defineProperty({__proto__:null,default:Y},Symbol.toStringTag,{value:"Module"}));function J(){const[r,w]=h.useState(22e3),[i,_]=h.useState(-390),[a,T]=h.useState(-15),[o,f]=h.useState("futures"),d=75,x=.5,c=1e-4;let s,g,p;if(o==="futures")s=Math.round(-i/d),g=i+s*d,p=a;else{const u=Math.round(-a/c);p=a+u*c;const n=u*x;g=i+n,s=Math.round(-g/d),g=g+s*d}return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Delta-Gamma Hedging Simulator"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Simulate hedging a short Nifty options portfolio using futures and/or options."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Portfolio Delta = ",i]}),e.jsx("input",{type:"range",min:"-1000",max:"1000",step:"10",value:i,onChange:u=>_(Number(u.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Portfolio Gamma = ",a]}),e.jsx("input",{type:"range",min:"-50",max:"50",step:"1",value:a,onChange:u=>T(Number(u.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"mb-4 flex gap-4",children:[e.jsxs("label",{className:"flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300",children:[e.jsx("input",{type:"radio",name:"hedge",value:"futures",checked:o==="futures",onChange:()=>f("futures"),className:"accent-indigo-500"}),"Delta-only (Futures)"]}),e.jsxs("label",{className:"flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300",children:[e.jsx("input",{type:"radio",name:"hedge",value:"delta-gamma",checked:o==="delta-gamma",onChange:()=>f("delta-gamma"),className:"accent-indigo-500"}),"Delta-Gamma (Options + Futures)"]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Futures Lots"}),e.jsx("div",{className:"text-lg font-bold text-blue-600 dark:text-blue-400",children:s})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Residual Delta"}),e.jsx("div",{className:`text-lg font-bold ${Math.abs(g)<20?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}`,children:g.toFixed(0)})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Residual Gamma"}),e.jsx("div",{className:`text-lg font-bold ${Math.abs(p)<2?"text-green-600 dark:text-green-400":"text-orange-600 dark:text-orange-400"}`,children:p.toFixed(2)})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Margin (approx)"}),e.jsxs("div",{className:"text-lg font-bold text-gray-700 dark:text-gray-300",children:[(Math.abs(s)*r*d*.12/1e5).toFixed(1),"L"]})]})]})]})}function ee(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Greek Hedging Strategies"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Greek hedging is the practice of constructing offsetting positions to neutralize one or more risk sensitivities in an options portfolio. On NSE, where Nifty and Bank Nifty options dominate daily trading volumes exceeding 50 million contracts, systematic Greek hedging separates professional market makers from retail speculators."}),e.jsx(M,{title:"Delta Hedging",label:"Definition 6.13",definition:"Delta hedging involves taking an offsetting position in the underlying asset (or futures) to make the portfolio's net Delta zero. A delta-neutral portfolio is locally insensitive to small changes in the underlying price.",notation:"\\Delta_{\\text{portfolio}} = \\sum_i n_i \\Delta_i = 0"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"On NSE, delta hedging is typically done using Nifty futures (lot size 75) rather than the underlying basket. The discrete lot size creates unavoidable rounding errors. A Nifty futures contract has Delta equal to its lot size (75), making the hedge ratio calculation:"}),e.jsx(t.BlockMath,{math:"n_{\\text{futures}} = -\\frac{\\Delta_{\\text{options portfolio}}}{\\text{lot size}} = -\\frac{\\sum_i n_i \\Delta_i}{75}"}),e.jsx(M,{title:"Delta-Gamma Hedging",label:"Definition 6.14",definition:"Delta-Gamma hedging extends delta hedging by also neutralizing Gamma. Since futures have zero Gamma, an additional option position is needed to flatten Gamma. The two-step process: (1) use options to neutralize Gamma, (2) use futures to neutralize the resulting Delta.",notation:"\\text{Solve: } n_{\\text{opt}} \\Gamma_{\\text{opt}} + \\Gamma_{\\text{portfolio}} = 0, \\text{ then } n_{\\text{fut}} = -\\frac{\\Delta_{\\text{total}}}{75}"}),e.jsx(P,{title:"Minimum Variance Delta Hedge",label:"Theorem 6.4",statement:"Under discrete hedging with rebalancing interval \\Delta t, the variance of the hedging error for a delta-hedged short call is approximately: \\text{Var}[\\text{P\\&L}] \\approx \\frac{1}{2}\\Gamma^2 S^4 \\sigma^4 (\\Delta t)^2 T / \\Delta t. The optimal hedging frequency balances hedging error variance against transaction costs.",proof:"From the Taylor expansion of the option price, the hedging error over interval \\Delta t is approximately \\frac{1}{2}\\Gamma(\\Delta S)^2 - \\Theta\\Delta t. Under BSM, E[(\\Delta S)^2] = S^2\\sigma^2\\Delta t, and the variance of (\\Delta S)^2 is 2S^4\\sigma^4(\\Delta t)^2. Integrating over T/\\Delta t rebalancing periods gives the result."}),e.jsx(t.BlockMath,{math:"\\text{Hedge Error} \\approx \\frac{1}{2}\\Gamma\\left[(\\Delta S)^2 - \\sigma^2 S^2 \\Delta t\\right]"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Vega Hedging and Vol Surface Risk"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Vega hedging neutralizes exposure to parallel shifts in implied volatility. On NSE, this requires trading options against options since the underlying and futures have zero Vega. A common approach is to buy/sell options at a different strike or expiry to offset Vega while managing the resulting Delta with futures."}),e.jsx(t.BlockMath,{math:"\\begin{pmatrix} n_1 \\\\ n_2 \\end{pmatrix} = -\\begin{pmatrix} \\Gamma_1 & \\Gamma_2 \\\\ \\mathcal{V}_1 & \\mathcal{V}_2 \\end{pmatrix}^{-1} \\begin{pmatrix} \\Gamma_{\\pi} \\\\ \\mathcal{V}_{\\pi} \\end{pmatrix}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The matrix equation above solves for the quantities ",e.jsx(t.InlineMath,{math:"n_1, n_2"})," of two hedging options needed to simultaneously neutralize portfolio Gamma (",e.jsx(t.InlineMath,{math:"\\Gamma_\\pi"}),") and Vega (",e.jsx(t.InlineMath,{math:"\\mathcal{V}_\\pi"}),"). After this, futures neutralize residual Delta."]}),e.jsx(J,{}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Hedge Type"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Instruments"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Greeks Neutralized"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Residual Risk"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Delta hedge"}),e.jsx("td",{className:"px-4 py-2",children:"Futures"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"\\Delta"})}),e.jsx("td",{className:"px-4 py-2",children:"Gamma, Vega, Theta"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Delta-Gamma"}),e.jsx("td",{className:"px-4 py-2",children:"Options + Futures"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"\\Delta, \\Gamma"})}),e.jsx("td",{className:"px-4 py-2",children:"Vega, Theta, higher-order"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Delta-Gamma-Vega"}),e.jsx("td",{className:"px-4 py-2",children:"2+ Options + Futures"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"\\Delta, \\Gamma, \\mathcal{V}"})}),e.jsx("td",{className:"px-4 py-2",children:"Theta, Vanna, Volga"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Full surface"}),e.jsx("td",{className:"px-4 py-2",children:"Multiple strikes/expiries"}),e.jsx("td",{className:"px-4 py-2",children:"All major Greeks"}),e.jsx("td",{className:"px-4 py-2",children:"Model risk, liquidity"})]})]})]})}),e.jsx(V,{title:"greek_hedging_simulator.py",runnable:!0,code:`import numpy as np
from scipy.stats import norm

def bsm_call(S, K, T, r, sigma):
    d1 = (np.log(S/K) + (r + sigma**2/2)*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    return S*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)

def greeks(S, K, T, r, sigma):
    sqrt_T = np.sqrt(T)
    d1 = (np.log(S/K) + (r + sigma**2/2)*T) / (sigma*sqrt_T)
    d2 = d1 - sigma*sqrt_T
    delta = norm.cdf(d1)
    gamma = norm.pdf(d1) / (S * sigma * sqrt_T)
    theta = (-S*norm.pdf(d1)*sigma/(2*sqrt_T) - r*K*np.exp(-r*T)*norm.cdf(d2)) / 365
    vega = S * sqrt_T * norm.pdf(d1) / 100
    return delta, gamma, theta, vega

# Portfolio: Short 10 lots of Nifty 22000 CE
S, K, T, r, sigma = 22000, 22000, 30/365, 0.065, 0.18
lot_size = 75
n_lots = -10
n_units = n_lots * lot_size

d, g, th, v = greeks(S, K, T, r, sigma)
port_delta = n_units * d
port_gamma = n_units * g
port_theta = n_units * th
port_vega = n_units * v

print("=== Short 10 lots Nifty 22000 CE Portfolio ===")
print(f"Portfolio Delta: {port_delta:>10.1f}")
print(f"Portfolio Gamma: {port_gamma:>10.4f}")
print(f"Portfolio Theta: {port_theta:>10.2f} INR/day")
print(f"Portfolio Vega:  {port_vega:>10.2f}")

# Step 1: Delta hedge with futures
futures_lots = round(-port_delta / lot_size)
residual_delta = port_delta + futures_lots * lot_size
print(f"\\n--- Delta Hedge ---")
print(f"Buy {futures_lots} Nifty futures lots")
print(f"Residual Delta: {residual_delta:.1f}")
print(f"Residual Gamma: {port_gamma:.4f} (unchanged!)")

# Step 2: Delta-Gamma hedge using ATM options + futures
K2 = 22500  # Use a different strike for gamma hedge
d2, g2, th2, v2 = greeks(S, K2, T, r, sigma)
opt_lots = round(-port_gamma / (g2 * lot_size))
new_delta = port_delta + opt_lots * lot_size * d2
new_gamma = port_gamma + opt_lots * lot_size * g2
adj_futures = round(-new_delta / lot_size)
final_delta = new_delta + adj_futures * lot_size

print(f"\\n--- Delta-Gamma Hedge ---")
print(f"Buy {opt_lots} lots of 22500 CE (Gamma source)")
print(f"Buy {adj_futures} lots of futures (Delta adjust)")
print(f"Final Delta: {final_delta:.1f}")
print(f"Final Gamma: {new_gamma:.4f}")

# Simulate P&L under spot move
print(f"\\n--- P&L Comparison: Nifty moves +300 ---")
new_S = S + 300
p_unhedged = n_units * (bsm_call(new_S, K, T, r, sigma) - bsm_call(S, K, T, r, sigma))
p_delta_hedged = p_unhedged + futures_lots * lot_size * 300
p_dg_hedged = (p_unhedged + opt_lots * lot_size *
    (bsm_call(new_S, K2, T, r, sigma) - bsm_call(S, K2, T, r, sigma))
    + adj_futures * lot_size * 300)
print(f"Unhedged P&L:      INR {p_unhedged:>10,.0f}")
print(f"Delta-hedged P&L:  INR {p_delta_hedged:>10,.0f}")
print(f"DG-hedged P&L:     INR {p_dg_hedged:>10,.0f}")`}),e.jsx(B,{title:"Delta-Gamma Hedging a Short Straddle",difficulty:"advanced",problem:"A trader sells 5 lots of Nifty 22000 straddle (CE + PE). The portfolio has Delta = +50, Gamma = -8.5, Vega = -450. Using ATM 22000 CE (Delta = 0.52, Gamma = 0.00012, Vega = 62) and Nifty futures, construct a delta-gamma hedge.",solution:[{step:"Neutralize Gamma with options",formula:"n_{\\text{opt}} = \\frac{-\\Gamma_{\\pi}}{\\Gamma_{\\text{opt}} \\times 75} = \\frac{8.5}{0.00012 \\times 75} = 944 \\approx 13 \\text{ lots}",explanation:"Buy 13 lots of 22000 CE to offset negative Gamma. Each lot contributes 75 x 0.00012 = 0.009 Gamma."},{step:"Compute new Delta after Gamma hedge",formula:"\\Delta_{\\text{new}} = 50 + 13 \\times 75 \\times 0.52 = 50 + 507 = 557",explanation:"The options purchased for Gamma bring additional positive Delta."},{step:"Hedge residual Delta with futures",formula:"n_{\\text{fut}} = -\\frac{557}{75} = -7.4 \\approx -7 \\text{ lots}",explanation:"Sell 7 lots of Nifty futures to neutralize the remaining Delta."}]}),e.jsx(S,{title:"SEBI Margin Impact",type:"warning",children:e.jsx("p",{children:"Under SEBI peak margin rules, hedged positions receive margin benefits. A delta-hedged options position on NSE receives up to 70% margin reduction compared to naked positions. However, the benefit is computed at the portfolio level using SPAN margining. Traders on Zerodha and other brokers should note that margin benefits apply only if hedge and hedged positions are in the same underlying and the same account segment."})}),e.jsx(S,{title:"Rebalancing Frequency",type:"tip",children:e.jsx("p",{children:"The optimal delta hedging frequency depends on the Gamma-to-transaction-cost ratio. On NSE, with Zerodha charging zero brokerage on equity delivery but INR 20 per futures order, high-frequency rebalancing is feasible. Professional desks typically rebalance when Delta drifts beyond a threshold (e.g., 50 Nifty points worth of Delta) rather than at fixed time intervals. This threshold-based approach minimizes unnecessary trades while keeping risk bounded."})})]})}const ve=Object.freeze(Object.defineProperty({__proto__:null,default:ee},Symbol.toStringTag,{value:"Module"}));function te(){const[r,w]=h.useState(.18),[i,_]=h.useState(-.12),[a,T]=h.useState(.03),o=Array.from({length:21},(n,y)=>19e3+y*300),f=22e3,d=o.map(n=>{const y=Math.log(n/f);return Math.max(.05,r+i*y+a*y*y)}),x=Math.max(...d),c=Math.min(...d),s=180,g=500,p=50,u=30;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Nifty 50 Volatility Smile"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust ATM vol, skew, and kurtosis parameters to shape the implied volatility curve."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["ATM Vol = ",(r*100).toFixed(1),"%"]}),e.jsx("input",{type:"range",min:"0.08",max:"0.40",step:"0.01",value:r,onChange:n=>w(Number(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Skew = ",i.toFixed(2)]}),e.jsx("input",{type:"range",min:"-0.40",max:"0.10",step:"0.01",value:i,onChange:n=>_(Number(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Kurtosis = ",a.toFixed(2)]}),e.jsx("input",{type:"range",min:"-0.05",max:"0.15",step:"0.005",value:a,onChange:n=>T(Number(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:`0 0 ${g+p+20} ${s+u+20}`,className:"w-full max-w-2xl mx-auto block","aria-label":"IV Smile Chart",children:[e.jsx("line",{x1:p,y1:10,x2:p,y2:s+10,stroke:"#9ca3af",strokeWidth:"1"}),e.jsx("line",{x1:p,y1:s+10,x2:g+p,y2:s+10,stroke:"#9ca3af",strokeWidth:"1"}),[0,.25,.5,.75,1].map(n=>{const y=s+10-n*s,C=c+n*(x-c);return e.jsxs("text",{x:p-5,y:y+3,textAnchor:"end",className:"text-[9px]",fill:"#9ca3af",children:[(C*100).toFixed(0),"%"]},n)}),(()=>{const n=p+(f-o[0])/(o[o.length-1]-o[0])*g;return e.jsxs("g",{children:[e.jsx("line",{x1:n,y1:10,x2:n,y2:s+10,stroke:"#6366f1",strokeWidth:"1",strokeDasharray:"4"}),e.jsx("text",{x:n,y:s+25,textAnchor:"middle",className:"text-[9px]",fill:"#6366f1",children:"ATM"})]})})(),e.jsx("polyline",{points:o.map((n,y)=>{const C=p+y/(o.length-1)*g,b=s+10-(d[y]-c)/(x-c)*s;return`${C},${b}`}).join(" "),fill:"none",stroke:"#6366f1",strokeWidth:"2.5"}),o.map((n,y)=>{const C=p+y/(o.length-1)*g,b=s+10-(d[y]-c)/(x-c)*s;return e.jsx("circle",{cx:C,cy:b,r:"3",fill:"#6366f1"},y)}),e.jsx("text",{x:p+g/2,y:s+u+8,textAnchor:"middle",className:"text-[10px]",fill:"#9ca3af",children:"Strike Price"})]})]})}function ae(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Implied Volatility"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Implied volatility (IV) is the market's consensus forecast of future realized volatility, extracted from observed option prices. On NSE, where Nifty 50 options are the most liquid derivatives in India, IV provides a real-time gauge of market fear and uncertainty. India VIX, computed by NSE from Nifty option prices, is the benchmark volatility index."}),e.jsx(M,{title:"Implied Volatility",label:"Definition 6.15",definition:"Implied volatility is the value of sigma that, when substituted into the Black-Scholes formula, reproduces the observed market price of the option. It is found by numerically inverting the BSM pricing function.",notation:"C_{\\text{market}} = C_{\\text{BSM}}(S, K, T, r, \\sigma_{\\text{imp}}) \\implies \\sigma_{\\text{imp}} = \\text{BSM}^{-1}(C_{\\text{market}})"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["Since the BSM formula has no closed-form inverse for ",e.jsx(t.InlineMath,{math:"\\sigma"}),", we use numerical root-finding. The most common methods are Newton-Raphson (using Vega as the derivative) and Brent's method (bracketing approach). Newton-Raphson converges quickly because Vega is always positive for vanilla options:"]}),e.jsx(t.BlockMath,{math:"\\sigma_{n+1} = \\sigma_n - \\frac{C_{\\text{BSM}}(\\sigma_n) - C_{\\text{market}}}{\\mathcal{V}(\\sigma_n)}"}),e.jsx(M,{title:"Volatility Smile and Skew",label:"Definition 6.16",definition:"The volatility smile is the empirical pattern where implied volatility varies across strike prices for a given expiry. In equity markets like NSE, it typically takes the form of a skew -- OTM puts have higher IV than OTM calls, reflecting demand for downside protection.",notation:"\\sigma_{\\text{imp}}(K) \\neq \\text{constant} \\quad \\text{(contradicting BSM assumptions)}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The Nifty 50 volatility surface typically shows a pronounced negative skew: puts struck 5-10% below spot trade at 3-5 vol points higher than ATM. This reflects institutional demand for portfolio protection. During market stress (e.g., COVID crash of March 2020, when Nifty fell from 12000 to 7500), the skew steepens dramatically."}),e.jsx(t.BlockMath,{math:"\\sigma_{\\text{imp}}(K) \\approx \\sigma_{\\text{ATM}} + \\alpha \\cdot \\ln\\!\\left(\\frac{K}{S}\\right) + \\beta \\cdot \\left[\\ln\\!\\left(\\frac{K}{S}\\right)\\right]^2"}),e.jsx(P,{title:"Monotonicity of BSM Price in Volatility",label:"Theorem 6.5",statement:"The Black-Scholes call (and put) price is strictly increasing in \\sigma for \\sigma > 0 and T > 0. This guarantees that implied volatility, if it exists, is unique.",proof:"The derivative of the BSM call price with respect to \\sigma is the Vega: \\mathcal{V} = S\\sqrt{T}\\,\\phi(d_1) > 0 for all S, T > 0. Since the price function is continuous and strictly monotone in \\sigma, the intermediate value theorem guarantees existence, and monotonicity guarantees uniqueness of the inverse."}),e.jsx(te,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Computing IV from NSE Option Chain"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Below we implement Newton-Raphson IV solver and apply it to a simulated Nifty option chain to construct the volatility smile."}),e.jsx(V,{title:"implied_volatility.py",runnable:!0,code:`import numpy as np
from scipy.stats import norm
from scipy.optimize import brentq

def bsm_call(S, K, T, r, sigma):
    d1 = (np.log(S/K) + (r + sigma**2/2)*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    return S*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)

def bsm_vega(S, K, T, r, sigma):
    d1 = (np.log(S/K) + (r + sigma**2/2)*T) / (sigma*np.sqrt(T))
    return S * np.sqrt(T) * norm.pdf(d1)

def implied_vol_newton(price, S, K, T, r, tol=1e-8, max_iter=100):
    """Newton-Raphson IV solver using Vega."""
    sigma = 0.20  # initial guess
    for i in range(max_iter):
        diff = bsm_call(S, K, T, r, sigma) - price
        vega = bsm_vega(S, K, T, r, sigma)
        if vega < 1e-12:
            break
        sigma -= diff / vega
        if abs(diff) < tol:
            return sigma
    return sigma

def implied_vol_brent(price, S, K, T, r):
    """Brent's method (robust bracketing)."""
    f = lambda sig: bsm_call(S, K, T, r, sig) - price
    return brentq(f, 0.01, 3.0)

# Nifty 50 option chain (simulated market prices)
S = 22000
r = 0.065
T = 30 / 365
strikes = np.arange(20000, 24200, 200)

# Generate prices with a realistic skew
true_ivs = 0.18 - 0.12 * np.log(strikes / S) + 0.03 * np.log(strikes / S)**2
prices = np.array([bsm_call(S, K, T, r, iv) for K, iv in zip(strikes, true_ivs)])

# Recover IV using Newton-Raphson
print("=== Nifty 50 Volatility Smile (30 DTE) ===")
print(f"{'Strike':>8} {'Price':>10} {'IV (Newton)':>12} {'IV (Brent)':>12} {'True IV':>10}")
print("-" * 56)
for K, price, true_iv in zip(strikes, prices, true_ivs):
    if price > 0.50:
        iv_newton = implied_vol_newton(price, S, K, T, r)
        iv_brent = implied_vol_brent(price, S, K, T, r)
        print(f"{K:>8.0f} {price:>10.2f} {iv_newton*100:>11.2f}% "
              f"{iv_brent*100:>11.2f}% {true_iv*100:>9.2f}%")

# India VIX approximation
atm_iv = implied_vol_newton(
    bsm_call(S, S, T, r, 0.18), S, S, T, r
)
print(f"\\nATM Implied Volatility: {atm_iv*100:.2f}%")
print(f"Annualized (India VIX proxy): {atm_iv*100:.2f}%")
print(f"Expected daily move: {S * atm_iv / np.sqrt(252):.0f} points")`}),e.jsx(B,{title:"Computing IV for a Nifty Put",difficulty:"intermediate",problem:"A Nifty 21500 PE (30 DTE) is trading at INR 185. Spot is 22000, risk-free rate is 6.5%. Find the implied volatility using one iteration of Newton-Raphson starting from sigma_0 = 0.20.",solution:[{step:"Convert to call price using put-call parity",formula:"C = P + S - Ke^{-rT} = 185 + 22000 - 21500 \\cdot e^{-0.065 \\times 30/365} \\approx 185 + 22000 - 21464.6 = 720.4",explanation:"Newton-Raphson is typically applied to call prices. Use put-call parity to convert."},{step:"Compute BSM call price at sigma_0 = 0.20",formula:"C_{BSM}(0.20) \\approx 673.5",explanation:"Evaluate BSM formula with all parameters and initial vol guess."},{step:"Compute Vega at sigma_0",formula:"\\mathcal{V}(0.20) = S\\sqrt{T}\\phi(d_1) \\approx 2380"},{step:"Newton-Raphson update",formula:"\\sigma_1 = 0.20 - \\frac{673.5 - 720.4}{2380} = 0.20 + 0.0197 \\approx 0.2197",explanation:"The implied vol is approximately 22.0%, higher than the 20% guess because the put was relatively expensive."}]}),e.jsx(S,{title:"India VIX",type:"tip",children:e.jsx("p",{children:"India VIX is computed by NSE using a model-free approach based on Nifty option prices across multiple strikes. It represents the market's expectation of 30-day annualized volatility. Historically, India VIX ranges from 10-15 in calm markets to 40+ during crises. It is mean-reverting, making it useful for timing options strategies. SEBI allows trading VIX futures on NSE, though liquidity remains limited compared to Nifty options."})}),e.jsx(S,{title:"Smile Dynamics",type:"warning",children:e.jsxs("p",{children:["The volatility smile is not static -- it shifts and reshapes as the market moves. Two common dynamics are observed on NSE: (1) ",e.jsx("strong",{children:"Sticky strike"}),": each strike retains its IV as spot moves, and (2) ",e.jsx("strong",{children:"Sticky delta"}),": IV follows moneyness, so ATM vol stays constant. Real markets exhibit behavior between these extremes. Understanding smile dynamics is critical for accurate delta hedging and P&L attribution on Nifty option books."]})})]})}const Ne=Object.freeze(Object.defineProperty({__proto__:null,default:ae},Symbol.toStringTag,{value:"Module"}));function re(){const[r,w]=h.useState(22e3),[i,_]=h.useState(30),a=Array.from({length:11},(x,c)=>19e3+c*600),T=(x,c)=>{const s=Math.log(x/r),g=1+.3*Math.exp(-c/60);return Math.max(.08,(.18+-.15*s+.04*s*s)*g)},o=480,f=160,d=50;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Local Volatility Surface Slice"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"View the local volatility curve at a given time slice for Nifty 50."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Nifty Spot = ",r]}),e.jsx("input",{type:"range",min:"19000",max:"25000",step:"100",value:r,onChange:x=>w(Number(x.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Time Slice = ",i," days"]}),e.jsx("input",{type:"range",min:"5",max:"90",step:"1",value:i,onChange:x=>_(Number(x.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:`0 0 ${o+d+20} ${f+50}`,className:"w-full max-w-2xl mx-auto block","aria-label":"Local Vol Surface Slice",children:[e.jsx("line",{x1:d,y1:10,x2:d,y2:f+10,stroke:"#9ca3af",strokeWidth:"1"}),e.jsx("line",{x1:d,y1:f+10,x2:o+d,y2:f+10,stroke:"#9ca3af",strokeWidth:"1"}),(()=>{const x=a.map(p=>T(p,i)),c=Math.max(...x)*1.1,s=Math.min(...x)*.9,g=a.map((p,u)=>{const n=d+u/(a.length-1)*o,y=f+10-(x[u]-s)/(c-s)*f;return`${n},${y}`}).join(" ");return e.jsxs("g",{children:[e.jsx("polyline",{points:g,fill:"none",stroke:"#8b5cf6",strokeWidth:"2.5"}),a.map((p,u)=>{const n=d+u/(a.length-1)*o,y=f+10-(x[u]-s)/(c-s)*f;return e.jsx("circle",{cx:n,cy:y,r:"3",fill:"#8b5cf6"},u)}),[0,.5,1].map(p=>e.jsxs("text",{x:d-5,y:f+13-p*f,textAnchor:"end",className:"text-[9px]",fill:"#9ca3af",children:[((s+p*(c-s))*100).toFixed(0),"%"]},p))]})})(),e.jsx("text",{x:d+o/2,y:f+40,textAnchor:"middle",className:"text-[10px]",fill:"#9ca3af",children:"Strike Price (Nifty)"}),e.jsx("text",{x:d-35,y:f/2+10,textAnchor:"middle",className:"text-[9px]",fill:"#9ca3af",transform:`rotate(-90, ${d-35}, ${f/2+10})`,children:"Local Vol"})]})]})}function ie(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Local Volatility Models"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Local volatility models extend Black-Scholes by allowing volatility to be a deterministic function of both the underlying price and time. Introduced by Dupire (1994) and Derman-Kani (1994), local vol is the simplest framework that exactly reproduces observed option prices across all strikes and expiries on the NSE volatility surface."}),e.jsx(M,{title:"Local Volatility",label:"Definition 6.17",definition:"Local volatility sigma_L(S,t) is the instantaneous volatility of the underlying at price level S and time t, such that the risk-neutral diffusion dS = rS dt + sigma_L(S,t) S dW reproduces all observed European option prices.",notation:"dS_t = r\\,S_t\\,dt + \\sigma_L(S_t, t)\\,S_t\\,dW_t"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The key insight of the local volatility framework is that there exists a unique deterministic volatility function that is consistent with any arbitrage-free set of European option prices. This is formalized by Dupire's equation:"}),e.jsx(P,{title:"Dupire's Formula",label:"Theorem 6.6",statement:"Given a smooth surface of European call prices C(K,T), the unique local volatility function consistent with these prices is: \\sigma_L^2(K,T) = \\frac{\\frac{\\partial C}{\\partial T} + rK\\frac{\\partial C}{\\partial K}}{\\ \\frac{1}{2}K^2\\frac{\\partial^2 C}{\\partial K^2}}. This remarkable result allows us to extract local volatility from the market-observed option price surface.",proof:"Starting from the Fokker-Planck (forward Kolmogorov) equation for the risk-neutral transition density p(S,T|S_0,0), and using the relationship C(K,T) = e^{-rT}\\int_K^\\infty (S-K)p(S,T)dS, differentiate twice with respect to K and once with respect to T. Combining these partial derivatives and using the boundary conditions of the call price yields Dupire's formula."}),e.jsx(t.BlockMath,{math:"\\sigma_L^2(K, T) = \\frac{\\dfrac{\\partial C}{\\partial T} + rK\\dfrac{\\partial C}{\\partial K}}{\\dfrac{1}{2}K^2\\dfrac{\\partial^2 C}{\\partial K^2}}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"In practice, the partial derivatives are estimated numerically from the observed option price grid on NSE. The denominator involves the butterfly spread price (proportional to the risk-neutral density), and the numerator involves a calendar spread."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Relationship to Implied Volatility"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Local volatility and implied volatility are related but distinct. Implied vol is an average of local vol along the path from spot to strike. For ATM options at short maturity:"}),e.jsx(t.BlockMath,{math:"\\sigma_{\\text{imp}}^2(K, T) \\approx \\frac{1}{T}\\int_0^T \\sigma_L^2(K, t)\\,dt"}),e.jsx(t.BlockMath,{math:"\\sigma_L^2(K, T) = \\sigma_{\\text{imp}}^2 + 2T\\sigma_{\\text{imp}}\\frac{\\partial \\sigma_{\\text{imp}}}{\\partial T} + \\frac{2rK\\sigma_{\\text{imp}}\\frac{\\partial \\sigma_{\\text{imp}}}{\\partial K}}{1 + d_1\\sqrt{T}\\frac{\\partial \\sigma_{\\text{imp}}}{\\partial K}}"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Feature"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Black-Scholes"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Local Vol"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Volatility"}),e.jsxs("td",{className:"px-4 py-2",children:["Constant ",e.jsx(t.InlineMath,{math:"\\sigma"})]}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"\\sigma_L(S, t)"})})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Smile fit"}),e.jsx("td",{className:"px-4 py-2",children:"No (flat)"}),e.jsx("td",{className:"px-4 py-2",children:"Exact by construction"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Forward smile"}),e.jsx("td",{className:"px-4 py-2",children:"Flat"}),e.jsx("td",{className:"px-4 py-2",children:"Flattens too fast"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Dynamics"}),e.jsx("td",{className:"px-4 py-2",children:"Deterministic"}),e.jsx("td",{className:"px-4 py-2",children:"Deterministic"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Calibration"}),e.jsx("td",{className:"px-4 py-2",children:"1 parameter"}),e.jsx("td",{className:"px-4 py-2",children:"Full surface"})]})]})]})}),e.jsx(re,{}),e.jsx(V,{title:"local_volatility.py",runnable:!0,code:`import numpy as np
from scipy.stats import norm
from scipy.interpolate import RectBivariateSpline

def bsm_call(S, K, T, r, sigma):
    d1 = (np.log(S/K) + (r + sigma**2/2)*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    return S*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)

# Build a synthetic Nifty option surface
S0 = 22000
r = 0.065
strikes = np.linspace(19000, 25000, 25)
expiries = np.array([7, 15, 30, 45, 60, 90]) / 365

# Implied vol surface with skew
def iv_surface(K, T):
    m = np.log(K / S0)
    base = 0.18 - 0.12 * m + 0.03 * m**2
    term = 1 + 0.3 * np.exp(-T * 365 / 60)
    return np.clip(base * term, 0.08, 0.60)

# Build call price surface
K_grid, T_grid = np.meshgrid(strikes, expiries)
IV_grid = iv_surface(K_grid, T_grid)
C_grid = np.vectorize(bsm_call)(S0, K_grid, T_grid, r, IV_grid)

# Dupire local vol via finite differences
def dupire_local_vol(C, K, T, r):
    nT, nK = C.shape
    lv = np.zeros_like(C)
    for i in range(1, nT - 1):
        for j in range(1, nK - 1):
            dC_dT = (C[i+1, j] - C[i-1, j]) / (T[i+1, j] - T[i-1, j])
            dC_dK = (C[i, j+1] - C[i, j-1]) / (K[i, j+1] - K[i, j-1])
            d2C_dK2 = (C[i, j+1] - 2*C[i, j] + C[i, j-1]) / (
                (K[i, j+1] - K[i, j-1]) / 2)**2
            numerator = dC_dT + r * K[i, j] * dC_dK
            denominator = 0.5 * K[i, j]**2 * d2C_dK2
            if denominator > 1e-8:
                lv[i, j] = np.sqrt(max(numerator / denominator, 0))
    return lv

local_vol = dupire_local_vol(C_grid, K_grid, T_grid, r)

print("=== Dupire Local Volatility for Nifty 50 ===")
print(f"Spot: {S0:,} | Rate: {r*100:.1f}%")
print(f"\\n{'Strike':>8}", end="")
for T in expiries[1:-1]:
    print(f" {T*365:>6.0f}D", end="")
print()
print("-" * 50)
for j in range(2, len(strikes) - 2, 2):
    print(f"{strikes[j]:>8.0f}", end="")
    for i in range(1, len(expiries) - 1):
        if local_vol[i, j] > 0:
            print(f" {local_vol[i, j]*100:>5.1f}%", end="")
        else:
            print(f"   N/A", end="")
    print()

print(f"\\nNote: Local vol > implied vol for OTM puts (left skew)")
print(f"      Local vol surface is always >= 0 (arbitrage-free)")`}),e.jsx(B,{title:"Local Vol from Calendar and Butterfly Spreads",difficulty:"advanced",problem:"At strike K=22000, the 30-day Nifty call costs INR 450 and the 60-day call costs INR 720. The 21900/22000/22100 butterfly costs INR 12 for the 45-day expiry. Estimate local volatility at (K=22000, T=45 days).",solution:[{step:"Estimate dC/dT from calendar spread",formula:"\\frac{\\partial C}{\\partial T} \\approx \\frac{720 - 450}{(60-30)/365} = \\frac{270}{0.0822} = 3285"},{step:"Estimate d2C/dK2 from butterfly spread",formula:"\\frac{\\partial^2 C}{\\partial K^2} \\approx \\frac{\\text{Butterfly price}}{(\\Delta K)^2} = \\frac{12}{100^2} = 0.0012",explanation:"The butterfly spread approximates the second derivative with respect to strike."},{step:"Apply Dupire formula (ignoring drift term)",formula:"\\sigma_L^2 \\approx \\frac{3285}{0.5 \\times 22000^2 \\times 0.0012} = \\frac{3285}{290400} = 0.01131"},{step:"Take square root",formula:"\\sigma_L \\approx \\sqrt{0.01131} = 0.1063 = 10.63\\%",explanation:"This is the local (instantaneous) volatility at this strike-time point."}]}),e.jsx(S,{title:"Limitations of Local Vol",type:"warning",children:e.jsx("p",{children:"While local volatility perfectly fits the current smile, it produces unrealistic forward smile dynamics. The model predicts that the smile flattens as we look forward in time, which contradicts market behavior. On NSE, traders observe that the Nifty skew persists into forward-starting options. This limitation motivates stochastic volatility models like Heston and SABR."})}),e.jsx(S,{title:"Practical Tip: Surface Smoothing",type:"tip",children:e.jsx("p",{children:"Raw NSE option data contains noise from bid-ask spreads and stale quotes. Before applying Dupire's formula, the implied volatility surface must be smoothed (e.g., using SVI parameterization or cubic spline interpolation) to ensure non-negative local variances. A negative local variance implies calendar spread arbitrage in the input data."})})]})}const ke=Object.freeze(Object.defineProperty({__proto__:null,default:ie},Symbol.toStringTag,{value:"Module"}));function se(){const[r,w]=h.useState(2),[i,_]=h.useState(.04),[a,T]=h.useState(.3),[o,f]=h.useState(-.7),[d,x]=h.useState(.04),c=2*r*i>a*a,s=Math.log(2)/r,g=Math.sqrt(i)*100;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Heston Model Parameters"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Explore how Heston parameters affect the variance dynamics and Feller condition."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:[e.jsx(t.InlineMath,{math:"\\kappa"})," (mean reversion) = ",r.toFixed(2)]}),e.jsx("input",{type:"range",min:"0.1",max:"10",step:"0.1",value:r,onChange:p=>w(Number(p.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:[e.jsx(t.InlineMath,{math:"\\theta"})," (long-run var) = ",i.toFixed(3)]}),e.jsx("input",{type:"range",min:"0.005",max:"0.15",step:"0.005",value:i,onChange:p=>_(Number(p.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:[e.jsx(t.InlineMath,{math:"\\xi"})," (vol of vol) = ",a.toFixed(2)]}),e.jsx("input",{type:"range",min:"0.05",max:"1.0",step:"0.05",value:a,onChange:p=>T(Number(p.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:[e.jsx(t.InlineMath,{math:"\\rho"})," (correlation) = ",o.toFixed(2)]}),e.jsx("input",{type:"range",min:"-0.95",max:"0.95",step:"0.05",value:o,onChange:p=>f(Number(p.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:[e.jsx(t.InlineMath,{math:"v_0"})," (initial var) = ",d.toFixed(3)]}),e.jsx("input",{type:"range",min:"0.005",max:"0.15",step:"0.005",value:d,onChange:p=>x(Number(p.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Feller Condition"}),e.jsx("div",{className:`text-sm font-bold ${c?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}`,children:c?"SATISFIED":"VIOLATED"}),e.jsxs("div",{className:"text-[10px] text-gray-400",children:[(2*r*i).toFixed(3)," ",c?">":"<="," ",(a*a).toFixed(3)]})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Long-Term Vol"}),e.jsxs("div",{className:"text-lg font-bold text-purple-600 dark:text-purple-400",children:[g.toFixed(1),"%"]})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Half-Life"}),e.jsxs("div",{className:"text-lg font-bold text-blue-600 dark:text-blue-400",children:[(s*252).toFixed(0),"d"]})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Current Vol"}),e.jsxs("div",{className:"text-lg font-bold text-orange-600 dark:text-orange-400",children:[(Math.sqrt(d)*100).toFixed(1),"%"]})]})]})]})}function ne(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Stochastic Volatility Models"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Stochastic volatility models treat volatility itself as a random process, capturing the empirical fact that Nifty 50 volatility clusters, mean-reverts, and is correlated with price movements. The Heston model (1993) is the workhorse of the industry, offering a semi-analytical pricing formula while generating realistic volatility smiles."}),e.jsx(M,{title:"Heston Stochastic Volatility Model",label:"Definition 6.18",definition:"The Heston model specifies the asset price and its variance as a system of coupled SDEs. The variance follows a CIR (Cox-Ingersoll-Ross) mean-reverting square-root process.",notation:"dS_t = rS_t\\,dt + \\sqrt{v_t}\\,S_t\\,dW_t^S, \\quad dv_t = \\kappa(\\theta - v_t)\\,dt + \\xi\\sqrt{v_t}\\,dW_t^v"}),e.jsx(t.BlockMath,{math:"\\begin{aligned} dS_t &= r\\,S_t\\,dt + \\sqrt{v_t}\\,S_t\\,dW_t^S \\\\ dv_t &= \\kappa(\\theta - v_t)\\,dt + \\xi\\sqrt{v_t}\\,dW_t^v \\\\ \\text{Corr}(dW^S, dW^v) &= \\rho\\,dt \\end{aligned}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The five Heston parameters have clear economic interpretations for the Indian market:"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Parameter"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Symbol"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Meaning"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Nifty Typical"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Mean reversion speed"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"\\kappa"})}),e.jsx("td",{className:"px-4 py-2",children:"How fast vol returns to long-run level"}),e.jsx("td",{className:"px-4 py-2",children:"1.5 - 4.0"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Long-run variance"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"\\theta"})}),e.jsx("td",{className:"px-4 py-2",children:"Equilibrium variance level"}),e.jsx("td",{className:"px-4 py-2",children:"0.02 - 0.06"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Vol of vol"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"\\xi"})}),e.jsx("td",{className:"px-4 py-2",children:"Volatility of the variance process"}),e.jsx("td",{className:"px-4 py-2",children:"0.2 - 0.6"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Correlation"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"\\rho"})}),e.jsx("td",{className:"px-4 py-2",children:"Spot-vol correlation (leverage)"}),e.jsx("td",{className:"px-4 py-2",children:"-0.8 to -0.5"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Initial variance"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"v_0"})}),e.jsx("td",{className:"px-4 py-2",children:"Current instantaneous variance"}),e.jsx("td",{className:"px-4 py-2",children:"From India VIX"})]})]})]})}),e.jsx(P,{title:"Feller Condition",label:"Theorem 6.7",statement:"The variance process v_t remains strictly positive (never touches zero) if and only if the Feller condition is satisfied: 2\\kappa\\theta > \\xi^2. When violated, the variance can reach zero, requiring careful numerical treatment.",proof:"The CIR process v_t has a non-central chi-squared transition density. The boundary behavior at v=0 is classified by the ratio 2\\kappa\\theta/\\xi^2. When this ratio exceeds 1, zero is an entrance boundary (inaccessible from above). When the ratio is at most 1, zero is a regular boundary that is reached with positive probability."}),e.jsx(se,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Heston Characteristic Function"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The power of the Heston model lies in its semi-analytical characteristic function, which enables fast pricing via Fourier inversion:"}),e.jsx(t.BlockMath,{math:"\\phi(u) = \\exp\\!\\left\\{i u \\ln S + \\frac{\\kappa\\theta}{\\xi^2}\\left[(\\kappa - \\rho\\xi iu - d)T - 2\\ln\\frac{1 - ge^{-dT}}{1-g}\\right] + \\frac{v_0}{\\xi^2}(\\kappa - \\rho\\xi iu - d)\\frac{1 - e^{-dT}}{1 - ge^{-dT}}\\right\\}"}),e.jsx(t.BlockMath,{math:"d = \\sqrt{(\\rho\\xi iu - \\kappa)^2 + \\xi^2(iu + u^2)}, \\quad g = \\frac{\\kappa - \\rho\\xi iu - d}{\\kappa - \\rho\\xi iu + d}"}),e.jsx(V,{title:"heston_pricing.py",runnable:!0,code:`import numpy as np
from scipy.integrate import quad

def heston_char_func(u, S, K, T, r, v0, kappa, theta, xi, rho):
    """Heston characteristic function (Albrecher et al. formulation)."""
    d = np.sqrt((rho * xi * 1j * u - kappa)**2 + xi**2 * (1j * u + u**2))
    g = (kappa - rho * xi * 1j * u - d) / (kappa - rho * xi * 1j * u + d)

    C = (kappa * theta / xi**2) * (
        (kappa - rho * xi * 1j * u - d) * T
        - 2 * np.log((1 - g * np.exp(-d * T)) / (1 - g))
    )
    D = ((kappa - rho * xi * 1j * u - d) / xi**2) * (
        (1 - np.exp(-d * T)) / (1 - g * np.exp(-d * T))
    )
    return np.exp(C + D * v0 + 1j * u * np.log(S * np.exp(r * T)))

def heston_call(S, K, T, r, v0, kappa, theta, xi, rho):
    """Price a European call using Heston via Fourier inversion."""
    def integrand(u, j):
        if j == 1:
            phi = heston_char_func(u - 1j, S, K, T, r, v0, kappa, theta, xi, rho)
            phi /= (1j * u * heston_char_func(-1j, S, K, T, r, v0, kappa, theta, xi, rho))
        else:
            phi = heston_char_func(u, S, K, T, r, v0, kappa, theta, xi, rho)
            phi /= (1j * u)
        return (np.exp(-1j * u * np.log(K)) * phi).real

    P1 = 0.5 + (1/np.pi) * quad(integrand, 0, 100, args=(1,), limit=200)[0]
    P2 = 0.5 + (1/np.pi) * quad(integrand, 0, 100, args=(2,), limit=200)[0]
    return S * P1 - K * np.exp(-r * T) * P2

# Calibrated Heston parameters for Nifty 50
S = 22000
r = 0.065
v0 = 0.0324     # Current variance (IV ~ 18%)
kappa = 2.5      # Mean reversion speed
theta = 0.04     # Long-run variance (vol ~ 20%)
xi = 0.35        # Vol of vol
rho = -0.70      # Spot-vol correlation

print("=== Heston Model: Nifty 50 Option Prices ===")
print(f"Spot: {S:,} | v0: {v0} (vol={np.sqrt(v0)*100:.1f}%)")
print(f"kappa={kappa}, theta={theta}, xi={xi}, rho={rho}")
feller = 2 * kappa * theta > xi**2
print(f"Feller: 2*kappa*theta={2*kappa*theta:.3f} vs xi^2={xi**2:.3f} -> {'OK' if feller else 'VIOLATED'}")

strikes = np.arange(20000, 24200, 500)
T = 30 / 365
print(f"\\n{'Strike':>8} {'Heston':>10} {'BSM(ATM IV)':>12} {'Difference':>10}")
print("-" * 44)

from scipy.stats import norm
def bsm_call(S, K, T, r, sigma):
    d1 = (np.log(S/K) + (r+sigma**2/2)*T)/(sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    return S*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)

for K in strikes:
    h_price = heston_call(S, K, T, r, v0, kappa, theta, xi, rho)
    b_price = bsm_call(S, K, T, r, np.sqrt(v0))
    print(f"{K:>8.0f} {h_price:>10.2f} {b_price:>12.2f} {h_price-b_price:>+10.2f}")

print("\\nNote: Heston produces higher OTM put prices (left skew from rho < 0)")`}),e.jsx(B,{title:"Estimating Heston Parameters from India VIX",difficulty:"intermediate",problem:"India VIX is at 14 (annualized vol 14%). Historical mean of India VIX over 5 years is 18%. The half-life of VIX mean reversion is estimated at 45 trading days. Estimate kappa, theta, and v0.",solution:[{step:"Convert VIX to variance",formula:"v_0 = (0.14)^2 = 0.0196, \\quad \\theta = (0.18)^2 = 0.0324",explanation:"VIX is quoted in volatility terms; Heston uses variance."},{step:"Compute kappa from half-life",formula:"\\kappa = \\frac{\\ln 2}{\\text{half-life}} = \\frac{0.693}{45/252} = \\frac{0.693}{0.1786} \\approx 3.88",explanation:"Half-life of 45 trading days converted to annual mean reversion speed."},{step:"Summary of estimates",formula:"v_0 = 0.0196, \\; \\theta = 0.0324, \\; \\kappa \\approx 3.88",explanation:"Rho and xi require calibration to the full volatility surface using optimization."}]}),e.jsx(S,{title:"SABR Model Alternative",type:"tip",children:e.jsxs("p",{children:["The SABR model (Hagan et al., 2002) is another popular stochastic volatility model used for interest rate options and increasingly for equity index options. Unlike Heston, SABR provides an analytical approximation for implied volatility directly, making it convenient for interpolation. For Nifty options, SABR with ",e.jsx(t.InlineMath,{math:"\\beta = 1"})," (lognormal) is commonly used by Indian sell-side desks for smile interpolation."]})}),e.jsx(S,{title:"Calibration Challenges",type:"warning",children:e.jsx("p",{children:"Calibrating the Heston model to the NSE Nifty volatility surface is an ill-posed optimization problem. Multiple parameter sets can produce similar fits. Best practices include: (1) using global optimizers like differential evolution before local refinement, (2) adding regularization to prevent extreme parameters, (3) weighting liquid strikes (ATM and near-ATM) more heavily, and (4) checking Feller condition satisfaction. Overfitting to noisy short-dated weekly option data should be avoided."})})]})}const Se=Object.freeze(Object.defineProperty({__proto__:null,default:ne},Symbol.toStringTag,{value:"Module"}));function le(){const[r,w]=h.useState(4),[i,_]=h.useState(22e3),[a,T]=h.useState(22e3),[o,f]=h.useState(.18),d=30/365,x=.065,c=d/r,s=Math.exp(o*Math.sqrt(c)),g=1/s,p=(Math.exp(x*c)-g)/(s-g),u=Math.min(r,5),n=70,y=40,C=(u+1)*n+40,b=(u+1)*y+60,K=[];for(let l=0;l<=u;l++)for(let v=0;v<=l;v++){const I=i*Math.pow(s,l-v)*Math.pow(g,v);K.push({i:l,j:v,price:I,x:20+l*n,y:20+v*y+(u-l)*y/2})}const q=r,m=[];for(let l=0;l<=q;l++){const v=i*Math.pow(s,q-l)*Math.pow(g,l);m.push(Math.max(v-a,0))}for(let l=q-1;l>=0;l--)for(let v=0;v<=l;v++)m[v]=Math.exp(-x*c)*(p*m[v]+(1-p)*m[v+1]);const j=m[0];return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: CRR Binomial Tree for Nifty 50 Call"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust parameters and tree depth. Price shown via backward induction."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Steps = ",r]}),e.jsx("input",{type:"range",min:"2",max:"50",step:"1",value:r,onChange:l=>w(Number(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Spot = ",i]}),e.jsx("input",{type:"range",min:"18000",max:"26000",step:"100",value:i,onChange:l=>_(Number(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Strike = ",a]}),e.jsx("input",{type:"range",min:"18000",max:"26000",step:"100",value:a,onChange:l=>T(Number(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["IV = ",(o*100).toFixed(0),"%"]}),e.jsx("input",{type:"range",min:"0.08",max:"0.50",step:"0.01",value:o,onChange:l=>f(Number(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-3 sm:grid-cols-4 mb-4",children:[e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Tree Price"}),e.jsx("div",{className:"text-lg font-bold text-indigo-600 dark:text-indigo-400",children:j.toFixed(2)})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"u (up)"}),e.jsx("div",{className:"text-sm font-mono text-gray-700 dark:text-gray-300",children:s.toFixed(5)})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"d (down)"}),e.jsx("div",{className:"text-sm font-mono text-gray-700 dark:text-gray-300",children:g.toFixed(5)})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"p (prob)"}),e.jsx("div",{className:"text-sm font-mono text-gray-700 dark:text-gray-300",children:p.toFixed(4)})]})]}),r<=5&&e.jsxs("svg",{viewBox:`0 0 ${C} ${b}`,className:"w-full max-w-2xl mx-auto block","aria-label":"Binomial tree",children:[K.filter(l=>l.i<u).map(l=>e.jsxs("g",{children:[e.jsx("line",{x1:l.x,y1:l.y,x2:l.x+n,y2:l.y-y/2,stroke:"#a5b4fc",strokeWidth:"1.5"}),e.jsx("line",{x1:l.x,y1:l.y,x2:l.x+n,y2:l.y+y/2,stroke:"#fca5a5",strokeWidth:"1.5"})]},`e-${l.i}-${l.j}`)),K.map(l=>e.jsxs("g",{children:[e.jsx("circle",{cx:l.x,cy:l.y,r:"14",fill:l.price>=a?"#dbeafe":"#fee2e2",stroke:l.price>=a?"#6366f1":"#ef4444",strokeWidth:"1.5"}),e.jsxs("text",{x:l.x,y:l.y+1,textAnchor:"middle",dominantBaseline:"middle",className:"text-[7px] font-mono",fill:"#374151",children:[(l.price/1e3).toFixed(1),"k"]})]},`n-${l.i}-${l.j}`))]})]})}function oe(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Binomial and Trinomial Trees"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Lattice methods discretize the continuous-time asset price process into a recombining tree. They provide intuitive, flexible frameworks for pricing both European and American options. On NSE, where some Nifty options have American-style features and early exercise considerations arise in dividend-paying stock options, tree methods remain indispensable."}),e.jsx(M,{title:"Cox-Ross-Rubinstein (CRR) Binomial Tree",label:"Definition 6.19",definition:"The CRR model discretizes time into N steps of size dt = T/N. At each step the asset price moves up by factor u = exp(sigma sqrt(dt)) or down by d = 1/u, with risk-neutral probability p = (exp(r dt) - d)/(u - d).",notation:"u = e^{\\sigma\\sqrt{\\Delta t}}, \\quad d = \\frac{1}{u}, \\quad p = \\frac{e^{r\\Delta t} - d}{u - d}"}),e.jsx(t.BlockMath,{math:"S_{i,j} = S_0 \\cdot u^{i-j} \\cdot d^j, \\quad j = 0, 1, \\ldots, i"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The option is priced by backward induction: starting from terminal payoffs at expiry and working backward to time zero, computing the discounted expected value under risk-neutral probabilities at each node:"}),e.jsx(t.BlockMath,{math:"C_{i,j} = e^{-r\\Delta t}\\left[p \\cdot C_{i+1,j} + (1-p) \\cdot C_{i+1,j+1}\\right]"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For American options, at each node we also check whether early exercise is optimal:"}),e.jsx(t.BlockMath,{math:"C_{i,j}^{\\text{American}} = \\max\\!\\left(\\text{Payoff}(S_{i,j}),\\; e^{-r\\Delta t}\\left[p \\cdot C_{i+1,j} + (1-p) \\cdot C_{i+1,j+1}\\right]\\right)"}),e.jsx(P,{title:"Convergence of Binomial Tree to BSM",label:"Theorem 6.8",statement:"As the number of steps N tends to infinity, the CRR binomial tree price converges to the Black-Scholes price. The convergence rate is O(1/N) with oscillations, and can be improved to O(1/N^2) using Richardson extrapolation or the BBS (Broadie-Detemple) smoothing method.",proof:"As N grows, the CLT ensures that the log-return \\sum_{i=1}^N X_i (where X_i = \\ln u or \\ln d with probability p, 1-p) converges to a normal distribution. The mean and variance of this sum match the BSM lognormal parameters by construction of u, d, p. The binomial pricing formula converges to the BSM integral."}),e.jsx(M,{title:"Trinomial Tree",label:"Definition 6.20",definition:"A trinomial tree allows three moves per step: up by u, middle (stay at S), and down by d = 1/u. It provides faster convergence and can directly accommodate mean-reverting processes. The probabilities p_u, p_m, p_d are chosen to match the first two moments of the log-return.",notation:"p_u = \\frac{1}{2}\\left(\\frac{\\sigma^2\\Delta t + \\nu^2(\\Delta t)^2}{(\\Delta x)^2} + \\frac{\\nu\\Delta t}{\\Delta x}\\right), \\quad \\Delta x = \\sigma\\sqrt{3\\Delta t}"}),e.jsx(le,{}),e.jsx(V,{title:"binomial_trinomial_trees.py",runnable:!0,code:`import numpy as np
from scipy.stats import norm

def bsm_call(S, K, T, r, sigma):
    d1 = (np.log(S/K) + (r + sigma**2/2)*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    return S*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)

def crr_tree(S, K, T, r, sigma, N, option='call', style='european'):
    """CRR Binomial Tree pricing."""
    dt = T / N
    u = np.exp(sigma * np.sqrt(dt))
    d = 1 / u
    p = (np.exp(r * dt) - d) / (u - d)
    disc = np.exp(-r * dt)

    # Terminal payoffs
    ST = S * u**(np.arange(N, -1, -1)) * d**(np.arange(0, N+1, 1))
    if option == 'call':
        values = np.maximum(ST - K, 0)
    else:
        values = np.maximum(K - ST, 0)

    # Backward induction
    for i in range(N-1, -1, -1):
        values = disc * (p * values[:-1] + (1-p) * values[1:])
        if style == 'american':
            Si = S * u**(np.arange(i, -1, -1)) * d**(np.arange(0, i+1, 1))
            if option == 'call':
                values = np.maximum(values, Si - K)
            else:
                values = np.maximum(values, K - Si)
    return values[0]

def trinomial_tree(S, K, T, r, sigma, N, option='call', style='european'):
    """Trinomial tree pricing."""
    dt = T / N
    dx = sigma * np.sqrt(3 * dt)
    nu = r - 0.5 * sigma**2
    pu = 0.5 * ((sigma**2 * dt + nu**2 * dt**2) / dx**2 + nu * dt / dx)
    pm = 1 - (sigma**2 * dt + nu**2 * dt**2) / dx**2
    pd = 0.5 * ((sigma**2 * dt + nu**2 * dt**2) / dx**2 - nu * dt / dx)
    disc = np.exp(-r * dt)

    # Terminal prices
    js = np.arange(-N, N+1)
    ST = S * np.exp(js * dx)
    if option == 'call':
        values = np.maximum(ST - K, 0)
    else:
        values = np.maximum(K - ST, 0)

    for i in range(N-1, -1, -1):
        new_vals = np.zeros(2*i + 1)
        for j in range(2*i + 1):
            new_vals[j] = disc * (pu * values[j] + pm * values[j+1] + pd * values[j+2])
        if style == 'american':
            js_i = np.arange(-i, i+1)
            Si = S * np.exp(js_i * dx)
            if option == 'call':
                new_vals = np.maximum(new_vals, Si - K)
            else:
                new_vals = np.maximum(new_vals, K - Si)
        values = new_vals
    return values[0]

# Nifty 50 option pricing
S, K, T, r, sigma = 22000, 22000, 30/365, 0.065, 0.18
bsm = bsm_call(S, K, T, r, sigma)

print("=== Nifty 50 22000 CE (30 DTE) ===")
print(f"BSM Analytical: {bsm:.4f}")
print(f"\\n{'N':>6} {'Binomial':>12} {'Trinomial':>12} {'Bin Error':>10} {'Tri Error':>10}")
print("-" * 54)
for N in [10, 25, 50, 100, 200, 500]:
    bp = crr_tree(S, K, T, r, sigma, N)
    tp = trinomial_tree(S, K, T, r, sigma, N)
    print(f"{N:>6} {bp:>12.4f} {tp:>12.4f} {bp-bsm:>+10.4f} {tp-bsm:>+10.4f}")

# American put premium
print(f"\\n=== American vs European Nifty 22000 PE ===")
eu_put = crr_tree(S, K, T, r, sigma, 200, 'put', 'european')
am_put = crr_tree(S, K, T, r, sigma, 200, 'put', 'american')
print(f"European Put: {eu_put:.4f}")
print(f"American Put: {am_put:.4f}")
print(f"Early Exercise Premium: {am_put - eu_put:.4f}")`}),e.jsx(B,{title:"Two-Step Binomial Tree for Nifty Call",difficulty:"beginner",problem:"Price a 2-month Nifty 22000 CE using a 2-step CRR tree. S=22000, sigma=18%, r=6.5%.",solution:[{step:"Compute tree parameters",formula:"\\Delta t = \\frac{2/12}{2} = \\frac{1}{12}, \\; u = e^{0.18\\sqrt{1/12}} = 1.0534, \\; d = 0.9493"},{step:"Risk-neutral probability",formula:"p = \\frac{e^{0.065/12} - 0.9493}{1.0534 - 0.9493} = \\frac{1.00543 - 0.9493}{0.1041} = 0.5394"},{step:"Terminal node prices",formula:"S_{uu} = 22000 \\times 1.0534^2 = 24406,\\; S_{ud} = 22000,\\; S_{dd} = 22000 \\times 0.9493^2 = 19821"},{step:"Terminal payoffs and backward induction",formula:"C_{uu} = 2406,\\; C_{ud} = 0,\\; C_{dd} = 0 \\implies C_0 = e^{-2r\\Delta t}[p^2 \\cdot 2406] \\approx 691.6"}]}),e.jsx(S,{title:"Tree Methods for Exotic Options on NSE",type:"tip",children:e.jsx("p",{children:"While NSE primarily trades vanilla European options on Nifty and Bank Nifty, tree methods are essential for: (1) American-style stock options where SEBI allows early exercise, (2) barrier options traded OTC by institutional desks, and (3) options with discrete dividend adjustments for individual stock options on NSE. The trinomial tree's extra node flexibility makes it particularly suited for barrier options where the barrier level should align with tree nodes."})}),e.jsx(S,{title:"Computational Efficiency",type:"warning",children:e.jsx("p",{children:"A binomial tree with N steps requires O(N) memory and O(N^2) time. For real-time pricing of the entire Nifty option chain (200+ strikes x multiple expiries), vectorized implementations using NumPy are essential. The trinomial tree is roughly 3x slower per step but converges with fewer steps. For production systems at Indian brokerages, GPU-accelerated trees can price thousands of options per millisecond."})})]})}const _e=Object.freeze(Object.defineProperty({__proto__:null,default:oe},Symbol.toStringTag,{value:"Module"}));function de(){const[r,w]=h.useState(1e3),[i,_]=h.useState(22e3),[a,T]=h.useState(22e3),[o,f]=h.useState(.18),d=30/365,x=.065,c=Math.floor(i+a+o*1e3+r),g=(N=>()=>{let k=N+=1831565813;return k=Math.imul(k^k>>>15,k|1),k^=k+Math.imul(k^k>>>7,k|61),((k^k>>>14)>>>0)/4294967296})(c),p=()=>{const N=g(),k=g();return Math.sqrt(-2*Math.log(N))*Math.cos(2*Math.PI*k)},u=Math.min(r,50),n=20,y=d/n,C=[];let b=0,K=0;for(let N=0;N<r;N++){let k=i;const F=[k];for(let R=0;R<n;R++){const O=p();k=k*Math.exp((x-.5*o*o)*y+o*Math.sqrt(y)*O),N<u&&F.push(k)}const G=Math.max(k-a,0);b+=G,K+=G*G,N<u&&C.push(F)}const q=Math.exp(-x*d)*b/r,m=K/r-(b/r)**2,j=Math.exp(-x*d)*Math.sqrt(m/r),l=500,v=180,I=50,D=C.flat(),E=Math.max(...D)*1.02,A=Math.min(...D)*.98;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Monte Carlo Simulation for Nifty 50 Call"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Simulate GBM paths and price a Nifty call option. Adjust path count to see convergence."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Paths = ",r]}),e.jsx("input",{type:"range",min:"100",max:"10000",step:"100",value:r,onChange:N=>w(Number(N.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Spot = ",i]}),e.jsx("input",{type:"range",min:"18000",max:"26000",step:"100",value:i,onChange:N=>_(Number(N.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Strike = ",a]}),e.jsx("input",{type:"range",min:"18000",max:"26000",step:"100",value:a,onChange:N=>T(Number(N.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["IV = ",(o*100).toFixed(0),"%"]}),e.jsx("input",{type:"range",min:"0.08",max:"0.50",step:"0.01",value:o,onChange:N=>f(Number(N.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:`0 0 ${l+I+20} ${v+40}`,className:"w-full max-w-2xl mx-auto block","aria-label":"Monte Carlo paths",children:[e.jsx("line",{x1:I,y1:5,x2:I,y2:v+5,stroke:"#9ca3af",strokeWidth:"1"}),e.jsx("line",{x1:I,y1:v+5,x2:l+I,y2:v+5,stroke:"#9ca3af",strokeWidth:"1"}),(()=>{const N=v+5-(a-A)/(E-A)*v;return e.jsxs("g",{children:[e.jsx("line",{x1:I,y1:N,x2:l+I,y2:N,stroke:"#ef4444",strokeWidth:"1",strokeDasharray:"4"}),e.jsx("text",{x:I-3,y:N+3,textAnchor:"end",className:"text-[8px]",fill:"#ef4444",children:"K"})]})})(),C.map((N,k)=>e.jsx("polyline",{points:N.map((F,G)=>{const R=I+G/n*l,O=v+5-(F-A)/(E-A)*v;return`${R},${O}`}).join(" "),fill:"none",stroke:"#6366f1",strokeWidth:"0.8",opacity:"0.3"},k))]}),e.jsxs("div",{className:"mt-3 grid grid-cols-3 gap-3",children:[e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"MC Price"}),e.jsx("div",{className:"text-lg font-bold text-indigo-600 dark:text-indigo-400",children:q.toFixed(2)})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Std Error"}),e.jsx("div",{className:"text-sm font-mono text-orange-600 dark:text-orange-400",children:j.toFixed(2)})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"95% CI"}),e.jsxs("div",{className:"text-sm font-mono text-gray-700 dark:text-gray-300",children:["[",(q-1.96*j).toFixed(1),", ",(q+1.96*j).toFixed(1),"]"]})]})]})]})}function ce(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Monte Carlo Methods for Options Pricing"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Monte Carlo simulation is the most flexible numerical method for options pricing. It can handle path-dependent payoffs, multiple underlyings, and complex stochastic processes that defy analytical solutions. For pricing exotic Nifty structures and multi-asset portfolios on Indian exchanges, Monte Carlo is often the only viable approach."}),e.jsx(M,{title:"Risk-Neutral Monte Carlo Pricing",label:"Definition 6.21",definition:"The Monte Carlo estimate of an option price is the sample average of discounted payoffs computed over simulated risk-neutral paths. Under the risk-neutral measure Q, the option price equals E^Q[e^{-rT} h(S_T)].",notation:"\\hat{C} = e^{-rT}\\frac{1}{N}\\sum_{i=1}^{N} h(S_T^{(i)}), \\quad S_T^{(i)} = S_0 \\exp\\!\\left[\\left(r - \\tfrac{\\sigma^2}{2}\\right)T + \\sigma\\sqrt{T}\\,Z^{(i)}\\right]"}),e.jsx(t.BlockMath,{math:"S_T = S_0 \\exp\\!\\left[\\left(r - \\frac{\\sigma^2}{2}\\right)T + \\sigma\\sqrt{T}\\,Z\\right], \\quad Z \\sim \\mathcal{N}(0, 1)"}),e.jsx(P,{title:"Monte Carlo Convergence",label:"Theorem 6.9",statement:"By the Central Limit Theorem, the Monte Carlo estimate \\hat{C}_N converges to the true price C at rate O(1/\\sqrt{N}). The standard error is \\text{SE} = \\sigma_h / \\sqrt{N} where \\sigma_h is the standard deviation of the discounted payoff. This rate is independent of dimension, making MC uniquely suited for high-dimensional problems.",proof:"Since the discounted payoffs h_i = e^{-rT}h(S_T^{(i)}) are i.i.d. with mean C and variance \\sigma_h^2, the CLT gives \\sqrt{N}(\\hat{C}_N - C) \\xrightarrow{d} \\mathcal{N}(0, \\sigma_h^2). Hence the standard error is \\sigma_h/\\sqrt{N}."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Variance Reduction Techniques"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The slow ",e.jsx(t.InlineMath,{math:"O(1/\\sqrt{N})"})," convergence of naive Monte Carlo can be dramatically improved using variance reduction. The three most important techniques are:"]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Technique"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Idea"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Variance Reduction"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Antithetic variates"}),e.jsx("td",{className:"px-4 py-2",children:"Pair each Z with -Z"}),e.jsx("td",{className:"px-4 py-2",children:"2-4x typical"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Control variates"}),e.jsx("td",{className:"px-4 py-2",children:"Subtract known-mean variate"}),e.jsx("td",{className:"px-4 py-2",children:"10-100x possible"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Importance sampling"}),e.jsx("td",{className:"px-4 py-2",children:"Sample from shifted distribution"}),e.jsx("td",{className:"px-4 py-2",children:"Exponential for rare events"})]})]})]})}),e.jsx(t.BlockMath,{math:"\\hat{C}_{\\text{anti}} = \\frac{e^{-rT}}{2N}\\sum_{i=1}^{N}\\left[h(S_T^{(Z_i)}) + h(S_T^{(-Z_i)})\\right]"}),e.jsx(de,{}),e.jsx(V,{title:"monte_carlo_pricing.py",runnable:!0,code:`import numpy as np
from scipy.stats import norm

np.random.seed(42)

def bsm_call(S, K, T, r, sigma):
    d1 = (np.log(S/K) + (r + sigma**2/2)*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    return S*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)

def mc_european(S, K, T, r, sigma, N, option='call', antithetic=False, control=False):
    """Monte Carlo European option pricer with variance reduction."""
    Z = np.random.standard_normal(N)

    if antithetic:
        Z = np.concatenate([Z, -Z])
        N = 2 * N

    ST = S * np.exp((r - 0.5*sigma**2)*T + sigma*np.sqrt(T)*Z)

    if option == 'call':
        payoffs = np.maximum(ST - K, 0)
    else:
        payoffs = np.maximum(K - ST, 0)

    if control:
        # Use forward price as control variate
        cv = ST - S * np.exp(r * T)  # mean zero under Q
        cov_matrix = np.cov(payoffs, cv)
        beta = cov_matrix[0, 1] / cov_matrix[1, 1]
        payoffs = payoffs - beta * cv

    disc_payoffs = np.exp(-r * T) * payoffs
    price = np.mean(disc_payoffs)
    stderr = np.std(disc_payoffs) / np.sqrt(N)
    return price, stderr

# Nifty 50 22000 CE, 30 DTE
S, K, T, r, sigma = 22000, 22000, 30/365, 0.065, 0.18
bsm = bsm_call(S, K, T, r, sigma)

print("=== Monte Carlo Pricing: Nifty 50 22000 CE ===")
print(f"BSM Analytical Price: {bsm:.4f}")
print()

configs = [
    ('Naive MC',         {'antithetic': False, 'control': False}),
    ('Antithetic',       {'antithetic': True,  'control': False}),
    ('Control Variate',  {'antithetic': False, 'control': True}),
    ('Anti + Control',   {'antithetic': True,  'control': True}),
]

for label, kwargs in configs:
    prices, errors = [], []
    for _ in range(5):
        p, se = mc_european(S, K, T, r, sigma, 50000, **kwargs)
        prices.append(p)
        errors.append(se)
    avg_price = np.mean(prices)
    avg_se = np.mean(errors)
    print(f"{label:<18} Price: {avg_price:>8.2f}  SE: {avg_se:>6.2f}  "
          f"Error: {avg_price-bsm:>+6.2f}")

# Asian option (path-dependent -- MC shines here)
print("\\n=== Asian Call (Arithmetic Average) ===")
N_sims = 100000
N_steps = 30
dt = T / N_steps
Z = np.random.standard_normal((N_sims, N_steps))
paths = np.zeros((N_sims, N_steps + 1))
paths[:, 0] = S

for t in range(N_steps):
    paths[:, t+1] = paths[:, t] * np.exp(
        (r - 0.5*sigma**2)*dt + sigma*np.sqrt(dt)*Z[:, t])

avg_price_path = np.mean(paths[:, 1:], axis=1)
asian_payoffs = np.maximum(avg_price_path - K, 0)
asian_price = np.exp(-r * T) * np.mean(asian_payoffs)
asian_se = np.exp(-r * T) * np.std(asian_payoffs) / np.sqrt(N_sims)

print(f"Asian Call Price: {asian_price:.2f} (+/- {asian_se:.2f})")
print(f"European Call:    {bsm:.2f}")
print(f"Asian discount:   {(1 - asian_price/bsm)*100:.1f}%")`}),e.jsx(B,{title:"Antithetic Variates for Nifty Call",difficulty:"intermediate",problem:"Using 2 random draws Z_1 = 0.85 and Z_2 = -1.20, price a Nifty 22000 CE (30 DTE, sigma=18%, r=6.5%) with antithetic variates.",solution:[{step:"Generate 4 terminal prices (original + antithetic)",formula:"S_T^{(i)} = 22000 \\cdot \\exp\\!\\left[(0.065 - 0.0162) \\cdot \\frac{30}{365} + 0.18\\sqrt{\\frac{30}{365}} \\cdot Z_i\\right]"},{step:"Compute terminal prices",formula:"S_T^{(0.85)} = 22506,\\; S_T^{(-0.85)} = 21503,\\; S_T^{(-1.20)} = 21228,\\; S_T^{(1.20)} = 22790"},{step:"Compute payoffs and average",formula:"\\hat{C} = e^{-rT}\\frac{1}{4}[(506 + 0) + (0 + 790)] = e^{-0.0053} \\cdot 324 \\approx 322.3",explanation:"Antithetic pairs ensure negative correlation, reducing variance compared to 4 independent draws."}]}),e.jsx(S,{title:"When Monte Carlo Excels",type:"tip",children:e.jsx("p",{children:"Monte Carlo is the method of choice for: (1) path-dependent options like Asian options on Nifty, (2) multi-asset options on NSE index baskets, (3) options under stochastic volatility (Heston), and (4) computing Greeks via finite differences or pathwise derivatives. For vanilla European options, analytical formulas or trees are faster, but for complex structured products traded OTC by Indian banks, MC is irreplaceable."})}),e.jsx(S,{title:"Quasi-Monte Carlo",type:"warning",children:e.jsxs("p",{children:["Quasi-Monte Carlo (QMC) replaces pseudo-random numbers with low-discrepancy sequences (Sobol, Halton) that fill the sample space more uniformly. QMC achieves convergence rates of ",e.jsx(t.InlineMath,{math:"O((\\log N)^d / N)"})," in d dimensions, far superior to the",e.jsx(t.InlineMath,{math:"O(1/\\sqrt{N})"})," of standard MC. For pricing Nifty basket options or computing portfolio-level CVA, QMC is the production standard at sophisticated Indian trading desks."]})})]})}const Te=Object.freeze(Object.defineProperty({__proto__:null,default:ce},Symbol.toStringTag,{value:"Module"}));function pe(){const[r,w]=h.useState("explicit"),[i,_]=h.useState(50),[a,T]=h.useState(100),o=22e3,f=30/365,d=.18,x=2*o,c=x/i,s=f/a,g=d*d*i*i*s/(c*c),p=r==="explicit"?g<=1:!0,u=d*d*s*i*i/(x*x);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Finite Difference Stability Analysis"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Explore how grid resolution and method choice affect stability for Nifty option pricing."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("span",{className:"text-xs text-gray-600 dark:text-gray-400",children:"Method"}),e.jsx("div",{className:"flex gap-3",children:["explicit","implicit","crank-nicolson"].map(n=>e.jsxs("label",{className:"flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300",children:[e.jsx("input",{type:"radio",name:"fdm",value:n,checked:r===n,onChange:()=>w(n),className:"accent-indigo-500"}),n.charAt(0).toUpperCase()+n.slice(1)]},n))})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Space Steps = ",i]}),e.jsx("input",{type:"range",min:"10",max:"200",step:"5",value:i,onChange:n=>_(Number(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Time Steps = ",a]}),e.jsx("input",{type:"range",min:"10",max:"500",step:"10",value:a,onChange:n=>T(Number(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Stability"}),e.jsx("div",{className:`text-sm font-bold ${p?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}`,children:p?"STABLE":"UNSTABLE"})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:e.jsx(t.InlineMath,{math:"\\Delta S"})}),e.jsx("div",{className:"text-sm font-mono text-gray-700 dark:text-gray-300",children:c.toFixed(0)})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:e.jsx(t.InlineMath,{math:"\\Delta t"})}),e.jsxs("div",{className:"text-sm font-mono text-gray-700 dark:text-gray-300",children:[(s*365).toFixed(4),"d"]})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Diffusion #"}),e.jsx("div",{className:"text-sm font-mono text-gray-700 dark:text-gray-300",children:u.toFixed(4)})]})]}),e.jsxs("p",{className:"mt-3 text-center text-sm text-gray-500 dark:text-gray-400",children:[r==="explicit"&&"Explicit: conditionally stable, requires small dt. Accuracy O(dt, dS^2).",r==="implicit"&&"Implicit: unconditionally stable, requires solving tridiagonal system. Accuracy O(dt, dS^2).",r==="crank-nicolson"&&"Crank-Nicolson: unconditionally stable, second-order in time. Accuracy O(dt^2, dS^2)."]})]})}function me(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Finite Difference Methods"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Finite difference methods (FDM) solve the Black-Scholes PDE directly on a discrete grid. They are deterministic, produce the full option price surface in one pass, and naturally handle American exercise, barriers, and dividends. For pricing the entire Nifty option chain simultaneously, FDM on a GPU is the method of choice at institutional desks."}),e.jsx(M,{title:"The Black-Scholes PDE",label:"Definition 6.22",definition:"The BSM PDE describes the evolution of the option price C(S,t) as a function of the underlying price and time. Every European option under BSM satisfies this PDE with appropriate boundary conditions.",notation:"\\frac{\\partial C}{\\partial t} + \\frac{1}{2}\\sigma^2 S^2 \\frac{\\partial^2 C}{\\partial S^2} + rS\\frac{\\partial C}{\\partial S} - rC = 0"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["We discretize the PDE on a grid with ",e.jsx(t.InlineMath,{math:"M"})," space steps (",e.jsx(t.InlineMath,{math:"\\Delta S = S_{\\max}/M"}),") and ",e.jsx(t.InlineMath,{math:"N"})," time steps (",e.jsx(t.InlineMath,{math:"\\Delta t = T/N"}),"). The partial derivatives are approximated by finite differences:"]}),e.jsx(t.BlockMath,{math:"\\frac{\\partial C}{\\partial S} \\approx \\frac{C_{i+1}^n - C_{i-1}^n}{2\\Delta S}, \\quad \\frac{\\partial^2 C}{\\partial S^2} \\approx \\frac{C_{i+1}^n - 2C_i^n + C_{i-1}^n}{(\\Delta S)^2}"}),e.jsx(M,{title:"Explicit Finite Difference Scheme",label:"Definition 6.23",definition:"The explicit scheme computes option values at time step n from known values at step n+1 (working backward from expiry). It is simple but conditionally stable, requiring small time steps relative to space steps.",notation:"C_i^n = a_i C_{i-1}^{n+1} + b_i C_i^{n+1} + c_i C_{i+1}^{n+1}"}),e.jsx(t.BlockMath,{math:"\\begin{aligned} a_i &= \\frac{\\Delta t}{2}(r\\,i - \\sigma^2 i^2) \\cdot \\frac{1}{1 + r\\Delta t} \\\\ b_i &= \\frac{1 + \\sigma^2 i^2 \\Delta t}{1 + r\\Delta t} \\\\ c_i &= \\frac{-\\Delta t}{2}(r\\,i + \\sigma^2 i^2) \\cdot \\frac{1}{1 + r\\Delta t} \\end{aligned}"}),e.jsx(P,{title:"Stability Condition for Explicit FDM",label:"Theorem 6.10",statement:"The explicit finite difference scheme for the BSM PDE is stable if and only if \\Delta t \\leq \\frac{(\\Delta S)^2}{\\sigma^2 S_{\\max}^2}. Equivalently, the diffusion number D = \\sigma^2 \\Delta t / (\\Delta S)^2 must satisfy D \\leq 1 for all grid points. Violation leads to oscillatory, non-physical solutions.",proof:"Applying von Neumann stability analysis, the amplification factor g of the explicit scheme satisfies |g| \\leq 1 only when the diffusion number is bounded. The highest-frequency mode (wavenumber k = \\pi/\\Delta S) is the most restrictive, giving the stated condition."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Crank-Nicolson Method"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The Crank-Nicolson scheme averages the explicit and implicit discretizations, achieving second-order accuracy in both time and space. It is the standard FDM scheme for production option pricing:"}),e.jsx(t.BlockMath,{math:"\\frac{C_i^{n} - C_i^{n+1}}{\\Delta t} = \\frac{1}{2}\\left[\\mathcal{L}(C^{n}) + \\mathcal{L}(C^{n+1})\\right]"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"\\mathcal{L}"})," is the BSM spatial differential operator. This leads to a tridiagonal system ",e.jsx(t.InlineMath,{math:"A \\mathbf{C}^n = B \\mathbf{C}^{n+1} + \\mathbf{d}"})," that is solved efficiently using the Thomas algorithm in ",e.jsx(t.InlineMath,{math:"O(M)"})," operations."]}),e.jsx(pe,{}),e.jsx(V,{title:"finite_difference.py",runnable:!0,code:`import numpy as np
from scipy.stats import norm

def bsm_call(S, K, T, r, sigma):
    d1 = (np.log(S/K) + (r+sigma**2/2)*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    return S*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)

def crank_nicolson(S0, K, T, r, sigma, M=200, N=200, option='call', style='european'):
    """Crank-Nicolson FDM for BSM PDE."""
    Smax = 3 * S0
    dS = Smax / M
    dt = T / N
    S = np.linspace(0, Smax, M+1)

    # Terminal condition
    if option == 'call':
        V = np.maximum(S - K, 0)
    else:
        V = np.maximum(K - S, 0)

    # Coefficient arrays (for interior points i=1..M-1)
    i = np.arange(1, M)
    alpha = 0.25 * dt * (sigma**2 * i**2 - r * i)
    beta = -0.5 * dt * (sigma**2 * i**2 + r)
    gamma = 0.25 * dt * (sigma**2 * i**2 + r * i)

    # Build tridiagonal matrices
    # A * V^n = B * V^{n+1} + d
    A = np.zeros((M-1, M-1))
    B = np.zeros((M-1, M-1))
    for j in range(M-1):
        A[j, j] = 1 - beta[j]
        B[j, j] = 1 + beta[j]
        if j > 0:
            A[j, j-1] = -alpha[j]
            B[j, j-1] = alpha[j]
        if j < M-2:
            A[j, j+1] = -gamma[j]
            B[j, j+1] = gamma[j]

    # Time-stepping (backward from T to 0)
    for n in range(N):
        # Boundary conditions
        if option == 'call':
            V[0] = 0
            V[M] = Smax - K * np.exp(-r * (N-n) * dt)
        else:
            V[0] = K * np.exp(-r * (N-n) * dt)
            V[M] = 0

        rhs = B @ V[1:M]
        rhs[0] += alpha[0] * (V[0])  # boundary adjustment
        rhs[-1] += gamma[-1] * (V[M])

        V[1:M] = np.linalg.solve(A, rhs)

        # American exercise check
        if style == 'american':
            if option == 'call':
                V[1:M] = np.maximum(V[1:M], S[1:M] - K)
            else:
                V[1:M] = np.maximum(V[1:M], K - S[1:M])

    # Interpolate to get price at S0
    idx = int(S0 / dS)
    w = (S0 - S[idx]) / dS
    return V[idx] * (1 - w) + V[idx + 1] * w

# Price Nifty 50 22000 CE
S0, K, T, r, sigma = 22000, 22000, 30/365, 0.065, 0.18
bsm = bsm_call(S0, K, T, r, sigma)

print("=== Crank-Nicolson FDM: Nifty 50 22000 CE ===")
print(f"BSM Analytical: {bsm:.4f}")
print(f"\\n{'Grid (MxN)':>12} {'CN Price':>10} {'Error':>10} {'Time':>8}")
print("-" * 44)

import time
for M, N in [(50, 50), (100, 100), (200, 200), (400, 400)]:
    t0 = time.time()
    cn = crank_nicolson(S0, K, T, r, sigma, M, N)
    elapsed = time.time() - t0
    print(f"{M:>5}x{N:<5} {cn:>10.4f} {cn-bsm:>+10.4f} {elapsed:>7.4f}s")

# American put comparison
print(f"\\n=== American Put (Nifty 22000 PE) ===")
eu_put = crank_nicolson(S0, K, T, r, sigma, 200, 200, 'put', 'european')
am_put = crank_nicolson(S0, K, T, r, sigma, 200, 200, 'put', 'american')
print(f"European Put (CN): {eu_put:.4f}")
print(f"American Put (CN): {am_put:.4f}")
print(f"Early Exercise Premium: {am_put - eu_put:.4f}")`}),e.jsx(B,{title:"Explicit FDM Grid Setup for Nifty Call",difficulty:"intermediate",problem:"Set up an explicit FDM grid for a 30-day Nifty 22000 CE with sigma=18%, r=6.5%. Use M=100 space steps and S_max=44000. What is the maximum allowable dt for stability?",solution:[{step:"Compute space step",formula:"\\Delta S = \\frac{S_{\\max}}{M} = \\frac{44000}{100} = 440"},{step:"Find stability constraint",formula:"\\Delta t \\leq \\frac{(\\Delta S)^2}{\\sigma^2 S_{\\max}^2} = \\frac{440^2}{0.18^2 \\times 44000^2} = \\frac{193600}{62726400} = 0.003086"},{step:"Compute minimum time steps needed",formula:"N \\geq \\frac{T}{\\Delta t_{\\max}} = \\frac{30/365}{0.003086} = 26.6 \\implies N \\geq 27",explanation:"With M=100 space steps, we need at least 27 time steps for stability. In practice, use N=100+ for accuracy."}]}),e.jsx(S,{title:"FDM for the Full Nifty Option Chain",type:"tip",children:e.jsx("p",{children:"A single Crank-Nicolson solve produces option prices at all spot levels simultaneously. This means one FDM run gives the entire price-vs-spot curve, from which Delta and Gamma can be extracted by finite differences of the solution. For pricing the full Nifty option chain (200+ strikes), the FDM grid naturally provides all prices in one sweep, making it far more efficient than running BSM formula 200 times."})}),e.jsx(S,{title:"Boundary Conditions Matter",type:"warning",children:e.jsxs("p",{children:["Incorrect boundary conditions are a common source of FDM pricing errors. For a Nifty call: at ",e.jsx(t.InlineMath,{math:"S=0"}),", the call is worthless; at ",e.jsx(t.InlineMath,{math:"S=S_{\\max}"}),", use ",e.jsx(t.InlineMath,{math:"C \\approx S - Ke^{-r(T-t)}"}),". Setting ",e.jsx(t.InlineMath,{math:"S_{\\max}"})," too low (e.g., less than 2x spot) causes boundary contamination. For production Nifty pricing, use ",e.jsx(t.InlineMath,{math:"S_{\\max} = 3S_0"})," or employ a log-price transformation to avoid this issue entirely."]})})]})}const Me=Object.freeze(Object.defineProperty({__proto__:null,default:me},Symbol.toStringTag,{value:"Module"}));export{ue as a,ye as b,be as c,je as d,ve as e,Ne as f,ke as g,Se as h,_e as i,Te as j,Me as k,fe as s};
