import { apiFetch } from './client';

export async function getFriction(queryString = '') {
  return apiFetch(`/friction/${queryString}`);
}
