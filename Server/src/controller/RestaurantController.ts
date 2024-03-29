import { Request, Response } from "express";

const searchRestaurants =async(res:Response ,req:Request)=>{
    try {
        const city=req.params.city;
        const searchquery =(req.query.searchquery as string || "");
        const selectedcuisin = (req.query.selectedcuisin as string || "");
        const sortOption =(req.query.sortOption as string || "lastUpdate")
        
    } catch (error) {
        console.log(error)
        return res.status(404).json({message:"error occered while fetching the data"})
    }

}