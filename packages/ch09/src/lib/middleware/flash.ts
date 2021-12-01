import { NextFunction, Request, Response } from 'express';

declare module 'express-session' {
  interface SessionData {
    flash: string;
  }
}

const flash = (req: Request, res: Response, next: NextFunction) => {
  // Если имеется уведомление,
  // переместим его в контекст, а затем удалим.
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
};

export default flash;
