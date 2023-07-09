const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
var ObjectID = require('mongodb').ObjectID;
const jsonParser = bodyParser.json();
const router = express.Router()
const auth = require("../middleware/auth");
const config = require('../models/main/config');

router.post('/user-config',jsonParser, async (req,res)=>{
  try {
        const userConfig = await config.find({configClass:req.body.config})
        if(userConfig){
          res.status(200).json({config:userConfig,message:"User Control List"})
          }
        else{
          res.status(500).json({error:"No User Control"})
        }
      } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.post('/create-user-config',auth,jsonParser, async (req,res)=>{

  const data={
    configClass:   req.body.configClass, 
    configTitle:   req.body.configTitle,
    configDescription:   req.body.configDescription,
    configState:req.body.configState,

    date:new Date()
  }
  
  try {
      await config.create(data);
      res.status(200).json({message:"User Control Created"})
        
    } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.post('/remove-user-control',auth,jsonParser, async (req,res)=>{
  try {
      await config.deleteOne({_id:req.body.configId});
      res.status(200).json({message:"User Control Deleted"})
        
    } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})

module.exports = router;