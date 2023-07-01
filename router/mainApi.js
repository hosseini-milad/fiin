const express = require('express');
const router = express.Router()
const slider = require('../models/main/slider');
const authApi = require('./authApi');
const taskApi = require('./taskApi');
const productApi = require('./productApi');
const formApi = require('./formApi');
const formidable = require('formidable'); 
const mime = require('mime');

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
router.post('/upload',async (req,res)=>{
    try{
        console.log(req.body.file)
        var matches = req.body.file.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
        response = {};
        if (matches.length !== 3) {
        return new Error('Invalid input string');
        }
        
        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
        let extension = mime.extension(type);
        let fileName = `Fiin-${Date.now().toString()+"-"+req.body.imgName}`;
        
        try {
        fs.writeFileSync("./uploads/" + fileName, imageBuffer, 'utf8');
        return res.send({"status":"success",url:"./uploads/"+fileName});
        } catch (e) {
            res.send({"status":"failed",error:e});
        }
        res.json({message:"sliders"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.use('/auth', authApi)
router.use('/task', taskApi)
router.use('/product', productApi)
router.use('/form', formApi)
module.exports = router;