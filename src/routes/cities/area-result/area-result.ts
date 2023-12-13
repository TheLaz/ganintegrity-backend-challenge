import { Request, Response, NextFunction } from 'express';
import { ServerError } from '../../../Error';

import { getAreaResultSchema } from './area-result.schema';
import { CitiesAreaMap } from '../../../types';

export async function getAreaResult(request: Request, response: Response, next: NextFunction) {
  const { city } = request.params;

  const schemaResult = getAreaResultSchema.safeParse({
    city
  });

  if(!schemaResult.success) {
    return next(new ServerError({
      message: 'Invalid params',
      statusCode: 400,
      domain: 'Cities'
    }));
  }

  const { data } = schemaResult;

  const areaMap: CitiesAreaMap = request.app.locals.citiesAreaMap;

  if(!areaMap[data.city]) {
    return next(new ServerError({
      message: `City was not found ${data.city}`,
      statusCode: 404,
      domain: 'Cities'
    }));
  }

  if(areaMap[data.city].status !== 'done') {
    return response.status(202).json({ city: data.city});
  } 

  response.status(200).json({
    ...areaMap[data.city]
  });
}