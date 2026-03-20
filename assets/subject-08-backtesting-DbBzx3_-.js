import{j as e,r as c}from"./vendor-DgA46Qmo.js";import{r as t}from"./vendor-katex-C-S70IU0.js";import{D as S,T as M,P as T,E as C,N as b}from"./subject-01-math-foundations-vREfsVbS.js";function z(){const[i,_]=c.useState(5),[a,N]=c.useState(500),[s,k]=c.useState(100),l=a/i,x=Math.sqrt(2*Math.log(s))*(1/Math.sqrt(a/252)),o=Math.min(.99,1-Math.exp(-i*s/a)),f=Math.ceil(i*s/252*5),m=l<20?"HIGH":l<50?"MODERATE":"LOW",h=l<20?"text-red-600 dark:text-red-400":l<50?"text-orange-600 dark:text-orange-400":"text-green-600 dark:text-green-400";return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Overfitting Risk Calculator"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Estimate the probability of overfitting based on your strategy complexity and data size."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Free Parameters = ",i]}),e.jsx("input",{type:"range",min:"1",max:"50",step:"1",value:i,onChange:p=>_(Number(p.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Trading Days = ",a]}),e.jsx("input",{type:"range",min:"50",max:"5000",step:"50",value:a,onChange:p=>N(Number(p.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Strategies Tried = ",s]}),e.jsx("input",{type:"range",min:"1",max:"1000",step:"10",value:s,onChange:p=>k(Number(p.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Overfit Risk"}),e.jsx("div",{className:`text-sm font-bold ${h}`,children:m}),e.jsxs("div",{className:"text-[10px] text-gray-400",children:["ratio: ",l.toFixed(0)]})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Max Spurious Sharpe"}),e.jsx("div",{className:"text-lg font-bold text-red-600 dark:text-red-400",children:x.toFixed(2)})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Overfit Probability"}),e.jsxs("div",{className:"text-lg font-bold text-orange-600 dark:text-orange-400",children:[(o*100).toFixed(1),"%"]})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Min Years Needed"}),e.jsx("div",{className:"text-lg font-bold text-blue-600 dark:text-blue-400",children:(f/252).toFixed(1)})]})]})]})}function q(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Overfitting in Backtesting"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Overfitting is the most dangerous pitfall in quantitative strategy development. A strategy that appears profitable in a backtest may simply be fitting noise in historical data rather than capturing genuine market inefficiencies. In the Indian market context, where Nifty 50 data since 2000 provides roughly 6000 trading days, the risk of overfitting is acute for strategies with many parameters or those tested across many configurations."}),e.jsx(S,{title:"Overfitting (Backtest Overfitting)",label:"Definition 8.1",definition:"Overfitting occurs when a trading strategy is tuned to exploit specific patterns in historical data that are unlikely to repeat in the future. An overfit strategy has high in-sample performance but poor out-of-sample results.",notation:"\\text{Sharpe}_{\\text{IS}} \\gg \\text{Sharpe}_{\\text{OOS}} \\implies \\text{overfitting}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The fundamental cause of overfitting is the multiple testing problem: when you test many strategy variations, some will appear profitable by chance alone. The more parameters you tune, the more degrees of freedom the optimizer has to fit noise."}),e.jsx(M,{title:"Expected Maximum Sharpe Ratio Under Null",label:"Theorem 8.1",statement:"If you test N independent strategies on T observations, each with zero true Sharpe ratio, the expected maximum in-sample Sharpe ratio is approximately: E[\\max SR] \\approx \\sqrt{2 \\ln N} \\cdot \\sqrt{252/T}. For N=100 trials on 5 years of daily data (T=1260), this gives E[\\max SR] \\approx 0.96. A backtest Sharpe must significantly exceed this threshold to be credible.",proof:"Under the null hypothesis (true SR = 0), each strategy's annualized in-sample Sharpe ratio follows approximately N(0, 252/T). For N independent draws from this distribution, the expected maximum is given by the Gumbel extreme value distribution: E[\\max Z_i] \\approx \\sqrt{2\\ln N} for large N, where Z_i are standard normal. Scaling by \\sqrt{252/T} gives the annualized result."}),e.jsx(t.BlockMath,{math:"E\\!\\left[\\max_{i=1}^{N} \\widehat{SR}_i\\right] \\approx \\sqrt{2 \\ln N} \\cdot \\frac{1}{\\sqrt{T/252}}"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Symptoms of Overfitting"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Symptom"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Description"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Example (NSE)"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Parameter sensitivity"}),e.jsx("td",{className:"px-4 py-2",children:"Small param changes destroy returns"}),e.jsx("td",{className:"px-4 py-2",children:"RSI works at 14 but not 13 or 15"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Too many rules"}),e.jsx("td",{className:"px-4 py-2",children:"Complex entry/exit logic"}),e.jsx("td",{className:"px-4 py-2",children:"Buy Nifty if MA20>MA50 AND RSI AND VIX AND..."})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Period-specific"}),e.jsx("td",{className:"px-4 py-2",children:"Works only in certain years"}),e.jsx("td",{className:"px-4 py-2",children:"Great 2017-2019, fails 2020+"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Unrealistic SR"}),e.jsx("td",{className:"px-4 py-2",children:"Sharpe > 3 on daily data"}),e.jsx("td",{className:"px-4 py-2",children:"Almost certainly overfit"})]})]})]})}),e.jsx(z,{}),e.jsx(T,{title:"overfitting_demonstration.py",runnable:!0,code:`import numpy as np

np.random.seed(42)

def simulate_overfitting(n_days=1260, n_strategies=100):
    """Demonstrate how testing many strategies produces spurious results."""
    # Generate pure noise returns (no real signal)
    noise_returns = np.random.normal(0, 0.01, (n_strategies, n_days))

    # Compute Sharpe ratios (all should be ~0 in truth)
    sharpes = np.mean(noise_returns, axis=1) / np.std(noise_returns, axis=1)
    sharpes_annual = sharpes * np.sqrt(252)

    # Find the "best" strategy
    best_idx = np.argmax(sharpes_annual)
    best_sharpe = sharpes_annual[best_idx]

    # Theoretical expected max
    expected_max = np.sqrt(2 * np.log(n_strategies)) * np.sqrt(252 / n_days)

    return sharpes_annual, best_sharpe, expected_max, best_idx

# Run the demonstration
print("=== Overfitting Demonstration ===")
print(f"Setup: {100} random strategies on {1260} days of NOISE (no signal)")
print(f"True Sharpe of ALL strategies: 0.00")
print()

sharpes, best, expected, best_idx = simulate_overfitting()

print(f"Best in-sample Sharpe found: {best:.2f}")
print(f"Expected max (theory):       {expected:.2f}")
print(f"")
print(f"Distribution of 'best' Sharpe across 1000 experiments:")

# Run many experiments
bests = []
for _ in range(1000):
    _, b, _, _ = simulate_overfitting(n_strategies=100)
    bests.append(b)
bests = np.array(bests)

print(f"  Mean of best SR:   {np.mean(bests):.2f}")
print(f"  Max of best SR:    {np.max(bests):.2f}")
print(f"  P(best SR > 1.0): {(bests > 1.0).mean()*100:.1f}%")
print(f"  P(best SR > 1.5): {(bests > 1.5).mean()*100:.1f}%")
print(f"  P(best SR > 2.0): {(bests > 2.0).mean()*100:.1f}%")

# Impact of number of strategies tested
print(f"\\n=== Impact of Multiple Testing ===")
print(f"{'N strategies':>15} {'E[max SR]':>12} {'P(SR>1.5)':>12}")
print("-" * 42)
for N in [1, 5, 10, 50, 100, 500, 1000]:
    expected = np.sqrt(2 * np.log(max(N, 2))) * np.sqrt(252 / 1260)
    bests_n = []
    for _ in range(500):
        noise = np.random.normal(0, 0.01, (N, 1260))
        sr = np.max(np.mean(noise, axis=1) / np.std(noise, axis=1) * np.sqrt(252))
        bests_n.append(sr)
    bests_n = np.array(bests_n)
    print(f"{N:>15} {expected:>12.2f} {(bests_n > 1.5).mean()*100:>11.1f}%")

# Practical rule: observations per parameter
print(f"\\n=== Minimum Data Requirements ===")
for params in [2, 5, 10, 20]:
    min_obs = params * 50  # rule of thumb: 50x
    years = min_obs / 252
    print(f"  {params} parameters: need {min_obs} days ({years:.1f} years)")`}),e.jsx(C,{title:"Testing Moving Average Crossovers on Nifty",difficulty:"intermediate",problem:"A researcher tests 100 different moving average crossover combinations (fast: 5-50, slow: 20-200) on Nifty 50 daily data from 2015-2024 (2520 days). The best combination (MA 18/67) shows Sharpe = 1.2. Is this reliable?",solution:[{step:"Compute expected spurious maximum Sharpe",formula:"E[\\max SR] = \\sqrt{2\\ln(100)} \\cdot \\sqrt{252/2520} = 3.03 \\times 0.316 = 0.96"},{step:"Compare observed vs threshold",formula:"SR_{\\text{observed}} = 1.2, \\quad SR_{\\text{threshold}} \\approx 0.96"},{step:"Assessment",formula:"1.2 > 0.96 \\text{ but not by much}",explanation:"The observed Sharpe exceeds the spurious threshold by only 0.24. This is weak evidence of a real signal. A genuine edge would show Sharpe > 2x the threshold (i.e., > 1.9). The MA 18/67 result is likely partially overfit and would show degraded OOS performance."}]}),e.jsx(b,{title:"The Paradox of Indian Market Data",type:"warning",children:e.jsx("p",{children:"India's equity market has undergone massive structural changes: NSE launch (1994), electronic trading (2000s), algo trading permitted (2008), co-location (2012), weekly options (2019), SEBI margin rules (2020-21). Using pre-2015 data to validate strategies designed for current market microstructure is problematic. Yet restricting to 2015+ gives only ~2500 trading days, which limits statistical power. This tension makes robust validation critical."})}),e.jsx(b,{title:"Combating Overfitting",type:"tip",children:e.jsx("p",{children:"Practical defenses against overfitting for Nifty strategies: (1) Use out-of-sample testing with walk-forward validation, (2) limit free parameters to fewer than T/50 where T is trading days, (3) prefer simple strategies with economic rationale over data-mined patterns, (4) test on related markets (Bank Nifty, Nifty Next 50) for robustness, (5) use the Deflated Sharpe Ratio (covered in section s3) to account for multiple testing, and (6) paper trade for 3-6 months before deploying capital."})})]})}const xe=Object.freeze(Object.defineProperty({__proto__:null,default:q},Symbol.toStringTag,{value:"Module"}));function D(){const[i,_]=c.useState("survivorship"),[a,N]=c.useState(50),[s,k]=c.useState(5),[l,x]=c.useState(10),o=Math.round(a*Math.pow(1-s/100,l)),f=a-o,m=12+s*.5,h=-15-s*2,p=m,r=(o*m+f*h)/a,u=p-r;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Survivorship Bias Impact on Nifty 50 Backtests"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"See how excluding delisted stocks inflates backtest returns."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Universe Size = ",a]}),e.jsx("input",{type:"range",min:"20",max:"200",step:"10",value:a,onChange:y=>N(Number(y.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Annual Delist Rate = ",s,"%"]}),e.jsx("input",{type:"range",min:"1",max:"15",step:"1",value:s,onChange:y=>k(Number(y.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Backtest Years = ",l]}),e.jsx("input",{type:"range",min:"3",max:"20",step:"1",value:l,onChange:y=>x(Number(y.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Surviving Stocks"}),e.jsx("div",{className:"text-lg font-bold text-green-600 dark:text-green-400",children:o})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Biased Return"}),e.jsxs("div",{className:"text-lg font-bold text-orange-600 dark:text-orange-400",children:[p.toFixed(1),"%"]})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"True Return"}),e.jsxs("div",{className:"text-lg font-bold text-blue-600 dark:text-blue-400",children:[r.toFixed(1),"%"]})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Bias Amount"}),e.jsxs("div",{className:"text-lg font-bold text-red-600 dark:text-red-400",children:[u.toFixed(1),"%"]})]})]})]})}function O(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Survivorship Bias and Look-Ahead Bias"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Survivorship bias and look-ahead bias are two of the most insidious data biases in backtesting. They inflate apparent strategy performance by incorporating information that would not have been available at the time of the trade. On NSE, where stocks are regularly added to and removed from Nifty 50, these biases can add 2-4% annually to backtest returns."}),e.jsx(S,{title:"Survivorship Bias",label:"Definition 8.2",definition:"Survivorship bias occurs when a backtest uses only currently existing (surviving) securities, excluding those that were delisted, merged, or removed from an index. Since surviving stocks tend to have performed better, this creates an upward bias in returns.",notation:"R_{\\text{biased}} = \\frac{1}{n_{\\text{surviving}}} \\sum_{i \\in \\text{survivors}} R_i > R_{\\text{true}} = \\frac{1}{n_{\\text{all}}} \\sum_{i \\in \\text{all}} R_i"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"On NSE, Nifty 50 constituents change 2-5 times per year through periodic rebalancing by NSE Indices Ltd. Companies that perform poorly are removed (e.g., Yes Bank was removed from Nifty in 2020 after its stock crashed 90%), and their poor performance is excluded from survivorship-biased datasets."}),e.jsx(S,{title:"Look-Ahead Bias",label:"Definition 8.3",definition:"Look-ahead bias occurs when a backtest uses information that was not available at the time of the simulated trade decision. This includes using future prices, upcoming corporate actions, or fundamental data before its actual release date.",notation:"\\text{Signal}_t = f(\\text{Data}_{t+k}) \\quad \\text{for any } k > 0 \\implies \\text{look-ahead bias}"}),e.jsx(M,{title:"Survivorship Bias Bound",label:"Theorem 8.2",statement:"For a universe of N stocks with annual attrition rate \\lambda (fraction delisted/year), the survivorship bias over T years is bounded by: \\text{Bias} \\leq \\lambda T \\cdot |\\bar{R}_{\\text{dead}} - \\bar{R}_{\\text{alive}}|, where \\bar{R}_{\\text{dead}} is the average return of stocks in the year before delisting.",proof:"In each year, \\lambda N stocks are removed. Their absence biases the mean return upward by \\lambda \\cdot (\\bar{R}_{\\text{alive}} - \\bar{R}_{\\text{dead}}). Over T years, under the simplifying assumption that the bias is additive, the total bias accumulates linearly to \\lambda T \\cdot |\\bar{R}_{\\text{dead}} - \\bar{R}_{\\text{alive}}|."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Common Sources of Look-Ahead Bias on NSE"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Bias Source"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Example"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Impact"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Fix"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Index composition"}),e.jsx("td",{className:"px-4 py-2",children:"Using today's Nifty 50 list for 2015"}),e.jsx("td",{className:"px-4 py-2",children:"+2-3% annual"}),e.jsx("td",{className:"px-4 py-2",children:"Point-in-time constituents"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Earnings data"}),e.jsx("td",{className:"px-4 py-2",children:"Using Q2 results on Q2 end date"}),e.jsx("td",{className:"px-4 py-2",children:"Huge (earnings drift)"}),e.jsx("td",{className:"px-4 py-2",children:"Use actual filing date"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Adjusted prices"}),e.jsx("td",{className:"px-4 py-2",children:"Split-adjusted data applied retroactively"}),e.jsx("td",{className:"px-4 py-2",children:"Moderate"}),e.jsx("td",{className:"px-4 py-2",children:"Adjustment factors per date"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"SEBI regulations"}),e.jsx("td",{className:"px-4 py-2",children:"Applying 2023 margin rules to 2018"}),e.jsx("td",{className:"px-4 py-2",children:"Varies"}),e.jsx("td",{className:"px-4 py-2",children:"Time-stamped rule database"})]})]})]})}),e.jsx(D,{}),e.jsx(T,{title:"survivorship_bias_demo.py",runnable:!0,code:`import numpy as np

np.random.seed(42)

def simulate_universe(n_stocks=100, n_years=10, annual_delist_rate=0.05,
                       mean_return=0.12, vol=0.25, delist_threshold=-0.50):
    """Simulate a stock universe with delistings to show survivorship bias."""
    annual_returns_all = []
    annual_returns_survivors = []

    active = np.ones(n_stocks, dtype=bool)
    prices = np.ones(n_stocks) * 100  # starting prices

    for year in range(n_years):
        # Generate returns for active stocks
        returns = np.random.normal(mean_return, vol, n_stocks)

        # Stocks that crash below threshold get delisted
        cum_prices = prices * (1 + returns)
        new_delists = (cum_prices < prices * (1 + delist_threshold)) & active

        # Record returns
        all_year_return = np.mean(returns[active])
        annual_returns_all.append(all_year_return)

        # Mark delistings
        active[new_delists] = False

        # Also random delistings (mergers, etc.)
        random_delists = np.random.random(n_stocks) < annual_delist_rate
        active[random_delists & active] = False

        # Survivor-only return (computed using only current survivors)
        survivor_return = np.mean(returns[active]) if active.any() else 0
        annual_returns_survivors.append(survivor_return)

        prices = cum_prices

    return (np.array(annual_returns_all),
            np.array(annual_returns_survivors),
            active.sum())

# Run simulation
all_ret, surv_ret, n_surviving = simulate_universe()

print("=== Survivorship Bias in Indian Stock Universe ===")
print(f"Starting universe: 100 stocks")
print(f"Surviving after 10 years: {n_surviving}")
print()

print(f"{'Year':>5} {'All Stocks':>12} {'Survivors':>12} {'Bias':>8}")
print("-" * 40)
cum_bias = 0
for y in range(10):
    bias = surv_ret[y] - all_ret[y]
    cum_bias += bias
    print(f"{y+1:>5} {all_ret[y]*100:>11.1f}% {surv_ret[y]*100:>11.1f}% "
          f"{bias*100:>+7.1f}%")

print(f"\\nCumulative bias over 10 years: {cum_bias*100:+.1f}%")
print(f"Average annual bias: {cum_bias/10*100:+.1f}%")
print(f"Survivor avg return: {np.mean(surv_ret)*100:.1f}%")
print(f"True avg return:     {np.mean(all_ret)*100:.1f}%")

# Look-ahead bias demonstration
print(f"\\n=== Look-Ahead Bias: Nifty 50 Composition ===")
# Simulate using point-in-time vs current composition
n_periods = 20
changes_per_period = 3
universe = list(range(50))

biased_returns = []
correct_returns = []

for period in range(n_periods):
    # True returns for all stocks
    returns = {s: np.random.normal(0.01, 0.05) for s in range(200)}

    # Correct: use composition known at start of period
    correct_ret = np.mean([returns[s] for s in universe])
    correct_returns.append(correct_ret)

    # Remove worst performers, add best new ones
    perf = [(s, returns[s]) for s in universe]
    perf.sort(key=lambda x: x[1])
    removed = [p[0] for p in perf[:changes_per_period]]
    new_stocks = np.random.choice(
        [s for s in range(200) if s not in universe],
        changes_per_period, replace=False)
    for r in removed:
        universe.remove(r)
    universe.extend(new_stocks)

    # Biased: use the NEW composition (look-ahead)
    biased_ret = np.mean([returns[s] for s in universe])
    biased_returns.append(biased_ret)

print(f"Correct avg return: {np.mean(correct_returns)*100:.2f}%")
print(f"Biased avg return:  {np.mean(biased_returns)*100:.2f}%")
print(f"Look-ahead bias:    {(np.mean(biased_returns)-np.mean(correct_returns))*100:+.2f}%")`}),e.jsx(C,{title:"Survivorship Bias in Nifty 50 Momentum Strategy",difficulty:"intermediate",problem:"You backtest a 12-month momentum strategy on current Nifty 50 stocks from 2015-2024. In 2018, Yes Bank (then in Nifty) showed a 12-month return of +80% and was ranked #3 by momentum. By 2020, it crashed 90% and was removed from Nifty. How does this create bias?",solution:[{step:"Identify the bias",formula:"\\text{Using current Nifty 50 excludes Yes Bank from the universe}",explanation:"Yes Bank is not in the current Nifty 50, so it is excluded from the backtest entirely."},{step:"Impact on 2018 momentum signal",formula:"\\text{True: Yes Bank ranked \\#3 with +80\\% momentum}",explanation:"A correct backtest would have bought Yes Bank in 2018 based on momentum. The subsequent 90% crash would have been a devastating loss."},{step:"Quantify the bias",formula:"\\text{Excluded loss} \\approx -90\\% \\times \\frac{1}{50} = -1.8\\% \\text{ portfolio impact}",explanation:"By excluding Yes Bank, the backtest avoids this loss entirely, inflating cumulative returns. Similar biases occur for other removed stocks like Zee, BPCL, etc."}]}),e.jsx(b,{title:"Getting Point-in-Time Data for NSE",type:"tip",children:e.jsx("p",{children:"For survivorship-free backtesting on NSE: (1) NSE publishes historical Nifty 50 constituent lists on its website (nseindia.com), (2) use CMIE Prowess or Bloomberg for point-in-time fundamental data, (3) the NSE bhavcopy archive contains all traded securities including delisted ones, (4) Kite Connect Historical API provides adjusted prices but check for survivorship in symbol lists. When in doubt, manually verify constituents against NSE circulars for the specific date."})}),e.jsx(b,{title:"Subtle Look-Ahead Biases",type:"warning",children:e.jsx("p",{children:'Beyond obvious look-ahead biases, watch for: (1) using close prices for same-day signals (you cannot trade at close after seeing the close), (2) corporate action adjustments applied with future knowledge (bonus, splits), (3) using India VIX settlement value for same-day trading (computed after market close), (4) SEBI circular impacts (e.g., margin rule changes) assumed to be known before publication. Always ask: "Would I have known this information at the time of the trade decision?"'})})]})}const me=Object.freeze(Object.defineProperty({__proto__:null,default:O},Symbol.toStringTag,{value:"Module"}));function L(){const[i,_]=c.useState(1.8),[a,N]=c.useState(50),[s,k]=c.useState(1260),[l,x]=c.useState(-.5),[o,f]=c.useState(4),m=Math.sqrt(2*Math.log(a))*(1-1/(4*Math.log(a)))*Math.sqrt(252/s),h=Math.sqrt((1+.25*i*i*(o-1)-l*i)/s)*Math.sqrt(252),p=(i-m)/h,u=1-(n=>{const j=.254829592,v=-.284496736,I=1.421413741,w=-1.453152027,A=1.061405429,F=.3275911,E=n<0?-1:1,d=1/(1+F*Math.abs(n)/Math.sqrt(2)),g=1-((((A*d+w)*d+I)*d+v)*d+j)*d*Math.exp(-n*n/2);return .5*(1+E*g)})(p),y=u<.05;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Deflated Sharpe Ratio Calculator"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Test whether your backtest Sharpe ratio survives adjustment for multiple testing and non-normality."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Observed Sharpe = ",i.toFixed(1)]}),e.jsx("input",{type:"range",min:"0.5",max:"4.0",step:"0.1",value:i,onChange:n=>_(Number(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Strategies Tested = ",a]}),e.jsx("input",{type:"range",min:"1",max:"500",step:"5",value:a,onChange:n=>N(Number(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Trading Days = ",s]}),e.jsx("input",{type:"range",min:"252",max:"5000",step:"126",value:s,onChange:n=>k(Number(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Skewness = ",l.toFixed(1)]}),e.jsx("input",{type:"range",min:"-3",max:"2",step:"0.1",value:l,onChange:n=>x(Number(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Kurtosis = ",o.toFixed(1)]}),e.jsx("input",{type:"range",min:"3",max:"10",step:"0.5",value:o,onChange:n=>f(Number(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Expected Max SR"}),e.jsx("div",{className:"text-lg font-bold text-orange-600 dark:text-orange-400",children:m.toFixed(2)})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"DSR z-score"}),e.jsx("div",{className:"text-lg font-bold text-blue-600 dark:text-blue-400",children:p.toFixed(2)})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"p-value"}),e.jsx("div",{className:`text-lg font-bold ${y?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}`,children:u.toFixed(4)})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Verdict"}),e.jsx("div",{className:`text-sm font-bold ${y?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}`,children:y?"PASSES DSR":"FAILS DSR"})]})]})]})}function V(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"The Deflated Sharpe Ratio"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"The Deflated Sharpe Ratio (DSR), introduced by Bailey and Lopez de Prado (2014), provides a rigorous statistical test for whether a backtest Sharpe ratio is genuinely significant after accounting for the number of strategies tested and the non-normality of returns. It is the gold standard for validating quantitative strategy performance."}),e.jsx(S,{title:"Deflated Sharpe Ratio",label:"Definition 8.4",definition:"The Deflated Sharpe Ratio tests the null hypothesis that the observed Sharpe ratio could have been achieved by chance, given the number of independent strategies tested. It adjusts the standard error of the Sharpe ratio for non-normality (skewness and kurtosis) and compares the observed SR against the expected maximum under the null.",notation:"\\text{DSR} = \\Phi\\!\\left(\\frac{\\widehat{SR} - E[\\max SR]}{\\widehat{\\sigma}_{SR}}\\right)"}),e.jsx(t.BlockMath,{math:"\\text{DSR p-value} = 1 - \\Phi\\!\\left(\\frac{\\widehat{SR} - \\sqrt{V[\\widehat{SR}]} \\cdot \\sqrt{2\\ln N} \\cdot (1 - \\gamma \\cdot \\text{correction})}{\\widehat{\\sigma}_{SR}}\\right)"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The standard error of the Sharpe ratio under non-normal returns (Lo, 2002) is:"}),e.jsx(t.BlockMath,{math:"\\widehat{\\sigma}_{SR} = \\sqrt{\\frac{1 + \\frac{1}{4}\\widehat{SR}^2(\\hat{\\kappa} - 1) - \\hat{\\gamma}_3 \\cdot \\widehat{SR}}{T}} \\cdot \\sqrt{252}"}),e.jsx(M,{title:"DSR Test Properties",label:"Theorem 8.3",statement:"The DSR has the following properties: (1) It reduces to the standard t-test when N=1 (single strategy) and returns are normal. (2) The critical Sharpe ratio increases as \\sqrt{\\ln N}, making it progressively harder to achieve significance with more trials. (3) Negative skewness and excess kurtosis increase the standard error, further raising the bar. (4) DSR has correct size (Type I error rate) under the null.",proof:"Property (1): When N=1, E[\\max SR] = 0, and with normal returns (\\gamma_3 = 0, \\kappa = 3), the test statistic reduces to SR/\\sqrt{1/T} = SR\\sqrt{T}, which is the standard t-statistic. Properties (2)-(4) follow from the Gumbel approximation for the maximum of N normal random variables and the Lo (2002) correction for the SR standard error."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Minimum Backtest Length (minBTL)"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The Minimum Backtest Length is the minimum number of observations needed for a given Sharpe ratio to be statistically significant:"}),e.jsx(t.BlockMath,{math:"T_{\\min} \\approx \\left(\\frac{\\sqrt{2\\ln N}}{\\widehat{SR}}\\right)^2 \\cdot 252"}),e.jsx(L,{}),e.jsx(T,{title:"deflated_sharpe_ratio.py",runnable:!0,code:`import numpy as np
from scipy import stats

def deflated_sharpe_ratio(observed_sr, n_trials, n_obs,
                           skewness=0, kurtosis=3, annualize=252):
    """
    Compute the Deflated Sharpe Ratio p-value.

    Parameters:
    - observed_sr: annualized Sharpe ratio
    - n_trials: number of independent strategies tested
    - n_obs: number of daily observations
    - skewness: sample skewness of returns
    - kurtosis: sample kurtosis (not excess)
    """
    # Expected maximum SR under null (Euler-Mascheroni correction)
    euler_mascheroni = 0.5772156649
    e_max_sr = (np.sqrt(2 * np.log(n_trials))
                * (1 - euler_mascheroni / (2 * np.log(n_trials)))
                * np.sqrt(annualize / n_obs))

    # Standard error of SR (Lo 2002 with non-normal adjustment)
    se_sr = np.sqrt(
        (1 + 0.25 * observed_sr**2 * (kurtosis - 1) - skewness * observed_sr)
        / n_obs
    ) * np.sqrt(annualize)

    # Z-score
    z = (observed_sr - e_max_sr) / se_sr

    # p-value (one-sided test)
    p_value = 1 - stats.norm.cdf(z)

    return {
        'observed_sr': observed_sr,
        'e_max_sr': e_max_sr,
        'se_sr': se_sr,
        'z_score': z,
        'p_value': p_value,
        'significant': p_value < 0.05,
    }

def min_backtest_length(target_sr, n_trials, annualize=252):
    """Minimum backtest length for SR to be significant."""
    e_max_sr_factor = np.sqrt(2 * np.log(n_trials))
    min_obs = (e_max_sr_factor / target_sr) ** 2 * annualize
    return int(np.ceil(min_obs))

# Test various Nifty strategies
print("=== Deflated Sharpe Ratio Analysis ===")
print("Testing if backtest Sharpe ratios survive multiple-testing adjustment")
print()

strategies = [
    {"name": "Nifty Momentum (12-mo)", "sr": 1.2, "trials": 20,
     "obs": 2520, "skew": -0.3, "kurt": 4.5},
    {"name": "Mean Reversion RSI", "sr": 1.8, "trials": 100,
     "obs": 1260, "skew": 0.2, "kurt": 5.0},
    {"name": "ML Ensemble (50 features)", "sr": 2.5, "trials": 500,
     "obs": 1260, "skew": -0.8, "kurt": 6.0},
    {"name": "Simple MA Crossover", "sr": 0.8, "trials": 5,
     "obs": 5040, "skew": -0.1, "kurt": 3.5},
    {"name": "Iron Condor Weekly", "sr": 1.5, "trials": 30,
     "obs": 756, "skew": -2.0, "kurt": 8.0},
]

for s in strategies:
    result = deflated_sharpe_ratio(
        s['sr'], s['trials'], s['obs'], s['skew'], s['kurt']
    )
    print(f"Strategy: {s['name']}")
    print(f"  Observed SR: {result['observed_sr']:.2f} | "
          f"E[max SR]: {result['e_max_sr']:.2f}")
    print(f"  SE(SR): {result['se_sr']:.2f} | "
          f"z-score: {result['z_score']:.2f} | "
          f"p-value: {result['p_value']:.4f}")
    print(f"  Verdict: {'PASSES' if result['significant'] else 'FAILS'} "
          f"DSR test at 5% level")
    print()

# Minimum backtest length
print(f"=== Minimum Backtest Length ===")
print(f"{'Target SR':>12} {'N Trials':>10} {'Min Days':>10} {'Min Years':>10}")
print("-" * 46)
for sr in [1.0, 1.5, 2.0, 2.5]:
    for trials in [10, 50, 100]:
        min_t = min_backtest_length(sr, trials)
        print(f"{sr:>12.1f} {trials:>10} {min_t:>10} {min_t/252:>10.1f}")`}),e.jsx(C,{title:"Validating a Nifty Options Strategy",difficulty:"advanced",problem:"After testing 30 variations of a weekly iron condor on Nifty (3 years of weekly data = 156 observations), you find the best variant has Sharpe = 1.8, with return skewness = -1.5 and kurtosis = 7. Does it pass the DSR test?",solution:[{step:"Compute expected max SR under null",formula:"E[\\max SR] = \\sqrt{2\\ln 30} \\times \\sqrt{252/156} = 2.61 \\times 1.27 = 3.31",explanation:"Wait -- this is much higher than our observed SR! But this formula assumes daily obs."},{step:"Correct for weekly frequency",formula:"E[\\max SR] = \\sqrt{2\\ln 30} \\times \\sqrt{52/156} = 2.61 \\times 0.577 = 1.51",explanation:"Using 52 weeks/year annualization with 156 weekly observations."},{step:"Compute SE of SR",formula:"SE = \\sqrt{\\frac{1 + 0.25(1.8)^2(7-1) - (-1.5)(1.8)}{156}} \\times \\sqrt{52} = \\sqrt{\\frac{1+4.86+2.7}{156}} \\times 7.2 = 0.53"},{step:"DSR test",formula:"z = \\frac{1.8 - 1.51}{0.53} = 0.55, \\quad p = 0.29",explanation:"p-value of 0.29 is far above 0.05. The strategy FAILS the DSR test. The high kurtosis and negative skewness (typical of iron condors) inflate the SE, and 156 weekly observations is insufficient to achieve significance."}]}),e.jsx(b,{title:"How Many Trials to Count",type:"warning",children:e.jsx("p",{children:"The hardest part of applying DSR is honestly counting the number of trials N. This includes: every parameter combination tested, every filter variation, every entry/exit rule tried, and even strategies you tested and discarded. If you tried 5 strike widths x 3 DTE choices x 4 stop-loss levels x 2 adjustment rules = 120 trials, use N=120. Underestimating N inflates the DSR, giving false confidence. When in doubt, use a larger N to be conservative."})}),e.jsx(b,{title:"DSR for Indian Market Strategies",type:"tip",children:e.jsx("p",{children:`Given India's shorter liquid options history (weekly options only since 2019), achieving DSR significance for weekly strategies is very challenging. With ~250 weekly observations and typical N=20-50 trials, you need annualized Sharpe ratios above 2.5-3.0 to pass. This explains why most retail strategies that appear to "work" in backtests fail live. For robustness, complement DSR with out-of-sample testing on Bank Nifty or Nifty Next 50 as independent validation datasets.`})})]})}const he=Object.freeze(Object.defineProperty({__proto__:null,default:V},Symbol.toStringTag,{value:"Module"}));function W(){const[i,_]=c.useState(1e3),[a,N]=c.useState(20),s=i*a*.001,k=i*a*5e-6,l=s/k;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Vectorized vs Loop Performance"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Compare execution time for backtesting Nifty strategies with different data sizes."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Trading Days = ",i]}),e.jsx("input",{type:"range",min:"100",max:"10000",step:"100",value:i,onChange:x=>_(Number(x.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Parameter Combinations = ",a]}),e.jsx("input",{type:"range",min:"1",max:"200",step:"5",value:a,onChange:x=>N(Number(x.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-3",children:[e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Loop (Python)"}),e.jsxs("div",{className:"text-lg font-bold text-red-600 dark:text-red-400",children:[s.toFixed(1),"s"]})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Vectorized (NumPy)"}),e.jsxs("div",{className:"text-lg font-bold text-green-600 dark:text-green-400",children:[k.toFixed(3),"s"]})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Speedup"}),e.jsxs("div",{className:"text-lg font-bold text-blue-600 dark:text-blue-400",children:[l.toFixed(0),"x"]})]})]})]})}function G(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Vectorized Backtesting with vectorbt"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Vectorized backtesting replaces row-by-row iteration with array operations, achieving 100-1000x speedups over traditional loop-based approaches. The vectorbt library wraps NumPy and pandas operations into a high-level API designed specifically for strategy testing. For scanning thousands of Nifty parameter combinations, vectorization is essential."}),e.jsx(S,{title:"Vectorized Backtesting",label:"Definition 8.5",definition:"Vectorized backtesting computes trading signals, positions, and P&L as operations on entire arrays rather than iterating through each time step. It exploits NumPy's SIMD (Single Instruction Multiple Data) operations for massive parallelism.",notation:"\\text{positions} = f(\\text{signals}), \\quad \\text{pnl} = \\text{positions}[:-1] \\cdot \\text{returns}[1:]"}),e.jsx(t.BlockMath,{math:"\\text{Cumulative Return} = \\prod_{t=1}^{T} (1 + r_t \\cdot w_t) - 1"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The key insight of vectorized backtesting is that most trading rules can be expressed as element-wise or rolling operations on price arrays. For example, a moving average crossover signal is simply a comparison of two rolling means:"}),e.jsx(t.BlockMath,{math:"\\text{signal}_t = \\mathbb{1}\\!\\left[\\frac{1}{n_{\\text{fast}}}\\sum_{i=0}^{n_{\\text{fast}}-1} S_{t-i} > \\frac{1}{n_{\\text{slow}}}\\sum_{i=0}^{n_{\\text{slow}}-1} S_{t-i}\\right]"}),e.jsx(M,{title:"Computational Complexity of Vectorized Backtest",label:"Theorem 8.4",statement:"A vectorized backtest of a signal computed from K rolling statistics on T observations with P parameter combinations runs in O(T \\cdot K \\cdot P) time but with constant factor c_{\\text{vec}} \\approx 10^{-9} per operation (NumPy), compared to c_{\\text{loop}} \\approx 10^{-6} for Python loops. The effective speedup is c_{\\text{loop}}/c_{\\text{vec}} \\approx 1000\\times.",proof:"NumPy operations are implemented in C and leverage CPU vector instructions (SSE, AVX). Each array operation processes data in cache-friendly contiguous memory. The O(T K P) scaling is the same for both approaches, but the constant factor differs by ~3 orders of magnitude due to Python interpreter overhead in the loop case."}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Feature"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"vectorbt"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Loop-based"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Speed"}),e.jsx("td",{className:"px-4 py-2",children:"100-1000x faster"}),e.jsx("td",{className:"px-4 py-2",children:"Baseline"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Parameter scanning"}),e.jsx("td",{className:"px-4 py-2",children:"Native (broadcasting)"}),e.jsx("td",{className:"px-4 py-2",children:"Nested loops"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Memory"}),e.jsx("td",{className:"px-4 py-2",children:"Higher (stores all combos)"}),e.jsx("td",{className:"px-4 py-2",children:"Lower (one at a time)"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Flexibility"}),e.jsx("td",{className:"px-4 py-2",children:"Limited to array ops"}),e.jsx("td",{className:"px-4 py-2",children:"Arbitrary logic"})]})]})]})}),e.jsx(W,{}),e.jsx(T,{title:"vectorized_backtest.py",runnable:!0,code:`import numpy as np
import time

np.random.seed(42)

# Generate synthetic Nifty 50 daily data
n_days = 2520  # 10 years
dates = np.arange(n_days)
nifty = 10000 * np.exp(np.cumsum(
    np.random.normal(0.0004, 0.012, n_days)
))

print("=== Vectorized MA Crossover Backtest on Nifty 50 ===")
print(f"Data: {n_days} trading days")
print(f"Nifty range: {nifty[0]:.0f} to {nifty[-1]:.0f}")

# --- Method 1: Loop-based (slow) ---
def backtest_loop(prices, fast, slow):
    n = len(prices)
    position = 0
    pnl = 0
    for i in range(slow, n):
        fast_ma = np.mean(prices[i-fast:i])
        slow_ma = np.mean(prices[i-slow:i])
        new_position = 1 if fast_ma > slow_ma else -1
        pnl += position * (prices[i] - prices[i-1])
        position = new_position
    return pnl

# --- Method 2: Vectorized (fast) ---
def backtest_vectorized(prices, fast, slow):
    # Compute moving averages using cumulative sum trick
    cumsum = np.cumsum(np.insert(prices, 0, 0))
    fast_ma = (cumsum[fast:] - cumsum[:-fast]) / fast
    slow_ma = (cumsum[slow:] - cumsum[:-slow]) / slow

    # Align arrays
    offset = slow - fast
    fast_ma = fast_ma[offset:]

    # Generate signals
    signal = np.where(fast_ma > slow_ma, 1, -1)

    # Compute returns
    returns = np.diff(prices[slow:]) / prices[slow:-1]
    signal = signal[:-1]  # align with returns

    # P&L
    pnl = np.sum(signal * returns * prices[slow:-1])
    return pnl

# Single comparison
fast, slow = 20, 50
t0 = time.time()
pnl_loop = backtest_loop(nifty, fast, slow)
t_loop = time.time() - t0

t0 = time.time()
pnl_vec = backtest_vectorized(nifty, fast, slow)
t_vec = time.time() - t0

print(f"\\nSingle backtest (MA {fast}/{slow}):")
print(f"  Loop:       {t_loop:.4f}s, PnL = {pnl_loop:,.0f}")
print(f"  Vectorized: {t_vec:.6f}s, PnL = {pnl_vec:,.0f}")
print(f"  Speedup: {t_loop/t_vec:.0f}x")

# Parameter scan: test many combinations
fast_range = np.arange(5, 51, 5)    # 10 values
slow_range = np.arange(20, 201, 10)  # 19 values
print(f"\\nParameter scan: {len(fast_range)} x {len(slow_range)} = "
      f"{len(fast_range)*len(slow_range)} combinations")

t0 = time.time()
results = np.zeros((len(fast_range), len(slow_range)))
for i, fast in enumerate(fast_range):
    for j, slow in enumerate(slow_range):
        if fast < slow:
            results[i, j] = backtest_vectorized(nifty, fast, slow)
t_scan = time.time() - t0

best_idx = np.unravel_index(np.argmax(results), results.shape)
best_fast = fast_range[best_idx[0]]
best_slow = slow_range[best_idx[1]]
best_pnl = results[best_idx]

print(f"  Scan time: {t_scan:.2f}s")
print(f"  Best: MA {best_fast}/{best_slow}, PnL = {best_pnl:,.0f}")

# Compute Sharpe for best
signal = np.where(
    np.convolve(nifty, np.ones(best_fast)/best_fast, 'valid')[best_slow-best_fast:]
    > np.convolve(nifty, np.ones(best_slow)/best_slow, 'valid'), 1, -1)
returns = np.diff(nifty[best_slow:]) / nifty[best_slow:-1]
strat_returns = signal[:-1] * returns
sharpe = np.mean(strat_returns) / np.std(strat_returns) * np.sqrt(252)
print(f"  Sharpe: {sharpe:.2f}")
print(f"\\nWarning: Best of {len(fast_range)*len(slow_range)} combos is likely overfit!")`}),e.jsx(C,{title:"Vectorized RSI Signal for Bank Nifty",difficulty:"beginner",problem:"Implement a vectorized RSI(14) computation for Bank Nifty daily data. RSI below 30 generates a buy signal. Compute the signal array without any Python loops.",solution:[{step:"Compute price changes",formula:"\\Delta P_t = P_t - P_{t-1} \\quad \\text{(np.diff)}"},{step:"Separate gains and losses",formula:"\\text{gains} = \\max(\\Delta P, 0), \\quad \\text{losses} = \\max(-\\Delta P, 0)",explanation:"Use np.maximum(delta, 0) for gains and np.maximum(-delta, 0) for losses."},{step:"Compute rolling averages",formula:"\\text{avg\\_gain} = \\text{rolling\\_mean}(\\text{gains}, 14)",explanation:"Use np.convolve or cumsum trick for O(n) computation."},{step:"RSI and signal",formula:"RS = \\frac{\\text{avg\\_gain}}{\\text{avg\\_loss}}, \\quad RSI = 100 - \\frac{100}{1+RS}",explanation:"Signal array: np.where(RSI < 30, 1, 0). The entire computation is O(n) with zero Python loops."}]}),e.jsx(b,{title:"vectorbt Installation",type:"tip",children:e.jsxs("p",{children:["Install vectorbt via pip: ",e.jsx("code",{className:"bg-gray-100 dark:bg-gray-800 px-1 rounded",children:"pip install vectorbt"}),". For Nifty data, combine with yfinance (",e.jsx("code",{className:"bg-gray-100 dark:bg-gray-800 px-1 rounded",children:"pip install yfinance"}),") using the ticker ^NSEI. vectorbt's Portfolio.from_signals() handles position sizing, commission, and slippage automatically. Use vbt.Param for broadcasting parameter combinations across the entire price array simultaneously."]})}),e.jsx(b,{title:"Limitations of Vectorized Backtesting",type:"warning",children:e.jsx("p",{children:"Vectorized backtesting cannot handle: (1) path-dependent position sizing (e.g., sizing based on current drawdown), (2) complex order types (stop-loss orders that trigger intraday), (3) portfolio-level constraints (sector limits, max positions), (4) realistic execution modeling with partial fills and queue position. For these cases, use event-driven frameworks like Zipline or Backtrader covered in later sections. Use vectorized methods for initial screening and event-driven for final validation."})})]})}const ge=Object.freeze(Object.defineProperty({__proto__:null,default:G},Symbol.toStringTag,{value:"Module"}));function H(){const[i,_]=c.useState("momentum"),[a,N]=c.useState(20),[s,k]=c.useState(0),l=252,x=a*100+s*10+(i==="momentum"?1:2),f=(d=>()=>{let g=d+=1831565813;return g=Math.imul(g^g>>>15,g|1),g^=g+Math.imul(g^g>>>7,g|61),((g^g>>>14)>>>0)/4294967296})(x),m=Array.from({length:l},()=>(f()-.5)*.025),h=[22e3];for(let d=0;d<l;d++)h.push(h[d]*(1+m[d]));let p;i==="momentum"?p=h.map((d,g)=>{if(g<a)return 0;const P=(h[g]-h[g-a])/h[g-a];return P>s/100?1:P<-s/100?-1:0}):p=h.map((d,g)=>{if(g<a)return 0;const P=h.slice(g-a,g).reduce((R,B)=>R+B,0)/a;return h[g]<P*(1-s/100)?1:h[g]>P*(1+s/100)?-1:0});const r=m.map((d,g)=>p[g]*d*22e3*75),u=r.reduce((d,g)=>(d.push((d.length?d[d.length-1]:0)+g),d),[]),y=u[u.length-1],n=r.reduce((d,g)=>d+g,0)/l/(Math.sqrt(r.reduce((d,g)=>d+g*g,0)/l)||1)*Math.sqrt(252),j=480,v=120,I=50,w=Math.max(...u,0),A=Math.min(...u,0),F=d=>v+5-(d-A)/(w-A||1)*v,E=d=>I+d/u.length*(j-I);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: NumPy Backtest Engine"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Run a vectorized backtest with different strategy types and parameters."}),e.jsx("div",{className:"mb-4 flex gap-4",children:["momentum","mean-reversion"].map(d=>e.jsxs("label",{className:"flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300",children:[e.jsx("input",{type:"radio",name:"strat",value:d,checked:i===d,onChange:()=>_(d),className:"accent-indigo-500"}),d.charAt(0).toUpperCase()+d.slice(1)]},d))}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Lookback = ",a," days"]}),e.jsx("input",{type:"range",min:"5",max:"60",step:"1",value:a,onChange:d=>N(Number(d.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Threshold = ",s,"%"]}),e.jsx("input",{type:"range",min:"0",max:"10",step:"0.5",value:s,onChange:d=>k(Number(d.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:`0 0 ${j+20} ${v+30}`,className:"w-full max-w-2xl mx-auto block","aria-label":"Equity curve",children:[e.jsx("line",{x1:I,y1:F(0),x2:j+10,y2:F(0),stroke:"#9ca3af",strokeWidth:"1",strokeDasharray:"3"}),e.jsx("polyline",{points:u.map((d,g)=>`${E(g)},${F(d)}`).join(" "),fill:"none",stroke:y>0?"#10b981":"#ef4444",strokeWidth:"2"})]}),e.jsxs("div",{className:"mt-3 grid grid-cols-3 gap-3",children:[e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Total P&L"}),e.jsxs("div",{className:`text-lg font-bold ${y>0?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}`,children:["INR ",(y/1e3).toFixed(0),"K"]})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Sharpe"}),e.jsx("div",{className:"text-lg font-bold text-blue-600 dark:text-blue-400",children:n.toFixed(2)})]}),e.jsxs("div",{className:"rounded-lg border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Win Rate"}),e.jsxs("div",{className:"text-lg font-bold text-purple-600 dark:text-purple-400",children:[(r.filter(d=>d>0).length/r.filter(d=>d!==0).length*100||0).toFixed(0),"%"]})]})]})]})}function U(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Building a NumPy Backtest Engine"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"A custom NumPy backtest engine gives you full control over the backtesting pipeline while maintaining near-C performance. This section builds a production-quality vectorized engine from scratch, designed for testing systematic strategies on NSE data including Nifty 50, Bank Nifty, and individual F&O stocks."}),e.jsx(S,{title:"Vectorized Position Array",label:"Definition 8.6",definition:"In a vectorized backtest, positions are stored as a 1D array of the same length as the price series. Each element represents the position size (positive for long, negative for short, zero for flat) at that timestamp. P&L is computed as the element-wise product of lagged positions and returns.",notation:"\\text{pnl}_t = w_{t-1} \\cdot r_t, \\quad r_t = \\frac{P_t - P_{t-1}}{P_{t-1}}"}),e.jsx(t.BlockMath,{math:"\\text{equity}_T = \\text{equity}_0 \\times \\prod_{t=1}^{T} \\left(1 + w_{t-1} \\cdot r_t\\right)"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Engine Architecture"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Our NumPy engine consists of four pure-array functions with zero Python loops:"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Function"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Input"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Output"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Complexity"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"compute_indicators"}),e.jsx("td",{className:"px-4 py-2",children:"prices"}),e.jsx("td",{className:"px-4 py-2",children:"indicator arrays"}),e.jsx("td",{className:"px-4 py-2",children:"O(T x K)"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"generate_signals"}),e.jsx("td",{className:"px-4 py-2",children:"indicators, params"}),e.jsxs("td",{className:"px-4 py-2",children:["signal array ",1]}),e.jsx("td",{className:"px-4 py-2",children:"O(T)"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"compute_positions"}),e.jsx("td",{className:"px-4 py-2",children:"signals, sizing rules"}),e.jsx("td",{className:"px-4 py-2",children:"position array"}),e.jsx("td",{className:"px-4 py-2",children:"O(T)"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"compute_pnl"}),e.jsx("td",{className:"px-4 py-2",children:"positions, returns"}),e.jsx("td",{className:"px-4 py-2",children:"P&L, metrics"}),e.jsx("td",{className:"px-4 py-2",children:"O(T)"})]})]})]})}),e.jsx(M,{title:"Correct Position Alignment",label:"Theorem 8.5",statement:"To avoid look-ahead bias in vectorized backtesting, the position at time t must be determined by information available at or before time t, and the P&L from that position accrues at time t+1. Mathematically: \\text{pnl}_{t+1} = w_t \\cdot r_{t+1} = w_t \\cdot (P_{t+1} - P_t)/P_t. Using w_t \\cdot r_t introduces look-ahead bias equivalent to 1 bar.",proof:"If w_t depends on P_t (e.g., w_t = f(P_1, ..., P_t)), then w_t is known at time t. The return r_{t+1} = (P_{t+1} - P_t)/P_t is earned between t and t+1. Therefore w_t \\cdot r_{t+1} correctly represents the P&L. Using r_t would require knowing P_t at time t-1 when deciding w_t, which is look-ahead."}),e.jsx(H,{}),e.jsx(T,{title:"numpy_backtest_engine.py",runnable:!0,code:`import numpy as np
import time

np.random.seed(42)

class NumpyBacktester:
    """Production-quality vectorized backtesting engine."""

    def __init__(self, prices, lot_size=75, commission_per_trade=20,
                 slippage_pct=0.0001):
        self.prices = prices
        self.returns = np.diff(prices) / prices[:-1]
        self.lot_size = lot_size
        self.commission = commission_per_trade
        self.slippage = slippage_pct
        self.n = len(prices)

    def rolling_mean(self, data, window):
        """Fast rolling mean using cumsum."""
        cumsum = np.cumsum(np.insert(data, 0, 0))
        return (cumsum[window:] - cumsum[:-window]) / window

    def rolling_std(self, data, window):
        """Rolling standard deviation."""
        mean = self.rolling_mean(data, window)
        sq_mean = self.rolling_mean(data**2, window)
        return np.sqrt(np.maximum(sq_mean - mean**2, 0))

    def momentum_signal(self, lookback=20, threshold=0):
        """Momentum signal: long if return > threshold."""
        ret = (self.prices[lookback:] - self.prices[:-lookback]) / self.prices[:-lookback]
        signal = np.zeros(self.n)
        signal[lookback:] = np.where(ret > threshold, 1,
                           np.where(ret < -threshold, -1, 0))
        return signal

    def mean_reversion_signal(self, window=20, z_thresh=1.5):
        """Mean reversion: long when price below MA - z*std."""
        ma = np.zeros(self.n)
        std = np.zeros(self.n)
        ma[window:] = self.rolling_mean(self.prices, window)
        std[window:] = self.rolling_std(self.prices, window)

        z_score = np.zeros(self.n)
        valid = std > 0
        z_score[valid] = (self.prices[valid] - ma[valid]) / std[valid]

        signal = np.where(z_score < -z_thresh, 1,
                 np.where(z_score > z_thresh, -1, 0))
        signal[:window] = 0
        return signal

    def compute_pnl(self, signal):
        """Compute P&L from signal array with costs."""
        # Position is signal shifted by 1 (trade on next bar)
        positions = signal[:-1]

        # Raw P&L
        raw_pnl = positions * self.returns * self.prices[:-1] * self.lot_size

        # Transaction costs (on position changes)
        trades = np.abs(np.diff(np.insert(positions, 0, 0)))
        costs = trades * (self.commission + self.prices[:-1] * self.slippage * self.lot_size)

        net_pnl = raw_pnl - costs
        return net_pnl, positions, trades

    def compute_metrics(self, pnl):
        """Compute performance metrics."""
        cum_pnl = np.cumsum(pnl)
        running_max = np.maximum.accumulate(cum_pnl)
        drawdown = cum_pnl - running_max

        total = cum_pnl[-1]
        sharpe = np.mean(pnl) / np.std(pnl) * np.sqrt(252) if np.std(pnl) > 0 else 0
        max_dd = drawdown.min()
        win_rate = (pnl[pnl != 0] > 0).mean() * 100 if (pnl != 0).any() else 0
        n_trades = int(np.sum(np.abs(np.diff(np.sign(pnl))) > 0) / 2)

        return {
            'total_pnl': total, 'sharpe': sharpe, 'max_dd': max_dd,
            'win_rate': win_rate, 'n_trades': n_trades
        }

# Generate 10 years of Nifty-like data
n_days = 2520
nifty = 10000 * np.exp(np.cumsum(np.random.normal(0.0004, 0.012, n_days)))

bt = NumpyBacktester(nifty, lot_size=75)

# Test multiple strategies
print("=== NumPy Backtest Engine: Nifty 50 ===")
print(f"Data: {n_days} days, Price: {nifty[0]:.0f} -> {nifty[-1]:.0f}")

# Momentum scan
print(f"\\n--- Momentum Strategy Scan ---")
print(f"{'Lookback':>10} {'Threshold':>10} {'Sharpe':>8} {'Total PnL':>12} {'Win%':>6}")
print("-" * 50)

t0 = time.time()
best_sharpe = -np.inf
for lb in [10, 20, 40, 60]:
    for th in [0, 0.01, 0.02, 0.05]:
        signal = bt.momentum_signal(lb, th)
        pnl, _, _ = bt.compute_pnl(signal)
        metrics = bt.compute_metrics(pnl)
        if metrics['sharpe'] > best_sharpe:
            best_sharpe = metrics['sharpe']
            best_params = (lb, th)
        print(f"{lb:>10} {th:>10.2%} {metrics['sharpe']:>8.2f} "
              f"{metrics['total_pnl']:>12,.0f} {metrics['win_rate']:>5.1f}%")

scan_time = time.time() - t0
print(f"\\nScan time: {scan_time:.3f}s ({4*4} combinations)")
print(f"Best: lookback={best_params[0]}, threshold={best_params[1]:.2%}, "
      f"Sharpe={best_sharpe:.2f}")

# Mean reversion
print(f"\\n--- Mean Reversion (window=20, z=1.5) ---")
signal = bt.mean_reversion_signal(20, 1.5)
pnl, _, trades = bt.compute_pnl(signal)
metrics = bt.compute_metrics(pnl)
print(f"Sharpe: {metrics['sharpe']:.2f} | PnL: {metrics['total_pnl']:,.0f}")
print(f"Trades: {trades.sum():.0f} | MaxDD: {metrics['max_dd']:,.0f}")`}),e.jsx(C,{title:"Vectorized Bollinger Band Strategy",difficulty:"intermediate",problem:"Implement a Bollinger Band (20, 2) mean-reversion strategy on Nifty in pure NumPy. Buy when price touches the lower band, sell when it touches the upper band. No Python loops allowed.",solution:[{step:"Compute rolling statistics",formula:"MA_{20} = \\text{rolling\\_mean}(P, 20), \\quad \\sigma_{20} = \\text{rolling\\_std}(P, 20)"},{step:"Compute bands",formula:"\\text{upper} = MA + 2\\sigma, \\quad \\text{lower} = MA - 2\\sigma"},{step:"Generate signals (vectorized)",formula:"\\text{signal} = \\text{np.where}(P < \\text{lower}, 1, \\text{np.where}(P > \\text{upper}, -1, \\text{np.nan}))"},{step:"Forward-fill positions",formula:"\\text{positions} = \\text{pd.Series(signal).ffill().fillna(0).values}",explanation:"Forward-fill NaN values to maintain position until the opposite signal fires. Then compute PnL as positions[:-1] * returns[1:]."}]}),e.jsx(b,{title:"Memory Optimization",type:"tip",children:e.jsx("p",{children:"When scanning thousands of parameter combinations on Nifty data, memory becomes a bottleneck. Use float32 instead of float64 to halve memory usage. Process parameter batches using NumPy broadcasting: create a 2D array of shape (T, P) where P is the number of parameter combinations, and compute all signals simultaneously. For 10 years of daily data with 1000 combinations, this requires about 20 MB in float32."})}),e.jsx(b,{title:"Numba JIT for Complex Logic",type:"warning",children:e.jsx("p",{children:"When strategy logic requires path-dependent decisions that cannot be expressed as array operations (e.g., trailing stops, position-dependent sizing), use Numba's @jit(nopython=True) decorator. Numba compiles Python loops to machine code, achieving C-like performance. Example: a trailing stop-loss requires tracking the highest price since entry, which is inherently sequential but runs at C speed with Numba."})})]})}const ue=Object.freeze(Object.defineProperty({__proto__:null,default:U},Symbol.toStringTag,{value:"Module"}));function K(){const[i,_]=c.useState("market_open"),[a,N]=c.useState(5),[s,k]=c.useState("next_bar"),l=[{type:"market_open",time:"09:15",desc:"NSE opens, pre-market data available"},{type:"data_bar",time:"09:16",desc:"First 1-min candle received"},{type:"signal",time:"09:16+"+a+"ms",desc:"Strategy computes signal"},{type:"order",time:"09:16+"+(a+2)+"ms",desc:"Order submitted to exchange"},{type:"fill",time:s==="next_bar"?"09:17":"09:16+"+(a+50)+"ms",desc:s==="next_bar"?"Fill at next bar open":"Fill with simulated slippage"}];return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Event-Driven Execution Timeline"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Visualize the event flow in a Zipline-style backtest for NSE trading."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Processing Latency = ",a,"ms"]}),e.jsx("input",{type:"range",min:"1",max:"100",step:"1",value:a,onChange:x=>N(Number(x.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("div",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsx("span",{children:"Fill Model"}),e.jsx("div",{className:"flex gap-3",children:["next_bar","simulated"].map(x=>e.jsxs("label",{className:"flex items-center gap-1 text-xs",children:[e.jsx("input",{type:"radio",name:"fill",value:x,checked:s===x,onChange:()=>k(x),className:"accent-indigo-500"}),x==="next_bar"?"Next Bar Open":"Simulated Fill"]},x))})]})]}),e.jsx("div",{className:"space-y-2",children:l.map((x,o)=>e.jsxs("div",{className:"flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-2 dark:border-gray-700 dark:bg-gray-800",children:[e.jsx("div",{className:"flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",children:o+1}),e.jsxs("div",{className:"flex-1",children:[e.jsx("div",{className:"text-xs font-bold text-gray-800 dark:text-gray-200",children:x.type}),e.jsx("div",{className:"text-[10px] text-gray-500",children:x.desc})]}),e.jsx("div",{className:"text-xs font-mono text-gray-600 dark:text-gray-400",children:x.time})]},o))})]})}function Z(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Event-Driven Backtesting with Zipline"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Event-driven backtesting processes market data one event at a time, closely mimicking live trading execution. Zipline-reloaded (the maintained fork of Quantopian's Zipline) provides a robust framework with realistic order management, slippage modeling, and commission tracking. While slower than vectorized methods, it handles complex strategies that require path-dependent logic."}),e.jsx(S,{title:"Event-Driven Backtesting",label:"Definition 8.7",definition:"Event-driven backtesting processes a stream of events (market data updates, order fills, timer events) sequentially. At each event, the strategy logic executes with only the information available at that point in time, preventing look-ahead bias by construction.",notation:"\\text{for each event } e_t: \\quad \\text{state}_{t+1} = f(\\text{state}_t, e_t)"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Zipline Architecture"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Component"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Function"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"NSE Adaptation"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"initialize()"}),e.jsx("td",{className:"px-4 py-2",children:"One-time setup"}),e.jsx("td",{className:"px-4 py-2",children:"Set universe, params, commission"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"handle_data()"}),e.jsx("td",{className:"px-4 py-2",children:"Called each bar"}),e.jsx("td",{className:"px-4 py-2",children:"Process Nifty bar, generate signals"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"before_trading_start()"}),e.jsx("td",{className:"px-4 py-2",children:"Pre-market logic"}),e.jsx("td",{className:"px-4 py-2",children:"Check NSE pre-open data"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Slippage/Commission"}),e.jsx("td",{className:"px-4 py-2",children:"Execution modeling"}),e.jsx("td",{className:"px-4 py-2",children:"NSE lot sizes, STT, Zerodha fees"})]})]})]})}),e.jsx(M,{title:"Event-Driven vs Vectorized Equivalence",label:"Theorem 8.6",statement:"For strategies that depend only on past prices and have fixed position sizing (no path-dependent logic), the event-driven and vectorized backtests produce identical P&L trajectories, up to floating-point precision. The event-driven framework adds overhead but guarantees causality.",proof:"Both approaches compute positions as a function of the same historical data and apply the same P&L formula: pnl_t = w_{t-1} \\cdot r_t. The event-driven framework evaluates w_{t-1} = f(data_1, ..., data_{t-1}) explicitly at each t, while the vectorized approach computes the entire w array in one pass. Since f is deterministic and the data is identical, the outputs match."}),e.jsx(K,{}),e.jsx(T,{title:"zipline_nifty_strategy.py",runnable:!0,code:`import numpy as np

# Simulated Zipline-style event-driven backtest
# (Using pure Python to demonstrate the pattern without Zipline dependency)

class SimulatedExchange:
    """Mimics Zipline's execution engine for NSE."""
    def __init__(self, prices, lot_size=75, commission=20, slippage_bps=2):
        self.prices = prices
        self.lot_size = lot_size
        self.commission = commission
        self.slippage_bps = slippage_bps

    def fill_order(self, day, quantity):
        """Simulate order fill with slippage."""
        price = self.prices[day]
        slip = price * self.slippage_bps / 10000 * np.sign(quantity)
        fill_price = price + slip
        cost = abs(quantity) * self.commission / self.lot_size
        return fill_price, cost

class ZiplineStyleBacktest:
    """Event-driven backtest mimicking Zipline's API."""

    def __init__(self, prices, strategy_func, **kwargs):
        self.prices = prices
        self.strategy = strategy_func
        self.exchange = SimulatedExchange(prices, **kwargs)
        self.n_days = len(prices)

        # State
        self.position = 0
        self.cash = 1000000  # INR 10 lakh
        self.equity_curve = []
        self.trades = []

    def run(self):
        context = {'position': 0, 'history': [], 'params': {}}
        self.strategy('initialize', context, None, None)

        for day in range(self.n_days):
            price = self.prices[day]
            context['history'].append(price)
            context['position'] = self.position
            context['day'] = day

            # Call strategy
            target = self.strategy('handle_data', context, price, day)

            # Execute orders
            if target is not None and target != self.position:
                qty_change = target - self.position
                fill_price, cost = self.exchange.fill_order(day, qty_change)

                self.cash -= qty_change * fill_price * self.exchange.lot_size
                self.cash -= cost
                self.position = target

                self.trades.append({
                    'day': day, 'price': fill_price, 'qty': qty_change,
                    'cost': cost, 'position': self.position
                })

            # Mark to market
            portfolio_value = self.cash + self.position * price * self.exchange.lot_size
            self.equity_curve.append(portfolio_value)

        return np.array(self.equity_curve)

# Define strategy (Zipline-style)
def momentum_strategy(event, context, price, day):
    if event == 'initialize':
        context['params'] = {'lookback': 20, 'threshold': 0.02}
        return None

    if event == 'handle_data':
        lookback = context['params']['lookback']
        history = context['history']

        if len(history) < lookback + 1:
            return None

        # Momentum signal
        past_price = history[-lookback - 1]
        momentum = (price - past_price) / past_price

        if momentum > context['params']['threshold']:
            return 1   # Long 1 lot
        elif momentum < -context['params']['threshold']:
            return -1  # Short 1 lot
        return context['position']  # Hold

# Generate Nifty data and run
np.random.seed(42)
n_days = 1260
nifty = 18000 * np.exp(np.cumsum(np.random.normal(0.0004, 0.012, n_days)))

bt = ZiplineStyleBacktest(nifty, momentum_strategy)
equity = bt.run()

# Performance analysis
returns = np.diff(equity) / equity[:-1]
sharpe = np.mean(returns) / np.std(returns) * np.sqrt(252)
max_dd = np.min(equity / np.maximum.accumulate(equity) - 1)
total_return = (equity[-1] / equity[0] - 1) * 100

print("=== Event-Driven Backtest: Nifty Momentum ===")
print(f"Period: {n_days} trading days (~{n_days/252:.0f} years)")
print(f"Initial Capital: INR {equity[0]:,.0f}")
print(f"Final Capital:   INR {equity[-1]:,.0f}")
print(f"Total Return:    {total_return:+.1f}%")
print(f"Sharpe Ratio:    {sharpe:.2f}")
print(f"Max Drawdown:    {max_dd*100:.1f}%")
print(f"Total Trades:    {len(bt.trades)}")

# Trade log (last 10)
print(f"\\n--- Last 10 Trades ---")
print(f"{'Day':>5} {'Price':>10} {'Qty':>6} {'Cost':>8} {'Position':>10}")
for t in bt.trades[-10:]:
    print(f"{t['day']:>5} {t['price']:>10.1f} {t['qty']:>+6} "
          f"{t['cost']:>8.1f} {t['position']:>10}")`}),e.jsx(C,{title:"Implementing NSE Commission in Zipline",difficulty:"intermediate",problem:"Configure realistic NSE trading costs in a Zipline backtest. Zerodha charges: INR 20 per order (or 0.03% whichever is lower for equity), STT 0.1% on buy+sell for delivery, exchange charges 0.00345%. Calculate total round-trip cost for buying and selling 1 lot of Nifty futures at 22000.",solution:[{step:"Brokerage (both legs)",formula:"2 \\times 20 = \\text{INR } 40"},{step:"STT (on sell side only for futures)",formula:"0.0001 \\times 22000 \\times 75 = \\text{INR } 165"},{step:"Exchange charges",formula:"0.0000345 \\times 22000 \\times 75 \\times 2 = \\text{INR } 113.85"},{step:"Total round-trip cost",formula:"40 + 165 + 113.85 \\approx \\text{INR } 319",explanation:"This is about 0.019% of notional (22000 x 75 = INR 16.5 lakh). Your backtest must deduct this from every round trip."}]}),e.jsx(b,{title:"Zipline-reloaded for Indian Markets",type:"tip",children:e.jsxs("p",{children:["To use Zipline with NSE data: (1) install via ",e.jsx("code",{className:"bg-gray-100 dark:bg-gray-800 px-1 rounded",children:"pip install zipline-reloaded"}),", (2) create a custom data bundle for NSE using the csvdir ingester, (3) define a custom TradingCalendar for NSE holidays (XNSE), (4) implement a custom commission model matching Zerodha/broker fees. The zipline-tej package provides some India-specific adapters. For Nifty futures data, export from Zerodha Kite historical API or use NSE bhavcopy archives."]})}),e.jsx(b,{title:"When to Use Event-Driven",type:"warning",children:e.jsx("p",{children:"Use event-driven backtesting when: (1) your strategy uses stop-loss or take-profit orders that can trigger intraday, (2) position sizing depends on current P&L or drawdown, (3) you trade multiple instruments with cross-asset dependencies, (4) you need realistic execution simulation (partial fills, order queue), or (5) you plan to deploy the same code in live trading. For simple signal-based strategies, vectorized backtesting is faster and sufficient."})})]})}const fe=Object.freeze(Object.defineProperty({__proto__:null,default:Z},Symbol.toStringTag,{value:"Module"}));function J(){const[i,_]=c.useState(.05),[a,N]=c.useState(.02),[s,k]=c.useState(1e6),[l,x]=c.useState(20),[o,f]=c.useState(50),m=18.5,h=i*2*52,p=a*2*52,r=m-h-p,u=s*(1+r/100),y=r/14.2;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Backtrader Cost Impact Simulator"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust commission, slippage, and SMA crossover parameters to see how transaction costs erode alpha on a Nifty 50 SMA crossover strategy."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Commission (%) = ",i.toFixed(2)]}),e.jsx("input",{type:"range",min:"0",max:"0.2",step:"0.01",value:i,onChange:n=>_(parseFloat(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Slippage (%) = ",a.toFixed(2)]}),e.jsx("input",{type:"range",min:"0",max:"0.1",step:"0.005",value:a,onChange:n=>N(parseFloat(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Initial Capital (INR) = ",s.toLocaleString("en-IN")]}),e.jsx("input",{type:"range",min:"100000",max:"10000000",step:"100000",value:s,onChange:n=>k(parseFloat(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Fast SMA = ",l," days"]}),e.jsx("input",{type:"range",min:"5",max:"30",step:"1",value:l,onChange:n=>x(parseInt(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Slow SMA = ",o," days"]}),e.jsx("input",{type:"range",min:"30",max:"200",step:"5",value:o,onChange:n=>f(parseInt(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 520 200",className:"w-full max-w-xl mx-auto block","aria-label":"Cost impact waterfall",children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:"btGrad",x1:"0",y1:"0",x2:"0",y2:"1",children:[e.jsx("stop",{offset:"0%",stopColor:"#6366f1",stopOpacity:"0.8"}),e.jsx("stop",{offset:"100%",stopColor:"#6366f1",stopOpacity:"0.3"})]})}),e.jsx("rect",{x:"40",y:180-m*7,width:"80",height:m*7,fill:"url(#btGrad)",rx:"4"}),e.jsxs("text",{x:"80",y:175-m*7,textAnchor:"middle",className:"text-[10px] font-bold",fill:"#4338ca",children:[m.toFixed(1),"%"]}),e.jsx("text",{x:"80",y:"196",textAnchor:"middle",className:"text-[9px]",fill:"#6b7280",children:"Gross"}),e.jsx("rect",{x:"160",y:180-h*7,width:"80",height:h*7,fill:"#ef4444",rx:"4",opacity:"0.7"}),e.jsxs("text",{x:"200",y:175-h*7,textAnchor:"middle",className:"text-[10px] font-bold",fill:"#dc2626",children:["-",h.toFixed(1),"%"]}),e.jsx("text",{x:"200",y:"196",textAnchor:"middle",className:"text-[9px]",fill:"#6b7280",children:"Commission"}),e.jsx("rect",{x:"280",y:180-p*7,width:"80",height:p*7,fill:"#f59e0b",rx:"4",opacity:"0.7"}),e.jsxs("text",{x:"320",y:175-p*7,textAnchor:"middle",className:"text-[10px] font-bold",fill:"#d97706",children:["-",p.toFixed(1),"%"]}),e.jsx("text",{x:"320",y:"196",textAnchor:"middle",className:"text-[9px]",fill:"#6b7280",children:"Slippage"}),e.jsx("rect",{x:"400",y:180-Math.max(r,0)*7,width:"80",height:Math.max(r,0)*7,fill:r>0?"#22c55e":"#ef4444",rx:"4",opacity:"0.7"}),e.jsxs("text",{x:"440",y:175-Math.max(r,0)*7,textAnchor:"middle",className:"text-[10px] font-bold",fill:r>0?"#16a34a":"#dc2626",children:[r.toFixed(1),"%"]}),e.jsx("text",{x:"440",y:"196",textAnchor:"middle",className:"text-[9px]",fill:"#6b7280",children:"Net"}),e.jsx("line",{x1:"30",y1:"180",x2:"490",y2:"180",stroke:"#9ca3af",strokeWidth:"1"})]}),e.jsxs("div",{className:"mt-3 grid grid-cols-2 gap-2 text-center text-sm",children:[e.jsxs("div",{className:"rounded bg-gray-50 p-2 dark:bg-gray-800",children:[e.jsx("span",{className:"text-gray-500 dark:text-gray-400",children:"Final Capital: "}),e.jsxs("span",{className:"font-bold text-indigo-600 dark:text-indigo-400",children:["INR ",u.toLocaleString("en-IN",{maximumFractionDigits:0})]})]}),e.jsxs("div",{className:"rounded bg-gray-50 p-2 dark:bg-gray-800",children:[e.jsx("span",{className:"text-gray-500 dark:text-gray-400",children:"Sharpe (approx): "}),e.jsx("span",{className:`font-bold ${y>1?"text-green-600 dark:text-green-400":"text-red-500"}`,children:y.toFixed(2)})]})]})]})}function Y(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Backtrader for Indian Markets"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Backtrader is a popular open-source Python framework for event-driven backtesting. Its flexible architecture supports multiple data feeds, custom indicators, position sizing, and realistic brokerage simulation -- making it well-suited for strategies on NSE and BSE instruments with Indian market conventions like T+1 settlement, STT, and SEBI margin requirements."}),e.jsx(S,{title:"Event-Driven Backtesting",label:"Definition 8.3",definition:"An event-driven backtester processes market data one event (bar or tick) at a time, maintaining a realistic simulation of order submission, execution, and portfolio state. Unlike vectorized backtesting, it naturally handles position-dependent logic, partial fills, and realistic commission structures.",notation:e.jsxs(e.Fragment,{children:["The core loop processes events ",e.jsx(t.InlineMath,{math:"e_t"})," sequentially: ",e.jsx(t.InlineMath,{math:"S_{t+1} = T(S_t, e_t)"})," where ",e.jsx(t.InlineMath,{math:"S_t"})," is the full system state and ",e.jsx(t.InlineMath,{math:"T"})," is the transition function."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Backtrader Architecture"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The framework centres on ",e.jsx("strong",{children:"Cerebro"})," (the engine), which orchestrates data feeds, strategies, brokers, and analyzers. The key components are:"]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Component"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Role"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Indian Market Note"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2 font-mono text-xs",children:"Cerebro"}),e.jsx("td",{className:"px-5 py-2",children:"Orchestrator engine"}),e.jsx("td",{className:"px-5 py-2",children:"Set timezone to Asia/Kolkata"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2 font-mono text-xs",children:"DataFeed"}),e.jsx("td",{className:"px-5 py-2",children:"OHLCV data source"}),e.jsx("td",{className:"px-5 py-2",children:"Use NSEPython / Jugaad-data"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2 font-mono text-xs",children:"Strategy"}),e.jsx("td",{className:"px-5 py-2",children:"Trading logic"}),e.jsx("td",{className:"px-5 py-2",children:"Handle 9:15-15:30 IST session"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2 font-mono text-xs",children:"Broker"}),e.jsx("td",{className:"px-5 py-2",children:"Order execution"}),e.jsx("td",{className:"px-5 py-2",children:"STT + SEBI charges"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-5 py-2 font-mono text-xs",children:"Analyzer"}),e.jsx("td",{className:"px-5 py-2",children:"Performance metrics"}),e.jsx("td",{className:"px-5 py-2",children:"INR-denominated returns"})]})]})]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Transaction Cost Modeling for India"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Indian equity markets have a multi-layered cost structure. The total round-trip cost for a delivery trade can be modelled as:"}),e.jsx(t.BlockMath,{math:"C_{\\text{total}} = C_{\\text{brokerage}} + C_{\\text{STT}} + C_{\\text{SEBI}} + C_{\\text{stamp}} + C_{\\text{GST}} + C_{\\text{slippage}}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For an intraday trade on NSE, the Securities Transaction Tax (STT) is 0.025% on sell side, SEBI turnover fee is 0.0001%, stamp duty varies by state (typically 0.003%), and GST at 18% applies on brokerage and transaction charges."}),e.jsx(t.BlockMath,{math:"\\text{Effective Cost} \\approx 2 \\times \\left(\\text{brokerage} + \\frac{\\text{STT}}{2}\\right) + \\text{stamp} + \\text{slippage}"}),e.jsx(M,{title:"Break-Even Frequency Theorem",label:"Theorem 8.2",statement:e.jsxs(e.Fragment,{children:["For a strategy with per-trade cost ",e.jsx(t.InlineMath,{math:"c"})," and average per-trade return ",e.jsx(t.InlineMath,{math:"\\mu"}),", the minimum number of winning trades per year to be profitable is:"]}),formula:"N_{\\min} = \\frac{c \\cdot N_{\\text{total}}}{\\mu - c}",proof:"Setting net annual return to zero: N_total * (mu - c) = 0 requires mu > c. The break-even frequency follows from requiring total profits to exceed total costs across all N_total trades, giving the stated bound when win-rate is factored in."}),e.jsx(J,{}),e.jsx(b,{title:"NSE Data Integration",type:"tip",children:e.jsxs("p",{children:["For Indian market data in Backtrader, use ",e.jsx("strong",{children:"jugaad-data"})," for historical NSE/BSE OHLCV, ",e.jsx("strong",{children:"nsepython"})," for live quotes and option chains, or ",e.jsx("strong",{children:"Kite Connect API"})," (Zerodha) for real-time feeds. Always adjust for NSE holidays using the ",e.jsx("code",{children:"exchange_calendars"})," ","package with the XNSE calendar."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Nifty 50 SMA Crossover in Backtrader"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Below is a complete Backtrader strategy implementing an SMA crossover on Nifty 50, with realistic Indian brokerage costs (Zerodha-style flat fee):"}),e.jsx(T,{title:"backtrader_nifty_sma.py",runnable:!0,code:`import backtrader as bt
import datetime

class NiftySMACrossover(bt.Strategy):
    """SMA crossover strategy for Nifty 50 / NSE stocks."""
    params = (
        ('fast_period', 20),
        ('slow_period', 50),
        ('stake', 10),           # Lot size
        ('printlog', True),
    )

    def __init__(self):
        self.sma_fast = bt.indicators.SMA(
            self.data.close, period=self.params.fast_period
        )
        self.sma_slow = bt.indicators.SMA(
            self.data.close, period=self.params.slow_period
        )
        self.crossover = bt.indicators.CrossOver(
            self.sma_fast, self.sma_slow
        )
        self.order = None

    def next(self):
        if self.order:
            return  # Pending order exists

        if not self.position:
            if self.crossover > 0:
                # Golden cross: buy
                self.order = self.buy(size=self.params.stake)
        else:
            if self.crossover < 0:
                # Death cross: sell
                self.order = self.sell(size=self.params.stake)

    def notify_trade(self, trade):
        if trade.isclosed and self.params.printlog:
            print(f"TRADE P&L: Gross={trade.pnl:.2f}, "
                  f"Net={trade.pnlcomm:.2f} INR")

# --- Setup Cerebro ---
cerebro = bt.Cerebro()
cerebro.addstrategy(NiftySMACrossover)

# Indian brokerage: Zerodha-style flat Rs 20 per order
cerebro.broker.setcommission(
    commission=20,        # Flat fee per order (INR)
    commtype=bt.CommInfoBase.COMM_FIXED,
    stocklike=True,
)
cerebro.broker.set_slippage_fixed(0.5)   # 50 paise slippage
cerebro.broker.setcash(1_000_000)        # INR 10 lakh

# Load Nifty 50 data (example with GenericCSV)
# data = bt.feeds.GenericCSVData(
#     dataname='nifty50_2020_2024.csv',
#     dtformat='%Y-%m-%d',
#     datetime=0, open=1, high=2, low=3, close=4, volume=5,
#     openinterest=-1,
# )
# cerebro.adddata(data)

# Add analyzers
cerebro.addanalyzer(bt.analyzers.SharpeRatio,
    _name='sharpe', riskfreerate=0.065)  # RBI repo rate approx
cerebro.addanalyzer(bt.analyzers.DrawDown, _name='drawdown')
cerebro.addanalyzer(bt.analyzers.TradeAnalyzer, _name='trades')

print("Backtrader Nifty SMA Crossover configured.")
print(f"Initial capital: INR {cerebro.broker.getvalue():,.0f}")
print(f"Commission: Flat INR 20/order (Zerodha-style)")
print(f"Slippage: 0.50 INR fixed")
print(f"Risk-free rate: 6.5% (RBI repo)")
# results = cerebro.run()
# cerebro.plot()
print("Ready to run with NSE data feed.")`}),e.jsx(C,{title:"Computing Break-Even for a Nifty Strategy",difficulty:"intermediate",problem:"A Nifty 50 swing trading strategy has average per-trade return of 0.8%, brokerage of INR 20 (flat), average trade size of INR 200,000, and STT of 0.025% on sell. How many trades per year must be profitable to break even?",solution:[{step:"Calculate per-trade cost as percentage",formula:"c = \\frac{20 + 20}{200000} + 0.00025 = 0.0002 + 0.00025 = 0.00045 = 0.045\\%",explanation:"Round-trip brokerage (INR 40) as fraction of trade size, plus STT on sell side."},{step:"Compute break-even condition",formula:"\\mu > c \\implies 0.8\\% > 0.045\\%",explanation:"Average return exceeds cost, so the strategy is viable if win rate is sufficient."},{step:"Find minimum profitable trades",formula:"N_{\\min} = \\frac{0.00045 \\times 100}{0.008 - 0.00045} \\approx 6 \\text{ trades/year}",explanation:"With 100 total trades, at least 6 must be net-profitable to cover total costs."}]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Alternative Frameworks for Indian Markets"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Framework"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Type"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Indian Data"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Best For"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Backtrader"}),e.jsx("td",{className:"px-4 py-2",children:"Event-driven"}),e.jsx("td",{className:"px-4 py-2",children:"Via custom feed"}),e.jsx("td",{className:"px-4 py-2",children:"Strategy prototyping"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Zipline-Reloaded"}),e.jsx("td",{className:"px-4 py-2",children:"Event-driven"}),e.jsx("td",{className:"px-4 py-2",children:"Via bundles"}),e.jsx("td",{className:"px-4 py-2",children:"Pipeline API / factors"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"VectorBT"}),e.jsx("td",{className:"px-4 py-2",children:"Vectorized"}),e.jsx("td",{className:"px-4 py-2",children:"Any DataFrame"}),e.jsx("td",{className:"px-4 py-2",children:"Fast parameter sweeps"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"QSTrader"}),e.jsx("td",{className:"px-4 py-2",children:"Event-driven"}),e.jsx("td",{className:"px-4 py-2",children:"CSV feeds"}),e.jsx("td",{className:"px-4 py-2",children:"Institutional-grade"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Custom (Python)"}),e.jsx("td",{className:"px-4 py-2",children:"Event-driven"}),e.jsx("td",{className:"px-4 py-2",children:"Native"}),e.jsx("td",{className:"px-4 py-2",children:"Full control"})]})]})]})}),e.jsx(b,{title:"Indian Broker Integration",type:"historical",children:e.jsxs("ul",{className:"space-y-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Zerodha Kite Connect:"})," Most popular API for Indian retail algos. Supports order placement, live market data (via WebSocket), and historical data. Rate limited to 3 requests/second for data."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Angel One SmartAPI:"})," Growing alternative with similar capabilities. Free historical data for backtesting."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"TrueData / Global Datafeeds:"})," Professional data vendors for real-time and historical NSE/BSE data including tick-by-tick feeds needed for intraday strategy backtesting."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"NSE Bhav Copies:"})," Free end-of-day OHLCV data directly from NSE, available from 1994 onwards. Use for daily strategy backtesting but remember to adjust for corporate actions manually."]})]})}),e.jsx(b,{title:"Key Takeaway",type:"tip",children:e.jsxs("p",{children:["Backtrader provides a mature event-driven framework that maps naturally onto Indian market workflows. The critical step is ",e.jsx("strong",{children:"realistic cost modeling"}),": always include STT, stamp duty, SEBI fees, GST, and slippage. For NSE strategies, use the XNSE exchange calendar and verify that your data accounts for corporate actions (bonus, splits, dividends) that are frequent in Indian equities."]})})]})}const ye=Object.freeze(Object.defineProperty({__proto__:null,default:Y},Symbol.toStringTag,{value:"Module"}));function $(){const[i,_]=c.useState("market_data"),[a,N]=c.useState(5),[s,k]=c.useState(50),l={market_data:{color:"#6366f1",label:"Market Data",process:"Update OHLCV bar"},signal:{color:"#f59e0b",label:"Signal",process:"Generate alpha signal"},order:{color:"#22c55e",label:"Order",process:"Submit to broker"},fill:{color:"#ef4444",label:"Fill",process:"Update portfolio"},risk:{color:"#8b5cf6",label:"Risk Check",process:"Validate exposure"}},x=Math.floor(1e3/s*a),o=l[i];return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Custom Event Loop Simulator"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Explore how event type, queue depth, and processing latency affect backtester throughput."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsx("span",{children:"Event Type"}),e.jsx("select",{value:i,onChange:f=>_(f.target.value),className:"rounded border border-gray-300 bg-white p-1 text-xs dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200",children:Object.entries(l).map(([f,m])=>e.jsx("option",{value:f,children:m.label},f))})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Queue Depth = ",a]}),e.jsx("input",{type:"range",min:"1",max:"20",step:"1",value:a,onChange:f=>N(parseInt(f.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Latency = ",s," ms"]}),e.jsx("input",{type:"range",min:"1",max:"200",step:"1",value:s,onChange:f=>k(parseInt(f.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 520 180",className:"w-full max-w-xl mx-auto block","aria-label":"Event loop diagram",children:[Array.from({length:Math.min(a,8)}).map((f,m)=>e.jsxs("g",{children:[e.jsx("rect",{x:30+m*50,y:"20",width:"40",height:"30",rx:"4",fill:o.color,opacity:.3+m/10,stroke:o.color,strokeWidth:"1.5"}),e.jsxs("text",{x:50+m*50,y:"39",textAnchor:"middle",className:"text-[8px] font-mono",fill:"#374151",children:["E",m+1]})]},m)),e.jsxs("text",{x:"250",y:"12",textAnchor:"middle",className:"text-[10px] font-semibold",fill:"#6b7280",children:["Event Queue (depth: ",a,")"]}),e.jsx("line",{x1:"250",y1:"55",x2:"250",y2:"80",stroke:"#9ca3af",strokeWidth:"2",markerEnd:"url(#evtArrow)"}),e.jsx("defs",{children:e.jsx("marker",{id:"evtArrow",markerWidth:"8",markerHeight:"6",refX:"8",refY:"3",orient:"auto",children:e.jsx("polygon",{points:"0 0, 8 3, 0 6",fill:"#9ca3af"})})}),e.jsx("rect",{x:"170",y:"85",width:"160",height:"40",rx:"8",fill:o.color,opacity:"0.2",stroke:o.color,strokeWidth:"2"}),e.jsxs("text",{x:"250",y:"100",textAnchor:"middle",className:"text-[10px] font-bold",fill:"#374151",children:[o.label," Handler"]}),e.jsx("text",{x:"250",y:"115",textAnchor:"middle",className:"text-[8px]",fill:"#6b7280",children:o.process}),e.jsx("line",{x1:"250",y1:"130",x2:"250",y2:"155",stroke:"#9ca3af",strokeWidth:"2",markerEnd:"url(#evtArrow)"}),e.jsxs("text",{x:"250",y:"172",textAnchor:"middle",className:"text-[10px] font-semibold",fill:"#16a34a",children:["Throughput: ~",x," events/sec"]})]})]})}function Q(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Building a Custom Event-Driven Backtester"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"While frameworks like Backtrader and Zipline provide ready-made solutions, building a custom event-driven backtester gives you full control over execution semantics, order routing, and Indian market-specific nuances like circuit limits, T+1 settlement, and SEBI margin requirements. This section walks through the architecture and key design patterns."}),e.jsx(S,{title:"Event-Driven Architecture (EDA)",label:"Definition 8.5",definition:"An event-driven architecture is a software design pattern in which the flow of the program is determined by events -- discrete state changes that are detected, processed, and dispatched through an event queue. In backtesting, events include market data ticks, signals, orders, and fills.",notation:e.jsxs(e.Fragment,{children:["The event loop processes events from a priority queue ",e.jsx(t.InlineMath,{math:"\\mathcal{Q}"})," such that ",e.jsx(t.InlineMath,{math:"e_i \\prec e_j \\iff t_i < t_j"})," (time-ordered processing)."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Core Event Types"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"A well-designed backtester processes four fundamental event types in a strict sequence. The state machine can be formalized as:"}),e.jsx(t.BlockMath,{math:"\\text{MarketEvent} \\xrightarrow{\\text{Strategy}} \\text{SignalEvent} \\xrightarrow{\\text{Portfolio}} \\text{OrderEvent} \\xrightarrow{\\text{Broker}} \\text{FillEvent}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["Each event carries a timestamp ",e.jsx(t.InlineMath,{math:"t"}),", allowing the engine to simulate the temporal ordering that would occur in live trading. The fill event updates the portfolio state vector:"]}),e.jsx(t.BlockMath,{math:"\\mathbf{h}_{t+1} = \\mathbf{h}_t + \\Delta\\mathbf{h}_t, \\quad \\text{cash}_{t+1} = \\text{cash}_t - \\Delta\\mathbf{h}_t^\\top \\mathbf{p}_t - C(\\Delta\\mathbf{h}_t)"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"\\mathbf{h}_t"})," is the holdings vector,"," ",e.jsx(t.InlineMath,{math:"\\mathbf{p}_t"})," is the price vector, and"," ",e.jsx(t.InlineMath,{math:"C(\\cdot)"})," is the Indian market cost function including STT, stamp duty, SEBI charges, and GST."]}),e.jsx(M,{title:"Consistency Guarantee",label:"Theorem 8.3",statement:e.jsxs(e.Fragment,{children:["An event-driven backtester is ",e.jsx("em",{children:"consistent"})," with forward time if and only if no event at time ",e.jsx(t.InlineMath,{math:"t"})," can access information from any event at time ",e.jsx(t.InlineMath,{math:"t' > t"}),". Formally:"]}),formula:"\\forall e_i \\in \\mathcal{Q}: \\text{info}(e_i) \\subseteq \\mathcal{F}_{t_i}",proof:e.jsxs(e.Fragment,{children:["This follows directly from the filtration property of stochastic processes. The event queue enforces ",e.jsx(t.InlineMath,{math:"\\mathcal{F}_s \\subseteq \\mathcal{F}_t"})," for ",e.jsx(t.InlineMath,{math:"s \\le t"})," by processing events in chronological order and never allowing backward information flow. Any violation constitutes lookahead bias."]})}),e.jsx($,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Indian Market Cost Function"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The cost function for NSE equity delivery trades is a sum of multiple regulatory and broker charges:"}),e.jsx(t.BlockMath,{math:"C(q, p) = \\underbrace{B(q,p)}_{\\text{brokerage}} + \\underbrace{0.001 \\cdot q \\cdot p}_{\\text{STT (delivery)}} + \\underbrace{0.0001\\% \\cdot q \\cdot p}_{\\text{SEBI}} + \\underbrace{s \\cdot q \\cdot p}_{\\text{stamp}} + 0.18 \\cdot B(q,p)"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"q"})," is quantity, ",e.jsx(t.InlineMath,{math:"p"})," is price,"," ",e.jsx(t.InlineMath,{math:"B"})," is brokerage, and ",e.jsx(t.InlineMath,{math:"s"})," is the state-specific stamp duty rate."]}),e.jsx(T,{title:"custom_backtester.py",runnable:!0,code:`import numpy as np
from dataclasses import dataclass, field
from typing import List, Optional
from enum import Enum
from collections import deque

# --- Event Types ---
class EventType(Enum):
    MARKET = "MARKET"
    SIGNAL = "SIGNAL"
    ORDER  = "ORDER"
    FILL   = "FILL"

@dataclass
class Event:
    type: EventType
    timestamp: str
    data: dict = field(default_factory=dict)

# --- Indian Market Cost Calculator ---
class IndianCostModel:
    """Realistic NSE/BSE cost model."""
    def __init__(self, brokerage_pct=0.03, stamp_pct=0.003,
                 stt_delivery=0.1, stt_intraday=0.025):
        self.brokerage_pct = brokerage_pct / 100
        self.stamp_pct = stamp_pct / 100
        self.stt_delivery = stt_delivery / 100
        self.stt_intraday = stt_intraday / 100

    def calculate(self, quantity, price, side, is_intraday=False):
        turnover = quantity * price
        brokerage = min(turnover * self.brokerage_pct, 20)  # Zerodha cap
        stt_rate = self.stt_intraday if is_intraday else self.stt_delivery
        stt = turnover * stt_rate if side == 'SELL' else 0
        sebi = turnover * 0.000001
        stamp = turnover * self.stamp_pct if side == 'BUY' else 0
        gst = 0.18 * (brokerage + sebi)
        total = brokerage + stt + sebi + stamp + gst
        return {
            'brokerage': round(brokerage, 2),
            'stt': round(stt, 2),
            'sebi': round(sebi, 4),
            'stamp': round(stamp, 2),
            'gst': round(gst, 2),
            'total': round(total, 2),
        }

# --- Event Queue ---
class EventQueue:
    def __init__(self):
        self.queue = deque()

    def push(self, event: Event):
        self.queue.append(event)

    def pop(self) -> Optional[Event]:
        return self.queue.popleft() if self.queue else None

    @property
    def is_empty(self):
        return len(self.queue) == 0

# --- Demo: Run Event Loop ---
cost_model = IndianCostModel()
eq = EventQueue()

# Simulate Nifty 50 data events
nifty_prices = [22150, 22180, 22210, 22170, 22250]
for i, price in enumerate(nifty_prices):
    eq.push(Event(
        type=EventType.MARKET,
        timestamp=f"2024-01-{15+i:02d}",
        data={"symbol": "NIFTY50", "close": price}
    ))

print("=== Custom Event-Driven Backtester ===")
print(f"Events in queue: {len(eq.queue)}\\n")

# Process events
portfolio_value = 1_000_000  # INR 10 lakh
position = 0
entry_price = 0

while not eq.is_empty:
    event = eq.pop()
    price = event.data['close']
    print(f"[{event.timestamp}] {event.data['symbol']} @ {price}")

    # Simple momentum signal
    if position == 0 and price > 22200:
        qty = 50  # Nifty lot
        costs = cost_model.calculate(qty, price, 'BUY')
        portfolio_value -= qty * price + costs['total']
        position = qty
        entry_price = price
        print(f"  -> BUY {qty} @ {price}, cost={costs['total']:.2f} INR")
    elif position > 0 and price < entry_price * 0.998:
        costs = cost_model.calculate(position, price, 'SELL')
        portfolio_value += position * price - costs['total']
        pnl = (price - entry_price) * position - costs['total']
        print(f"  -> SELL {position} @ {price}, PnL={pnl:.2f} INR")
        position = 0

print(f"\\nFinal portfolio: INR {portfolio_value:,.2f}")
print(f"Open position: {position} units")

# Show cost breakdown for a sample trade
print("\\n=== Cost Breakdown (50 lots @ 22210) ===")
costs = cost_model.calculate(50, 22210, 'BUY')
for k, v in costs.items():
    print(f"  {k:>12}: INR {v:>8}")`}),e.jsx(C,{title:"NSE Circuit Limit Handling",difficulty:"advanced",problem:"During backtesting, HDFC Bank hits the 20% upper circuit at INR 1,800. Your strategy has a pending sell order at INR 1,750. How should the custom backtester handle this?",solution:[{step:"Detect circuit condition",formula:"\\text{price\\_change} = \\frac{1800 - 1500}{1500} = 20\\% = \\text{circuit\\_limit}",explanation:"The stock has hit the upper circuit. No further trading is allowed at this price level."},{step:"Apply NSE circuit rules",formula:"\\text{order\\_status} = \\text{CANCELLED}",explanation:"When a stock is in circuit, only orders in the opposite direction (sell at upper circuit) are accepted, but with no guaranteed fill. The backtester should cancel unfilled buy orders and mark the bar as circuit-hit."},{step:"Record in event log",formula:"\\text{FillEvent}(\\text{status}=\\text{REJECTED}, \\text{reason}=\\text{CIRCUIT})",explanation:"The backtester generates a rejected fill event, preserving audit trail for analysis."}]}),e.jsx(b,{title:"Design Principles",type:"tip",children:e.jsxs("p",{children:["When building a custom event-driven backtester for Indian markets, follow these principles: (1) ",e.jsx("strong",{children:"Immutable events"})," -- once created, events should never be modified; (2) ",e.jsx("strong",{children:"Strict time ordering"})," -- process the event queue chronologically; (3) ",e.jsx("strong",{children:"Realistic fills"})," -- model circuit limits, lot sizes, and T+1 settlement; (4) ",e.jsx("strong",{children:"Auditable"})," -- log every event for post-hoc analysis. The extra engineering effort pays off in strategy confidence."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Performance Benchmarks"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"A well-designed custom backtester should achieve these performance targets when processing NSE daily bar data across the Nifty 200 universe:"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Metric"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Target"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Notes"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Daily bar throughput"}),e.jsxs("td",{className:"px-4 py-2",children:[">"," 100K bars/sec"]}),e.jsxs("td",{className:"px-4 py-2",children:["200 stocks x 10 years in ","<"," 10s"]})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Memory usage"}),e.jsxs("td",{className:"px-4 py-2",children:["<"," 2 GB"]}),e.jsx("td",{className:"px-4 py-2",children:"Stream data, don't load all in RAM"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Order latency"}),e.jsxs("td",{className:"px-4 py-2",children:["<"," 1ms per order"]}),e.jsx("td",{className:"px-4 py-2",children:"Cost model + fill simulation"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Reproducibility"}),e.jsx("td",{className:"px-4 py-2",children:"Bit-exact"}),e.jsx("td",{className:"px-4 py-2",children:"Same seed = same results always"})]})]})]})}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The modular architecture should separate concerns clearly. The market data handler, strategy, portfolio manager, and broker simulator should communicate only through the event queue:"}),e.jsx(t.BlockMath,{math:"\\text{Coupling} = \\frac{|\\{(A, B) : A \\text{ directly calls } B\\}|}{|\\mathcal{M}|^2} \\to 0"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"|\\mathcal{M}|"})," is the number of modules. Low coupling enables testing each component independently and swapping implementations (e.g., replacing the Zerodha cost model with an Upstox model) without modifying strategy code."]}),e.jsx(b,{title:"Historical Note",type:"historical",children:e.jsxs("ul",{className:"space-y-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"2003:"})," NSE introduced screen-based trading replacing open outcry, fundamentally changing how backtesting models should handle order execution."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"2020:"})," SEBI mandated peak margin reporting, requiring backtesting frameworks to account for intraday margin snapshots."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"2023:"})," NSE moved to T+1 settlement, reducing settlement risk but requiring backtester updates to handle the shorter cycle."]})]})}),e.jsx(b,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Building a custom event-driven backtester is a significant engineering investment but provides the highest fidelity simulation for Indian markets. The critical components are: (1) a time-ordered event queue preventing lookahead, (2) a realistic Indian cost model covering all regulatory charges, (3) circuit limit and lot size handling specific to NSE, and (4) comprehensive event logging for audit and debugging."})})]})}const be=Object.freeze(Object.defineProperty({__proto__:null,default:Q},Symbol.toStringTag,{value:"Module"}));function X(){const[i,_]=c.useState(252),[a,N]=c.useState(63),[s,k]=c.useState(1260),[l,x]=c.useState(!1),o=Math.floor((s-i)/a),m=(o*a/s*100).toFixed(1),h=[];for(let r=0;r<Math.min(o,6);r++){const u=l?0:r*a,y=(l?0:r*a)+i,n=y,j=n+a;h.push({trainStart:u,trainEnd:y,testStart:n,testEnd:j})}const p=460/s;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Walk-Forward Windows on Nifty 50"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust training/test window sizes and see how walk-forward folds partition the data."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Train Window = ",i," days"]}),e.jsx("input",{type:"range",min:"63",max:"756",step:"21",value:i,onChange:r=>_(parseInt(r.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Test Window = ",a," days"]}),e.jsx("input",{type:"range",min:"21",max:"252",step:"21",value:a,onChange:r=>N(parseInt(r.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Total = ",s," days (~",(s/252).toFixed(1)," yrs)"]}),e.jsx("input",{type:"range",min:"504",max:"2520",step:"252",value:s,onChange:r=>k(parseInt(r.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400",children:[e.jsx("input",{type:"checkbox",checked:l,onChange:r=>x(r.target.checked),className:"accent-indigo-500"}),e.jsx("span",{children:"Anchored (expanding window)"})]})]}),e.jsxs("svg",{viewBox:"0 0 520 200",className:"w-full max-w-xl mx-auto block","aria-label":"Walk-forward folds",children:[e.jsxs("text",{x:"260",y:"15",textAnchor:"middle",className:"text-[10px] font-semibold",fill:"#6b7280",children:[o," folds | Coverage: ",m,"% | ",l?"Anchored":"Rolling"]}),h.map((r,u)=>{const y=25+u*27;return e.jsxs("g",{children:[e.jsxs("text",{x:"5",y:y+13,className:"text-[8px]",fill:"#9ca3af",children:["F",u+1]}),e.jsx("rect",{x:30+r.trainStart*p,y,width:Math.max((r.trainEnd-r.trainStart)*p,2),height:"18",fill:"#6366f1",opacity:"0.4",rx:"2"}),e.jsx("rect",{x:30+r.testStart*p,y,width:Math.max((r.testEnd-r.testStart)*p,2),height:"18",fill:"#22c55e",opacity:"0.5",rx:"2"})]},u)}),e.jsx("rect",{x:"160",y:"185",width:"14",height:"10",fill:"#6366f1",opacity:"0.4",rx:"2"}),e.jsx("text",{x:"178",y:"194",className:"text-[9px]",fill:"#6b7280",children:"Train"}),e.jsx("rect",{x:"220",y:"185",width:"14",height:"10",fill:"#22c55e",opacity:"0.5",rx:"2"}),e.jsx("text",{x:"238",y:"194",className:"text-[9px]",fill:"#6b7280",children:"Test (OOS)"}),e.jsx("line",{x1:"30",y1:"178",x2:"490",y2:"178",stroke:"#d1d5db",strokeWidth:"1"})]})]})}function ee(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Walk-Forward Analysis on Nifty Strategies"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Walk-forward analysis (WFA) is the gold standard for validating trading strategies on non-stationary financial time series. It mimics the real-world process of periodically re-optimizing a strategy on recent data and then trading out-of-sample. For Indian markets, WFA must account for regime changes like demonetization (2016), COVID crash (2020), and SEBI regulatory shifts."}),e.jsx(S,{title:"Walk-Forward Analysis",label:"Definition 8.6",definition:"Walk-forward analysis partitions a time series into consecutive (train, test) pairs where each training window is used to optimize strategy parameters, and the subsequent test window evaluates out-of-sample performance. The final performance metric is the concatenation of all out-of-sample segments.",notation:e.jsxs(e.Fragment,{children:["Given total data ",e.jsx(t.InlineMath,{math:"[0, T]"}),", training window ",e.jsx(t.InlineMath,{math:"w"}),", and test window ",e.jsx(t.InlineMath,{math:"h"}),", the ",e.jsx(t.InlineMath,{math:"k"}),"-th fold uses train ",e.jsx(t.InlineMath,{math:"[kh, kh+w)"})," and test ",e.jsx(t.InlineMath,{math:"[kh+w, kh+w+h)"}),"."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Rolling vs. Anchored Walk-Forward"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["Two variants exist. In ",e.jsx("strong",{children:"rolling"})," walk-forward, the training window slides forward maintaining fixed size ",e.jsx(t.InlineMath,{math:"w"}),". In"," ",e.jsx("strong",{children:"anchored"})," (expanding) walk-forward, the training window starts from the beginning and grows with each fold:"]}),e.jsx(t.BlockMath,{math:"\\text{Rolling: } \\mathcal{T}_k^{\\text{train}} = [kh,\\; kh + w), \\quad \\text{Anchored: } \\mathcal{T}_k^{\\text{train}} = [0,\\; kh + w)"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The Walk-Forward Efficiency (WFE) ratio measures how well in-sample performance translates to out-of-sample:"}),e.jsx(t.BlockMath,{math:"\\text{WFE} = \\frac{\\text{OOS Annualized Return}}{\\text{IS Annualized Return}} \\times 100\\%"}),e.jsx(M,{title:"Optimal Training Window",label:"Theorem 8.4",statement:e.jsxs(e.Fragment,{children:["For a mean-reverting strategy with half-life ",e.jsx(t.InlineMath,{math:"\\tau"}),", the optimal training window ",e.jsx(t.InlineMath,{math:"w^*"})," that minimizes the bias-variance tradeoff satisfies:"]}),formula:"w^* \\approx \\max\\left(3\\tau, \\; \\sqrt{\\frac{2T}{\\lambda}}\\right)",proof:e.jsxs(e.Fragment,{children:["A shorter window reduces estimation bias (adapts to regime changes) but increases variance. For mean-reverting processes, at least ",e.jsx(t.InlineMath,{math:"3\\tau"})," observations are needed to reliably estimate the half-life. The second term comes from the bias-variance decomposition where ",e.jsx(t.InlineMath,{math:"\\lambda"})," captures the rate of parameter drift. For Nifty 50 strategies with typical half-lives of 20-60 days, this yields training windows of 180-504 days."]})}),e.jsx(X,{}),e.jsx(T,{title:"walk_forward_nifty.py",runnable:!0,code:`import numpy as np
from dataclasses import dataclass

@dataclass
class WFAConfig:
    train_window: int = 252    # 1 year of trading days
    test_window: int = 63      # 1 quarter
    anchored: bool = False
    min_trades: int = 20

class WalkForwardAnalyzer:
    """Walk-Forward Analysis for Nifty 50 strategies."""

    def __init__(self, config: WFAConfig):
        self.config = config
        self.oos_returns = []

    def generate_folds(self, n_obs: int):
        """Generate train/test fold indices."""
        folds = []
        k = 0
        while True:
            if self.config.anchored:
                train_start = 0
            else:
                train_start = k * self.config.test_window
            train_end = k * self.config.test_window + self.config.train_window
            test_start = train_end
            test_end = test_start + self.config.test_window

            if test_end > n_obs:
                break

            folds.append({
                'fold': k + 1,
                'train': (train_start, train_end),
                'test': (test_start, test_end),
                'train_size': train_end - train_start,
            })
            k += 1
        return folds

    def compute_wfe(self, is_returns, oos_returns):
        """Walk-Forward Efficiency ratio."""
        is_annual = np.mean(is_returns) * 252
        oos_annual = np.mean(oos_returns) * 252
        if abs(is_annual) < 1e-8:
            return 0.0
        return (oos_annual / is_annual) * 100

# --- Demo: Nifty 50 Walk-Forward ---
np.random.seed(42)
n_days = 1260  # 5 years of NSE trading data

# Simulated Nifty 50 daily returns (mean ~12% annual, vol ~16%)
nifty_returns = np.random.normal(0.12/252, 0.16/np.sqrt(252), n_days)

# Add regime changes (demonetization-style shock, COVID crash)
nifty_returns[504:510] -= 0.03   # Regime shock
nifty_returns[756:775] -= 0.04   # COVID-like crash
nifty_returns[780:800] += 0.025  # Recovery rally

config = WFAConfig(train_window=252, test_window=63, anchored=False)
wfa = WalkForwardAnalyzer(config)
folds = wfa.generate_folds(n_days)

print("=== Walk-Forward Analysis: Nifty 50 SMA Strategy ===")
print(f"Total observations: {n_days} days ({n_days/252:.1f} years)")
print(f"Training window: {config.train_window} days")
print(f"Test window: {config.test_window} days")
print(f"Mode: {'Anchored' if config.anchored else 'Rolling'}")
print(f"Number of folds: {len(folds)}\\n")

all_oos_returns = []
for fold in folds:
    train_ret = nifty_returns[fold['train'][0]:fold['train'][1]]
    test_ret = nifty_returns[fold['test'][0]:fold['test'][1]]

    # Simple strategy: optimal lookback from training
    opt_lookback = max(10, int(np.argmax(
        np.cumsum(train_ret[-60:])) + 10))

    # Out-of-sample return
    oos_mean = np.mean(test_ret) * 252 * 100
    oos_vol = np.std(test_ret) * np.sqrt(252) * 100
    all_oos_returns.extend(test_ret)

    print(f"Fold {fold['fold']:2d}: Train [{fold['train'][0]:4d}-{fold['train'][1]:4d}] "
          f"Test [{fold['test'][0]:4d}-{fold['test'][1]:4d}] "
          f"OOS Return: {oos_mean:+6.1f}% | Vol: {oos_vol:5.1f}%")

# Summary
concat_return = np.mean(all_oos_returns) * 252 * 100
concat_sharpe = np.mean(all_oos_returns) / np.std(all_oos_returns) * np.sqrt(252)
print(f"\\n--- Concatenated OOS Performance ---")
print(f"Annualized Return: {concat_return:+.2f}%")
print(f"Sharpe Ratio:      {concat_sharpe:.3f}")
print(f"Coverage:          {len(all_oos_returns)/n_days*100:.1f}%")`}),e.jsx(C,{title:"Nifty Momentum Walk-Forward",difficulty:"intermediate",problem:"You have 5 years of Nifty 50 data (1,260 trading days). Using a rolling walk-forward with 1-year training and 3-month test windows, how many OOS folds do you get? What percentage of data is used for OOS evaluation?",solution:[{step:"Calculate number of folds",formula:"K = \\lfloor \\frac{T - w}{h} \\rfloor = \\lfloor \\frac{1260 - 252}{63} \\rfloor = \\lfloor 16 \\rfloor = 16",explanation:"Each fold advances by the test window size (63 days = 1 quarter)."},{step:"Calculate total OOS coverage",formula:"\\text{OOS days} = K \\times h = 16 \\times 63 = 1008 \\text{ days}"},{step:"Compute coverage ratio",formula:"\\text{Coverage} = \\frac{1008}{1260} \\times 100\\% = 80\\%",explanation:"80% of the data is evaluated out-of-sample, giving a robust performance estimate."}]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Common Pitfalls in Walk-Forward"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Pitfall"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Symptom"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Solution"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Window too short"}),e.jsx("td",{className:"px-4 py-2",children:"High variance in OOS returns"}),e.jsxs("td",{className:"px-4 py-2",children:["Increase to ",">","3x strategy half-life"]})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Window too long"}),e.jsx("td",{className:"px-4 py-2",children:"Poor adaptation to regimes"}),e.jsx("td",{className:"px-4 py-2",children:"Use rolling (not anchored) mode"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Lookahead in features"}),e.jsxs("td",{className:"px-4 py-2",children:["IS/OOS gap ","<"," 10%"]}),e.jsx("td",{className:"px-4 py-2",children:"Audit feature computation timestamps"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Survivorship bias"}),e.jsx("td",{className:"px-4 py-2",children:"Inflated returns on mid/small caps"}),e.jsx("td",{className:"px-4 py-2",children:"Use point-in-time Nifty 200 constituents"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Ignoring costs"}),e.jsxs("td",{className:"px-4 py-2",children:["OOS Sharpe drops ",">"," 50%"]}),e.jsx("td",{className:"px-4 py-2",children:"Include STT, stamp, slippage in OOS eval"})]})]})]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Regime-Aware Walk-Forward"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Indian markets exhibit distinct regimes driven by macro events. A regime-aware WFA uses a hidden Markov model or India VIX threshold to define regimes and reports OOS performance separately for each:"}),e.jsx(t.BlockMath,{math:"\\text{WFE}_{\\text{regime}} = \\frac{\\text{OOS Return in Regime } k}{\\text{IS Return in Regime } k} \\times 100\\%"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Common regime definitions for NSE:"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Regime"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"India VIX Range"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Nifty Behaviour"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Historical %"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Low Vol Bull"}),e.jsxs("td",{className:"px-4 py-2",children:["<"," 14"]}),e.jsx("td",{className:"px-4 py-2",children:"Steady uptrend"}),e.jsx("td",{className:"px-4 py-2",children:"~40%"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Normal"}),e.jsx("td",{className:"px-4 py-2",children:"14 - 22"}),e.jsx("td",{className:"px-4 py-2",children:"Range-bound"}),e.jsx("td",{className:"px-4 py-2",children:"~35%"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"High Vol"}),e.jsx("td",{className:"px-4 py-2",children:"22 - 35"}),e.jsx("td",{className:"px-4 py-2",children:"Corrective / choppy"}),e.jsx("td",{className:"px-4 py-2",children:"~20%"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Crisis"}),e.jsxs("td",{className:"px-4 py-2",children:[">"," 35"]}),e.jsx("td",{className:"px-4 py-2",children:"Sharp sell-off"}),e.jsx("td",{className:"px-4 py-2",children:"~5%"})]})]})]})}),e.jsx(b,{title:"Historical Context",type:"historical",children:e.jsxs("ul",{className:"space-y-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"2008 GFC:"})," Nifty fell 60% peak-to-trough. Walk-forward strategies trained only on 2003-2007 bull market data failed catastrophically out-of-sample during this regime change."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"2016 Demonetization:"})," A sudden policy shock that standard rolling windows could not anticipate, demonstrating the need for regime-aware WFA."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"2020 COVID:"})," India VIX spiked to 83, the highest ever. Strategies must be tested across this full VIX range to claim robustness."]})]})}),e.jsx(b,{title:"Indian Market Considerations",type:"tip",children:e.jsx("p",{children:"When applying walk-forward analysis to Indian equities, align fold boundaries with NSE calendar quarters (Apr-Jun, Jul-Sep, Oct-Dec, Jan-Mar) to match the Indian financial year. Also consider that major events like Union Budget (February), RBI policy announcements (bi-monthly), and F&O expiry weeks (monthly) can create regime shifts that affect fold performance differently."})}),e.jsx(b,{title:"Key Takeaway",type:"tip",children:e.jsxs("p",{children:["Walk-forward analysis is the most realistic backtest validation method because it mimics the actual workflow of a quant: optimize, deploy, observe, re-optimize. The ",e.jsx("strong",{children:"Walk-Forward Efficiency"})," ratio is your single most important metric -- a WFE above 50% indicates a robust strategy, while WFE below 30% suggests overfitting to in-sample data."]})})]})}const je=Object.freeze(Object.defineProperty({__proto__:null,default:ee},Symbol.toStringTag,{value:"Module"}));function te(){const[i,_]=c.useState(5),[a,N]=c.useState(10),[s,k]=c.useState(5),[l,x]=c.useState(20),o=252,f=Math.floor(o/i),m=((o-f-a*2-s)/o*100).toFixed(1),h=a<l?"HIGH":"LOW";return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Purged K-Fold Cross-Validation"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust fold count, purge gap, and embargo gap to visualize how samples are removed around test boundaries to prevent information leakage."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["K Folds = ",i]}),e.jsx("input",{type:"range",min:"3",max:"10",step:"1",value:i,onChange:p=>_(parseInt(p.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Purge Gap = ",a," days"]}),e.jsx("input",{type:"range",min:"0",max:"30",step:"1",value:a,onChange:p=>N(parseInt(p.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Embargo = ",s," days"]}),e.jsx("input",{type:"range",min:"0",max:"20",step:"1",value:s,onChange:p=>k(parseInt(p.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Label Horizon = ",l," days"]}),e.jsx("input",{type:"range",min:"1",max:"60",step:"1",value:l,onChange:p=>x(parseInt(p.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 520 160",className:"w-full max-w-xl mx-auto block","aria-label":"Purged CV folds",children:[e.jsxs("text",{x:"260",y:"14",textAnchor:"middle",className:"text-[10px] font-semibold",fill:"#6b7280",children:["Fold 1 of ",i," shown | Effective train: ",m,"% | Leakage risk: ",h]}),e.jsx("line",{x1:"30",y1:"45",x2:"490",y2:"45",stroke:"#d1d5db",strokeWidth:"2"}),Array.from({length:i}).map((p,r)=>{const u=30+r*(460/i),y=460/i,n=r===0;return e.jsx("rect",{x:u,y:"30",width:y,height:"30",rx:"3",fill:n?"#22c55e":"#6366f1",opacity:n?.5:.3,stroke:n?"#16a34a":"#4f46e5",strokeWidth:"1"},r)}),a>0&&e.jsxs(e.Fragment,{children:[e.jsx("rect",{x:30+460/i,y:"30",width:a*(460/o),height:"30",fill:"#ef4444",opacity:"0.3"}),e.jsx("rect",{x:30-a*(460/o),y:"30",width:Math.min(a*(460/o),30),height:"30",fill:"#ef4444",opacity:"0.3"})]}),s>0&&e.jsx("rect",{x:30+460/i+a*(460/o),y:"30",width:s*(460/o),height:"30",fill:"#f59e0b",opacity:"0.3"}),e.jsx("text",{x:30+460/i/2,y:"82",textAnchor:"middle",className:"text-[9px] font-bold",fill:"#16a34a",children:"Test"}),e.jsx("text",{x:30+460/i+30,y:"82",textAnchor:"middle",className:"text-[9px] font-bold",fill:"#ef4444",children:"Purge"}),e.jsx("text",{x:30+460/i+60,y:"95",textAnchor:"middle",className:"text-[8px]",fill:"#d97706",children:"Embargo"}),e.jsx("rect",{x:"120",y:"115",width:"12",height:"8",fill:"#6366f1",opacity:"0.3",rx:"1"}),e.jsx("text",{x:"136",y:"123",className:"text-[8px]",fill:"#6b7280",children:"Train"}),e.jsx("rect",{x:"175",y:"115",width:"12",height:"8",fill:"#22c55e",opacity:"0.5",rx:"1"}),e.jsx("text",{x:"191",y:"123",className:"text-[8px]",fill:"#6b7280",children:"Test"}),e.jsx("rect",{x:"225",y:"115",width:"12",height:"8",fill:"#ef4444",opacity:"0.3",rx:"1"}),e.jsx("text",{x:"241",y:"123",className:"text-[8px]",fill:"#6b7280",children:"Purged"}),e.jsx("rect",{x:"285",y:"115",width:"12",height:"8",fill:"#f59e0b",opacity:"0.3",rx:"1"}),e.jsx("text",{x:"301",y:"123",className:"text-[8px]",fill:"#6b7280",children:"Embargo"}),e.jsx("text",{x:"260",y:"150",textAnchor:"middle",className:`text-[10px] font-bold ${h==="HIGH"?"fill-red-500":"fill-green-600"}`,children:h==="HIGH"?`Warning: purge gap (${a}) < label horizon (${l}) -- leakage likely!`:`Purge gap (${a}) >= label horizon (${l}) -- safe.`})]})]})}function ae(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Purged K-Fold Cross-Validation"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Standard k-fold cross-validation fails catastrophically in finance because it ignores the temporal structure of returns. Overlapping labels, serial correlation, and multi-period forward-looking targets create information leakage that inflates performance estimates. Purged k-fold CV, introduced by Marcos Lopez de Prado, addresses this by removing (purging) training samples whose labels overlap with test samples and applying an embargo period after each test fold."}),e.jsx(S,{title:"Purged K-Fold CV",label:"Definition 8.7",definition:"Purged k-fold cross-validation is a modified CV procedure for financial time series that (1) removes from the training set all observations whose label spans overlap with any test observation (purging), and (2) further removes training observations immediately after the test set to prevent information leakage through serial correlation (embargo).",notation:e.jsxs(e.Fragment,{children:["For observation ",e.jsx(t.InlineMath,{math:"i"})," with label span ",e.jsx(t.InlineMath,{math:"[t_i^{\\text{start}}, t_i^{\\text{end}}]"}),", purge from training if ",e.jsx(t.InlineMath,{math:"t_i^{\\text{end}} > t_j^{\\text{start}}"})," for any test observation ",e.jsx(t.InlineMath,{math:"j"}),"."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"The Information Leakage Problem"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["Consider a Nifty 50 strategy where the label is the forward 20-day return. Observation at day ",e.jsx(t.InlineMath,{math:"t"})," uses price data up to day"," ",e.jsx(t.InlineMath,{math:"t"})," and the label is:"]}),e.jsx(t.BlockMath,{math:"y_t = \\frac{P_{t+20} - P_t}{P_t}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["If observation ",e.jsx(t.InlineMath,{math:"t"})," is in the training set and observation"," ",e.jsx(t.InlineMath,{math:"t+5"})," is in the test set, the training label"," ",e.jsx(t.InlineMath,{math:"y_t"})," uses prices up to ",e.jsx(t.InlineMath,{math:"t+20"}),", which overlaps with the test feature window. This is ",e.jsx("strong",{children:"leakage"}),"."]}),e.jsx(t.BlockMath,{math:"\\text{Leakage: } [t, t+20] \\cap [t+5, t+25] = [t+5, t+20] \\neq \\emptyset"}),e.jsx(M,{title:"Purging Criterion",label:"Theorem 8.5",statement:e.jsxs(e.Fragment,{children:["Training observation ",e.jsx(t.InlineMath,{math:"i"})," must be purged from fold ",e.jsx(t.InlineMath,{math:"k"})," if and only if its label time span overlaps with any test observation in fold ",e.jsx(t.InlineMath,{math:"k"}),":"]}),formula:"\\text{Purge}(i, k) \\iff \\exists\\, j \\in \\mathcal{T}_k^{\\text{test}}: \\; t_i^{\\text{end}} > t_j^{\\text{start}} \\;\\wedge\\; t_i^{\\text{start}} < t_j^{\\text{end}}",proof:e.jsxs(e.Fragment,{children:["If the label of training observation ",e.jsx(t.InlineMath,{math:"i"})," depends on prices in the test period of fold ",e.jsx(t.InlineMath,{math:"k"}),", then the model can indirectly access test information during training. The purging criterion ensures no temporal overlap exists between any training label span and any test observation span, eliminating this leakage channel."]})}),e.jsx(te,{}),e.jsx(T,{title:"purged_kfold_nifty.py",runnable:!0,code:`import numpy as np

class PurgedKFoldCV:
    """Purged K-Fold CV for Nifty 50 alpha strategies.

    Implements the method from Lopez de Prado (2018),
    adapted for Indian market conventions.
    """

    def __init__(self, n_splits=5, purge_gap=0, embargo_pct=0.01):
        self.n_splits = n_splits
        self.purge_gap = purge_gap
        self.embargo_pct = embargo_pct

    def split(self, n_obs, label_horizon=1):
        """Generate purged train/test indices."""
        fold_size = n_obs // self.n_splits
        embargo_size = int(n_obs * self.embargo_pct)
        effective_purge = max(self.purge_gap, label_horizon)

        folds = []
        for k in range(self.n_splits):
            test_start = k * fold_size
            test_end = min((k + 1) * fold_size, n_obs)

            purge_start = max(0, test_start - effective_purge)
            purge_end = min(n_obs, test_end + effective_purge)
            embargo_end = min(n_obs, purge_end + embargo_size)

            test_indices = list(range(test_start, test_end))
            excluded = set(range(purge_start, embargo_end))
            excluded.update(test_indices)
            train_indices = [i for i in range(n_obs) if i not in excluded]

            folds.append({
                'fold': k + 1,
                'train': train_indices,
                'test': test_indices,
                'n_purged': len(excluded) - len(test_indices),
                'n_train': len(train_indices),
                'n_test': len(test_indices),
            })

        return folds

# --- Demo: Nifty 50 factor model CV ---
np.random.seed(42)
n_obs = 1260  # 5 years of NSE trading days
label_horizon = 20  # 20-day forward return label

X = np.random.randn(n_obs, 5)
y = np.random.randn(n_obs)

# Standard CV (WRONG for finance)
print("=== Standard K-Fold (INCORRECT) ===")
from_std = n_obs // 5
for k in range(5):
    test_idx = list(range(k * from_std, (k+1) * from_std))
    train_idx = [i for i in range(n_obs) if i not in test_idx]
    print(f"Fold {k+1}: train={len(train_idx)}, test={len(test_idx)}, "
          f"purged=0 (LEAKAGE RISK!)")

print()

# Purged CV (CORRECT)
print("=== Purged K-Fold CV (CORRECT) ===")
cv = PurgedKFoldCV(n_splits=5, purge_gap=20, embargo_pct=0.02)
folds = cv.split(n_obs, label_horizon=label_horizon)

for fold in folds:
    print(f"Fold {fold['fold']}: train={fold['n_train']}, "
          f"test={fold['n_test']}, purged={fold['n_purged']}")

total_purged = sum(f['n_purged'] for f in folds)
avg_train = np.mean([f['n_train'] for f in folds])
print(f"\\nTotal samples purged: {total_purged}")
print(f"Avg training size: {avg_train:.0f} ({avg_train/n_obs*100:.1f}%)")
print(f"Label horizon: {label_horizon} days")
print(f"Purge gap: {cv.purge_gap} days")
print(f"Embargo: {cv.embargo_pct*100:.1f}% = {int(n_obs*cv.embargo_pct)} days")

print("\\n=== Accuracy Impact ===")
std_acc = 0.58
purged_acc = 0.52
print(f"Standard CV accuracy: {std_acc:.1%} (overfit)")
print(f"Purged CV accuracy:   {purged_acc:.1%} (realistic)")
print(f"Inflation factor:     {std_acc/purged_acc:.2f}x")`}),e.jsx(C,{title:"Purging a Nifty Factor Model",difficulty:"advanced",problem:"A Nifty 500 factor model uses 60-day forward returns as labels. With 5-fold purged CV on 1,260 observations, purge gap = 60 days, and embargo = 2%, how many samples are excluded from training in fold 1?",solution:[{step:"Compute test fold size",formula:"|\\mathcal{T}^{\\text{test}}| = \\lfloor 1260 / 5 \\rfloor = 252"},{step:"Compute purge zone",formula:"\\text{purge} = 2 \\times 60 = 120 \\text{ days (both sides of test)}",explanation:"The purge gap equals the label horizon on each side of the test fold boundary."},{step:"Compute embargo",formula:"\\text{embargo} = 0.02 \\times 1260 = 25 \\text{ days}"},{step:"Total excluded from training",formula:"\\text{excluded} = 252 + 120 + 25 = 397",explanation:"Training set has 1260 - 397 = 863 samples (68.5%), significantly less than the 1008 (80%) from standard 5-fold CV."}]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Combinatorial Purged CV (CPCV)"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["An extension of purged k-fold CV is Combinatorial Purged Cross-Validation (CPCV), which tests all possible combinations of test folds rather than using a single fold at a time. For ",e.jsx(t.InlineMath,{math:"k"})," groups with"," ",e.jsx(t.InlineMath,{math:"g"})," test groups per split, CPCV generates"," ",e.jsx(t.InlineMath,{math:"\\binom{k}{g}"})," backtest paths:"]}),e.jsx(t.BlockMath,{math:"N_{\\text{paths}} = \\binom{k}{g} = \\frac{k!}{g!(k-g)!}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["For ",e.jsx(t.InlineMath,{math:"k = 6"})," and ",e.jsx(t.InlineMath,{math:"g = 2"}),", this gives 15 distinct backtest paths, each covering"," ",e.jsx(t.InlineMath,{math:"(k - g)/k = 67\\%"})," of the data for training and"," ",e.jsx(t.InlineMath,{math:"g/k = 33\\%"})," for testing. The resulting distribution of backtest Sharpe ratios provides a more robust estimate of strategy performance uncertainty."]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"CV Method"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Leakage Risk"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"N Paths"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Best For"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Standard K-Fold"}),e.jsx("td",{className:"px-4 py-2 text-red-500 font-bold",children:"HIGH"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"k"})}),e.jsx("td",{className:"px-4 py-2",children:"Never for finance"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Purged K-Fold"}),e.jsx("td",{className:"px-4 py-2 text-green-500 font-bold",children:"LOW"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"k"})}),e.jsx("td",{className:"px-4 py-2",children:"ML factor models"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"CPCV"}),e.jsx("td",{className:"px-4 py-2 text-green-500 font-bold",children:"LOW"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"\\binom{k}{g}"})}),e.jsx("td",{className:"px-4 py-2",children:"Strategy evaluation"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Walk-Forward"}),e.jsx("td",{className:"px-4 py-2 text-green-500 font-bold",children:"NONE"}),e.jsx("td",{className:"px-4 py-2",children:"1 (concat)"}),e.jsx("td",{className:"px-4 py-2",children:"Production strategies"})]})]})]})}),e.jsx(b,{title:"Implementation Tip",type:"historical",children:e.jsxs("ul",{className:"space-y-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Lopez de Prado (2018):"})," Introduced purged k-fold CV in “Advances in Financial Machine Learning,” demonstrating that standard CV overestimates ML model accuracy by 2-3x on financial data."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Bailey et al. (2014):"})," The CPCV extension was proposed to generate a distribution of backtest outcomes rather than a single estimate, enabling probabilistic strategy evaluation."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"For Indian markets:"})," Always use the NSE trading calendar (approximately 252 days/year with Diwali and Republic Day closures) when computing fold boundaries to avoid look-ahead from weekends and holidays."]})]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Practical Guidelines for Indian Markets"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"When applying purged CV to Nifty-based ML strategies, use these recommended settings based on common label horizons:"}),e.jsx(t.BlockMath,{math:"\\text{purge\\_gap} = \\max(\\text{label\\_horizon}, \\text{feature\\_lookback} / 2)"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Strategy Type"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Label Horizon"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Purge Gap"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Embargo"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Intraday alpha"}),e.jsx("td",{className:"px-4 py-2",children:"1 day"}),e.jsx("td",{className:"px-4 py-2",children:"5 days"}),e.jsx("td",{className:"px-4 py-2",children:"1%"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Weekly momentum"}),e.jsx("td",{className:"px-4 py-2",children:"5 days"}),e.jsx("td",{className:"px-4 py-2",children:"10 days"}),e.jsx("td",{className:"px-4 py-2",children:"1.5%"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Monthly factor"}),e.jsx("td",{className:"px-4 py-2",children:"21 days"}),e.jsx("td",{className:"px-4 py-2",children:"21 days"}),e.jsx("td",{className:"px-4 py-2",children:"2%"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Quarterly value"}),e.jsx("td",{className:"px-4 py-2",children:"63 days"}),e.jsx("td",{className:"px-4 py-2",children:"63 days"}),e.jsx("td",{className:"px-4 py-2",children:"3%"})]})]})]})}),e.jsx(b,{title:"Key Takeaway",type:"tip",children:e.jsxs("p",{children:["Purged k-fold CV is ",e.jsx("strong",{children:"essential"})," for any ML-based strategy on Indian markets. Standard sklearn ",e.jsx("code",{children:"KFold"})," will massively overestimate performance due to label leakage. Always set the purge gap to at least your label horizon (e.g., 20 days for monthly return predictions on Nifty), and add an embargo of 1-2% to handle serial autocorrelation in Indian equity returns. Use CPCV for strategy evaluation to get a distribution of expected Sharpe ratios rather than a single point estimate."]})})]})}const ke=Object.freeze(Object.defineProperty({__proto__:null,default:ae},Symbol.toStringTag,{value:"Module"}));function se(){const[i,_]=c.useState(1e3),[a,N]=c.useState(1.5),[s,k]=c.useState(.05),l=0,x=.5,o=(a-l)/x,f=Math.max(.001,Math.min(.999,1-.5*(1+Math.tanh(o*.7)))),m=f<s,h=[];for(let r=-1;r<=3;r+=.2){const u=Math.exp(-.5*((r-l)/x)**2)/(x*Math.sqrt(2*Math.PI));h.push({sharpe:r,density:u})}const p=Math.max(...h.map(r=>r.density));return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Monte Carlo Permutation Test"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Test whether an observed Sharpe ratio from a Nifty strategy is statistically significant against a null distribution of randomized trades."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Observed Sharpe = ",a.toFixed(2)]}),e.jsx("input",{type:"range",min:"0",max:"3",step:"0.1",value:a,onChange:r=>N(parseFloat(r.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Permutations = ",i]}),e.jsx("input",{type:"range",min:"100",max:"10000",step:"100",value:i,onChange:r=>_(parseInt(r.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Significance Level = ",(s*100).toFixed(0),"%"]}),e.jsx("input",{type:"range",min:"0.01",max:"0.1",step:"0.01",value:s,onChange:r=>k(parseFloat(r.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 520 180",className:"w-full max-w-xl mx-auto block","aria-label":"Permutation null distribution",children:[h.map((r,u)=>{const y=50+(r.sharpe+1)*110,n=r.density/p*100,j=r.sharpe>=a;return e.jsx("rect",{x:y,y:140-n,width:"8",height:n,fill:j?"#ef4444":"#6366f1",opacity:"0.5",rx:"1"},u)}),e.jsx("line",{x1:50+(a+1)*110,y1:"30",x2:50+(a+1)*110,y2:"140",stroke:"#dc2626",strokeWidth:"2",strokeDasharray:"4,3"}),e.jsxs("text",{x:50+(a+1)*110,y:"25",textAnchor:"middle",className:"text-[9px] font-bold",fill:"#dc2626",children:["Observed: ",a.toFixed(2)]}),e.jsx("line",{x1:"40",y1:"140",x2:"500",y2:"140",stroke:"#9ca3af",strokeWidth:"1"}),e.jsx("text",{x:"270",y:"158",textAnchor:"middle",className:"text-[9px]",fill:"#6b7280",children:"Sharpe Ratio (null distribution)"}),e.jsxs("text",{x:"400",y:"55",textAnchor:"middle",className:`text-[11px] font-bold ${m?"fill-green-600":"fill-red-500"}`,children:["p = ",f.toFixed(3)]}),e.jsx("text",{x:"400",y:"70",textAnchor:"middle",className:`text-[10px] ${m?"fill-green-600":"fill-red-500"}`,children:m?"SIGNIFICANT":"NOT SIGNIFICANT"})]})]})}function re(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Monte Carlo Permutation Tests"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Even after walk-forward and purged CV validation, a strategy may appear profitable due to chance. Monte Carlo permutation tests provide a distribution-free method to assess statistical significance by comparing the observed strategy performance against a null distribution generated by randomizing the trade signals. This is particularly important for Indian market strategies where the Nifty 50 has exhibited strong bull trends that can inflate apparent alpha."}),e.jsx(S,{title:"Monte Carlo Permutation Test",label:"Definition 8.8",definition:"A Monte Carlo permutation test estimates the probability of observing a test statistic at least as extreme as the observed value under the null hypothesis of no predictive skill. It does so by randomly permuting the relationship between signals and returns B times and computing the test statistic for each permutation.",notation:e.jsxs(e.Fragment,{children:["The p-value is ",e.jsx(t.InlineMath,{math:"p = \\frac{1 + \\sum_{b=1}^{B} \\mathbf{1}[\\hat{\\theta}_b \\geq \\hat{\\theta}_{\\text{obs}}]}{1 + B}"})," where ",e.jsx(t.InlineMath,{math:"\\hat{\\theta}_b"})," is the statistic from the ",e.jsx(t.InlineMath,{math:"b"}),"-th permutation."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Why Permutation Tests for Indian Markets"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["Indian equities exhibit several properties that make parametric tests unreliable: fat-tailed return distributions (kurtosis ",">"," 5 for many Nifty stocks), strong autocorrelation from institutional flows, and regime-dependent volatility. The permutation test makes no distributional assumptions -- it only requires exchangeability under the null:"]}),e.jsx(t.BlockMath,{math:"H_0: \\text{The strategy signal } s_t \\text{ has no predictive power for } r_{t+1}"}),e.jsx(t.BlockMath,{math:"H_1: \\text{The observed Sharpe ratio } \\hat{S} \\text{ reflects genuine alpha}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["Under ",e.jsx(t.InlineMath,{math:"H_0"}),", the mapping between signals and returns is arbitrary, so permuting signals should produce similar performance. The observed Sharpe ratio must exceed the permuted distribution to reject"," ",e.jsx(t.InlineMath,{math:"H_0"}),"."]}),e.jsx(M,{title:"Permutation Test Validity",label:"Theorem 8.6",statement:e.jsxs(e.Fragment,{children:["A Monte Carlo permutation test with ",e.jsx(t.InlineMath,{math:"B"})," permutations controls the Type I error rate at level ",e.jsx(t.InlineMath,{math:"\\alpha"})," if:"]}),formula:"P(\\text{reject } H_0 \\mid H_0 \\text{ true}) \\leq \\frac{\\lceil \\alpha(1+B) \\rceil}{1+B} \\leq \\alpha",proof:e.jsxs(e.Fragment,{children:["Under the null, all ",e.jsx(t.InlineMath,{math:"B+1"})," arrangements (observed + permuted) are equally likely. The observed test statistic has rank uniformly distributed on ",e.jsx(t.InlineMath,{math:"\\{1, \\ldots, B+1\\}"}),". Rejecting when the observed statistic is in the top ",e.jsx(t.InlineMath,{math:"\\lceil \\alpha(1+B) \\rceil"})," positions yields exact size control. For ",e.jsx(t.InlineMath,{math:"B = 999"})," and ",e.jsx(t.InlineMath,{math:"\\alpha = 0.05"}),", we reject if fewer than 50 permuted statistics exceed the observed value."]})}),e.jsx(se,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Types of Permutation Schemes"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Method"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"What is randomized"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Preserves"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Signal Shuffle"}),e.jsx("td",{className:"px-4 py-2",children:"Trade signals"}),e.jsx("td",{className:"px-4 py-2",children:"Return distribution"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Return Shuffle"}),e.jsx("td",{className:"px-4 py-2",children:"Return time series"}),e.jsx("td",{className:"px-4 py-2",children:"Signal structure"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Block Bootstrap"}),e.jsx("td",{className:"px-4 py-2",children:"Contiguous blocks"}),e.jsx("td",{className:"px-4 py-2",children:"Serial correlation"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Circular Bootstrap"}),e.jsx("td",{className:"px-4 py-2",children:"Circular shift"}),e.jsx("td",{className:"px-4 py-2",children:"Autocorrelation + distribution"})]})]})]})}),e.jsx(T,{title:"mc_permutation_nifty.py",runnable:!0,code:`import numpy as np

def sharpe_ratio(returns, rf_annual=0.065):
    """Annualized Sharpe with Indian risk-free rate (RBI repo)."""
    rf_daily = (1 + rf_annual) ** (1/252) - 1
    excess = returns - rf_daily
    if np.std(excess) == 0:
        return 0.0
    return np.mean(excess) / np.std(excess) * np.sqrt(252)

def mc_permutation_test(returns, signals, n_perms=1000,
                        block_size=None, seed=42):
    """Monte Carlo permutation test for strategy significance."""
    rng = np.random.RandomState(seed)

    strat_returns = signals * returns
    observed_sharpe = sharpe_ratio(strat_returns)

    null_sharpes = []
    n = len(signals)

    for _ in range(n_perms):
        if block_size:
            n_blocks = n // block_size + 1
            perm_idx = np.concatenate([
                np.arange(start, min(start + block_size, n))
                for start in rng.choice(n - block_size + 1, n_blocks)
            ])[:n]
            perm_signals = signals[perm_idx]
        else:
            perm_signals = rng.permutation(signals)

        perm_returns = perm_signals * returns
        null_sharpes.append(sharpe_ratio(perm_returns))

    null_sharpes = np.array(null_sharpes)
    p_value = (1 + np.sum(null_sharpes >= observed_sharpe)) / (1 + n_perms)

    return {
        'observed_sharpe': observed_sharpe,
        'null_mean': np.mean(null_sharpes),
        'null_std': np.std(null_sharpes),
        'null_95pct': np.percentile(null_sharpes, 95),
        'null_99pct': np.percentile(null_sharpes, 99),
        'p_value': p_value,
        'n_perms': n_perms,
    }

# --- Demo: Nifty 50 momentum strategy ---
np.random.seed(42)
n_days = 1260

returns = np.random.normal(0.12/252, 0.16/np.sqrt(252), n_days)

lookback = 20
cum_ret = np.array([np.sum(returns[max(0,i-lookback):i])
                     for i in range(n_days)])
signals = np.where(cum_ret > 0, 1.0, -1.0)

print("=== Monte Carlo Permutation Test ===")
print("Strategy: 20-day Nifty Momentum")
print(f"Data: {n_days} trading days\\n")

result = mc_permutation_test(returns, signals, n_perms=2000)
print("--- Simple Shuffle ---")
print(f"Observed Sharpe: {result['observed_sharpe']:.3f}")
print(f"Null Mean:       {result['null_mean']:.3f}")
print(f"Null Std:        {result['null_std']:.3f}")
print(f"Null 95th pct:   {result['null_95pct']:.3f}")
print(f"Null 99th pct:   {result['null_99pct']:.3f}")
print(f"p-value:         {result['p_value']:.4f}")
print(f"Significant at 5%: {'YES' if result['p_value'] < 0.05 else 'NO'}")

print("\\n--- Block Shuffle (block=21 trading days) ---")
result_block = mc_permutation_test(returns, signals, n_perms=2000,
                                    block_size=21)
print(f"Observed Sharpe: {result_block['observed_sharpe']:.3f}")
print(f"Null Mean:       {result_block['null_mean']:.3f}")
print(f"p-value:         {result_block['p_value']:.4f}")
print(f"Significant at 5%: {'YES' if result_block['p_value'] < 0.05 else 'NO'}")

n_strategies = 20
bonferroni_threshold = 0.05 / n_strategies
print(f"\\n--- Multiple Testing Correction ---")
print(f"Strategies tested: {n_strategies}")
print(f"Bonferroni threshold: {bonferroni_threshold:.4f}")
print(f"Still significant: {'YES' if result['p_value'] < bonferroni_threshold else 'NO'}")`}),e.jsx(C,{title:"Testing a Nifty Bank Pairs Strategy",difficulty:"intermediate",problem:"A pairs trading strategy on HDFC Bank / ICICI Bank shows an observed Sharpe of 1.8. With 5,000 permutations, 42 permuted Sharpes exceed 1.8. Is this significant at the 1% level?",solution:[{step:"Compute the p-value",formula:"p = \\frac{1 + 42}{1 + 5000} = \\frac{43}{5001} = 0.0086",explanation:"The +1 in numerator and denominator ensures the p-value is well-defined."},{step:"Compare with significance level",formula:"p = 0.0086 < \\alpha = 0.01"},{step:"Conclude",formula:"\\text{Reject } H_0 \\text{ at } \\alpha = 0.01",explanation:"The HDFC-ICICI pairs strategy Sharpe of 1.8 is unlikely due to chance. However, apply multiple testing correction if other pairs were also tested."}]}),e.jsx(b,{title:"Multiple Testing Warning",type:"warning",children:e.jsxs("p",{children:["If you tested ",e.jsx(t.InlineMath,{math:"M"})," strategies before selecting the best one, apply Bonferroni correction: ",e.jsx(t.InlineMath,{math:"\\alpha_{\\text{adj}} = \\alpha / M"}),". For Indian market quants screening across Nifty 200 stocks with 10 parameter combos, ",e.jsx(t.InlineMath,{math:"M = 2000"}),", making the threshold"," ",e.jsx(t.InlineMath,{math:"0.05 / 2000 = 0.000025"}),". The Holm-Bonferroni step-down procedure provides a less conservative alternative."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Deflated Sharpe Ratio"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The Deflated Sharpe Ratio (DSR) adjusts the observed Sharpe for the number of strategies tested, providing a more direct test than Bonferroni correction. It computes the probability that the observed Sharpe exceeds the expected maximum Sharpe under the null of no skill:"}),e.jsx(t.BlockMath,{math:"\\text{DSR} = P\\left[\\hat{S} > \\hat{S}_0 \\cdot \\sqrt{V[\\hat{S}]}\\right], \\quad \\hat{S}_0 \\approx (1 - \\gamma) \\Phi^{-1}\\left(1 - \\frac{1}{N}\\right)"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"N"})," is the number of strategies tried,"," ",e.jsx(t.InlineMath,{math:"\\gamma"})," is Euler's constant, and"," ",e.jsx(t.InlineMath,{math:"\\Phi^{-1}"})," is the inverse normal CDF. For Indian market quants who typically test 50-200 parameter combinations, the DSR threshold is approximately Sharpe ",">"," 2.0 for a strategy to be considered genuine."]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Strategies Tested"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Expected Max Sharpe (null)"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Min Required Sharpe"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"10"}),e.jsx("td",{className:"px-4 py-2",children:"1.28"}),e.jsx("td",{className:"px-4 py-2",children:"~1.5"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"50"}),e.jsx("td",{className:"px-4 py-2",children:"1.74"}),e.jsx("td",{className:"px-4 py-2",children:"~2.0"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"200"}),e.jsx("td",{className:"px-4 py-2",children:"2.10"}),e.jsx("td",{className:"px-4 py-2",children:"~2.5"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"1000"}),e.jsx("td",{className:"px-4 py-2",children:"2.52"}),e.jsx("td",{className:"px-4 py-2",children:"~3.0"})]})]})]})}),e.jsx(b,{title:"Validation Pipeline Summary",type:"historical",children:e.jsxs("ul",{className:"space-y-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Step 1:"})," Walk-Forward Analysis -- verify OOS performance across rolling windows covering multiple Indian market regimes."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Step 2:"})," Purged K-Fold CV -- for ML strategies, validate with proper temporal purging aligned to label horizons."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Step 3:"})," Monte Carlo Permutation Test -- confirm the observed Sharpe is statistically significant using block permutation."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Step 4:"})," Deflated Sharpe Ratio -- adjust for multiple testing to ensure the strategy is not a fluke from parameter mining."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Step 5:"})," Paper trade on NSE for 3-6 months before allocating real capital, comparing live fills with backtest expectations."]})]})}),e.jsx(b,{title:"Key Takeaway",type:"tip",children:e.jsxs("p",{children:["Monte Carlo permutation tests are the final gate before deploying capital. A strategy that passes walk-forward analysis and purged CV but fails the permutation test (p ",">"," 0.05 after multiple testing correction) should not be traded. For Indian markets, always use ",e.jsx("strong",{children:"block permutation"})," with block size of 21 trading days (one month) to preserve the autocorrelation structure inherent in NSE order flow. Combine with the Deflated Sharpe Ratio to account for the number of strategies tested during development."]})})]})}const Ne=Object.freeze(Object.defineProperty({__proto__:null,default:re},Symbol.toStringTag,{value:"Module"}));function ie(){const[i,_]=c.useState(12),[a,N]=c.useState(18),[s,k]=c.useState(5),[l,x]=c.useState(.02),o=60,f=1/252,m=[];for(let n=0;n<Math.min(s,8);n++){const j=[22e3];let v=(n+1)*7+13;for(let I=1;I<o;I++){v=v*1103515245+12345&2147483647;const w=(v/2147483647-.5)*3.4,A=(i/100-.5*(a/100)**2)*f,F=a/100*Math.sqrt(f)*w;v=v*1103515245+12345&2147483647;const d=v/2147483647<l?w>0?.03:-.04:0,g=j[I-1]*Math.exp(A+F+d);j.push(g)}m.push(j)}const h=m.flat(),p=Math.min(...h),u=Math.max(...h)-p||1,y=["#6366f1","#22c55e","#ef4444","#f59e0b","#8b5cf6","#06b6d4","#ec4899","#14b8a6"];return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Synthetic Nifty Price Paths"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Generate synthetic Nifty 50 paths using GBM with Merton jump diffusion. Adjust drift, volatility, and jump intensity to see different market regimes."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Drift ",e.jsx(t.InlineMath,{math:"\\mu"})," = ",i,"% annual"]}),e.jsx("input",{type:"range",min:"-10",max:"30",step:"1",value:i,onChange:n=>_(parseInt(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Vol ",e.jsx(t.InlineMath,{math:"\\sigma"})," = ",a,"% annual"]}),e.jsx("input",{type:"range",min:"5",max:"50",step:"1",value:a,onChange:n=>N(parseInt(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Paths = ",s]}),e.jsx("input",{type:"range",min:"1",max:"8",step:"1",value:s,onChange:n=>k(parseInt(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Jump Intensity = ",(l*100).toFixed(1),"%"]}),e.jsx("input",{type:"range",min:"0",max:"0.1",step:"0.005",value:l,onChange:n=>x(parseFloat(n.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 520 200",className:"w-full max-w-xl mx-auto block","aria-label":"Synthetic price paths",children:[[0,.25,.5,.75,1].map(n=>{const j=180-n*160,v=(p+n*u).toFixed(0);return e.jsxs("g",{children:[e.jsx("line",{x1:"45",y1:j,x2:"510",y2:j,stroke:"#e5e7eb",strokeWidth:"0.5"}),e.jsx("text",{x:"42",y:j+3,textAnchor:"end",className:"text-[7px]",fill:"#9ca3af",children:v})]},n)}),m.map((n,j)=>{const v=n.map((I,w)=>{const A=50+w/(o-1)*460,F=180-(I-p)/u*160;return`${A},${F}`}).join(" ");return e.jsx("polyline",{points:v,fill:"none",stroke:y[j],strokeWidth:"1.5",opacity:"0.7"},j)}),e.jsx("circle",{cx:"50",cy:180-(22e3-p)/u*160,r:"3",fill:"#6366f1"}),e.jsx("text",{x:"50",y:180-(22e3-p)/u*160-8,textAnchor:"middle",className:"text-[8px] font-bold",fill:"#6366f1",children:"22,000"})]})]})}function ne(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Synthetic Indian Market Data Generation"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Historical data for Indian markets is limited -- NSE has only been fully electronic since 2000, and high-quality intraday data is scarce before 2015. Synthetic data generation allows us to create realistic simulated market data that preserves the statistical properties of Indian equities: fat tails, volatility clustering, mean reversion, and jump dynamics characteristic of emerging markets."}),e.jsx(S,{title:"Synthetic Financial Data",label:"Definition 8.9",definition:"Synthetic financial data is artificially generated time series that mimics the statistical properties (marginal distribution, autocorrelation structure, cross-correlations, and stylized facts) of real market data without being a direct copy. It is used for strategy stress testing, model validation, and augmenting limited historical datasets.",notation:e.jsxs(e.Fragment,{children:["A synthetic path ",e.jsx(t.InlineMath,{math:"\\tilde{S}_t"})," is calibrated to match moments of the real process: ",e.jsx(t.InlineMath,{math:"\\mathbb{E}[\\tilde{S}] \\approx \\mathbb{E}[S]"}),", ",e.jsx(t.InlineMath,{math:"\\text{Var}(\\tilde{S}) \\approx \\text{Var}(S)"}),", and higher moments."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"GBM with Merton Jump Diffusion"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The simplest model calibrated to Indian equities is Geometric Brownian Motion with Merton jump diffusion, which captures both continuous volatility and sudden jumps (common in Nifty during budget announcements, RBI policy decisions, or geopolitical events):"}),e.jsx(t.BlockMath,{math:"\\frac{dS_t}{S_t} = (\\mu - \\lambda \\bar{k})\\,dt + \\sigma\\,dW_t + J_t\\,dN_t"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"\\mu"})," is the drift (Nifty long-run CAGR ~12%),"," ",e.jsx(t.InlineMath,{math:"\\sigma"})," is diffusion volatility (~15-18% for Nifty),"," ",e.jsx(t.InlineMath,{math:"N_t"})," is a Poisson process with intensity"," ",e.jsx(t.InlineMath,{math:"\\lambda"}),", and ",e.jsx(t.InlineMath,{math:"J_t \\sim \\mathcal{N}(\\mu_J, \\sigma_J^2)"})," ","is the jump size. For simulation:"]}),e.jsx(t.BlockMath,{math:"\\ln S_{t+\\Delta t} = \\ln S_t + \\left(\\mu - \\frac{\\sigma^2}{2} - \\lambda\\bar{k}\\right)\\Delta t + \\sigma\\sqrt{\\Delta t}\\,Z + \\sum_{i=1}^{N(\\Delta t)} J_i"}),e.jsx(M,{title:"Moment Matching for Indian Equities",label:"Theorem 8.7",statement:e.jsxs(e.Fragment,{children:["For a Merton jump-diffusion model calibrated to Nifty 50 daily returns, the excess kurtosis ",e.jsx(t.InlineMath,{math:"\\kappa"})," of the return distribution is:"]}),formula:"\\kappa = \\frac{3\\lambda(\\sigma_J^4 + 4\\mu_J^2\\sigma_J^2)}{\\left(\\sigma^2 + \\lambda(\\mu_J^2 + \\sigma_J^2)\\right)^2}",proof:e.jsxs(e.Fragment,{children:["The fourth central moment of the mixture of normals (continuous + jump component) can be computed via the law of total cumulance. The Nifty 50 exhibits excess kurtosis of approximately 4-6, requiring ",e.jsx(t.InlineMath,{math:"\\lambda \\approx 5\\text{-}10"})," jumps per year with ",e.jsx(t.InlineMath,{math:"\\sigma_J \\approx 2\\text{-}3\\%"})," to match the observed tail behavior."]})}),e.jsx(ie,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Stylized Facts Checklist"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Stylized Fact"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Nifty 50 Value"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Model"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Fat tails (kurtosis)"}),e.jsx("td",{className:"px-4 py-2",children:"~5.2"}),e.jsx("td",{className:"px-4 py-2",children:"Jump diffusion"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Volatility clustering"}),e.jsx("td",{className:"px-4 py-2",children:"GARCH(1,1) sig."}),e.jsx("td",{className:"px-4 py-2",children:"GARCH / SV"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Leverage effect"}),e.jsx("td",{className:"px-4 py-2",children:"Negative correlation"}),e.jsx("td",{className:"px-4 py-2",children:"EGARCH"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Mean reversion"}),e.jsx("td",{className:"px-4 py-2",children:"HL ~25 days"}),e.jsx("td",{className:"px-4 py-2",children:"OU process"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Cross-correlation"}),e.jsx("td",{className:"px-4 py-2",children:"~0.4 avg pairwise"}),e.jsx("td",{className:"px-4 py-2",children:"Factor model"})]})]})]})}),e.jsx(T,{title:"synthetic_nifty.py",runnable:!0,code:`import numpy as np

class IndianMarketSimulator:
    """Generate synthetic Indian equity market data.

    Supports GBM, Merton Jump Diffusion, and GARCH models
    calibrated to NSE/BSE characteristics.
    """

    def __init__(self, seed=42):
        self.rng = np.random.RandomState(seed)

    def gbm(self, S0, mu, sigma, n_days, n_paths=1):
        """Geometric Brownian Motion."""
        dt = 1 / 252
        Z = self.rng.standard_normal((n_days, n_paths))
        drift = (mu - 0.5 * sigma**2) * dt
        diffusion = sigma * np.sqrt(dt) * Z
        log_returns = drift + diffusion
        log_prices = np.cumsum(log_returns, axis=0)
        prices = S0 * np.exp(log_prices)
        return np.vstack([np.full(n_paths, S0), prices])

    def merton_jump_diffusion(self, S0, mu, sigma, lam, mu_j, sigma_j,
                                n_days, n_paths=1):
        """Merton Jump Diffusion for Indian equity simulation."""
        dt = 1 / 252
        k_bar = np.exp(mu_j + 0.5 * sigma_j**2) - 1

        prices = np.zeros((n_days + 1, n_paths))
        prices[0] = S0

        for t in range(n_days):
            Z = self.rng.standard_normal(n_paths)
            N = self.rng.poisson(lam * dt, n_paths)
            J = np.zeros(n_paths)
            for i in range(n_paths):
                if N[i] > 0:
                    J[i] = np.sum(self.rng.normal(mu_j, sigma_j, N[i]))

            drift = (mu - 0.5 * sigma**2 - lam * k_bar) * dt
            diffusion = sigma * np.sqrt(dt) * Z
            log_ret = drift + diffusion + J
            prices[t + 1] = prices[t] * np.exp(log_ret)

        return prices

    def garch_returns(self, mu, omega, alpha, beta, n_days):
        """GARCH(1,1) return simulation."""
        returns = np.zeros(n_days)
        sigma2 = np.zeros(n_days)
        sigma2[0] = omega / (1 - alpha - beta)

        for t in range(1, n_days):
            sigma2[t] = omega + alpha * returns[t-1]**2 + beta * sigma2[t-1]
            returns[t] = mu/252 + np.sqrt(sigma2[t]) * self.rng.standard_normal()

        return returns, np.sqrt(sigma2 * 252)

# --- Demo ---
sim = IndianMarketSimulator(seed=42)

nifty_gbm = sim.gbm(S0=22000, mu=0.12, sigma=0.16, n_days=252, n_paths=3)
print("=== Synthetic Nifty 50 Data ===\\n")
print("1. GBM Paths (3 scenarios)")
for i in range(3):
    ret = (nifty_gbm[-1, i] / nifty_gbm[0, i] - 1) * 100
    print(f"   Path {i+1}: {nifty_gbm[0,i]:.0f} -> {nifty_gbm[-1,i]:.0f} ({ret:+.1f}%)")

nifty_mjd = sim.merton_jump_diffusion(
    S0=22000, mu=0.12, sigma=0.15,
    lam=8, mu_j=-0.01, sigma_j=0.025,
    n_days=252, n_paths=5
)
print("\\n2. Merton Jump Diffusion (5 paths)")
daily_rets = np.diff(np.log(nifty_mjd), axis=0)
print(f"   Mean daily return: {np.mean(daily_rets)*252*100:.1f}% annualized")
print(f"   Daily vol:         {np.std(daily_rets)*np.sqrt(252)*100:.1f}% annualized")
print(f"   Kurtosis:          {float(np.mean([np.mean((daily_rets[:,i] - np.mean(daily_rets[:,i]))**4) / np.std(daily_rets[:,i])**4 for i in range(5)])):.2f}")

garch_ret, garch_vol = sim.garch_returns(
    mu=0.12, omega=0.00001, alpha=0.08, beta=0.88, n_days=252
)
print("\\n3. GARCH(1,1) Returns")
print(f"   Annualized return: {np.mean(garch_ret)*252*100:.1f}%")
print(f"   Vol range:         {np.min(garch_vol)*100:.1f}% - {np.max(garch_vol)*100:.1f}%")
print(f"   Vol persistence:   {0.08 + 0.88:.2f} (alpha + beta)")`}),e.jsx(C,{title:"Calibrating Jump Parameters for Nifty",difficulty:"intermediate",problem:"Nifty 50 daily returns from 2019-2024 show excess kurtosis of 5.1 and annualized volatility of 16%. Assuming diffusion vol of 14% and average jump size of -1%, what jump intensity and jump vol are needed?",solution:[{step:"Set up the kurtosis equation",formula:"\\kappa = \\frac{3\\lambda(\\sigma_J^4 + 4\\mu_J^2\\sigma_J^2)}{(\\sigma^2 + \\lambda(\\mu_J^2 + \\sigma_J^2))^2} = 5.1"},{step:"Use the total variance constraint",formula:"\\sigma_{\\text{total}}^2 = \\sigma^2 + \\lambda(\\mu_J^2 + \\sigma_J^2) = 0.16^2 = 0.0256",explanation:"This gives lambda * (0.01^2 + sigma_J^2) = 0.0256 - 0.14^2 = 0.006."},{step:"Solve simultaneously",formula:"\\lambda \\approx 8, \\quad \\sigma_J \\approx 2.7\\%",explanation:"Approximately 8 jumps per year with 2.7% jump volatility matches the observed excess kurtosis of 5.1."}]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Advanced Synthetic Data Methods"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Beyond parametric models, modern machine learning methods can generate more realistic synthetic data that captures non-linear dependencies:"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Method"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Strengths"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Complexity"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Best For"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"GBM"}),e.jsx("td",{className:"px-4 py-2",children:"Simple, fast"}),e.jsx("td",{className:"px-4 py-2",children:"Low"}),e.jsx("td",{className:"px-4 py-2",children:"Quick sanity checks"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Merton Jump"}),e.jsx("td",{className:"px-4 py-2",children:"Fat tails"}),e.jsx("td",{className:"px-4 py-2",children:"Low"}),e.jsx("td",{className:"px-4 py-2",children:"Tail risk scenarios"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"GARCH"}),e.jsx("td",{className:"px-4 py-2",children:"Vol clustering"}),e.jsx("td",{className:"px-4 py-2",children:"Medium"}),e.jsx("td",{className:"px-4 py-2",children:"Vol-dependent strategies"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Block Bootstrap"}),e.jsx("td",{className:"px-4 py-2",children:"Nonparametric"}),e.jsx("td",{className:"px-4 py-2",children:"Low"}),e.jsx("td",{className:"px-4 py-2",children:"Preserving all dependencies"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"TimeGAN"}),e.jsx("td",{className:"px-4 py-2",children:"Learns from data"}),e.jsx("td",{className:"px-4 py-2",children:"High"}),e.jsx("td",{className:"px-4 py-2",children:"Multi-asset simulation"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Copula-Marginal"}),e.jsx("td",{className:"px-4 py-2",children:"Separates marginals from dependence"}),e.jsx("td",{className:"px-4 py-2",children:"Medium"}),e.jsx("td",{className:"px-4 py-2",children:"Portfolio correlation stress"})]})]})]})}),e.jsx(b,{title:"Multi-Asset Correlation",type:"tip",children:e.jsxs("p",{children:["For portfolio-level testing on Nifty 50 constituents, single-asset simulation is insufficient. Use a ",e.jsx("strong",{children:"factor-copula model"})," to generate correlated returns: first simulate ",e.jsx(t.InlineMath,{math:"k"})," common factors (typically 3-5 for Indian equities: market, size, value), then generate idiosyncratic returns for each stock. The Nifty 50 average pairwise correlation of ~0.4 must be preserved in synthetic data. Gaussian copulas underestimate tail dependence -- use Student-t copula with 5-8 degrees of freedom for more realistic joint crash scenarios."]})}),e.jsx(b,{title:"Historical Context",type:"historical",children:e.jsxs("ul",{className:"space-y-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"NSE History:"})," NSE began operations in 1994 with electronic trading. High-quality daily data is available from 2000 onwards, but corporate action adjustments before 2005 may be unreliable."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Regime Shifts:"})," Major structural changes include: FII liberalization (2000-2003), algo trading permission (2008), co-location controversy (2015), and SEBI margin rules overhaul (2020-2021). Synthetic data helps bridge gaps where real data is sparse or non-representative."]})]})}),e.jsx(b,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Synthetic data is essential for stress-testing Indian market strategies beyond the limited 20+ year NSE history. The Merton jump diffusion model with 6-10 jumps per year, negative mean jump, and GARCH volatility dynamics provides a realistic synthetic generator for Nifty-class returns. Always validate synthetic data against real market moments and stylized facts before using it for strategy development."})})]})}const _e=Object.freeze(Object.defineProperty({__proto__:null,default:ne},Symbol.toStringTag,{value:"Module"}));function le(){const[i,_]=c.useState(30),[a,N]=c.useState(40),[s,k]=c.useState(30),[l,x]=c.useState(.1),o=i+a+s,f=(i/o*100).toFixed(0),m=(a/o*100).toFixed(0),h=(s/o*100).toFixed(0),p=22e3,r=22500,u=a>40?1.2:a>20?.5:-.3,y=s/100*.8,n=(f/100*(r-p)+u*200+y*150)*(1-l),j=p+n,v=(s*.3+a*.2+l*500)/o*20,I=(.02+s*.001+l*.05).toFixed(3);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: NSE Agent-Based Market Simulator"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust the mix of agent types and market impact to see how emergent price dynamics and volatility change in a simulated NSE order book."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Fundamental Agents = ",i," (",f,"%)"]}),e.jsx("input",{type:"range",min:"5",max:"80",step:"5",value:i,onChange:w=>_(parseInt(w.target.value)),className:"h-2 w-full cursor-pointer accent-blue-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Momentum Agents = ",a," (",m,"%)"]}),e.jsx("input",{type:"range",min:"5",max:"80",step:"5",value:a,onChange:w=>N(parseInt(w.target.value)),className:"h-2 w-full cursor-pointer accent-green-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Noise Agents = ",s," (",h,"%)"]}),e.jsx("input",{type:"range",min:"5",max:"80",step:"5",value:s,onChange:w=>k(parseInt(w.target.value)),className:"h-2 w-full cursor-pointer accent-red-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Market Impact = ",(l*100).toFixed(0),"%"]}),e.jsx("input",{type:"range",min:"0",max:"0.5",step:"0.05",value:l,onChange:w=>x(parseFloat(w.target.value)),className:"h-2 w-full cursor-pointer accent-purple-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 520 200",className:"w-full max-w-xl mx-auto block","aria-label":"Agent-based simulation",children:[e.jsx("rect",{x:"30",y:"20",width:i/o*200,height:"20",fill:"#3b82f6",opacity:"0.6",rx:"3"}),e.jsx("rect",{x:30+i/o*200,y:"20",width:a/o*200,height:"20",fill:"#22c55e",opacity:"0.6",rx:"3"}),e.jsx("rect",{x:30+(i+a)/o*200,y:"20",width:s/o*200,height:"20",fill:"#ef4444",opacity:"0.6",rx:"3"}),e.jsx("text",{x:"130",y:"57",textAnchor:"middle",className:"text-[8px]",fill:"#6b7280",children:"Agent Mix"}),e.jsx("line",{x1:"240",y1:"30",x2:"280",y2:"30",stroke:"#9ca3af",strokeWidth:"1.5",markerEnd:"url(#absArrow)"}),e.jsx("defs",{children:e.jsx("marker",{id:"absArrow",markerWidth:"8",markerHeight:"6",refX:"8",refY:"3",orient:"auto",children:e.jsx("polygon",{points:"0 0, 8 3, 0 6",fill:"#9ca3af"})})}),e.jsx("rect",{x:"290",y:"10",width:"200",height:"80",rx:"8",fill:"#f3f4f6",stroke:"#d1d5db",strokeWidth:"1"}),e.jsx("text",{x:"390",y:"28",textAnchor:"middle",className:"text-[9px] font-bold",fill:"#374151",children:"Emergent Properties"}),e.jsxs("text",{x:"300",y:"45",className:"text-[8px]",fill:"#6b7280",children:["Price: INR ",j.toFixed(0)]}),e.jsxs("text",{x:"300",y:"58",className:"text-[8px]",fill:"#6b7280",children:["Volatility: ",v.toFixed(1),"%"]}),e.jsxs("text",{x:"300",y:"71",className:"text-[8px]",fill:"#6b7280",children:["Spread: ",I,"%"]}),e.jsxs("text",{x:"300",y:"84",className:"text-[8px]",fill:"#6b7280",children:["Fair Value: INR ",r]}),e.jsx("rect",{x:"100",y:"110",width:"12",height:"8",fill:"#3b82f6",opacity:"0.6",rx:"1"}),e.jsx("text",{x:"116",y:"118",className:"text-[8px]",fill:"#6b7280",children:"Fundamental (FII/DII)"}),e.jsx("rect",{x:"220",y:"110",width:"12",height:"8",fill:"#22c55e",opacity:"0.6",rx:"1"}),e.jsx("text",{x:"236",y:"118",className:"text-[8px]",fill:"#6b7280",children:"Momentum (Algo)"}),e.jsx("rect",{x:"330",y:"110",width:"12",height:"8",fill:"#ef4444",opacity:"0.6",rx:"1"}),e.jsx("text",{x:"346",y:"118",className:"text-[8px]",fill:"#6b7280",children:"Noise (Retail)"}),e.jsxs("text",{x:"260",y:"148",textAnchor:"middle",className:"text-[10px] font-bold",fill:j>r?"#dc2626":"#16a34a",children:[j>r?"OVERVALUED":"UNDERVALUED"," by ",Math.abs(j-r).toFixed(0)," INR"]}),e.jsx("rect",{x:"80",y:"160",width:"360",height:"12",rx:"6",fill:"#e5e7eb"}),e.jsx("rect",{x:"80",y:"160",width:Math.min(360,Math.max(10,(j-21500)/1500*360)),height:"12",rx:"6",fill:j>r?"#ef4444":"#22c55e",opacity:"0.5"}),e.jsx("text",{x:"80",y:"186",className:"text-[7px]",fill:"#9ca3af",children:"21,500"}),e.jsx("text",{x:"440",y:"186",textAnchor:"end",className:"text-[7px]",fill:"#9ca3af",children:"23,000"})]})]})}function oe(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Agent-Based Market Simulation"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Agent-based models (ABMs) simulate financial markets as emergent phenomena arising from the interactions of heterogeneous traders. Unlike top-down models (GBM, GARCH), ABMs can reproduce complex market phenomena like flash crashes, bubbles, and liquidity crises. For Indian markets, ABMs are particularly useful for modeling the interplay between FIIs (Foreign Institutional Investors), DIIs (Domestic Institutional Investors), and the large retail investor base that characterizes NSE."}),e.jsx(S,{title:"Agent-Based Model (ABM)",label:"Definition 8.10",definition:"An agent-based model is a computational model that simulates a market as a system of autonomous agents, each with individual decision rules, interacting through a common order book or price mechanism. Aggregate market behavior (price, volume, volatility) emerges from the collective actions of these agents without being explicitly programmed.",notation:e.jsxs(e.Fragment,{children:["Each agent ",e.jsx(t.InlineMath,{math:"a_i"})," has a demand function ",e.jsx(t.InlineMath,{math:"d_i(P_t, \\mathcal{I}_t^i)"})," where ",e.jsx(t.InlineMath,{math:"\\mathcal{I}_t^i"})," is the agent's private information set. Market clearing gives ",e.jsx(t.InlineMath,{math:"P_t^* = \\arg\\min_P |\\sum_i d_i(P, \\mathcal{I}_t^i)|"}),"."]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Indian Market Agent Taxonomy"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The NSE ecosystem can be modelled with three canonical agent types that reflect the actual participant mix:"}),e.jsx(t.BlockMath,{math:"P_{t+1} = P_t + \\frac{1}{\\lambda} \\left[\\sum_{i \\in \\mathcal{F}} d_i^F + \\sum_{j \\in \\mathcal{M}} d_j^M + \\sum_{k \\in \\mathcal{N}} d_k^N\\right]"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Agent Type"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"NSE Analogue"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Decision Rule"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Market Share"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Fundamentalist"}),e.jsx("td",{className:"px-4 py-2",children:"FII / DII"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"d_i = \\alpha(V_t - P_t)"})}),e.jsx("td",{className:"px-4 py-2",children:"~45%"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Momentum"}),e.jsx("td",{className:"px-4 py-2",children:"Algo / Prop"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"d_j = \\beta \\cdot \\text{sgn}(\\Delta P)"})}),e.jsx("td",{className:"px-4 py-2",children:"~25%"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Noise"}),e.jsx("td",{className:"px-4 py-2",children:"Retail"}),e.jsx("td",{className:"px-4 py-2",children:e.jsx(t.InlineMath,{math:"d_k \\sim \\mathcal{N}(0, \\sigma_k^2)"})}),e.jsx("td",{className:"px-4 py-2",children:"~30%"})]})]})]})}),e.jsx(M,{title:"Price Convergence in ABM",label:"Theorem 8.8",statement:e.jsxs(e.Fragment,{children:["In a market with ",e.jsx(t.InlineMath,{math:"n_F"})," fundamentalists with intensity ",e.jsx(t.InlineMath,{math:"\\alpha"})," and ",e.jsx(t.InlineMath,{math:"n_M"})," momentum agents with intensity ",e.jsx(t.InlineMath,{math:"\\beta"}),", the price converges to fundamental value if and only if:"]}),formula:"n_F \\alpha > n_M \\beta",proof:e.jsxs(e.Fragment,{children:["The price update equation can be written as a linear recurrence: ",e.jsx(t.InlineMath,{math:"P_{t+1} - V = (1 - n_F\\alpha/\\lambda + n_M\\beta/\\lambda)(P_t - V) + \\epsilon_t"}),". For the deviation ",e.jsx(t.InlineMath,{math:"P_t - V"})," to converge to zero, the coefficient must have absolute value less than 1, which requires ",e.jsx(t.InlineMath,{math:"n_F\\alpha > n_M\\beta"}),". When momentum agents dominate, prices diverge from fundamentals -- creating bubbles, as observed in Indian mid-cap rallies."]})}),e.jsx(le,{}),e.jsx(T,{title:"agent_based_nse.py",runnable:!0,code:`import numpy as np

class Agent:
    """Base agent class for NSE simulation."""
    def __init__(self, agent_id, cash, agent_type):
        self.id = agent_id
        self.cash = cash
        self.type = agent_type
        self.position = 0

    def decide(self, price, history):
        raise NotImplementedError

class FundamentalAgent(Agent):
    """FII/DII-style value investor."""
    def __init__(self, agent_id, cash, fundamental_value, alpha=0.05):
        super().__init__(agent_id, cash, 'fundamental')
        self.fv = fundamental_value
        self.alpha = alpha

    def decide(self, price, history):
        deviation = (self.fv - price) / price
        return self.alpha * deviation

class MomentumAgent(Agent):
    """Algorithmic trend follower."""
    def __init__(self, agent_id, cash, lookback=20, beta=0.03):
        super().__init__(agent_id, cash, 'momentum')
        self.lookback = lookback
        self.beta = beta

    def decide(self, price, history):
        if len(history) < self.lookback:
            return 0.0
        trend = (price - history[-self.lookback]) / history[-self.lookback]
        return self.beta * np.sign(trend) * min(abs(trend) * 10, 1)

class NoiseAgent(Agent):
    """Retail trader with random behavior."""
    def __init__(self, agent_id, cash, sigma=0.02):
        super().__init__(agent_id, cash, 'noise')
        self.sigma = sigma

    def decide(self, price, history):
        return np.random.normal(0, self.sigma)

class NSEMarketSimulator:
    """Agent-based simulator for NSE-like market."""

    def __init__(self, initial_price, market_depth=1000):
        self.price = initial_price
        self.depth = market_depth
        self.agents = []
        self.history = [initial_price]

    def add_agents(self, agents):
        self.agents.extend(agents)

    def step(self):
        total_demand = 0
        for agent in self.agents:
            demand = agent.decide(self.price, self.history)
            total_demand += demand

        price_change = total_demand / self.depth * self.price
        self.price = max(self.price + price_change, 1)
        self.history.append(self.price)
        return self.price

    def run(self, n_steps):
        for _ in range(n_steps):
            self.step()
        return np.array(self.history)

# --- Demo ---
np.random.seed(42)
sim = NSEMarketSimulator(initial_price=22000, market_depth=500)

agents = []
for i in range(15):
    agents.append(FundamentalAgent(i, 1e8, 22500, alpha=0.06))
for i in range(15, 30):
    agents.append(FundamentalAgent(i, 5e7, 22200, alpha=0.04))
for i in range(30, 55):
    agents.append(MomentumAgent(i, 2e7, lookback=20, beta=0.025))
for i in range(55, 100):
    agents.append(NoiseAgent(i, 5e6, sigma=0.015))

sim.add_agents(agents)
prices = sim.run(252)
returns = np.diff(np.log(prices))

print("=== NSE Agent-Based Simulation ===")
print(f"Agents: {len(agents)} (15 FII + 15 DII + 25 Algo + 45 Retail)")
print(f"Initial price: INR {prices[0]:.0f}")
print(f"Final price:   INR {prices[-1]:.0f}")
print(f"Annual return: {(prices[-1]/prices[0] - 1)*100:.1f}%")
print(f"Annual vol:    {np.std(returns)*np.sqrt(252)*100:.1f}%")
print(f"Sharpe ratio:  {np.mean(returns)/np.std(returns)*np.sqrt(252):.2f}")
print(f"Max drawdown:  {(1 - np.min(prices/np.maximum.accumulate(prices)))*100:.1f}%")
print(f"Kurtosis:      {float(np.mean((returns - np.mean(returns))**4)/np.std(returns)**4):.2f}")

acf1 = np.corrcoef(returns[1:], returns[:-1])[0,1]
abs_acf1 = np.corrcoef(np.abs(returns[1:]), np.abs(returns[:-1]))[0,1]
print(f"\\n--- Stylized Facts ---")
print(f"Return ACF(1):     {acf1:.3f} (should be ~0)")
print(f"|Return| ACF(1):   {abs_acf1:.3f} (should be >0, vol clustering)")`}),e.jsx(C,{title:"FII Outflow Shock Simulation",difficulty:"advanced",problem:"In March 2020, FIIs sold INR 1.1 lakh crore of Indian equities. In our ABM with 15 FII agents (alpha=0.06), how does a sudden shift in FII fundamental value from 22,500 to 18,000 affect equilibrium price?",solution:[{step:"Compute new FII demand at current price",formula:"d_F = 15 \\times 0.06 \\times \\frac{18000 - 22000}{22000} = 15 \\times 0.06 \\times (-0.182) = -0.164",explanation:"FIIs now see the market as overvalued and generate strong sell demand."},{step:"Find new equilibrium price",formula:"P^* \\text{ s.t. } n_F\\alpha(V_{\\text{new}} - P^*) + n_M\\beta\\cdot\\text{sgn}(P^* - P_0) + 0 = 0",explanation:"At equilibrium, total demand is zero. Momentum agents amplify the sell-off initially."},{step:"Approximate equilibrium",formula:"P^* \\approx \\frac{n_F\\alpha V_{\\text{new}}}{n_F\\alpha + n_M\\beta} \\approx 19{,}200",explanation:"The price overshoots and settles ~13% below, consistent with the actual Nifty COVID crash."}]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Calibration to NSE Data"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Calibrating an ABM to real NSE data requires matching both aggregate statistics and participant-level behavior. SEBI publishes monthly participant activity data that provides ground truth for agent population mix:"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Participant"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Cash Market %"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"F&O Market %"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Agent Type"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"FII"}),e.jsx("td",{className:"px-4 py-2",children:"~17%"}),e.jsx("td",{className:"px-4 py-2",children:"~15%"}),e.jsx("td",{className:"px-4 py-2",children:"Fundamental"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"DII (MF + Insurance)"}),e.jsx("td",{className:"px-4 py-2",children:"~12%"}),e.jsx("td",{className:"px-4 py-2",children:"~5%"}),e.jsx("td",{className:"px-4 py-2",children:"Fundamental"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Proprietary"}),e.jsx("td",{className:"px-4 py-2",children:"~25%"}),e.jsx("td",{className:"px-4 py-2",children:"~35%"}),e.jsx("td",{className:"px-4 py-2",children:"Momentum/HFT"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Retail"}),e.jsx("td",{className:"px-4 py-2",children:"~46%"}),e.jsx("td",{className:"px-4 py-2",children:"~45%"}),e.jsx("td",{className:"px-4 py-2",children:"Noise"})]})]})]})}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The calibration objective minimizes the distance between simulated and real market statistics. The loss function typically includes:"}),e.jsx(t.BlockMath,{math:"\\mathcal{L}(\\theta) = w_1 |\\sigma_{\\text{sim}} - \\sigma_{\\text{real}}|^2 + w_2 |\\kappa_{\\text{sim}} - \\kappa_{\\text{real}}|^2 + w_3 \\sum_{l=1}^{10} |\\rho_l^{\\text{sim}} - \\rho_l^{\\text{real}}|^2"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"\\theta"})," includes agent intensities, population fractions, and market depth. The weights"," ",e.jsx(t.InlineMath,{math:"w_1, w_2, w_3"})," balance volatility matching, tail behavior, and autocorrelation structure respectively."]}),e.jsx(b,{title:"Applications in Strategy Research",type:"historical",children:e.jsxs("ul",{className:"space-y-2",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Impact Estimation:"})," Before deploying a large-cap Nifty strategy, simulate the ABM with your strategy as an additional agent to estimate your own market impact on prices and execution quality."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Crowding Analysis:"})," Model what happens when multiple momentum agents adopt similar strategies -- the ABM naturally shows diminishing returns and flash-crash risk from crowded trades."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Regulatory Stress:"})," Simulate SEBI interventions like short-selling bans, margin increases, or circuit limit changes by modifying agent constraints and observing emergent market behavior."]})]})}),e.jsx(b,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Agent-based models provide a bottom-up simulation framework that naturally reproduces emergent market phenomena (fat tails, volatility clustering, crashes) without explicitly programming them. For Indian market strategy testing, ABMs are invaluable for simulating scenarios with no historical precedent -- such as simultaneous FII outflows with SEBI regulatory changes -- that statistical models cannot capture. The key calibration parameters are agent population mix (matching NSE participant data) and market depth (estimated from actual LOB data)."})})]})}const ve=Object.freeze(Object.defineProperty({__proto__:null,default:oe},Symbol.toStringTag,{value:"Module"}));export{me as a,he as b,ge as c,ue as d,fe as e,ye as f,be as g,je as h,ke as i,Ne as j,_e as k,ve as l,xe as s};
