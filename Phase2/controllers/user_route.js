const User = require('../models/userModel.js');
const Post = require('../models/postModel.js');
const Comment = require('../models/commentModel.js');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const {upload} = require('../app.js')
//const bcrypt = require('bcrypt'); MCO3 Implement 

// create a register that will be sent and process it to go to the mongoodb database
// create a register that will be sent and process it to go to the mongoodb database
router.post('/createUser', async (req, res) => {
    const { username, password, displayname, birthdate } = req.body;

    try {
        let username_exist = await User.findOne({ u_username: username }).exec();
        if (username_exist) {
            return res.render('register_page', {
                layout: 'index',
                res: "invalid, username already taken",
            });
        }

        const saltRounds = 5;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.create({
            u_username: username,
            u_password: hashedPassword,
            u_birthdate: new Date(birthdate), 
            u_displayname: displayname,
        });

        res.redirect('/api/user/login');

    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.post('/login', async (req, res) => {
    const { username, password, rememberMe} = req.body;
    console.log(rememberMe);
    try {
        const user = await User.findOne({ u_username: username }).exec();
        if (user && user.u_isDeleted === false) {
            const isMatch = await bcrypt.compare(password, user.u_password);
            if (isMatch) {
                req.session.login_user = user._id;
                req.session.login_id = req.sessionID;
                if (rememberMe === "yes") {
                    req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 21; // 1 week
                } else {
                    req.session.cookie.maxAge = null; // Session expires when browser is closed
                }
                return res.redirect('/api/post/getPost');
            }
        }else{
            return res.render('login_page', {
                layout: 'index',
                res: "invalid credentials",
            });
        }
        res.render('login_page', {
            layout: 'index',
            res: "invalid, try again",
        });
    } catch (e) {
        console.log(e);
        res.status(500).json("ERROR");
    }
});

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
    const login_id = req.session.login_user ? req.session.login_user : null;

    const login_id2 = req.session.login_user ? JSON.stringify(req.session.login_user) : null;

    //console.log(login_id);

    const resultPost = await Post.find({p_u_OID: login_id}).lean();
    const userPost = await User.findById(login_id).lean();
    const comments = await Comment.find({ c_u_OID: login_id }).populate('c_post_id').sort({ c_date: -1 }).lean();

    res.render('user_profile_page',{
        layout: 'index',
        posts: resultPost,
        login_id: login_id,
        comments: comments,
        user: userPost,
        hasPrivelage: true,
        
    })
})









router.patch('/updateUser', upload.single('image'), async(req,res)=>{ //this is for updating
    const {id, displayname, password, description} = req.body;


    try{
        if (!id ){
            return res.status(408).json({"result" : "incomplete parameters"});
            
        }
        else{
            console.log("DWKODWAKODAWK");
            const update = {
                $set:{}
            };
            if (displayname){
                update.$set.u_displayname = displayname;
            }
            if (password){
                const saltRounds = 5;
                const hashedPassword = await bcrypt.hash(password, saltRounds);

                update.$set.u_password = hashedPassword;                
            }
            if (description){
                update.$set.u_description = description;
            }
            if (req.file){
                const { filename, path: filepath } = req.file;
                imageDetails = {
                    u_filename: filename,
                    u_filepath: filepath
                };

                update.$set.u_image = imageDetails
            }
            console.log(update);
            console.log("dKODAK");
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
            const update = {
                $set: {
                    u_isDeleted: true,
                    u_displayname: "[DELETED USER]",
                }

            }
            const result = await User.findByIdAndUpdate(id, update);
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
    //console.log(id);
    const login_id = req.session.login_user ? JSON.stringify(req.session.login_user) : null;
    const login_id2 = req.session.login_user ? req.session.login_user : null;


    let hasPrivelage =false;

    const resultPost = await Post.find({p_u_OID: id}).lean();
    const userPost = await User.findById(id).lean();
    console.log(id);
    console.log(login_id);
    if (login_id2 == id){
        hasPrivelage = true;
    }

    // const resultComment (mark)
    const comments = await Comment.find({ c_u_OID: id }).populate('c_post_id').sort({ c_date: -1 }).lean();

    //console.log(comments);
    //console.log(resultPost);
    //console.log(userPost);

    res.render('user_profile_page',{
        layout: 'index',
        posts: resultPost,
        login_id: login_id,
        comments: comments,
        user: userPost,
        hasPrivelage: hasPrivelage,
        
    })
})


module.exports = router;
