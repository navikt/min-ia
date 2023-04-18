// mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
    rest.get('/api/success', (_, res, ctx) => {
        return res(ctx.status(200), ctx.json({ key: 'value' }));
    }),
    rest.get('/api/unauthorized', (_, res, ctx) => {
        return res(ctx.status(401));
    }),
    rest.get('/api/forbidden', (_, res, ctx) => {
        return res(ctx.status(403));
    }),
    rest.get('/api/internal-error', (_, res, ctx) => {
        return res(ctx.status(500));
    }),
];

export default handlers;
