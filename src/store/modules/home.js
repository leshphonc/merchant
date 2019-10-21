import home from '@/api/home'

// initial state
const state = {
  items: [],
  box: 123555,
  checkoutStatus: null,
  commonInfo: {},
}

// getters
const getters = {
  cartProducts: (state, getters, rootState) => {
    return state.items.map(({ id, quantity }) => {
      const product = rootState.products.all.find(product => product.id === id)
      return {
        title: product.title,
        price: product.price,
        quantity,
      }
    })
  },

  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)
  },
}

// actions
const actions = {
  async getHomeInfo({ commit }) {
    const response = await home.getHomeInfo()
    if (response) {
      commit('saveCommonInfo', response)
    }
  },
}

// mutations
const mutations = {
  saveCommonInfo(state, data) {
    state.commonInfo = data
  },
  pushProductToCart(state, { id }) {
    state.items.push({
      id,
      quantity: 1,
    })
  },

  incrementItemQuantity(state, { id }) {
    const cartItem = state.items.find(item => item.id === id)
    cartItem.quantity++
  },

  setCartItems(state, { items }) {
    state.items = items
  },

  setCheckoutStatus(state, status) {
    state.checkoutStatus = status
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
