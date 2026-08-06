import { ACCESS_TOKEN_TTL_SEC, BASE_URL } from './config';
import { tokenStore } from './token.store';

let refreshPromise: null | Promise<string> = null;
export const refreshRequest = async () => {
  if (!refreshPromise) {
    refreshPromise = fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('refresh_failed');
        const data = await res.json();
        tokenStore.set(data.data.accessToken, ACCESS_TOKEN_TTL_SEC);
        return data.data.accessToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
};

export const apiFetch = async <T = unknown,>(
  path: string,
  options: RequestInit = {},
  _retried = false,
): Promise<T> => {
  const token = tokenStore.get();
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      'Content-Type': 'application/json',
    },
  });
  if (res.status == 401 && !_retried) {
    try {
      await refreshRequest();
      return apiFetch(path, options, true);
    } catch {
      tokenStore.clear();
      throw new Error('session_expired');
    }
  }
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  return data;
};
