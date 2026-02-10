import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentMood: null,
    recommendations: [],
    isExecuting: false
  },
  getters: {
  },
  mutations: {
    SET_MOOD(state, payload) {
      state.currentMood = payload
    },
    SET_RECOMMENDATIONS(state, payload) {
      state.recommendations = payload
    },
    SET_EXECUTING(state, payload) {
      state.isExecuting = payload
    }
  },
  actions: {
    selectMood({ commit }, mood) {
      commit('SET_MOOD', mood)
      this.dispatch('fetchRecommendations')
    },
    fetchRecommendations({ commit, state }) {
      let recommendations = []
      
      switch(state.currentMood) {
        case 'exhausted':
          recommendations = [
            {
              id: 1,
              title: '提神浓缩',
              type: '咖啡机',
              coffeeMode: 'Espresso',
              description: '快速制作浓缩咖啡',
              reason: '高效提神'
            }
          ]
          break
        case 'happy':
          recommendations = [
            {
              id: 2,
              title: '拿铁艺术',
              type: '咖啡食谱',
              coffeeMode: 'Latte',
              description: '制作拉花拿铁',
              reason: '享受美好心情'
            }
          ]
          break
        case 'quiet':
          recommendations = [
            {
              id: 3,
              title: '手冲时光',
              type: '咖啡机',
              coffeeMode: 'Pour Over',
              description: '慢速手冲咖啡',
              reason: '独处静心'
            }
          ]
          break
      }
      
      commit('SET_RECOMMENDATIONS', recommendations)
    },
    startExecution({ commit }, payload) {
      commit('SET_EXECUTING', true)
      setTimeout(() => {
        commit('SET_EXECUTING', false)
      }, 2000)
    }
  },
  modules: {
  }
})
