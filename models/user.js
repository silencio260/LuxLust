var mongoose =  require('mongoose'),
    passportMongoose = require('passport-local-mongoose')

var userSchema = mongoose.Schema({
    username: String,
    password: String
})

userSchema.plugin(passportMongoose);

module.exports = mongoose.model('User', userSchema)