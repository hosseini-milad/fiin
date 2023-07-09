const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ConfigSchema = new Schema({
    configClass:  String,
    configTitle:   String, 
    configDescription:   String,
    configState:String,
    date:    Date
})
module.exports = mongoose.model('Config',ConfigSchema);