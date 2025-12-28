export function getApiUrl() {
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  }
  if (process.env.INTERNAL_API_URL) {
    return process.env.INTERNAL_API_URL;
  }
  return 'http://127.0.0.1:3001';
}
