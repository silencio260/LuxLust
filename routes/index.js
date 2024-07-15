var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Location = require('../models/location'),
    Comments =  require('../models/comment'),
    User = require('../models/user'),
    passport = require('passport'),
    passportLocal = require('passport-local')

/*** Routes ***/
router.get("/", function(req, res){
    res.render("home")
})

// AUTH ROUTE
router.get('/register', function(req, res){

    res.render('register')
})

router.post('/register', function(req, res){

    User.register(new User({username: req.body.username}), req.body.password, function(err, user){

        if(err){
            req.flash('error', 'something went wrong')
            return res.redirect('/register')
        }
        passport.authenticate('local')(req, res, function(){
            req.flash('success', 'successfully logged in')
            res.redirect('/locations')
        })
    })

})

router.get('/login', function(req, res){

    res.render('login')
})


router.post('/login',passport.authenticate('local', {
    successRedirect: '/locations',
    failureRedirect: '/login'
}), function(req, res){

    // req.flash('success', 'you succesfully logged in')
 })

router.get('/logout', function(req, res){

    req.logout();
    req.flash('success', 'you successfully logged out')
    res.redirect('/locations')
})

function isLoggedin(req, res, next){

    if(req.isAuthenticated()){
        return next()
    }

    res.redirect('/login')
}


module.exports = router;