import fs from 'fs';
import { Request, Response } from 'express';

import * as env from './../../../config';

export async function getAllCities(_request: Request, response: Response) {
  const stat = fs.statSync(env.AddressFilePath);
  const fileSize = stat.size;

  const readStream = fs.createReadStream(env.AddressFilePath);
  readStream.on('open', () => {
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Content-Length', fileSize);
    readStream.pipe(response);
  });

  readStream.on('error', (err) => {
    response.status(500).send(err);
  });
}