import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveGeoSignal() {
  const [nightlightIdx, setNightlightIdx] = useState(1.05)
  const [footTraffic, setFootTraffic] = useState(0.12)
  const [constructionArea, setConstructionArea] = useState(0.08)
  const [cropHealth, setCropHealth] = useState(0.90)
  const [portActivity, setPortActivity] = useState(1.15)

  const signals = [
    { name: 'Nightlight intensity', value: nightlightIdx, sector: 'Power/Industrial', stock: 'NTPC, Tata Power', color: 'amber' },
    { name: 'Retail foot traffic', value: footTraffic, sector: 'Retail/FMCG', stock: 'DMart, Titan', color: 'blue' },
    { name: 'Construction area', value: constructionArea, sector: 'Real Estate/Cement', stock: 'DLF, UltraTech', color: 'green' },
    { name: 'Crop NDVI', value: cropHealth, sector: 'Agri/Fertilizer', stock: 'UPL, Coromandel', color: 'emerald' },
    { name: 'Port vessel count', value: portActivity, sector: 'Logistics/Trade', stock: 'Adani Ports, Container Corp', color: 'purple' }
  ]

  const compositeSignal = (nightlightIdx - 1) * 0.3 + footTraffic * 0.25 + constructionArea * 0.2 + (cropHealth - 0.8) * 0.15 + (portActivity - 1) * 0.1

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: Geospatial Signal Dashboard
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Adjust satellite-derived indicators to see their impact on sector signals for Indian equities.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Nightlight: {nightlightIdx.toFixed(2)}x</span>
          <input type="range" min="0.8" max="1.3" step="0.01" value={nightlightIdx}
            onChange={e => setNightlightIdx(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-amber-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Foot traffic: {(footTraffic * 100).toFixed(0)}% YoY</span>
          <input type="range" min="-0.3" max="0.5" step="0.01" value={footTraffic}
            onChange={e => setFootTraffic(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-blue-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Construction: {(constructionArea * 100).toFixed(0)}% QoQ</span>
          <input type="range" min="-0.1" max="0.3" step="0.01" value={constructionArea}
            onChange={e => setConstructionArea(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-green-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Crop NDVI: {cropHealth.toFixed(2)}</span>
          <input type="range" min="0.3" max="1.0" step="0.05" value={cropHealth}
            onChange={e => setCropHealth(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-emerald-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Port activity: {portActivity.toFixed(2)}x</span>
          <input type="range" min="0.5" max="1.5" step="0.05" value={portActivity}
            onChange={e => setPortActivity(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-purple-500" />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
        {signals.map((s, i) => (
          <div key={i} className="rounded-lg bg-gray-50 p-2 text-center dark:bg-gray-800/50">
            <div className="text-[10px] font-semibold text-gray-500">{s.sector}</div>
            <div className="text-xs text-gray-700 dark:text-gray-300">{s.stock}</div>
            <div className={`text-sm font-bold ${s.value > (s.name.includes('NDVI') ? 0.7 : s.name.includes('vessel') ? 1 : 0) ? 'text-green-600' : 'text-red-600'}`}>
              {typeof s.value === 'number' && s.value < 1 ? (s.value * 100).toFixed(0) + '%' : s.value.toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
        Composite geo-signal: <span className={`font-bold ${compositeSignal > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {compositeSignal > 0 ? '+' : ''}{(compositeSignal * 100).toFixed(1)}%
        </span> {compositeSignal > 0.05 ? '(Bullish)' : compositeSignal < -0.05 ? '(Bearish)' : '(Neutral)'}
      </p>
    </div>
  )
}

export default function GeospatialData() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Geospatial Data for Indian Retail and Energy
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Satellite imagery and geospatial data provide a bird&apos;s-eye view of economic
        activity across India. From tracking construction at DLF sites to counting vehicles
        at Adani ports, geospatial signals offer leading indicators that traditional financial
        data cannot capture. ISRO&apos;s growing constellation and commercial satellite providers
        make this data increasingly accessible for Indian market analysis.
      </p>

      <DefinitionBlock
        title="Geospatial Alternative Data"
        label="Definition 15.3"
        definition="Geospatial data uses satellite imagery, GPS signals, and location analytics to derive economic signals. Key techniques include: nightlight intensity analysis (proxy for economic activity), Normalized Difference Vegetation Index (NDVI) for crop health, object detection for vehicle/ship counts, and change detection for construction monitoring."
        notation="NDVI = (NIR - Red)/(NIR + Red), where NIR is near-infrared reflectance."
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Nightlight Intensity as Economic Proxy
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        Nighttime satellite imagery correlates strongly with GDP at the district level in India:
      </p>

      <BlockMath math="\ln(\text{GDP}_{d,t}) = \alpha + \beta \ln(\text{NTL}_{d,t}) + \gamma X_{d,t} + \epsilon_{d,t}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        where <InlineMath math="\text{NTL}_{d,t}" /> is the sum of nightlight intensity for
        district <InlineMath math="d" /> at time <InlineMath math="t" />, and the elasticity{' '}
        <InlineMath math="\beta \approx 0.3" /> for Indian states.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Crop Health Monitoring with NDVI
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        NDVI from satellite imagery is crucial for Indian agri-sector stocks:
      </p>

      <BlockMath math="\text{NDVI} = \frac{\rho_{\text{NIR}} - \rho_{\text{Red}}}{\rho_{\text{NIR}} + \rho_{\text{Red}}} \in [-1, 1]" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        NDVI &gt; 0.6 indicates healthy vegetation. A nationwide NDVI drop below 0.4 during
        monsoon season signals poor Kharif crop output, negatively impacting fertilizer demand
        (UPL, Coromandel) but potentially boosting food inflation hedges.
      </p>

      <TheoremBlock
        title="Satellite Signal Lead Time"
        label="Theorem 15.3"
        statement="For satellite-derived economic indicators with observation frequency f and official data release lag L, the maximum information advantage is Δt = L - 1/f. For India, where IIP data has L ≈ 6 weeks and satellite data has f = weekly, the lead time is approximately 5 weeks."
        proof="Official industrial production data (IIP) is published with a 6-week lag by the Ministry of Statistics. Satellite observations of industrial zones (smoke stacks, parking lots, nightlights) are available weekly. The information advantage is the gap: Δt = 6 weeks - 1 week = 5 weeks. During this window, satellite data provides a nowcast of economic activity before official statistics are released, creating an exploitable informational edge for NSE trading."
      />

      <InteractiveGeoSignal />

      <NoteBlock title="ISRO Data Sources" type="info">
        <p>
          India&apos;s own satellite infrastructure provides valuable data: (1) ISRO&apos;s Bhuvan
          portal offers free multi-spectral imagery over India, (2) Cartosat series provides
          high-resolution imagery for construction monitoring, (3) INSAT/IRNSS meteorological
          data for monsoon tracking, (4) ResourceSat data for crop health (NDVI). Commercial
          alternatives include Planet Labs (daily global imagery) and Maxar (high resolution).
          For cost-effective strategies, combine free ISRO data with selective commercial
          purchases for critical dates (earnings seasons, monsoon onset).
        </p>
      </NoteBlock>

      <PythonCode
        title="geospatial_signals.py"
        runnable
        code={`import numpy as np
from typing import Dict, List, Tuple

class GeospatialSignalProcessor:
    """
    Process satellite-derived signals for Indian market analysis.
    Covers nightlights, NDVI, port activity, construction.
    """
    def __init__(self):
        self.signal_map = {
            'nightlight': {
                'sectors': ['Power', 'Industrial', 'Utilities'],
                'stocks': ['NTPC', 'TATAPOWER', 'POWERGRID', 'ADANIGREEN']
            },
            'ndvi': {
                'sectors': ['Fertilizer', 'Seeds', 'Agri-chem'],
                'stocks': ['UPL', 'COROMANDEL', 'PIIND', 'RALLIS']
            },
            'construction': {
                'sectors': ['Real Estate', 'Cement', 'Steel'],
                'stocks': ['DLF', 'ULTRACEMCO', 'TATASTEEL', 'GODREJPROP']
            },
            'port_activity': {
                'sectors': ['Logistics', 'Trade', 'Shipping'],
                'stocks': ['ADANIPORTS', 'CONCOR', 'SCI']
            },
            'parking_lots': {
                'sectors': ['Retail', 'Hospitality', 'Auto'],
                'stocks': ['DMART', 'TITAN', 'TRENT', 'MARUTI']
            }
        }

    def compute_ndvi(self, nir: np.ndarray, red: np.ndarray) -> np.ndarray:
        """Compute NDVI from satellite bands."""
        return (nir - red) / (nir + red + 1e-8)

    def nightlight_change(self, current: np.ndarray,
                           baseline: np.ndarray) -> float:
        """Compute nightlight intensity change."""
        current_sum = np.sum(current)
        baseline_sum = np.sum(baseline)
        if baseline_sum == 0:
            return 0.0
        return (current_sum - baseline_sum) / baseline_sum

    def detect_construction(self, image_series: List[np.ndarray],
                             threshold: float = 0.1) -> Dict:
        """Detect construction activity from image change detection."""
        if len(image_series) < 2:
            return {'change_fraction': 0, 'new_area': 0}
        diff = np.abs(image_series[-1].astype(float) - image_series[-2].astype(float))
        changed_pixels = np.sum(diff > threshold * 255)
        total_pixels = diff.size
        return {
            'change_fraction': changed_pixels / total_pixels,
            'new_area': changed_pixels
        }

    def port_vessel_count(self, detections: List[Dict]) -> Dict:
        """Analyze port activity from vessel detections."""
        if not detections:
            return {'count': 0, 'avg_size': 0}
        count = len(detections)
        avg_size = np.mean([d.get('size', 0) for d in detections])
        return {'count': count, 'avg_size': avg_size}

    def generate_sector_signal(self, geo_type: str,
                                 value: float,
                                 historical_mean: float,
                                 historical_std: float) -> Dict:
        """Generate z-score signal for a sector."""
        z_score = (value - historical_mean) / (historical_std + 1e-8)
        info = self.signal_map.get(geo_type, {})
        return {
            'geo_type': geo_type,
            'z_score': z_score,
            'signal': 'bullish' if z_score > 1 else 'bearish' if z_score < -1 else 'neutral',
            'sectors': info.get('sectors', []),
            'stocks': info.get('stocks', [])
        }

    def monsoon_nowcast(self, ndvi_series: np.ndarray,
                         rainfall_data: np.ndarray) -> Dict:
        """Monsoon quality nowcast from NDVI and rainfall."""
        # Compare current NDVI with seasonal average
        current_ndvi = ndvi_series[-1] if len(ndvi_series) > 0 else 0
        avg_ndvi = np.mean(ndvi_series[-4:]) if len(ndvi_series) >= 4 else current_ndvi

        # Rainfall adequacy
        rainfall_pct = (np.sum(rainfall_data[-1:]) /
                       np.mean(rainfall_data) * 100) if len(rainfall_data) > 0 else 100

        quality = 'Good' if avg_ndvi > 0.6 and rainfall_pct > 90 else \
                  'Normal' if avg_ndvi > 0.4 and rainfall_pct > 75 else 'Poor'

        return {
            'ndvi_avg': avg_ndvi,
            'rainfall_pct': rainfall_pct,
            'quality': quality,
            'impact': {
                'agri_stocks': 1 if quality == 'Good' else -1 if quality == 'Poor' else 0,
                'rural_consumption': 1 if quality == 'Good' else -1,
                'food_inflation': -1 if quality == 'Good' else 1
            }
        }


# Demo analysis
np.random.seed(42)
processor = GeospatialSignalProcessor()

print("Geospatial Alternative Data Analysis (India)")
print(f"{'='*65}")

# 1. Nightlight analysis
nightlight_current = np.random.uniform(50, 200, (100, 100))
nightlight_baseline = np.random.uniform(45, 190, (100, 100))
ntl_change = processor.nightlight_change(nightlight_current, nightlight_baseline)
ntl_signal = processor.generate_sector_signal('nightlight', ntl_change, 0.03, 0.02)

print(f"\\n1. Nightlight Intensity Analysis")
print(f"   Change: {ntl_change:+.2%}")
print(f"   Z-score: {ntl_signal['z_score']:+.2f}")
print(f"   Signal: {ntl_signal['signal']}")
print(f"   Relevant: {', '.join(ntl_signal['stocks'])}")

# 2. Crop health (NDVI)
nir = np.random.uniform(0.3, 0.8, (50, 50))
red = np.random.uniform(0.1, 0.4, (50, 50))
ndvi = processor.compute_ndvi(nir, red)
ndvi_mean = np.mean(ndvi)
ndvi_signal = processor.generate_sector_signal('ndvi', ndvi_mean, 0.55, 0.1)

print(f"\\n2. Crop Health (NDVI)")
print(f"   Mean NDVI: {ndvi_mean:.3f}")
print(f"   Z-score: {ndvi_signal['z_score']:+.2f}")
print(f"   Signal: {ndvi_signal['signal']}")
print(f"   Relevant: {', '.join(ndvi_signal['stocks'])}")

# 3. Monsoon nowcast
ndvi_series = np.random.uniform(0.4, 0.8, 12)
rainfall = np.random.uniform(800, 1200, 12)
monsoon = processor.monsoon_nowcast(ndvi_series, rainfall)

print(f"\\n3. Monsoon Nowcast")
print(f"   NDVI (4-wk avg): {monsoon['ndvi_avg']:.3f}")
print(f"   Rainfall adequacy: {monsoon['rainfall_pct']:.0f}%")
print(f"   Quality: {monsoon['quality']}")
print(f"   Agri stocks impact: {'+' if monsoon['impact']['agri_stocks'] > 0 else '-'}")

# 4. Port activity
vessels = [{'size': np.random.uniform(100, 500)} for _ in range(np.random.randint(20, 60))]
port = processor.port_vessel_count(vessels)
port_signal = processor.generate_sector_signal('port_activity', len(vessels), 40, 8)

print(f"\\n4. Port Activity (Adani Ports)")
print(f"   Vessel count: {port['count']}")
print(f"   Z-score: {port_signal['z_score']:+.2f}")
print(f"   Signal: {port_signal['signal']}")
print(f"   Relevant: {', '.join(port_signal['stocks'])}")

# 5. Construction
img1 = np.random.randint(0, 256, (64, 64))
img2 = img1.copy()
img2[20:40, 20:40] = np.random.randint(100, 200, (20, 20))
construction = processor.detect_construction([img1, img2])

print(f"\\n5. Construction Activity")
print(f"   Changed area: {construction['change_fraction']:.2%}")

print(f"\\n{'='*65}")
print("Data pipeline: Satellite -> Feature extraction -> Z-score -> Sector signal")`}
      />

      <ExampleBlock
        title="Satellite-Based Revenue Nowcast for Reliance Retail"
        difficulty="advanced"
        problem="Use parking lot occupancy data from 500 Reliance Retail store locations to nowcast quarterly revenue. Historical correlation between satellite-derived footfall index and actual revenue growth is r=0.72. How would you build and validate this signal?"
        solution={[
          {
            step: 'Data collection and processing',
            formula: '\\text{FootfallIndex}_t = \\frac{1}{N}\\sum_{i=1}^{500} \\frac{\\text{cars}_{i,t}}{\\text{capacity}_i}',
            explanation: 'Average the parking occupancy across 500 locations, normalized by parking capacity. Satellite images are captured bi-weekly by Planet Labs.',
          },
          {
            step: 'Seasonal adjustment',
            formula: '\\text{SA\\_Index}_t = \\text{FootfallIndex}_t - \\text{MA}_{52}(\\text{FootfallIndex})',
            explanation: 'Remove annual seasonality (Diwali, year-end effects) using a 52-week moving average. Indian retail has strong seasonal patterns.',
          },
          {
            step: 'Revenue nowcast regression',
            formula: '\\Delta \\text{Rev}_Q = \\hat{\\alpha} + \\hat{\\beta} \\cdot \\text{SA\\_Index}_Q + \\hat{\\gamma} \\cdot \\text{UPI\\_Index}_Q',
            explanation: 'Combine satellite footfall with UPI payment data at Reliance stores for a multivariate nowcast. β = 0.72 historically.',
          },
          {
            step: 'Trading implementation',
            formula: 'w_{\\text{RELIANCE}} = f(\\text{nowcast surprise}) \\times \\text{confidence}',
            explanation: 'If nowcast exceeds consensus by >5%, go overweight before earnings. Use satellite data advantage: 3-4 week lead over quarterly results.',
          },
        ]}
      />

      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          Geospatial data offers powerful leading indicators for Indian markets that are
          impractical to replicate through traditional channels. The key applications are:
          (1) nightlights for GDP/industrial activity nowcasting (5-week lead over IIP data),
          (2) NDVI for monsoon and Kharif crop forecasting (critical for agri stocks),
          (3) parking lot counts for retail revenue nowcasting, (4) port vessel counting for
          trade activity (Adani Ports, Container Corp), (5) construction monitoring for
          real estate and cement demand. Leverage ISRO&apos;s free data where possible and
          supplement with commercial providers for high-resolution, time-critical analysis.
        </p>
      </NoteBlock>
    </div>
  )
}
