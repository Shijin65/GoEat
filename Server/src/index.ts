import express ,{Request,Response} from "express";
import cors from 'cors'
import 'dotenv/config'
import mongoose from "mongoose";
import UserController from "./routes/UserRoute";
import {v2 as cloudinary} from 'cloudinary';
import ResturantController from "./routes/ResturantRouter";

const PORT = 4000 || process.env.PORT
const server =express()
server.use(express.json())
server.use(cors())

 mongoose.connect(process.env.CONNECTION_STRING as string).then(()=>{console.log("Connected to DataBase")}) 



cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET_KEY, 
});


server.get("/health",async(req:Request ,res:Response)=>{
    res.status(200).json({message:"HEALTH OK!"})
})


server.use("/api/my/user",UserController)
server.use("/api/goeat/restaurant",ResturantController)

server.listen(PORT,()=>{console.log(`server started at port : ${PORT}`)})