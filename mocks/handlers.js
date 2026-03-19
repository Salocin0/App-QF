import { rest } from 'msw';

export const handlers = [
  // Mock para login
  rest.post('http://127.0.0.1:8000/login/', (req, res, ctx) => {
    return res(ctx.json({ token: 'test-token', user: { id: 1, role: 'consumidor' } }));
  }),

  // Mock para registro
  rest.post('http://127.0.0.1:8000/user/', (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ code: 201, data: { id: 123 } }));
  }),

  // Mock para recuperar contraseña
  rest.post('http://127.0.0.1:8000/user/recuperarcontrasenia', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ code: 200 }));
  }),

  // Agregar más handlers según sea necesario
];