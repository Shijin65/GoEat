import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../model/UserSchema";

declare global {
  namespace Express {
    interface Request {
      userId: string;
       auth0Id:string;
    }
  }
}

const { auth } = require("express-oauth2-jwt-bearer");

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASEURL,
  tokenSigningAlg: "RS256",
});

export const jwtparse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({message:"authentication failed"});
  }

  const token = authorization.split(" ")[1];
  try {
    const decode = jwt.decode(token) as jwt.JwtPayload;
    const auth0Id=decode.sub;
    const user = await User.findOne({ auth0Id });
    if (!user) {
      return res.sendStatus(401);
    }
    req.userId = user._id.toString();
    req.auth0Id = auth0Id as string;
    next()
  } catch (error) {
    return res.sendStatus(401);
  }
};
