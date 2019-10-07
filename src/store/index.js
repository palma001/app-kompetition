import Vue from 'vue'
import Vuex from 'vuex'

import login from './module-login'
import score from './module-score'
import confrontations from './module-confrontation/'
Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      login,
      score,
      confrontations
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
