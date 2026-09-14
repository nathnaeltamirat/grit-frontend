import { ZodError } from 'zod';
import { apiFetch } from './client';
interface updateProfieSchema {
  full_name?: string;
  email?: string;
}
interface updatePasswordSchema {
  old_password: string;
  new_password: string;
  confirm_password: string;
}
interface updateAPIKeySchema {
  ai_api_key: string;
}
export async function updateProfile(payload: updateProfieSchema) {
  try {
    const data = await apiFetch('/setting/profile', {
      body: JSON.stringify(payload),
      method: 'PATCH',
    });
    return data;
  } catch (err) {
    if (err instanceof ZodError) {
      const error = new Error(
        err.issues.map((issue) => issue.message).join(','),
      );
      throw error;
    }
    throw err;
  }
}
export async function updatePassword(payload: updatePasswordSchema) {
  try {
    const data = await apiFetch('/setting/profile/password', {
      body: JSON.stringify(payload),
      method: 'PATCH',
    });
    return data;
  } catch (err) {
    if (err instanceof ZodError) {
      const error = new Error(
        err.issues.map((issue) => issue.message).join(','),
      );
      throw error;
    }
    throw err;
  }
}
export async function updateAPI(payload: updateAPIKeySchema) {
  try {
    const data = await apiFetch('/setting/api-key', {
      body: JSON.stringify(payload),
      method: 'PATCH',
    });
    return data;
  } catch (err) {
    if (err instanceof ZodError) {
      const error = new Error(
        err.issues.map((issue) => issue.message).join(','),
      );
      throw error;
    }
    throw err;
  }
}
