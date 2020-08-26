<template>
    <div>
        <top />
        <index/>
        <div class="main-container">
            <div class="main">
                <div class="container-fluid">
                    <h1 >新增部门</h1>
                    <hr/>
                    <form>
                        <table>
                            <tr>
                                <td>名称：</td>
                                <td><input  v-model="insertParams.name" type="text"/></td>
                                <td><span class="text-danger">*</span></td>
                            </tr>
                            <tr>
                                <td>类型：</td>
                                <td><select  v-model="insertParams.type">
                                    <option></option>
                                    <option>公司</option>
                                    <option>部门</option>
                                </select>
                                </td>
                                <td><span class="text-danger">*</span></td>
                            </tr>
                            <tr>
                                <td>电话：</td>
                                <td><input  v-model="insertParams.telephone" type="text"/></td>
                                <td><span class="text-danger">*</span></td>
                            </tr>
                            <tr>
                                <td>传真：</td>
                                <td><input v-model="insertParams.fax" type="text"/></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>描述：</td>
                                <td><input v-model="insertParams.description" type="textarea"/></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>上级部门：</td>
                                <td><select v-model="insertParams.predepartment">
                                    <option></option>
                                    <option>华东区</option>
                                    <option>沈阳分公司</option>
                                    <option>财务部</option>
                                </select></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>创建日期：</td>
                                <td><input v-model="insertParams.date" ref="date" type="date"/></td>
                                <td><span class="text-danger">*</span></td>
                            </tr>
                            <tr>
                                <td colspan="3" class="text-center">
                                    <input type="button" @click="submit" value="提交"/>
                                    <input type="reset"/>
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import top from '../components/01.top'
    import index from '../components/02.index';
    export default {
        name: "insert",
        data(){
            return{
                insertParams:{
                    name:"",
                    type:"",
                    telephone:"",
                    fax:'',
                    description:'',
                    predepartment:'',
                    date:""
                }
            }
        },
        components:{
            top,
            index
        },
        methods:{
            submit(){

                this.$axios({
                    method: 'post',
                    url:'http://localhost:8081/department/save',
                    data:this.insertParams,
                    headers:{ "Authorization": localStorage.getItem("token") }
                }).then((res)=>{
                    console.log(res.data)
                    if(res.data.code != 200){
                        this.$message.error('添加失败,'+res.data.message);
                    }else{
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        });
                        this.$router.push('/department')
                    }
                    // console.log(res)
                    //this.departments = res.data.data
                    // console.log(this.departments)
                })
            }
        },
        created() {
            let date = new Date()
            let year = date.getFullYear();
            let month = date.getMonth()+1;
            let day = date.getDate();
            month = month>=10 ? month : '0'+month
            day = day>=10 ? day : '0'+day
            date = year+'-'+month+'-'+day
            this.insertParams.date = date
        }
    }
</script>

<style scoped>

</style>