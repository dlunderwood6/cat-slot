<template>
  <div>
    <el-row>
      <el-col :span="6"><div class="space">.</div></el-col>
      <reel :symbolSrc = "symbol(0)" :reel = "0" />
      <reel :symbolSrc = "symbol(1)" :reel = "1" />
      <reel :symbolSrc = "symbol(2)" :reel = "2" />
      <el-col :span="6"><div class="space">.</div></el-col>
    </el-row>
  </div>
</template>

<script>
import reel from "./reel"

export default {
  props: {
    symbols: {
      type: Array,
      default: () => { return ['a','a','a']; }
    },
    symbolMap: {
      type: Object,
      default: () => { return {a: 'https://placekitten.com/1/1'}; }
    }
  },
  data(){
    return {
    }
  },
  methods: {
    symbol(reel) {
      return this.symbolMap[this.symbols[reel]];
    }
  },
  components: {
    reel,
  }
}
</script>

<style>
  .space {
    color: white;
  }
  .el-row {
    text-align: center;
    vertical-align: middle;
  }
</style>
