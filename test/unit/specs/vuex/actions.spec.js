import actions from '../../../../src/vuex/actions'
// import { CHANGE_TITLE, POPULATE_SHOPPING_LISTS, ADD_SHOPPING_LIST, DELETE_SHOPPING_LIST } from '../../../../src/vuex/mutation_types'
import { CHANGE_TITLE, POPULATE_SHOPPING_LISTS } from '../../../../src/vuex/mutation_types'

describe('actions.js', () => {
  var lists, store, server, successPut, successPost, successDelete

  successDelete = {'delete': true}
  successPost = {'post': true}
  successPut = {'put': true}

  beforeEach(() => {
    lists = [{
      id: '1',
      title: 'Groceries'
    }, {
      id: '2',
      title: 'Clothes'
    }]
    store = {
      commit: (method, data) => {},
      dispatch: () => {
        return Promise.resolve()
      },
      state: {
        shoppinglists: lists
      }
    }
    sinon.stub(store, 'commit')

    server = sinon.fakeServer.create()
    server.respondWith('GET', /shoppinglists/, xhr => {
      xhr.respond(200, {'Content-Type': 'application/json'}, JSON.stringify(lists))
    })
    server.respondWith('POST', /shoppinglists/, xhr => {
      xhr.respond(200, {'Content-Type': 'application/json'}, JSON.stringify(successPost))
    })
    server.respondWith('PUT', /shoppinglists/, xhr => {
      xhr.respond(200, {'Content-Type': 'application/json'}, JSON.stringify(successPut))
    })
    server.respondWith('DELETE', /shoppinglists/, xhr => {
      xhr.respond(200, {'Content-Type': 'application/json'}, JSON.stringify(successDelete))
    })
    server.autoRespond = true
  })

  afterEach(function () {
    store.commit.restore()
    server.restore()
  })

  describe('populateShoppingLists', () => {
    it('should call commit method with POPULATE_SHOPPING_LISTS and with mocked lists', done => {
      actions.populateShoppingLists(store).then(() => {
        expect(store.commit).to.have.been.calledWith(POPULATE_SHOPPING_LISTS, lists)
        done()
      }).catch(done)
    })
  })

  describe('changeTitle', () => {
    it('should call commit method with CHANGE_TITLE string', (done) => {
      let title = 'new title'

      actions.changeTitle(store, {title: title, id: '1'}).then(() => {
        expect(store.commit).to.have.been.calledWith(CHANGE_TITLE, {title: title, id: '1'})
        done()
      }).catch(done)
    })
  })

  describe('updateList', () => {
    it('should return successful PUT response', (done) => {
      actions.updateList(store, '1').then((data) => {
        expect(data.data).to.eql(successPut)
        done()
      }).catch(done)
    })
  })

  // describe('createShoppingList', () => {
  //   it('should call dispatch method with populateShoppingLists string', (done) => {
  //     let list = {id: '3', title: 'Third List Title'}

  //     actions.createShoppingList(store, list).then(() => {
  //       expect(store.dispatch).to.have.been.calledWith('populateShoppingLists')
  //       done()
  //     }).catch(done)
  //   })
  // })

  // describe('deleteShoppingList', () => {
  //   xit('should call commit method with DELETE_SHOPPING_LIST string', (done) => {
  //     actions.deleteShoppingList(store, '1').then(() => {
  //       expect(store.commit).to.have.been.calledWith(CHANGE_TITLE, {title: title, id: '1'})
  //       done()
  //     }).catch(done)
  //   })
  // })
})
