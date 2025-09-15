import { addJob } from '@/lib/testRunQueue';
import rateLimiter from '@/lib/rateLimiter';

export async function POST(request: Request) {
  const isRateLimited = await rateLimiter(request);

  if (isRateLimited) {
    return isRateLimited;
  }

  try {
    const job = await addJob();
    return Response.json({ jobId: job.id });
  } catch (error) {
    console.error('Failed to add job:', error);
    return Response.json(
      { error: 'Failed to create test job' },
      { status: 500 }
    );
  }
}
