/**
 * Array de rotas que podem ser acessadas sem autenticação
 * @type {string[]}
 */
export const publicRoutes = ['/']

/**
 * Array de rotas usadas para a autenticação
 * As rotas irão redirecionar o usuário para a rota /settings
 * @type {string[]}
 */
export const authRoutes = ['/auth/login', '/auth/register', '/auth/error']

/**
 * O prefixo da biblioteca Auth.js
 * Impede que trigge a função do middleware
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth'

/**
 * Url de redirecionamento padrão para quando o usuário fizer o login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings'
