const express = require("express");
const multer = require("multer");
const app = express();
const path = require("path")


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, "Images");
    },
    filename: (req,res,cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    },
});

const upload = multer({
    storage: storage,

    fileFilter: (req,file,cb)=>{
        if(
            file.mimetype == "image/png" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg"
        ){
            cb(null, true)
        }else{
            console.log("Only .jpg or .png files are supported");
            cb(null, true)
        }
    },
    limits:{ fileSize: 1024*1024*2}
})