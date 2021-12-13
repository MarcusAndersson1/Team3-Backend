var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    //_id added by default
    name: { type: Date},
    email: { type: String},
    password: {type: String},
    personalNumber: {type: Number},
    isAdmin: {type: Boolean},
    timeslot: [{type: Schema.Types.ObjectId, ref: 'Timeslot' }]
     
})

module.exports = mongoose.model('User', userSchema)