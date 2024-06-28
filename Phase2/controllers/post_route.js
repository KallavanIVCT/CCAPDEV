
const Post = require('../models/postModel.js');
const User = require('../models/userModel.js');
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
            return res.status(404).json({"result": "succesfully"})
        }
    
    } catch (e){
        console.log(e);
        return res.status(406).send(e);
    }
})
router.get('/getPost', async (req,res)=>{



    const isLoggedIn = req.query.isLoggedIn === 'true';
    console.log(isLoggedIn);

    let query = {}

    const sort = req.query.sort || 'p_date';
    const tags = req.query.tags

    if(tags){
        query.p_tags = tags;
    }



    try{

        const result = await Post.find(query).sort(sort).populate('p_u_OID').lean(); //lean is to make mongoose object to js objects, populate is putting objects in the p_u_OID
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


router.get('/getPost/:id', async(req,res)=>{
    const {id} = req.params;
    console.log(id);

    try{
        const result = await Post.findById(id).populate('p_u_OID').lean();
        console.log(result);
        if (result){
            res.render('post_page',{
                layout:'index',
                postdetails:result,
        
            })
        }else{
            res.status(404).send("no post found");
        }
    }
    catch(e){
        console.log(e);
        return res.status(406).send(e);
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









module.exports = router;
