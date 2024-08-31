import User from "../../models/user.model";
import { Request, Response, NextFunction } from "express";

export const userInfo = async (req: Request, res: Response, next: NextFunction) => {
  
  if(req.cookies.tokenUser){
    const user = await User.findOne({
      token: req.cookies.tokenUser,
      deleted: false,
      status: "active",
    });

    if(user) {
      res.locals.user = user;
    }

  }

  next();
};