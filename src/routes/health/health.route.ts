import express, { Request, Response } from 'express';

const router = express.Router();

function getHealthStatus(_request: Request, response: Response) {
  response.status(200).send('OK')
}

router.get('/', getHealthStatus);

export { router };