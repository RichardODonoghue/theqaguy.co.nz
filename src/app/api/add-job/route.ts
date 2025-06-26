import { NextRequest } from 'next/server';
import { addJob } from '@/lib/testRunQueue';

export async function POST(req: NextRequest) {
  const job = await addJob();
  return Response.json({ jobId: job.id });
}
