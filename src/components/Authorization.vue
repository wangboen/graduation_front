<template>
    <div id="Authorization">
      <h1>交易申请列表</h1>
      <el-table :data="tableData" style="width: 100%" border
                :default-sort = "{prop: 'date', order: 'ascending'}">
        <el-table-column prop="id" label="授权申请号" align="center" width="100"></el-table-column>
        <el-table-column prop="name" label="专利名称" align="center" min-width="240"></el-table-column>
        <el-table-column prop="from" label="授权发起人" align="center" width="100"></el-table-column>
        <el-table-column prop="date" label="授权请求发送日期" align="center" sortable width="240"></el-table-column>
        <el-table-column prop="begin" label="授权开始时间" align="center" sortable width="180"></el-table-column>
        <el-table-column prop="end" label="授权开始时间" align="center" sortable width="180"></el-table-column>
        <el-table-column prop="amount" label="授权报价" align="center" sortable width="100"></el-table-column>
        <el-table-column label="操作" align="center" min-width="240">
          <template slot-scope="scope">
            <el-button type="success" @click="confirm(scope.row.id)">接受</el-button>
            <el-button type="danger" @click="cancel(scope.row.id)">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
</template>

<script>
export default {
  name: 'Authorization',
  data () {
    return {
      tableData: null,
      fetchData: null,
      total: 0,
      pageSize: 5,
      currentPage: 1,
      confirmForm: {
        authorization_id: null
      },
      cancelForm: {
        authorization_id: null
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
      this.tableData = this.fetchData.slice(0, this.pageSize)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.tableData = this.fetchData.slice(this.pageSize * (val - 1), this.pageSize * val)
    },
    confirm (authorization) {
      this.confirmForm.authorization_id = authorization
      this.axios
        .post('http://localhost:8080/confirmAuthorization', this.confirmForm)
        .then((response) => {
          if (response.data === 'success') {
            alert('交易完成')
            this.getData()
          }
        })
        .catch((error) => {
          alert('接受交易失败')
          console.log(error)
        })
    },
    cancel (authorization) {
      this.cancelForm.authorization_id = authorization
      this.axios
        .post('http://localhost:8080/cancelAuthorization', this.cancelForm)
        .then((response) => {
          if (response.data === 'success') {
            alert('交易取消')
            this.getData()
          }
        })
        .catch((error) => {
          alert('取消交易失败')
          console.log(error)
        })
    },
    getData () {
      if (this.$cookie.get('isLogin') !== null) {
        this.axios
          .get('http://localhost:8080/getAuthorizationList')
          .then((response) => {
            this.fetchData = response.data
            this.total = this.fetchData.length
            this.tableData = this.fetchData.slice(0, this.pageSize)
          })
      }
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped>
  #Authorization{
    margin: 0 15% 40px;
    border-left: 3px #f5f6f7 solid;
    border-right: 3px #f5f6f7 solid;
    padding: 0 20px;
    height: 100%;
  }
</style>
