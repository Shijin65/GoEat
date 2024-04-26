import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import UserRoute from "./routes/UserRoute";
import UserResturantRoute from "./routes/UserResturantRouter";
import RestaurantRoute from "./routes/RestaurantRoute";
import OrderRoute from "./routes/OrderRoute";

const server = express();
server.use(express.json());
server.use(cors());

mongoose.connect(process.env.CONNECTION_STRING as string).then(() => {
  console.log("Connected to DataBase");
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

server.get("/health", async (req: Request, res: Response) => {
  res.status(200).json({ message: "HEALTH OK!" });
});

server.use("/api/my/user", UserRoute);
server.use("/api/user/restaurant", UserResturantRoute);
server.use("/api/restaurant", RestaurantRoute);
server.use("/api/order",OrderRoute)
server.listen(7000, () => {
  console.log(`server started at port : 7000`);
});
