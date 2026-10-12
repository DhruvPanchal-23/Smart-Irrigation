import axios from 'axios';
import WeatherHistory from '../models/WeatherHistory.js';
import { AppError } from '../utils/apiResponse.js';

export const normalizeCurrentWeather = (data, forecast) => {
  const probability = forecast?.list?.[0]?.pop;
  const values = [
    data.main?.temp,
    data.main?.humidity,
    data.wind?.speed,
    data.main?.pressure,
    probability,
  ];
  if (
    !values.every((value) => typeof value === 'number' && Number.isFinite(value)) ||
    probability < 0 ||
    probability > 1
  ) {
    throw new AppError(502, 'Weather provider returned incomplete data', 'WEATHER_PROVIDER_ERROR');
  }
  return {
    temperature: data.main.temp,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    pressure: data.main.pressure,
    rainProbability: Math.round(probability * 100),
    condition: data.weather?.[0]?.description || 'Unknown',
    icon: data.weather?.[0]?.icon || '',
    recordedAt: new Date(),
  };
};
export const fetchCurrentWeather = async (latitude, longitude) => {
  if (!process.env.OPENWEATHER_API_KEY)
    throw new AppError(503, 'Weather service is not configured', 'WEATHER_NOT_CONFIGURED');
  const base = process.env.OPENWEATHER_BASE_URL || 'https://api.openweathermap.org';
  const params = {
    lat: latitude,
    lon: longitude,
    units: 'metric',
    appid: process.env.OPENWEATHER_API_KEY,
  };
  try {
    const [current, forecast] = await Promise.all([
      axios.get(`${base}/data/2.5/weather`, { params, timeout: 8000 }),
      axios.get(`${base}/data/2.5/forecast`, { params: { ...params, cnt: 1 }, timeout: 8000 }),
    ]);
    return normalizeCurrentWeather(current.data, forecast.data);
  } catch (error) {
    if (error.code === 'ECONNABORTED')
      throw new AppError(504, 'Weather provider timed out', 'WEATHER_TIMEOUT');
    throw new AppError(502, 'Weather provider is unavailable', 'WEATHER_PROVIDER_ERROR');
  }
};
export const storeWeather = (user, farm, weather) =>
  WeatherHistory.create({ user, farm, ...weather });
