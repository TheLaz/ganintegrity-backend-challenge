import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

/**
 * Middleware
 */

import { errorMiddleware, authenticationMiddleware } from './middleware';

/**
 * Routes
 */

import { healthRouter } from './routes/health';
import { citiesRouter } from './routes/cities';

/**
 * App Configuration
 */

const app: express.Application = express();


/**
 * Area Cities,
 */

app.locals.citiesAreaMap = {};

app.use(cors());
app.use(helmet());
app.use(express.json());

/**
 * Server Routes
 */

app.use('/health', healthRouter);
app.use('/cities', authenticationMiddleware, citiesRouter);

/**
 * Error
 */

app.use(errorMiddleware);

export default app;