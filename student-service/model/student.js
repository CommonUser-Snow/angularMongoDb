//create a model
const express = require("express")
const mongoose=require("mongoose")
const Autoincrement=require("mongoose-sequence")(mongoose)

const studentSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    gender:{type:String}
})

studentSchema.plugin(Autoincrement,{inc_field:"studentId"});
const Student = mongoose.model("Student",studentSchema);
module.exports= Student;