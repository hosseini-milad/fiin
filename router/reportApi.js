const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router()
const auth = require("../middleware/auth");

router.get('/report', async (req,res)=>{
    try{
        res.json({status:"report done"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
module.exports = router;