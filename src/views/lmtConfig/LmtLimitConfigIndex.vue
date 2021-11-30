<template>
  <div>
    <el-row>
      <el-form ref="form" :model="form" label-width="100px" :inline="true">
        <el-form-item label="额度类型" label-width="50px">
          <el-input v-model="form.limitType"></el-input>
        </el-form-item>
        <el-form-item label="额度名称" label-width="50px">
          <el-input v-model="form.limitTypeName"></el-input>
        </el-form-item>
        <el-form-item label="有效状态" label-width="50px">
          <el-input v-model="form.status"></el-input>
        </el-form-item>
        <el-form-item label="创建日期时间">
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
        <el-form-item label="更新日期时间">
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
        <el-form-item label="上级节点" label-width="50px">
          <el-input v-model="form.parentNo"></el-input>
        </el-form-item>
        <el-form-item label="父级节点" label-width="50px">
          <el-input v-model="form.parents"></el-input>
        </el-form-item>
        <el-form-item label="子节点" label-width="50px">
          <el-input v-model="form.children"></el-input>
        </el-form-item>
        <el-form-item label="额度规则" label-width="50px">
          <el-input v-model="form.limitRole"></el-input>
        </el-form-item>
        <el-form-item label="额度有效期" label-width="50px">
          <el-input v-model="form.limitOfValidity"></el-input>
        </el-form-item>
        <el-form-item label="还款日方式，支持多种" label-width="50px">
          <el-input v-model="form.enableFixedDate"></el-input>
        </el-form-item>
        <el-form-item label="外部失效日期" label-width="50px">
          <el-input v-model="form.limitOfExternalValidity"></el-input>
        </el-form-item>
        <el-form-item label="创建人员编号" label-width="50px">
          <el-input v-model="form.createUser"></el-input>
        </el-form-item>
        <el-form-item label="修改人员编号" label-width="50px">
          <el-input v-model="form.updateUser"></el-input>
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
        <el-table-column prop="limitType" label="额度类型" sortable></el-table-column>
        <el-table-column prop="limitTypeName" label="额度名称" sortable></el-table-column>
        <el-table-column prop="status" label="有效状态" sortable></el-table-column>
        <el-table-column prop="createDatetime" label="创建日期时间" sortable></el-table-column>
        <el-table-column prop="updateDatetime" label="更新日期时间" sortable></el-table-column>
        <el-table-column prop="parentNo" label="上级节点" sortable></el-table-column>
        <el-table-column prop="parents" label="父级节点" sortable></el-table-column>
        <el-table-column prop="children" label="子节点" sortable></el-table-column>
        <el-table-column prop="limitRole" label="额度规则" sortable></el-table-column>
        <el-table-column prop="limitOfValidity" label="额度有效期" sortable></el-table-column>
        <el-table-column prop="enableFixedDate" label="还款日方式，支持多种" sortable></el-table-column>
        <el-table-column prop="limitOfExternalValidity" label="外部失效日期" sortable></el-table-column>
        <el-table-column prop="createUser" label="创建人员编号" sortable></el-table-column>
        <el-table-column prop="updateUser" label="修改人员编号" sortable></el-table-column>
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
    <LmtLimitConfigEdit ref="lmtLimitConfigEdit" @processSuccess="listData()"/>

  </div>
</template>

<script>
// @ is an alias to /src
import apiUtil from "@/libs/apiUtil"
import dateUtil from "@/libs/dateUtil"
import LmtLimitConfigEdit from "./LmtLimitConfigEdit.vue"

export default {
  name: 'LmtLimitConfigIndex',
  components: {
    LmtLimitConfigEdit
},
  data() {
    return {
      tableData: [],
      ids: [],
      form: {
        limitTypeLe: "",
        limitTypeNameLe: "",
        statusLe: "",
        createDatetimeGe: "",
        createDatetimeLe: "",
        updateDatetimeGe: "",
        updateDatetimeLe: "",
        parentNoLe: "",
        parentsLe: "",
        childrenLe: "",
        limitRoleLe: "",
        limitOfValidityLe: "",
        enableFixedDateLe: "",
        limitOfExternalValidityLe: "",
        createUserLe: "",
        updateUserLe: "",
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
        message: '查看ID:' + JSON.stringify(row.limitType),
        duration: 3000
      })
    },
    handleAdd() {
      this.$nextTick(()=>{
        this.$refs.lmtLimitConfigEdit.openDialogVisiable()
      })
    },
    handleEdit(row) {
      this.$message({
        message: '编辑ID:' + JSON.stringify(row.limitType),
        duration: 3000
      })
      this.$nextTick(()=>{
        this.$refs.lmtLimitConfigEdit.openDialogVisiable(row.limitType)
      })
    },
    handleDelete(row) {
      this.$message({
        message: '删除ID:' + JSON.stringify(row.limitType),
        duration: 3000
      })
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        apiUtil.ajax.delete("/lmtLimitConfig/" + row.limitType)
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
        apiUtil.ajax.delete("/lmtLimitConfig/" + this.ids)
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
      this.ids = selection.map(t => t.limitType)
    },
    onSelectAll(selection) {
      this.ids = selection.map(t => t.limitType)
    },
    listData() {
      apiUtil.ajax.post("/lmtLimitConfig/list",
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
