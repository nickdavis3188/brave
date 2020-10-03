const mongoose = require("mongoose")
const Schema = mongoose.Schema

const postSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required:true
    },
    file:{
        type:String,
        required:true
    },
   
    comment:{
        type:Array,
        default:[],
        required:true
    }
},{
    collection:"post"
});
const models = mongoose.model("post",postSchema) 
module.exports = models