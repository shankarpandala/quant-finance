import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveCostEstimator() {
  const [instances, setInstances] = useState(2)
  const [instanceType, setInstanceType] = useState('medium')
  const [storage, setStorage] = useState(100)
  const [bandwidth, setBandwidth] = useState(50)

  const costs = {
    small: { hourly: 0.0416, name: 't3.small', vcpu: 2, ram: 2 },
    medium: { hourly: 0.0832, name: 't3.medium', vcpu: 2, ram: 4 },
    large: { hourly: 0.1664, name: 't3.large', vcpu: 2, ram: 8 },
    xlarge: { hourly: 0.3328, name: 'c5.xlarge', vcpu: 4, ram: 8 },
  }

  const selected = costs[instanceType]
  const computeCost = selected.hourly * 730 * instances
  const storageCost = storage * 0.10
  const bandwidthCost = bandwidth * 0.09
  const redisCost = 25
  const totalUSD = computeCost + storageCost + bandwidthCost + redisCost
  const totalINR = totalUSD * 83

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: AWS Mumbai Cloud Cost Estimator
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Estimate monthly cloud costs for running a trading system on AWS ap-south-1 (Mumbai).
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Instances: {instances}</span>
          <input type="range" min="1" max="10" step="1" value={instances}
            onChange={e => setInstances(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Type: {selected.name}</span>
          <select value={instanceType} onChange={e => setInstanceType(e.target.value)}
            className="rounded border p-1 text-xs dark:bg-gray-800 dark:border-gray-600">
            <option value="small">t3.small (2GB)</option>
            <option value="medium">t3.medium (4GB)</option>
            <option value="large">t3.large (8GB)</option>
            <option value="xlarge">c5.xlarge (8GB)</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Storage (GB): {storage}</span>
          <input type="range" min="20" max="1000" step="10" value={storage}
            onChange={e => setStorage(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Bandwidth (GB): {bandwidth}</span>
          <input type="range" min="1" max="500" step="5" value={bandwidth}
            onChange={e => setBandwidth(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 text-center">
        <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-900/30">
          <div className="text-[10px] text-gray-500">Compute</div>
          <div className="text-sm font-bold text-blue-600">${computeCost.toFixed(0)}</div>
        </div>
        <div className="rounded-lg bg-purple-50 p-2 dark:bg-purple-900/30">
          <div className="text-[10px] text-gray-500">Storage</div>
          <div className="text-sm font-bold text-purple-600">${storageCost.toFixed(0)}</div>
        </div>
        <div className="rounded-lg bg-orange-50 p-2 dark:bg-orange-900/30">
          <div className="text-[10px] text-gray-500">Bandwidth</div>
          <div className="text-sm font-bold text-orange-600">${bandwidthCost.toFixed(0)}</div>
        </div>
        <div className="rounded-lg bg-green-50 p-2 dark:bg-green-900/30">
          <div className="text-[10px] text-gray-500">Redis Cache</div>
          <div className="text-sm font-bold text-green-600">${redisCost}</div>
        </div>
        <div className="rounded-lg bg-red-50 p-2 dark:bg-red-900/30">
          <div className="text-[10px] text-gray-500">Total (INR)</div>
          <div className="text-sm font-bold text-red-600">INR {(totalINR / 1000).toFixed(1)}K</div>
        </div>
      </div>
    </div>
  )
}

export default function CloudDeployment() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        AWS/GCP Deployment for Indian Trading Systems
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Cloud deployment for Indian trading systems requires careful region selection,
        latency optimization, and cost management. Both AWS (ap-south-1, Mumbai) and
        GCP (asia-south1, Mumbai) have data centers in India, providing sub-10ms
        connectivity to NSE/BSE colocation facilities.
      </p>

      <DefinitionBlock
        title="Cloud-Native Trading Infrastructure"
        label="Definition 18.6"
        definition="Cloud-native trading infrastructure leverages managed cloud services (compute, storage, messaging, monitoring) to run algorithmic trading systems. For Indian markets, the Mumbai region provides the lowest latency to NSE and BSE exchanges, with typical round-trip times of 5--15ms to broker APIs."
        notation="AWS ap-south-1 (Mumbai) and GCP asia-south1 (Mumbai) are the primary choices for Indian quant trading."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Architecture for Cloud Trading
      </h3>

      <div className="my-6 flex justify-center">
        <svg viewBox="0 0 640 320" className="w-full max-w-2xl" aria-label="Cloud architecture diagram">
          <defs>
            <marker id="cloudArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#6366f1" />
            </marker>
          </defs>

          {/* VPC boundary */}
          <rect x="10" y="10" width="620" height="300" rx="12" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="6" />
          <text x="30" y="30" className="text-[11px] font-bold" fill="#64748b">AWS VPC (ap-south-1, Mumbai)</text>

          {/* Public subnet */}
          <rect x="30" y="45" width="180" height="120" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" opacity="0.5" />
          <text x="40" y="62" className="text-[10px] font-semibold" fill="#1d4ed8">Public Subnet</text>

          <rect x="45" y="72" width="150" height="35" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1" />
          <text x="120" y="94" textAnchor="middle" className="text-[9px] font-medium" fill="#1d4ed8">API Gateway + ALB</text>

          <rect x="45" y="115" width="150" height="35" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1" />
          <text x="120" y="137" textAnchor="middle" className="text-[9px] font-medium" fill="#1d4ed8">Monitoring Dashboard</text>

          {/* Private subnet - compute */}
          <rect x="230" y="45" width="200" height="120" rx="8" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1" opacity="0.5" />
          <text x="240" y="62" className="text-[10px] font-semibold" fill="#6d28d9">Private Subnet (Compute)</text>

          <rect x="245" y="72" width="80" height="35" rx="4" fill="#faf5ff" stroke="#8b5cf6" strokeWidth="1" />
          <text x="285" y="94" textAnchor="middle" className="text-[9px]" fill="#6d28d9">Signal Gen</text>

          <rect x="335" y="72" width="80" height="35" rx="4" fill="#faf5ff" stroke="#8b5cf6" strokeWidth="1" />
          <text x="375" y="94" textAnchor="middle" className="text-[9px]" fill="#6d28d9">Risk Engine</text>

          <rect x="245" y="115" width="80" height="35" rx="4" fill="#faf5ff" stroke="#8b5cf6" strokeWidth="1" />
          <text x="285" y="137" textAnchor="middle" className="text-[9px]" fill="#6d28d9">OMS</text>

          <rect x="335" y="115" width="80" height="35" rx="4" fill="#faf5ff" stroke="#8b5cf6" strokeWidth="1" />
          <text x="375" y="137" textAnchor="middle" className="text-[9px]" fill="#6d28d9">Execution</text>

          {/* Private subnet - data */}
          <rect x="450" y="45" width="170" height="120" rx="8" fill="#dcfce7" stroke="#22c55e" strokeWidth="1" opacity="0.5" />
          <text x="460" y="62" className="text-[10px] font-semibold" fill="#15803d">Private Subnet (Data)</text>

          <rect x="465" y="72" width="140" height="35" rx="4" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1" />
          <text x="535" y="94" textAnchor="middle" className="text-[9px]" fill="#15803d">TimescaleDB (RDS)</text>

          <rect x="465" y="115" width="140" height="35" rx="4" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1" />
          <text x="535" y="137" textAnchor="middle" className="text-[9px]" fill="#15803d">ElastiCache (Redis)</text>

          {/* Bottom row - external connections */}
          <rect x="30" y="200" width="140" height="50" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="100" y="222" textAnchor="middle" className="text-[10px] font-bold" fill="#b45309">NSE/BSE</text>
          <text x="100" y="238" textAnchor="middle" className="text-[9px]" fill="#d97706">Exchange</text>

          <rect x="190" y="200" width="140" height="50" rx="8" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5" />
          <text x="260" y="222" textAnchor="middle" className="text-[10px] font-bold" fill="#be185d">Zerodha API</text>
          <text x="260" y="238" textAnchor="middle" className="text-[9px]" fill="#ec4899">Kite Connect</text>

          <rect x="350" y="200" width="140" height="50" rx="8" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
          <text x="420" y="222" textAnchor="middle" className="text-[10px] font-bold" fill="#0369a1">CloudWatch</text>
          <text x="420" y="238" textAnchor="middle" className="text-[9px]" fill="#0ea5e9">Monitoring</text>

          <rect x="510" y="200" width="110" height="50" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
          <text x="565" y="222" textAnchor="middle" className="text-[10px] font-bold" fill="#b91c1c">SNS/SES</text>
          <text x="565" y="238" textAnchor="middle" className="text-[9px]" fill="#ef4444">Alerts</text>

          {/* Connections */}
          <line x1="100" y1="200" x2="285" y2="165" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#cloudArrow)" />
          <line x1="260" y1="200" x2="375" y2="152" stroke="#ec4899" strokeWidth="1.5" markerEnd="url(#cloudArrow)" />

          <text x="320" y="290" textAnchor="middle" className="text-[11px]" fill="#6b7280">
            Estimated latency to NSE: 5-15ms from AWS Mumbai
          </text>
        </svg>
      </div>

      <InteractiveCostEstimator />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Latency Optimization
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Network latency from AWS Mumbai to NSE can be modeled as:
      </p>

      <BlockMath math="L_{\text{network}} = L_{\text{propagation}} + L_{\text{serialization}} + L_{\text{queuing}} + L_{\text{processing}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For a typical Zerodha Kite API call from AWS ap-south-1:
      </p>

      <BlockMath math="L_{\text{total}} \approx 2\text{ms} + 1\text{ms} + 3\text{ms} + 5\text{ms} = 11\text{ms}" />

      <TheoremBlock
        title="Cloud vs Colocation Cost-Benefit"
        label="Theorem 18.6"
        statement="For a strategy with annualized Sharpe $S$ and latency sensitivity $\lambda$ (bps/ms), the breakeven infrastructure cost is: $C_{\text{max}} = S \cdot \sigma \cdot \text{AUM} \cdot \lambda \cdot \Delta L / \sqrt{252}$ where $\Delta L$ is the latency improvement from colocation. For retail Indian quant traders with AUM < INR 5 Cr, cloud deployment is optimal when $\lambda < 0.1$ bps/ms."
        proof="The value of latency reduction is proportional to the Sharpe ratio (more signals exploited) and the strategy's latency sensitivity. NSE colocation costs approximately INR 50L/year, while cloud costs INR 3-5L/year. The crossover occurs at AUM of approximately INR 20-50 Cr depending on strategy frequency."
      />

      <PythonCode
        title="cloud_deployment_config.py"
        runnable
        code={`import json
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
print(spec.generate_docker_compose()[:500] + "...")`}
      />

      <ExampleBlock
        title="Disaster Recovery Planning"
        difficulty="advanced"
        problem="Your trading system runs on 2 EC2 instances in AWS ap-south-1a. Design a disaster recovery plan that ensures positions are safe during an AZ outage at 2 PM IST (during NSE trading hours)."
        solution={[
          {
            step: 'Multi-AZ deployment',
            formula: 'P(\\text{AZ failure}) \\approx 0.01\\% \\text{ per year}',
            explanation: 'Deploy identical instances in ap-south-1a and ap-south-1b. Use an ALB to route traffic to the healthy AZ.',
          },
          {
            step: 'Position state replication',
            formula: 'RPO \\leq 1\\text{s}, \\; RTO \\leq 30\\text{s}',
            explanation: 'Recovery Point Objective (RPO) of 1 second ensures no more than 1 second of position state is lost. Recovery Time Objective (RTO) of 30 seconds means the standby instance takes over within 30 seconds.',
          },
          {
            step: 'Failover procedure',
            formula: '\\text{Failover: } t_{\\text{detect}} + t_{\\text{switch}} + t_{\\text{verify}} \\leq 30\\text{s}',
            explanation: 'On AZ failure: (1) heartbeat detection in 5s, (2) DNS failover in 10s, (3) position reconciliation in 15s. During failover, the risk engine blocks new orders as a safety measure.',
          },
          {
            step: 'Position safety',
            formula: '\\text{Open positions hedged by SL orders on exchange}',
            explanation: 'All open positions must have stop-loss orders placed directly on NSE (not managed locally). This ensures positions are protected even if both AZs fail simultaneously.',
          },
        ]}
      />

      <NoteBlock title="Cost Optimization Tips" type="tip">
        <p>
          Reduce cloud costs for Indian trading systems:
        </p>
        <ul className="mt-2 list-disc list-inside space-y-1">
          <li>Use <strong>Spot Instances</strong> for backtesting and research (70% cheaper)</li>
          <li>Use <strong>Reserved Instances</strong> for trading servers (40% cheaper for 1-year commitment)</li>
          <li>Run trading instances only during market hours (9:00 AM -- 4:00 PM IST) to save 60%</li>
          <li>Use <strong>S3 Intelligent-Tiering</strong> for historical market data storage</li>
          <li>Implement <strong>auto-scaling</strong> for signal computation during high-volatility periods</li>
          <li>Consider <strong>AWS Graviton</strong> instances for 20% cost reduction on compute</li>
        </ul>
      </NoteBlock>

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Cloud deployment on AWS Mumbai or GCP Mumbai provides the ideal balance of{' '}
          <strong>latency, reliability, and cost</strong> for retail quant trading on NSE/BSE.
          Start with a Docker-based local setup, graduate to a single EC2 instance for paper
          trading, and scale to multi-AZ production for live trading. Monthly costs for a
          production-grade setup range from INR 15,000--50,000 depending on instance sizes
          and data storage requirements.
        </p>
      </NoteBlock>
    </div>
  )
}
