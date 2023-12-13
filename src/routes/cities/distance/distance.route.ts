import { Request, Response, NextFunction } from 'express';
import { ServerError } from '../../../Error';

import { getDistanceSchema } from './distance.schema';
import { getAddresses } from '../../../api';
import { calculateDistance } from '../../../utils';

export async function getDistance(request: Request, response: Response, next: NextFunction) {
  const { to = '', from = '' } = request.query;

  const schemaResult = getDistanceSchema.safeParse({
    to, 
    from
  });

  if(!schemaResult.success) {
    return next(new ServerError({
      message: 'Invalid query params',
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

  const addresses = addressesResponse.value;

  const addressTo = addresses.find((address) => address.guid === data.to);
  const addressFrom = addresses.find((address) => address.guid === data.from);


  if (!addressTo) {
    return next(new ServerError({
      message: `Can not find address for guid ${data.to}`,
      statusCode: 404,
      domain: 'Cities'
    }));
  }

  if (!addressFrom) {
    return next(new ServerError({
      message: `Can not find address for guid ${data.from}`,
      statusCode: 404,
      domain: 'Cities'
    }));
  }

  const distance = calculateDistance(addressFrom, addressTo);

  response.status(200).json({
    from: addressFrom,
    to: addressTo,
    unit: 'km',
    distance,
  });
}