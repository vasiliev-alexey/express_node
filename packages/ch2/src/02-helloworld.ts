import http from 'http';

import fs from 'fs';
import * as Path from 'path';

const port = process.env.PORT || 3000;
const serveStaticFile = (
  res: http.ServerResponse,
  path: string,
  contentType: string,
  responseCode = 200
) => {
  fs.readFile(Path.resolve(__dirname, path), (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-type': 'text/plain' });
      return res.end('500 - Int Error:' + err);
    }
    res.writeHead(responseCode, { 'Content-type': contentType });
    res.end(data);
  });
};
const server = http.createServer((req, res) => {
  // Приводим URL к единому виду, удаляя
  // строку запроса, необязательную косую черту
  // в конце строки и переводя в нижний регистр.
  const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
  switch (path) {
    case '':
      serveStaticFile(res, '../public/home.html', 'text/html');
      break;
    case '/about':
      serveStaticFile(res, '../public/about.html', 'text/html');
      break;
    case '/img/logo.jpeg':
      serveStaticFile(res, '../public/img/logo.jpeg', 'image/jpeg');
      break;
    default:
      serveStaticFile(res, '../public/404.html', 'text/html', 404);
      break;
  }
});
server.listen(port, () =>
  // eslint-disable-next-line no-console
  console.log(
    `сервер запущен на порте ${port}; ` + 'нажмите Ctrl+C для завершения...'
  )
);
