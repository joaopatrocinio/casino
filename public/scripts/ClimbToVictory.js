class ClimbToVictory {
    constructor(bet) {
        this.bet = bet;
        this.choices = [];
        this.startGame();
    }

    startGame() {
        fetch('/games/climbtovictory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this)
        })
        .then(res =>  {
            return res.json()
        })
        .then(response => {
            Casino.updateInfo(response);
        })
        .catch(err => {
            console.log(err)
        });
    }

    static climb(choice) {
        fetch('/games/climbtovictory/climb', {method: 'POST'})
        .then(res =>  {
            return res.json()
        })
        .then(response => {
            if (response == true) {
                window.currentGame.choices.push(choice);
                localStorage.setItem("currentGame", JSON.stringify(window.currentGame));
                window.location.reload();
            }
            else {
                alert("You lost.");
                window.location.reload();
            }
        })
        .catch(err => {
            console.log(err)
        });
    }
}

window.addEventListener('load', function () {

    if (!this.document.getElementById("game")) {
        this.localStorage.removeItem("currentGame");
    }

    if (this.localStorage.getItem("currentGame")) {

        if (!this.document.getElementById("game"))
            this.window.location.reload();

        this.window.currentGame = JSON.parse(this.localStorage.getItem("currentGame"))
        let previous = document.querySelectorAll(".previous-level > td:not(.game-odd)");
        for (i = 0; i < previous.length; i++) {
            previous[i].innerText = "X";
        }

        this.console.log(previous)
        this.console.log(window.currentGame.choices)

        /*var array = Array.prototype.slice.call(previous);
        for (i = 0; i < this.window.currentGame.choices.length; i++) {
            this.console.log(i)
            array[this.window.currentGame.choices[i] - 1 + (5 * i)].innerText = "O";
        }*/
    }

    // Bet
    document.getElementById("bet-button").addEventListener("click", function () {
        let bet = document.getElementById("bet-amount-input").value;
        localStorage.setItem("currentGame", JSON.stringify(new ClimbToVictory(bet)));
        window.location.reload();
    });

    

    // Choice
    let choices = document.querySelectorAll(".current-level > td");
    for (let i = 0; i < choices.length; i++) {
        choices[i].addEventListener("click", function () {
            ClimbToVictory.climb(i);
        });
    }
})