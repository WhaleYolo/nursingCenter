<template>
  <div class="main-container">
    <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
      <div>
        <el-input prefix-icon="el-icon-search" type="text" style="width:200px" v-model="findName"
          placeholder="输入客户姓名..." clearable></el-input>
        <el-button style="margin:0 30px" type="success" @click="findByName">查询</el-button>
        <!-- 新增入住弹出框 -->
        <el-button type="primary" @click="dialogVisible = true;form={}"> 登记入住</el-button>
        <el-dialog title="登记入住" :visible.sync="dialogVisible" width="30%" v-if="dialogVisible" @close='closeDialog'>
          <el-form ref="form" :model="form" label-width="80px" :rules="rules" :key="timer">
            <el-form-item label="客户姓名" prop="c_name">
              <el-input v-model="form.c_name"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="p_id">
              <el-input v-model="form.p_id"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="c_gender">
              <el-select v-model="form.c_gender" placeholder="请选择性别">
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
                <el-option label="能自理" value="能自理"></el-option>
                <el-option label="半自理" value="半自理"></el-option>
                <el-option label="不能自理" value="不能自理"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="入住原因" prop="check_in_reason">
              <el-input type="textarea" v-model="form.check_in_reason"></el-input>
            </el-form-item>
            <el-form-item label="床位类型" prop="bed_type">
              <el-select v-model="form.bed_type" placeholder="请选择床位类型">
                <el-option label="普通单人间" value="普通单人间"></el-option>
                <el-option label="豪华单人间" value="豪华单人间"></el-option>
                <el-option label="普通双人间" value="普通双人间"></el-option>
                <el-option label="豪华双人间" value="豪华双人间"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="床位编号">
              <el-input v-model="form.bed_id" readonly></el-input>
            </el-form-item>
            <el-form-item label="楼层号">
              <el-input v-model="form.floor_number" readonly></el-input>
            </el-form-item>
            <el-form-item label="房间号码">
              <el-input v-model="form.room_number" readonly></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="insert('form')">保存</el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>

          </el-form>
        </el-dialog>
        <!-- 新增入住弹出框结束 -->
        <!-- 修改入住弹出框 -->
        <el-dialog title="登记入住" :visible.sync="updateVisible" width="30%" v-if="updateVisible" @close='closeDialog'>
          <el-form ref="updateform" :model="updateform" label-width="80px" :rules="rules">
            <el-form-item label="客户姓名" prop="c_name">
              <el-input v-model="updateform.c_name"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="p_id">
              <el-input v-model="updateform.p_id"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="c_gender">
              <el-select v-model="updateform.c_gender" placeholder="请选择性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年龄" prop="c_age">
              <el-input v-model="updateform.c_age"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="c_telephone">
              <el-input v-model="updateform.c_telephone"></el-input>
            </el-form-item>
            <el-form-item label="入住时间" prop="check_in_date">
              <el-col>
                <el-date-picker type="date" placeholder="选择日期" v-model="updateform.check_in_date" style="width: 100%;">
                </el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="入住类型" prop="check_in_type">
              <el-select v-model="updateform.check_in_type" placeholder="请选择入住类型">
                <el-option label="能自理" value="能自理"></el-option>
                <el-option label="半自理" value="半自理"></el-option>
                <el-option label="不能自理" value="不能自理"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="入住原因" prop="check_in_reason">
              <el-input type="textarea" v-model="updateform.check_in_reason"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateCheckin('updateform')">保存</el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!-- 修改入住弹出框结束 -->
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
      timer: '',
      isAdmin: false, //是否是管理员
      checkinData: [],
      dialogVisible: false,
      updateVisible: false,
      form: {
        c_name: '1',
        p_id: '',
        c_gender: '',
        c_age: '',
        c_telephone: '',
        check_in_date: '',
        check_in_type: '',
        check_in_reason: '',
        floor_number: '',
        bed_status: '',
        bed_type: '',
        room_number: ''
      },
      bedform: {
        bed_id: '',
        c_id: '',
        c_name: '',
        floor_number: '',
        bed_status: '',
        bed_type: '',
        room_number: ''
      },
      updateform: {
        c_name: '1',
        p_id: '',
        c_gender: '',
        c_age: '',
        c_telephone: '',
        check_in_date: '',
        check_in_type: '',
        check_in_reason: '',
      },
      isTypeExist: false,
      dialogVisible: false,
      findName: '', //查询姓名
      rules: {
        bed_type: [
          { required: true, message: '请选择床位类型', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (!this.isTypeExist) {
                callback(new Error('当前房间类型不存在或者已满'))
              } else {
                callback()
              }
            }, trigger: 'blur'
          }
        ],
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
      //console.log(this.findName);
      this.$axios({
        method: 'get',
        url: '/check_in/find?name=' + this.findName,
        //headers: { "Authorization": sessionStorage.getItem("token") }
      }).then((res) => {
        if (res.data.code == 200) {
          this.checkinData = res.data.data
          ////console.log(this.checkinData);
        }
        else {
          this.$message({
            type: 'error',
            message: '查询失败'
          });
        }
      })
    },
    insert(formname) {
      //console.log(1111);
      this.$refs[formname].validate((valid) => {
        if (valid) {
          //console.log(222);
          this.bedform.bed_id = this.form.bed_id
          this.bedform.c_id = this.form.c_id
          this.bedform.c_name = this.form.c_name
          this.bedform.floor_number = this.form.floor_number
          this.bedform.bed_type = this.form.bed_type
          this.bedform.room_number = this.form.room_number
          this.bedform.bed_status = 1
          // 床位
          console.log(this.bedform);
          this.$axios({
            method: 'post',
            url: '/bed_information/insert',
            data: this.bedform,
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
          //入住
          this.$axios({
            method: 'post',
            url: '/check_in/save',
            data: this.form,

          }).then((res) => {
            //console.log(res.data);
            if (res.data.code === 200 || res.data.code === 201) {
              this.$message({
                type: 'success',
                message: res.data.message
              });
              this.getList()
              // //console.log("测试1" + res.data.data);
              // this.checkinData.push(res.data.data)
              // //console.log("测试2" + this.checkinData);
            }
            ////console.log(res.data)
            //this.checkinData = res.data.data
            //  //console.log(this.checkinData)
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
      this.updateVisible = true,
        this.updateform = row
    },
    updateCheckin(formname) {
      this.$refs[formname].validate((valid) => {
        if (valid) {
          //入住
          this.$axios({
            method: 'post',
            url: '/check_in/save',
            data: this.updateform,
          }).then((res) => {
            //console.log(res.data);
            if (res.data.code === 200 || res.data.code === 201) {
              this.$message({
                type: 'success',
                message: res.data.message
              });
              this.getList()
            }
          })
          this.updateVisible = false
        } else {  //校验不通过
          this.$message({
            type: 'error',
            message: '操作失败'
          });
        }
      });
    },
    deleteInfo(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          method: 'delete',
          url: '/check_in/delete/' + row.check_in_id,
          date: row.check_in_id,
          //  //headers: { "Authorization": sessionStorage.getItem("token") }
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
      //入住
      this.$axios({
        method: 'get',
        url: '/check_in/list',
        ////headers: { "Authorization": sessionStorage.getItem("token") }
      }).then((res) => {
        //console.log(res.data)
        this.checkinData = res.data.data
        //console.log(this.checkinData);
        ////console.log(this.checkinData[0])
      })
      // 床位
      this.$axios({
        method: 'get',
        url: '/bed_information/list',
        //headers: { "Authorization": sessionStorage.getItem("token") }
      }).then((res) => {
        ////console.log(res.data)
        this.checkinData.bed_id = res.data.data.bed_id
        this.checkinData.bed_type = res.data.data.bed_type
        this.checkinData.floor_number = res.data.data.floor_number
        this.checkinData.room_number = res.data.data.room_number

        console.log(this.checkinData)
      })
    },
    cancel() {
      this.getList()
      this.dialogVisible = false;
      this.updateVisible = false,
        this.form = {}
    },
    closeDialog() {
      this.getList()
      this.dialogVisible = false;
      this.updateVisible = false,
        this.form = {}
    }
  },
  watch: {
    'form.bed_type': {
      handler: function (newval, oldval) {

        if (newval && newval != '' && newval != undefined) {
          console.log(this.form.bed_type);
          this.$axios({
            method: 'get',
            url: '/bed_information/findByType/?type=' + this.form.bed_type,
            //headers: { "Authorization": sessionStorage.getItem("token") }
          }).then((res) => {
            console.log(res.data)
            if (res.data.code === 200) {
              this.timer = new Date().getTime()
              this.isTypeExist = true
              this.form.bed_id = res.data.data.bed_id
              this.form.floor_number = res.data.data.floor_number
              this.form.room_number = res.data.data.room_number
              console.log(this.form);
              console.log(this.isTypeExist);
              // this.form = res.data.data
              // this.iscidExist = true
            } else {
              this.isTypeExist = false
              this.form.bed_id = ''
              this.form.floor_number = ''
              this.form.room_number = ''
              console.log(this.form);
            }
            ////console.log(this.checkinData[0])
          }).catch(e => {
          })
        }
        //do something
        // //console.log(this.form.c_id);
      },
    },
  },

  created() {
    this.isAdmin = this.$store.getters.getAdmin;
    this.getList();
  },
}
</script>

<style scoped>
</style>