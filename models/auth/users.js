const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  cName: { type: String, required : true},
  sName:{ type: String, required : true},
  phone: { type: String , required : true},
  password: { type: String },
  bitrixCode:{type: String },
  email: { type: String , unique: true},
  access:{
    type:String,
    enum:["manager","agent","agency","customer","credit","request"]
  },
  group: {
    type:String,
    enum:["groupA","groupB","groupC","groupD"]
  },
  credit: { type: String },
  token: { type: String },
  otp:{ type: String , default: null },
  nif: { type: String },
  agent:{ type: String },

  date:{type:Date}
});

module.exports = mongoose.model("user", userSchema);