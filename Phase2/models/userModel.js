const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        u_username: {
            type: String,
            required:true,
            unique:true,
        },
        u_profilepic: {
            data:ArrayBuffer,
            type:String,
            required:false,
        },
        u_description:{
            type: String,
            required:false,
        },
        u_password:{
            type:String,
            required:true,
        },
        u_date:{
            type:Date,
            default: Date.now,
            required:true,
        },
        u_birthdate:{
            type:Date,
            required:true,
        },
        u_displayname:{
            type:String,
            required:true,
        }
    }
)

const User =  mongoose.model("User", userSchema);
module.exports = User;
