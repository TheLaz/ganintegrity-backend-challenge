import { Request, Response, NextFunction } from 'express';
import { ServerError } from '../../../Error';

import { getAreaSchema } from './area.schema';
import { CitiesAreaMap } from '../../../types';
import { getAddresses } from '../../../api';
import { calculateDistance } from '../../../utils';

export async function getArea(request: Request, response: Response, next: NextFunction) {
  const { from, distance } = request.query;
  const { timeout } = request.body;

  const schemaResult = getAreaSchema.safeParse({
    from,
    timeout,
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

  response.status(202).json(`${request.protocol}://${request.get('host')}/area-result/${data.from}`);

  const areaMap: CitiesAreaMap = request.app.locals.citiesAreaMap;

  if(!areaMap[data.from]) {
    areaMap[data.from] = {
      status: 'init',
      cities: []
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
    return distanceFromCity <= data.distance * 1000;
  });

  areaMap[data.from] = {
    ...areaMap[data.from],
    status: 'done',
    cities: citiesInDistance
  }
}