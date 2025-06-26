import { Worker, Queue } from 'bullmq';
import IORedis from 'ioredis';
import { playwrightTestRunner } from './playwrightTestRunner';

const connection = new IORedis({ maxRetriesPerRequest: null });
const pub = new IORedis();

export const testQueue = new Queue('test-runner', { connection });

export const addJob = async () => {
  const job = await testQueue.add(
    'test-runner',
    {}, // No need to pass fn
    { removeOnComplete: false }
  );
  return job;
};

export const worker = new Worker(
  'test-runner',
  async (job) => {
    const jobId = job.id;
    const exitCode = await playwrightTestRunner((data: string) => {
      pub.publish(`test-output:${jobId}`, data);
    });
    // Signal completion with exit code
    pub.publish(`test-output:${jobId}`, `__END__:${exitCode}`);
  },
  { connection, concurrency: 5 }
);

worker.on('completed', (job) => {
  console.log(`${job.id} has completed!`);
});
