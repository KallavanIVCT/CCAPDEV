import mongoose, { Schema } from 'mongoose';

const reactSchema = mongoose.Schema(
    {
        r_id:{
            type:Number,
            required:true,
        },
        r_c_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
            required:true,
        },
        r_u_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required:true,
        },
        r_type:{
            type:String,
            enum:['liked','disliked'],
            required:true,
        },
    }
)


const React =  mongoose.model("React", reactSchema);
export { React } ;
