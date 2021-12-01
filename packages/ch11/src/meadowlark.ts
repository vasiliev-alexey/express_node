import express from 'express';
import { Logger } from 'tslog';
import { config } from 'dotenv';

import { mailTransport } from './transport';

// eslint-disable-next-line import/no-extraneous-dependencies
import htmlToFormattedText from 'html-to-formatted-text';
import bodyParser from 'body-parser';
import Path from 'path';
import { engine } from 'express-handlebars';

config();
const app = express();
const port = process.env.PORT || 3000;
const log: Logger = new Logger({ name: 'web server' });

app.use(bodyParser.json());

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
/*************/

app.get('/cart/checkout', (req, res, _next) => {
  const newCart = {
    billing: { name: 'dummy client', email: 'ssss@mail.no' },
    number: 'sssssssssssssss',
  };

  res.render(
    'email/cart-thank-you',
    {
      layout: null,
      cart: newCart,
    },
    (err, html) => {
      log.info('визуализируемое сообщение: ', html);
      if (err) {
        log.error('ошибка в шаблоне письма', err);

        throw err;
      }

      mailTransport
        .sendMail({
          from: `"Meadowlark Travel" ${process.env.postUser}@yandex.ru`,
          to: `${process.env.postReceiver}@mail.ru`,
          subject: 'Спасибо за заказ поездки в ' + 'Meadowlark Travel',
          html: html,
          text: htmlToFormattedText(html),
        })
        .then((info) => {
          log.info('sent! ', info);
          res.render('cart-thank-you', { cart: newCart });
        })
        .catch((err) => {
          log.error('Не могу отправить ' + 'подтверждение: ' + err.message);
        });
    }
  );
});

app.listen(port, () => {
  log.info(
    `Express запущен на http://localhost:${port}` +
      '; нажмите Ctrl+C для завершения.'
  );
});

export default app;
