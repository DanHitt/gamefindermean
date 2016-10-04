var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {
        type:String,
        required: true
    },
    userName : {
        type: String,
        required: true
    },
    firstName: String,
    LastName: String,
    phoneNumber: String,
    favoriteGames: [String]
    
    
})