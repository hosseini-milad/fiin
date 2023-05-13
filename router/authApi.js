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
        const { phone, password } = req.body;
        if (!(phone && password)) {
          res.status(400).send("All input is required");
          return;
        }
        // Validate if user exist in our database
        const user = await User.findOne({phone: phone });
        if(!user){
          encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            phone,
            email:phone+"@mgmlenz.com",
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
          return;
        }
        if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign(
            { user_id: user._id, phone },
            process.env.TOKEN_KEY,
            {expiresIn: "72h",}
          );
          user.token = token;
          res.status(200).json(user);
          return;
        }
        if (user && password===user.password){
          const token = jwt.sign(
            { user_id: user._id, phone },
            process.env.TOKEN_KEY,
            {expiresIn: "2h",}
          );
          user.token = token;
          res.status(200).json(user);
          return;
        }
        else{
          res.status(400).send("Invalid Password"); 
        }
        } 
    catch(error){
        res.status(500).json({message: error.message})
    }
})


module.exports = router;