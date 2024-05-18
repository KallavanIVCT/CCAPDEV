import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        u_id:{
            type:Number,
            required:true,
        },
        u_username: {
            type: String,
            required:true,
            unique:true,
        },
        u_profilepic: {
            data:ArrayBuffer,
            type:String,
        },
        u_description:{
            type: String,
            required:false,
        }
    }
)

const User = reactSchema.model("User", userSchema);
module.exports = User;
