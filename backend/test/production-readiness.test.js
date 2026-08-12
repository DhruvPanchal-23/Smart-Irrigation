import test from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import { connectDatabase, getDatabaseStatus } from '../config/db.js';
import { normalizeOrigin } from '../app.js';
import { requireDatabase } from '../middleware/database.middleware.js';

test('normalizes a production frontend origin by removing trailing slashes', () => {
  assert.equal(normalizeOrigin('https://smart-irrigation-wbjg.vercel.app/'), 'https://smart-irrigation-wbjg.vercel.app');
});

test('reports the current database readiness state', () => {
  const status = getDatabaseStatus();
  assert.equal(status.connected, mongoose.connection.readyState === 1);
  assert.equal(typeof status.state, 'string');
});

test('rejects missing database configuration immediately', async () => {
  const originalUri = process.env.MONGODB_URI;
  delete process.env.MONGODB_URI;

  try {
    await assert.rejects(connectDatabase(), /MONGODB_URI is required/);
  } finally {
    if (originalUri === undefined) delete process.env.MONGODB_URI;
    else process.env.MONGODB_URI = originalUri;
  }
});

test('database middleware returns a sanitized 503 when configuration is missing', async () => {
  const originalUri = process.env.MONGODB_URI;
  delete process.env.MONGODB_URI;
  let receivedError;

  try {
    await requireDatabase(
      { method: 'POST', originalUrl: '/api/v1/auth/register' },
      {},
      (error) => { receivedError = error; },
    );
    assert.equal(receivedError.statusCode, 503);
    assert.equal(receivedError.code, 'DATABASE_UNAVAILABLE');
    assert.equal(receivedError.message, 'Database service is temporarily unavailable');
  } finally {
    if (originalUri === undefined) delete process.env.MONGODB_URI;
    else process.env.MONGODB_URI = originalUri;
  }
});

test('CORS preflight does not require a database connection', async () => {
  let receivedError = Symbol('not called');
  await requireDatabase({ method: 'OPTIONS' }, {}, (error) => { receivedError = error; });
  assert.equal(receivedError, undefined);
});
