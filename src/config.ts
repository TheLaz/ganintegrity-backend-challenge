require('dotenv').config()

import * as env from 'env-var';

export const PORT = env
  .get('PORT')
  .default(8080)
  .required()
  .asPortNumber();

export const TOKEN = env
  .get('TOKEN')
  .asString();

export const AddressFilePath = `${ __dirname}/data-repositories/addresses.json`;