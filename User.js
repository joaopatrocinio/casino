class User {

    constructor() {
        this.balance = 10;
    }

    static login(user, username, password) {
        if (username != "username") {
            if (password != "password") {
                return false;
            }
            return false;
        }
        user.username = username;
        return true;
    }

    static addBalance(user, balance) {
        user.balance += balance;
        return user.balance;
    }

    static subtractBalance(user, balance) {
        if (user.balance - balance >= 0)
            user.balance -= balance;
        else
            return false;

        return true;
    }

    static getBalance(user) {
        return user.balance;
    }

    static startGame(user, game, bet) {
        bet = parseFloat(bet);
        if (bet) {
            if (!user.currentGame) {
                if (User.subtractBalance(user, bet)) {
                    user.currentGame = new game(bet);
                } else {
                    throw Error("Not enough balance.");
                }
                return user.currentGame;
            } else {
                throw Error("Please finish previous game.");
            }
        } else
        {
            throw Error("Must include bet amount.");
        }
    }

    static endGame(user) {
        let odd = Math.pow(1.25, (user.currentGame.level - 1));
        let won = odd * user.currentGame.bet;
        User.addBalance(user, won);
        user.currentGame = null;
        return won;
    }
}

module.exports = User;