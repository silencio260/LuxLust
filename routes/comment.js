var express = require('express'),
    router = express.Router({mergeParams:true}),
    mongoose = require('mongoose'),
    Location = require('../models/location'),
    Comments =  require('../models/comment'),
    User = require('../models/user'),
    passport = require('passport'),
    passportLocal = require('passport-local'),
    middleware = require('../middleware')


router.get('/comment/new',isLoggedin, function(req, res){

    var id = req.params.id;

    res.render('newComment',{id:id})
})


router.post('/comment/new',isLoggedin, function(req, res){
    
    var id = req.params.id;
    //var author = 
    var author = {id: req.user._id, username: req.user.username}
    var content = req.body.content;
    var newComment = {author: author, content: content};
    console.log('///////////////////'+ author)
    Comments.create(newComment, function(err, comment){
        if(err){
            console.log(err)
            req.flash('error', 'something went wrong')
            res.redirect('back')
        }else{
            console.log('created new comment')
            Location.findById(id, function(err, loc){
                if(err){
                    console.log(err)
                }else{

                    loc.comments.push(comment)
                    loc.save()
                    req.flash('sucess', 'comment created')
                }
            })
        }
    })
    res.redirect('/locations/show/' + id)
})

//*************** Edit Comment */
router.get('/comment/:comment_id/edit',  middleware.CheckCommentOwnership, function(req, res){
    var id = req.params.id;
    var comment_id = req.params.comment_id;

    Comments.findById(comment_id, function(err, found){

        if(err){
            console.log(err)
            req.flash('error', 'something went wrong')
            res.redirect('back')
        }else{
            res.render('editComment',{id:id, comment: found})
        }
    })
  
})

router.put('/comment/:comment_id/edit', middleware.CheckCommentOwnership, function(req, res){
                                        
    var comment_id = req.params.comment_id;
    var content = req.body.content;

    Comments.findByIdAndUpdate(comment_id, {content: content}, 
        function(err, found){

        if(err){
            console.log(err)
            req.flash('error', 'something went wrong')
        }else{
            console.log(found);
            res.redirect('/locations/show/' + req.params.id )
        }
    })

})


//************ Delete Comment */
router.delete('/comment/:comment_id/', middleware.CheckCommentOwnership, function(req, res){

    var comment_id = req.params.comment_id
    Comments.findByIdAndRemove(comment_id, function(err, comment){
        if(err){
            console.log(err)
            req.flash('error', 'something went wrong')
        }else{

            req.flash('success', 'comment deleted')
            res.redirect('/locations/show/' + req.params.id )
        }
    })

})


//******************Check user login status */
function isLoggedin(req, res, next){

    if(req.isAuthenticated()){
        
        return next()
    }

    req.flash('error', 'You have to be logged in to do that')
    res.redirect('/login')
}


module.exports = router;

