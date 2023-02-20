const express=require("express")
const {PostModel}=require("../models/Post.model")


const postRouter=express.Router()


postRouter.post("/create",async(req,res)=>{
    const payload=req.body

    try{
        const post=new PostModel(payload)
        await post.save()
        res.send("Post created")

    }catch(err){
        console.log(err)
        res.send("Post not created")
    }
})


postRouter.get("/",async(req,res)=>{
    const {device}=req.query;

    let post
    try{
        if(device){
             post=await PostModel.find({device:device})
        }else{
            post=await PostModel.find()
        }
        
        res.send(post)
    }catch(err){
        res.send(err.message)
    }
   

})


postRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body
    const id=req.params.id

    const posts=await PostModel.findOne({"_id":id})
    console.log(posts)
    const userID_in_post=posts.userId
    const user_ID=req.body.userId
    console.log(userID_in_post)
    console.log(user_ID)
    try{
        if(userID_in_post===user_ID){
            await PostModel.findByIdAndUpdate({"_id":id},payload)
            res.send("Updated")
        }else{
            res.send("you aren't authorized")
        }

    }catch(err){
        console.log(err)
        res.send("Not Updated")
    }

})

postRouter.delete("/delete/:id",async(req,res)=>{
   
    const id=req.params.id

    const post=await PostModel.findOne({"_id":id})

    const userID_in_post=post.userId
    const user_ID=req.body.userId

    try{
        if(userID_in_post===user_ID){
            await PostModel.findByIdAndDelete({"_id":id})
            res.send("Deleted")
        }else{
            res.send("you aren't authorized")
        }

    }catch(err){
        console.log(err)
        res.send("Not Deleted")
    }

})

// postRouter.get("/top",async(req,res)=>{
//     const post=await PostModel.find({})
//     res.send(post)

// })

module.exports={postRouter}


 
// "title":"task1",
// "body":"task1",
// "device":"mobile",
// "no_if_comments":6
