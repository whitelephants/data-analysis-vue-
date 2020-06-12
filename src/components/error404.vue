<template>
  <div>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6"><span>建设中</span></el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="12"><img src="../static/images/404.jpg"/></el-col>
    </el-row>
</div>
</template>

<script>
export default {
    data() {
      return {
        src: '../static/images/404.jpg'
      }
    }
}
</script>

<style>

</style>