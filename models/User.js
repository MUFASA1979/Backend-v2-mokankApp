const {model, Schema} = require("mongoose");

const UserSchema = new Schema({
    phonenumber:{type: String, unique:true, required:true},
    password: {type: String, required: true},
    
});

module.exports = model("User", UserSchema)