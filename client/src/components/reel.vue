<template>
    <el-col :span = "4" class = "verticallyAligned">
      <img :src = "symbolSrc" :id = "reel" style = "opacity: 0;"/>
    </el-col>
</template>

<script>
export default {
  props: {
    symbolSrc: {
      type: String,
      default: "https://placekitten.com/299/299"
    },
    reel: {
      type: Number,
      default: -1
    }
  },
  watch: {
    symbolSrc: function (oldSrc, newSrc) {
      const reelElement = document.getElementById(this._props.reel);
      reelElement.style.opacity = "0";
      setTimeout( () => {
        var i = setInterval(function() {
          if(reelElement.style.opacity >= 1) {
            clearInterval(i);
          }
          else {
            var opacity = Number.parseFloat(reelElement.style.opacity) + .1;
            reelElement.style.opacity = "" + (opacity);
          }
        }, 10);
      }, this._props.reel * 100);
    }
  }
}
</script>

<style scoped>
  .el-col {
    text-align: center;
    background: #eeeeee;
    border-radius: 10px;
    height: 320px;
    line-height: 320px;
  }
  .verticallyAligned > * {
    vertical-align: middle;
  }
  img {
    max-width: 320px;
  }
</style>
