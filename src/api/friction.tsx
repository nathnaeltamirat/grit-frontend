import { ZodError } from 'zod';
import { FrictionLogResponse } from '../routes/index.lazy';
import { apiFetch } from './client';
export interface payloadUpdateInput {
  title?: string;
  description?: string;
  severity?: 'CRITICAL' | 'MEDIUM' | 'LOW';
  tags?: string[];
}
export interface payloadInput {
  title: string;
  description?: string;
  severity: 'CRITICAL' | 'MEDIUM' | 'LOW';
  tags?: string[];
}
export interface updateFrictionParams {
  payLoad: payloadUpdateInput;
  id: string;
}
export async function getFriction(
  queryString = '',
): Promise<FrictionLogResponse> {
  return apiFetch(`/friction/${queryString}`);
}

export async function updateFriction({ id, payLoad }: updateFrictionParams) {
  try {
    const data = await apiFetch(`/friction/${id}`, {
      body: JSON.stringify(payLoad),
      method: 'PATCH',
    });
    return data;
  } catch (err) {
    if (err instanceof ZodError) {
      throw new Error(err.issues.map((issue) => issue.message).join(', '));
    }
    throw err;
  }
}
export async function createFriction(payload: payloadInput) {
  try {
    const data = await apiFetch('/friction', {
      body: JSON.stringify(payload),
      method: 'POST',
    });
    return data;
  } catch (err) {
    if (err instanceof ZodError) {
      throw new Error(err.issues.map((issue) => issue.message).join(', '));
    }
    throw err;
  }
}
export async function deleteFriction(id:string){
  try{
    const data = await apiFetch(`/friction/${id}`,{
      method:"DELETE"
    })
    return data;
  }catch(err){
    if(err instanceof ZodError){
      throw new Error(err.issues.map((issue)=>issue.message).join(", "));
    }
    throw err
  }
}