import mongoose, { model } from 'mongoose';


const commentSchema = mongoose.Schema(
    {
        c_id:{
            type:Number,
        },
        c_body:{
            type:String,
            required:true,
            unique:true,
        },
        c_username:{
            type:String,
            required:true,
        },
        c_p_id:{
            type:Number,
            required:true,
        },
        c_parentComment:{
            type:String,
            required:false,
        },
        c_has_been_edited:{
            type:Boolean,
            required:false,
            default:false,
        }
    }
)

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;