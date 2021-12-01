var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var openingHoursSchema = new Schema({
    //_id added by default
    monday: { type: String },
    tuesday: { type: String },
    wednesday: { type: String },
    thursday: { type: String },
    friday: { type: String },
    saturday: { type: String },
    sunday: { type: String },
    dentalClinics: [{type: Schema.Types.ObjectId, ref: 'DentalClinic' }],
    timeslot: [{type: Schema.Types.ObjectId, ref: 'Timeslot' }],



                                        //Add the provide and work_in thing 
    
})

module.exports = mongoose.model('OpeningHours', openingHoursSchema)