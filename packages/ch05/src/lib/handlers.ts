import fortune from './fortune';
import { ErrorRequestHandler, Handler } from 'express';

export const home: Handler = (req, res) => res.render('home');
export const about: Handler = (req, res) =>
  res.render('about', { fortune: fortune() });
export const notFound: Handler = (req, res) => res.render('404');
//
export const serverError: ErrorRequestHandler = (err, req, res, _) =>
  res.render('500');
