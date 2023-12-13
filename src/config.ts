require('dotenv').config()

import * as env from 'env-var';

export const PORT = env
  .get('PORT')
  .default(3000)
  .required()
  .asPortNumber();

export const TOKEN = env
  .get('TOKEN')
  .asString();