import services from 'kservices'
export default async ({ Vue, app }) => {
  Vue.use(services, {
    baseUrl: 'http://192.168.10.28:3000'
  })
}
