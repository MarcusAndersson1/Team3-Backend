var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var dentistSchema = new Schema({
    //_id added by default
    name: { type: String },
    dentalClinics: [{type: Schema.Types.ObjectId, ref: 'DentalClinic' }],
    timeslot: [{type: Schema.Types.ObjectId, ref: 'Timeslot' }],

    
})

module.exports = mongoose.model('Dentist', dentistSchema)
