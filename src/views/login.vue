<template>
  <div class="login">
    <div class=" head ">
      <p>欢迎来到登陆页面</p>
    </div>
    <!-- 用户登录 -->
    <div class="login-main" v-if="!isAdmin">
      <el-container>
        <el-main>
          <div class="change-link">
            <el-link type="success" @click="isAdmin=!isAdmin">{{loginInfo}}</el-link>
          </div>
          <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="name" style="color:#67C23A">
              <el-input v-model="userForm.user_name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type='password' v-model="userForm.user_password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="resetForm('userForm')" type="warning">重置</el-button>
              <el-button type="primary" @click="submitUser('userForm')" style="margin-left:116px">用户登录</el-button>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </div>
    <!-- 管理员登录 -->
    <div class="login-main" v-if="isAdmin">
      <el-container>
        <el-main>
          <div class="change-link">
            <el-link type="primary" @click="isAdmin=!isAdmin">{{loginInfo}}</el-link>
          </div>
          <el-form :model="adminForm" :rules="rules" ref="adminForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="name">
              <el-input v-model="adminForm.admin_name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type='password' v-model="adminForm.admin_password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="resetForm('adminForm')" type="warning">重置</el-button>
              <el-button type="primary" @click="submitAdmin('adminForm')" style="margin-left:116px">管理员登录</el-button>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAdmin: false,
      loginInfo: '点击切换到管理员登录',
      userForm: {
        user_name: 'user',
        user_password: '123456'
      },
      adminForm: {
        admin_name: 'admin',
        admin_password: '123456'
      },
      rules: {
        user_name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        user_password: [
          { required: true, message: '请选择密码', trigger: 'change' }
        ],
        admin_name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        admin_password: [
          { required: true, message: '请选择密码', trigger: 'change' }
        ]
      }
    };
  },
  watch: {
    isAdmin(newval, oldval) {
      //console.log(newval);
      if (newval === false) {
        this.loginInfo = '点击切换到管理员登录'
      } else {
        this.loginInfo = '点击切换到普通用户登录'
      }
    }
  },
  methods: {
    submitUser(formName) {
      // 普通用户登录

      //console.log(this.userForm);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //console.log('用户登录');
          this.$axios.post('/login/check_user', this.userForm).then(res => {
            //console.log(res.data)

            // 获取
            // //console.log(this.$store.getters.getUser)
            if (res.data.code === 200) {
              const jwt = res.headers.authorization
              const userInfo = res.data.data
              // 把数据共享出去
              this.$store.commit("SET_TOKEN", jwt)
              this.$store.commit("SET_USERINFO", userInfo)
              this.$store.commit("SET_INDEX", true)
              this.$store.commit('SET_ADMIN', this.isAdmin)
              this.$router.push("/")
            }
            else {
              this.$message({
                type: 'error',
                message: res.data.message
              });
            }

          })
        } else {
          //console.log('error submit!!');
          return false;
        }
      });
    },
    submitAdmin(formName) {
      //管理员登录
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // //console.log('管理员登录');
          this.$axios.post('/login/check_admin', this.adminForm).then(res => {
            // //console.log(res.data)

            // //console.log(this.isAdmin);
            // 获取
            // //console.log(this.$store.getters.getUser)
            if (res.data.code === 200) {
              const jwt = res.headers.authorization
              const userInfo = res.data.data
              // 把数据共享出去
              this.$store.commit("SET_TOKEN", jwt)
              this.$store.commit("SET_USERINFO", userInfo)
              this.$store.commit("SET_INDEX", true)
              this.$store.commit('SET_ADMIN', this.isAdmin)
              this.$router.push("/")
            }
            else {
              this.$message({
                type: 'error',
                message: res.data.message
              });
            }
          })
        } else {
          //console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

  },
  created() {
    this.$store.commit('SET_INDEX', false)
    ////console.log(this.$store.getters.getIndex);
  },

}
</script>

<style>
/* .el-header,
.el-footer {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.demo-ruleForm {
  width: 500px;
  margin: 0 auto;
} */
</style>
