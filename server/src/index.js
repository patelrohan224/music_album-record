const express = require('express');
const app = express();
const passport = require("./configs/passport")
app.use(express.json());
app.use(passport.initialize());
const cookieParser = require("cookie-parser");
const cors = require('cors');
app.use(cookieParser());
app.use(cors({origin:'https://music-album-records-rohanpatel.vercel.app'}))
// app.use(cors({origin:'http://localhost:3000'}))

passport.serializeUser(function ({
    user,
    token
}, done) {
    done(null, {
        user,
        token
    });
});

passport.deserializeUser(function ({
    user,
    token
}, done) {
    done(err, {
        user,
        token
    });
});

app.get("/auth/google/failure", function (req, res) {
    return res.send("Something went wrong");
})

app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['email', 'profile']
    }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/auth/google/failure'
    }),
    function (req, res) {
        const {
            user,
            token
        } = req.user
        let name = "rohanEmail" + user.email
        return res.redirect('https://music-album-records-rohanpatel.vercel.app/rd' + "?" + token + name);
        // return res.redirect('http://localhost:3000/rd' + "?" + token + name);
  
        token = ""
        name = ""
        // return res.status(200).json({user, token });
    });

const artistController = require("./controllers.js/album.c")
app.use("/music", artistController)
module.exports = app;