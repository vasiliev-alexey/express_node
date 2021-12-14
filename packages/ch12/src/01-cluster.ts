import cluster from 'cluster';
import { Logger } from 'tslog';

import { cpus } from 'os';

import startServer from './01-server';

const log: Logger = new Logger({ name: `cluster ` });

function startWorker() {
  const worker = cluster.fork();
  log.info(`CLUSTER: Worker ${worker.id} started`);
}

if (cluster.isPrimary) {
  cpus().forEach(startWorker);

  // log any workers that disconnect; if a worker disconnects, it
  // should then exit, so we'll wait for the exit event to spawn
  // a new worker to replace it
  cluster.on('disconnect', (worker) =>
    log.info(`CLUSTER: Worker ${worker.id} disconnected from the cluster.`)
  );

  // when a worker dies (exits), create a worker to replace it
  cluster.on('exit', (worker, code, signal) => {
    log.info(
      `CLUSTER: Worker ${worker.id} died with exit ` +
        `code ${code} (${signal})`
    );
    startWorker();
  });
} else {
  const port = process.env.PORT || 3000;
  // start our app on worker; see 01-server.ts
  startServer(port);
}
