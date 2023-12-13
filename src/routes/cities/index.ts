import express from 'express';

import { getCitiesByTag } from './by-tag';
import { getDistance } from './get-distance';

/**
 * Router
 */

const router = express.Router();

/**
 * Cities Routes
 */

router.get('/tag', getCitiesByTag);
router.get('/distance', getDistance);


export const citiesRouter = router;
