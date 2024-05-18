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
            required:false,
        },
        u_description:{
            type: String,
            required:false,
        },
        u_password:{
            type:String,
            required:true,
        }
    }
)

const User =  mongoose.model("User", userSchema);
export { User } ;
