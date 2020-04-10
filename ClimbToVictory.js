const Game = require('./Game.js')
const User = require('./User.js')

class ClimbToVictory extends Game {
    constructor(bet) {
        super(0.1);
        if (this.bet < this.minCost) throw Error("Bet is lower than minimum cost.");
        this.bet = bet;
        this.level = 1;
    }

    static climb(user) {
        let game = user.currentGame;
        let num = Math.random();
        let probability = (game.level % 2 != 0) ? (1 - 0.2 * game.level) : (1 - 0.2 * (game.level - 1));
        if (num < probability) {
            game.level += 1;
            return true;
        }
        else {
            user.currentGame = null;
            return user;
        }
    }
}

module.exports = ClimbToVictory;