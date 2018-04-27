<template>
  <div class="hello">
    <attract />
    <p />
    <face :symbols = "symbols" :symbolMap = "symbolMap" />
    <p />
    <panel @playEvent = "bet" @specialEvent = "playTrivia" :credits = "credits" :msg = "msg" :canBet = "canBet" />
    <gameSaver @answerEvent = "resolve" :visibility = "showTrivia" :trivia = "this.$store.getters.getTrivia" />
  </div>
</template>

<script>
import face from './face'
import panel from './panel'
import attract from './attract'
import gameSaver from './gameSaver'
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  methods: {
    bet() {
      console.log('bet')
      this.$store.dispatch('placeBet');
      setTimeout(() => {
        this.$store.dispatch('getSpin');
        this.$store.dispatch('getPrize', this.$store.getters.getFace);
      }, 800)
    },
    playTrivia() {
      console.log('glass', this.trivia)
      this.$store.dispatch('getTrivia')
    },
    resolve(answeredCorrectly) {
      console.log('resolve ',answeredCorrectly)
      if(answeredCorrectly) {
        this.$store.dispatch("award", 20);
      }
      else {
        this.$store.dispatch("getTrivia");
      }
    }
  },
  computed: {
    symbols() {
      return this.$store.getters.getFace;
    },
    credits() {
      return this.$store.getters.getCredits;
    },
    msg() {
      return this.$store.getters.getMessage;
    },
    symbolMap() {
      return this.$store.getters.getSymbolMap;
    },
    canBet() {
      return this.$store.getters.canBet;
    },
    trivia() {
      return this.$store.getters.getTrivia;
    },
    showTrivia() {
      return this.$store.getters.shouldShowTrivia;
    }
  },
  components: {
    face,
    panel,
    attract,
    gameSaver
  },
  mounted() {
    this.$store.dispatch('getNewFace', 3);
    this.$store.dispatch('loadGame');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
