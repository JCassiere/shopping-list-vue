import * as types from './mutation_types'
import getters from './getters'
import _ from 'underscore'

export default {
  [types.CHANGE_TITLE] (state, data) {
    getters.getListById(state, data.id).title = data.title
  },
  [types.ADD_SHOPPING_LIST] (state, newList) {
    if (_.isObject(newList)) {
      newList.title = 'New Shopping List'
      state.shoppinglists.push(newList)
    }
  },
  [types.POPULATE_SHOPPING_LISTS] (state, lists) {
    state.shoppinglists = lists
  },
  [types.DELETE_SHOPPING_LIST] (state, id) {
    state.shoppinglists = _.reject(state.shoppinglists, (list) => {
      return list.id === id
    })
  }

}
