import * as types from './mutation-types'

export const addToCart = function ({commit, state}, good) {
  let newCart = state.cart.push(good)
  commit(types.ADD_TO_CART, newCart)
}
