<template>
  <div>
    <el-row>
      <el-col :span = "6" class="space">.</el-col>
      <el-col :span = "2">{{credits}} credits</el-col>
      <el-col :span = "8">{{msg}}</el-col>
      <el-col :span = "2">
        <el-button-group>
          <el-button @click = "play">
            {{playText}}
          </el-button>
        </el-button-group>
      </el-col>
      <el-col :span = "6" class="space">.</el-col>
    </el-row>
  </div>
</template>

<script>
  export default{
    props: {
      credits: {
        type: Number,
        default: 20
      },
      msg: {
        type: String,
        default: "Good luck!"
      },
      canBet: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      play(){
        if(this.playText == "Bet 1") {
          this.$emit("playEvent");
        }
        else {
          this.$emit("specialEvent");
        }
      }
    },
    computed: {
      playText() {
        if(this.canBet) {
          return "Bet 1";
        }
        else {
          return "Play Game";
        }
      }
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
