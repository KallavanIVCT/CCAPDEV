const Comment = require('../models/commentModel.js');
const express = require('express')

const router = express.Router();

const {upload} = require('../app.js');

router.post('/createComment', upload.none(), async (req,res)=>{
    
    const {post_id, commentText, parentComment} = req.body;
    const comment_uid = req.session.login_user ? req.session.login_user : null;
    if (!comment_uid){
        res.send({sessions: nothing});
    }
    try{
        //console.log(comment_uid);
        if (!commentText){ 
            
        }
        else{
            let c_parent_comment;
            if (parentComment)
                c_parent_comment = parentComment;
            else{
                c_parent_comment = null;
            }
            const result = await Comment.create({
                c_u_OID: comment_uid,
                c_body: commentText,
                c_post_id: post_id,
                c_parentComment: c_parent_comment,
            })
            res.redirect(`/api/post/getPost/${post_id}`);
        }
    } catch (e){
        console.log(e);
        return res.status(406).send(e);
    }
})
router.patch('/deleteComment', async(req,res)=>{
    const {comment_id} = req.body 
    console.log("EXPRESS" + comment_id);

    try{
        if (!comment_id){
            return res.status(404).send("no id found")
        }

        const update = {
            $set: {}
        }


        update.$set.c_body = "[DELETED COMMENT]";
        const result = await Comment.findByIdAndUpdate(comment_id,update);

        if(result){
            res.status(200).send("sucesfull in deleting")
        }else{
            res.status(405).send("cannot find id");
        }


    }catch(e){
        console.log(e);
        return res.status(406).send(e);
    }
})
router.post('/reactComment', async(req,res)=>{
    const {comment_id,user_id} = req.body;
    const {UP} = req.body;
    /*
    console.log("post_id:",post_id)
    console.log("UP:",UP)
    console.log("user_id:",user_id)
    */
    let returnComment = false;
    //what to do if user upvotes
    // check first if he has upvoted or downvoted
    console.log("WHAT VALUE " + UP);
    const userVotedComment = await Comment.findOne({_id:comment_id, c_reacted_by: {$elemMatch: {c_user: user_id}}});


    //find is basically  const foundElement = array.find(element => condition);
    if(userVotedComment){
        const result = userVotedComment.c_reacted_by.find(react => react.c_user.equals(user_id));

        console.log("What user voted previously", result.c_reactType);

        if(result.c_reactType === 'upvote' && UP === 'upvote'){ // if user has already upvoted and he wants to upvote

            const updatedComment = await Comment.updateOne({_id: comment_id, },
            {
                $inc: { c_upvotes: -1 },
                $pull: { c_reacted_by: { c_user: user_id} }, // Remove user reaction (if upvote exists)
            })
            returnComment = true;
        }
        if(result.c_reactType === 'downvote' && UP === 'downvote'){ // if user has already downvoted and he wants to downvote
            const updatedComment = await Comment.updateOne({_id: comment_id, },
                {
                    $inc: { c_downvotes: -1 }, 
                    $pull: { c_reacted_by: { c_user: user_id } },
                })
            returnComment = true;
        }
        if (result.c_reactType === 'upvote' && UP === 'downvote'){ // if user previously upvoted now he wants to downvote
            const updatedComment = await Comment.updateOne({_id: comment_id, 'c_reacted_by.c_user': user_id, 'c_reacted_by.c_reactType': 'upvote' },
                {
                    $set: {'c_reacted_by.$.c_reactType': UP},
                    $inc: { c_downvotes: 1, c_upvotes: -1 },
                })
            returnComment = true;
        }
        if (result.c_reactType === 'downvote' && UP === 'upvote'){
            const updatedComment = await Comment.updateOne({_id: comment_id, 'c_reacted_by.c_user': user_id, 'c_reacted_by.c_reactType': 'downvote' },
                {
                    
                    $set: {'c_reacted_by.$.c_reactType': UP},
                    $inc: { c_downvotes: -1, c_upvotes: 1 },
                })
            returnComment = true;
        }
    }
    else{
        if (UP === 'upvote'){
            const newVoteComment = await Comment.findByIdAndUpdate(comment_id, { $push: {c_reacted_by: {c_user:user_id, c_reactType: 'upvote'}},
            $inc: {c_upvotes: 1}},
            {new:true});
            returnComment = true;
        }
        if (UP === 'downvote'){
            const newVoteComment = await Comment.findByIdAndUpdate(comment_id, { $push: {c_reacted_by: {c_user:user_id, c_reactType: 'downvote'}},
                $inc: {c_downvotes: 1}},
            {new:true});
            returnComment = true;
        }
    }

    if (returnComment === true){
        const rez = await Comment.findById(comment_id);
        res.json({upvotes: rez.c_upvotes, downvotes: rez.c_downvotes})
    }

})


router.patch('/updateComment', upload.none(), async(req,res)=>{
    const {comment_id, bodyX} = req.body 
    console.log("EXPRESS" + comment_id);
    console.log(bodyX);

    try{
        if (!comment_id){
            return res.status(404).send("no id found")
        }

        const update = {
            $set: {}
        }


        update.$set.c_body = bodyX;
        const result = await Comment.findByIdAndUpdate(comment_id,update);

        if(result){
            res.status(200).send("sucesfull in UPDATING")
        }else{
            res.status(405).send("cannot find id");
        }


    }catch(e){
        console.log(e);
        return res.status(406).send(e);
    }
})



module.exports = router;