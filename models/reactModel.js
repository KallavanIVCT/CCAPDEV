import mongoose from 'mongoose';

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


const React = reactSchema.model("React", reactSchema);
module.exports = React;