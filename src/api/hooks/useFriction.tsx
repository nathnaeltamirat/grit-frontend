import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createFriction,
  getFriction,
  payloadInput,
  updateFriction,
  updateFrictionParams,
} from '../friction';
import { FrictionLogResponse } from '../../routes/index.lazy';

export function useGetFriction(params?: {
  title?: string;
  tags?: string;
  page?: string;
}) {
  const searchParams = new URLSearchParams();
  if (params?.title) searchParams.append('title', params.title);
  if (params?.page) searchParams.append('page', params.page);
  if (params?.tags) searchParams.append('tags', params.tags);
  const queryString = searchParams.toString()
    ? `?${searchParams.toString()}`
    : '';
  return useQuery<FrictionLogResponse>({
    queryKey: ['friction', queryString],
    queryFn: async () => getFriction(queryString),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}

export function useUpdateFriction() {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, updateFrictionParams>({
    mutationFn: updateFriction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['friction'],
        exact: false,
      });
    },
  });
}
export function useCreateFriction() {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, payloadInput>({
    mutationFn: createFriction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['friction'],
        exact: false,
      });
    },
  });
}
