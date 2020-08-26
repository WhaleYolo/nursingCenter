<template>
  <div class="main-container">
    <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
      <div>
        <el-input prefix-icon="el-icon-search" type="text" style="width:200px" placeholder="输入客户编号..." v-model="findId"
          clearable>
        </el-input>
        <el-button style="margin:0 30px" type="success">提交</el-button>
        <el-button type="primary" @click="dialogVisible = true">添加客户</el-button>
        <!-- 弹出框 -->
        <el-dialog title="登记入住" :visible.sync="dialogVisible" width="30%" v-if="dialogVisible" @close='closeDialog'>
          <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="客户姓名" prop="c_name">
              <el-input v-model="form.c_name"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="p_id">
              <el-input v-model="form.p_id"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="c_gender">
              <el-select v-model="form.c_gender" placeholder="请选择入住类型">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="客户年龄" prop="c_age">
              <el-input v-model="form.c_age"></el-input>
            </el-form-item>
            <el-form-item label="客户电话" prop="c_telephone">
              <el-input v-model="form.c_telephone"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="insert('form')">登记入住</el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
      <el-table :data="customerData" stripe style="width: 100%">
        <el-table-column prop="c_id" label="客户编号" width="120">
        </el-table-column>
        <el-table-column prop="c_name" label="客户姓名" width="180">
        </el-table-column>
        <el-table-column prop="p_id" label="身份证号" width="220">
        </el-table-column>
        <el-table-column prop="c_gender" label="客户性别">
        </el-table-column>
        <el-table-column prop="c_age" label="客户年龄">
        </el-table-column>
        <el-table-column prop="c_telephone" label="客户电话">
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="update(scope.row)">编辑</el-button>
            <el-button v-if="$store.getters.getAdmin" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "customer.vue",
  data() {
    return {
      customerData: [],
      findId: '',
      dialogVisible: false,
      form: {
        c_name: '',
        p_id: '',
        c_gender: '',
        c_age: '',
        c_telephone: '',
      },
      rules: {
        c_name: { required: true, message: '请输入客户姓名', trigger: 'blur' },
        c_gender: { required: true, message: '请选择客户性别', trigger: 'blur' },
        p_id: [
          { required: true, message: '请输入客户身份证号', trigger: 'blur' },
          {
            pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            message: '请输入正确的身份证号',
            trigger: 'blur'
          }
        ],
        c_age: [
          { required: true, message: '请输入客户年龄', trigger: 'blur' },
          {
            pattern: /^(?:[1-9][0-9]?|1[01][0-9]|120)$/,
            message: '请输入正确的年龄',
            trigger: 'blur'
          }],
        c_telephone: [
          { required: true, message: '请输入客户手机号', trigger: 'blur' },
          {
            pattern: /^[1][3-8]\d{9}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }]
      }
    }
  },
  methods: {
    findByName() {
      console.log(this.findName);
      this.$axios({
        method: 'get',
        url: 'http://localhost:8080/customer/find?name=' + this.findName,
        headers: { "Authorization": sessionStorage.getItem("token") }
      }).then((res) => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.customerData = res.data.data
        }
      })
    },
    insert(formname) {
      console.log(1111);
      this.$refs[formname].validate((valid) => {
        if (valid) {
          console.log(222);
          this.$axios({
            method: 'post',
            url: 'http://localhost:8080/customer/save',
            data: this.form,
            headers: { "Authorization": sessionStorage.getItem("token") }
          }).then((res) => {
            console.log(res.data);
            if (res.data.code === 200 || res.data.code === 201) {
              this.$message({
                type: 'success',
                message: res.data.message
              });
              this.getList()
              this.form = {}
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
          url: 'http://localhost:8080/customer/delete/' + row.customer_id,
          date: row.customer_id,
          headers: { "Authorization": sessionStorage.getItem("token") }
        }).then((res) => {
          this.$message({
            type: 'success',
            message: res.data.message
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
        this.getList()
      });
    },
    getList() {
      this.$axios({
        method: 'get',
        url: 'http://localhost:8080/customer/list',
        headers: { "Authorization": sessionStorage.getItem("token") }
      }).then((res) => {
        console.log(res.data)
        this.customerData = res.data.data
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
  created() {
    this.getList()
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