const express = require("express")
const mongoose = require("mongoose");
const router = require("./route");
const cors = require("cors")
require("dotenv").config()
const path = require('path')

mongoose.connect("mongodb+srv://braveharted:davis3188@cluster0.f90pa.mongodb.net/myBlog?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true})
const db = mongoose.connection;

db.on("error",function(err){
    console.log(err)
});
db.once("open",function(){
    console.log(`database is connected`);
});

const app = express()

// cors for api
app.use(cors())

// body parser
app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use(express.static(path.join(__dirname,"public")))

// mongodb://heroku_lr2pcd1z:ubef97mv2qeaf4dv3mp4avo373@ds019936.mlab.com:19936/heroku_lr2pcd1z
// router
app.use("/",router)

app.listen(process.env.PORT || 5000,()=>{
    console.log("server start at pot 5000")
})