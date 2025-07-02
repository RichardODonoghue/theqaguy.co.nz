// utils/deviceType.ts
export function getDeviceType(
  userAgent: string
): 'mobile' | 'tablet' | 'desktop' {
  const ua = userAgent.toLowerCase();
  if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/.test(ua)) {
    return 'mobile';
  }
  if (/ipad|tablet|kindle|playbook/.test(ua)) {
    return 'tablet';
  }
  return 'desktop';
}
