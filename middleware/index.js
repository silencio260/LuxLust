var Location = require('../models/location'),
    Comments = require('../models/comment')

var middleware = {}


//*************Check Location authorization */
middleware.CheckLocationOwnership = function(req, res, next){

    var id = req.params.id;

    if(req.isAuthenticated()){

        Location.findById(id, function(err, loc){

            if(err){
                console.log(err)
                res.redirect('++++++++++++++++++')
                res.redirect('back')

            }else{
                  //console.log('************' +req.user.username)
                    if( req.user.username == 'admin' || loc.author.id.equals(req.user._id)){
                        console.log('========================' + loc)
                        return next()
                    }else{
                        res.redirect('----------------------')
                        res.redirect('back')
                    }
                
            }
        })

    }else{

        res.redirect('/login')
    }

}


//*************Check comment authorization */
middleware.CheckCommentOwnership = function(req, res, next){

    
    var id = req.params.id;

    if(req.isAuthenticated()){

        Comments.findById(id, function(err, comment){

            if(err){
                console.log(err)
                console.log('++++++++++++++++++')
                res.redirect('back')

            }else{
                console.log('++++++++++++++++++' + comment)
                  //console.log('************' +req.user.username)
                    if( req.user.username == 'admin' || (comment && comment.author.id.equals(req.user._id)) ){
                       // console.log('========================' + loc)
                        return next()
                    }else{
                        console.log('++++++++++++++++++')
                        res.redirect('back')
                    }
                
            }
        })

    }else{

        res.redirect('/login')
    }

}



module.exports = middleware