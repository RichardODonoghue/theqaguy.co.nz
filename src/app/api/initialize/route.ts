// src/app/api/setup-admin/route.ts

import { NextResponse } from 'next/server';
import { isAuthorizedRequest } from '@/lib/isAuthorizedRequest';
import rateLimiter from '@/lib/rateLimiter';
import createAdmin from '@/lib/auth/setupAdminUser';

export async function GET(request: Request) {
  const isRateLimited = await rateLimiter(request, 1, 60);

  if (isRateLimited) {
    return isRateLimited;
  }

  const unauthorizedResponse = isAuthorizedRequest(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  try {
    await createAdmin();
    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully.',
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Server Error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
