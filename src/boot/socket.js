// import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
import store from '../store'
export default async ({ Vue, app }) => {
  Vue.use(new VueSocketIO(
    {
      debug: true,
      connection: 'http://192.168.10.50:3001',
      vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
      }
    }
  ))
}
