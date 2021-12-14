import express from 'express';
import { Logger } from 'tslog';
import { config } from 'dotenv';

import morgan from 'morgan';

import fs from 'fs';

config();
const app = express();
const port = process.env.PORT || 3000;
const log: Logger = new Logger({ name: 'web server' });

switch (app.get('env')) {
  case 'development':
    app.use(morgan('dev'));
    break;
  case 'production':
    const stream = fs.createWriteStream(__dirname + '/access.log', {
      flags: 'a',
    });
    app.use(morgan('combined', { stream }));
    break;
}

app.get('/', (req, res) => {
  res.send({ result: 'success' });
});

app.listen(port, () => {
  log.info(
    `Express запущен  в режиме ${app.get('env')} на http://localhost:${port}` +
      '; нажмите Ctrl+C для завершения.'
  );
});

export default app;
