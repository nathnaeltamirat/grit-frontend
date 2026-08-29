import { createContext, type ReactNode, useContext } from 'react';
import { useSession } from '../api/hooks/useAuth';

const AuthContext = createContext<AuthContextValue | null>(null);
type AuthContextValue = {
  data: unknown;
  status: 'loading' | 'anon' | 'authed';
};
export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, isError } = useSession();
  const status: AuthContextValue['status'] = isLoading
    ? 'loading'
    : isError
      ? 'anon'
      : 'authed';
  return (
    <AuthContext.Provider value={{ data, status }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context
};
