<template>
  <div id="Information">
    <div class="content">
      <h1>{{msg.name}}</h1>
      <p>    专利ID ： {{msg.id}}</p>
      <p>    专利申请号 ： {{msg.UID}}</p>
      <p>    专利所有人 ： <a @click="message">{{msg.owner}}</a></p>
      <p>    专利发明人 ： {{msg.inventor}}</p>
      <p>    专利详情 ： {{msg.content}}</p>
      <img v-bind:src="msg.upload" alt="" width="400px" height="300px"/>
    </div>

    <h1>历史交易记录</h1>
    <el-table :data="tableData1" style="width: 100%" border
              :default-sort = "{prop: 'date', order: 'ascending'}">
      <el-table-column prop="id" label="交易申请号" align="center"></el-table-column>
      <el-table-column prop="from" label="交易发起人" align="center"></el-table-column>
      <el-table-column prop="date" label="交易请求发送日期" align="center" sortable></el-table-column>
      <el-table-column prop="amount" label="交易报价（CNY）" align="center" sortable></el-table-column>
    </el-table>

    <el-pagination
      background
      @size-change="handleSizeChange1"
      @current-change="handleCurrentChange1"
      :current-page="currentPage1"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageSize1"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total1">
    </el-pagination>

    <h1>历史授权记录</h1>
    <el-table :data="tableData2" style="width: 100%" border
              :default-sort = "{prop: 'date', order: 'ascending'}">
      <el-table-column prop="id" label="授权申请号" align="center"></el-table-column>
      <el-table-column prop="from" label="授权发起人" align="center"></el-table-column>
      <el-table-column prop="date" label="授权请求发送日期" align="center" sortable></el-table-column>
      <el-table-column prop="begin" label="授权开始时间" align="center" sortable></el-table-column>
      <el-table-column prop="end" label="授权开始时间" align="center" sortable></el-table-column>
      <el-table-column prop="amount" label="授权报价" align="center" sortable></el-table-column>
    </el-table>

    <el-pagination
      background
      @size-change="handleSizeChange2"
      @current-change="handleCurrentChange2"
      :current-page="currentPage2"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageSize2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total2">
    </el-pagination>

    <el-tabs tab-position="left" class="action">
      <el-tab-pane label="交易申请">
        <el-form ref="TransactionForm" :model="TransactionForm" label-width="200px">
          <el-form-item label="交易价格">
            <el-input v-model="TransactionForm.amount" label="单位为CNY"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="TransactionSubmit">提交申请</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="授权许可申请">
        <el-form ref="AuthorizationForm" :model="AuthorizationForm" label-width="200px">
          <el-form-item label="授权许可价格">
            <el-input v-model="AuthorizationForm.amount" label="单位为CNY"></el-input>
          </el-form-item>
          <el-form-item label="授权许可开始时间">
            <el-date-picker type="date" v-model="AuthorizationForm.begin" value-format=" yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="授权许可结束时间">
            <el-date-picker type="date" v-model="AuthorizationForm.end" value-format=" yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="AuthorizationSubmit">提交申请</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <div class="flow">
      <h1>交易流程</h1>
      <img src="http://localhost:80/flow.png" alt="" width="100%" height="100%"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Information',
  data () {
    return {
      msg: {
        id: null,
        name: null,
        UID: null,
        owner: null,
        inventor: null,
        content: null,
        upload: null
      },
      TransactionForm: {
        amount: null
      },
      AuthorizationForm: {
        amount: null,
        begin: null,
        end: null
      },
      tableData1: null,
      fetchData1: null,
      total1: 0,
      pageSize1: 5,
      currentPage1: 1,
      tableData2: null,
      fetchData2: null,
      total2: 0,
      pageSize2: 5,
      currentPage2: 1
    }
  },
  created () {
    this.axios
      .post('http://localhost:8080/info', {
        UID: 'CN201210309671.7'
      })
      .then(response => (
        this.msg = response.data
      ))
      .catch(errmessages => (
        console.log(errmessages)
      ))
    this.getAuthorizationData()
    this.getTransactionData()
  },
  methods: {
    TransactionSubmit () {
      let transaction = this.TransactionForm
      this.axios
        .post('http://localhost:8080/transaction', transaction)
        .then((response) => {
          if (response.data === 'success') {
            this.TransactionForm.amount = ''
            alert('申请发送成功')
          } else if (response.data === 'failed') {
            alert('申请发送失败')
          }
        })
        .catch((error) => {
          alert('申请发送失败')
          console.log(error)
        })
    },
    AuthorizationSubmit () {
      let authorization = this.AuthorizationForm
      this.axios
        .post('http://localhost:8080/authorization', authorization)
        .then((response) => {
          if (response.data === 'success') {
            this.AuthorizationForm.amount = null
            this.AuthorizationForm.begin = null
            this.AuthorizationForm.end = null
            alert('申请发送成功')
          } else if (response.data === 'failed') {
            alert('申请发送失败')
          }
        })
        .catch((error) => {
          alert('申请发送失败')
          console.log(error)
        })
    },
    message () {
      this.$router.push({
        path: '/message',
        query: {
          id: this.msg.id,
          name: this.msg.owner
        }
      })
    },
    getTransactionData () {
      this.axios
        .post('http://localhost:8080/transactionlist', {
          UID: 'CN201210309671.7'
        })
        .then((response) => {
          this.fetchData1 = response.data
          this.total1 = this.fetchData1.length
          this.tableData1 = this.fetchData1.slice(0, this.pageSize1)
        })
        .catch(errmessages => (
          console.log(errmessages)
        ))
    },
    handleSizeChange1 (val) {
      this.pageSize1 = val
      this.currentPage1 = 1
      this.tableData1 = this.fetchData1.slice(0, this.pageSize1)
    },
    handleCurrentChange1 (val) {
      this.currentPage1 = val
      this.tableData1 = this.fetchData1.slice(this.pageSize1 * (val - 1), this.pageSize1 * val)
    },
    getAuthorizationData () {
      this.axios
        .post('http://localhost:8080/authorizationlist', {
          UID: 'CN201210309671.7'
        })
        .then((response) => {
          this.fetchData2 = response.data
          this.total2 = this.fetchData2.length
          this.tableData2 = this.fetchData2.slice(0, this.pageSize2)
        })
        .catch(errmessages => (
          console.log(errmessages)
        ))
    },
    handleSizeChange2 (val) {
      this.pageSize2 = val
      this.currentPage2 = 1
      this.tableData2 = this.fetchData2.slice(0, this.pageSize2)
    },
    handleCurrentChange2 (val) {
      this.currentPage2 = val
      this.tableData2 = this.fetchData2.slice(this.pageSize2 * (val - 1), this.pageSize2 * val)
    }
  }
}
</script>

<style scoped>
  #Information{
    margin: 0 15% 40px;
    border-left: 3px #f5f6f7 solid;
    border-right: 3px #f5f6f7 solid;
    padding: 0 20px;
    height: 100%;
    text-align: left;
  }
  p{
    font-size: 16px;
    line-height: 20px;
    color: #333;
  }
  .content{
    padding: 50px 20px;
  }
  .action{
    border-top: #f5f6f7 3px solid;
    border-bottom: #f5f6f7 3px solid;
    padding: 50px;
  }
  .flow{
    padding: 50px 20px;
    height: 300px;
  }
</style>
