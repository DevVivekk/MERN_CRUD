const mongoose = require('mongoose');
require("dotenv").config();
mongoose.connect(process.env.MONGO)
.then((response)=>{
    console.log('Connection Successfull!')
})
.catch((error)=>{
    console.log(`error is ${error}`)
})
const dataSchema = new mongoose.Schema({
 name:{
    type: String,
    required:true
 },
 comment:{
    type: String,
    required:true
 }
})

const dataModel = new mongoose.model('comments',dataSchema)

module.exports = dataModel;
