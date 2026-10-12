import { display } from '../../utils/formatters.js';
const measurement = (value, unit) => value === null || value === undefined || !Number.isFinite(Number(value)) ? 'Not available' : `${value}${unit}`;
export default function WeatherCard({ weather }) {
  if (!weather) return null;
  return <article className="card weather"><div><span>Current conditions</span><strong>{measurement(weather.temperature, ' °C')}</strong><p>{display(weather.condition)}</p></div><dl><div><dt>Humidity</dt><dd>{measurement(weather.humidity, '%')}</dd></div><div><dt>Rain chance</dt><dd>{measurement(weather.rainProbability, '%')}</dd></div><div><dt>Wind</dt><dd>{measurement(weather.windSpeed, ' m/s')}</dd></div><div><dt>Pressure</dt><dd>{measurement(weather.pressure, ' hPa')}</dd></div></dl></article>;
}
