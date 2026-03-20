import{j as e,r as n}from"./vendor-DgA46Qmo.js";import{r as i}from"./vendor-katex-C-S70IU0.js";import{D as j,T as v,P as k,E as S,N as b}from"./subject-01-math-foundations-vREfsVbS.js";function R(){const[r,y]=n.useState(1e6),[t,h]=n.useState(.05),[s,g]=n.useState(20),[a,p]=n.useState(50),d=r*.02*(t/100)*a,m=s*a,l=(d+m)/r*100;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Paper Trading Cost Estimator"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Estimate the impact of slippage and commissions on your paper trading P&L using typical Zerodha brokerage for NSE equity delivery."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Capital (INR): ",(r/1e5).toFixed(1),"L"]}),e.jsx("input",{type:"range",min:"100000",max:"10000000",step:"100000",value:r,onChange:u=>y(parseFloat(u.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Slippage (%): ",t.toFixed(2)]}),e.jsx("input",{type:"range",min:"0",max:"0.5",step:"0.01",value:t,onChange:u=>h(parseFloat(u.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Commission/trade (INR): ",s]}),e.jsx("input",{type:"range",min:"0",max:"100",step:"1",value:s,onChange:u=>g(parseFloat(u.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Monthly trades: ",a]}),e.jsx("input",{type:"range",min:"1",max:"500",step:"1",value:a,onChange:u=>p(parseFloat(u.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-4 text-center",children:[e.jsxs("div",{className:"rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30",children:[e.jsx("div",{className:"text-xs text-gray-500 dark:text-gray-400",children:"Slippage Cost"}),e.jsxs("div",{className:"text-lg font-bold text-blue-600 dark:text-blue-400",children:["INR ",d.toFixed(0)]})]}),e.jsxs("div",{className:"rounded-lg bg-orange-50 p-3 dark:bg-orange-900/30",children:[e.jsx("div",{className:"text-xs text-gray-500 dark:text-gray-400",children:"Commission Cost"}),e.jsxs("div",{className:"text-lg font-bold text-orange-600 dark:text-orange-400",children:["INR ",m.toFixed(0)]})]}),e.jsxs("div",{className:"rounded-lg bg-red-50 p-3 dark:bg-red-900/30",children:[e.jsx("div",{className:"text-xs text-gray-500 dark:text-gray-400",children:"Total Cost (% of capital)"}),e.jsxs("div",{className:`text-lg font-bold ${l>1?"text-red-600 dark:text-red-400":"text-green-600 dark:text-green-400"}`,children:[l.toFixed(3),"%"]})]})]})]})}function C(){return e.jsx("div",{className:"my-6 flex justify-center",children:e.jsxs("svg",{viewBox:"0 0 640 300",className:"w-full max-w-2xl","aria-label":"Paper trading architecture diagram",children:[e.jsx("defs",{children:e.jsx("marker",{id:"ptArrow",markerWidth:"8",markerHeight:"6",refX:"8",refY:"3",orient:"auto",children:e.jsx("polygon",{points:"0 0, 8 3, 0 6",fill:"#6366f1"})})}),e.jsx("rect",{x:"20",y:"100",width:"120",height:"60",rx:"8",fill:"#e0e7ff",stroke:"#6366f1",strokeWidth:"2"}),e.jsx("text",{x:"80",y:"125",textAnchor:"middle",className:"text-xs font-bold",fill:"#4338ca",children:"Strategy"}),e.jsx("text",{x:"80",y:"142",textAnchor:"middle",className:"text-[10px]",fill:"#6366f1",children:"Engine"}),e.jsx("line",{x1:"140",y1:"130",x2:"190",y2:"130",stroke:"#6366f1",strokeWidth:"2",markerEnd:"url(#ptArrow)"}),e.jsx("rect",{x:"200",y:"100",width:"120",height:"60",rx:"8",fill:"#fef3c7",stroke:"#f59e0b",strokeWidth:"2"}),e.jsx("text",{x:"260",y:"125",textAnchor:"middle",className:"text-xs font-bold",fill:"#b45309",children:"Paper OMS"}),e.jsx("text",{x:"260",y:"142",textAnchor:"middle",className:"text-[10px]",fill:"#d97706",children:"Order Mgmt"}),e.jsx("line",{x1:"320",y1:"130",x2:"370",y2:"130",stroke:"#6366f1",strokeWidth:"2",markerEnd:"url(#ptArrow)"}),e.jsx("rect",{x:"380",y:"100",width:"120",height:"60",rx:"8",fill:"#dcfce7",stroke:"#22c55e",strokeWidth:"2"}),e.jsx("text",{x:"440",y:"125",textAnchor:"middle",className:"text-xs font-bold",fill:"#15803d",children:"Fill Simulator"}),e.jsx("text",{x:"440",y:"142",textAnchor:"middle",className:"text-[10px]",fill:"#16a34a",children:"Slippage Model"}),e.jsx("line",{x1:"500",y1:"130",x2:"540",y2:"130",stroke:"#6366f1",strokeWidth:"2",markerEnd:"url(#ptArrow)"}),e.jsx("rect",{x:"548",y:"100",width:"80",height:"60",rx:"8",fill:"#fce7f3",stroke:"#ec4899",strokeWidth:"2"}),e.jsx("text",{x:"588",y:"125",textAnchor:"middle",className:"text-xs font-bold",fill:"#be185d",children:"P&L"}),e.jsx("text",{x:"588",y:"142",textAnchor:"middle",className:"text-[10px]",fill:"#ec4899",children:"Tracker"}),e.jsx("rect",{x:"200",y:"20",width:"120",height:"50",rx:"8",fill:"#f0f9ff",stroke:"#0ea5e9",strokeWidth:"2"}),e.jsx("text",{x:"260",y:"42",textAnchor:"middle",className:"text-xs font-bold",fill:"#0369a1",children:"NSE Live Feed"}),e.jsx("text",{x:"260",y:"57",textAnchor:"middle",className:"text-[10px]",fill:"#0ea5e9",children:"Kite WebSocket"}),e.jsx("line",{x1:"260",y1:"70",x2:"260",y2:"98",stroke:"#0ea5e9",strokeWidth:"2",markerEnd:"url(#ptArrow)"}),e.jsx("line",{x1:"260",y1:"70",x2:"80",y2:"70",stroke:"#0ea5e9",strokeWidth:"1.5",strokeDasharray:"4"}),e.jsx("line",{x1:"80",y1:"70",x2:"80",y2:"98",stroke:"#0ea5e9",strokeWidth:"1.5",markerEnd:"url(#ptArrow)"}),e.jsx("rect",{x:"200",y:"200",width:"120",height:"50",rx:"8",fill:"#fef2f2",stroke:"#ef4444",strokeWidth:"2"}),e.jsx("text",{x:"260",y:"222",textAnchor:"middle",className:"text-xs font-bold",fill:"#b91c1c",children:"Risk Engine"}),e.jsx("text",{x:"260",y:"237",textAnchor:"middle",className:"text-[10px]",fill:"#ef4444",children:"Position Limits"}),e.jsx("line",{x1:"260",y1:"160",x2:"260",y2:"198",stroke:"#ef4444",strokeWidth:"2",markerEnd:"url(#ptArrow)"}),e.jsx("text",{x:"320",y:"280",textAnchor:"middle",className:"text-[11px] font-medium",fill:"#6b7280",children:"Paper Trading Architecture for Indian Markets"})]})})}function L(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Paper Trading Setup with Zerodha Kite API"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Before deploying capital in Indian markets, every quantitative strategy must pass through a rigorous paper trading phase. Paper trading simulates real market conditions using live NSE/BSE data without risking actual capital, allowing you to validate strategy logic, execution assumptions, and infrastructure before going live."}),e.jsx(j,{title:"Paper Trading (Forward Testing)",label:"Definition 18.1",definition:"Paper trading is the process of executing a trading strategy in a simulated environment using real-time market data from NSE/BSE without placing actual orders. The system tracks hypothetical P&L, slippage estimates, and fill assumptions to validate strategy performance before live deployment.",notation:"Also called forward testing, virtual trading, or simulation trading. Zerodha provides a dedicated sandbox environment for this purpose."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Why Paper Trading is Essential"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Backtests suffer from multiple biases -- lookahead bias, survivorship bias, and unrealistic fill assumptions. Paper trading addresses these by running your strategy on live market data with realistic execution constraints. For Indian markets, this is especially important due to:"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Factor"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Backtest Assumption"}),e.jsx("th",{className:"px-5 py-2 text-left text-gray-600 dark:text-gray-400",children:"Live Reality"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Circuit breakers"}),e.jsx("td",{className:"px-5 py-2",children:"Not modeled"}),e.jsx("td",{className:"px-5 py-2",children:"NSE 5/10/20% limits halt trading"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Settlement"}),e.jsx("td",{className:"px-5 py-2",children:"Instant"}),e.jsx("td",{className:"px-5 py-2",children:"T+1 for equities on NSE"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"STT/GST"}),e.jsx("td",{className:"px-5 py-2",children:"Often ignored"}),e.jsx("td",{className:"px-5 py-2",children:"STT: 0.1% delivery, GST: 18% on brokerage"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-5 py-2",children:"Slippage"}),e.jsx("td",{className:"px-5 py-2",children:"0 or fixed"}),e.jsx("td",{className:"px-5 py-2",children:"Varies with Nifty 50 liquidity"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-5 py-2",children:"Order types"}),e.jsx("td",{className:"px-5 py-2",children:"Market orders"}),e.jsx("td",{className:"px-5 py-2",children:"Limit/SL/SLM with partial fills"})]})]})]})}),e.jsx(C,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Slippage Modeling for NSE"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"A realistic paper trading system must model slippage accurately. For NSE equities, slippage depends on order size relative to the available liquidity at the best bid/ask. A common model uses market impact:"}),e.jsx(i.BlockMath,{math:"S_{\\text{slippage}} = \\sigma \\cdot \\sqrt{\\frac{V_{\\text{order}}}{V_{\\text{ADV}}}} \\cdot \\text{sign}(\\text{side})"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(i.InlineMath,{math:"\\sigma"})," is the daily volatility of the instrument,"," ",e.jsx(i.InlineMath,{math:"V_{\\text{order}}"})," is the order value, and"," ",e.jsx(i.InlineMath,{math:"V_{\\text{ADV}}"})," is the average daily volume in INR."]}),e.jsx(v,{title:"Square Root Market Impact Law",label:"Theorem 18.1",statement:"The expected market impact of a trade is proportional to the square root of the participation rate. For an order of size Q shares executed over a period with total volume V, the expected impact is: $I = \\eta \\cdot \\sigma \\cdot \\sqrt{Q / V}$ where $\\eta$ is a market-specific constant (approximately 0.1--0.5 for NSE Nifty 50 stocks).",proof:"This result derives from the Kyle (1985) lambda model and has been empirically validated across multiple markets including the Indian equity market. The square root arises from the information content assumption: the price impact per unit of trading is decreasing in order size, consistent with a permanent-transitory impact decomposition."}),e.jsx(R,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Setting Up Zerodha Kite Paper Trading"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The Zerodha Kite Connect API provides WebSocket streaming for live tick data from NSE and BSE. We will build a paper trading engine that consumes this data, generates signals, and simulates fills with realistic slippage and transaction costs."}),e.jsx(k,{title:"paper_trading_engine.py",runnable:!0,code:`import numpy as np
from datetime import datetime, time
from dataclasses import dataclass, field
from typing import Dict, List, Optional
import json

@dataclass
class PaperOrder:
    """Simulated order for paper trading on NSE."""
    symbol: str
    side: str  # 'BUY' or 'SELL'
    quantity: int
    order_type: str  # 'MARKET', 'LIMIT', 'SL'
    limit_price: Optional[float] = None
    sl_trigger: Optional[float] = None
    timestamp: datetime = field(default_factory=datetime.now)
    status: str = 'PENDING'
    fill_price: float = 0.0
    fill_time: Optional[datetime] = None

@dataclass
class Position:
    symbol: str
    quantity: int = 0
    avg_price: float = 0.0
    realized_pnl: float = 0.0
    unrealized_pnl: float = 0.0

class PaperTradingEngine:
    """Paper trading engine for Indian equity markets."""

    def __init__(self, initial_capital: float = 1_000_000,
                 slippage_bps: float = 5.0,
                 brokerage_per_order: float = 20.0):
        self.capital = initial_capital
        self.initial_capital = initial_capital
        self.slippage_bps = slippage_bps
        self.brokerage = brokerage_per_order
        self.positions: Dict[str, Position] = {}
        self.orders: List[PaperOrder] = []
        self.trade_log: List[dict] = []
        self.equity_curve: List[float] = [initial_capital]

        # Indian market transaction costs
        self.stt_rate = 0.001       # STT: 0.1% for delivery
        self.gst_rate = 0.18        # GST: 18% on brokerage
        self.stamp_duty = 0.00015   # 0.015% for buy side
        self.sebi_charges = 0.000001  # SEBI turnover fee

    def _is_market_open(self) -> bool:
        """Check if NSE market hours (9:15 AM - 3:30 PM IST)."""
        now = datetime.now().time()
        return time(9, 15) <= now <= time(15, 30)

    def _calculate_slippage(self, price: float, side: str,
                            volatility: float = 0.02) -> float:
        """Model realistic slippage for NSE stocks."""
        base_slippage = price * (self.slippage_bps / 10000)
        vol_slippage = price * volatility * np.random.uniform(0, 0.001)
        total = base_slippage + vol_slippage
        return total if side == 'BUY' else -total

    def _calculate_costs(self, price: float, quantity: int,
                         side: str) -> float:
        """Calculate total transaction costs for Indian markets."""
        turnover = price * quantity
        brokerage = min(self.brokerage, turnover * 0.0003)
        stt = turnover * self.stt_rate if side == 'SELL' else 0
        gst = brokerage * self.gst_rate
        stamp = turnover * self.stamp_duty if side == 'BUY' else 0
        sebi = turnover * self.sebi_charges
        return brokerage + stt + gst + stamp + sebi

    def submit_order(self, symbol: str, side: str,
                     quantity: int, order_type: str = 'MARKET',
                     limit_price: float = None) -> PaperOrder:
        """Submit a paper order."""
        order = PaperOrder(
            symbol=symbol, side=side, quantity=quantity,
            order_type=order_type, limit_price=limit_price
        )
        self.orders.append(order)
        return order

    def simulate_fill(self, order: PaperOrder,
                      market_price: float) -> bool:
        """Simulate order fill with slippage."""
        slippage = self._calculate_slippage(
            market_price, order.side
        )
        fill_price = market_price + slippage
        costs = self._calculate_costs(
            fill_price, order.quantity, order.side
        )

        order.fill_price = fill_price
        order.fill_time = datetime.now()
        order.status = 'FILLED'

        # Update position
        if order.symbol not in self.positions:
            self.positions[order.symbol] = Position(order.symbol)
        pos = self.positions[order.symbol]

        if order.side == 'BUY':
            total_cost = pos.avg_price * pos.quantity
            new_cost = fill_price * order.quantity
            pos.quantity += order.quantity
            pos.avg_price = (total_cost + new_cost) / pos.quantity
            self.capital -= (new_cost + costs)
        else:
            pnl = (fill_price - pos.avg_price) * order.quantity
            pos.realized_pnl += pnl
            pos.quantity -= order.quantity
            self.capital += (fill_price * order.quantity - costs)

        self.trade_log.append({
            'symbol': order.symbol, 'side': order.side,
            'qty': order.quantity, 'price': fill_price,
            'costs': costs, 'time': str(order.fill_time)
        })
        return True

    def get_portfolio_value(self, prices: Dict[str, float]) -> float:
        """Calculate total portfolio value."""
        cash = self.capital
        positions_value = sum(
            pos.quantity * prices.get(pos.symbol, pos.avg_price)
            for pos in self.positions.values()
        )
        return cash + positions_value

# Demo: simulate paper trading on RELIANCE
engine = PaperTradingEngine(initial_capital=1_000_000)

# Simulate a buy order
order = engine.submit_order('RELIANCE', 'BUY', 100, 'MARKET')
engine.simulate_fill(order, 2450.0)  # Current NSE price

print("=== Paper Trading Status ===")
print(f"Initial Capital: INR {engine.initial_capital:,.2f}")
print(f"Cash Remaining:  INR {engine.capital:,.2f}")
pos = engine.positions['RELIANCE']
print(f"Position: {pos.quantity} shares @ INR {pos.avg_price:.2f}")
print(f"Fill Price (with slippage): INR {order.fill_price:.2f}")
print(f"Transaction Costs: INR {engine.trade_log[0]['costs']:.2f}")
total_val = engine.get_portfolio_value({'RELIANCE': 2460.0})
print(f"Portfolio Value: INR {total_val:,.2f}")`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Realistic Fill Simulation"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"A critical component is the fill simulator. For NSE mid-cap stocks, partial fills are common and must be accounted for. The fill probability depends on the limit order distance from the current best bid/ask:"}),e.jsx(i.BlockMath,{math:"P(\\text{fill}) = \\exp\\left(-\\lambda \\cdot \\frac{|p_{\\text{limit}} - p_{\\text{mid}}|}{p_{\\text{mid}} \\cdot \\sigma}\\right)"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(i.InlineMath,{math:"\\lambda"})," is the fill decay parameter (typically 2--5 for NSE stocks), ",e.jsx(i.InlineMath,{math:"p_{\\text{mid}}"})," is the mid-price, and"," ",e.jsx(i.InlineMath,{math:"\\sigma"})," is the intraday volatility."]}),e.jsx(S,{title:"Paper Trade Reconciliation",difficulty:"intermediate",problem:"Your strategy bought 200 shares of TCS at INR 3,500 on paper with 5 bps slippage. The actual NSE fill would have been at INR 3,502 (based on order book). Calculate the paper P&L error.",solution:[{step:"Calculate paper fill price",formula:"p_{\\text{paper}} = 3500 \\times (1 + 5/10000) = 3500 \\times 1.0005 = 3501.75",explanation:"Paper trading assumes 5 basis points of slippage on top of the quoted price."},{step:"Calculate actual fill price",formula:"p_{\\text{actual}} = 3502.00",explanation:"The real order book would have filled at INR 3,502 due to market microstructure."},{step:"Compute fill price discrepancy",formula:"\\Delta p = |3502.00 - 3501.75| = 0.25 \\text{ INR per share}"},{step:"Total P&L error",formula:"\\text{Error} = 200 \\times 0.25 = \\text{INR } 50",explanation:"The paper trading overestimated the fill quality by INR 50 total. This is a 0.007% error relative to the trade size, which is acceptable for most strategies."}]}),e.jsxs(b,{title:"Zerodha Kite API Setup",type:"tip",children:[e.jsx("p",{children:"To set up paper trading with Zerodha Kite Connect:"}),e.jsxs("ol",{className:"mt-2 list-decimal list-inside space-y-1",children:[e.jsxs("li",{children:["Register on ",e.jsx("strong",{children:"Kite Connect developer portal"})," and obtain your API key"]}),e.jsxs("li",{children:["Install the Python SDK: ",e.jsx("code",{children:"pip install kiteconnect"})]}),e.jsx("li",{children:"Use the WebSocket API for real-time tick data from NSE/BSE"}),e.jsx("li",{children:"Route all orders through your paper trading engine instead of the live API"}),e.jsx("li",{children:"Log every simulated fill with timestamp, slippage, and transaction costs"}),e.jsxs("li",{children:["Run for at least ",e.jsx("strong",{children:"3 months"})," before considering live deployment"]})]})]}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Transaction Cost Model for Indian Markets"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Indian markets have a unique cost structure that must be accurately modeled. The total cost per trade on NSE includes multiple regulatory components:"}),e.jsx(i.BlockMath,{math:"C_{\\text{total}} = C_{\\text{brokerage}} + C_{\\text{STT}} + C_{\\text{GST}} + C_{\\text{stamp}} + C_{\\text{SEBI}} + C_{\\text{exchange}}"}),e.jsx(k,{title:"indian_transaction_costs.py",runnable:!0,code:`def calculate_nse_costs(price, quantity, side, segment='equity_delivery'):
    """
    Calculate all-in transaction costs for NSE trades.
    Updated for 2024 SEBI/NSE fee structure.
    """
    turnover = price * quantity
    costs = {}

    # Zerodha brokerage (flat fee model)
    if segment == 'equity_delivery':
        costs['brokerage'] = 0  # Zero brokerage for delivery
    elif segment == 'equity_intraday':
        costs['brokerage'] = min(20, turnover * 0.0003)
    elif segment == 'futures':
        costs['brokerage'] = min(20, turnover * 0.0003)
    elif segment == 'options':
        costs['brokerage'] = 20  # Flat INR 20 per order

    # Securities Transaction Tax (STT)
    if segment == 'equity_delivery':
        costs['stt'] = turnover * 0.001  # 0.1% both sides
    elif segment == 'equity_intraday':
        costs['stt'] = turnover * 0.00025 if side == 'SELL' else 0
    elif segment == 'futures':
        costs['stt'] = turnover * 0.000125 if side == 'SELL' else 0
    elif segment == 'options':
        costs['stt'] = turnover * 0.000625 if side == 'SELL' else 0

    # GST (18% on brokerage + transaction charges)
    exchange_txn = turnover * 0.0000345  # NSE transaction charge
    costs['exchange_txn'] = exchange_txn
    costs['gst'] = (costs['brokerage'] + exchange_txn) * 0.18

    # SEBI turnover fee
    costs['sebi'] = turnover * 0.000001

    # Stamp duty (buy side only)
    if side == 'BUY':
        stamp_rates = {
            'equity_delivery': 0.00015,
            'equity_intraday': 0.00003,
            'futures': 0.00002,
            'options': 0.00003,
        }
        costs['stamp_duty'] = turnover * stamp_rates[segment]
    else:
        costs['stamp_duty'] = 0

    costs['total'] = sum(costs.values())
    return costs

# Example: Buy 100 RELIANCE at INR 2,450
costs = calculate_nse_costs(2450, 100, 'BUY', 'equity_delivery')
print("=== NSE Transaction Costs (RELIANCE Buy) ===")
for key, value in costs.items():
    print(f"  {key:15s}: INR {value:>10.2f}")
print(f"  {'cost_bps':15s}: {costs['total'] / (2450 * 100) * 10000:>10.2f} bps")

# Compare across segments
print("\\n=== Cost Comparison Across Segments ===")
for seg in ['equity_delivery', 'equity_intraday', 'futures', 'options']:
    c = calculate_nse_costs(2450, 100, 'BUY', seg)
    print(f"  {seg:20s}: INR {c['total']:>8.2f} ({c['total']/(2450*100)*10000:.1f} bps)")`}),e.jsx(b,{title:"Key Takeaway",type:"tip",children:e.jsxs("p",{children:["Paper trading is not a formality -- it is the ",e.jsx("strong",{children:"most important validation step"})," before deploying capital. A well-designed paper trading system for Indian markets must accurately model NSE/BSE microstructure, regulatory costs (STT, GST, stamp duty), circuit breakers, and realistic slippage. Run your strategy in paper mode for at least 3 months across different market regimes before considering live deployment with Zerodha or any other Indian broker."]})})]})}const re=Object.freeze(Object.defineProperty({__proto__:null,default:L},Symbol.toStringTag,{value:"Module"}));function P(){const[r,y]=n.useState(12.5),[t,h]=n.useState(9.8),[s,g]=n.useState(1.8),[a,p]=n.useState(1.3),o=(r-t)/r*100,d=(s-a)/s*100,m=o<30&&d<25;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Backtest vs Paper Performance Decay"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Compare your backtest metrics with paper trading results to assess strategy viability."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Backtest Return (%): ",r.toFixed(1)]}),e.jsx("input",{type:"range",min:"0",max:"50",step:"0.5",value:r,onChange:f=>y(parseFloat(f.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Paper Return (%): ",t.toFixed(1)]}),e.jsx("input",{type:"range",min:"-20",max:"50",step:"0.5",value:t,onChange:f=>h(parseFloat(f.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Backtest Sharpe: ",s.toFixed(2)]}),e.jsx("input",{type:"range",min:"0",max:"4",step:"0.05",value:s,onChange:f=>g(parseFloat(f.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Paper Sharpe: ",a.toFixed(2)]}),e.jsx("input",{type:"range",min:"-1",max:"4",step:"0.05",value:a,onChange:f=>p(parseFloat(f.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-4 text-center",children:[e.jsxs("div",{className:"rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30",children:[e.jsx("div",{className:"text-xs text-gray-500 dark:text-gray-400",children:"Return Decay"}),e.jsxs("div",{className:`text-lg font-bold ${o>30?"text-red-600":"text-green-600"}`,children:[o.toFixed(1),"%"]})]}),e.jsxs("div",{className:"rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30",children:[e.jsx("div",{className:"text-xs text-gray-500 dark:text-gray-400",children:"Sharpe Decay"}),e.jsxs("div",{className:`text-lg font-bold ${d>25?"text-red-600":"text-green-600"}`,children:[d.toFixed(1),"%"]})]}),e.jsxs("div",{className:`rounded-lg p-3 ${m?"bg-green-50 dark:bg-green-900/30":"bg-red-50 dark:bg-red-900/30"}`,children:[e.jsx("div",{className:"text-xs text-gray-500 dark:text-gray-400",children:"Verdict"}),e.jsx("div",{className:`text-lg font-bold ${m?"text-green-600":"text-red-600"}`,children:m?"PASS":"FAIL"})]})]}),e.jsx("p",{className:"mt-3 text-center text-xs text-gray-500 dark:text-gray-400",children:"Rule of thumb: Return decay <30% and Sharpe decay <25% are acceptable for Indian equity strategies."})]})}function D(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Reconciling Paper vs Backtest Results"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"The gap between backtest performance and paper trading results reveals the true cost of market friction, execution latency, and model assumptions. Systematic reconciliation is essential before any Nifty 50 or Bank Nifty strategy goes live on NSE."}),e.jsx(j,{title:"Performance Decay",label:"Definition 18.2",definition:"Performance decay is the systematic reduction in strategy returns when transitioning from backtest to paper trading (and subsequently to live trading). It is measured as the percentage decline in key metrics such as annualized return, Sharpe ratio, and maximum drawdown between environments.",notation:"Typical decay: 20--40% from backtest to paper, additional 10--20% from paper to live for NSE equity strategies."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Sources of Backtest-Paper Divergence"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Understanding why your backtest and paper results differ is crucial. The divergence can be decomposed into systematic and random components:"}),e.jsx(i.BlockMath,{math:"R_{\\text{paper}} = R_{\\text{backtest}} - \\Delta_{\\text{slippage}} - \\Delta_{\\text{timing}} - \\Delta_{\\text{data}} - \\epsilon"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where each ",e.jsx(i.InlineMath,{math:"\\Delta"})," represents a specific source of decay and"," ",e.jsx(i.InlineMath,{math:"\\epsilon"})," is random noise from market regime differences."]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Source"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Typical Impact (bps)"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"NSE-Specific Notes"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Slippage underestimation"}),e.jsx("td",{className:"px-4 py-2",children:"5--20"}),e.jsx("td",{className:"px-4 py-2",children:"Higher for mid/small-cap NSE stocks"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Execution latency"}),e.jsx("td",{className:"px-4 py-2",children:"2--10"}),e.jsx("td",{className:"px-4 py-2",children:"Zerodha API latency ~50-200ms"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Data quality gaps"}),e.jsx("td",{className:"px-4 py-2",children:"1--5"}),e.jsx("td",{className:"px-4 py-2",children:"NSE historical data adjustments"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Lookahead bias leaks"}),e.jsx("td",{className:"px-4 py-2",children:"5--50+"}),e.jsx("td",{className:"px-4 py-2",children:"Corporate actions, index rebalancing"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Transaction costs"}),e.jsx("td",{className:"px-4 py-2",children:"3--15"}),e.jsx("td",{className:"px-4 py-2",children:"STT + GST + stamp duty + SEBI fees"})]})]})]})}),e.jsx(P,{}),e.jsx(v,{title:"Haircut Rule for Strategy Viability",label:"Theorem 18.2",statement:"A strategy should be considered viable for live deployment on NSE only if: $\\text{Sharpe}_{\\text{paper}} \\geq 0.5 \\cdot \\text{Sharpe}_{\\text{backtest}}$ and $\\text{MaxDD}_{\\text{paper}} \\leq 1.5 \\cdot \\text{MaxDD}_{\\text{backtest}}$. If the paper Sharpe falls below 50% of the backtest Sharpe, the strategy likely has significant hidden assumptions or biases.",proof:"This threshold is empirically derived from a study of 500+ quantitative strategies deployed on Indian markets between 2018--2024. Strategies violating these bounds had a >80% probability of failing within 6 months of live deployment."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Systematic Reconciliation Framework"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["A proper reconciliation compares every trade between backtest and paper execution. For each trade ",e.jsx(i.InlineMath,{math:"i"}),", we compute the fill price deviation:"]}),e.jsx(i.BlockMath,{math:"\\delta_i = \\frac{p_{i,\\text{paper}} - p_{i,\\text{backtest}}}{p_{i,\\text{backtest}}} \\times 10000 \\quad \\text{(in basis points)}"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["The distribution of ",e.jsx(i.InlineMath,{math:"\\delta_i"})," reveals systematic biases. A well-calibrated paper trading system should show ",e.jsx(i.InlineMath,{math:"\\mathbb{E}[\\delta] \\approx 0"})," ","with low variance."]}),e.jsx(k,{title:"reconciliation_engine.py",runnable:!0,code:`import numpy as np
from dataclasses import dataclass
from typing import List, Tuple

@dataclass
class TradeComparison:
    symbol: str
    backtest_fill: float
    paper_fill: float
    quantity: int
    side: str
    timestamp: str

    @property
    def deviation_bps(self) -> float:
        return (self.paper_fill - self.backtest_fill) / self.backtest_fill * 10000

    @property
    def pnl_impact(self) -> float:
        return (self.paper_fill - self.backtest_fill) * self.quantity * (
            -1 if self.side == 'BUY' else 1
        )

class ReconciliationEngine:
    """Compare backtest vs paper trading performance."""

    def __init__(self):
        self.comparisons: List[TradeComparison] = []

    def add_comparison(self, symbol, bt_fill, paper_fill,
                       qty, side, ts):
        self.comparisons.append(TradeComparison(
            symbol, bt_fill, paper_fill, qty, side, ts
        ))

    def summary_statistics(self) -> dict:
        devs = [c.deviation_bps for c in self.comparisons]
        impacts = [c.pnl_impact for c in self.comparisons]
        buy_devs = [c.deviation_bps for c in self.comparisons
                    if c.side == 'BUY']
        sell_devs = [c.deviation_bps for c in self.comparisons
                     if c.side == 'SELL']

        return {
            'n_trades': len(self.comparisons),
            'mean_deviation_bps': np.mean(devs),
            'std_deviation_bps': np.std(devs),
            'median_deviation_bps': np.median(devs),
            'total_pnl_impact': sum(impacts),
            'buy_mean_deviation': np.mean(buy_devs) if buy_devs else 0,
            'sell_mean_deviation': np.mean(sell_devs) if sell_devs else 0,
            'pct_adverse_fills': np.mean([
                (d > 0 and c.side == 'BUY') or
                (d < 0 and c.side == 'SELL')
                for d, c in zip(devs, self.comparisons)
            ]) * 100
        }

    def detect_anomalies(self, threshold_bps=20) -> List[TradeComparison]:
        """Flag trades with unusually large deviations."""
        return [c for c in self.comparisons
                if abs(c.deviation_bps) > threshold_bps]

# Simulate reconciliation data for NSE trades
np.random.seed(42)
engine = ReconciliationEngine()

nse_stocks = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK',
              'HINDUNILVR', 'SBIN', 'BHARTIARTL', 'ITC', 'KOTAKBANK']
prices = [2450, 3520, 1680, 1450, 1020, 2580, 625, 1180, 440, 1780]

for i in range(100):
    idx = i % len(nse_stocks)
    bt_price = prices[idx] * (1 + np.random.normal(0, 0.02))
    side = 'BUY' if np.random.random() > 0.5 else 'SELL'
    # Paper fill has slippage + noise
    slippage = bt_price * np.random.normal(0.0003, 0.0005)
    paper_price = bt_price + (slippage if side == 'BUY' else -slippage)
    qty = np.random.choice([10, 25, 50, 100, 200])

    engine.add_comparison(
        nse_stocks[idx], bt_price, paper_price,
        qty, side, f'2024-01-{(i%28)+1:02d}'
    )

stats = engine.summary_statistics()
print("=== Backtest vs Paper Reconciliation ===")
print(f"Total trades compared: {stats['n_trades']}")
print(f"Mean deviation: {stats['mean_deviation_bps']:.2f} bps")
print(f"Std deviation:  {stats['std_deviation_bps']:.2f} bps")
print(f"Median deviation: {stats['median_deviation_bps']:.2f} bps")
print(f"Total P&L impact: INR {stats['total_pnl_impact']:,.2f}")
print(f"Buy-side mean dev: {stats['buy_mean_deviation']:.2f} bps")
print(f"Sell-side mean dev: {stats['sell_mean_deviation']:.2f} bps")
print(f"Adverse fill rate: {stats['pct_adverse_fills']:.1f}%")

anomalies = engine.detect_anomalies(threshold_bps=15)
print(f"\\nAnomalous trades (>15 bps): {len(anomalies)}")
for a in anomalies[:5]:
    print(f"  {a.symbol} {a.side} {a.quantity}x "
          f"dev={a.deviation_bps:.1f}bps "
          f"impact=INR {a.pnl_impact:.0f}")`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Time-Series Reconciliation"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Beyond individual trade comparison, we must reconcile the entire equity curve. The cumulative return difference should be stationary -- if it is trending, there is a systematic bias in either the backtest or paper execution."}),e.jsx(i.BlockMath,{math:"\\text{CumDiff}(t) = \\sum_{i=1}^{t} (r_{i,\\text{paper}} - r_{i,\\text{backtest}})"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["Apply the Augmented Dickey-Fuller test to ",e.jsx(i.InlineMath,{math:"\\text{CumDiff}(t)"}),". If the series is non-stationary (fails ADF test at 5% level), investigate for systematic execution bias. Common causes in Indian markets include:"]}),e.jsxs("ul",{className:"ml-6 list-disc text-sm text-gray-700 dark:text-gray-300 space-y-1",children:[e.jsx("li",{children:"NSE pre-open auction fills at 9:08 AM differ from backtest OHLC assumptions"}),e.jsx("li",{children:"Circuit breaker events create unfillable orders in paper trading"}),e.jsx("li",{children:"Dividend adjustments handled differently in historical vs live data"}),e.jsx("li",{children:"F&O expiry day (last Thursday) microstructure effects"})]}),e.jsx(k,{title:"equity_curve_reconciliation.py",runnable:!0,code:`import numpy as np

def adf_test_simple(series, max_lag=5):
    """Simplified ADF test for stationarity."""
    n = len(series)
    y = np.diff(series)
    y_lag = series[:-1]

    # OLS regression: dy = alpha + beta * y_lag + epsilon
    X = np.column_stack([np.ones(n - 1), y_lag])
    beta = np.linalg.lstsq(X, y, rcond=None)[0]
    residuals = y - X @ beta
    se = np.sqrt(np.sum(residuals**2) / (n - 3) /
                 np.sum((y_lag - y_lag.mean())**2))
    t_stat = beta[1] / se

    # Critical values (approximate)
    critical = {1: -3.43, 5: -2.86, 10: -2.57}
    return t_stat, critical

# Simulate equity curves
np.random.seed(42)
n_days = 252  # One year of NSE trading days

# Backtest returns (slightly optimistic)
bt_returns = np.random.normal(0.0005, 0.015, n_days)
bt_equity = np.cumprod(1 + bt_returns) * 1_000_000

# Paper returns (with realistic decay)
slippage_drag = np.random.normal(0.00008, 0.0002, n_days)
paper_returns = bt_returns - slippage_drag
paper_equity = np.cumprod(1 + paper_returns) * 1_000_000

# Cumulative difference
cum_diff = np.cumsum(paper_returns - bt_returns)

# Test for stationarity
t_stat, critical = adf_test_simple(cum_diff)

bt_total = (bt_equity[-1] / bt_equity[0] - 1) * 100
paper_total = (paper_equity[-1] / paper_equity[0] - 1) * 100
decay = bt_total - paper_total

print("=== Equity Curve Reconciliation ===")
print(f"Backtest total return: {bt_total:.2f}%")
print(f"Paper total return:    {paper_total:.2f}%")
print(f"Return decay:          {decay:.2f}%")
print(f"Return decay ratio:    {decay/bt_total*100:.1f}% of backtest")
print(f"\\nBacktest Sharpe: {np.mean(bt_returns)/np.std(bt_returns)*np.sqrt(252):.2f}")
print(f"Paper Sharpe:    {np.mean(paper_returns)/np.std(paper_returns)*np.sqrt(252):.2f}")
print(f"\\n=== ADF Test on Cumulative Difference ===")
print(f"ADF statistic: {t_stat:.4f}")
for level, cv in critical.items():
    result = "STATIONARY" if t_stat < cv else "NON-STATIONARY"
    print(f"  {level}% level: {cv:.2f} -> {result}")

if t_stat < critical[5]:
    print("\\nResult: Cum diff is stationary -> no systematic bias")
else:
    print("\\nWARNING: Cum diff is non-stationary -> systematic bias detected!")`}),e.jsx(S,{title:"Diagnosing a Backtest-Paper Gap",difficulty:"intermediate",problem:"Your Nifty 50 mean-reversion strategy shows a backtest Sharpe of 2.1 but paper trading Sharpe of 0.9 over 3 months. The return decay is 58%. Diagnose the likely causes.",solution:[{step:"Check the Sharpe decay ratio",formula:"\\text{Decay} = \\frac{2.1 - 0.9}{2.1} = 57.1\\%",explanation:"A >50% Sharpe decay is a red flag. The strategy is likely overfit or has significant execution issues."},{step:"Analyze trade-level fill quality",formula:"\\bar{\\delta} = \\frac{1}{N}\\sum_{i=1}^{N} \\frac{p_{i,\\text{paper}} - p_{i,\\text{backtest}}}{p_{i,\\text{backtest}}}",explanation:"If the mean deviation is consistently positive for buys and negative for sells, slippage is the primary culprit."},{step:"Check for timing bias",formula:"\\text{Corr}(\\delta_i, |r_{i,\\text{signal}}|)",explanation:"If fill deviations correlate with signal strength, the backtest is likely using close prices while paper uses next-open, creating a timing bias particularly on volatile Nifty 50 components."},{step:"Recommendation",formula:"\\text{Sharpe}_{\\text{paper}} = 0.9 < 0.5 \\times 2.1 = 1.05",explanation:"The paper Sharpe fails the 50% haircut rule. Do NOT deploy this strategy live. Investigate the backtest for lookahead bias, especially around NSE corporate actions and index rebalancing dates."}]}),e.jsxs(b,{title:"Reconciliation Checklist for NSE Strategies",type:"tip",children:[e.jsx("p",{children:"Before concluding reconciliation, verify all of the following:"}),e.jsxs("ul",{className:"mt-2 list-disc list-inside space-y-1",children:[e.jsx("li",{children:"Trade counts match between backtest and paper (within 5%)"}),e.jsx("li",{children:"Fill price deviations are centered around zero"}),e.jsx("li",{children:"Cumulative difference curve is stationary (ADF test)"}),e.jsx("li",{children:"Drawdown profiles are qualitatively similar"}),e.jsx("li",{children:"Performance during NSE circuit breaker events is reasonable"}),e.jsx("li",{children:"F&O expiry day performance is separately analyzed"}),e.jsx("li",{children:"STT, GST, and stamp duty costs are correctly accounted"}),e.jsx("li",{children:"Dividend adjustments match between data sources"})]})]}),e.jsx(b,{title:"Key Takeaway",type:"tip",children:e.jsxs("p",{children:["Backtest-paper reconciliation is a ",e.jsx("strong",{children:"diagnostic process"}),", not just a metric comparison. Every basis point of unexplained divergence represents either a backtest flaw or an execution model deficiency. Systematic reconciliation using trade-level analysis, equity curve comparison, and statistical testing is the foundation of trustworthy forward testing for Indian market strategies."]})})]})}const se=Object.freeze(Object.defineProperty({__proto__:null,default:D},Symbol.toStringTag,{value:"Module"}));function O(){const[r,y]=n.useState(100),[t,h]=n.useState(.15),[s,g]=n.useState(1.2),a=t/s*Math.sqrt(r),p=1.96,o=2*(1-f(Math.abs(a))),d=Math.abs(a)>p,m=Math.ceil((p*s/t)**2);function f(l){const u=.254829592,c=-.284496736,N=1.421413741,x=-1.453152027,E=1.061405429,T=.3275911,_=l<0?-1:1;l=Math.abs(l)/Math.sqrt(2);const w=1/(1+T*l),I=1-((((E*w+x)*w+N)*w+c)*w+u)*w*Math.exp(-l*l);return .5*(1+_*I)}return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Statistical Significance of Paper Trading Returns"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Test whether your paper trading returns are statistically different from zero using a t-test. Adjust parameters to see the required sample size."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Number of trades: ",r]}),e.jsx("input",{type:"range",min:"10",max:"1000",step:"10",value:r,onChange:l=>y(parseInt(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Mean return (%): ",t.toFixed(2)]}),e.jsx("input",{type:"range",min:"-1",max:"2",step:"0.01",value:t,onChange:l=>h(parseFloat(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Std dev (%): ",s.toFixed(2)]}),e.jsx("input",{type:"range",min:"0.1",max:"5",step:"0.05",value:s,onChange:l=>g(parseFloat(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-4 gap-3 text-center",children:[e.jsxs("div",{className:"rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"t-statistic"}),e.jsx("div",{className:"text-lg font-bold text-blue-600 dark:text-blue-400",children:a.toFixed(3)})]}),e.jsxs("div",{className:"rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"p-value"}),e.jsx("div",{className:"text-lg font-bold text-purple-600 dark:text-purple-400",children:o.toFixed(4)})]}),e.jsxs("div",{className:`rounded-lg p-3 ${d?"bg-green-50 dark:bg-green-900/30":"bg-red-50 dark:bg-red-900/30"}`,children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Significant?"}),e.jsx("div",{className:`text-lg font-bold ${d?"text-green-600":"text-red-600"}`,children:d?"YES":"NO"})]}),e.jsxs("div",{className:"rounded-lg bg-orange-50 p-3 dark:bg-orange-900/30",children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Min Trades Needed"}),e.jsx("div",{className:"text-lg font-bold text-orange-600 dark:text-orange-400",children:t>0?m:"Inf"})]})]})]})}function q(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Statistical Tests for Live vs Backtest Validation"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Before deploying a strategy live on NSE, we need rigorous statistical evidence that paper trading results are consistent with backtest expectations. This section covers the hypothesis testing framework for validating forward test results."}),e.jsx(j,{title:"Strategy Validation Hypothesis",label:"Definition 18.3",definition:"The null hypothesis for strategy validation states that paper trading returns are drawn from the same distribution as backtest returns: H_0: mu_paper = mu_backtest. We test against H_1: mu_paper != mu_backtest at significance level alpha (typically 5%). Rejection of H_0 indicates a systematic discrepancy requiring investigation.",notation:"We use two-sample t-tests, KS tests, and permutation tests depending on distributional assumptions."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"The Minimum Sample Size Problem"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"A critical question for Indian market strategies: how many paper trades do we need before the results are statistically meaningful? The answer depends on the strategy Sharpe ratio and the desired confidence level."}),e.jsx(i.BlockMath,{math:"n_{\\min} = \\left(\\frac{z_{\\alpha/2} \\cdot \\sigma_r}{\\mu_r}\\right)^2"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For a strategy with annualized Sharpe of 1.5 trading Nifty 50 components daily, with per-trade return of 0.15% and standard deviation of 1.2%, we need:"}),e.jsx(i.BlockMath,{math:"n_{\\min} = \\left(\\frac{1.96 \\times 1.2}{0.15}\\right)^2 = \\left(15.68\\right)^2 \\approx 246 \\text{ trades}"}),e.jsx(O,{}),e.jsx(v,{title:"Two-Sample Test for Return Distributions",label:"Theorem 18.3",statement:"To test whether backtest and paper trading returns come from the same distribution, the Kolmogorov-Smirnov (KS) test statistic is: $D_{n,m} = \\sup_x |F_{n,\\text{bt}}(x) - F_{m,\\text{paper}}(x)|$ where $F_n$ and $F_m$ are the empirical CDFs. Under $H_0$, $\\sqrt{\\frac{nm}{n+m}} D_{n,m} \\to K$ (Kolmogorov distribution). Reject $H_0$ at level $\\alpha$ if $D_{n,m} > c(\\alpha) \\sqrt{\\frac{n+m}{nm}}$.",proof:"The KS test is distribution-free, making it ideal for comparing return distributions that may be non-normal (heavy-tailed, as commonly observed in NSE returns). The test detects differences in location, scale, and shape simultaneously."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Comprehensive Statistical Validation Suite"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"A single test is insufficient. We apply a battery of tests to validate paper trading results against backtest expectations:"}),e.jsx(k,{title:"statistical_validation.py",runnable:!0,code:`import numpy as np
from scipy import stats

class StrategyValidator:
    """Statistical validation suite for paper vs backtest."""

    def __init__(self, backtest_returns, paper_returns, alpha=0.05):
        self.bt = np.array(backtest_returns)
        self.paper = np.array(paper_returns)
        self.alpha = alpha
        self.results = {}

    def t_test_returns(self):
        """Two-sample t-test: are mean returns different?"""
        t_stat, p_value = stats.ttest_ind(
            self.bt, self.paper, equal_var=False  # Welch's
        )
        self.results['t_test'] = {
            'statistic': t_stat, 'p_value': p_value,
            'reject_H0': p_value < self.alpha,
            'interpretation': (
                'FAIL: Means significantly different'
                if p_value < self.alpha
                else 'PASS: No significant difference in means'
            )
        }
        return self.results['t_test']

    def ks_test_distribution(self):
        """KS test: are return distributions the same?"""
        ks_stat, p_value = stats.ks_2samp(self.bt, self.paper)
        self.results['ks_test'] = {
            'statistic': ks_stat, 'p_value': p_value,
            'reject_H0': p_value < self.alpha,
            'interpretation': (
                'FAIL: Distributions significantly different'
                if p_value < self.alpha
                else 'PASS: Distributions not significantly different'
            )
        }
        return self.results['ks_test']

    def levene_test_variance(self):
        """Levene test: are return variances the same?"""
        stat, p_value = stats.levene(self.bt, self.paper)
        self.results['levene_test'] = {
            'statistic': stat, 'p_value': p_value,
            'reject_H0': p_value < self.alpha,
            'interpretation': (
                'FAIL: Variances significantly different'
                if p_value < self.alpha
                else 'PASS: Variances not significantly different'
            )
        }
        return self.results['levene_test']

    def sharpe_ratio_test(self, risk_free_rate=0.065/252):
        """Test if paper Sharpe is consistent with backtest."""
        bt_sharpe = (np.mean(self.bt) - risk_free_rate) / np.std(self.bt)
        paper_sharpe = (np.mean(self.paper) - risk_free_rate) / np.std(self.paper)
        ann_bt = bt_sharpe * np.sqrt(252)
        ann_paper = paper_sharpe * np.sqrt(252)

        # Jobson-Korkie test for Sharpe ratio equality
        n = min(len(self.bt), len(self.paper))
        se_diff = np.sqrt(
            (2 / n) * (1 - np.corrcoef(
                self.bt[:n], self.paper[:n]
            )[0, 1]) + (1 / (2 * n)) * (
                bt_sharpe**2 + paper_sharpe**2
                - 2 * bt_sharpe * paper_sharpe
            )
        )
        z_stat = (bt_sharpe - paper_sharpe) / max(se_diff, 1e-10)
        p_value = 2 * (1 - stats.norm.cdf(abs(z_stat)))

        self.results['sharpe_test'] = {
            'bt_sharpe_ann': ann_bt,
            'paper_sharpe_ann': ann_paper,
            'sharpe_decay_pct': (ann_bt - ann_paper) / ann_bt * 100,
            'z_statistic': z_stat, 'p_value': p_value,
            'reject_H0': p_value < self.alpha,
            'interpretation': (
                'FAIL: Sharpe ratios significantly different'
                if p_value < self.alpha
                else 'PASS: Sharpe ratios not significantly different'
            )
        }
        return self.results['sharpe_test']

    def drawdown_test(self):
        """Compare maximum drawdown distributions."""
        def max_dd(returns, n_windows=50):
            equity = np.cumprod(1 + returns)
            dds = []
            window = len(returns) // n_windows
            for i in range(n_windows):
                chunk = equity[i*window:(i+1)*window]
                peak = np.maximum.accumulate(chunk)
                dd = (chunk - peak) / peak
                dds.append(dd.min())
            return np.array(dds)

        bt_dds = max_dd(self.bt)
        paper_dds = max_dd(self.paper)
        stat, p_value = stats.mannwhitneyu(
            bt_dds, paper_dds, alternative='two-sided'
        )
        self.results['drawdown_test'] = {
            'bt_mean_dd': np.mean(bt_dds) * 100,
            'paper_mean_dd': np.mean(paper_dds) * 100,
            'statistic': stat, 'p_value': p_value,
            'reject_H0': p_value < self.alpha,
        }
        return self.results['drawdown_test']

    def run_all(self):
        self.t_test_returns()
        self.ks_test_distribution()
        self.levene_test_variance()
        self.sharpe_ratio_test()
        self.drawdown_test()
        return self.results

# Simulate NSE Nifty 50 strategy results
np.random.seed(42)
n_bt, n_paper = 500, 200

# Backtest: slightly higher returns (overfit)
bt_returns = np.random.normal(0.0008, 0.012, n_bt)
# Paper: more realistic with slippage drag
paper_returns = np.random.normal(0.0005, 0.013, n_paper)

validator = StrategyValidator(bt_returns, paper_returns)
results = validator.run_all()

print("=" * 55)
print("  STATISTICAL VALIDATION: Backtest vs Paper Trading")
print("  Strategy: Nifty 50 Mean-Reversion | NSE")
print("=" * 55)

for test_name, result in results.items():
    print(f"\\n--- {test_name.upper()} ---")
    for key, val in result.items():
        if isinstance(val, float):
            print(f"  {key}: {val:.4f}")
        else:
            print(f"  {key}: {val}")

# Overall verdict
n_failures = sum(1 for r in results.values() if r.get('reject_H0'))
print(f"\\n{'='*55}")
print(f"OVERALL: {n_failures}/{len(results)} tests failed")
if n_failures <= 1:
    print("VERDICT: Strategy PASSES validation -> ready for live")
elif n_failures <= 2:
    print("VERDICT: Strategy needs INVESTIGATION -> check failures")
else:
    print("VERDICT: Strategy FAILS validation -> do NOT deploy")`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Sequential Testing for Continuous Monitoring"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Rather than waiting for a fixed number of trades, sequential testing allows us to make go/no-go decisions as paper trading data accumulates. The Sequential Probability Ratio Test (SPRT) is ideal for this:"}),e.jsx(i.BlockMath,{math:"\\Lambda_n = \\sum_{i=1}^{n} \\log \\frac{f(r_i | H_1)}{f(r_i | H_0)}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Decision boundaries for SPRT are set at:"}),e.jsx(i.BlockMath,{math:"\\text{Accept } H_0: \\Lambda_n \\leq \\log\\frac{\\beta}{1-\\alpha}, \\quad \\text{Reject } H_0: \\Lambda_n \\geq \\log\\frac{1-\\beta}{\\alpha}"}),e.jsx(k,{title:"sequential_testing.py",runnable:!0,code:`import numpy as np

class SequentialValidator:
    """SPRT-based sequential validation for paper trading."""

    def __init__(self, mu_0=0.0, mu_1=0.0005, sigma=0.012,
                 alpha=0.05, beta=0.10):
        """
        mu_0: mean return under H0 (strategy has no edge)
        mu_1: mean return under H1 (strategy has edge)
        sigma: assumed return std dev
        alpha: Type I error rate
        beta: Type II error rate
        """
        self.mu_0 = mu_0
        self.mu_1 = mu_1
        self.sigma = sigma
        self.lower = np.log(beta / (1 - alpha))
        self.upper = np.log((1 - beta) / alpha)
        self.log_lr = 0.0
        self.n = 0
        self.history = []

    def update(self, return_val):
        """Process a new trade return."""
        self.n += 1
        # Log likelihood ratio for normal distributions
        lr = ((return_val - self.mu_0)**2 -
              (return_val - self.mu_1)**2) / (2 * self.sigma**2)
        self.log_lr += lr
        self.history.append(self.log_lr)

        if self.log_lr >= self.upper:
            return 'ACCEPT_H1'  # Strategy has edge
        elif self.log_lr <= self.lower:
            return 'ACCEPT_H0'  # Strategy has no edge
        return 'CONTINUE'

# Simulate sequential testing on paper trades
np.random.seed(42)
validator = SequentialValidator(
    mu_0=0.0,        # No edge
    mu_1=0.0004,     # Expected edge: 4 bps/trade
    sigma=0.012,     # Typical NSE daily vol
    alpha=0.05,
    beta=0.10
)

# Paper trading returns (strategy has a small edge)
paper_returns = np.random.normal(0.0003, 0.012, 500)

print("=== Sequential Validation (SPRT) ===")
print(f"H0: mu = {validator.mu_0} (no edge)")
print(f"H1: mu = {validator.mu_1} (strategy has edge)")
print(f"Lower boundary: {validator.lower:.4f}")
print(f"Upper boundary: {validator.upper:.4f}")
print()

decision = 'CONTINUE'
for i, r in enumerate(paper_returns):
    decision = validator.update(r)
    if (i + 1) % 50 == 0 or decision != 'CONTINUE':
        print(f"Trade {i+1:4d}: LLR = {validator.log_lr:+.4f}  "
              f"Status: {decision}")
    if decision != 'CONTINUE':
        break

print(f"\\nFinal decision after {validator.n} trades: {decision}")
if decision == 'ACCEPT_H1':
    print("Strategy shows statistically significant edge!")
    print("Recommendation: Proceed to live deployment on NSE")
elif decision == 'ACCEPT_H0':
    print("Strategy shows no significant edge.")
    print("Recommendation: Revisit strategy design")
else:
    print("Inconclusive after all trades. Need more data.")`}),e.jsx(S,{title:"Power Analysis for Paper Trading Duration",difficulty:"advanced",problem:"A Bank Nifty options strategy has expected per-trade return of 0.3% with std dev 2.5%. At 5% significance level with 80% power, how many trades are needed to detect the edge? With 5 trades/day on NSE, how many months of paper trading?",solution:[{step:"Set up the power equation",formula:"n = \\left(\\frac{z_{\\alpha/2} + z_{\\beta}}{\\mu/\\sigma}\\right)^2",explanation:"Using the standard sample size formula for a one-sample t-test detecting a mean different from zero."},{step:"Plug in values",formula:"n = \\left(\\frac{1.96 + 0.842}{0.003/0.025}\\right)^2 = \\left(\\frac{2.802}{0.12}\\right)^2"},{step:"Calculate",formula:"n = (23.35)^2 = 545.2 \\approx 546 \\text{ trades}"},{step:"Convert to calendar time",formula:"\\frac{546}{5 \\times 22} = \\frac{546}{110} \\approx 5.0 \\text{ months}",explanation:"With 5 trades per day and approximately 22 NSE trading days per month, you need about 5 months of paper trading to achieve 80% power to detect a 0.3% per-trade edge."}]}),e.jsxs(b,{title:"Practical Considerations for Indian Markets",type:"warning",children:[e.jsx("p",{children:"Statistical tests assume i.i.d. returns, but NSE/BSE returns exhibit autocorrelation, heteroskedasticity, and regime shifts. Adjustments to consider:"}),e.jsxs("ul",{className:"mt-2 list-disc list-inside space-y-1",children:[e.jsx("li",{children:"Use Newey-West standard errors to account for serial correlation"}),e.jsx("li",{children:"Stratify tests by market regime (trending vs mean-reverting)"}),e.jsx("li",{children:"Exclude NSE circuit breaker days and F&O expiry dates"}),e.jsx("li",{children:"Apply block bootstrap instead of standard t-tests for robustness"}),e.jsx("li",{children:"Test during budget week and RBI policy announcement periods separately"})]})]}),e.jsx(b,{title:"Key Takeaway",type:"tip",children:e.jsx("p",{children:"Never deploy a strategy live on NSE based solely on backtest results. Apply a rigorous battery of statistical tests -- t-tests, KS tests, Sharpe ratio tests, and sequential testing -- to validate that paper trading performance is consistent with backtest expectations. Use power analysis to determine the minimum paper trading duration, and continuously monitor using SPRT for early detection of strategy failure."})})]})}const ie=Object.freeze(Object.defineProperty({__proto__:null,default:q},Symbol.toStringTag,{value:"Module"}));function M(){const[r,y]=n.useState(5),[t,h]=n.useState(15),[s,g]=n.useState(3),[a,p]=n.useState(10),[o,d]=n.useState(50),m=r+t+s+a+o,f=m<200;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: End-to-End Latency Calculator"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Model the tick-to-trade latency for your NSE trading system. Each component contributes to the total order execution time."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-5",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Data (ms): ",r]}),e.jsx("input",{type:"range",min:"1",max:"50",step:"1",value:r,onChange:l=>y(parseInt(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Signal (ms): ",t]}),e.jsx("input",{type:"range",min:"1",max:"100",step:"1",value:t,onChange:l=>h(parseInt(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Risk (ms): ",s]}),e.jsx("input",{type:"range",min:"1",max:"20",step:"1",value:s,onChange:l=>g(parseInt(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Order Gen (ms): ",a]}),e.jsx("input",{type:"range",min:"1",max:"50",step:"1",value:a,onChange:l=>p(parseInt(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Broker API (ms): ",o]}),e.jsx("input",{type:"range",min:"10",max:"500",step:"5",value:o,onChange:l=>d(parseInt(l.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsx("svg",{viewBox:"0 0 600 120",className:"w-full max-w-2xl mx-auto block","aria-label":"Latency pipeline",children:[{label:"Data",lat:r,color:"#3b82f6",x:0},{label:"Signal",lat:t,color:"#8b5cf6",x:120},{label:"Risk",lat:s,color:"#ef4444",x:240},{label:"Order",lat:a,color:"#f59e0b",x:360},{label:"Broker",lat:o,color:"#10b981",x:480}].map((l,u)=>{const c=Math.max(10,Math.min(80,l.lat*1.2));return e.jsxs("g",{children:[e.jsx("rect",{x:l.x+10,y:90-c,width:"90",height:c,rx:"4",fill:l.color,opacity:"0.7"}),e.jsxs("text",{x:l.x+55,y:100-c-5,textAnchor:"middle",className:"text-[10px] font-bold",fill:l.color,children:[l.lat,"ms"]}),e.jsx("text",{x:l.x+55,y:110,textAnchor:"middle",className:"text-[10px]",fill:"#6b7280",children:l.label})]},u)})}),e.jsxs("p",{className:"mt-3 text-center text-sm",children:[e.jsx("span",{className:"text-gray-600 dark:text-gray-400",children:"Total tick-to-trade: "}),e.jsxs("span",{className:`font-bold ${f?"text-green-600":"text-red-600"}`,children:[m,"ms"]}),f?e.jsx("span",{className:"text-green-600",children:" -- Acceptable for NSE intraday"}):e.jsx("span",{className:"text-red-600",children:" -- Too slow for NSE intraday strategies"})]})]})}function B(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Production System Design for Indian Markets"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"A production trading system for NSE/BSE must balance low latency, high reliability, and regulatory compliance. This section covers the architecture patterns used by professional quantitative trading firms in India, from data ingestion to order execution."}),e.jsx(j,{title:"Trading System Architecture",label:"Definition 18.4",definition:"A production trading system is a real-time software system that ingests market data, computes trading signals, performs risk checks, and manages order execution. For Indian markets, this must operate within NSE trading hours (9:15 AM -- 3:30 PM IST), handle T+1 settlement, and comply with SEBI regulations on automated trading.",notation:"Key metrics: tick-to-trade latency, system uptime (target 99.99%), and order accuracy rate."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Architecture Overview"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"A well-designed trading system for Indian markets follows a modular, event-driven architecture. Each component communicates through message queues, ensuring loose coupling and fault isolation."}),e.jsx("div",{className:"my-6 flex justify-center",children:e.jsxs("svg",{viewBox:"0 0 640 380",className:"w-full max-w-2xl","aria-label":"Production trading system architecture",children:[e.jsx("defs",{children:e.jsx("marker",{id:"archArrow",markerWidth:"8",markerHeight:"6",refX:"8",refY:"3",orient:"auto",children:e.jsx("polygon",{points:"0 0, 8 3, 0 6",fill:"#6366f1"})})}),e.jsx("rect",{x:"20",y:"20",width:"600",height:"70",rx:"8",fill:"#f0f9ff",stroke:"#0ea5e9",strokeWidth:"1.5",strokeDasharray:"4"}),e.jsx("text",{x:"30",y:"40",className:"text-[11px] font-bold",fill:"#0369a1",children:"Market Data Layer"}),e.jsx("rect",{x:"40",y:"50",width:"100",height:"30",rx:"4",fill:"#e0f2fe",stroke:"#0ea5e9",strokeWidth:"1"}),e.jsx("text",{x:"90",y:"70",textAnchor:"middle",className:"text-[9px]",fill:"#0369a1",children:"NSE WebSocket"}),e.jsx("rect",{x:"160",y:"50",width:"100",height:"30",rx:"4",fill:"#e0f2fe",stroke:"#0ea5e9",strokeWidth:"1"}),e.jsx("text",{x:"210",y:"70",textAnchor:"middle",className:"text-[9px]",fill:"#0369a1",children:"BSE Feed"}),e.jsx("rect",{x:"280",y:"50",width:"100",height:"30",rx:"4",fill:"#e0f2fe",stroke:"#0ea5e9",strokeWidth:"1"}),e.jsx("text",{x:"330",y:"70",textAnchor:"middle",className:"text-[9px]",fill:"#0369a1",children:"News/Sentiment"}),e.jsx("rect",{x:"400",y:"50",width:"100",height:"30",rx:"4",fill:"#e0f2fe",stroke:"#0ea5e9",strokeWidth:"1"}),e.jsx("text",{x:"450",y:"70",textAnchor:"middle",className:"text-[9px]",fill:"#0369a1",children:"F&O Data"}),e.jsx("rect",{x:"520",y:"50",width:"90",height:"30",rx:"4",fill:"#e0f2fe",stroke:"#0ea5e9",strokeWidth:"1"}),e.jsx("text",{x:"565",y:"70",textAnchor:"middle",className:"text-[9px]",fill:"#0369a1",children:"Index Data"}),e.jsx("line",{x1:"320",y1:"90",x2:"320",y2:"115",stroke:"#6366f1",strokeWidth:"2",markerEnd:"url(#archArrow)"}),e.jsx("rect",{x:"120",y:"120",width:"400",height:"60",rx:"8",fill:"#f5f3ff",stroke:"#8b5cf6",strokeWidth:"1.5"}),e.jsx("text",{x:"130",y:"140",className:"text-[11px] font-bold",fill:"#6d28d9",children:"Signal Generation Engine"}),e.jsx("text",{x:"130",y:"160",className:"text-[9px]",fill:"#7c3aed",children:"Alpha models | Feature pipelines | ML inference"}),e.jsx("line",{x1:"320",y1:"180",x2:"320",y2:"205",stroke:"#6366f1",strokeWidth:"2",markerEnd:"url(#archArrow)"}),e.jsx("rect",{x:"40",y:"210",width:"180",height:"60",rx:"8",fill:"#fef2f2",stroke:"#ef4444",strokeWidth:"1.5"}),e.jsx("text",{x:"50",y:"233",className:"text-[11px] font-bold",fill:"#b91c1c",children:"Risk Engine"}),e.jsx("text",{x:"50",y:"253",className:"text-[9px]",fill:"#dc2626",children:"Position limits | Exposure | VaR"}),e.jsx("rect",{x:"240",y:"210",width:"160",height:"60",rx:"8",fill:"#fef3c7",stroke:"#f59e0b",strokeWidth:"1.5"}),e.jsx("text",{x:"250",y:"233",className:"text-[11px] font-bold",fill:"#b45309",children:"Order Management"}),e.jsx("text",{x:"250",y:"253",className:"text-[9px]",fill:"#d97706",children:"Smart routing | SOR | Queuing"}),e.jsx("rect",{x:"420",y:"210",width:"190",height:"60",rx:"8",fill:"#dcfce7",stroke:"#22c55e",strokeWidth:"1.5"}),e.jsx("text",{x:"430",y:"233",className:"text-[11px] font-bold",fill:"#15803d",children:"Execution Engine"}),e.jsx("text",{x:"430",y:"253",className:"text-[9px]",fill:"#16a34a",children:"Zerodha | Angel | Direct NSE"}),e.jsx("line",{x1:"220",y1:"240",x2:"238",y2:"240",stroke:"#ef4444",strokeWidth:"1.5",markerEnd:"url(#archArrow)"}),e.jsx("line",{x1:"400",y1:"240",x2:"418",y2:"240",stroke:"#f59e0b",strokeWidth:"1.5",markerEnd:"url(#archArrow)"}),e.jsx("rect",{x:"40",y:"300",width:"260",height:"55",rx:"8",fill:"#f0fdf4",stroke:"#22c55e",strokeWidth:"1.5",strokeDasharray:"4"}),e.jsx("text",{x:"50",y:"322",className:"text-[11px] font-bold",fill:"#15803d",children:"Database & Analytics"}),e.jsx("text",{x:"50",y:"340",className:"text-[9px]",fill:"#16a34a",children:"TimescaleDB | Redis | Trade logs | P&L"}),e.jsx("rect",{x:"320",y:"300",width:"290",height:"55",rx:"8",fill:"#fce7f3",stroke:"#ec4899",strokeWidth:"1.5",strokeDasharray:"4"}),e.jsx("text",{x:"330",y:"322",className:"text-[11px] font-bold",fill:"#be185d",children:"Monitoring & Alerts"}),e.jsx("text",{x:"330",y:"340",className:"text-[9px]",fill:"#ec4899",children:"Grafana | PagerDuty | SEBI compliance"}),e.jsx("line",{x1:"170",y1:"270",x2:"170",y2:"298",stroke:"#22c55e",strokeWidth:"1.5",markerEnd:"url(#archArrow)"}),e.jsx("line",{x1:"465",y1:"270",x2:"465",y2:"298",stroke:"#ec4899",strokeWidth:"1.5",markerEnd:"url(#archArrow)"})]})}),e.jsx(M,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Latency Budget Analysis"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["For NSE intraday strategies, tick-to-trade latency must be carefully budgeted. The total latency ",e.jsx(i.InlineMath,{math:"L"})," is the sum of all pipeline components:"]}),e.jsx(i.BlockMath,{math:"L_{\\text{total}} = L_{\\text{data}} + L_{\\text{signal}} + L_{\\text{risk}} + L_{\\text{order}} + L_{\\text{broker}}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The opportunity cost of latency can be modeled as:"}),e.jsx(i.BlockMath,{math:"C_{\\text{latency}} = \\sigma_{\\text{tick}} \\cdot \\sqrt{L / \\Delta t} \\cdot Q"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(i.InlineMath,{math:"\\sigma_{\\text{tick}}"})," is the tick-level volatility,"," ",e.jsx(i.InlineMath,{math:"L"})," is the latency in the same units as the tick interval"," ",e.jsx(i.InlineMath,{math:"\\Delta t"}),", and ",e.jsx(i.InlineMath,{math:"Q"})," is the order quantity."]}),e.jsx(v,{title:"Optimal System Allocation",label:"Theorem 18.4",statement:"For a fixed compute budget, the optimal allocation between signal computation and execution speed follows: $\\frac{\\partial \\text{Sharpe}}{\\partial L_{\\text{signal}}} = \\frac{\\partial \\text{Sharpe}}{\\partial L_{\\text{execution}}}$ at the optimum. For most NSE strategies with Kite API, the signal generation bottleneck dominates when $L_{\\text{signal}} > 50\\text{ms}$, while execution speed dominates when $L_{\\text{broker}} > 200\\text{ms}$.",proof:"Consider the decomposition of strategy Sharpe into signal quality (improving with computation time) and execution quality (degrading with latency). At the optimum, the marginal improvement from better signals equals the marginal cost of slower execution. For Kite API with ~50ms baseline latency, strategies with sub-second holding periods are execution-bound, while strategies with minutes-to-hours holding periods are signal-bound."}),e.jsx(k,{title:"system_architecture.py",runnable:!0,code:`import numpy as np
from dataclasses import dataclass, field
from typing import Dict, List, Optional
from datetime import datetime, time
import json

@dataclass
class SystemConfig:
    """Configuration for production trading system."""
    # Market settings
    exchange: str = 'NSE'
    market_open: str = '09:15'
    market_close: str = '15:30'
    pre_open_start: str = '09:00'

    # Broker settings
    broker: str = 'zerodha'
    api_key: str = ''
    max_orders_per_second: int = 10
    max_positions: int = 50

    # Risk settings
    max_portfolio_exposure: float = 0.8  # 80% of capital
    max_single_stock_pct: float = 0.1    # 10% per stock
    max_sector_pct: float = 0.3          # 30% per sector
    max_daily_loss_pct: float = 0.02     # 2% daily stop
    var_limit_pct: float = 0.05          # 5% VaR limit

    # System settings
    heartbeat_interval: int = 5  # seconds
    failover_timeout: int = 30   # seconds

class HealthMonitor:
    """Monitor system component health."""

    def __init__(self):
        self.components = {}
        self.alerts = []

    def register(self, name: str, check_fn):
        self.components[name] = {
            'check': check_fn,
            'status': 'UNKNOWN',
            'last_check': None
        }

    def check_all(self):
        results = {}
        for name, comp in self.components.items():
            try:
                status = comp['check']()
                comp['status'] = 'HEALTHY' if status else 'DEGRADED'
            except Exception as e:
                comp['status'] = 'UNHEALTHY'
                self.alerts.append(f"{name}: {str(e)}")
            comp['last_check'] = datetime.now()
            results[name] = comp['status']
        return results

class TradingSystem:
    """Production trading system for Indian markets."""

    def __init__(self, config: SystemConfig):
        self.config = config
        self.is_running = False
        self.positions: Dict[str, dict] = {}
        self.orders: List[dict] = []
        self.daily_pnl = 0.0
        self.capital = 0.0
        self.health = HealthMonitor()

    def pre_market_checks(self) -> Dict[str, bool]:
        """Run pre-market system checks before 9:15 AM."""
        checks = {
            'broker_connection': True,
            'market_data_feed': True,
            'risk_engine': True,
            'database': True,
            'sufficient_margins': True,
            'position_reconciliation': True,
            'circuit_breaker_check': True,
            'holiday_calendar': self._check_trading_day(),
            'strategy_parameters_loaded': True,
            'monitoring_active': True,
        }
        return checks

    def _check_trading_day(self) -> bool:
        """Check NSE holiday calendar."""
        # NSE holidays for 2024
        nse_holidays = [
            '2024-01-26',  # Republic Day
            '2024-03-25',  # Holi
            '2024-03-29',  # Good Friday
            '2024-04-11',  # Eid ul-Fitr
            '2024-04-17',  # Ram Navami
            '2024-08-15',  # Independence Day
            '2024-10-02',  # Mahatma Gandhi Jayanti
            '2024-11-01',  # Diwali (Laxmi Pujan)
            '2024-12-25',  # Christmas
        ]
        today = datetime.now().strftime('%Y-%m-%d')
        return today not in nse_holidays

    def calculate_exposure(self) -> dict:
        """Calculate current portfolio exposure."""
        total_long = sum(
            p['quantity'] * p['current_price']
            for p in self.positions.values()
            if p['quantity'] > 0
        )
        total_short = sum(
            abs(p['quantity']) * p['current_price']
            for p in self.positions.values()
            if p['quantity'] < 0
        )
        gross = total_long + total_short
        net = total_long - total_short
        return {
            'long_exposure': total_long,
            'short_exposure': total_short,
            'gross_exposure': gross,
            'net_exposure': net,
            'gross_pct': gross / max(self.capital, 1),
            'net_pct': net / max(self.capital, 1),
        }

    def risk_check(self, symbol: str, side: str,
                   quantity: int, price: float) -> tuple:
        """Pre-trade risk checks required by SEBI."""
        checks = []
        order_value = quantity * price

        # Check daily loss limit
        if self.daily_pnl < -self.config.max_daily_loss_pct * self.capital:
            checks.append(('DAILY_LOSS_LIMIT', False))
        else:
            checks.append(('DAILY_LOSS_LIMIT', True))

        # Check single stock concentration
        current_pos = self.positions.get(symbol, {}).get('quantity', 0)
        new_pos_value = (current_pos + quantity) * price
        if abs(new_pos_value) > self.config.max_single_stock_pct * self.capital:
            checks.append(('CONCENTRATION_LIMIT', False))
        else:
            checks.append(('CONCENTRATION_LIMIT', True))

        # Check total exposure
        exposure = self.calculate_exposure()
        new_gross = exposure['gross_exposure'] + order_value
        if new_gross > self.config.max_portfolio_exposure * self.capital:
            checks.append(('EXPOSURE_LIMIT', False))
        else:
            checks.append(('EXPOSURE_LIMIT', True))

        # Check order rate limit
        checks.append(('RATE_LIMIT', True))

        all_pass = all(c[1] for c in checks)
        return all_pass, checks

# Demo: System initialization
config = SystemConfig(
    exchange='NSE',
    broker='zerodha',
    max_positions=30,
    max_daily_loss_pct=0.02,
)

system = TradingSystem(config)
system.capital = 5_000_000  # INR 50 Lakh

# Run pre-market checks
checks = system.pre_market_checks()
print("=== Pre-Market System Checks ===")
for check, status in checks.items():
    icon = "PASS" if status else "FAIL"
    print(f"  [{icon}] {check}")

# Simulate risk check for an order
system.positions = {
    'RELIANCE': {'quantity': 100, 'current_price': 2450, 'avg_price': 2400},
    'TCS': {'quantity': 50, 'current_price': 3500, 'avg_price': 3480},
    'HDFCBANK': {'quantity': 200, 'current_price': 1680, 'avg_price': 1650},
}

passed, risk_checks = system.risk_check('INFY', 'BUY', 150, 1450)
print(f"\\n=== Risk Check: BUY 150 INFY @ INR 1,450 ===")
for check_name, status in risk_checks:
    print(f"  [{('PASS' if status else 'FAIL')}] {check_name}")
print(f"  Overall: {'APPROVED' if passed else 'REJECTED'}")

# Exposure analysis
exposure = system.calculate_exposure()
print(f"\\n=== Portfolio Exposure ===")
print(f"  Long:  INR {exposure['long_exposure']:>12,.0f}")
print(f"  Short: INR {exposure['short_exposure']:>12,.0f}")
print(f"  Gross: INR {exposure['gross_exposure']:>12,.0f} ({exposure['gross_pct']:.1%})")
print(f"  Net:   INR {exposure['net_exposure']:>12,.0f} ({exposure['net_pct']:.1%})")`}),e.jsx(S,{title:"Sizing a Production System for NSE",difficulty:"intermediate",problem:"You plan to run 5 strategies simultaneously on NSE, each tracking 50 Nifty stocks with tick-by-tick data. Estimate the data throughput and compute requirements.",solution:[{step:"Estimate tick data rate",formula:"R_{\\text{ticks}} = 50 \\times 3 \\times 5 = 750 \\text{ ticks/sec (avg)}",explanation:"Each Nifty stock generates about 3 ticks/second on average during market hours, monitored by all 5 strategies."},{step:"Peak data rate",formula:"R_{\\text{peak}} \\approx 10 \\times R_{\\text{avg}} = 7500 \\text{ ticks/sec}",explanation:"Peak rates at market open (9:15 AM) and close (3:30 PM) can be 10x the average."},{step:"Compute per tick",formula:"C = 5 \\times 0.5\\text{ms} = 2.5\\text{ms per tick across strategies}",explanation:"Each strategy needs about 0.5ms to process a tick (feature update + signal check)."},{step:"Required throughput",formula:"T = \\frac{7500 \\times 2.5\\text{ms}}{1000\\text{ms}} = 18.75 \\text{ CPU-seconds/wall-second}",explanation:"You need at least 19 CPU cores to handle peak load without queuing. A 32-core server provides 1.7x headroom, which is the minimum recommended margin."}]}),e.jsxs(b,{title:"SEBI Requirements for Automated Trading",type:"warning",children:[e.jsx("p",{children:"SEBI mandates specific requirements for algo trading systems in India:"}),e.jsxs("ul",{className:"mt-2 list-disc list-inside space-y-1",children:[e.jsx("li",{children:"All algo orders must be tagged with a unique algo ID registered with the exchange"}),e.jsx("li",{children:"Maximum order-to-trade ratio limits apply (typically 50:1 for NSE)"}),e.jsx("li",{children:"Kill switch must be available to cancel all pending orders within 1 second"}),e.jsx("li",{children:"Pre-trade risk checks are mandatory (price band, quantity limits, exposure)"}),e.jsx("li",{children:"Audit trail must be maintained for 5 years for SEBI inspection"}),e.jsx("li",{children:"Two-factor authentication required for API access to broker platforms"})]})]}),e.jsx(b,{title:"Key Takeaway",type:"tip",children:e.jsxs("p",{children:["A production trading system for Indian markets is an ",e.jsx("strong",{children:"engineering challenge"})," ","as much as a quantitative one. The architecture must handle NSE microstructure (pre-open auctions, circuit breakers, T+1 settlement), broker API limitations (rate limits, latency), and SEBI compliance requirements. Start with a modular, event-driven design that separates signal generation, risk management, and execution into independent components."]})})]})}const le=Object.freeze(Object.defineProperty({__proto__:null,default:B},Symbol.toStringTag,{value:"Module"}));function F(){const[r,y]=n.useState(200),[t,h]=n.useState(5e4),[s,g]=n.useState("equity_intraday"),a={brokerage:s==="equity_delivery"?0:Math.min(20,t*3e-4)*r,stt:s==="equity_delivery"?t*.001*r:t*25e-5*r*.5,apiCost:2e3},p={brokerage:s==="equity_delivery"?0:20*r,stt:a.stt,apiCost:0};return a.total=a.brokerage+a.stt+a.apiCost,p.total=p.brokerage+p.stt+p.apiCost,e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Broker Cost Comparison"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Compare monthly costs between Zerodha Kite and Angel One SmartAPI for your trading strategy."}),e.jsxs("div",{className:"mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Monthly Orders: ",r]}),e.jsx("input",{type:"range",min:"10",max:"2000",step:"10",value:r,onChange:o=>y(parseInt(o.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Avg Order Value: INR ",(t/1e3).toFixed(0),"K"]}),e.jsx("input",{type:"range",min:"5000",max:"500000",step:"5000",value:t,onChange:o=>h(parseInt(o.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsx("span",{children:"Segment"}),e.jsxs("select",{value:s,onChange:o=>g(o.target.value),className:"rounded border p-1 text-xs dark:bg-gray-800 dark:border-gray-600",children:[e.jsx("option",{value:"equity_delivery",children:"Equity Delivery"}),e.jsx("option",{value:"equity_intraday",children:"Equity Intraday"}),e.jsx("option",{value:"futures",children:"F&O Futures"}),e.jsx("option",{value:"options",children:"F&O Options"})]})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{className:"rounded-lg border border-blue-200 bg-blue-50 p-4 dark:bg-blue-900/20 dark:border-blue-800",children:[e.jsx("h4",{className:"text-sm font-bold text-blue-800 dark:text-blue-300",children:"Zerodha Kite"}),e.jsxs("div",{className:"mt-2 space-y-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"Brokerage:"}),e.jsxs("span",{children:["INR ",a.brokerage.toFixed(0)]})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"STT (est):"}),e.jsxs("span",{children:["INR ",a.stt.toFixed(0)]})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"API Cost:"}),e.jsxs("span",{children:["INR ",a.apiCost]})]}),e.jsxs("div",{className:"flex justify-between border-t pt-1 font-bold",children:[e.jsx("span",{children:"Total:"}),e.jsxs("span",{children:["INR ",a.total.toFixed(0)]})]})]})]}),e.jsxs("div",{className:"rounded-lg border border-orange-200 bg-orange-50 p-4 dark:bg-orange-900/20 dark:border-orange-800",children:[e.jsx("h4",{className:"text-sm font-bold text-orange-800 dark:text-orange-300",children:"Angel One SmartAPI"}),e.jsxs("div",{className:"mt-2 space-y-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"Brokerage:"}),e.jsxs("span",{children:["INR ",p.brokerage.toFixed(0)]})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"STT (est):"}),e.jsxs("span",{children:["INR ",p.stt.toFixed(0)]})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"API Cost:"}),e.jsxs("span",{children:["INR ",p.apiCost]})]}),e.jsxs("div",{className:"flex justify-between border-t pt-1 font-bold",children:[e.jsx("span",{children:"Total:"}),e.jsxs("span",{children:["INR ",p.total.toFixed(0)]})]})]})]})]})]})}function $(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Zerodha Kite and Angel One SmartAPI Integration"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Indian retail quant traders primarily use two broker APIs: Zerodha Kite Connect and Angel One SmartAPI. Both provide programmatic access to NSE and BSE for equity, F&O, and commodity trading. This section covers integration patterns, error handling, and best practices for building robust broker connections."}),e.jsx(j,{title:"Broker API",label:"Definition 18.5",definition:"A Broker API is a programmatic interface provided by a stock broker that enables automated order placement, portfolio management, and market data access. In India, Zerodha Kite Connect and Angel One SmartAPI are the most widely used APIs for algorithmic trading on NSE/BSE.",notation:"Both APIs use REST for order management and WebSocket for real-time tick data streaming."}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Feature"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Zerodha Kite"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Angel One SmartAPI"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"API Cost"}),e.jsx("td",{className:"px-4 py-2",children:"INR 2,000/month"}),e.jsx("td",{className:"px-4 py-2",children:"Free"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Rate Limit"}),e.jsx("td",{className:"px-4 py-2",children:"10 req/sec"}),e.jsx("td",{className:"px-4 py-2",children:"10 req/sec"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"WebSocket Instruments"}),e.jsx("td",{className:"px-4 py-2",children:"3000 per connection"}),e.jsx("td",{className:"px-4 py-2",children:"1000 per connection"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Historical Data"}),e.jsx("td",{className:"px-4 py-2",children:"Minute-level, 2000 days"}),e.jsx("td",{className:"px-4 py-2",children:"Minute-level, 2000 days"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Order Types"}),e.jsx("td",{className:"px-4 py-2",children:"MARKET, LIMIT, SL, SL-M"}),e.jsx("td",{className:"px-4 py-2",children:"MARKET, LIMIT, SL, SL-M"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Python SDK"}),e.jsx("td",{className:"px-4 py-2",children:"kiteconnect"}),e.jsx("td",{className:"px-4 py-2",children:"smartapi-python"})]})]})]})}),e.jsx(F,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Zerodha Kite Connect Integration"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Kite Connect is the most popular API for Indian quant trading. It provides REST endpoints for order management and a WebSocket for real-time tick streaming from NSE/BSE."}),e.jsx(k,{title:"zerodha_kite_integration.py",runnable:!0,code:`import json
import time
from datetime import datetime, timedelta
from dataclasses import dataclass
from typing import Optional, Dict, List
from enum import Enum

class OrderType(Enum):
    MARKET = 'MARKET'
    LIMIT = 'LIMIT'
    SL = 'SL'         # Stop Loss
    SL_M = 'SL-M'     # Stop Loss Market

class Exchange(Enum):
    NSE = 'NSE'
    BSE = 'BSE'
    NFO = 'NFO'  # NSE F&O

class TransactionType(Enum):
    BUY = 'BUY'
    SELL = 'SELL'

@dataclass
class KiteOrder:
    """Represents an order in Kite Connect format."""
    tradingsymbol: str
    exchange: str
    transaction_type: str
    quantity: int
    order_type: str
    price: float = 0.0
    trigger_price: float = 0.0
    product: str = 'CNC'  # CNC=delivery, MIS=intraday
    validity: str = 'DAY'
    tag: str = ''
    order_id: Optional[str] = None

class KiteConnectWrapper:
    """Production wrapper for Zerodha Kite Connect API."""

    def __init__(self, api_key: str, access_token: str):
        self.api_key = api_key
        self.access_token = access_token
        self.rate_limit = 10  # requests per second
        self.last_request_time = 0
        self.order_count = 0
        self.max_daily_orders = 200  # Safety limit

    def _rate_limit_check(self):
        """Ensure we don't exceed API rate limits."""
        elapsed = time.time() - self.last_request_time
        if elapsed < 1.0 / self.rate_limit:
            wait = (1.0 / self.rate_limit) - elapsed
            time.sleep(wait)
        self.last_request_time = time.time()

    def _validate_order(self, order: KiteOrder) -> List[str]:
        """Pre-submission order validation."""
        errors = []

        # Check quantity
        if order.quantity <= 0:
            errors.append("Quantity must be positive")
        if order.quantity > 10000:
            errors.append("Quantity exceeds safety limit (10000)")

        # Check price for limit orders
        if order.order_type in ['LIMIT', 'SL']:
            if order.price <= 0:
                errors.append("Price required for LIMIT/SL orders")

        # Check trigger for SL orders
        if order.order_type in ['SL', 'SL-M']:
            if order.trigger_price <= 0:
                errors.append("Trigger price required for SL orders")
            if order.transaction_type == 'BUY':
                if order.trigger_price < order.price:
                    errors.append("Buy SL: trigger >= price")
            else:
                if order.trigger_price > order.price:
                    errors.append("Sell SL: trigger <= price")

        # Check exchange
        if order.exchange not in ['NSE', 'BSE', 'NFO', 'MCX']:
            errors.append(f"Invalid exchange: {order.exchange}")

        # Check daily order limit
        if self.order_count >= self.max_daily_orders:
            errors.append("Daily order limit reached")

        return errors

    def place_order(self, order: KiteOrder) -> dict:
        """Place order with validation and error handling."""
        # Validate
        errors = self._validate_order(order)
        if errors:
            return {'status': 'REJECTED', 'errors': errors}

        # Rate limit
        self._rate_limit_check()

        # Simulate API call
        self.order_count += 1
        order.order_id = f"KT{datetime.now().strftime('%Y%m%d')}{self.order_count:06d}"

        return {
            'status': 'PLACED',
            'order_id': order.order_id,
            'exchange': order.exchange,
            'symbol': order.tradingsymbol,
            'type': order.order_type,
            'quantity': order.quantity,
            'price': order.price,
            'timestamp': datetime.now().isoformat(),
        }

    def place_bracket_order(self, symbol: str, side: str,
                            qty: int, price: float,
                            stoploss: float, target: float,
                            trailing_sl: float = 0) -> dict:
        """Place a bracket order (entry + SL + target)."""
        self._rate_limit_check()
        self.order_count += 1
        order_id = f"BO{datetime.now().strftime('%Y%m%d')}{self.order_count:06d}"
        return {
            'status': 'PLACED',
            'order_id': order_id,
            'type': 'BRACKET',
            'entry_price': price,
            'stoploss': stoploss,
            'target': target,
            'trailing_sl': trailing_sl,
        }

    def get_positions(self) -> dict:
        """Get current positions."""
        return {
            'net': [
                {'symbol': 'RELIANCE', 'exchange': 'NSE',
                 'quantity': 100, 'avg_price': 2450,
                 'pnl': 1500, 'product': 'CNC'},
                {'symbol': 'TCS', 'exchange': 'NSE',
                 'quantity': 50, 'avg_price': 3500,
                 'pnl': -800, 'product': 'CNC'},
            ]
        }

# Demo: Kite Connect workflow
kite = KiteConnectWrapper(api_key='demo_key', access_token='demo_token')

# Place a limit order for INFY on NSE
order = KiteOrder(
    tradingsymbol='INFY',
    exchange='NSE',
    transaction_type='BUY',
    quantity=100,
    order_type='LIMIT',
    price=1450.0,
    product='CNC',
    tag='MOMENTUM_V2'
)

result = kite.place_order(order)
print("=== Zerodha Kite Order Placement ===")
for key, val in result.items():
    print(f"  {key}: {val}")

# Place a bracket order for Bank Nifty options
bo = kite.place_bracket_order(
    symbol='BANKNIFTY24MAR48000CE',
    side='BUY', qty=25, price=250.0,
    stoploss=50.0, target=100.0, trailing_sl=20.0
)
print(f"\\n=== Bracket Order ===")
for key, val in bo.items():
    print(f"  {key}: {val}")

# Test order validation
bad_order = KiteOrder(
    tradingsymbol='RELIANCE', exchange='NSE',
    transaction_type='BUY', quantity=-10,
    order_type='LIMIT', price=0
)
bad_result = kite.place_order(bad_order)
print(f"\\n=== Invalid Order ===")
print(f"  Status: {bad_result['status']}")
for err in bad_result.get('errors', []):
    print(f"  Error: {err}")`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Angel One SmartAPI Integration"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Angel One SmartAPI offers free API access, making it popular for retail quant traders with lower trading volumes. The integration pattern is similar to Kite but with some key differences in authentication and data format."}),e.jsx(k,{title:"angel_smartapi_integration.py",runnable:!0,code:`from datetime import datetime
from dataclasses import dataclass
from typing import Optional, List

@dataclass
class SmartAPIOrder:
    """Angel One SmartAPI order format."""
    variety: str = 'NORMAL'  # NORMAL, STOPLOSS, AMO
    tradingsymbol: str = ''
    symboltoken: str = ''
    transactiontype: str = 'BUY'
    exchange: str = 'NSE'
    ordertype: str = 'LIMIT'
    producttype: str = 'DELIVERY'  # DELIVERY, INTRADAY, CARRYFORWARD
    duration: str = 'DAY'
    price: float = 0.0
    squareoff: float = 0.0
    stoploss: float = 0.0
    quantity: int = 0

class SmartAPIWrapper:
    """Production wrapper for Angel One SmartAPI."""

    def __init__(self, api_key: str, client_id: str,
                 password: str, totp_secret: str):
        self.api_key = api_key
        self.client_id = client_id
        self.authenticated = False
        self.jwt_token = None
        self.refresh_token = None
        self.order_count = 0

    def authenticate(self) -> bool:
        """Two-factor authentication with TOTP."""
        # In production: generate TOTP, call login API
        self.authenticated = True
        self.jwt_token = 'simulated_jwt_token'
        self.refresh_token = 'simulated_refresh'
        return True

    def _validate_order(self, order: SmartAPIOrder) -> List[str]:
        """Validate order before submission."""
        errors = []
        if not self.authenticated:
            errors.append("Not authenticated")
        if order.quantity <= 0:
            errors.append("Invalid quantity")
        if order.ordertype == 'LIMIT' and order.price <= 0:
            errors.append("Price required for LIMIT")
        if not order.symboltoken:
            errors.append("Symbol token required")
        return errors

    def place_order(self, order: SmartAPIOrder) -> dict:
        """Place order via SmartAPI."""
        errors = self._validate_order(order)
        if errors:
            return {'status': 'rejected', 'errors': errors}

        self.order_count += 1
        return {
            'status': 'success',
            'orderid': f"AG{datetime.now().strftime('%Y%m%d')}{self.order_count:06d}",
            'symbol': order.tradingsymbol,
            'exchange': order.exchange,
            'type': order.ordertype,
            'quantity': order.quantity,
            'price': order.price,
        }

    def get_ltp(self, exchange: str, symbol: str,
                token: str) -> dict:
        """Get last traded price."""
        # Simulated prices for Nifty 50 stocks
        prices = {
            'RELIANCE': 2455.30, 'TCS': 3512.50,
            'HDFCBANK': 1685.20, 'INFY': 1448.75,
            'ICICIBANK': 1025.60, 'SBIN': 628.40,
        }
        return {
            'exchange': exchange,
            'tradingsymbol': symbol,
            'ltp': prices.get(symbol, 0),
        }

class UnifiedBrokerInterface:
    """Unified interface supporting multiple Indian brokers."""

    def __init__(self, broker: str, credentials: dict):
        self.broker = broker
        if broker == 'zerodha':
            self.client = KiteConnectWrapper(
                credentials.get('api_key', ''),
                credentials.get('access_token', '')
            )
        elif broker == 'angel':
            self.client = SmartAPIWrapper(
                credentials.get('api_key', ''),
                credentials.get('client_id', ''),
                credentials.get('password', ''),
                credentials.get('totp_secret', '')
            )

    def place_order(self, symbol: str, exchange: str,
                    side: str, qty: int, order_type: str,
                    price: float = 0, **kwargs) -> dict:
        """Unified order placement across brokers."""
        if self.broker == 'zerodha':
            order = KiteOrder(
                tradingsymbol=symbol, exchange=exchange,
                transaction_type=side, quantity=qty,
                order_type=order_type, price=price,
            )
            return self.client.place_order(order)
        elif self.broker == 'angel':
            order = SmartAPIOrder(
                tradingsymbol=symbol, exchange=exchange,
                transactiontype=side, quantity=qty,
                ordertype=order_type, price=price,
                symboltoken=kwargs.get('token', '2885'),
            )
            return self.client.place_order(order)

# Demo: Unified broker interface
print("=== Unified Broker Interface Demo ===\\n")

# Zerodha
zerodha = UnifiedBrokerInterface('zerodha', {
    'api_key': 'demo', 'access_token': 'demo'
})
z_result = zerodha.place_order(
    'SBIN', 'NSE', 'BUY', 200, 'LIMIT', price=625.0
)
print("Zerodha Order:")
for k, v in z_result.items():
    print(f"  {k}: {v}")

# Angel One
angel = UnifiedBrokerInterface('angel', {
    'api_key': 'demo', 'client_id': 'demo',
    'password': 'demo', 'totp_secret': 'demo'
})
angel.client.authenticate()
a_result = angel.place_order(
    'SBIN', 'NSE', 'BUY', 200, 'LIMIT',
    price=625.0, token='3045'
)
print("\\nAngel One Order:")
for k, v in a_result.items():
    print(f"  {k}: {v}")`}),e.jsx(v,{title:"Optimal Broker Selection Criterion",label:"Theorem 18.5",statement:"For a strategy with $N$ monthly orders of average size $V$, the optimal broker minimizes total cost: $C^* = \\arg\\min_{b \\in \\text{Brokers}} \\left[ C_{\\text{brokerage}}^b(N, V) + C_{\\text{API}}^b + C_{\\text{slippage}}^b(L_b) \\right]$ where $L_b$ is the broker-specific latency. For most retail quant strategies on NSE with $N < 500$ and $V < \\text{INR } 1\\text{L}$, Angel One dominates due to zero API cost. For $N > 1000$ or latency-sensitive strategies, Zerodha Kite is preferred.",proof:"The proof follows from comparing the cost functions. Zerodha charges INR 2,000/month API fee but has lower average latency (50ms vs 80ms for Angel). The latency cost is $C_{\\text{slippage}} \\propto \\sigma \\sqrt{L}$, which becomes significant only for high-frequency strategies."}),e.jsx(S,{title:"WebSocket Integration for Live Data",difficulty:"intermediate",problem:"You need to subscribe to real-time ticks for all Nifty 50 stocks using Zerodha Kite WebSocket. The pre-open session starts at 9:00 AM and main trading at 9:15 AM. Design the connection and reconnection logic.",solution:[{step:"Initialize WebSocket at 8:55 AM",formula:"t_{\\text{init}} = 09\\!:\\!00 - 5\\text{min buffer}",explanation:"Start the WebSocket connection 5 minutes before pre-open to ensure data capture from the first tick."},{step:"Subscribe to instrument tokens",formula:"N_{\\text{tokens}} = 50 \\text{ (Nifty 50 components)}",explanation:"Each NSE instrument has a unique token. Subscribe in full mode for LTP, volume, bid/ask, and OHLC data."},{step:"Implement heartbeat and reconnection",formula:"t_{\\text{heartbeat}} = 5\\text{s}, \\; t_{\\text{reconnect}} = \\min(2^n, 60)\\text{s}",explanation:"Send ping every 5 seconds. On disconnect, use exponential backoff starting at 1s up to 60s maximum."},{step:"Handle circuit breaker events",formula:"\\text{If } |\\Delta p| > 5\\% \\Rightarrow \\text{flag circuit breaker}",explanation:"NSE pauses trading when a stock hits 5/10/20% circuit limits. Your handler must detect this from the tick stream and pause order generation."}]}),e.jsxs(b,{title:"Production Error Handling",type:"warning",children:[e.jsx("p",{children:"Common failure modes when integrating with Indian broker APIs:"}),e.jsxs("ul",{className:"mt-2 list-disc list-inside space-y-1",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Token expiry:"})," Kite access tokens expire daily at 6 AM; SmartAPI JWT tokens expire in 24 hours. Implement auto-refresh."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Rate limiting:"})," Both APIs enforce 10 req/sec. Use a token bucket or leaky bucket rate limiter."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Network failures:"})," Use exponential backoff with jitter for reconnection."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Order rejection:"})," NSE rejects orders outside price bands. Always check tick data for current bands."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Margin shortfall:"})," Orders rejected for insufficient margin. Implement pre-trade margin checks."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Market status:"})," Handle pre-open, normal, closing, and post-market sessions differently."]})]})]}),e.jsx(b,{title:"Key Takeaway",type:"tip",children:e.jsxs("p",{children:["Broker integration is the critical interface between your strategy and the market. Build a ",e.jsx("strong",{children:"unified broker abstraction"})," that supports multiple Indian brokers (Zerodha, Angel One, Upstox) behind a common interface. This enables broker failover, cost optimization, and easy migration. Always implement comprehensive order validation, rate limiting, and error handling before going live on NSE/BSE."]})})]})}const ne=Object.freeze(Object.defineProperty({__proto__:null,default:$},Symbol.toStringTag,{value:"Module"}));function U(){const[r,y]=n.useState(2),[t,h]=n.useState("medium"),[s,g]=n.useState(100),[a,p]=n.useState(50),d={small:{hourly:.0416,name:"t3.small",vcpu:2,ram:2},medium:{hourly:.0832,name:"t3.medium",vcpu:2,ram:4},large:{hourly:.1664,name:"t3.large",vcpu:2,ram:8},xlarge:{hourly:.3328,name:"c5.xlarge",vcpu:4,ram:8}}[t],m=d.hourly*730*r,f=s*.1,l=a*.09,u=25,N=(m+f+l+u)*83;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: AWS Mumbai Cloud Cost Estimator"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Estimate monthly cloud costs for running a trading system on AWS ap-south-1 (Mumbai)."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Instances: ",r]}),e.jsx("input",{type:"range",min:"1",max:"10",step:"1",value:r,onChange:x=>y(parseInt(x.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Type: ",d.name]}),e.jsxs("select",{value:t,onChange:x=>h(x.target.value),className:"rounded border p-1 text-xs dark:bg-gray-800 dark:border-gray-600",children:[e.jsx("option",{value:"small",children:"t3.small (2GB)"}),e.jsx("option",{value:"medium",children:"t3.medium (4GB)"}),e.jsx("option",{value:"large",children:"t3.large (8GB)"}),e.jsx("option",{value:"xlarge",children:"c5.xlarge (8GB)"})]})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Storage (GB): ",s]}),e.jsx("input",{type:"range",min:"20",max:"1000",step:"10",value:s,onChange:x=>g(parseInt(x.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Bandwidth (GB): ",a]}),e.jsx("input",{type:"range",min:"1",max:"500",step:"5",value:a,onChange:x=>p(parseInt(x.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-3 sm:grid-cols-5 text-center",children:[e.jsxs("div",{className:"rounded-lg bg-blue-50 p-2 dark:bg-blue-900/30",children:[e.jsx("div",{className:"text-[10px] text-gray-500",children:"Compute"}),e.jsxs("div",{className:"text-sm font-bold text-blue-600",children:["$",m.toFixed(0)]})]}),e.jsxs("div",{className:"rounded-lg bg-purple-50 p-2 dark:bg-purple-900/30",children:[e.jsx("div",{className:"text-[10px] text-gray-500",children:"Storage"}),e.jsxs("div",{className:"text-sm font-bold text-purple-600",children:["$",f.toFixed(0)]})]}),e.jsxs("div",{className:"rounded-lg bg-orange-50 p-2 dark:bg-orange-900/30",children:[e.jsx("div",{className:"text-[10px] text-gray-500",children:"Bandwidth"}),e.jsxs("div",{className:"text-sm font-bold text-orange-600",children:["$",l.toFixed(0)]})]}),e.jsxs("div",{className:"rounded-lg bg-green-50 p-2 dark:bg-green-900/30",children:[e.jsx("div",{className:"text-[10px] text-gray-500",children:"Redis Cache"}),e.jsxs("div",{className:"text-sm font-bold text-green-600",children:["$",u]})]}),e.jsxs("div",{className:"rounded-lg bg-red-50 p-2 dark:bg-red-900/30",children:[e.jsx("div",{className:"text-[10px] text-gray-500",children:"Total (INR)"}),e.jsxs("div",{className:"text-sm font-bold text-red-600",children:["INR ",(N/1e3).toFixed(1),"K"]})]})]})]})}function W(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"AWS/GCP Deployment for Indian Trading Systems"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Cloud deployment for Indian trading systems requires careful region selection, latency optimization, and cost management. Both AWS (ap-south-1, Mumbai) and GCP (asia-south1, Mumbai) have data centers in India, providing sub-10ms connectivity to NSE/BSE colocation facilities."}),e.jsx(j,{title:"Cloud-Native Trading Infrastructure",label:"Definition 18.6",definition:"Cloud-native trading infrastructure leverages managed cloud services (compute, storage, messaging, monitoring) to run algorithmic trading systems. For Indian markets, the Mumbai region provides the lowest latency to NSE and BSE exchanges, with typical round-trip times of 5--15ms to broker APIs.",notation:"AWS ap-south-1 (Mumbai) and GCP asia-south1 (Mumbai) are the primary choices for Indian quant trading."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Architecture for Cloud Trading"}),e.jsx("div",{className:"my-6 flex justify-center",children:e.jsxs("svg",{viewBox:"0 0 640 320",className:"w-full max-w-2xl","aria-label":"Cloud architecture diagram",children:[e.jsx("defs",{children:e.jsx("marker",{id:"cloudArrow",markerWidth:"8",markerHeight:"6",refX:"8",refY:"3",orient:"auto",children:e.jsx("polygon",{points:"0 0, 8 3, 0 6",fill:"#6366f1"})})}),e.jsx("rect",{x:"10",y:"10",width:"620",height:"300",rx:"12",fill:"none",stroke:"#94a3b8",strokeWidth:"1.5",strokeDasharray:"6"}),e.jsx("text",{x:"30",y:"30",className:"text-[11px] font-bold",fill:"#64748b",children:"AWS VPC (ap-south-1, Mumbai)"}),e.jsx("rect",{x:"30",y:"45",width:"180",height:"120",rx:"8",fill:"#dbeafe",stroke:"#3b82f6",strokeWidth:"1",opacity:"0.5"}),e.jsx("text",{x:"40",y:"62",className:"text-[10px] font-semibold",fill:"#1d4ed8",children:"Public Subnet"}),e.jsx("rect",{x:"45",y:"72",width:"150",height:"35",rx:"4",fill:"#eff6ff",stroke:"#3b82f6",strokeWidth:"1"}),e.jsx("text",{x:"120",y:"94",textAnchor:"middle",className:"text-[9px] font-medium",fill:"#1d4ed8",children:"API Gateway + ALB"}),e.jsx("rect",{x:"45",y:"115",width:"150",height:"35",rx:"4",fill:"#eff6ff",stroke:"#3b82f6",strokeWidth:"1"}),e.jsx("text",{x:"120",y:"137",textAnchor:"middle",className:"text-[9px] font-medium",fill:"#1d4ed8",children:"Monitoring Dashboard"}),e.jsx("rect",{x:"230",y:"45",width:"200",height:"120",rx:"8",fill:"#f5f3ff",stroke:"#8b5cf6",strokeWidth:"1",opacity:"0.5"}),e.jsx("text",{x:"240",y:"62",className:"text-[10px] font-semibold",fill:"#6d28d9",children:"Private Subnet (Compute)"}),e.jsx("rect",{x:"245",y:"72",width:"80",height:"35",rx:"4",fill:"#faf5ff",stroke:"#8b5cf6",strokeWidth:"1"}),e.jsx("text",{x:"285",y:"94",textAnchor:"middle",className:"text-[9px]",fill:"#6d28d9",children:"Signal Gen"}),e.jsx("rect",{x:"335",y:"72",width:"80",height:"35",rx:"4",fill:"#faf5ff",stroke:"#8b5cf6",strokeWidth:"1"}),e.jsx("text",{x:"375",y:"94",textAnchor:"middle",className:"text-[9px]",fill:"#6d28d9",children:"Risk Engine"}),e.jsx("rect",{x:"245",y:"115",width:"80",height:"35",rx:"4",fill:"#faf5ff",stroke:"#8b5cf6",strokeWidth:"1"}),e.jsx("text",{x:"285",y:"137",textAnchor:"middle",className:"text-[9px]",fill:"#6d28d9",children:"OMS"}),e.jsx("rect",{x:"335",y:"115",width:"80",height:"35",rx:"4",fill:"#faf5ff",stroke:"#8b5cf6",strokeWidth:"1"}),e.jsx("text",{x:"375",y:"137",textAnchor:"middle",className:"text-[9px]",fill:"#6d28d9",children:"Execution"}),e.jsx("rect",{x:"450",y:"45",width:"170",height:"120",rx:"8",fill:"#dcfce7",stroke:"#22c55e",strokeWidth:"1",opacity:"0.5"}),e.jsx("text",{x:"460",y:"62",className:"text-[10px] font-semibold",fill:"#15803d",children:"Private Subnet (Data)"}),e.jsx("rect",{x:"465",y:"72",width:"140",height:"35",rx:"4",fill:"#f0fdf4",stroke:"#22c55e",strokeWidth:"1"}),e.jsx("text",{x:"535",y:"94",textAnchor:"middle",className:"text-[9px]",fill:"#15803d",children:"TimescaleDB (RDS)"}),e.jsx("rect",{x:"465",y:"115",width:"140",height:"35",rx:"4",fill:"#f0fdf4",stroke:"#22c55e",strokeWidth:"1"}),e.jsx("text",{x:"535",y:"137",textAnchor:"middle",className:"text-[9px]",fill:"#15803d",children:"ElastiCache (Redis)"}),e.jsx("rect",{x:"30",y:"200",width:"140",height:"50",rx:"8",fill:"#fef3c7",stroke:"#f59e0b",strokeWidth:"1.5"}),e.jsx("text",{x:"100",y:"222",textAnchor:"middle",className:"text-[10px] font-bold",fill:"#b45309",children:"NSE/BSE"}),e.jsx("text",{x:"100",y:"238",textAnchor:"middle",className:"text-[9px]",fill:"#d97706",children:"Exchange"}),e.jsx("rect",{x:"190",y:"200",width:"140",height:"50",rx:"8",fill:"#fce7f3",stroke:"#ec4899",strokeWidth:"1.5"}),e.jsx("text",{x:"260",y:"222",textAnchor:"middle",className:"text-[10px] font-bold",fill:"#be185d",children:"Zerodha API"}),e.jsx("text",{x:"260",y:"238",textAnchor:"middle",className:"text-[9px]",fill:"#ec4899",children:"Kite Connect"}),e.jsx("rect",{x:"350",y:"200",width:"140",height:"50",rx:"8",fill:"#e0f2fe",stroke:"#0ea5e9",strokeWidth:"1.5"}),e.jsx("text",{x:"420",y:"222",textAnchor:"middle",className:"text-[10px] font-bold",fill:"#0369a1",children:"CloudWatch"}),e.jsx("text",{x:"420",y:"238",textAnchor:"middle",className:"text-[9px]",fill:"#0ea5e9",children:"Monitoring"}),e.jsx("rect",{x:"510",y:"200",width:"110",height:"50",rx:"8",fill:"#fef2f2",stroke:"#ef4444",strokeWidth:"1.5"}),e.jsx("text",{x:"565",y:"222",textAnchor:"middle",className:"text-[10px] font-bold",fill:"#b91c1c",children:"SNS/SES"}),e.jsx("text",{x:"565",y:"238",textAnchor:"middle",className:"text-[9px]",fill:"#ef4444",children:"Alerts"}),e.jsx("line",{x1:"100",y1:"200",x2:"285",y2:"165",stroke:"#f59e0b",strokeWidth:"1.5",markerEnd:"url(#cloudArrow)"}),e.jsx("line",{x1:"260",y1:"200",x2:"375",y2:"152",stroke:"#ec4899",strokeWidth:"1.5",markerEnd:"url(#cloudArrow)"}),e.jsx("text",{x:"320",y:"290",textAnchor:"middle",className:"text-[11px]",fill:"#6b7280",children:"Estimated latency to NSE: 5-15ms from AWS Mumbai"})]})}),e.jsx(U,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Latency Optimization"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Network latency from AWS Mumbai to NSE can be modeled as:"}),e.jsx(i.BlockMath,{math:"L_{\\text{network}} = L_{\\text{propagation}} + L_{\\text{serialization}} + L_{\\text{queuing}} + L_{\\text{processing}}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"For a typical Zerodha Kite API call from AWS ap-south-1:"}),e.jsx(i.BlockMath,{math:"L_{\\text{total}} \\approx 2\\text{ms} + 1\\text{ms} + 3\\text{ms} + 5\\text{ms} = 11\\text{ms}"}),e.jsx(v,{title:"Cloud vs Colocation Cost-Benefit",label:"Theorem 18.6",statement:"For a strategy with annualized Sharpe $S$ and latency sensitivity $\\lambda$ (bps/ms), the breakeven infrastructure cost is: $C_{\\text{max}} = S \\cdot \\sigma \\cdot \\text{AUM} \\cdot \\lambda \\cdot \\Delta L / \\sqrt{252}$ where $\\Delta L$ is the latency improvement from colocation. For retail Indian quant traders with AUM < INR 5 Cr, cloud deployment is optimal when $\\lambda < 0.1$ bps/ms.",proof:"The value of latency reduction is proportional to the Sharpe ratio (more signals exploited) and the strategy's latency sensitivity. NSE colocation costs approximately INR 50L/year, while cloud costs INR 3-5L/year. The crossover occurs at AUM of approximately INR 20-50 Cr depending on strategy frequency."}),e.jsx(k,{title:"cloud_deployment_config.py",runnable:!0,code:`import json
from dataclasses import dataclass, asdict
from typing import List, Dict

@dataclass
class AWSConfig:
    """AWS deployment configuration for Indian trading."""
    region: str = 'ap-south-1'  # Mumbai
    availability_zones: List[str] = None

    # EC2 instances
    trading_instance: str = 'c5.xlarge'
    trading_count: int = 2
    monitoring_instance: str = 't3.medium'

    # Database
    db_engine: str = 'timescaledb'
    db_instance: str = 'db.r5.large'
    db_storage_gb: int = 200

    # Cache
    cache_engine: str = 'redis'
    cache_instance: str = 'cache.r5.large'

    # Network
    vpc_cidr: str = '10.0.0.0/16'
    use_placement_group: bool = True

    def __post_init__(self):
        if self.availability_zones is None:
            self.availability_zones = [
                'ap-south-1a', 'ap-south-1b'
            ]

@dataclass
class DeploymentSpec:
    """Complete deployment specification."""
    name: str
    environment: str  # 'paper', 'live'
    aws: AWSConfig = None

    def __post_init__(self):
        if self.aws is None:
            self.aws = AWSConfig()

    def estimate_monthly_cost(self) -> dict:
        """Estimate monthly AWS costs in USD."""
        # EC2 pricing (ap-south-1, on-demand)
        ec2_prices = {
            't3.small': 0.0208, 't3.medium': 0.0416,
            't3.large': 0.0832, 'c5.xlarge': 0.17,
            'c5.2xlarge': 0.34, 'm5.xlarge': 0.192,
        }
        # RDS pricing
        rds_prices = {
            'db.t3.medium': 0.068, 'db.r5.large': 0.24,
            'db.r5.xlarge': 0.48,
        }
        # ElastiCache pricing
        cache_prices = {
            'cache.t3.medium': 0.068, 'cache.r5.large': 0.228,
        }

        hours = 730  # hours/month
        compute = (
            ec2_prices.get(self.aws.trading_instance, 0.17)
            * hours * self.aws.trading_count
        )
        monitoring = (
            ec2_prices.get(self.aws.monitoring_instance, 0.04)
            * hours
        )
        database = (
            rds_prices.get(self.aws.db_instance, 0.24) * hours
            + self.aws.db_storage_gb * 0.115
        )
        cache = (
            cache_prices.get(self.aws.cache_instance, 0.228)
            * hours
        )

        # Other services
        cloudwatch = 15  # logs + metrics
        sns_alerts = 5
        s3_backup = 10
        data_transfer = 20

        total = (compute + monitoring + database + cache
                 + cloudwatch + sns_alerts + s3_backup
                 + data_transfer)

        return {
            'compute_ec2': compute,
            'monitoring': monitoring,
            'database_rds': database,
            'cache_redis': cache,
            'cloudwatch': cloudwatch,
            'sns_alerts': sns_alerts,
            's3_backup': s3_backup,
            'data_transfer': data_transfer,
            'total_usd': total,
            'total_inr': total * 83,
        }

    def generate_docker_compose(self) -> str:
        """Generate docker-compose for local testing."""
        return """version: '3.8'
services:
  trading-engine:
    build: ./trading
    environment:
      - BROKER=zerodha
      - EXCHANGE=NSE
      - MODE=paper
      - REDIS_URL=redis://cache:6379
      - DB_URL=postgresql://db:5432/trades
    depends_on:
      - cache
      - db
    restart: always

  signal-generator:
    build: ./signals
    environment:
      - REDIS_URL=redis://cache:6379
    depends_on:
      - cache
    restart: always

  risk-engine:
    build: ./risk
    environment:
      - MAX_EXPOSURE=0.8
      - MAX_DAILY_LOSS=0.02
      - REDIS_URL=redis://cache:6379
    depends_on:
      - cache
    restart: always

  cache:
    image: redis:7-alpine
    ports: ["6379:6379"]

  db:
    image: timescale/timescaledb:latest-pg15
    environment:
      - POSTGRES_DB=trades
      - POSTGRES_PASSWORD=secure_password
    volumes:
      - db_data:/var/lib/postgresql/data
    ports: ["5432:5432"]

  grafana:
    image: grafana/grafana:latest
    ports: ["3000:3000"]
    depends_on:
      - db

volumes:
  db_data:"""

# Create deployment spec
spec = DeploymentSpec(
    name='nifty-momentum-v2',
    environment='paper',
    aws=AWSConfig(
        trading_instance='c5.xlarge',
        trading_count=2,
        db_storage_gb=200,
    )
)

# Estimate costs
costs = spec.estimate_monthly_cost()
print("=== AWS Mumbai Deployment Cost Estimate ===")
print(f"Strategy: {spec.name}")
print(f"Environment: {spec.environment}")
print(f"Region: {spec.aws.region}\\n")

for key, val in costs.items():
    if key.startswith('total'):
        print(f"{'─' * 40}")
        if 'inr' in key:
            print(f"  {key:20s}: INR {val:>10,.0f}")
        else:
            print(f"  {key:20s}: \${val:>10,.2f}")
    else:
        print(f"  {key:20s}: \${val:>10,.2f}")

# Show Docker compose
print(f"\\n=== Docker Compose (Local Testing) ===")
print(spec.generate_docker_compose()[:500] + "...")`}),e.jsx(S,{title:"Disaster Recovery Planning",difficulty:"advanced",problem:"Your trading system runs on 2 EC2 instances in AWS ap-south-1a. Design a disaster recovery plan that ensures positions are safe during an AZ outage at 2 PM IST (during NSE trading hours).",solution:[{step:"Multi-AZ deployment",formula:"P(\\text{AZ failure}) \\approx 0.01\\% \\text{ per year}",explanation:"Deploy identical instances in ap-south-1a and ap-south-1b. Use an ALB to route traffic to the healthy AZ."},{step:"Position state replication",formula:"RPO \\leq 1\\text{s}, \\; RTO \\leq 30\\text{s}",explanation:"Recovery Point Objective (RPO) of 1 second ensures no more than 1 second of position state is lost. Recovery Time Objective (RTO) of 30 seconds means the standby instance takes over within 30 seconds."},{step:"Failover procedure",formula:"\\text{Failover: } t_{\\text{detect}} + t_{\\text{switch}} + t_{\\text{verify}} \\leq 30\\text{s}",explanation:"On AZ failure: (1) heartbeat detection in 5s, (2) DNS failover in 10s, (3) position reconciliation in 15s. During failover, the risk engine blocks new orders as a safety measure."},{step:"Position safety",formula:"\\text{Open positions hedged by SL orders on exchange}",explanation:"All open positions must have stop-loss orders placed directly on NSE (not managed locally). This ensures positions are protected even if both AZs fail simultaneously."}]}),e.jsxs(b,{title:"Cost Optimization Tips",type:"tip",children:[e.jsx("p",{children:"Reduce cloud costs for Indian trading systems:"}),e.jsxs("ul",{className:"mt-2 list-disc list-inside space-y-1",children:[e.jsxs("li",{children:["Use ",e.jsx("strong",{children:"Spot Instances"})," for backtesting and research (70% cheaper)"]}),e.jsxs("li",{children:["Use ",e.jsx("strong",{children:"Reserved Instances"})," for trading servers (40% cheaper for 1-year commitment)"]}),e.jsx("li",{children:"Run trading instances only during market hours (9:00 AM -- 4:00 PM IST) to save 60%"}),e.jsxs("li",{children:["Use ",e.jsx("strong",{children:"S3 Intelligent-Tiering"})," for historical market data storage"]}),e.jsxs("li",{children:["Implement ",e.jsx("strong",{children:"auto-scaling"})," for signal computation during high-volatility periods"]}),e.jsxs("li",{children:["Consider ",e.jsx("strong",{children:"AWS Graviton"})," instances for 20% cost reduction on compute"]})]})]}),e.jsx(b,{title:"Key Takeaway",type:"tip",children:e.jsxs("p",{children:["Cloud deployment on AWS Mumbai or GCP Mumbai provides the ideal balance of"," ",e.jsx("strong",{children:"latency, reliability, and cost"})," for retail quant trading on NSE/BSE. Start with a Docker-based local setup, graduate to a single EC2 instance for paper trading, and scale to multi-AZ production for live trading. Monthly costs for a production-grade setup range from INR 15,000--50,000 depending on instance sizes and data storage requirements."]})})]})}const oe=Object.freeze(Object.defineProperty({__proto__:null,default:W},Symbol.toStringTag,{value:"Module"}));function K(){const[r,y]=n.useState(.5),[t,h]=n.useState(15e3),[s,g]=n.useState(65),[a,p]=n.useState(12),o=s<80&&t>-5e4;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Real-Time P&L Dashboard"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Simulate a live trading dashboard monitoring your NSE portfolio performance."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Nifty 50 Change (%): ",r.toFixed(1)]}),e.jsx("input",{type:"range",min:"-5",max:"5",step:"0.1",value:r,onChange:d=>y(parseFloat(d.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Portfolio P&L: INR ",(t/1e3).toFixed(1),"K"]}),e.jsx("input",{type:"range",min:"-100000",max:"100000",step:"1000",value:t,onChange:d=>h(parseInt(d.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Exposure (%): ",s]}),e.jsx("input",{type:"range",min:"0",max:"100",step:"1",value:s,onChange:d=>g(parseInt(d.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Open Positions: ",a]}),e.jsx("input",{type:"range",min:"0",max:"50",step:"1",value:a,onChange:d=>p(parseInt(d.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-3 sm:grid-cols-5 text-center",children:[e.jsxs("div",{className:`rounded-lg p-3 ${t>=0?"bg-green-50 dark:bg-green-900/30":"bg-red-50 dark:bg-red-900/30"}`,children:[e.jsx("div",{className:"text-[10px] text-gray-500",children:"Day P&L"}),e.jsxs("div",{className:`text-lg font-bold ${t>=0?"text-green-600":"text-red-600"}`,children:[t>=0?"+":"","INR ",(t/1e3).toFixed(1),"K"]})]}),e.jsxs("div",{className:"rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30",children:[e.jsx("div",{className:"text-[10px] text-gray-500",children:"Nifty 50"}),e.jsxs("div",{className:`text-lg font-bold ${r>=0?"text-green-600":"text-red-600"}`,children:[r>=0?"+":"",r.toFixed(1),"%"]})]}),e.jsxs("div",{className:`rounded-lg p-3 ${s>80?"bg-red-50 dark:bg-red-900/30":"bg-purple-50 dark:bg-purple-900/30"}`,children:[e.jsx("div",{className:"text-[10px] text-gray-500",children:"Exposure"}),e.jsxs("div",{className:`text-lg font-bold ${s>80?"text-red-600":"text-purple-600"}`,children:[s,"%"]})]}),e.jsxs("div",{className:"rounded-lg bg-orange-50 p-3 dark:bg-orange-900/30",children:[e.jsx("div",{className:"text-[10px] text-gray-500",children:"Positions"}),e.jsx("div",{className:"text-lg font-bold text-orange-600",children:a})]}),e.jsxs("div",{className:`rounded-lg p-3 ${o?"bg-green-50 dark:bg-green-900/30":"bg-red-50 dark:bg-red-900/30"}`,children:[e.jsx("div",{className:"text-[10px] text-gray-500",children:"System Health"}),e.jsx("div",{className:`text-lg font-bold ${o?"text-green-600":"text-red-600"}`,children:o?"HEALTHY":"ALERT"})]})]})]})}function G(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Real-Time P&L Dashboards"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Real-time monitoring is the nervous system of a live trading operation. For strategies trading on NSE, continuous P&L tracking, exposure monitoring, and system health checks are essential for risk management and regulatory compliance (SEBI mandates real-time monitoring for all algo trading systems)."}),e.jsx(j,{title:"Real-Time P&L Attribution",label:"Definition 18.7",definition:"Real-time P&L attribution decomposes the portfolio profit and loss into contributions from individual positions, market factors, and strategy alpha. For a portfolio with N positions, the instantaneous P&L is: sum of (quantity_i x delta_price_i) for each position i, computed tick-by-tick during NSE trading hours.",notation:"P&L is tracked in INR with attribution to: alpha (signal-driven), beta (market exposure), sector, and individual stock contributions."}),e.jsx(i.BlockMath,{math:"\\text{PnL}(t) = \\sum_{i=1}^{N} q_i \\cdot (p_i(t) - p_i(t_{\\text{entry}})) - \\sum_{j} C_j"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(i.InlineMath,{math:"q_i"})," is the position quantity, ",e.jsx(i.InlineMath,{math:"p_i(t)"})," ","is the current NSE price, ",e.jsx(i.InlineMath,{math:"p_i(t_{\\text{entry}})"})," is the entry price, and ",e.jsx(i.InlineMath,{math:"C_j"})," are all transaction costs (brokerage, STT, GST, stamp duty)."]}),e.jsx(K,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"P&L Attribution Framework"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"A proper attribution decomposes P&L into systematic and idiosyncratic components using factor models:"}),e.jsx(i.BlockMath,{math:"\\text{PnL} = \\underbrace{\\beta_M \\cdot R_{\\text{Nifty}}}_{\\text{Market}} + \\underbrace{\\sum_k \\beta_k \\cdot R_k}_{\\text{Sector/Factor}} + \\underbrace{\\alpha}_{\\text{Strategy Alpha}} + \\underbrace{\\epsilon}_{\\text{Residual}}"}),e.jsx(v,{title:"Real-Time Sharpe Estimation",label:"Theorem 18.7",statement:"The intraday rolling Sharpe ratio at time $t$ over the past $w$ observations is: $\\hat{S}(t) = \\frac{\\bar{r}_w(t)}{\\hat{\\sigma}_w(t)} \\cdot \\sqrt{252 \\cdot N_{\\text{daily}}}$ where $N_{\\text{daily}}$ is the number of return observations per day. For monitoring purposes, a 20-day rolling Sharpe with exponential weighting provides the best tradeoff between responsiveness and stability.",proof:"The annualization factor converts per-observation Sharpe to annual. With 375 minutes per NSE trading day and minute-level returns, $N_{\\text{daily}} = 375$. The rolling window $w$ should be at least 100 observations for statistical stability, corresponding to approximately 20 trading days."}),e.jsx(k,{title:"realtime_monitor.py",runnable:!0,code:`import numpy as np
from datetime import datetime, time, timedelta
from dataclasses import dataclass, field
from typing import Dict, List, Optional

@dataclass
class PositionSnapshot:
    symbol: str
    quantity: int
    avg_price: float
    current_price: float
    sector: str = ''

    @property
    def unrealized_pnl(self) -> float:
        return self.quantity * (self.current_price - self.avg_price)

    @property
    def market_value(self) -> float:
        return abs(self.quantity * self.current_price)

class RealTimeMonitor:
    """Real-time P&L and risk monitoring for NSE trading."""

    def __init__(self, initial_capital: float):
        self.capital = initial_capital
        self.positions: Dict[str, PositionSnapshot] = {}
        self.pnl_history: List[float] = []
        self.alerts: List[dict] = []

        # Alert thresholds
        self.max_daily_loss = initial_capital * 0.02  # 2%
        self.max_drawdown = initial_capital * 0.05    # 5%
        self.max_exposure = 0.80                       # 80%
        self.max_concentration = 0.15                  # 15%

    def update_price(self, symbol: str, price: float):
        """Update position with new NSE tick."""
        if symbol in self.positions:
            self.positions[symbol].current_price = price

    def get_portfolio_pnl(self) -> dict:
        """Calculate real-time portfolio P&L."""
        total_pnl = sum(
            p.unrealized_pnl for p in self.positions.values()
        )
        gross_exposure = sum(
            p.market_value for p in self.positions.values()
        )
        long_exposure = sum(
            p.market_value for p in self.positions.values()
            if p.quantity > 0
        )
        short_exposure = sum(
            p.market_value for p in self.positions.values()
            if p.quantity < 0
        )

        # Sector attribution
        sector_pnl = {}
        for p in self.positions.values():
            sector = p.sector or 'Unknown'
            sector_pnl[sector] = sector_pnl.get(sector, 0) + p.unrealized_pnl

        # Top winners and losers
        sorted_pos = sorted(
            self.positions.values(),
            key=lambda p: p.unrealized_pnl
        )

        return {
            'total_pnl': total_pnl,
            'pnl_pct': total_pnl / self.capital * 100,
            'gross_exposure': gross_exposure,
            'exposure_pct': gross_exposure / self.capital * 100,
            'long_exposure': long_exposure,
            'short_exposure': short_exposure,
            'n_positions': len(self.positions),
            'sector_attribution': sector_pnl,
            'top_winner': sorted_pos[-1].symbol if sorted_pos else None,
            'top_loser': sorted_pos[0].symbol if sorted_pos else None,
        }

    def check_alerts(self) -> List[dict]:
        """Run all alert checks."""
        alerts = []
        pnl = self.get_portfolio_pnl()

        # Daily loss check
        if pnl['total_pnl'] < -self.max_daily_loss:
            alerts.append({
                'level': 'CRITICAL',
                'type': 'DAILY_LOSS_BREACH',
                'message': f"Daily loss INR {pnl['total_pnl']:,.0f} exceeds limit",
                'action': 'FLATTEN_ALL_POSITIONS',
            })

        # Exposure check
        if pnl['exposure_pct'] > self.max_exposure * 100:
            alerts.append({
                'level': 'WARNING',
                'type': 'EXPOSURE_BREACH',
                'message': f"Exposure {pnl['exposure_pct']:.1f}% exceeds {self.max_exposure*100}%",
                'action': 'REDUCE_POSITIONS',
            })

        # Concentration check
        for p in self.positions.values():
            conc = p.market_value / self.capital
            if conc > self.max_concentration:
                alerts.append({
                    'level': 'WARNING',
                    'type': 'CONCENTRATION',
                    'message': f"{p.symbol} concentration {conc:.1%} exceeds limit",
                    'action': 'REDUCE_POSITION',
                })

        return alerts

    def generate_report(self) -> str:
        """Generate real-time status report."""
        pnl = self.get_portfolio_pnl()
        alerts = self.check_alerts()

        lines = [
            "=" * 50,
            f"  REAL-TIME TRADING MONITOR",
            f"  {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} IST",
            "=" * 50,
            f"  Portfolio P&L:  INR {pnl['total_pnl']:>12,.0f} ({pnl['pnl_pct']:+.2f}%)",
            f"  Gross Exposure: INR {pnl['gross_exposure']:>12,.0f} ({pnl['exposure_pct']:.1f}%)",
            f"  Long:           INR {pnl['long_exposure']:>12,.0f}",
            f"  Short:          INR {pnl['short_exposure']:>12,.0f}",
            f"  Positions:      {pnl['n_positions']}",
            "",
            "  --- Sector Attribution ---",
        ]
        for sector, spnl in sorted(
            pnl['sector_attribution'].items(),
            key=lambda x: x[1], reverse=True
        ):
            lines.append(f"    {sector:15s}: INR {spnl:>10,.0f}")

        if alerts:
            lines.extend(["", "  --- ALERTS ---"])
            for a in alerts:
                lines.append(f"  [{a['level']}] {a['message']}")

        return "\\n".join(lines)

# Demo: simulate live monitoring
monitor = RealTimeMonitor(initial_capital=5_000_000)

# Add positions (Nifty 50 stocks)
positions_data = [
    ('RELIANCE', 100, 2420, 2455, 'Energy'),
    ('TCS', 50, 3480, 3512, 'IT'),
    ('HDFCBANK', 200, 1660, 1685, 'Banking'),
    ('INFY', 150, 1430, 1449, 'IT'),
    ('ICICIBANK', 300, 1010, 1026, 'Banking'),
    ('ITC', 500, 435, 440, 'FMCG'),
    ('SBIN', -200, 635, 628, 'Banking'),
    ('BHARTIARTL', 100, 1160, 1180, 'Telecom'),
    ('HINDUNILVR', -50, 2600, 2580, 'FMCG'),
    ('KOTAKBANK', 100, 1760, 1782, 'Banking'),
]

for sym, qty, avg, curr, sector in positions_data:
    monitor.positions[sym] = PositionSnapshot(
        symbol=sym, quantity=qty,
        avg_price=avg, current_price=curr,
        sector=sector
    )

# Generate and print report
report = monitor.generate_report()
print(report)

# Check individual position P&L
print("\\n  --- Position Details ---")
for sym, pos in sorted(
    monitor.positions.items(),
    key=lambda x: x[1].unrealized_pnl, reverse=True
):
    print(f"    {sym:12s}: {pos.quantity:>5d} x INR {pos.current_price:>8.2f}"
          f"  P&L: INR {pos.unrealized_pnl:>10,.0f}")`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Dashboard Metrics for NSE Trading"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"A production monitoring dashboard should display these metrics in real-time, refreshed every second during NSE trading hours:"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Metric"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Update Freq"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Alert Threshold"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Total P&L"}),e.jsx("td",{className:"px-4 py-2",children:"Tick-level"}),e.jsx("td",{className:"px-4 py-2",children:"> 2% daily loss"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Gross Exposure"}),e.jsx("td",{className:"px-4 py-2",children:"1 second"}),e.jsx("td",{className:"px-4 py-2",children:"> 80% of capital"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Rolling Sharpe"}),e.jsx("td",{className:"px-4 py-2",children:"1 minute"}),e.jsx("td",{className:"px-4 py-2",children:"< 0.5 (20-day)"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Max Drawdown"}),e.jsx("td",{className:"px-4 py-2",children:"1 minute"}),e.jsx("td",{className:"px-4 py-2",children:"> 5% from peak"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Order Fill Rate"}),e.jsx("td",{className:"px-4 py-2",children:"Per order"}),e.jsx("td",{className:"px-4 py-2",children:"< 90%"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"System Latency"}),e.jsx("td",{className:"px-4 py-2",children:"Per tick"}),e.jsx("td",{className:"px-4 py-2",children:"> 200ms p99"})]})]})]})}),e.jsx(S,{title:"Setting Up Grafana for NSE Trading",difficulty:"intermediate",problem:"You need to create a Grafana dashboard that shows real-time P&L for your Nifty 50 strategy. The data is stored in TimescaleDB with 1-second granularity. Design the key panels and queries.",solution:[{step:"P&L time series panel",formula:"\\text{SELECT time, cumulative\\_pnl FROM trades\\_pnl WHERE time > now() - 1d}",explanation:"A line chart showing cumulative P&L throughout the trading day with markers for each trade execution."},{step:"Exposure gauge panel",formula:"\\text{exposure}(t) = \\frac{\\sum |q_i \\cdot p_i(t)|}{\\text{capital}} \\times 100",explanation:"A gauge showing current gross exposure as a percentage of capital, with color zones: green (<60%), yellow (60-80%), red (>80%)."},{step:"Position heatmap",formula:"\\text{PnL}_i = q_i \\cdot (p_i(t) - p_{i,\\text{entry}})",explanation:"A treemap or heatmap showing each position colored by its P&L contribution, sized by market value. Groups by sector (Banking, IT, FMCG, etc.)."},{step:"Alert configuration",formula:"\\text{IF } \\text{PnL} < -0.02 \\times \\text{capital THEN alert}",explanation:"Configure Grafana alerts to send notifications via Telegram/Slack when daily loss exceeds 2% of capital."}]}),e.jsx(b,{title:"Key Takeaway",type:"tip",children:e.jsxs("p",{children:["Real-time monitoring is not optional for live trading on NSE -- it is a"," ",e.jsx("strong",{children:"regulatory requirement and a risk management necessity"}),". Build dashboards that provide instant visibility into P&L, exposure, drawdown, and system health. Use Grafana with TimescaleDB for visualization, and configure automated alerts for critical thresholds. Every second of delayed awareness during a market crash can cost thousands of rupees."]})})]})}const de=Object.freeze(Object.defineProperty({__proto__:null,default:G},Symbol.toStringTag,{value:"Module"}));function H(){const[r,y]=n.useState(1.5),[t,h]=n.useState(20),[s,g]=n.useState(92),[a,p]=n.useState(150),o={dd:2,sharpe:30,fill:85,latency:200},d={dd:5,sharpe:50,fill:70,latency:500},m=(_,w,I,A=!1)=>A?_<I?"RED":_<w?"YELLOW":"GREEN":_>I?"RED":_>w?"YELLOW":"GREEN",f=m(r,o.dd,d.dd),l=m(t,o.sharpe,d.sharpe),u=m(s,o.fill,d.fill,!0),c=m(a,o.latency,d.latency),N=[f,l,u,c].filter(_=>_==="RED").length,x=N>=2?"HALT TRADING":N===1?"REDUCE SIZE":"NORMAL",E={GREEN:"text-green-600",YELLOW:"text-yellow-600",RED:"text-red-600"},T={GREEN:"bg-green-50 dark:bg-green-900/30",YELLOW:"bg-yellow-50 dark:bg-yellow-900/30",RED:"bg-red-50 dark:bg-red-900/30"};return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Strategy Circuit Breaker Dashboard"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Adjust metrics to see when circuit breakers trigger. GREEN = normal, YELLOW = warning, RED = halt."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Drawdown (%): ",r.toFixed(1)]}),e.jsx("input",{type:"range",min:"0",max:"10",step:"0.1",value:r,onChange:_=>y(parseFloat(_.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Sharpe Decline (%): ",t]}),e.jsx("input",{type:"range",min:"0",max:"100",step:"1",value:t,onChange:_=>h(parseInt(_.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Fill Rate (%): ",s]}),e.jsx("input",{type:"range",min:"50",max:"100",step:"1",value:s,onChange:_=>g(parseInt(_.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Latency p99 (ms): ",a]}),e.jsx("input",{type:"range",min:"10",max:"1000",step:"10",value:a,onChange:_=>p(parseInt(_.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsx("div",{className:"grid grid-cols-5 gap-2 text-center",children:[{label:"Drawdown",status:f,val:`${r.toFixed(1)}%`},{label:"Sharpe",status:l,val:`${t}%`},{label:"Fill Rate",status:u,val:`${s}%`},{label:"Latency",status:c,val:`${a}ms`},{label:"ACTION",status:N>=2?"RED":N===1?"YELLOW":"GREEN",val:x}].map((_,w)=>e.jsxs("div",{className:`rounded-lg p-2 ${T[_.status]}`,children:[e.jsx("div",{className:"text-[10px] text-gray-500",children:_.label}),e.jsx("div",{className:`text-sm font-bold ${E[_.status]}`,children:_.val})]},w))})]})}function Y(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Strategy Degradation Detection and Circuit Breakers"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Strategies degrade over time as market regimes shift, alpha decays, and competition increases. Detecting degradation early is critical for protecting capital in Indian markets. This section covers statistical methods for detecting strategy decay and implementing automated circuit breakers."}),e.jsx(j,{title:"Strategy Degradation",label:"Definition 18.8",definition:"Strategy degradation is the systematic decline in a strategy's risk-adjusted returns over time. It manifests as declining Sharpe ratio, increasing drawdowns, or deteriorating fill quality. Causes include alpha decay (crowding), regime change, structural market changes (SEBI rule changes), or infrastructure issues.",notation:"Measured by rolling Sharpe ratio, CUSUM statistics, or Page's test for change-point detection."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"CUSUM Change-Point Detection"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The Cumulative Sum (CUSUM) chart is an effective tool for detecting shifts in strategy performance. It accumulates deviations from a target performance level:"}),e.jsx(i.BlockMath,{math:"S_n^+ = \\max(0, S_{n-1}^+ + r_n - \\mu_0 - k)"}),e.jsx(i.BlockMath,{math:"S_n^- = \\max(0, S_{n-1}^- - r_n + \\mu_0 - k)"}),e.jsxs("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:["where ",e.jsx(i.InlineMath,{math:"r_n"})," is the strategy return, ",e.jsx(i.InlineMath,{math:"\\mu_0"})," ","is the target return (e.g., historical average), and ",e.jsx(i.InlineMath,{math:"k"})," is the allowance parameter (typically ",e.jsx(i.InlineMath,{math:"\\sigma / 2"}),"). An alarm triggers when ",e.jsx(i.InlineMath,{math:"S_n^+"})," or ",e.jsx(i.InlineMath,{math:"S_n^-"})," exceeds threshold"," ",e.jsx(i.InlineMath,{math:"h"}),"."]}),e.jsx(v,{title:"CUSUM Average Run Length",label:"Theorem 18.8",statement:"For a CUSUM chart with allowance $k = \\delta \\sigma / 2$ and threshold $h$, the Average Run Length (ARL) under no change is approximately: $\\text{ARL}_0 \\approx \\frac{\\exp(2bh/\\sigma^2) - 2bh/\\sigma^2 - 1}{2(b/\\sigma)^2}$ where $b = k$. For detecting a shift of $\\delta$ standard deviations, the ARL under change is: $\\text{ARL}_1 \\approx \\frac{h}{\\delta\\sigma - k}$.",proof:"These approximations follow from Wald's sequential analysis and are accurate for $h/\\sigma > 3$. For an NSE strategy with daily returns, choosing $h = 4\\sigma$ and $k = \\sigma/2$ gives $\\text{ARL}_0 \\approx 168$ days (false alarm every 168 days) and $\\text{ARL}_1 \\approx 8$ days for detecting a 1-sigma shift."}),e.jsx(H,{}),e.jsx(k,{title:"anomaly_detection.py",runnable:!0,code:`import numpy as np
from dataclasses import dataclass
from typing import List, Tuple, Optional

class CUSUMDetector:
    """CUSUM change-point detection for strategy monitoring."""

    def __init__(self, target_return: float, allowance_k: float,
                 threshold_h: float):
        self.mu0 = target_return
        self.k = allowance_k
        self.h = threshold_h
        self.s_plus = 0.0
        self.s_minus = 0.0
        self.n = 0
        self.alarm_history = []

    def update(self, return_val: float) -> Optional[str]:
        """Process new return observation."""
        self.n += 1
        self.s_plus = max(0, self.s_plus + return_val - self.mu0 - self.k)
        self.s_minus = max(0, self.s_minus - return_val + self.mu0 - self.k)

        alarm = None
        if self.s_plus > self.h:
            alarm = 'POSITIVE_SHIFT'
            self.alarm_history.append((self.n, alarm, self.s_plus))
            self.s_plus = 0  # Reset after alarm
        elif self.s_minus > self.h:
            alarm = 'NEGATIVE_SHIFT'
            self.alarm_history.append((self.n, alarm, self.s_minus))
            self.s_minus = 0  # Reset after alarm

        return alarm

class ExponentiallyWeightedDetector:
    """EWMA-based degradation detection."""

    def __init__(self, span: int = 20, n_sigma: float = 2.5):
        self.span = span
        self.n_sigma = n_sigma
        self.alpha = 2.0 / (span + 1)
        self.ewma = None
        self.ewma_var = None
        self.n = 0

    def update(self, value: float) -> dict:
        self.n += 1
        if self.ewma is None:
            self.ewma = value
            self.ewma_var = 0
            return {'status': 'INITIALIZING'}

        self.ewma = self.alpha * value + (1 - self.alpha) * self.ewma
        diff = value - self.ewma
        self.ewma_var = (self.alpha * diff**2
                         + (1 - self.alpha) * self.ewma_var)
        ewma_std = np.sqrt(self.ewma_var)

        z_score = diff / max(ewma_std, 1e-10)
        status = 'NORMAL'
        if abs(z_score) > self.n_sigma:
            status = 'ANOMALY'
        elif abs(z_score) > self.n_sigma * 0.7:
            status = 'WARNING'

        return {
            'status': status,
            'ewma': self.ewma,
            'z_score': z_score,
            'upper_band': self.ewma + self.n_sigma * ewma_std,
            'lower_band': self.ewma - self.n_sigma * ewma_std,
        }

class StrategyCircuitBreaker:
    """Multi-level circuit breaker for live trading."""

    def __init__(self, config: dict):
        self.config = config
        self.state = 'GREEN'  # GREEN, YELLOW, RED
        self.detectors = {
            'cusum': CUSUMDetector(
                target_return=config.get('target_return', 0.0005),
                allowance_k=config.get('cusum_k', 0.003),
                threshold_h=config.get('cusum_h', 0.015),
            ),
            'sharpe_ewma': ExponentiallyWeightedDetector(
                span=config.get('sharpe_span', 20),
                n_sigma=config.get('sharpe_n_sigma', 2.0),
            ),
        }
        self.daily_pnl = 0
        self.peak_equity = config.get('initial_capital', 5_000_000)
        self.current_equity = self.peak_equity
        self.alerts = []

    def update(self, daily_return: float, daily_sharpe: float,
               fill_rate: float, latency_p99: float) -> dict:
        """Update all circuit breaker checks."""
        self.current_equity *= (1 + daily_return)
        self.peak_equity = max(self.peak_equity, self.current_equity)
        drawdown = (self.peak_equity - self.current_equity) / self.peak_equity

        # CUSUM check
        cusum_alarm = self.detectors['cusum'].update(daily_return)

        # Sharpe EWMA check
        sharpe_result = self.detectors['sharpe_ewma'].update(daily_sharpe)

        # Determine state
        red_flags = 0
        yellow_flags = 0

        if drawdown > 0.05:
            red_flags += 1
        elif drawdown > 0.02:
            yellow_flags += 1

        if cusum_alarm == 'NEGATIVE_SHIFT':
            red_flags += 1

        if sharpe_result['status'] == 'ANOMALY':
            red_flags += 1
        elif sharpe_result['status'] == 'WARNING':
            yellow_flags += 1

        if fill_rate < 70:
            red_flags += 1
        elif fill_rate < 85:
            yellow_flags += 1

        if latency_p99 > 500:
            red_flags += 1
        elif latency_p99 > 200:
            yellow_flags += 1

        if red_flags >= 2:
            self.state = 'RED'
            action = 'HALT_ALL_TRADING'
        elif red_flags >= 1 or yellow_flags >= 3:
            self.state = 'YELLOW'
            action = 'REDUCE_POSITION_SIZE_50PCT'
        else:
            self.state = 'GREEN'
            action = 'NORMAL_OPERATION'

        return {
            'state': self.state,
            'action': action,
            'drawdown': drawdown,
            'cusum_alarm': cusum_alarm,
            'sharpe_status': sharpe_result['status'],
            'red_flags': red_flags,
            'yellow_flags': yellow_flags,
        }

# Demo: simulate strategy degradation
np.random.seed(42)
config = {
    'initial_capital': 5_000_000,
    'target_return': 0.0005,
    'cusum_k': 0.003,
    'cusum_h': 0.015,
}

cb = StrategyCircuitBreaker(config)

# Phase 1: Normal performance (60 days)
# Phase 2: Gradual degradation (30 days)
# Phase 3: Regime break (10 days)
returns = np.concatenate([
    np.random.normal(0.0005, 0.012, 60),   # Normal
    np.random.normal(0.0001, 0.015, 30),   # Degrading
    np.random.normal(-0.003, 0.020, 10),   # Broken
])

print("=== Strategy Circuit Breaker Simulation ===")
print(f"{'Day':>4} {'Return':>8} {'State':>8} {'Action':>30} {'DD':>7}")
print("-" * 65)

for day, ret in enumerate(returns):
    sharpe = ret / 0.013  # Approximate daily Sharpe
    fill_rate = 95 - max(0, day - 60) * 0.5  # Degrading fills
    latency = 100 + max(0, day - 75) * 20    # Rising latency

    result = cb.update(ret, sharpe, fill_rate, latency)

    if (day + 1) % 10 == 0 or result['state'] != 'GREEN':
        print(f"{day+1:4d} {ret:>8.4f} {result['state']:>8s} "
              f"{result['action']:>30s} {result['drawdown']:>6.2%}")

    if result['state'] == 'RED':
        print(f"\\n*** CIRCUIT BREAKER TRIGGERED on day {day+1} ***")
        print(f"Red flags: {result['red_flags']}, "
              f"Yellow flags: {result['yellow_flags']}")
        if result['cusum_alarm']:
            print(f"CUSUM alarm: {result['cusum_alarm']}")
        break`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Multi-Level Circuit Breaker Design"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"A production circuit breaker for NSE trading should have three levels, mirroring NSE's own circuit breaker system:"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Level"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Trigger"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Action"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Recovery"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2 font-bold text-green-600",children:"GREEN"}),e.jsx("td",{className:"px-4 py-2",children:"All metrics normal"}),e.jsx("td",{className:"px-4 py-2",children:"Full position sizing"}),e.jsx("td",{className:"px-4 py-2",children:"N/A"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2 font-bold text-yellow-600",children:"YELLOW"}),e.jsx("td",{className:"px-4 py-2",children:"1 red or 3+ yellow flags"}),e.jsx("td",{className:"px-4 py-2",children:"Reduce size by 50%"}),e.jsx("td",{className:"px-4 py-2",children:"5 consecutive green days"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2 font-bold text-red-600",children:"RED"}),e.jsx("td",{className:"px-4 py-2",children:"2+ red flags"}),e.jsx("td",{className:"px-4 py-2",children:"Halt trading, flatten"}),e.jsx("td",{className:"px-4 py-2",children:"Manual review required"})]})]})]})}),e.jsx(S,{title:"Detecting Alpha Decay in a Bank Nifty Strategy",difficulty:"advanced",problem:"Your Bank Nifty mean-reversion strategy had a historical Sharpe of 1.8. Over the past 3 months, the rolling 20-day Sharpe has been: 1.6, 1.4, 1.1, 0.8, 0.6, 0.4. Is this alpha decay or normal variation? Use CUSUM to decide.",solution:[{step:"Calculate CUSUM statistics",formula:"S_n^- = \\max(0, S_{n-1}^- - r_n + \\mu_0 - k)",explanation:"Set target Sharpe mu_0 = 1.8/sqrt(252) as daily, with k = sigma/2. The consistently declining Sharpe suggests a downward shift."},{step:"Estimate the shift magnitude",formula:"\\delta = \\frac{1.8 - 0.4}{\\sigma_{\\text{Sharpe}}} \\approx \\frac{1.4}{0.5} = 2.8\\sigma",explanation:"The Sharpe has declined by approximately 2.8 standard deviations of its typical variation, which is well beyond normal fluctuation."},{step:"CUSUM detection timing",formula:"\\text{ARL}_1 = \\frac{h}{\\delta\\sigma - k} \\approx \\frac{4 \\times 0.5}{1.4 - 0.25} = 1.7 \\text{ periods}",explanation:"With a 2.8-sigma shift, CUSUM would have detected the degradation after approximately 2 rolling windows (40 trading days), which is the 2nd observation."},{step:"Verdict and action",formula:"\\text{Sharpe}_{\\text{current}} = 0.4 < 0.5 \\times 1.8 = 0.9",explanation:"This is clearly alpha decay, not noise. The strategy fails the 50% haircut test. ACTION: Move strategy to YELLOW, reduce position size by 50%, and conduct a full review of market microstructure changes in Bank Nifty."}]}),e.jsx(b,{title:"Key Takeaway",type:"tip",children:e.jsxs("p",{children:["Anomaly detection and circuit breakers are your ",e.jsx("strong",{children:"last line of defense"})," ","against catastrophic losses. Use CUSUM for detecting gradual strategy degradation and EWMA for sudden regime changes. Implement multi-level circuit breakers that automatically reduce position sizes or halt trading when multiple warning signals trigger simultaneously. For Indian markets, also monitor NSE circuit breaker events, F&O expiry days, and RBI policy announcements as external degradation catalysts."]})})]})}const ce=Object.freeze(Object.defineProperty({__proto__:null,default:Y},Symbol.toStringTag,{value:"Module"}));function z(){const[r,y]=n.useState(2e5),[t,h]=n.useState(5e6),[s,g]=n.useState(2),[a,p]=n.useState(8),o=r/t*100,d=10,m=5,f=30,l=[{name:"Order Size",pass:o<=d,value:`${o.toFixed(1)}%`,limit:`${d}%`},{name:"Price Band",pass:s<=m,value:`${s}%`,limit:`${m}%`},{name:"Position Count",pass:a<f,value:`${a}`,limit:`${f}`},{name:"Daily Exposure",pass:o+a*5<80,value:`${(o+a*5).toFixed(0)}%`,limit:"80%"}],u=l.every(c=>c.pass);return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Pre-Trade Risk Check Simulator"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Simulate SEBI-mandated pre-trade risk checks for an NSE order."}),e.jsxs("div",{className:"mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Order Value: INR ",(r/1e5).toFixed(1),"L"]}),e.jsx("input",{type:"range",min:"10000",max:"2000000",step:"10000",value:r,onChange:c=>y(parseInt(c.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Capital: INR ",(t/1e5).toFixed(0),"L"]}),e.jsx("input",{type:"range",min:"500000",max:"50000000",step:"500000",value:t,onChange:c=>h(parseInt(c.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Price Deviation (%): ",s]}),e.jsx("input",{type:"range",min:"0",max:"15",step:"0.5",value:s,onChange:c=>g(parseFloat(c.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400",children:[e.jsxs("span",{children:["Current Positions: ",a]}),e.jsx("input",{type:"range",min:"0",max:"50",step:"1",value:a,onChange:c=>p(parseInt(c.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]})]}),e.jsxs("div",{className:"space-y-2",children:[l.map((c,N)=>e.jsxs("div",{className:`flex items-center justify-between rounded-lg p-2 ${c.pass?"bg-green-50 dark:bg-green-900/20":"bg-red-50 dark:bg-red-900/20"}`,children:[e.jsx("span",{className:"text-sm font-medium text-gray-700 dark:text-gray-300",children:c.name}),e.jsxs("div",{className:"flex items-center gap-3 text-xs",children:[e.jsxs("span",{className:"text-gray-500",children:["Value: ",c.value]}),e.jsxs("span",{className:"text-gray-500",children:["Limit: ",c.limit]}),e.jsx("span",{className:`font-bold ${c.pass?"text-green-600":"text-red-600"}`,children:c.pass?"PASS":"FAIL"})]})]},N)),e.jsxs("div",{className:`rounded-lg p-3 text-center font-bold ${u?"bg-green-100 text-green-700 dark:bg-green-900/40":"bg-red-100 text-red-700 dark:bg-red-900/40"}`,children:["Order ",u?"APPROVED":"REJECTED"]})]})]})}function V(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Pre-Trade Risk Checks and Position Limits"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Fat-finger errors and algorithmic glitches have caused spectacular losses in markets worldwide. In India, SEBI mandates specific pre-trade risk checks for all algorithmic trading systems. This section covers the design of a comprehensive pre-trade risk engine for NSE/BSE trading."}),e.jsx(j,{title:"Fat-Finger Error",label:"Definition 18.9",definition:"A fat-finger error is an erroneous trade caused by incorrect order parameters -- wrong quantity, wrong price, wrong symbol, or wrong side (buy instead of sell). In algorithmic trading, fat-finger errors can be amplified by automation, potentially submitting thousands of erroneous orders per second. SEBI requires all algo trading systems to implement pre-trade risk checks to prevent such errors.",notation:"Famous examples: the 2012 Knight Capital glitch ($440M loss in 45 minutes) and the 2014 NSE Emkay incident where a fat-finger trade crashed the Nifty by 900 points."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"SEBI-Mandated Pre-Trade Risk Checks"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"SEBI circular SEBI/HO/MRD/DP/CIR/P/2019/62 mandates the following pre-trade risk checks for all algo orders on NSE and BSE:"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Check"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Description"}),e.jsx("th",{className:"px-4 py-2 text-left text-gray-600 dark:text-gray-400",children:"Typical Limit"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Price band check"}),e.jsx("td",{className:"px-4 py-2",children:"Order price within NSE circuit limits"}),e.jsx("td",{className:"px-4 py-2",children:"5/10/20% from previous close"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Quantity limit"}),e.jsx("td",{className:"px-4 py-2",children:"Single order quantity cap"}),e.jsx("td",{className:"px-4 py-2",children:"Exchange-defined lot limits"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Order value limit"}),e.jsx("td",{className:"px-4 py-2",children:"Maximum INR value per order"}),e.jsx("td",{className:"px-4 py-2",children:"10% of capital"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Order-to-trade ratio"}),e.jsx("td",{className:"px-4 py-2",children:"Max pending/executed ratio"}),e.jsx("td",{className:"px-4 py-2",children:"50:1 (NSE)"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-4 py-2",children:"Cumulative exposure"}),e.jsx("td",{className:"px-4 py-2",children:"Total portfolio exposure cap"}),e.jsx("td",{className:"px-4 py-2",children:"80% of capital"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-2",children:"Kill switch"}),e.jsx("td",{className:"px-4 py-2",children:"Ability to cancel all orders"}),e.jsx("td",{className:"px-4 py-2",children:"Within 1 second"})]})]})]})}),e.jsx(z,{}),e.jsx(v,{title:"Position Sizing with Risk Constraints",label:"Theorem 18.9",statement:"Given capital $C$, maximum position concentration $\\gamma$, and a Kelly fraction $f^*$ for stock $i$, the constrained position size is: $q_i^* = \\min\\left(\\frac{f^* \\cdot C}{p_i}, \\; \\frac{\\gamma \\cdot C}{p_i}, \\; Q_{\\max,i}\\right)$ where $Q_{\\max,i}$ is the exchange-defined quantity limit and $p_i$ is the stock price. The Kelly fraction for Indian equities with STT is: $f^* = \\frac{\\mu_i - r_f - c_i}{\\sigma_i^2}$ where $c_i$ includes STT, brokerage, and impact cost.",proof:"The Kelly criterion maximizes the expected log-wealth growth rate. The additional constraint from SEBI position limits ensures no single position can exceed the concentration limit. For NSE Nifty 50 stocks, the exchange quantity limit is typically large enough that the concentration constraint binds first."}),e.jsx(k,{title:"pre_trade_risk_engine.py",runnable:!0,code:`import numpy as np
from dataclasses import dataclass, field
from typing import Dict, List, Tuple
from datetime import datetime, time

@dataclass
class RiskLimits:
    """Pre-trade risk limits for NSE trading."""
    max_order_value_pct: float = 0.10      # 10% of capital
    max_order_quantity: int = 10000         # Max shares per order
    max_price_deviation_pct: float = 0.05   # 5% from LTP
    max_position_pct: float = 0.15          # 15% concentration
    max_sector_pct: float = 0.30            # 30% sector
    max_gross_exposure_pct: float = 0.80    # 80% total
    max_daily_loss_pct: float = 0.02        # 2% daily stop
    max_orders_per_second: int = 10         # Rate limit
    max_daily_orders: int = 500             # Daily cap
    max_order_to_trade_ratio: float = 50.0  # SEBI mandate

@dataclass
class PreTradeCheck:
    name: str
    passed: bool
    value: float
    limit: float
    message: str

class PreTradeRiskEngine:
    """SEBI-compliant pre-trade risk engine for NSE."""

    def __init__(self, capital: float, limits: RiskLimits = None):
        self.capital = capital
        self.limits = limits or RiskLimits()
        self.positions: Dict[str, dict] = {}
        self.daily_pnl: float = 0.0
        self.daily_order_count: int = 0
        self.daily_fill_count: int = 0
        self.order_timestamps: List[float] = []
        self.rejected_orders: List[dict] = []

    def check_order(self, symbol: str, side: str,
                    quantity: int, price: float,
                    ltp: float, sector: str = '') -> Tuple[bool, List[PreTradeCheck]]:
        """Run all pre-trade risk checks."""
        checks = []
        order_value = quantity * price

        # 1. Order value check
        max_val = self.limits.max_order_value_pct * self.capital
        checks.append(PreTradeCheck(
            'ORDER_VALUE', order_value <= max_val,
            order_value, max_val,
            f'Order INR {order_value:,.0f} vs limit INR {max_val:,.0f}'
        ))

        # 2. Quantity check
        checks.append(PreTradeCheck(
            'QUANTITY', quantity <= self.limits.max_order_quantity,
            quantity, self.limits.max_order_quantity,
            f'Qty {quantity} vs limit {self.limits.max_order_quantity}'
        ))

        # 3. Price deviation check (fat-finger)
        if ltp > 0:
            dev = abs(price - ltp) / ltp
            max_dev = self.limits.max_price_deviation_pct
            checks.append(PreTradeCheck(
                'PRICE_DEVIATION', dev <= max_dev,
                dev * 100, max_dev * 100,
                f'Deviation {dev*100:.2f}% vs limit {max_dev*100}%'
            ))

        # 4. Position concentration check
        existing_value = 0
        if symbol in self.positions:
            pos = self.positions[symbol]
            existing_value = abs(pos['quantity'] * pos['price'])
        new_value = existing_value + order_value
        max_conc = self.limits.max_position_pct * self.capital
        checks.append(PreTradeCheck(
            'CONCENTRATION', new_value <= max_conc,
            new_value / self.capital * 100,
            self.limits.max_position_pct * 100,
            f'Position {new_value/self.capital*100:.1f}% vs limit'
        ))

        # 5. Sector exposure check
        sector_value = sum(
            abs(p['quantity'] * p['price'])
            for p in self.positions.values()
            if p.get('sector') == sector
        ) + order_value
        max_sector = self.limits.max_sector_pct * self.capital
        checks.append(PreTradeCheck(
            'SECTOR_EXPOSURE', sector_value <= max_sector,
            sector_value / self.capital * 100,
            self.limits.max_sector_pct * 100,
            f'Sector {sector_value/self.capital*100:.1f}% vs limit'
        ))

        # 6. Gross exposure check
        gross = sum(
            abs(p['quantity'] * p['price'])
            for p in self.positions.values()
        ) + order_value
        max_gross = self.limits.max_gross_exposure_pct * self.capital
        checks.append(PreTradeCheck(
            'GROSS_EXPOSURE', gross <= max_gross,
            gross / self.capital * 100,
            self.limits.max_gross_exposure_pct * 100,
            f'Gross {gross/self.capital*100:.1f}% vs limit'
        ))

        # 7. Daily loss check
        checks.append(PreTradeCheck(
            'DAILY_LOSS', self.daily_pnl > -self.limits.max_daily_loss_pct * self.capital,
            abs(min(0, self.daily_pnl)) / self.capital * 100,
            self.limits.max_daily_loss_pct * 100,
            f'Daily loss {abs(min(0, self.daily_pnl)):,.0f} vs limit'
        ))

        # 8. Rate limit check
        now = datetime.now().timestamp()
        recent = [t for t in self.order_timestamps
                  if now - t < 1.0]
        checks.append(PreTradeCheck(
            'RATE_LIMIT', len(recent) < self.limits.max_orders_per_second,
            len(recent), self.limits.max_orders_per_second,
            f'{len(recent)} orders in last second'
        ))

        # 9. Order-to-trade ratio
        if self.daily_fill_count > 0:
            otr = self.daily_order_count / self.daily_fill_count
        else:
            otr = self.daily_order_count
        checks.append(PreTradeCheck(
            'ORDER_TO_TRADE_RATIO',
            otr <= self.limits.max_order_to_trade_ratio,
            otr, self.limits.max_order_to_trade_ratio,
            f'OTR {otr:.1f} vs limit {self.limits.max_order_to_trade_ratio}'
        ))

        all_pass = all(c.passed for c in checks)
        if not all_pass:
            self.rejected_orders.append({
                'symbol': symbol, 'side': side,
                'quantity': quantity, 'price': price,
                'failures': [c.name for c in checks if not c.passed],
                'timestamp': datetime.now().isoformat(),
            })

        self.daily_order_count += 1
        self.order_timestamps.append(now)

        return all_pass, checks

    def kill_switch(self) -> dict:
        """Emergency: cancel all pending orders."""
        cancelled = self.daily_order_count
        self.daily_order_count = 0
        return {
            'status': 'KILL_SWITCH_ACTIVATED',
            'orders_cancelled': cancelled,
            'timestamp': datetime.now().isoformat(),
            'action': 'ALL_PENDING_ORDERS_CANCELLED',
        }

# Demo: Pre-trade risk engine
engine = PreTradeRiskEngine(capital=5_000_000)

# Add existing positions
engine.positions = {
    'RELIANCE': {'quantity': 100, 'price': 2450, 'sector': 'Energy'},
    'TCS': {'quantity': 50, 'price': 3500, 'sector': 'IT'},
    'HDFCBANK': {'quantity': 200, 'price': 1680, 'sector': 'Banking'},
}
engine.daily_fill_count = 15

# Test order 1: Normal order (should pass)
print("=== Test 1: Normal Order ===")
passed, checks = engine.check_order(
    'INFY', 'BUY', 100, 1450, ltp=1448, sector='IT'
)
for c in checks:
    status = "PASS" if c.passed else "FAIL"
    print(f"  [{status}] {c.name:25s}: {c.message}")
print(f"  Result: {'APPROVED' if passed else 'REJECTED'}\\n")

# Test order 2: Fat-finger price (should fail)
print("=== Test 2: Fat-Finger Price ===")
passed, checks = engine.check_order(
    'SBIN', 'BUY', 500, 750, ltp=625, sector='Banking'
)
for c in checks:
    if not c.passed:
        print(f"  [FAIL] {c.name:25s}: {c.message}")
print(f"  Result: {'APPROVED' if passed else 'REJECTED'}\\n")

# Test order 3: Excessive quantity (should fail)
print("=== Test 3: Excessive Order Size ===")
passed, checks = engine.check_order(
    'ITC', 'BUY', 15000, 440, ltp=440, sector='FMCG'
)
for c in checks:
    if not c.passed:
        print(f"  [FAIL] {c.name:25s}: {c.message}")
print(f"  Result: {'APPROVED' if passed else 'REJECTED'}")

# Kill switch demo
print(f"\\n=== Kill Switch ===")
result = engine.kill_switch()
for k, v in result.items():
    print(f"  {k}: {v}")`}),e.jsx(S,{title:"The 2012 NSE Fat-Finger Incident",difficulty:"beginner",problem:"In October 2012, an Emkay Global trader accidentally placed a sell order for Nifty futures worth INR 650 crore instead of INR 65 lakh. The Nifty crashed 900 points in seconds. What pre-trade checks would have prevented this?",solution:[{step:"Order value check",formula:"\\text{Order value} = 6.5 \\times 10^9 \\gg 0.10 \\times \\text{Capital}",explanation:"The order was 1000x the intended size. An order value limit of 10% of capital would have blocked it immediately."},{step:"Quantity sanity check",formula:"Q_{\\text{order}} \\gg Q_{\\text{typical}} \\times 10",explanation:"The quantity was orders of magnitude larger than the trader typical order. A check against historical order size (e.g., max 10x average) would flag this."},{step:"Gross exposure check",formula:"\\text{New exposure} \\gg 0.80 \\times \\text{Capital}",explanation:"The single order would have exceeded the firm entire capital. A gross exposure limit would have prevented the order."},{step:"Lesson",formula:"\\text{Prevention cost} \\ll \\text{Loss of INR 650 Cr}",explanation:"Implementing a pre-trade risk engine with these basic checks costs essentially nothing compared to the potential loss. This is why SEBI now mandates these checks for all algo trading systems."}]}),e.jsxs(b,{title:"Kill Switch Implementation",type:"warning",children:[e.jsxs("p",{children:["SEBI mandates that every algo trading system must have a ",e.jsx("strong",{children:"kill switch"})," ","capable of cancelling all pending orders within 1 second. Implementation requirements:"]}),e.jsxs("ul",{className:"mt-2 list-disc list-inside space-y-1",children:[e.jsx("li",{children:"Accessible via API call, dashboard button, and keyboard shortcut"}),e.jsx("li",{children:"Must cancel all pending orders across all segments (equity, F&O, commodity)"}),e.jsx("li",{children:"Must work independently of the main trading system (separate process)"}),e.jsx("li",{children:"Must log the activation with timestamp and reason"}),e.jsx("li",{children:"Must notify all stakeholders (risk team, compliance, operations)"}),e.jsx("li",{children:"Test the kill switch weekly during non-market hours"})]})]}),e.jsx(b,{title:"Key Takeaway",type:"tip",children:e.jsxs("p",{children:["Pre-trade risk checks are not just a regulatory requirement -- they are your"," ",e.jsx("strong",{children:"first and most important line of defense"})," against catastrophic trading errors. Every order submitted to NSE/BSE must pass through at least 9 independent checks: order value, quantity, price band, concentration, sector exposure, gross exposure, daily loss, rate limit, and order-to-trade ratio. The cost of implementing these checks is negligible; the cost of not implementing them can be existential."]})})]})}const pe=Object.freeze(Object.defineProperty({__proto__:null,default:V},Symbol.toStringTag,{value:"Module"}));function Z(){const[r,y]=n.useState(0),t=[{name:"Research",color:"#3b82f6",desc:"Hypothesis testing, backtesting",duration:"2-6 months",capital:"0%"},{name:"Incubation",color:"#8b5cf6",desc:"Paper trading, validation",duration:"3-6 months",capital:"0%"},{name:"Pilot",color:"#f59e0b",desc:"Live with minimal capital",duration:"1-3 months",capital:"5-10%"},{name:"Ramp-Up",color:"#22c55e",desc:"Gradual capital increase",duration:"3-6 months",capital:"10-50%"},{name:"Production",color:"#10b981",desc:"Full allocation",duration:"Ongoing",capital:"50-100%"},{name:"Monitoring",color:"#06b6d4",desc:"Continuous surveillance",duration:"Ongoing",capital:"100%"},{name:"Decay",color:"#ef4444",desc:"Performance declining",duration:"1-6 months",capital:"Reducing"},{name:"Retirement",color:"#6b7280",desc:"Strategy decommissioned",duration:"Final",capital:"0%"}];return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: Strategy Lifecycle Stages"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Click on each stage to see details about the strategy lifecycle for NSE trading."}),e.jsx("svg",{viewBox:"0 0 640 100",className:"w-full max-w-2xl mx-auto block mb-4","aria-label":"Strategy lifecycle",children:t.map((h,s)=>{const g=s*78+10,a=s===r;return e.jsxs("g",{onClick:()=>y(s),className:"cursor-pointer",children:[e.jsx("rect",{x:g,y:a?10:20,width:"70",height:a?50:40,rx:"6",fill:h.color,opacity:a?.9:.4,stroke:a?h.color:"none",strokeWidth:"2"}),e.jsx("text",{x:g+35,y:a?40:44,textAnchor:"middle",className:"text-[8px] font-bold",fill:"white",children:h.name}),s<t.length-1&&e.jsx("line",{x1:g+72,y1:"40",x2:g+78,y2:"40",stroke:"#94a3b8",strokeWidth:"1.5"})]},s)})}),e.jsxs("div",{className:"rounded-lg p-4",style:{backgroundColor:t[r].color+"15",borderLeft:`4px solid ${t[r].color}`},children:[e.jsx("h4",{className:"text-sm font-bold text-gray-800 dark:text-gray-200",children:t[r].name}),e.jsx("p",{className:"text-xs text-gray-600 dark:text-gray-400 mt-1",children:t[r].desc}),e.jsxs("div",{className:"mt-2 flex gap-4 text-xs",children:[e.jsxs("span",{className:"text-gray-500",children:["Duration: ",e.jsx("strong",{children:t[r].duration})]}),e.jsxs("span",{className:"text-gray-500",children:["Capital: ",e.jsx("strong",{children:t[r].capital})]})]})]})]})}function X(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"Strategy Lifecycle: Incubation to Retirement"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Every quantitative strategy has a natural lifecycle -- from initial research hypothesis through production deployment to eventual retirement. Managing this lifecycle systematically is critical for sustained profitability in Indian markets, where alpha decay can be rapid due to increasing competition from domestic quant firms."}),e.jsx(j,{title:"Strategy Lifecycle Management",label:"Definition 18.10",definition:"Strategy lifecycle management (SLM) is the systematic process of governing a trading strategy through its complete lifecycle: research, validation, deployment, monitoring, and retirement. Each stage has defined entry criteria, exit criteria, and governance requirements. For SEBI-regulated trading in India, each stage must also satisfy regulatory requirements for documentation and audit trails.",notation:"Typical lifecycle duration for an NSE equity strategy: 12--24 months from research to retirement."}),e.jsx(Z,{}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Stage Gates and Criteria"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"Each transition between stages requires meeting specific quantitative criteria. These gate conditions prevent premature deployment and ensure strategies are properly validated before receiving capital."}),e.jsx(i.BlockMath,{math:"\\text{Gate Score} = w_1 \\cdot \\mathbb{1}[\\text{Sharpe} > S_{\\min}] + w_2 \\cdot \\mathbb{1}[\\text{DD} < D_{\\max}] + w_3 \\cdot \\mathbb{1}[\\text{Decay} < \\Delta_{\\max}] + w_4 \\cdot \\mathbb{1}[\\text{Tests pass}]"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"Transition"}),e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"Sharpe Req"}),e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"Max DD"}),e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"Other Criteria"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2",children:"Research to Incubation"}),e.jsx("td",{className:"px-3 py-2",children:"> 1.5 (backtest)"}),e.jsx("td",{className:"px-3 py-2",children:"< 15%"}),e.jsx("td",{className:"px-3 py-2",children:"Pass multiple testing correction"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2",children:"Incubation to Pilot"}),e.jsx("td",{className:"px-3 py-2",children:"> 1.0 (paper)"}),e.jsx("td",{className:"px-3 py-2",children:"< 10%"}),e.jsx("td",{className:"px-3 py-2",children:"3 months paper, decay < 30%"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2",children:"Pilot to Ramp-Up"}),e.jsx("td",{className:"px-3 py-2",children:"> 0.8 (live)"}),e.jsx("td",{className:"px-3 py-2",children:"< 8%"}),e.jsx("td",{className:"px-3 py-2",children:"1 month live, positive P&L"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2",children:"Ramp-Up to Production"}),e.jsx("td",{className:"px-3 py-2",children:"> 0.7 (live)"}),e.jsx("td",{className:"px-3 py-2",children:"< 10%"}),e.jsx("td",{className:"px-3 py-2",children:"3 months live, stable metrics"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-3 py-2",children:"Production to Decay"}),e.jsx("td",{className:"px-3 py-2",children:"< 0.5 (rolling)"}),e.jsx("td",{className:"px-3 py-2",children:"> 15%"}),e.jsx("td",{className:"px-3 py-2",children:"CUSUM alarm, 2+ circuit breakers"})]})]})]})}),e.jsx(v,{title:"Optimal Capital Ramp-Up Schedule",label:"Theorem 18.10",statement:"For a strategy transitioning from pilot to full production, the optimal capital allocation at time $t$ follows: $C(t) = C_{\\max} \\cdot \\left(1 - e^{-\\lambda t}\\right) \\cdot \\mathbb{1}[\\text{Sharpe}_{20d}(t) > S_{\\min}]$ where $\\lambda = \\ln(2) / t_{1/2}$ controls the ramp-up speed and $t_{1/2}$ is the half-life (time to reach 50% allocation). The indicator function ensures capital is only added when the strategy is performing above minimum threshold.",proof:"The exponential ramp-up balances the desire for early capital deployment (to capture alpha) against the risk of deploying too fast before sufficient live data is available. The half-life $t_{1/2}$ should be set to at least 20 trading days, ensuring 20+ live observations before reaching 50% allocation. The indicator function provides automatic de-risking if performance drops."}),e.jsx(k,{title:"strategy_lifecycle.py",runnable:!0,code:`import numpy as np
from dataclasses import dataclass, field
from typing import List, Dict, Optional
from datetime import datetime
from enum import Enum

class LifecycleStage(Enum):
    RESEARCH = 'RESEARCH'
    INCUBATION = 'INCUBATION'
    PILOT = 'PILOT'
    RAMP_UP = 'RAMP_UP'
    PRODUCTION = 'PRODUCTION'
    DECAY = 'DECAY'
    RETIRED = 'RETIRED'

@dataclass
class StageGate:
    """Criteria for transitioning between stages."""
    min_sharpe: float
    max_drawdown: float
    min_duration_days: int
    additional_checks: List[str] = field(default_factory=list)

    def evaluate(self, sharpe: float, max_dd: float,
                 days_in_stage: int) -> tuple:
        checks = []
        checks.append(('sharpe', sharpe >= self.min_sharpe))
        checks.append(('drawdown', max_dd <= self.max_drawdown))
        checks.append(('duration', days_in_stage >= self.min_duration_days))
        all_pass = all(c[1] for c in checks)
        return all_pass, checks

class StrategyLifecycleManager:
    """Manage the complete lifecycle of a trading strategy."""

    # Stage transition gates
    GATES = {
        (LifecycleStage.RESEARCH, LifecycleStage.INCUBATION): StageGate(
            min_sharpe=1.5, max_drawdown=0.15, min_duration_days=60,
            additional_checks=['multiple_testing_correction', 'economic_rationale']
        ),
        (LifecycleStage.INCUBATION, LifecycleStage.PILOT): StageGate(
            min_sharpe=1.0, max_drawdown=0.10, min_duration_days=63,
            additional_checks=['paper_live_reconciliation', 'statistical_validation']
        ),
        (LifecycleStage.PILOT, LifecycleStage.RAMP_UP): StageGate(
            min_sharpe=0.8, max_drawdown=0.08, min_duration_days=22,
            additional_checks=['positive_pnl', 'fill_quality_check']
        ),
        (LifecycleStage.RAMP_UP, LifecycleStage.PRODUCTION): StageGate(
            min_sharpe=0.7, max_drawdown=0.10, min_duration_days=63,
            additional_checks=['stable_sharpe', 'capacity_test']
        ),
    }

    def __init__(self, strategy_name: str, max_capital: float):
        self.name = strategy_name
        self.max_capital = max_capital
        self.stage = LifecycleStage.RESEARCH
        self.stage_start = datetime.now()
        self.capital_allocated = 0.0
        self.history: List[dict] = []
        self.metrics: Dict[str, float] = {}

    def get_allocation_pct(self) -> float:
        """Get capital allocation for current stage."""
        allocations = {
            LifecycleStage.RESEARCH: 0.0,
            LifecycleStage.INCUBATION: 0.0,
            LifecycleStage.PILOT: 0.05,
            LifecycleStage.RAMP_UP: 0.30,
            LifecycleStage.PRODUCTION: 1.0,
            LifecycleStage.DECAY: 0.25,
            LifecycleStage.RETIRED: 0.0,
        }
        return allocations[self.stage]

    def evaluate_transition(self, target_stage: LifecycleStage,
                            sharpe: float, max_dd: float,
                            days: int) -> dict:
        """Evaluate if transition to target stage is allowed."""
        gate_key = (self.stage, target_stage)
        gate = self.GATES.get(gate_key)

        if gate is None:
            return {'allowed': False, 'reason': 'Invalid transition'}

        passed, checks = gate.evaluate(sharpe, max_dd, days)
        return {
            'allowed': passed,
            'checks': checks,
            'additional': gate.additional_checks,
            'current_stage': self.stage.value,
            'target_stage': target_stage.value,
        }

    def transition(self, target_stage: LifecycleStage,
                   sharpe: float, max_dd: float, days: int) -> dict:
        """Attempt to transition to a new stage."""
        result = self.evaluate_transition(
            target_stage, sharpe, max_dd, days
        )

        if result['allowed']:
            old_stage = self.stage
            self.stage = target_stage
            self.capital_allocated = self.get_allocation_pct() * self.max_capital
            self.history.append({
                'from': old_stage.value,
                'to': target_stage.value,
                'sharpe': sharpe,
                'max_dd': max_dd,
                'capital': self.capital_allocated,
                'timestamp': datetime.now().isoformat(),
            })
            result['capital_allocated'] = self.capital_allocated

        return result

    def check_decay(self, rolling_sharpe: float,
                    current_dd: float) -> Optional[str]:
        """Check if strategy should move to decay stage."""
        if self.stage != LifecycleStage.PRODUCTION:
            return None

        if rolling_sharpe < 0.3:
            return 'SHARPE_BELOW_THRESHOLD'
        if current_dd > 0.15:
            return 'DRAWDOWN_EXCEEDED'
        return None

    def generate_report(self) -> str:
        lines = [
            f"Strategy: {self.name}",
            f"Stage: {self.stage.value}",
            f"Capital: INR {self.capital_allocated:,.0f} "
            f"({self.get_allocation_pct()*100:.0f}%)",
            f"Max Capital: INR {self.max_capital:,.0f}",
            f"Transitions: {len(self.history)}",
        ]
        return "\\n".join(lines)

# Demo: Full lifecycle simulation
manager = StrategyLifecycleManager(
    strategy_name='Nifty50_Momentum_v3',
    max_capital=5_000_000
)

print("=== Strategy Lifecycle Simulation ===")
print(f"Strategy: {manager.name}\\n")

# Stage 1: Research -> Incubation
transitions = [
    (LifecycleStage.INCUBATION, 1.8, 0.12, 90,
     "Backtest shows strong Sharpe, within DD limits"),
    (LifecycleStage.PILOT, 1.2, 0.08, 70,
     "Paper trading validates backtest, 30% decay"),
    (LifecycleStage.RAMP_UP, 0.9, 0.06, 25,
     "1 month live with positive P&L"),
    (LifecycleStage.PRODUCTION, 0.85, 0.07, 65,
     "3 months stable live performance"),
]

for target, sharpe, dd, days, note in transitions:
    result = manager.transition(target, sharpe, dd, days)
    status = "APPROVED" if result['allowed'] else "REJECTED"
    print(f"[{status}] {manager.history[-1]['from'] if result['allowed'] else manager.stage.value}"
          f" -> {target.value}")
    print(f"  Sharpe: {sharpe}, MaxDD: {dd:.0%}, Days: {days}")
    print(f"  Note: {note}")
    if result['allowed']:
        print(f"  Capital: INR {result['capital_allocated']:,.0f}")
    print()

# Check for decay
print("=== Decay Detection ===")
for sharpe in [0.8, 0.5, 0.3, 0.2]:
    decay = manager.check_decay(sharpe, 0.08)
    if decay:
        print(f"Sharpe {sharpe}: DECAY DETECTED - {decay}")
    else:
        print(f"Sharpe {sharpe}: Normal")

print(f"\\n=== Final Report ===")
print(manager.generate_report())`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Capital Ramp-Up Schedules"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The transition from pilot to full production requires a carefully planned capital ramp-up. Too fast risks large losses on an unproven strategy; too slow misses alpha before it decays."}),e.jsx(i.BlockMath,{math:"C(t) = C_{\\max} \\cdot \\min\\left(1, \\frac{t}{T_{\\text{ramp}}}\\right) \\cdot \\prod_{i} \\mathbb{1}[\\text{check}_i(t)]"}),e.jsx(S,{title:"Strategy Retirement Decision",difficulty:"intermediate",problem:"Your NSE momentum strategy has been in production for 18 months. The rolling 60-day Sharpe has declined from 1.2 to 0.3. Daily volume in your traded stocks has increased 3x (more competition). Should you retire the strategy?",solution:[{step:"Evaluate performance decay",formula:"\\text{Sharpe decay} = \\frac{1.2 - 0.3}{1.2} = 75\\%",explanation:"A 75% decline in Sharpe ratio is severe and exceeds the typical 50% decay threshold for retirement consideration."},{step:"Assess structural factors",formula:"\\text{Volume increase} = 3\\times \\Rightarrow \\text{crowding signal}",explanation:"A 3x increase in volume on traded stocks suggests the alpha signal is being crowded by other quant traders, a structural change unlikely to reverse."},{step:"Run reversal probability analysis",formula:"P(\\text{recovery}) = P(\\text{Sharpe} > 0.7 | \\text{current} = 0.3, \\text{crowd} = 3\\times)",explanation:"With structural crowding, the probability of Sharpe recovering to viable levels (>0.7) is very low, estimated at <10% based on historical analysis of crowded strategies."},{step:"Retirement recommendation",formula:"\\text{Action: RETIRE with dignity}",explanation:"Move to DECAY stage immediately, reduce capital to 25% over 1 week, then fully retire over the next month. Document learnings for future strategy development. Do not throw good capital after bad alpha."}]}),e.jsxs(b,{title:"Strategy Governance for SEBI Compliance",type:"warning",children:[e.jsx("p",{children:"SEBI requires documentation and audit trails for all algorithmic trading strategies:"}),e.jsxs("ul",{className:"mt-2 list-disc list-inside space-y-1",children:[e.jsx("li",{children:"Each strategy must be registered with a unique algo ID on NSE/BSE"}),e.jsx("li",{children:"Strategy logic documentation must be available for SEBI inspection"}),e.jsx("li",{children:"All stage transitions must be logged with timestamps and approval records"}),e.jsx("li",{children:"Capital allocation changes require risk committee sign-off"}),e.jsx("li",{children:"Strategy retirement must include a post-mortem analysis"}),e.jsx("li",{children:"All records must be retained for 5+ years"})]})]}),e.jsx(b,{title:"Key Takeaway",type:"tip",children:e.jsxs("p",{children:["Strategy lifecycle management is the ",e.jsx("strong",{children:"discipline that separates professional quant firms from hobbyist traders"}),". Every strategy must progress through defined stages with quantitative gate criteria. Never skip stages -- a strategy that looks great in backtesting must still prove itself in paper trading and pilot before receiving significant capital. And know when to retire: the best traders let go of dying strategies quickly and redeploy capital to fresh opportunities."]})})]})}const me=Object.freeze(Object.defineProperty({__proto__:null,default:X},Symbol.toStringTag,{value:"Module"}));function Q(){const[r,y]=n.useState(!0),[t,h]=n.useState(!0),[s,g]=n.useState(!0),[a,p]=n.useState(!0),[o,d]=n.useState(!1),[m,f]=n.useState(5),l=[{name:"Algo Registration (SEBI)",met:r,setter:y,required:!0},{name:"Kill Switch",met:t,setter:h,required:!0},{name:"Pre-Trade Risk Checks",met:s,setter:g,required:!0},{name:"Audit Trail Logging",met:a,setter:p,required:!0},{name:"OTR Monitoring",met:o,setter:d,required:!0},{name:`${m}yr Data Retention`,met:m>=5,setter:null,required:!0}],u=l.filter(x=>x.met).length,c=l.length,N=u/c*100;return e.jsxs("div",{className:"my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50",children:[e.jsx("h3",{className:"mb-1 text-base font-bold text-gray-800 dark:text-gray-200",children:"Interactive: SEBI Compliance Checklist"}),e.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"Toggle compliance requirements to see your SEBI readiness score for algo trading."}),e.jsx("div",{className:"mb-4 space-y-2",children:l.map((x,E)=>e.jsxs("div",{className:`flex items-center justify-between rounded-lg p-2 ${x.met?"bg-green-50 dark:bg-green-900/20":"bg-red-50 dark:bg-red-900/20"}`,children:[e.jsxs("label",{className:"flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer",children:[x.setter&&e.jsx("input",{type:"checkbox",checked:x.met,onChange:()=>x.setter(!x.met),className:"accent-indigo-500"}),x.name,x.required&&e.jsx("span",{className:"text-[10px] text-red-500",children:"MANDATORY"})]}),e.jsx("span",{className:`text-xs font-bold ${x.met?"text-green-600":"text-red-600"}`,children:x.met?"COMPLIANT":"NON-COMPLIANT"})]},E))}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("label",{className:"flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400 flex-1",children:[e.jsxs("span",{children:["Data Retention: ",m," years"]}),e.jsx("input",{type:"range",min:"1",max:"10",step:"1",value:m,onChange:x=>f(parseInt(x.target.value)),className:"h-2 w-full cursor-pointer accent-indigo-500"})]}),e.jsxs("div",{className:`rounded-lg p-3 text-center ${N===100?"bg-green-100 dark:bg-green-900/40":"bg-red-100 dark:bg-red-900/40"}`,children:[e.jsx("div",{className:"text-xs text-gray-500",children:"Compliance"}),e.jsxs("div",{className:`text-xl font-bold ${N===100?"text-green-600":"text-red-600"}`,children:[N.toFixed(0),"%"]})]})]})]})}function J(){return e.jsxs("div",{className:"space-y-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-800 dark:text-gray-100",children:"SEBI Compliance and Audit Trails"}),e.jsx("p",{className:"text-gray-700 dark:text-gray-300 leading-relaxed",children:"Algorithmic trading in India is regulated by SEBI under multiple circulars that mandate specific compliance requirements. Every algo trading system must maintain comprehensive audit trails, report to exchanges, and satisfy regulatory inspections. Non-compliance can result in trading bans and significant penalties."}),e.jsx(j,{title:"SEBI Algo Trading Regulations",label:"Definition 18.11",definition:"SEBI (Securities and Exchange Board of India) regulates algorithmic trading through circulars including SEBI/HO/MRD/DP/CIR/P/2019/62 and subsequent amendments. Key requirements include: algo registration with unique IDs, pre-trade risk management, kill switch capability, order-to-trade ratio limits, audit trail maintenance for 5+ years, and regular compliance reporting to exchanges.",notation:"Non-compliance penalties: INR 1 lakh per instance for minor violations, trading suspension for major violations."}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Regulatory Framework"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The SEBI regulatory framework for algo trading has evolved significantly since 2012. Key circulars and their requirements:"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"mx-auto my-4 text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b-2 border-gray-300 dark:border-gray-600",children:[e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"Circular"}),e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"Year"}),e.jsx("th",{className:"px-3 py-2 text-left text-gray-600 dark:text-gray-400",children:"Key Requirement"})]})}),e.jsxs("tbody",{className:"text-gray-700 dark:text-gray-300",children:[e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2",children:"CIR/MRD/DP/09/2012"}),e.jsx("td",{className:"px-3 py-2",children:"2012"}),e.jsx("td",{className:"px-3 py-2",children:"Algo trading framework, exchange approval"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2",children:"CIR/MRD/DP/16/2013"}),e.jsx("td",{className:"px-3 py-2",children:"2013"}),e.jsx("td",{className:"px-3 py-2",children:"Co-location facilities regulation"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2",children:"SEBI/HO/MRD/DP/2019"}),e.jsx("td",{className:"px-3 py-2",children:"2019"}),e.jsx("td",{className:"px-3 py-2",children:"Enhanced risk management, kill switch"})]}),e.jsxs("tr",{className:"border-b border-gray-200 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2",children:"SEBI/HO/MIRSD/2022"}),e.jsx("td",{className:"px-3 py-2",children:"2022"}),e.jsx("td",{className:"px-3 py-2",children:"Retail algo trading via API brokers"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-3 py-2",children:"SEBI Consultation Paper"}),e.jsx("td",{className:"px-3 py-2",children:"2023"}),e.jsx("td",{className:"px-3 py-2",children:"Proposed: broker-level algo approval"})]})]})]})}),e.jsx(Q,{}),e.jsx(v,{title:"Audit Trail Completeness",label:"Theorem 18.11",statement:"A complete audit trail for SEBI compliance must capture every state transition in the order lifecycle. For each order $o$, the audit record $A(o)$ must contain: $A(o) = \\{t_{\\text{gen}}, t_{\\text{risk}}, t_{\\text{submit}}, t_{\\text{ack}}, t_{\\text{fill}}, p_{\\text{fill}}, q_{\\text{fill}}, \\text{algo\\_id}, \\text{strategy\\_id}, \\text{user\\_id}\\}$. The cardinality of daily audit records is $|A| = N_{\\text{orders}} \\times k$ where $k \\geq 10$ state transitions per order.",proof:"Each order generates at minimum: creation, risk check, submission, exchange acknowledgment, and fill/cancel events. For partial fills, additional records are generated. SEBI requires that the complete chain from signal generation to fill is traceable, with microsecond timestamps. For a system generating 500 orders/day, this produces approximately 5,000+ audit records daily, or 1.3M+ annually."}),e.jsx(k,{title:"compliance_engine.py",runnable:!0,code:`import json
import hashlib
from datetime import datetime
from dataclasses import dataclass, field, asdict
from typing import List, Dict, Optional
from enum import Enum

class OrderEvent(Enum):
    SIGNAL_GENERATED = 'SIGNAL_GENERATED'
    RISK_CHECK_PASS = 'RISK_CHECK_PASS'
    RISK_CHECK_FAIL = 'RISK_CHECK_FAIL'
    ORDER_SUBMITTED = 'ORDER_SUBMITTED'
    ORDER_ACKNOWLEDGED = 'ORDER_ACKNOWLEDGED'
    ORDER_REJECTED = 'ORDER_REJECTED'
    PARTIAL_FILL = 'PARTIAL_FILL'
    FULL_FILL = 'FULL_FILL'
    ORDER_CANCELLED = 'ORDER_CANCELLED'
    ORDER_MODIFIED = 'ORDER_MODIFIED'

@dataclass
class AuditRecord:
    """SEBI-compliant audit trail record."""
    timestamp: str
    event_type: str
    order_id: str
    algo_id: str
    strategy_id: str
    symbol: str
    exchange: str
    side: str
    quantity: int
    price: float
    fill_price: Optional[float] = None
    fill_quantity: Optional[int] = None
    risk_check_details: Optional[Dict] = None
    latency_us: Optional[int] = None
    user_id: str = 'SYSTEM'
    checksum: str = ''

    def __post_init__(self):
        # Generate integrity checksum
        data = f"{self.timestamp}{self.order_id}{self.event_type}"
        self.checksum = hashlib.sha256(data.encode()).hexdigest()[:16]

class ComplianceEngine:
    """SEBI compliance and audit trail management."""

    def __init__(self, algo_id: str, broker: str = 'zerodha'):
        self.algo_id = algo_id
        self.broker = broker
        self.audit_log: List[AuditRecord] = []
        self.daily_stats = {
            'orders_submitted': 0,
            'orders_filled': 0,
            'orders_rejected': 0,
            'orders_cancelled': 0,
            'risk_check_failures': 0,
            'total_turnover': 0.0,
            'kill_switch_activations': 0,
        }

    def log_event(self, event_type: OrderEvent, order_id: str,
                  strategy_id: str, symbol: str, exchange: str,
                  side: str, quantity: int, price: float,
                  **kwargs) -> AuditRecord:
        """Log an audit event."""
        record = AuditRecord(
            timestamp=datetime.now().isoformat(timespec='microseconds'),
            event_type=event_type.value,
            order_id=order_id,
            algo_id=self.algo_id,
            strategy_id=strategy_id,
            symbol=symbol,
            exchange=exchange,
            side=side,
            quantity=quantity,
            price=price,
            fill_price=kwargs.get('fill_price'),
            fill_quantity=kwargs.get('fill_quantity'),
            risk_check_details=kwargs.get('risk_details'),
            latency_us=kwargs.get('latency_us'),
        )
        self.audit_log.append(record)

        # Update daily stats
        if event_type == OrderEvent.ORDER_SUBMITTED:
            self.daily_stats['orders_submitted'] += 1
        elif event_type == OrderEvent.FULL_FILL:
            self.daily_stats['orders_filled'] += 1
            self.daily_stats['total_turnover'] += quantity * (kwargs.get('fill_price', price))
        elif event_type == OrderEvent.ORDER_REJECTED:
            self.daily_stats['orders_rejected'] += 1
        elif event_type == OrderEvent.RISK_CHECK_FAIL:
            self.daily_stats['risk_check_failures'] += 1

        return record

    def get_order_to_trade_ratio(self) -> float:
        """Calculate current OTR (SEBI limit: 50:1)."""
        if self.daily_stats['orders_filled'] == 0:
            return float(self.daily_stats['orders_submitted'])
        return (self.daily_stats['orders_submitted'] /
                self.daily_stats['orders_filled'])

    def generate_daily_report(self) -> dict:
        """Generate SEBI-format daily compliance report."""
        otr = self.get_order_to_trade_ratio()
        return {
            'date': datetime.now().strftime('%Y-%m-%d'),
            'algo_id': self.algo_id,
            'broker': self.broker,
            'exchange': 'NSE',
            'total_orders': self.daily_stats['orders_submitted'],
            'total_fills': self.daily_stats['orders_filled'],
            'total_rejections': self.daily_stats['orders_rejected'],
            'total_cancellations': self.daily_stats['orders_cancelled'],
            'risk_check_failures': self.daily_stats['risk_check_failures'],
            'order_to_trade_ratio': otr,
            'otr_compliant': otr <= 50.0,
            'total_turnover_inr': self.daily_stats['total_turnover'],
            'kill_switch_activations': self.daily_stats['kill_switch_activations'],
            'audit_records_count': len(self.audit_log),
            'data_integrity': all(r.checksum for r in self.audit_log),
        }

    def generate_sebi_report(self, period_days: int = 30) -> dict:
        """Generate monthly SEBI compliance report."""
        return {
            'report_period': f"{period_days} days",
            'algo_id': self.algo_id,
            'total_audit_records': len(self.audit_log),
            'storage_size_mb': len(self.audit_log) * 0.002,
            'retention_years': 5,
            'data_integrity_check': 'PASSED',
            'risk_checks_implemented': [
                'price_band', 'quantity_limit', 'order_value',
                'concentration', 'sector_exposure', 'gross_exposure',
                'daily_loss', 'rate_limit', 'otr_check'
            ],
            'kill_switch_status': 'OPERATIONAL',
            'kill_switch_last_test': '2024-01-15',
        }

    def verify_audit_integrity(self) -> dict:
        """Verify audit trail integrity."""
        valid = 0
        invalid = 0
        for record in self.audit_log:
            data = f"{record.timestamp}{record.order_id}{record.event_type}"
            expected = hashlib.sha256(data.encode()).hexdigest()[:16]
            if record.checksum == expected:
                valid += 1
            else:
                invalid += 1

        return {
            'total_records': len(self.audit_log),
            'valid': valid,
            'invalid': invalid,
            'integrity': 'PASSED' if invalid == 0 else 'FAILED',
        }

# Demo: Compliance engine in action
engine = ComplianceEngine(algo_id='ALGO_NM_2024_001', broker='zerodha')

# Simulate a trading day
import random
random.seed(42)

symbols = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK']
prices = [2450, 3500, 1680, 1450, 1025]

for i in range(50):
    idx = i % len(symbols)
    side = 'BUY' if random.random() > 0.4 else 'SELL'
    qty = random.choice([50, 100, 200])
    price = prices[idx] * (1 + random.uniform(-0.02, 0.02))
    order_id = f"ORD{i+1:04d}"

    # Log signal
    engine.log_event(OrderEvent.SIGNAL_GENERATED, order_id,
                     'MOMENTUM_V3', symbols[idx], 'NSE', side, qty, price)

    # Log risk check
    risk_pass = random.random() > 0.1
    if risk_pass:
        engine.log_event(OrderEvent.RISK_CHECK_PASS, order_id,
                         'MOMENTUM_V3', symbols[idx], 'NSE', side, qty, price,
                         risk_details={'all_checks': 'PASS'})
        engine.log_event(OrderEvent.ORDER_SUBMITTED, order_id,
                         'MOMENTUM_V3', symbols[idx], 'NSE', side, qty, price)

        if random.random() > 0.15:
            fill_price = price * (1 + random.uniform(-0.001, 0.001))
            engine.log_event(OrderEvent.FULL_FILL, order_id,
                             'MOMENTUM_V3', symbols[idx], 'NSE', side, qty, price,
                             fill_price=fill_price, fill_quantity=qty,
                             latency_us=random.randint(30000, 200000))
        else:
            engine.log_event(OrderEvent.ORDER_CANCELLED, order_id,
                             'MOMENTUM_V3', symbols[idx], 'NSE', side, qty, price)
            engine.daily_stats['orders_cancelled'] += 1
    else:
        engine.log_event(OrderEvent.RISK_CHECK_FAIL, order_id,
                         'MOMENTUM_V3', symbols[idx], 'NSE', side, qty, price,
                         risk_details={'failed_check': 'CONCENTRATION'})

# Generate reports
daily = engine.generate_daily_report()
print("=== Daily Compliance Report ===")
for key, val in daily.items():
    print(f"  {key:30s}: {val}")

integrity = engine.verify_audit_integrity()
print(f"\\n=== Audit Trail Integrity ===")
for key, val in integrity.items():
    print(f"  {key:20s}: {val}")

sebi = engine.generate_sebi_report()
print(f"\\n=== SEBI Monthly Report ===")
for key, val in sebi.items():
    if isinstance(val, list):
        print(f"  {key}: {', '.join(val)}")
    else:
        print(f"  {key:30s}: {val}")`}),e.jsx("h3",{className:"text-xl font-semibold text-gray-800 dark:text-gray-100",children:"Audit Trail Design"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The audit trail must capture the complete order lifecycle with tamper-evident checksums. For SEBI compliance, each record must include:"}),e.jsx(i.BlockMath,{math:"\\text{AuditRecord} = \\{t_{\\mu s}, \\text{event}, \\text{order\\_id}, \\text{algo\\_id}, \\text{symbol}, \\text{exchange}, \\text{side}, q, p, \\text{hash}\\}"}),e.jsx("p",{className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:"The integrity hash ensures records cannot be tampered with after the fact:"}),e.jsx(i.BlockMath,{math:"\\text{hash}_i = \\text{SHA256}(t_i \\| \\text{order\\_id}_i \\| \\text{event}_i \\| \\text{hash}_{i-1})"}),e.jsx(S,{title:"SEBI Inspection Preparation",difficulty:"intermediate",problem:"SEBI sends a notice for inspection of your algo trading system. They request: (1) all audit records for the past 6 months, (2) kill switch test logs, (3) OTR reports, and (4) strategy documentation. How do you prepare?",solution:[{step:"Extract audit records",formula:"N_{\\text{records}} \\approx 500 \\text{ orders/day} \\times 10 \\text{ events} \\times 130 \\text{ days} = 650,000",explanation:"Export all 650K audit records from TimescaleDB in the SEBI-specified format (CSV or JSON). Include integrity checksums for verification."},{step:"Kill switch test logs",formula:"N_{\\text{tests}} = 26 \\text{ (weekly tests over 6 months)}",explanation:"Provide records of all weekly kill switch tests, including: test timestamp, response time, number of orders cancelled, and sign-off from the compliance officer."},{step:"OTR compliance report",formula:"\\text{OTR}_{\\text{daily}} = \\frac{N_{\\text{orders}}}{N_{\\text{fills}}} \\leq 50:1",explanation:"Generate daily OTR reports showing compliance with the 50:1 limit. Flag any dates where OTR exceeded 40:1 with explanations."},{step:"Strategy documentation",formula:"\\text{Docs} = \\{\\text{strategy logic}, \\text{risk params}, \\text{lifecycle history}\\}",explanation:"Prepare strategy documentation including: the trading logic (without proprietary details), risk parameters, all stage transitions, and the gate criteria used for each transition."}]}),e.jsxs(b,{title:"Data Retention Requirements",type:"warning",children:[e.jsx("p",{children:"SEBI mandates minimum data retention periods for different types of records:"}),e.jsxs("ul",{className:"mt-2 list-disc list-inside space-y-1",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Order audit trails:"})," 5 years minimum"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Trade confirmations:"})," 5 years minimum"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Risk check logs:"})," 5 years minimum"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Kill switch activation logs:"})," 5 years minimum"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Strategy documentation:"})," Lifetime of strategy + 5 years"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Client communication records:"})," 5 years (if applicable)"]})]}),e.jsx("p",{className:"mt-2",children:"Use append-only storage (S3 Glacier, write-once databases) for tamper resistance. Estimated storage for 5 years: 10-50 GB depending on trading frequency."})]}),e.jsx(b,{title:"Key Takeaway",type:"tip",children:e.jsxs("p",{children:["SEBI compliance is ",e.jsx("strong",{children:"not optional"})," for algorithmic trading in India. Build compliance into your system architecture from day one, not as an afterthought. Every order must generate a complete audit trail with integrity checksums. Kill switches must be tested weekly. OTR must be monitored in real-time. And all records must be retained for at least 5 years. The cost of compliance is small; the cost of non-compliance -- trading bans, penalties, reputation damage -- can be career-ending."]})})]})}const xe=Object.freeze(Object.defineProperty({__proto__:null,default:J},Symbol.toStringTag,{value:"Module"}));export{se as a,ie as b,le as c,ne as d,oe as e,de as f,ce as g,pe as h,me as i,xe as j,re as s};
