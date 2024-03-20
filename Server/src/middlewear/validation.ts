import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const handlervalidationerror=(req:Request, res:Response ,next:NextFunction)=>{
        const error= validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({errors:error.array()});
        }
        next()
}
export const validatemyuserrequest=[
    body("name").isString().notEmpty().withMessage("name must be string"),
    body("address1").isString().notEmpty().withMessage("address1 must be string"),
    body("city").isString().notEmpty().withMessage("city must be string"),
    body("country").isString().notEmpty().withMessage("country must be string"),
    handlervalidationerror,
]

export const validatemyrestaurantrequest=[
    body("restaurantName").isString().notEmpty().withMessage("restaurantName must be string"),
    body("city").isString().notEmpty().withMessage("city must be string"),
    body("country").isString().notEmpty().withMessage("country must be string"),
    body("deliveryCharge").isFloat({min:0}).withMessage("deliveryCharge must be string"),
    body("deliveryTime").isInt({min:0}).withMessage("deliveryTime must be string"),
    body("cuisin").isArray().withMessage("cuisin must be array").not().isEmpty().withMessage("cuisin array cannot be empty"),
    body("menuItem").isArray().notEmpty().withMessage("menuitem must be a array"),
    body("menuItem.*dishname").isString().notEmpty().withMessage("menuitem name is needed"),
    body("menuItem.*price").isFloat({min:0}).notEmpty().withMessage("price name is needed"),

    handlervalidationerror,
]