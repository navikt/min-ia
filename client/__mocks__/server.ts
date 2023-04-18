// mocks/server.ts
import { setupServer } from 'msw/node';
import handlers from './testHandlers';

const server = setupServer(...handlers);

export default server;