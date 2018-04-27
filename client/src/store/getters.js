export default {
  getFace: state => {
    return state.face;
  },
  getCredits: state => {
    return state.credits;
  },
  getMessage: state => {
    return state.msg;
  },
  getSymbolMap: state => {
    return state.symbolMap;
  },
  canBet: state => {
    return state.canBet;
  },
  getTrivia: state => {
    return {question: state.question, correctResponse: state.correctResponse,
      incorrectResponse: state.incorrectResponse};
  },
  shouldShowTrivia: state => {
    return state.showDialog;
  }
}
