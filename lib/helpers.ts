export function getBaseUrl(): string {
    return process.env.PUBLIC_VERCEL_URL || `http://localhost:${process.env.PORT ?? 3000}`;
}
