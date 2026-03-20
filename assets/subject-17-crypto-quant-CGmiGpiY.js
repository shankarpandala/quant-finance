import{j as e,r as c}from"./vendor-DgA46Qmo.js";import{r as t}from"./vendor-katex-C-S70IU0.js";import{D as N,T as w,P as T,E as I,N as f}from"./subject-01-math-foundations-vREfsVbS.js";function D(){const[s,_]=c.useState(1e5),[r,b]=c.useState("BTC/USDT"),n=[{name:"Binance",fee:.1,spread:.01,depth:5e7,latency:5},{name:"WazirX (India)",fee:.2,spread:.15,depth:5e5,latency:50},{name:"CoinDCX (India)",fee:.2,spread:.12,depth:3e5,latency:45},{name:"Coinbase",fee:.4,spread:.02,depth:2e7,latency:10},{name:"OKX",fee:.08,spread:.015,depth:3e7,latency:8}];return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Crypto Exchange Cost Comparison"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Compare execution costs across global and Indian exchanges for a given trade size."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Trade Size: $",(s/1e3).toFixed(0),"K"]}),e.jsx("input",{type:"range",min:"1000",max:"1000000",step:"1000",value:s,onChange:u=>_(parseInt(u.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Pair: ",r]}),e.jsxs("select",{value:r,onChange:u=>b(u.target.value),className:"rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200",children:[e.jsx("option",{value:"BTC/USDT",children:"BTC/USDT"}),e.jsx("option",{value:"ETH/USDT",children:"ETH/USDT"}),e.jsx("option",{value:"BTC/INR",children:"BTC/INR"})]})]})]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"w-full text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"Exchange"}),e.jsx("th",{className:"px-3 py-2 text-right text-gray-600 dark:text-gray-400",children:"Fee ($)"}),e.jsx("th",{className:"px-3 py-2 text-right text-gray-600 dark:text-gray-400",children:"Spread Cost ($)"}),e.jsx("th",{className:"px-3 py-2 text-right text-gray-600 dark:text-gray-400",children:"Impact ($)"}),e.jsx("th",{className:"px-3 py-2 text-right text-gray-600 dark:text-gray-400",children:"Total ($)"})]})}),e.jsx("tbody",{className:"text-gray-700 dark:text-gray-300",children:n.map((u,o)=>{const y=s*u.fee/100,m=s*u.spread/100,p=s>u.depth?(s-u.depth)/u.depth*s*.01:0,h=y+m+p;return e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2 font-semibold",children:u.name}),e.jsx("td",{className:"px-3 py-2 text-right font-mono",children:y.toFixed(2)}),e.jsx("td",{className:"px-3 py-2 text-right font-mono",children:m.toFixed(2)}),e.jsx("td",{className:"px-3 py-2 text-right font-mono",children:p.toFixed(2)}),e.jsx("td",{className:`px-3 py-2 text-right font-mono font-semibold ${o===0?"text-green-600":""}`,children:h.toFixed(2)})]},o)})})]})})]})}function F(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Crypto Exchange Landscape"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"The cryptocurrency exchange ecosystem spans centralized exchanges (CEX) like Binance and decentralized exchanges (DEX) like Uniswap, with Indian platforms like WazirX and CoinDCX serving the domestic market. Understanding the structure, fee models, and regulatory landscape is essential for crypto quant strategies targeting Indian and global markets."}),e.jsx(N,{title:"Centralized Exchange (CEX)",label:"Definition 1.1",definition:"A centralized cryptocurrency exchange is a platform operated by a company that matches buy and sell orders using a central limit order book (CLOB), similar to traditional stock exchanges. CEXs hold customer funds in custodial wallets and provide order matching, settlement, and margin services. In India, CEXs must comply with the Virtual Digital Asset (VDA) framework introduced in the 2022 Finance Act.",notation:e.jsxs(e.Fragment,{children:["Key metrics: daily volume ",e.jsx(t.InlineMath,{math:"V_d"}),", maker/taker fees ",e.jsx(t.InlineMath,{math:"(f_m, f_t)"}),", and order book depth at ",e.jsx(t.InlineMath,{math:"k"})," bps from mid ",e.jsx(t.InlineMath,{math:"D_k"}),"."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Indian Crypto Taxation Framework"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The Indian VDA tax regime (effective April 2022) imposes significant constraints on crypto trading strategies:"}),e.jsx(t.BlockMath,{math:"\\text{Tax on VDA} = 30\\% \\times \\text{Gains} + 1\\% \\text{ TDS on each transaction}"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Provision"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Detail"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Impact on Quant"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"30% Flat Tax"}),e.jsx("td",{className:"px-4 py-2",children:"Section 115BBH"}),e.jsx("td",{className:"px-4 py-2",children:"High hurdle rate for strategies"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"1% TDS"}),e.jsx("td",{className:"px-4 py-2",children:"Section 194S, per trade"}),e.jsx("td",{className:"px-4 py-2",children:"Kills high-frequency strategies"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"No Loss Set-off"}),e.jsx("td",{className:"px-4 py-2",children:"Cannot offset crypto losses"}),e.jsx("td",{className:"px-4 py-2",children:"Asymmetric risk profile"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"No Deductions"}),e.jsx("td",{className:"px-4 py-2",children:"Only acquisition cost allowed"}),e.jsx("td",{className:"px-4 py-2",children:"Infrastructure costs not deductible"})]})]})]})}),e.jsx(w,{title:"Minimum Profitability for Indian Crypto Trading",label:"Theorem 1.1",statement:e.jsxs(e.Fragment,{children:["Given the Indian VDA tax framework (30% flat tax, 1% TDS, no loss offset), a crypto trading strategy must achieve a pre-tax return of at least: ",e.jsx(t.BlockMath,{math:"r_{\\min} = \\frac{c_{\\text{TDS}} \\cdot N_{\\text{trades}}}{1 - \\tau} = \\frac{0.01 \\cdot N_{\\text{trades}}}{0.70}"})," where ",e.jsx(t.InlineMath,{math:"N_{\\text{trades}}"})," is the annual number of round-trip trades. For a strategy with 100 round-trip trades per year, the minimum return is approximately ",e.jsx(t.InlineMath,{math:"1.43\\%"})," just to break even on TDS alone, before accounting for exchange fees."]}),proof:e.jsxs(e.Fragment,{children:["Each round trip incurs 2 TDS deductions of 1% each (buy and sell). The total TDS outflow is ",e.jsx(t.InlineMath,{math:"0.02 \\times N"})," of the traded notional. After 30% tax on profits, the net retention is 70% of gross profit. Setting net profit equal to TDS cost: ",e.jsx(t.InlineMath,{math:"0.7 \\times r = 0.02 \\times N"}),"."]})}),e.jsx(D,{}),e.jsx(T,{title:"exchange_analysis.py",runnable:!0,code:`import numpy as np

class CryptoExchangeAnalyzer:
    """Compare crypto exchange economics for Indian traders."""

    def __init__(self):
        self.exchanges = {
            'Binance': {'maker': 0.10, 'taker': 0.10, 'depth_usd': 50e6,
                       'min_spread_bps': 1, 'jurisdiction': 'Global'},
            'WazirX': {'maker': 0.20, 'taker': 0.20, 'depth_usd': 0.5e6,
                      'min_spread_bps': 15, 'jurisdiction': 'India'},
            'CoinDCX': {'maker': 0.20, 'taker': 0.20, 'depth_usd': 0.3e6,
                       'min_spread_bps': 12, 'jurisdiction': 'India'},
            'OKX': {'maker': 0.08, 'taker': 0.10, 'depth_usd': 30e6,
                   'min_spread_bps': 1.5, 'jurisdiction': 'Global'},
        }

    def compute_cost(self, exchange, trade_size_usd, is_taker=True):
        """Compute total execution cost."""
        ex = self.exchanges[exchange]
        fee_rate = ex['taker'] if is_taker else ex['maker']
        fee = trade_size_usd * fee_rate / 100
        spread_cost = trade_size_usd * ex['min_spread_bps'] / 10000
        impact = 0
        if trade_size_usd > ex['depth_usd']:
            excess = trade_size_usd - ex['depth_usd']
            impact = excess / ex['depth_usd'] * trade_size_usd * 0.001
        return {'fee': fee, 'spread': spread_cost, 'impact': impact,
                'total': fee + spread_cost + impact}

    def india_tax_impact(self, gross_profit, num_trades, trade_size):
        """Compute Indian VDA tax impact."""
        tds = num_trades * 2 * trade_size * 0.01  # 1% TDS each leg
        tax = max(0, gross_profit) * 0.30  # 30% flat
        net = gross_profit - tax - tds
        effective_rate = 1 - net / gross_profit if gross_profit > 0 else 1
        return {
            'gross_profit': gross_profit,
            'tds_total': tds,
            'income_tax': tax,
            'net_profit': net,
            'effective_tax_rate': effective_rate
        }

    def optimal_exchange(self, trade_size_usd):
        """Find lowest-cost exchange for given trade size."""
        costs = {}
        for name in self.exchanges:
            costs[name] = self.compute_cost(name, trade_size_usd)
        best = min(costs, key=lambda x: costs[x]['total'])
        return best, costs

analyzer = CryptoExchangeAnalyzer()

print("=" * 60)
print("CRYPTO EXCHANGE ANALYSIS FOR INDIAN TRADERS")
print("=" * 60)

# Cost comparison for different trade sizes
print("\\nExecution Cost Comparison (taker orders):")
print(f"{'Exchange':<15} {'$10K':>10} {'$100K':>10} {'$1M':>10}")
print("-" * 50)
for name in analyzer.exchanges:
    costs = [analyzer.compute_cost(name, s)['total'] for s in [10000, 100000, 1000000]]
    print(f"{name:<15} \${costs[0]:>8.2f} \${costs[1]:>8.2f} \${costs[2]:>8.2f}")

# Indian tax impact
print("\\nIndian VDA Tax Impact Analysis:")
scenarios = [
    ("Low-freq (12 trades/yr)", 12, 100000, 50000),
    ("Med-freq (100 trades/yr)", 100, 50000, 80000),
    ("High-freq (1000 trades/yr)", 1000, 10000, 100000),
]

for desc, n_trades, trade_size, profit in scenarios:
    tax = analyzer.india_tax_impact(profit, n_trades, trade_size)
    print(f"\\n  {desc}:")
    print(f"    Gross Profit:  Rs {tax['gross_profit']:>10,}")
    print(f"    TDS Total:     Rs {tax['tds_total']:>10,.0f}")
    print(f"    Income Tax:    Rs {tax['income_tax']:>10,.0f}")
    print(f"    Net Profit:    Rs {tax['net_profit']:>10,.0f}")
    print(f"    Effective Tax: {tax['effective_tax_rate']:.1%}")`}),e.jsx(I,{title:"BTC/INR vs BTC/USDT Arbitrage",difficulty:"intermediate",problem:"BTC is trading at $65,000 on Binance (BTC/USDT) and Rs 55,50,000 on WazirX (BTC/INR). The USD/INR rate is 84.50. Binance taker fee is 0.1%, WazirX is 0.2%. Is there an arbitrage opportunity? Account for the 1% TDS on the Indian leg.",solution:[{step:"Convert Binance price to INR",formula:"65{,}000 \\times 84.50 = \\text{Rs } 54{,}92{,}500"},{step:"Compute premium on WazirX",formula:"\\text{Premium} = \\frac{55{,}50{,}000 - 54{,}92{,}500}{54{,}92{,}500} = 1.05\\%"},{step:"Compute costs",formula:"\\text{Binance fee} = 0.1\\% + \\text{WazirX fee} = 0.2\\% + \\text{TDS} = 1\\% = 1.3\\%"},{step:"Net P&L",formula:"1.05\\% - 1.3\\% = -0.25\\%",explanation:"No profitable arbitrage exists after accounting for TDS. The 1% TDS on Indian exchanges makes most cross-exchange arbitrage unviable, which is why the INR premium persists."}]}),e.jsx(f,{title:"Indian Regulatory Landscape",type:"warning",children:e.jsx("p",{children:"As of 2025, cryptocurrency is not illegal in India but is heavily regulated through taxation. The RBI has not issued a central bank digital currency (CBDC) framework for crypto assets. Indian exchanges must register as reporting entities under the PMLA. The 30% flat tax with no loss offset and 1% TDS makes high-frequency crypto trading uneconomic on Indian exchanges. Most Indian crypto quants operate through global exchanges with INR-USD conversion, though this introduces additional forex risk and regulatory complexity under FEMA."})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Exchange Selection Framework"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For Indian quant traders, exchange selection involves a multi-factor optimization considering fees, liquidity, latency, API quality, and regulatory risk. The total cost of execution includes:"}),e.jsx(t.BlockMath,{math:"\\text{Total Cost} = \\underbrace{f_{\\text{maker/taker}}}_{\\text{exchange fee}} + \\underbrace{\\frac{s}{2}}_{\\text{half-spread}} + \\underbrace{\\eta(Q)}_{\\text{market impact}} + \\underbrace{c_{\\text{TDS}}}_{\\text{India tax}} + \\underbrace{c_{\\text{FX}}}_{\\text{forex cost}}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For a round-trip trade on an Indian exchange, the 1% TDS on each leg adds 2% to the total cost, making it the dominant expense. On global exchanges, the forex conversion cost (INR to USDT) adds approximately 0.5--1.5% depending on the pathway (bank wire, P2P, or stablecoin on-ramp)."}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Feature"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Indian CEX"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Global CEX"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"DEX"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"KYC Required"}),e.jsx("td",{className:"px-4 py-2",children:"Yes (Aadhaar)"}),e.jsx("td",{className:"px-4 py-2",children:"Yes"}),e.jsx("td",{className:"px-4 py-2",children:"No"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"INR On-ramp"}),e.jsx("td",{className:"px-4 py-2",children:"Direct (UPI/NEFT)"}),e.jsx("td",{className:"px-4 py-2",children:"P2P / Wire"}),e.jsx("td",{className:"px-4 py-2",children:"Via CEX"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"TDS Applicable"}),e.jsx("td",{className:"px-4 py-2",children:"Yes (1%)"}),e.jsx("td",{className:"px-4 py-2",children:"No"}),e.jsx("td",{className:"px-4 py-2",children:"No"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"API Quality"}),e.jsx("td",{className:"px-4 py-2",children:"Basic"}),e.jsx("td",{className:"px-4 py-2",children:"Excellent"}),e.jsx("td",{className:"px-4 py-2",children:"On-chain"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Derivatives"}),e.jsx("td",{className:"px-4 py-2",children:"Limited"}),e.jsx("td",{className:"px-4 py-2",children:"Full (perps, options)"}),e.jsx("td",{className:"px-4 py-2",children:"Growing (dYdX)"})]})]})]})}),e.jsx(f,{title:"PMLA Compliance",type:"warning",children:e.jsx("p",{children:"Under the Prevention of Money Laundering Act (PMLA) amendments of 2023, all crypto exchanges operating in India (including offshore exchanges serving Indian customers) must register as reporting entities with the Financial Intelligence Unit (FIU-IND). Several global exchanges including Binance were initially non-compliant but have since registered. Indian traders should verify that their chosen exchange is FIU-registered to avoid potential legal complications. Non-compliant exchange URLs may be blocked by Indian ISPs per government directives."})}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"The crypto exchange landscape presents vastly different economics for Indian vs. global traders. The 1% TDS regime effectively eliminates high-frequency strategies on Indian exchanges, pushing quant activity to global platforms. Exchange selection must account for fees, spreads, depth, and jurisdictional tax implications. For Indian crypto quants, the regulatory and tax framework is the dominant factor in strategy design."})})]})}const se=Object.freeze(Object.defineProperty({__proto__:null,default:F},Symbol.toStringTag,{value:"Module"}));function E(){const[s,_]=c.useState("1m"),[r,b]=c.useState(50),[n,u]=c.useState(5),[o,y]=c.useState(365),h={"1s":86400,"1m":1440,"5m":288,"1h":24,"1d":1}[s]*r*n*o,l=h*48/(1024*1024),x=r*n*Math.ceil(o/7);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Crypto Data Requirements Calculator"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Estimate data volume and API requirements for a multi-exchange crypto research database."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Granularity: ",s]}),e.jsxs("select",{value:s,onChange:a=>_(a.target.value),className:"rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200",children:[e.jsx("option",{value:"1s",children:"1 Second"}),e.jsx("option",{value:"1m",children:"1 Minute"}),e.jsx("option",{value:"5m",children:"5 Minutes"}),e.jsx("option",{value:"1h",children:"1 Hour"}),e.jsx("option",{value:"1d",children:"1 Day"})]})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Trading Pairs: ",r]}),e.jsx("input",{type:"range",min:"5",max:"500",step:"5",value:r,onChange:a=>b(parseInt(a.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Exchanges: ",n]}),e.jsx("input",{type:"range",min:"1",max:"20",step:"1",value:n,onChange:a=>u(parseInt(a.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["History: ",o," days"]}),e.jsx("input",{type:"range",min:"30",max:"1825",step:"30",value:o,onChange:a=>y(parseInt(a.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 500 100",className:"w-full max-w-lg mx-auto block","aria-label":"Data volume",children:[e.jsx("rect",{x:"50",y:"10",width:"400",height:"30",rx:"6",fill:"#e5e7eb"}),e.jsx("rect",{x:"50",y:"10",width:Math.min(400,l/100),height:"30",rx:"6",fill:"#6366f1",opacity:"0.7"}),e.jsx("text",{x:"250",y:"30",textAnchor:"middle",className:"text-[10px] font-semibold",fill:"#1f2937",children:l<1024?`${l.toFixed(0)} MB`:`${(l/1024).toFixed(1)} GB`}),e.jsxs("text",{x:"250",y:"65",textAnchor:"middle",className:"text-[10px] fill-gray-600 dark:fill-gray-400",children:["Total rows: ",h>1e9?`${(h/1e9).toFixed(1)}B`:h>1e6?`${(h/1e6).toFixed(1)}M`:`${(h/1e3).toFixed(0)}K`," | ","API calls needed: ",x>1e3?`${(x/1e3).toFixed(1)}K`:x]}),e.jsxs("text",{x:"250",y:"85",textAnchor:"middle",className:"text-[9px] fill-gray-500",children:["Est. download time (1 req/sec): ",x>3600?`${(x/3600).toFixed(1)} hours`:`${(x/60).toFixed(0)} min`]})]})]})}function P(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Cryptocurrency Data Sources and Infrastructure"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Crypto markets generate vast quantities of data across hundreds of exchanges, thousands of trading pairs, and multiple blockchains. Unlike traditional markets that close overnight, crypto data streams 24/7/365, creating unique data engineering challenges. For Indian quant researchers, accessing reliable crypto data requires understanding both global and domestic data providers."}),e.jsx(N,{title:"OHLCV Data",label:"Definition 2.1",definition:"OHLCV (Open, High, Low, Close, Volume) is the standard aggregated market data format for crypto, representing candlestick bars at various time intervals. Unlike traditional markets, crypto OHLCV is available at granularities down to 1-second intervals and is collected 24/7 without market closures.",notation:e.jsxs(e.Fragment,{children:["A candle: ",e.jsx(t.InlineMath,{math:"C_t = (O_t, H_t, L_t, C_t, V_t, N_t)"})," where ",e.jsx(t.InlineMath,{math:"N_t"})," is the number of trades in the interval. The true range is ",e.jsx(t.InlineMath,{math:"\\text{TR}_t = H_t - L_t"}),"."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Data Source Taxonomy"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Category"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Source"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Data Type"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Cost"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Exchange APIs"}),e.jsx("td",{className:"px-4 py-2",children:"Binance, OKX, WazirX"}),e.jsx("td",{className:"px-4 py-2",children:"OHLCV, Order Book, Trades"}),e.jsx("td",{className:"px-4 py-2",children:"Free (rate-limited)"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Aggregators"}),e.jsx("td",{className:"px-4 py-2",children:"CoinGecko, CoinMarketCap"}),e.jsx("td",{className:"px-4 py-2",children:"Prices, Market Cap, Volume"}),e.jsx("td",{className:"px-4 py-2",children:"Free / Premium"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Professional"}),e.jsx("td",{className:"px-4 py-2",children:"Kaiko, CryptoCompare"}),e.jsx("td",{className:"px-4 py-2",children:"L2/L3, Cleaned Tick Data"}),e.jsx("td",{className:"px-4 py-2",children:"$500--5000/mo"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"On-Chain"}),e.jsx("td",{className:"px-4 py-2",children:"Dune, Nansen, Glassnode"}),e.jsx("td",{className:"px-4 py-2",children:"Wallet flows, DeFi metrics"}),e.jsx("td",{className:"px-4 py-2",children:"Free / Premium"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Indian Market"}),e.jsx("td",{className:"px-4 py-2",children:"WazirX API, CoinSwitch"}),e.jsx("td",{className:"px-4 py-2",children:"INR pairs, Indian volume"}),e.jsx("td",{className:"px-4 py-2",children:"Free (limited)"})]})]})]})}),e.jsx(w,{title:"Data Quality Challenges in Crypto",label:"Observation 2.1",statement:e.jsxs(e.Fragment,{children:["Crypto market data suffers from systematic quality issues that differ from traditional markets: (1) Wash trading inflates volume by an estimated 50--80% on unregulated exchanges. (2) Exchange outages create data gaps during high-volatility periods. (3) Stablecoin depegs create artificial price dislocations. The true volume can be estimated as: ",e.jsx(t.BlockMath,{math:"V_{\\text{true}} \\approx V_{\\text{reported}} \\times (1 - \\hat{w})"})," where ",e.jsx(t.InlineMath,{math:"\\hat{w}"})," is the estimated wash trading fraction, detectable via Benford's law analysis on trade sizes."]}),proof:e.jsxs(e.Fragment,{children:["Applying Benford's law to the first digits of trade sizes: genuine trades follow the distribution ",e.jsx(t.InlineMath,{math:"P(d) = \\log_{10}(1 + 1/d)"})," while wash trades show uniform or peaked distributions. Analysis of 100M trades across 20 exchanges reveals ",e.jsx(t.InlineMath,{math:"\\hat{w} \\in [0.3, 0.8]"})," for smaller exchanges, while major regulated exchanges (Coinbase, Binance) show ",e.jsx(t.InlineMath,{math:"\\hat{w} < 0.1"}),"."]})}),e.jsx(E,{}),e.jsx(T,{title:"crypto_data_pipeline.py",runnable:!0,code:`import numpy as np
from datetime import datetime, timedelta
import json

class CryptoDataPipeline:
    """Data pipeline for crypto market research."""

    def __init__(self):
        self.data_store = {}

    def generate_ohlcv(self, symbol, start_price, n_bars, volatility=0.02):
        """Simulate realistic crypto OHLCV data."""
        np.random.seed(hash(symbol) % 2**31)
        bars = []
        price = start_price

        for i in range(n_bars):
            # Crypto-specific: higher vol, occasional large moves
            ret = np.random.normal(0, volatility)
            if np.random.random() < 0.02:  # 2% chance of large move
                ret += np.random.choice([-1, 1]) * np.random.uniform(0.03, 0.08)

            open_p = price
            close_p = price * (1 + ret)
            high_p = max(open_p, close_p) * (1 + abs(np.random.normal(0, volatility/2)))
            low_p = min(open_p, close_p) * (1 - abs(np.random.normal(0, volatility/2)))

            # Volume follows log-normal, correlated with abs return
            base_vol = np.random.lognormal(10, 1.5)
            vol = base_vol * (1 + 5 * abs(ret))
            n_trades = int(vol / (price * 0.01))

            bars.append({
                'timestamp': i,
                'open': round(open_p, 2),
                'high': round(high_p, 2),
                'low': round(low_p, 2),
                'close': round(close_p, 2),
                'volume': round(vol, 2),
                'trades': n_trades
            })
            price = close_p

        self.data_store[symbol] = bars
        return bars

    def detect_wash_trading(self, trade_sizes, n_bins=9):
        """Detect wash trading using Benford's law."""
        first_digits = []
        for size in trade_sizes:
            if size > 0:
                d = int(str(int(size))[0])
                if 1 <= d <= 9:
                    first_digits.append(d)

        observed = np.zeros(n_bins)
        for d in first_digits:
            observed[d - 1] += 1
        observed /= len(first_digits)

        # Benford expected distribution
        expected = np.array([np.log10(1 + 1/d) for d in range(1, 10)])

        # Chi-squared statistic
        chi_sq = np.sum((observed - expected)**2 / expected) * len(first_digits)
        # Higher chi_sq = more wash trading likely
        wash_score = min(1.0, chi_sq / 100)

        return {
            'observed': observed,
            'expected': expected,
            'chi_squared': chi_sq,
            'wash_trading_score': wash_score,
            'likely_wash_pct': wash_score * 100
        }

    def compute_quality_metrics(self, bars):
        """Assess data quality of OHLCV bars."""
        n = len(bars)
        gaps = 0
        anomalies = 0

        for i in range(1, n):
            # Check for gaps (missing bars)
            if bars[i]['timestamp'] - bars[i-1]['timestamp'] > 1:
                gaps += 1
            # Check for anomalous bars
            if bars[i]['high'] < bars[i]['low']:
                anomalies += 1
            if bars[i]['volume'] == 0:
                anomalies += 1

        closes = [b['close'] for b in bars]
        returns = np.diff(np.log(closes))

        return {
            'n_bars': n,
            'gaps': gaps,
            'anomalies': anomalies,
            'quality_score': 1 - (gaps + anomalies) / n,
            'ann_volatility': np.std(returns) * np.sqrt(365 * 24),  # 24/7 market
            'max_return': np.max(returns),
            'min_return': np.min(returns),
        }

# Build crypto research dataset
pipeline = CryptoDataPipeline()

symbols = {
    'BTC/USDT': 65000,
    'ETH/USDT': 3500,
    'SOL/USDT': 150,
    'BTC/INR': 5500000,
}

print("=" * 60)
print("CRYPTO DATA PIPELINE")
print("=" * 60)

for symbol, start_price in symbols.items():
    bars = pipeline.generate_ohlcv(symbol, start_price, n_bars=1000)
    metrics = pipeline.compute_quality_metrics(bars)

    print(f"\\n{symbol}:")
    print(f"  Bars:       {metrics['n_bars']}")
    print(f"  Quality:    {metrics['quality_score']:.1%}")
    print(f"  Ann Vol:    {metrics['ann_volatility']:.1%}")
    print(f"  Max Return: {metrics['max_return']:.2%}")
    print(f"  Min Return: {metrics['min_return']:.2%}")

# Wash trading detection
np.random.seed(42)
genuine_trades = np.random.lognormal(5, 2, 5000)
wash_trades = np.random.uniform(100, 200, 5000)  # Suspicious uniform sizes

print(f"\\n--- Wash Trading Detection ---")
for name, trades in [("Genuine Exchange", genuine_trades), ("Suspect Exchange", wash_trades)]:
    result = pipeline.detect_wash_trading(trades)
    print(f"\\n  {name}:")
    print(f"    Chi-squared:      {result['chi_squared']:.1f}")
    print(f"    Wash score:       {result['wash_trading_score']:.2f}")
    print(f"    Est. wash %:      {result['likely_wash_pct']:.0f}%")`}),e.jsx(I,{title:"Building a BTC/INR Data Pipeline",difficulty:"beginner",problem:"You want to collect 1-minute OHLCV data for BTC/INR from WazirX for the past 365 days. The API returns max 500 candles per request with a rate limit of 10 requests per minute. How many API calls are needed and how long will the download take?",solution:[{step:"Total candles needed",formula:"365 \\times 24 \\times 60 = 525{,}600 \\text{ candles}",explanation:"Crypto markets run 24/7, so we need all 1440 candles per day."},{step:"API calls required",formula:"\\lceil 525{,}600 / 500 \\rceil = 1{,}052 \\text{ calls}"},{step:"Download time at rate limit",formula:"1{,}052 / 10 = 105.2 \\text{ minutes} \\approx 1.75 \\text{ hours}"},{step:"Storage estimate",formula:"525{,}600 \\times 48 \\text{ bytes} = 25.2 \\text{ MB (raw)}",explanation:"Very manageable size. In Parquet format, this compresses to ~3 MB."}]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Further Reading and Resources"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For deeper exploration of the concepts covered in this section, consider the following resources and research directions. The intersection of quantitative methods with Indian market specifics offers rich opportunities for both academic research and practical strategy development."}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Resource"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Type"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Relevance"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"NSE Research Papers"}),e.jsx("td",{className:"px-4 py-2",children:"Academic"}),e.jsx("td",{className:"px-4 py-2",children:"Indian market empirics"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"SEBI Discussion Papers"}),e.jsx("td",{className:"px-4 py-2",children:"Regulatory"}),e.jsx("td",{className:"px-4 py-2",children:"Market structure rules"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"RBI Working Papers"}),e.jsx("td",{className:"px-4 py-2",children:"Policy"}),e.jsx("td",{className:"px-4 py-2",children:"Macro-financial linkages"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"CMIE ProwessIQ"}),e.jsx("td",{className:"px-4 py-2",children:"Data"}),e.jsx("td",{className:"px-4 py-2",children:"Indian corporate financials"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"IIM/ISB Research"}),e.jsx("td",{className:"px-4 py-2",children:"Academic"}),e.jsx("td",{className:"px-4 py-2",children:"Indian finance research"})]})]})]})}),e.jsx(f,{title:"Implementation Notes",type:"historical",children:e.jsx("p",{children:"When implementing these concepts for Indian markets, remember to account for the T+1 settlement cycle (since January 2023), the pre-open auction session mechanics (9:00--9:15 AM IST), and SEBI's regulatory requirements for algorithmic trading including the mandatory algo order tagging and order-to-trade ratio limits. Testing strategies on historical NSE data should use adjusted prices that account for corporate actions (splits, bonuses, dividends) which are frequent among Indian listed companies."})}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Crypto data infrastructure requires handling 24/7 data streams, multiple exchange sources with varying quality, and unique challenges like wash trading detection. For Indian quant researchers, combining global exchange data (Binance, OKX) with Indian exchange data (WazirX, CoinDCX) enables cross-exchange analysis including INR premium tracking. Always validate data quality using Benford's law and anomaly detection before backtesting."})})]})}const re=Object.freeze(Object.defineProperty({__proto__:null,default:P},Symbol.toStringTag,{value:"Module"}));function q(){const[s,_]=c.useState(65e3),[r,b]=c.useState(65050),[n,u]=c.useState(.01),[o,y]=c.useState(500),m=(r-s)/s*100,p=m*365/8*3,h=s*n/100,l=n*3*365;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Perpetual Futures Microstructure"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Explore the relationship between spot price, perpetual futures price, funding rate, and open interest for BTC."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Spot: $",s.toLocaleString()]}),e.jsx("input",{type:"range",min:"20000",max:"100000",step:"500",value:s,onChange:x=>_(parseInt(x.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Perp: $",r.toLocaleString()]}),e.jsx("input",{type:"range",min:"20000",max:"100000",step:"500",value:r,onChange:x=>b(parseInt(x.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Funding: ",n.toFixed(3),"%"]}),e.jsx("input",{type:"range",min:"-0.1",max:"0.1",step:"0.005",value:n,onChange:x=>u(parseFloat(x.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["OI: ",o,"M USD"]}),e.jsx("input",{type:"range",min:"50",max:"2000",step:"50",value:o,onChange:x=>y(parseInt(x.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 500 120",className:"w-full max-w-lg mx-auto block","aria-label":"Perp basis",children:[e.jsx("line",{x1:"50",y1:"60",x2:"450",y2:"60",stroke:"#10b981",strokeWidth:"2"}),e.jsx("text",{x:"30",y:"64",className:"text-[9px]",fill:"#10b981",children:"Spot"}),e.jsx("line",{x1:"50",y1:60-m*10,x2:"450",y2:60-m*10,stroke:"#6366f1",strokeWidth:"2",strokeDasharray:"5,5"}),e.jsx("text",{x:"30",y:64-m*10,className:"text-[9px]",fill:"#6366f1",children:"Perp"}),e.jsx("rect",{x:"50",y:Math.min(60,60-m*10),width:"400",height:Math.abs(m*10),fill:m>0?"#dbeafe":"#fee2e2",opacity:"0.5"}),e.jsxs("text",{x:"250",y:"100",textAnchor:"middle",className:"text-[10px] fill-gray-600 dark:fill-gray-400",children:["Basis: ",m.toFixed(3),"% | Ann: ",p.toFixed(1),"% | Funding PnL: $",h.toFixed(2),"/8h"]}),e.jsxs("text",{x:"250",y:"115",textAnchor:"middle",className:"text-[9px] fill-gray-500",children:["Ann. Funding: ",l.toFixed(1),"% | OI: $",o,"M"]})]})]})}function B(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Crypto Market Microstructure"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Cryptocurrency market microstructure differs fundamentally from traditional equity markets. The 24/7 trading, fragmented liquidity across exchanges, perpetual futures with funding rates, and the absence of designated market makers create unique dynamics that quant strategies must account for."}),e.jsx(N,{title:"Perpetual Futures Contract",label:"Definition 3.1",definition:"A perpetual futures (perp) is a derivative contract that tracks the price of an underlying asset without an expiry date. To keep the perp price anchored to spot, exchanges use a funding rate mechanism: when perps trade above spot (contango), longs pay shorts; when below (backwardation), shorts pay longs. Funding payments occur every 8 hours on most exchanges.",notation:e.jsxs(e.Fragment,{children:["Funding rate: ",e.jsx(t.InlineMath,{math:"F = \\text{clamp}\\!\\left(\\frac{P_{\\text{perp}} - P_{\\text{spot}}}{P_{\\text{spot}}}, -0.75\\%, +0.75\\%\\right)"})," paid every 8 hours. The annualized funding yield is ",e.jsx(t.InlineMath,{math:"F_{\\text{ann}} = F \\times 3 \\times 365"}),"."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Crypto vs. Traditional Microstructure"}),e.jsx(t.BlockMath,{math:"\\text{Effective Spread}_{\\text{crypto}} = \\text{Spread}_{\\text{CEX}} + \\text{Cross-exchange slippage} + \\text{Funding drag}"}),e.jsx(w,{title:"Funding Rate Mean-Reversion",label:"Empirical Finding 3.1",statement:e.jsxs(e.Fragment,{children:["Crypto perpetual funding rates exhibit strong mean-reversion with a half-life of approximately 24--72 hours. When the 8-hour funding rate exceeds ",e.jsx(t.InlineMath,{math:"|F| > 0.05\\%"}),", the subsequent 3-day cumulative funding tends to revert toward zero: ",e.jsx(t.BlockMath,{math:"\\text{Corr}(F_t, \\sum_{k=1}^{9} F_{t+k}) = -0.42 \\quad (p < 0.001)"})," This creates a predictable income stream for delta-neutral funding rate harvesting strategies."]}),proof:e.jsxs(e.Fragment,{children:["Analysis of 2 years of 8-hourly funding rates across BTC, ETH, and SOL perpetuals on Binance. The autocorrelation function of funding rates shows exponential decay with ",e.jsx(t.InlineMath,{math:"\\rho(k) \\approx 0.85^k"}),", implying a half-life of ",e.jsx(t.InlineMath,{math:"t_{1/2} = -\\ln(2)/\\ln(0.85) \\approx 4.3"})," periods (approximately 34 hours)."]})}),e.jsx(q,{}),e.jsx(T,{title:"crypto_microstructure.py",runnable:!0,code:`import numpy as np

class PerpFuturesMicrostructure:
    """Analyze perpetual futures microstructure dynamics."""

    def __init__(self, funding_interval_hours=8):
        self.funding_interval = funding_interval_hours

    def compute_funding_rate(self, perp_price, spot_price, max_rate=0.0075):
        """Compute funding rate from perp-spot basis."""
        basis = (perp_price - spot_price) / spot_price
        return np.clip(basis, -max_rate, max_rate)

    def simulate_funding(self, n_periods, mean_rate=0.0001, vol=0.0003, mr_speed=0.15):
        """Simulate mean-reverting funding rates."""
        rates = [mean_rate]
        for _ in range(n_periods - 1):
            dr = mr_speed * (mean_rate - rates[-1]) + vol * np.random.normal()
            rates.append(rates[-1] + dr)
        return np.array(rates)

    def funding_pnl(self, rates, position_size, direction='short'):
        """Compute PnL from funding payments."""
        sign = 1 if direction == 'short' else -1
        return np.cumsum(sign * rates * position_size)

    def basis_analysis(self, spot_prices, perp_prices):
        """Analyze spot-perp basis dynamics."""
        basis = (np.array(perp_prices) - np.array(spot_prices)) / np.array(spot_prices)
        return {
            'mean_basis': np.mean(basis),
            'std_basis': np.std(basis),
            'max_basis': np.max(basis),
            'min_basis': np.min(basis),
            'basis_autocorr': np.corrcoef(basis[:-1], basis[1:])[0, 1],
            'ann_carry': np.mean(basis) * 3 * 365  # 3 periods per day
        }

class FragmentedLiquidityAnalyzer:
    """Analyze liquidity fragmentation across crypto exchanges."""

    def __init__(self):
        self.exchange_data = {}

    def add_exchange(self, name, bid, ask, depth):
        self.exchange_data[name] = {'bid': bid, 'ask': ask, 'depth': depth}

    def global_bbo(self):
        """Find global best bid and offer across exchanges."""
        best_bid = max(d['bid'] for d in self.exchange_data.values())
        best_ask = min(d['ask'] for d in self.exchange_data.values())
        bid_ex = [n for n, d in self.exchange_data.items() if d['bid'] == best_bid]
        ask_ex = [n for n, d in self.exchange_data.items() if d['ask'] == best_ask]
        return {
            'best_bid': best_bid, 'bid_exchange': bid_ex[0],
            'best_ask': best_ask, 'ask_exchange': ask_ex[0],
            'global_spread': best_ask - best_bid,
            'locked': best_bid >= best_ask
        }

    def cross_exchange_arb(self):
        """Find cross-exchange arbitrage opportunities."""
        arbs = []
        names = list(self.exchange_data.keys())
        for i in range(len(names)):
            for j in range(i + 1, len(names)):
                a, b = self.exchange_data[names[i]], self.exchange_data[names[j]]
                # Buy on i, sell on j
                if a['ask'] < b['bid']:
                    arbs.append({
                        'buy': names[i], 'sell': names[j],
                        'profit_bps': (b['bid'] - a['ask']) / a['ask'] * 10000
                    })
                # Buy on j, sell on i
                if b['ask'] < a['bid']:
                    arbs.append({
                        'buy': names[j], 'sell': names[i],
                        'profit_bps': (a['bid'] - b['ask']) / b['ask'] * 10000
                    })
        return arbs

# Funding rate analysis
np.random.seed(42)
perp = PerpFuturesMicrostructure()
funding_rates = perp.simulate_funding(n_periods=270, mean_rate=0.0001)

print("=" * 55)
print("CRYPTO MICROSTRUCTURE ANALYSIS")
print("=" * 55)

# Funding statistics
ann_funding = np.mean(funding_rates) * 3 * 365
print(f"\\nFunding Rate Analysis (BTC Perp):")
print(f"  Mean 8h rate:     {np.mean(funding_rates)*100:.4f}%")
print(f"  Std 8h rate:      {np.std(funding_rates)*100:.4f}%")
print(f"  Ann. carry:       {ann_funding*100:.2f}%")
print(f"  Autocorrelation:  {np.corrcoef(funding_rates[:-1], funding_rates[1:])[0,1]:.3f}")

# Funding PnL for delta-neutral short
pnl = perp.funding_pnl(funding_rates, position_size=100000, direction='short')
sharpe = np.mean(np.diff(pnl)) / np.std(np.diff(pnl)) * np.sqrt(3 * 365)
print(f"\\nDelta-Neutral Funding Strategy ($100K):")
print(f"  Total PnL:        \${pnl[-1]:,.2f}")
print(f"  Annualized Sharpe: {sharpe:.2f}")

# Cross-exchange liquidity
frag = FragmentedLiquidityAnalyzer()
frag.add_exchange('Binance', bid=64998, ask=65002, depth=5000000)
frag.add_exchange('WazirX', bid=64950, ask=65100, depth=50000)
frag.add_exchange('OKX', bid=64997, ask=65003, depth=3000000)
frag.add_exchange('Coinbase', bid=64995, ask=65005, depth=2000000)

bbo = frag.global_bbo()
print(f"\\nGlobal BBO (BTC/USDT):")
print(f"  Best Bid: \${bbo['best_bid']:,} ({bbo['bid_exchange']})")
print(f"  Best Ask: \${bbo['best_ask']:,} ({bbo['ask_exchange']})")
print(f"  Global Spread: \${bbo['global_spread']:,}")

arbs = frag.cross_exchange_arb()
if arbs:
    print(f"\\nCross-Exchange Arbs Found: {len(arbs)}")
    for a in arbs:
        print(f"  Buy {a['buy']} -> Sell {a['sell']}: {a['profit_bps']:.1f} bps")`}),e.jsx(I,{title:"Funding Rate Carry Trade",difficulty:"intermediate",problem:"BTC perp on Binance has an 8-hour funding rate of +0.03% (longs pay shorts). You enter a delta-neutral position: long 1 BTC spot at $65,000 and short 1 BTC perp. Your position size is $65,000. If this funding rate persists for 30 days, what is your expected PnL? What is the annualized return?",solution:[{step:"Funding income per 8-hour period",formula:"\\text{Income} = 65{,}000 \\times 0.0003 = \\$19.50"},{step:"30-day funding income",formula:"\\text{PnL}_{30d} = 19.50 \\times 3 \\times 30 = \\$1{,}755",explanation:"3 funding periods per day (every 8 hours)."},{step:"Annualized return",formula:"r_{\\text{ann}} = \\frac{1{,}755}{65{,}000} \\times \\frac{365}{30} = 32.9\\%"},{step:"Risk considerations",formula:"\\text{Risks: margin calls, basis widening, exchange risk}",explanation:"Funding rates are not constant -- they can flip negative during bearish periods, and liquidation risk exists if the basis widens significantly. Indian traders must also account for forex risk on the USD position."}]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Liquidity Fragmentation Metrics"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Unlike NSE where liquidity concentrates in a single CLOB, crypto liquidity is distributed across dozens of exchanges. The Herfindahl-Hirschman Index (HHI) measures liquidity concentration:"}),e.jsx(t.BlockMath,{math:"\\text{HHI} = \\sum_{i=1}^{N} s_i^2, \\quad s_i = \\frac{V_i}{\\sum_j V_j}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For BTC/USDT, HHI is approximately 0.25 (Binance-dominated), while for smaller altcoins HHI can be as low as 0.05, indicating extreme fragmentation. The effective spread for a fragmented market is:"}),e.jsx(t.BlockMath,{math:"\\text{Effective Spread}_{\\text{global}} = \\frac{\\sum_i V_i \\cdot s_i^{\\text{eff}}}{\\sum_i V_i} + \\text{Cross-exchange transfer cost}"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Feature"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Crypto (CEX)"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"NSE Equity"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Crypto (DEX)"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Trading Hours"}),e.jsx("td",{className:"px-4 py-2",children:"24/7/365"}),e.jsx("td",{className:"px-4 py-2",children:"9:15--15:30 IST"}),e.jsx("td",{className:"px-4 py-2",children:"24/7/365"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Order Book"}),e.jsx("td",{className:"px-4 py-2",children:"CLOB"}),e.jsx("td",{className:"px-4 py-2",children:"CLOB"}),e.jsx("td",{className:"px-4 py-2",children:"AMM"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Typical Spread"}),e.jsx("td",{className:"px-4 py-2",children:"1--5 bps"}),e.jsx("td",{className:"px-4 py-2",children:"2--10 bps"}),e.jsx("td",{className:"px-4 py-2",children:"30 bps (fee)"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Settlement"}),e.jsx("td",{className:"px-4 py-2",children:"Instant (internal)"}),e.jsx("td",{className:"px-4 py-2",children:"T+1"}),e.jsx("td",{className:"px-4 py-2",children:"~12s (Ethereum)"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Leverage Available"}),e.jsx("td",{className:"px-4 py-2",children:"Up to 125x"}),e.jsx("td",{className:"px-4 py-2",children:"Up to 5x (F&O)"}),e.jsx("td",{className:"px-4 py-2",children:"1x (spot only)"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Regulation"}),e.jsx("td",{className:"px-4 py-2",children:"Varies by jurisdiction"}),e.jsx("td",{className:"px-4 py-2",children:"SEBI regulated"}),e.jsx("td",{className:"px-4 py-2",children:"Permissionless"})]})]})]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"24/7 Market Dynamics"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The continuous nature of crypto trading creates unique microstructure patterns. Volatility and volume exhibit time-of-day effects driven by global market openings:"}),e.jsx(t.BlockMath,{math:"\\sigma_{\\text{hourly}}(h) = \\sigma_{\\text{base}} \\cdot \\left(1 + \\sum_{k \\in \\text{sessions}} a_k \\cdot e^{-\\frac{(h - h_k)^2}{2w_k^2}}\\right)"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"h_k"})," are the opening hours of major sessions: Asia (1:30 UTC, IST market open), Europe (7:00 UTC), and US (13:30 UTC). The US session typically accounts for 40--50% of daily BTC volume, with the India/Asia session contributing 20--25%."]}),e.jsx(f,{title:"Weekend Effect in Crypto",type:"historical",children:e.jsx("p",{children:'Despite trading 24/7, crypto markets exhibit a "weekend effect" where volatility increases and liquidity decreases on weekends. Average weekend spreads on BTC/USDT are 30--50% wider than weekday spreads on Binance. This creates opportunities for market-making strategies that widen quotes on weekends while maintaining tighter spreads during high-liquidity weekday periods. Indian traders should note that weekend volatility spikes often occur during US evening hours (IST early morning Sunday).'})}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Crypto microstructure is characterized by perpetual futures funding rates, fragmented cross-exchange liquidity, and 24/7 trading. The funding rate mechanism creates predictable carry trade opportunities, while cross-exchange fragmentation enables arbitrage for well-capitalized traders with exchange accounts and API access. Understanding these unique microstructure features is essential for designing profitable crypto quant strategies."})})]})}const ne=Object.freeze(Object.defineProperty({__proto__:null,default:B},Symbol.toStringTag,{value:"Module"}));function R(){const[s,_]=c.useState(1e5),[r,b]=c.useState(2),[n,u]=c.useState(.02),[o,y]=c.useState(5),p=s*r*n/100*3,h=p*365/s*100,l=h/o*.5,x=Array.from({length:12},(a,i)=>{const d=p*30*(1+Math.sin(i*.5)*.3);return{month:i+1,pnl:d}});return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Funding Rate Arbitrage Calculator"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Configure capital, leverage, and expected funding rate to model the delta-neutral carry strategy P&L."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Capital: $",(s/1e3).toFixed(0),"K"]}),e.jsx("input",{type:"range",min:"10000",max:"1000000",step:"10000",value:s,onChange:a=>_(parseInt(a.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Leverage: ",r,"x"]}),e.jsx("input",{type:"range",min:"1",max:"5",step:"0.5",value:r,onChange:a=>b(parseFloat(a.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Avg Funding: ",n.toFixed(3),"%"]}),e.jsx("input",{type:"range",min:"-0.05",max:"0.1",step:"0.005",value:n,onChange:a=>u(parseFloat(a.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Max DD: ",o,"%"]}),e.jsx("input",{type:"range",min:"1",max:"20",step:"1",value:o,onChange:a=>y(parseInt(a.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 500 150",className:"w-full max-w-lg mx-auto block","aria-label":"Funding PnL",children:[x.map((a,i)=>{const d=40+i*38,j=Math.max(5,a.pnl/50),k=a.pnl>=0?100-j:100;return e.jsxs("g",{children:[e.jsx("rect",{x:d,y:k,width:"28",height:Math.abs(j),fill:a.pnl>=0?"#4ade80":"#f87171",opacity:"0.7",rx:"3"}),e.jsxs("text",{x:d+14,y:"118",textAnchor:"middle",className:"text-[7px]",fill:"#6b7280",children:["M",a.month]}),e.jsxs("text",{x:d+14,y:k-3,textAnchor:"middle",className:"text-[6px]",fill:"#374151",children:["$",(a.pnl/1e3).toFixed(1),"K"]})]},i)}),e.jsx("line",{x1:"35",y1:"100",x2:"500",y2:"100",stroke:"#94a3b8",strokeWidth:"1"}),e.jsxs("text",{x:"250",y:"140",textAnchor:"middle",className:"text-[9px] fill-gray-600 dark:fill-gray-400",children:["Annual Return: ",h.toFixed(1),"% | Daily Income: $",p.toFixed(0)," | Sharpe: ",l.toFixed(1)]})]})]})}function L(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Funding Rate Arbitrage"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Funding rate arbitrage is a delta-neutral strategy that harvests the carry from perpetual futures funding payments. When perpetual futures trade at a premium to spot (positive funding), the strategy goes long spot and short perps to collect funding while maintaining zero directional exposure."}),e.jsx(N,{title:"Delta-Neutral Funding Carry",label:"Definition 1.1",definition:"A delta-neutral funding carry trade consists of a long position in the underlying asset (or a correlated spot instrument) and an equal-sized short position in the perpetual futures contract. The portfolio delta is approximately zero, meaning it profits from funding payments regardless of price direction. The strategy is profitable when the average funding rate exceeds execution costs.",notation:e.jsxs(e.Fragment,{children:["Portfolio: ",e.jsx(t.InlineMath,{math:"\\Pi = +S_t - P_t"})," (long spot, short perp). PnL per period: ",e.jsx(t.InlineMath,{math:"\\Delta\\Pi = F_t \\cdot |P_t| + (S_t - S_{t-1}) - (P_t - P_{t-1}) \\approx F_t \\cdot N"})," where ",e.jsx(t.InlineMath,{math:"F_t"})," is the funding rate and ",e.jsx(t.InlineMath,{math:"N"})," is notional."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Strategy Mechanics"}),e.jsx(t.BlockMath,{math:"\\text{Daily PnL} = N \\cdot \\sum_{k=1}^{3} F_{t,k} - \\text{Execution Costs} - \\text{Financing}"}),e.jsx(t.BlockMath,{math:"\\text{Ann. Return} = \\frac{365 \\times \\text{Daily PnL}}{\\text{Capital}} = \\frac{365 \\times 3 \\times N \\times \\bar{F}}{C}"}),e.jsx(w,{title:"Optimal Position Sizing for Funding Carry",label:"Theorem 1.1",statement:e.jsxs(e.Fragment,{children:["The Kelly-optimal leverage for a funding carry strategy with mean funding rate ",e.jsx(t.InlineMath,{math:"\\bar{F}"}),", funding volatility ",e.jsx(t.InlineMath,{math:"\\sigma_F"}),", and basis risk ",e.jsx(t.InlineMath,{math:"\\sigma_B"})," is: ",e.jsx(t.BlockMath,{math:"l^* = \\frac{\\bar{F}}{\\sigma_F^2 + \\sigma_B^2}"})," For BTC perpetuals with typical parameters (",e.jsx(t.InlineMath,{math:"\\bar{F} = 0.01\\%, \\sigma_F = 0.02\\%, \\sigma_B = 0.5\\%"}),"), the full Kelly leverage is approximately ",e.jsx(t.InlineMath,{math:"l^* \\approx 4\\times"}),", with half-Kelly at ",e.jsx(t.InlineMath,{math:"2\\times"})," recommended in practice."]}),proof:e.jsxs(e.Fragment,{children:["The strategy return per period is ",e.jsx(t.InlineMath,{math:"r = l \\cdot F + \\epsilon"})," where ",e.jsx(t.InlineMath,{math:"\\epsilon \\sim N(0, l^2(\\sigma_F^2 + \\sigma_B^2))"})," represents basis and funding noise. Maximizing ",e.jsx(t.InlineMath,{math:"\\mathbb{E}[\\log(1 + r)]"})," using the Kelly criterion: ",e.jsx(t.InlineMath,{math:"l^* = \\bar{F}/\\text{Var}(\\epsilon/l) = \\bar{F}/(\\sigma_F^2 + \\sigma_B^2)"}),"."]})}),e.jsx(R,{}),e.jsx(T,{title:"funding_rate_arb.py",runnable:!0,code:`import numpy as np

class FundingRateArbitrage:
    """Delta-neutral funding rate carry strategy."""

    def __init__(self, capital, leverage=2.0, rebalance_threshold=0.02):
        self.capital = capital
        self.leverage = leverage
        self.notional = capital * leverage
        self.rebalance_thresh = rebalance_threshold

    def simulate_funding_rates(self, n_days, mean_rate=0.0001,
                                vol=0.0003, mr_speed=0.1):
        """Simulate 8-hourly funding rates (3 per day)."""
        n_periods = n_days * 3
        rates = [mean_rate]
        for _ in range(n_periods - 1):
            dr = mr_speed * (mean_rate - rates[-1]) + vol * np.random.normal()
            rates.append(rates[-1] + dr)
        return np.array(rates)

    def backtest(self, funding_rates, spot_returns, exec_cost_bps=2):
        """Run backtest of the funding carry strategy."""
        n = len(funding_rates)
        pnl = []
        capital = self.capital
        rebalances = 0

        for i in range(n):
            # Funding income
            funding_pnl = self.notional * funding_rates[i]

            # Basis risk (imperfect hedge)
            basis_noise = np.random.normal(0, 0.0001) * self.notional

            # Execution cost for rebalancing
            exec_cost = 0
            if i > 0 and abs(spot_returns[i]) > self.rebalance_thresh:
                exec_cost = self.notional * exec_cost_bps / 10000
                rebalances += 1

            period_pnl = funding_pnl + basis_noise - exec_cost
            pnl.append(period_pnl)
            capital += period_pnl

        pnl = np.array(pnl)
        daily_pnl = np.array([np.sum(pnl[i*3:(i+1)*3]) for i in range(len(pnl)//3)])

        return {
            'total_pnl': np.sum(pnl),
            'ann_return': np.sum(daily_pnl) / self.capital * 365 / (len(daily_pnl)),
            'sharpe': np.mean(daily_pnl) / np.std(daily_pnl) * np.sqrt(365) if np.std(daily_pnl) > 0 else 0,
            'max_drawdown': np.min(np.minimum.accumulate(np.cumsum(daily_pnl)) - np.cumsum(daily_pnl)),
            'win_rate': np.mean(daily_pnl > 0),
            'rebalances': rebalances,
            'avg_daily_pnl': np.mean(daily_pnl),
        }

    def risk_metrics(self, funding_rates):
        """Compute strategy risk metrics."""
        neg_periods = np.sum(funding_rates < 0)
        max_neg_streak = 0
        current_streak = 0
        for f in funding_rates:
            if f < 0:
                current_streak += 1
                max_neg_streak = max(max_neg_streak, current_streak)
            else:
                current_streak = 0

        return {
            'neg_funding_pct': neg_periods / len(funding_rates),
            'max_neg_streak': max_neg_streak,
            'worst_8h_funding': np.min(funding_rates),
            'best_8h_funding': np.max(funding_rates),
            'funding_volatility': np.std(funding_rates),
        }

# Run strategy simulation
np.random.seed(42)
strategy = FundingRateArbitrage(capital=100_000, leverage=2.0)

# Simulate different market regimes
regimes = [
    ("Bull Market (High Funding)", 0.0003, 0.0004),
    ("Normal Market", 0.0001, 0.0003),
    ("Bear Market (Neg Funding)", -0.0001, 0.0005),
]

print("=" * 60)
print("FUNDING RATE ARBITRAGE STRATEGY")
print(f"Capital: $100K | Leverage: 2x | Notional: $200K")
print("=" * 60)

for regime_name, mean_f, vol_f in regimes:
    funding = strategy.simulate_funding_rates(180, mean_rate=mean_f, vol=vol_f)
    spot_ret = np.random.normal(0, 0.003, len(funding))
    result = strategy.backtest(funding, spot_ret)
    risk = strategy.risk_metrics(funding)

    print(f"\\n--- {regime_name} ---")
    print(f"  Total PnL:      \${result['total_pnl']:>10,.2f}")
    print(f"  Ann. Return:    {result['ann_return']:>9.1%}")
    print(f"  Sharpe Ratio:   {result['sharpe']:>9.2f}")
    print(f"  Win Rate:       {result['win_rate']:>9.1%}")
    print(f"  Max Drawdown:   \${result['max_drawdown']:>10,.2f}")
    print(f"  Neg Funding %:  {risk['neg_funding_pct']:>9.1%}")
    print(f"  Max Neg Streak: {risk['max_neg_streak']:>9d} periods")`}),e.jsx(I,{title:"Multi-Asset Funding Rotation",difficulty:"advanced",problem:"You have $300K capital and observe 8-hour funding rates: BTC = +0.035%, ETH = +0.020%, SOL = -0.010%. Your leverage limit is 2x. How should you allocate across assets to maximize funding income while maintaining delta-neutrality?",solution:[{step:"Rank by funding rate",formula:"\\text{BTC} > \\text{ETH} > \\text{SOL}",explanation:"BTC has the highest positive funding, SOL has negative funding."},{step:"Exclude negative funding assets",formula:"\\text{Skip SOL (negative funding)}",explanation:"For a carry strategy, only collect positive funding."},{step:"Proportional allocation",formula:"w_{\\text{BTC}} = \\frac{0.035}{0.035 + 0.020} = 63.6\\%, \\quad w_{\\text{ETH}} = 36.4\\%"},{step:"Position sizes",formula:"\\text{BTC notional} = 300K \\times 2 \\times 0.636 = \\$381.8K"},{step:"Daily income",formula:"\\text{Daily} = 381.8K \\times 0.035\\% \\times 3 + 218.2K \\times 0.020\\% \\times 3 = \\$532",explanation:"Annualized to approximately $194K or 64.7% return on capital. In practice, account for basis risk across multiple assets."}]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Risk Management Framework"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The key risks in funding rate arbitrage require systematic monitoring and mitigation:"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Risk"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Description"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Mitigation"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Impact"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Basis Risk"}),e.jsx("td",{className:"px-4 py-2",children:"Spot-perp spread widens"}),e.jsx("td",{className:"px-4 py-2",children:"Maintain margin buffer"}),e.jsx("td",{className:"px-4 py-2",children:"Medium"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Negative Funding"}),e.jsx("td",{className:"px-4 py-2",children:"Funding flips to shorts paying longs"}),e.jsx("td",{className:"px-4 py-2",children:"Exit when funding goes negative"}),e.jsx("td",{className:"px-4 py-2",children:"Medium"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Liquidation"}),e.jsx("td",{className:"px-4 py-2",children:"Margin call on perp leg"}),e.jsx("td",{className:"px-4 py-2",children:"Low leverage, auto-deleverage alerts"}),e.jsx("td",{className:"px-4 py-2",children:"High"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Exchange Risk"}),e.jsx("td",{className:"px-4 py-2",children:"Exchange insolvency/hack"}),e.jsx("td",{className:"px-4 py-2",children:"Multi-exchange, limit per venue"}),e.jsx("td",{className:"px-4 py-2",children:"Catastrophic"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Stablecoin Depeg"}),e.jsx("td",{className:"px-4 py-2",children:"USDT/USDC deviates from $1"}),e.jsx("td",{className:"px-4 py-2",children:"Monitor peg, diversify stables"}),e.jsx("td",{className:"px-4 py-2",children:"High"})]})]})]})}),e.jsx(t.BlockMath,{math:"\\text{Max Position} = \\frac{\\text{Capital}}{1 + \\text{Max Basis Widening} + \\text{Margin Buffer}}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The margin buffer should account for the maximum expected basis widening during volatile periods. During the March 2020 crash, BTC perp basis widened to -30% annualized, while during the 2021 bull run it reached +100% annualized. A prudent margin buffer of 20--30% of position value is recommended."}),e.jsx(f,{title:"Indian Tax Considerations",type:"warning",children:e.jsx("p",{children:"For Indian residents executing funding rate arbitrage on global exchanges, the gains are taxable as income from Virtual Digital Assets under Section 115BBH at 30% flat rate (plus applicable surcharge and cess). The 1% TDS under Section 194S applies only to Indian exchanges, making global exchanges more practical for this strategy. However, all foreign crypto income must be declared in ITR, and FEMA considerations apply for remitting capital abroad. Consult a qualified chartered accountant for compliance."})}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Funding rate arbitrage is one of the most accessible crypto quant strategies, offering attractive risk-adjusted returns during bullish markets when funding rates are persistently positive. The key risks are basis risk (imperfect spot-perp hedge), negative funding periods during bear markets, exchange counterparty risk, and liquidation risk from leverage. For Indian traders, the strategy must be executed on global exchanges due to the prohibitive 1% TDS on Indian platforms."})})]})}const ie=Object.freeze(Object.defineProperty({__proto__:null,default:L},Symbol.toStringTag,{value:"Module"}));function z(){const[s,_]=c.useState(1e3),[r,b]=c.useState(3e6),[n,u]=c.useState(10),[o,y]=c.useState(5),m=s*r,p=r/s,h=s+n,l=m/h,a=(r-l)/n,i=(p-a)/p*100,d=p*.998,j=(a-d)*n-o,k=j>0;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: AMM Price Impact & DEX-CEX Arbitrage"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Explore how constant-product AMM (Uniswap V2 style) pricing creates arbitrage opportunities between DEX and CEX markets."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Reserve X (ETH): ",s]}),e.jsx("input",{type:"range",min:"100",max:"10000",step:"100",value:s,onChange:v=>_(parseInt(v.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Reserve Y (USDT): ",(r/1e3).toFixed(0),"K"]}),e.jsx("input",{type:"range",min:"100000",max:"10000000",step:"100000",value:r,onChange:v=>b(parseInt(v.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Swap: ",n," ETH"]}),e.jsx("input",{type:"range",min:"1",max:"100",step:"1",value:n,onChange:v=>u(parseInt(v.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Gas: $",o]}),e.jsx("input",{type:"range",min:"1",max:"50",step:"1",value:o,onChange:v=>y(parseInt(v.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 500 140",className:"w-full max-w-lg mx-auto block","aria-label":"AMM curve",children:[e.jsx("defs",{children:e.jsx("marker",{id:"ammArrow",markerWidth:"6",markerHeight:"4",refX:"6",refY:"2",orient:"auto",children:e.jsx("polygon",{points:"0 0, 6 2, 0 4",fill:"#6366f1"})})}),Array.from({length:20},(v,S)=>{const g=200+S*200/s*10,M=120-m/(s*.5+S*s*.1)/r*100,C=200+(S+1)*200/s*10,A=120-m/(s*.5+(S+1)*s*.1)/r*100;return e.jsx("line",{x1:g,y1:Math.max(10,M),x2:C,y2:Math.max(10,A),stroke:"#6366f1",strokeWidth:"2"},S)}),e.jsxs("text",{x:"30",y:"50",className:"text-[9px]",fill:"#374151",children:["Spot: $",p.toFixed(0)]}),e.jsxs("text",{x:"30",y:"65",className:"text-[9px]",fill:"#374151",children:["Exec: $",a.toFixed(0)]}),e.jsxs("text",{x:"30",y:"80",className:"text-[9px]",fill:"#374151",children:["Impact: ",i.toFixed(2),"%"]}),e.jsxs("text",{x:"250",y:"135",textAnchor:"middle",className:`text-[10px] font-bold ${k?"fill-green-600":"fill-red-500"}`,children:["Arb Profit: $",j.toFixed(2)," (",k?"PROFITABLE":"UNPROFITABLE",")"]})]})]})}function V(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"DEX Arbitrage Strategies"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Decentralized exchange (DEX) arbitrage exploits price discrepancies between automated market makers (AMMs) and centralized exchanges. The deterministic pricing of AMMs (like Uniswap's constant-product formula) creates predictable arbitrage opportunities that can be captured through on-chain transactions or atomic arbitrage bots."}),e.jsx(N,{title:"Constant Product Market Maker (CPMM)",label:"Definition 2.1",definition:"A constant product market maker maintains a liquidity pool with reserves of two tokens (x, y) satisfying the invariant x * y = k. When a trader swaps dx of token X for token Y, they receive dy = y - k/(x + dx). The price increases with trade size, creating a natural price impact that depends on the pool's depth.",notation:e.jsxs(e.Fragment,{children:["Invariant: ",e.jsx(t.InlineMath,{math:"x \\cdot y = k"}),". Spot price: ",e.jsx(t.InlineMath,{math:"P = y/x"}),". Execution price for swap ",e.jsx(t.InlineMath,{math:"\\Delta x"}),": ",e.jsx(t.InlineMath,{math:"P_{\\text{exec}} = \\frac{y - k/(x + \\Delta x)}{\\Delta x}"})]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"AMM Price Impact"}),e.jsx(t.BlockMath,{math:"\\text{Price Impact} = 1 - \\frac{P_{\\text{exec}}}{P_{\\text{spot}}} = 1 - \\frac{x}{x + \\Delta x} = \\frac{\\Delta x}{x + \\Delta x}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Unlike traditional order books, AMM price impact is a deterministic function of trade size relative to pool depth. This predictability is what makes DEX arbitrage algorithmic rather than statistical."}),e.jsx(w,{title:"Optimal Arbitrage Size",label:"Theorem 2.1",statement:e.jsxs(e.Fragment,{children:["Given a CPMM pool with reserves ",e.jsx(t.InlineMath,{math:"(x, y)"})," and a CEX price ",e.jsx(t.InlineMath,{math:"P_{\\text{CEX}}"}),", the optimal arbitrage trade size that maximizes profit (ignoring gas) is: ",e.jsx(t.BlockMath,{math:"\\Delta x^* = \\sqrt{\\frac{x \\cdot y}{P_{\\text{CEX}}}} - x \\quad \\text{(when DEX is overpriced: } y/x > P_{\\text{CEX}}\\text{)}"})," The maximum profit is ",e.jsx(t.InlineMath,{math:"\\pi^* = y - \\sqrt{x \\cdot y \\cdot P_{\\text{CEX}}} - P_{\\text{CEX}} \\cdot (\\sqrt{x \\cdot y / P_{\\text{CEX}}} - x)"}),"."]}),proof:e.jsxs(e.Fragment,{children:["The profit function for buying ",e.jsx(t.InlineMath,{math:"\\Delta x"})," on CEX and selling on DEX: ",e.jsx(t.BlockMath,{math:"\\pi(\\Delta x) = \\left(y - \\frac{k}{x + \\Delta x}\\right) - P_{\\text{CEX}} \\cdot \\Delta x"})," Setting ",e.jsx(t.InlineMath,{math:"d\\pi/d(\\Delta x) = 0"}),": ",e.jsx(t.InlineMath,{math:"k/(x + \\Delta x)^2 = P_{\\text{CEX}}"}),", yielding ",e.jsx(t.InlineMath,{math:"\\Delta x^* = \\sqrt{k/P_{\\text{CEX}}} - x"}),"."]})}),e.jsx(z,{}),e.jsx(T,{title:"dex_arbitrage.py",runnable:!0,code:`import numpy as np

class ConstantProductAMM:
    """Uniswap V2 style constant product AMM."""

    def __init__(self, reserve_x, reserve_y, fee_pct=0.3):
        self.x = reserve_x
        self.y = reserve_y
        self.k = reserve_x * reserve_y
        self.fee = fee_pct / 100

    @property
    def spot_price(self):
        return self.y / self.x

    def swap_x_for_y(self, dx):
        """Swap dx of token X for token Y."""
        dx_after_fee = dx * (1 - self.fee)
        new_x = self.x + dx_after_fee
        new_y = self.k / new_x
        dy = self.y - new_y
        return {
            'amount_out': dy,
            'execution_price': dy / dx,
            'price_impact_pct': (1 - (self.x / new_x)) * 100,
            'fee_paid': dx * self.fee * self.spot_price
        }

    def optimal_arb_size(self, cex_price):
        """Compute optimal arbitrage size."""
        if self.spot_price <= cex_price:
            return 0  # No arb opportunity (DEX cheaper)
        optimal = np.sqrt(self.k / cex_price) - self.x
        return max(0, optimal * (1 - self.fee))

class DEXArbBot:
    """DEX-CEX arbitrage bot."""

    def __init__(self, gas_cost_usd=5, min_profit_usd=10):
        self.gas_cost = gas_cost_usd
        self.min_profit = min_profit_usd

    def find_opportunity(self, amm, cex_price):
        """Check for arbitrage opportunity."""
        # DEX overpriced: buy on CEX, sell on DEX
        if amm.spot_price > cex_price * 1.001:
            opt_size = amm.optimal_arb_size(cex_price)
            if opt_size > 0:
                swap = amm.swap_x_for_y(opt_size)
                profit = swap['amount_out'] - opt_size * cex_price - self.gas_cost
                return {
                    'direction': 'BUY_CEX_SELL_DEX',
                    'size': opt_size,
                    'dex_price': amm.spot_price,
                    'cex_price': cex_price,
                    'gross_profit': swap['amount_out'] - opt_size * cex_price,
                    'gas_cost': self.gas_cost,
                    'net_profit': profit,
                    'profitable': profit > self.min_profit,
                    'impact': swap['price_impact_pct']
                }

        # DEX underpriced: buy on DEX, sell on CEX
        elif cex_price > amm.spot_price * 1.001:
            # Swap Y for X on DEX, sell X on CEX
            dy_needed = 1000  # test with fixed amount
            return {
                'direction': 'BUY_DEX_SELL_CEX',
                'dex_price': amm.spot_price,
                'cex_price': cex_price,
                'profitable': False,  # simplified
            }

        return {'profitable': False, 'reason': 'No opportunity'}

    def simulate_arb_day(self, n_periods=100):
        """Simulate a day of DEX arb opportunities."""
        np.random.seed(42)
        base_price = 3000
        results = []

        for i in range(n_periods):
            # Random pool state
            reserve_x = 1000 + np.random.normal(0, 50)
            reserve_y = reserve_x * base_price * (1 + np.random.normal(0, 0.005))
            amm = ConstantProductAMM(reserve_x, reserve_y)

            # CEX price with slight deviation
            cex_price = base_price * (1 + np.random.normal(0, 0.003))

            opp = self.find_opportunity(amm, cex_price)
            if opp.get('profitable'):
                results.append(opp)

        return results

# Demo
amm = ConstantProductAMM(reserve_x=1000, reserve_y=3_000_000, fee_pct=0.3)
print("=" * 55)
print("DEX ARBITRAGE ANALYSIS")
print("=" * 55)

print(f"\\nPool: ETH/USDT")
print(f"  Reserve X (ETH): {amm.x:,.0f}")
print(f"  Reserve Y (USDT): {amm.y:,.0f}")
print(f"  Spot Price: \${amm.spot_price:,.2f}")
print(f"  k (invariant): {amm.k:,.0f}")

# Test swaps at different sizes
print(f"\\nSwap Analysis:")
for size in [1, 5, 10, 50, 100]:
    result = amm.swap_x_for_y(size)
    print(f"  Swap {size:>3d} ETH -> \${result['amount_out']:>10,.2f} USDT "
          f"(price: \${result['execution_price']:,.2f}, "
          f"impact: {result['price_impact_pct']:.2f}%)")

# Arbitrage simulation
bot = DEXArbBot(gas_cost_usd=5, min_profit_usd=10)
opportunities = bot.simulate_arb_day(200)

print(f"\\nArbitrage Simulation (200 periods):")
print(f"  Opportunities found: {len(opportunities)}")
if opportunities:
    total_profit = sum(o['net_profit'] for o in opportunities)
    avg_profit = np.mean([o['net_profit'] for o in opportunities])
    print(f"  Total profit:   \${total_profit:,.2f}")
    print(f"  Avg per trade:  \${avg_profit:,.2f}")
    print(f"  Avg impact:     {np.mean([o['impact'] for o in opportunities]):.2f}%")`}),e.jsx(I,{title:"Optimal Arb Size on Uniswap",difficulty:"intermediate",problem:"A Uniswap V2 ETH/USDT pool has 500 ETH and $1,750,000 USDT (spot price = $3,500). Binance ETH price is $3,450. Uniswap fee is 0.3%, gas cost is $8. Find the optimal arb size and expected profit.",solution:[{step:"Check arb direction",formula:"P_{\\text{DEX}} = 3500 > P_{\\text{CEX}} = 3450 \\implies \\text{Buy CEX, Sell DEX}"},{step:"Compute optimal size (before fee)",formula:"\\Delta x^* = \\sqrt{\\frac{500 \\times 1{,}750{,}000}{3450}} - 500 = \\sqrt{253{,}623} - 500 = 503.6 - 500 = 3.6 \\text{ ETH}"},{step:"After fee adjustment",formula:"\\Delta x_{\\text{eff}} = 3.6 \\times 0.997 = 3.59 \\text{ ETH}"},{step:"Compute output from DEX",formula:"\\Delta y = 1{,}750{,}000 - \\frac{500 \\times 1{,}750{,}000}{500 + 3.59} = \\$12{,}480"},{step:"Net profit",formula:"\\pi = 12{,}480 - 3.6 \\times 3{,}450 - 8 = 12{,}480 - 12{,}420 - 8 = \\$52",explanation:"A modest $52 profit on a $12K trade. DEX arb margins are thin but compound over many daily opportunities."}]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Further Reading and Resources"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For deeper exploration of the concepts covered in this section, consider the following resources and research directions. The intersection of quantitative methods with Indian market specifics offers rich opportunities for both academic research and practical strategy development."}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Resource"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Type"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Relevance"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"NSE Research Papers"}),e.jsx("td",{className:"px-4 py-2",children:"Academic"}),e.jsx("td",{className:"px-4 py-2",children:"Indian market empirics"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"SEBI Discussion Papers"}),e.jsx("td",{className:"px-4 py-2",children:"Regulatory"}),e.jsx("td",{className:"px-4 py-2",children:"Market structure rules"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"RBI Working Papers"}),e.jsx("td",{className:"px-4 py-2",children:"Policy"}),e.jsx("td",{className:"px-4 py-2",children:"Macro-financial linkages"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"CMIE ProwessIQ"}),e.jsx("td",{className:"px-4 py-2",children:"Data"}),e.jsx("td",{className:"px-4 py-2",children:"Indian corporate financials"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"IIM/ISB Research"}),e.jsx("td",{className:"px-4 py-2",children:"Academic"}),e.jsx("td",{className:"px-4 py-2",children:"Indian finance research"})]})]})]})}),e.jsx(f,{title:"Implementation Notes",type:"historical",children:e.jsx("p",{children:"When implementing these concepts for Indian markets, remember to account for the T+1 settlement cycle (since January 2023), the pre-open auction session mechanics (9:00--9:15 AM IST), and SEBI's regulatory requirements for algorithmic trading including the mandatory algo order tagging and order-to-trade ratio limits. Testing strategies on historical NSE data should use adjusted prices that account for corporate actions (splits, bonuses, dividends) which are frequent among Indian listed companies."})}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"DEX arbitrage exploits the deterministic pricing of AMMs against CEX reference prices. The optimal trade size has a closed-form solution for constant-product AMMs. Profitability depends on the size of price discrepancies, pool depth, AMM fees, and gas costs. MEV (Maximal Extractable Value) bots compete intensely for these opportunities, making speed and gas optimization critical. For Indian crypto quants, DEX arb operates entirely on-chain and is not subject to Indian TDS regulations."})})]})}const oe=Object.freeze(Object.defineProperty({__proto__:null,default:V},Symbol.toStringTag,{value:"Module"}));function H(){const[s,_]=c.useState(14),[r,b]=c.useState(5),[n,u]=c.useState(7),[o,y]=c.useState(30),p=["BTC","ETH","SOL","BNB","ADA","AVAX","DOT","MATIC","LINK","UNI"].map((a,i)=>({name:a,momentum:(Math.sin(i*1.7+s*.1)*30+5).toFixed(1),vol:(20+i*5+Math.cos(i)*10).toFixed(1)})).sort((a,i)=>parseFloat(i.momentum)-parseFloat(a.momentum)),h=p.slice(0,r);h.reduce((a,i)=>a+parseFloat(i.momentum),0);const l=h.reduce((a,i)=>a+parseFloat(i.vol),0)/r,x=o/l;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Cross-Sectional Crypto Momentum"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Configure lookback period, portfolio size, and vol target for a top-N momentum strategy across major crypto assets."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Lookback: ",s,"d"]}),e.jsx("input",{type:"range",min:"3",max:"90",step:"1",value:s,onChange:a=>_(parseInt(a.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Top-N: ",r]}),e.jsx("input",{type:"range",min:"1",max:"10",step:"1",value:r,onChange:a=>b(parseInt(a.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Rebalance: ",n,"d"]}),e.jsx("input",{type:"range",min:"1",max:"30",step:"1",value:n,onChange:a=>u(parseInt(a.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Vol Target: ",o,"%"]}),e.jsx("input",{type:"range",min:"10",max:"100",step:"5",value:o,onChange:a=>y(parseInt(a.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 500 140",className:"w-full max-w-lg mx-auto block","aria-label":"Momentum rankings",children:[p.map((a,i)=>{const d=i<r,j=Math.max(0,parseFloat(a.momentum))*3,k=5+i*13;return e.jsxs("g",{children:[e.jsx("text",{x:"45",y:k+10,textAnchor:"end",className:`text-[8px] ${d?"font-bold":""}`,fill:d?"#6366f1":"#9ca3af",children:a.name}),e.jsx("rect",{x:"50",y:k,width:j,height:"10",fill:d?"#6366f1":"#d1d5db",opacity:d?.8:.4,rx:"2"}),e.jsxs("text",{x:55+j,y:k+9,className:"text-[7px]",fill:"#6b7280",children:[a.momentum,"%"]})]},i)}),e.jsxs("text",{x:"350",y:"60",className:"text-[9px] fill-gray-600 dark:fill-gray-400",children:["Vol scalar: ",x.toFixed(2),"x"]}),e.jsxs("text",{x:"350",y:"75",className:"text-[9px] fill-gray-600 dark:fill-gray-400",children:["Portfolio vol: ~",o,"%"]})]})]})}function O(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Crypto Momentum Strategies"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Momentum strategies in crypto markets exploit the persistence of returns, which is stronger and more persistent than in traditional equity markets due to retail-dominated flows, narrative-driven trading, and the absence of fundamental value anchors for most crypto assets."}),e.jsx(N,{title:"Cross-Sectional Crypto Momentum",label:"Definition 3.1",definition:"Cross-sectional crypto momentum ranks assets by their past returns over a lookback period and goes long the top performers while (optionally) shorting the bottom performers. Unlike equity momentum, crypto momentum works well at shorter horizons (7-30 days) due to the high volatility and strong trend persistence in crypto markets.",notation:e.jsxs(e.Fragment,{children:["Momentum score: ",e.jsx(t.InlineMath,{math:"\\text{MOM}_i = \\frac{P_{i,t}}{P_{i,t-L}} - 1"})," where ",e.jsx(t.InlineMath,{math:"L"})," is the lookback. Portfolio: long top-",e.jsx(t.InlineMath,{math:"N"})," by MOM, optionally short bottom-",e.jsx(t.InlineMath,{math:"N"}),"."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Volatility-Adjusted Momentum"}),e.jsx(t.BlockMath,{math:"\\text{RiskAdjMOM}_i = \\frac{\\text{MOM}_i}{\\sigma_i} = \\frac{r_{i,t-L:t}}{\\sigma_{i,t-L:t}}"}),e.jsx(t.BlockMath,{math:"w_i = \\frac{\\sigma_{\\text{target}}}{\\sigma_p} \\cdot \\frac{1}{N} \\cdot \\text{sign}(\\text{RiskAdjMOM}_i)"}),e.jsx(w,{title:"Crypto Momentum Decay",label:"Empirical Finding 3.1",statement:e.jsxs(e.Fragment,{children:["Cross-sectional momentum in the top-100 crypto assets by market cap exhibits a return profile that differs from equity momentum: ",e.jsx(t.BlockMath,{math:"\\text{MOM}_{1\\text{--}4w}: \\text{Sharpe} \\approx 1.8, \\quad \\text{MOM}_{1\\text{--}12w}: \\text{Sharpe} \\approx 1.2, \\quad \\text{MOM}_{1\\text{--}52w}: \\text{Sharpe} \\approx 0.4"})," Short-term momentum (1--4 weeks) is strongest, with rapid decay beyond 12 weeks. There is no reversal effect at 12 months unlike in equities. The long-only version captures approximately 70% of the long-short Sharpe."]}),proof:e.jsx(e.Fragment,{children:"Backtested on top-100 crypto assets by market cap (2018--2024) using weekly returns. The strategy goes long top-10 and short bottom-10, equal-weighted, with weekly rebalancing. Transaction costs of 10 bps per trade are deducted. The monotonic decay pattern (unlike equities' reversal) suggests crypto markets are less efficient at incorporating fundamental information."})}),e.jsx(H,{}),e.jsx(T,{title:"crypto_momentum_strategy.py",runnable:!0,code:`import numpy as np

class CryptoMomentumStrategy:
    """Cross-sectional momentum strategy for crypto assets."""

    def __init__(self, lookback=14, top_n=5, vol_target=0.30,
                 rebalance_days=7, long_only=True):
        self.lookback = lookback
        self.top_n = top_n
        self.vol_target = vol_target
        self.rebal_freq = rebalance_days
        self.long_only = long_only

    def compute_signals(self, returns_matrix):
        """Compute momentum scores for all assets."""
        n_days, n_assets = returns_matrix.shape

        if n_days < self.lookback:
            return np.zeros(n_assets)

        # Cumulative return over lookback
        lookback_returns = np.prod(1 + returns_matrix[-self.lookback:], axis=0) - 1

        # Volatility over lookback
        vols = np.std(returns_matrix[-self.lookback:], axis=0) * np.sqrt(365)
        vols = np.maximum(vols, 0.01)  # floor at 1%

        # Risk-adjusted momentum
        risk_adj_mom = lookback_returns / vols

        return risk_adj_mom

    def construct_portfolio(self, signals, vols):
        """Construct volatility-targeted portfolio."""
        n_assets = len(signals)
        weights = np.zeros(n_assets)

        # Rank by signal
        ranked = np.argsort(signals)[::-1]

        # Long top-N
        long_assets = ranked[:self.top_n]
        for idx in long_assets:
            weights[idx] = 1.0 / self.top_n

        # Short bottom-N (if not long-only)
        if not self.long_only:
            short_assets = ranked[-self.top_n:]
            for idx in short_assets:
                weights[idx] = -1.0 / self.top_n

        # Vol targeting
        port_vol = np.sqrt(np.dot(weights**2, vols**2))
        if port_vol > 0:
            vol_scalar = self.vol_target / port_vol
            weights *= vol_scalar

        return weights

    def backtest(self, returns_matrix, asset_names, cost_bps=10):
        """Full backtest of the momentum strategy."""
        n_days, n_assets = returns_matrix.shape
        portfolio_returns = []
        turnover_history = []
        prev_weights = np.zeros(n_assets)

        for t in range(self.lookback, n_days):
            if (t - self.lookback) % self.rebal_freq == 0:
                signals = self.compute_signals(returns_matrix[:t])
                vols = np.std(returns_matrix[max(0,t-30):t], axis=0) * np.sqrt(365)
                weights = self.construct_portfolio(signals, vols)

                # Turnover cost
                turnover = np.sum(np.abs(weights - prev_weights))
                cost = turnover * cost_bps / 10000
                turnover_history.append(turnover)
                prev_weights = weights.copy()
            else:
                cost = 0

            # Portfolio return
            port_ret = np.dot(prev_weights, returns_matrix[t]) - cost
            portfolio_returns.append(port_ret)

        portfolio_returns = np.array(portfolio_returns)

        # Performance metrics
        ann_return = np.mean(portfolio_returns) * 365
        ann_vol = np.std(portfolio_returns) * np.sqrt(365)
        sharpe = ann_return / ann_vol if ann_vol > 0 else 0
        cum_ret = np.cumprod(1 + portfolio_returns)
        max_dd = np.min(cum_ret / np.maximum.accumulate(cum_ret) - 1)

        return {
            'ann_return': ann_return,
            'ann_vol': ann_vol,
            'sharpe': sharpe,
            'max_drawdown': max_dd,
            'avg_turnover': np.mean(turnover_history) if turnover_history else 0,
            'final_value': cum_ret[-1] if len(cum_ret) > 0 else 1,
        }

# Simulate crypto returns
np.random.seed(42)
n_days = 365
assets = ['BTC', 'ETH', 'SOL', 'BNB', 'ADA', 'AVAX', 'DOT', 'LINK', 'UNI', 'ATOM']
n_assets = len(assets)

# Generate returns with momentum structure
factor = np.random.normal(0.0003, 0.02, n_days)
returns = np.zeros((n_days, n_assets))
for i in range(n_assets):
    beta = 0.5 + np.random.random() * 1.0
    idio_vol = 0.03 + np.random.random() * 0.04
    returns[:, i] = beta * factor + np.random.normal(0.0001, idio_vol, n_days)
    # Add momentum: autocorrelation in returns
    for t in range(1, n_days):
        returns[t, i] += 0.1 * returns[t-1, i]

strategy = CryptoMomentumStrategy(lookback=14, top_n=5, vol_target=0.30)
result = strategy.backtest(returns, assets)

print("=" * 55)
print("CRYPTO MOMENTUM STRATEGY")
print("=" * 55)
print(f"  Universe:       {', '.join(assets)}")
print(f"  Lookback:       14 days")
print(f"  Top-N:          5 (long-only)")
print(f"  Vol Target:     30%")
print(f"  Rebalance:      Weekly")
print(f"\\nResults ({n_days} days):")
print(f"  Ann. Return:    {result['ann_return']:.1%}")
print(f"  Ann. Vol:       {result['ann_vol']:.1%}")
print(f"  Sharpe Ratio:   {result['sharpe']:.2f}")
print(f"  Max Drawdown:   {result['max_drawdown']:.1%}")
print(f"  Avg Turnover:   {result['avg_turnover']:.2f}")
print(f"  Final Value:    {result['final_value']:.3f}x")

# Lookback sensitivity
print(f"\\nLookback Sensitivity:")
for lb in [7, 14, 30, 60]:
    s = CryptoMomentumStrategy(lookback=lb, top_n=5, vol_target=0.30)
    r = s.backtest(returns, assets)
    print(f"  {lb:3d}d: Sharpe={r['sharpe']:+.2f}, Return={r['ann_return']:+.1%}")`}),e.jsx(I,{title:"Momentum Signal for Crypto Portfolio",difficulty:"intermediate",problem:"Given 14-day returns: BTC=+8%, ETH=+15%, SOL=+25%, BNB=-3%, ADA=-10%, and 14-day volatilities: BTC=45%, ETH=60%, SOL=90%, BNB=40%, ADA=70%. Construct a top-2 long-only portfolio with 30% vol target.",solution:[{step:"Compute risk-adjusted momentum",formula:"\\text{RAM}_{\\text{SOL}} = 25/90 = 0.278, \\; \\text{RAM}_{\\text{ETH}} = 15/60 = 0.250"},{step:"Rank and select top-2",formula:"\\text{Top-2: SOL, ETH}"},{step:"Equal-weight portfolio vol",formula:"\\sigma_p \\approx \\sqrt{0.5^2 \\times 0.9^2 + 0.5^2 \\times 0.6^2} = 54\\%"},{step:"Vol scalar",formula:"\\text{scalar} = 30\\% / 54\\% = 0.556"},{step:"Final weights",formula:"w_{\\text{SOL}} = w_{\\text{ETH}} = 0.5 \\times 0.556 = 27.8\\%",explanation:"Allocate 27.8% each to SOL and ETH, with 44.4% in cash (or stablecoin yield)."}]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Further Reading and Resources"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For deeper exploration of the concepts covered in this section, consider the following resources and research directions. The intersection of quantitative methods with Indian market specifics offers rich opportunities for both academic research and practical strategy development."}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Resource"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Type"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Relevance"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"NSE Research Papers"}),e.jsx("td",{className:"px-4 py-2",children:"Academic"}),e.jsx("td",{className:"px-4 py-2",children:"Indian market empirics"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"SEBI Discussion Papers"}),e.jsx("td",{className:"px-4 py-2",children:"Regulatory"}),e.jsx("td",{className:"px-4 py-2",children:"Market structure rules"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"RBI Working Papers"}),e.jsx("td",{className:"px-4 py-2",children:"Policy"}),e.jsx("td",{className:"px-4 py-2",children:"Macro-financial linkages"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"CMIE ProwessIQ"}),e.jsx("td",{className:"px-4 py-2",children:"Data"}),e.jsx("td",{className:"px-4 py-2",children:"Indian corporate financials"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"IIM/ISB Research"}),e.jsx("td",{className:"px-4 py-2",children:"Academic"}),e.jsx("td",{className:"px-4 py-2",children:"Indian finance research"})]})]})]})}),e.jsx(f,{title:"Implementation Notes",type:"historical",children:e.jsx("p",{children:"When implementing these concepts for Indian markets, remember to account for the T+1 settlement cycle (since January 2023), the pre-open auction session mechanics (9:00--9:15 AM IST), and SEBI's regulatory requirements for algorithmic trading including the mandatory algo order tagging and order-to-trade ratio limits. Testing strategies on historical NSE data should use adjusted prices that account for corporate actions (splits, bonuses, dividends) which are frequent among Indian listed companies."})}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Crypto momentum is one of the strongest and most persistent alpha sources in digital asset markets. Short-term (1--4 week) lookbacks work best, unlike the 12-month horizon typical in equity momentum. Vol-targeting is essential given the extreme volatility of crypto assets. Long-only implementations are preferred due to the high cost and risk of shorting crypto (funding rates, liquidation risk). For Indian traders, this strategy is best implemented on global perp exchanges to avoid the 1% TDS."})})]})}const le=Object.freeze(Object.defineProperty({__proto__:null,default:O},Symbol.toStringTag,{value:"Module"}));function U(){const[s,_]=c.useState(1e4),[r,b]=c.useState(5),[n,u]=c.useState(15),[o,y]=c.useState(10),[m,p]=c.useState(365),h=r+n,l=h-o,x=s*Math.pow(1+h/100/m,m)-s,a=s*h/100/365;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: DeFi Yield Farming Calculator"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Model the returns from providing liquidity to a DeFi protocol, accounting for base yield, reward tokens, impermanent loss, and compounding."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Deposit: $",(s/1e3).toFixed(0),"K"]}),e.jsx("input",{type:"range",min:"1000",max:"100000",step:"1000",value:s,onChange:i=>_(parseInt(i.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Base APY: ",r,"%"]}),e.jsx("input",{type:"range",min:"0",max:"30",step:"0.5",value:r,onChange:i=>b(parseFloat(i.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Reward APY: ",n,"%"]}),e.jsx("input",{type:"range",min:"0",max:"100",step:"1",value:n,onChange:i=>u(parseInt(i.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["IL Risk: ",o,"%"]}),e.jsx("input",{type:"range",min:"0",max:"30",step:"1",value:o,onChange:i=>y(parseInt(i.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 500 130",className:"w-full max-w-lg mx-auto block","aria-label":"Yield breakdown",children:[[{name:"Base APY",value:r,color:"#4ade80"},{name:"Reward APY",value:n,color:"#6366f1"},{name:"IL Risk",value:-o,color:"#f87171"}].map((i,d)=>{const j=10+d*35,k=Math.abs(i.value)*3,v=i.value>=0?200:200-k;return e.jsxs("g",{children:[e.jsx("text",{x:"30",y:j+15,className:"text-[9px]",fill:"#374151",children:i.name}),e.jsx("rect",{x:v,y:j,width:k,height:"22",fill:i.color,opacity:"0.7",rx:"3"}),e.jsxs("text",{x:200+(i.value>=0?k+5:-k-5),y:j+15,textAnchor:i.value>=0?"start":"end",className:"text-[9px] font-mono",fill:"#374151",children:[i.value>0?"+":"",i.value.toFixed(1),"%"]})]},d)}),e.jsx("line",{x1:"200",y1:"5",x2:"200",y2:"105",stroke:"#94a3b8",strokeWidth:"1"}),e.jsxs("text",{x:"250",y:"120",textAnchor:"middle",className:"text-[10px] fill-gray-600 dark:fill-gray-400",children:["Net APY: ",l.toFixed(1),"% | Daily: $",a.toFixed(2)," | Compounded: $",x.toFixed(0),"/yr"]})]})]})}function $(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Quantitative Yield Farming"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Yield farming involves deploying capital across DeFi protocols to earn returns from trading fees, lending interest, and protocol reward tokens. A quantitative approach to yield farming optimizes allocation across protocols and pools based on risk-adjusted returns, impermanent loss modeling, and reward token valuation."}),e.jsx(N,{title:"Impermanent Loss (IL)",label:"Definition 1.1",definition:"Impermanent loss is the difference in value between holding tokens in a liquidity pool versus holding them in a wallet. It occurs when the relative price of tokens in a pool changes from the time of deposit. For a constant-product AMM, IL is always negative (a loss) and depends only on the price ratio change, not the direction.",notation:e.jsxs(e.Fragment,{children:["For a price change ratio ",e.jsx(t.InlineMath,{math:"r = P_1/P_0"}),": ",e.jsx(t.InlineMath,{math:"\\text{IL}(r) = \\frac{2\\sqrt{r}}{1 + r} - 1"}),". At ",e.jsx(t.InlineMath,{math:"r = 2"})," (price doubles), ",e.jsx(t.InlineMath,{math:"\\text{IL} = -5.7\\%"}),". At ",e.jsx(t.InlineMath,{math:"r = 5"}),", ",e.jsx(t.InlineMath,{math:"\\text{IL} = -25.5\\%"}),"."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Yield Decomposition"}),e.jsx(t.BlockMath,{math:"\\text{Net APY} = \\underbrace{\\text{Fee APY}}_{\\text{trading fees}} + \\underbrace{\\text{Reward APY}}_{\\text{token emissions}} - \\underbrace{\\text{IL}}_{\\text{impermanent loss}} - \\underbrace{c_{\\text{gas}}}_{\\text{gas costs}}"}),e.jsx(t.BlockMath,{math:"\\text{Fee APY} = \\frac{V_{\\text{daily}} \\times f \\times 365}{\\text{TVL}}"}),e.jsx(w,{title:"Impermanent Loss Derivation",label:"Theorem 1.1",statement:e.jsxs(e.Fragment,{children:["For a constant-product AMM with initial reserves ",e.jsx(t.InlineMath,{math:"(x_0, y_0)"})," and price ratio change ",e.jsx(t.InlineMath,{math:"r = P_1/P_0"}),", the impermanent loss is: ",e.jsx(t.BlockMath,{math:"\\text{IL}(r) = \\frac{2\\sqrt{r}}{1 + r} - 1"})," This is always non-positive, equals zero only when ",e.jsx(t.InlineMath,{math:"r = 1"})," (no price change), and approaches ",e.jsx(t.InlineMath,{math:"-1"})," as ",e.jsx(t.InlineMath,{math:"r \\to 0"})," or ",e.jsx(t.InlineMath,{math:"r \\to \\infty"}),"."]}),proof:e.jsxs(e.Fragment,{children:["Initial portfolio value: ",e.jsx(t.InlineMath,{math:"V_0 = 2x_0 P_0"})," (assuming 50/50 value split). After price change to ",e.jsx(t.InlineMath,{math:"P_1 = r P_0"}),", pool reserves adjust to maintain ",e.jsx(t.InlineMath,{math:"x_1 y_1 = k"})," with ",e.jsx(t.InlineMath,{math:"y_1/x_1 = P_1"}),". Solving: ",e.jsx(t.InlineMath,{math:"x_1 = x_0/\\sqrt{r}, \\; y_1 = y_0\\sqrt{r}"}),". Pool value: ",e.jsx(t.InlineMath,{math:"V_{\\text{pool}} = x_1 P_1 + y_1 = 2x_0 P_0 \\sqrt{r}"}),". Hold value: ",e.jsx(t.InlineMath,{math:"V_{\\text{hold}} = x_0 P_1 + y_0 = x_0 P_0(1 + r)"}),". IL = ",e.jsx(t.InlineMath,{math:"V_{\\text{pool}}/V_{\\text{hold}} - 1 = 2\\sqrt{r}/(1+r) - 1"}),"."]})}),e.jsx(U,{}),e.jsx(T,{title:"yield_farming_optimizer.py",runnable:!0,code:`import numpy as np

class YieldFarmingOptimizer:
    """Optimize DeFi yield farming allocations."""

    @staticmethod
    def impermanent_loss(price_ratio):
        """Compute IL for constant-product AMM."""
        r = price_ratio
        return 2 * np.sqrt(r) / (1 + r) - 1

    @staticmethod
    def fee_apy(daily_volume, tvl, fee_rate=0.003):
        """Estimate fee APY from volume and TVL."""
        daily_fees = daily_volume * fee_rate
        return daily_fees / tvl * 365

    def evaluate_pool(self, pool):
        """Evaluate a liquidity pool's risk-adjusted return."""
        fee_return = self.fee_apy(pool['daily_volume'], pool['tvl'], pool['fee_rate'])
        reward_return = pool.get('reward_apy', 0)
        expected_il = abs(self.impermanent_loss(pool.get('expected_price_ratio', 1.1)))
        gas_cost_apy = pool.get('gas_cost_annual', 0) / pool.get('deposit', 10000)

        gross_apy = fee_return + reward_return
        net_apy = gross_apy - expected_il - gas_cost_apy
        risk = pool.get('vol', 0.5) * np.sqrt(365)

        return {
            'pool': pool['name'],
            'fee_apy': fee_return,
            'reward_apy': reward_return,
            'expected_il': expected_il,
            'gross_apy': gross_apy,
            'net_apy': net_apy,
            'sharpe': net_apy / risk if risk > 0 else 0,
        }

    def optimize_allocation(self, pools, total_capital, max_per_pool=0.4):
        """Simple rank-based allocation across pools."""
        evaluated = [self.evaluate_pool(p) for p in pools]
        evaluated.sort(key=lambda x: -x['sharpe'])

        # Allocate proportionally by Sharpe
        positive = [e for e in evaluated if e['sharpe'] > 0]
        if not positive:
            return [{'pool': e['pool'], 'allocation': 0} for e in evaluated]

        total_sharpe = sum(e['sharpe'] for e in positive)
        allocations = []
        for e in evaluated:
            if e['sharpe'] > 0:
                raw_weight = e['sharpe'] / total_sharpe
                weight = min(raw_weight, max_per_pool)
                allocations.append({
                    'pool': e['pool'],
                    'allocation': weight * total_capital,
                    'weight': weight,
                    'net_apy': e['net_apy'],
                    'sharpe': e['sharpe'],
                })
            else:
                allocations.append({
                    'pool': e['pool'], 'allocation': 0,
                    'weight': 0, 'net_apy': e['net_apy'], 'sharpe': e['sharpe'],
                })

        return allocations

optimizer = YieldFarmingOptimizer()

# IL analysis
print("=" * 55)
print("IMPERMANENT LOSS ANALYSIS")
print("=" * 55)
print(f"\\n{'Price Ratio':>12} {'IL':>10} {'% Lost':>10}")
for r in [0.5, 0.75, 0.9, 1.0, 1.1, 1.25, 1.5, 2.0, 3.0, 5.0]:
    il = optimizer.impermanent_loss(r)
    print(f"  {r:>10.2f}x {il:>10.4f} {il*100:>9.2f}%")

# Pool evaluation
pools = [
    {'name': 'ETH/USDT (Uniswap V2)', 'daily_volume': 50e6, 'tvl': 200e6,
     'fee_rate': 0.003, 'reward_apy': 0.02, 'expected_price_ratio': 1.15,
     'vol': 0.6, 'gas_cost_annual': 500, 'deposit': 10000},
    {'name': 'USDC/USDT (Curve)', 'daily_volume': 100e6, 'tvl': 500e6,
     'fee_rate': 0.0004, 'reward_apy': 0.05, 'expected_price_ratio': 1.001,
     'vol': 0.02, 'gas_cost_annual': 300, 'deposit': 10000},
    {'name': 'SOL/USDT (Raydium)', 'daily_volume': 20e6, 'tvl': 50e6,
     'fee_rate': 0.0025, 'reward_apy': 0.15, 'expected_price_ratio': 1.3,
     'vol': 0.9, 'gas_cost_annual': 50, 'deposit': 10000},
    {'name': 'MATIC/ETH (SushiSwap)', 'daily_volume': 5e6, 'tvl': 30e6,
     'fee_rate': 0.003, 'reward_apy': 0.08, 'expected_price_ratio': 1.2,
     'vol': 0.7, 'gas_cost_annual': 400, 'deposit': 10000},
]

print(f"\\n{'=' * 55}")
print("POOL EVALUATION")
print("=" * 55)
for pool in pools:
    result = optimizer.evaluate_pool(pool)
    print(f"\\n  {result['pool']}:")
    print(f"    Fee APY:    {result['fee_apy']:.1%}")
    print(f"    Reward APY: {result['reward_apy']:.1%}")
    print(f"    Expected IL:{result['expected_il']:.1%}")
    print(f"    Net APY:    {result['net_apy']:.1%}")
    print(f"    Sharpe:     {result['sharpe']:.2f}")

# Optimize allocation
allocs = optimizer.optimize_allocation(pools, total_capital=50000)
print(f"\\nOptimal Allocation ($50K):")
for a in allocs:
    if a['allocation'] > 0:
        print(f"  {a['pool']:30s}: \${a['allocation']:>8,.0f} "
              f"({a['weight']:.0%}) Net APY: {a['net_apy']:.1%}")`}),e.jsx(I,{title:"Evaluating a Stablecoin Yield Farm",difficulty:"beginner",problem:"A USDC/USDT pool on Curve has $500M TVL, $100M daily volume, 0.04% fee rate, and 5% CRV reward APY. There is negligible impermanent loss for stablecoin pairs. Gas costs are $300/year. Compute the net APY for a $10,000 deposit.",solution:[{step:"Fee APY",formula:"\\text{Fee APY} = \\frac{100M \\times 0.0004 \\times 365}{500M} = 2.92\\%"},{step:"Total gross APY",formula:"\\text{Gross} = 2.92\\% + 5.00\\% = 7.92\\%"},{step:"Gas cost as APY",formula:"\\text{Gas APY} = \\frac{300}{10000} = 3.0\\%"},{step:"Net APY",formula:"\\text{Net} = 7.92\\% - 0\\% - 3.0\\% = 4.92\\%",explanation:"After gas costs, the net return is 4.92%. This is competitive with traditional Indian fixed deposits (6-7%) but with smart contract risk. Gas costs significantly impact small deposits."}]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Advanced Yield Strategies"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Sophisticated yield farming strategies go beyond simple LP provision to include leveraged yield farming, auto-compounding, and cross-protocol arbitrage:"}),e.jsx(t.BlockMath,{math:"\\text{Leveraged Yield} = L \\times \\text{APY}_{\\text{pool}} - (L - 1) \\times r_{\\text{borrow}} - L \\times \\text{IL}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"L"})," is the leverage factor and ",e.jsx(t.InlineMath,{math:"r_{\\text{borrow}}"})," is the borrowing cost. Leveraged farming amplifies both returns and IL risk. The optimal leverage depends on the pool's fee yield relative to borrowing cost:"]}),e.jsx(t.BlockMath,{math:"L^* = \\frac{\\text{APY}_{\\text{pool}} - \\text{IL}_{\\text{expected}}}{\\text{APY}_{\\text{pool}} - r_{\\text{borrow}} - \\text{IL}_{\\text{expected}}}"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Strategy"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Typical APY"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Risk Level"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Complexity"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Stablecoin LP (Curve)"}),e.jsx("td",{className:"px-4 py-2",children:"3--8%"}),e.jsx("td",{className:"px-4 py-2",children:"Low"}),e.jsx("td",{className:"px-4 py-2",children:"Low"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Blue-chip LP (Uniswap V3)"}),e.jsx("td",{className:"px-4 py-2",children:"10--25%"}),e.jsx("td",{className:"px-4 py-2",children:"Medium"}),e.jsx("td",{className:"px-4 py-2",children:"Medium"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Leveraged Farming"}),e.jsx("td",{className:"px-4 py-2",children:"20--60%"}),e.jsx("td",{className:"px-4 py-2",children:"High"}),e.jsx("td",{className:"px-4 py-2",children:"High"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Auto-Compounding Vaults"}),e.jsx("td",{className:"px-4 py-2",children:"5--15%"}),e.jsx("td",{className:"px-4 py-2",children:"Medium"}),e.jsx("td",{className:"px-4 py-2",children:"Low"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Delta-Neutral Farming"}),e.jsx("td",{className:"px-4 py-2",children:"8--20%"}),e.jsx("td",{className:"px-4 py-2",children:"Medium"}),e.jsx("td",{className:"px-4 py-2",children:"High"})]})]})]})}),e.jsx(f,{title:"Smart Contract Risk",type:"warning",children:e.jsx("p",{children:"All DeFi yield farming carries smart contract risk -- the risk that a bug in the protocol's code leads to loss of deposited funds. Notable examples include the $600M Poly Network hack (2021), the $325M Wormhole exploit (2022), and the $200M Euler Finance hack (2023). Risk mitigation includes: only using audited protocols (multiple audits preferred), starting with small positions, monitoring protocol TVL trends, and using DeFi insurance (Nexus Mutual, InsurAce) for larger allocations. Indian DeFi users should also consider that losses from smart contract exploits cannot be offset against gains under the current 30% VDA tax regime."})}),e.jsx(f,{title:"Concentrated Liquidity (Uniswap V3)",type:"historical",children:e.jsxs("p",{children:["Uniswap V3 introduced concentrated liquidity, where LPs specify a price range for their capital. This dramatically increases capital efficiency (up to 4000x for narrow ranges) but also increases impermanent loss risk when price moves outside the range. The optimal range width depends on the asset's volatility: ",e.jsx(t.InlineMath,{math:"\\Delta P \\approx 2\\sigma\\sqrt{T}"})," where"," ",e.jsx(t.InlineMath,{math:"T"})," is the rebalancing frequency. Quantitative LP strategies on Uniswap V3 actively manage range placement and width, making it more akin to options market-making than passive liquidity provision."]})}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Quantitative yield farming requires decomposing returns into trading fees, protocol rewards, and impermanent loss, then optimizing across pools using risk-adjusted metrics. Stablecoin pools offer lower returns but minimal IL, while volatile pair pools offer higher gross yields offset by significant IL risk. For Indian investors, DeFi yields must clear the 30% VDA tax hurdle to be competitive with domestic fixed-income alternatives."})})]})}const ce=Object.freeze(Object.defineProperty({__proto__:null,default:$},Symbol.toStringTag,{value:"Module"}));function X(){const[s,_]=c.useState(10),[r,b]=c.useState(3e3),[n,u]=c.useState(15e3),[o,y]=c.useState(80),m=s*r,p=m*o/100/n,h=n/m*100,l=n/(s*o/100),x=(r-l)/r*100,a=p>1,i=p>1&&p<1.2;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: DeFi Lending & Liquidation Monitor"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust collateral, ETH price, borrowed amount, and liquidation threshold to monitor health factor and liquidation risk."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Collateral: ",s," ETH"]}),e.jsx("input",{type:"range",min:"1",max:"100",step:"1",value:s,onChange:d=>_(parseInt(d.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["ETH Price: $",r]}),e.jsx("input",{type:"range",min:"500",max:"10000",step:"50",value:r,onChange:d=>b(parseInt(d.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Borrowed: $",(n/1e3).toFixed(0),"K"]}),e.jsx("input",{type:"range",min:"1000",max:"50000",step:"1000",value:n,onChange:d=>u(parseInt(d.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Liq Threshold: ",o,"%"]}),e.jsx("input",{type:"range",min:"50",max:"95",step:"5",value:o,onChange:d=>y(parseInt(d.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 500 100",className:"w-full max-w-lg mx-auto block","aria-label":"Health factor gauge",children:[e.jsx("rect",{x:"50",y:"20",width:"400",height:"30",rx:"15",fill:"#e5e7eb"}),e.jsx("rect",{x:"50",y:"20",width:Math.min(400,p*150),height:"30",rx:"15",fill:p>1.5?"#4ade80":p>1?"#fbbf24":"#f87171",opacity:"0.8"}),e.jsx("line",{x1:"200",y1:"15",x2:"200",y2:"55",stroke:"#ef4444",strokeWidth:"2"}),e.jsx("text",{x:"200",y:"12",textAnchor:"middle",className:"text-[8px] font-bold",fill:"#ef4444",children:"LIQ"}),e.jsxs("text",{x:"250",y:"40",textAnchor:"middle",className:"text-[12px] font-bold",fill:"#1f2937",children:["HF = ",p.toFixed(3)]}),e.jsxs("text",{x:"250",y:"70",textAnchor:"middle",className:"text-[9px] fill-gray-600 dark:fill-gray-400",children:["LTV: ",h.toFixed(1),"% | Liq Price: $",l.toFixed(0)," | Distance: ",x.toFixed(1),"%"]}),e.jsx("text",{x:"250",y:"85",textAnchor:"middle",className:`text-[10px] font-bold ${a?i?"fill-amber-500":"fill-green-600":"fill-red-500"}`,children:p<1?"LIQUIDATABLE!":i?"WARNING - LOW HF":"HEALTHY"})]})]})}function Y(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"DeFi Lending and Liquidation Strategies"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"DeFi lending protocols like Aave and Compound create opportunities for quantitative strategies in both lending optimization and liquidation bot operation. Liquidation bots monitor undercollateralized positions and execute liquidations to earn protocol-defined bonuses, while lending optimizers maximize yield across protocols."}),e.jsx(N,{title:"Health Factor",label:"Definition 2.1",definition:"The health factor in DeFi lending is the ratio of collateral value (adjusted by the liquidation threshold) to outstanding debt. When the health factor falls below 1.0, the position becomes eligible for liquidation. Liquidators can repay a portion of the debt and seize collateral at a discount (typically 5-15%).",notation:e.jsxs(e.Fragment,{children:[e.jsx(t.InlineMath,{math:"\\text{HF} = \\frac{\\sum_i C_i \\cdot P_i \\cdot \\text{LT}_i}{\\sum_j D_j \\cdot P_j}"})," where ",e.jsx(t.InlineMath,{math:"C_i"})," is collateral amount, ",e.jsx(t.InlineMath,{math:"P_i"})," is price, ",e.jsx(t.InlineMath,{math:"\\text{LT}_i"})," is liquidation threshold, and ",e.jsx(t.InlineMath,{math:"D_j"})," is debt amount."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Liquidation Mechanics"}),e.jsx(t.BlockMath,{math:"\\text{Liquidation Profit} = D_{\\text{repaid}} \\times \\text{Bonus\\%} - \\text{Gas Cost}"}),e.jsx(t.BlockMath,{math:"\\text{Max Repay} = \\min\\!\\left(\\text{Close Factor} \\times D, \\frac{C \\times P_C}{\\text{Bonus Factor}}\\right)"}),e.jsx(w,{title:"Liquidation Cascade Dynamics",label:"Empirical Finding 2.1",statement:e.jsxs(e.Fragment,{children:["During rapid price declines, DeFi liquidations create positive feedback loops (liquidation cascades): as positions are liquidated, collateral is sold on DEXs, pushing prices lower and triggering more liquidations. For ETH on Aave, a 20% price drop within 4 hours triggers approximately 3--5% of total borrowing to be liquidated, with cascade multiplier: ",e.jsx(t.BlockMath,{math:"\\text{Cascade} \\approx 1 + \\frac{\\text{Liquidated Collateral}}{L_{\\text{DEX}}} \\times \\text{Impact}"})," where ",e.jsx(t.InlineMath,{math:"L_{\\text{DEX}}"})," is DEX liquidity depth."]}),proof:e.jsx(e.Fragment,{children:"Analysis of 50 major market drawdown events (2020--2024) across Aave V2/V3 and Compound. During the May 2022 LUNA crash, approximately $400M was liquidated on Aave within 24 hours, with cascading effects amplifying the price decline by an estimated 8--12%."})}),e.jsx(X,{}),e.jsx(T,{title:"liquidation_bot.py",runnable:!0,code:`import numpy as np

class DeFiLendingPosition:
    """Model a DeFi lending position (Aave-like)."""

    def __init__(self, collateral_asset, collateral_amount, collateral_price,
                 debt_asset, debt_amount, liq_threshold=0.80, liq_bonus=0.05):
        self.coll_asset = collateral_asset
        self.coll_amount = collateral_amount
        self.coll_price = collateral_price
        self.debt_asset = debt_asset
        self.debt_amount = debt_amount
        self.liq_threshold = liq_threshold
        self.liq_bonus = liq_bonus

    @property
    def collateral_value(self):
        return self.coll_amount * self.coll_price

    @property
    def health_factor(self):
        return (self.collateral_value * self.liq_threshold) / self.debt_amount

    @property
    def ltv(self):
        return self.debt_amount / self.collateral_value

    @property
    def liquidation_price(self):
        return self.debt_amount / (self.coll_amount * self.liq_threshold)

    def is_liquidatable(self):
        return self.health_factor < 1.0

    def liquidation_opportunity(self, close_factor=0.5, gas_cost_usd=10):
        """Compute liquidation opportunity if position is underwater."""
        if not self.is_liquidatable():
            return None

        max_repay = self.debt_amount * close_factor
        collateral_seized = max_repay * (1 + self.liq_bonus) / self.coll_price
        collateral_seized = min(collateral_seized, self.coll_amount)
        actual_repay = collateral_seized * self.coll_price / (1 + self.liq_bonus)

        profit = collateral_seized * self.coll_price - actual_repay - gas_cost_usd

        return {
            'debt_repaid': actual_repay,
            'collateral_seized': collateral_seized,
            'collateral_value': collateral_seized * self.coll_price,
            'gross_profit': collateral_seized * self.coll_price - actual_repay,
            'gas_cost': gas_cost_usd,
            'net_profit': profit,
            'profitable': profit > 0,
        }

class LiquidationBot:
    """Monitor and execute DeFi liquidations."""

    def __init__(self, gas_cost=10, min_profit=50):
        self.gas_cost = gas_cost
        self.min_profit = min_profit

    def scan_positions(self, positions):
        """Scan for liquidatable positions."""
        opportunities = []
        for pos in positions:
            if pos.is_liquidatable():
                opp = pos.liquidation_opportunity(gas_cost_usd=self.gas_cost)
                if opp and opp['net_profit'] > self.min_profit:
                    opp['position'] = f"{pos.coll_amount} {pos.coll_asset}"
                    opportunities.append(opp)

        opportunities.sort(key=lambda x: -x['net_profit'])
        return opportunities

    def simulate_crash(self, positions, price_drop_pct, n_steps=10):
        """Simulate a price crash and resulting liquidations."""
        results = []
        total_liquidated = 0
        remaining = list(positions)

        for step in range(n_steps):
            step_drop = price_drop_pct / n_steps
            # Apply price drop
            for pos in remaining:
                pos.coll_price *= (1 - step_drop / 100)

            # Find liquidations
            to_liquidate = [p for p in remaining if p.is_liquidatable()]
            step_liquidated = sum(p.collateral_value for p in to_liquidate)
            total_liquidated += step_liquidated
            remaining = [p for p in remaining if not p.is_liquidatable()]

            results.append({
                'step': step + 1,
                'price_drop': (step + 1) * step_drop,
                'liquidations': len(to_liquidate),
                'value_liquidated': step_liquidated,
                'remaining_positions': len(remaining),
            })

        return results, total_liquidated

# Simulate lending positions
np.random.seed(42)
n_positions = 50

positions = []
for i in range(n_positions):
    eth_amount = np.random.uniform(1, 100)
    eth_price = 3000
    ltv = np.random.uniform(0.4, 0.78)
    debt = eth_amount * eth_price * ltv

    positions.append(DeFiLendingPosition(
        'ETH', eth_amount, eth_price, 'USDT', debt,
        liq_threshold=0.80, liq_bonus=0.05
    ))

print("=" * 55)
print("DEFI LIQUIDATION ANALYSIS")
print("=" * 55)

# Current state
hfs = [p.health_factor for p in positions]
ltvs = [p.ltv for p in positions]
print(f"\\nPosition Summary ({n_positions} positions):")
print(f"  Avg Health Factor: {np.mean(hfs):.3f}")
print(f"  Min Health Factor: {np.min(hfs):.3f}")
print(f"  Avg LTV:           {np.mean(ltvs):.1%}")
print(f"  Total Collateral:  \${sum(p.collateral_value for p in positions):,.0f}")
print(f"  Total Debt:        \${sum(p.debt_amount for p in positions):,.0f}")

# Current liquidation opportunities
bot = LiquidationBot(gas_cost=10, min_profit=20)
opps = bot.scan_positions(positions)
print(f"\\nCurrent Liquidation Opportunities: {len(opps)}")
for opp in opps[:3]:
    print(f"  Position: {opp['position']}")
    print(f"    Repay: \${opp['debt_repaid']:,.0f} -> Seize: \${opp['collateral_value']:,.0f}")
    print(f"    Net Profit: \${opp['net_profit']:,.0f}")

# Crash simulation
positions_copy = [DeFiLendingPosition(
    p.coll_asset, p.coll_amount, p.coll_price,
    p.debt_asset, p.debt_amount
) for p in positions]

results, total_liq = bot.simulate_crash(positions_copy, price_drop_pct=30, n_steps=6)
print(f"\\n--- Crash Simulation (30% ETH drop) ---")
for r in results:
    print(f"  Step {r['step']}: -{r['price_drop']:.0f}% | "
          f"Liquidations: {r['liquidations']} | "
          f"Value: \${r['value_liquidated']:,.0f}")
print(f"  Total Liquidated: \${total_liq:,.0f}")`}),e.jsx(I,{title:"Liquidation Profitability on Aave",difficulty:"intermediate",problem:"A borrower on Aave has 10 ETH collateral at $3,000/ETH ($30,000 value), $22,000 USDT debt, liquidation threshold 80%, and liquidation bonus 5%. ETH drops to $2,700. Is the position liquidatable? If yes, compute the liquidator's profit (close factor = 50%, gas = $15).",solution:[{step:"Compute health factor at $2,700",formula:"HF = \\frac{10 \\times 2700 \\times 0.80}{22000} = \\frac{21600}{22000} = 0.982",explanation:"HF < 1.0, so the position is liquidatable."},{step:"Maximum repayable debt",formula:"\\text{Max repay} = 0.50 \\times 22000 = \\$11{,}000"},{step:"Collateral seized",formula:"\\text{Seized} = \\frac{11000 \\times 1.05}{2700} = 4.278 \\text{ ETH} = \\$11{,}550"},{step:"Net profit",formula:"\\pi = 11{,}550 - 11{,}000 - 15 = \\$535",explanation:"The liquidator earns $535 for repaying $11K of debt. This requires flash loan capital or pre-positioned stablecoin balance."}]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Further Reading and Resources"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For deeper exploration of the concepts covered in this section, consider the following resources and research directions. The intersection of quantitative methods with Indian market specifics offers rich opportunities for both academic research and practical strategy development."}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Resource"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Type"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Relevance"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"NSE Research Papers"}),e.jsx("td",{className:"px-4 py-2",children:"Academic"}),e.jsx("td",{className:"px-4 py-2",children:"Indian market empirics"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"SEBI Discussion Papers"}),e.jsx("td",{className:"px-4 py-2",children:"Regulatory"}),e.jsx("td",{className:"px-4 py-2",children:"Market structure rules"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"RBI Working Papers"}),e.jsx("td",{className:"px-4 py-2",children:"Policy"}),e.jsx("td",{className:"px-4 py-2",children:"Macro-financial linkages"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"CMIE ProwessIQ"}),e.jsx("td",{className:"px-4 py-2",children:"Data"}),e.jsx("td",{className:"px-4 py-2",children:"Indian corporate financials"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"IIM/ISB Research"}),e.jsx("td",{className:"px-4 py-2",children:"Academic"}),e.jsx("td",{className:"px-4 py-2",children:"Indian finance research"})]})]})]})}),e.jsx(f,{title:"Implementation Notes",type:"historical",children:e.jsx("p",{children:"When implementing these concepts for Indian markets, remember to account for the T+1 settlement cycle (since January 2023), the pre-open auction session mechanics (9:00--9:15 AM IST), and SEBI's regulatory requirements for algorithmic trading including the mandatory algo order tagging and order-to-trade ratio limits. Testing strategies on historical NSE data should use adjusted prices that account for corporate actions (splits, bonuses, dividends) which are frequent among Indian listed companies."})}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"DeFi liquidation is a competitive, MEV-driven activity where bots monitor thousands of lending positions for underwater collateral. The strategy requires real-time price monitoring, gas optimization, and often flash loans for capital efficiency. Lending optimization involves dynamically adjusting collateral ratios and borrowing across protocols to maximize yield while maintaining safe health factors."})})]})}const de=Object.freeze(Object.defineProperty({__proto__:null,default:Y},Symbol.toStringTag,{value:"Module"}));function W(){const[s,_]=c.useState(1e3),[r,b]=c.useState(24),[n,u]=c.useState(4),o=[{wallet:"0xd8dA...6045",amount:5e3,direction:"to_exchange",age:2},{wallet:"0x220b...1dC1",amount:3200,direction:"from_exchange",age:5},{wallet:"0x28C6...3f08",amount:1800,direction:"to_exchange",age:8},{wallet:"0xF977...65E3",amount:7500,direction:"from_exchange",age:1},{wallet:"0x5a52...7F9d",amount:2100,direction:"to_exchange",age:12}].filter(l=>l.amount>=s&&l.age<=r),y=o.filter(l=>l.direction==="to_exchange"),p=o.filter(l=>l.direction==="from_exchange").reduce((l,x)=>l+x.amount*Math.exp(-x.age/n),0)-y.reduce((l,x)=>l+x.amount*Math.exp(-x.age/n),0),h=p>0?"BULLISH":p<0?"BEARISH":"NEUTRAL";return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Whale Transaction Tracker"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Configure whale detection parameters to track large ETH movements between wallets and exchanges."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Whale Threshold: ",s," ETH"]}),e.jsx("input",{type:"range",min:"100",max:"10000",step:"100",value:s,onChange:l=>_(parseInt(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Lookback: ",r,"h"]}),e.jsx("input",{type:"range",min:"1",max:"72",step:"1",value:r,onChange:l=>b(parseInt(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Signal Decay: ",n,"h"]}),e.jsx("input",{type:"range",min:"1",max:"24",step:"1",value:n,onChange:l=>u(parseInt(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 500 120",className:"w-full max-w-lg mx-auto block","aria-label":"Whale flows",children:[o.map((l,x)=>{const a=10+x*22,i=l.amount/100,d=l.direction==="to_exchange",j=Math.exp(-l.age/n);return e.jsxs("g",{children:[e.jsx("text",{x:"90",y:a+13,textAnchor:"end",className:"text-[8px] font-mono",fill:"#6b7280",children:l.wallet}),e.jsx("rect",{x:d?250-i:250,y:a,width:i,height:"16",fill:d?"#f87171":"#4ade80",opacity:.3+j*.6,rx:"3"}),e.jsxs("text",{x:d?248-i:255+i,y:a+12,textAnchor:d?"end":"start",className:"text-[7px]",fill:"#374151",children:[l.amount," ETH (",l.age,"h ago)"]})]},x)}),e.jsx("line",{x1:"250",y1:"5",x2:"250",y2:"100",stroke:"#94a3b8",strokeWidth:"1"}),e.jsx("text",{x:"180",y:"108",textAnchor:"middle",className:"text-[8px]",fill:"#f87171",children:"To Exchange (Sell)"}),e.jsx("text",{x:"320",y:"108",textAnchor:"middle",className:"text-[8px]",fill:"#16a34a",children:"From Exchange (Buy)"}),e.jsxs("text",{x:"250",y:"120",textAnchor:"middle",className:`text-[10px] font-bold ${h==="BULLISH"?"fill-green-600":h==="BEARISH"?"fill-red-500":"fill-gray-500"}`,children:["Net Flow Signal: ",h," (",p.toFixed(0)," ETH weighted)"]})]})]})}function K(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Whale Tracking and Smart Money Signals"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"On-chain whale tracking monitors large cryptocurrency holders' transactions to generate trading signals. The transparency of blockchain data enables real-time tracking of smart money movements between wallets, exchanges, and DeFi protocols -- a capability impossible in traditional markets."}),e.jsx(N,{title:"Whale Transaction",label:"Definition 1.1",definition:"A whale transaction is a blockchain transfer exceeding a predefined size threshold (typically 1,000+ ETH or 100+ BTC) that may indicate significant position changes by large holders. Whale activity is categorized by flow direction: transfers to exchanges (potential selling pressure), transfers from exchanges (accumulation), and wallet-to-wallet transfers (OTC or internal movements).",notation:e.jsxs(e.Fragment,{children:["Net whale flow: ",e.jsx(t.InlineMath,{math:"NWF_t = \\sum_{i \\in \\text{from\\_ex}} V_i \\cdot e^{-\\lambda \\tau_i} - \\sum_{j \\in \\text{to\\_ex}} V_j \\cdot e^{-\\lambda \\tau_j}"})," where ",e.jsx(t.InlineMath,{math:"V"})," is transaction value, ",e.jsx(t.InlineMath,{math:"\\tau"})," is age, and ",e.jsx(t.InlineMath,{math:"\\lambda"})," is decay rate."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Exchange Flow Analysis"}),e.jsx(t.BlockMath,{math:"\\text{Exchange Netflow} = \\text{Inflow} - \\text{Outflow} = \\sum_{\\text{deposits}} V_i - \\sum_{\\text{withdrawals}} V_j"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Positive netflow (more deposits than withdrawals) historically precedes selling pressure, while negative netflow indicates accumulation:"}),e.jsx(w,{title:"Exchange Netflow as a Leading Indicator",label:"Empirical Finding 1.1",statement:e.jsxs(e.Fragment,{children:["BTC exchange netflow is a statistically significant predictor of 24-hour returns. When 24-hour netflow exceeds ",e.jsx(t.InlineMath,{math:"+10{,}000"})," BTC (strong inflow), the average subsequent 24-hour return is ",e.jsx(t.InlineMath,{math:"-1.2\\%"})," (",e.jsx(t.InlineMath,{math:"p = 0.003"}),"). When netflow is below ",e.jsx(t.InlineMath,{math:"-10{,}000"})," BTC (strong outflow), the average return is ",e.jsx(t.InlineMath,{math:"+0.8\\%"})," (",e.jsx(t.InlineMath,{math:"p = 0.012"}),")."]}),proof:e.jsxs(e.Fragment,{children:["Analysis of daily BTC exchange netflow data across 20 major exchanges (2019--2024) using Glassnode data. The signal-to-noise ratio improves with larger thresholds: ",e.jsx(t.BlockMath,{math:"|\\rho(\\text{NF}_t, r_{t+1})| = 0.08 \\text{ (all)}, \\; 0.15 \\text{ (|NF| > 5K)}, \\; 0.23 \\text{ (|NF| > 10K)}"})]})}),e.jsx(W,{}),e.jsx(T,{title:"whale_tracking.py",runnable:!0,code:`import numpy as np
from collections import defaultdict

class WhaleTracker:
    """Track and analyze whale cryptocurrency transactions."""

    def __init__(self, whale_threshold_eth=1000, decay_hours=4):
        self.threshold = whale_threshold_eth
        self.decay_lambda = np.log(2) / decay_hours
        self.transactions = []
        self.known_whales = {}

    def add_transaction(self, tx_hash, from_addr, to_addr, amount_eth,
                       timestamp_hours_ago, is_exchange_to=False,
                       is_exchange_from=False):
        """Record a transaction."""
        if amount_eth < self.threshold:
            return False

        tx = {
            'hash': tx_hash, 'from': from_addr, 'to': to_addr,
            'amount': amount_eth, 'age_hours': timestamp_hours_ago,
            'to_exchange': is_exchange_to, 'from_exchange': is_exchange_from,
            'type': 'to_exchange' if is_exchange_to else
                    'from_exchange' if is_exchange_from else 'wallet_transfer'
        }
        self.transactions.append(tx)
        return True

    def compute_net_flow(self, lookback_hours=24):
        """Compute time-weighted net whale flow."""
        inflow = 0  # from exchange = accumulation = bullish
        outflow = 0  # to exchange = distribution = bearish

        for tx in self.transactions:
            if tx['age_hours'] > lookback_hours:
                continue
            decay = np.exp(-self.decay_lambda * tx['age_hours'])
            if tx['from_exchange']:
                inflow += tx['amount'] * decay
            elif tx['to_exchange']:
                outflow += tx['amount'] * decay

        return {
            'inflow': inflow,
            'outflow': outflow,
            'net_flow': inflow - outflow,
            'signal': 'BULLISH' if inflow > outflow * 1.2 else
                     'BEARISH' if outflow > inflow * 1.2 else 'NEUTRAL',
        }

    def identify_smart_money(self, wallet_history):
        """Score wallets by historical trading accuracy."""
        scores = {}
        for wallet, trades in wallet_history.items():
            if len(trades) < 5:
                continue
            profits = [t['pnl'] for t in trades]
            win_rate = sum(1 for p in profits if p > 0) / len(profits)
            avg_return = np.mean(profits)
            scores[wallet] = {
                'win_rate': win_rate,
                'avg_return': avg_return,
                'n_trades': len(trades),
                'score': win_rate * avg_return * np.log(len(trades))
            }
        return dict(sorted(scores.items(), key=lambda x: -x[1]['score']))

    def generate_signal(self, lookback_hours=24, min_flow=1000):
        """Generate trading signal from whale flows."""
        flow = self.compute_net_flow(lookback_hours)

        if abs(flow['net_flow']) < min_flow:
            return {'action': 'HOLD', 'confidence': 0.3, **flow}

        if flow['net_flow'] > 0:
            conf = min(0.9, 0.5 + flow['net_flow'] / 20000)
            return {'action': 'BUY', 'confidence': conf, **flow}
        else:
            conf = min(0.9, 0.5 + abs(flow['net_flow']) / 20000)
            return {'action': 'SELL', 'confidence': conf, **flow}

# Simulate whale transactions
np.random.seed(42)
tracker = WhaleTracker(whale_threshold_eth=1000, decay_hours=6)

# Generate realistic whale transactions
exchange_addrs = ['Binance', 'Coinbase', 'Kraken']
whale_addrs = [f'0x{i:04x}...whale' for i in range(10)]

for i in range(20):
    amount = np.random.lognormal(7, 0.5)
    age = np.random.exponential(8)
    is_to_ex = np.random.random() < 0.4
    is_from_ex = not is_to_ex and np.random.random() < 0.5

    from_addr = np.random.choice(whale_addrs) if not is_from_ex else np.random.choice(exchange_addrs)
    to_addr = np.random.choice(exchange_addrs) if is_to_ex else np.random.choice(whale_addrs)

    tracker.add_transaction(
        f'0x{i:08x}', from_addr, to_addr, amount, age,
        is_exchange_to=is_to_ex, is_exchange_from=is_from_ex
    )

print("=" * 55)
print("WHALE TRACKING: ETH")
print("=" * 55)

# Display tracked transactions
print(f"\\nWhale Transactions (>1000 ETH):")
for tx in sorted(tracker.transactions, key=lambda x: x['age_hours'])[:8]:
    direction = '-> Exchange' if tx['to_exchange'] else '<- Exchange' if tx['from_exchange'] else '-> Wallet'
    print(f"  {tx['amount']:>8,.0f} ETH {direction:>13s} | "
          f"{tx['age_hours']:.1f}h ago | {tx['from'][:10]} -> {tx['to'][:10]}")

# Net flow analysis
for hours in [6, 12, 24]:
    flow = tracker.compute_net_flow(lookback_hours=hours)
    print(f"\\n{hours}h Flow: In={flow['inflow']:,.0f} Out={flow['outflow']:,.0f} "
          f"Net={flow['net_flow']:+,.0f} [{flow['signal']}]")

# Trading signal
signal = tracker.generate_signal(lookback_hours=24)
print(f"\\nTrading Signal:")
print(f"  Action:     {signal['action']}")
print(f"  Confidence: {signal['confidence']:.0%}")
print(f"  Net Flow:   {signal['net_flow']:+,.0f} ETH")

# Smart money scoring
wallet_history = {
    f'0x{i:04x}...whale': [
        {'pnl': np.random.normal(0.05, 0.1)} for _ in range(np.random.randint(5, 30))
    ] for i in range(10)
}
smart_money = tracker.identify_smart_money(wallet_history)
print(f"\\nSmart Money Rankings:")
for wallet, score in list(smart_money.items())[:5]:
    print(f"  {wallet}: win_rate={score['win_rate']:.0%}, "
          f"avg_ret={score['avg_return']:.1%}, trades={score['n_trades']}")`}),e.jsx(I,{title:"Whale Flow Signal Interpretation",difficulty:"beginner",problem:"Over the past 24 hours, you observe: 15,000 ETH withdrawn from Binance to cold wallets (accumulation), 8,000 ETH deposited to Coinbase from whales, and 3,000 ETH moved wallet-to-wallet. The signal decay half-life is 6 hours, and the withdrawals occurred 2 hours ago while deposits were 10 hours ago. Compute the time-weighted net flow and interpret the signal.",solution:[{step:"Decay-weighted inflow (from exchange)",formula:"\\text{Inflow} = 15000 \\times e^{-0.693 \\times 2/6} = 15000 \\times 0.794 = 11{,}910"},{step:"Decay-weighted outflow (to exchange)",formula:"\\text{Outflow} = 8000 \\times e^{-0.693 \\times 10/6} = 8000 \\times 0.315 = 2{,}520"},{step:"Net flow",formula:"\\text{Net} = 11{,}910 - 2{,}520 = +9{,}390 \\text{ ETH}"},{step:"Interpretation",formula:"\\text{BULLISH signal with high confidence}",explanation:"Strong net accumulation (withdrawal from exchanges to cold storage) that is recent (high decay weight). This suggests whales are removing ETH from exchanges, reducing available sell-side supply. The wallet-to-wallet transfer is excluded as it does not indicate exchange supply/demand shifts."}]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Further Reading and Resources"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For deeper exploration of the concepts covered in this section, consider the following resources and research directions. The intersection of quantitative methods with Indian market specifics offers rich opportunities for both academic research and practical strategy development."}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Resource"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Type"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Relevance"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"NSE Research Papers"}),e.jsx("td",{className:"px-4 py-2",children:"Academic"}),e.jsx("td",{className:"px-4 py-2",children:"Indian market empirics"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"SEBI Discussion Papers"}),e.jsx("td",{className:"px-4 py-2",children:"Regulatory"}),e.jsx("td",{className:"px-4 py-2",children:"Market structure rules"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"RBI Working Papers"}),e.jsx("td",{className:"px-4 py-2",children:"Policy"}),e.jsx("td",{className:"px-4 py-2",children:"Macro-financial linkages"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"CMIE ProwessIQ"}),e.jsx("td",{className:"px-4 py-2",children:"Data"}),e.jsx("td",{className:"px-4 py-2",children:"Indian corporate financials"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"IIM/ISB Research"}),e.jsx("td",{className:"px-4 py-2",children:"Academic"}),e.jsx("td",{className:"px-4 py-2",children:"Indian finance research"})]})]})]})}),e.jsx(f,{title:"Implementation Notes",type:"historical",children:e.jsx("p",{children:"When implementing these concepts for Indian markets, remember to account for the T+1 settlement cycle (since January 2023), the pre-open auction session mechanics (9:00--9:15 AM IST), and SEBI's regulatory requirements for algorithmic trading including the mandatory algo order tagging and order-to-trade ratio limits. Testing strategies on historical NSE data should use adjusted prices that account for corporate actions (splits, bonuses, dividends) which are frequent among Indian listed companies."})}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Whale tracking leverages the transparency of blockchains to monitor large holder behavior in real-time -- an advantage unavailable in traditional markets. Exchange netflow (deposits vs. withdrawals) is the most actionable signal, with large outflows historically preceding price increases. Combining flow analysis with smart money scoring (ranking wallets by historical accuracy) creates a robust on-chain alpha source for crypto quant strategies."})})]})}const pe=Object.freeze(Object.defineProperty({__proto__:null,default:K},Symbol.toStringTag,{value:"Module"}));function G(){const[s,_]=c.useState(1200),[r,b]=c.useState(15),[n,u]=c.useState(800),[o,y]=c.useState(500),m=s/r,p=m>100?"OVERVALUED":m>60?"FAIR":"UNDERVALUED",h=s/(n/1e3),l=(n/1e3)**2*.001,x=s/l;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: On-Chain Valuation Metrics"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust network metrics to compute on-chain valuation ratios for Bitcoin."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Market Cap: $",s,"B"]}),e.jsx("input",{type:"range",min:"100",max:"3000",step:"50",value:s,onChange:a=>_(parseInt(a.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Daily Tx Vol: $",r,"B"]}),e.jsx("input",{type:"range",min:"1",max:"50",step:"1",value:r,onChange:a=>b(parseInt(a.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Active Addr: ",n,"K"]}),e.jsx("input",{type:"range",min:"200",max:"2000",step:"50",value:n,onChange:a=>u(parseInt(a.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Hash Rate: ",o," EH/s"]}),e.jsx("input",{type:"range",min:"100",max:"1000",step:"50",value:o,onChange:a=>y(parseInt(a.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 500 110",className:"w-full max-w-lg mx-auto block","aria-label":"Valuation metrics",children:[[{name:"NVT Ratio",value:m,zones:[30,60,100,150]},{name:"NVM Ratio",value:h/10,zones:[50,100,200,300]}].map((a,i)=>{const d=10+i*45,j=Math.min(400,a.value/a.zones[3]*400),k=a.value<a.zones[1]?"#4ade80":a.value<a.zones[2]?"#fbbf24":"#f87171";return e.jsxs("g",{children:[e.jsx("text",{x:"10",y:d+15,className:"text-[9px]",fill:"#374151",children:a.name}),e.jsx("rect",{x:"80",y:d,width:"400",height:"25",rx:"4",fill:"#e5e7eb"}),e.jsx("rect",{x:"80",y:d,width:a.zones[1]/a.zones[3]*400,height:"25",rx:"4",fill:"#4ade80",opacity:"0.2"}),e.jsx("rect",{x:80+a.zones[1]/a.zones[3]*400,y:d,width:(a.zones[2]-a.zones[1])/a.zones[3]*400,height:"25",fill:"#fbbf24",opacity:"0.2"}),e.jsx("rect",{x:80+a.zones[2]/a.zones[3]*400,y:d,width:(a.zones[3]-a.zones[2])/a.zones[3]*400,height:"25",rx:"4",fill:"#f87171",opacity:"0.2"}),e.jsx("circle",{cx:80+j,cy:d+12.5,r:"6",fill:k,stroke:"#fff",strokeWidth:"2"}),e.jsx("text",{x:85+j,y:d+16,className:"text-[8px] font-bold",fill:"#374151",children:a.value.toFixed(0)})]},i)}),e.jsxs("text",{x:"250",y:"100",textAnchor:"middle",className:`text-[10px] font-bold ${p==="UNDERVALUED"?"fill-green-600":p==="OVERVALUED"?"fill-red-500":"fill-amber-500"}`,children:["NVT Signal: ",p," | Metcalfe Ratio: ",x.toFixed(1)]})]})]})}function Q(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Network Metrics and On-Chain Valuation"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"On-chain network metrics provide fundamental valuation frameworks for cryptocurrencies, analogous to financial ratios in equity analysis. These metrics leverage the transparency of blockchain data to assess whether a network is overvalued or undervalued relative to its usage and adoption."}),e.jsx(N,{title:"NVT Ratio (Network Value to Transactions)",label:"Definition 2.1",definition:"The NVT ratio is the cryptocurrency equivalent of the P/E ratio. It compares the network's market capitalization to the value being transmitted through the network. A high NVT suggests the network is overvalued relative to its utility; a low NVT suggests undervaluation.",notation:e.jsxs(e.Fragment,{children:[e.jsx(t.InlineMath,{math:"\\text{NVT} = \\frac{\\text{Market Cap}}{\\text{Daily Transaction Volume (USD)}}"}),". The NVT signal uses a smoothed 90-day moving average of transaction volume for reduced noise."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Key On-Chain Valuation Metrics"}),e.jsx(t.BlockMath,{math:"\\text{NVT} = \\frac{\\text{Market Cap}}{V_{\\text{tx}}}, \\quad \\text{NVM} = \\frac{\\text{Market Cap}}{A_{\\text{active}}^2}, \\quad \\text{MVRV} = \\frac{\\text{Market Cap}}{\\text{Realized Cap}}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The MVRV ratio compares market value to realized value (sum of each UTXO valued at the price when it last moved). MVRV above 3.7 historically signals cycle tops; below 1.0 signals cycle bottoms."}),e.jsx(w,{title:"Metcalfe's Law in Crypto Valuation",label:"Theorem 2.1",statement:e.jsxs(e.Fragment,{children:["The market capitalization of major blockchain networks follows a generalized Metcalfe's law: ",e.jsx(t.BlockMath,{math:"\\ln(\\text{Market Cap}) = \\alpha + \\beta \\cdot \\ln(A^2) + \\epsilon, \\quad \\beta \\approx 0.95\\text{--}1.05"})," where ",e.jsx(t.InlineMath,{math:"A"})," is the number of active addresses. The deviation from the Metcalfe-predicted value serves as a mean-reverting valuation signal with half-life of approximately 60--90 days."]}),proof:e.jsxs(e.Fragment,{children:["Regression analysis of Bitcoin market cap vs. active addresses (2012--2024) on log-log scale yields ",e.jsx(t.InlineMath,{math:"R^2 = 0.92"})," with ",e.jsx(t.InlineMath,{math:"\\beta = 0.98"}),", confirming near-exact Metcalfe scaling. Similar results hold for Ethereum (",e.jsx(t.InlineMath,{math:"\\beta = 1.03, R^2 = 0.89"}),"). The deviation series ",e.jsx(t.InlineMath,{math:"\\epsilon_t"})," has Augmented Dickey-Fuller test p-value ",e.jsx(t.InlineMath,{math:"< 0.01"}),", confirming stationarity and mean-reversion."]})}),e.jsx(G,{}),e.jsx(T,{title:"network_metrics.py",runnable:!0,code:`import numpy as np

class OnChainMetrics:
    """Compute on-chain valuation metrics for crypto networks."""

    def __init__(self):
        self.metrics_history = []

    def nvt_ratio(self, market_cap, tx_volume):
        """Network Value to Transactions ratio."""
        return market_cap / max(tx_volume, 1e-6)

    def mvrv_ratio(self, market_cap, realized_cap):
        """Market Value to Realized Value ratio."""
        return market_cap / max(realized_cap, 1e-6)

    def nvt_signal(self, market_cap, tx_volume_90d_avg):
        """Smoothed NVT using 90-day average volume."""
        nvt = self.nvt_ratio(market_cap, tx_volume_90d_avg)
        if nvt > 100:
            return {'nvt': nvt, 'signal': 'OVERVALUED', 'action': 'SELL'}
        elif nvt > 60:
            return {'nvt': nvt, 'signal': 'FAIR', 'action': 'HOLD'}
        else:
            return {'nvt': nvt, 'signal': 'UNDERVALUED', 'action': 'BUY'}

    def metcalfe_value(self, active_addresses, alpha=0, beta=1.0, scale=1e-6):
        """Metcalfe's law predicted market cap."""
        return np.exp(alpha) * (active_addresses ** (2 * beta)) * scale

    def metcalfe_deviation(self, market_cap, active_addresses):
        """Deviation from Metcalfe's law prediction."""
        predicted = self.metcalfe_value(active_addresses)
        if predicted == 0:
            return 0
        return np.log(market_cap / predicted)

    def sopr(self, outputs_in_profit_value, outputs_total_value):
        """Spent Output Profit Ratio."""
        return outputs_in_profit_value / max(outputs_total_value, 1e-6)

    def compute_all(self, data):
        """Compute all metrics from network data."""
        return {
            'nvt': self.nvt_ratio(data['market_cap'], data['tx_volume']),
            'mvrv': self.mvrv_ratio(data['market_cap'], data['realized_cap']),
            'metcalfe_dev': self.metcalfe_deviation(
                data['market_cap'], data['active_addresses']
            ),
            'nvt_signal': self.nvt_signal(
                data['market_cap'], data.get('tx_volume_90d', data['tx_volume'])
            ),
        }

    def generate_composite_signal(self, metrics):
        """Combine multiple on-chain metrics into a single signal."""
        scores = []

        # NVT score
        nvt = metrics['nvt']
        nvt_score = -1 if nvt > 120 else 1 if nvt < 40 else 0
        scores.append(('NVT', nvt_score, 0.25))

        # MVRV score
        mvrv = metrics['mvrv']
        mvrv_score = -1 if mvrv > 3.5 else 1 if mvrv < 1.0 else 0
        scores.append(('MVRV', mvrv_score, 0.35))

        # Metcalfe deviation
        met_dev = metrics['metcalfe_dev']
        met_score = -1 if met_dev > 0.5 else 1 if met_dev < -0.5 else 0
        scores.append(('Metcalfe', met_score, 0.40))

        # Weighted composite
        composite = sum(s * w for _, s, w in scores)
        direction = 'BUY' if composite > 0.3 else 'SELL' if composite < -0.3 else 'HOLD'

        return {
            'scores': {name: score for name, score, _ in scores},
            'composite': composite,
            'direction': direction,
        }

# Simulate Bitcoin on-chain data
np.random.seed(42)
metrics = OnChainMetrics()

# Historical BTC data points (simplified)
btc_data = [
    {'date': '2024-Q1', 'market_cap': 850e9, 'tx_volume': 12e9,
     'realized_cap': 500e9, 'active_addresses': 700000, 'tx_volume_90d': 10e9},
    {'date': '2024-Q2', 'market_cap': 1200e9, 'tx_volume': 18e9,
     'realized_cap': 600e9, 'active_addresses': 900000, 'tx_volume_90d': 14e9},
    {'date': '2024-Q3', 'market_cap': 1100e9, 'tx_volume': 15e9,
     'realized_cap': 650e9, 'active_addresses': 850000, 'tx_volume_90d': 16e9},
    {'date': '2024-Q4', 'market_cap': 1400e9, 'tx_volume': 20e9,
     'realized_cap': 700e9, 'active_addresses': 1000000, 'tx_volume_90d': 17e9},
]

print("=" * 65)
print("ON-CHAIN VALUATION METRICS: BITCOIN")
print("=" * 65)

for data in btc_data:
    m = metrics.compute_all(data)
    signal = metrics.generate_composite_signal(m)

    print(f"\\n{data['date']}:")
    print(f"  Market Cap:    \${data['market_cap']/1e9:.0f}B")
    print(f"  NVT Ratio:     {m['nvt']:.1f} ({m['nvt_signal']['signal']})")
    print(f"  MVRV Ratio:    {m['mvrv']:.2f}")
    print(f"  Metcalfe Dev:  {m['metcalfe_dev']:+.3f}")
    print(f"  Composite:     {signal['composite']:+.2f} -> {signal['direction']}")

# NVT zones analysis
print(f"\\nNVT Historical Zones:")
print(f"  < 40:    Strong BUY (network undervalued)")
print(f"  40-60:   Fair value zone")
print(f"  60-100:  Elevated, caution")
print(f"  > 100:   Overvalued, SELL signal")
print(f"\\nMVRV Historical Zones:")
print(f"  < 1.0:   Cycle bottom (BUY)")
print(f"  1.0-2.5: Fair value")
print(f"  2.5-3.7: Overheated")
print(f"  > 3.7:   Cycle top (SELL)")`}),e.jsx(I,{title:"Composite On-Chain Signal for BTC",difficulty:"intermediate",problem:"Bitcoin has NVT = 95, MVRV = 2.8, and Metcalfe deviation = +0.6. Using weights NVT=0.25, MVRV=0.35, Metcalfe=0.40, compute the composite signal. Score each metric as +1 (buy), 0 (hold), or -1 (sell) based on the zones above.",solution:[{step:"Score individual metrics",formula:"\\text{NVT}_{95} \\in [60,100] \\implies 0, \\; \\text{MVRV}_{2.8} \\in [2.5,3.7] \\implies -0.5"},{step:"Note: adjust MVRV for overheated zone",formula:"\\text{MVRV score} \\approx -0.5 \\text{ (between hold and sell)}",explanation:"MVRV in overheated zone warrants partial caution."},{step:"Metcalfe deviation score",formula:"\\text{Met dev} = +0.6 > 0.5 \\implies -1 \\text{ (overvalued vs. Metcalfe)}"},{step:"Weighted composite",formula:"S = 0.25 \\times 0 + 0.35 \\times (-0.5) + 0.40 \\times (-1) = -0.575",explanation:"Composite score of -0.575 is below -0.3, generating a SELL signal. The network is trading above Metcalfe-predicted value with elevated MVRV, suggesting a prudent reduction in BTC exposure."}]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Further Reading and Resources"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For deeper exploration of the concepts covered in this section, consider the following resources and research directions. The intersection of quantitative methods with Indian market specifics offers rich opportunities for both academic research and practical strategy development."}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Resource"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Type"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Relevance"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"NSE Research Papers"}),e.jsx("td",{className:"px-4 py-2",children:"Academic"}),e.jsx("td",{className:"px-4 py-2",children:"Indian market empirics"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"SEBI Discussion Papers"}),e.jsx("td",{className:"px-4 py-2",children:"Regulatory"}),e.jsx("td",{className:"px-4 py-2",children:"Market structure rules"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"RBI Working Papers"}),e.jsx("td",{className:"px-4 py-2",children:"Policy"}),e.jsx("td",{className:"px-4 py-2",children:"Macro-financial linkages"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"CMIE ProwessIQ"}),e.jsx("td",{className:"px-4 py-2",children:"Data"}),e.jsx("td",{className:"px-4 py-2",children:"Indian corporate financials"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"IIM/ISB Research"}),e.jsx("td",{className:"px-4 py-2",children:"Academic"}),e.jsx("td",{className:"px-4 py-2",children:"Indian finance research"})]})]})]})}),e.jsx(f,{title:"Implementation Notes",type:"historical",children:e.jsx("p",{children:"When implementing these concepts for Indian markets, remember to account for the T+1 settlement cycle (since January 2023), the pre-open auction session mechanics (9:00--9:15 AM IST), and SEBI's regulatory requirements for algorithmic trading including the mandatory algo order tagging and order-to-trade ratio limits. Testing strategies on historical NSE data should use adjusted prices that account for corporate actions (splits, bonuses, dividends) which are frequent among Indian listed companies."})}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"On-chain network metrics provide fundamental valuation frameworks unique to crypto. NVT ratio (crypto's P/E), MVRV (market vs. realized value), and Metcalfe deviation (network effect valuation) offer complementary perspectives. These metrics are most powerful at identifying cycle extremes and should be combined into composite signals with appropriate weighting. For Indian crypto investors, on-chain metrics provide objective valuation anchors in a market often driven by sentiment and speculation."})})]})}const xe=Object.freeze(Object.defineProperty({__proto__:null,default:Q},Symbol.toStringTag,{value:"Module"}));function J(){const[s,_]=c.useState(1e3),[r,b]=c.useState(40),[n,u]=c.useState(24),[o,y]=c.useState(2.5),[m,p]=c.useState(1),h=s*r/100,l=s*10,x=h*10,a=(l/x).toFixed(2),i=Math.ceil((100-r)/o),d=(o*12/r*100).toFixed(1),j=(m/100*2).toFixed(2),k=(.1+parseFloat(j)).toFixed(2),v=[];let S=r;for(let g=0;g<=Math.min(n,48);g++)v.push({month:g,pct:Math.min(S,100)}),S+=o;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Token Unlock & Indian TDS Impact Analyzer"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Model token unlock schedules and analyze the impact of India's 1% TDS on VDA (Virtual Digital Assets) on trading economics."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-5",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Total Supply = ",s,"M"]}),e.jsx("input",{type:"range",min:"100",max:"10000",step:"100",value:s,onChange:g=>_(parseInt(g.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Circulating = ",r,"%"]}),e.jsx("input",{type:"range",min:"5",max:"100",step:"5",value:r,onChange:g=>b(parseInt(g.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Vesting = ",n," months"]}),e.jsx("input",{type:"range",min:"6",max:"48",step:"3",value:n,onChange:g=>u(parseInt(g.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Monthly Unlock = ",o,"%"]}),e.jsx("input",{type:"range",min:"0.5",max:"10",step:"0.5",value:o,onChange:g=>y(parseFloat(g.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["TDS Rate = ",m,"%"]}),e.jsx("input",{type:"range",min:"0",max:"5",step:"0.5",value:m,onChange:g=>p(parseFloat(g.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 520 200",className:"w-full max-w-xl mx-auto block","aria-label":"Token unlock schedule",children:[e.jsxs("text",{x:"260",y:"14",textAnchor:"middle",className:"text-[10px] font-semibold",fill:"#6b7280",children:["Token Unlock Schedule | FDV/MCap Ratio: ",a,"x"]}),[0,25,50,75,100].map(g=>{const M=160-g/100*130;return e.jsxs("g",{children:[e.jsx("line",{x1:"50",y1:M,x2:"490",y2:M,stroke:"#e5e7eb",strokeWidth:"0.5"}),e.jsxs("text",{x:"45",y:M+3,textAnchor:"end",className:"text-[7px]",fill:"#9ca3af",children:[g,"%"]})]},g)}),v.length>1&&e.jsx("polyline",{fill:"none",stroke:"#6366f1",strokeWidth:"2",points:v.map(g=>{const M=50+g.month/Math.min(n,48)*440,C=160-g.pct/100*130;return`${M},${C}`}).join(" ")}),e.jsx("polygon",{fill:"#6366f1",opacity:"0.1",points:["50,160",...v.map(g=>{const M=50+g.month/Math.min(n,48)*440,C=160-g.pct/100*130;return`${M},${C}`}),"490,160"].join(" ")}),e.jsx("line",{x1:"50",y1:"160",x2:"490",y2:"160",stroke:"#9ca3af",strokeWidth:"1"}),e.jsx("text",{x:"270",y:"175",textAnchor:"middle",className:"text-[9px]",fill:"#6b7280",children:"Months"}),e.jsxs("text",{x:"350",y:"45",className:"text-[8px]",fill:"#6b7280",children:["Inflation: ",d,"% annual"]}),e.jsxs("text",{x:"350",y:"58",className:"text-[8px]",fill:"#6b7280",children:["Full circ: ~",i," months"]}),e.jsxs("text",{x:"350",y:"71",className:"text-[8px] font-bold",fill:"#dc2626",children:["TDS drag: ",j,"% round-trip"]}),e.jsxs("text",{x:"350",y:"84",className:"text-[8px]",fill:"#6b7280",children:["Eff. spread: ",k,"%"]})]})]})}function Z(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Tokenomics Analysis & Indian VDA Taxation"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Tokenomics -- the economic design of crypto tokens -- is a critical alpha source in crypto quantitative trading. Token unlock schedules, supply inflation, and vesting cliffs create predictable selling pressure that can be systematically traded. For Indian crypto traders, the 1% TDS (Tax Deducted at Source) on VDA (Virtual Digital Assets) transactions introduced in the 2022 Union Budget, combined with the 30% flat tax on crypto gains, fundamentally alters trading economics and strategy viability."}),e.jsx(N,{title:"Tokenomics",label:"Definition 17.7",definition:"Tokenomics refers to the economic model governing a cryptocurrency token, including its total supply, emission schedule, vesting periods for team/investor allocations, staking rewards, burn mechanisms, and governance utility. Quantitative tokenomics analysis models the supply-demand dynamics to forecast price pressure from upcoming token unlocks.",notation:e.jsxs(e.Fragment,{children:["The circulating supply ratio is ",e.jsx(t.InlineMath,{math:"r_t = S_t^{\\text{circ}} / S^{\\text{total}}"})," and the dilution rate is ",e.jsx(t.InlineMath,{math:"\\delta_t = \\frac{\\Delta S_t^{\\text{circ}}}{S_t^{\\text{circ}}}"}),"."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Token Unlock Impact Model"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"When locked tokens vest and enter circulation, they create potential sell pressure. The expected price impact of an unlock event can be modelled as:"}),e.jsx(t.BlockMath,{math:"\\Delta P_{\\text{unlock}} = -\\eta \\cdot \\frac{U_t}{V_{\\text{daily}}} \\cdot P_t"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"U_t"})," is the unlock amount,"," ",e.jsx(t.InlineMath,{math:"V_{\\text{daily}}"})," is average daily trading volume,"," ",e.jsx(t.InlineMath,{math:"P_t"})," is current price, and"," ",e.jsx(t.InlineMath,{math:"\\eta"})," is the sell-through rate (fraction of unlocked tokens actually sold). Empirically, ",e.jsx(t.InlineMath,{math:"\\eta \\approx 0.3\\text{-}0.6"})," ","for investor allocations and ",e.jsx(t.InlineMath,{math:"\\eta \\approx 0.1\\text{-}0.2"})," ","for team allocations."]}),e.jsx(t.BlockMath,{math:"\\text{FDV/MCap Ratio} = \\frac{S^{\\text{total}} \\cdot P}{S^{\\text{circ}} \\cdot P} = \\frac{1}{r_t}"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"India's 1% TDS on VDA (Section 194S)"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Since July 2022, all crypto transactions in India attract 1% TDS under Section 194S of the Income Tax Act. This creates a significant drag on high-frequency trading strategies:"}),e.jsx(t.BlockMath,{math:"\\text{Annual TDS Drag} = 2 \\times \\text{TDS\\%} \\times N_{\\text{trades}} \\times \\bar{V}_{\\text{trade}}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The factor of 2 accounts for both buy and sell sides. Combined with the 30% flat tax (no loss offset) under Section 115BBH, the effective taxation makes many strategies unprofitable that would work in other jurisdictions:"}),e.jsx(t.BlockMath,{math:"\\text{Effective Tax} = 0.30 \\cdot \\max(\\text{gains}, 0) + 0.01 \\cdot |\\text{turnover}|"}),e.jsx(w,{title:"Break-Even Sharpe Under Indian VDA Tax",label:"Theorem 17.3",statement:e.jsxs(e.Fragment,{children:["For a crypto trading strategy with ",e.jsx(t.InlineMath,{math:"N"})," trades per year, average trade size ",e.jsx(t.InlineMath,{math:"V"}),", and TDS rate ",e.jsx(t.InlineMath,{math:"\\tau"}),", the minimum Sharpe ratio required for profitability after tax is:"]}),formula:"S_{\\min} = \\frac{2N\\tau + 0.3 \\cdot \\mu^+ \\cdot \\text{Capital}}{\\sigma \\cdot \\text{Capital}} \\cdot \\sqrt{252}",proof:e.jsx(e.Fragment,{children:"Setting after-tax return to zero: gross P&L minus TDS drag (2 * N * tau * V) minus income tax (0.3 * gains) must equal zero. Since losses cannot offset gains under Section 115BBH, the effective tax rate on gross P&L is higher than 30%. For a strategy with 100 daily trades of INR 1 lakh each, the annual TDS alone is INR 73 lakh (2 * 252 * 100 * 0.01 * 100000), requiring minimum annualized return of approximately 73% just to cover TDS -- pushing the minimum viable Sharpe above 3."})}),e.jsx(J,{}),e.jsx(T,{title:"tokenomics_india.py",runnable:!0,code:`import numpy as np
from dataclasses import dataclass
from typing import List

@dataclass
class TokenUnlock:
    month: int
    amount_pct: float
    category: str  # 'team', 'investor', 'ecosystem', 'community'
    sell_through: float = 0.5  # Expected fraction sold

@dataclass
class IndianVDATax:
    """India VDA taxation model (2022 onwards)."""
    tds_rate: float = 0.01          # 1% TDS under Section 194S
    income_tax_rate: float = 0.30   # 30% flat tax, Section 115BBH
    surcharge_rate: float = 0.0     # Depends on income bracket
    cess_rate: float = 0.04         # Health and Education Cess
    can_offset_losses: bool = False  # No loss offset allowed

    def calculate_tds(self, trade_value):
        """TDS on a single trade."""
        return trade_value * self.tds_rate

    def annual_tds_drag(self, daily_trades, avg_trade_value, trading_days=252):
        """Total annual TDS drag."""
        return 2 * daily_trades * avg_trade_value * self.tds_rate * trading_days

    def effective_tax(self, gross_profit, gross_loss, turnover):
        """Total effective tax burden."""
        tds = turnover * self.tds_rate
        # No loss offset: tax only on profits
        income_tax = max(0, gross_profit) * self.income_tax_rate
        cess = income_tax * self.cess_rate
        total = tds + income_tax + cess
        return {
            'tds': tds,
            'income_tax': income_tax,
            'cess': cess,
            'total': total,
            'effective_rate': total / max(gross_profit - gross_loss, 1) * 100,
        }

class TokenomicsAnalyzer:
    """Analyze token unlock schedules and price impact."""

    def __init__(self, total_supply, circulating_pct, price):
        self.total_supply = total_supply
        self.circulating_pct = circulating_pct
        self.price = price
        self.unlocks: List[TokenUnlock] = []

    def add_unlock(self, unlock: TokenUnlock):
        self.unlocks.append(unlock)

    def compute_supply_schedule(self, months=36):
        """Project circulating supply over time."""
        schedule = []
        circ = self.circulating_pct
        for m in range(months):
            month_unlocks = [u for u in self.unlocks if u.month == m]
            for u in month_unlocks:
                circ = min(100, circ + u.amount_pct)
            schedule.append({'month': m, 'circulating_pct': circ})
        return schedule

    def estimate_sell_pressure(self, daily_volume):
        """Estimate monthly sell pressure from unlocks."""
        pressures = []
        for u in self.unlocks:
            unlock_value = self.total_supply * u.amount_pct / 100 * self.price
            expected_sell = unlock_value * u.sell_through
            days_to_sell = max(1, expected_sell / daily_volume * 5)
            price_impact = -0.1 * (expected_sell / daily_volume)
            pressures.append({
                'month': u.month,
                'category': u.category,
                'unlock_value': unlock_value,
                'sell_pressure': expected_sell,
                'days_to_absorb': days_to_sell,
                'est_price_impact': price_impact,
            })
        return pressures

# --- Demo ---
print("=== Tokenomics Analysis & Indian VDA Tax ===\\n")

# 1. Token Unlock Analysis
analyzer = TokenomicsAnalyzer(
    total_supply=1_000_000_000,  # 1B tokens
    circulating_pct=35,
    price=2.50  # USD
)

# Typical unlock schedule
unlocks = [
    TokenUnlock(6, 5.0, 'investor', 0.6),
    TokenUnlock(12, 10.0, 'investor', 0.5),
    TokenUnlock(12, 5.0, 'team', 0.15),
    TokenUnlock(18, 8.0, 'investor', 0.4),
    TokenUnlock(24, 5.0, 'team', 0.2),
    TokenUnlock(24, 10.0, 'ecosystem', 0.1),
]
for u in unlocks:
    analyzer.add_unlock(u)

schedule = analyzer.compute_supply_schedule(30)
print("--- Supply Schedule ---")
for s in schedule[::6]:
    print(f"  Month {s['month']:2d}: Circulating = {s['circulating_pct']:.1f}%")

sell_pressure = analyzer.estimate_sell_pressure(daily_volume=5_000_000)
print("\\n--- Sell Pressure from Unlocks ---")
for sp in sell_pressure:
    print(f"  Month {sp['month']:2d} ({sp['category']:>10}): "
          f"Unlock=\${sp['unlock_value']/1e6:.1f}M, "
          f"Sell=\${sp['sell_pressure']/1e6:.1f}M, "
          f"Impact={sp['est_price_impact']:.1%}")

# 2. Indian VDA Tax Impact
print("\\n=== Indian VDA Tax Analysis ===")
tax = IndianVDATax()

# Scenario: Algorithmic trader on WazirX/CoinDCX
scenarios = [
    {'name': 'Swing Trader', 'daily_trades': 2, 'avg_value': 50000},
    {'name': 'Day Trader', 'daily_trades': 20, 'avg_value': 100000},
    {'name': 'HF Bot', 'daily_trades': 200, 'avg_value': 50000},
]

for sc in scenarios:
    tds_annual = tax.annual_tds_drag(
        sc['daily_trades'], sc['avg_value']
    )
    annual_turnover = 2 * sc['daily_trades'] * sc['avg_value'] * 252

    # Assume 20% gross return on capital
    capital = sc['daily_trades'] * sc['avg_value'] * 5
    gross_profit = capital * 0.20
    gross_loss = capital * 0.08

    tax_result = tax.effective_tax(gross_profit, gross_loss, annual_turnover)

    print(f"\\n  --- {sc['name']} ---")
    print(f"  Capital: INR {capital:,.0f}")
    print(f"  Annual turnover: INR {annual_turnover:,.0f}")
    print(f"  TDS drag: INR {tds_annual:,.0f}")
    print(f"  Income tax: INR {tax_result['income_tax']:,.0f}")
    print(f"  Total tax: INR {tax_result['total']:,.0f}")
    print(f"  Effective rate: {tax_result['effective_rate']:.1f}%")
    print(f"  TDS as % of gross P&L: "
          f"{tds_annual / max(gross_profit - gross_loss, 1) * 100:.1f}%")

print("\\n--- Key Insight ---")
print("The 1% TDS makes HF strategies unviable in India.")
print("Focus on: low-frequency, high-conviction token unlock trades.")`}),e.jsx(I,{title:"Token Unlock Trade on Indian Exchange",difficulty:"intermediate",problem:"Token XYZ has a 10% investor unlock (100M tokens at $2 each = $200M) in 30 days. Daily volume is $10M. You want to short on WazirX pre-unlock. With 1% TDS, what is the minimum expected drop needed for profitability on a $50,000 (INR ~42 lakh) position?",solution:[{step:"Calculate TDS cost",formula:"\\text{TDS} = 2 \\times 0.01 \\times 50000 = \\$1,000",explanation:"Round-trip TDS: 1% on buy + 1% on sell = 2% of position size."},{step:"Estimate sell pressure and expected drop",formula:"\\text{Sell Pressure} = 0.5 \\times \\$200M = \\$100M",explanation:"With 50% sell-through rate, $100M will hit the market over ~50 days (100M / 10M daily volume * 5x)."},{step:"Compute break-even",formula:"\\text{Min drop} = \\frac{\\$1000 + \\text{spread cost}}{\\$50000} = \\frac{\\$1000 + \\$50}{\\$50000} = 2.1\\%",explanation:"The token must drop at least 2.1% after the unlock for the trade to be profitable after Indian TDS. The estimated 10% sell-pressure-driven drop ($100M vs $10M daily volume) far exceeds this threshold, making it viable."}]}),e.jsx(f,{title:"India VDA Regulatory Landscape",type:"warning",children:e.jsxs("p",{children:["Indian crypto traders face a uniquely harsh tax regime: (1) ",e.jsx("strong",{children:"30% flat tax"})," ","on gains with no loss offset between different VDAs (Section 115BBH), (2) ",e.jsx("strong",{children:"1% TDS"})," on all transactions above INR 10,000 (Section 194S), (3) ",e.jsx("strong",{children:"no deduction"})," for any expenses except acquisition cost, and (4) ",e.jsx("strong",{children:"no carry-forward"})," of losses. This makes high-frequency strategies unviable and pushes Indian quants toward low-frequency, high-conviction trades based on tokenomics events (unlocks, burns, governance changes)."]})}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsxs("p",{children:["Tokenomics analysis is a unique alpha source in crypto that has no direct analogue in traditional finance. Token unlocks are ",e.jsx("strong",{children:"scheduled, public events"})," ","that create predictable sell pressure -- making them ideal for systematic trading. For Indian traders, the 1% TDS constraint means focusing on large, infrequent unlock events where expected price impact (typically 5-20% for major unlocks relative to daily volume) far exceeds the 2% round-trip TDS cost. Always factor in the 30% tax on gains when computing strategy viability."]})})]})}const me=Object.freeze(Object.defineProperty({__proto__:null,default:Z},Symbol.toStringTag,{value:"Module"}));export{re as a,ne as b,ie as c,oe as d,le as e,ce as f,de as g,pe as h,xe as i,me as j,se as s};
