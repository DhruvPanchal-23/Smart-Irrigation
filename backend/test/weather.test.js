import test from 'node:test';
import assert from 'node:assert/strict';
import axios from 'axios';
import { fetchCurrentWeather, normalizeCurrentWeather } from '../services/weather.service.js';
const current = {
  main: { temp: 36, humidity: 45, pressure: 1010 },
  wind: { speed: 2 },
  weather: [{ description: 'clear', icon: '01d' }],
};
test('uses forecast precipitation probability, preserves zero, and rejects incomplete provider data', () => {
  assert.equal(normalizeCurrentWeather(current, { list: [{ pop: 0.81 }] }).rainProbability, 81);
  assert.equal(normalizeCurrentWeather(current, { list: [{ pop: 0 }] }).rainProbability, 0);
  assert.throws(() => normalizeCurrentWeather(current, { list: [] }), /incomplete/);
  assert.throws(() => normalizeCurrentWeather({}, { list: [{ pop: 0.2 }] }), /incomplete/);
});
test('weather requests are mocked and provider failures and timeouts are safe', async (t) => {
  const oldKey = process.env.OPENWEATHER_API_KEY;
  process.env.OPENWEATHER_API_KEY = 'test-only';
  try {
    const get = t.mock.method(axios, 'get', async (url, options) => {
      assert.equal(options.timeout, 8000);
      return { data: url.endsWith('/forecast') ? { list: [{ pop: 0.65 }] } : current };
    });
    assert.equal((await fetchCurrentWeather(18, 73)).rainProbability, 65);
    assert.equal(get.mock.callCount(), 2);
    get.mock.mockImplementation(async () => {
      throw { code: 'ECONNABORTED' };
    });
    await assert.rejects(fetchCurrentWeather(18, 73), (error) => error.statusCode === 504);
    get.mock.mockImplementation(async () => {
      throw new Error('secret provider details');
    });
    await assert.rejects(
      fetchCurrentWeather(18, 73),
      (error) => error.statusCode === 502 && !error.message.includes('secret'),
    );
  } finally {
    if (oldKey === undefined) delete process.env.OPENWEATHER_API_KEY;
    else process.env.OPENWEATHER_API_KEY = oldKey;
  }
});
