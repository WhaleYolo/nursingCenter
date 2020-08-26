<template>
  <div>
    康复情况
  </div>
</template>

<script>
export default {
  name: "recureStatus.vue",
  data() {
    return {

    }
  },
  methods: {

  },
  created() {
  },
  filters: {
    dateFormat: function (val) {
      let date = new Date(val)
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      month = month >= 10 ? month : '0' + month
      day = day >= 10 ? day : '0' + day
      return year + '-' + month + '-' + day
    }
  }
}
</script>

<style scoped>
</style>