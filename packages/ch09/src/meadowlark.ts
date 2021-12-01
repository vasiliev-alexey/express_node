import express from 'express';
import { engine } from 'express-handlebars';
import * as Path from 'path';
import { Logger } from 'tslog';
import flashMiddleWare from './lib/middleware/flash';
import {
  about,
  greeting,
  headers,
  home,
  notFound,
  sectionTest,
  serverError,
  text,
} from './lib/handlers';
import bodyParser from 'body-parser';
import { weatherMiddleware } from './lib/middleware/weather';
import {
  newsletterSignup,
  newsletterSignupApi,
  newsletterSignupProcess,
  newsletterSignupThankYou,
} from './lib/formsHandler';

import multiparty from 'multiparty';
import { vacationPhotoContestProcess } from './lib/multipartHandler';

import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import { testCookie } from './lib/cookieHandler';

import expressSession from 'express-session';
import { sessionTest } from './lib/sessionHandler';

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

const log: Logger = new Logger({ name: 'server' });

// Настройка механизма представлений Handlebars.
app.engine(
  'handlebars',
  engine({
    defaultLayout: 'main',
    helpers: {
      section: function (
        name: string,
        options: { fn: (ctx: unknown) => void }
      ): void {
        //   log.info(this);

        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      },
    },
  })
);
app.set('view engine', 'handlebars');
app.set('views', Path.join(__dirname, '../view'));
app.disable('x-powered-by');
app.use(express.static(Path.resolve(__dirname, '../public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser(process.env.cookieSecret));

app.use(weatherMiddleware);
app.use(flashMiddleWare);

app.get('/', home);
app.get('/about', about);
app.get('/headers', headers);
app.get('/greeting', greeting);
app.get('/text', text);
app.get('/section-test', sectionTest);

/* forms handlers*/
app.get('/newsletter-signup', newsletterSignup);
app.post('/newsletter-signup/process', newsletterSignupProcess);
app.get('/newsletter-signup/thank-you', newsletterSignupThankYou);
app.post('/api/newsletter-signup', newsletterSignupApi);

app.get('/testCookie', testCookie);
app.get('/sessionTest', sessionTest);

app.post('/contest/vacation-photo/:year/:month', (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).send({ error: err.message });
    vacationPhotoContestProcess(req, res, fields, files);
  });
});

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

log.info('secret key ', process.env.cookieSecret);

export default app;
