<template>
  <div>
    <el-row>
      <el-col :span = "6" class = "space">.</el-col>
      <el-col :span = "12">
        {{hotdog}}
      </el-col>
      <el-col :span = "6" class = "space">.</el-col>
    </el-row>
  </div>
</template>

<script>
export default{
  props: {
    hotdog: {
      type: String,
      default: "Lucky Kittens"
    },
  },
  methods: {

  }
}
</script>

<style scoped>
  .el-col {
    background: #f0f0f0;
    height: 42px;
    border-radius: 10px;
    line-height: 42px;
  }
  .space {
    background: white;
    color: white;
  }
</style>
