import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTrpcClient, trpc } from './trpc';

/**
 * Provides the tRPC and React Query clients to the Dashboard islands.
 */
export function TrpcProvider({ children }: React.PropsWithChildren) {
  const [queryClient] = React.useState(() => new QueryClient());
  const [trpcClient] = React.useState(() => createTrpcClient());

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
