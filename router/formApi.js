const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
var ObjectID = require('mongodb').ObjectID;
const jsonParser = bodyParser.json();
const router = express.Router()
const auth = require("../middleware/auth");
const User = require("../models/auth/users");
const UserDetail = require("../models/auth/customerDetail")

router.post('/user-detail',auth,jsonParser, async (req,res)=>{
  const userId =req.body.userId?req.body.userId:req.headers['userid']
  try {
        const userData = await UserDetail.aggregate([
        { $match :({userId:userId})},
        { $addFields: { "userId": { "$toObjectId": "$userId" }}},
        {$lookup:{
            from : "users", 
            localField: "userId", 
            foreignField: "_id", 
            as : "userDetail"
        }}])
        if(userData){
          
          res.status(200).json({user:userData,message:"User Exists"})
          }
        else{
          res.status(500).json({error:"User Not Found"})
        }
      } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.post('/update-user-detail',auth,jsonParser, async (req,res)=>{

  const data={
    userId:req.body.userId?req.body.userId:req.headers['userid'],
    birthday: req.body.birthday ,
    address: req.body.address ,
    profession: req.body.profession 
  }
  
  try {
        const userDetails = await UserDetail.findOne({userId:ObjectID(data.userId)});
        if(userDetails){
          await UserDetail.updateOne({userId:data.userId},{$set:data});
          res.status(200).json({user:userDetails,message:"UserDetail Updated"})
        }
        else{
          await UserDetail.create(data);
          res.status(200).json({user:userDetails,message:"UserDetail Created"})
        }
      } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})
module.exports = router;