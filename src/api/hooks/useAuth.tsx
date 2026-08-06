import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchMe, loginRequest, signUpRequest } from '../auth';

export function useSession() {
  return useQuery({
    queryKey: ['session'],
    queryFn: async () => {
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
