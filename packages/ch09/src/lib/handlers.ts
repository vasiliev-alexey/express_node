import fortune from './fortune';
import { ErrorRequestHandler, Handler } from 'express';
import { Logger } from 'tslog';

const log: Logger = new Logger({ name: 'server' });

export const home: Handler = (req, res) => res.render('home');
export const about: Handler = (req, res) =>
  res.render('about', { fortune: fortune() });
export const notFound: Handler = (req, res) => res.render('404');
//
export const serverError: ErrorRequestHandler = (err, req, res, _) => {
  log.error(err);
  log.error(req.body);
  res.render('500');
};

export const headers: Handler = (req, res) => {
  res.type('text/plain');
  const headers = Object.entries(req.headers).map(
    ([key, value]) => `${key}: ${value}`
  );
  res.send(headers.join('\n'));
};
export const greeting: Handler = (req, res) => {
  res.render('greeting', {
    message: 'Приветствую, уважаемый программист!',
    style: req.query.style,
    userid: req.cookies?.userid,
  });
};
export const text: Handler = (req, res) => {
  res.type('text/plain');
  res.send('это тест');
};

export const sectionTest: Handler = (req, res) => res.render('section-test');
