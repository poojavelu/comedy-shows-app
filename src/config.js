// API configuration
// In production on Vercel, use the same domain for API calls
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? "" : "http://localhost:8000");
