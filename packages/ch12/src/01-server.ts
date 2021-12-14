import express from 'express';
import cluster from 'cluster';
import { Logger } from 'tslog';

const log: Logger = new Logger({ name: `server ` });

const app = express();

app.use((_req, _res, next) => {
  if (cluster.isWorker)
    log.info(`Worker ${cluster.worker.id} received request`);
  next();
});

app.get('/fail', (_req, _res) => {
  throw new Error('Nope!');
});

app.get('/epic-fail', (_req, res) => {
  process.nextTick(() => {
    throw new Error('Kaboom!');
  });
  res.send('embarrased');
});

app.get('*', (req, res) => res.send('online'));

process.on('uncaughtException', (err) => {
  log.error('UNCAUGHT EXCEPTION\n', err.stack);
  // do any cleanup you need to do here...close
  // database connections, etc.  you'll probably
  // also want to notify your operations team
  // that a critical error occurred; you can use
  // email or even better a service like Sentry,
  // Rollbar, or New Relic
  // eslint-disable-next-line  no-process-exit
  process.exit(1);
});

export default function startServer(port: number | string) {
  app.listen(port, function () {
    log.info(
      `Express started in ${app.get('env')} ` +
        `mode on http://localhost:${port}` +
        `; press Ctrl-C to terminate.`
    );
  });
}

if (require.main === module) {
  // application run directly; start app server
  startServer(process.env.PORT || 3000);
} else {
  // application imported as a module via "require": export
  // function to create server
  module.exports = startServer;
}
