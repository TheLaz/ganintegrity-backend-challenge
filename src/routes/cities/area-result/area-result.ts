import { Request, Response, NextFunction } from 'express';
import { ServerError } from '../../../Error';

import { getAreaResultSchema } from './area-result.schema';
import { CitiesAreaMap } from '../../../types';

export async function getAreaResult(request: Request, response: Response, next: NextFunction) {
  const { cityGuid } = request.params;

  const schemaResult = getAreaResultSchema.safeParse({
    cityGuid
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

  if(!areaMap[data.cityGuid]) {
    return next(new ServerError({
      message: `City was not found ${data.cityGuid}`,
      statusCode: 404,
      domain: 'Cities'
    }));
  }

  if(areaMap[data.cityGuid].status !== 'done') {
    return response.status(202).json({ city: data.cityGuid});
  } 

  response.status(200).json({
    ...areaMap[data.cityGuid]
  });
}