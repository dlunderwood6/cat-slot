import express from 'express'
import bodyParser from 'body-parser'
import {getGame, saveCreditAmount} from './database'

var router = express.Router();
router.use(bodyParser.json());

var game = [];

router.get('/loadGame', (req, res) => {
  console.log('in api, load game...')
  getGame().then((ret) => {
    game = ret;
    game.state.credits = parseInt(game.state.credits);
    game.state.canBet = game.state.canBet == 'true';
    console.log('game ', game)
    res.send(ret);
  });
})

router.post('/updateCreditAmount', (req, res) => {
  var change = req.body.credits;
  if(change > 0 || game.state.credits >= Math.abs(change)) {
    saveCreditAmount(change).then(({credits, canBet}) => {
      game.state.credits += credits;
      game.state.canBet = canBet;
      res.send({credits: credits, canBet: game.state.canBet});
   });
  }
  else {
    res.send({credits: 0});
  }
})

router.post('/awardPrize', (req, res) => {
  var change = req.body.value;
  if(change === undefined) {
    change = game.prizes[req.body.symbol];
  }
  if(change > 0 || game.state.credits >= Math.abs(change))
  {
    saveCreditAmount(change).then(({credits, canBet}) => {
      game.state.credits += credits;
      game.state.canBet = canBet;
      res.send({credits: credits, canBet: game.state.canBet});
   });
  }
})

export default router;
