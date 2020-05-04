const db = require('../models');
const passport = require('passport');

module.exports = function (app) {
    app.post("/api/login", passport.authenticate('local'), (req, res) => {
        res.json({
            email: req.body.email,
            id: req.user.id
        })
    })

    app.get("/api/logout", (req, res) => {
        req.logout();
        res.json({loggedOut: "yes"})
    })

    app.post("/api/admin/signup", (req, res) => {
        db.User.create({
            email: req.body.email,
            password: req.body.password
        }).then(function() {
            res.redirect(307, "/api/login")
        }).catch(function() {
            res.status(401).json(err)
        })
    })
}