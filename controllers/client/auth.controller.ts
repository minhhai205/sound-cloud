import { Request, Response } from "express";
import User from "../../models/user.model";
import * as generateHelper from "../../helpers/generate.helper";
import md5 from "md5";

// [GET] /auth/register
export const register = async (req: Request, res: Response): Promise<void> => {
  res.render("client/pages/auth/register", {
    pagesTitle: "Sign up",
  });
}

// [POST] /auth/register
export const registerPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const exitsUser = await User.findOne({
      email: req.body.email,
      deleted: false,
    });

    if(exitsUser){
      res.send("email already exists");
    }

    else{
      req.body.password = md5(req.body.password);
      req.body.tokenUser = generateHelper.generateRandomString(30);

      const user = new User(req.body);
      await user.save();

      res.cookie("tokenUser", user.tokenUser);

      res.redirect("/");
    }
  } catch (error) {
    res.send("Registration failed");
  }
}