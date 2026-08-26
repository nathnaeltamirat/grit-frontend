import { FrictionLogResponse } from '../routes/index.lazy';
import { apiFetch } from './client';

export async function getFriction(
  queryString = '',
): Promise<FrictionLogResponse> {
  return apiFetch(`/friction/${queryString}`);
}
