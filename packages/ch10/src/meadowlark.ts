import express, { NextFunction, Request, Response } from 'express';
import * as Path from 'path';
import { Logger } from 'tslog';

import { config } from 'dotenv';

import expressSession from 'express-session';
import bodyParser from 'body-parser';

config();
const app = express();
const port = process.env.PORT || 3000;

app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.cookieSecret,
  })
);

app.use(bodyParser.json());

const log: Logger = new Logger({ name: 'server' });

// Настройка механизма представлений Handlebars.
app.disable('x-powered-by');
app.use(express.static(Path.resolve(__dirname, '../public')));

app.use((req, res, next) => {
  log.info('ВСЕГДА');
  next();
});
app.get('/a', (req, res) => {
  log.info('/a: маршрут завершен');
  res.send('a');
});
app.get('/a', (_req, _res) => {
  log.info('/a: никогда не вызывается');
});

app.get('/b', (req, res, next) => {
  log.info('/b: маршрут не завершен');
  next();
});
app.use((req, res, next) => {
  log.info('ИНОГДА');
  next();
});
app.get('/b', (_req, _res, _next) => {
  log.info('/b (часть 2): сгенерирована ошибка');
  throw new Error('b не выполнено');
});

app.use('/b', (err: Error, req: Request, res: Response, next: NextFunction) => {
  log.info('/b ошибка обнаружена и передана далее');
  next(err);
});
app.get('/c', (_err, _req) => {
  log.info('/c: сгенерирована ошибка');
  throw new Error('c не выполнено');
});
app.use('/c', (err: Error, req: Request, res: Response, next: NextFunction) => {
  log.info('/c: ошибка обнаружена, но не передана  далее');
  next();
});

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  log.info('обнаружена необработанная ошибка: ' + err.message);
  res.send('500 — ошибка сервера');
});
app.use((req, res) => {
  log.info('маршрут не обработан');
  res.send('404 — не найдено');
});

/*************/

if (require.main === module) {
  app.listen(port, () => {
    log.info(
      `Express запущен на http://localhost:${port}` +
        '; нажмите Ctrl+C для завершения.'
    );
  });
}

log.info('secret key ', process.env.cookieSecret);

export default app;
