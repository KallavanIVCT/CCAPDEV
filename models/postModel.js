
import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
    {
        p_id:{
            type:Number,
            required:true,
        },
        p_title:{
            type:String,
            required:true,
            unique:true,
        },
        p_body:{
            type:String,
            required:true,
        },
        p_u_username:{
            type:String,
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
    }
)

const Post = mongoose.model("Post", postSchema);
module.exports = Post;