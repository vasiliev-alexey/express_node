import { Request, Response } from 'express';

import { Logger } from 'tslog';

const log: Logger = new Logger({ name: 'vacationPhotoContestProcess' });

export const vacationPhotoContestProcess = (
  req: Request,
  res: Response,
  fields: unknown,
  files: unknown
) => {
  log.debug('данные поля: ', fields);
  log.debug('файлы: ', files);
  res.redirect(303, '/contest/vacation-photo-thank-you');
};
