
const mongoose = require('mongoose');

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
            enum: ['Genshin Impact', 'Honkai Star Rail', 'Honkai Impact', 'Zenless Zone Zero', 'Mihoyo'],
            required:false,
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
        },
        p_image:{
            p_filename:{
                type: String,
                required:false,
            },
            p_filepath:{
                type:String,
                required:false,
            }
        }
    }
)

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
