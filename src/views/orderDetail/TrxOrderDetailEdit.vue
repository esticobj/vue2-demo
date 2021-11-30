<template>
  <el-dialog title="新增/编辑" :visible.sync="dialogTableVisible">
    <div>
      <el-row style="text-align: center">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="账户号">
            <el-input v-model="form.accNo"></el-input>
          </el-form-item>
          <el-form-item label="金额类型">
            <el-input v-model="form.amtType"></el-input>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              type="datetime"
              placeholder="选择日期时间"
              v-model="form.createDatetime"
              style="width: 100%"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
          <el-form-item label="客户号">
            <el-input v-model="form.custNo"></el-input>
          </el-form-item>
          <el-form-item label="入账状态">
            <el-input v-model="form.enterStatus"></el-input>
          </el-form-item>
          <el-form-item label="合同借据号">
            <el-input v-model="form.orderNo"></el-input>
          </el-form-item>
          <el-form-item label="交易金额">
            <el-input v-model="form.transAmt"></el-input>
          </el-form-item>
          <el-form-item label="交易码">
            <el-input v-model="form.transCode"></el-input>
          </el-form-item>
          <el-form-item label="交易币种">
            <el-input v-model="form.transCurrency"></el-input>
          </el-form-item>
          <el-form-item label="交易日期">
            <el-input v-model="form.transDate"></el-input>
          </el-form-item>
          <el-form-item label="交易描述">
            <el-input v-model="form.transDesc"></el-input>
          </el-form-item>
          <el-form-item label="借贷方向">
            <el-input v-model="form.transDirection"></el-input>
          </el-form-item>
          <el-form-item label="交易流水">
            <el-input v-model="form.transSeqno"></el-input>
          </el-form-item>
          <el-form-item label="交易时间">
            <el-input v-model="form.transTime"></el-input>
          </el-form-item>
          <el-form-item label="更新时间">
            <el-date-picker
              type="datetime"
              placeholder="选择日期时间"
              v-model="form.updateDatetime"
              style="width: 100%"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
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
  name: 'TrxOrderDetailEdit',
  components: {

  },
  data() {
    return {
      tableData: [],
      form: {
        accNo: "",
        amtType: "",
        createDatetime: "",
        custNo: "",
        enterStatus: "",
        id: "",
        orderNo: "",
        transAmt: "",
        transCode: "",
        transCurrency: "",
        transDate: "",
        transDesc: "",
        transDirection: "",
        transSeqno: "",
        transTime: "",
        updateDatetime: "",
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
      apiUtil.ajax.get("/trxOrderDetail/" + this.form.id).then((res) => {
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
      if(this.form.id){
        apiUtil.ajax.put("/trxOrderDetail/", this.form).then((res) => {
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
        apiUtil.ajax.post("/trxOrderDetail/", this.form).then((res) => {
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
