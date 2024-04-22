import { Request, Response } from "express";
import Restaurant from "../model/RestaurantSchema";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const CreateResturant = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const existingresturant = await Restaurant.findOne({ user: req.userId });

    if (existingresturant) {
      return res.status(409).json({ message: "A Restaurant already exists" });
    }
    const imageUrl= await Upload(req.file as Express.Multer.File)

    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = imageUrl;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    await restaurant.save();
    res.status(201).send(restaurant);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "something Went Wronge" });
  }
};

const getrestaurant=async(req:Request , res:Response)=>{
try {
  const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant) {
      return res.status(409).json({ message: "restaurant not found" });
    }
    res.json(restaurant);
} catch (error) {
  console.log(error);
  res.status(500).json({message:"Unable to get user"})
}
}

const UpdatemyResturant=async(req:Request , res:Response)=>{
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });

    if (!restaurant) {
      return res.status(409).json({ message: "Restaurant Not Found" });
    }

    restaurant.restaurantName=req.body.restaurantName;
    restaurant.city=req.body.city;
    restaurant.country=req.body.country;
    restaurant.deliveryCharge=req.body.deliveryCharge;
    restaurant.deliveryTime=req.body.deliveryTime;
    restaurant.cuisines=req.body.cuisines;
    restaurant.menuItems=req.body.menuItems;
    restaurant.lastupdate=new Date()

      if(req.file) {
        const imageUrl= await Upload(req.file as Express.Multer.File)
        restaurant.imageUrl=imageUrl;
      }
      await restaurant.save()
      res.status(200).send(restaurant);
      
  } catch (error) {
    console.log(error);
    return res.status(404).send()
  }
}

const Upload=async(file:Express.Multer.File)=>{
  const image =file as Express.Multer.File;
    const base64image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64image}`;
    const uploadResponce = await cloudinary.v2.uploader.upload(dataURI);
    return uploadResponce.url;

}

export default { CreateResturant,getrestaurant,UpdatemyResturant };
