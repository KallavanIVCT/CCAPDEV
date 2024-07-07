const User = require('../models/userModel.js');
const Post = require('../models/postModel.js');
const express = require('express');

const router = express.Router();

router.post('/createUser', async (req,res)=>{
    const {username, password, displayname, birthdate} = req.body;
    // place verification if username is already existing nope

    try{
        let username_exist = await User.findOne({u_username: username}).exec();
        if (username_exist){
            return res.status(409).json("Username already exist")

        }else{
            const user = await User.create({
                u_username: username,
                u_password: password,
                u_birthdate: Date(birthdate),
                u_displayname: displayname,
            })
        }

    }catch(e){
        console.log(e);
    }
})


router.post('/login', async(req,res)=>{
    /* should verify  if user exist, if it exist render the /api/post/getPost and send the username and password baka lang magamit*/
    const {username, password} = req.body
    try{
        const username_exist = await User.findOne({u_username: username, u_password: password});
        if(username_exist){
            res.redirect('/api/post/getPost/?isLoggedIn=true')
        }else{
            res.status(409).json("Username does not exist");
        }
    }catch(e){
        res.status(409).json("ERROR");
    }
})


router.get('/login', (req,res)=>{
    res.render('login_page',{
        layout: 'index',
    })
})

router.get('/register', (req,res)=>{
    res.render('register_page',{
        layout: 'index',
    })
})


// This is when the user clicks the profile button at the header it will redirect here
router.get('/profile', async (req,res)=>{

    //const {id} = req.params;// wag muna gamitin since hardcoded daw sabi ni sir ung specific user
    const {isLoggedIn} = req.query;
    let id = '66776c6fb5909970e7f38836';

    const resultPost = await Post.find({p_u_OID: id}).lean();
    // const resultComment (mark)



    res.render('user_profile_page',{
        layout: 'index',
        posts: resultPost,
        isLoggedIn: isLoggedIn
        // comment,

    })
})







router.patch('/updateUser', async(req,res)=>{ //this is for updating
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
            const result = await User.findByIdAndUpdate(id,update) //findbyidandupdate is object id + update params
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




router.get('/getUsers', async (req,res)=>{

    const result = await User.find({})
    res.status(200).json(result);
})


router.get('/getUsers/:id', async (req,res)=>{
    const {id} = req.params
    const result = await User.findById(id);
    res.status(200).json(result);
})





router.delete('/deleteUser/:id', async (req,res)=>{
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




module.exports = router;