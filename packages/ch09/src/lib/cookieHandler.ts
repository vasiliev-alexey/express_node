import { Handler } from 'express';
import { Logger } from 'tslog';

const log: Logger = new Logger({ name: 'cookie Handler' });

export const testCookie: Handler = (req, res) => {
  res.cookie('monster', 'sssssssssss');
  res.cookie('signed_monster', 'ням-ням', { signed: true });

  const monster = req.cookies.monster;

  log.info('monster:', monster);

  res.send({ result: 'success' });
};
