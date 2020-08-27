<template>
  <div class="index-contanner">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <div class="left-box">
          <div>
            <img src="../assets/images/logo.jpg" alt="">
          </div>
        </div>
        <div class="mid-box">
          <!-- <router-link to="/">
            <el-button>
              首 页</el-button>
          </router-link> -->
        </div>
        <div class="right-box">
          <span v-show="!isLogin">
            <el-button type="success" @click="login" round>登录</el-button>
          </span>
          <span v-show="isLogin">
            <el-button type="danger" @click="logout" round>退出</el-button>
          </span>
        </div>
      </el-header>
      <!-- 头部结束 -->
      <el-container>
        <!-- 导航 -->
        <el-aside width="200px">
          <el-row class="tac">
            <el-col :span="12">
              <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                background-color="rgb(245, 247, 250)" text-color="black" active-text-color="#409EFF" router>
                <!-- 首页 -->
                <el-menu-item index="/"> <i class="el-icon-s-home" style="color:#409EFF"></i>首页</el-menu-item>

                <!-- 客户管理 -->
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-user-solid" style="color:#409EFF"></i>
                    <span>客户管理</span>
                  </template>
                  <el-menu-item index="/customer/checkin">入住管理</el-menu-item>
                  <el-menu-item index="/customer/checkout">退住管理</el-menu-item>
                  <el-menu-item index="/customer/customerInfo">客户信息</el-menu-item>
                </el-submenu>
                <!-- 床位管理 -->
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-office-building" style="color:#409EFF"></i>
                    <span>床位管理</span>
                  </template>
                  <el-menu-item index="/bed/bedInfo">床位信息管理</el-menu-item>
                </el-submenu>
                <!-- 护理管理 -->
                <el-submenu index="3">
                  <template slot="title">
                    <i class="el-icon-circle-plus" style="color:#409EFF"></i>
                    <span>康复管理</span>
                  </template>
                  <el-menu-item index="/recure/recurePlan">康复计划</el-menu-item>
                </el-submenu>
                <!-- 膳食管理 -->
                <el-submenu index="4">
                  <template slot="title">
                    <i class="el-icon-food" style="color:#409EFF"></i>
                    <span>膳食管理</span>
                  </template>
                  <el-menu-item index="/food/foodRecord">膳食记录管理</el-menu-item>
                </el-submenu>
                <!-- 护理管理 -->
                <el-submenu index="5">
                  <template slot="title">
                    <i class="el-icon-first-aid-kit" style="color:#409EFF"></i>
                    <span>护理管理</span>
                  </template>
                  <el-menu-item index="/nursing/nursingInfo">护理记录管理</el-menu-item>
                  <el-menu-item index="/nursing/nursingItem">护理项目管理</el-menu-item>
                </el-submenu>
                <!-- 护士站 -->
                <el-submenu index="6">
                  <template slot="title">
                    <i class="el-icon-s-flag" style="color:#409EFF"></i>
                    <span>员工管理</span>
                  </template>
                  <el-menu-item index="/staff/doctor">医生信息</el-menu-item>
                  <el-menu-item index="/staff/nurse">护士信息</el-menu-item>
                  <el-menu-item index="/staff/nursingWorker">护工信息</el-menu-item>
                </el-submenu>
                <!-- 用户管理 -->
                <el-submenu index="7" v-if="$store.getters.getAdmin">
                  <template slot="title">
                    <i class="el-icon-s-custom" style="color:#409EFF"></i>
                    <span>用户管理</span>
                  </template>
                  <el-menu-item index="/user/userInfo">用户信息信息</el-menu-item>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <!-- 导航结束 -->
        <el-container>
          <!-- 主体部分 -->
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
  <!-- 主体部分 -->
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      isLogin: false
    }
  },
  mounted() { },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 登录
    login() {
      this.$router.push('/login')
      this.$store.commit('SET_INDEX', false)
    },
    // 退出
    logout() {
      //清除用户信息
      this.$store.commit('REMOVE_INFO');
      this.$router.push('/login')
      this.$store.commit('SET_INDEX', false)
    }
  },
  created() {
    if (this.$store.getters.getUser) {
      //this.user.username = this.$store.getters.getUser.username;
      this.isLogin = true;
    }
  }

}
</script>

<style >
</style>
