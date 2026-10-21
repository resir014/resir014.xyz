import type { APIRoute } from 'astro';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '~/server/routers/_app';

// The Dashboard API is the only server-rendered route; everything else is prerendered (ADR-0005).
export const prerender = false;

export const ALL: APIRoute = ({ request }) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    createContext: () => ({}),
  });
