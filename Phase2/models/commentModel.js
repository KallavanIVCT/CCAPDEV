const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
    {
        c_u_OID:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        c_body:{
            type:String,
            required:true,
        },
        c_post_id:{
            type:mongoose.Schema.Types.ObjectId,
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
            default: Date.now,
        },
        c_image:{
            c_filename:{
                type: String,
                required:false,
                default: null,
            },
            c_filepath:{
                type:String,
                required:false,
                default: null,
            }
        },
        c_likes:{
            type: [mongoose.Schema.Types.ObjectId],
            default: [],
        },
        c_dislikes:{
            type: [mongoose.Schema.Types.ObjectId],
            default: [],
        },
        c_reacted_by:[{
            c_user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User',
                required:false,
            },
            c_reactType:{
                type:String,
                enum:['upvote','downvote'],
                required:false,
            }

        }],
        c_upvotes:{
            type:Number,
            required:true,
            default:0,
        },
        c_downvotes:{
            type:Number,
            required:true,
            default:0,
        },
    }
)

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;