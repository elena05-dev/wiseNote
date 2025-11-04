import dotenv from 'dotenv';
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import router from './src/routes/index.js';
import { errorHandler } from './src/middlewares/errorHandler.js';
import { notFoundHandler } from './src/middlewares/notFoundHandler.js';

dotenv.config();

const PORT = Number(process.env.PORT) || 3001;

export const setupServer = () => {
  const app = express();

  const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

  app.use(
    pino({
      transport:
        process.env.NODE_ENV !== 'production'
          ? { target: 'pino-pretty', options: { colorize: true } }
          : undefined,
    }),
  );

  app.use(express.json());
  app.use(cookieParser());
  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));

  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api', router);

  app.use(notFoundHandler);
  app.use(errorHandler);

  console.log('CORS_ORIGIN:', process.env.CORS_ORIGIN);
  console.log(
    'JWT_SECRET:',
    process.env.JWT_SECRET ? '✅ loaded' : '❌ missing',
  );
  console.log('PORT:', process.env.PORT);

  app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });
};
