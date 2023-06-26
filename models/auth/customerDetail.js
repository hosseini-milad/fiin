const mongoose = require("mongoose");

const customerDetailSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  
  birthday: { type: String },
  address: { type: String },
  profession: { type: String },

  date:{type:Date}
});

module.exports = mongoose.model("customerdetail", customerDetailSchema);