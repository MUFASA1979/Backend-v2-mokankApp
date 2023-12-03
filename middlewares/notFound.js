const express = require("express");

exports.notFound = async (req,res,next)=>{
    try {
        res.status(404).json({msg:"Path Not Found!"})
        
    } catch (error) {
        next(error)
    }
}