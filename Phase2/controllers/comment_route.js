const Comment = require('../models/commentModel.js');
const express = require('express')

const router = express.Router();

const {upload} = require('../app.js');

router.post('/createComment', async (req,res)=>{
    
    const {comment_uid, post_id, text, parentComment} = req.body;
    try{
        console.log(comment_uid);
        if (!text){ 
            res.status(405).send("incomplete fields");
        }
        else{
            let c_parent_comment;
            if (parentComment)
                c_parent_comment = parentComment;
            else
                c_parent_comment = null;
            
            const result = await Comment.create({
                c_u_OID: comment_uid,
                c_body: text,
                c_post_id: post_id,
                c_parentComment: c_parent_comment,
            })
            return res.status(200).send("success");
        }
    
    } catch (e){
        console.log(e);
        return res.status(406).send(e);
    }
})

module.exports = router;