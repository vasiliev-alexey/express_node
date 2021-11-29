import { Handler } from 'express';
import { Logger } from 'tslog';

const log: Logger = new Logger({ name: 'server' });

export const newsletterSignup: Handler = (req, res) => {
  // Мы изучим CSRF позже... сейчас мы лишь
  // вводим фиктивное значение.
  res.render('newsletter', { csrf: 'Здесь находится токен CSRF' });
};

export const newsletterSignupProcess: Handler = (req, res) => {
  log.debug('Форма (из строки запроса): ' + req.query.form);
  log.debug('Токен CSRF (из скрытого поля формы): ' + req.body._csrf);
  log.debug('Имя (из видимого поля формы): ' + req.body.name);
  log.debug('E-mail (из видимого поля формы): ' + req.body.email);
  res.redirect(303, '/newsletter-signup/thank-you');
};
export const newsletterSignupThankYou: Handler = (req, res) =>
  res.render('newsletter-signup-thank-you');

export const newsletterSignupApi: Handler = (req, res) => {
  log.debug('Токен CSRF (из скрытого поля формы): ' + req.body._csrf);
  log.debug('Имя (из видимого поля формы): ' + req.body.name);
  log.debug('Email (из видимого поля формы): ' + req.body.email);
  res.send({ result: 'success' });
};
