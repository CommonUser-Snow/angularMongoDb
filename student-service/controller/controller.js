// implenment CRUD apis-create controller
const express = require("express")
const mongoose=require("mongoose")
const Student = require("../model/student")
const router= express.Router()

//get
router.get("/api/v1/students",async(req,res)=>{
    try{
        const students = await Student.find({});        
        res.send(students);
    }catch(err){
        console.error(err);
        res.status(500).send(err);
    }
});
//Post
router.post("/api/v1/students",async(req,res)=>{
    try{
        console.log(`Connected to successfully`)
        const studentObj = new Student({name:req.body.name,email:req.body.email,gender:req.body.gender})
        const student = await studentObj.save();
        res.send(student);
    }catch(err){
        console.error(err);
        res.status(500).send(err);
    }
});

//Put
router.put("/api/v1/students/:studentId",async(req,res)=>{
    try{
        const id= Number(req.params.studentId);
        const studentquery = {studentId:id};

        const studentObj = await Student.updateOne(studentquery,req.body);
        res.send(studentObj);
    }catch(err){
        console.error(err);
        res.status(500).send(err);
    }
});

//Delete
router.delete("/api/v1/students/:studentId",async(req,res)=>{
    try{
        const id= Number(req.params.studentId);
        const studentquery = {studentId:id};

        const studentObj = await Student.deleteOne(studentquery,req.body);
        res.send(studentObj);
    }catch(err){
        console.error(err);
        res.status(500).send(err);
    }
});

module.exports = router;