<template>
  <div id="app">
    <!-- <top></top> -->
    <index v-if="index_show"></index>
    <router-view v-if="!index_show"></router-view>
  </div>
</template>

<script>
import index from './components/02.index.vue';
export default {
  name: 'app',
  data() {
    return {

    }
  },
  components: {
    index
  },
  methods: {

  },
  computed: {
    index_show() {
      return this.$store.getters.getIndex

    }
  }
}
</script>

<style >
</style>
