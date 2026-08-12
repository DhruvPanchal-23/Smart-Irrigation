import mongoose from 'mongoose';

const DEFAULT_SERVER_SELECTION_TIMEOUT_MS = 5000;
let connectionPromise = null;

export const getDatabaseStatus = () => ({
  connected: mongoose.connection.readyState === 1,
  state: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState] || 'unknown',
});

export const connectDatabase = async () => {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is required');

  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (connectionPromise) return connectionPromise;

  connectionPromise = mongoose
    .connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: DEFAULT_SERVER_SELECTION_TIMEOUT_MS })
    .then(() => mongoose.connection)
    .catch((error) => {
      connectionPromise = null;
      throw error;
    });

  return connectionPromise;
};
