const jwt=require("jsonwebtoken")


const auth=(req,res,next)=>{
    const token=req.headers.authorization;

    if(token){
        jwt.verify(token,"masai",(err,decoded)=>{
            if(decoded){
                req.body.userId=decoded.userId
                next()
            }else{
                res.send("login first")
            }
        })
    }else{
        res.send("login first")
    }
}

module.exports={auth}