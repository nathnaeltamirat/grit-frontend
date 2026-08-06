import { ZodError } from 'zod';
import { registerFormInput } from '../schema/auth.schema';
import { apiFetch } from './client';
import { tokenStore } from './token.store';
import { ACCESS_TOKEN_TTL_SEC } from './config';
interface AuthResponse {
  data: {
    accessToken: string;
  };
}
export async function signUpRequest(payload: registerFormInput) {
  try {
    const data = await apiFetch<AuthResponse>('/auth/register', {
      body: JSON.stringify(payload),
      method: 'POST',
    });
    tokenStore.set(data.data.accessToken, ACCESS_TOKEN_TTL_SEC);
  } catch (err) {
    if (err instanceof ZodError) {
      throw new Error(err.issues.map((issue) => issue.message).join(','));
    }
    throw err;
  }
}
export async function fetchMe() {
  return apiFetch('/auth/me');
}
