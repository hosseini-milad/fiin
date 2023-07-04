const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ControlSchema = new Schema({
    userId:  String,
    controlName:   String, 
    controlValue:   String,
    controlDescription:   String,
    controlState:String,
    date:    Date
})
module.exports = mongoose.model('Control',ControlSchema);