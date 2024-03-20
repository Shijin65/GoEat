import { Request, Response } from "express";
import Restaurant from "../model/RestaurantSchema";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const CreateResturant = async (req: Request, res: Response) => {
  try {
    const existingresturant = await Restaurant.findOne({ user: req.userId });

    if (existingresturant) {
      return res.status(409).json({ message: "A Restaurant already exists" });
    }
    const image = req.file as Express.Multer.File;
    const base64image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64image}`;
    const uploadResponce = await cloudinary.v2.uploader.upload(dataURI);

    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = uploadResponce.url;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    await restaurant.save();
    res.status(201).send(restaurant);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "something Went Wronge" });
  }
};

export default { CreateResturant };
