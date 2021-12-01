import { Handler } from 'express';
import { Logger } from 'tslog';

const log: Logger = new Logger({ name: 'Session Handler' });

declare module 'express-session' {
  interface SessionData {
    userName: string;
  }
}

export const sessionTest: Handler = (req, res) => {
  log.info('fff', req.session.userName);

  req.session.userName = 'ssss';

  res.send({ result: 'sessionTest' });
};
