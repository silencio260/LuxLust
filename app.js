var express = require("express"),
    app  = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Location = require('./models/location'),
    Comments =  require('./models/comment'),
    User = require('./models/user'),
    methodOverride = require('method-override'),
    passport = require('passport'),
    passportLocal = require('passport-local'),
    flash = require('connect-flash')
    seedDB =  require('./models/seed')

var locationRoute = require('./routes/location'),
    commentRoute = require('./routes/comment'),
    indexRoute = require('./routes/index')
    
mongoose.connect('mongodb://localhost/LuxLust');
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(flash())

//PASSPORT CONFIG
app.use(require('express-session')({
    secret: 'A girl has no name',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
passport.use(new passportLocal(User.authenticate()))


app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error')
    res.locals.success = req.flash('success')
    next();

})


//seedDB()

app.use('/locations', locationRoute)
app.use('/locations/:id', commentRoute)
app.use(indexRoute)


////////////////////////////////
app.listen(3000, function(){
    console.log("serving on port 3000")
})



