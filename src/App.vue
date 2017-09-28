<template>
  <div id="app" class="container">
    <ul class="nav nav-tabs" role="tablist">
      <li v-for="(list, index) in shoppinglists" role="presentation" v-bind:class="index===0 ? 'active' : ''">
        <shopping-list-title-component :id="list.id" :title="list.title" :styleObject="list.styleObject"></shopping-list-title-component>
      </li>
      <li>
        <a href="#" @click="addShoppingList">
          <i class="glyphicon glyphicon-plus-sign"></i>
        </a>
      </li>
    </ul>
    <div class="tab-content">
      <div v-for="(list, index) in shoppinglists" class="tab-pane" :class="index===0 ? 'active' : ''"role="tabpanel" :id="list.id">
        <shopping-list-component :id="list.id" :items="list.items" :title="list.title" :styleObject="list.styleObject"></shopping-list-component>
      </div>
    </div>
  </div>
</template>

<script>
  import ShoppingListComponent from './components/ShoppingListComponent'
  import ShoppingListTitleComponent from './components/ShoppingListTitleComponent'
  import _ from 'underscore'
  import store from './vuex/store'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    components: {
      ShoppingListComponent,
      ShoppingListTitleComponent
    },
    computed: mapGetters({
      shoppinglists: 'getLists'
    }),
    methods: _.extend({},
      mapActions(['populateShoppingLists', 'createShoppingList']),
      {
        addShoppingList () {
          let list = {
            title: 'New Shopping List',
            items: [],
            styleObject: {
              backgroundColor: 'green'
            }
          }

          this.createShoppingList(list)
        }
      }),
    store,
    mounted () {
      this.populateShoppingLists()
    }
    // methods: {
    //   onChangeTitle (id, text) {
    //     _.findWhere(this.shoppinglists, { id: id }).title = text
    //   }
    // }
  }
</script>

<style>
  .container {
    width: 80%;
    margin: 20px auto 0px auto;
  }
</style>
