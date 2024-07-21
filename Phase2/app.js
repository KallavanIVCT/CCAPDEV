const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/");
    },
    filename: (req,file,cb)=>{
        cb(null,Date.now()+file.originalname);
    },
});

const upload = multer({storage: storage});

module.exports = {upload};










const postRoute = require('./controllers/post_route.js');
const userRoute = require('./controllers/user_route.js');
const commentRoute = require('./controllers/comment_route.js');
const pageRoute = require('./controllers/page_route.js');

/* npm i express-handlebars express body-parser mongoose */

const server = express();

server.use(express.json()); 
server.use(express.urlencoded({ extended: true }));




const session = require('express-session');
const mongoStore = require('connect-mongodb-session')(session);

server.use(session({
    secret: 'a secret fruit',
    saveUninitialized: true, 
    resave: false,
    store: new mongoStore({ 
      uri: "mongodb://localhost:27017",
      collection: 'mySession',
      expires: 1000*60*60 // 1 hour
    })
  }));
  



server.set('view engine', 'hbs');
server.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

server.use(express.static('public'));
server.use('/uploads', express.static(__dirname + '/uploads'));
server.use(express.static('uploads'));


server.listen(3000,()=>{
    console.log("Working");
})
mongoose.connect("mongodb://localhost:27017/CCAPDEV")
.then(()=>{
    console.log("Connnected to database!");
}).catch((e)=>{
    console.log(e);
});


/*mongodb+srv://joshuavillavieja:kirakiradays@cluster.3c0qj0x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster*/



server.get('/', (req,res)=>{
    res.redirect('/api/post/getPost')
})


server.get('/logout', function(req, resp){
    req.session.destroy(function(err) {
        resp.redirect('/api/user/login');
    });
});


server.use("/api/page", pageRoute);
server.use("/api/post", postRoute);
server.use("/api/user", userRoute);
server.use("/api/comment", commentRoute);


