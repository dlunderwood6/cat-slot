<template>
  <div>
    <el-dialog title = "Game saver!" :visible = "visibility" width = "50%">
      <p>{{trivia.question}}</p>
      <el-button v-for = "choice in choices" @click = "evaluate(choice)">{{choice}}</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    trivia: {
      type: Object,
      default: () => {
        return {question: "?", correctResponse: "right", incorrectResponse: ["wrong"]}
      }
    },
    visibility: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    choices() {
      if(this._props.trivia.correctResponse == undefined) {
        this._props.trivia.correctResponse = "right";
      }
      if(this._props.trivia.incorrectResponse == undefined){
        this._props.trivia.incorrectResponse = ["wrong"];
      }
      return this.shuffle([this._props.trivia.correctResponse, ...this._props.trivia.incorrectResponse]);
    }
  },
  methods: {
    evaluate(ans) {
      this.$emit("answerEvent", ans === this._props.trivia.correctResponse);
    },
    shuffle(a) {
      var unpicked = Array.from({length: a.length}, (x,i) => i);
      var b = [];
      for(var i = 0; i < a.length; i++) {
        var picked = Math.floor(Math.random() * unpicked.length);
        b.push(a[unpicked[picked]]);
        var indexToRemove = unpicked.findIndex(el => el == unpicked[picked]);
        console.log('remove ', indexToRemove)
        var half1 = unpicked.slice(0, indexToRemove);
        //console.log('half 1',half1)
        var half2 = unpicked.slice(indexToRemove + 1);
        //console.log('half 2',half2)
        unpicked = [...half1, ...half2];
        console.log(unpicked)
      }
      return b;
    }
  }
}
</script>
