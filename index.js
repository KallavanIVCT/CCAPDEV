import express from 'express';
import mongoose from 'mongoose';

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