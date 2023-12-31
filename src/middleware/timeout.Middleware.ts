import express from 'express';
import { ServerError } from '../Error';

export function timeoutMiddleware(request: express.Request, response: express.Response, next: express.NextFunction) {
  const { timeout } = request.query;

  if(!timeout){
    return next(new ServerError({
      statusCode: 401,
      domain: 'Timeout',
      message: 'Missing timeout',
    }));
  }

  const timeoutValue = Number(timeout);

  if(isNaN(timeoutValue)){
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
  }, timeoutValue * 1000);

  response.on('finish', () => {
    clearTimeout(timeoutHandler); 
  });
  
  next(); 
}