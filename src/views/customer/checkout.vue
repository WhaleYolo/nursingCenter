<template>
  <div class="main-container">
    <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
      <div>
        <el-input prefix-icon="el-icon-search" type="text" style="width:200px" v-model="findName"
          placeholder="输入客户姓名..." clearable></el-input>
        <el-button style="margin:0 30px" type="success" @click="findByName">查询</el-button>
        <!-- 弹出框 -->
        <el-button type="primary" @click="dialogVisible = true"> 办理退住</el-button>
        <el-dialog title="办理退住" :visible.sync="dialogVisible" width="30%" v-if="dialogVisible" @close='closeDialog'>
          <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="客户编号" prop="c_id">
              <el-input v-model="form.c_id"></el-input>
            </el-form-item>
            <el-form-item label="客户姓名">
              <el-input v-model="form.c_name" readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
              <el-input v-model="form.p_id" readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-input v-model="form.c_gender" readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input v-model="form.c_age" readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="退住时间" prop="stay_back_date">
              <el-col>
                <el-date-picker type="date" placeholder="选择日期" v-model="form.stay_back_date" style="width: 100%;">
                </el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="退住类型" prop="stay_back_type">
              <el-select v-model="form.stay_back_type" placeholder="请选择退住类型">
                <el-option label="类型1" value="类型1"></el-option>
                <el-option label="类型2" value="类型2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="退住原因">
              <el-input type="textarea" v-model="form.stay_back_reason"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="insert('form')">办理退住</el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!-- 弹出框结束 -->
      </div>
      <!-- 入住表 -->
      <el-table :data="checkoutData" stripe style="width: 100%" height="542">
        <el-table-column prop="stay_back_id" label="退住编号" width="90">
        </el-table-column>
        <el-table-column prop="c_id" label="客户编号" width="90">
        </el-table-column>
        <el-table-column prop="c_name" label="客户姓名" width="90">
        </el-table-column>
        <el-table-column prop="p_id" label="身份号" width="160">
        </el-table-column>
        <el-table-column prop="c_gender" label="性别" width="80">
        </el-table-column>
        <el-table-column prop="c_age" label="年龄" width="80">
        </el-table-column>
        <el-table-column prop="c_telephone" label="电话" width="100">
        </el-table-column>
        <el-table-column prop="stay_back_date" label="退住时间" width="100">
        </el-table-column>
        <el-table-column prop="stay_back_type" label="退住类型" width="100">
        </el-table-column>
        <el-table-column prop="stay_back_reason" label="退住原因">
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
  name: "checkout.vue",
  data() {
    return {
      iscidExist: false, //当前cid是否存在
      checkoutData: [{
        c_age: 22,
        c_gender: "22",
        c_id: 2,
        c_name: "222",
        c_telephone: "",
        stay_back_date: null,
        stay_back_id: 3,
        stay_back_reason: "",
        stay_back_type: "",
        contacts: null,
        p_id: "222",
      }],
      dialogVisible: false,
      form: {
        c_id: '',
        c_name: '',
        p_id: '',
        c_gender: '',
        c_age: '',
        c_telephone: '',
        check_in_date: '',
        check_in_type: '',
        check_in_reason: '',
      },
      rules: {
        c_id: [
          { required: true, message: '请输入客户编号', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!this.iscidExist) {
                console.log(this.iscidExist);
                callback(new Error('当前客户编号不存在'))
              } else {
                callback()
              }
            }, trigger: 'blur'
          }
        ],
        stay_back_date: { required: true, message: '请选择退住日期', trigger: 'blur' },
        stay_back_type: { required: true, message: '请选择退住类型', trigger: 'blur' },
      },
      dialogVisible: false,
      findName: '' //查询姓名
    }
  },
  methods: {
    findByName() {
      this.$axios({
        method: 'get',
        url: 'http://localhost:8080/stay_back/find?name=' + this.findName,
        data: this.findName,
        headers: { "Authorization": sessionStorage.getItem("token") }
      }).then((res) => {
        this.checkoutData = res.data.data
      })
    },
    insert(formname) {
      this.$refs[formname].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: 'http://localhost:8080/stay_back/save',
            data: this.form,
            headers: { "Authorization": sessionStorage.getItem("token") }
          }).then((res) => {
            if (res.data.code == 200 || res.data.code == 201) {
              console.log("测试1" + res.data.data);
              this.$message({
                type: 'success',
                message: res.data.message
              });
              this.getList();
              this.form = {}
              // console.log("测试2" + this.checkinData);
            }
            else {
              this.$message({
                type: 'error',
                message: res.data.message
              });
            }
            //console.log(res.data)
            //this.checkinData = res.data.data
            //  console.log(this.checkinData)
          })
          this.dialogVisible = false
        }
        else {  //校验不通过
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
          url: 'http://localhost:8080/stay_back/delete/' + row.stay_back_id,
          date: row.check_in_id,
          headers: { "Authorization": sessionStorage.getItem("token") }
        }).then((res) => {
          this.$message({
            type: 'success',
            message: res.data.message
          });
          this.getList()
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
        url: 'http://localhost:8080/stay_back/list',
        headers: { "Authorization": sessionStorage.getItem("token") }
      }).then((res) => {
        //console.log(res.data)
        this.checkoutData = res.data.data
        //console.log(this.checkinData[0])
      })
    },
    cancel() {
      this.getList()
      this.dialogVisible = false;
      // this.$refs[formName].resetFields();
      this.form = {}
    },
    closeDialog() {
      this.getList()
      this.dialogVisible = false;
      this.form = {}
      //this.$refs.form.resetFields();
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
              this.form = res.data.data
              this.iscidExist = true
            } else {
              this.iscidExist = false
              this.form.c_name = ''
              this.form.c_gender = ''
              this.form.p_id = ''
              this.form.c_age = ''
            }
            //console.log(this.checkinData[0])
          })
        }
        //do something
        // console.log(this.form.c_id);
      },
    }
  },

  created() {
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