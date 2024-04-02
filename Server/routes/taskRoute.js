const express=require("express")
const router=express.Router()
const tasks=require("../controller/TaskController")
const tryCatchMiddleware = require("../middlewares/tryCatch")



router.get("/allnotes",tryCatchMiddleware(tasks.getAllTasks))
router.post("/addnote",tryCatchMiddleware(tasks.addTask))
router.put("/updatenote/:id",tryCatchMiddleware(tasks.updateNote))
router.delete("/deletenote/:id",tryCatchMiddleware(tasks.deleteATask))





module.exports=router