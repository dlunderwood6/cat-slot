import axios from 'axios'
import he from 'he'

const apiBaseURL = 'http://localhost:3000';

export default {
  getNewFace(context, reels) {
    var face = [];
    context.commit("setNewFace", reels);
  },
  placeBet(context) {
    axios.post(apiBaseURL + '/updateCreditAmount', {credits: -1}).
      then((response) => {
        context.commit('updateCreditAmount', response.data.credits);
        context.commit('toggleEnableBet', response.data.canBet);
      });
    context.commit("spinReels");
  },
  getSpin(context) {
    context.commit("setNewFace", 3)
  },
  getPrize(context, line) {
    var prize = 0;
    var same = 0;
    for(var i = 0; i < line.length; i++) {
      if(line[i] === line[0]) {
        same++;
      }
    }

    //TODO: remove duplicate updateMessage call
    if(same === line.length) {
      axios.post(apiBaseURL + '/awardPrize', {symbol: line[0]}).
        then((response) => {
          prize = response.data.credits;
          console.log(typeof prize)
          context.commit('updateCreditAmount', prize)
          context.commit("updateMessage", prize);
        });
    }
    else {
      context.commit("updateMessage", prize);
    }
  },
  loadGame(context) {
    console.log('in action, load game...')
    axios.get(apiBaseURL + '/loadGame').then((response) => {
      context.commit('loadGame', response.data)
    })
  },
  getTrivia(context) {
    axios.get('https://opentdb.com/api.php?amount=1').then((response) => {
      var result = response.data.results[0];
      console.log('action',result)

      context.commit('showTrivia', {question: he.decode(result.question),
        correctResponse: he.decode(result.correct_answer),
        incorrectResponse: result.incorrect_answers.map(ans => he.decode(ans))})
    })
  },
  award(context, value) {
    axios.post(apiBaseURL + '/awardPrize', {value: value}).
      then((response) => {
        var prize = response.data.credits;
        context.commit('updateCreditAmount', prize)
      });
  }
}
