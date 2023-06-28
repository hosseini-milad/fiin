const mongoose = require("mongoose");

const customerDetailSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  
  birthday: { type: String },
  nationality: { type: String },
  address: { type: String },
  morada: { type: String },

  profession: { type: String },
  contract: { type: String },
  household: { type: String },
  homeContractual: { type: String },
  academicDegree: { type: String },

  date:{type:Date}
});

module.exports = mongoose.model("customerdetail", customerDetailSchema);