import express from "express";
import { param } from "express-validator";
import { parse } from "path/posix";
import Restaurant from "../model/RestaurantSchema";

const route = express.Router();

route.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parametre must be a valid string"),
    RestaurantController.searchRestaurants
);
