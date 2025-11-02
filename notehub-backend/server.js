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

  // === Настройки CORS ===
  const corsOptions = {
    origin: 'https://wise-note-nu.vercel.app', // твой фронт
    credentials: true, // для куки
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

  // === Логгер Pino ===
  app.use(
    pino({
      transport:
        process.env.NODE_ENV !== 'production'
          ? { target: 'pino-pretty', options: { colorize: true } }
          : undefined,
    }),
  );

  // === CORS и preflight ===
  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions)); // <-- обязательно с теми же настройками!

  // === Парсинг тела и cookie ===
  app.use(express.json());
  app.use(cookieParser());

  // === Тестовый health-check ===
  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // === Основные маршруты ===
  app.use('/', router);

  // === Обработка 404 и ошибок ===
  app.use(notFoundHandler);
  app.use(errorHandler);

  // === Запуск сервера ===
  app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });
};
