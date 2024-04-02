const userModel=require("../model/userModel")


const register=async(req,res)=>{
    const name=req.body.username
    const password=req.body.password

    const User=new userModel({name:name,password:password})
    await User.save()
     
    return res.status(201).json({
        message:"userRegistration successfull"

    })
}


const login=async(req,res)=>{

    const name=req.body.username
    const password=req.body.password

    const user=await userModel.findOne({name:name,password:password})


    if(!user){
        return res.status(403).json({
            message:"invalid credential"
        })
    }
     return res.status(200).json({
        message:"user login successfull"
     })


}

module.exports={
    register,login
}