import 'buefy/dist/buefy.css'
import 'element-ui/lib/theme-chalk/index.css'
import KuiLibrary from 'kui-library/src'

export default async ({ Vue, app }) => {
  Vue.use(KuiLibrary, {
    rowsPerPage: 20,
    possibleRowsPerPage: [20, 50, 100],
    defaultIconPack: 'fa',
    googleMapsKey: 'AIzaSyCko__qm5oM4k-7RPfLlsr7Bk3X8qUrbDw',
    defaultDateFormatter: (date) => date.toLocaleDateString()
  })
}
