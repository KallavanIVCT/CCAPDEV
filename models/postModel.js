
import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
    {
        p_title:{
            type:String,
            required:true,
            unique:true,
        },
        p_body:{
            type:String,
            required:true,
        },
        p_u_OID:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required:true,
        },
        p_tags:{
            type:String,
            enum: ['anime', 'manga', 'movies', 'politics'],
        },
        p_has_been_edited:{
            type:Boolean,
            required:false,
            default:false,
        },
        p_date:{
            type: Date,
            required:true,
            default: Date.now
        }
    }
)

const Post = mongoose.model("Post", postSchema);
export { Post } ;
