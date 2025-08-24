// src/app/api/setup-admin/route.ts

import { NextResponse } from 'next/server';
import createAdmin from '@/lib/auth/setupAdminUser';

export async function GET(request: Request) {
  // This is a security measure to ensure this route is not publicly accessible.
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  if (secret !== process.env.BETTER_AUTH_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await createAdmin();
    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully.',
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
