const express=require("express")
const {UserModel}=require("../models/User.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")


const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city}=req.body
    if(email){
        const checkEmail=await UserModel.findOne({email:email})

        if(checkEmail){
            res.send("User already exist, please login")
        }else{
            try{
                bcrypt.hash(password,4,async(err,hash)=>{
                    if(err){
                        res.send(err)
                    }else{
                        const user=new UserModel({name,email,gender,password:hash,age,city})
                        await user.save()
                        res.send("User registered")
                    }
                })
            }catch(err){
                res.send({"err.message":err.message})
            }

        }
    }else{
        res.send("fill credentials")
    }

   
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    let token=jwt.sign({userId:user[0]._id},"masai")
                    res.send({"msg":"logged In","token":token})
                }else{
                    res.send("wrong credentials")
                }
            })
        }else{
            res.send("loggin first")
        }

    }catch(err){
        res.send(err.message)
    }
})

module.exports={userRouter}



// "name":"chunnu",
// "email":"chunnu@gmail.com",
// "gender":"male",
// "password":"chunnu",
// "age":"22",
// "city":"pune"


