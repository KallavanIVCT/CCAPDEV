import express from 'express';
import mongoose from 'mongoose';
import {User} from './models/userModel.js';

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
    let {id, username, password} = req.body;
    // place verification if username is already existing nope

    try{
        let username_exist = await User.findOne({username: username}).exec();
        if (username_exist){
            res.status(409).json("Username already exist")

        }else{
            res.status(200).json({"result": "Does not yet Exist"});
            //put username_exist here
            const user = await User.create({
                u_id: id,
                u_username: username,
                u_password: password,
            })
            return res.status(200).json(user);
        }

    }catch(e){
        console.log(e);
    }
})

app.patch('/updateProfile', async(req,res)=>{ //this is for updating
    const {id, username, password, description} = req.body;

    try{
        if (!id || !username || !password || !description){
            res.status(408).json({"result" : "incomplete parameters"});
        }
        else{
            const update = {
                $set:{
                    u_username:username,
                    u_password:password,
                    u_description:description,
                }
            }
            const result = await User.findOneAndUpdate({u_id: id},update)
            if (result){
                res.status(200).json({"result": "updated successfully"});
            }else{
                res.status(405).json({"result": "did not update successfully"});
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



