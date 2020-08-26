<template>
  <div class="main-container">
    <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
      <div>
        <el-input prefix-icon="el-icon-search" type="text" style="width:200px" v-model="findName"
          placeholder="输入客户姓名..." clearable></el-input>
        <el-button style="margin:0 30px" type="success" @click="findByName">查询</el-button>
        <el-button type="primary" @click="addBedDialog = true;bedform={}" v-if="$store.getters.getAdmin"> 添加床位
        </el-button>
        <!-- 新增床位弹出框 -->
        <el-dialog title="添加床位" :visible.sync="addBedDialog" width="30%" v-if="addBedDialog" @close='closeDialog'>
          <el-form ref="bedform" :model="bedform" label-width="80px" :rules="rules1">
            <el-form-item label="楼层号" prop="floor_number">
              <el-input v-model="bedform.floor_number"></el-input>
            </el-form-item>
            <el-form-item label="房间号" prop="room_number">
              <el-input v-model="bedform.room_number"></el-input>
            </el-form-item>
            <el-form-item label="床位类型" prop="bed_type">
              <el-select v-model="bedform.bed_type" placeholder="请选择床位类型">
                <el-option label="普通单人间" value="普通单人间"></el-option>
                <el-option label="豪华单人间" value="豪华单人间"></el-option>
                <el-option label="普通双人间" value="普通双人间"></el-option>
                <el-option label="豪华双人间" value="豪华双人间"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="床位状态">
              <el-select v-model="bedform.bed_status" placeholder="请选择床位状态">
                <el-option label="空闲" value="空闲"></el-option>
                <el-option label="入住" value="入住"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="insert(bedform)">新增</el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!-- 新增床位弹出框结束 -->
        <!-- 修改床位弹出框 -->
        <el-dialog title="分配床位" :visible.sync="dialogVisible" width="30%" v-if="dialogVisible" @close='closeDialog'>
          <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="客户编号" prop="c_id">
              <el-input v-model="form.c_id"></el-input>
            </el-form-item>
            <el-form-item label="客户姓名">
              <el-input v-model="form.c_name" readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="楼层号">
              <el-input v-model="form.floor_number" readonly></el-input>
            </el-form-item>
            <el-form-item label="房间号">
              <el-input v-model="form.room_number" readonly></el-input>
            </el-form-item>
            <el-form-item label="床位类型">
              <el-input v-model="form.bed_type" readonly></el-input>
            </el-form-item>
            <el-form-item label="床位状态">
              <el-input v-model="form.bed_status"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="update('form')">登记入住</el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!-- 分配床位弹出框结束 -->
      </div>
      <el-table :data="bedData" stripe style="width: 100%">
        <el-table-column prop="bed_id" label="床位编号" width="180">
        </el-table-column>
        <el-table-column prop="c_id" label="客户编号" width="180">
        </el-table-column>
        <el-table-column prop="c_name" label="客户姓名">
        </el-table-column>
        <el-table-column prop="floor_number" label="楼层号">
        </el-table-column>
        <el-table-column prop="room_number" label="房间号">
        </el-table-column>
        <el-table-column prop="bed_type" label="床位类型">
        </el-table-column>
        <el-table-column label="床位状态">
          <template slot-scope="scope">
            {{scope.row.bed_status | statusFormat}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button @click="dispach(scope.row)" type="primary" size="small">分配床位</el-button>
            <el-button v-if="$store.getters.getAdmin" type="danger" size="small" @click="deleteBed(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "bedInfo.vue",
  data() {
    var cidValidate = (rule, value, callback) => {
      if (!this.iscidExist) {
        console.log(this.iscidExist);
        callback(new Error('当前客户编号不存在'))
      } else {
        callback()
      }
    }
    return {
      bedData: [
        {
          bed_id: '11',
          c_id: '111',
          c_name: '测试',
          floor_number: '2',
          room_number: '202',
          bed_type: '豪华套房',
          bed_status: '空闲'
        }
      ],
      dialogVisible: false,
      addBedDialog: false,
      findName: '',
      findID: '',//查询姓名
      form: {
        c_id: '',
        c_name: '',
        floor_number: '',
        room_number: '',
        bed_type: '',
        bed_status: '',
      },
      bedform: {
        floor_number: '',
        room_number: '',
        bed_type: '',
        bed_status: '',
      },
      rules: {
        c_id: [
          {
            validator: cidValidate, trigger: 'blur'
          }
        ]
      },
      rules1: {
        floor_number: [
          { required: true, message: '请输入楼层号', trigger: 'blur' },
          { pattern: /^([1-9]|10)$/, message: "请输入数字1-10", trigger: 'blur' }
        ],
        room_number: { required: true, message: '请输入房间号', trigger: 'blur' },
        bed_type: { required: true, message: '请输入床位类型', trigger: 'blur' }
      }
    }
  },
  methods: {

    dispach(row) {
      this.dialogVisible = true
      this.form = row
      console.log(row);
    },
    findByName() {

      this.$axios({
        method: 'get',
        url: 'http://localhost:8080/bed_information/find?name=' + this.findName,
        headers: { "Authorization": sessionStorage.getItem("token") }
      }).then((res) => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.bedData = res.data.data
          //console.log(this.checkinData);
        }
      })
    },
    insert(formname) {
      this.bedform.bed_status = '空闲'
      this.$refs[formname].validate((valid) => {
        if (valid) {
          if (this.bedform.bed_status === '空闲') {
            this.bedform.bed_status = 0
          }
          if (this.bedform.bed_status === '入住') {
            this.bedform.bed_status = 1
          }
          this.$axios({
            method: 'post',
            url: 'http://localhost:8080/bed_information/insert',
            data: this.bedform,
            headers: { "Authorization": sessionStorage.getItem("token") }
          }).then((res) => {
            console.log(res.data);
            if (res.data.code === 200 || res.data.code === 201) {
              this.$message({
                type: 'success',
                message: res.data.message
              });
              this.getList()
            }
          })
          this.addBedDialog = false
        } else {  //校验不通过
          this.$message({
            type: 'error',
            message: '操作失败'
          });
        }
      });

    },
    update(formname) {
      if (this.form.bed_status === '空闲') {
        this.form.bed_status = 0
      }
      if (this.form.bed_status === '入住') {
        this.form.bed_status = 1
      }
      console.log(this.form);
      this.$axios({
        method: 'post',
        url: 'http://localhost:8080/bed_information/update',
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
        else {
          this.$message({
            type: 'error',
            message: res.data.message
          });
          this.getList()
        }
        //console.log(res.data)
        //this.checkinData = res.data.data
        //  console.log(this.checkinData)
      })
      this.dialogVisible = false
    },
    deleteBed(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          method: 'delete',
          url: 'http://localhost:8080/bed_information/delete/' + row.bed_id,
          date: row.bed_id,
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
        url: 'http://localhost:8080/bed_information/list',
        headers: { "Authorization": sessionStorage.getItem("token") }
      }).then((res) => {
        console.log(res.data)
        this.bedData = res.data.data
        //console.log(this.checkinData[0])
      })
    },
    cancel() {
      this.getList()
      this.dialogVisible = false;
      this.addBedDialog = false
      this.form = {}
      this.bedform = {}
    },
    closeDialog() {
      this.getList()
      this.dialogVisible = false;
      this.addBedDialog = false
      this.form = {}
      this.bedform = {}
    }
  },
  created() {
    this.getList()
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
              this.form.bed_status = '入住'
              this.iscidExist = true
            } else {
              this.iscidExist = false
            }
            //console.log(this.checkinData[0])
          })
        } else {
          this.form.c_name = ''
          this.form.bed_status = '空闲'
        }
        //do something
        // console.log(this.form.c_id);
      },
    }
  },
  filters: {
    statusFormat: function (val) {
      if (val === false) {
        return '空闲'
      }
      else {
        return '入住'
      }
    }
  }
}
</script>

<style scoped>
</style>