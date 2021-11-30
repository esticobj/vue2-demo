<template>
  <el-dialog title="新增/编辑" :visible.sync="dialogTableVisible">
    <div class="home">
      <el-row style="text-align: center">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="LPR期限" style="text-align: left">
            <el-select v-model="form.lprLoanPeriod" placeholder="请选择LPR期限">
              <el-option label="请选择" value=""></el-option>
              <el-option label="一年期" :value="1"></el-option>
              <el-option label="五年期" :value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="LPR发布日期" >
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.lprPublishDate"
              style="width: 100%"
              value-format="yyyyMMdd"
            />
          </el-form-item>
          <el-form-item label="LPR利率">
            <el-input v-model="form.lprRate"></el-input>
          </el-form-item>
          <el-form-item label="LPR生效时间">

            <el-date-picker
              type="datetime"
              placeholder="选择日期时间"
              v-model="form.lprEffectiveTime"
              style="width: 100%"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
 
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark"></el-input>
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
  name: 'LprEdit',
  components: {

  },
  data() {
    return {
      tableData: [],
      form: {
        id: "",
        lprLoanPeriod: "",
        lprPublishDate: "",
        lprEffectiveTime: "",
        lprRate: 0,
        remark: ""
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
    openDialogVisiable(id) {
      this.dialogTableVisible = true
      if(id){
        this.form.id = id
        this.getData()
      }else{
        this.form={}
      }
    },
    getData() {
      apiUtil.ajax.get("/sysLoanPrimeRateConf/" + this.form.id).then((res) => {
        console.log(res)
        if(res.status == 200 && res.data.code == "10000" && res.data.data){
          res.data.data.lprPublishDate = String(res.data.data.lprPublishDate)
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
      console.log(this.form.lprEffectiveTime)
      // if(this.form.lprPublishDate instanceof Date){
      //   this.form.lprPublishDate = dateUtil.datetime2Int(this.form.lprPublishDate)
      // }else{
      //   this.form.lprPublishDate = dateUtil.dateFormat2Int(this.form.lprPublishDate)
      // }
      // if(this.form.lprEffectiveTime instanceof Date){
      //   this.form.lprEffectiveTime = dateUtil.datetime2Format(this.form.lprEffectiveTime)
      // }
      if(this.form.id){
        apiUtil.ajax.put("/sysLoanPrimeRateConf/", this.form).then((res) => {
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
        apiUtil.ajax.post("/sysLoanPrimeRateConf/", this.form).then((res) => {
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
