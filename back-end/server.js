const express = require('express');
const app = express();
const port = 8000;
const connectDB = require('./db/dbConnection');
const User = require('./db/user');
const cors = require('cors');

//middleware

app.use(express.json());

//enable cors

app.use(cors());

//registration

app.post('/register', async(req,res)=>{
    try{
        const {username, password} = req.body;
        console.log(req.body);
        const user = new User({username, password});
        await user.save();
        res.status(201).json({message: 'registration successful'});
    }
    catch(error){
        res.status(500).json({error:'resgistration failer'});
    }
})


//login

app.post('/login', async(req,res)=>{
    try{
        const {username,password} = req.body;
        const user = await User.findOne({username});

        if(!user){
            return res.status(401).json({error:"invalid username or password"});
        }

        if(user.password!==password){
            return res.status(401).json({error:"invalid username or password"});
        }
        res.status(200).json({message:'login successful'});
    }
    catch(error){
        res.status(500).json({error:"login failed"});
        
    }
})

connectDB();

app.listen(port, ()=>{
    console.log('server is listening on port')
});