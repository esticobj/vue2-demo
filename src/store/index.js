import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    "name" : "aaa",
    "score" : 60
  },
  mutations: {
    addScore(state, payload){
      state.score += payload.score
    }
  },
  actions: {
    addScoreAsync(context, payload){
      context.commit('addScore', payload)
    }
  },
  modules: {
  }
})
