import mongoose, { model } from 'mongoose';


const commentSchema = mongoose.Schema(
    {
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
        },
        c_date:{
            type: Date,
            required:true,
            default: Date.now
        },
    }
)

const Comment = mongoose.model("Comment", commentSchema);

export { Comment } ;
