const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment')
var Schema = mongoose.Schema;

const TaskSchema = new Schema({
    userId:  String, // String is shorthand for {type: String}
    agentId:   String,
    state:   String, 
    step:   Number,
    prior:   Number,
    tag: String,
    priority:   String,
    date:    Date
})
autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 

TaskSchema.plugin(autoIncrement.plugin,{ model: 'Task', field: 'priority' });
module.exports = mongoose.model('Task',TaskSchema);