const User = require('../models/userModel.js');
const Post = require('../models/postModel.js');
const Comment = require('../models/commentModel.js');
const express = require('express');

const router = express.Router();
//const bcrypt = require('bcrypt'); MCO3 Implement 

// create a register that will be sent and process it to go to the mongoodb database
router.post('/createUser', async (req,res)=>{
    const {username, password, displayname, birthdate} = req.body;

    try {
        let username_exist = await User.findOne({ u_username: username }).exec();
        if (username_exist) {
            res.render('register_page',{
                layout: 'index',
                res: "invalid, username already taken",
            });
        }

        // MCO3 Implement 
        //const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            u_username: username,
            u_password: password,
            u_birthdate: new Date(birthdate), 
            u_displayname: displayname,
        });

        res.redirect('/api/user/login');

    }catch(e){
        console.log(e);
        res.status(500).json({ error: "Internal server error" });
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
            res.render('login_page',{
                layout: 'index',
                res: "invalid, try again",
            });
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
    const userPost = await User.findById(id).lean();
    // const resultComment (mark)
    const comments = await Comment.find({ c_u_OID: id }).populate('c_post_id').sort({ c_date: -1 }).lean();

    res.render('user_profile_page',{
        layout: 'index',
        posts: resultPost,
        isLoggedIn: isLoggedIn,
        comments: comments,
        user: userPost,
        
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


// This is when the user clicks the another persons profile
router.get('/profile/:id', async (req,res)=>{

    const {id} = req.params;
    console.log(id);
    const {isLoggedIn} = req.query;
    const resultPost = await Post.find({p_u_OID: id}).lean();
    const userPost = await User.findById(id).lean();
    // const resultComment (mark)
    const comments = await Comment.find({ c_u_OID: id }).populate('c_post_id').sort({ c_date: -1 }).lean();

    console.log(comments);
    console.log(resultPost);
    console.log(userPost);

    res.render('user_profile_page',{
        layout: 'index',
        posts: resultPost,
        isLoggedIn: isLoggedIn,
        comments: comments,
        user: userPost,
        
    })
})


module.exports = router;
