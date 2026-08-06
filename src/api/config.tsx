export const ACCESS_TOKEN_TTL_SEC = 15 * 60;
export const BASE_URL = import.meta.env.DEV
  ? `${import.meta.env.VITE_DEV_URL}/api/v1`
  : `${import.meta.env.VITE_PROD_URL}/api/v1`;
