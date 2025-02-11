import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { UserType } from "../types/request";
import { JWT_SECRET } from "../config/env";
import { User } from "../models/userModel";

const localAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.redirect("/login");
      return;
    }

    if (!JWT_SECRET) {
      res.redirect("/login");
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET as string);

    if (!decoded) {
      res.redirect("/login");
      return;
    }

    const userObject: UserType = {
      _id: (decoded as JwtPayload)._id,
      email: (decoded as JwtPayload).email,
    };

    const user = await User.findById(userObject._id).select("-password");

    req.user = userObject;
    res.locals.user = user;
    next();
  } catch (error) {
    res.redirect("/login");
    return;
  }
};

export default localAuthMiddleware;
