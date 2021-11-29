import http from 'http';

const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  // Приводим URL к единому виду, удаляя
  // строку запроса, необязательную косую черту
  // в конце строки и переводя в нижний регистр.
  const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
  switch (path) {
    case '':
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Homepage');
      break;
    case '/about':
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('About');
      break;
    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      break;
  }
});
server.listen(port, () =>
  // eslint-disable-next-line no-console
  console.log(
    `сервер запущен на порте ${port}; ` + 'нажмите Ctrl+C для завершения...'
  )
);
