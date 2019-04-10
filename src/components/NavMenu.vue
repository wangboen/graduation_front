<template>
    <div id="NavMenu">
      <el-menu :default-active="this.$route.path" router mode="horizontal" @select="handleSelect"
               background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
          {{ item.navItem }}
        </el-menu-item>
      </el-menu>
    </div>
</template>

<script>
export default {
  name: 'NavMenu',
  data () {
    return {
      navList: [
        {name: '/list', navItem: '专利列表'},
        {name: '/transaction', navItem: '专利交易'},
        {name: '/authorization', navItem: '专利授权'},
        {name: '/information', navItem: '专利详情'}
      ]
    }
  }
}
</script>

<style scoped>

</style>
