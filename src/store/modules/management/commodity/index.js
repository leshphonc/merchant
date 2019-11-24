import eCommerceActions from './eCommerce'
import reserveActions from './reserve'
import takeAwayActions from './takeAway'
import serviceActions from './service'
import packageActions from './package'

// initial state
const state = {
  navText: ['创建', '创建', '创建', '创建', '创建'],
}

// getters
const getters = {}

// actions
const actions = {
  ...eCommerceActions,
  ...reserveActions,
  ...takeAwayActions,
  ...serviceActions,
  ...packageActions,
}

// mutations
const mutations = {
  save(state, data) {
    const keys = Object.keys(data)
    keys.forEach(item => {
      state[item] = data[item]
    })
  },
  resetRightText(state) {
    state.navText = ['创建', '创建', '创建', '创建', '创建']
  },
  changeRightText(state, { index, text }) {
    const arr = state.navText
    arr[index] = text
    state.navText = []
    state.navText = arr
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
