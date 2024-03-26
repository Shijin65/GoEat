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
router.post("/",upload.single("imageFile"),validatemyrestaurantrequest, ResturantController.CreateResturant);
router.get("/",jwtCheck, jwtparse ,ResturantController.getrestaurant)

export default router;
