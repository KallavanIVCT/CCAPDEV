import express from 'express';
import {Post} from '../models/postModel.js';

const router = express.Router();


router.post('/createPost', async (req,res)=>{
    const {id, title, body, tags} = req.body;
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
            })
            return res.status(404).json({"result": "succesfully"})
        }
    
    } catch (e){
        console.log(e);
        return res.status(406).send(e);
    }
})
router.get('/getPost', async (req,res)=>{

    try{
        const result = await Post.find({})
        if(result){
            res.status(200).json(result);
        }else{
            res.status(404).send("no post found")
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









export default router;
