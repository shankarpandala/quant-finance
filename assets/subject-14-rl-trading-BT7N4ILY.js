import{j as e,r as m}from"./vendor-DgA46Qmo.js";import{r as t}from"./vendor-katex-C-S70IU0.js";import{D as j,T as N,N as k,P as S,E as A}from"./subject-01-math-foundations-vREfsVbS.js";function I(){const[a,b]=m.useState({price:100,position:0,cash:1e5}),[l,w]=m.useState("hold"),[n,_]=m.useState([{price:100,position:0,cash:1e5,reward:0}]),[c,y]=m.useState(0),h=i=>{w(i);const s=(Math.random()-.48)*4,d=Math.max(50,a.price+s);let o=a.position,r=a.cash;const p=10;i==="buy"&&r>=a.price*p?(o+=p,r-=a.price*p):i==="sell"&&o>=p&&(o-=p,r+=a.price*p);const u=r+o*d,v=a.cash+a.position*a.price,f=u-v,g={price:parseFloat(d.toFixed(2)),position:o,cash:parseFloat(r.toFixed(2))};b(g),y(c+1),_([...n,{...g,reward:parseFloat(f.toFixed(2))}])},x=a.cash+a.position*a.price;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Trading MDP Simulator"}),e.jsxs("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:["Simulate an MDP-based trading environment. Choose actions and observe state transitions and rewards. Stock mimics an NSE scrip trading around ",e.jsx(t.InlineMath,{math:"\\text{INR }100"}),"."]}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4",children:[e.jsxs("div",{className:"rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30",children:[e.jsx("div",{className:"text-xs text-blue-600 dark:text-blue-400",children:"Price"}),e.jsxs("div",{className:"text-lg font-bold text-blue-800 dark:text-blue-200",children:["₹",a.price.toFixed(2)]})]}),e.jsxs("div",{className:"rounded-lg bg-green-50 p-3 dark:bg-green-900/30",children:[e.jsx("div",{className:"text-xs text-green-600 dark:text-green-400",children:"Position"}),e.jsxs("div",{className:"text-lg font-bold text-green-800 dark:text-green-200",children:[a.position," shares"]})]}),e.jsxs("div",{className:"rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30",children:[e.jsx("div",{className:"text-xs text-purple-600 dark:text-purple-400",children:"Cash"}),e.jsxs("div",{className:"text-lg font-bold text-purple-800 dark:text-purple-200",children:["₹",a.cash.toFixed(0)]})]}),e.jsxs("div",{className:"rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30",children:[e.jsx("div",{className:"text-xs text-amber-600 dark:text-amber-400",children:"Portfolio"}),e.jsxs("div",{className:"text-lg font-bold text-amber-800 dark:text-amber-200",children:["₹",x.toFixed(0)]})]})]}),e.jsxs("div",{className:"mb-4 flex gap-3",children:[e.jsx("button",{onClick:()=>h("buy"),className:"rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700",children:"Buy 10"}),e.jsx("button",{onClick:()=>h("hold"),className:"rounded-lg bg-gray-600 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700",children:"Hold"}),e.jsx("button",{onClick:()=>h("sell"),className:"rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700",children:"Sell 10"})]}),e.jsx("div",{className:"max-h-40 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700",children:e.jsxs("table",{className:"w-full text-xs",children:[e.jsx("thead",{className:"sticky top-0 bg-gray-100 dark:bg-gray-800",children:e.jsxs("tr",{children:[e.jsx("th",{className:"px-2 py-1 text-left",children:"Step"}),e.jsx("th",{className:"px-2 py-1 text-left",children:"Price"}),e.jsx("th",{className:"px-2 py-1 text-left",children:"Position"}),e.jsx("th",{className:"px-2 py-1 text-left",children:"Cash"}),e.jsx("th",{className:"px-2 py-1 text-left",children:"Reward"})]})}),e.jsx("tbody",{className:"text-gray-700 dark:text-gray-300",children:n.map((i,s)=>e.jsxs("tr",{className:"border-t border-gray-100 dark:border-gray-800",children:[e.jsx("td",{className:"px-2 py-1",children:s}),e.jsxs("td",{className:"px-2 py-1",children:["₹",i.price]}),e.jsx("td",{className:"px-2 py-1",children:i.position}),e.jsxs("td",{className:"px-2 py-1",children:["₹",i.cash]}),e.jsxs("td",{className:`px-2 py-1 font-mono ${i.reward>=0?"text-green-600":"text-red-500"}`,children:[i.reward>=0?"+":"",i.reward]})]},s))})]})}),e.jsxs("p",{className:"mt-3 text-center text-sm text-gray-600 dark:text-gray-400",children:["Step ",c," | Last action: ",e.jsx("span",{className:"font-semibold",children:l})," | Portfolio value: ",e.jsx(t.InlineMath,{math:`₹${x.toFixed(0)}`})]})]})}function C(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Trading as a Markov Decision Process"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Reinforcement learning (RL) provides a powerful framework for sequential decision-making under uncertainty. In the context of trading on the National Stock Exchange (NSE), we can model the trading problem as a Markov Decision Process (MDP), where an agent learns to make buy, sell, or hold decisions to maximize cumulative returns."}),e.jsx(j,{title:"Markov Decision Process (MDP)",label:"Definition 14.1",definition:"An MDP is defined by a 5-tuple (S, A, P, R, γ) where S is the state space, A is the action space, P(s'|s,a) is the transition probability, R(s,a,s') is the reward function, and γ ∈ [0,1] is the discount factor. The Markov property states that the future depends only on the current state, not the history.",notation:"We write π(a|s) for the policy -- the probability of taking action a in state s."}),e.jsx(t.BlockMath,{math:"\\mathcal{M} = (\\mathcal{S}, \\mathcal{A}, P, R, \\gamma)"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"State Space for NSE Trading"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The state at time ",e.jsx(t.InlineMath,{math:"t"})," encodes all information the agent needs to make a decision. For an NSE trading agent, the state typically includes:"]}),e.jsx(t.BlockMath,{math:"s_t = \\left[\\underbrace{p_t, v_t, \\text{OHLCV}_t}_{\\text{market data}},\\; \\underbrace{q_t, \\text{PnL}_t, c_t}_{\\text{portfolio state}},\\; \\underbrace{\\text{RSI}_t, \\text{MACD}_t, \\text{BB}_t}_{\\text{technical indicators}}\\right]"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"State Component"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Symbol"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"NSE Example"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Current price"}),e.jsx("td",{className:"px-5 py-2",children:e.jsx(t.InlineMath,{math:"p_t"})}),e.jsx("td",{className:"px-5 py-2",children:"Reliance at ₹2,450"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Volume"}),e.jsx("td",{className:"px-5 py-2",children:e.jsx(t.InlineMath,{math:"v_t"})}),e.jsx("td",{className:"px-5 py-2",children:"NSE delivery volume"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Current position"}),e.jsx("td",{className:"px-5 py-2",children:e.jsx(t.InlineMath,{math:"q_t"})}),e.jsx("td",{className:"px-5 py-2",children:"100 shares long"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Unrealized PnL"}),e.jsx("td",{className:"px-5 py-2",children:e.jsx(t.InlineMath,{math:"\\text{PnL}_t"})}),e.jsx("td",{className:"px-5 py-2",children:"₹12,500 profit"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-5 py-2",children:"Available capital"}),e.jsx("td",{className:"px-5 py-2",children:e.jsx(t.InlineMath,{math:"c_t"})}),e.jsx("td",{className:"px-5 py-2",children:"₹5,00,000 in Zerodha"})]})]})]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Action Space"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The action space can be discrete or continuous. For a simple discrete formulation on NSE:"}),e.jsx(t.BlockMath,{math:"\\mathcal{A} = \\{-1, 0, +1\\} \\quad \\text{(sell, hold, buy)}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For continuous action spaces, we parameterize the portfolio weight:"}),e.jsx(t.BlockMath,{math:"a_t \\in [-1, 1] \\quad \\text{where } a_t = \\frac{\\text{target position}}{\\text{max position}}"}),e.jsx(j,{title:"Transition Dynamics in Trading",label:"Definition 14.2",definition:"The transition function P(s'|s,a) in a trading MDP is determined by the market dynamics (which are unknown to the agent) and the portfolio accounting (which is deterministic). Given action a_t in state s_t, the next price is determined by the market, while the portfolio state updates deterministically based on the executed trade.",notation:"In practice, we use model-free RL since P is unknown and non-stationary."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Bellman Equation for Trading"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The value function under policy ",e.jsx(t.InlineMath,{math:"\\pi"})," satisfies the Bellman equation:"]}),e.jsx(t.BlockMath,{math:"V^\\pi(s) = \\mathbb{E}_\\pi\\left[R_{t+1} + \\gamma V^\\pi(S_{t+1}) \\mid S_t = s\\right]"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The optimal action-value function satisfies the Bellman optimality equation:"}),e.jsx(t.BlockMath,{math:"Q^*(s, a) = \\mathbb{E}\\left[R_{t+1} + \\gamma \\max_{a'} Q^*(S_{t+1}, a') \\mid S_t = s, A_t = a\\right]"}),e.jsx(N,{title:"Optimal Trading Policy",label:"Theorem 14.1",statement:"For a finite MDP with bounded rewards, there exists a deterministic optimal policy π* that achieves the maximum expected cumulative discounted reward. The optimal policy can be derived from Q* via: π*(s) = argmax_a Q*(s, a).",proof:"This follows directly from the Bellman optimality principle. For any MDP with finite state and action spaces, the Bellman operator is a contraction mapping in the sup-norm. By the Banach fixed-point theorem, iteration of the Bellman operator converges to the unique fixed point Q*, from which the optimal policy π* can be extracted greedily."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Discount Factor in Trading"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The discount factor ",e.jsx(t.InlineMath,{math:"\\gamma"})," is particularly meaningful in trading. For Indian markets, typical choices reflect time horizons:"]}),e.jsx(t.BlockMath,{math:"G_t = \\sum_{k=0}^{T-t} \\gamma^k R_{t+k+1}"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Trading Style"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:e.jsx(t.InlineMath,{math:"\\gamma"})}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Effective Horizon"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Intraday (NSE 9:15-15:30)"}),e.jsx("td",{className:"px-5 py-2",children:"0.99"}),e.jsx("td",{className:"px-5 py-2",children:"~100 steps"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Swing (1-2 weeks)"}),e.jsx("td",{className:"px-5 py-2",children:"0.995"}),e.jsx("td",{className:"px-5 py-2",children:"~200 steps"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-5 py-2",children:"Positional (1-3 months)"}),e.jsx("td",{className:"px-5 py-2",children:"0.999"}),e.jsx("td",{className:"px-5 py-2",children:"~1000 steps"})]})]})]})}),e.jsx(k,{title:"Markov Property in Financial Markets",type:"warning",children:e.jsx("p",{children:"Financial markets do not strictly satisfy the Markov property -- past price patterns, order flow history, and regime changes all carry information. In practice, we engineer the state representation to include sufficient history (e.g., a window of past 30 candles, rolling statistics) so that the Markov assumption becomes a reasonable approximation. For NSE stocks, including features like delivery percentage and FII/DII activity from past sessions can significantly improve the state representation."})}),e.jsx(I,{}),e.jsx(S,{title:"nse_trading_mdp.py",runnable:!0,code:`import numpy as np
from dataclasses import dataclass
from typing import Tuple

@dataclass
class TradingState:
    """State representation for NSE trading MDP."""
    price: float           # Current stock price (e.g., Reliance)
    position: int          # Number of shares held
    cash: float            # Available cash in INR
    rsi: float             # RSI indicator
    macd: float            # MACD signal
    volume_ratio: float    # Volume relative to 20-day average

class NSETradingMDP:
    """
    Trading environment modeled as an MDP for NSE stocks.
    Supports discrete actions: buy, hold, sell.
    """
    def __init__(self, initial_cash=1_000_000, max_position=100,
                 transaction_cost=0.001, lot_size=1):
        self.initial_cash = initial_cash
        self.max_position = max_position
        self.transaction_cost = transaction_cost  # Zerodha: ~0.1%
        self.lot_size = lot_size
        self.gamma = 0.995  # Discount factor for swing trading

    def reset(self, price_series: np.ndarray) -> TradingState:
        """Reset environment with historical price data."""
        self.prices = price_series
        self.current_step = 30  # Need history for indicators
        self.position = 0
        self.cash = self.initial_cash
        return self._get_state()

    def _compute_rsi(self, window=14) -> float:
        """Compute RSI from price history."""
        prices = self.prices[self.current_step-window:self.current_step+1]
        deltas = np.diff(prices)
        gains = np.maximum(deltas, 0).mean()
        losses = np.abs(np.minimum(deltas, 0)).mean()
        if losses == 0:
            return 100.0
        rs = gains / losses
        return 100 - (100 / (1 + rs))

    def _get_state(self) -> TradingState:
        """Construct current state."""
        price = self.prices[self.current_step]
        vol_window = self.prices[self.current_step-20:self.current_step]
        return TradingState(
            price=price,
            position=self.position,
            cash=self.cash,
            rsi=self._compute_rsi(),
            macd=0.0,  # Simplified
            volume_ratio=1.0
        )

    def step(self, action: int) -> Tuple[TradingState, float, bool]:
        """
        Execute action: 0=sell, 1=hold, 2=buy
        Returns: (next_state, reward, done)
        """
        price = self.prices[self.current_step]
        prev_portfolio = self.cash + self.position * price

        # Execute trade
        if action == 2 and self.position < self.max_position:
            qty = min(self.lot_size, self.max_position - self.position)
            cost = qty * price * (1 + self.transaction_cost)
            if cost <= self.cash:
                self.position += qty
                self.cash -= cost
        elif action == 0 and self.position > 0:
            qty = min(self.lot_size, self.position)
            revenue = qty * price * (1 - self.transaction_cost)
            self.position -= qty
            self.cash += revenue

        # Advance time
        self.current_step += 1
        done = self.current_step >= len(self.prices) - 1
        new_price = self.prices[self.current_step]
        new_portfolio = self.cash + self.position * new_price

        # Reward = change in portfolio value (log return)
        reward = np.log(new_portfolio / prev_portfolio) if prev_portfolio > 0 else 0

        return self._get_state(), reward, done

# Simulate Reliance-like price trajectory
np.random.seed(42)
n_days = 252  # One trading year on NSE
returns = np.random.normal(0.0005, 0.02, n_days)
prices = 2400 * np.cumprod(1 + returns)  # Starting around INR 2400

# Initialize MDP
env = NSETradingMDP(initial_cash=500_000, max_position=50)
state = env.reset(prices)

print(f"NSE Trading MDP Initialized")
print(f"Initial cash: INR {env.initial_cash:,.0f}")
print(f"Stock price: INR {state.price:,.2f}")
print(f"RSI: {state.rsi:.1f}")
print(f"Discount factor (gamma): {env.gamma}")
print(f"\\nState space dimensionality: 6")
print(f"Action space: {{sell=0, hold=1, buy=2}}")

# Run random policy for demonstration
total_reward = 0
for _ in range(50):
    action = np.random.choice([0, 1, 2], p=[0.2, 0.6, 0.2])
    state, reward, done = env.step(action)
    total_reward += reward
    if done:
        break

final_value = state.cash + state.position * state.price
print(f"\\nAfter 50 random steps:")
print(f"Portfolio value: INR {final_value:,.0f}")
print(f"Cumulative reward: {total_reward:.4f}")
print(f"Return: {(final_value/500_000 - 1)*100:.2f}%")`}),e.jsx(A,{title:"Q-Value Computation for Trading",difficulty:"intermediate",problem:"An RL agent trading HDFC Bank on NSE has learned Q-values. In state s (price=₹1,650, position=0, RSI=72), the Q-values are: Q(s,buy)=0.15, Q(s,hold)=0.08, Q(s,sell)=-0.02. What action does the greedy policy select? What does the high RSI suggest?",solution:[{step:"Apply greedy policy",formula:"\\pi^*(s) = \\arg\\max_a Q(s, a) = \\arg\\max\\{0.15, 0.08, -0.02\\} = \\text{buy}",explanation:"The greedy policy selects the action with highest Q-value, which is buy."},{step:"Analyze the RSI context",formula:"\\text{RSI} = 72 > 70 \\implies \\text{overbought zone}",explanation:"RSI above 70 traditionally indicates overbought conditions, yet the learned Q-values favor buying. This may indicate the RL agent has learned momentum patterns specific to HDFC Bank on NSE."},{step:"Epsilon-greedy exploration",formula:"a_t = \\begin{cases} \\arg\\max_a Q(s,a) & \\text{with prob } 1-\\epsilon \\\\ \\text{random} & \\text{with prob } \\epsilon \\end{cases}",explanation:"During training, we use epsilon-greedy to ensure sufficient exploration of the state-action space."}]}),e.jsx(k,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Formulating trading as an MDP is the foundation of all RL-based trading systems. The key design choices -- state representation, action space, and reward function -- determine the quality of learned policies. For NSE trading, include India-specific features like delivery percentage, FII/DII flows, and market-wide position limits imposed by SEBI. Remember that the MDP framework assumes the Markov property, which we enforce through careful state engineering rather than relying on raw prices."})})]})}const ae=Object.freeze(Object.defineProperty({__proto__:null,default:C},Symbol.toStringTag,{value:"Module"}));function M(){const[a,b]=m.useState(1),[l,w]=m.useState(.5),[n,_]=m.useState(.1),[c,y]=m.useState(6.5),h=[.02,-.01,.03,-.005,.015,-.02,.01,.025,-.015,.008],x=h.reduce((f,g)=>{const T=f[f.length-1];return f.push(T*(1+g)),f},[1]),i=h.reduce((f,g)=>f+g,0)/h.length,s=Math.sqrt(h.reduce((f,g)=>f+(g-i)**2,0)/h.length),d=c/100/252,o=s>0?(i-d)/s*Math.sqrt(252):0,r=Math.max(...x),p=Math.max(...x.map(f=>(r-f)/r)),u=.15,v=a*o-l*p-n*u;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Reward Shaping Tuner"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust reward component weights and see how the shaped reward changes. Risk-free rate reflects India's T-bill rate."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Sharpe Weight: ",a.toFixed(2)]}),e.jsx("input",{type:"range",min:"0",max:"3",step:"0.1",value:a,onChange:f=>b(parseFloat(f.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Drawdown Penalty: ",l.toFixed(2)]}),e.jsx("input",{type:"range",min:"0",max:"3",step:"0.1",value:l,onChange:f=>w(parseFloat(f.target.value)),className:"h-2 w-full cursor-pointer accent-red-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Turnover Penalty: ",n.toFixed(2)]}),e.jsx("input",{type:"range",min:"0",max:"1",step:"0.05",value:n,onChange:f=>_(parseFloat(f.target.value)),className:"h-2 w-full cursor-pointer accent-amber-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Risk-Free Rate: ",c.toFixed(1),"%"]}),e.jsx("input",{type:"range",min:"4",max:"10",step:"0.5",value:c,onChange:f=>y(parseFloat(f.target.value)),className:"h-2 w-full cursor-pointer accent-green-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("div",{className:"rounded-lg bg-blue-50 p-3 text-center dark:bg-blue-900/30",children:[e.jsx("div",{className:"text-xs text-blue-600 dark:text-blue-400",children:"Sharpe Component"}),e.jsx("div",{className:"text-lg font-bold text-blue-800 dark:text-blue-200",children:(a*o).toFixed(3)})]}),e.jsxs("div",{className:"rounded-lg bg-red-50 p-3 text-center dark:bg-red-900/30",children:[e.jsx("div",{className:"text-xs text-red-600 dark:text-red-400",children:"Drawdown Penalty"}),e.jsxs("div",{className:"text-lg font-bold text-red-800 dark:text-red-200",children:["-",(l*p).toFixed(3)]})]}),e.jsxs("div",{className:"rounded-lg bg-amber-50 p-3 text-center dark:bg-amber-900/30",children:[e.jsx("div",{className:"text-xs text-amber-600 dark:text-amber-400",children:"Turnover Penalty"}),e.jsxs("div",{className:"text-lg font-bold text-amber-800 dark:text-amber-200",children:["-",(n*u).toFixed(3)]})]}),e.jsxs("div",{className:`rounded-lg p-3 text-center ${v>=0?"bg-green-50 dark:bg-green-900/30":"bg-red-50 dark:bg-red-900/30"}`,children:[e.jsx("div",{className:"text-xs text-gray-600 dark:text-gray-400",children:"Shaped Reward"}),e.jsx("div",{className:`text-lg font-bold ${v>=0?"text-green-800 dark:text-green-200":"text-red-800 dark:text-red-200"}`,children:v.toFixed(4)})]})]})]})}function E(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Reward Shaping for Trading RL"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"The reward function is arguably the most critical design choice in RL-based trading. A naive reward (raw PnL) leads to unstable, high-risk policies. Proper reward shaping encourages risk-adjusted returns, penalizes excessive drawdowns, and accounts for transaction costs -- all essential for deploying strategies on NSE via brokers like Zerodha."}),e.jsx(j,{title:"Reward Shaping",label:"Definition 14.3",definition:"Reward shaping augments the base reward R with an additional shaping function F(s, a, s') to guide learning without changing the optimal policy (under certain conditions). A potential-based shaping function F(s, a, s') = γΦ(s') - Φ(s), where Φ is a potential function, preserves the optimal policy.",notation:"The shaped reward is R'(s,a,s') = R(s,a,s') + F(s,a,s')."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Common Reward Functions for Trading"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:[e.jsx("strong",{children:"1. Simple PnL Reward:"})," The most basic reward is the change in portfolio value:"]}),e.jsx(t.BlockMath,{math:"R_t^{\\text{PnL}} = V_{t+1} - V_t = q_t(p_{t+1} - p_t) + c_t \\cdot r_f"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:[e.jsx("strong",{children:"2. Log Return Reward:"})," Using log returns ensures scale invariance:"]}),e.jsx(t.BlockMath,{math:"R_t^{\\log} = \\ln\\left(\\frac{V_{t+1}}{V_t}\\right)"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:[e.jsx("strong",{children:"3. Differential Sharpe Ratio:"})," Moody and Saffell (2001) proposed an online approximation to the Sharpe ratio that can be used as a step-wise reward:"]}),e.jsx(t.BlockMath,{math:"D_t = \\frac{B_{t-1} \\Delta A_t - \\frac{1}{2} A_{t-1} \\Delta B_t}{(B_{t-1} - A_{t-1}^2)^{3/2}}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"A_t"})," and ",e.jsx(t.InlineMath,{math:"B_t"})," are exponential moving averages of returns and squared returns:"]}),e.jsx(t.BlockMath,{math:"A_t = A_{t-1} + \\eta(R_t - A_{t-1}), \\quad B_t = B_{t-1} + \\eta(R_t^2 - B_{t-1})"}),e.jsx(N,{title:"Policy Invariance under Potential-Based Shaping",label:"Theorem 14.2 (Ng et al., 1999)",statement:"If F(s,a,s') = γΦ(s') - Φ(s) for some potential function Φ: S → ℝ, then the optimal policy under the shaped reward R' = R + F is identical to the optimal policy under R.",proof:"Consider the shaped value function V'(s) = V(s) - Φ(s). The shaped Bellman equation becomes V'(s) = max_a E[R + γΦ(s') - Φ(s) + γV'(s')] = -Φ(s) + max_a E[R + γ(V'(s') + Φ(s'))]. Since V'(s) + Φ(s) = V(s), the argmax over actions is unchanged, preserving the optimal policy."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Drawdown-Penalized Reward"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For Indian market participants, SEBI mandates risk limits. We incorporate drawdown penalties:"}),e.jsx(t.BlockMath,{math:"R_t^{\\text{shaped}} = R_t^{\\log} - \\lambda_{\\text{dd}} \\cdot \\max\\left(0, \\frac{V^{\\max}_{0:t} - V_t}{V^{\\max}_{0:t}} - \\text{DD}_{\\text{threshold}}\\right)"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"V^{\\max}_{0:t}"})," is the peak portfolio value and"," ",e.jsx(t.InlineMath,{math:"\\text{DD}_{\\text{threshold}}"})," is the acceptable drawdown level (e.g., 10% for a moderate-risk Nifty 50 strategy)."]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Transaction Cost Penalty"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Indian market transaction costs include brokerage, STT, GST, SEBI charges, and stamp duty. For Zerodha (India's largest discount broker):"}),e.jsx(t.BlockMath,{math:"R_t^{\\text{tc}} = -\\left(\\underbrace{c_{\\text{brokerage}}}_{0.03\\%} + \\underbrace{c_{\\text{STT}}}_{0.1\\%} + \\underbrace{c_{\\text{GST}}}_{18\\% \\times \\text{brokerage}} + \\underbrace{c_{\\text{stamp}}}_{0.015\\%}\\right) \\cdot |a_t - a_{t-1}| \\cdot V_t"}),e.jsx(k,{title:"Indian Market Cost Structure",type:"warning",children:e.jsx("p",{children:"Transaction costs on NSE are asymmetric: Securities Transaction Tax (STT) applies only on the sell side for intraday trades but on both sides for delivery. The total cost for a delivery trade round-trip on Zerodha is approximately 0.2-0.3% of trade value, while intraday is lower. Your reward function must account for this asymmetry to prevent the RL agent from learning overly aggressive strategies."})}),e.jsx(M,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Composite Reward Function"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The final shaped reward combines multiple objectives:"}),e.jsx(t.BlockMath,{math:"R_t = \\underbrace{\\alpha \\cdot D_t}_{\\text{Sharpe}} - \\underbrace{\\beta \\cdot \\text{DD}_t}_{\\text{drawdown}} - \\underbrace{\\gamma_c \\cdot ||\\Delta w_t||_1}_{\\text{turnover}} - \\underbrace{\\delta \\cdot \\text{TC}_t}_{\\text{costs}} + \\underbrace{\\epsilon \\cdot \\Phi_t}_{\\text{potential}}"}),e.jsx(S,{title:"reward_shaping.py",runnable:!0,code:`import numpy as np

class TradingRewardShaper:
    """
    Reward shaping for RL trading on NSE.
    Combines Sharpe-based rewards with drawdown and cost penalties.
    """
    def __init__(self, risk_free_rate=0.065, sharpe_weight=1.0,
                 drawdown_penalty=0.5, turnover_penalty=0.1,
                 dd_threshold=0.10, eta=0.01):
        self.rf_daily = risk_free_rate / 252
        self.sharpe_weight = sharpe_weight
        self.drawdown_penalty = drawdown_penalty
        self.turnover_penalty = turnover_penalty
        self.dd_threshold = dd_threshold
        self.eta = eta  # EMA decay for differential Sharpe

        # Running statistics for differential Sharpe
        self.A = 0.0  # EMA of returns
        self.B = 0.0  # EMA of squared returns
        self.peak_value = None

    def differential_sharpe(self, ret):
        """Compute differential Sharpe ratio (Moody & Saffell, 2001)."""
        delta_A = ret - self.A
        delta_B = ret**2 - self.B

        denom = (self.B - self.A**2) ** 1.5
        if abs(denom) < 1e-12:
            dsr = 0.0
        else:
            dsr = (self.B * delta_A - 0.5 * self.A * delta_B) / denom

        # Update EMAs
        self.A += self.eta * delta_A
        self.B += self.eta * delta_B

        return dsr

    def drawdown_penalty_fn(self, current_value):
        """Penalty for exceeding drawdown threshold."""
        if self.peak_value is None:
            self.peak_value = current_value
        self.peak_value = max(self.peak_value, current_value)

        dd = (self.peak_value - current_value) / self.peak_value
        excess_dd = max(0, dd - self.dd_threshold)
        return excess_dd

    def transaction_cost(self, trade_value, is_intraday=False):
        """
        Compute NSE transaction costs (Zerodha pricing).
        Includes brokerage, STT, GST, stamp duty, exchange charges.
        """
        abs_value = abs(trade_value)
        brokerage = min(20, abs_value * 0.0003)  # Zerodha flat fee
        stt = abs_value * 0.001 if not is_intraday else abs_value * 0.00025
        gst = brokerage * 0.18
        stamp = abs_value * 0.00015
        exchange_charges = abs_value * 0.0000345

        return brokerage + stt + gst + stamp + exchange_charges

    def compute_reward(self, portfolio_value, prev_value,
                       weight_change, trade_value=0):
        """Compute composite shaped reward."""
        # Log return
        log_ret = np.log(portfolio_value / prev_value) if prev_value > 0 else 0

        # Differential Sharpe ratio
        dsr = self.differential_sharpe(log_ret)

        # Drawdown penalty
        dd_pen = self.drawdown_penalty_fn(portfolio_value)

        # Turnover cost (L1 norm of weight changes)
        turnover = np.sum(np.abs(weight_change)) if hasattr(weight_change, '__len__') else abs(weight_change)

        # Transaction cost
        tc = self.transaction_cost(trade_value)
        tc_normalized = tc / prev_value if prev_value > 0 else 0

        # Composite reward
        reward = (self.sharpe_weight * dsr
                  - self.drawdown_penalty * dd_pen
                  - self.turnover_penalty * turnover
                  - tc_normalized)

        return reward, {
            'log_return': log_ret,
            'diff_sharpe': dsr,
            'drawdown_penalty': dd_pen,
            'turnover': turnover,
            'transaction_cost': tc
        }

    def reset(self):
        """Reset running statistics."""
        self.A = 0.0
        self.B = 0.0
        self.peak_value = None


# Demo: Simulate rewards for a Nifty 50 trading strategy
np.random.seed(42)
shaper = TradingRewardShaper(
    risk_free_rate=0.065,  # India T-bill rate ~6.5%
    sharpe_weight=1.0,
    drawdown_penalty=0.5,
    turnover_penalty=0.1,
    dd_threshold=0.10
)

# Simulate 20 trading days
portfolio = 10_00_000  # INR 10 lakhs
print("Day | Portfolio (INR) | Return  | Reward  | Components")
print("-" * 75)

for day in range(20):
    prev = portfolio
    daily_return = np.random.normal(0.0008, 0.015)
    portfolio *= (1 + daily_return)

    weight_change = np.random.uniform(0, 0.3)
    trade_value = abs(weight_change) * portfolio

    reward, components = shaper.compute_reward(
        portfolio, prev, weight_change, trade_value
    )

    print(f"{day+1:3d} | {portfolio:>14,.0f} | {daily_return:>+7.4f} | "
          f"{reward:>+7.4f} | DSR={components['diff_sharpe']:+.4f} "
          f"DD={components['drawdown_penalty']:.4f}")

final_return = (portfolio / 10_00_000 - 1) * 100
print(f"\\nFinal portfolio: INR {portfolio:,.0f}")
print(f"Total return: {final_return:.2f}%")
print(f"Annualized Sharpe estimate: {shaper.A / np.sqrt(shaper.B - shaper.A**2) * np.sqrt(252):.2f}" if shaper.B > shaper.A**2 else "N/A")`}),e.jsx(A,{title:"Designing Reward for Nifty Futures Trading",difficulty:"advanced",problem:"Design a reward function for an RL agent trading Nifty 50 futures on NSE. The agent trades 1 lot (50 units). The strategy targets Sharpe > 2.0 with max drawdown < 15%. Margin requirement is ₹1,00,000 per lot.",solution:[{step:"Define the log return component",formula:"R_t^{\\log} = \\ln\\left(\\frac{V_t + 50 \\cdot \\Delta p_t}{V_t}\\right)",explanation:"Log return captures the multiplicative nature of compounding in futures trading. Δp_t is the Nifty point change."},{step:"Add differential Sharpe ratio",formula:"D_t = \\frac{B_{t-1}(R_t - A_{t-1}) - \\frac{1}{2}A_{t-1}(R_t^2 - B_{t-1})}{(B_{t-1} - A_{t-1}^2)^{3/2}}",explanation:"The differential Sharpe provides a step-wise, online approximation of the portfolio Sharpe ratio."},{step:"Incorporate drawdown penalty",formula:"P_t^{\\text{dd}} = \\lambda \\cdot \\max(0, \\text{DD}_t - 0.15)^2",explanation:"Quadratic penalty beyond 15% drawdown creates a strong signal for risk management."},{step:"Final composite reward",formula:"R_t = D_t - 0.5 \\cdot P_t^{\\text{dd}} - 0.001 \\cdot |\\Delta q_t|",explanation:"Combine Sharpe signal, drawdown penalty, and a small turnover penalty to discourage excessive trading."}]}),e.jsx(k,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Reward shaping is the bridge between financial objectives and RL optimization. For Indian markets, always account for the specific cost structure (STT, GST, stamp duty), use risk-free rates reflecting RBI repo rate or T-bill yields (~6-7%), and include SEBI-mandated position limits as hard constraints. The differential Sharpe ratio remains one of the most effective reward signals for encouraging risk-adjusted performance in trading RL agents."})})]})}const se=Object.freeze(Object.defineProperty({__proto__:null,default:E},Symbol.toStringTag,{value:"Module"}));function P(){const[a,b]=m.useState("discrete"),[l,w]=m.useState(30),[n,_]=m.useState(["price","volume","rsi"]),[c,y]=m.useState("log_return"),h=a==="discrete"?`(${l}, ${n.length})`:`(${l}, ${n.length+2})`,x=a==="discrete"?"3 (buy/hold/sell)":"Box([-1, 1])",i=s=>{n.includes(s)?n.length>1&&_(n.filter(d=>d!==s)):_([...n,s])};return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Gym Environment Configurator"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Configure an OpenAI Gym-compatible environment for NSE trading."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2",children:"Action Space Type"}),e.jsx("div",{className:"flex gap-2",children:["discrete","continuous"].map(s=>e.jsx("button",{onClick:()=>b(s),className:`rounded-lg px-3 py-1.5 text-xs font-semibold ${a===s?"bg-indigo-600 text-white":"bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"}`,children:s.charAt(0).toUpperCase()+s.slice(1)},s))})]}),e.jsxs("div",{children:[e.jsxs("label",{className:"block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2",children:["Window Size: ",l]}),e.jsx("input",{type:"range",min:"5",max:"60",step:"5",value:l,onChange:s=>w(parseInt(s.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2",children:"Features (click to toggle)"}),e.jsx("div",{className:"flex flex-wrap gap-2",children:["price","volume","rsi","macd","bb_width","delivery_pct","fii_flow"].map(s=>e.jsx("button",{onClick:()=>i(s),className:`rounded-full px-3 py-1 text-xs ${n.includes(s)?"bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300":"bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500"}`,children:s},s))})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2",children:"Reward Type"}),e.jsx("div",{className:"flex gap-2",children:["log_return","sharpe","sortino","pnl"].map(s=>e.jsx("button",{onClick:()=>y(s),className:`rounded-lg px-3 py-1.5 text-xs font-semibold ${c===s?"bg-green-600 text-white":"bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"}`,children:s},s))})]}),e.jsxs("div",{className:"rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50",children:[e.jsx("h4",{className:"mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300",children:"Environment Summary"}),e.jsxs("div",{className:"grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("div",{children:["Observation shape: ",e.jsx("span",{className:"font-mono font-bold",children:h})]}),e.jsxs("div",{children:["Action space: ",e.jsx("span",{className:"font-mono font-bold",children:x})]}),e.jsxs("div",{children:["Features: ",e.jsx("span",{className:"font-bold",children:n.length})]}),e.jsxs("div",{children:["Reward: ",e.jsx("span",{className:"font-bold",children:c})]}),e.jsxs("div",{children:["Window: ",e.jsxs("span",{className:"font-bold",children:[l," bars"]})]}),e.jsxs("div",{children:["State dim: ",e.jsx("span",{className:"font-bold",children:l*n.length})]})]})]})]})}function q(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"OpenAI Gym Environments for NSE Trading"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"OpenAI Gym (now Gymnasium) provides a standardized interface for RL environments. Building a Gym-compatible NSE trading environment enables us to use any off-the-shelf RL algorithm. We will build environments that handle Indian market specifics: trading hours (9:15-15:30 IST), lot sizes, circuit breakers, and T+1 settlement."}),e.jsx(j,{title:"Gymnasium Environment Interface",label:"Definition 14.4",definition:"A Gymnasium environment implements the standard API: reset() returns the initial observation, step(action) returns (observation, reward, terminated, truncated, info), and exposes observation_space and action_space attributes. This interface ensures compatibility with all standard RL libraries.",notation:"env.reset() → obs, info; env.step(a) → obs, reward, terminated, truncated, info"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Environment Design Considerations for NSE"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Aspect"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"NSE Specifics"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Implementation"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Trading hours"}),e.jsx("td",{className:"px-5 py-2",children:"9:15 AM - 3:30 PM IST"}),e.jsx("td",{className:"px-5 py-2",children:"Filter data to market hours"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Circuit breakers"}),e.jsx("td",{className:"px-5 py-2",children:"5%, 10%, 15%, 20% limits"}),e.jsx("td",{className:"px-5 py-2",children:"Clamp actions at limits"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Settlement"}),e.jsx("td",{className:"px-5 py-2",children:"T+1 for equities"}),e.jsx("td",{className:"px-5 py-2",children:"Track settlement queue"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Lot sizes"}),e.jsx("td",{className:"px-5 py-2",children:"F&O have fixed lot sizes"}),e.jsx("td",{className:"px-5 py-2",children:"Discretize actions to lots"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-5 py-2",children:"Holidays"}),e.jsx("td",{className:"px-5 py-2",children:"NSE holiday calendar"}),e.jsx("td",{className:"px-5 py-2",children:"Skip non-trading days"})]})]})]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Observation Space Design"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The observation space should capture sufficient market state for decision-making:"}),e.jsx(t.BlockMath,{math:"\\text{obs}_t \\in \\mathbb{R}^{W \\times F}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"W"})," is the lookback window and ",e.jsx(t.InlineMath,{math:"F"})," is the number of features. Common features for NSE:"]}),e.jsx(t.BlockMath,{math:"F = \\{\\underbrace{\\text{OHLCV}}_5, \\underbrace{\\text{RSI, MACD, BB}}_3, \\underbrace{\\text{delivery\\%, FII/DII}}_2, \\underbrace{\\text{position, PnL}}_2\\}"}),e.jsx(P,{}),e.jsx(k,{title:"Data Sources for NSE Environments",type:"info",children:e.jsx("p",{children:"For building NSE trading environments, you can source data from: (1) NSE official bhavcopy (free daily OHLCV), (2) Zerodha Kite API for real-time data, (3) Yahoo Finance for historical data, (4) nsepy/jugaad-data Python packages for bulk downloads. Always normalize features and handle corporate actions (splits, bonuses) that are common on NSE."})}),e.jsx(S,{title:"nse_gym_env.py",runnable:!0,code:`import numpy as np
from typing import Optional, Tuple, Dict, Any

class NSETradingEnv:
    """
    OpenAI Gym-compatible trading environment for NSE stocks.
    Supports both discrete and continuous action spaces.

    Features:
    - Realistic NSE transaction costs (STT, GST, stamp duty)
    - Circuit breaker simulation
    - T+1 settlement awareness
    - India-specific technical indicators
    """

    def __init__(self, prices: np.ndarray, volumes: np.ndarray = None,
                 initial_capital: float = 10_00_000,
                 window_size: int = 30,
                 max_position: int = 100,
                 discrete_actions: bool = True,
                 reward_type: str = 'log_return'):
        self.prices = prices
        self.volumes = volumes if volumes is not None else np.ones_like(prices)
        self.initial_capital = initial_capital
        self.window_size = window_size
        self.max_position = max_position
        self.discrete_actions = discrete_actions
        self.reward_type = reward_type

        # Spaces (Gym-compatible shapes)
        n_features = 6  # price, volume, rsi, macd, position, pnl
        self.observation_shape = (window_size, n_features)
        self.n_actions = 3 if discrete_actions else 1

        self.reset()

    def _compute_features(self) -> np.ndarray:
        """Compute feature matrix for current window."""
        idx = self.current_step
        start = max(0, idx - self.window_size + 1)
        window_prices = self.prices[start:idx + 1]
        window_volumes = self.volumes[start:idx + 1]

        # Pad if needed
        if len(window_prices) < self.window_size:
            pad_len = self.window_size - len(window_prices)
            window_prices = np.pad(window_prices, (pad_len, 0), mode='edge')
            window_volumes = np.pad(window_volumes, (pad_len, 0), mode='edge')

        # Normalize price to returns
        norm_prices = np.diff(np.log(window_prices), prepend=np.log(window_prices[0]))

        # Normalize volume
        vol_mean = window_volumes.mean()
        norm_volumes = window_volumes / vol_mean if vol_mean > 0 else window_volumes

        # RSI (simplified)
        deltas = np.diff(window_prices, prepend=window_prices[0])
        gains = np.maximum(deltas, 0)
        losses = np.abs(np.minimum(deltas, 0))
        avg_gain = np.convolve(gains, np.ones(14)/14, mode='same')
        avg_loss = np.convolve(losses, np.ones(14)/14, mode='same')
        rs = np.where(avg_loss > 0, avg_gain / avg_loss, 100)
        rsi = 100 - 100 / (1 + rs)
        rsi_norm = rsi / 100.0

        # MACD (simplified)
        ema12 = np.convolve(window_prices, np.ones(12)/12, mode='same')
        ema26 = np.convolve(window_prices, np.ones(26)/26, mode='same')
        macd = (ema12 - ema26) / window_prices

        # Position and PnL features
        pos_feat = np.full(self.window_size, self.position / self.max_position)
        pnl_feat = np.full(self.window_size, self.unrealized_pnl / self.initial_capital)

        features = np.column_stack([
            norm_prices, norm_volumes, rsi_norm, macd, pos_feat, pnl_feat
        ])
        return features.astype(np.float32)

    @property
    def unrealized_pnl(self) -> float:
        if self.position == 0:
            return 0.0
        return self.position * (self.prices[self.current_step] - self.avg_entry_price)

    def reset(self, seed: Optional[int] = None) -> Tuple[np.ndarray, Dict]:
        """Reset environment to initial state."""
        if seed is not None:
            np.random.seed(seed)

        self.current_step = self.window_size
        self.position = 0
        self.cash = self.initial_capital
        self.avg_entry_price = 0.0
        self.trades = []
        self.portfolio_values = [self.initial_capital]
        self.peak_value = self.initial_capital

        obs = self._compute_features()
        return obs, {"portfolio_value": self.initial_capital}

    def _compute_transaction_cost(self, trade_value: float,
                                   is_sell: bool = False) -> float:
        """NSE transaction costs including STT, GST, stamp duty."""
        abs_val = abs(trade_value)
        brokerage = min(20, abs_val * 0.0003)  # Zerodha
        stt = abs_val * 0.001 if is_sell else abs_val * 0.001
        gst = brokerage * 0.18
        stamp = abs_val * 0.00015
        sebi_charges = abs_val * 0.000001
        exchange = abs_val * 0.0000345
        return brokerage + stt + gst + stamp + sebi_charges + exchange

    def step(self, action) -> Tuple[np.ndarray, float, bool, bool, Dict]:
        """Execute one step in the environment."""
        price = self.prices[self.current_step]
        prev_value = self.cash + self.position * price

        # Execute action
        trade_value = 0
        if self.discrete_actions:
            if action == 2 and self.position < self.max_position:  # Buy
                qty = min(10, self.max_position - self.position)
                cost = qty * price
                tc = self._compute_transaction_cost(cost)
                if cost + tc <= self.cash:
                    self.cash -= (cost + tc)
                    self.avg_entry_price = (
                        (self.avg_entry_price * self.position + cost)
                        / (self.position + qty)
                    ) if self.position + qty > 0 else price
                    self.position += qty
                    trade_value = cost
            elif action == 0 and self.position > 0:  # Sell
                qty = min(10, self.position)
                revenue = qty * price
                tc = self._compute_transaction_cost(revenue, is_sell=True)
                self.cash += (revenue - tc)
                self.position -= qty
                trade_value = revenue
        else:
            target = int(action * self.max_position)
            delta = target - self.position
            if delta != 0:
                trade_value = abs(delta) * price
                tc = self._compute_transaction_cost(trade_value, is_sell=(delta < 0))
                if delta > 0:
                    self.cash -= (trade_value + tc)
                else:
                    self.cash += (trade_value - tc)
                self.position = target

        # Advance
        self.current_step += 1
        terminated = self.current_step >= len(self.prices) - 1
        new_price = self.prices[self.current_step]
        new_value = self.cash + self.position * new_price
        self.portfolio_values.append(new_value)
        self.peak_value = max(self.peak_value, new_value)

        # Compute reward
        if self.reward_type == 'log_return':
            reward = float(np.log(new_value / prev_value)) if prev_value > 0 else 0.0
        elif self.reward_type == 'pnl':
            reward = float(new_value - prev_value)
        else:
            reward = float(np.log(new_value / prev_value)) if prev_value > 0 else 0.0

        # Drawdown check
        drawdown = (self.peak_value - new_value) / self.peak_value
        truncated = drawdown > 0.20  # Stop if drawdown > 20%

        obs = self._compute_features()
        info = {
            "portfolio_value": new_value,
            "position": self.position,
            "drawdown": drawdown,
            "trade_value": trade_value
        }
        return obs, reward, terminated, truncated, info


# Demo
np.random.seed(42)
n_days = 252
returns = np.random.normal(0.0005, 0.018, n_days)
prices = 2500 * np.cumprod(1 + returns)

env = NSETradingEnv(prices, initial_capital=5_00_000, window_size=20)
obs, info = env.reset()

print(f"Environment: NSETradingEnv")
print(f"Observation shape: {obs.shape}")
print(f"Action space: Discrete(3)")
print(f"Initial capital: INR {info['portfolio_value']:,.0f}")
print()

# Run random agent for 50 steps
total_reward = 0
for i in range(50):
    action = np.random.choice([0, 1, 2], p=[0.15, 0.70, 0.15])
    obs, reward, terminated, truncated, info = env.step(action)
    total_reward += reward
    if terminated or truncated:
        break

print(f"After 50 steps:")
print(f"Portfolio: INR {info['portfolio_value']:,.0f}")
print(f"Position: {info['position']} shares")
print(f"Drawdown: {info['drawdown']*100:.1f}%")
print(f"Cumulative reward: {total_reward:.4f}")`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Multi-Asset NSE Environment"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For portfolio-level RL, we extend to multiple NSE stocks with a joint observation space:"}),e.jsx(t.BlockMath,{math:"\\text{obs}_t \\in \\mathbb{R}^{N \\times W \\times F}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"N"})," is the number of assets (e.g., Nifty 50 constituents), and the action becomes a vector of portfolio weights:"]}),e.jsx(t.BlockMath,{math:"a_t = [w_1, w_2, \\ldots, w_N] \\in \\Delta^N, \\quad \\sum_{i=1}^N w_i \\leq 1"}),e.jsx(N,{title:"Environment Consistency",label:"Theorem 14.3",statement:"A well-defined trading environment must satisfy the accounting identity at every step: V_t = cash_t + Σᵢ positionᵢ × priceᵢ,t. Any violation indicates a bug in trade execution or cost computation logic.",proof:"By construction, each step either transfers value between cash and positions (trades) or changes position value due to price movement. Since trade execution is: cash_new = cash - qty × price - TC (buy) or cash + qty × price - TC (sell), and position_value changes by qty × Δprice, the accounting identity is preserved as long as TC > 0 reduces total portfolio value monotonically."}),e.jsx(A,{title:"Setting Up an NSE Gym Environment",difficulty:"intermediate",problem:"Create a Gym environment for trading Reliance Industries on NSE with ₹5,00,000 capital, a 20-day lookback window, and log-return rewards. Run it for 10 steps with a simple RSI-based heuristic.",solution:[{step:"Initialize the environment",formula:"\\text{env} = \\text{NSETradingEnv}(\\text{prices}, W=20, V_0 = 5{,}00{,}000)",explanation:"Create the environment with Reliance historical prices and 20-day lookback."},{step:"Define RSI-based heuristic",formula:"\\pi(s) = \\begin{cases} \\text{buy} & \\text{if RSI} < 30 \\\\ \\text{sell} & \\text{if RSI} > 70 \\\\ \\text{hold} & \\text{otherwise} \\end{cases}",explanation:"A simple mean-reversion heuristic as a baseline policy."},{step:"Evaluate the heuristic",formula:"G = \\sum_{t=0}^{T} \\gamma^t R_t",explanation:"Run the environment for 10 steps, accumulate discounted rewards, and compare with buy-and-hold."}]}),e.jsx(k,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"A well-designed Gym environment is the foundation of RL-based trading research. For NSE-specific environments, pay attention to India's unique market microstructure: T+1 settlement, SEBI circuit breaker rules (upper/lower circuit limits), lot sizes for F&O trading, and the specific cost structure of brokers like Zerodha. Use the Gymnasium API (successor to OpenAI Gym) which returns 5-tuples from step() to ensure compatibility with modern RL libraries like Stable-Baselines3 and CleanRL."})})]})}const re=Object.freeze(Object.defineProperty({__proto__:null,default:q},Symbol.toStringTag,{value:"Module"}));function F(){const[a,b]=m.useState(.2),[l,w]=m.useState(.5),[n,_]=m.useState(1),c=n*l,h=Math.max(1-a,Math.min(1+a,n))*l,x=Math.min(c,h),i=[];for(let g=.2;g<=2;g+=.02){const T=g*l,R=Math.max(1-a,Math.min(1+a,g))*l;i.push({r:g,objective:Math.min(T,R)})}const s=400,d=200,o={top:20,right:20,bottom:30,left:40},r=s-o.left-o.right,p=d-o.top-o.bottom,u=g=>o.left+(g-.2)/1.8*r,v=Math.max(...i.map(g=>Math.abs(g.objective)),.5),f=g=>o.top+p/2-g/v*(p/2);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: PPO Clipping Objective"}),e.jsxs("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:["Adjust ",e.jsx(t.InlineMath,{math:"\\epsilon"}),", advantage ",e.jsx(t.InlineMath,{math:"\\hat{A}"}),", and probability ratio ",e.jsx(t.InlineMath,{math:"r(\\theta)"})," to see the clipping effect."]}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:[e.jsx(t.InlineMath,{math:"\\epsilon"})," = ",a.toFixed(2)]}),e.jsx("input",{type:"range",min:"0.05",max:"0.5",step:"0.05",value:a,onChange:g=>b(parseFloat(g.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:[e.jsx(t.InlineMath,{math:"\\hat{A}"})," = ",l.toFixed(2)]}),e.jsx("input",{type:"range",min:"-1",max:"1",step:"0.05",value:l,onChange:g=>w(parseFloat(g.target.value)),className:"h-2 w-full cursor-pointer accent-green-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:[e.jsx(t.InlineMath,{math:"r(\\theta)"})," = ",n.toFixed(2)]}),e.jsx("input",{type:"range",min:"0.3",max:"1.8",step:"0.05",value:n,onChange:g=>_(parseFloat(g.target.value)),className:"h-2 w-full cursor-pointer accent-amber-500"})]})]}),e.jsxs("svg",{viewBox:`0 0 ${s} ${d}`,className:"w-full max-w-lg mx-auto block",children:[e.jsx("line",{x1:o.left,y1:f(0),x2:s-o.right,y2:f(0),stroke:"#9ca3af",strokeWidth:"1"}),e.jsx("line",{x1:u(1-a),y1:o.top,x2:u(1-a),y2:d-o.bottom,stroke:"#ef4444",strokeWidth:"1",strokeDasharray:"4,4",opacity:"0.5"}),e.jsx("line",{x1:u(1+a),y1:o.top,x2:u(1+a),y2:d-o.bottom,stroke:"#ef4444",strokeWidth:"1",strokeDasharray:"4,4",opacity:"0.5"}),e.jsx("polyline",{points:i.map(g=>`${u(g.r)},${f(g.objective)}`).join(" "),fill:"none",stroke:"#6366f1",strokeWidth:"2"}),e.jsx("circle",{cx:u(n),cy:f(x),r:"5",fill:"#6366f1"}),e.jsx("text",{x:u(1),y:d-5,textAnchor:"middle",className:"text-[10px]",fill:"#6b7280",children:"r(θ)"}),e.jsx("text",{x:u(1-a),y:d-5,textAnchor:"middle",className:"text-[9px]",fill:"#ef4444",children:"1-ε"}),e.jsx("text",{x:u(1+a),y:d-5,textAnchor:"middle",className:"text-[9px]",fill:"#ef4444",children:"1+ε"})]}),e.jsxs("div",{className:"mt-3 grid grid-cols-3 gap-2 text-center text-xs",children:[e.jsxs("div",{className:"rounded bg-blue-50 p-2 dark:bg-blue-900/30",children:[e.jsx("div",{className:"text-blue-600 dark:text-blue-400",children:"Unclipped"}),e.jsx("div",{className:"font-bold",children:c.toFixed(4)})]}),e.jsxs("div",{className:"rounded bg-amber-50 p-2 dark:bg-amber-900/30",children:[e.jsx("div",{className:"text-amber-600 dark:text-amber-400",children:"Clipped"}),e.jsx("div",{className:"font-bold",children:h.toFixed(4)})]}),e.jsxs("div",{className:"rounded bg-green-50 p-2 dark:bg-green-900/30",children:[e.jsx("div",{className:"text-green-600 dark:text-green-400",children:"PPO Objective"}),e.jsx("div",{className:"font-bold",children:x.toFixed(4)})]})]})]})}function L(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"PPO for Nifty Portfolio Allocation"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Proximal Policy Optimization (PPO) is the most popular policy gradient algorithm in modern RL, combining the stability of trust-region methods with the simplicity of first-order optimization. PPO is particularly well-suited for trading applications on NSE because it handles continuous action spaces (portfolio weights) and provides stable training without extensive hyperparameter tuning."}),e.jsx(j,{title:"Proximal Policy Optimization (PPO)",label:"Definition 14.5",definition:"PPO is a policy gradient method that constrains policy updates to stay within a trust region by clipping the probability ratio r(θ) = π_θ(a|s) / π_θ_old(a|s). The clipped objective prevents destructively large updates while allowing the policy to improve monotonically.",notation:"The clip parameter ε (typically 0.1-0.3) controls the size of the trust region."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"PPO Objective Function"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The PPO-Clip objective is:"}),e.jsx(t.BlockMath,{math:"L^{\\text{CLIP}}(\\theta) = \\hat{\\mathbb{E}}_t\\left[\\min\\left(r_t(\\theta)\\hat{A}_t, \\;\\text{clip}(r_t(\\theta), 1-\\epsilon, 1+\\epsilon)\\hat{A}_t\\right)\\right]"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"where the probability ratio and advantage are:"}),e.jsx(t.BlockMath,{math:"r_t(\\theta) = \\frac{\\pi_\\theta(a_t | s_t)}{\\pi_{\\theta_{\\text{old}}}(a_t | s_t)}, \\quad \\hat{A}_t = \\sum_{l=0}^{T-t} (\\gamma\\lambda)^l \\delta_{t+l}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The GAE (Generalized Advantage Estimation) uses TD residuals:"}),e.jsx(t.BlockMath,{math:"\\delta_t = R_{t+1} + \\gamma V(S_{t+1}) - V(S_t)"}),e.jsx(N,{title:"PPO Trust Region Guarantee",label:"Theorem 14.4",statement:"The clipped PPO objective provides a lower bound on the true policy improvement. For any ε > 0, the PPO update satisfies: J(π_new) ≥ L^CLIP(θ) - C·KL(π_old || π_new), where C depends on the MDP structure. This ensures monotonic improvement in expectation.",proof:"When r(θ) is within [1-ε, 1+ε], the objective equals the standard policy gradient. When r(θ) exceeds this range, clipping prevents the objective from increasing further, thus discouraging large policy changes. The min operator ensures the clipped version is a pessimistic bound. Combined with the GAE advantage estimator, this yields stable updates that approximate TRPO's constraint without solving a constrained optimization problem."}),e.jsx(F,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"PPO Architecture for Nifty Trading"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For Nifty 50 portfolio allocation, we use a shared actor-critic network that outputs portfolio weights for all 50 constituents plus a cash allocation:"}),e.jsx(t.BlockMath,{math:"\\pi_\\theta(a | s) = \\text{Dirichlet}(\\alpha_1, \\alpha_2, \\ldots, \\alpha_{51})"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The Dirichlet distribution ensures weights sum to 1 and are non-negative, satisfying the portfolio constraint. The concentration parameters"," ",e.jsx(t.InlineMath,{math:"\\alpha_i = \\text{softplus}(f_\\theta^i(s))"})," are output by the policy network."]}),e.jsx(S,{title:"ppo_nifty_trading.py",runnable:!0,code:`import numpy as np
from collections import deque

class PPOBuffer:
    """Experience buffer for PPO training."""
    def __init__(self, obs_dim, act_dim, size=2048, gamma=0.99, lam=0.95):
        self.obs = np.zeros((size, obs_dim), dtype=np.float32)
        self.actions = np.zeros((size, act_dim), dtype=np.float32)
        self.rewards = np.zeros(size, dtype=np.float32)
        self.values = np.zeros(size, dtype=np.float32)
        self.log_probs = np.zeros(size, dtype=np.float32)
        self.advantages = np.zeros(size, dtype=np.float32)
        self.returns = np.zeros(size, dtype=np.float32)
        self.gamma = gamma
        self.lam = lam
        self.ptr = 0
        self.size = size

    def store(self, obs, action, reward, value, log_prob):
        idx = self.ptr % self.size
        self.obs[idx] = obs
        self.actions[idx] = action
        self.rewards[idx] = reward
        self.values[idx] = value
        self.log_probs[idx] = log_prob
        self.ptr += 1

    def compute_gae(self, last_value=0):
        """Compute GAE-Lambda advantages."""
        n = min(self.ptr, self.size)
        last_gae = 0
        for t in reversed(range(n)):
            if t == n - 1:
                next_value = last_value
            else:
                next_value = self.values[t + 1]
            delta = self.rewards[t] + self.gamma * next_value - self.values[t]
            last_gae = delta + self.gamma * self.lam * last_gae
            self.advantages[t] = last_gae
        self.returns[:n] = self.advantages[:n] + self.values[:n]

        # Normalize advantages
        adv = self.advantages[:n]
        self.advantages[:n] = (adv - adv.mean()) / (adv.std() + 1e-8)


class PPOAgent:
    """
    PPO agent for Nifty portfolio allocation.
    Simplified implementation for educational purposes.
    """
    def __init__(self, obs_dim=60, n_assets=5, lr=3e-4,
                 clip_epsilon=0.2, epochs=10, batch_size=64):
        self.obs_dim = obs_dim
        self.n_assets = n_assets
        self.clip_epsilon = clip_epsilon
        self.epochs = epochs
        self.batch_size = batch_size

        # Simplified policy parameters (normally a neural network)
        np.random.seed(42)
        self.policy_weights = np.random.randn(obs_dim, n_assets) * 0.01
        self.value_weights = np.random.randn(obs_dim, 1) * 0.01
        self.lr = lr

    def get_action(self, obs):
        """Sample action from policy (portfolio weights)."""
        logits = obs @ self.policy_weights
        # Softmax to get portfolio weights
        exp_logits = np.exp(logits - logits.max())
        weights = exp_logits / exp_logits.sum()

        # Add exploration noise
        noise = np.random.dirichlet(np.ones(self.n_assets) * 10)
        weights = 0.8 * weights + 0.2 * noise

        log_prob = np.sum(np.log(weights + 1e-8))
        return weights, log_prob

    def get_value(self, obs):
        """Estimate state value."""
        return float(obs @ self.value_weights)

    def compute_ppo_loss(self, old_log_probs, new_log_probs, advantages):
        """Compute clipped PPO objective."""
        ratio = np.exp(new_log_probs - old_log_probs)
        clipped_ratio = np.clip(ratio, 1 - self.clip_epsilon,
                                1 + self.clip_epsilon)
        loss = -np.minimum(ratio * advantages, clipped_ratio * advantages)
        return loss.mean(), ratio.mean()


# Demo: PPO for simplified Nifty allocation
np.random.seed(42)
n_assets = 5  # Top 5 Nifty stocks
asset_names = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK']

# Simulate 252 trading days
n_days = 252
returns = np.random.multivariate_normal(
    mean=[0.0005, 0.0004, 0.0003, 0.0006, 0.0004],
    cov=np.eye(n_assets) * 0.0004 + 0.0001,
    size=n_days
)

# Initialize PPO
obs_dim = 30  # Flattened observation
agent = PPOAgent(obs_dim=obs_dim, n_assets=n_assets,
                 clip_epsilon=0.2, lr=3e-4)
buffer = PPOBuffer(obs_dim=obs_dim, act_dim=n_assets,
                   size=2048, gamma=0.99, lam=0.95)

# Simple training loop
portfolio_value = 10_00_000  # INR 10 lakhs
portfolio_history = [portfolio_value]

print(f"PPO Trading Agent for Nifty Top 5")
print(f"Assets: {', '.join(asset_names)}")
print(f"Initial capital: INR {portfolio_value:,.0f}")
print(f"Clip epsilon: {agent.clip_epsilon}")
print(f"{'='*60}")

for day in range(min(100, n_days)):
    # Create observation (simplified)
    obs = np.random.randn(obs_dim).astype(np.float32)

    # Get action and value
    weights, log_prob = agent.get_action(obs)
    value = agent.get_value(obs)

    # Compute portfolio return
    port_return = np.dot(weights, returns[day])
    portfolio_value *= (1 + port_return)
    portfolio_history.append(portfolio_value)

    # Shaped reward (log return with drawdown penalty)
    reward = np.log(1 + port_return)

    # Store in buffer
    buffer.store(obs, weights, reward, value, log_prob)

    if day % 20 == 19:
        print(f"Day {day+1:3d} | Portfolio: INR {portfolio_value:>12,.0f} | "
              f"Weights: [{', '.join(f'{w:.2f}' for w in weights)}]")

# Compute GAE
buffer.compute_gae()

# Summary
total_return = (portfolio_value / 10_00_000 - 1) * 100
daily_returns = np.diff(np.log(portfolio_history))
sharpe = np.mean(daily_returns) / np.std(daily_returns) * np.sqrt(252)

print(f"\\n{'='*60}")
print(f"Final portfolio: INR {portfolio_value:,.0f}")
print(f"Total return: {total_return:.2f}%")
print(f"Annualized Sharpe: {sharpe:.2f}")
print(f"Max drawdown: {min(0, min(np.array(portfolio_history)/np.maximum.accumulate(portfolio_history) - 1))*100:.1f}%")`}),e.jsx(A,{title:"PPO Hyperparameter Selection for NSE",difficulty:"advanced",problem:"You are deploying a PPO agent for Nifty 50 futures trading. The environment has 252 trading days per year. Select appropriate hyperparameters for: (1) clip epsilon, (2) GAE lambda, (3) learning rate, (4) number of epochs per update.",solution:[{step:"Clip epsilon (ε = 0.1)",formula:"\\text{clip}(r_t(\\theta), 1-0.1, 1+0.1) = \\text{clip}(r_t, 0.9, 1.1)",explanation:"For financial environments with non-stationary dynamics, a smaller ε = 0.1 provides more conservative updates than the default 0.2, preventing the policy from changing too rapidly."},{step:"GAE lambda (λ = 0.97)",formula:"\\hat{A}_t = \\sum_{l=0}^{T-t} (0.99 \\times 0.97)^l \\delta_{t+l}",explanation:"Higher λ reduces bias in advantage estimation at the cost of higher variance. For trading, λ = 0.97 captures multi-day price trends."},{step:"Learning rate with schedule",formula:"\\eta_t = 3 \\times 10^{-4} \\cdot \\max(1 - t/T, 0.1)",explanation:"Linear decay from 3e-4 with a floor of 3e-5 works well for trading. Financial environments are non-stationary, so decaying the LR helps convergence."},{step:"Epochs per update (K = 4)",formula:"\\theta \\leftarrow \\theta + \\eta \\nabla L^{\\text{CLIP}}(\\theta) \\quad (4 \\text{ passes})",explanation:"Fewer epochs (4 vs typical 10) prevent overfitting to recent market data. Financial data has lower signal-to-noise ratio than game environments."}]}),e.jsx(k,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"PPO is the go-to RL algorithm for trading due to its stability and ease of implementation. For NSE-specific applications: (1) use Dirichlet policy for portfolio weight outputs, (2) reduce clip epsilon to 0.1 for more conservative updates in noisy financial environments, (3) implement proper reward shaping with Sharpe-based objectives, and (4) validate on out-of-sample NSE data across different market regimes (2008 crash, 2020 COVID crash, 2021 bull run)."})})]})}const ie=Object.freeze(Object.defineProperty({__proto__:null,default:L},Symbol.toStringTag,{value:"Module"}));function B(){const[a,b]=m.useState(4),[l,w]=m.useState(.01),[n,_]=m.useState(.5),[c,y]=m.useState(5),[h,x]=m.useState(Array(8).fill(null).map(()=>(Math.random()*20-5).toFixed(2))),i=h.slice(0,a).map(Number),s=i.reduce((r,p)=>r+p,0)/a,d=i.reduce((r,p)=>r+(p-s)**2,0)/a,o=()=>{x(Array(8).fill(null).map(()=>(Math.random()*20-5).toFixed(2)))};return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: A2C/A3C Worker Visualization"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Visualize how multiple workers explore different market scenarios simultaneously. Each worker trades a different NSE stock from the Nifty basket."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Workers: ",a]}),e.jsx("input",{type:"range",min:"1",max:"8",step:"1",value:a,onChange:r=>b(parseInt(r.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Entropy coeff: ",l.toFixed(3)]}),e.jsx("input",{type:"range",min:"0",max:"0.05",step:"0.005",value:l,onChange:r=>w(parseFloat(r.target.value)),className:"h-2 w-full cursor-pointer accent-green-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Value loss coeff: ",n.toFixed(2)]}),e.jsx("input",{type:"range",min:"0.1",max:"1.0",step:"0.1",value:n,onChange:r=>_(parseFloat(r.target.value)),className:"h-2 w-full cursor-pointer accent-amber-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["n-steps: ",c]}),e.jsx("input",{type:"range",min:"1",max:"20",step:"1",value:c,onChange:r=>y(parseInt(r.target.value)),className:"h-2 w-full cursor-pointer accent-red-500"})]})]}),e.jsx("div",{className:"mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4",children:Array(a).fill(null).map((r,p)=>{const u=["RELIANCE","TCS","HDFCBANK","INFY","ICICIBANK","KOTAKBANK","LT","WIPRO"],v=i[p];return e.jsxs("div",{className:`rounded-lg p-3 text-center ${v>=0?"bg-green-50 dark:bg-green-900/20":"bg-red-50 dark:bg-red-900/20"}`,children:[e.jsxs("div",{className:"text-xs font-semibold text-gray-600 dark:text-gray-400",children:["Worker ",p+1,": ",u[p]]}),e.jsxs("div",{className:`text-lg font-bold ${v>=0?"text-green-700 dark:text-green-300":"text-red-700 dark:text-red-300"}`,children:[v>=0?"+":"",v.toFixed(2),"%"]})]},p)})}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"text-sm text-gray-600 dark:text-gray-400",children:["Avg return: ",e.jsxs("span",{className:"font-bold",children:[s.toFixed(2),"%"]})," | Variance: ",e.jsx("span",{className:"font-bold",children:d.toFixed(2)})," | Gradient variance reduction: ",e.jsxs("span",{className:"font-bold text-green-600",children:["~",(1/Math.sqrt(a)*100).toFixed(0),"%"]})]}),e.jsx("button",{onClick:o,className:"rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700",children:"Resample"})]})]})}function D(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"A2C and A3C for Multi-Asset Indian Trading"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Advantage Actor-Critic (A2C) and its asynchronous variant (A3C) are foundational actor-critic methods that learn both a policy (actor) and a value function (critic) simultaneously. For multi-asset trading on Indian exchanges, these methods excel by using parallel workers to explore diverse market scenarios across different NSE stocks."}),e.jsx(j,{title:"Advantage Actor-Critic (A2C)",label:"Definition 14.6",definition:"A2C is a synchronous actor-critic method that uses n parallel environment workers to collect experience simultaneously. The advantage function A(s,a) = Q(s,a) - V(s) measures how much better action a is compared to the average action in state s. A2C updates the policy and value function using the mean gradient across all workers.",notation:"π_θ(a|s) is the actor (policy), V_φ(s) is the critic (value function), A(s,a) is the advantage."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"A2C Loss Function"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The A2C loss combines three components: policy loss, value loss, and entropy bonus:"}),e.jsx(t.BlockMath,{math:"L = L_{\\text{policy}} + c_v \\cdot L_{\\text{value}} - c_e \\cdot H[\\pi_\\theta]"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The policy gradient uses the advantage to reduce variance:"}),e.jsx(t.BlockMath,{math:"L_{\\text{policy}} = -\\mathbb{E}\\left[\\log \\pi_\\theta(a_t | s_t) \\cdot \\hat{A}_t\\right]"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The value function is trained with MSE loss:"}),e.jsx(t.BlockMath,{math:"L_{\\text{value}} = \\mathbb{E}\\left[(V_\\phi(s_t) - G_t)^2\\right]"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The entropy bonus encourages exploration, crucial in financial markets:"}),e.jsx(t.BlockMath,{math:"H[\\pi_\\theta] = -\\sum_a \\pi_\\theta(a|s) \\log \\pi_\\theta(a|s)"}),e.jsx(N,{title:"Variance Reduction via Advantage",label:"Theorem 14.5",statement:"Using the advantage function A(s,a) = Q(s,a) - V(s) as the policy gradient weighting reduces the variance of gradient estimates compared to using returns G_t, without introducing bias: Var[∇ log π · A] ≤ Var[∇ log π · G_t].",proof:"The baseline V(s) is independent of the action a, so subtracting it does not change the expected gradient: E[∇log π(a|s) · A(s,a)] = E[∇log π(a|s) · Q(s,a)] - E[∇log π(a|s)] · V(s) = E[∇log π(a|s) · Q(s,a)] since E[∇log π(a|s)] = 0. However, the variance decreases because we center the signal: Var[X - c] = Var[X] + c² - 2cE[X], which is minimized when c = E[X], approximated by V(s)."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"A3C: Asynchronous Advantage Actor-Critic"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["A3C extends A2C with ",e.jsx("strong",{children:"asynchronous"})," gradient updates. Each worker independently interacts with its own copy of the trading environment (potentially different NSE stocks or time periods) and asynchronously updates the shared parameters:"]}),e.jsx(t.BlockMath,{math:"\\theta_{\\text{global}} \\leftarrow \\theta_{\\text{global}} + \\alpha \\sum_{i=1}^{N} \\nabla_\\theta L_i(\\theta_i)"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Feature"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"A2C (Synchronous)"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"A3C (Asynchronous)"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Update style"}),e.jsx("td",{className:"px-5 py-2",children:"Batch, synchronized"}),e.jsx("td",{className:"px-5 py-2",children:"Lock-free, async"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"GPU utilization"}),e.jsx("td",{className:"px-5 py-2",children:"Efficient (batched)"}),e.jsx("td",{className:"px-5 py-2",children:"Less efficient"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Exploration"}),e.jsx("td",{className:"px-5 py-2",children:"Via entropy bonus"}),e.jsx("td",{className:"px-5 py-2",children:"Via diverse workers"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Stability"}),e.jsx("td",{className:"px-5 py-2",children:"More stable"}),e.jsx("td",{className:"px-5 py-2",children:"Can be unstable"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-5 py-2",children:"Best for"}),e.jsx("td",{className:"px-5 py-2",children:"GPU training"}),e.jsx("td",{className:"px-5 py-2",children:"CPU-only, multi-core"})]})]})]})}),e.jsx(k,{title:"A2C vs A3C in Practice",type:"info",children:e.jsx("p",{children:"In modern practice, A2C (synchronous) is preferred over A3C because it is simpler, more reproducible, and better utilizes GPU batching. A2C with multiple vectorized environments achieves similar exploration benefits as A3C without the complexity of asynchronous gradient updates. For NSE trading, use A2C with each worker trading a different stock or time period from the Nifty 50 universe."})}),e.jsx(B,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Multi-Asset A2C for Indian Markets"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For multi-asset trading, each worker can specialize in different market segments:"}),e.jsx(t.BlockMath,{math:"\\text{Worker}_i : \\text{env}_i \\sim \\{\\text{Nifty IT}, \\text{Nifty Bank}, \\text{Nifty Pharma}, \\text{Nifty FMCG}, \\ldots\\}"}),e.jsx(S,{title:"a2c_multi_asset.py",runnable:!0,code:`import numpy as np
from typing import List, Tuple

class ActorCriticNetwork:
    """Simple actor-critic for multi-asset Indian trading."""
    def __init__(self, obs_dim: int, n_actions: int, hidden: int = 64):
        self.obs_dim = obs_dim
        self.n_actions = n_actions
        np.random.seed(42)

        # Actor weights
        self.W_actor1 = np.random.randn(obs_dim, hidden) * 0.1
        self.W_actor2 = np.random.randn(hidden, n_actions) * 0.1

        # Critic weights
        self.W_critic1 = np.random.randn(obs_dim, hidden) * 0.1
        self.W_critic2 = np.random.randn(hidden, 1) * 0.1

    def forward(self, obs: np.ndarray) -> Tuple[np.ndarray, float]:
        """Compute policy logits and value."""
        # Actor
        h_a = np.tanh(obs @ self.W_actor1)
        logits = h_a @ self.W_actor2
        probs = np.exp(logits - logits.max())
        probs = probs / probs.sum()

        # Critic
        h_c = np.tanh(obs @ self.W_critic1)
        value = float(h_c @ self.W_critic2)

        return probs, value


class A2CTrader:
    """
    A2C agent for multi-asset Indian market trading.
    Uses vectorized environments for parallel data collection.
    """
    def __init__(self, n_workers: int = 4, n_assets: int = 5,
                 obs_dim: int = 30, n_steps: int = 5,
                 gamma: float = 0.99, entropy_coeff: float = 0.01,
                 value_coeff: float = 0.5, lr: float = 7e-4):
        self.n_workers = n_workers
        self.n_assets = n_assets
        self.n_steps = n_steps
        self.gamma = gamma
        self.entropy_coeff = entropy_coeff
        self.value_coeff = value_coeff
        self.lr = lr

        self.network = ActorCriticNetwork(obs_dim, 3)  # buy/hold/sell

    def collect_rollouts(self, prices_batch: np.ndarray,
                          step_idx: int) -> dict:
        """Collect n-step rollouts from all workers."""
        obs_dim = self.network.obs_dim
        rollout = {
            'obs': [], 'actions': [], 'rewards': [],
            'values': [], 'log_probs': []
        }

        for w in range(self.n_workers):
            for t in range(self.n_steps):
                obs = np.random.randn(obs_dim).astype(np.float32)
                probs, value = self.network.forward(obs)
                action = np.random.choice(3, p=probs)

                idx = min(step_idx + t, len(prices_batch[w]) - 2)
                ret = (prices_batch[w][idx+1] - prices_batch[w][idx]) / prices_batch[w][idx]

                if action == 2:  # Buy
                    reward = ret * 10
                elif action == 0:  # Sell
                    reward = -ret * 10
                else:
                    reward = 0.0

                rollout['obs'].append(obs)
                rollout['actions'].append(action)
                rollout['rewards'].append(reward)
                rollout['values'].append(value)
                rollout['log_probs'].append(np.log(probs[action] + 1e-8))

        return {k: np.array(v) for k, v in rollout.items()}

    def compute_advantages(self, rewards, values, last_value=0):
        """Compute n-step returns and advantages."""
        n = len(rewards)
        returns = np.zeros(n)
        advantages = np.zeros(n)

        R = last_value
        for t in reversed(range(n)):
            R = rewards[t] + self.gamma * R
            returns[t] = R
            advantages[t] = R - values[t]

        # Normalize
        if advantages.std() > 1e-8:
            advantages = (advantages - advantages.mean()) / (advantages.std() + 1e-8)

        return returns, advantages

    def compute_losses(self, rollout, advantages, returns):
        """Compute A2C losses."""
        log_probs = rollout['log_probs']
        values = rollout['values']

        # Policy loss
        policy_loss = -(log_probs * advantages).mean()

        # Value loss
        value_loss = ((values - returns) ** 2).mean()

        # Entropy (approximate)
        entropy = -(np.exp(log_probs) * log_probs).mean()

        total_loss = (policy_loss
                     + self.value_coeff * value_loss
                     - self.entropy_coeff * entropy)

        return {
            'total': total_loss,
            'policy': policy_loss,
            'value': value_loss,
            'entropy': entropy
        }


# Demo: A2C for Nifty sectoral trading
np.random.seed(42)
nifty_sectors = ['Nifty Bank', 'Nifty IT', 'Nifty Pharma', 'Nifty Auto']
n_workers = len(nifty_sectors)
n_days = 252

# Generate sectoral prices
sector_prices = []
for i, sector in enumerate(nifty_sectors):
    base = [20000, 35000, 15000, 18000][i]
    drift = [0.0004, 0.0006, 0.0003, 0.0005][i]
    vol = [0.015, 0.02, 0.012, 0.018][i]
    returns = np.random.normal(drift, vol, n_days)
    prices = base * np.cumprod(1 + returns)
    sector_prices.append(prices)

sector_prices = np.array(sector_prices)

# Train A2C
agent = A2CTrader(n_workers=n_workers, n_steps=5,
                   entropy_coeff=0.01, value_coeff=0.5)

print(f"A2C Multi-Asset Trading (NSE Sectoral)")
print(f"Workers: {n_workers} ({', '.join(nifty_sectors)})")
print(f"n-steps: {agent.n_steps}, gamma: {agent.gamma}")
print(f"Entropy coeff: {agent.entropy_coeff}")
print(f"{'='*60}")

total_episodes = 0
for epoch in range(10):
    step_idx = epoch * 20
    rollout = agent.collect_rollouts(sector_prices, step_idx)

    returns, advantages = agent.compute_advantages(
        rollout['rewards'], rollout['values']
    )

    losses = agent.compute_losses(rollout, advantages, returns)
    total_episodes += n_workers * agent.n_steps

    print(f"Epoch {epoch+1:2d} | Loss: {losses['total']:>8.4f} | "
          f"Policy: {losses['policy']:>7.4f} | Value: {losses['value']:>7.4f} | "
          f"Entropy: {losses['entropy']:>6.4f}")

print(f"\\nTotal transitions: {total_episodes}")
print(f"Gradient variance reduction: ~{1/np.sqrt(n_workers):.2f}x")`}),e.jsx(A,{title:"A2C Worker Design for Indian Markets",difficulty:"intermediate",problem:"Design a 4-worker A2C setup for Indian market trading. Each worker should explore a different market regime. Specify the observation space, action space, and how workers contribute to gradient diversity.",solution:[{step:"Assign workers to different stocks/sectors",formula:"\\text{Workers} = \\{\\text{RELIANCE}, \\text{TCS}, \\text{HDFCBANK}, \\text{SBIN}\\}",explanation:"Each worker trades a different Nifty stock, ensuring diverse exploration of market dynamics (energy, IT, private banking, PSU banking)."},{step:"Define shared observation space",formula:"s \\in \\mathbb{R}^{30 \\times 6} \\quad (\\text{30-day window} \\times \\text{6 features})",explanation:"All workers share the same observation structure with normalized features (returns, volume ratio, RSI, MACD, position, unrealized PnL)."},{step:"Compute mean gradient across workers",formula:"g = \\frac{1}{N}\\sum_{i=1}^{4} \\nabla_\\theta L_i",explanation:"Synchronous averaging of gradients from all 4 workers reduces variance by a factor of 1/√4 = 0.5 compared to single-worker training."}]}),e.jsx(k,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"A2C/A3C methods provide natural parallelism for exploring diverse market scenarios. For Indian market trading, use A2C (synchronous) with vectorized environments where each worker trades a different Nifty constituent or sector. The entropy bonus is crucial -- set it to 0.01-0.02 to prevent premature convergence to a deterministic policy. A2C serves as a strong baseline before moving to more complex algorithms like PPO or SAC."})})]})}const ne=Object.freeze(Object.defineProperty({__proto__:null,default:D},Symbol.toStringTag,{value:"Module"}));function z(){const[a,b]=m.useState(.2),[l,w]=m.useState(.005),[n,_]=m.useState(256),[c,y]=m.useState(1e5),h=Array(20).fill(null).map((i,s)=>{const d=Math.sin(s*.3)*.5,o=a*.5;return{mean:d,std:o,sampled:d+(Math.random()-.5)*o*2}}),x=.5*Math.log(2*Math.PI*Math.E*a*a);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: SAC Temperature and Exploration"}),e.jsxs("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:["Adjust the temperature ",e.jsx(t.InlineMath,{math:"\\alpha"})," to see how it affects exploration. Higher ",e.jsx(t.InlineMath,{math:"\\alpha"})," encourages more diverse portfolio allocations."]}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Temperature ",e.jsx(t.InlineMath,{math:"\\alpha"})," = ",a.toFixed(3)]}),e.jsx("input",{type:"range",min:"0.01",max:"1.0",step:"0.01",value:a,onChange:i=>b(parseFloat(i.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Soft update ",e.jsx(t.InlineMath,{math:"\\tau"})," = ",l.toFixed(4)]}),e.jsx("input",{type:"range",min:"0.001",max:"0.05",step:"0.001",value:l,onChange:i=>w(parseFloat(i.target.value)),className:"h-2 w-full cursor-pointer accent-green-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Batch size: ",n]}),e.jsx("input",{type:"range",min:"32",max:"512",step:"32",value:n,onChange:i=>_(parseInt(i.target.value)),className:"h-2 w-full cursor-pointer accent-amber-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Buffer: ",(c/1e3).toFixed(0),"K"]}),e.jsx("input",{type:"range",min:"10000",max:"1000000",step:"10000",value:c,onChange:i=>y(parseInt(i.target.value)),className:"h-2 w-full cursor-pointer accent-red-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 400 150",className:"w-full max-w-lg mx-auto block",children:[h.map((i,s)=>e.jsxs("g",{children:[e.jsx("line",{x1:20+s*19,y1:75-i.mean*60,x2:20+s*19,y2:75-i.sampled*60,stroke:"#c4b5fd",strokeWidth:"2",opacity:"0.5"}),e.jsx("circle",{cx:20+s*19,cy:75-i.mean*60,r:"3",fill:"#6366f1"}),e.jsx("circle",{cx:20+s*19,cy:75-i.sampled*60,r:"2",fill:"#ef4444"})]},s)),e.jsx("line",{x1:"10",y1:"75",x2:"395",y2:"75",stroke:"#9ca3af",strokeWidth:"0.5"}),e.jsx("text",{x:"5",y:"12",className:"text-[9px]",fill:"#6b7280",children:"Blue=mean, Red=sampled"}),e.jsxs("text",{x:"200",y:"145",textAnchor:"middle",className:"text-[10px]",fill:"#6b7280",children:["Entropy: ",x.toFixed(3)," | Exploration spread: ",(a*.5).toFixed(3)]})]})]})}function V(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"SAC for Entropy-Regularized Trading"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Soft Actor-Critic (SAC) is a state-of-the-art off-policy algorithm that maximizes both expected return and entropy, encouraging exploration while learning. For continuous portfolio allocation on NSE -- where positions range from short to long across multiple assets -- SAC provides smooth, well-calibrated policies that avoid the brittleness of purely deterministic strategies."}),e.jsx(j,{title:"Soft Actor-Critic (SAC)",label:"Definition 14.7",definition:"SAC maximizes the maximum entropy objective: J(π) = Σ E[R(s,a) + α·H(π(·|s))], where α is the temperature parameter controlling the trade-off between reward maximization and entropy (exploration). SAC is off-policy, using a replay buffer and twin Q-networks for stable learning.",notation:"α is the temperature, H is entropy, Q_ψ are twin critics, π_θ is the actor."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Maximum Entropy Objective"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"SAC maximizes the entropy-augmented return:"}),e.jsx(t.BlockMath,{math:"J(\\pi) = \\sum_{t=0}^{T} \\mathbb{E}_{(s_t, a_t) \\sim \\rho_\\pi}\\left[r(s_t, a_t) + \\alpha \\mathcal{H}(\\pi(\\cdot|s_t))\\right]"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The soft value function satisfies:"}),e.jsx(t.BlockMath,{math:"V(s) = \\mathbb{E}_{a \\sim \\pi}\\left[Q(s, a) - \\alpha \\log \\pi(a|s)\\right]"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"And the soft Q-function follows the soft Bellman equation:"}),e.jsx(t.BlockMath,{math:"Q(s, a) = r(s, a) + \\gamma \\mathbb{E}_{s' \\sim P}\\left[V(s')\\right]"}),e.jsx(N,{title:"Soft Policy Improvement",label:"Theorem 14.6",statement:"For the maximum entropy objective, the optimal policy π* satisfies: π*(a|s) ∝ exp(Q*(s,a)/α). The soft policy improvement step, which projects this distribution onto the parametric policy class, monotonically improves the soft Q-function for all (s,a).",proof:"Define the improved policy π_new(·|s) = argmin_π D_KL(π(·|s) || exp(Q^π_old(s,·)/α) / Z). By the KL divergence inequality, for all s: E_{a~π_new}[Q^π_old(s,a) - α log π_new(a|s)] ≥ E_{a~π_old}[Q^π_old(s,a) - α log π_old(a|s)] = V^π_old(s). This implies Q^π_new(s,a) ≥ Q^π_old(s,a) for all (s,a), proving monotonic improvement."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"SAC Architecture Components"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Component"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Role"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Update"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsxs("td",{className:"px-5 py-2",children:["Actor ",e.jsx(t.InlineMath,{math:"\\pi_\\theta"})]}),e.jsx("td",{className:"px-5 py-2",children:"Outputs Gaussian policy"}),e.jsx("td",{className:"px-5 py-2",children:"Minimize KL divergence"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsxs("td",{className:"px-5 py-2",children:["Twin critics ",e.jsx(t.InlineMath,{math:"Q_{\\psi_1}, Q_{\\psi_2}"})]}),e.jsx("td",{className:"px-5 py-2",children:"Estimate soft Q-values"}),e.jsx("td",{className:"px-5 py-2",children:"Soft Bellman residual"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsxs("td",{className:"px-5 py-2",children:["Target critics ",e.jsx(t.InlineMath,{math:"\\bar{Q}"})]}),e.jsx("td",{className:"px-5 py-2",children:"Stabilize training"}),e.jsx("td",{className:"px-5 py-2",children:"Polyak averaging"})]}),e.jsxs("tr",{children:[e.jsxs("td",{className:"px-5 py-2",children:["Temperature ",e.jsx(t.InlineMath,{math:"\\alpha"})]}),e.jsx("td",{className:"px-5 py-2",children:"Balance return vs entropy"}),e.jsx("td",{className:"px-5 py-2",children:"Auto-tuned via dual gradient"})]})]})]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Automatic Temperature Tuning"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"SAC can automatically learn the temperature by solving a constrained optimization:"}),e.jsx(t.BlockMath,{math:"\\alpha^* = \\arg\\min_\\alpha \\mathbb{E}_{a \\sim \\pi^*}\\left[-\\alpha \\log \\pi^*(a|s) - \\alpha \\bar{\\mathcal{H}}\\right]"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"\\bar{\\mathcal{H}}"})," is the target entropy, typically set to"," ",e.jsx(t.InlineMath,{math:"-\\dim(\\mathcal{A})"})," for continuous action spaces."]}),e.jsx(z,{}),e.jsx(S,{title:"sac_trading.py",runnable:!0,code:`import numpy as np
from collections import deque

class ReplayBuffer:
    """Experience replay buffer for off-policy learning."""
    def __init__(self, capacity=100_000):
        self.buffer = deque(maxlen=capacity)

    def push(self, state, action, reward, next_state, done):
        self.buffer.append((state, action, reward, next_state, done))

    def sample(self, batch_size):
        indices = np.random.choice(len(self.buffer), batch_size, replace=False)
        batch = [self.buffer[i] for i in indices]
        states = np.array([b[0] for b in batch])
        actions = np.array([b[1] for b in batch])
        rewards = np.array([b[2] for b in batch])
        next_states = np.array([b[3] for b in batch])
        dones = np.array([b[4] for b in batch])
        return states, actions, rewards, next_states, dones

    def __len__(self):
        return len(self.buffer)


class SACTrader:
    """
    Soft Actor-Critic for continuous portfolio allocation.
    Trades a basket of NSE stocks with entropy-regularized exploration.
    """
    def __init__(self, obs_dim=30, act_dim=5, alpha=0.2,
                 gamma=0.99, tau=0.005, lr=3e-4):
        self.obs_dim = obs_dim
        self.act_dim = act_dim
        self.alpha = alpha
        self.gamma = gamma
        self.tau = tau
        self.lr = lr

        np.random.seed(42)
        # Actor (outputs mean and log_std of Gaussian)
        self.actor_mean_w = np.random.randn(obs_dim, act_dim) * 0.01
        self.actor_logstd_w = np.random.randn(obs_dim, act_dim) * 0.01

        # Twin critics
        self.q1_w = np.random.randn(obs_dim + act_dim, 1) * 0.01
        self.q2_w = np.random.randn(obs_dim + act_dim, 1) * 0.01

        # Target critics
        self.q1_target_w = self.q1_w.copy()
        self.q2_target_w = self.q2_w.copy()

        # Auto temperature
        self.log_alpha = np.log(alpha)
        self.target_entropy = -act_dim

        self.buffer = ReplayBuffer(capacity=100_000)

    def get_action(self, obs, deterministic=False):
        """Sample action from squashed Gaussian policy."""
        mean = obs @ self.actor_mean_w
        log_std = np.clip(obs @ self.actor_logstd_w, -5, 2)
        std = np.exp(log_std)

        if deterministic:
            action = np.tanh(mean)
        else:
            noise = np.random.randn(*mean.shape)
            pre_tanh = mean + std * noise
            action = np.tanh(pre_tanh)

        # Log probability (with tanh squashing correction)
        log_prob = -0.5 * np.sum(noise**2 + 2*log_std + np.log(2*np.pi))
        log_prob -= np.sum(np.log(1 - action**2 + 1e-6))

        return action, log_prob

    def get_q_values(self, obs, action):
        """Compute twin Q-values."""
        sa = np.concatenate([obs, action])
        q1 = float(sa @ self.q1_w)
        q2 = float(sa @ self.q2_w)
        return q1, q2

    def soft_update_targets(self):
        """Polyak averaging for target networks."""
        self.q1_target_w = self.tau * self.q1_w + (1 - self.tau) * self.q1_target_w
        self.q2_target_w = self.tau * self.q2_w + (1 - self.tau) * self.q2_target_w

    def compute_losses(self, batch):
        """Compute SAC losses (simplified)."""
        states, actions, rewards, next_states, dones = batch
        batch_size = len(states)

        # Critic loss
        q1_losses = []
        q2_losses = []
        actor_losses = []

        for i in range(batch_size):
            # Next action from current policy
            next_action, next_log_prob = self.get_action(next_states[i])

            # Target Q-value
            sa_next = np.concatenate([next_states[i], next_action])
            target_q1 = float(sa_next @ self.q1_target_w)
            target_q2 = float(sa_next @ self.q2_target_w)
            target_q = min(target_q1, target_q2) - self.alpha * next_log_prob
            target = rewards[i] + self.gamma * (1 - dones[i]) * target_q

            # Current Q-values
            q1, q2 = self.get_q_values(states[i], actions[i])
            q1_losses.append((q1 - target)**2)
            q2_losses.append((q2 - target)**2)

            # Actor loss
            new_action, log_prob = self.get_action(states[i])
            sa_new = np.concatenate([states[i], new_action])
            q_new = min(float(sa_new @ self.q1_w), float(sa_new @ self.q2_w))
            actor_losses.append(self.alpha * log_prob - q_new)

        return {
            'q1_loss': np.mean(q1_losses),
            'q2_loss': np.mean(q2_losses),
            'actor_loss': np.mean(actor_losses),
            'alpha': self.alpha
        }


# Demo: SAC for NSE portfolio trading
np.random.seed(42)
assets = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK']
n_assets = len(assets)
obs_dim = 20

agent = SACTrader(obs_dim=obs_dim, act_dim=n_assets, alpha=0.2)

# Simulate trading
n_days = 200
mu = np.array([0.0005, 0.0004, 0.0003, 0.0006, 0.0004])
cov = np.eye(n_assets) * 0.0003 + 0.00005
returns_data = np.random.multivariate_normal(mu, cov, n_days)

portfolio_value = 10_00_000  # INR 10 lakhs
print(f"SAC Entropy-Regularized Trading")
print(f"Assets: {', '.join(assets)}")
print(f"Temperature (alpha): {agent.alpha}")
print(f"Target entropy: {agent.target_entropy}")
print(f"{'='*65}")

for day in range(n_days):
    obs = np.random.randn(obs_dim).astype(np.float32)
    action, log_prob = agent.get_action(obs)

    # Convert to portfolio weights (normalize)
    weights = (action + 1) / 2  # [0, 1]
    weights = weights / (weights.sum() + 1e-8)

    # Portfolio return
    port_return = np.dot(weights, returns_data[day])
    reward = np.log(1 + port_return) * 100

    prev_value = portfolio_value
    portfolio_value *= (1 + port_return)

    # Store in replay buffer
    next_obs = np.random.randn(obs_dim).astype(np.float32)
    agent.buffer.push(obs, action, reward, next_obs, day == n_days - 1)

    if day % 40 == 39:
        # Sample batch and compute losses
        if len(agent.buffer) >= 64:
            batch = agent.buffer.sample(min(64, len(agent.buffer)))
            losses = agent.compute_losses(batch)
            agent.soft_update_targets()

            print(f"Day {day+1:3d} | Value: INR {portfolio_value:>12,.0f} | "
                  f"Q1 Loss: {losses['q1_loss']:.4f} | "
                  f"Actor Loss: {losses['actor_loss']:.4f} | "
                  f"Alpha: {losses['alpha']:.3f}")

total_return = (portfolio_value / 10_00_000 - 1) * 100
print(f"\\nFinal portfolio: INR {portfolio_value:,.0f}")
print(f"Total return: {total_return:.2f}%")
print(f"Buffer size: {len(agent.buffer)} transitions")`}),e.jsx(A,{title:"SAC Temperature Selection for Indian Markets",difficulty:"advanced",problem:"An SAC agent trades 5 Nifty stocks with continuous portfolio weights in [-1, 1] (allowing short positions). The target entropy is -dim(A) = -5. How does the temperature α affect trading behavior?",solution:[{step:"High temperature (α = 1.0)",formula:"\\pi^*(a|s) \\propto \\exp(Q(s,a) / 1.0)",explanation:"High α produces near-uniform portfolio weights, maximizing exploration. The agent diversifies across all 5 stocks equally, which may be suitable during uncertain market regimes on NSE."},{step:"Low temperature (α = 0.01)",formula:"\\pi^*(a|s) \\propto \\exp(Q(s,a) / 0.01) \\approx \\text{greedy}",explanation:"Low α produces concentrated positions in the highest-Q stock. This is aggressive and may lead to excessive concentration risk."},{step:"Optimal auto-tuned temperature",formula:"\\alpha^* : \\mathbb{E}[-\\log\\pi(a|s)] = -5",explanation:"Auto-tuning finds the α that maintains target entropy -5, balancing exploration and exploitation adaptively as market conditions change."}]}),e.jsx(k,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"SAC is ideal for continuous portfolio allocation on Indian markets because: (1) the entropy regularization naturally encourages diversification across NSE stocks, (2) off-policy learning with replay buffers makes efficient use of limited market data, (3) automatic temperature tuning adapts exploration to market conditions, and (4) twin critics with clipped Q-values prevent overestimation that could lead to reckless trading. Always validate SAC policies with realistic NSE transaction costs (STT, brokerage) before deployment."})})]})}const oe=Object.freeze(Object.defineProperty({__proto__:null,default:V},Symbol.toStringTag,{value:"Module"}));function O(){const[a,b]=m.useState([.25,.2,.2,.15,.1,.1]),l=["RELIANCE","TCS","HDFCBANK","GOI 10Y","GOLD ETF","CASH"],w=[.15,.18,.12,.07,.08,.065],n=[.28,.25,.22,.05,.12,0],_=["equity","equity","equity","bond","commodity","cash"],c=a.reduce((o,r,p)=>o+r*w[p],0),y=Math.sqrt(a.reduce((o,r,p)=>o+(r*n[p])**2,0)),h=y>0?(c-.065)/y:0,x=a.slice(0,3).reduce((o,r)=>o+r,0),i=a[3],s=a[4];a[5];const d=(o,r)=>{const p=[...a];p[o]=r;const u=p.reduce((v,f)=>v+f,0);if(u>0){const v=p.map(f=>f/u);b(v)}};return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Multi-Asset Portfolio Allocator"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust weights across Indian equities, bonds, gold, and cash. Weights auto-normalize."}),e.jsx("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3",children:l.map((o,r)=>e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{className:`font-semibold ${_[r]==="equity"?"text-blue-600 dark:text-blue-400":_[r]==="bond"?"text-green-600 dark:text-green-400":_[r]==="commodity"?"text-amber-600 dark:text-amber-400":"text-gray-600 dark:text-gray-400"}`,children:[o,": ",(a[r]*100).toFixed(1),"%"]}),e.jsx("input",{type:"range",min:"0",max:"1",step:"0.01",value:a[r],onChange:p=>d(r,parseFloat(p.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]},r))}),e.jsxs("div",{className:"grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("div",{className:"rounded-lg bg-blue-50 p-3 text-center dark:bg-blue-900/30",children:[e.jsx("div",{className:"text-xs text-blue-600 dark:text-blue-400",children:"Expected Return"}),e.jsxs("div",{className:"text-lg font-bold text-blue-800 dark:text-blue-200",children:[(c*100).toFixed(1),"%"]})]}),e.jsxs("div",{className:"rounded-lg bg-red-50 p-3 text-center dark:bg-red-900/30",children:[e.jsx("div",{className:"text-xs text-red-600 dark:text-red-400",children:"Volatility"}),e.jsxs("div",{className:"text-lg font-bold text-red-800 dark:text-red-200",children:[(y*100).toFixed(1),"%"]})]}),e.jsxs("div",{className:"rounded-lg bg-green-50 p-3 text-center dark:bg-green-900/30",children:[e.jsx("div",{className:"text-xs text-green-600 dark:text-green-400",children:"Sharpe Ratio"}),e.jsx("div",{className:"text-lg font-bold text-green-800 dark:text-green-200",children:h.toFixed(2)})]}),e.jsxs("div",{className:"rounded-lg bg-purple-50 p-3 text-center dark:bg-purple-900/30",children:[e.jsx("div",{className:"text-xs text-purple-600 dark:text-purple-400",children:"Equity/Bond/Alt"}),e.jsxs("div",{className:"text-sm font-bold text-purple-800 dark:text-purple-200",children:[(x*100).toFixed(0),"/",(i*100).toFixed(0),"/",(s*100).toFixed(0)]})]})]})]})}function W(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Multi-Asset RL with Indian Stocks and Bonds"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Real-world portfolio management involves allocating capital across multiple asset classes -- equities, government bonds, corporate bonds, gold, and cash equivalents. An RL agent managing an Indian portfolio must navigate the interplay between NSE equities, government securities (G-Secs), gold ETFs, and RBI repo-rate-linked instruments while respecting regulatory constraints."}),e.jsx(j,{title:"Multi-Asset Portfolio MDP",label:"Definition 14.8",definition:"A multi-asset portfolio MDP extends the single-asset framework to N assets with portfolio weight vector w_t ∈ ℝ^N subject to constraints. The state includes price histories for all assets, the current allocation, and macro indicators. The action is the target portfolio weight vector.",notation:"w_t = [w_1^t, w_2^t, ..., w_N^t] where Σw_i = 1 and w_i ≥ 0 (long-only) or w_i ∈ [-1,1] (long-short)."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Indian Multi-Asset Universe"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"A comprehensive Indian multi-asset portfolio includes:"}),e.jsx(t.BlockMath,{math:"\\mathcal{U} = \\underbrace{\\{N_{50}, N_{\\text{Bank}}, N_{\\text{IT}}, \\ldots\\}}_{\\text{Nifty indices/ETFs}} \\cup \\underbrace{\\{G_5, G_{10}, G_{30}\\}}_{\\text{GOI bonds}} \\cup \\underbrace{\\{Au, Ag\\}}_{\\text{metals}} \\cup \\underbrace{\\{T_{\\text{bill}}\\}}_{\\text{cash}}"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Asset Class"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Indian Instruments"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Avg Return"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Volatility"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Large Cap Equity"}),e.jsx("td",{className:"px-4 py-2",children:"Nifty 50 ETF"}),e.jsx("td",{className:"px-4 py-2",children:"~12-15%"}),e.jsx("td",{className:"px-4 py-2",children:"~18-22%"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Mid Cap Equity"}),e.jsx("td",{className:"px-4 py-2",children:"Nifty Midcap 150"}),e.jsx("td",{className:"px-4 py-2",children:"~15-18%"}),e.jsx("td",{className:"px-4 py-2",children:"~22-28%"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Government Bonds"}),e.jsx("td",{className:"px-4 py-2",children:"GOI 10Y G-Sec"}),e.jsx("td",{className:"px-4 py-2",children:"~6-8%"}),e.jsx("td",{className:"px-4 py-2",children:"~4-6%"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Gold"}),e.jsx("td",{className:"px-4 py-2",children:"SGB / Gold ETF"}),e.jsx("td",{className:"px-4 py-2",children:"~8-10%"}),e.jsx("td",{className:"px-4 py-2",children:"~12-15%"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Cash"}),e.jsx("td",{className:"px-4 py-2",children:"Liquid funds / T-bills"}),e.jsx("td",{className:"px-4 py-2",children:"~5-7%"}),e.jsx("td",{className:"px-4 py-2",children:"~0.5%"})]})]})]})}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Portfolio Return with Transaction Costs"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The portfolio return after rebalancing from ",e.jsx(t.InlineMath,{math:"w_{t-1}"})," to ",e.jsx(t.InlineMath,{math:"w_t"}),":"]}),e.jsx(t.BlockMath,{math:"R_t^p = \\sum_{i=1}^N w_i^t \\cdot r_i^t - \\underbrace{c \\cdot \\|w_t - \\hat{w}_{t-1}\\|_1}_{\\text{turnover cost}}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"\\hat{w}_{t-1}"})," is the drift-adjusted weight before rebalancing:"]}),e.jsx(t.BlockMath,{math:"\\hat{w}_{i,t-1} = \\frac{w_{i,t-1}(1 + r_i^t)}{\\sum_j w_{j,t-1}(1 + r_j^t)}"}),e.jsx(N,{title:"RL vs Mean-Variance in Multi-Asset Allocation",label:"Theorem 14.7",statement:"An RL agent with sufficient state information and training time can learn policies that dominate static mean-variance optimal allocations in non-stationary environments, because RL policies are adaptive to regime changes while MVO weights are fixed.",proof:"In a non-stationary environment with K regimes, the MVO solution optimizes for the average covariance matrix Σ̄ = (1/K)ΣΣ_k. An RL agent with regime-discriminating state features can learn conditional policies π*(a|s,k) that approximate the regime-specific MVO solution for each k. Since the conditional optimum dominates the unconditional average: max_w w'μ_k - λw'Σ_kw ≥ max_w w'μ̄ - λw'Σ̄w for each k, the RL agent achieves higher risk-adjusted returns."}),e.jsx(O,{}),e.jsx(S,{title:"multi_asset_rl.py",runnable:!0,code:`import numpy as np

class MultiAssetEnv:
    """
    Multi-asset RL environment for Indian markets.
    Trades equities, bonds, gold, and cash.
    """
    def __init__(self, returns_data, asset_names, initial_capital=50_00_000,
                 transaction_cost=0.002, window=20):
        self.returns_data = returns_data
        self.asset_names = asset_names
        self.n_assets = len(asset_names)
        self.initial_capital = initial_capital
        self.tc = transaction_cost
        self.window = window
        self.reset()

    def reset(self):
        self.step_idx = self.window
        self.weights = np.ones(self.n_assets) / self.n_assets
        self.portfolio_value = self.initial_capital
        self.peak = self.initial_capital
        return self._get_obs()

    def _get_obs(self):
        """Get observation: windowed returns + current weights."""
        idx = self.step_idx
        ret_window = self.returns_data[idx-self.window:idx]
        # Flatten and append weights
        obs = np.concatenate([ret_window.flatten(), self.weights])
        return obs.astype(np.float32)

    def step(self, target_weights):
        """Rebalance to target weights and step forward."""
        # Normalize weights to sum to 1
        target_weights = np.clip(target_weights, 0, 1)
        target_weights = target_weights / (target_weights.sum() + 1e-8)

        # Compute turnover cost
        drift_weights = self.weights * (1 + self.returns_data[self.step_idx])
        drift_weights = drift_weights / (drift_weights.sum() + 1e-8)
        turnover = np.sum(np.abs(target_weights - drift_weights))
        tc_cost = self.tc * turnover

        # Update weights
        self.weights = target_weights

        # Portfolio return
        port_return = np.dot(self.weights, self.returns_data[self.step_idx]) - tc_cost
        self.portfolio_value *= (1 + port_return)
        self.peak = max(self.peak, self.portfolio_value)

        # Advance
        self.step_idx += 1
        done = self.step_idx >= len(self.returns_data) - 1

        # Reward: log return with drawdown penalty
        reward = np.log(1 + port_return)
        drawdown = (self.peak - self.portfolio_value) / self.peak
        if drawdown > 0.1:
            reward -= 0.5 * (drawdown - 0.1)

        obs = self._get_obs()
        info = {
            'portfolio_value': self.portfolio_value,
            'weights': self.weights.copy(),
            'turnover': turnover,
            'drawdown': drawdown
        }
        return obs, reward, done, info


class RLPortfolioAgent:
    """Simple policy gradient agent for multi-asset allocation."""
    def __init__(self, obs_dim, n_assets, lr=1e-3):
        np.random.seed(42)
        self.W = np.random.randn(obs_dim, n_assets) * 0.01
        self.lr = lr

    def act(self, obs, explore=True):
        logits = obs @ self.W
        # Softmax for portfolio weights
        exp_logits = np.exp(logits - logits.max())
        weights = exp_logits / exp_logits.sum()

        if explore:
            noise = np.random.dirichlet(np.ones(len(weights)) * 20)
            weights = 0.9 * weights + 0.1 * noise

        return weights


# Setup Indian multi-asset universe
np.random.seed(42)
n_days = 500
asset_names = ['Nifty50', 'NiftyBank', 'GOI_10Y', 'GoldETF', 'LiquidFund']
n_assets = len(asset_names)

# Generate correlated returns
means = np.array([0.0005, 0.0006, 0.00025, 0.00035, 0.00022])
vols = np.array([0.015, 0.018, 0.004, 0.010, 0.001])
corr = np.array([
    [1.0, 0.85, -0.2, -0.1, 0.0],
    [0.85, 1.0, -0.15, -0.05, 0.0],
    [-0.2, -0.15, 1.0, 0.3, 0.5],
    [-0.1, -0.05, 0.3, 1.0, 0.1],
    [0.0, 0.0, 0.5, 0.1, 1.0]
])
cov = np.outer(vols, vols) * corr
returns_data = np.random.multivariate_normal(means, cov, n_days)

# Create environment
env = MultiAssetEnv(returns_data, asset_names, initial_capital=50_00_000)
obs = env.reset()

obs_dim = len(obs)
agent = RLPortfolioAgent(obs_dim, n_assets)

# Training loop
print(f"Multi-Asset RL Portfolio (Indian Markets)")
print(f"Assets: {', '.join(asset_names)}")
print(f"Initial: INR {env.initial_capital:,.0f}")
print(f"{'='*70}")

total_reward = 0
for day in range(min(200, n_days - env.window - 1)):
    weights = agent.act(obs, explore=True)
    obs, reward, done, info = env.step(weights)
    total_reward += reward

    if day % 40 == 39:
        w_str = ' | '.join(f"{n}:{w:.1%}" for n, w in zip(asset_names, info['weights']))
        print(f"Day {day+1:3d} | INR {info['portfolio_value']:>12,.0f} | "
              f"DD: {info['drawdown']:.1%} | {w_str}")

    if done:
        break

# Compare with equal-weight benchmark
eq_returns = returns_data[env.window:env.window+200].mean(axis=1)
eq_portfolio = 50_00_000 * np.cumprod(1 + eq_returns)

print(f"\\n{'='*70}")
print(f"RL Portfolio:  INR {info['portfolio_value']:>12,.0f} ({(info['portfolio_value']/50_00_000-1)*100:+.1f}%)")
print(f"Equal Weight:  INR {eq_portfolio[-1]:>12,.0f} ({(eq_portfolio[-1]/50_00_000-1)*100:+.1f}%)")
print(f"Max Drawdown:  {info['drawdown']:.1%}")`}),e.jsx(A,{title:"Multi-Asset Allocation Constraints",difficulty:"intermediate",problem:"A SEBI-registered PMS (Portfolio Management Service) in India must maintain: (1) max 10% in any single stock, (2) min 20% in debt instruments, (3) max 15% in gold. Formulate these as constraints in the RL action space.",solution:[{step:"Single stock concentration limit",formula:"w_i \\leq 0.10 \\quad \\forall i \\in \\text{equities}",explanation:"SEBI PMS guidelines limit single-stock exposure. The RL agent output is clipped: w_i = min(w_i, 0.10)."},{step:"Minimum debt allocation",formula:"\\sum_{j \\in \\text{debt}} w_j \\geq 0.20",explanation:"If debt allocation falls below 20%, redistribute from overweight equity positions proportionally."},{step:"Gold exposure cap",formula:"w_{\\text{gold}} \\leq 0.15",explanation:"Cap gold allocation and redistribute excess to liquid funds (cash equivalent)."},{step:"Implement in action post-processing",formula:"w^{\\text{valid}} = \\text{project}(w^{\\text{raw}}, \\mathcal{C})",explanation:"Project the raw RL output onto the feasible constraint set using iterative clipping and renormalization. This preserves the policy gradient while ensuring regulatory compliance."}]}),e.jsx(k,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Multi-asset RL for Indian portfolios must account for the distinct correlation structure between Indian equities (positively correlated), government bonds (negatively correlated with equities during risk-off), and gold (hedge against INR depreciation and global uncertainty). The RL agent should learn to increase bond/gold allocation during volatile periods and tilt toward equities during bull markets -- effectively learning a dynamic asset allocation strategy that adapts to the Indian macro cycle (RBI rate decisions, monsoon, fiscal policy)."})})]})}const le=Object.freeze(Object.defineProperty({__proto__:null,default:W},Symbol.toStringTag,{value:"Module"}));function G(){const[a,b]=m.useState("risk_on"),[l,w]=m.useState(.7),[n,_]=m.useState({RELIANCE:.25,TCS:.2,HDFCBANK:.2,INFY:.15,ICICIBANK:.2}),c=[{key:"risk_on",label:"Risk On",equity:.7,bond:.2,cash:.1},{key:"neutral",label:"Neutral",equity:.5,bond:.3,cash:.2},{key:"risk_off",label:"Risk Off",equity:.2,bond:.5,cash:.3},{key:"defensive",label:"Defensive",equity:.1,bond:.4,cash:.5}],y=c.find(x=>x.key===a),h=(x,i)=>{const s={...n,[x]:i},d=Object.values(s).reduce((o,r)=>o+r,0);d>0&&(Object.keys(s).forEach(o=>{s[o]/=d}),_(s))};return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Hierarchical RL Policy"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"The macro-level policy sets asset class budgets. The micro-level policy allocates within equities."}),e.jsxs("div",{className:"mb-4",children:[e.jsx("h4",{className:"mb-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400",children:"Level 1: Macro Policy (Asset Class Allocation)"}),e.jsx("div",{className:"flex gap-2",children:c.map(x=>e.jsx("button",{onClick:()=>b(x.key),className:`rounded-lg px-3 py-2 text-xs font-semibold ${a===x.key?"bg-indigo-600 text-white":"bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"}`,children:x.label},x.key))}),e.jsxs("div",{className:"mt-3 grid grid-cols-3 gap-2",children:[e.jsxs("div",{className:"rounded bg-blue-50 p-2 text-center dark:bg-blue-900/30",children:[e.jsx("div",{className:"text-xs text-blue-600 dark:text-blue-400",children:"Equity"}),e.jsxs("div",{className:"font-bold text-blue-800 dark:text-blue-200",children:[(y.equity*100).toFixed(0),"%"]})]}),e.jsxs("div",{className:"rounded bg-green-50 p-2 text-center dark:bg-green-900/30",children:[e.jsx("div",{className:"text-xs text-green-600 dark:text-green-400",children:"Bonds"}),e.jsxs("div",{className:"font-bold text-green-800 dark:text-green-200",children:[(y.bond*100).toFixed(0),"%"]})]}),e.jsxs("div",{className:"rounded bg-gray-50 p-2 text-center dark:bg-gray-900/30",children:[e.jsx("div",{className:"text-xs text-gray-600 dark:text-gray-400",children:"Cash"}),e.jsxs("div",{className:"font-bold text-gray-800 dark:text-gray-200",children:[(y.cash*100).toFixed(0),"%"]})]})]})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"mb-2 text-sm font-semibold text-purple-600 dark:text-purple-400",children:"Level 2: Micro Policy (Within-Equity Allocation)"}),e.jsx("div",{className:"grid grid-cols-2 gap-2 sm:grid-cols-5",children:Object.entries(n).map(([x,i])=>e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:[x,": ",(i*y.equity*100).toFixed(1),"%"]}),e.jsx("input",{type:"range",min:"0",max:"1",step:"0.05",value:i,onChange:s=>h(x,parseFloat(s.target.value)),className:"h-2 w-full cursor-pointer accent-purple-500"})]},x))})]})]})}function H(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Hierarchical RL: Macro Allocation + Micro Execution"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Real portfolio management operates at multiple time scales: strategic asset allocation (monthly/quarterly) and tactical stock selection (daily/weekly). Hierarchical RL (HRL) decomposes this into a macro-level policy that determines asset class budgets and a micro-level policy that handles individual stock allocation and execution within the Indian market context."}),e.jsx(j,{title:"Hierarchical Reinforcement Learning (HRL)",label:"Definition 14.9",definition:"HRL decomposes a complex decision-making problem into a hierarchy of sub-problems. In the options framework, a high-level policy selects 'options' (temporally extended actions), and a low-level policy executes within each option. For portfolio management, the high-level policy sets asset class targets (equity/bond/cash split), while the low-level policy selects individual securities.",notation:"π_H: S → O (high-level), π_L: S × O → A (low-level), where O is the option space."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Two-Level Portfolio Hierarchy"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The hierarchy operates at two temporal scales:"}),e.jsx(t.BlockMath,{math:"\\underbrace{\\pi_H(o_t | s_t^{\\text{macro}})}_{\\text{Monthly: Asset class budget}} \\quad \\rightarrow \\quad \\underbrace{\\pi_L(a_t | s_t^{\\text{micro}}, o_t)}_{\\text{Daily: Stock selection}}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The macro state includes global factors relevant to Indian markets:"}),e.jsx(t.BlockMath,{math:"s_t^{\\text{macro}} = \\left[\\text{VIX}_{\\text{India}}, \\; r_{\\text{repo}}, \\; \\frac{\\text{FII flow}}{V}, \\; \\text{USD/INR}, \\; \\text{Oil}_t, \\; \\text{monsoon index}\\right]"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The micro state is stock-specific:"}),e.jsx(t.BlockMath,{math:"s_t^{\\text{micro}} = \\left[\\text{returns}_{t-W:t}, \\; \\text{volume ratio}, \\; \\text{RSI}, \\; \\text{sector momentum}, \\; \\text{delivery \\%}\\right]"}),e.jsx(N,{title:"Hierarchical Optimality",label:"Theorem 14.8",statement:"Under the options framework with Markov options, the hierarchical value function decomposes as: V^*(s) = max_o [R(s,o) + γ^{τ_o} Σ_{s'} P(s'|s,o) V^*(s')], where τ_o is the duration of option o. If both levels are optimized jointly, the hierarchical solution converges to the flat optimal policy in the limit.",proof:"Each option o defines a semi-MDP with temporally extended transitions. The Bellman equation for semi-MDPs preserves the contraction property of the Bellman operator with discount γ^τ_o. By the recursive optimality principle, if π_H and π_L are both optimal for their respective sub-problems, the composite policy is optimal for the original MDP. This follows from the hierarchical decomposition theorem (Dietterich, 2000)."}),e.jsx(G,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Options Framework for Trading"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Each macro option defines a regime-dependent asset class allocation:"}),e.jsx(t.BlockMath,{math:"o \\in \\{\\text{risk\\_on}, \\text{neutral}, \\text{risk\\_off}, \\text{defensive}\\}"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Option"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Equity"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Bonds"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Cash"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Trigger (India)"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2 font-semibold text-green-600",children:"Risk On"}),e.jsx("td",{className:"px-4 py-2",children:"70%"}),e.jsx("td",{className:"px-4 py-2",children:"20%"}),e.jsx("td",{className:"px-4 py-2",children:"10%"}),e.jsx("td",{className:"px-4 py-2",children:"India VIX < 15, FII inflow"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2 font-semibold text-blue-600",children:"Neutral"}),e.jsx("td",{className:"px-4 py-2",children:"50%"}),e.jsx("td",{className:"px-4 py-2",children:"30%"}),e.jsx("td",{className:"px-4 py-2",children:"20%"}),e.jsx("td",{className:"px-4 py-2",children:"Normal conditions"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2 font-semibold text-amber-600",children:"Risk Off"}),e.jsx("td",{className:"px-4 py-2",children:"20%"}),e.jsx("td",{className:"px-4 py-2",children:"50%"}),e.jsx("td",{className:"px-4 py-2",children:"30%"}),e.jsx("td",{className:"px-4 py-2",children:"India VIX > 25, FII outflow"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2 font-semibold text-red-600",children:"Defensive"}),e.jsx("td",{className:"px-4 py-2",children:"10%"}),e.jsx("td",{className:"px-4 py-2",children:"40%"}),e.jsx("td",{className:"px-4 py-2",children:"50%"}),e.jsx("td",{className:"px-4 py-2",children:"Crisis: VIX > 35, INR crash"})]})]})]})}),e.jsx(S,{title:"hierarchical_rl_portfolio.py",runnable:!0,code:`import numpy as np

class MacroPolicy:
    """High-level policy: asset class allocation based on macro indicators."""
    def __init__(self, n_options=4, obs_dim=6):
        np.random.seed(42)
        self.W = np.random.randn(obs_dim, n_options) * 0.1
        self.options = [
            {'name': 'risk_on',   'equity': 0.70, 'bond': 0.20, 'cash': 0.10},
            {'name': 'neutral',   'equity': 0.50, 'bond': 0.30, 'cash': 0.20},
            {'name': 'risk_off',  'equity': 0.20, 'bond': 0.50, 'cash': 0.30},
            {'name': 'defensive', 'equity': 0.10, 'bond': 0.40, 'cash': 0.50}
        ]

    def select_option(self, macro_state, epsilon=0.1):
        logits = macro_state @ self.W
        probs = np.exp(logits - logits.max())
        probs = probs / probs.sum()

        if np.random.random() < epsilon:
            idx = np.random.randint(len(self.options))
        else:
            idx = np.argmax(probs)

        return idx, self.options[idx]


class MicroPolicy:
    """Low-level policy: stock selection within equity budget."""
    def __init__(self, n_stocks=5, obs_dim=10):
        np.random.seed(42)
        self.W = np.random.randn(obs_dim, n_stocks) * 0.01

    def allocate(self, micro_state, equity_budget):
        logits = micro_state @ self.W
        exp_logits = np.exp(logits - logits.max())
        weights = exp_logits / exp_logits.sum()
        return weights * equity_budget


class HierarchicalPortfolio:
    """
    Two-level hierarchical RL for Indian market portfolio.
    Level 1 (Macro): Asset class allocation (monthly)
    Level 2 (Micro): Stock selection within equity (daily)
    """
    def __init__(self):
        self.macro = MacroPolicy()
        self.micro = MicroPolicy()
        self.stock_names = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK']

    def get_macro_state(self, vix, repo_rate, fii_flow, usd_inr, oil, monsoon):
        """Construct macro state vector."""
        return np.array([vix/50, repo_rate/10, fii_flow, usd_inr/100,
                        oil/100, monsoon], dtype=np.float32)

    def get_micro_state(self, stock_returns, volumes, rsi_values):
        """Construct micro state for stock allocation."""
        return np.concatenate([stock_returns, volumes]).astype(np.float32)

    def allocate(self, macro_state, micro_state):
        """Full hierarchical allocation."""
        option_idx, option = self.macro.select_option(macro_state)
        equity_weights = self.micro.allocate(micro_state, option['equity'])
        bond_weight = option['bond']
        cash_weight = option['cash']

        full_weights = np.concatenate([equity_weights, [bond_weight, cash_weight]])
        return full_weights, option


# Simulation
np.random.seed(42)
hrl = HierarchicalPortfolio()

# Simulate 12 months of Indian macro data
n_months = 12
portfolio_value = 1_00_00_000  # INR 1 Crore

print("Hierarchical RL Portfolio - Indian Markets")
print(f"Initial: INR {portfolio_value:,.0f}")
print(f"Stocks: {', '.join(hrl.stock_names)} + Bonds + Cash")
print(f"{'='*75}")

all_assets = hrl.stock_names + ['GOI_Bond', 'Cash']
monthly_returns = {
    'RELIANCE': np.random.normal(0.015, 0.06, n_months),
    'TCS': np.random.normal(0.012, 0.05, n_months),
    'HDFCBANK': np.random.normal(0.010, 0.055, n_months),
    'INFY': np.random.normal(0.014, 0.06, n_months),
    'ICICIBANK': np.random.normal(0.011, 0.055, n_months),
    'GOI_Bond': np.random.normal(0.006, 0.015, n_months),
    'Cash': np.full(n_months, 0.005)
}

for month in range(n_months):
    # Macro indicators
    vix = np.random.uniform(10, 35)
    repo = 6.5
    fii = np.random.normal(0, 0.5)
    usd_inr = np.random.uniform(82, 86)
    oil = np.random.uniform(70, 100)
    monsoon = np.random.uniform(-1, 1)

    macro_state = hrl.get_macro_state(vix, repo, fii, usd_inr, oil, monsoon)

    # Micro indicators
    stock_rets = np.array([monthly_returns[s][month] for s in hrl.stock_names])
    volumes = np.random.uniform(0.5, 2.0, 5)
    micro_state = hrl.get_micro_state(stock_rets, volumes)

    # Allocate
    weights, option = hrl.allocate(macro_state, micro_state)

    # Portfolio return
    all_returns = np.array([monthly_returns[a][month] for a in all_assets])
    port_return = np.dot(weights, all_returns)
    portfolio_value *= (1 + port_return)

    eq_w = sum(weights[:5])
    print(f"Month {month+1:2d} | {option['name']:>10s} | VIX: {vix:5.1f} | "
          f"FII: {fii:+.2f} | Eq: {eq_w:.0%} | "
          f"Return: {port_return:+.2%} | INR {portfolio_value:>14,.0f}")

total_return = (portfolio_value / 1_00_00_000 - 1) * 100
print(f"\\n{'='*75}")
print(f"Final:  INR {portfolio_value:,.0f}")
print(f"Return: {total_return:+.1f}%")
print(f"CAGR:   {((portfolio_value/1_00_00_000)**(12/n_months)-1)*100:.1f}%")`}),e.jsx(A,{title:"Designing Hierarchical Options for Indian Markets",difficulty:"advanced",problem:"Design a 3-level hierarchical RL system for managing a ₹10 crore Indian portfolio. Define the options at each level and the temporal scale of decisions.",solution:[{step:"Level 1: Strategic (Quarterly)",formula:"o_1 \\in \\{\\text{growth}, \\text{balanced}, \\text{income}, \\text{capital preservation}\\}",explanation:"Based on RBI policy cycle, GDP growth, inflation (CPI), and global macro. Sets the broad equity/debt/gold/cash allocation."},{step:"Level 2: Tactical (Monthly)",formula:"o_2 \\in \\{\\text{sector overweight/underweight}\\} \\times |\\text{Nifty sectors}|",explanation:"Selects sector tilts: overweight IT during USD strength, overweight banks during rate cut cycle, overweight pharma during defensive periods."},{step:"Level 3: Execution (Daily)",formula:"a_t \\in \\mathbb{R}^N \\quad (\\text{individual stock weights})",explanation:"Handles individual stock selection and execution timing within sector budgets. Uses intraday features from NSE like delivery percentage and bulk deal data."}]}),e.jsx(k,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Hierarchical RL naturally maps to how professional fund managers in India operate: the CIO sets the asset allocation policy (macro), sector heads decide sector tilts (meso), and portfolio managers pick individual stocks (micro). The key advantage of HRL is that the macro policy can operate on slow-moving, low-noise features (India VIX, FII flows, RBI policy), while the micro policy handles noisy daily stock signals. This decomposition dramatically reduces the effective state-action space and improves sample efficiency."})})]})}const de=Object.freeze(Object.defineProperty({__proto__:null,default:H},Symbol.toStringTag,{value:"Module"}));function Q(){const[a,b]=m.useState(.05),[l,w]=m.useState(.1),[n]=m.useState(200),_=Array(n).fill(null).map(()=>{const s=Math.random();return s<.05?-.08+Math.random()*.03:s<.15?-.05+Math.random()*.03:(Math.random()-.4)*.04}).sort((s,d)=>s-d),c=Math.floor(a*n),y=_[c],h=_.slice(0,c+1),x=h.reduce((s,d)=>s+d,0)/h.length,i=Math.abs(x)>l;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: CVaR Constraint Visualizer"}),e.jsxs("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:["Adjust the confidence level ",e.jsx(t.InlineMath,{math:"\\alpha"})," and constraint threshold to see how CVaR-constrained RL limits tail risk in an NSE portfolio."]}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Tail probability ",e.jsx(t.InlineMath,{math:"\\alpha"})," = ",(a*100).toFixed(0),"%"]}),e.jsx("input",{type:"range",min:"0.01",max:"0.20",step:"0.01",value:a,onChange:s=>b(parseFloat(s.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["CVaR constraint: ",(l*100).toFixed(1),"%"]}),e.jsx("input",{type:"range",min:"0.02",max:"0.20",step:"0.01",value:l,onChange:s=>w(parseFloat(s.target.value)),className:"h-2 w-full cursor-pointer accent-red-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 420 160",className:"w-full max-w-lg mx-auto block",children:[_.map((s,d)=>{const o=10+d/n*400,r=Math.abs(s)*800,p=120-r,u=d<=c;return e.jsx("rect",{x:o,y:p,width:400/n-.5,height:r,fill:u?"#ef4444":"#6366f1",opacity:u?.8:.4},d)}),e.jsx("line",{x1:10+c/n*400,y1:"10",x2:10+c/n*400,y2:"130",stroke:"#f59e0b",strokeWidth:"2",strokeDasharray:"4,4"}),e.jsxs("text",{x:10+c/n*400,y:"8",textAnchor:"middle",className:"text-[9px]",fill:"#f59e0b",children:["VaR_",a]}),e.jsx("text",{x:"210",y:"155",textAnchor:"middle",className:"text-[10px]",fill:"#6b7280",children:"Sorted returns (red = tail losses)"})]}),e.jsxs("div",{className:"mt-3 grid grid-cols-3 gap-2 text-center text-xs",children:[e.jsxs("div",{className:"rounded bg-amber-50 p-2 dark:bg-amber-900/30",children:[e.jsxs("div",{className:"text-amber-600 dark:text-amber-400",children:["VaR (",(a*100).toFixed(0),"%)"]}),e.jsxs("div",{className:"font-bold",children:[(y*100).toFixed(2),"%"]})]}),e.jsxs("div",{className:"rounded bg-red-50 p-2 dark:bg-red-900/30",children:[e.jsxs("div",{className:"text-red-600 dark:text-red-400",children:["CVaR (",(a*100).toFixed(0),"%)"]}),e.jsxs("div",{className:"font-bold",children:[(x*100).toFixed(2),"%"]})]}),e.jsxs("div",{className:`rounded p-2 ${i?"bg-red-100 dark:bg-red-900/40":"bg-green-50 dark:bg-green-900/30"}`,children:[e.jsx("div",{className:i?"text-red-600 dark:text-red-400":"text-green-600 dark:text-green-400",children:"Constraint"}),e.jsx("div",{className:"font-bold",children:i?"VIOLATED":"SATISFIED"})]})]})]})}function K(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Constrained RL and CVaR-Constrained Policies"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"In regulated financial markets like India, trading strategies must satisfy risk constraints imposed by SEBI, exchanges, and internal risk management. Safe RL formulates trading as a Constrained MDP (CMDP), where the policy must maximize returns while keeping risk metrics (drawdown, CVaR, leverage) within acceptable bounds."}),e.jsx(j,{title:"Constrained Markov Decision Process (CMDP)",label:"Definition 14.10",definition:"A CMDP extends the standard MDP with K constraint functions c_k(s,a) and limits d_k. The objective is: max_π J(π) subject to J_c_k(π) ≤ d_k for k = 1,...,K. The constraint costs J_c_k(π) = E[Σ γ^t c_k(s_t, a_t)] must not exceed the thresholds d_k.",notation:"The Lagrangian relaxation converts CMDP to: max_π min_λ≥0 J(π) - Σ λ_k(J_c_k(π) - d_k)."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Risk Constraints for Indian Markets"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Common constraints for SEBI-regulated strategies:"}),e.jsx(t.BlockMath,{math:`\\begin{aligned}
        \\text{CVaR}_\\alpha(R_\\pi) &\\geq -d_{\\text{CVaR}} & \\text{(tail risk limit)} \\\\
        \\text{MaxDD}(\\pi) &\\leq d_{\\text{DD}} & \\text{(drawdown limit)} \\\\
        \\|w\\|_\\infty &\\leq d_{\\text{conc}} & \\text{(concentration limit)} \\\\
        \\sum |w_i - w_i^{\\text{prev}}| &\\leq d_{\\text{turn}} & \\text{(turnover limit)}
      \\end{aligned}`}),e.jsx(j,{title:"Conditional Value-at-Risk (CVaR)",label:"Definition 14.11",definition:"CVaR_α (also called Expected Shortfall) is the expected loss in the worst α fraction of scenarios. It is a coherent risk measure: CVaR_α(X) = E[X | X ≤ VaR_α(X)]. For α = 5%, CVaR represents the average loss in the worst 5% of trading days.",notation:"CVaR_α is also denoted ES_α. VaR_α is the α-quantile of the loss distribution."}),e.jsx(t.BlockMath,{math:"\\text{CVaR}_\\alpha(X) = \\frac{1}{\\alpha}\\int_0^{\\alpha} \\text{VaR}_u(X)\\, du = \\mathbb{E}[X \\mid X \\leq \\text{VaR}_\\alpha(X)]"}),e.jsx(N,{title:"Lagrangian Relaxation of CMDP",label:"Theorem 14.9",statement:"For a CMDP with convex constraint functions, the Lagrangian dual approach finds the optimal constrained policy by solving: max_π min_{λ≥0} L(π, λ) = J(π) - Σ_k λ_k(J_{c_k}(π) - d_k). Under Slater's condition, strong duality holds, and the optimal Lagrange multipliers λ* correspond to the shadow prices of the constraints.",proof:"The CMDP feasibility set is convex in the space of occupancy measures (Altman, 1999). The objective and constraints are linear in occupancy measures, making the optimization a linear program. By the LP duality theorem, strong duality holds when the feasible set is non-empty (Slater's condition). The dual variables λ* indicate how much the objective would improve if the constraint were relaxed by one unit."}),e.jsx(Q,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Lagrangian PPO for Safe Trading"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"We augment PPO with Lagrangian multipliers for constraint satisfaction:"}),e.jsx(t.BlockMath,{math:"L(\\theta, \\lambda) = L^{\\text{CLIP}}(\\theta) - \\sum_{k=1}^K \\lambda_k \\left(\\hat{J}_{c_k}(\\theta) - d_k\\right)"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The Lagrange multipliers are updated via dual gradient ascent:"}),e.jsx(t.BlockMath,{math:"\\lambda_k \\leftarrow \\max\\left(0, \\; \\lambda_k + \\eta_\\lambda (\\hat{J}_{c_k}(\\theta) - d_k)\\right)"}),e.jsx(S,{title:"safe_rl_trading.py",runnable:!0,code:`import numpy as np

class CVaRConstrainedAgent:
    """
    Safe RL agent with CVaR constraint for NSE trading.
    Uses Lagrangian relaxation to satisfy risk constraints.
    """
    def __init__(self, obs_dim=20, n_actions=3, cvar_alpha=0.05,
                 cvar_limit=0.05, max_drawdown=0.15, lr=3e-4,
                 lr_lambda=1e-3):
        np.random.seed(42)
        self.obs_dim = obs_dim
        self.n_actions = n_actions
        self.cvar_alpha = cvar_alpha
        self.cvar_limit = cvar_limit
        self.max_drawdown = max_drawdown
        self.lr = lr
        self.lr_lambda = lr_lambda

        # Policy parameters
        self.W = np.random.randn(obs_dim, n_actions) * 0.01

        # Lagrange multipliers
        self.lambda_cvar = 0.1
        self.lambda_dd = 0.1

        # Track returns for CVaR computation
        self.returns_history = []

    def get_action(self, obs, explore=True):
        logits = obs @ self.W
        probs = np.exp(logits - logits.max())
        probs = probs / probs.sum()

        if explore:
            action = np.random.choice(self.n_actions, p=probs)
        else:
            action = np.argmax(probs)

        return action, probs

    def compute_cvar(self, returns, alpha=None):
        """Compute CVaR (Expected Shortfall) from return samples."""
        if alpha is None:
            alpha = self.cvar_alpha
        if len(returns) == 0:
            return 0.0
        sorted_returns = np.sort(returns)
        n_tail = max(1, int(len(returns) * alpha))
        tail_returns = sorted_returns[:n_tail]
        return np.mean(tail_returns)

    def compute_var(self, returns, alpha=None):
        """Compute Value-at-Risk."""
        if alpha is None:
            alpha = self.cvar_alpha
        if len(returns) == 0:
            return 0.0
        sorted_returns = np.sort(returns)
        idx = max(0, int(len(returns) * alpha) - 1)
        return sorted_returns[idx]

    def compute_lagrangian_reward(self, reward, current_return,
                                    current_drawdown):
        """Compute reward with Lagrangian penalty terms."""
        # Store return for CVaR computation
        self.returns_history.append(current_return)

        # Compute constraint violations
        cvar_violation = 0
        if len(self.returns_history) >= 20:
            recent_cvar = self.compute_cvar(self.returns_history[-100:])
            cvar_violation = max(0, -recent_cvar - self.cvar_limit)

        dd_violation = max(0, current_drawdown - self.max_drawdown)

        # Lagrangian reward
        lagrangian_reward = (reward
                            - self.lambda_cvar * cvar_violation
                            - self.lambda_dd * dd_violation)

        return lagrangian_reward, {
            'cvar_violation': cvar_violation,
            'dd_violation': dd_violation
        }

    def update_lambdas(self, cvar_violation, dd_violation):
        """Update Lagrange multipliers via dual gradient ascent."""
        self.lambda_cvar = max(0, self.lambda_cvar
                               + self.lr_lambda * cvar_violation)
        self.lambda_dd = max(0, self.lambda_dd
                             + self.lr_lambda * dd_violation)


def simulate_safe_trading():
    """Simulate CVaR-constrained trading on NSE."""
    np.random.seed(42)

    # Generate realistic Nifty-like returns with fat tails
    n_days = 500
    normal_returns = np.random.normal(0.0005, 0.015, n_days)
    # Add occasional tail events (like 2020 COVID crash)
    crash_days = np.random.choice(n_days, 15, replace=False)
    normal_returns[crash_days] -= np.random.uniform(0.03, 0.08, 15)
    prices = 18000 * np.cumprod(1 + normal_returns)

    # Initialize constrained agent
    agent = CVaRConstrainedAgent(
        obs_dim=10,
        cvar_alpha=0.05,       # 5% tail
        cvar_limit=0.04,       # Max 4% CVaR loss
        max_drawdown=0.15      # Max 15% drawdown
    )

    portfolio = 50_00_000  # INR 50 lakhs
    peak = portfolio
    position = 0
    cash = portfolio

    print("Safe RL Trading with CVaR Constraint (NSE)")
    print(f"CVaR limit: {agent.cvar_limit:.1%} at alpha={agent.cvar_alpha:.0%}")
    print(f"Max drawdown: {agent.max_drawdown:.0%}")
    print(f"{'='*70}")

    for day in range(min(300, n_days - 1)):
        price = prices[day]
        obs = np.random.randn(10).astype(np.float32)

        action, probs = agent.get_action(obs)

        # Execute trade
        if action == 2 and cash >= price * 10:  # Buy
            position += 10
            cash -= price * 10
        elif action == 0 and position >= 10:  # Sell
            position -= 10
            cash += price * 10

        # New portfolio value
        new_price = prices[day + 1]
        new_portfolio = cash + position * new_price
        daily_return = (new_portfolio - portfolio) / portfolio
        portfolio = new_portfolio
        peak = max(peak, portfolio)
        drawdown = (peak - portfolio) / peak

        # Compute safe reward
        base_reward = np.log(1 + daily_return) if daily_return > -1 else -10
        safe_reward, violations = agent.compute_lagrangian_reward(
            base_reward, daily_return, drawdown
        )

        # Update Lagrange multipliers
        agent.update_lambdas(violations['cvar_violation'],
                            violations['dd_violation'])

        if day % 60 == 59:
            cvar = agent.compute_cvar(agent.returns_history[-100:]) if len(agent.returns_history) >= 20 else 0
            var = agent.compute_var(agent.returns_history[-100:]) if len(agent.returns_history) >= 20 else 0
            print(f"Day {day+1:3d} | INR {portfolio:>12,.0f} | "
                  f"DD: {drawdown:.1%} | VaR: {var:.2%} | CVaR: {cvar:.2%} | "
                  f"λ_CVaR: {agent.lambda_cvar:.3f} | λ_DD: {agent.lambda_dd:.3f}")

    # Final summary
    total_return = (portfolio / 50_00_000 - 1) * 100
    final_cvar = agent.compute_cvar(agent.returns_history)
    final_var = agent.compute_var(agent.returns_history)

    print(f"\\n{'='*70}")
    print(f"Final portfolio: INR {portfolio:,.0f} ({total_return:+.1f}%)")
    print(f"Max drawdown: {(peak - min(portfolio, peak))/peak:.1%}")
    print(f"5% VaR: {final_var:.2%}")
    print(f"5% CVaR: {final_cvar:.2%}")
    print(f"CVaR constraint ({'SATISFIED' if abs(final_cvar) <= agent.cvar_limit else 'VIOLATED'})")
    print(f"Final λ_CVaR: {agent.lambda_cvar:.4f}, λ_DD: {agent.lambda_dd:.4f}")

simulate_safe_trading()`}),e.jsx(A,{title:"Setting CVaR Constraints for Indian PMS",difficulty:"advanced",problem:"A SEBI-registered Portfolio Management Service (PMS) promises clients maximum monthly drawdown of 8% and 5% CVaR loss of no more than 6%. Formulate the CMDP constraints and explain how Lagrangian relaxation enforces them.",solution:[{step:"Define constraint functions",formula:"c_1(\\pi) = \\mathbb{E}[\\max_{t} (V^{\\max}_{0:t} - V_t)/V^{\\max}_{0:t}], \\quad c_2(\\pi) = -\\text{CVaR}_{0.05}(R_\\pi)",explanation:"c_1 measures expected maximum monthly drawdown, c_2 measures the CVaR of portfolio returns."},{step:"Set constraint thresholds",formula:"c_1(\\pi) \\leq 0.08, \\quad c_2(\\pi) \\leq 0.06",explanation:"The PMS must keep drawdown below 8% and CVaR below 6% to meet investor commitments."},{step:"Lagrangian relaxation",formula:"L(\\theta, \\lambda_1, \\lambda_2) = J(\\pi_\\theta) - \\lambda_1(c_1 - 0.08) - \\lambda_2(c_2 - 0.06)",explanation:"The Lagrange multipliers λ_1, λ_2 automatically increase when constraints are violated, penalizing the policy and encouraging it to become more conservative."},{step:"Dual update for constraint satisfaction",formula:"\\lambda_k \\leftarrow \\max(0, \\lambda_k + \\eta(c_k - d_k))",explanation:"If drawdown exceeds 8%, λ_1 increases, causing the agent to reduce position sizes. The multiplier acts as an adaptive risk penalty."}]}),e.jsx(k,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Safe RL is essential for deploying trading strategies in India's regulated environment. SEBI-registered entities (PMS, AIFs, mutual funds) face strict risk limits. CVaR constraints are particularly important because they control tail risk -- the risk of catastrophic losses during events like the 2020 COVID crash, 2022 Adani-Hindenburg episode, or flash crashes. The Lagrangian approach is practical because it converts hard constraints into soft penalty terms that can be optimized with standard policy gradient methods, while the dual variables adaptively calibrate the penalty strength."})})]})}const ce=Object.freeze(Object.defineProperty({__proto__:null,default:K},Symbol.toStringTag,{value:"Module"}));function U(){const[a,b]=m.useState(1e4),[l,w]=m.useState(10),[n,_]=m.useState(.5),[c,y]=m.useState(1e-4),h=a/l,x=Array(l).fill(null).map((s,d)=>{const o=(d+1)/l,r=h,p=h*(1+.3*Math.sin(Math.PI*o)),u=h*Math.exp(-n*(1-o))*(1+n),v=a-(d+1)*h,f=c*r*r;return{period:d+1,twap:r,vwap:Math.round(p),aggressive:Math.round(u),remaining:Math.max(0,v),impactCost:f}}),i=x.reduce((s,d)=>s+d.impactCost,0);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Execution Strategy Comparison"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Compare TWAP, VWAP, and urgency-driven execution for a large NSE order."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Total shares: ",a.toLocaleString()]}),e.jsx("input",{type:"range",min:"1000",max:"50000",step:"1000",value:a,onChange:s=>b(parseInt(s.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Time slices: ",l]}),e.jsx("input",{type:"range",min:"5",max:"30",step:"1",value:l,onChange:s=>w(parseInt(s.target.value)),className:"h-2 w-full cursor-pointer accent-green-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Urgency: ",n.toFixed(2)]}),e.jsx("input",{type:"range",min:"0",max:"2",step:"0.1",value:n,onChange:s=>_(parseFloat(s.target.value)),className:"h-2 w-full cursor-pointer accent-amber-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Impact coeff: ",(c*1e4).toFixed(1)," bps"]}),e.jsx("input",{type:"range",min:"0.00001",max:"0.001",step:"0.00001",value:c,onChange:s=>y(parseFloat(s.target.value)),className:"h-2 w-full cursor-pointer accent-red-500"})]})]}),e.jsxs("svg",{viewBox:"0 0 420 160",className:"w-full max-w-lg mx-auto block",children:[x.map((s,d)=>{const o=30+d*(380/l),r=380/l*.25,p=a/l*2.5,u=s.twap/p*120,v=s.vwap/p*120,f=s.aggressive/p*120;return e.jsxs("g",{children:[e.jsx("rect",{x:o,y:130-u,width:r,height:u,fill:"#6366f1",opacity:"0.7"}),e.jsx("rect",{x:o+r,y:130-v,width:r,height:v,fill:"#10b981",opacity:"0.7"}),e.jsx("rect",{x:o+r*2,y:130-f,width:r,height:f,fill:"#f59e0b",opacity:"0.7"})]},d)}),e.jsx("line",{x1:"30",y1:"130",x2:"410",y2:"130",stroke:"#9ca3af",strokeWidth:"1"}),e.jsx("text",{x:"210",y:"150",textAnchor:"middle",className:"text-[10px]",fill:"#6b7280",children:"Time slices"}),e.jsx("text",{x:"100",y:"12",className:"text-[9px]",fill:"#6366f1",children:"TWAP"}),e.jsx("text",{x:"170",y:"12",className:"text-[9px]",fill:"#10b981",children:"VWAP"}),e.jsx("text",{x:"240",y:"12",className:"text-[9px]",fill:"#f59e0b",children:"Aggressive"})]}),e.jsxs("div",{className:"mt-2 text-center text-sm text-gray-600 dark:text-gray-400",children:["Estimated market impact: ",e.jsxs("span",{className:"font-bold text-red-600",children:["₹",(i*2500).toFixed(0)]})," (",(i/a*1e4).toFixed(1)," bps)"]})]})}function $(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"RL for Optimal Execution on NSE"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Optimal execution is the problem of trading a large order while minimizing market impact and timing risk. On NSE, where large-cap stocks like Reliance and TCS may have significant impact for institutional-sized orders, RL agents can learn adaptive execution policies that outperform traditional TWAP and VWAP benchmarks by responding to real-time order book conditions."}),e.jsx(j,{title:"Optimal Execution Problem",label:"Definition 14.12",definition:"Given a parent order to buy/sell Q shares of a stock within time horizon T, the optimal execution problem minimizes the expected implementation shortfall (IS): IS = (execution price - arrival price) × Q. The trade-off is between market impact (trading too fast) and timing risk (trading too slow).",notation:"n_t is the number of shares traded at time t, with constraint Σn_t = Q."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Almgren-Chriss Framework"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The classical model assumes temporary and permanent impact:"}),e.jsx(t.BlockMath,{math:"P_t = P_{t-1} + \\underbrace{\\sigma \\epsilon_t}_{\\text{random walk}} - \\underbrace{g(n_t)}_{\\text{permanent impact}} - \\underbrace{h(n_t)}_{\\text{temporary impact}}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"With linear impact functions:"}),e.jsx(t.BlockMath,{math:"g(n) = \\gamma \\cdot n, \\qquad h(n) = \\eta \\cdot n + \\epsilon \\cdot \\text{sgn}(n)"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The optimal deterministic trajectory under mean-variance optimization:"}),e.jsx(t.BlockMath,{math:"n_t^* = Q \\cdot \\frac{\\sinh(\\kappa(T-t))}{\\sinh(\\kappa T)}, \\quad \\kappa = \\sqrt{\\frac{\\lambda \\sigma^2}{\\eta}}"}),e.jsx(N,{title:"Almgren-Chriss Optimal Trajectory",label:"Theorem 14.10",statement:"For linear temporary impact h(n) = ηn and quadratic permanent impact, the optimal execution schedule that minimizes E[IS] + λ·Var[IS] is: n_t = Q·sinh(κ(T-t))/sinh(κT), where κ = √(λσ²/η). As λ→0 (risk-neutral), this converges to TWAP; as λ→∞ (risk-averse), it front-loads execution.",proof:"The cost functional is: C = Σ[η·n_t² + γ·q_t·n_t] + λσ²Σq_t². Taking the Euler-Lagrange equations for the discrete variational problem: 2ηn_t = λσ²q_t - γn_t + Lagrange multiplier. The solution is a hyperbolic sine trajectory. The boundary conditions q_0 = Q and q_T = 0 pin the constants."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"RL Formulation for Execution"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The RL execution agent observes order book state and remaining inventory:"}),e.jsx(t.BlockMath,{math:"s_t = \\left[q_t^{\\text{remaining}}, \\; \\frac{t}{T}, \\; \\text{spread}_t, \\; \\text{depth}_t, \\; \\text{imbalance}_t, \\; \\text{volatility}_t\\right]"}),e.jsx(t.BlockMath,{math:"a_t = n_t \\in [0, q_t^{\\text{remaining}}] \\quad \\text{(shares to execute at time } t \\text{)}"}),e.jsx(t.BlockMath,{math:"R_t = -\\left(\\underbrace{p_t^{\\text{exec}} - p_0^{\\text{arrival}}}_{\\text{slippage}} \\cdot n_t + \\underbrace{c \\cdot n_t}_{\\text{transaction cost}}\\right)"}),e.jsx(U,{}),e.jsx(k,{title:"NSE Execution Specifics",type:"info",children:e.jsx("p",{children:"NSE operates a continuous order matching system (9:15-15:30 IST) with a call auction at open (9:00-9:08) and close (15:30-15:40). Key considerations for execution algorithms: (1) The pre-open session sets the opening price via call auction, (2) tick size is ₹0.05 for most stocks, (3) circuit limits halt trading at specific price bands, (4) large orders can be placed as icebergs (disclosed quantity) to hide true order size."})}),e.jsx(S,{title:"optimal_execution_rl.py",runnable:!0,code:`import numpy as np

class NSEExecutionEnv:
    """
    Execution environment for optimal order execution on NSE.
    Simulates market impact, spread, and order book dynamics.
    """
    def __init__(self, total_shares=10000, time_horizon=20,
                 base_price=2500, daily_volume=500000,
                 volatility=0.02, permanent_impact=1e-5,
                 temporary_impact=5e-4, spread=0.05):
        self.total_shares = total_shares
        self.T = time_horizon
        self.base_price = base_price
        self.daily_volume = daily_volume
        self.sigma = volatility
        self.gamma = permanent_impact    # Permanent impact
        self.eta = temporary_impact      # Temporary impact
        self.spread = spread             # Tick-level spread (INR)
        self.reset()

    def reset(self):
        self.remaining = self.total_shares
        self.current_step = 0
        self.price = self.base_price
        self.arrival_price = self.base_price
        self.total_cost = 0
        self.execution_prices = []
        self.trade_schedule = []
        return self._get_obs()

    def _get_obs(self):
        return np.array([
            self.remaining / self.total_shares,    # Fraction remaining
            self.current_step / self.T,            # Time progress
            self.spread / self.price,              # Relative spread
            np.random.uniform(0.5, 2.0),           # Volume ratio
            np.random.uniform(-1, 1),              # Order book imbalance
            self.sigma                             # Volatility
        ], dtype=np.float32)

    def step(self, n_shares):
        """Execute n_shares at current time step."""
        n_shares = min(max(0, int(n_shares)), self.remaining)

        # Market impact
        participation = n_shares / (self.daily_volume / self.T) if self.daily_volume > 0 else 0
        temp_impact = self.eta * n_shares / self.base_price * self.price
        perm_impact = self.gamma * n_shares * self.price

        # Execution price (including impact and half-spread)
        exec_price = self.price + temp_impact + self.spread / 2

        # Cost of this slice
        slice_cost = (exec_price - self.arrival_price) * n_shares
        self.total_cost += slice_cost

        # Update state
        self.remaining -= n_shares
        self.price += perm_impact + self.sigma * self.price * np.random.randn()
        self.current_step += 1
        self.execution_prices.append(exec_price)
        self.trade_schedule.append(n_shares)

        # Reward: negative implementation shortfall
        reward = -slice_cost / (self.total_shares * self.arrival_price)

        # Terminal penalty for unexecuted shares
        done = self.current_step >= self.T
        if done and self.remaining > 0:
            penalty_price = self.price + self.eta * self.remaining * 2
            penalty_cost = (penalty_price - self.arrival_price) * self.remaining
            self.total_cost += penalty_cost
            reward -= penalty_cost / (self.total_shares * self.arrival_price)
            self.remaining = 0

        obs = self._get_obs()
        info = {
            'remaining': self.remaining,
            'exec_price': exec_price,
            'slice_cost_bps': slice_cost / (n_shares * self.arrival_price) * 10000 if n_shares > 0 else 0,
            'total_is_bps': self.total_cost / (self.total_shares * self.arrival_price) * 10000,
            'participation': participation
        }
        return obs, reward, done, info


class ExecutionRLAgent:
    """Simple RL agent for execution."""
    def __init__(self, obs_dim=6):
        np.random.seed(42)
        self.W = np.random.randn(obs_dim) * 0.1

    def act(self, obs, remaining, time_left):
        """Decide how many shares to trade."""
        signal = np.dot(obs, self.W)
        # Base rate: remaining / time_left (TWAP baseline)
        base_rate = remaining / max(time_left, 1)
        # Adjust by RL signal
        adjustment = np.tanh(signal) * 0.5 + 1.0
        n_shares = int(base_rate * adjustment)
        return max(0, min(n_shares, remaining))


def compare_strategies():
    """Compare TWAP, VWAP, and RL execution on NSE."""
    np.random.seed(42)

    # Simulate executing 10,000 shares of Reliance on NSE
    config = {
        'total_shares': 10000,
        'time_horizon': 20,
        'base_price': 2500,
        'daily_volume': 500000,
        'volatility': 0.015,
        'temporary_impact': 5e-4,
        'permanent_impact': 1e-5
    }

    strategies = {
        'TWAP': lambda env, obs, i: env.total_shares // env.T,
        'Front-loaded': lambda env, obs, i: int(env.remaining * 0.3) if i < 5 else env.remaining // max(env.T - i, 1),
        'RL Agent': None  # Will use RL agent
    }

    rl_agent = ExecutionRLAgent()
    print("Optimal Execution on NSE - Strategy Comparison")
    print(f"Order: Buy {config['total_shares']:,} shares of RELIANCE @ ~INR {config['base_price']}")
    print(f"Time horizon: {config['time_horizon']} periods")
    print(f"{'='*65}")

    results = {}
    for name, strategy in strategies.items():
        env = NSEExecutionEnv(**config)
        obs = env.reset()

        for i in range(config['time_horizon']):
            if name == 'RL Agent':
                n = rl_agent.act(obs, env.remaining, env.T - i)
            else:
                n = strategy(env, obs, i)

            obs, reward, done, info = env.step(n)
            if done:
                break

        # Compute metrics
        avg_exec_price = np.mean(env.execution_prices) if env.execution_prices else config['base_price']
        is_bps = info['total_is_bps']
        is_inr = env.total_cost

        results[name] = {
            'is_bps': is_bps,
            'is_inr': is_inr,
            'avg_price': avg_exec_price,
            'schedule': env.trade_schedule
        }

        print(f"\\n{name}:")
        print(f"  Avg exec price: INR {avg_exec_price:,.2f}")
        print(f"  Implementation shortfall: {is_bps:.2f} bps (INR {is_inr:,.0f})")
        print(f"  Schedule: {env.trade_schedule[:10]}{'...' if len(env.trade_schedule) > 10 else ''}")

    print(f"\\n{'='*65}")
    best = min(results.items(), key=lambda x: x[1]['is_bps'])
    print(f"Best strategy: {best[0]} ({best[1]['is_bps']:.2f} bps)")

compare_strategies()`}),e.jsx(A,{title:"Almgren-Chriss Execution for Reliance",difficulty:"advanced",problem:"A mutual fund needs to buy 50,000 shares of Reliance Industries (price ₹2,500, ADV 2M shares). Time horizon: 1 trading day (20 intervals). Temporary impact η = 0.0005, volatility σ = 1.5%. Risk aversion λ = 10⁻⁶. Compute the optimal execution schedule.",solution:[{step:"Compute urgency parameter κ",formula:"\\kappa = \\sqrt{\\frac{\\lambda \\sigma^2}{\\eta}} = \\sqrt{\\frac{10^{-6} \\times 0.015^2}{0.0005}} = 0.0212",explanation:"κ controls the trade-off between impact and risk. Low κ means nearly TWAP; high κ means front-loaded."},{step:"Optimal trajectory",formula:"n_t = 50000 \\times \\frac{\\sinh(0.0212 \\times (20-t))}{\\sinh(0.0212 \\times 20)}",explanation:"With low κ, this produces a nearly uniform schedule close to TWAP (2,500 shares per interval)."},{step:"Expected cost",formula:"E[\\text{IS}] = \\eta \\sum_t n_t^2 = 0.0005 \\times 20 \\times 2500^2 \\approx 62{,}500 \\text{ bps worth}",explanation:"The expected implementation shortfall from temporary impact. This equals approximately ₹6.25 per share or ₹3.125 lakhs total."}]}),e.jsx(k,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"RL-based execution outperforms static strategies (TWAP/VWAP) because it adapts to real-time market conditions -- widening spreads, changing volatility, and order book imbalance on NSE. Key considerations for Indian markets: (1) NSE's tick size of ₹0.05 creates discrete price levels, (2) the pre-open auction (9:00-9:08) offers a low-impact execution window, (3) use iceberg orders (disclosed quantity feature) to minimize information leakage, and (4) account for NSE's closing auction for NAV-benchmarked orders. SEBI regulations require best execution for institutional orders."})})]})}const pe=Object.freeze(Object.defineProperty({__proto__:null,default:$},Symbol.toStringTag,{value:"Module"}));function X(){const[a,b]=m.useState(.1),[l,w]=m.useState(0),[n,_]=m.useState(0),[c,y]=m.useState(.1),h=2500,x=(h-a/2+l*a).toFixed(2),i=(h+a/2+l*a).toFixed(2),s=Math.abs(n)*c*h*.015,d=a*100-s,o=-c*n*.015*.015;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Market Making Quote Adjuster"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust spread, skew, and inventory to see the impact on PnL and risk for an NSE stock."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Spread: ₹",a.toFixed(2)]}),e.jsx("input",{type:"range",min:"0.05",max:"1.0",step:"0.05",value:a,onChange:r=>b(parseFloat(r.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Skew: ",l.toFixed(2)]}),e.jsx("input",{type:"range",min:"-0.5",max:"0.5",step:"0.05",value:l,onChange:r=>w(parseFloat(r.target.value)),className:"h-2 w-full cursor-pointer accent-green-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Inventory: ",n]}),e.jsx("input",{type:"range",min:"-100",max:"100",step:"10",value:n,onChange:r=>_(parseInt(r.target.value)),className:"h-2 w-full cursor-pointer accent-amber-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Risk aversion: ",c.toFixed(2)]}),e.jsx("input",{type:"range",min:"0.01",max:"1.0",step:"0.01",value:c,onChange:r=>y(parseFloat(r.target.value)),className:"h-2 w-full cursor-pointer accent-red-500"})]})]}),e.jsxs("div",{className:"mb-4 flex items-center justify-center gap-8",children:[e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"text-2xl font-bold text-green-600",children:["₹",x]}),e.jsx("div",{className:"text-xs text-gray-500",children:"Bid"})]}),e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"text-lg text-gray-400",children:["₹",h]}),e.jsx("div",{className:"text-xs text-gray-500",children:"Mid"})]}),e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"text-2xl font-bold text-red-600",children:["₹",i]}),e.jsx("div",{className:"text-xs text-gray-500",children:"Ask"})]})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-2 text-center text-xs",children:[e.jsxs("div",{className:"rounded bg-blue-50 p-2 dark:bg-blue-900/30",children:[e.jsx("div",{className:"text-blue-600 dark:text-blue-400",children:"Spread P&L"}),e.jsxs("div",{className:"font-bold",children:["₹",(a*100).toFixed(0),"/100 shares"]})]}),e.jsxs("div",{className:"rounded bg-red-50 p-2 dark:bg-red-900/30",children:[e.jsx("div",{className:"text-red-600 dark:text-red-400",children:"Inventory Risk"}),e.jsxs("div",{className:"font-bold",children:["₹",s.toFixed(0)]})]}),e.jsxs("div",{className:`rounded p-2 ${d>=0?"bg-green-50 dark:bg-green-900/30":"bg-red-50 dark:bg-red-900/30"}`,children:[e.jsx("div",{className:"text-gray-600 dark:text-gray-400",children:"Net Expected PnL"}),e.jsxs("div",{className:`font-bold ${d>=0?"text-green-700":"text-red-700"}`,children:["₹",d.toFixed(0)]})]})]}),e.jsxs("p",{className:"mt-2 text-center text-xs text-gray-500",children:["Optimal skew for current inventory: ",o.toFixed(4)]})]})}function J(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"RL-Based Market Making"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Market makers provide liquidity by simultaneously posting buy and sell orders, profiting from the bid-ask spread while managing inventory risk. On NSE, authorized market makers operate in ETFs, commodity derivatives, and currency segments. RL enables adaptive quoting strategies that respond to order flow patterns, volatility changes, and inventory levels in real-time."}),e.jsx(j,{title:"Market Making",label:"Definition 14.13",definition:"A market maker continuously quotes bid and ask prices (p_bid, p_ask) to facilitate trading. The market maker profits from the spread (p_ask - p_bid) but bears inventory risk from accumulated positions. The Avellaneda-Stoikov framework optimizes quotes by adjusting for inventory and volatility.",notation:"δ_bid and δ_ask are the distances from mid-price to bid and ask quotes respectively."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Avellaneda-Stoikov Model"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The optimal reservation price and spread under the AS model:"}),e.jsx(t.BlockMath,{math:"r(s, q, t) = s - q \\gamma \\sigma^2 (T - t)"}),e.jsx(t.BlockMath,{math:"\\delta^* = \\gamma \\sigma^2 (T-t) + \\frac{2}{\\gamma} \\ln\\left(1 + \\frac{\\gamma}{k}\\right)"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(t.InlineMath,{math:"s"})," is the mid-price, ",e.jsx(t.InlineMath,{math:"q"})," is inventory,"," ",e.jsx(t.InlineMath,{math:"\\gamma"})," is risk aversion, ",e.jsx(t.InlineMath,{math:"\\sigma"})," is volatility, and ",e.jsx(t.InlineMath,{math:"k"})," is the order arrival rate parameter."]}),e.jsx(t.BlockMath,{math:"p_{\\text{bid}} = r - \\frac{\\delta^*}{2}, \\quad p_{\\text{ask}} = r + \\frac{\\delta^*}{2}"}),e.jsx(N,{title:"Avellaneda-Stoikov Optimal Quotes",label:"Theorem 14.11",statement:"Under the Avellaneda-Stoikov framework with exponential utility and Poisson order arrivals with rate λ(δ) = Ae^{-kδ}, the optimal market maker quotes satisfy the HJB equation: 0 = ∂u/∂t + σ²/2 · ∂²u/∂s² + max_{δ_b,δ_a}[λ_b(δ_b)(u(s,q+1,t)-u+δ_b) + λ_a(δ_a)(u(s,q-1,t)-u+δ_a)], where u is the value function.",proof:"The market maker maximizes expected exponential utility E[-exp(-γW_T)] where W is terminal wealth. The inventory process follows: dq = dN_bid - dN_ask (Poisson). The mid-price follows geometric Brownian motion dS = σS·dW. By Ito's lemma and the dynamic programming principle, the value function u(s,q,t) satisfies the given HJB equation. The optimal δ* is found by taking FOC of the max operator."}),e.jsx(X,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"RL State-Action for Market Making"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The RL market making agent uses a rich state representation:"}),e.jsx(t.BlockMath,{math:"s_t = \\left[q_t, \\; \\sigma_t, \\; \\text{spread}_t, \\; \\text{imb}_t, \\; \\text{vol\\_ratio}_t, \\; \\text{time\\_to\\_close}\\right]"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Actions specify quote offsets from mid-price:"}),e.jsx(t.BlockMath,{math:"a_t = (\\delta_{\\text{bid}}, \\delta_{\\text{ask}}) \\in \\mathbb{R}_+^2"}),e.jsx(k,{title:"Market Making on NSE",type:"info",children:e.jsx("p",{children:"On NSE, market making is formalized in specific segments: (1) ETF market makers are incentivized by SEBI/NSE with reduced transaction costs, (2) commodity market makers on MCX operate with specific obligations (continuous two-way quotes within specified spread limits), (3) currency derivatives on NSE have designated market makers. In the equity segment, proprietary trading firms effectively act as informal market makers. The minimum tick size of ₹0.05 sets a floor on the minimum spread."})}),e.jsx(S,{title:"rl_market_making.py",runnable:!0,code:`import numpy as np

class MarketMakingEnv:
    """
    RL environment for market making on NSE.
    Simulates order arrival, execution, and inventory dynamics.
    """
    def __init__(self, mid_price=2500, volatility=0.015,
                 tick_size=0.05, max_inventory=50,
                 arrival_rate=10, arrival_decay=50,
                 time_horizon=100):
        self.base_mid = mid_price
        self.sigma = volatility
        self.tick = tick_size
        self.max_inv = max_inventory
        self.A = arrival_rate        # Base arrival rate
        self.k = arrival_decay       # Arrival rate decay
        self.T = time_horizon
        self.reset()

    def reset(self):
        self.mid = self.base_mid
        self.inventory = 0
        self.cash = 0
        self.step_count = 0
        self.pnl_history = []
        self.inventory_history = []
        return self._get_obs()

    def _get_obs(self):
        return np.array([
            self.inventory / self.max_inv,
            self.sigma,
            self.tick / self.mid,
            np.random.uniform(-1, 1),    # Order flow imbalance
            self.step_count / self.T,
            (self.mid - self.base_mid) / self.base_mid
        ], dtype=np.float32)

    def _arrival_prob(self, delta):
        """Probability of fill at distance delta from mid."""
        return min(1.0, self.A * np.exp(-self.k * delta / self.mid))

    def step(self, action):
        """
        action: [delta_bid, delta_ask] - distances from mid
        """
        delta_bid, delta_ask = action
        delta_bid = max(delta_bid, self.tick)
        delta_ask = max(delta_ask, self.tick)

        bid_price = self.mid - delta_bid
        ask_price = self.mid + delta_ask

        # Check for fills (Poisson arrival)
        bid_fill = np.random.random() < self._arrival_prob(delta_bid)
        ask_fill = np.random.random() < self._arrival_prob(delta_ask)

        # Process fills
        trade_pnl = 0
        if bid_fill and self.inventory < self.max_inv:
            self.inventory += 1
            self.cash -= bid_price
            trade_pnl += self.mid - bid_price  # Earned bid spread

        if ask_fill and self.inventory > -self.max_inv:
            self.inventory -= 1
            self.cash += ask_price
            trade_pnl += ask_price - self.mid  # Earned ask spread

        # Mid price movement
        self.mid += self.sigma * self.mid * np.random.randn() * 0.01

        # Mark-to-market PnL
        mtm_pnl = trade_pnl + self.inventory * (self.mid - self.base_mid) * 0.001
        self.step_count += 1

        # Reward: spread earned - inventory risk penalty
        risk_penalty = 0.001 * self.inventory ** 2 * self.sigma ** 2
        reward = trade_pnl - risk_penalty

        self.pnl_history.append(trade_pnl)
        self.inventory_history.append(self.inventory)

        done = self.step_count >= self.T
        obs = self._get_obs()

        info = {
            'bid': bid_price,
            'ask': ask_price,
            'spread': ask_price - bid_price,
            'inventory': self.inventory,
            'trade_pnl': trade_pnl,
            'cash': self.cash,
            'mtm': self.cash + self.inventory * self.mid
        }
        return obs, reward, done, info


class ASMarketMaker:
    """Avellaneda-Stoikov market maker (analytical baseline)."""
    def __init__(self, gamma=0.1, sigma=0.015, k=50, T=100):
        self.gamma = gamma
        self.sigma = sigma
        self.k = k
        self.T = T

    def get_quotes(self, mid, inventory, t):
        """Compute optimal AS quotes."""
        tau = (self.T - t) / self.T
        reservation = mid - inventory * self.gamma * self.sigma**2 * tau
        spread = self.gamma * self.sigma**2 * tau + (2/self.gamma) * np.log(1 + self.gamma/self.k)
        spread = max(spread, 0.05)  # Min tick

        delta_bid = mid - reservation + spread/2
        delta_ask = reservation + spread/2 - mid
        return max(delta_bid, 0.05), max(delta_ask, 0.05)


class RLMarketMaker:
    """Simple RL market maker."""
    def __init__(self, obs_dim=6, gamma_risk=0.1):
        np.random.seed(42)
        self.W = np.random.randn(obs_dim, 2) * 0.01
        self.gamma = gamma_risk

    def get_quotes(self, obs, inventory):
        """Compute RL-based quotes."""
        raw = obs @ self.W
        # Base spread with inventory skew
        delta_bid = np.abs(raw[0]) * 0.5 + 0.05 + max(0, inventory * 0.01)
        delta_ask = np.abs(raw[1]) * 0.5 + 0.05 + max(0, -inventory * 0.01)
        return delta_bid, delta_ask


# Run comparison
np.random.seed(42)
env = MarketMakingEnv(mid_price=2500, volatility=0.015, time_horizon=200)

as_mm = ASMarketMaker(gamma=0.1, sigma=0.015)
rl_mm = RLMarketMaker()

strategies = {'Avellaneda-Stoikov': as_mm, 'RL Agent': rl_mm}

print("Market Making on NSE - Strategy Comparison")
print(f"Stock: Mid price INR {env.base_mid}, Tick: INR {env.tick}")
print(f"{'='*65}")

for name, strategy in strategies.items():
    env.reset()
    total_spread_pnl = 0
    total_reward = 0
    max_inv = 0

    for t in range(200):
        obs = env._get_obs()
        if name == 'Avellaneda-Stoikov':
            delta_b, delta_a = strategy.get_quotes(env.mid, env.inventory, t)
        else:
            delta_b, delta_a = strategy.get_quotes(obs, env.inventory)

        obs, reward, done, info = env.step([delta_b, delta_a])
        total_spread_pnl += info['trade_pnl']
        total_reward += reward
        max_inv = max(max_inv, abs(info['inventory']))

        if done:
            break

    final_mtm = info['mtm']
    avg_spread = np.mean([0.10])  # Approximate

    print(f"\\n{name}:")
    print(f"  Total spread PnL: INR {total_spread_pnl:,.2f}")
    print(f"  Mark-to-market:   INR {final_mtm:,.2f}")
    print(f"  Total reward:     {total_reward:.4f}")
    print(f"  Max |inventory|:  {max_inv}")
    print(f"  Avg inventory:    {np.mean(np.abs(env.inventory_history)):.1f}")
    print(f"  Fill count:       {sum(1 for p in env.pnl_history if p != 0)}")

print(f"\\n{'='*65}")
print("Note: RL agent learns to adapt spread and skew dynamically.")`}),e.jsx(A,{title:"AS Model Calibration for NSE ETF",difficulty:"advanced",problem:"Calibrate the Avellaneda-Stoikov model for making markets in Nifty BeES (Nifty 50 ETF) on NSE. NAV ≈ ₹230, daily volume ≈ 5M units, average spread ≈ ₹0.10, σ_daily = 1.2%.",solution:[{step:"Estimate arrival rate parameters",formula:"A \\cdot e^{-k \\cdot \\delta/P} = \\lambda(\\delta), \\quad \\lambda(0.05) \\approx 50/\\text{min}",explanation:"From historical fill data, estimate A ≈ 100 fills/min at zero spread, with decay k ≈ 200 per unit relative spread."},{step:"Compute optimal spread",formula:"\\delta^* = \\gamma \\sigma^2 \\tau + \\frac{2}{\\gamma}\\ln(1 + \\gamma/k) \\approx 0.08 + 0.02 = ₹0.10",explanation:"With γ = 0.5 and intraday σ = 0.012/√252 ≈ 0.00076, the optimal spread is approximately ₹0.10, matching observed spreads."},{step:"Inventory-adjusted reservation price",formula:"r = 230 - q \\times 0.5 \\times 0.00076^2 \\times \\tau",explanation:"For q = 1000 units inventory (long), the reservation price shifts down by about ₹0.0003, causing a slight ask-side skew to reduce inventory."}]}),e.jsx(k,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"RL-based market making extends the Avellaneda-Stoikov framework by learning non-linear quoting strategies that adapt to changing market conditions. For NSE applications: (1) ETF market making (Nifty BeES, Gold BeES) offers regulated opportunities with SEBI incentives, (2) the minimum tick of ₹0.05 constrains the minimum spread, (3) inventory risk is paramount -- the RL agent must learn to skew quotes to manage inventory, (4) adverse selection from informed traders (especially around F&O expiry) requires dynamic spread widening. Always comply with NSE market maker obligations regarding continuous quoting and spread limits."})})]})}const me=Object.freeze(Object.defineProperty({__proto__:null,default:J},Symbol.toStringTag,{value:"Module"}));export{se as a,re as b,ie as c,ne as d,oe as e,le as f,de as g,ce as h,pe as i,me as j,ae as s};
