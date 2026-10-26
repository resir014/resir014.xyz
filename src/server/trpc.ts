import { initTRPC } from '@trpc/server';

const t = initTRPC.context().create({
  // tRPC defaults this to `NODE_ENV !== 'production'`, but the Netlify function runtime leaves
  // NODE_ENV unset, which would leak stack traces in error responses.
  isDev: process.env.NODE_ENV === 'development',
  errorFormatter(opts) {
    const { shape } = opts;
    return {
      ...shape,
      data: {
        ...shape.data,
      },
    };
  },
});

export const router = t.router;
export const mergeRouters = t.mergeRouters;
export const publicProcedure = t.procedure;
