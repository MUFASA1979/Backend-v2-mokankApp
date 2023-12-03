const express = require("express");

exports.errorHandler = async (err,req,res,next)=>{
    try {
        res.status(err.statusCode || 500).json(err.message || "Something Wrong with Server")
        
    } catch (error) {
        next(error)
    }

};