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
const UserMontage = require("../models/auth/customerMontage");
const task = require('../models/main/task');
const LogCreator = require('../middleware/LogCreator');
const plans = require('../models/main/plans');

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
    nationality: req.body.nationality ,
    morada: req.body.morada ,
    address: req.body.address ,

    profession: req.body.profession ,
    contract: req.body.contract ,
    household: req.body.household ,
    homeContractual: req.body.homeContractual ,
    academicDegree: req.body.academicDegree ,

    maturity: req.body.maturity,
    receipts: req.body.receipts,
    income: req.body.income,
    otherIncome: req.body.otherIncome,

    mortgageLoans: req.body.mortgageLoans,
    personalCredit: req.body.personalCredit,
    carLoan: req.body.carLoan,
    otherCharges:req.body.otherCharges,

    date:new Date()
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
router.post('/user-montage',auth,jsonParser, async (req,res)=>{
  const userId =req.body.userId?req.body.userId:req.headers['userid']
  try {
        const userMontage = await UserMontage.aggregate([
        { $match :({userId:userId})},
        { $addFields: { "userId": { "$toObjectId": "$userId" }}},
        {$lookup:{
            from : "users", 
            localField: "userId", 
            foreignField: "_id", 
            as : "userDetail"
        }}])
        if(userMontage){
          
          res.status(200).json({user:userMontage,message:"User Exists"})
          }
        else{
          res.status(500).json({error:"User Not Found"})
        }
      } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.post('/update-user-montage',auth,jsonParser, async (req,res)=>{

  const data={
    userId:req.body.userId?req.body.userId:req.headers['userid'],
    goal: req.body.goal,
    propertyDestination: req.body.propertyDestination,
    proposersCount: req.body.proposersCount,

    location: req.body.location,
    bookAmount: req.body.bookAmount,
    intendedFinancing: req.body.intendedFinancing,
    entryAvailable: req.body.entryAvailable,
    intendedTerm: req.body.intendedTerm,
    notes:req.body.notes,
    date:new Date()
  }
  
  try {
        const userMontage = await UserMontage.findOne({userId:ObjectID(data.userId)});
        
      //console.log(userTask)
      await task.updateOne({userId:ObjectID(data.userId),state:"lead"},
      {$set:{state:"informations",tag:""}})
        if(userMontage){
          await UserMontage.updateOne({userId:data.userId},{$set:data});
          res.status(200).json({user:userMontage,message:"UserMortage Updated"})
        }
        else{
          await UserMontage.create(data);
          res.status(200).json({user:userMontage,message:"UserMortage Created"})
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
    nationality: req.body.nationality ,
    morada: req.body.morada ,
    address: req.body.address ,

    profession: req.body.profession ,
    contract: req.body.contract ,
    household: req.body.household ,
    homeContractual: req.body.homeContractual ,
    academicDegree: req.body.academicDegree ,

    maturity: req.body.maturity,
    receipts: req.body.receipts,
    income: req.body.income,
    otherIncome: req.body.otherIncome,

    mortgageLoans: req.body.mortgageLoans,
    personalCredit: req.body.personalCredit,
    carLoan: req.body.carLoan,
    otherCharges:req.body.otherCharges,

    date:new Date()
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
router.post('/user-montage',auth,jsonParser, async (req,res)=>{
  const userId =req.body.userId?req.body.userId:req.headers['userid']
  try {
        const userMontage = await UserMontage.aggregate([
        { $match :({userId:userId})},
        { $addFields: { "userId": { "$toObjectId": "$userId" }}},
        {$lookup:{
            from : "users", 
            localField: "userId", 
            foreignField: "_id", 
            as : "userDetail"
        }}])
        if(userMontage){
          
          res.status(200).json({user:userMontage,message:"User Exists"})
          }
        else{
          res.status(500).json({error:"User Not Found"})
        }
      } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.post('/confirm-user-data',auth,jsonParser, async (req,res)=>{

  const data={
    userId:req.body.userId?req.body.userId:req.headers["userid"],
    state: req.body.state,
    date:new Date()
  }
  
  try {
        await task.updateOne({userId:ObjectID(data.userId),
          state:req.body.oldState},
          {$set:{state:req.body.state,tag:""}})
          const userOwner = await User.findOne({_id:req.body.userId});
          await LogCreator(userOwner,"Confirm Data",
            "user Data Confirmed by administrator")
          res.status(200).json({message:"User Data Confirmed"})
        
  } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.post('/user-plans',auth,jsonParser, async (req,res)=>{
  const userId =req.body.userId?req.body.userId:req.headers['userid']
  try {
        const planData = await plans.aggregate([
        { $match :({userId:userId})},
        { $addFields: { "userId": { "$toObjectId": "$userId" }}},
        {$lookup:{
            from : "users", 
            localField: "userId", 
            foreignField: "_id", 
            as : "userDetail"
        }}])
        if(planData){
          
          res.status(200).json({plans:planData,message:"Plan Lists"})
          }
        else{
          res.status(500).json({error:"Plan Not Found"})
        }
      } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.post('/update-user-plan',auth,jsonParser, async (req,res)=>{

  const data={
    userId:req.body.userId?req.body.userId:req.headers['userid'],
    
    planName:   req.body.planName, 
    bankName:   req.body.bankName,
    planDescription:   req.body.planDescription,
    fileUrl:req.body.fileUrl,

    date:new Date()
  }
  
  try {
        
          await plans.create(data);
          res.status(200).json({message:"User Plan Created"})
        
      } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.post('/delete-user-plan',auth,jsonParser, async (req,res)=>{

  try {
        await plans.deleteOne({_id:req.body.planId});
          res.status(200).json({message:"User Plan Deleted"})
        
      } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})
module.exports = router;