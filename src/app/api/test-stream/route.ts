import { NextRequest } from 'next/server';
import IORedis from 'ioredis';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get('jobId');
  if (!jobId) {
    return new Response('Missing jobId', { status: 400 });
  }

  const encoder = new TextEncoder();
  const sub = new IORedis();

  let closed = false;
  let messageHandler: ((channel: string, message: string) => void) | null =
    null;

  const stream = new ReadableStream({
    start(controller) {
      sub.subscribe(`test-output:${jobId}`, () => {
        messageHandler = (channel, message) => {
          if (!closed) {
            if (message.startsWith('__END__')) {
              const exitCode = message.split(':')[1];
              controller.enqueue(
                encoder.encode(
                  `event: end\ndata: Test run complete (exit code: ${exitCode})\n\n`
                )
              );
              controller.close();
              closed = true;
              if (messageHandler) sub.off('message', messageHandler);
              sub.unsubscribe(`test-output:${jobId}`);
              sub.quit();
              return;
            }
            try {
              controller.enqueue(encoder.encode(`data: ${message}\n\n`));
            } catch {
              // Ignore if controller is closed
            }
          }
        };
        sub.on('message', messageHandler);
      });
    },
    cancel() {
      closed = true;
      if (messageHandler) sub.off('message', messageHandler);
      sub.unsubscribe(`test-output:${jobId}`);
      sub.quit();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
