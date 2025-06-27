import { NextRequest } from 'next/server';
import { addJob } from '@/lib/testRunQueue';

export async function POST(req: NextRequest) {
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
