const { response } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const RegisterUser = require("./mongodbmodel")
const jwt = require('jsonwebtoken');
const app = express();

mongoose.connect("mongodb+srv://avinashdatabase:avinashdatabase@cluster0.e0s2b1a.mongodb.net/?retryWrites=true&w=majority",
{
    useNewUrlParser : true,
    useUnifiedTopology : true
    }).then(
   ()=> console.log("DB CONNECTED")
)

app.use(express.json())
app.post('/register', async (req,res)=> {
    try{
        const {Firstname,Lastname,Email,password} = req.body;
        let emailcheck = await RegisterUser.findOne({Email})
        if (emailcheck){
            res.status(400);
            response.send("email already exists")
        }
        let newUser =new RegisterUser({
            Firstname,
            Lastname,
            Email,
            password
        })
        await newUser.save();
        res.status(200);
        response.send("Registerd Succesfully")
    } 
    catch(error) {
        console.log(error)
    }
});

app.post('/login',async(req,res)=>{
    try{
        const {email,password} = req.body;
        let emailExist = await RegisterUser.findOne({Email});
        if (!emailExist){
            res.status(400);
            res.send("user not registered")
        }
        let payload = {
            user: {
                id : emailExist.id
            }
        }
        jwt.sign(payload,secret_key,{expiresIn: 1800000},
          (err,token) => {
            if (err) throw err;
            return res.json({token})
          } 
        )
    }
    catch(error){
        console.log(error)
    }
})

app.listen(4000,()=> {
    console.log("server is running")
})

