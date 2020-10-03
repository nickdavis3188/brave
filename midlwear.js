module.exports = (req,res,next) =>{
    let {email,userName,password} = req.body;
    console.log(email,userName,password)
    if(email && userName && password){
        next()
    }else{
        res.json({
            status:"error",
            msg:"could not submit your detail try agen"
        })
    }

}