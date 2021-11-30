var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var timeslotSchema = new Schema({
    //_id added by default
    
    date: { type: Date },
    time: { type: String },
    isAvailable: { type: Boolean },
    user: {type: Schema.Types.ObjectId, ref: 'User' },
    dentis: {type: Schema.Types.ObjectId, ref: 'Dentist' },
    openingHours: [{type: Schema.Types.ObjectId, ref: 'OpeningHours' }]

     
})

module.exports = mongoose.model('Timeslot', timeslotSchema)