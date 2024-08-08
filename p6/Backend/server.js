const express = require('express')
require('dotenv').config()
const app=express();
const chapterRoutes=require('./routes/chapter')
const mongoose=require('mongoose')
const userRoutes=require('./routes/user')


app.use(express.json())
app.use('/chapter',chapterRoutes)   
app.use('/user', userRoutes)

app.get('/',(req,res)=>{
    res.send("Welcome Welcome Welcome");
})

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log("Connected to db and listening to port:",process.env.PORT)
        })
    })
    .catch(console.error() , ()=>{
        console.log(Error)
    })

