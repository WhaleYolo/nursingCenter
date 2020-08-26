<template>
  <div class="main-container">
    <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
      <div>
        <el-input prefix-icon="el-icon-search" type="text" style="width:200px" v-model="findName"
          placeholder="输入员工姓名..." clearable></el-input>
        <el-button style="margin:0 30px" type="success" @click="findByName">查询</el-button>
        <!-- 弹出框 -->
        <el-button type="primary" @click="dialogVisible = true;form.staff_type = '护士'" v-if="$store.getters.getAdmin">
          新增员工信息</el-button>
        <el-dialog v-if="dialogVisible" title="新增员工信息" :visible.sync="dialogVisible" width="30%">
          <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="姓名" prop="staff_name">
              <el-input v-model="form.staff_name"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="staff_gender">
              <el-select v-model="form.staff_gender" placeholder="选择性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年龄" prop="staff_age">
              <el-input v-model="form.staff_age"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="telephone">
              <el-input v-model="form.telephone"></el-input>
            </el-form-item>
            <el-form-item label="入职时间" prop="entry_time">
              <el-col>
                <el-date-picker type="date" placeholder="选择日期" v-model="form.entry_time" style="width: 100%;">
                </el-date-picker>
              </el-col>
            </el-form-item>

            <el-form-item label="员工类型" prop="staff_type">
              <el-select v-model="form.staff_type" placeholder="选择员工类型">
                <el-option label="护工" value="护工"></el-option>
                <el-option label="护士" value="护士"></el-option>
                <el-option label="医生" value="医生"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="insert('form')">保存</el-button>
              <el-button @click="dialogVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!-- 弹出框结束 -->
      </div>
      <!-- 员工信息表 -->
      <el-table :data="nurseData" stripe style="width: 100%">
        <el-table-column prop="staff_id" label="员工工号">
        </el-table-column>
        <el-table-column prop="staff_name" label="姓名">
        </el-table-column>
        <el-table-column prop="staff_gender" label="性别">
        </el-table-column>
        <el-table-column prop="staff_age" label="年龄">
        </el-table-column>
        <el-table-column prop="telephone" label="电话">
        </el-table-column>
        <el-table-column prop="staff_type" label="员工类型">
        </el-table-column>
        <el-table-column prop="entry_time" label="入职时间">
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button type="success" @click='update(scope.row)' v-if="$store.getters.getAdmin" size="small">编辑
            </el-button>
            <el-button type="danger" @click='deleteInfo(scope.row)' v-if="$store.getters.getAdmin" size="small">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "nurse.vue",
  data() {
    return {
      nurseData: [{
        staff_age: 22,
        staff_gender: "22",
        staff_id: 2,
        staff_name: "222",
        telephone: "",
        entry_time: null,
        staff_type: "",
      }],
      dialogVisible: false,
      form: {
        staff_age: "",
        staff_gender: "",
        staff_id: "",
        staff_name: "",
        telephone: "",
        entry_time: "",
        staff_type: "",
      },
      dialogVisible: false,
      findName: '', //查询姓名
      rules: {
        staff_type: { required: true, message: '请选择员工类型', trigger: 'blur' },
        staff_gender: { required: true, message: '请选择员工性别', trigger: 'blur' },
        entry_time: { required: true, message: '请选择入职时间', trigger: 'blur' },
        staff_name: { required: true, message: '请输入员工姓名', trigger: 'blur' },
        staff_age: [
          { required: true, message: '请输入员工年龄', trigger: 'blur' },
          {
            pattern: /^(?:[2-9][0-9])$/,
            message: '请输入正确的年龄20以上',
            trigger: 'blur'
          }
        ],
        telephone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^[1][3-8]\d{9}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    findByName() {
      console.log(this.findName);
      this.$axios({
        method: 'get',
        url: 'http://localhost:8080/staff/findnurse?name=' + this.findName,
        headers: { "Authorization": sessionStorage.getItem("token") }
      }).then((res) => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.nurseData = res.data.data
        }
      })
    },
    insert(formname) {
      this.$refs[formname].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: 'http://localhost:8080/staff/save',
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
          url: 'http://localhost:8080/staff/delete/' + row.staff_id,
          date: row.staff_id,
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
        url: 'http://localhost:8080/staff/nurse',
        headers: { "Authorization": sessionStorage.getItem("token") }
      }).then((res) => {
        //console.log(res.data)
        this.nurseData = res.data.data

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
    findName() {
      //do something
      if (this.findName.length == 0) {
        this.getList()
      }
      //console.log(this.findName.length);
      //console.log(this.$refs.passWords.value.length);
    },
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