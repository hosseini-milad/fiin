const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router()
const auth = require("../middleware/auth");
const task = require('../models/main/task');
const LogCreator = require('../middleware/LogCreator');
const users = require('../models/auth/users');
const plans = require('../models/main/plans');
const sendMailAlert = require('../middleware/sendMailAlert');

router.get('/report', async (req,res)=>{
    try{
        res.json({status:"report done"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.get('/currentState',auth,jsonParser, async (req,res)=>{
    try{
        const userOwner = await users.findOne({_id:req.headers['userid']})

        if(userOwner.access === "customer"){
            res.status(500).json({message: "low privilage"})
            return
        }
        var limitState = {}
        if(userOwner.access === "agent"){
            limitState = {agentId:req.headers['userid']}
        }
        const allTasks= await task.aggregate([
            { $match:limitState},
            { $addFields: { "userId": { "$toObjectId": "$userId" }}},
            {$lookup:{
                from : "users", 
                localField: "userId", 
                foreignField: "_id", 
                as : "userDetail"
            }},{$sort:{prior:-1}}])
        const leadTask= await task.find({state:'lead',...limitState}).sort({'prior':1})
        const informationTask= await task.find({state:'informations',...limitState}).sort({'prior':1})
        const fiinTask= await task.find({state:'fiin',...limitState}).sort({'prior':1})
        
        const propertyTask= await task.find({state:'property',...limitState}).sort({'prior':1})
        const segurosTask= await task.find({state:'seguros',...limitState}).sort({'prior':1})
        const escrituraTask= await task.find({state:'escritura',...limitState}).sort({'prior':1})
        const commissionsTask= await task.find({state:'commissions',...limitState}).sort({'prior':1})
        const suspendedTask= await task.find({state:'suspended',...limitState}).sort({'prior':1})
        res.status(200).json({allTasks:allTasks,
            leadTask:leadTask,informationTask:informationTask,
            fiinTask:fiinTask,propertyTask:propertyTask,
            segurosTask:segurosTask,escrituraTask:escrituraTask,
            commissionsTask:commissionsTask,suspendedTask:suspendedTask
        })
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
const findStep=(state)=>{
    switch(state){
        case 'lead':return(0);
        case 'informations':return(1);
        case 'fiin':return(2);
        case 'property':return(3);
        case 'seguros':return(4);
        case 'escritura':return(5);
        case 'commissions':return(6);
        case 'suspended':return(7);
        default:return(-1);
    }
}
router.post('/changeState',auth,jsonParser, async (req,res)=>{
    const data={
        state:req.body.state,
        step:findStep(req.body.state),
        prior:req.body.prior*5+1
    }
    try{
        const userData = await users.findOne({_id:req.headers['userid']})

    const logData = await LogCreator(userData,"change State",
        `task no ${req.body.id}'s state change to ${data.state}`)
        const leadTask= await task.updateOne({_id:req.body.id},
            {$set:data})
        //if(leadTask)
        res.json({status:"report done",data:leadTask})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/changeOrder',auth,jsonParser, async (req,res)=>{
    const tasks = req.body.tasks
    try{
        const userData = await users.findOne({_id:req.headers['userid']})

        const logData = await LogCreator(userData,"change Sort",
        `task sort by: ${tasks}`)
    
   for(var i = 0;i<tasks.length;i++){
    const updateState = await task.updateOne({_id:tasks[i]},{$set:{prior:i*5+3}})
    }
       
        //if(leadTask)
        res.json({status:"sort done"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/changeTask',auth,jsonParser, async (req,res)=>{
    const data={
        state:req.body.state,
        step:findStep(req.body.state),
        tag:req.body.tag,
    }
    try{
        const userData = await users.findOne({_id:req.headers['userid']})

    const logData = await LogCreator(userData,"change State",
        `task no ${req.body.id}'s state change to ${data.state} and tag to ${data.tag}`)
        const userDetail = await users.findOne({_id:req.body.userId});
        await sendMailAlert(userDetail.email,"Your Proposal Sets by administrator please visit Fiin profile")
        const leadTask= await task.updateOne({userId:req.body.userId},
            {$set:data})
        //if(leadTask)
        res.json({status:"report done",data:leadTask})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/confirm-proposal',auth,jsonParser, async (req,res)=>{
    const data={
        state:req.body.state,
        step:findStep(req.body.state),
        tag:req.body.tag,
    }
    try{
        const userData = await users.findOne({_id:req.headers['userid']})

    const logData = await LogCreator(userData,"change State",
        `task no ${req.body.id}'s state change to ${data.state} and tag to ${data.tag}`)
        const leadTask= await task.updateOne({userId:req.headers['userid']},
            {$set:data})
            //await sendMailAlert(userDetail.email,"Your Proposal Sets by administrator please visit Fiin profile")
        await plans.updateOne({_id:req.body.taskId},
        {$set:{selectedPlan:"true"}})

        //if(leadTask)
        res.json({message:"proposal Confirmed",data:leadTask})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
module.exports = router;