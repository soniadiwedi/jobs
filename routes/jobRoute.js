const express=require('express')
const JobModel = require('../model/job.model')
const router=express.Router()

router.post("/jobs",async(req,res)=>{
    try{
        const job=new JobModel(req.body)
        await job.save()
        res.status(200).send({message:"Job has been added"})
    }catch(err){
        res.status(500).send({messageL:"failed to added"})
    }
})

router.get("/",async(req,res)=>{
    try{
        const {role,sortBy,page,limit}=req.query
        const filter={}
        if(role){
            filter.role=role
        }
        const sort={}
        if(sortBy==="date"){
            sort.postedAt=-1
        }
        const skip=(Number(page)-1)*Number(limit)
        const jobs=await JobModel.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(Number(limit))
        res.json(jobs)
    }catch(err){
        res.status(500).send({messageL:"failed to added"})
    }
})


router.get("/jobs/search",async(req,res)=>{
    try{
        const {techstack}=req.query
        const regex=new RegExp(techstack,"i")
        const jobs=await JobModel.find({language:regex})
        res.json(jobs)
    }catch(err){
        res.status(500).send({message:"failed to search jobs"})
    }
})

module.exports=router