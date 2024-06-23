const express = require('express')

const router = express.Router();



router.get('/main_page', (req,res)=>{

    const isLoggedIn = req.query.isLoggedIn === 'true';
    console.log(isLoggedIn);
    res.render('main_page',{
        layout: 'index',
        isLoggedIn: isLoggedIn,
    })
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



module.exports = router;