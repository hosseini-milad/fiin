const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const PlanSchema = new Schema({
    userId:  String,
    planName:   String, 
    bankName:   String,
    planDescription:   String,
    fileUrl:String,
    cancelReason:String,
    selectedPlan:String,
    date:    Date
})
module.exports = mongoose.model('Plan',PlanSchema);