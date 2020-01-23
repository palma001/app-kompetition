import AuthLibrary from 'auth'
import config from '../config'
export default async ({ Vue, app }) => {
  Vue.use(AuthLibrary, {
    baseUrl: config.ipServidor + 'users/',
    // 'https://karanta-svr.sytes.net:8765/mydas-us-business-associate/mydas-auth/', // Access temp meanwhile microservice is merge
    loginUrl: 'login',
    logoutUrl: 'logout',
    refreshTokenName: 'refresh_token',
    refreshTokenUrl: 'refresh',
    tokenName: 'token',
    verifyTokenUrl: 'verifytoken'
  })
}
