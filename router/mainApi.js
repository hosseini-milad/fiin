const express = require('express');
const router = express.Router()
const slider = require('../models/main/slider');
const authApi = require('./authApi');
const taskApi = require('./taskApi');
const productApi = require('./productApi');

router.get('/main', async (req,res)=>{
    try{
        const sliders = await slider.find()

        //logger.warn("main done")
        res.json({sliders:sliders})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.use('/auth', authApi)
router.use('/task', taskApi)
router.use('/product', productApi)
module.exports = router;