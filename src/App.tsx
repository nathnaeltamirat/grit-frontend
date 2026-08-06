import { createRoot } from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen';
import { AuthProvider } from './providers/AuthProvider';
const client = new QueryClient();
const router = createRouter({ routeTree });
const App = () => {
  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
};
const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);
