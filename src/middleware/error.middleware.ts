import express from 'express';
import { ServerError } from './../Error';


export function errorMiddleware(err: TypeError | ServerError, _request: express.Request, response: express.Response, _next: express.NextFunction) {
  let serverError = err;

  if (!(err instanceof ServerError)) {
    serverError = new ServerError({
      message: 'Oh no, this is embarrassing. We are having troubles my friend',
      statusCode: 500,
      domain: "Unknown"
    });
  }

  /**
   * We can do error tracking here as well.
   */

  /**
   * Display error 
   */

  response.status((serverError as ServerError).statusCode).json({
    message: serverError.message,
    domain: serverError instanceof ServerError ? serverError.domain : 'Unknown',
  });
}