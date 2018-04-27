import sqlite3 from 'sqlite3';
sqlite3.verbose();

const updateDatabase = (...command) => {
    var db = new sqlite3.Database('slot');
    db.serialize(() => {
        var statement = db.prepare(command[0]);
        var args = Array.prototype.slice.call(command, 1);
        statement.run(args);
        statement.finalize();
    });
    db.close();
}

const getReelStrips = () => {
  var db = new sqlite3.Database('slot');
  var reelstrips = [];
  var promise = new Promise((resolve, reject) => {
    db.each("select * from reelstrips", (err, row) => {
      if(reelstrips[row.reel] == undefined){
        reelstrips[row.reel] = [];
      }
      reelstrips[row.reel].push(row.symbol);
    }, (err, n) => {
      resolve(reelstrips);
      db.close();
    });
  });
  return promise;
};
const getSymbolMap = () => {
  var db = new sqlite3.Database('slot');
  var symbolMap = {};
  var promise = new Promise((resolve, reject) => {
    db.each("select * from symbolImages", (err, row) => {
      symbolMap[row.Symbol] = row.Image;
    }, (err, n) => {
      resolve(symbolMap);
      db.close();
    });
  });
  return promise;
};
const getGameState = () => {
  var db = new sqlite3.Database('slot');
  var state = {};
  var promise = new Promise((resolve, reject) => {
    db.each("select * from state", (err, row) => {
      state[row.property] = row.val;
    }, (err, n) => {
      resolve(state);
      db.close();
    });
  });
  return promise;
};
const getPrizes = () => {
  var db = new sqlite3.Database('slot');
  var state = {};
  var promise = new Promise((resolve, reject) => {
    db.each("select * from prizes", (err, row) => {
      state[row.symbol] = row.prize;
    }, (err, n) => {
      resolve(state);
      db.close();
    });
  });
  return promise;
};
const getOriginalCredits = (db) => {
  var promise = new Promise((resolve, reject) => {
    var originalCredits = 0;
    db.get("select cast(val as integer) from state where property = 'credits'", (err, row) => {
      originalCredits = row['cast(val as integer)'];
      resolve(originalCredits);
    });
  })
  return promise;
};
export const getGame = () => {
  var game = {};
  var promise = new Promise((resolve, reject) => {
    Promise.all([getReelStrips(), getSymbolMap(), getGameState(), getPrizes()]).
    then(([reelstrips, symbolMap, state, prizes]) => {
      game.reelstrips = reelstrips;
      game.symbolMap = symbolMap;
      game.state = state;
      game.prizes = prizes;
      resolve(game);
    }).
    catch((err) => {
      console.log(err)
    });
  });
  return promise;
};
export const saveCreditAmount = (credits) => {
  var db = new sqlite3.Database('slot');
  var promise = new Promise((resolve, reject) => {
    getOriginalCredits(db).then((ret) => {
      var totalCredits = ret + credits;
      db.run("update state set val = " + totalCredits + " where property = 'credits'");
      var canBet = true;
      if(totalCredits < 1) {
        canBet = false;
        db.run("update state set val = 'false' where property = 'canBet'");
      }
      resolve({credits: credits, canBet: canBet});
    })
  });
  db.close();
  return promise;
}
