import express from 'express';
import { ServerError } from '../Error';

export function timeoutMiddleware(request: express.Request, response: express.Response, next: express.NextFunction) {
  const { timeout } = request.body;

  if(!timeout || isNaN(timeout)){
    return next(new ServerError({
      statusCode: 401,
      domain: 'Timeout',
      message: 'Invalid timeout value',
    }));
  }

  const timeoutHandler = setTimeout(() => {
    return next(new ServerError({
      statusCode: 401,
      domain: 'Timeout',
      message: 'Request timed out',
    }));
  }, timeout * 1000);

  response.on('finish', () => {
    clearTimeout(timeoutHandler); 
  });
  
  next(); 
}