import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchMe, signUpRequest } from '../auth';


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
