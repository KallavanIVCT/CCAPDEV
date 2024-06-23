const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const postRoute = require('./controllers/post_route.js')
const userRoute = require('./controllers/user_route.js')
const commentRoute = require('./controllers/react_route.js')
const reactRoute = require('./controllers/user_route.js')
const pageRoute = require('./controllers/page_route.js');

/* npm i express-handlebars express body-parser mongoose */

const server = express();

server.use(express.json()); 
server.use(express.urlencoded({ extended: true }));



server.set('view engine', 'hbs');
server.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

server.use(express.static('public'));



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
    res.redirect('/api/page/main_page')
})





server.use("/api/page", pageRoute);
server.use("/api/post", postRoute);
server.use("/api/user", userRoute);
server.use("/api/comment", commentRoute);
server.use("/api/react", reactRoute);


