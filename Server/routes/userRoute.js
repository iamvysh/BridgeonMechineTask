const express=require("express")
const router=express.Router()
const user=require("../controller/userController")
const tryCatchMiddleware = require("../middlewares/tryCatch")



router.post("/register",tryCatchMiddleware(user.register))
router.post("/login",tryCatchMiddleware(user.login))





module.exports=router