<template>
  <div class="main-container">
    <div class="main-index">
      <div v-if="!isLogin" class="effect06 text ">未登录 请您先登录</div>
      <div v-else class="effect06 text ">华山疗养院 欢迎您</div>
      <div class="description">
        <div class="header">
          <h1>华山疗养院简介</h1>
        </div>
        <div class="main">
          <p>
            {{description}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home.vue",
  data() {
    return {
      isLogin: false,
      description: '华山疗养院是华南农业大学华山区一所医养护结合的老人疗养院。我院本着"服务老人、回报社会"的办院宗旨，为自理老人提供环境优雅温馨的养老养生居所，又为因年迈或疾病困扰而不能自理老人提供精心的生活照料和医疗、康复护理服务，应用全面的自动化管理及各种服务的信息系统，将养老、护理、医疗、康复相结合，为华山老人创造一个"老有所养，老有所学，老有所乐"的温馨港湾。'
    }
  },
  methods: {

  },
  created() {
    if (this.$store.getters.getToken) {
      this.isLogin = true
    }
    this.$store.commit('SET_INDEX', true)
    console.log(this.$store.getters.getAdmin);
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