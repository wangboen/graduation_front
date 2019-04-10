<template>
    <div id="NavMenu">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
               background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="1">专利列表</el-menu-item>
        <el-menu-item index="2">专利交易</el-menu-item>
        <el-menu-item index="3">专利授权使用</el-menu-item>
      </el-menu>
    </div>
</template>

<script>
export default {
  name: 'NavMenu',
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      this.$emit('IndexChange', key)
    }
  }
}
</script>

<style scoped>

</style>
