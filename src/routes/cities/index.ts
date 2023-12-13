import express from 'express';

import { getArea } from './area';
import { getCitiesByTag } from './by-tag';
import { getDistance } from './distance';
import { timeoutMiddleware } from '../../middleware/timeout.Middleware';
import { getAreaResult } from './area-result';
import { getAllCities } from './all-cities';

/**
 * Router
 */

const router = express.Router();

/**
 * Cities Routes
 */

router.get('/tag', getCitiesByTag);
router.get('/distance', getDistance);
router.get('/area', timeoutMiddleware, getArea);
router.get('/area-result/:city', getAreaResult);
router.get('/all-cities', getAllCities);

export const citiesRouter = router;
