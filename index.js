import express from 'express';
import mongoose from 'mongoose';
import {User} from './models/userModel.js';
import {Post} from './models/postModel.js';

const app = express();


app.use(express.json())


app.listen(3000,()=>{
    console.log("Working");
})


app.get('/', (req,res)=>{
    res.send("Hello World!");
})



mongoose.connect("mongodb+srv://joshuavillavieja:kirakiradays@cluster.3c0qj0x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster")
.then(()=>{
    console.log("Connnected to database!");
})
.catch((e)=>{
    console.log(e);
});




//lilipat ko pa to next tym sa controller folder 

app.post('/register', async (req,res)=>{
    const {username, password} = req.body;
    // place verification if username is already existing nope

    try{
        let username_exist = await User.findOne({u_username: username}).exec();
        if (username_exist){
            return res.status(409).json("Username already exist")

        }else{
            const user = await User.create({
                u_username: username,
                u_password: password,
            })
            return res.status(200).json(user);
        }

    }catch(e){
        console.log(e);
    }
})

app.patch('/updateUser', async(req,res)=>{ //this is for updating
    const {id, username, password, description} = req.body;

    try{
        if (!id || !username || !password || !description){
            return res.status(408).json({"result" : "incomplete parameters"});
        }
        else{
            const update = {
                $set:{
                    u_username:username,
                    u_password:password,
                    u_description:description,
                }
            }
            const result = await User.findByIdAndUpdate(id,update)
            if (result){
                return res.status(200).json({"result": "updated successfully"});
            }else{
                return res.status(405).json({"result": "did not update successfully"});
            }
        }
    }catch(e){
        console.log(e);
        res.status(406).json({"result": e});
    }
})




app.get('/getUsers', async (req,res)=>{

    const user = await User.find({})
    res.status(200).json(user);
})




app.delete('/deleteUser/:id', async (req,res)=>{
    const {id} = req.params;
    try{
        if(!id){
            return res.status(405).send("No ID given");
        }else{
            const result = await User.findByIdAndDelete(id);
            if(result){
                return res.status(200).send("succesfully deleted");
            }else{
                return res.status(405).send("cannot be deleted");
            }
        }
    }catch(e){
        console.log(e);
        return res.status(406).send(e);
        
    }
})

app.post('/addPost', async (req,res)=>{
    const {id, title, body, username, tags} = req.body;
    try{
        if (!id || !username || !title || !body || !tags){
            req.status(405).send("incomplete fields");
        }
        else{
            const result = await Post.create({
                p_title: title,
                p_body: body,
                p_u_OID: id,
                p_tags: tags,
            })
            res.status(404).json({result: succesfully})
        }
    }catch(e){
        console.log(e);
        req.status(406).send(e);
    }
})