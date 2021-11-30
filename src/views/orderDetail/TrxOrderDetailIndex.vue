<template>
  <div>
    <el-row>
      <el-form ref="form" :model="form" label-width="100px" :inline="true">
        <el-form-item label="账户号" label-width="50px">
          <el-input v-model="form.accNo"></el-input>
        </el-form-item>
        <el-form-item label="金额类型" label-width="50px">
          <el-input v-model="form.amtType"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-col :span="11">
            <el-date-picker
              type="datetime"
              placeholder="选择开始日期"
              v-model="form.createDatetimeGe"
              style="width: 100%"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker
              type="datetime"
              placeholder="选择结束日期"
              v-model="form.createDatetimeLe"
              style="width: 100%"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="客户号" label-width="50px">
          <el-input v-model="form.custNo"></el-input>
        </el-form-item>
        <el-form-item label="入账状态" label-width="50px">
          <el-input v-model="form.enterStatus"></el-input>
        </el-form-item>
        <el-form-item label="ID" label-width="50px">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="合同借据号" label-width="50px">
          <el-input v-model="form.orderNo"></el-input>
        </el-form-item>
        <el-form-item label="交易金额" label-width="50px">
          <el-input v-model="form.transAmt"></el-input>
        </el-form-item>
        <el-form-item label="交易码" label-width="50px">
          <el-input v-model="form.transCode"></el-input>
        </el-form-item>
        <el-form-item label="交易币种" label-width="50px">
          <el-input v-model="form.transCurrency"></el-input>
        </el-form-item>
        <el-form-item label="交易日期" label-width="50px">
          <el-input v-model="form.transDate"></el-input>
        </el-form-item>
        <el-form-item label="交易描述" label-width="50px">
          <el-input v-model="form.transDesc"></el-input>
        </el-form-item>
        <el-form-item label="借贷方向" label-width="50px">
          <el-input v-model="form.transDirection"></el-input>
        </el-form-item>
        <el-form-item label="交易流水" label-width="50px">
          <el-input v-model="form.transSeqno"></el-input>
        </el-form-item>
        <el-form-item label="交易时间" label-width="50px">
          <el-input v-model="form.transTime"></el-input>
        </el-form-item>
        <el-form-item label="更新时间">
          <el-col :span="11">
            <el-date-picker
              type="datetime"
              placeholder="选择开始日期"
              v-model="form.updateDatetimeGe"
              style="width: 100%"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker
              type="datetime"
              placeholder="选择结束日期"
              v-model="form.updateDatetimeLe"
              style="width: 100%"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button native-type="reset" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <div>
      <div style="text-align: left">
        <el-button type="success" @click="handleAdd">新增</el-button>
        <el-button type="danger" @click="handleBatchDelete">删除</el-button>
      </div>
    </div>
    <el-row style="width: 100%">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        @select="onSelect"
        @select-all="onSelectAll"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="accNo" label="账户号" sortable></el-table-column>
        <el-table-column prop="amtType" label="金额类型" sortable></el-table-column>
        <el-table-column prop="createDatetime" label="创建时间" sortable></el-table-column>
        <el-table-column prop="custNo" label="客户号" sortable></el-table-column>
        <el-table-column prop="enterStatus" label="入账状态" sortable></el-table-column>
        <el-table-column prop="id" label="ID" sortable></el-table-column>
        <el-table-column prop="orderNo" label="合同借据号" sortable></el-table-column>
        <el-table-column prop="transAmt" label="交易金额" sortable></el-table-column>
        <el-table-column prop="transCode" label="交易码" sortable></el-table-column>
        <el-table-column prop="transCurrency" label="交易币种" sortable></el-table-column>
        <el-table-column prop="transDate" label="交易日期" sortable></el-table-column>
        <el-table-column prop="transDesc" label="交易描述" sortable></el-table-column>
        <el-table-column prop="transDirection" label="借贷方向" sortable></el-table-column>
        <el-table-column prop="transSeqno" label="交易流水" sortable></el-table-column>
        <el-table-column prop="transTime" label="交易时间" sortable></el-table-column>
        <el-table-column prop="updateDatetime" label="更新时间" sortable></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope" fixed="right">
            <el-button size="small" type="text" @click="handleView(scope.row)">查看</el-button>
            <el-button size="small" type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="text" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="currentPageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalSize"
      ></el-pagination>
    </el-row>
    <TrxOrderDetailEdit ref="trxOrderDetailEdit" @processSuccess="listData()"/>

  </div>
</template>

<script>
// @ is an alias to /src
import apiUtil from "@/libs/apiUtil"
import dateUtil from "@/libs/dateUtil"
import TrxOrderDetailEdit from "./TrxOrderDetailEdit.vue"

export default {
  name: 'TrxOrderDetailIndex',
  components: {
    TrxOrderDetailEdit
},
  data() {
    return {
      tableData: [],
      ids: [],
      form: {
        accNoLe: "",
        amtTypeLe: "",
        createDatetimeGe: "",
        createDatetimeLe: "",
        custNoLe: "",
        enterStatusLe: "",
        idLe: "",
        orderNoLe: "",
        transAmt: "",
        transCodeLe: "",
        transCurrencyLe: "",
        transDate: "",
        transDescLe: "",
        transDirection: "",
        transSeqnoLe: "",
        transTimeLe: "",
        updateDatetimeGe: "",
        updateDatetimeLe: "",
      },
      currentPage: 1,
      currentPageSize: 10,
      totalSize: 0,
      openEdit: false
    }
  },
  methods: {
    onSubmit() {
      this.$message({
        message: '查询条件:' + JSON.stringify(this.form),
        duration: 3000
      })
      this.listData()
    },
    onReset() {
      this.form = {}
    },
    int2DateFormat(row, column, cellValue, index) {
      return dateUtil.int2DateFormat(cellValue, row, column, index)
    },
    handleCurrentChange(pageNo){
      this.currentPage = pageNo
      this.listData()
    },
    handleSizeChange(pageSize){
      this.currentPageSize = pageSize
      this.listData()
    },
    handleView(row) {
      this.$message({
        message: '查看ID:' + JSON.stringify(row.id),
        duration: 3000
      })
    },
    handleAdd() {
      this.$nextTick(()=>{
        this.$refs.trxOrderDetailEdit.openDialogVisiable()
      })
    },
    handleEdit(row) {
      this.$message({
        message: '编辑ID:' + JSON.stringify(row.id),
        duration: 3000
      })
      this.$nextTick(()=>{
        this.$refs.trxOrderDetailEdit.openDialogVisiable(row.id)
      })
    },
    handleDelete(row) {
      this.$message({
        message: '删除ID:' + JSON.stringify(row.id),
        duration: 3000
      })
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        apiUtil.ajax.delete("/trxOrderDetail/" + row.id)
          .then((res) => {
            console.log(res)
            if(res.status == 200 && res.data.code == "10000"){
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.listData()
            }else{
              this.$message({
                type: 'error',
                message: '删除失败!'
              })
            }
          }).catch((e) => {
            this.$message({
              type: 'error',
              message: '请求异常：' + e
            })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleBatchDelete() {
      this.$message({
        message: '删除ID:' + JSON.stringify(this.ids),
        duration: 3000
      })
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        apiUtil.ajax.delete("/trxOrderDetail/" + this.ids)
          .then((res) => {
            console.log(res.data)
            if(res.status == 200 && res.data.code == "10000"){
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.listData()
            }else{
              this.$message({
                type: 'error',
                message: '删除失败!'
              })
            }
          }).catch((e) => {
            this.$message({
              type: 'error',
              message: '请求异常：' + e
            })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    onSelect(selection) {
      this.ids = selection.map(t => t.id)
    },
    onSelectAll(selection) {
      this.ids = selection.map(t => t.id)
    },
    listData() {
      apiUtil.ajax.post("/trxOrderDetail/list",
        {
          pageNo: this.currentPage,
          pageSize: this.currentPageSize,
          condition: this.form
        }
      ).then((res) => {
        console.log(res)
        this.tableData = res.data.data.records
        this.totalSize = res.data.data.total
      }).catch((e) => {
        this.$message({
          type: 'error',
          message: '请求异常：' + e
        })
      })
    }
  },
  created() {
    this.listData()
  }
}

</script>
