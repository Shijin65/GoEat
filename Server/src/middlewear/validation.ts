import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const handlervalidationerror=(req:Request, res:Response ,next:NextFunction)=>{
        const errors= validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
          next();
        };

export const validatemyuserrequest=[
    body("name").isString().notEmpty().withMessage("name must be string"),
    body("address1").isString().notEmpty().withMessage("address1 must be string"),
    body("city").isString().notEmpty().withMessage("city must be string"),
    body("country").isString().notEmpty().withMessage("country must be string"),
    handlervalidationerror,
]

export const validatemyrestaurantrequest=[
    body("restaurantName").notEmpty().withMessage("Restaurant name is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("country").notEmpty().withMessage("Country is required"),
  body("deliveryCharge")
    .isFloat({ min: 0 })
    .withMessage("Delivery price must be a positive number"),
  body("deliveryTime")
    .isInt({ min: 0 })
    .withMessage("Estimated delivery time must be a postivie integar"),
  body("cuisines")
    .isArray()
    .withMessage("Cuisines must be an array")
    .not()
    .isEmpty()
    .withMessage("Cuisines array cannot be empty"),
  body("menuItems").isArray().withMessage("Menu items must be an array"),
  body("menuItems.*.dishname").notEmpty().withMessage("Menu item name is required"),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("Menu item price is required and must be a postive number"),
    handlervalidationerror,
]