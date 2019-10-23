// import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
import store from '../store'
export default async ({ Vue, app }) => {
  Vue.use(new VueSocketIO(
    {
      debug: false,
      connection: 'http://192.168.10.28:3001',
      vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
      }
    }
  ))
}
