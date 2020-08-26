<template>
  <el-container>
    <el-header>
      <span v-show="!isLogin">
        <el-button type="primary" round>登录</el-button>
      </span>
      <span v-show="isLogin">
        <el-button @click="logout" type="danger" round>退出</el-button>
      </span>
    </el-header>
  </el-container>

</template>

<script>
export default {
  name: 'top',
  data() {
    return {
      isLogin: true
    }
  },
  methods: {
  },
  created() {

  }
}
</script>

<style scoped></style>
