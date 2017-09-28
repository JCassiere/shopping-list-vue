import mutations from '../../../../src/vuex/mutations'
import { ADD_SHOPPING_LIST, DELETE_SHOPPING_LIST, POPULATE_SHOPPING_LISTS, CHANGE_TITLE } from '../../../../src/vuex/mutation_types'

describe('mutations.js', () => {
  var state

  beforeEach(() => {
    state = {
      shoppinglists: []
    }
  })

  describe('ADD_SHOPPING_LIST', () => {
    it('should add item to the shopping list array and increase its length', () => {
      mutations[ADD_SHOPPING_LIST](state, {id: '1'})
      expect(state.shoppinglists).to.eql([{id: '1', title: 'New Shopping List'}])
      expect(state.shoppinglists).to.have.length(1)
    })
    it('should not add the item if item is empty', () => {
      mutations[ADD_SHOPPING_LIST](state)
      expect(state.shoppinglists).to.have.length(0)
    })
  })

  describe('DELETE_SHOPPING_LIST', () => {
    beforeEach(() => {
      mutations[ADD_SHOPPING_LIST](state, {id: '1'})
    })

    it('should remove a list that exists in the list', () => {
      mutations[DELETE_SHOPPING_LIST](state, '1')
      expect(state.shoppinglists).to.have.length(0)
    })

    it('calling the mutation with an ID that does not exist in the list will not cause any change', () => {
      mutations[DELETE_SHOPPING_LIST](state, '2')
      expect(state.shoppinglists).to.have.length(1)
    })
  })

  describe('POPULATE_SHOPPING_LISTS', () => {
    it('should override the shoppinglist array with the new array of shopping lists', () => {
      mutations[ADD_SHOPPING_LIST](state, {id: '1'})
      mutations[POPULATE_SHOPPING_LISTS](state, [{id: '2', title: 'Groceries'}, {id: '3', title: 'Chores'}])
      expect(state.shoppinglists).to.eql([{id: '2', title: 'Groceries'}, {id: '3', title: 'Chores'}])
    })
  })

  describe('CHANGE_TITLE', () => {
    it('when passing a new title and ID, should change the title of that object', () => {
      mutations[ADD_SHOPPING_LIST](state, {id: '1', title: 'Original Title'})
      mutations[CHANGE_TITLE](state, {id: '1', title: 'New Title'})
      expect(state.shoppinglists[0].title).to.eq('New Title')
    })
  })
})
