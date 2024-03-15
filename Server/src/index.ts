import express ,{Request,Response} from "express";
import cors from 'cors'
import 'dotenv/config'
import mongoose from "mongoose";
import UserController from "./routes/UserRoute";

const PORT = 4000 || process.env.PORT
const server =express()
server.use(express.json())
server.use(cors())
try {
 mongoose.connect(process.env.CONNECTION_STRING as string).then(()=>{console.log("Connected to DataBase")})
   
} catch (error) {
  console.log("database connection failed",error)
    
}
server.get("/test",async(req:Request ,res:Response)=>{
    res.json({message:"hello it is from the server"})
})
server.use("/api/my/user",UserController)

server.listen(PORT,()=>{console.log(`server started at port : ${PORT}`)})