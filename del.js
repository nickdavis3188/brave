const jwt = require("jsonwebtoken")
const crypto = require("crypto")
require('dotenv').config()
// const bcrypt = require("bcryptjs")
// bcrypt.compare("davis3188",'$2a$10$.mQuNIhxhw1j7Mtw/HEYv.W/q6IGSgG0jG07rVlo3yXu4AmjUuaYm',(err,res) =>{
//     if(err){
//         console.log(err)
//     }
//     console.log(res)
// })

// jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjZmYTk2ZDVkYTQzYjA3NmNjMzM3NTYiLCJ1c2VyTmFtZSI6Im5pY2tkYXZpcyIsImltYWdlIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwL3VwbG9hZHMvbXlGaWxlLTE2MDExNTMzODgzMzQuanBlZyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYwMTMzNzE1NywiZXhwIjoxNjAxMzQwNzU3fQ.pIOs7HR2SWn_2pd6hEWE5K-n-BfcltJTmvGSQg6Lxw8",process.env.TOKEN_KEY,(err,decode)=>{
//         if(err){
//            console.log(err) 
//         }else{
//               console.log(decode)
//         }
// })
// crypto.randomBytes(20,function(err,buf){
//       if(err){
//         console.log(err)
//       }else{
//           var token = buf.toString("hex");
//           console.log(token)
//       }
// })
// if(Date.now()+ 60*60*1000 > Date.now()){
//       console.log("true")
// }else{
//       console.log("false")
// }
if(1601611903451 > Date.now()){
      console.log("true")
}else{
      console.log("false")
}
console.log(1601611903451 )
console.log(Date.now())
console.log(Date.now()+600000)
if(1601609626429 > Date.now()){
      console.log("yes")
}else{
      console.log("not true")
}