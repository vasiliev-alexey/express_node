import pathUtils from 'path';

import fs from 'fs';
import { Request, Response } from 'express';
// Создаем каталог для хранения отпускных фото
// (если он еще не существует).

// Эти основанные на промисах версии функций
// файловой системы понадобятся нам позже.
import { promisify } from 'util';

const dataDir = pathUtils.resolve(__dirname, '..', 'data');
const vacationPhotosDir = pathUtils.join(dataDir, 'vacation-photos');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
if (!fs.existsSync(vacationPhotosDir)) fs.mkdirSync(vacationPhotosDir);

function saveContestEntry(
  _contestName: string,
  _email: string,
  _year: string,
  _month: string,
  _photoPath: string
) {
  // TODO... это будет добавлено позже
}
const mkdir = promisify(fs.mkdir);
const rename = promisify(fs.rename);
exports.api.vacationPhotoContest = async (
  req: Request,
  res: Response,
  fields: { email: string },
  files: { photo: { originalFilename: string; path: string }[] }
) => {
  const photo = files.photo[0];
  const dir = vacationPhotosDir + '/' + Date.now();
  const path = dir + '/' + photo.originalFilename;
  await mkdir(dir);
  await rename(photo.path, path);
  saveContestEntry(
    'vacation-photo',
    fields.email,
    req.params.year,
    req.params.month,
    path
  );
  res.send({ result: 'success' });
};
