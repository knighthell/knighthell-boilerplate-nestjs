import cluster from 'cluster';
import { cpus } from 'os';

export const DEFAULT_WORKER_COUNT = 4;

const numCPUs = cpus().length;

let abnormalExitCount = 0;

export class Cluster {
  static start(fn: () => any) {
    if (typeof fn !== 'function') {
      console.error(
        `[Cluster] Cluster.start must be a function type : ${typeof fn}`,
      );
      process.exit(1);
    }

    let workerCount =
      parseInt(process.env.WORKER_COUNT) ?? DEFAULT_WORKER_COUNT;
    console.log(
      `[Cluster] numCPUs: ${numCPUs}, max worker count : ${workerCount}`,
    );

    if (workerCount > numCPUs) {
      workerCount = numCPUs;
    }
    console.log(`[Cluster] worker count : ${workerCount}`);
    console.log(
      `[Cluster] isPrimary : ${cluster.isPrimary},  isMaster : ${cluster.isMaster}`,
    );

    if (cluster.isPrimary || cluster.isMaster) {
      console.log(`[Cluster] master server started on ${process.pid}`);

      //ensure workers exit cleanly
      process.on('SIGINT', () => {
        console.log('[Cluster] cluster shutting down...');
        for (const id in cluster.workers) {
          cluster.workers[id].kill();
        }
        // exit the master process
        process.exit(0);
      });

      for (let i = 0; i < workerCount; i++) {
        cluster.fork();
      }

      cluster.on('online', (worker) => {
        console.log(`[Cluster] worker ${worker.process.pid} is online`);
      });

      cluster.on('exit', (worker, code, signal) => {
        console.error(
          `[Cluster] worker pid: ${worker.process.pid} died. Restarting`,
        );
        console.error(`[Cluster] code: ${code}`);
        console.error(`[Cluster] signal: ${signal}`);

        if (code !== 0) {
          abnormalExitCount++;
        }

        if (abnormalExitCount >= 3) {
          console.log(
            '3번 이상 비정상 종료가 발생했습니다. 서비스가 종료됩니다.',
          );
          process.exit(1);
        }

        cluster.fork();
      });
    } else {
      fn();
    }
  }
}
