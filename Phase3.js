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
const reactSchema = mongoose.Schema(
    {
        r_id:{
            type:Number,
            required:true,
        },
        r_c_id:{
            type:Number,
            required:true,
        },
        r_u_id:{
            type:Number,
            required:true,
        },
        r_type:{
            type:String,
            enum:['liked','disliked'],
            required:true,
        },
    }
)


//export const Book= mongoose.model('Cat', userSchema);