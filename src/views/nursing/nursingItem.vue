<template>
  <div class="main-container">
    <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
      <div>
        <el-input prefix-icon="el-icon-search" type="text" style="width:200px" v-model="findName"
          placeholder="输入项目名称..." clearable></el-input>
        <el-button style="margin:0 30px" type="success" @click="findByName">查询</el-button>
        <!-- 弹出框 -->
        <el-button type="primary" @click="dialogVisible = true"> 新增护理项目</el-button>
        <el-dialog title="新增护理项目" :visible.sync="dialogVisible" width="30%" v-if="dialogVisible" @close='closeDialog'>
          <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="项目名称" prop="nursing_name">
              <el-input v-model="form.nursing_name"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="nursing_price">
              <el-input v-model="form.nursing_price"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="nursing_type">
              <el-select v-model="form.nursing_type" placeholder="选择护理类型">
                <el-option label="晨间护理" value="晨间护理"></el-option>
                <el-option label="晚间护理" value="晚间护理"></el-option>
                <el-option label="饮食护理" value="饮食护理"></el-option>
                <el-option label="排泄护理" value="排泄护理"></el-option>
                <el-option label="卧位护理" value="卧位护理"></el-option>
                <el-option label="舒适护理" value="舒适护理"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="内容" prop="nursing_content">
              <el-input type="textarea" v-model="form.nursing_content"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="nursing_status">
              <el-select v-model="form.nursing_status" placeholder="选择护理状态">
                <el-option label="启用" value=true></el-option>
                <el-option label="停用" value=false></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="insert('form')">保存</el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!-- 弹出框结束 -->
      </div>
      <!-- 护理项目信息表 -->
      <el-table :data="nursingData" stripe style="width: 100%" height="542">
        <el-table-column prop="nursing_item_id" label="项目编号" width="120">
        </el-table-column>
        <el-table-column prop="nursing_name" label="项目名称">
        </el-table-column>
        <el-table-column prop="nursing_price" label="价格">
        </el-table-column>
        <el-table-column prop="nursing_type" label="类型">
        </el-table-column>
        <el-table-column prop="nursing_content" label="内容" width="280">
        </el-table-column>
        <el-table-column prop="nursing_status" label="状态">
          <template slot-scope="scope">
            {{scope.row.nursing_status | statusFormat}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button type="success" @click='update(scope.row)' size="small">编辑</el-button>
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
  name: "nursing.vue",
  data() {
    return {
      nursingData: [{
        nursing_item_id: '1',
        nursing_name: '1',
        nursing_price: '1',
        nursing_status: '1',
        nursing_content: '1',
        nursing_type: '1',
      }],
      dialogVisible: false,
      form: {
        nursing_item_id: '',
        nursing_name: '',
        nursing_price: '',
        nursing_status: '',
        nursing_content: '',
        nursing_type: '',
      },
      dialogVisible: false,
      findName: '', //查询姓名
      rules: {
        nursing_price: [
          { required: true, message: '请输入护理价格', trigger: 'blur' },
          {
            pattern: /^[0-9]*$/,
            message: '请输入数字',
            trigger: 'blur'
          }
        ],
        nursing_name: { required: true, message: '请选择护理名称', trigger: 'blur' },
        nursing_status: { required: true, message: '请选择护理状态', trigger: 'blur' },
        nursing_content: { required: true, message: '请选择护理内容', trigger: 'blur' },
        nursing_type: { required: true, message: '请选择护理类型', trigger: 'blur' },

      },
    }
  },
  methods: {
    findByName() {
      console.log(this.findName);
      this.$axios({
        method: 'get',
        url: 'http://localhost:8080/nursing/find?name=' + this.findName,
        headers: { "Authorization": sessionStorage.getItem("token") }
      }).then((res) => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.nursingData = res.data.data
          //console.log(this.checkinData);
        }
      })
    },
    insert(formname) {
      this.$refs[formname].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: 'http://localhost:8080/nursing/save',
            data: this.form,
            headers: { "Authorization": sessionStorage.getItem("token") }
          }).then((res) => {

            //console.log(res.data);
            if (res.data.code === 200 || res.data.code === 201) {
              this.$message({
                type: 'success',
                message: res.data.message
              });
              //closeDialog()
              this.getList()
              this.form = {}
              // this.checkinData.push(res.data.data)
              // console.log("测试2" + this.checkinData);
            }
            //console.log(res.data)
            //this.checkinData = res.data.data
            //  console.log(this.checkinData)
          })
          //this.$refs[form].resetFields();
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
      if (this.form.nursing_status === false) {
        this.form.nursing_status = "停用"
      }
      if (this.form.nursing_status === true) {
        this.form.nursing_status = "启用"
      }
    },


    deleteInfo(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          method: 'delete',
          url: 'http://localhost:8080/nursing/delete/' + row.nursing_item_id,
          date: row.nursing_item_id,
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
        url: 'http://localhost:8080/nursing/list',
        headers: { "Authorization": sessionStorage.getItem("token") }
      }).then((res) => {
        //console.log(res.data)
        this.nursingData = res.data.data
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