<template>
  <div id="Transaction">
    <h1>交易申请列表</h1>
    <el-table :data="tableData" style="width: 100%" border
              :default-sort = "{prop: 'date', order: 'ascending'}">
      <el-table-column prop="id" label="交易申请号" align="center" width="100"></el-table-column>
      <el-table-column prop="name" label="专利名称" align="center" min-width="240"></el-table-column>
      <el-table-column prop="from" label="交易发起人" align="center" width="100"></el-table-column>
      <el-table-column prop="date" label="交易请求发送日期" align="center" sortable width="240"></el-table-column>
      <el-table-column prop="amount" label="交易报价" align="center" sortable width="100"></el-table-column>
      <el-table-column label="操作" align="center" min-width="240">
        <template slot-scope="scope">
          <el-button type="success" @click="confirm(scope.row.id,scope.row.name,scope.row.amount)">接受</el-button>
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
  name: 'Transaction',
  data () {
    return {
      tableData: null,
      fetchData: null,
      total: 0,
      pageSize: 5,
      currentPage: 1,
      confirmForm: {
        order_id: null,
        patent_name: null,
        amount: null
      },
      cancelForm: {
        order_id: null
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
    confirm (order, patent, amount) {
      this.confirmForm.order_id = order
      this.confirmForm.patent_name = patent
      this.confirmForm.amount = amount
      this.axios
        .post('http://localhost:8080/confirmTransaction', this.confirmForm)
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
    cancel (order) {
      this.cancelForm.order_id = order
      this.axios
        .post('http://localhost:8080/cancelTransaction', this.cancelForm)
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
          .get('http://localhost:8080/getTransactionList')
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
  #Transaction{
    margin: 0 15% 40px;
    border-left: 3px #f5f6f7 solid;
    border-right: 3px #f5f6f7 solid;
    padding: 20px;
    min-height: 840px;
  }
</style>
