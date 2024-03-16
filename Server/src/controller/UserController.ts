import { Request, Response } from "express";
import User from "../model/UserSchema";

const CreateCurrentUser = async (req: Request, res: Response) => {
  try {
    // 1.check weather the user existes
    const { auth0Id } = req.body;
    const userexist = await User.findOne({auth0Id});
    if (userexist) {
      return res.status(200).send();
    }

    //2.add if doesn't exist
    const newuser = new User(req.body);
    await newuser.save();
    //3.return the user object to client
    res.status(201).json(newuser.toObject());
    console.log(newuser)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred when creating user" });
  }
};
const UpdateCurrentUser=async(req: Request, res: Response)=>{
  try {
    
  } catch (error) {
    res.sendStatus(401).json({message:"Not able to update contact"})
  }
}
export default {
  CreateCurrentUser,UpdateCurrentUser
};
