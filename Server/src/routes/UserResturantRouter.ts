import express, { Request, Response } from "express";
import userResturantController from "../controller/UserResturantController";
import multer from "multer";
import { jwtCheck, jwtparse } from "../middlewear/auth";
import { validatemyrestaurantrequest } from "../middlewear/validation";


const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
router.get("/order",jwtCheck, jwtparse ,userResturantController.getrestaurantOrders)
router.patch("/order/:orderId/status",jwtCheck,jwtparse,userResturantController.UpdateOrderStatus)
router.get("/",jwtCheck, jwtparse ,userResturantController.getrestaurant)
router.post("/",upload.single("imageFile"),validatemyrestaurantrequest,jwtCheck,jwtparse, userResturantController.CreateResturant);
router.put("/",upload.single("imageFile"),validatemyrestaurantrequest,jwtCheck,jwtparse, userResturantController.UpdatemyResturant);

export default router;
