import services from 'kservices'
import config from '../config'
export default async ({ Vue, app }) => {
  Vue.use(services, {
    baseUrl: config.ipServidor
  })
}
