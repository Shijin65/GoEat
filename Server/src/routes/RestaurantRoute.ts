import express from "express";
import RestaurantController from "../controller/RestaurantController";
import { param } from "express-validator";

const router = express.Router();

router.get(
  "/:restaurantId",
  param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("restaurantId param must be a valid string"),
    RestaurantController.getRestaurant
);
router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("city param must be a valid string"),
  RestaurantController.searchRestaurants
);

export default router;
