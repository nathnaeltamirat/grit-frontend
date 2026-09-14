import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateAPI, updatePassword, updateProfile } from '../setting';

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['session'],
      });
    },
  });
}

export function useUpdatePassword() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['session'],
      });
    },
  });
}
export function useAPIUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['session'],
      });
    },
  });
}
