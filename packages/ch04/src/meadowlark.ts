import express, { NextFunction, Request, Response } from 'express';
import { engine } from 'express-handlebars';
import * as Path from 'path';
import { Logger } from 'tslog';

import getFortune from './lib/fortune';

const app = express();
const port = process.env.PORT || 3000;

const log: Logger = new Logger({ name: 'server' });

// Настройка механизма представлений Handlebars.
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', Path.join(__dirname, '../view'));

app.use(express.static(Path.resolve(__dirname, '../public')));

log.info('s', Path.resolve(__dirname, '../public'));

app.get('/', (req, res) => res.render('home'));
app.get('/about', (req, res) => {
  res.render('about', { fortune: getFortune() });
});

// Пользовательская страница 404
app.use((req, res) => {
  res.status(404);
  res.render('404');
});
// Пользовательская страница 500
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  log.error(err);

  res.status(500);
  res.render('500');
});

app.listen(port, () =>
  log.info(
    `Express запущен на http://localhost:${port}; ` +
      `нажмите Ctrl+C для завершения.`
  )
);
