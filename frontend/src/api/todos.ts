import { request } from './requestUtils';

export const getTodos = async () => {
  return await request({ method: 'GET', endpoint: 'todos' });
};

export const getTodo = async (id: string) => {
  return await request({ method: 'GET', endpoint: `todos/${id}` });
};

export const createTodo = async (
  id: string,
  body: Record<string, unknown>,
  jwt: string
) => {
  return await request({ method: 'POST', endpoint: `todos/${id}`, body, jwt });
};

export const updateTodo = async (
  id: string,
  body: Record<string, unknown>,
  jwt: string
) => {
  return await request({ method: 'PATCH', endpoint: `todos/${id}`, body, jwt });
};

export const deleteTodo = async (id: string, jwt: string) => {
  return await request({ method: 'DELETE', endpoint: `todos/${id}`, jwt });
};
