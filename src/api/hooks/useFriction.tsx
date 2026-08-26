import { useQuery } from '@tanstack/react-query';
import { getFriction } from '../friction';
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
    queryKey: ['friction',queryString],
    queryFn: async () => getFriction(queryString),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}
