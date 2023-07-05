const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  cName: { type: String, required : true},
  sName:{ type: String, required : true},
  phone: { type: String , required : true},
  password: { type: String },
  bitrixCode:{type: String },
  email: { type: String , unique: true},
  oldEmail: { type: String},
  access:{
    type:String,
    enum:["manager","agent","agency","customer","partner","request"]
  },
  group: {
    type:String,
    enum:["groupA","groupB","groupC","groupD"]
  },
  credit: { type: String },
  token: { type: String },
  otp:{ type: String , default: null },
  nif: { type: String },
  partner:{ type: String },
  partnerName:{ type: String },
  agent:{ type: String },
  agentName:{ type: String },
  agency:{ type: String },
  agencyName:{ type: String },
  active:{ type: String },
  status:{ type: String },

  nameCompany:{ type: String },
  firma:{ type: String },
  morada:{ type: String },
  nifCompany:{ type: String },
  phoneCompany:{ type: String },
  emailCompany:{ type: String },
  IBANCompany:{ type: String },

  date:{type:Date}
});

module.exports = mongoose.model("user", userSchema);