const express = require("express")
const router = express.Router()
const PostSchema = require("./schemaP")
const UserSchema = require("./userSchema")
const multer = require("multer")
const upload1 = require("./multerConfig/config1")
const upload2 = require("./multerConfig/config2")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const  nodemailer = require("nodemailer")
const sendMail = require("./mailConfig")


router.get("/",(req,res) =>{
    res.json({
        statt:"ok",
        msg:"xup"
    })
})

router.post("/register",upload1.single("myFile"),function(req,res){
    const {email,password,userName} = req.body
    UserSchema.find({email:email},function(err,user){
        if(err){
            console.log(err)
        }else{
            if(user.length >= 1){
                res.json({
                    status:"error",
                    msg:"Email already exist"
                })
            }else{
                bcryptjs.genSalt(10,function(err,salt){
                    bcryptjs.hash(password,salt,function(err,hash){
                        const data ={
                            email:email,
                            userName:userName,
                            pwd:hash,
                            img: "https://braveharted.herokuapp.com/uploads/" + req.file.filename,
                            isAdmin:false
                        }
                        const dbShema = new UserSchema(data)
                        dbShema.save(function(err){
                            if(err){
                                console.log(err)
                            }else{
                                res.json({
                                    status:"success",
                                    msg:"SignUp successfull"
                                })
                            }
                        })
                    })
                })
                
            }
        }
    })
  
 
})


router.post("/login",(req,res) =>{
    let {email,password} = req.body 
    console.log(email,password)
    UserSchema.find({email:email},(err,user)=>{
        if(err){
            console.log(err)
        }else{
            if(user.length < 1){
                res.json({
                    status:"error",
                    msg:"Email not exist"
                })
            }else{
                console.log(user)
                // confirm password
                bcryptjs.compare(password,user[0].pwd,(err,result) =>{
                    if(err){
                        res.json({
                            status:"error",
                            msg:"Auth failed"
                        })
                    }
                    
                    if(result){
                        const token = jwt.sign({
                             userId:user[0]._id,
                             userName:user[0].userName,
                             image:user[0].img,
                             isAdmin:user[0].isAdmin
                         },"davisSecret",
                         {
                             expiresIn:"24h"
                         })
                      
                        res.json({
                            status:"success",
                            msg:"login successfull",
                            token
                        })
                         
                         
                    }else{
                        res.json({
                            status:"error",
                            msg:"invalied password"
                        })
                    }
                })

            }

        }

    })
   
})
router.post("/verifyToken",(req,res)=>{
    let {token} = req.body
    if(token){
     
        jwt.verify(token,"davisSecret",(err,decode)=>{
            if(err){
                res.json({
                    status:"error",
                    msg:err
                })
            }else{
                res.json({
                    status:"success",
                    userInfo:decode
                })
            }
        })
 
    }else{
        res.json({
            status: "error",
            msg:"no token avilable pls login"
        })
    }
})

router.post("/verify",(req,res)=>{
    let {token} = req.body
    if(token){
        
        jwt.verify(token,"davisSecret",(err,decode)=>{
            if(err){
                res.json({
                    status:"error",
                    msg:err
                })
            }else{
                res.json({
                    status:"success",
                    userInfo:decode
                })
            }
        })
            
      
    }else{
        res.json({
            status: "error",
            msg:"no token avilable pls login"
        })
    }
   
})
router.post("/verifyLog",(req,res)=>{
    let {token} = req.body
    if(token){
       
        jwt.verify(token,"davisSecret",(err,decode)=>{
            if(err){
                res.json({
                    status:"error",
                    msg:err
                })
            }else{
                res.json({
                    status:"success",
                    userInfo:decode
                })
            }
        })
     
    }else{
        res.json({
            status: "error",
            msg:"no token avilable pls login"
        })
    }
  
})
router.post("/verifyNav",(req,res)=>{
    let {token} = req.body
    if(token){
       
        jwt.verify(token,"davisSecret",(err,decode)=>{
            if(err){
                res.json({
                    status:"error",
                    msg:err
                })
            }else{
                res.json({
                    status:"success",
                    userInfo:decode
                })
            }
        })
     
    }else{
        res.json({
            status: "error",
            msg:"no token avilable pls login"
        })
    }
  
})


router.post("/admini",upload2.single("myFiles"),(req,res) =>{
    let {title,body} = req.body
    const data = {
        title:title.toUpperCase(),
        body:body,
        file:process.env.SERVER_URL+ "uploads/" + req.file.filename,
        comment:[]
    }
    const postDb = new PostSchema(data)
    postDb.save(function(err){
        if(err){
            res.json({
                status:"error",
                msg:err
            })
        }else{
            res.json({
                status:"success",
                msg:"post successfully sent"
            })
        }
    })
})
router.get("/post/:id",(req,res) =>{
    console.log(req.params.id)
    PostSchema.find({_id:req.params.id},function(err,post){
        if(err){
            console.log(err)
        }else{
            console.log(post)
            res.json({
                status:"success",
                mainPost:post
            })
        }
    })
})

router.post("/insertComment",(req,res)=>{
    let {text,postId,image,userName} = req.body
        const data22 ={
            name:userName,
            body:text,
            img:image
        }
    PostSchema.updateOne({_id:postId},{$push:{comment:data22}},err =>{
        if(err){
            console.log(err)
            res.json({
                status:"error",
                msg:"comment send"
            })
        }else{
            res.json({
                status:"success",
                msg:"comment send"
            })
        }
    })
})

router.get("/allPost",(req,res)=>{
    PostSchema.find({},(err,posts)=>{
        if(err){
            console.log(err)
        }else{
            if(posts){
                res.json({
                    status:"success",
                    item:posts
                })
            }else{
                console.log("no post")
            }
            
        }
    })
})

router.get("/all",(req,res)=>{
    PostSchema.find({},(err,posts)=>{
        if(err){
            console.log(err)
        }else{
            if(posts){
                res.json({
                    status:"success",
                    item:posts
                })
            }else{
                console.log("no post")
            }
            
        }
    })
})
router.get("/mysinglepost",(req,res)=>{
    PostSchema.find({},(err,posts)=>{
        if(err){
            console.log(err)
        }else{
            if(posts){
                res.json({
                    status:"success",
                    item:posts
                })
            }else{
                console.log("no post")
            }
            
        }
    })
})
// password reset
router.post("/forgot",function(req,res){
    crypto.randomBytes(20,function(err,buf){
        if(err){
          console.log(err)
        }else{
            var token = buf.toString("hex");
            
            UserSchema.findOne({email:req.body.email},function(err,user){
                if(err){
                    console.log(err)
                }else{
                     if(!user){
                    res.json({
                        status:"error",
                        msg:"No user with this email"
                    })
                }else{
                    UserSchema.updateOne({email:req.body.email},{$set:{restPasswordToken:token, resetPasswordExpires:Date.now()+60*10*1000}},function(err){
                        
                        if(!err){
                            var transporter = nodemailer.createTransport({
                                service: 'Gmail',
                                auth: {
                                user: 'braveharted33@gmail.com',
                                pass: "hartedbrave@33"
                                }
                            });
                                
                            var mailOptions = {
                                from: 'braveharted33@gmail.com',
                                to: user.email,
                            subject:"Reset password",
                            text:`you are receiving this because you (or someone else) have requested the reset of password \n,
                                please click the on the following link paste it into your browser to complete the process \n
                                ${process.env.SERVER_URL}resetPWD#${token} \n\n
                                if you did not request this, please ignore this email and your password will remaind unchange.
                                `
                            }
                            transporter.sendMail(mailOptions,function(err){
                                if(err){
                                    res.json({
                                        status:"error",
                                        msg:"somthing went wrong pls try agen"
                                    })
                                }else{
                                   res.json({
                                       status:"success",
                                       msg:"A token is being sent to your email pls confirm it and reset your password"
                                   })
                                }
                            })
                        }else{
                            console.log(err);
                            
                        }
                    })
                }
                }
               
            })
        }
    })
});

// main reset pwd
router.post("/resetPWD/:token",(req,res)=>{
    
    UserSchema.findOne({restPasswordToken:req.params.token,resetPasswordExpires:{$gt: Date.now()}},function(err,resetUser){
        if(!resetUser){
            res.json({
                status:"error",
                msg:"The restPasswordToken has expire or incorrect. To get new token click on the forgot password link, enter your email etc..."
            })
        }else{
            bcryptjs.genSalt(10,function(err,salt){
                bcryptjs.hash(req.body.password,salt,function(err,hash){
                    UserSchema.updateOne({email:resetUser.email},{$set:{pwd:hash,restPasswordToken:undefined, resetPasswordExpires:undefined}},function(err){
                        if(err){
                            console.log(err)
                        }else{
                            
                            var mailTransporter = nodemailer.createTransport({
                                service:"Gmail",
                                auth:{
                                    user: 'braveharted33@gmail.com',
                                    pass: "hartedbrave@33"
                                }
                            });
                            var mailOption = {
                                to: resetUser.email,
                                from:'braveharted33@gmail.com',
                                subject:"Reset password",
                                text:`congratulations ${resetUser.name}, this is to confirm that your password has been successfully reset`
                            }
                            mailTransporter.sendMail(mailOption,function(err){
                                if(!err){
                                    res.json({
                                        status:"success",
                                        msg:"Password reset successfully"
                                    })
                                }else{
                                    res.json({
                                        status:"error",
                                        msg:"sorry somthing went wrong. If this continue pls contact us for for solutions"
                                    })
                                }
                            })  
                        }
                    })
                })
            })
        }
    })
})

router.post("/mail",(req,res)=>{
    let {email,subject,text} = req.body
    sendMail(email,subject,text,(err,resul)=>{
        if(err){
            console.log(err)
        }else{
            res.json({
                status:"success",
                msg:"Mail successfully sent"
            })
        }
    })
})

module.exports = router