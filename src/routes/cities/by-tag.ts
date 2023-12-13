import { Request, Response } from 'express';

export function getCitiesByTag(request: Request, response: Response) {
  const { query, isActive } = request.query;

  response.status(200).json({query, isActive})
}