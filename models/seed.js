var mongoose = require('mongoose'),
    location = require('./location'),
    Comments = require('./comment')


locationsArr = [
    {name:'high_garden', image:'/pics/photo (5).jpeg', 
    description: 'this is a nice site'},

    {name:'castaly_rock', image:'/pics/photo (6).jpeg', 
    description: 'this is a nice site'},

    {name:'mexico', image:'/pics/photo (1).jpeg', 
    description: 'this is a nice site'},

    {name:'high_garden', image:'/pics/photo (5).jpeg', 
    description: 'this is a nice site'},

    {name:'castaly_rock', image:'/pics/photo (6).jpeg', 
    description: 'this is a nice site'},

    {name:'mexico', image:'/pics/photo (1).jpeg', 
    description: 'this is a nice site'},

    {name:'winterfell', image:'/pics/photo (7).jpeg', 
    description: 'this is a nice site'}
]


function seedDB() {

    location.remove({ }, function(err){

        if(err){
            console.log(err)
        }else{
            console.log('location deleted')

            locationsArr.forEach(function(loc){

                location.create(loc, function(error, local){

                    if(error){
                        console.log(error)
                    }else{
                        Comments.create({author:'guy',
                         content:' this is awesome'},
                        function(err, comment){
                            if(err){
                                console.log(err)
                            }else{
                                console.log('comment created')
                                local.comments.push(comment)
                                local.save()
                            }
                        })

                        console.log('created local')

                    }

                })
            })
        }


    } )


}


module.exports = seedDB;
