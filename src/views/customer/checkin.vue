<template>
  <div class="main-container">
    <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
      <div>
        <el-input prefix-icon="el-icon-search" type="text" style="width:200px" v-model="findName"
          placeholder="输入客户姓名..." clearable></el-input>
        <el-button style="margin:0 30px" type="success" @click="findByName">查询</el-button>
        <!-- 弹出框 -->
        <el-button type="primary" @click="dialogVisible = true;form={}"> 登记入住</el-button>
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
            <el-form-item label="年龄" prop="c_age">
              <el-input v-model="form.c_age"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="c_telephone">
              <el-input v-model="form.c_telephone"></el-input>
            </el-form-item>
            <el-form-item label="入住时间" prop="check_in_date">
              <el-col>
                <el-date-picker type="date" placeholder="选择日期" v-model="form.check_in_date" style="width: 100%;">
                </el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="入住类型" prop="check_in_type">
              <el-select v-model="form.check_in_type" placeholder="请选择入住类型">
                <el-option label="类型1" value="类型1"></el-option>
                <el-option label="类型2" value="类型2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="入住原因" prop="check_in_reason">
              <el-input type="textarea" v-model="form.check_in_reason"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="insert('form')">登记入住</el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!-- 弹出框结束 -->
      </div>
      <!-- 入住表 -->
      <el-table :data="checkinData" stripe style="width: 100%" height="542">
        <el-table-column prop="check_in_id" label="入住编号" width="90">
        </el-table-column>
        <el-table-column prop="c_id" label="客户编号" width="90">
        </el-table-column>
        <el-table-column prop="c_name" label="客户姓名" width="90">
        </el-table-column>
        <el-table-column prop="p_id" label="身份号" width="170">
        </el-table-column>
        <el-table-column prop="c_gender" label="性别" width="70">
        </el-table-column>
        <el-table-column prop="c_age" label="年龄" width="70">
        </el-table-column>
        <el-table-column prop="c_telephone" label="电话" width="110">
        </el-table-column>
        <el-table-column prop="check_in_date" label="入住时间" width="100">
        </el-table-column>
        <el-table-column prop="check_in_type" label="入住类型" width="100">
        </el-table-column>
        <el-table-column prop="check_in_reason" label="入住原因">
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button type="success" @click='update(scope.row)' size="small">编辑</el-button>
            <el-button v-if="isAdmin" type="danger" @click='deleteInfo(scope.row)' size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "checkin.vue",
  data() {

    return {
      isAdmin: false, //是否是管理员
      checkinData: [{
        c_age: 22,
        c_gender: "22",
        c_id: 2,
        c_name: "222",
        c_telephone: "",
        check_in_date: null,
        check_in_id: 3,
        check_in_reason: "",
        check_in_type: "",
        contacts: null,
        p_id: "222",
      }],
      dialogVisible: false,
      form: {
        c_name: '',
        p_id: '',
        c_gender: '',
        c_age: '',
        c_telephone: '',
        check_in_date: '',
        check_in_type: '',
        check_in_reason: '',
      },
      dialogVisible: false,
      findName: '', //查询姓名
      rules: {
        c_name: { required: true, message: '请输入客户姓名', trigger: 'blur' },
        c_gender: { required: true, message: '请选择客户性别', trigger: 'blur' },
        check_in_date: { required: true, message: '请选择入住日期', trigger: 'blur' },
        check_in_type: { required: true, message: '请选择入住类型', trigger: 'blur' },
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
        url: 'http://localhost:8080/check_in/find?name=' + this.findName,
        headers: { "Authorization": sessionStorage.getItem("token") }
      }).then((res) => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.checkinData = res.data.data
          //console.log(this.checkinData);
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
            url: 'http://localhost:8080/check_in/save',
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
              // console.log("测试1" + res.data.data);
              // this.checkinData.push(res.data.data)
              // console.log("测试2" + this.checkinData);
            }
            //console.log(res.data)
            //this.checkinData = res.data.data
            //  console.log(this.checkinData)
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
          url: 'http://localhost:8080/check_in/delete/' + row.check_in_id,
          date: row.check_in_id,
          headers: { "Authorization": sessionStorage.getItem("token") }
        }).then((res) => {
          this.getList()
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
      });
    },
    getList() {
      this.$axios({
        method: 'get',
        url: 'http://localhost:8080/check_in/list',
        headers: { "Authorization": sessionStorage.getItem("token") }
      }).then((res) => {
        console.log(res.data)
        this.checkinData = res.data.data
        console.log(this.checkinData);
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
      handler: function () {
        //do something
        //console.log(this.form.c_id);
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