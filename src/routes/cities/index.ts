import express from 'express';

import { getArea } from './area';
import { getDistance } from './distance';
import { getAllCities } from './all-cities';
import { getAreaResult } from './area-result';
import { getCitiesByTag } from './city-by-tag';

/**
 * Middleware
 */
import { timeoutMiddleware } from '../../middleware/timeout.Middleware';


/**
 * Router
 */

const router = express.Router();

/**
 * Cities Routes
 */

router.get('/distance', getDistance);
router.get('/all-cities', getAllCities);
router.get('/cities-by-tag', getCitiesByTag);
router.get('/area', timeoutMiddleware, getArea);
router.get('/area-result/:cityGuid', getAreaResult);

export const citiesRouter = router;
