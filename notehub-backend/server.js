import dotenv from 'dotenv';
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import router from './src/routes/index.js';
import { errorHandler } from './src/middlewares/errorHandler.js';
import { notFoundHandler } from './src/middlewares/notFoundHandler.js';

dotenv.config();

const PORT = process.env.PORT;

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

  app.use((req, res, next) => {
    console.log('📥 Incoming request:', req.method, req.originalUrl);
    console.log('Headers:', req.headers);
    console.log('Cookies:', req.cookies);
    next();
  });

  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api', router);

  // Обработка 404
  app.use((req, res) => {
    console.warn('⚠️ 404 Not Found:', req.originalUrl);
    res.status(404).json({ error: 'Not Found' });
  });

  // Ошибки
  app.use((err, req, res, next) => {
    console.error('❌ Server error:', err);
    res
      .status(err.status || 500)
      .json({ error: err.message || 'Internal Server Error' });
  });

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
