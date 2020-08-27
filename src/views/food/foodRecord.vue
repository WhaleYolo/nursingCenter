<template>
  <div class="main-container">
    <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
      <template>
        <!-- 弹出框 -->
        <el-dialog title="菜单" :visible.sync="dialogVisible" width="30%" v-if="dialogVisible" @close='closeDialog'>
          <el-form ref="form" :model="form" label-width="80px" :rules="rules">

            <el-form-item label="日期" prop="date">
              <el-col>
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;">
                </el-date-picker>
              </el-col>
            </el-form-item>

            <el-form-item label="星期" prop="week">
              <el-select v-model="form.week" placeholder="选择星期">
                <el-option label="星期一" value="星期一"></el-option>
                <el-option label="星期二" value="星期二"></el-option>
                <el-option label="星期三" value="星期三"></el-option>
                <el-option label="星期四" value="星期四"></el-option>
                <el-option label="星期五" value="星期五"></el-option>
                <el-option label="星期六" value="星期六"></el-option>
                <el-option label="星期日" value="星期日"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="菜1">
              <el-input v-model="form.diet_1"></el-input>
            </el-form-item>

            <el-form-item label="菜2">
              <el-input v-model="form.diet_2"></el-input>
            </el-form-item>

            <el-form-item label="菜3">
              <el-input v-model="form.diet_3"></el-input>
            </el-form-item>

            <el-form-item label="菜4">
              <el-input v-model="form.diet_4"></el-input>
            </el-form-item>

            <el-form-item label="菜5">
              <el-input v-model="form.diet_5"></el-input>
            </el-form-item>

            <el-form-item label="菜6">
              <el-input v-model="form.diet_6"></el-input>
            </el-form-item>

            <el-form-item label="菜7">
              <el-input v-model="form.diet_7"></el-input>
            </el-form-item>

            <el-form-item label="菜8">
              <el-input v-model="form.diet_8"></el-input>
            </el-form-item>

            <el-form-item label="菜9">
              <el-input v-model="form.diet_9"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="insert('form')">保存</el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>

          </el-form>
        </el-dialog>

        <!-- 弹出框结束 -->
      </template>
      <!-- 菜谱表 -->
      <el-table :data="dietData" style="width: 100%">
        <el-table-column>
          <el-table-column>
            <el-table-column prop="date" label="日期" width="100"></el-table-column>
            <el-table-column prop="week" label="星期" width="70"></el-table-column>
          </el-table-column>

          <el-table-column label="早餐">
            <el-table-column prop="diet_1" label="菜1" width="105"></el-table-column>
            <el-table-column prop="diet_2" label="菜2" width="105"></el-table-column>
            <el-table-column prop="diet_3" label="菜3" width="105"></el-table-column>
          </el-table-column>

          <el-table-column label="午餐">
            <el-table-column prop="diet_4" label="菜4" width="105"></el-table-column>
            <el-table-column prop="diet_5" label="菜5" width="105"></el-table-column>
            <el-table-column prop="diet_6" label="菜6" width="105"></el-table-column>
          </el-table-column>

          <el-table-column label="晚餐">
            <el-table-column prop="diet_7" label="菜7" width="105"></el-table-column>
            <el-table-column prop="diet_8" label="菜8" width="105"></el-table-column>
            <el-table-column prop="diet_9" label="菜9" width="105"></el-table-column>
          </el-table-column>

          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="success" @click='update(scope.row)' size="small">编辑</el-button>
              <!-- <el-button type="danger" @click='deleteInfo(scope.row)' size="small">删除</el-button> -->
            </template>
          </el-table-column>

        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "foodRecord.vue",
  data() {
    return {
      dietData: [{
        // diet_id:"1",
        date: "2020-08-23",
        week: "星期日",
        diet_1: "馒头",
        diet_2: "牛奶",
        diet_3: "荷包蛋",
        diet_4: "清蒸鱼",
        diet_5: "丝瓜汤",
        diet_6: "香菇菜心",
        diet_7: "虾皮冬瓜",
        diet_8: "青椒炒肉丝",
        diet_9: "香菇汤",
      }],
      dialogVisible: false,
      form: {
        // diet_id:'',
        date: '',
        week: '',
        diet_1: '',
        diet_2: '',
        diet_3: '',
        diet_4: '',
        diet_5: '',
        diet_6: '',
        diet_7: '',
        diet_8: '',
        diet_9: '',
      },
      dialogVisible: false,
      rules: {
        date: { required: true, message: '请选择日期', trigger: 'blur' },
        week: { required: true, message: '请选择星期', trigger: 'blur' },
      }
    };
  },
  methods: {

    insert(formname) {
      this.$refs[formname].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: '/diet/save',
            data: this.form,
            //headers: { "Authorization": sessionStorage.getItem("token") }
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

    getList() {
      this.$axios({
        method: "get",
        url: "/diet/list",
        headers: { Authorization: sessionStorage.getItem("token") },
      }).then((res) => {
        ////console.log(res.data)
        this.dietData = res.data.data;
        ////console.log(this.checkinData[0])
      });
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
  //  watch: {
  //   'form.diet_id': {
  //     handler: function () {
  //       //do something
  //       ////console.log(this.form.c_id);
  //     },
  //   }
  // },
  created() {
    this.getList();
  },
};
</script>

<style scoped>
</style>