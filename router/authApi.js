const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const jsonParser = bodyParser.json();
const router = express.Router()
const auth = require("../middleware/auth");
const User = require("../models/auth/users");

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
        const user = await User.create(data);
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
      const data = {
        agent: req.body.agent,
        cName: req.body.cName,
        sName: req.body.sName,
        phone: req.body.phone,
        email: req.body.email,
        access: req.body.access,
        group: req.body.group,
        nif: req.body.nif,
        date: Date.now()
      }
      // Validate if user exist in our database
      const userOwner = await User.findOne({_id:req.headers["userid"]});
      
      const user = await User.aggregate([
        { $match : data.access?{access:data.access}:{}},
        { $match : data.cName?{cName:{$regex: data.cName}}:{}},
        { $match : data.sName?{sName:{$regex: data.sName}}:{}},
        { $match : data.nif?{nif:{$regex: data.nif}}:{}},
        { $match : data.email?{email:{$regex: data.email}}:{}},
        { $match : data.phone?{phone:{$regex: data.phone}}:{}},
        { $match : userOwner.access=="agent"?{agent: {$regex:userOwner._id.toString()}}:{}},
        
        { $addFields: { "agent": { "$toObjectId": "$agent" }}},
        {$lookup:{
            from : "users", 
            localField: "agent", 
            foreignField: "_id", 
            as : "agentDetail"
        }},
    ])
      res.status(200).json({user:user,message:"User List"})
      
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
      // Validate if user exist in our database
      const userOwner = await User.findOne({_id:req.headers["userid"]});
      const passCompare = await bcrypt.compare(userOwner.password, data.oldPass)
      console.log(await bcrypt.compare(userOwner.password, data.oldPass))
      
      res.status(200).json({user:passCompare,data:userOwner.password,message:"User Pass Changes"})
      
      } 
  catch(error){
      res.status(500).json({message: error.message})
  }
})
module.exports = router;