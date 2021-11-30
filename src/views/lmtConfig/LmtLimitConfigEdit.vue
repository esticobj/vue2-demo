<template>
  <el-dialog title="新增/编辑" :visible.sync="dialogTableVisible">
    <div>
      <el-row style="text-align: center">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="额度名称">
            <el-input v-model="form.limitTypeName"></el-input>
          </el-form-item>
          <el-form-item label="有效状态">
            <el-input v-model="form.status"></el-input>
          </el-form-item>
          <el-form-item label="创建日期时间">
            <el-date-picker
              type="datetime"
              placeholder="选择日期时间"
              v-model="form.createDatetime"
              style="width: 100%"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
          <el-form-item label="更新日期时间">
            <el-date-picker
              type="datetime"
              placeholder="选择日期时间"
              v-model="form.updateDatetime"
              style="width: 100%"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
          <el-form-item label="上级节点">
            <el-input v-model="form.parentNo"></el-input>
          </el-form-item>
          <el-form-item label="父级节点">
            <el-input v-model="form.parents"></el-input>
          </el-form-item>
          <el-form-item label="子节点">
            <el-input v-model="form.children"></el-input>
          </el-form-item>
          <el-form-item label="额度规则">
            <el-input v-model="form.limitRole"></el-input>
          </el-form-item>
          <el-form-item label="额度有效期">
            <el-input v-model="form.limitOfValidity"></el-input>
          </el-form-item>
          <el-form-item label="还款日方式，支持多种">
            <el-input v-model="form.enableFixedDate"></el-input>
          </el-form-item>
          <el-form-item label="外部失效日期">
            <el-input v-model="form.limitOfExternalValidity"></el-input>
          </el-form-item>
          <el-form-item label="创建人员编号">
            <el-input v-model="form.createUser"></el-input>
          </el-form-item>
          <el-form-item label="修改人员编号">
            <el-input v-model="form.updateUser"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button type="info" @click="onCancel">取消</el-button>
            <el-button native-type="reset" @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
// @ is an alias to /src
import apiUtil from "@/libs/apiUtil"
// import dateUtil from "@/libs/dateUtil"

export default {
  name: 'LmtLimitConfigEdit',
  components: {

  },
  data() {
    return {
      tableData: [],
      form: {
        limitType: "",
        limitTypeName: "",
        status: "",
        createDatetime: "",
        updateDatetime: "",
        parentNo: "",
        parents: "",
        children: "",
        limitRole: "",
        limitOfValidity: "",
        enableFixedDate: "",
        limitOfExternalValidity: "",
        createUser: "",
        updateUser: "",
      },
      currentPage: 1,
      currentPageSize: 10,
      totalSize: 0,
      dialogTableVisible: false
    }
  },
  methods: {
    onSubmit() {
      this.$message({
        message: '提交数据:' + JSON.stringify(this.form),
        duration: 3000
      })
      this.saveData()
    },
    onCancel(){
      this.dialogTableVisible = false
    },
    onReset() {
      this.form = {}
    },
    openDialogVisiable(limitType) {
      this.dialogTableVisible = true
      if(limitType){
        this.form.limitType = limitType
        this.getData()
      }else{
        this.form={}
      }
    },
    getData() {
      apiUtil.ajax.get("/lmtLimitConfig/" + this.form.limitType).then((res) => {
        console.log(res)
        if(res.status == 200 && res.data.code == "10000" && res.data.data){
          res.data.data.createDatetime = String(res.data.data.createDatetime)
          res.data.data.updateDatetime = String(res.data.data.updateDatetime)
          this.form = res.data.data
        }else{
          this.form={}
          this.$message({
            type: 'warning',
            message: '数据不存在'
          })
        }
      })
    },
    saveData(){
      if(this.form.limitType){
        apiUtil.ajax.put("/lmtLimitConfig/", this.form).then((res) => {
          console.log(res)
          if(res.status == 200 && res.data.code == "10000"){
            this.dialogTableVisible = false
            this.$message({
              type: 'success',
              message: '更新成功'
            })
            this.$emit('processSuccess')
          }else{
            this.$message({
              type: 'error',
              message: '更新失败：'
            })
          }
        }).catch((e) => {
          this.$message({
            type: 'error',
            message: '请求异常：' + e
          })
        })
      }else{
        apiUtil.ajax.post("/lmtLimitConfig/", this.form).then((res) => {
          console.log(res)
          if(res.status == 200 && res.data.code == "10000"){
            this.dialogTableVisible = false
            this.$message({
              type: 'success',
              message: '新增成功'
            })
            this.$emit('processSuccess')
          }else{
            this.$message({
              type: 'error',
              message: '新增失败'
            })
          }
        }).catch((e) => {
          this.$message({
            type: 'error',
            message: '请求异常：' + e
          })
        })
      }
    }
  },
  created() {
  }
}

</script>
