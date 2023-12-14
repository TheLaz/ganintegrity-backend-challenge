import { Request, Response, NextFunction } from 'express';
import { ServerError } from '../../../Error';

import { getCitiesByTagSchema } from './city-by-tag.schema';

import { getAddresses } from '../../../api';

export async function getCitiesByTag(request: Request, response: Response, next: NextFunction) {
  const { tag , isActive } = request.query;

  const schemaResult = getCitiesByTagSchema.safeParse({
    tag,
    isActive: Boolean(isActive)
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

  const addresses = addressesResponse.value.filter((address) => address.tags.includes(data.tag) && address.isActive === data.isActive);

  response.status(200).json({
    cities: addresses
  })
}