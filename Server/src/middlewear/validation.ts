import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const validationhandler=(req:Request, res:Response ,next:NextFunction)=>{
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
    validationhandler,
]