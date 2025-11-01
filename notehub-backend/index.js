import { setupServer } from './server.js';
import { initMongoConnection } from './src/db/initMongoConnection.js';
import dotenv from 'dotenv';

dotenv.config();

const bootstrap = async () => {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await initMongoConnection();
    console.log('✅ MongoDB connected, starting server...');
    setupServer();
  } catch (err) {
    console.error('❌ Bootstrap failed:', err);
    process.exit(1);
  }
};

bootstrap();
