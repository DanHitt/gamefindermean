var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var storeSchema = new Schema({
    store: {
        type: String,
        required: true
    },
    address: {
        streetNumber: {
            type: String,
            required: true
        },
        aptNumber: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        }        
    },
    phoneNumber:String,
    website:String,
    hoursMonToFri: [String],
    playTablesNumber: [Number],
    playSeatsTotal: Number, 
    boardGames: [String],
    storeEventGames: [String]
})


module.exports = mongoose.model('Store', storeSchema); 

//
//{
//    store: "The Dragons Keep - Provo",
//    address: {
//        streetNumber: "260 N",
//        city: "Provo",
//        state: "Utah",   
//    },
//    hoursMonToFri: ["11-11pm mon-sat"],
//    playTablesNumber: [6,9,10,10],
//    playSeatsTotal: 45
//}