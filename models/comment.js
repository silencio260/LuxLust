var mongoose = require('mongoose')

var commentSchema = mongoose.Schema({
    author: {
        id:{
         type: mongoose.Schema.Types.ObjectId,
         ref:'User' 
        },
        
        username: String
    },
    content: String
})


module.exports = mongoose.model('Comment', commentSchema);
