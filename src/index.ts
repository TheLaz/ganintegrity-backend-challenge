import app from './app';
import * as env from './config';

const server = app.listen(env.PORT, () => {
  console.log(`App is ready on ${env.PORT}`);
});

export default server;