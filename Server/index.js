const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
require("dotenv").config()
const app=express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())





const mongoDB = "mongodb://127.0.0.1/NOTES";

// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("connected to database");
}







const TaskRoutes=require("./routes/taskRoute")
app.use("/api",TaskRoutes)


const UserRoute=require("./routes/userRoute")
app.use("/api",UserRoute)




const port=process.env.PORT

app.listen(port,()=>{
    console.log(`server listening on ${port}`);
})

