var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Location = require('../models/location'),
    Comments =  require('../models/comment'),
    User = require('../models/user'),
    passport = require('passport'),
    passportLocal = require('passport-local'),
    middleware = require('../middleware')



router.get('/', function(req, res){
    Location.find({}, function(err, locs){
        if(err)
            console.log(err)

        else{
            console.log('found them data')
            res.render("index",{locations: locs})
        }
    })

   
});

router.get('/new',isLoggedin, function(req, res){
    console.log('***********' + req.user)
    res.render('newLocation')
})


router.post('/new', function(req, res){
    var name = req.body.name,
        image =  req.body.image,
        description = req.body.description,
    
    author = {id: req.user._id, username: req.user.username}
    Location.create({name:name, image:image, description: description,
         author: author}, function(err, locs){
        if(err){
            req.flash('error', 'something went wrong')
            console.log(err)
            res.redirect('back')
    
            }
         else{
                console.log("*********************")
                console.log(locs)
               
            }
        });
        
        res.redirect('/locations')
        
})


router.get('/show/:id', function(req, res){

    var id = req.params.id;
    Location.findById(id).populate("comments").exec(function(err, location){
        if(err){
            console.log('error dectected')
            console.log(err)

        }
        else{
            console.log(location)
            res.render('show', {location: location});
        }
    });

   
})


// *************Edit 
router.get('/:id/edit', function(req, res){

    var id = req.params.id;
    Location.findById(id, function(err, loc){
        if(err){
            console.log(err)
            req.flash('error', 'something went wrong')
            res.redirect('back')
        }else{

            res.render('editLocation', {location: loc})
        }
    })
   
})


router.put('/:id/edit', middleware.CheckLocationOwnership, function(req, res){
    var id = req.params.id;
    var location = req.body
    console.log(location)
    Location.findByIdAndUpdate(id, location, function(err, loc){
        if(err){
            console.log(err)
            req.flash('error', 'something went wrong')
            res.redirect('back')

        }else{

            req.flash('success', 'location Updated')
            console.log(loc)
            res.redirect('/locations/show/' + id)
        }
    })
});


//*****************Delete request */
router.delete('/:id/delete', middleware.CheckLocationOwnership, function(req, res){
    
    var id = req.params.id;

    Location.findByIdAndRemove(id, function(err, loc){
        if(err){
            console.log(err)
            req.flash('error', 'something went wrong')
            res.redirect('back')
        }else{

            req.flash('suncess', 'successfully created location')
            console.log(loc)
            res.redirect('/locations')
        }
    })
})


//***********Middle ware */
function isLoggedin(req, res, next){

    if(req.isAuthenticated()){
        return next()
    }
    
    req.flash('error', 'You have to login')
    res.redirect('/login')
}


module.exports = router;
