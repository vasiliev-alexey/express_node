import express from 'express';
import { engine } from 'express-handlebars';
import * as Path from 'path';
import { Logger } from 'tslog';
import {
  about,
  greeting,
  headers,
  home,
  notFound,
  serverError,
  text,
} from './lib/handlers';

import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

const log: Logger = new Logger({ name: 'server' });

// Настройка механизма представлений Handlebars.
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', Path.join(__dirname, '../view'));
app.disable('x-powered-by');
app.use(express.static(Path.resolve(__dirname, '../public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', home);
app.get('/about', about);
app.get('/headers', headers);
app.get('/greeting', greeting);
app.get('/text', text);

app.use(notFound);
app.use(serverError);

if (require.main === module) {
  app.listen(port, () => {
    log.info(
      `Express запущен на http://localhost:${port}` +
        '; нажмите Ctrl+C для завершения.'
    );
  });
}
export default app;
