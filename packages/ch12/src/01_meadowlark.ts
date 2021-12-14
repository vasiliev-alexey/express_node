import express from 'express';
import { Logger } from 'tslog';
import { config } from 'dotenv';

config();
const app = express();
const port = process.env.PORT || 3000;
const log: Logger = new Logger({ name: 'web server' });

app.get('/', (req, res) => {
  res.send({ result: 'success' });
});

app.listen(port, () => {
  log.info(
    `Express запущен  в режиме ${app.get('env')} на http://localhost:${port}` +
      '; нажмите Ctrl+C для завершения.'
  );
});

export default app;
