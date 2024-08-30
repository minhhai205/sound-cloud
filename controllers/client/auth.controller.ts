import { Request, Response } from "express";
import User from "../../models/user.model";
import * as generateHelper from "../../helpers/generate.helper";
import md5 from "md5";

// [GET] /auth/register
export const register = async (req: Request, res: Response): Promise<void> => {
  res.render("client/pages/auth/register", {
    pageTitle: "Sign up",
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
      // add Notification...
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
    // add Notification...
    res.send("Registration failed");
  }
}

// [GET] /auth/login
export const login = async (req: Request, res: Response): Promise<void> => {
  res.render("client/pages/auth/login", {
    pageTitle: "Sign in",
  });
}

// [GET] /auth/login
export const loginPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
      email: email,
      deleted: false,
    });

    if(!user){
      // add Notification...
      console.log("email does not exist!");
      res.redirect("back");
    }

    if(md5(password) != user.password) {
      // add Notification...
      res.redirect("back");
      return;
    }
  
    if(user.status != "active") {
      // add Notification...
      res.redirect("back");
      return;
    }
  
    res.cookie("tokenUser", user.tokenUser);
  
    res.redirect("/");

  } catch (error) {
    res.redirect("back");
  }
}