import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchMe, loginRequest, logoutRequest, signUpRequest } from '../auth';
import { refreshRequest } from '../client';
import type SessionTypeResponse from '../../types/session.type';

export function useSession() {
  return useQuery<SessionTypeResponse>({
    queryKey: ['session'],
    queryFn: async () => {
      await refreshRequest();
      return fetchMe();
    },
    retry: false,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useSignUp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signUpRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['session'],
      }),
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['session'],
      });
    },
  });
}
export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      queryClient.clear();
    },
  });
}
