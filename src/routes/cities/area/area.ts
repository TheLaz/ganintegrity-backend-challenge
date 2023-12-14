import { Request, Response, NextFunction } from 'express';
import { ServerError } from '../../../Error';

import { getAddresses } from '../../../api';
import { getAreaSchema } from './area.schema';
import { CitiesAreaMap } from '../../../types';
import { calculateDistance } from '../../../utils';

export async function getArea(request: Request, response: Response, next: NextFunction) {
  const { from, distance } = request.query;

  const schemaResult = getAreaSchema.safeParse({
    from,
    distance: Number(distance)
  });

  if(!schemaResult.success) {
    return next(new ServerError({
      message: 'Invalid params',
      statusCode: 400,
      domain: 'Cities'
    }));
  }

  const { data } = schemaResult;

  const addressesResponse = await getAddresses();

  if(addressesResponse.isErr()) {
    return next(new ServerError({
      message: addressesResponse.error.message,
      statusCode: 500,
      domain: 'Cities'
    }));
  }

  const fromAddress = addressesResponse.value.find((address) => address.guid === data.from);

  if(!fromAddress) {
    return next(new ServerError({
      message: `Could not find address with guid of ${data.from}`,
      statusCode: 404,
      domain: 'Cities'
    }));
  }

  response.status(202).json({
    resultsUrl:`${request.protocol}://${request.get('host')}/area-result/${data.from}`
  });

  const areaMap: CitiesAreaMap = request.app.locals.citiesAreaMap;

  /**
   * The result could change based on the distance, therefor
   * we "reset" the lookup in case we get a request with the same
   * city (address) but different distance
   */
  
  if(!areaMap[data.from] || areaMap[data.from].distance !== data.distance) {
    areaMap[data.from] = {
      cities: [],
      status: 'init',
      distance: data.distance,
    }
  }
  
  const { status } = areaMap[data.from];

  if(status === 'done' || status === 'in-progress') {
    return;
  }

  areaMap[data.from] = {
    ...areaMap[data.from],
    status: 'in-progress'
  };

  const cities = addressesResponse.value.filter((address) => address.guid !== data.from);

  const citiesInDistance = cities.filter((city) => {
    const distanceFromCity = calculateDistance(fromAddress, city);
    return distanceFromCity.value <= data.distance * 1000;
  });

  areaMap[data.from] = {
    ...areaMap[data.from],
    status: 'done',
    cities: citiesInDistance
  }
}