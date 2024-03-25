import express, { Request, Response } from "express";
import ResturantController from "../controller/ResturantController";
import multer from "multer";
import { jwtCheck, jwtparse } from "../middlewear/auth";
import { validatemyrestaurantrequest } from "../middlewear/validation";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
router.post("/",jwtCheck,jwtparse,upload.single("imageFile"), ResturantController.CreateResturant);
router.get("/",async(req:Request ,res:Response)=>{
  res.status(200).json({message:"HEALTH OK!"})
})
export default router;
