const mongoose=require("mongoose")
const db = mongoose.connect("mongodb://localhost:27017/student_master")
.then(()=>console.log(`Connected to MongoDB successfully`))
.catch((err)=>console.error(err));
module.exports=db;