
const Post = require('../models/postModel.js');
const User = require('../models/userModel.js');
const Comment = require('../models/commentModel.js');
const express = require('express');
const nodemon = require('nodemon');

const router = express.Router();

const {upload} = require('../app.js');


router.post('/createPost', upload.single('image'), async (req,res)=>{
    
    const {id, title, body, tags} = req.body;
    const {filename, path: filepath} = req.file;
    try{
        if (!id || !title || !body){ //no need to check tags since not required
            req.status(405).send("incomplete fields");
        }
        else{
            const result = await Post.create({
                p_title: title,
                p_body: body,
                p_u_OID: id,
                p_tags: tags, // if tags undefined mongo auto handles this
                p_image:{
                    p_filename: filename,
                    p_filepath: filepath,
                }
            })
            res.render('success',{
                layout:'index',
                message: true,
            })
        }
    
    } catch (e){
        console.log(e);
        return res.status(406).send(e);
    }
})
router.get('/getPost', async (req,res)=>{



    const isLoggedIn = req.query.isLoggedIn === 'true';
    const sort = req.query.sort || 'p_date';
    const tags = req.query.tags
    const searchquery = req.query.query;

    /*
    console.log(isLoggedIn);
    console.log(tags);
    console.log(sort);
    */

    let query = {}
    if(tags && tags !== 'All')
    {
        query.p_tags = tags;
    }
    if (searchquery)
    {
        query.p_title = {$regex: searchquery, $options: 'i'};
    }

    let sorting = {};

    if (sort === 'upvotes'){
        sorting.upvotes = -1;
    }else{
        sorting.p_date = 1;
    }



    try{

        const result = await Post.find(query).sort(sorting).populate('p_u_OID').lean(); //lean is to make mongoose object to js objects, populate is putting objects in the p_u_OID
        if(result){
            
            res.render('main_page',{
                layout:'index',
                postdetails:result,
                isLoggedIn: isLoggedIn,
            })
        }else{
            res.status(404).send("no post found")
        }
    }
    catch(e){
        console.log(e);
        return res.status(406).send(e);
    }
})

//Dummy data for comments, remove in MCO3
/*
const comments = [{
    c_id: 123, c_body:'asdasdadssadasd', c_username:'qmork', c_post_id: "668ccdb2463f3ef61ee1b665", c_parentComment: null, c_has_been_edited: true, c_Date: (new Date()).toISOString().split('T')[0], c_image: null, c_likes: ["qmork","focalors","gravityzero","lyney"], c_dislikes: ["kirae","kallavan","tuonto"]
},{ c_id: 124, c_body:'dasdasdasdas', c_username:'gravityzero', c_post_id: "668ccdb2463f3ef61ee1b665", c_parentComment: 123, c_has_been_edited: false, c_Date: (new Date()).toISOString().split('T')[0], c_image: null, c_likes: ["gravityzero", "focalors", "kallavan", "lyney"], c_dislikes: ["qmork", "kirae", "tuonto"]
},{ c_id: 125, c_body:'boowomp', c_username:'qmork', c_post_id: "668ccdb2463f3ef61ee1b665", c_parentComment: null, c_has_been_edited: false, c_Date: (new Date()).toISOString().split('T')[0], c_image: null, c_likes: ["tuonto", "kallavan", "kirae", "gravityzero", "qmork"], c_dislikes: ["focalors", "lyney"]
},{ c_id: 126, c_body:'heehee', c_username:'kirae', c_post_id: "668ccdb2463f3ef61ee1b665", c_parentComment: 124, c_has_been_edited: false, c_Date: (new Date()).toISOString().split('T')[0], c_image: null, c_likes: ["lyney"], c_dislikes: ["focalors", "kirae", "gravityzero", "kallavan", "tuonto", "qmork"]
},{ c_id: 127, c_body:'dasdasdasdas', c_username:'focalors', c_post_id: "668ccdb2463f3ef61ee1b665", c_parentComment: 126, c_has_been_edited: true, c_Date: (new Date()).toISOString().split('T')[0], c_image: null, c_likes: ["kirae", "qmork", "lyney"], c_dislikes: ["focalors", "gravityzero", "kallavan", "tuonto"]
},{ c_id: 128, c_body:'womp womp womp', c_username:'kallavan', c_post_id: "668ccdb2463f3ef61ee1b665", c_parentComment: 124, c_has_been_edited: true, c_Date: (new Date()).toISOString().split('T')[0], c_image: null, c_likes: ["kallavan", "focalors", "qmork"], c_dislikes: ["kirae", "tuonto", "gravityzero", "lyney"]
}];*/

router.get('/getPost/:id', async(req, res) => {
    const { id } = req.params;
    const { isLoggedIn } = req.query;

    try {
        const result = await Post.findById(id).populate('p_u_OID').lean();
        const comments = await Comment.find({ c_post_id: result._id }).populate('c_u_OID').lean();

        console.log(result._id);
        console.log(JSON.stringify(comments, null, 2));

        // Sort comments table
        const commentMap = new Map();
        comments.forEach(comment => {
            comment.replies = [];
            commentMap.set(comment._id.toString(), comment); // Ensure the key is a string
        });

        const nestedComments = [];
        comments.forEach(comment => {
            if (comment.c_parentComment) {
                const parent = commentMap.get(comment.c_parentComment.toString());
                if (parent) {
                    parent.replies.push(comment);
                } else {
                    // If parent comment is not found, push it to top level (optional based on your requirements)
                    nestedComments.push(comment);
                }
            } else {
                nestedComments.push(comment);
            }

            comment.c_numLikes = comment.c_likes.length;
            comment.c_numDislikes = comment.c_dislikes.length;

            comment.c_date = comment.c_date.toISOString().split('T')[0];

            // TODO for MCO3: Check if Session is the Author of the comment
            comment.c_isAuthor = (comment.c_username === "qmork");
        });

        console.log(JSON.stringify(nestedComments, null, 2));

        if (result) {
            res.render('post_page', {
                layout: 'index',
                postdetails: result,
                commentdetails: nestedComments,
                isLoggedIn: isLoggedIn,
            });
        } else {
            res.status(404).send("no post found");
        }
    } catch (e) {
        console.log(e);
        return res.status(406).send(e);
    }
});



router.post('/reactPost', async(req,res)=>{
    const {post_id,user_id} = req.body;
    const {UP} = req.body;

    console.log("post_id:",post_id)
    console.log("UP:",UP)
    console.log("user_id:",user_id)

    //what to do if user upvotes
    // check first if he has upvoted or downvoted

    const userVotedPost = await Post.findOne({_id:post_id, reacted_by: {$elemMatch: {user: user_id}}});

    //find is basically  const foundElement = array.find(element => condition);
    if(userVotedPost){
        const result = userVotedPost.reacted_by.find(react => react.user.equals(user_id));

        console.log("What user voted previously", result.reactType);

        if(result.reactType === 'upvote' && UP === 'upvote'){ // if user has already upvoted and he wants to upvote

            const updatedPost = await Post.updateOne({_id: post_id, },
            {
                $inc: { upvotes: -1 },
                $pull: { reacted_by: { user: user_id} }, // Remove user reaction (if upvote exists)
            })
        }
        if(result.reactType === 'downvote' && UP === 'downvote'){ // if user has already downvoted and he wants to downvote
            const updatedPost = await Post.updateOne({_id: post_id, },
                {
                    $inc: { downvotes: -1 }, 
                    $pull: { reacted_by: { user: user_id } },
                })
        }
        if (result.reactType === 'upvote' && UP === 'downvote'){ // if user previously upvoted now he wants to downvote
            const updatedPost = await Post.updateOne({_id: post_id, 'reacted_by.user': user_id, 'reacted_by.reactType': 'upvote' },
                {
                    $set: {'reacted_by.$.reactType': UP},
                    $inc: { downvotes: 1, upvotes: -1 },
                })
        }
        if (result.reactType === 'downvote' && UP === 'upvote'){
            const updatedPost = await Post.updateOne({_id: post_id, 'reacted_by.user': user_id, 'reacted_by.reactType': 'downvote' },
                {
                    $set: {'reacted_by.$.reactType': UP},
                    $inc: { downvotes: -1, upvotes: 1 },
                })
        }
    }
    else{
        if (UP === 'upvote'){
            const newVotePost = await Post.findByIdAndUpdate(post_id, { $push: {reacted_by: {user:user_id, reactType: 'upvote'}},
            $inc: {upvotes: 1}},
            {new:true},
        );
        }
        if (UP === 'downvote'){
            const newVotePost = await Post.findByIdAndUpdate(post_id, { $push: {reacted_by: {user:user_id, reactType: 'downvote'}},
                $inc: {downvotes: 1}},
            {new:true});
        }
    }

})

router.patch('/updatePost', async(req,res)=>{
    
    const {title, body, id, tags} = req.body;

    try{

        if(!id){
            res.status(405).send("no id provided")
        }

        const update = {
            $set: {}
        }

        if (title){
            update.$set.p_title = title;
        }
        if (body){
            update.$set.p_body = body;
        }
        if (tags){
            update.$set.p_tags = tags;
        }

        const result = await Post.findByIdAndUpdate(id,update);
        if(result){
            return res.status(200).send("sucesfully in updating");
        }else{
            return res.status(405).send("error in updating");
        }
    }catch(e){
        console.log(e);
        return res.status(406).send(e);
    }
})

router.delete('/deletePost/:id', async(req,res)=>{
    const {id} = req.params // meaning url like /deletePost/664960f2e743681a290ca483

    try{
        if (!id){
            return res.status(404).send("no id found")
        }

        const result = await Post.findByIdAndDelete(id);
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

//TODO MCO2: Server-side AJAX for React Comments
router.post('/reactComment', function(req, res){
    const c_id = Number(req.body.c_id);
    comments.findOne({id: c_id}, function(){});
});


module.exports = router;
