const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()
// module.exports = (req,res,next) =>{
//     try{
//         const decoded = jwt.verify("token",process.env.TOKEN_KEY)
//         console.log(decoded)
//         req.dataBody = decoded
//         next()
//     }catch(err){

//     }
//     =>{
//         if(err){
//             res.json({
//                 status:"jwt error",
                
//             })
//         }
//         if(decoded == undefined){
//             console.log("NOT GOOD")
//         }else{
           
//         }
//     })
// }
const token = jwt.sign({
   name,
    userName:user[0].userName,
    image:user[0].img,
    isAdmin:user[0].isAdmin
},process.env.TOKEN_KEY,
{
    expiresIn:"3h"
})

try{
    const decoded = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjZkNmZkN2RmODc3ODE4Mzg0OGVmODUiLCJ1c2VyTmFtZSI6Im5pY2tkYXZpcyIsImltYWdlIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwL215RmlsZS0xNjAxMDA3NTc0OTY5LmpwZWciLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjAxMDUxNjkzLCJleHAiOjE2MDEwNzY4OTN9.5LSVC6SLZ2oiLp0xT3I4ClRwiVqErMiBVYg40Gz8Bg0",process.env.TOKEN_KEY)
    console.log(decoded)
    // req.dataBody = decoded
    // next()
}catch(err){
    console.log(err)
}
// console.log(process.env)