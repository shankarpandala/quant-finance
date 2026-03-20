import{j as e,r as u}from"./vendor-DgA46Qmo.js";import{r as t}from"./vendor-katex-C-S70IU0.js";import{D as v,T as w,N as _,P as k,E as N}from"./subject-01-math-foundations-vREfsVbS.js";function I(){const[n,y]=u.useState(20),[c,b]=u.useState("ema"),[s,j]=u.useState(2),d=[100,102,99,101,103,105,104,106,108,107,109,111,110,112,114,113,115,117,116,118,120,119,121,123,122],i=d.slice(0,Math.min(n+5,d.length)),o=i.slice(1).map((p,h)=>(p-i[h])/i[h]*100),m=o.reduce((p,h)=>p+h,0)/o.length,l=Math.sqrt(o.reduce((p,h)=>p+(h-m)**2,0)/o.length),r=l>0?(o[o.length-1]-m)/l:0,a=i.slice(-n).reduce((p,h)=>p+h,0)/Math.min(n,i.length),g=(i[i.length-1]-a)/a*100,f=[{name:"Returns Mean",value:m.toFixed(3)+"%"},{name:"Returns Std",value:l.toFixed(3)+"%"},{name:`MA(${n})`,value:a.toFixed(2)},{name:"MA Distance",value:g.toFixed(2)+"%"},{name:"Z-Score",value:r.toFixed(3)},{name:"Signal",value:Math.abs(r)>s?"ACTIVE":"NEUTRAL"}];return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Feature Engineering from Price Data"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Explore how lookback windows and thresholds affect feature construction for Nifty 50 data."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Lookback Window = ",n," days"]}),e.jsx("input",{type:"range",min:"5",max:"25",step:"1",value:n,onChange:p=>y(parseInt(p.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Z-Score Threshold = ",s.toFixed(1)]}),e.jsx("input",{type:"range",min:"1",max:"3",step:"0.1",value:s,onChange:p=>j(parseFloat(p.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["MA Type: ",c.toUpperCase()]}),e.jsxs("select",{value:c,onChange:p=>b(p.target.value),className:"rounded border border-gray-300 px-2 py-1 text-xs dark:border-gray-600 dark:bg-gray-800",children:[e.jsx("option",{value:"sma",children:"SMA"}),e.jsx("option",{value:"ema",children:"EMA"})]})]})]}),e.jsx("div",{className:"grid grid-cols-3 gap-2 sm:grid-cols-6",children:f.map(p=>e.jsxs("div",{className:"rounded-lg bg-gray-50 p-2 text-center dark:bg-gray-800",children:[e.jsx("span",{className:"text-[10px] text-gray-500 dark:text-gray-400",children:p.name}),e.jsx("p",{className:`text-sm font-bold ${p.value==="ACTIVE"?"text-red-500":"text-indigo-600 dark:text-indigo-400"}`,children:p.value})]},p.name))}),e.jsxs("svg",{viewBox:"0 0 400 120",className:"w-full max-w-lg mx-auto block mt-4",children:[i.map((p,h)=>{const M=20+h*(360/i.length),S=110-(p-95)*3.5;return e.jsxs("g",{children:[h>0&&e.jsx("line",{x1:20+(h-1)*(360/i.length),y1:110-(i[h-1]-95)*3.5,x2:M,y2:S,stroke:"#6366f1",strokeWidth:"1.5"}),e.jsx("circle",{cx:M,cy:S,r:"2",fill:"#6366f1"})]},h)}),e.jsx("line",{x1:"20",y1:110-(a-95)*3.5,x2:"380",y2:110-(a-95)*3.5,stroke:"#ef4444",strokeWidth:"1",strokeDasharray:"4"}),e.jsx("text",{x:"385",y:113-(a-95)*3.5,className:"text-[8px]",fill:"#ef4444",children:"MA"})]})]})}function T(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Feature Engineering for Financial ML"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Feature engineering is the most critical step in building ML-based trading strategies. Raw market data from NSE (OHLCV, order book) must be transformed into informative features that capture predictive patterns. This section covers systematic feature construction methods designed to avoid lookahead bias and information leakage."}),e.jsx(v,{title:"Feature (Predictor Variable)",label:"Definition 12.1",definition:"A feature in financial ML is a numerical representation of market state at time t, computed using only information available up to time t (no future information). Features transform raw data (prices, volumes, fundamentals) into signals that ML models can learn from. The feature matrix X has shape (T, K) where T is the number of observations and K is the number of features.",notation:"x_{t,k} = f_k(P_{1:t}, V_{1:t}, F_{1:t}) \\quad \\text{(no lookahead)}"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Feature Categories for Indian Equities"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Features for NSE/BSE equities fall into several categories. Price-based features capture momentum and mean-reversion:"}),e.jsx(t.BlockMath,{math:"r_{t,d} = \\ln\\left(\\frac{P_t}{P_{t-d}}\\right) \\quad \\text{(log return over } d \\text{ days)}"}),e.jsx(t.BlockMath,{math:"\\text{RSI}_t = 100 - \\frac{100}{1 + \\frac{\\text{avg gain}_{t,n}}{\\text{avg loss}_{t,n}}}"}),e.jsx(t.BlockMath,{math:"z_t = \\frac{P_t - \\mu_{t,n}}{\\sigma_{t,n}} \\quad \\text{(rolling z-score)}"}),e.jsx(w,{title:"Feature Information Content",label:"Theorem 12.1",statement:"The mutual information between a feature X and the target label Y bounds the achievable prediction accuracy: I(X; Y) \\geq H(Y) - H(Y|X). A feature is informative if and only if I(X; Y) > 0, meaning knowing the feature reduces uncertainty about the label.",proof:"By the data processing inequality, any transformation g(X) satisfies I(g(X); Y) \\leq I(X; Y). Therefore, feature engineering should preserve or enhance mutual information with the target. The Fano inequality further bounds the error rate: P_e \\geq \\frac{H(Y|X) - 1}{\\log(|Y|)}."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Volume and Microstructure Features"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Volume features from NSE data capture participation and liquidity dynamics:"}),e.jsx(t.BlockMath,{math:"\\text{VWAP}_t = \\frac{\\sum_{i=1}^{N} P_i \\cdot V_i}{\\sum_{i=1}^{N} V_i}"}),e.jsx(t.BlockMath,{math:"\\text{Volume Ratio}_t = \\frac{V_t}{\\text{MA}(V, 20)_t}"}),e.jsx(t.BlockMath,{math:"\\text{Amihud Illiquidity}_t = \\frac{|r_t|}{V_t \\cdot P_t} \\times 10^6"}),e.jsx(_,{title:"India-Specific Features",type:"tip",children:e.jsxs("ul",{className:"space-y-1 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"FII/DII Flow:"})," Daily FII and DII net buy/sell from NSE as a feature"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"India VIX:"})," Implied volatility from Nifty options as a regime indicator"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Rollover Data:"})," F&O monthly rollover percentage as sentiment proxy"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"PCR:"})," Put-Call Ratio from NSE options data for sentiment"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Delivery %:"})," Delivery volume percentage from NSE Bhavcopy"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Circuit Limits:"})," Proximity to SEBI-mandated circuit breaker levels"]})]})}),e.jsx(I,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Feature Stationarity and Transformation"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Raw price data is non-stationary. Features must be transformed to achieve stationarity for ML models. The fractional differentiation operator preserves memory while achieving stationarity:"}),e.jsx(t.BlockMath,{math:"(1 - B)^d X_t = \\sum_{k=0}^{\\infty} \\binom{d}{k} (-1)^k X_{t-k}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"d \\in (0, 1)"})," is the differentiation order and"," ",e.jsx(t.InlineMath,{math:"B"})," is the backshift operator. Choosing the minimum"," ",e.jsx(t.InlineMath,{math:"d"})," that achieves stationarity (ADF test) preserves maximum predictive information."]}),e.jsx(k,{title:"feature_engineering.py",runnable:!0,code:`import numpy as np

class FinancialFeatureEngine:
    """Feature engineering for NSE equity data."""

    def __init__(self, prices, volumes=None):
        self.prices = np.array(prices, dtype=float)
        self.volumes = np.array(volumes, dtype=float) if volumes is not None else None
        self.features = {}

    def log_returns(self, periods=[1, 5, 10, 21]):
        for d in periods:
            if len(self.prices) > d:
                ret = np.log(self.prices[d:] / self.prices[:-d])
                padded = np.full(len(self.prices), np.nan)
                padded[d:] = ret
                self.features[f'ret_{d}d'] = padded
        return self

    def rolling_zscore(self, window=20):
        zscores = np.full(len(self.prices), np.nan)
        for i in range(window, len(self.prices)):
            w = self.prices[i-window:i]
            mu, sigma = np.mean(w), np.std(w)
            if sigma > 0:
                zscores[i] = (self.prices[i] - mu) / sigma
        self.features[f'zscore_{window}'] = zscores
        return self

    def rsi(self, period=14):
        deltas = np.diff(self.prices)
        rsi_vals = np.full(len(self.prices), np.nan)
        for i in range(period, len(deltas)):
            gains = deltas[i-period:i]
            avg_gain = np.mean(np.maximum(gains, 0))
            avg_loss = np.mean(np.abs(np.minimum(gains, 0)))
            if avg_loss > 0:
                rs = avg_gain / avg_loss
                rsi_vals[i+1] = 100 - 100 / (1 + rs)
            else:
                rsi_vals[i+1] = 100
        self.features['rsi_14'] = rsi_vals
        return self

    def volatility(self, windows=[5, 10, 21]):
        rets = np.diff(np.log(self.prices))
        for w in windows:
            vol = np.full(len(self.prices), np.nan)
            for i in range(w, len(rets)):
                vol[i+1] = np.std(rets[i-w:i]) * np.sqrt(252)
            self.features[f'vol_{w}d'] = vol
        return self

    def volume_features(self):
        if self.volumes is None:
            return self
        vol_ratio = np.full(len(self.volumes), np.nan)
        for i in range(20, len(self.volumes)):
            avg_vol = np.mean(self.volumes[i-20:i])
            if avg_vol > 0:
                vol_ratio[i] = self.volumes[i] / avg_vol
        self.features['vol_ratio'] = vol_ratio
        return self

    def get_feature_matrix(self):
        n = len(self.prices)
        names = sorted(self.features.keys())
        X = np.column_stack([self.features[f] for f in names])
        return X, names

# Generate synthetic Nifty 50 daily data
np.random.seed(42)
n_days = 252
returns = np.random.normal(0.0005, 0.015, n_days)
prices = 18000 * np.exp(np.cumsum(returns))
volumes = np.random.lognormal(18, 0.5, n_days)

# Build features
engine = FinancialFeatureEngine(prices, volumes)
engine.log_returns([1, 5, 10, 21])
engine.rolling_zscore(20)
engine.rsi(14)
engine.volatility([5, 10, 21])
engine.volume_features()

X, feature_names = engine.get_feature_matrix()

print("=" * 60)
print("  Feature Engineering - Nifty 50 Data")
print("=" * 60)
print(f"\\nPrice data: {n_days} trading days")
print(f"Features generated: {len(feature_names)}")
print(f"Feature matrix shape: {X.shape}")
print(f"\\nFeature Summary (last available observation):")
print(f"{'Feature':<18} {'Value':>10} {'Non-NaN':>10}")
print("-" * 40)
for i, name in enumerate(feature_names):
    col = X[:, i]
    valid = np.sum(~np.isnan(col))
    last_valid = col[~np.isnan(col)][-1] if valid > 0 else np.nan
    print(f"{name:<18} {last_valid:>10.4f} {valid:>10}")

print(f"\\nCorrelation between ret_1d and ret_5d: "
      f"{np.corrcoef(X[50:, feature_names.index('ret_1d')], X[50:, feature_names.index('ret_5d')])[0,1]:.3f}")`}),e.jsx(N,{title:"Computing RSI for a Nifty 50 Stock",difficulty:"beginner",problem:"Over the last 14 days, a Nifty 50 stock had 9 up days with average gain of 1.2% and 5 down days with average loss of 0.8%. Compute the RSI.",solution:[{step:"Compute Relative Strength",formula:"RS = \\frac{\\text{Avg Gain}}{\\text{Avg Loss}} = \\frac{1.2}{0.8} = 1.5",explanation:"RS measures the ratio of average upward to downward price movements."},{step:"Compute RSI",formula:"RSI = 100 - \\frac{100}{1 + 1.5} = 100 - 40 = 60",explanation:"RSI of 60 indicates mildly bullish momentum. Values above 70 are overbought, below 30 oversold."},{step:"Feature interpretation",formula:"x_{RSI} = 60 \\in [30, 70] \\Rightarrow \\text{Neutral zone}",explanation:"This would be encoded as a neutral signal in the feature matrix. For ML models, RSI is typically normalized to [0, 1] by dividing by 100."}]}),e.jsx(_,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Feature engineering is the primary driver of ML model performance in quantitative trading. For Indian equities, combine price-based features (returns, momentum, volatility) with India-specific features (FII flows, India VIX, delivery percentage). Always ensure features are point-in-time (no lookahead bias) and stationary. The fractional differentiation approach provides a principled way to balance stationarity with information preservation."})})]})}const te=Object.freeze(Object.defineProperty({__proto__:null,default:T},Symbol.toStringTag,{value:"Module"}));function F(){const[n,y]=u.useState(2),[c,b]=u.useState(2),[s,j]=u.useState(10),d=[100,101.2,100.5,102.1,103.5,102.8,104.2,103.1,105,104.3,106.1,105.5,107.2],i=d[0],o=1.2,m=i*(1+n*o/100),l=i*(1-c*o/100);let r=Math.min(s,d.length-1),a="TIME",x=d[r];for(let p=1;p<Math.min(s+1,d.length);p++){if(d[p]>=m){r=p,a="UPPER",x=d[p];break}if(d[p]<=l){r=p,a="LOWER",x=d[p];break}}const g=(x-i)/i*100,f=a==="UPPER"?1:a==="LOWER"?-1:g>0?1:-1;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Triple Barrier Labeling"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust barrier widths and holding period to see how labels are generated for Nifty 50 trades."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Upper Barrier = ",n.toFixed(1)," x daily vol"]}),e.jsx("input",{type:"range",min:"0.5",max:"5",step:"0.5",value:n,onChange:p=>y(parseFloat(p.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Lower Barrier = ",c.toFixed(1)," x daily vol"]}),e.jsx("input",{type:"range",min:"0.5",max:"5",step:"0.5",value:c,onChange:p=>b(parseFloat(p.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Max Holding = ",s," days"]}),e.jsx("input",{type:"range",min:"3",max:"12",step:"1",value:s,onChange:p=>j(parseInt(p.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 420 160",className:"w-full max-w-lg mx-auto block",children:[e.jsx("line",{x1:"30",y1:80-(m-103)*6,x2:30+s*28,y2:80-(m-103)*6,stroke:"#16a34a",strokeWidth:"1.5",strokeDasharray:"4"}),e.jsxs("text",{x:35+s*28,y:83-(m-103)*6,className:"text-[8px]",fill:"#16a34a",children:["Upper (",m.toFixed(1),")"]}),e.jsx("line",{x1:"30",y1:80-(l-103)*6,x2:30+s*28,y2:80-(l-103)*6,stroke:"#dc2626",strokeWidth:"1.5",strokeDasharray:"4"}),e.jsxs("text",{x:35+s*28,y:83-(l-103)*6,className:"text-[8px]",fill:"#dc2626",children:["Lower (",l.toFixed(1),")"]}),e.jsx("line",{x1:30+s*28,y1:80-(m-103)*6,x2:30+s*28,y2:80-(l-103)*6,stroke:"#6366f1",strokeWidth:"1.5",strokeDasharray:"4"}),d.slice(0,s+1).map((p,h)=>{const M=30+h*28,S=80-(p-103)*6;return e.jsxs("g",{children:[h>0&&e.jsx("line",{x1:30+(h-1)*28,y1:80-(d[h-1]-103)*6,x2:M,y2:S,stroke:"#6366f1",strokeWidth:"1.5"}),e.jsx("circle",{cx:M,cy:S,r:h===r?4:2,fill:h===r?f===1?"#16a34a":"#dc2626":"#6366f1"})]},h)})]}),e.jsxs("div",{className:"mt-3 grid grid-cols-4 gap-2 text-center text-xs",children:[e.jsxs("div",{className:"rounded bg-gray-100 p-2 dark:bg-gray-800",children:[e.jsx("span",{className:"text-gray-500",children:"Entry"}),e.jsxs("p",{className:"font-bold",children:["INR ",i]})]}),e.jsxs("div",{className:"rounded bg-gray-100 p-2 dark:bg-gray-800",children:[e.jsx("span",{className:"text-gray-500",children:"Exit Day"}),e.jsx("p",{className:"font-bold",children:r})]}),e.jsxs("div",{className:"rounded bg-gray-100 p-2 dark:bg-gray-800",children:[e.jsx("span",{className:"text-gray-500",children:"Exit Type"}),e.jsx("p",{className:`font-bold ${a==="UPPER"?"text-green-600":a==="LOWER"?"text-red-500":"text-amber-600"}`,children:a})]}),e.jsxs("div",{className:"rounded bg-gray-100 p-2 dark:bg-gray-800",children:[e.jsx("span",{className:"text-gray-500",children:"Label"}),e.jsx("p",{className:`font-bold ${f===1?"text-green-600":"text-red-500"}`,children:f===1?"+1 (Long)":"-1 (Short)"})]})]})]})}function C(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Labeling Methods for Financial ML"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"In supervised ML for trading, the label (target variable) defines what the model learns to predict. Naive labeling (e.g., next-day return sign) introduces noise and path-dependency issues. Advanced labeling methods like the triple-barrier method and meta-labeling, adapted for Indian market microstructure and SEBI regulations, produce cleaner training signals."}),e.jsx(v,{title:"Triple-Barrier Method",label:"Definition 12.2",definition:"The triple-barrier method labels each observation by which of three barriers is touched first: (1) an upper horizontal barrier at entry_price * (1 + pt), yielding label +1 (profit-taking), (2) a lower horizontal barrier at entry_price * (1 - sl), yielding label -1 (stop-loss), or (3) a vertical barrier at t + max_holding, with the label determined by the sign of the return at expiry.",notation:"y_i = \\begin{cases} +1 & \\text{upper barrier hit first} \\\\ -1 & \\text{lower barrier hit first} \\\\ \\text{sign}(r_{t+h}) & \\text{time barrier hit} \\end{cases}"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Fixed-Horizon vs. Variable-Horizon Labels"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Fixed-horizon labeling assigns labels based on returns over a fixed window:"}),e.jsx(t.BlockMath,{math:"y_t = \\text{sign}(r_{t, t+h}) = \\text{sign}\\left(\\frac{P_{t+h} - P_t}{P_t}\\right)"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The triple-barrier method uses volatility-adjusted barriers, where the barrier width is scaled by daily volatility ",e.jsx(t.InlineMath,{math:"\\sigma_{daily}"}),":"]}),e.jsx(t.BlockMath,{math:"\\text{Upper} = P_t \\cdot (1 + k_{up} \\cdot \\sigma_{daily,t}), \\quad \\text{Lower} = P_t \\cdot (1 - k_{down} \\cdot \\sigma_{daily,t})"}),e.jsx(w,{title:"Label Purity and Concurrency",label:"Theorem 12.2",statement:"When labels overlap in time (concurrent labels), the effective number of independent observations is reduced. The average uniqueness of label i is: \\bar{u}_i = \\frac{1}{|T_i|}\\sum_{t \\in T_i} \\frac{1}{c_t}, where T_i is the set of time indices over which label i is active and c_t is the number of labels active at time t.",proof:"At time t, c_t labels share the same information. Each label's unique information content at t is 1/c_t. Averaging over the label's lifespan gives \\bar{u}_i. This directly impacts sample weight computation: w_i \\propto \\bar{u}_i."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Meta-Labeling"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Meta-labeling is a two-stage approach where a primary model generates directional signals and a secondary (meta) model learns when to act:"}),e.jsx(t.BlockMath,{math:"y_t^{meta} = \\begin{cases} 1 & \\text{if primary model's bet is profitable} \\\\ 0 & \\text{otherwise} \\end{cases}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The meta-model outputs a probability ",e.jsx(t.InlineMath,{math:"p_t"})," that the primary bet will be profitable, enabling position sizing:",e.jsx(t.InlineMath,{math:"\\; \\text{size}_t = (2p_t - 1) \\cdot \\text{max\\_size}"}),"."]}),e.jsx(_,{title:"Labeling for Indian Markets",type:"tip",children:e.jsxs("ul",{className:"space-y-1 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Circuit Breakers:"})," SEBI circuit limits (5%, 10%, 20%) truncate returns, affecting barrier calibration"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Nifty Expiry:"})," F&O expiry days (last Thursday) create abnormal volatility -- use expiry-aware barriers"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Trading Hours:"})," NSE 9:15-15:30 IST, with pre-open session 9:00-9:15. Label intraday strategies accordingly"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"T+1 Settlement:"})," SEBI's T+1 settlement affects delivery-based strategy labels"]})]})}),e.jsx(F,{}),e.jsx(k,{title:"labeling_methods.py",runnable:!0,code:`import numpy as np

class TripleBarrierLabeler:
    """Triple-barrier labeling for NSE equity data."""

    def __init__(self, prices, daily_vol=None):
        self.prices = np.array(prices, dtype=float)
        if daily_vol is None:
            rets = np.diff(np.log(self.prices))
            self.daily_vol = np.full(len(prices), np.std(rets))
            for i in range(20, len(rets)):
                self.daily_vol[i+1] = np.std(rets[i-20:i])
        else:
            self.daily_vol = np.array(daily_vol)

    def label(self, idx, pt_mult=2.0, sl_mult=2.0, max_holding=10):
        """Label a single observation using triple barrier."""
        entry = self.prices[idx]
        vol = self.daily_vol[idx]
        upper = entry * (1 + pt_mult * vol)
        lower = entry * (1 - sl_mult * vol)

        end_idx = min(idx + max_holding, len(self.prices) - 1)

        for t in range(idx + 1, end_idx + 1):
            if self.prices[t] >= upper:
                return {'label': 1, 'exit_day': t - idx,
                        'exit_type': 'upper', 'return': (self.prices[t] - entry) / entry}
            if self.prices[t] <= lower:
                return {'label': -1, 'exit_day': t - idx,
                        'exit_type': 'lower', 'return': (self.prices[t] - entry) / entry}

        final_ret = (self.prices[end_idx] - entry) / entry
        return {'label': 1 if final_ret > 0 else -1, 'exit_day': end_idx - idx,
                'exit_type': 'time', 'return': final_ret}

    def label_all(self, pt_mult=2.0, sl_mult=2.0, max_holding=10):
        """Label all valid observations."""
        labels = []
        for i in range(len(self.prices) - max_holding):
            result = self.label(i, pt_mult, sl_mult, max_holding)
            labels.append(result)
        return labels

    def compute_uniqueness(self, labels, max_holding):
        """Compute average uniqueness for concurrent labels."""
        n = len(labels)
        concurrency = np.zeros(len(self.prices))
        for i, lbl in enumerate(labels):
            for t in range(i, i + lbl['exit_day'] + 1):
                if t < len(self.prices):
                    concurrency[t] += 1

        uniqueness = []
        for i, lbl in enumerate(labels):
            times = range(i, min(i + lbl['exit_day'] + 1, len(self.prices)))
            u = np.mean([1.0 / concurrency[t] for t in times if concurrency[t] > 0])
            uniqueness.append(u)
        return uniqueness

# Simulate Nifty 50 price data
np.random.seed(42)
n = 252
rets = np.random.normal(0.0004, 0.013, n)
prices = 20000 * np.exp(np.cumsum(rets))

labeler = TripleBarrierLabeler(prices)
labels = labeler.label_all(pt_mult=2.0, sl_mult=2.0, max_holding=10)

# Statistics
n_labels = len(labels)
n_long = sum(1 for l in labels if l['label'] == 1)
n_short = sum(1 for l in labels if l['label'] == -1)
avg_ret = np.mean([l['return'] for l in labels])
exit_types = {}
for l in labels:
    exit_types[l['exit_type']] = exit_types.get(l['exit_type'], 0) + 1

uniqueness = labeler.compute_uniqueness(labels, 10)

print("=" * 55)
print("  Triple-Barrier Labeling - Nifty 50 Simulation")
print("=" * 55)
print(f"\\nTotal observations labeled: {n_labels}")
print(f"Long labels (+1):  {n_long} ({n_long/n_labels*100:.1f}%)")
print(f"Short labels (-1): {n_short} ({n_short/n_labels*100:.1f}%)")
print(f"Average return:    {avg_ret*100:.3f}%")
print(f"\\nExit Type Distribution:")
for etype, count in sorted(exit_types.items()):
    print(f"  {etype:<8} {count:>5} ({count/n_labels*100:.1f}%)")
print(f"\\nAverage label uniqueness: {np.mean(uniqueness):.3f}")
print(f"Min uniqueness:           {np.min(uniqueness):.3f}")
print(f"Effective samples:        {sum(uniqueness):.0f} / {n_labels}")`}),e.jsx(N,{title:"Triple Barrier Label for Nifty 50 Trade",difficulty:"intermediate",problem:"Entry price is INR 20,000 (Nifty 50). Daily volatility is 1.3%. Upper barrier at 2x vol, lower barrier at 2x vol, max holding 10 days. Over the next 5 days, Nifty moves: 20100, 20250, 20400, 20550, 20600. What is the label?",solution:[{step:"Compute barrier levels",formula:"Upper = 20000 \\times (1 + 2 \\times 0.013) = 20000 \\times 1.026 = 20520",explanation:"Upper barrier at 20,520."},{step:"Lower barrier",formula:"Lower = 20000 \\times (1 - 2 \\times 0.013) = 20000 \\times 0.974 = 19480",explanation:"Lower barrier at 19,480."},{step:"Check barriers sequentially",formula:"Day 1: 20100 < 20520,\\; Day 2: 20250 < 20520,\\; Day 3: 20400 < 20520",explanation:"Neither barrier touched in days 1-3."},{step:"Day 4 touches upper barrier",formula:"20550 \\geq 20520 \\Rightarrow \\text{Label} = +1,\\; \\text{Exit type} = \\text{Upper}",explanation:"Upper barrier hit on day 4 with return of 2.75%. Label is +1 (profitable long)."}]}),e.jsx(_,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Proper labeling is essential for financial ML success. The triple-barrier method produces cleaner labels than fixed-horizon approaches by adapting to volatility and incorporating realistic exit rules. Meta-labeling adds a second layer that learns when to trade versus when to abstain. For Indian markets, calibrate barriers using NSE intraday volatility, account for SEBI circuit limits, and adjust for F&O expiry-related volatility spikes."})})]})}const ae=Object.freeze(Object.defineProperty({__proto__:null,default:C},Symbol.toStringTag,{value:"Module"}));function A(){const[n,y]=u.useState(5),[c,b]=u.useState(.95),[s,j]=u.useState(10),d=[];for(let l=0;l<s;l++){const r=1/Math.max(1,n-Math.abs(l-s/2)),a=Math.pow(c,s-1-l),x=r*a;d.push({idx:l,uniqueness:r,timeDecay:a,combined:x})}const i=d.reduce((l,r)=>l+r.combined,0),o=d.map(l=>({...l,normalized:l.combined/i})),m=Math.pow(i,2)/d.reduce((l,r)=>l+r.combined**2,0);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Sample Weight Visualization"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust concurrency and decay to see how sample weights change for Nifty 50 trading signals."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Avg Concurrency = ",n]}),e.jsx("input",{type:"range",min:"1",max:"15",step:"1",value:n,onChange:l=>y(parseInt(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Time Decay = ",c.toFixed(2)]}),e.jsx("input",{type:"range",min:"0.8",max:"1",step:"0.01",value:c,onChange:l=>b(parseFloat(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Samples = ",s]}),e.jsx("input",{type:"range",min:"5",max:"20",step:"1",value:s,onChange:l=>j(parseInt(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 420 130",className:"w-full max-w-lg mx-auto block",children:[o.map((l,r)=>{const a=30+r*(360/s),x=l.normalized*s*80;return e.jsxs("g",{children:[e.jsx("rect",{x:a,y:110-x,width:Math.max(300/s-2,8),height:x,fill:"#6366f1",opacity:"0.7",rx:"2"}),e.jsx("text",{x:a+Math.max(150/s-1,4),y:"125",textAnchor:"middle",className:"text-[7px]",fill:"#6b7280",children:r})]},r)}),e.jsx("text",{x:"210",y:"12",textAnchor:"middle",className:"text-[9px] font-bold",fill:"#4338ca",children:"Normalized Sample Weights"})]}),e.jsxs("div",{className:"mt-3 grid grid-cols-2 gap-3 text-center text-xs",children:[e.jsxs("div",{className:"rounded-lg bg-indigo-50 p-2 dark:bg-indigo-900/30",children:[e.jsx("span",{className:"text-gray-500 dark:text-gray-400",children:"Effective N"}),e.jsxs("p",{className:"text-base font-bold text-indigo-600 dark:text-indigo-400",children:[m.toFixed(1)," / ",s]})]}),e.jsxs("div",{className:"rounded-lg bg-amber-50 p-2 dark:bg-amber-900/30",children:[e.jsx("span",{className:"text-gray-500 dark:text-gray-400",children:"Weight Efficiency"}),e.jsxs("p",{className:"text-base font-bold text-amber-600 dark:text-amber-400",children:[(m/s*100).toFixed(0),"%"]})]})]})]})}function q(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Sample Weights and Uniqueness"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"In financial ML, observations are not independent -- labels from overlapping holding periods share information. Proper sample weighting corrects for this dependency, preventing the model from overfitting to redundant samples. This is critical for Indian equity strategies where Nifty futures positions often overlap across multiple trading signals."}),e.jsx(v,{title:"Sample Uniqueness",label:"Definition 12.3",definition:"The uniqueness of sample i at time t is the reciprocal of the number of concurrent labels at that time: u_{i,t} = 1/c_t. The average uniqueness of sample i is the mean of u_{i,t} over the sample's lifespan T_i. Samples with higher uniqueness carry more independent information and should receive higher weight during training.",notation:"\\bar{u}_i = \\frac{1}{|T_i|} \\sum_{t \\in T_i} \\frac{1}{c_t}"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Concurrency and Information Overlap"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["When multiple labels are active simultaneously, they share the same price information. The concurrency at time ",e.jsx(t.InlineMath,{math:"t"})," counts overlapping labels:"]}),e.jsx(t.BlockMath,{math:"c_t = \\sum_{i=1}^{N} \\mathbf{1}[t_i^{start} \\leq t \\leq t_i^{end}]"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The effective number of independent observations is:"}),e.jsx(t.BlockMath,{math:"N_{eff} = \\frac{\\left(\\sum_{i=1}^{N} w_i\\right)^2}{\\sum_{i=1}^{N} w_i^2}"}),e.jsx(w,{title:"Optimal Sample Weight",label:"Theorem 12.3",statement:"The optimal sample weight that maximizes the effective number of independent observations while accounting for both uniqueness and return attribution is: w_i = \\bar{u}_i \\cdot |r_i|, where \\bar{u}_i is the average uniqueness and |r_i| is the absolute return attributed to sample i.",proof:"The uniqueness weight \\bar{u}_i ensures that concurrent labels are not double-counted. The return attribution |r_i| ensures that samples contributing larger price movements receive proportionally higher weight, as they carry more signal relative to noise. The product balances information content with independence."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Time Decay Weights"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"In non-stationary markets like NSE, recent observations are more relevant. Time decay weights give more importance to recent samples:"}),e.jsx(t.BlockMath,{math:"w_t^{decay} = \\lambda^{T-t}, \\quad 0 < \\lambda \\leq 1"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The combined weight multiplies uniqueness with time decay:"}),e.jsx(t.BlockMath,{math:"w_i^{final} = \\bar{u}_i \\cdot \\lambda^{T - t_i} \\cdot |r_i|"}),e.jsx(_,{title:"Sample Weighting for Indian Markets",type:"tip",children:e.jsxs("ul",{className:"space-y-1 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Budget Days:"})," Union Budget, RBI Policy days create high-impact samples that deserve higher weight"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Expiry Effects:"})," Nifty/Bank Nifty monthly expiry creates artificial volatility -- consider down-weighting expiry-day samples"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"FII Flow Regime:"})," Weight samples differently during FII buying vs selling regimes (structural breaks in Nifty dynamics)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Muhurat Trading:"})," Diwali Muhurat session is a single-hour session with different dynamics -- exclude or down-weight"]})]})}),e.jsx(A,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Sequential Bootstrapping"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Standard bootstrapping draws i.i.d. samples, which is invalid for overlapping financial labels. Sequential bootstrapping draws samples that minimize information overlap:"}),e.jsx(t.BlockMath,{math:"P(\\text{draw } i | S_{drawn}) \\propto \\bar{u}_i(S_{drawn})"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where the uniqueness is recomputed at each step conditioned on the already-drawn samples ",e.jsx(t.InlineMath,{math:"S_{drawn}"}),", ensuring each new draw adds maximum independent information."]}),e.jsx(k,{title:"sample_weights.py",runnable:!0,code:`import numpy as np

class SampleWeightEngine:
    """Sample weight computation for financial ML."""

    def __init__(self, n_observations):
        self.n = n_observations
        self.labels = []

    def add_label(self, start, end, ret):
        self.labels.append({'start': start, 'end': end, 'return': ret})

    def compute_concurrency(self):
        concurrency = np.zeros(self.n)
        for lbl in self.labels:
            for t in range(lbl['start'], min(lbl['end'] + 1, self.n)):
                concurrency[t] += 1
        return concurrency

    def compute_uniqueness(self):
        concurrency = self.compute_concurrency()
        uniqueness = []
        for lbl in self.labels:
            times = range(lbl['start'], min(lbl['end'] + 1, self.n))
            u_vals = [1.0 / concurrency[t] for t in times if concurrency[t] > 0]
            uniqueness.append(np.mean(u_vals) if u_vals else 0)
        return np.array(uniqueness)

    def time_decay_weights(self, decay_factor=0.95):
        n_labels = len(self.labels)
        return np.array([decay_factor ** (n_labels - 1 - i) for i in range(n_labels)])

    def combined_weights(self, decay_factor=0.95, use_returns=True):
        uniqueness = self.compute_uniqueness()
        time_decay = self.time_decay_weights(decay_factor)
        weights = uniqueness * time_decay
        if use_returns:
            returns = np.array([abs(lbl['return']) for lbl in self.labels])
            returns = returns / (returns.mean() + 1e-10)  # normalize
            weights *= returns
        total = weights.sum()
        if total > 0:
            weights /= total
        return weights

    def effective_n(self, weights):
        return np.sum(weights) ** 2 / np.sum(weights ** 2)

    def sequential_bootstrap(self, n_draws):
        """Draw samples with probability proportional to uniqueness."""
        drawn = []
        available = list(range(len(self.labels)))
        for _ in range(n_draws):
            if not available:
                break
            # Compute uniqueness given already drawn
            probs = []
            for idx in available:
                lbl = self.labels[idx]
                overlap = 0
                for d_idx in drawn:
                    d_lbl = self.labels[d_idx]
                    overlap += max(0, min(lbl['end'], d_lbl['end']) -
                                  max(lbl['start'], d_lbl['start']))
                probs.append(1.0 / (1 + overlap))
            probs = np.array(probs) / sum(probs)
            choice = np.random.choice(len(available), p=probs)
            drawn.append(available[choice])
        return drawn

# Simulate overlapping labels for Nifty 50 signals
np.random.seed(42)
n_days = 252
engine = SampleWeightEngine(n_days)

# Generate labels with varying holding periods
for i in range(0, n_days - 15, 3):  # Signal every 3 days
    holding = np.random.randint(5, 15)
    ret = np.random.normal(0.002, 0.02)
    engine.add_label(i, min(i + holding, n_days - 1), ret)

n_labels = len(engine.labels)
concurrency = engine.compute_concurrency()
uniqueness = engine.compute_uniqueness()
weights = engine.combined_weights(decay_factor=0.97)
eff_n = engine.effective_n(weights)

print("=" * 55)
print("  Sample Weights - Nifty 50 Trading Signals")
print("=" * 55)
print(f"\\nTotal labels:           {n_labels}")
print(f"Avg concurrency:        {np.mean(concurrency[concurrency > 0]):.1f}")
print(f"Max concurrency:        {np.max(concurrency):.0f}")
print(f"Avg uniqueness:         {np.mean(uniqueness):.3f}")
print(f"Effective N:            {eff_n:.1f} / {n_labels}")
print(f"Weight efficiency:      {eff_n / n_labels * 100:.1f}%")

print(f"\\nWeight Distribution:")
print(f"  Min weight:  {np.min(weights):.4f}")
print(f"  Max weight:  {np.max(weights):.4f}")
print(f"  Std weight:  {np.std(weights):.4f}")
print(f"  Gini coeff:  {np.mean(np.abs(np.subtract.outer(weights, weights))) / (2 * np.mean(weights)):.3f}")

# Sequential bootstrap
drawn = engine.sequential_bootstrap(n_draws=50)
print(f"\\nSequential Bootstrap:")
print(f"  Drew {len(drawn)} samples from {n_labels}")
print(f"  Unique indices: {len(set(drawn))}")`}),e.jsx(N,{title:"Computing Sample Uniqueness",difficulty:"intermediate",problem:"Three Nifty trading labels overlap: Label A spans days 1-5, Label B spans days 3-8, Label C spans days 6-10. Compute the average uniqueness of Label B.",solution:[{step:"Compute concurrency at each time step",formula:"c_3 = 2 \\text{ (A,B)},\\; c_4 = 2 \\text{ (A,B)},\\; c_5 = 2 \\text{ (A,B)},\\; c_6 = 2 \\text{ (B,C)},\\; c_7 = 2 \\text{ (B,C)},\\; c_8 = 2 \\text{ (B,C)}",explanation:"Label B overlaps with A on days 3-5 and with C on days 6-8."},{step:"Compute uniqueness at each time step",formula:"u_{B,t} = 1/c_t = 1/2 \\text{ for all } t \\in \\{3,4,5,6,7,8\\}",explanation:"At every time step, Label B shares information with exactly one other label."},{step:"Compute average uniqueness",formula:"\\bar{u}_B = \\frac{1}{6}(0.5 + 0.5 + 0.5 + 0.5 + 0.5 + 0.5) = 0.5",explanation:"Label B has 50% uniqueness, meaning it shares half its information with other labels. Its weight should be proportionally reduced compared to a non-overlapping label."}]}),e.jsx(_,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Sample weights correct for the non-IID nature of financial data. The three key components are: (1) uniqueness weights that account for label overlap, (2) time decay weights that prioritize recent observations, and (3) return attribution weights that emphasize high-signal observations. For Indian equity strategies, also consider event-based weighting for high-impact days (Budget, RBI policy, election results) and down-weighting market microstructure noise around F&O expiry dates."})})]})}const re=Object.freeze(Object.defineProperty({__proto__:null,default:q},Symbol.toStringTag,{value:"Module"}));function z(){const[n,y]=u.useState(100),[c,b]=u.useState(5),[s,j]=u.useState(.1),[d,i]=u.useState(50),o=1-Math.exp(-c*.3),m=1/Math.sqrt(n),l=c/10*(1-m)*(50/d),r=.5+.08*o*(1-l*.5)*Math.min(s*5,1),a=r+l*.15,x=a-r;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Tree Ensemble Hyperparameter Tuning"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Tune gradient boosting parameters for predicting Nifty 50 next-day returns."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Trees = ",n]}),e.jsx("input",{type:"range",min:"10",max:"500",step:"10",value:n,onChange:g=>y(parseInt(g.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Max Depth = ",c]}),e.jsx("input",{type:"range",min:"1",max:"10",step:"1",value:c,onChange:g=>b(parseInt(g.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Learning Rate = ",s.toFixed(2)]}),e.jsx("input",{type:"range",min:"0.01",max:"0.3",step:"0.01",value:s,onChange:g=>j(parseFloat(g.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Min Samples = ",d]}),e.jsx("input",{type:"range",min:"10",max:"200",step:"10",value:d,onChange:g=>i(parseInt(g.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-4 gap-2 text-center text-xs",children:[e.jsxs("div",{className:"rounded-lg bg-green-50 p-2 dark:bg-green-900/30",children:[e.jsx("span",{className:"text-gray-500",children:"Train Accuracy"}),e.jsxs("p",{className:"text-base font-bold text-green-600",children:[(a*100).toFixed(1),"%"]})]}),e.jsxs("div",{className:"rounded-lg bg-blue-50 p-2 dark:bg-blue-900/30",children:[e.jsx("span",{className:"text-gray-500",children:"Test Accuracy"}),e.jsxs("p",{className:"text-base font-bold text-blue-600",children:[(r*100).toFixed(1),"%"]})]}),e.jsxs("div",{className:"rounded-lg bg-amber-50 p-2 dark:bg-amber-900/30",children:[e.jsx("span",{className:"text-gray-500",children:"Overfit Gap"}),e.jsxs("p",{className:`text-base font-bold ${x>.05?"text-red-500":"text-amber-600"}`,children:[(x*100).toFixed(1),"%"]})]}),e.jsxs("div",{className:"rounded-lg bg-indigo-50 p-2 dark:bg-indigo-900/30",children:[e.jsx("span",{className:"text-gray-500",children:"Overfit Risk"}),e.jsx("p",{className:`text-base font-bold ${l>.5?"text-red-500":"text-indigo-600"}`,children:l>.5?"HIGH":l>.25?"MEDIUM":"LOW"})]})]})]})}function B(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Tree Ensembles for Alpha Generation"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Decision tree ensembles -- Random Forests and Gradient Boosting Machines (GBM) -- are the workhorses of ML-based alpha generation. Their ability to capture nonlinear interactions between features makes them ideal for modeling complex relationships in Indian equity data, where factors like FII flows, sector rotation, and macro indicators interact in non-obvious ways."}),e.jsx(v,{title:"Gradient Boosting Machine (GBM)",label:"Definition 12.4",definition:"A Gradient Boosting Machine builds an ensemble of weak learners (shallow decision trees) sequentially, where each new tree fits the negative gradient (pseudo-residuals) of the loss function from the previous iteration. The final prediction is the sum of all trees' predictions, weighted by the learning rate.",notation:"\\hat{y}_i^{(M)} = \\sum_{m=1}^{M} \\eta \\cdot h_m(x_i)"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Random Forest vs. Gradient Boosting"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Random Forests build trees independently (bagging) while GBM builds them sequentially (boosting):"}),e.jsx(t.BlockMath,{math:"\\text{RF: } \\hat{y} = \\frac{1}{M}\\sum_{m=1}^{M} h_m(x) \\quad \\text{(parallel, variance reduction)}"}),e.jsx(t.BlockMath,{math:"\\text{GBM: } \\hat{y}^{(m)} = \\hat{y}^{(m-1)} + \\eta \\cdot h_m(x) \\quad \\text{(sequential, bias reduction)}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["In GBM, each tree ",e.jsx(t.InlineMath,{math:"h_m"})," is trained to predict the negative gradient of the loss function:"]}),e.jsx(t.BlockMath,{math:"h_m = \\arg\\min_h \\sum_{i=1}^{N} \\left[-\\frac{\\partial L(y_i, \\hat{y}_i^{(m-1)})}{\\partial \\hat{y}_i^{(m-1)}} - h(x_i)\\right]^2"}),e.jsx(w,{title:"Bias-Variance Decomposition of Ensembles",label:"Theorem 12.4",statement:"For a Random Forest with M trees of variance \\sigma^2 and pairwise correlation \\rho, the ensemble variance is: \\text{Var}(\\hat{y}_{RF}) = \\rho\\sigma^2 + \\frac{1-\\rho}{M}\\sigma^2. As M \\to \\infty, the variance converges to \\rho\\sigma^2, not zero. Feature subsampling reduces \\rho.",proof:"Each tree has variance \\sigma^2. The variance of the average of M correlated random variables: \\text{Var}(\\bar{X}) = \\frac{1}{M^2}[M\\sigma^2 + M(M-1)\\rho\\sigma^2] = \\frac{\\sigma^2}{M} + \\frac{M-1}{M}\\rho\\sigma^2 \\xrightarrow{M\\to\\infty} \\rho\\sigma^2."}),e.jsx(_,{title:"Tree Ensembles for Indian Equity Alpha",type:"historical",children:e.jsxs("ul",{className:"space-y-1 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Feature Interactions:"})," Trees naturally capture nonlinear interactions like FII flows x India VIX x sector momentum"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Mixed Feature Types:"})," Handle both continuous (returns, volatility) and categorical (sector, cap-size bucket) features"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Missing Data:"})," XGBoost/LightGBM handle missing values natively -- important for Indian stocks with inconsistent fundamental data"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Zerodha Kite Integration:"})," Model predictions can be served via Zerodha's Kite Connect API for live trading"]})]})}),e.jsx(z,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Purged Cross-Validation"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Standard k-fold CV is invalid for financial data due to information leakage. Purged k-fold CV removes observations from the training set that overlap with the test set's label span:"}),e.jsx(t.BlockMath,{math:"\\text{Train}_k^{purged} = \\text{Train}_k \\setminus \\{i : T_i \\cap [\\min(T_{test}), \\max(T_{test})] \\neq \\emptyset\\}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["Additionally, an embargo period ",e.jsx(t.InlineMath,{math:"\\delta"})," removes observations immediately after the test set to prevent serial correlation leakage."]}),e.jsx(k,{title:"tree_ensemble_alpha.py",runnable:!0,code:`import numpy as np

class SimpleGBM:
    """Simplified GBM for demonstrating alpha generation."""

    def __init__(self, n_trees=100, max_depth=3, learning_rate=0.1,
                 min_samples_leaf=50):
        self.n_trees = n_trees
        self.max_depth = max_depth
        self.lr = learning_rate
        self.min_samples = min_samples_leaf
        self.trees = []

    def _build_stump(self, X, residuals):
        """Build a single decision stump (depth-1 tree)."""
        best_feature, best_threshold, best_value = 0, 0, np.mean(residuals)
        best_mse = np.var(residuals)

        for j in range(X.shape[1]):
            thresholds = np.percentile(X[:, j], [25, 50, 75])
            for thresh in thresholds:
                left = residuals[X[:, j] <= thresh]
                right = residuals[X[:, j] > thresh]
                if len(left) < self.min_samples or len(right) < self.min_samples:
                    continue
                mse = (np.var(left) * len(left) + np.var(right) * len(right)) / len(residuals)
                if mse < best_mse:
                    best_mse = mse
                    best_feature = j
                    best_threshold = thresh
                    best_value = (np.mean(left), np.mean(right))

        return {'feature': best_feature, 'threshold': best_threshold, 'values': best_value}

    def fit(self, X, y):
        self.base_pred = np.mean(y)
        predictions = np.full(len(y), self.base_pred)

        for m in range(self.n_trees):
            residuals = y - predictions
            tree = self._build_stump(X, residuals)
            self.trees.append(tree)

            # Update predictions
            mask = X[:, tree['feature']] <= tree['threshold']
            if isinstance(tree['values'], tuple):
                predictions[mask] += self.lr * tree['values'][0]
                predictions[~mask] += self.lr * tree['values'][1]
            else:
                predictions += self.lr * tree['values']

        return self

    def predict(self, X):
        predictions = np.full(X.shape[0], self.base_pred)
        for tree in self.trees:
            mask = X[:, tree['feature']] <= tree['threshold']
            if isinstance(tree['values'], tuple):
                predictions[mask] += self.lr * tree['values'][0]
                predictions[~mask] += self.lr * tree['values'][1]
        return predictions

# Generate synthetic Nifty 50 alpha features
np.random.seed(42)
n_samples = 1000
n_features = 8

feature_names = ['momentum_20d', 'vol_ratio', 'rsi_14', 'fii_flow',
                 'india_vix', 'sector_rotation', 'earnings_surprise', 'delivery_pct']

X = np.random.randn(n_samples, n_features)
# Nonlinear target with interaction effects
y = (0.3 * X[:, 0] * (X[:, 4] < 0) +   # Momentum works in low-VIX
     0.2 * X[:, 3] * (X[:, 1] > 0) +     # FII flow with volume confirmation
     0.1 * X[:, 6] +                       # Earnings surprise
     np.random.randn(n_samples) * 0.5)     # Noise

# Train/test split (time-series)
split = int(0.7 * n_samples)
X_train, X_test = X[:split], X[split:]
y_train, y_test = y[:split], y[split:]

# Fit GBM
model = SimpleGBM(n_trees=150, max_depth=3, learning_rate=0.05, min_samples_leaf=30)
model.fit(X_train, y_train)

# Evaluate
train_pred = model.predict(X_train)
test_pred = model.predict(X_test)

train_corr = np.corrcoef(y_train, train_pred)[0, 1]
test_corr = np.corrcoef(y_test, test_pred)[0, 1]
train_mse = np.mean((y_train - train_pred) ** 2)
test_mse = np.mean((y_test - test_pred) ** 2)

# Signal-based returns
positions = np.sign(test_pred)
actual_rets = y_test
strategy_rets = positions * actual_rets
sharpe = np.mean(strategy_rets) / np.std(strategy_rets) * np.sqrt(252)

print("=" * 55)
print("  GBM Alpha Model - Nifty 50 Features")
print("=" * 55)
print(f"\\nModel: {model.n_trees} trees, depth={model.max_depth}, lr={model.lr}")
print(f"\\nTrain IC (correlation): {train_corr:.3f}")
print(f"Test IC (correlation):  {test_corr:.3f}")
print(f"Train MSE:              {train_mse:.4f}")
print(f"Test MSE:               {test_mse:.4f}")
print(f"\\nStrategy Metrics (test set):")
print(f"  Hit rate:   {np.mean(strategy_rets > 0)*100:.1f}%")
print(f"  Avg return: {np.mean(strategy_rets)*100:.3f}%")
print(f"  Sharpe:     {sharpe:.2f}")
print(f"\\nTop Features Used (by tree split count):")
feature_counts = np.zeros(n_features)
for tree in model.trees:
    feature_counts[tree['feature']] += 1
for idx in np.argsort(-feature_counts)[:5]:
    print(f"  {feature_names[idx]:<20} {feature_counts[idx]:.0f} splits")`}),e.jsx(N,{title:"GBM Hyperparameter Selection for Nifty Alpha",difficulty:"intermediate",problem:"You're building a GBM to predict Nifty 50 next-day returns. Training accuracy is 58% but test accuracy is 51%. What hyperparameter adjustments would you make?",solution:[{step:"Diagnose overfitting",formula:"\\text{Gap} = 58\\% - 51\\% = 7\\% \\Rightarrow \\text{Overfitting}",explanation:"The 7% train-test gap indicates the model has memorized training patterns that do not generalize."},{step:"Reduce model complexity",formula:"\\text{max\\_depth}: 5 \\to 3, \\quad \\text{min\\_samples\\_leaf}: 20 \\to 100",explanation:"Shallower trees and larger leaf sizes reduce overfitting to noise."},{step:"Reduce learning rate and increase trees",formula:"\\eta: 0.1 \\to 0.03, \\quad M: 100 \\to 300",explanation:"Lower learning rate with more trees produces smoother gradient descent in function space."},{step:"Add regularization",formula:"\\text{subsample}: 1.0 \\to 0.7, \\quad \\text{colsample}: 1.0 \\to 0.8",explanation:"Row and column subsampling reduce correlation between trees, improving generalization. Target test accuracy of 53-55% for Nifty prediction, which is sufficient for profitable trading."}]}),e.jsx(_,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Tree ensembles excel at capturing nonlinear feature interactions in Indian equity data. For alpha generation, gradient boosting (XGBoost, LightGBM) typically outperforms Random Forests due to its sequential bias reduction. Critical implementation details include: purged cross-validation to prevent information leakage, sample weights for overlapping labels, and careful hyperparameter tuning to balance bias-variance for the low signal-to-noise ratio inherent in financial data. Even modest prediction accuracy (53-55%) translates to meaningful alpha when properly implemented with Nifty/Bank Nifty trading strategies."})})]})}const se=Object.freeze(Object.defineProperty({__proto__:null,default:B},Symbol.toStringTag,{value:"Module"}));function P(){const[n,y]=u.useState(1),[c,b]=u.useState(.5),[s,j]=u.useState("rbf"),d=2/(n+.1),i=s==="linear"?1:s==="rbf"?c*3:2,o=Math.round(20/n+5*i),m=Math.min(.99,.5+.4*i*Math.min(n,3)/3),l=Math.max(.48,m-.15*i*n/5),r=[{x:80,y:40,cls:1},{x:120,y:60,cls:1},{x:90,y:80,cls:1},{x:140,y:30,cls:1},{x:110,y:50,cls:1},{x:70,y:65,cls:1},{x:250,y:100,cls:-1},{x:280,y:80,cls:-1},{x:260,y:120,cls:-1},{x:300,y:90,cls:-1},{x:270,y:60,cls:-1},{x:240,y:85,cls:-1}];return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: SVM Decision Boundary"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust SVM hyperparameters for classifying Nifty 50 up/down days."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["C (Regularization) = ",n.toFixed(1)]}),e.jsx("input",{type:"range",min:"0.01",max:"10",step:"0.1",value:n,onChange:a=>y(parseFloat(a.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Gamma = ",c.toFixed(2)]}),e.jsx("input",{type:"range",min:"0.01",max:"5",step:"0.05",value:c,onChange:a=>b(parseFloat(a.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Kernel: ",s.toUpperCase()]}),e.jsxs("select",{value:s,onChange:a=>j(a.target.value),className:"rounded border border-gray-300 px-2 py-1 text-xs dark:border-gray-600 dark:bg-gray-800",children:[e.jsx("option",{value:"linear",children:"Linear"}),e.jsx("option",{value:"rbf",children:"RBF (Gaussian)"}),e.jsx("option",{value:"poly",children:"Polynomial"})]})]})]}),e.jsxs("svg",{viewBox:"0 0 380 160",className:"w-full max-w-md mx-auto block",children:[e.jsx("rect",{x:"0",y:"0",width:"190",height:"160",fill:"#dbeafe",opacity:"0.3"}),e.jsx("rect",{x:"190",y:"0",width:"190",height:"160",fill:"#fecaca",opacity:"0.3"}),e.jsx("line",{x1:"190",y1:"0",x2:"190",y2:"160",stroke:"#6366f1",strokeWidth:"2"}),e.jsx("line",{x1:190-d*30,y1:"0",x2:190-d*30,y2:"160",stroke:"#6366f1",strokeWidth:"1",strokeDasharray:"4",opacity:"0.5"}),e.jsx("line",{x1:190+d*30,y1:"0",x2:190+d*30,y2:"160",stroke:"#6366f1",strokeWidth:"1",strokeDasharray:"4",opacity:"0.5"}),e.jsxs("text",{x:"190",y:"155",textAnchor:"middle",className:"text-[8px]",fill:"#6366f1",children:["margin=",d.toFixed(1)]}),r.map((a,x)=>e.jsx("circle",{cx:a.x,cy:a.y,r:"6",fill:a.cls===1?"#3b82f6":"#ef4444",stroke:"white",strokeWidth:"1"},x))]}),e.jsxs("div",{className:"mt-3 grid grid-cols-4 gap-2 text-center text-xs",children:[e.jsxs("div",{className:"rounded bg-gray-100 p-2 dark:bg-gray-800",children:[e.jsx("span",{className:"text-gray-500",children:"Support Vectors"}),e.jsx("p",{className:"font-bold text-indigo-600",children:o})]}),e.jsxs("div",{className:"rounded bg-gray-100 p-2 dark:bg-gray-800",children:[e.jsx("span",{className:"text-gray-500",children:"Train Acc"}),e.jsxs("p",{className:"font-bold text-green-600",children:[(m*100).toFixed(1),"%"]})]}),e.jsxs("div",{className:"rounded bg-gray-100 p-2 dark:bg-gray-800",children:[e.jsx("span",{className:"text-gray-500",children:"Test Acc"}),e.jsxs("p",{className:"font-bold text-blue-600",children:[(l*100).toFixed(1),"%"]})]}),e.jsxs("div",{className:"rounded bg-gray-100 p-2 dark:bg-gray-800",children:[e.jsx("span",{className:"text-gray-500",children:"Margin"}),e.jsx("p",{className:"font-bold text-amber-600",children:d.toFixed(2)})]})]})]})}function D(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Support Vector Machines and Kernel Methods"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Support Vector Machines find the maximum-margin hyperplane that separates classes in feature space. Kernel methods extend SVMs to capture nonlinear patterns by implicitly mapping features into high-dimensional spaces. For Indian equity classification tasks (predicting Nifty direction, sector rotation signals), SVMs offer strong regularization and theoretical guarantees."}),e.jsx(v,{title:"Support Vector Machine",label:"Definition 12.5",definition:"An SVM finds the hyperplane w^T x + b = 0 that maximizes the margin 2/||w|| between two classes. Support vectors are the training points closest to the decision boundary. The soft-margin SVM allows misclassifications controlled by the regularization parameter C.",notation:"\\min_{w,b} \\frac{1}{2}||w||^2 + C\\sum_{i=1}^{N} \\xi_i \\quad \\text{s.t.} \\quad y_i(w^T x_i + b) \\geq 1 - \\xi_i"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"The Kernel Trick"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The kernel function computes inner products in a high-dimensional feature space without explicit transformation:"}),e.jsx(t.BlockMath,{math:"K(x_i, x_j) = \\phi(x_i)^T \\phi(x_j)"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Common kernels for financial applications:"}),e.jsx(t.BlockMath,{math:"\\text{Linear: } K(x, x') = x^T x'"}),e.jsx(t.BlockMath,{math:"\\text{RBF: } K(x, x') = \\exp\\left(-\\gamma ||x - x'||^2\\right)"}),e.jsx(t.BlockMath,{math:"\\text{Polynomial: } K(x, x') = (x^T x' + r)^d"}),e.jsx(w,{title:"Mercer's Theorem",label:"Theorem 12.5",statement:"A function K(x, x') is a valid kernel if and only if the Gram matrix K_{ij} = K(x_i, x_j) is positive semi-definite for any finite set of points. This ensures that K corresponds to an inner product in some (possibly infinite-dimensional) feature space.",proof:"If K is a valid kernel, then K_{ij} = \\phi(x_i)^T\\phi(x_j). The Gram matrix G = \\Phi\\Phi^T where \\Phi is the feature matrix. For any vector v: v^TGv = v^T\\Phi\\Phi^Tv = ||\\Phi^Tv||^2 \\geq 0. Hence G is PSD."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"The Dual Formulation"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The SVM dual problem enables the kernel trick:"}),e.jsx(t.BlockMath,{math:"\\max_\\alpha \\sum_{i=1}^{N} \\alpha_i - \\frac{1}{2}\\sum_{i,j} \\alpha_i \\alpha_j y_i y_j K(x_i, x_j)"}),e.jsx(t.BlockMath,{math:"\\text{s.t.} \\quad 0 \\leq \\alpha_i \\leq C, \\quad \\sum_{i=1}^{N} \\alpha_i y_i = 0"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["Points with ",e.jsx(t.InlineMath,{math:"\\alpha_i > 0"})," are support vectors. The decision function becomes:"]}),e.jsx(t.BlockMath,{math:"f(x) = \\text{sign}\\left(\\sum_{i \\in SV} \\alpha_i y_i K(x_i, x) + b\\right)"}),e.jsx(_,{title:"SVMs for Indian Equity Trading",type:"tip",children:e.jsxs("ul",{className:"space-y-1 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Regime Classification:"})," SVM to classify Nifty into bull/bear/sideways regimes using macro features"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Sector Rotation:"})," Multi-class SVM for predicting best-performing Nifty sector using inter-sector features"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Scalability:"})," SVMs are O(N^2) to O(N^3) in training -- consider linear SVMs (liblinear) for large NSE universes"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Feature Scaling:"})," SVMs require normalized features -- critical when mixing price data (INR thousands) with ratios (0-1 range)"]})]})}),e.jsx(P,{}),e.jsx(k,{title:"svm_alpha.py",runnable:!0,code:`import numpy as np

class SimpleSVM:
    """Simplified SVM for financial classification."""

    def __init__(self, C=1.0, kernel='rbf', gamma=0.5, max_iter=100):
        self.C = C
        self.kernel_type = kernel
        self.gamma = gamma
        self.max_iter = max_iter

    def _kernel(self, X1, X2):
        if self.kernel_type == 'linear':
            return X1 @ X2.T
        elif self.kernel_type == 'rbf':
            sq_dist = (np.sum(X1**2, axis=1, keepdims=True) +
                      np.sum(X2**2, axis=1) - 2 * X1 @ X2.T)
            return np.exp(-self.gamma * sq_dist)
        elif self.kernel_type == 'poly':
            return (X1 @ X2.T + 1) ** 2
        return X1 @ X2.T

    def fit(self, X, y):
        self.X_train = X
        self.y_train = y
        n = len(y)
        K = self._kernel(X, X)

        # Simplified SMO-like optimization
        self.alphas = np.zeros(n)
        self.b = 0

        for iteration in range(self.max_iter):
            for i in range(n):
                Ei = np.sum(self.alphas * y * K[i]) + self.b - y[i]
                if (y[i] * Ei < -0.01 and self.alphas[i] < self.C) or                    (y[i] * Ei > 0.01 and self.alphas[i] > 0):
                    j = np.random.randint(n)
                    if j == i:
                        continue
                    Ej = np.sum(self.alphas * y * K[j]) + self.b - y[j]
                    eta = 2 * K[i, j] - K[i, i] - K[j, j]
                    if eta >= 0:
                        continue
                    alpha_j_new = self.alphas[j] - y[j] * (Ei - Ej) / eta
                    alpha_j_new = np.clip(alpha_j_new, 0, self.C)
                    self.alphas[j] = alpha_j_new

        self.support_idx = np.where(self.alphas > 1e-5)[0]
        return self

    def predict(self, X):
        K = self._kernel(X, self.X_train)
        scores = K @ (self.alphas * self.y_train) + self.b
        return np.sign(scores)

# Generate Nifty 50 up/down classification data
np.random.seed(42)
n = 500
features = np.random.randn(n, 6)  # 6 features
feature_names = ['momentum', 'volatility', 'fii_flow', 'rsi', 'vix', 'volume']

# Nonlinear classification boundary
y = np.sign(0.5 * features[:, 0] * features[:, 2] -  # momentum x FII
            0.3 * features[:, 1] +                      # volatility
            0.4 * (features[:, 4] < -0.5).astype(float) + # low VIX regime
            np.random.randn(n) * 0.3)
y[y == 0] = 1

# Time-series split
split = int(0.7 * n)
X_train, X_test = features[:split], features[split:]
y_train, y_test = y[:split], y[split:]

# Normalize features
mu, sigma = X_train.mean(axis=0), X_train.std(axis=0)
X_train_n = (X_train - mu) / sigma
X_test_n = (X_test - mu) / sigma

results = {}
for kernel in ['linear', 'rbf', 'poly']:
    svm = SimpleSVM(C=1.0, kernel=kernel, gamma=0.5, max_iter=50)
    svm.fit(X_train_n, y_train)

    train_pred = svm.predict(X_train_n)
    test_pred = svm.predict(X_test_n)

    train_acc = np.mean(train_pred == y_train)
    test_acc = np.mean(test_pred == y_test)
    n_sv = len(svm.support_idx)

    results[kernel] = {'train': train_acc, 'test': test_acc, 'sv': n_sv}

print("=" * 55)
print("  SVM Classification - Nifty 50 Direction")
print("=" * 55)
print(f"\\nSamples: {n} (train={split}, test={n-split})")
print(f"Features: {', '.join(feature_names)}")
print(f"\\n{'Kernel':<10} {'Train Acc':>10} {'Test Acc':>10} {'SVs':>6}")
print("-" * 40)
for kernel, r in results.items():
    print(f"{kernel:<10} {r['train']*100:>9.1f}% {r['test']*100:>9.1f}% {r['sv']:>6}")

best = max(results.items(), key=lambda x: x[1]['test'])
print(f"\\nBest kernel: {best[0]} (test acc = {best[1]['test']*100:.1f}%)")
print(f"\\nNote: RBF kernel captures nonlinear momentum x FII")
print(f"interaction, which linear SVM cannot model.")`}),e.jsx(N,{title:"Choosing SVM Kernel for Nifty Regime Classification",difficulty:"intermediate",problem:"You have 5 features (momentum, vol, FII flow, RSI, VIX) and want to classify Nifty regimes. Linear SVM gives 52% accuracy, RBF gives 55% with gamma=0.5. What does this tell you about the data?",solution:[{step:"Interpret the accuracy gap",formula:"Acc_{RBF} - Acc_{linear} = 55\\% - 52\\% = 3\\%",explanation:"The RBF kernel outperforms, indicating nonlinear feature interactions exist."},{step:"Identify likely interactions",formula:"K_{RBF}(x, x') = \\exp(-0.5||x - x'||^2)",explanation:"RBF captures interactions like momentum working only in low-VIX regimes, or FII flows predicting returns only with volume confirmation."},{step:"Practical considerations",formula:"\\text{Gamma tuning: } \\gamma \\in \\{0.1, 0.5, 1.0, 2.0\\}",explanation:"Higher gamma = more complex boundary (risk overfitting). Use purged CV to select optimal gamma. For Indian equity data with 252 trading days/year, overfitting is a major concern."}]}),e.jsx(_,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"SVMs with kernel methods are effective for classification tasks in Indian equity trading -- regime detection, direction prediction, and sector rotation. The kernel trick enables capturing nonlinear feature interactions without explicit feature engineering. However, SVMs do not scale well to very large datasets and require careful feature normalization. For NSE-wide stock selection, consider linear SVMs or kernel approximations. For concentrated strategies (Nifty 50, Bank Nifty), RBF kernels can capture valuable nonlinear patterns."})})]})}const ne=Object.freeze(Object.defineProperty({__proto__:null,default:D},Symbol.toStringTag,{value:"Module"}));function E(){const[n,y]=u.useState(5),[c,b]=u.useState(10),[s,j]=u.useState(20),d=756,i=Math.floor(d/n),o=d-i-c-s,m=o/d*100,l=o*(1-s/o*.3),r=Array.from({length:n},(a,x)=>{const g=x*i,f=g+i;return{fold:x+1,testStart:g,testEnd:f,trainSize:Math.max(0,o)}});return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Purged K-Fold Cross-Validation"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Configure CV parameters for validating an ML model on 3 years of Nifty 50 data."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["K Folds = ",n]}),e.jsx("input",{type:"range",min:"3",max:"10",step:"1",value:n,onChange:a=>y(parseInt(a.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Embargo Gap = ",c," days"]}),e.jsx("input",{type:"range",min:"0",max:"30",step:"1",value:c,onChange:a=>b(parseInt(a.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Purge Window = ",s," days"]}),e.jsx("input",{type:"range",min:"0",max:"60",step:"5",value:s,onChange:a=>j(parseInt(a.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 400 100",className:"w-full max-w-lg mx-auto block",children:[r.slice(0,Math.min(n,6)).map((a,x)=>{const g=10+x*15,f=380/d;return e.jsxs("g",{children:[e.jsx("rect",{x:"10",y:g,width:380,height:"10",fill:"#e5e7eb",rx:"2"}),e.jsx("rect",{x:10+a.testStart*f,y:g,width:i*f,height:"10",fill:"#ef4444",rx:"2",opacity:"0.6"}),c>0&&e.jsx("rect",{x:10+a.testEnd*f,y:g,width:c*f,height:"10",fill:"#fbbf24",rx:"2",opacity:"0.5"}),e.jsxs("text",{x:"395",y:g+8,className:"text-[7px]",fill:"#6b7280",children:["F",a.fold]})]},x)}),e.jsx("text",{x:"10",y:"98",className:"text-[8px]",fill:"#6b7280",children:"Train (gray) | Test (red) | Embargo (yellow)"})]}),e.jsxs("div",{className:"mt-3 grid grid-cols-3 gap-2 text-center text-xs",children:[e.jsxs("div",{className:"rounded bg-gray-100 p-2 dark:bg-gray-800",children:[e.jsx("span",{className:"text-gray-500",children:"Train Size"}),e.jsxs("p",{className:"font-bold text-indigo-600",children:[o," days (",m.toFixed(0),"%)"]})]}),e.jsxs("div",{className:"rounded bg-gray-100 p-2 dark:bg-gray-800",children:[e.jsx("span",{className:"text-gray-500",children:"Test Size"}),e.jsxs("p",{className:"font-bold text-red-500",children:[i," days"]})]}),e.jsxs("div",{className:"rounded bg-gray-100 p-2 dark:bg-gray-800",children:[e.jsx("span",{className:"text-gray-500",children:"Effective N"}),e.jsx("p",{className:"font-bold text-green-600",children:l.toFixed(0)})]})]})]})}function X(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Model Selection and Validation"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Model selection in financial ML requires specialized techniques that respect the temporal structure and overlapping nature of financial data. Standard cross-validation produces inflated performance estimates due to information leakage. This section covers purged cross-validation, combinatorial purged CV, and the deflated Sharpe ratio for selecting ML models in Indian equity trading strategies."}),e.jsx(v,{title:"Purged K-Fold Cross-Validation",label:"Definition 12.6",definition:"Purged k-fold CV modifies standard k-fold by (1) removing (purging) training observations whose labels overlap with test observations in time, and (2) adding an embargo period after each test fold to prevent serial correlation leakage. This ensures the test set is truly out-of-sample with respect to information content.",notation:"\\text{Train}_k^{purged} = \\text{Train}_k \\setminus \\{i : T_i \\cap T_{test} \\neq \\emptyset\\} \\setminus \\{i : t_i \\in [t_{test}^{end}, t_{test}^{end} + \\delta]\\}"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Information Leakage in Financial CV"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Standard k-fold CV leaks information through two channels:"}),e.jsx(t.BlockMath,{math:"\\text{Leakage}_1: \\exists\\; i \\in \\text{Train},\\; j \\in \\text{Test} : T_i \\cap T_j \\neq \\emptyset"}),e.jsx(t.BlockMath,{math:"\\text{Leakage}_2: \\exists\\; i \\in \\text{Train} : t_i^{start} \\in [t_{test}^{end}, t_{test}^{end} + \\delta]"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The first is addressed by purging, the second by the embargo gap. Without these corrections, test accuracy is systematically overestimated."}),e.jsx(w,{title:"Deflated Sharpe Ratio",label:"Theorem 12.6",statement:"When selecting the best strategy from N backtests, the probability that the best Sharpe ratio exceeds some threshold due to chance increases with N. The deflated Sharpe ratio adjusts for this multiple testing bias: DSR = P\\left[\\hat{SR} > SR^* | \\hat{SR}_0 = 0, N \\text{ trials}\\right] where SR^* = \\sqrt{V[\\hat{SR}]} \\cdot [(1-\\gamma)Z^{-1}(1-\\frac{1}{N}) + \\gamma Z^{-1}(1-\\frac{1}{N}e^{-1})].",proof:"Under the null hypothesis that all strategies have zero expected Sharpe, the maximum observed Sharpe from N trials follows a Gumbel distribution. The DSR applies the Bonferroni-like correction: the probability that at least one of N trials exceeds threshold t is approximately 1 - (1 - P[SR > t])^N. The deflated SR computes the p-value after this correction."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Combinatorial Purged CV (CPCV)"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"CPCV generates all possible train/test combinations from N groups, creating multiple backtest paths:"}),e.jsx(t.BlockMath,{math:"\\text{CPCV}(N, k) = \\binom{N}{k} \\text{ combinations, each using } k \\text{ groups as test}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Each combination produces a distinct backtest. The distribution of backtested Sharpe ratios across all combinations provides a robust estimate of out-of-sample performance distribution."}),e.jsx(_,{title:"Model Selection Pitfalls in Indian Markets",type:"historical",children:e.jsxs("ul",{className:"space-y-1 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Survivorship Bias:"})," Using only current Nifty constituents ignores delisted/removed stocks, inflating backtested returns"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Regime Change:"})," India's market microstructure changed significantly: T+2 to T+1 settlement (2023), algorithm co-location (2014), COVID circuit breakers"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Data Snooping:"})," Testing many factor combinations on the same Nifty history leads to false discoveries. Apply Bonferroni/BH correction"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Look-ahead in Fundamentals:"})," Ind-AS financial data has reporting lag -- use announcement dates, not period-end dates"]})]})}),e.jsx(E,{}),e.jsx(k,{title:"model_selection.py",runnable:!0,code:`import numpy as np

class PurgedKFoldCV:
    """Purged K-Fold CV for financial ML."""

    def __init__(self, n_splits=5, purge_window=20, embargo=10):
        self.n_splits = n_splits
        self.purge_window = purge_window
        self.embargo = embargo

    def split(self, n_samples):
        fold_size = n_samples // self.n_splits
        splits = []

        for k in range(self.n_splits):
            test_start = k * fold_size
            test_end = min(test_start + fold_size, n_samples)

            # Build train set with purge and embargo
            train_mask = np.ones(n_samples, dtype=bool)
            # Remove test set
            train_mask[test_start:test_end] = False
            # Purge: remove window before test
            purge_start = max(0, test_start - self.purge_window)
            train_mask[purge_start:test_start] = False
            # Embargo: remove window after test
            embargo_end = min(n_samples, test_end + self.embargo)
            train_mask[test_end:embargo_end] = False

            train_idx = np.where(train_mask)[0]
            test_idx = np.arange(test_start, test_end)

            splits.append((train_idx, test_idx))

        return splits

def deflated_sharpe_ratio(observed_sr, n_trials, n_obs, skew=0, kurt=3):
    """Compute deflated Sharpe ratio for multiple testing."""
    sr_std = np.sqrt((1 + 0.5 * observed_sr**2 -
                      skew * observed_sr +
                      (kurt - 3) / 4 * observed_sr**2) / (n_obs - 1))

    # Expected max SR under null
    euler_mascheroni = 0.5772
    max_z = ((1 - euler_mascheroni) * _norm_ppf(1 - 1/n_trials) +
             euler_mascheroni * _norm_ppf(1 - 1/(n_trials * np.e)))
    sr_threshold = max_z * sr_std

    # P-value
    z_stat = (observed_sr - sr_threshold) / sr_std
    p_value = _norm_cdf(z_stat)

    return {'deflated_sr': observed_sr - sr_threshold,
            'p_value': p_value,
            'sr_threshold': sr_threshold,
            'significant': p_value > 0.95}

def _norm_ppf(p):
    """Approximate inverse normal CDF."""
    if p <= 0: return -5
    if p >= 1: return 5
    t = np.sqrt(-2 * np.log(min(p, 1-p)))
    c = [2.515517, 0.802853, 0.010328]
    d = [1.432788, 0.189269, 0.001308]
    x = t - (c[0] + c[1]*t + c[2]*t**2) / (1 + d[0]*t + d[1]*t**2 + d[2]*t**3)
    return x if p > 0.5 else -x

def _norm_cdf(x):
    """Approximate normal CDF."""
    return 0.5 * (1 + np.tanh(np.sqrt(2/np.pi) * (x + 0.044715 * x**3)))

# Demo: Purged K-Fold for Nifty 50 model
n_samples = 756  # 3 years
cv = PurgedKFoldCV(n_splits=5, purge_window=20, embargo=10)
splits = cv.split(n_samples)

print("=" * 60)
print("  Purged K-Fold CV - Nifty 50 Alpha Model")
print("=" * 60)
print(f"\\nTotal samples: {n_samples} (3 years daily)")
print(f"Purge window: {cv.purge_window} days")
print(f"Embargo: {cv.embargo} days")
print(f"\\n{'Fold':<6} {'Train':>6} {'Test':>6} {'Purged':>8} {'Total Lost':>11}")
print("-" * 40)
for k, (train_idx, test_idx) in enumerate(splits):
    lost = n_samples - len(train_idx) - len(test_idx)
    print(f"  {k+1:<4} {len(train_idx):>6} {len(test_idx):>6} "
          f"{lost:>8} {lost:>11}")

# Deflated Sharpe test
print(f"\\n{'='*60}")
print(f"  Deflated Sharpe Ratio Test")
print(f"{'='*60}")
np.random.seed(42)
n_strategies = 50
observed_srs = np.random.normal(0, 1, n_strategies)
best_sr = np.max(observed_srs)

result = deflated_sharpe_ratio(best_sr, n_strategies, 756)
print(f"\\nStrategies tested:  {n_strategies}")
print(f"Best observed SR:   {best_sr:.3f}")
print(f"SR threshold:       {result['sr_threshold']:.3f}")
print(f"Deflated SR:        {result['deflated_sr']:.3f}")
print(f"P-value:            {result['p_value']:.3f}")
print(f"Significant:        {result['significant']}")`}),e.jsx(N,{title:"Detecting Overfitting with CPCV",difficulty:"intermediate",problem:"You test a Nifty alpha model using 5-fold purged CV. Fold accuracies are: 54.2%, 51.8%, 55.1%, 49.5%, 53.8%. The standard (non-purged) CV gives 57.3% average. Is the purged estimate reliable?",solution:[{step:"Compute purged CV statistics",formula:"\\bar{A}_{purged} = \\frac{54.2 + 51.8 + 55.1 + 49.5 + 53.8}{5} = 52.88\\%",explanation:"Average purged CV accuracy is 52.88%."},{step:"Compare with standard CV",formula:"\\Delta = 57.3\\% - 52.88\\% = 4.42\\%",explanation:"Standard CV overestimates by 4.42 percentage points due to information leakage."},{step:"Assess fold variance",formula:"\\sigma_{folds} = 2.1\\%,\\; \\text{CV of folds} = 2.1/52.88 = 4.0\\%",explanation:"High fold variance (49.5% to 55.1%) suggests the model is sensitive to market regime. Fold 4 (49.5%) likely hit a different regime."},{step:"Conclusion",formula:"\\text{Reliable estimate} \\approx 52.9\\%,\\; \\text{not } 57.3\\%",explanation:"The purged estimate (52.9%) is the trustworthy number. This is still above 50% and potentially profitable for Nifty trading, but expectations should be calibrated to this level, not the inflated 57.3%."}]}),e.jsx(_,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Model selection in financial ML demands rigorous validation that prevents information leakage and corrects for multiple testing. Purged k-fold CV with embargo is the minimum standard for any Nifty/BSE alpha model. The deflated Sharpe ratio corrects for the multiple testing bias that arises from trying many strategies on the same data. Always report purged CV results, not standard CV, and apply multiple testing corrections when comparing more than a handful of model configurations."})})]})}const ie=Object.freeze(Object.defineProperty({__proto__:null,default:X},Symbol.toStringTag,{value:"Module"}));function L(){const[n,y]=u.useState("mdi"),s=n==="mdi"?[{name:"momentum_20d",score:.18},{name:"fii_flow",score:.15},{name:"india_vix",score:.14},{name:"vol_ratio",score:.12},{name:"rsi_14",score:.11},{name:"delivery_pct",score:.1},{name:"sector_rotation",score:.09},{name:"pcr",score:.06},{name:"earnings_surp",score:.03},{name:"rollover",score:.02}]:[{name:"fii_flow",score:.22},{name:"india_vix",score:.18},{name:"momentum_20d",score:.12},{name:"delivery_pct",score:.11},{name:"vol_ratio",score:.1},{name:"rsi_14",score:.08},{name:"sector_rotation",score:.07},{name:"pcr",score:.05},{name:"rollover",score:.04},{name:"earnings_surp",score:.03}],j=Math.max(...s.map(d=>d.score));return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: MDI vs MDA Feature Importance"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Compare feature importance methods for a Nifty 50 prediction model."}),e.jsxs("div",{className:"mb-4 flex gap-4",children:[e.jsx("button",{onClick:()=>y("mdi"),className:`px-3 py-1 rounded text-xs font-semibold ${n==="mdi"?"bg-indigo-600 text-white":"bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"}`,children:"MDI (Impurity)"}),e.jsx("button",{onClick:()=>y("mda"),className:`px-3 py-1 rounded text-xs font-semibold ${n==="mda"?"bg-indigo-600 text-white":"bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"}`,children:"MDA (Permutation)"})]}),e.jsxs("svg",{viewBox:"0 0 400 220",className:"w-full max-w-lg mx-auto block",children:[s.map((d,i)=>{const o=d.score/j*250;return e.jsxs("g",{children:[e.jsx("text",{x:"100",y:18+i*21,textAnchor:"end",className:"text-[9px]",fill:"#6b7280",children:d.name}),e.jsx("rect",{x:"105",y:8+i*21,width:o,height:"14",rx:"2",fill:i<3?"#6366f1":i<6?"#818cf8":"#c7d2fe"}),e.jsxs("text",{x:110+o,y:19+i*21,className:"text-[8px] font-bold",fill:"#4338ca",children:[(d.score*100).toFixed(1),"%"]})]},d.name)}),e.jsx("text",{x:"200",y:"215",textAnchor:"middle",className:"text-[9px] font-bold",fill:"#6b7280",children:n==="mdi"?"Mean Decrease in Impurity":"Mean Decrease in Accuracy"})]}),e.jsx("p",{className:"mt-2 text-center text-xs text-gray-500 dark:text-gray-400",children:n==="mdi"?"MDI measures how much each feature reduces node impurity across all trees":"MDA measures accuracy drop when each feature is randomly permuted"})]})}function R(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"MDI and MDA Feature Importance"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Understanding which features drive an ML model's predictions is critical for building robust trading strategies. Mean Decrease in Impurity (MDI) and Mean Decrease in Accuracy (MDA) are two complementary approaches to quantifying feature importance in tree-based models applied to Indian equity data."}),e.jsx(v,{title:"Mean Decrease in Impurity (MDI)",label:"Definition 12.7",definition:"MDI measures a feature's importance by the total reduction in node impurity (Gini or entropy for classification, variance for regression) across all splits using that feature, averaged over all trees in the ensemble. Features that produce larger impurity reductions at the top of trees receive higher MDI scores.",notation:"MDI_j = \\frac{1}{M}\\sum_{m=1}^{M}\\sum_{t \\in T_m : v(t)=j} p(t) \\cdot \\Delta I(t)"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"MDI Computation"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["For each tree ",e.jsx(t.InlineMath,{math:"m"})," and each node ",e.jsx(t.InlineMath,{math:"t"})," that splits on feature ",e.jsx(t.InlineMath,{math:"j"}),":"]}),e.jsx(t.BlockMath,{math:"\\Delta I(t) = I(t) - \\frac{n_{left}}{n_t} I(t_{left}) - \\frac{n_{right}}{n_t} I(t_{right})"}),e.jsx(t.BlockMath,{math:"MDI_j = \\frac{1}{M}\\sum_{m=1}^{M}\\sum_{t: v(t)=j} \\frac{n_t}{N} \\cdot \\Delta I(t)"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"n_t"})," is the number of samples reaching node"," ",e.jsx(t.InlineMath,{math:"t"})," and ",e.jsx(t.InlineMath,{math:"v(t)"})," is the feature used at node"," ",e.jsx(t.InlineMath,{math:"t"}),"."]}),e.jsx(w,{title:"MDI Bias Toward High-Cardinality Features",label:"Theorem 12.7",statement:"MDI is biased toward features with many unique values (high cardinality). A feature with c possible split points has a higher chance of being selected by chance alone. The probability of feature j being selected at a random node is proportional to its number of candidate splits, not its true predictive power.",proof:"In a random split selection, feature j with c_j unique values produces c_j - 1 candidate splits. The probability of j being selected is proportional to (c_j - 1) / sum_k(c_k - 1). Continuous features with many unique values (e.g., price returns) are favored over discrete features (e.g., sector dummy variables), even if the latter are more predictive."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Mean Decrease in Accuracy (MDA)"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["MDA (permutation importance) measures the drop in model performance when feature ",e.jsx(t.InlineMath,{math:"j"}),"'s values are randomly shuffled:"]}),e.jsx(t.BlockMath,{math:"MDA_j = \\text{Score}(X) - \\text{Score}(X^{\\pi_j})"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"X^{\\pi_j}"})," is the data matrix with column"," ",e.jsx(t.InlineMath,{math:"j"})," randomly permuted. This breaks the relationship between feature ",e.jsx(t.InlineMath,{math:"j"})," and the target while preserving all other feature distributions."]}),e.jsx(t.BlockMath,{math:"MDA_j = \\frac{1}{M}\\sum_{m=1}^{M}\\left[\\text{OOB}^m_{score} - \\text{OOB}^{m,\\pi_j}_{score}\\right]"}),e.jsx(_,{title:"MDI vs MDA for Indian Equity Features",type:"tip",children:e.jsxs("ul",{className:"space-y-1 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"MDI bias:"})," Continuous features (returns, volatility) are favored over categorical (sector). Use MDA to validate"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"MDA on OOB:"})," Compute MDA on out-of-bag samples to avoid in-sample bias. Purge OOB for financial data"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Substitution effect:"})," If momentum_5d and momentum_10d are correlated, MDI may split importance between them. MDA may underestimate both due to redundancy"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Clustered MDA:"})," Group correlated features (e.g., all momentum features) and permute the group together"]})]})}),e.jsx(L,{}),e.jsx(k,{title:"mdi_mda_importance.py",runnable:!0,code:`import numpy as np

class FeatureImportanceAnalyzer:
    """MDI and MDA feature importance for financial models."""

    def __init__(self, feature_names):
        self.feature_names = feature_names
        self.K = len(feature_names)

    def compute_mdi(self, tree_splits, tree_impurity_gains, n_trees):
        """Compute MDI from tree split information."""
        mdi = np.zeros(self.K)
        counts = np.zeros(self.K)
        for splits, gains in zip(tree_splits, tree_impurity_gains):
            for feat_idx, gain in zip(splits, gains):
                mdi[feat_idx] += gain
                counts[feat_idx] += 1

        if mdi.sum() > 0:
            mdi /= mdi.sum()
        return dict(zip(self.feature_names, mdi))

    def compute_mda(self, model_score_fn, X, y, n_repeats=10):
        """Compute MDA via permutation importance."""
        baseline = model_score_fn(X, y)
        mda = np.zeros(self.K)

        for j in range(self.K):
            drop_scores = []
            for _ in range(n_repeats):
                X_perm = X.copy()
                X_perm[:, j] = np.random.permutation(X_perm[:, j])
                perm_score = model_score_fn(X_perm, y)
                drop_scores.append(baseline - perm_score)
            mda[j] = np.mean(drop_scores)

        if mda.sum() > 0:
            mda_norm = mda / mda.sum()
        else:
            mda_norm = mda
        return dict(zip(self.feature_names, mda_norm)), dict(zip(self.feature_names, mda))

    def clustered_mda(self, model_score_fn, X, y, clusters):
        """MDA with feature clusters permuted together."""
        baseline = model_score_fn(X, y)
        results = {}

        for cluster_name, feat_indices in clusters.items():
            X_perm = X.copy()
            perm = np.random.permutation(len(X))
            for j in feat_indices:
                X_perm[:, j] = X[perm, j]
            drop = baseline - model_score_fn(X_perm, y)
            results[cluster_name] = drop

        return results

# Simulate a Random Forest-like model on Nifty features
np.random.seed(42)
features = ['momentum_20d', 'fii_flow', 'india_vix', 'vol_ratio',
            'rsi_14', 'delivery_pct', 'sector_rot', 'pcr',
            'earnings_surp', 'rollover']
analyzer = FeatureImportanceAnalyzer(features)

# Simulate tree splits
n_trees = 100
tree_splits = []
tree_gains = []
# Features 0,1,2 are most important
for _ in range(n_trees):
    n_splits = np.random.randint(5, 15)
    probs = [0.20, 0.18, 0.15, 0.12, 0.10, 0.08, 0.07, 0.05, 0.03, 0.02]
    splits = np.random.choice(10, size=n_splits, p=probs)
    gains = np.random.exponential(0.1, n_splits)
    tree_splits.append(splits)
    tree_gains.append(gains)

mdi = analyzer.compute_mdi(tree_splits, tree_gains, n_trees)

# Simulate MDA
n_samples = 500
X = np.random.randn(n_samples, 10)
y = (0.4 * X[:, 0] + 0.3 * X[:, 1] - 0.25 * X[:, 2] +
     0.1 * X[:, 3] + np.random.randn(n_samples) * 0.5)
y_class = (y > 0).astype(float)

def accuracy_fn(X_in, y_in):
    pred = (0.4 * X_in[:, 0] + 0.3 * X_in[:, 1] - 0.25 * X_in[:, 2] + 0.1 * X_in[:, 3]) > 0
    return np.mean(pred == y_in)

mda_norm, mda_raw = analyzer.compute_mda(accuracy_fn, X, y_class, n_repeats=20)

# Clustered MDA
clusters = {
    'Momentum': [0, 4],       # momentum + RSI
    'Flow/Sentiment': [1, 7, 9],  # FII + PCR + rollover
    'Volatility': [2, 3],     # VIX + vol_ratio
    'Micro': [5, 6, 8],       # delivery + sector + earnings
}
cluster_mda = analyzer.clustered_mda(accuracy_fn, X, y_class, clusters)

print("=" * 60)
print("  Feature Importance: MDI vs MDA - Nifty 50 Model")
print("=" * 60)
print(f"\\n{'Feature':<18} {'MDI':>8} {'MDA':>8} {'Rank MDI':>9} {'Rank MDA':>9}")
print("-" * 55)
mdi_sorted = sorted(mdi.items(), key=lambda x: -x[1])
mda_sorted = sorted(mda_norm.items(), key=lambda x: -x[1])
mdi_ranks = {name: i+1 for i, (name, _) in enumerate(mdi_sorted)}
mda_ranks = {name: i+1 for i, (name, _) in enumerate(mda_sorted)}

for name in features:
    print(f"{name:<18} {mdi[name]:>7.1%} {mda_norm[name]:>7.1%} "
          f"{mdi_ranks[name]:>9} {mda_ranks[name]:>9}")

print(f"\\nClustered MDA:")
for cluster, score in sorted(cluster_mda.items(), key=lambda x: -x[1]):
    print(f"  {cluster:<20} {score*100:>+.2f}% accuracy drop")`}),e.jsx(N,{title:"Interpreting MDI vs MDA Disagreement",difficulty:"intermediate",problem:"In your Nifty alpha model, momentum_20d has MDI rank 1 but MDA rank 3, while fii_flow has MDI rank 2 but MDA rank 1. What explains this?",solution:[{step:"Analyze MDI bias",formula:"\\text{momentum\\_20d: continuous, many unique values}",explanation:"MDI is biased toward continuous features with many possible split points. Momentum, being continuous, gets more split opportunities, inflating its MDI."},{step:"Analyze MDA ranking",formula:"\\text{MDA}_{fii} > \\text{MDA}_{momentum}",explanation:"MDA measures actual prediction accuracy drop. FII flow being ranked 1 by MDA means permuting it causes the largest accuracy drop -- it carries the most unique predictive information."},{step:"Practical recommendation",formula:"\\text{Trust MDA ranking for feature selection}",explanation:"MDA is more reliable for determining which features to include. However, use clustered MDA if momentum and FII flow are correlated, as standard MDA may underestimate both due to substitution effects."}]}),e.jsx(_,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"MDI and MDA provide complementary views of feature importance. MDI is fast and available during training but biased toward high-cardinality features. MDA is more reliable but computationally expensive and affected by feature correlation. For Indian equity models, always compute both and investigate discrepancies. Use clustered MDA to handle correlated feature groups (multiple momentum windows, correlated sentiment indicators). Feature importance analysis prevents overfitting to noise features and builds confidence that the model captures genuine market dynamics."})})]})}const le=Object.freeze(Object.defineProperty({__proto__:null,default:R},Symbol.toStringTag,{value:"Module"}));function V(){const[n,y]=u.useState(1.5),[c,b]=u.useState(.8),[s,j]=u.useState(-.5),[d,i]=u.useState(.3),o=.12*n,m=.15*c,l=-.1*s,r=.05*d,a=.02,x=a+o+m+l+r,g=[{name:"FII Flow",shap:m,color:m>=0?"#16a34a":"#dc2626"},{name:"Momentum",shap:o,color:o>=0?"#16a34a":"#dc2626"},{name:"VIX",shap:l,color:l>=0?"#16a34a":"#dc2626"},{name:"Volume",shap:r,color:r>=0?"#16a34a":"#dc2626"}].sort((f,p)=>Math.abs(p.shap)-Math.abs(f.shap));return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: SHAP Waterfall for Nifty Prediction"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust feature values to see SHAP attribution for a single Nifty 50 return prediction."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Momentum = ",n.toFixed(1)]}),e.jsx("input",{type:"range",min:"-3",max:"3",step:"0.1",value:n,onChange:f=>y(parseFloat(f.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["FII Flow = ",c.toFixed(1)]}),e.jsx("input",{type:"range",min:"-3",max:"3",step:"0.1",value:c,onChange:f=>b(parseFloat(f.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["VIX = ",s.toFixed(1)]}),e.jsx("input",{type:"range",min:"-3",max:"3",step:"0.1",value:s,onChange:f=>j(parseFloat(f.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Volume = ",d.toFixed(1)]}),e.jsx("input",{type:"range",min:"-3",max:"3",step:"0.1",value:d,onChange:f=>i(parseFloat(f.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 400 150",className:"w-full max-w-lg mx-auto block",children:[e.jsxs("text",{x:"50",y:"15",className:"text-[9px]",fill:"#6b7280",children:["Base: ",(a*100).toFixed(2),"%"]}),e.jsx("line",{x1:"200",y1:"20",x2:"200",y2:"130",stroke:"#d1d5db",strokeWidth:"1",strokeDasharray:"3"}),g.map((f,p)=>{const h=Math.abs(f.shap)*500,M=f.shap>=0?200:200-h;return e.jsxs("g",{children:[e.jsx("text",{x:"55",y:38+p*25,textAnchor:"end",className:"text-[9px]",fill:"#6b7280",children:f.name}),e.jsx("rect",{x:M,y:28+p*25,width:h,height:"16",rx:"2",fill:f.color,opacity:"0.7"}),e.jsxs("text",{x:f.shap>=0?M+h+5:M-5,y:40+p*25,textAnchor:f.shap>=0?"start":"end",className:"text-[8px] font-bold",fill:f.color,children:[f.shap>=0?"+":"",(f.shap*100).toFixed(2),"%"]})]},f.name)}),e.jsxs("text",{x:"200",y:"140",textAnchor:"middle",className:"text-[10px] font-bold",fill:x>=0?"#16a34a":"#dc2626",children:["Prediction: ",x>=0?"+":"",(x*100).toFixed(2),"%"]})]})]})}function K(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"SHAP Values for Financial Models"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"SHAP (SHapley Additive exPlanations) provides theoretically grounded feature attributions based on cooperative game theory. For ML-based trading models on NSE/BSE, SHAP enables understanding why a model predicts a particular stock to outperform, decomposing each prediction into individual feature contributions."}),e.jsx(v,{title:"Shapley Value",label:"Definition 12.8",definition:"The Shapley value of feature j for prediction f(x) is the average marginal contribution of feature j across all possible orderings of features. It uniquely satisfies four axioms: efficiency (contributions sum to the prediction minus base value), symmetry, dummy (zero contribution features get zero value), and additivity.",notation:"\\phi_j(x) = \\sum_{S \\subseteq F \\setminus \\{j\\}} \\frac{|S|!(|F|-|S|-1)!}{|F|!} [f(S \\cup \\{j\\}) - f(S)]"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"The SHAP Formula"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["For a model ",e.jsx(t.InlineMath,{math:"f"})," with ",e.jsx(t.InlineMath,{math:"K"})," features, the SHAP value of feature ",e.jsx(t.InlineMath,{math:"j"})," is:"]}),e.jsx(t.BlockMath,{math:"\\phi_j(x) = \\sum_{S \\subseteq \\{1,...,K\\} \\setminus \\{j\\}} \\frac{|S|! \\cdot (K - |S| - 1)!}{K!} \\left[f_{S \\cup \\{j\\}}(x_{S \\cup \\{j\\}}) - f_S(x_S)\\right]"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The efficiency property ensures that SHAP values exactly decompose the prediction:"}),e.jsx(t.BlockMath,{math:"f(x) = \\phi_0 + \\sum_{j=1}^{K} \\phi_j(x) \\quad \\text{where } \\phi_0 = E[f(X)]"}),e.jsx(w,{title:"SHAP Uniqueness Theorem",label:"Theorem 12.8",statement:"The Shapley value is the unique attribution method satisfying four axioms simultaneously: (1) Efficiency: \\sum_j \\phi_j = f(x) - E[f(X)], (2) Symmetry: features with identical contributions receive equal values, (3) Dummy: a feature that never changes the prediction receives \\phi_j = 0, (4) Additivity: \\phi_j(f+g) = \\phi_j(f) + \\phi_j(g).",proof:"Proven by Shapley (1953). The key insight is that among all possible attribution methods, only one simultaneously satisfies all four axioms. Any method violating any axiom can lead to misleading feature attributions, potentially causing incorrect trading decisions."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"TreeSHAP for Financial Models"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["For tree ensemble models (the most common in financial ML), TreeSHAP computes exact SHAP values in ",e.jsx(t.InlineMath,{math:"O(TLD^2)"})," time instead of the exponential ",e.jsx(t.InlineMath,{math:"O(2^K)"})," of exact Shapley:"]}),e.jsx(t.BlockMath,{math:"\\phi_j^{tree}(x) = \\sum_{m=1}^{M} \\sum_{t \\in T_m} \\Delta_{t,j}(x)"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"\\Delta_{t,j}(x)"})," is the SHAP contribution of feature ",e.jsx(t.InlineMath,{math:"j"})," at node ",e.jsx(t.InlineMath,{math:"t"}),"."]}),e.jsx(_,{title:"SHAP Applications in Indian Trading",type:"tip",children:e.jsxs("ul",{className:"space-y-1 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Trade Attribution:"})," SHAP explains why a model went long on a specific Nifty stock (e.g., strong FII buying + low VIX)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Regime Analysis:"})," Aggregate SHAP values across time to identify which features drive alpha in different market regimes"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Risk Management:"})," If a model's predictions are primarily driven by a single feature, the portfolio is exposed to single-factor risk"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"SEBI Compliance:"})," SHAP provides model explainability required for institutional algo trading audits under SEBI guidelines"]})]})}),e.jsx(V,{}),e.jsx(k,{title:"shap_analysis.py",runnable:!0,code:`import numpy as np

class ApproximateSHAP:
    """Approximate SHAP values for financial model interpretation."""

    def __init__(self, model_fn, background_data):
        self.model_fn = model_fn
        self.background = background_data
        self.base_value = np.mean([model_fn(x) for x in background_data])

    def compute_shap(self, x, n_samples=100):
        """Monte Carlo approximation of SHAP values."""
        K = len(x)
        shap_values = np.zeros(K)

        for _ in range(n_samples):
            # Random permutation of features
            perm = np.random.permutation(K)
            # Random background sample
            bg = self.background[np.random.randint(len(self.background))]

            x_before = bg.copy()
            x_after = bg.copy()

            for j in perm:
                x_after[j] = x[j]
                marginal = self.model_fn(x_after) - self.model_fn(x_before)
                shap_values[j] += marginal
                x_before[j] = x[j]

        shap_values /= n_samples
        return shap_values

    def feature_interaction(self, x, feat_i, feat_j, n_samples=50):
        """SHAP interaction value between two features."""
        K = len(x)
        interaction = 0

        for _ in range(n_samples):
            bg = self.background[np.random.randint(len(self.background))]

            # With both
            x_both = bg.copy()
            x_both[feat_i] = x[feat_i]
            x_both[feat_j] = x[feat_j]

            # With only i
            x_i = bg.copy()
            x_i[feat_i] = x[feat_i]

            # With only j
            x_j = bg.copy()
            x_j[feat_j] = x[feat_j]

            interaction += (self.model_fn(x_both) - self.model_fn(x_i) -
                          self.model_fn(x_j) + self.model_fn(bg))

        return interaction / n_samples

# Simulate Nifty alpha model
def nifty_alpha_model(x):
    """Nonlinear alpha model with interactions."""
    momentum, fii, vix, volume, rsi, delivery = x[:6]
    return (0.15 * momentum * (1 + 0.3 * fii) +  # momentum-FII interaction
            0.10 * fii +
            -0.08 * vix +
            0.05 * volume * delivery +              # volume-delivery interaction
            0.03 * rsi +
            0.02)  # base

np.random.seed(42)
feature_names = ['momentum', 'fii_flow', 'india_vix', 'volume', 'rsi', 'delivery_pct']

# Background data (training distribution)
background = np.random.randn(200, 6)

# Instance to explain
x_instance = np.array([1.5, 0.8, -0.5, 1.2, 0.3, 0.7])

# Compute SHAP
explainer = ApproximateSHAP(nifty_alpha_model, background)
shap_vals = explainer.compute_shap(x_instance, n_samples=500)

print("=" * 55)
print("  SHAP Analysis - Nifty 50 Alpha Prediction")
print("=" * 55)
print(f"\\nPrediction: {nifty_alpha_model(x_instance)*100:.3f}%")
print(f"Base value:  {explainer.base_value*100:.3f}%")
print(f"\\n{'Feature':<16} {'Value':>8} {'SHAP':>8} {'Contrib':>8}")
print("-" * 45)
for name, val, sv in sorted(zip(feature_names, x_instance, shap_vals),
                              key=lambda x: -abs(x[2])):
    print(f"{name:<16} {val:>8.2f} {sv*100:>+7.3f}% {'+' if sv>0 else '-':>1}")

# Verify efficiency
print(f"\\nEfficiency check:")
print(f"  Sum of SHAP:  {sum(shap_vals)*100:.3f}%")
print(f"  Pred - base:  {(nifty_alpha_model(x_instance) - explainer.base_value)*100:.3f}%")

# Feature interactions
print(f"\\nKey Feature Interactions:")
interactions = [
    ('momentum', 'fii_flow', 0, 1),
    ('volume', 'delivery_pct', 3, 5),
    ('momentum', 'india_vix', 0, 2),
]
for name1, name2, i, j in interactions:
    inter = explainer.feature_interaction(x_instance, i, j, n_samples=200)
    print(f"  {name1} x {name2}: {inter*100:>+.3f}%")`}),e.jsx(N,{title:"SHAP Attribution for a Nifty Trade",difficulty:"intermediate",problem:"A GBM model predicts Nifty 50 to return +0.35% tomorrow. The base value (average prediction) is +0.02%. SHAP values are: momentum=+0.18%, FII flow=+0.12%, VIX=+0.05%, volume=-0.02%. Verify efficiency and interpret.",solution:[{step:"Verify efficiency axiom",formula:"\\phi_0 + \\sum_j \\phi_j = 0.02 + 0.18 + 0.12 + 0.05 - 0.02 = 0.35\\%",explanation:"The SHAP values plus base value exactly equal the prediction (0.35%). Efficiency is satisfied."},{step:"Interpret dominant features",formula:"\\phi_{momentum} = +0.18\\% \\text{ (largest positive contributor)}",explanation:"Strong recent momentum is the primary driver of the bullish prediction."},{step:"FII flow confirmation",formula:"\\phi_{FII} = +0.12\\% \\text{ (second largest)}",explanation:"Positive FII flow supports the momentum signal, providing confirmation."},{step:"Risk assessment",formula:"\\phi_{volume} = -0.02\\% \\text{ (negative but small)}",explanation:"Volume is slightly negative, suggesting the momentum may lack volume support. This is a minor warning sign. The prediction is primarily momentum + FII driven, making it sensitive to sudden FII flow reversal."}]}),e.jsx(_,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"SHAP provides the gold standard for model explainability in financial ML. For Indian equity trading, SHAP enables: per-trade attribution (why this prediction), feature interaction discovery (how momentum and FII flows interact), and model monitoring (detecting feature importance drift across market regimes). TreeSHAP makes this computationally feasible for production models. Always verify the efficiency axiom and use SHAP interaction values to discover nonlinear feature combinations that drive alpha."})})]})}const oe=Object.freeze(Object.defineProperty({__proto__:null,default:K},Symbol.toStringTag,{value:"Module"}));function O(){const[n,y]=u.useState(3),c=[3.2,1.8,1.1,.7,.5,.35,.2,.08,.05,.02],b=c.reduce((i,o)=>i+o,0),s=c.reduce((i,o)=>{const m=i.length>0?i[i.length-1]:0;return i.push(m+o/b*100),i},[]),j=s[n-1],d=["Market","Sector Rotation","Momentum","Value-Growth","Size","Liquidity","Volatility","FII Flow","Earnings","Idiosyncratic"];return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: PCA Scree Plot for Nifty 50 Features"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Select number of principal components to retain for dimensionality reduction."}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400 mb-4",children:[e.jsxs("span",{children:["Components to retain = ",n," (",j.toFixed(1),"% variance explained)"]}),e.jsx("input",{type:"range",min:"1",max:"10",step:"1",value:n,onChange:i=>y(parseInt(i.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("svg",{viewBox:"0 0 420 160",className:"w-full max-w-lg mx-auto block",children:[c.map((i,o)=>{const m=30+o*38,l=i/c[0]*90,r=o<n;return e.jsxs("g",{children:[e.jsx("rect",{x:m,y:120-l,width:"25",height:l,rx:"2",fill:r?"#6366f1":"#d1d5db",opacity:r?.8:.4}),e.jsxs("text",{x:m+12,y:"135",textAnchor:"middle",className:"text-[7px]",fill:"#6b7280",children:["PC",o+1]}),e.jsxs("text",{x:m+12,y:115-l,textAnchor:"middle",className:"text-[7px] font-bold",fill:r?"#4338ca":"#9ca3af",children:[(i/b*100).toFixed(0),"%"]})]},o)}),e.jsx("line",{x1:"25",y1:"120",x2:"415",y2:"120",stroke:"#e5e7eb",strokeWidth:"1"}),s.map((i,o)=>{const m=42+o*38,l=120-i*.9;if(o>0){const r=42+(o-1)*38,a=120-s[o-1]*.9;return e.jsxs("g",{children:[e.jsx("line",{x1:r,y1:a,x2:m,y2:l,stroke:"#ef4444",strokeWidth:"1.5"}),e.jsx("circle",{cx:m,cy:l,r:"2",fill:"#ef4444"})]},`cum-${o}`)}return e.jsx("circle",{cx:m,cy:l,r:"2",fill:"#ef4444"},`cum-${o}`)}),e.jsx("text",{x:"415",y:"12",textAnchor:"end",className:"text-[8px]",fill:"#ef4444",children:"Cumulative %"})]}),e.jsxs("div",{className:"mt-2 text-center text-xs text-gray-600 dark:text-gray-400",children:["Top ",n," components: ",c.slice(0,n).map((i,o)=>d[o]).join(", ")]})]})}function W(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"PCA and Feature Clustering"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Financial features are highly correlated -- momentum at different lookbacks, various volatility measures, and related fundamental metrics share substantial information. PCA and clustering methods reduce dimensionality and identify the true independent sources of variation in Indian equity data. This is essential for building parsimonious ML models that generalize well."}),e.jsx(v,{title:"Principal Component Analysis (PCA)",label:"Definition 12.9",definition:"PCA finds orthogonal linear combinations of features (principal components) that maximize explained variance. The k-th principal component is the direction of maximum variance orthogonal to the first k-1 components. PCA eigenvectors of the covariance matrix provide the optimal linear dimensionality reduction.",notation:"Z = X W \\quad \\text{where } W = [w_1, ..., w_K] \\text{ are eigenvectors of } \\Sigma = X^TX/(N-1)"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"PCA for Financial Features"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The eigendecomposition of the feature covariance matrix reveals the principal sources of variation:"}),e.jsx(t.BlockMath,{math:"\\Sigma = W \\Lambda W^T \\quad \\text{where } \\Lambda = \\text{diag}(\\lambda_1, ..., \\lambda_K)"}),e.jsx(t.BlockMath,{math:"\\text{Variance explained by PC}_k = \\frac{\\lambda_k}{\\sum_{j=1}^{K} \\lambda_j}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For Nifty 50 stock returns, the first principal component typically explains 40-50% of variance (the market factor), with sector rotation and size factors captured by subsequent components."}),e.jsx(w,{title:"Optimal Dimensionality Selection",label:"Theorem 12.9",statement:"The optimal number of principal components k^* minimizes the out-of-sample prediction error. By the Marchenko-Pastur law, eigenvalues below the noise threshold \\lambda_+ = \\sigma^2(1 + \\sqrt{N/T})^2 are attributable to random noise and should be discarded.",proof:"For a random matrix X of dimension T x N with i.i.d. entries of variance \\sigma^2, the eigenvalues of X^TX/T follow the Marchenko-Pastur distribution with maximum eigenvalue \\lambda_+ = \\sigma^2(1 + \\sqrt{N/T})^2. Eigenvalues above \\lambda_+ carry genuine signal; those below are noise."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Feature Clustering"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Hierarchical clustering groups correlated features, enabling cluster-level feature selection. The distance between features is derived from their correlation:"}),e.jsx(t.BlockMath,{math:"d(f_i, f_j) = \\sqrt{2(1 - |\\rho_{ij}|)}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The optimal number of clusters can be determined using the silhouette score:"}),e.jsx(t.BlockMath,{math:"s(i) = \\frac{b(i) - a(i)}{\\max(a(i), b(i))}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"a(i)"})," is the mean intra-cluster distance and"," ",e.jsx(t.InlineMath,{math:"b(i)"})," is the mean nearest-cluster distance."]}),e.jsx(_,{title:"PCA Interpretation for Nifty 50",type:"historical",children:e.jsxs("ul",{className:"space-y-1 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"PC1 (40-50%):"})," Market factor -- correlated with Nifty 50 index returns"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"PC2 (10-15%):"})," Sector rotation -- IT vs Banking, Domestic vs Export"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"PC3 (5-8%):"})," Size/momentum -- large vs small cap performance dispersion"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"PC4-5 (3-5%):"})," Value-growth and volatility factors"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Remaining:"})," Idiosyncratic and noise components below M-P threshold"]})]})}),e.jsx(O,{}),e.jsx(k,{title:"pca_clustering.py",runnable:!0,code:`import numpy as np

class FinancialPCA:
    """PCA for financial feature reduction."""

    def __init__(self, n_components=None):
        self.n_components = n_components
        self.components_ = None
        self.explained_variance_ = None

    def fit(self, X):
        # Center data
        self.mean_ = X.mean(axis=0)
        X_centered = X - self.mean_

        # Covariance matrix
        cov = X_centered.T @ X_centered / (len(X) - 1)

        # Eigendecomposition
        eigenvalues, eigenvectors = np.linalg.eigh(cov)
        # Sort descending
        idx = np.argsort(-eigenvalues)
        eigenvalues = eigenvalues[idx]
        eigenvectors = eigenvectors[:, idx]

        total_var = eigenvalues.sum()
        self.explained_variance_ = eigenvalues / total_var
        self.eigenvalues_ = eigenvalues

        if self.n_components is None:
            self.n_components = len(eigenvalues)
        self.components_ = eigenvectors[:, :self.n_components]
        return self

    def transform(self, X):
        return (X - self.mean_) @ self.components_

    def marchenko_pastur_threshold(self, n_samples, n_features, noise_var=1.0):
        """Compute M-P upper bound for noise eigenvalues."""
        q = n_features / n_samples
        return noise_var * (1 + np.sqrt(q)) ** 2

class FeatureClusterer:
    """Correlation-based feature clustering."""

    def __init__(self, feature_names):
        self.feature_names = feature_names

    def correlation_distance(self, X):
        corr = np.corrcoef(X.T)
        return np.sqrt(2 * (1 - np.abs(corr)))

    def agglomerative_cluster(self, X, n_clusters):
        dist = self.correlation_distance(X)
        n = len(self.feature_names)
        labels = list(range(n))

        # Simple single-linkage
        for _ in range(n - n_clusters):
            min_dist = np.inf
            merge_i, merge_j = 0, 1
            for i in range(n):
                for j in range(i + 1, n):
                    if labels[i] != labels[j] and dist[i, j] < min_dist:
                        min_dist = dist[i, j]
                        merge_i, merge_j = labels[i], labels[j]

            for k in range(n):
                if labels[k] == merge_j:
                    labels[k] = merge_i

        # Renumber
        unique = sorted(set(labels))
        label_map = {old: new for new, old in enumerate(unique)}
        return [label_map[l] for l in labels]

# Generate correlated Nifty features
np.random.seed(42)
n_samples = 500
feature_names = ['mom_5d', 'mom_10d', 'mom_20d', 'vol_5d', 'vol_10d',
                 'fii_flow', 'dii_flow', 'rsi', 'macd', 'obv']

# Create correlated feature groups
market = np.random.randn(n_samples)
momentum = np.random.randn(n_samples)
vol_factor = np.random.randn(n_samples)
flow_factor = np.random.randn(n_samples)
noise = np.random.randn(n_samples, 10) * 0.3

X = np.column_stack([
    market + momentum + noise[:, 0],        # mom_5d
    market + 0.9*momentum + noise[:, 1],    # mom_10d
    market + 0.8*momentum + noise[:, 2],    # mom_20d
    vol_factor + noise[:, 3],                # vol_5d
    0.9*vol_factor + noise[:, 4],           # vol_10d
    flow_factor + noise[:, 5],               # fii_flow
    -0.7*flow_factor + noise[:, 6],         # dii_flow (inversely correlated)
    momentum + noise[:, 7],                  # rsi (momentum related)
    0.8*momentum + noise[:, 8],             # macd (momentum related)
    flow_factor * 0.5 + noise[:, 9],        # obv (flow related)
])

# PCA
pca = FinancialPCA(n_components=10)
pca.fit(X)

mp_threshold = pca.marchenko_pastur_threshold(n_samples, 10)

print("=" * 60)
print("  PCA Analysis - Nifty 50 Feature Matrix")
print("=" * 60)
print(f"\\nSamples: {n_samples}, Features: {len(feature_names)}")
print(f"M-P noise threshold: {mp_threshold:.3f}")
print(f"\\n{'PC':<5} {'Eigenvalue':>12} {'Var Explained':>14} {'Cumulative':>11} {'Signal?':>8}")
print("-" * 55)
cum = 0
for i in range(10):
    cum += pca.explained_variance_[i] * 100
    signal = pca.eigenvalues_[i] > mp_threshold
    print(f"PC{i+1:<3} {pca.eigenvalues_[i]:>12.3f} "
          f"{pca.explained_variance_[i]*100:>13.1f}% "
          f"{cum:>10.1f}% "
          f"{'YES' if signal else 'NO':>8}")

# Feature clustering
clusterer = FeatureClusterer(feature_names)
labels = clusterer.agglomerative_cluster(X, n_clusters=4)

print(f"\\nFeature Clusters (k=4):")
for c in range(4):
    members = [feature_names[i] for i in range(10) if labels[i] == c]
    print(f"  Cluster {c}: {', '.join(members)}")`}),e.jsx(N,{title:"Determining PCA Components for Nifty Feature Set",difficulty:"intermediate",problem:"You have 10 features for a Nifty alpha model with 500 daily observations. PCA eigenvalues are [3.2, 1.8, 1.1, 0.7, 0.5, 0.35, 0.2, 0.08, 0.05, 0.02]. The M-P threshold is 0.42. How many components should you retain?",solution:[{step:"Identify signal components via M-P threshold",formula:"\\lambda_+ = \\sigma^2(1 + \\sqrt{10/500})^2 = 0.42",explanation:"Eigenvalues above 0.42 contain genuine signal; below is noise."},{step:"Count signal components",formula:"\\lambda_1=3.2, \\lambda_2=1.8, \\lambda_3=1.1, \\lambda_4=0.7, \\lambda_5=0.5 > 0.42",explanation:"First 5 components are above the M-P threshold. Components 6-10 are noise."},{step:"Compute variance explained",formula:"\\text{Cumulative} = (3.2+1.8+1.1+0.7+0.5)/7.98 = 91.2\\%",explanation:"5 components explain 91.2% of total variance. Retain k*=5 components, discarding the 5 noise dimensions. This reduces the feature space by 50% while preserving signal."}]}),e.jsx(_,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"PCA and feature clustering are essential preprocessing steps for financial ML. PCA reveals the true dimensionality of Indian equity feature space (typically 3-5 independent factors explain most variation). Feature clustering identifies redundant feature groups, enabling representative feature selection. Use the Marchenko-Pastur threshold to objectively separate signal from noise eigenvalues, and correlation-based clustering to avoid feeding redundant features into ML models, which inflates overfitting risk and degrades out-of-sample performance."})})]})}const de=Object.freeze(Object.defineProperty({__proto__:null,default:W},Symbol.toStringTag,{value:"Module"}));function H(){const[n,y]=u.useState(.3),[c,b]=u.useState(.4),[s,j]=u.useState(.3),d=[{name:"Momentum",signal:.65,weight:n},{name:"ML (GBM)",signal:.72,weight:c},{name:"Fundamental",signal:.45,weight:s}],i=n+c+s,o=d.map(r=>({...r,normalizedWeight:r.weight/i})),m=o.reduce((r,a)=>r+a.signal*a.normalizedWeight,0),l=m>.6?"LONG":m<.4?"SHORT":"NEUTRAL";return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Signal Ensemble for Nifty Trading"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust weights to combine multiple alpha signals for a Nifty 50 stock."}),e.jsx("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[[n,y,"Momentum Weight"],[c,b,"ML Weight"],[s,j,"Fundamental Weight"]].map(([r,a,x])=>e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:[x," = ",(r/i*100).toFixed(0),"%"]}),e.jsx("input",{type:"range",min:"0",max:"1",step:"0.05",value:r,onChange:g=>a(parseFloat(g.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]},x))}),e.jsxs("svg",{viewBox:"0 0 400 100",className:"w-full max-w-md mx-auto block",children:[o.map((r,a)=>e.jsxs("g",{children:[e.jsx("text",{x:"85",y:22+a*28,textAnchor:"end",className:"text-[9px]",fill:"#6b7280",children:r.name}),e.jsx("rect",{x:"90",y:12+a*28,width:r.signal*200,height:"16",rx:"2",fill:"#818cf8",opacity:"0.6"}),e.jsx("rect",{x:90+r.signal*200-2,y:12+a*28,width:"4",height:"16",fill:"#4338ca"}),e.jsxs("text",{x:95+r.signal*200,y:24+a*28,className:"text-[8px]",fill:"#4338ca",children:[(r.signal*100).toFixed(0),"% (w=",r.normalizedWeight.toFixed(2),")"]})]},r.name)),e.jsx("line",{x1:"90",y1:"90",x2:90+m*200,y2:"90",stroke:"#16a34a",strokeWidth:"3"}),e.jsx("circle",{cx:90+m*200,cy:"90",r:"4",fill:"#16a34a"}),e.jsxs("text",{x:95+m*200,y:"93",className:"text-[9px] font-bold",fill:"#16a34a",children:["Ensemble: ",(m*100).toFixed(1),"%"]})]}),e.jsxs("p",{className:`mt-2 text-center text-sm font-bold ${l==="LONG"?"text-green-600":l==="SHORT"?"text-red-500":"text-amber-600"}`,children:["Position: ",l]})]})}function G(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Ensemble Signal Combination"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Combining multiple alpha signals into an ensemble improves prediction robustness and reduces strategy drawdowns. For Indian equity trading on NSE/BSE, ensembling momentum, ML-based, and fundamental signals creates diversified alpha sources that are less prone to crowding and regime-dependent failures."}),e.jsx(v,{title:"Signal Ensemble",label:"Definition 12.10",definition:"A signal ensemble combines K individual alpha signals into a composite signal using a weighting scheme. The ensemble signal for stock i at time t is a weighted average of individual signals, where weights can be static (equal, risk-parity) or dynamic (performance-based, Bayesian updating).",notation:"S_t^{ens} = \\sum_{k=1}^{K} w_{k,t} \\cdot s_{k,t}, \\quad \\sum_k w_{k,t} = 1"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Optimal Signal Combination"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The optimal weights maximize the ensemble Information Coefficient (IC):"}),e.jsx(t.BlockMath,{math:"w^* = \\arg\\max_w \\frac{w^T \\mu}{\\sqrt{w^T \\Sigma w}}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"\\mu"})," is the vector of individual signal ICs and"," ",e.jsx(t.InlineMath,{math:"\\Sigma"})," is the covariance matrix of signal errors. The solution is the tangency portfolio analog:"]}),e.jsx(t.BlockMath,{math:"w^* = \\frac{\\Sigma^{-1} \\mu}{\\mathbf{1}^T \\Sigma^{-1} \\mu}"}),e.jsx(w,{title:"Diversification of Alpha Sources",label:"Theorem 12.10",statement:"The ensemble IC exceeds any individual signal's IC when signals have positive but imperfect correlation: IC_{ens} \\geq \\max_k IC_k. With K independent signals of equal IC, the ensemble IC is IC_{ens} = IC \\cdot \\sqrt{K} (the square root of breadth rule).",proof:"For K independent, equal-IC signals with equal weights: IC_{ens} = \\frac{\\sum_k IC}{\\sqrt{\\sum_k 1}} = \\frac{K \\cdot IC}{\\sqrt{K}} = IC \\cdot \\sqrt{K}. This follows from the correlation between the ensemble signal and returns, using the independence to simplify the denominator."}),e.jsx(_,{title:"Ensemble Strategies for Indian Markets",type:"tip",children:e.jsxs("ul",{className:"space-y-1 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Signal 1 - Momentum:"})," Cross-sectional momentum on Nifty 500 (12-1 month returns)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Signal 2 - ML (GBM):"})," Tree ensemble trained on technical + flow features"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Signal 3 - Fundamental:"})," Composite quality + value score from financials"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Signal 4 - Sentiment:"})," FII/DII flows + PCR + India VIX regime"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Dynamic Weighting:"})," Increase ML weight in trending markets, fundamental weight in mean-reverting"]})]})}),e.jsx(H,{}),e.jsx(k,{title:"ensemble_signals.py",runnable:!0,code:`import numpy as np

class SignalEnsemble:
    """Ensemble signal combination for NSE equity trading."""

    def __init__(self, signal_names):
        self.signal_names = signal_names
        self.K = len(signal_names)

    def equal_weight(self, signals):
        return np.mean(signals, axis=0)

    def ic_weighted(self, signals, ics):
        """Weight by Information Coefficient."""
        ics = np.array(ics)
        weights = np.maximum(ics, 0)
        if weights.sum() > 0:
            weights /= weights.sum()
        else:
            weights = np.ones(self.K) / self.K
        return signals.T @ weights

    def optimal_weights(self, signal_ics, signal_corr):
        """Compute optimal weights (tangency portfolio analog)."""
        mu = np.array(signal_ics)
        sigma = np.diag(np.ones(self.K)) * 0.3  # Signal volatility
        for i in range(self.K):
            for j in range(self.K):
                if i != j:
                    sigma[i, j] = signal_corr[i][j] * 0.3 * 0.3

        try:
            sigma_inv = np.linalg.inv(sigma)
            w = sigma_inv @ mu
            w = np.maximum(w, 0)
            if w.sum() > 0:
                w /= w.sum()
            else:
                w = np.ones(self.K) / self.K
        except np.linalg.LinAlgError:
            w = np.ones(self.K) / self.K
        return w

    def exponential_decay_weights(self, past_ics, halflife=63):
        """Dynamic weighting based on recent IC performance."""
        T = len(past_ics)
        decay = np.exp(-np.log(2) / halflife * np.arange(T-1, -1, -1))
        weighted_ics = np.average(past_ics, axis=0, weights=decay)
        w = np.maximum(weighted_ics, 0)
        return w / w.sum() if w.sum() > 0 else np.ones(self.K) / self.K

# Example: 4-signal ensemble for Nifty stocks
np.random.seed(42)
signals = ['Momentum', 'ML_GBM', 'Fundamental', 'Sentiment']
ensemble = SignalEnsemble(signals)

# Simulate signals for 50 Nifty stocks
n_stocks = 50
n_days = 252

# Signal matrices (n_signals x n_stocks) for each day
signal_ics = [0.05, 0.08, 0.04, 0.03]  # Historical ICs
signal_corr = [
    [1.0,  0.3,  0.1,  0.2],
    [0.3,  1.0,  0.2,  0.15],
    [0.1,  0.2,  1.0,  0.05],
    [0.2,  0.15, 0.05, 1.0],
]

# Compute optimal weights
opt_w = ensemble.optimal_weights(signal_ics, signal_corr)

# Simulate daily returns and signals
daily_signals = np.random.randn(n_days, 4, n_stocks) * 0.1
actual_returns = np.random.randn(n_days, n_stocks) * 0.02

# Backtest different weighting schemes
schemes = {
    'Equal': np.ones(4) / 4,
    'IC-Weighted': np.array(signal_ics) / sum(signal_ics),
    'Optimal': opt_w,
}

print("=" * 60)
print("  Signal Ensemble - Nifty 50 Trading Strategy")
print("=" * 60)
print(f"\\nSignals: {', '.join(signals)}")
print(f"Individual ICs: {signal_ics}")
print(f"\\nOptimal Weights:")
for name, w in zip(signals, opt_w):
    print(f"  {name:<15} {w:.1%}")

# Simulate performance
print(f"\\n{'Scheme':<15} {'Weights':>30} {'Ens IC':>8} {'Sharpe':>8}")
print("-" * 65)
for scheme_name, weights in schemes.items():
    # Ensemble signal = weighted combination
    ens_signals = np.zeros((n_days, n_stocks))
    for k in range(4):
        ens_signals += weights[k] * daily_signals[:, k, :]

    # Compute IC (correlation with returns)
    daily_ics = [np.corrcoef(ens_signals[t], actual_returns[t])[0, 1]
                 for t in range(n_days)]
    avg_ic = np.nanmean(daily_ics)

    # Strategy returns (long top quintile, short bottom)
    strat_rets = []
    for t in range(n_days):
        ranks = np.argsort(-ens_signals[t])
        long_ret = np.mean(actual_returns[t, ranks[:10]])
        short_ret = np.mean(actual_returns[t, ranks[-10:]])
        strat_rets.append(long_ret - short_ret)

    sharpe = np.mean(strat_rets) / np.std(strat_rets) * np.sqrt(252)
    w_str = ', '.join([f"{w:.0%}" for w in weights])
    print(f"{scheme_name:<15} [{w_str:>26}] {avg_ic:>+7.4f} {sharpe:>8.2f}")`}),e.jsx(N,{title:"Combining Momentum and ML Signals",difficulty:"intermediate",problem:"A momentum signal has IC=0.05 and an ML signal has IC=0.08. Their correlation is 0.3. What is the optimal weight allocation and expected ensemble IC?",solution:[{step:"Set up the optimization",formula:"w^* = \\arg\\max \\frac{w_1 \\cdot 0.05 + w_2 \\cdot 0.08}{\\sqrt{w_1^2 + w_2^2 + 2 \\cdot 0.3 \\cdot w_1 w_2}}",explanation:"Maximize the signal-to-noise ratio of the ensemble."},{step:"Compute optimal weights",formula:"w_{mom} \\approx 0.35,\\quad w_{ML} \\approx 0.65",explanation:"The ML signal receives higher weight due to its higher IC."},{step:"Compute ensemble IC",formula:"IC_{ens} = \\frac{0.35 \\times 0.05 + 0.65 \\times 0.08}{\\sqrt{0.35^2 + 0.65^2 + 2 \\times 0.3 \\times 0.35 \\times 0.65}} \\approx 0.088",explanation:"The ensemble IC (0.088) exceeds the best individual IC (0.08) due to diversification. The low correlation (0.3) between signals creates ensemble benefit."}]}),e.jsx(_,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Signal ensembling is a powerful technique for building robust Indian equity strategies. The key insight is that combining weakly correlated alpha signals improves the overall IC beyond any individual signal. Use IC-weighted or optimal weights based on signal IC and correlation structure. Dynamic weighting that adapts to recent signal performance further enhances robustness across different Nifty market regimes."})})]})}const ce=Object.freeze(Object.defineProperty({__proto__:null,default:G},Symbol.toStringTag,{value:"Module"}));function U(){const[n,y]=u.useState(.01),[c,b]=u.useState(.99),[s,j]=u.useState(1),d=20,i=[.5],o=[];for(let r=1;r<d;r++){const a=Math.sin(r*.5)*.3,x=i[r-1]*.8,g=a-x;o.push(Math.abs(g));const f=i[r-1]*c+n*g;i.push(f)}const m=o.reduce((r,a)=>r+a,0)/o.length,l=o.slice(-5).reduce((r,a)=>r+a,0)/5;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Online Learning Convergence"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust learning rate and forgetting factor for adapting to Nifty regime changes."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Learning Rate = ",n.toFixed(3)]}),e.jsx("input",{type:"range",min:"0.001",max:"0.1",step:"0.001",value:n,onChange:r=>y(parseFloat(r.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Forget Factor = ",c.toFixed(3)]}),e.jsx("input",{type:"range",min:"0.9",max:"1",step:"0.005",value:c,onChange:r=>b(parseFloat(r.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Update Frequency = every ",s," day(s)"]}),e.jsx("input",{type:"range",min:"1",max:"5",step:"1",value:s,onChange:r=>j(parseInt(r.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 400 100",className:"w-full max-w-md mx-auto block",children:[o.map((r,a)=>{const x=30+a*(350/o.length),g=90-r*200;if(a>0){const f=30+(a-1)*(350/o.length),p=90-o[a-1]*200;return e.jsxs("g",{children:[e.jsx("line",{x1:f,y1:p,x2:x,y2:g,stroke:"#ef4444",strokeWidth:"1.5"}),e.jsx("circle",{cx:x,cy:g,r:"2",fill:"#ef4444"})]},a)}return e.jsx("circle",{cx:x,cy:g,r:"2",fill:"#ef4444"},a)}),e.jsx("text",{x:"200",y:"12",textAnchor:"middle",className:"text-[9px]",fill:"#6b7280",children:"Prediction Error Over Time"})]}),e.jsxs("div",{className:"mt-2 grid grid-cols-2 gap-2 text-center text-xs",children:[e.jsxs("div",{className:"rounded bg-gray-100 p-2 dark:bg-gray-800",children:[e.jsx("span",{className:"text-gray-500",children:"Avg Error"}),e.jsx("p",{className:"font-bold text-red-500",children:m.toFixed(4)})]}),e.jsxs("div",{className:"rounded bg-gray-100 p-2 dark:bg-gray-800",children:[e.jsx("span",{className:"text-gray-500",children:"Recent Error"}),e.jsx("p",{className:`font-bold ${l<m?"text-green-600":"text-red-500"}`,children:l.toFixed(4)})]})]})]})}function Y(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Online Learning for Adaptive Trading"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Financial markets are non-stationary -- the relationships between features and returns change over time. Online learning algorithms continuously update model parameters as new data arrives, adapting to regime changes in Indian equity markets. This section covers online gradient descent, exponential forgetting, and adaptive model updating for Nifty/BSE trading strategies."}),e.jsx(v,{title:"Online Learning",label:"Definition 12.11",definition:"Online learning updates model parameters incrementally with each new observation, rather than retraining on the entire dataset. At each time step t, the model receives observation (x_t, y_t), makes prediction hat{y}_t = f(x_t; theta_{t-1}), and updates parameters: theta_t = theta_{t-1} - eta * gradient(L(y_t, hat{y}_t)).",notation:"\\theta_t = \\theta_{t-1} - \\eta_t \\nabla L(y_t, \\hat{y}_t; \\theta_{t-1})"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Online Gradient Descent"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["For a linear model ",e.jsx(t.InlineMath,{math:"\\hat{y}_t = w_t^T x_t"}),", the online update with squared loss is:"]}),e.jsx(t.BlockMath,{math:"w_{t+1} = w_t + \\eta_t (y_t - w_t^T x_t) x_t"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The learning rate ",e.jsx(t.InlineMath,{math:"\\eta_t"})," controls the speed of adaptation. A decaying schedule ",e.jsx(t.InlineMath,{math:"\\eta_t = \\eta_0 / \\sqrt{t}"})," ensures convergence, while a constant ",e.jsx(t.InlineMath,{math:"\\eta"})," enables tracking non-stationary targets."]}),e.jsx(w,{title:"Regret Bound for Online Learning",label:"Theorem 12.11",statement:"For online gradient descent with learning rate \\eta_t = \\eta_0/\\sqrt{t} and convex loss, the cumulative regret relative to the best fixed predictor is bounded: R_T = \\sum_{t=1}^{T} L_t(\\theta_t) - \\min_\\theta \\sum_{t=1}^{T} L_t(\\theta) = O(\\sqrt{T}). The average regret R_T/T \\to 0 as T \\to \\infty.",proof:"By the standard analysis of OGD: R_T \\leq \\frac{||theta^*||^2}{2\\eta_T} + \\frac{1}{2}\\sum_{t=1}^{T}\\eta_t||g_t||^2. Choosing \\eta_t = \\eta_0/\\sqrt{t} and bounding ||g_t|| \\leq G: R_T \\leq \\frac{||theta^*||^2\\sqrt{T}}{2\\eta_0} + \\frac{\\eta_0 G^2\\sqrt{T}}{2} = O(\\sqrt{T})."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Exponentially Weighted Updates"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For tracking non-stationary financial relationships, exponential forgetting discounts older observations:"}),e.jsx(t.BlockMath,{math:"w_t = \\lambda w_{t-1} + (1-\\lambda) \\cdot \\text{update}_t, \\quad \\lambda \\in (0, 1)"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The effective window size is ",e.jsx(t.InlineMath,{math:"N_{eff} = 1/(1-\\lambda)"}),". For daily Nifty data, ",e.jsx(t.InlineMath,{math:"\\lambda = 0.99"})," gives"," ",e.jsx(t.InlineMath,{math:"N_{eff} = 100"})," days, suitable for capturing quarterly regime changes."]}),e.jsx(_,{title:"Online Learning for NSE Trading",type:"tip",children:e.jsxs("ul",{className:"space-y-1 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Daily Retraining:"})," Update model weights after each NSE trading session using that day's realized returns"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Regime Detection:"})," Monitor prediction error magnitude -- a spike signals a regime change requiring faster adaptation"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Concept Drift:"})," Track feature importance stability over time using rolling SHAP values"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Zerodha API:"})," Implement online updates in the post-market session (15:30-16:00 IST) using Kite Connect data"]})]})}),e.jsx(U,{}),e.jsx(k,{title:"online_learning.py",runnable:!0,code:`import numpy as np

class OnlineLinearModel:
    """Online learning model for NSE equity prediction."""

    def __init__(self, n_features, learning_rate=0.01,
                 forget_factor=0.99):
        self.w = np.zeros(n_features)
        self.b = 0
        self.lr = learning_rate
        self.lam = forget_factor
        self.errors = []

    def predict(self, x):
        return np.dot(self.w, x) + self.b

    def update(self, x, y_true):
        y_pred = self.predict(x)
        error = y_true - y_pred
        self.errors.append(error)

        # Exponential forgetting + gradient update
        self.w = self.lam * self.w + self.lr * error * x
        self.b = self.lam * self.b + self.lr * error

        return y_pred, error

    def rolling_mse(self, window=20):
        if len(self.errors) < window:
            return np.mean(np.array(self.errors) ** 2)
        return np.mean(np.array(self.errors[-window:]) ** 2)

class AdaptiveOnlineModel:
    """Adaptive learning rate based on error tracking."""

    def __init__(self, n_features, base_lr=0.01):
        self.model = OnlineLinearModel(n_features, base_lr)
        self.base_lr = base_lr
        self.error_ema = 0

    def predict_and_update(self, x, y_true):
        # Adaptive learning rate
        if len(self.model.errors) > 20:
            recent_mse = self.model.rolling_mse(20)
            long_mse = self.model.rolling_mse(100)
            if long_mse > 0:
                regime_change = recent_mse / long_mse
                self.model.lr = self.base_lr * min(3, max(0.3, regime_change))

        return self.model.update(x, y_true)

# Simulate non-stationary Nifty returns
np.random.seed(42)
n_days = 504  # 2 years
n_features = 5
feature_names = ['momentum', 'fii_flow', 'vix', 'volume', 'rsi']

# Generate features
X = np.random.randn(n_days, n_features)

# Non-stationary relationship (regime change at day 252)
true_w_1 = np.array([0.3, 0.2, -0.15, 0.1, 0.05])  # Regime 1
true_w_2 = np.array([0.1, -0.1, 0.25, 0.15, -0.2])  # Regime 2

y = np.zeros(n_days)
for t in range(n_days):
    w = true_w_1 if t < 252 else true_w_2
    y[t] = np.dot(w, X[t]) + np.random.randn() * 0.1

# Train online model
online = OnlineLinearModel(n_features, learning_rate=0.01, forget_factor=0.995)
adaptive = AdaptiveOnlineModel(n_features, base_lr=0.01)

online_preds, adaptive_preds = [], []
for t in range(n_days):
    pred_o, _ = online.update(X[t], y[t])
    pred_a, _ = adaptive.predict_and_update(X[t], y[t])
    online_preds.append(pred_o)
    adaptive_preds.append(pred_a)

# Evaluate in windows
windows = [(0, 126, 'Regime 1 (H1)'), (126, 252, 'Regime 1 (H2)'),
           (252, 378, 'Regime 2 (H1)'), (378, 504, 'Regime 2 (H2)')]

print("=" * 60)
print("  Online Learning - Non-Stationary Nifty Signals")
print("=" * 60)
print(f"\\nRegime change at day 252 (true weight vector flips)")
print(f"\\n{'Period':<20} {'Online RMSE':>12} {'Adaptive RMSE':>14} {'Better':>8}")
print("-" * 58)
for start, end, name in windows:
    o_rmse = np.sqrt(np.mean((y[start:end] - np.array(online_preds[start:end]))**2))
    a_rmse = np.sqrt(np.mean((y[start:end] - np.array(adaptive_preds[start:end]))**2))
    better = 'Adaptive' if a_rmse < o_rmse else 'Online'
    print(f"{name:<20} {o_rmse:>12.4f} {a_rmse:>14.4f} {better:>8}")

print(f"\\nOnline model final weights:")
for name, w in zip(feature_names, online.w):
    print(f"  {name:<12} {w:>+.4f}")
print(f"\\nTrue regime 2 weights:")
for name, w in zip(feature_names, true_w_2):
    print(f"  {name:<12} {w:>+.4f}")`}),e.jsx(N,{title:"Detecting Regime Change in Nifty Model",difficulty:"intermediate",problem:"Your online model's 20-day rolling MSE was 0.0015. After RBI announces an unexpected rate cut, the 20-day MSE spikes to 0.0045. What is the regime change ratio, and how should the learning rate adapt?",solution:[{step:"Compute regime change ratio",formula:"\\text{ratio} = \\frac{MSE_{recent}}{MSE_{baseline}} = \\frac{0.0045}{0.0015} = 3.0",explanation:"The error has tripled, indicating a significant regime change."},{step:"Adapt learning rate",formula:"\\eta_{new} = \\eta_{base} \\times \\min(3, \\max(0.3, 3.0)) = 3 \\times \\eta_{base}",explanation:"Triple the learning rate to adapt quickly to the new regime (post-rate cut market dynamics)."},{step:"Monitor convergence",formula:"\\text{Watch for } MSE_{recent}/MSE_{baseline} \\to 1.0",explanation:"Once the ratio returns near 1.0 (model has adapted), reduce the learning rate back to baseline. This typically takes 2-4 weeks for Nifty after a major RBI policy shift."}]}),e.jsx(_,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Online learning enables ML-based trading strategies to adapt to the non-stationary nature of Indian equity markets. The exponential forgetting factor controls the trade-off between stability (using more history) and adaptability (responding to regime changes). Adaptive learning rates that increase during detected regime changes (RBI policy shifts, election results, global crises) enable faster model adaptation while maintaining stability during normal market conditions."})})]})}const me=Object.freeze(Object.defineProperty({__proto__:null,default:Y},Symbol.toStringTag,{value:"Module"}));function $(){const[n,y]=u.useState(.65),[c,b]=u.useState(1.5),[s,j]=u.useState(10),d=n-(1-n)/c,i=d/2,o=(2*n-1)*s,m=s/(1+Math.exp(-10*(n-.5))),l=n>.6?s:n>.55?s*.5:0,r=[{name:"Kelly",size:d*s,color:"#6366f1"},{name:"Half Kelly",size:i*s,color:"#818cf8"},{name:"Linear",size:o,color:"#10b981"},{name:"Sigmoid",size:m,color:"#f59e0b"},{name:"Discrete",size:l,color:"#ef4444"}];return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Bet Sizing Methods"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Compare position sizing methods for a Nifty 50 trading signal."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Confidence (p) = ",(n*100).toFixed(0),"%"]}),e.jsx("input",{type:"range",min:"0.45",max:"0.85",step:"0.01",value:n,onChange:a=>y(parseFloat(a.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Win/Loss Ratio = ",c.toFixed(1)]}),e.jsx("input",{type:"range",min:"0.5",max:"3",step:"0.1",value:c,onChange:a=>b(parseFloat(a.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Max Position = ",s,"%"]}),e.jsx("input",{type:"range",min:"2",max:"20",step:"1",value:s,onChange:a=>j(parseInt(a.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 400 140",className:"w-full max-w-md mx-auto block",children:[r.map((a,x)=>{const g=Math.max(0,a.size/s*200);return e.jsxs("g",{children:[e.jsx("text",{x:"75",y:22+x*25,textAnchor:"end",className:"text-[9px]",fill:"#6b7280",children:a.name}),e.jsx("rect",{x:"80",y:12+x*25,width:g,height:"16",rx:"2",fill:a.color,opacity:"0.7"}),e.jsxs("text",{x:85+g,y:24+x*25,className:"text-[8px] font-bold",fill:a.color,children:[a.size.toFixed(1),"%"]})]},a.name)}),e.jsxs("text",{x:"200",y:"138",textAnchor:"middle",className:"text-[9px]",fill:"#6b7280",children:["Kelly f* = ",(d*100).toFixed(1),"%"]})]})]})}function Z(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Bet Sizing for ML Trading Strategies"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Position sizing determines how much capital to allocate to each trade based on the model's prediction confidence. Proper bet sizing transforms a marginally profitable signal into a robust strategy by concentrating capital on high-confidence predictions and reducing exposure on uncertain ones. For Indian equity and F&O trading on NSE, bet sizing must also respect SEBI margin requirements and lot size constraints."}),e.jsx(v,{title:"Kelly Criterion",label:"Definition 12.12",definition:"The Kelly criterion determines the optimal fraction of capital to bet on a favorable wager to maximize the long-run geometric growth rate of wealth. For a binary outcome with probability p of winning b units and probability 1-p of losing 1 unit, the optimal fraction is f* = p - (1-p)/b.",notation:"f^* = p - \\frac{1-p}{b} = \\frac{pb - (1-p)}{b} = \\frac{E[\\text{profit}]}{b}"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Kelly Criterion for Trading"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["For continuous returns with mean ",e.jsx(t.InlineMath,{math:"\\mu"})," and variance"," ",e.jsx(t.InlineMath,{math:"\\sigma^2"}),", the Kelly fraction is:"]}),e.jsx(t.BlockMath,{math:"f^* = \\frac{\\mu}{\\sigma^2}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["In practice, half-Kelly (",e.jsx(t.InlineMath,{math:"f^*/2"}),") is used to account for estimation error in ",e.jsx(t.InlineMath,{math:"\\mu"})," and ",e.jsx(t.InlineMath,{math:"\\sigma^2"}),":"]}),e.jsx(t.BlockMath,{math:"f_{half} = \\frac{1}{2} \\cdot \\frac{\\mu}{\\sigma^2}"}),e.jsx(w,{title:"Kelly Growth Rate Optimality",label:"Theorem 12.12",statement:"The Kelly fraction f* maximizes the expected logarithmic growth rate of wealth: f^* = \\arg\\max_f E[\\log(1 + f \\cdot r)]. Any fraction f > f^* has lower expected growth AND higher variance, while f < f^* reduces both growth and variance proportionally.",proof:"The expected log growth is g(f) = E[\\log(1+fr)]. Taking the derivative: g'(f) = E[r/(1+fr)]. Setting g'(f^*)=0 and solving gives f^* = \\mu/\\sigma^2 for normal returns. The second derivative g''(f) < 0 everywhere, confirming f^* is a maximum."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"ML-Based Bet Sizing"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"When using ML model prediction probabilities for bet sizing, the position size is a function of model confidence:"}),e.jsx(t.BlockMath,{math:"\\text{size}_t = m(2p_t - 1) \\quad \\text{(linear scaling)}"}),e.jsx(t.BlockMath,{math:"\\text{size}_t = m \\cdot \\frac{2}{1 + e^{-\\alpha(p_t - 0.5)}} - m \\quad \\text{(sigmoid scaling)}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"p_t"})," is the model's predicted probability of profit and ",e.jsx(t.InlineMath,{math:"m"})," is the maximum position size. The sigmoid function concentrates positions near full size for high-confidence predictions."]}),e.jsx(_,{title:"Bet Sizing Constraints in India",type:"tip",children:e.jsxs("ul",{className:"space-y-1 text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"SEBI Margins:"})," F&O margins (SPAN + exposure) typically 15-25% of notional, constraining maximum leverage"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Lot Sizes:"})," Nifty futures lot = 25 units, Bank Nifty = 15 units. Positions must be in multiples of lot size"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Peak Margin:"})," SEBI peak margin norms require intraday margin compliance at all times, not just end-of-day"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Zerodha Limits:"})," Bracket order and cover order position limits affect maximum position sizes for retail traders"]})]})}),e.jsx($,{}),e.jsx(k,{title:"bet_sizing.py",runnable:!0,code:`import numpy as np

class BetSizer:
    """Position sizing for ML-based trading strategies."""

    def __init__(self, max_position=0.10, method='half_kelly'):
        self.max_pos = max_position
        self.method = method

    def kelly_fraction(self, win_prob, win_loss_ratio):
        """Classic Kelly criterion."""
        f = win_prob - (1 - win_prob) / win_loss_ratio
        return max(0, min(f, 1))

    def continuous_kelly(self, expected_return, return_std):
        """Kelly for continuous returns."""
        if return_std <= 0:
            return 0
        f = expected_return / (return_std ** 2)
        return max(0, min(f, 2))  # Cap at 2x leverage

    def size_from_probability(self, prob, method=None):
        """Convert ML probability to position size."""
        method = method or self.method
        edge = 2 * prob - 1  # Range: [-1, 1]

        if method == 'kelly':
            size = self.kelly_fraction(prob, 1.5) * self.max_pos
        elif method == 'half_kelly':
            size = 0.5 * self.kelly_fraction(prob, 1.5) * self.max_pos
        elif method == 'linear':
            size = edge * self.max_pos
        elif method == 'sigmoid':
            size = self.max_pos * (2 / (1 + np.exp(-10 * (prob - 0.5))) - 1)
        elif method == 'discrete':
            if prob > 0.60:
                size = self.max_pos
            elif prob > 0.55:
                size = self.max_pos * 0.5
            else:
                size = 0
        else:
            size = edge * self.max_pos

        return np.clip(size, -self.max_pos, self.max_pos)

    def nse_lot_adjust(self, size_pct, capital, price, lot_size):
        """Round to NSE F&O lot size multiples."""
        notional = capital * abs(size_pct)
        n_lots = max(0, int(notional / (price * lot_size)))
        actual_notional = n_lots * price * lot_size
        actual_pct = actual_notional / capital
        return {
            'lots': n_lots,
            'notional': actual_notional,
            'actual_pct': actual_pct,
            'margin_required': actual_notional * 0.20  # ~20% margin
        }

# Simulate ML model predictions and bet sizing
np.random.seed(42)
n_trades = 200
probabilities = np.random.beta(3, 2.5, n_trades)  # Slightly positive edge

sizer = BetSizer(max_position=0.10)
methods = ['kelly', 'half_kelly', 'linear', 'sigmoid', 'discrete']

# Generate returns (correlated with true probabilities)
actual_returns = np.where(
    np.random.random(n_trades) < probabilities,
    np.random.exponential(0.015, n_trades),
    -np.random.exponential(0.012, n_trades)
)

print("=" * 65)
print("  Bet Sizing Comparison - Nifty 50 ML Strategy")
print("=" * 65)
print(f"\\nTrades: {n_trades}, Avg probability: {probabilities.mean():.3f}")
print(f"Win rate: {(actual_returns > 0).mean()*100:.1f}%")

print(f"\\n{'Method':<13} {'Avg Size':>9} {'Return':>9} {'Sharpe':>8} {'MaxDD':>8}")
print("-" * 55)

for method in methods:
    sizes = np.array([sizer.size_from_probability(p, method) for p in probabilities])
    strat_returns = sizes * actual_returns

    avg_size = np.mean(np.abs(sizes)) * 100
    total_ret = np.sum(strat_returns) * 100
    sharpe = np.mean(strat_returns) / np.std(strat_returns) * np.sqrt(252)
    cum_ret = np.cumsum(strat_returns)
    max_dd = np.min(cum_ret - np.maximum.accumulate(cum_ret)) * 100

    print(f"{method:<13} {avg_size:>8.1f}% {total_ret:>+8.1f}% "
          f"{sharpe:>8.2f} {max_dd:>+7.1f}%")

# NSE lot size example
print(f"\\nNSE F&O Position Sizing Example:")
print(f"  Capital: INR 50 Lakhs, Nifty at 22000, Lot size: 25")
for prob in [0.55, 0.60, 0.70]:
    size = sizer.size_from_probability(prob, 'half_kelly')
    lot_info = sizer.nse_lot_adjust(size, 5000000, 22000, 25)
    print(f"  p={prob:.2f}: size={size*100:.1f}%, lots={lot_info['lots']}, "
          f"margin=INR {lot_info['margin_required']:,.0f}")`}),e.jsx(N,{title:"Kelly Sizing for Nifty Futures Trade",difficulty:"intermediate",problem:"Your ML model predicts Nifty will rise with 62% probability. Historical win/loss ratio is 1.3 (average win / average loss). Capital is INR 50 Lakhs. Compute the Kelly and half-Kelly position sizes in Nifty futures lots (lot = 25, Nifty at 22,000).",solution:[{step:"Compute Kelly fraction",formula:"f^* = 0.62 - \\frac{0.38}{1.3} = 0.62 - 0.292 = 0.328",explanation:"Full Kelly suggests betting 32.8% of capital."},{step:"Apply half-Kelly for safety",formula:"f_{half} = 0.328 / 2 = 16.4\\%",explanation:"Half-Kelly is 16.4% of capital = INR 8.2 Lakhs."},{step:"Convert to Nifty lots",formula:"\\text{Lots} = \\lfloor \\frac{820000}{22000 \\times 25} \\rfloor = \\lfloor 1.49 \\rfloor = 1 \\text{ lot}",explanation:"At INR 5.5L per lot, one lot is the maximum. Margin required at 20% = INR 1.1L."},{step:"Risk check",formula:"\\text{Max loss} = 1 \\text{ lot} \\times 25 \\times 22000 \\times 2\\% = \\text{INR } 11,000",explanation:"At a 2% stop loss, maximum risk per trade is INR 11,000 (0.22% of capital), which is conservative and appropriate for a 62% confidence signal."}]}),e.jsx(_,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Bet sizing bridges ML prediction quality and portfolio profitability. The Kelly criterion provides the theoretically optimal sizing but should be halved in practice due to estimation uncertainty. For Indian F&O trading, positions must be rounded to NSE lot sizes and constrained by SEBI margin requirements. Sigmoid-based sizing concentrates positions on high-confidence trades, while linear scaling provides smoother capital allocation. Always ensure position sizes respect both model confidence and risk management limits."})})]})}const pe=Object.freeze(Object.defineProperty({__proto__:null,default:Z},Symbol.toStringTag,{value:"Module"}));export{ae as a,re as b,se as c,ne as d,ie as e,le as f,oe as g,de as h,ce as i,me as j,pe as k,te as s};
