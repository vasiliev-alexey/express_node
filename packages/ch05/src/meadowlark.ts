import express from 'express';
import { engine } from 'express-handlebars';
import * as Path from 'path';
import { Logger } from 'tslog';
import { about, home, notFound, serverError } from './lib/handlers';

const app = express();
const port = process.env.PORT || 3000;

const log: Logger = new Logger({ name: 'server' });

// Настройка механизма представлений Handlebars.
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', Path.join(__dirname, '../view'));

app.use(express.static(Path.resolve(__dirname, '../public')));

log.info('s', Path.resolve(__dirname, '../public'));

app.get('/', home);
app.get('/about', about);

app.use(notFound);
app.use(serverError);

// app.listen(port, () =>
//   log.info(
//     `Express запущен на http://localhost:${port}; ` +
//       `нажмите Ctrl+C для завершения.`
//   )
// );
if (require.main === module) {
  app.listen(port, () => {
    log.info(
      `Express запущен на http://localhost:${port}` +
        '; нажмите Ctrl+C для завершения.'
    );
  });
}
export default app;
