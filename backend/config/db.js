import mongoose from 'mongoose';
export const connectDatabase = async () => {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is required');
  return mongoose.connect(process.env.MONGODB_URI);
};
