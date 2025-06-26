import { spawn } from 'child_process';

export function playwrightTestRunner(onData?: (data: string) => void) {
  return new Promise((resolve, reject) => {
    const child = spawn('npm', ['run', 'test:e2e']);

    child.stdout.on('data', (data) => {
      onData?.(data.toString());
    });

    child.stderr.on('data', (data) => {
      onData?.(data.toString());
    });

    child.on('close', (code) => {
      resolve(code);
    });

    child.on('error', (err) => {
      reject(err);
    });
  });
}
