import { Worker, Queue } from 'bullmq';
import IORedis from 'ioredis';
import { playwrightTestRunner } from './playwrightTestRunner';

const connection = new IORedis({ maxRetriesPerRequest: null });
const pub = connection;

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
    try {
      const exitCode = await playwrightTestRunner((data: string) => {
        pub.publish(`test-output:${jobId}`, data);
      });
      // Signal completion with exit code
      pub.publish(`test-output:${jobId}`, `__END__:${exitCode}`);
    } catch (error) {
      console.error(`Test job ${jobId} failed:`, error);
      pub.publish(`test-output:${jobId}`, `__END__:-1`);
      throw error; // Re-throw to mark job as failed
    }
  },
  { connection, concurrency: 5 }
);

worker.on('completed', (job) => {
  console.log(`${job.id} has completed!`);
});
