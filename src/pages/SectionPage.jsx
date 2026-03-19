import { useParams, Link } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { getCurriculumById, getChapterById, getSectionById } from '../subjects/index.js'

const CONTENT_REGISTRY = {
  '01-math-foundations/c1-probability-statistics/s1-probability-distributions': lazy(() => import('../subjects/01-math-foundations/c1-probability-statistics/s1-probability-distributions.jsx')),
  '01-math-foundations/c1-probability-statistics/s2-statistical-inference': lazy(() => import('../subjects/01-math-foundations/c1-probability-statistics/s2-statistical-inference.jsx')),
  '01-math-foundations/c1-probability-statistics/s3-bayesian-foundations': lazy(() => import('../subjects/01-math-foundations/c1-probability-statistics/s3-bayesian-foundations.jsx')),
  '01-math-foundations/c2-linear-algebra/s1-matrix-operations': lazy(() => import('../subjects/01-math-foundations/c2-linear-algebra/s1-matrix-operations.jsx')),
  '01-math-foundations/c2-linear-algebra/s2-pca-svd': lazy(() => import('../subjects/01-math-foundations/c2-linear-algebra/s2-pca-svd.jsx')),
  '01-math-foundations/c3-stochastic-calculus/s1-brownian-motion': lazy(() => import('../subjects/01-math-foundations/c3-stochastic-calculus/s1-brownian-motion.jsx')),
  '01-math-foundations/c3-stochastic-calculus/s2-itos-lemma': lazy(() => import('../subjects/01-math-foundations/c3-stochastic-calculus/s2-itos-lemma.jsx')),
  '01-math-foundations/c3-stochastic-calculus/s3-sde-simulation': lazy(() => import('../subjects/01-math-foundations/c3-stochastic-calculus/s3-sde-simulation.jsx')),
  '01-math-foundations/c4-time-series-math/s1-stationarity-ergodicity': lazy(() => import('../subjects/01-math-foundations/c4-time-series-math/s1-stationarity-ergodicity.jsx')),
  '01-math-foundations/c4-time-series-math/s2-arima-foundations': lazy(() => import('../subjects/01-math-foundations/c4-time-series-math/s2-arima-foundations.jsx')),
  '01-math-foundations/c4-time-series-math/s3-cointegration': lazy(() => import('../subjects/01-math-foundations/c4-time-series-math/s3-cointegration.jsx')),
  '02-financial-markets/c1-market-structure/s1-exchanges-venues': lazy(() => import('../subjects/02-financial-markets/c1-market-structure/s1-exchanges-venues.jsx')),
  '02-financial-markets/c1-market-structure/s2-order-types': lazy(() => import('../subjects/02-financial-markets/c1-market-structure/s2-order-types.jsx')),
  '02-financial-markets/c1-market-structure/s3-matching-engines': lazy(() => import('../subjects/02-financial-markets/c1-market-structure/s3-matching-engines.jsx')),
  '02-financial-markets/c2-asset-classes/s1-equities-etfs': lazy(() => import('../subjects/02-financial-markets/c2-asset-classes/s1-equities-etfs.jsx')),
  '02-financial-markets/c2-asset-classes/s2-fixed-income': lazy(() => import('../subjects/02-financial-markets/c2-asset-classes/s2-fixed-income.jsx')),
  '02-financial-markets/c2-asset-classes/s3-derivatives-overview': lazy(() => import('../subjects/02-financial-markets/c2-asset-classes/s3-derivatives-overview.jsx')),
  '02-financial-markets/c3-market-data/s1-data-sources': lazy(() => import('../subjects/02-financial-markets/c3-market-data/s1-data-sources.jsx')),
  '02-financial-markets/c3-market-data/s2-data-cleaning': lazy(() => import('../subjects/02-financial-markets/c3-market-data/s2-data-cleaning.jsx')),
  '02-financial-markets/c4-transaction-costs/s1-cost-components': lazy(() => import('../subjects/02-financial-markets/c4-transaction-costs/s1-cost-components.jsx')),
  '02-financial-markets/c4-transaction-costs/s2-modeling-impact': lazy(() => import('../subjects/02-financial-markets/c4-transaction-costs/s2-modeling-impact.jsx')),
  '03-return-risk-metrics/c1-return-measures/s1-simple-log-returns': lazy(() => import('../subjects/03-return-risk-metrics/c1-return-measures/s1-simple-log-returns.jsx')),
  '03-return-risk-metrics/c1-return-measures/s2-excess-returns': lazy(() => import('../subjects/03-return-risk-metrics/c1-return-measures/s2-excess-returns.jsx')),
  '03-return-risk-metrics/c1-return-measures/s3-risk-adjusted-returns': lazy(() => import('../subjects/03-return-risk-metrics/c1-return-measures/s3-risk-adjusted-returns.jsx')),
  '03-return-risk-metrics/c2-risk-measures/s1-volatility': lazy(() => import('../subjects/03-return-risk-metrics/c2-risk-measures/s1-volatility.jsx')),
  '03-return-risk-metrics/c2-risk-measures/s2-var-cvar': lazy(() => import('../subjects/03-return-risk-metrics/c2-risk-measures/s2-var-cvar.jsx')),
  '03-return-risk-metrics/c2-risk-measures/s3-drawdown-analysis': lazy(() => import('../subjects/03-return-risk-metrics/c2-risk-measures/s3-drawdown-analysis.jsx')),
  '03-return-risk-metrics/c3-distribution-analysis/s1-fat-tails': lazy(() => import('../subjects/03-return-risk-metrics/c3-distribution-analysis/s1-fat-tails.jsx')),
  '03-return-risk-metrics/c3-distribution-analysis/s2-stable-distributions': lazy(() => import('../subjects/03-return-risk-metrics/c3-distribution-analysis/s2-stable-distributions.jsx')),
  '03-return-risk-metrics/c4-performance-attribution/s1-pyfolio-empyrical': lazy(() => import('../subjects/03-return-risk-metrics/c4-performance-attribution/s1-pyfolio-empyrical.jsx')),
  '03-return-risk-metrics/c4-performance-attribution/s2-brinson-attribution': lazy(() => import('../subjects/03-return-risk-metrics/c4-performance-attribution/s2-brinson-attribution.jsx')),
  '03-return-risk-metrics/c4-performance-attribution/s3-risk-contribution': lazy(() => import('../subjects/03-return-risk-metrics/c4-performance-attribution/s3-risk-contribution.jsx')),
  '04-factor-models/c1-factor-investing/s1-capm-apt': lazy(() => import('../subjects/04-factor-models/c1-factor-investing/s1-capm-apt.jsx')),
  '04-factor-models/c1-factor-investing/s2-fama-french': lazy(() => import('../subjects/04-factor-models/c1-factor-investing/s2-fama-french.jsx')),
  '04-factor-models/c1-factor-investing/s3-factor-zoo': lazy(() => import('../subjects/04-factor-models/c1-factor-investing/s3-factor-zoo.jsx')),
  '04-factor-models/c2-alpha-signals/s1-signal-design': lazy(() => import('../subjects/04-factor-models/c2-alpha-signals/s1-signal-design.jsx')),
  '04-factor-models/c2-alpha-signals/s2-information-coefficient': lazy(() => import('../subjects/04-factor-models/c2-alpha-signals/s2-information-coefficient.jsx')),
  '04-factor-models/c2-alpha-signals/s3-turnover-decay': lazy(() => import('../subjects/04-factor-models/c2-alpha-signals/s3-turnover-decay.jsx')),
  '04-factor-models/c3-cross-sectional/s1-alphalens-pipeline': lazy(() => import('../subjects/04-factor-models/c3-cross-sectional/s1-alphalens-pipeline.jsx')),
  '04-factor-models/c3-cross-sectional/s2-style-factors': lazy(() => import('../subjects/04-factor-models/c3-cross-sectional/s2-style-factors.jsx')),
  '04-factor-models/c3-cross-sectional/s3-alternative-factors': lazy(() => import('../subjects/04-factor-models/c3-cross-sectional/s3-alternative-factors.jsx')),
  '04-factor-models/c4-factor-timing/s1-regime-detection': lazy(() => import('../subjects/04-factor-models/c4-factor-timing/s1-regime-detection.jsx')),
  '04-factor-models/c4-factor-timing/s2-factor-momentum': lazy(() => import('../subjects/04-factor-models/c4-factor-timing/s2-factor-momentum.jsx')),
  '05-algo-trading/c1-mean-reversion/s1-pairs-trading': lazy(() => import('../subjects/05-algo-trading/c1-mean-reversion/s1-pairs-trading.jsx')),
  '05-algo-trading/c1-mean-reversion/s2-stat-arb': lazy(() => import('../subjects/05-algo-trading/c1-mean-reversion/s2-stat-arb.jsx')),
  '05-algo-trading/c1-mean-reversion/s3-kalman-filters': lazy(() => import('../subjects/05-algo-trading/c1-mean-reversion/s3-kalman-filters.jsx')),
  '05-algo-trading/c2-momentum-trend/s1-time-series-momentum': lazy(() => import('../subjects/05-algo-trading/c2-momentum-trend/s1-time-series-momentum.jsx')),
  '05-algo-trading/c2-momentum-trend/s2-cross-sectional-momentum': lazy(() => import('../subjects/05-algo-trading/c2-momentum-trend/s2-cross-sectional-momentum.jsx')),
  '05-algo-trading/c2-momentum-trend/s3-managed-volatility': lazy(() => import('../subjects/05-algo-trading/c2-momentum-trend/s3-managed-volatility.jsx')),
  '05-algo-trading/c3-market-making/s1-market-making-basics': lazy(() => import('../subjects/05-algo-trading/c3-market-making/s1-market-making-basics.jsx')),
  '05-algo-trading/c3-market-making/s2-order-flow': lazy(() => import('../subjects/05-algo-trading/c3-market-making/s2-order-flow.jsx')),
  '05-algo-trading/c3-market-making/s3-latency-considerations': lazy(() => import('../subjects/05-algo-trading/c3-market-making/s3-latency-considerations.jsx')),
  '05-algo-trading/c4-event-driven/s1-earnings-strategies': lazy(() => import('../subjects/05-algo-trading/c4-event-driven/s1-earnings-strategies.jsx')),
  '05-algo-trading/c4-event-driven/s2-news-sentiment': lazy(() => import('../subjects/05-algo-trading/c4-event-driven/s2-news-sentiment.jsx')),
  '05-algo-trading/c5-execution-algos/s1-twap-vwap': lazy(() => import('../subjects/05-algo-trading/c5-execution-algos/s1-twap-vwap.jsx')),
  '05-algo-trading/c5-execution-algos/s2-optimal-execution': lazy(() => import('../subjects/05-algo-trading/c5-execution-algos/s2-optimal-execution.jsx')),
  '05-algo-trading/c5-execution-algos/s3-smart-order-routing': lazy(() => import('../subjects/05-algo-trading/c5-execution-algos/s3-smart-order-routing.jsx')),
  '06-options-pricing/c1-black-scholes/s1-bsm-derivation': lazy(() => import('../subjects/06-options-pricing/c1-black-scholes/s1-bsm-derivation.jsx')),
  '06-options-pricing/c1-black-scholes/s2-put-call-parity': lazy(() => import('../subjects/06-options-pricing/c1-black-scholes/s2-put-call-parity.jsx')),
  '06-options-pricing/c1-black-scholes/s3-quantlib-pricing': lazy(() => import('../subjects/06-options-pricing/c1-black-scholes/s3-quantlib-pricing.jsx')),
  '06-options-pricing/c2-greeks/s1-first-order-greeks': lazy(() => import('../subjects/06-options-pricing/c2-greeks/s1-first-order-greeks.jsx')),
  '06-options-pricing/c2-greeks/s2-higher-order-greeks': lazy(() => import('../subjects/06-options-pricing/c2-greeks/s2-higher-order-greeks.jsx')),
  '06-options-pricing/c2-greeks/s3-greek-hedging': lazy(() => import('../subjects/06-options-pricing/c2-greeks/s3-greek-hedging.jsx')),
  '06-options-pricing/c3-volatility-modeling/s1-implied-volatility': lazy(() => import('../subjects/06-options-pricing/c3-volatility-modeling/s1-implied-volatility.jsx')),
  '06-options-pricing/c3-volatility-modeling/s2-local-volatility': lazy(() => import('../subjects/06-options-pricing/c3-volatility-modeling/s2-local-volatility.jsx')),
  '06-options-pricing/c3-volatility-modeling/s3-stochastic-vol': lazy(() => import('../subjects/06-options-pricing/c3-volatility-modeling/s3-stochastic-vol.jsx')),
  '06-options-pricing/c4-numerical-methods/s1-binomial-trinomial': lazy(() => import('../subjects/06-options-pricing/c4-numerical-methods/s1-binomial-trinomial.jsx')),
  '06-options-pricing/c4-numerical-methods/s2-monte-carlo-options': lazy(() => import('../subjects/06-options-pricing/c4-numerical-methods/s2-monte-carlo-options.jsx')),
  '06-options-pricing/c4-numerical-methods/s3-finite-difference': lazy(() => import('../subjects/06-options-pricing/c4-numerical-methods/s3-finite-difference.jsx')),
  '07-options-strategies/c1-single-leg/s1-covered-calls': lazy(() => import('../subjects/07-options-strategies/c1-single-leg/s1-covered-calls.jsx')),
  '07-options-strategies/c1-single-leg/s2-protective-puts': lazy(() => import('../subjects/07-options-strategies/c1-single-leg/s2-protective-puts.jsx')),
  '07-options-strategies/c1-single-leg/s3-leaps-diagonal': lazy(() => import('../subjects/07-options-strategies/c1-single-leg/s3-leaps-diagonal.jsx')),
  '07-options-strategies/c2-multi-leg/s1-vertical-spreads': lazy(() => import('../subjects/07-options-strategies/c2-multi-leg/s1-vertical-spreads.jsx')),
  '07-options-strategies/c2-multi-leg/s2-iron-condors-butterflies': lazy(() => import('../subjects/07-options-strategies/c2-multi-leg/s2-iron-condors-butterflies.jsx')),
  '07-options-strategies/c2-multi-leg/s3-straddles-strangles': lazy(() => import('../subjects/07-options-strategies/c2-multi-leg/s3-straddles-strangles.jsx')),
  '07-options-strategies/c3-vol-trading/s1-vol-arb': lazy(() => import('../subjects/07-options-strategies/c3-vol-trading/s1-vol-arb.jsx')),
  '07-options-strategies/c3-vol-trading/s2-vix-strategies': lazy(() => import('../subjects/07-options-strategies/c3-vol-trading/s2-vix-strategies.jsx')),
  '07-options-strategies/c3-vol-trading/s3-dispersion-trading': lazy(() => import('../subjects/07-options-strategies/c3-vol-trading/s3-dispersion-trading.jsx')),
  '07-options-strategies/c4-options-backtesting/s1-options-data': lazy(() => import('../subjects/07-options-strategies/c4-options-backtesting/s1-options-data.jsx')),
  '07-options-strategies/c4-options-backtesting/s2-backtest-engine': lazy(() => import('../subjects/07-options-strategies/c4-options-backtesting/s2-backtest-engine.jsx')),
  '07-options-strategies/c4-options-backtesting/s3-performance-analysis': lazy(() => import('../subjects/07-options-strategies/c4-options-backtesting/s3-performance-analysis.jsx')),
  '08-backtesting/c1-backtesting-pitfalls/s1-overfitting': lazy(() => import('../subjects/08-backtesting/c1-backtesting-pitfalls/s1-overfitting.jsx')),
  '08-backtesting/c1-backtesting-pitfalls/s2-survivorship-lookahead': lazy(() => import('../subjects/08-backtesting/c1-backtesting-pitfalls/s2-survivorship-lookahead.jsx')),
  '08-backtesting/c1-backtesting-pitfalls/s3-deflated-sharpe': lazy(() => import('../subjects/08-backtesting/c1-backtesting-pitfalls/s3-deflated-sharpe.jsx')),
  '08-backtesting/c2-vectorized-backtesting/s1-vectorbt-intro': lazy(() => import('../subjects/08-backtesting/c2-vectorized-backtesting/s1-vectorbt-intro.jsx')),
  '08-backtesting/c2-vectorized-backtesting/s2-numpy-engine': lazy(() => import('../subjects/08-backtesting/c2-vectorized-backtesting/s2-numpy-engine.jsx')),
  '08-backtesting/c3-event-driven-backtesting/s1-zipline-reloaded': lazy(() => import('../subjects/08-backtesting/c3-event-driven-backtesting/s1-zipline-reloaded.jsx')),
  '08-backtesting/c3-event-driven-backtesting/s2-backtrader-framework': lazy(() => import('../subjects/08-backtesting/c3-event-driven-backtesting/s2-backtrader-framework.jsx')),
  '09-portfolio-optimization/c1-mean-variance/s1-markowitz': lazy(() => import('../subjects/09-portfolio-optimization/c1-mean-variance/s1-markowitz.jsx')),
  '09-portfolio-optimization/c1-mean-variance/s2-estimation-error': lazy(() => import('../subjects/09-portfolio-optimization/c1-mean-variance/s2-estimation-error.jsx')),
  '09-portfolio-optimization/c1-mean-variance/s3-constraints': lazy(() => import('../subjects/09-portfolio-optimization/c1-mean-variance/s3-constraints.jsx')),
  '09-portfolio-optimization/c2-risk-parity/s1-equal-risk-contribution': lazy(() => import('../subjects/09-portfolio-optimization/c2-risk-parity/s1-equal-risk-contribution.jsx')),
  '09-portfolio-optimization/c2-risk-parity/s2-hierarchical-risk-parity': lazy(() => import('../subjects/09-portfolio-optimization/c2-risk-parity/s2-hierarchical-risk-parity.jsx')),
  '09-portfolio-optimization/c2-risk-parity/s3-inverse-vol': lazy(() => import('../subjects/09-portfolio-optimization/c2-risk-parity/s3-inverse-vol.jsx')),
  '09-portfolio-optimization/c3-black-litterman/s1-equilibrium-returns': lazy(() => import('../subjects/09-portfolio-optimization/c3-black-litterman/s1-equilibrium-returns.jsx')),
  '09-portfolio-optimization/c3-black-litterman/s2-views-blending': lazy(() => import('../subjects/09-portfolio-optimization/c3-black-litterman/s2-views-blending.jsx')),
  '09-portfolio-optimization/c3-black-litterman/s3-bl-extensions': lazy(() => import('../subjects/09-portfolio-optimization/c3-black-litterman/s3-bl-extensions.jsx')),
  '09-portfolio-optimization/c4-robust-optimization/s1-robust-methods': lazy(() => import('../subjects/09-portfolio-optimization/c4-robust-optimization/s1-robust-methods.jsx')),
  '09-portfolio-optimization/c4-robust-optimization/s2-regime-aware': lazy(() => import('../subjects/09-portfolio-optimization/c4-robust-optimization/s2-regime-aware.jsx')),
  '09-portfolio-optimization/c4-robust-optimization/s3-multi-period': lazy(() => import('../subjects/09-portfolio-optimization/c4-robust-optimization/s3-multi-period.jsx')),
  '10-portfolio-management/c1-rebalancing/s1-calendar-threshold': lazy(() => import('../subjects/10-portfolio-management/c1-rebalancing/s1-calendar-threshold.jsx')),
  '10-portfolio-management/c1-rebalancing/s2-tax-aware': lazy(() => import('../subjects/10-portfolio-management/c1-rebalancing/s2-tax-aware.jsx')),
  '10-portfolio-management/c1-rebalancing/s3-transition-management': lazy(() => import('../subjects/10-portfolio-management/c1-rebalancing/s3-transition-management.jsx')),
  '10-portfolio-management/c2-risk-management/s1-position-sizing': lazy(() => import('../subjects/10-portfolio-management/c2-risk-management/s1-position-sizing.jsx')),
  '10-portfolio-management/c2-risk-management/s2-stop-losses': lazy(() => import('../subjects/10-portfolio-management/c2-risk-management/s2-stop-losses.jsx')),
  '10-portfolio-management/c2-risk-management/s3-correlation-crisis': lazy(() => import('../subjects/10-portfolio-management/c2-risk-management/s3-correlation-crisis.jsx')),
  '10-portfolio-management/c3-tail-risk/s1-tail-hedging': lazy(() => import('../subjects/10-portfolio-management/c3-tail-risk/s1-tail-hedging.jsx')),
  '10-portfolio-management/c3-tail-risk/s2-drawdown-control': lazy(() => import('../subjects/10-portfolio-management/c3-tail-risk/s2-drawdown-control.jsx')),
  '10-portfolio-management/c4-multi-asset/s1-asset-allocation': lazy(() => import('../subjects/10-portfolio-management/c4-multi-asset/s1-asset-allocation.jsx')),
  '10-portfolio-management/c4-multi-asset/s2-currency-hedging': lazy(() => import('../subjects/10-portfolio-management/c4-multi-asset/s2-currency-hedging.jsx')),
  '10-portfolio-management/c4-multi-asset/s3-alternatives-integration': lazy(() => import('../subjects/10-portfolio-management/c4-multi-asset/s3-alternatives-integration.jsx')),
  '11-fundamental-research/c1-financial-statements/s1-statement-parsing': lazy(() => import('../subjects/11-fundamental-research/c1-financial-statements/s1-statement-parsing.jsx')),
  '11-fundamental-research/c1-financial-statements/s2-ratio-analysis': lazy(() => import('../subjects/11-fundamental-research/c1-financial-statements/s2-ratio-analysis.jsx')),
  '11-fundamental-research/c1-financial-statements/s3-earnings-quality': lazy(() => import('../subjects/11-fundamental-research/c1-financial-statements/s3-earnings-quality.jsx')),
  '11-fundamental-research/c2-valuation-models/s1-dcf-automation': lazy(() => import('../subjects/11-fundamental-research/c2-valuation-models/s1-dcf-automation.jsx')),
  '11-fundamental-research/c2-valuation-models/s2-relative-valuation': lazy(() => import('../subjects/11-fundamental-research/c2-valuation-models/s2-relative-valuation.jsx')),
  '11-fundamental-research/c2-valuation-models/s3-residual-income': lazy(() => import('../subjects/11-fundamental-research/c2-valuation-models/s3-residual-income.jsx')),
  '11-fundamental-research/c3-fundamental-factors/s1-quality-investing': lazy(() => import('../subjects/11-fundamental-research/c3-fundamental-factors/s1-quality-investing.jsx')),
  '11-fundamental-research/c3-fundamental-factors/s2-value-strategies': lazy(() => import('../subjects/11-fundamental-research/c3-fundamental-factors/s2-value-strategies.jsx')),
  '11-fundamental-research/c4-macro-analysis/s1-economic-indicators': lazy(() => import('../subjects/11-fundamental-research/c4-macro-analysis/s1-economic-indicators.jsx')),
  '11-fundamental-research/c4-macro-analysis/s2-macro-factor-models': lazy(() => import('../subjects/11-fundamental-research/c4-macro-analysis/s2-macro-factor-models.jsx')),
  '11-fundamental-research/c4-macro-analysis/s3-geopolitical-risk': lazy(() => import('../subjects/11-fundamental-research/c4-macro-analysis/s3-geopolitical-risk.jsx')),
  '12-ml-alpha/c1-ml-pipeline/s1-feature-engineering': lazy(() => import('../subjects/12-ml-alpha/c1-ml-pipeline/s1-feature-engineering.jsx')),
  '12-ml-alpha/c1-ml-pipeline/s2-labeling': lazy(() => import('../subjects/12-ml-alpha/c1-ml-pipeline/s2-labeling.jsx')),
  '12-ml-alpha/c1-ml-pipeline/s3-sample-weights': lazy(() => import('../subjects/12-ml-alpha/c1-ml-pipeline/s3-sample-weights.jsx')),
  '12-ml-alpha/c2-classical-ml/s1-tree-ensembles': lazy(() => import('../subjects/12-ml-alpha/c2-classical-ml/s1-tree-ensembles.jsx')),
  '12-ml-alpha/c2-classical-ml/s2-svm-kernels': lazy(() => import('../subjects/12-ml-alpha/c2-classical-ml/s2-svm-kernels.jsx')),
  '12-ml-alpha/c2-classical-ml/s3-model-selection': lazy(() => import('../subjects/12-ml-alpha/c2-classical-ml/s3-model-selection.jsx')),
  '12-ml-alpha/c3-feature-importance/s1-mdi-mda': lazy(() => import('../subjects/12-ml-alpha/c3-feature-importance/s1-mdi-mda.jsx')),
  '12-ml-alpha/c3-feature-importance/s2-shap-finance': lazy(() => import('../subjects/12-ml-alpha/c3-feature-importance/s2-shap-finance.jsx')),
  '12-ml-alpha/c3-feature-importance/s3-pca-clustering': lazy(() => import('../subjects/12-ml-alpha/c3-feature-importance/s3-pca-clustering.jsx')),
  '12-ml-alpha/c4-ml-strategies/s1-ensemble-signals': lazy(() => import('../subjects/12-ml-alpha/c4-ml-strategies/s1-ensemble-signals.jsx')),
  '12-ml-alpha/c4-ml-strategies/s2-online-learning': lazy(() => import('../subjects/12-ml-alpha/c4-ml-strategies/s2-online-learning.jsx')),
  '12-ml-alpha/c4-ml-strategies/s3-bet-sizing': lazy(() => import('../subjects/12-ml-alpha/c4-ml-strategies/s3-bet-sizing.jsx')),
  '13-deep-learning-trading/c1-sequence-models/s1-lstm-gru-returns': lazy(() => import('../subjects/13-deep-learning-trading/c1-sequence-models/s1-lstm-gru-returns.jsx')),
  '13-deep-learning-trading/c1-sequence-models/s2-temporal-cnn': lazy(() => import('../subjects/13-deep-learning-trading/c1-sequence-models/s2-temporal-cnn.jsx')),
  '13-deep-learning-trading/c1-sequence-models/s3-nbeats-financial': lazy(() => import('../subjects/13-deep-learning-trading/c1-sequence-models/s3-nbeats-financial.jsx')),
  '13-deep-learning-trading/c2-transformer-trading/s1-temporal-fusion': lazy(() => import('../subjects/13-deep-learning-trading/c2-transformer-trading/s1-temporal-fusion.jsx')),
  '13-deep-learning-trading/c2-transformer-trading/s2-stock-transformers': lazy(() => import('../subjects/13-deep-learning-trading/c2-transformer-trading/s2-stock-transformers.jsx')),
  '13-deep-learning-trading/c2-transformer-trading/s3-informer-autoformer': lazy(() => import('../subjects/13-deep-learning-trading/c2-transformer-trading/s3-informer-autoformer.jsx')),
  '13-deep-learning-trading/c3-graph-networks/s1-stock-graphs': lazy(() => import('../subjects/13-deep-learning-trading/c3-graph-networks/s1-stock-graphs.jsx')),
  '13-deep-learning-trading/c3-graph-networks/s2-gnn-portfolio': lazy(() => import('../subjects/13-deep-learning-trading/c3-graph-networks/s2-gnn-portfolio.jsx')),
  '13-deep-learning-trading/c3-graph-networks/s3-dynamic-graphs': lazy(() => import('../subjects/13-deep-learning-trading/c3-graph-networks/s3-dynamic-graphs.jsx')),
  '13-deep-learning-trading/c4-generative-finance/s1-gan-simulation': lazy(() => import('../subjects/13-deep-learning-trading/c4-generative-finance/s1-gan-simulation.jsx')),
  '13-deep-learning-trading/c4-generative-finance/s2-vae-scenarios': lazy(() => import('../subjects/13-deep-learning-trading/c4-generative-finance/s2-vae-scenarios.jsx')),
  '14-rl-trading/c1-rl-foundations/s1-mdp-formulation': lazy(() => import('../subjects/14-rl-trading/c1-rl-foundations/s1-mdp-formulation.jsx')),
  '14-rl-trading/c1-rl-foundations/s2-reward-shaping': lazy(() => import('../subjects/14-rl-trading/c1-rl-foundations/s2-reward-shaping.jsx')),
  '14-rl-trading/c1-rl-foundations/s3-gym-environments': lazy(() => import('../subjects/14-rl-trading/c1-rl-foundations/s3-gym-environments.jsx')),
  '14-rl-trading/c2-policy-methods/s1-ppo-trading': lazy(() => import('../subjects/14-rl-trading/c2-policy-methods/s1-ppo-trading.jsx')),
  '14-rl-trading/c2-policy-methods/s2-a2c-a3c': lazy(() => import('../subjects/14-rl-trading/c2-policy-methods/s2-a2c-a3c.jsx')),
  '14-rl-trading/c2-policy-methods/s3-sac-trading': lazy(() => import('../subjects/14-rl-trading/c2-policy-methods/s3-sac-trading.jsx')),
  '14-rl-trading/c3-drl-portfolio/s1-multi-asset-rl': lazy(() => import('../subjects/14-rl-trading/c3-drl-portfolio/s1-multi-asset-rl.jsx')),
  '14-rl-trading/c3-drl-portfolio/s2-hierarchical-rl': lazy(() => import('../subjects/14-rl-trading/c3-drl-portfolio/s2-hierarchical-rl.jsx')),
  '14-rl-trading/c3-drl-portfolio/s3-safe-rl': lazy(() => import('../subjects/14-rl-trading/c3-drl-portfolio/s3-safe-rl.jsx')),
  '14-rl-trading/c4-rl-execution/s1-optimal-execution-rl': lazy(() => import('../subjects/14-rl-trading/c4-rl-execution/s1-optimal-execution-rl.jsx')),
  '14-rl-trading/c4-rl-execution/s2-rl-market-making': lazy(() => import('../subjects/14-rl-trading/c4-rl-execution/s2-rl-market-making.jsx')),
  '15-alt-data-nlp/c1-alternative-data/s1-alt-data-landscape': lazy(() => import('../subjects/15-alt-data-nlp/c1-alternative-data/s1-alt-data-landscape.jsx')),
  '15-alt-data-nlp/c1-alternative-data/s2-data-evaluation': lazy(() => import('../subjects/15-alt-data-nlp/c1-alternative-data/s2-data-evaluation.jsx')),
  '15-alt-data-nlp/c1-alternative-data/s3-geospatial-data': lazy(() => import('../subjects/15-alt-data-nlp/c1-alternative-data/s3-geospatial-data.jsx')),
  '15-alt-data-nlp/c2-nlp-sentiment/s1-text-preprocessing': lazy(() => import('../subjects/15-alt-data-nlp/c2-nlp-sentiment/s1-text-preprocessing.jsx')),
  '15-alt-data-nlp/c2-nlp-sentiment/s2-sentiment-models': lazy(() => import('../subjects/15-alt-data-nlp/c2-nlp-sentiment/s2-sentiment-models.jsx')),
  '15-alt-data-nlp/c2-nlp-sentiment/s3-news-trading': lazy(() => import('../subjects/15-alt-data-nlp/c2-nlp-sentiment/s3-news-trading.jsx')),
  '15-alt-data-nlp/c3-llm-analysis/s1-llm-earnings': lazy(() => import('../subjects/15-alt-data-nlp/c3-llm-analysis/s1-llm-earnings.jsx')),
  '15-alt-data-nlp/c3-llm-analysis/s2-rag-research': lazy(() => import('../subjects/15-alt-data-nlp/c3-llm-analysis/s2-rag-research.jsx')),
  '15-alt-data-nlp/c3-llm-analysis/s3-agent-workflows': lazy(() => import('../subjects/15-alt-data-nlp/c3-llm-analysis/s3-agent-workflows.jsx')),
  '15-alt-data-nlp/c4-social-media/s1-reddit-twitter': lazy(() => import('../subjects/15-alt-data-nlp/c4-social-media/s1-reddit-twitter.jsx')),
  '15-alt-data-nlp/c4-social-media/s2-crowd-wisdom': lazy(() => import('../subjects/15-alt-data-nlp/c4-social-media/s2-crowd-wisdom.jsx')),
  '16-hft-microstructure/c1-microstructure-theory/s1-kyle-glosten-milgrom': lazy(() => import('../subjects/16-hft-microstructure/c1-microstructure-theory/s1-kyle-glosten-milgrom.jsx')),
  '16-hft-microstructure/c1-microstructure-theory/s2-information-models': lazy(() => import('../subjects/16-hft-microstructure/c1-microstructure-theory/s2-information-models.jsx')),
  '16-hft-microstructure/c1-microstructure-theory/s3-price-formation': lazy(() => import('../subjects/16-hft-microstructure/c1-microstructure-theory/s3-price-formation.jsx')),
  '16-hft-microstructure/c2-order-book-analysis/s1-lob-data': lazy(() => import('../subjects/16-hft-microstructure/c2-order-book-analysis/s1-lob-data.jsx')),
  '16-hft-microstructure/c2-order-book-analysis/s2-book-imbalance': lazy(() => import('../subjects/16-hft-microstructure/c2-order-book-analysis/s2-book-imbalance.jsx')),
  '16-hft-microstructure/c2-order-book-analysis/s3-book-ml': lazy(() => import('../subjects/16-hft-microstructure/c2-order-book-analysis/s3-book-ml.jsx')),
  '16-hft-microstructure/c3-hft-strategies/s1-stat-arb-hft': lazy(() => import('../subjects/16-hft-microstructure/c3-hft-strategies/s1-stat-arb-hft.jsx')),
  '16-hft-microstructure/c3-hft-strategies/s2-momentum-ignition': lazy(() => import('../subjects/16-hft-microstructure/c3-hft-strategies/s2-momentum-ignition.jsx')),
  '16-hft-microstructure/c3-hft-strategies/s3-cross-asset-hft': lazy(() => import('../subjects/16-hft-microstructure/c3-hft-strategies/s3-cross-asset-hft.jsx')),
  '16-hft-microstructure/c4-tick-data-infra/s1-data-storage': lazy(() => import('../subjects/16-hft-microstructure/c4-tick-data-infra/s1-data-storage.jsx')),
  '16-hft-microstructure/c4-tick-data-infra/s2-feature-engineering-hf': lazy(() => import('../subjects/16-hft-microstructure/c4-tick-data-infra/s2-feature-engineering-hf.jsx')),
  '17-crypto-quant/c1-crypto-markets/s1-exchange-landscape': lazy(() => import('../subjects/17-crypto-quant/c1-crypto-markets/s1-exchange-landscape.jsx')),
  '17-crypto-quant/c1-crypto-markets/s2-crypto-data': lazy(() => import('../subjects/17-crypto-quant/c1-crypto-markets/s2-crypto-data.jsx')),
  '17-crypto-quant/c1-crypto-markets/s3-crypto-microstructure': lazy(() => import('../subjects/17-crypto-quant/c1-crypto-markets/s3-crypto-microstructure.jsx')),
  '17-crypto-quant/c2-crypto-strategies/s1-funding-rate-arb': lazy(() => import('../subjects/17-crypto-quant/c2-crypto-strategies/s1-funding-rate-arb.jsx')),
  '17-crypto-quant/c2-crypto-strategies/s2-dex-arb': lazy(() => import('../subjects/17-crypto-quant/c2-crypto-strategies/s2-dex-arb.jsx')),
  '17-crypto-quant/c2-crypto-strategies/s3-crypto-momentum': lazy(() => import('../subjects/17-crypto-quant/c2-crypto-strategies/s3-crypto-momentum.jsx')),
  '17-crypto-quant/c3-defi-quant/s1-yield-farming': lazy(() => import('../subjects/17-crypto-quant/c3-defi-quant/s1-yield-farming.jsx')),
  '17-crypto-quant/c3-defi-quant/s2-lending-liquidation': lazy(() => import('../subjects/17-crypto-quant/c3-defi-quant/s2-lending-liquidation.jsx')),
  '17-crypto-quant/c4-onchain-analytics/s1-whale-tracking': lazy(() => import('../subjects/17-crypto-quant/c4-onchain-analytics/s1-whale-tracking.jsx')),
  '17-crypto-quant/c4-onchain-analytics/s2-network-metrics': lazy(() => import('../subjects/17-crypto-quant/c4-onchain-analytics/s2-network-metrics.jsx')),
  '17-crypto-quant/c4-onchain-analytics/s3-tokenomics-analysis': lazy(() => import('../subjects/17-crypto-quant/c4-onchain-analytics/s3-tokenomics-analysis.jsx')),
  '18-forward-testing/c1-paper-trading/s1-paper-setup': lazy(() => import('../subjects/18-forward-testing/c1-paper-trading/s1-paper-setup.jsx')),
  '18-forward-testing/c1-paper-trading/s2-backtest-reconciliation': lazy(() => import('../subjects/18-forward-testing/c1-paper-trading/s2-backtest-reconciliation.jsx')),
  '18-forward-testing/c1-paper-trading/s3-statistical-validation': lazy(() => import('../subjects/18-forward-testing/c1-paper-trading/s3-statistical-validation.jsx')),
  '18-forward-testing/c2-live-deployment/s1-system-architecture': lazy(() => import('../subjects/18-forward-testing/c2-live-deployment/s1-system-architecture.jsx')),
  '18-forward-testing/c2-live-deployment/s2-broker-integration': lazy(() => import('../subjects/18-forward-testing/c2-live-deployment/s2-broker-integration.jsx')),
  '18-forward-testing/c2-live-deployment/s3-cloud-deployment': lazy(() => import('../subjects/18-forward-testing/c2-live-deployment/s3-cloud-deployment.jsx')),
  '18-forward-testing/c3-monitoring/s1-real-time-monitoring': lazy(() => import('../subjects/18-forward-testing/c3-monitoring/s1-real-time-monitoring.jsx')),
  '18-forward-testing/c3-monitoring/s2-anomaly-detection': lazy(() => import('../subjects/18-forward-testing/c3-monitoring/s2-anomaly-detection.jsx')),
  '18-forward-testing/c4-operational-risk/s1-fat-finger-protection': lazy(() => import('../subjects/18-forward-testing/c4-operational-risk/s1-fat-finger-protection.jsx')),
  '18-forward-testing/c4-operational-risk/s2-strategy-lifecycle': lazy(() => import('../subjects/18-forward-testing/c4-operational-risk/s2-strategy-lifecycle.jsx')),
  '18-forward-testing/c4-operational-risk/s3-compliance-reporting': lazy(() => import('../subjects/18-forward-testing/c4-operational-risk/s3-compliance-reporting.jsx')),
  '19-strategy-research/c1-research-methodology/s1-hypothesis-driven': lazy(() => import('../subjects/19-strategy-research/c1-research-methodology/s1-hypothesis-driven.jsx')),
  '19-strategy-research/c1-research-methodology/s2-research-notebooks': lazy(() => import('../subjects/19-strategy-research/c1-research-methodology/s2-research-notebooks.jsx')),
  '19-strategy-research/c1-research-methodology/s3-literature-review': lazy(() => import('../subjects/19-strategy-research/c1-research-methodology/s3-literature-review.jsx')),
  '19-strategy-research/c2-false-discovery/s1-multiple-testing': lazy(() => import('../subjects/19-strategy-research/c2-false-discovery/s1-multiple-testing.jsx')),
  '19-strategy-research/c2-false-discovery/s2-backtest-overfitting': lazy(() => import('../subjects/19-strategy-research/c2-false-discovery/s2-backtest-overfitting.jsx')),
  '19-strategy-research/c2-false-discovery/s3-out-of-sample': lazy(() => import('../subjects/19-strategy-research/c2-false-discovery/s3-out-of-sample.jsx')),
  '19-strategy-research/c3-strategy-evaluation/s1-due-diligence': lazy(() => import('../subjects/19-strategy-research/c3-strategy-evaluation/s1-due-diligence.jsx')),
  '19-strategy-research/c3-strategy-evaluation/s2-correlation-existing': lazy(() => import('../subjects/19-strategy-research/c3-strategy-evaluation/s2-correlation-existing.jsx')),
  '19-strategy-research/c3-strategy-evaluation/s3-capacity-decay': lazy(() => import('../subjects/19-strategy-research/c3-strategy-evaluation/s3-capacity-decay.jsx')),
  '19-strategy-research/c4-research-automation/s1-automl-alpha': lazy(() => import('../subjects/19-strategy-research/c4-research-automation/s1-automl-alpha.jsx')),
  '19-strategy-research/c4-research-automation/s2-genetic-programming': lazy(() => import('../subjects/19-strategy-research/c4-research-automation/s2-genetic-programming.jsx')),
  '20-frontiers/c1-foundation-models/s1-financial-llms': lazy(() => import('../subjects/20-frontiers/c1-foundation-models/s1-financial-llms.jsx')),
  '20-frontiers/c1-foundation-models/s2-multimodal-finance': lazy(() => import('../subjects/20-frontiers/c1-foundation-models/s2-multimodal-finance.jsx')),
  '20-frontiers/c1-foundation-models/s3-fm-agents': lazy(() => import('../subjects/20-frontiers/c1-foundation-models/s3-fm-agents.jsx')),
  '20-frontiers/c2-synthetic-data/s1-market-simulators': lazy(() => import('../subjects/20-frontiers/c2-synthetic-data/s1-market-simulators.jsx')),
  '20-frontiers/c2-synthetic-data/s2-data-augmentation': lazy(() => import('../subjects/20-frontiers/c2-synthetic-data/s2-data-augmentation.jsx')),
  '20-frontiers/c2-synthetic-data/s3-digital-twins': lazy(() => import('../subjects/20-frontiers/c2-synthetic-data/s3-digital-twins.jsx')),
  '20-frontiers/c3-quantum-finance/s1-quantum-basics': lazy(() => import('../subjects/20-frontiers/c3-quantum-finance/s1-quantum-basics.jsx')),
  '20-frontiers/c3-quantum-finance/s2-quantum-portfolio': lazy(() => import('../subjects/20-frontiers/c3-quantum-finance/s2-quantum-portfolio.jsx')),
  '20-frontiers/c4-emerging-topics/s1-causal-inference': lazy(() => import('../subjects/20-frontiers/c4-emerging-topics/s1-causal-inference.jsx')),
  '20-frontiers/c4-emerging-topics/s2-federated-learning': lazy(() => import('../subjects/20-frontiers/c4-emerging-topics/s2-federated-learning.jsx')),
  '20-frontiers/c4-emerging-topics/s3-climate-quant': lazy(() => import('../subjects/20-frontiers/c4-emerging-topics/s3-climate-quant.jsx')),
  '20-frontiers/c5-building-quant-firm/s1-tech-stack': lazy(() => import('../subjects/20-frontiers/c5-building-quant-firm/s1-tech-stack.jsx')),
  '20-frontiers/c5-building-quant-firm/s2-team-process': lazy(() => import('../subjects/20-frontiers/c5-building-quant-firm/s2-team-process.jsx')),
}

function ComingSoon({ subjectId, chapterId, sectionId }) {
  const subject = getCurriculumById(subjectId)
  const chapter = getChapterById(subjectId, chapterId)
  const section = getSectionById(subjectId, chapterId, sectionId)

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 text-center">
      <div className="text-6xl mb-4">🚧</div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {section?.title || 'Section'} — Coming Soon
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        This section is being written. Check back soon for the full content.
      </p>
      <div className="flex justify-center gap-4">
        {chapter && (
          <Link
            to={`/subjects/${subjectId}/${chapterId}`}
            className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:border-indigo-400 hover:text-indigo-700 transition-colors dark:border-gray-700 dark:text-gray-300 dark:hover:border-indigo-600 dark:hover:text-indigo-400"
          >
            ← Back to {chapter.title}
          </Link>
        )}
        <Link
          to={`/subjects/${subjectId}`}
          className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
        >
          View All Sections
        </Link>
      </div>
    </div>
  )
}

export default function SectionPage() {
  const { subjectId, chapterId, sectionId } = useParams()
  const key = `${subjectId}/${chapterId}/${sectionId}`
  const ContentComponent = CONTENT_REGISTRY[key]

  if (!ContentComponent) {
    return <ComingSoon subjectId={subjectId} chapterId={chapterId} sectionId={sectionId} />
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[40vh] text-gray-400">
          Loading section…
        </div>
      }
    >
      <motion.div
        key={key}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ContentComponent />
      </motion.div>
    </Suspense>
  )
}
