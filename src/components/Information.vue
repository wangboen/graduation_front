<template>
    <div id="Information">
      <el-row>
        <el-col :span="16" :offset="4">
          <h1>专利ID ： {{ msg['id'] }}</h1>
          <h1>专利名称 ： {{ msg['name'] }}</h1>
          <h1>专利申请号 ： {{ msg['UID'] }}</h1>
          <h1>专利所有人 ： {{ msg['owner'] }}</h1>
          <h1>专利发明人 ： {{ msg['inventor'] }}</h1>
          <h1>专利详情 ： {{ msg['content'] }}</h1>
        </el-col>
      </el-row>
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
        content: null
      }
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
  }
}
</script>

<style scoped>
  #Information{
    background: #f5f6f7;
    text-align: left;
  }
  h1, h2 {
    font-weight: normal;
  }
</style>
