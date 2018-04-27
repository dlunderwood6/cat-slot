var failureMessage = 'Not enough money!';
export default{
  spinReels(state) {
    if(state.msg !== failureMessage){
      state.face.length = 0;
      state.face.push('spin', 'spin', 'spin');
    }
  },
  setNewFace(state, reels) {
    if(state.msg !== failureMessage){
      state.face.length = 0;
      for(var i = 0; i < reels; i++){
        var reelstrip = state.reelstrips[i];
        state.face.push(reelstrip[Math.floor(Math.random() * reelstrip.length)]);
      }
    }
  },
  updateCreditAmount(state, credits) {
    if(credits == 0) {
      state.msg = failureMessage;
      state.canBet = false;
    }
    else {
      state.canBet = true;
      state.showDialog = false;
      state.credits += credits;
    }
  },
  awardPrize(state, symbol) {
    var prize = state.prizes[symbol];
    console.log('award ', prize, ' credits...')
    state.credits += prize;
    state.msg = (prize + ' credits awarded');
  },
  updateMessage(state, prize) {
    state.msg = (prize + ' credits awarded');
  },
  loadGame(state, game) {
    console.log('loading game...');
    state.reelstrips = game.reelstrips;
    state.symbolMap = game.symbolMap;
    state.prizes = game.prizes;
    state.credits = game.state.credits;
    console.log(game)
  },
  toggleEnableBet(state, status) {
    state.canBet = status;
  },
  showTrivia(state, {question, correctResponse, incorrectResponse}) {
    console.log('mutation show trivia')
    state.question = question;
    state.correctResponse = correctResponse;
    state.incorrectResponse = incorrectResponse;
    state.showDialog = true;
  }
}
