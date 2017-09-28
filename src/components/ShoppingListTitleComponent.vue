<template>
  <a :href="href" :aria-controls="id" role="tab" data-toggle="tab" :style='styleObject'>
    {{ title }}
    <i class='glyphicon glyphicon-remove' @click="deleteShoppingList(id)"></i>
  </a>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    props: ['id', 'title', 'styleObject'],
    computed: {
      href () {
        return '#' + this.id
      }
    },
    methods: mapActions(['deleteShoppingList'])
  }
</script>

<style scoped>
	i {
		font-size: x-small;
		padding-left: 3px;
		cursor: pointer;
	}
</style>