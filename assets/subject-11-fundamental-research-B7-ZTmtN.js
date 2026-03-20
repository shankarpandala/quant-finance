import{j as e,r as o}from"./vendor-DgA46Qmo.js";import{r as i}from"./vendor-katex-C-S70IU0.js";import{D as y,T as b,P as v,E as _,N as f}from"./subject-01-math-foundations-vREfsVbS.js";function C(){const[t,p]=o.useState("roe"),s={roe:{label:"ROE",values:[24.5,17.2,12.8,20.1,30.1],unit:"%"},margin:{label:"PAT Margin",values:[19.6,20.8,9.8,16.5,28],unit:"%"},de:{label:"D/E",values:[.04,7.05,.53,.06,0],unit:"x"}},m=["TCS","HDFCBANK","RELIANCE","INFY","ITC"],r=s[t];return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Indian Company Metrics"}),e.jsx("div",{className:"mb-4",children:e.jsxs("select",{value:t,onChange:x=>p(x.target.value),className:"rounded border px-3 py-1 text-sm dark:bg-gray-800 dark:border-gray-600",children:[e.jsx("option",{value:"roe",children:"ROE"}),e.jsx("option",{value:"margin",children:"PAT Margin"}),e.jsx("option",{value:"de",children:"Debt/Equity"})]})}),e.jsx("svg",{viewBox:"0 0 400 160",className:"w-full max-w-md mx-auto block",children:m.map((x,a)=>{const u=Math.min(120,r.values[a]*(t==="de"?15:4)),c=["#6366f1","#22c55e","#f59e0b","#ef4444","#8b5cf6"][a];return e.jsxs("g",{children:[e.jsx("rect",{x:30+a*75,y:140-u,width:50,height:u,fill:c,opacity:"0.7",rx:"3"}),e.jsxs("text",{x:55+a*75,y:135-u,textAnchor:"middle",className:"text-[9px] font-bold",fill:c,children:[r.values[a],r.unit]}),e.jsx("text",{x:55+a*75,y:155,textAnchor:"middle",className:"text-[8px] fill-gray-500",children:x})]},a)})})]})}function S(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Parsing BSE/NSE Annual Reports and MCA Filings"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Automated parsing of Indian corporate filings is the foundation of quantitative fundamental analysis. Indian companies file annual reports with BSE/NSE, quarterly results in XBRL format, and statutory filings with the Ministry of Corporate Affairs (MCA). This section covers extracting structured financial data from these sources using Python."}),e.jsx(y,{title:"Financial Statement Parsing",label:"Definition 11.1",definition:"Financial statement parsing is the automated extraction of structured data (revenue, profit, assets, liabilities) from corporate filings. In India, primary sources include BSE/NSE XBRL filings (quarterly), MCA annual returns (Form AOC-4), and company annual reports (PDF). The Indian Accounting Standards (Ind AS) provide the standardized taxonomy.",notation:"XBRL = eXtensible Business Reporting Language, MCA = Ministry of Corporate Affairs"}),e.jsx(i.BlockMath,{math:"\\text{Revenue}_{t} = \\sum_{q=1}^{4} \\text{Revenue}_{t,q}"}),e.jsx(i.BlockMath,{math:"\\text{Normalized Metric} = \\frac{\\text{Reported Value}}{\\text{Industry Median}}"}),e.jsx(b,{title:"Data Quality and Restatements",label:"Theorem 11.1",statement:"For any automated parsing pipeline, the error rate is bounded by: P(error) <= P(format_change) + P(taxonomy_change) + P(restatement). For Indian filings post-2019, XBRL standardization has reduced format_change probability to <5% per quarter.",proof:"By the union bound on error sources and empirical measurement of each component."}),e.jsx(C,{}),e.jsx(v,{title:"parse_bse_xbrl.py",runnable:!0,code:`import numpy as np

# Simulated BSE/NSE financial data parsing
companies = {
    'TCS': {'revenue': [50591, 52758, 55309, 58229], 'pat': [10846, 11342, 11909, 12392],
            'total_assets': 97896, 'equity': 85964, 'debt': 3200},
    'INFY': {'revenue': [37441, 38994, 40986, 43764], 'pat': [6021, 6106, 6368, 6944],
             'total_assets': 89480, 'equity': 72483, 'debt': 4500},
    'RELIANCE': {'revenue': [200684, 213985, 227865, 242156], 'pat': [15792, 16593, 17422, 18965],
                 'total_assets': 1520609, 'equity': 535680, 'debt': 285000},
}

print("=== Parsed Financial Data (INR Crore) ===")
for company, data in companies.items():
    annual_rev = sum(data['revenue'])
    annual_pat = sum(data['pat'])
    roe = annual_pat / data['equity'] * 100
    de_ratio = data['debt'] / data['equity']
    pat_margin = annual_pat / annual_rev * 100
    
    print(f"
{company}:")
    print(f"  Annual Revenue: INR {annual_rev:,.0f} Cr")
    print(f"  Annual PAT:     INR {annual_pat:,.0f} Cr")
    print(f"  PAT Margin:     {pat_margin:.1f}%")
    print(f"  ROE:            {roe:.1f}%")
    print(f"  D/E Ratio:      {de_ratio:.2f}")
    print(f"  Revenue Growth: {(data['revenue'][-1]/data['revenue'][0] - 1)*100:.1f}% (Q4/Q1)")`}),e.jsx(_,{title:"Extracting TCS Revenue from XBRL",difficulty:"beginner",problem:"Parse TCS quarterly XBRL filing to extract Q4 FY24 revenue. The XBRL tag is 'RevenueFromOperations' under Ind AS taxonomy.",solution:[{step:"Locate XBRL element",formula:"	ext{Tag: in-gaap:RevenueFromOperations}",explanation:"Standard Ind AS taxonomy tag for top-line revenue."},{step:"Extract value",formula:"	ext{Revenue}_{Q4} = 	ext{INR 58,229 Cr}",explanation:"Extracted from the inline XBRL filing on BSE."},{step:"Validate",formula:"	ext{Check: } |	ext{Parsed} - 	ext{Published}| < 1 	ext{ Cr}",explanation:"Cross-validate against BSE published results."}]}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Automated parsing of Indian financial filings enables quantitative fundamental analysis at scale. Use BSE/NSE XBRL feeds for quarterly data, MCA filings for annual statutory data, and screener.in/Trendlyne APIs for pre-parsed datasets. Always validate parsed data against published figures."})})]})}const ee=Object.freeze(Object.defineProperty({__proto__:null,default:S},Symbol.toStringTag,{value:"Module"}));function P(){const[t,p]=o.useState("roe"),s={roe:{label:"ROE",values:[24.5,17.2,12.8,20.1,30.1],unit:"%"},margin:{label:"PAT Margin",values:[19.6,20.8,9.8,16.5,28],unit:"%"},de:{label:"D/E",values:[.04,7.05,.53,.06,0],unit:"x"}},m=["TCS","HDFCBANK","RELIANCE","INFY","ITC"],r=s[t];return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Indian Company Metrics"}),e.jsx("div",{className:"mb-4",children:e.jsxs("select",{value:t,onChange:x=>p(x.target.value),className:"rounded border px-3 py-1 text-sm dark:bg-gray-800 dark:border-gray-600",children:[e.jsx("option",{value:"roe",children:"ROE"}),e.jsx("option",{value:"margin",children:"PAT Margin"}),e.jsx("option",{value:"de",children:"Debt/Equity"})]})}),e.jsx("svg",{viewBox:"0 0 400 160",className:"w-full max-w-md mx-auto block",children:m.map((x,a)=>{const u=Math.min(120,r.values[a]*(t==="de"?15:4)),c=["#6366f1","#22c55e","#f59e0b","#ef4444","#8b5cf6"][a];return e.jsxs("g",{children:[e.jsx("rect",{x:30+a*75,y:140-u,width:50,height:u,fill:c,opacity:"0.7",rx:"3"}),e.jsxs("text",{x:55+a*75,y:135-u,textAnchor:"middle",className:"text-[9px] font-bold",fill:c,children:[r.values[a],r.unit]}),e.jsx("text",{x:55+a*75,y:155,textAnchor:"middle",className:"text-[8px] fill-gray-500",children:x})]},a)})})]})}function T(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Profitability and Leverage Ratios for Indian Companies"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Financial ratio analysis translates raw accounting data into comparable metrics across companies and time periods. For Indian equities, key ratios include ROE, ROCE, debt-to-equity, interest coverage, and working capital ratios. Understanding these in the context of Ind AS accounting standards and Indian business practices is essential for quantitative stock selection."}),e.jsx(y,{title:"Financial Ratios",label:"Definition 11.2",definition:"Financial ratios are standardized metrics derived from financial statements that measure profitability (ROE, ROA, margins), leverage (D/E, interest coverage), efficiency (asset turnover, working capital days), and valuation (P/E, P/B, EV/EBITDA). For Indian companies, ratios must be adjusted for Ind AS vs old IGAAP differences.",notation:"ROE = PAT/Equity, ROCE = EBIT/(Equity+Debt), D/E = Total Debt/Shareholders Equity"}),e.jsx(i.BlockMath,{math:"\\text{ROE} = \\frac{\\text{PAT}}{\\text{Equity}} = \\underbrace{\\frac{\\text{PAT}}{\\text{Revenue}}}_{\\text{Margin}} \\times \\underbrace{\\frac{\\text{Revenue}}{\\text{Assets}}}_{\\text{Turnover}} \\times \\underbrace{\\frac{\\text{Assets}}{\\text{Equity}}}_{\\text{Leverage}}"}),e.jsx(i.BlockMath,{math:"\\text{ROCE} = \\frac{\\text{EBIT}}{\\text{Capital Employed}} = \\frac{\\text{EBIT}}{\\text{Equity} + \\text{Long-term Debt}}"}),e.jsx(b,{title:"DuPont Decomposition",label:"Theorem 11.2",statement:"ROE can be decomposed into three drivers: ROE = Net Margin x Asset Turnover x Financial Leverage = (PAT/Revenue) x (Revenue/Assets) x (Assets/Equity). This reveals whether high ROE comes from profitability, efficiency, or leverage.",proof:"ROE = PAT/Equity = (PAT/Rev) x (Rev/Assets) x (Assets/Equity) by algebraic identity."}),e.jsx(P,{}),e.jsx(v,{title:"ratio_analysis_nifty.py",runnable:!0,code:`import numpy as np

# DuPont analysis for top Indian companies
companies = {
    'TCS':       {'pat': 42497, 'revenue': 216887, 'assets': 97896, 'equity': 85964, 'debt': 3200, 'ebit': 55500},
    'RELIANCE':  {'pat': 68772, 'revenue': 884690, 'assets': 1520609, 'equity': 535680, 'debt': 285000, 'ebit': 115000},
    'HDFCBANK':  {'pat': 51190, 'revenue': 245648, 'assets': 2544000, 'equity': 298000, 'debt': 2100000, 'ebit': 78000},
    'INFY':      {'pat': 26439, 'revenue': 160439, 'assets': 89480, 'equity': 72483, 'debt': 4500, 'ebit': 35000},
    'ITC':       {'pat': 19476, 'revenue': 69481, 'assets': 78448, 'equity': 64748, 'debt': 150, 'ebit': 24000},
    'HINDUNILVR':{'pat': 10282, 'revenue': 60580, 'assets': 49752, 'equity': 7789, 'debt': 2500, 'ebit': 14000},
}

print("=== DuPont Analysis (Top Indian Companies) ===")
print(f"
{'Company':<12} {'ROE':>8} {'Margin':>8} {'Turnover':>10} {'Leverage':>10} {'D/E':>6} {'ROCE':>8}")
print("-" * 68)
for name, d in companies.items():
    margin = d['pat'] / d['revenue']
    turnover = d['revenue'] / d['assets']
    leverage = d['assets'] / d['equity']
    roe = margin * turnover * leverage
    de = d['debt'] / d['equity']
    roce = d['ebit'] / (d['equity'] + d['debt'])
    print(f"{name:<12} {roe:>8.1%} {margin:>8.1%} {turnover:>10.2f} {leverage:>10.2f} {de:>6.2f} {roce:>8.1%}")

print("
Key Insights:")
print("  HUL: High ROE driven by extreme leverage (high assets/equity)")
print("  TCS: High ROE driven by margin (24.7% PAT margin)")
print("  HDFC Bank: Banking leverage naturally high (deposits)")`}),e.jsx(_,{title:"DuPont for HDFC Bank",difficulty:"intermediate",problem:"HDFC Bank has PAT INR 51,190 Cr, Revenue INR 2,45,648 Cr, Assets INR 25,44,000 Cr, Equity INR 2,98,000 Cr. Decompose ROE using DuPont.",solution:[{step:"Margin",formula:"	ext{Margin} = 51190 / 245648 = 20.8%",explanation:"Banking margins include net interest income."},{step:"Turnover",formula:"	ext{Turnover} = 245648 / 2544000 = 0.097",explanation:"Low turnover typical for banks (large balance sheets)."},{step:"Leverage",formula:"	ext{Leverage} = 2544000 / 298000 = 8.54",explanation:"High leverage from deposits -- normal for banks."},{step:"ROE",formula:"	ext{ROE} = 20.8% 	imes 0.097 	imes 8.54 = 17.2%",explanation:"ROE of 17.2% driven primarily by leverage, characteristic of banking."}]}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Financial ratios standardize company comparison across Nifty 50 constituents. DuPont decomposition reveals the source of ROE: margin-driven (IT companies), turnover-driven (FMCG), or leverage-driven (banks). For Indian stock selection, ROE > 15% with low D/E is a strong quality signal."})})]})}const te=Object.freeze(Object.defineProperty({__proto__:null,default:T},Symbol.toStringTag,{value:"Module"}));function A(){const[t,p]=o.useState("roe"),s={roe:{label:"ROE",values:[24.5,17.2,12.8,20.1,30.1],unit:"%"},margin:{label:"PAT Margin",values:[19.6,20.8,9.8,16.5,28],unit:"%"},de:{label:"D/E",values:[.04,7.05,.53,.06,0],unit:"x"}},m=["TCS","HDFCBANK","RELIANCE","INFY","ITC"],r=s[t];return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Indian Company Metrics"}),e.jsx("div",{className:"mb-4",children:e.jsxs("select",{value:t,onChange:x=>p(x.target.value),className:"rounded border px-3 py-1 text-sm dark:bg-gray-800 dark:border-gray-600",children:[e.jsx("option",{value:"roe",children:"ROE"}),e.jsx("option",{value:"margin",children:"PAT Margin"}),e.jsx("option",{value:"de",children:"Debt/Equity"})]})}),e.jsx("svg",{viewBox:"0 0 400 160",className:"w-full max-w-md mx-auto block",children:m.map((x,a)=>{const u=Math.min(120,r.values[a]*(t==="de"?15:4)),c=["#6366f1","#22c55e","#f59e0b","#ef4444","#8b5cf6"][a];return e.jsxs("g",{children:[e.jsx("rect",{x:30+a*75,y:140-u,width:50,height:u,fill:c,opacity:"0.7",rx:"3"}),e.jsxs("text",{x:55+a*75,y:135-u,textAnchor:"middle",className:"text-[9px] font-bold",fill:c,children:[r.values[a],r.unit]}),e.jsx("text",{x:55+a*75,y:155,textAnchor:"middle",className:"text-[8px] fill-gray-500",children:x})]},a)})})]})}function M(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Accruals and Beneish M-Score for Indian Firms"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Earnings quality assessment separates genuine economic performance from accounting manipulation. For Indian markets, where corporate governance varies widely, quantitative tools like accrual analysis and the Beneish M-Score help identify potential earnings manipulation. Notable Indian cases include Satyam Computer Services (2009) and recent NBFC frauds."}),e.jsx(y,{title:"Beneish M-Score",label:"Definition 11.3",definition:"The Beneish M-Score is a mathematical model using eight financial ratios to detect earnings manipulation. M = -4.84 + 0.920*DSRI + 0.528*GMI + 0.404*AQI + 0.892*SGI + 0.115*DEPI - 0.172*SGAI + 4.679*TATA - 0.327*LVGI. M > -1.78 suggests a high probability of manipulation.",notation:"DSRI = Days Sales Receivable Index, GMI = Gross Margin Index, TATA = Total Accruals to Total Assets"}),e.jsx(i.BlockMath,{math:"\\text{Accruals} = \\frac{\\Delta \\text{Working Capital} - \\text{Depreciation}}{\\text{Total Assets}}"}),e.jsx(i.BlockMath,{math:"\\text{M-Score} = -4.84 + 0.920 \\times \\text{DSRI} + 0.528 \\times \\text{GMI} + \\ldots"}),e.jsx(b,{title:"Accrual Anomaly",label:"Theorem 11.3",statement:"Sloan (1996) showed that firms with high accruals (earnings much higher than cash flows) tend to have lower future returns: E[R_t+1 | Accruals_t > median] < E[R_t+1 | Accruals_t < median]. This anomaly persists in Indian markets.",proof:"Empirically documented by sorting stocks on accruals and measuring subsequent returns. The return spread is 4-8% annually in NSE data."}),e.jsx(A,{}),e.jsx(v,{title:"beneish_mscore.py",runnable:!0,code:`import numpy as np

# Beneish M-Score calculator for Indian companies
def beneish_mscore(curr, prev):
    dsri = (curr['receivables']/curr['revenue']) / (prev['receivables']/prev['revenue'])
    gmi = prev['gross_margin'] / curr['gross_margin']
    aqi = (1 - (curr['ppe'] + curr['current_assets'])/curr['total_assets']) /           (1 - (prev['ppe'] + prev['current_assets'])/prev['total_assets'])
    sgi = curr['revenue'] / prev['revenue']
    depi = prev['depreciation']/(prev['depreciation']+prev['ppe']) /            (curr['depreciation']/(curr['depreciation']+curr['ppe']))
    sgai = (curr['sga']/curr['revenue']) / (prev['sga']/prev['revenue'])
    tata = (curr['net_income'] - curr['cfo']) / curr['total_assets']
    lvgi = (curr['total_debt']/curr['total_assets']) / (prev['total_debt']/prev['total_assets'])
    
    m = -4.84 + 0.920*dsri + 0.528*gmi + 0.404*aqi + 0.892*sgi +         0.115*depi - 0.172*sgai + 4.679*tata - 0.327*lvgi
    return m, {'DSRI': dsri, 'GMI': gmi, 'AQI': aqi, 'SGI': sgi, 'TATA': tata}

# Example: Checking Indian companies
companies = {
    'CLEAN_CO': {
        'curr': {'revenue': 5000, 'receivables': 400, 'gross_margin': 0.45, 'ppe': 2000,
                 'current_assets': 1500, 'total_assets': 8000, 'depreciation': 200,
                 'sga': 500, 'net_income': 600, 'cfo': 700, 'total_debt': 1000},
        'prev': {'revenue': 4500, 'receivables': 350, 'gross_margin': 0.44, 'ppe': 1800,
                 'current_assets': 1400, 'total_assets': 7200, 'depreciation': 180,
                 'sga': 450, 'total_debt': 900},
    },
    'SUSPECT_CO': {
        'curr': {'revenue': 8000, 'receivables': 1200, 'gross_margin': 0.30, 'ppe': 3000,
                 'current_assets': 2500, 'total_assets': 12000, 'depreciation': 250,
                 'sga': 600, 'net_income': 1500, 'cfo': 200, 'total_debt': 4000},
        'prev': {'revenue': 5000, 'receivables': 500, 'gross_margin': 0.40, 'ppe': 2800,
                 'current_assets': 2000, 'total_assets': 10000, 'depreciation': 280,
                 'sga': 500, 'total_debt': 2500},
    },
}

print("=== Beneish M-Score Analysis ===")
for name, data in companies.items():
    m, components = beneish_mscore(data['curr'], data['prev'])
    flag = "HIGH RISK" if m > -1.78 else "LOW RISK"
    print(f"
{name}: M-Score = {m:.3f} [{flag}]")
    for k, v in components.items():
        print(f"  {k}: {v:.3f}")`}),e.jsx(_,{title:"Satyam Fraud Detection",difficulty:"advanced",problem:"Satyam reported FY2008 revenue of INR 10,211 Cr but actual was ~INR 7,000 Cr. Receivables were INR 2,651 Cr (inflated). Prior year receivables were INR 1,500 Cr on INR 7,500 Cr revenue. Compute the DSRI component of M-Score.",solution:[{step:"DSRI calculation",formula:"	ext{DSRI} = (2651/10211) / (1500/7500) = 0.2596 / 0.200 = 1.298",explanation:"DSRI > 1.2 is a strong warning sign."},{step:"Interpret",formula:"	ext{DSRI} = 1.30 Rightarrow 	ext{Receivables growing faster than revenue}",explanation:"This suggests revenue may be fabricated or cash collection is deteriorating."},{step:"TATA would also flag",formula:"	ext{TATA} = (	ext{NI} - 	ext{CFO}) / 	ext{TA} gg 0",explanation:"Large gap between reported profit and cash flow is the clearest manipulation signal."}]}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Earnings quality analysis is critical for Indian stock selection, especially in mid/small-cap segments where governance is weaker. The Beneish M-Score and accrual analysis provide quantitative tools to flag potential manipulation. Always cross-check against cash flow statements -- cash does not lie."})})]})}const ae=Object.freeze(Object.defineProperty({__proto__:null,default:M},Symbol.toStringTag,{value:"Module"}));function B(){const[t,p]=o.useState(11.5),[s,m]=o.useState(5);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive Visualization"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust parameters to explore the concepts interactively."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["WACC (%): ",t]}),e.jsx("input",{type:"range",min:"8",max:"16",step:"0.5",value:t,onChange:r=>p(parseFloat(r.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Terminal Growth (%): ",s]}),e.jsx("input",{type:"range",min:"2",max:"7",step:"0.5",value:s,onChange:r=>m(parseFloat(r.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-3 text-center text-xs",children:[e.jsxs("div",{className:"rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30",children:[e.jsx("div",{className:"text-gray-500 dark:text-gray-400",children:"Output 1"}),e.jsx("div",{className:"text-lg font-bold text-indigo-600",children:t})]}),e.jsxs("div",{className:"rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30",children:[e.jsx("div",{className:"text-gray-500 dark:text-gray-400",children:"Output 2"}),e.jsx("div",{className:"text-lg font-bold text-amber-600",children:s})]})]})]})}function D(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Automated DCF for Indian IT Companies"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Discounted Cash Flow (DCF) valuation is the gold standard for intrinsic value estimation. For Indian IT companies like TCS and Infosys, DCF models incorporate INR free cash flows, WACC computed with Indian risk-free rates (G-Sec yield), and terminal values based on long-term GDP growth. Automating DCF enables systematic screening of over 5000 NSE-listed companies."}),e.jsx(y,{title:"Discounted Cash Flow",label:"Definition 11.4",definition:"DCF values a company as the present value of its expected future free cash flows: V = Sum(FCF_t / (1+WACC)^t) + TV/(1+WACC)^N, where FCF = Free Cash Flow, WACC = Weighted Average Cost of Capital, and TV = Terminal Value. For Indian companies, WACC typically ranges from 10-14%.",notation:"FCF = EBIT(1-tax) + Depreciation - CapEx - Delta_WC, WACC = w_e*r_e + w_d*r_d*(1-t)"}),e.jsx(i.BlockMath,{math:"V_0 = \\sum_{t=1}^{N} \\frac{\\text{FCF}_t}{(1+\\text{WACC})^t} + \\frac{\\text{FCF}_N(1+g)}{(\\text{WACC}-g)(1+\\text{WACC})^N}"}),e.jsx(i.BlockMath,{math:"\\text{WACC} = \\frac{E}{E+D} \\cdot r_e + \\frac{D}{E+D} \\cdot r_d \\cdot (1-t)"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Mathematical Framework"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The mathematical foundation enables rigorous analysis and systematic implementation for Indian market applications."}),e.jsx(b,{title:"Terminal Value Sensitivity",label:"Theorem 11.4",statement:"Terminal value typically represents 60-80% of total DCF value for Indian growth companies. A 1% change in terminal growth rate g changes the intrinsic value by approximately TV/(WACC-g)^2, making the DCF highly sensitive to long-term growth assumptions.",proof:"Differentiating TV = FCF_N*(1+g)/(WACC-g) with respect to g yields dTV/dg = FCF_N*(1+WACC)/((WACC-g)^2)."}),e.jsx(B,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Implementation"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The following Python implementation demonstrates the core concepts applied to Indian market data, using NSE stocks, Nifty indices, and INR-denominated financial data."}),e.jsx(v,{title:"dcf_tcs.py",runnable:!0,code:`import numpy as np

# DCF Valuation for TCS
revenue_base = 216887  # INR Cr FY24
growth_rates = [0.10, 0.10, 0.09, 0.08, 0.07]  # 5-year projections
fcf_margin = 0.22  # FCF/Revenue
wacc = 0.115  # 11.5% for Indian IT
terminal_growth = 0.05  # 5% perpetual (India nominal GDP)
shares = 366  # Cr shares outstanding

# Project FCFs
revenues = [revenue_base]
for g in growth_rates:
    revenues.append(revenues[-1] * (1 + g))

fcfs = [r * fcf_margin for r in revenues[1:]]
pvs = [fcf / (1 + wacc)**t for t, fcf in enumerate(fcfs, 1)]

# Terminal value
tv = fcfs[-1] * (1 + terminal_growth) / (wacc - terminal_growth)
pv_tv = tv / (1 + wacc)**len(fcfs)

# Enterprise value
ev = sum(pvs) + pv_tv
net_debt = -25000  # TCS has net cash
equity_value = ev - net_debt
price_per_share = equity_value / shares

print("=== DCF Valuation: TCS ===")
print(f"WACC: {wacc:.1%}, Terminal growth: {terminal_growth:.1%}")
print(f"
Year  Revenue(Cr)  FCF(Cr)   PV(FCF)")
for i, (r, f, p) in enumerate(zip(revenues[1:], fcfs, pvs)):
    print(f"  {i+1}    {r:>10,.0f}  {f:>8,.0f}  {p:>8,.0f}")
print(f"
PV of FCFs:    INR {sum(pvs):>10,.0f} Cr")
print(f"PV of TV:      INR {pv_tv:>10,.0f} Cr ({pv_tv/ev*100:.0f}% of EV)")
print(f"Enterprise V:  INR {ev:>10,.0f} Cr")
print(f"Equity Value:  INR {equity_value:>10,.0f} Cr")
print(f"Price/Share:   INR {price_per_share:>10,.0f}")`}),e.jsx(_,{title:"DCF Sensitivity Analysis",difficulty:"intermediate",problem:"TCS DCF gives INR 3,800 per share at WACC=11.5% and g=5%. How does the value change if WACC increases to 12.5%?",solution:[{step:"Recompute terminal value",formula:"TV_{	ext{new}} = \frac{FCF_5 	imes 1.05}{0.125 - 0.05} = \frac{FCF_5 	imes 1.05}{0.075}",explanation:"Higher WACC reduces terminal value significantly."},{step:"New TV is ~22% lower",formula:"Delta TV approx -22%",explanation:"Terminal value drops from 15.4x FCF to 14x FCF."},{step:"New price",formula:"	ext{Price}_{	ext{new}} approx 	ext{INR } 3,100",explanation:"A 1% WACC increase reduces the price by ~18%."}]}),e.jsx(f,{title:"Indian Market Context",type:"warning",children:e.jsx("p",{children:"When applying these techniques to Indian markets, consider SEBI regulations, NSE/BSE data availability, and India-specific factors like monsoon seasonality, RBI policy cycles, and FII/DII flow dynamics."})}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Automated DCF enables systematic valuation screening of Indian stocks. For IT companies like TCS, the model is relatively clean due to low debt and stable margins. Key sensitivities are WACC and terminal growth rate -- small changes in these produce large value swings."})})]})}const re=Object.freeze(Object.defineProperty({__proto__:null,default:D},Symbol.toStringTag,{value:"Module"}));function F(){const[t,p]=o.useState(25),[s,m]=o.useState(20);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive Visualization"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust parameters to explore the concepts interactively."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Sector P/E: ",t]}),e.jsx("input",{type:"range",min:"5",max:"80",step:"1",value:t,onChange:r=>p(parseInt(r.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Historical Avg: ",s]}),e.jsx("input",{type:"range",min:"5",max:"60",step:"1",value:s,onChange:r=>m(parseInt(r.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-3 text-center text-xs",children:[e.jsxs("div",{className:"rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30",children:[e.jsx("div",{className:"text-gray-500 dark:text-gray-400",children:"Output 1"}),e.jsx("div",{className:"text-lg font-bold text-indigo-600",children:t})]}),e.jsxs("div",{className:"rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30",children:[e.jsx("div",{className:"text-gray-500 dark:text-gray-400",children:"Output 2"}),e.jsx("div",{className:"text-lg font-bold text-amber-600",children:s})]})]})]})}function q(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"P/E and EV/EBITDA Relative Valuation for Nifty Sectors"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Relative valuation compares stocks to peers using multiples like P/E, EV/EBITDA, and P/B. For Indian markets, sectoral benchmarking is essential because Nifty sector indices trade at vastly different multiples: IT at 25-30x P/E, Banking at 12-18x, FMCG at 50-70x, and Metals at 6-10x. Understanding these differences and mean-reversion patterns is key to systematic value investing on NSE."}),e.jsx(y,{title:"Relative Valuation Multiple",label:"Definition 11.5",definition:"A valuation multiple relates market price to a fundamental metric: P/E = Price/EPS, EV/EBITDA = Enterprise Value/EBITDA, P/B = Price/Book Value. For Indian stocks, multiples should be compared within sectors (cross-sectional) and against historical averages (time-series).",notation:"P/E = Market Cap / Net Profit, EV = Market Cap + Debt - Cash, EBITDA = EBIT + Depreciation"}),e.jsx(i.BlockMath,{math:"\\text{P/E Relative} = \\frac{\\text{P/E}_{\\text{stock}}}{\\text{P/E}_{\\text{sector median}}}"}),e.jsx(i.BlockMath,{math:"\\text{EV/EBITDA} = \\frac{\\text{Market Cap} + \\text{Net Debt}}{\\text{EBITDA}}"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Mathematical Framework"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The mathematical foundation enables rigorous analysis and systematic implementation for Indian market applications."}),e.jsx(b,{title:"Mean Reversion of Multiples",label:"Theorem 11.5",statement:"Valuation multiples for Indian sectors exhibit mean reversion: sectors trading above their historical average P/E tend to underperform, and vice versa. The half-life of mean reversion for Nifty sector P/E ratios is approximately 18-24 months.",proof:"Estimated from AR(1) regression of P/E ratios on Nifty sector data: P/E_t = alpha + beta * P/E_{t-1}. Half-life = -log(2)/log(beta)."}),e.jsx(F,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Implementation"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The following Python implementation demonstrates the core concepts applied to Indian market data, using NSE stocks, Nifty indices, and INR-denominated financial data."}),e.jsx(v,{title:"relative_valuation_nifty.py",runnable:!0,code:`import numpy as np

# Relative valuation for Nifty 50 sectors
sectors = {
    'Nifty IT': {'pe': 27.5, 'ev_ebitda': 20.1, 'pb': 8.5, 'hist_pe': 24.0, 'stocks': ['TCS', 'INFY', 'WIPRO', 'HCLTECH']},
    'Nifty Bank': {'pe': 14.2, 'ev_ebitda': None, 'pb': 2.1, 'hist_pe': 16.5, 'stocks': ['HDFCBANK', 'ICICIBANK', 'SBIN', 'AXISBANK']},
    'Nifty FMCG': {'pe': 52.3, 'ev_ebitda': 38.5, 'pb': 12.4, 'hist_pe': 45.0, 'stocks': ['HINDUNILVR', 'ITC', 'NESTLEIND']},
    'Nifty Metal': {'pe': 8.5, 'ev_ebitda': 5.2, 'pb': 1.4, 'hist_pe': 12.0, 'stocks': ['TATASTEEL', 'HINDALCO', 'JSWSTEEL']},
    'Nifty Pharma': {'pe': 32.1, 'ev_ebitda': 22.4, 'pb': 4.8, 'hist_pe': 28.0, 'stocks': ['SUNPHARMA', 'DRREDDY', 'CIPLA']},
    'Nifty Auto': {'pe': 24.8, 'ev_ebitda': 16.2, 'pb': 5.1, 'hist_pe': 22.0, 'stocks': ['MARUTI', 'TATAMOTORS', 'M&M']},
}

print("=== Nifty Sector Relative Valuation ===")
print(f"
{'Sector':<15} {'P/E':>6} {'Hist P/E':>8} {'Premium':>8} {'EV/EBITDA':>10} {'P/B':>6}")
print("-" * 58)
for name, d in sectors.items():
    premium = (d['pe'] / d['hist_pe'] - 1) * 100
    ev_str = f"{d['ev_ebitda']:.1f}" if d['ev_ebitda'] else "N/A"
    signal = "EXPENSIVE" if premium > 15 else ("CHEAP" if premium < -15 else "FAIR")
    print(f"{name:<15} {d['pe']:>6.1f} {d['hist_pe']:>8.1f} {premium:>+7.1f}% {ev_str:>10} {d['pb']:>6.1f}  [{signal}]")

# Value strategy signal
print("
=== Value Signal (Buy cheap sectors, sell expensive) ===")
ranked = sorted(sectors.items(), key=lambda x: x[1]['pe']/x[1]['hist_pe'])
for i, (name, d) in enumerate(ranked):
    signal = "BUY" if i < 2 else ("SELL" if i >= len(ranked)-2 else "HOLD")
    print(f"  {signal:4s}: {name} (P/E ratio: {d['pe']/d['hist_pe']:.2f}x historical)")`}),e.jsx(_,{title:"Sector Rotation Using P/E",difficulty:"intermediate",problem:"Nifty Metal trades at 8.5x P/E vs historical average of 12x. Nifty FMCG trades at 52x vs historical 45x. Which sector is more attractive on relative basis?",solution:[{step:"Compute P/E ratios",formula:"	ext{Metal: } 8.5/12.0 = 0.71x, quad 	ext{FMCG: } 52.3/45.0 = 1.16x",explanation:"Metal is 29% below historical average, FMCG is 16% above."},{step:"Value signal",formula:"	ext{Metal: BUY (0.71x)}, quad 	ext{FMCG: SELL (1.16x)}",explanation:"Rotate from expensive FMCG to cheap Metal."},{step:"Caveat",formula:"	ext{Check if low Metal P/E is cyclical peak earnings}",explanation:"Cyclical sectors can have low P/E at earnings peaks -- use EV/EBITDA or normalized earnings for cyclicals."}]}),e.jsx(f,{title:"Indian Market Context",type:"warning",children:e.jsx("p",{children:"When applying these techniques to Indian markets, consider SEBI regulations, NSE/BSE data availability, and India-specific factors like monsoon seasonality, RBI policy cycles, and FII/DII flow dynamics."})}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Relative valuation provides quick, actionable signals for Indian sector rotation. P/E mean reversion is a robust factor for Nifty sector indices with 18-24 month half-life. Always compare within sectors and adjust for cyclicality."})})]})}const se=Object.freeze(Object.defineProperty({__proto__:null,default:q},Symbol.toStringTag,{value:"Module"}));function G(){const[t,p]=o.useState(17),[s,m]=o.useState(12.5);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive Visualization"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust parameters to explore the concepts interactively."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["ROE (%): ",t]}),e.jsx("input",{type:"range",min:"8",max:"25",step:"0.5",value:t,onChange:r=>p(parseFloat(r.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Cost of Equity (%): ",s]}),e.jsx("input",{type:"range",min:"8",max:"18",step:"0.5",value:s,onChange:r=>m(parseFloat(r.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-3 text-center text-xs",children:[e.jsxs("div",{className:"rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30",children:[e.jsx("div",{className:"text-gray-500 dark:text-gray-400",children:"Output 1"}),e.jsx("div",{className:"text-lg font-bold text-indigo-600",children:t})]}),e.jsxs("div",{className:"rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30",children:[e.jsx("div",{className:"text-gray-500 dark:text-gray-400",children:"Output 2"}),e.jsx("div",{className:"text-lg font-bold text-amber-600",children:s})]})]})]})}function O(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Residual Income Models for Indian Banks"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"The Residual Income Valuation (RIV) model is particularly well-suited for Indian banks because it directly values the franchise value of a bank -- the ability to generate returns above the cost of equity. For banks like HDFC Bank, ICICI Bank, and SBI, where book value is meaningful and ROE stability is high, RIV provides more reliable valuations than DCF."}),e.jsx(y,{title:"Residual Income",label:"Definition 11.6",definition:"Residual Income (RI) is the earnings a company generates above its cost of equity: RI_t = NI_t - r_e * B_{t-1}, where NI = net income, r_e = cost of equity, and B = book value. The stock value equals book value plus present value of future residual incomes: V = B_0 + Sum(RI_t / (1+r_e)^t).",notation:"RI = Net Income - Cost of Equity × Book Value, also called Economic Value Added (EVA) for non-financial firms"}),e.jsx(i.BlockMath,{math:"V_0 = B_0 + \\sum_{t=1}^{\\infty} \\frac{\\text{RI}_t}{(1+r_e)^t} = B_0 + \\sum_{t=1}^{\\infty} \\frac{(\\text{ROE}_t - r_e) \\cdot B_{t-1}}{(1+r_e)^t}"}),e.jsx(i.BlockMath,{math:"\\frac{P}{B} = 1 + \\frac{\\text{ROE} - r_e}{r_e - g}"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Mathematical Framework"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The mathematical foundation enables rigorous analysis and systematic implementation for Indian market applications."}),e.jsx(b,{title:"RIV and P/B Multiple",label:"Theorem 11.6",statement:"Under clean surplus accounting, the RIV model implies P/B = 1 + (ROE - r_e)/(r_e - g) in steady state. A bank with ROE > r_e deserves P/B > 1, and the premium increases with the ROE spread and persistence.",proof:"In steady state, RI_t = (ROE - r_e) * B_{t-1} and B grows at rate g. Discounting the geometric series of RI gives P/B = 1 + (ROE-r_e)/(r_e-g)."}),e.jsx(G,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Implementation"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The following Python implementation demonstrates the core concepts applied to Indian market data, using NSE stocks, Nifty indices, and INR-denominated financial data."}),e.jsx(v,{title:"riv_indian_banks.py",runnable:!0,code:`import numpy as np

# Residual Income Valuation for Indian Banks
banks = {
    'HDFCBANK': {'bvps': 506, 'roe': 0.172, 'cost_eq': 0.125, 'growth': 0.12, 'cmp': 1650},
    'ICICIBANK': {'bvps': 320, 'roe': 0.168, 'cost_eq': 0.130, 'growth': 0.14, 'cmp': 1100},
    'SBIN': {'bvps': 385, 'roe': 0.145, 'cost_eq': 0.135, 'growth': 0.10, 'cmp': 780},
    'KOTAKBANK': {'bvps': 540, 'roe': 0.135, 'cost_eq': 0.120, 'growth': 0.11, 'cmp': 1800},
    'AXISBANK': {'bvps': 450, 'roe': 0.155, 'cost_eq': 0.130, 'growth': 0.12, 'cmp': 1100},
}

print("=== Residual Income Valuation (Indian Banks) ===")
print(f"
{'Bank':<12} {'BVPS':>6} {'ROE':>6} {'CoE':>6} {'Spread':>7} {'Fair P/B':>8} {'Fair Val':>9} {'CMP':>6} {'Up/Down':>8}")
print("-" * 78)
for name, d in banks.items():
    spread = d['roe'] - d['cost_eq']
    fair_pb = 1 + spread / (d['cost_eq'] - d['growth']) if d['cost_eq'] > d['growth'] else 999
    fair_value = d['bvps'] * fair_pb
    upside = (fair_value / d['cmp'] - 1) * 100
    print(f"{name:<12} {d['bvps']:>6} {d['roe']:>6.1%} {d['cost_eq']:>6.1%} {spread:>+6.1%} {fair_pb:>8.2f}x {fair_value:>9.0f} {d['cmp']:>6} {upside:>+7.1f}%")`}),e.jsx(_,{title:"HDFC Bank Fair Value via RIV",difficulty:"intermediate",problem:"HDFC Bank: BVPS = INR 506, ROE = 17.2%, Cost of Equity = 12.5%, Sustainable growth = 12%. Compute fair P/B and intrinsic value.",solution:[{step:"ROE spread",formula:"	ext{Spread} = 17.2% - 12.5% = 4.7%",explanation:"Positive spread means HDFC Bank creates economic value."},{step:"Fair P/B",formula:"P/B = 1 + \frac{0.047}{0.125 - 0.12} = 1 + \frac{0.047}{0.005} = 10.4x",explanation:"Very high P/B because growth is close to cost of equity, amplifying the franchise value."},{step:"Intrinsic value",formula:"V = 506 	imes 10.4 = 	ext{INR } 5,262",explanation:"Note: this is sensitive to growth assumption. At g=10%, fair P/B drops to 2.88x."}]}),e.jsx(f,{title:"Indian Market Context",type:"warning",children:e.jsx("p",{children:"When applying these techniques to Indian markets, consider SEBI regulations, NSE/BSE data availability, and India-specific factors like monsoon seasonality, RBI policy cycles, and FII/DII flow dynamics."})}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Residual income valuation is ideal for Indian banks where book value is economically meaningful. The model shows that banks with ROE consistently above cost of equity (HDFC, ICICI) deserve premium P/B multiples, while those with ROE near cost of equity (PSU banks) should trade near book value."})})]})}const ie=Object.freeze(Object.defineProperty({__proto__:null,default:O},Symbol.toStringTag,{value:"Module"}));function V(){const[t,p]=o.useState(18),[s,m]=o.useState(.5),[r,x]=o.useState(3),[a,u]=o.useState(5),[c,k]=o.useState(35),n=Math.min(t/25*100,100),g=Math.max(0,(2-s)/2*100),I=Math.max(0,(10-r)/10*100),j=Math.max(0,(15-a)/15*100),N=Math.min(c/50*100,100),d=n*.3+g*.2+I*.2+j*.15+N*.15,R=[{name:"ROE",score:n,color:"#6366f1"},{name:"Leverage",score:g,color:"#10b981"},{name:"Stability",score:I,color:"#f59e0b"},{name:"Accruals",score:j,color:"#ef4444"},{name:"Margins",score:N,color:"#8b5cf6"}];return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Quality Factor Score Calculator"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust fundamental metrics for an NSE-listed company to compute its quality score."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["ROE = ",t,"%"]}),e.jsx("input",{type:"range",min:"0",max:"40",step:"1",value:t,onChange:l=>p(parseFloat(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Debt/Equity = ",s.toFixed(1)]}),e.jsx("input",{type:"range",min:"0",max:"3",step:"0.1",value:s,onChange:l=>m(parseFloat(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["ROE Volatility (std) = ",r,"%"]}),e.jsx("input",{type:"range",min:"0",max:"15",step:"0.5",value:r,onChange:l=>x(parseFloat(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Accruals Ratio = ",a,"%"]}),e.jsx("input",{type:"range",min:"0",max:"20",step:"1",value:a,onChange:l=>u(parseFloat(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Gross Margin = ",c,"%"]}),e.jsx("input",{type:"range",min:"5",max:"70",step:"1",value:c,onChange:l=>k(parseFloat(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsx("svg",{viewBox:"0 0 400 180",className:"w-full max-w-lg mx-auto block",children:R.map((l,h)=>e.jsxs("g",{children:[e.jsx("text",{x:"70",y:25+h*32,textAnchor:"end",className:"text-[11px]",fill:"#6b7280",children:l.name}),e.jsx("rect",{x:"80",y:15+h*32,width:"250",height:"16",rx:"3",fill:"#e5e7eb"}),e.jsx("rect",{x:"80",y:15+h*32,width:l.score*2.5,height:"16",rx:"3",fill:l.color,opacity:"0.8"}),e.jsx("text",{x:85+l.score*2.5,y:27+h*32,className:"text-[9px] font-bold",fill:l.color,children:l.score.toFixed(0)})]},l.name))}),e.jsxs("p",{className:"mt-3 text-center text-lg font-bold",children:[e.jsx("span",{className:"text-gray-600 dark:text-gray-400",children:"Composite Quality Score: "}),e.jsxs("span",{className:d>=70?"text-green-600 dark:text-green-400":d>=40?"text-amber-600 dark:text-amber-400":"text-red-500",children:[d.toFixed(1)," / 100"]})]})]})}function H(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Quality Factor Investing"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Quality investing systematically selects companies with superior profitability, earnings stability, and financial strength. In the Indian market, the quality factor has historically delivered strong risk-adjusted returns, particularly during market drawdowns. The Nifty 200 Quality 30 index captures this premium by selecting NSE-listed companies based on ROE, earnings growth variability, and leverage."}),e.jsx(y,{title:"Quality Factor",label:"Definition 11.8",definition:"The quality factor is a systematic equity risk factor that captures the return premium associated with companies exhibiting high profitability (ROE, ROA, ROIC), low leverage (Debt/Equity), stable earnings, low accruals, and high gross margins. Quality stocks are expected to earn excess returns because the market underprices the persistence of high-quality fundamentals.",notation:"Q_i = \\sum_{k=1}^{K} w_k \\cdot \\text{rank}(q_{i,k})"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Profitability Metrics"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The primary profitability metrics used in quality screening of NSE-listed stocks:"}),e.jsx(i.BlockMath,{math:"ROE = \\frac{\\text{Net Income}}{\\text{Average Shareholders' Equity}}"}),e.jsx(i.BlockMath,{math:"ROIC = \\frac{NOPAT}{\\text{Invested Capital}} = \\frac{EBIT(1-\\tau)}{E + D - \\text{Cash}}"}),e.jsx(i.BlockMath,{math:"\\text{Gross Profitability} = \\frac{\\text{Revenue} - \\text{COGS}}{\\text{Total Assets}}"}),e.jsx(b,{title:"Novy-Marx Profitability Premium",label:"Theorem 11.4",statement:"Gross profitability (GP/Assets) predicts cross-sectional stock returns with similar power to book-to-market (the value factor). Controlling for value, profitable firms earn significantly higher returns: E[R_{high-GP}] - E[R_{low-GP}] > 0 even after controlling for size, value, and momentum.",proof:"Empirically validated using Fama-MacBeth regressions on Indian stocks. The quality premium in India (Nifty 200 Quality 30 vs Nifty 200) has averaged 2-4% annually with lower drawdowns, consistent with the global evidence by Novy-Marx (2013) and Asness, Frazzini, and Pedersen (2019)."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Earnings Quality and Accruals"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The accruals ratio measures the gap between reported earnings and cash flow, serving as a red flag for earnings manipulation:"}),e.jsx(i.BlockMath,{math:"\\text{Accruals Ratio} = \\frac{\\text{Net Income} - \\text{CFO}}{\\text{Total Assets}}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Companies with high accruals tend to underperform as accruals reverse. This is particularly relevant in the Indian market where SEBI has flagged accounting quality concerns in certain sectors. The Beneish M-Score identifies potential earnings manipulation:"}),e.jsx(i.BlockMath,{math:"M = -4.84 + 0.92 \\cdot DSRI + 0.528 \\cdot GMI + 0.404 \\cdot AQI + 0.892 \\cdot SGI"}),e.jsx(i.BlockMath,{math:"+ 0.115 \\cdot DEPI - 0.172 \\cdot SGAI + 4.679 \\cdot TATA - 0.327 \\cdot LVGI"}),e.jsx(f,{title:"Quality Investing in India",type:"historical",children:e.jsxs("ul",{className:"space-y-1 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Nifty 200 Quality 30:"})," Selects 30 stocks from Nifty 200 based on ROE, D/E ratio, and EPS growth variability over 5 years"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"SEBI Categorization:"})," Quality-focused mutual funds typically classify as thematic/sectoral under SEBI MF regulations"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Indian Quality Stocks:"})," Asian Paints, HDFC Bank, TCS, Nestle India consistently rank high on quality metrics"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Zerodha Smallcase:"})," Quality-factor portfolios available as smallcases for systematic quality investing"]})]})}),e.jsx(V,{}),e.jsx(v,{title:"quality_factor_screen.py",runnable:!0,code:`import numpy as np

class QualityScreener:
    """Quality factor screening for NSE/BSE stocks."""

    WEIGHTS = {
        'roe': 0.30,
        'leverage': 0.20,
        'stability': 0.20,
        'accruals': 0.15,
        'margins': 0.15
    }

    def __init__(self):
        self.stocks = []

    def add_stock(self, name, roe, debt_equity, roe_std,
                  accruals_ratio, gross_margin):
        self.stocks.append({
            'name': name, 'roe': roe, 'de': debt_equity,
            'roe_std': roe_std, 'accruals': accruals_ratio,
            'gross_margin': gross_margin
        })

    def _score_metric(self, value, best, worst):
        """Normalize metric to 0-100 scale."""
        if best == worst:
            return 50.0
        score = (value - worst) / (best - worst) * 100
        return max(0, min(100, score))

    def compute_scores(self):
        results = []
        for s in self.stocks:
            roe_s = self._score_metric(s['roe'], 30, 0)
            lev_s = self._score_metric(s['de'], 0, 3)
            stab_s = self._score_metric(s['roe_std'], 0, 15)
            accr_s = self._score_metric(s['accruals'], 0, 20)
            marg_s = self._score_metric(s['gross_margin'], 60, 10)

            composite = (roe_s * self.WEIGHTS['roe'] +
                        lev_s * self.WEIGHTS['leverage'] +
                        stab_s * self.WEIGHTS['stability'] +
                        accr_s * self.WEIGHTS['accruals'] +
                        marg_s * self.WEIGHTS['margins'])

            results.append({
                'name': s['name'],
                'roe_score': roe_s,
                'leverage_score': lev_s,
                'stability_score': stab_s,
                'accrual_score': accr_s,
                'margin_score': marg_s,
                'composite': composite
            })
        return sorted(results, key=lambda x: -x['composite'])

# Nifty 50 quality screen
screener = QualityScreener()
screener.add_stock("TCS",          roe=38, debt_equity=0.05, roe_std=2.1, accruals_ratio=3, gross_margin=50)
screener.add_stock("Asian Paints", roe=26, debt_equity=0.35, roe_std=2.8, accruals_ratio=4, gross_margin=42)
screener.add_stock("HDFC Bank",    roe=17, debt_equity=0.90, roe_std=1.5, accruals_ratio=5, gross_margin=35)
screener.add_stock("Tata Steel",   roe=12, debt_equity=1.20, roe_std=8.5, accruals_ratio=9, gross_margin=22)
screener.add_stock("ITC",          roe=25, debt_equity=0.01, roe_std=2.0, accruals_ratio=2, gross_margin=55)
screener.add_stock("SBI",          roe=13, debt_equity=1.50, roe_std=5.2, accruals_ratio=8, gross_margin=28)
screener.add_stock("Infosys",      roe=30, debt_equity=0.10, roe_std=2.5, accruals_ratio=3, gross_margin=48)
screener.add_stock("Reliance",     roe=10, debt_equity=0.80, roe_std=3.5, accruals_ratio=7, gross_margin=30)

results = screener.compute_scores()

print("=" * 70)
print("  Quality Factor Screening - NSE Large-Cap Stocks")
print("=" * 70)
print(f"{'Rank':<5} {'Stock':<15} {'ROE':>5} {'Lev':>5} {'Stab':>5} "
      f"{'Accr':>5} {'Marg':>5} {'Score':>7}")
print("-" * 70)
for i, r in enumerate(results):
    print(f"{i+1:<5} {r['name']:<15} {r['roe_score']:>5.0f} "
          f"{r['leverage_score']:>5.0f} {r['stability_score']:>5.0f} "
          f"{r['accrual_score']:>5.0f} {r['margin_score']:>5.0f} "
          f"{r['composite']:>7.1f}")

print("\\nTop Quality Quintile:")
top = [r for r in results if r['composite'] >= results[1]['composite']]
for r in top:
    print(f"  {r['name']}: {r['composite']:.1f}")`}),e.jsx(_,{title:"Quality Score for Nestle India",difficulty:"beginner",problem:"Nestle India has ROE = 95%, Debt/Equity = 0.02, ROE std = 8%, Accruals ratio = 2%, Gross Margin = 55%. Compute the quality composite score using the standard weights.",solution:[{step:"Score each metric (0-100 scale)",formula:"ROE: \\min(95/25 \\times 100, 100) = 100",explanation:"ROE is exceptionally high due to low equity base (high leverage through payouts)."},{step:"Score leverage and stability",formula:"Leverage: (2-0.02)/2 \\times 100 = 99.0,\\quad Stability: (10-8)/10 \\times 100 = 20.0",explanation:"Very low debt but moderate ROE volatility (inherent in FMCG cyclicality)."},{step:"Score accruals and margins",formula:"Accruals: (15-2)/15 \\times 100 = 86.7,\\quad Margins: 55/50 \\times 100 = 100",explanation:"Low accruals indicate high earnings quality. Strong pricing power reflected in margins."},{step:"Compute weighted composite",formula:"Q = 0.3(100) + 0.2(99) + 0.2(20) + 0.15(86.7) + 0.15(100) = 81.8",explanation:"High quality score of 81.8/100, dragged slightly by ROE volatility. Nestle India is a quintessential quality stock on NSE."}]}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Quality factor investing provides a systematic framework for identifying companies with durable competitive advantages. In the Indian context, quality stocks (high ROE, low leverage, stable earnings) have historically outperformed during Nifty drawdowns, offering a defensive alpha source. Combine quality screening with value metrics to avoid overpaying for quality -- the most effective strategy pairs high quality scores with reasonable valuations."})})]})}const ne=Object.freeze(Object.defineProperty({__proto__:null,default:H},Symbol.toStringTag,{value:"Module"}));function L(){const[t,p]=o.useState(15),[s,m]=o.useState(2),[r,x]=o.useState(3),[a,u]=o.useState(10),c=[{name:"ITC",pe:22,pbv:7.5,divYield:3.5,evEbitda:14},{name:"Coal India",pe:7.5,pbv:3.2,divYield:8.5,evEbitda:4.5},{name:"ONGC",pe:6.8,pbv:.9,divYield:5.2,evEbitda:3.8},{name:"NTPC",pe:12,pbv:1.6,divYield:4.1,evEbitda:8.2},{name:"Power Grid",pe:11,pbv:2.1,divYield:5.8,evEbitda:7.5},{name:"SBI",pe:9,pbv:1.3,divYield:2.8,evEbitda:5.1},{name:"BPCL",pe:5.5,pbv:1.8,divYield:6.2,evEbitda:4.2},{name:"Vedanta",pe:8,pbv:2.5,divYield:9.1,evEbitda:5.8}],k=c.filter(n=>n.pe<=t&&n.pbv<=s&&n.divYield>=r&&n.evEbitda<=a);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Value Stock Screener"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Set value criteria to filter NSE-listed stocks. Adjust thresholds to see which stocks pass."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Max P/E = ",t,"x"]}),e.jsx("input",{type:"range",min:"5",max:"30",step:"1",value:t,onChange:n=>p(parseFloat(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Max P/BV = ",s.toFixed(1),"x"]}),e.jsx("input",{type:"range",min:"0.5",max:"5",step:"0.5",value:s,onChange:n=>m(parseFloat(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Min Div Yield = ",r,"%"]}),e.jsx("input",{type:"range",min:"0",max:"8",step:"0.5",value:r,onChange:n=>x(parseFloat(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Max EV/EBITDA = ",a,"x"]}),e.jsx("input",{type:"range",min:"3",max:"20",step:"1",value:a,onChange:n=>u(parseFloat(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"w-full text-xs border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"Stock"}),e.jsx("th",{className:"px-3 py-2 text-right text-gray-600 dark:text-gray-400",children:"P/E"}),e.jsx("th",{className:"px-3 py-2 text-right text-gray-600 dark:text-gray-400",children:"P/BV"}),e.jsx("th",{className:"px-3 py-2 text-right text-gray-600 dark:text-gray-400",children:"Div Yield"}),e.jsx("th",{className:"px-3 py-2 text-right text-gray-600 dark:text-gray-400",children:"EV/EBITDA"}),e.jsx("th",{className:"px-3 py-2 text-center text-gray-600 dark:text-gray-400",children:"Status"})]})}),e.jsx("tbody",{className:"text-gray-700 dark:text-gray-300",children:c.map(n=>{const g=n.pe<=t&&n.pbv<=s&&n.divYield>=r&&n.evEbitda<=a;return e.jsxs("tr",{className:`border-b border-gray-200 dark:border-gray-700 ${g?"bg-green-50 dark:bg-green-900/20":""}`,children:[e.jsx("td",{className:"px-3 py-1 font-semibold",children:n.name}),e.jsxs("td",{className:`px-3 py-1 text-right ${n.pe<=t?"text-green-600":"text-red-500"}`,children:[n.pe,"x"]}),e.jsxs("td",{className:`px-3 py-1 text-right ${n.pbv<=s?"text-green-600":"text-red-500"}`,children:[n.pbv,"x"]}),e.jsxs("td",{className:`px-3 py-1 text-right ${n.divYield>=r?"text-green-600":"text-red-500"}`,children:[n.divYield,"%"]}),e.jsxs("td",{className:`px-3 py-1 text-right ${n.evEbitda<=a?"text-green-600":"text-red-500"}`,children:[n.evEbitda,"x"]}),e.jsx("td",{className:"px-3 py-1 text-center",children:g?"PASS":"FAIL"})]},n.name)})})]})}),e.jsxs("p",{className:"mt-3 text-center text-sm text-gray-600 dark:text-gray-400",children:[k.length," of ",c.length," stocks pass all value criteria"]})]})}function W(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Systematic Value Strategies"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Value investing, pioneered by Graham and Dodd, systematically selects stocks trading below their intrinsic value. In the Indian market, value strategies exploit the tendency of NSE-listed stocks to mean-revert from extreme valuations, particularly in cyclical sectors like metals, energy, and PSU banks."}),e.jsx(y,{title:"Value Factor",label:"Definition 11.10",definition:"The value factor captures the return premium earned by stocks with low price-to-fundamental ratios (low P/E, low P/BV, low EV/EBITDA, high dividend yield) relative to stocks with high ratios. The value premium arises from systematic mispricing due to investor overreaction to negative news and underestimation of mean reversion in fundamentals.",notation:"HML = R_{high\\,B/M} - R_{low\\,B/M}"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Value Metrics and Construction"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The primary value metrics used for Indian equity screening:"}),e.jsx(i.BlockMath,{math:"E/P = \\frac{\\text{Trailing EPS}}{\\text{Market Price}} \\quad \\text{(Earnings Yield)}"}),e.jsx(i.BlockMath,{math:"B/M = \\frac{\\text{Book Value per Share}}{\\text{Market Price}} \\quad \\text{(Book-to-Market)}"}),e.jsx(i.BlockMath,{math:"EBITDA/EV = \\frac{\\text{EBITDA}}{\\text{Market Cap + Net Debt}} \\quad \\text{(EBITDA Yield)}"}),e.jsx(b,{title:"Fama-French Value Premium",label:"Theorem 11.5",statement:"The value premium (HML factor) in Indian equities is statistically significant and economically meaningful. Using BSE-listed stocks sorted into value and growth portfolios by B/M ratio, the long-short HML factor earns a positive premium: E[R_{HML}] > 0 with t-statistic > 2.0 over multi-decade samples.",proof:"Evidence from Agarwalla, Jacob, and Varma (2013) at IIM Ahmedabad shows that the Indian HML factor earns an annualized premium of approximately 4-6% over the 1993-2012 period. The premium is larger among small-cap stocks and is robust to controlling for momentum and quality factors. Data available on the Indian Fama-French factor library maintained by IIM Ahmedabad."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Composite Value Score"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"A robust value strategy combines multiple metrics into a composite score to avoid single-metric bias:"}),e.jsx(i.BlockMath,{math:"V_i = \\frac{1}{4}\\left[\\text{rank}(E/P_i) + \\text{rank}(B/M_i) + \\text{rank}(EBITDA/EV_i) + \\text{rank}(D/P_i)\\right]"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Cross-sectional ranks are computed within sector peer groups to control for industry-specific valuation norms. The composite score provides more stable value signals than any individual metric."}),e.jsx(f,{title:"Value Traps in Indian Markets",type:"historical",children:e.jsxs("ul",{className:"space-y-1 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"PSU Value Trap:"})," Government-owned enterprises often appear cheap on P/E and P/BV but face structural headwinds from government interference, poor capital allocation, and declining market share."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Cyclical Traps:"})," Metal and commodity stocks show low P/E at cycle peaks (when earnings are inflated), not troughs. Use normalized earnings (Shiller P/E) for cyclicals."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Financial Distress:"})," Stocks with low valuations due to actual distress (high NPAs for banks, debt covenants) destroy value. Add quality filters to avoid."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"SEBI Delisting Risk:"})," Some low-valuation stocks face potential delisting or promoter buyback at low prices under SEBI regulations."]})]})}),e.jsx(L,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Shiller CAPE for Indian Market Timing"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The Cyclically Adjusted P/E (CAPE or Shiller P/E) for the Nifty 50 smooths earnings over 10 years to filter out cyclical fluctuations:"}),e.jsx(i.BlockMath,{math:"CAPE_{Nifty} = \\frac{P_{Nifty}}{\\frac{1}{10}\\sum_{t=1}^{10} E_t^{real}}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Historical Nifty 50 CAPE has ranged from 12x (March 2020 COVID low, GFC 2008) to 40x+ (2007 peak, late 2024). CAPE below 18x has historically offered excellent 5-year forward returns for Indian investors."}),e.jsx(v,{title:"value_strategy.py",runnable:!0,code:`import numpy as np

class ValueStrategy:
    """Systematic value strategy for NSE stocks."""

    def __init__(self, name="Indian Value"):
        self.name = name
        self.universe = []

    def add_stock(self, ticker, pe, pbv, div_yield, ev_ebitda,
                  sector, market_cap_cr):
        self.universe.append({
            'ticker': ticker, 'pe': pe, 'pbv': pbv,
            'div_yield': div_yield, 'ev_ebitda': ev_ebitda,
            'sector': sector, 'mcap': market_cap_cr
        })

    def rank_metric(self, metric, ascending=True):
        """Rank stocks on a metric (ascending = lower is better for value)."""
        values = [(i, s[metric]) for i, s in enumerate(self.universe)]
        values.sort(key=lambda x: x[1], reverse=not ascending)
        ranks = {}
        for rank, (idx, _) in enumerate(values):
            ranks[idx] = rank + 1
        return ranks

    def composite_value_score(self):
        """Compute composite value score from multiple metrics."""
        n = len(self.universe)
        pe_ranks = self.rank_metric('pe', ascending=True)
        pbv_ranks = self.rank_metric('pbv', ascending=True)
        dy_ranks = self.rank_metric('div_yield', ascending=False)
        ev_ranks = self.rank_metric('ev_ebitda', ascending=True)

        scores = []
        for i in range(n):
            avg_rank = (pe_ranks[i] + pbv_ranks[i] +
                       dy_ranks[i] + ev_ranks[i]) / 4
            percentile = (1 - avg_rank / n) * 100
            scores.append({
                **self.universe[i],
                'pe_rank': pe_ranks[i],
                'pbv_rank': pbv_ranks[i],
                'dy_rank': dy_ranks[i],
                'ev_rank': ev_ranks[i],
                'composite_rank': avg_rank,
                'value_percentile': percentile
            })
        return sorted(scores, key=lambda x: x['composite_rank'])

# Build NSE value universe
strategy = ValueStrategy("Nifty Value Screen")
strategy.add_stock("ONGC",       pe=6.8,  pbv=0.9, div_yield=5.2, ev_ebitda=3.8, sector="Energy", market_cap_cr=250000)
strategy.add_stock("Coal India", pe=7.5,  pbv=3.2, div_yield=8.5, ev_ebitda=4.5, sector="Mining", market_cap_cr=180000)
strategy.add_stock("NTPC",       pe=12.0, pbv=1.6, div_yield=4.1, ev_ebitda=8.2, sector="Power",  market_cap_cr=320000)
strategy.add_stock("Power Grid", pe=11.0, pbv=2.1, div_yield=5.8, ev_ebitda=7.5, sector="Power",  market_cap_cr=280000)
strategy.add_stock("SBI",        pe=9.0,  pbv=1.3, div_yield=2.8, ev_ebitda=5.1, sector="Banking",market_cap_cr=650000)
strategy.add_stock("BPCL",       pe=5.5,  pbv=1.8, div_yield=6.2, ev_ebitda=4.2, sector="Energy", market_cap_cr=90000)
strategy.add_stock("ITC",        pe=22.0, pbv=7.5, div_yield=3.5, ev_ebitda=14.0,sector="FMCG",   market_cap_cr=560000)
strategy.add_stock("Vedanta",    pe=8.0,  pbv=2.5, div_yield=9.1, ev_ebitda=5.8, sector="Metals", market_cap_cr=120000)
strategy.add_stock("GAIL",       pe=10.5, pbv=1.4, div_yield=4.5, ev_ebitda=6.5, sector="Gas",    market_cap_cr=95000)
strategy.add_stock("NHPC",       pe=14.0, pbv=1.9, div_yield=3.8, ev_ebitda=9.0, sector="Power",  market_cap_cr=75000)

results = strategy.composite_value_score()

print("=" * 75)
print("  Composite Value Ranking - NSE Universe")
print("=" * 75)
print(f"{'Rank':<5} {'Ticker':<12} {'Sector':<8} {'P/E':>5} {'P/BV':>5} "
      f"{'DY%':>5} {'EV/EB':>6} {'Score':>6}")
print("-" * 75)
for i, r in enumerate(results):
    print(f"{i+1:<5} {r['ticker']:<12} {r['sector']:<8} "
          f"{r['pe']:>5.1f} {r['pbv']:>5.1f} {r['div_yield']:>5.1f} "
          f"{r['ev_ebitda']:>6.1f} {r['value_percentile']:>5.1f}%")

print("\\nValue Portfolio (Top Quartile):")
top_q = results[:len(results)//4 + 1]
for r in top_q:
    print(f"  {r['ticker']} ({r['sector']}): "
          f"P/E={r['pe']:.1f}x, Div Yield={r['div_yield']:.1f}%")`}),e.jsx(_,{title:"Deep Value Screen on NSE",difficulty:"beginner",problem:"Screen the Nifty 500 universe for deep value stocks with P/E < 8, P/BV < 1.5, dividend yield > 5%, and EV/EBITDA < 5. A stock has P/E=6.8, P/BV=0.9, Div Yield=5.2%, EV/EBITDA=3.8. Does it pass?",solution:[{step:"Check P/E criterion",formula:"P/E = 6.8 < 8 \\quad \\checkmark",explanation:"Passes the earnings yield threshold."},{step:"Check P/BV criterion",formula:"P/BV = 0.9 < 1.5 \\quad \\checkmark",explanation:"Trading below book value -- strong value signal."},{step:"Check dividend yield",formula:"DY = 5.2\\% > 5\\% \\quad \\checkmark",explanation:"Above the minimum dividend yield threshold."},{step:"Check EV/EBITDA",formula:"EV/EBITDA = 3.8 < 5 \\quad \\checkmark",explanation:"All four criteria pass. This stock qualifies as deep value. However, verify it is not a value trap by checking for declining revenues, high debt maturity risk, or adverse SEBI/regulatory actions."}]}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Systematic value strategies in India should combine multiple valuation metrics into composite scores, screen within sector peer groups, and incorporate quality filters to avoid value traps. The Indian value premium has been significant historically but requires patience -- value strategies can underperform growth for extended periods. Use Nifty CAPE as a market-level timing overlay and individual stock composite value scores for security selection."})})]})}const oe=Object.freeze(Object.defineProperty({__proto__:null,default:W},Symbol.toStringTag,{value:"Module"}));function Y(){const[t,p]=o.useState(6.5),[s,m]=o.useState(5.2),[r,x]=o.useState(6.5),[a,u]=o.useState(5.9),[c,k]=o.useState(1.8),n=r-s,g=t+s+2,I=r+.5,j=g-I,N=[{name:"GDP Growth",value:t,unit:"%",status:t>6?"STRONG":t>4?"MODERATE":"WEAK"},{name:"CPI Inflation",value:s,unit:"%",status:s<4?"LOW":s<6?"TARGET":"HIGH"},{name:"Real Interest Rate",value:n,unit:"%",status:n>1?"TIGHT":n>0?"NEUTRAL":"EASY"},{name:"Fiscal Deficit",value:a,unit:"% GDP",status:a<4?"PRUDENT":a<6?"ELEVATED":"HIGH"},{name:"CAD/GDP",value:c,unit:"%",status:c<1.5?"HEALTHY":c<2.5?"MODERATE":"CONCERN"}];return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Indian Macro Dashboard"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust macroeconomic indicators to see their impact on equity market expectations."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["GDP Growth = ",t,"%"]}),e.jsx("input",{type:"range",min:"0",max:"12",step:"0.5",value:t,onChange:d=>p(parseFloat(d.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["CPI Inflation = ",s,"%"]}),e.jsx("input",{type:"range",min:"1",max:"12",step:"0.2",value:s,onChange:d=>m(parseFloat(d.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["RBI Repo Rate = ",r,"%"]}),e.jsx("input",{type:"range",min:"3",max:"10",step:"0.25",value:r,onChange:d=>x(parseFloat(d.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Fiscal Deficit = ",a,"% of GDP"]}),e.jsx("input",{type:"range",min:"2",max:"10",step:"0.1",value:a,onChange:d=>u(parseFloat(d.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["CAD/GDP = ",c,"%"]}),e.jsx("input",{type:"range",min:"0",max:"5",step:"0.1",value:c,onChange:d=>k(parseFloat(d.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsx("div",{className:"overflow-x-auto mb-4",children:e.jsxs("table",{className:"w-full text-xs border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"Indicator"}),e.jsx("th",{className:"px-3 py-2 text-right text-gray-600 dark:text-gray-400",children:"Value"}),e.jsx("th",{className:"px-3 py-2 text-center text-gray-600 dark:text-gray-400",children:"Assessment"})]})}),e.jsx("tbody",{className:"text-gray-700 dark:text-gray-300",children:N.map(d=>e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-1 font-semibold",children:d.name}),e.jsxs("td",{className:"px-3 py-1 text-right",children:[d.value.toFixed(1),d.unit]}),e.jsx("td",{className:`px-3 py-1 text-center font-bold text-xs ${d.status==="STRONG"||d.status==="HEALTHY"||d.status==="PRUDENT"||d.status==="LOW"?"text-green-600":d.status==="HIGH"||d.status==="CONCERN"||d.status==="WEAK"?"text-red-500":"text-amber-600"}`,children:d.status})]},d.name))})]})}),e.jsxs("div",{className:"grid grid-cols-3 gap-3 text-sm",children:[e.jsxs("div",{className:"rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30 text-center",children:[e.jsx("span",{className:"text-xs text-gray-600 dark:text-gray-400",children:"Expected Nifty Return"}),e.jsxs("p",{className:"text-base font-bold text-blue-700 dark:text-blue-300",children:[g.toFixed(1),"%"]})]}),e.jsxs("div",{className:"rounded-lg bg-green-50 p-3 dark:bg-green-900/30 text-center",children:[e.jsx("span",{className:"text-xs text-gray-600 dark:text-gray-400",children:"10Y Bond Yield"}),e.jsxs("p",{className:"text-base font-bold text-green-700 dark:text-green-300",children:[I.toFixed(1),"%"]})]}),e.jsxs("div",{className:"rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30 text-center",children:[e.jsx("span",{className:"text-xs text-gray-600 dark:text-gray-400",children:"Equity Risk Premium"}),e.jsxs("p",{className:"text-base font-bold text-indigo-700 dark:text-indigo-300",children:[j.toFixed(1),"%"]})]})]})]})}function z(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Indian Economic Indicators for Trading"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Macroeconomic indicators drive the broad direction of Indian equity markets. Understanding the relationship between GDP growth, inflation, RBI monetary policy, and fiscal dynamics is essential for systematic macro trading strategies on NSE/BSE. This section quantifies these relationships for algorithmic implementation."}),e.jsx(y,{title:"Leading Economic Indicator",label:"Definition 11.12",definition:"A leading economic indicator is a measurable variable that changes direction before the broader economy, providing advance signal of economic expansion or contraction. In India, key leading indicators include the IIP (Index of Industrial Production), PMI (Purchasing Managers' Index), credit growth, and auto sales -- all of which tend to lead Nifty 50 returns by 1-3 months.",notation:"\\text{Leading indicator } X_t \\text{ Granger-causes } Y_{t+k} \\text{ for } k > 0"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"GDP and Equity Returns"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The long-run relationship between nominal GDP growth and Nifty 50 earnings growth can be modeled as a cointegrating relationship:"}),e.jsx(i.BlockMath,{math:"\\Delta \\ln(EPS_{Nifty,t}) = \\alpha + \\beta \\cdot \\Delta \\ln(GDP_{nominal,t}) + \\epsilon_t"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["Empirically, ",e.jsx(i.InlineMath,{math:"\\beta \\approx 1.5"})," for India, indicating that Nifty earnings growth has historically exceeded nominal GDP growth due to the increasing formalization of the economy and the market-cap weighted bias toward high-growth sectors."]}),e.jsx(b,{title:"Fisher Effect for Indian Markets",label:"Theorem 11.6",statement:"Under the Fisher equation, the nominal return on Indian equities can be decomposed as: E[R_{Nifty}] \\approx r_{real} + E[\\pi] + ERP_{India}, where r_{real} is the real risk-free rate (real GoI bond yield), E[\\pi] is expected CPI inflation, and ERP_{India} is the Indian equity risk premium.",proof:"The Fisher equation states (1+R_{nominal}) = (1+r_{real})(1+\\pi). For India: R_{nominal} \\approx r_{real} + \\pi (approximation for moderate inflation). Adding the equity premium: E[R_{Nifty}] = r_{real} + E[\\pi] + ERP \\approx 2\\% + 5\\% + 6\\% = 13\\%, which aligns with the historical 12-15% CAGR of the Nifty 50."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"RBI Monetary Policy and Markets"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The RBI's repo rate directly impacts the discount rate for Indian equities. The Taylor Rule adapted for India describes the policy rate as:"}),e.jsx(i.BlockMath,{math:"r_{repo} = r^* + \\pi_t + 0.5(\\pi_t - \\pi^*) + 0.5(y_t - y^*)"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(i.InlineMath,{math:"r^*"})," is the neutral real rate (approximately 1-1.5% for India),"," ",e.jsx(i.InlineMath,{math:"\\pi^*"})," is the RBI's inflation target (4% under the flexible inflation targeting framework), and ",e.jsx(i.InlineMath,{math:"y_t - y^*"})," is the output gap."]}),e.jsx(f,{title:"Key Indian Macro Indicators",type:"historical",children:e.jsxs("ul",{className:"space-y-1 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"GDP:"})," CSO releases advance estimates (Jan), revised estimates (Feb), quarterly GVA data"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"CPI:"})," MoSPI releases monthly, RBI targets 4% +/- 2% band"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"IIP:"})," Monthly industrial production index, leads GDP by 1-2 quarters"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"PMI:"})," S&P Global India Manufacturing and Services PMI (monthly)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"RBI Policy:"})," Bi-monthly MPC meetings, repo rate and liquidity operations"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Trade Data:"})," DGCIS monthly merchandise exports/imports, CAD quarterly"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Fiscal:"})," Monthly CGA data on government expenditure and tax collections"]})]})}),e.jsx(Y,{}),e.jsx(v,{title:"macro_indicators.py",runnable:!0,code:`import numpy as np

class IndianMacroDashboard:
    """Macro indicator analysis for Indian equity markets."""

    def __init__(self):
        self.indicators = {}

    def set_indicator(self, name, value, weight=1.0):
        self.indicators[name] = {'value': value, 'weight': weight}

    def taylor_rule(self, inflation, output_gap, neutral_real=1.25,
                     inflation_target=4.0):
        """RBI Taylor Rule implied repo rate."""
        return (neutral_real + inflation +
                0.5 * (inflation - inflation_target) +
                0.5 * output_gap)

    def equity_risk_premium(self, nifty_earnings_yield, bond_yield_10y):
        """Implied ERP from Nifty earnings yield vs GoI bond."""
        return nifty_earnings_yield - bond_yield_10y

    def real_rate(self, repo_rate, cpi_inflation):
        return repo_rate - cpi_inflation

    def fed_model_signal(self, nifty_pe, bond_yield_10y):
        """Fed Model adapted for India: compare E/P to bond yield."""
        earnings_yield = 100 / nifty_pe
        gap = earnings_yield - bond_yield_10y
        if gap > 2:
            return 'EQUITIES_ATTRACTIVE'
        elif gap > 0:
            return 'NEUTRAL'
        else:
            return 'BONDS_ATTRACTIVE'

    def macro_score(self, gdp_growth, cpi, repo_rate, fiscal_deficit,
                     cad_gdp):
        """Composite macro health score (0-100)."""
        gdp_s = min(gdp_growth / 8 * 100, 100)
        cpi_s = max(0, (8 - cpi) / 6 * 100)
        real_r = repo_rate - cpi
        real_s = 50 + real_r * 20  # Neutral at 0 real rate
        fiscal_s = max(0, (8 - fiscal_deficit) / 6 * 100)
        cad_s = max(0, (3 - cad_gdp) / 3 * 100)

        return {
            'gdp_score': gdp_s,
            'inflation_score': cpi_s,
            'monetary_score': min(100, max(0, real_s)),
            'fiscal_score': fiscal_s,
            'external_score': cad_s,
            'composite': (gdp_s * 0.25 + cpi_s * 0.20 +
                         min(100, max(0, real_s)) * 0.20 +
                         fiscal_s * 0.15 + cad_s * 0.20)
        }

# Current Indian macro environment
dashboard = IndianMacroDashboard()

# Set parameters
gdp = 6.5      # Real GDP growth
cpi = 5.2      # CPI inflation
repo = 6.5     # RBI repo rate
fiscal = 5.9   # Fiscal deficit % GDP
cad = 1.8      # CAD % GDP
nifty_pe = 22  # Nifty 50 trailing P/E
goi_10y = 7.1  # 10Y GoI bond yield

# Computations
taylor_implied = dashboard.taylor_rule(cpi, gdp - 6.5)
real_rate = dashboard.real_rate(repo, cpi)
erp = dashboard.equity_risk_premium(100 / nifty_pe, goi_10y)
fed_signal = dashboard.fed_model_signal(nifty_pe, goi_10y)
macro = dashboard.macro_score(gdp, cpi, repo, fiscal, cad)

print("=" * 55)
print("  Indian Macro Dashboard")
print("=" * 55)
print(f"\\nGDP Growth:        {gdp:.1f}%")
print(f"CPI Inflation:     {cpi:.1f}%")
print(f"RBI Repo Rate:     {repo:.1f}%")
print(f"Real Rate:         {real_rate:.1f}%")
print(f"Taylor Rule Rate:  {taylor_implied:.1f}%")
print(f"Rate Gap:          {repo - taylor_implied:+.1f}% "
      f"({'Dovish' if repo < taylor_implied else 'Hawkish'})")
print(f"\\nNifty P/E:         {nifty_pe:.1f}x")
print(f"Nifty E/P:         {100/nifty_pe:.1f}%")
print(f"GoI 10Y Yield:     {goi_10y:.1f}%")
print(f"Implied ERP:       {erp:.1f}%")
print(f"Fed Model Signal:  {fed_signal}")
print(f"\\nMacro Health Scores:")
for key, val in macro.items():
    if key != 'composite':
        print(f"  {key:<20} {val:>5.1f}/100")
print(f"  {'COMPOSITE':<20} {macro['composite']:>5.1f}/100")`}),e.jsx(_,{title:"RBI Rate Decision Impact on Nifty",difficulty:"intermediate",problem:"CPI inflation is at 5.8% and GDP growth at 6.2%. The RBI's inflation target is 4%. Using the Taylor Rule (neutral real rate = 1.25%), what should the repo rate be? If the actual repo rate is 6.5%, is the RBI dovish or hawkish?",solution:[{step:"Compute output gap",formula:"y - y^* = 6.2 - 6.5 = -0.3\\%",explanation:"Assuming potential GDP growth of 6.5%, the economy is slightly below potential."},{step:"Apply Taylor Rule",formula:"r_{repo}^* = 1.25 + 5.8 + 0.5(5.8 - 4.0) + 0.5(-0.3)",explanation:"Substitute inflation, inflation gap, and output gap."},{step:"Compute implied rate",formula:"r_{repo}^* = 1.25 + 5.8 + 0.9 - 0.15 = 7.8\\%",explanation:"Taylor Rule implies repo rate should be 7.8%."},{step:"Compare with actual",formula:"6.5\\% < 7.8\\% \\Rightarrow \\text{Dovish by 130 bps}",explanation:"RBI is running policy 130bps below what the Taylor Rule suggests, indicating a growth-supportive stance. This is positive for equities (Nifty/Bank Nifty) but may keep inflation above target."}]}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Indian macroeconomic indicators provide critical context for systematic equity strategies. The RBI repo rate and CPI inflation determine the discount rate regime, GDP growth drives corporate earnings, and the fiscal/external position affects INR stability and FII flows. A composite macro score combining these indicators can serve as an overlay for adjusting equity allocation between Nifty exposure and fixed-income alternatives."})})]})}const le=Object.freeze(Object.defineProperty({__proto__:null,default:z},Symbol.toStringTag,{value:"Module"}));function K(){const[t,p]=o.useState(1.2),[s,m]=o.useState(-.8),[r,x]=o.useState(-1.5),[a,u]=o.useState(-.6),[c,k]=o.useState(-.4),n=.5,g=-.3,I=-.25,j=-1,N=2,d=t*n+s*g+r*I+a*j+c*N,R=[{name:"GDP Growth",beta:t,surprise:n,contrib:t*n},{name:"Inflation",beta:s,surprise:g,contrib:s*g},{name:"Interest Rate",beta:r,surprise:I,contrib:r*I},{name:"INR/USD",beta:a,surprise:j,contrib:a*j},{name:"Crude Oil",beta:c,surprise:N,contrib:c*N}];return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Macro Factor Return Attribution"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust factor betas to see how macro surprises drive Nifty 50 returns."}),e.jsx("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[["GDP Beta",t,p],["Inflation Beta",s,m],["Rate Beta",r,x],["INR Beta",a,u],["Oil Beta",c,k]].map(([l,h,w])=>e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:[l," = ",h.toFixed(1)]}),e.jsx("input",{type:"range",min:"-3",max:"3",step:"0.1",value:h,onChange:E=>w(parseFloat(E.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]},l))}),e.jsx("svg",{viewBox:"0 0 450 170",className:"w-full max-w-lg mx-auto block",children:R.map((l,h)=>{const w=Math.abs(l.contrib)*60,E=l.contrib>=0?200:200-w;return e.jsxs("g",{children:[e.jsx("text",{x:"90",y:22+h*30,textAnchor:"end",className:"text-[10px]",fill:"#6b7280",children:l.name}),e.jsx("rect",{x:E,y:12+h*30,width:w,height:"16",rx:"2",fill:l.contrib>=0?"#4ade80":"#f87171",opacity:"0.8"}),e.jsxs("text",{x:l.contrib>=0?E+w+5:E-5,y:24+h*30,textAnchor:l.contrib>=0?"start":"end",className:"text-[9px] font-bold",fill:l.contrib>=0?"#16a34a":"#dc2626",children:[l.contrib>=0?"+":"",l.contrib.toFixed(2),"%"]}),e.jsx("line",{x1:"200",y1:"5",x2:"200",y2:"160",stroke:"#9ca3af",strokeWidth:"1",strokeDasharray:"3"})]},l.name)})}),e.jsxs("p",{className:"mt-2 text-center text-sm font-semibold",children:["Expected Return from Macro Factors:"," ",e.jsxs("span",{className:d>=0?"text-green-600 dark:text-green-400":"text-red-500",children:[d>=0?"+":"",d.toFixed(2),"%"]})]})]})}function U(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Macro Factor Models for Indian Markets"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Macro factor models decompose equity returns into systematic exposures to macroeconomic state variables. For the Indian market, key macro factors include GDP growth surprises, inflation innovations, RBI policy rate changes, INR/USD movements, and crude oil price shocks. These models enable risk attribution and macro-driven alpha generation."}),e.jsx(y,{title:"Arbitrage Pricing Theory (APT) Macro Model",label:"Definition 11.14",definition:"The APT macro factor model expresses the expected return of an asset as a linear function of its exposure (beta) to K macroeconomic risk factors. Unlike CAPM's single market factor, APT allows multiple sources of systematic risk to be priced independently.",notation:"E[R_i] = r_f + \\beta_{i,1}\\lambda_1 + \\beta_{i,2}\\lambda_2 + \\cdots + \\beta_{i,K}\\lambda_K"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"The Indian Macro Factor Structure"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The return on stock ",e.jsx(i.InlineMath,{math:"i"})," is driven by surprise components of macroeconomic variables:"]}),e.jsx(i.BlockMath,{math:"R_{i,t} = \\alpha_i + \\beta_{i,GDP} \\cdot f_{GDP,t} + \\beta_{i,CPI} \\cdot f_{CPI,t} + \\beta_{i,Rate} \\cdot f_{Rate,t} + \\beta_{i,INR} \\cdot f_{INR,t} + \\beta_{i,Oil} \\cdot f_{Oil,t} + \\epsilon_{i,t}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(i.InlineMath,{math:"f_{k,t}"})," represents the surprise (innovation) in factor ",e.jsx(i.InlineMath,{math:"k"}),", defined as the difference between the realized value and the market's prior expectation:"]}),e.jsx(i.BlockMath,{math:"f_{k,t} = X_{k,t}^{actual} - E_{t-1}[X_{k,t}]"}),e.jsx(b,{title:"APT No-Arbitrage Pricing",label:"Theorem 11.7",statement:"In the absence of arbitrage opportunities, the expected excess return of any asset i must be a linear combination of its factor betas times the factor risk premiums: E[R_i] - r_f = \\sum_{k=1}^{K} \\beta_{i,k} \\lambda_k, where \\lambda_k is the risk premium for factor k.",proof:"By the APT, construct a well-diversified portfolio with zero exposure to all factors except factor k. In the absence of arbitrage, this portfolio must earn exactly \\lambda_k per unit of beta exposure. By combining such factor-mimicking portfolios, any asset's expected return is fully explained by its factor loadings."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Factor Construction for India"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The macro factors are constructed from Indian economic time series:"}),e.jsx(i.BlockMath,{math:"f_{GDP} = \\Delta \\ln(IIP_t) - E[\\Delta \\ln(IIP_t)]"}),e.jsx(i.BlockMath,{math:"f_{CPI} = \\Delta CPI_t - E[\\Delta CPI_t]"}),e.jsx(i.BlockMath,{math:"f_{Rate} = \\Delta r_{repo,t} + \\Delta \\text{term spread}_t"}),e.jsx(i.BlockMath,{math:"f_{INR} = \\Delta \\ln(INR/USD)_t"}),e.jsx(i.BlockMath,{math:"f_{Oil} = \\Delta \\ln(\\text{Brent}_{INR,t})"}),e.jsx(f,{title:"Sector Factor Exposures in India",type:"tip",children:e.jsxs("ul",{className:"space-y-1 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"IT Services:"})," Positive INR depreciation beta (USD revenues), low oil beta"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Banking:"})," High negative rate beta (rate cuts boost NIMs), positive GDP beta"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Oil Marketing:"})," Strong negative oil beta (BPCL, HPCL, IOC)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"FMCG:"})," Negative inflation beta (input cost pressure), low GDP beta"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Metals:"})," High GDP beta, positive oil beta (commodity co-movement)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Auto:"})," Negative rate beta (consumer financing), positive GDP beta"]})]})}),e.jsx(K,{}),e.jsx(v,{title:"macro_factor_model.py",runnable:!0,code:`import numpy as np

class MacroFactorModel:
    """APT-based macro factor model for Indian equities."""

    def __init__(self, factor_names):
        self.factor_names = factor_names
        self.K = len(factor_names)
        self.betas = {}      # stock -> array of betas
        self.risk_premia = np.zeros(self.K)

    def set_betas(self, stock, betas):
        self.betas[stock] = np.array(betas)

    def set_risk_premia(self, premia):
        self.risk_premia = np.array(premia)

    def expected_return(self, stock, rf=0.07):
        """APT expected return."""
        return rf + np.dot(self.betas[stock], self.risk_premia)

    def return_attribution(self, stock, factor_surprises):
        """Decompose realized return into factor contributions."""
        surprises = np.array(factor_surprises)
        contributions = self.betas[stock] * surprises
        return dict(zip(self.factor_names, contributions))

    def factor_risk(self, stock, factor_cov):
        """Compute systematic risk from factor exposures."""
        b = self.betas[stock]
        systematic_var = b @ factor_cov @ b
        return np.sqrt(systematic_var)

# Define Indian macro factors
factors = ['GDP_Growth', 'CPI_Inflation', 'RBI_Rate', 'INR_USD', 'Crude_Oil']
model = MacroFactorModel(factors)

# Factor risk premia (annualized, estimated)
model.set_risk_premia([0.03, -0.01, -0.02, -0.015, -0.005])

# Set betas for NSE sectors
model.set_betas('Nifty_IT',      [ 0.5, -0.3, -0.5,  1.5, -0.2])
model.set_betas('Bank_Nifty',    [ 1.8, -0.8, -2.0, -0.5, -0.3])
model.set_betas('Nifty_FMCG',   [ 0.3, -1.2, -0.3, -0.2, -0.5])
model.set_betas('Nifty_Metal',   [ 2.0,  0.5,  -0.8,  0.3,  1.2])
model.set_betas('Nifty_Energy',  [ 1.0,  0.3, -0.5,  0.5,  1.8])
model.set_betas('Nifty_Auto',    [ 1.5, -0.6, -1.5, -0.3, -0.8])

# Factor covariance matrix
factor_cov = np.array([
    [0.0004, 0.0001, 0.0000, -0.0001, 0.0001],
    [0.0001, 0.0003, 0.0001,  0.0001, 0.0002],
    [0.0000, 0.0001, 0.0002,  0.0000, 0.0000],
    [-0.0001, 0.0001, 0.0000, 0.0005, 0.0001],
    [0.0001, 0.0002, 0.0000,  0.0001, 0.0008]
])

print("=" * 60)
print("  Macro Factor Model - Indian Sector Analysis")
print("=" * 60)

# Expected returns
print(f"\\n{'Sector':<16} {'E[R]':>7} {'Sys Risk':>9}")
print("-" * 35)
for stock in model.betas:
    er = model.expected_return(stock) * 100
    risk = model.factor_risk(stock, factor_cov) * np.sqrt(252) * 100
    print(f"{stock:<16} {er:>6.1f}% {risk:>8.1f}%")

# Scenario: RBI cuts rate by 25bps, oil spikes 5%
print(f"\\nScenario: RBI -25bps rate cut, Crude +5%")
print("-" * 55)
surprises = [0.0, 0.0, -0.0025, 0.0, 0.05]
for stock in model.betas:
    attrib = model.return_attribution(stock, surprises)
    total = sum(attrib.values())
    print(f"  {stock:<16} Total: {total*100:>+5.2f}%")
    for f, c in attrib.items():
        if abs(c) > 0.0001:
            print(f"    {f:<16} {c*100:>+5.2f}%")`}),e.jsx(_,{title:"Macro Factor Attribution for Bank Nifty",difficulty:"intermediate",problem:"Bank Nifty has factor betas: GDP=1.8, Inflation=-0.8, Rate=-2.0, INR=-0.5, Oil=-0.3. In a month, GDP surprise is +0.3%, inflation surprise is +0.2%, RBI surprises with a 25bps cut, INR depreciates 1%, oil rises 3%. Compute the macro-driven return.",solution:[{step:"Compute each factor contribution",formula:"R_{GDP} = 1.8 \\times 0.003 = +0.54\\%",explanation:"Positive GDP surprise is bullish for banks (higher credit growth)."},{step:"Inflation and rate contributions",formula:"R_{CPI} = -0.8 \\times 0.002 = -0.16\\%,\\quad R_{Rate} = -2.0 \\times (-0.0025) = +0.50\\%",explanation:"Rate cut is very positive for banks (lower funding costs, bond gains)."},{step:"INR and oil contributions",formula:"R_{INR} = -0.5 \\times (-0.01) = +0.50\\%,\\quad R_{Oil} = -0.3 \\times 0.03 = -0.90\\%",explanation:"INR depreciation mildly positive (FII flow effect), oil spike negative."},{step:"Total macro-driven return",formula:"R_{macro} = 0.54 - 0.16 + 0.50 + 0.50 - 0.90 = +0.48\\%",explanation:"Bank Nifty is expected to gain 0.48% from macro factors, driven primarily by the RBI rate cut and GDP surprise, partially offset by the oil price spike."}]}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Macro factor models provide a systematic framework for understanding how macroeconomic forces drive Indian equity returns. By estimating sector-level factor betas, portfolio managers can construct macro-hedged portfolios, stress-test against scenarios (RBI tightening, oil shocks, INR crisis), and generate alpha from macro views. The key India-specific factors are RBI policy, crude oil prices, and INR/USD -- these three explain the majority of macro-driven return variation across Nifty sectoral indices."})})]})}const ce=Object.freeze(Object.defineProperty({__proto__:null,default:U},Symbol.toStringTag,{value:"Module"}));function Q(){const[t,p]=o.useState(120),[s,m]=o.useState(10),[r,x]=o.useState(5e3),[a,u]=o.useState(3),c=-.02*(t/100)-.003*s-1e-4*(r/1e3)-.005*a,k=2.5*(t/100)+.3*s+.5*(r/1e3),n=.01*(t/100)+.002*s+.003*a;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Geopolitical Risk Impact on Indian Markets"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Model the cascading impact of geopolitical events on Nifty, India VIX, and gold."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["GPR Index = ",t]}),e.jsx("input",{type:"range",min:"50",max:"300",step:"5",value:t,onChange:g=>p(parseFloat(g.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Oil Shock = +",s,"%"]}),e.jsx("input",{type:"range",min:"0",max:"50",step:"1",value:s,onChange:g=>m(parseFloat(g.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["FII Outflow = INR ",r," Cr"]}),e.jsx("input",{type:"range",min:"0",max:"20000",step:"500",value:r,onChange:g=>x(parseFloat(g.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["INR Depreciation = ",a,"%"]}),e.jsx("input",{type:"range",min:"0",max:"15",step:"0.5",value:a,onChange:g=>u(parseFloat(g.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-3 text-sm",children:[e.jsxs("div",{className:"rounded-lg bg-red-50 p-3 dark:bg-red-900/30 text-center",children:[e.jsx("span",{className:"text-xs text-gray-600 dark:text-gray-400",children:"Nifty 50 Impact"}),e.jsxs("p",{className:`text-lg font-bold ${c>=0?"text-green-600":"text-red-600"}`,children:[(c*100).toFixed(1),"%"]})]}),e.jsxs("div",{className:"rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30 text-center",children:[e.jsx("span",{className:"text-xs text-gray-600 dark:text-gray-400",children:"India VIX Change"}),e.jsxs("p",{className:"text-lg font-bold text-amber-700 dark:text-amber-300",children:["+",k.toFixed(1)," pts"]})]}),e.jsxs("div",{className:"rounded-lg bg-yellow-50 p-3 dark:bg-yellow-900/30 text-center",children:[e.jsx("span",{className:"text-xs text-gray-600 dark:text-gray-400",children:"Gold (INR) Impact"}),e.jsxs("p",{className:"text-lg font-bold text-yellow-700 dark:text-yellow-300",children:["+",(n*100).toFixed(1),"%"]})]})]}),e.jsxs("svg",{viewBox:"0 0 400 100",className:"w-full max-w-md mx-auto block mt-4",children:[e.jsx("text",{x:"50",y:"20",className:"text-[10px] font-bold",fill:"#6b7280",children:"Transmission Channel"}),e.jsx("rect",{x:"10",y:"30",width:"70",height:"25",rx:"4",fill:"#ef4444",opacity:"0.2",stroke:"#ef4444"}),e.jsx("text",{x:"45",y:"47",textAnchor:"middle",className:"text-[8px]",fill:"#dc2626",children:"GPR Event"}),e.jsx("line",{x1:"80",y1:"42",x2:"110",y2:"42",stroke:"#9ca3af",strokeWidth:"1.5",markerEnd:"url(#geoArrow)"}),e.jsx("rect",{x:"110",y:"30",width:"65",height:"25",rx:"4",fill:"#f59e0b",opacity:"0.2",stroke:"#f59e0b"}),e.jsx("text",{x:"142",y:"47",textAnchor:"middle",className:"text-[8px]",fill:"#d97706",children:"Oil/FII"}),e.jsx("line",{x1:"175",y1:"42",x2:"205",y2:"42",stroke:"#9ca3af",strokeWidth:"1.5"}),e.jsx("rect",{x:"205",y:"30",width:"65",height:"25",rx:"4",fill:"#6366f1",opacity:"0.2",stroke:"#6366f1"}),e.jsx("text",{x:"237",y:"47",textAnchor:"middle",className:"text-[8px]",fill:"#4f46e5",children:"INR/VIX"}),e.jsx("line",{x1:"270",y1:"42",x2:"300",y2:"42",stroke:"#9ca3af",strokeWidth:"1.5"}),e.jsx("rect",{x:"300",y:"30",width:"80",height:"25",rx:"4",fill:"#10b981",opacity:"0.2",stroke:"#10b981"}),e.jsx("text",{x:"340",y:"47",textAnchor:"middle",className:"text-[8px]",fill:"#059669",children:"Nifty/Sectors"})]})]})}function X(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Geopolitical Risk and Indian Markets"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Geopolitical events -- border tensions, global trade wars, energy supply disruptions, and sanctions -- have outsized impacts on Indian equity markets. India's dependence on crude oil imports, sensitivity to FII flows, and proximity to geopolitical hotspots make quantifying geopolitical risk essential for systematic trading on NSE and BSE."}),e.jsx(y,{title:"Geopolitical Risk Index (GPR)",label:"Definition 11.16",definition:"The Geopolitical Risk Index, constructed by Caldara and Iacoviello, measures geopolitical risk based on automated text analysis of newspaper articles. The GPR index captures risks related to wars, terrorism, and tensions between major states. An India-specific GPR can be constructed from Indian media sources using NLP-based event extraction.",notation:"GPR_t = f(\\text{count of geopolitical articles in period } t)"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Transmission Channels to Indian Markets"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Geopolitical risk transmits to Indian equities through four primary channels:"}),e.jsx(i.BlockMath,{math:"R_{Nifty,t} = \\alpha + \\beta_1 \\Delta GPR_t + \\beta_2 \\Delta Oil_t + \\beta_3 \\Delta FII_t + \\beta_4 \\Delta INR_t + \\epsilon_t"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The causal chain operates as: Geopolitical event causes oil spike and capital outflows, which cause INR depreciation and VIX spike, which cause Nifty selloff with sector-specific differential impacts."}),e.jsx(b,{title:"Geopolitical Risk Premium",label:"Theorem 11.8",statement:"Geopolitical risk commands a positive risk premium in Indian equities: stocks with higher geopolitical beta (more sensitive to GPR shocks) earn higher expected returns. The geopolitical risk premium in India is estimated at 1-2% annualized, concentrated in defense, oil-sensitive, and border-state exposed sectors.",proof:"Using event study methodology around India-specific geopolitical events (Pulwama 2019, Galwan 2020, etc.), stocks with high GPR beta experienced larger drawdowns but subsequently recovered with excess returns. The unconditional risk premium is estimated via Fama-MacBeth regressions of stock returns on GPR betas, controlling for standard factors."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"India-Specific Geopolitical Scenarios"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The conditional impact of geopolitical events on Nifty can be modeled using an event study framework with abnormal returns:"}),e.jsx(i.BlockMath,{math:"AR_{i,t} = R_{i,t} - (\\hat{\\alpha}_i + \\hat{\\beta}_i R_{m,t})"}),e.jsx(i.BlockMath,{math:"CAR_{i}(t_1, t_2) = \\sum_{t=t_1}^{t_2} AR_{i,t}"}),e.jsx(f,{title:"Historical Geopolitical Events and Nifty",type:"historical",children:e.jsxs("ul",{className:"space-y-1 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Kargil War (1999):"})," Nifty fell ~15% then recovered fully within 3 months"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Mumbai Attacks (2008):"})," Short-lived 5% decline amid broader GFC"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Surgical Strikes (2016):"})," Nifty dropped 1.5%, recovered in 2 sessions"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Pulwama/Balakot (2019):"})," Initial 2% drop, full recovery in 1 week"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Galwan Clash (2020):"})," Minimal direct equity impact amid COVID recovery"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Russia-Ukraine (2022):"})," Nifty fell 10% over 2 months on oil spike and FII outflows"]})]})}),e.jsx(Q,{}),e.jsx(v,{title:"geopolitical_risk.py",runnable:!0,code:`import numpy as np

class GeopoliticalRiskModel:
    """Geopolitical risk analysis for Indian equity markets."""

    def __init__(self):
        self.events = []
        self.sector_betas = {}

    def add_event(self, name, gpr_level, oil_impact, fii_outflow_cr,
                   inr_impact, nifty_impact, recovery_days):
        self.events.append({
            'name': name, 'gpr': gpr_level, 'oil': oil_impact,
            'fii': fii_outflow_cr, 'inr': inr_impact,
            'nifty': nifty_impact, 'recovery': recovery_days
        })

    def set_sector_gpr_beta(self, sector, beta):
        self.sector_betas[sector] = beta

    def scenario_impact(self, gpr_shock, oil_pct, fii_cr, inr_pct):
        """Estimate Nifty impact from a geopolitical scenario."""
        nifty_impact = (-0.02 * gpr_shock / 100 - 0.003 * oil_pct
                        - 0.0001 * fii_cr / 1000 - 0.005 * inr_pct)
        vix_change = 2.5 * gpr_shock / 100 + 0.3 * oil_pct

        sector_impacts = {}
        for sector, beta in self.sector_betas.items():
            sector_impacts[sector] = nifty_impact * beta

        return {
            'nifty_impact': nifty_impact,
            'vix_change': vix_change,
            'sector_impacts': sector_impacts
        }

    def event_statistics(self):
        if not self.events:
            return {}
        impacts = [e['nifty'] for e in self.events]
        recoveries = [e['recovery'] for e in self.events]
        return {
            'avg_drawdown': np.mean(impacts),
            'worst_drawdown': np.min(impacts),
            'avg_recovery_days': np.mean(recoveries),
            'median_recovery_days': np.median(recoveries)
        }

# Build India geopolitical risk model
model = GeopoliticalRiskModel()

# Historical events
model.add_event("Kargil War",         gpr_level=200, oil_impact=15, fii_outflow_cr=8000,  inr_impact=5,  nifty_impact=-15, recovery_days=90)
model.add_event("Parliament Attack",  gpr_level=180, oil_impact=5,  fii_outflow_cr=3000,  inr_impact=2,  nifty_impact=-5,  recovery_days=20)
model.add_event("Mumbai 2008",        gpr_level=160, oil_impact=8,  fii_outflow_cr=12000, inr_impact=8,  nifty_impact=-5,  recovery_days=15)
model.add_event("Surgical Strikes",   gpr_level=140, oil_impact=2,  fii_outflow_cr=2000,  inr_impact=0.5,nifty_impact=-1.5,recovery_days=2)
model.add_event("Pulwama/Balakot",    gpr_level=170, oil_impact=3,  fii_outflow_cr=3500,  inr_impact=1,  nifty_impact=-2,  recovery_days=7)
model.add_event("Russia-Ukraine",     gpr_level=250, oil_impact=40, fii_outflow_cr=15000, inr_impact=4,  nifty_impact=-10, recovery_days=60)

# Sector GPR betas
model.set_sector_gpr_beta('Nifty_IT',     0.6)
model.set_sector_gpr_beta('Bank_Nifty',   1.3)
model.set_sector_gpr_beta('Nifty_Defense', 0.4)  # Often benefits
model.set_sector_gpr_beta('Nifty_Energy', 1.8)
model.set_sector_gpr_beta('Nifty_FMCG',  0.5)
model.set_sector_gpr_beta('Nifty_Metal',  1.5)

# Historical analysis
stats = model.event_statistics()
print("=" * 60)
print("  India Geopolitical Risk Analysis")
print("=" * 60)
print(f"\\nHistorical Event Statistics:")
print(f"  Events analyzed:       {len(model.events)}")
print(f"  Average drawdown:      {stats['avg_drawdown']:.1f}%")
print(f"  Worst drawdown:        {stats['worst_drawdown']:.1f}%")
print(f"  Avg recovery (days):   {stats['avg_recovery_days']:.0f}")
print(f"  Median recovery:       {stats['median_recovery_days']:.0f}")

print(f"\\nEvent History:")
for e in model.events:
    print(f"  {e['name']:<22} Nifty: {e['nifty']:>+5.1f}%  "
          f"Oil: +{e['oil']:>2.0f}%  Recovery: {e['recovery']:>3.0f}d")

# Scenario analysis
print(f"\\nScenario: Major Border Escalation")
print("-" * 50)
result = model.scenario_impact(gpr_shock=180, oil_pct=20,
                                fii_cr=10000, inr_pct=5)
print(f"  Expected Nifty Impact: {result['nifty_impact']*100:.1f}%")
print(f"  India VIX Change:      +{result['vix_change']:.1f} pts")
print(f"\\n  Sector Impacts:")
for sector, impact in sorted(result['sector_impacts'].items(),
                              key=lambda x: x[1]):
    print(f"    {sector:<18} {impact*100:>+6.2f}%")`}),e.jsx(_,{title:"Event Study: Oil Price Shock Impact",difficulty:"intermediate",problem:"Crude oil spikes 25% due to Middle East tensions. India imports 85% of its crude. Estimate the impact on Nifty using: oil beta = -0.003 per 1% oil move, FII outflows of INR 8,000 Cr (beta = -0.0001 per INR 1,000 Cr), and INR depreciation of 3% (beta = -0.005 per 1%).",solution:[{step:"Oil price impact",formula:"R_{oil} = -0.003 \\times 25 = -7.5\\%",explanation:"Direct oil impact on Nifty through import costs and current account deterioration."},{step:"FII outflow impact",formula:"R_{FII} = -0.0001 \\times 8 = -0.08\\%",explanation:"FII selling pressure creates market impact."},{step:"INR depreciation impact",formula:"R_{INR} = -0.005 \\times 3 = -1.5\\%",explanation:"Currency depreciation compounds the oil import cost and signals capital flight."},{step:"Total estimated Nifty impact",formula:"R_{total} = -7.5 - 0.08 - 1.5 = -9.08\\%",explanation:"Expected Nifty drawdown of approximately 9%, consistent with the Russia-Ukraine episode where a similar oil shock caused a 10% decline. Energy-heavy sectors (BPCL, HPCL) would be disproportionately affected."}]}),e.jsx(f,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Geopolitical risk is an underpriced source of systematic risk in Indian markets. The primary transmission channels -- crude oil prices, FII flows, and INR depreciation -- can be modeled quantitatively. Historical analysis shows that India-specific geopolitical events (border tensions, surgical strikes) typically cause 1-5% drawdowns with rapid recovery, while global events with oil supply implications cause larger 10-15% drawdowns. Systematic strategies should maintain geopolitical hedges through gold allocation, put protection on Nifty, and reduced exposure to oil-sensitive sectors during elevated GPR periods."})})]})}const de=Object.freeze(Object.defineProperty({__proto__:null,default:X},Symbol.toStringTag,{value:"Module"}));export{te as a,ae as b,re as c,se as d,ie as e,ne as f,oe as g,le as h,ce as i,de as j,ee as s};
