const mongoose = require("mongoose")

const Schema = mongoose.Schema

 const userSchema = new Schema({
     email:{
         type:String,
         required:true
     },
     userName:{
         type:String,
         required:true
     },
     pwd:{
         type:String,
         required:true
     },
     img:{
         type:String,
         required:true
     },
     isAdmin:{
         type:Boolean,
         required:true,
         default:false
     },
     restPasswordToken:String,
     resetPasswordExpires:Number

 },{ collection:"users"})

 const userModels = mongoose.model("users",userSchema)
 module.exports = userModels