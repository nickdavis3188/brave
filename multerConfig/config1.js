const multer = require("multer")
const path = require("path")
var storage = multer.diskStorage({
    destination:"./public/uploads/",
    filename:function(req,file,cb){
        cb(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})
const upload1 = multer({
    storage:storage,
    fileFilter:function(req,file,cb){
        onlyImg(file,cb)
    }
})
const onlyImg = (file,cb) =>{
    const fileTyps = /jpeg|jpg|png|gif/;
    const fileNameExe = fileTyps.test(path.extname(file.originalname).toLowerCase())
    const minetyps = fileTyps.test(file.mimetype)
    if(fileNameExe && minetyps){
        cb(null,true)
    }else{
        cb(null,false)
    }
}
module.exports = upload1