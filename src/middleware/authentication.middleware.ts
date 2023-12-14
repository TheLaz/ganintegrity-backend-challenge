import express from 'express';
import { ServerError } from '../Error';

import * as env from './../config';

export function authenticationMiddleware(request: express.Request, _response: express.Response, next: express.NextFunction) {
  const bearerHeader = request.headers['authorization'];

  if(!bearerHeader) {
    return next(new ServerError({
      statusCode: 401,
      domain: 'Authentication',
      message: 'Missing authentication header',
    }));
  }

  const bearer = bearerHeader.split(' '); 
  const [,token] = bearer;

  if(token !== env.TOKEN) {
    return next(new ServerError({
      statusCode: 401,
      domain: 'Authentication',
      message: 'Invalid authentication token value',
    }));
  }

  next();
}