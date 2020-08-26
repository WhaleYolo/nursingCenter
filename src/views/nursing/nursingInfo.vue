<template>
  <div class="main-container">
    <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
      <div>
        <el-input prefix-icon="el-icon-search" type="text" style="width:200px" v-model="findName"
          placeholder="输入客户姓名..." clearable></el-input>
        <el-button style="margin:0 30px" type="success" @click="findByName">查询</el-button>
        <!-- 弹出框 -->
        <el-button type="primary" @click="dialogVisible = true">新增护理记录</el-button>
        <el-dialog v-if="dialogVisible" title="新增护理记录" :visible.sync="dialogVisible" width="30%">
          <el-form ref="form" :model="form" label-width="100px" :rules="rules">
            <el-form-item label="项目编号" prop="nursing_item_id">
              <el-input v-model="form.nursing_item_id"></el-input>
            </el-form-item>
            <el-form-item label="项目名称">
              <el-input v-model="form.nursing_item_name" readonly></el-input>
            </el-form-item>
            <el-form-item label="护理内容">
              <el-input type="textarea" v-model="form.nursing_content" readonly></el-input>
            </el-form-item>
            <el-form-item label="客户编号" prop="c_id">
              <el-input v-model="form.c_id"></el-input>
            </el-form-item>
            <el-form-item label="客户姓名">
              <el-input v-model="form.c_name" readonly></el-input>
            </el-form-item>
            <el-form-item label="护工编号" prop="staff_id">
              <el-input v-model="form.staff_id"></el-input>
            </el-form-item>
            <el-form-item label="护理人员">
              <el-input v-model="form.staff_name" readonly></el-input>
            </el-form-item>
            <el-form-item label="数量" prop="nursing_number">
              <el-input v-model="form.nursing_number"></el-input>
            </el-form-item>
            <el-form-item label="康复效果">
              <el-input type="textarea" v-model="form.nursing_result"></el-input>
            </el-form-item>
            <el-form-item label="护理时间" prop="nursing_date">
              <el-col>
                <el-date-picker type="date" placeholder="选择日期" v-model="form.nursing_date" style="width: 100%;">
                </el-date-picker>
              </el-col>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="insert('form')">保存</el-button>
              <el-button @click="dialogVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!-- 弹出框结束 -->
      </div>
      <!-- 护理记录信息表 -->
      <el-table :data="nursingInfoData" stripe style="width: 100%">
        <el-table-column prop="nursing_id" label="编号"></el-table-column>
        <el-table-column prop="c_name" label="客户姓名"></el-table-column>
        <el-table-column prop="nursing_item_name" label="项目名称"></el-table-column>
        <el-table-column prop="nursing_content" label="护理内容"></el-table-column>
        <el-table-column prop="nursing_number" label="数量"></el-table-column>
        <el-table-column prop="nursing_result" label="康复效果"></el-table-column>
        <el-table-column prop="nursing_date" label="护理时间"></el-table-column>
        <el-table-column prop="staff_name" label="护理人员"></el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button type="success" @click="update(scope.row)" size="small">编辑</el-button>
            <el-button v-if="$store.getters.getAdmin" type="danger" @click="deleteInfo(scope.row)" size="small">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "nursingInfo.vue",
  data() {
    const cidValidate = (rule, value, callback) => {
      if (!this.iscidExist) {
        callback(new Error('当前客户编号不存在'))
      } else {
        callback()
      }
    }
    const itemValidate = (rule, value, callback) => {
      if (!this.isItemIdExist) {
        callback(new Error('当前项目编号不存在'))
      } else {
        callback()
      }
    }
    const sidValidate = (rule, value, callback) => {
      if (!this.isSidExist) {
        callback(new Error('当前护理人员编号不存在'))
      } else {
        callback()
      }
    }
    return {
      nursingInfoData: [{
        nursing_id: 22,
        c_name: "小男",
        nursing_item_name: "",
        nursing_content: "啥事没有",
        nursing_number: "20",
        nursing_result: "不理想",
        nursing_date: null,
        staff_name: "小明",
      }],
      dialogVisible: false,
      form: {
        nursing_item_name: "",
        staff_name: "",
        nursing_item_id: "",
        c_id: "",
        c_name: "",
        staff_id: "",
        nursing_content: "",
        nursing_number: "",
        nursing_result: "",
        nursing_date: "",
      },
      dialogVisible: false,
      findName: '', //查询姓名
      rules: {
        nursing_number: [
          { required: true, message: '请输入护理数量', trigger: 'blur' },
          {
            pattern: /^[1-9][0-9]{0,1}$/,
            message: '请输入数字1-99',
            trigger: 'blur'
          }
        ],
        nursing_date: { required: true, message: '请选择护理日期', trigger: 'blur' },
        c_id: [
          { required: true, message: '请输入客户编号', trigger: 'blur' },
          { validator: cidValidate, trigger: 'blur' }
        ],
        nursing_item_id: [
          { required: true, message: '请输入项目编号', trigger: 'blur' },
          { validator: itemValidate, trigger: 'blur' }
        ],
        staff_id: [
          { required: true, message: '请输入护理人员编号', trigger: 'blur' },
          { validator: sidValidate, trigger: 'blur' }
        ]
      },
    }
  },
  methods: {
    findByName() {
      console.log(this.findName);
      this.$axios({
        method: 'get',
        url: 'http://localhost:8080/nursingRecords/findByName?c_name=' + this.findName,
        headers: { "Authorization": sessionStorage.getItem("token") }
      }).then((res) => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.nursingInfoData = res.data.data
          //console.log(this.checkinData);
        }
      })
    },
    insert(formname) {
      this.$refs[formname].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: 'http://localhost:8080/nursingRecords/save',
            data: this.form,
            headers: { "Authorization": sessionStorage.getItem("token") }
          }).then((res) => {

            //console.log(res.data);
            if (res.data.code === 200 || res.data.code === 201) {
              this.$message({
                type: 'success',
                message: res.data.message,
              });
              this.form = {}
              this.getList()
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
          url: 'http://localhost:8080/nursingRecords/delete/' + row.nursing_id,
          date: row.nursing_id,
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
        url: 'http://localhost:8080/nursingRecords/list',
        headers: { "Authorization": sessionStorage.getItem("token") }
      }).then((res) => {
        //console.log(res.data)
        this.nursingInfoData = res.data.data
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
    statusFormat: function (val) {
      if (val === false) {
        return '停用'
      }
      else {
        return '启用'
      }
    },
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
              this.form.c_name = ''
            }
            //console.log(this.checkinData[0])
          })
        }
        //do something
        // console.log(this.form.c_id);
      },
    },
    'form.nursing_item_id': {
      handler: function (newval, oldval) {
        if (newval && newval != '' && newval != undefined) {
          this.$axios({
            method: 'get',
            url: 'http://localhost:8080/nursing/findById/?id=' + this.form.nursing_item_id,
            headers: { "Authorization": sessionStorage.getItem("token") }
          }).then((res) => {
            // console.log(res.data)
            if (res.data.code === 200) {
              console.log(res.data);
              this.form.nursing_item_name = res.data.data.nursing_name
              this.form.nursing_content = res.data.data.nursing_content
              this.isItemIdExist = true
            } else {
              this.isItemIdExist = false
              this.form.nursing_item_name = ''
              this.form.nursing_content = ''
            }
            //console.log(this.checkinData[0])
          })
        }
        //do something
        // console.log(this.form.c_id);
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
              console.log(res.data);
              this.form.staff_name = res.data.data.staff_name
              this.isSidExist = true
            } else {
              this.isItemIdExist = false
              this.form.staff_name = ''
            }
            //console.log(this.checkinData[0])
          })
        }
        //do something
        // console.log(this.form.c_id);
      },
    }
  },
}
</script>

<style scoped>
</style>