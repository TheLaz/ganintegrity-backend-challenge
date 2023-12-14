![header](https://capsule-render.vercel.app/api?type=waving&color=auto&height=300&section=header&text=Gan%20Integrity&fontSize=90&animation=fadeIn&fontAlignY=38&desc=Backend%20API%20Challenge&descAlignY=51&descAlign=62)

## ENV

- Please create a `.env` at the root level (next to the package.json)
- `TOKEN=dGhlc2VjcmV0dG9rZW4=`
- For the challenge we assume that it is alright to have the secret here at the README
- Usually it will patched via pipelines

## API

(!) Requirements - a `.env` as mentioned above.
(!) If you created the `.env` file after running the api server, please shut it down completely and then run `yarn start:dev`

Please follow the instructions to run the API

- run `yarn` to install dependencies
- run `yarn start:dev` to start the server
- run `yarn start:specs` to run index.js tests as provided by the api backend challenge

## Scripts

I have located the index.js from the original backend challenge repository at the scripts folder under src.

You can run the script via `yarn start:specs`.

## Index.js (original backend challenge repository)

- Area endpoint, the timeout parameter had to be moved to the query string, this is due to the request is GET and could not have body params

- Guid `2152f96f-50c7-4d76-9e18-f7033bd14428` can not be found at `addresses.json`, and had to be change to `ed354fef-31d3-44a9-b92f-4a3bd7eb0408`.
  This is due the previous API call which uses the `city.guid` `ed354fef-31d3-44a9-b92f-4a3bd7eb0408`.

- Due to previous changes the following had to be changed `assert.strictEqual(cities.length, 15);` to match the test

## Notes

- node-fetch library downgraded to 2.6.6 - Due to network? node compatibility? issues when running the index.js
- We use `app.locals` to hold cities within a certain range. Probably a good idea to clean it, so what we can do is attach a timestamp and clean within a certain range if we wish.
