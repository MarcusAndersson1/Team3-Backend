var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var dentalClinicSchema = new Schema({
    //_id added by default
    name: { type: String },
    owner: { type: String },
    long: { type: Number },
    lat: { type: Number},    
    dentist: [{type: Schema.Types.ObjectId, ref: 'Dentist' }],
    openingHours: [{type: Schema.Types.ObjectId, ref: 'OpeningHours' }],

})

module.exports = mongoose.model('DentalClinic', dentalClinicSchema)
