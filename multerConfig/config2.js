const multer = require("multer")
const path = require("path")
const storage = multer.diskStorage({
    destination:"./public/uploads/",
    filename:(req,file,cb) =>{
        cb(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})
const upload2 = multer({
    storage:storage,
    fileFilter:function(req,file,cb){
        onlyImg(file,cb)
    }
})
const onlyImg = (file,cb) =>{
    const fileTyps = /jpeg|jpg|png|gif|MP4|3GP|webp/;
    const fileNameExe = fileTyps.test(path.extname(file.originalname))
    const minetyps = fileTyps.test(file.mimetype)
    if(fileNameExe && minetyps){
        cb(null,true)
    }else{
        cb(null,false)
    }
}
module.exports = upload2