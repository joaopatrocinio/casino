const express = require('express');
const session = require('express-session');
const cors = require('cors');
const ejs = require('ejs');
const app = express();
const path = require('path');
const port = 4422;

app.use(cors())

const User = require('./User.js');
const ClimbToVictory = require('./ClimbToVictory.js')

require('dotenv').config()

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Initialize user on first request
app.use(function(req, res, next){
    if(!req.session.user){
        req.session.user = new User();
    }
    next();
 });

app.use(express.static('public'));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get("/home", (req, res) => {
    res.render("index", { balance: (Math.round(req.session.user.balance * 100) / 100).toFixed(2) + "€" });
})

app.get("/", (req, res) => {
    res.redirect("/home");
});

app.get("/user", (req, res) => (
    res.json(req.session.user)
));

app.post("/user/login", (req, res) => {
    User.login(req.session.user, req.body.username, req.body.password);
    return res.json(req.session.user);
})

app.get("/games", (req, res) => {
    res.render("games", { balance: (Math.round(req.session.user.balance * 100) / 100).toFixed(2) + "€" });
})

app.get("/games/climbtovictory", (req, res) => {
    res.render("games/climbtovictory", {
        balance: (Math.round(req.session.user.balance * 100) / 100).toFixed(2) + "€",
        inGame: !req.session.user.currentGame ? false : true,
        level: !req.session.user.currentGame ? false : req.session.user.currentGame.level,
        winnings: !req.session.user.currentGame ? false : 
            (Math.round((req.session.user.currentGame.bet * Math.pow(1.25, req.session.user.currentGame.level - 1)) * 100) / 100).toFixed(2)    
        
    });
})

app.post("/games/climbtovictory", (req, res) => {
    User.startGame(req.session.user, ClimbToVictory, req.body.bet);
    return res.json(req.session.user);
})

app.post("/games/climbtovictory/climb", (req, res) => {
    if (req.session.user.currentGame)
        return res.json(ClimbToVictory.climb(req.session.user));
    else
        throw Error("Join a game first.");
})

app.post("/games/climbtovictory/end", (req, res) => {
    if (req.session.user.currentGame)
        if (req.session.user.currentGame.level > 1)
            return res.json(User.endGame(req.session.user));
        else
            throw Error("Cannot end on first level.");
    else
        throw Error("Join a game first.");
})

app.listen(port, () => console.log(`App running at http://localhost:${port}`));