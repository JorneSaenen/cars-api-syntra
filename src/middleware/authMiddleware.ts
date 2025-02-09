import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { UserType } from "../types/request";
import { JWT_SECRET } from "../config/env";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!JWT_SECRET) {
      throw new Error("Internal error");
    }

    const decoded = jwt.verify(token, JWT_SECRET as string);

    const userObject: UserType = {
      _id: (decoded as JwtPayload)._id,
      email: (decoded as JwtPayload).email,
    };

    req.user = userObject;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};

export default authMiddleware;
