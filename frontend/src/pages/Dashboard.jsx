import { useEffect, useMemo, useState } from 'react';
import {
  FiCalendar, FiChevronLeft, FiChevronRight, FiCloud, FiCloudRain, FiDroplet,
  FiMapPin, FiPause, FiPlay, FiSun, FiWind,
} from 'react-icons/fi';
import RainProbabilityChart from '../components/analytics/RainProbabilityChart.jsx';
import RecommendationPieChart from '../components/analytics/RecommendationPieChart.jsx';
import TemperatureHumidityChart from '../components/analytics/TemperatureHumidityChart.jsx';
import WeatherConditionPieChart from '../components/analytics/WeatherConditionPieChart.jsx';
import WindSpeedChart from '../components/analytics/WindSpeedChart.jsx';
import Loader from '../components/common/Loader.jsx';
import { display } from '../utils/formatters.js';

const DATASET_URL = '/data/smart_irrigation_seed_5_years.json';
const DEMO_DISCLAIMER = 'This recommendation is generated from simulated seed data for project demonstration.';
const RECOMMENDATION_ORDER = [
  'Irrigate Today',
  'No Irrigation Required',
  'Delay Irrigation',
  'Monitor Weather',
];
const SPEED_OPTIONS = [
  { label: '1 second = 1 day', value: 1000 },
  { label: '5 seconds = 1 day', value: 5000 },
  { label: '10 seconds = 1 day', value: 10000 },
  { label: 'Manual', value: 0 },
];

const safeNumber = (value) => Number.isFinite(Number(value)) ? Number(value) : 0;
const formatDate = (value, compact = false) => {
  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) return 'Not available';
  return new Intl.DateTimeFormat('en-IN', compact
    ? { day: 'numeric', month: 'short' }
    : { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
};
const normalizeRecommendationTitle = (record) => (
  record?.title || record?.status?.replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
);
const summarize = (items, getName) => Object.values(items.reduce((result, item) => {
  const name = getName(item) || 'Unknown';
  result[name] ||= { name, value: 0 };
  result[name].value += 1;
  return result;
}, {}));

export default function Dashboard() {
  const [seedData, setSeedData] = useState(null);
  const [selectedFarmId, setSelectedFarmId] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(5000);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const loadDataset = async () => {
      try {
        const response = await fetch(DATASET_URL, { signal: controller.signal });
        if (!response.ok) throw new Error(`Dataset request failed with ${response.status}`);
        const data = await response.json();
        if (!Array.isArray(data.farms) || !Array.isArray(data.weatherHistories) || !Array.isArray(data.recommendations)) {
          throw new Error('Dataset has an invalid structure');
        }
        setSeedData(data);
        setSelectedFarmId(data.farms[0]?._id || '');
      } catch (loadError) {
        if (loadError.name !== 'AbortError') setError('Unable to load demo weather dataset.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    loadDataset();
    return () => controller.abort();
  }, []);

  const farms = seedData?.farms || [];
  const weatherHistories = seedData?.weatherHistories || [];
  const recommendations = seedData?.recommendations || [];

  const selectedFarm = useMemo(
    () => farms.find((farm) => farm._id === selectedFarmId),
    [farms, selectedFarmId],
  );
  const farmWeather = useMemo(
    () => weatherHistories
      .filter((record) => record.farm === selectedFarmId)
      .sort((a, b) => new Date(a.recordedAt) - new Date(b.recordedAt)),
    [weatherHistories, selectedFarmId],
  );
  const farmRecommendations = useMemo(
    () => recommendations
      .filter((record) => record.farm === selectedFarmId)
      .sort((a, b) => new Date(a.generatedAt) - new Date(b.generatedAt)),
    [recommendations, selectedFarmId],
  );
  const currentWeather = farmWeather[currentIndex];
  const visibleWeather = useMemo(
    () => farmWeather.slice(Math.max(0, currentIndex - 6), currentIndex + 1),
    [farmWeather, currentIndex],
  );
  const visibleStart = visibleWeather[0] ? new Date(visibleWeather[0].recordedAt).getTime() : null;
  const visibleEnd = currentWeather ? new Date(currentWeather.recordedAt).getTime() : null;
  const visibleRecommendations = useMemo(
    () => farmRecommendations.filter((record) => {
      const time = new Date(record.generatedAt).getTime();
      return visibleStart !== null && visibleEnd !== null && time >= visibleStart && time <= visibleEnd + 86400000;
    }),
    [farmRecommendations, visibleStart, visibleEnd],
  );
  const currentRecommendation = useMemo(
    () => farmRecommendations.find((record) => record.weatherSnapshot?.weatherHistoryId === currentWeather?._id),
    [farmRecommendations, currentWeather],
  );
  const weatherTrend = useMemo(
    () => visibleWeather.map((record) => ({
      date: formatDate(record.recordedAt, true),
      temperature: safeNumber(record.temperature),
      humidity: safeNumber(record.humidity),
      rainProbability: safeNumber(record.rainProbability),
      windSpeed: safeNumber(record.windSpeed),
    })),
    [visibleWeather],
  );
  const recommendationSummary = useMemo(() => {
    const counts = summarize(visibleRecommendations, normalizeRecommendationTitle);
    return RECOMMENDATION_ORDER
      .map((name) => counts.find((item) => item.name === name) || { name, value: 0 })
      .filter((item) => item.value > 0);
  }, [visibleRecommendations]);
  const conditionSummary = useMemo(
    () => summarize(visibleWeather, (record) => record.weatherCondition),
    [visibleWeather],
  );

  useEffect(() => {
    setCurrentIndex(0);
    setIsPlaying(false);
  }, [selectedFarmId]);

  useEffect(() => {
    if (!isPlaying || !simulationSpeed || farmWeather.length < 2) return undefined;
    const intervalId = window.setInterval(() => {
      setCurrentIndex((index) => {
        if (index >= farmWeather.length - 1) {
          setIsPlaying(false);
          return index;
        }
        return index + 1;
      });
    }, simulationSpeed);
    return () => window.clearInterval(intervalId);
  }, [isPlaying, simulationSpeed, farmWeather.length]);

  const moveDay = (direction) => {
    setIsPlaying(false);
    setCurrentIndex((index) => Math.min(Math.max(index + direction, 0), farmWeather.length - 1));
  };

  const changeSpeed = (event) => {
    const nextSpeed = Number(event.target.value);
    setSimulationSpeed(nextSpeed);
    if (nextSpeed === 0) setIsPlaying(false);
  };

  if (loading) return <Loader label="Loading simulated weather data" />;
  if (error) return <section className="card dataset-error" role="alert"><FiCloudRain /><h1>Dataset unavailable</h1><p>{error}</p></section>;

  return (
    <div className="dashboard simulation-dashboard">
      <section className="dashboard-welcome">
        <div>
          <span className="dashboard-kicker">Historical weather simulation</span>
          <h1>Smart Irrigation Dashboard</h1>
          <p>Explore five years of synthetic farm weather and stored irrigation advice.</p>
        </div>
        <span className="demo-badge"><FiCloud /> Simulated Weather Data</span>
      </section>

      <section className="dashboard-toolbar simulation-toolbar card" aria-label="Simulation settings">
        <label className="farm-selector">
          <span>Selected Farm</span>
          <select value={selectedFarmId} onChange={(event) => setSelectedFarmId(event.target.value)}>
            {farms.map((farm) => <option key={farm._id} value={farm._id}>{farm.farmName}</option>)}
          </select>
        </label>
        <div className="simulation-controls">
          <button type="button" onClick={() => moveDay(-1)} disabled={currentIndex === 0}>
            <FiChevronLeft /> Previous Day
          </button>
          {!isPlaying
            ? <button className="play-button" type="button" onClick={() => setIsPlaying(true)} disabled={!simulationSpeed || currentIndex >= farmWeather.length - 1}><FiPlay /> Play Simulation</button>
            : <button className="play-button" type="button" onClick={() => setIsPlaying(false)}><FiPause /> Pause</button>}
          <button type="button" onClick={() => moveDay(1)} disabled={currentIndex >= farmWeather.length - 1}>
            Next Day <FiChevronRight />
          </button>
        </div>
        <label className="speed-selector">
          <span>Simulation Speed</span>
          <select value={simulationSpeed} onChange={changeSpeed}>
            {SPEED_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
      </section>

      {!farmWeather.length ? <section className="card dashboard-inline-empty">No simulated weather records are available for this farm.</section> : <>
        <section className="dashboard-stats weather-summary" aria-label="Current simulated weather">
          <Metric icon={<FiSun />} color="amber" label="Temperature" value={`${display(currentWeather.temperature)}°C`} />
          <Metric icon={<FiDroplet />} color="cyan" label="Humidity" value={`${display(currentWeather.humidity)}%`} />
          <Metric icon={<FiCloudRain />} color="blue" label="Rain Probability" value={`${display(currentWeather.rainProbability)}%`} />
          <Metric icon={<FiWind />} color="violet" label="Wind Speed" value={`${display(currentWeather.windSpeed)} km/h`} />
          <Metric icon={<FiCloud />} color="indigo" label="Pressure" value={`${display(currentWeather.pressure)} hPa`} />
          <Metric icon={<FiCloud />} color="green" label="Weather Condition" value={display(currentWeather.weatherCondition)} />
          <Metric icon={<FiDroplet />} color="blue" label="Latest Recommendation" value={normalizeRecommendationTitle(currentRecommendation) || 'Not available'} />
          <Metric icon={<FiCalendar />} color="amber" label="Simulation Date" value={formatDate(currentWeather.recordedAt)} />
        </section>

        <section className="simulation-progress card">
          <div><span>Simulation timeline</span><strong>{formatDate(currentWeather.recordedAt)} · Day {currentIndex + 1} of {farmWeather.length}</strong></div>
          <progress value={currentIndex + 1} max={farmWeather.length} aria-label="Simulation progress" />
        </section>

        <TemperatureHumidityChart data={weatherTrend} periodLabel="7-Day" />
        <div className="analytics-grid">
          <RainProbabilityChart data={weatherTrend} periodLabel="7-Day" />
          <RecommendationPieChart data={recommendationSummary} periodLabel="7-Day" />
        </div>
        <div className="analytics-grid">
          <WindSpeedChart data={weatherTrend} periodLabel="7-Day" />
          <WeatherConditionPieChart data={conditionSummary} periodLabel="7-Day" />
        </div>

        <div className="dashboard-lower-grid simulation-details">
          <FarmInformation farm={selectedFarm} />
          <CurrentRecommendation recommendation={currentRecommendation} />
        </div>
      </>}
    </div>
  );
}

function Metric({ icon, color, label, value }) {
  return <article className="metric-card"><span className={`metric-icon ${color}`}>{icon}</span><div><span>{label}</span><strong>{value}</strong><small>Simulated dataset reading</small></div></article>;
}

function FarmInformation({ farm }) {
  const fields = [
    ['Farm Name', farm?.farmName],
    ['Crop Type', farm?.cropName || farm?.cropType],
    ['Farm Area', `${display(farm?.area)} ${display(farm?.areaUnit)}`],
    ['Farming Condition', farm?.farmingCondition],
    ['Soil Type', farm?.soilType],
    ['Irrigation Method', farm?.irrigationMethod],
    ['Village', farm?.village],
    ['District', farm?.district],
    ['State', farm?.state],
    ['Latitude', farm?.latitude],
    ['Longitude', farm?.longitude],
  ];
  return <section className="card farm-information"><div className="section-heading"><div><span className="dashboard-label">Selected farm</span><h2>{farm?.farmName}</h2></div><FiMapPin /></div><dl>{fields.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{display(value)}</dd></div>)}</dl></section>;
}

function CurrentRecommendation({ recommendation }) {
  return <section className="recommendation-spotlight simulated-recommendation">
    <div className="spotlight-heading"><div><span className="dashboard-kicker light">Current recommendation</span><h2>{normalizeRecommendationTitle(recommendation) || 'No matching recommendation'}</h2></div>{recommendation && <span className="advice-badge">{normalizeRecommendationTitle(recommendation)}</span>}</div>
    {recommendation ? <>
      <div className="recommendation-copy"><span>Reason</span><p>{recommendation.reason}</p></div>
      <div className="spotlight-action"><span>Recommended Action</span><strong>{recommendation.recommendedAction}</strong></div>
      <div className="recommendation-generated"><FiCalendar /> Generated {formatDate(recommendation.generatedAt)}</div>
    </> : <p>No stored recommendation matches this simulated weather record.</p>}
    <p className="simulation-disclaimer">{DEMO_DISCLAIMER}</p>
  </section>;
}
