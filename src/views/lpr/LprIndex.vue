<template>
  <div>
    <el-row>
      <el-form ref="form" :model="form" label-width="100px" :inline="true">
        <el-form-item label="LPR期限">
          <el-select v-model="form.lprLoanPeriod" placeholder="请选择LPR期限">
            <el-option label="请选择" value=""></el-option>
            <el-option label="一年期" :value="1"></el-option>
            <el-option label="五年期" :value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="LPR发布日期">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择开始日期"
              v-model="form.lprPublishDateGe"
              style="width: 100%"
              value-format="yyyyMMdd"
            />
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择结束日期"
              v-model="form.lprPublishDateLe"
              style="width: 100%"
              value-format="yyyyMMdd"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="LPR生效时间">
          <el-col :span="11">
            <el-date-picker
              type="datetime"
              placeholder="选择开始日期"
              v-model="form.lprEffectiveTimeGe"
              style="width: 100%"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker
              type="datetime"
              placeholder="选择结束日期"
              v-model="form.lprEffectiveTimeLe"
              style="width: 100%"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="备注" label-width="50px">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button native-type="reset" @click="onReset">重置</el-button>
          </el-form-item>
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
        <el-table-column prop="id" label="ID" sortable></el-table-column>
        <el-table-column prop="lprLoanPeriod" label="LPR期限" sortable></el-table-column>
        <el-table-column prop="lprPublishDate" label="LPR发布日期" :formatter="int2DateFormat" sortable></el-table-column>
        <el-table-column prop="lprRate" label="LPR利率"></el-table-column>
        <el-table-column prop="lprEffectiveTime" label="生效时间" sortable></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="createUser" label="创建人"></el-table-column>
        <el-table-column prop="bdCreateDatetime" label="创建时间"></el-table-column>
        <el-table-column prop="updateUser" label="更新人"></el-table-column>
        <el-table-column prop="bdUpdateDatetime" label="更新时间" sortable></el-table-column>
        <el-table-column prop="checkStatus" label="复核状态" sortable></el-table-column>
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
    <LprEdit ref="lprEdit" @processSuccess="listData()"/>

  </div>
</template>

<script>
// @ is an alias to /src
import apiUtil from "@/libs/apiUtil"
import dateUtil from "@/libs/dateUtil"
import LprEdit from "./LprEdit.vue"

export default {
  name: 'LprIndex',
  components: {
    LprEdit
},
  data() {
    return {
      tableData: [],
      ids: [],
      form: {
        lprLoanPeriod: "",
        lprPublishDateGe: "",
        lprPublishDateLe: "",
        lprEffectiveTimeGe: "",
        lprEffectiveTimeLe: "",
        remark: ""
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
      // this.openEdit = true
      this.$nextTick(()=>{
        this.$refs.lprEdit.openDialogVisiable()
      })
    },
    handleEdit(row) {
      this.$message({
        message: '编辑ID:' + JSON.stringify(row.id),
        duration: 3000
      })
      this.$nextTick(()=>{
        this.$refs.lprEdit.openDialogVisiable(row.id)
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
        apiUtil.ajax.delete("/sysLoanPrimeRateConf/" + row.id)
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
        apiUtil.ajax.delete("/sysLoanPrimeRateConf/" + this.ids)
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
      apiUtil.ajax.post("/sysLoanPrimeRateConf/list",
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
