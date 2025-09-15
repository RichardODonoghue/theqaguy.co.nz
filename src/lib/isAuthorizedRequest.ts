import { NextResponse } from 'next/server';

export const isAuthorizedRequest = (request: Request) => {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  if (secret !== process.env.BETTER_AUTH_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
};
