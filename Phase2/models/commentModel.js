const mongoose = require('mongoose');

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
        c_post_id:{
            type:Number,
            required:true,
        },
        c_parentComment:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
            required: false,
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
        c_image:{
            c_filename:{
                type: String,
                required:false,
            },
            c_filepath:{
                type:String,
                required:false,
            }
        },
    }
)

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;