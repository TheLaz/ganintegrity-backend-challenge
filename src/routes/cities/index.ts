import express from 'express';

import { getCitiesByTag } from './by-tag';

/**
 * Router
 */

const router = express.Router();

/**
 * Cities Routes
 */

router.get('/tag', getCitiesByTag);


export const citiesRouter = router;
