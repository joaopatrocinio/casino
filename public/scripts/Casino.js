class Casino {
    constructor(user) {
        this.setBalance(user.balance);
        if (user.username) this.username = user.username;
    }

    static updateInfo(data) {
        window.casino = new Casino(data);
    }

    // Will replace all info from data on the server
    static getInfo() {
        fetch("/user")
            .then(res => res.json())
            .then(response => {
                Casino.updateInfo(response);
            })
            .catch(err => {
                console.log(err)
            });
    }

    setBalance(newBalance) {
        this.balance = newBalance;
        document.getElementById("balance-field").innerHTML = (Math.round(newBalance * 100) / 100).toFixed(2) + "€";
    }

    login(username, password) {
        fetch("/user/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(res => res.json())
        .then(response => {
            window.casino = new Casino(response);
        })
        .catch(err => {
            console.log(err)
        });
    }
}