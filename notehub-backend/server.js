import dotenv from 'dotenv';
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './src/utils/getEnvVar.js';
import router from './src/routes/index.js';
import { errorHandler } from './src/middlewares/errorHandler.js';
import { notFoundHandler } from './src/middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(
    cors({
      origin: 'https://wise-note-nu.vercel.app',
      credentials: true,
    }),
  );

  app.use(express.json());

  app.use(cookieParser());

  app.use(
    pino({
      transport:
        process.env.NODE_ENV !== 'production'
          ? {
              target: 'pino-pretty',
              options: { colorize: true },
            }
          : undefined,
    }),
  );

  app.use('/', router);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
