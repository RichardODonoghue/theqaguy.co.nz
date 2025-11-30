import { spawn } from 'child_process';

export const seedDatabase = async () => {
  return new Promise<void>((resolve, reject) => {
    const child = spawn('npx', ['tsx', './prisma/seed_blogs.ts']);

    let errorOutput = '';

    child.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    child.stderr.on('data', (data) => {
      const error = data.toString();
      console.error(error);
      errorOutput += error;
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(
            `Seeding blogs process exited with code ${code}\n${errorOutput}`
          )
        );
      }
    });
  });
};
