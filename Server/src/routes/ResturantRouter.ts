import express, { Request, Response } from "express";
import ResturantController from "../controller/ResturantController";
import multer from "multer";
import { jwtCheck, jwtparse } from "../middlewear/auth";
import { validatemyrestaurantrequest } from "../middlewear/validation";
import Restaurant from "../model/RestaurantSchema";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
router.get("/",jwtCheck, jwtparse ,ResturantController.getrestaurant)
router.post("/",upload.single("imageFile"),validatemyrestaurantrequest,jwtCheck,jwtparse, ResturantController.CreateResturant);
router.put("/",upload.single("imageFile"),validatemyrestaurantrequest,jwtCheck,jwtparse, ResturantController.UpdatemyResturant);

export default router;
