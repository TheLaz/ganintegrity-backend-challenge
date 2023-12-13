import fs from 'fs';

import { Request, Response, NextFunction } from 'express';
import { ServerError } from './../../../Error';

import { getCitiesByTagSchema } from './by-tag.schema';
import { Address } from '../../../types';

export function getCitiesByTag(request: Request, response: Response, next: NextFunction) {
  const { tag = '', isActive = true } = request.query;

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

  fs.readFile(`${ __dirname}/../../../repositories/addresses.json`, "utf8", (error, file) => {
    if (error) {
      return next(new ServerError({
        message: error.message,
        statusCode: 500,
        domain: 'Cities'
      }));
    }

    const addresses: Address[] = JSON.parse(file);

    const addressesResponse = addresses.filter((address) => address.tags.includes(data.tag) && address.isActive === data.isActive);

    response.status(200).json(addressesResponse)

  });
}