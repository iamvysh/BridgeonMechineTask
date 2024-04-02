const taskModel=require("../model/TaskShema")





 const  addTask=async(req,res)=>{
         
        const title=req.body.title
        const description=req.body.description
        const color=req.body.color
        

        const task=new taskModel({title:title,description:description,color:color})
        await task.save()

        return res.status(201).json({
            message:"note created successfull",

        })

    }
const updateNote=async(req,res)=>{

   
        const id=req.params.id
        const title=req.body.title
        const description=req.body.description
        const color=req.body.color
        if(req.body.color==null){
          color='red'
        }

        const Task=await taskModel.findByIdAndUpdate(id,{$set:{title,description,color}},{new:true})

        return res.status(201).json({
            message:"successfull",
            data:Task
        })
    }


  const getAllTasks=async(req,res)=>{
    const tasks=await taskModel.find()
    return res.status(200).json({
        message:"success",
        data:tasks
    })
  }

  const deleteATask=async(req,res)=>{
    const id=req.params.id
    console.log("id",id);
     
    const deleteTask=await taskModel.findByIdAndDelete(id)
      
    res.status(200).json({
        message:"success"
    })



  }




 module.exports={addTask,updateNote,getAllTasks,deleteATask}