const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const jsonParser = bodyParser.json();
const router = express.Router()
const auth = require("../middleware/auth");
const User = require("../models/auth/users");
const sendEmailNow = require('../middleware/sendMail');
const sendBitrix = require('../middleware/Bitrix');
const bitrixDeal = require('../middleware/Bitrixdeal');
const sendMailBrevo = require('../middleware/sendMail');

router.post('/login',jsonParser, async (req,res)=>{
    try {
        const { username, password } = req.body;
        if (!(username && password)) {
          res.status(400).json({error:"All input is required"});
          return;
        }
        // Validate if user exist in our database
        const user = await User.findOne({username: username });
        if(!user){
          /*encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email:username+"@mgmlenz.com",
            password: encryptedPassword,
            date:Date.now()
          });
          const token = jwt.sign(
            { user_id: user._id },
            process.env.TOKEN_KEY,
            {expiresIn: "2h",}
          );
          user.token = token;
          res.status(201).json(user)
          return;*/
          res.status(400).json({error:"user not found"});
          return;
        }
        if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign(
            { user_id: user._id, username },
            process.env.TOKEN_KEY,
            {expiresIn: "72h",}
          );
          user.token = token;
          res.status(200).json(user);
          return;
        }
        if (user && password===user.password){
          const token = jwt.sign(
            { user_id: user._id, username },
            process.env.TOKEN_KEY,
            {expiresIn: "2h",}
          );
          user.token = token;
          res.status(200).json(user);
          return;
        }
        else{
          res.status(400).json({error:"Invalid Password"}); 
        }
        } 
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/forget',jsonParser, async (req,res)=>{
  try {
      const { email } = req.body;
      if (!email) {
        res.status(400).json({error:"Email is required"});
        return;
      }
      // Validate if user exist in our database
      const user = await User.findOne({email: email });
      if(!user){
        
        res.status(400).json({error:"Email not found"});
        return;
      }
      if (user) {
        const newOtp=user.cName+(Math.floor(Math.random() * 10000000) + 10000000)
        await User.updateOne({email: email },{$set:{otp:newOtp}})
        const sendMailResult = await sendMailBrevo(email,newOtp)
        //console.log(sendMailResult)
        if(sendMailResult.error)
          res.status(400).json({error:sendMailResult.error});
        else res.status(200).json({message:"email sent"});
        return;
      }
      
    } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.post('/register',auth,jsonParser, async (req,res)=>{
  try {
      const data = {
        username: req.body.username,
        cName: req.body.cName,
        sName: req.body.sName,
        phone: req.body.phone,
        password: req.body.password,
        email: req.body.email,
        access: req.body.access,
        group: req.body.group,
        agent:req.body.agent?req.body.agent:req.headers["userid"],
        nif: req.body.nif,
        date: Date.now()
      }
      if (!(data.cName && data.sName&&data.phone)) {
        res.status(400).json(
          {error:"All input is required"});
        return;
      }
      // Validate if user exist in our database
      const user = await User.findOne({username: data.username });
      if(!user){
        data.password = data.password&&await bcrypt.hash(data.password, 10);
        const bitrixData = await sendBitrix(data,"crm.contact.add.json")
        console.log(bitrixData)
        if(bitrixData.error){
          res.status(400).json({error:bitrixData.error_description})
          return
        }
        const bitrixDealConst=await bitrixDeal(bitrixData.result,"crm.deal.add.json",data)

        //console.log(bitrixDealConst)
        const user = bitrixData.result&&
          await User.create({...data,bitrixCode:bitrixData.result});
        
        res.status(201).json({user:user,message:"User Created"})
        return;
      }
      else{
        res.status(400).json(
          {error:"User Already Exists"});
        return;
      }
      } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.post('/list-users',auth,jsonParser, async (req,res)=>{
  try {
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
      const data = {
        agent: req.body.agent,
        cName: req.body.cName,
        sName: req.body.sName,
        phone: req.body.phone,
        email: req.body.email,
        access: req.body.access,
        group: req.body.group,
        nif: req.body.nif,
        offset:req.body.offset?req.body.offset:0,
        date: Date.now()
      }
      // Validate if user exist in our database
      const userOwner = await User.findOne({_id:req.headers["userid"]});
      //console.log(userOwner)
      const user = await User.aggregate([
        { $match : data.access?{access:data.access}:{}},
        { $match : data.cName?{cName:{$regex: data.cName}}:{}},
        { $match : data.sName?{sName:{$regex: data.sName}}:{}},
        { $match : data.nif?{nif:{$regex: data.nif}}:{}},
        { $match : data.email?{email:{$regex: data.email}}:{}},
        { $match : data.phone?{phone:{$regex: data.phone}}:{}},
        { $match : (userOwner&&(userOwner.access==="agent"||userOwner.access==="agency"))?
          {agent: {$regex:userOwner._id.toString()}}:{}},
        
        { $addFields: { "agent": { "$toObjectId": "$agent" }}},
        {$lookup:{
            from : "users", 
            localField: "agent", 
            foreignField: "_id", 
            as : "agentDetail"
        }}
    ])
    var pageUser=[];
    for(var i=data.offset;i<data.offset+parseInt(pageSize);i++)
      user[i]&&pageUser.push(user[i])
      res.status(200).json({user:pageUser,message:"User List",size:user.length})
      
      } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.post('/find-users',auth,jsonParser, async (req,res)=>{
  try {
        const userOwner = await User.findOne({_id:req.headers["userid"]});
        res.status(200).json({user:userOwner,message:"User Data"})
      } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.post('/change-password',auth,jsonParser, async (req,res)=>{
  try {
      const data = {
        oldPass: req.body.oldPass,
        newPass: req.body.newPass,
        confPass: req.body.confPass,
        date: Date.now()
      }
      if(data.newPass === data.confPass){
        var encryptedOld = await bcrypt.hash(data.oldPass, 10);
        const userOwner = await User.findOne({_id:req.headers["userid"]});
        const passCompare = await bcrypt.compare(data.oldPass,userOwner.password)
        
        if(passCompare){
          var encryptedNew = await bcrypt.hash(data.newPass, 10);
          await User.updateOne({_id:req.headers["userid"]},
          {$set:{password:encryptedNew}})

          res.status(200).json({user:passCompare,message:"User Pass Changes"})
        }
        else{
          res.status(400).json({error:"Wrong Password"});
        }
      }
      else{
        res.status(400).json({error:"Not Equal Passwords"});
      }
    } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})

router.post('/forget-password-set',jsonParser, async (req,res)=>{
  try {
      const data = {
        newPass: req.body.newPass,
        confPass: req.body.confPass,
        otp:req.body.otp,
        date: Date.now()
      }
      if(data.newPass === data.confPass){
        const user = await User.findOne({otp:data.otp})
        res.status(200).json({user:user,message:"User Found"})
        var encryptedNew = await bcrypt.hash(data.newPass, 10);
          await User.updateOne({otp:data.otp},
          {$set:{password:encryptedNew}})

          res.status(200).json({user:user,message:"User Pass Changes"})
        
      }
      else{
        res.status(400).json({error:"Not Equal Passwords"});
      }
    } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})
router.post('/change-user',auth,jsonParser, async (req,res)=>{
  try {
      const data = {
        username: req.body.username,
        cName: req.body.cName,
        sName:req.body.sName,
        phone:req.body.phone,
        email:req.body.email,
        nif:req.body.nif,
        date: Date.now()
      }
      // Validate if user exist in our database
      const userOwner = await User.updateOne({_id:req.headers["userid"]},
        {$set:data});
      //console.log(await bcrypt.compare(userOwner.password, data.oldPass))
      
      res.status(200).json({user:userOwner,message:"User Data Changed."})
      
      } 
  catch(error){
    var errorTemp=error.message.includes("duplicate")?
      "duplicate Value":error.message
      res.status(500).json({error: errorTemp})
  }
})

router.get('/sendmail',jsonParser, async (req,res)=>{
  try {
      //sendEmailNow()
      res.status(200).json({message:"Email Sent"})
      
      } 
  catch(error){
      res.status(500).json({error: error})
  }
})
module.exports = router;