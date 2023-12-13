import fs from 'fs';
import { ok, err, fromPromise, Result } from 'neverthrow';
import { Address } from "../../types";

export async function getAddresses(): Promise<Result<Address[], Error>> {
  const file = await fromPromise(
    fs.promises.readFile(`${ __dirname}/addresses.json`, 'utf8'),
    () => Error('Could not read addresses file')
  );

  if(file.isErr()) {
    return err(file.error);
  }


  const addresses: Address[] = JSON.parse(file.value);

  return ok(addresses);
}