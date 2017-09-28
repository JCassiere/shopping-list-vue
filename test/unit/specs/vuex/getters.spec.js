import getters from '../../../../src/vuex/getters'

describe('getters.js', () => {
  var state, lists

  beforeEach(() => {
    lists = [{id: '1', title: 'groceries'}, {id: '2', title: 'clothes'}]
    state = {
      shoppinglists: lists
    }
  })

  describe('getLists', () => {
    it('should return the list of shopping lists', () => {
      expect(getters.getLists(state)).to.eql(lists)
    })
  })

  describe('getListById', () => {
    it('should return the list with the given ID', () => {
      expect(getters.getListById(state, '1')).to.eql({id: '1', title: 'groceries'})
    })

    it('should not return anything if the passed ID is not in the list', () => {
      expect(getters.getListById(state, '3')).to.be.empty
    })
  })
})
