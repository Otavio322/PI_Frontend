/**
 * api.js – Camada de serviço para comunicação com o backend.
 * Substitua BASE_URL pela URL real do servidor quando o backend estiver deployado.
 *
 * Padrão de uso:
 *   import { api } from './api.js';
 *   const cursos = await api.cursos.listar();
 */

const BASE_URL = 'http://localhost:3000/api'; // TODO: alterar para URL do deploy (Render/Heroku/etc)

async function request(method, path, body = null) {
  const token = localStorage.getItem('spheredu_token');
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(`${BASE_URL}${path}`, opts);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Erro desconhecido' }));
    throw new Error(err.message || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {

  /* ── Auth ── */
  auth: {
    login:  (email, senha) => request('POST', '/auth/login',  { email, senha }),
    logout: ()             => request('POST', '/auth/logout')
  },

  /* ── Cursos ── */
  cursos: {
    listar:  ()       => request('GET',    '/cursos'),
    criar:   (data)   => request('POST',   '/cursos',    data),
    atualizar:(id, d) => request('PUT',    `/cursos/${id}`, d),
    deletar:  (id)    => request('DELETE', `/cursos/${id}`)
  },

  /* ── Coordenadores ── */
  coordenadores: {
    listar:   ()       => request('GET',    '/coordenadores'),
    criar:    (data)   => request('POST',   '/coordenadores',      data),
    atualizar:(id, d)  => request('PUT',    `/coordenadores/${id}`, d),
    deletar:  (id)     => request('DELETE', `/coordenadores/${id}`)
  },

  /* ── Logs / Auditoria ── */
  logs: {
    listar:   (params = {}) => {
      const qs = new URLSearchParams(params).toString();
      return request('GET', `/logs${qs ? '?' + qs : ''}`);
    },
    exportar: () => `${BASE_URL}/logs/export` // retorna URL para download direto
  },

  /* ── Dashboard ── */
  dashboard: {
    stats:  () => request('GET', '/dashboard/stats'),
    barras: () => request('GET', '/dashboard/barras'),
    alertas:() => request('GET', '/dashboard/alertas')
  },

  /* ── Regras / Categorias ── */
  regras: {
    listar:   (cursoId)   => request('GET',    `/cursos/${cursoId}/regras`),
    criar:    (cursoId,d) => request('POST',   `/cursos/${cursoId}/regras`, d),
    atualizar:(id, d)     => request('PUT',    `/regras/${id}`, d),
    deletar:  (id)        => request('DELETE', `/regras/${id}`)
  }
};
