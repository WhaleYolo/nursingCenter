<template>
  <div class="main-container">
    <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
      <div>
        <el-input prefix-icon="el-icon-search" type="text" style="width:200px" v-model="findName" placeholder="输入用户名..."
          clearable></el-input>
        <el-button style="margin:0 30px" type="success" @click="findByName">查询</el-button>
        <!-- 弹出框 -->
        <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
        <el-dialog title="用户管理" :visible.sync="dialogVisible" width="30%" v-if="dialogVisible" @close='closeDialog'>
          <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="用户名" prop="user_name">
              <el-input v-model="form.user_name"></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="user_password">
              <el-input v-model="form.user_password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="insert('form')">提交</el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!-- 弹出框结束 -->
      </div>
      <!-- 入住表 -->
      <el-table :data="userData" stripe style="width: 100%" height="542">
        <el-table-column prop="user_id" label="用户编号">
        </el-table-column>
        <el-table-column prop="user_name" label="用户名">
        </el-table-column>
        <el-table-column prop="user_password" label="用户密码">
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button type="success" @click='update(scope.row)' size="small">编辑</el-button>
            <el-button v-if="$store.getters.getAdmin" type="danger" @click='deleteInfo(scope.row)' size="small">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "userInfo.vue",
  data() {
    var cidValidate = (rule, value, callback) => {
      if (!this.iscidExist) {
        console.log(this.iscidExist);
        callback(new Error('当前客户编号不存在'))
      } else {
        callback()
      }
    }
    var staffIdValidate = (rule, value, callback) => {
      if (!this.isStaffExist) {
        callback(new Error('当前员工不存在'))
      } else {
        callback()
      }
    }
    return {
      isAdmin: false, //是否是管理员
      userData: [{
        user_id: '22',
        user_name: 'user1',
        user_password: '123456'
      }],
      dialogVisible: false,
      form: {
        user_name: '',
        user_password: ''
      },
      rules: {
        user_name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 4, max: 10, message: '长度在 4 到 10 个字符', trigger: 'blur'
          }
        ],
        user_password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          {
            min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'
          }
        ],
      },
      dialogVisible: false,
      findName: '', //查询姓名
    }
  },
  methods: {
    findByName() {
      console.log(this.findName);
      this.$axios({
        method: 'get',
        url: 'http://localhost:8080/user/find?name=' + this.findName,
        headers: { "Authorization": sessionStorage.getItem("token") }
      }).then((res) => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.userData = res.data.data
          //console.log(this.checkinData);
        }
      })
    },
    insert(formname) {
      // console.log(this.form)

      this.$refs[formname].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: 'http://localhost:8080/user/insert',
            data: this.form,
            headers: { "Authorization": sessionStorage.getItem("token") }
          }).then((res) => {
            console.log(res.data);
            if (res.data.code === 200 || res.data.code === 201) {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.getList()
              this.form = {}
            }
            else {
              this.$message({
                type: 'error',
                message: res.data.message
              });
            }
          })
          this.dialogVisible = false
        } else {  //校验不通过
          this.$message({
            type: 'error',
            message: '操作失败'
          });
        }
      });
    },
    update(row) {
      this.dialogVisible = true
      this.form = row
    },
    deleteInfo(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          method: 'delete',
          url: 'http://localhost:8080/user/delete/' + row.user_id,
          date: row.user_id,
          headers: { "Authorization": sessionStorage.getItem("token") }
        }).then((res) => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: res.data.message
            });
            this.getList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    getList() {
      this.$axios({
        method: 'get',
        url: 'http://localhost:8080/user/list',
        headers: { "Authorization": sessionStorage.getItem("token") }
      }).then((res) => {
        console.log(res.data)
        this.userData = res.data.data
        //console.log(this.checkinData[0])
      })
    },
    cancel() {
      this.getList()
      this.dialogVisible = false;
      this.form = {}
    },
    closeDialog() {
      this.getList()
      this.dialogVisible = false;
      this.form = {}
    }
  },
  watch: {
    'form.c_id': {
      handler: function (newval, oldval) {
        if (newval && newval != '' && newval != undefined) {
          this.$axios({
            method: 'get',
            url: 'http://localhost:8080/customer/findById/?id=' + this.form.c_id,
            headers: { "Authorization": sessionStorage.getItem("token") }
          }).then((res) => {
            // console.log(res.data)
            if (res.data.code === 200) {
              this.form.c_name = res.data.data.c_name
              this.iscidExist = true
            } else {
              this.iscidExist = false
              console.log(this.iscidExist);
            }
            //console.log(this.checkinData[0])
          })
        } else {
          this.form.c_name = ''
        }
      },
    },
    'form.staff_id': {
      handler: function (newval, oldval) {
        if (newval && newval != '' && newval != undefined) {
          this.$axios({
            method: 'get',
            url: 'http://localhost:8080/staff/findById/?id=' + this.form.staff_id,
            headers: { "Authorization": sessionStorage.getItem("token") }
          }).then((res) => {
            // console.log(res.data)
            if (res.data.code === 200) {
              this.isStaffExist = true
            } else {
              this.isStaffExist = false
              console.log(this.iscidExist);
            }
            //console.log(this.checkinData[0])
          })
        }
      },
    }
  },

  created() {
    this.isAdmin = this.$store.getters.getAdmin;
    this.getList();
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