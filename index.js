import express from 'express';
import mongoose from 'mongoose';

import postRoute from './controllers/post_route.js';
import userRoute from './controllers/user_route.js';
import commentRoute from './controllers/react_route.js';
import reactRoute from './controllers/comment_route.js';

import {engine} from 'express-handlebars';

//-----------------------------------------------



const app = express();
app.use(express.json()) //
app.use(express.urlencoded({extended:true})); // without this when client sends a form to server, server wouldnt be able to translate, when used, key-value pairs from name of input type is used
app.use(express.static('public')); // 

//-----------------------------------------------
app.engine('.hbs', engine(
    {
        extname: '.hbs',
        layoutsDir: './views/layouts/',
        partialsDir: './views/partials/',
    }
));

app.set('view engine', '.hbs');
app.set('views','./views');

app.get('/', (req, res) => {
    res.render('home', {layout: 'main'});
});
//-----------------------------------------------




app.listen(3000,()=>{
    console.log("Working");
})
mongoose.connect("mongodb+srv://joshuavillavieja:kirakiradays@cluster.3c0qj0x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster")
.then(()=>{
    console.log("Connnected to database!");
})
.catch((e)=>{
    console.log(e);
});
//-----------------------------------------------

app.use("/api/post", postRoute);
app.use("/api/user", userRoute);
app.use("/api/comment", commentRoute);
app.use("/api/react", reactRoute);

//lilipat ko pa to next tym sa controller folder 



